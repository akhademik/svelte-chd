<script lang="ts">
	import { page } from '$app/state'
	import { PortableText } from '@portabletext/svelte'
	import LL, { locale } from '$i18n/i18n-svelte'
	import { booking_modal } from '$lib/stores/booking-store'
	import type { Tour } from '$lib/types/tour.type'
	import { get_tour_slug, url_for } from '$utils/sanity'

	interface Props {
		tour: Tour
	}

	let { tour }: Props = $props()

	let img_cover = $derived(tour.img_cover)
	let tour_duration = $derived(tour.tour_duration)
	let tour_name = $derived(tour.tour_name)
	let tour_intro = $derived(tour.tour_intro)
	let title = $derived(tour_name?.[$locale] || tour_name?.en || 'Tour')

	let tourType = $derived(
		page.params.tourtype ||
			(tour.tour_duration?.vn?.includes('ngày') ||
			tour.tour_duration?.en?.includes('day') ||
			tour.tour_duration?.en?.includes('Day')
				? 'day-tours'
				: 'highland-tours')
	)

	let slug = $derived(get_tour_slug(tour, $locale) || tour.tour_id || '')
	let tourLink = $derived(`/${$locale}/${tourType}/${slug}`)
</script>

<article
	class="group flex h-full w-full flex-col justify-between border border-stone-200/90 bg-sand-card shadow-sm transition-all duration-300 hover:border-stone-400 hover:shadow-xl">
	<div>
		<!-- Tour Cover Image (Link to dedicated Tour page) -->
		<a
			href={tourLink}
			class="relative block aspect-[16/11] overflow-hidden bg-stone-100">
			{#if img_cover?.asset}
				<img
					src={url_for(img_cover).width(600).height(412).auto('format').quality(75).url()}
					alt={img_cover.caption || title}
					class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
					loading="lazy" />
			{/if}
			{#if tour.tour_id}
				<span
					class="absolute left-3 top-3 bg-stone-900/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-100 backdrop-blur-sm">
					{tour.tour_id}
				</span>
			{/if}
		</a>

		<!-- Tour Content -->
		<div class="p-5 sm:p-6">
			<div
				class="mb-2.5 flex items-center gap-2.5 text-xs font-light tracking-wider text-stone-400">
				{#if tour_duration?.[$locale]}
					<span class="flex items-center gap-1.5 text-stone-600">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-3.5 w-3.5 text-stone-400"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round">
							<circle
								cx="12"
								cy="12"
								r="10"></circle>
							<polyline points="12 6 12 12 16 14"></polyline>
						</svg>
						<span>{tour_duration[$locale]}</span>
					</span>
					<span>•</span>
				{/if}
				<span class="text-stone-500">
					{$locale === 'vn' ? 'Thư thái' : $locale === 'fr' ? 'Détendu' : 'Relaxed'}
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
				class="mb-2 line-clamp-3 h-14 overflow-hidden text-xs font-light leading-relaxed text-stone-600">
				<PortableText
					value={tour_intro?.[$locale] || []}
					components={{}} />
			</div>
		</div>
	</div>

	<!-- Card Footer -->
	<div
		class="flex items-center justify-between border-t border-stone-100 bg-stone-50/50 px-5 py-3.5 sm:px-6">
		<a
			href={tourLink}
			class="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-700 transition-colors hover:text-stone-950">
			<span>{$LL.tours.click_detail()}</span>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-3.5 w-3.5"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round">
				<line
					x1="5"
					y1="12"
					x2="19"
					y2="12"></line>
				<polyline points="12 5 19 12 12 19"></polyline>
			</svg>
		</a>
		<button
			onclick={() => booking_modal.open(title)}
			class="bg-stone-900 px-4 py-2 text-xs font-medium uppercase tracking-wider text-stone-50 transition-colors hover:bg-stone-800">
			{$locale === 'vn' ? 'Đặt Tour' : 'Book Tour'}
		</button>
	</div>
</article>
