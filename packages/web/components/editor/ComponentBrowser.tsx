/**
 * ComponentBrowser
 *
 * Sidebar component for browsing and adding elements to the canvas.
 * Organized by layer (atoms, molecules, organisms, templates).
 */

import React, { useState, useMemo } from 'react';
import {
  elementRegistry,
  getElementsByLayer,
  getCategoriesForLayer,
  searchElements,
  type ElementEntry,
  type ElementLayer,
} from '../../elements/registry';
import { useEditorStore } from './store';

// ============================================================================
// LAYER ICONS
// ============================================================================

const LayerIcons: Record<ElementLayer, React.ReactNode> = {
  atom: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <ellipse cx="12" cy="12" rx="10" ry="4" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-60 12 12)" />
    </svg>
  ),
  molecule: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="8" cy="8" r="3" />
      <circle cx="16" cy="16" r="3" />
      <circle cx="16" cy="8" r="3" />
      <line x1="10" y1="9" x2="14" y2="15" />
      <line x1="11" y1="8" x2="13" y2="8" />
    </svg>
  ),
  organism: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18" />
      <path d="M9 21V9" />
    </svg>
  ),
  template: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18" />
      <path d="M3 15h18" />
      <path d="M9 9v12" />
    </svg>
  ),
};

// ============================================================================
// COMPONENT ITEM
// ============================================================================

interface ComponentItemProps {
  element: ElementEntry;
  onAdd: () => void;
}

const ComponentItem: React.FC<ComponentItemProps> = ({ element, onAdd }) => {
  const [isHovered, setIsHovered] = useState(false);

  const layerColors: Record<ElementLayer, string> = {
    atom: '#8b5cf6',
    molecule: '#3b82f6',
    organism: '#10b981',
    template: '#f59e0b',
  };

  return (
    <button
      onClick={onAdd}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        w-full p-3 rounded-lg text-left transition-all duration-200
        border border-transparent
        ${isHovered ? 'bg-white/10 border-white/20' : 'bg-white/5 hover:bg-white/8'}
      `}
    >
      <div className="flex items-start gap-3">
        {/* Layer indicator */}
        <div
          className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${layerColors[element.layer]}20` }}
        >
          <div style={{ color: layerColors[element.layer] }}>
            {LayerIcons[element.layer]}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-white truncate">
            {element.name}
          </h4>
          <p className="text-xs text-white/50 truncate mt-0.5">
            {element.description}
          </p>

          {/* Tags */}
          {element.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {element.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-1.5 py-0.5 text-[9px] rounded bg-white/10 text-white/40"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Add button on hover */}
        <div
          className={`
            flex-shrink-0 w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center
            transition-all duration-200
            ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}
          `}
        >
          <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </div>
      </div>
    </button>
  );
};

// ============================================================================
// COMPONENT BROWSER
// ============================================================================

export const ComponentBrowser: React.FC = () => {
  const { addBlock, searchQuery, setSearchQuery } = useEditorStore();
  const [activeLayer, setActiveLayer] = useState<ElementLayer | 'all'>('all');
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  // Filter elements
  const filteredElements = useMemo(() => {
    let elements: ElementEntry[];

    // Search or filter by layer
    if (searchQuery) {
      elements = searchElements(searchQuery);
    } else if (activeLayer === 'all') {
      elements = elementRegistry;
    } else {
      elements = getElementsByLayer(activeLayer);
    }

    // Filter to only elements with components (can be added to canvas)
    return elements.filter(el => el.component);
  }, [searchQuery, activeLayer]);

  // Group by layer/category
  const groupedElements = useMemo(() => {
    const grouped: Record<string, ElementEntry[]> = {};

    filteredElements.forEach((el) => {
      const key = `${el.layer}-${el.category}`;
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(el);
    });

    return grouped;
  }, [filteredElements]);

  const toggleCategory = (key: string) => {
    setExpandedCategories((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleAddElement = (elementId: string) => {
    addBlock(elementId);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Search */}
      <div className="p-4 border-b border-white/10">
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search elements..."
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-white/40 focus:outline-none focus:border-indigo-500/50 focus:bg-white/8 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Layer filter tabs */}
      <div className="px-4 py-3 border-b border-white/10">
        <div className="flex gap-1">
          <button
            onClick={() => setActiveLayer('all')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              activeLayer === 'all'
                ? 'bg-indigo-500 text-white'
                : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
            }`}
          >
            All
          </button>
          {(['organism', 'molecule', 'atom', 'template'] as ElementLayer[]).map((layer) => (
            <button
              key={layer}
              onClick={() => setActiveLayer(layer)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-colors flex items-center gap-1.5 ${
                activeLayer === layer
                  ? 'bg-indigo-500 text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              {LayerIcons[layer]}
              {layer}s
            </button>
          ))}
        </div>
      </div>

      {/* Elements list */}
      <div className="flex-1 overflow-y-auto p-4">
        {Object.keys(groupedElements).length === 0 ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </div>
            <p className="text-white/50 text-sm">No elements found</p>
            <p className="text-white/30 text-xs mt-1">Try a different search</p>
          </div>
        ) : (
          <div className="space-y-4">
            {Object.entries(groupedElements).map(([key, elements]) => {
              const [layer, category] = key.split('-') as [ElementLayer, string];
              const isExpanded = expandedCategories.includes(key) || searchQuery.length > 0;
              const categories = getCategoriesForLayer(layer);
              const categoryMeta = categories.find((c) => c.id === category);

              return (
                <div key={key} className="rounded-lg bg-white/[0.02] border border-white/5 overflow-hidden">
                  {/* Category header */}
                  <button
                    onClick={() => toggleCategory(key)}
                    className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-white/60">{LayerIcons[layer]}</div>
                      <div className="text-left">
                        <span className="text-sm font-medium text-white">
                          {categoryMeta?.name || category}
                        </span>
                        <span className="text-xs text-white/40 ml-2">
                          {elements.length} elements
                        </span>
                      </div>
                    </div>
                    <svg
                      className={`w-4 h-4 text-white/40 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>

                  {/* Elements grid */}
                  {isExpanded && (
                    <div className="px-2 pb-2 space-y-1">
                      {elements.map((element) => (
                        <ComponentItem
                          key={element.id}
                          element={element}
                          onAdd={() => handleAddElement(element.id)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Stats footer */}
      <div className="px-4 py-3 border-t border-white/10 bg-white/[0.02]">
        <div className="flex items-center justify-between text-xs text-white/40">
          <span>
            {filteredElements.length} elements available
          </span>
          <span>
            Click to add
          </span>
        </div>
      </div>
    </div>
  );
};

export default ComponentBrowser;
