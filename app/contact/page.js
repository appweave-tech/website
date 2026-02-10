'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    message: ''
  })
  const [status, setStatus] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    
    // For now, construct mailto link with form data
    const subject = `Project Inquiry from ${formData.name}${formData.company ? ` (${formData.company})` : ''}`
    const body = `Name: ${formData.name}
Email: ${formData.email}
Company: ${formData.company || 'Not specified'}
Budget: ${formData.budget || 'Not specified'}

Message:
${formData.message}`
    
    window.location.href = `mailto:contact@appweave.tech?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setStatus('sent')
  }

  const inputStyle = {
    width: '100%',
    padding: '0.875rem 1rem',
    background: 'var(--bg-primary)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    color: 'var(--text-primary)',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.2s'
  }

  const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    fontSize: '0.875rem',
    fontWeight: 500,
    color: 'var(--text-secondary)'
  }

  return (
    <main style={{ minHeight: '100vh', paddingTop: '8rem' }}>
      <section style={{ padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div className="section-label mono" style={{
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--accent-cyan)',
            marginBottom: '0.75rem'
          }}>Contact</div>
          
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            marginBottom: '1.5rem',
            lineHeight: 1.1
          }}>
            Let's build something{' '}
            <span style={{
              background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>together</span>
          </h1>
          
          <p style={{
            fontSize: '1.15rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
            marginBottom: '3rem',
            maxWidth: '600px'
          }}>
            Fill out the form below and we'll get back to you within 24 hours. 
            Or if you prefer, send us an email directly.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '3rem',
            alignItems: 'start'
          }}>
            {/* Contact Form */}
            <form onSubmit={handleSubmit} style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              padding: '2rem'
            }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>
                Send us a message
              </h2>

              <div style={{ display: 'grid', gap: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={labelStyle}>Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="John Doe"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="john@company.com"
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={labelStyle}>Company</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      placeholder="Acme Inc."
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Budget Range</label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({...formData, budget: e.target.value})}
                      style={{...inputStyle, cursor: 'pointer'}}
                    >
                      <option value="">Select budget</option>
                      <option value="<5L">Less than ₹5L</option>
                      <option value="5L-10L">₹5L - ₹10L</option>
                      <option value="10L-25L">₹10L - ₹25L</option>
                      <option value="25L+">₹25L+</option>
                      <option value="not-sure">Not sure yet</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Tell us about your project *</label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Describe your project, goals, and timeline..."
                    rows={5}
                    style={{...inputStyle, resize: 'vertical', fontFamily: 'inherit'}}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn btn-primary"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    padding: '1rem',
                    fontSize: '1rem',
                    cursor: status === 'sending' ? 'wait' : 'pointer'
                  }}
                >
                  {status === 'sending' ? 'Opening email...' : 'Send Message'}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </form>

            {/* Alternative Contact Options */}
            <div>
              <div style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                padding: '2rem',
                marginBottom: '1.5rem'
              }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>
                  Or email us directly
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                  Prefer to write your own email? Reach out to us directly and we'll respond within 24 hours.
                </p>
                <a 
                  href="mailto:contact@appweave.tech" 
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.875rem 1.25rem',
                    background: 'var(--bg-primary)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    color: 'var(--text-primary)',
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    transition: 'all 0.2s'
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  contact@appweave.tech
                </a>
              </div>

              {/* Social Links */}
              <div style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                padding: '2rem',
                marginBottom: '1.5rem'
              }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>
                  Connect with us
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <a href="https://linkedin.com/company/appweave" target="_blank" rel="noopener noreferrer" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1rem',
                    background: 'var(--bg-primary)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    color: 'var(--text-primary)',
                    fontSize: '0.9rem',
                    transition: 'all 0.2s'
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--accent-violet)">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>
                  <a href="https://x.com/AppWeaveTech" target="_blank" rel="noopener noreferrer" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1rem',
                    background: 'var(--bg-primary)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    color: 'var(--text-primary)',
                    fontSize: '0.9rem',
                    transition: 'all 0.2s'
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--text-primary)">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    X (Twitter)
                  </a>
                  <a href="https://github.com/appweave-tech" target="_blank" rel="noopener noreferrer" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1rem',
                    background: 'var(--bg-primary)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    color: 'var(--text-primary)',
                    fontSize: '0.9rem',
                    transition: 'all 0.2s'
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--text-primary)">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </a>
                </div>
              </div>

              {/* Location */}
              <div style={{
                padding: '1.5rem',
                background: 'var(--bg-secondary)',
                borderRadius: '12px',
                border: '1px solid var(--border)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'var(--text-muted)',
                  fontSize: '0.85rem'
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 6v6l4 2"/>
                  </svg>
                  <span>Based in Bengaluru • IST (UTC+5:30)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
