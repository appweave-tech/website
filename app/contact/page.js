'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    message: '',
    honeypot: ''
  })
  const [status, setStatus] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.honeypot) return; // Bot detected
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
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            maxWidth: '800px'
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
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: '1rem' }}>
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

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: '1rem' }}>
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

                <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.honeypot || ''}
                    onChange={(e) => setFormData({...formData, honeypot: e.target.value})}
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

                {status === 'sent' && (
                  <p style={{
                    marginTop: '1rem',
                    padding: '0.875rem 1rem',
                    borderRadius: '8px',
                    background: 'rgba(16, 185, 129, 0.1)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    color: '#10b981',
                    fontSize: '0.95rem'
                  }}>
                    Message sent! We'll get back to you within 24 hours.
                  </p>
                )}

                {status === 'error' && (
                  <p style={{
                    marginTop: '1rem',
                    padding: '0.875rem 1rem',
                    borderRadius: '8px',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    color: '#ef4444',
                    fontSize: '0.95rem'
                  }}>
                    Something went wrong. Please try again or email us directly.
                  </p>
                )}
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

            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
