<script lang="ts">
	import { page } from '$app/state'
	import { locale } from '$i18n/i18n-svelte'
	import { BaseJsonLd } from '$lib/base'
	import { get_length_and_index, url_for } from '$lib/utils/sanity'
	import TourDetails from '$modules/tour-page/tour-details.svelte'
	import { set_seo } from '$stores/seo-store'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()

	let tour = $derived(data.tour)

	$effect(() => {
		if (tour) {
			const title = tour.tour_name?.[$locale] || tour.tour_name?.en || ''
			const imgUrl = tour.img_cover ? url_for(tour.img_cover).url() : undefined
			set_seo(title, undefined, undefined, imgUrl)
		}

		return () => {
			set_seo('default')
		}
	})
</script>

<BaseJsonLd
	{tour}
	url={page.url.href} />

{#if tour}
	<TourDetails
		{tour}
		allTours={data.allCategoryTours} />
{/if}
