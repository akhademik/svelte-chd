<script lang="ts">
	import { PortableText } from '@portabletext/svelte'
	import LL, { locale } from '$i18n/i18n-svelte'
	import { booking_modal } from '$lib/stores/booking-store'
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
	id="day-tours"
	class="sm:py-18 border-b border-border px-6 py-14">
	<div class="mx-auto max-w-6xl">
		<div class="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
			<div>
				<h2 class="font-serif text-3xl font-bold text-primary sm:text-4xl">
					{$LL.nav_bar.day_tours()}
				</h2>
			</div>
			<p class="max-w-md text-sm font-light text-foreground-muted">
				{$locale === 'vn'
					? 'Gói trọn những khoảnh khắc tinh túy nhất của đất trời trong một ngày ngắn ngủi mà đáng nhớ.'
					: $locale === 'fr'
						? "L'essence des Hauts Plateaux condensée en une journée douce et inoubliable."
						: 'Unforgettable moments crafted into a single, enriching, unhurried day.'}
			</p>
		</div>

		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each displayTours as tour (tour.tour_id || get_tour_slug(tour))}
				{@const title = tour.tour_name?.[$locale] || tour.tour_name?.en || 'Tour'}
				{@const duration = tour.tour_duration?.[$locale] || '1 Day'}
				{@const slug = get_tour_slug(tour, $locale) || tour.tour_id || ''}
				{@const tourLink = `/${$locale}/day-tours/${slug}`}

				<div
					class="group flex flex-col border border-border/80 bg-surface p-5 transition-all duration-300 hover:border-border-strong hover:shadow-xl">
					<a
						href={tourLink}
						class="relative mb-5 block aspect-[4/3] overflow-hidden bg-background">
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
						{#if tour.best_sell}
							<span
								class="absolute right-3 top-3 bg-secondary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white shadow-md">
								★ Best Sell
							</span>
						{/if}
						<span
							class="absolute left-3 top-3 bg-inverse/80 px-2.5 py-1 text-[10px] uppercase tracking-wider text-inverse-foreground backdrop-blur-sm">
							{duration}
						</span>
					</a>

					{#if tour.tour_tags?.length}
						<div class="mb-3 flex flex-wrap gap-1.5">
							{#each tour.tour_tags as tag}
								{@const tagName =
									tag?.tour_tags?.[$locale] ||
									tag?.tour_tags?.en ||
									tag?.tourTags?.[$locale] ||
									tag?.tourTags?.en}
								{#if tagName}
									<span
										class="border border-border bg-surface px-2 py-0.5 text-[9px] font-medium tracking-wide text-foreground-muted">
										#{tagName}
									</span>
								{/if}
							{/each}
						</div>
					{/if}

					<div class="flex flex-1 flex-col justify-between">
						<div>
							<h3
								class="mb-2 font-serif text-xl text-foreground transition-colors group-hover:text-secondary">
								<a
									href={tourLink}
									class="line-clamp-2 block h-14 text-left font-serif text-xl font-normal text-foreground transition-colors hover:text-secondary">
									{title}
								</a>
							</h3>
							<div
								class="mb-6 line-clamp-3 h-14 overflow-hidden text-xs font-light leading-relaxed text-stone-500">
								<PortableText
									value={tour.tour_intro?.[$locale] || []}
									components={portableTextComponents} />
							</div>
						</div>

						<div
							class="-mx-5 -mb-5 mt-4 flex items-center justify-between border-t border-stone-100 bg-stone-50/50 px-5 py-3.5">
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
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
