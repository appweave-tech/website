import Link from 'next/link'
import Image from 'next/image'
import {
  client,
  clientsQuery,
  servicesQuery,
  testimonialsQuery,
  urlFor,
} from '@/lib/sanity'
import { PageTransition } from './page-transition'

/* Each fetch reports failure separately so a single outage degrades one section
   rather than emptying the page. */
async function fetchOrEmpty(query, label) {
  try {
    return await client.fetch(query)
  } catch (error) {
    console.error(`Error fetching ${label}:`, error)
    return []
  }
}

/* Bento spans, in render order, chosen so four services plus the closing strip
   tile 4 columns x 3 rows with no empty cell:
     lead 2x2 + accent 2x1 + tall 1x2 + tall 1x2 + strip 2x1 = 12 of 12.
   With fewer than four services the strip is withheld and the cards fall back to
   single cells, which dense flow packs without holes. */
const BENTO_SPANS = ['bento-card--lead', 'bento-card--accent bento-card--wide', 'bento-card--tall', 'bento-card--tall']

/* Capabilities shown inside each service tile, keyed by the CMS service title.
   Authored copy, like VALUES. A service with no entry renders without a
   list rather than breaking the tile, so renaming one in Sanity degrades quietly.
   `chips` renders as pills (lead tile), `items` as a ruled list (tall tiles). */
const SERVICE_CAPABILITIES = {
  'Full-Stack Development': {
    chips: ['React', 'Next.js', 'React Native', 'SaaS platforms', 'Marketplaces'],
  },
  'Data & Analytics': {
    items: ['ETL pipelines', 'Data warehousing', 'Predictive modeling', 'Visualization dashboards'],
    note: 'From infrastructure to insight.',
  },
  'Fractional CTO': {
    items: ['Architecture review', 'Team scaling', 'Vendor selection', 'Technical due diligence'],
    note: 'Senior judgement, without the full-time hire.',
  },
}

/* The three brand values, taken verbatim from the value posters. The posters
   each sit on their own saturated ground (orange, blue, green) with the value
   set vertically in yellow; that palette belongs to print, where each board is
   seen alone. Dropping three competing hues into a warm-stone page with one
   crimson accent would read as three foreign panels. What carries over is the
   poster's actual device: the oversized outlined letterform behind a short
   statement, rendered here in the page's own neutrals. */
const VALUES = [
  {
    name: 'Integrity',
    body: 'We do what is right, not what is easy.',
  },
  {
    name: 'Ownership',
    body: 'We work like it is our own product.',
  },
  {
    name: 'Growth',
    body: 'We learn, experiment, and evolve.',
  },
]

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

function ServiceCard({ service, index }) {
  const span = BENTO_SPANS[index] || ''
  const isLead = index === 0
  const { chips, items, note } = SERVICE_CAPABILITIES[service.title] || {}

  return (
    <article className={`bento-card ${span}`}>
      {isLead && <p className="bento-eyebrow">Most requested</p>}
      <div className={isLead ? 'bento-push' : ''}>
        <h3 className="bento-title">{service.title}</h3>
        {!items && <p className="bento-body">{service.description}</p>}

        {chips && (
          <ul className="bento-chips">
            {chips.map((chip) => (
              <li key={chip} className="chip">{chip}</li>
            ))}
          </ul>
        )}

        {items && (
          <ul className="bento-list">
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
      </div>
      {note && <p className="bento-note">{note}</p>}
    </article>
  )
}

/* Reserved slices keep the accordion at four across, matching the layout the
   section was designed for, without attributing invented words to anyone. */
const RESERVED_VOICES = [
  { _id: 'reserved-3', clientName: 'Third client', quote: 'Reserved for a third client quote.', reserved: true },
]

/* The closing slice is an invitation, not a quote, so it carries no pending
   state: nothing here is waiting on the CMS. It is the row's one accent surface,
   the same role .bento-card--accent plays in the services grid. */
const NEXT_VOICE = {
  _id: 'voice-next',
  quote: 'Three real quotes will carry this page further than any effect on it.',
  next: true,
}

/* Until quotes are entered in Sanity the section still renders, built from the
   clients we do have and marked pending, so the slot is visibly awaiting real
   words rather than silently missing. */
function pendingVoices(clients) {
  const fromClients = clients.slice(0, 2).map((c) => ({
    _id: c._id,
    clientName: c.name,
    clientLogo: c.logo,
    quote: `Quote pending. Replace with a real sentence from ${c.name}.`,
    authorName: 'Name and role pending',
    pending: true,
  }))

  return [...fromClients, ...RESERVED_VOICES.map((v) => ({ ...v, pending: true }))]
}

function Voice({ testimonial, isOpen }) {
  const isNext = testimonial.next

  return (
    /* tabIndex makes each slice reachable: the panel expands on hover, so
       without it a keyboard user only ever sees the one slice that rests open
       and the rest of the quotes are unreadable. Not a button, because
       focusing a quote reveals it rather than performing an action. */
    <figure
      tabIndex={0}
      className={`voice ${isOpen ? 'voice--open' : ''} ${testimonial.pending ? 'voice--pending' : ''} ${isNext ? 'voice--next' : ''}`}
    >
      <div className="voice-inner">
        {isNext ? (
          <p className="bento-eyebrow">Next</p>
        ) : testimonial.clientLogo ? (
          <Image
            src={urlFor(testimonial.clientLogo).height(60).fit('max').url()}
            alt={testimonial.clientName || ''}
            width={120}
            height={26}
            className="voice-logo"
          />
        ) : (
          <p className="bento-eyebrow">{testimonial.reserved ? 'Slot open' : testimonial.clientName}</p>
        )}
        <blockquote className="voice-quote">{testimonial.quote}</blockquote>
        <figcaption className="voice-cite">
          {isNext ? (
            /* Weight, not colour: the slice is already the accent fill, so a
               coloured word would have to fight its own background. */
            <span className="voice-name"><strong>Your team</strong> next</span>
          ) : (
            <>
              <span className="voice-name">{testimonial.clientName}</span>
              <span className="voice-role">
                {testimonial.pending
                  ? testimonial.authorName || 'Awaiting permission to quote'
                  : [testimonial.authorName, testimonial.authorRole].filter(Boolean).join(', ')}
              </span>
            </>
          )}
        </figcaption>
      </div>
    </figure>
  )
}

export default async function HomePage() {
  const [clients, services, testimonials] = await Promise.all([
    fetchOrEmpty(clientsQuery, 'clients'),
    fetchOrEmpty(servicesQuery, 'services'),
    fetchOrEmpty(testimonialsQuery, 'testimonials'),
  ])

  const bentoTiles = services.slice(0, BENTO_SPANS.length)
  const showClosingStrip = bentoTiles.length === BENTO_SPANS.length
  /* The invitation closes the row whether the quotes are real or still pending. */
  const voices = [
    ...(testimonials.length > 0 ? testimonials : pendingVoices(clients)),
    NEXT_VOICE,
  ]
  // The second slice sits open at rest so the accordion reads without a pointer.
  const openVoiceIndex = voices.length > 1 ? 1 : 0

  return (
    <PageTransition>
  <main id="main">
        {/* Hero */}
        <section className="hero">
          <div className="hero-inner">
            {/* One span per word so the headline can land word by word. The spaces
                between them are real text nodes, so the line still reads as one
                sentence to a screen reader and still wraps normally. */}
            <h1 className="hero-title">
              <span className="hero-word">Weaving</span>{' '}
              <em className="hero-word">innovation</em>{' '}
              <span className="hero-word">into</span>{' '}
              <span className="hero-word">apps</span>
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
              <Link href="/clients" className="btn btn-secondary">
                See our work
                <ArrowRight />
              </Link>
            </div>
          </div>
        </section>

        {/* Services */}
        {bentoTiles.length > 0 && (
          <section id="services" className="section" suppressHydrationWarning>
            <div className="section-container">
              <div className="section-header">
                <h2 className="section-title">Four ways we <span className="mark">ship</span> with you</h2>
              </div>

              <div className="bento" suppressHydrationWarning>
                {bentoTiles.map((service, index) => (
                  <ServiceCard key={service._id} service={service} index={index} />
                ))}

                {showClosingStrip && (
                  <article className="bento-card bento-card--strip">
                    <p className="bento-body">
                      Not sure which of these you need? Tell us what you are building.
                    </p>
                    <Link href="/contact" className="btn btn-secondary">
                      Start a project
                      <ArrowRight />
                    </Link>
                  </article>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Clients */}
        {clients.length > 0 && (
          <section id="clients" className="section section--tint" suppressHydrationWarning>
            <div className="section-container">
              <div className="section-header">
                <h2 className="section-title">Building for <span className="mark">ambitious</span> teams</h2>
              </div>

              <div className="client-grid" suppressHydrationWarning>
                {clients.map((clientItem) => (
                  <article key={clientItem._id} className="client-card">
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

                    <div className="client-body-group">
                      <div className="client-meta">
                        <h3 className="client-name">{clientItem.name}</h3>
                        {clientItem.industry && (
                          <span className="client-industry">{clientItem.industry}</span>
                        )}
                        {clientItem.stockTicker && (
                          <span className="badge badge--ticker">{clientItem.stockTicker}</span>
                        )}
                      </div>
                      {clientItem.description && (
                        <p className="client-body">{clientItem.description}</p>
                      )}
                    </div>

                    {clientItem.websiteUrl && (
                      <a
                        href={clientItem.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-inline client-link"
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

        {/* Process */}
        <section id="process" className="section" suppressHydrationWarning>
          <div className="section-container">
            <div className="process-grid">
              <div className="section-header">
                <h2 className="section-title">A studio sized to stay <span className="mark">accountable</span></h2>
                <p className="section-lede">
                  The people who scope your build are the people who write it. We reply within one
                  business day.
                </p>
              </div>

              {/* Keeps the .process-steps / .process-step class pair so the scroll
                  reveal, the per-card scroll-driven enter and the sticky heading
                  all keep working; only the contents of each card changed. */}
              <div className="process-steps" suppressHydrationWarning>
                {VALUES.map((value) => (
                  <article key={value.name} className="process-step value-card">
                    <span className="value-ghost" aria-hidden="true">{value.name}</span>
                    <h3 className="value-name">{value.name}</h3>
                    <p className="value-body">{value.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials. Falls back to pending slices built from real clients, so
            the section holds its place without inventing quotes. */}
        {voices.length > 0 && (
          <section id="voices" className="section section--tint" suppressHydrationWarning>
            <div className="section-container">
              <div className="section-header">
                <h2 className="section-title">In our clients&rsquo; own <span className="mark">words</span></h2>
              </div>

              <div className="voices" suppressHydrationWarning>
                {voices.map((testimonial, index) => (
                  <Voice
                    key={testimonial._id}
                    testimonial={testimonial}
                    isOpen={index === openVoiceIndex}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Contact */}
        {/* Untinted on purpose: the voices section above is tinted, and two tinted
            sections in a row erase the boundary between them. Returning to the page
            ground also lets the closing display title read as a settle. */}
        <section id="contact" className="section" suppressHydrationWarning>
          <div className="section-container">
            <div className="section-header">
              <h2 className="section-title section-title--display">Have a <span className="mark">project</span> in mind?</h2>
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
                <ArrowRight />
              </a>
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  )
}
