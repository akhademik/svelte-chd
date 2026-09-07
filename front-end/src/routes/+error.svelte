<script lang="ts">
	import { page } from '$app/state'
	import LL, { locale } from '$i18n/i18n-svelte'

	let status = $derived(page.status)
	let is503 = $derived(status === 503)
	let is404 = $derived(status === 404)
</script>

<div class="flex min-h-[70vh] items-center justify-center px-6 py-24">
	<div class="mx-auto max-w-lg text-center">
		<span class="font-serif text-6xl font-bold text-secondary sm:text-8xl">
			{status}
		</span>

		<h1 class="mt-6 font-serif text-2xl font-bold text-foreground sm:text-3xl">
			{#if is503}
				{$locale === 'vn'
					? 'Dịch vụ tạm thời gián đoạn'
					: $locale === 'fr'
						? 'Service temporairement indisponible'
						: 'Service Temporarily Unavailable'}
			{:else if is404}
				{$locale === 'vn'
					? 'Không tìm thấy trang yêu cầu'
					: $locale === 'fr'
						? 'Page non trouvée'
						: 'Page Not Found'}
			{:else}
				{$locale === 'vn' ? 'Đã xảy ra lỗi' : 'An error occurred'}
			{/if}
		</h1>

		<p class="mt-4 text-sm font-light leading-relaxed text-foreground-muted sm:text-base">
			{#if is503}
				{$locale === 'vn'
					? 'Hệ thống đang đồng bộ dữ liệu hoặc kết nối bị chậm. Vui lòng tải lại trang sau ít phút.'
					: $locale === 'fr'
						? 'Le système est en cours de synchronisation. Veuillez réessayer dans quelques instants.'
						: 'We are experiencing temporary connection delays. Please refresh the page in a few moments.'}
			{:else if is404}
				{$locale === 'vn'
					? 'Trang bạn đang tìm kiếm không tồn tại hoặc đã được chuyển sang đường dẫn khác.'
					: $locale === 'fr'
						? 'La page que vous recherchez n’existe pas ou a été déplacée.'
						: 'The page you are looking for does not exist or has been moved.'}
			{:else}
				{page.error?.message || 'Unexpected error'}
			{/if}
		</p>

		<div class="mt-8 flex flex-wrap items-center justify-center gap-4">
			<a
				href={`/${$locale || 'vn'}`}
				class="bg-primary px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-white shadow-sm transition-colors hover:bg-primary-hover">
				{$LL.nav_bar.home()}
			</a>
			<a
				href={`/${$locale || 'vn'}/contact`}
				class="border border-border bg-surface px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-foreground shadow-sm transition-colors hover:border-foreground">
				{$LL.nav_bar.contact()}
			</a>
		</div>
	</div>
</div>
