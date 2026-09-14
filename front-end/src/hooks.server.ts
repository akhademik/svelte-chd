import { base } from '$app/paths'
import { applySecurityHeaders } from '$lib/server/security/headers'
import { type Handle, redirect } from '@sveltejs/kit'

import { extractUrl, getLangCookie, getPreferredLocale } from './i18n/i18n-helper.js'
import { isLocale } from './i18n/i18n-util.js'

export const handle: Handle = async ({ event, resolve }) => {
	// extract url to get the lang and the rest
	const { urlLang, urlPath } = extractUrl(event)

	// get lang previously saved in cookie
	const cookie = getLangCookie(event)

	// if no lang in cookie then use lang preferred in setting
	const userLocale = cookie || getPreferredLocale(event)
	if (urlLang === 'api') {
		const response = await resolve(event)
		return applySecurityHeaders(response, { isApi: true })
	}
	// redirect to userLocale if no lang was found or lang is not a correct locale
	if (!urlLang || !isLocale(urlLang)) {
		const newPath = [base, userLocale, ...urlPath].join('/')
		throw redirect(307, newPath)
	}

	// urlLang is now guaranteed to be a valid Locale
	event.locals.locale = urlLang

	// replace html lang attribute with correct language and set security headers
	const response = await resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', urlLang),
	})

	return applySecurityHeaders(response, { isApi: false })
}
