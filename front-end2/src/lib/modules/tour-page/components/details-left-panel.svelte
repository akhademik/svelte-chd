<script lang="ts">
	import { locale } from '$i18n/i18n-svelte'
	import type { Tour } from '$lib/types/tour.type'
	import { url_for } from '$utils/sanity'

	interface Props {
		tour: Tour
	}

	let { tour }: Props = $props()
</script>

<div
	class="relative flex w-full flex-col items-center justify-center bg-stone-900 p-8 text-stone-100 lg:h-full lg:w-1/2 lg:p-14">
	<div class="relative flex w-full flex-1 items-center justify-center">
		{#if tour.img_cover?.asset}
			<div
				class="relative h-[280px] w-full max-w-[480px] overflow-hidden border border-stone-800 shadow-2xl sm:h-[380px] lg:h-[520px]">
				<img
					alt={tour.img_cover?.caption || tour.tour_name?.[$locale] || 'Tour'}
					src={url_for(tour.img_cover).height(700).width(600).auto('format').quality(80).url()}
					class="h-full w-full object-cover" />
			</div>
		{/if}
	</div>
	<div class="mt-6 flex w-full max-w-[480px] flex-col items-center gap-2 text-center">
		<h1
			class="font-serif text-2xl font-normal leading-snug tracking-tight text-stone-50 sm:text-3xl">
			{tour.tour_name?.[$locale] || ''}
		</h1>
		<p class="text-xs uppercase tracking-widest text-stone-400">
			{tour.tour_duration?.[$locale] || ''}
		</p>
	</div>
</div>
