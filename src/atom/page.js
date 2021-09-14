import { atom } from "recoil";

export const lastPageNum = atom({ key: "lastPageNum", default: 0 });
export const currentPage = atom({ key: "currentPage", default: 1 });
export const pageRangeState = atom({
  key: "pageRangeState",
  default: 0,
});
