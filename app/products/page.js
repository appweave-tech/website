import Link from 'next/link'
import Image from 'next/image'
import { client, productsQuery, urlFor } from '@/lib/sanity'

async function getProducts() {
  try {
    const products = await client.fetch(productsQuery)
    return products
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

const statusStyles = {
  'live': { bg: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-emerald)', label: 'Live' },
  'beta': { bg: 'rgba(251, 191, 36, 0.1)', color: '#fbbf24', label: 'Beta' },
  'coming-soon': { bg: 'rgba(6, 182, 212, 0.1)', color: 'var(--accent-cyan)', label: 'Coming Soon' },
  'deprecated': { bg: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', label: 'Deprecated' },
}

const platformIcons = {
  'web': '🌐',
  'ios': '📱',
  'android': '🤖',
  'telegram': '✈️',
  'whatsapp': '💬',
  'api': '⚡',
  'chrome': '🔌',
  'desktop': '💻',
}

export const metadata = {
  title: 'Products | AppWeave Labs',
  description: 'SaaS products built by AppWeave Labs - from blockchain certificates to invoice parsing and e-commerce scraping.',
}

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <main style={{ paddingTop: '6rem', paddingBottom: '4rem' }}>
      <div className="section-container" style={{ padding: '0 2rem' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="section-label mono">Our Products</div>
          <h1 style={{
            fontSize: 'clamp(2.25rem, 5vw, 3.25rem)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            marginBottom: '1rem'
          }}>
            Built by <span style={{
              background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>AppWeave</span>
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: 'var(--text-secondary)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.7
          }}>
            We don't just build for clients — we build our own products too. 
            Here's what we've shipped.
          </p>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
            gap: '1.5rem'
          }}>
            {products.map((product) => {
              const status = statusStyles[product.status] || statusStyles['live']
              
              return (
                <Link 
                  href={`/products/${product.slug?.current}`} 
                  key={product._id}
                  style={{
                    display: 'block',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {/* Hero Image */}
                  {product.heroImage ? (
                    <div style={{
                      position: 'relative',
                      width: '100%',
                      height: '200px',
                      background: 'var(--bg-secondary)'
                    }}>
                      <Image
                        src={urlFor(product.heroImage).width(800).height(400).url()}
                        alt={product.name}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  ) : (
                    <div style={{
                      width: '100%',
                      height: '200px',
                      background: 'linear-gradient(135deg, var(--bg-secondary), var(--bg-card))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {product.icon ? (
                        <Image
                          src={urlFor(product.icon).width(128).height(128).url()}
                          alt={product.name}
                          width={64}
                          height={64}
                          style={{ borderRadius: '12px' }}
                        />
                      ) : (
                        <div style={{
                          width: '64px',
                          height: '64px',
                          borderRadius: '12px',
                          background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.5rem',
                          fontWeight: 700,
                          color: '#fff'
                        }}>
                          {product.name?.charAt(0) || 'P'}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Content */}
                  <div style={{ padding: '1.5rem' }}>
                    {/* Status & Category */}
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                      <span style={{
                        fontSize: '0.7rem',
                        padding: '0.25rem 0.6rem',
                        background: status.bg,
                        color: status.color,
                        borderRadius: '100px',
                        fontWeight: 500
                      }}>{status.label}</span>
                      {product.category && (
                        <span style={{
                          fontSize: '0.7rem',
                          padding: '0.25rem 0.6rem',
                          background: 'var(--bg-secondary)',
                          color: 'var(--text-muted)',
                          borderRadius: '100px',
                          textTransform: 'uppercase'
                        }}>{product.category}</span>
                      )}
                    </div>

                    {/* Name & Tagline */}
                    <h2 style={{
                      fontSize: '1.35rem',
                      fontWeight: 600,
                      marginBottom: '0.5rem'
                    }}>{product.name}</h2>
                    
                    {product.tagline && (
                      <p style={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.9rem',
                        lineHeight: 1.6,
                        marginBottom: '1rem'
                      }}>{product.tagline}</p>
                    )}

                    {/* Platforms */}
                    {product.platforms && product.platforms.length > 0 && (
                      <div style={{
                        display: 'flex',
                        gap: '0.5rem',
                        flexWrap: 'wrap',
                        marginBottom: '1rem'
                      }}>
                        {product.platforms.map((platform, i) => (
                          <span key={i} style={{
                            fontSize: '0.75rem',
                            padding: '0.3rem 0.6rem',
                            background: 'var(--bg-secondary)',
                            border: '1px solid var(--border)',
                            borderRadius: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.3rem'
                          }}>
                            {platformIcons[platform] || '📦'} {platform}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Pricing */}
                    {product.pricing?.model && (
                      <div style={{
                        fontSize: '0.85rem',
                        color: 'var(--accent-cyan)',
                        fontWeight: 500
                      }}>
                        {product.pricing.model}
                        {product.pricing.startingPrice && ` • ${product.pricing.startingPrice}`}
                      </div>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            background: 'var(--bg-card)',
            borderRadius: '12px',
            border: '1px solid var(--border)'
          }}>
            <p style={{ color: 'var(--text-muted)' }}>Products coming soon!</p>
          </div>
        )}
      </div>
    </main>
  )
}
