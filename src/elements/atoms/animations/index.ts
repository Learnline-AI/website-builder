// Atom: Animations
// Keyframe definitions, animation hooks, and transition presets
// Core motion primitives for the design system

import { ElementEntry } from '../../registry';

// Re-export animation hooks from shared library
export {
  useGameLoop,
  useReducedMotion,
  useInterval,
  useMousePosition
} from '../../../library/shared/hooks';

// ============================================
// KEYFRAME DEFINITIONS
// ============================================

export const keyframes = {
  // Rotation animations
  spin: `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `,
  spinReverse: `
    @keyframes spinReverse {
      from { transform: rotate(360deg); }
      to { transform: rotate(0deg); }
    }
  `,

  // Opacity animations
  pulse: `
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
  `,
  blink: `
    @keyframes blink {
      0%, 50% { opacity: 1; }
      51%, 100% { opacity: 0; }
    }
  `,
  fadeIn: `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `,
  fadeOut: `
    @keyframes fadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
    }
  `,

  // Scale animations
  scaleIn: `
    @keyframes scaleIn {
      from { transform: scale(0); }
      to { transform: scale(1); }
    }
  `,
  scaleOut: `
    @keyframes scaleOut {
      from { transform: scale(1); }
      to { transform: scale(0); }
    }
  `,
  bounce: `
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
  `,

  // Translation animations
  slideInLeft: `
    @keyframes slideInLeft {
      from { transform: translateX(-100%); }
      to { transform: translateX(0); }
    }
  `,
  slideInRight: `
    @keyframes slideInRight {
      from { transform: translateX(100%); }
      to { transform: translateX(0); }
    }
  `,
  slideInUp: `
    @keyframes slideInUp {
      from { transform: translateY(100%); }
      to { transform: translateY(0); }
    }
  `,
  slideInDown: `
    @keyframes slideInDown {
      from { transform: translateY(-100%); }
      to { transform: translateY(0); }
    }
  `,

  // Effect animations
  ripple: `
    @keyframes ripple {
      from { transform: scale(0); opacity: 0.5; }
      to { transform: scale(4); opacity: 0; }
    }
  `,
  wave: `
    @keyframes wave {
      from { transform: translateX(0); }
      to { transform: translateX(-50%); }
    }
  `,
  tremor: `
    @keyframes tremor {
      0%, 100% { transform: translate(1px, 1px) rotate(0deg); }
      25% { transform: translate(-1px, -1px) rotate(-0.5deg); }
      50% { transform: translate(1px, -1px) rotate(0.5deg); }
      75% { transform: translate(-1px, 1px) rotate(-0.5deg); }
    }
  `,
  meteor: `
    @keyframes meteor {
      from { transform: translateX(0) translateY(0) rotate(45deg); opacity: 1; }
      to { transform: translateX(-500px) translateY(500px) rotate(45deg); opacity: 0; }
    }
  `,
  fall: `
    @keyframes fall {
      from { transform: translateY(-100px); }
      to { transform: translateY(100vh); }
    }
  `,

  // SVG stroke animations
  dash: `
    @keyframes dash {
      to { stroke-dashoffset: -100; }
    }
  `,
  draw: `
    @keyframes draw {
      from { stroke-dasharray: 0 100; stroke-dashoffset: 100; }
      to { stroke-dasharray: 100 100; stroke-dashoffset: 0; }
    }
  `,

  // Particle animations
  vector: `
    @keyframes vector {
      0% { transform: translate(0, 0); opacity: 1; }
      100% { transform: translate(15px, 15px); opacity: 0; }
    }
  `,

  // VCR/Retro effects
  vcr: `
    @keyframes vcr {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
  `,
};

// ============================================
// EASING PRESETS
// ============================================

export const easings = {
  linear: 'linear',
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
  // Custom cubic-bezier curves
  bouncy: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)',
  elastic: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  snappy: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
};

// ============================================
// DURATION PRESETS
// ============================================

export const durations = {
  instant: '0ms',
  fast: '100ms',
  normal: '200ms',
  moderate: '300ms',
  slow: '500ms',
  slower: '700ms',
  slowest: '1000ms',
  // For continuous animations
  continuous2s: '2s',
  continuous3s: '3s',
  continuous5s: '5s',
  continuous10s: '10s',
};

// ============================================
// TAILWIND CLASS PRESETS
// ============================================

export const animationClasses = {
  // Built-in Tailwind animations
  spin: 'animate-spin',
  ping: 'animate-ping',
  pulse: 'animate-pulse',
  bounce: 'animate-bounce',

  // Transitions
  transitionAll: 'transition-all',
  transitionColors: 'transition-colors',
  transitionOpacity: 'transition-opacity',
  transitionShadow: 'transition-shadow',
  transitionTransform: 'transition-transform',

  // Duration classes
  duration100: 'duration-100',
  duration200: 'duration-200',
  duration300: 'duration-300',
  duration500: 'duration-500',
  duration700: 'duration-700',
  duration1000: 'duration-1000',

  // Easing classes
  easeLinear: 'ease-linear',
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
};

// ============================================
// REGISTRY ENTRIES
// ============================================

const createAnimationEntry = (
  id: string,
  name: string,
  description: string,
  tags: string[],
  codeSnippet: string
): ElementEntry => ({
  id: `anim-${id}`,
  name,
  layer: 'atom',
  category: 'animations',
  description,
  themeAgnostic: true,
  sourceComponents: ['multiple-zones'],
  extractedFrom: 'src/library/shared/hooks.ts',
  previewType: 'inline',
  hasInteraction: true,
  implementation: 'css-class',
  cssClass: codeSnippet,
  codeSnippet,
  tags: ['animation', ...tags],
});

export const animationRegistry: ElementEntry[] = [
  // Rotation
  createAnimationEntry('spin', 'Spin', 'Continuous 360-degree rotation', ['rotate', 'continuous', 'loading'], 'animate-spin'),
  createAnimationEntry('spin-slow', 'Spin Slow', 'Slow continuous rotation (3s)', ['rotate', 'continuous', 'gentle'], 'animate-[spin_3s_linear_infinite]'),
  createAnimationEntry('spin-reverse', 'Spin Reverse', 'Counter-clockwise rotation', ['rotate', 'reverse', 'continuous'], 'animate-[spinReverse_1s_linear_infinite]'),

  // Opacity
  createAnimationEntry('pulse', 'Pulse', 'Pulsing opacity animation', ['opacity', 'breathing', 'attention'], 'animate-pulse'),
  createAnimationEntry('blink', 'Blink', 'Blinking cursor effect', ['cursor', 'typing', 'terminal'], 'animate-[blink_1s_infinite]'),
  createAnimationEntry('fade-in', 'Fade In', 'Opacity fade in from 0 to 1', ['opacity', 'enter', 'reveal'], 'animate-[fadeIn_0.3s_ease-out]'),
  createAnimationEntry('fade-out', 'Fade Out', 'Opacity fade out from 1 to 0', ['opacity', 'exit', 'hide'], 'animate-[fadeOut_0.3s_ease-out]'),

  // Scale
  createAnimationEntry('bounce', 'Bounce', 'Vertical bouncing animation', ['scale', 'playful', 'attention'], 'animate-bounce'),
  createAnimationEntry('scale-in', 'Scale In', 'Scale up from 0 to full size', ['scale', 'enter', 'pop'], 'animate-[scaleIn_0.3s_ease-out]'),
  createAnimationEntry('scale-out', 'Scale Out', 'Scale down to 0', ['scale', 'exit', 'shrink'], 'animate-[scaleOut_0.3s_ease-in]'),
  createAnimationEntry('ping', 'Ping', 'Expanding ping/ripple effect', ['scale', 'notification', 'alert'], 'animate-ping'),

  // Translation
  createAnimationEntry('slide-in-left', 'Slide In Left', 'Slide in from the left', ['translate', 'enter', 'navigation'], 'animate-[slideInLeft_0.3s_ease-out]'),
  createAnimationEntry('slide-in-right', 'Slide In Right', 'Slide in from the right', ['translate', 'enter', 'navigation'], 'animate-[slideInRight_0.3s_ease-out]'),
  createAnimationEntry('slide-in-up', 'Slide In Up', 'Slide in from below', ['translate', 'enter', 'modal'], 'animate-[slideInUp_0.3s_ease-out]'),
  createAnimationEntry('slide-in-down', 'Slide In Down', 'Slide in from above', ['translate', 'enter', 'dropdown'], 'animate-[slideInDown_0.3s_ease-out]'),

  // Effects
  createAnimationEntry('ripple', 'Ripple', 'Expanding ripple effect for clicks', ['effect', 'click', 'water'], 'animate-[ripple_0.6s_ease-out]'),
  createAnimationEntry('wave', 'Wave', 'Horizontal wave motion', ['effect', 'liquid', 'water'], 'animate-[wave_3s_linear_infinite]'),
  createAnimationEntry('tremor', 'Tremor', 'Subtle shaking/vibration', ['effect', 'shake', 'error'], 'animate-[tremor_0.2s_infinite]'),
  createAnimationEntry('meteor', 'Meteor', 'Diagonal falling meteor trail', ['effect', 'space', 'cosmic'], 'animate-[meteor_2s_linear_infinite]'),
  createAnimationEntry('fall', 'Fall', 'Vertical falling animation', ['effect', 'rain', 'gravity'], 'animate-[fall_1s_linear_infinite]'),

  // SVG stroke
  createAnimationEntry('dash', 'Dash', 'Animated dashed stroke', ['svg', 'stroke', 'circuit'], 'animate-[dash_2s_linear_infinite]'),
  createAnimationEntry('draw', 'Draw', 'SVG path drawing effect', ['svg', 'stroke', 'sketch'], 'animate-[draw_1s_ease-out]'),

  // Particle
  createAnimationEntry('vector', 'Vector', 'Particle burst direction', ['particle', 'burst', 'explosion'], 'animate-[vector_0.8s_linear_infinite]'),

  // Retro
  createAnimationEntry('vcr', 'VCR Scan', 'VCR tracking line effect', ['retro', 'distortion', 'scanline'], 'animate-[vcr_0.15s_linear_infinite]'),

  // Transitions
  createAnimationEntry('transition-all', 'Transition All', 'Smooth transition for all properties', ['transition', 'smooth', 'general'], 'transition-all duration-300 ease-in-out'),
  createAnimationEntry('transition-colors', 'Transition Colors', 'Smooth color transitions', ['transition', 'color', 'hover'], 'transition-colors duration-200 ease-in-out'),
  createAnimationEntry('transition-opacity', 'Transition Opacity', 'Smooth opacity transitions', ['transition', 'fade', 'visibility'], 'transition-opacity duration-200 ease-in-out'),
  createAnimationEntry('transition-transform', 'Transition Transform', 'Smooth transform transitions', ['transition', 'scale', 'rotate'], 'transition-transform duration-200 ease-out'),
  createAnimationEntry('transition-shadow', 'Transition Shadow', 'Smooth shadow transitions', ['transition', 'elevation', 'hover'], 'transition-shadow duration-200 ease-in-out'),

  // Easing
  createAnimationEntry('ease-bouncy', 'Easing Bouncy', 'Bouncy overshoot easing', ['easing', 'playful', 'elastic'], '[transition-timing-function:cubic-bezier(0.68,-0.55,0.27,1.55)]'),
  createAnimationEntry('ease-elastic', 'Easing Elastic', 'Elastic spring easing', ['easing', 'spring', 'natural'], '[transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]'),

  // Hooks (documentation entries)
  {
    id: 'hook-game-loop',
    name: 'useGameLoop',
    layer: 'atom',
    category: 'animations',
    description: 'RequestAnimationFrame-based game loop hook with delta time',
    themeAgnostic: true,
    sourceComponents: ['cosmic-components', 'physics-components'],
    extractedFrom: 'src/library/shared/hooks.ts',
    previewType: 'inline',
    hasInteraction: false,
    implementation: 'hook',
    codeSnippet: 'useGameLoop((dt) => { /* update at 60fps */ }, isActive)',
    tags: ['animation', 'hook', 'physics', 'game', 'loop', 'raf'],
  },
  {
    id: 'hook-reduced-motion',
    name: 'useReducedMotion',
    layer: 'atom',
    category: 'animations',
    description: 'Detect user preference for reduced motion (accessibility)',
    themeAgnostic: true,
    sourceComponents: ['accessibility'],
    extractedFrom: 'src/library/shared/hooks.ts',
    previewType: 'inline',
    hasInteraction: false,
    implementation: 'hook',
    codeSnippet: 'const prefersReduced = useReducedMotion()',
    tags: ['animation', 'hook', 'accessibility', 'a11y', 'motion'],
  },
  {
    id: 'hook-interval',
    name: 'useInterval',
    layer: 'atom',
    category: 'animations',
    description: 'SetInterval hook with proper cleanup',
    themeAgnostic: true,
    sourceComponents: ['timers', 'polling'],
    extractedFrom: 'src/library/shared/hooks.ts',
    previewType: 'inline',
    hasInteraction: false,
    implementation: 'hook',
    codeSnippet: 'useInterval(() => { /* tick */ }, 1000)',
    tags: ['animation', 'hook', 'timer', 'interval', 'polling'],
  },
  {
    id: 'hook-mouse-position',
    name: 'useMousePosition',
    layer: 'atom',
    category: 'animations',
    description: 'Track mouse position globally',
    themeAgnostic: true,
    sourceComponents: ['spotlight', 'parallax'],
    extractedFrom: 'src/library/shared/hooks.ts',
    previewType: 'inline',
    hasInteraction: false,
    implementation: 'hook',
    codeSnippet: 'const mouseRef = useMousePosition() // { x, y }',
    tags: ['animation', 'hook', 'mouse', 'position', 'tracking'],
  },
];
