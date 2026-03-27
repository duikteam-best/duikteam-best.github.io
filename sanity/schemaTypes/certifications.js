import {StarIcon} from '@sanity/icons'

export default {
  name: 'certifications',
  type: 'document',
  title: 'Opleidingen',
  icon: StarIcon,
  fields: [
    { name: 'title', type: 'string', title: 'Titel' },
    { name: 'body', type: 'array', title: 'Inhoud', of: [
      { type: 'block' },
      { type: 'image', options: { hotspot: true }, fields: [
        { name: 'caption', type: 'string', title: 'Bijschrift' },
        { name: 'alt', type: 'string', title: 'Alternatieve tekst' },
      ]},
    ]},
  ],
  preview: { select: { title: 'title' } },
}
