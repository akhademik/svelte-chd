<script lang="ts">
	import { locale } from '$i18n/i18n-svelte'
</script>

<section
	class="relative flex min-h-[85vh] items-center justify-center border-b border-stone-200 px-6">
	<div class="mx-auto max-w-4xl py-20 text-center">
		<div class="mb-6 flex flex-col items-center gap-2">
			<span class="font-serif text-sm italic tracking-widest text-terracotta">
				"go local — see local — eat local"
			</span>
			<p class="text-xs font-medium uppercase tracking-[0.3em] text-stone-500">
				{$locale === 'vn'
					? 'Du lịch chậm & Trải nghiệm nguyên bản'
					: $locale === 'fr'
						? 'Voyage Lent & Rencontres Authentiques'
						: 'Slow Travel & Authentic Encounters'}
			</p>
		</div>

		<h1
			class="mb-8 font-serif text-4xl font-normal leading-[1.15] tracking-tight text-stone-900 sm:text-6xl md:text-7xl">
			{#if $locale === 'vn'}
				Chạm vào tâm hồn <br />
				<span class="font-light italic">đại ngàn mộc mạc.</span>
			{:else if $locale === 'fr'}
				Ressentez l'âme pure des <br />
				<span class="font-light italic">Hauts Plateaux sauvages.</span>
			{:else}
				Embrace the Spirit of the <br />
				<span class="font-light italic">Untamed Highlands.</span>
			{/if}
		</h1>

		<p
			class="mx-auto mb-10 max-w-xl text-base font-light leading-relaxed text-stone-600 sm:text-lg">
			{#if $locale === 'vn'}
				Những hành trình tinh tế đưa bạn hòa mình vào văn hóa bản địa, rừng thông hoang sơ và âm
				vang cồng chiêng Tây Nguyên.
			{:else if $locale === 'fr'}
				Des itinéraires minimalistes et raffinés au cœur des forêts de pins, des cascades sacrées et
				de la culture des gongs.
			{:else}
				Curated minimalist journeys immersing you into indigenous culture, misty pine plateaus, and
				authentic Gong heritage.
			{/if}
		</p>

		<div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
			<a
				href="#day-tours"
				class="inline-flex w-full items-center justify-center gap-2 bg-stone-900 px-8 py-4 text-xs uppercase tracking-widest text-stone-50 transition-all duration-300 hover:bg-stone-800 sm:w-auto">
				<span>
					{$locale === 'vn'
						? 'Khám phá các tour'
						: $locale === 'fr'
							? 'Découvrir nos circuits'
							: 'Explore Tours'}
				</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4 w-4"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round">
					<line
						x1="5"
						y1="12"
						x2="19"
						y2="12"></line>
					<polyline points="12 5 19 12 12 19"></polyline>
				</svg>
			</a>
			<a
				href={`/${$locale}/contact`}
				class="inline-flex w-full items-center justify-center border border-stone-300 px-8 py-4 text-xs uppercase tracking-widest text-stone-800 transition-all duration-300 hover:bg-stone-100 sm:w-auto">
				{$locale === 'vn'
					? 'Liên hệ / Tư vấn'
					: $locale === 'fr'
						? 'Contact / Sur mesure'
						: 'Contact Us'}
			</a>
		</div>
	</div>
</section>
