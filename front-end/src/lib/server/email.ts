import { NOTIFY_EMAIL, RESEND_API_KEY } from '$env/static/private'
import { Resend } from 'resend'

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null

export const getFromEmail = () => {
	return 'onboarding@resend.dev'
}

export const getAdminNotifyEmail = () => {
	return NOTIFY_EMAIL || 'info@chdtravel.com'
}

export interface SendMailOptions {
	to?: string
	replyTo?: string
	subject: string
	text: string
}

export const sendMail = async (options: SendMailOptions) => {
	if (!resend || !RESEND_API_KEY) {
		console.warn('[Resend]: RESEND_API_KEY not configured. Skipping email sending.')
		return null
	}

	const recipient = options.to || getAdminNotifyEmail()

	return resend.emails.send({
		from: getFromEmail(),
		to: recipient,
		replyTo: options.replyTo,
		subject: options.subject,
		text: options.text,
	})
}
