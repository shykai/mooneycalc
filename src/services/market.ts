import { createContext, useContext } from "react";
import { type Market } from "./market-fetch";

export interface Markets {
  current: Market;
  median: Market;
  p10?: Market;
  p90?: Market;
}

export const MarketContext = createContext<Markets | null>(null);

export function useMarkets() {
  const markets = useContext(MarketContext);

  if (!markets) {
    throw new Error("Market context not found");
  }

  return markets;
}
