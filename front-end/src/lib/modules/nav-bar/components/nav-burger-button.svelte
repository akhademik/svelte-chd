<script lang="ts">
	import { nav_deg, nav_mobile } from '$stores/nav-store'

	const click = () => {
		nav_deg.turn()
		nav_mobile.toggle()
	}
</script>

<button
	class="group flex h-11 w-11 items-center justify-center rounded-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary md:hidden"
	aria-label="Toggle navigation menu"
	on:click={click}>
	<p
		style={`--deg: ${$nav_deg}turn`}
		class="h-[12px] w-6 rotate-[var(--deg)] border-y-[3px] border-foreground transition-all duration-300 ease-in-out group-hover:py-[6px]">
	</p>
</button>
