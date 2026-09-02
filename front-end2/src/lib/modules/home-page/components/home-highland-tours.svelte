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
	id="highland-tours"
	class="border-b border-stone-200 bg-stone-100/50 px-6 py-24">
	<div class="mx-auto max-w-6xl">
		<div class="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
			<div>
				<span class="mb-3 block text-xs font-medium uppercase tracking-[0.25em] text-stone-400">
					02 / Grand Expeditions
				</span>
				<h2 class="font-serif text-3xl font-normal text-stone-900 sm:text-4xl">
					{$LL.nav_bar.highland_tours()}
				</h2>
			</div>
			<p class="max-w-md text-sm font-light text-stone-500">
				{$locale === 'vn'
					? 'Hành trình nhiều ngày sâu lắng qua những cung đường sương mù, rừng thông cổ thụ và âm vang đại ngàn.'
					: $locale === 'fr'
						? 'Des périples immersifs de plusieurs jours au milieu des brumes et des forêts séculaires.'
						: 'Multi-day mindful journeys through misty passes, ancient pine forests, and ethnic hamlets.'}
			</p>
		</div>

		<div class="space-y-12">
			{#each tours as tour, index (tour.tour_id || get_tour_slug(tour))}
				{@const slug = get_tour_slug(tour, $locale)}
				{@const detailHref = `/${$locale}/highland-tours/${slug}`}
				{@const title = tour.tour_name?.[$locale] || tour.tour_name?.en || 'Highland Tour'}
				{@const price = tour.tour_price?.pax2 || tour.tour_price?.pax1 || 0}
				{@const duration = tour.tour_duration?.[$locale] || 'Multi-day'}

				<div
					class="group grid grid-cols-1 overflow-hidden border border-stone-200/90 bg-white lg:grid-cols-12">
					<div
						class={`aspect-[16/10] overflow-hidden bg-stone-200 lg:col-span-7 lg:aspect-auto ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
						{#if tour.img_cover?.asset}
							<img
								src={url_for(tour.img_cover)
									.width(900)
									.height(600)
									.auto('format')
									.quality(80)
									.url()}
								alt={tour.img_cover?.caption || title}
								class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
								loading="lazy" />
						{/if}
					</div>

					<div
						class={`flex flex-col justify-between p-8 sm:p-10 lg:col-span-5 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
						<div>
							<div
								class="mb-4 flex items-center gap-3 text-xs uppercase tracking-wider text-stone-400">
								<span>{duration}</span>
								<span>•</span>
								<span>Central Highlands</span>
							</div>

							<h3
								class="mb-4 font-serif text-2xl leading-snug text-stone-900 transition-colors group-hover:text-terracotta sm:text-3xl">
								<a href={detailHref}>{title}</a>
							</h3>

							<div class="mb-6 line-clamp-3 text-sm font-light leading-relaxed text-stone-600">
								<PortableText
									value={tour.tour_intro?.[$locale] || []}
									components={{}} />
							</div>

							{#if tour.tour_highlights?.length}
								<ul class="mb-8 space-y-2 text-xs text-stone-600">
									{#each tour.tour_highlights.slice(0, 3) as { highlights }}
										{#if highlights?.[$locale]}
											<li class="flex items-center gap-2">
												<span class="h-1.5 w-1.5 rounded-full bg-stone-900"></span>
												<span>{highlights[$locale]}</span>
											</li>
										{/if}
									{/each}
								</ul>
							{/if}
						</div>

						<div class="flex items-center justify-between border-t border-stone-100 pt-6">
							<div>
								<span class="block text-[10px] uppercase tracking-wider text-stone-400">
									{$LL.tours.price_from()}
								</span>
								<span class="text-base font-medium text-stone-900">
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
									class="bg-stone-900 px-5 py-2.5 text-xs uppercase tracking-widest text-stone-50 transition-colors hover:bg-stone-800">
									Book
								</button>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
