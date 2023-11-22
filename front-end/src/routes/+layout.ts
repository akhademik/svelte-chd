import type { Locales } from '$i18n/i18n-types'
import { loadLocaleAsync } from '$i18n/i18n-util.async'

import type { LayoutLoad } from './$types'

export const load: LayoutLoad<{ locale: Locales }> = async ({ data: { locale } }) => {
	// load dictionary into memory
	await loadLocaleAsync(locale)

	// pass locale to the "rendering context"
	return { locale }
}
