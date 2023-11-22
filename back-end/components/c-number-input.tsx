import {Stack, Text, TextInput} from '@sanity/ui'
import {useCallback} from 'react'
import {StringInputProps, set, unset} from 'sanity'

export const add_thousand_separator = (value: string) => {
  return value
    .replace(/\D/g, '') // remove all non-digit
    .replace(/^0+/, '') // remove leading zero
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',') // insert ',' every 3 digits for thousand separators
}

const parseNumber = (value: string) => {
  return value.replace(/,/g, '')
}

export const CNumberInput = (props: StringInputProps) => {
  const {onChange, value = '', elementProps} = props
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      onChange(event.currentTarget.value ? set(parseNumber(event.currentTarget.value)) : unset()),
    [onChange],
  )
  return (
    <Stack space={3}>
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
