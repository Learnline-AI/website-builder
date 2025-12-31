// Atom: Shadows
// Box shadows, glows, and depth effects
// Elevation system for the design system

import { ElementEntry } from '../../registry';

// ============================================
// SHADOW TOKENS
// ============================================

export const shadows = {
  // Tailwind defaults
  none: 'shadow-none',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  '2xl': 'shadow-2xl',
  inner: 'shadow-inner',

  // Hard offset shadows (neo-brutal style)
  hard4: 'shadow-[4px_4px_0_0_#000]',
  hard8: 'shadow-[8px_8px_0_0_#000]',
  hard12: 'shadow-[12px_12px_0_0_#000]',
  hardWhite4: 'shadow-[4px_4px_0_0_#fff]',

  // Colored hard shadows
  hardRed: 'shadow-[4px_4px_0_0_#ef4444]',
  hardBlue: 'shadow-[4px_4px_0_0_#3b82f6]',
  hardGreen: 'shadow-[4px_4px_0_0_#22c55e]',
  hardPurple: 'shadow-[4px_4px_0_0_#a855f7]',

  // Glow effects
  glowWhite: 'shadow-[0_0_15px_rgba(255,255,255,0.5)]',
  glowGreen: 'shadow-[0_0_10px_rgba(51,255,0,0.5)]',
  glowPurple: 'shadow-[0_0_20px_rgba(168,85,247,0.5)]',
  glowCyan: 'shadow-[0_0_15px_rgba(34,211,238,0.5)]',
  glowOrange: 'shadow-[0_0_15px_rgba(249,115,22,0.5)]',
  glowPink: 'shadow-[0_0_15px_rgba(236,72,153,0.5)]',

  // Sun/cosmic glow
  sunGlow: 'shadow-[0_0_30px_rgba(255,200,0,0.5)]',
  blackHole: 'shadow-[0_0_40px_20px_rgba(0,0,0,0.8)]',
};

// ============================================
// REGISTRY ENTRIES
// ============================================

const createShadowEntry = (
  id: string,
  name: string,
  description: string,
  tags: string[],
  cssClass: string
): ElementEntry => ({
  id: `shadow-${id}`,
  name,
  layer: 'atom',
  category: 'shadows',
  description,
  themeAgnostic: true,
  sourceComponents: ['multiple-zones'],
  extractedFrom: 'src/elements/atoms/shadows/index.ts',
  previewType: 'inline',
  hasInteraction: false,
  previewBg: '#1a1a1a',
  implementation: 'css-class',
  cssClass,
  codeSnippet: `<div className="${cssClass}">...</div>`,
  tags: ['shadow', ...tags],
});

export const shadowRegistry: ElementEntry[] = [
  // Standard elevation
  createShadowEntry('none', 'No Shadow', 'Removes all shadows', ['flat', 'none'], 'shadow-none'),
  createShadowEntry('sm', 'Shadow Small', 'Subtle shadow for cards', ['elevation', 'subtle'], 'shadow-sm'),
  createShadowEntry('md', 'Shadow Medium', 'Default card shadow', ['elevation', 'default'], 'shadow-md'),
  createShadowEntry('lg', 'Shadow Large', 'Prominent shadow for modals', ['elevation', 'prominent'], 'shadow-lg'),
  createShadowEntry('xl', 'Shadow XL', 'Strong shadow for dropdowns', ['elevation', 'strong'], 'shadow-xl'),
  createShadowEntry('2xl', 'Shadow 2XL', 'Maximum elevation shadow', ['elevation', 'maximum'], 'shadow-2xl'),
  createShadowEntry('inner', 'Inner Shadow', 'Inset shadow for pressed states', ['inset', 'pressed'], 'shadow-inner'),

  // Hard offset shadows
  createShadowEntry('hard-4', 'Hard Shadow 4px', 'Neo-brutal offset shadow (4px)', ['hard', 'neo-brutal', 'offset'], 'shadow-[4px_4px_0_0_#000]'),
  createShadowEntry('hard-8', 'Hard Shadow 8px', 'Neo-brutal offset shadow (8px)', ['hard', 'neo-brutal', 'offset'], 'shadow-[8px_8px_0_0_#000]'),
  createShadowEntry('hard-12', 'Hard Shadow 12px', 'Large neo-brutal shadow (12px)', ['hard', 'neo-brutal', 'offset', 'large'], 'shadow-[12px_12px_0_0_#000]'),
  createShadowEntry('hard-white', 'Hard Shadow White', 'White offset shadow for dark backgrounds', ['hard', 'neo-brutal', 'white'], 'shadow-[4px_4px_0_0_#fff]'),

  // Colored hard shadows
  createShadowEntry('hard-red', 'Hard Shadow Red', 'Red offset shadow', ['hard', 'colored', 'red'], 'shadow-[4px_4px_0_0_#ef4444]'),
  createShadowEntry('hard-blue', 'Hard Shadow Blue', 'Blue offset shadow', ['hard', 'colored', 'blue'], 'shadow-[4px_4px_0_0_#3b82f6]'),
  createShadowEntry('hard-green', 'Hard Shadow Green', 'Green offset shadow', ['hard', 'colored', 'green'], 'shadow-[4px_4px_0_0_#22c55e]'),
  createShadowEntry('hard-purple', 'Hard Shadow Purple', 'Purple offset shadow', ['hard', 'colored', 'purple'], 'shadow-[4px_4px_0_0_#a855f7]'),

  // Glow effects
  createShadowEntry('glow-white', 'White Glow', 'Soft white glow effect', ['glow', 'light', 'soft'], 'shadow-[0_0_15px_rgba(255,255,255,0.5)]'),
  createShadowEntry('glow-green', 'Neon Green Glow', 'Terminal/hacker neon glow', ['glow', 'neon', 'hacker', 'terminal'], 'shadow-[0_0_10px_rgba(51,255,0,0.5)]'),
  createShadowEntry('glow-purple', 'Purple Glow', 'Cosmic purple glow', ['glow', 'cosmic', 'purple'], 'shadow-[0_0_20px_rgba(168,85,247,0.5)]'),
  createShadowEntry('glow-cyan', 'Cyan Glow', 'Electric cyan glow', ['glow', 'electric', 'cyan'], 'shadow-[0_0_15px_rgba(34,211,238,0.5)]'),
  createShadowEntry('glow-orange', 'Orange Glow', 'Warm orange glow', ['glow', 'warm', 'orange'], 'shadow-[0_0_15px_rgba(249,115,22,0.5)]'),
  createShadowEntry('glow-pink', 'Pink Glow', 'Vibrant pink glow', ['glow', 'arcade', 'pink'], 'shadow-[0_0_15px_rgba(236,72,153,0.5)]'),

  // Special effects
  createShadowEntry('sun-glow', 'Sun Glow', 'Large golden sun glow effect', ['glow', 'cosmic', 'sun', 'special'], 'shadow-[0_0_30px_rgba(255,200,0,0.5)]'),
  createShadowEntry('black-hole', 'Black Hole', 'Intense dark shadow effect', ['dark', 'cosmic', 'black-hole', 'special'], 'shadow-[0_0_40px_20px_rgba(0,0,0,0.8)]'),
];
