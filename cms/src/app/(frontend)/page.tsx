import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Category } from '@/payload-types'
import Link from 'next/link'
import React from 'react'

/** Force dynamic rendering — CMS content must be fresh, not build-time cached */
export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const payload = await getPayload({ config: await config })

  const posts = await payload.find({
    collection: 'posts',
    where: { status: { equals: 'published' } },
    sort: '-publishedAt',
    limit: 20,
    depth: 1,
  })

  return (
    <div>
      <h1>IVCO Fisher</h1>
      <p>
        I don&apos;t predict markets. I study businesses. Noise fades. Facts
        compound.
      </p>

      <ul className="post-list">
        {posts.docs.map((post) => {
          const cat = post.category && typeof post.category === 'object' ? (post.category as Category) : null
          return (
          <li key={post.id}>
            <Link href={`/posts/${post.slug}`}>
              <h2>{post.title}</h2>
              <p className="post-meta">
                {post.contentType && post.contentType !== 'article' && (
                  <span className="content-type-badge">
                    {post.contentType.replace(/-/g, ' ')}
                  </span>
                )}
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
        {posts.docs.length === 0 && <p>No posts yet.</p>}
      </ul>
    </div>
  )
}
