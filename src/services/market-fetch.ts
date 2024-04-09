"use server";

import { z } from "zod";
import fs from "fs/promises";
import { createClient } from "@libsql/client";
import { items } from "./items";
import percentile from "percentile";

const MarketEntrySchema = z.object({
  bid: z.number(),
  ask: z.number(),
});
export type MarketEntry = z.infer<typeof MarketEntrySchema>;

const MarketSchema = z.object({
  market: z.record(MarketEntrySchema),
  time: z.number(),
});
export type Market = z.infer<typeof MarketSchema>;

export async function fetchJsonMarket(name: string): Promise<Market> {
  const response = await fetch(
    `https://raw.githubusercontent.com/holychikenz/MWIApi/main/${name}`,
    { next: { revalidate: 60 } },
  );

  const data: unknown = await response.json();
  return MarketSchema.parse(data);
}

const MARKET_DB_REFRESH_RATE = 2 * 60 * 1000;
let lastMarketDbRefresh = 0;
export async function refreshMarketDbIfNeeded() {
  if (Date.now() - lastMarketDbRefresh < MARKET_DB_REFRESH_RATE) {
    console.debug(
      `Market db is ${((Date.now() - lastMarketDbRefresh) / (60 * 1000)).toFixed(2)} minutes old. Skipping refresh.`,
    );
    return;
  }

  const oldLastMarketDbRefresh = lastMarketDbRefresh;
  try {
    // Update the time early to make sure no other requests trigger a refresh
    lastMarketDbRefresh = Date.now();

    const response = await fetch(
      `https://raw.githubusercontent.com/holychikenz/MWIApi/main/market.db`,
      { cache: "no-store" },
    );

    const data = await response.arrayBuffer();
    await fs.writeFile("/tmp/market.db", Buffer.from(data));
  } catch (error) {
    // Roll back the time if the refresh failed so it can be attempted by another request
    lastMarketDbRefresh = oldLastMarketDbRefresh;
    console.error("Failed to refresh market db", error);
  }
}

export async function fetch3DayMarketPercentiles(p: number) {
  const db = createClient({
    url: "file:/tmp/market.db",
  });

  const askResult = await db.execute(
    "select * from ask where time > strftime('%s', 'now', '-3 days')",
  );
  const bidResult = await db.execute(
    "select * from bid where time > strftime('%s', 'now', '-3 days')",
  );
  const ask = askResult.rows;
  const bid = bidResult.rows;

  const market: Record<string, MarketEntry> = {};

  for (const item of items) {
    const askPrices = ask.map((entry) => {
      const price = entry[item.name]!;

      if (price == -1) {
        return Number.POSITIVE_INFINITY;
      }

      return price;
    });
    const bidPrices = bid.map((entry) => {
      const price = entry[item.name]!;

      if (price == -1) {
        return 0;
      }

      return price;
    });

    market[item.name] = {
      ask: percentile(p, askPrices) as number,
      bid: percentile(p, bidPrices) as number,
    };
  }

  const time = ask
    .map((entry) => entry.time as number)
    .reduce((a, b) => Math.max(a, b));

  return {
    time,
    market,
  };
}
