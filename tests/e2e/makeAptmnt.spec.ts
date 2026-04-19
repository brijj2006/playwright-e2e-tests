import { test, expect } from "@playwright/test";

test.describe("Make Appointment", () => {
  test.beforeEach(
    "Login to app and go to make appointment page",
    async ({ page }) => {
      await page.goto("https://katalon-demo-cura.herokuapp.com/");
      await expect(page).toHaveTitle("CURA Healthcare Service");
      await page.getByRole("link", { name: "Make Appointment" }).click();

      await expect(page.locator(".lead")).toHaveText(
        "Please login to make appointment.",
      );
      await page.locator("#txt-username").clear();
      await page.locator("#txt-username").fill("John Doe");
      await page.locator("#txt-password").clear();
      await page.locator("#txt-password").fill("ThisIsNotAPassword");
      await page.locator("#btn-login").click();
      await expect(
        page.locator("//h2[text()='Make Appointment']"),
      ).toBeVisible();
    },
  );

  test(
    "make appointment for non default values",
    { tag: "@demo" },
    async ({ page }) => {
      await page
        .locator("#combo_facility")
        .selectOption("Hongkong CURA Healthcare Center");
      await page.locator("#chk_hospotal_readmission").click();

      await page.locator("#radio_program_medicaid").click();

      await page.locator("#txt_visit_date").click();
      await page.locator("#txt_visit_date").fill("01/01/2026");
      await page.locator("#txt_visit_date").press("Enter");

      await page.locator("#txt_comment").clear();
      await page.locator("#txt_comment").fill("Book Test Appointment");

      await page.getByRole("button", { name: "Book Appointment" }).click();

      await expect(page.locator("//h2")).toHaveText("Appointment Confirmation");
    },
  );
});
