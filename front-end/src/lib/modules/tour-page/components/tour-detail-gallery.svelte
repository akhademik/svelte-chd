<script lang="ts">
	import { browser } from '$app/environment'
	import LL from '$i18n/i18n-svelte'
	import { url_for } from '$lib/utils/sanity'
	import { fade } from 'svelte/transition'

	interface Props {
		images: any[]
		title: string
	}

	let { images = [], title }: Props = $props()

	// Lightbox state & touch swipe handlers
	let isLightboxOpen = $state(false)
	let lightboxIndex = $state(0)
	let touchStartX = $state(0)
	let touchEndX = $state(0)

	const openLightbox = (index: number) => {
		if (images.length === 0) return
		lightboxIndex = (index + images.length) % images.length
		isLightboxOpen = true
	}

	const closeLightbox = () => {
		isLightboxOpen = false
	}

	const nextImage = () => {
		if (images.length <= 1) return
		lightboxIndex = (lightboxIndex + 1) % images.length
	}

	const prevImage = () => {
		if (images.length <= 1) return
		lightboxIndex = (lightboxIndex - 1 + images.length) % images.length
	}

	const handleTouchStart = (e: TouchEvent) => {
		touchStartX = e.changedTouches[0].screenX
	}

	const handleTouchEnd = (e: TouchEvent) => {
		touchEndX = e.changedTouches[0].screenX
		const swipeDistance = touchEndX - touchStartX
		if (Math.abs(swipeDistance) > 40) {
			if (swipeDistance < 0) {
				nextImage()
			} else {
				prevImage()
			}
		}
	}

	const handleKeydown = (e: KeyboardEvent) => {
		if (!isLightboxOpen) return
		if (e.key === 'Escape') closeLightbox()
		if (e.key === 'ArrowRight') nextImage()
		if (e.key === 'ArrowLeft') prevImage()
	}

	$effect(() => {
		if (browser) {
			if (isLightboxOpen) {
				document.body.style.overflow = 'hidden'
			} else {
				document.body.style.overflow = ''
			}
			return () => {
				document.body.style.overflow = ''
			}
		}
	})
</script>

<svelte:window onkeydown={handleKeydown} />

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

		<!-- Mobile View (Featured Image with swipeable preview and counter) -->
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

<!-- Fullscreen Lightbox Overlay (Infinite loop navigation, 50% Translucent Glassmorphism & Touch Swiping) -->
{#if isLightboxOpen && images.length > 0}
	<div
		transition:fade={{ duration: 200 }}
		class="fixed inset-0 z-[80] flex h-[100dvh] max-h-[100dvh] flex-col justify-between overflow-hidden bg-black/50 text-white backdrop-blur-md"
		role="dialog"
		aria-modal="true"
		aria-label="Tour image gallery">
		<!-- Lightbox Header -->
		<div
			class="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-6 sm:py-4">
			<div class="flex items-center gap-3 overflow-hidden pr-2">
				<span class="truncate font-serif text-sm font-medium text-white/90 sm:text-base"
					>{title}</span>
				<span
					class="hidden rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-light text-white/80 sm:inline-block">
					{lightboxIndex + 1} / {images.length}
				</span>
			</div>
			<button
				type="button"
				onclick={closeLightbox}
				class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/15 hover:text-white"
				aria-label="Close lightbox">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round">
					<line
						x1="18"
						y1="6"
						x2="6"
						y2="18"></line>
					<line
						x1="6"
						y1="6"
						x2="18"
						y2="18"></line>
				</svg>
			</button>
		</div>

		<!-- Lightbox Main Stage (Infinite navigation & touch swipe for mobile) -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="relative flex min-h-0 flex-1 items-center justify-center p-2 sm:p-6 md:p-8"
			ontouchstart={handleTouchStart}
			ontouchend={handleTouchEnd}>
			<!-- Previous Image Button (Desktop / Tablet) -->
			<button
				type="button"
				onclick={prevImage}
				class="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white/90 backdrop-blur-md transition-all hover:scale-110 hover:bg-black/70 hover:text-white focus:outline-none sm:left-6 sm:h-12 sm:w-12"
				aria-label="Previous photo (infinite)">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round">
					<polyline points="15 18 9 12 15 6"></polyline>
				</svg>
			</button>

			<!-- Active Image (Centered, zero jitter) -->
			<div class="relative flex h-full max-h-[72vh] w-full max-w-5xl items-center justify-center">
				<img
					src={url_for(images[lightboxIndex])
						.width(1600)
						.height(1000)
						.auto('format')
						.quality(90)
						.url()}
					alt=""
					class="max-h-full max-w-full select-none rounded-lg object-contain shadow-2xl transition-all duration-200" />
			</div>

			<!-- Next Image Button (Desktop / Tablet) -->
			<button
				type="button"
				onclick={nextImage}
				class="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white/90 backdrop-blur-md transition-all hover:scale-110 hover:bg-black/70 hover:text-white focus:outline-none sm:right-6 sm:h-12 sm:w-12"
				aria-label="Next photo (infinite)">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round">
					<polyline points="9 18 15 12 9 6"></polyline>
				</svg>
			</button>
		</div>

		<!-- Lightbox Footer / Thumbnails Strip -->
		<div class="border-t border-white/10 px-4 py-3 sm:px-6 sm:py-4">
			{#if images.length > 1}
				<div class="flex justify-center gap-2 overflow-x-auto py-1">
					{#each images as imgItem, idx}
						<button
							type="button"
							onclick={() => (lightboxIndex = idx)}
							class={`relative aspect-[16/10] h-12 shrink-0 overflow-hidden rounded border-2 transition-all sm:h-14 ${
								lightboxIndex === idx
									? 'scale-105 border-secondary opacity-100'
									: 'border-transparent opacity-40 hover:opacity-80'
							}`}>
							<img
								src={url_for(imgItem).width(120).height(80).auto('format').quality(70).url()}
								alt=""
								class="h-full w-full object-cover" />
						</button>
					{/each}
				</div>
			{/if}
		</div>
	</div>
{/if}
