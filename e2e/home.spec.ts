import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("displays the hero section with name and role", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1, name: /brian duggan/i })).toBeVisible();
    await expect(page.getByText("Software Engineer", { exact: true })).toBeVisible();
    await expect(page.getByText("Pittsburgh, PA").first()).toBeVisible();
  });

  test("displays the email as a mailto link", async ({ page }) => {
    const emailLink = page.getByRole("link", { name: /brianduggan@pm\.me/i });
    await expect(emailLink).toBeVisible();
    await expect(emailLink).toHaveAttribute("href", "mailto:BrianDuggan@pm.me");
  });

  test("displays the Technical Skills section with skill cards", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 2, name: /technical skills/i })).toBeVisible();
    await expect(page.getByText("React", { exact: true })).toBeVisible();
    await expect(page.getByText("TypeScript", { exact: true })).toBeVisible();
  });

  test("displays the Experience section with job entries", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 2, name: /experience/i })).toBeVisible();
    await expect(page.getByText("Rockfish Data")).toBeVisible();
    await expect(page.getByText("Syndio Solutions")).toBeVisible();
  });
});
