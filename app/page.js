import Link from 'next/link'
import Image from 'next/image'
import { client, clientsQuery, servicesQuery, urlFor } from '@/lib/sanity'

async function getClients() {
  try {
    const clients = await client.fetch(clientsQuery)
    return clients
  } catch (error) {
    console.error('Error fetching clients:', error)
    return []
  }
}

async function getServices() {
  try {
    const services = await client.fetch(servicesQuery)
    return services
  } catch (error) {
    console.error('Error fetching services:', error)
    return []
  }
}

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

export default async function HomePage() {
  const [clients, services] = await Promise.all([getClients(), getServices()])

  return (
    <main id="main">
      {/* Hero */}
      <section className="hero">
        <div className="hero-inner">
          <p className="hero-eyebrow mono">
            <span className="hero-eyebrow-dot" aria-hidden="true" />
            Available for new projects
          </p>
          <h1 className="hero-title">
            Weaving <em>innovation</em> into apps
          </h1>
          <p className="hero-sub">
            Boutique full-stack development studio. We design, build, and ship AI applications,
            mobile apps, and data platforms, from MVP to production.
          </p>
          <div className="hero-actions">
            <Link href="/contact" className="btn btn-primary">
              Start a project
              <ArrowRight />
            </Link>
            <Link href="/clients" className="link-inline">
              See our work
              <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      {services.length > 0 && (
        <section id="services" className="section">
          <div className="section-container">
            <div className="section-header">
              <h2 className="section-title">End-to-end technology services</h2>
            </div>
            <div className="services-grid">
              {services.map((service) => (
                <article key={service._id} className="svc-card">
                  {(service.icon?.asset || service.iconEmoji) && (
                    <div className="svc-icon">
                      {service.icon?.asset ? (
                        <Image
                          src={urlFor(service.icon).width(84).height(84).url()}
                          alt=""
                          width={42}
                          height={42}
                        />
                      ) : (
                        <span aria-hidden="true">{service.iconEmoji}</span>
                      )}
                    </div>
                  )}
                  <h3 className="card-title">{service.title}</h3>
                  <p className="card-body">{service.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Clients */}
      {clients.length > 0 && (
        <section id="clients" className="section section--tint">
          <div className="section-container">
            <div className="section-header">
              <h2 className="section-title">Building products for ambitious teams</h2>
            </div>

            <div className="client-grid">
              {clients.map((clientItem) => (
                <article key={clientItem._id} className="client-card">
                  <div className="client-head">
                    <div className="client-id">
                      {clientItem.logo ? (
                        /* fit('max') keeps wordmark logos from being square-cropped */
                        <Image
                          src={urlFor(clientItem.logo).height(80).fit('max').url()}
                          alt={`${clientItem.name} logo`}
                          width={160}
                          height={80}
                          className="client-logo"
                        />
                      ) : (
                        <div className="avatar-mark avatar-fallback" aria-hidden="true">
                          {clientItem.name?.charAt(0) || 'C'}
                        </div>
                      )}
                      <div>
                        <h3 className="client-name">{clientItem.name}</h3>
                        {clientItem.industry && (
                          <span className="client-industry">{clientItem.industry}</span>
                        )}
                      </div>
                    </div>
                    {clientItem.stockTicker && (
                      <span className="badge badge--ticker">{clientItem.stockTicker}</span>
                    )}
                  </div>
                  {clientItem.description && (
                    <p className="client-body">{clientItem.description}</p>
                  )}
                  {clientItem.websiteUrl && (
                    <a
                      href={clientItem.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-inline"
                    >
                      Visit website
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact */}
      <section id="contact" className="section section--tint">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Have a project in mind?</h2>
            <p className="section-lede">
              Whether you're building something new or need help scaling what you have, we'd
              like to hear about it. We reply within one business day.
            </p>
          </div>
          <div className="hero-actions">
            <Link href="/contact" className="btn btn-accent">
              Start a project
              <ArrowRight />
            </Link>
            <a href="mailto:contact@appweave.tech" className="link-inline">
              contact@appweave.tech
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
