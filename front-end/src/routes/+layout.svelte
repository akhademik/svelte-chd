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

	// Client-side locale auto-detection & localStorage preference handling
	$effect(() => {
		if (typeof window === 'undefined') return

		const currentPath = window.location.pathname
		const segments = currentPath.split('/').filter(Boolean)
		const currentUrlLang = segments[0]

		try {
			let savedLocale = localStorage.getItem('preferred_locale')
			if (savedLocale === 'vn') {
				savedLocale = 'vi'
				localStorage.setItem('preferred_locale', 'vi')
			}
			if (savedLocale && (savedLocale === 'vi' || savedLocale === 'en' || savedLocale === 'fr')) {
				// If user explicitly saved a preferred locale in localStorage, make sure cookie matches
				document.cookie = `lang=${savedLocale}; path=/; max-age=2592000; Secure; SameSite=Lax`

				// If current URL language doesn't match saved preferred locale, redirect to preferred locale
				if (
					currentUrlLang &&
					(currentUrlLang === 'vi' ||
						currentUrlLang === 'vn' ||
						currentUrlLang === 'en' ||
						currentUrlLang === 'fr')
				) {
					if (currentUrlLang !== savedLocale) {
						segments[0] = savedLocale
						const targetPath =
							'/' + segments.join('/') + window.location.search + window.location.hash
						window.location.replace(targetPath)
						return
					}
				}
			} else {
				// No saved preference in localStorage yet: detect system/browser locale
				const navLangs = navigator.languages || [navigator.language || '']
				let detected: 'vi' | 'en' | 'fr' = 'en'

				for (const l of navLangs) {
					const lower = l.toLowerCase()
					if (lower.startsWith('vi') || lower.startsWith('vn')) {
						detected = 'vi'
						break
					} else if (lower.startsWith('fr')) {
						detected = 'fr'
						break
					} else if (lower.startsWith('en')) {
						detected = 'en'
						break
					}
				}

				// Persist detected initial locale to localStorage & cookie for future visits
				localStorage.setItem('preferred_locale', detected)
				document.cookie = `lang=${detected}; path=/; max-age=2592000; Secure; SameSite=Lax`

				// Redirect if currently on a different locale
				if (
					currentUrlLang &&
					(currentUrlLang === 'vi' ||
						currentUrlLang === 'vn' ||
						currentUrlLang === 'en' ||
						currentUrlLang === 'fr')
				) {
					if (currentUrlLang !== detected) {
						segments[0] = detected
						const targetPath =
							'/' + segments.join('/') + window.location.search + window.location.hash
						window.location.replace(targetPath)
						return
					}
				}
			}
		} catch (err) {
			console.warn('Locale storage detection error:', err)
		}
	})
</script>

<Toaster />
<BaseSeo />
<BaseJsonLd isRoot={true} />
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
