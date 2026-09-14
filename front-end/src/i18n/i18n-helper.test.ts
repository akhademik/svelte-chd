import { describe, it, expect } from 'vitest'
import { getPathNameWithoutBase, replaceLocaleInUrl } from './i18n-helper'

describe('i18n-helper URL locale & slug replacements', () => {
	it('should accurately switch locale and translate tour category slug from VI to FR', () => {
		const viUrl = new URL('http://localhost:5173/vi/tour-trong-ngay')
		const frUrl = replaceLocaleInUrl(viUrl, 'fr')
		expect(frUrl).toBe('http://localhost:5173/fr/excursions')
	})

	it('should accurately switch locale and translate tour category slug from VI to EN', () => {
		const viUrl = new URL('http://localhost:5173/vi/tour-trong-ngay')
		const enUrl = replaceLocaleInUrl(viUrl, 'en')
		expect(enUrl).toBe('http://localhost:5173/en/day-tours')
	})

	it('should translate highland tour category slug from VI to FR and EN', () => {
		const viUrl = new URL('http://localhost:5173/vi/tour-tay-nguyen')
		expect(replaceLocaleInUrl(viUrl, 'fr')).toBe('http://localhost:5173/fr/hauts-plateaux')
		expect(replaceLocaleInUrl(viUrl, 'en')).toBe('http://localhost:5173/en/highland-tours')
	})

	it('should translate category slug from FR back to VI and EN', () => {
		const frUrl = new URL('http://localhost:5173/fr/excursions')
		expect(replaceLocaleInUrl(frUrl, 'vi')).toBe('http://localhost:5173/vi/tour-trong-ngay')
		expect(replaceLocaleInUrl(frUrl, 'en')).toBe('http://localhost:5173/en/day-tours')

		const frHighland = new URL('http://localhost:5173/fr/hauts-plateaux')
		expect(replaceLocaleInUrl(frHighland, 'vi')).toBe('http://localhost:5173/vi/tour-tay-nguyen')
		expect(replaceLocaleInUrl(frHighland, 'en')).toBe('http://localhost:5173/en/highland-tours')
	})

	it('should preserve detail tour slug when switching category in sub-routes', () => {
		const viDetail = new URL('http://localhost:5173/vi/tour-trong-ngay/dak-lak-discovery')
		expect(replaceLocaleInUrl(viDetail, 'fr')).toBe(
			'http://localhost:5173/fr/excursions/dak-lak-discovery'
		)
		expect(replaceLocaleInUrl(viDetail, 'en')).toBe(
			'http://localhost:5173/en/day-tours/dak-lak-discovery'
		)

		const frDetail = new URL('http://localhost:5173/fr/hauts-plateaux/yok-don-trekking')
		expect(replaceLocaleInUrl(frDetail, 'vi')).toBe(
			'http://localhost:5173/vi/tour-tay-nguyen/yok-don-trekking'
		)
	})

	it('should replace locale on standard static pages without affecting the slug', () => {
		const aboutUrl = new URL('http://localhost:5173/vi/about')
		expect(replaceLocaleInUrl(aboutUrl, 'fr')).toBe('http://localhost:5173/fr/about')
		expect(replaceLocaleInUrl(aboutUrl, 'en')).toBe('http://localhost:5173/en/about')

		const faqUrl = new URL('http://localhost:5173/en/faq')
		expect(replaceLocaleInUrl(faqUrl, 'vi')).toBe('http://localhost:5173/vi/faq')

		const termsUrl = new URL('http://localhost:5173/fr/terms')
		expect(replaceLocaleInUrl(termsUrl, 'vi')).toBe('http://localhost:5173/vi/terms')

		const privacyUrl = new URL('http://localhost:5173/vi/privacy')
		expect(replaceLocaleInUrl(privacyUrl, 'en')).toBe('http://localhost:5173/en/privacy')
	})

	it('should handle root language paths and query parameters', () => {
		const rootVi = new URL('http://localhost:5173/vi')
		expect(replaceLocaleInUrl(rootVi, 'fr')).toBe('http://localhost:5173/fr')

		const queryUrl = new URL('http://localhost:5173/vi/contact?tour=lak-lake')
		expect(replaceLocaleInUrl(queryUrl, 'en')).toBe(
			'http://localhost:5173/en/contact?tour=lak-lake'
		)
	})

	it('should extract path name without base', () => {
		const testUrl = new URL('http://localhost:5173/vi/blog')
		expect(getPathNameWithoutBase(testUrl)).toBe('/vi/blog')
	})
})

