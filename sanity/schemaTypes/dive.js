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
    { name: 'description', type: 'array', title: 'Omschrijving', of: [
      { type: 'block' },
      { type: 'youtubeEmbed' },
      { type: 'image', options: { hotspot: true }, fields: [
        { name: 'caption', type: 'string', title: 'Bijschrift' },
        { name: 'alt', type: 'string', title: 'Alternatieve tekst' },
        { name: 'alignment', type: 'string', title: 'Uitlijning', options: { list: [
          { title: 'Volledig breed', value: 'center' },
          { title: 'Rechts uitgelijnd', value: 'right' },
          { title: 'Links uitgelijnd', value: 'left' },
        ], layout: 'radio' }, initialValue: 'center' },
      ]},
    ]},
    { name: 'photos', type: 'array', title: 'Foto`s', of: [{ type: 'image' }] }
  ],
  preview: { select: { title: 'title', subtitle: 'location', media: 'photos.0' } }
}
