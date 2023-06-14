import { test, expect } from "@playwright/test";

test("집현전 로고가 보임", async ({ page }) => {
  await page.goto("/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/집현전/);
});
