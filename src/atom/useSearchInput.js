import { atom } from "recoil";

export const useSearchInput = atom({ key: "useSearchInput", default: "" });
export const useModalSearchInput = atom({
  key: "useModalSearchInput",
  default: "",
});
