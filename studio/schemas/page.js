export default {
  name: 'page',
  type: 'document',
  title: 'Page',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'slug', type: 'slug', options: { source: 'title' } },
    {
      name: 'pageBuilder',
      type: 'array',
      title: 'Page builder',
      of: [
        { type: 'hero' }, // hero.js (same applies for the other types)
        { type: 'textWithIllustration' },
        { type: 'callToAction' },
        { type: 'gallery' },
        { type: 'form' },
        { type: 'video' },
      ],
    },
  ],
}
