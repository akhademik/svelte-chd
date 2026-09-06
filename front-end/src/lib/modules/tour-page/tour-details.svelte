<script lang="ts">
	import { PortableText } from '@portabletext/svelte'
	import LL, { locale } from '$i18n/i18n-svelte'
	import BasePortableTextImage from '$lib/base/base-portable-text-image.svelte'
	import BasePortableTextListItem from '$lib/base/base-portable-text-list-item.svelte'
	import { booking_modal } from '$lib/stores/booking-store'
	import type { Tour } from '$lib/types/tour.type'
	import { format_pax_no, format_price, format_price_object } from '$lib/utils/format-data'
	import { url_for } from '$lib/utils/sanity'
	import { fade } from 'svelte/transition'

	interface Props {
		tour: Tour
		allTours?: Tour[]
	}

	let { tour }: Props = $props()

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

	let title = $derived(tour.tour_name?.[$locale] || tour.tour_name?.en || 'Tour')
	let duration = $derived(tour.tour_duration?.[$locale] || tour.tour_duration?.en || '')
	let prices = $derived(format_price_object(tour))
	let minPrice = $derived(
		tour.tour_price?.pax2 || tour.tour_price?.pax1 || tour.tour_price?.price || 0
	)

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

	let activeImageIndex = $state(0)

	let tourType = $derived(
		tour.tour_duration?.vn?.includes('ngày') ||
			tour.tour_duration?.en?.includes('day') ||
			tour.tour_duration?.en?.includes('Day')
			? 'day-tours'
			: 'highland-tours'
	)
</script>

<div class="space-y-12 pb-24">
	<!-- Hero / Header Section of Tour Detail -->
	<section class="border-b border-border bg-surface py-12 sm:py-16">
		<div class="mx-auto max-w-6xl px-6">
			<!-- Breadcrumb & Back Link -->
			<div class="mb-6 flex flex-wrap items-center justify-between gap-4">
				<nav class="flex items-center gap-2 text-xs uppercase tracking-wider text-foreground-muted">
					<a
						href={`/${$locale}`}
						class="transition-colors hover:text-foreground">
						{$locale === 'vn' ? 'Trang chủ' : 'Home'}
					</a>
					<span>/</span>
					<a
						href={`/${$locale}/${tourType}`}
						class="transition-colors hover:text-foreground">
						{tourType === 'day-tours' ? $LL.nav_bar.day_tours() : $LL.nav_bar.highland_tours()}
					</a>
					<span>/</span>
					<span class="font-medium text-foreground">{tour.tour_id || 'Detail'}</span>
				</nav>

				<a
					href={`/${$locale}/${tourType}`}
					class="inline-flex items-center gap-2 border border-border-strong bg-surface px-4 py-2 text-xs uppercase tracking-wider text-foreground shadow-sm transition-all hover:border-foreground hover:text-foreground">
					← {$locale === 'vn' ? 'Tất cả tour' : 'Back to tours'}
				</a>
			</div>

			<div class="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
				<!-- Title & Meta -->
				<div class="lg:col-span-8">
					<div class="mb-3 flex flex-wrap items-center gap-2">
						{#if tour.best_sell}
							<span
								class="bg-secondary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white shadow-sm">
								★ Best Sell
							</span>
						{/if}
						{#if tour.tour_id}
							<span
								class="bg-inverse px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-inverse-foreground">
								{tour.tour_id}
							</span>
						{/if}
						{#if duration}
							<span
								class="border border-border bg-surface px-2.5 py-1 text-[10px] font-medium tracking-wide text-foreground-muted">
								⏱ {duration}
							</span>
						{/if}
					</div>

					<h1
						class="font-serif text-3xl font-bold leading-tight text-primary sm:text-4xl lg:text-5xl">
						{title}
					</h1>

					<!-- Tags -->
					{#if tour.tour_tags?.length}
						<div class="mt-4 flex flex-wrap gap-2">
							{#each tour.tour_tags as tag}
								{@const tagName =
									tag?.tour_tags?.[$locale] ||
									tag?.tour_tags?.en ||
									tag?.tourTags?.[$locale] ||
									tag?.tourTags?.en}
								{#if tagName}
									<span
										class="border border-border bg-surface px-2.5 py-0.5 text-[10px] font-medium tracking-wide text-foreground-muted">
										#{tagName}
									</span>
								{/if}
							{/each}
						</div>
					{/if}
				</div>

				<!-- Quick Action Box -->
				<div class="border border-border/90 bg-surface p-6 shadow-sm lg:col-span-4">
					<span class="block text-xs uppercase tracking-wider text-foreground-subtle">
						{$LL.tours.price_from()}
					</span>
					<div class="mt-1 flex items-baseline gap-1.5">
						<b class="font-serif text-2xl text-foreground sm:text-3xl">
							{format_price(minPrice, $locale)}
						</b>
						<span class="text-xs font-light text-foreground-subtle">/{$LL.tours.detail.pax()}</span>
					</div>

					<div class="mt-6 flex flex-col gap-2.5">
						<button
							onclick={() => booking_modal.open(title)}
							class="flex w-full items-center justify-center gap-2 bg-primary py-3.5 text-xs font-semibold uppercase tracking-widest text-white shadow-sm transition-colors hover:bg-primary-hover">
							<span>{$LL.tours.book_now()}</span>
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
						<a
							href={`/${$locale}/contact?tour=${encodeURIComponent(title)}&duration=${encodeURIComponent(duration || '')}&code=${encodeURIComponent(tour.tour_id || '')}`}
							class="flex w-full items-center justify-center gap-2 border border-border-strong py-3 text-xs font-medium uppercase tracking-wider text-foreground transition-colors hover:border-foreground hover:bg-surface-muted">
							{$LL.tours.plan_trip()}
						</a>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Main Body Layout: Gallery & Details -->
	<div class="mx-auto max-w-6xl px-6">
		<div class="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
			<!-- Left Column: Gallery, Overview, Itinerary -->
			<div class="space-y-12 lg:col-span-8">
				<!-- Trip Facts (P0 1.2.1) -->
				<div class="border border-border/90 bg-surface p-6 sm:p-8">
					<h2 class="mb-4 font-serif text-xl font-bold text-foreground">
						{$LL.tours.trip_facts.title()}
					</h2>
					<div class="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
						<div class="border-l-2 border-primary pl-3">
							<span class="block text-[11px] uppercase tracking-wider text-foreground-subtle">
								{$LL.tours.trip_facts.duration()}
							</span>
							<span class="mt-1 block font-medium text-foreground">
								{duration || '1 Day'}
							</span>
						</div>
						<div class="border-l-2 border-secondary pl-3">
							<span class="block text-[11px] uppercase tracking-wider text-foreground-subtle">
								{$LL.tours.trip_facts.style()}
							</span>
							<span class="mt-1 block font-medium text-foreground">
								{$LL.tours.trip_facts.style_val()}
							</span>
						</div>
						<div class="border-l-2 border-border-strong pl-3">
							<span class="block text-[11px] uppercase tracking-wider text-foreground-subtle">
								{$LL.tours.trip_facts.difficulty()}
							</span>
							<span class="mt-1 block font-medium text-foreground">
								{$LL.tours.trip_facts.difficulty_val()}
							</span>
						</div>
					</div>
				</div>

				<!-- Photo Gallery -->
				{#if allImages.length > 0}
					<div class="space-y-3 overflow-hidden border border-border bg-inverse p-2 shadow-md">
						<div
							class="relative aspect-[16/10] w-full overflow-hidden bg-inverse-dark sm:aspect-[16/9]">
							{#key activeImageIndex}
								<img
									transition:fade={{ duration: 250 }}
									src={url_for(allImages[activeImageIndex])
										.width(1100)
										.height(680)
										.auto('format')
										.quality(85)
										.url()}
									alt={allImages[activeImageIndex]?.caption || title}
									class="absolute inset-0 h-full w-full object-cover" />
							{/key}

							{#if allImages.length > 1}
								<button
									type="button"
									onclick={() =>
										(activeImageIndex =
											(activeImageIndex - 1 + allImages.length) % allImages.length)}
									class="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2.5 text-white backdrop-blur-sm transition-colors hover:bg-black/80"
									aria-label="Previous photo">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-4 w-4"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
								</button>
								<button
									type="button"
									onclick={() => (activeImageIndex = (activeImageIndex + 1) % allImages.length)}
									class="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2.5 text-white backdrop-blur-sm transition-colors hover:bg-black/80"
									aria-label="Next photo">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-4 w-4"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
								</button>
								<div
									class="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs font-light text-inverse-foreground backdrop-blur-sm">
									{activeImageIndex + 1} / {allImages.length}
								</div>
							{/if}
						</div>

						<!-- Thumbnails -->
						{#if allImages.length > 1}
							<div class="flex gap-2 overflow-x-auto p-1">
								{#each allImages as imgItem, idx}
									<button
										type="button"
										onclick={() => (activeImageIndex = idx)}
										class={`relative aspect-[16/10] h-16 shrink-0 overflow-hidden border-2 transition-all ${
											activeImageIndex === idx
												? 'scale-105 border-secondary opacity-100'
												: 'border-transparent opacity-60 hover:opacity-100'
										}`}>
										<img
											src={url_for(imgItem).width(160).height(100).auto('format').quality(70).url()}
											alt={`Thumbnail ${idx + 1}`}
											class="h-full w-full object-cover" />
									</button>
								{/each}
							</div>
						{/if}
					</div>
				{/if}

				<!-- Tour Overview / Intro -->
				{#if tour.tour_intro?.[$locale]}
					<div class="border border-border/90 bg-surface p-6 sm:p-8">
						<h2 class="mb-4 font-serif text-2xl font-bold text-foreground">
							{$LL.tours.detail.intro()}
						</h2>
						<div class="text-sm font-light leading-relaxed text-foreground-muted sm:text-base">
							<PortableText
								value={tour.tour_intro[$locale]}
								components={portableTextComponents} />
						</div>
					</div>
				{/if}

				<!-- Highlights -->
				{#if tour.tour_highlights?.length}
					<div class="border border-border/90 bg-surface p-6 sm:p-8">
						<h2 class="mb-6 font-serif text-2xl font-bold text-foreground">
							{$LL.tours.detail.highlights()}
						</h2>
						<div class="space-y-4">
							{#each tour.tour_highlights as { highlights }}
								{#if highlights?.[$locale]}
									<div
										class="flex items-start gap-3 text-sm font-light text-foreground-muted sm:text-base">
										<span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-secondary"></span>
										<span>{highlights[$locale]}</span>
									</div>
								{/if}
							{/each}
						</div>
					</div>
				{/if}

				<!-- Itinerary -->
				{#if tour.tour_itinerary?.[$locale]}
					<div class="border border-border/90 bg-surface p-6 sm:p-8">
						<h2 class="mb-6 font-serif text-2xl font-bold text-foreground">
							{$LL.tours.detail.itinerary()}
						</h2>
						<div class="text-sm font-light leading-relaxed text-foreground-muted sm:text-base">
							<PortableText
								value={tour.tour_itinerary[$locale]}
								components={portableTextComponents} />
						</div>
					</div>
				{/if}

				<!-- Good to Know Section (P0 1.2.2) -->
				<div class="border border-border/90 bg-surface p-6 sm:p-8">
					<h2 class="mb-6 font-serif text-2xl font-bold text-foreground">
						{$LL.tours.good_to_know.title()}
					</h2>
					<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
						<div class="flex flex-col gap-2">
							<div class="flex items-center gap-2 font-medium text-foreground">
								<span class="text-base">🌤</span>
								<h4>{$LL.tours.good_to_know.season_title()}</h4>
							</div>
							<p class="text-xs font-light leading-relaxed text-foreground-muted">
								{$LL.tours.good_to_know.season_desc()}
							</p>
						</div>

						<div class="flex flex-col gap-2">
							<div class="flex items-center gap-2 font-medium text-foreground">
								<span class="text-base">🎒</span>
								<h4>{$LL.tours.good_to_know.packing_title()}</h4>
							</div>
							<p class="text-xs font-light leading-relaxed text-foreground-muted">
								{$LL.tours.good_to_know.packing_desc()}
							</p>
						</div>

						<div class="flex flex-col gap-2">
							<div class="flex items-center gap-2 font-medium text-foreground">
								<span class="text-base">🚐</span>
								<h4>{$LL.tours.good_to_know.pickup_title()}</h4>
							</div>
							<p class="text-xs font-light leading-relaxed text-foreground-muted">
								{$LL.tours.good_to_know.pickup_desc()}
							</p>
						</div>

						<div class="flex flex-col gap-2">
							<div class="flex items-center gap-2 font-medium text-foreground">
								<span class="text-base">🥗</span>
								<h4>{$LL.tours.good_to_know.diet_title()}</h4>
							</div>
							<p class="text-xs font-light leading-relaxed text-foreground-muted">
								{$LL.tours.good_to_know.diet_desc()}
							</p>
						</div>
					</div>
				</div>
			</div>

			<!-- Right Column: Sticky Sidebar Info & Pricing -->
			<div class="space-y-8 lg:col-span-4">
				<!-- Pricing Table (Without table header, compact format) -->
				{#if prices.length > 0}
					<div class="border border-border/90 bg-surface p-6">
						<h3 class="mb-4 font-serif text-lg font-bold text-foreground">
							{$LL.tours.detail.price()}
						</h3>
						<div class="space-y-2.5 divide-y divide-border/60 text-xs sm:text-sm">
							{#each prices as [pax, price], idx}
								{@const paxText = `${format_pax_no(pax)} ${$LL.tours.detail.pax()}`}
								<div class={`flex items-center justify-between ${idx > 0 ? 'pt-2.5' : ''}`}>
									<span class="text-foreground-muted">{paxText}</span>
									<span class="font-medium text-foreground">
										{format_price(price, $locale)}
										<span class="text-[11px] font-normal text-foreground-subtle"
											>/{$LL.tours.detail.pax()}</span>
									</span>
								</div>
							{/each}
						</div>
					</div>
				{/if}

				<!-- Inclusions -->
				{#if tour.tour_includes?.length}
					<div class="border border-border/90 bg-surface p-6">
						<h3 class="mb-4 flex items-center gap-2 font-serif text-lg font-bold text-primary">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-4 w-4 text-emerald-600"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								><circle
									cx="12"
									cy="12"
									r="10"></circle
								><polyline points="9 12 12 15 16 10"></polyline></svg>
							<span>{$LL.tours.detail.inclusion()}</span>
						</h3>
						<ul class="space-y-2.5 text-xs font-light text-foreground-muted sm:text-sm">
							{#each tour.tour_includes as item}
								{#if item?.[$locale]}
									<li class="flex items-start gap-2.5">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
										<span>{item[$locale]}</span>
									</li>
								{/if}
							{/each}
						</ul>
					</div>
				{/if}

				<!-- CTA Card -->
				<div class="border border-border bg-inverse p-6 text-white shadow-lg">
					<h4 class="font-serif text-lg font-medium">
						{$LL.tours.customize_trip()}
					</h4>
					<p class="mt-2 text-xs font-light leading-relaxed text-inverse-foreground">
						{$locale === 'vn'
							? 'Đội ngũ CHD Travel sẽ cùng bạn chuẩn bị lịch trình cá nhân hóa hoàn toàn miễn phí.'
							: 'We curate private and personalized itineraries for you and your travel companions.'}
					</p>
					<a
						href={`/${$locale}/contact?tour=${encodeURIComponent(title)}&duration=${encodeURIComponent(duration || '')}&code=${encodeURIComponent(tour.tour_id || '')}`}
						class="mt-5 flex w-full items-center justify-center gap-2 bg-secondary py-3.5 text-xs font-medium uppercase tracking-widest text-white transition-colors hover:bg-secondary-hover">
						{$LL.tours.plan_trip()}
					</a>
				</div>
			</div>
		</div>
	</div>
</div>
