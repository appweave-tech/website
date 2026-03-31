import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'AppWeave Labs | Full-Stack Development Studio',
  description: 'Boutique full-stack development studio. We design, build, and ship AI applications, mobile apps, and data platforms — from early-stage MVPs to production-ready systems.',
  metadataBase: new URL('https://appweave.tech'),
  openGraph: {
    title: 'AppWeave Labs | Full-Stack Development Studio',
    description: 'Boutique full-stack development studio. We design, build, and ship AI applications, mobile apps, and data platforms.',
    url: 'https://appweave.tech',
    siteName: 'AppWeave Labs',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AppWeave Labs | Full-Stack Development Studio',
    description: 'Boutique full-stack development studio. We design, build, and ship AI applications, mobile apps, and data platforms.',
    creator: '@AppWeaveTech',
  },
  alternates: {
    canonical: 'https://appweave.tech',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "AppWeave Labs Pvt Ltd",
              "url": "https://appweave.tech",
              "logo": "https://appweave.tech/logo-dark.svg",
              "description": "Boutique full-stack development studio. We design, build, and ship AI applications, mobile apps, and data platforms.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Unit 101, Oxford Towers, 139 HAL Old Airport Rd",
                "addressLocality": "Bengaluru",
                "addressRegion": "Karnataka",
                "postalCode": "560008",
                "addressCountry": "IN"
              },
              "sameAs": [
                "https://x.com/AppWeaveTech",
                "https://linkedin.com/company/appweave",
                "https://github.com/appweave-tech"
              ]
            })
          }}
        />
      </head>
      <body>
        <nav id="nav">
          <div className="nav-container">
            <Link href="/" className="logo">
              <img src="/logo-dark.svg" alt="AppWeave Labs" className="logo-img logo-img-dark" />
              <img src="/logo-light.svg" alt="AppWeave Labs" className="logo-img logo-img-light" />
            </Link>
            <div className="nav-links" id="navLinks">
              <Link href="/services">Services</Link>
              <Link href="/clients">Clients</Link>
              <Link href="/careers">Careers</Link>
              <Link href="/products">Products</Link>
              <Link href="/blog">Blog</Link>
              <ThemeToggle />
              <Link href="/contact" className="nav-cta">Get in Touch</Link>
            </div>
            <button className="hamburger" id="hamburger" aria-label="Toggle menu">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </nav>

        {children}

        <footer>
          <div className="footer-container">
            <div className="footer-left">
              <Link href="/" className="logo">
                <img src="/logo-dark.svg" alt="AppWeave Labs" className="logo-img logo-img-dark" />
                <img src="/logo-light.svg" alt="AppWeave Labs" className="logo-img logo-img-light" />
              </Link>
              <span className="footer-copy">© 2026 AppWeave Labs Pvt Ltd</span>
              <span className="footer-copy" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Unit 101, Oxford Towers, 139 HAL Old Airport Rd, Bengaluru, Karnataka, India 560008</span>
              <span className="footer-copy" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>CIN: U62099KA2024PTC185497</span>
            </div>
            <div className="footer-social">
              <a href="https://x.com/AppWeaveTech" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://linkedin.com/company/appweave" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://github.com/appweave-tech" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
            <div className="footer-legal">
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Service</Link>
            </div>
          </div>
        </footer>

        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Clean URL scroll — intercept /services, /clients, /careers nav clicks
              document.addEventListener('click', function(e) {
                var link = e.target.closest('a');
                if (!link) return;
                var map = {'/services':'services', '/clients':'clients', '/careers':'careers'};
                var href = link.getAttribute('href');
                var sectionId = map[href];
                if (!sectionId) return;
                var el = document.getElementById(sectionId);
                if (el) {
                  e.preventDefault();
                  el.scrollIntoView({ behavior: 'smooth' });
                  history.pushState(null, '', href);
                  updateActiveNav();
                }
              });

              // On page load, scroll to section if URL matches
              (function() {
                var map = {'/services':'services', '/clients':'clients', '/careers':'careers'};
                var sectionId = map[location.pathname];
                if (sectionId) {
                  var el = document.getElementById(sectionId);
                  if (el) setTimeout(function(){ el.scrollIntoView({ behavior: 'smooth' }); }, 100);
                }
              })();

              // Hamburger menu toggle
              document.addEventListener('DOMContentLoaded', function() {
                var hamburger = document.getElementById('hamburger');
                var navLinks = document.getElementById('navLinks');
                if (hamburger && navLinks) {
                  hamburger.addEventListener('click', function() {
                    navLinks.classList.toggle('nav-open');
                    hamburger.classList.toggle('hamburger-active');
                  });
                  navLinks.addEventListener('click', function(e) {
                    if (e.target.tagName === 'A') {
                      navLinks.classList.remove('nav-open');
                      hamburger.classList.remove('hamburger-active');
                    }
                  });
                }
              });

              // Close mobile menu on Escape key
              document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                  var navLinks = document.getElementById('navLinks');
                  var hamburger = document.getElementById('hamburger');
                  if (navLinks && navLinks.classList.contains('nav-open')) {
                    navLinks.classList.remove('nav-open');
                    hamburger.classList.remove('hamburger-active');
                    hamburger.focus();
                  }
                }
              });

              // Theme initialization
              (function() {
                const savedTheme = localStorage.getItem('theme');
                if (savedTheme === 'light') {
                  document.documentElement.setAttribute('data-theme', 'light');
                }
              })();
              
              // Theme toggle handler
              document.addEventListener('DOMContentLoaded', function() {
                const toggle = document.getElementById('themeToggle');
                if (toggle) {
                  toggle.addEventListener('click', function() {
                    const html = document.documentElement;
                    const currentTheme = html.getAttribute('data-theme');
                    const newTheme = currentTheme === 'light' ? '' : 'light';
                    html.setAttribute('data-theme', newTheme);
                    localStorage.setItem('theme', newTheme || 'dark');
                  });
                }
              });

              // Active nav state
              function updateActiveNav() {
                var links = document.querySelectorAll('.nav-links a:not(.nav-cta)');
                var path = location.pathname;
                links.forEach(function(link) {
                  var href = link.getAttribute('href');
                  if (href === path || (href !== '/' && path.startsWith(href))) {
                    link.classList.add('nav-active');
                  } else {
                    link.classList.remove('nav-active');
                  }
                });
              }
              document.addEventListener('DOMContentLoaded', updateActiveNav);
              window.addEventListener('popstate', updateActiveNav);
            `,
          }}
        />
      </body>
    </html>
  )
}

function ThemeToggle() {
  return (
    <button className="theme-toggle" id="themeToggle" aria-label="Toggle theme" suppressHydrationWarning>
      <svg className="moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
      </svg>
      <svg className="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5"/>
        <line x1="12" y1="1" x2="12" y2="3"/>
        <line x1="12" y1="21" x2="12" y2="23"/>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
        <line x1="1" y1="12" x2="3" y2="12"/>
        <line x1="21" y1="12" x2="23" y2="12"/>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
      </svg>
    </button>
  )
}
