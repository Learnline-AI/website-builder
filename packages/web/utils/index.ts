/**
 * Utilities Index
 *
 * Central export for all utility functions and components.
 */

export { VirtualizedGrid, VirtualizedList } from './VirtualizedGrid';
export type { VirtualizedGridProps, VirtualizedListProps } from './VirtualizedGrid';

export {
  searchIndex,
  useComponentSearch,
} from './searchIndex';
export type {
  SearchResult,
  SearchFilters,
  SearchOptions,
  UseSearchOptions,
  UseSearchReturn,
} from './searchIndex';

export {
  initializeSearchIndex,
  isSearchInitialized,
  getSearchStats,
} from './initializeSearch';
