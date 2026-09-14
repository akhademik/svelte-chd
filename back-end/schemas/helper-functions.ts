import {CNumberInput} from '../components/c-number-input'
import type {Field, GenerateField, Locale, PriceRange} from './common/constants'

// GENERATE TYPICAL FIELD
export const generateField: GenerateField = (_title, _name, _type, _init_value) => {
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

// GENERATE FIELD FOR LOCALES (Only require default locale, other languages are optional)
export const genLocaleField = (_locales: Locale[], _type: string) => {
  return _locales.map((locale) => ({
    title: locale.title,
    name: locale.id,
    type: _type,
    ...(locale.isDefault ? {validation: (Rule: {required: () => any}) => Rule.required()} : {}),
    fieldset: locale.isDefault ? null : 'translations',
  }))
}

// GENERATE PRICE RANGE
export const genPriceRange = (_range: PriceRange[]) => {
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
      price.validation = (Rule: any) =>
        Rule.custom((value: any, context: any) => {
          if (context?.document?.contactForPrice) return true
          return value !== undefined && value !== null ? true : 'Vui lòng nhập giá'
        })
    }

    return price
  })
}
