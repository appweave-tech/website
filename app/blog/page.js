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

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <main className="blog-page">
      <div className="section-container">
        <div className="blog-header">
          <div className="section-label mono">Blog</div>
          <h1 className="section-title">Insights & Ideas</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '1rem', maxWidth: '600px' }}>
            Thoughts on building products, data engineering, AI, and the craft of software development.
          </p>
        </div>

        {posts.length > 0 ? (
          <div className="blog-grid">
            {posts.map((post) => (
              <Link href={`/blog/${post.slug?.current}`} key={post._id} className="blog-card">
                {post.mainImage && (
                  <Image
                    src={urlFor(post.mainImage).width(600).height(360).url()}
                    alt={post.title || 'Blog post image'}
                    width={600}
                    height={360}
                    className="blog-card-image"
                  />
                )}
                {!post.mainImage && (
                  <div className="blog-card-image" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                      <path d="M2 17l10 5 10-5"/>
                      <path d="M2 12l10 5 10-5"/>
                    </svg>
                  </div>
                )}
                <div className="blog-card-content">
                  <div className="blog-card-meta">
                    {post.categories?.[0] && (
                      <span className="blog-card-category">{post.categories[0]}</span>
                    )}
                    <span className="blog-card-date">{formatDate(post.publishedAt)}</span>
                  </div>
                  <h2 className="blog-card-title">{post.title}</h2>
                  {post.excerpt && (
                    <p className="blog-card-excerpt">{post.excerpt}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>No posts yet</h3>
            <p>Check back soon for new content!</p>
          </div>
        )}
      </div>
    </main>
  )
}
