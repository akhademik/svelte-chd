<script lang="ts">
	import { BaseLocaleSwitcher, BaseLogo } from '$base'

	// import NavBurgerButton from './components/nav-burger-button.vue';
	// import NavContactUs from './components/nav-contact-us.vue';
	import NavMenuItems from './components/nav-menu-items.svelte'
</script>

<div class="h-12">
	<nav
		class="md:border-b-primary/50 fixed top-0 z-50 w-full bg-white/80 px-3 py-2 backdrop-blur-[2px] md:border-b">
		<div
			class="flex items-center justify-between text-lg font-roboto text-primary md:mx-auto md:max-w-7xl">
			<BaseLogo />
			<NavMenuItems />
			<div class="hidden gap-2 md:flex">
				<div class="relative justify-center hidden pt-2 w-7 md:flex">
					<BaseLocaleSwitcher />
				</div>
				<!-- <NavContactUs /> -->
			</div>
			<!-- <NavBurgerButton /> -->
		</div>
	</nav>
</div>
