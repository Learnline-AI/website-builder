/**
 * Editor Store
 *
 * Zustand store for visual editor state management.
 * Implements undo/redo with immer for immutable updates.
 */

import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { PageRecipe, BlockNode } from '../../recipes/types';
import { createRecipe, createBlockNode } from '../../recipes/types';

// ============================================================================
// TYPES
// ============================================================================

export interface EditorHistoryEntry {
  recipe: PageRecipe;
  timestamp: number;
  description: string;
}

export interface EditorState {
  // Current recipe being edited
  recipe: PageRecipe | null;

  // Selection state
  selectedBlockId: string | null;
  hoveredBlockId: string | null;
  multiSelectedBlockIds: string[];

  // Canvas state
  zoom: number;
  panOffset: { x: number; y: number };

  // Sidebar state
  sidebarTab: 'components' | 'layers' | 'settings';
  searchQuery: string;

  // History for undo/redo
  history: EditorHistoryEntry[];
  historyIndex: number;
  maxHistorySize: number;

  // UI state
  isDragging: boolean;
  isPropertyPanelOpen: boolean;
  previewTheme: string;
}

export interface EditorActions {
  // Recipe management
  loadRecipe: (recipe: PageRecipe) => void;
  createNewRecipe: (name: string) => void;
  saveRecipe: () => PageRecipe | null;

  // Block operations
  addBlock: (type: string, index?: number) => void;
  removeBlock: (blockId: string) => void;
  duplicateBlock: (blockId: string) => void;
  moveBlock: (blockId: string, newIndex: number) => void;
  updateBlockProps: (blockId: string, props: Record<string, unknown>) => void;

  // Selection
  selectBlock: (blockId: string | null) => void;
  hoverBlock: (blockId: string | null) => void;
  addToSelection: (blockId: string) => void;
  clearSelection: () => void;

  // Canvas
  setZoom: (zoom: number) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
  setPanOffset: (offset: { x: number; y: number }) => void;

  // Sidebar
  setSidebarTab: (tab: 'components' | 'layers' | 'settings') => void;
  setSearchQuery: (query: string) => void;

  // History
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  pushHistory: (description: string) => void;

  // UI
  setIsDragging: (isDragging: boolean) => void;
  setPropertyPanelOpen: (open: boolean) => void;
  setPreviewTheme: (theme: string) => void;
}

// ============================================================================
// INITIAL STATE
// ============================================================================

const initialState: EditorState = {
  recipe: null,
  selectedBlockId: null,
  hoveredBlockId: null,
  multiSelectedBlockIds: [],
  zoom: 1,
  panOffset: { x: 0, y: 0 },
  sidebarTab: 'components',
  searchQuery: '',
  history: [],
  historyIndex: -1,
  maxHistorySize: 50,
  isDragging: false,
  isPropertyPanelOpen: true,
  previewTheme: 'default',
};

// ============================================================================
// STORE
// ============================================================================

export const useEditorStore = create<EditorState & EditorActions>()(
  devtools(
    subscribeWithSelector(
      immer((set, get) => ({
        ...initialState,

        // Recipe management
        loadRecipe: (recipe) => {
          set((state) => {
            state.recipe = recipe;
            state.selectedBlockId = null;
            state.hoveredBlockId = null;
            state.multiSelectedBlockIds = [];
            state.history = [{
              recipe: JSON.parse(JSON.stringify(recipe)),
              timestamp: Date.now(),
              description: 'Load recipe',
            }];
            state.historyIndex = 0;
          });
        },

        createNewRecipe: (name) => {
          const recipe = createRecipe(name, 'custom', 'user');
          get().loadRecipe(recipe);
        },

        saveRecipe: () => {
          const { recipe } = get();
          if (!recipe) return null;

          // Update timestamp
          set((state) => {
            if (state.recipe) {
              state.recipe._uiMuseum.updatedAt = new Date().toISOString();
            }
          });

          return get().recipe;
        },

        // Block operations
        addBlock: (type, index) => {
          set((state) => {
            // Auto-create recipe if none exists
            if (!state.recipe) {
              const newRecipe = createRecipe('Untitled Page', 'custom', 'user');
              state.recipe = newRecipe;
              state.history = [{
                recipe: JSON.parse(JSON.stringify(newRecipe)),
                timestamp: Date.now(),
                description: 'Create new recipe',
              }];
              state.historyIndex = 0;
            }

            const block = createBlockNode(type, {}, 'user');
            const insertIndex = index ?? state.recipe.content.length;
            state.recipe.content.splice(insertIndex, 0, block);
            state.selectedBlockId = block._uiMuseum!.id;
          });
          get().pushHistory(`Add ${type} block`);
        },

        removeBlock: (blockId) => {
          set((state) => {
            if (!state.recipe) return;

            const index = state.recipe.content.findIndex(
              (b) => b._uiMuseum?.id === blockId
            );
            if (index !== -1) {
              state.recipe.content.splice(index, 1);
            }

            if (state.selectedBlockId === blockId) {
              state.selectedBlockId = null;
            }
            state.multiSelectedBlockIds = state.multiSelectedBlockIds.filter(
              (id) => id !== blockId
            );
          });
          get().pushHistory('Remove block');
        },

        duplicateBlock: (blockId) => {
          set((state) => {
            if (!state.recipe) return;

            const index = state.recipe.content.findIndex(
              (b) => b._uiMuseum?.id === blockId
            );
            if (index === -1) return;

            const original = state.recipe.content[index];
            const duplicate: BlockNode = {
              ...JSON.parse(JSON.stringify(original)),
              _uiMuseum: {
                ...original._uiMuseum,
                id: `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                addedAt: new Date().toISOString(),
              },
            };

            state.recipe.content.splice(index + 1, 0, duplicate);
            state.selectedBlockId = duplicate._uiMuseum!.id;
          });
          get().pushHistory('Duplicate block');
        },

        moveBlock: (blockId, newIndex) => {
          set((state) => {
            if (!state.recipe) return;

            const currentIndex = state.recipe.content.findIndex(
              (b) => b._uiMuseum?.id === blockId
            );
            if (currentIndex === -1) return;

            const [block] = state.recipe.content.splice(currentIndex, 1);
            state.recipe.content.splice(newIndex, 0, block);
          });
          get().pushHistory('Move block');
        },

        updateBlockProps: (blockId, props) => {
          set((state) => {
            if (!state.recipe) return;

            const block = state.recipe.content.find(
              (b) => b._uiMuseum?.id === blockId
            );
            if (block) {
              block.props = { ...block.props, ...props };
            }
          });
          get().pushHistory('Update block props');
        },

        // Selection
        selectBlock: (blockId) => {
          set((state) => {
            state.selectedBlockId = blockId;
            state.multiSelectedBlockIds = blockId ? [blockId] : [];
          });
        },

        hoverBlock: (blockId) => {
          set((state) => {
            state.hoveredBlockId = blockId;
          });
        },

        addToSelection: (blockId) => {
          set((state) => {
            if (!state.multiSelectedBlockIds.includes(blockId)) {
              state.multiSelectedBlockIds.push(blockId);
            }
          });
        },

        clearSelection: () => {
          set((state) => {
            state.selectedBlockId = null;
            state.multiSelectedBlockIds = [];
          });
        },

        // Canvas
        setZoom: (zoom) => {
          set((state) => {
            state.zoom = Math.max(0.25, Math.min(2, zoom));
          });
        },

        zoomIn: () => {
          set((state) => {
            state.zoom = Math.min(2, state.zoom + 0.1);
          });
        },

        zoomOut: () => {
          set((state) => {
            state.zoom = Math.max(0.25, state.zoom - 0.1);
          });
        },

        resetZoom: () => {
          set((state) => {
            state.zoom = 1;
            state.panOffset = { x: 0, y: 0 };
          });
        },

        setPanOffset: (offset) => {
          set((state) => {
            state.panOffset = offset;
          });
        },

        // Sidebar
        setSidebarTab: (tab) => {
          set((state) => {
            state.sidebarTab = tab;
          });
        },

        setSearchQuery: (query) => {
          set((state) => {
            state.searchQuery = query;
          });
        },

        // History
        undo: () => {
          const { historyIndex, history } = get();
          if (historyIndex <= 0) return;

          set((state) => {
            state.historyIndex = historyIndex - 1;
            state.recipe = JSON.parse(JSON.stringify(history[historyIndex - 1].recipe));
            state.selectedBlockId = null;
          });
        },

        redo: () => {
          const { historyIndex, history } = get();
          if (historyIndex >= history.length - 1) return;

          set((state) => {
            state.historyIndex = historyIndex + 1;
            state.recipe = JSON.parse(JSON.stringify(history[historyIndex + 1].recipe));
            state.selectedBlockId = null;
          });
        },

        canUndo: () => get().historyIndex > 0,

        canRedo: () => get().historyIndex < get().history.length - 1,

        pushHistory: (description) => {
          set((state) => {
            if (!state.recipe) return;

            // Remove any future history entries
            state.history = state.history.slice(0, state.historyIndex + 1);

            // Add new entry
            state.history.push({
              recipe: JSON.parse(JSON.stringify(state.recipe)),
              timestamp: Date.now(),
              description,
            });

            // Trim if exceeds max size
            if (state.history.length > state.maxHistorySize) {
              state.history = state.history.slice(-state.maxHistorySize);
            }

            state.historyIndex = state.history.length - 1;
          });
        },

        // UI
        setIsDragging: (isDragging) => {
          set((state) => {
            state.isDragging = isDragging;
          });
        },

        setPropertyPanelOpen: (open) => {
          set((state) => {
            state.isPropertyPanelOpen = open;
          });
        },

        setPreviewTheme: (theme) => {
          set((state) => {
            state.previewTheme = theme;
          });
        },
      }))
    ),
    { name: 'ui-museum-editor' }
  )
);

// ============================================================================
// SELECTORS
// ============================================================================

export const useSelectedBlock = () => {
  return useEditorStore((state) => {
    if (!state.recipe || !state.selectedBlockId) return null;
    return state.recipe.content.find(
      (b) => b._uiMuseum?.id === state.selectedBlockId
    ) || null;
  });
};

export const useBlockCount = () => {
  return useEditorStore((state) => state.recipe?.content.length ?? 0);
};
