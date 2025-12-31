/**
 * SkipLink
 *
 * A skip link component that allows keyboard users to skip directly to main content.
 * The link is visually hidden until focused, following accessibility best practices.
 */

export function SkipLink() {
  return (
    <div className="skip-links">
      <a
        href="#main-content"
        className="
          sr-only focus:not-sr-only
          fixed top-4 left-4 z-[200]
          px-4 py-3
          bg-indigo-600 text-white font-medium
          rounded-lg shadow-lg
          focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-neutral-900
          transition-transform duration-200
          focus:translate-y-0
          -translate-y-20
        "
        onClick={(e) => {
          e.preventDefault()
          const mainContent = document.getElementById('main-content')
          if (mainContent) {
            mainContent.focus()
            mainContent.scrollIntoView({ behavior: 'smooth' })
          }
        }}
      >
        Skip to main content
      </a>
      <a
        href="#navigation"
        className="
          sr-only focus:not-sr-only
          fixed top-4 left-52 z-[200]
          px-4 py-3
          bg-indigo-600 text-white font-medium
          rounded-lg shadow-lg
          focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-neutral-900
          transition-transform duration-200
          focus:translate-y-0
          -translate-y-20
        "
        onClick={(e) => {
          e.preventDefault()
          const nav = document.querySelector('nav[aria-label="Main navigation"]') as HTMLElement
          if (nav) {
            const firstFocusable = nav.querySelector('a, button') as HTMLElement
            firstFocusable?.focus()
          }
        }}
      >
        Skip to navigation
      </a>
    </div>
  )
}
