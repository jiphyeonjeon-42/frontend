import { atom } from "recoil";

export const entireCategory = atom({ key: "entireCategory", default: [] });
export const userCategory = atom({ key: "userCategory", default: 0 });
export const userCategoryName = atom({ key: "userCategoryName", default: "" });
export const startCategory = atom({ key: "startCategory", default: 0 });
