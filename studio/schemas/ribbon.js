import { FaRibbon } from 'react-icons/fa'

export default {
  name: 'ribbon',
  type: 'object',
  title: 'Ribbon',
  icon: FaRibbon,
  fields: [
    {
      name: 'text',
      type: 'string',
      title: 'Text',
    },
    {
      name: 'url',
      type: 'string',
      title: 'URL',
    },
    {
      name: 'size',
      type: 'string',
      title: 'Size',
      options: {
        list: ['small', 'medium', 'large'],
      },
    },
    {
      name: 'color',
      type: 'string',
      title: 'Color',
      options: {
        list: ['amber', 'green', 'purple', 'cyan'],
      },
    },
    {
      name: 'position',
      type: 'string',
      title: 'Position',
      options: {
        list: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
      },
    },
  ],
  preview: {
    select: {
      title: 'text',
    }
  }
}
