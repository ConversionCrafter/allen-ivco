/**
 * Seed blog content into Payload CMS.
 *
 * Creates: 1 Author, 4 Categories, 7 Posts (draft, with empty Lexical placeholder).
 * Content is pasted manually via Admin UI — Lexical import from markdown is fragile.
 *
 * Usage:
 *   cd cms && npx tsx ../scripts/seed-blog.ts
 *
 * Requires: DATABASE_URL in .env (loads from cms/.env)
 */

import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../cms/src/payload.config'

const AUTHOR_BIO =
  "I don't predict markets. I study businesses. IVCO Fisher is the public voice of the IVCO project — " +
  'an open-source research engine that integrates Graham, Buffett, Fisher, and Munger into a single ' +
  'calibration pipeline. Nearly three decades of reading annual reports distilled into algorithms you can actually run.'

const CATEGORIES = [
  { name: 'Framework', slug: 'framework' },
  { name: 'Case Study', slug: 'case-study' },
  { name: 'Brand Story', slug: 'brand-story' },
  { name: 'Opinion', slug: 'opinion' },
]

const PLACEHOLDER_CONTENT = {
  root: {
    type: 'root',
    children: [
      {
        type: 'paragraph',
        children: [{ type: 'text', text: 'Content will be pasted via Admin UI.', format: 0, detail: 0, mode: 'normal', style: '', version: 1 }],
        direction: 'ltr' as const,
        format: '' as const,
        indent: 0,
        version: 1,
        textFormat: 0,
        textStyle: '',
      },
    ],
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    version: 1,
  },
}

interface PostSeed {
  title: string
  slug: string
  category: string
  tags: string[]
  description: string
  authorBio: string
}

const POSTS: PostSeed[] = [
  {
    title: 'Allen Framework vs Buffett Owner Earnings: What Changed',
    slug: 'allen-framework-vs-buffett-owner-earnings-1986',
    category: 'framework',
    tags: ['buffett', 'owner-earnings', 'allen-framework', 'valuation', 'dcf'],
    description:
      "Warren Buffett gave us the philosophy. The Allen Framework gave us the algorithm. Here's how 40 years of evolution transformed owner earnings from an art into a science you can actually run.",
    authorBio:
      'IVCO Fisher has studied Owner Earnings since the 1990s, building on Buffett\'s 1986 framework with quantitative calibration tools.',
  },
  {
    title: 'TSMC Case Study: From 10-Year Financials to Intrinsic Value Range',
    slug: 'tsmc-intrinsic-value-case-study',
    category: 'case-study',
    tags: ['tsmc', 'dcf', 'owner-earnings', 'confidence-coefficient', 'reality-coefficient'],
    description:
      "Walk through TSMC's complete valuation: 10-year financials, Owner Earnings, Reality Coefficient, Three-Stage DCF, Confidence Coefficient, IV Range of NT$4,565-5,639.",
    authorBio:
      'IVCO Fisher has tracked TSMC\'s financials for over a decade, applying the Allen Framework\'s three-tier calibration pipeline to one of the world\'s most complex semiconductor businesses.',
  },
  {
    title: 'Why We Built IVCO: An AI-Powered Value Investing System',
    slug: 'why-we-built-ivco',
    category: 'brand-story',
    tags: ['ivco', 'value-investing', 'ai', 'origin-story', 'four-masters'],
    description:
      'IVCO was born from old-school value investing discipline, sharpened by modern tools, and designed for one purpose: help investors think better, decide clearer, and act with conviction.',
    authorBio:
      'IVCO Fisher is the voice of the IVCO project — where Graham, Buffett, Fisher, and Munger meet open-source AI.',
  },
  {
    title: 'What Are Owner Earnings? A Practical Guide',
    slug: 'what-are-owner-earnings',
    category: 'framework',
    tags: ['owner-earnings', 'buffett', 'valuation', 'maintenance-capex', 'python'],
    description:
      "Warren Buffett said subtract maintenance capex — then told us to guess. The Allen Framework replaces the guesswork with a company-specific Maintenance Ratio you can actually measure.",
    authorBio:
      'IVCO Fisher breaks down complex valuation concepts into practical algorithms, backed by Python tools anyone can verify.',
  },
  {
    title: 'Three-Stage DCF: From Philosophy to Algorithm',
    slug: 'three-stage-dcf-philosophy-to-algorithm',
    category: 'framework',
    tags: ['dcf', 'valuation', 'three-stage', 'cagr', 'confidence-coefficient', 'python'],
    description:
      "Most DCF models pretend the future is one straight line. The Allen Framework splits it into three stages — and turns philosophy into Python you can actually run.",
    authorBio:
      'IVCO Fisher built the Three-Stage DCF engine that powers IVCO — tested against hand-calculated ground truth for TSMC.',
  },
  {
    title: 'Confidence Coefficient: Why a Range, Not a Number',
    slug: 'confidence-coefficient-why-a-range',
    category: 'framework',
    tags: ['confidence-coefficient', 'valuation', 'range', 'intrinsic-value', 'allen-framework'],
    description:
      "Every valuation model gives you a single number. The Confidence Coefficient gives you a range — because conviction isn't binary, and the future isn't a straight line.",
    authorBio:
      'IVCO Fisher designed the Confidence Coefficient system — a five-tier framework that turns subjective conviction into measurable valuation ranges.',
  },
  {
    title: 'How IVCO Became an Intelligence: From Blog Platform to AI Research Engine',
    slug: 'how-ivco-became-an-intelligence',
    category: 'opinion',
    tags: ['ivco', 'ai-agents', 'research-engine', 'openClaw', 'value-investing', 'tool-ecosystem', 'deep-value-council'],
    description:
      "We set out to build a blog. We ended up building an intelligence. This is the story of how one brainstorming session turned IVCO from a static content platform into a self-evolving AI research engine.",
    authorBio:
      'IVCO Fisher chronicles the evolution of the IVCO project from static blog to AI-native research engine.',
  },
]

async function seed() {
  console.log('🌱 Starting blog seed...\n')

  const payload = await getPayload({ config: await config })

  // 1. Create Author
  console.log('Creating author: IVCO Fisher')
  let author
  const existingAuthors = await payload.find({
    collection: 'authors',
    where: { name: { equals: 'IVCO Fisher' } },
    limit: 1,
  })

  if (existingAuthors.docs.length > 0) {
    author = existingAuthors.docs[0]
    console.log('  → Already exists, skipping')
  } else {
    author = await payload.create({
      collection: 'authors',
      data: {
        name: 'IVCO Fisher',
        bio: AUTHOR_BIO,
      },
    })
    console.log('  → Created ✅')
  }

  // 2. Create Categories
  console.log('\nCreating categories...')
  const categoryMap: Record<string, string> = {}

  for (const cat of CATEGORIES) {
    const existing = await payload.find({
      collection: 'categories',
      where: { slug: { equals: cat.slug } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      categoryMap[cat.slug] = existing.docs[0].id as string
      console.log(`  ${cat.name} → Already exists`)
    } else {
      const created = await payload.create({
        collection: 'categories',
        data: cat,
      })
      categoryMap[cat.slug] = created.id as string
      console.log(`  ${cat.name} → Created ✅`)
    }
  }

  // 3. Create Posts
  console.log('\nCreating posts...')
  for (const post of POSTS) {
    const existing = await payload.find({
      collection: 'posts',
      where: { slug: { equals: post.slug } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      console.log(`  "${post.title}" → Already exists, skipping`)
      continue
    }

    await payload.create({
      collection: 'posts',
      data: {
        title: post.title,
        slug: post.slug,
        author: author.id,
        content: PLACEHOLDER_CONTENT,
        excerpt: post.description,
        category: categoryMap[post.category],
        tags: post.tags.map((tag) => ({ tag })),
        status: 'draft',
        seo: {
          title: post.title.length > 60 ? post.title.slice(0, 57) + '...' : post.title,
          description: post.description.length > 160 ? post.description.slice(0, 157) + '...' : post.description,
        },
        faq: [
          { question: 'Placeholder FAQ 1', answer: 'Replace via Admin UI' },
          { question: 'Placeholder FAQ 2', answer: 'Replace via Admin UI' },
          { question: 'Placeholder FAQ 3', answer: 'Replace via Admin UI' },
        ],
        schema: {
          enableHowTo: false,
          authorBio: post.authorBio,
        },
      },
    })
    console.log(`  "${post.title}" → Created as draft ✅`)
  }

  console.log('\n🎉 Seed complete! 7 posts created as drafts.')
  console.log('Next: Open Admin UI → paste markdown content → add FAQ → set ogImage → publish')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
