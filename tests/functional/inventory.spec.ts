import { test, expect } from "@playwright/test";

test.describe("test inventory flow", () => {
  test.beforeEach("test setup", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await expect(page).toHaveTitle("Swag Labs");

    await page.locator("#user-name").clear();
    await page.locator("#user-name").fill("standard_user");

    await page.locator("#password").clear();
    await page.locator("#password").fill("secret_sauce");

    await page.locator("#login-button").click();

    await expect(page.locator(".title")).toHaveText("Products");
  });

  test("verify inventory items price > 0", async ({ page }) => {
    let productList = page.locator(".inventory_item ");
    let prodCount = await productList.count();

    await expect(productList).toHaveCount(6);

    for (let i = 0; i < prodCount; i++) {
      let eleNode = productList.nth(i);
      let prodName = await eleNode.locator(".inventory_item_name ").innerText();
      let prodPrice = await eleNode
        .locator(".inventory_item_price")
        .innerText();
      console.log(`prodName : ${prodName}, prodPrice : ${prodPrice}`);
    }
  });
});
