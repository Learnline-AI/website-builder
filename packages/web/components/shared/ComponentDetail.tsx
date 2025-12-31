import { useEffect, useState } from 'react'
import { getComponentById, getComponentsByZone, ComponentEntry } from '../../data/registry'
import { getElement } from '../../elements/registry'
import { zones } from '../../data/zones'
import { categories } from '../../data/categories'
import { ComponentPreview as LiveComponentPreview } from '../../library'
import { useFavorites, useRecentlyViewed } from '../../contexts'
import { ElementDetail } from '../../elements/ElementPreview'
import { useFocusTrap } from '../../hooks/useFocusTrap'
import { useApp } from '../../App'
import { CodeDisplay } from './CodeDisplay'

type DetailTab = 'preview' | 'code' | 'props'

// Generate mock source code based on component info
function generateMockSourceCode(component: ComponentEntry): string {
  const componentName = component.name.replace(/\s+/g, '')
  return `import { useState } from 'react'

interface ${componentName}Props {
  className?: string
  onInteract?: () => void
  variant?: 'default' | 'compact' | 'expanded'
}

export function ${componentName}({
  className = '',
  onInteract,
  variant = 'default',
}: ${componentName}Props) {
  const [isActive, setIsActive] = useState(false)

  const handleClick = () => {
    setIsActive(!isActive)
    onInteract?.()
  }

  return (
    <div
      className={\`
        \${className}
        \${variant === 'compact' ? 'p-2' : 'p-4'}
        \${isActive ? 'ring-2 ring-indigo-500' : ''}
        rounded-lg bg-neutral-900 border border-white/10
        transition-all duration-300 ease-out
        hover:border-white/20 cursor-pointer
      \`}
      onClick={handleClick}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
          <span className="text-white font-bold">
            {isActive ? '\\u2713' : '\\u2192'}
          </span>
        </div>
        <div>
          <h3 className="text-white font-medium">${component.name}</h3>
          <p className="text-white/60 text-sm">
            {isActive ? 'Active' : 'Click to interact'}
          </p>
        </div>
      </div>
    </div>
  )
}
`
}

// Generate usage example based on component info
function generateUsageExample(component: ComponentEntry): string {
  const componentName = component.name.replace(/\s+/g, '')
  return `import { ${componentName} } from '@ui-museum/${component.zone}'

function App() {
  const handleInteraction = () => {
    console.log('${component.name} was interacted with!')
  }

  return (
    <div className="p-8 bg-neutral-950 min-h-screen">
      <h1 className="text-2xl font-bold text-white mb-6">
        ${component.name} Demo
      </h1>

      {/* Default variant */}
      <${componentName}
        onInteract={handleInteraction}
        className="mb-4"
      />

      {/* Compact variant */}
      <${componentName}
        variant="compact"
        onInteract={handleInteraction}
        className="mb-4"
      />

      {/* Expanded variant */}
      <${componentName}
        variant="expanded"
        onInteract={handleInteraction}
      />
    </div>
  )
}

export default App
`
}

// Generate props interface documentation
function generatePropsInterface(component: ComponentEntry): string {
  const componentName = component.name.replace(/\s+/g, '')
  return `interface ${componentName}Props {
  /**
   * Additional CSS classes to apply to the component
   * @default ''
   */
  className?: string

  /**
   * Callback fired when the user interacts with the component
   */
  onInteract?: () => void

  /**
   * Visual variant of the component
   * @default 'default'
   */
  variant?: 'default' | 'compact' | 'expanded'

  /**
   * Whether the component is in a disabled state
   * @default false
   */
  disabled?: boolean

  /**
   * Custom label text for accessibility
   */
  'aria-label'?: string

  /**
   * Children elements to render inside the component
   */
  children?: React.ReactNode
}
`
}

interface ComponentDetailProps {
  componentId: string
  onClose: () => void
}

export function ComponentDetail({ componentId, onClose }: ComponentDetailProps) {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState<DetailTab>('preview')
  const { announce } = useApp()

  // Check both registries - data/registry for zone components, elements/registry for atomic elements
  const component = getComponentById(componentId)
  const element = !component ? getElement(componentId) : undefined

  const { isFavorite, toggleFavorite } = useFavorites()
  const { addToHistory } = useRecentlyViewed()

  // Focus trap for modal accessibility
  const { containerRef } = useFocusTrap<HTMLDivElement>({
    enabled: true,
    onEscape: onClose,
  })

  useEffect(() => {
    setMounted(true)
    // Add to recently viewed
    addToHistory(componentId)
    // Prevent body scroll
    document.body.style.overflow = 'hidden'

    // Announce to screen readers
    if (component) {
      announce(`Opened ${component.name} component details`)
    } else if (element) {
      announce(`Opened ${element.name} element details`)
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [componentId, addToHistory, component, element, announce])

  // If we found an element from elements/registry, render ElementDetail view
  if (element) {
    return <ElementDetail elementId={element.id} onClose={onClose} />
  }

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
      role="dialog"
      aria-modal="true"
      aria-labelledby="component-detail-title"
      aria-describedby="component-detail-description"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        ref={containerRef}
        className={`
          relative w-full max-w-5xl max-h-[90vh] overflow-hidden
          bg-neutral-900 rounded-3xl border border-white/10
          shadow-2xl shadow-black/50
          transition-all duration-300
          ${mounted ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'}
        `}
        tabIndex={-1}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close component details"
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900"
        >
          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
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
                onClick={() => {
                  toggleFavorite(component.id)
                  announce(isFavorite(component.id) ? `Removed ${component.name} from favorites` : `Added ${component.name} to favorites`)
                }}
                aria-pressed={isFavorite(component.id)}
                aria-label={isFavorite(component.id) ? `Remove ${component.name} from favorites` : `Add ${component.name} to favorites`}
                className={`
                  flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium
                  transition-all duration-300
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900
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
                  aria-hidden="true"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
                {isFavorite(component.id) ? 'Favorited' : 'Add to Favorites'}
              </button>
            </div>

            <h1 id="component-detail-title" className="text-3xl font-bold text-white mb-2">
              {component.name}
            </h1>
            <p id="component-detail-description" className="text-white/70 text-lg max-w-2xl mb-6">
              {component.description}
            </p>

            {/* Tab Navigation */}
            <div className="flex items-center gap-1 p-1 bg-white/5 rounded-xl w-fit">
              <TabButton
                isActive={activeTab === 'preview'}
                onClick={() => {
                  setActiveTab('preview')
                  announce('Switched to Preview tab')
                }}
                icon={
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <path d="M8 21h8M12 17v4" />
                  </svg>
                }
              >
                Preview
              </TabButton>
              <TabButton
                isActive={activeTab === 'code'}
                onClick={() => {
                  setActiveTab('code')
                  announce('Switched to Code tab')
                }}
                icon={
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                }
              >
                Code
              </TabButton>
              <TabButton
                isActive={activeTab === 'props'}
                onClick={() => {
                  setActiveTab('props')
                  announce('Switched to Props tab')
                }}
                icon={
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                }
              >
                Props
              </TabButton>
            </div>
          </div>

          {/* Tab Content */}
          <div className="px-8 pb-8">
            {/* Preview Tab */}
            {activeTab === 'preview' && (
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
            )}

            {/* Code Tab */}
            {activeTab === 'code' && (
              <div className="mb-8">
                <CodeDisplay
                  code={generateMockSourceCode(component)}
                  example={generateUsageExample(component)}
                  propsInterface={generatePropsInterface(component)}
                  dependencies={[
                    { name: 'react', version: '^18.0.0' },
                    { name: 'tailwindcss', version: '^3.0.0' },
                  ]}
                  language="tsx"
                />
              </div>
            )}

            {/* Props Tab */}
            {activeTab === 'props' && (
              <div className="mb-8">
                <div className="rounded-2xl overflow-hidden bg-neutral-800/50 border border-white/10">
                  <div className="p-5 border-b border-white/5">
                    <h3 className="text-lg font-semibold text-white">Props Interface</h3>
                    <p className="text-white/60 text-sm mt-1">
                      Available props for the {component.name} component
                    </p>
                  </div>
                  <div className="divide-y divide-white/5">
                    <PropRow
                      name="className"
                      type="string"
                      defaultValue="''"
                      description="Additional CSS classes to apply to the component"
                    />
                    <PropRow
                      name="onInteract"
                      type="() => void"
                      description="Callback fired when the user interacts with the component"
                    />
                    <PropRow
                      name="variant"
                      type="'default' | 'compact' | 'expanded'"
                      defaultValue="'default'"
                      description="Visual variant of the component"
                    />
                    <PropRow
                      name="disabled"
                      type="boolean"
                      defaultValue="false"
                      description="Whether the component is in a disabled state"
                    />
                    <PropRow
                      name="aria-label"
                      type="string"
                      description="Custom label text for accessibility"
                    />
                    <PropRow
                      name="children"
                      type="React.ReactNode"
                      description="Children elements to render inside the component"
                    />
                  </div>
                </div>
              </div>
            )}

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

function TabButton({
  isActive,
  onClick,
  icon,
  children,
}: {
  isActive: boolean
  onClick: () => void
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={`
        relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
        transition-all duration-300 ease-out
        focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900
        ${isActive
          ? 'bg-white/10 text-white shadow-lg'
          : 'text-white/50 hover:text-white/80 hover:bg-white/5'
        }
      `}
      aria-pressed={isActive}
    >
      <span className={`transition-colors duration-300 ${isActive ? 'text-indigo-400' : ''}`}>
        {icon}
      </span>
      <span>{children}</span>
      {isActive && (
        <span
          className="absolute inset-0 rounded-lg border border-white/20"
          style={{ animation: 'tabFadeIn 300ms ease-out' }}
        />
      )}
    </button>
  )
}

function PropRow({
  name,
  type,
  defaultValue,
  description,
}: {
  name: string
  type: string
  defaultValue?: string
  description: string
}) {
  return (
    <div className="p-4 hover:bg-white/5 transition-colors">
      <div className="flex flex-wrap items-start gap-2 mb-2">
        <code className="px-2 py-1 rounded bg-indigo-500/20 text-indigo-300 text-sm font-mono">
          {name}
        </code>
        <code className="px-2 py-1 rounded bg-white/10 text-amber-300 text-sm font-mono">
          {type}
        </code>
        {defaultValue && (
          <span className="px-2 py-1 rounded bg-white/5 text-white/50 text-sm font-mono">
            = {defaultValue}
          </span>
        )}
      </div>
      <p className="text-white/70 text-sm">{description}</p>
    </div>
  )
}

// Simplified zone background for detail view (reserved for future use)
export function ZoneBackgroundMini({ zone }: { zone: typeof zones[0] }) {
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
