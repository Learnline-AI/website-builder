// Atom: Surfaces
// Material textures, glass effects, metallic finishes
// Surface system for the design system

import { ElementEntry } from '../../registry';

// ============================================
// GLASS / FROSTED EFFECTS
// ============================================

export const glassSurfaces = {
  // Basic glass
  glass: 'bg-white/10 backdrop-blur-md',
  glassDark: 'bg-black/20 backdrop-blur-md',
  glassLight: 'bg-white/20 backdrop-blur-md',

  // Frosted glass with border
  frosted: 'bg-white/10 backdrop-blur-lg border border-white/20',
  frostedDark: 'bg-black/30 backdrop-blur-lg border border-white/10',

  // Colored glass
  glassBlue: 'bg-blue-500/10 backdrop-blur-md',
  glassPurple: 'bg-purple-500/10 backdrop-blur-md',
  glassGreen: 'bg-green-500/10 backdrop-blur-md',
  glassPink: 'bg-pink-500/10 backdrop-blur-md',

  // Heavy blur (mica effect)
  mica: 'bg-black/50 backdrop-blur-xl backdrop-saturate-150',
};

// ============================================
// PAPER / MATTE SURFACES
// ============================================

export const paperSurfaces = {
  // Basic paper
  paper: 'bg-white shadow-sm',
  paperDark: 'bg-zinc-900 shadow-sm',

  // Elevated paper
  paperElevated: 'bg-white shadow-md',
  paperElevatedDark: 'bg-zinc-800 shadow-md',

  // Card surface
  card: 'bg-white rounded-lg shadow-md',
  cardDark: 'bg-zinc-900 rounded-lg shadow-md border border-zinc-800',

  // Inset/pressed
  inset: 'bg-gray-100 shadow-inner',
  insetDark: 'bg-zinc-950 shadow-inner',
};

// ============================================
// METALLIC SURFACES
// ============================================

export const metallicSurfaces = {
  // Chrome/silver
  chrome: 'bg-gradient-to-b from-gray-200 via-gray-100 to-gray-300',
  silver: 'bg-gradient-to-br from-gray-300 via-white to-gray-400',

  // Gold
  gold: 'bg-gradient-to-br from-yellow-400 via-amber-300 to-yellow-500',
  goldDark: 'bg-gradient-to-br from-amber-600 via-yellow-500 to-amber-700',

  // Bronze/copper
  bronze: 'bg-gradient-to-br from-amber-600 via-orange-400 to-amber-700',
  copper: 'bg-gradient-to-br from-orange-500 via-amber-400 to-orange-600',

  // Steel
  steel: 'bg-gradient-to-b from-slate-400 via-slate-300 to-slate-500',
  brushedSteel: 'bg-gradient-to-r from-slate-400 via-slate-300 to-slate-400',
};

// ============================================
// SCREEN / DISPLAY SURFACES
// ============================================

export const screenSurfaces = {
  // CRT/monitor
  crt: 'bg-black rounded-lg shadow-[inset_0_0_50px_rgba(0,255,0,0.1)]',
  crtOff: 'bg-zinc-900 rounded-lg',

  // LCD panel
  lcd: 'bg-slate-800 rounded border-2 border-slate-700',
  lcdGlow: 'bg-slate-800 rounded border-2 border-slate-600 shadow-[0_0_10px_rgba(100,200,255,0.3)]',

  // Terminal
  terminal: 'bg-black font-mono',
  terminalGlow: 'bg-black font-mono shadow-[inset_0_0_30px_rgba(51,255,0,0.05)]',
};

// ============================================
// TEXTURE OVERLAYS
// ============================================

export const textureOverlays = {
  // Noise/grain
  noiseLight: 'bg-[url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.05\'/%3E%3C/svg%3E")]',
  noiseDark: 'bg-[url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.1\'/%3E%3C/svg%3E")]',

  // Scanlines
  scanlines: 'bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.3)_2px,rgba(0,0,0,0.3)_4px)]',
  scanlinesSubtle: 'bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.1)_2px,rgba(0,0,0,0.1)_4px)]',
};

// ============================================
// NEO-BRUTAL SURFACES
// ============================================

export const brutalSurfaces = {
  // Flat with hard shadow
  brutal: 'bg-white border-4 border-black shadow-[4px_4px_0_0_#000]',
  brutalPrimary: 'bg-blue-500 border-4 border-black shadow-[4px_4px_0_0_#000] text-white',
  brutalWarning: 'bg-yellow-400 border-4 border-black shadow-[4px_4px_0_0_#000]',
  brutalDanger: 'bg-red-500 border-4 border-black shadow-[4px_4px_0_0_#000] text-white',
  brutalSuccess: 'bg-green-500 border-4 border-black shadow-[4px_4px_0_0_#000] text-white',

  // Large offset
  brutalLarge: 'bg-white border-4 border-black shadow-[8px_8px_0_0_#000]',

  // Colored shadows
  brutalColoredShadow: 'bg-white border-4 border-black shadow-[4px_4px_0_0_#3b82f6]',
};

// ============================================
// ORGANIC / LEATHER SURFACES
// ============================================

export const organicSurfaces = {
  // Leather-like
  leather: 'bg-amber-900',
  leatherWorn: 'bg-gradient-to-br from-amber-800 via-amber-900 to-stone-900',

  // Cork
  cork: 'bg-amber-200',

  // Fabric
  canvas: 'bg-stone-200',
  linen: 'bg-stone-100',
};

// ============================================
// REGISTRY ENTRIES
// ============================================

const createSurfaceEntry = (
  id: string,
  name: string,
  description: string,
  tags: string[],
  cssClass: string
): ElementEntry => ({
  id: `surface-${id}`,
  name,
  layer: 'atom',
  category: 'surfaces',
  description,
  themeAgnostic: true,
  sourceComponents: ['multiple-zones'],
  extractedFrom: 'src/elements/atoms/surfaces/index.ts',
  previewType: 'card',
  hasInteraction: false,
  previewBg: '#1a1a1a',
  implementation: 'css-class',
  cssClass,
  codeSnippet: `<div className="${cssClass}">...</div>`,
  tags: ['surface', ...tags],
});

export const surfaceRegistry: ElementEntry[] = [
  // Glass surfaces
  createSurfaceEntry('glass', 'Glass', 'Basic frosted glass effect', ['glass', 'blur', 'transparent'], 'bg-white/10 backdrop-blur-md'),
  createSurfaceEntry('glass-dark', 'Glass Dark', 'Dark frosted glass', ['glass', 'blur', 'dark'], 'bg-black/20 backdrop-blur-md'),
  createSurfaceEntry('frosted', 'Frosted Glass', 'Frosted glass with border', ['glass', 'blur', 'border'], 'bg-white/10 backdrop-blur-lg border border-white/20'),
  createSurfaceEntry('frosted-dark', 'Frosted Dark', 'Dark frosted with border', ['glass', 'blur', 'dark', 'border'], 'bg-black/30 backdrop-blur-lg border border-white/10'),
  createSurfaceEntry('mica', 'Mica', 'Heavy blur mica effect', ['glass', 'blur', 'heavy', 'mica'], 'bg-black/50 backdrop-blur-xl backdrop-saturate-150'),
  createSurfaceEntry('glass-blue', 'Blue Glass', 'Blue tinted glass', ['glass', 'blur', 'blue', 'colored'], 'bg-blue-500/10 backdrop-blur-md'),
  createSurfaceEntry('glass-purple', 'Purple Glass', 'Purple tinted glass', ['glass', 'blur', 'purple', 'colored'], 'bg-purple-500/10 backdrop-blur-md'),

  // Paper surfaces
  createSurfaceEntry('paper', 'Paper Light', 'Basic white paper surface', ['paper', 'light', 'white'], 'bg-white shadow-sm'),
  createSurfaceEntry('paper-dark', 'Paper Dark', 'Dark paper surface', ['paper', 'dark', 'zinc'], 'bg-zinc-900 shadow-sm'),
  createSurfaceEntry('paper-elevated', 'Paper Elevated', 'Elevated white paper', ['paper', 'light', 'elevated', 'shadow'], 'bg-white shadow-md'),
  createSurfaceEntry('card', 'Card Light', 'Card with rounded corners and shadow', ['paper', 'card', 'light'], 'bg-white rounded-lg shadow-md'),
  createSurfaceEntry('card-dark', 'Card Dark', 'Dark card with border', ['paper', 'card', 'dark'], 'bg-zinc-900 rounded-lg shadow-md border border-zinc-800'),
  createSurfaceEntry('inset', 'Inset Surface', 'Pressed/inset surface', ['paper', 'inset', 'pressed'], 'bg-gray-100 shadow-inner'),

  // Metallic surfaces
  createSurfaceEntry('chrome', 'Chrome', 'Chrome/silver metallic', ['metallic', 'chrome', 'silver'], 'bg-gradient-to-b from-gray-200 via-gray-100 to-gray-300'),
  createSurfaceEntry('gold', 'Gold', 'Gold metallic surface', ['metallic', 'gold', 'yellow'], 'bg-gradient-to-br from-yellow-400 via-amber-300 to-yellow-500'),
  createSurfaceEntry('bronze', 'Bronze', 'Bronze metallic surface', ['metallic', 'bronze', 'copper'], 'bg-gradient-to-br from-amber-600 via-orange-400 to-amber-700'),
  createSurfaceEntry('steel', 'Steel', 'Brushed steel surface', ['metallic', 'steel', 'gray'], 'bg-gradient-to-b from-slate-400 via-slate-300 to-slate-500'),

  // Screen surfaces
  createSurfaceEntry('crt', 'CRT Screen', 'CRT monitor with glow', ['screen', 'crt', 'retro', 'glow'], 'bg-black rounded-lg shadow-[inset_0_0_50px_rgba(0,255,0,0.1)]'),
  createSurfaceEntry('lcd', 'LCD Panel', 'LCD screen panel', ['screen', 'lcd', 'display'], 'bg-slate-800 rounded border-2 border-slate-700'),
  createSurfaceEntry('terminal', 'Terminal', 'Terminal screen surface', ['screen', 'terminal', 'hacker'], 'bg-black font-mono'),
  createSurfaceEntry('terminal-glow', 'Terminal Glow', 'Terminal with green glow', ['screen', 'terminal', 'hacker', 'glow'], 'bg-black font-mono shadow-[inset_0_0_30px_rgba(51,255,0,0.05)]'),

  // Neo-brutal surfaces
  createSurfaceEntry('brutal', 'Neo-Brutal', 'White with hard black shadow', ['brutal', 'hard-shadow', 'white'], 'bg-white border-4 border-black shadow-[4px_4px_0_0_#000]'),
  createSurfaceEntry('brutal-primary', 'Neo-Brutal Primary', 'Blue with hard shadow', ['brutal', 'hard-shadow', 'blue'], 'bg-blue-500 border-4 border-black shadow-[4px_4px_0_0_#000] text-white'),
  createSurfaceEntry('brutal-warning', 'Neo-Brutal Warning', 'Yellow warning surface', ['brutal', 'hard-shadow', 'yellow', 'warning'], 'bg-yellow-400 border-4 border-black shadow-[4px_4px_0_0_#000]'),
  createSurfaceEntry('brutal-danger', 'Neo-Brutal Danger', 'Red danger surface', ['brutal', 'hard-shadow', 'red', 'danger'], 'bg-red-500 border-4 border-black shadow-[4px_4px_0_0_#000] text-white'),
  createSurfaceEntry('brutal-large', 'Neo-Brutal Large', 'Large offset shadow', ['brutal', 'hard-shadow', 'large'], 'bg-white border-4 border-black shadow-[8px_8px_0_0_#000]'),

  // Texture overlays
  createSurfaceEntry('scanlines', 'Scanlines', 'CRT scanline overlay', ['texture', 'scanlines', 'retro', 'crt'], 'bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.3)_2px,rgba(0,0,0,0.3)_4px)]'),

  // Organic surfaces
  createSurfaceEntry('leather', 'Leather', 'Dark leather surface', ['organic', 'leather', 'natural'], 'bg-amber-900'),
  createSurfaceEntry('leather-worn', 'Worn Leather', 'Worn leather gradient', ['organic', 'leather', 'worn', 'vintage'], 'bg-gradient-to-br from-amber-800 via-amber-900 to-stone-900'),
];
