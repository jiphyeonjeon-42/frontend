// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig, loadEnv } from "vite";
// eslint-disable-next-line import/no-extraneous-dependencies
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import prerender from "@prerenderer/rollup-plugin";

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
  const env = loadEnv(mode, process.cwd(), "");
  const port = parseInt(env.PORT, 10);
  // TODO: 추후 모든 책들의 id 추가. /info/*
  // const pagesForPrerender = ["/"];

  return {
    /** @see https://vitejs.dev/plugins/ */
    plugins: [
      react(),
      tsconfigPaths(),
      // prerender({
      //   routes: pagesForPrerender,
      //   renderer: "@prerenderer/renderer-puppeteer",
      //   server: {
      //     "host": 'localhost',
      //     "port": port,
      //     "listenHost": 'localhost',
      //   },
      //   rendererOptions: {
      //     maxConcurrentRoutes: 1,
      //     renderAfterTime: 5000,

      //   },
      //   postProcess(renderedRoute) {
      //     renderedRoute.html = renderedRoute.html
      //       .replace(/http:/i, "https:")
      //       .replace(
      //         /(https:\/\/)?(localhost|127\.0\.0\.1):\d*/i,
      //         "https://42library.kr",
      //       );
      //   },
      // }),
    ],

    envPrefix,

    /** @see https://vitejs.dev/config/server-options.html#server-port */
    server: { port, strictPort: true, host: true },

    /** @see https://vitejs.dev/config/build-options.html#build-outdir */
    build: { outDir: "build", chunkSizeWarningLimit: 4242 },
  };
});
