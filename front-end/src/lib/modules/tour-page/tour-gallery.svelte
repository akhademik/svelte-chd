<script lang="ts">
	import { page } from '$app/stores'
	import LL from '$i18n/i18n-svelte'
	import type { Translation } from '$i18n/i18n-types'

	type Intro = keyof Translation['tours']

	$: intro = ($page.params.tourtype === 'day-tours' ? 'intro_day' : 'intro_central') as Intro
</script>

<div>
	<div class="flex flex-col items-center gap-5 py-5">
		<h1
			class="before:bg-secondary relative font-bold uppercase before:absolute before:-bottom-1 before:left-[15%] before:h-1 before:w-[70%]">
			{$LL.tours[intro]()}
		</h1>
		<p>{$LL.tours.description()}</p>
	</div>

	<section
		class="mx-auto grid justify-items-center gap-2 sm:grid-cols-2 md:max-w-2xl lg:max-w-5xl lg:grid-cols-3">
		<!-- <TourCard
			v-for="(tour, index) in tours"
			:key="index"
			:tour="tour" /> -->
	</section>
</div>
