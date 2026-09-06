import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {media} from 'sanity-plugin-media'
import {unsplashImageAsset} from 'sanity-plugin-asset-source-unsplash'
import {colorInput} from '@sanity/color-input'
import {table} from '@sanity/table'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'chd-backend-v2',

  projectId: 'uzyjbxdd',
  dataset: 'production',

  plugins: [structureTool(), visionTool(), unsplashImageAsset(), media(), table(), colorInput()],

  schema: {
    types: schemaTypes,
  },
})
