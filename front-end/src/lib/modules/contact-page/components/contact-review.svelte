<script lang="ts">
	import { locale } from '$i18n/i18n-svelte'
	import type { Testimonial } from '$lib/types/testimonial.type'
	import { format_review_date } from '$lib/utils/format-data'
	import { onMount } from 'svelte'

	interface Props {
		testimonials?: Testimonial[]
	}

	let { testimonials = [] }: Props = $props()

	const list = $derived(
		(testimonials && testimonials.length > 0 ? testimonials : []).map(t => ({
			name: t.name,
			avatar: t.avatar || '',
			country: t.country || 'Verified Traveler',
			title: t.review_title,
			content: t.review_content,
			stars: t.stars || 5,
			url: t.url,
			date: t.date_review || '',
		}))
	)

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
			<div class="flex h-full w-full shrink-0 flex-col justify-between p-5 sm:p-8">
				<div class="overflow-hidden">
					<!-- Top Bar: Stars (Always 5 stars with active/dimmed) + Date ({Month} {Year}) -->
					<div class="mb-3 flex items-center gap-3 pr-20 sm:mb-4">
						<div class="flex items-center gap-1">
							{#each [1, 2, 3, 4, 5] as starNum}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class={`h-4 w-4 fill-current ${starNum <= (currentReview.stars || 5) ? 'text-amber-600' : 'text-border-strong'}`}
									viewBox="0 0 24 24">
									<polygon
										points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
									></polygon>
								</svg>
							{/each}
						</div>

						{#if currentReview.date}
							<span class="font-mono text-xs text-foreground-subtle">
								{format_review_date(currentReview.date, $locale)}
							</span>
						{/if}
					</div>

					<!-- Review Title (With link) -->
					{#if currentReview.title}
						<h4 class="mb-2 line-clamp-1 font-serif text-base font-bold text-foreground">
							{#if currentReview.url}
								<a
									href={currentReview.url}
									target="_blank"
									rel="noopener noreferrer"
									class="transition-colors hover:text-secondary hover:underline">
									{currentReview.title}
								</a>
							{:else}
								{currentReview.title}
							{/if}
						</h4>
					{/if}

					<!-- Review Content -->
					<p
						class="line-clamp-4 font-serif text-sm font-light italic leading-relaxed text-foreground-muted sm:line-clamp-5 sm:text-base">
						"{currentReview.content}"
					</p>
				</div>

				<!-- Review Author Footer: [Avatar] [Username] [Country] -->
				<div
					class="mt-3 flex items-center justify-between border-t border-border/80 pt-3 text-xs sm:mt-4 sm:pt-4">
					<div class="flex items-center gap-2.5 overflow-hidden">
						{#if currentReview.avatar}
							<img
								src={currentReview.avatar}
								alt={currentReview.name}
								class="h-7 w-7 shrink-0 rounded-full border border-border object-cover"
								loading="lazy" />
						{:else}
							<div
								class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface-muted font-serif text-xs font-bold text-foreground-muted">
								{currentReview.name.charAt(0).toUpperCase()}
							</div>
						{/if}
						<span class="truncate font-serif font-bold text-foreground">
							{currentReview.name}
						</span>
					</div>
					{#if currentReview.country}
						<div class="shrink-0 text-foreground-muted">{currentReview.country}</div>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</div>
