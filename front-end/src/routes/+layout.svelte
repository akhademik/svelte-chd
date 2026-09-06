<script lang="ts">
	import '$assets/styles/main.css'
	import '$assets/styles/tailwind.css'

	import {
		BaseBlogDetailModal,
		BaseBookingModal,
		BaseFooter,
		BaseSeo,
		BaseTourDetailModal,
	} from '$base'
	import { page } from '$app/state'
	import { setLocale } from '$i18n/i18n-svelte'
	import { exchange_rates_store } from '$lib/stores/exchange-rates-store'
	import { MobileMenu } from '$modules/mobile-menu'
	import { NavBar } from '$modules/nav-bar'
	import { Toaster } from 'svelte-french-toast'
	import { fade, fly } from 'svelte/transition'

	import type { Snippet } from 'svelte'
	import type { LayoutData } from './$types'

	let { data, children }: { data: LayoutData; children?: Snippet } = $props()
	$effect(() => {
		if (data?.locale) {
			setLocale(data.locale)
		}
		if (data?.exchangeRates) {
			exchange_rates_store.setRates(data.exchangeRates)
		}
	})
</script>

<Toaster />
<BaseSeo />
<NavBar />
<MobileMenu />

<main class="min-h-screen bg-sand font-sans text-stone-800 antialiased selection:bg-sand-alt">
	{#if children}
		{#key page.url.pathname}
			<div
				in:fly={{ y: 16, duration: 400, delay: 100 }}
				out:fade={{ duration: 150 }}>
				{@render children()}
			</div>
		{/key}
	{/if}
</main>

<BaseFooter />
<BaseBookingModal />
<BaseTourDetailModal />
<BaseBlogDetailModal />
