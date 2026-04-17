import { test, expect } from "@playwright/test";

test("should have the correct title and header", async ({ page }) => {
  await page.goto("https://katalon-demo-cura.herokuapp.com/");
  await expect(page).toHaveTitle("CURA Healthcare Service");
  await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");
});

test("should do something", { tag: "@smoke" }, async ({ page }, testInfo) => {
  await expect(page).toHaveURL("");
  await expect(page.locator("")).toBeVisible();
});

test("", { tag: "@regression" }, async ({ page }) => {
  await page.locator("").setInputFiles("");
});
