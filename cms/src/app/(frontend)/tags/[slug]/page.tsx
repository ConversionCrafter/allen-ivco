import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Category, Tag } from '@/payload-types'

export const dynamic = 'force-dynamic'

async function getTagBySlug(slug: string): Promise<Tag | null> {
  const payload = await getPayload({ config: await config })
  const result = await payload.find({
    collection: 'tags',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  return (result.docs[0] as Tag) || null
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const tag = await getTagBySlug(slug)

  if (!tag) {
    return {
      title: 'Not Found',
      description: '',
    }
  }

  const description = tag.description || `Published IVCO posts tagged with ${tag.name}.`

  return {
    title: `${tag.name} — IVCO Fisher`,
    description,
    openGraph: {
      title: `${tag.name} — IVCO Fisher`,
      description,
      type: 'website',
      url: `https://ivco.ai/tags/${tag.slug}`,
    },
    twitter: {
      card: 'summary',
      title: `${tag.name} — IVCO Fisher`,
      description,
      creator: '@ivco_fisher',
    },
  }
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const payload = await getPayload({ config: await config })

  const tag = await getTagBySlug(slug)
  if (!tag) notFound()

  const posts = await payload.find({
    collection: 'posts',
    where: {
      and: [
        { status: { equals: 'published' } },
        { tags: { contains: tag.id } },
      ],
    },
    sort: '-publishedAt',
    limit: 100,
    depth: 1,
  })

  return (
    <div>
      <Link href="/">&larr; Back</Link>
      <h1>Tag: {tag.name}</h1>
      {tag.description && <p>{tag.description}</p>}

      <ul className="post-list">
        {posts.docs.map((post) => {
          const cat =
            post.category && typeof post.category === 'object'
              ? (post.category as Category)
              : null

          return (
            <li key={post.id}>
              <Link href={`/posts/${post.slug}`}>
                <h2>{post.title}</h2>
                <p className="post-meta">
                  {post.publishedAt &&
                    new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  {post.readingTime && ` · ${post.readingTime} min read`}
                  {cat && ` · ${cat.name}`}
                </p>
                {post.excerpt && <p className="post-excerpt">{post.excerpt}</p>}
              </Link>
            </li>
          )
        })}
      </ul>

      {posts.docs.length === 0 && <p>No published posts found for this tag.</p>}
    </div>
  )
}
