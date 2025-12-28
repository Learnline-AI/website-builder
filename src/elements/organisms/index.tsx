/**
 * Organisms Layer
 * Complex components composed of molecules and atoms
 * 7 categories, 100+ total organism variants
 */

// Navigation organisms
export { navigationRegistry } from './navigation';
export * from './navigation';

// Data Display organisms
export { dataDisplayRegistry } from './data-display';
export * from './data-display';

// Forms organisms
export { formsRegistry } from './forms';
export * from './forms';

// Feedback organisms
export { feedbackOrganismRegistry } from './feedback';
export * from './feedback';

// Media organisms
export { mediaRegistry } from './media';
export * from './media';

// Interactive organisms
export { interactiveRegistry } from './interactive';
export * from './interactive';

// Layout organisms
export { layoutRegistry } from './layout';
export * from './layout';

// Combined registry for all organisms
import { navigationRegistry } from './navigation';
import { dataDisplayRegistry } from './data-display';
import { formsRegistry } from './forms';
import { feedbackOrganismRegistry } from './feedback';
import { mediaRegistry } from './media';
import { interactiveRegistry } from './interactive';
import { layoutRegistry } from './layout';

export const organismsRegistry = [
  ...navigationRegistry,
  ...dataDisplayRegistry,
  ...formsRegistry,
  ...feedbackOrganismRegistry,
  ...mediaRegistry,
  ...interactiveRegistry,
  ...layoutRegistry,
];
