import Link from 'next/link'

export const metadata = {
  title: 'Page not found | AppWeave Labs',
}

export default function NotFound() {
  return (
    <main id="main" className="state-page">
      <div className="state-inner">
        <p className="state-code mono">Error 404</p>
        <h1 className="state-title">We couldn&apos;t find that page</h1>
        <p className="state-body">
          The link may be out of date, or the page has moved since it was published. Here are
          the places people usually mean to land.
        </p>
        <Link href="/" className="btn btn-primary">
          Back to home
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
        <nav className="state-links" aria-label="Suggested pages">
          <Link href="/services">Services</Link>
          <Link href="/clients">Clients</Link>
          <Link href="/products">Products</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/careers">Careers</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </main>
  )
}
