import { fetchList, careersQuery } from '@/lib/sanity'
import { buildOpenGraph } from '@/lib/seo'
import { PageTransition } from '../page-transition'

// Distinguishes an outage from an empty list: the empty state makes a factual
// claim ('nothing published') that would be false if the CMS is unreachable.
// cache() means generateMetadata and the component share one Sanity request.
async function getCareers() {
  return fetchList(careersQuery)
}

const typeLabels = {
  'full-time': 'Full-time',
  'part-time': 'Part-time',
  'contract': 'Contract',
  'internship': 'Internship',
  'freelance': 'Freelance',
}

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

const TITLE = 'Careers'
const DESCRIPTION =
  'Open roles at AppWeave Labs. Join a boutique studio building AI applications, mobile apps, and data platforms.'

// noindex while there are no open roles — see the note in app/blog/page.js. The
// page stays in the nav because 'no open roles right now' is genuinely useful to
// a human; it just should not be competing in search as a thin page.
export async function generateMetadata() {
  const { items, failed } = await getCareers()
  const isEmpty = !failed && items.length === 0

  return {
    title: TITLE,
    description: DESCRIPTION,
    openGraph: buildOpenGraph({ title: TITLE, description: DESCRIPTION, path: '/careers' }),
    ...(isEmpty && { robots: { index: false, follow: true } }),
  }
}

export default async function CareersPage() {
  const { items: careers, failed } = await getCareers()

  return (
    <PageTransition>
  <main id="main" className="section page-offset">
        <div className="section-container">
          <header className="section-header">
            <h1 className="section-title">
              Build your <span className="mark">career</span> at AppWeave
            </h1>
            <p className="section-lede">
              We hire people who want to own what they ship. Small team, real products, and no
              layers between you and the work.
            </p>
          </header>

          {failed ? (
            <div className="empty-state empty-state--error" role="alert">
              <h2>We couldn&apos;t load our open roles</h2>
              <p>
                Something went wrong on our side, so this list may be incomplete. Try again in
                a moment, or write to us directly and we&apos;ll tell you what we&apos;re hiring for.
              </p>
              <a href="mailto:contact@appweave.tech" className="btn btn-secondary">
                Email us instead
              </a>
            </div>
          ) : careers.length > 0 ? (
            <div className="job-grid">
              {careers.map((job) => (
                <article key={job._id} className="job-card">
                  <div className="job-head">
                    <h2 className="job-title">{job.title}</h2>
                    <span className="badge badge--live">
                      <span className="badge-dot" aria-hidden="true" />
                      {typeLabels[job.type] || job.type}
                    </span>
                  </div>
                  <p className="job-meta">
                    {job.location && (
                      <span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        {job.location}
                      </span>
                    )}
                    {job.department && (
                      <span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M4 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16" />
                          <path d="M14 9h4a2 2 0 0 1 2 2v10" />
                          <path d="M2 21h20M8 7h2M8 11h2M8 15h2" />
                        </svg>
                        {job.department}
                      </span>
                    )}
                  </p>
                  {job.shortDescription && (
                    <p className="job-body">{job.shortDescription}</p>
                  )}
                  {/* No per-role detail route exists yet, so applications go straight to email */}
                  <a
                    href={`mailto:contact@appweave.tech?subject=${encodeURIComponent(`Application: ${job.title}`)}`}
                    className="card-cta"
                  >
                    Apply for this role
                    <ArrowRight />
                  </a>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h2>No open roles right now</h2>
              <p>
                We hire in bursts, and between them this list is genuinely empty. If you think
                you would be a fit anyway, write to us and tell us what you want to build.
              </p>
              <a href="mailto:contact@appweave.tech" className="btn btn-secondary">
                Send us a note
              </a>
            </div>
          )}
        </div>
      </main>
    </PageTransition>
  )
}
