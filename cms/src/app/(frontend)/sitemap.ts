import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@/payload.config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config: await config })

  const posts = await payload.find({
    collection: 'posts',
    where: { status: { equals: 'published' } },
    limit: 1000,
    select: { slug: true, updatedAt: true, publishedAt: true },
  })

  const tags = await payload.find({
    collection: 'tags',
    limit: 1000,
    select: { slug: true, updatedAt: true },
  })

  const seriesResult = await payload.find({
    collection: 'series',
    limit: 1000,
    select: { slug: true, updatedAt: true },
  })

  const postEntries: MetadataRoute.Sitemap = posts.docs.map((post) => ({
    url: `https://ivco.ai/posts/${post.slug}`,
    lastModified: post.updatedAt || post.publishedAt || undefined,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const tagEntries: MetadataRoute.Sitemap = tags.docs.map((tag) => ({
    url: `https://ivco.ai/tags/${tag.slug}`,
    lastModified: tag.updatedAt || undefined,
    changeFrequency: 'monthly',
    priority: 0.5,
  }))

  const seriesEntries: MetadataRoute.Sitemap = seriesResult.docs.map((s) => ({
    url: `https://ivco.ai/series/${s.slug}`,
    lastModified: s.updatedAt || undefined,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [
    {
      url: 'https://ivco.ai',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...postEntries,
    ...tagEntries,
    ...seriesEntries,
  ]
}
