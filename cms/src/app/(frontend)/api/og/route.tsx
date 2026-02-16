import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

const categoryColors: Record<string, string> = {
  framework: '#2563eb',
  'case-study': '#059669',
  'brand-story': '#7c3aed',
  opinion: '#d97706',
  education: '#0891b2',
  'research-report': '#dc2626',
  'tool-guide': '#4f46e5',
  'market-brief': '#ea580c',
}

export async function GET(request: NextRequest) {
  try {
  const { searchParams } = request.nextUrl
  const title = (searchParams.get('title') || 'IVCO Fisher').slice(0, 200)
  const category = searchParams.get('category') || 'framework'
  const badgeColor = categoryColors[category] || '#2563eb'

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#1a1a1a',
          padding: '60px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <span
              style={{
                fontSize: '18px',
                fontWeight: 700,
                color: '#ffffff',
                backgroundColor: badgeColor,
                padding: '6px 16px',
                borderRadius: '4px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {category.replace(/-/g, ' ')}
            </span>
          </div>
          <div
            style={{
              fontSize: title.length > 60 ? '42px' : '52px',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.2,
              maxWidth: '900px',
            }}
          >
            {title}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '28px', fontWeight: 700, color: '#ffffff' }}>
              IVCO Fisher
            </span>
            <span style={{ fontSize: '16px', color: '#999999' }}>
              Facts compound. Noise fades.
            </span>
          </div>
          <span style={{ fontSize: '18px', color: '#666666' }}>ivco.ai</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      },
    },
  )
  } catch {
    return new Response('OG image generation failed', { status: 500 })
  }
}
