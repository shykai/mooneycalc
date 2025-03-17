"use client";

import { useSettingsStore } from "~/services/settings";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { skills, skillNameZH } from "~/services/skills";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { equipmentTypes, equipmentTypeNameZH } from "~/services/equipment";
import {
  isSkillingEquipment,
  itemName, itemNameZH,
  itemsByEquipmentType,
} from "~/services/items";
import { houseNameZH } from "~/services/house-rooms";
import {communityBuffsNameZH} from "~/services/community-buffs";
import { BidAskSlider } from "./bid-ask-slider";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Checkbox } from "./ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { gameData } from "~/services/data";

export function SettingsForm() {
  const settings = useSettingsStore((state) => state.settings);
  const updateSettings = useSettingsStore((state) => state.updateSettings);

  // Filter out combat skills
  const combatSkillsHrids = [
    "/skills/stamina",
    "/skills/intelligence",
    "/skills/attack",
    "/skills/power",
    "/skills/defense",
    "/skills/ranged",
    "/skills/magic",
  ];
  const skillingSkills = skills.filter(
    ({ hrid }) => !combatSkillsHrids.includes(hrid),
  );

  return (
    <Tabs defaultValue="levels">
      <TabsList>
        <TabsTrigger value="levels">等级</TabsTrigger>
        <TabsTrigger value="skilling-equipment">装备</TabsTrigger>
        <TabsTrigger value="house">房屋</TabsTrigger>
        <TabsTrigger value="community-buffs">社区增益</TabsTrigger>
        <TabsTrigger value="market">市场</TabsTrigger>
        <TabsTrigger value="other">其他</TabsTrigger>
      </TabsList>
      <div className="h-4"></div>
      <TabsContent value="levels">
        <Card>
          <CardHeader>
            <CardTitle>等级</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-flow-row grid-cols-[repeat(auto-fit,minmax(160px,_1fr))] gap-4">
            {skillingSkills.map(({ hrid}) => {
              const level = settings.levels[hrid]!;

              return (
                <div key={hrid} className="grid items-center gap-1.5">
                  <Label htmlFor={hrid}>{skillNameZH(hrid)}</Label>
                  <Input
                    type="number"
                    id={hrid}
                    value={level}
                    onChange={(e) =>
                      updateSettings({
                        ...settings,
                        levels: {
                          ...settings.levels,
                          [hrid]: parseInt(e.target.value, 10),
                        },
                      })
                    }
                  />
                </div>
              );
            })}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="skilling-equipment">
        <Card>
          <CardHeader>
            <CardTitle>装备</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-flow-row grid-cols-[repeat(auto-fit,minmax(220px,_1fr))] gap-4">
              {equipmentTypes.map(({ hrid}) => {
                const selectedEquipment = settings.equipment[hrid]!;

                // Filter out items that provide no non-combat bonuses
                const equipmentOptions =
                  itemsByEquipmentType(hrid).filter(isSkillingEquipment);

                return (
                  <div key={hrid} className="grid items-center gap-1.5">
                    <Label htmlFor={hrid}>{equipmentTypeNameZH(hrid)}</Label>
                    <div className="flex items-center gap-1">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="flex-grow">
                          <Input
                            type="text"
                            id={hrid}
                            value={itemNameZH(selectedEquipment) ?? ""}
                            readOnly
                            className="cursor-pointer"
                          />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            onClick={() =>
                              updateSettings({
                                ...settings,
                                equipment: {
                                  ...settings.equipment,
                                  [hrid]: null,
                                },
                              })
                            }
                          >
                            空
                          </DropdownMenuItem>
                          {equipmentOptions.map(
                            ({ hrid: itemHrid}) => (
                              <DropdownMenuItem
                                key={itemHrid}
                                onClick={() =>
                                  updateSettings({
                                    ...settings,
                                    equipment: {
                                      ...settings.equipment,
                                      [hrid]: itemHrid,
                                    },
                                  })
                                }
                              >
                                {itemNameZH(itemHrid)}
                              </DropdownMenuItem>
                            ),
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                      +
                      <Input
                        type="number"
                        className="w-16"
                        min={0}
                        max={20}
                        value={settings.equipmentLevels[hrid]}
                        onChange={(e) =>
                          updateSettings({
                            ...settings,
                            equipmentLevels: {
                              ...settings.equipmentLevels,
                              [hrid]: parseInt(e.target.value, 10),
                            },
                          })
                        }
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="house">
        <Card>
          <CardHeader>
            <CardTitle>房屋</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-flow-row grid-cols-[repeat(auto-fit,minmax(160px,_1fr))] gap-4">
              {Object.values(gameData.houseRoomDetailMap).map((houseRoom) => {
                const selectedLevel = settings.houseRooms[houseRoom.hrid]!;

                return (
                  <div
                    key={houseRoom.hrid}
                    className="grid items-center gap-1.5"
                  >
                    <Label htmlFor={houseRoom.hrid}>{houseNameZH(houseRoom.hrid)}</Label>
                    <Input
                      type="number"
                      id={houseRoom.hrid}
                      min={0}
                      max={8}
                      value={selectedLevel}
                      onChange={(e) =>
                        updateSettings({
                          ...settings,
                          houseRooms: {
                            ...settings.houseRooms,
                            [houseRoom.hrid]: parseInt(e.target.value, 10),
                          },
                        })
                      }
                    />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="community-buffs">
        <Card>
          <CardHeader>
            <CardTitle>社区增益</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-flow-row grid-cols-[repeat(auto-fit,minmax(160px,_1fr))] gap-4">
              {Object.values(gameData.communityBuffTypeDetailMap).map(
                (communityBuffType) => {
                  const selectedLevel =
                    settings.communityBuffs[communityBuffType.hrid]!;

                  return (
                    <div
                      key={communityBuffType.hrid}
                      className="grid items-center gap-1.5"
                    >
                      <Label htmlFor={communityBuffType.hrid}>
                        {communityBuffsNameZH(communityBuffType.hrid)}
                      </Label>
                      <Input
                        type="number"
                        id={communityBuffType.hrid}
                        min={0}
                        max={20}
                        value={selectedLevel}
                        onChange={(e) =>
                          updateSettings({
                            ...settings,
                            communityBuffs: {
                              ...settings.communityBuffs,
                              [communityBuffType.hrid]: parseInt(
                                e.target.value,
                                10,
                              ),
                            },
                          })
                        }
                      />
                    </div>
                  );
                },
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="market">
        <Card>
          <CardHeader>
            <CardTitle>市场</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-around">
              <BidAskSlider
                label="原材料购入价格"
                inverted={true}
                value={settings.market.inputBidAskProportion}
                updateValue={(value) =>
                  updateSettings({
                    ...settings,
                    market: {
                      ...settings.market,
                      inputBidAskProportion: value,
                    },
                  })
                }
              />
              <BidAskSlider
                label="成品卖出价格"
                inverted={false}
                value={settings.market.outputBidAskProportion}
                updateValue={(value) =>
                  updateSettings({
                    ...settings,
                    market: {
                      ...settings.market,
                      outputBidAskProportion: value,
                    },
                  })
                }
              />
              <RadioGroup
                value={settings.market.pricePeriod}
                onValueChange={(value) => {
                  if (value !== "latest" && value !== "median") {
                    return;
                  }

                  return updateSettings({
                    ...settings,
                    market: {
                      ...settings.market,
                      pricePeriod: value,
                    },
                  });
                }}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="latest" id="latest" />
                  <Label htmlFor="latest">最新价格</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="median" id="median" />
                  <Label htmlFor="median">24小时中位价</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="other">
        <Card>
          <CardHeader>
            <CardTitle>其他</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hide-unmet-level-requirements"
                  checked={
                    settings?.filters?.hideUnmetLevelRequirements ?? true
                  }
                  onCheckedChange={(checked) => {
                    if (checked === "indeterminate") {
                      return;
                    }

                    return updateSettings({
                      ...settings,
                      filters: {
                        ...settings.filters,
                        hideUnmetLevelRequirements: checked,
                      },
                    });
                  }}
                />
                <Label
                  htmlFor="hide-unmet-level-requirements"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  隐藏未达到等级要求的操作
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="show-auto-teas"
                  checked={settings?.filters?.showAutoTeas ?? false}
                  onCheckedChange={(checked) => {
                    if (checked === "indeterminate") {
                      return;
                    }

                    return updateSettings({
                      ...settings,
                      filters: {
                        ...settings.filters,
                        showAutoTeas: checked,
                      },
                    });
                  }}
                />
                <Label
                  htmlFor="show-auto-teas"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  自动配置茶叶
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
