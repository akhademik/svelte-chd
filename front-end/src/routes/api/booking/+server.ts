import { DISCORD_WEBHOOK_URL } from '$env/static/private'
import { sendClientConfirmation, sendMail } from '$lib/server/email'
import { Logger } from '$lib/utils/logger'
import { json } from '@sveltejs/kit'

export const POST = async ({ request }) => {
	try {
		const data = (await request.json()) as Record<string, any>
		const { name, contact, date, guests, tour, note, langs } = data

		if (!name || !contact) {
			return json({ message: 'Missing required fields' }, { status: 400 })
		}

		const isEmail = contact.includes('@')
		const email = isEmail ? contact : ''
		const phone = isEmail ? '' : contact

		const bodyText = `
Loại yêu cầu: Đặt tour (Booking)
Tour: ${tour || 'Chưa chọn'}
Tên khách hàng: ${name}
Email: ${email || contact}
SĐT: ${phone || contact}
Ngôn ngữ: ${langs || 'vn'}
Ngày dự kiến: ${date || 'Chưa xác định'}
Số lượng khách: ${guests || 1}

Nội dung / Ghi chú thêm:
${note || 'Không có ghi chú thêm.'}
`.trim()

		const sendAdminEmail = async () => {
			return sendMail({
				replyTo: email || undefined,
				subject: `[Đặt Tour] ${tour || 'Tour'} - ${name}`,
				text: bodyText,
			})
		}

		const sendConfirmation = async () => {
			if (!email) return null
			return sendClientConfirmation({
				name,
				email,
				langs,
				tour,
				date,
				guests,
				message: note,
			})
		}

		const sendToDiscord = async () => {
			if (!DISCORD_WEBHOOK_URL) return
			return fetch(DISCORD_WEBHOOK_URL, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					content: `🎯 **Yêu Cầu Đặt Tour Mới**\n**Tour:** ${tour || 'N/A'}\n**Khách hàng:** ${name}\n**Liên hệ:** ${contact}\n**Ngày khởi hành:** ${date || 'Chưa xác định'}\n**Số khách:** ${guests || 1}\n**Ghi chú:**\n> ${(note || 'Không có').replace(/\n/g, '\n> ')}`,
				}),
			})
		}

		// Primary notification (Admin email)
		const emailRes = await sendAdminEmail()
		if (!emailRes) {
			Logger.warn('BookingAction', 'Admin booking email skipped or returned empty response')
		}

		// Secondary notifications (Client confirmation + Discord notification) - Wait to settle before returning
		const secondaryResults = await Promise.allSettled([sendConfirmation(), sendToDiscord()])
		const [clientConf, discordRes] = secondaryResults
		if (clientConf.status === 'rejected') {
			Logger.error(
				'BookingAction',
				'Secondary Booking: Client Confirmation failed:',
				clientConf.reason
			)
		}
		if (discordRes.status === 'rejected') {
			Logger.error('BookingAction', 'Secondary Booking: Discord Webhook failed:', discordRes.reason)
		}

		return json({ success: true }, { status: 200 })
	} catch (err) {
		Logger.error('BookingAction', 'Booking error:', err)
		return json({ message: 'Internal server error' }, { status: 500 })
	}
}
