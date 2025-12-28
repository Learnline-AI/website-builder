import React, { useState, useEffect, useRef } from 'react'
import { searchComponents, ComponentEntry } from '../../data/registry'
import { zones } from '../../data/zones'
import { useApp } from '../../App'

interface SearchOverlayProps {
  onClose: () => void
}

export function SearchOverlay({ onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<ComponentEntry[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [mounted, setMounted] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { setSelectedComponent } = useApp()

  useEffect(() => {
    setMounted(true)
    inputRef.current?.focus()
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    if (query.trim()) {
      const found = searchComponents(query)
      setResults(found)
      setSelectedIndex(0)
    } else {
      setResults([])
    }
  }, [query])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(i => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(i => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      e.preventDefault()
      handleSelect(results[selectedIndex])
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  const handleSelect = (component: ComponentEntry) => {
    setSelectedComponent(component.id)
    onClose()
  }

  // Group results by zone
  const groupedResults = results.reduce((acc, component) => {
    const zone = zones.find(z => z.id === component.zone)!
    if (!acc[zone.id]) {
      acc[zone.id] = { zone, components: [] }
    }
    acc[zone.id].components.push(component)
    return acc
  }, {} as Record<string, { zone: typeof zones[0]; components: ComponentEntry[] }>)

  return (
    <div
      className={`
        fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]
        transition-opacity duration-200
        ${mounted ? 'opacity-100' : 'opacity-0'}
      `}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Search modal */}
      <div
        className={`
          relative w-full max-w-2xl mx-4
          bg-neutral-900 rounded-2xl border border-white/10
          shadow-2xl shadow-black/50 overflow-hidden
          transition-all duration-300
          ${mounted ? 'scale-100 translate-y-0' : 'scale-95 -translate-y-4'}
        `}
      >
        {/* Search input */}
        <div className="relative border-b border-white/10">
          <svg
            className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search components, tags, descriptions..."
            className="w-full bg-transparent text-white text-lg py-5 pl-14 pr-5 focus:outline-none placeholder:text-white/30"
          />
          <kbd className="absolute right-5 top-1/2 -translate-y-1/2 px-2 py-1 rounded bg-white/10 text-white/40 text-xs">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[50vh] overflow-y-auto">
          {query && results.length === 0 && (
            <div className="p-8 text-center">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </div>
              <p className="text-white/50">No components found for "{query}"</p>
              <p className="text-white/30 text-sm mt-1">Try different keywords or browse categories</p>
            </div>
          )}

          {!query && (
            <div className="p-6">
              <p className="text-white/40 text-sm mb-4">Quick suggestions</p>
              <div className="flex flex-wrap gap-2">
                {['button', 'card', 'animation', 'retro', 'physics', 'game'].map(suggestion => (
                  <button
                    key={suggestion}
                    onClick={() => setQuery(suggestion)}
                    className="px-3 py-1.5 rounded-full bg-white/5 text-white/60 text-sm hover:bg-white/10 hover:text-white transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {Object.entries(groupedResults).map(([zoneId, { zone, components }]) => (
            <div key={zoneId} className="border-b border-white/5 last:border-b-0">
              {/* Zone header */}
              <div
                className="px-5 py-2 flex items-center gap-2"
                style={{ backgroundColor: `${zone.accentColor}10` }}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: zone.accentColor }}
                />
                <span className="text-xs font-medium" style={{ color: zone.accentColor }}>
                  {zone.name}
                </span>
                <span className="text-xs text-white/30">
                  {components.length} result{components.length !== 1 ? 's' : ''}
                </span>
              </div>

              {/* Components */}
              {components.map((component, i) => {
                const globalIndex = results.indexOf(component)
                const isSelected = globalIndex === selectedIndex

                return (
                  <button
                    key={component.id}
                    onClick={() => handleSelect(component)}
                    className={`
                      w-full px-5 py-3 flex items-center gap-4 text-left
                      transition-colors duration-150
                      ${isSelected ? 'bg-indigo-500/20' : 'hover:bg-white/5'}
                    `}
                  >
                    {/* Icon */}
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
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

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-medium truncate">
                        {highlightMatch(component.name, query)}
                      </h4>
                      <p className="text-white/50 text-sm truncate">
                        {highlightMatch(component.description, query)}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="hidden md:flex items-center gap-1">
                      {component.tags.slice(0, 2).map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded text-[10px] uppercase tracking-wider bg-white/5 text-white/40"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Selection indicator */}
                    {isSelected && (
                      <div className="text-indigo-400">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          ))}
        </div>

        {/* Footer hints */}
        {results.length > 0 && (
          <div className="px-5 py-3 border-t border-white/10 flex items-center gap-4 text-xs text-white/40">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white/10">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-white/10">↓</kbd>
              to navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white/10">↵</kbd>
              to select
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white/10">esc</kbd>
              to close
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

// Helper to highlight matching text
function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text

  const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi')
  const parts = text.split(regex)

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-indigo-500/30 text-indigo-200 rounded px-0.5">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  )
}

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
