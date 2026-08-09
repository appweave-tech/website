/* Shared brand surface for the three OG cards (/, /blog/[slug], /products/[slug]).
   The logo mark and palette used to be copy-pasted into each one, so a brand
   change meant three edits and the three cards had already drifted apart.

   Values mirror the dark-theme tokens in globals.css. Kept as literals rather
   than reading the stylesheet because satori resolves no custom properties. */
export const OG = {
  bg: '#0c0a0a',        /* --bg-primary */
  surface: '#191515',   /* --bg-card */
  border: '#2a2323',    /* --border */
  text: '#faf8f7',      /* --text-primary */
  textSoft: '#a8a09e',  /* --text-secondary */
  textMuted: '#877e7b', /* --text-muted, 5.9:1 on bg. The cards previously used
                           #444444 here, which is 2.6:1 and illegible at the
                           thumbnail size these are actually viewed at. */
  accent: '#e97060',    /* --accent */
  accentLogo: '#cc2411',/* --accent-logo */
}

export const SIZE = { width: 1200, height: 630 }

/* Off-axis radial washes, the same ambient treatment the hero uses, instead of
   the flat 135deg linear fade the cards shipped with. Rendered as stacked
   absolute layers rather than a multi-value `background` shorthand, because
   satori's shorthand parsing is narrower than a browser's.

   Carried at roughly 3x the alpha the hero uses. The hero's wash spans a whole
   viewport, where 12% reads; these cards are looked at 300px wide in a feed, and
   at that size the same value renders as flat near-black. */
/* Explicit width/height and `backgroundImage`, not inset shorthand and
   `background`. Satori ignores gradients passed through the `background`
   shorthand and does not resolve an absolute box from insets alone, so the
   first cut of this rendered nothing and the cards came out flat. */
const LAYER = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: `${SIZE.width}px`,
  height: `${SIZE.height}px`,
}

export function Washes() {
  return (
    <>
      <div
        style={{
          ...LAYER,
          backgroundImage: `radial-gradient(circle at 8% -6%, ${OG.accentLogo}4d 0%, ${OG.accentLogo}00 48%)`,
        }}
      />
      <div
        style={{
          ...LAYER,
          backgroundImage: `radial-gradient(circle at 95% 6%, ${OG.accent}26 0%, ${OG.accent}00 42%)`,
        }}
      />
      {/* Settles the lower half so the washes read as light falling from above
          rather than as two stray blooms. */}
      <div
        style={{
          ...LAYER,
          backgroundImage: `radial-gradient(circle at 50% 118%, ${OG.bg}ff 0%, ${OG.bg}00 60%)`,
        }}
      />
    </>
  )
}

/* viewBox is square and the paths are absolute, so `size` scales both axes. */
export function LogoMark({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 163 163">
      <path fill={OG.accentLogo} d="M66.95,154.12c4.67-4.68,8.49-8.9,8.49-9.38s-3.67-4.58-8.16-9.11c-6.3-6.37-8.53-8.24-9.77-8.24s-3.47,1.88-9.77,8.24c-4.49,4.53-8.16,8.64-8.16,9.13,0,1.18,16.76,17.87,17.95,17.87.51,0,4.75-3.83,9.42-8.51Z" />
      <path fill={OG.accentLogo} d="M46.83,95.08c15.4-15.39,28.17-28.5,28.37-29.14.28-.9-1.59-3.13-8.19-9.74-4.71-4.72-8.98-8.58-9.5-8.58-1.22,0-57.51,56.3-57.51,57.52s16.73,17.92,17.92,17.92c.5,0,13.51-12.59,28.91-27.98Z" />
      <path fill={OG.accentLogo} d="M134.34,86.72c15.56-15.56,28.29-28.71,28.29-29.23,0-1.2-16.73-17.92-17.92-17.92-1.11,0-56.77,55.5-57.28,57.12-.28.9,1.59,3.13,8.19,9.74,4.71,4.72,8.98,8.58,9.5,8.58s13.67-12.73,29.23-28.29Z" />
      <path fill={OG.accentLogo} d="M114.89,27c4.49-4.53,8.16-8.64,8.16-9.13,0-1.18-16.76-17.87-17.95-17.87s-17.92,16.72-17.92,17.89c0,.48,3.67,4.58,8.16,9.11,6.3,6.37,8.53,8.24,9.77,8.24s3.47-1.88,9.77-8.24Z" />
      <path fill={OG.text} d="M114.52,154.75c4.38-4.33,8.13-8.54,8.33-9.34.32-1.28-3.19-5.02-28-29.84-18.15-18.15-28.81-28.38-29.59-28.38-1.88,0-17.65,16.04-17.65,17.95,0,2.18,55.29,57.49,57.46,57.49,1.07,0,3.69-2.18,9.45-7.88Z" />
      <path fill={OG.text} d="M154.41,114.84c5.93-5.93,8.22-8.63,8.22-9.69,0-1.78-14.94-17.19-17.22-17.76-1.25-.31-2.72.9-10.05,8.21-4.73,4.72-8.59,9-8.59,9.52,0,1.41,16.79,17.93,18.22,17.93.72,0,4.51-3.3,9.42-8.22Z" />
      <path fill={OG.text} d="M106.8,67.22c6.07-6.07,8.22-8.62,8.22-9.73C115.02,55.31,59.73,0,57.55,0c-1.8,0-17.2,14.92-17.78,17.22-.32,1.28,3.19,5.03,28,29.84,18.15,18.15,28.81,28.38,29.59,28.38.73,0,4.47-3.25,9.43-8.22Z" />
      <path fill={OG.text} d="M27.37,66.93c4.67-4.68,8.49-8.93,8.49-9.44s-3.87-4.79-8.59-9.5c-7.33-7.32-8.81-8.52-10.05-8.21-2.28.57-17.22,15.98-17.22,17.76,0,1.87,15.81,17.91,17.66,17.91.74,0,4.54-3.32,9.71-8.51Z" />
    </svg>
  )
}

/* Wordmark lockup used in the footer row of the article and product cards. */
export function Wordmark({ mark = 40, type = 24 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <LogoMark size={mark} />
      <span style={{ fontSize: `${type}px`, fontWeight: 700, color: OG.text, letterSpacing: '-0.03em' }}>
        AppWeave Labs
      </span>
    </div>
  )
}

/* Shared card shell: warm base, ambient washes, and a hairline accent rule along
   the top edge so the card reads as a branded surface at thumbnail size. */
export function Card({ children, padding = '60px' }) {
  return (
    /* Two boxes on purpose. Satori resolves `position: absolute` against the
       padding box, so washes and the top rule parented to a padded element get
       inset by that padding and leave a visible unpainted band down two edges.
       The wrapper carries no padding and owns every absolute layer; the inner
       box carries the padding and the content. */
    <div
      style={{
        width: `${SIZE.width}px`,
        height: `${SIZE.height}px`,
        display: 'flex',
        position: 'relative',
        background: OG.bg,
        fontFamily: 'sans-serif',
      }}
    >
      <Washes />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: `${SIZE.width}px`,
          height: '4px',
          background: OG.accentLogo,
        }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
          padding,
        }}
      >
        {children}
      </div>
    </div>
  )
}
