// TYPE DEFINITION
export type Locale = {
  id: string
  title: string
  isDefault?: boolean
}

export type PriceRange = {
  title: string
  id: string
  required?: boolean
}

export type Field = {
  name: string
  type: string
  title: string
  default?: boolean
  initialValue?: string | boolean
  validation: (Rule: {required: () => any}) => any
}
export type GenerateField = (
  _title: string,
  _name: string,
  _type: string,
  _init_value?: string | boolean,
) => Field

// HAJ 28/09/2023 BEGIN - LOCALES
export const LOCALES: Locale[] = [
  {id: 'vn', title: 'Việt', isDefault: true},
  {id: 'en', title: 'Anh'},
  {id: 'fr', title: 'Pháp'},
]

export const PRICE_RANGE: PriceRange[] = [
  {title: '01 khách', id: 'pax1'},
  {title: '02 khách', id: 'pax2', required: true},
  {title: '03 - 04 khách', id: 'pax3_4'},
  {title: '05 - 06 khách', id: 'pax5_6'},
  {title: '07 - 09 khách', id: 'pax7_9'},
  {title: '10+ khách', id: 'pax10_up'},
]
// HAJ 28/09/2023 END - LOCALES
