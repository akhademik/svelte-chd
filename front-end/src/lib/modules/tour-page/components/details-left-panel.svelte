<script lang="ts">
	import { locale } from '$i18n/i18n-svelte'
	import type { Tour } from '$lib/types/tour.type'
	import { url_for } from '$utils/sanity'

	interface Props {
		tour: Tour
	}

	let { tour }: Props = $props()
</script>

{#key tour}
	<div
		class="relative flex min-h-[360px] w-full flex-col items-center justify-center bg-primary p-6 text-white lg:h-full lg:w-1/2 lg:p-12">
		<picture class="relative flex w-full flex-1 items-center justify-center">
			{#if tour.img_cover?.asset}
				<div
					class="relative flex h-[280px] w-full max-w-[460px] items-center justify-center overflow-hidden rounded-xl shadow-2xl sm:h-[350px] lg:h-[500px]">
					<img
						alt={tour.img_cover?.caption || tour.tour_name?.[$locale] || 'Tour'}
						src={url_for(tour.img_cover).height(600).width(500).auto('format').quality(75).url()}
						class="h-full w-full object-cover" />
				</div>
			{/if}
		</picture>
		<div class="mt-4 flex w-full max-w-[460px] flex-col items-center gap-1.5 text-center">
			<h1 class="text-xl font-bold leading-snug sm:text-2xl">{tour.tour_name?.[$locale] || ''}</h1>
			<p class="text-sm font-medium text-white/80">{tour.tour_duration?.[$locale] || ''}</p>
		</div>
	</div>
{/key}
