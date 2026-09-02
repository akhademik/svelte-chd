<script lang="ts">
	import { onMount } from 'svelte'
	import { fly } from 'svelte/transition'

	import ContactAddress from './components/contact-address.svelte'
	import ContactForm from './components/contact-form.svelte'
	import ContactHeader from './components/contact-header.svelte'
	import ContactReview from './components/contact-review.svelte'

	export let data: unknown
	let loaded = false
	onMount(() => {
		loaded = true
	})
</script>

{#if loaded}
	<div
		class="font-roboto pt-4 lg:px-11"
		in:fly|global={{ x: -200, duration: 600, delay: 300 }}
		out:fly={{ x: 200, duration: 300 }}>
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
{/if}
