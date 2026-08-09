const SITE_URL = 'https://appweave.tech'
const SITE_NAME = 'AppWeave Labs'

/* Next replaces the `openGraph` object wholesale rather than deep-merging it, so
   any page that declares its own openGraph loses the image contributed by
   app/opengraph-image.js at the root. Every page therefore has to restate it.
   This helper exists so that restating it is not seven chances to forget.

   Pass `image` to override with a per-page asset (blog posts, products). */
export function buildOpenGraph({ title, description, path = '/', type = 'website', image }) {
  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    url: `${SITE_URL}${path === '/' ? '' : path}`,
    siteName: SITE_NAME,
    type,
    images: image
      ? [image]
      : [{ url: '/opengraph-image', width: 1200, height: 630, alt: SITE_NAME }],
  }
}
