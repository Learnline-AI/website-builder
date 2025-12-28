// UI Museum Element Library
// Atomic Design Structure: Atoms -> Molecules -> Organisms

// Export atoms (no conflicts)
export * from './atoms';

// Export molecules (no conflicts with atoms)
export * from './molecules';

// Export organisms registry only (to avoid component name conflicts)
export { organismsRegistry } from './organisms';

// Registry exports
export {
  elementRegistry,
  getElement,
  getElementsByLayer,
  getElementsByCategory,
  getElementComposition,
  type ElementEntry,
  type ElementLayer,
  type ElementCategory,
} from './registry';
