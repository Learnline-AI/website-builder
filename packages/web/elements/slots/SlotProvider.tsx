/**
 * SlotProvider - Context provider for managing slot content
 *
 * Allows parent components to provide slot content that children can access
 */

import React, { createContext, useContext, useMemo } from 'react';
import type { SlotContent, SlotDefinition } from '../registry';

// ============================================
// CONTEXT TYPES
// ============================================

interface SlotContextValue {
  /** Map of slot ID to content */
  slots: Record<string, SlotContent | React.ReactNode>;
  /** Get content for a specific slot */
  getSlot: (slotId: string) => SlotContent | React.ReactNode | undefined;
  /** Check if a slot has content */
  hasSlot: (slotId: string) => boolean;
  /** Get all defined slot IDs */
  getSlotIds: () => string[];
  /** Slot definitions from the component */
  definitions: SlotDefinition[];
}

// ============================================
// CONTEXT
// ============================================

const SlotContext = createContext<SlotContextValue | null>(null);

// ============================================
// PROVIDER PROPS
// ============================================

interface SlotProviderProps {
  /** Slot content to provide */
  slots?: Record<string, SlotContent | React.ReactNode>;
  /** Slot definitions for validation */
  definitions?: SlotDefinition[];
  /** Children to render */
  children: React.ReactNode;
}

// ============================================
// SLOT PROVIDER COMPONENT
// ============================================

export const SlotProvider: React.FC<SlotProviderProps> = ({
  slots = {},
  definitions = [],
  children,
}) => {
  const value = useMemo<SlotContextValue>(() => ({
    slots,
    definitions,
    getSlot: (slotId: string) => slots[slotId],
    hasSlot: (slotId: string) => slotId in slots && slots[slotId] !== undefined,
    getSlotIds: () => Object.keys(slots),
  }), [slots, definitions]);

  return (
    <SlotContext.Provider value={value}>
      {children}
    </SlotContext.Provider>
  );
};

// ============================================
// HOOKS
// ============================================

/**
 * useSlotContext - Access the full slot context
 */
export function useSlotContext(): SlotContextValue | null {
  return useContext(SlotContext);
}

/**
 * useSlot - Get content for a specific slot
 *
 * @param slotId - The slot ID to get content for
 * @param defaultValue - Default value if no content provided
 * @returns The slot content or default value
 */
export function useSlot<T = React.ReactNode>(
  slotId: string,
  defaultValue?: T
): T | undefined {
  const context = useContext(SlotContext);

  if (!context) {
    return defaultValue;
  }

  const content = context.getSlot(slotId);

  if (content === undefined) {
    return defaultValue;
  }

  return content as T;
}

/**
 * useSlotDefinition - Get the definition for a specific slot
 */
export function useSlotDefinition(slotId: string): SlotDefinition | undefined {
  const context = useContext(SlotContext);

  if (!context) {
    return undefined;
  }

  return context.definitions.find(def => def.id === slotId);
}

/**
 * useRequiredSlots - Check if all required slots are filled
 */
export function useRequiredSlots(): {
  allFilled: boolean;
  missingSlots: string[];
} {
  const context = useContext(SlotContext);

  if (!context) {
    return { allFilled: true, missingSlots: [] };
  }

  const requiredSlots = context.definitions.filter(def => def.required);
  const missingSlots = requiredSlots
    .filter(def => !context.hasSlot(def.id))
    .map(def => def.id);

  return {
    allFilled: missingSlots.length === 0,
    missingSlots,
  };
}

export default SlotProvider;
