// Element Registry - Metadata for all UI elements
// Following LEARNLINE atomic design standards

import React from 'react';

// Import registry entries from atom categories
import { iconRegistry } from './atoms/icons';
import { animationRegistry } from './atoms/animations';
import { colorRegistry } from './atoms/colors';
import { shadowRegistry } from './atoms/shadows';
import { typographyRegistry } from './atoms/typography';
import { backgroundRegistry } from './atoms/backgrounds';
import { borderRegistry } from './atoms/borders';
import { filterRegistry } from './atoms/filters';
import { shapeRegistry } from './atoms/shapes';
import { surfaceRegistry } from './atoms/surfaces';

// Import registry entries from molecule categories
import { buttonRegistry } from './molecules/buttons';
import { inputRegistry } from './molecules/inputs';
import { badgeRegistry } from './molecules/badges';
import { cardRegistry } from './molecules/cards';
import { indicatorRegistry } from './molecules/indicators';
import { feedbackRegistry } from './molecules/feedback';

// ============================================
// TYPE DEFINITIONS
// ============================================

export type ElementLayer = 'atom' | 'molecule' | 'organism';

export type AtomCategory =
  | 'backgrounds'
  | 'borders'
  | 'shadows'
  | 'typography'
  | 'shapes'
  | 'icons'
  | 'animations'
  | 'colors'
  | 'filters'
  | 'surfaces';

export type MoleculeCategory =
  | 'buttons'
  | 'inputs'
  | 'badges'
  | 'cards'
  | 'indicators'
  | 'feedback';

export type ElementCategory = AtomCategory | MoleculeCategory | 'organisms';

export type PreviewType = 'inline' | 'card' | 'fullwidth';
export type ImplementationType = 'css-class' | 'component' | 'hook' | 'token';

// ============================================
// ELEMENT ENTRY INTERFACE
// ============================================

export interface ElementEntry {
  // Identity
  id: string;                          // Unique ID: 'bg-grid', 'btn-primary'
  name: string;                        // Display name: 'Grid Background'
  layer: ElementLayer;                 // 'atom' | 'molecule' | 'organism'
  category: ElementCategory;           // Category within layer

  // Documentation
  description: string;                 // Brief description
  usage?: string;                      // Usage example/notes

  // Composition (for molecules/organisms)
  composedOf?: string[];               // IDs of constituent elements
  usedIn?: string[];                   // IDs of parent elements that use this

  // Theme integration
  themeAgnostic: boolean;              // Works in any theme without modification
  zoneVariants?: string[];             // Zone IDs if zone-specific variants exist

  // Source tracking
  sourceComponents: string[];          // Original component IDs that use this element
  extractedFrom: string;               // File path of extraction source

  // Display configuration
  previewType: PreviewType;            // How to render in element browser
  hasInteraction: boolean;             // Requires user interaction to demo
  previewBg?: string;                  // Custom background for preview

  // Implementation details
  implementation: ImplementationType;  // How this element is implemented
  component?: React.FC<any>;           // React component (if applicable)
  cssClass?: string;                   // Tailwind/CSS class (if applicable)
  codeSnippet?: string;                // Example usage code

  // Metadata
  tags: string[];                      // Searchable tags
  createdAt?: string;                  // When added to registry
  version?: string;                    // Version if tracked
}

// ============================================
// CATEGORY METADATA
// ============================================

export interface CategoryMeta {
  id: ElementCategory;
  name: string;
  description: string;
  layer: ElementLayer;
  icon?: string;
  elementCount: number;
}

export const categoryMeta: CategoryMeta[] = [
  // Atom categories
  { id: 'backgrounds', name: 'Backgrounds', description: 'Patterns, gradients, and textures', layer: 'atom', elementCount: 32 },
  { id: 'borders', name: 'Borders', description: 'Border styles and decorative edges', layer: 'atom', elementCount: 26 },
  { id: 'shadows', name: 'Shadows', description: 'Box shadows and glow effects', layer: 'atom', elementCount: 18 },
  { id: 'typography', name: 'Typography', description: 'Text styles and effects', layer: 'atom', elementCount: 34 },
  { id: 'shapes', name: 'Shapes', description: 'SVG shapes and geometric forms', layer: 'atom', elementCount: 22 },
  { id: 'icons', name: 'Icons', description: 'SVG icon components', layer: 'atom', elementCount: 68 },
  { id: 'animations', name: 'Animations', description: 'Keyframes and motion utilities', layer: 'atom', elementCount: 56 },
  { id: 'colors', name: 'Colors', description: 'Color tokens and palettes', layer: 'atom', elementCount: 24 },
  { id: 'filters', name: 'Filters', description: 'CSS and SVG filter effects', layer: 'atom', elementCount: 42 },
  { id: 'surfaces', name: 'Surfaces', description: 'Material textures and finishes', layer: 'atom', elementCount: 28 },

  // Molecule categories
  { id: 'buttons', name: 'Buttons', description: 'Button components', layer: 'molecule', elementCount: 24 },
  { id: 'inputs', name: 'Inputs', description: 'Input and form controls', layer: 'molecule', elementCount: 32 },
  { id: 'badges', name: 'Badges', description: 'Badges and tags', layer: 'molecule', elementCount: 16 },
  { id: 'cards', name: 'Cards', description: 'Card containers', layer: 'molecule', elementCount: 24 },
  { id: 'indicators', name: 'Indicators', description: 'Progress and status indicators', layer: 'molecule', elementCount: 28 },
  { id: 'feedback', name: 'Feedback', description: 'Tooltips, toasts, and alerts', layer: 'molecule', elementCount: 20 },

  // Organism category
  { id: 'organisms', name: 'Organisms', description: 'Complex composed components', layer: 'organism', elementCount: 88 },
];

// ============================================
// ELEMENT REGISTRY
// ============================================

export const elementRegistry: ElementEntry[] = [
  // Atoms - Icons
  ...iconRegistry,

  // Atoms - Animations
  ...animationRegistry,

  // Atoms - Colors
  ...colorRegistry,

  // Atoms - Shadows
  ...shadowRegistry,

  // Atoms - Typography
  ...typographyRegistry,

  // Atoms - Backgrounds
  ...backgroundRegistry,

  // Atoms - Borders
  ...borderRegistry,

  // Atoms - Filters
  ...filterRegistry,

  // Atoms - Shapes
  ...shapeRegistry,

  // Atoms - Surfaces
  ...surfaceRegistry,

  // Molecules - Buttons
  ...buttonRegistry,

  // Molecules - Inputs
  ...inputRegistry,

  // Molecules - Badges
  ...badgeRegistry,

  // Molecules - Cards
  ...cardRegistry,

  // Molecules - Indicators
  ...indicatorRegistry,

  // Molecules - Feedback
  ...feedbackRegistry,
];

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Get a single element by ID
 */
export function getElement(id: string): ElementEntry | undefined {
  return elementRegistry.find(el => el.id === id);
}

/**
 * Get all elements in a specific layer
 */
export function getElementsByLayer(layer: ElementLayer): ElementEntry[] {
  return elementRegistry.filter(el => el.layer === layer);
}

/**
 * Get all elements in a specific category
 */
export function getElementsByCategory(category: ElementCategory): ElementEntry[] {
  return elementRegistry.filter(el => el.category === category);
}

/**
 * Get composition tree for an element (what atoms/molecules it's made of)
 */
export function getElementComposition(id: string): ElementEntry[] {
  const element = getElement(id);
  if (!element?.composedOf) return [];

  return element.composedOf
    .map(childId => getElement(childId))
    .filter((el): el is ElementEntry => el !== undefined);
}

/**
 * Get all elements that use a specific element
 */
export function getElementUsage(id: string): ElementEntry[] {
  return elementRegistry.filter(el => el.composedOf?.includes(id));
}

/**
 * Search elements by name, description, or tags
 */
export function searchElements(query: string): ElementEntry[] {
  const q = query.toLowerCase();
  return elementRegistry.filter(el =>
    el.name.toLowerCase().includes(q) ||
    el.description.toLowerCase().includes(q) ||
    el.tags.some(tag => tag.toLowerCase().includes(q))
  );
}

/**
 * Get elements grouped by layer
 */
export function getElementsByLayerGrouped(): Record<ElementLayer, ElementEntry[]> {
  return {
    atom: getElementsByLayer('atom'),
    molecule: getElementsByLayer('molecule'),
    organism: getElementsByLayer('organism'),
  };
}

/**
 * Get category metadata by ID
 */
export function getCategoryMeta(category: ElementCategory): CategoryMeta | undefined {
  return categoryMeta.find(cat => cat.id === category);
}

/**
 * Get all categories for a layer
 */
export function getCategoriesForLayer(layer: ElementLayer): CategoryMeta[] {
  return categoryMeta.filter(cat => cat.layer === layer);
}

/**
 * Count elements by layer
 */
export function countElementsByLayer(): Record<ElementLayer, number> {
  return {
    atom: getElementsByLayer('atom').length,
    molecule: getElementsByLayer('molecule').length,
    organism: getElementsByLayer('organism').length,
  };
}

/**
 * Get elements with zone-specific variants
 */
export function getThemedElements(): ElementEntry[] {
  return elementRegistry.filter(el => !el.themeAgnostic || (el.zoneVariants && el.zoneVariants.length > 0));
}
