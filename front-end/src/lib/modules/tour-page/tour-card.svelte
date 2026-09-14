<script lang="ts">
	import { page } from '$app/state'
	import { PortableText } from '@portabletext/svelte'
	import LL, { locale } from '$i18n/i18n-svelte'
	import { IconArrowRight, IconClock } from '$lib/icons'
	import { bookingModal } from '$lib/stores/booking-store'
	import type { Tour } from '$lib/types/tour.type'
	import {
		getCategorySlug,
		getLocalizedField,
		resolveCanonicalCategory,
		type CanonicalTourCategory,
	} from '$lib/utils/format-data'
	import { urlFor } from '$lib/utils/sanity'
	import { getTourSlug } from '$lib/utils/slug'

	interface Props {
		tour: Tour
	}

	let { tour }: Props = $props()

	let imgCover = $derived(tour.coverImg)
	let tourDuration = $derived(tour.tourDuration)
	let tourName = $derived(tour.tourName)
	let tourIntro = $derived(tour.tourIntro)
	let title = $derived(getLocalizedField(tourName, $locale, 'Tour'))
	let durationText = $derived(getLocalizedField(tourDuration, $locale, ''))

	let canonicalCategory = $derived<CanonicalTourCategory>(
		resolveCanonicalCategory(page.params.tourtype) ||
			(tour._type === 'tourCentral' ? 'highland-tours' : 'day-tours')
	)

	let localizedCategorySlug = $derived(getCategorySlug(canonicalCategory, $locale))
	let slug = $derived(getTourSlug(tour, $locale) || tour.tourId || '')
	let tourLink = $derived(`/${$locale}/${localizedCategorySlug}/${slug}`)
</script>

<article
	class="group flex h-full w-full flex-col justify-between border border-border/90 bg-surface shadow-sm transition-all duration-300 hover:border-border-strong hover:shadow-xl">
	<div>
		<!-- Tour Cover Image (Link to dedicated Tour page) -->
		<a
			href={tourLink}
			class="relative block aspect-[16/11] overflow-hidden bg-surface">
			{#if imgCover?.asset}
				<img
					src={urlFor(imgCover).width(600).height(412).auto('format').quality(75).url()}
					alt={imgCover.caption || title}
					class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
					loading="lazy" />
			{/if}
			{#if tour.tourId}
				<span
					class="absolute left-3 top-3 rounded bg-secondary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
					{tour.tourId}
				</span>
			{/if}
		</a>

		<!-- Tour Content -->
		<div class="p-5 sm:p-6">
			<div
				class="mb-2.5 flex items-center gap-2.5 text-xs font-light tracking-wider text-foreground-subtle">
				{#if durationText}
					<span class="flex items-center gap-1.5 text-foreground-muted">
						<IconClock class="h-3.5 w-3.5 text-foreground-subtle" />
						<span>{durationText}</span>
					</span>
					<span>•</span>
				{/if}
				<span class="text-foreground-muted">
					{$LL.tours.pace_relaxed()}
				</span>
			</div>

			<h3
				class="mb-3 font-serif text-xl font-normal leading-snug text-foreground transition-colors group-hover:text-secondary sm:text-2xl">
				<a
					href={tourLink}
					class="line-clamp-2 h-14 font-serif text-xl font-normal leading-snug text-foreground transition-colors hover:text-secondary sm:text-2xl">
					{title}
				</a>
			</h3>

			<div
				class="mb-2 line-clamp-3 h-14 overflow-hidden text-xs font-light leading-relaxed text-foreground-muted">
				<PortableText
					value={getLocalizedField(tourIntro, $locale, [])}
					components={{}} />
			</div>
		</div>
	</div>

	<!-- Card Footer -->
	<div
		class="flex items-center justify-between border-t border-border bg-surface/50 px-5 py-3.5 sm:px-6">
		<a
			href={tourLink}
			class="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-foreground-muted transition-colors hover:text-foreground">
			<span>{$LL.tours.click_detail()}</span>
			<IconArrowRight class="h-3.5 w-3.5" />
		</a>
		<button
			onclick={() => bookingModal.open(title || 'Tour')}
			class="bg-inverse px-4 py-2 text-xs font-medium uppercase tracking-wider text-inverse-foreground transition-colors hover:bg-inverse-dark">
			{$LL.tours.book_tour_btn()}
		</button>
	</div>
</article>
