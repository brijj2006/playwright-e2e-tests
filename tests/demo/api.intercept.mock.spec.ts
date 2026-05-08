import { test, expect } from "@playwright/test";
import tags from "../../mocks/tags.json" with { type: "json" };
import articles from "../../mocks/articles.json" with { type: "json" };

/**
 * fulfill() : mocks responses
 * continue() : forwards/modifies requests
 * abort() : blocks requests
 * fetch() : lets you modify real backend responses before returning them to the browser
 */

/** 
 * Hybrid Mock Strategy
    Critical APIs → real backend
    3rd-party APIs → mocked
    Analytics → blocked
    Edge cases → modified
 */

test.describe("Playwright API Interception", () => {
  test(
    "route.fulfill() → Mock response",
    { tag: "@mock" },
    async ({ page }) => {
      // intercept API request
      await page.route(
        "https://conduit-api.bondaracademy.com/api/tags",
        async (route) => {
          await route.fulfill({
            body: JSON.stringify(tags),
          });
        },
      );

      await page.goto("https://conduit.bondaracademy.com/");
      await expect(page.locator(".tag-list")).toContainText("Hello World");
    },
  );

  test("API Mock Test", { tag: "@mock" }, async ({ page }) => {
    await page.route("**/*/api/articles?limit=10&offset=0", async (route) => {
      if (route.request().method().includes("GET")) {
        await route.fulfill({
          body: JSON.stringify(articles),
        });
      } else {
        await route.continue();
      }
    });

    await page.goto("https://conduit.bondaracademy.com/");
    await expect(page.locator(".preview-link")).toHaveCount(1);
    await expect(page.locator(".preview-link")).toContainText(
      "Mocking API test with Bridge",
    );
  });

  /**
   * Browser → real backend →
        Playwright modifies response →
        browser 
    */
  test("route.fetch() → Get real response then modify", async ({ page }) => {
    await page.route("**/api/pricing", async (route) => {
      const response = await route.fetch();
      const json = response.json();
      //   json.discount = 90;

      await route.fulfill({
        response,
        body: JSON.stringify(json),
      });
    });
  });

  test("route.abort() → Block request", { tag: "@abort" }, async ({ page }) => {
    await page.route("**/*/api/articles?limit=10&offset=0", async (route) => {
      await route.abort();
    });

    await page.goto("https://conduit.bondaracademy.com/");
    await expect(page.locator(".preview-link")).toHaveCount(10);
  });
});
