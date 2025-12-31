import React, { useState, useMemo } from 'react';
import { useApp } from '../App';
import {
  ElementLayer,
  ElementCategory,
  ElementEntry,
  categoryMeta,
  getElementsByLayer,
  getElementsByCategory,
  searchElements,
  getCategoriesForLayer,
} from '../elements/registry';

// Layer configuration
const layers: { id: ElementLayer; name: string; description: string; icon: React.ReactNode }[] = [
  {
    id: 'atom',
    name: 'Atoms',
    description: 'Pure UI primitives',
    icon: <circle cx="12" cy="12" r="4" />,
  },
  {
    id: 'molecule',
    name: 'Molecules',
    description: 'Atom combinations',
    icon: <><circle cx="8" cy="12" r="3" /><circle cx="16" cy="12" r="3" /><line x1="11" y1="12" x2="13" y2="12" /></>,
  },
  {
    id: 'organism',
    name: 'Organisms',
    description: 'Complex components',
    icon: <><circle cx="12" cy="8" r="3" /><circle cx="7" cy="15" r="3" /><circle cx="17" cy="15" r="3" /><line x1="12" y1="11" x2="7" y2="12" /><line x1="12" y1="11" x2="17" y2="12" /></>,
  },
  {
    id: 'template',
    name: 'Templates',
    description: 'Full page layouts',
    icon: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 9v12" /></>,
  },
];

// Category icon mapping
const categoryIconMap: Record<string, React.ReactNode> = {
  // Atom categories
  backgrounds: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></>,
  borders: <rect x="3" y="3" width="18" height="18" rx="2" strokeDasharray="4 2" />,
  shadows: <><rect x="5" y="5" width="14" height="14" rx="2" /><rect x="3" y="3" width="14" height="14" rx="2" fill="none" /></>,
  typography: <path d="M4 7V4h16v3M9 20h6M12 4v16" />,
  shapes: <><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" /></>,
  icons: <><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></>,
  animations: <><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" /></>,
  colors: <><circle cx="12" cy="12" r="10" /><path d="M12 2a10 10 0 0 1 0 20" fill="currentColor" /></>,
  filters: <><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></>,
  surfaces: <><rect x="2" y="6" width="20" height="12" rx="2" /><path d="M12 12h.01" /></>,
  // Molecule categories
  buttons: <><rect x="4" y="8" width="16" height="8" rx="2" /><line x1="8" y1="12" x2="16" y2="12" /></>,
  inputs: <><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M7 12h0" /></>,
  badges: <><circle cx="12" cy="12" r="8" /><path d="M12 8v4l2 2" /></>,
  cards: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /></>,
  indicators: <><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>,
  feedback: <><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></>,
  organisms: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 3v18M3 9h18" /></>,
  // Template categories
  marketing: <><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></>,
  application: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></>,
  content: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></>,
  auth: <><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></>,
};

export function ElementsMode() {
  const { setSelectedComponent } = useApp();
  const [activeLayer, setActiveLayer] = useState<ElementLayer>('atom');
  const [activeCategory, setActiveCategory] = useState<ElementCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Get categories for current layer
  const layerCategories = useMemo(() => {
    return getCategoriesForLayer(activeLayer);
  }, [activeLayer]);

  // Get filtered elements
  const elements = useMemo(() => {
    let result: ElementEntry[];

    if (searchQuery) {
      result = searchElements(searchQuery);
    } else if (activeCategory === 'all') {
      result = getElementsByLayer(activeLayer);
    } else {
      result = getElementsByCategory(activeCategory);
    }

    return result;
  }, [activeLayer, activeCategory, searchQuery]);

  // Handle layer change - reset category
  const handleLayerChange = (layer: ElementLayer) => {
    setActiveLayer(layer);
    setActiveCategory('all');
    setSearchQuery('');
  };

  // Layer stats
  const layerStats = useMemo(() => {
    return {
      atom: getElementsByLayer('atom').length,
      molecule: getElementsByLayer('molecule').length,
      organism: getElementsByLayer('organism').length,
      template: getElementsByLayer('template').length,
    };
  }, []);

  return (
    <div className="min-h-screen pt-24 flex">
      {/* Sidebar */}
      <aside className="fixed left-0 top-24 bottom-0 w-72 bg-neutral-900/50 backdrop-blur-xl border-r border-white/10 flex flex-col">
        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
          {/* Layer selector */}
          <h2 className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-4 px-3">
            Atomic Layers
          </h2>
          <div className="space-y-2 mb-6">
            {layers.map(layer => (
              <button
                key={layer.id}
                onClick={() => handleLayerChange(layer.id)}
                className={`
                  w-full flex items-center gap-3 px-3 py-3 rounded-xl
                  transition-all duration-200 text-left group
                  ${activeLayer === layer.id
                    ? 'bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 border border-violet-500/30'
                    : 'bg-white/5 hover:bg-white/10 border border-transparent'
                  }
                `}
              >
                <div
                  className={`
                    w-10 h-10 rounded-lg flex items-center justify-center
                    transition-all duration-200
                    ${activeLayer === layer.id
                      ? 'bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/30'
                      : 'bg-white/10 text-white/60 group-hover:text-white'
                    }
                  `}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {layer.icon}
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <span className={`text-sm font-medium block ${activeLayer === layer.id ? 'text-white' : 'text-white/70'}`}>
                    {layer.name}
                  </span>
                  <span className="text-xs text-white/40">
                    {layer.description}
                  </span>
                </div>
                <span className={`text-xs font-mono ${activeLayer === layer.id ? 'text-violet-400' : 'text-white/30'}`}>
                  {layerStats[layer.id]}
                </span>
              </button>
            ))}
          </div>

          {/* Category filter */}
          <h2 className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-4 px-3">
            Categories
          </h2>
          <nav className="space-y-1">
            {/* All category */}
            <button
              onClick={() => setActiveCategory('all')}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                transition-all duration-200 text-left group
                ${activeCategory === 'all'
                  ? 'bg-white/10 text-white'
                  : 'text-white/60 hover:bg-white/5 hover:text-white'
                }
              `}
            >
              <div className={`
                w-8 h-8 rounded-lg flex items-center justify-center
                ${activeCategory === 'all' ? 'bg-violet-500 text-white' : 'bg-white/5 text-white/60'}
              `}>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                </svg>
              </div>
              <span className="text-sm font-medium">All {layers.find(l => l.id === activeLayer)?.name}</span>
              <span className="ml-auto text-xs text-white/40">{layerStats[activeLayer]}</span>
            </button>

            {/* Layer-specific categories */}
            {layerCategories.map(category => (
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
                <div className={`
                  w-8 h-8 rounded-lg flex items-center justify-center
                  ${activeCategory === category.id ? 'bg-violet-500 text-white' : 'bg-white/5 text-white/60 group-hover:bg-white/10'}
                `}>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {categoryIconMap[category.id]}
                  </svg>
                </div>
                <span className="text-sm font-medium flex-1">{category.name}</span>
                <span className="text-xs text-white/40">{category.elementCount}</span>
              </button>
            ))}
          </nav>
          </div>
        </div>

        {/* Info box - pinned to bottom */}
        <div className="flex-shrink-0 p-4 border-t border-white/10">
          <div className="p-4 rounded-xl bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20">
            <h3 className="text-xs font-semibold text-violet-300 mb-2">Atomic Design</h3>
            <p className="text-[11px] text-white/50 leading-relaxed">
              {activeLayer === 'atom' && 'Atoms are the smallest UI building blocks - pure CSS utilities, icons, and shapes.'}
              {activeLayer === 'molecule' && 'Molecules combine atoms into functional units like buttons, inputs, and badges.'}
              {activeLayer === 'organism' && 'Organisms are complete components composed of molecules and atoms.'}
            </p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-72 p-8">
        {/* Header */}
        <div className="max-w-[1400px] mx-auto mb-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border border-violet-500/30 flex items-center justify-center">
                <svg className="w-7 h-7 text-violet-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {layers.find(l => l.id === activeLayer)?.icon}
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white mb-1">
                  {activeCategory === 'all'
                    ? layers.find(l => l.id === activeLayer)?.name
                    : categoryMeta.find(c => c.id === activeCategory)?.name
                  }
                </h1>
                <p className="text-white/60 max-w-xl">
                  {activeCategory === 'all'
                    ? layers.find(l => l.id === activeLayer)?.description
                    : categoryMeta.find(c => c.id === activeCategory)?.description
                  }
                </p>
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search elements..."
                className="w-64 px-4 py-2 pl-10 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/50 focus:bg-white/10 transition-all"
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6 flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-mono font-bold text-violet-400">
                {elements.length}
              </span>
              <span className="text-white/50 text-sm">elements</span>
            </div>
            {searchQuery && (
              <>
                <div className="h-6 w-px bg-white/10" />
                <div className="flex items-center gap-2">
                  <span className="text-sm text-white/50">searching for</span>
                  <span className="text-sm font-medium text-violet-300">"{searchQuery}"</span>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="ml-2 p-1 rounded-lg hover:bg-white/10 text-white/50 hover:text-white"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Element grid */}
        <div className="max-w-[1400px] mx-auto">
          {elements.length > 0 ? (
            // Use different grid layout based on whether we're showing compact items (icons)
            activeCategory === 'icons' || (activeCategory === 'all' && activeLayer === 'atom' && elements.some(e => e.category === 'icons')) ? (
              // Compact list layout for icons
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {elements.map((element, i) => (
                  <ElementCard
                    key={element.id}
                    element={element}
                    index={i}
                    onClick={() => setSelectedComponent(element.id)}
                  />
                ))}
              </div>
            ) : (
              // Standard grid layout for other elements
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {elements.map((element, i) => (
                  <ElementCard
                    key={element.id}
                    element={element}
                    index={i}
                    onClick={() => setSelectedComponent(element.id)}
                  />
                ))}
              </div>
            )
          ) : (
            <EmptyState
              hasSearch={!!searchQuery}
              layer={activeLayer}
              onClearSearch={() => setSearchQuery('')}
            />
          )}
        </div>
      </main>
    </div>
  );
}

// ============================================
// ELEMENT CARD COMPONENT
// ============================================

interface ElementCardProps {
  element: ElementEntry;
  index: number;
  onClick: () => void;
}

function ElementCard({ element, index, onClick }: ElementCardProps) {
  // Layer-specific accent colors
  const layerColors: Record<ElementLayer, { bg: string; text: string; border: string }> = {
    atom: { bg: 'from-cyan-500/20 to-blue-500/20', text: 'text-cyan-400', border: 'border-cyan-500/30' },
    molecule: { bg: 'from-violet-500/20 to-fuchsia-500/20', text: 'text-violet-400', border: 'border-violet-500/30' },
    organism: { bg: 'from-amber-500/20 to-orange-500/20', text: 'text-amber-400', border: 'border-amber-500/30' },
    template: { bg: 'from-emerald-500/20 to-teal-500/20', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  };

  const colors = layerColors[element.layer];

  // Use compact card for icons and small atoms
  const isCompact = element.layer === 'atom' && ['icons', 'shapes', 'badges'].includes(element.category);

  if (isCompact) {
    return (
      <button
        onClick={onClick}
        className="group flex items-center gap-3 p-3 bg-neutral-900/50 rounded-xl border border-white/10 text-left transition-all duration-300 hover:border-white/20 hover:bg-neutral-800/50 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
        style={{ animationDelay: `${index * 20}ms` }}
      >
        {/* Icon preview */}
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${colors.bg} border ${colors.border} transition-transform duration-300 group-hover:scale-110 flex-shrink-0`}>
          <svg className={`w-5 h-5 ${colors.text}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {categoryIconMap[element.category] || <rect x="3" y="3" width="18" height="18" rx="2" />}
          </svg>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-white text-sm truncate group-hover:text-violet-300 transition-colors">
            {element.name}
          </h3>
          <p className="text-white/40 text-[10px] truncate">
            {element.description}
          </p>
        </div>

        {/* Tags - compact */}
        <div className="flex gap-1 flex-shrink-0">
          {element.tags.slice(0, 2).map(tag => (
            <span
              key={tag}
              className="px-1.5 py-0.5 rounded text-[8px] font-medium bg-white/5 text-white/40"
            >
              {tag}
            </span>
          ))}
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className="group relative bg-neutral-900/50 rounded-2xl border border-white/10 overflow-hidden text-left transition-all duration-300 hover:border-white/20 hover:bg-neutral-800/50 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
      style={{ animationDelay: `${index * 20}ms` }}
    >
      {/* Preview area */}
      <div className={`aspect-square relative flex items-center justify-center p-4 bg-gradient-to-br ${colors.bg}`}>
        {/* Placeholder preview */}
        <div className={`w-12 h-12 rounded-xl border-2 ${colors.border} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
          <svg className={`w-6 h-6 ${colors.text}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {categoryIconMap[element.category] || <rect x="3" y="3" width="18" height="18" rx="2" />}
          </svg>
        </div>

        {/* Implementation type badge */}
        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-sm">
          <span className="text-[9px] font-mono text-white/60 uppercase">
            {element.implementation}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="font-semibold text-white text-sm mb-0.5 truncate group-hover:text-violet-300 transition-colors">
          {element.name}
        </h3>
        <p className="text-white/40 text-[11px] line-clamp-1">
          {element.description}
        </p>

        {/* Tags */}
        {element.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {element.tags.slice(0, 2).map(tag => (
              <span
                key={tag}
                className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-white/5 text-white/40"
              >
                {tag}
              </span>
            ))}
            {element.tags.length > 2 && (
              <span className="text-[9px] text-white/30">+{element.tags.length - 2}</span>
            )}
          </div>
        )}
      </div>

      {/* Layer indicator */}
      <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${colors.bg.replace('/20', '/60')}`} />
    </button>
  );
}

// ============================================
// EMPTY STATE COMPONENT
// ============================================

interface EmptyStateProps {
  hasSearch: boolean;
  layer: ElementLayer;
  onClearSearch: () => void;
}

function EmptyState({ hasSearch, layer, onClearSearch }: EmptyStateProps) {
  if (hasSearch) {
    return (
      <div className="text-center py-20">
        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
        </div>
        <h3 className="text-white/70 font-medium mb-2">No elements found</h3>
        <p className="text-white/40 text-sm mb-4">Try a different search term</p>
        <button
          onClick={onClearSearch}
          className="px-4 py-2 rounded-lg bg-violet-500/20 text-violet-300 text-sm font-medium hover:bg-violet-500/30 transition-colors"
        >
          Clear search
        </button>
      </div>
    );
  }

  return (
    <div className="text-center py-20">
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border border-violet-500/30 flex items-center justify-center mx-auto mb-6">
        <svg className="w-10 h-10 text-violet-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {layers.find(l => l.id === layer)?.icon}
        </svg>
      </div>
      <h3 className="text-white font-semibold text-lg mb-2">
        No {layer}s extracted yet
      </h3>
      <p className="text-white/50 text-sm max-w-md mx-auto mb-6">
        {layer === 'atom' && 'Atoms will be extracted from existing components in Phase 3.'}
        {layer === 'molecule' && 'Molecules will be created by combining atoms in Phase 4.'}
        {layer === 'organism' && 'Organisms will be mapped from the existing component library in Phase 5.'}
      </p>
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
        <span className="text-sm text-white/60">Coming soon</span>
      </div>
    </div>
  );
}
