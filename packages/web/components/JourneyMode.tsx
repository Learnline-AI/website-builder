import { useEffect, useRef, useState, useCallback, useMemo, memo } from 'react'
import { useApp } from '../App'
import { zones, Zone } from '../data/zones'
import { getComponentsByZone } from '../data/registry'
import { ComponentCard } from './shared/ComponentCard'

// Particle configuration per zone type
const getParticleConfig = (zone: Zone) => {
  const configs: Record<string, { count: number; color: string; glow: boolean; speed: 'slow' | 'medium' | 'fast' }> = {
    'arcade-basement': { count: 15, color: zone.accentColor, glow: true, speed: 'medium' },
    'hacker-terminal': { count: 20, color: '#00ff00', glow: true, speed: 'fast' },
    'mad-science': { count: 12, color: zone.accentColor, glow: true, speed: 'slow' },
    'cosmic-observatory': { count: 25, color: '#ffffff', glow: true, speed: 'slow' },
    'cyberpunk-district': { count: 18, color: zone.accentColor, glow: true, speed: 'medium' },
    'space-station': { count: 20, color: zone.accentColor, glow: true, speed: 'slow' },
    'underwater-depths': { count: 15, color: zone.accentColor, glow: true, speed: 'slow' },
  }
  return configs[zone.id] || { count: 8, color: zone.accentColor, glow: false, speed: 'medium' }
}

// Ambient Particles Component
const AmbientParticles = memo(function AmbientParticles({ zone, isVisible }: { zone: Zone; isVisible: boolean }) {
  const config = getParticleConfig(zone)

  const particles = useMemo(() => {
    return Array.from({ length: config.count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 10}s`,
      duration: config.speed === 'slow' ? '20s' : config.speed === 'fast' ? '8s' : '12s',
      size: Math.random() * 4 + 2,
    }))
  }, [config.count, config.speed])

  if (!isVisible) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={config.glow ? 'zone-particle-glow' : 'zone-particle'}
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            color: config.color,
            backgroundColor: config.color,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
            opacity: 0.6,
          }}
        />
      ))}
    </div>
  )
})

// Portal Transition Overlay
const PortalTransition = memo(function PortalTransition({
  isActive,
  fromColor,
  toColor
}: {
  isActive: boolean
  fromColor: string
  toColor: string
}) {
  if (!isActive) return null

  return (
    <div
      className="fixed inset-0 z-30 pointer-events-none zone-portal-enter"
      style={{
        background: `radial-gradient(circle at 50% 50%, ${toColor} 0%, ${fromColor} 100%)`,
      }}
      aria-hidden="true"
    />
  )
})

// Zone Progress Indicator with enhanced visuals
const ZoneProgressIndicator = memo(function ZoneProgressIndicator({
  scrollProgress,
  currentZoneIndex,
}: {
  scrollProgress: number
  currentZoneIndex: number
}) {
  const { setCurrentZone, announce } = useApp()

  return (
    <nav
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center"
      aria-label="Zone navigation"
      role="navigation"
    >
      {/* Progress line background */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-0.5 rounded-full"
        style={{
          top: 0,
          height: `${(zones.length - 1) * 24 + 12}px`,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
        }}
        aria-hidden="true"
      >
        {/* Animated progress fill */}
        <div
          className="absolute top-0 left-0 w-full rounded-full transition-all duration-300 ease-out"
          style={{
            height: `${(currentZoneIndex / (zones.length - 1)) * 100}%`,
            background: `linear-gradient(180deg, ${zones[0]?.accentColor || '#fff'}, ${zones[currentZoneIndex]?.accentColor || '#fff'})`,
          }}
        />
      </div>

      {/* Zone dots */}
      <div className="flex flex-col gap-3 relative z-10">
        {zones.map((zone, index) => {
          const isActive = index === currentZoneIndex
          const isPast = index < currentZoneIndex

          return (
            <button
              key={zone.id}
              onClick={() => {
                setCurrentZone(zone.id)
                document.getElementById(zone.id)?.scrollIntoView({ behavior: 'smooth' })
                announce(`Navigated to ${zone.name} zone`)
              }}
              className={`
                group relative transition-all duration-400 ease-out
                focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900
              `}
              style={{ color: zone.accentColor }}
              aria-label={`Navigate to ${zone.name} zone${isActive ? ' (current)' : ''}`}
              aria-current={isActive ? 'true' : undefined}
            >
              {/* Outer ring (active state) */}
              <div
                className={`
                  absolute -inset-1 rounded-full border-2 transition-all duration-300
                  ${isActive ? 'opacity-60 scale-100' : 'opacity-0 scale-75'}
                `}
                style={{ borderColor: zone.accentColor }}
                aria-hidden="true"
              />

              {/* Main dot */}
              <div
                className={`
                  w-3 h-3 rounded-full transition-all duration-300
                  ${isActive ? 'scale-125' : isPast ? 'scale-100' : 'scale-75 opacity-40'}
                  hover:scale-125 hover:opacity-100
                `}
                style={{
                  backgroundColor: isActive || isPast ? zone.accentColor : 'rgba(255,255,255,0.3)',
                  boxShadow: isActive ? `0 0 12px ${zone.accentColor}, 0 0 24px ${zone.accentColor}40` : 'none',
                }}
              />

              {/* Tooltip */}
              <span
                className="absolute right-8 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-black/90 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none backdrop-blur-sm border border-white/10"
                aria-hidden="true"
              >
                <span className="font-mono text-[10px] opacity-50 mr-2">{String(index + 1).padStart(2, '0')}</span>
                {zone.name}
              </span>
            </button>
          )
        })}
      </div>

      {/* Overall progress percentage */}
      <div
        className="mt-4 text-xs font-mono opacity-50 text-white"
        aria-label={`${Math.round(scrollProgress * 100)}% progress through zones`}
      >
        {Math.round(scrollProgress * 100)}%
      </div>
    </nav>
  )
})

// Zone Section Component with visibility-based animations
interface ZoneSectionProps {
  zone: Zone
  index: number
  isVisible: boolean
  intersectionRatio: number
  onVisibilityChange: (zoneId: string, isVisible: boolean, ratio: number) => void
}

const ZoneSection = memo(function ZoneSection({
  zone,
  index,
  isVisible,
  intersectionRatio,
  onVisibilityChange,
}: ZoneSectionProps) {
  const { setSelectedComponent } = useApp()
  const components = getComponentsByZone(zone.id)
  const sectionRef = useRef<HTMLElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  // Intersection observer for this section
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          onVisibilityChange(zone.id, entry.isIntersecting, entry.intersectionRatio)
          if (entry.isIntersecting && entry.intersectionRatio > 0.2 && !hasAnimated) {
            setHasAnimated(true)
          }
        })
      },
      { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [zone.id, onVisibilityChange, hasAnimated])

  // Get font family class
  const getFontClass = () => {
    switch (zone.fontFamily) {
      case 'arcade': return 'font-arcade'
      case 'pulp': return 'font-pulp'
      case 'mono': return 'font-mono'
      case 'hand': return 'font-hand'
      case 'display': return 'font-display'
      default: return 'font-body'
    }
  }

  // Calculate animation styles based on visibility
  const contentOpacity = Math.min(1, intersectionRatio * 2.5)
  const contentTranslateY = (1 - Math.min(1, intersectionRatio * 2)) * 40
  const contentScale = 0.95 + Math.min(1, intersectionRatio * 2) * 0.05

  return (
    <section
      ref={sectionRef}
      id={zone.id}
      data-zone={zone.id}
      className="zone-section min-h-screen flex flex-col justify-center relative overflow-hidden"
      style={{
        '--zone-accent': zone.accentColor,
        '--zone-bg': zone.bgColor,
      } as React.CSSProperties}
    >
      {/* Parallax background layer */}
      <div
        className="zone-parallax-bg absolute inset-0 pointer-events-none"
        style={{
          background: zone.gradient || zone.bgColor,
          transform: `translateY(${(1 - intersectionRatio) * -30}px)`,
        }}
        aria-hidden="true"
      />

      {/* Ambient particles */}
      <AmbientParticles zone={zone} isVisible={isVisible && intersectionRatio > 0.3} />

      {/* Main content with entrance animation */}
      <div
        className="relative z-10 pt-32 pb-20 px-6 md:px-12 lg:px-20"
        style={{
          opacity: contentOpacity,
          transform: `translateY(${contentTranslateY}px) scale(${contentScale})`,
          transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Zone header */}
        <div className="max-w-[1600px] mx-auto w-full mb-12">
          <div className="flex items-start gap-6 mb-6">
            {/* Zone number with glow effect */}
            <div
              className="hidden md:flex items-center justify-center w-16 h-16 rounded-2xl text-2xl font-display font-bold shrink-0 transition-all duration-300"
              style={{
                backgroundColor: `${zone.accentColor}20`,
                color: zone.accentColor,
                border: `2px solid ${zone.accentColor}40`,
                boxShadow: isVisible ? `0 0 30px ${zone.accentColor}30` : 'none',
                transform: `scale(${hasAnimated ? 1 : 0.8})`,
                opacity: hasAnimated ? 1 : 0,
              }}
            >
              {String(index + 1).padStart(2, '0')}
            </div>

            <div className="flex-1">
              <h2
                className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-3 ${getFontClass()} transition-all duration-700`}
                style={{
                  color: zone.textColor,
                  transform: `translateX(${hasAnimated ? 0 : -20}px)`,
                  opacity: hasAnimated ? 1 : 0,
                  transitionDelay: '100ms',
                }}
              >
                {zone.name}
              </h2>
              <p
                className="text-lg md:text-xl opacity-70 italic transition-all duration-700"
                style={{
                  color: zone.textColor,
                  transform: `translateX(${hasAnimated ? 0 : -20}px)`,
                  opacity: hasAnimated ? 0.7 : 0,
                  transitionDelay: '200ms',
                }}
              >
                {zone.subtitle}
              </p>
            </div>
          </div>

          {/* Zone description with fade-in */}
          <p
            className="max-w-2xl text-base md:text-lg leading-relaxed transition-all duration-700"
            style={{
              color: zone.textColor,
              opacity: hasAnimated ? 0.8 : 0,
              transform: `translateY(${hasAnimated ? 0 : 10}px)`,
              transitionDelay: '300ms',
            }}
          >
            {zone.description}
          </p>

          {/* Component count badge */}
          <div
            className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-300"
            style={{
              backgroundColor: `${zone.accentColor}15`,
              color: zone.accentColor,
              border: `1px solid ${zone.accentColor}30`,
              transform: `translateY(${hasAnimated ? 0 : 10}px)`,
              opacity: hasAnimated ? 1 : 0,
              transitionDelay: '400ms',
            }}
          >
            <span className="font-mono font-bold">{components.length}</span>
            <span>components</span>
          </div>
        </div>

        {/* Component grid with staggered entrance */}
        <div className="max-w-[1600px] mx-auto w-full flex-1">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 zone-component-grid">
            {components.map((component, i) => (
              <div
                key={component.id}
                className="zone-component-card"
                style={{
                  opacity: hasAnimated ? 1 : 0,
                  transform: hasAnimated ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
                  transitionDelay: hasAnimated ? `${500 + i * 50}ms` : '0ms',
                }}
              >
                <ComponentCard
                  component={component}
                  zone={zone}
                  index={i}
                  onClick={() => setSelectedComponent(component.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll hint (only on first zone) */}
      {index === 0 && (
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-1000"
          style={{ opacity: intersectionRatio > 0.8 ? 1 : 0 }}
        >
          <span
            className="text-xs uppercase tracking-widest opacity-50"
            style={{ color: zone.textColor }}
          >
            Scroll to explore
          </span>
          <svg
            className="w-5 h-5 opacity-50 animate-bounce"
            style={{ color: zone.textColor }}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      )}

      {/* Zone transition divider */}
      {index < zones.length - 1 && (
        <ZoneDivider
          currentZone={zone}
          nextZone={zones[index + 1]}
          isVisible={intersectionRatio < 0.5}
        />
      )}
    </section>
  )
})

// Zone Divider with portal effect
const ZoneDivider = memo(function ZoneDivider({
  currentZone,
  nextZone,
  isVisible
}: {
  currentZone: Zone
  nextZone: Zone
  isVisible: boolean
}) {
  return (
    <div
      className="zone-divider absolute bottom-0 left-0 right-0 transition-opacity duration-300"
      style={{
        opacity: isVisible ? 1 : 0,
        '--zone-accent': currentZone.accentColor,
        '--zone-bg': currentZone.bgColor,
      } as React.CSSProperties}
      aria-hidden="true"
    >
      {/* Gradient blend between zones */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, transparent 0%, ${currentZone.bgColor} 30%, ${nextZone.bgColor} 70%, transparent 100%)`,
          opacity: 0.5,
        }}
      />

      {/* Center portal icon */}
      <div
        className="zone-divider-icon"
        style={{
          background: `linear-gradient(135deg, ${currentZone.bgColor}, ${nextZone.bgColor})`,
          borderColor: `${currentZone.accentColor}50`,
        }}
      >
        <svg
          className="w-5 h-5 transition-transform duration-300"
          style={{ color: currentZone.accentColor }}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" strokeOpacity="0.5" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      </div>
    </div>
  )
})

// Main Journey Mode Component
export function JourneyMode() {
  const { setCurrentZone, currentZone } = useApp()
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [zoneVisibility, setZoneVisibility] = useState<Map<string, { isVisible: boolean; ratio: number }>>(new Map())
  const [isTransitioning, setIsTransitioning] = useState(false)
  const prevZoneRef = useRef<string | null>(null)

  // Handle scroll progress
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollTop = container.scrollTop
      const scrollHeight = container.scrollHeight - container.clientHeight
      const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0
      setScrollProgress(progress)
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle zone visibility changes
  const handleVisibilityChange = useCallback((zoneId: string, isVisible: boolean, ratio: number) => {
    setZoneVisibility(prev => {
      const next = new Map(prev)
      next.set(zoneId, { isVisible, ratio })
      return next
    })

    // Update current zone when visibility is significant
    if (isVisible && ratio > 0.3) {
      if (zoneId !== currentZone) {
        // Trigger transition effect
        if (prevZoneRef.current && prevZoneRef.current !== zoneId) {
          setIsTransitioning(true)
          setTimeout(() => setIsTransitioning(false), 800)
        }
        prevZoneRef.current = zoneId
        setCurrentZone(zoneId)
      }
    }
  }, [currentZone, setCurrentZone])

  // Get current zone index
  const currentZoneIndex = zones.findIndex(z => z.id === currentZone)
  const currentZoneData = zones[currentZoneIndex] || zones[0]
  const prevZoneData = prevZoneRef.current ? zones.find(z => z.id === prevZoneRef.current) : null

  return (
    <div
      ref={containerRef}
      className="zone-snap h-screen overflow-y-auto relative"
    >
      {/* Global transition overlay for zone changes */}
      <PortalTransition
        isActive={isTransitioning}
        fromColor={prevZoneData?.bgColor || '#000'}
        toColor={currentZoneData.bgColor}
      />

      {/* Zone sections */}
      {zones.map((zone, index) => {
        const visibility = zoneVisibility.get(zone.id) || { isVisible: false, ratio: 0 }
        return (
          <ZoneSection
            key={zone.id}
            zone={zone}
            index={index}
            isVisible={visibility.isVisible}
            intersectionRatio={visibility.ratio}
            onVisibilityChange={handleVisibilityChange}
          />
        )
      })}

      {/* Enhanced zone progress indicator */}
      <ZoneProgressIndicator
        scrollProgress={scrollProgress}
        currentZoneIndex={currentZoneIndex >= 0 ? currentZoneIndex : 0}
      />
    </div>
  )
}
