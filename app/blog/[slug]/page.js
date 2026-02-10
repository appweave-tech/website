import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { client, postQuery, postSlugsQuery, urlFor } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'

async function getPost(slug) {
  try {
    const post = await client.fetch(postQuery, { slug })
    return post
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch(postSlugsQuery)
    return slugs.map((item) => ({ slug: item.slug }))
  } catch (error) {
    return []
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = await getPost(slug)
  
  if (!post) {
    return { title: 'Post Not Found | AppWeave Labs' }
  }

  return {
    title: `${post.title} | AppWeave Labs`,
    description: post.excerpt || '',
  }
}

function formatDate(dateString) {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const portableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null
      return (
        <Image
          src={urlFor(value).width(800).url()}
          alt={value.alt || 'Blog image'}
          width={800}
          height={450}
          style={{ width: '100%', height: 'auto' }}
        />
      )
    },
    code: ({ value }) => {
      if (!value?.code) return null
      const language = value.language || 'text'
      const filename = value.filename
      
      return (
        <div className="code-block">
          {filename && (
            <div className="code-filename">{filename}</div>
          )}
          <pre className={`language-${language}`}>
            <code className={`language-${language}`}>{value.code}</code>
          </pre>
        </div>
      )
    },
  },
  marks: {
    link: ({ children, value }) => (
      <a href={value.href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
  block: {
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
}

export default async function PostPage({ params }) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="post-page">
      <div className="post-container">
        <Link href="/blog" className="back-link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Blog
        </Link>

        <article>
          <header className="post-header">
            <div className="post-meta">
              {post.categories?.[0] && (
                <span className="post-category">{post.categories[0]}</span>
              )}
              <span className="post-date">{formatDate(post.publishedAt)}</span>
            </div>
            <h1 className="post-title">{post.title}</h1>
            {post.excerpt && (
              <p className="post-excerpt">{post.excerpt}</p>
            )}
          </header>

          {post.mainImage && (
            <Image
              src={urlFor(post.mainImage).width(1600).height(800).url()}
              alt={post.title || 'Blog post image'}
              width={1600}
              height={800}
              className="post-hero-image"
              priority
            />
          )}

          <div className="post-content">
            {post.body && (
              <PortableText value={post.body} components={portableTextComponents} />
            )}
          </div>

          {post.author && (
            <div className="post-author">
              {post.author.image && (
                <Image
                  src={urlFor(post.author.image).width(96).height(96).url()}
                  alt={post.author.name || 'Author'}
                  width={48}
                  height={48}
                  className="post-author-image"
                />
              )}
              <div>
                <div className="post-author-name">{post.author.name}</div>
                <div className="post-author-label">Author</div>
              </div>
            </div>
          )}
        </article>
      </div>
    </main>
  )
}
