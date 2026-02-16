/**
 * Upload 7 blog articles to Payload CMS via REST API.
 * Reads markdown files, converts to Lexical JSON, creates posts.
 *
 * Usage: cd /path/to/allen-ivco && npx tsx scripts/upload-blog.ts
 */

import * as fs from 'fs'
import * as path from 'path'

const BASE_URL = 'https://ivco.ai'
const BLOG_DIR = path.resolve(__dirname, '../docs/blog')

const AUTHOR_BIO =
  "I don't predict markets. I study businesses. IVCO Fisher is the public voice of the IVCO project — " +
  'an open-source research engine that integrates Graham, Buffett, Fisher, and Munger into a single ' +
  'calibration pipeline. Nearly three decades of reading annual reports distilled into algorithms you can actually run.'

// ─── Markdown → Lexical Converter ──────────────────────────────────

interface LexicalNode {
  type: string
  [key: string]: unknown
}

function textNode(text: string, format: number = 0): LexicalNode {
  return { type: 'text', text, format, detail: 0, mode: 'normal', style: '', version: 1 }
}

function paragraphNode(children: LexicalNode[]): LexicalNode {
  return {
    type: 'paragraph', children, direction: 'ltr', format: '', indent: 0, version: 1,
    textFormat: 0, textStyle: '',
  }
}

function headingNode(tag: string, children: LexicalNode[]): LexicalNode {
  return { type: 'heading', tag, children, direction: 'ltr', format: '', indent: 0, version: 1 }
}

function quoteNode(children: LexicalNode[]): LexicalNode {
  return { type: 'quote', children, direction: 'ltr', format: '', indent: 0, version: 1 }
}

function codeNode(code: string, language: string = ''): LexicalNode {
  const lines = code.split('\n')
  const children: LexicalNode[] = []
  for (let i = 0; i < lines.length; i++) {
    children.push({ type: 'code-highlight', text: lines[i], highlightType: null, version: 1 })
    if (i < lines.length - 1) {
      children.push({ type: 'linebreak', version: 1 })
    }
  }
  return { type: 'code', children, direction: 'ltr', format: '', indent: 0, version: 1, language }
}

function hrNode(): LexicalNode {
  return { type: 'horizontalrule', version: 1 }
}

function listNode(type: 'bullet' | 'number', items: LexicalNode[][]): LexicalNode {
  const children = items.map((itemChildren, i) => ({
    type: 'listitem',
    children: [paragraphNode(itemChildren)],
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    version: 1,
    value: i + 1,
  }))
  return {
    type: 'list', listType: type, children,
    direction: 'ltr', format: '', indent: 0, version: 1,
    start: 1, tag: type === 'bullet' ? 'ul' : 'ol',
  }
}

function tableCellNode(children: LexicalNode[], isHeader: boolean): LexicalNode {
  return {
    type: 'tablecell', children: [paragraphNode(children)],
    direction: 'ltr', format: '', indent: 0, version: 1,
    headerState: isHeader ? 1 : 0, width: null, colSpan: 1,
  }
}

function tableRowNode(cells: LexicalNode[]): LexicalNode {
  return { type: 'tablerow', children: cells, direction: 'ltr', format: '', indent: 0, version: 1 }
}

function tableNode(rows: LexicalNode[]): LexicalNode {
  return { type: 'table', children: rows, direction: 'ltr', format: '', indent: 0, version: 1 }
}

function linkNode(text: string, url: string, format: number = 0): LexicalNode {
  return {
    type: 'link',
    children: [textNode(text, format)],
    fields: { url, linkType: 'custom', newTab: false },
    direction: 'ltr', format: '', indent: 0, version: 1,
  }
}

/** Parse inline markdown: **bold**, *italic*, `code`, [links](url) */
function parseInline(text: string): LexicalNode[] {
  const nodes: LexicalNode[] = []
  // Regex for: **bold**, *italic*, `code`, [text](url)
  const re = /(\*\*(.+?)\*\*|\*(.+?)\*|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\))/g
  let lastIndex = 0
  let match

  while ((match = re.exec(text)) !== null) {
    // Text before match
    if (match.index > lastIndex) {
      nodes.push(textNode(text.slice(lastIndex, match.index)))
    }

    if (match[2]) {
      // **bold** - but check if it contains a link
      const boldText = match[2]
      const linkMatch = boldText.match(/\[([^\]]+)\]\(([^)]+)\)/)
      if (linkMatch) {
        nodes.push(linkNode(linkMatch[1], linkMatch[2], 1)) // bold link
      } else {
        nodes.push(textNode(boldText, 1))
      }
    } else if (match[3]) {
      // *italic*
      nodes.push(textNode(match[3], 2))
    } else if (match[4]) {
      // `code`
      nodes.push(textNode(match[4], 16))
    } else if (match[5] && match[6]) {
      // [text](url)
      nodes.push(linkNode(match[5], match[6]))
    }

    lastIndex = match.index + match[0].length
  }

  // Remaining text
  if (lastIndex < text.length) {
    nodes.push(textNode(text.slice(lastIndex)))
  }

  if (nodes.length === 0) {
    nodes.push(textNode(text))
  }

  return nodes
}

/** Parse a table block (array of lines starting with |) */
function parseTable(lines: string[]): LexicalNode {
  const rows: LexicalNode[] = []
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    // Skip separator rows (|---|---|)
    if (/^\|[\s\-:]+\|$/.test(line) || /^\|(\s*-+\s*\|)+$/.test(line.replace(/:/g, ''))) continue

    const cells = line.split('|').slice(1, -1).map((c) => c.trim())
    const isHeader = i === 0
    const cellNodes = cells.map((cell) => tableCellNode(parseInline(cell), isHeader))
    rows.push(tableRowNode(cellNodes))
  }
  return tableNode(rows)
}

/** Convert full markdown body to Lexical root node */
function markdownToLexical(markdown: string): LexicalNode {
  const lines = markdown.split('\n')
  const children: LexicalNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // Empty line → skip
    if (line.trim() === '') {
      i++
      continue
    }

    // Code block
    if (line.trim().startsWith('```')) {
      const lang = line.trim().slice(3).trim()
      const codeLines: string[] = []
      i++
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i])
        i++
      }
      i++ // skip closing ```
      children.push(codeNode(codeLines.join('\n'), lang))
      continue
    }

    // Horizontal rule
    if (/^---+$/.test(line.trim())) {
      children.push(hrNode())
      i++
      continue
    }

    // Heading
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/)
    if (headingMatch) {
      const level = headingMatch[1].length
      const tag = `h${level}`
      children.push(headingNode(tag, parseInline(headingMatch[2])))
      i++
      continue
    }

    // Table
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      const tableLines: string[] = []
      while (i < lines.length && lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) {
        tableLines.push(lines[i])
        i++
      }
      children.push(parseTable(tableLines))
      continue
    }

    // Blockquote
    if (line.trim().startsWith('>')) {
      const quoteLines: string[] = []
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ''))
        i++
      }
      const quoteText = quoteLines.join(' ')
      children.push(quoteNode(parseInline(quoteText)))
      continue
    }

    // Unordered list
    if (/^\s*[-*+]\s/.test(line)) {
      const items: LexicalNode[][] = []
      while (i < lines.length && /^\s*[-*+]\s/.test(lines[i])) {
        const itemText = lines[i].replace(/^\s*[-*+]\s/, '').trim()
        items.push(parseInline(itemText))
        i++
      }
      children.push(listNode('bullet', items))
      continue
    }

    // Ordered list
    if (/^\s*\d+\.\s/.test(line)) {
      const items: LexicalNode[][] = []
      while (i < lines.length && /^\s*\d+\.\s/.test(lines[i])) {
        const itemText = lines[i].replace(/^\s*\d+\.\s/, '').trim()
        items.push(parseInline(itemText))
        i++
      }
      children.push(listNode('number', items))
      continue
    }

    // Regular paragraph
    const paraLines: string[] = []
    while (i < lines.length && lines[i].trim() !== '' &&
      !lines[i].trim().startsWith('#') &&
      !lines[i].trim().startsWith('```') &&
      !lines[i].trim().startsWith('>') &&
      !/^\s*[-*+]\s/.test(lines[i]) &&
      !/^\s*\d+\.\s/.test(lines[i]) &&
      !(lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) &&
      !/^---+$/.test(lines[i].trim())) {
      paraLines.push(lines[i])
      i++
    }
    const paraText = paraLines.join(' ')
    if (paraText.trim()) {
      children.push(paragraphNode(parseInline(paraText)))
    }
  }

  return {
    root: {
      type: 'root', children, direction: 'ltr', format: '', indent: 0, version: 1,
    },
  }
}

// ─── Frontmatter Parser ──────────────────────────────────────────

interface Frontmatter {
  title: string
  slug: string
  category: string
  tags: string[]
  description: string
  faq?: { question: string; answer: string }[]
}

function parseFrontmatter(content: string): { frontmatter: Frontmatter; body: string } {
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!fmMatch) throw new Error('No frontmatter found')

  const fmText = fmMatch[1]
  const body = fmMatch[2]

  const get = (key: string): string => {
    const m = fmText.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'))
    return m ? m[1].replace(/^["']|["']$/g, '').trim() : ''
  }

  const tagsMatch = fmText.match(/^tags:\s*\[(.+)\]$/m)
  const tags = tagsMatch ? tagsMatch[1].split(',').map((t) => t.trim()) : []

  return {
    frontmatter: {
      title: get('title'),
      slug: get('slug'),
      category: get('category'),
      tags,
      description: get('description'),
    },
    body,
  }
}

/** Extract FAQ from markdown — looks for ## FAQ or ## Frequently Asked Questions section */
function extractFAQ(body: string): { question: string; answer: string }[] {
  const faqMatch = body.match(/##\s*(?:FAQ|Frequently Asked Questions)\s*\n([\s\S]*?)(?=\n##\s|\n---|\Z|$)/)
  if (!faqMatch) return []

  const faqText = faqMatch[1]
  const faqs: { question: string; answer: string }[] = []
  const qBlocks = faqText.split(/\n###\s+/).filter(Boolean)

  for (const block of qBlocks) {
    const lines = block.trim().split('\n')
    const question = lines[0].replace(/^\*\*|\*\*$/g, '').replace(/\?$/, '').trim() + '?'
    const answer = lines.slice(1).join(' ').trim()
    if (question.length > 2 && answer) {
      faqs.push({ question, answer })
    }
  }

  return faqs
}

// ─── REST API Client ─────────────────────────────────────────────

let authToken = ''

async function login(email: string, password: string): Promise<string> {
  const res = await fetch(`${BASE_URL}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  const data = await res.json()
  if (!data.token) throw new Error(`Login failed: ${JSON.stringify(data)}`)
  return data.token
}

async function apiGet(collection: string, query: string = ''): Promise<any> {
  const res = await fetch(`${BASE_URL}/api/${collection}?${query}`, {
    headers: { Authorization: `JWT ${authToken}` },
  })
  return res.json()
}

async function apiPost(collection: string, data: any): Promise<any> {
  const res = await fetch(`${BASE_URL}/api/${collection}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `JWT ${authToken}` },
    body: JSON.stringify(data),
  })
  const result = await res.json()
  if (result.errors) throw new Error(`Create failed: ${JSON.stringify(result.errors)}`)
  return result
}

// ─── Main Upload Logic ───────────────────────────────────────────

const CATEGORY_SLUGS = ['framework', 'case-study', 'brand-story', 'opinion']
const CATEGORY_NAMES: Record<string, string> = {
  framework: 'Framework',
  'case-study': 'Case Study',
  'brand-story': 'Brand Story',
  opinion: 'Opinion',
}

const AUTHOR_BIOS: Record<string, string> = {
  'allen-framework-vs-buffett-owner-earnings-1986':
    "IVCO Fisher has studied Owner Earnings since the 1990s, building on Buffett's 1986 framework with quantitative calibration tools.",
  'tsmc-intrinsic-value-case-study':
    "IVCO Fisher has tracked TSMC's financials for over a decade, applying the Allen Framework's three-tier calibration pipeline.",
  'why-we-built-ivco':
    'IVCO Fisher is the voice of the IVCO project — where Graham, Buffett, Fisher, and Munger meet open-source AI.',
  'what-are-owner-earnings':
    'IVCO Fisher breaks down complex valuation concepts into practical algorithms, backed by Python tools anyone can verify.',
  'three-stage-dcf-philosophy-to-algorithm':
    'IVCO Fisher built the Three-Stage DCF engine that powers IVCO — tested against hand-calculated ground truth for TSMC.',
  'confidence-coefficient-why-a-range':
    'IVCO Fisher designed the Confidence Coefficient system — a five-tier framework that turns subjective conviction into measurable valuation ranges.',
  'how-ivco-became-an-intelligence':
    'IVCO Fisher chronicles the evolution of the IVCO project from static blog to AI-native research engine.',
}

async function main() {
  // Load credentials from env file
  const envPath = path.resolve(process.env.HOME || '~', '.config/env/payload-admin.env')
  const envContent = fs.readFileSync(envPath, 'utf-8')
  const email = envContent.match(/PAYLOAD_ADMIN_EMAIL="(.+)"/)?.[1]
  const password = envContent.match(/PAYLOAD_ADMIN_PASSWORD="(.+)"/)?.[1]
  if (!email || !password) throw new Error('Cannot read credentials from ' + envPath)

  console.log('🔑 Logging in...')
  authToken = await login(email, password)
  console.log('  ✅ Authenticated\n')

  // 1. Create Author
  console.log('👤 Creating author: IVCO Fisher')
  const authors = await apiGet('authors', 'where[name][equals]=IVCO Fisher&limit=1')
  let authorId: number
  if (authors.docs?.length > 0) {
    authorId = authors.docs[0].id
    console.log(`  → Already exists (id: ${authorId})`)
  } else {
    const created = await apiPost('authors', { name: 'IVCO Fisher', bio: AUTHOR_BIO })
    authorId = created.doc.id
    console.log(`  → Created ✅ (id: ${authorId})`)
  }

  // 2. Create Categories
  console.log('\n📁 Creating categories...')
  const categoryMap: Record<string, number> = {}
  for (const slug of CATEGORY_SLUGS) {
    const existing = await apiGet('categories', `where[slug][equals]=${slug}&limit=1`)
    if (existing.docs?.length > 0) {
      categoryMap[slug] = existing.docs[0].id
      console.log(`  ${CATEGORY_NAMES[slug]} → exists (id: ${categoryMap[slug]})`)
    } else {
      const created = await apiPost('categories', { name: CATEGORY_NAMES[slug], slug })
      categoryMap[slug] = created.doc.id
      console.log(`  ${CATEGORY_NAMES[slug]} → created ✅ (id: ${categoryMap[slug]})`)
    }
  }

  // 3. Read and upload blog articles
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md')).sort()
  console.log(`\n📝 Uploading ${files.length} articles...\n`)

  for (const file of files) {
    const filePath = path.join(BLOG_DIR, file)
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { frontmatter, body } = parseFrontmatter(raw)

    // Check if already exists
    const existing = await apiGet('posts', `where[slug][equals]=${frontmatter.slug}&limit=1`)
    if (existing.docs?.length > 0) {
      console.log(`  ⏭  "${frontmatter.title}" → already exists, skipping`)
      continue
    }

    // Convert markdown to Lexical
    // Remove the first H1 (same as title) and FAQ section (handled separately)
    let contentBody = body
      .replace(/^#\s+.+\n/, '') // Remove first H1
      .replace(/##\s*(?:FAQ|Frequently Asked Questions)\s*\n[\s\S]*$/, '') // Remove FAQ section
      .trim()

    const lexical = markdownToLexical(contentBody)

    // Extract FAQ
    let faqs = extractFAQ(body)
    if (faqs.length < 3) {
      // Generate default FAQs from description
      faqs = [
        { question: `What is the main argument of "${frontmatter.title}"?`, answer: frontmatter.description },
        { question: 'How does this relate to the Allen Framework?', answer: 'This article explores a core component of the Allen Framework for intelligent valuation.' },
        { question: 'Where can I try the tools mentioned?', answer: 'The Python CLI tools are open source at github.com/ConversionCrafter/allen-ivco.' },
      ]
    }

    // SEO
    const seoTitle = frontmatter.title.length > 60 ? frontmatter.title.slice(0, 57) + '...' : frontmatter.title
    const seoDesc = frontmatter.description.length > 160 ? frontmatter.description.slice(0, 157) + '...' : frontmatter.description

    const postData = {
      title: frontmatter.title,
      slug: frontmatter.slug,
      author: authorId,
      content: lexical,
      excerpt: frontmatter.description,
      category: categoryMap[frontmatter.category] || categoryMap['framework'],
      tags: frontmatter.tags.map((tag) => ({ tag })),
      status: 'published',
      publishedAt: new Date().toISOString(),
      seo: { title: seoTitle, description: seoDesc },
      faq: faqs.slice(0, 5),
      schema: {
        enableHowTo: false,
        authorBio: AUTHOR_BIOS[frontmatter.slug] || AUTHOR_BIO,
      },
    }

    try {
      const result = await apiPost('posts', postData)
      console.log(`  ✅ "${frontmatter.title}" → published (id: ${result.doc.id})`)
    } catch (err: any) {
      console.error(`  ❌ "${frontmatter.title}" → FAILED: ${err.message}`)
    }
  }

  console.log('\n🎉 Upload complete!')
  console.log(`Visit: ${BASE_URL}`)
}

main().catch((err) => {
  console.error('Upload failed:', err)
  process.exit(1)
})
