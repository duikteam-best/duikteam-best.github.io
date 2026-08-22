import {PlayIcon} from '@sanity/icons'

function getEmbedUrl(url) {
  if (!url) return ''

  try {
    const parsed = new URL(url)
    const host = parsed.hostname.replace(/^www\./, '')
    const videoId =
      host === 'youtu.be'
        ? parsed.pathname.split('/').filter(Boolean)[0]
        : parsed.searchParams.get('v')

    if (!videoId) return ''

    return `https://www.youtube-nocookie.com/embed/${videoId}`
  } catch {
    return ''
  }
}

export default {
  name: 'youtubeEmbed',
  type: 'object',
  title: 'YouTube video',
  icon: PlayIcon,
  fields: [
    {
      name: 'url',
      type: 'url',
      title: 'YouTube link',
      description: 'Plak hier een YouTube watch- of deel-link.',
      validation: (Rule) =>
        Rule.required().uri({
          scheme: ['http', 'https'],
        }),
    },
    {
      name: 'title',
      type: 'string',
      title: 'Titel',
      description: 'Optioneel: een titel voor toegankelijkheid.',
    },
    {
      name: 'caption',
      type: 'string',
      title: 'Bijschrift',
    },
  ],
  preview: {
    select: {
      url: 'url',
      title: 'title',
    },
    prepare({url, title}) {
      const embedUrl = getEmbedUrl(url)

      return {
        title: title || 'YouTube video',
        subtitle: embedUrl || url || 'Voeg een geldige YouTube-link toe',
        media: PlayIcon,
      }
    },
  },
}
