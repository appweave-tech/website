# 002 — Shorten card hover surface transitions

- **Status**: DONE
- **Commit**: 540f5e4
- **Severity**: HIGH
- **Category**: Easing & duration / Cohesion
- **Estimated scope**: 1 file, ~8 lines

## Problem

Every card on the site acknowledges the cursor over half a second, using an
expo-out curve meant for entrances.

```css
/* app/globals.css:954 — current */
.client-card {
  transition: background var(--dur-surface) var(--ease-expo),
              border-color var(--dur-surface) var(--ease-expo);
}

/* app/globals.css:2714 — current */
.bento-card {
  transition: background var(--dur-surface) var(--ease-expo);
}

/* app/globals.css:2910 — current */
.process-step {
  transition: background var(--dur-surface) var(--ease-expo);
}

/* app/globals.css:2969 and :3—current, logo desaturation inside the accordion */
.voice-logo {
  transition: opacity var(--dur-surface) var(--ease-expo),
              filter var(--dur-surface) var(--ease-expo);
}
```

Token values, from `app/globals.css:114-118`:

```css
--ease-expo: cubic-bezier(0.16, 1, 0.3, 1);
--dur-surface: 500ms;   /* card and wash crossfades */
```

Two problems:

1. **Duration.** Card hover is a "tens of times per day" interaction, and UI
   motion belongs under 300ms. 500ms means the card is still darkening well
   after the pointer has moved on.
2. **Curve.** `--ease-expo` is `cubic-bezier(0.16, 1, 0.3, 1)` — a very strong
   ease-out. It is correct for a surface that expands or washes in, which is
   what the token comment says it is for. On a background colour change it dumps
   most of the change in the first ~80ms and then crawls through a long tail,
   so the hover reads as both abrupt and slow at once. Colour changes take a
   plain `ease`.

## Target

A dedicated token for hover-surface feedback, at the standard duration and with
an `ease` curve.

```css
/* target — app/globals.css, in the Motion block at :110-119 */
--dur-hover: 200ms;     /* hover surface + colour feedback */
```

```css
/* target — app/globals.css:954 */
.client-card {
  transition: background var(--dur-hover) ease,
              border-color var(--dur-hover) ease;
}

/* target — app/globals.css:2714 */
.bento-card {
  transition: background var(--dur-hover) ease;
}

/* target — app/globals.css:2910 */
.process-step {
  transition: background var(--dur-hover) ease;
}

/* target — app/globals.css:2969 */
.voice-logo {
  transition: opacity var(--dur-hover) ease,
              filter var(--dur-hover) ease;
}
```

`200ms` sits in the middle of the sub-300ms UI budget and matches the
"tooltips, small popovers: 125–200ms" band, which is the right analogue for a
feedback-only colour change.

## Repo conventions to follow

- Durations live as `--dur-*` custom properties in the Motion block of `:root`,
  `app/globals.css:110-119`, each with a trailing comment. Add `--dur-hover`
  there.
- The bare `ease` keyword is intentional here and needs no token — it is a CSS
  built-in, and the audit's decision order assigns it to hover/colour changes
  specifically.
- Exemplar of a correctly-scoped hover transition already in this file:
  `app/globals.css:664-668` (`.btn`), which enumerates each animated property
  rather than blanketing them.

## Steps

1. In `app/globals.css`, in the Motion block (`:110-119`), add
   `--dur-hover: 200ms;     /* hover surface + colour feedback */` directly
   after the `--dur-slow` line.
2. At `app/globals.css:954-955` (`.client-card`), replace both
   `var(--dur-surface) var(--ease-expo)` pairs with `var(--dur-hover) ease`.
3. At `app/globals.css:2714` (`.bento-card`), same replacement.
4. At `app/globals.css:2910` (`.process-step`), same replacement.
5. At `app/globals.css:2969-2970` (`.voice-logo`), same replacement for both
   the `opacity` and `filter` entries.
6. Run `grep -n "dur-surface" app/globals.css`. The only remaining match should
   be the token declaration itself plus `.client-logo` at `:976-977`. Leave
   `.client-logo` alone — see Boundaries.

## Boundaries

- Do NOT change `.client-logo` (`app/globals.css:973-978`). Its 500ms
  desaturation is a slow reveal of the client's brand mark, not cursor
  feedback, and it reads correctly at that length. Retiring `--dur-surface`
  entirely is out of scope.
- Do NOT touch `.voice` / `.voice::before` / `.voice-quote` — those belong to
  plan 001.
- Do NOT change `:hover` target values (backgrounds, borders, transforms), only
  the transition timing and curve.
- Do NOT touch the `@media (hover: none), (pointer: coarse)` block at
  `app/globals.css:2534`.
- Do NOT add dependencies.
- If the line numbers do not match what you find, STOP and report.

## Verification

- **Mechanical**: `npx next build` completes with no new errors.
- **Feel check**: run `npm run dev`, then:
  - On `/`, hover a client card and a bento tile. The background should land
    almost as the cursor arrives, with no lingering tail after the cursor
    leaves.
  - Move the cursor quickly across the client grid. Cards should not appear to
    "chase" the pointer with staggered late fades.
  - In DevTools → Animations at 10% playback, confirm the background change is
    now roughly linear-feeling rather than front-loaded with a long crawl.
  - In DevTools → Rendering, enable "Emulate prefers-reduced-motion: reduce" and
    confirm the background change still happens (the block at
    `app/globals.css:2489` deliberately preserves colour transitions) while
    `transform` lifts are dropped.
- **Done when**: the build passes, `--dur-hover` exists and is used by all four
  rules above, and `.client-logo` still uses `--dur-surface`.
