import { atom } from "recoil";

const listToPrint = atom({
  key: "listToPrint",
  default: [],
});

export default listToPrint;
