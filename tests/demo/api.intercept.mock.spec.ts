import { test, expect } from "@playwright/test";
import tags from "../../mocks/tags.json" with { type: "json" };

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
