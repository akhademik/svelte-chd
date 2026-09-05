import { DISCORD_WEBHOOK_URL, NOTIFY_EMAIL, RESEND_API_KEY } from '$env/static/private'
import { json } from '@sveltejs/kit'
import { Resend } from 'resend'

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null

export const POST = async ({ request }) => {
	try {
		const data = await request.json()
		const { name, contact, date, guests, tour } = data

		if (!name || !contact) {
			return json({ message: 'Missing required fields' }, { status: 400 })
		}

		const body_text = `
Loại: Quick Booking
Tour: ${tour || 'N/A'}
Tên: ${name}
Liên hệ (SĐT/Email): ${contact}
Ngày dự kiến: ${date || 'Chưa xác định'}
Số lượng khách: ${guests || 1}
`.trim()

		const send_email = async () => {
			if (!resend || !RESEND_API_KEY) {
				console.warn('[Resend]: RESEND_API_KEY not configured. Skipping booking email.')
				return
			}
			return resend.emails.send({
				from: 'onboarding@resend.dev',
				to: NOTIFY_EMAIL || 'hajtran@gmail.com',
				subject: `[Booking Mới] ${tour || 'Tour'} - ${name}`,
				text: body_text,
			})
		}

		const send_to_discord = async () => {
			if (!DISCORD_WEBHOOK_URL) return
			return fetch(DISCORD_WEBHOOK_URL, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					content: `⚡ **Đặt Tour Nhanh Mới (Quick Booking)**\n**Tour:** ${tour || 'N/A'}\n**Tên:** ${name}\n**Liên hệ:** ${contact}\n**Ngày:** ${date || 'Chưa xác định'}\n**Số khách:** ${guests || 1}`,
				}),
			})
		}

		await Promise.allSettled([send_email(), send_to_discord()])

		return json({ success: true }, { status: 200 })
	} catch (err) {
		console.error('[Booking error]:', err)
		return json({ message: 'Internal server error' }, { status: 500 })
	}
}
