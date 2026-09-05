<script lang="ts">
	import { locale } from '$i18n/i18n-svelte'
	import type { Tour } from '$lib/types/tour.type'
	import { url_for } from '$lib/utils/sanity'

	interface Props {
		tour?: Tour | null
		url?: string
	}

	let { tour, url }: Props = $props()

	let tourName = $derived(
		tour?.tour_name?.[$locale] || tour?.tour_name?.en || tour?.tour_name?.vn || 'CHD Travel Tour'
	)

	let tourImage = $derived(tour?.img_cover ? url_for(tour.img_cover).url() : undefined)

	let tourPrice = $derived(
		tour?.tour_price?.price || tour?.tour_price?.vn || tour?.tour_price?.en || undefined
	)

	let jsonLdScript = $derived.by(() => {
		if (!tour) return ''
		const schemaData = {
			'@context': 'https://schema.org',
			'@type': 'TouristTrip',
			name: tourName,
			description: tourName,
			...(url ? { url } : {}),
			...(tourImage ? { image: tourImage } : {}),
			offers: {
				'@type': 'Offer',
				priceCurrency: 'VND',
				...(tourPrice ? { price: tourPrice } : {}),
				availability: 'https://schema.org/InStock',
			},
			provider: {
				'@type': 'TravelAgency',
				name: 'CHD Travel',
				url: 'https://chd.travel',
			},
		}
		const content = JSON.stringify(schemaData)
		return '<script type="application/ld+json">' + content + '</' + 'script>'
	})
</script>

<svelte:head>
	{#if jsonLdScript}
		{@html jsonLdScript}
	{/if}
</svelte:head>
