"use server";

import {
  fetch3DayMarketPercentiles,
  fetchJsonMarket,
  refreshMarketDbIfNeeded,
} from "~/services/market-fetch";
import ActionsPage from "~/components/actions-page";
import { ClientOnly } from "~/components/client-only";

export default async function HomePage() {
  await refreshMarketDbIfNeeded();

  const market = {
    current: await fetchJsonMarket("milkyapi.json"),
    median: await fetchJsonMarket("medianmarket.json"),
    p10: await fetch3DayMarketPercentiles(10),
    p90: await fetch3DayMarketPercentiles(90),
  };

  return (
    <main className="flex min-h-screen">
      <div className="container flex flex-col gap-6 py-12">
        <ClientOnly>
          <ActionsPage markets={market} />
        </ClientOnly>
      </div>
    </main>
  );
}
