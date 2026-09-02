<script lang="ts">
	import LL, { locale } from '$i18n/i18n-svelte'
</script>

<footer class="border-t border-stone-800 bg-stone-900 px-6 py-16 text-xs text-stone-400">
	<div class="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
		<div class="flex items-center gap-3">
			<span class="font-serif text-xl uppercase tracking-widest text-stone-100">CHD</span>
			<span class="text-stone-600">|</span>
			<span class="font-light text-stone-400">
				© {new Date().getFullYear()} CHD Travel Agency. All rights reserved.
			</span>
		</div>

		<div class="flex items-center space-x-8 font-light text-stone-400">
			<a
				href={`/${$locale}/day-tours`}
				class="transition-colors hover:text-stone-200">
				{$LL.nav_bar.day_tours()}
			</a>
			<a
				href={`/${$locale}/highland-tours`}
				class="transition-colors hover:text-stone-200">
				{$LL.nav_bar.highland_tours()}
			</a>
			<a
				href={`/${$locale}/contact`}
				class="transition-colors hover:text-stone-200">
				{$LL.nav_bar.contact()}
			</a>
		</div>
	</div>
</footer>
