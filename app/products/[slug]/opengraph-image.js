import { ImageResponse } from 'next/og'
import { OG, SIZE, Card, Wordmark } from '../../og-brand'

export const alt = 'AppWeave Labs Product'
export const size = SIZE
export const contentType = 'image/png'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

const statusLabels = {
  'live': 'Live',
  'beta': 'Beta',
  'coming-soon': 'Coming Soon',
  'deprecated': 'Deprecated',
}

/* Mirrors the --status-* tokens in globals.css */
const statusColors = {
  'live': '#5aa87a',
  'beta': '#c39a4a',
  'coming-soon': '#e97060',
  'deprecated': '#7a716f',
}

async function getProduct(slug) {
  const query = `*[_type == "product" && slug.current == $slug][0] {
    name,
    tagline,
    status,
    category
  }`
  const url = `https://${projectId}.api.sanity.io/v2024-01-01/data/query/${dataset}?query=${encodeURIComponent(query)}&$slug="${slug}"`

  try {
    const res = await fetch(url, { next: { revalidate: 60 } })
    const data = await res.json()
    return data.result
  } catch (error) {
    return null
  }
}

export default async function Image({ params }) {
  const { slug } = await params
  const product = await getProduct(slug)

  const name = product?.name || 'Product'
  const tagline = product?.tagline || null
  const status = product?.status || null
  const category = product?.category || null

  const statusLabel = status ? (statusLabels[status] || status) : null
  const statusColor = status ? (statusColors[status] || OG.textSoft) : null

  return new ImageResponse(
    (
      <Card>
        {/* Top: status and category */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {statusLabel && (
            <div
              style={{
                fontSize: '16px',
                fontWeight: 600,
                color: statusColor,
                background: `${statusColor}18`,
                padding: '8px 20px',
                borderRadius: '100px',
                border: `1px solid ${statusColor}4D`,
              }}
            >
              {statusLabel}
            </div>
          )}
          {category && (
            <div
              style={{
                fontSize: '16px',
                fontWeight: 500,
                color: OG.textSoft,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                background: OG.surface,
                padding: '8px 20px',
                borderRadius: '100px',
                border: `1px solid ${OG.border}`,
              }}
            >
              {category}
            </div>
          )}
          <div
            style={{
              fontSize: '16px',
              color: OG.textMuted,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            Product
          </div>
        </div>

        {/* Middle: name and tagline */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' }}>
          <div
            style={{
              fontSize: name.length > 30 ? '48px' : '60px',
              fontWeight: 700,
              color: OG.text,
              letterSpacing: '-0.03em',
              lineHeight: 1.2,
              maxWidth: '1000px',
            }}
          >
            {name}
          </div>
          {tagline && (
            <div
              style={{
                fontSize: '24px',
                color: OG.textSoft,
                lineHeight: 1.5,
                marginTop: '20px',
                maxWidth: '900px',
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {tagline}
            </div>
          )}
        </div>

        {/* Bottom: branding */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Wordmark />
          <span style={{ fontSize: '16px', color: OG.textMuted }}>appweave.tech</span>
        </div>
      </Card>
    ),
    { ...SIZE }
  )
}
