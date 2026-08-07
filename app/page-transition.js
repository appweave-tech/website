/* Next aliases `react` to its own vendored build for the App Router, and that
   build exports ViewTransition. The top-level react package in node_modules
   does not, so a plain node require() of it will not find this symbol. */
import { ViewTransition } from 'react'

/* One wrapper for every page, so the type map lives in a single place.

   Three navigation shapes, three results:
   - nav-forward  a list to one of its items. Slides left, the new page in from
                  the right, because the visitor is going a level deeper.
   - nav-back     the reverse, so the motion reads as retracing rather than as
                  another step forward.
   - anything else (the nav bar, the footer, a CTA) is lateral. There is no
     depth to communicate between /careers and /blog, so those get the
     page-out/page-in hand-off: the old page recedes fully before the new one
     rises. A directional slide there would imply a hierarchy that does not
     exist, and a cross-fade would stack two display headlines on top of each
     other, since the two snapshots share one box.

   default="none" on the component is deliberate: with
   experimental.viewTransition every Link wraps in startViewTransition, so
   without it this would also fire on revalidations and any future Suspense
   reveal.

   This belongs in each page, never in layout.js. Layouts persist across
   navigation and never unmount, so enter/exit would never fire. */
export function PageTransition({ children }) {
  return (
    <ViewTransition
      enter={{ 'nav-forward': 'nav-forward', 'nav-back': 'nav-back', default: 'page-in' }}
      exit={{ 'nav-forward': 'nav-forward', 'nav-back': 'nav-back', default: 'page-out' }}
      default="none"
    >
      {children}
    </ViewTransition>
  )
}
