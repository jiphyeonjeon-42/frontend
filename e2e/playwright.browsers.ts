import { devices } from "@playwright/test";
import os from "node:os";

// https://github.com/microsoft/playwright/issues/23296
const disableWebkit =
  os.platform() === "linux" && !process.env.CI && !process.env.IS_DOCKER;

export const nonLTSLinuxBrowsers = [
  { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  { name: "firefox", use: { ...devices["Desktop Firefox"] } },
];

const macBrowser = { name: "webkit", use: { ...devices["Desktop Safari"] } };

export const majorBrowsers = disableWebkit
  ? nonLTSLinuxBrowsers
  : [...nonLTSLinuxBrowsers, macBrowser];

/* Test against mobile viewports. */
const mobileViewports = [
  { name: "Mobile Chrome", use: { ...devices["Pixel 5"] } },
  { name: "Mobile Safari", use: { ...devices["iPhone 12"] } },
];

/* Test against branded browsers. */
const brandedBrowsers = [
  {
    name: "Microsoft Edge",
    use: { ...devices["Desktop Edge"], channel: "msedge" },
  },
  {
    name: "Google Chrome",
    use: { ...devices["Desktop Chrome"], channel: "chrome" },
  },
];

/** List of all browsers to test against. */
export const projects = majorBrowsers;
