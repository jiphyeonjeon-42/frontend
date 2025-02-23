import type { UserState } from "../type";
import { isExpiredDate } from "~/util/date";
import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai";

const defaultUserState: UserState = {
  isLogin: false,
  id: 0,
  userName: undefined,
  email: undefined,
  isAdmin: false,
  expire: undefined,
};

// TODO: UserState | null 타입 사용
export const userAtom = atomWithStorage("user", defaultUserState, undefined, {
  getOnInit: true,
});

export const userIdAtom = atom(get => get(userAtom).id);

export const isUserExpiredAtom = atom(get => {
  const user = get(userAtom);
  return isExpiredDate(user.expire ?? "1970-01-01T00:00:00.000Z");
});

export const isUserAuthedAtom = atom(get => {
  const user = get(userAtom);
  const isExpired = get(isUserExpiredAtom);

  return !isExpired && user.isLogin;
});
