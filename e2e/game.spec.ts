import { test, expect } from "@playwright/test";

test.describe("Game page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/game");
  });

  test("renders the game canvas", async ({ page }) => {
    await expect(page.getByLabel("Gravity Runner game")).toBeVisible();
    await expect(page.locator("canvas")).toBeVisible();
  });

  test("navigates to game page via navbar", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("link", { name: /^game$/i }).click();

    await expect(page).toHaveURL(/\/game/);
    await expect(page.locator("canvas")).toBeVisible();
  });

  test("navigates back to home from game page", async ({ page }) => {
    await page.getByRole("link", { name: /^home$/i }).click();

    await expect(page).toHaveURL("/");
    await expect(page.getByRole("heading", { level: 1, name: /brian duggan/i })).toBeVisible();
  });
});
