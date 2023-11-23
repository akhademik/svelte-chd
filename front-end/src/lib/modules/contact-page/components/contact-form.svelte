<script lang="ts">
	import LL from '$i18n/i18n-svelte'

	// import FormInputs from './form/form-inputs.vue'
	import ContactFormTags from './contact-form-tags.svelte'

	let tags: string[] = []
</script>

<form
	class="flex flex-col gap-5"
	method="post">
	<h1 class="w-[80%] font-bold">{$LL.contact_page.page.chose_tag()}</h1>
	<ContactFormTags on:get-tags={({ detail }) => (tags = detail)} />
	<div class="-my-3 h-6 text-red-500">
		<!-- <small>{$LL.contact_page.err[err_msg]()}</small> -->
	</div>
	<!-- <FormInputs /> -->
	<button
		type="submit"
		class="border-primary before:bg-secondary relative self-end border px-8 py-2 text-xl font-bold uppercase before:absolute before:bottom-0 before:left-0 before:h-1 before:w-full before:transition-all before:duration-300 hover:before:h-0 disabled:bg-white disabled:text-red-600 disabled:line-through">
		{$LL.contact_page.page.submit()}
	</button>
</form>
