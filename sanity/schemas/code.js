export default {
  name: 'code',
  title: 'Code Block',
  type: 'object',
  fields: [
    {
      name: 'code',
      title: 'Code',
      type: 'text',
    },
    {
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          { title: 'JavaScript', value: 'javascript' },
          { title: 'TypeScript', value: 'typescript' },
          { title: 'Python', value: 'python' },
          { title: 'SQL', value: 'sql' },
          { title: 'Bash', value: 'bash' },
          { title: 'JSON', value: 'json' },
          { title: 'HTML', value: 'html' },
          { title: 'CSS', value: 'css' },
          { title: 'Java', value: 'java' },
          { title: 'C++', value: 'cpp' },
          { title: 'C#', value: 'csharp' },
          { title: 'Go', value: 'go' },
          { title: 'Rust', value: 'rust' },
          { title: 'PHP', value: 'php' },
          { title: 'Ruby', value: 'ruby' },
          { title: 'Swift', value: 'swift' },
          { title: 'Kotlin', value: 'kotlin' },
          { title: 'Plain Text', value: 'text' },
        ],
      },
      initialValue: 'javascript',
    },
    {
      name: 'filename',
      title: 'Filename (optional)',
      type: 'string',
      description: 'Optional filename to display above the code block',
    },
  ],
  preview: {
    select: {
      language: 'language',
      code: 'code',
      filename: 'filename',
    },
    prepare({ language, code, filename }) {
      const title = filename || `Code Block (${language || 'text'})`
      const preview = code ? code.substring(0, 50) : 'No code'
      return {
        title,
        subtitle: preview,
      }
    },
  },
}
