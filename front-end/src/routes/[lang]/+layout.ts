import { isLocale } from '$i18n/i18n-util'
import { loadLocaleAsync } from '$i18n/i18n-util.async'
import type { LayoutLoad } from './$types'

export const trailingSlash = 'never'

export const load: LayoutLoad = async ({ params }) => {
	const locale = isLocale(params.lang) ? params.lang : 'en'
	await loadLocaleAsync(locale)
	return { locale }
}
