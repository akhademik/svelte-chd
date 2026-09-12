<script lang="ts">
	import { page } from '$app/stores'
	import { BaseLocaleSwitcher } from '$base'
	import LL, { locale } from '$i18n/i18n-svelte'
	import { get_menu_url, menu_items } from '$modules/nav-bar/nav-bar-logic'
	import { nav_deg, nav_mobile } from '$stores/nav-store'

	const close_menu = () => {
		if ($nav_mobile) {
			nav_mobile.toggle()
			nav_deg.turn()
		}
	}

	$effect(() => {
		if (typeof document !== 'undefined') {
			if ($nav_mobile) {
				document.body.style.overflow = 'hidden'
			} else {
				document.body.style.overflow = ''
			}
			return () => {
				document.body.style.overflow = ''
			}
		}
	})
</script>

<div
	class="fixed inset-0 z-40 flex h-[100dvh] flex-col justify-between overflow-y-auto bg-surface px-6 pb-8 pt-24 transition-all duration-500 sm:px-8 md:hidden"
	class:-translate-x-full={!$nav_mobile}
	role="dialog"
	aria-modal="true"
	aria-label="Mobile navigation menu">
	<!-- Menu Nav Links -->
	<div class="my-auto py-6">
		<ul class="flex flex-col gap-6 font-serif text-2xl tracking-wide text-foreground">
			{#each menu_items as item (item.id)}
				{@const fixed_url = get_menu_url(item, $locale)}
				{@const active = $page.url.pathname === fixed_url}
				<li>
					<a
						href={fixed_url}
						class={`transition-colors ${active ? 'italic text-secondary' : 'hover:text-secondary'}`}
						onclick={close_menu}>
						{$LL.nav_bar[item.text]()}
					</a>
				</li>
			{/each}
		</ul>
	</div>

	<!-- Bottom Section with Locale Switcher aligned to the Right -->
	<div class="flex items-center justify-end border-t border-border/80 pt-6">
		<BaseLocaleSwitcher />
	</div>
</div>
