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
      name: 'weekend',
      type: 'reference',
      title: 'Onderdeel van activiteitenweekend',
      to: [{ type: 'activityWeekend' }],
      description: 'Optioneel: koppel deze activiteit aan een activiteitenweekend.',
    },
    {
      name: 'kentering',
      type: 'string',
      title: 'Kentering',
      description: 'Optioneel: tijdstip waarop het getij keert.',
      placeholder: '12:34',
      validation: (Rule) => Rule.regex(/^([01]\d|2[0-3]):[0-5]\d$/, {
        name: 'tijdstip',
        invert: false,
      }).warning('Gebruik de notatie UU:MM, bijvoorbeeld 12:34.'),
    },
    {
      name: 'getij',
      type: 'string',
      title: 'Getij',
      description: 'Optioneel: het type getij bij de kentering.',
      options: {
        list: [
          { title: 'Hoogwater', value: 'hoogwater' },
          { title: 'Laagwater', value: 'laagwater' },
        ],
        layout: 'radio',
      },
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
