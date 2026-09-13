import type { Locales } from '$i18n/i18n-types'

const EN_MONTHS = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec',
]

const FR_MONTHS = [
	'Janv',
	'Févr',
	'Mars',
	'Avr',
	'Mai',
	'Juin',
	'Juil',
	'Août',
	'Sept',
	'Oct',
	'Nov',
	'Déc',
]

export const format_review_date = (dateStr?: string, locale: Locales | string = 'en'): string => {
	if (!dateStr || !dateStr.trim()) return ''

	const trimmed = dateStr.trim()
	let month = 0
	let year = ''

	if (trimmed.includes('-')) {
		const parts = trimmed.split('-')
		if (parts[0].length === 4) {
			// YYYY-MM
			year = parts[0]
			month = parseInt(parts[1], 10)
		} else {
			// MM-YYYY
			month = parseInt(parts[0], 10)
			year = parts[1]
		}
	} else {
		return trimmed
	}

	if (!month || month < 1 || month > 12 || !year) return trimmed

	const loc = (locale || 'en') as string
	if (loc === 'vi' || loc === 'vn') {
		return `Tháng ${month}, ${year}`
	}
	if (loc === 'fr') {
		return `${FR_MONTHS[month - 1]} ${year}`
	}
	return `${EN_MONTHS[month - 1]} ${year}`
}
