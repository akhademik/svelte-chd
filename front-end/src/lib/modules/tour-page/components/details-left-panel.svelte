<script lang="ts">
	import { locale } from '$i18n/i18n-svelte'
	import type { Tour } from '$lib/types/tour.type'
	import { url_for } from '$utils/sanity'

	export let tour: Tour
</script>

{#key tour}
	<div
		class="relative flex min-h-[400px] flex-col items-center justify-end bg-primary/80 lg:bottom-0 lg:top-0 lg:w-1/2 lg:justify-center">
		<picture
			class="absolute inset-0 p-3 lg:static lg:flex lg:items-center lg:justify-center lg:p-8">
			<!-- For Mobile -->
			{#if tour.img_cover?.asset}
				<img
					alt={tour.img_cover?.caption || tour.tour_name?.[$locale] || 'Tour'}
					src={url_for(tour.img_cover).height(400).auto('format').quality(60).url()}
					class="h-full w-full rounded-lg object-cover lg:hidden" />
			{/if}
			<!-- For BIG SCREEN -->
			<div
				class="hidden h-[700px] w-[500px] rounded-lg bg-red-100 p-1 before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-tr before:from-lime-400 before:to-fuchsia-400 before:blur-md lg:relative lg:flex">
				{#if tour.img_cover?.asset}
					<img
						alt={tour.img_cover?.caption || tour.tour_name?.[$locale] || 'Tour'}
						src={url_for(tour.img_cover).height(700).width(500).auto('format').quality(60).url()}
						class="h-full w-full rounded-lg object-cover" />
				{/if}
			</div>
		</picture>
		<span class="z-10 max-w-[500px] px-10 pb-10 text-center">
			<h1 class="text-xl font-bold">{tour.tour_name?.[$locale] || ''}</h1>
			<p class="pt-3 text-base">{tour.tour_duration?.[$locale] || ''}</p>
		</span>
	</div>
{/key}
