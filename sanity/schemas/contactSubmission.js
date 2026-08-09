export default {
  name: 'contactSubmission',
  title: 'Contact Submission',
  type: 'document',
  // Written by the /api/contact route, never authored by hand.
  readOnly: true,
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'company',
      title: 'Company',
      type: 'string',
    },
    {
      name: 'budget',
      title: 'Budget range',
      type: 'string',
    },
    {
      name: 'message',
      title: 'Message',
      type: 'text',
      rows: 8,
    },
    {
      name: 'submittedAt',
      title: 'Submitted at',
      type: 'datetime',
    },
    {
      name: 'handled',
      title: 'Replied to',
      type: 'boolean',
      // The one field a human edits, so it escapes the document-level readOnly.
      readOnly: false,
      initialValue: false,
    },
  ],
  orderings: [
    {
      title: 'Newest first',
      name: 'submittedAtDesc',
      by: [{ field: 'submittedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'name', company: 'company', date: 'submittedAt', handled: 'handled' },
    prepare({ title, company, date, handled }) {
      const when = date ? new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : ''
      return {
        title: `${handled ? '' : '• '}${title || 'Unnamed'}${company ? ` — ${company}` : ''}`,
        subtitle: when,
      }
    },
  },
}
