<script lang="ts">
	import LL, { locale } from '$i18n/i18n-svelte'
</script>

<section class="border-t border-border/80 bg-inverse py-16 text-center text-white">
	<div class="mx-auto max-w-4xl px-6">
		<blockquote
			class="mx-auto mb-6 max-w-3xl font-serif text-lg font-light italic leading-relaxed text-inverse-foreground/90 sm:text-xl">
			{$LL.about_page.cta.quote()}
		</blockquote>
		<p
			class="mx-auto mt-2 max-w-2xl text-xs font-light leading-relaxed text-inverse-foreground/75 sm:text-sm">
			{$LL.about_page.cta.desc()}
		</p>
		<div class="mt-8 flex justify-center gap-4">
			<a
				href={`/${$locale}/contact`}
				class="bg-secondary px-8 py-4 text-xs font-medium uppercase tracking-widest text-white transition-colors hover:bg-secondary-hover">
				{$LL.about_page.cta.btn()}
			</a>
		</div>
	</div>
</section>
