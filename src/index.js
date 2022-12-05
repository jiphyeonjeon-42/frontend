import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import "./index.css";
import App from "./App";

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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
