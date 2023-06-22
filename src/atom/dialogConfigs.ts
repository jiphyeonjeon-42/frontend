import { atom } from "recoil";
import { DialogConfig } from "../type/DialogConfig";

export const dialogConfigs = atom<DialogConfig[]>({
  key: "dialogConfigs",
  default: [],
});
