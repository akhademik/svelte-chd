import { describe, it, expect } from 'vitest'
import { formSchema } from './form-schema'

describe('formSchema validation', () => {
	it('should validate correct contact form inputs', () => {
		const validData = {
			name: 'John Doe',
			email: 'john@example.com',
			phone: '+84901234567',
			langs: 'en',
			msg: 'I want to book Lak lake tour',
		}
		const result = formSchema.safeParse(validData)
		expect(result.success).toBe(true)
	})

	it('should reject short name', () => {
		const invalidData = {
			name: 'Jo',
			email: 'john@example.com',
			phone: '+84901234567',
			langs: 'en',
			msg: 'Test message',
		}
		const result = formSchema.safeParse(invalidData)
		expect(result.success).toBe(false)
		if (!result.success) {
			expect(result.error.issues[0].message).toBe('form_name')
		}
	})

	it('should reject invalid email', () => {
		const invalidData = {
			name: 'John Doe',
			email: 'not-an-email',
			phone: '+84901234567',
			langs: 'en',
			msg: 'Test message',
		}
		const result = formSchema.safeParse(invalidData)
		expect(result.success).toBe(false)
		if (!result.success) {
			expect(result.error.issues[0].message).toBe('form_email')
		}
	})

	it('should reject invalid phone format', () => {
		const invalidData = {
			name: 'John Doe',
			email: 'john@example.com',
			phone: '123',
			langs: 'en',
			msg: 'Test message',
		}
		const result = formSchema.safeParse(invalidData)
		expect(result.success).toBe(false)
		if (!result.success) {
			expect(result.error.issues[0].message).toBe('form_phone')
		}
	})
})
