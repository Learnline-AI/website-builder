/**
 * Figma Integration Module
 *
 * This module provides the foundation for Figma integration in the UI Museum.
 * It includes authentication, file management, and export functionality.
 *
 * Components:
 * - FigmaProvider: Context provider for Figma state management
 * - FigmaConnectButton: OAuth connection button with user dropdown
 * - FigmaExportButton: Export component to Figma with status feedback
 * - FigmaExportDropdown: Export with format selection
 *
 * Hooks:
 * - useFigma: Access Figma context (auth, files, export)
 * - useFigmaAuth: Low-level authentication hook
 *
 * Usage:
 * ```tsx
 * import { FigmaProvider, FigmaConnectButton, FigmaExportButton, useFigma } from './components/figma';
 *
 * // Wrap your app with FigmaProvider
 * <FigmaProvider>
 *   <App />
 * </FigmaProvider>
 *
 * // Use components in your app
 * <FigmaConnectButton />
 * <FigmaExportButton componentId="my-component" />
 *
 * // Access Figma state with hook
 * const { isConnected, user, exportComponent } = useFigma();
 * ```
 *
 * Note: This implementation uses mock/placeholder functionality for OAuth
 * and API calls. In production, you'll need to:
 * 1. Set up a backend for OAuth token exchange
 * 2. Implement actual Figma API calls
 * 3. Handle real file uploads and exports
 */

// Provider and context hook
export { FigmaProvider, useFigma } from './FigmaProvider';
export type {
  FigmaFile,
  FigmaExportOptions,
  ExportStatus,
  FigmaContextValue,
} from './FigmaProvider';

// Components
export { FigmaConnectButton } from './FigmaConnectButton';
export { FigmaExportButton, FigmaExportDropdown } from './FigmaExportButton';

// Hooks
export { useFigmaAuth } from './hooks/useFigmaAuth';
export type {
  FigmaUser,
  FigmaAuthState,
  UseFigmaAuthReturn,
} from './hooks/useFigmaAuth';
