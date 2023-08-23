import { test } from "@playwright/test";

test("전체 도서 목록 열람", async ({ page }) => {
  await page.goto("http://localhost:4242/");
  await page.getByRole("link").filter({ hasText: "도서목록" }).click();
  await page.getByRole("button", { name: "IT 일반" }).click();
  await page.getByRole("button", { name: "nextCategory" }).click();
  await page.getByRole("button", { name: "preCategory" }).click();
  await page.getByRole("button", { name: "순수과학" }).click();
});

test("러닝 리액트 도서 검색", async ({ page }) => {
  await page.goto("http://localhost:4242/");
  await page.getByRole("textbox").click();
  await page.getByRole("textbox").fill("리액트");
  await page.getByRole("textbox").press("Enter");
  await page
    .getByRole("link")
    .filter({
      hasText: "러닝 리액트 러닝 리액트 알렉스 뱅크스 | 한빛미디어",
    })
    .click();
});
