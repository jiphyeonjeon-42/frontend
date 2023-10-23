import { AtomEffect } from "recoil";

/**
 * recoil atom 상태를 localStorage에 연동합니다.
 *
 * {@link https://recoiljs.org/docs/guides/atom-effects/#local-storage-persistence | recoil 공식 문서 }
 */
export const localStorageEffect =
  <T>(key: string): AtomEffect<T> =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };
