/**
 * useFocusTrap
 *
 * A React hook that traps focus within a container element.
 * Essential for modal dialogs to ensure keyboard users can't tab out.
 */

import { useEffect, useRef, useCallback } from 'react'

interface UseFocusTrapOptions {
  /** Whether the trap is currently active */
  enabled?: boolean
  /** Element that triggered the modal (for focus restoration) */
  triggerElement?: HTMLElement | null
  /** Callback when focus should return to trigger */
  onEscape?: () => void
}

const FOCUSABLE_SELECTORS = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable]',
  'audio[controls]',
  'video[controls]',
  'details > summary',
].join(', ')

export function useFocusTrap<T extends HTMLElement = HTMLDivElement>(
  options: UseFocusTrapOptions = {}
) {
  const { enabled = true, triggerElement, onEscape } = options
  const containerRef = useRef<T>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)

  // Store the previously focused element
  useEffect(() => {
    if (enabled) {
      previousActiveElement.current = triggerElement || (document.activeElement as HTMLElement)
    }
  }, [enabled, triggerElement])

  // Get all focusable elements within the container
  const getFocusableElements = useCallback(() => {
    if (!containerRef.current) return []
    const elements = containerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS)
    return Array.from(elements).filter(
      (el) => !el.hasAttribute('disabled') && el.offsetParent !== null
    )
  }, [])

  // Focus the first element when trap is enabled
  useEffect(() => {
    if (!enabled || !containerRef.current) return

    // Small delay to ensure the container is rendered
    const timeoutId = setTimeout(() => {
      const focusableElements = getFocusableElements()
      if (focusableElements.length > 0) {
        focusableElements[0].focus()
      } else {
        // If no focusable elements, focus the container itself
        containerRef.current?.focus()
      }
    }, 10)

    return () => clearTimeout(timeoutId)
  }, [enabled, getFocusableElements])

  // Handle keyboard navigation
  useEffect(() => {
    if (!enabled) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onEscape?.()
        return
      }

      if (event.key !== 'Tab') return

      const focusableElements = getFocusableElements()
      if (focusableElements.length === 0) return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      // Shift + Tab: if on first element, go to last
      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault()
          lastElement.focus()
        }
      } else {
        // Tab: if on last element, go to first
        if (document.activeElement === lastElement) {
          event.preventDefault()
          firstElement.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [enabled, getFocusableElements, onEscape])

  // Restore focus when trap is disabled
  useEffect(() => {
    return () => {
      if (previousActiveElement.current && previousActiveElement.current.isConnected) {
        // Small delay to ensure the modal is fully closed
        setTimeout(() => {
          previousActiveElement.current?.focus()
        }, 10)
      }
    }
  }, [])

  return {
    containerRef,
    getFocusableElements,
  }
}
