import { Logger } from '$lib/utils/logger'

/**
 * Checks if a submission contains bot spam based on invisible honeypot fields.
 * If any honeypot field is filled by a bot, returns true (isSpam = true).
 */
export function isSpamSubmission(
	formData: FormData | Record<string, any>,
	honeypotFields: string[] = ['website', 'company_fax', 'fax']
): boolean {
	for (const field of honeypotFields) {
		let val: unknown
		if (formData instanceof FormData) {
			val = formData.get(field)
		} else {
			val = formData[field]
		}

		if (typeof val === 'string' && val.trim().length > 0) {
			Logger.warn('AntiSpam', `Honeypot trap triggered on field "${field}" with value "${val}"`)
			return true
		}
	}
	return false
}
