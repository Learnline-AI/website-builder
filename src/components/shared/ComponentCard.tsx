import React, { useState } from 'react'
import { ComponentEntry } from '../../data/registry'
import { zones } from '../../data/zones'
import { ComponentPreview as LiveComponentPreview } from '../../library'
import { useFavorites } from '../../contexts'

interface ComponentCardProps {
  component: ComponentEntry
  zone: typeof zones[0]
  index: number
  onClick: () => void
}

export function ComponentCard({ component, zone, index, onClick }: ComponentCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { isFavorite, toggleFavorite } = useFavorites()

  // Staggered animation delay
  const delay = index * 50

  // Get size class based on preview size
  const getSizeClass = () => {
    switch (component.previewSize) {
      case 'large':
      case 'fullscreen':
        return 'col-span-2 row-span-2'
      case 'medium':
        return 'col-span-1 row-span-1'
      default:
        return 'col-span-1 row-span-1'
    }
  }

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        group relative rounded-2xl overflow-hidden text-left
        transition-all duration-500 ease-out
        hover:scale-[1.02] hover:z-10
        focus:outline-none focus:ring-2 focus:ring-offset-2
        ${getSizeClass()}
      `}
      style={{
        animationDelay: `${delay}ms`,
        minHeight: component.previewSize === 'large' || component.previewSize === 'fullscreen' ? '280px' : '180px',
        backgroundColor: `${zone.bgColor}cc`,
        borderColor: `${zone.accentColor}30`,
        border: `1px solid ${zone.accentColor}30`,
        boxShadow: isHovered
          ? `0 20px 40px -10px ${zone.accentColor}30, 0 0 0 1px ${zone.accentColor}50`
          : `0 4px 20px -5px ${zone.accentColor}10`,
      }}
    >
      {/* Live Component Preview */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-transform duration-500"
        style={{
          transform: isHovered ? 'scale(1.02)' : 'scale(1)',
        }}
      >
        <LiveComponentPreview componentId={component.id} className="w-full h-full" />
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: `linear-gradient(180deg, transparent 40%, ${zone.bgColor} 100%)`,
          opacity: isHovered ? 0.9 : 0.7,
        }}
      />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3
          className="font-semibold text-sm md:text-base mb-1 transition-transform duration-300 group-hover:translate-x-1"
          style={{ color: zone.textColor }}
        >
          {component.name}
        </h3>
        <p
          className="text-xs opacity-70 line-clamp-2 transition-transform duration-300 group-hover:translate-x-1"
          style={{ color: zone.textColor }}
        >
          {component.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-2">
          {component.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider"
              style={{
                backgroundColor: `${zone.accentColor}20`,
                color: zone.accentColor,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Favorite button */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          toggleFavorite(component.id)
        }}
        className={`
          absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center
          transition-all duration-300 z-20
          ${isFavorite(component.id)
            ? 'bg-red-500 text-white scale-100'
            : 'bg-black/30 text-white/70 scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100'
          }
          hover:scale-110
        `}
      >
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill={isFavorite(component.id) ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      </button>

      {/* Interactive indicator */}
      {component.isInteractive && (
        <div
          className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider"
          style={{
            backgroundColor: `${zone.accentColor}20`,
            color: zone.accentColor,
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
          Interactive
        </div>
      )}

      {/* Hover glow effect */}
      <div
        className="absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${zone.accentColor}15 0%, transparent 70%)`,
          opacity: isHovered ? 1 : 0,
        }}
      />
    </button>
  )
}
