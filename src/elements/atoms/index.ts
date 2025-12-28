// Atoms - Layer 1: Pure UI Primitives
// Smallest indivisible units with no local component imports

// Re-export registries (no conflicts)
export { backgroundRegistry } from './backgrounds';
export { borderRegistry } from './borders';
export { shadowRegistry } from './shadows';
export { typographyRegistry } from './typography';
export { shapeRegistry } from './shapes';
export { iconRegistry } from './icons';
export { animationRegistry } from './animations';
export { colorRegistry } from './colors';
export { filterRegistry } from './filters';
export { surfaceRegistry } from './surfaces';

// Re-export tokens/utilities from each category
export * from './backgrounds';
export * from './borders';
export * from './shadows';
export * from './typography';
export * from './animations';
export * from './colors';
export * from './filters';
export * from './surfaces';

// Shapes and Icons have naming conflicts (Square, Star) - export with namespaces
export {
  clipPaths,
  Circle as ShapeCircle,
  Square as ShapeSquare,
  Triangle as ShapeTriangle,
  Diamond as ShapeDiamond,
  Hexagon as ShapeHexagon,
  Star as ShapeStar,
  Cross as ShapeCross,
  Arrow as ShapeArrow,
  Ring as ShapeRing,
  Burst as ShapeBurst,
  Blob as ShapeBlob,
} from './shapes';

export * from './icons';
