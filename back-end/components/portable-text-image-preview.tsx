import imageUrlBuilder from '@sanity/image-url'
import {Box, Flex, Text} from '@sanity/ui'
import React from 'react'
import {useClient} from 'sanity'

export function PortableTextImagePreview(props: any) {
  const client = useClient({apiVersion: '2023-01-01'})
  const builder = imageUrlBuilder(client)
  const value = props.value || props

  const hasAsset =
    value?.asset?._ref || value?.asset?._id || (typeof value?.asset === 'string' && value?.asset)

  if (!hasAsset) {
    return (
      <Box
        padding={3}
        style={{background: 'rgba(0, 0, 0, 0.03)', borderRadius: 4, textAlign: 'center'}}
      >
        <Text size={1} muted>
          Click to select / upload an image
        </Text>
      </Box>
    )
  }

  // Generate image URL with crop and hotspot applied
  const imgUrl = builder.image(value).auto('format').fit('max').url()

  const widthMap: Record<string, string> = {
    small: '25%',
    medium: '50%',
    large: '75%',
    full: '100%',
  }
  const width = (value.displaySize && widthMap[value.displaySize]) || '75%'

  return (
    <Box padding={2} style={{width: '100%'}}>
      <Flex direction="column" align="center" style={{width: '100%'}}>
        <img
          src={imgUrl}
          alt={value.alt || value.caption || ''}
          style={{
            width,
            maxWidth: '100%',
            height: 'auto',
            borderRadius: '4px',
            objectFit: 'cover',
            display: 'block',
          }}
        />
        {value.caption && (
          <Text size={1} muted style={{marginTop: 6, fontStyle: 'italic', textAlign: 'center'}}>
            {value.caption}
          </Text>
        )}
      </Flex>
    </Box>
  )
}
