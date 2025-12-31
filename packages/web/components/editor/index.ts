/**
 * Visual Editor Components
 *
 * Phase 4 Part B: Visual Editor UI
 */

// Main layout
export { EditorLayout } from './EditorLayout';

// Editor components
export { ComponentBrowser } from './ComponentBrowser';
export { EditorCanvas } from './EditorCanvas';
export { PropertyPanel } from './PropertyPanel';
export { SortableBlock } from './SortableBlock';

// Store and state
export {
  useEditorStore,
  useSelectedBlock,
  useBlockCount,
  type EditorState,
  type EditorActions,
  type EditorHistoryEntry,
} from './store';
