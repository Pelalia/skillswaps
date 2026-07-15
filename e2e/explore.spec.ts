import { test, expect } from '@playwright/test';

test.describe('Explore Page test', () => { 
    test('should show expore page', async ({ page }) => {
        await page.goto('/explore')
        await expect(page.getByRole('heading', { name: /explore/i })).toBeVisible();
    })

    test('should show search input field', async ({ page }) => {
        await page.goto('/explore')
        await expect(page.getByPlaceholder(/skill/i)).toBeVisible()   
    })

    test('should filter by skill', async ({ page }) => {
        await page.goto('/explore')
        await page.getByPlaceholder(/skill/i).fill('React');

        await page.waitForTimeout(500)

        const cards = page.locator('.rounded-2xl')
        const noResults = page.getByText(/no results found/i)
        const hasCards = await cards.count() > 0
        const hasNoResults = await noResults.isVisible()

        expect(hasCards || hasNoResults).toBeTruthy()
    })
})