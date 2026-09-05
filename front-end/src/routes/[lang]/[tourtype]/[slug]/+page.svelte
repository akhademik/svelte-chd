<script lang="ts">
	import { page } from '$app/state'
	import { locale } from '$i18n/i18n-svelte'
	import { BaseJsonLd, BaseSeo } from '$lib/base'
	import { url_for } from '$lib/utils/sanity'
	import TourDetails from '$modules/tour-page/tour-details.svelte'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()

	let tour = $derived(data.tour)
	let title = $derived(
		tour?.tour_name?.[$locale] || tour?.tour_name?.en || tour?.tour_name?.vn || ''
	)
	let imgUrl = $derived(tour?.img_cover ? url_for(tour.img_cover).url() : undefined)
</script>

<BaseSeo
	{title}
	ogImage={imgUrl} />

<BaseJsonLd
	{tour}
	url={page.url.href} />

{#if tour}
	<TourDetails
		{tour}
		allTours={data.allCategoryTours} />
{/if}
