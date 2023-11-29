<script lang="ts">
	import { PortableText } from '@portabletext/svelte'
	import { page } from '$app/stores'
	import { BaseButton, BaseIcon } from '$base'
	import LL, { locale } from '$i18n/i18n-svelte'
	import { format_price, url_for } from '$utils/sanity'

	export let tour

	const { img_cover, tour_duration, tour_name, tour_intro, tour_slug, tour_price } = tour
	const tour_detail = `/${$locale}/${$page.params.tourtype}/${tour_slug.current}`
</script>

<div class="border-secondary flex max-w-[355px] flex-col gap-3 rounded-lg border shadow-2xl">
	<div class="relative aspect-square h-40 overflow-hidden rounded-t-lg">
		<img
			src={url_for(img_cover).width(400).auto('format').quality(60).url()}
			alt={img_cover.caption}
			class="h-full w-full object-cover" />
	</div>
	<section class="flex flex-col gap-3 px-3">
		<p
			class="shadow-secondary mx-auto flex w-max items-center justify-center gap-2 rounded-lg px-2 py-1 shadow-sm">
			<BaseIcon
				name="duration"
				class="w-5" />
			<span class="text-sm">{tour_duration[$locale]}</span>
		</p>
		<p class="text-secondary font-bold capitalize">
			{tour_name[$locale]}
		</p>
		<span class="line-clamp-6 border-y py-3 pb-1">
			<PortableText
				value={tour_intro[$locale]}
				components={{}} />
		</span>
	</section>
	<section class="flex items-center justify-between px-2 pb-2">
		<a href={tour_detail}>
			<BaseButton text={$LL.tours.click_detail()} />
		</a>
		<div class="text-right">
			<p class="-mb-1 text-xs">{$LL.tours.price_from()}</p>
			<p class="text-secondary font-bold">{format_price(tour_price.pax2, $locale)}</p>
		</div>
	</section>
</div>
