<script lang="ts">
	import { PortableText } from '@portabletext/svelte'
	import LL, { locale } from '$i18n/i18n-svelte'
	import { BaseIcon } from '$lib/base'
	import type { Tour } from '$lib/types/tour.type'
	import { format_pax_no, format_price, format_price_object } from '$lib/utils/format-data'

	interface Props {
		tour: Tour
	}

	let { tour }: Props = $props()
	let prices = $derived(format_price_object(tour))
</script>

{#key tour}
	<div
		class="flex w-full flex-1 flex-col justify-start gap-4 p-5 text-primary lg:h-full lg:overflow-y-auto lg:p-10 lg:pt-16">
		<div class="mx-auto w-full max-w-2xl">
			<div class="my-4 flex flex-col gap-2">
				<p
					class="relative pb-2 font-bold text-secondary before:absolute before:bottom-0 before:h-[1px] before:w-full before:bg-primary/30">
					{$LL.tours.detail.intro()}
				</p>
				<article class="px-2">
					<PortableText
						value={tour.tour_intro?.[$locale] || []}
						components={{}} />
				</article>
			</div>
			{#if tour.tour_highlights?.length}
				<ul class="flex flex-col gap-2">
					<p
						class="relative pb-2 font-bold text-secondary before:absolute before:bottom-0 before:h-[1px] before:w-full before:bg-primary/30">
						{$LL.tours.detail.highlights()}
					</p>

					{#each tour.tour_highlights as { highlights }, index (index)}
						{#if highlights?.[$locale]}
							<li class="flex gap-2">
								<BaseIcon
									name="arrow_right"
									class="w-6 text-secondary" />
								{highlights[$locale]}
							</li>
						{/if}
					{/each}
				</ul>
			{/if}

			{#if tour.tour_itinerary?.[$locale]}
				<div class="my-6 flex flex-col gap-2">
					<p
						class="relative pb-2 font-bold text-secondary before:absolute before:bottom-0 before:h-[1px] before:w-full before:bg-primary/30">
						{$LL.tours.detail.itinerary()}
					</p>
					<article class="px-2">
						<PortableText
							value={tour.tour_itinerary[$locale]}
							components={{}} />
					</article>
				</div>
			{/if}

			{#if prices.length > 0}
				<div class="my-6 flex flex-col gap-2">
					<p
						class="relative pb-2 font-bold text-secondary before:absolute before:bottom-0 before:h-[1px] before:w-full before:bg-primary/30">
						{$LL.tours.detail.price()}
					</p>
					<div class="overflow-x-auto">
						<table class="my-3 w-full max-w-xl text-left font-roboto text-sm sm:text-base">
							<thead class="bg-primary text-white">
								<tr class="capitalize">
									<th class="rounded-tl-lg px-4 py-3 font-semibold">{$LL.tours.detail.pax_no()}</th>
									<th class="rounded-tr-lg px-4 py-3 text-right font-semibold"
										>{$LL.tours.detail.price()}</th>
								</tr>
							</thead>
							<tbody class="divide-y divide-primary/10 border-b-2 border-primary/40 bg-slate-50/50">
								{#each prices as [pax, price] (pax)}
									{@const solo = format_pax_no(pax) === '01'}
									{@const group =
										$LL.tours.detail.group() +
										' ' +
										format_pax_no(pax) +
										' ' +
										$LL.tours.detail.pax()}
									<tr class="transition-colors hover:bg-secondary/20">
										<td class="px-4 py-2.5 font-medium text-primary"
											>{solo ? $LL.tours.detail.solo() : group}</td>
										<td class="px-4 py-2.5 text-right font-bold text-secondary">
											{format_price(price, $locale)}
											<span class="text-xs font-normal text-primary/70"
												>/{$LL.tours.detail.pax()}</span>
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</div>
			{/if}

			{#if tour.tour_includes?.length}
				<ul class="flex flex-col gap-2 pb-10">
					<p
						class="relative pb-2 font-bold before:absolute before:bottom-0 before:h-[1px] before:w-full before:bg-primary/30">
						{$LL.tours.detail.inclusion()}
					</p>
					{#each tour.tour_includes as item, index (index)}
						{#if item?.[$locale]}
							<li class="relative flex gap-2">
								<BaseIcon
									name="checked_mark"
									class="w-6 text-secondary" />

								{item[$locale]}
							</li>
						{/if}
					{/each}
				</ul>
			{/if}
		</div>
	</div>
{/key}
