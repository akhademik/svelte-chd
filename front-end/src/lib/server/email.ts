import { NOTIFY_EMAIL, RESEND_API_KEY } from '$env/static/private'
import { Resend } from 'resend'

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

	const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4ede4; margin: 0; padding: 24px; color: #2A2720; }
    .container { max-width: 580px; margin: 0 auto; background-color: #ffffff; border-radius: 4px; border: 1px solid #DFD5B9; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .header { background-color: #5F6E56; color: #ffffff; padding: 28px 24px; text-align: center; }
    .header h1 { margin: 0; font-size: 22px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; }
    .header p { margin: 6px 0 0 0; font-size: 13px; opacity: 0.9; letter-spacing: 0.1em; }
    .content { padding: 32px 28px; line-height: 1.6; }
    .content p { margin: 0 0 16px 0; font-size: 15px; }
    .summary-box { background-color: #FAF7F2; border-left: 3px solid #5F6E56; padding: 16px 20px; margin: 24px 0; border-radius: 2px; }
    .summary-title { font-weight: 600; font-size: 14px; color: #5F6E56; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em; }
    .summary-item { font-size: 14px; margin: 4px 0; color: #5C5646; }
    .footer { background-color: #2B2A24; color: #D6CBAE; padding: 24px; text-align: center; font-size: 12px; line-height: 1.6; }
    .footer a { color: #DFD5B9; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>CHD Travel</h1>
      <p>Go local · See local · Eat local</p>
    </div>
    <div class="content">
      <p><strong>${greeting}</strong></p>
      <p>${confirmationMsg}</p>
      <div class="summary-box">
        <div class="summary-title">${detailsTitle}</div>
        ${data.tour ? `<div class="summary-item"><strong>Tour:</strong> ${data.tour}</div>` : ''}
        ${data.date ? `<div class="summary-item"><strong>Date:</strong> ${data.date}</div>` : ''}
        ${data.guests ? `<div class="summary-item"><strong>Guests:</strong> ${data.guests}</div>` : ''}
        ${data.message ? `<div class="summary-item"><strong>Message:</strong><br/>${data.message.replace(/\n/g, '<br/>')}</div>` : ''}
      </div>
      <p style="font-size: 14px; color: #5C5646;">We look forward to sharing our beloved Central Highlands with you.</p>
    </div>
    <div class="footer">
      <strong>CHD Travel — Indigenous Journeys</strong><br/>
      Buon Ma Thuot, Dak Lak, Vietnam<br/>
      <a href="mailto:info@chdtravel.com">info@chdtravel.com</a> · <a href="https://chd.travel">chd.travel</a>
    </div>
  </div>
</body>
</html>
`.trim()

	return sendMail({
		to: data.email,
		replyTo: getAdminNotifyEmail(),
		subject,
		text: plainText,
		html: htmlContent,
	})
}
