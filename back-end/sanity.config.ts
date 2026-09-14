import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {media} from 'sanity-plugin-media'
import {unsplashImageAsset} from 'sanity-plugin-asset-source-unsplash'
import {colorInput} from '@sanity/color-input'
import {table} from '@sanity/table'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemas'
import {structure} from './desk-structure'

export default defineConfig({
  name: 'default',
  title: 'chd-backend-v2',

  projectId: 'uzyjbxdd',
  dataset: 'production',

  plugins: [
    structureTool({
      structure,
    }),
    visionTool(),
    unsplashImageAsset(),
    media(),
    table(),
    colorInput(),
  ],

  schema: {
    types: schemaTypes,
    templates: (prev) => [
      ...prev,
      {
        id: 'tourGoodToKnow-activity_level',
        title: 'Mức độ vận động',
        schemaType: 'tourGoodToKnow',
        value: {
          category: 'activity_level',
        },
      },
      {
        id: 'tourGoodToKnow-what_to_pack',
        title: 'Hành trang',
        schemaType: 'tourGoodToKnow',
        value: {
          category: 'what_to_pack',
        },
      },
      {
        id: 'tourGoodToKnow-group_size',
        title: 'Quy mô nhóm',
        schemaType: 'tourGoodToKnow',
        value: {
          category: 'group_size',
        },
      },
      {
        id: 'tourGoodToKnow-other_notes',
        title: 'Lưu ý khác',
        schemaType: 'tourGoodToKnow',
        value: {
          category: 'other_notes',
        },
      },
    ],
  },
})
