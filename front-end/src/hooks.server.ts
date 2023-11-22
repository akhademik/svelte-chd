import { redirect, type Handle } from '@sveltejs/kit'
import { base } from '$app/paths'

import { get_path_name_without_base, get_preferred_locale } from './i18n/i18n-helper.js'
import type { Locales } from './i18n/i18n-types.js'
import { isLocale } from './i18n/i18n-util.js'

export const handle: Handle = async ({ event, resolve }) => {
	// extract url to get the lang and the rest
	const path_parts = get_path_name_without_base(event.url).split('/')
	const lang = path_parts[1]
	const preserved_path = path_parts.slice(2)

	// get lang previously saved in cookie
	const lang_cookie = event.request.headers.get('cookie')?.split('=')[1] as Locales

	// if no lang in cookie then use lang preferred in setting
	const user_locale = lang_cookie || get_preferred_locale(event)

	// redirect to user_locale if no lang was found or lang is not a correct locale
	if (!lang || !isLocale(lang)) {
		const new_path = [base, user_locale, ...preserved_path].join('/')
		throw redirect(307, new_path)
	}

	// if slug is not a locale, use user_locale
	const locale = isLocale(lang) ? (lang as Locales) : user_locale

	// bind locale and translation functions to current request
	event.locals.locale = locale

	// replace html lang attribute with correct language
	return resolve(event, { transformPageChunk: ({ html }) => html.replace('%lang%', locale) })
}
