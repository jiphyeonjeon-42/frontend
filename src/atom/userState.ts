import { atom } from "recoil";
import type { UserState } from "../type";

const userState = atom<UserState>({
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
