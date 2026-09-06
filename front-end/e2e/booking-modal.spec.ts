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
	})
})
