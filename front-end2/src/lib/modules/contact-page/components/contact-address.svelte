<script lang="ts">
	import { BaseLogo } from '$base'
	import { locale } from '$i18n/i18n-svelte'
</script>

<section class="flex flex-col gap-4 rounded-none border border-stone-200 bg-white p-6">
	<div class="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
		<div class="flex flex-col items-start gap-1">
			<BaseLogo />
			<a
				href="mailto:info@chdtravel.com"
				class="mt-2 text-xs font-medium text-stone-900 transition-colors hover:text-terracotta">
				info@chdtravel.com
			</a>
		</div>
		<div class="text-xs font-light text-stone-600 sm:text-right">
			<p>09 Nguyen Binh, Tan Loi, <br />Buon Ma Thuot, Dak Lak</p>
			<p class="mt-1 font-medium text-stone-900">0262 396 68 68</p>
		</div>
	</div>

	<!-- Mini Google Map -->
	<div class="mt-2 overflow-hidden border border-stone-200 bg-stone-100">
		<iframe
			title="CHD Travel Location"
			src="https://maps.google.com/maps?q=09+Nguyen+Binh,+Tan+Loi,+Buon+Ma+Thuot,+Dak+Lak,+Vietnam&t=&z=15&ie=UTF8&iwloc=&output=embed"
			width="100%"
			height="160"
			style="border:0;"
			allowfullscreen={false}
			loading="lazy"
			referrerpolicy="no-referrer-when-downgrade"
			class="w-full">
		</iframe>
		<div class="flex items-center justify-between bg-stone-50 px-3 py-2 text-[11px] text-stone-600">
			<span class="font-medium text-stone-800">CHD Travel • Buôn Ma Thuột</span>
			<a
				href="https://maps.app.goo.gl/mr8NYztsShiNjfKQ9"
				target="_blank"
				rel="noopener noreferrer"
				class="font-medium text-terracotta hover:underline">
				{$locale === 'vn' ? 'Xem trên Google Maps ↗' : 'View on Google Maps ↗'}
			</a>
		</div>
	</div>
</section>
