<script lang="ts">
	import { page } from '$app/stores'
	import LL, { locale } from '$i18n/i18n-svelte'

	import { menu_items } from '../nav-bar-logic'
</script>

<nav class="hidden items-center space-x-10 text-sm tracking-wide text-stone-600 md:flex">
	{#each menu_items as { url, id, text } (id)}
		{@const fixed_url = `/${$locale}${url}`}
		{@const active = $page.url.pathname === fixed_url}
		<a
			href={fixed_url}
			class={`transition-colors duration-200 ${
				active ? 'font-bold text-primary' : 'hover:text-secondary'
			}`}>
			{$LL.nav_bar[text]()}
		</a>
	{/each}
</nav>
