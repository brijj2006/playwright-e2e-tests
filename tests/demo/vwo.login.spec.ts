import { test, expect } from '@playwright/test';

const VWO_LOGIN_URL = 'https://app.vwo.com/#/login';
const INVALID_EMAIL = 'invalid.user@test.com';
const INVALID_PASSWORD = 'WrongPassword123';
const EXPECTED_ERROR = 'Your email, password, IP address or location did not match';

// prompt for github co-pilot
// use playwright cli codegen to record a login flow on https://app.vwo.com/, add invalid username , 
// invalid password and there will be an error, verify the error. 
// Then refine and generate the test into the produciton ready spec file.

test.describe('VWO Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(VWO_LOGIN_URL);
    await expect(page).toHaveTitle('Login - VWO');
  });

  test(
    'should display an error message when invalid credentials are submitted',
    { tag: '@playwrightCli' },
    async ({ page }) => {
      // Fill in invalid email
      await page.getByRole('textbox', { name: 'Email address' }).fill(INVALID_EMAIL);

      // Fill in invalid password
      await page.getByRole('textbox', { name: 'Password' }).fill(INVALID_PASSWORD);

      // Click the Sign in button
      await page.getByRole('button', { name: 'Sign in', exact: true }).click();

      // Verify error message is visible
      const errorMessage = page.getByText(EXPECTED_ERROR);
      await expect(errorMessage).toBeVisible();

      // Verify page remains on the login page (no redirect on failure)
      await expect(page).toHaveURL(/#\/login/);

      // Verify the email field still shows the entered value
      await expect(page.getByRole('textbox', { name: 'Email address' })).toHaveValue(INVALID_EMAIL);
    }
  );

  test(
    'should keep login form intact after a failed login attempt',
    { tag: '@playwrightCli' },
    async ({ page }) => {
      await page.getByRole('textbox', { name: 'Email address' }).fill(INVALID_EMAIL);
      await page.getByRole('textbox', { name: 'Password' }).fill(INVALID_PASSWORD);
      await page.getByRole('button', { name: 'Sign in', exact: true }).click();

      // Form elements should still be present and interactable
      await expect(page.getByRole('textbox', { name: 'Email address' })).toBeVisible();
      await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Sign in', exact: true })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Forgot Password?' })).toBeVisible();
    }
  );
});
