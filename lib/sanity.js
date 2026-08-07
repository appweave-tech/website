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

export const postSlugsQuery = `*[_type == "post"] { "slug": slug.current }`

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

export const productSlugsQuery = `*[_type == "product"] { "slug": slug.current }`

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
