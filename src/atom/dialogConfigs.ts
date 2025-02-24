import { atom } from "jotai";
import { DialogConfig } from "../type/DialogConfig";

export const dialogConfigs = atom<DialogConfig[]>([]);
