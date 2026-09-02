<script lang="ts">
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import { BaseIcon } from '$base'
	import { nav_animate_hidden } from '$lib/stores/nav-store'
	import type { Tour } from '$lib/types/tour.type'
	import { get_length_and_index, get_sanity_data, get_tour_slug } from '$lib/utils/sanity'
	import { tour_index_store } from '$stores/tour-store'
	import { get_base_url } from '$utils/navigation'
	import { onMount } from 'svelte'

	let tours: Tour[]
	let slug
	const base_url = get_base_url($page)

	const handle_close = () => {
		nav_animate_hidden.set(false)
		goto(base_url)
	}

	const update_url = (_tours: Tour[], _index: number) => {
		const slug = get_tour_slug(_tours[_index])
		history.pushState({}, '', base_url + slug)
	}

	const update_index = (action: string) => {
		const index = $tour_index_store
		const new_index =
			action === 'next'
				? index === slug.length
					? 0
					: index + 1
				: index === 0
					? slug.length
					: index - 1
		tour_index_store.set(new_index)
		update_url(tours, index)
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	onMount(async () => {
		tours = await get_sanity_data($page)
		slug = get_length_and_index(tours, $page.params.slug || '')
	})
</script>

<div
	class="sticky top-0 z-30 flex w-full justify-between bg-white p-4 text-3xl lg:fixed lg:right-5 lg:top-5 lg:w-min lg:flex-col lg:gap-0.5 lg:bg-transparent">
	<button
		class="animation-all linear bg-slate-200 p-1.5 duration-200 hover:bg-slate-500 [&>*]:text-primary [&>*]:hover:text-white"
		on:click={() => handle_close()}>
		<BaseIcon
			name="close"
			class="w-6" />
	</button>
	<div class="flex gap-0.5 lg:flex-col">
		<button
			class="animation-all linear bg-slate-200 p-1.5 duration-200 hover:bg-slate-500 [&>*]:text-primary [&>*]:hover:text-white"
			on:click={() => update_index('prev')}>
			<BaseIcon
				name="prev"
				class="w-6" />
		</button>
		<button
			class="animation-all linear bg-slate-200 p-1.5 duration-200 hover:bg-slate-500 [&>*]:text-primary [&>*]:hover:text-white"
			on:click={() => update_index('next')}>
			<BaseIcon
				name="next"
				class="w-6" />
		</button>
	</div>
</div>
