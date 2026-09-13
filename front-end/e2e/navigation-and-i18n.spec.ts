import { test, expect } from '@playwright/test'

test.describe('Navigation & Multilingual Switching', () => {
	test('should navigate between languages correctly and load home page', async ({ page }) => {
		await page.goto('/en')
		await expect(page).toHaveTitle(/CHD Travel/i)
		await expect(page.getByText(/go local/i)).toBeVisible()

		// Switch to Vietnamese
		await page.goto('/vi')
		await expect(page.getByText(/Chạm vào tâm hồn/i)).toBeVisible()

		// Switch to French
		await page.goto('/fr')
		await expect(page.getByText(/Ressentez l'âme pure/i)).toBeVisible()
	})

	test('should switch locale and update category slug from /vi/tour-trong-ngay to /fr/excursions', async ({
		page,
	}) => {
		await page.goto('/vi/tour-trong-ngay')
		await expect(page).toHaveURL(/\/vi\/tour-trong-ngay/)

		// Click French locale switcher link
		const frLink = page.locator('header a[href*="/fr/excursions"]').first()
		await expect(frLink).toBeVisible()
		await frLink.click()

		await expect(page).toHaveURL(/\/fr\/excursions/)
	})

	test('should load contact page with prefilled parameters', async ({ page }) => {
		await page.goto('/en/contact?tour=lak-lake-discovery&duration=1%20Day')
		const messageField = page.locator('textarea[name="msg"]')
		await expect(messageField).toBeVisible()
		const value = await messageField.inputValue()
		expect(value).toContain('lak-lake-discovery')
	})
})
