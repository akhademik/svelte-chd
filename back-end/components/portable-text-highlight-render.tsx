import React from 'react'

export function HighlightRender(props: {children?: React.ReactNode}) {
  return (
    <span style={{backgroundColor: '#FEF08A', padding: '0 2px', borderRadius: '2px'}}>
      {props.children}
    </span>
  )
}
