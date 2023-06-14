import { test, expect } from '@playwright/test';

test('42 로그인 페이지 이동', async ({ page }) => {
  await page.goto('http://localhost:4242/');
  await page.getByRole('link', { name: 'login 로그인' }).click();
  await page.getByRole('link', { name: '42 intra 로그인' }).click();
  await page.getByRole('link', { name: 'Sign in as student' }).click();
  await page.getByPlaceholder('Login or email').click();
  await page.locator('body').click();
});
