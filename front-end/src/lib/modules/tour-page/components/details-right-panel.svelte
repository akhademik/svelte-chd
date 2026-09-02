<script lang="ts">
	import { PortableText } from '@portabletext/svelte'
	import LL, { locale } from '$i18n/i18n-svelte'
	import { BaseIcon } from '$lib/base'
	import type { Tour } from '$lib/types/tour.type'
	import { format_pax_no, format_price, format_price_object } from '$lib/utils/format-data'

	export let tour: Tour
	$: prices = format_price_object(tour)
</script>

{#key tour}
	<div
		class="flex flex-col justify-center gap-4 p-5 text-primary lg:fixed lg:right-0 lg:h-full lg:w-1/2 lg:overflow-y-auto lg:px-8">
		<div class="mx-auto h-full max-w-4xl">
			<div class="my-6 flex flex-col gap-2 lg:mt-32">
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
					<table class="mx-auto mb-6 mt-3 min-w-[328px] text-primary sm:min-w-[450px]">
						<thead class="bg-primary/80">
							<tr class="capitalize text-white [&>th]:py-2">
								<th class="rounded-tl-lg">{$LL.tours.detail.pax_no()}</th>
								<th class="rounded-tr-lg">{$LL.tours.detail.price()}</th>
							</tr>
						</thead>
						<tbody
							class="[&>tr:last-child]:border-b-4 [&>tr:last-child]:border-primary/80 [&>tr:nth-child(even)]:bg-secondary/50 [&>tr>td:nth-child(2)]:pr-3 [&>tr>td:nth-child(2)]:text-right [&>tr>td]:py-1.5 [&>tr>td]:pl-3">
							{#each prices as [pax, price] (pax)}
								{@const solo = format_pax_no(pax) === '01'}
								{@const group =
									$LL.tours.detail.group() +
									' ' +
									format_pax_no(pax) +
									' ' +
									$LL.tours.detail.pax()}
								<tr>
									<!-- <td>Group of {format_pax_no(pax)} pax {solo}</td> -->
									<td>{solo ? $LL.tours.detail.solo() : group} </td>
									<td class="lowercase"
										>{format_price(price, $locale)} /{$LL.tours.detail.pax()}</td>
								</tr>
							{/each}
						</tbody>
					</table>
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
