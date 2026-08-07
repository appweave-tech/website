import { permanentRedirect } from 'next/navigation'

// permanentRedirect (308), not redirect (307): this route was folded into the
// homepage for good, and only a permanent status consolidates its ranking
// signals into /#services.
export default function ServicesPage() {
  permanentRedirect('/#services')
}
