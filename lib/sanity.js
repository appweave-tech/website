import { cache } from 'react'
import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

if (!projectId && typeof window === 'undefined') {
  console.warn(
    '[sanity] NEXT_PUBLIC_SANITY_PROJECT_ID is not set. CMS-backed pages will render empty states.'
  )
}

export const client = createClient({
  projectId: projectId || 'missing-project-id',
  dataset,
  apiVersion: '2024-01-01',
  useCdn: true,
})

/* Server-only write client. Never import this into a Client Component: the token
   must not reach the browser, which is why it has no NEXT_PUBLIC_ prefix. Returns
   null when unconfigured so the route can answer honestly instead of throwing. */
export function getWriteClient() {
  const token = process.env.SANITY_API_WRITE_TOKEN
  if (!projectId || !token) return null
  return createClient({
    projectId,
    dataset,
    apiVersion: '2024-01-01',
    token,
    useCdn: false,
  })
}

/* Every CMS-backed route now fetches its list twice per request: once in
   generateMetadata (to decide whether the page is empty and must be noindexed)
   and once in the component. React's cache() collapses those into a single
   Sanity request for the duration of the render.

   `failed` distinguishes an outage from a genuinely empty list. That difference
   drives indexation: an empty list is noindexed on purpose, but an outage must
   NOT silently deindex a page that really has content. */
export const fetchList = cache(async (query, params = {}) => {
  try {
    const items = await client.fetch(query, params)
    return { items: items || [], failed: false }
  } catch (error) {
    console.error('[sanity] query failed:', error?.message || error)
    return { items: [], failed: true }
  }
})

const builder = createImageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}

// GROQ Queries
export const postsQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  mainImage,
  "author": author->name,
  "categories": categories[]->title
}`

export const postQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  body,
  mainImage,
  "author": author->{name, image},
  "categories": categories[]->title
}`

/* _updatedAt and publishedAt feed real <lastmod> values in the sitemap; the extra
   fields are ignored by generateStaticParams, which only reads slug. */
export const postSlugsQuery = `*[_type == "post"] { "slug": slug.current, _updatedAt, publishedAt }`

// Client queries
export const clientsQuery = `*[_type == "client" && featured == true] | order(order asc) {
  _id,
  name,
  logo,
  description,
  industry,
  websiteUrl,
  stockTicker
}`

// Career queries
export const testimonialsQuery = `*[_type == "testimonial"] | order(order asc) {
  _id,
  quote,
  authorName,
  authorRole,
  "clientName": client->name,
  "clientLogo": client->logo
}`

export const careersQuery = `*[_type == "career" && isActive == true] | order(order asc) {
  _id,
  title,
  slug,
  type,
  location,
  department,
  shortDescription
}`

// Product queries
export const productsQuery = `*[_type == "product" && featured == true] | order(order asc) {
  _id,
  name,
  slug,
  tagline,
  description,
  icon,
  heroImage,
  status,
  category,
  platforms,
  pricing
}`

export const productQuery = `*[_type == "product" && slug.current == $slug][0] {
  _id,
  name,
  slug,
  tagline,
  description,
  icon,
  heroImage,
  status,
  category,
  platforms,
  features,
  techStack,
  pricing,
  links,
  screenshots,
  useCases
}`

/* Must apply the same `featured == true` filter as productsQuery. Without it the
   sitemap and generateStaticParams built an indexable detail page for every
   product, including ones the /products listing never links to — orphan pages
   with no internal crawl path, submitted to Google as though they mattered. A
   listing filter and an indexation filter must not disagree by accident. */
export const productSlugsQuery = `*[_type == "product" && featured == true] { "slug": slug.current, _updatedAt }`

// Service queries
export const servicesQuery = `*[_type == "service" && featured == true] | order(order asc) {
  _id,
  title,
  description,
  icon,
  iconEmoji,
  color,
  order,
  slug
}`
