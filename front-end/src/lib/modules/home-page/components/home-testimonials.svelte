<script lang="ts">
	import LL from '$i18n/i18n-svelte'
	import defaultTestimonials from '$lib/constants/testimonials.json'
	import type { Testimonial } from '$lib/types/testimonial.type'

	interface Props {
		testimonials?: Testimonial[]
	}

	let { testimonials = defaultTestimonials }: Props = $props()

	const displayItems = $derived(
		(testimonials && testimonials.length > 0 ? testimonials : defaultTestimonials).map(t => ({
			quote: t.review_content,
			title: t.review_title,
			authorName: t.name,
			authorLocation: t.country || '',
			rating: t.stars || 5,
			sourceUrl: t.url,
		}))
	)
</script>

<section class="border-b border-stone-200 px-6 py-20 sm:py-28">
	<div class="mx-auto max-w-6xl">
		<div class="mb-16 text-center">
			<span class="text-xs font-semibold uppercase tracking-[0.25em] text-terracotta">
				{$LL.home_page.testimonials.subtitle()}
			</span>
			<h2 class="mt-2 font-serif text-3xl font-bold text-moss sm:text-4xl">
				{$LL.home_page.testimonials.title()}
			</h2>
			<p class="mx-auto mt-3 max-w-lg text-sm font-light text-stone-500">
				{$LL.home_page.testimonials.desc()}
			</p>
		</div>

		<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
			{#each displayItems as item}
				<div
					class="flex flex-col justify-between border border-stone-200/90 bg-sand-card p-8 shadow-sm transition-all duration-300 hover:border-stone-400 hover:shadow-md">
					<div>
						<div class="mb-4 flex items-center justify-between">
							<div class="flex items-center gap-1 text-amber-700">
								{#each Array(item.rating || 5) as _}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
										class="h-4 w-4">
										<path
											fill-rule="evenodd"
											d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
											clip-rule="evenodd" />
									</svg>
								{/each}
							</div>
						</div>

						{#if item.title}
							<h3 class="mb-2 font-serif text-base font-bold text-stone-900">
								{item.title}
							</h3>
						{/if}

						<p class="font-serif text-sm font-light italic leading-relaxed text-stone-700">
							"{item.quote}"
						</p>
					</div>

					<div
						class="mt-8 flex items-center justify-between border-t border-stone-200/60 pt-4 text-xs">
						<div class="font-serif text-sm font-bold text-stone-900">
							{#if item.sourceUrl}
								<a
									href={item.sourceUrl}
									target="_blank"
									rel="noopener noreferrer"
									class="hover:text-moss hover:underline">
									{item.authorName}
								</a>
							{:else}
								{item.authorName}
							{/if}
						</div>
						{#if item.authorLocation}
							<div class="text-stone-500">{item.authorLocation}</div>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
