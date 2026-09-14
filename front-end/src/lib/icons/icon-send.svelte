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
	<line
		x1="22"
		y1="2"
		x2="11"
		y2="13" />
	<polygon points="22 2 15 22 11 13 2 9 22 2" />
</svg>
