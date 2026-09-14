import { describe, it, expect } from 'vitest'
import { escapeHtml } from './html-escape'

describe('escapeHtml utility', () => {
	it('should escape HTML tags and attributes', () => {
		expect(escapeHtml('<script>alert(1)</script>')).toBe('&lt;script&gt;alert(1)&lt;/script&gt;')
		expect(escapeHtml('<img src=x onerror="alert(1)">')).toBe(
			'&lt;img src=x onerror=&quot;alert(1)&quot;&gt;'
		)
		expect(escapeHtml('John\'s <Tour> & "Package"')).toBe(
			'John&#39;s &lt;Tour&gt; &amp; &quot;Package&quot;'
		)
	})

	it('should handle null, undefined, and non-string inputs safely', () => {
		expect(escapeHtml(null)).toBe('')
		expect(escapeHtml(undefined)).toBe('')
		expect(escapeHtml(12345)).toBe('12345')
		expect(escapeHtml(0)).toBe('0')
	})
})
