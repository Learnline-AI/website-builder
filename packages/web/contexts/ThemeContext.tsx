import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

// Available theme IDs
export const THEMES = ['default', 'dark', 'brutal', 'neon', 'cosmic', 'glass'] as const;
export type ThemeId = typeof THEMES[number];

// Theme metadata
export interface ThemeDefinition {
  id: ThemeId;
  name: string;
  description: string;
  isDark: boolean;
}

export const themeDefinitions: ThemeDefinition[] = [
  { id: 'default', name: 'Default', description: 'Clean, modern, professional', isDark: false },
  { id: 'dark', name: 'Dark', description: 'Dark mode with subtle contrast', isDark: true },
  { id: 'brutal', name: 'Neo-Brutalist', description: 'Bold, stark, high-contrast', isDark: false },
  { id: 'neon', name: 'Neon', description: 'Cyberpunk with neon glows', isDark: true },
  { id: 'cosmic', name: 'Cosmic', description: 'Deep space with aurora accents', isDark: true },
  { id: 'glass', name: 'Glass', description: 'Translucent glassmorphism', isDark: false },
];

// Token override type for custom values
export type TokenOverrides = Record<string, string>;

// Context value type
interface ThemeContextValue {
  theme: ThemeId;
  setTheme: (theme: ThemeId) => void;
  availableThemes: ThemeDefinition[];
  isDark: boolean;
  customTokens: TokenOverrides;
  setCustomTokens: (tokens: TokenOverrides) => void;
  resetCustomTokens: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

// Storage key for persisting theme preference
const THEME_STORAGE_KEY = 'ui-museum-theme';
const CUSTOM_TOKENS_STORAGE_KEY = 'ui-museum-custom-tokens';

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: ThemeId;
}

export function ThemeProvider({ children, defaultTheme = 'default' }: ThemeProviderProps) {
  // Initialize theme from storage or default
  const [theme, setThemeState] = useState<ThemeId>(() => {
    if (typeof window === 'undefined') return defaultTheme;
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored && THEMES.includes(stored as ThemeId)) {
      return stored as ThemeId;
    }
    return defaultTheme;
  });

  // Initialize custom tokens from storage
  const [customTokens, setCustomTokensState] = useState<TokenOverrides>(() => {
    if (typeof window === 'undefined') return {};
    try {
      const stored = localStorage.getItem(CUSTOM_TOKENS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  // Apply theme class to document
  useEffect(() => {
    const root = document.documentElement;

    // Remove all theme classes
    THEMES.forEach(t => root.classList.remove(`theme-${t}`));

    // Add current theme class
    root.classList.add(`theme-${theme}`);

    // Persist to storage
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  // Apply custom tokens as inline styles
  useEffect(() => {
    const root = document.documentElement;

    // Apply custom token overrides
    Object.entries(customTokens).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    // Persist to storage
    localStorage.setItem(CUSTOM_TOKENS_STORAGE_KEY, JSON.stringify(customTokens));

    // Cleanup: remove custom properties when they're removed from state
    return () => {
      Object.keys(customTokens).forEach(key => {
        root.style.removeProperty(key);
      });
    };
  }, [customTokens]);

  const setTheme = useCallback((newTheme: ThemeId) => {
    if (THEMES.includes(newTheme)) {
      setThemeState(newTheme);
    }
  }, []);

  const setCustomTokens = useCallback((tokens: TokenOverrides) => {
    setCustomTokensState(prev => ({ ...prev, ...tokens }));
  }, []);

  const resetCustomTokens = useCallback(() => {
    // Remove all custom properties from root
    const root = document.documentElement;
    Object.keys(customTokens).forEach(key => {
      root.style.removeProperty(key);
    });
    setCustomTokensState({});
    localStorage.removeItem(CUSTOM_TOKENS_STORAGE_KEY);
  }, [customTokens]);

  const isDark = themeDefinitions.find(t => t.id === theme)?.isDark ?? false;

  const value: ThemeContextValue = {
    theme,
    setTheme,
    availableThemes: themeDefinitions,
    isDark,
    customTokens,
    setCustomTokens,
    resetCustomTokens,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook to use theme context
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Utility hook to check if dark mode
export function useIsDark(): boolean {
  const { isDark } = useTheme();
  return isDark;
}
