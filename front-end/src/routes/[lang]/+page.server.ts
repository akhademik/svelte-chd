import { DISCORD_WEBHOOK_URL } from '$env/static/private'
import defaultTestimonials from '$lib/constants/testimonials.json'
import { sendClientConfirmation, sendMail } from '$lib/server/email'
import { fetchFeaturedBlogs, fetchToursByType } from '$lib/server/sanity-client'
import { form_schema, type FormSchema } from '$utils/form-schema'
import { fail } from '@sveltejs/kit'
import { zod } from 'sveltekit-superforms/adapters'
import { message, superValidate } from 'sveltekit-superforms/server'
import type { PageServerLoad } from './$types'

interface SubmissionData extends FormSchema {
	tags?: string[]
}

const send_email = async (data: SubmissionData) => {
	const body_text = `
Tên: ${data.name}
Email: ${data.email}
SĐT: ${data.phone}
Ngôn ngữ: ${data.langs}
Tags: ${(data.tags || []).join(', ')}

Nội dung:
${data.msg}
`.trim()

	return sendMail({
		replyTo: data.email,
		subject: `Liên hệ mới từ ${data.name}`,
		text: body_text,
	})
}

const send_to_discord = async (data: SubmissionData) => {
	if (!DISCORD_WEBHOOK_URL) return

	const discord_body = {
		content: `📬 **Liên hệ mới từ CHD Travel Website**\n**Tên:** ${data.name}\n**Email:** ${data.email}\n**SĐT:** ${data.phone}\n**Ngôn ngữ:** ${data.langs}\n**Dịch vụ:** ${(data.tags || []).join(', ')}\n**Nội dung:**\n> ${data.msg.replace(/\n/g, '\n> ')}`,
	}

	return fetch(DISCORD_WEBHOOK_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(discord_body),
	})
}

export const load: PageServerLoad = async ({ setHeaders }) => {
	setHeaders({
		'cache-control': 'public, max-age=0, s-maxage=1800, stale-while-revalidate=3600',
	})

	const form = await superValidate<FormSchema, string>(zod(form_schema as any) as any)

	const [dayTours, highlandTours, featuredPosts] = await Promise.all([
		fetchToursByType('day-tours'),
		fetchToursByType('highland-tours'),
		fetchFeaturedBlogs(),
	])

	return {
		form,
		dayTours,
		highlandTours,
		featuredPosts,
		testimonials: defaultTestimonials,
	}
}

export const actions = {
	default: async ({ request }) => {
		const clone_request = request.clone()
		const form = await superValidate<FormSchema, string>(request, zod(form_schema as any) as any)
		const tags = await clone_request.formData()
		const all_tags = tags.getAll('selected_tag').map(t => String(t))
		const last_val: SubmissionData = {
			name: form.data.name,
			email: form.data.email,
			phone: form.data.phone,
			langs: form.data.langs,
			msg: form.data.msg,
			tags: all_tags,
		}

		if (!form.valid) {
			return fail(400, { form })
		}

		try {
			// Primary notification (Admin email)
			const email_res = await send_email(last_val)
			if (!email_res) {
				console.warn('[Admin email]: Skipped or returned empty response')
			}

			// Secondary notifications (Client confirmation + Discord notification) - Fire and handle settled
			Promise.allSettled([
				sendClientConfirmation({
					name: last_val.name,
					email: last_val.email,
					langs: last_val.langs,
					message: last_val.msg,
				}),
				send_to_discord(last_val),
			]).then(results => {
				const [clientConf, discordRes] = results
				if (clientConf.status === 'rejected') {
					console.error('[Secondary: Client Confirmation failed]:', clientConf.reason)
				}
				if (discordRes.status === 'rejected') {
					console.error('[Secondary: Discord Webhook failed]:', discordRes.reason)
				}
			})

			return message(form, 'success')
		} catch (err) {
			console.error('[Primary Contact submission error]:', err)
			return message(form, 'failed')
		}
	},
}
