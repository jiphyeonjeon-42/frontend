import { atom } from "recoil";

const userState = atom({
  key: "userState",
  default: {
    isLogin: false,
    id: 0,
    userName: "",
    email: "",
    isAdmin: false,
    expire: "",
  },
});

export default userState;
