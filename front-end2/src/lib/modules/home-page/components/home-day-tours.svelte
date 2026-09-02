<script lang="ts">
	import { PortableText } from '@portabletext/svelte'
	import LL, { locale } from '$i18n/i18n-svelte'
	import { booking_modal } from '$lib/stores/booking-store'
	import type { Tour } from '$lib/types/tour.type'
	import { format_price } from '$lib/utils/format-data'
	import { get_tour_slug, url_for } from '$lib/utils/sanity'

	interface Props {
		tours: Tour[]
	}

	let { tours }: Props = $props()
</script>

<section
	id="day-tours"
	class="border-b border-stone-200 px-6 py-24">
	<div class="mx-auto max-w-6xl">
		<div class="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
			<div>
				<span class="mb-3 block text-xs font-medium uppercase tracking-[0.25em] text-stone-400">
					01 / Excursions
				</span>
				<h2 class="font-serif text-3xl font-normal text-stone-900 sm:text-4xl">
					{$LL.nav_bar.day_tours()}
				</h2>
			</div>
			<p class="max-w-md text-sm font-light text-stone-500">
				{$locale === 'vn'
					? 'Gói trọn những khoảnh khắc tinh túy nhất của đất trời trong một ngày ngắn ngủi mà đáng nhớ.'
					: $locale === 'fr'
						? "L'essence des Hauts Plateaux condensée en một journée douce et inoubliable."
						: 'Unforgettable moments crafted into a single, enriching, unhurried day.'}
			</p>
		</div>

		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each tours as tour (tour.tour_id || get_tour_slug(tour))}
				{@const slug = get_tour_slug(tour, $locale)}
				{@const detailHref = `/${$locale}/day-tours/${slug}`}
				{@const title = tour.tour_name?.[$locale] || tour.tour_name?.en || 'Tour'}
				{@const price = tour.tour_price?.pax2 || tour.tour_price?.pax1 || 0}
				{@const duration = tour.tour_duration?.[$locale] || '1 Day'}

				<div
					class="group flex flex-col border border-stone-200/80 bg-white p-5 transition-all duration-300 hover:border-stone-400">
					<div class="relative mb-5 aspect-[4/3] overflow-hidden bg-stone-100">
						{#if tour.img_cover?.asset}
							<img
								src={url_for(tour.img_cover)
									.width(600)
									.height(450)
									.auto('format')
									.quality(75)
									.url()}
								alt={tour.img_cover?.caption || title}
								class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
								loading="lazy" />
						{/if}
						<span
							class="absolute left-3 top-3 bg-stone-900/80 px-2.5 py-1 text-[10px] uppercase tracking-wider text-stone-100 backdrop-blur-sm">
							{duration}
						</span>
					</div>

					<div class="flex flex-1 flex-col justify-between">
						<div>
							<h3
								class="mb-2 line-clamp-2 min-h-[3.5rem] font-serif text-xl text-stone-900 transition-colors group-hover:text-terracotta">
								<a href={detailHref}>{title}</a>
							</h3>
							<div class="mb-6 line-clamp-3 text-xs font-light leading-relaxed text-stone-500">
								<PortableText
									value={tour.tour_intro?.[$locale] || []}
									components={{}} />
							</div>
						</div>

						<div class="flex items-center justify-between border-t border-stone-100 pt-4">
							<div>
								<span class="block text-[10px] uppercase tracking-wider text-stone-400">
									{$LL.tours.price_from()}
								</span>
								<span class="text-sm font-medium text-stone-900">
									{format_price(price, $locale)}
									<span class="text-xs font-normal text-stone-400">/ pax</span>
								</span>
							</div>
							<div class="flex items-center gap-3">
								<a
									href={detailHref}
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
				</div>
			{/each}
		</div>
	</div>
</section>
