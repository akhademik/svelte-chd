import { goto } from '$app/navigation'
import type { Locales } from '$i18n/i18n-types'

export const redirect_to_home = (locale: Locales) => {
	setTimeout(() => {
		goto(`/${locale}`)
	}, 2000)
}
