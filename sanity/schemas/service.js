export default {
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Service Title',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required(),
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Upload an icon image (PNG, SVG, etc.) for this service',
    },
    {
      name: 'iconEmoji',
      title: 'Icon Emoji (Alternative)',
      type: 'string',
      description: 'Or use an emoji instead of uploading an image (e.g., 📱, 💻, 🤖)',
    },
    {
      name: 'color',
      title: 'Accent Color',
      type: 'string',
      options: {
        list: [
          { title: 'Cyan', value: 'cyan' },
          { title: 'Violet', value: 'violet' },
          { title: 'Emerald', value: 'emerald' },
          { title: 'Orange', value: 'orange' },
          { title: 'Rose', value: 'rose' },
          { title: 'Blue', value: 'blue' },
        ],
      },
      initialValue: 'cyan',
      validation: Rule => Rule.required(),
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 0,
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show this service on the homepage',
      initialValue: true,
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      description: 'Optional: for service detail pages',
    },
  ],
  preview: {
    select: {
      title: 'title',
      color: 'color',
      featured: 'featured',
      media: 'icon',
      iconEmoji: 'iconEmoji',
    },
    prepare({ title, color, featured, media, iconEmoji }) {
      return {
        title,
        subtitle: `${color} • ${featured ? 'Featured' : 'Hidden'}`,
        media: media || (iconEmoji ? undefined : undefined),
      }
    },
  },
  orderings: [
    {
      title: 'Order (Low to High)',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Order (High to Low)',
      name: 'orderDesc',
      by: [{ field: 'order', direction: 'desc' }],
    },
  ],
}
