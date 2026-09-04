import {Stack, Text, TextInput} from '@sanity/ui'
import {useCallback} from 'react'
import {NumberInputProps, set, unset} from 'sanity'

export const add_thousand_separator = (value?: string | number | null) => {
  if (value === undefined || value === null || value === '') return ''
  const str = String(value)
  return str
    .replace(/\D/g, '') // remove all non-digit
    .replace(/^0+/, '') // remove leading zero
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',') // insert ',' every 3 digits for thousand separators
}

const parseNumber = (value?: string | number | null) => {
  if (value === undefined || value === null || value === '') return undefined
  const cleaned = String(value).replace(/,/g, '').replace(/\D/g, '')
  return cleaned ? Number(cleaned) : undefined
}

export const CNumberInput = (props: NumberInputProps) => {
  const {onChange, value, elementProps} = props
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const parsed = parseNumber(event.currentTarget.value)
      onChange(parsed !== undefined ? set(parsed) : unset())
    },
    [onChange],
  )
  return (
    <Stack gap={3}>
      <div style={{display: 'flex', alignItems: 'center', columnGap: '5px'}}>
        <TextInput
          {...elementProps}
          onChange={handleChange}
          value={add_thousand_separator(value)}
          style={{width: '150px'}}
        />
        <Text size={1} style={{fontWeight: 'bold'}}>
          VND
        </Text>
      </div>
    </Stack>
  )
}
