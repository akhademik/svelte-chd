import { loadLocaleAsync } from '$i18n/i18n-util.async'
import type { LayoutLoad } from './$types'

export const load: LayoutLoad = async ({ data }) => {
	// load dictionary into memory
	const locale = data.locale
	await loadLocaleAsync(locale)

	// pass locale and exchange rates to the rendering context
	return {
		locale,
		exchangeRates: data.exchangeRates,
	}
}
