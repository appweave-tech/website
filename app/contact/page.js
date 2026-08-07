'use client'

import { useState } from 'react'
import { PageTransition } from '../page-transition'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i

function validate(values) {
  const errors = {}

  if (!values.name.trim()) {
    errors.name = 'Please tell us your name.'
  } else if (values.name.trim().length < 2) {
    errors.name = 'Please enter your full name.'
  }

  if (!values.email.trim()) {
    errors.email = 'We need an email address to reply to.'
  } else if (!EMAIL_RE.test(values.email.trim())) {
    errors.email = 'That email address looks incomplete.'
  }

  if (!values.message.trim()) {
    errors.message = 'Tell us a little about the project.'
  } else if (values.message.trim().length < 20) {
    errors.message = 'A sentence or two more would help us respond usefully.'
  }

  return errors
}

function FieldError({ id, children }) {
  return (
    <p className="field-error" id={id} role="alert">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v4M12 16h.01" />
      </svg>
      {children}
    </p>
  )
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    message: '',
    honeypot: ''
  })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('')

  const update = (field) => (e) => {
    const value = e.target.value
    const next = { ...formData, [field]: value }
    setFormData(next)
    if (touched[field]) {
      setErrors(validate(next))
    }
  }

  const blur = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    setErrors(validate(formData))
  }

  /* The request is genuinely async now, so `status` paints and is the real guard.
     `sending` disables the button; a ref would be redundant. */
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.honeypot) return
    if (status === 'sending') return

    const found = validate(formData)
    setErrors(found)
    setTouched({ name: true, email: true, message: true })

    if (Object.keys(found).length > 0) {
      setStatus('invalid')
      // Focus by id, in visual order — aria-invalid isn't in the DOM until React re-renders
      const firstInvalid = ['name', 'email', 'message'].find((field) => found[field])
      if (firstInvalid) {
        document.getElementById(firstInvalid)?.focus()
      }
      return
    }

    setStatus('sending')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setStatus('sent')
        // Clear only on success, so a failure never costs the visitor their message.
        setFormData({ name: '', email: '', company: '', budget: '', message: '', honeypot: '' })
        setTouched({})
        setErrors({})
        return
      }

      if (res.status === 422) {
        const data = await res.json().catch(() => ({}))
        setErrors(data.errors || {})
        setTouched({ name: true, email: true, message: true })
        setStatus('invalid')
        return
      }

      setStatus('failed')
    } catch {
      // Offline, DNS failure, request blocked.
      setStatus('failed')
    }
  }

  const invalid = (field) => (touched[field] && errors[field] ? 'true' : 'false')

  return (
    <PageTransition>
  <main id="main" className="section page-offset">
        <div className="section-container contact-container">
          <header className="section-header">
            <h1 className="section-title">
              Let&rsquo;s build something <span className="mark">together</span>
            </h1>
            <p className="section-lede">
              Tell us what you're working on. We read every message and reply within one
              business day, or write to us directly if you prefer.
            </p>
          </header>

          <div className="contact-stack">
            <form onSubmit={handleSubmit} noValidate className="form-card">
              <h2 className="form-card-title">Send us a message</h2>

              <div className="form-grid">
                <div className="form-row">
                  <div>
                    <label className="field-label" htmlFor="name">Name</label>
                    <input
                      id="name"
                      type="text"
                      className="field-input"
                      value={formData.name}
                      onChange={update('name')}
                      onBlur={blur('name')}
                      placeholder="Ananya Raghunathan"
                      autoComplete="name"
                      aria-invalid={invalid('name')}
                      aria-describedby={invalid('name') === 'true' ? 'name-error' : undefined}
                    />
                    {invalid('name') === 'true' && (
                      <FieldError id="name-error">{errors.name}</FieldError>
                    )}
                  </div>
                  <div>
                    <label className="field-label" htmlFor="email">Email</label>
                    <input
                      id="email"
                      type="email"
                      className="field-input"
                      value={formData.email}
                      onChange={update('email')}
                      onBlur={blur('email')}
                      placeholder="ananya@northlinedata.in"
                      autoComplete="email"
                      aria-invalid={invalid('email')}
                      aria-describedby={invalid('email') === 'true' ? 'email-error' : undefined}
                    />
                    {invalid('email') === 'true' && (
                      <FieldError id="email-error">{errors.email}</FieldError>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div>
                    <label className="field-label" htmlFor="company">
                      Company <span className="field-optional">(optional)</span>
                    </label>
                    <input
                      id="company"
                      type="text"
                      className="field-input"
                      value={formData.company}
                      onChange={update('company')}
                      placeholder="Northline Data"
                      autoComplete="organization"
                    />
                  </div>
                  <div>
                    <label className="field-label" htmlFor="budget">
                      Budget range <span className="field-optional">(optional)</span>
                    </label>
                    <select
                      id="budget"
                      className="field-input"
                      value={formData.budget}
                      onChange={update('budget')}
                    >
                      <option value="">Select a range</option>
                      <option value="<5L">Under ₹5L</option>
                      <option value="5L-10L">₹5L - ₹10L</option>
                      <option value="10L-25L">₹10L - ₹25L</option>
                      <option value="25L+">₹25L and above</option>
                      <option value="not-sure">Not sure yet</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="field-label" htmlFor="message">Tell us about your project</label>
                  <textarea
                    id="message"
                    className="field-input"
                    rows={5}
                    value={formData.message}
                    onChange={update('message')}
                    onBlur={blur('message')}
                    placeholder="What you're building, who it's for, and the timeline you have in mind."
                    aria-invalid={invalid('message')}
                    aria-describedby={invalid('message') === 'true' ? 'message-error' : undefined}
                  />
                  {invalid('message') === 'true' && (
                    <FieldError id="message-error">{errors.message}</FieldError>
                  )}
                </div>

                <div className="visually-hidden" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.honeypot}
                    onChange={update('honeypot')}
                  />
                </div>

                <button type="submit" className="btn btn-accent" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending…' : 'Send message'}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>

                {status === 'sent' && (
                  <p className="form-alert" role="status">
                    <strong>Message received.</strong> It's with us now and we reply within one
                    business day. If it's urgent, contact@appweave.tech reaches us directly.
                  </p>
                )}

                {status === 'failed' && (
                  <p className="form-alert form-alert--error" role="alert">
                    <strong>We couldn't send that.</strong> Nothing was lost, so press send again
                    in a moment. If it keeps failing, email contact@appweave.tech and we'll pick it
                    up there.
                  </p>
                )}

                {status === 'invalid' && Object.keys(errors).length > 0 && (
                  <p className="form-alert form-alert--error" role="alert">
                    Check the highlighted fields above, then send again.
                  </p>
                )}
              </div>
            </form>

            <div className="form-card">
              <h2 className="form-card-title">Or email us directly</h2>
              <p className="form-card-note">
                The form above sends straight to us. If you'd rather write your own message, or
                need to attach something, this reaches the same inbox.
              </p>
              <a href="mailto:contact@appweave.tech" className="card-cta">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m2 7 10 6 10-6" />
                </svg>
                contact@appweave.tech
              </a>
            </div>
          </div>
        </div>
      </main>
    </PageTransition>
  )
}
