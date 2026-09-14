<script lang="ts">
	interface Props {
		class?: string
	}

	let { class: className = 'h-3.5 w-3.5 fill-current' }: Props = $props()
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	class={className}
	viewBox="0 0 24 24"
	fill="currentColor"
	aria-hidden="true">
	<path
		d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.784 1.399 8.169-7.333-3.856-7.333 3.856 1.399-8.169-5.934-5.784 8.2-1.192zm0 5.702l-2.232 4.522-4.991.725 3.612 3.521-.852 4.972 4.463-2.347 4.463 2.347-.852-4.972 3.612-3.521-4.991-.725z" />
</svg>
