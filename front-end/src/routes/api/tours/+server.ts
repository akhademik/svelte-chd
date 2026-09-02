import { EXCHANGE_API_KEY, EXCHANGE_URL, VITE_SANITY_ID } from '$env/static/private'
import { type ClientConfig, createClient } from '@sanity/client'

const config: ClientConfig = {
	projectId: VITE_SANITY_ID,
	dataset: 'production',
	useCdn: true,
	apiVersion: '2023-11-03', // use current date (YYYY-MM-DD) to target the latest API version
}

const client = createClient(config)

const extract_fields = `best_sell, tour_highlights[]->{'highlights': tour_highlights}, tour_itinerary, "tour_includes": tour_includes->tour_includes, tour_tags, tour_price, tour_id, img_tour, img_cover, tour_duration, tour_slug,tour_intro, tour_name`

const fetch_exchange_rate = async () => {
	const url = EXCHANGE_URL
	const query = `${EXCHANGE_API_KEY}/latest/VND`
	const result = await fetch(url + query)
	const data = await result.json()
	const extracted_rates = { USD: data.conversion_rates.USD, EUR: data.conversion_rates.EUR }
	return extracted_rates
}

const fetch_data = async (db_name: string) => {
	const data = await client.fetch(`*[_type == '${db_name}']{${extract_fields}}`)
	const exchange_rate = await fetch_exchange_rate()
	const modded_data = { tours: [...data], stale_time: Date.now(), exchange_rate: exchange_rate }
	return modded_data
}

export const GET = async ({ url }) => {
	const db_name = url.search.substring(1)
	const data = await fetch_data(db_name)
	return new Response(JSON.stringify(data), { status: 200 })
}
