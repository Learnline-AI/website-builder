/**
 * LiveRegion
 *
 * An ARIA live region component for announcing dynamic content changes to screen readers.
 * Supports both polite and assertive announcements.
 */

interface LiveRegionProps {
  message: string
  priority?: 'polite' | 'assertive'
}

export function LiveRegion({ message, priority = 'polite' }: LiveRegionProps) {
  return (
    <>
      {/* Polite announcements - for non-urgent updates */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {priority === 'polite' ? message : ''}
      </div>

      {/* Assertive announcements - for urgent updates */}
      <div
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        className="sr-only"
      >
        {priority === 'assertive' ? message : ''}
      </div>
    </>
  )
}
