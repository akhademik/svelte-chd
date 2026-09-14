import { base } from '$app/paths'
import { type Handle, redirect } from '@sveltejs/kit'

import { extractUrl, getLangCookie, getPreferredLocale } from './i18n/i18n-helper.js'
import { isLocale } from './i18n/i18n-util.js'

export const handle: Handle = async ({ event, resolve }) => {
	// extract url to get the lang and the rest
	const { url_lang, url_path } = extractUrl(event)

	// get lang previously saved in cookie
	const cookie = getLangCookie(event)

	// if no lang in cookie then use lang preferred in setting
	const user_locale = cookie || getPreferredLocale(event)
	if (url_lang === 'api') {
		const response = await resolve(event)
		response.headers.set('X-Content-Type-Options', 'nosniff')
		response.headers.set('X-Frame-Options', 'DENY')
		return response
	}
	// redirect to user_locale if no lang was found or lang is not a correct locale
	if (!url_lang || !isLocale(url_lang)) {
		const new_path = [base, user_locale, ...url_path].join('/')
		throw redirect(307, new_path)
	}

	// url_lang is now guaranteed to be a valid Locale
	event.locals.locale = url_lang

	// replace html lang attribute with correct language and set security headers
	const response = await resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', url_lang),
	})

	response.headers.set('X-Frame-Options', 'SAMEORIGIN')
	response.headers.set('X-Content-Type-Options', 'nosniff')
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
	response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
	response.headers.set('Cross-Origin-Opener-Policy', 'same-origin')

	return response
}
