import {
  BUFF_TYPE_ACTION_SPEED,
  BUFF_TYPE_EFFICIENCY,
  BUFF_TYPE_ENHANCING_SUCCESS,
  BUFF_TYPE_GATHERING,
  BUFF_TYPE_RARE_FIND,
  BUFF_TYPE_TASK_SPEED,
  BUFF_TYPE_WISDOM,
  zeroBonuses,
} from "./buffs";
import { gameData } from "./data";

export const equipmentTypes = Object.values(
  gameData.equipmentTypeDetailMap,
).sort((a, b) => a.sortIndex - b.sortIndex);


const equipmentTypeNamesZH = {
  "/equipment_types/two_hand": "\u53cc\u624b",
  "/equipment_types/main_hand": "\u4e3b\u624b",
  "/equipment_types/off_hand": "\u526f\u624b",
  "/equipment_types/back": "\u80cc\u90e8",
  "/equipment_types/head": "\u5934\u90e8",
  "/equipment_types/body": "\u8eab\u4f53",
  "/equipment_types/legs": "\u817f\u90e8",
  "/equipment_types/hands": "\u624b\u90e8",
  "/equipment_types/feet": "\u811a\u90e8",
  "/equipment_types/pouch": "\u888b\u5b50",
  "/equipment_types/neck": "\u9879\u94fe",
  "/equipment_types/earrings": "\u8033\u73af",
  "/equipment_types/ring": "\u6212\u6307",
  "/equipment_types/trinket": "\u9970\u54c1",
  "/equipment_types/milking_tool": "\u6324\u5976\u5de5\u5177",
  "/equipment_types/foraging_tool": "\u91c7\u6458\u5de5\u5177",
  "/equipment_types/woodcutting_tool": "\u4f10\u6728\u5de5\u5177",
  "/equipment_types/cheesesmithing_tool":
    "\u5976\u916a\u953b\u9020\u5de5\u5177",
  "/equipment_types/crafting_tool": "\u5236\u4f5c\u5de5\u5177",
  "/equipment_types/tailoring_tool": "\u7f1d\u7eab\u5de5\u5177",
  "/equipment_types/cooking_tool": "\u70f9\u996a\u5de5\u5177",
  "/equipment_types/brewing_tool": "\u51b2\u6ce1\u5de5\u5177",
  "/equipment_types/alchemy_tool": "\u70bc\u91d1\u5de5\u5177",
  "/equipment_types/enhancing_tool": "\u5f3a\u5316\u5de5\u5177",
}
export function equipmentTypeNameZH(hrid: string) {
  return equipmentTypeNamesZH[hrid] ?? hrid;
}
export function equipmentTypeName(hrid: string) {
  return gameData.equipmentTypeDetailMap[hrid]?.name ?? hrid;
}

export function getEquipmentBonuses(
  actionType: string,
  equipmentType: string,
  equipmentHrid: string | null,
  equipmentLevel: number,
) {
  if (equipmentHrid === null) return zeroBonuses;

  const bonuses = { ...zeroBonuses };
  const equipment = gameData.itemDetailMap[equipmentHrid]!;

  const stats = equipment.equipmentDetail.noncombatStats;

  bonuses[BUFF_TYPE_TASK_SPEED] += stats.taskSpeed;
  bonuses[BUFF_TYPE_EFFICIENCY] += stats.skillingEfficiency;
  bonuses[BUFF_TYPE_ENHANCING_SUCCESS] += stats.enhancingSuccess;
  bonuses[BUFF_TYPE_GATHERING] += stats.gatheringQuantity;
  bonuses[BUFF_TYPE_RARE_FIND] += stats.skillingRareFind;
  bonuses[BUFF_TYPE_WISDOM] += stats.skillingExperience;
  bonuses[BUFF_TYPE_ACTION_SPEED] += stats.skillingSpeed;

  if (actionType === "/action_types/milking") {
    bonuses[BUFF_TYPE_ACTION_SPEED] += stats.milkingSpeed;
    bonuses[BUFF_TYPE_EFFICIENCY] += stats.milkingEfficiency;
  }
  if (actionType === "/action_types/foraging") {
    bonuses[BUFF_TYPE_ACTION_SPEED] += stats.foragingSpeed;
    bonuses[BUFF_TYPE_EFFICIENCY] += stats.foragingEfficiency;
  }
  if (actionType === "/action_types/woodcutting") {
    bonuses[BUFF_TYPE_ACTION_SPEED] += stats.woodcuttingSpeed;
    bonuses[BUFF_TYPE_EFFICIENCY] += stats.woodcuttingEfficiency;
  }
  if (actionType === "/action_types/cheesesmithing") {
    bonuses[BUFF_TYPE_ACTION_SPEED] += stats.cheesesmithingSpeed;
    bonuses[BUFF_TYPE_EFFICIENCY] += stats.cheesesmithingEfficiency;
  }
  if (actionType === "/action_types/crafting") {
    bonuses[BUFF_TYPE_ACTION_SPEED] += stats.craftingSpeed;
    bonuses[BUFF_TYPE_EFFICIENCY] += stats.craftingEfficiency;
  }
  if (actionType === "/action_types/tailoring") {
    bonuses[BUFF_TYPE_ACTION_SPEED] += stats.tailoringSpeed;
    bonuses[BUFF_TYPE_EFFICIENCY] += stats.tailoringEfficiency;
  }
  if (actionType === "/action_types/cooking") {
    bonuses[BUFF_TYPE_ACTION_SPEED] += stats.cookingSpeed;
    bonuses[BUFF_TYPE_EFFICIENCY] += stats.cookingEfficiency;
  }
  if (actionType === "/action_types/brewing") {
    bonuses[BUFF_TYPE_ACTION_SPEED] += stats.brewingSpeed;
    bonuses[BUFF_TYPE_EFFICIENCY] += stats.brewingEfficiency;
  }
  if (actionType === "/action_types/alchemy") {
    bonuses[BUFF_TYPE_ACTION_SPEED] += stats.alchemySpeed;
  }
  if (actionType === "/action_types/enhancing") {
    bonuses[BUFF_TYPE_ACTION_SPEED] += stats.enhancingSpeed;
    bonuses[BUFF_TYPE_EFFICIENCY] += stats.enhancingSuccess;
  }

  const isJewelry = [
    "/equipment_types/earrings",
    "/equipment_types/rings",
    "/equipment_types/necklaces",
  ].includes(equipmentType);
  const jewelryMultiplier = isJewelry ? 5 : 1;

  const multiplier =
    1 +
    0.01 *
      jewelryMultiplier *
      gameData.enhancementLevelTotalBonusMultiplierTable[equipmentLevel]!;

  for (const key of Object.keys(bonuses)) {
    bonuses[key] *= multiplier;
  }

  return bonuses;
}
