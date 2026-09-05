<script lang="ts">
	import { page } from '$app/state'
	import { locale } from '$i18n/i18n-svelte'
	import { BaseJsonLd } from '$lib/base'
	import { nav_animate_hidden } from '$lib/stores/nav-store'
	import { tour_index_store } from '$lib/stores/tour-store'
	import { get_length_and_index, url_for } from '$lib/utils/sanity'
	import TourDetails from '$modules/tour-page/tour-details.svelte'
	import { set_seo } from '$stores/seo-store'
	import { fade, fly } from 'svelte/transition'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()

	let tour = $derived(data.tour)
	let animate = $state(false)
	let time_id: ReturnType<typeof setTimeout>

	$effect(() => {
		if (data.allCategoryTours && data.slug) {
			const { index } = get_length_and_index(data.allCategoryTours, data.slug)
			tour_index_store.set(index)
		}
		nav_animate_hidden.set(true)
		if (tour) {
			const title = tour.tour_name?.[$locale] || tour.tour_name?.en || ''
			const imgUrl = tour.img_cover ? url_for(tour.img_cover).url() : undefined
			set_seo(title, undefined, undefined, imgUrl)
		}

		clearTimeout(time_id)
		time_id = setTimeout(() => {
			animate = true
		}, 100)

		return () => {
			set_seo('default')
			clearTimeout(time_id)
			nav_animate_hidden.set(false)
		}
	})
</script>

<BaseJsonLd
	{tour}
	url={page.url.href} />

{#if animate && tour}
	<div transition:fade={{ duration: 300 }}>
		{#key tour}
			<div
				class="fixed inset-0 z-[999] flex h-screen w-screen flex-col overflow-y-auto bg-white text-white sm:text-xl lg:flex-row lg:overflow-hidden"
				in:fly={{ x: -200, duration: 400, delay: 200 }}
				out:fly={{ x: 200, duration: 400 }}>
				<TourDetails
					{tour}
					allTours={data.allCategoryTours} />
			</div>
		{/key}
	</div>
{/if}
