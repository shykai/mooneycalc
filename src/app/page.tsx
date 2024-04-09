"use server";

import {
  fetch3DayMarketPercentiles,
  fetchJsonMarket,
  refreshMarketDbIfNeeded,
} from "~/services/market-fetch";
import ActionsPage from "~/components/actions-page";
import { ClientOnly } from "~/components/client-only";
import { env } from "~/env";
import { type Markets } from "~/services/market";

export default async function HomePage() {
  await refreshMarketDbIfNeeded();

  const market: Markets = {
    current: await fetchJsonMarket("milkyapi.json"),
    median: await fetchJsonMarket("medianmarket.json"),
  };

  if (env.NEXT_PUBLIC_PRECENTILE_MARKET_ENABLED === "true") {
    market.p10 = await fetch3DayMarketPercentiles(10);
    market.p90 = await fetch3DayMarketPercentiles(90);
  }

  return (
    <div className="flex flex-col gap-4">
      <ClientOnly>
        <ActionsPage markets={market} />
      </ClientOnly>
    </div>
  );
}
