<script lang="ts">
	import { goto, preloadData } from '$app/navigation'
	import { page } from '$app/stores'
	import { persistToCookie, replaceLocaleInUrl } from '$i18n/i18n-helper'
	import { locale, setLocale } from '$i18n/i18n-svelte'
	import type { Locales } from '$i18n/i18n-types'
	import { locales } from '$i18n/i18n-util'
	import { loadLocaleAsync } from '$i18n/i18n-util.async'
	import { isLocaleTransitioning, navDeg, navMobile } from '$stores/nav-store'

	let isSwitching = $state(false)

	const switchLocale = async (newLocale: Locales) => {
		if ($navMobile) {
			navMobile.toggle()
			navDeg.turn()
		}
		if (!newLocale || $locale === newLocale || isSwitching) return

		isSwitching = true
		isLocaleTransitioning.set(true)

		try {
			const targetUrl = replaceLocaleInUrl(url, newLocale)

			// Preload dictionary and page data while fading out
			await Promise.all([
				loadLocaleAsync(newLocale),
				preloadData(targetUrl).catch(() => null),
				new Promise(r => setTimeout(r, 220)),
			])

			setLocale(newLocale)
			persistToCookie(newLocale)

			await goto(targetUrl, { invalidateAll: true, noScroll: true, keepFocus: true })
		} finally {
			setTimeout(() => {
				isLocaleTransitioning.set(false)
				isSwitching = false
			}, 60)
		}
	}

	let url = $derived($page.url)
</script>

<div class="flex items-center gap-1 text-xs uppercase tracking-wider">
	{#each locales as l, index (l)}
		{#if index > 0}
			<span class="text-border-strong">/</span>
		{/if}
		<a
			href={replaceLocaleInUrl(url, l)}
			onclick={e => {
				e.preventDefault()
				switchLocale(l)
			}}
			class={`inline-flex min-h-[36px] min-w-[32px] items-center justify-center px-2 py-1.5 transition-all ${
				l === $locale
					? 'border-b-[1.5px] border-foreground font-bold text-primary'
					: 'text-foreground-subtle hover:text-secondary'
			}`}>
			{l.toUpperCase()}
		</a>
	{/each}
</div>
