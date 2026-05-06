import { test, expect } from '@playwright/test';

test.describe('Test Suite', () => {
    test('Test Case 1', { tag: '@smoke' }, async ({ page, context }) => {
        await page.goto("https://testautomationpractice.blogspot.com/");
        await expect(page).toHaveTitle("Automation Testing Practice");

        // **************** LOCATORS **************** //

        await page.locator("#name").fill("John Doe");
        await page.getByPlaceholder("Enter EMail").fill("john.doe@example.com");

        await page.locator("#phone").fill("1234567890", { timeout: 5000 });

        // **************** SELECT DROP DOWN OPTIONS - SINGLE, MULTIPLE **************** //

        // single selection matching the value
        await page.locator('#country').selectOption("germany");

        // single selection matching the value
        await page.locator("#country").selectOption({ value: "usa" });

        // single selection matching the label
        await page.locator("#country").selectOption({ label: "India" });

        // single selection matching the index
        await page.locator("#country").selectOption({ index: 3 });

        // multiple selection matching the value    
        await page.locator("#colors").selectOption(["red", "blue", "green"]);

        // multiple selection matching the label
        await page.locator("#colors").selectOption([{ label: "Green" }, { label: "Yellow" }]);

        // multiple selection matching the index
        await page.locator("#colors").selectOption([{ index: 4 }, { index: 5 }, { index: 6 }]);


        // **************** UPLOAD FILES - SINGLE, MULTIPLE, REMOVE UPLOADED **************** //

        //upload single file
        await page.setInputFiles("#singleFileInput", "/Users/a880830/Documents/test123/file1.png");
        await page.getByRole("button", { name: "Upload Single File" }).click();
        await expect(page.locator("#singleFileStatus")).toContainText("Single file selected: file1.png");

        //upload multiple files
        await page.setInputFiles('#multipleFilesInput', [
            "/Users/a880830/Documents/test123/file1.png",
            "/Users/a880830/Documents/test123/file2.png"
        ]);
        await page.getByRole("button", { name: "Upload Multiple Files" }).click();
        await expect(page.locator("#multipleFilesStatus")).toContainText("Multiple files selected");

        //remove uploaded file
        await page.setInputFiles("#singleFileInput", []);
        await page.getByRole("button", { name: "Upload Single File" }).click();
        await expect(page.locator("#singleFileStatus")).toContainText("No file selected");


        // **************** 6. Handle Alerts, pop-ups - Simple, Confirmation, Prompt **************** //

        // const [dialog] = await Promise.all([
        //     page.waitForEvent("dialog"),
        //     page.locator("#alertBtn").click()
        // ]);
        // await dialog.accept();

        // const [confirmDialog] = await Promise.all([
        //     page.waitForEvent("dialog", { timeout: 1000 }),
        //     page.locator("#confirmBtn").click()
        // ]);

        // await confirmDialog.dismiss();


        // The error occurs because the same dialog is being dismissed more than once—use either waitForEvent 
        // OR a single-use listener (page.once), not both.
        page.once("dialog", async (dialog) => {
            await dialog.accept();
        });
        await page.locator("#alertBtn").click();

        page.once("dialog", async (dialog) => {
            await dialog.dismiss();
        });
        await page.locator("#confirmBtn").click();

        page.once("dialog", async (promptDialog) => {
            await promptDialog.accept("Playwright");
        });
        await page.locator("#promptBtn").click();


        // **************** HANDLE NEW TABS/POP-UPS - SWITCHING BETWEEN THEM **************** //
        const [newTab] = await Promise.all([
            page.waitForEvent("popup"),
            page.getByRole("button", { name: "New Tab" }).click()
        ]);
        await expect(newTab).toHaveTitle("SDET-QA Blog");

        // Switch back to the original tab
        await page.bringToFront();
        await expect(page).toHaveTitle("Automation Testing Practice");

        await newTab.bringToFront();
        await expect(newTab).toHaveTitle("SDET-QA Blog");

        await page.bringToFront();
        await expect(page).toHaveTitle("Automation Testing Practice");


        // **************** HANDLE NEW WINDOWS/TABS - SWITCHING BETWEEN THEM **************** //
        const [newWindow] = await Promise.all([
            context.waitForEvent("page"),
            page.getByRole("button", { name: "Popup Windows" }).click()
        ]);
        await newWindow.waitForLoadState();
        await newWindow.bringToFront();
        await expect(newWindow).toHaveTitle("Fast and reliable end-to-end testing for modern web apps | Playwright");
        






    });
});