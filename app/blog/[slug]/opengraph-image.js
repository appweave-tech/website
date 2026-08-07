import { ImageResponse } from 'next/og'
import { OG, SIZE, Card, Wordmark } from '../../og-brand'

export const alt = 'AppWeave Labs Blog'
export const size = SIZE
export const contentType = 'image/png'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

async function getPost(slug) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    title,
    "author": author->{ name },
    "categories": categories[]->title
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
  const post = await getPost(slug)

  const title = post?.title || 'Blog Post'
  const category = post?.categories?.[0] || null
  const authorName = post?.author?.name || 'AppWeave Labs'

  return new ImageResponse(
    (
      <Card>
        {/* Top: category and section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {category && (
            <div
              style={{
                fontSize: '16px',
                fontWeight: 600,
                color: OG.accent,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                background: `${OG.accentLogo}1f`,
                padding: '8px 20px',
                borderRadius: '100px',
                border: `1px solid ${OG.accentLogo}4d`,
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
            Blog
          </div>
        </div>

        {/* Middle: title */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' }}>
          <div
            style={{
              fontSize: title.length > 60 ? '40px' : title.length > 40 ? '48px' : '56px',
              fontWeight: 700,
              color: OG.text,
              letterSpacing: '-0.03em',
              lineHeight: 1.2,
              maxWidth: '1000px',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {title}
          </div>
          <div style={{ display: 'flex', marginTop: '24px', fontSize: '20px', color: OG.textSoft }}>
            By {authorName}
          </div>
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
