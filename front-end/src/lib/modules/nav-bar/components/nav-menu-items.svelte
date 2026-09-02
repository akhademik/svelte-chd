<script lang="ts">
	import { page } from '$app/stores'
	import LL, { locale } from '$i18n/i18n-svelte'

	import { menu_items } from '../nav-bar-logic'
</script>

<section
	class="hidden items-center gap-1 text-sm font-bold uppercase md:flex [&>.active]:bg-secondary">
	{#each menu_items as { url, id, text } (id)}
		{@const fixed_url = `/${$locale}${url}`}
		{@const active = $page.url.pathname === fixed_url}
		<a
			href={fixed_url}
			class="px-3 py-[2px] transition-all duration-500 hover:bg-secondary"
			class:active
			>{$LL.nav_bar[text]()}
		</a>
	{/each}
</section>
