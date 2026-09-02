<script lang="ts">
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import { BaseIcon } from '$base'
	import { nav_animate_hidden } from '$lib/stores/nav-store'
	import type { Tour } from '$lib/types/tour.type'
	import { get_length_and_index, get_sanity_data, get_tour_slug } from '$lib/utils/sanity'
	import { tour_index_store } from '$stores/tour-store'
	import { get_base_url } from '$utils/navigation'

	import { logger } from '$lib/utils/logger'

	let tours = $state<Tour[]>([])
	let slug_info = $state<{ length: number; index: number }>({ length: 0, index: 0 })
	let base_url = $derived(get_base_url($page))

	const handle_close = () => {
		nav_animate_hidden.set(false)
		goto(base_url)
	}

	const update_index = (action: 'next' | 'prev') => {
		if (tours.length === 0) return
		const current_idx = $tour_index_store
		const max_len = tours.length - 1
		const new_idx =
			action === 'next'
				? current_idx >= max_len
					? 0
					: current_idx + 1
				: current_idx <= 0
					? max_len
					: current_idx - 1

		tour_index_store.set(new_idx)
		const next_slug = get_tour_slug(tours[new_idx], $page.params.lang || 'en')
		logger.log(`Navigating ${action} to index ${new_idx} (slug: ${next_slug})`)
		goto(`${base_url}${next_slug}`, { replaceState: true, noScroll: true })
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	$effect(() => {
		const current_slug = $page.params.slug || ''
		get_sanity_data($page).then(data => {
			if (data && data.length > 0) {
				tours = data
				slug_info = get_length_and_index(tours, current_slug)
				tour_index_store.set(slug_info.index)
			}
		})
	})
</script>

<div
	class="sticky top-0 z-30 flex w-full justify-between bg-white p-4 text-3xl lg:fixed lg:right-5 lg:top-5 lg:w-min lg:flex-col lg:gap-0.5 lg:bg-transparent">
	<button
		class="animation-all linear bg-slate-200 p-1.5 duration-200 hover:bg-slate-500 [&>*]:text-primary [&>*]:hover:text-white"
		onclick={() => handle_close()}>
		<BaseIcon
			name="close"
			class="w-6" />
	</button>
	<div class="flex gap-0.5 lg:flex-col">
		<button
			class="animation-all linear bg-slate-200 p-1.5 duration-200 hover:bg-slate-500 [&>*]:text-primary [&>*]:hover:text-white"
			onclick={() => update_index('prev')}>
			<BaseIcon
				name="prev"
				class="w-6" />
		</button>
		<button
			class="animation-all linear bg-slate-200 p-1.5 duration-200 hover:bg-slate-500 [&>*]:text-primary [&>*]:hover:text-white"
			onclick={() => update_index('next')}>
			<BaseIcon
				name="next"
				class="w-6" />
		</button>
	</div>
</div>
