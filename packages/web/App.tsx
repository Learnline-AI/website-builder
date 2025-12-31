import { useState, useEffect, createContext, useContext, useCallback } from 'react'
import { Navigation } from './components/shared/Navigation'
import { JourneyMode } from './components/JourneyMode'
import { CatalogMode } from './components/CatalogMode'
import { ElementsMode } from './components/ElementsMode'
import { RecipeMode } from './components/RecipeMode'
import { EditorMode } from './components/EditorMode'
import { ComponentDetail } from './components/shared/ComponentDetail'
import { SearchOverlay } from './components/shared/SearchOverlay'
import { KeyboardShortcutsModal } from './components/shared/KeyboardShortcutsModal'
import { ChatProvider, ChatToggle, ChatPanel } from './components/chat'
import { DynamicZoneBackground } from './zoneBackgrounds'
import { zones } from './data/zones'
import { FavoritesProvider, RecentlyViewedProvider } from './contexts'
import { initializeSearchIndex } from './utils/initializeSearch'
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts'
import { SkipLink } from './components/shared/SkipLink'
import { LiveRegion } from './components/shared/LiveRegion'

// App mode type
export type AppMode = 'journey' | 'catalog' | 'elements' | 'recipes' | 'editor'

// Context for global app state
interface AppContextType {
  mode: AppMode
  setMode: (mode: AppMode) => void
  currentZone: string
  setCurrentZone: (zone: string) => void
  selectedComponent: string | null
  setSelectedComponent: (id: string | null) => void
  searchOpen: boolean
  setSearchOpen: (open: boolean) => void
  shortcutsModalOpen: boolean
  setShortcutsModalOpen: (open: boolean) => void
  // Catalog navigation
  focusedComponentIndex: number
  setFocusedComponentIndex: (index: number) => void
  navigateComponents: (direction: 'next' | 'prev') => void
  // Live region announcements
  announce: (message: string, priority?: 'polite' | 'assertive') => void
}

export const AppContext = createContext<AppContextType | null>(null)
export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}

export default function App() {
  const [mode, setMode] = useState<AppMode>('journey')
  const [currentZone, setCurrentZone] = useState(zones[0].id)
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [shortcutsModalOpen, setShortcutsModalOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [focusedComponentIndex, setFocusedComponentIndex] = useState(-1)
  const [componentCount] = useState(100) // Default component count for navigation
  const [liveMessage, setLiveMessage] = useState('')
  const [livePriority, setLivePriority] = useState<'polite' | 'assertive'>('polite')

  // Function to announce messages to screen readers
  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    setLivePriority(priority)
    setLiveMessage(message)
    // Clear after announcement
    setTimeout(() => setLiveMessage(''), 1000)
  }, [])

  // Navigation function for j/k keys
  const navigateComponents = useCallback((direction: 'next' | 'prev') => {
    if (mode !== 'catalog' && mode !== 'elements') return

    setFocusedComponentIndex(prev => {
      if (direction === 'next') {
        return prev >= componentCount - 1 ? 0 : prev + 1
      } else {
        return prev <= 0 ? componentCount - 1 : prev - 1
      }
    })
  }, [mode, componentCount])

  // Global keyboard shortcuts
  useKeyboardShortcuts({
    shortcuts: [
      {
        key: '/',
        action: () => {
          if (!searchOpen && !shortcutsModalOpen && !selectedComponent) {
            setSearchOpen(true)
          }
        },
        description: 'Open search',
      },
      {
        key: 'k',
        ctrl: true,
        action: () => {
          if (!shortcutsModalOpen && !selectedComponent) {
            setSearchOpen(true)
          }
        },
        description: 'Open search (Cmd/Ctrl+K)',
      },
      {
        key: 'Escape',
        action: () => {
          if (shortcutsModalOpen) {
            setShortcutsModalOpen(false)
          } else if (searchOpen) {
            setSearchOpen(false)
          } else if (selectedComponent) {
            setSelectedComponent(null)
          }
        },
        description: 'Close overlay',
      },
      {
        key: '?',
        action: () => {
          if (!searchOpen && !selectedComponent) {
            setShortcutsModalOpen(true)
          }
        },
        description: 'Show keyboard shortcuts',
      },
      {
        key: 'j',
        action: () => navigateComponents('next'),
        description: 'Next component',
        enabled: (mode === 'catalog' || mode === 'elements') && !searchOpen && !shortcutsModalOpen && !selectedComponent,
      },
      {
        key: 'k',
        action: () => navigateComponents('prev'),
        description: 'Previous component',
        enabled: (mode === 'catalog' || mode === 'elements') && !searchOpen && !shortcutsModalOpen && !selectedComponent,
      },
    ],
  })

  useEffect(() => {
    setMounted(true)

    // Initialize search index on app load
    initializeSearchIndex()
  }, [])

  // Reset focused index when mode changes
  useEffect(() => {
    setFocusedComponentIndex(-1)
  }, [mode])

  const currentZoneData = zones.find(z => z.id === currentZone) || zones[0]

  return (
    <FavoritesProvider>
      <RecentlyViewedProvider>
        <ChatProvider>
          <AppContext.Provider value={{
            mode, setMode,
            currentZone, setCurrentZone,
            selectedComponent, setSelectedComponent,
            searchOpen, setSearchOpen,
            shortcutsModalOpen, setShortcutsModalOpen,
            focusedComponentIndex, setFocusedComponentIndex,
            navigateComponents,
            announce,
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
          {/* Skip Links for keyboard users */}
          <SkipLink />

          {/* Live Region for screen reader announcements */}
          <LiveRegion message={liveMessage} priority={livePriority} />

          {/* Editor mode renders its own full-screen layout */}
          {mode === 'editor' ? (
            <EditorMode />
          ) : (
            <>
              {/* Ambient background layer */}
              <div
                className="fixed inset-0 pointer-events-none transition-opacity duration-1000"
                style={{ opacity: mode === 'journey' ? 1 : 0 }}
                aria-hidden="true"
              >
                <div className="absolute inset-0 overflow-hidden">
                  {/* Base gradient/color */}
                  <div
                    className="absolute inset-0 transition-all duration-1000"
                    style={{ background: currentZoneData.gradient || currentZoneData.bgColor }}
                  />
                  {/* Zone-specific effects from registry */}
                  <DynamicZoneBackground zoneId={currentZone} />
                  {/* Noise overlay */}
                  <div className="absolute inset-0 noise" />
                </div>
              </div>

              {/* Navigation */}
              <Navigation />

              {/* Main content */}
              <main
                id="main-content"
                className="relative z-10"
                role="main"
                tabIndex={-1}
                aria-label={`${mode.charAt(0).toUpperCase() + mode.slice(1)} view`}
              >
                {mode === 'journey' && <JourneyMode />}
                {mode === 'catalog' && <CatalogMode />}
                {mode === 'elements' && <ElementsMode />}
                {mode === 'recipes' && <RecipeMode />}
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

              {/* Keyboard shortcuts modal */}
              {shortcutsModalOpen && (
                <KeyboardShortcutsModal onClose={() => setShortcutsModalOpen(false)} />
              )}

              {/* Zone indicator moved to JourneyMode component for better integration */}

              {/* AI Chat Assistant */}
              <ChatPanel />
              <ChatToggle />
            </>
          )}
            </div>
          </AppContext.Provider>
        </ChatProvider>
      </RecentlyViewedProvider>
    </FavoritesProvider>
  )
}

// Zone indicator has been moved to JourneyMode.tsx for better integration with scroll transitions
