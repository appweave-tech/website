import Link from 'next/link'
import Image from 'next/image'
import { client, postsQuery, urlFor } from '@/lib/sanity'

async function getPosts() {
  try {
    const posts = await client.fetch(postsQuery)
    return posts
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
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
    >
      <div className="blog-card-media">
        {post.mainImage ? (
          <Image
            src={urlFor(post.mainImage).width(width).height(height).url()}
            alt={post.title ? `Cover image for ${post.title}` : 'Blog post cover image'}
            width={width}
            height={height}
            className="blog-card-image"
            priority={lead}
          />
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
  const posts = await getPosts()
  const [lead, ...rest] = posts

  return (
    <main id="main" className="blog-page">
      <div className="section-container">
        <header className="blog-header">
          <p className="section-label mono">Blog</p>
          <h1 className="section-title">Notes from the workshop</h1>
          <p className="section-lede">
            What we learn shipping products: data engineering, AI systems, and the craft of
            software development.
          </p>
        </header>

        {posts.length > 0 ? (
          <div className="blog-grid">
            <PostCard post={lead} lead />
            {rest.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>No posts published yet</h3>
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
  )
}
