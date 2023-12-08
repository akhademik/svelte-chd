<script lang="ts">
	import hero from '$assets/imgs/hero-elephant.jpg'
	import { BaseTypewriter } from '$base'
	import LL from '$i18n/i18n-svelte'
	import { onMount } from 'svelte'
	import { fly } from 'svelte/transition'

	import HomeHeadline from './components/home-headline.svelte'

	let loaded = false
	onMount(() => {
		loaded = true
	})
</script>

{#if loaded}
	<div
		class="grid min-h-[calc(100vh-70px)] items-center gap-6 md:grid-cols-2"
		transition:fly={{ x: 200, duration: 800, delay: 300 }}>
		<section class="flex flex-col justify-center gap-5 px-2 md:gap-10">
			<HomeHeadline />
			<p class="text-lg md:text-2xl">{$LL.home_page.intro()}</p>
			<BaseTypewriter text={$LL.home_page.slogan()} />
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
{/if}
