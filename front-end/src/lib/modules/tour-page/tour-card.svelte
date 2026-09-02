<script lang="ts">
	import { PortableText } from '@portabletext/svelte'
	import { page } from '$app/stores'
	import { BaseButton, BaseIcon } from '$base'
	import LL, { locale } from '$i18n/i18n-svelte'
	import type { Tour } from '$lib/types/tour.type'
	import { format_price } from '$utils/format-data'
	import { get_tour_slug, url_for } from '$utils/sanity'

	interface Props {
		tour: Tour
	}

	let { tour }: Props = $props()

	let img_cover = $derived(tour.img_cover)
	let tour_duration = $derived(tour.tour_duration)
	let tour_name = $derived(tour.tour_name)
	let tour_intro = $derived(tour.tour_intro)
	let tour_price = $derived(tour.tour_price)
	let slug = $derived(get_tour_slug(tour, $locale))
	let detail_href = $derived(`/${$locale}/${$page.params.tourtype}/${slug}`)
</script>

<div
	class="flex h-full w-full max-w-[355px] flex-col justify-between overflow-hidden rounded-lg border border-secondary shadow-2xl transition-all duration-300 hover:shadow-primary/20">
	<div class="flex flex-1 flex-col">
		<div class="relative aspect-square h-44 w-full overflow-hidden rounded-t-lg bg-primary/10">
			{#if img_cover?.asset}
				<img
					src={url_for(img_cover).width(400).height(240).auto('format').quality(60).url()}
					alt={img_cover.caption || tour_name?.[$locale] || 'Tour'}
					class="h-full w-full object-cover transition-transform duration-300 hover:scale-105" />
			{/if}
		</div>
		<section class="flex flex-1 flex-col gap-2 p-3.5">
			<p
				class="mx-auto flex w-max items-center justify-center gap-1.5 rounded-lg px-2.5 py-1 text-xs shadow-sm shadow-secondary/50">
				<BaseIcon
					name="duration"
					class="w-4" />
				<span class="font-medium">{tour_duration?.[$locale] || ''}</span>
			</p>
			<p class="line-clamp-2 min-h-[3rem] text-center font-bold capitalize text-secondary">
				{tour_name?.[$locale] || ''}
			</p>
			<div class="line-clamp-4 flex-1 border-t border-primary/20 pt-2 text-sm text-primary/80">
				<PortableText
					value={tour_intro?.[$locale] || []}
					components={{}} />
			</div>
		</section>
	</div>
	<section
		class="flex items-center justify-between border-t border-primary/10 bg-slate-50/50 px-3 py-2.5">
		<a href={detail_href}>
			<BaseButton text={$LL.tours.click_detail()} />
		</a>
		<div class="text-right">
			<p class="-mb-0.5 text-xs text-primary/70">{$LL.tours.price_from()}</p>
			<p class="font-bold text-secondary">{format_price(tour_price?.pax2 || 0, $locale)}</p>
		</div>
	</section>
</div>
