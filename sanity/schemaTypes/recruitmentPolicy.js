import {DocumentIcon} from '@sanity/icons'

export default {
  name: 'recruitmentPolicy',
  type: 'document',
  title: 'Aannamebeleid Instructeurs',
  icon: DocumentIcon,
  fields: [
    { name: 'title', type: 'string', title: 'Titel' },
    { name: 'body', type: 'array', title: 'Inhoud', of: [{ type: 'block' }] },
  ],
  preview: { select: { title: 'title' } },
}
