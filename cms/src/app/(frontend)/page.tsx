import { getPayload } from 'payload'
import config from '@/payload.config'
import React from 'react'

export default async function HomePage() {
  const payload = await getPayload({ config: await config })

  const posts = await payload.find({
    collection: 'posts',
    where: { status: { equals: 'published' } },
    sort: '-publishedAt',
    limit: 20,
    depth: 2,
  })

  return (
    <div>
      <h1>IVCO Fisher</h1>
      <p>
        I don&apos;t predict markets. I study businesses. Noise fades. Facts
        compound.
      </p>

      <ul className="post-list">
        {posts.docs.map((post: any) => (
          <li key={post.id}>
            <a href={`/posts/${post.slug}`}>
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
                {post.category &&
                  typeof post.category === 'object' &&
                  ` · ${post.category.name}`}
              </p>
              {post.excerpt && <p className="post-excerpt">{post.excerpt}</p>}
            </a>
          </li>
        ))}
        {posts.docs.length === 0 && <p>No posts yet.</p>}
      </ul>
    </div>
  )
}
