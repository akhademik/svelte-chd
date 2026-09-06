<script lang="ts">
	import { locale } from '$i18n/i18n-svelte'
	import LL from '$i18n/i18n-svelte'
	import defaultTestimonials from '$lib/constants/testimonials.json'
	import type { Testimonial } from '$lib/types/testimonial.type'
	import { format_review_date } from '$lib/utils/format-data'
	import { onMount, untrack } from 'svelte'

	interface Props {
		testimonials?: Testimonial[]
	}

	let { testimonials = defaultTestimonials }: Props = $props()

	const PAGE_SIZE = 3

	function getSlides(rawList: Testimonial[]) {
		const list = rawList && rawList.length > 0 ? rawList : defaultTestimonials
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
	let isHovered = $state(false)

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

	onMount(() => {
		const interval = setInterval(() => {
			if (!isHovered && untrack(() => totalRealSlides) > 1) {
				nextSlide()
			}
		}, 7000)

		return () => clearInterval(interval)
	})
</script>

<section class="sm:py-18 border-b border-stone-200 px-6 py-14">
	<div class="mx-auto max-w-6xl">
		<div
			class="mb-10 flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
			<div>
				<span class="text-xs font-semibold uppercase tracking-[0.25em] text-terracotta">
					{$LL.home_page.testimonials.subtitle()}
				</span>
				<h2 class="mt-2 font-serif text-3xl font-bold text-moss sm:text-4xl">
					{$LL.home_page.testimonials.title()}
				</h2>
				<p class="mt-2 max-w-lg text-sm font-light text-stone-500">
					{$LL.home_page.testimonials.desc()}
				</p>
			</div>

			{#if totalRealSlides > 1}
				<!-- Carousel Controls (Hovering stops auto-advance) -->
				<div class="flex items-center gap-3">
					<button
						type="button"
						onclick={prevSlide}
						onmouseenter={() => (isHovered = true)}
						onmouseleave={() => (isHovered = false)}
						class="flex h-11 w-11 items-center justify-center border border-stone-300 bg-sand-card text-stone-700 transition-all hover:border-moss hover:bg-moss hover:text-white"
						aria-label="Previous testimonials">
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
						onmouseenter={() => (isHovered = true)}
						onmouseleave={() => (isHovered = false)}
						class="flex h-11 w-11 items-center justify-center border border-stone-300 bg-sand-card text-stone-700 transition-all hover:border-moss hover:bg-moss hover:text-white"
						aria-label="Next testimonials">
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

		<!-- 3-Item Row Infinite Carousel with Fixed Card Height -->
		<div
			class="relative overflow-hidden"
			onmouseenter={() => (isHovered = true)}
			onmouseleave={() => (isHovered = false)}
			role="region"
			aria-label="Testimonials carousel">
			<div
				class="flex"
				class:transition-transform={isTransitioning}
				class:duration-500={isTransitioning}
				class:ease-out={isTransitioning}
				style="transform: translateX(-{currentTrackIndex * 100}%);"
				ontransitionend={handleTransitionEnd}>
				{#each displaySlides as slide}
					<div class="w-full shrink-0">
						<div class="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
							{#each slide as item}
								<article
									class="flex h-[360px] flex-col justify-between border border-stone-200/90 bg-sand-card p-6 shadow-sm transition-shadow hover:shadow-md sm:p-8">
									<div class="overflow-hidden">
										<!-- Header: Rating (Always 5 stars with active/dimmed) & Date ({Month} {Year}) -->
										<div class="mb-4 flex items-center justify-between">
											<div class="flex items-center gap-1">
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
												<span class="font-mono text-xs text-stone-400">
													{format_review_date(item.date, $locale)}
												</span>
											{/if}
										</div>

										<!-- Review Title: Link to TripAdvisor -->
										{#if item.title}
											<h3 class="mb-2 line-clamp-2 font-serif text-base font-bold text-stone-900">
												{#if item.sourceUrl}
													<a
														href={item.sourceUrl}
														target="_blank"
														rel="noopener noreferrer"
														class="transition-colors hover:text-terracotta hover:underline">
														{item.title}
													</a>
												{:else}
													{item.title}
												{/if}
											</h3>
										{/if}

										<!-- Review Content with fixed clamp -->
										<p
											class="line-clamp-4 font-serif text-sm font-light italic leading-relaxed text-stone-700 sm:line-clamp-5">
											"{item.quote}"
										</p>
									</div>

									<!-- Author Footer: [Avatar] [Username] -->
									<div
										class="mt-4 flex items-center justify-between border-t border-stone-200/60 pt-4 text-xs">
										<div class="flex items-center gap-2.5 overflow-hidden">
											{#if item.authorAvatar}
												<img
													src={item.authorAvatar}
													alt={item.authorName}
													class="h-7 w-7 shrink-0 rounded-full border border-stone-200 object-cover"
													loading="lazy" />
											{:else}
												<div
													class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-stone-200 font-serif text-xs font-bold text-stone-700">
													{item.authorName.charAt(0).toUpperCase()}
												</div>
											{/if}
											<span class="truncate font-serif font-bold text-stone-900">
												{item.authorName}
											</span>
										</div>
										{#if item.authorLocation}
											<div class="shrink-0 text-stone-500">{item.authorLocation}</div>
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
			<div class="mt-8 flex justify-center gap-1.5">
				{#each baseSlides.slice(0, Math.min(totalRealSlides, 12)) as _, idx}
					<button
						type="button"
						onclick={() => goToSlide(idx)}
						class={`h-1.5 rounded-full transition-all ${
							activeDotIndex === idx ? 'w-6 bg-terracotta' : 'w-2 bg-stone-300 hover:bg-stone-400'
						}`}
						aria-label={`Go to slide ${idx + 1}`}></button>
				{/each}
			</div>
		{/if}
	</div>
</section>
