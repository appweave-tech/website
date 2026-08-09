# 005 — Give non-home page headers a load-time entrance

- **Status**: DONE
- **Commit**: 540f5e4
- **Severity**: MEDIUM
- **Category**: Missed opportunities / Cohesion
- **Estimated scope**: 1 file, ~25 lines

## Problem

The home page opens with a considered, staggered entrance:

```css
/* app/globals.css:2642-2651 — current */
.js-reveal .hero-title,
.js-reveal .hero-sub,
.js-reveal .hero-actions {
  opacity: 0;
  animation: hero-rise 950ms var(--ease-out) forwards;
}

.js-reveal .hero-title   { animation-delay: 100ms; }
.js-reveal .hero-sub     { animation-delay: 190ms; }
.js-reveal .hero-actions { animation-delay: 280ms; }
```

Every other route has **no entrance at all**. Its header is simply painted:

| Route | Header element | Entrance |
| --- | --- | --- |
| `/` | `.hero-title` / `.hero-sub` / `.hero-actions` | staggered rise |
| `/products`, `/careers`, `/contact` | `.page-offset .section-header` | none |
| `/blog` | `.blog-header` | none |
| `/blog/[slug]` | `.post-header` | none |
| `/products/[slug]` | `.detail-header` | none |

The existing scroll-reveal system is scoped entirely to home-page grids
(`app/globals.css:2572-2576`, selector list in `app/layout.js:302`), so nothing
else on the site moves on arrival. Navigating from `/` to `/products` goes from
a choreographed opening to a hard cut.

**Do not fix this by extending the scroll-reveal system.** `app/globals.css:2566-2569`
documents a deliberate decision:

> `.job-grid` is deliberately NOT here: it now lives only on /careers, directly
> under the page header, and hiding above-the-fold content to fade it in trades
> a real metric for decoration.

`.product-grid` and `.blog-grid` sit in structurally identical positions
(directly under a page header), so that reasoning applies to them too. This plan
adds a **load-time** entrance on the header only — it plays immediately, does not
depend on scroll, and never gates content behind an IntersectionObserver.

## Target

Reuse the existing `hero-rise` keyframes and easing token. Shorter than the hero
(700ms vs 950ms) because a secondary page header is not the same moment, and a
tighter stagger.

```css
/* target — append to the "Home page entrance and scroll motion" block,
   after the .js-reveal #nav rule at app/globals.css:2653-2655 */

/* Secondary pages get the hero's entrance language at a shorter length. Load-time,
   not scroll-triggered: these headers are above the fold, and the scroll-reveal
   system is deliberately not used on above-the-fold content (see :2566). */
.js-reveal .page-offset .section-header > *,
.js-reveal .blog-header > *,
.js-reveal .post-header > *,
.js-reveal .detail-header > * {
  opacity: 0;
  animation: hero-rise 700ms var(--ease-out) forwards;
}

.js-reveal .page-offset .section-header > *:nth-child(2),
.js-reveal .blog-header > *:nth-child(2),
.js-reveal .post-header > *:nth-child(2),
.js-reveal .detail-header > *:nth-child(2) { animation-delay: 70ms; }

.js-reveal .page-offset .section-header > *:nth-child(3),
.js-reveal .blog-header > *:nth-child(3),
.js-reveal .post-header > *:nth-child(3),
.js-reveal .detail-header > *:nth-child(3) { animation-delay: 140ms; }

/* Cap, matching the reveal system's approach at :2617-2621 — the stagger must
   not grow unbounded on a header with many children. */
.js-reveal .page-offset .section-header > *:nth-child(n+4),
.js-reveal .blog-header > *:nth-child(n+4),
.js-reveal .post-header > *:nth-child(n+4),
.js-reveal .detail-header > *:nth-child(n+4) { animation-delay: 200ms; }
```

The `hero-rise` keyframes already exist at `app/globals.css:2632-2635` and are
reused unchanged:

```css
@keyframes hero-rise {
  from { opacity: 0; transform: translateY(26px); }
  to   { opacity: 1; transform: none; }
}
```

### Known tradeoff: LCP

These headers contain each page's `<h1>`, which is very likely the LCP element.
Chrome does not count `opacity: 0` content as painted, so a fade-in defers LCP
by roughly the time it takes opacity to become meaningful — with
`--ease-out: cubic-bezier(0.22, 0.7, 0.2, 1)` that is early, on the order of
100–150ms, plus the stagger delay on later children (the `<h1>` is usually
child 2, so ~70ms).

This is the same tradeoff the home hero already makes, so accepting it is
consistent. If a Lighthouse run shows LCP regressing past 2.5s, the mitigation
is to drop `opacity` from the animation and let the headers rise with
`transform` only — fully painted from the first frame, no LCP cost:

```css
/* LCP-safe fallback, only if needed */
@keyframes header-rise-solid {
  from { transform: translateY(20px); }
  to   { transform: none; }
}
```

## Repo conventions to follow

- All load-time entrance rules are gated on `.js-reveal`, set on `<html>` by the
  head script in `app/layout.js` **only** when `IntersectionObserver` exists and
  the visitor has not requested reduced motion. Gating on it gives reduced-motion
  and no-JS users the final state for free — no extra media query needed. See the
  block comment at `app/globals.css:2624-2629`.
- Entrance animations use `animation: <name> <dur> var(--ease-out) forwards`
  with `opacity: 0` as the base state, and are staggered via `animation-delay`
  on `:nth-child()`. Exemplar: `app/globals.css:2642-2651`.
- Staggers cap out rather than growing unbounded. Exemplar:
  `app/globals.css:2617-2621`.
- Keyframes are declared once and reused by name; do not add a near-duplicate of
  `hero-rise`.

## Steps

1. Open `app/globals.css` and find the rule `.js-reveal #nav { … }` (around
   `:2653`), the last rule in the "Home page entrance and scroll motion" block
   before the `@media (min-width: 900px)` sticky-header rule.
2. Directly after that rule's closing brace, insert the four rule groups from
   the **Target** section above, verbatim, including the comments.
3. Do not modify the `@keyframes hero-rise` block or any existing `.js-reveal`
   rule.
4. Verify the scoping did not leak onto the home page or the skeletons:
   - `grep -c "page-offset" app/page.js` must return `0` (the home page uses
     `.section` without `.page-offset`, so its below-fold section headers are
     not matched).
   - `grep -l "section-header" app/loading.js app/*/loading.js` must return
     nothing (skeletons use `.skeleton-header`, so they are not matched).

## Boundaries

- Do NOT add `.product-grid`, `.blog-grid`, `.job-grid`, `.contact-stack`, or
  `.form-card` to the scroll-reveal selector list in `app/layout.js:302` or to
  the `.js-reveal` grid rules at `app/globals.css:2572-2576`. Hiding
  above-the-fold content behind a scroll trigger is the exact thing
  `app/globals.css:2566-2569` rules out.
- Do NOT touch `app/layout.js` at all — this is CSS only, no new JS.
- Do NOT change the hero's own timings (`app/globals.css:2642-2651`).
- Do NOT animate `.doc-page` (`/privacy`, `/terms`) — legal pages, no header
  element, out of scope.
- Do NOT animate the contact form itself, only its `.section-header`.
- Do NOT add dependencies.
- If the line numbers do not match what you find, STOP and report.

## Verification

- **Mechanical**: `npx next build` completes with no new errors.
  `grep -c "hero-rise" app/globals.css` returns `6` (one `@keyframes`, one hero
  rule, one new header rule, plus the three existing `.js-reveal .hero-*` delay
  selectors do not reference it — recount after editing and expect the keyframe
  name to appear in exactly the `@keyframes` line, the hero rule, and the new
  header rule, i.e. `3`).
- **Feel check**: run `npm run dev` and hard-reload each of `/products`,
  `/careers`, `/blog`, `/contact`, one blog post, and one product detail page:
  - The eyebrow, heading, and lede rise and fade in sequence, not together.
  - The whole entrance is finished well inside a second — it must not still be
    running when you reach for the first link.
  - Nothing below the header is hidden or delayed; the grid under it is fully
    visible and interactive from the first paint.
  - Navigate `/` → `/products` via the nav. The transition from the hero's
    entrance to the products header entrance should feel like the same site,
    not two different opening styles.
  - In DevTools → Animations at 10% playback, confirm the three header children
    are offset by roughly 70ms each, not animating in lockstep.
  - In DevTools → Rendering, enable "Emulate prefers-reduced-motion: reduce",
    hard-reload, and confirm the headers appear instantly at full opacity with
    no movement (the head script will not set `.js-reveal`).
  - With JavaScript disabled entirely, confirm the headers are fully visible.
- **Done when**: the build passes, all six routes above animate their header on
  load, the home page's below-fold section headers are unaffected, and both the
  reduced-motion and no-JS paths show static, fully-visible headers.
