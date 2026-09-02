<script lang="ts">
	import { PortableText } from '@portabletext/svelte'
	import LL, { locale } from '$i18n/i18n-svelte'
	import { booking_modal } from '$lib/stores/booking-store'
	import { tour_modal } from '$lib/stores/modal-store'
	import type { Tour } from '$lib/types/tour.type'
	import { format_price } from '$utils/format-data'
	import { url_for } from '$utils/sanity'

	interface Props {
		tour: Tour
	}

	let { tour }: Props = $props()

	let img_cover = $derived(tour.img_cover)
	let tour_duration = $derived(tour.tour_duration)
	let tour_name = $derived(tour.tour_name)
	let tour_intro = $derived(tour.tour_intro)
	let tour_price = $derived(tour.tour_price)
	let title = $derived(tour_name?.[$locale] || tour_name?.en || 'Tour')
</script>

<article
	class="group flex h-full w-full flex-col justify-between border border-stone-200/90 bg-white shadow-sm transition-all duration-300 hover:border-stone-400 hover:shadow-xl">
	<div>
		<!-- Tour Cover Image (Click to open Modal) -->
		<div
			class="relative aspect-[16/11] cursor-pointer overflow-hidden bg-stone-100"
			role="button"
			tabindex="0"
			onclick={() => tour_modal.open(tour)}
			onkeydown={e => e.key === 'Enter' && tour_modal.open(tour)}>
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
		</div>

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
				class="mb-3 line-clamp-2 min-h-[3.5rem] font-serif text-xl font-normal leading-snug text-stone-950 transition-colors group-hover:text-terracotta sm:text-2xl">
				<button
					type="button"
					class="text-left font-serif text-xl font-normal leading-snug text-stone-950 transition-colors hover:text-terracotta sm:text-2xl"
					onclick={() => tour_modal.open(tour)}>
					{title}
				</button>
			</h3>

			<div class="mb-2 line-clamp-3 text-xs font-light leading-relaxed text-stone-600">
				<PortableText
					value={tour_intro?.[$locale] || []}
					components={{}} />
			</div>
		</div>
	</div>

	<!-- Card Footer -->
	<div
		class="flex items-center justify-between border-t border-stone-100 bg-stone-50/50 px-5 py-4 sm:px-6">
		<div>
			<span class="block text-[10px] uppercase tracking-wider text-stone-400">
				{$LL.tours.price_from()}
			</span>
			<span class="text-sm font-semibold text-stone-900">
				{format_price(tour_price?.pax2 || tour_price?.pax1 || 0, $locale)}
				<span class="text-xs font-normal text-stone-400">/ {$LL.tours.detail.pax()}</span>
			</span>
		</div>

		<div class="flex items-center gap-3">
			<button
				onclick={() => tour_modal.open(tour)}
				class="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-stone-900 transition-colors hover:text-terracotta">
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
			</button>
			<button
				onclick={() => booking_modal.open(title)}
				class="bg-stone-900 px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider text-stone-50 transition-colors hover:bg-stone-800">
				{$locale === 'vn' ? 'Đặt Tour' : 'Book'}
			</button>
		</div>
	</div>
</article>
