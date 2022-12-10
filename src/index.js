import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import App from "./App";
import "./index.css";

Sentry.init({
  dsn: "https://a03d63cfc79147d292b9b09630e70e4a@o4504156227567616.ingest.sentry.io/4504156228485120",
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
  environment:
    process.env.REACT_APP_API === "http://localhost:3000/api"
      ? "development"
      : "production",
});

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root"),
);
