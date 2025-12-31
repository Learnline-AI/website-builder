/**
 * FigmaProvider
 *
 * Context provider for Figma integration state.
 * Manages authentication, connected files, and provides methods
 * for connecting/disconnecting from Figma.
 */

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react';
import { useFigmaAuth, type FigmaUser } from './hooks/useFigmaAuth';

// ============================================================================
// TYPES
// ============================================================================

export interface FigmaFile {
  key: string;
  name: string;
  lastModified: string;
  thumbnailUrl?: string;
}

export interface FigmaExportOptions {
  format: 'svg' | 'png' | 'jpg' | 'pdf';
  scale?: number;
  contentsOnly?: boolean;
}

export type ExportStatus = 'idle' | 'exporting' | 'success' | 'error';

export interface FigmaContextValue {
  // Authentication
  isConnected: boolean;
  isLoading: boolean;
  user: FigmaUser | null;
  error: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;

  // Connected Files
  connectedFiles: FigmaFile[];
  addFile: (file: FigmaFile) => void;
  removeFile: (fileKey: string) => void;
  clearFiles: () => void;

  // Export functionality
  exportComponent: (
    componentId: string,
    options?: FigmaExportOptions
  ) => Promise<string | null>;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const FIGMA_FILES_STORAGE_KEY = 'ui-museum-figma-files';

// ============================================================================
// CONTEXT
// ============================================================================

const FigmaContext = createContext<FigmaContextValue | null>(null);

// ============================================================================
// HOOK
// ============================================================================

export function useFigma(): FigmaContextValue {
  const context = useContext(FigmaContext);
  if (!context) {
    throw new Error('useFigma must be used within a FigmaProvider');
  }
  return context;
}

// ============================================================================
// PROVIDER
// ============================================================================

interface FigmaProviderProps {
  children: ReactNode;
}

export function FigmaProvider({ children }: FigmaProviderProps) {
  const auth = useFigmaAuth();

  // Initialize connected files from localStorage
  const [connectedFiles, setConnectedFiles] = useState<FigmaFile[]>(() => {
    if (typeof window === 'undefined') return [];

    try {
      const stored = localStorage.getItem(FIGMA_FILES_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Persist connected files to localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(FIGMA_FILES_STORAGE_KEY, JSON.stringify(connectedFiles));
  }, [connectedFiles]);

  // Clear files when disconnected
  useEffect(() => {
    if (!auth.isConnected) {
      setConnectedFiles([]);
    }
  }, [auth.isConnected]);

  /**
   * Add a Figma file to connected files
   */
  const addFile = useCallback((file: FigmaFile) => {
    setConnectedFiles(prev => {
      // Avoid duplicates
      if (prev.some(f => f.key === file.key)) {
        return prev.map(f => (f.key === file.key ? file : f));
      }
      return [...prev, file];
    });
  }, []);

  /**
   * Remove a file from connected files
   */
  const removeFile = useCallback((fileKey: string) => {
    setConnectedFiles(prev => prev.filter(f => f.key !== fileKey));
  }, []);

  /**
   * Clear all connected files
   */
  const clearFiles = useCallback(() => {
    setConnectedFiles([]);
  }, []);

  /**
   * Export a component from Figma
   * In production, this would use the Figma API to export
   * For demo, returns a placeholder URL
   */
  const exportComponent = useCallback(
    async (
      componentId: string,
      options: FigmaExportOptions = { format: 'svg' }
    ): Promise<string | null> => {
      if (!auth.isConnected) {
        console.error('Must be connected to Figma to export');
        return null;
      }

      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // In production, this would:
        // 1. Call Figma API: GET /v1/images/:file_key
        // 2. Pass node IDs and format options
        // 3. Return the exported image URL

        // For demo, return a placeholder
        const format = options.format || 'svg';
        return `https://via.placeholder.com/400x300.${format}?text=Exported+${componentId}`;
      } catch (error) {
        console.error('Export failed:', error);
        return null;
      }
    },
    [auth.isConnected]
  );

  const value: FigmaContextValue = {
    // Auth
    isConnected: auth.isConnected,
    isLoading: auth.isLoading,
    user: auth.user,
    error: auth.error,
    connect: auth.connect,
    disconnect: auth.disconnect,

    // Files
    connectedFiles,
    addFile,
    removeFile,
    clearFiles,

    // Export
    exportComponent,
  };

  return (
    <FigmaContext.Provider value={value}>
      {children}
    </FigmaContext.Provider>
  );
}
