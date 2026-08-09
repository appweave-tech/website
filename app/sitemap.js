import { fetchList, postSlugsQuery, productSlugsQuery, careersQuery } from '@/lib/sanity'

const baseUrl = 'https://appweave.tech'

/* Static routes carry a fixed date rather than new Date(). Stamping every URL
   with the build time told Google all eight pages changed on every deploy, which
   is false and teaches it to ignore lastmod entirely. Bump these by hand when a
   page's content actually changes. */
const STATIC_LAST_MODIFIED = '2026-08-07'

export default async function sitemap() {
  /* These three routes are CMS-backed and currently empty by design (pre-launch).
     An empty listing is thin content, so it stays out of the sitemap until it has
     something to show, and the matching page noindexes itself on the same
     condition. Both reverse automatically once documents are published — there is
     no flag to remember to flip.

     On a fetch failure the route is INCLUDED: dropping a URL that really does have
     content would be a self-inflicted deindexation, and a transient Sanity outage
     must not rewrite the sitemap. */
  const [posts, products, careers] = await Promise.all([
    fetchList(postSlugsQuery),
    fetchList(productSlugsQuery),
    fetchList(careersQuery),
  ])

  const hasContent = ({ items, failed }) => failed || items.length > 0

  const staticRoutes = [
    { url: baseUrl, lastModified: STATIC_LAST_MODIFIED, changeFrequency: 'monthly', priority: 1 },
    { url: `${baseUrl}/about`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: 'yearly', priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${baseUrl}/privacy`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: 'yearly', priority: 0.3 },
  ]

  if (hasContent(products)) {
    staticRoutes.push({ url: `${baseUrl}/products`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.8 })
  }
  if (hasContent(posts)) {
    staticRoutes.push({ url: `${baseUrl}/blog`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: 'weekly', priority: 0.8 })
  }
  if (hasContent(careers)) {
    staticRoutes.push({ url: `${baseUrl}/careers`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.6 })
  }

  const blogRoutes = posts.items
    .filter((post) => post.slug)
    .map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post._updatedAt || post.publishedAt || STATIC_LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.7,
    }))

  const productRoutes = products.items
    .filter((product) => product.slug)
    .map((product) => ({
      url: `${baseUrl}/products/${product.slug}`,
      lastModified: product._updatedAt || STATIC_LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.7,
    }))

  return [...staticRoutes, ...blogRoutes, ...productRoutes]
}
