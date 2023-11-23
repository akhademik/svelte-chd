<script lang="ts">
	import { BaseLocaleSwitcher } from '$base'
	import LL, { locale } from '$i18n/i18n-svelte'
	import NavContactUs from '$modules/nav-bar/components/nav-contact-us.svelte'
	import { menu_items } from '$modules/nav-bar/nav-bar-logic'
	import { nav_deg, nav_mobile } from '$stores/nav-store'

	const nav_click = () => {
		nav_mobile.toggle()
		nav_deg.turn()
	}

	$: menu_hidden = !$nav_mobile && '-translate-x-[100%]'
	$: fr_style = $locale === 'fr' ? `text-[6vmin]` : `text-[8vmin]`
</script>

<section
	class={`fixed inset-0 z-40 flex items-center bg-white transition-all duration-700 md:hidden ${menu_hidden}
		`}>
	<ul
		class={`text-secondary flex flex-col gap-3 pl-6 font-bold uppercase tracking-wide ${fr_style}`}>
		{#each menu_items as { id, text, url } (id)}
			{@const fixed_url = `/${$locale}${url}`}
			<li
				class="[&>.router-link-exact-active]:bg-primary hover:bg-primary w-max transition-colors duration-300">
				<a
					href={fixed_url}
					class="p-2"
					on:click={nav_click}
					>{$LL.nav_bar[text]()}
				</a>
			</li>
		{/each}
	</ul>
	<div class="absolute bottom-2 flex w-full justify-between px-4">
		<BaseLocaleSwitcher />
		<NavContactUs />
	</div>
</section>
