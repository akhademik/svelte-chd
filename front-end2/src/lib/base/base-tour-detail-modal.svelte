<script lang="ts">
	import { PortableText } from '@portabletext/svelte'
	import LL, { locale } from '$i18n/i18n-svelte'
	import { booking_modal } from '$lib/stores/booking-store'
	import { tour_modal } from '$lib/stores/modal-store'
	import { format_pax_no, format_price, format_price_object } from '$lib/utils/format-data'
	import { url_for } from '$lib/utils/sanity'
	import { fade, scale } from 'svelte/transition'

	let isOpen = $derived($tour_modal.isOpen)
	let tour = $derived($tour_modal.tour)

	let title = $derived(tour?.tour_name?.[$locale] || tour?.tour_name?.en || 'Tour')
	let duration = $derived(tour?.tour_duration?.[$locale] || tour?.tour_duration?.en || '')
	let intro = $derived(tour?.tour_intro?.[$locale] || tour?.tour_intro?.en || [])
	let itinerary = $derived(tour?.tour_itinerary?.[$locale] || tour?.tour_itinerary?.en)
	let highlights = $derived(tour?.tour_highlights || [])
	let includes = $derived(tour?.tour_includes || [])
	let prices = $derived(tour ? format_price_object(tour) : [])
	let minPrice = $derived(tour?.tour_price?.pax2 || tour?.tour_price?.pax1 || 0)
	let imgCover = $derived(tour?.img_cover)
	let imgTour = $derived(tour?.img_tour || [])

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
</script>

<svelte:window onkeydown={e => e.key === 'Escape' && isOpen && close()} />

{#if isOpen && tour}
	<div
		transition:fade={{ duration: 200 }}
		class="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-4 md:p-6"
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
			class="relative z-10 flex h-[90vh] max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-2xl border-t border-stone-200 bg-stone-50 text-stone-900 shadow-2xl sm:h-auto sm:max-h-[90vh] sm:rounded-none sm:border">
			<!-- Modal Header (Sticky top) -->
			<div
				class="sticky top-0 z-10 flex items-center justify-between border-b border-stone-200 bg-white/95 px-4 py-3 backdrop-blur-sm sm:px-6 sm:py-4">
				<div class="flex flex-wrap items-center gap-2 sm:gap-3">
					{#if tour.tour_id}
						<span
							class="bg-stone-900 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-stone-100">
							{tour.tour_id}
						</span>
					{/if}
					{#if duration}
						<span class="flex items-center gap-1.5 text-xs font-light text-stone-600">
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
							<span>{duration}</span>
						</span>
					{/if}
				</div>

				<button
					onclick={close}
					class="rounded-full p-2 text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-900 focus:outline-none"
					aria-label="Close modal">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
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

			<!-- Modal Body (Scrollable) -->
			<div class="space-y-6 overflow-y-auto p-4 sm:space-y-8 sm:p-6 md:p-8">
				<!-- Title & Duration -->
				<div>
					<h2
						id="modal-tour-title"
						class="font-serif text-2xl font-normal leading-tight text-stone-950 sm:text-3xl lg:text-4xl">
						{title}
					</h2>
					{#if imgCover?.caption}
						<p class="mt-1 text-xs font-light italic text-stone-500 sm:text-sm">
							{imgCover.caption}
						</p>
					{/if}
				</div>

				<!-- Image Gallery: 1 main image + sub images if available -->
				<div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
					<div
						class={`aspect-[16/10] overflow-hidden bg-stone-200 ${imgTour.length > 0 ? 'sm:col-span-2' : 'sm:col-span-3'}`}>
						{#if imgCover?.asset}
							<img
								src={url_for(imgCover).width(800).height(500).auto('format').quality(80).url()}
								alt={imgCover.caption || title}
								class="h-full w-full object-cover" />
						{/if}
					</div>

					{#if imgTour.length > 0}
						<div class="grid grid-cols-2 gap-3 sm:grid-cols-1">
							{#each imgTour.slice(0, 2) as imgItem, idx}
								{#if imgItem?.asset}
									<div class="aspect-[16/10] overflow-hidden bg-stone-200">
										<img
											src={url_for(imgItem).width(400).height(250).auto('format').quality(75).url()}
											alt={`${title} photo ${idx + 1}`}
											class="h-full w-full object-cover" />
									</div>
								{/if}
							{/each}
						</div>
					{/if}
				</div>

				<!-- Quick Highlights Bar -->
				<div
					class="grid grid-cols-2 gap-3 border border-stone-200/90 bg-white p-4 text-xs shadow-sm sm:grid-cols-4 sm:gap-4">
					<div>
						<span class="mb-0.5 block text-[10px] uppercase tracking-wider text-stone-400">
							{$locale === 'vn' ? 'Khởi hành' : $locale === 'fr' ? 'Départ' : 'Departure'}
						</span>
						<span class="font-medium text-stone-800">Buôn Ma Thuột</span>
					</div>
					<div>
						<span class="mb-0.5 block text-[10px] uppercase tracking-wider text-stone-400">
							{$locale === 'vn' ? 'Thời lượng' : $locale === 'fr' ? 'Durée' : 'Duration'}
						</span>
						<span class="font-medium text-stone-800">{duration || '1 Day'}</span>
					</div>
					<div>
						<span class="mb-0.5 block text-[10px] uppercase tracking-wider text-stone-400">
							{$locale === 'vn' ? 'Quy mô nhóm' : $locale === 'fr' ? 'Groupe' : 'Group Size'}
						</span>
						<span class="font-medium text-stone-800">1 - 10+ {$LL.tours.detail.pax()}</span>
					</div>
					<div>
						<span class="mb-0.5 block text-[10px] uppercase tracking-wider text-stone-400">
							{$LL.tours.price_from()}
						</span>
						<span class="text-sm font-semibold text-terracotta">
							{format_price(minPrice, $locale)}
						</span>
					</div>
				</div>

				<!-- Tour Overview / Intro -->
				{#if intro && (Array.isArray(intro) ? intro.length > 0 : true)}
					<div>
						<h3 class="mb-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-stone-900">
							{$LL.tours.detail.intro()}
						</h3>
						<div class="text-xs font-light leading-relaxed text-stone-600 sm:text-sm">
							<PortableText
								value={intro}
								components={{}} />
						</div>
					</div>
				{/if}

				<!-- Highlights -->
				{#if highlights.length > 0}
					<div>
						<h3 class="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-stone-900">
							{$LL.tours.detail.highlights()}
						</h3>
						<div class="space-y-2.5">
							{#each highlights as item}
								{@const hlText = item?.highlights?.[$locale] || item?.highlights?.en || ''}
								{#if hlText}
									<div class="flex items-start gap-3 text-xs font-light text-stone-700 sm:text-sm">
										<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta"></span>
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
						<h3 class="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-stone-900">
							{$LL.tours.detail.itinerary()}
						</h3>
						<div class="text-xs font-light leading-relaxed text-stone-600 sm:text-sm">
							<PortableText
								value={itinerary}
								components={{}} />
						</div>
					</div>
				{/if}

				<!-- Price Table & Inclusions -->
				<div class="grid grid-cols-1 gap-6 border-t border-stone-200 pt-4 md:grid-cols-2">
					<!-- Inclusions -->
					<div class="border border-stone-200/90 bg-white p-4 shadow-sm sm:p-5">
						<h4
							class="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800">
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
							<ul class="space-y-2 text-xs font-light text-stone-600">
								{#each includes as inc}
									{@const incText = inc?.[$locale] || inc?.en || ''}
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
							<p class="text-xs font-light italic text-stone-500">
								{$locale === 'vn'
									? 'Xe đưa đón, hướng dẫn viên, nước uống & vé tham quan trọn gói.'
									: 'Transportation, local guide, entrance tickets & bottled water included.'}
							</p>
						{/if}
					</div>

					<!-- Price Table -->
					<div class="border border-stone-200/90 bg-white p-4 shadow-sm sm:p-5">
						<h4
							class="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-900">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-4 w-4 text-stone-600"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round">
								<rect
									x="2"
									y="5"
									width="20"
									height="14"
									rx="2"></rect>
								<line
									x1="2"
									y1="10"
									x2="22"
									y2="10"></line>
							</svg>
							<span>{$LL.tours.detail.price()}</span>
						</h4>
						{#if prices.length > 0}
							<div class="overflow-x-auto">
								<table class="w-full text-left text-xs">
									<thead class="bg-stone-100 uppercase tracking-wider text-stone-600">
										<tr>
											<th class="px-3 py-2 font-medium">{$LL.tours.detail.pax_no()}</th>
											<th class="px-3 py-2 text-right font-medium">{$LL.tours.detail.price()}</th>
										</tr>
									</thead>
									<tbody class="divide-y divide-stone-100">
										{#each prices as [pax, price]}
											{@const solo = format_pax_no(pax) === '01'}
											{@const group = `${$LL.tours.detail.group()} ${format_pax_no(pax)} ${$LL.tours.detail.pax()}`}
											<tr class="transition-colors hover:bg-stone-50">
												<td class="px-3 py-2 text-stone-700">
													{solo ? $LL.tours.detail.solo() : group}
												</td>
												<td class="px-3 py-2 text-right font-medium text-stone-900">
													{format_price(price, $locale)}
													<span class="text-[10px] font-normal text-stone-400"
														>/{$LL.tours.detail.pax()}</span>
												</td>
											</tr>
										{/each}
									</tbody>
								</table>
							</div>
						{:else}
							<p class="text-xs font-light text-stone-500">
								{format_price(minPrice, $locale)} / {$LL.tours.detail.pax()}
							</p>
						{/if}
					</div>
				</div>
			</div>

			<!-- Modal Footer (Sticky bottom) -->
			<div
				class="sticky bottom-0 z-10 flex flex-col items-center justify-between gap-3 border-t border-stone-200 bg-white px-4 py-3.5 sm:flex-row sm:px-6 sm:py-4">
				<div class="flex w-full items-baseline justify-between gap-2 sm:w-auto sm:justify-start">
					<span class="text-[10px] uppercase tracking-wider text-stone-400">
						{$LL.tours.price_from()}
					</span>
					<div>
						<span class="font-serif text-xl font-normal text-stone-950 sm:text-2xl">
							{format_price(minPrice, $locale)}
						</span>
						<span class="text-xs font-light text-stone-500"> / {$LL.tours.detail.pax()}</span>
					</div>
				</div>

				<div class="flex w-full items-center gap-3 sm:w-auto">
					<button
						onclick={close}
						class="w-1/2 border border-stone-300 px-5 py-2.5 text-xs uppercase tracking-wider text-stone-700 transition-colors hover:border-stone-900 hover:text-stone-900 sm:w-auto">
						{$locale === 'vn' ? 'Đóng' : $locale === 'fr' ? 'Fermer' : 'Close'}
					</button>
					<button
						onclick={handleBook}
						class="w-1/2 bg-stone-900 px-6 py-2.5 text-xs uppercase tracking-widest text-stone-50 shadow-sm transition-colors hover:bg-stone-800 sm:w-auto">
						{$locale === 'vn'
							? 'Đặt Tour Này'
							: $locale === 'fr'
								? 'Réserver ce circuit'
								: 'Book This Tour'}
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}
