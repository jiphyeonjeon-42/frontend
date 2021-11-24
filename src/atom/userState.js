import { atom } from "recoil";

const userState = atom({
  key: "userState",
  default: {
    isLogin: false,
    id: 0,
    userId: "",
    isAdmin: false,
    imgUrl: "",
    expire: "",
  },
});

export default userState;
