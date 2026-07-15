import { test, expect } from "@playwright/test";

test.describe("Profile Page", () => {
  test("should redirect to login when not authenticated", async ({ page }) => {
    await page.goto("/profile/pelalia");
    await expect(page).toHaveURL(/login/);
  });

  test("should show profile page when authenticated", async ({ page }) => {
    // Login d'abord
    await page.goto("/login");
    await page.getByPlaceholder(/username/i).fill("pelalia");
    await page.getByPlaceholder(/password/i).fill("TonMotDePasse");
    await page.getByRole("button", { name: /Get started/i }).click();

    // Attend la redirection
    await page.waitForLoadState("networkidle");

    // Va sur le profil
    await page.goto("/profile/pelalia");
    await expect(page.getByRole("heading")).toBeVisible();
  });

  test("should show teaches and learns sections", async ({ page }) => {
    await page.goto("/profile/pelalia");
    await expect(page.getByText(/teaches/i)).toBeVisible();
    await expect(page.getByText(/wants to learn/i)).toBeVisible();
  });
    test.beforeEach(async ({ page }) => {
      await page.goto("/login");
      await page.getByPlaceholder(/username/i).fill("pelalia");
      await page.getByPlaceholder(/password/i).fill("TonMotDePasse");
      await page.getByRole("button", { name: /Get started/i }).click();
      await page.waitForLoadState("networkidle");
    });
});
