import { describe, it, expect } from 'vitest'
import { getMenuUrl, isMenuActive, menuItems } from './nav-bar-logic'

describe('nav-bar-logic: isMenuActive', () => {
	const dayToursItem = menuItems.find(i => i.text === 'day_tours')!
	const highlandToursItem = menuItems.find(i => i.text === 'highland_tours')!
	const blogItem = menuItems.find(i => i.text === 'blog')!
	const aboutItem = menuItems.find(i => i.text === 'about')!
	const contactItem = menuItems.find(i => i.text === 'contact')!

	it('should generate correct localized menu urls', () => {
		expect(getMenuUrl(dayToursItem, 'vi')).toBe('/vi/tour-trong-ngay')
		expect(getMenuUrl(dayToursItem, 'en')).toBe('/en/day-tours')
		expect(getMenuUrl(dayToursItem, 'fr')).toBe('/fr/excursions')

		expect(getMenuUrl(highlandToursItem, 'vi')).toBe('/vi/tour-tay-nguyen')
		expect(getMenuUrl(highlandToursItem, 'en')).toBe('/en/highland-tours')
		expect(getMenuUrl(highlandToursItem, 'fr')).toBe('/fr/hauts-plateaux')

		expect(getMenuUrl(blogItem, 'vi')).toBe('/vi/blog')
		expect(getMenuUrl(aboutItem, 'vi')).toBe('/vi/about')
		expect(getMenuUrl(contactItem, 'vi')).toBe('/vi/contact')
	})

	it('should highlight menu on exact route matches', () => {
		expect(isMenuActive(blogItem, '/vi/blog', 'vi')).toBe(true)
		expect(isMenuActive(dayToursItem, '/vi/tour-trong-ngay', 'vi')).toBe(true)
		expect(isMenuActive(highlandToursItem, '/en/highland-tours', 'en')).toBe(true)
		expect(isMenuActive(aboutItem, '/fr/about', 'fr')).toBe(true)
	})

	it('should highlight parent blog item when on blog detail page', () => {
		expect(isMenuActive(blogItem, '/vi/blog/kham-pha-ca-phe-tay-nguyen', 'vi')).toBe(true)
		expect(isMenuActive(blogItem, '/en/blog/sunrise-coffee-walk', 'en')).toBe(true)
		expect(isMenuActive(blogItem, '/fr/blog/visite-du-village', 'fr')).toBe(true)

		// Other menu items should not be highlighted
		expect(isMenuActive(dayToursItem, '/vi/blog/kham-pha-ca-phe-tay-nguyen', 'vi')).toBe(false)
		expect(isMenuActive(aboutItem, '/vi/blog/kham-pha-ca-phe-tay-nguyen', 'vi')).toBe(false)
	})

	it('should highlight parent day tour item when on day tour detail page', () => {
		expect(isMenuActive(dayToursItem, '/vi/tour-trong-ngay/city-tour-buon-ma-thuot', 'vi')).toBe(
			true
		)
		expect(isMenuActive(dayToursItem, '/en/day-tours/bmt-city-tour', 'en')).toBe(true)
		expect(isMenuActive(dayToursItem, '/fr/excursions/tour-de-la-ville', 'fr')).toBe(true)

		// Other menu items should not be active
		expect(
			isMenuActive(highlandToursItem, '/vi/tour-trong-ngay/city-tour-buon-ma-thuot', 'vi')
		).toBe(false)
		expect(isMenuActive(blogItem, '/vi/tour-trong-ngay/city-tour-buon-ma-thuot', 'vi')).toBe(false)
	})

	it('should highlight parent highland tour item when on highland tour detail page', () => {
		expect(
			isMenuActive(highlandToursItem, '/vi/tour-tay-nguyen/hanh-trinh-3-ngay-2-dem', 'vi')
		).toBe(true)
		expect(isMenuActive(highlandToursItem, '/en/highland-tours/3-day-heritage-journey', 'en')).toBe(
			true
		)
		expect(
			isMenuActive(highlandToursItem, '/fr/hauts-plateaux/voyage-immersion-3-jours', 'fr')
		).toBe(true)

		expect(isMenuActive(dayToursItem, '/vi/tour-tay-nguyen/hanh-trinh-3-ngay-2-dem', 'vi')).toBe(
			false
		)
	})

	it('should not highlight any item on homepage', () => {
		expect(isMenuActive(dayToursItem, '/vi', 'vi')).toBe(false)
		expect(isMenuActive(blogItem, '/en', 'en')).toBe(false)
		expect(isMenuActive(aboutItem, '/fr', 'fr')).toBe(false)
	})
})
