<script lang="ts">
	import LL from '$i18n/i18n-svelte'
	import { superForm } from 'sveltekit-superforms/client'
	import ContactFormInputs from './contact-form-inputs.svelte'
	import ContactFormTags from './contact-form-tags.svelte'

	interface Props {
		data: { form: any }
	}

	let { data }: Props = $props()
	// svelte-ignore state_referenced_locally
	const superFormData = superForm(data?.form || {}, {
		id: 'contact-page-form',
	})
	const { enhance } = superFormData
</script>

<div class="border border-stone-200/90 bg-white p-8 sm:p-12">
	<h3 class="mb-6 font-serif text-2xl text-stone-900">
		{$LL.nav_bar.contact()}
	</h3>
	<form
		use:enhance
		method="post"
		class="flex flex-col gap-6">
		<h4 class="text-xs uppercase tracking-wider text-stone-500">
			{$LL.contact_page.page.chose_tag()}
		</h4>
		<ContactFormTags />
		<ContactFormInputs {superFormData} />
	</form>
</div>
