import {gen_locale_field} from '../helper-functions'
import {LOCALES} from './constants'

const locale_translations = {
  title: 'Ngôn ngữ khác',
  name: 'translations',
  options: {
    collapsible: true,
    collapsed: true,
  },
}

export const locale_string = {
  title: 'Localized string',
  name: 'locale_string',
  type: 'object',
  fieldsets: [locale_translations],
  fields: gen_locale_field(LOCALES, 'string'),
}

export const localeString = {
  title: 'Localized string',
  name: 'localeString',
  type: 'object',
  fieldsets: [locale_translations],
  fields: gen_locale_field(LOCALES, 'string'),
}

export const locale_content = {
  title: 'Localized Content',
  name: 'locale_content',
  type: 'object',
  fieldsets: [locale_translations],
  fields: gen_locale_field(LOCALES, 'content_block'),
}

export const locale_slug = {
  title: 'Localized slug',
  name: 'locale_slug',
  type: 'object',
  fieldsets: [locale_translations],
  fields: LOCALES.map((locale) => ({
    title: locale.title,
    name: locale.id,
    type: 'slug',
    options: {
      source: (doc: any) => {
        // Support both blog post (doc.title) and tour (doc.tourName)
        const titleObj = doc?.title || doc?.tourName
        if (typeof titleObj === 'string') return titleObj
        return (
          titleObj?.[locale.id] ||
          titleObj?.vn ||
          titleObj?.en ||
          titleObj?.fr ||
          ''
        )
      },
      maxLength: 96,
    },
    fieldset: locale.isDefault ? null : 'translations',
  })),
}
