import { test, expect } from '@playwright/test'

test.describe('SEO & Editorial Journal', () => {
	test('should have canonical and alternate hreflang tags', async ({ page }) => {
		await page.goto('/en')
		const canonical = page.locator('link[rel="canonical"]')
		await expect(canonical).toHaveAttribute('href', /chd\.travel\/en/)

		const hreflangVi = page.locator('link[hreflang="vi"]')
		await expect(hreflangVi).toHaveAttribute('href', /chd\.travel\/vn/)
	})

	test('should render Journal page with categories and articles', async ({ page }) => {
		await page.goto('/en/blog')
		await expect(page.locator('h1')).toBeVisible()
		// Journal category pill buttons exist
		const journalHeading = page.locator('text=CHD Journal')
		await expect(journalHeading).toBeVisible()
	})
})
