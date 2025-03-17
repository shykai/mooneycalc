import { string } from "zod";
import { gameData } from "./data";

export const communityBuffs = Object.values(
  gameData.communityBuffTypeDetailMap,
).sort((a, b) => a.sortIndex - b.sortIndex);

const communityBuffTypeNamesZH = {
  "/community_buff_types/experience": "\u7ecf\u9a8c",
  "/community_buff_types/gathering_quantity":
    "\u91c7\u96c6\u6570\u91cf",
  "/community_buff_types/production_efficiency":
    "\u751f\u4ea7\u6548\u7387",
  "/community_buff_types/enhancing_speed":
    "\u5f3a\u5316\u901f\u5ea6",
  "/community_buff_types/combat_drop_quantity":
    "\u6218\u6597\u6389\u843d\u6570\u91cf",
}
export function communityBuffsNameZH(communityBuffsHrid: string) {
  return communityBuffTypeNamesZH[communityBuffsHrid] ?? communityBuffsHrid;
}