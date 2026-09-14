/**
 * Securely escapes HTML special characters to prevent HTML injection / XSS in emails or rendered templates.
 */
export function escapeHtml(str: unknown): string {
	if (str === null || str === undefined) return ''
	return String(str)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;')
}
