<script lang="ts">
	import { PortableText } from '@portabletext/svelte'
	import { page } from '$app/stores'
	import { BaseButton, BaseIcon } from '$base'
	import LL, { locale } from '$i18n/i18n-svelte'
	import type { Tour } from '$lib/types/tour.type'
	import { format_price } from '$utils/format-data'
	import { url_for } from '$utils/sanity'

	export let tour: Tour

	const { img_cover, tour_duration, tour_name, tour_intro, tour_slug, tour_price } = tour
	$: detail_href = `/${$locale}/${$page.params.tourtype}/${tour_slug.current}`
</script>

<div class="flex max-w-[355px] flex-col gap-3 rounded-lg border border-secondary shadow-2xl">
	<div class="relative aspect-square h-40 overflow-hidden rounded-t-lg">
		<img
			src={url_for(img_cover).width(400).auto('format').quality(60).url()}
			alt={img_cover.caption}
			class="h-full w-full object-cover" />
	</div>
	<section class="flex flex-col gap-3 px-3">
		<p
			class="mx-auto flex w-max items-center justify-center gap-2 rounded-lg px-2 py-1 shadow-sm shadow-secondary">
			<BaseIcon
				name="duration"
				class="w-5" />
			<span class="text-sm">{tour_duration[$locale]}</span>
		</p>
		<p class="font-bold capitalize text-secondary">
			{tour_name[$locale]}
		</p>
		<span class="line-clamp-6 border-y py-3 pb-1">
			<PortableText
				value={tour_intro[$locale]}
				components={{}} />
		</span>
	</section>
	<section class="flex items-center justify-between px-2 pb-2">
		<a href={detail_href}>
			<BaseButton text={$LL.tours.click_detail()} />
		</a>
		<div class="text-right">
			<p class="-mb-1 text-xs">{$LL.tours.price_from()}</p>
			<p class="font-bold text-secondary">{format_price(tour_price.pax2, $locale)}</p>
		</div>
	</section>
</div>
