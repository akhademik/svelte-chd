import type { Page } from '@sveltejs/kit'
import { goto } from '$app/navigation'
import type { Locales } from '$i18n/i18n-types'

export const get_base_url = (page: Page) => {
	const current_url = page.url.pathname
	const url = current_url.substring(0, current_url.lastIndexOf('/') + 1)
	return url
}

export const redirect_to_home = (locale: Locales) => {
	setTimeout(() => {
		goto(`/${locale}`)
	}, 2000)
}
