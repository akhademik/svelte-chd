/**
 * Extracts initials for avatar fallback.
 * - If single word: returns first 2 letters uppercase (e.g. "Nguyễn" -> "NG", "John" -> "JO").
 * - If multiple words: returns first letter of first word + first letter of last word uppercase (e.g. "Nguyễn Văn Anh" -> "NA", "John Doe" -> "JD").
 * - If empty: returns "?".
 */
export const get_avatar_initials = (name?: string): string => {
	const words = (name || '').trim().split(/\s+/).filter(Boolean)

	if (words.length === 0) return '?'

	if (words.length === 1) {
		return words[0].slice(0, 2).toUpperCase()
	}

	return (words[0][0] + words[words.length - 1][0]).toUpperCase()
}
