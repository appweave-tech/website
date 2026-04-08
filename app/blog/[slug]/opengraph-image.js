import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'AppWeave Labs Blog'
export const size = { width: 1200, height: 630 }
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
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)',
          fontFamily: 'sans-serif',
          padding: '60px',
        }}
      >
        {/* Top section: category label */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          {category && (
            <div
              style={{
                fontSize: '16px',
                fontWeight: 600,
                color: '#cc2411',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                background: 'rgba(204, 36, 17, 0.1)',
                padding: '8px 20px',
                borderRadius: '100px',
                border: '1px solid rgba(204, 36, 17, 0.3)',
              }}
            >
              {category}
            </div>
          )}
          <div
            style={{
              fontSize: '16px',
              color: '#666666',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            Blog
          </div>
        </div>

        {/* Middle section: title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontSize: title.length > 60 ? '40px' : title.length > 40 ? '48px' : '56px',
              fontWeight: 700,
              color: '#ffffff',
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
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginTop: '24px',
              fontSize: '20px',
              color: '#a0a0a0',
            }}
          >
            By {authorName}
          </div>
        </div>

        {/* Bottom section: branding */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            {/* Logo mark */}
            <svg width="40" height="40" viewBox="0 0 163 163">
              <path fill="#cc2411" d="M66.95,154.12c4.67-4.68,8.49-8.9,8.49-9.38s-3.67-4.58-8.16-9.11c-6.3-6.37-8.53-8.24-9.77-8.24s-3.47,1.88-9.77,8.24c-4.49,4.53-8.16,8.64-8.16,9.13,0,1.18,16.76,17.87,17.95,17.87.51,0,4.75-3.83,9.42-8.51Z"/>
              <path fill="#cc2411" d="M46.83,95.08c15.4-15.39,28.17-28.5,28.37-29.14.28-.9-1.59-3.13-8.19-9.74-4.71-4.72-8.98-8.58-9.5-8.58-1.22,0-57.51,56.3-57.51,57.52s16.73,17.92,17.92,17.92c.5,0,13.51-12.59,28.91-27.98Z"/>
              <path fill="#cc2411" d="M134.34,86.72c15.56-15.56,28.29-28.71,28.29-29.23,0-1.2-16.73-17.92-17.92-17.92-1.11,0-56.77,55.5-57.28,57.12-.28.9,1.59,3.13,8.19,9.74,4.71,4.72,8.98,8.58,9.5,8.58s13.67-12.73,29.23-28.29Z"/>
              <path fill="#cc2411" d="M114.89,27c4.49-4.53,8.16-8.64,8.16-9.13,0-1.18-16.76-17.87-17.95-17.87s-17.92,16.72-17.92,17.89c0,.48,3.67,4.58,8.16,9.11,6.3,6.37,8.53,8.24,9.77,8.24s3.47-1.88,9.77-8.24Z"/>
              <path fill="#ffffff" d="M114.52,154.75c4.38-4.33,8.13-8.54,8.33-9.34.32-1.28-3.19-5.02-28-29.84-18.15-18.15-28.81-28.38-29.59-28.38-1.88,0-17.65,16.04-17.65,17.95,0,2.18,55.29,57.49,57.46,57.49,1.07,0,3.69-2.18,9.45-7.88Z"/>
              <path fill="#ffffff" d="M154.41,114.84c5.93-5.93,8.22-8.63,8.22-9.69,0-1.78-14.94-17.19-17.22-17.76-1.25-.31-2.72.9-10.05,8.21-4.73,4.72-8.59,9-8.59,9.52,0,1.41,16.79,17.93,18.22,17.93.72,0,4.51-3.3,9.42-8.22Z"/>
              <path fill="#ffffff" d="M106.8,67.22c6.07-6.07,8.22-8.62,8.22-9.73C115.02,55.31,59.73,0,57.55,0c-1.8,0-17.2,14.92-17.78,17.22-.32,1.28,3.19,5.03,28,29.84,18.15,18.15,28.81,28.38,29.59,28.38.73,0,4.47-3.25,9.43-8.22Z"/>
              <path fill="#ffffff" d="M27.37,66.93c4.67-4.68,8.49-8.93,8.49-9.44s-3.87-4.79-8.59-9.5c-7.33-7.32-8.81-8.52-10.05-8.21-2.28.57-17.22,15.98-17.22,17.76,0,1.87,15.81,17.91,17.66,17.91.74,0,4.54-3.32,9.71-8.51Z"/>
            </svg>
            <span
              style={{
                fontSize: '24px',
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: '-0.03em',
              }}
            >
              AppWeave Labs
            </span>
          </div>
          <span
            style={{
              fontSize: '16px',
              color: '#444444',
            }}
          >
            appweave.tech
          </span>
        </div>
      </div>
    ),
    { ...size }
  )
}
