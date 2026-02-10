export default {
  name: 'client',
  title: 'Client',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Company Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Brief description of the client/project',
    },
    {
      name: 'industry',
      title: 'Industry',
      type: 'string',
      description: 'e.g., Fintech, E-commerce, Healthcare',
    },
    {
      name: 'websiteUrl',
      title: 'Website URL',
      type: 'url',
    },
    {
      name: 'stockTicker',
      title: 'Stock Ticker',
      type: 'string',
      description: 'e.g., NASDAQ: EXLS (optional)',
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show on homepage?',
      initialValue: true,
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 0,
    },
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'industry',
      media: 'logo',
    },
  },
}
