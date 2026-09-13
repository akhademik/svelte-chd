<script lang="ts">
	import LL, { locale } from '$i18n/i18n-svelte'
	import type { Tour } from '$lib/types/tour.type'
	import { format_price_object } from '$lib/utils/format-data'
	import TourDetailBreadcrumbs from './components/tour-detail-breadcrumbs.svelte'
	import TourDetailCta from './components/tour-detail-cta.svelte'
	import TourDetailGallery from './components/tour-detail-gallery.svelte'
	import TourDetailGoodToKnow from './components/tour-detail-good-to-know.svelte'
	import TourDetailHighlights from './components/tour-detail-highlights.svelte'
	import TourDetailInclusions from './components/tour-detail-inclusions.svelte'
	import TourDetailIntro from './components/tour-detail-intro.svelte'
	import TourDetailItinerary from './components/tour-detail-itinerary.svelte'
	import TourDetailPricingTable from './components/tour-detail-pricing-table.svelte'
	import TourDetailSummary from './components/tour-detail-summary.svelte'

	interface Props {
		tour: Tour
		allTours?: Tour[]
	}

	let { tour }: Props = $props()

	let title = $derived(tour.tour_name?.[$locale] || tour.tour_name?.en || 'Tour')
	let duration = $derived(tour.tour_duration?.[$locale] || tour.tour_duration?.en || '')
	let prices = $derived(format_price_object(tour))
	let minPrice = $derived(
		tour.tour_price?.pax2 || tour.tour_price?.pax1 || tour.tour_price?.price || 0
	)
	let isContactForPrice = $derived(Boolean(tour.contact_for_price || prices.length === 0))

	let levelText = $derived.by(() => {
		const lvl = tour.tour_level || 'easy'
		if (lvl === 'hard') return $LL.tours.trip_facts.difficulty_hard()
		if (lvl === 'medium') return $LL.tours.trip_facts.difficulty_medium()
		return $LL.tours.trip_facts.difficulty_easy()
	})

	let allImages = $derived.by(() => {
		const imgs: any[] = []
		if (tour.img_cover?.asset) imgs.push(tour.img_cover)
		if (tour.img_tour?.length) {
			tour.img_tour.forEach((img: any) => {
				if (img?.asset) imgs.push(img)
			})
		}
		return imgs
	})

	let tourType = $derived(tour._type === 'tourCentral' ? 'highland-tours' : 'day-tours')
</script>

<div class="space-y-10 pb-24">
	<!-- 1. Top Breadcrumb Navigation -->
	<TourDetailBreadcrumbs
		{tourType}
		{title} />

	<div class="mx-auto max-w-6xl space-y-10 px-6">
		<!-- 2. Gallery (Up Most - Bento Grid & Fullscreen Lightbox) -->
		<TourDetailGallery
			images={allImages}
			{title} />

		<!-- 3. Tour Name, Badges, Tags & Started Price + Book Now CTA -->
		<TourDetailSummary
			{tour}
			{title}
			{duration}
			{levelText}
			{minPrice}
			{isContactForPrice} />

		<!-- 4. Main Body: Intro, Highlights, Pricing, Itinerary, Good to know, Inclusions, CTA -->
		<div class="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
			<!-- Left Column: Intro, Highlights, Mobile Pricing Table, Itinerary, Good to know -->
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

			<!-- Right Column (Sidebar on desktop, stacked underneath on mobile): Pricing Table (desktop only), Inclusions, Plan Your Journey CTA -->
			<div class="flex flex-col gap-10 lg:col-span-4 lg:gap-8">
				<!-- Pricing Table (Shown here on Desktop only; on Mobile it is positioned under Highlights in Left Column) -->
				<div class="hidden lg:block">
					<TourDetailPricingTable
						{tour}
						{title}
						{duration}
						{minPrice}
						{prices}
						{isContactForPrice} />
				</div>

				<!-- Inclusions (Shown on both Mobile & Desktop below Tour Detail content) -->
				<TourDetailInclusions {tour} />

				<!-- Plan Your Journey CTA (Shown on both Mobile & Desktop below Inclusions) -->
				<TourDetailCta
					{tour}
					{title}
					{duration} />
			</div>
		</div>
	</div>
</div>
