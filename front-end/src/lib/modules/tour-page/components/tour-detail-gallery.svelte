<script lang="ts">
	import LL from '$i18n/i18n-svelte'
	import { BaseImageLightbox } from '$lib/base'
	import { url_for } from '$lib/utils/sanity'

	interface Props {
		images: any[]
		title: string
	}

	let { images = [], title }: Props = $props()

	let isLightboxOpen = $state(false)
	let lightboxIndex = $state(0)

	const openLightbox = (index: number) => {
		if (images.length === 0) return
		lightboxIndex = (index + images.length) % images.length
		isLightboxOpen = true
	}
</script>

{#if images.length > 0}
	<section class="relative">
		<!-- Desktop / Tablet Grid (Split into 2: Left 1 big image, Right 4 small images) -->
		<div
			class="hidden h-[420px] grid-cols-4 gap-2.5 overflow-hidden rounded-xl bg-transparent md:grid lg:h-[480px]">
			<!-- Left Column: 1 Big Picture (Takes 2 cols, full height) -->
			<div
				role="button"
				tabindex="0"
				onclick={() => openLightbox(0)}
				onkeydown={e => e.key === 'Enter' && openLightbox(0)}
				class="group relative col-span-2 h-full cursor-pointer overflow-hidden rounded-xl bg-surface-muted/30">
				<img
					src={url_for(images[0]).width(1200).height(800).auto('format').quality(85).url()}
					alt=""
					class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
				<div
					class="absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
				</div>
			</div>

			<!-- Right Column: 4 Small Pictures (2x2 grid, takes 2 cols) -->
			<div class="col-span-2 grid h-full grid-cols-2 grid-rows-2 gap-2.5">
				{#each [1, 2, 3, 4] as imgIdx}
					{@const imageItem = images[imgIdx] || images[0]}
					{@const isLastVisible = imgIdx === 4}
					{@const hasMoreImages = images.length > 5}
					<div
						role="button"
						tabindex="0"
						onclick={() => openLightbox(imgIdx < images.length ? imgIdx : 0)}
						onkeydown={e => e.key === 'Enter' && openLightbox(imgIdx < images.length ? imgIdx : 0)}
						class="group relative h-full cursor-pointer overflow-hidden rounded-xl bg-surface-muted/30">
						<img
							src={url_for(imageItem).width(600).height(400).auto('format').quality(80).url()}
							alt=""
							class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
						<div
							class="absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
						</div>

						<!-- Overlay badge on 4th image if more images exist -->
						{#if isLastVisible && hasMoreImages}
							<div
								class="absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-black/50 text-white backdrop-blur-[2px] transition-colors group-hover:bg-black/60">
								<span class="font-serif text-xl font-bold">+{images.length - 4}</span>
								<span class="text-[11px] uppercase tracking-wider">
									{$LL.tours.gallery.view_all()}
								</span>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>

		<!-- Mobile View (Featured Image with preview strip and counter) -->
		<div class="space-y-2 md:hidden">
			<div
				role="button"
				tabindex="0"
				onclick={() => openLightbox(0)}
				onkeydown={e => e.key === 'Enter' && openLightbox(0)}
				class="relative aspect-[16/10] w-full cursor-pointer overflow-hidden rounded-xl bg-surface-muted/30 shadow-sm">
				<img
					src={url_for(images[0]).width(800).height(500).auto('format').quality(85).url()}
					alt=""
					class="h-full w-full object-cover" />
				<div
					class="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
					1 / {images.length}
				</div>
			</div>

			{#if images.length > 1}
				<div class="flex gap-2 overflow-x-auto pb-1">
					{#each images.slice(0, 6) as imgItem, idx}
						<button
							type="button"
							onclick={() => openLightbox(idx)}
							class="relative aspect-[16/10] h-16 shrink-0 overflow-hidden rounded-lg border border-border/80 bg-surface-muted/30">
							<img
								src={url_for(imgItem).width(160).height(100).auto('format').quality(70).url()}
								alt=""
								class="h-full w-full object-cover" />
						</button>
					{/each}
				</div>
			{/if}
		</div>

		<!-- Floating "View All Photos" Button -->
		<button
			type="button"
			onclick={() => openLightbox(0)}
			class="absolute bottom-4 right-4 hidden items-center gap-2 rounded-md border border-border bg-surface/95 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-foreground shadow-lg backdrop-blur-md transition-all hover:border-foreground hover:bg-surface hover:text-primary md:inline-flex">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-4 w-4"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round">
				<rect
					x="3"
					y="3"
					width="18"
					height="18"
					rx="2"
					ry="2"></rect>
				<circle
					cx="8.5"
					cy="8.5"
					r="1.5"></circle>
				<polyline points="21 15 16 10 5 21"></polyline>
			</svg>
			<span>
				{$LL.tours.gallery.view_all_photos({ count: images.length })}
			</span>
		</button>
	</section>
{/if}

<!-- Reusable Lightbox -->
<BaseImageLightbox
	{images}
	{title}
	bind:isOpen={isLightboxOpen}
	bind:index={lightboxIndex} />
