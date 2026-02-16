import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Author, Category, Media, Tag, Series as SeriesType } from '@/payload-types'
import { generateArticleSchema, generateFAQSchema } from '@/lib/structured-data'

/** Deduplicate Payload query between PostPage and generateMetadata (React cache) */
const getPostBySlug = cache(async (slug: string) => {
  const payload = await getPayload({ config: await config })
  const result = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })
  return result.docs[0] || null
})

/** Prevent XSS via </script> injection in JSON-LD output */
function safeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

/** Runtime type guard: ogImage may be a Media object or just an ID string */
function resolveOgImage(ogImage: unknown): Media | null {
  if (ogImage && typeof ogImage === 'object' && 'url' in ogImage) {
    return ogImage as Media
  }
  return null
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post || post.status !== 'published') notFound()

  // Type assertions for populated relationships
  const author = post.author as Author
  const category = post.category as Category
  const ogImage = resolveOgImage(post.seo.ogImage)
  const tags = (post.tags || []).filter(
    (t): t is Tag => typeof t === 'object' && t !== null && 'name' in t,
  )
  const series = post.series && typeof post.series === 'object' ? (post.series as SeriesType) : null

  // Generate structured data
  const ogImageUrl =
    ogImage?.url ||
    `/api/og?title=${encodeURIComponent(post.title)}&category=${category?.slug || 'framework'}`

  const articleSchema = generateArticleSchema({
    title: post.title,
    description: post.seo.description,
    slug: `posts/${post.slug}`,
    author: author.name,
    authorBio: post.schema.authorBio,
    publishedAt: post.publishedAt || post.createdAt,
    modifiedAt: post.updatedAt,
    ogImageUrl: ogImageUrl.startsWith('/') ? `https://ivco.ai${ogImageUrl}` : ogImageUrl,
  })

  const faqSchema =
    post.faq && post.faq.length > 0
      ? generateFAQSchema(
          post.faq.map((item) => ({
            question: item.question,
            answer: item.answer,
          })),
        )
      : null

  // Fetch series posts for navigation
  let seriesPosts: { title: string; slug: string; seriesOrder: number }[] = []
  if (series) {
    const payload = await getPayload({ config: await config })
    const result = await payload.find({
      collection: 'posts',
      where: {
        series: { equals: series.id },
        status: { equals: 'published' },
      },
      sort: 'seriesOrder',
      limit: 50,
      select: { title: true, slug: true, seriesOrder: true },
    })
    seriesPosts = result.docs.map((p) => ({
      title: p.title,
      slug: p.slug,
      seriesOrder: (p as any).seriesOrder || 0,
    }))
  }

  const currentIndex = seriesPosts.findIndex((p) => p.slug === post.slug)
  const prevPost = currentIndex > 0 ? seriesPosts[currentIndex - 1] : null
  const nextPost = currentIndex < seriesPosts.length - 1 ? seriesPosts[currentIndex + 1] : null

  return (
    <article>
      {/* Article structured data — XSS-safe serialization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(articleSchema) }}
      />

      {/* FAQ structured data */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(faqSchema) }}
        />
      )}

      <a href="/">&larr; Back</a>
      <h1>{post.title}</h1>
      <p className="post-meta">
        By {author.name}
        {post.publishedAt && (
          <>
            {' '}
            &middot;{' '}
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </>
        )}
        {(post as any).readingTime && (
          <>
            {' '}
            &middot; {(post as any).readingTime} min read
          </>
        )}
        {category && (
          <>
            {' '}
            &middot; <span>{category.name}</span>
          </>
        )}
      </p>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="post-tags" style={{ margin: '0.5rem 0 1.5rem' }}>
          {tags.map((tag) => (
            <span
              key={tag.id}
              style={{
                display: 'inline-block',
                padding: '2px 8px',
                marginRight: '6px',
                fontSize: '0.85rem',
                backgroundColor: '#f1f5f9',
                borderRadius: '4px',
                color: '#475569',
              }}
            >
              {tag.name}
            </span>
          ))}
        </div>
      )}

      {/* Series navigation header */}
      {series && (
        <div
          style={{
            padding: '0.75rem 1rem',
            backgroundColor: '#f8fafc',
            borderRadius: '6px',
            marginBottom: '1.5rem',
            fontSize: '0.9rem',
          }}
        >
          <strong>Series:</strong> {series.name}
          {seriesPosts.length > 1 && (
            <span style={{ color: '#64748b' }}>
              {' '}
              ({currentIndex + 1} of {seriesPosts.length})
            </span>
          )}
        </div>
      )}

      <div className="article-content">
        <RichText data={post.content} />
      </div>

      {/* FAQ Section */}
      {post.faq && post.faq.length > 0 && (
        <section className="article-content" style={{ marginTop: '3rem' }}>
          <h2>Frequently Asked Questions</h2>
          {post.faq.map((item, index) => (
            <div key={item.id || index} style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.125rem', marginTop: '1rem' }}>
                {item.question}
              </h3>
              <p>{item.answer}</p>
            </div>
          ))}
        </section>
      )}

      {/* Series Navigation — prev/next */}
      {series && (prevPost || nextPost) && (
        <nav
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '3rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid #e2e8f0',
            fontSize: '0.9rem',
          }}
        >
          {prevPost ? (
            <a href={`/posts/${prevPost.slug}`}>&larr; {prevPost.title}</a>
          ) : (
            <span />
          )}
          {nextPost ? (
            <a href={`/posts/${nextPost.slug}`}>{nextPost.title} &rarr;</a>
          ) : (
            <span />
          )}
        </nav>
      )}

      {/* Author Bio */}
      {post.schema.authorBio && (
        <section
          className="article-content"
          style={{
            marginTop: '3rem',
            paddingTop: '2rem',
            borderTop: '1px solid #eee',
          }}
        >
          <h3>About the Author</h3>
          <p>
            <strong>{author.name}</strong> — {post.schema.authorBio}
          </p>
        </section>
      )}
    </article>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Not Found',
      description: '',
    }
  }

  // Get OG image URL — runtime type guard for populated vs ID-only
  const ogImage = resolveOgImage(post.seo.ogImage)
  const ogImageUrl =
    ogImage?.url ||
    `/api/og?title=${encodeURIComponent(post.title)}&category=${
      (post.category as Category)?.slug || 'framework'
    }`

  return {
    title: `${post.seo.title} — IVCO Fisher`,
    description: post.seo.description,
    openGraph: {
      title: post.seo.title,
      description: post.seo.description,
      type: 'article',
      images: [ogImageUrl],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seo.title,
      description: post.seo.description,
      images: [ogImageUrl],
    },
    ...(post.seo.canonicalUrl && { alternates: { canonical: post.seo.canonicalUrl } }),
  }
}
