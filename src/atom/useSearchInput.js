import { atom } from "recoil";

export const useSearchInput = atom({ key: "useSearchInput", default: "" });
export const useAdminSearchInput = atom({
  key: "useAdminSearchInput",
  default: "",
});
