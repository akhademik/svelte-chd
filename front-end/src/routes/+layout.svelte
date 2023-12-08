<script lang="ts">
	import '$assets/styles/main.css'
	import '$assets/styles/tailwind.css'

	import { BaseSeo } from '$base'
	import { setLocale } from '$i18n/i18n-svelte'
	import { MobileMenu } from '$modules/mobile-menu'
	import { NavBar } from '$modules/nav-bar'
	import { Toaster } from 'svelte-french-toast'
	import { fly } from 'svelte/transition'

	export let data
	setLocale(data.locale)
</script>

<Toaster />
<BaseSeo />
<NavBar />
<MobileMenu />

<main class="text-primary font-roboto mx-auto max-w-7xl px-3 py-2 xl:px-0">
	<slot />
</main>
