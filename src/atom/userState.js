import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "recoil-persist",
  storage: localStorage,
});
const userState = atom({
  key: "userState",
  default: {
    isLogin: false,
    id: 0,
    userId: "",
    isAdmin: false,
    imgUrl: "",
  },
  effects_UNSTABLE: [persistAtom],
});

export default userState;
