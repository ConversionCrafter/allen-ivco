import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Category } from '@/payload-types'

export const dynamic = 'force-dynamic'

async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const payload = await getPayload({ config: await config })
  const result = await payload.find({
    collection: 'categories',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  return (result.docs[0] as Category) || null
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    return {
      title: 'Not Found',
      description: '',
    }
  }

  const description = category.description || `Published IVCO posts in category ${category.name}.`

  return {
    title: `${category.name} — IVCO Fisher`,
    description,
    openGraph: {
      title: `${category.name} — IVCO Fisher`,
      description,
      type: 'website',
      url: `https://ivco.ai/categories/${category.slug}`,
    },
    twitter: {
      card: 'summary',
      title: `${category.name} — IVCO Fisher`,
      description,
      creator: '@ivco_fisher',
    },
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const payload = await getPayload({ config: await config })

  const category = await getCategoryBySlug(slug)
  if (!category) notFound()

  const posts = await payload.find({
    collection: 'posts',
    where: {
      and: [{ status: { equals: 'published' } }, { category: { equals: category.id } }],
    },
    sort: '-publishedAt',
    limit: 100,
    depth: 0,
    select: {
      title: true,
      slug: true,
      excerpt: true,
      readingTime: true,
      publishedAt: true,
      contentType: true,
    },
  })

  return (
    <div>
      <Link href="/">&larr; Back</Link>
      <h1>Category: {category.name}</h1>
      {category.description && <p>{category.description}</p>}

      <ul className="post-list">
        {posts.docs.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.slug}`}>
              <h2>{post.title}</h2>
              <p className="post-meta">
                {post.contentType && post.contentType !== 'article' && (
                  <span className="content-type-badge">{post.contentType.replace(/-/g, ' ')}</span>
                )}
                {post.publishedAt &&
                  new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                {post.readingTime && ` · ${post.readingTime} min read`}
              </p>
              {post.excerpt && <p className="post-excerpt">{post.excerpt}</p>}
            </Link>
          </li>
        ))}
      </ul>

      {posts.docs.length === 0 && <p>No published posts found for this category.</p>}
    </div>
  )
}
