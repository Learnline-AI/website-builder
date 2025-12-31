/**
 * Recipe Validator
 *
 * Validates PageRecipe and BlockNode structures against the schema
 * and checks for component availability in the registry.
 */

import { getElement } from '../elements';
import type {
  PageRecipe,
  BlockNode,
  ValidationResult,
  ValidationError,
  ValidationWarning,
  RecipeSlotContent,
} from './types';

// ============================================================================
// VALIDATION FUNCTIONS
// ============================================================================

/**
 * Validate a complete recipe
 */
export function validateRecipe(recipe: PageRecipe): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];
  const visitedIds = new Set<string>();

  // Validate required top-level fields
  if (!recipe.id) {
    errors.push({
      field: 'id',
      message: 'Recipe ID is required',
      code: 'MISSING_REQUIRED_FIELD',
      path: 'id',
    });
  }

  if (!recipe.version) {
    errors.push({
      field: 'version',
      message: 'Recipe version is required',
      code: 'MISSING_REQUIRED_FIELD',
      path: 'version',
    });
  }

  if (!recipe._uiMuseum?.name) {
    errors.push({
      field: '_uiMuseum.name',
      message: 'Recipe name is required',
      code: 'MISSING_REQUIRED_FIELD',
      path: '_uiMuseum.name',
    });
  }

  if (!recipe._uiMuseum?.category) {
    errors.push({
      field: '_uiMuseum.category',
      message: 'Recipe category is required',
      code: 'MISSING_REQUIRED_FIELD',
      path: '_uiMuseum.category',
    });
  }

  // Validate content array
  if (!Array.isArray(recipe.content)) {
    errors.push({
      field: 'content',
      message: 'Recipe content must be an array',
      code: 'INVALID_SCHEMA',
      path: 'content',
    });
  } else {
    // Validate each block
    recipe.content.forEach((block, index) => {
      const blockErrors = validateBlock(block, `content[${index}]`, visitedIds);
      errors.push(...blockErrors.errors);
      warnings.push(...blockErrors.warnings);
    });
  }

  // Validate zones if present
  if (recipe.zones) {
    Object.entries(recipe.zones).forEach(([zoneName, blocks]) => {
      if (!Array.isArray(blocks)) {
        errors.push({
          field: `zones.${zoneName}`,
          message: `Zone "${zoneName}" must be an array`,
          code: 'INVALID_SCHEMA',
          path: `zones.${zoneName}`,
        });
      } else {
        blocks.forEach((block, index) => {
          const blockErrors = validateBlock(block, `zones.${zoneName}[${index}]`, visitedIds);
          errors.push(...blockErrors.errors);
          warnings.push(...blockErrors.warnings);
        });
      }
    });
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validate a single block node
 */
export function validateBlock(
  block: BlockNode,
  path: string,
  visitedIds: Set<string> = new Set()
): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];

  // Check for required fields
  if (!block.type) {
    errors.push({
      blockId: block._uiMuseum?.id,
      field: 'type',
      message: 'Block type is required',
      code: 'MISSING_REQUIRED_FIELD',
      path: `${path}.type`,
    });
    return { valid: false, errors, warnings };
  }

  // Check if component exists in registry
  const element = getElement(block.type);
  if (!element) {
    errors.push({
      blockId: block._uiMuseum?.id,
      field: 'type',
      message: `Unknown component type: "${block.type}"`,
      code: 'UNKNOWN_COMPONENT',
      path: `${path}.type`,
    });
  } else {
    // Validate against component's slot definitions
    if (element.slots && block._uiMuseum?.slots) {
      const slotErrors = validateSlots(
        block._uiMuseum.slots,
        element.slots,
        block._uiMuseum.id || path,
        path
      );
      errors.push(...slotErrors.errors);
      warnings.push(...slotErrors.warnings);
    }

    // Check for required slots
    if (element.slots) {
      const requiredSlots = element.slots.filter(s => s.required);
      for (const requiredSlot of requiredSlots) {
        const hasSlotContent = block._uiMuseum?.slots?.[requiredSlot.id];
        const hasPropValue = block.props?.[requiredSlot.id];

        if (!hasSlotContent && !hasPropValue && !requiredSlot.defaultValue) {
          errors.push({
            blockId: block._uiMuseum?.id,
            field: `slots.${requiredSlot.id}`,
            message: `Required slot "${requiredSlot.name}" is missing`,
            code: 'MISSING_REQUIRED_SLOT',
            path: `${path}._uiMuseum.slots.${requiredSlot.id}`,
          });
        }
      }
    }
  }

  // Check for circular references
  if (block._uiMuseum?.id) {
    if (visitedIds.has(block._uiMuseum.id)) {
      errors.push({
        blockId: block._uiMuseum.id,
        field: '_uiMuseum.id',
        message: 'Circular reference detected',
        code: 'CIRCULAR_REFERENCE',
        path: `${path}._uiMuseum.id`,
      });
      return { valid: false, errors, warnings };
    }
    visitedIds.add(block._uiMuseum.id);
  }

  // Validate nested component slots
  if (block._uiMuseum?.slots) {
    Object.entries(block._uiMuseum.slots).forEach(([slotName, slotContent]) => {
      if (slotContent.type === 'component' && slotContent.value) {
        const nestedResult = validateBlock(
          slotContent.value as BlockNode,
          `${path}._uiMuseum.slots.${slotName}`,
          visitedIds
        );
        errors.push(...nestedResult.errors);
        warnings.push(...nestedResult.warnings);
      }
      if (slotContent.type === 'list' && Array.isArray(slotContent.value)) {
        (slotContent.value as RecipeSlotContent[]).forEach((item, index) => {
          if (item.type === 'component' && item.value) {
            const nestedResult = validateBlock(
              item.value as BlockNode,
              `${path}._uiMuseum.slots.${slotName}[${index}]`,
              visitedIds
            );
            errors.push(...nestedResult.errors);
            warnings.push(...nestedResult.warnings);
          }
        });
      }
    });
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validate slot content against slot definitions
 */
function validateSlots(
  slotContent: Record<string, RecipeSlotContent>,
  slotDefinitions: Array<{ id: string; name: string; type: string; required: boolean }>,
  blockId: string,
  _path: string // Reserved for future path-based error reporting
): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];

  // Check for unknown slot names
  const definedSlotIds = new Set(slotDefinitions.map(s => s.id));
  Object.keys(slotContent).forEach(slotId => {
    if (!definedSlotIds.has(slotId)) {
      warnings.push({
        blockId,
        field: `slots.${slotId}`,
        message: `Unknown slot "${slotId}" - will be ignored`,
        code: 'UNKNOWN_SLOT',
      });
    }
  });

  return { valid: errors.length === 0, errors, warnings };
}

/**
 * Quick validation check - returns true if recipe is valid
 */
export function isValidRecipe(recipe: PageRecipe): boolean {
  return validateRecipe(recipe).valid;
}

/**
 * Get a list of all component types used in a recipe
 */
export function getUsedComponentTypes(recipe: PageRecipe): string[] {
  const types = new Set<string>();

  function collectTypes(blocks: BlockNode[]) {
    for (const block of blocks) {
      types.add(block.type);

      // Check nested slots
      if (block._uiMuseum?.slots) {
        Object.values(block._uiMuseum.slots).forEach(slot => {
          if (slot.type === 'component' && slot.value) {
            collectTypes([slot.value as BlockNode]);
          }
          if (slot.type === 'list' && Array.isArray(slot.value)) {
            const componentSlots = (slot.value as RecipeSlotContent[]).filter(
              item => item.type === 'component' && item.value
            );
            collectTypes(componentSlots.map(s => s.value as BlockNode));
          }
        });
      }
    }
  }

  collectTypes(recipe.content);

  if (recipe.zones) {
    Object.values(recipe.zones).forEach(blocks => collectTypes(blocks));
  }

  return Array.from(types);
}

/**
 * Get validation summary for display
 */
export function getValidationSummary(result: ValidationResult): string {
  if (result.valid) {
    if (result.warnings.length > 0) {
      return `Valid with ${result.warnings.length} warning(s)`;
    }
    return 'Valid';
  }
  return `Invalid: ${result.errors.length} error(s)`;
}
