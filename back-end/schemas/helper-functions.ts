import {CNumberInput} from '../components/c-number-input'
import type {Field, GenerateField, Locale, PriceRange} from './common/constants'

// GENERATE TYPICAL FIELD
export const generate_field: GenerateField = (_title, _name, _type, _init_value) => {
  const field: Field = {
    name: _name,
    title: _title,
    type: _type,
    validation: (Rule) => Rule.required(),
  }

  if (_init_value !== undefined) {
    field['initialValue'] = _init_value
  }

  return field
}

// GENERATE FIELD FOR LOCALES
export const gen_locale_field = (_locales: Locale[], _type: string) => {
  return _locales.map((locale) => ({
    title: locale.title,
    name: locale.id,
    type: _type,
    validation: (Rule: {required: () => any}) => Rule.required(),
    fieldset: locale.isDefault ? null : 'translations',
  }))
}

// GENERATE PRICE RANGE
export const gen_price_range = (_range: PriceRange[]) => {
  return _range.map((each_price) => {
    const price: any = {
      title: each_price.title,
      name: each_price.id,
      type: 'number',
      fieldset: 'price_range',
      components: {
        input: CNumberInput,
      },
    }

    if (each_price.required) {
      price.validation = (Rule: {required: () => any}) => Rule.required()
    }

    return price
  })
}
