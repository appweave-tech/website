'use client'

export default function Error({ error, reset }) {
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
        fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
        fontWeight: 700,
        letterSpacing: '-0.03em',
        marginBottom: '1rem'
      }}>Something went wrong</h1>
      <p style={{
        fontSize: '1rem',
        color: 'var(--text-secondary)',
        marginBottom: '2rem',
        maxWidth: '400px'
      }}>
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={() => reset()}
        className="btn btn-primary"
      >
        Try Again
      </button>
    </main>
  )
}
