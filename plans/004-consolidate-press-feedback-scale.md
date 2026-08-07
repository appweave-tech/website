# 004 — Consolidate press feedback onto one scale token

- **Status**: DONE
- **Commit**: 540f5e4
- **Severity**: LOW
- **Category**: Cohesion & tokens
- **Estimated scope**: 1 file, ~8 lines

## Problem

Pressable elements simulate a physical push with `scale()` on `:active`, but
three different magnitudes are in use, and the most common one is below the
threshold where a press is actually perceptible.

```css
/* app/globals.css:438-441 — current, nav CTA */
.nav-cta:active {
  transform: translateY(1px) scale(0.985);
  box-shadow: none;
}

/* app/globals.css:464-466 — current, theme toggle */
.theme-toggle:active {
  transform: scale(0.95);
}

/* app/globals.css:689-692 — current, primary button */
.btn-primary:active {
  transform: translateY(1px) scale(0.99);
  box-shadow: none;
}

/* app/globals.css:711-714 — current, accent button */
.btn-accent:active {
  transform: translateY(1px) scale(0.99);
  box-shadow: none;
}

/* app/globals.css:728-730 — current, secondary button */
.btn-secondary:active {
  transform: translateY(1px) scale(0.99);
}

/* app/globals.css:1190-1193 — current, product card */
.product-card:active {
  transform: translateY(1px) scale(0.99);
  box-shadow: none;
}

/* app/globals.css:1487-1489 — current, blog card media */
.blog-card:active .blog-card-media {
  transform: scale(0.99);
}
```

Press feedback should be subtle but present, in the range `0.95`–`0.98`.
`0.99` is a 1% reduction — at a 46px-tall button that is under half a pixel of
travel per edge, which reads as no feedback at all. `0.985` is the same problem.
`0.95` on the theme toggle is correct, which means the toggle currently feels
more responsive than the primary CTA.

## Target

One token, used everywhere, at `0.97` — the middle of the perceptible range.

```css
/* target — app/globals.css, in the Motion block at :110-119 */
--press-scale: 0.97;    /* :active push, all pressable surfaces */
```

Every rule above becomes, preserving its existing `translateY` and `box-shadow`
declarations exactly:

```css
/* target — pattern */
transform: translateY(1px) scale(var(--press-scale));
```

and for the two rules that have no `translateY`:

```css
/* target — app/globals.css:464-466 and :1487-1489 */
transform: scale(var(--press-scale));
```

## Repo conventions to follow

- Shared motion values are `:root` custom properties in the Motion block,
  `app/globals.css:110-119`, each with a trailing comment. `--press-scale` is a
  motion value and belongs there, after the `--dur-*` entries.
- Exemplar of a token introduced for a single cross-cutting concern and then
  used everywhere: `--ease-out` (`app/globals.css:111`), referenced by ~30
  rules rather than re-typed.
- Existing `:active` rules keep `translateY(1px)` and clear `box-shadow`. Do not
  regularise those — only the scale value is in scope.

## Steps

1. In `app/globals.css`, in the Motion block (`:110-119`), add
   `--press-scale: 0.97;    /* :active push, all pressable surfaces */` after
   the last `--dur-*` line.
2. `app/globals.css:439` — `scale(0.985)` → `scale(var(--press-scale))`.
3. `app/globals.css:465` — `scale(0.95)` → `scale(var(--press-scale))`.
4. `app/globals.css:691` — `scale(0.99)` → `scale(var(--press-scale))`.
5. `app/globals.css:713` — `scale(0.99)` → `scale(var(--press-scale))`.
6. `app/globals.css:730` — `scale(0.99)` → `scale(var(--press-scale))`.
7. `app/globals.css:1191` — `scale(0.99)` → `scale(var(--press-scale))`.
8. `app/globals.css:1488` — `scale(0.99)` → `scale(var(--press-scale))`.
9. Run `grep -nE "scale\(0\.9[0-9]+\)" app/globals.css`. The only remaining
   match should be `@keyframes pulse` at `:245` (`scale(0.9)`), which is an
   animation keyframe, not press feedback — leave it. If plan 003 has already
   run, that block may be gone entirely, in which case expect zero matches.

## Boundaries

- Do NOT change any `translateY` value, `box-shadow` declaration, or `:hover`
  rule. Only the `:active` scale magnitude changes.
- Do NOT add `:active` feedback to elements that currently have none — this is
  a consolidation, not new coverage.
- Do NOT touch `@keyframes pulse` (`app/globals.css:243-246`) or any other
  keyframe block; their `scale()` values are unrelated.
- Do NOT touch the `@media (hover: none), (pointer: coarse)` block at
  `app/globals.css:2534` — it neutralises `:hover` transforms, not `:active`
  ones, and press feedback on touch is correct.
- Do NOT add dependencies.
- If the line numbers do not match what you find, STOP and report.

## Verification

- **Mechanical**: `npx next build` completes with no new errors.
  `grep -c "press-scale" app/globals.css` returns `8` (one declaration, seven
  usages).
- **Feel check**: run `npm run dev` and, holding the mouse button down on each
  of these, confirm a visible but small inward push that releases cleanly:
  - the "Start a project" hero button on `/`
  - the "Get in touch" nav CTA
  - the theme toggle — it should now feel the *same* as the buttons, not
    springier
  - a product card on `/products` and a blog card on `/blog`
  - In DevTools → Animations at 10% playback, hold a press and confirm the
    inward move is perceptible without the button looking like it shrinks.
  - On a touch device or with device emulation, tap and hold a button and
    confirm the press still registers visually.
- **Done when**: the build passes, every `:active` press uses
  `var(--press-scale)`, and the theme toggle and primary button feel identical
  under press.
