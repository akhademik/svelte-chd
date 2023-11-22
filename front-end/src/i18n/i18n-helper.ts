import type { RequestEvent } from '@sveltejs/kit'
import { base } from '$app/paths'
import { initAcceptLanguageHeaderDetector } from 'typesafe-i18n/detectors'

import { detectLocale } from './i18n-util'

const REGEX_START_WITH_BASE = new RegExp(`^${base}`)

export const get_path_name_without_base = (url: URL) =>
	url.pathname.replace(REGEX_START_WITH_BASE, '')

export const replace_locale_in_url = (url: URL, locale: string): string => {
	const [, , ...rest] = get_path_name_without_base(url).split('/')
	const new_pathname = `/${[locale, ...rest].join('/')}`

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
