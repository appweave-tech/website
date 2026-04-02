export const metadata = {
  title: 'Privacy Policy | AppWeave Labs',
}

export default function PrivacyPolicy() {
  return (
    <main style={{ paddingTop: '6rem', paddingBottom: '4rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 2rem' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '2rem' }}>
          Privacy Policy
        </h1>
        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.95rem' }}>
          <p style={{ marginBottom: '1.5rem' }}>Last updated: March 2026</p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '0.75rem' }}>Information We Collect</h2>
          <p style={{ marginBottom: '1.5rem' }}>When you use our contact form, we collect your name, email address, company name, and project details. We do not collect any information automatically beyond what is standard for web servers (IP addresses, browser type).</p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '0.75rem' }}>How We Use Your Information</h2>
          <p style={{ marginBottom: '1.5rem' }}>We use the information you provide solely to respond to your inquiries and discuss potential projects. We do not sell, rent, or share your personal information with third parties.</p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '0.75rem' }}>Cookies &amp; Analytics</h2>
          <p style={{ marginBottom: '1rem' }}>We use a single localStorage item to remember your theme preference (dark/light mode).</p>
          <p style={{ marginBottom: '1.5rem' }}>We use Google Analytics (GA4) to understand how visitors interact with our website. This service may use cookies to collect anonymized data such as pages visited, time spent on pages, and referral sources. This data helps us improve our website and services. Google Analytics data is processed in accordance with <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-cyan)' }}>Google's Privacy Policy</a>. No personally identifiable information is collected through analytics.</p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '0.75rem' }}>Data Security</h2>
          <p style={{ marginBottom: '1.5rem' }}>We take reasonable measures to protect the information you provide. However, no method of transmission over the internet is 100% secure.</p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '0.75rem' }}>Contact</h2>
          <p style={{ marginBottom: '1.5rem' }}>For any questions about this privacy policy, please contact us at <a href="mailto:contact@appweave.tech" style={{ color: 'var(--accent-cyan)' }}>contact@appweave.tech</a>.</p>
        </div>
      </div>
    </main>
  )
}
