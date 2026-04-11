import { test, expect } from "@playwright/test";

test.describe("Resume Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/resume");
  });

  test("displays the page title and download button", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1, name: /^resume$/i })).toBeVisible();

    const downloadLink = page.getByRole("link", { name: /download pdf/i });
    await expect(downloadLink).toBeVisible();
    await expect(downloadLink).toHaveAttribute("href", "/Brian_Duggan_Resume.pdf");
  });

  test("renders the resume document with contact info", async ({ page }) => {
    await expect(page.getByText("BrianDuggan@pm.me")).toBeVisible();
    await expect(page.getByText("(412) 757-1715")).toBeVisible();
  });

  test("renders the Technical Skills section in the resume", async ({ page }) => {
    await expect(page.getByText("Frontend & Testing:")).toBeVisible();
    await expect(page.getByText("Backend, Infrastructure & Tools:")).toBeVisible();
  });

  test("renders all work experience entries", async ({ page }) => {
    await expect(page.getByText("Rockfish Data")).toBeVisible();
    await expect(page.getByText("Syndio Solutions, Inc.")).toBeVisible();
    await expect(page.getByText("Oratir, Inc.")).toBeVisible();
    await expect(page.getByText("Idelic, Inc.")).toBeVisible();
    await expect(page.getByText("Freelance Web Developer")).toBeVisible();
  });

  test("download button triggers a file download", async ({ page }) => {
    const downloadPromise = page.waitForEvent("download");

    await page.getByRole("link", { name: /download pdf/i }).click();

    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe("Brian_Duggan_Resume.pdf");
  });
});
