// The Studio page itself is a Client Component and cannot export metadata, so the
// noindex lives here. robots.txt alone was not enough: it only asks crawlers not
// to fetch the URL, and an externally linked /studio could still be indexed on
// anchor text alone. This also stops the CMS admin inheriting the site title and
// the homepage canonical.
export const metadata = {
  title: 'Studio',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
}

export default function StudioLayout({ children }) {
  return children
}
