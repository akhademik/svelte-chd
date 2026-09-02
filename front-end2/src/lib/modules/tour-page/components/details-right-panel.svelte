<script lang="ts">
	import { PortableText } from '@portabletext/svelte'
	import LL, { locale } from '$i18n/i18n-svelte'
	import { booking_modal } from '$lib/stores/booking-store'
	import type { Tour } from '$lib/types/tour.type'
	import { format_pax_no, format_price, format_price_object } from '$lib/utils/format-data'

	interface Props {
		tour: Tour
	}

	let { tour }: Props = $props()
	let prices = $derived(format_price_object(tour))
	let title = $derived(tour.tour_name?.[$locale] || tour.tour_name?.en || 'Tour')
</script>

<div
	class="flex w-full flex-1 flex-col justify-start gap-6 bg-stone-50 p-6 text-stone-900 lg:h-full lg:overflow-y-auto lg:p-12 lg:pt-16">
	<div class="mx-auto w-full max-w-2xl">
		<!-- Introduction -->
		<div class="my-4 flex flex-col gap-3">
			<p class="border-b border-stone-200 pb-2 font-serif text-lg text-stone-900">
				{$LL.tours.detail.intro()}
			</p>
			<article class="text-sm font-light leading-relaxed text-stone-600">
				<PortableText
					value={tour.tour_intro?.[$locale] || []}
					components={{}} />
			</article>
		</div>

		<!-- Highlights -->
		{#if tour.tour_highlights?.length}
			<div class="my-6 flex flex-col gap-3">
				<p class="border-b border-stone-200 pb-2 font-serif text-lg text-stone-900">
					{$LL.tours.detail.highlights()}
				</p>
				<ul class="space-y-2.5 text-sm font-light text-stone-700">
					{#each tour.tour_highlights as { highlights }}
						{#if highlights?.[$locale]}
							<li class="flex items-start gap-3">
								<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta"></span>
								<span>{highlights[$locale]}</span>
							</li>
						{/if}
					{/each}
				</ul>
			</div>
		{/if}

		<!-- Itinerary -->
		{#if tour.tour_itinerary?.[$locale]}
			<div class="my-6 flex flex-col gap-3">
				<p class="border-b border-stone-200 pb-2 font-serif text-lg text-stone-900">
					{$LL.tours.detail.itinerary()}
				</p>
				<article class="text-sm font-light leading-relaxed text-stone-600">
					<PortableText
						value={tour.tour_itinerary[$locale]}
						components={{}} />
				</article>
			</div>
		{/if}

		<!-- Price Table -->
		{#if prices.length > 0}
			<div class="my-6 flex flex-col gap-3">
				<div class="flex items-center justify-between border-b border-stone-200 pb-2">
					<p class="font-serif text-lg text-stone-900">
						{$LL.tours.detail.price()}
					</p>
					<button
						onclick={() => booking_modal.open(title)}
						class="bg-stone-900 px-4 py-2 text-xs uppercase tracking-widest text-stone-50 transition-colors hover:bg-stone-800">
						Book This Tour
					</button>
				</div>
				<div class="overflow-x-auto">
					<table class="my-3 w-full border border-stone-200 text-left text-sm">
						<thead class="bg-stone-100 text-xs uppercase tracking-wider text-stone-700">
							<tr>
								<th class="px-4 py-3 font-semibold">{$LL.tours.detail.pax_no()}</th>
								<th class="px-4 py-3 text-right font-semibold">{$LL.tours.detail.price()}</th>
							</tr>
						</thead>
						<tbody class="divide-y divide-stone-100 bg-white">
							{#each prices as [pax, price] (pax)}
								{@const solo = format_pax_no(pax) === '01'}
								{@const group = `${$LL.tours.detail.group()} ${format_pax_no(pax)} ${$LL.tours.detail.pax()}`}
								<tr class="transition-colors hover:bg-stone-50">
									<td class="px-4 py-3 text-stone-800">
										{solo ? $LL.tours.detail.solo() : group}
									</td>
									<td class="px-4 py-3 text-right font-medium text-stone-900">
										{format_price(price, $locale)}
										<span class="text-xs font-normal text-stone-400"
											>/{$LL.tours.detail.pax()}</span>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		{/if}

		<!-- Includes -->
		{#if tour.tour_includes?.length}
			<div class="my-6 flex flex-col gap-3 pb-8">
				<p class="border-b border-stone-200 pb-2 font-serif text-lg text-stone-900">
					{$LL.tours.detail.inclusion()}
				</p>
				<ul class="space-y-2 text-sm font-light text-stone-700">
					{#each tour.tour_includes as item}
						{#if item?.[$locale]}
							<li class="flex items-start gap-3">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round">
									<polyline points="20 6 9 17 4 12"></polyline>
								</svg>
								<span>{item[$locale]}</span>
							</li>
						{/if}
					{/each}
				</ul>
			</div>
		{/if}
	</div>
</div>
