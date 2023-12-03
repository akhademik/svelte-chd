<script lang="ts">
	import { page } from '$app/stores'
	import { locale } from '$i18n/i18n-svelte'
	import BaseLoading from '$lib/base/base-loading.svelte'
	import { tour_index_store } from '$lib/stores/tour-store'
	import type { Tour } from '$lib/types/tour.type'
	import { get_sanity_data, tour_by_index } from '$lib/utils/sanity'
	import TourDetails from '$modules/tour-page/tour-details.svelte'
	import { set_seo } from '$stores/seo-store'
	import { onMount } from 'svelte'

	let tour: Tour
	let tours: Tour[]

	$: if (tours) {
		tour = tour_by_index(tours, $tour_index_store)!
		set_seo(tour.tour_name[$locale])
	}

	onMount(async () => {
		tours = await get_sanity_data($page)
	})

	onMount(() => {
		return () => set_seo('default')
	})
</script>

{#if !tours}
	<BaseLoading />
{:else}
	<div
		class="font-roboto absolute inset-0 z-[999] flex h-max flex-col bg-white text-white sm:text-xl lg:h-screen lg:flex-row">
		<TourDetails {tour} />
	</div>
{/if}
