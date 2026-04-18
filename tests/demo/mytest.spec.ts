import { test, expect } from "@playwright/test";

test.describe("Login feature", () => {
  test.beforeEach("Go to the login page", async ({ page }) => {
    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    await expect(page).toHaveTitle("CURA Healthcare Service");
  });

  test("smoke test", { tag: "@smoke" }, async ({ page }) => {
    await expect(page.locator("//h3")).toHaveText("We Care About Your Health");
  });

  test("regression test", { tag: "@regression" }, async ({ page }) => {
    await page.locator("#btn-make-appointment").click();
    await expect(page.locator(".lead")).toHaveText(
      "Please login to make appointment.",
    );
  });

  test("make apppointment", { tag: "@regression" }, async ({ page }) => {
    await page.getByRole("link", { name: "Make Appointment" }).click();
    await expect(page.getByText("Please login to make")).toBeVisible();
    await page.getByLabel("Username").click();
    await page.getByLabel("Username").fill("John Doe");
    await page.getByLabel("Password").click();
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.locator("h2")).toContainText("Make Appointment");
  });

  test.only("locator strategy", async ({ page }) => {
    // ✅ `page.getBy*()` and `page.locator()` methods returns the `locator` object
    // ✅ The above methods not to be `awaited`
    // ✅ The type of locator is an `object`
    // ✅ Locators are LAZY until an action is fired on them
    let makeApptLink = page.getByRole("link", { name: "Make Appointment" });
    console.log(`The value of locator is : ", ${JSON.stringify(makeApptLink)}`);

    await makeApptLink.click();

    await expect(
      page.getByText("Please login to make appointment."),
    ).toBeVisible();
  });
});
