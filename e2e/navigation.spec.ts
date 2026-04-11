import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("loads the home page with the correct title", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/brian duggan/i);
    await expect(page.getByRole("heading", { level: 1, name: /brian duggan/i })).toBeVisible();
  });

  test("navigates from home to resume via navbar", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("link", { name: /^resume$/i }).click();

    await expect(page).toHaveURL(/\/resume/);
    await expect(page.getByRole("heading", { level: 1, name: /^resume$/i })).toBeVisible();
  });

  test("navigates from resume back to home via navbar", async ({ page }) => {
    await page.goto("/resume");

    await page.getByRole("link", { name: /^home$/i }).click();

    await expect(page).toHaveURL("/");
    await expect(page.getByRole("heading", { level: 1, name: /brian duggan/i })).toBeVisible();
  });

  test("navigates home when clicking the site title in navbar", async ({ page }) => {
    await page.goto("/resume");

    await page.locator("nav").getByRole("link", { name: /brian duggan/i }).click();

    await expect(page).toHaveURL("/");
  });
});
