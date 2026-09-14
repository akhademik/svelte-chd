<script lang="ts">
	import LL, { locale } from '$i18n/i18n-svelte'
	import { IconChevronLeft, IconChevronRight, IconStar } from '$lib/icons'
	import { bookingModal } from '$lib/stores/booking-store'
	import type { Tour } from '$lib/types/tour.type'
	import {
		formatPrice,
		getCategorySlug,
		getLocalizedField,
		hasLocalizedTitle,
		type CanonicalTourCategory,
	} from '$lib/utils/format-data'
	import { urlFor } from '$lib/utils/sanity'
	import { getTourSlug } from '$lib/utils/slug'
	import { untrack } from 'svelte'
	import { fade } from 'svelte/transition'

	interface Props {
		tours: Tour[]
	}

	let { tours }: Props = $props()

	let hotTours = $derived(tours.filter(t => t.best_sell && hasLocalizedTitle(t, $locale)))
	let currentIndex = $state(0)

	const nextSlide = () => {
		const len = untrack(() => hotTours.length)
		if (len > 0) {
			currentIndex = (currentIndex + 1) % len
		}
	}

	const prevSlide = () => {
		const len = untrack(() => hotTours.length)
		if (len > 0) {
			currentIndex = (currentIndex - 1 + len) % len
		}
	}

	const handleKeydown = (e: KeyboardEvent) => {
		if (e.key === 'ArrowRight') {
			nextSlide()
		} else if (e.key === 'ArrowLeft') {
			prevSlide()
		}
	}

	$effect(() => {
		if (hotTours.length > 1) {
			const interval = setInterval(nextSlide, 7000)
			return () => clearInterval(interval)
		}
	})

	let currentTour = $derived(hotTours[currentIndex])
	let title = $derived(getLocalizedField(currentTour?.tourName, $locale, 'Featured Tour'))
	let price = $derived(currentTour?.tourPrice?.pax2 || currentTour?.tourPrice?.pax1 || 0)
	let duration = $derived(getLocalizedField(currentTour?.tourDuration, $locale, 'Full Day'))

	let canonicalCategory = $derived<CanonicalTourCategory>(
		currentTour?._type === 'tourCentral' ? 'highland-tours' : 'day-tours'
	)

	let localizedCategorySlug = $derived(getCategorySlug(canonicalCategory, $locale))

	let tourLink = $derived(
		currentTour
			? `/${$locale}/${localizedCategorySlug}/${getTourSlug(currentTour, $locale) || currentTour.tourId || ''}`
			: '#'
	)
</script>

<svelte:window onkeydown={handleKeydown} />

{#if hotTours.length > 0 && currentTour}
	<section
		id="featured-tours"
		class="relative overflow-hidden border-b border-border bg-inverse-dark text-inverse-foreground">
		<!-- Background Cover Image with Soft Parallax & Gradient Mask -->
		<div class="absolute inset-0 z-0 overflow-hidden bg-inverse-dark">
			{#key currentIndex}
				{#if currentTour?.coverImg}
					<img
						transition:fade={{ duration: 600 }}
						src={urlFor(currentTour.coverImg)
							.width(1920)
							.height(1080)
							.auto('format')
							.quality(95)
							.url()}
						alt={currentTour.coverImg?.caption || title}
						class="absolute inset-0 h-full w-full object-cover opacity-90 transition-opacity duration-700 md:opacity-90" />
				{/if}
			{/key}
			<!-- Directional gradient mask: Light breathable vertical fade on mobile, side gradient on desktop -->
			<div
				class="absolute inset-0 bg-gradient-to-b from-inverse-dark/65 via-inverse-dark/25 to-inverse-dark/75 lg:bg-gradient-to-r lg:from-inverse-dark/95 lg:via-inverse-dark/70 lg:via-45% lg:to-transparent">
			</div>
			<!-- Subtle ambient top & bottom vignettes (desktop only to keep mobile bright) -->
			<div
				class="pointer-events-none absolute inset-0 hidden bg-gradient-to-t from-inverse-dark/40 via-transparent to-inverse-dark/30 lg:block">
			</div>
		</div>

		<div class="relative z-10 mx-auto max-w-6xl px-6 py-20 lg:py-28">
			<div class="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
				<div class="w-full max-w-2xl">
					<!-- Badge & Header -->
					<div class="mb-4 flex min-h-[1.75rem] flex-wrap items-center gap-2.5 sm:gap-3">
						<span
							class="inline-flex shrink-0 items-center gap-1.5 bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white shadow-md">
							<IconStar class="h-3.5 w-3.5" />
							<span>
								{$LL.tours.featured_badge()}
							</span>
						</span>
						{#if currentTour.tourId}
							<span
								class="shrink-0 border border-inverse-dark bg-inverse/80 px-2.5 py-0.5 font-mono text-xs text-inverse-foreground">
								{currentTour.tourId}
							</span>
						{/if}
						<span class="text-xs uppercase tracking-wider text-foreground-subtle">
							{duration}
						</span>
					</div>

					<!-- Tour Title -->
					<div class="mb-5 flex min-h-[4rem] items-center sm:min-h-[4.5rem] lg:min-h-[5.5rem]">
						<h2
							class="line-clamp-2 font-serif text-xl font-normal leading-snug text-white [text-shadow:_0_2px_8px_rgba(0,0,0,0.85)] sm:text-2xl lg:text-3xl"
							{title}>
							<a
								href={tourLink}
								class="line-clamp-2 text-left font-serif text-white transition-colors hover:text-inverse-foreground">
								{title}
							</a>
						</h2>
					</div>

					<!-- Tour Highlights List -->
					<div class="mb-8 flex h-20 flex-col justify-center space-y-2">
						{#if currentTour.tourHighlights?.length}
							{#each currentTour.tourHighlights.slice(0, 3) as item}
								{@const hlText = getLocalizedField(item?.highlights, $locale, '')}
								{#if hlText}
									<div
										class="flex items-center gap-2.5 text-xs font-light text-inverse-foreground/90 sm:text-sm">
										<span class="h-1.5 w-1.5 shrink-0 rounded-full bg-secondary"></span>
										<span class="line-clamp-1">{hlText}</span>
									</div>
								{/if}
							{/each}
						{/if}
					</div>

					<!-- Action Buttons (Link directly to dedicated Tour Page) -->
					<div class="flex flex-wrap items-center gap-4">
						<a
							href={tourLink}
							class="bg-surface px-7 py-3.5 text-xs font-semibold uppercase tracking-widest text-foreground transition-colors hover:bg-surface-muted">
							{$LL.tours.view_details()}
						</a>
						<button
							onclick={() => bookingModal.open(title || 'Tour')}
							class="border border-border-strong px-7 py-3.5 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:border-white hover:bg-white/10">
							{$LL.tours.book_now_btn()}
						</button>
					</div>
				</div>

				<!-- Price & Slide Navigation -->
				<div
					class="flex flex-col justify-between self-stretch border-t border-inverse pt-6 lg:items-end lg:border-t-0 lg:pt-0">
					<div class="lg:text-right">
						{#if currentTour?.contactForPrice || price === 0}
							<span class="block text-xs uppercase tracking-widest text-foreground-subtle">
								{$LL.tours.detail.price()}
							</span>
							<div class="mt-1 flex items-baseline gap-1 lg:justify-end">
								<span class="font-serif text-2xl font-normal text-white sm:text-3xl">
									{$LL.tours.detail.contact_for_price()}
								</span>
							</div>
						{:else}
							<span class="block text-xs uppercase tracking-widest text-foreground-subtle">
								{$LL.tours.price_starting_from()}
							</span>
							<div class="mt-1 flex items-baseline gap-1 lg:justify-end">
								<span class="font-serif text-3xl font-normal text-white sm:text-4xl">
									{formatPrice(price, $locale)}
								</span>
								<span class="text-xs font-light text-foreground-subtle"
									>/ {$LL.tours.detail.pax()}</span>
							</div>
							<div class="mt-0.5 text-[11px] font-light text-foreground-subtle lg:text-right">
								{$LL.tours.detail.price_for_2_pax()}
							</div>
						{/if}
					</div>

					{#if hotTours.length > 1}
						<div class="mt-8 flex items-center gap-3">
							<button
								type="button"
								onclick={prevSlide}
								class="flex h-11 w-11 items-center justify-center border border-inverse-dark bg-inverse/80 text-inverse-foreground transition-colors hover:border-white hover:text-white"
								aria-label="Previous featured tour">
								<IconChevronLeft class="h-4 w-4" />
							</button>

							<div class="flex gap-1.5 px-2">
								{#each hotTours as _, idx}
									<button
										type="button"
										onclick={() => (currentIndex = idx)}
										class={`h-1.5 rounded-full transition-all ${
											currentIndex === idx
												? 'w-6 bg-secondary'
												: 'w-2 bg-inverse-dark hover:bg-foreground-subtle'
										}`}
										aria-label={`Go to slide ${idx + 1}`}></button>
								{/each}
							</div>

							<button
								type="button"
								onclick={nextSlide}
								class="flex h-11 w-11 items-center justify-center border border-inverse-dark bg-inverse/80 text-inverse-foreground transition-colors hover:border-white hover:text-white"
								aria-label="Next featured tour">
								<IconChevronRight class="h-4 w-4" />
							</button>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</section>
{/if}
