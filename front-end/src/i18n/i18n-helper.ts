import { base } from '$app/paths'
import { get_category_slug, resolve_canonical_category } from '$lib/utils/format-data'
import type { RequestEvent } from '@sveltejs/kit'
import { initAcceptLanguageHeaderDetector } from 'typesafe-i18n/detectors'

import type { Locales } from './i18n-types'
import { detectLocale, isLocale } from './i18n-util'

const REGEX_START_WITH_BASE = new RegExp(`^${base}`)

export const get_path_name_without_base = (url: URL) =>
	url.pathname.replace(REGEX_START_WITH_BASE, '')

export const replace_locale_in_url = (url: URL, locale: string): string => {
	const pathnameWithoutBase = get_path_name_without_base(url)
	const segments = pathnameWithoutBase.split('/').filter(Boolean)

	const targetLocale = locale === 'vn' ? 'vi' : locale

	// Remove current locale prefix if present
	if (segments.length > 0 && (isLocale(segments[0]) || segments[0] === 'vn')) {
		segments.shift()
	}

	// If the first path segment is a localized or canonical tour category, translate it to target locale
	if (segments.length > 0) {
		const canonicalCategory = resolve_canonical_category(segments[0])
		if (canonicalCategory) {
			segments[0] = get_category_slug(canonicalCategory, targetLocale)
		}
	}

	const new_pathname =
		segments.length > 0 ? `/${targetLocale}/${segments.join('/')}` : `/${targetLocale}`

	const new_url = new URL(url.toString())
	new_url.pathname = base + new_pathname
	return new_url.toString()
}

export const get_preferred_locale = ({ request }: RequestEvent) => {
	// detect the preferred language the user has configured in his browser
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language
	const acceptLanguageDetector = initAcceptLanguageHeaderDetector(request)

	return detectLocale(acceptLanguageDetector)
}

export const persist_to_cookie = (locale: Locales) => {
	const days = 30 // days to save the cookie
	const date = new Date()
	date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
	const expire_day = `expires=${date.toUTCString()}`

	document.cookie = `lang=${locale}; ${expire_day}; path=/; Secure; SameSite=Lax`

	try {
		if (typeof window !== 'undefined' && window.localStorage) {
			localStorage.setItem('preferred_locale', locale)
		}
	} catch (e) {
		console.warn('Could not save locale to localStorage', e)
	}
}

export const get_lang_cookie = (event: RequestEvent): Locales | undefined => {
	const lang_cookie = event.cookies.get('lang') ?? ''
	if (lang_cookie === 'vn') return 'vi'
	return isLocale(lang_cookie) ? lang_cookie : undefined
}

export const extract_url = (event: RequestEvent) => {
	const path_parts = get_path_name_without_base(event.url).split('/')
	const url_lang = path_parts[1]
	const url_path = path_parts.slice(2)
	return { url_lang, url_path }
}
