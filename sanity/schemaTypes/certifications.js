import {StarIcon} from '@sanity/icons'

export default {
  name: 'certifications',
  type: 'document',
  title: 'Opleidingen',
  icon: StarIcon,
  fields: [
    { name: 'title', type: 'string', title: 'Titel' },
    { name: 'body', type: 'array', title: 'Inhoud', of: [{ type: 'block' }] },
  ],
  preview: { select: { title: 'title' } },
}
