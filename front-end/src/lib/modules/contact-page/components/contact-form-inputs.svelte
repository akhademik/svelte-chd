<script lang="ts">
	import LL, { locale } from '$i18n/i18n-svelte'
	import type { Translation } from '$i18n/i18n-types'
	import { IconSend } from '$lib/icons'
	import { redirectToHome } from '$utils/navigation'
	import toast from 'svelte-french-toast'

	type ErrKey = keyof Translation['contact_page']['err']

	interface Props {
		superFormData: any
	}

	let { superFormData }: Props = $props()
	// svelte-ignore state_referenced_locally
	const { form, errors, message, submitting } = superFormData

	let err_clone = $derived($errors as any)
	let err_keys = $derived(err_clone ? err_clone[Object.keys(err_clone)[0]] || [] : [])
	let err_msg = $derived(err_keys.length > 1 ? (err_keys[1] as ErrKey) : (err_keys[0] as ErrKey))

	$effect(() => {
		// Read URL search params to auto-fill tour inquiry if redirected from Tour Details
		if (typeof window !== 'undefined') {
			const params = new URLSearchParams(window.location.search)
			const tourParam = params.get('tour')
			const durationParam = params.get('duration')
			const codeParam = params.get('code')

			if (tourParam && !$form.msg) {
				const info = [`Tour: ${tourParam}`]
				if (durationParam) info.push(`Duration: ${durationParam}`)
				if (codeParam) info.push(`Code: ${codeParam}`)
				$form.msg = info.join(' | ')
			}
		}
	})

	$effect(() => {
		if ($message === 'success') {
			redirectToHome($locale)
			toast.success($LL.contact_page.success())
		} else if ($message === 'failed') {
			toast.error($LL.contact_page.err.err_submit())
		}
	})
</script>

{#if err_msg}
	<div class="-my-2 text-xs text-red-500">
		<small>{$LL.contact_page.err[err_msg]()}</small>
	</div>
{/if}

<div class="flex flex-col gap-4">
	<div>
		<label
			class="mb-1 block text-xs font-bold uppercase tracking-wider text-foreground-muted"
			for="cfi-name">
			{$LL.contact_page.placeholder.name()}
		</label>
		<input
			id="cfi-name"
			bind:value={$form.name}
			type="text"
			name="name"
			required
			placeholder="Nguyễn Văn A"
			class="w-full border border-border bg-background/50 px-4 py-3 text-sm transition-colors focus:border-foreground focus:bg-surface focus:outline-none" />
	</div>

	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
		<div>
			<label
				class="mb-1 block text-xs font-bold uppercase tracking-wider text-foreground-muted"
				for="cfi-email">
				{$LL.contact_page.placeholder.email()}
			</label>
			<input
				id="cfi-email"
				bind:value={$form.email}
				type="email"
				name="email"
				required
				placeholder="email@example.com"
				class="w-full border border-border bg-background/50 px-4 py-3 text-sm transition-colors focus:border-foreground focus:bg-surface focus:outline-none" />
		</div>
		<div>
			<label
				class="mb-1 block text-xs font-bold uppercase tracking-wider text-foreground-muted"
				for="cfi-phone">
				{$LL.contact_page.placeholder.phone()}
			</label>
			<input
				id="cfi-phone"
				bind:value={$form.phone}
				type="text"
				name="phone"
				required
				placeholder="0901234567"
				class="w-full border border-border bg-background/50 px-4 py-3 text-sm transition-colors focus:border-foreground focus:bg-surface focus:outline-none" />
		</div>
	</div>

	<div>
		<label
			class="mb-1 block text-xs font-bold uppercase tracking-wider text-foreground-muted"
			for="cfi-langs">
			{$LL.contact_page.placeholder.langs()}
		</label>
		<input
			id="cfi-langs"
			bind:value={$form.langs}
			type="text"
			name="langs"
			placeholder="Vietnamese / English / French"
			class="w-full border border-border bg-background/50 px-4 py-3 text-sm transition-colors focus:border-foreground focus:bg-surface focus:outline-none" />
	</div>

	<div>
		<label
			class="mb-1 block text-xs font-bold uppercase tracking-wider text-foreground-muted"
			for="cfi-msg">
			{$LL.contact_page.placeholder.msg()}
		</label>
		<textarea
			id="cfi-msg"
			bind:value={$form.msg}
			name="msg"
			rows="5"
			placeholder={$LL.contact_page.placeholder.msg()}
			class="w-full resize-none border border-border bg-background/50 px-4 py-3 text-sm transition-colors focus:border-foreground focus:bg-surface focus:outline-none"
		></textarea>
	</div>

	<!-- Invisible Honeypot field to trap spam bots -->
	<div
		class="hidden"
		aria-hidden="true"
		style="display:none !important; position:absolute; left:-9999px;">
		<label for="cfi-website">Website</label>
		<input
			id="cfi-website"
			type="text"
			name="website"
			tabindex="-1"
			autocomplete="off" />
	</div>

	<button
		type="submit"
		disabled={$submitting}
		class="mt-2 flex w-full items-center justify-center gap-2 bg-inverse py-4 text-xs uppercase tracking-widest text-inverse-foreground transition-colors hover:bg-inverse-dark disabled:opacity-50">
		<span>{$submitting ? 'Sending...' : $LL.contact_page.page.submit()}</span>
		<IconSend class="h-3.5 w-3.5" />
	</button>
</div>
