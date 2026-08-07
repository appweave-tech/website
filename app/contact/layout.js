import { buildOpenGraph } from '@/lib/seo'

const DESCRIPTION =
  'Get in touch with AppWeave Labs. Tell us about your project and we\'ll get back to you within 24 hours.'

export const metadata = {
  title: 'Contact Us',
  description: DESCRIPTION,
  openGraph: buildOpenGraph({ title: 'Contact Us', description: DESCRIPTION, path: '/contact' }),
  // canonical is now inherited as './' from the root layout, which resolves to
  // /contact. An absolute override here is redundant.
}

export default function ContactLayout({ children }) {
  return children
}
