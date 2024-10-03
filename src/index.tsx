import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";
import { sentryInit } from "./config/sentry";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";

sentryInit();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RecoilRoot>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </RecoilRoot>
  </StrictMode>,
);
