import React, { useState, useEffect, useRef, createContext, useContext } from 'react'
import { Navigation } from './components/shared/Navigation'
import { JourneyMode } from './components/JourneyMode'
import { CatalogMode } from './components/CatalogMode'
import { ElementsMode } from './components/ElementsMode'
import { ComponentDetail } from './components/shared/ComponentDetail'
import { SearchOverlay } from './components/shared/SearchOverlay'
import { zones } from './data/zones'
import { categories } from './data/categories'
import { componentRegistry } from './data/registry'
import { FavoritesProvider, RecentlyViewedProvider } from './contexts'

// Context for global app state
interface AppContextType {
  mode: 'journey' | 'catalog' | 'elements'
  setMode: (mode: 'journey' | 'catalog' | 'elements') => void
  currentZone: string
  setCurrentZone: (zone: string) => void
  selectedComponent: string | null
  setSelectedComponent: (id: string | null) => void
  searchOpen: boolean
  setSearchOpen: (open: boolean) => void
}

export const AppContext = createContext<AppContextType | null>(null)
export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}

export default function App() {
  const [mode, setMode] = useState<'journey' | 'catalog' | 'elements'>('journey')
  const [currentZone, setCurrentZone] = useState(zones[0].id)
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Keyboard shortcut for search
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
      if (e.key === 'Escape') {
        setSearchOpen(false)
        setSelectedComponent(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const currentZoneData = zones.find(z => z.id === currentZone) || zones[0]

  return (
    <FavoritesProvider>
      <RecentlyViewedProvider>
        <AppContext.Provider value={{
          mode, setMode,
          currentZone, setCurrentZone,
          selectedComponent, setSelectedComponent,
          searchOpen, setSearchOpen
        }}>
          <div
            className={`
              min-h-screen transition-colors duration-1000 ease-out
              ${mounted ? 'opacity-100' : 'opacity-0'}
            `}
            style={{
              backgroundColor: mode === 'journey' ? currentZoneData.bgColor : '#0a0a0f',
            }}
          >
        {/* Ambient background layer */}
        <div
          className="fixed inset-0 pointer-events-none transition-opacity duration-1000"
          style={{ opacity: mode === 'journey' ? 1 : 0 }}
        >
          <ZoneBackground zone={currentZoneData} />
        </div>

        {/* Navigation */}
        <Navigation />

        {/* Main content */}
        <main className="relative z-10">
          {mode === 'journey' && <JourneyMode />}
          {mode === 'catalog' && <CatalogMode />}
          {mode === 'elements' && <ElementsMode />}
        </main>

        {/* Component detail overlay */}
        {selectedComponent && (
          <ComponentDetail
            componentId={selectedComponent}
            onClose={() => setSelectedComponent(null)}
          />
        )}

        {/* Search overlay */}
        {searchOpen && (
          <SearchOverlay onClose={() => setSearchOpen(false)} />
        )}

        {/* Zone indicator (journey mode) */}
        {mode === 'journey' && (
          <ZoneIndicator />
        )}
          </div>
        </AppContext.Provider>
      </RecentlyViewedProvider>
    </FavoritesProvider>
  )
}

// Zone-specific background renderer
function ZoneBackground({ zone }: { zone: typeof zones[0] }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base gradient/color */}
      <div
        className="absolute inset-0 transition-all duration-1000"
        style={{ background: zone.gradient || zone.bgColor }}
      />

      {/* Zone-specific effects */}
      {zone.id === 'arcade-basement' && <ArcadeBackground />}
      {zone.id === 'hacker-terminal' && <HackerBackground />}
      {zone.id === 'cosmic-observatory' && <CosmicBackground />}
      {zone.id === 'pulp-detective' && <PulpBackground />}
      {zone.id === 'mad-science' && <ScienceBackground />}
      {zone.id === 'organic-garden' && <OrganicBackground />}
      {zone.id === 'physics-playground' && <PhysicsBackground />}
      {zone.id === 'retro-office' && <RetroBackground />}
      {zone.id === 'cinema-stage' && <CinemaBackground />}
      {zone.id === 'geometry-lab' && <GeometryBackground />}
      {zone.id === 'artist-studio' && <ArtistBackground />}

      {/* Noise overlay */}
      <div className="absolute inset-0 noise" />
    </div>
  )
}

// Individual zone backgrounds
function ArcadeBackground() {
  return (
    <>
      {/* Scanlines */}
      <div className="absolute inset-0 scanlines opacity-30" />
      {/* CRT vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.6) 100%)'
        }}
      />
      {/* Pixel dust particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-green-500 opacity-60 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>
    </>
  )
}

function HackerBackground() {
  return (
    <>
      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 0, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 0, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
      {/* Matrix rain columns */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 w-4 text-green-500 font-mono text-xs animate-matrix"
            style={{
              left: `${i * 5}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`,
            }}
          >
            {[...Array(50)].map((_, j) => (
              <div key={j} style={{ opacity: Math.random() }}>
                {String.fromCharCode(0x30A0 + Math.random() * 96)}
              </div>
            ))}
          </div>
        ))}
      </div>
      {/* Scanline flicker */}
      <div className="absolute inset-0 bg-green-500 opacity-[0.02] animate-flicker" />
    </>
  )
}

function CosmicBackground() {
  return (
    <>
      {/* Deep space gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 30% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)'
        }}
      />
      {/* Stars */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-pulse-slow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
              opacity: 0.3 + Math.random() * 0.7,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>
      {/* Nebula glow */}
      <div
        className="absolute inset-0 animate-drift"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(0, 210, 255, 0.05) 0%, transparent 40%)'
        }}
      />
    </>
  )
}

function PulpBackground() {
  return (
    <>
      {/* Sepia paper texture */}
      <div className="absolute inset-0 paper-texture" />
      {/* Halftone dots */}
      <div className="absolute inset-0 halftone text-amber-900 opacity-5" />
      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.4) 100%)'
        }}
      />
      {/* Dust particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-amber-200 rounded-full opacity-30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${8 + Math.random() * 8}s`,
            }}
          />
        ))}
      </div>
    </>
  )
}

function ScienceBackground() {
  return (
    <>
      {/* Laboratory tile pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
      {/* Bubbles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-cyan-500 opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `-${Math.random() * 20}%`,
              width: `${10 + Math.random() * 30}px`,
              height: `${10 + Math.random() * 30}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${6 + Math.random() * 6}s`,
            }}
          />
        ))}
      </div>
      {/* Chemical gradient glow */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(0, 255, 200, 0.05) 0%, transparent 50%, rgba(255, 0, 128, 0.05) 100%)'
        }}
      />
    </>
  )
}

function OrganicBackground() {
  return (
    <>
      {/* Warm earth gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(132, 117, 78, 0.1) 0%, rgba(67, 56, 37, 0.2) 100%)'
        }}
      />
      {/* Floating seeds/spores */}
      <div className="absolute inset-0">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-2 bg-lime-200 opacity-20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${10 + Math.random() * 10}s`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        ))}
      </div>
      {/* Soft vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(34, 28, 18, 0.3) 100%)'
        }}
      />
    </>
  )
}

function PhysicsBackground() {
  return (
    <>
      {/* Clean gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)'
        }}
      />
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />
    </>
  )
}

function RetroBackground() {
  return (
    <>
      {/* Beige base */}
      <div className="absolute inset-0 bg-[#d4c5a9]" />
      {/* Subtle pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle, #8b7355 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}
      />
      {/* Warm vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(139, 115, 85, 0.2) 100%)'
        }}
      />
    </>
  )
}

function CinemaBackground() {
  return (
    <>
      {/* Deep red velvet base */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #1a0a0a 0%, #2d0a0a 50%, #1a0505 100%)'
        }}
      />
      {/* Curtain texture */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(255,255,255,0.03) 20px, rgba(255,255,255,0.03) 40px)`
        }}
      />
      {/* Spotlight */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(255, 200, 100, 0.1) 0%, transparent 50%)'
        }}
      />
      {/* Dust in spotlight */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-amber-100 rounded-full opacity-30 animate-float"
            style={{
              left: `${30 + Math.random() * 40}%`,
              top: `${Math.random() * 50}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
    </>
  )
}

function GeometryBackground() {
  return (
    <>
      {/* Clean white/light base */}
      <div className="absolute inset-0 bg-[#f8f9fa]" />
      {/* Blueprint grid */}
      <div className="absolute inset-0 blueprint-grid" />
      {/* Geometric accents */}
      <svg className="absolute inset-0 w-full h-full opacity-5" preserveAspectRatio="none">
        <pattern id="geo-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <polygon points="50,0 100,50 50,100 0,50" fill="none" stroke="#3b82f6" strokeWidth="0.5"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#geo-pattern)" />
      </svg>
    </>
  )
}

function ArtistBackground() {
  return (
    <>
      {/* Cream paper */}
      <div className="absolute inset-0 bg-[#faf8f0]" />
      {/* Ruled lines */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 27px, #94a3b8 28px)`,
        }}
      />
      {/* Ink splatters */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-5"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${20 + Math.random() * 60}px`,
              height: `${20 + Math.random() * 60}px`,
              background: ['#ec4899', '#8b5cf6', '#3b82f6', '#10b981'][Math.floor(Math.random() * 4)],
              transform: `scale(${0.5 + Math.random()}, ${0.5 + Math.random()})`,
            }}
          />
        ))}
      </div>
    </>
  )
}

// Zone indicator dots
function ZoneIndicator() {
  const { currentZone, setCurrentZone } = useApp()

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
      {zones.map((zone, i) => (
        <button
          key={zone.id}
          onClick={() => {
            setCurrentZone(zone.id)
            document.getElementById(zone.id)?.scrollIntoView({ behavior: 'smooth' })
          }}
          className={`
            group relative w-3 h-3 rounded-full transition-all duration-300
            ${currentZone === zone.id
              ? 'scale-125'
              : 'opacity-50 hover:opacity-100 hover:scale-110'
            }
          `}
          style={{ backgroundColor: zone.accentColor }}
          title={zone.name}
        >
          {/* Tooltip */}
          <span className="absolute right-6 top-1/2 -translate-y-1/2 px-2 py-1 bg-black/80 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {zone.name}
          </span>
        </button>
      ))}
    </div>
  )
}
