import rawGameData from "~/data/init_client_info.json";
import { z } from "zod";

export const EquipmentTypeDetailSchema = z.object({
  hrid: z.string(),
  name: z.string(),
  itemLocationHrid: z.string(),
  sortIndex: z.number(),
});
export type EquipmentTypeDetail = z.infer<typeof EquipmentTypeDetailSchema>;

export const BuffSchema = z.object({
  uniqueHrid: z.string(),
  typeHrid: z.string(),
  ratioBoost: z.number(),
  ratioBoostLevelBonus: z.number(),
  flatBoost: z.number(),
  flatBoostLevelBonus: z.number(),
  startTime: z.string(),
  duration: z.number(),
});
export type Buff = z.infer<typeof BuffSchema>;

export const ItemDetailSchema = z.object({
  hrid: z.string(),
  name: z.string(),
  description: z.string(),
  categoryHrid: z.string(),
  sellPrice: z.number(),
  isTradable: z.boolean().optional().default(false),
  isOpenable: z.boolean().optional().default(false),
  itemLevel: z.number().optional().default(0),
  enhancementCosts: z.unknown(), // TODO
  protectionItemHrids: z.unknown(), // TODO
  equipmentDetail: z.object({
    type: z.string(),
    combatStats: z.object({
      // TODO
      drinkSlots: z.number().optional().default(0),
    }).optional(),
    noncombatStats: z.object({
      skillingSpeed: z.number().optional().default(0),
      milkingSpeed: z.number().optional().default(0),
      foragingSpeed: z.number().optional().default(0),
      woodcuttingSpeed: z.number().optional().default(0),
      cheesesmithingSpeed: z.number().optional().default(0),
      craftingSpeed: z.number().optional().default(0),
      tailoringSpeed: z.number().optional().default(0),
      cookingSpeed: z.number().optional().default(0),
      brewingSpeed: z.number().optional().default(0),
      alchemySpeed: z.number().optional().default(0),
      enhancingSpeed: z.number().optional().default(0),
      taskSpeed: z.number().optional().default(0),
      milkingEfficiency: z.number().optional().default(0),
      foragingEfficiency: z.number().optional().default(0),
      woodcuttingEfficiency: z.number().optional().default(0),
      cheesesmithingEfficiency: z.number().optional().default(0),
      craftingEfficiency: z.number().optional().default(0),
      tailoringEfficiency: z.number().optional().default(0),
      cookingEfficiency: z.number().optional().default(0),
      brewingEfficiency: z.number().optional().default(0),
      skillingEfficiency: z.number().optional().default(0),
      alchemyEfficiency: z.number().optional().default(0),
      enhancingSuccess: z.number().optional().default(0),
      gatheringQuantity: z.number().optional().default(0),
      skillingRareFind: z.number().optional().default(0),
      skillingExperience: z.number().optional().default(0),
    }),
  }).optional(),
  consumableDetail: z.object({
    cooldownDuration: z.number(),
    usableInActionTypeMap: z.record(z.boolean()).nullable(),
    hitpointRestore: z.number(),
    manapointRestore: z.number(),
    recoveryDuration: z.number(),
    buffs: z.array(BuffSchema).nullable(),
    defaultCombatTriggers: z.unknown(),
  }).optional(),
  abilityBookDetail: z.unknown(), // TODO
  sortIndex: z.number(),
});
export type ItemDetail = z.infer<typeof ItemDetailSchema>;

export const SkillDetailSchema = z.object({
  hrid: z.string(),
  name: z.string(),
  sortIndex: z.number(),
});
export type SkillDetail = z.infer<typeof SkillDetailSchema>;

export const DropTableEntrySchema = z.object({
  itemHrid: z.string(),
  dropRate: z.number(),
  minCount: z.number(),
  maxCount: z.number(),
});
export type DropTableEntry = z.infer<typeof DropTableEntrySchema>;

export const ItemCountSchema = z.object({
  itemHrid: z.string(),
  count: z.number(),
});
export type ItemCount = z.infer<typeof ItemCountSchema>;

export const ActionDetailSchema = z.object({
  hrid: z.string(),
  function: z.string(),
  type: z.string(),
  category: z.string(),
  name: z.string(),
  levelRequirement: z.object({
    skillHrid: z.string(),
    level: z.number(),
  }),
  baseTimeCost: z.number(),
  experienceGain: z.object({
    skillHrid: z.string(),
    value: z.number(),
  }),
  dropTable: z.array(DropTableEntrySchema).nullable(),
  rareDropTable: z.array(DropTableEntrySchema).nullable(),
  upgradeItemHrid: z.string(),
  inputItems: z.array(ItemCountSchema).nullable(),
  outputItems: z.array(ItemCountSchema).nullable(),
  monsterSpawnInfo: z.unknown(),
  sortIndex: z.number(),
});
export type ActionDetail = z.infer<typeof ActionDetailSchema>;

export const ActionTypeDetailSchema = z.object({
  hrid: z.string(),
  name: z.string(),
  sortIndex: z.number(),
});
export type ActionTypeDetail = z.infer<typeof ActionTypeDetailSchema>;

export const BuffTypeDetailSchema = z.object({
  hrid: z.string(),
  isCombat: z.boolean(),
  name: z.string(),
  description: z.string(),
  debuffDescription: z.string(),
  sortIndex: z.number(),
});
export type BuffTypeDetail = z.infer<typeof BuffTypeDetailSchema>;

const HouseRoomDetailSchema = z.object({
  hrid: z.string(),
  name: z.string(),
  skillHrid: z.string(),
  usableInActionTypeMap: z.record(z.boolean()),
  actionBuffs: z.array(BuffSchema),
  globalBuffs: z.array(BuffSchema),
  upgradeCostsMap: z.record(z.array(ItemCountSchema)),
  sortIndex: z.number(),
});
export type HouseRoomDetail = z.infer<typeof HouseRoomDetailSchema>;

const CommunityBuffTypeDetailSchema = z.object({
  hrid: z.string(),
  name: z.string(),
  usableInActionTypeMap: z.record(z.boolean()),
  buff: BuffSchema,
  description: z.string(),
  cowbellCost: z.number(),
  sortIndex: z.number(),
});

const GameDataSchema = z.object({
  equipmentTypeDetailMap: z.record(EquipmentTypeDetailSchema),
  skillDetailMap: z.record(SkillDetailSchema),
  itemDetailMap: z.record(ItemDetailSchema),
  enhancementLevelTotalBonusMultiplierTable: z.array(z.number()),
  actionDetailMap: z.record(ActionDetailSchema),
  actionTypeDetailMap: z.record(ActionTypeDetailSchema),
  buffTypeDetailMap: z.record(BuffTypeDetailSchema),
  houseRoomDetailMap: z.record(HouseRoomDetailSchema),
  communityBuffTypeDetailMap: z.record(CommunityBuffTypeDetailSchema),
});

export type GameData = z.infer<typeof GameDataSchema>;
export const gameData = GameDataSchema.parse(rawGameData);
