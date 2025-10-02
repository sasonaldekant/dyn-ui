import { test, expect } from '@playwright/test';

test('Page has accessible title', async ({ page }) => {
  // NOTE: Adjust the URL to your actual app or Storybook instance
  await page.goto('http://localhost:3000');
  await expect(page).toHaveTitle(/dyn ui/i);
});
