import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import App from "./App";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

Sentry.init({
  dsn: import.meta.env.REACT_APP_SENTRY,
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
  environment:
    import.meta.env.REACT_APP_API === "http://localhost:3000/api"
      ? "development"
      : "production",
});

export const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <App />
        <ReactQueryDevtools />
      </RecoilRoot>
    </QueryClientProvider>
  </StrictMode>,
);
