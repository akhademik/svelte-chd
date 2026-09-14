<script lang="ts">
	import { mapTestimonials, TestimonialCard } from '$lib/modules/testimonials'
	import type { Testimonial } from '$lib/types/testimonial.type'
	import { onMount } from 'svelte'

	interface Props {
		testimonials?: Testimonial[]
	}

	let { testimonials = [] }: Props = $props()

	const list = $derived(mapTestimonials(testimonials))
	const totalReal = $derived(list.length)

	// Infinite loop with prepended last item and appended first item
	const displayList = $derived.by(() => {
		if (totalReal <= 1) return list
		return [list[totalReal - 1], ...list, list[0]]
	})

	let currentTrackIndex = $state(1)
	let isTransitioning = $state(false)
	let isHovered = $state(false)

	const nextSlide = () => {
		if (totalReal <= 1 || isTransitioning) return
		isTransitioning = true
		currentTrackIndex += 1
	}

	const prevSlide = () => {
		if (totalReal <= 1 || isTransitioning) return
		isTransitioning = true
		currentTrackIndex -= 1
	}

	const handleTransitionEnd = () => {
		isTransitioning = false
		if (totalReal <= 1) return

		if (currentTrackIndex === totalReal + 1) {
			currentTrackIndex = 1
		} else if (currentTrackIndex === 0) {
			currentTrackIndex = totalReal
		}
	}

	onMount(() => {
		const interval = setInterval(() => {
			if (!isHovered && totalReal > 1) {
				nextSlide()
			}
		}, 7000)

		return () => clearInterval(interval)
	})
</script>

<div
	class="relative min-h-[220px] overflow-hidden border border-border bg-surface shadow-sm sm:h-[360px]"
	onmouseenter={() => (isHovered = true)}
	onmouseleave={() => (isHovered = false)}
	role="region"
	aria-label="Customer reviews">
	{#if totalReal > 1}
		<div class="absolute right-4 top-4 z-10 flex items-center gap-2">
			<button
				type="button"
				onclick={prevSlide}
				class="flex h-7 w-7 items-center justify-center border border-border-strong bg-surface text-foreground-muted shadow-sm transition-colors hover:border-primary hover:bg-primary hover:text-white"
				aria-label="Previous review">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-3.5 w-3.5"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
			</button>
			<button
				type="button"
				onclick={nextSlide}
				class="flex h-7 w-7 items-center justify-center border border-border-strong bg-surface text-foreground-muted shadow-sm transition-colors hover:border-primary hover:bg-primary hover:text-white"
				aria-label="Next review">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-3.5 w-3.5"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
			</button>
		</div>
	{/if}

	<!-- Infinite Carousel Track -->
	<div
		class="flex h-full"
		class:transition-transform={isTransitioning}
		class:duration-500={isTransitioning}
		class:ease-out={isTransitioning}
		style="transform: translateX(-{currentTrackIndex * 100}%);"
		ontransitionend={handleTransitionEnd}>
		{#each displayList as currentReview}
			<div class="h-full w-full shrink-0">
				<TestimonialCard
					testimonial={currentReview}
					titleClass="line-clamp-1"
					headerPaddingClass="pr-20"
					class="h-full w-full" />
			</div>
		{/each}
	</div>
</div>
