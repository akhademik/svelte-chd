<script lang="ts">
	import LL from '$i18n/i18n-svelte'
</script>

<section class="flex flex-col gap-8">
	<h1
		class="relative mx-auto w-max text-[6vmin] font-bold uppercase before:absolute before:bottom-0 before:h-1 before:w-full before:bg-secondary">
		{$LL.contact_page.page.contact_us()}
	</h1>
	<p class="w-[80%] pl-3">
		{$LL.contact_page.page.have_question()}
	</p>
</section>
