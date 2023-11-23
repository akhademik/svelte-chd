<script lang="ts">
	import { locale } from '$i18n/i18n-svelte'
</script>

<a
	href={`/${$locale}`}
	class="font-bold">
	<span
		class="text-secondary before:bg-primary relative text-xl before:absolute before:-top-[2px] before:h-[3px] before:w-full"
		>CHD</span>
	<span class="pl-1 text-base">Travel</span>
</a>
