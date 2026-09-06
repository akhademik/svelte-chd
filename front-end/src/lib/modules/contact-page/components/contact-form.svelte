<script lang="ts">
	import LL from '$i18n/i18n-svelte'
	import { superForm } from 'sveltekit-superforms/client'
	import ContactFormInputs from './contact-form-inputs.svelte'

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

<div class="border border-border/90 bg-surface p-8 sm:p-12">
	<h3 class="mb-6 font-serif text-2xl text-foreground">
		{$LL.nav_bar.contact()}
	</h3>
	<form
		use:enhance
		method="post"
		class="flex flex-col gap-6">
		<ContactFormInputs {superFormData} />
	</form>
</div>
