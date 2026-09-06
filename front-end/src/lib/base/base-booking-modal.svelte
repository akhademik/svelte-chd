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
		class="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 p-4 backdrop-blur-sm"
		role="button"
		tabindex="0"
		onclick={close}
		onkeydown={e => e.key === 'Escape' && close()}>
		<!-- Modal box -->
		<div
			transition:scale={{ start: 0.95, duration: 200 }}
			class="relative max-h-[90vh] w-full max-w-lg overflow-y-auto border border-stone-200 bg-white p-6 text-stone-900 shadow-2xl sm:p-8"
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

			<h3 class="mb-6 font-serif text-2xl text-stone-900">
				{$LL.tours.detail.enquiry_title()}
			</h3>

			<form
				onsubmit={handleSubmit}
				class="space-y-4">
				<div>
					<label
						class="mb-1 block text-[11px] font-medium uppercase tracking-wider text-stone-600"
						for="booking-tour">
						{$LL.tours.detail.interested_in()}
					</label>
					<input
						id="booking-tour"
						type="text"
						readonly
						value={$booking_modal.tourName}
						class="w-full border border-stone-300 bg-sand-card/70 px-3.5 py-2.5 text-sm font-medium text-stone-800 focus:outline-none" />
				</div>

				<div>
					<label
						class="mb-1 block text-[11px] font-medium uppercase tracking-wider text-stone-600"
						for="booking-name">
						{$LL.contact_page.placeholder.name()}
					</label>
					<input
						id="booking-name"
						type="text"
						required
						bind:value={name}
						class="w-full border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-sm focus:border-stone-900 focus:bg-white focus:outline-none"
						placeholder="Nguyễn Văn A" />
				</div>
				<div>
					<label
						class="mb-1 block text-[11px] font-medium uppercase tracking-wider text-stone-600"
						for="booking-contact">
						{$LL.contact_page.placeholder.phone()} / {$LL.contact_page.placeholder.email()}
					</label>
					<input
						id="booking-contact"
						type="text"
						required
						bind:value={contact}
						class="w-full border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-sm focus:border-stone-900 focus:bg-white focus:outline-none"
						placeholder="+84 ... / email@..." />
				</div>
				<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<div>
						<label
							class="mb-1 block text-[11px] font-medium uppercase tracking-wider text-stone-600"
							for="booking-date">
							{$LL.tours.detail.travelling_date()}
						</label>
						<input
							id="booking-date"
							type="date"
							bind:value={date}
							class="w-full border border-stone-200 bg-stone-50 px-3.5 py-2 text-sm text-stone-700 focus:border-stone-900 focus:bg-white focus:outline-none" />
					</div>
					<div>
						<label
							class="mb-1 block text-[11px] font-medium uppercase tracking-wider text-stone-600"
							for="booking-guests">
							{$LL.tours.detail.how_many_people()}
						</label>
						<input
							id="booking-guests"
							type="number"
							min="1"
							bind:value={guests}
							class="w-full border border-stone-200 bg-stone-50 px-3.5 py-2 text-sm focus:border-stone-900 focus:bg-white focus:outline-none" />
					</div>
				</div>

				<div>
					<label
						class="mb-1 block text-[11px] font-medium uppercase tracking-wider text-stone-600"
						for="booking-note">
						{$LL.tours.detail.notes_question()}
					</label>
					<textarea
						id="booking-note"
						rows="3"
						bind:value={note}
						class="w-full border border-stone-200 bg-stone-50 px-3.5 py-2 text-sm focus:border-stone-900 focus:bg-white focus:outline-none"
						placeholder={$locale === 'vn'
							? 'Yêu cầu đặc biệt về ẩm thực, đón trả hoặc ghi chú thêm...'
							: 'Dietary preferences, pickup points, or any special requests...'}></textarea>
				</div>

				<button
					type="submit"
					disabled={isSubmitting}
					class="mt-4 w-full bg-moss py-3.5 text-xs font-semibold uppercase tracking-widest text-white shadow-sm transition-colors hover:bg-moss-hover disabled:opacity-50">
					{isSubmitting ? 'Sending...' : $LL.tours.detail.send_enquiry()}
				</button>
			</form>
		</div>
	</div>
{/if}
