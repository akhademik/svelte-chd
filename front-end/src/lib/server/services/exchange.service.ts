import { DEFAULT_EXCHANGE_RATES } from '$lib/constants/exchange-rates'
import { cachedFetch } from '$lib/server/cache/memory-cache'
import { withKvSnapshot } from '$lib/server/cache/kv-snapshot'
import { sanityClient } from '$lib/server/sanity/client'
import { EXCHANGE_RATES_QUERY } from '$lib/server/sanity/queries/blogs'
import { Logger } from '$lib/utils/logger'

export interface ExchangeRatesData {
	USD: number
	EUR: number
	date?: string
}

export const ExchangeService = {
	/**
	 * Fetches latest exchange rates from Sanity with KV snapshot backup and fallback to default rates.
	 */
	async getLatestRates(kv?: KVNamespace): Promise<ExchangeRatesData> {
		const defaultRates: ExchangeRatesData = { ...DEFAULT_EXCHANGE_RATES }
		return cachedFetch('latest-exchange-rates', 60 * 60 * 1000, async () => {
			try {
				return await withKvSnapshot(
					kv,
					'snapshot:exchange-rates',
					async () => {
						const doc = await sanityClient.fetch(EXCHANGE_RATES_QUERY)
						const usd = doc?.rates?.rateUSD
						const eur = doc?.rates?.rateEUR
						const isValid = (n: number) => typeof n === 'number' && n > 1000 && n < 100000

						if (isValid(usd) && isValid(eur)) {
							return {
								USD: 1 / usd,
								EUR: 1 / eur,
								date: doc.exchangeDate || undefined,
							}
						}
						throw new Error('Exchange rates out of valid range')
					},
					data => Boolean(data && data.USD && data.EUR)
				)
			} catch (err) {
				Logger.warn(
					'ExchangeRates',
					'[Sanity Server fetchLatestExchangeRates error, using defaultRates]:',
					err
				)
				return defaultRates
			}
		})
	},
}
