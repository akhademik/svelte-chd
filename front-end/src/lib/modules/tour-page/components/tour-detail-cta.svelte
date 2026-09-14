<script lang="ts">
	import LL, { locale } from '$i18n/i18n-svelte'
	import type { Tour } from '$lib/types/tour.type'

	interface Props {
		tour: Tour
		title: string
		duration: string
	}

	let { tour, title, duration }: Props = $props()
</script>

<div class="rounded-xl border border-border bg-inverse p-6 text-white shadow-lg">
	<h4 class="font-serif text-lg font-medium">
		{$LL.tours.customize_trip()}
	</h4>
	<p class="mt-2 text-xs font-light leading-relaxed text-inverse-foreground">
		{$LL.tours.customize_desc()}
	</p>
	<a
		href={`/${$locale}/contact?tour=${encodeURIComponent(title)}&duration=${encodeURIComponent(duration || '')}&code=${encodeURIComponent(tour.tour_id || '')}`}
		class="mt-5 flex w-full items-center justify-center gap-2 bg-secondary py-3.5 text-xs font-medium uppercase tracking-widest text-white transition-colors hover:bg-secondary-hover">
		{$LL.tours.plan_trip()}
	</a>
</div>
