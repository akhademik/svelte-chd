<script lang="ts">
	import { goto } from '$app/navigation'
	import { page } from '$app/state'
	import { nav_animate_hidden } from '$lib/stores/nav-store'
	import { tour_index_store } from '$lib/stores/tour-store'
	import type { Tour } from '$lib/types/tour.type'
	import { logger } from '$lib/utils/logger'
	import { get_length_and_index, get_tour_slug } from '$lib/utils/sanity'
	import { get_base_url } from '$utils/navigation'

	interface Props {
		allTours?: Tour[]
	}

	let { allTours = [] }: Props = $props()

	let base_url = $derived(get_base_url(page as any))

	const handle_close = () => {
		nav_animate_hidden.set(false)
		goto(base_url)
	}

	const update_index = (action: 'next' | 'prev') => {
		if (allTours.length === 0) return
		const current_idx = $tour_index_store
		const max_len = allTours.length - 1
		const new_idx =
			action === 'next'
				? current_idx >= max_len
					? 0
					: current_idx + 1
				: current_idx <= 0
					? max_len
					: current_idx - 1

		tour_index_store.set(new_idx)
		const next_slug = get_tour_slug(allTours[new_idx], page.params.lang || 'en')
		logger.log(`Navigating ${action} to index ${new_idx} (slug: ${next_slug})`)
		goto(`${base_url}${next_slug}`, { replaceState: true, noScroll: true })
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	$effect(() => {
		const current_slug = page.params.slug || ''
		if (allTours && allTours.length > 0 && current_slug) {
			const slug_info = get_length_and_index(allTours, current_slug)
			tour_index_store.set(slug_info.index)
		}
	})
</script>

<div
	class="sticky top-0 z-30 flex w-full justify-between border-b border-stone-200 bg-stone-50/90 p-4 backdrop-blur-md lg:fixed lg:right-5 lg:top-5 lg:w-min lg:flex-col lg:gap-1.5 lg:border-none lg:bg-transparent lg:p-0">
	<button
		class="flex h-9 w-9 items-center justify-center border border-stone-300 bg-white text-stone-700 shadow-sm transition-all hover:border-stone-900 hover:bg-stone-900 hover:text-white"
		onclick={handle_close}
		aria-label="Close details">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-4 w-4"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round">
			<line
				x1="18"
				y1="6"
				x2="6"
				y2="18"></line>
			<line
				x1="6"
				y1="6"
				x2="18"
				y2="18"></line>
		</svg>
	</button>

	<div class="flex gap-1.5 lg:flex-col">
		<button
			class="flex h-9 w-9 items-center justify-center border border-stone-300 bg-white text-stone-700 shadow-sm transition-all hover:border-stone-900 hover:bg-stone-900 hover:text-white"
			onclick={() => update_index('prev')}
			aria-label="Previous tour">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-4 w-4"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round">
				<polyline points="15 18 9 12 15 6"></polyline>
			</svg>
		</button>
		<button
			class="flex h-9 w-9 items-center justify-center border border-stone-300 bg-white text-stone-700 shadow-sm transition-all hover:border-stone-900 hover:bg-stone-900 hover:text-white"
			onclick={() => update_index('next')}
			aria-label="Next tour">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-4 w-4"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round">
				<polyline points="9 18 15 12 9 6"></polyline>
			</svg>
		</button>
	</div>
</div>
