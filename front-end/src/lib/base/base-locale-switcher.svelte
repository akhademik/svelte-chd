<script lang="ts">
	import { browser } from '$app/environment'
	import { invalidateAll } from '$app/navigation'
	import { page } from '$app/stores'
	import { BaseIcon } from '$base'
	import { persist_to_cookie, replace_locale_in_url } from '$i18n/i18n-helper'
	import { locale, setLocale } from '$i18n/i18n-svelte'
	import type { Locales } from '$i18n/i18n-types'
	import { locales } from '$i18n/i18n-util'
	import { loadLocaleAsync } from '$i18n/i18n-util.async'
	import { nav_mobile } from '$stores/nav-store'

	const switch_locale = async (new_locale: Locales, update_history_state = true) => {
		$nav_mobile && nav_mobile.toggle()
		if (!new_locale || $locale === new_locale) return

		await loadLocaleAsync(new_locale)
		setLocale(new_locale)
		persist_to_cookie(new_locale)

		if (update_history_state) {
			// update url to reflect locale changes
			history.pushState({ locale: new_locale }, '', replace_locale_in_url(url, new_locale))
		}

		// run the `load` function again
		invalidateAll()
	}

	// update `lang` attribute

	// update locale when navigating via browser back/forward buttons
	const handle_pop_state_event = async ({ state }: PopStateEvent) =>
		switch_locale(state.locale, false)

	const css = {
		active: 'border-primary md:order-1 border-[1px]',
		in_active: 'md:order-3',
	}

	$: url = $page.url
	$: lang = $page.params.lang as Locales
	$: browser && document.querySelector('html')!.setAttribute('lang', $locale)
	$: if (browser) {
		switch_locale(lang, false)
		history.replaceState({ ...history.state, locale: lang }, '', replace_locale_in_url(url, lang))
	}
</script>

<svelte:window on:popstate={handle_pop_state_event} />
<section
	class="flex items-center gap-3 overflow-hidden px-2 transition-all duration-500 md:absolute md:h-[25px] md:flex-col hover:md:h-[100px]">
	{#each locales as new_locale, index (index)}
		<a
			class={new_locale === $locale ? css.active : css.in_active}
			href={replace_locale_in_url(url, new_locale)}>
			<BaseIcon
				name={`flag_${new_locale}`}
				class="w-5" />
		</a>
	{/each}
</section>
