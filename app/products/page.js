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
  const products = await getProducts()

  return (
    <main id="main" className="section page-offset">
      <div className="section-container">
        <header className="section-header">
          <p className="section-label mono">Our products</p>
          <h1 className="section-title">Things we built for ourselves</h1>
          <p className="section-lede">
            We don't only build for clients. These are the products we run, maintain, and
            depend on ourselves.
          </p>
        </header>

        {products.length > 0 ? (
          <div className="product-grid">
            {products.map((product) => {
              const status = statusMeta[product.status] || statusMeta['live']

              return (
                <Link
                  href={`/products/${product.slug?.current}`}
                  key={product._id}
                  className="product-card"
                >
                  <div className="product-media">
                    {product.heroImage ? (
                      <Image
                        src={urlFor(product.heroImage).width(800).height(450).url()}
                        alt={`${product.name} interface`}
                        width={800}
                        height={450}
                        className="product-media-img"
                      />
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
            <h3>Nothing published here yet</h3>
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
  )
}
