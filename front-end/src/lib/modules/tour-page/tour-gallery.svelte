<script lang="ts">
	import { page } from '$app/state'
	import LL, { locale } from '$i18n/i18n-svelte'
	import type { Tour } from '$lib/types/tour.type'
	import { fly } from 'svelte/transition'

	import TourCard from './tour-card.svelte'

	interface Props {
		tours: Tour[]
	}

	let { tours }: Props = $props()
	let tourtype = $derived(page.params.tourtype)
	let isDay = $derived(tourtype === 'day-tours')

	let availableTours = $derived(tours.filter(t => Boolean(t.tour_name?.[$locale])))
</script>

<div class="mx-auto max-w-6xl px-6 py-12">
	<div
		class="mb-16 flex flex-col justify-between gap-6 border-b border-stone-200 pb-8 md:flex-row md:items-end">
		<div>
			<span class="mb-3 block text-xs font-medium uppercase tracking-[0.25em] text-stone-400">
				{isDay ? '01 / Excursions' : '02 / Grand Expeditions'}
			</span>
			<h1 class="font-serif text-3xl font-bold text-moss sm:text-4xl">
				{isDay ? $LL.nav_bar.day_tours() : $LL.nav_bar.highland_tours()}
			</h1>
		</div>
		<p class="max-w-md text-sm font-light text-stone-500">
			{isDay
				? $locale === 'vn'
					? 'Gói trọn những khoảnh khắc tinh túy nhất của đất trời trong một ngày ngắn ngủi mà đáng nhớ.'
					: 'Unforgettable moments crafted into a single, enriching, unhurried day.'
				: $locale === 'vn'
					? 'Hành trình nhiều ngày sâu lắng qua những cung đường sương mù, rừng thông cổ thụ và âm vang đại ngàn.'
					: 'Multi-day mindful journeys through misty passes, ancient pine forests, and ethnic hamlets.'}
		</p>
	</div>

	<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
		{#each availableTours as tour, index (tour.tour_id || index)}
			<div in:fly={{ y: 20, duration: 400, delay: 100 * index }}>
				<TourCard {tour} />
			</div>
		{/each}
	</div>
</div>
