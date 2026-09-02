<script lang="ts">
	import { BaseLocaleSwitcher, BaseLogo } from '$base'
	import { nav_animate_hidden } from '$lib/stores/nav-store'
	import { onMount } from 'svelte'
	import { fly } from 'svelte/transition'

	import NavBurgerButton from './components/nav-burger-button.svelte'
	import NavContactUs from './components/nav-contact-us.svelte'
	import NavMenuItems from './components/nav-menu-items.svelte'

	let loaded = false
	onMount(() => {
		loaded = true
	})
</script>

{#if loaded}
	<div
		class="h-12"
		transition:fly={{ x: -200, duration: 600 }}>
		<nav
			class="fixed top-0 z-50 w-full bg-white/80 px-3 py-2 backdrop-blur-[2px] md:border-b md:border-b-primary/50"
			class:hidden={$nav_animate_hidden}>
			<div
				class="flex items-center justify-between font-roboto text-lg text-primary md:mx-auto md:max-w-7xl">
				<BaseLogo />
				<NavMenuItems />
				<div class="hidden gap-2 md:flex">
					<div class="relative hidden w-7 justify-center pt-2 md:flex">
						<BaseLocaleSwitcher />
					</div>
					<NavContactUs />
				</div>
				<NavBurgerButton />
			</div>
		</nav>
	</div>
{/if}
