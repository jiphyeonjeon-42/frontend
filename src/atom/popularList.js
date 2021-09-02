import { atom } from "recoil";

const popularList = atom({
  key: "popularList",
  default: [],
});

export default popularList;
