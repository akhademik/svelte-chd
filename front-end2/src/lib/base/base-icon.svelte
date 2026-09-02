<script lang="ts">
	import { icons } from '$lib/utils/icons'

	export let name: keyof typeof icons

	$: icon = icons[name]
	$: width = icon.box_width
	$: height = icon.box_height
</script>

<svg
	class={$$props.class}
	viewBox="0 0 {width} {height || width}">{@html icon.svg}</svg>
