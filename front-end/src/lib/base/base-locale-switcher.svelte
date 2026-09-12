<script lang="ts">
	import { goto, preloadData } from '$app/navigation'
	import { page } from '$app/stores'
	import { persist_to_cookie, replace_locale_in_url } from '$i18n/i18n-helper'
	import { locale, setLocale } from '$i18n/i18n-svelte'
	import type { Locales } from '$i18n/i18n-types'
	import { locales } from '$i18n/i18n-util'
	import { loadLocaleAsync } from '$i18n/i18n-util.async'
	import { is_locale_transitioning, nav_deg, nav_mobile } from '$stores/nav-store'

	let isSwitching = $state(false)

	const switch_locale = async (new_locale: Locales) => {
		if ($nav_mobile) {
			nav_mobile.toggle()
			nav_deg.turn()
		}
		if (!new_locale || $locale === new_locale || isSwitching) return

		isSwitching = true
		is_locale_transitioning.set(true)

		try {
			const targetUrl = replace_locale_in_url(url, new_locale)

			// Preload dictionary and page data while fading out
			await Promise.all([
				loadLocaleAsync(new_locale),
				preloadData(targetUrl).catch(() => null),
				new Promise(r => setTimeout(r, 220)),
			])

			setLocale(new_locale)
			persist_to_cookie(new_locale)

			await goto(targetUrl, { invalidateAll: true, noScroll: true, keepFocus: true })
		} finally {
			setTimeout(() => {
				is_locale_transitioning.set(false)
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
			href={replace_locale_in_url(url, l)}
			onclick={e => {
				e.preventDefault()
				switch_locale(l)
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
