/**
 * Recipe System
 *
 * Puck-compatible page composition and rendering system.
 */

// Types
export type {
  PageRecipe,
  BlockNode,
  RecipeSlotContent,
  RecipeSlotType,
  RecipeCategory,
  RecipeLayout,
  RecipeLayoutType,
  RecipeMetadata,
  RecipeRendererProps,
  BlockRendererProps,
  ValidationResult,
  ValidationError,
  ValidationWarning,
  ImageValue,
} from './types';

// Type helpers
export {
  createBlockNode,
  createRecipe,
  getRecipeMetadata,
} from './types';

// Validator
export {
  validateRecipe,
  validateBlock,
  isValidRecipe,
  getUsedComponentTypes,
  getValidationSummary,
} from './validator';

// Renderer
export {
  RecipeRenderer,
  BlockRenderer,
  StackLayout,
  GridLayout,
  SplitLayout,
  SidebarLayout,
} from './RecipeRenderer';

// Example recipes
export { exampleRecipes, getRecipeById, getRecipesByCategory } from './examples';
