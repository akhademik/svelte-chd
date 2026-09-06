<script lang="ts">
	import { page } from '$app/stores'
	import { BaseLocaleSwitcher } from '$base'
	import LL, { locale } from '$i18n/i18n-svelte'
	import { menu_items } from '$modules/nav-bar/nav-bar-logic'
	import { nav_deg, nav_mobile } from '$stores/nav-store'

	const nav_click = () => {
		nav_mobile.toggle()
		nav_deg.turn()
	}
</script>

<section
	class="fixed inset-0 z-40 flex flex-col justify-between bg-stone-50 p-8 transition-all duration-500 md:hidden"
	class:-translate-x-full={!$nav_mobile}>
	<div class="mt-20">
		<ul class="flex flex-col gap-6 font-serif text-2xl tracking-wide text-stone-900">
			{#each menu_items as { id, text, url } (id)}
				{@const fixed_url = `/${$locale}${url}`}
				{@const active = $page.url.pathname === fixed_url}
				<li>
					<a
						href={fixed_url}
						class={`transition-colors ${active ? 'italic text-secondary' : 'hover:text-secondary'}`}
						onclick={nav_click}>
						{$LL.nav_bar[text]()}
					</a>
				</li>
			{/each}
		</ul>
	</div>
	<div class="flex items-center justify-between border-t border-stone-200 pt-6">
		<BaseLocaleSwitcher />
	</div>
</section>
