export interface EmailTemplateProps {
	greeting: string
	confirmationMsg: string
	detailsTitle: string
	tour?: string
	date?: string
	guests?: string | number
	message?: string
}

export function generateClientEmailHtml(props: EmailTemplateProps): string {
	const { greeting, confirmationMsg, detailsTitle, tour, date, guests, message } = props

	return `<!DOCTYPE html>
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
        ${tour ? `<div class="summary-item"><strong>Tour:</strong> ${tour}</div>` : ''}
        ${date ? `<div class="summary-item"><strong>Date:</strong> ${date}</div>` : ''}
        ${guests ? `<div class="summary-item"><strong>Guests:</strong> ${guests}</div>` : ''}
        ${message ? `<div class="summary-item"><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</div>` : ''}
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
</html>`.trim()
}
