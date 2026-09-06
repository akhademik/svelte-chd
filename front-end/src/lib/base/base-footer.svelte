<script lang="ts">
	import LL, { locale } from '$i18n/i18n-svelte'
</script>

<footer class="border-t border-stone-800 bg-stone-900 px-6 py-16 text-xs text-stone-400">
	<div class="mx-auto max-w-6xl space-y-12">
		<div class="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
			<!-- Brand, Slogan & Description -->
			<div class="flex flex-col items-center gap-2 md:items-start">
				<div class="flex items-center gap-3">
					<span class="font-serif text-2xl uppercase tracking-widest text-stone-100">CHD</span>
					<span class="text-stone-700">|</span>
					<span class="text-xs uppercase tracking-widest text-stone-300">Travel</span>
				</div>
				<span class="font-serif text-xs italic tracking-widest text-terracotta">
					"go local — see local — eat local"
				</span>
				<p class="mt-1 text-xs font-light text-stone-400">
					{$locale === 'vn'
						? 'Du lịch trải nghiệm bản địa & Du lịch sinh thái Đắk Lắk'
						: 'Authentic Local & Eco Travel Experiences in Dak Lak'}
				</p>
			</div>

			<!-- Navigation Links -->
			<div class="flex flex-wrap items-center justify-center gap-8 font-light text-stone-300">
				<a
					href={`/${$locale}/day-tours`}
					class="transition-colors hover:text-white">
					{$LL.nav_bar.day_tours()}
				</a>
				<a
					href={`/${$locale}/highland-tours`}
					class="transition-colors hover:text-white">
					{$LL.nav_bar.highland_tours()}
				</a>
				<a
					href={`/${$locale}/about`}
					class="transition-colors hover:text-white">
					{$LL.nav_bar.about()}
				</a>
				<a
					href={`/${$locale}/blog`}
					class="transition-colors hover:text-white">
					{$LL.nav_bar.blog()}
				</a>
				<a
					href={`/${$locale}/contact`}
					class="transition-colors hover:text-white">
					{$LL.nav_bar.contact()}
				</a>
			</div>

			<!-- Social Links -->
			<div class="flex items-center gap-4">
				<!-- Facebook -->
				<a
					href="https://www.facebook.com/chdtravelDOTcom"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Facebook"
					class="flex h-9 w-9 items-center justify-center rounded-full border border-stone-700 bg-stone-800 text-stone-300 transition-all hover:border-white hover:bg-stone-700 hover:text-white">
					<svg
						class="h-4 w-4 fill-current"
						viewBox="0 0 24 24">
						<path
							d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
						></path>
					</svg>
				</a>

				<!-- TripAdvisor -->
				<a
					href="https://www.tripadvisor.com/Attraction_Review-g670918-d12708025-Reviews-CHD_Travel-Buon_Ma_Thuot_Dak_Lak_Province.html"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="TripAdvisor"
					class="flex h-9 w-9 items-center justify-center rounded-full border border-stone-700 bg-stone-800 text-stone-300 transition-all hover:border-white hover:bg-stone-700 hover:text-white">
					<svg
						class="h-4 w-4 fill-current"
						viewBox="0 0 24 24">
						<path
							d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 3.12c1.47 0 2.8.52 3.84 1.39l-1.04 1.3a4.67 4.67 0 0 0-5.6 0l-1.04-1.3A6.16 6.16 0 0 1 12 5.12zM5.5 14.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0zm13 0a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0zm-11.5 0a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0zm10 0a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0z"
						></path>
					</svg>
				</a>
			</div>
		</div>

		<!-- Bottom Copyright -->
		<div class="border-t border-stone-800/80 pt-6 text-center text-xs font-light text-stone-500">
			© {new Date().getFullYear()} CHD Travel Agency. All rights reserved.
		</div>
	</div>
</footer>
