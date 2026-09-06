import React from 'react'
import {set, unset} from 'sanity'

export const COLOR_PALETTE = [
  {title: 'Navy Blue (Primary Brand)', value: '#1E3A8A'},
  {title: 'Gold / Amber (Secondary)', value: '#D97706'},
  {title: 'Crimson Red', value: '#DC2626'},
  {title: 'Emerald Green', value: '#15803D'},
  {title: 'Sky Blue', value: '#0284C7'},
  {title: 'Purple Violet', value: '#7C3AED'},
  {title: 'Muted Slate Gray', value: '#64748B'},
  {title: 'Default Dark Text', value: '#111827'},
]

export function ColorPresetInput(props: any) {
  const {value, onChange} = props

  const handleSelect = (colorValue: string) => {
    if (value === colorValue) {
      onChange(unset())
    } else {
      onChange(set(colorValue))
    }
  }

  return (
    <div style={{padding: '8px 0'}}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '8px',
        }}
      >
        {COLOR_PALETTE.map((item) => {
          const isSelected = value === item.value

          return (
            <button
              key={item.value}
              type="button"
              title={item.title}
              onClick={() => handleSelect(item.value)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 8px',
                border: isSelected ? '2px solid #2563eb' : '1px solid #cbd5e1',
                borderRadius: '6px',
                background: isSelected ? '#eff6ff' : '#ffffff',
                cursor: 'pointer',
                textAlign: 'left',
                boxShadow: isSelected ? '0 1px 3px rgba(37,99,235,0.2)' : 'none',
                transition: 'all 0.15s ease',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  backgroundColor: item.value,
                  border: '1px solid rgba(0,0,0,0.2)',
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: isSelected ? 600 : 400,
                  color: isSelected ? '#1e3a8a' : '#334155',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {item.title.split(' (')[0]}
              </span>
            </button>
          )
        })}
      </div>
      {value && (
        <div style={{marginTop: '10px', textAlign: 'right'}}>
          <button
            type="button"
            onClick={() => onChange(unset())}
            style={{
              fontSize: '12px',
              color: '#ef4444',
              background: 'none',
              border: 'none',
              textDecoration: 'underline',
              cursor: 'pointer',
              fontWeight: 500,
            }}
          >
            Clear Color (Reset)
          </button>
        </div>
      )}
    </div>
  )
}
