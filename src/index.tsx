import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import App from "./App";
import "./index.css";

Sentry.init({
  dsn: import.meta.env.REACT_APP_SENTRY,
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
  environment:
    import.meta.env.REACT_APP_API === "http://localhost:3000/api"
      ? "development"
      : "production",
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </StrictMode>,
);
