<script lang="ts">
	import LL, { locale } from '$i18n/i18n-svelte'
	import type { Translation } from '$i18n/i18n-types'
	import { redirect_to_home } from '$utils/navigation'
	import toast from 'svelte-french-toast'
	import { superForm } from 'sveltekit-superforms/client'

	type ErrKey = keyof Translation['contact_page']['err']

	export let data
	const { form, errors, message } = superForm(data.form)

	$: err_clone = $errors as any
	$: err_keys = err_clone[Object.keys(err_clone)[0]] || []
	$: err_msg = err_keys.length > 1 ? (err_keys[1] as ErrKey) : (err_keys[0] as ErrKey)
	$: if ($message === 'success') {
		redirect_to_home($locale)
		toast.success($LL.contact_page.success())
	}
</script>

<div class="-my-3 h-6 text-red-500">
	{#if err_msg}
		<small>{$LL.contact_page.err[err_msg]()}</small>
	{/if}
</div>
<div class="flex flex-col gap-y-2">
	<input
		bind:value={$form.name}
		type="text"
		name="name"
		placeholder={$LL.contact_page.placeholder['name']()}
		class="w-full border border-primary bg-white/30 px-2 py-2 text-lg placeholder-secondary/70 hover:bg-white/40 focus:outline-none" />
	<div class="grid grid-cols-2 gap-2">
		<input
			bind:value={$form.email}
			type="text"
			name="email"
			placeholder={$LL.contact_page.placeholder['email']()}
			class="w-full border border-primary bg-white/30 px-2 py-2 text-lg placeholder-secondary/70 hover:bg-white/40 focus:outline-none" />
		<input
			bind:value={$form.phone}
			type="text"
			name="phone"
			placeholder={$LL.contact_page.placeholder['phone']()}
			class="w-full border border-primary bg-white/30 px-2 py-2 text-lg placeholder-secondary/70 hover:bg-white/40 focus:outline-none" />
	</div>
	<input
		bind:value={$form.langs}
		type="text"
		name="langs"
		placeholder={$LL.contact_page.placeholder['langs']()}
		class="w-full border border-primary bg-white/30 px-2 py-2 text-lg placeholder-secondary/70 hover:bg-white/40 focus:outline-none" />
	<textarea
		bind:value={$form.msg}
		name="msg"
		rows="7"
		placeholder={$LL.contact_page.placeholder['msg']()}
		class="w-full resize-none border border-primary bg-white/30 px-2 py-2 text-lg placeholder-secondary/70 hover:bg-white/40 focus:outline-none"
	></textarea>
</div>
