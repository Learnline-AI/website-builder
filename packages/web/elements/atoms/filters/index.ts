// Atom: Filters
// CSS and SVG filters, blur effects, color adjustments
// Visual effect system for the design system

import { ElementEntry } from '../../registry';

// ============================================
// BLUR FILTERS
// ============================================

export const blurFilters = {
  none: 'blur-none',
  sm: 'blur-sm',
  md: 'blur-md',
  lg: 'blur-lg',
  xl: 'blur-xl',
  '2xl': 'blur-2xl',
  '3xl': 'blur-3xl',
};

// ============================================
// BACKDROP BLUR
// ============================================

export const backdropBlur = {
  none: 'backdrop-blur-none',
  sm: 'backdrop-blur-sm',
  md: 'backdrop-blur-md',
  lg: 'backdrop-blur-lg',
  xl: 'backdrop-blur-xl',
  '2xl': 'backdrop-blur-2xl',
};

// ============================================
// BRIGHTNESS
// ============================================

export const brightness = {
  0: 'brightness-0',
  50: 'brightness-50',
  75: 'brightness-75',
  90: 'brightness-90',
  95: 'brightness-95',
  100: 'brightness-100',
  105: 'brightness-105',
  110: 'brightness-110',
  125: 'brightness-125',
  150: 'brightness-150',
  200: 'brightness-200',
};

// ============================================
// CONTRAST
// ============================================

export const contrast = {
  0: 'contrast-0',
  50: 'contrast-50',
  75: 'contrast-75',
  100: 'contrast-100',
  125: 'contrast-125',
  150: 'contrast-150',
  200: 'contrast-200',
};

// ============================================
// SATURATION
// ============================================

export const saturation = {
  0: 'saturate-0',        // Grayscale
  50: 'saturate-50',
  100: 'saturate-100',    // Normal
  150: 'saturate-150',
  200: 'saturate-200',    // Vibrant
};

// ============================================
// HUE ROTATE
// ============================================

export const hueRotate = {
  0: 'hue-rotate-0',
  15: 'hue-rotate-15',
  30: 'hue-rotate-30',
  60: 'hue-rotate-60',
  90: 'hue-rotate-90',
  180: 'hue-rotate-180',
};

// ============================================
// GRAYSCALE & SEPIA
// ============================================

export const colorFilters = {
  grayscale: 'grayscale',
  grayscaleNone: 'grayscale-0',
  sepia: 'sepia',
  sepiaNone: 'sepia-0',
  invert: 'invert',
  invertNone: 'invert-0',
};

// ============================================
// DROP SHADOW FILTERS
// ============================================

export const dropShadowFilters = {
  none: 'drop-shadow-none',
  sm: 'drop-shadow-sm',
  md: 'drop-shadow-md',
  lg: 'drop-shadow-lg',
  xl: 'drop-shadow-xl',
  '2xl': 'drop-shadow-2xl',
  // Custom glow effects
  glowGreen: 'drop-shadow-[0_0_10px_#33ff00]',
  glowPurple: 'drop-shadow-[0_0_10px_#a855f7]',
  glowCyan: 'drop-shadow-[0_0_10px_#22d3ee]',
  glowOrange: 'drop-shadow-[0_0_10px_#f97316]',
  glowPink: 'drop-shadow-[0_0_10px_#ec4899]',
};

// ============================================
// SPECIAL EFFECT COMBINATIONS
// ============================================

export const effectCombos = {
  // Retro/vintage
  vintage: 'sepia brightness-90 contrast-110',
  faded: 'saturate-50 brightness-110',

  // Night vision / hacker
  nightVision: 'saturate-0 brightness-150 contrast-125 hue-rotate-90',
  terminal: 'saturate-0 brightness-125 contrast-150',

  // Cinematic
  cinematic: 'contrast-125 saturate-110',
  dramatic: 'contrast-150 brightness-90',

  // Glitch/distortion (static classes)
  glitchReady: 'relative overflow-hidden',
};

// ============================================
// SVG FILTER DEFINITIONS (as strings)
// ============================================

export const svgFilters = {
  // Noise/grain effect
  noise: `
    <filter id="noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
      <feBlend mode="overlay"/>
    </filter>
  `,

  // Chromatic aberration
  chromatic: `
    <filter id="chromatic">
      <feOffset in="SourceGraphic" dx="2" dy="0" result="red"/>
      <feOffset in="SourceGraphic" dx="-2" dy="0" result="cyan"/>
      <feBlend in="red" in2="cyan" mode="screen"/>
    </filter>
  `,

  // Glow effect
  glow: `
    <filter id="glow">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  `,

  // Sketch/pencil effect
  sketch: `
    <filter id="sketch">
      <feTurbulence type="turbulence" baseFrequency="0.03" numOctaves="3"/>
      <feDisplacementMap in="SourceGraphic" scale="5"/>
    </filter>
  `,
};

// ============================================
// REGISTRY ENTRIES
// ============================================

const createFilterEntry = (
  id: string,
  name: string,
  description: string,
  tags: string[],
  cssClass: string
): ElementEntry => ({
  id: `filter-${id}`,
  name,
  layer: 'atom',
  category: 'filters',
  description,
  themeAgnostic: true,
  sourceComponents: ['multiple-zones'],
  extractedFrom: 'src/elements/atoms/filters/index.ts',
  previewType: 'card',
  hasInteraction: false,
  previewBg: '#1a1a1a',
  implementation: 'css-class',
  cssClass,
  codeSnippet: `<div className="${cssClass}">...</div>`,
  tags: ['filter', ...tags],
});

export const filterRegistry: ElementEntry[] = [
  // Blur filters
  createFilterEntry('blur-none', 'Blur None', 'No blur effect', ['blur', 'none'], 'blur-none'),
  createFilterEntry('blur-sm', 'Blur Small', 'Subtle blur effect', ['blur', 'small', 'subtle'], 'blur-sm'),
  createFilterEntry('blur-md', 'Blur Medium', 'Medium blur effect', ['blur', 'medium'], 'blur-md'),
  createFilterEntry('blur-lg', 'Blur Large', 'Large blur effect', ['blur', 'large'], 'blur-lg'),
  createFilterEntry('blur-xl', 'Blur XL', 'Extra large blur', ['blur', 'xl', 'heavy'], 'blur-xl'),
  createFilterEntry('blur-2xl', 'Blur 2XL', 'Maximum blur', ['blur', '2xl', 'maximum'], 'blur-2xl'),

  // Backdrop blur
  createFilterEntry('backdrop-blur-sm', 'Backdrop Blur SM', 'Subtle frosted glass effect', ['backdrop', 'blur', 'glass', 'small'], 'backdrop-blur-sm'),
  createFilterEntry('backdrop-blur-md', 'Backdrop Blur MD', 'Medium frosted glass', ['backdrop', 'blur', 'glass', 'medium'], 'backdrop-blur-md'),
  createFilterEntry('backdrop-blur-lg', 'Backdrop Blur LG', 'Strong frosted glass', ['backdrop', 'blur', 'glass', 'large'], 'backdrop-blur-lg'),
  createFilterEntry('backdrop-blur-xl', 'Backdrop Blur XL', 'Heavy frosted glass', ['backdrop', 'blur', 'glass', 'heavy'], 'backdrop-blur-xl'),

  // Brightness
  createFilterEntry('brightness-50', 'Brightness 50%', 'Darkened to 50%', ['brightness', 'dark', 'dim'], 'brightness-50'),
  createFilterEntry('brightness-75', 'Brightness 75%', 'Slightly darkened', ['brightness', 'dark'], 'brightness-75'),
  createFilterEntry('brightness-100', 'Brightness 100%', 'Normal brightness', ['brightness', 'normal'], 'brightness-100'),
  createFilterEntry('brightness-125', 'Brightness 125%', 'Slightly brightened', ['brightness', 'light'], 'brightness-125'),
  createFilterEntry('brightness-150', 'Brightness 150%', 'Bright', ['brightness', 'bright'], 'brightness-150'),

  // Contrast
  createFilterEntry('contrast-50', 'Contrast 50%', 'Low contrast (washed out)', ['contrast', 'low', 'faded'], 'contrast-50'),
  createFilterEntry('contrast-100', 'Contrast 100%', 'Normal contrast', ['contrast', 'normal'], 'contrast-100'),
  createFilterEntry('contrast-125', 'Contrast 125%', 'Enhanced contrast', ['contrast', 'enhanced'], 'contrast-125'),
  createFilterEntry('contrast-150', 'Contrast 150%', 'High contrast', ['contrast', 'high', 'punchy'], 'contrast-150'),

  // Saturation
  createFilterEntry('saturate-0', 'Grayscale', 'Zero saturation (black & white)', ['saturation', 'grayscale', 'bw'], 'saturate-0'),
  createFilterEntry('saturate-50', 'Desaturated', 'Half saturation', ['saturation', 'desaturated', 'muted'], 'saturate-50'),
  createFilterEntry('saturate-100', 'Normal Saturation', 'Default saturation', ['saturation', 'normal'], 'saturate-100'),
  createFilterEntry('saturate-150', 'Saturated', 'Enhanced colors', ['saturation', 'enhanced', 'vivid'], 'saturate-150'),
  createFilterEntry('saturate-200', 'Vibrant', 'Maximum saturation', ['saturation', 'vibrant', 'intense'], 'saturate-200'),

  // Color filters
  createFilterEntry('grayscale', 'Grayscale Filter', 'Full grayscale effect', ['color', 'grayscale', 'bw'], 'grayscale'),
  createFilterEntry('sepia', 'Sepia Filter', 'Vintage sepia tone', ['color', 'sepia', 'vintage', 'retro'], 'sepia'),
  createFilterEntry('invert', 'Invert Filter', 'Inverted colors', ['color', 'invert', 'negative'], 'invert'),

  // Hue rotation
  createFilterEntry('hue-rotate-90', 'Hue Rotate 90°', 'Shift hue by 90 degrees', ['hue', 'rotate', 'color-shift'], 'hue-rotate-90'),
  createFilterEntry('hue-rotate-180', 'Hue Rotate 180°', 'Shift hue by 180 degrees', ['hue', 'rotate', 'color-shift'], 'hue-rotate-180'),

  // Drop shadows
  createFilterEntry('drop-shadow-md', 'Drop Shadow MD', 'Medium drop shadow', ['shadow', 'drop', 'medium'], 'drop-shadow-md'),
  createFilterEntry('drop-shadow-lg', 'Drop Shadow LG', 'Large drop shadow', ['shadow', 'drop', 'large'], 'drop-shadow-lg'),
  createFilterEntry('drop-shadow-xl', 'Drop Shadow XL', 'Extra large drop shadow', ['shadow', 'drop', 'xl'], 'drop-shadow-xl'),
  createFilterEntry('drop-shadow-glow-green', 'Green Glow', 'Neon green glow effect', ['shadow', 'glow', 'green', 'neon'], 'drop-shadow-[0_0_10px_#33ff00]'),
  createFilterEntry('drop-shadow-glow-purple', 'Purple Glow', 'Purple glow effect', ['shadow', 'glow', 'purple', 'cosmic'], 'drop-shadow-[0_0_10px_#a855f7]'),
  createFilterEntry('drop-shadow-glow-cyan', 'Cyan Glow', 'Cyan glow effect', ['shadow', 'glow', 'cyan', 'neon'], 'drop-shadow-[0_0_10px_#22d3ee]'),

  // Effect combinations
  createFilterEntry('vintage', 'Vintage Effect', 'Sepia with adjusted brightness/contrast', ['combo', 'vintage', 'retro', 'photo'], 'sepia brightness-90 contrast-110'),
  createFilterEntry('faded', 'Faded Effect', 'Desaturated and bright', ['combo', 'faded', 'washed'], 'saturate-50 brightness-110'),
  createFilterEntry('cinematic', 'Cinematic Effect', 'High contrast, slightly saturated', ['combo', 'cinematic', 'film'], 'contrast-125 saturate-110'),
  createFilterEntry('dramatic', 'Dramatic Effect', 'High contrast, slightly dark', ['combo', 'dramatic', 'moody'], 'contrast-150 brightness-90'),
  createFilterEntry('night-vision', 'Night Vision', 'Green-tinted night vision effect', ['combo', 'night', 'hacker', 'green'], 'saturate-0 brightness-150 contrast-125 hue-rotate-90'),
];
