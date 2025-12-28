import React, { useEffect, useRef } from 'react'
import { useApp } from '../App'
import { zones } from '../data/zones'
import { getComponentsByZone } from '../data/registry'
import { ComponentCard } from './shared/ComponentCard'

export function JourneyMode() {
  const { setCurrentZone } = useApp()
  const containerRef = useRef<HTMLDivElement>(null)

  // Intersection observer to track current zone
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            const zoneId = entry.target.getAttribute('data-zone')
            if (zoneId) setCurrentZone(zoneId)
          }
        })
      },
      { threshold: [0.3, 0.5, 0.7] }
    )

    const sections = document.querySelectorAll('.zone-section')
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [setCurrentZone])

  return (
    <div
      ref={containerRef}
      className="zone-snap h-screen overflow-y-auto"
    >
      {zones.map((zone, index) => (
        <ZoneSection key={zone.id} zone={zone} index={index} />
      ))}
    </div>
  )
}

interface ZoneSectionProps {
  zone: typeof zones[0]
  index: number
}

function ZoneSection({ zone, index }: ZoneSectionProps) {
  const { setSelectedComponent } = useApp()
  const components = getComponentsByZone(zone.id)

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

  return (
    <section
      id={zone.id}
      data-zone={zone.id}
      className="zone-section min-h-screen flex flex-col pt-32 pb-20 px-6 md:px-12 lg:px-20"
    >
      {/* Zone header */}
      <div className="max-w-[1600px] mx-auto w-full mb-12">
        <div className="flex items-start gap-6 mb-6">
          {/* Zone number */}
          <div
            className="hidden md:flex items-center justify-center w-16 h-16 rounded-2xl text-2xl font-display font-bold shrink-0"
            style={{
              backgroundColor: `${zone.accentColor}20`,
              color: zone.accentColor,
              border: `2px solid ${zone.accentColor}40`
            }}
          >
            {String(index + 1).padStart(2, '0')}
          </div>

          <div className="flex-1">
            <h2
              className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-3 ${getFontClass()}`}
              style={{ color: zone.textColor }}
            >
              {zone.name}
            </h2>
            <p
              className="text-lg md:text-xl opacity-70 italic"
              style={{ color: zone.textColor }}
            >
              {zone.subtitle}
            </p>
          </div>
        </div>

        {/* Zone description */}
        <p
          className="max-w-2xl text-base md:text-lg leading-relaxed opacity-80"
          style={{ color: zone.textColor }}
        >
          {zone.description}
        </p>

        {/* Component count */}
        <div
          className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm"
          style={{
            backgroundColor: `${zone.accentColor}15`,
            color: zone.accentColor,
            border: `1px solid ${zone.accentColor}30`
          }}
        >
          <span className="font-mono font-bold">{components.length}</span>
          <span>components</span>
        </div>
      </div>

      {/* Component grid */}
      <div className="max-w-[1600px] mx-auto w-full flex-1">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {components.map((component, i) => (
            <ComponentCard
              key={component.id}
              component={component}
              zone={zone}
              index={i}
              onClick={() => setSelectedComponent(component.id)}
            />
          ))}
        </div>
      </div>

      {/* Scroll hint (only on first zone) */}
      {index === 0 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span
            className="text-xs uppercase tracking-widest opacity-50"
            style={{ color: zone.textColor }}
          >
            Scroll to explore
          </span>
          <svg
            className="w-5 h-5 opacity-50"
            style={{ color: zone.textColor }}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      )}

      {/* Zone divider */}
      {index < zones.length - 1 && (
        <div className="mt-16 max-w-[1600px] mx-auto w-full">
          <div
            className="h-px w-full opacity-20"
            style={{
              background: `linear-gradient(90deg, transparent, ${zone.accentColor}, transparent)`
            }}
          />
        </div>
      )}
    </section>
  )
}
