import Link from 'next/link'
import { PageTransition } from '../page-transition'
import { buildOpenGraph } from '@/lib/seo'

// Description was previously absent, so this page inherited the homepage's and
// shipped a duplicate meta description.
const DESCRIPTION =
  'How AppWeave Labs collects, uses, and protects the information you share with us through this site and our contact form.'

export const metadata = {
  title: 'Privacy Policy',
  description: DESCRIPTION,
  openGraph: buildOpenGraph({ title: 'Privacy Policy', description: DESCRIPTION, path: '/privacy' }),
}

export default function PrivacyPolicy() {
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

          <h1 className="doc-title">Privacy policy</h1>
          <p className="doc-updated">Last updated: March 2026</p>

          <div className="doc-body">
            <h2>Information we collect</h2>
            <p>When you use our contact form, we collect your name, email address, company name, and project details. We do not collect any information automatically beyond what is standard for web servers (IP addresses, browser type).</p>

            <h2>How we use your information</h2>
            <p>We use the information you provide solely to respond to your inquiries and discuss potential projects. We do not sell, rent, or share your personal information with third parties.</p>

            <h2>Cookies and analytics</h2>
            <p>We use a single localStorage item to remember your theme preference (dark or light mode).</p>
            <p>We use Google Analytics (GA4) to understand how visitors interact with our website. This service may use cookies to collect anonymized data such as pages visited, time spent on pages, and referral sources. This data helps us improve our website and services. Google Analytics data is processed in accordance with <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google&apos;s privacy policy</a>. No personally identifiable information is collected through analytics.</p>

            <h2>Data security</h2>
            <p>We take reasonable measures to protect the information you provide. However, no method of transmission over the internet is completely secure.</p>

            <h2>Contact</h2>
            <p>For any questions about this privacy policy, write to us at <a href="mailto:contact@appweave.tech">contact@appweave.tech</a>.</p>
          </div>
        </div>
      </main>
    </PageTransition>
  )
}
