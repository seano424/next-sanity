export default {
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },
    // Important! Document needs a slug for Next.js to query for.
    { name: 'slug', type: 'slug', options: { source: 'title' } },
    { name: 'content', type: 'text' },
    {
      title: 'Rich text example',
      name: 'myRichTextExample',
      type: 'array',
      of: [{ type: 'block' }],
    },
  ],
}
