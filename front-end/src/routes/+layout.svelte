<script lang="ts">
	import '$assets/styles/main.css'
	import '$assets/styles/tailwind.css'

	import {
		BaseBlogDetailModal,
		BaseBookingModal,
		BaseFooter,
		BaseJsonLd,
		BaseScrollToTop,
		BaseSeo,
		BaseTourDetailModal,
	} from '$base'
	import { browser } from '$app/environment'
	import { page } from '$app/state'
	import { persist_to_cookie } from '$i18n/i18n-helper'
	import { setLocale } from '$i18n/i18n-svelte'
	import type { Locales } from '$i18n/i18n-types'
	import { isLocale } from '$i18n/i18n-util'
	import { loadLocaleAsync } from '$i18n/i18n-util.async'
	import { exchange_rates_store } from '$lib/stores/exchange-rates-store'
	import { is_locale_transitioning } from '$lib/stores/nav-store'
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
				persist_to_cookie(activeLocale)
			}
		}
		if (data?.exchangeRates) {
			exchange_rates_store.setRates(data.exchangeRates)
		}
	})
</script>

<Toaster />
<BaseSeo />
<BaseJsonLd isRoot={true} />

<!-- Soothing anti-glare dark green overlay for seamless locale transitions -->
<div
	class="pointer-events-none fixed inset-0 z-[100] bg-primary-dark/90 backdrop-blur-sm transition-opacity duration-300 ease-in-out"
	class:opacity-100={$is_locale_transitioning}
	class:opacity-0={!$is_locale_transitioning}
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
<BaseTourDetailModal />
<BaseBlogDetailModal />
