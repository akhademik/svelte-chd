import { createClient } from '@sanity/client'

async function run() {
	const sanityId = process.env.VITE_SANITY_ID || 'uzyjbxdd'
	const writeToken = process.env.SANITY_WRITE_TOKEN
	const exchangeUrl = process.env.EXCHANGE_URL || 'https://v6.exchangerate-api.com/v6/'
	const apiKey = process.env.EXCHANGE_API_KEY

	if (!writeToken) {
		console.warn(
			'[Warning]: SANITY_WRITE_TOKEN is not configured in GitHub Secrets. Cannot write sealed rate to Sanity.'
		)
		return
	}

	if (!apiKey) {
		console.warn(
			'[Warning]: EXCHANGE_API_KEY is not configured in GitHub Secrets. Cannot fetch rates from ExchangeRate API.'
		)
		return
	}

	const client = createClient({
		projectId: sanityId,
		dataset: 'production',
		token: writeToken,
		useCdn: false,
		apiVersion: '2023-11-03',
	})

	const existing = await client.fetch(`*[_id == "exchange-rates-latest"][0]{exchangeDate, rates}`)
	const today = new Date().toISOString().split('T')[0]

	if (existing?.exchangeDate === today && existing?.rates?.rateUSD && existing?.rates?.rateEUR) {
		console.log(
			`[Sync]: Rate for today (${today}) already exists in Sanity. Skipping external API call.`
		)
		return
	}

	console.log(`[Sync]: Fetching external exchange rates for ${today}...`)
	const res = await fetch(`${exchangeUrl}${apiKey}/latest/VND`)
	if (!res.ok) throw new Error(`Exchange API returned HTTP ${res.status}: ${res.statusText}`)
	const data = await res.json()

	const usd = data?.conversion_rates?.USD
	const eur = data?.conversion_rates?.EUR

	if (!usd || !eur) {
		throw new Error('Invalid rate response format from Exchange API')
	}

	const rateUSD = Math.round(1 / usd)
	const rateEUR = Math.round(1 / eur)

	console.log(`[Sync]: Today (${today}) rates -> 1 USD = ${rateUSD} VND, 1 EUR = ${rateEUR} VND`)

	await client.createOrReplace({
		_id: 'exchange-rates-latest',
		_type: 'exchangeRates',
		exchangeDate: today,
		rates: {
			_type: 'object',
			rateUSD,
			rateEUR,
		},
	})

	console.log('[Sync]: Successfully sealed exchange-rates-latest into Sanity!')
}

run().catch(err => {
	console.error('[Sync Error]:', err)
	process.exit(1)
})
