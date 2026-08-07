import {DocumentIcon} from '@sanity/icons'

export default {
  name: 'privacyPolicy',
  type: 'document',
  title: 'Privacybeleid',
  icon: DocumentIcon,
  fields: [
    { name: 'title', type: 'string', title: 'Titel' },
    { name: 'body', type: 'array', title: 'Inhoud', of: [{ type: 'block' }] },
  ],
  preview: { select: { title: 'title' } },
}
