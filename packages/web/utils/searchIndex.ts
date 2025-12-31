/**
 * searchIndex
 *
 * Fuse.js-powered search index for fast component discovery.
 * Provides O(log n) search performance with fuzzy matching.
 */

import Fuse, { FuseResult, IFuseOptions } from 'fuse.js';
import type { ComponentEntry } from '../data/registry';

// ============================================================================
// TYPES
// ============================================================================

export interface SearchResult {
  item: ComponentEntry;
  score: number;
  matches?: Array<{
    key: string;
    value: string;
    indices: [number, number][];
  }>;
}

export interface SearchFilters {
  zones?: string[];
  categories?: string[];
  tags?: string[];
  isInteractive?: boolean;
}

export interface SearchOptions {
  limit?: number;
  threshold?: number;
  filters?: SearchFilters;
}

// ============================================================================
// FUSE CONFIGURATION
// ============================================================================

const FUSE_OPTIONS: IFuseOptions<ComponentEntry> = {
  // Keys to search with weights
  keys: [
    { name: 'name', weight: 2.0 },
    { name: 'description', weight: 1.5 },
    { name: 'tags', weight: 1.2 },
    { name: 'zone', weight: 1.0 },
    { name: 'categories', weight: 1.0 },
  ],
  // Fuzzy matching settings
  threshold: 0.4, // 0 = exact match, 1 = match anything
  distance: 100, // How close match must be to fuzzy location
  minMatchCharLength: 2,
  // Include match info for highlighting
  includeMatches: true,
  includeScore: true,
  // Performance optimizations
  useExtendedSearch: true,
  ignoreLocation: true,
  findAllMatches: false,
};

// ============================================================================
// SEARCH INDEX CLASS
// ============================================================================

class ComponentSearchIndex {
  private fuse: Fuse<ComponentEntry> | null = null;
  private components: ComponentEntry[] = [];
  private initialized = false;

  /**
   * Initialize the search index with component data
   */
  initialize(components: ComponentEntry[]): void {
    this.components = components;
    this.fuse = new Fuse(components, FUSE_OPTIONS);
    this.initialized = true;
  }

  /**
   * Check if index is ready
   */
  isReady(): boolean {
    return this.initialized && this.fuse !== null;
  }

  /**
   * Search for components
   */
  search(query: string, options: SearchOptions = {}): SearchResult[] {
    if (!this.fuse) {
      console.warn('Search index not initialized');
      return [];
    }

    const { limit = 20, threshold, filters } = options;

    // Update threshold if provided
    if (threshold !== undefined) {
      this.fuse.setCollection(this.components);
    }

    // Perform search
    let results: FuseResult<ComponentEntry>[];

    if (query.trim()) {
      results = this.fuse.search(query, { limit: limit * 2 }); // Get extra for filtering
    } else {
      // No query - return all components (for filtered browsing)
      results = this.components.map((item, index) => ({
        item,
        refIndex: index,
        score: 0,
      }));
    }

    // Apply filters
    if (filters) {
      results = results.filter(result => this.matchesFilters(result.item, filters));
    }

    // Transform and limit results
    return results.slice(0, limit).map(result => ({
      item: result.item,
      score: result.score ?? 0,
      matches: result.matches?.map(match => ({
        key: match.key ?? '',
        value: match.value ?? '',
        indices: match.indices as [number, number][],
      })),
    }));
  }

  /**
   * Get components by zone
   */
  getByZone(zoneId: string): ComponentEntry[] {
    return this.components.filter(c => c.zone === zoneId);
  }

  /**
   * Get components by category
   */
  getByCategory(category: string): ComponentEntry[] {
    return this.components.filter(c => c.categories.includes(category));
  }

  /**
   * Get components by tag
   */
  getByTag(tag: string): ComponentEntry[] {
    return this.components.filter(c => c.tags.includes(tag));
  }

  /**
   * Get all unique tags
   */
  getAllTags(): string[] {
    const tags = new Set<string>();
    this.components.forEach(c => c.tags.forEach(t => tags.add(t)));
    return Array.from(tags).sort();
  }

  /**
   * Get all unique categories
   */
  getAllCategories(): string[] {
    const categories = new Set<string>();
    this.components.forEach(c => c.categories.forEach(cat => categories.add(cat)));
    return Array.from(categories).sort();
  }

  /**
   * Get component by ID
   */
  getById(id: string): ComponentEntry | undefined {
    return this.components.find(c => c.id === id);
  }

  /**
   * Get similar components based on tags and categories
   */
  getSimilar(componentId: string, limit: number = 5): ComponentEntry[] {
    const component = this.getById(componentId);
    if (!component) return [];

    // Score other components by similarity
    const scored = this.components
      .filter(c => c.id !== componentId)
      .map(c => {
        let score = 0;

        // Same zone bonus
        if (c.zone === component.zone) score += 2;

        // Shared categories
        const sharedCategories = c.categories.filter(cat =>
          component.categories.includes(cat)
        ).length;
        score += sharedCategories * 3;

        // Shared tags
        const sharedTags = c.tags.filter(tag =>
          component.tags.includes(tag)
        ).length;
        score += sharedTags * 2;

        return { component: c, score };
      })
      .filter(s => s.score > 0)
      .sort((a, b) => b.score - a.score);

    return scored.slice(0, limit).map(s => s.component);
  }

  /**
   * Get search suggestions based on partial input
   */
  getSuggestions(partial: string, limit: number = 5): string[] {
    if (!partial.trim() || partial.length < 2) return [];

    const lower = partial.toLowerCase();
    const suggestions = new Set<string>();

    // Match component names
    this.components.forEach(c => {
      if (c.name.toLowerCase().includes(lower)) {
        suggestions.add(c.name);
      }
    });

    // Match tags
    this.components.forEach(c => {
      c.tags.forEach(tag => {
        if (tag.toLowerCase().includes(lower)) {
          suggestions.add(tag);
        }
      });
    });

    // Match categories
    this.components.forEach(c => {
      c.categories.forEach(cat => {
        if (cat.toLowerCase().includes(lower)) {
          suggestions.add(cat);
        }
      });
    });

    return Array.from(suggestions).slice(0, limit);
  }

  /**
   * Check if component matches filters
   */
  private matchesFilters(component: ComponentEntry, filters: SearchFilters): boolean {
    if (filters.zones?.length && !filters.zones.includes(component.zone)) {
      return false;
    }
    if (filters.categories?.length) {
      const hasCategory = filters.categories.some(cat =>
        component.categories.includes(cat)
      );
      if (!hasCategory) return false;
    }
    if (filters.tags?.length) {
      const hasTag = filters.tags.some(tag => component.tags.includes(tag));
      if (!hasTag) return false;
    }
    if (filters.isInteractive !== undefined &&
        component.isInteractive !== filters.isInteractive) {
      return false;
    }
    return true;
  }
}

// ============================================================================
// SINGLETON INSTANCE
// ============================================================================

export const searchIndex = new ComponentSearchIndex();

// ============================================================================
// REACT HOOK
// ============================================================================

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';

export interface UseSearchOptions {
  debounceMs?: number;
  initialFilters?: SearchFilters;
}

export interface UseSearchReturn {
  query: string;
  setQuery: (query: string) => void;
  results: SearchResult[];
  isSearching: boolean;
  filters: SearchFilters;
  setFilters: (filters: SearchFilters) => void;
  suggestions: string[];
  clearSearch: () => void;
}

export function useComponentSearch(options: UseSearchOptions = {}): UseSearchReturn {
  const { debounceMs = 150, initialFilters = {} } = options;

  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);
  const [isSearching, setIsSearching] = useState(false);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounce query updates
  useEffect(() => {
    setIsSearching(true);
    debounceTimer.current = setTimeout(() => {
      setDebouncedQuery(query);
      setIsSearching(false);
    }, debounceMs);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [query, debounceMs]);

  // Perform search
  const results = useMemo(() => {
    if (!searchIndex.isReady()) return [];
    return searchIndex.search(debouncedQuery, { filters });
  }, [debouncedQuery, filters]);

  // Get suggestions
  const suggestions = useMemo(() => {
    if (!searchIndex.isReady() || !query.trim()) return [];
    return searchIndex.getSuggestions(query);
  }, [query]);

  // Clear search
  const clearSearch = useCallback(() => {
    setQuery('');
    setDebouncedQuery('');
    setFilters({});
  }, []);

  return {
    query,
    setQuery,
    results,
    isSearching,
    filters,
    setFilters,
    suggestions,
    clearSearch,
  };
}

export default searchIndex;
