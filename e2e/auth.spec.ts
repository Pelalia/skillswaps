import { test, expect } from '@playwright/test';

test.describe('Authentication Tests', () => {
    test('should redirect to Login page when not authenticated', async ({ page }) => {
        await page.goto('/dashboard');
        await expect(page).toHaveURL(/login/);
    })

    test('should show login page', async ({ page }) => {
        await page.goto('/login');
        await expect(page.getByPlaceholder(/username/i)).toBeVisible();
        await expect(page.getByPlaceholder(/password/i)).toBeVisible();
    })

    test('should show error with invalid credentials', async ({ page }) => { 
        await page.goto('/login')
        await page.getByPlaceholder(/username/i).fill('invalidUser');
        await page.getByPlaceholder(/password/i).fill('invalidPass');
        await page.getByRole('button', { name: /login/i }).click();
        await expect(page.getByText(/invalid credentials/i)).toBeVisible();
    })
})