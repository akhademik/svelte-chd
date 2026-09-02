<script lang="ts">
	import { enhance } from '$app/forms'
	import LL from '$i18n/i18n-svelte'

	import ContactFormInputs from './contact-form-inputs.svelte'
	import ContactFormTags from './contact-form-tags.svelte'

	export let data: unknown
</script>

<form
	use:enhance
	class="flex flex-col gap-5"
	method="post">
	<h1 class="w-[80%] font-bold">{$LL.contact_page.page.chose_tag()}</h1>
	<ContactFormTags />
	<ContactFormInputs {data} />
	<button
		type="submit"
		class="relative self-end border border-primary px-8 py-2 text-xl font-bold uppercase before:absolute before:bottom-0 before:left-0 before:h-1 before:w-full before:bg-secondary before:transition-all before:duration-300 hover:before:h-0">
		{$LL.contact_page.page.submit()}
	</button>
</form>
