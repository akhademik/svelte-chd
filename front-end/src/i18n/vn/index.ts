import type { Translation } from '../i18n-types'
import { about_page } from './about-page.i18n'
import { blog_page } from './blog-page.i18n'
import { contact_page } from './contact-page.i18n'
import { home_page } from './home-page.i18n'
import { nav_bar } from './nav-bar.i18n'
import { seo } from './seo.i18n'
import { tours } from './tour-page.i18n'

const vn = {
	home_page,
	nav_bar,
	contact_page,
	about_page,
	tours,
	blog_page,
	seo,
} satisfies Translation

export default vn
