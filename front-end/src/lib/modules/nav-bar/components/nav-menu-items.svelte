<script lang="ts">
	import { page } from '$app/stores'
	import LL, { locale } from '$i18n/i18n-svelte'

	import { getMenuUrl, isMenuActive, menuItems } from '../nav-bar-logic'
</script>

<nav class="hidden items-center space-x-10 text-sm tracking-wide text-foreground-muted md:flex">
	{#each menuItems as item (item.id)}
		{@const fixedUrl = getMenuUrl(item, $locale)}
		{@const active = isMenuActive(item, $page.url.pathname, $locale)}
		<a
			href={fixedUrl}
			class={`transition-colors duration-200 ${
				active ? 'font-bold text-primary' : 'hover:text-secondary'
			}`}>
			{$LL.nav_bar[item.text]()}
		</a>
	{/each}
</nav>
