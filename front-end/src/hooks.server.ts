import { redirect, type Handle } from '@sveltejs/kit'
import { base } from '$app/paths'

import { get_path_name_without_base, get_preferred_locale } from './i18n/i18n-helper.js'
import type { Locales } from './i18n/i18n-types.js'
import { baseLocale, i18n, isLocale } from './i18n/i18n-util.js'
import { loadAllLocales } from './i18n/i18n-util.sync.js'

loadAllLocales()
const L = i18n()

export const handle: Handle = async ({ event, resolve }) => {
	// extract url to get the lang and the rest
	const path_parts = get_path_name_without_base(event.url).split('/')
	const lang = path_parts[1]
	const preserved_path = path_parts.slice(2)

	// get the user prefer locale
	const user_locale = get_preferred_locale(event) || baseLocale

	// redirect to base locale if no lang was found or lang is not a correct locale
	if (!lang || !isLocale(lang)) {
		const new_path = [base, user_locale, ...preserved_path].join('/')
		throw redirect(307, new_path)
	}

	// if slug is not a locale, use base locale (e.g. api endpoints)
	const locale = isLocale(lang) ? (lang as Locales) : user_locale
	const LL = L[locale]

	// bind locale and translation functions to current request
	event.locals.locale = locale
	event.locals.LL = LL

	// replace html lang attribute with correct language
	return resolve(event, { transformPageChunk: ({ html }) => html.replace('%lang%', locale) })
}
