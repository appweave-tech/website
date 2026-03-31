import Link from 'next/link'

export default function NotFound() {
  return (
    <main style={{
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <h1 style={{
        fontSize: 'clamp(4rem, 10vw, 8rem)',
        fontWeight: 700,
        letterSpacing: '-0.04em',
        background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        marginBottom: '1rem'
      }}>404</h1>
      <p style={{
        fontSize: '1.15rem',
        color: 'var(--text-secondary)',
        marginBottom: '2rem',
        maxWidth: '400px'
      }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link href="/" className="btn btn-primary">
        Back to Home
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </Link>
    </main>
  )
}
