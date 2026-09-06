<script lang="ts">
	import { page } from '$app/state'
	import LL, { locale } from '$i18n/i18n-svelte'
	import type { Translation } from '$i18n/i18n-types'
	import { redirect_to_home } from '$utils/navigation'
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
		const tourParam = page.url.searchParams.get('tour')

		if (tourParam && !$form.msg) {
			$form.msg =
				$locale === 'vn'
					? `Tôi muốn hỏi thêm thông tin về ${tourParam}... Xin vui lòng tư vấn lịch trình chi tiết và báo giá cho đoàn chúng tôi.`
					: $locale === 'fr'
						? `Je souhaite avoir plus d'informations sur le tour ${tourParam}... Merci de me communiquer les détails et le tarif pour notre groupe.`
						: `I would like to ask for more information about the tour ${tourParam}... Please share the detailed itinerary and quote for our group.`
		}
	})

	$effect(() => {
		if ($message === 'success') {
			redirect_to_home($locale)
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

	<button
		type="submit"
		disabled={$submitting}
		class="mt-2 flex w-full items-center justify-center gap-2 bg-inverse py-4 text-xs uppercase tracking-widest text-inverse-foreground transition-colors hover:bg-inverse-dark disabled:opacity-50">
		<span>{$submitting ? 'Sending...' : $LL.contact_page.page.submit()}</span>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-3.5 w-3.5"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round">
			<line
				x1="22"
				y1="2"
				x2="11"
				y2="13"></line>
			<polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
		</svg>
	</button>
</div>
