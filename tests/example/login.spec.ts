import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test.describe('Login Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateTo('/login');
  });

  test('should login with valid credentials', async ({ page }) => {
    await loginPage.login('admin', 'password123');
    
    await expect(page).toHaveURL(/.*dashboard/);
    await expect(page.getByText('Welcome')).toBeVisible();
  });

  test('should show error with invalid credentials', async () => {
    await loginPage.login('invalid', 'invalid');
    
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Invalid credentials');
  });

  test('should validate required fields', async () => {
    await loginPage.loginButton.click();
    
    await expect(loginPage.usernameInput).toHaveAttribute('aria-invalid', 'true');
    await expect(loginPage.passwordInput).toHaveAttribute('aria-invalid', 'true');
  });
});