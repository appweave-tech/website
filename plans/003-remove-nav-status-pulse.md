# 003 — Remove the perpetual pulse from the nav availability dot

- **Status**: DONE
- **Commit**: 540f5e4
- **Severity**: MEDIUM
- **Category**: Purpose & frequency
- **Estimated scope**: 1 file, ~2 lines

## Problem

The availability indicator in the navigation runs an infinite pulse animation.

```css
/* app/globals.css:824-830 — current */
.nav-status-dot {
  width: 6px;
  height: 6px;
  background: var(--accent-logo);
  border-radius: 50%;
  animation: pulse 2.4s ease-in-out infinite;
}
```

```css
/* app/globals.css:243-246 — the keyframes it uses */
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(0.9); }
}
```

The nav is persistent chrome. This dot is on screen on every page, for the whole
session, moving forever. An animation has to answer "why does this animate?" —
valid answers are spatial consistency, state indication, feedback, explanation,
or preventing a jarring change. The dot's job is state indication, and it
already does that job standing still: it is a red dot next to the words
"Available for new projects". The pulse adds no information and cannot be
dismissed.

This is a taste finding, not an accessibility one. The reduced-motion block at
`app/globals.css:2481-2485` already clamps `animation-iteration-count` to `1`
globally, so users who ask for reduced motion do not see it loop.

## Target

Delete the animation. Keep the dot, its size, its colour, and its layout
untouched.

```css
/* target — app/globals.css:824-829 */
.nav-status-dot {
  width: 6px;
  height: 6px;
  background: var(--accent-logo);
  border-radius: 50%;
}
```

The `@keyframes pulse` block at `app/globals.css:243-246` must be checked for
other consumers before removal — see Steps.

## Repo conventions to follow

- Keyframes are declared once, near the top of the file in the base block
  (`app/globals.css:243-271`), and referenced by name. Unused keyframes are not
  kept around; the file has no dead rules.
- Exemplar of a static state indicator with no motion: the status badges driven
  by `--status-live` / `--status-beta` / `--status-idle`
  (`app/globals.css:68-72`), which communicate state through colour alone.

## Steps

1. In `app/globals.css`, delete the line
   `animation: pulse 2.4s ease-in-out infinite;` from `.nav-status-dot`
   (`:830`). Leave the other four declarations in that rule unchanged.
2. Run `grep -n "animation: pulse\|pulse " app/globals.css` to find any other
   consumer of the `pulse` keyframes.
3. If step 2 returns no remaining `animation:` usage of `pulse`, delete the
   `@keyframes pulse { … }` block at `app/globals.css:243-246`. If it returns
   any other consumer, leave the keyframes in place and stop after step 1.

## Boundaries

- Do NOT remove or restyle the `.nav-status` text or the dot element itself.
  The indicator stays; only its motion goes.
- Do NOT touch `app/layout.js` — the markup at `:92-95` is unchanged.
- Do NOT touch the `@media (max-width: 1100px)` rule at `app/globals.css:820`
  that hides `.nav-status` on narrow viewports.
- Do NOT remove any other `@keyframes` block, in particular `shimmer` and
  `skeleton-fade`, which are load-state indicators and are correct as perpetual
  animations.
- Do NOT add dependencies.
- If the line numbers do not match what you find, STOP and report.

## Verification

- **Mechanical**: `npx next build` completes with no new errors.
  `grep -n "animation: pulse" app/globals.css` returns no matches.
- **Feel check**: run `npm run dev`, open any page at a viewport wider than
  1100px, and confirm:
  - The red dot beside "Available for new projects" is present, correctly
    sized, and completely still.
  - Watch the nav for ten seconds with the page idle — nothing in the chrome
    moves.
  - Below 1100px wide the status line is hidden entirely, as before.
- **Done when**: the build passes, the dot renders unchanged in size and colour,
  and no element in the navigation animates while the page is idle.
