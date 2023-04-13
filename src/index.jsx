import { StrictMode } from "react";
import ReactDOM from "react-dom";
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

ReactDOM.render(
  <StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </StrictMode>,
  document.getElementById("root"),
);
