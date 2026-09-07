import { dev } from '$app/environment'
import {
	EXCHANGE_API_KEY,
	EXCHANGE_URL,
	SANITY_WRITE_TOKEN,
	VITE_SANITY_ID,
} from '$env/static/private'
import { EXTRACT_TOUR_FIELDS } from '$lib/server/sanity/queries/tours'
import { Logger } from '$lib/utils/logger'
import { type ClientConfig, createClient } from '@sanity/client'

const config: ClientConfig = {
	projectId: VITE_SANITY_ID,
	dataset: 'production',
	useCdn: !dev,
	apiVersion: '2023-11-03',
}

const client = createClient(config)

const writeClient = SANITY_WRITE_TOKEN
	? createClient({
			...config,
			useCdn: false,
			token: SANITY_WRITE_TOKEN,
		})
	: null

const syncRateToSanity = async (usdRate: number, eurRate: number) => {
	if (!writeClient) return
	try {
		const today = new Date().toISOString().split('T')[0]
		const latestRateId = 'exchange-rates-latest'

		// 1. Create or overwrite the singleton latest exchange rate document
		await writeClient.createOrReplace({
			_id: latestRateId,
			_type: 'exchangeRates',
			exchangeDate: today,
			rates: {
				_type: 'object',
				rateUSD: usdRate > 0 ? Math.round(1 / usdRate) : 24000,
				rateEUR: eurRate > 0 ? Math.round(1 / eurRate) : 26000,
			},
		})

		// 2. Link all tour documents to this latest rate doc
		const toursWithOldRef = await writeClient.fetch<
			Array<{ _id: string; exchangeRates?: { _ref: string } }>
		>(
			`*[_type in ['tourDaily', 'tourCentral', 'day-tours', 'highland-tours'] && defined(exchangeRates) && exchangeRates._ref != $latestId]{_id, exchangeRates}`,
			{ latestId: latestRateId }
		)

		for (const tour of toursWithOldRef) {
			await writeClient
				.patch(tour._id)
				.set({
					exchangeRates: {
						_type: 'reference',
						_ref: latestRateId,
					},
				})
				.commit()
		}

		// 3. Clean up obsolete old exchange rate documents (e.g. from 2023)
		const oldRateDocs = await writeClient.fetch<Array<{ _id: string }>>(
			`*[_type == 'exchangeRates' && _id != $latestId && !(_id in path('drafts.**'))]{_id}`,
			{ latestId: latestRateId }
		)

		for (const oldDoc of oldRateDocs) {
			try {
				await writeClient.delete(oldDoc._id)
			} catch (delErr) {
				// Ignore if any referenced constraint prevents deletion temporarily
				Logger.warn('SanityRate', `Could not delete old doc ${oldDoc._id}`, delErr)
			}
		}
	} catch (err) {
		Logger.error('SanityRate', 'Sanity Rate Sync Error:', err)
	}
}

const getLatestExchangeRateFromSanity = async () => {
	try {
		const doc = await client.fetch(
			`*[_type == 'exchangeRates'] | order(exchangeDate desc, _updatedAt desc)[0]`
		)
		if (doc?.rates?.rateUSD && doc?.rates?.rateEUR) {
			return {
				date: doc.exchangeDate || null,
				rates: {
					USD: 1 / doc.rates.rateUSD,
					EUR: 1 / doc.rates.rateEUR,
				},
			}
		}
	} catch (err) {
		Logger.error('SanityRate', 'Sanity Rate Fetch Error:', err)
	}
	return null
}

const fetchExchangeRate = async () => {
	const today = new Date().toISOString().split('T')[0]

	// 1. Check if Sanity database already has a sealed rate for today
	const latestFromSanity = await getLatestExchangeRateFromSanity()
	if (latestFromSanity && latestFromSanity.date === today) {
		return latestFromSanity.rates
	}

	// 2. If no rate for today, fetch new rate from external API
	try {
		const url = EXCHANGE_URL
		const query = `${EXCHANGE_API_KEY}/latest/VND`
		const result = await fetch(url + query, { signal: AbortSignal.timeout(4000) })
		if (!result.ok) throw new Error(`Exchange API returned ${result.status}`)
		const data = (await result.json()) as { conversion_rates?: { USD?: number; EUR?: number } }

		if (data?.conversion_rates?.USD && data?.conversion_rates?.EUR) {
			const extractedRates = {
				USD: data.conversion_rates.USD,
				EUR: data.conversion_rates.EUR,
			}

			// Background seal & sync to Sanity database for today
			syncRateToSanity(extractedRates.USD, extractedRates.EUR).catch(() => {})

			return extractedRates
		}
		throw new Error('Invalid rate format from API')
	} catch (error) {
		Logger.warn(
			'ExchangeAPI',
			'Exchange Rate API Failed, using last successful Sanity rate:',
			error
		)
		if (latestFromSanity?.rates) {
			return latestFromSanity.rates
		}
		return { USD: 0.00003841, EUR: 0.00003317 }
	}
}

const fetchData = async (dbName: string) => {
	let data: any[] = []
	if (dbName === 'day-tours') {
		data = await client.fetch(
			`*[_type in ['day-tours', 'tourDaily', 'day_tours', 'daily_tour']]{${EXTRACT_TOUR_FIELDS}}`
		)
	} else if (dbName === 'highland-tours') {
		data = await client.fetch(
			`*[_type in ['highland-tours', 'tourCentral', 'highland_tours']]{${EXTRACT_TOUR_FIELDS}}`
		)
	} else if (['tourDaily', 'tourCentral', 'day_tours', 'highland_tours'].includes(dbName)) {
		data = await client.fetch(`*[_type == $dbName]{${EXTRACT_TOUR_FIELDS}}`, { dbName })
	} else {
		// Default to all known tour types if dbName is empty or invalid
		data = await client.fetch(
			`*[_type in ['day-tours', 'tourDaily', 'day_tours', 'daily_tour', 'highland-tours', 'tourCentral', 'highland_tours']]{${EXTRACT_TOUR_FIELDS}}`
		)
	}

	const exchangeRate = await fetchExchangeRate()
	const moddedData = { tours: [...data], stale_time: Date.now(), exchange_rate: exchangeRate }
	return moddedData
}

export const GET = async ({ url }) => {
	const dbName = url.searchParams.get('type') || url.search.substring(1)
	const data = await fetchData(dbName)
	return new Response(JSON.stringify(data), {
		status: 200,
		headers: { 'Content-Type': 'application/json' },
	})
}
