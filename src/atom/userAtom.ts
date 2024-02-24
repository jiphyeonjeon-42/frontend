import { atom, selector } from "recoil";
import type { UserState } from "../type";
import { localStorageEffect } from "../util/localStorageEffect";
import { isExpiredDate } from "~/util/date";

const defaultUserState: UserState = {
  isLogin: false,
  id: 0,
  userName: undefined,
  email: undefined,
  isAdmin: false,
  expire: undefined,
};

// TODO: UserState | null 타입 사용
export const userAtom = atom<UserState>({
  key: "user",
  default: defaultUserState,
  effects: [localStorageEffect("user")],
});

export const userIdAtom = selector<number>({
  key: "userId",
  get: ({ get }) => get(userAtom).id,
});

export const isUserExpiredAtom = selector<boolean>({
  key: "isUserExpired",
  get: ({ get }) => {
    const user = get(userAtom);

    return isExpiredDate(user.expire ?? "1970-01-01T00:00:00.000Z");
  },
});

export const isUserAuthedAtom = selector<boolean>({
  key: "isUserAuthed",
  get: ({ get }) => {
    const user = get(userAtom);
    const isExpired = get(isUserExpiredAtom);

    return !isExpired && user.isLogin;
  },
});
