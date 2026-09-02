<script lang="ts">
	import { browser } from '$app/environment'
	import { invalidateAll } from '$app/navigation'
	import { page } from '$app/stores'
	import { persist_to_cookie, replace_locale_in_url } from '$i18n/i18n-helper'
	import { locale, setLocale } from '$i18n/i18n-svelte'
	import type { Locales } from '$i18n/i18n-types'
	import { locales } from '$i18n/i18n-util'
	import { loadLocaleAsync } from '$i18n/i18n-util.async'
	import { nav_mobile } from '$stores/nav-store'

	const switch_locale = async (new_locale: Locales, update_history_state = true) => {
		if ($nav_mobile) nav_mobile.toggle()
		if (!new_locale || $locale === new_locale) return

		await loadLocaleAsync(new_locale)
		setLocale(new_locale)
		persist_to_cookie(new_locale)

		if (update_history_state) {
			history.pushState({ locale: new_locale }, '', replace_locale_in_url(url, new_locale))
		}

		invalidateAll()
	}

	const handle_pop_state_event = async ({ state }: PopStateEvent) =>
		switch_locale(state.locale, false)

	let url = $derived($page.url)
	let lang = $derived($page.params.lang as Locales)

	$effect(() => {
		if (browser && lang && lang !== $locale) {
			document.querySelector('html')!.setAttribute('lang', lang)
			switch_locale(lang, false)
			history.replaceState({ ...history.state, locale: lang }, '', replace_locale_in_url(url, lang))
		}
	})
</script>

<svelte:window onpopstate={handle_pop_state_event} />

<div class="flex items-center gap-1 text-xs uppercase tracking-wider">
	{#each locales as l, index (l)}
		{#if index > 0}
			<span class="text-stone-300">/</span>
		{/if}
		<a
			href={replace_locale_in_url(url, l)}
			onclick={e => {
				e.preventDefault()
				switch_locale(l)
			}}
			class={`px-2 py-1 transition-all ${
				l === $locale
					? 'border-b-[1.5px] border-stone-900 font-semibold text-stone-900'
					: 'text-stone-400 hover:text-stone-800'
			}`}>
			{l.toUpperCase()}
		</a>
	{/each}
</div>
