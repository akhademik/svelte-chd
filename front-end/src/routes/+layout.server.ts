import { fetchLatestExchangeRates } from '$lib/server/sanity-client'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals: { locale } }) => {
	// extracted locale get from user preference or default in hooks.server.ts
	const exchangeRates = await fetchLatestExchangeRates()
	return { locale, exchangeRates }
}
