<script lang="ts">
	import { locale } from '$i18n/i18n-svelte'
	import type { Tour } from '$lib/types/tour.type'
	import { tour_by_index } from '$lib/utils/sanity'
	import TourDetails from '$modules/tour-page/tour-details.svelte'
	import { set_seo } from '$stores/seo-store'
	import { tour_index_store, tours_store } from '$stores/tour-store'
	import { onMount } from 'svelte'

	let tour: Tour

	$: {
		tour = tour_by_index($tours_store, $tour_index_store)!
		set_seo(tour?.tour_name[$locale] as string)
	}

	onMount(() => {
		return () => set_seo('default')
	})
</script>

<h1>Index: {$tour_index_store}</h1>
<h1>Tour: {tour?.tour_slug.current}</h1>
<button on:click={() => tour_index_store.update(i => i + 1)}>Increase</button>

<div
	class="font-roboto absolute inset-0 z-[999] flex h-max flex-col bg-white text-white sm:text-xl lg:h-screen lg:flex-row">
	<TourDetails {tour} />
</div>
