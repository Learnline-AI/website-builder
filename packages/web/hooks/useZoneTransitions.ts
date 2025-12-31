import { useEffect, useState, useRef, useCallback } from 'react'

interface ZoneVisibility {
  zoneId: string
  isVisible: boolean
  intersectionRatio: number
  isEntering: boolean
  isLeaving: boolean
}

interface UseZoneTransitionsOptions {
  threshold?: number[]
  rootMargin?: string
  onZoneChange?: (zoneId: string, prevZoneId: string | null) => void
}

export function useZoneTransitions(options: UseZoneTransitionsOptions = {}) {
  const {
    threshold = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    rootMargin = '0px',
    onZoneChange,
  } = options

  const [visibleZones, setVisibleZones] = useState<Map<string, ZoneVisibility>>(new Map())
  const [activeZone, setActiveZone] = useState<string | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [transitionProgress, setTransitionProgress] = useState(0)
  const prevZoneRef = useRef<string | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const registerZone = useCallback((element: HTMLElement | null, zoneId: string) => {
    if (!element || !observerRef.current) return

    element.setAttribute('data-zone', zoneId)
    observerRef.current.observe(element)

    return () => {
      observerRef.current?.unobserve(element)
    }
  }, [])

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const newVisibleZones = new Map(visibleZones)
        let highestRatio = 0
        let mostVisibleZone: string | null = null

        entries.forEach((entry) => {
          const zoneId = entry.target.getAttribute('data-zone')
          if (!zoneId) return

          const prevState = newVisibleZones.get(zoneId)
          const wasVisible = prevState?.isVisible ?? false

          newVisibleZones.set(zoneId, {
            zoneId,
            isVisible: entry.isIntersecting,
            intersectionRatio: entry.intersectionRatio,
            isEntering: !wasVisible && entry.isIntersecting,
            isLeaving: wasVisible && !entry.isIntersecting,
          })

          if (entry.intersectionRatio > highestRatio && entry.isIntersecting) {
            highestRatio = entry.intersectionRatio
            mostVisibleZone = zoneId
          }
        })

        setVisibleZones(newVisibleZones)

        // Update active zone when visibility changes significantly
        if (mostVisibleZone && highestRatio > 0.3) {
          if (mostVisibleZone !== activeZone) {
            const prevZone = prevZoneRef.current
            prevZoneRef.current = mostVisibleZone
            setActiveZone(mostVisibleZone)
            onZoneChange?.(mostVisibleZone, prevZone)
          }
        }

        // Update transition progress
        setTransitionProgress(highestRatio)
      },
      { threshold, rootMargin }
    )

    return () => {
      observerRef.current?.disconnect()
    }
  }, [threshold, rootMargin, onZoneChange, activeZone, visibleZones])

  // Track overall scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const container = document.querySelector('.zone-snap')
      if (!container) return

      const scrollTop = container.scrollTop
      const scrollHeight = container.scrollHeight - container.clientHeight
      const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0
      setScrollProgress(progress)
    }

    const container = document.querySelector('.zone-snap')
    container?.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      container?.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return {
    visibleZones,
    activeZone,
    scrollProgress,
    transitionProgress,
    registerZone,
  }
}

// Hook for individual zone animation state
export function useZoneAnimation(_zoneId: string, isVisible: boolean, intersectionRatio: number) {
  const [animationState, setAnimationState] = useState<'hidden' | 'entering' | 'visible' | 'leaving'>('hidden')
  const prevVisibleRef = useRef(isVisible)

  useEffect(() => {
    if (isVisible && !prevVisibleRef.current) {
      setAnimationState('entering')
      const timer = setTimeout(() => setAnimationState('visible'), 600)
      return () => clearTimeout(timer)
    } else if (!isVisible && prevVisibleRef.current) {
      setAnimationState('leaving')
      const timer = setTimeout(() => setAnimationState('hidden'), 600)
      return () => clearTimeout(timer)
    } else if (isVisible) {
      setAnimationState('visible')
    }

    prevVisibleRef.current = isVisible
  }, [isVisible])

  // Calculate animation values based on intersection ratio
  const opacity = Math.min(1, intersectionRatio * 2)
  const translateY = (1 - intersectionRatio) * 30
  const scale = 0.95 + intersectionRatio * 0.05

  return {
    animationState,
    opacity,
    translateY,
    scale,
    isAnimating: animationState === 'entering' || animationState === 'leaving',
  }
}

// Hook for parallax effect
export function useParallax(scrollProgress: number, speed: number = 0.5) {
  const translateY = scrollProgress * 100 * speed
  return { translateY }
}
