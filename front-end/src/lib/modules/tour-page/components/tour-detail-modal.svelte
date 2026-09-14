<script lang="ts">
	import { pushState, replaceState } from '$app/navigation'
	import { page } from '$app/stores'
	import LL, { locale } from '$i18n/i18n-svelte'
	import type { Locales } from '$i18n/i18n-types'
	import { BaseJsonLd } from '$base'
	import { bookingModal } from '$lib/stores/booking-store'
	import { tourModal } from '$lib/stores/modal-store'
	import {
		formatPriceObject,
		getCategorySlug,
		resolveCanonicalCategory,
		type CanonicalTourCategory,
	} from '$lib/utils/format-data'
	import { getTourSlug } from '$lib/utils/slug'
	import { collectGalleryImages } from '$lib/utils/gallery'
	import { fade } from 'svelte/transition'

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

	let isOpen = $derived($tourModal.isOpen)
	let tour = $derived($tourModal.tour)
	let activeLang = $derived(($page.params.lang as Locales) || $locale || 'en')

	let title = $derived(tour?.tour_name?.[activeLang] || tour?.tour_name?.en || 'Tour')
	let duration = $derived(tour?.tour_duration?.[activeLang] || tour?.tour_duration?.en || '')
	let prices = $derived(tour ? formatPriceObject(tour) : [])
	let minPrice = $derived(tour?.tour_price?.pax2 || tour?.tour_price?.pax1 || 0)
	let isContactForPrice = $derived(Boolean(tour?.contact_for_price || prices.length === 0))

	let imgCover = $derived(tour?.img_cover)
	let imgTour = $derived(tour?.img_tour || [])

	let canonicalCategory = $derived<CanonicalTourCategory>(
		resolveCanonicalCategory($page.params.tourtype) ||
			(tour?._type === 'tourCentral' ? 'highland-tours' : 'day-tours')
	)

	let localizedCategorySlug = $derived(getCategorySlug(canonicalCategory, activeLang))
	let tourSlug = $derived(tour ? getTourSlug(tour, activeLang) || tour.tour_id || '' : '')

	let allImages = $derived(
		collectGalleryImages({
			coverImage: imgCover,
			album: imgTour,
		})
	)

	let previousPath = $state('')

	$effect(() => {
		if (isOpen && tour) {
			if (typeof document !== 'undefined') {
				document.body.style.overflow = 'hidden'
			}

			if (typeof window !== 'undefined') {
				previousPath = window.location.pathname + window.location.search
				const currentCatSlug = getCategorySlug(canonicalCategory, activeLang)
				const currentTourSlug = getTourSlug(tour, activeLang) || tour.tour_id || ''
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
		tourModal.close()
	}

	const handleBook = () => {
		if (tour) {
			const tourTitle = title
			close()
			bookingModal.open(tourTitle)
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
	<!-- Fullscreen Modal covering 100vw and 100vh with margin: 0 -->
	<div
		transition:fade={{ duration: 200 }}
		class="fixed inset-0 z-[60] flex h-[100dvh] h-screen w-[100dvw] w-screen flex-col overflow-hidden bg-surface text-foreground"
		role="dialog"
		aria-modal="true"
		aria-labelledby="modal-tour-title">
		{#key activeLang}
			<!-- 1. Modal Header (Sticky top) -->
			<TourDetailHeader
				{tour}
				{duration}
				onclose={close} />

			<!-- 2. Modal Body (Scrollable full-width container) -->
			<div class="flex-1 overflow-y-auto">
				<div class="mx-auto max-w-6xl space-y-10 px-4 py-6 sm:px-6 sm:py-8">
					<!-- Gallery (Bento Grid & Lightbox) -->
					<TourDetailGallery
						images={allImages}
						{title} />

					<!-- Summary Section: Title, Badges, Tags, Started Price & Book Now CTA -->
					<TourDetailSummary
						{tour}
						{title}
						{duration}
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

							<TourDetailGoodToKnow {tour} />
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
			</div>

			<!-- 3. Modal Footer (Sticky bottom) -->
			<div
				class="sticky bottom-0 z-10 flex shrink-0 items-center justify-end gap-3 border-t border-border bg-surface px-4 py-3.5 sm:px-6 sm:py-4">
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
{/if}
