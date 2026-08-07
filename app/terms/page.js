import Link from 'next/link'
import { PageTransition } from '../page-transition'

export const metadata = {
  title: 'Terms of Service | AppWeave Labs',
}

export default function TermsOfService() {
  return (
    <PageTransition>
  <main id="main" className="doc-page">
        <div className="doc-container">
          <Link href="/" className="back-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 12H5M11 6l-6 6 6 6" />
            </svg>
            Back to home
          </Link>

          <h1 className="doc-title">Terms of service</h1>
          <p className="doc-updated">Last updated: March 2026</p>

          <div className="doc-body">
            <h2>Services</h2>
            <p>AppWeave Labs Pvt Ltd provides software development, consulting, and related technology services. All engagements are governed by individual service agreements signed between the parties.</p>

            <h2>Website use</h2>
            <p>This website is provided for informational purposes. You may browse freely. You agree not to misuse the website or attempt to access it through automated means beyond standard web crawling.</p>

            <h2>Intellectual property</h2>
            <p>All content on this website, including text, graphics, logos, and code, is the property of AppWeave Labs Pvt Ltd unless otherwise stated. You may not reproduce or distribute any content without written permission.</p>

            <h2>Limitation of liability</h2>
            <p>AppWeave Labs shall not be liable for any indirect, incidental, or consequential damages arising from the use of this website or our services beyond what is covered in individual service agreements.</p>

            <h2>Governing law</h2>
            <p>These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Bengaluru, Karnataka.</p>

            <h2>Contact</h2>
            <p>For questions about these terms, write to us at <a href="mailto:contact@appweave.tech">contact@appweave.tech</a>.</p>
          </div>
        </div>
      </main>
    </PageTransition>
  )
}
