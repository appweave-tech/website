import './globals.css'
import Link from 'next/link'
import { GoogleAnalytics } from '@next/third-parties/google'

// Display: Bricolage Grotesque (headlines) · Body: Instrument Sans · Data: JetBrains Mono
const fontHref =
  'https://fonts.googleapis.com/css2' +
  '?family=Bricolage+Grotesque:opsz,wght@12..96,500..800' +
  '&family=Instrument+Sans:wght@400;500;600;700' +
  '&family=JetBrains+Mono:wght@400;500' +
  '&display=swap'

export const metadata = {
  title: 'AppWeave Labs | Full-Stack Development Studio',
  description: 'Boutique full-stack development studio. We design, build, and ship AI applications, mobile apps, and data platforms, from MVP to production.',
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
        <link rel="preload" as="style" href={fontHref} />
        <link rel="stylesheet" href={fontHref} />
        <noscript>
          <link rel="stylesheet" href={fontHref} />
        </noscript>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.setAttribute('data-theme','light');}}catch(e){}try{if('IntersectionObserver' in window&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('js-reveal');}}catch(e){}})();`,
          }}
        />
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
            }).replace(/</g, '\\u003c')
          }}
        />
      </head>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
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
              <Link href="/contact" className="nav-cta">Get in touch</Link>
            </div>
            <button
              className="hamburger"
              id="hamburger"
              aria-label="Toggle menu"
              aria-expanded="false"
              aria-controls="navLinks"
            >
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
              <address className="footer-fine">
                Unit 101, Oxford Towers, 139 HAL Old Airport Rd, Bengaluru, Karnataka, India 560008
              </address>
              <span className="footer-fine mono">CIN: U62099KA2024PTC185497</span>
            </div>
            <div className="footer-right">
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
          </div>
        </footer>

        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function ready(fn) {
                  if (document.readyState === 'loading') {
                    document.addEventListener('DOMContentLoaded', fn);
                  } else {
                    fn();
                  }
                }

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

                // Clean URL scroll — intercept /services, /clients, /careers nav clicks
                document.addEventListener('click', function(e) {
                  var link = e.target.closest('a');
                  if (!link) return;
                  var map = {'/services':'services', '/clients':'clients'};
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
                ready(function() {
                  var map = {'/services':'services', '/clients':'clients'};
                  var sectionId = map[location.pathname];
                  if (sectionId) {
                    var el = document.getElementById(sectionId);
                    if (el) setTimeout(function(){ el.scrollIntoView({ behavior: 'smooth' }); }, 100);
                  }
                });

                // Mobile menu — keeps aria-expanded and body scroll in sync
                function setMenu(open) {
                  var hamburger = document.getElementById('hamburger');
                  var navLinks = document.getElementById('navLinks');
                  if (!hamburger || !navLinks) return;

                  hamburger.classList.toggle('hamburger-active', open);
                  hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
                  document.body.style.overflow = open ? 'hidden' : '';

                  if (open) {
                    navLinks.classList.remove('nav-closing');
                    navLinks.classList.add('nav-open');
                    return;
                  }

                  if (!navLinks.classList.contains('nav-open')) return;

                  navLinks.classList.remove('nav-open');
                  navLinks.classList.add('nav-closing');

                  var done = false;
                  function finish() {
                    if (done) return;
                    done = true;
                    navLinks.classList.remove('nav-closing');
                    navLinks.removeEventListener('animationend', finish);
                  }
                  navLinks.addEventListener('animationend', finish);
                  // Fallback: animationend never fires if the animation is suppressed
                  // (reduced motion, background tab), so the class must be cleared anyway.
                  setTimeout(finish, 400);
                }

                ready(function() {
                  var hamburger = document.getElementById('hamburger');
                  var navLinks = document.getElementById('navLinks');
                  if (!hamburger || !navLinks) return;
                  hamburger.addEventListener('click', function() {
                    setMenu(!navLinks.classList.contains('nav-open'));
                  });
                  navLinks.addEventListener('click', function(e) {
                    if (e.target.closest('a')) setMenu(false);
                  });
                });

                // Close mobile menu on Escape key
                document.addEventListener('keydown', function(e) {
                  if (e.key !== 'Escape') return;
                  var navLinks = document.getElementById('navLinks');
                  var hamburger = document.getElementById('hamburger');
                  if (navLinks && navLinks.classList.contains('nav-open')) {
                    setMenu(false);
                    if (hamburger) hamburger.focus();
                  }
                });

                // Hairline border on the nav once the page has scrolled
                ready(function() {
                  var navEl = document.getElementById('nav');
                  if (!navEl) return;
                  var raf = null;
                  function sync() {
                    raf = null;
                    navEl.classList.toggle('scrolled', window.scrollY > 12);
                  }
                  sync();
                  window.addEventListener('scroll', function() {
                    if (raf === null) raf = requestAnimationFrame(sync);
                  }, { passive: true });
                });

                // Theme toggle handler (init already ran in <head>)
                ready(function() {
                  var toggle = document.getElementById('themeToggle');
                  if (toggle) {
                    toggle.addEventListener('click', function() {
                      var html = document.documentElement;
                      var currentTheme = html.getAttribute('data-theme');
                      if (currentTheme === 'light') {
                        html.removeAttribute('data-theme');
                        try { localStorage.setItem('theme', 'dark'); } catch (e) {}
                      } else {
                        html.setAttribute('data-theme', 'light');
                        try { localStorage.setItem('theme', 'light'); } catch (e) {}
                      }
                    });
                  }
                });

                // Staggered reveal for below-fold home grids. The hidden state comes from the
                // .js-reveal class set in <head>; this only decides when to release it.
                ready(function() {
                  var root = document.documentElement;
                  if (!root.classList.contains('js-reveal')) return;

                  var SEL = '.services-grid, .client-grid';

                  function release(el) {
                    el.classList.add('reveal-in');
                  }

                  var io = new IntersectionObserver(function(entries) {
                    entries.forEach(function(entry) {
                      if (!entry.isIntersecting) return;
                      release(entry.target);
                      io.unobserve(entry.target);
                    });
                  }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

                  // Bookkeeping lives in a WeakSet, never as a DOM attribute: writing one
                  // onto a node React is about to hydrate produces an attribute mismatch
                  // ("server rendered HTML didn't match the client properties").
                  var bound = new WeakSet();

                  // Binds any grid not already bound. Must be re-runnable: next/link does
                  // soft navigation, so DOMContentLoaded never fires again and a revisit
                  // renders brand-new grid nodes that nothing is watching.
                  function scan() {
                    var groups = document.querySelectorAll(SEL);
                    Array.prototype.forEach.call(groups, function(g) {
                      if (bound.has(g)) return;
                      bound.add(g);
                      io.observe(g);
                      // Per-element safety net: content must never stay hidden because of a
                      // missed callback, a background tab, or a scroll that outran the observer.
                      setTimeout(function() { release(g); }, 2500);
                    });
                  }

                  var pending = false;
                  function schedule() {
                    if (pending) return;
                    pending = true;
                    requestAnimationFrame(function() { pending = false; scan(); });
                  }

                  scan();
                  new MutationObserver(schedule).observe(document.body, {
                    childList: true,
                    subtree: true
                  });
                });

                ready(updateActiveNav);
                window.addEventListener('popstate', updateActiveNav);
              })();
            `,
          }}
        />
        <GoogleAnalytics gaId="G-1P1R8BM85Z" />
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
