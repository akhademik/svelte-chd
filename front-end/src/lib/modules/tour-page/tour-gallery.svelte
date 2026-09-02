<script lang="ts">
	import { page } from '$app/stores'
	import LL from '$i18n/i18n-svelte'
	import type { Tour } from '$lib/types/tour.type'
	import { onMount } from 'svelte'
	import { fly } from 'svelte/transition'

	import TourCard from './tour-card.svelte'

	export let tours: Tour[]
	type Intro = 'intro_day' | 'intro_central'
	let animate = false

	$: intro = ($page.params.tourtype === 'day-tours' ? 'intro_day' : 'intro_central') as Intro

	onMount(() => {
		const time_id = setTimeout(() => {
			animate = true
		}, 600)

		return () => {
			clearTimeout(time_id)
			animate = false
		}
	})
</script>

{#key intro}
	<div
		in:fly|global={{ x: -200, duration: 600, delay: 300 }}
		out:fly={{ x: 200, duration: 300 }}>
		<div class="flex flex-col items-center gap-5 py-5">
			<h1
				class="relative font-bold uppercase before:absolute before:-bottom-1 before:left-[15%] before:h-1 before:w-[70%] before:bg-secondary">
				{$LL.tours[intro]()}
			</h1>
			<p>{$LL.tours.description()}</p>
		</div>

		<section
			class="mx-auto grid justify-items-center gap-2 sm:grid-cols-2 md:max-w-2xl lg:max-w-5xl lg:grid-cols-3">
			{#each tours as tour, index (index)}
				{#if animate}
					<div in:fly|global={{ x: -200, duration: 600, delay: 600 * index }}>
						<TourCard {tour} />
					</div>
				{/if}
			{/each}
		</section>
	</div>
{/key}
