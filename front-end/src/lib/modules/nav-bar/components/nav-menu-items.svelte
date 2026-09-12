<script lang="ts">
	import { page } from '$app/stores'
	import LL, { locale } from '$i18n/i18n-svelte'

	import { get_menu_url, is_menu_active, menu_items } from '../nav-bar-logic'
</script>

<nav class="hidden items-center space-x-10 text-sm tracking-wide text-foreground-muted md:flex">
	{#each menu_items as item (item.id)}
		{@const fixed_url = get_menu_url(item, $locale)}
		{@const active = is_menu_active(item, $page.url.pathname, $locale)}
		<a
			href={fixed_url}
			class={`transition-colors duration-200 ${
				active ? 'font-bold text-primary' : 'hover:text-secondary'
			}`}>
			{$LL.nav_bar[item.text]()}
		</a>
	{/each}
</nav>
