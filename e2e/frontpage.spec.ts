import { test, expect } from "@playwright/test";

test("has title 집현전", async ({ page }) => {
  await page.goto("/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/집현전/);
});
