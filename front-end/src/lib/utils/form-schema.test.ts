import { describe, it, expect } from 'vitest'
import { bookingApiSchema, formSchema, type BookingApiSchema } from './form-schema'

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

describe('bookingApiSchema validation', () => {
	it('should validate correct booking payloads with email contact', () => {
		const valid: BookingApiSchema = {
			name: 'Nguyen Van A',
			contact: 'test@example.com',
			tour: 'Lak Lake Tour',
			date: '2026-10-01',
			guests: 2,
			note: 'Vegetarian meals',
			langs: 'vi',
		}
		const result = bookingApiSchema.safeParse(valid)
		expect(result.success).toBe(true)
	})

	it('should validate correct booking payloads with phone contact', () => {
		const valid = {
			name: 'Nguyen Van A',
			contact: '+84901234567',
			guests: '4',
		}
		const result = bookingApiSchema.safeParse(valid)
		expect(result.success).toBe(true)
		if (result.success) {
			expect(result.data.guests).toBe(4)
			expect(result.data.langs).toBe('vi')
		}
	})

	it('should reject invalid contact that is neither email nor valid phone', () => {
		const invalid = {
			name: 'Nguyen Van A',
			contact: 'abc',
		}
		const result = bookingApiSchema.safeParse(invalid)
		expect(result.success).toBe(false)
	})

	it('should reject missing name or short name', () => {
		const invalid = {
			name: 'A',
			contact: 'test@example.com',
		}
		const result = bookingApiSchema.safeParse(invalid)
		expect(result.success).toBe(false)
	})
})
