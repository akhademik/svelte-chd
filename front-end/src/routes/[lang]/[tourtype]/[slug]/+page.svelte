<script lang="ts">
	import { page } from '$app/state'
	import LL, { locale } from '$i18n/i18n-svelte'
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

	let tourType = $derived(
		page.params.tourtype === 'day-tours' ? $LL.nav_bar.day_tours() : $LL.nav_bar.highland_tours()
	)

	let breadcrumbItems = $derived([
		{ name: $locale === 'vn' ? 'Trang chủ' : 'Home', item: `https://chd.travel/${$locale}` },
		{ name: tourType, item: `https://chd.travel/${$locale}/${page.params.tourtype}` },
		{ name: title, item: page.url.href },
	])
</script>

<BaseSeo
	{title}
	ogImage={imgUrl} />

<BaseJsonLd
	{tour}
	breadcrumbs={breadcrumbItems}
	url={page.url.href} />

{#if tour}
	<TourDetails
		{tour}
		allTours={data.allCategoryTours} />
{/if}
