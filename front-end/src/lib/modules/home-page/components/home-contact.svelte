<script lang="ts">
	import LL, { locale } from '$i18n/i18n-svelte'
	import type { Translation } from '$i18n/i18n-types'
	import type { Tour } from '$lib/types/tour.type'
	import toast from 'svelte-french-toast'
	import { superForm } from 'sveltekit-superforms/client'

	interface Props {
		data: any
		allTours?: Tour[]
	}

	let { data, allTours = [] }: Props = $props()

	type ErrKey = keyof Translation['contact_page']['err']
	// svelte-ignore state_referenced_locally
	const { form, errors, message, enhance, submitting } = superForm(data?.form || {}, {
		id: 'home-contact-form',
	})

	let err_clone = $derived($errors as any)
	let err_keys = $derived(err_clone ? err_clone[Object.keys(err_clone)[0]] || [] : [])
	let err_msg = $derived(err_keys.length > 1 ? (err_keys[1] as ErrKey) : (err_keys[0] as ErrKey))

	$effect(() => {
		if ($message === 'success') {
			toast.success($LL.contact_page.success())
		} else if ($message === 'failed') {
			toast.error($LL.contact_page.err.err_submit())
		}
	})
</script>

<section
	id="contact"
	class="px-6 py-24">
	<div class="mx-auto max-w-6xl">
		<div class="grid grid-cols-1 gap-16 lg:grid-cols-12">
			<!-- Info left -->
			<div class="flex flex-col justify-between lg:col-span-5">
				<div>
					<span class="mb-3 block text-xs font-medium uppercase tracking-[0.25em] text-stone-400">
						03 / Connect
					</span>
					<h2 class="mb-6 font-serif text-3xl font-normal text-stone-900 sm:text-4xl">
						{$LL.contact_page.page.contact_us()}
					</h2>
					<p class="mb-10 text-sm font-light leading-relaxed text-stone-600">
						{$LL.contact_page.page.have_question()}
					</p>

					<div class="space-y-6 text-sm text-stone-700">
						<div class="flex items-start gap-4">
							<div class="bg-stone-100 p-2.5 text-stone-800">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-4 w-4"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round">
									<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
									<circle
										cx="12"
										cy="10"
										r="3"></circle>
								</svg>
							</div>
							<div>
								<span class="block text-xs uppercase tracking-wider text-stone-400">
									{$locale === 'vn' ? 'Địa chỉ' : $locale === 'fr' ? 'Adresse' : 'Address'}
								</span>
								<span class="font-medium text-stone-900">09 Nguyen Binh, Daklak, Vietnam</span>
							</div>
						</div>

						<div class="flex items-start gap-4">
							<div class="bg-stone-100 p-2.5 text-stone-800">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-4 w-4"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round">
									<path
										d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
									></path>
								</svg>
							</div>
							<div>
								<span class="block text-xs uppercase tracking-wider text-stone-400">
									{$locale === 'vn' ? 'Điện thoại / Hotline' : 'Phone'}
								</span>
								<span class="font-medium text-stone-900">0262 396 68 68</span>
							</div>
						</div>

						<div class="flex items-start gap-4">
							<div class="bg-stone-100 p-2.5 text-stone-800">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-4 w-4"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round">
									<rect
										width="20"
										height="16"
										x="2"
										y="4"
										rx="2"></rect>
									<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
								</svg>
							</div>
							<div>
								<span class="block text-xs uppercase tracking-wider text-stone-400">Email</span>
								<span class="font-medium text-stone-900">info@chdtravel.com</span>
							</div>
						</div>
					</div>
				</div>

				<div class="mt-8 space-y-4 border-t border-stone-200 pt-6">
					<div>
						<span class="mb-1 block text-xs uppercase tracking-wider text-stone-400">
							{$locale === 'vn' ? 'Thời gian làm việc' : 'Operating Hours'}
						</span>
						<p class="text-xs font-light text-stone-600">08:00 – 18:00 (Mon – Sun)</p>
					</div>

					<!-- Google Maps Mini-Map Preview -->
					<div class="overflow-hidden border border-stone-200 bg-stone-100">
						<iframe
							title="CHD Travel Location"
							src="https://maps.google.com/maps?q=09+Nguyen+Binh,+Tan+Loi,+Buon+Ma+Thuot,+Dak+Lak,+Vietnam&t=&z=15&ie=UTF8&iwloc=&output=embed"
							width="100%"
							height="180"
							style="border:0;"
							allowfullscreen={false}
							loading="lazy"
							referrerpolicy="no-referrer-when-downgrade"
							class="w-full">
						</iframe>
						<div
							class="flex items-center justify-between bg-stone-50 px-3 py-2 text-[11px] text-stone-600">
							<span class="font-medium text-stone-800">CHD Travel • Buôn Ma Thuột</span>
							<a
								href="https://maps.app.goo.gl/mr8NYztsShiNjfKQ9"
								target="_blank"
								rel="noopener noreferrer"
								class="font-medium text-terracotta hover:underline">
								{$locale === 'vn' ? 'Xem trên Google Maps ↗' : 'View on Google Maps ↗'}
							</a>
						</div>
					</div>
				</div>
			</div>

			<!-- Contact Form right -->
			<div class="border border-stone-200/90 bg-white p-8 sm:p-12 lg:col-span-7">
				<h3 class="mb-6 font-serif text-2xl text-stone-900">
					{$LL.nav_bar.contact()}
				</h3>

				{#if err_msg}
					<div class="mb-4 text-xs text-red-500">
						{$LL.contact_page.err[err_msg] ? $LL.contact_page.err[err_msg]() : ''}
					</div>
				{/if}

				<form
					use:enhance
					method="POST"
					class="space-y-6">
					<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
						<div>
							<label
								class="mb-2 block text-xs uppercase tracking-wider text-stone-500"
								for="cf-name">
								{$LL.contact_page.placeholder.name()}
							</label>
							<input
								id="cf-name"
								name="name"
								type="text"
								required
								bind:value={$form.name}
								class="w-full border border-stone-200 bg-stone-50 px-4 py-3 text-sm transition-colors focus:border-stone-900 focus:bg-white focus:outline-none"
								placeholder="Nguyễn Văn A" />
						</div>
						<div>
							<label
								class="mb-2 block text-xs uppercase tracking-wider text-stone-500"
								for="cf-phone">
								{$LL.contact_page.placeholder.phone()} / Email
							</label>
							<input
								id="cf-phone"
								name="phone"
								type="text"
								required
								bind:value={$form.phone}
								class="w-full border border-stone-200 bg-stone-50 px-4 py-3 text-sm transition-colors focus:border-stone-900 focus:bg-white focus:outline-none"
								placeholder="0901234567" />
						</div>
					</div>

					<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
						<div>
							<label
								class="mb-2 block text-xs uppercase tracking-wider text-stone-500"
								for="cf-email">
								{$LL.contact_page.placeholder.email()}
							</label>
							<input
								id="cf-email"
								name="email"
								type="email"
								required
								bind:value={$form.email}
								class="w-full border border-stone-200 bg-stone-50 px-4 py-3 text-sm transition-colors focus:border-stone-900 focus:bg-white focus:outline-none"
								placeholder="email@example.com" />
						</div>
						<div>
							<label
								class="mb-2 block text-xs uppercase tracking-wider text-stone-500"
								for="cf-langs">
								{$LL.contact_page.placeholder.langs()}
							</label>
							<input
								id="cf-langs"
								name="langs"
								type="text"
								bind:value={$form.langs}
								class="w-full border border-stone-200 bg-stone-50 px-4 py-3 text-sm transition-colors focus:border-stone-900 focus:bg-white focus:outline-none"
								placeholder="Vietnamese / English / French" />
						</div>
					</div>

					{#if allTours.length > 0}
						<div>
							<label
								class="mb-2 block text-xs uppercase tracking-wider text-stone-500"
								for="cf-tour">
								{$locale === 'vn' ? 'Chuyến đi bạn quan tâm' : 'Selected Tour / Inquiry'}
							</label>
							<select
								id="cf-tour"
								name="selected_tag"
								class="w-full border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-700 transition-colors focus:border-stone-900 focus:bg-white focus:outline-none">
								<option value="General">
									{$locale === 'vn'
										? '-- Tư vấn chung / Tour thiết kế riêng --'
										: '-- Custom Tour / Consultation --'}
								</option>
								{#each allTours as tour}
									<option value={tour.tour_name?.[$locale] || tour.tour_name?.en}>
										{tour.tour_name?.[$locale] || tour.tour_name?.en}
									</option>
								{/each}
							</select>
						</div>
					{/if}

					<div>
						<label
							class="mb-2 block text-xs uppercase tracking-wider text-stone-500"
							for="cf-msg">
							{$LL.contact_page.placeholder.msg()}
						</label>
						<textarea
							id="cf-msg"
							name="msg"
							rows="4"
							bind:value={$form.msg}
							class="w-full border border-stone-200 bg-stone-50 px-4 py-3 text-sm transition-colors focus:border-stone-900 focus:bg-white focus:outline-none"
							placeholder={$LL.contact_page.placeholder.msg()}></textarea>
					</div>

					<button
						type="submit"
						disabled={$submitting}
						class="flex w-full items-center justify-center gap-2 bg-stone-900 py-4 text-xs uppercase tracking-widest text-stone-50 transition-colors hover:bg-stone-800 disabled:opacity-50">
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
				</form>
			</div>
		</div>
	</div>
</section>
