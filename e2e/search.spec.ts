import { test, expect } from "@playwright/test";

test("전체 도서 목록 열람", async ({ page }) => {
  await page.goto("http://localhost:4242/");
  await page.getByRole("link", { name: "bookList 도서목록" }).click();
  await page.getByRole("button", { name: "IT 일반" }).click();
  await page.getByRole("button", { name: "개발방법론" }).click();
  await page.getByRole("button", { name: "게임" }).click();
  await page.getByRole("button", { name: "기술과학" }).click();
  await page.getByRole("button", { name: "네트워크" }).click();
  await page.getByRole("button", { name: "데이터 분석/AI/ML" }).click();
  await page.getByRole("button", { name: "nextCategory" }).click();
  await page.getByRole("button", { name: "nextCategory" }).dblclick();
  await page.getByRole("button", { name: "데이터베이스" }).click();
  await page.getByRole("button", { name: "데이터베이스" }).click();
  await page.getByRole("button", { name: "디자인/그래픽" }).click();
  await page.getByRole("button", { name: "nextCategory" }).dblclick();
  await page.getByRole("button", { name: "모바일 프로그래밍" }).click();
  await page.getByRole("button", { name: "문학" }).click();
  await page.getByRole("button", { name: "nextCategory" }).click({
    clickCount: 3,
  });
  await page.getByRole("button", { name: "nextCategory" }).click();
  await page.getByRole("button", { name: "preCategory" }).click();
  await page.getByRole("button", { name: "미정" }).click();
  await page.getByRole("button", { name: "보안/해킹/블록체인" }).click();
  await page.getByRole("button", { name: "사회과학" }).click();
  await page.getByRole("button", { name: "순수과학" }).click();
});

test("러닝 리액트 도서 검색", async ({ page }) => {
  await page.goto("http://localhost:4242/");
  await page.getByRole("textbox").click();
  await page.getByRole("textbox").fill("리액트");
  await page.getByRole("textbox").press("Enter");
  await page
    .getByRole("link", {
      name: "러닝 리액트 러닝 리액트 알렉스 뱅크스 | 한빛미디어 | 웹 프로그래밍 발행연월2021년 6월 표준부호9791162244494 러닝 리액트",
    })
    .click();
  await page.getByText("확인하기").click();
  await page.getByRole("button", { name: "리뷰하기" }).click();
  await page.getByRole("button", { name: "리뷰", exact: true }).click();
  await page.getByText("검색 > 도서상세페이지 및 예약").click();
});
