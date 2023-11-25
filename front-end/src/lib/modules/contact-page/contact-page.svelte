<script lang="ts">
	import ContactAddress from './components/contact-address.svelte'
	import ContactForm from './components/contact-form.svelte'
	import ContactHeader from './components/contact-header.svelte'
	import ContactReview from './components/contact-review.svelte'

	export let data: unknown
</script>

<div class="font-roboto pt-4 lg:px-11">
	<div class="flex flex-col gap-5 py-4">
		<ContactHeader />
		<div class="grid gap-11 lg:grid-cols-2">
			<ContactForm {data} />
			<div class="flex flex-col gap-16">
				<ContactReview />
				<ContactAddress />
			</div>
		</div>
	</div>
</div>
