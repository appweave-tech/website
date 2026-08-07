// Replaces public/robots.txt so the crawl rules live next to sitemap.js and the
// two cannot drift. The old file disallowed '/studio/' with a trailing slash,
// which did not match the bare '/studio' path that actually serves the CMS.
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/studio', '/api/'],
    },
    sitemap: 'https://appweave.tech/sitemap.xml',
    host: 'https://appweave.tech',
  }
}
