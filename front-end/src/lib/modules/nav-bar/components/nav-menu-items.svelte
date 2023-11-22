<script lang="ts">
	import LL from '$i18n/i18n-svelte'

	import { menu_items } from '../nav-bar-logic'
</script>

<section
	class="[&>.router-link-exact-active]:bg-secondary hidden items-center gap-1 text-sm font-bold uppercase md:flex">
	{#each menu_items as { url, id, text } (id)}
		<a
			href={url}
			class="hover:bg-secondary px-3 py-[2px] transition-all duration-500"
			>{$LL.nav_bar[text]()}
		</a>
	{/each}
</section>
