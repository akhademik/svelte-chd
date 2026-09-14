<script lang="ts">
	import { browser } from '$app/environment'
	import { IconChevronLeft, IconChevronRight, IconClose } from '$lib/icons'
	import type { GalleryImage } from '$lib/utils/gallery'
	import { urlFor } from '$lib/utils/sanity'
	import { fade } from 'svelte/transition'

	interface Props {
		images?: GalleryImage[]
		title?: string
		isOpen?: boolean
		index?: number
		onclose?: () => void
	}

	let {
		images = [],
		title = '',
		isOpen = $bindable(false),
		index = $bindable(0),
		onclose,
	}: Props = $props()

	function portal(node: HTMLElement) {
		if (typeof document !== 'undefined') {
			document.body.appendChild(node)
		}
		return {
			destroy() {
				if (node.parentNode) {
					node.parentNode.removeChild(node)
				}
			},
		}
	}

	let touchStartX = $state(0)
	let touchEndX = $state(0)

	const close = () => {
		isOpen = false
		onclose?.()
	}

	const nextImage = () => {
		if (images.length <= 1) return
		index = (index + 1) % images.length
	}

	const prevImage = () => {
		if (images.length <= 1) return
		index = (index - 1 + images.length) % images.length
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
		if (!isOpen) return
		if (e.key === 'Escape') close()
		if (e.key === 'ArrowRight') nextImage()
		if (e.key === 'ArrowLeft') prevImage()
	}

	$effect(() => {
		if (browser) {
			if (isOpen) {
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

{#if isOpen && images.length > 0}
	<!-- Fixed full viewport overlay with original 50% translucent glassmorphic background portaled to document.body -->
	<div
		use:portal
		transition:fade={{ duration: 200 }}
		class="fixed inset-0 z-[110] m-0 flex h-[100dvh] h-screen w-[100dvw] w-screen flex-col justify-between overflow-hidden bg-black/50 p-0 text-white backdrop-blur-md"
		role="dialog"
		aria-modal="true"
		aria-label="Image gallery lightbox">
		<!-- 1. Lightbox Header (Shrink-0, stays firmly pinned to top) -->
		<div
			class="flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-3 sm:px-6 sm:py-3.5">
			<div class="flex items-center gap-3 overflow-hidden pr-2">
				{#if title}
					<span class="truncate font-serif text-sm font-medium text-white/90 sm:text-base">
						{title}
					</span>
				{/if}
				<span
					class="hidden rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-light text-white/80 sm:inline-block">
					{index + 1} / {images.length}
				</span>
			</div>
			<button
				type="button"
				onclick={close}
				class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/15 hover:text-white"
				aria-label="Close lightbox">
				<IconClose class="h-6 w-6" />
			</button>
		</div>

		<!-- 2. Lightbox Main Stage (Flex-1, dynamically sizes image to prevent clipping bottom thumbnails) -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="relative flex min-h-0 flex-1 items-center justify-center p-2 sm:p-4 md:p-6"
			ontouchstart={handleTouchStart}
			ontouchend={handleTouchEnd}>
			<!-- Previous Image Button -->
			<button
				type="button"
				onclick={prevImage}
				class="absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white/90 backdrop-blur-md transition-all hover:scale-110 hover:bg-black/80 hover:text-white focus:outline-none sm:left-4 sm:h-12 sm:w-12"
				aria-label="Previous photo">
				<IconChevronLeft class="h-6 w-6" />
			</button>

			<!-- Active Centered Image -->
			<div class="relative flex h-full w-full items-center justify-center overflow-hidden">
				<img
					src={urlFor(images[index]).width(1600).height(1000).auto('format').quality(90).url()}
					alt=""
					class="max-h-full max-w-full select-none rounded-lg object-contain shadow-2xl transition-all duration-200" />
			</div>

			<!-- Next Image Button -->
			<button
				type="button"
				onclick={nextImage}
				class="absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white/90 backdrop-blur-md transition-all hover:scale-110 hover:bg-black/80 hover:text-white focus:outline-none sm:right-4 sm:h-12 sm:w-12"
				aria-label="Next photo">
				<IconChevronRight class="h-6 w-6" />
			</button>
		</div>

		<!-- 3. Lightbox Footer / Thumbnails Strip (Shrink-0, safe area aware) -->
		<div
			class="shrink-0 border-t border-white/10 px-4 py-2.5 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-6 sm:py-3">
			{#if images.length > 1}
				<div class="flex justify-center gap-2 overflow-x-auto py-1">
					{#each images as imgItem, idx}
						<button
							type="button"
							onclick={() => (index = idx)}
							class={`relative aspect-[16/10] h-12 shrink-0 overflow-hidden rounded border-2 transition-all sm:h-14 ${
								index === idx
									? 'scale-105 border-secondary opacity-100'
									: 'border-transparent opacity-40 hover:opacity-80'
							}`}>
							<img
								src={urlFor(imgItem).width(120).height(80).auto('format').quality(70).url()}
								alt=""
								class="h-full w-full object-cover" />
						</button>
					{/each}
				</div>
			{/if}
		</div>
	</div>
{/if}
