<script lang="ts">
	import LL from '$i18n/i18n-svelte'
</script>

<section class="mb-12 flex flex-col items-center gap-4 text-center">
	<h1 class="font-serif text-3xl font-normal text-stone-900 sm:text-5xl">
		{$LL.contact_page.page.contact_us()}
	</h1>
	<p class="max-w-xl text-sm font-light leading-relaxed text-stone-600">
		{$LL.contact_page.page.have_question()}
	</p>
</section>
