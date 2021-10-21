import { atom } from "recoil";

const globalModal = atom({
  key: "globalModal",
  default: {
    view: false,
    error: "",
  },
});

export default globalModal;
