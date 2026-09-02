import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {unsplashImageAsset} from 'sanity-plugin-asset-source-unsplash'
import {deskTool} from 'sanity/desk'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'chd-backend-v1',

  projectId: 'uzyjbxdd',
  dataset: 'production',

  plugins: [deskTool(), visionTool(), unsplashImageAsset()],

  schema: {
    types: schemaTypes,
  },
})
