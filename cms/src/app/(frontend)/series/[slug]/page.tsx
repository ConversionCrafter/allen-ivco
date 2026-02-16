import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Media, Series as SeriesType } from '@/payload-types'

export const dynamic = 'force-dynamic'

function resolveCoverImage(coverImage: unknown): Media | null {
  if (coverImage && typeof coverImage === 'object' && 'url' in coverImage) {
    return coverImage as Media
  }
  return null
}

async function getSeriesBySlug(slug: string): Promise<SeriesType | null> {
  const payload = await getPayload({ config: await config })
  const result = await payload.find({
    collection: 'series',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  })
  return (result.docs[0] as SeriesType) || null
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const series = await getSeriesBySlug(slug)

  if (!series) {
    return {
      title: 'Not Found',
      description: '',
    }
  }

  const description = series.description || `Published IVCO series: ${series.name}.`

  return {
    title: `${series.name} — IVCO Fisher`,
    description,
    openGraph: {
      title: `${series.name} — IVCO Fisher`,
      description,
      type: 'website',
      url: `https://ivco.ai/series/${series.slug}`,
    },
    twitter: {
      card: 'summary',
      title: `${series.name} — IVCO Fisher`,
      description,
      creator: '@ivco_fisher',
    },
  }
}

export default async function SeriesPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const payload = await getPayload({ config: await config })

  const series = await getSeriesBySlug(slug)
  if (!series) notFound()

  const coverImage = resolveCoverImage(series.coverImage)

  const posts = await payload.find({
    collection: 'posts',
    where: {
      and: [
        { series: { equals: series.id } },
        { status: { equals: 'published' } },
      ],
    },
    sort: 'seriesOrder',
    limit: 100,
    depth: 0,
    select: {
      title: true,
      slug: true,
      excerpt: true,
      readingTime: true,
      seriesOrder: true,
    },
  })

  const orderedPosts = [...posts.docs].sort(
    (a, b) => ((a as { seriesOrder?: number }).seriesOrder || 0) - ((b as { seriesOrder?: number }).seriesOrder || 0),
  )

  return (
    <div>
      <Link href="/">&larr; Back</Link>
      <h1>Series: {series.name}</h1>
      {series.description && <p>{series.description}</p>}

      {coverImage?.url && (
        <div style={{ marginBottom: '1.5rem' }}>
          <img
            src={coverImage.url}
            alt={series.name}
            style={{ maxWidth: '100%', borderRadius: '8px' }}
          />
        </div>
      )}

      <ol className="post-list">
        {orderedPosts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.slug}`}>
              <h2>{post.title}</h2>
              <p className="post-meta">
                {post.readingTime && `${post.readingTime} min read`}
              </p>
              {post.excerpt && <p className="post-excerpt">{post.excerpt}</p>}
            </Link>
          </li>
        ))}
      </ol>

      {orderedPosts.length === 0 && <p>No published posts found in this series.</p>}
    </div>
  )
}
