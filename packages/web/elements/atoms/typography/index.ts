// Atom: Typography
// Text styles, fonts, and effects
// Typography system for the design system

import { ElementEntry } from '../../registry';

// ============================================
// FONT FAMILIES
// ============================================

export const fontFamilies = {
  sans: 'font-sans',
  serif: 'font-serif',
  mono: 'font-mono',
  // Custom display fonts
  display: 'font-[Bangers]',
  impact: 'font-[Impact]',
};

// ============================================
// FONT SIZES
// ============================================

export const fontSizes = {
  xs: 'text-xs',      // 12px
  sm: 'text-sm',      // 14px
  base: 'text-base',  // 16px
  lg: 'text-lg',      // 18px
  xl: 'text-xl',      // 20px
  '2xl': 'text-2xl',  // 24px
  '3xl': 'text-3xl',  // 30px
  '4xl': 'text-4xl',  // 36px
  '5xl': 'text-5xl',  // 48px
  '6xl': 'text-6xl',  // 60px
  '7xl': 'text-7xl',  // 72px
  '8xl': 'text-8xl',  // 96px
  '9xl': 'text-9xl',  // 128px
};

// ============================================
// FONT WEIGHTS
// ============================================

export const fontWeights = {
  thin: 'font-thin',         // 100
  light: 'font-light',       // 300
  normal: 'font-normal',     // 400
  medium: 'font-medium',     // 500
  semibold: 'font-semibold', // 600
  bold: 'font-bold',         // 700
  extrabold: 'font-extrabold', // 800
  black: 'font-black',       // 900
};

// ============================================
// LETTER SPACING
// ============================================

export const letterSpacing = {
  tighter: 'tracking-tighter',
  tight: 'tracking-tight',
  normal: 'tracking-normal',
  wide: 'tracking-wide',
  wider: 'tracking-wider',
  widest: 'tracking-widest',
};

// ============================================
// LINE HEIGHT
// ============================================

export const lineHeight = {
  none: 'leading-none',
  tight: 'leading-tight',
  snug: 'leading-snug',
  normal: 'leading-normal',
  relaxed: 'leading-relaxed',
  loose: 'leading-loose',
};

// ============================================
// TEXT EFFECTS
// ============================================

export const textEffects = {
  // Drop shadows
  dropShadow: 'drop-shadow-md',
  dropShadowHard: 'drop-shadow-[4px_4px_0_#000]',
  dropShadowGlow: 'drop-shadow-[0_0_10px_#4ade80]',

  // Gradients (requires bg-clip-text)
  gradientSunset: 'bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent',
  gradientCosmic: 'bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent',
  gradientGold: 'bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent',

  // Decorations
  underline: 'underline',
  underlineWavy: 'underline decoration-wavy',
  lineThrough: 'line-through',
  overline: 'overline',
};

// ============================================
// REGISTRY ENTRIES
// ============================================

const createTypographyEntry = (
  id: string,
  name: string,
  description: string,
  tags: string[],
  cssClass: string
): ElementEntry => ({
  id: `typo-${id}`,
  name,
  layer: 'atom',
  category: 'typography',
  description,
  themeAgnostic: true,
  sourceComponents: ['multiple-zones'],
  extractedFrom: 'src/elements/atoms/typography/index.ts',
  previewType: 'inline',
  hasInteraction: false,
  implementation: 'css-class',
  cssClass,
  codeSnippet: `<span className="${cssClass}">Text</span>`,
  tags: ['typography', ...tags],
});

export const typographyRegistry: ElementEntry[] = [
  // Font families
  createTypographyEntry('font-sans', 'Sans Serif', 'Default sans-serif font', ['font', 'sans', 'default'], 'font-sans'),
  createTypographyEntry('font-serif', 'Serif', 'Classic serif font', ['font', 'serif', 'classic'], 'font-serif'),
  createTypographyEntry('font-mono', 'Monospace', 'Fixed-width font for code', ['font', 'mono', 'code'], 'font-mono'),
  createTypographyEntry('font-display', 'Display Font', 'Bold display font (Bangers)', ['font', 'display', 'comic'], 'font-[Bangers]'),

  // Font sizes
  createTypographyEntry('text-xs', 'Text XS', 'Extra small text (12px)', ['size', 'small'], 'text-xs'),
  createTypographyEntry('text-sm', 'Text SM', 'Small text (14px)', ['size', 'small'], 'text-sm'),
  createTypographyEntry('text-base', 'Text Base', 'Base text size (16px)', ['size', 'default'], 'text-base'),
  createTypographyEntry('text-lg', 'Text LG', 'Large text (18px)', ['size', 'large'], 'text-lg'),
  createTypographyEntry('text-xl', 'Text XL', 'Extra large text (20px)', ['size', 'large'], 'text-xl'),
  createTypographyEntry('text-2xl', 'Text 2XL', 'Heading size (24px)', ['size', 'heading'], 'text-2xl'),
  createTypographyEntry('text-4xl', 'Text 4XL', 'Large heading (36px)', ['size', 'heading', 'large'], 'text-4xl'),
  createTypographyEntry('text-6xl', 'Text 6XL', 'Display size (60px)', ['size', 'display'], 'text-6xl'),

  // Font weights
  createTypographyEntry('font-light', 'Light Weight', 'Light font weight (300)', ['weight', 'light'], 'font-light'),
  createTypographyEntry('font-normal', 'Normal Weight', 'Regular font weight (400)', ['weight', 'normal'], 'font-normal'),
  createTypographyEntry('font-medium', 'Medium Weight', 'Medium font weight (500)', ['weight', 'medium'], 'font-medium'),
  createTypographyEntry('font-semibold', 'Semibold Weight', 'Semibold font weight (600)', ['weight', 'semibold'], 'font-semibold'),
  createTypographyEntry('font-bold', 'Bold Weight', 'Bold font weight (700)', ['weight', 'bold'], 'font-bold'),
  createTypographyEntry('font-black', 'Black Weight', 'Black font weight (900)', ['weight', 'black', 'heavy'], 'font-black'),

  // Letter spacing
  createTypographyEntry('tracking-tight', 'Tight Tracking', 'Reduced letter spacing', ['spacing', 'tight'], 'tracking-tight'),
  createTypographyEntry('tracking-wide', 'Wide Tracking', 'Increased letter spacing', ['spacing', 'wide'], 'tracking-wide'),
  createTypographyEntry('tracking-widest', 'Widest Tracking', 'Maximum letter spacing', ['spacing', 'widest', 'spread'], 'tracking-widest'),

  // Line height
  createTypographyEntry('leading-tight', 'Tight Leading', 'Compact line height', ['leading', 'tight', 'compact'], 'leading-tight'),
  createTypographyEntry('leading-normal', 'Normal Leading', 'Default line height', ['leading', 'normal'], 'leading-normal'),
  createTypographyEntry('leading-relaxed', 'Relaxed Leading', 'Spacious line height', ['leading', 'relaxed', 'readable'], 'leading-relaxed'),

  // Text effects
  createTypographyEntry('drop-shadow', 'Drop Shadow', 'Text with drop shadow', ['effect', 'shadow'], 'drop-shadow-md'),
  createTypographyEntry('drop-shadow-hard', 'Hard Drop Shadow', 'Comic-style hard shadow', ['effect', 'shadow', 'comic'], 'drop-shadow-[4px_4px_0_#000]'),
  createTypographyEntry('text-glow', 'Text Glow', 'Neon glow effect on text', ['effect', 'glow', 'neon'], 'drop-shadow-[0_0_10px_#4ade80]'),
  createTypographyEntry('gradient-sunset', 'Gradient Text Sunset', 'Orange to pink gradient text', ['effect', 'gradient', 'sunset'], 'bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent'),
  createTypographyEntry('gradient-cosmic', 'Gradient Text Cosmic', 'Purple to cyan gradient text', ['effect', 'gradient', 'cosmic'], 'bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent'),
  createTypographyEntry('gradient-gold', 'Gradient Text Gold', 'Golden metallic gradient', ['effect', 'gradient', 'gold', 'metallic'], 'bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent'),

  // Decorations
  createTypographyEntry('underline', 'Underline', 'Standard underline', ['decoration', 'underline'], 'underline'),
  createTypographyEntry('underline-wavy', 'Wavy Underline', 'Decorative wavy underline', ['decoration', 'underline', 'wavy'], 'underline decoration-wavy'),
  createTypographyEntry('line-through', 'Strikethrough', 'Line through text', ['decoration', 'strikethrough'], 'line-through'),
];
