<script lang="ts">
	interface Props {
		class?: string
	}

	let { class: className = 'h-4 w-4 text-primary' }: Props = $props()
</script>

<!-- Mature Activity Level / Compass Icon -->
<svg
	class={className}
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="1.8"
	stroke-linecap="round"
	stroke-linejoin="round"
	aria-hidden="true">
	<circle
		cx="12"
		cy="12"
		r="10" />
	<polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
</svg>
