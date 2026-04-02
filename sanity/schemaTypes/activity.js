import {CalendarIcon} from '@sanity/icons'

export default {
  name: 'activity',
  type: 'document',
  title: 'Activiteit',
  icon: CalendarIcon,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Titel',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'title', maxLength: 200 },
    },
    {
      name: 'date',
      type: 'datetime',
      title: 'Datum',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'featuredImage',
      type: 'image',
      title: 'Foto',
      options: { hotspot: true },
      fields: [
        { name: 'alt', type: 'string', title: 'Alternatieve tekst' },
        { name: 'caption', type: 'string', title: 'Bijschrift' },
      ],
    },
    {
      name: 'gallery',
      type: 'array',
      title: 'Galerij',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Alternatieve tekst' },
            { name: 'caption', type: 'string', title: 'Bijschrift' },
          ],
        },
      ],
    },
    {
      name: 'location',
      type: 'object',
      title: 'Locatie',
      fields: [
        {
          name: 'name',
          type: 'string',
          title: 'Locatienaam',
        },
        {
          name: 'coordinates',
          type: 'geopoint',
          title: 'Coördinaten (Google Maps)',
        },
        {
          name: 'mapsUrl',
          type: 'url',
          title: 'Google Maps link',
          description: 'Optioneel: plak hier een Google Maps URL',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'location.name',
      media: 'featuredImage',
    },
  },
}
