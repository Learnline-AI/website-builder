import React, { useState, useRef, useEffect, useMemo } from 'react'
import { useApp } from '../App'
import { categories } from '../data/categories'
import { zones } from '../data/zones'
import { getComponentsByCategory, ComponentEntry } from '../data/registry'
import { VirtualizedGrid } from '../utils/VirtualizedGrid'
import { ComponentCardSkeleton } from './shared/ComponentCardSkeleton'

// Icon mapping
const iconMap: Record<string, React.ReactNode> = {
  Type: <path d="M4 7V4h16v3M9 20h6M12 4v16" />,
  MousePointerClick: <><path d="M9 9l5 12 1.8-5.2L21 14 9 9z" /><path d="M7.2 2.2L8 5.1" /><path d="M5.1 8L2.2 7.2" /><path d="M13.4 4.1L14.1 2.2" /><path d="M4.1 13.4L2.2 14.1" /></>,
  Square: <rect x="3" y="3" width="18" height="18" rx="2" />,
  TextCursor: <><path d="M17 22h-1a4 4 0 01-4-4V6a4 4 0 014-4h1" /><path d="M7 22h1a4 4 0 004-4V6a4 4 0 00-4-4H7" /><path d="M8 12h8" /></>,
  Loader: <><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /></>,
  Navigation: <polygon points="3 11 22 2 13 21 11 13 3 11" />,
  LayoutGrid: <><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></>,
  Bell: <><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" /></>,
  Gamepad2: <><line x1="6" y1="11" x2="10" y2="11" /><line x1="8" y1="9" x2="8" y2="13" /><line x1="15" y1="12" x2="15.01" y2="12" /><line x1="18" y1="10" x2="18.01" y2="10" /><path d="M17.32 5H6.68a4 4 0 00-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 003 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 019.828 16h4.344a2 2 0 011.414.586L17 18c.5.5 1 1 2 1a3 3 0 003-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0017.32 5z" /></>,
  Sparkles: <><path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z" /><path d="M5 3v4M19 17v4M3 5h4M17 19h4" /></>,
  Layers: <><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></>,
  Cog: <><circle cx="12" cy="12" r="3" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></>,
}

// Quick filter chip categories
const filterChips = [
  { id: 'all', label: 'All', icon: null },
  { id: 'buttons', label: 'Buttons', icon: 'MousePointerClick' },
  { id: 'cards', label: 'Cards', icon: 'Square' },
  { id: 'inputs', label: 'Inputs', icon: 'TextCursor' },
  { id: 'navigation', label: 'Navigation', icon: 'Navigation' },
  { id: 'progress', label: 'Progress', icon: 'Loader' },
  { id: 'feedback', label: 'Feedback', icon: 'Bell' },
  { id: 'backgrounds', label: 'Backgrounds', icon: 'Layers' },
  { id: 'toys', label: 'Toys', icon: 'Gamepad2' },
] as const

export function CatalogMode() {
  const [activeCategory, setActiveCategory] = useState(categories[0].id)
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { setSelectedComponent, focusedComponentIndex, setFocusedComponentIndex } = useApp()
  const gridContainerRef = useRef<HTMLDivElement>(null)

  // Simulate loading state for demonstration
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => setIsLoading(false), 300)
    return () => clearTimeout(timer)
  }, [activeCategory, activeFilters])

  // Get components based on category and filters
  const components = useMemo(() => {
    let result = getComponentsByCategory(activeCategory)

    // Apply additional filters if any are selected
    if (activeFilters.length > 0 && !activeFilters.includes('all')) {
      result = result.filter(component =>
        activeFilters.some(filter => component.categories.includes(filter))
      )
    }

    return result
  }, [activeCategory, activeFilters])

  const activeCategoryData = categories.find(c => c.id === activeCategory)!

  // Toggle filter chip
  const toggleFilter = (filterId: string) => {
    if (filterId === 'all') {
      setActiveFilters([])
    } else {
      setActiveFilters(prev => {
        if (prev.includes(filterId)) {
          return prev.filter(f => f !== filterId)
        }
        return [...prev, filterId]
      })
    }
  }

  // Clear all filters
  const clearFilters = () => {
    setActiveFilters([])
  }

  // Reset scroll and focused index when category or filters change
  useEffect(() => {
    if (gridContainerRef.current) {
      gridContainerRef.current.scrollTop = 0
    }
    setFocusedComponentIndex(-1)
  }, [activeCategory, activeFilters, setFocusedComponentIndex])

  // Scroll focused component into view
  useEffect(() => {
    if (focusedComponentIndex >= 0 && focusedComponentIndex < components.length) {
      const focusedElement = document.querySelector(`[data-component-index="${focusedComponentIndex}"]`)
      if (focusedElement) {
        focusedElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }
    }
  }, [focusedComponentIndex, components.length])

  return (
    <div className="min-h-screen pt-24 flex">
      {/* Sidebar */}
      <aside className="fixed left-0 top-24 bottom-0 w-72 bg-neutral-900/50 backdrop-blur-xl border-r border-white/10 overflow-y-auto">
        <div className="p-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-4 px-3">
            Categories
          </h2>
          <nav className="space-y-1">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                  transition-all duration-200 text-left group
                  ${activeCategory === category.id
                    ? 'bg-white/10 text-white'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                  }
                `}
              >
                <div
                  className={`
                    w-9 h-9 rounded-lg flex items-center justify-center
                    transition-colors duration-200
                    ${activeCategory === category.id
                      ? 'bg-indigo-500 text-white'
                      : 'bg-white/5 text-white/60 group-hover:bg-white/10 group-hover:text-white'
                    }
                  `}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {iconMap[category.icon]}
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium truncate block">
                    {category.name}
                  </span>
                  <span className="text-xs text-white/40">
                    {getComponentsByCategory(category.id).length} items
                  </span>
                </div>
                {activeCategory === category.id && (
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Zone filter (quick access) */}
        <div className="p-4 border-t border-white/10">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-3 px-3">
            Quick Zone Access
          </h3>
          <div className="flex flex-wrap gap-1.5 px-2">
            {zones.map(zone => (
              <button
                key={zone.id}
                className="px-2 py-1 rounded-full text-[10px] font-medium transition-all hover:scale-105"
                style={{
                  backgroundColor: `${zone.accentColor}20`,
                  color: zone.accentColor,
                  border: `1px solid ${zone.accentColor}30`
                }}
                title={zone.name}
              >
                {zone.name.split(' ').slice(-1)[0]}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-72 p-8">
        {/* Category header */}
        <div className="max-w-[1400px] mx-auto mb-8">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
              <svg className="w-7 h-7 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {iconMap[activeCategoryData.icon]}
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">
                {activeCategoryData.name}
              </h1>
              <p className="text-white/60 max-w-xl">
                {activeCategoryData.description}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6 flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-mono font-bold text-indigo-400">
                {components.length}
              </span>
              <span className="text-white/50 text-sm">components</span>
            </div>
            <div className="h-6 w-px bg-white/10" />
            <div className="flex items-center gap-2">
              <span className="text-sm text-white/50">from</span>
              <span className="text-sm font-medium text-white">
                {new Set(components.map(c => c.zone)).size} zones
              </span>
            </div>
          </div>

          {/* Filter Chips */}
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-white/50">
                Quick Filters
              </span>
              {activeFilters.length > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1"
                >
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                  Clear all
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {filterChips.map(chip => {
                const isActive = chip.id === 'all' ? activeFilters.length === 0 : activeFilters.includes(chip.id)
                return (
                  <button
                    key={chip.id}
                    onClick={() => toggleFilter(chip.id)}
                    className={`
                      flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium
                      transition-all duration-200 border
                      ${isActive
                        ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300 shadow-lg shadow-indigo-500/10'
                        : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white hover:border-white/20'
                      }
                    `}
                  >
                    {chip.icon && (
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {iconMap[chip.icon]}
                      </svg>
                    )}
                    {chip.label}
                    {isActive && chip.id !== 'all' && (
                      <svg className="w-3 h-3 ml-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Keyboard hint */}
          <div className="mt-4 text-xs text-white/30">
            <span className="flex items-center gap-2">
              <kbd className="px-1.5 py-0.5 rounded bg-white/10">j</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-white/10">k</kbd>
              <span>to navigate</span>
              <span className="mx-2">|</span>
              <kbd className="px-1.5 py-0.5 rounded bg-white/10">Enter</kbd>
              <span>to select</span>
              <span className="mx-2">|</span>
              <kbd className="px-1.5 py-0.5 rounded bg-white/10">?</kbd>
              <span>for shortcuts</span>
            </span>
          </div>
        </div>

        {/* Component grid - Virtualized for performance */}
        <div className="max-w-[1400px] mx-auto h-[calc(100vh-320px)]" ref={gridContainerRef}>
          {isLoading ? (
            /* Loading skeleton state */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-1">
              <ComponentCardSkeleton count={8} />
            </div>
          ) : components.length > 0 ? (
            <VirtualizedGrid
              items={components}
              keyExtractor={(component) => component.id}
              renderItem={(component, index) => (
                <CatalogCard
                  component={component}
                  index={index}
                  isFocused={focusedComponentIndex === index}
                  onClick={() => setSelectedComponent(component.id)}
                />
              )}
              columnCount="auto"
              gap={16}
              estimatedItemHeight={280}
              overscan={3}
              className="h-full"
            />
          ) : (
            /* Empty state */
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </div>
              <h3 className="text-white/70 font-medium mb-2">No components found</h3>
              <p className="text-white/40 text-sm">
                {activeFilters.length > 0
                  ? 'Try removing some filters or selecting a different category'
                  : 'Try selecting a different category'
                }
              </p>
              {activeFilters.length > 0 && (
                <button
                  onClick={clearFilters}
                  className="mt-4 px-4 py-2 rounded-lg bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/30 transition-colors"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

interface CatalogCardProps {
  component: ComponentEntry
  index: number
  isFocused?: boolean
  onClick: () => void
}

function CatalogCard({ component, index, isFocused = false, onClick }: CatalogCardProps) {
  const zone = zones.find(z => z.id === component.zone)!
  const { setSelectedComponent } = useApp()

  // Handle keyboard selection
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFocused && e.key === 'Enter') {
        e.preventDefault()
        setSelectedComponent(component.id)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isFocused, component.id, setSelectedComponent])

  return (
    <button
      onClick={onClick}
      data-component-index={index}
      className={`
        group relative bg-neutral-900/50 rounded-2xl border overflow-hidden text-left
        transition-all duration-300 hover:border-white/20 hover:bg-neutral-800/50
        focus:outline-none focus:ring-2 focus:ring-indigo-500/50
        ${isFocused
          ? 'border-indigo-500/70 ring-2 ring-indigo-500/50 bg-neutral-800/70 scale-[1.02]'
          : 'border-white/10'
        }
      `}
      style={{
        animationDelay: `${index * 30}ms`,
      }}
    >
      {/* Preview area */}
      <div className="aspect-[4/3] relative flex items-center justify-center p-6 bg-gradient-to-br from-neutral-800/50 to-neutral-900/50">
        {/* Zone accent glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{
            background: `radial-gradient(circle at center, ${zone.accentColor}10 0%, transparent 70%)`
          }}
        />

        {/* Simple preview icon */}
        <div
          className="w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
          style={{
            backgroundColor: `${zone.accentColor}20`,
            border: `2px solid ${zone.accentColor}40`,
          }}
        >
          <svg
            className="w-7 h-7 transition-colors duration-300"
            style={{ color: zone.accentColor }}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M9 9h6M9 15h6" />
          </svg>
        </div>

        {/* Interactive badge */}
        {component.isInteractive && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-medium text-emerald-400 uppercase tracking-wider">
              Interactive
            </span>
          </div>
        )}

        {/* Focus indicator */}
        {isFocused && (
          <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full bg-indigo-500/30 border border-indigo-500/50">
            <span className="text-[10px] font-medium text-indigo-300 uppercase tracking-wider">
              Press Enter
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-white text-sm mb-1 group-hover:text-indigo-300 transition-colors">
          {component.name}
        </h3>
        <p className="text-white/50 text-xs line-clamp-2 mb-3">
          {component.description}
        </p>

        {/* Zone badge */}
        <div
          className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-medium"
          style={{
            backgroundColor: `${zone.accentColor}15`,
            color: zone.accentColor,
          }}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: zone.accentColor }}
          />
          {zone.name.split(' ').slice(-1)[0]}
        </div>
      </div>

      {/* Hover border glow */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{
          boxShadow: `inset 0 0 0 1px ${zone.accentColor}50, 0 0 20px ${zone.accentColor}20`
        }}
      />
    </button>
  )
}
