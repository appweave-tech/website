/* Mirrors app/blog/page.js: a full-width lead card above a 2-column grid. */
export default function Loading() {
  return (
    <div className="blog-page" aria-busy="true">
      <div className="section-container">
        <span className="visually-hidden" role="status">Loading</span>
        <div className="skeleton-header" aria-hidden="true">
          <div className="skeleton skeleton-line" />
          <div className="skeleton skeleton-heading" />
          <div className="skeleton skeleton-line" />
        </div>
        <div className="skeleton-grid skeleton-grid--blog" aria-hidden="true">
          <div className="skeleton-lead">
            <div className="skeleton skeleton-media skeleton-media--lead" />
            <div className="skeleton-card">
              <div className="skeleton skeleton-line" />
              <div className="skeleton skeleton-heading" />
              <div className="skeleton skeleton-line" />
            </div>
          </div>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="skeleton-card">
              <div className="skeleton skeleton-media" />
              <div className="skeleton skeleton-line" />
              <div className="skeleton skeleton-line" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
