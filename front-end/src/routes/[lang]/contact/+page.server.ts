import { DISCORD_WEBHOOK_URL } from '$env/static/private'
import defaultTestimonials from '$lib/constants/testimonials.json'
import { sendClientConfirmation, sendMail } from '$lib/server/email'
import { Logger } from '$lib/utils/logger'
import { form_schema, type FormSchema } from '$utils/form-schema'
import { fail } from '@sveltejs/kit'
import { zod } from 'sveltekit-superforms/adapters'
import { message, superValidate } from 'sveltekit-superforms/server'
import type { PageServerLoad } from './$types'

interface SubmissionData extends FormSchema {
	tags?: string[]
}

const sendEmail = async (data: SubmissionData) => {
	const bodyText = `
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
		text: bodyText,
	})
}

const sendToDiscord = async (data: SubmissionData) => {
	if (!DISCORD_WEBHOOK_URL) return

	const discordBody = {
		content: `📬 **Liên hệ mới từ CHD Travel Website**\n**Tên:** ${data.name}\n**Email:** ${data.email}\n**SĐT:** ${data.phone}\n**Ngôn ngữ:** ${data.langs}\n**Dịch vụ:** ${(data.tags || []).join(', ')}\n**Nội dung:**\n> ${data.msg.replace(/\n/g, '\n> ')}`,
	}

	return fetch(DISCORD_WEBHOOK_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(discordBody),
	})
}

export const load: PageServerLoad = async ({ setHeaders }) => {
	setHeaders({
		'cache-control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=7200',
	})
	const form = await superValidate<FormSchema, string>(zod(form_schema as any) as any)
	return { form, testimonials: defaultTestimonials }
}

export const actions = {
	default: async ({ request }) => {
		const requestClone = request.clone()
		const form = await superValidate<FormSchema, string>(request, zod(form_schema as any) as any)
		const tagsFormData = await requestClone.formData()
		const allTags = tagsFormData.getAll('selected_tag').map(t => String(t))
		const submission: SubmissionData = {
			name: form.data.name,
			email: form.data.email,
			phone: form.data.phone,
			langs: form.data.langs,
			msg: form.data.msg,
			tags: allTags,
		}

		if (!form.valid) {
			return fail(400, { form })
		}

		try {
			// Primary notification (Admin email)
			const emailRes = await sendEmail(submission)
			if (!emailRes) {
				Logger.warn('ContactAction', 'Admin email skipped or returned empty response')
			}

			// Secondary notifications (Client confirmation + Discord notification) - Wait to settle before returning
			const secondaryResults = await Promise.allSettled([
				sendClientConfirmation({
					name: submission.name,
					email: submission.email,
					langs: submission.langs,
					message: submission.msg,
				}),
				sendToDiscord(submission),
			])

			const [clientConf, discordRes] = secondaryResults
			if (clientConf.status === 'rejected') {
				Logger.error('ContactAction', 'Secondary: Client Confirmation failed:', clientConf.reason)
			}
			if (discordRes.status === 'rejected') {
				Logger.error('ContactAction', 'Secondary: Discord Webhook failed:', discordRes.reason)
			}

			return message(form, 'success')
		} catch (err) {
			Logger.error('ContactAction', 'Primary Contact submission error:', err)
			return message(form, 'failed')
		}
	},
}
