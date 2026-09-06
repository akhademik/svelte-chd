<script lang="ts">
	import { BaseLocaleSwitcher, BaseLogo } from '$base'
	import { nav_animate_hidden } from '$lib/stores/nav-store'

	import NavBurgerButton from './components/nav-burger-button.svelte'
	import NavMenuItems from './components/nav-menu-items.svelte'
</script>

<header
	class="fixed left-0 right-0 top-0 z-40 border-b border-border/60 bg-surface/90 backdrop-blur-md transition-all duration-300"
	class:hidden={$nav_animate_hidden}>
	<div class="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
		<BaseLogo />
		<NavMenuItems />
		<div class="flex items-center gap-4">
			<BaseLocaleSwitcher />
			<NavBurgerButton />
		</div>
	</div>
</header>
<div class="h-20"></div>
