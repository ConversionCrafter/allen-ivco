import { describe, it, expect } from 'vitest'
import { generateArticleSchema, generateFAQSchema } from '../structured-data'

describe('generateArticleSchema', () => {
  it('generates valid Article JSON-LD', () => {
    const schema = generateArticleSchema({
      title: 'Allen Framework vs Buffett Owner Earnings',
      description: 'How the Allen Framework extends Buffett\'s 1986 Owner Earnings formula',
      slug: 'allen-framework-vs-buffett-owner-earnings-1986',
      author: 'IVCO Fisher',
      authorBio: 'Studies businesses, not markets.',
      publishedAt: '2026-02-14T00:00:00Z',
      ogImageUrl: 'https://ivco.io/media/og-allen-framework.jpg',
    })
    expect(schema['@type']).toBe('Article')
    expect(schema.headline).toBe('Allen Framework vs Buffett Owner Earnings')
    expect(schema.author.name).toBe('IVCO Fisher')
    expect(schema.publisher.name).toBe('IVCO')
  })
})

describe('generateFAQSchema', () => {
  it('generates valid FAQPage JSON-LD', () => {
    const schema = generateFAQSchema([
      { question: 'What is Owner Earnings?', answer: 'Buffett\'s formula for true cash flow.' },
      { question: 'Why not FCF?', answer: 'FCF penalizes growth capex.' },
      { question: 'How is maintenance capex estimated?', answer: 'Company-specific ratio.' },
    ])
    expect(schema['@type']).toBe('FAQPage')
    expect(schema.mainEntity).toHaveLength(3)
    expect(schema.mainEntity[0]['@type']).toBe('Question')
    expect(schema.mainEntity[0].acceptedAnswer['@type']).toBe('Answer')
  })
})
