export default {
  name: 'page',
  type: 'document',
  title: 'Page',
  fields: [
    { name: 'title', type: 'string', title: 'Title' },
    { name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title', maxLength: 200 } },
    { name: 'body', type: 'array', title: 'Body', of: [{ type: 'block' }] },
    { name: 'mainImage', type: 'image', title: 'Main Image' }
  ],
  preview: { select: { title: 'title', media: 'mainImage' } }
}