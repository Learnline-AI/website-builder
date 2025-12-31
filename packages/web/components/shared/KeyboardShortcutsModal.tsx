import React, { useEffect, useState } from 'react'

interface KeyboardShortcutsModalProps {
  onClose: () => void
}

interface ShortcutGroup {
  title: string
  shortcuts: {
    keys: string[]
    description: string
  }[]
}

const shortcutGroups: ShortcutGroup[] = [
  {
    title: 'Navigation',
    shortcuts: [
      { keys: ['j'], description: 'Move to next component' },
      { keys: ['k'], description: 'Move to previous component' },
      { keys: ['Enter'], description: 'Select focused component' },
      { keys: ['Tab'], description: 'Navigate between elements' },
    ],
  },
  {
    title: 'Search',
    shortcuts: [
      { keys: ['/'], description: 'Open search' },
      { keys: ['Cmd', 'K'], description: 'Open search (alternative)' },
      { keys: ['Esc'], description: 'Close search' },
    ],
  },
  {
    title: 'General',
    shortcuts: [
      { keys: ['?'], description: 'Show keyboard shortcuts' },
      { keys: ['Esc'], description: 'Close modals and overlays' },
    ],
  },
  {
    title: 'Catalog View',
    shortcuts: [
      { keys: ['1-9'], description: 'Quick filter by category' },
      { keys: ['c'], description: 'Clear all filters' },
    ],
  },
]

export function KeyboardShortcutsModal({ onClose }: KeyboardShortcutsModalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return (
    <div
      className={`
        fixed inset-0 z-[200] flex items-center justify-center p-4
        transition-opacity duration-200
        ${mounted ? 'opacity-100' : 'opacity-0'}
      `}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`
          relative w-full max-w-2xl
          bg-neutral-900 rounded-2xl border border-white/10
          shadow-2xl shadow-black/50 overflow-hidden
          transition-all duration-300
          ${mounted ? 'scale-100 translate-y-0' : 'scale-95 -translate-y-4'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-indigo-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M6 12h.01M10 12h.01M14 12h.01M18 12h.01M6 16h12" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Keyboard Shortcuts</h2>
              <p className="text-sm text-white/50">Navigate faster with these shortcuts</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {shortcutGroups.map((group) => (
              <div key={group.title}>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-3">
                  {group.title}
                </h3>
                <div className="space-y-2">
                  {group.shortcuts.map((shortcut, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <span className="text-white/70 text-sm">{shortcut.description}</span>
                      <div className="flex items-center gap-1">
                        {shortcut.keys.map((key, keyIndex) => (
                          <React.Fragment key={keyIndex}>
                            {keyIndex > 0 && <span className="text-white/30 text-xs">+</span>}
                            <kbd className="min-w-[24px] px-2 py-1 rounded bg-neutral-800 border border-white/10 text-white/80 text-xs font-mono text-center">
                              {key}
                            </kbd>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-white/5">
          <p className="text-xs text-white/40 text-center">
            Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 mx-1">Esc</kbd> or click outside to close
          </p>
        </div>
      </div>
    </div>
  )
}
