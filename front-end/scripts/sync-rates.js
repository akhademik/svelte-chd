import { createClient } from '@sanity/client'

async function run() {
	const sanityId = process.env.VITE_SANITY_ID || 'uzyjbxdd'
	const writeToken = process.env.SANITY_WRITE_TOKEN
	const exchangeUrl = process.env.EXCHANGE_URL || 'https://v6.exchangerate-api.com/v6/'
	const apiKey = process.env.EXCHANGE_API_KEY

	if (!writeToken || !apiKey) {
		console.log('[Notice]: Missing SANITY_WRITE_TOKEN or EXCHANGE_API_KEY secret. Skipping sync.')
		return
	}

	const client = createClient({
		projectId: sanityId,
		dataset: 'production',
		token: writeToken,
		useCdn: false,
		apiVersion: '2023-11-03',
	})

	const existing = await client.fetch(`*[_id == "exchange-rates-latest"][0]{exchangeDate}`)
	const today = new Date().toISOString().split('T')[0]

	if (existing?.exchangeDate === today) {
		console.log(`[Sync]: Đã có rate ngày ${today} rồi, bỏ qua, không gọi API ngoài.`)
		return
	}

	console.log('[Sync]: Fetching external exchange rates...')
	const res = await fetch(`${exchangeUrl}${apiKey}/latest/VND`)
	if (!res.ok) throw new Error(`HTTP ${res.status}`)
	const data = await res.json()

	const usd = data?.conversion_rates?.USD
	const eur = data?.conversion_rates?.EUR

	if (!usd || !eur) {
		throw new Error('Invalid rate response from API')
	}

	console.log(`[Sync]: Today ${today} -> USD: ${usd}, EUR: ${eur}`)

	await client.createOrReplace({
		_id: 'exchange-rates-latest',
		_type: 'exchangeRates',
		exchangeDate: today,
		rates: {
			_type: 'object',
			rateUSD: Math.round(1 / usd),
			rateEUR: Math.round(1 / eur),
		},
	})

	console.log('[Sync]: Successfully saved exchange-rates-latest to Sanity!')
}

run().catch(err => {
	console.error('[Sync Error]:', err)
	process.exit(1)
})
