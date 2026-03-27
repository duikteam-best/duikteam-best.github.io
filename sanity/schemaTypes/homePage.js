import {HomeIcon} from '@sanity/icons'

export default {
  name: 'homePage',
  type: 'document',
  title: 'Home Pagina',
  icon: HomeIcon,
  fields: [
    { name: 'title', type: 'string', title: 'Titel' },
    { name: 'subtitle', type: 'string', title: 'Subtitel' },
    { name: 'heroImage', type: 'image', title: 'Hero Afbeelding', options: { hotspot: true } },
    { name: 'body', type: 'array', title: 'Inhoud', of: [
      { type: 'block' },
      { type: 'image', options: { hotspot: true }, fields: [
        { name: 'caption', type: 'string', title: 'Bijschrift' },
        { name: 'alt', type: 'string', title: 'Alternatieve tekst' },
      ]},
    ]},
  ],
  preview: { select: { title: 'title', media: 'heroImage' } },
}
