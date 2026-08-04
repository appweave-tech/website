'use client'

import Link from 'next/link'

export default function Error({ error, reset }) {
  return (
    <main id="main" className="state-page">
      <div className="state-inner">
        <p className="state-code mono">Something broke</p>
        <h1 className="state-title">This page didn&apos;t load</h1>
        <p className="state-body">
          We hit an unexpected error on our side. Reloading usually fixes it. If it keeps
          happening, tell us what you were doing and we&apos;ll look into it.
        </p>
        {error?.digest && (
          <p className="state-ref mono">Reference: {error.digest}</p>
        )}
        <div className="hero-actions">
          <button onClick={() => reset()} className="btn btn-primary" type="button">
            Reload this page
          </button>
          <Link href="/contact" className="link-inline">
            Report the problem
          </Link>
        </div>
      </div>
    </main>
  )
}
