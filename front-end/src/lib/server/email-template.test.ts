import { describe, it, expect } from 'vitest'
import { generateClientEmailHtml } from './email-template'

describe('generateClientEmailHtml', () => {
	it('should escape HTML in dynamic variables to prevent injection', () => {
		const html = generateClientEmailHtml({
			greeting: '<script>alert("hack")</script> Dear Tester',
			confirmationMsg: 'Thanks for <img src=x onerror=alert(1)> booking',
			detailsTitle: '<b>Summary</b>',
			tour: '<svg onload=alert(1)>Dak Lak Tour',
			date: '2026-09-14',
			guests: '2',
			message: 'Hello <iframe src="javascript:alert(1)"></iframe>\nSecond line',
		})

		expect(html).not.toContain('<script>')
		expect(html).toContain('&lt;script&gt;alert(&quot;hack&quot;)&lt;/script&gt;')
		expect(html).not.toContain('<img src=x')
		expect(html).toContain('&lt;img src=x onerror=alert(1)&gt;')
		expect(html).not.toContain('<svg onload')
		expect(html).toContain('&lt;svg onload=alert(1)&gt;Dak Lak Tour')
		expect(html).not.toContain('<iframe')
		expect(html).toContain(
			'&lt;iframe src=&quot;javascript:alert(1)&quot;&gt;&lt;/iframe&gt;<br/>Second line'
		)
	})
})
