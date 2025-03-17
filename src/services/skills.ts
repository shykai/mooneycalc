import { gameData } from "./data";

export const skills = Object.values(gameData.skillDetailMap)
  .filter((s) => s.hrid != "/skills/total_level")
  .sort((a, b) => a.sortIndex - b.sortIndex);

const skillNames = {
  "/skills/total_level": "\u603b\u7b49\u7ea7",
  "/skills/milking": "\u6324\u5976",
  "/skills/foraging": "\u91c7\u6458",
  "/skills/woodcutting": "\u4f10\u6728",
  "/skills/cheesesmithing": "\u5976\u916a\u953b\u9020",
  "/skills/crafting": "\u5236\u4f5c",
  "/skills/tailoring": "\u7f1d\u7eab",
  "/skills/cooking": "\u70f9\u996a",
  "/skills/brewing": "\u51b2\u6ce1",
  "/skills/alchemy": "\u70bc\u91d1",
  "/skills/enhancing": "\u5f3a\u5316",
  "/skills/stamina": "\u8010\u529b",
  "/skills/intelligence": "\u667a\u529b",
  "/skills/attack": "\u653b\u51fb",
  "/skills/power": "\u529b\u91cf",
  "/skills/defense": "\u9632\u5fa1",
  "/skills/ranged": "\u8fdc\u7a0b",
  "/skills/magic": "\u9b54\u6cd5",
}
export function skillNameZH(skillHrid: string) {
  return skillNames[skillHrid as keyof typeof skillNames] ?? skillHrid;
}

export function skillName(skillHrid: string) {
  return gameData.skillDetailMap[skillHrid]?.name ?? skillHrid;
}
