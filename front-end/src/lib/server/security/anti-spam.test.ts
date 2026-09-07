import { describe, expect, it } from 'vitest'
import { isSpamSubmission } from './anti-spam'

describe('Anti-Spam Honeypot', () => {
	it('identifies genuine submission when honeypot fields are empty', () => {
		const formData = new FormData()
		formData.append('name', 'John Doe')
		formData.append('email', 'john@example.com')
		formData.append('website', '')

		expect(isSpamSubmission(formData)).toBe(false)
	})

	it('identifies bot spam when honeypot is filled in FormData', () => {
		const formData = new FormData()
		formData.append('name', 'Bot spammer')
		formData.append('website', 'http://spam-link.com')

		expect(isSpamSubmission(formData)).toBe(true)
	})

	it('identifies bot spam when honeypot is filled in JSON object', () => {
		const data = {
			name: 'Bot Spammer',
			contact: 'bot@spam.com',
			fax: '123456789',
		}

		expect(isSpamSubmission(data)).toBe(true)
	})
})
