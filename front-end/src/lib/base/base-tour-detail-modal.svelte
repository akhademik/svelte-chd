<script lang="ts">
	import { pushState, replaceState } from '$app/navigation'
	import { page } from '$app/stores'
	import { PortableText } from '@portabletext/svelte'
	import LL, { locale } from '$i18n/i18n-svelte'
	import type { Locales } from '$i18n/i18n-types'
	import { booking_modal } from '$lib/stores/booking-store'
	import { tour_modal } from '$lib/stores/modal-store'
	import { format_pax_no, format_price, format_price_object } from '$lib/utils/format-data'
	import { get_tour_slug, url_for } from '$lib/utils/sanity'
	import { fade, scale } from 'svelte/transition'
	import BasePortableTextImage from './base-portable-text-image.svelte'
	import BasePortableTextListItem from './base-portable-text-list-item.svelte'

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

	let isOpen = $derived($tour_modal.isOpen)
	let tour = $derived($tour_modal.tour)
	let activeLang = $derived(($page.params.lang as Locales) || $locale || 'en')

	let title = $derived(tour?.tour_name?.[activeLang] || tour?.tour_name?.en || 'Tour')
	let duration = $derived(tour?.tour_duration?.[activeLang] || tour?.tour_duration?.en || '')
	let intro = $derived(tour?.tour_intro?.[activeLang] || tour?.tour_intro?.en || [])
	let itinerary = $derived(tour?.tour_itinerary?.[activeLang] || tour?.tour_itinerary?.en)
	let highlights = $derived(tour?.tour_highlights || [])
	let includes = $derived(tour?.tour_includes || [])
	let prices = $derived(tour ? format_price_object(tour) : [])
	let minPrice = $derived(tour?.tour_price?.pax2 || tour?.tour_price?.pax1 || 0)
	let imgCover = $derived(tour?.img_cover)
	let imgTour = $derived(tour?.img_tour || [])
	let tourTags = $derived(tour?.tour_tags || [])

	let allImages = $derived.by(() => {
		const imgs: any[] = []
		if (imgCover?.asset) imgs.push(imgCover)
		if (imgTour?.length) {
			imgTour.forEach((img: any) => {
				if (img?.asset) imgs.push(img)
			})
		}
		return imgs
	})

	let activeImageIndex = $state(0)
	let previousPath = $state('')

	$effect(() => {
		if (isOpen && tour) {
			activeImageIndex = 0
			if (typeof document !== 'undefined') {
				document.body.style.overflow = 'hidden'
			}

			if (typeof window !== 'undefined') {
				previousPath = window.location.pathname + window.location.search
				const slug = get_tour_slug(tour, activeLang) || tour.tour_id || ''
				const tourType =
					tour.tour_duration?.vn?.includes('ngày') ||
					tour.tour_duration?.en?.includes('day') ||
					tour.tour_duration?.en?.includes('Day')
						? 'day-tours'
						: 'highland-tours'
				if (slug && !window.location.pathname.includes(slug)) {
					pushState(`/${activeLang}/${tourType}/${slug}`, { modal: true })
				}
			}

			return () => {
				if (typeof document !== 'undefined') {
					document.body.style.overflow = ''
				}
				if (typeof window !== 'undefined' && previousPath) {
					replaceState(previousPath, {})
				}
			}
		}
	})

	const close = () => {
		tour_modal.close()
	}

	const handleBook = () => {
		if (tour) {
			const tourTitle = title
			close()
			booking_modal.open(tourTitle)
		}
	}

	const handleModalKeydown = (e: KeyboardEvent) => {
		if (!isOpen) return
		if (e.key === 'Escape') {
			close()
		} else if (e.key === 'ArrowLeft' && allImages.length > 1) {
			activeImageIndex = (activeImageIndex - 1 + allImages.length) % allImages.length
		} else if (e.key === 'ArrowRight' && allImages.length > 1) {
			activeImageIndex = (activeImageIndex + 1) % allImages.length
		}
	}
</script>

<svelte:window onkeydown={handleModalKeydown} />

{#if isOpen && tour}
	<div
		transition:fade={{ duration: 200 }}
		class="fixed inset-0 z-[60] flex items-center justify-center bg-inverse-dark/60 p-0 backdrop-blur-sm sm:p-4 md:p-6"
		role="dialog"
		aria-modal="true"
		aria-labelledby="modal-tour-title">
		<button
			type="button"
			class="fixed inset-0 h-full w-full cursor-default bg-transparent focus:outline-none"
			aria-label="Close modal overlay"
			onclick={close}
			tabindex="-1"></button>
		<div
			transition:scale={{ start: 0.96, duration: 200 }}
			class="relative z-10 flex h-full max-h-screen w-full max-w-4xl flex-col overflow-hidden rounded-none border-0 bg-surface text-foreground shadow-2xl sm:h-auto sm:max-h-[90vh] sm:border sm:border-border">
			{#key activeLang}
				<!-- Modal Header (Sticky top) -->
				<div
					class="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-surface/95 px-4 py-3 backdrop-blur-md sm:px-6 sm:py-4">
					<div class="flex items-center gap-2 text-foreground-muted">
						{#if tour.tour_id}
							<span
								class="bg-inverse px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-inverse-foreground">
								{tour.tour_id}
							</span>
						{/if}
						{#if duration}
							<span class="flex items-center gap-1.5 text-xs font-light text-foreground-muted">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-3.5 w-3.5 text-foreground-subtle"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round">
									<circle
										cx="12"
										cy="10"
										r="3"></circle>
									<polyline points="12 6 12 12 16 14"></polyline>
								</svg>
								<span>{duration}</span>
							</span>
						{/if}
					</div>
					<button
						onclick={close}
						class="flex h-8 w-8 items-center justify-center rounded-full text-foreground-subtle transition-colors hover:bg-surface-muted hover:text-foreground"
						aria-label="Close">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="1.5"
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

				<!-- Modal Body (Scrollable) -->
				<div class="space-y-6 overflow-y-auto p-4 sm:space-y-8 sm:p-6 md:p-8">
					<!-- Title & Tags & Duration -->
					<div>
						<div class="mb-2 flex flex-wrap items-center gap-2">
							{#if tour.best_sell}
								<span
									class="bg-secondary px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white shadow-sm">
									★ Best Sell
								</span>
							{/if}
							{#if tourTags?.length}
								{#each tourTags as tag}
									{@const tagName =
										tag?.tour_tags?.[activeLang] ||
										tag?.tour_tags?.en ||
										tag?.tourTags?.[activeLang] ||
										tag?.tourTags?.en}
									{#if tagName}
										<span
											class="border border-border bg-surface px-2.5 py-0.5 text-[10px] font-medium tracking-wide text-foreground-muted">
											#{tagName}
										</span>
									{/if}
								{/each}
							{/if}
						</div>

						<h2
							id="modal-tour-title"
							class="font-serif text-2xl font-normal leading-tight text-foreground sm:text-3xl lg:text-4xl">
							{title}
						</h2>
					</div>

					<!-- Interactive Image Gallery -->
					{#if allImages.length > 0}
						<div class="space-y-3">
							<!-- Main Featured Image -->
							<div
								class="relative aspect-[16/10] w-full overflow-hidden bg-inverse shadow-sm sm:aspect-[16/9]">
								{#key activeImageIndex}
									<img
										transition:fade={{ duration: 200 }}
										src={url_for(allImages[activeImageIndex])
											.width(1000)
											.height(625)
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
										class="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
										aria-label="Previous image">
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
										class="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
										aria-label="Next image">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-4 w-4"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
									</button>
									<div
										class="absolute bottom-3 right-3 z-10 rounded-full bg-black/60 px-2.5 py-0.5 text-[11px] font-light text-white backdrop-blur-sm">
										{activeImageIndex + 1} / {allImages.length}
									</div>
								{/if}
							</div>

							<!-- Thumbnails -->
							{#if allImages.length > 1}
								<div class="flex gap-2.5 overflow-x-auto pb-1">
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
												src={url_for(imgItem)
													.width(160)
													.height(100)
													.auto('format')
													.quality(70)
													.url()}
												alt={`Thumbnail ${idx + 1}`}
												class="h-full w-full object-cover" />
										</button>
									{/each}
								</div>
							{/if}
						</div>
					{/if}

					<!-- Quick Highlights Bar -->
					<div
						class="grid grid-cols-3 gap-3 border border-border/90 bg-surface p-4 text-xs shadow-sm sm:gap-4">
						<div>
							<span
								class="mb-0.5 block text-[10px] uppercase tracking-wider text-foreground-subtle">
								{activeLang === 'vn' ? 'Khởi hành' : activeLang === 'fr' ? 'Départ' : 'Departure'}
							</span>
							<span class="font-medium text-foreground">Buôn Ma Thuột</span>
						</div>
						<div>
							<span
								class="mb-0.5 block text-[10px] uppercase tracking-wider text-foreground-subtle">
								{activeLang === 'vn' ? 'Thời lượng' : activeLang === 'fr' ? 'Durée' : 'Duration'}
							</span>
							<span class="font-medium text-foreground">{duration || '1 Day'}</span>
						</div>
						<div>
							<span
								class="mb-0.5 block text-[10px] uppercase tracking-wider text-foreground-subtle">
								{activeLang === 'vn'
									? 'Quy mô nhóm'
									: activeLang === 'fr'
										? 'Groupe'
										: 'Group Size'}
							</span>
							<span class="font-medium text-foreground">1 - 10+ {$LL.tours.detail.pax()}</span>
						</div>
					</div>

					<!-- Tour Overview / Intro -->
					{#if intro && (Array.isArray(intro) ? intro.length > 0 : true)}
						<div>
							<h3
								class="mb-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-foreground sm:text-sm">
								{$LL.tours.detail.intro()}
							</h3>
							<div class="text-sm font-light leading-relaxed text-foreground-muted sm:text-base">
								<PortableText
									value={intro}
									components={portableTextComponents} />
							</div>
						</div>
					{/if}

					<!-- Highlights -->
					{#if highlights.length > 0}
						<div>
							<h3
								class="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-foreground sm:text-sm">
								{$LL.tours.detail.highlights()}
							</h3>
							<div class="space-y-3">
								{#each highlights as item}
									{@const hlText = item?.highlights?.[activeLang] || item?.highlights?.en || ''}
									{#if hlText}
										<div
											class="flex items-start gap-3 text-sm font-light text-foreground-muted sm:text-base">
											<span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary"></span>
											<span>{hlText}</span>
										</div>
									{/if}
								{/each}
							</div>
						</div>
					{/if}

					<!-- Itinerary -->
					{#if itinerary}
						<div>
							<h3
								class="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-foreground sm:text-sm">
								{$LL.tours.detail.itinerary()}
							</h3>
							<div class="text-sm font-light leading-relaxed text-foreground-muted sm:text-base">
								<PortableText
									value={itinerary}
									components={portableTextComponents} />
							</div>
						</div>
					{/if}

					<!-- Price Table & Inclusions -->
					<div class="grid grid-cols-1 gap-6 border-t border-border pt-4 md:grid-cols-2">
						<!-- Inclusions -->
						<div class="border border-border/90 bg-surface p-5 shadow-sm sm:p-6">
							<h4
								class="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 sm:text-sm">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-4 w-4 text-emerald-600"
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
									<polyline points="9 12 12 15 16 10"></polyline>
								</svg>
								<span>{$LL.tours.detail.inclusion()}</span>
							</h4>
							{#if includes.length > 0}
								<ul class="space-y-2.5 text-xs font-light text-foreground-muted sm:text-sm">
									{#each includes as inc}
										{@const incText = inc?.[activeLang] || inc?.en || ''}
										{#if incText}
											<li class="flex items-start gap-2.5">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													class="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													stroke-width="2"
													stroke-linecap="round"
													stroke-linejoin="round">
													<polyline points="20 6 9 17 4 12"></polyline>
												</svg>
												<span>{incText}</span>
											</li>
										{/if}
									{/each}
								</ul>
							{:else}
								<p class="text-xs font-light italic text-foreground-subtle sm:text-sm">
									{activeLang === 'vn'
										? 'Xe đưa đón, hướng dẫn viên, nước uống & vé tham quan trọn gói.'
										: 'Transportation, local guide, entrance tickets & bottled water included.'}
								</p>
							{/if}
						</div>

						<!-- Price Table -->
						<div class="border border-border/90 bg-surface p-5 shadow-sm sm:p-6">
							{#if prices.length > 0}
								<div class="overflow-x-auto">
									<table class="w-full text-left text-xs sm:text-sm">
										<thead class="bg-surface-muted uppercase tracking-wider text-foreground">
											<tr>
												<th class="px-3 py-2.5 font-medium">{$LL.tours.detail.pax_no()}</th>
												<th class="px-3 py-2.5 text-right font-medium"
													>{$LL.tours.detail.price()}</th>
											</tr>
										</thead>
										<tbody class="divide-y divide-border">
											{#each prices as [pax, price]}
												{@const paxText = `${format_pax_no(pax)} ${$LL.tours.detail.pax()}`}
												<tr class="transition-colors hover:bg-surface-muted/50">
													<td class="px-3 py-2.5 text-foreground">
														{paxText}
													</td>
													<td class="px-3 py-2.5 text-right font-medium text-foreground">
														{format_price(price, activeLang)}
														<span class="text-[11px] font-normal text-foreground-subtle sm:text-xs"
															>/{$LL.tours.detail.pax()}</span>
													</td>
												</tr>
											{/each}
										</tbody>
									</table>
								</div>
							{:else}
								<p class="text-xs font-light text-foreground-subtle sm:text-sm">
									{format_price(minPrice, activeLang)} / {$LL.tours.detail.pax()}
								</p>
							{/if}
						</div>
					</div>
				</div>

				<!-- Modal Footer (Sticky bottom) -->
				<div
					class="sticky bottom-0 z-10 flex items-center justify-end gap-3 border-t border-border bg-surface px-4 py-3.5 sm:px-6 sm:py-4">
					<div class="flex w-full items-center justify-end gap-3 sm:w-auto">
						<button
							onclick={close}
							class="w-1/2 border border-border-strong px-5 py-2.5 text-xs uppercase tracking-wider text-foreground transition-colors hover:border-foreground hover:text-foreground sm:w-auto">
							{activeLang === 'vn' ? 'Đóng' : activeLang === 'fr' ? 'Fermer' : 'Close'}
						</button>
						<button
							onclick={handleBook}
							class="w-1/2 bg-primary px-6 py-2.5 text-xs uppercase tracking-widest text-white shadow-sm transition-colors hover:bg-primary-hover sm:w-auto">
							{$LL.tours.detail.plan_this_trip()}
						</button>
					</div>
				</div>
			{/key}
		</div>
	</div>
{/if}
