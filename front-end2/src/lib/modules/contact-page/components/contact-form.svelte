<script lang="ts">
	import LL from '$i18n/i18n-svelte'
	import ContactFormInputs from './contact-form-inputs.svelte'
	import ContactFormTags from './contact-form-tags.svelte'

	interface Props {
		data: any
	}

	let { data }: Props = $props()
</script>

<div class="border border-stone-200/90 bg-white p-8 sm:p-12">
	<h3 class="mb-6 font-serif text-2xl text-stone-900">
		{$LL.nav_bar.contact()}
	</h3>
	<form
		method="post"
		class="flex flex-col gap-6">
		<h4 class="text-xs uppercase tracking-wider text-stone-500">
			{$LL.contact_page.page.chose_tag()}
		</h4>
		<ContactFormTags />
		<ContactFormInputs {data} />
	</form>
</div>
