import { expect, test } from '@playwright/test';

test.describe('Form Interactions', () => {
  test('should handle different input types', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/inputs');
    
    const numberInput = page.locator('input[type="number"]');
    await numberInput.fill('6412754625124');
    await expect(numberInput).toHaveValue('6412754625124');
  });
});