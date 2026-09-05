<script lang="ts">
	import { locale } from '$i18n/i18n-svelte'
</script>

<a
	href={`/${$locale}`}
	class="group flex items-center gap-2">
	<span class="font-serif text-2xl font-medium uppercase tracking-widest text-moss">CHD</span>
	<span
		class="hidden border-l border-stone-300 pl-2 text-xs font-light uppercase tracking-widest text-stone-400 sm:inline"
		>Travel</span>
</a>
