import { ImageResponse } from 'next/og'
import { OG, SIZE, Card, LogoMark } from './og-brand'

export const alt = 'AppWeave Labs - Full-Stack Development Studio'
export const size = SIZE
export const contentType = 'image/png'

/* Left-aligned on purpose. The card was previously centred on every axis, which
   is the layout every generated OG card defaults to; it also left the three
   offerings as a pipe-separated run. Three zones now, matching the article and
   product cards, so the set reads as one family. */
export default function Image() {
  return new ImageResponse(
    (
      <Card>
        {/* Top: mark alone. The wordmark carries the bottom row, so repeating it
            here would say the name twice on one card. */}
        <div style={{ display: 'flex' }}>
          <LogoMark size={64} />
        </div>

        {/* Middle: the claim */}
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '900px' }}>
          <span
            style={{
              fontSize: '76px',
              fontWeight: 700,
              color: OG.text,
              letterSpacing: '-0.035em',
              lineHeight: 1.02,
            }}
          >
            AppWeave Labs
          </span>
          <span
            style={{
              fontSize: '30px',
              color: OG.textSoft,
              letterSpacing: '-0.01em',
              marginTop: '18px',
            }}
          >
            Full-stack studio. AI applications, mobile apps, and data platforms.
          </span>
        </div>

        {/* Bottom: domain, with the offerings set as spaced items rather than a
            pipe-delimited string. */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '32px', fontSize: '18px', color: OG.textMuted }}>
            <span>AI applications</span>
            <span>Mobile apps</span>
            <span>Data platforms</span>
          </div>
          <span style={{ fontSize: '18px', color: OG.textMuted }}>appweave.tech</span>
        </div>
      </Card>
    ),
    { ...SIZE }
  )
}
