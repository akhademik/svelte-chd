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
	"img_tour": coalesce(img_tour, imgTour),
	"img_cover": coalesce(
		img_cover,
		imgCover,
		select(
			_id == "0a1af5fa-4d70-49de-8b2d-0f29aa9747e8" => *[_id == "image-0ca90a2840de3bb8fa533d08210c95e19ff36f90-3110x4083-jpg"][0]{ "asset": {"_ref": _id, "_type": "reference"}, "caption": "Bim Bip Waterfall" },
			_id == "766f62ab-aa6f-478f-a9bc-32972a1327d1" => *[_id == "image-44c707f6417176fc97b66bc7542ad78266ae52a4-7360x4912-jpg"][0]{ "asset": {"_ref": _id, "_type": "reference"}, "caption": "Lak Lake Activities" },
			_id == "a04d5f28-865b-4016-b62e-0f8fe9eeb0e5" => *[_id == "image-81e54ddcdeec9904de30cae644651628773846bc-4443x2962-jpg"][0]{ "asset": {"_ref": _id, "_type": "reference"}, "caption": "Cocoa Experience & Rafting" },
			_id == "e401a830-747f-4e2e-8f7c-a06dcba24baf" => *[_id == "image-e540e6e12bfb294486900665fccfaeda7947cd9c-1200x700-jpg"][0]{ "asset": {"_ref": _id, "_type": "reference"}, "caption": "Ta Dung Topview" },
			_id == "a9c1031e-3971-4d2d-a5a8-b1360e1c0b97" => *[_id == "image-d234c37e8579a12dc8ae7844705f02d605d6bd66-1226x690-jpg"][0]{ "asset": {"_ref": _id, "_type": "reference"}, "caption": "Central Highlands Tour" },
			*[_type == "sanity.imageAsset"][0]{ "asset": {"_ref": _id, "_type": "reference"}, "caption": "CHD Travel" }
		)
	),
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
