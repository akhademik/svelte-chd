<script lang="ts">
	import { locale } from '$i18n/i18n-svelte'
</script>

<a
	href={`/${$locale}`}
	class="group flex items-center gap-2">
	<span class="font-serif text-2xl font-medium uppercase tracking-widest text-primary">CHD</span>
	<span
		class="hidden border-l border-border-strong pl-2 text-xs font-light uppercase tracking-widest text-foreground-subtle sm:inline"
		>Travel</span>
</a>
