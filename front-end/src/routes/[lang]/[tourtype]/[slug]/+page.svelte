<script lang="ts">
	import { page } from '$app/state'
	import LL, { locale } from '$i18n/i18n-svelte'
	import { BaseJsonLd, BaseSeo } from '$lib/base'
	import { urlFor } from '$lib/utils/sanity'
	import TourDetails from '$modules/tour-page/tour-details.svelte'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()

	let tour = $derived(data.tour)
	let title = $derived(tour?.tourName?.[$locale] || tour?.tourName?.en || tour?.tourName?.vn || '')
	let imgUrl = $derived(tour?.coverImg ? urlFor(tour.coverImg).url() : undefined)

	let tourType = $derived(
		page.params.tourtype === 'day-tours' ? $LL.nav_bar.day_tours() : $LL.nav_bar.highland_tours()
	)

	let breadcrumbItems = $derived([
		{ name: $LL.nav_bar.home(), item: `https://chd.travel/${$locale}` },
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
