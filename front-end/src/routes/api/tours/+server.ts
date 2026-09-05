import {
	EXCHANGE_API_KEY,
	EXCHANGE_URL,
	SANITY_WRITE_TOKEN,
	VITE_SANITY_ID,
} from '$env/static/private'
import { type ClientConfig, createClient } from '@sanity/client'

const config: ClientConfig = {
	projectId: VITE_SANITY_ID,
	dataset: 'production',
	useCdn: true,
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

const extract_fields = `
	"best_sell": coalesce(best_sell, bestSellerTour, bestSell, false),
	"tour_highlights": coalesce(
		tour_highlights[]->{'highlights': coalesce(tour_highlights, highlights)},
		tourHighlights[]->{'highlights': coalesce(tour_highlights, tourHighlights, highlights)},
		[]
	),
	"tour_itinerary": coalesce(tour_itinerary, tourItinerary),
	"tour_includes": coalesce(tour_includes->tour_includes, tourIncludes->tourIncludes, tour_includes->includes, []),
	"tour_tags": coalesce(
		tour_tags[]->{'tour_tags': coalesce(tour_tags, tourTags)},
		tourTags[]->{'tour_tags': coalesce(tour_tags, tourTags)},
		[]
	),
	"tour_price": coalesce(tour_price, tourPrice),
	"tour_id": coalesce(tour_id, tourId, ''),
	"img_tour": coalesce(
		img_tour[]{
			...,
			"caption": coalesce(caption, asset->title, asset->originalFilename, ''),
			"alt": coalesce(alt, asset->altText, asset->description, '')
		},
		imgTour[]{
			...,
			"caption": coalesce(caption, asset->title, asset->originalFilename, ''),
			"alt": coalesce(alt, asset->altText, asset->description, '')
		},
		[]
	),
	"img_cover": coalesce(
		coverImg{
			...,
			"caption": coalesce(caption, asset->title, asset->originalFilename, ''),
			"alt": coalesce(alt, asset->altText, asset->description, '')
		},
		img_cover{
			...,
			"caption": coalesce(caption, asset->title, asset->originalFilename, ''),
			"alt": coalesce(alt, asset->altText, asset->description, '')
		},
		imgCover{
			...,
			"caption": coalesce(caption, asset->title, asset->originalFilename, ''),
			"alt": coalesce(alt, asset->altText, asset->description, '')
		}
	),
	"tour_duration": coalesce(tour_duration, tourDuration),
	"tour_slug": coalesce(tour_slug, tourSlug),
	"tour_intro": coalesce(tour_intro, tourIntro),
	"tour_name": coalesce(tour_name, tourName)
`

const sync_rate_to_sanity = async (usdRate: number, eurRate: number) => {
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
				console.warn(`[Sanity Rate Cleanup Note]: Could not delete old doc ${oldDoc._id}`, delErr)
			}
		}
	} catch (err) {
		console.error('[Sanity Rate Sync Error]:', err)
	}
}

const fallback_exchange_rate_from_sanity = async () => {
	try {
		const doc = await client.fetch(
			`*[_type == 'exchangeRates'] | order(exchangeDate desc, _updatedAt desc)[0]`
		)
		if (doc?.rates?.rateUSD && doc?.rates?.rateEUR) {
			return {
				USD: 1 / doc.rates.rateUSD,
				EUR: 1 / doc.rates.rateEUR,
			}
		}
	} catch (err) {
		console.error('[Sanity Rate Fallback Error]:', err)
	}
	return { USD: 0.00003841, EUR: 0.00003317 }
}

const fetch_exchange_rate = async () => {
	try {
		const url = EXCHANGE_URL
		const query = `${EXCHANGE_API_KEY}/latest/VND`
		const result = await fetch(url + query, { signal: AbortSignal.timeout(4000) })
		if (!result.ok) throw new Error(`Exchange API returned ${result.status}`)
		const data = await result.json()

		if (data?.conversion_rates?.USD && data?.conversion_rates?.EUR) {
			const extracted_rates = {
				USD: data.conversion_rates.USD,
				EUR: data.conversion_rates.EUR,
			}

			// Background sync to Sanity database
			sync_rate_to_sanity(extracted_rates.USD, extracted_rates.EUR).catch(() => {})

			return extracted_rates
		}
		throw new Error('Invalid rate format from API')
	} catch (error) {
		console.warn('[Exchange Rate API Failed, using Sanity fallback]:', error)
		return await fallback_exchange_rate_from_sanity()
	}
}

const fetch_data = async (db_name: string) => {
	let data: any[] = []
	if (db_name === 'day-tours') {
		data = await client.fetch(
			`*[_type in ['day-tours', 'tourDaily', 'day_tours', 'daily_tour']]{${extract_fields}}`
		)
	} else if (db_name === 'highland-tours') {
		data = await client.fetch(
			`*[_type in ['highland-tours', 'tourCentral', 'highland_tours']]{${extract_fields}}`
		)
	} else if (['tourDaily', 'tourCentral', 'day_tours', 'highland_tours'].includes(db_name)) {
		data = await client.fetch(`*[_type == $dbName]{${extract_fields}}`, { dbName: db_name })
	} else {
		// Default to all known tour types if db_name is empty or invalid
		data = await client.fetch(
			`*[_type in ['day-tours', 'tourDaily', 'day_tours', 'daily_tour', 'highland-tours', 'tourCentral', 'highland_tours']]{${extract_fields}}`
		)
	}

	const exchange_rate = await fetch_exchange_rate()
	const modded_data = { tours: [...data], stale_time: Date.now(), exchange_rate: exchange_rate }
	return modded_data
}

export const GET = async ({ url }) => {
	const db_name = url.searchParams.get('type') || url.search.substring(1)
	const data = await fetch_data(db_name)
	return new Response(JSON.stringify(data), {
		status: 200,
		headers: { 'Content-Type': 'application/json' },
	})
}
