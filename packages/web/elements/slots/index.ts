/**
 * Slot System
 *
 * Provides content slot functionality for customizable components.
 * Uses @radix-ui/react-slot for polymorphic composition.
 */

// Components
export { SlotRenderer, SlotContainer } from './SlotRenderer';
export { SlotProvider } from './SlotProvider';

// Hooks
export {
  useSlot,
  useSlotContext,
  useSlotDefinition,
  useRequiredSlots,
} from './SlotProvider';

// Re-export types for convenience
export type { SlotDefinition, SlotContent, SlotType, SlottableProps } from '../registry';
