<script lang="ts">
	import { page } from '$app/stores'
	import { BaseIcon } from '$lib/base'
	import { tour_index_store, tours_store } from '$lib/stores/tour-store'
	import type { Tour } from '$lib/types/tour.type'

	const close = () => {
		window.history.back()
	}

	const update_url = (index: number) => {
		const slug = $tours_store[index].tour_slug.current
		const current_url = $page.url.pathname
		const url = current_url.substring(0, current_url.lastIndexOf('/') + 1)
		history.pushState({}, '', url + slug)
	}

	const update_index = (action: string) => {
		if (action === 'next') {
			tour_index_store.set(index === slugs.length - 1 ? 0 : index + 1)
		} else if (action === 'prev') {
			tour_index_store.set(index === 0 ? slugs.length - 1 : index - 1)
		}
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	const css = {
		btn: 'p-1.5 hover:bg-slate-500 bg-slate-200 [&>*]:text-primary [&>*]:hover:text-white animation-all duration-200 linear',
	}

	$: index = $tour_index_store
	$: slugs = $tours_store.map((tour: Tour) => tour.tour_slug.current)
	$: {
		update_url($tour_index_store)
	}
</script>

<div
	class="sticky top-0 z-30 flex w-full justify-between bg-white p-4 text-3xl lg:fixed lg:right-5 lg:top-5 lg:w-min lg:flex-col lg:gap-0.5 lg:bg-transparent">
	<button
		class={css.btn}
		on:click={close}>
		<BaseIcon
			name="close"
			class="w-6" />
	</button>
	<div class="flex gap-0.5 lg:flex-col">
		<button
			class={css.btn}
			on:click={() => update_index('prev')}>
			<BaseIcon
				name="prev"
				class="w-6" />
		</button>
		<button
			class={css.btn}
			on:click={() => update_index('next')}>
			<BaseIcon
				name="next"
				class="w-6" />
		</button>
	</div>
</div>
