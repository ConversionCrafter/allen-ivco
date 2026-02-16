import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'category', 'contentType', 'status', 'publishedAt'],
    group: 'Blog',
  },
  access: {
    read: () => true,
  },
  fields: [
    // === Core Content ===
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug',
      validate: (value: string | null | undefined) => {
        if (!value) return 'Slug is required'
        if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) {
          return 'Slug must be lowercase alphanumeric with hyphens only'
        }
        return true
      },
      admin: {
        description: 'URL path (e.g. tsmc-intrinsic-value-case-study)',
      },
    },
    {
      name: 'contentType',
      type: 'select',
      required: true,
      defaultValue: 'article',
      label: 'Content Type',
      options: [
        { label: 'Article', value: 'article' },
        { label: 'Research Report', value: 'research-report' },
        { label: 'Tool Guide', value: 'tool-guide' },
        { label: 'Market Brief', value: 'market-brief' },
      ],
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'authors',
      required: true,
      label: 'Author',
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Content',
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Excerpt',
      admin: {
        description: 'Preview text for cards and RSS (optional, falls back to seo.description)',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      label: 'Category',
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
      label: 'Tags',
    },
    {
      name: 'readingTime',
      type: 'number',
      label: 'Reading Time (min)',
      admin: {
        description: 'Estimated reading time in minutes',
      },
    },
    {
      name: 'difficulty',
      type: 'select',
      defaultValue: 'intermediate',
      label: 'Difficulty',
      options: [
        { label: 'Beginner', value: 'beginner' },
        { label: 'Intermediate', value: 'intermediate' },
        { label: 'Advanced', value: 'advanced' },
      ],
    },
    {
      name: 'series',
      type: 'relationship',
      relationTo: 'series',
      label: 'Series',
      admin: {
        description: 'Optional — assign to a series for sequential reading',
      },
    },
    {
      name: 'seriesOrder',
      type: 'number',
      defaultValue: 0,
      label: 'Series Order',
      admin: {
        description: 'Position within the series (0-indexed)',
      },
    },
    {
      name: 'relatedPosts',
      type: 'relationship',
      relationTo: 'posts',
      hasMany: true,
      label: 'Related Posts',
      admin: {
        description: 'Manually curated related articles',
      },
    },
    {
      name: 'relatedCompany',
      type: 'relationship',
      relationTo: 'companies',
      label: 'Related Company',
      admin: {
        description: 'Link to company if this is a case study or analysis',
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Cover Image',
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      label: 'Status',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'AI Reviewing', value: 'ai_reviewing' },
        { label: 'Ready', value: 'ready' },
        { label: 'Published', value: 'published' },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Published At',
      admin: {
        date: { pickerAppearance: 'dayAndTime' },
        condition: (data) => data?.status === 'published',
      },
    },

    // === SEO (Required — Allen directive: baked into CMS, not afterthought) ===
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          maxLength: 60,
          label: 'SEO Title',
          admin: {
            description: 'SERP title (max 60 characters)',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          maxLength: 160,
          label: 'Meta Description',
          admin: {
            description: 'SERP description (max 160 characters)',
          },
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
          label: 'OG Image',
          admin: {
            description: 'Social sharing preview (1200x630). Falls back to /api/og dynamic generation if empty.',
          },
        },
        {
          name: 'canonicalUrl',
          type: 'text',
          label: 'Canonical URL',
          admin: {
            description: 'Only if cross-posted elsewhere',
          },
        },
      ],
    },

    // === FAQ (Required — auto-generates FAQPage JSON-LD) ===
    {
      name: 'faq',
      type: 'array',
      required: true,
      minRows: 3,
      label: 'FAQ (min 3 questions)',
      admin: {
        description: 'Required for FAQPage structured data. Minimum 3 Q&A pairs.',
      },
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
          label: 'Question',
        },
        {
          name: 'answer',
          type: 'textarea',
          required: true,
          label: 'Answer',
        },
      ],
    },

    // === Schema Options ===
    {
      name: 'schema',
      type: 'group',
      label: 'Structured Data',
      fields: [
        {
          name: 'enableHowTo',
          type: 'checkbox',
          label: 'Enable HowTo Schema',
          defaultValue: false,
          admin: {
            description: 'Turn on for step-by-step articles (e.g. TSMC Case Study)',
          },
        },
        {
          name: 'authorBio',
          type: 'textarea',
          required: true,
          label: 'Author Bio (for this article)',
          admin: {
            description: "E-E-A-T signal — author bio specific to this article's topic",
          },
        },
      ],
    },

    // === Provenance (DNA: 有文件 — track content origin) ===
    {
      name: 'provenance',
      type: 'group',
      label: 'Provenance',
      admin: {
        description: 'Content origin tracking (Documentation DNA)',
      },
      fields: [
        {
          name: 'sourceAgent',
          type: 'text',
          label: 'Source Agent',
          admin: {
            description: "Who drafted this: 'fisher' | 'jane' | 'chi' | 'codex' | 'council'",
          },
        },
        {
          name: 'sourceDoc',
          type: 'text',
          label: 'Source Document',
          admin: {
            description: 'Source document path (e.g. design doc, research file)',
          },
        },
        {
          name: 'sourceSession',
          type: 'text',
          label: 'Source Session',
          admin: {
            description: 'Claude session ID (optional)',
          },
        },
      ],
    },
  ],
}
