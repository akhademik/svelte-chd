<script lang="ts">
	import LL from '$i18n/i18n-svelte'
	import {
		mapTestimonials,
		TestimonialCard,
		type TestimonialViewModel,
	} from '$lib/modules/testimonials'
	import type { Testimonial } from '$lib/types/testimonial.type'
	import { onMount, untrack } from 'svelte'

	interface Props {
		testimonials?: Testimonial[]
	}

	let { testimonials = [] }: Props = $props()

	const PAGE_SIZE = 3

	function getSlides(rawList: Testimonial[]) {
		const items = mapTestimonials(rawList)
		if (items.length === 0) return []
		const slides: TestimonialViewModel[][] = []
		for (let i = 0; i < items.length; i += PAGE_SIZE) {
			const slide = []
			for (let j = 0; j < Math.min(PAGE_SIZE, items.length); j++) {
				slide.push(items[(i + j) % items.length])
			}
			slides.push(slide)
		}
		return slides
	}

	let baseSlides = $derived(getSlides(testimonials))
	let totalRealSlides = $derived(baseSlides.length)
	let displaySlides = $derived(
		totalRealSlides <= 1
			? baseSlides
			: [baseSlides[totalRealSlides - 1], ...baseSlides, baseSlides[0]]
	)

	let currentTrackIndex = $state(1)
	let isTransitioning = $state(false)
	let isPaused = $state(false)

	// Touch swipe state
	let touchStartX = $state(0)
	let touchEndX = $state(0)

	let activeDotIndex = $derived.by(() => {
		const count = totalRealSlides
		if (count <= 1) return 0
		if (currentTrackIndex === 0) return count - 1
		if (currentTrackIndex === count + 1) return 0
		return currentTrackIndex - 1
	})

	const nextSlide = () => {
		const count = untrack(() => totalRealSlides)
		if (count <= 1 || isTransitioning) return
		isTransitioning = true
		currentTrackIndex += 1
	}

	const prevSlide = () => {
		const count = untrack(() => totalRealSlides)
		if (count <= 1 || isTransitioning) return
		isTransitioning = true
		currentTrackIndex -= 1
	}

	const goToSlide = (idx: number) => {
		const count = untrack(() => totalRealSlides)
		if (count <= 1 || isTransitioning) return
		isTransitioning = true
		currentTrackIndex = idx + 1
	}

	const handleTransitionEnd = () => {
		isTransitioning = false
		const count = untrack(() => totalRealSlides)
		if (count <= 1) return

		if (currentTrackIndex === count + 1) {
			currentTrackIndex = 1
		} else if (currentTrackIndex === 0) {
			currentTrackIndex = count
		}
	}

	const handleKeydown = (e: KeyboardEvent) => {
		if (e.key === 'ArrowLeft') {
			e.preventDefault()
			prevSlide()
		} else if (e.key === 'ArrowRight') {
			e.preventDefault()
			nextSlide()
		}
	}

	const handleTouchStart = (e: TouchEvent) => {
		touchStartX = e.touches[0].clientX
	}

	const handleTouchEnd = (e: TouchEvent) => {
		touchEndX = e.changedTouches[0].clientX
		const diff = touchStartX - touchEndX
		if (Math.abs(diff) > 40) {
			if (diff > 0) {
				nextSlide()
			} else {
				prevSlide()
			}
		}
	}

	onMount(() => {
		// Check for prefers-reduced-motion
		const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
		let prefersReducedMotion = mediaQuery.matches

		const handleMotionChange = (e: MediaQueryListEvent) => {
			prefersReducedMotion = e.matches
		}
		mediaQuery.addEventListener('change', handleMotionChange)

		const interval = setInterval(() => {
			if (!isPaused && !prefersReducedMotion && untrack(() => totalRealSlides) > 1) {
				nextSlide()
			}
		}, 7000)

		return () => {
			clearInterval(interval)
			mediaQuery.removeEventListener('change', handleMotionChange)
		}
	})
</script>

<svelte:window onkeydown={handleKeydown} />

<section class="sm:py-18 border-b border-border px-6 py-14">
	<div class="mx-auto max-w-6xl">
		<div
			class="mb-10 flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
			<div>
				<span class="text-xs font-semibold uppercase tracking-[0.25em] text-secondary">
					{$LL.home_page.testimonials.subtitle()}
				</span>
				<h2 class="mt-2 font-serif text-3xl font-bold text-primary sm:text-4xl">
					{$LL.home_page.testimonials.title()}
				</h2>
				<p class="mt-2 max-w-lg text-sm font-light text-foreground-muted">
					{$LL.home_page.testimonials.desc()}
				</p>
			</div>

			{#if totalRealSlides > 1}
				<!-- Carousel Controls (Hovering/Focusing stops auto-advance) -->
				<div class="flex items-center gap-3">
					<button
						type="button"
						onclick={prevSlide}
						onmouseenter={() => (isPaused = true)}
						onmouseleave={() => (isPaused = false)}
						onfocus={() => (isPaused = true)}
						onblur={() => (isPaused = false)}
						class="flex h-11 w-11 items-center justify-center border border-border-strong bg-surface text-foreground-muted transition-all hover:border-primary hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary"
						aria-label="Previous testimonials slide">
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
						onclick={nextSlide}
						onmouseenter={() => (isPaused = true)}
						onmouseleave={() => (isPaused = false)}
						onfocus={() => (isPaused = true)}
						onblur={() => (isPaused = false)}
						class="flex h-11 w-11 items-center justify-center border border-border-strong bg-surface text-foreground-muted transition-all hover:border-primary hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary"
						aria-label="Next testimonials slide">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
					</button>
				</div>
			{/if}
		</div>

		<!-- 3-Item Row Infinite Carousel with Fixed Card Height and Full A11y & Touch Support -->
		<div
			class="relative overflow-hidden"
			ontouchstart={handleTouchStart}
			ontouchend={handleTouchEnd}
			role="region"
			aria-roledescription="carousel"
			aria-label="Traveler reviews and stories"
			aria-live="polite">
			<div
				class="flex motion-reduce:transition-none"
				class:transition-transform={isTransitioning}
				class:duration-500={isTransitioning}
				class:ease-out={isTransitioning}
				style="transform: translateX(-{currentTrackIndex * 100}%);"
				ontransitionend={handleTransitionEnd}>
				{#each displaySlides as slide, sIdx}
					<div
						class="w-full shrink-0"
						role="group"
						aria-roledescription="slide"
						aria-label={`Slide ${sIdx + 1} of ${displaySlides.length}`}>
						<div class="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
							{#each slide as item}
								<TestimonialCard
									testimonial={item}
									class="border border-border/90 bg-surface shadow-sm transition-shadow hover:shadow-md" />
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Dots indicator -->
		{#if totalRealSlides > 1}
			<div
				class="mt-8 flex justify-center gap-1.5"
				role="tablist"
				aria-label="Testimonial slides">
				{#each baseSlides.slice(0, Math.min(totalRealSlides, 12)) as _, idx}
					<button
						type="button"
						role="tab"
						aria-selected={activeDotIndex === idx}
						aria-label={`Go to review group ${idx + 1}`}
						onclick={() => goToSlide(idx)}
						class={`h-1.5 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-primary ${
							activeDotIndex === idx
								? 'w-6 bg-secondary'
								: 'w-2 bg-border-strong hover:bg-foreground-subtle'
						}`}></button>
				{/each}
			</div>
		{/if}
	</div>
</section>
