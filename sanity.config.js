import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  name: 'default',
  title: 'Appweave Site',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  basePath: '/studio', // This is where your studio will be accessible

  plugins: [
    structureTool(), // This adds the default structure views
    visionTool(), // This adds the GROQ query tool
  ],

  schema: {
    types: schemaTypes,
  },
})
