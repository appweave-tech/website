export default {
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    {
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      description: 'Keep it to two or three lines. Long quotes get cropped in the accordion.',
      validation: (Rule) => Rule.required().max(240),
    },
    {
      name: 'authorName',
      title: 'Author name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'authorRole',
      title: 'Author role',
      type: 'string',
      description: 'For example: Head of Platform',
    },
    {
      name: 'client',
      title: 'Client',
      type: 'reference',
      to: [{ type: 'client' }],
      description: 'Pulls the company name and logo from the existing client record.',
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      initialValue: 0,
    },
  ],
  orderings: [{ title: 'Manual order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'authorName', subtitle: 'quote' },
  },
}
