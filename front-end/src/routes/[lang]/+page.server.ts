import {
	DISCORD_WEBHOOK_URL,
	NOTIFY_EMAIL,
	RESEND_API_KEY,
	VITE_SANITY_ID,
} from '$env/static/private'
import type { BlogPost } from '$lib/types/blog.type'
import { form_schema, type FormSchema } from '$utils/form-schema'
import { type ClientConfig, createClient } from '@sanity/client'
import { fail } from '@sveltejs/kit'
import { Resend } from 'resend'
import { zod } from 'sveltekit-superforms/adapters'
import { message, superValidate } from 'sveltekit-superforms/server'

const sanityConfig: ClientConfig = {
	projectId: VITE_SANITY_ID,
	dataset: 'production',
	useCdn: true,
	apiVersion: '2023-11-03',
}

const sanityClient = createClient(sanityConfig)

const extract_blog_fields = `
	_id,
	"title": coalesce(title, {}),
	"slug": coalesce(slug, {}),
	"category": coalesce(category, 'story'),
	"excerpt": coalesce(excerpt, {}),
	"coverImg": coalesce(
		coverImg{
			...,
			"caption": coalesce(caption, asset->title, asset->originalFilename, ''),
			"alt": coalesce(alt, asset->altText, asset->description, '')
		},
		img_cover{
			...,
			"caption": coalesce(caption, asset->title, asset->originalFilename, ''),
			"alt": coalesce(alt, asset->altText, asset->description, '')
		}
	),
	"img_tour": coalesce(
		imgTour[]{
			...,
			"caption": coalesce(caption, asset->title, asset->originalFilename, ''),
			"alt": coalesce(alt, asset->altText, asset->description, '')
		},
		img_tour[]{
			...,
			"caption": coalesce(caption, asset->title, asset->originalFilename, ''),
			"alt": coalesce(alt, asset->altText, asset->description, '')
		},
		[]
	),
	"content": coalesce(content, {}),
	"isFeatured": coalesce(isFeatured, false),
	"publishedAt": coalesce(publishedAt, _createdAt),
	"author": coalesce(author, 'CHD Travel Team')
`

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null

interface SubmissionData extends FormSchema {
	tags?: string[]
}

const send_email = async (data: SubmissionData) => {
	if (!resend || !RESEND_API_KEY) {
		console.warn('[Resend]: RESEND_API_KEY not configured. Skipping email sending.')
		return
	}

	const body_text = `
Tên: ${data.name}
Email: ${data.email}
SĐT: ${data.phone}
Ngôn ngữ: ${data.langs}
Tags: ${(data.tags || []).join(', ')}

Nội dung:
${data.msg}
`.trim()

	return resend.emails.send({
		from: 'onboarding@resend.dev',
		to: NOTIFY_EMAIL || 'hajtran@gmail.com',
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

export const load = async () => {
	const form = await superValidate<FormSchema, string>(zod(form_schema as any) as any)

	let featuredPosts: BlogPost[] = []
	try {
		featuredPosts = await sanityClient.fetch(
			`*[_type == 'blogPost' && isFeatured == true] | order(publishedAt desc, _createdAt desc)[0...6]{${extract_blog_fields}}`
		)
		// Fallback to latest 3 posts if no featured post is explicitly tagged
		if (!featuredPosts || featuredPosts.length === 0) {
			featuredPosts = await sanityClient.fetch(
				`*[_type == 'blogPost'] | order(publishedAt desc, _createdAt desc)[0...3]{${extract_blog_fields}}`
			)
		}
	} catch (err) {
		console.warn('[Sanity Featured Blog load failed]:', err)
	}

	return { form, featuredPosts }
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
			const [email_res] = await Promise.allSettled([
				send_email(last_val),
				send_to_discord(last_val),
			])

			if (email_res.status === 'rejected') {
				console.error('[Resend failed]:', email_res.reason)
				return message(form, 'failed')
			}

			return message(form, 'success')
		} catch (err) {
			console.error('[Contact submission error]:', err)
			return message(form, 'failed')
		}
	},
}
