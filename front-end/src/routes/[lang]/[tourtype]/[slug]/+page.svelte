<script lang="ts">
	import { page } from '$app/stores'
	import { locale } from '$i18n/i18n-svelte'
	import BaseLoading from '$lib/base/base-loading.svelte'
	import { nav_animate_hidden } from '$lib/stores/nav-store'
	import { tour_index_store } from '$lib/stores/tour-store'
	import type { Tour } from '$lib/types/tour.type'
	import { get_sanity_data, tour_by_index } from '$lib/utils/sanity'
	import TourDetails from '$modules/tour-page/tour-details.svelte'
	import { set_seo } from '$stores/seo-store'
	import { onMount } from 'svelte'
	import { fade, fly } from 'svelte/transition'

	let tour: Tour
	let tours: Tour[]
	let animate = false
	let time_id: ReturnType<typeof setTimeout>

	$: if (tours) {
		tour = tour_by_index(tours, $tour_index_store)!
		nav_animate_hidden.set(true)
		set_seo(tour.tour_name[$locale])
		time_id = setTimeout(() => {
			animate = true
		}, 300)
	}

	onMount(async () => {
		tours = await get_sanity_data($page)
	})

	onMount(() => {
		return () => {
			set_seo('default')
			clearTimeout(time_id)
		}
	})
</script>

{#if !tours}
	<BaseLoading />
{:else if animate}
	<div transition:fade={{ duration: 300 }}>
		{#key tour}
			<div
				class="absolute inset-0 z-[999] flex h-max flex-col bg-white font-roboto text-white sm:text-xl lg:h-screen lg:flex-row"
				in:fly={{ x: -200, duration: 400, delay: 400 }}
				out:fly={{ x: 200, duration: 400 }}>
				<TourDetails {tour} />
			</div>
		{/key}
	</div>
{/if}
