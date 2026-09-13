<script lang="ts">
	import { pushState, replaceState } from '$app/navigation'
	import { page } from '$app/stores'
	import LL, { locale } from '$i18n/i18n-svelte'
	import type { Locales } from '$i18n/i18n-types'
	import { BaseJsonLd } from '$base'
	import { booking_modal } from '$lib/stores/booking-store'
	import { tour_modal } from '$lib/stores/modal-store'
	import {
		format_price_object,
		get_category_slug,
		resolve_canonical_category,
		type CanonicalTourCategory,
	} from '$lib/utils/format-data'
	import { get_tour_slug } from '$lib/utils/sanity'
	import { fade, scale } from 'svelte/transition'

	import TourDetailCta from './tour-detail-cta.svelte'
	import TourDetailGallery from './tour-detail-gallery.svelte'
	import TourDetailGoodToKnow from './tour-detail-good-to-know.svelte'
	import TourDetailHeader from './tour-detail-header.svelte'
	import TourDetailHighlights from './tour-detail-highlights.svelte'
	import TourDetailInclusions from './tour-detail-inclusions.svelte'
	import TourDetailIntro from './tour-detail-intro.svelte'
	import TourDetailItinerary from './tour-detail-itinerary.svelte'
	import TourDetailPricingTable from './tour-detail-pricing-table.svelte'
	import TourDetailSummary from './tour-detail-summary.svelte'

	let isOpen = $derived($tour_modal.isOpen)
	let tour = $derived($tour_modal.tour)
	let activeLang = $derived(($page.params.lang as Locales) || $locale || 'en')

	let title = $derived(tour?.tour_name?.[activeLang] || tour?.tour_name?.en || 'Tour')
	let duration = $derived(tour?.tour_duration?.[activeLang] || tour?.tour_duration?.en || '')
	let prices = $derived(tour ? format_price_object(tour) : [])
	let minPrice = $derived(tour?.tour_price?.pax2 || tour?.tour_price?.pax1 || 0)
	let isContactForPrice = $derived(Boolean(tour?.contact_for_price || prices.length === 0))

	let levelText = $derived.by(() => {
		const lvl = tour?.tour_level || 'easy'
		if (lvl === 'hard') return $LL.tours.trip_facts.difficulty_hard()
		if (lvl === 'medium') return $LL.tours.trip_facts.difficulty_medium()
		return $LL.tours.trip_facts.difficulty_easy()
	})

	let imgCover = $derived(tour?.img_cover)
	let imgTour = $derived(tour?.img_tour || [])

	let canonicalCategory = $derived<CanonicalTourCategory>(
		resolve_canonical_category($page.params.tourtype) ||
			(tour?._type === 'tourCentral' ? 'highland-tours' : 'day-tours')
	)

	let localizedCategorySlug = $derived(get_category_slug(canonicalCategory, activeLang))
	let tourSlug = $derived(tour ? get_tour_slug(tour, activeLang) || tour.tour_id || '' : '')

	let allImages = $derived.by(() => {
		const imgs: any[] = []
		if (imgCover?.asset) imgs.push(imgCover)
		if (imgTour?.length) {
			imgTour.forEach((img: any) => {
				if (img?.asset) imgs.push(img)
			})
		}
		return imgs
	})

	let previousPath = $state('')

	$effect(() => {
		if (isOpen && tour) {
			if (typeof document !== 'undefined') {
				document.body.style.overflow = 'hidden'
			}

			if (typeof window !== 'undefined') {
				previousPath = window.location.pathname + window.location.search
				const currentCatSlug = get_category_slug(canonicalCategory, activeLang)
				const currentTourSlug = get_tour_slug(tour, activeLang) || tour.tour_id || ''
				if (currentTourSlug && !window.location.pathname.includes(currentTourSlug)) {
					pushState(`/${activeLang}/${currentCatSlug}/${currentTourSlug}`, { modal: true })
				}
			}

			return () => {
				if (typeof document !== 'undefined') {
					document.body.style.overflow = ''
				}
				if (typeof window !== 'undefined' && previousPath) {
					replaceState(previousPath, {})
				}
			}
		}
	})

	const close = () => {
		tour_modal.close()
	}

	const handleBook = () => {
		if (tour) {
			const tourTitle = title
			close()
			booking_modal.open(tourTitle)
		}
	}

	const handleModalKeydown = (e: KeyboardEvent) => {
		if (!isOpen) return
		if (e.key === 'Escape') {
			close()
		}
	}
</script>

<svelte:window onkeydown={handleModalKeydown} />

{#if isOpen && tour}
	<BaseJsonLd
		{tour}
		url={`https://chd.travel/${activeLang}/${localizedCategorySlug}/${tourSlug}`}
		breadcrumbs={[
			{ name: $LL.nav_bar.home(), item: `https://chd.travel/${activeLang}` },
			{
				name:
					canonicalCategory === 'day-tours'
						? $LL.nav_bar.day_tours()
						: $LL.nav_bar.highland_tours(),
				item: `https://chd.travel/${activeLang}/${localizedCategorySlug}`,
			},
			{
				name: title,
				item: `https://chd.travel/${activeLang}/${localizedCategorySlug}/${tourSlug}`,
			},
		]} />
	<div
		transition:fade={{ duration: 200 }}
		class="fixed inset-0 z-[60] flex items-center justify-center bg-inverse-dark/60 p-0 backdrop-blur-sm sm:p-4 md:p-6"
		role="dialog"
		aria-modal="true"
		aria-labelledby="modal-tour-title">
		<button
			type="button"
			class="fixed inset-0 h-full w-full cursor-default bg-transparent focus:outline-none"
			aria-label="Close modal overlay"
			onclick={close}
			tabindex="-1"></button>
		<div
			transition:scale={{ start: 0.96, duration: 200 }}
			class="relative z-10 flex h-full max-h-screen w-full max-w-5xl flex-col overflow-hidden rounded-none border-0 bg-surface text-foreground shadow-2xl sm:h-auto sm:max-h-[90vh] sm:border sm:border-border">
			{#key activeLang}
				<!-- 1. Modal Header (Sticky top) -->
				<TourDetailHeader
					{tour}
					{duration}
					{levelText}
					onclose={close} />

				<!-- 2. Modal Body (Scrollable - Composed cleanly of Atomic Components) -->
				<div class="space-y-10 overflow-y-auto p-4 sm:p-6 md:p-8">
					<!-- Gallery (Bento Grid & Lightbox) -->
					<TourDetailGallery
						images={allImages}
						{title} />

					<!-- Summary Section: Title, Badges, Tags, Started Price & Book Now CTA -->
					<TourDetailSummary
						{tour}
						{title}
						{duration}
						{levelText}
						{minPrice}
						{isContactForPrice} />

					<!-- Main Body Grid: Intro, Highlights, Pricing, Itinerary, Good To Know, Inclusions, CTA -->
					<div class="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
						<!-- Left Column (Main Content) -->
						<div class="flex flex-col gap-10 lg:col-span-8">
							<TourDetailIntro {tour} />

							<TourDetailHighlights {tour} />

							<!-- Pricing Table (Shown here on Mobile view directly below Highlights) -->
							<div class="block lg:hidden">
								<TourDetailPricingTable
									{tour}
									{title}
									{duration}
									{minPrice}
									{prices}
									{isContactForPrice} />
							</div>

							<TourDetailItinerary {tour} />

							<TourDetailGoodToKnow />
						</div>

						<!-- Right Column (Sidebar on desktop, stacked underneath on mobile) -->
						<div class="flex flex-col gap-10 lg:col-span-4 lg:gap-8">
							<!-- Pricing Table (Shown here on Desktop only) -->
							<div class="hidden lg:block">
								<TourDetailPricingTable
									{tour}
									{title}
									{duration}
									{minPrice}
									{prices}
									{isContactForPrice} />
							</div>

							<!-- Inclusions -->
							<TourDetailInclusions {tour} />

							<!-- Plan Your Journey CTA -->
							<TourDetailCta
								{tour}
								{title}
								{duration} />
						</div>
					</div>
				</div>

				<!-- 3. Modal Footer (Sticky bottom) -->
				<div
					class="sticky bottom-0 z-10 flex items-center justify-end gap-3 border-t border-border bg-surface px-4 py-3.5 sm:px-6 sm:py-4">
					<div class="flex w-full items-center justify-end gap-3 sm:w-auto">
						<button
							type="button"
							onclick={close}
							class="w-1/2 border border-border-strong px-5 py-2.5 text-xs uppercase tracking-wider text-foreground transition-colors hover:border-foreground hover:text-foreground sm:w-auto">
							{$LL.tours.detail.close()}
						</button>
						<button
							type="button"
							onclick={handleBook}
							class="w-1/2 bg-primary px-6 py-2.5 text-xs uppercase tracking-widest text-white shadow-sm transition-colors hover:bg-primary-hover sm:w-auto">
							{$LL.tours.detail.plan_this_trip()}
						</button>
					</div>
				</div>
			{/key}
		</div>
	</div>
{/if}
