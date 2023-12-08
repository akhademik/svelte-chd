<script lang="ts">
	import { BaseLocaleSwitcher, BaseLogo } from '$base'
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
			class="md:border-b-primary/50 fixed top-0 z-50 w-full bg-white/80 px-3 py-2 backdrop-blur-[2px] md:border-b">
			<div
				class="font-roboto text-primary flex items-center justify-between text-lg md:mx-auto md:max-w-7xl">
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
