import React from 'react'

interface BlockRenderProps {
  children?: React.ReactNode
  value?: {
    textAlign?: 'left' | 'center' | 'right' | 'justify'
    style?: string
  }
}

export function PortableTextBlockRender(props: BlockRenderProps) {
  const textAlign = props.value?.textAlign || 'left'

  return <div style={{textAlign}}>{props.children}</div>
}
