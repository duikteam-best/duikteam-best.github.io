import {ImageIcon} from '@sanity/icons'

export default {
  name: 'bodyImage',
  type: 'object',
  title: 'Afbeelding',
  icon: ImageIcon,
  fields: [
    {
      name: 'image',
      type: 'image',
      title: 'Afbeelding',
      options: {hotspot: true},
      fields: [
        {name: 'caption', type: 'string', title: 'Bijschrift'},
        {name: 'alt', type: 'string', title: 'Alternatieve tekst'},
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'alignment',
      type: 'string',
      title: 'Uitlijning',
      options: {
        list: [
          {title: 'Volledig breed', value: 'center'},
          {title: 'Rechts uitgelijnd', value: 'right'},
          {title: 'Links uitgelijnd', value: 'left'},
        ],
        layout: 'radio',
      },
      initialValue: 'center',
    },
  ],
  preview: {
    select: {
      media: 'image',
      caption: 'image.caption',
      alt: 'image.alt',
    },
    prepare({media, caption, alt}) {
      return {
        title: caption || alt || 'Afbeelding',
        subtitle: 'Voeg een beeld toe aan de duiklog',
        media,
      }
    },
  },
}
