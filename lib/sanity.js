import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

const builder = imageUrlBuilder(client)

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
export const careersQuery = `*[_type == "career" && isActive == true] | order(order asc) {
  _id,
  title,
  slug,
  type,
  location,
  department,
  shortDescription
}`

export const careerQuery = `*[_type == "career" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  type,
  location,
  department,
  shortDescription,
  responsibilities,
  requirements,
  niceToHave,
  benefits,
  salaryRange,
  applyEmail,
  applyUrl,
  publishedAt
}`

export const careerSlugsQuery = `*[_type == "career" && isActive == true] { "slug": slug.current }`

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
