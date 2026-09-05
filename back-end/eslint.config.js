import studio from '@sanity/eslint-config-studio'

export default [
  {
    ignores: ['node_modules/**', 'dist/**', 'static/**', '.sanity/**', '*.tsbuildinfo'],
  },
  ...studio,
]
