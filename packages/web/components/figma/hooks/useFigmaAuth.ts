/**
 * useFigmaAuth Hook
 *
 * Custom hook for managing Figma authentication state.
 * Uses localStorage to persist connection state for demo purposes.
 * In production, this would integrate with a real OAuth backend.
 */

import { useState, useEffect, useCallback } from 'react';

// ============================================================================
// TYPES
// ============================================================================

export interface FigmaUser {
  id: string;
  handle: string;
  email: string;
  imgUrl: string;
}

export interface FigmaAuthState {
  isConnected: boolean;
  isLoading: boolean;
  user: FigmaUser | null;
  error: string | null;
}

export interface UseFigmaAuthReturn extends FigmaAuthState {
  connect: () => Promise<void>;
  disconnect: () => void;
  refreshAuth: () => Promise<void>;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const FIGMA_AUTH_STORAGE_KEY = 'ui-museum-figma-auth';
const FIGMA_USER_STORAGE_KEY = 'ui-museum-figma-user';

// Mock user for demo purposes
const MOCK_FIGMA_USER: FigmaUser = {
  id: 'mock-user-123',
  handle: 'designer',
  email: 'designer@example.com',
  imgUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=figma-user',
};

// ============================================================================
// HOOK
// ============================================================================

export function useFigmaAuth(): UseFigmaAuthReturn {
  const [state, setState] = useState<FigmaAuthState>(() => {
    // Initialize from localStorage
    if (typeof window === 'undefined') {
      return {
        isConnected: false,
        isLoading: false,
        user: null,
        error: null,
      };
    }

    try {
      const storedAuth = localStorage.getItem(FIGMA_AUTH_STORAGE_KEY);
      const storedUser = localStorage.getItem(FIGMA_USER_STORAGE_KEY);

      if (storedAuth === 'connected' && storedUser) {
        return {
          isConnected: true,
          isLoading: false,
          user: JSON.parse(storedUser),
          error: null,
        };
      }
    } catch {
      // Ignore parse errors
    }

    return {
      isConnected: false,
      isLoading: false,
      user: null,
      error: null,
    };
  });

  // Persist auth state to localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (state.isConnected && state.user) {
      localStorage.setItem(FIGMA_AUTH_STORAGE_KEY, 'connected');
      localStorage.setItem(FIGMA_USER_STORAGE_KEY, JSON.stringify(state.user));
    } else {
      localStorage.removeItem(FIGMA_AUTH_STORAGE_KEY);
      localStorage.removeItem(FIGMA_USER_STORAGE_KEY);
    }
  }, [state.isConnected, state.user]);

  /**
   * Initiate Figma OAuth connection
   * In production, this would redirect to Figma's OAuth flow
   * For demo, we simulate the connection with a mock user
   */
  const connect = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Simulate OAuth flow delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // In production, this would:
      // 1. Redirect to Figma OAuth: https://www.figma.com/oauth
      // 2. Handle callback with authorization code
      // 3. Exchange code for access token via backend
      // 4. Fetch user info with access token

      // For demo, use mock user
      setState({
        isConnected: true,
        isLoading: false,
        user: MOCK_FIGMA_USER,
        error: null,
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to connect to Figma',
      }));
    }
  }, []);

  /**
   * Disconnect from Figma
   */
  const disconnect = useCallback(() => {
    setState({
      isConnected: false,
      isLoading: false,
      user: null,
      error: null,
    });
  }, []);

  /**
   * Refresh authentication state
   * In production, this would validate the access token
   */
  const refreshAuth = useCallback(async () => {
    if (!state.isConnected) return;

    setState(prev => ({ ...prev, isLoading: true }));

    try {
      // Simulate token validation
      await new Promise(resolve => setTimeout(resolve, 500));

      // In production, validate token with Figma API
      // If token is expired, attempt refresh or prompt re-auth

      setState(prev => ({ ...prev, isLoading: false }));
    } catch (error) {
      setState({
        isConnected: false,
        isLoading: false,
        user: null,
        error: 'Session expired. Please reconnect.',
      });
    }
  }, [state.isConnected]);

  return {
    ...state,
    connect,
    disconnect,
    refreshAuth,
  };
}
