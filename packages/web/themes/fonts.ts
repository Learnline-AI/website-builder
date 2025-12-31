/**
 * Font Configuration
 *
 * Centralized font family definitions for all zones.
 * Each zone uses specific fonts to reinforce its aesthetic.
 */

export interface FontConfig {
  family: string;
  fallback: string[];
  googleFont?: string;
  customFontUrl?: string;
  weights: number[];
  style?: 'normal' | 'italic';
}

export interface ZoneFonts {
  primary: FontConfig;
  secondary?: FontConfig;
  mono?: FontConfig;
}

// ============================================================================
// FONT STACKS
// ============================================================================

export const fontStacks = {
  // System fonts
  system: [
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Oxygen',
    'Ubuntu',
    'Cantarell',
    'sans-serif',
  ],
  systemMono: [
    'ui-monospace',
    'SFMono-Regular',
    'SF Mono',
    'Menlo',
    'Consolas',
    'Liberation Mono',
    'monospace',
  ],

  // Display fonts
  arcade: ['Press Start 2P', 'VT323', 'monospace'],
  pulp: ['Playfair Display', 'Special Elite', 'Courier New', 'serif'],
  hacker: ['Fira Code', 'JetBrains Mono', 'Source Code Pro', 'monospace'],
  science: ['Orbitron', 'Rajdhani', 'sans-serif'],
  cosmic: ['Exo 2', 'Audiowide', 'sans-serif'],
  retro: ['IBM Plex Mono', 'Courier New', 'monospace'],
  cinema: ['Cinzel', 'Playfair Display', 'serif'],
  geometry: ['Space Grotesk', 'DM Sans', 'sans-serif'],
  artist: ['Caveat', 'Patrick Hand', 'cursive'],
  organic: ['Lora', 'Merriweather', 'serif'],
  physics: ['Inter', 'Space Grotesk', 'sans-serif'],
};

// ============================================================================
// ZONE FONT CONFIGURATIONS
// ============================================================================

export const zoneFonts: Record<string, ZoneFonts> = {
  'arcade-basement': {
    primary: {
      family: 'Press Start 2P',
      fallback: ['VT323', 'monospace'],
      googleFont: 'Press+Start+2P',
      weights: [400],
    },
    mono: {
      family: 'VT323',
      fallback: ['monospace'],
      googleFont: 'VT323',
      weights: [400],
    },
  },

  'pulp-detective': {
    primary: {
      family: 'Special Elite',
      fallback: ['Courier New', 'monospace'],
      googleFont: 'Special+Elite',
      weights: [400],
    },
    secondary: {
      family: 'Playfair Display',
      fallback: ['Georgia', 'serif'],
      googleFont: 'Playfair+Display:wght@400;600;700',
      weights: [400, 600, 700],
    },
  },

  'hacker-terminal': {
    primary: {
      family: 'Fira Code',
      fallback: ['JetBrains Mono', 'monospace'],
      googleFont: 'Fira+Code:wght@400;500',
      weights: [400, 500],
    },
    mono: {
      family: 'JetBrains Mono',
      fallback: ['monospace'],
      googleFont: 'JetBrains+Mono:wght@400;500',
      weights: [400, 500],
    },
  },

  'mad-science': {
    primary: {
      family: 'Orbitron',
      fallback: ['sans-serif'],
      googleFont: 'Orbitron:wght@400;500;700',
      weights: [400, 500, 700],
    },
    secondary: {
      family: 'Rajdhani',
      fallback: ['sans-serif'],
      googleFont: 'Rajdhani:wght@400;500;600',
      weights: [400, 500, 600],
    },
  },

  'physics-playground': {
    primary: {
      family: 'Inter',
      fallback: ['system-ui', 'sans-serif'],
      googleFont: 'Inter:wght@400;500;600;700',
      weights: [400, 500, 600, 700],
    },
    secondary: {
      family: 'Space Grotesk',
      fallback: ['sans-serif'],
      googleFont: 'Space+Grotesk:wght@400;500;600',
      weights: [400, 500, 600],
    },
  },

  'organic-garden': {
    primary: {
      family: 'Lora',
      fallback: ['Georgia', 'serif'],
      googleFont: 'Lora:wght@400;500;600',
      weights: [400, 500, 600],
    },
    secondary: {
      family: 'Merriweather',
      fallback: ['serif'],
      googleFont: 'Merriweather:wght@400;700',
      weights: [400, 700],
    },
  },

  'cosmic-observatory': {
    primary: {
      family: 'Exo 2',
      fallback: ['sans-serif'],
      googleFont: 'Exo+2:wght@400;500;600;700',
      weights: [400, 500, 600, 700],
    },
    secondary: {
      family: 'Audiowide',
      fallback: ['sans-serif'],
      googleFont: 'Audiowide',
      weights: [400],
    },
  },

  'retro-office': {
    primary: {
      family: 'IBM Plex Mono',
      fallback: ['Courier New', 'monospace'],
      googleFont: 'IBM+Plex+Mono:wght@400;500',
      weights: [400, 500],
    },
    secondary: {
      family: 'IBM Plex Sans',
      fallback: ['sans-serif'],
      googleFont: 'IBM+Plex+Sans:wght@400;500;600',
      weights: [400, 500, 600],
    },
  },

  'cinema-stage': {
    primary: {
      family: 'Cinzel',
      fallback: ['Georgia', 'serif'],
      googleFont: 'Cinzel:wght@400;600;700',
      weights: [400, 600, 700],
    },
    secondary: {
      family: 'Playfair Display',
      fallback: ['serif'],
      googleFont: 'Playfair+Display:wght@400;600',
      weights: [400, 600],
    },
  },

  'geometry-lab': {
    primary: {
      family: 'Space Grotesk',
      fallback: ['sans-serif'],
      googleFont: 'Space+Grotesk:wght@400;500;600;700',
      weights: [400, 500, 600, 700],
    },
    mono: {
      family: 'Space Mono',
      fallback: ['monospace'],
      googleFont: 'Space+Mono:wght@400;700',
      weights: [400, 700],
    },
  },

  'artist-studio': {
    primary: {
      family: 'Caveat',
      fallback: ['cursive'],
      googleFont: 'Caveat:wght@400;500;600;700',
      weights: [400, 500, 600, 700],
    },
    secondary: {
      family: 'Patrick Hand',
      fallback: ['cursive'],
      googleFont: 'Patrick+Hand',
      weights: [400],
    },
  },
};

// ============================================================================
// UTILITIES
// ============================================================================

/**
 * Generate Google Fonts URL for a zone
 */
export function getGoogleFontsUrl(zoneId: string): string {
  const fonts = zoneFonts[zoneId];
  if (!fonts) return '';

  const fontParams: string[] = [];

  if (fonts.primary.googleFont) {
    fontParams.push(fonts.primary.googleFont);
  }
  if (fonts.secondary?.googleFont) {
    fontParams.push(fonts.secondary.googleFont);
  }
  if (fonts.mono?.googleFont) {
    fontParams.push(fonts.mono.googleFont);
  }

  if (fontParams.length === 0) return '';

  return `https://fonts.googleapis.com/css2?${fontParams.map(f => `family=${f}`).join('&')}&display=swap`;
}

/**
 * Generate CSS font-family string
 */
export function getFontFamily(config: FontConfig): string {
  const fonts = [config.family, ...config.fallback];
  return fonts.map(f => (f.includes(' ') ? `"${f}"` : f)).join(', ');
}

/**
 * Get all Google Fonts URLs for preloading
 */
export function getAllGoogleFontsUrls(): string[] {
  return Object.keys(zoneFonts)
    .map(getGoogleFontsUrl)
    .filter(url => url !== '');
}

export default zoneFonts;
