// Atom: Colors
// Color tokens, palettes, and theme variables
// Zone-specific and semantic color definitions

import { ElementEntry } from '../../registry';

// ============================================
// ZONE COLOR PALETTES
// ============================================

export const zonePalettes = {
  cosmic: {
    primary: '#a855f7',      // purple-500
    secondary: '#6366f1',    // indigo-500
    accent: '#fbbf24',       // amber-400 (stars/sun)
    background: '#000000',
    text: '#ffffff',
  },
  hacker: {
    primary: '#33ff00',      // neon green
    secondary: '#00ff66',
    accent: '#00ffff',       // cyan
    background: '#000000',
    text: '#33ff00',
  },
  organic: {
    primary: '#22c55e',      // green-500
    secondary: '#a3e635',    // lime-400
    accent: '#8B4513',       // leather brown
    background: '#1c1917',   // stone-900
    text: '#fafaf9',
  },
  pulp: {
    primary: '#f97316',      // orange-500
    secondary: '#eab308',    // yellow-500
    accent: '#06b6d4',       // cyan-500
    background: '#18181b',   // zinc-900
    text: '#fafafa',
  },
  arcade: {
    primary: '#ec4899',      // pink-500
    secondary: '#8b5cf6',    // violet-500
    accent: '#14b8a6',       // teal-500
    background: '#0f172a',   // slate-900
    text: '#f8fafc',
  },
  retroOffice: {
    primary: '#d97706',      // amber-600
    secondary: '#78716c',    // stone-500
    accent: '#0284c7',       // sky-600
    background: '#292524',   // stone-800
    text: '#fafaf9',
  },
  cinema: {
    primary: '#dc2626',      // red-600 (curtain)
    secondary: '#fbbf24',    // amber-400
    accent: '#ffffff',
    background: '#000000',
    text: '#ffffff',
  },
  madScience: {
    primary: '#a3e635',      // lime-400
    secondary: '#c084fc',    // purple-400
    accent: '#22d3ee',       // cyan-400
    background: '#0c0a09',   // stone-950
    text: '#fafaf9',
  },
  geometry: {
    primary: '#3b82f6',      // blue-500
    secondary: '#6366f1',    // indigo-500
    accent: '#f59e0b',       // amber-500
    background: '#1e3a5f',   // blueprint blue
    text: '#ffffff',
  },
  physics: {
    primary: '#06b6d4',      // cyan-500
    secondary: '#14b8a6',    // teal-500
    accent: '#fbbf24',       // amber-400
    background: '#18181b',
    text: '#fafafa',
  },
  artistStudio: {
    primary: '#f472b6',      // pink-400
    secondary: '#a78bfa',    // violet-400
    accent: '#fbbf24',       // amber-400
    background: '#fafafa',
    text: '#18181b',
  },
};

// ============================================
// SEMANTIC COLORS
// ============================================

export const semanticColors = {
  success: '#22c55e',        // green-500
  successLight: '#86efac',   // green-300
  successDark: '#166534',    // green-800

  warning: '#f59e0b',        // amber-500
  warningLight: '#fcd34d',   // amber-300
  warningDark: '#92400e',    // amber-800

  error: '#ef4444',          // red-500
  errorLight: '#fca5a5',     // red-300
  errorDark: '#991b1b',      // red-800

  info: '#3b82f6',           // blue-500
  infoLight: '#93c5fd',      // blue-300
  infoDark: '#1e40af',       // blue-800
};

// ============================================
// GRADIENT PRESETS
// ============================================

export const gradients = {
  // Cosmic gradients
  nebula: 'bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400',
  sunset: 'bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600',
  aurora: 'bg-gradient-to-r from-green-400 via-cyan-500 to-blue-500',

  // Dark gradients
  midnight: 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900',
  deepSpace: 'bg-gradient-to-b from-black via-indigo-950 to-black',

  // Metallic gradients
  gold: 'bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500',
  silver: 'bg-gradient-to-r from-gray-300 via-white to-gray-400',
  bronze: 'bg-gradient-to-r from-amber-600 via-orange-400 to-amber-700',

  // Neon gradients
  neonGreen: 'bg-gradient-to-r from-green-400 to-cyan-400',
  neonPink: 'bg-gradient-to-r from-pink-500 to-purple-500',
  neonBlue: 'bg-gradient-to-r from-blue-400 to-indigo-500',
};

// ============================================
// REGISTRY ENTRIES
// ============================================

const createColorEntry = (
  id: string,
  name: string,
  description: string,
  tags: string[],
  cssClass: string,
  themeAgnostic: boolean = true
): ElementEntry => ({
  id: `color-${id}`,
  name,
  layer: 'atom',
  category: 'colors',
  description,
  themeAgnostic,
  sourceComponents: ['multiple-zones'],
  extractedFrom: 'src/elements/atoms/colors/index.ts',
  previewType: 'inline',
  hasInteraction: false,
  implementation: 'css-class',
  cssClass,
  codeSnippet: `<div className="${cssClass}">...</div>`,
  tags: ['color', ...tags],
});

export const colorRegistry: ElementEntry[] = [
  // Semantic colors
  createColorEntry('success', 'Success Green', 'Green color for success states', ['semantic', 'success', 'green'], 'text-green-500'),
  createColorEntry('warning', 'Warning Amber', 'Amber color for warning states', ['semantic', 'warning', 'amber'], 'text-amber-500'),
  createColorEntry('error', 'Error Red', 'Red color for error states', ['semantic', 'error', 'red'], 'text-red-500'),
  createColorEntry('info', 'Info Blue', 'Blue color for info states', ['semantic', 'info', 'blue'], 'text-blue-500'),

  // Background semantic
  createColorEntry('bg-success', 'Success Background', 'Green background for success', ['semantic', 'background', 'success'], 'bg-green-500'),
  createColorEntry('bg-warning', 'Warning Background', 'Amber background for warning', ['semantic', 'background', 'warning'], 'bg-amber-500'),
  createColorEntry('bg-error', 'Error Background', 'Red background for error', ['semantic', 'background', 'error'], 'bg-red-500'),
  createColorEntry('bg-info', 'Info Background', 'Blue background for info', ['semantic', 'background', 'info'], 'bg-blue-500'),

  // Gradients
  createColorEntry('gradient-nebula', 'Nebula Gradient', 'Purple to orange cosmic gradient', ['gradient', 'cosmic', 'colorful'], 'bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400'),
  createColorEntry('gradient-sunset', 'Sunset Gradient', 'Orange to purple sunset gradient', ['gradient', 'warm', 'sunset'], 'bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600'),
  createColorEntry('gradient-aurora', 'Aurora Gradient', 'Green to blue northern lights', ['gradient', 'cool', 'aurora'], 'bg-gradient-to-r from-green-400 via-cyan-500 to-blue-500'),
  createColorEntry('gradient-midnight', 'Midnight Gradient', 'Dark purple gradient', ['gradient', 'dark', 'night'], 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900'),
  createColorEntry('gradient-gold', 'Gold Gradient', 'Metallic gold gradient', ['gradient', 'metallic', 'gold'], 'bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500'),
  createColorEntry('gradient-neon-green', 'Neon Green Gradient', 'Bright neon green gradient', ['gradient', 'neon', 'hacker'], 'bg-gradient-to-r from-green-400 to-cyan-400'),
  createColorEntry('gradient-neon-pink', 'Neon Pink Gradient', 'Vibrant pink to purple', ['gradient', 'neon', 'arcade'], 'bg-gradient-to-r from-pink-500 to-purple-500'),

  // Zone-specific primary colors
  createColorEntry('cosmic-primary', 'Cosmic Purple', 'Primary purple for cosmic zone', ['zone', 'cosmic', 'purple'], 'text-purple-500', false),
  createColorEntry('hacker-primary', 'Hacker Green', 'Neon green for hacker zone', ['zone', 'hacker', 'green', 'neon'], 'text-[#33ff00]', false),
  createColorEntry('organic-primary', 'Organic Green', 'Natural green for organic zone', ['zone', 'organic', 'green', 'natural'], 'text-green-500', false),
  createColorEntry('pulp-primary', 'Pulp Orange', 'Bold orange for pulp zone', ['zone', 'pulp', 'orange', 'bold'], 'text-orange-500', false),
  createColorEntry('arcade-primary', 'Arcade Pink', 'Vibrant pink for arcade zone', ['zone', 'arcade', 'pink', 'retro'], 'text-pink-500', false),
  createColorEntry('cinema-primary', 'Cinema Red', 'Curtain red for cinema zone', ['zone', 'cinema', 'red', 'theater'], 'text-red-600', false),
  createColorEntry('geometry-primary', 'Geometry Blue', 'Blueprint blue for geometry zone', ['zone', 'geometry', 'blue', 'blueprint'], 'text-blue-500', false),
  createColorEntry('retro-primary', 'Retro Amber', 'Warm amber for retro-office zone', ['zone', 'retro', 'amber', 'vintage'], 'text-amber-600', false),
];
