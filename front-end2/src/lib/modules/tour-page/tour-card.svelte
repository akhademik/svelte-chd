<script lang="ts">
	import { PortableText } from '@portabletext/svelte'
	import { page } from '$app/stores'
	import LL, { locale } from '$i18n/i18n-svelte'
	import { booking_modal } from '$lib/stores/booking-store'
	import type { Tour } from '$lib/types/tour.type'
	import { format_price } from '$utils/format-data'
	import { get_tour_slug, url_for } from '$utils/sanity'

	interface Props {
		tour: Tour
	}

	let { tour }: Props = $props()

	let img_cover = $derived(tour.img_cover)
	let tour_duration = $derived(tour.tour_duration)
	let tour_name = $derived(tour.tour_name)
	let tour_intro = $derived(tour.tour_intro)
	let tour_price = $derived(tour.tour_price)
	let slug = $derived(get_tour_slug(tour, $locale))
	let detail_href = $derived(`/${$locale}/${$page.params.tourtype || 'day-tours'}/${slug}`)
	let title = $derived(tour_name?.[$locale] || tour_name?.en || 'Tour')
</script>

<div
	class="group flex h-full w-full flex-col justify-between border border-stone-200/80 bg-white p-5 transition-all duration-300 hover:border-stone-400">
	<div class="flex flex-1 flex-col">
		<div class="relative mb-5 aspect-[4/3] overflow-hidden bg-stone-100">
			{#if img_cover?.asset}
				<img
					src={url_for(img_cover).width(600).height(450).auto('format').quality(75).url()}
					alt={img_cover.caption || title}
					class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
					loading="lazy" />
			{/if}
			{#if tour_duration?.[$locale]}
				<span
					class="absolute left-3 top-3 bg-stone-900/80 px-2.5 py-1 text-[10px] uppercase tracking-wider text-stone-100 backdrop-blur-sm">
					{tour_duration[$locale]}
				</span>
			{/if}
		</div>

		<div class="flex flex-1 flex-col">
			<h3
				class="mb-2 line-clamp-2 min-h-[3.5rem] font-serif text-xl text-stone-900 transition-colors group-hover:text-terracotta">
				<a href={detail_href}>{title}</a>
			</h3>
			<div class="mb-6 line-clamp-3 text-xs font-light leading-relaxed text-stone-500">
				<PortableText
					value={tour_intro?.[$locale] || []}
					components={{}} />
			</div>
		</div>
	</div>

	<div class="flex items-center justify-between border-t border-stone-100 pt-4">
		<div>
			<span class="block text-[10px] uppercase tracking-wider text-stone-400">
				{$LL.tours.price_from()}
			</span>
			<span class="text-sm font-medium text-stone-900">
				{format_price(tour_price?.pax2 || tour_price?.pax1 || 0, $locale)}
				<span class="text-xs font-normal text-stone-400">/ pax</span>
			</span>
		</div>

		<div class="flex items-center gap-3">
			<a
				href={detail_href}
				class="text-xs font-medium uppercase tracking-wider text-stone-500 transition-colors hover:text-stone-900">
				{$LL.tours.click_detail()}
			</a>
			<button
				onclick={() => booking_modal.open(title)}
				class="flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-stone-900 transition-colors hover:text-terracotta">
				Book
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
						x1="7"
						y1="17"
						x2="17"
						y2="7"></line>
					<polyline points="7 7 17 7 17 17"></polyline>
				</svg>
			</button>
		</div>
	</div>
</div>
