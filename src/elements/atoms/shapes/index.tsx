// Atom: Shapes
// SVG shapes, geometric forms, and clip paths
// Shape system for the design system

import React from 'react';
import { ElementEntry } from '../../registry';

// ============================================
// CLIP PATHS
// ============================================

export const clipPaths = {
  circle: 'clip-path-[circle(50%)]',
  ellipse: 'clip-path-[ellipse(50%_40%)]',
  triangle: 'clip-path-[polygon(50%_0%,100%_100%,0%_100%)]',
  triangleDown: 'clip-path-[polygon(0%_0%,100%_0%,50%_100%)]',
  diamond: 'clip-path-[polygon(50%_0%,100%_50%,50%_100%,0%_50%)]',
  pentagon: 'clip-path-[polygon(50%_0%,100%_38%,82%_100%,18%_100%,0%_38%)]',
  hexagon: 'clip-path-[polygon(25%_0%,75%_0%,100%_50%,75%_100%,25%_100%,0%_50%)]',
  octagon: 'clip-path-[polygon(30%_0%,70%_0%,100%_30%,100%_70%,70%_100%,30%_100%,0%_70%,0%_30%)]',
  star: 'clip-path-[polygon(50%_0%,61%_35%,98%_35%,68%_57%,79%_91%,50%_70%,21%_91%,32%_57%,2%_35%,39%_35%)]',
  cross: 'clip-path-[polygon(33%_0%,67%_0%,67%_33%,100%_33%,100%_67%,67%_67%,67%_100%,33%_100%,33%_67%,0%_67%,0%_33%,33%_33%)]',
  arrow: 'clip-path-[polygon(0%_40%,60%_40%,60%_0%,100%_50%,60%_100%,60%_60%,0%_60%)]',
  chevron: 'clip-path-[polygon(0%_0%,75%_0%,100%_50%,75%_100%,0%_100%,25%_50%)]',
};

// ============================================
// SVG SHAPE COMPONENTS
// ============================================

export const Circle: React.FC<{ size?: number; className?: string }> = ({
  size = 100,
  className = '',
}) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
    <circle cx="50" cy="50" r="45" fill="currentColor" />
  </svg>
);

export const Square: React.FC<{ size?: number; className?: string }> = ({
  size = 100,
  className = '',
}) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
    <rect x="10" y="10" width="80" height="80" fill="currentColor" />
  </svg>
);

export const Triangle: React.FC<{ size?: number; className?: string }> = ({
  size = 100,
  className = '',
}) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
    <polygon points="50,10 90,90 10,90" fill="currentColor" />
  </svg>
);

export const Diamond: React.FC<{ size?: number; className?: string }> = ({
  size = 100,
  className = '',
}) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
    <polygon points="50,5 95,50 50,95 5,50" fill="currentColor" />
  </svg>
);

export const Hexagon: React.FC<{ size?: number; className?: string }> = ({
  size = 100,
  className = '',
}) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
    <polygon points="25,10 75,10 95,50 75,90 25,90 5,50" fill="currentColor" />
  </svg>
);

export const Star: React.FC<{ size?: number; points?: number; className?: string }> = ({
  size = 100,
  points = 5,
  className = '',
}) => {
  const generateStarPath = (pts: number) => {
    const outerR = 45;
    const innerR = 20;
    const center = 50;
    const pathPoints = [];

    for (let i = 0; i < pts * 2; i++) {
      const r = i % 2 === 0 ? outerR : innerR;
      const angle = (Math.PI * i) / pts - Math.PI / 2;
      pathPoints.push(`${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`);
    }
    return pathPoints.join(' ');
  };

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
      <polygon points={generateStarPath(points)} fill="currentColor" />
    </svg>
  );
};

export const Cross: React.FC<{ size?: number; className?: string }> = ({
  size = 100,
  className = '',
}) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
    <path d="M35,10 L65,10 L65,35 L90,35 L90,65 L65,65 L65,90 L35,90 L35,65 L10,65 L10,35 L35,35 Z" fill="currentColor" />
  </svg>
);

export const Arrow: React.FC<{ size?: number; direction?: 'up' | 'down' | 'left' | 'right'; className?: string }> = ({
  size = 100,
  direction = 'right',
  className = '',
}) => {
  const rotations = { up: -90, down: 90, left: 180, right: 0 };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      style={{ transform: `rotate(${rotations[direction]}deg)` }}
    >
      <polygon points="10,40 60,40 60,20 90,50 60,80 60,60 10,60" fill="currentColor" />
    </svg>
  );
};

export const Ring: React.FC<{ size?: number; thickness?: number; className?: string }> = ({
  size = 100,
  thickness = 10,
  className = '',
}) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
    <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth={thickness} />
  </svg>
);

// ============================================
// DECORATIVE SHAPES
// ============================================

export const Burst: React.FC<{ size?: number; rays?: number; className?: string }> = ({
  size = 100,
  rays = 12,
  className = '',
}) => {
  const generateBurstPath = () => {
    const outerR = 45;
    const innerR = 25;
    const center = 50;
    const pathPoints = [];

    for (let i = 0; i < rays * 2; i++) {
      const r = i % 2 === 0 ? outerR : innerR;
      const angle = (Math.PI * i) / rays;
      pathPoints.push(`${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`);
    }
    return pathPoints.join(' ');
  };

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
      <polygon points={generateBurstPath()} fill="currentColor" />
    </svg>
  );
};

export const Blob: React.FC<{ size?: number; className?: string }> = ({
  size = 100,
  className = '',
}) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
    <path
      d="M50,10 C70,10 85,25 90,45 C95,65 85,85 65,90 C45,95 25,85 15,65 C5,45 15,20 35,12 C40,10 45,10 50,10 Z"
      fill="currentColor"
    />
  </svg>
);

// ============================================
// REGISTRY ENTRIES
// ============================================

const createShapeEntry = (
  id: string,
  name: string,
  description: string,
  tags: string[],
  cssClass: string,
  component?: React.FC<any>
): ElementEntry => ({
  id: `shape-${id}`,
  name,
  layer: 'atom',
  category: 'shapes',
  description,
  themeAgnostic: true,
  sourceComponents: ['multiple-zones'],
  extractedFrom: 'src/elements/atoms/shapes/index.ts',
  previewType: 'inline',
  hasInteraction: false,
  implementation: component ? 'component' : 'css-class',
  component,
  cssClass: component ? undefined : cssClass,
  codeSnippet: component
    ? `<${name.replace(/\s/g, '')} size={100} className="text-white" />`
    : `<div className="${cssClass}">...</div>`,
  tags: ['shape', ...tags],
});

export const shapeRegistry: ElementEntry[] = [
  // Clip paths
  createShapeEntry('clip-circle', 'Circle Clip', 'Circular clip path', ['clip-path', 'circle', 'round'], clipPaths.circle),
  createShapeEntry('clip-triangle', 'Triangle Clip', 'Triangle clip path', ['clip-path', 'triangle', 'polygon'], clipPaths.triangle),
  createShapeEntry('clip-diamond', 'Diamond Clip', 'Diamond clip path', ['clip-path', 'diamond', 'polygon'], clipPaths.diamond),
  createShapeEntry('clip-hexagon', 'Hexagon Clip', 'Hexagonal clip path', ['clip-path', 'hexagon', 'polygon'], clipPaths.hexagon),
  createShapeEntry('clip-star', 'Star Clip', '5-point star clip path', ['clip-path', 'star', 'polygon'], clipPaths.star),
  createShapeEntry('clip-cross', 'Cross Clip', 'Cross/plus clip path', ['clip-path', 'cross', 'plus', 'polygon'], clipPaths.cross),
  createShapeEntry('clip-arrow', 'Arrow Clip', 'Arrow clip path', ['clip-path', 'arrow', 'polygon'], clipPaths.arrow),
  createShapeEntry('clip-chevron', 'Chevron Clip', 'Chevron clip path', ['clip-path', 'chevron', 'polygon'], clipPaths.chevron),
  createShapeEntry('clip-octagon', 'Octagon Clip', 'Octagonal clip path', ['clip-path', 'octagon', 'polygon'], clipPaths.octagon),

  // SVG Components
  createShapeEntry('svg-circle', 'Circle', 'SVG circle shape', ['svg', 'circle', 'round'], '', Circle),
  createShapeEntry('svg-square', 'Square', 'SVG square shape', ['svg', 'square', 'rectangle'], '', Square),
  createShapeEntry('svg-triangle', 'Triangle', 'SVG triangle shape', ['svg', 'triangle', 'polygon'], '', Triangle),
  createShapeEntry('svg-diamond', 'Diamond', 'SVG diamond shape', ['svg', 'diamond', 'polygon'], '', Diamond),
  createShapeEntry('svg-hexagon', 'Hexagon', 'SVG hexagon shape', ['svg', 'hexagon', 'polygon'], '', Hexagon),
  createShapeEntry('svg-star', 'Star', 'SVG star shape', ['svg', 'star', 'polygon'], '', Star),
  createShapeEntry('svg-cross', 'Cross', 'SVG cross/plus shape', ['svg', 'cross', 'plus'], '', Cross),
  createShapeEntry('svg-arrow', 'Arrow', 'SVG arrow shape', ['svg', 'arrow', 'direction'], '', Arrow),
  createShapeEntry('svg-ring', 'Ring', 'SVG ring/donut shape', ['svg', 'ring', 'donut', 'circle'], '', Ring),

  // Decorative shapes
  createShapeEntry('svg-burst', 'Burst', 'Starburst/sunburst shape', ['svg', 'burst', 'sun', 'decorative'], '', Burst),
  createShapeEntry('svg-blob', 'Blob', 'Organic blob shape', ['svg', 'blob', 'organic', 'fluid'], '', Blob),
];
