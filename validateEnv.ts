import { envPrefix } from "./vite.config";

/** 앱이 동작하는데 꼭 필요한 환경 변수의 목록입니다. */
const ENV_KEYS = [
  "PORT",
  "REACT_APP_API",
  "REACT_APP_WISH",
  "REACT_APP_E_BOOK_LIBRARY",
  "REACT_APP_SUGGESTION",
] as const;

/** `.env` 파일을 바로 읽은 키-배열 값입니다. 검증되지 않았습니다. */
type RawEnv = Record<string, string>;

/** {@link ENV_KEYS} 키값이 있는 {@link RawEnv}입니다. */
type Env = Record<typeof ENV_KEYS[ number ], string>;

/** `.env` 파일에 필수 환경변수가 있는지 확인합니다. */
export function validateEnv(rawEnv: RawEnv): Env {
  for (const key of ENV_KEYS) {
    const value = rawEnv[ key ];
    if (value === undefined) {
      throw new Error(`Missing required env: "${key}"`);
    } else if (value === "") {
      throw new Error(`Empty env for ${key}`);
    } else if (key.startsWith(envPrefix) && !isValidUrl(value)) {
      throw new Error(`Invalid url for ${key}: "${value}"`);
    }
  }

  return rawEnv as Env;
}

function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
