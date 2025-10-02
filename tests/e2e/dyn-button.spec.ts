import { test, expect } from '@playwright/test';

test('DynButton loads and is clickable', async ({ page }) => {
  // NOTE: Adjust the URL to point to your local or deployed Storybook/demo page
  await page.goto('http://localhost:3000');
  const button = page.getByRole('button').first();
  await expect(button).toBeVisible();
  await button.click();
  // Additional assertions can be added here once application context is available
});
