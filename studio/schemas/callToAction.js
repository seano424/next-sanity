import { MdCallToAction } from 'react-icons/md'

export default {
  name: 'callToAction',
  type: 'object',
  title: 'Call to Action',
  icon: MdCallToAction,
  fields: [
    {
      name: 'linkText',
      type: 'string',
      title: 'Link Text',
    },
    {
      name: 'url',
      type: 'url',
      title: 'URL',
    },
    {
      name: 'ribbon',
      type: 'array',
      title: 'Ribbon',
      of: [{ type: 'ribbon' }],
    },
  ],
  preview: {
    select: {
      title: 'linkText',
    },
  },
}
