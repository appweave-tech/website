export default {
  name: 'career',
  title: 'Career',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Job Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'type',
      title: 'Employment Type',
      type: 'string',
      options: {
        list: [
          { title: 'Full-time', value: 'full-time' },
          { title: 'Part-time', value: 'part-time' },
          { title: 'Contract', value: 'contract' },
          { title: 'Internship', value: 'internship' },
          { title: 'Freelance', value: 'freelance' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g., Remote, Bangalore, Hybrid',
    },
    {
      name: 'department',
      title: 'Department',
      type: 'string',
      description: 'e.g., Engineering, Data, Design',
    },
    {
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 2,
      description: 'Brief summary shown in listing',
    },
    {
      name: 'responsibilities',
      title: 'Responsibilities',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Key responsibilities (one per line)',
    },
    {
      name: 'requirements',
      title: 'Requirements',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Required qualifications (one per line)',
    },
    {
      name: 'niceToHave',
      title: 'Nice to Have',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Preferred qualifications (one per line)',
    },
    {
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Perks and benefits (one per line)',
    },
    {
      name: 'salaryRange',
      title: 'Salary Range',
      type: 'string',
      description: 'e.g., ₹8-12 LPA, $80k-100k (optional)',
    },
    {
      name: 'applyEmail',
      title: 'Application Email',
      type: 'string',
      description: 'Email to receive applications',
    },
    {
      name: 'applyUrl',
      title: 'Application URL',
      type: 'url',
      description: 'External application link (optional)',
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Is this position currently open?',
      initialValue: true,
    },
    {
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
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
    {
      title: 'Newest First',
      name: 'publishedDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'type',
      active: 'isActive',
    },
    prepare({ title, subtitle, active }) {
      return {
        title: `${active ? '🟢' : '🔴'} ${title}`,
        subtitle: subtitle,
      }
    },
  },
}
