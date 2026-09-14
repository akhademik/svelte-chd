import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ExchangeService } from './exchange.service'
import { DEFAULT_EXCHANGE_RATES } from '$lib/constants/exchange-rates'
import { sanityClient } from '$lib/server/sanity/client'

vi.mock('$lib/server/sanity/client', () => ({
	sanityClient: {
		fetch: vi.fn(),
	},
}))

describe('exchange.service', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('parses and calculates exchange rates when Sanity returns valid numbers', async () => {
		;(vi.mocked(sanityClient.fetch) as any).mockResolvedValueOnce({
			rates: {
				rateUSD: 25000,
				rateEUR: 28000,
			},
			exchangeDate: '2026-09-14',
		})

		const rates = await ExchangeService.getLatestRates()
		expect(rates.USD).toBeCloseTo(1 / 25000)
		expect(rates.EUR).toBeCloseTo(1 / 28000)
		expect(rates.date).toBe('2026-09-14')
	})

	it('falls back to DEFAULT_EXCHANGE_RATES if Sanity returns invalid or out-of-range rates', async () => {
		;(vi.mocked(sanityClient.fetch) as any).mockResolvedValueOnce({
			rates: {
				rateUSD: -1,
				rateEUR: 9999999,
			},
		})

		const rates = await ExchangeService.getLatestRates()
		expect(rates.USD).toBe(DEFAULT_EXCHANGE_RATES.USD)
		expect(rates.EUR).toBe(DEFAULT_EXCHANGE_RATES.EUR)
	})

	it('falls back to DEFAULT_EXCHANGE_RATES when Sanity fetch throws error', async () => {
		;(vi.mocked(sanityClient.fetch) as any).mockRejectedValueOnce(new Error('Network error'))

		const rates = await ExchangeService.getLatestRates()
		expect(rates.USD).toBe(DEFAULT_EXCHANGE_RATES.USD)
		expect(rates.EUR).toBe(DEFAULT_EXCHANGE_RATES.EUR)
	})
})
