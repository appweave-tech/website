import Link from 'next/link'
import { PageTransition } from '../page-transition'
import { buildOpenGraph } from '@/lib/seo'

const DESCRIPTION =
  'AppWeave Labs is a boutique full-stack studio in Bengaluru, incorporated in 2024. Registered details, address, and what we work on.'

export const metadata = {
  title: 'About',
  description: DESCRIPTION,
  openGraph: buildOpenGraph({ title: 'About', description: DESCRIPTION, path: '/about' }),
}

/* Registered identifiers.

   CIN is the one on record in this repo. GSTIN is NOT: it appears nowhere in
   the codebase, so there is nothing here to render and inventing a tax number
   would be worse than omitting it. Fill in the value and the row appears; rows
   with no value are skipped, so a placeholder can never reach the page. */
const REGISTRATION = [
  { label: 'CIN', value: 'U62099KA2024PTC185497' },
  { label: 'GSTIN', value: null },
]

/* Kept as data so the address is written once and stays in step with the
   PostalAddress in the JSON-LD in layout.js. */
const ADDRESS = {
  line1: 'Unit 101, Oxford Towers',
  line2: '139 HAL Old Airport Road',
  city: 'Bengaluru',
  region: 'Karnataka',
  postcode: '560008',
  country: 'India',
}

export default function AboutPage() {
  const registered = REGISTRATION.filter((r) => r.value)

  return (
    <PageTransition>
      <main id="main" className="section page-offset">
        <div className="section-container">
          <header className="section-header">
            <h1 className="section-title">
              Built in Bengaluru, since <span className="mark">2024</span>
            </h1>
            <p className="section-lede">
              A boutique full-stack studio. We design, build, and run AI applications, mobile
              apps, and data platforms, and we stay on after launch.
            </p>
          </header>

          <div className="about-stack">
            <section className="about-prose">
              <h2 className="about-heading">The short version</h2>
              <p>
                AppWeave Labs was incorporated in Karnataka in 2024 as a private limited
                company. We kept the team small on purpose: the people who scope a build are
                the people who write it, which is why there is nobody between you and the
                work.
              </p>
              <p>
                Today that covers full-stack product work, AI engineering, data platforms, and
                fractional CTO engagements. We also run our own products alongside client
                work, which is the fastest way we know to stay honest about what shipping
                actually costs.
              </p>
              {/* TODO: founding story, headcount, and any milestones worth naming.
                  Left out rather than invented, since none of it is recorded in
                  this repo and an About page is all factual claims. */}
            </section>

            <div className="about-facts">
              <section className="about-card">
                <h2 className="about-card-title">Where we are</h2>
                <address className="about-address">
                  {ADDRESS.line1}
                  <br />
                  {ADDRESS.line2}
                  <br />
                  {ADDRESS.city}, {ADDRESS.region} {ADDRESS.postcode}
                  <br />
                  {ADDRESS.country}
                </address>
                <a href="mailto:contact@appweave.tech" className="link-inline">
                  contact@appweave.tech
                </a>
              </section>

              <section className="about-card">
                <h2 className="about-card-title">Registered details</h2>
                <dl className="about-reg">
                  {registered.map((row) => (
                    <div key={row.label} className="about-reg-row">
                      <dt>{row.label}</dt>
                      <dd className="mono">{row.value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="about-reg-note">AppWeave Labs Pvt Ltd</p>
              </section>
            </div>
          </div>

          <div className="hero-actions about-cta">
            <Link href="/contact" className="btn btn-accent">
              Start a project
            </Link>
          </div>
        </div>
      </main>
    </PageTransition>
  )
}
