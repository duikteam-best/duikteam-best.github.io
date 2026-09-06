import {ActivityIcon} from '@sanity/icons'

export default {
  name: 'dive',
  type: 'document',
  title: 'Dive',
  icon: ActivityIcon,
  fields: [
    { name: 'title', type: 'string', title: 'Duik Naam / Titel' },
    { name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title', maxLength: 200 } },
    { name: 'date', type: 'datetime', title: 'Datum' },
    { name: 'location', type: 'string', title: 'Locatie' },
    { name: 'description', type: 'array', title: 'Omschrijving', options: {
      insertMenu: {
        filter: true,
        showIcons: true,
        groups: [
          {
            name: 'media',
            title: 'Media',
            of: ['bodyImage', 'youtubeEmbed'],
          },
        ],
      },
    }, of: [
      { type: 'block' },
      { type: 'youtubeEmbed' },
      { type: 'bodyImage' },
    ]},
    { name: 'photos', type: 'array', title: 'Foto`s', of: [{ type: 'image' }] }
  ],
  preview: { select: { title: 'title', subtitle: 'location', media: 'photos.0' } }
}
