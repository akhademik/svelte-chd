<script lang="ts">
	import LL, { locale } from '$i18n/i18n-svelte'

	interface Props {
		tourType: string
		title: string
	}

	let { tourType, title }: Props = $props()
</script>

<section class="border-b border-border/80 bg-surface/50 py-3 sm:py-4">
	<div class="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6">
		<!-- Mobile View: Clean single-line parent category back link -->
		<div class="flex items-center md:hidden">
			<a
				href={`/${$locale}/${tourType}`}
				class="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-foreground-muted transition-colors hover:text-foreground">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-3.5 w-3.5"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2.5"
					stroke-linecap="round"
					stroke-linejoin="round">
					<polyline points="15 18 9 12 15 6"></polyline>
				</svg>
				{tourType === 'day-tours' ? $LL.nav_bar.day_tours() : $LL.nav_bar.highland_tours()}
			</a>
		</div>

		<!-- Desktop View: Full Breadcrumbs -->
		<nav
			class="hidden items-center gap-2 text-xs uppercase tracking-wider text-foreground-muted md:flex">
			<a
				href={`/${$locale}`}
				class="transition-colors hover:text-foreground">
				{$LL.nav_bar.home()}
			</a>
			<span>/</span>
			<a
				href={`/${$locale}/${tourType}`}
				class="transition-colors hover:text-foreground">
				{tourType === 'day-tours' ? $LL.nav_bar.day_tours() : $LL.nav_bar.highland_tours()}
			</a>
			<span>/</span>
			<span class="font-medium text-foreground">{title}</span>
		</nav>

		<!-- Desktop View: Back to Tours Button -->
		<a
			href={`/${$locale}/${tourType}`}
			class="hidden items-center gap-2 border border-border-strong bg-surface px-4 py-1.5 text-xs uppercase tracking-wider text-foreground shadow-sm transition-all hover:border-foreground hover:text-foreground md:inline-flex">
			← {$LL.tours.back_to_tours()}
		</a>
	</div>
</section>
