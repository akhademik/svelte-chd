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
	<path d="M19 9l-7 7-7-7" />
</svg>
