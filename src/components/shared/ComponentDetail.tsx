import React, { useEffect, useState } from 'react'
import { getComponentById, ComponentEntry, getComponentsByZone } from '../../data/registry'
import { zones } from '../../data/zones'
import { categories } from '../../data/categories'
import { ComponentPreview as LiveComponentPreview } from '../../library'
import { useFavorites, useRecentlyViewed } from '../../contexts'

interface ComponentDetailProps {
  componentId: string
  onClose: () => void
}

export function ComponentDetail({ componentId, onClose }: ComponentDetailProps) {
  const [mounted, setMounted] = useState(false)
  const component = getComponentById(componentId)
  const { isFavorite, toggleFavorite } = useFavorites()
  const { addToHistory } = useRecentlyViewed()

  useEffect(() => {
    setMounted(true)
    // Add to recently viewed
    addToHistory(componentId)
    // Prevent body scroll
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [componentId, addToHistory])

  if (!component) return null

  const zone = zones.find(z => z.id === component.zone)!
  const relatedComponents = getComponentsByZone(component.zone)
    .filter(c => c.id !== component.id)
    .slice(0, 4)

  const componentCategories = categories.filter(c => component.categories.includes(c.id))

  return (
    <div
      className={`
        fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8
        transition-opacity duration-300
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
          relative w-full max-w-5xl max-h-[90vh] overflow-hidden
          bg-neutral-900 rounded-3xl border border-white/10
          shadow-2xl shadow-black/50
          transition-all duration-500
          ${mounted ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'}
        `}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
        >
          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="overflow-y-auto max-h-[90vh]">
          {/* Header with zone accent */}
          <div
            className="p-8 pb-6"
            style={{
              background: `linear-gradient(180deg, ${zone.bgColor}40 0%, transparent 100%)`
            }}
          >
            {/* Zone badge and favorite button */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: `${zone.accentColor}20`,
                  color: zone.accentColor,
                  border: `1px solid ${zone.accentColor}30`
                }}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: zone.accentColor }}
                />
                {zone.name}
              </div>
              <button
                onClick={() => toggleFavorite(component.id)}
                className={`
                  flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium
                  transition-all duration-300
                  ${isFavorite(component.id)
                    ? 'bg-red-500 text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }
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
                {isFavorite(component.id) ? 'Favorited' : 'Add to Favorites'}
              </button>
            </div>

            <h1 className="text-3xl font-bold text-white mb-2">
              {component.name}
            </h1>
            <p className="text-white/70 text-lg max-w-2xl">
              {component.description}
            </p>
          </div>

          {/* Main preview area */}
          <div className="px-8 pb-8">
            <div
              className="relative aspect-video rounded-2xl overflow-hidden mb-8"
              style={{
                backgroundColor: zone.bgColor,
                border: `1px solid ${zone.accentColor}30`,
              }}
            >
              {/* Live Component Preview */}
              <div className="absolute inset-0">
                <LiveComponentPreview componentId={component.id} className="w-full h-full" />
              </div>

              {/* Interactive badge */}
              {component.isInteractive && (
                <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-2 rounded-full bg-black/50 backdrop-blur-sm border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-medium text-white">Click to interact</span>
                </div>
              )}
            </div>

            {/* Metadata grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <MetaCard
                label="Source Project"
                value={component.sourceProject}
                icon={
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 3h18v18H3V3z" />
                    <path d="M3 9h18M9 21V9" />
                  </svg>
                }
              />
              <MetaCard
                label="Source File"
                value={component.sourceFile}
                icon={
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                }
              />
              <MetaCard
                label="Preview Size"
                value={component.previewSize}
                icon={
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <path d="M8 21h8M12 17v4" />
                  </svg>
                }
              />
              <MetaCard
                label="Interactive"
                value={component.isInteractive ? 'Yes' : 'No'}
                icon={
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                }
              />
            </div>

            {/* Categories */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3">
                Categories
              </h3>
              <div className="flex flex-wrap gap-2">
                {componentCategories.map(cat => (
                  <span
                    key={cat.id}
                    className="px-3 py-1.5 rounded-lg bg-indigo-500/20 text-indigo-300 text-sm font-medium border border-indigo-500/30"
                  >
                    {cat.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {component.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full bg-white/5 text-white/70 text-sm border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Related components */}
            {relatedComponents.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-4">
                  Related Components from {zone.name}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {relatedComponents.map(related => (
                    <button
                      key={related.id}
                      className="p-4 rounded-xl bg-white/5 border border-white/10 text-left hover:bg-white/10 transition-colors group"
                    >
                      <div
                        className="w-10 h-10 rounded-lg mb-3 flex items-center justify-center"
                        style={{
                          backgroundColor: `${zone.accentColor}20`,
                        }}
                      >
                        <svg
                          className="w-5 h-5"
                          style={{ color: zone.accentColor }}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                        </svg>
                      </div>
                      <h4 className="text-sm font-medium text-white group-hover:text-indigo-300 transition-colors truncate">
                        {related.name}
                      </h4>
                      <p className="text-xs text-white/50 truncate">
                        {related.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function MetaCard({
  label,
  value,
  icon
}: {
  label: string
  value: string
  icon: React.ReactNode
}) {
  return (
    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
      <div className="flex items-center gap-2 text-white/40 mb-2">
        {icon}
        <span className="text-xs uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-white font-medium truncate" title={value}>
        {value}
      </p>
    </div>
  )
}

// Simplified zone background for detail view
function ZoneBackgroundMini({ zone }: { zone: typeof zones[0] }) {
  if (zone.id === 'arcade-basement') {
    return (
      <>
        <div className="absolute inset-0 scanlines opacity-20" />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.5) 100%)'
          }}
        />
      </>
    )
  }

  if (zone.id === 'hacker-terminal') {
    return (
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 0, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 0, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px'
        }}
      />
    )
  }

  if (zone.id === 'cosmic-observatory') {
    return (
      <>
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
              opacity: 0.3 + Math.random() * 0.5,
            }}
          />
        ))}
      </>
    )
  }

  if (zone.id === 'geometry-lab') {
    return (
      <div className="absolute inset-0 blueprint-grid" />
    )
  }

  return null
}
