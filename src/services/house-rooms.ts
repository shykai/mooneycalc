import { gameData } from "./data";

export const houseRooms = Object.values(gameData.houseRoomDetailMap).sort(
  (a, b) => a.sortIndex - b.sortIndex,
);

const houseRoomNamesCN = {
  "/house_rooms/dairy_barn": "\u5976\u725b\u68da",
  "/house_rooms/garden": "\u82b1\u56ed",
  "/house_rooms/log_shed": "\u6728\u68da",
  "/house_rooms/forge": "\u953b\u9020\u53f0",
  "/house_rooms/workshop": "\u5de5\u4f5c\u95f4",
  "/house_rooms/sewing_parlor": "\u7f1d\u7eab\u5ba4",
  "/house_rooms/kitchen": "\u53a8\u623f",
  "/house_rooms/brewery": "\u51b2\u6ce1\u574a",
  "/house_rooms/laboratory": "\u5b9e\u9a8c\u5ba4",
  "/house_rooms/observatory": "\u5929\u6587\u53f0",
  "/house_rooms/dining_room": "\u9910\u5385",
  "/house_rooms/library": "\u56fe\u4e66\u9986",
  "/house_rooms/dojo": "\u9053\u573a",
  "/house_rooms/gym": "\u5065\u8eab\u623f",
  "/house_rooms/armory": "\u519b\u68b0\u5e93",
  "/house_rooms/archery_range": "\u5c04\u7bad\u573a",
  "/house_rooms/mystical_study": "\u795e\u79d8\u7814\u7a76\u5ba4"
};
export function houseNameZH(houseHrid: string) {
  return houseRoomNamesCN[houseHrid] ?? gameData.houseRoomDetailMap[houseHrid]?.name ?? houseHrid;
}