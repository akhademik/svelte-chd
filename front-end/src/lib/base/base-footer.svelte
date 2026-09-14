<script lang="ts">
	import LL, { locale } from '$i18n/i18n-svelte'
	import { IconFacebook, IconTripadvisor } from '$lib/icons'
	import { getCategorySlug } from '$lib/utils/format-data'
</script>

<footer
	class="border-t border-inverse-dark bg-inverse px-6 py-8 text-xs text-foreground-subtle sm:py-10">
	<div class="mx-auto max-w-6xl space-y-6">
		<div class="flex flex-col items-center justify-between gap-6 md:flex-row">
			<!-- Brand & Slogan -->
			<div class="flex flex-col items-center gap-1 md:items-start">
				<div class="flex items-center gap-2">
					<span class="font-serif text-lg uppercase tracking-widest text-inverse-foreground"
						>CHD</span>
					<span class="text-inverse-dark">|</span>
					<span class="text-xs uppercase tracking-widest text-inverse-foreground/70">Travel</span>
				</div>
				<span class="font-serif text-[11px] italic tracking-widest text-secondary">
					"go local — see local — eat local"
				</span>
			</div>

			<!-- Navigation Links -->
			<div
				class="flex flex-wrap items-center justify-center gap-6 font-light text-inverse-foreground/80">
				<a
					href={`/${$locale}/${getCategorySlug('day-tours', $locale)}`}
					class="transition-colors hover:text-white">
					{$LL.nav_bar.day_tours()}
				</a>
				<a
					href={`/${$locale}/${getCategorySlug('highland-tours', $locale)}`}
					class="transition-colors hover:text-white">
					{$LL.nav_bar.highland_tours()}
				</a>
				<a
					href={`/${$locale}/blog`}
					class="transition-colors hover:text-white">
					{$LL.nav_bar.blog()}
				</a>
				<a
					href={`/${$locale}/about`}
					class="transition-colors hover:text-white">
					{$LL.nav_bar.about()}
				</a>
				<a
					href={`/${$locale}/contact`}
					class="transition-colors hover:text-white">
					{$LL.nav_bar.contact()}
				</a>
			</div>

			<!-- Social Links -->
			<div class="flex items-center gap-3">
				<!-- Facebook -->
				<a
					href="https://www.facebook.com/chdtravelDOTcom"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Facebook"
					class="flex h-11 w-11 items-center justify-center rounded-full border border-inverse-dark bg-inverse-dark/60 text-inverse-foreground/80 transition-all hover:border-white hover:bg-inverse-dark hover:text-white focus:outline-none focus:ring-2 focus:ring-primary">
					<IconFacebook class="h-4 w-4 fill-current" />
				</a>

				<!-- TripAdvisor -->
				<a
					href="https://www.tripadvisor.com/Attraction_Review-g670918-d12708025-Reviews-CHD_Travel-Buon_Ma_Thuot_Dak_Lak_Province.html"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="TripAdvisor"
					class="flex h-11 w-11 items-center justify-center rounded-full border border-inverse-dark bg-inverse-dark/60 text-inverse-foreground/80 transition-all hover:border-white hover:bg-inverse-dark hover:text-white focus:outline-none focus:ring-2 focus:ring-primary">
					<IconTripadvisor class="h-4 w-4 fill-current" />
				</a>
			</div>
		</div>

		<!-- Legal / Utility Links -->
		<div class="flex justify-center border-t border-inverse-dark/60 pt-3.5">
			<div
				class="flex flex-wrap items-center justify-center gap-5 text-[11px] font-light text-inverse-foreground/50">
				<a
					href={`/${$locale}/faq`}
					class="transition-colors hover:text-inverse-foreground/80">
					{$LL.footer.faq()}
				</a>
				<a
					href={`/${$locale}/terms`}
					class="transition-colors hover:text-inverse-foreground/80">
					{$LL.footer.terms()}
				</a>
				<a
					href={`/${$locale}/privacy`}
					class="transition-colors hover:text-inverse-foreground/80">
					{$LL.footer.privacy()}
				</a>
			</div>
		</div>

		<!-- Bottom Copyright -->
		<div
			class="border-t border-inverse-dark/80 pt-4 text-center text-[11px] font-light text-foreground-subtle">
			© {new Date().getFullYear()} CHD Travel. All rights reserved.
		</div>
	</div>
</footer>
