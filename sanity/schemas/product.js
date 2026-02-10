export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Short catchy description (e.g., "Blockchain-powered certificates")',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'Detailed product description',
    },
    {
      name: 'icon',
      title: 'Product Icon/Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'heroImage',
      title: 'Hero Image / Screenshot',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Main product screenshot or hero image',
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Live', value: 'live' },
          { title: 'Beta', value: 'beta' },
          { title: 'Coming Soon', value: 'coming-soon' },
          { title: 'Deprecated', value: 'deprecated' },
        ],
      },
      initialValue: 'beta',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'SaaS', value: 'saas' },
          { title: 'API', value: 'api' },
          { title: 'Mobile App', value: 'mobile' },
          { title: 'Browser Extension', value: 'extension' },
          { title: 'Open Source', value: 'opensource' },
        ],
      },
    },
    {
      name: 'platforms',
      title: 'Available Platforms',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Web', value: 'web' },
          { title: 'iOS', value: 'ios' },
          { title: 'Android', value: 'android' },
          { title: 'Telegram', value: 'telegram' },
          { title: 'WhatsApp', value: 'whatsapp' },
          { title: 'API', value: 'api' },
          { title: 'Chrome Extension', value: 'chrome' },
          { title: 'Desktop', value: 'desktop' },
        ],
      },
    },
    {
      name: 'features',
      title: 'Key Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Feature Title', type: 'string' },
            { name: 'description', title: 'Feature Description', type: 'text', rows: 2 },
            { name: 'icon', title: 'Icon Name', type: 'string', description: 'e.g., shield, zap, globe' },
          ],
        },
      ],
    },
    {
      name: 'techStack',
      title: 'Tech Stack',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Technologies used (e.g., Next.js, Blockchain, OCR)',
    },
    {
      name: 'pricing',
      title: 'Pricing',
      type: 'object',
      fields: [
        { name: 'model', title: 'Pricing Model', type: 'string', options: { list: ['Free', 'Freemium', 'Paid', 'Enterprise', 'Contact Us'] } },
        { name: 'startingPrice', title: 'Starting Price', type: 'string', description: 'e.g., $9/month, Free tier available' },
      ],
    },
    {
      name: 'links',
      title: 'Links',
      type: 'object',
      fields: [
        { name: 'website', title: 'Website URL', type: 'url' },
        { name: 'demo', title: 'Demo URL', type: 'url' },
        { name: 'docs', title: 'Documentation URL', type: 'url' },
        { name: 'github', title: 'GitHub URL', type: 'url' },
        { name: 'appStore', title: 'App Store URL', type: 'url' },
        { name: 'playStore', title: 'Play Store URL', type: 'url' },
        { name: 'telegram', title: 'Telegram Bot URL', type: 'url' },
        { name: 'whatsapp', title: 'WhatsApp URL', type: 'url' },
      ],
    },
    {
      name: 'screenshots',
      title: 'Screenshots',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'caption', title: 'Caption', type: 'string' },
          ],
        },
      ],
    },
    {
      name: 'useCases',
      title: 'Use Cases / Who Is It For',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Target users (e.g., Small businesses, HR teams, E-commerce stores)',
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
      subtitle: 'tagline',
      media: 'icon',
      status: 'status',
    },
    prepare({ title, subtitle, media, status }) {
      const statusEmoji = {
        'live': '🟢',
        'beta': '🟡',
        'coming-soon': '🔵',
        'deprecated': '🔴',
      }
      return {
        title: `${statusEmoji[status] || ''} ${title}`,
        subtitle,
        media,
      }
    },
  },
}
