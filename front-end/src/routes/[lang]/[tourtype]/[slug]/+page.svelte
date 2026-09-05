<script lang="ts">
	import { page } from '$app/stores'
	import { locale } from '$i18n/i18n-svelte'
	import BaseLoading from '$lib/base/base-loading.svelte'
	import { nav_animate_hidden } from '$lib/stores/nav-store'
	import { tour_index_store } from '$lib/stores/tour-store'
	import type { Tour } from '$lib/types/tour.type'
	import { get_length_and_index, get_sanity_data } from '$lib/utils/sanity'
	import TourDetails from '$modules/tour-page/tour-details.svelte'
	import { set_seo } from '$stores/seo-store'
	import { fade, fly } from 'svelte/transition'

	let tour = $state<Tour | null>(null)
	let tours = $state<Tour[]>([])
	let animate = $state(false)
	let time_id: ReturnType<typeof setTimeout>

	let slug_param = $derived($page.params.slug)

	$effect(() => {
		const current_slug = slug_param
		if (current_slug) {
			get_sanity_data($page).then(data => {
				if (data && data.length > 0) {
					tours = data
					const { index } = get_length_and_index(tours, current_slug)
					tour_index_store.set(index)
					tour = tours[index]
					nav_animate_hidden.set(true)
					if (tour?.tour_name?.[$locale]) {
						set_seo(tour.tour_name[$locale])
					}
					clearTimeout(time_id)
					time_id = setTimeout(() => {
						animate = true
					}, 150)
				}
			})
		}

		return () => {
			set_seo('default')
			clearTimeout(time_id)
			nav_animate_hidden.set(false)
		}
	})
</script>

{#if !tour}
	<BaseLoading />
{:else if animate}
	<div transition:fade={{ duration: 300 }}>
		{#key tour}
			<div
				class="fixed inset-0 z-[999] flex h-screen w-screen flex-col overflow-y-auto bg-white text-white sm:text-xl lg:flex-row lg:overflow-hidden"
				in:fly={{ x: -200, duration: 400, delay: 400 }}
				out:fly={{ x: 200, duration: 400 }}>
				<TourDetails {tour} />
			</div>
		{/key}
	</div>
{/if}
