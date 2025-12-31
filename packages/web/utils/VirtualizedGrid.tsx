/**
 * VirtualizedGrid
 *
 * High-performance grid component using @tanstack/react-virtual.
 * Renders only visible items for optimal performance with large datasets.
 * Supports variable row heights and responsive column counts.
 */

import React, { useRef, useMemo, useCallback, useEffect, useState } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

// ============================================================================
// TYPES
// ============================================================================

export interface VirtualizedGridProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T, index: number) => string;
  columnCount?: number | 'auto';
  gap?: number;
  estimatedItemHeight?: number;
  overscan?: number;
  className?: string;
  onScrollEnd?: () => void;
  scrollEndThreshold?: number;
}

interface GridDimensions {
  width: number;
  columnCount: number;
  columnWidth: number;
}

// ============================================================================
// RESPONSIVE COLUMN CALCULATOR
// ============================================================================

function calculateResponsiveColumns(
  containerWidth: number,
  minColumnWidth: number = 280,
  maxColumns: number = 6,
  gap: number = 16
): number {
  if (containerWidth <= 0) return 1;

  // Account for gaps in calculation
  const availableWidth = containerWidth + gap;
  const columns = Math.floor(availableWidth / (minColumnWidth + gap));

  return Math.max(1, Math.min(columns, maxColumns));
}

// ============================================================================
// COMPONENT
// ============================================================================

export function VirtualizedGrid<T>({
  items,
  renderItem,
  keyExtractor,
  columnCount = 'auto',
  gap = 16,
  estimatedItemHeight = 300,
  overscan = 3,
  className = '',
  onScrollEnd,
  scrollEndThreshold = 200,
}: VirtualizedGridProps<T>) {
  const parentRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<GridDimensions>({
    width: 0,
    columnCount: 1,
    columnWidth: 280,
  });

  // Track container dimensions
  useEffect(() => {
    const container = parentRef.current;
    if (!container) return;

    const updateDimensions = () => {
      const width = container.clientWidth;
      const cols = columnCount === 'auto'
        ? calculateResponsiveColumns(width, 280, 6, gap)
        : columnCount;
      const colWidth = (width - (cols - 1) * gap) / cols;

      setDimensions({
        width,
        columnCount: cols,
        columnWidth: colWidth,
      });
    };

    // Initial measurement
    updateDimensions();

    // Watch for resize
    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, [columnCount, gap]);

  // Calculate row count
  const rowCount = useMemo(() => {
    return Math.ceil(items.length / dimensions.columnCount);
  }, [items.length, dimensions.columnCount]);

  // Create virtualizer for rows
  const virtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimatedItemHeight + gap,
    overscan,
  });

  // Handle scroll for infinite loading
  const handleScroll = useCallback(() => {
    if (!onScrollEnd || !parentRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = parentRef.current;
    if (scrollHeight - scrollTop - clientHeight < scrollEndThreshold) {
      onScrollEnd();
    }
  }, [onScrollEnd, scrollEndThreshold]);

  // Get items for a specific row
  const getRowItems = useCallback((rowIndex: number): T[] => {
    const startIndex = rowIndex * dimensions.columnCount;
    return items.slice(startIndex, startIndex + dimensions.columnCount);
  }, [items, dimensions.columnCount]);

  const virtualRows = virtualizer.getVirtualItems();

  return (
    <div
      ref={parentRef}
      className={`overflow-auto ${className}`}
      onScroll={handleScroll}
      style={{ contain: 'strict' }}
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualRows.map((virtualRow) => {
          const rowItems = getRowItems(virtualRow.index);

          return (
            <div
              key={virtualRow.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${dimensions.columnCount}, 1fr)`,
                  gap: `${gap}px`,
                  paddingBottom: `${gap}px`,
                }}
              >
                {rowItems.map((item, colIndex) => {
                  const itemIndex = virtualRow.index * dimensions.columnCount + colIndex;
                  return (
                    <div key={keyExtractor(item, itemIndex)}>
                      {renderItem(item, itemIndex)}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// SIMPLE LIST VARIANT
// ============================================================================

export interface VirtualizedListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T, index: number) => string;
  estimatedItemHeight?: number;
  overscan?: number;
  className?: string;
}

export function VirtualizedList<T>({
  items,
  renderItem,
  keyExtractor,
  estimatedItemHeight = 60,
  overscan = 5,
  className = '',
}: VirtualizedListProps<T>) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimatedItemHeight,
    overscan,
  });

  const virtualItems = virtualizer.getVirtualItems();

  return (
    <div
      ref={parentRef}
      className={`overflow-auto ${className}`}
      style={{ contain: 'strict' }}
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualItems.map((virtualItem) => {
          const item = items[virtualItem.index];
          const key = keyExtractor(item, virtualItem.index);
          return (
            <div
              key={key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              {renderItem(item, virtualItem.index)}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default VirtualizedGrid;
