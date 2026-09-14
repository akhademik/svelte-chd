<script lang="ts">
	interface Props {
		class?: string
	}

	let { class: className = 'h-4 w-4' }: Props = $props()
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
	<polyline points="9 18 15 12 9 6" />
</svg>
