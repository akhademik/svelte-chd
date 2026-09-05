<script lang="ts">
	import { onMount } from 'svelte'

	import ContactAddress from './components/contact-address.svelte'
	import ContactForm from './components/contact-form.svelte'
	import ContactHeader from './components/contact-header.svelte'
	import ContactReview from './components/contact-review.svelte'

	export let data: any
	let loaded = false
	onMount(() => {
		loaded = true
	})
</script>

{#if loaded}
	<div class="mx-auto max-w-6xl px-6 py-12">
		<div class="flex flex-col gap-5">
			<ContactHeader />
			<div class="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
				<ContactForm {data} />
				<div class="flex flex-col gap-8 lg:gap-12">
					<ContactReview />
					<ContactAddress />
				</div>
			</div>
		</div>
	</div>
{/if}
