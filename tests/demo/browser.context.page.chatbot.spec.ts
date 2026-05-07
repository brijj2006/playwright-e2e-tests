import { test, expect, chromium } from "@playwright/test";

test.describe("multi context chatbot test suite", () => {
  test(
    "multi context chatbot test : customer and agent live chat",
    { tag: "@chatbot" },
    async () => {
      const browser = await chromium.launch();

      // Customer Session
      const customerContext = await browser.newContext();

      // Agent Session
      const agentContext = await browser.newContext();

      const customerPage = await customerContext.newPage();

      const agentPage = await agentContext.newPage();

      // Customer sends message from customer portal
      await customerPage.goto("https://customer-app.com");
      await customerPage.locator("#chat-input").fill("Need Help!");
      await customerPage.keyboard.press("Enter");

      // Agents receive message on agent portal
      await customerPage.goto("https://agent-portal.com");

      // Agent sees incoming ticket
      await expect(agentPage.locator(".incoming-chat")).toContainText(
        "Need help!",
      );
      await agentPage.locator("#reply-input").fill("How can I assist?");
      await agentPage.keyboard.press("Enter");

      // Customer receive message on customer app
      await expect(customerPage.locator(".agent-message")).toContainText(
        "How can I assist?",
      );
    },
  );
});
