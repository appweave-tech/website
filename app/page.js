import Link from 'next/link'
import Image from 'next/image'
import { client, clientsQuery, careersQuery, servicesQuery, urlFor } from '@/lib/sanity'

async function getClients() {
  try {
    const clients = await client.fetch(clientsQuery)
    return clients
  } catch (error) {
    console.error('Error fetching clients:', error)
    return []
  }
}

async function getCareers() {
  try {
    const careers = await client.fetch(careersQuery)
    return careers
  } catch (error) {
    console.error('Error fetching careers:', error)
    return []
  }
}

async function getServices() {
  try {
    const services = await client.fetch(servicesQuery)
    return services
  } catch (error) {
    console.error('Error fetching services:', error)
    return []
  }
}

const typeLabels = {
  'full-time': 'Full-time',
  'part-time': 'Part-time',
  'contract': 'Contract',
  'internship': 'Internship',
  'freelance': 'Freelance',
}

export default async function HomePage() {
  const [clients, careers, services] = await Promise.all([getClients(), getCareers(), getServices()])

  return (
    <main>
      {/* Hero */}
      <section className="hero" style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '8rem 2rem 6rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(ellipse 50% 80% at 20% 0%, rgba(220, 38, 38, 0.08), transparent), radial-gradient(ellipse 40% 60% at 80% 20%, rgba(159, 18, 57, 0.06), transparent)',
          pointerEvents: 'none'
        }} />
        <div style={{ maxWidth: '1300px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 2 }}>
          <div className="hero-eyebrow mono" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 0.8rem',
            background: 'rgba(220, 38, 38, 0.1)',
            border: '1px solid rgba(220, 38, 38, 0.2)',
            borderRadius: '100px',
            fontSize: '0.75rem',
            color: 'var(--accent-cyan)',
            marginBottom: '1.5rem'
          }}>
            <span style={{
              width: '6px',
              height: '6px',
              background: 'var(--accent-emerald)',
              borderRadius: '50%',
              animation: 'pulse 2s infinite'
            }} />
            Available for new projects
          </div>
          <h1 style={{
            fontSize: 'clamp(2.75rem, 7vw, 4.5rem)',
            fontWeight: 700,
            letterSpacing: '-0.04em',
            lineHeight: 1.1,
            marginBottom: '1.5rem'
          }}>
            Weaving <span style={{
              background: 'linear-gradient(135deg, #f87171, #fb7185, #fda4af)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Innovation</span><br />
            into Apps
          </h1>
          <p style={{
            fontSize: '1.15rem',
            color: 'var(--text-secondary)',
            maxWidth: '550px',
            marginBottom: '2.5rem',
            lineHeight: 1.7
          }}>
            Boutique full-stack development studio. We design, build, and ship AI applications, mobile apps, and data platforms — from early-stage MVPs to production-ready systems.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-primary">
              Start a Project
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <Link href="#clients" className="btn btn-secondary">See Our Work</Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" style={{ padding: '7rem 2rem' }}>
        <div className="section-container">
          <div className="section-header">
            <div className="section-label mono">What We Do</div>
            <h2 className="section-title">End-to-end technology services</h2>
          </div>
          {services.length > 0 ? (
            <div className="services-grid">
              {services.map((service) => (
                <div key={service._id} style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  padding: '1.75rem',
                  transition: 'all 0.3s ease'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.25rem',
                    background: `rgba(var(--accent-${service.color || 'cyan'}-rgb, 6, 182, 212), 0.15)`,
                    color: `var(--accent-${service.color || 'cyan'})`,
                    overflow: 'hidden'
                  }}>
                    {service.icon?.asset ? (
                      <Image
                        src={urlFor(service.icon).width(40).height(40).url()}
                        alt={service.title}
                        width={40}
                        height={40}
                        style={{
                          objectFit: 'contain',
                          width: '100%',
                          height: '100%',
                          padding: '8px'
                        }}
                      />
                    ) : service.iconEmoji ? (
                      <span style={{ fontSize: '20px' }}>{service.iconEmoji}</span>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                      </svg>
                    )}
                  </div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>{service.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6 }}>{service.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ 
              textAlign: 'center', 
              padding: '4rem 2rem',
              background: 'var(--bg-card)',
              borderRadius: '12px',
              border: '1px solid var(--border)'
            }}>
              <p style={{ color: 'var(--text-muted)' }}>Services coming soon. Add services in Sanity Studio to see them here.</p>
            </div>
          )}
        </div>
      </section>

      {/* Clients Section - CMS Powered */}
      <section id="clients" style={{ padding: '7rem 2rem', background: 'var(--bg-secondary)' }}>
        <div className="section-container">
          <div className="section-header">
            <div className="section-label mono">Our Clients</div>
            <h2 className="section-title">Building products for ambitious teams</h2>
          </div>
          
          {clients.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
              {clients.map((clientItem) => (
                <div key={clientItem._id} style={{
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border)',
                  borderRadius: '16px',
                  padding: '2rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      {clientItem.logo ? (
                        <Image
                          src={urlFor(clientItem.logo).width(88).height(88).url()}
                          alt={clientItem.name}
                          width={44}
                          height={44}
                          style={{ borderRadius: '10px', objectFit: 'contain' }}
                        />
                      ) : (
                        <div style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          background: 'linear-gradient(135deg, #18181b, #27272a)',
                          border: '1px solid #3f3f46',
                          color: '#fff'
                        }}>{clientItem.name?.charAt(0) || 'C'}</div>
                      )}
                      <div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{clientItem.name}</h3>
                        {clientItem.industry && (
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{clientItem.industry}</span>
                        )}
                      </div>
                    </div>
                    {clientItem.stockTicker && (
                      <span style={{
                        fontSize: '0.7rem',
                        padding: '0.3rem 0.6rem',
                        background: 'rgba(16, 185, 129, 0.1)',
                        color: 'var(--accent-emerald)',
                        borderRadius: '100px',
                        fontWeight: 500,
                        height: 'fit-content'
                      }}>{clientItem.stockTicker}</span>
                    )}
                  </div>
                  {clientItem.description && (
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                      {clientItem.description}
                    </p>
                  )}
                  {clientItem.websiteUrl && (
                    <a 
                      href={clientItem.websiteUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.85rem',
                        color: 'var(--accent-cyan)',
                        textDecoration: 'none'
                      }}
                    >
                      Visit Website
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                        <polyline points="15 3 21 3 21 9"/>
                        <line x1="10" y1="14" x2="21" y2="3"/>
                      </svg>
                    </a>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div style={{ 
              textAlign: 'center', 
              padding: '4rem 2rem',
              background: 'var(--bg-primary)',
              borderRadius: '12px',
              border: '1px solid var(--border)'
            }}>
              <p style={{ color: 'var(--text-muted)' }}>Client showcases coming soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* Careers Section - CMS Powered */}
      <section id="careers" style={{ padding: '7rem 2rem' }}>
        <div className="section-container">
          <div className="section-header">
            <div className="section-label mono">Join Us</div>
            <h2 className="section-title">Build your career at AppWeave</h2>
          </div>
          
          {careers.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
              {careers.map((job) => (
                <div key={job._id} style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 600 }}>{job.title}</h3>
                    <span style={{
                      fontSize: '0.7rem',
                      padding: '0.3rem 0.6rem',
                      background: 'rgba(16, 185, 129, 0.1)',
                      color: 'var(--accent-emerald)',
                      borderRadius: '100px',
                      fontWeight: 500
                    }}>{typeLabels[job.type] || job.type}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {job.location && <span>📍 {job.location}</span>}
                    {job.department && <span>🏢 {job.department}</span>}
                  </div>
                  {job.shortDescription && (
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1.25rem', flexGrow: 1 }}>
                      {job.shortDescription}
                    </p>
                  )}
                  <Link 
                    href={`/careers/${job.slug?.current}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      padding: '0.75rem 1.25rem',
                      background: 'transparent',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                      color: 'var(--text-primary)',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    View Details →
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ 
              textAlign: 'center', 
              padding: '4rem 2rem',
              background: 'var(--bg-card)',
              borderRadius: '12px',
              border: '1px solid var(--border)'
            }}>
              <p style={{ color: 'var(--text-muted)' }}>No open positions at the moment. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ padding: '7rem 2rem', background: 'var(--bg-secondary)' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <div className="section-label mono">Let's Talk</div>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 600,
            letterSpacing: '-0.03em',
            marginBottom: '1rem'
          }}>Have a project in mind?</h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>
            Whether you're building something new or need help scaling what you have, we'd love to hear about it.
          </p>
          <Link href="/contact" className="btn btn-primary">
            Contact Us
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </section>
    </main>
  )
}
