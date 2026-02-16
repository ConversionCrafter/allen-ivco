import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/api/og'],
        disallow: ['/admin/*', '/api/*'],
      },
    ],
    sitemap: 'https://ivco.ai/sitemap.xml',
  }
}
