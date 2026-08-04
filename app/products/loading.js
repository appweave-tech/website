/* Mirrors app/products/page.js: .product-grid columns and a 16:9 cover image. */
export default function Loading() {
  return (
    <div className="section page-offset" aria-busy="true">
      <div className="section-container">
        <span className="visually-hidden" role="status">Loading</span>
        <div className="skeleton-header" aria-hidden="true">
          <div className="skeleton skeleton-line" />
          <div className="skeleton skeleton-heading" />
          <div className="skeleton skeleton-line" />
        </div>
        <div className="skeleton-grid skeleton-grid--products" aria-hidden="true">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="skeleton-card">
              <div className="skeleton skeleton-media skeleton-media--wide" />
              <div className="skeleton skeleton-line" />
              <div className="skeleton skeleton-line" />
              <div className="skeleton skeleton-line" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
