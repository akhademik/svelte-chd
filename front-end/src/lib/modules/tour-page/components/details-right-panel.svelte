<script lang="ts">
	import { PortableText } from '@portabletext/svelte'
	import LL, { locale } from '$i18n/i18n-svelte'
	import { BaseIcon } from '$lib/base'
	import type { Tour } from '$lib/types/tour.type'
	import { format_pax_no, format_price, format_price_object } from '$lib/utils/format-data'

	export let tour: Tour
	$: prices = format_price_object(tour)
</script>

<div
	class="text-primary flex flex-col justify-center gap-4 p-5 lg:fixed lg:right-0 lg:h-full lg:w-1/2 lg:overflow-y-auto lg:px-8">
	<div class="mx-auto h-full max-w-4xl">
		<div class="my-6 flex flex-col gap-2 lg:mt-32">
			<p
				class="before:bg-primary/30 text-secondary relative pb-2 font-bold before:absolute before:bottom-0 before:h-[1px] before:w-full">
				{$LL.tours.detail.intro()}
			</p>
			<article class="px-2">
				<PortableText
					value={tour.tour_intro[$locale]}
					components={{}} />
			</article>
		</div>
		<ul class="flex flex-col gap-2">
			<p
				class="before:bg-primary/30 text-secondary relative pb-2 font-bold before:absolute before:bottom-0 before:h-[1px] before:w-full">
				{$LL.tours.detail.highlights()}
			</p>

			{#each tour.tour_highlights as { highlights }, index (index)}
				<li class="flex gap-2">
					<BaseIcon
						name="arrow_right"
						class="text-secondary w-6" />
					{highlights[$locale]}
				</li>
			{/each}
		</ul>

		<div class="my-6 flex flex-col gap-2">
			<p
				class="before:bg-primary/30 text-secondary relative pb-2 font-bold before:absolute before:bottom-0 before:h-[1px] before:w-full">
				{$LL.tours.detail.itinerary()}
			</p>
			<article class="px-2">
				<PortableText
					value={tour.tour_itinerary[$locale]}
					components={{}} />
			</article>
		</div>

		<div class="my-6 flex flex-col gap-2">
			<p
				class="before:bg-primary/30 text-secondary relative pb-2 font-bold before:absolute before:bottom-0 before:h-[1px] before:w-full">
				{$LL.tours.detail.price()}
			</p>
			<table class="text-primary mx-auto mb-6 mt-3 min-w-[328px] sm:min-w-[450px]">
				<thead class="bg-primary/80">
					<tr class="capitalize text-white [&>th]:py-2">
						<th class="rounded-tl-lg">{$LL.tours.detail.pax_no()}</th>
						<th class="rounded-tr-lg">{$LL.tours.detail.price()}</th>
					</tr>
				</thead>
				<tbody
					class="[&>tr:nth-child(even)]:bg-secondary/50 [&>tr:last-child]:border-primary/80 [&>tr:last-child]:border-b-4 [&>tr>td:nth-child(2)]:pr-3 [&>tr>td:nth-child(2)]:text-right [&>tr>td]:py-1.5 [&>tr>td]:pl-3">
					{#each prices as [pax, price] (pax)}
						{@const solo = format_pax_no(pax) === '01'}
						{@const group =
							$LL.tours.detail.group() + ' ' + format_pax_no(pax) + ' ' + $LL.tours.detail.pax()}
						<tr>
							<!-- <td>Group of {format_pax_no(pax)} pax {solo}</td> -->
							<td>{solo ? $LL.tours.detail.solo() : group} </td>
							<td class="lowercase">{format_price(price, $locale)} /{$LL.tours.detail.pax()}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<ul class="flex flex-col gap-2 pb-10">
			<p
				class="before:bg-primary/30 relative pb-2 font-bold before:absolute before:bottom-0 before:h-[1px] before:w-full">
				{$LL.tours.detail.inclusion()}
			</p>
			{#each tour.tour_includes as item, index (index)}
				<li class="relative flex gap-2">
					<BaseIcon
						name="checked_mark"
						class="text-secondary w-6" />

					{item[$locale]}
				</li>
			{/each}
		</ul>
	</div>
</div>
