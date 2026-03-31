export const metadata = {
  title: 'Terms of Service | AppWeave Labs',
}

export default function TermsOfService() {
  return (
    <main style={{ paddingTop: '6rem', paddingBottom: '4rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 2rem' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '2rem' }}>
          Terms of Service
        </h1>
        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.95rem' }}>
          <p style={{ marginBottom: '1.5rem' }}>Last updated: March 2026</p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '0.75rem' }}>Services</h2>
          <p style={{ marginBottom: '1.5rem' }}>AppWeave Labs Pvt Ltd provides software development, consulting, and related technology services. All engagements are governed by individual service agreements signed between the parties.</p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '0.75rem' }}>Website Use</h2>
          <p style={{ marginBottom: '1.5rem' }}>This website is provided for informational purposes. You may browse freely. You agree not to misuse the website or attempt to access it through automated means beyond standard web crawling.</p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '0.75rem' }}>Intellectual Property</h2>
          <p style={{ marginBottom: '1.5rem' }}>All content on this website, including text, graphics, logos, and code, is the property of AppWeave Labs Pvt Ltd unless otherwise stated. You may not reproduce or distribute any content without written permission.</p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '0.75rem' }}>Limitation of Liability</h2>
          <p style={{ marginBottom: '1.5rem' }}>AppWeave Labs shall not be liable for any indirect, incidental, or consequential damages arising from the use of this website or our services beyond what is covered in individual service agreements.</p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '0.75rem' }}>Governing Law</h2>
          <p style={{ marginBottom: '1.5rem' }}>These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Bengaluru, Karnataka.</p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '0.75rem' }}>Contact</h2>
          <p style={{ marginBottom: '1.5rem' }}>For questions about these terms, contact us at <a href="mailto:contact@appweave.tech" style={{ color: 'var(--accent-cyan)' }}>contact@appweave.tech</a>.</p>
        </div>
      </div>
    </main>
  )
}
