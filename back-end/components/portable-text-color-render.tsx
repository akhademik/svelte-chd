import React from 'react'

export const COLOR_DECORATORS = [
  {name: 'color-navy', title: 'Navy Blue (Primary Brand)', color: '#1E3A8A'},
  {name: 'color-amber', title: 'Amber / Gold (Accent)', color: '#D97706'},
  {name: 'color-red', title: 'Crimson Red', color: '#DC2626'},
  {name: 'color-green', title: 'Emerald Green', color: '#15803D'},
  {name: 'color-blue', title: 'Sky Blue', color: '#0284C7'},
  {name: 'color-purple', title: 'Purple Violet', color: '#7C3AED'},
  {name: 'color-gray', title: 'Muted Slate Gray', color: '#64748B'},
] as const

export function createColorIcon(color: string) {
  return function ColorIcon() {
    return (
      <span
        style={{
          display: 'inline-block',
          width: '1em',
          height: '1em',
          borderRadius: '50%',
          backgroundColor: color,
          border: '1.5px solid rgba(0,0,0,0.25)',
          verticalAlign: 'middle',
        }}
      />
    )
  }
}

export function createColorRender(color: string) {
  return function ColorRender(props: {children?: React.ReactNode}) {
    return <span style={{color}}>{props.children}</span>
  }
}
