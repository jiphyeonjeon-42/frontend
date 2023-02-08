// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig, loadEnv } from "vite";
// eslint-disable-next-line import/no-extraneous-dependencies
import react from "@vitejs/plugin-react-swc";
// eslint-disable-next-line import/no-unresolved, import/extensions
import { validateEnv } from "./validateEnv";

/**
 * REACT_APP_ 으로 시작하는 환경변수를
 * import.meta.env.REACT_APP_{변수명} 으로 사용할 수 있습니다.
 * @see https://vitejs.dev/config/shared-options.html#envprefix
 */
export const envPrefix = "REACT_APP_";

/**
 * vite 프로젝트 설정 파일
 *
 * @see https://vitejs.dev/config/
 */
export default defineConfig(({ mode }) => {
  const env = validateEnv(loadEnv(mode, process.cwd(), ""));
  const port = parseInt(env.PORT, 10);

  return {
    /** @see https://vitejs.dev/plugins/ */
    plugins: [react()],

    envPrefix,

    /** @see https://vitejs.dev/config/server-options.html#server-port */
    server: { port, strictPort: true, host: true },

    /** @see https://vitejs.dev/config/build-options.html#build-outdir */
    build: { outDir: "build" },
  };
});
