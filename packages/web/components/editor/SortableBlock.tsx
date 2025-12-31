/**
 * SortableBlock
 *
 * Wrapper for recipe blocks that enables drag-and-drop reordering
 * and selection/editing interactions.
 */

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { BlockNode } from '../../recipes/types';
import { getElement } from '../../elements/registry';
import { useEditorStore } from './store';

// ============================================================================
// UNKNOWN BLOCK
// ============================================================================

interface UnknownBlockProps {
  type: string;
  blockId?: string;
}

const UnknownBlock: React.FC<UnknownBlockProps> = ({ type, blockId }) => (
  <div className="p-6 border-2 border-dashed border-red-300 bg-red-50 rounded-lg">
    <div className="text-red-600 font-medium">Unknown Component</div>
    <div className="text-red-500 text-sm mt-1">Type: {type}</div>
    {blockId && <div className="text-red-400 text-xs mt-1">ID: {blockId}</div>}
  </div>
);

// ============================================================================
// SORTABLE BLOCK
// ============================================================================

interface SortableBlockProps {
  block: BlockNode;
}

export const SortableBlock: React.FC<SortableBlockProps> = ({ block }) => {
  const blockId = block._uiMuseum?.id || '';

  const {
    selectedBlockId,
    hoveredBlockId,
    selectBlock,
    hoverBlock,
    removeBlock,
    duplicateBlock,
  } = useEditorStore();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: blockId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : undefined,
  };

  // Get component from registry
  const entry = getElement(block.type);
  const Component = entry?.component;

  // Determine if this is an inline element (icons, small atoms)
  const isInlineElement = entry?.layer === 'atom' && ['icons', 'badges', 'shapes'].includes(entry?.category || '');

  const isSelected = selectedBlockId === blockId;
  const isHovered = hoveredBlockId === blockId;

  // Handle click to select
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectBlock(blockId);
  };

  // Handle keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isSelected) return;

    switch (e.key) {
      case 'Delete':
      case 'Backspace':
        e.preventDefault();
        removeBlock(blockId);
        break;
      case 'd':
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          duplicateBlock(blockId);
        }
        break;
      case 'Escape':
        selectBlock(null);
        break;
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => hoverBlock(blockId)}
      onMouseLeave={() => hoverBlock(null)}
      className={`
        relative group outline-none
        ${isDragging ? 'cursor-grabbing' : 'cursor-pointer'}
        ${isInlineElement ? 'inline-block w-auto' : ''}
      `}
      {...attributes}
    >
      {/* Selection/hover outline */}
      <div
        className={`
          absolute inset-0 pointer-events-none z-10 transition-all duration-200
          ${isSelected
            ? 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-white'
            : isHovered
            ? 'ring-2 ring-indigo-500/30'
            : ''
          }
        `}
      />

      {/* Block toolbar */}
      {(isSelected || isHovered) && !isDragging && (
        <div
          className={`
            absolute -top-10 left-0 right-0 flex items-center justify-between z-20
            transition-opacity duration-200
            ${isSelected ? 'opacity-100' : 'opacity-70'}
          `}
        >
          {/* Left side - Drag handle and type */}
          <div className="flex items-center gap-2">
            {/* Drag handle */}
            <button
              {...listeners}
              className="w-8 h-8 rounded-lg bg-neutral-900 border border-white/10 flex items-center justify-center cursor-grab hover:bg-neutral-800 transition-colors"
              title="Drag to reorder"
            >
              <svg className="w-4 h-4 text-white/60" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="9" cy="6" r="1.5" />
                <circle cx="15" cy="6" r="1.5" />
                <circle cx="9" cy="12" r="1.5" />
                <circle cx="15" cy="12" r="1.5" />
                <circle cx="9" cy="18" r="1.5" />
                <circle cx="15" cy="18" r="1.5" />
              </svg>
            </button>

            {/* Block type badge */}
            <div className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-white/10 text-xs font-medium text-white/70">
              {entry?.name || block.type}
            </div>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center gap-1">
            {/* Duplicate */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                duplicateBlock(blockId);
              }}
              className="w-8 h-8 rounded-lg bg-neutral-900 border border-white/10 flex items-center justify-center hover:bg-neutral-800 transition-colors"
              title="Duplicate (Ctrl+D)"
            >
              <svg className="w-4 h-4 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" />
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
              </svg>
            </button>

            {/* Delete */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeBlock(blockId);
              }}
              className="w-8 h-8 rounded-lg bg-red-500/20 border border-red-500/30 flex items-center justify-center hover:bg-red-500/30 transition-colors"
              title="Delete (Del)"
            >
              <svg className="w-4 h-4 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Render the actual component */}
      <div className="relative">
        {Component ? (
          <Component {...block.props} />
        ) : (
          <UnknownBlock type={block.type} blockId={blockId} />
        )}
      </div>
    </div>
  );
};

export default SortableBlock;
