# Animation plans

Produced by `improve-animations` against commit `540f5e4`. All motion on this
site is vanilla CSS in `app/globals.css` — there is no animation library.

## Plans

| # | Title | Severity | Category | Status |
|---|---|---|---|---|
| [001](001-shorten-testimonial-accordion.md) | Shorten the testimonial accordion's expansion | HIGH | Easing & duration / Performance | DONE |
| [002](002-shorten-card-hover-surfaces.md) | Shorten card hover surface transitions | HIGH | Easing & duration / Cohesion | DONE |
| [003](003-remove-nav-status-pulse.md) | Remove the perpetual pulse from the nav availability dot | MEDIUM | Purpose & frequency | DONE |
| [004](004-consolidate-press-feedback-scale.md) | Consolidate press feedback onto one scale token | LOW | Cohesion & tokens | DONE |
| [005](005-page-header-entrances.md) | Give non-home page headers a load-time entrance | MEDIUM | Missed opportunities / Cohesion | DONE |

## Execution order and dependencies

Executed 001 → 002 → 003 → 004, then 005 in a later pass.

005 is independent of 001–004: it appends to the entrance block and touches no
token or rule the earlier plans changed.

All four edit the same `Motion` token block in `:root`
(`app/globals.css:110-121`), so they conflict if run in parallel. Run them
sequentially, or have one executor take all four.

Two ordering notes:

- **001 before 002.** Both touch `--dur-surface`. 001 narrows what that token
  means; 002 relies on the narrowed meaning to decide which rules keep it.
- **003 before 004.** 003 deletes `@keyframes pulse`, which contains a
  `scale(0.9)`. 004's final grep assertion expects that block to be gone.

## Outcome

Net token changes in `app/globals.css`:

```css
--dur-hover: 200ms;      /* added  — hover surface + colour feedback */
--dur-accordion: 260ms;  /* added  — replaces --dur-expand: 700ms */
--press-scale: 0.97;     /* added  — replaces 0.985 / 0.99 / 0.95 */
--dur-surface: 500ms;    /* kept, rescoped to slow brand reveals only */
--dur-expand: 700ms;     /* removed */
```

`--dur-surface` and `--ease-expo` are now each used by exactly two rules, both
matching their documented purpose: the `.client-logo` brand reveal, and the
accordion's expanding surface.

Verified: `npx next build` passes; `--dur-expand` and `animation: pulse` have
zero occurrences; `--press-scale` has 8 (one declaration, seven usages).

**Not yet verified: the feel checks.** Every plan has a "Feel check" section
that needs a browser and a pointer. The durations here are reasoned from the
audit's budgets, not measured against the real component — 001's `260ms` in
particular is a judgement call on a panel whose travel distance is much larger
than the dropdowns that band was written for. Run the feel checks before
treating these as settled.

## Not addressed

Missed opportunities identified in the audit and still open:

1. **Theme toggle flips the page instantly.** No transition on `body`
   background/colour; every token swaps in one frame.
2. **The testimonial accordion is hover-only.** No `:focus-within`, no
   `tabIndex` — keyboard users cannot reach the expansion, and the
   resting-open panel is the only quote they can read. This is the one with an
   accessibility dimension, not just a motion one.
3. **Mobile menu items appear all at once.** `rise` animates the container; a
   40ms per-item stagger is the textbook use for a 6-item vertical list.
4. **Skeleton to content has no crossfade.** Route-matched skeletons exist in
   `app/*/loading.js`, but content pops in on swap. Plan 005 gives the header
   an entrance on load, which softens the arrival but does not bridge the
   skeleton-to-content swap itself.

Two corrective findings from the audit were also never planned:

- **MEDIUM** — product and blog card image zoom runs at `--dur-slow` (420ms) on
  hover (`app/globals.css:1207`, `:1476`), over the sub-300ms UI budget.
- **LOW** — the mobile menu toggle uses `@keyframes`
  (`app/globals.css:3099`, `:3105` + `app/layout.js:224`), so a rapid
  open/close/open restarts from zero instead of retargeting. The close path has
  a documented `animationend` + timeout fallback, so this is a known tradeoff
  rather than an oversight.

### Deliberately rejected

Extending the scroll-reveal system to `.product-grid`, `.blog-grid`,
`.job-grid`, or the contact form. `app/globals.css:2566-2569` documents why
`.job-grid` was removed from it — hiding above-the-fold content behind a scroll
trigger trades a real metric for decoration — and those grids sit in
structurally identical positions. Plan 005 deliberately animates only the
header, on load, for this reason.

One LOW finding from the audit was also not planned: the mobile menu toggle
uses `@keyframes` (`app/globals.css:3099`, `:3105` + `app/layout.js:224`), so a
rapid open/close/open restarts from zero instead of retargeting. The close path
has a documented `animationend` + timeout fallback, so this is a known tradeoff
rather than an oversight.
