/**
 * Zone Backgrounds Index
 *
 * Centralized registry of zone-specific background effects.
 * Replaces hardcoded conditionals in App.tsx with a scalable lookup system.
 */

import React from 'react';

// ============================================================================
// TYPES
// ============================================================================

export interface ZoneBackgroundConfig {
  id: string;
  component: React.FC;
  description: string;
}

// ============================================================================
// INDIVIDUAL BACKGROUNDS
// ============================================================================

export const ArcadeBackground: React.FC = () => (
  <>
    {/* Scanlines */}
    <div className="absolute inset-0 scanlines opacity-30" />
    {/* CRT vignette */}
    <div
      className="absolute inset-0"
      style={{
        background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.6) 100%)'
      }}
    />
    {/* Pixel dust particles */}
    <div className="absolute inset-0">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-green-500 opacity-60 animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${4 + Math.random() * 4}s`,
          }}
        />
      ))}
    </div>
  </>
);

export const HackerBackground: React.FC = () => (
  <>
    {/* Grid lines */}
    <div
      className="absolute inset-0 opacity-10"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0, 255, 0, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 255, 0, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px'
      }}
    />
    {/* Matrix rain columns */}
    <div className="absolute inset-0 overflow-hidden opacity-20">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute top-0 w-4 text-green-500 font-mono text-xs animate-matrix"
          style={{
            left: `${i * 5}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${10 + Math.random() * 10}s`,
          }}
        >
          {[...Array(50)].map((_, j) => (
            <div key={j} style={{ opacity: Math.random() }}>
              {String.fromCharCode(0x30A0 + Math.random() * 96)}
            </div>
          ))}
        </div>
      ))}
    </div>
    {/* Scanline flicker */}
    <div className="absolute inset-0 bg-green-500 opacity-[0.02] animate-flicker" />
  </>
);

export const CosmicBackground: React.FC = () => (
  <>
    {/* Deep space gradient */}
    <div
      className="absolute inset-0"
      style={{
        background: 'radial-gradient(ellipse at 30% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)'
      }}
    />
    {/* Stars */}
    <div className="absolute inset-0">
      {[...Array(100)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white animate-pulse-slow"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${1 + Math.random() * 2}px`,
            height: `${1 + Math.random() * 2}px`,
            opacity: 0.3 + Math.random() * 0.7,
            animationDelay: `${Math.random() * 4}s`,
          }}
        />
      ))}
    </div>
    {/* Nebula glow */}
    <div
      className="absolute inset-0 animate-drift"
      style={{
        background: 'radial-gradient(circle at 50% 50%, rgba(0, 210, 255, 0.05) 0%, transparent 40%)'
      }}
    />
  </>
);

export const PulpBackground: React.FC = () => (
  <>
    {/* Sepia paper texture */}
    <div className="absolute inset-0 paper-texture" />
    {/* Halftone dots */}
    <div className="absolute inset-0 halftone text-amber-900 opacity-5" />
    {/* Vignette */}
    <div
      className="absolute inset-0"
      style={{
        background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.4) 100%)'
      }}
    />
    {/* Dust particles */}
    <div className="absolute inset-0">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-0.5 h-0.5 bg-amber-200 rounded-full opacity-30 animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${8 + Math.random() * 8}s`,
          }}
        />
      ))}
    </div>
  </>
);

export const ScienceBackground: React.FC = () => (
  <>
    {/* Laboratory tile pattern */}
    <div
      className="absolute inset-0 opacity-5"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px'
      }}
    />
    {/* Bubbles */}
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full border border-cyan-500 opacity-20 animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: `-${Math.random() * 20}%`,
            width: `${10 + Math.random() * 30}px`,
            height: `${10 + Math.random() * 30}px`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${6 + Math.random() * 6}s`,
          }}
        />
      ))}
    </div>
    {/* Chemical gradient glow */}
    <div
      className="absolute inset-0"
      style={{
        background: 'linear-gradient(135deg, rgba(0, 255, 200, 0.05) 0%, transparent 50%, rgba(255, 0, 128, 0.05) 100%)'
      }}
    />
  </>
);

export const OrganicBackground: React.FC = () => (
  <>
    {/* Warm earth gradient */}
    <div
      className="absolute inset-0"
      style={{
        background: 'linear-gradient(180deg, rgba(132, 117, 78, 0.1) 0%, rgba(67, 56, 37, 0.2) 100%)'
      }}
    />
    {/* Floating seeds/spores */}
    <div className="absolute inset-0">
      {[...Array(25)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-2 bg-lime-200 opacity-20 rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${10 + Math.random() * 10}s`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}
    </div>
    {/* Soft vignette */}
    <div
      className="absolute inset-0"
      style={{
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(34, 28, 18, 0.3) 100%)'
      }}
    />
  </>
);

export const PhysicsBackground: React.FC = () => (
  <>
    {/* Clean gradient */}
    <div
      className="absolute inset-0"
      style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)'
      }}
    />
    {/* Subtle grid */}
    <div
      className="absolute inset-0 opacity-5"
      style={{
        backgroundImage: `
          linear-gradient(rgba(99, 102, 241, 0.5) 1px, transparent 1px),
          linear-gradient(90deg, rgba(99, 102, 241, 0.5) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px'
      }}
    />
  </>
);

export const RetroBackground: React.FC = () => (
  <>
    {/* Beige base */}
    <div className="absolute inset-0 bg-[#d4c5a9]" />
    {/* Subtle pattern */}
    <div
      className="absolute inset-0 opacity-10"
      style={{
        backgroundImage: `radial-gradient(circle, #8b7355 1px, transparent 1px)`,
        backgroundSize: '20px 20px'
      }}
    />
    {/* Warm vignette */}
    <div
      className="absolute inset-0"
      style={{
        background: 'radial-gradient(ellipse at center, transparent 30%, rgba(139, 115, 85, 0.2) 100%)'
      }}
    />
  </>
);

export const CinemaBackground: React.FC = () => (
  <>
    {/* Deep red velvet base */}
    <div
      className="absolute inset-0"
      style={{
        background: 'linear-gradient(180deg, #1a0a0a 0%, #2d0a0a 50%, #1a0505 100%)'
      }}
    />
    {/* Curtain texture */}
    <div
      className="absolute inset-0 opacity-10"
      style={{
        backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(255,255,255,0.03) 20px, rgba(255,255,255,0.03) 40px)`
      }}
    />
    {/* Spotlight */}
    <div
      className="absolute inset-0"
      style={{
        background: 'radial-gradient(ellipse at 50% 0%, rgba(255, 200, 100, 0.1) 0%, transparent 50%)'
      }}
    />
    {/* Dust in spotlight */}
    <div className="absolute inset-0">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute w-0.5 h-0.5 bg-amber-100 rounded-full opacity-30 animate-float"
          style={{
            left: `${30 + Math.random() * 40}%`,
            top: `${Math.random() * 50}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  </>
);

export const GeometryBackground: React.FC = () => (
  <>
    {/* Clean white/light base */}
    <div className="absolute inset-0 bg-[#f8f9fa]" />
    {/* Blueprint grid */}
    <div className="absolute inset-0 blueprint-grid" />
    {/* Geometric accents */}
    <svg className="absolute inset-0 w-full h-full opacity-5" preserveAspectRatio="none">
      <pattern id="geo-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
        <polygon points="50,0 100,50 50,100 0,50" fill="none" stroke="#3b82f6" strokeWidth="0.5"/>
      </pattern>
      <rect width="100%" height="100%" fill="url(#geo-pattern)" />
    </svg>
  </>
);

export const ArtistBackground: React.FC = () => (
  <>
    {/* Cream paper */}
    <div className="absolute inset-0 bg-[#faf8f0]" />
    {/* Ruled lines */}
    <div
      className="absolute inset-0 opacity-10"
      style={{
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 27px, #94a3b8 28px)`,
      }}
    />
    {/* Ink splatters */}
    <div className="absolute inset-0">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full opacity-5"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${20 + Math.random() * 60}px`,
            height: `${20 + Math.random() * 60}px`,
            background: ['#ec4899', '#8b5cf6', '#3b82f6', '#10b981'][Math.floor(Math.random() * 4)],
            transform: `scale(${0.5 + Math.random()}, ${0.5 + Math.random()})`,
          }}
        />
      ))}
    </div>
  </>
);

// ============================================================================
// NEW ZONE BACKGROUNDS
// ============================================================================

export const UnderwaterBackground: React.FC = () => (
  <>
    {/* Deep ocean gradient */}
    <div
      className="absolute inset-0"
      style={{
        background: 'linear-gradient(180deg, #021a2d 0%, #033d5e 30%, #011627 100%)'
      }}
    />
    {/* Caustic light rays */}
    <div className="absolute inset-0 overflow-hidden opacity-10">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-cyan-400 animate-pulse-slow"
          style={{
            left: `${10 + i * 20}%`,
            top: 0,
            width: '100px',
            height: '100%',
            background: 'linear-gradient(180deg, rgba(0, 229, 255, 0.3) 0%, transparent 60%)',
            transform: `skewX(${-15 + Math.random() * 30}deg)`,
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}
    </div>
    {/* Floating bubbles */}
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full border border-cyan-300 opacity-30 animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: `-${Math.random() * 10}%`,
            width: `${5 + Math.random() * 15}px`,
            height: `${5 + Math.random() * 15}px`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${8 + Math.random() * 8}s`,
          }}
        />
      ))}
    </div>
    {/* Bioluminescent particles */}
    <div className="absolute inset-0">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-cyan-400 animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            opacity: 0.4 + Math.random() * 0.4,
            boxShadow: '0 0 10px rgba(0, 229, 255, 0.8)',
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}
    </div>
  </>
);

export const SteampunkBackground: React.FC = () => (
  <>
    {/* Warm industrial base */}
    <div
      className="absolute inset-0"
      style={{
        background: 'linear-gradient(135deg, #1a1208 0%, #2d1f0d 50%, #0f0a04 100%)'
      }}
    />
    {/* Gear pattern overlay */}
    <div
      className="absolute inset-0 opacity-5"
      style={{
        backgroundImage: `radial-gradient(circle, #cd7f32 2px, transparent 2px)`,
        backgroundSize: '40px 40px'
      }}
    />
    {/* Floating gears */}
    <div className="absolute inset-0">
      {[...Array(6)].map((_, i) => (
        <svg
          key={i}
          className="absolute opacity-10"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${60 + Math.random() * 80}px`,
            height: `${60 + Math.random() * 80}px`,
            animation: `spin ${20 + Math.random() * 20}s linear infinite`,
            animationDirection: i % 2 === 0 ? 'normal' : 'reverse',
          }}
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="30" fill="none" stroke="#cd7f32" strokeWidth="4"/>
          <circle cx="50" cy="50" r="10" fill="#cd7f32"/>
          {[...Array(8)].map((_, j) => (
            <rect
              key={j}
              x="46"
              y="15"
              width="8"
              height="15"
              fill="#cd7f32"
              transform={`rotate(${j * 45} 50 50)`}
            />
          ))}
        </svg>
      ))}
    </div>
    {/* Steam wisps */}
    <div className="absolute inset-0 overflow-hidden opacity-20">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="absolute w-32 h-64 animate-float"
          style={{
            left: `${i * 25}%`,
            bottom: '-20%',
            background: 'linear-gradient(180deg, rgba(205, 127, 50, 0.2) 0%, transparent 100%)',
            filter: 'blur(20px)',
            animationDelay: `${i * 2}s`,
            animationDuration: `${10 + Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  </>
);

export const CyberpunkBackground: React.FC = () => (
  <>
    {/* Dark neon base */}
    <div
      className="absolute inset-0"
      style={{
        background: 'linear-gradient(180deg, #0d0d1a 0%, #1a0a2e 50%, #0a0a14 100%)'
      }}
    />
    {/* Grid lines */}
    <div
      className="absolute inset-0 opacity-10"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255, 0, 255, 0.3) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 0, 255, 0.3) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        perspective: '500px',
        transform: 'rotateX(60deg)',
        transformOrigin: 'center top',
      }}
    />
    {/* Neon rain */}
    <div className="absolute inset-0 overflow-hidden opacity-30">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute w-0.5 bg-gradient-to-b from-pink-500 to-transparent animate-matrix"
          style={{
            left: `${Math.random() * 100}%`,
            height: `${50 + Math.random() * 100}px`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
          }}
        />
      ))}
    </div>
    {/* Holographic glitch bars */}
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="absolute w-full h-1 opacity-20 animate-glitch"
          style={{
            top: `${Math.random() * 100}%`,
            background: 'linear-gradient(90deg, transparent, #ff00ff, #00ffff, transparent)',
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
    {/* Neon glow accents */}
    <div
      className="absolute inset-0"
      style={{
        background: 'radial-gradient(ellipse at 20% 80%, rgba(255, 0, 255, 0.15) 0%, transparent 40%), radial-gradient(ellipse at 80% 20%, rgba(0, 255, 255, 0.15) 0%, transparent 40%)'
      }}
    />
  </>
);

export const MedievalBackground: React.FC = () => (
  <>
    {/* Parchment base */}
    <div
      className="absolute inset-0"
      style={{
        background: 'linear-gradient(180deg, #2d2418 0%, #3d3020 50%, #1a1408 100%)'
      }}
    />
    {/* Vellum texture */}
    <div className="absolute inset-0 paper-texture opacity-20" />
    {/* Candlelight glow */}
    <div className="absolute inset-0">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-pulse"
          style={{
            left: `${15 + i * 25}%`,
            top: '10%',
            width: '150px',
            height: '200px',
            background: 'radial-gradient(ellipse at center, rgba(201, 162, 39, 0.3) 0%, transparent 70%)',
            animationDelay: `${i * 0.3}s`,
            animationDuration: '3s',
          }}
        />
      ))}
    </div>
    {/* Illuminated border pattern */}
    <div
      className="absolute inset-0 opacity-5"
      style={{
        backgroundImage: `
          repeating-linear-gradient(0deg, #c9a227 0px, #c9a227 2px, transparent 2px, transparent 20px),
          repeating-linear-gradient(90deg, #c9a227 0px, #c9a227 2px, transparent 2px, transparent 20px)
        `,
      }}
    />
    {/* Gold dust particles */}
    <div className="absolute inset-0">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-yellow-500 animate-float opacity-40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${6 + Math.random() * 4}s`,
          }}
        />
      ))}
    </div>
  </>
);

export const SpaceStationBackground: React.FC = () => (
  <>
    {/* Deep space */}
    <div
      className="absolute inset-0"
      style={{
        background: 'radial-gradient(ellipse at 50% 100%, #1a1a3e 0%, #0a0a14 50%, #050510 100%)'
      }}
    />
    {/* Star field */}
    <div className="absolute inset-0">
      {[...Array(80)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${1 + Math.random() * 2}px`,
            height: `${1 + Math.random() * 2}px`,
            opacity: 0.2 + Math.random() * 0.6,
          }}
        />
      ))}
    </div>
    {/* Earth glow (from below) */}
    <div
      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200%] h-1/3"
      style={{
        background: 'radial-gradient(ellipse at 50% 100%, rgba(59, 130, 246, 0.2) 0%, transparent 60%)',
      }}
    />
    {/* Station lighting strips */}
    <div className="absolute inset-0 overflow-hidden opacity-10">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute h-px bg-gradient-to-r from-transparent via-green-400 to-transparent"
          style={{
            top: `${20 + i * 15}%`,
            left: 0,
            right: 0,
          }}
        />
      ))}
    </div>
    {/* Floating debris/satellites */}
    <div className="absolute inset-0">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-gray-400 opacity-30 animate-drift"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 60}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${30 + Math.random() * 20}s`,
          }}
        />
      ))}
    </div>
  </>
);

// ============================================================================
// BACKGROUND REGISTRY
// ============================================================================

export const zoneBackgroundRegistry: Record<string, React.FC> = {
  'arcade-basement': ArcadeBackground,
  'hacker-terminal': HackerBackground,
  'cosmic-observatory': CosmicBackground,
  'pulp-detective': PulpBackground,
  'mad-science': ScienceBackground,
  'organic-garden': OrganicBackground,
  'physics-playground': PhysicsBackground,
  'retro-office': RetroBackground,
  'cinema-stage': CinemaBackground,
  'geometry-lab': GeometryBackground,
  'artist-studio': ArtistBackground,
  // New zones
  'underwater-depths': UnderwaterBackground,
  'steampunk-workshop': SteampunkBackground,
  'cyberpunk-district': CyberpunkBackground,
  'medieval-scriptorium': MedievalBackground,
  'space-station': SpaceStationBackground,
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get background component for a zone
 */
export function getZoneBackground(zoneId: string): React.FC | null {
  return zoneBackgroundRegistry[zoneId] || null;
}

/**
 * Check if a zone has a custom background
 */
export function hasZoneBackground(zoneId: string): boolean {
  return zoneId in zoneBackgroundRegistry;
}

/**
 * Get all zone IDs with custom backgrounds
 */
export function getZonesWithBackgrounds(): string[] {
  return Object.keys(zoneBackgroundRegistry);
}

// ============================================================================
// DYNAMIC ZONE BACKGROUND COMPONENT
// ============================================================================

interface DynamicZoneBackgroundProps {
  zoneId: string;
}

/**
 * Dynamic background renderer that uses the registry lookup
 */
export const DynamicZoneBackground: React.FC<DynamicZoneBackgroundProps> = ({ zoneId }) => {
  const BackgroundComponent = getZoneBackground(zoneId);

  if (!BackgroundComponent) {
    return null;
  }

  return <BackgroundComponent />;
};

export default zoneBackgroundRegistry;
