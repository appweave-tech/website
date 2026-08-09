# 001 — Shorten the testimonial accordion's expansion

- **Status**: DONE
- **Commit**: 540f5e4
- **Severity**: HIGH
- **Category**: Easing & duration / Performance
- **Estimated scope**: 1 file, ~5 lines

## Problem

The home page testimonial accordion (`#voices`) expands a hovered slice by
animating `flex-grow`, and it does so for 700ms. Three separate long transitions
overlap on every hover: the slice width, the quote's opacity, and the accent
wash behind it.

```css
/* app/globals.css:2948 — current */
.voice {
  transition: flex-grow var(--dur-expand) var(--ease-expo);
}

/* app/globals.css:2988 — current */
.voice-quote {
  transition: opacity var(--dur-surface) var(--ease-expo);
}

/* app/globals.css:3028 — current */
.voice::before {
  transition: opacity var(--dur-expand) var(--ease-expo);
}
```

Token values, from `app/globals.css:118-119`:

```css
--dur-surface: 500ms;   /* card and wash crossfades */
--dur-expand: 700ms;    /* accordion slice expansion */
```

Two problems:

1. **Duration.** Hover is a high-frequency interaction and the budget for UI
   motion is under 300ms. At 700ms the panel is still moving long after the
   cursor has settled, and a user sweeping across the four panels stacks roughly
   twelve concurrent long transitions.
2. **Property.** `flex-grow` is a layout property. Every animated frame forces
   the browser to re-lay-out the whole `.voices` row, not just composite it. The
   cost is bounded here (four panels), which is why this plan does not
   restructure the component — but it is the reason the duration must not stay
   long.

## Target

Bring all three transitions into the sub-300ms band. Keep `--ease-expo` on the
width itself (the long tail is what makes the expansion read as a physical
push), but shorten it.

```css
/* target — app/globals.css:2948 */
.voice {
  transition: flex-grow var(--dur-accordion) var(--ease-expo);
}

/* target — app/globals.css:2988 */
.voice-quote {
  transition: opacity var(--dur) var(--ease-out);
}

/* target — app/globals.css:3028 */
.voice::before {
  transition: opacity var(--dur-accordion) var(--ease-expo);
}
```

Add one token next to the existing duration scale and retire `--dur-expand`:

```css
/* target — app/globals.css, in the Motion block at :110-119 */
--dur-accordion: 260ms;  /* accordion slice expansion */
```

`260ms` sits inside the "dropdowns, selects: 150–250ms" band's upper edge,
which is the closest analogue to a panel that expands on hover, with a small
allowance because the travel distance here is much larger than a dropdown's.

## Repo conventions to follow

- All durations and easings are CSS custom properties declared once in the
  `Motion` block of `:root`, `app/globals.css:110-119`. Add `--dur-accordion`
  there, in the same `--dur-*` naming family, with a trailing comment in the
  same style as its neighbours.
- Exemplar of a correctly-scoped hover transition: `app/globals.css:664-668`
  (`.btn`), which lists each property explicitly at `--dur-fast`/`--dur` rather
  than using a blanket duration.
- `--dur-expand` is used **only** by the two rules above. Confirm with
  `grep -n "dur-expand" app/globals.css` before removing the token.

## Steps

1. In `app/globals.css`, in the Motion block (`:110-119`), replace the line
   `--dur-expand: 700ms;    /* accordion slice expansion */` with
   `--dur-accordion: 260ms; /* accordion slice expansion */`.
2. At `app/globals.css:2948`, change `var(--dur-expand)` to `var(--dur-accordion)`.
3. At `app/globals.css:2988`, change `var(--dur-surface)` to `var(--dur)` and
   `var(--ease-expo)` to `var(--ease-out)`. The quote is a plain fade, so it
   takes the standard entrance curve rather than the expo tail.
4. At `app/globals.css:3028`, change `var(--dur-expand)` to `var(--dur-accordion)`.
5. Run `grep -n "dur-expand" app/globals.css` and confirm zero matches.

## Boundaries

- Do NOT change `flex-grow` to another property or restructure `.voices` /
  `.voice` markup. The layout-property concern is documented, not actioned.
- Do NOT touch `app/page.js` — no markup or component changes.
- Do NOT change the `@media (max-width: 900px)` block at `app/globals.css:3039`,
  where the accordion collapses to stacked cards and the quotes are forced
  visible.
- Do NOT add dependencies.
- If the line numbers do not match what you find, STOP and report.

## Verification

- **Mechanical**: `npx next build` completes with no new errors.
  `grep -c "dur-expand" app/globals.css` returns `0`.
- **Feel check**: run `npm run dev`, open `/`, scroll to the "What clients say"
  section on a viewport wider than 900px, and confirm:
  - Moving the cursor across all four panels left-to-right, each panel settles
    before the cursor reaches the next one — no queue of still-growing panels
    trailing behind the pointer.
  - The resting-open second panel yields immediately when another is hovered;
    two panels are never both wide.
  - In DevTools → Animations, set playback speed to 10% and confirm the width
    change and the accent wash finish together, and the quote's fade finishes
    slightly before them.
  - In DevTools → Rendering, enable "Emulate prefers-reduced-motion: reduce" and
    confirm the panels snap between states with no visible travel, while the
    quote still changes opacity.
- **Done when**: no `--dur-expand` remains, the build passes, and a full
  left-to-right sweep of the row leaves no panel still animating.
