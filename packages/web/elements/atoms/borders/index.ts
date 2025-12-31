// Atom: Borders
// Border styles, decorative edges, and line effects
// Border system for the design system

import { ElementEntry } from '../../registry';

// ============================================
// BORDER WIDTHS
// ============================================

export const borderWidths = {
  none: 'border-0',
  thin: 'border',           // 1px
  medium: 'border-2',       // 2px
  thick: 'border-4',        // 4px
  extraThick: 'border-8',   // 8px
};

// ============================================
// BORDER STYLES
// ============================================

export const borderStyles = {
  solid: 'border-solid',
  dashed: 'border-dashed',
  dotted: 'border-dotted',
  double: 'border-double',
  hidden: 'border-hidden',
  none: 'border-none',
};

// ============================================
// BORDER RADIUS
// ============================================

export const borderRadius = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  '3xl': 'rounded-3xl',
  full: 'rounded-full',
};

// ============================================
// BORDER COLORS
// ============================================

export const borderColors = {
  // Basic
  transparent: 'border-transparent',
  black: 'border-black',
  white: 'border-white',

  // Grays
  gray300: 'border-gray-300',
  gray500: 'border-gray-500',
  gray700: 'border-gray-700',

  // Theme colors
  red500: 'border-red-500',
  orange500: 'border-orange-500',
  amber500: 'border-amber-500',
  yellow500: 'border-yellow-500',
  green500: 'border-green-500',
  cyan500: 'border-cyan-500',
  blue500: 'border-blue-500',
  purple500: 'border-purple-500',
  pink500: 'border-pink-500',

  // Neon (hacker zone)
  neonGreen: 'border-[#33ff00]',
  neonCyan: 'border-cyan-400',
};

// ============================================
// DECORATIVE BORDERS
// ============================================

export const decorativeBorders = {
  // Neo-brutal style (thick black)
  brutal: 'border-4 border-black',
  brutalWhite: 'border-4 border-white',

  // Outline style
  outline: 'outline outline-2 outline-offset-2',
  outlineBlack: 'outline outline-2 outline-black outline-offset-2',

  // Ring (focus style)
  ring: 'ring-2',
  ringPrimary: 'ring-2 ring-blue-500',
  ringError: 'ring-2 ring-red-500',
  ringSuccess: 'ring-2 ring-green-500',

  // Double border effect
  doubleBlack: 'border-4 border-double border-black',

  // Gradient border (requires wrapper technique)
  gradientBorder: 'border-2 border-transparent bg-clip-padding',
};

// ============================================
// DIVIDERS
// ============================================

export const dividers = {
  horizontal: 'border-t border-gray-700',
  horizontalLight: 'border-t border-gray-300',
  vertical: 'border-l border-gray-700',
  verticalLight: 'border-l border-gray-300',
};

// ============================================
// REGISTRY ENTRIES
// ============================================

const createBorderEntry = (
  id: string,
  name: string,
  description: string,
  tags: string[],
  cssClass: string
): ElementEntry => ({
  id: `border-${id}`,
  name,
  layer: 'atom',
  category: 'borders',
  description,
  themeAgnostic: true,
  sourceComponents: ['multiple-zones'],
  extractedFrom: 'src/elements/atoms/borders/index.ts',
  previewType: 'inline',
  hasInteraction: false,
  previewBg: '#1a1a1a',
  implementation: 'css-class',
  cssClass,
  codeSnippet: `<div className="${cssClass}">...</div>`,
  tags: ['border', ...tags],
});

export const borderRegistry: ElementEntry[] = [
  // Border widths
  createBorderEntry('width-none', 'No Border', 'Removes all borders', ['width', 'none'], 'border-0'),
  createBorderEntry('width-thin', 'Border Thin', '1px border width', ['width', 'thin', '1px'], 'border'),
  createBorderEntry('width-medium', 'Border Medium', '2px border width', ['width', 'medium', '2px'], 'border-2'),
  createBorderEntry('width-thick', 'Border Thick', '4px border width', ['width', 'thick', '4px'], 'border-4'),
  createBorderEntry('width-extra-thick', 'Border Extra Thick', '8px border width', ['width', 'extra-thick', '8px'], 'border-8'),

  // Border styles
  createBorderEntry('style-solid', 'Solid Border', 'Solid line border', ['style', 'solid'], 'border-solid'),
  createBorderEntry('style-dashed', 'Dashed Border', 'Dashed line border', ['style', 'dashed'], 'border-dashed'),
  createBorderEntry('style-dotted', 'Dotted Border', 'Dotted line border', ['style', 'dotted'], 'border-dotted'),
  createBorderEntry('style-double', 'Double Border', 'Double line border', ['style', 'double'], 'border-double'),

  // Border radius
  createBorderEntry('radius-none', 'Square Corners', 'No border radius', ['radius', 'square', 'none'], 'rounded-none'),
  createBorderEntry('radius-sm', 'Rounded SM', 'Small border radius', ['radius', 'small'], 'rounded-sm'),
  createBorderEntry('radius-md', 'Rounded MD', 'Medium border radius', ['radius', 'medium'], 'rounded-md'),
  createBorderEntry('radius-lg', 'Rounded LG', 'Large border radius', ['radius', 'large'], 'rounded-lg'),
  createBorderEntry('radius-xl', 'Rounded XL', 'Extra large border radius', ['radius', 'xl'], 'rounded-xl'),
  createBorderEntry('radius-2xl', 'Rounded 2XL', 'Very large border radius', ['radius', '2xl'], 'rounded-2xl'),
  createBorderEntry('radius-full', 'Pill/Circle', 'Full border radius (pill shape)', ['radius', 'full', 'pill', 'circle'], 'rounded-full'),

  // Decorative borders
  createBorderEntry('brutal', 'Neo-Brutal Border', 'Thick black border (neo-brutal style)', ['decorative', 'neo-brutal', 'thick'], 'border-4 border-black'),
  createBorderEntry('brutal-white', 'Neo-Brutal White', 'Thick white border for dark backgrounds', ['decorative', 'neo-brutal', 'white'], 'border-4 border-white'),
  createBorderEntry('double-black', 'Double Black', 'Double line black border', ['decorative', 'double', 'black'], 'border-4 border-double border-black'),

  // Ring styles (focus indicators)
  createBorderEntry('ring', 'Focus Ring', 'Default focus ring', ['ring', 'focus', 'accessibility'], 'ring-2'),
  createBorderEntry('ring-primary', 'Primary Ring', 'Blue primary focus ring', ['ring', 'focus', 'primary'], 'ring-2 ring-blue-500'),
  createBorderEntry('ring-error', 'Error Ring', 'Red error focus ring', ['ring', 'focus', 'error'], 'ring-2 ring-red-500'),
  createBorderEntry('ring-success', 'Success Ring', 'Green success focus ring', ['ring', 'focus', 'success'], 'ring-2 ring-green-500'),

  // Neon borders
  createBorderEntry('neon-green', 'Neon Green Border', 'Bright neon green border', ['neon', 'hacker', 'green'], 'border-2 border-[#33ff00]'),
  createBorderEntry('neon-cyan', 'Neon Cyan Border', 'Bright cyan border', ['neon', 'hacker', 'cyan'], 'border-2 border-cyan-400'),

  // Dividers
  createBorderEntry('divider-horizontal', 'Horizontal Divider', 'Horizontal line divider', ['divider', 'horizontal', 'separator'], 'border-t border-gray-700'),
  createBorderEntry('divider-vertical', 'Vertical Divider', 'Vertical line divider', ['divider', 'vertical', 'separator'], 'border-l border-gray-700'),
];
