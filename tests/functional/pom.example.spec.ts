import { test, expect } from "@playwright/test";
import { RegisterPage } from "../page-objects/RegisterPage";
import { faker } from "@faker-js/faker";

test.describe("page object model -> Parabank Test", { tag: "@pom" }, () => {
  test("Register at Parabank", async ({ page }) => {
    const MAX_RETRIES = 3;
    const password = faker.internet.password();
    const registerPage = new RegisterPage(page);

    for (let i = 0; i < MAX_RETRIES; i++) {
      let username = faker.internet.username();
      await registerPage.goto();
      await registerPage.fillForm();
      await registerPage.fillCredentials(username, password);
      await registerPage.submitForm();
      await page.waitForLoadState("networkidle");

      if (await registerPage.isErrorVisible()) {
        continue;
      }
      await registerPage.verifyAccountCreation(username);
      page.context().storageState({
        path: "/Users/aadya/Documents/brijendra_home/workspace/lab/playwright-e2e-tests/playwright/.auth/user.json",
      });
      break;
    }
  });
});
