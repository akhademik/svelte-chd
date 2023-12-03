import { redirect, type Handle } from '@sveltejs/kit'
import { base } from '$app/paths'

import { extract_url, get_lang_cookie, get_preferred_locale } from './i18n/i18n-helper.js'
import { isLocale } from './i18n/i18n-util.js'

export const handle: Handle = async ({ event, resolve }) => {
	// extract url to get the lang and the rest
	const { url_lang, url_path } = extract_url(event)

	// get lang previously saved in cookie
	const cookie = get_lang_cookie(event)

	// if no lang in cookie then use lang preferred in setting
	const user_locale = cookie || get_preferred_locale(event)
	if (url_lang === 'api') {
		return resolve(event)
	}
	// redirect to user_locale if no lang was found or lang is not a correct locale
	if (!url_lang || !isLocale(url_lang)) {
		const new_path = [base, user_locale, ...url_path].join('/')
		throw redirect(307, new_path)
	}

	// if slug is not a locale, use user_locale
	const locale = isLocale(url_lang) ? url_lang : user_locale

	// bind locale to current request
	event.locals.locale = locale

	// replace html lang attribute with correct language
	return resolve(event, { transformPageChunk: ({ html }) => html.replace('%lang%', locale) })
}
