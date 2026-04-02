import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { client, productQuery, productSlugsQuery, urlFor } from '@/lib/sanity'

const baseUrl = 'https://appweave.tech'

async function getProduct(slug) {
  try {
    const product = await client.fetch(productQuery, { slug })
    return product
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch(productSlugsQuery)
    return slugs.map((item) => ({ slug: item.slug }))
  } catch (error) {
    return []
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const product = await getProduct(slug)
  
  if (!product) {
    return { title: 'Product Not Found | AppWeave Labs' }
  }

  const ogImage = product.heroImage ? urlFor(product.heroImage).width(1200).height(630).url() : undefined

  return {
    title: `${product.name} | AppWeave Labs`,
    description: product.tagline || product.description || '',
    openGraph: {
      title: product.name,
      description: product.tagline || product.description || '',
      url: `${baseUrl}/products/${slug}`,
      type: 'website',
      images: [{ url: ogImage, width: 1200, height: 630, alt: product.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.tagline || product.description || '',
      images: [ogImage],
    },
    alternates: {
      canonical: `${baseUrl}/products/${slug}`,
    },
  }
}

const statusStyles = {
  'live': { bg: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-emerald)', label: 'Live' },
  'beta': { bg: 'rgba(251, 191, 36, 0.1)', color: '#fbbf24', label: 'Beta' },
  'coming-soon': { bg: 'rgba(220, 38, 38, 0.1)', color: 'var(--accent-cyan)', label: 'Coming Soon' },
  'deprecated': { bg: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', label: 'Deprecated' },
}

const platformLabels = {
  'web': { icon: '🌐', label: 'Web App' },
  'ios': { icon: '📱', label: 'iOS' },
  'android': { icon: '🤖', label: 'Android' },
  'telegram': { icon: '✈️', label: 'Telegram' },
  'whatsapp': { icon: '💬', label: 'WhatsApp' },
  'api': { icon: '⚡', label: 'API' },
  'chrome': { icon: '🔌', label: 'Chrome Extension' },
  'desktop': { icon: '💻', label: 'Desktop' },
}

const featureIcons = {
  'shield': '🛡️',
  'zap': '⚡',
  'globe': '🌐',
  'lock': '🔒',
  'chart': '📊',
  'clock': '⏱️',
  'code': '💻',
  'cloud': '☁️',
  'database': '🗄️',
  'ai': '🤖',
  'check': '✅',
  'star': '⭐',
}

export default async function ProductPage({ params }) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    notFound()
  }

  const status = statusStyles[product.status] || statusStyles['live']

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": product.name,
    "description": product.tagline || product.description || '',
    "image": product.heroImage ? urlFor(product.heroImage).width(1200).height(630).url() : undefined,
    "applicationCategory": product.category || 'Software',
    "operatingSystem": product.platforms?.join(', '),
    "offers": product.pricing?.startingPrice ? {
      "@type": "Offer",
      "price": product.pricing.startingPrice,
      "priceCurrency": "INR",
    } : undefined,
    "author": {
      "@type": "Organization",
      "name": "AppWeave Labs",
      "url": baseUrl,
    },
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": baseUrl },
      { "@type": "ListItem", "position": 2, "name": "Products", "item": `${baseUrl}/products` },
      { "@type": "ListItem", "position": 3, "name": product.name, "item": `${baseUrl}/products/${slug}` },
    ],
  }

  return (
    <main style={{ paddingTop: '6rem', paddingBottom: '4rem' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 2rem' }}>
        {/* Back Link */}
        <Link href="/products" style={{
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
          All Products
        </Link>

        {/* Header */}
        <header style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            {/* Icon */}
            {product.icon ? (
              <Image
                src={urlFor(product.icon).width(128).height(128).url()}
                alt={product.name}
                width={72}
                height={72}
                style={{ borderRadius: '16px' }}
              />
            ) : (
              <div style={{
                width: '72px',
                height: '72px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                fontWeight: 700,
                color: '#fff'
              }}>
                {product.name?.charAt(0) || 'P'}
              </div>
            )}

            <div style={{ flex: 1 }}>
              {/* Status & Category */}
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                <span style={{
                  fontSize: '0.75rem',
                  padding: '0.3rem 0.7rem',
                  background: status.bg,
                  color: status.color,
                  borderRadius: '100px',
                  fontWeight: 500
                }}>{status.label}</span>
                {product.category && (
                  <span style={{
                    fontSize: '0.75rem',
                    padding: '0.3rem 0.7rem',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: '100px',
                    color: 'var(--text-secondary)',
                    textTransform: 'uppercase'
                  }}>{product.category}</span>
                )}
              </div>

              <h1 style={{
                fontSize: 'clamp(2rem, 5vw, 2.75rem)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                marginBottom: '0.5rem'
              }}>{product.name}</h1>

              {product.tagline && (
                <p style={{
                  fontSize: '1.15rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6
                }}>{product.tagline}</p>
              )}
            </div>
          </div>

          {/* CTA Buttons */}
          {product.links && (
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
              {product.links.website && (
                <a href={product.links.website} target="_blank" rel="noopener noreferrer" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.25rem',
                  background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  textDecoration: 'none'
                }}>
                  Visit Website →
                </a>
              )}
              {product.links.demo && (
                <a href={product.links.demo} target="_blank" rel="noopener noreferrer" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.25rem',
                  background: 'transparent',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  textDecoration: 'none'
                }}>
                  Try Demo
                </a>
              )}
              {product.links.docs && (
                <a href={product.links.docs} target="_blank" rel="noopener noreferrer" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.25rem',
                  background: 'transparent',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  textDecoration: 'none'
                }}>
                  Documentation
                </a>
              )}
              {product.links.github && (
                <a href={product.links.github} target="_blank" rel="noopener noreferrer" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.25rem',
                  background: 'transparent',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  textDecoration: 'none'
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
              )}
            </div>
          )}
        </header>

        {/* Hero Image */}
        {product.heroImage && (
          <div style={{
            marginBottom: '3rem',
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid var(--border)'
          }}>
            <Image
              src={urlFor(product.heroImage).width(1200).height(600).url()}
              alt={product.name}
              width={1200}
              height={600}
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        )}

        {/* Description */}
        {product.description && (
          <section style={{ marginBottom: '3rem' }}>
            <p style={{
              fontSize: '1.05rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.8
            }}>{product.description}</p>
          </section>
        )}

        {/* Platforms */}
        {product.platforms && product.platforms.length > 0 && (
          <section style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Available On</h2>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {product.platforms.map((platform, i) => {
                const p = platformLabels[platform] || { icon: '📦', label: platform }
                return (
                  <div key={i} style={{
                    padding: '0.75rem 1rem',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.9rem'
                  }}>
                    <span>{p.icon}</span>
                    <span>{p.label}</span>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* Features */}
        {product.features && product.features.length > 0 && (
          <section style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Key Features</h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: '1rem'
            }}>
              {product.features.map((feature, i) => (
                <div key={i} style={{
                  padding: '1.25rem',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: '10px'
                }}>
                  <div style={{
                    fontSize: '1.5rem',
                    marginBottom: '0.75rem'
                  }}>
                    {featureIcons[feature.icon] || '✨'}
                  </div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                    {feature.title}
                  </h3>
                  {feature.description && (
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      {feature.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Use Cases */}
        {product.useCases && product.useCases.length > 0 && (
          <section style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Who Is It For?</h2>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {product.useCases.map((useCase, i) => (
                <span key={i} style={{
                  padding: '0.5rem 1rem',
                  background: 'rgba(220, 38, 38, 0.1)',
                  border: '1px solid rgba(220, 38, 38, 0.2)',
                  borderRadius: '100px',
                  fontSize: '0.85rem',
                  color: 'var(--accent-cyan)'
                }}>
                  {useCase}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Tech Stack */}
        {product.techStack && product.techStack.length > 0 && (
          <section style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Built With</h2>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {product.techStack.map((tech, i) => (
                <span key={i} style={{
                  padding: '0.4rem 0.8rem',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  color: 'var(--text-secondary)',
                  fontFamily: 'var(--font-mono)'
                }}>
                  {tech}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Screenshots */}
        {product.screenshots && product.screenshots.length > 0 && (
          <section style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Screenshots</h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: '1rem'
            }}>
              {product.screenshots.map((screenshot, i) => (
                <div key={i} style={{
                  borderRadius: '10px',
                  overflow: 'hidden',
                  border: '1px solid var(--border)'
                }}>
                  <Image
                    src={urlFor(screenshot).width(600).height(400).url()}
                    alt={screenshot.caption || `Screenshot ${i + 1}`}
                    width={600}
                    height={400}
                    style={{ width: '100%', height: 'auto' }}
                  />
                  {screenshot.caption && (
                    <div style={{
                      padding: '0.75rem',
                      background: 'var(--bg-card)',
                      fontSize: '0.85rem',
                      color: 'var(--text-secondary)',
                      textAlign: 'center'
                    }}>
                      {screenshot.caption}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Pricing */}
        {product.pricing?.model && (
          <section style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Pricing</h2>
            <div style={{
              padding: '1.5rem',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              display: 'inline-block'
            }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                {product.pricing.model}
              </div>
              {product.pricing.startingPrice && (
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  {product.pricing.startingPrice}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Additional Links */}
        {product.links && (product.links.telegram || product.links.whatsapp || product.links.appStore || product.links.playStore) && (
          <section style={{
            padding: '2rem',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '12px'
          }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem' }}>Get Started</h3>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {product.links.telegram && (
                <a href={product.links.telegram} target="_blank" rel="noopener noreferrer" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.65rem 1rem',
                  background: '#0088cc',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  textDecoration: 'none'
                }}>
                  ✈️ Open in Telegram
                </a>
              )}
              {product.links.whatsapp && (
                <a href={product.links.whatsapp} target="_blank" rel="noopener noreferrer" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.65rem 1rem',
                  background: '#25D366',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  textDecoration: 'none'
                }}>
                  💬 Open in WhatsApp
                </a>
              )}
              {product.links.appStore && (
                <a href={product.links.appStore} target="_blank" rel="noopener noreferrer" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.65rem 1rem',
                  background: '#000',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  textDecoration: 'none'
                }}>
                  📱 App Store
                </a>
              )}
              {product.links.playStore && (
                <a href={product.links.playStore} target="_blank" rel="noopener noreferrer" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.65rem 1rem',
                  background: '#01875f',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  textDecoration: 'none'
                }}>
                  🤖 Play Store
                </a>
              )}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
