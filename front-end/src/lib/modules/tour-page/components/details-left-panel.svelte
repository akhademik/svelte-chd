<script lang="ts">
	import { locale } from '$i18n/i18n-svelte'
	import type { Tour } from '$lib/types/tour.type'
	import { url_for } from '$utils/sanity'

	interface Props {
		tour: Tour
	}

	let { tour }: Props = $props()

	let allImages = $derived.by(() => {
		const imgs: any[] = []
		if (tour.img_cover?.asset) imgs.push(tour.img_cover)
		if (tour.img_tour?.length) {
			tour.img_tour.forEach((img: any) => {
				if (img?.asset) imgs.push(img)
			})
		}
		return imgs
	})

	let activeIndex = $state(0)
</script>

<div
	class="relative flex w-full flex-col items-center justify-center bg-stone-900 p-6 text-stone-100 lg:h-full lg:w-1/2 lg:p-12">
	<div class="relative flex w-full flex-1 flex-col items-center justify-center gap-4">
		{#if allImages.length > 0}
			<!-- Main Display Image -->
			<div
				class="relative aspect-[4/3] w-full max-w-[500px] overflow-hidden border border-stone-800 bg-stone-950 shadow-2xl sm:aspect-[16/11]">
				<img
					alt={allImages[activeIndex]?.caption || tour.tour_name?.[$locale] || 'Tour Image'}
					src={url_for(allImages[activeIndex])
						.height(700)
						.width(600)
						.auto('format')
						.quality(80)
						.url()}
					class="h-full w-full object-cover transition-all duration-300" />

				{#if allImages.length > 1}
					<button
						type="button"
						onclick={() => (activeIndex = (activeIndex - 1 + allImages.length) % allImages.length)}
						class="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/80"
						aria-label="Previous image">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
					</button>
					<button
						type="button"
						onclick={() => (activeIndex = (activeIndex + 1) % allImages.length)}
						class="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/80"
						aria-label="Next image">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
					</button>
					<div
						class="absolute bottom-3 right-3 rounded-full bg-black/60 px-2.5 py-0.5 text-[10px] font-light text-stone-200 backdrop-blur-sm">
						{activeIndex + 1} / {allImages.length}
					</div>
				{/if}
			</div>

			<!-- Thumbnails Carousel (for tour extra images) -->
			{#if allImages.length > 1}
				<div class="flex max-w-[500px] gap-2 overflow-x-auto pb-1">
					{#each allImages as imgItem, idx}
						<button
							type="button"
							onclick={() => (activeIndex = idx)}
							class={`relative aspect-[4/3] h-14 shrink-0 overflow-hidden border transition-all ${
								activeIndex === idx
									? 'scale-105 border-terracotta opacity-100 ring-1 ring-terracotta'
									: 'border-stone-800 opacity-60 hover:opacity-100'
							}`}>
							<img
								src={url_for(imgItem).width(120).height(90).auto('format').quality(65).url()}
								alt={`Thumbnail ${idx + 1}`}
								class="h-full w-full object-cover" />
						</button>
					{/each}
				</div>
			{/if}
		{/if}
	</div>

	<div class="mt-4 flex w-full max-w-[500px] flex-col items-center gap-1.5 text-center">
		<h1
			class="font-serif text-2xl font-normal leading-snug tracking-tight text-stone-50 sm:text-3xl">
			{tour.tour_name?.[$locale] || ''}
		</h1>
		<p class="text-xs uppercase tracking-widest text-stone-400">
			{tour.tour_duration?.[$locale] || ''}
		</p>
	</div>
</div>
