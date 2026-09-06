<script lang="ts">
	import { locale } from '$i18n/i18n-svelte'
</script>

<section class="overflow-hidden rounded-none border border-border bg-surface shadow-sm">
	<!-- Mini Google Map (Focused on CHD Travel) -->
	<iframe
		title="CHD Travel Location"
		src="https://maps.google.com/maps?q=CHD+Travel,+09+Nguyen+Binh,+Tan+Loi,+Buon+Ma+Thuot,+Dak+Lak&t=&z=17&ie=UTF8&iwloc=B&output=embed"
		width="100%"
		height="340"
		style="border:0;"
		allowfullscreen={false}
		loading="lazy"
		referrerpolicy="no-referrer-when-downgrade"
		class="w-full">
	</iframe>
	<div
		class="flex items-center justify-between border-t border-border bg-surface-muted/30 px-5 py-3.5 text-xs text-foreground-muted">
		<span class="font-medium text-foreground">📍 CHD Travel • 09 Nguyễn Bính, Buôn Ma Thuột</span>
		<a
			href="https://maps.app.goo.gl/mr8NYztsShiNjfKQ9"
			target="_blank"
			rel="noopener noreferrer"
			class="font-semibold text-secondary hover:underline">
			{$locale === 'vn' ? 'Chỉ đường trên Google Maps ↗' : 'Get Directions ↗'}
		</a>
	</div>
</section>
