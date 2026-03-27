import {ActivityIcon} from '@sanity/icons'

export default {
  name: 'divelogsOverview',
  type: 'document',
  title: 'Duiklogs Overzicht',
  icon: ActivityIcon,
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
