<script lang="ts">
	import { locale } from '$i18n/i18n-svelte'
</script>

<a
	href={`/${$locale}`}
	class="font-bold">
	<span
		class="relative text-xl text-secondary before:absolute before:-top-[2px] before:h-[3px] before:w-full before:bg-primary"
		>CHD</span>
	<span class="pl-1 text-base">Travel</span>
</a>
