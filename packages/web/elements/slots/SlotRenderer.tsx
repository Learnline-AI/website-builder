/**
 * SlotRenderer - Renders content for a slot with fallback to defaults
 *
 * Uses @radix-ui/react-slot for polymorphic component composition
 */

import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import type { SlotDefinition, SlotContent } from '../registry';

interface SlotRendererProps {
  /** The slot definition describing this slot */
  slot: SlotDefinition;
  /** The content provided for this slot */
  content?: SlotContent | React.ReactNode;
  /** Additional className to apply */
  className?: string;
  /** Whether to render as child (using Radix Slot) */
  asChild?: boolean;
  /** Fallback if no content and no defaultValue */
  fallback?: React.ReactNode;
}

/**
 * Checks if content is a SlotContent object
 */
function isSlotContent(content: unknown): content is SlotContent {
  return (
    typeof content === 'object' &&
    content !== null &&
    'slotId' in content &&
    'content' in content
  );
}

/**
 * SlotRenderer component renders slot content with proper defaults and fallbacks
 */
export const SlotRenderer: React.FC<SlotRendererProps> = ({
  slot,
  content,
  className,
  asChild = false,
  fallback,
}) => {
  // Determine what to render
  const resolveContent = (): React.ReactNode => {
    // If content is provided
    if (content !== undefined && content !== null) {
      // If it's a SlotContent object, extract the content
      if (isSlotContent(content)) {
        return content.content as React.ReactNode;
      }
      // Otherwise, render it directly
      return content as React.ReactNode;
    }

    // Fall back to slot's default value
    if (slot.defaultValue !== undefined) {
      return slot.defaultValue as React.ReactNode;
    }

    // Fall back to provided fallback
    if (fallback !== undefined) {
      return fallback;
    }

    // Show placeholder if available
    if (slot.placeholder) {
      return (
        <span className="text-gray-400 italic">
          {slot.placeholder}
        </span>
      );
    }

    // Return null for optional slots
    if (!slot.required) {
      return null;
    }

    // Required slot with no content
    return (
      <span className="text-red-400 italic">
        [{slot.name} required]
      </span>
    );
  };

  const renderedContent = resolveContent();

  // If no content and slot is optional, return null
  if (renderedContent === null) {
    return null;
  }

  // Use Radix Slot for polymorphic composition if asChild is true
  if (asChild && React.isValidElement(renderedContent)) {
    return (
      <Slot className={className}>
        {renderedContent}
      </Slot>
    );
  }

  // Otherwise, wrap in a fragment or span
  if (className) {
    return <span className={className}>{renderedContent}</span>;
  }

  return <>{renderedContent}</>;
};

/**
 * SlotContainer - Wrapper for slot content that handles list-type slots
 */
interface SlotContainerProps {
  slot: SlotDefinition;
  items?: Array<SlotContent | React.ReactNode>;
  renderItem?: (item: SlotContent | React.ReactNode, index: number) => React.ReactNode;
  className?: string;
  itemClassName?: string;
  emptyMessage?: string;
}

export const SlotContainer: React.FC<SlotContainerProps> = ({
  slot,
  items = [],
  renderItem,
  className,
  itemClassName,
  emptyMessage,
}) => {
  // Handle list-type slots
  if (slot.type === 'list' && slot.multiple) {
    const itemsToRender: Array<SlotContent | React.ReactNode> = items.length > 0
      ? items
      : ((slot.defaultValue as Array<SlotContent | React.ReactNode>) || []);

    if (itemsToRender.length === 0) {
      if (emptyMessage) {
        return <div className={className}>{emptyMessage}</div>;
      }
      return null;
    }

    return (
      <div className={className}>
        {itemsToRender.map((item, index) => (
          <div key={index} className={itemClassName}>
            {renderItem ? (
              renderItem(item, index)
            ) : (
              <SlotRenderer slot={slot} content={item as SlotContent | React.ReactNode} />
            )}
          </div>
        ))}
      </div>
    );
  }

  // For non-list slots, just render the first item or default
  return (
    <SlotRenderer
      slot={slot}
      content={items[0]}
      className={className}
    />
  );
};

export default SlotRenderer;
