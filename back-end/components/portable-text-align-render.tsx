import React from 'react'

export function AlignCenterRender(props: {children?: React.ReactNode}) {
  return <span style={{display: 'block', textAlign: 'center'}}>{props.children}</span>
}

export function AlignRightRender(props: {children?: React.ReactNode}) {
  return <span style={{display: 'block', textAlign: 'right'}}>{props.children}</span>
}

export function AlignJustifyRender(props: {children?: React.ReactNode}) {
  return <span style={{display: 'block', textAlign: 'justify'}}>{props.children}</span>
}
