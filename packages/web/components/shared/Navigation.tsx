import { useApp } from '../../App'
import { zones } from '../../data/zones'
import { ThemeSwitcher } from './ThemeSwitcher'
import { getAllComponentIds } from '../../library'

export function Navigation() {
  const { mode, setMode, currentZone, setSearchOpen } = useApp()
  const currentZoneData = zones.find(z => z.id === currentZone) || zones[0]
  const componentCount = getAllComponentIds().length

  return (
    <header className="fixed top-0 left-0 right-0 z-50" role="banner">
      {/* Frosted glass background */}
      <div
        className="absolute inset-0 backdrop-blur-xl transition-colors duration-700"
        style={{
          backgroundColor: mode === 'journey'
            ? `${currentZoneData.bgColor}cc`
            : 'rgba(10, 10, 15, 0.9)'
        }}
        aria-hidden="true"
      />

      {/* Border line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px transition-colors duration-700"
        style={{
          backgroundColor: mode === 'journey'
            ? `${currentZoneData.accentColor}33`
            : 'rgba(255, 255, 255, 0.1)'
        }}
        aria-hidden="true"
      />

      <nav
        className="relative px-6 py-4 flex items-center justify-between max-w-[1800px] mx-auto"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a
          href="#main-content"
          className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 rounded-xl"
          aria-label="UI Museum - Cabinet of Interface Curiosities"
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
            style={{
              backgroundColor: mode === 'journey' ? currentZoneData.accentColor : '#6366f1',
              boxShadow: `0 0 20px ${mode === 'journey' ? currentZoneData.accentColor : '#6366f1'}40`
            }}
            aria-hidden="true"
          >
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
          </div>
          <div>
            <h1
              className="font-display text-lg font-semibold tracking-tight transition-colors duration-200"
              style={{ color: mode === 'journey' ? currentZoneData.textColor : '#fff' }}
            >
              UI Museum
            </h1>
            <p
              className="text-xs transition-colors duration-200"
              style={{
                color: mode === 'journey'
                  ? `${currentZoneData.textColor}88`
                  : 'rgba(255, 255, 255, 0.5)'
              }}
            >
              Cabinet of Interface Curiosities
            </p>
          </div>
        </a>

        {/* Mode Toggle */}
        <div
          className="flex items-center gap-1 p-1 rounded-full bg-black/20 backdrop-blur-sm border border-white/10"
          role="tablist"
          aria-label="View mode selection"
        >
          <button
            onClick={() => setMode('journey')}
            role="tab"
            aria-selected={mode === 'journey'}
            aria-controls="main-content"
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
              focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900
              ${mode === 'journey'
                ? 'bg-white text-black shadow-lg'
                : 'text-white/70 hover:text-white hover:bg-white/10'
              }
            `}
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
              Journey
            </span>
          </button>
          <button
            onClick={() => setMode('catalog')}
            role="tab"
            aria-selected={mode === 'catalog'}
            aria-controls="main-content"
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
              focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900
              ${mode === 'catalog'
                ? 'bg-white text-black shadow-lg'
                : 'text-white/70 hover:text-white hover:bg-white/10'
              }
            `}
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
              Catalog
            </span>
          </button>
          <button
            onClick={() => setMode('elements')}
            role="tab"
            aria-selected={mode === 'elements'}
            aria-controls="main-content"
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
              focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900
              ${mode === 'elements'
                ? 'bg-white text-black shadow-lg'
                : 'text-white/70 hover:text-white hover:bg-white/10'
              }
            `}
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="3" />
                <circle cx="12" cy="5" r="2" />
                <circle cx="19" cy="12" r="2" />
                <circle cx="12" cy="19" r="2" />
                <circle cx="5" cy="12" r="2" />
                <line x1="12" y1="7" x2="12" y2="9" />
                <line x1="17" y1="12" x2="15" y2="12" />
                <line x1="12" y1="15" x2="12" y2="17" />
                <line x1="9" y1="12" x2="7" y2="12" />
              </svg>
              Elements
            </span>
          </button>
          <button
            onClick={() => setMode('recipes')}
            role="tab"
            aria-selected={mode === 'recipes'}
            aria-controls="main-content"
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
              focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900
              ${mode === 'recipes'
                ? 'bg-white text-black shadow-lg'
                : 'text-white/70 hover:text-white hover:bg-white/10'
              }
            `}
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                <path d="M8 7h8M8 11h8M8 15h4" />
              </svg>
              Recipes
            </span>
          </button>
          <button
            onClick={() => setMode('editor')}
            role="tab"
            aria-selected={mode === 'editor'}
            aria-controls="main-content"
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
              focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900
              ${mode === 'editor'
                ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                : 'text-white/70 hover:text-white hover:bg-white/10'
              }
            `}
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M12 8v8M8 12h8" />
              </svg>
              Editor
            </span>
          </button>
        </div>

        {/* Search & Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSearchOpen(true)}
            aria-label="Open search dialog (Command + K)"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition-all duration-300 group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900"
          >
            <svg className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <span className="text-sm text-white/70 group-hover:text-white transition-colors">Search</span>
            <kbd className="hidden md:inline-flex items-center gap-0.5 px-2 py-0.5 rounded bg-white/10 text-xs text-white/50" aria-hidden="true">
              <span>Cmd</span>K
            </kbd>
          </button>

          {/* Theme Switcher */}
          <ThemeSwitcher />

          {/* Component count */}
          <div
            className="hidden md:flex items-center gap-2 px-3 py-2 rounded-full border transition-colors duration-200"
            style={{
              borderColor: mode === 'journey' ? `${currentZoneData.accentColor}33` : 'rgba(255, 255, 255, 0.1)',
              color: mode === 'journey' ? currentZoneData.textColor : 'rgba(255, 255, 255, 0.7)'
            }}
            aria-label={`${componentCount} components available`}
          >
            <span className="text-sm font-mono" aria-hidden="true">{componentCount}</span>
            <span className="text-xs opacity-70" aria-hidden="true">components</span>
          </div>
        </div>
      </nav>

      {/* Current zone indicator (journey mode) */}
      {mode === 'journey' && (
        <div
          className="relative px-6 pb-3 flex items-center justify-center gap-2 transition-opacity duration-200"
          style={{ color: currentZoneData.textColor }}
          role="status"
          aria-live="polite"
          aria-label={`Currently viewing ${currentZoneData.name} zone`}
        >
          <div
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: currentZoneData.accentColor }}
            aria-hidden="true"
          />
          <span className="text-xs font-medium uppercase tracking-widest">
            {currentZoneData.name}
          </span>
        </div>
      )}
    </header>
  )
}
