import Link from 'next/link'
import { notFound } from 'next/navigation'
import { client, careerQuery, careerSlugsQuery } from '@/lib/sanity'

async function getCareer(slug) {
  try {
    const career = await client.fetch(careerQuery, { slug })
    return career
  } catch (error) {
    console.error('Error fetching career:', error)
    return null
  }
}

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch(careerSlugsQuery)
    return slugs.map((item) => ({ slug: item.slug }))
  } catch (error) {
    return []
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const career = await getCareer(slug)
  
  if (!career) {
    return { title: 'Position Not Found | AppWeave Labs' }
  }

  return {
    title: `${career.title} | Careers at AppWeave Labs`,
    description: career.shortDescription || `Join AppWeave Labs as a ${career.title}`,
  }
}

const typeLabels = {
  'full-time': 'Full-time',
  'part-time': 'Part-time',
  'contract': 'Contract',
  'internship': 'Internship',
  'freelance': 'Freelance',
}

function formatDate(dateString) {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export default async function CareerPage({ params }) {
  const { slug } = await params
  const career = await getCareer(slug)

  if (!career) {
    notFound()
  }

  return (
    <main style={{ paddingTop: '6rem', paddingBottom: '4rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 2rem' }}>
        <Link href="/#careers" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: 'var(--text-muted)',
          textDecoration: 'none',
          fontSize: '0.9rem',
          marginBottom: '2rem'
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Careers
        </Link>

        <header style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
            <span style={{
              fontSize: '0.75rem',
              padding: '0.35rem 0.75rem',
              background: 'rgba(16, 185, 129, 0.1)',
              color: 'var(--accent-emerald)',
              borderRadius: '100px',
              fontWeight: 500
            }}>{typeLabels[career.type] || career.type}</span>
            {career.location && (
              <span style={{
                fontSize: '0.75rem',
                padding: '0.35rem 0.75rem',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '100px',
                color: 'var(--text-secondary)'
              }}>📍 {career.location}</span>
            )}
            {career.department && (
              <span style={{
                fontSize: '0.75rem',
                padding: '0.35rem 0.75rem',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '100px',
                color: 'var(--text-secondary)'
              }}>🏢 {career.department}</span>
            )}
          </div>
          
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 2.75rem)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            marginBottom: '1rem'
          }}>{career.title}</h1>
          
          {career.shortDescription && (
            <p style={{
              fontSize: '1.1rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.7
            }}>{career.shortDescription}</p>
          )}

          {career.salaryRange && (
            <p style={{
              fontSize: '1rem',
              color: 'var(--accent-cyan)',
              marginTop: '1rem',
              fontWeight: 500
            }}>💰 {career.salaryRange}</p>
          )}

          {career.publishedAt && (
            <p style={{
              fontSize: '0.85rem',
              color: 'var(--text-muted)',
              marginTop: '0.5rem'
            }}>Posted {formatDate(career.publishedAt)}</p>
          )}
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {career.responsibilities && career.responsibilities.length > 0 && (
            <section>
              <h2 style={{
                fontSize: '1.25rem',
                fontWeight: 600,
                marginBottom: '1rem',
                color: 'var(--text-primary)'
              }}>What You'll Do</h2>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}>
                {career.responsibilities.map((item, i) => (
                  <li key={i} style={{
                    display: 'flex',
                    gap: '0.75rem',
                    color: 'var(--text-secondary)',
                    fontSize: '0.95rem',
                    lineHeight: 1.6
                  }}>
                    <span style={{ color: 'var(--accent-emerald)' }}>→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {career.requirements && career.requirements.length > 0 && (
            <section>
              <h2 style={{
                fontSize: '1.25rem',
                fontWeight: 600,
                marginBottom: '1rem',
                color: 'var(--text-primary)'
              }}>Requirements</h2>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}>
                {career.requirements.map((item, i) => (
                  <li key={i} style={{
                    display: 'flex',
                    gap: '0.75rem',
                    color: 'var(--text-secondary)',
                    fontSize: '0.95rem',
                    lineHeight: 1.6
                  }}>
                    <span style={{ color: 'var(--accent-cyan)' }}>•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {career.niceToHave && career.niceToHave.length > 0 && (
            <section>
              <h2 style={{
                fontSize: '1.25rem',
                fontWeight: 600,
                marginBottom: '1rem',
                color: 'var(--text-primary)'
              }}>Nice to Have</h2>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}>
                {career.niceToHave.map((item, i) => (
                  <li key={i} style={{
                    display: 'flex',
                    gap: '0.75rem',
                    color: 'var(--text-secondary)',
                    fontSize: '0.95rem',
                    lineHeight: 1.6
                  }}>
                    <span style={{ color: 'var(--accent-violet)' }}>✦</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {career.benefits && career.benefits.length > 0 && (
            <section>
              <h2 style={{
                fontSize: '1.25rem',
                fontWeight: 600,
                marginBottom: '1rem',
                color: 'var(--text-primary)'
              }}>Benefits & Perks</h2>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}>
                {career.benefits.map((item, i) => (
                  <li key={i} style={{
                    display: 'flex',
                    gap: '0.75rem',
                    color: 'var(--text-secondary)',
                    fontSize: '0.95rem',
                    lineHeight: 1.6
                  }}>
                    <span>🎁</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Apply Section */}
        <div style={{
          marginTop: '3rem',
          padding: '2rem',
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: 600,
            marginBottom: '0.5rem'
          }}>Interested in this role?</h3>
          <p style={{
            color: 'var(--text-secondary)',
            marginBottom: '1.5rem',
            fontSize: '0.95rem'
          }}>
            We'd love to hear from you. Send us your resume and a brief introduction.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {career.applyEmail && (
              <a 
                href={`mailto:${career.applyEmail}?subject=Application: ${career.title}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.85rem 1.5rem',
                  background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                Apply via Email
              </a>
            )}
            {career.applyUrl && (
              <a 
                href={career.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.85rem 1.5rem',
                  background: 'transparent',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                Apply on External Site
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
