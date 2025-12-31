/**
 * Color Palettes
 *
 * Comprehensive color system for all zones.
 * Each zone has a full color palette with semantic tokens.
 */

export interface ColorPalette {
  // Base colors
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
    elevated: string;
  };

  // Foreground colors
  foreground: {
    primary: string;
    secondary: string;
    muted: string;
    inverted: string;
  };

  // Accent colors
  accent: {
    primary: string;
    secondary: string;
    hover: string;
    active: string;
  };

  // Semantic colors
  semantic: {
    success: string;
    warning: string;
    error: string;
    info: string;
  };

  // Border colors
  border: {
    default: string;
    subtle: string;
    strong: string;
    focus: string;
  };

  // Special effects
  effects: {
    glow: string;
    shadow: string;
    overlay: string;
    gradient?: string;
  };
}

// ============================================================================
// ZONE PALETTES
// ============================================================================

export const zonePalettes: Record<string, ColorPalette> = {
  'arcade-basement': {
    background: {
      primary: '#050505',
      secondary: '#0a0a0a',
      tertiary: '#0a1a0a',
      elevated: '#101510',
    },
    foreground: {
      primary: '#33ff00',
      secondary: '#22cc00',
      muted: '#1a8800',
      inverted: '#050505',
    },
    accent: {
      primary: '#33ff00',
      secondary: '#00ffff',
      hover: '#44ff22',
      active: '#55ff33',
    },
    semantic: {
      success: '#33ff00',
      warning: '#ffcc00',
      error: '#ff3333',
      info: '#00ffff',
    },
    border: {
      default: 'rgba(51, 255, 0, 0.3)',
      subtle: 'rgba(51, 255, 0, 0.1)',
      strong: 'rgba(51, 255, 0, 0.6)',
      focus: '#33ff00',
    },
    effects: {
      glow: 'rgba(51, 255, 0, 0.5)',
      shadow: 'rgba(0, 0, 0, 0.8)',
      overlay: 'rgba(5, 5, 5, 0.9)',
      gradient: 'linear-gradient(180deg, #050505 0%, #0a1a0a 50%, #050505 100%)',
    },
  },

  'pulp-detective': {
    background: {
      primary: '#f5f1e6',
      secondary: '#e8e0d0',
      tertiary: '#d4c5a9',
      elevated: '#faf8f2',
    },
    foreground: {
      primary: '#2d2416',
      secondary: '#4a3f2c',
      muted: '#8b7355',
      inverted: '#f5f1e6',
    },
    accent: {
      primary: '#8B0000',
      secondary: '#c45c26',
      hover: '#a30000',
      active: '#6b0000',
    },
    semantic: {
      success: '#2d5a27',
      warning: '#c45c26',
      error: '#8B0000',
      info: '#4a6fa5',
    },
    border: {
      default: 'rgba(45, 36, 22, 0.2)',
      subtle: 'rgba(45, 36, 22, 0.1)',
      strong: 'rgba(45, 36, 22, 0.4)',
      focus: '#8B0000',
    },
    effects: {
      glow: 'rgba(139, 0, 0, 0.3)',
      shadow: 'rgba(45, 36, 22, 0.2)',
      overlay: 'rgba(245, 241, 230, 0.95)',
      gradient: 'linear-gradient(180deg, #f5f1e6 0%, #e8e0d0 100%)',
    },
  },

  'hacker-terminal': {
    background: {
      primary: '#0a0a0a',
      secondary: '#0f0f0f',
      tertiary: '#001100',
      elevated: '#141414',
    },
    foreground: {
      primary: '#00ff00',
      secondary: '#00cc00',
      muted: '#008800',
      inverted: '#0a0a0a',
    },
    accent: {
      primary: '#00ff00',
      secondary: '#00ffcc',
      hover: '#22ff22',
      active: '#33ff33',
    },
    semantic: {
      success: '#00ff00',
      warning: '#ffff00',
      error: '#ff0000',
      info: '#00ffff',
    },
    border: {
      default: 'rgba(0, 255, 0, 0.3)',
      subtle: 'rgba(0, 255, 0, 0.1)',
      strong: 'rgba(0, 255, 0, 0.6)',
      focus: '#00ff00',
    },
    effects: {
      glow: 'rgba(0, 255, 0, 0.5)',
      shadow: 'rgba(0, 0, 0, 0.9)',
      overlay: 'rgba(0, 0, 0, 0.95)',
      gradient: 'linear-gradient(180deg, #0a0a0a 0%, #001100 50%, #0a0a0a 100%)',
    },
  },

  'mad-science': {
    background: {
      primary: '#0a0f14',
      secondary: '#0f1a1f',
      tertiary: '#0a0a14',
      elevated: '#121a22',
    },
    foreground: {
      primary: '#00ffff',
      secondary: '#00cccc',
      muted: '#008888',
      inverted: '#0a0f14',
    },
    accent: {
      primary: '#00ffff',
      secondary: '#ff00ff',
      hover: '#22ffff',
      active: '#44ffff',
    },
    semantic: {
      success: '#00ff88',
      warning: '#ffcc00',
      error: '#ff3366',
      info: '#00ccff',
    },
    border: {
      default: 'rgba(0, 255, 255, 0.3)',
      subtle: 'rgba(0, 255, 255, 0.1)',
      strong: 'rgba(0, 255, 255, 0.6)',
      focus: '#00ffff',
    },
    effects: {
      glow: 'rgba(0, 255, 255, 0.5)',
      shadow: 'rgba(0, 0, 0, 0.8)',
      overlay: 'rgba(10, 15, 20, 0.95)',
      gradient: 'linear-gradient(135deg, #0a0f14 0%, #0f1a1f 50%, #0a0a14 100%)',
    },
  },

  'physics-playground': {
    background: {
      primary: '#1a1a2e',
      secondary: '#16213e',
      tertiary: '#0f0f23',
      elevated: '#1e1e3f',
    },
    foreground: {
      primary: '#e0e7ff',
      secondary: '#c7d2fe',
      muted: '#818cf8',
      inverted: '#1a1a2e',
    },
    accent: {
      primary: '#6366f1',
      secondary: '#8b5cf6',
      hover: '#7c7ff2',
      active: '#5558e8',
    },
    semantic: {
      success: '#34d399',
      warning: '#fbbf24',
      error: '#f87171',
      info: '#60a5fa',
    },
    border: {
      default: 'rgba(99, 102, 241, 0.3)',
      subtle: 'rgba(99, 102, 241, 0.1)',
      strong: 'rgba(99, 102, 241, 0.6)',
      focus: '#6366f1',
    },
    effects: {
      glow: 'rgba(99, 102, 241, 0.5)',
      shadow: 'rgba(0, 0, 0, 0.5)',
      overlay: 'rgba(26, 26, 46, 0.95)',
      gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)',
    },
  },

  'organic-garden': {
    background: {
      primary: '#1a1710',
      secondary: '#2d2820',
      tertiary: '#221c12',
      elevated: '#2a2418',
    },
    foreground: {
      primary: '#d4d4aa',
      secondary: '#b8b88a',
      muted: '#8a8a66',
      inverted: '#1a1710',
    },
    accent: {
      primary: '#84cc16',
      secondary: '#65a30d',
      hover: '#9adb2c',
      active: '#6eb010',
    },
    semantic: {
      success: '#84cc16',
      warning: '#eab308',
      error: '#dc2626',
      info: '#06b6d4',
    },
    border: {
      default: 'rgba(132, 204, 22, 0.3)',
      subtle: 'rgba(132, 204, 22, 0.1)',
      strong: 'rgba(132, 204, 22, 0.6)',
      focus: '#84cc16',
    },
    effects: {
      glow: 'rgba(132, 204, 22, 0.4)',
      shadow: 'rgba(0, 0, 0, 0.5)',
      overlay: 'rgba(26, 23, 16, 0.95)',
      gradient: 'linear-gradient(180deg, #1a1710 0%, #2d2820 50%, #1a1710 100%)',
    },
  },

  'cosmic-observatory': {
    background: {
      primary: '#0a0a14',
      secondary: '#0f0f28',
      tertiary: '#050510',
      elevated: '#12122a',
    },
    foreground: {
      primary: '#e0f2fe',
      secondary: '#bae6fd',
      muted: '#7dd3fc',
      inverted: '#0a0a14',
    },
    accent: {
      primary: '#00d2ff',
      secondary: '#a855f7',
      hover: '#22daff',
      active: '#00bfe6',
    },
    semantic: {
      success: '#34d399',
      warning: '#fbbf24',
      error: '#f87171',
      info: '#00d2ff',
    },
    border: {
      default: 'rgba(0, 210, 255, 0.3)',
      subtle: 'rgba(0, 210, 255, 0.1)',
      strong: 'rgba(0, 210, 255, 0.6)',
      focus: '#00d2ff',
    },
    effects: {
      glow: 'rgba(0, 210, 255, 0.5)',
      shadow: 'rgba(0, 0, 0, 0.7)',
      overlay: 'rgba(10, 10, 20, 0.95)',
      gradient: 'radial-gradient(ellipse at 50% 50%, #0f0f28 0%, #0a0a14 50%, #050510 100%)',
    },
  },

  'retro-office': {
    background: {
      primary: '#d4c5a9',
      secondary: '#c4b499',
      tertiary: '#b8a88c',
      elevated: '#e0d4bc',
    },
    foreground: {
      primary: '#3d3425',
      secondary: '#5a4d3a',
      muted: '#8b7355',
      inverted: '#d4c5a9',
    },
    accent: {
      primary: '#8b7355',
      secondary: '#6b5545',
      hover: '#9b8365',
      active: '#7b6345',
    },
    semantic: {
      success: '#4a7c3c',
      warning: '#b88f2f',
      error: '#a54a4a',
      info: '#4a6a8c',
    },
    border: {
      default: 'rgba(61, 52, 37, 0.3)',
      subtle: 'rgba(61, 52, 37, 0.15)',
      strong: 'rgba(61, 52, 37, 0.5)',
      focus: '#8b7355',
    },
    effects: {
      glow: 'rgba(139, 115, 85, 0.3)',
      shadow: 'rgba(61, 52, 37, 0.2)',
      overlay: 'rgba(212, 197, 169, 0.95)',
      gradient: 'linear-gradient(180deg, #d4c5a9 0%, #c4b499 100%)',
    },
  },

  'cinema-stage': {
    background: {
      primary: '#1a0a0a',
      secondary: '#2d0a0a',
      tertiary: '#1a0505',
      elevated: '#3a1010',
    },
    foreground: {
      primary: '#fef3c7',
      secondary: '#fde68a',
      muted: '#d4a574',
      inverted: '#1a0a0a',
    },
    accent: {
      primary: '#fbbf24',
      secondary: '#f59e0b',
      hover: '#fcd34d',
      active: '#d97706',
    },
    semantic: {
      success: '#34d399',
      warning: '#fbbf24',
      error: '#ef4444',
      info: '#60a5fa',
    },
    border: {
      default: 'rgba(251, 191, 36, 0.3)',
      subtle: 'rgba(251, 191, 36, 0.1)',
      strong: 'rgba(251, 191, 36, 0.6)',
      focus: '#fbbf24',
    },
    effects: {
      glow: 'rgba(251, 191, 36, 0.5)',
      shadow: 'rgba(0, 0, 0, 0.7)',
      overlay: 'rgba(26, 10, 10, 0.95)',
      gradient: 'linear-gradient(180deg, #1a0a0a 0%, #2d0a0a 50%, #1a0505 100%)',
    },
  },

  'geometry-lab': {
    background: {
      primary: '#f8f9fa',
      secondary: '#e9ecef',
      tertiary: '#dee2e6',
      elevated: '#ffffff',
    },
    foreground: {
      primary: '#1e3a5f',
      secondary: '#3d5a80',
      muted: '#6c8eb5',
      inverted: '#f8f9fa',
    },
    accent: {
      primary: '#3b82f6',
      secondary: '#6366f1',
      hover: '#60a5fa',
      active: '#2563eb',
    },
    semantic: {
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
    border: {
      default: 'rgba(59, 130, 246, 0.3)',
      subtle: 'rgba(59, 130, 246, 0.1)',
      strong: 'rgba(59, 130, 246, 0.6)',
      focus: '#3b82f6',
    },
    effects: {
      glow: 'rgba(59, 130, 246, 0.3)',
      shadow: 'rgba(30, 58, 95, 0.1)',
      overlay: 'rgba(248, 249, 250, 0.95)',
      gradient: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
    },
  },

  'artist-studio': {
    background: {
      primary: '#faf8f0',
      secondary: '#f5f0e0',
      tertiary: '#ece5d5',
      elevated: '#fffefa',
    },
    foreground: {
      primary: '#374151',
      secondary: '#4b5563',
      muted: '#9ca3af',
      inverted: '#faf8f0',
    },
    accent: {
      primary: '#ec4899',
      secondary: '#8b5cf6',
      hover: '#f472b6',
      active: '#db2777',
    },
    semantic: {
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
    border: {
      default: 'rgba(55, 65, 81, 0.2)',
      subtle: 'rgba(55, 65, 81, 0.1)',
      strong: 'rgba(55, 65, 81, 0.4)',
      focus: '#ec4899',
    },
    effects: {
      glow: 'rgba(236, 72, 153, 0.3)',
      shadow: 'rgba(55, 65, 81, 0.1)',
      overlay: 'rgba(250, 248, 240, 0.95)',
      gradient: 'linear-gradient(180deg, #faf8f0 0%, #f5f0e0 100%)',
    },
  },

  // ============ NEW ZONES ============

  'underwater-depths': {
    background: {
      primary: '#021a2d',
      secondary: '#033d5e',
      tertiary: '#011627',
      elevated: '#054a73',
    },
    foreground: {
      primary: '#b3e5fc',
      secondary: '#81d4fa',
      muted: '#4fc3f7',
      inverted: '#021a2d',
    },
    accent: {
      primary: '#00e5ff',
      secondary: '#00b8d4',
      hover: '#18ffff',
      active: '#00acc1',
    },
    semantic: {
      success: '#00e676',
      warning: '#ffca28',
      error: '#ff5252',
      info: '#00e5ff',
    },
    border: {
      default: 'rgba(0, 229, 255, 0.3)',
      subtle: 'rgba(0, 229, 255, 0.1)',
      strong: 'rgba(0, 229, 255, 0.6)',
      focus: '#00e5ff',
    },
    effects: {
      glow: 'rgba(0, 229, 255, 0.5)',
      shadow: 'rgba(0, 0, 0, 0.7)',
      overlay: 'rgba(2, 26, 45, 0.95)',
      gradient: 'linear-gradient(180deg, #021a2d 0%, #033d5e 50%, #011627 100%)',
    },
  },

  'steampunk-workshop': {
    background: {
      primary: '#1a1208',
      secondary: '#2d1f0d',
      tertiary: '#0f0a04',
      elevated: '#3d2a12',
    },
    foreground: {
      primary: '#daa520',
      secondary: '#cd7f32',
      muted: '#b8860b',
      inverted: '#1a1208',
    },
    accent: {
      primary: '#cd7f32',
      secondary: '#b87333',
      hover: '#d4a35a',
      active: '#a0522d',
    },
    semantic: {
      success: '#8fbc8f',
      warning: '#daa520',
      error: '#cd5c5c',
      info: '#cd7f32',
    },
    border: {
      default: 'rgba(205, 127, 50, 0.3)',
      subtle: 'rgba(205, 127, 50, 0.1)',
      strong: 'rgba(205, 127, 50, 0.6)',
      focus: '#cd7f32',
    },
    effects: {
      glow: 'rgba(205, 127, 50, 0.5)',
      shadow: 'rgba(0, 0, 0, 0.8)',
      overlay: 'rgba(26, 18, 8, 0.95)',
      gradient: 'linear-gradient(135deg, #1a1208 0%, #2d1f0d 50%, #0f0a04 100%)',
    },
  },

  'cyberpunk-district': {
    background: {
      primary: '#0d0d1a',
      secondary: '#1a0a2e',
      tertiary: '#0a0a14',
      elevated: '#2d1f4a',
    },
    foreground: {
      primary: '#e0b0ff',
      secondary: '#da70d6',
      muted: '#ba55d3',
      inverted: '#0d0d1a',
    },
    accent: {
      primary: '#ff00ff',
      secondary: '#00ffff',
      hover: '#ff66ff',
      active: '#cc00cc',
    },
    semantic: {
      success: '#00ff88',
      warning: '#ffff00',
      error: '#ff0044',
      info: '#00ffff',
    },
    border: {
      default: 'rgba(255, 0, 255, 0.3)',
      subtle: 'rgba(255, 0, 255, 0.1)',
      strong: 'rgba(255, 0, 255, 0.6)',
      focus: '#ff00ff',
    },
    effects: {
      glow: 'rgba(255, 0, 255, 0.5)',
      shadow: 'rgba(0, 0, 0, 0.9)',
      overlay: 'rgba(13, 13, 26, 0.95)',
      gradient: 'linear-gradient(180deg, #0d0d1a 0%, #1a0a2e 50%, #0a0a14 100%)',
    },
  },

  'medieval-scriptorium': {
    background: {
      primary: '#2d2418',
      secondary: '#3d3020',
      tertiary: '#1a1408',
      elevated: '#4d4028',
    },
    foreground: {
      primary: '#f4e4bc',
      secondary: '#e6d4a8',
      muted: '#c9a227',
      inverted: '#2d2418',
    },
    accent: {
      primary: '#c9a227',
      secondary: '#8b4513',
      hover: '#d4b32c',
      active: '#a08020',
    },
    semantic: {
      success: '#6b8e23',
      warning: '#c9a227',
      error: '#8b0000',
      info: '#4682b4',
    },
    border: {
      default: 'rgba(201, 162, 39, 0.3)',
      subtle: 'rgba(201, 162, 39, 0.1)',
      strong: 'rgba(201, 162, 39, 0.6)',
      focus: '#c9a227',
    },
    effects: {
      glow: 'rgba(201, 162, 39, 0.5)',
      shadow: 'rgba(0, 0, 0, 0.7)',
      overlay: 'rgba(45, 36, 24, 0.95)',
      gradient: 'linear-gradient(180deg, #2d2418 0%, #3d3020 50%, #1a1408 100%)',
    },
  },

  'space-station': {
    background: {
      primary: '#0a0a14',
      secondary: '#1a1a3e',
      tertiary: '#050510',
      elevated: '#1e1e48',
    },
    foreground: {
      primary: '#d1fae5',
      secondary: '#a7f3d0',
      muted: '#6ee7b7',
      inverted: '#0a0a14',
    },
    accent: {
      primary: '#4ade80',
      secondary: '#22d3ee',
      hover: '#86efac',
      active: '#22c55e',
    },
    semantic: {
      success: '#4ade80',
      warning: '#fbbf24',
      error: '#f87171',
      info: '#22d3ee',
    },
    border: {
      default: 'rgba(74, 222, 128, 0.3)',
      subtle: 'rgba(74, 222, 128, 0.1)',
      strong: 'rgba(74, 222, 128, 0.6)',
      focus: '#4ade80',
    },
    effects: {
      glow: 'rgba(74, 222, 128, 0.5)',
      shadow: 'rgba(0, 0, 0, 0.8)',
      overlay: 'rgba(10, 10, 20, 0.95)',
      gradient: 'radial-gradient(ellipse at 50% 100%, #1a1a3e 0%, #0a0a14 50%, #050510 100%)',
    },
  },
};

// ============================================================================
// UTILITIES
// ============================================================================

/**
 * Get CSS custom properties for a zone's palette
 */
export function getPaletteCSSVars(zoneId: string): Record<string, string> {
  const palette = zonePalettes[zoneId];
  if (!palette) return {};

  return {
    '--bg-primary': palette.background.primary,
    '--bg-secondary': palette.background.secondary,
    '--bg-tertiary': palette.background.tertiary,
    '--bg-elevated': palette.background.elevated,
    '--fg-primary': palette.foreground.primary,
    '--fg-secondary': palette.foreground.secondary,
    '--fg-muted': palette.foreground.muted,
    '--accent-primary': palette.accent.primary,
    '--accent-secondary': palette.accent.secondary,
    '--accent-hover': palette.accent.hover,
    '--accent-active': palette.accent.active,
    '--border-default': palette.border.default,
    '--border-subtle': palette.border.subtle,
    '--border-strong': palette.border.strong,
    '--border-focus': palette.border.focus,
    '--effect-glow': palette.effects.glow,
    '--effect-shadow': palette.effects.shadow,
    '--effect-overlay': palette.effects.overlay,
  };
}

/**
 * Get palette for a zone, with fallback
 */
export function getZonePalette(zoneId: string): ColorPalette {
  return zonePalettes[zoneId] || zonePalettes['physics-playground'];
}

export default zonePalettes;
