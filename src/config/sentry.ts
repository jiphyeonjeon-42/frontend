// reference : https://docs.sentry.io/platforms/javascript/guides/react/features/react-router/

import { useEffect } from "react";
import * as Sentry from "@sentry/react";
import {
  Routes,
  createRoutesFromChildren,
  matchRoutes,
  useLocation,
  useNavigationType,
} from "react-router-dom";

export const sentryInit = () => {
  Sentry.init({
    dsn: import.meta.env.REACT_APP_SENTRY,
    integrations: [
      new Sentry.BrowserTracing({
        routingInstrumentation: Sentry.reactRouterV6Instrumentation(
          useEffect,
          useLocation,
          useNavigationType,
          createRoutesFromChildren,
          matchRoutes,
        ),
      }),
      new Sentry.Replay({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    environment:
      import.meta.env.REACT_APP_API === "http://localhost:3000/api"
        ? "development"
        : "production",
  });
};

export const SentryRoutes = Sentry.withSentryReactRouterV6Routing(Routes);
