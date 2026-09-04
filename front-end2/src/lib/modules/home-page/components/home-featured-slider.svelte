<script lang="ts">
	import { locale } from '$i18n/i18n-svelte'
	import { booking_modal } from '$lib/stores/booking-store'
	import { tour_modal } from '$lib/stores/modal-store'
	import type { Tour } from '$lib/types/tour.type'
	import { format_price } from '$lib/utils/format-data'
	import { url_for } from '$lib/utils/sanity'
	import { fade } from 'svelte/transition'

	interface Props {
		tours: Tour[]
	}

	let { tours }: Props = $props()

	let hotTours = $derived(tours.filter(t => t.best_sell))
	let currentIndex = $state(0)
	let timer = $state<any>(null)

	const nextSlide = () => {
		if (hotTours.length > 0) {
			currentIndex = (currentIndex + 1) % hotTours.length
		}
	}

	const prevSlide = () => {
		if (hotTours.length > 0) {
			currentIndex = (currentIndex - 1 + hotTours.length) % hotTours.length
		}
	}

	const handleKeydown = (e: KeyboardEvent) => {
		if (e.key === 'ArrowRight') {
			nextSlide()
		} else if (e.key === 'ArrowLeft') {
			prevSlide()
		}
	}

	$effect(() => {
		if (hotTours.length > 1) {
			timer = setInterval(nextSlide, 7000)
			return () => clearInterval(timer)
		}
	})

	let currentTour = $derived(hotTours[currentIndex])
	let title = $derived(
		currentTour?.tour_name?.[$locale] || currentTour?.tour_name?.en || 'Featured Tour'
	)
	let price = $derived(currentTour?.tour_price?.pax2 || currentTour?.tour_price?.pax1 || 0)
	let duration = $derived(
		currentTour?.tour_duration?.[$locale] || currentTour?.tour_duration?.en || 'Full Day'
	)
</script>

<svelte:window onkeydown={handleKeydown} />

{#if hotTours.length > 0 && currentTour}
	<section class="relative overflow-hidden border-b border-stone-200 bg-stone-950 text-stone-100">
		<!-- Background image with subtle overlay -->
		<div class="absolute inset-0 z-0 overflow-hidden bg-stone-950">
			{#key currentIndex}
				{#if currentTour.img_cover?.asset}
					<img
						transition:fade={{ duration: 500 }}
						src={url_for(currentTour.img_cover)
							.width(1600)
							.height(900)
							.auto('format')
							.quality(80)
							.url()}
						alt={currentTour.img_cover?.caption || title}
						class="absolute inset-0 h-full w-full object-cover opacity-35 brightness-90 filter" />
				{/if}
			{/key}
			<div
				class="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/80 to-stone-950/40">
			</div>
		</div>

		<div class="relative z-10 mx-auto max-w-6xl px-6 py-20 lg:py-28">
			<div class="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
				<div class="w-full max-w-2xl">
					<!-- Badge & Header -->
					<div class="mb-4 flex h-7 items-center gap-3">
						<span
							class="inline-flex items-center gap-1.5 bg-terracotta px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white shadow-md">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-3.5 w-3.5"
								viewBox="0 0 24 24"
								fill="currentColor"
								><path
									d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.784 1.399 8.169-7.333-3.856-7.333 3.856 1.399-8.169-5.934-5.784 8.2-1.192zm0 5.702l-2.232 4.522-4.991.725 3.612 3.521-.852 4.972 4.463-2.347 4.463 2.347-.852-4.972 3.612-3.521-4.991-.725z" /></svg>
							<span
								>{$locale === 'vn'
									? 'Tour Nổi Bật / Bán Chạy'
									: $locale === 'fr'
										? 'Coups de Cœur'
										: 'Featured & Best Seller'}</span>
						</span>
						{#if currentTour.tour_id}
							<span
								class="border border-stone-700 bg-stone-900/80 px-2.5 py-0.5 font-mono text-xs text-stone-300">
								{currentTour.tour_id}
							</span>
						{/if}
						<span class="text-xs uppercase tracking-wider text-stone-400">
							{duration}
						</span>
					</div>

					<!-- Tour Title -->
					<div class="mb-5 min-h-[4.5rem] sm:min-h-[5.5rem] lg:min-h-[6.5rem]">
						<h2
							class="line-clamp-2 font-serif text-3xl font-normal leading-tight text-white sm:text-4xl lg:text-5xl">
							<button
								type="button"
								class="text-left font-serif text-white transition-colors hover:text-stone-300"
								onclick={() => tour_modal.open(currentTour)}>
								{title}
							</button>
						</h2>
					</div>

					<!-- Tour Highlights List -->
					<div class="mb-8 min-h-[4.5rem] space-y-2">
						{#if currentTour.tour_highlights?.length}
							{#each currentTour.tour_highlights.slice(0, 3) as item}
								{@const hlText = item?.highlights?.[$locale] || item?.highlights?.en || ''}
								{#if hlText}
									<div
										class="flex items-center gap-2.5 text-xs font-light text-stone-300 sm:text-sm">
										<span class="h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta"></span>
										<span class="line-clamp-1">{hlText}</span>
									</div>
								{/if}
							{/each}
						{/if}
					</div>

					<!-- Tags -->
					<div class="mb-8 flex min-h-[1.75rem] flex-wrap gap-2">
						{#if currentTour.tour_tags?.length}
							{#each currentTour.tour_tags as tag}
								{@const tagName =
									tag?.tour_tags?.[$locale] ||
									tag?.tour_tags?.en ||
									tag?.tourTags?.[$locale] ||
									tag?.tourTags?.en}
								{#if tagName}
									<span
										class="border border-stone-700/60 bg-stone-900/60 px-2.5 py-0.5 text-[11px] font-medium tracking-wide text-stone-300 backdrop-blur-sm">
										#{tagName}
									</span>
								{/if}
							{/each}
						{/if}
					</div>

					<!-- Action Buttons -->
					<div class="flex flex-wrap items-center gap-4">
						<button
							onclick={() => tour_modal.open(currentTour)}
							class="bg-white px-7 py-3.5 text-xs font-semibold uppercase tracking-widest text-stone-950 transition-colors hover:bg-stone-200">
							{$locale === 'vn'
								? 'Xem Chi Tiết Tour'
								: $locale === 'fr'
									? 'Voir les Détails'
									: 'View Details'}
						</button>
						<button
							onclick={() => booking_modal.open(title)}
							class="border border-stone-600 px-7 py-3.5 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:border-white hover:bg-white/10">
							{$locale === 'vn' ? 'Đặt Ngay' : $locale === 'fr' ? 'Réserver' : 'Book Now'}
						</button>
					</div>
				</div>

				<!-- Price & Slide Navigation -->
				<div
					class="flex flex-col justify-between self-stretch border-t border-stone-800 pt-6 lg:items-end lg:border-t-0 lg:pt-0">
					<div class="lg:text-right">
						<span class="block text-xs uppercase tracking-widest text-stone-400">
							{$locale === 'vn' ? 'Giá chỉ từ' : $locale === 'fr' ? 'À partir de' : 'Starting From'}
						</span>
						<div class="mt-1 flex items-baseline gap-1 lg:justify-end">
							<span class="font-serif text-3xl font-normal text-white sm:text-4xl">
								{format_price(price, $locale)}
							</span>
							<span class="text-xs font-light text-stone-400">/ pax</span>
						</div>
					</div>

					{#if hotTours.length > 1}
						<div class="mt-8 flex items-center gap-3">
							<button
								type="button"
								onclick={prevSlide}
								class="flex h-11 w-11 items-center justify-center border border-stone-700 bg-stone-900/80 text-stone-300 transition-colors hover:border-white hover:text-white"
								aria-label="Previous featured tour">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-4 w-4"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
							</button>

							<div class="flex gap-1.5 px-2">
								{#each hotTours as _, idx}
									<button
										type="button"
										onclick={() => (currentIndex = idx)}
										class={`h-1.5 rounded-full transition-all ${
											currentIndex === idx
												? 'w-6 bg-terracotta'
												: 'w-2 bg-stone-700 hover:bg-stone-500'
										}`}
										aria-label={`Go to slide ${idx + 1}`}></button>
								{/each}
							</div>

							<button
								type="button"
								onclick={nextSlide}
								class="flex h-11 w-11 items-center justify-center border border-stone-700 bg-stone-900/80 text-stone-300 transition-colors hover:border-white hover:text-white"
								aria-label="Next featured tour">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-4 w-4"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
							</button>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</section>
{/if}
