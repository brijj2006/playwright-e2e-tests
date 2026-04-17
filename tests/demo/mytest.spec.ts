import { test, expect } from "@playwright/test";

test("should have the correct title and header", async ({ page }) => {
  await page.goto("https://katalon-demo-cura.herokuapp.com/");
  await expect(page).toHaveTitle("CURA Healthcare Service");
  await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");
});

test("smoke test for application", { tag: "@smoke" }, async ({ page }) => {
  await page.goto("https://katalon-demo-cura.herokuapp.com/");
  await expect(page).toHaveTitle("CURA Healthcare Service");
  await expect(page.locator("//h3")).toHaveText("We Care About Your Health");
});

test(
  "regression test for the application",
  { tag: "@regression" },
  async ({ page }) => {
    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    await page.locator("#btn-make-appointment").click();
    await expect(page.locator(".lead")).toHaveText(
      "Please login to make appointment.",
    );
  },
);
