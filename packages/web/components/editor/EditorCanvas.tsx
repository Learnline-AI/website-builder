/**
 * EditorCanvas
 *
 * Main canvas area for the visual editor.
 * Supports zoom, pan, block selection, and drag-drop reordering.
 */

import React, { useRef, useCallback } from 'react';
import { useGesture } from '@use-gesture/react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useEditorStore } from './store';
import { SortableBlock } from './SortableBlock';
import { ThemeProvider } from '../../contexts';

// ============================================================================
// ZOOM CONTROLS
// ============================================================================

const ZoomControls: React.FC = () => {
  const { zoom, zoomIn, zoomOut, resetZoom } = useEditorStore();

  return (
    <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-neutral-900/90 backdrop-blur-sm rounded-lg border border-white/10 p-1">
      <button
        onClick={zoomOut}
        disabled={zoom <= 0.25}
        className="w-8 h-8 rounded-md flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        title="Zoom out"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14" />
        </svg>
      </button>

      <button
        onClick={resetZoom}
        className="px-3 h-8 rounded-md text-xs font-mono text-white/70 hover:text-white hover:bg-white/10 transition-colors"
        title="Reset zoom"
      >
        {Math.round(zoom * 100)}%
      </button>

      <button
        onClick={zoomIn}
        disabled={zoom >= 2}
        className="w-8 h-8 rounded-md flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        title="Zoom in"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>
    </div>
  );
};

// ============================================================================
// EMPTY CANVAS STATE
// ============================================================================

const EmptyCanvas: React.FC = () => {
  const { setSidebarTab } = useEditorStore();

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center mb-6">
        <svg className="w-10 h-10 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M12 8v8M8 12h8" />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">
        Start building your page
      </h3>
      <p className="text-white/50 max-w-sm mb-6">
        Add components from the sidebar to start creating your layout.
        Drag to reorder, click to select and edit.
      </p>
      <button
        onClick={() => setSidebarTab('components')}
        className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12h14" />
        </svg>
        Add Component
      </button>
    </div>
  );
};

// ============================================================================
// EDITOR CANVAS
// ============================================================================

export const EditorCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const {
    recipe,
    zoom,
    panOffset,
    setZoom,
    setPanOffset,
    moveBlock,
    setIsDragging,
    previewTheme,
  } = useEditorStore();

  // DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Pan and zoom gestures
  useGesture(
    {
      onWheel: ({ event, delta, ctrlKey }) => {
        event.preventDefault();

        if (ctrlKey) {
          // Zoom with Ctrl+scroll
          const newZoom = Math.max(0.25, Math.min(2, zoom - delta[1] * 0.001));
          setZoom(newZoom);
        } else {
          // Pan with scroll
          setPanOffset({
            x: panOffset.x - delta[0],
            y: panOffset.y - delta[1],
          });
        }
      },
      onDrag: ({ delta, event }) => {
        // Only pan if middle mouse button or space+drag
        if ((event as MouseEvent).button === 1) {
          setPanOffset({
            x: panOffset.x + delta[0],
            y: panOffset.y + delta[1],
          });
        }
      },
    },
    {
      target: canvasRef,
      eventOptions: { passive: false },
    }
  );

  // Handle drag end for reordering
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      setIsDragging(false);

      if (over && active.id !== over.id) {
        const blocks = recipe?.content || [];
        const oldIndex = blocks.findIndex((b) => b._uiMuseum?.id === active.id);
        const newIndex = blocks.findIndex((b) => b._uiMuseum?.id === over.id);

        if (oldIndex !== -1 && newIndex !== -1) {
          moveBlock(active.id as string, newIndex);
        }
      }
    },
    [recipe, moveBlock, setIsDragging]
  );

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
  }, [setIsDragging]);

  // Get block IDs for sortable context
  const blockIds = recipe?.content.map((b) => b._uiMuseum?.id || '') || [];

  return (
    <div ref={canvasRef} className="relative w-full h-full overflow-hidden bg-neutral-950" style={{ touchAction: 'none' }}>
      {/* Grid pattern background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: `${20 * zoom}px ${20 * zoom}px`,
          backgroundPosition: `${panOffset.x}px ${panOffset.y}px`,
        }}
      />

      {/* Canvas content - scroll container (NOT transformed) */}
      <div className="absolute inset-0 overflow-auto">
        {/* Pan offset container */}
        <div
          style={{
            transform: `translate(${panOffset.x}px, ${panOffset.y}px)`,
            minWidth: '100%',
            minHeight: '100%',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '32px',
            paddingBottom: '64px',
          }}
        >
          {/* Zoom container */}
          <div
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: 'top center',
            }}
          >
            {!recipe || recipe.content.length === 0 ? (
              <EmptyCanvas />
            ) : (
              <div className="w-[1200px] bg-white rounded-2xl shadow-2xl">
                <ThemeProvider defaultTheme={previewTheme as 'default' | 'dark' | 'brutal' | 'neon' | 'cosmic' | 'glass'}>
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                  >
                    <SortableContext items={blockIds} strategy={verticalListSortingStrategy}>
                      <div className="recipe-canvas flex flex-wrap items-start gap-2 p-4">
                        {recipe.content.map((block) => (
                          <SortableBlock
                            key={block._uiMuseum?.id}
                            block={block}
                          />
                        ))}
                      </div>
                    </SortableContext>
                  </DndContext>
                </ThemeProvider>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Zoom controls */}
      <ZoomControls />

      {/* Keyboard shortcuts hint */}
      <div className="absolute bottom-4 left-4 flex items-center gap-4 text-xs text-white/40">
        <span className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono">Ctrl</kbd>
          <span>+ Scroll to zoom</span>
        </span>
        <span className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono">Del</kbd>
          <span>to delete</span>
        </span>
        <span className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono">Ctrl+D</kbd>
          <span>to duplicate</span>
        </span>
      </div>
    </div>
  );
};

export default EditorCanvas;
