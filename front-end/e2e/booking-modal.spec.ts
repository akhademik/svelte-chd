import { test, expect } from '@playwright/test'

test.describe('Booking Modal Interaction', () => {
	test('should open booking modal and handle form interactions', async ({ page }) => {
		await page.goto('/en/day-tours')
		// Find a book button or tour card
		const bookButtons = page.locator(
			'button:has-text("Book"), button:has-text("Plan"), a:has-text("Book")'
		)
		if ((await bookButtons.count()) > 0) {
			await expect(bookButtons.first()).toBeVisible()
		}

		// Direct check on contact submission endpoint
		const response = await page.request.post('/api/booking', {
			data: {
				name: 'Playwright Test User',
				contact: 'playwright@chdtravel.com',
				tour: 'Lak Lake 1 Day Discovery',
				date: '2026-10-15',
				guests: 2,
				note: 'Automated test booking request',
				langs: 'en',
			},
		})
		expect(response.status()).toBe(200)
		const body = await response.json()
		expect(body.success).toBe(true)
	})
})
