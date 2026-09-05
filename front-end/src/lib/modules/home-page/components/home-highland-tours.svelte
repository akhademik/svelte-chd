<script lang="ts">
	import { PortableText } from '@portabletext/svelte'
	import LL, { locale } from '$i18n/i18n-svelte'
	import { booking_modal } from '$lib/stores/booking-store'
	import { tour_modal } from '$lib/stores/modal-store'
	import type { Tour } from '$lib/types/tour.type'
	import { get_tour_slug, url_for } from '$lib/utils/sanity'

	import BasePortableTextImage from '$lib/base/base-portable-text-image.svelte'
	import BasePortableTextListItem from '$lib/base/base-portable-text-list-item.svelte'

	interface Props {
		tours: Tour[]
	}

	let { tours }: Props = $props()

	const portableTextComponents = {
		types: {
			image: BasePortableTextImage,
		},
		listItem: {
			normal: BasePortableTextListItem,
			bullet: BasePortableTextListItem,
			number: BasePortableTextListItem,
		},
	}

	let displayTours = $derived.by(() => {
		const langTours = tours.filter(t => Boolean(t.tour_name?.[$locale]))
		const hot = langTours.filter(t => t.best_sell)
		return hot.length > 0 ? hot : langTours
	})
</script>

<section
	id="highland-tours"
	class="border-b border-stone-200 bg-stone-100/50 px-6 py-24">
	<div class="mx-auto max-w-6xl">
		<div class="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
			<div>
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
			{#each displayTours as tour, index (tour.tour_id || get_tour_slug(tour))}
				{@const title = tour.tour_name?.[$locale] || tour.tour_name?.en || 'Highland Tour'}
				{@const duration = tour.tour_duration?.[$locale] || 'Multi-day'}

				<div
					class="group grid grid-cols-1 overflow-hidden border border-stone-200/90 bg-sand-card lg:grid-cols-12">
					<div
						class={`relative aspect-[16/10] cursor-pointer overflow-hidden bg-stone-200 lg:col-span-7 lg:aspect-auto ${index % 2 === 1 ? 'lg:order-2' : ''}`}
						role="button"
						tabindex="0"
						onclick={() => tour_modal.open(tour)}
						onkeydown={e => e.key === 'Enter' && tour_modal.open(tour)}>
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
						{#if tour.best_sell}
							<span
								class="absolute left-4 top-4 bg-terracotta px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white shadow-md">
								★ Best Sell
							</span>
						{/if}
					</div>

					<div
						class={`flex flex-col justify-between p-6 sm:p-8 lg:col-span-5 lg:p-10 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
						<div>
							<div
								class="mb-3 flex flex-wrap items-center gap-2 text-xs uppercase tracking-wider text-stone-400">
								<span>{duration}</span>
								<span>•</span>
								<span>Central Highlands</span>
								{#if tour.tour_tags?.length}
									{#each tour.tour_tags as tag}
										{@const tagName =
											tag?.tour_tags?.[$locale] ||
											tag?.tour_tags?.en ||
											tag?.tourTags?.[$locale] ||
											tag?.tourTags?.en}
										{#if tagName}
											<span
												class="rounded bg-stone-100 px-2 py-0.5 text-[9px] font-medium tracking-wide text-stone-700">
												#{tagName}
											</span>
										{/if}
									{/each}
								{/if}
							</div>

							<h3
								class="mb-4 font-serif text-2xl leading-snug text-stone-900 transition-colors group-hover:text-terracotta sm:text-3xl">
								<button
									type="button"
									class="text-left font-serif text-2xl leading-snug text-stone-900 transition-colors hover:text-terracotta sm:text-3xl"
									onclick={() => tour_modal.open(tour)}>
									{title}
								</button>
							</h3>

							<div class="mb-6 line-clamp-3 text-sm font-light leading-relaxed text-stone-600">
								<PortableText
									value={tour.tour_intro?.[$locale] || []}
									components={portableTextComponents} />
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

						<div
							class="-mx-6 -mb-6 mt-6 flex items-center justify-between border-t border-stone-100 bg-stone-50/50 px-6 py-4 sm:-mx-8 sm:-mb-8 sm:px-8 lg:-mx-10 lg:-mb-10 lg:px-10">
							<button
								onclick={() => tour_modal.open(tour)}
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
							</button>
							<button
								onclick={() => booking_modal.open(title)}
								class="bg-stone-900 px-5 py-2.5 text-xs font-medium uppercase tracking-wider text-stone-50 transition-colors hover:bg-stone-800">
								{$locale === 'vn' ? 'Đặt Tour' : 'Book Tour'}
							</button>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
