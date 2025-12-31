// Atom: Backgrounds
// Pure background patterns, gradients, and textures
// Background system for the design system

import { ElementEntry } from '../../registry';

// ============================================
// SOLID BACKGROUNDS
// ============================================

export const solidBackgrounds = {
  black: 'bg-black',
  white: 'bg-white',
  slate900: 'bg-slate-900',
  slate800: 'bg-slate-800',
  zinc900: 'bg-zinc-900',
  stone900: 'bg-stone-900',
  neutral900: 'bg-neutral-900',
  transparent: 'bg-transparent',
};

// ============================================
// GRADIENT BACKGROUNDS
// ============================================

export const gradientBackgrounds = {
  // Direction gradients
  toRight: 'bg-gradient-to-r',
  toLeft: 'bg-gradient-to-l',
  toBottom: 'bg-gradient-to-b',
  toTop: 'bg-gradient-to-t',
  toBr: 'bg-gradient-to-br',
  toTl: 'bg-gradient-to-tl',

  // Preset gradients
  nebula: 'bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400',
  sunset: 'bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600',
  aurora: 'bg-gradient-to-r from-green-400 via-cyan-500 to-blue-500',
  midnight: 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900',
  deepSpace: 'bg-gradient-to-b from-black via-indigo-950 to-black',
  neonGreen: 'bg-gradient-to-r from-green-400 to-cyan-400',
  neonPink: 'bg-gradient-to-r from-pink-500 to-purple-500',
  gold: 'bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500',
  silver: 'bg-gradient-to-r from-gray-300 via-white to-gray-400',
  blueprint: 'bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900',
};

// ============================================
// GRID PATTERNS (CSS Background)
// ============================================

export const gridPatterns = {
  grid10: `bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:10px_10px]`,
  grid20: `bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]`,
  grid50: `bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]`,
  grid100: `bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px]`,

  // Neon grid (hacker/terminal style)
  gridNeon: `bg-[linear-gradient(rgba(51,255,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(51,255,0,0.1)_1px,transparent_1px)] bg-[size:20px_20px]`,

  // Blueprint grid
  gridBlueprint: `bg-[linear-gradient(rgba(59,130,246,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.2)_1px,transparent_1px)] bg-[size:20px_20px]`,
};

// ============================================
// DOT PATTERNS
// ============================================

export const dotPatterns = {
  dotsSm: `bg-[radial-gradient(circle,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:10px_10px]`,
  dotsMd: `bg-[radial-gradient(circle,rgba(255,255,255,0.1)_2px,transparent_2px)] bg-[size:20px_20px]`,
  dotsLg: `bg-[radial-gradient(circle,rgba(255,255,255,0.1)_3px,transparent_3px)] bg-[size:30px_30px]`,

  // PCB circuit dots
  dotsPcb: `bg-[radial-gradient(circle,rgba(51,255,0,0.3)_2px,transparent_2px)] bg-[size:15px_15px]`,

  // Stars pattern
  dotsStars: `bg-[radial-gradient(circle,rgba(255,255,255,0.8)_1px,transparent_1px)] bg-[size:50px_50px]`,
};

// ============================================
// STRIPE PATTERNS
// ============================================

export const stripePatterns = {
  stripesHorizontal: `bg-[repeating-linear-gradient(0deg,transparent,transparent_10px,rgba(255,255,255,0.05)_10px,rgba(255,255,255,0.05)_20px)]`,
  stripesVertical: `bg-[repeating-linear-gradient(90deg,transparent,transparent_10px,rgba(255,255,255,0.05)_10px,rgba(255,255,255,0.05)_20px)]`,
  stripesDiagonal: `bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.05)_10px,rgba(255,255,255,0.05)_20px)]`,
  stripesDiagonalReverse: `bg-[repeating-linear-gradient(-45deg,transparent,transparent_10px,rgba(255,255,255,0.05)_10px,rgba(255,255,255,0.05)_20px)]`,

  // Scanlines (retro CRT effect)
  scanlines: `bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.3)_2px,rgba(0,0,0,0.3)_4px)]`,
};

// ============================================
// SPECIAL BACKGROUNDS
// ============================================

export const specialBackgrounds = {
  // Noise texture overlay (requires SVG filter)
  noise: 'bg-[url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")]',

  // Radial spotlight
  spotlight: 'bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_50%)]',
  spotlightTop: 'bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.1)_0%,transparent_50%)]',

  // Vignette
  vignette: 'bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]',
};

// ============================================
// REGISTRY ENTRIES
// ============================================

const createBackgroundEntry = (
  id: string,
  name: string,
  description: string,
  tags: string[],
  cssClass: string
): ElementEntry => ({
  id: `bg-${id}`,
  name,
  layer: 'atom',
  category: 'backgrounds',
  description,
  themeAgnostic: true,
  sourceComponents: ['multiple-zones'],
  extractedFrom: 'src/elements/atoms/backgrounds/index.ts',
  previewType: 'card',
  hasInteraction: false,
  previewBg: '#1a1a1a',
  implementation: 'css-class',
  cssClass,
  codeSnippet: `<div className="${cssClass}">...</div>`,
  tags: ['background', ...tags],
});

export const backgroundRegistry: ElementEntry[] = [
  // Solid backgrounds
  createBackgroundEntry('black', 'Black Background', 'Pure black background', ['solid', 'dark', 'black'], 'bg-black'),
  createBackgroundEntry('white', 'White Background', 'Pure white background', ['solid', 'light', 'white'], 'bg-white'),
  createBackgroundEntry('slate-900', 'Slate 900', 'Dark slate background', ['solid', 'dark', 'slate'], 'bg-slate-900'),
  createBackgroundEntry('zinc-900', 'Zinc 900', 'Dark zinc background', ['solid', 'dark', 'zinc'], 'bg-zinc-900'),
  createBackgroundEntry('transparent', 'Transparent', 'Transparent background', ['solid', 'transparent', 'none'], 'bg-transparent'),

  // Gradient backgrounds
  createBackgroundEntry('gradient-nebula', 'Nebula Gradient', 'Purple to orange cosmic gradient', ['gradient', 'cosmic', 'colorful'], 'bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400'),
  createBackgroundEntry('gradient-sunset', 'Sunset Gradient', 'Orange to purple sunset', ['gradient', 'warm', 'sunset'], 'bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600'),
  createBackgroundEntry('gradient-aurora', 'Aurora Gradient', 'Green to blue northern lights', ['gradient', 'cool', 'aurora'], 'bg-gradient-to-r from-green-400 via-cyan-500 to-blue-500'),
  createBackgroundEntry('gradient-midnight', 'Midnight Gradient', 'Dark purple gradient', ['gradient', 'dark', 'night'], 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900'),
  createBackgroundEntry('gradient-deep-space', 'Deep Space', 'Black to indigo space gradient', ['gradient', 'cosmic', 'dark'], 'bg-gradient-to-b from-black via-indigo-950 to-black'),
  createBackgroundEntry('gradient-neon-green', 'Neon Green Gradient', 'Bright neon green gradient', ['gradient', 'neon', 'hacker'], 'bg-gradient-to-r from-green-400 to-cyan-400'),
  createBackgroundEntry('gradient-neon-pink', 'Neon Pink Gradient', 'Vibrant pink to purple', ['gradient', 'neon', 'arcade'], 'bg-gradient-to-r from-pink-500 to-purple-500'),
  createBackgroundEntry('gradient-gold', 'Gold Gradient', 'Metallic gold gradient', ['gradient', 'metallic', 'gold'], 'bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500'),
  createBackgroundEntry('gradient-blueprint', 'Blueprint Gradient', 'Dark blue blueprint background', ['gradient', 'geometry', 'blueprint'], 'bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900'),

  // Grid patterns
  createBackgroundEntry('grid-10', 'Grid 10px', 'Subtle 10px grid pattern', ['pattern', 'grid', 'subtle'], gridPatterns.grid10),
  createBackgroundEntry('grid-20', 'Grid 20px', 'Standard 20px grid pattern', ['pattern', 'grid', 'standard'], gridPatterns.grid20),
  createBackgroundEntry('grid-50', 'Grid 50px', 'Large 50px grid pattern', ['pattern', 'grid', 'large'], gridPatterns.grid50),
  createBackgroundEntry('grid-neon', 'Neon Grid', 'Green neon grid (hacker style)', ['pattern', 'grid', 'neon', 'hacker'], gridPatterns.gridNeon),
  createBackgroundEntry('grid-blueprint', 'Blueprint Grid', 'Blue grid on dark background', ['pattern', 'grid', 'blueprint', 'geometry'], gridPatterns.gridBlueprint),

  // Dot patterns
  createBackgroundEntry('dots-sm', 'Dots Small', 'Small dot pattern', ['pattern', 'dots', 'small'], dotPatterns.dotsSm),
  createBackgroundEntry('dots-md', 'Dots Medium', 'Medium dot pattern', ['pattern', 'dots', 'medium'], dotPatterns.dotsMd),
  createBackgroundEntry('dots-pcb', 'PCB Dots', 'Circuit board style dots', ['pattern', 'dots', 'pcb', 'hacker'], dotPatterns.dotsPcb),
  createBackgroundEntry('dots-stars', 'Star Field', 'Starry night dot pattern', ['pattern', 'dots', 'stars', 'cosmic'], dotPatterns.dotsStars),

  // Stripe patterns
  createBackgroundEntry('stripes-horizontal', 'Horizontal Stripes', 'Horizontal stripe pattern', ['pattern', 'stripes', 'horizontal'], stripePatterns.stripesHorizontal),
  createBackgroundEntry('stripes-diagonal', 'Diagonal Stripes', 'Diagonal stripe pattern', ['pattern', 'stripes', 'diagonal'], stripePatterns.stripesDiagonal),
  createBackgroundEntry('scanlines', 'Scanlines', 'CRT scanline effect', ['pattern', 'retro', 'crt', 'scanlines'], stripePatterns.scanlines),

  // Special backgrounds
  createBackgroundEntry('spotlight', 'Spotlight', 'Radial spotlight effect', ['effect', 'spotlight', 'radial'], specialBackgrounds.spotlight),
  createBackgroundEntry('spotlight-top', 'Spotlight Top', 'Top-down spotlight effect', ['effect', 'spotlight', 'top'], specialBackgrounds.spotlightTop),
  createBackgroundEntry('vignette', 'Vignette', 'Dark vignette overlay', ['effect', 'vignette', 'cinematic'], specialBackgrounds.vignette),
];
