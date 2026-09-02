<script lang="ts">
	import LL from '$i18n/i18n-svelte'
	import { booking_modal } from '$lib/stores/booking-store'
	import toast from 'svelte-french-toast'
	import { fade, scale } from 'svelte/transition'

	let name = $state('')
	let contact = $state('')
	let date = $state('')
	let guests = $state(2)
	let isSubmitting = $state(false)

	const close = () => {
		booking_modal.close()
	}

	const handleSubmit = async (e: SubmitEvent) => {
		e.preventDefault()
		isSubmitting = true
		try {
			const res = await fetch('https://submit-form.com/FDkjl2H3', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
				body: JSON.stringify({
					type: 'Quick Booking',
					tour: $booking_modal.tourName,
					name,
					contact,
					date,
					guests,
				}),
			})
			if (res.ok) {
				toast.success($LL.contact_page.success())
				close()
				name = ''
				contact = ''
				date = ''
				guests = 2
			} else {
				toast.error('Could not submit booking. Please try again or contact us directly.')
			}
		} catch {
			toast.error('Network error. Please try again.')
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
			class="relative w-full max-w-lg border border-stone-200 bg-white p-8 text-stone-900 shadow-2xl"
			role="presentation"
			onclick={e => e.stopPropagation()}
			onkeydown={e => e.stopPropagation()}>
			<button
				onclick={close}
				class="absolute right-6 top-6 text-stone-400 transition-colors hover:text-stone-900"
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
