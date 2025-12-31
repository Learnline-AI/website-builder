/**
 * EditorLayout
 *
 * Main layout component for the visual editor.
 * Combines sidebar (component browser), canvas, and property panel.
 */

import React, { useEffect, useState } from 'react';
import { useEditorStore } from './store';
import { ComponentBrowser } from './ComponentBrowser';
import { EditorCanvas } from './EditorCanvas';
import { PropertyPanel } from './PropertyPanel';
import { exampleRecipes } from '../../recipes';
import { getElement } from '../../elements/registry';

// ============================================================================
// EXPORT MODAL
// ============================================================================

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// ============================================================================
// PREVIEW MODAL
// ============================================================================

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PreviewModal: React.FC<PreviewModalProps> = ({ isOpen, onClose }) => {
  const { recipe, previewTheme } = useEditorStore();

  if (!isOpen || !recipe) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-neutral-950">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-neutral-900 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
            <svg className="w-4 h-4 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">{recipe._uiMuseum?.name || 'Preview'}</h2>
            <p className="text-xs text-white/50">Theme: {previewTheme}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-lg bg-white/5 text-white/70 text-sm font-medium hover:bg-white/10 hover:text-white transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
          Close Preview
        </button>
      </div>

      {/* Preview content */}
      <div className="flex-1 overflow-auto p-8 flex justify-center">
        <div className="w-full max-w-[1200px] bg-white rounded-2xl shadow-2xl overflow-hidden">
          {recipe.content.map((block, index) => {
            const entry = getElement(block.type);
            const Component = entry?.component;

            return (
              <div key={block._uiMuseum?.id || index}>
                {Component ? <Component {...block.props} /> : (
                  <div className="p-6 bg-red-50 text-red-600">
                    Unknown component: {block.type}
                  </div>
                )}
              </div>
            );
          })}
          {recipe.content.length === 0 && (
            <div className="p-12 text-center text-neutral-400">
              <svg className="w-16 h-16 mx-auto mb-4 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M12 8v8M8 12h8" />
              </svg>
              <p>No blocks in this recipe yet.</p>
              <p className="text-sm mt-1">Add components from the sidebar to get started.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose }) => {
  const { recipe, previewTheme } = useEditorStore();
  const [selectedTheme, setSelectedTheme] = useState(previewTheme);
  const [isExporting, setIsExporting] = useState(false);

  const themes = ['default', 'dark', 'brutal', 'neon', 'cosmic', 'glass'];

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedTheme(previewTheme);
    }
  }, [isOpen, previewTheme]);

  const handleExport = async () => {
    if (!recipe) return;

    setIsExporting(true);
    try {
      // Call the export API
      const response = await fetch('/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipe: recipe,
          options: {
            format: 'react-tailwind',
            theme: selectedTheme,
            includeTheme: true,
            projectName: 'UI Museum Export',
            recipeName: recipe._uiMuseum?.name || 'page',
          },
        }),
      });

      if (response.ok) {
        const blob = await response.blob();
        // Download the zip file
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${recipe._uiMuseum?.name || 'export'}-${selectedTheme}.zip`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
        onClose();
      } else {
        console.error('Export failed');
      }
    } catch (error) {
      console.error('Export error:', error);
    } finally {
      setIsExporting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-neutral-900 rounded-2xl border border-white/10 shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Export Recipe</h2>
              <p className="text-sm text-white/50">{recipe?._uiMuseum?.name || 'Untitled'}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-6">
          {/* Format */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-white/70">Export Format</label>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-white">React + Tailwind CSS</p>
                  <p className="text-sm text-white/50">Vite-based project with TypeScript</p>
                </div>
              </div>
            </div>
          </div>

          {/* Theme */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-white/70">Theme</label>
            <div className="grid grid-cols-3 gap-2">
              {themes.map((theme) => (
                <button
                  key={theme}
                  onClick={() => setSelectedTheme(theme)}
                  className={`
                    px-4 py-2.5 rounded-lg text-sm font-medium capitalize transition-all
                    ${selectedTheme === theme
                      ? 'bg-indigo-500 text-white ring-2 ring-indigo-500 ring-offset-2 ring-offset-neutral-900'
                      : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                    }
                  `}
                >
                  {theme}
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
            <h4 className="text-sm font-medium text-indigo-300 mb-2">What's included:</h4>
            <ul className="text-sm text-white/60 space-y-1">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                React components for each block
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Theme CSS with design tokens
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Tailwind CSS configuration
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Ready to run with npm install && npm run dev
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-white/5 text-white/70 text-sm font-medium hover:bg-white/10 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            disabled={isExporting || !recipe}
            className="px-6 py-2 rounded-lg bg-indigo-500 text-white text-sm font-medium hover:bg-indigo-600 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isExporting ? (
              <>
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeDasharray="56" strokeDashoffset="14" />
                </svg>
                Exporting...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
                Download ZIP
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// TOOLBAR
// ============================================================================

interface EditorToolbarProps {
  onExport: () => void;
  onPreview: () => void;
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({ onExport, onPreview }) => {
  const {
    recipe,
    previewTheme,
    setPreviewTheme,
    canUndo,
    canRedo,
    undo,
    redo,
  } = useEditorStore();

  const themes = ['default', 'dark', 'brutal', 'neon', 'cosmic', 'glass'];

  return (
    <div className="h-14 bg-neutral-900/90 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-4">
      {/* Left - Recipe info */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
            <svg className="w-4 h-4 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M12 8v8M8 12h8" />
            </svg>
          </div>
          <div>
            <h1 className="text-sm font-semibold text-white">
              {recipe?._uiMuseum?.name || 'Untitled Recipe'}
            </h1>
            <p className="text-xs text-white/40">
              {recipe?.content.length || 0} blocks
            </p>
          </div>
        </div>
      </div>

      {/* Center - Theme selector */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-white/40">Theme:</span>
        <div className="flex gap-1">
          {themes.map((theme) => (
            <button
              key={theme}
              onClick={() => setPreviewTheme(theme)}
              className={`
                px-2.5 py-1 rounded-md text-xs font-medium capitalize transition-colors
                ${previewTheme === theme
                  ? 'bg-indigo-500 text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                }
              `}
            >
              {theme}
            </button>
          ))}
        </div>
      </div>

      {/* Right - Actions */}
      <div className="flex items-center gap-2">
        {/* Undo/Redo */}
        <div className="flex gap-1 mr-2">
          <button
            onClick={undo}
            disabled={!canUndo()}
            className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Undo (Ctrl+Z)"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 7v6h6M3 13a9 9 0 102.41-7.5" />
            </svg>
          </button>
          <button
            onClick={redo}
            disabled={!canRedo()}
            className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Redo (Ctrl+Shift+Z)"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 7v6h-6M21 13a9 9 0 10-2.41-7.5" />
            </svg>
          </button>
        </div>

        {/* Preview */}
        <button
          onClick={onPreview}
          className="px-4 py-2 rounded-lg bg-white/5 text-white/70 text-sm font-medium hover:bg-white/10 hover:text-white transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          Preview
        </button>

        {/* Export */}
        <button
          onClick={onExport}
          className="px-4 py-2 rounded-lg bg-indigo-500 text-white text-sm font-medium hover:bg-indigo-600 transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
          </svg>
          Export
        </button>
      </div>
    </div>
  );
};

// ============================================================================
// SIDEBAR TABS
// ============================================================================

const SidebarTabs: React.FC = () => {
  const { sidebarTab, setSidebarTab } = useEditorStore();

  const tabs = [
    { id: 'components', label: 'Components', icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    )},
    { id: 'layers', label: 'Layers', icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    )},
    { id: 'settings', label: 'Settings', icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12.22 2h-.44a2 2 0 00-2 2v.18a2 2 0 01-1 1.73l-.43.25a2 2 0 01-2 0l-.15-.08a2 2 0 00-2.73.73l-.22.38a2 2 0 00.73 2.73l.15.1a2 2 0 011 1.72v.51a2 2 0 01-1 1.74l-.15.09a2 2 0 00-.73 2.73l.22.38a2 2 0 002.73.73l.15-.08a2 2 0 012 0l.43.25a2 2 0 011 1.73V20a2 2 0 002 2h.44a2 2 0 002-2v-.18a2 2 0 011-1.73l.43-.25a2 2 0 012 0l.15.08a2 2 0 002.73-.73l.22-.39a2 2 0 00-.73-2.73l-.15-.08a2 2 0 01-1-1.74v-.5a2 2 0 011-1.74l.15-.09a2 2 0 00.73-2.73l-.22-.38a2 2 0 00-2.73-.73l-.15.08a2 2 0 01-2 0l-.43-.25a2 2 0 01-1-1.73V4a2 2 0 00-2-2z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    )},
  ] as const;

  return (
    <div className="flex border-b border-white/10">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setSidebarTab(tab.id)}
          className={`
            flex-1 px-4 py-3 flex items-center justify-center gap-2 text-xs font-medium transition-colors
            ${sidebarTab === tab.id
              ? 'text-white bg-white/5 border-b-2 border-indigo-500'
              : 'text-white/50 hover:text-white hover:bg-white/5'
            }
          `}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
};

// ============================================================================
// LAYERS PANEL
// ============================================================================

const LayersPanel: React.FC = () => {
  const { recipe, selectedBlockId, selectBlock, hoverBlock } = useEditorStore();

  if (!recipe || recipe.content.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-6">
        <p className="text-white/40 text-sm">No blocks in canvas</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-1">
      {recipe.content.map((block, index) => {
        const isSelected = selectedBlockId === block._uiMuseum?.id;
        return (
          <button
            key={block._uiMuseum?.id}
            onClick={() => selectBlock(block._uiMuseum?.id || null)}
            onMouseEnter={() => hoverBlock(block._uiMuseum?.id || null)}
            onMouseLeave={() => hoverBlock(null)}
            className={`
              w-full px-3 py-2 rounded-lg text-left transition-all duration-200
              flex items-center gap-3
              ${isSelected
                ? 'bg-indigo-500/20 text-white border border-indigo-500/30'
                : 'bg-white/5 text-white/70 border border-transparent hover:bg-white/10 hover:text-white'
              }
            `}
          >
            <span className="w-5 h-5 rounded bg-white/10 flex items-center justify-center text-[10px] font-mono text-white/50">
              {index + 1}
            </span>
            <span className="text-sm font-medium truncate">{block.type}</span>
          </button>
        );
      })}
    </div>
  );
};

// ============================================================================
// SETTINGS PANEL
// ============================================================================

const SettingsPanel: React.FC = () => {
  const { recipe, previewTheme, setPreviewTheme } = useEditorStore();

  return (
    <div className="p-4 space-y-6">
      <div className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-white/50">
          Recipe Settings
        </h3>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white/70">Name</label>
          <input
            type="text"
            value={recipe?._uiMuseum?.name || ''}
            readOnly
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white"
          />
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-white/50">
          Preview Theme
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {['default', 'dark', 'brutal', 'neon', 'cosmic', 'glass'].map((theme) => (
            <button
              key={theme}
              onClick={() => setPreviewTheme(theme)}
              className={`
                px-3 py-2 rounded-lg text-sm font-medium capitalize transition-colors
                ${previewTheme === theme
                  ? 'bg-indigo-500 text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                }
              `}
            >
              {theme}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// EDITOR LAYOUT
// ============================================================================

export const EditorLayout: React.FC = () => {
  const { recipe, loadRecipe, createNewRecipe, sidebarTab, isPropertyPanelOpen } = useEditorStore();
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize recipe on mount - ensure one always exists
  useEffect(() => {
    if (!recipe) {
      if (exampleRecipes.length > 0) {
        loadRecipe(exampleRecipes[0]);
      } else {
        // Create empty recipe if no examples available
        createNewRecipe('Untitled Page');
      }
    }
    setIsInitialized(true);
  }, []); // Run once on mount

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Undo: Ctrl+Z
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        useEditorStore.getState().undo();
      }
      // Redo: Ctrl+Shift+Z or Ctrl+Y
      if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        useEditorStore.getState().redo();
      }
      // Export: Ctrl+E
      if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        setIsExportModalOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Show loading state while initializing
  if (!isInitialized && !recipe) {
    return (
      <div className="h-screen flex items-center justify-center bg-neutral-950">
        <div className="text-center">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center mx-auto mb-4 animate-pulse">
            <svg className="w-6 h-6 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M12 8v8M8 12h8" />
            </svg>
          </div>
          <p className="text-white/50 text-sm">Loading editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-neutral-950">
      {/* Toolbar */}
      <EditorToolbar
        onExport={() => setIsExportModalOpen(true)}
        onPreview={() => setIsPreviewModalOpen(true)}
      />

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left sidebar */}
        <aside className="w-80 flex-shrink-0 bg-neutral-900/50 border-r border-white/10 flex flex-col">
          <SidebarTabs />
          <div className="flex-1 overflow-hidden">
            {sidebarTab === 'components' && <ComponentBrowser />}
            {sidebarTab === 'layers' && <LayersPanel />}
            {sidebarTab === 'settings' && <SettingsPanel />}
          </div>
        </aside>

        {/* Canvas */}
        <main className="flex-1 overflow-hidden">
          <EditorCanvas />
        </main>

        {/* Right sidebar - Property panel */}
        {isPropertyPanelOpen && (
          <aside className="w-80 flex-shrink-0 bg-neutral-900/50 border-l border-white/10 overflow-hidden">
            <PropertyPanel />
          </aside>
        )}
      </div>

      {/* Export Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />

      {/* Preview Modal */}
      <PreviewModal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
      />
    </div>
  );
};

export default EditorLayout;
