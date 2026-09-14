<script lang="ts">
	import { locale } from '$i18n/i18n-svelte'
	import { BaseAvatar } from '$lib/base'
	import { IconStar } from '$lib/icons'
	import { formatReviewDate } from '$lib/utils/format-data'
	import type { TestimonialViewModel } from './testimonial'

	interface Props {
		testimonial: TestimonialViewModel
		class?: string
		titleClass?: string
		headerPaddingClass?: string
	}

	let {
		testimonial,
		class: className = '',
		titleClass = 'line-clamp-2',
		headerPaddingClass = '',
	}: Props = $props()
</script>

<article class="flex min-h-[220px] flex-col justify-between p-5 sm:h-[360px] sm:p-8 {className}">
	<div class="overflow-hidden">
		<!-- Header: Rating (Always 5 stars with active/dimmed) & Date ({Month} {Year}) -->
		<div class="mb-3 flex items-center justify-between sm:mb-4 {headerPaddingClass}">
			<div
				class="flex items-center gap-1"
				role="img"
				aria-label={`${testimonial.rating || 5} out of 5 stars`}>
				{#each [1, 2, 3, 4, 5] as starNum}
					<IconStar
						class={`h-4 w-4 ${starNum <= (testimonial.rating || 5) ? 'text-amber-600' : 'text-border-strong'}`} />
				{/each}
			</div>

			{#if testimonial.date}
				<span class="font-mono text-xs text-foreground-subtle">
					{formatReviewDate(testimonial.date, $locale)}
				</span>
			{/if}
		</div>

		<!-- Review Title: Link to TripAdvisor if url exists -->
		{#if testimonial.title}
			<h3 class="mb-2 font-serif text-base font-bold text-foreground {titleClass}">
				{#if testimonial.sourceUrl}
					<a
						href={testimonial.sourceUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="transition-colors hover:text-secondary hover:underline">
						{testimonial.title}
					</a>
				{:else}
					{testimonial.title}
				{/if}
			</h3>
		{/if}

		<!-- Review Content -->
		<p
			class="line-clamp-4 font-serif text-sm font-light italic leading-relaxed text-foreground-muted sm:line-clamp-5 sm:text-base">
			"{testimonial.quote}"
		</p>
	</div>

	<!-- Author Footer: [Avatar] [Username] [Country] -->
	<div
		class="mt-3 flex items-center justify-between border-t border-border/60 pt-3 text-xs sm:mt-4 sm:pt-4">
		<div class="flex items-center gap-2.5 overflow-hidden">
			<BaseAvatar
				name={testimonial.authorName}
				src={testimonial.authorAvatar}
				class="h-7 w-7" />
			<span class="truncate font-serif font-bold text-foreground">
				{testimonial.authorName}
			</span>
		</div>
		{#if testimonial.authorLocation}
			<div class="shrink-0 text-foreground-muted">{testimonial.authorLocation}</div>
		{/if}
	</div>
</article>
