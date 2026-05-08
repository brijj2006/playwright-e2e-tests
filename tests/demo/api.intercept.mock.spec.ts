import { test, expect } from "@playwright/test";
import tags from "../../mocks/tags.json" with { type: "json" };
import articles from "../../mocks/articles.json" with { type: "json" };

test("API Intercept Mock Test", { tag: "@mock" }, async ({ page }) => {
  // intercept API request
  page.route(
    "https://conduit-api.bondaracademy.com/api/tags",
    async (route) => {
      await route.fulfill({
        body: JSON.stringify(tags),
      });
    },
  );

  await page.goto("https://conduit.bondaracademy.com/");
  await expect(page.locator(".tag-list")).toContainText("Hello World");
});

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
