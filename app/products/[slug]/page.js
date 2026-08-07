import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { client, productQuery, productSlugsQuery, urlFor } from '@/lib/sanity'
import { PageTransition } from '../../page-transition'
import { ViewTransition } from 'react'

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
    return { title: 'Product Not Found', robots: { index: false, follow: true } }
  }

  const ogImage = product.heroImage ? urlFor(product.heroImage).width(1200).height(630).url() : undefined

  /* undefined rather than '': an empty meta description is read as a deliberate
     blank, whereas omitting the tag lets Google build a snippet from the body. */
  const description = product.tagline || product.description || undefined

  return {
    title: product.name,
    description,
    openGraph: {
      title: product.name,
      description,
      url: `${baseUrl}/products/${slug}`,
      type: 'website',
      ...(ogImage && { images: [{ url: ogImage, width: 1200, height: 630, alt: product.name }] }),
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description,
      ...(ogImage && { images: [ogImage] }),
    },
    alternates: {
      canonical: `${baseUrl}/products/${slug}`,
    },
  }
}

const statusMeta = {
  'live': { modifier: 'badge--live', label: 'Live' },
  'beta': { modifier: 'badge--beta', label: 'Beta' },
  'coming-soon': { modifier: 'badge--soon', label: 'Coming soon' },
  'deprecated': { modifier: 'badge--idle', label: 'Deprecated' },
}

const platformLabels = {
  'web': 'Web app',
  'ios': 'iOS',
  'android': 'Android',
  'telegram': 'Telegram',
  'whatsapp': 'WhatsApp',
  'api': 'API',
  'chrome': 'Chrome extension',
  'desktop': 'Desktop',
}

/* Single custom set, uniform 1.75 stroke — no emoji, no stock metaphors */
const featurePaths = {
  'shield': ['M12 3v18', 'M5 7.5 12 3l7 4.5v6L12 21l-7-7.5v-6Z'],
  'zap': ['M13 2 5 13h6l-1 9 8-11h-6l1-9Z'],
  'globe': ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M3.5 9h17M3.5 15h17', 'M12 3c-2.5 2.4-2.5 15.6 0 18 2.5-2.4 2.5-15.6 0-18Z'],
  'lock': ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z', 'M12 12.5V17'],
  'chart': ['M4 20h16', 'M7 20v-6M12 20V6M17 20v-9'],
  'clock': ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M12 7.5V12l3.5 2'],
  'code': ['M9 8 5 12l4 4', 'M15 8l4 4-4 4', 'M13 6l-2 12'],
  'cloud': ['M7 19a4 4 0 0 1-.5-7.97A5.5 5.5 0 0 1 17.4 10 3.5 3.5 0 0 1 17 19H7Z'],
  'database': ['M12 8c4.4 0 8-1.12 8-2.5S16.4 3 12 3 4 4.12 4 5.5 7.6 8 12 8Z', 'M20 5.5v13c0 1.38-3.6 2.5-8 2.5s-8-1.12-8-2.5v-13', 'M20 12c0 1.38-3.6 2.5-8 2.5S4 13.38 4 12'],
  'ai': ['M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z', 'M18.5 15.5l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2Z'],
  'check': ['M5 12.5 10 17.5 19 7.5'],
  'star': ['M12 3.5l2.6 5.6 6 .8-4.4 4.2 1.1 6-5.3-3-5.3 3 1.1-6L3.4 9.9l6-.8L12 3.5Z'],
}

function FeatureIcon({ name }) {
  const paths = featurePaths[name] || featurePaths['star']
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths.map((d, i) => <path key={i} d={d} />)}
    </svg>
  )
}

export default async function ProductPage({ params }) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    notFound()
  }

  const status = statusMeta[product.status] || statusMeta['live']

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

  const storeLinks = [
    { href: product.links?.telegram, label: 'Open in Telegram' },
    { href: product.links?.whatsapp, label: 'Open in WhatsApp' },
    { href: product.links?.appStore, label: 'Download on the App Store' },
    { href: product.links?.playStore, label: 'Get it on Google Play' },
  ].filter((link) => link.href)

  return (
    <PageTransition>
  <main id="main" className="detail-page">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema).replace(/</g, '\\u003c') }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c') }} />
        <div className="detail-container">
          <Link href="/products" className="back-link" transitionTypes={['nav-back']}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 12H5M11 6l-6 6 6 6" />
            </svg>
            All products
          </Link>

          <header className="detail-header">
            <div className="detail-id">
              {product.icon ? (
                <Image
                  src={urlFor(product.icon).width(144).height(144).url()}
                  alt=""
                  width={72}
                  height={72}
                  className="detail-mark"
                />
              ) : (
                <span className="detail-mark detail-mark--fallback" aria-hidden="true">
                  {product.name?.charAt(0) || 'P'}
                </span>
              )}

              <div className="detail-id-text">
                <div className="product-tags">
                  <span className={`badge ${status.modifier}`}>
                    <span className="badge-dot" aria-hidden="true" />
                    {status.label}
                  </span>
                  {product.category && <span className="badge">{product.category}</span>}
                </div>
                <h1 className="detail-title">{product.name}</h1>
                {product.tagline && <p className="detail-tagline">{product.tagline}</p>}

                {/* Inside the text column so the CTAs align with the title, not the icon */}
                {(product.links?.website || product.links?.demo || product.links?.docs || product.links?.github) && (
                  <div className="detail-actions">
                    {product.links.website && (
                      <a href={product.links.website} target="_blank" rel="noopener noreferrer" className="btn btn-accent">
                        Visit website
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </a>
                    )}
                    {product.links.demo && (
                      <a href={product.links.demo} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                        Try the demo
                      </a>
                    )}
                    {product.links.docs && (
                      <a href={product.links.docs} target="_blank" rel="noopener noreferrer" className="link-inline">
                        Documentation
                      </a>
                    )}
                    {product.links.github && (
                      <a href={product.links.github} target="_blank" rel="noopener noreferrer" className="link-inline">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        Source
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </header>

          {product.heroImage && (
            <div className="detail-hero">
              <ViewTransition name={`product-hero-${slug}`} share="morph" default="none">
                <Image
                  src={urlFor(product.heroImage).width(1200).height(600).url()}
                  alt={`${product.name} interface`}
                  width={1200}
                  height={600}
                  priority
                />
              </ViewTransition>
            </div>
          )}

          {product.description && (
            <section className="detail-section">
              <p className="detail-lede">{product.description}</p>
            </section>
          )}

          {product.platforms?.length > 0 && (
            <section className="detail-section">
              <h2 className="detail-heading">Available on</h2>
              <ul className="chip-row">
                {product.platforms.map((platform, i) => (
                  <li key={i} className="chip">{platformLabels[platform] || platform}</li>
                ))}
              </ul>
            </section>
          )}

          {product.features?.length > 0 && (
            <section className="detail-section">
              <h2 className="detail-heading">Key features</h2>
              <div className="feature-grid">
                {product.features.map((feature, i) => (
                  <article key={i} className="feature-card">
                    <span className="feature-icon">
                      <FeatureIcon name={feature.icon} />
                    </span>
                    <h3 className="feature-title">{feature.title}</h3>
                    {feature.description && (
                      <p className="feature-body">{feature.description}</p>
                    )}
                  </article>
                ))}
              </div>
            </section>
          )}

          {product.useCases?.length > 0 && (
            <section className="detail-section">
              <h2 className="detail-heading">Who it's for</h2>
              <ul className="chip-row">
                {product.useCases.map((useCase, i) => (
                  <li key={i} className="chip chip--accent">{useCase}</li>
                ))}
              </ul>
            </section>
          )}

          {product.techStack?.length > 0 && (
            <section className="detail-section">
              <h2 className="detail-heading">Built with</h2>
              <ul className="chip-row">
                {product.techStack.map((tech, i) => (
                  <li key={i} className="chip chip--mono">{tech}</li>
                ))}
              </ul>
            </section>
          )}

          {product.screenshots?.length > 0 && (
            <section className="detail-section">
              <h2 className="detail-heading">Screenshots</h2>
              <div className="shot-grid">
                {product.screenshots.map((screenshot, i) => (
                  <figure key={i} className="shot">
                    <Image
                      src={urlFor(screenshot).width(600).height(400).url()}
                      alt={screenshot.caption || `${product.name} screenshot ${i + 1}`}
                      width={600}
                      height={400}
                    />
                    {screenshot.caption && (
                      <figcaption>{screenshot.caption}</figcaption>
                    )}
                  </figure>
                ))}
              </div>
            </section>
          )}

          {product.pricing?.model && (
            <section className="detail-section">
              <h2 className="detail-heading">Pricing</h2>
              <div className="price-card">
                <p className="price-model">{product.pricing.model}</p>
                {product.pricing.startingPrice && (
                  <p className="price-from mono">{product.pricing.startingPrice}</p>
                )}
              </div>
            </section>
          )}

          {storeLinks.length > 0 && (
            <section className="detail-cta">
              <h2 className="detail-heading">Get started</h2>
              <div className="detail-actions">
                {storeLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-cta"
                  >
                    {link.label}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </a>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </PageTransition>
  )
}
