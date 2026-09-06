<script lang="ts">
	import defaultTestimonials from '$lib/constants/testimonials.json'
	import type { Testimonial } from '$lib/types/testimonial.type'

	interface Props {
		testimonials?: Testimonial[]
	}

	let { testimonials = defaultTestimonials }: Props = $props()

	const currentReview = $derived.by(() => {
		const list = testimonials && testimonials.length > 0 ? testimonials : defaultTestimonials
		const t = list[0]
		return {
			name: t.name,
			country: t.country || 'Verified Traveler',
			title: t.review_title,
			content: t.review_content,
			stars: t.stars || 5,
			url: t.url,
		}
	})
</script>

<section class="border border-stone-200 bg-sand-card p-8 shadow-sm">
	<div class="mb-4 flex items-center justify-between">
		<div class="flex items-center gap-1 text-amber-600">
			{#each Array(currentReview.stars) as _}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4 w-4 fill-current"
					viewBox="0 0 24 24">
					<polygon
						points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
					></polygon>
				</svg>
			{/each}
		</div>
		{#if currentReview.title}
			<span class="text-xs font-medium text-stone-500">{currentReview.title}</span>
		{/if}
	</div>

	<p class="font-serif text-base italic leading-relaxed text-stone-700">
		"{currentReview.content}"
	</p>

	<div class="mt-6 flex items-center justify-between border-t border-stone-200/80 pt-4 text-xs">
		<div class="font-medium text-stone-900">
			{#if currentReview.url}
				<a
					href={currentReview.url}
					target="_blank"
					rel="noopener noreferrer"
					class="hover:text-moss hover:underline">
					{currentReview.name}
				</a>
			{:else}
				{currentReview.name}
			{/if}
		</div>
		{#if currentReview.country}
			<div class="text-stone-400">{currentReview.country}</div>
		{/if}
	</div>
</section>
