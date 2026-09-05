<script lang="ts">
	import LL, { locale } from '$i18n/i18n-svelte'
	import { booking_modal } from '$lib/stores/booking-store'
	import toast from 'svelte-french-toast'
	import { fade, scale } from 'svelte/transition'

	let name = $state('')
	let contact = $state('')
	let date = $state('')
	let guests = $state(2)
	let note = $state('')
	let isSubmitting = $state(false)

	$effect(() => {
		if ($booking_modal.isOpen) {
			if (typeof document !== 'undefined') {
				document.body.style.overflow = 'hidden'
			}
			return () => {
				if (typeof document !== 'undefined') {
					document.body.style.overflow = ''
				}
			}
		}
	})

	const close = () => {
		booking_modal.close()
	}

	const handleSubmit = async (e: SubmitEvent) => {
		e.preventDefault()
		isSubmitting = true
		try {
			const res = await fetch('/api/booking', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					tour: $booking_modal.tourName,
					name,
					contact,
					date,
					guests,
					note,
					langs: $locale || 'en',
				}),
			})
			if (res.ok) {
				toast.success($LL.contact_page.success())
				close()
				name = ''
				contact = ''
				date = ''
				guests = 2
				note = ''
			} else {
				toast.error($LL.contact_page.err.err_submit())
			}
		} catch {
			toast.error($LL.contact_page.err.err_submit())
		} finally {
			isSubmitting = false
		}
	}
</script>

{#if $booking_modal.isOpen}
	<div
		transition:fade={{ duration: 200 }}
		class="fixed inset-0 z-50 flex items-end justify-center bg-stone-900/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
		role="button"
		tabindex="0"
		onclick={close}
		onkeydown={e => e.key === 'Escape' && close()}>
		<!-- Modal box -->
		<div
			transition:scale={{ start: 0.95, duration: 200 }}
			class="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-2xl border-t border-stone-200 bg-white p-6 text-stone-900 shadow-2xl sm:rounded-none sm:border sm:p-8"
			role="presentation"
			onclick={e => e.stopPropagation()}
			onkeydown={e => e.stopPropagation()}>
			<button
				onclick={close}
				class="absolute right-4 top-4 rounded-full p-2 text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-900 sm:right-6 sm:top-6"
				aria-label="Close modal">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round">
					<line
						x1="18"
						y1="6"
						x2="6"
						y2="18"></line>
					<line
						x1="6"
						y1="6"
						x2="18"
						y2="18"></line>
				</svg>
			</button>

			<span class="mb-1 block text-[10px] uppercase tracking-widest text-stone-400">
				Quick Booking
			</span>
			<h3 class="mb-2 font-serif text-2xl text-stone-900">
				{$booking_modal.tourName}
			</h3>
			<p class="mb-6 text-xs font-light text-stone-500">
				{$LL.contact_page.page.have_question()}
			</p>

			<form
				onsubmit={handleSubmit}
				class="space-y-4">
				<div>
					<label
						class="mb-1 block text-[11px] uppercase tracking-wider text-stone-500"
						for="booking-name">
						{$LL.contact_page.placeholder.name()}
					</label>
					<input
						id="booking-name"
						type="text"
						required
						bind:value={name}
						class="w-full border border-stone-200 bg-stone-50 px-3 py-2.5 text-sm focus:border-stone-900 focus:outline-none"
						placeholder="Nguyễn Văn A" />
				</div>
				<div>
					<label
						class="mb-1 block text-[11px] uppercase tracking-wider text-stone-500"
						for="booking-contact">
						{$LL.contact_page.placeholder.phone()} / {$LL.contact_page.placeholder.email()}
					</label>
					<input
						id="booking-contact"
						type="text"
						required
						bind:value={contact}
						class="w-full border border-stone-200 bg-stone-50 px-3 py-2.5 text-sm focus:border-stone-900 focus:outline-none"
						placeholder="+84 ... / email@..." />
				</div>
				<div class="grid grid-cols-2 gap-4">
					<div>
						<label
							class="mb-1 block text-[11px] uppercase tracking-wider text-stone-500"
							for="booking-date">
							Date
						</label>
						<input
							id="booking-date"
							type="date"
							bind:value={date}
							class="w-full border border-stone-200 bg-stone-50 px-3 py-2 text-sm text-stone-700 focus:border-stone-900 focus:outline-none" />
					</div>
					<div>
						<label
							class="mb-1 block text-[11px] uppercase tracking-wider text-stone-500"
							for="booking-guests">
							Guests
						</label>
						<input
							id="booking-guests"
							type="number"
							min="1"
							bind:value={guests}
							class="w-full border border-stone-200 bg-stone-50 px-3 py-2 text-sm focus:border-stone-900 focus:outline-none" />
					</div>
				</div>

				<div>
					<label
						class="mb-1 block text-[11px] uppercase tracking-wider text-stone-500"
						for="booking-note">
						{$LL.contact_page.placeholder.msg()}
					</label>
					<textarea
						id="booking-note"
						rows="3"
						bind:value={note}
						class="w-full border border-stone-200 bg-stone-50 px-3 py-2 text-sm focus:border-stone-900 focus:outline-none"
						placeholder={$locale === 'vn'
							? 'Yêu cầu đặc biệt hoặc ghi chú thêm (tuỳ chọn)...'
							: 'Special requests or additional notes (optional)...'}></textarea>
				</div>

				<button
					type="submit"
					disabled={isSubmitting}
					class="mt-4 w-full bg-stone-900 py-3 text-xs uppercase tracking-widest text-stone-50 transition-colors hover:bg-stone-800 disabled:opacity-50">
					{isSubmitting ? 'Processing...' : $LL.contact_page.page.submit()}
				</button>
			</form>
		</div>
	</div>
{/if}
