import { NOTIFY_EMAIL, RESEND_API_KEY } from '$env/static/private'
import { Resend } from 'resend'
import { generateClientEmailHtml } from './email-template'

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null

export const getFromEmail = () => {
	return 'noreply@chdtravel.com'
}

export const getAdminNotifyEmail = () => {
	return NOTIFY_EMAIL || 'info@chdtravel.com'
}

export interface SendMailOptions {
	to?: string
	replyTo?: string
	subject: string
	text: string
	html?: string
}

export const sendMail = async (options: SendMailOptions) => {
	if (!resend || !RESEND_API_KEY) {
		console.warn('[Resend]: RESEND_API_KEY not configured. Skipping email sending.')
		return null
	}

	const recipient = options.to || getAdminNotifyEmail()

	return resend.emails.send({
		from: `CHD Travel <${getFromEmail()}>`,
		to: recipient,
		replyTo: options.replyTo,
		subject: options.subject,
		text: options.text,
		...(options.html ? { html: options.html } : {}),
	})
}

interface ClientConfirmationData {
	name: string
	email: string
	langs?: string
	tour?: string
	date?: string
	guests?: string | number
	message?: string
}

export const sendClientConfirmation = async (data: ClientConfirmationData) => {
	if (!data.email || !data.email.includes('@')) return null

	const lang = (data.langs || 'en').toLowerCase()

	let subject = 'Thank you for reaching out to CHD Travel'
	let greeting = `Dear ${data.name},`
	let confirmationMsg =
		'We have warmly received your inquiry. Our local team in the Central Highlands is reviewing your request and will get back to you personally within 24 hours.'
	let detailsTitle = 'Your Request Summary'
	let footerMsg =
		'CHD Travel — Go local · See local · Eat local\nBuon Ma Thuot, Dak Lak, Vietnam\nEmail: info@chdtravel.com | Web: https://chd.travel'

	if (lang === 'vn' || lang === 'vi') {
		subject = 'Xác nhận yêu cầu từ CHD Travel'
		greeting = `Chào bạn ${data.name},`
		confirmationMsg =
			'CHD Travel đã nhận được thông tin liên hệ của bạn. Đội ngũ bản địa tại Tây Nguyên sẽ xem xét và phản hồi trực tiếp tới bạn trong vòng 24 giờ tới.'
		detailsTitle = 'Tóm tắt thông tin gửi'
		footerMsg =
			'CHD Travel — Đi như người bản địa · Trải nghiệm nguyên bản\nBuôn Ma Thuột, Đắk Lắk, Việt Nam\nEmail: info@chdtravel.com | Web: https://chd.travel'
	} else if (lang === 'fr') {
		subject = 'Confirmation de votre demande — CHD Travel'
		greeting = `Bonjour ${data.name},`
		confirmationMsg =
			'Nous avons bien reçu votre message. Notre équipe locale des Hauts Plateaux étudie votre demande et vous répondra personnellement dans les 24 heures.'
		detailsTitle = 'Récapitulatif de votre demande'
		footerMsg =
			'CHD Travel — Voyagez local · Rencontres authentiques\nBuon Ma Thuot, Dak Lak, Vietnam\nEmail: info@chdtravel.com | Web: https://chd.travel'
	}

	const plainText = `
${greeting}

${confirmationMsg}

--- ${detailsTitle} ---
${data.tour ? `Tour: ${data.tour}\n` : ''}${data.date ? `Ngày/Date: ${data.date}\n` : ''}${data.guests ? `Số khách/Guests: ${data.guests}\n` : ''}${data.message ? `Nội dung/Message:\n${data.message}\n` : ''}
-------------------------

${footerMsg}
`.trim()

	const htmlContent = generateClientEmailHtml({
		greeting,
		confirmationMsg,
		detailsTitle,
		tour: data.tour,
		date: data.date,
		guests: data.guests,
		message: data.message,
	})

	return sendMail({
		to: data.email,
		replyTo: getAdminNotifyEmail(),
		subject,
		text: plainText,
		html: htmlContent,
	})
}
