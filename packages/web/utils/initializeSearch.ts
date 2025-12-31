/**
 * Search Index Initialization
 *
 * Initializes the search index with component registry data.
 * Call this once when the app starts.
 */

import { searchIndex } from './searchIndex';
import { componentRegistry } from '../data/registry';

let initialized = false;

/**
 * Initialize the search index with component data
 * Safe to call multiple times - will only initialize once
 */
export function initializeSearchIndex(): void {
  if (initialized) {
    return;
  }

  searchIndex.initialize(componentRegistry);
  initialized = true;
}

/**
 * Check if search index is initialized
 */
export function isSearchInitialized(): boolean {
  return initialized;
}

/**
 * Get search index stats
 */
export function getSearchStats() {
  if (!initialized) {
    return {
      initialized: false,
      componentCount: 0,
      categories: [],
      tags: [],
    };
  }

  return {
    initialized: true,
    componentCount: componentRegistry.length,
    categories: searchIndex.getAllCategories(),
    tags: searchIndex.getAllTags(),
  };
}

export default initializeSearchIndex;
