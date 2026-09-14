<script lang="ts">
	interface Props {
		class?: string
	}

	let { class: className = 'h-3.5 w-3.5' }: Props = $props()
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	class={className}
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
	aria-hidden="true">
	<polyline points="20 6 9 17 4 12" />
</svg>
