import Link from 'next/link'
import Image from 'next/image'
import { client, productsQuery, urlFor } from '@/lib/sanity'
import { PageTransition } from '../page-transition'
import { ViewTransition } from 'react'

async function getProducts() {
  try {
    const items = await client.fetch(productsQuery)
    return { items, failed: false }
  } catch (error) {
    console.error('Error fetching products:', error)
    // Distinguish an outage from an empty list: the empty state makes a factual
    // claim ('nothing published') that would be false if the CMS is unreachable.
    return { items: [], failed: true }
  }
}

const statusMeta = {
  'live': { modifier: 'badge--live', label: 'Live' },
  'beta': { modifier: 'badge--beta', label: 'Beta' },
  'coming-soon': { modifier: 'badge--soon', label: 'Coming soon' },
  'deprecated': { modifier: 'badge--idle', label: 'Deprecated' },
}

const platformLabels = {
  'web': 'Web',
  'ios': 'iOS',
  'android': 'Android',
  'telegram': 'Telegram',
  'whatsapp': 'WhatsApp',
  'api': 'API',
  'chrome': 'Chrome',
  'desktop': 'Desktop',
}

export const metadata = {
  title: 'Products | AppWeave Labs',
  description: 'SaaS products built by AppWeave Labs - from blockchain certificates to invoice parsing and e-commerce scraping.',
}

export default async function ProductsPage() {
  const { items: products, failed } = await getProducts()

  return (
    <PageTransition>
  <main id="main" className="section page-offset">
        <div className="section-container">
          <header className="section-header">
            <h1 className="section-title">
              Things we built for <span className="mark">ourselves</span>
            </h1>
            <p className="section-lede">
              We don't only build for clients. These are the products we run, maintain, and
              depend on ourselves.
            </p>
          </header>

          {failed ? (
            <div className="empty-state empty-state--error" role="alert">
              <h2>We couldn&apos;t load our products</h2>
              <p>
                Something went wrong on our side, so this list may be incomplete. Try again in
                a moment, or get in touch and we&apos;ll walk you through what we run.
              </p>
              <Link href="/contact" className="btn btn-secondary">
                Start a project
              </Link>
            </div>
          ) : products.length > 0 ? (
            <div className="product-grid">
              {products.map((product, index) => {
                const status = statusMeta[product.status] || statusMeta['live']
                // The first card is above the fold and is this page's LCP element.
                // next/image lazy-loads by default, which defers its discovery.
                const isLead = index === 0

                return (
                  <Link
                    href={`/products/${product.slug?.current}`}
                    key={product._id}
                    className="product-card"
                    transitionTypes={['nav-forward']}
                  >
                    <div className="product-media">
                      {product.heroImage ? (
                        /* Pairs with the detail page hero of the same name, so the
                           card image grows into it instead of the pages swapping. */
                        <ViewTransition name={`product-hero-${product.slug?.current}`} share="morph" default="none">
                          <Image
                            src={urlFor(product.heroImage).width(800).height(450).url()}
                            alt={`${product.name} interface`}
                            width={800}
                            height={450}
                            className="product-media-img"
                            priority={isLead}
                          />
                        </ViewTransition>
                      ) : product.icon ? (
                        <Image
                          src={urlFor(product.icon).width(128).height(128).url()}
                          alt=""
                          width={64}
                          height={64}
                          className="product-media-icon"
                        />
                      ) : (
                        <span className="product-media-mark" aria-hidden="true">
                          {product.name?.charAt(0) || 'P'}
                        </span>
                      )}
                    </div>

                    <div className="product-body">
                      <div className="product-tags">
                        <span className={`badge ${status.modifier}`}>
                          <span className="badge-dot" aria-hidden="true" />
                          {status.label}
                        </span>
                        {product.category && (
                          <span className="badge">{product.category}</span>
                        )}
                      </div>

                      <h2 className="product-name">{product.name}</h2>
                      {product.tagline && <p className="card-body">{product.tagline}</p>}

                      {product.platforms?.length > 0 && (
                        <p className="product-platforms mono">
                          {product.platforms
                            .map((p) => platformLabels[p] || p)
                            .join(', ')}
                        </p>
                      )}

                      {product.pricing?.model && (
                        <p className="product-pricing mono">
                          {product.pricing.model}
                          {product.pricing.startingPrice && ` · ${product.pricing.startingPrice}`}
                        </p>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="empty-state">
              <h2>Nothing published here yet</h2>
              <p>
                Our own products are still behind the curtain. Tell us what you need built and
                we'll start there instead.
              </p>
              <Link href="/contact" className="btn btn-secondary">
                Start a project
              </Link>
            </div>
          )}
        </div>
      </main>
    </PageTransition>
  )
}
