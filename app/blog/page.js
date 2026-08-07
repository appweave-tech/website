import Link from 'next/link'
import Image from 'next/image'
import { client, postsQuery, urlFor } from '@/lib/sanity'
import { PageTransition } from '../page-transition'
import { ViewTransition } from 'react'

async function getPosts() {
  try {
    const items = await client.fetch(postsQuery)
    return { items, failed: false }
  } catch (error) {
    console.error('Error fetching posts:', error)
    // Distinguish an outage from an empty list: the empty state makes a factual
    // claim ('nothing published') that would be false if the CMS is unreachable.
    return { items: [], failed: true }
  }
}

function formatDate(dateString) {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export const metadata = {
  title: 'Blog | AppWeave Labs',
  description: 'Insights on full-stack development, data engineering, AI, and building great products.',
}

function PostCard({ post, lead }) {
  const width = lead ? 1200 : 720
  const height = lead ? 800 : 450

  return (
    <Link
      href={`/blog/${post.slug?.current}`}
      className={lead ? 'blog-card blog-card--lead' : 'blog-card'}
      transitionTypes={['nav-forward']}
    >
      <div className="blog-card-media">
        {post.mainImage ? (
          /* Pairs with the same name on the post page, so the cover grows into
             the hero rather than the two pages simply swapping. default="none"
             keeps it out of unrelated transitions. */
          <ViewTransition name={`post-cover-${post.slug?.current}`} share="morph" default="none">
            <Image
              src={urlFor(post.mainImage).width(width).height(height).url()}
              alt={post.title ? `Cover image for ${post.title}` : 'Blog post cover image'}
              width={width}
              height={height}
              className="blog-card-image"
              priority={lead}
            />
          </ViewTransition>
        ) : (
          <div className="blog-card-placeholder" aria-hidden="true">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3 2 8l10 5 10-5-10-5z" />
              <path d="M2 16l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
        )}
      </div>
      <div className="blog-card-content">
        <div className="blog-card-meta">
          {post.categories?.[0] && (
            <span className="blog-card-category">{post.categories[0]}</span>
          )}
          <span className="blog-card-date mono">{formatDate(post.publishedAt)}</span>
        </div>
        <h2 className="blog-card-title">{post.title}</h2>
        {post.excerpt && <p className="blog-card-excerpt">{post.excerpt}</p>}
      </div>
    </Link>
  )
}

export default async function BlogPage() {
  const { items: posts, failed } = await getPosts()
  const [lead, ...rest] = posts

  return (
    <PageTransition>
  <main id="main" className="blog-page">
        <div className="section-container">
          <header className="blog-header">
            <h1 className="section-title">
              Notes from the <span className="mark">workshop</span>
            </h1>
            <p className="section-lede">
              What we learn shipping products: data engineering, AI systems, and the craft of
              software development.
            </p>
          </header>

          {failed ? (
            <div className="empty-state empty-state--error" role="alert">
              <h2>We couldn&apos;t load the writing</h2>
              <p>
                Something went wrong on our side, so this list may be incomplete. Try again in
                a moment, or take a look at what we&apos;ve shipped instead.
              </p>
              <Link href="/products" className="btn btn-secondary">
                Browse our products
              </Link>
            </div>
          ) : posts.length > 0 ? (
            <div className="blog-grid">
              <PostCard post={lead} lead />
              {rest.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h2>No posts published yet</h2>
              <p>
                We write up the things we learn while building. Nothing is live yet. In the
                meantime, take a look at what we&apos;ve shipped.
              </p>
              <Link href="/products" className="btn btn-secondary">
                Browse our products
              </Link>
            </div>
          )}
        </div>
      </main>
    </PageTransition>
  )
}
