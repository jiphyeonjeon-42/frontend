import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "jotai";
import { sentryInit } from "./config/sentry";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";

sentryInit();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </Provider>
  </StrictMode>,
);
