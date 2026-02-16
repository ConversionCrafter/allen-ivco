import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@/payload.config'

/** Safe query wrapper — returns empty docs when table doesn't exist yet (pre-migration build) */
async function safeFind(payload: any, options: any): Promise<{ docs: any[] }> {
  try {
    return await payload.find(options)
  } catch {
    return { docs: [] }
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config: await config })

  const posts = await safeFind(payload, {
    collection: 'posts',
    where: { status: { equals: 'published' } },
    limit: 1000,
    select: { slug: true, updatedAt: true, publishedAt: true },
  })

  const tags = await safeFind(payload, {
    collection: 'tags',
    limit: 1000,
    select: { slug: true, updatedAt: true },
  })

  const seriesResult = await safeFind(payload, {
    collection: 'series',
    limit: 1000,
    select: { slug: true, updatedAt: true },
  })

  const postEntries: MetadataRoute.Sitemap = posts.docs.map((post: any) => ({
    url: `https://ivco.ai/posts/${post.slug}`,
    lastModified: post.updatedAt || post.publishedAt || undefined,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const tagEntries: MetadataRoute.Sitemap = tags.docs.map((tag: any) => ({
    url: `https://ivco.ai/tags/${tag.slug}`,
    lastModified: tag.updatedAt || undefined,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  const seriesEntries: MetadataRoute.Sitemap = seriesResult.docs.map((s: any) => ({
    url: `https://ivco.ai/series/${s.slug}`,
    lastModified: s.updatedAt || undefined,
    changeFrequency: 'monthly' as const,
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
