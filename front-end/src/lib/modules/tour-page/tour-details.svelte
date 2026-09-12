<script lang="ts">
	import { browser } from '$app/environment'
	import { PortableText } from '@portabletext/svelte'
	import LL, { locale } from '$i18n/i18n-svelte'
	import { booking_modal } from '$lib/stores/booking-store'
	import type { Tour } from '$lib/types/tour.type'
	import { format_pax_no, format_price, format_price_object } from '$lib/utils/format-data'
	import { portableTextComponents } from '$lib/utils/portable-text-components'
	import { url_for } from '$lib/utils/sanity'
	import { fade } from 'svelte/transition'

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

	// Lightbox state & touch swipe handlers
	let isLightboxOpen = $state(false)
	let lightboxIndex = $state(0)
	let touchStartX = $state(0)
	let touchEndX = $state(0)

	const openLightbox = (index: number) => {
		if (allImages.length === 0) return
		lightboxIndex = (index + allImages.length) % allImages.length
		isLightboxOpen = true
	}

	const closeLightbox = () => {
		isLightboxOpen = false
	}

	const nextImage = () => {
		if (allImages.length <= 1) return
		lightboxIndex = (lightboxIndex + 1) % allImages.length
	}

	const prevImage = () => {
		if (allImages.length <= 1) return
		lightboxIndex = (lightboxIndex - 1 + allImages.length) % allImages.length
	}

	const handleTouchStart = (e: TouchEvent) => {
		touchStartX = e.changedTouches[0].screenX
	}

	const handleTouchEnd = (e: TouchEvent) => {
		touchEndX = e.changedTouches[0].screenX
		const swipeDistance = touchEndX - touchStartX
		if (Math.abs(swipeDistance) > 40) {
			if (swipeDistance < 0) {
				nextImage()
			} else {
				prevImage()
			}
		}
	}

	const handleKeydown = (e: KeyboardEvent) => {
		if (!isLightboxOpen) return
		if (e.key === 'Escape') closeLightbox()
		if (e.key === 'ArrowRight') nextImage()
		if (e.key === 'ArrowLeft') prevImage()
	}

	$effect(() => {
		if (browser) {
			if (isLightboxOpen) {
				document.body.style.overflow = 'hidden'
			} else {
				document.body.style.overflow = ''
			}
			return () => {
				document.body.style.overflow = ''
			}
		}
	})
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="space-y-10 pb-24">
	<!-- 1. Top Breadcrumb Navigation -->
	<section class="border-b border-border/80 bg-surface/50 py-3 sm:py-4">
		<div class="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6">
			<!-- Mobile View: Clean single-line parent category back link -->
			<div class="flex items-center md:hidden">
				<a
					href={`/${$locale}/${tourType}`}
					class="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-foreground-muted transition-colors hover:text-foreground">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-3.5 w-3.5"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2.5"
						stroke-linecap="round"
						stroke-linejoin="round">
						<polyline points="15 18 9 12 15 6"></polyline>
					</svg>
					{tourType === 'day-tours' ? $LL.nav_bar.day_tours() : $LL.nav_bar.highland_tours()}
				</a>
			</div>

			<!-- Desktop View: Full Breadcrumbs -->
			<nav
				class="hidden items-center gap-2 text-xs uppercase tracking-wider text-foreground-muted md:flex">
				<a
					href={`/${$locale}`}
					class="transition-colors hover:text-foreground">
					{$LL.nav_bar.home()}
				</a>
				<span>/</span>
				<a
					href={`/${$locale}/${tourType}`}
					class="transition-colors hover:text-foreground">
					{tourType === 'day-tours' ? $LL.nav_bar.day_tours() : $LL.nav_bar.highland_tours()}
				</a>
				<span>/</span>
				<span class="font-medium text-foreground">{title}</span>
			</nav>

			<!-- Desktop View: Back to Tours Button -->
			<a
				href={`/${$locale}/${tourType}`}
				class="hidden items-center gap-2 border border-border-strong bg-surface px-4 py-1.5 text-xs uppercase tracking-wider text-foreground shadow-sm transition-all hover:border-foreground hover:text-foreground md:inline-flex">
				← {$LL.tours.back_to_tours()}
			</a>
		</div>
	</section>

	<div class="mx-auto max-w-6xl space-y-10 px-6">
		<!-- 2. Gallery (Up Most - Klook Style Bento Grid with transparent dividers) -->
		{#if allImages.length > 0}
			<section class="relative">
				<!-- Desktop / Tablet Grid (Split into 2: Left 1 big image, Right 4 small images) -->
				<div
					class="hidden h-[420px] grid-cols-4 gap-2.5 overflow-hidden rounded-xl bg-transparent md:grid lg:h-[480px]">
					<!-- Left Column: 1 Big Picture (Takes 2 cols, full height) -->
					<div
						role="button"
						tabindex="0"
						onclick={() => openLightbox(0)}
						onkeydown={e => e.key === 'Enter' && openLightbox(0)}
						class="group relative col-span-2 h-full cursor-pointer overflow-hidden rounded-xl bg-surface-muted/30">
						<img
							src={url_for(allImages[0]).width(1200).height(800).auto('format').quality(85).url()}
							alt=""
							class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
						<div
							class="absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
						</div>
					</div>

					<!-- Right Column: 4 Small Pictures (2x2 grid, takes 2 cols) -->
					<div class="col-span-2 grid h-full grid-cols-2 grid-rows-2 gap-2.5">
						{#each [1, 2, 3, 4] as imgIdx}
							{@const imageItem = allImages[imgIdx] || allImages[0]}
							{@const isLastVisible = imgIdx === 4}
							{@const hasMoreImages = allImages.length > 5}
							<div
								role="button"
								tabindex="0"
								onclick={() => openLightbox(imgIdx < allImages.length ? imgIdx : 0)}
								onkeydown={e =>
									e.key === 'Enter' && openLightbox(imgIdx < allImages.length ? imgIdx : 0)}
								class="group relative h-full cursor-pointer overflow-hidden rounded-xl bg-surface-muted/30">
								<img
									src={url_for(imageItem).width(600).height(400).auto('format').quality(80).url()}
									alt=""
									class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
								<div
									class="absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
								</div>

								<!-- Overlay badge on 4th image if more images exist -->
								{#if isLastVisible && hasMoreImages}
									<div
										class="absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-black/50 text-white backdrop-blur-[2px] transition-colors group-hover:bg-black/60">
										<span class="font-serif text-xl font-bold">+{allImages.length - 4}</span>
										<span class="text-[11px] uppercase tracking-wider">
											{$LL.tours.gallery.view_all()}
										</span>
									</div>
								{/if}
							</div>
						{/each}
					</div>
				</div>

				<!-- Mobile View (Featured Image with swipeable preview and counter) -->
				<div class="space-y-2 md:hidden">
					<div
						role="button"
						tabindex="0"
						onclick={() => openLightbox(0)}
						onkeydown={e => e.key === 'Enter' && openLightbox(0)}
						class="relative aspect-[16/10] w-full cursor-pointer overflow-hidden rounded-xl bg-surface-muted/30 shadow-sm">
						<img
							src={url_for(allImages[0]).width(800).height(500).auto('format').quality(85).url()}
							alt=""
							class="h-full w-full object-cover" />
						<div
							class="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
							1 / {allImages.length}
						</div>
					</div>

					{#if allImages.length > 1}
						<div class="flex gap-2 overflow-x-auto pb-1">
							{#each allImages.slice(0, 6) as imgItem, idx}
								<button
									type="button"
									onclick={() => openLightbox(idx)}
									class="relative aspect-[16/10] h-16 shrink-0 overflow-hidden rounded-lg border border-border/80 bg-surface-muted/30">
									<img
										src={url_for(imgItem).width(160).height(100).auto('format').quality(70).url()}
										alt=""
										class="h-full w-full object-cover" />
								</button>
							{/each}
						</div>
					{/if}
				</div>

				<!-- Floating "View All Photos" Button -->
				<button
					type="button"
					onclick={() => openLightbox(0)}
					class="absolute bottom-4 right-4 hidden items-center gap-2 rounded-md border border-border bg-surface/95 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-foreground shadow-lg backdrop-blur-md transition-all hover:border-foreground hover:bg-surface hover:text-primary md:inline-flex">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round">
						<rect
							x="3"
							y="3"
							width="18"
							height="18"
							rx="2"
							ry="2"></rect>
						<circle
							cx="8.5"
							cy="8.5"
							r="1.5"></circle>
						<polyline points="21 15 16 10 5 21"></polyline>
					</svg>
					<span>
						{$LL.tours.gallery.view_all_photos({ count: allImages.length })}
					</span>
				</button>
			</section>
		{/if}

		<!-- 3. Tour Name & Started Price + Actions (Book Now, Plan This Trip) -->
		<section class="rounded-xl border border-border/90 bg-surface p-6 shadow-sm sm:p-8 md:p-10">
			<div class="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
				<!-- Left: Title, Badges & Tags -->
				<div class="space-y-4 lg:col-span-8">
					<div class="flex flex-wrap items-center gap-2">
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
						<div class="flex flex-wrap gap-2 pt-2">
							{#each tour.tour_tags as tag}
								{@const tagName =
									tag?.tour_tags?.[$locale] ||
									tag?.tour_tags?.en ||
									tag?.tourTags?.[$locale] ||
									tag?.tourTags?.en}
								{#if tagName}
									<span
										class="rounded border border-border bg-surface-muted/60 px-2.5 py-1 text-[11px] font-medium tracking-wide text-foreground-muted">
										#{tagName}
									</span>
								{/if}
							{/each}
						</div>
					{/if}
				</div>

				<!-- Right: Started Price & Action Buttons -->
				<div
					class="rounded-lg border border-border bg-surface-muted/40 p-6 shadow-sm lg:col-span-4">
					<div class="flex items-baseline justify-between gap-2 border-b border-border/60 pb-3">
						<span class="text-xs uppercase tracking-wider text-foreground-subtle">
							{$LL.tours.price_from()}
						</span>
						<div class="flex items-baseline gap-1">
							<b class="font-serif text-2xl font-bold text-foreground sm:text-3xl">
								{format_price(minPrice, $locale)}
							</b>
							<span class="text-xs font-light text-foreground-subtle"
								>/{$LL.tours.detail.pax()}</span>
						</div>
					</div>

					<div class="mt-6 flex flex-col gap-3">
						<button
							onclick={() => booking_modal.open(title)}
							class="flex w-full items-center justify-center gap-2 bg-primary py-3.5 text-xs font-semibold uppercase tracking-widest text-white shadow-md transition-colors hover:bg-primary-hover">
							<span>{$LL.tours.book_now()}</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-4 w-4"
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
							class="flex w-full items-center justify-center gap-2 border border-border-strong bg-surface py-3 text-xs font-medium uppercase tracking-wider text-foreground transition-colors hover:border-foreground hover:bg-surface-muted">
							{$LL.tours.plan_trip()}
						</a>
					</div>
				</div>
			</div>
		</section>

		<!-- 4. Tour Facts (Trip Facts) -->
		<section class="rounded-xl border border-border/90 bg-surface p-6 sm:p-8">
			<h2 class="mb-4 font-serif text-xl font-bold text-foreground">
				{$LL.tours.trip_facts.title()}
			</h2>
			<div class="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
				<div class="border-l-2 border-primary pl-4">
					<span class="block text-[11px] uppercase tracking-wider text-foreground-subtle">
						{$LL.tours.trip_facts.duration()}
					</span>
					<span class="mt-1 block text-base font-medium text-foreground">
						{duration || '1 Day'}
					</span>
				</div>
				<div class="border-l-2 border-secondary pl-4">
					<span class="block text-[11px] uppercase tracking-wider text-foreground-subtle">
						{$LL.tours.trip_facts.style()}
					</span>
					<span class="mt-1 block text-base font-medium text-foreground">
						{$LL.tours.trip_facts.style_val()}
					</span>
				</div>
				<div class="border-l-2 border-border-strong pl-4">
					<span class="block text-[11px] uppercase tracking-wider text-foreground-subtle">
						{$LL.tours.trip_facts.difficulty()}
					</span>
					<span class="mt-1 block text-base font-medium text-foreground">
						{$LL.tours.trip_facts.difficulty_val()}
					</span>
				</div>
			</div>
		</section>

		<!-- 5. Main Body: Intro, Highlights, Itinerary, Good to Know & Sidebar -->
		<div class="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
			<!-- Left Column: Intro, Highlights, Itinerary, Good to know -->
			<div class="space-y-10 lg:col-span-8">
				<!-- Tour Overview / Intro -->
				{#if tour.tour_intro?.[$locale]}
					<div class="rounded-xl border border-border/90 bg-surface p-6 sm:p-8">
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
					<div class="rounded-xl border border-border/90 bg-surface p-6 sm:p-8">
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
					<div class="rounded-xl border border-border/90 bg-surface p-6 sm:p-8">
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

				<!-- Good to Know Section -->
				<div class="rounded-xl border border-border/90 bg-surface p-6 sm:p-8">
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
				<!-- Pricing Table -->
				{#if prices.length > 0}
					<div class="rounded-xl border border-border/90 bg-surface p-6 shadow-sm">
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
					<div class="rounded-xl border border-border/90 bg-surface p-6 shadow-sm">
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
				<div class="rounded-xl border border-border bg-inverse p-6 text-white shadow-lg">
					<h4 class="font-serif text-lg font-medium">
						{$LL.tours.customize_trip()}
					</h4>
					<p class="mt-2 text-xs font-light leading-relaxed text-inverse-foreground">
						{$LL.tours.customize_desc()}
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

<!-- Fullscreen Lightbox Overlay (Infinite loop navigation, 50% Translucent Glassmorphism & Touch Swiping) -->
{#if isLightboxOpen && allImages.length > 0}
	<div
		transition:fade={{ duration: 200 }}
		class="fixed inset-0 z-[80] flex h-[100dvh] max-h-[100dvh] flex-col justify-between overflow-hidden bg-black/50 text-white backdrop-blur-md"
		role="dialog"
		aria-modal="true"
		aria-label="Tour image gallery">
		<!-- Lightbox Header -->
		<div
			class="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-6 sm:py-4">
			<div class="flex items-center gap-3 overflow-hidden pr-2">
				<span class="truncate font-serif text-sm font-medium text-white/90 sm:text-base"
					>{title}</span>
				<span
					class="hidden rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-light text-white/80 sm:inline-block">
					{lightboxIndex + 1} / {allImages.length}
				</span>
			</div>
			<button
				type="button"
				onclick={closeLightbox}
				class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/15 hover:text-white"
				aria-label="Close lightbox">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round">
					<line
						x1="18"
						y1="6"
						x2="6"
						y2="18"></line>
					<line
						x1="6"
						y1="6"
						x2="18"
						y2="18"></line>
				</svg>
			</button>
		</div>

		<!-- Lightbox Main Stage (Infinite navigation & touch swipe for mobile) -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="relative flex min-h-0 flex-1 items-center justify-center p-2 sm:p-6 md:p-8"
			ontouchstart={handleTouchStart}
			ontouchend={handleTouchEnd}>
			<!-- Previous Image Button (Desktop / Tablet) -->
			<button
				type="button"
				onclick={prevImage}
				class="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white/90 backdrop-blur-md transition-all hover:scale-110 hover:bg-black/70 hover:text-white focus:outline-none sm:left-6 sm:h-12 sm:w-12"
				aria-label="Previous photo (infinite)">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round">
					<polyline points="15 18 9 12 15 6"></polyline>
				</svg>
			</button>

			<!-- Active Image (Centered, zero jitter) -->
			<div class="relative flex h-full max-h-[72vh] w-full max-w-5xl items-center justify-center">
				<img
					src={url_for(allImages[lightboxIndex])
						.width(1600)
						.height(1000)
						.auto('format')
						.quality(90)
						.url()}
					alt=""
					class="max-h-full max-w-full select-none rounded-lg object-contain shadow-2xl transition-all duration-200" />
			</div>

			<!-- Next Image Button (Desktop / Tablet) -->
			<button
				type="button"
				onclick={nextImage}
				class="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white/90 backdrop-blur-md transition-all hover:scale-110 hover:bg-black/70 hover:text-white focus:outline-none sm:right-6 sm:h-12 sm:w-12"
				aria-label="Next photo (infinite)">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round">
					<polyline points="9 18 15 12 9 6"></polyline>
				</svg>
			</button>
		</div>

		<!-- Lightbox Footer / Thumbnails Strip -->
		<div class="border-t border-white/10 px-4 py-3 sm:px-6 sm:py-4">
			{#if allImages.length > 1}
				<div class="flex justify-center gap-2 overflow-x-auto py-1">
					{#each allImages as imgItem, idx}
						<button
							type="button"
							onclick={() => (lightboxIndex = idx)}
							class={`relative aspect-[16/10] h-12 shrink-0 overflow-hidden rounded border-2 transition-all sm:h-14 ${
								lightboxIndex === idx
									? 'scale-105 border-secondary opacity-100'
									: 'border-transparent opacity-40 hover:opacity-80'
							}`}>
							<img
								src={url_for(imgItem).width(120).height(80).auto('format').quality(70).url()}
								alt=""
								class="h-full w-full object-cover" />
						</button>
					{/each}
				</div>
			{/if}
		</div>
	</div>
{/if}
