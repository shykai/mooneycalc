import React from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { itemName } from "~/services/items";
import { useMarkets } from "~/services/market";
import { useSettingsStore } from "~/services/settings";

export interface ItemDetailProps {
  hrid: string;
  type: "input" | "output";
}

export const ItemDetail = ({ hrid, type }: ItemDetailProps) => {
  const markets = useMarkets();
  const marketSettings = useSettingsStore((state) => state.settings.market);
  const name = itemName(hrid);

  let market;
  if (type === "input") {
    market = markets[marketSettings.inputPricePeriod];
  } else if (type === "output") {
    market = markets[marketSettings.outputPricePeriod];
  } else {
    throw new Error("Invalid type");
  }

  return (
    <HoverCard openDelay={0} closeDelay={0}>
      <HoverCardTrigger>{name}</HoverCardTrigger>
      <HoverCardContent side="right" sideOffset={16}>
        <h3 className="pb-1 text-muted-foreground">{name}</h3>
        <p>Ask: {market.market[name]?.ask}</p>
        <p>Bid: {market.market[name]?.bid}</p>
      </HoverCardContent>
    </HoverCard>
  );
};

export default ItemDetail;
