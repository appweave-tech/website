/* Mirrors app/careers/page.js: .job-grid columns, and job cards carry no image. */
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
        <div className="skeleton-grid skeleton-grid--jobs" aria-hidden="true">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="skeleton-card">
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
