<script lang="ts">
	import hero from '$assets/imgs/hero-elephant.jpg'
	import LL from '$i18n/i18n-svelte'

	import HomeHeadline from './components/home-headline.svelte'
</script>

<div class="grid min-h-[calc(100vh-70px)] items-center gap-6 md:grid-cols-2">
	<section class="flex flex-col justify-center gap-5 px-2 md:gap-10">
		<HomeHeadline />
		<p class="text-lg md:text-2xl">{$LL.home_page.intro()}</p>
		<div class="text-center [&>div]:font-bold [&>div]:uppercase">
			<!-- <VueWriter
                        :array="[LL.home_page.slogan()]"
                        :type-speed="60"
                        :erase-speed="60" /> -->
		</div>
	</section>
	<section class="flex items-center justify-center">
		<div
			class="border-primary/50 flex max-h-[80vh] items-center justify-center overflow-hidden rounded-lg border-2">
			<img
				src={hero}
				alt="elephant"
				class="h-full w-full object-cover" />
		</div>
	</section>
</div>
