import { describe, it, expect } from 'vitest'
import { get_menu_url, is_menu_active, menu_items } from './nav-bar-logic'

describe('nav-bar-logic: is_menu_active', () => {
	const dayToursItem = menu_items.find(i => i.text === 'day_tours')!
	const highlandToursItem = menu_items.find(i => i.text === 'highland_tours')!
	const blogItem = menu_items.find(i => i.text === 'blog')!
	const aboutItem = menu_items.find(i => i.text === 'about')!
	const contactItem = menu_items.find(i => i.text === 'contact')!

	it('should generate correct localized menu urls', () => {
		expect(get_menu_url(dayToursItem, 'vi')).toBe('/vi/tour-trong-ngay')
		expect(get_menu_url(dayToursItem, 'en')).toBe('/en/day-tours')
		expect(get_menu_url(dayToursItem, 'fr')).toBe('/fr/excursions')

		expect(get_menu_url(highlandToursItem, 'vi')).toBe('/vi/tour-tay-nguyen')
		expect(get_menu_url(highlandToursItem, 'en')).toBe('/en/highland-tours')
		expect(get_menu_url(highlandToursItem, 'fr')).toBe('/fr/hauts-plateaux')

		expect(get_menu_url(blogItem, 'vi')).toBe('/vi/blog')
		expect(get_menu_url(aboutItem, 'vi')).toBe('/vi/about')
		expect(get_menu_url(contactItem, 'vi')).toBe('/vi/contact')
	})

	it('should highlight menu on exact route matches', () => {
		expect(is_menu_active(blogItem, '/vi/blog', 'vi')).toBe(true)
		expect(is_menu_active(dayToursItem, '/vi/tour-trong-ngay', 'vi')).toBe(true)
		expect(is_menu_active(highlandToursItem, '/en/highland-tours', 'en')).toBe(true)
		expect(is_menu_active(aboutItem, '/fr/about', 'fr')).toBe(true)
	})

	it('should highlight parent blog item when on blog detail page', () => {
		expect(is_menu_active(blogItem, '/vi/blog/kham-pha-ca-phe-tay-nguyen', 'vi')).toBe(true)
		expect(is_menu_active(blogItem, '/en/blog/sunrise-coffee-walk', 'en')).toBe(true)
		expect(is_menu_active(blogItem, '/fr/blog/visite-du-village', 'fr')).toBe(true)

		// Other menu items should not be highlighted
		expect(is_menu_active(dayToursItem, '/vi/blog/kham-pha-ca-phe-tay-nguyen', 'vi')).toBe(false)
		expect(is_menu_active(aboutItem, '/vi/blog/kham-pha-ca-phe-tay-nguyen', 'vi')).toBe(false)
	})

	it('should highlight parent day tour item when on day tour detail page', () => {
		expect(is_menu_active(dayToursItem, '/vi/tour-trong-ngay/city-tour-buon-ma-thuot', 'vi')).toBe(
			true
		)
		expect(is_menu_active(dayToursItem, '/en/day-tours/bmt-city-tour', 'en')).toBe(true)
		expect(is_menu_active(dayToursItem, '/fr/excursions/tour-de-la-ville', 'fr')).toBe(true)

		// Other menu items should not be active
		expect(
			is_menu_active(highlandToursItem, '/vi/tour-trong-ngay/city-tour-buon-ma-thuot', 'vi')
		).toBe(false)
		expect(is_menu_active(blogItem, '/vi/tour-trong-ngay/city-tour-buon-ma-thuot', 'vi')).toBe(
			false
		)
	})

	it('should highlight parent highland tour item when on highland tour detail page', () => {
		expect(
			is_menu_active(highlandToursItem, '/vi/tour-tay-nguyen/hanh-trinh-3-ngay-2-dem', 'vi')
		).toBe(true)
		expect(
			is_menu_active(highlandToursItem, '/en/highland-tours/3-day-heritage-journey', 'en')
		).toBe(true)
		expect(
			is_menu_active(highlandToursItem, '/fr/hauts-plateaux/voyage-immersion-3-jours', 'fr')
		).toBe(true)

		expect(is_menu_active(dayToursItem, '/vi/tour-tay-nguyen/hanh-trinh-3-ngay-2-dem', 'vi')).toBe(
			false
		)
	})

	it('should not highlight any item on homepage', () => {
		expect(is_menu_active(dayToursItem, '/vi', 'vi')).toBe(false)
		expect(is_menu_active(blogItem, '/en', 'en')).toBe(false)
		expect(is_menu_active(aboutItem, '/fr', 'fr')).toBe(false)
	})
})
