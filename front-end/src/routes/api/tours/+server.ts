import { EXCHANGE_API_KEY, EXCHANGE_URL, VITE_SANITY_ID } from '$env/static/private'
import { type ClientConfig, createClient } from '@sanity/client'

const config: ClientConfig = {
	projectId: VITE_SANITY_ID,
	dataset: 'production',
	useCdn: true,
	apiVersion: '2023-11-03', // use current date (YYYY-MM-DD) to target the latest API version
}

const client = createClient(config)

const extract_fields = `
	"best_sell": coalesce(best_sell, bestSell, false),
	"tour_highlights": coalesce(
		tour_highlights[]->{'highlights': coalesce(tour_highlights, highlights)},
		tourHighlights[]->{'highlights': coalesce(tour_highlights, tourHighlights, highlights)},
		[]
	),
	"tour_itinerary": coalesce(tour_itinerary, tourItinerary),
	"tour_includes": coalesce(tour_includes->tour_includes, tourIncludes->tourIncludes, tour_includes->includes, []),
	"tour_tags": coalesce(tour_tags, tourTags, []),
	"tour_price": coalesce(tour_price, tourPrice),
	"tour_id": coalesce(tour_id, tourId, ''),
	"img_tour": coalesce(img_tour, imgTour, []),
	"img_cover": coalesce(img_cover, coverImg, imgCover),
	"tour_duration": coalesce(tour_duration, tourDuration),
	"tour_slug": coalesce(tour_slug, tourSlug),
	"tour_intro": coalesce(tour_intro, tourIntro),
	"tour_name": coalesce(tour_name, tourName)
`

const fetch_exchange_rate = async () => {
	const url = EXCHANGE_URL
	const query = `${EXCHANGE_API_KEY}/latest/VND`
	const result = await fetch(url + query)
	const data = await result.json()
	const extracted_rates = { USD: data.conversion_rates.USD, EUR: data.conversion_rates.EUR }
	return extracted_rates
}

const fetch_data = async (db_name: string) => {
	const type_condition =
		db_name === 'day-tours'
			? `_type in ['day-tours', 'tourDaily', 'day_tours', 'daily_tour']`
			: db_name === 'highland-tours'
				? `_type in ['highland-tours', 'tourCentral', 'highland_tours']`
				: `_type == '${db_name}'`
	const data = await client.fetch(`*[${type_condition}]{${extract_fields}}`)
	const exchange_rate = await fetch_exchange_rate()
	const modded_data = { tours: [...data], stale_time: Date.now(), exchange_rate: exchange_rate }
	return modded_data
}

export const GET = async ({ url }) => {
	const db_name = url.search.substring(1)
	const data = await fetch_data(db_name)
	return new Response(JSON.stringify(data), { status: 200 })
}
