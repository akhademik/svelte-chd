<script lang="ts">
	import { locale } from '$i18n/i18n-svelte'
	import LL from '$i18n/i18n-svelte'
	import type { Testimonial } from '$lib/types/testimonial.type'
	import { format_review_date } from '$lib/utils/format-data'
	import { onMount, untrack } from 'svelte'

	interface Props {
		testimonials?: Testimonial[]
	}

	let { testimonials = [] }: Props = $props()

	const PAGE_SIZE = 3

	function getSlides(rawList: Testimonial[]) {
		const list = rawList && rawList.length > 0 ? rawList : []
		const items = list.map(t => ({
			quote: t.review_content,
			title: t.review_title,
			authorName: t.name,
			authorAvatar: t.avatar || '',
			authorLocation: t.country || '',
			rating: t.stars || 5,
			sourceUrl: t.url,
			date: t.date_review || '',
		}))
		const slides: (typeof items)[] = []
		for (let i = 0; i < items.length; i += PAGE_SIZE) {
			slides.push(items.slice(i, i + PAGE_SIZE))
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
								<article
									class="flex min-h-[220px] flex-col justify-between border border-border/90 bg-surface p-5 shadow-sm transition-shadow hover:shadow-md sm:h-[360px] sm:p-8">
									<div class="overflow-hidden">
										<!-- Header: Rating (Always 5 stars with active/dimmed) & Date ({Month} {Year}) -->
										<div class="mb-3 flex items-center justify-between sm:mb-4">
											<div
												class="flex items-center gap-1"
												role="img"
												aria-label={`${item.rating || 5} out of 5 stars`}>
												{#each [1, 2, 3, 4, 5] as starNum}
													<svg
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 20 20"
														fill="currentColor"
														class={`h-4 w-4 ${starNum <= (item.rating || 5) ? 'text-amber-600' : 'text-stone-300'}`}>
														<path
															fill-rule="evenodd"
															d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
															clip-rule="evenodd" />
													</svg>
												{/each}
											</div>

											{#if item.date}
												<span class="font-mono text-xs text-foreground-subtle">
													{format_review_date(item.date, $locale)}
												</span>
											{/if}
										</div>

										<!-- Review Title: Link to TripAdvisor -->
										{#if item.title}
											<h3 class="mb-2 line-clamp-2 font-serif text-base font-bold text-foreground">
												{#if item.sourceUrl}
													<a
														href={item.sourceUrl}
														target="_blank"
														rel="noopener noreferrer"
														class="transition-colors hover:text-secondary hover:underline">
														{item.title}
													</a>
												{:else}
													{item.title}
												{/if}
											</h3>
										{/if}

										<!-- Review Content with flexible line clamp -->
										<p
											class="line-clamp-4 font-serif text-sm font-light italic leading-relaxed text-stone-700 sm:line-clamp-5">
											"{item.quote}"
										</p>
									</div>

									<!-- Author Footer: [Avatar] [Username] -->
									<div
										class="mt-3 flex items-center justify-between border-t border-border/60 pt-3 text-xs sm:mt-4 sm:pt-4">
										<div class="flex items-center gap-2.5 overflow-hidden">
											{#if item.authorAvatar}
												<img
													src={item.authorAvatar}
													alt={item.authorName}
													class="h-7 w-7 shrink-0 rounded-full border border-border object-cover"
													loading="lazy" />
											{:else}
												<div
													class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface-muted font-serif text-xs font-bold text-foreground-muted">
													{item.authorName.charAt(0).toUpperCase()}
												</div>
											{/if}
											<span class="truncate font-serif font-bold text-foreground">
												{item.authorName}
											</span>
										</div>
										{#if item.authorLocation}
											<div class="shrink-0 text-foreground-muted">{item.authorLocation}</div>
										{/if}
									</div>
								</article>
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
								: 'w-2 bg-border-strong hover:bg-stone-400'
						}`}></button>
				{/each}
			</div>
		{/if}
	</div>
</section>
