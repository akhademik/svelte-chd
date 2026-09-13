import { describe, it, expect } from 'vitest'
import { get_path_name_without_base, replace_locale_in_url } from './i18n-helper'

describe('i18n-helper URL locale & slug replacements', () => {
	it('should accurately switch locale and translate tour category slug from VI to FR', () => {
		const viUrl = new URL('http://localhost:5173/vi/tour-trong-ngay')
		const frUrl = replace_locale_in_url(viUrl, 'fr')
		expect(frUrl).toBe('http://localhost:5173/fr/excursions')
	})

	it('should accurately switch locale and translate tour category slug from VI to EN', () => {
		const viUrl = new URL('http://localhost:5173/vi/tour-trong-ngay')
		const enUrl = replace_locale_in_url(viUrl, 'en')
		expect(enUrl).toBe('http://localhost:5173/en/day-tours')
	})

	it('should translate highland tour category slug from VI to FR and EN', () => {
		const viUrl = new URL('http://localhost:5173/vi/tour-tay-nguyen')
		expect(replace_locale_in_url(viUrl, 'fr')).toBe('http://localhost:5173/fr/hauts-plateaux')
		expect(replace_locale_in_url(viUrl, 'en')).toBe('http://localhost:5173/en/highland-tours')
	})

	it('should translate category slug from FR back to VI and EN', () => {
		const frUrl = new URL('http://localhost:5173/fr/excursions')
		expect(replace_locale_in_url(frUrl, 'vi')).toBe('http://localhost:5173/vi/tour-trong-ngay')
		expect(replace_locale_in_url(frUrl, 'en')).toBe('http://localhost:5173/en/day-tours')

		const frHighland = new URL('http://localhost:5173/fr/hauts-plateaux')
		expect(replace_locale_in_url(frHighland, 'vi')).toBe('http://localhost:5173/vi/tour-tay-nguyen')
		expect(replace_locale_in_url(frHighland, 'en')).toBe('http://localhost:5173/en/highland-tours')
	})

	it('should preserve detail tour slug when switching category in sub-routes', () => {
		const viDetail = new URL('http://localhost:5173/vi/tour-trong-ngay/dak-lak-discovery')
		expect(replace_locale_in_url(viDetail, 'fr')).toBe(
			'http://localhost:5173/fr/excursions/dak-lak-discovery'
		)
		expect(replace_locale_in_url(viDetail, 'en')).toBe(
			'http://localhost:5173/en/day-tours/dak-lak-discovery'
		)

		const frDetail = new URL('http://localhost:5173/fr/hauts-plateaux/yok-don-trekking')
		expect(replace_locale_in_url(frDetail, 'vi')).toBe(
			'http://localhost:5173/vi/tour-tay-nguyen/yok-don-trekking'
		)
	})

	it('should replace locale on standard static pages without affecting the slug', () => {
		const aboutUrl = new URL('http://localhost:5173/vi/about')
		expect(replace_locale_in_url(aboutUrl, 'fr')).toBe('http://localhost:5173/fr/about')
		expect(replace_locale_in_url(aboutUrl, 'en')).toBe('http://localhost:5173/en/about')

		const faqUrl = new URL('http://localhost:5173/en/faq')
		expect(replace_locale_in_url(faqUrl, 'vi')).toBe('http://localhost:5173/vi/faq')

		const termsUrl = new URL('http://localhost:5173/fr/terms')
		expect(replace_locale_in_url(termsUrl, 'vi')).toBe('http://localhost:5173/vi/terms')

		const privacyUrl = new URL('http://localhost:5173/vi/privacy')
		expect(replace_locale_in_url(privacyUrl, 'en')).toBe('http://localhost:5173/en/privacy')
	})

	it('should handle root language paths and query parameters', () => {
		const rootVi = new URL('http://localhost:5173/vi')
		expect(replace_locale_in_url(rootVi, 'fr')).toBe('http://localhost:5173/fr')

		const queryUrl = new URL('http://localhost:5173/vi/contact?tour=lak-lake')
		expect(replace_locale_in_url(queryUrl, 'en')).toBe(
			'http://localhost:5173/en/contact?tour=lak-lake'
		)
	})

	it('should extract path name without base', () => {
		const testUrl = new URL('http://localhost:5173/vi/blog')
		expect(get_path_name_without_base(testUrl)).toBe('/vi/blog')
	})
})
