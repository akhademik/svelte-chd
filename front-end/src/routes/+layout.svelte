<script lang="ts">
	import '$assets/styles/main.css'
	import '$assets/styles/tailwind.css'

	import { BaseBookingModal, BaseFooter, BaseJsonLd, BaseScrollToTop, BaseSeo } from '$base'
	import { BlogDetailModal } from '$modules/blog-page'
	import { TourDetailModal } from '$modules/tour-page'
	import { browser } from '$app/environment'
	import { page } from '$app/state'
	import { persistToCookie } from '$i18n/i18n-helper'
	import { setLocale } from '$i18n/i18n-svelte'
	import type { Locales } from '$i18n/i18n-types'
	import { isLocale } from '$i18n/i18n-util'
	import { loadLocaleAsync } from '$i18n/i18n-util.async'
	import { exchangeRatesStore } from '$lib/stores/exchange-rates-store'
	import { isLocaleTransitioning } from '$lib/stores/nav-store'
	import { MobileMenu } from '$modules/mobile-menu'
	import { NavBar } from '$modules/nav-bar'
	import { Toaster } from 'svelte-french-toast'
	import { fade, fly } from 'svelte/transition'

	import type { Snippet } from 'svelte'
	import type { LayoutData } from './$types'

	let { data, children }: { data: LayoutData; children?: Snippet } = $props()
	$effect(() => {
		const rawLang = page.params.lang || (page.data as any)?.locale || data?.locale
		if (rawLang && isLocale(rawLang)) {
			const activeLocale = rawLang as Locales
			loadLocaleAsync(activeLocale).then(() => {
				setLocale(activeLocale)
			})
			if (browser) {
				document.documentElement.setAttribute('lang', activeLocale)
				persistToCookie(activeLocale)
			}
		}
		if (data?.exchangeRates) {
			exchangeRatesStore.setRates(data.exchangeRates)
		}
	})
</script>

<Toaster />
<BaseSeo />
<BaseJsonLd isRoot={true} />

<!-- Soothing anti-glare dark green overlay for seamless locale transitions -->
<div
	class="pointer-events-none fixed inset-0 z-[100] bg-primary-dark/90 backdrop-blur-sm transition-opacity duration-300 ease-in-out"
	class:opacity-100={$isLocaleTransitioning}
	class:opacity-0={!$isLocaleTransitioning}
	aria-hidden="true">
</div>

<NavBar />
<MobileMenu />

<main
	class="min-h-screen bg-background font-sans text-foreground antialiased selection:bg-surface-muted">
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
<BaseScrollToTop />

<BaseBookingModal />
<TourDetailModal />
<BlogDetailModal />
