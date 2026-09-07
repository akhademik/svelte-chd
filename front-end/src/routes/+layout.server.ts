import { fetchLatestExchangeRates } from '$lib/server/sanity-client'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals: { locale }, platform }) => {
	// extracted locale get from user preference or default in hooks.server.ts
	const kv = platform?.env?.SANITY_SNAPSHOT_KV
	const exchangeRates = await fetchLatestExchangeRates(kv)
	return { locale, exchangeRates }
}
