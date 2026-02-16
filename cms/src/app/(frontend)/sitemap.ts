import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@/payload.config'

/** Force dynamic rendering — sitemap must reflect current CMS state */
export const dynamic = 'force-dynamic'

/** Paginated fetch — collects all docs across pages to avoid truncation at limit */
async function safeFindAll(payload: any, options: { collection: string; [k: string]: unknown }): Promise<any[]> {
  const docs: any[] = []
  let page = 1
  const pageSize = 100

  try {
    while (true) {
      const result = await payload.find({ ...options, limit: pageSize, page })
      docs.push(...result.docs)
      if (!result.hasNextPage) break
      page++
    }
  } catch (err) {
    console.error(`[sitemap] Failed to query ${options.collection}:`, err instanceof Error ? err.message : err)
  }

  return docs
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config: await config })

  const [posts, tags, series] = await Promise.all([
    safeFindAll(payload, {
      collection: 'posts',
      where: { status: { equals: 'published' } },
      select: { slug: true, updatedAt: true, publishedAt: true },
    }),
    safeFindAll(payload, {
      collection: 'tags',
      select: { slug: true, updatedAt: true },
    }),
    safeFindAll(payload, {
      collection: 'series',
      select: { slug: true, updatedAt: true },
    }),
  ])

  const postEntries: MetadataRoute.Sitemap = posts.map((post: any) => ({
    url: `https://ivco.ai/posts/${post.slug}`,
    lastModified: post.updatedAt || post.publishedAt || undefined,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const tagEntries: MetadataRoute.Sitemap = tags.map((tag: any) => ({
    url: `https://ivco.ai/tags/${tag.slug}`,
    lastModified: tag.updatedAt || undefined,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  const seriesEntries: MetadataRoute.Sitemap = series.map((s: any) => ({
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
