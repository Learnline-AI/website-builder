import { useEffect, useCallback, useState } from 'react'

export interface ShortcutConfig {
  key: string
  ctrl?: boolean
  meta?: boolean
  shift?: boolean
  alt?: boolean
  action: () => void
  description?: string
  enabled?: boolean
}

interface UseKeyboardShortcutsOptions {
  shortcuts: ShortcutConfig[]
  enabled?: boolean
}

export function useKeyboardShortcuts({ shortcuts, enabled = true }: UseKeyboardShortcutsOptions) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return

      // Don't trigger shortcuts when typing in inputs
      const target = event.target as HTMLElement
      const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable

      for (const shortcut of shortcuts) {
        if (shortcut.enabled === false) continue

        const keyMatches = event.key.toLowerCase() === shortcut.key.toLowerCase()
        const ctrlMatches = !!shortcut.ctrl === (event.ctrlKey || event.metaKey)
        const shiftMatches = !!shortcut.shift === event.shiftKey
        const altMatches = !!shortcut.alt === event.altKey

        // For single key shortcuts (like '/', '?', 'j', 'k'), skip if in input
        const isSingleKeyShortcut = !shortcut.ctrl && !shortcut.meta && !shortcut.alt

        if (keyMatches && ctrlMatches && shiftMatches && altMatches) {
          // Allow Escape to work even in inputs
          if (shortcut.key === 'Escape' || !isSingleKeyShortcut || !isInput) {
            event.preventDefault()
            shortcut.action()
            return
          }
        }
      }
    },
    [shortcuts, enabled]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])
}

// Hook for managing focused item index with j/k navigation
export function useListNavigation(itemCount: number, onSelect?: (index: number) => void) {
  const [focusedIndex, setFocusedIndex] = useState(-1)

  const moveUp = useCallback(() => {
    setFocusedIndex(prev => {
      const next = prev <= 0 ? itemCount - 1 : prev - 1
      onSelect?.(next)
      return next
    })
  }, [itemCount, onSelect])

  const moveDown = useCallback(() => {
    setFocusedIndex(prev => {
      const next = prev >= itemCount - 1 ? 0 : prev + 1
      onSelect?.(next)
      return next
    })
  }, [itemCount, onSelect])

  const reset = useCallback(() => {
    setFocusedIndex(-1)
  }, [])

  return {
    focusedIndex,
    setFocusedIndex,
    moveUp,
    moveDown,
    reset,
  }
}

// Global keyboard shortcuts configuration
export const GLOBAL_SHORTCUTS = {
  SEARCH: { key: '/', description: 'Open search' },
  SEARCH_CMD: { key: 'k', ctrl: true, description: 'Open search' },
  ESCAPE: { key: 'Escape', description: 'Close overlay/modal' },
  HELP: { key: '?', shift: true, description: 'Show keyboard shortcuts' },
  NAV_UP: { key: 'k', description: 'Navigate up' },
  NAV_DOWN: { key: 'j', description: 'Navigate down' },
  SELECT: { key: 'Enter', description: 'Select item' },
} as const
