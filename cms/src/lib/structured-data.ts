interface ArticleInput {
  title: string
  description: string
  slug: string
  author: string
  authorBio: string
  publishedAt: string
  modifiedAt?: string
  ogImageUrl: string
  category?: string
  tags?: string[]
}

interface FAQItem {
  question: string
  answer: string
}

export function generateArticleSchema(input: ArticleInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.title,
    description: input.description,
    url: `https://ivco.ai/${input.slug}`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://ivco.ai/${input.slug}` },
    image: input.ogImageUrl,
    inLanguage: 'en-US',
    datePublished: input.publishedAt,
    dateModified: input.modifiedAt || input.publishedAt,
    ...(input.category && { articleSection: input.category }),
    ...(input.tags && input.tags.length > 0 && { keywords: input.tags.join(', ') }),
    author: {
      '@type': 'Person',
      name: input.author,
      description: input.authorBio,
      url: 'https://x.com/ivco_fisher',
    },
    publisher: {
      '@type': 'Organization',
      name: 'IVCO',
      url: 'https://ivco.ai',
    },
  }
}

export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function generateHowToSchema(title: string, steps: { name: string; text: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: title,
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  }
}
