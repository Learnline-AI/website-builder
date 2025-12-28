import React, { useState, useEffect, useRef } from 'react';
import { useGameLoop } from '../shared/hooks';

// --- STAR FIELD ---
export const StarField = () => {
  const [stars, setStars] = useState<{ x: number; y: number; size: number; opacity: number }[]>([]);

  useEffect(() => {
    const newStars = [...Array(50)].map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.5
    }));
    setStars(newStars);
  }, []);

  useGameLoop((dt) => {
    setStars(prev => prev.map(star => ({
      ...star,
      opacity: 0.3 + Math.sin(Date.now() * 0.005 + star.x) * 0.4
    })));
  }, true);

  return (
    <div className="h-full bg-black relative overflow-hidden">
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            opacity: star.opacity
          }}
        />
      ))}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-white/50 font-mono text-xs">DEEP SPACE</span>
      </div>
    </div>
  );
};

// --- PLANET ORBIT ---
export const PlanetOrbit = () => {
  const [angle, setAngle] = useState(0);

  useGameLoop((dt) => {
    setAngle(a => (a + dt * 0.05) % 360);
  }, true);

  return (
    <div className="h-full bg-zinc-900 flex items-center justify-center">
      <div className="relative w-48 h-48">
        {/* Sun */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-br from-yellow-300 to-orange-500 rounded-full shadow-[0_0_30px_rgba(255,200,0,0.5)]" />
        {/* Orbit path */}
        <div className="absolute inset-0 border-2 border-dashed border-zinc-700 rounded-full" />
        {/* Planet */}
        <div
          className="absolute w-6 h-6"
          style={{
            left: `calc(50% + ${Math.cos(angle * Math.PI / 180) * 80}px - 12px)`,
            top: `calc(50% + ${Math.sin(angle * Math.PI / 180) * 80}px - 12px)`
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-lg" />
        </div>
      </div>
    </div>
  );
};

// --- NEBULA GRADIENT ---
export const NebulaGradient = () => {
  const [hue, setHue] = useState(0);

  useGameLoop((dt) => {
    setHue(h => (h + dt * 0.02) % 360);
  }, true);

  return (
    <div
      className="h-full relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg,
          hsl(${hue}, 70%, 20%) 0%,
          hsl(${(hue + 60) % 360}, 60%, 30%) 50%,
          hsl(${(hue + 120) % 360}, 80%, 15%) 100%)`
      }}
    >
      {/* Stars overlay */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(2px 2px at 20px 30px, white, transparent), radial-gradient(2px 2px at 40px 70px, white, transparent), radial-gradient(1px 1px at 90px 40px, white, transparent)',
        backgroundRepeat: 'repeat',
        backgroundSize: '100px 100px',
        opacity: 0.5
      }} />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-white/70 font-serif text-lg tracking-widest">NEBULA</span>
      </div>
    </div>
  );
};

// --- CONSTELLATION MAP ---
export const ConstellationMap = () => {
  const stars = [
    { x: 20, y: 30 }, { x: 35, y: 25 }, { x: 50, y: 40 },
    { x: 65, y: 35 }, { x: 80, y: 50 }, { x: 60, y: 60 },
    { x: 40, y: 70 }
  ];

  return (
    <div className="h-full bg-indigo-950 relative overflow-hidden">
      <svg className="absolute inset-0 w-full h-full">
        {/* Connection lines */}
        {stars.map((star, i) => {
          if (i === 0) return null;
          const prev = stars[i - 1];
          return (
            <line
              key={i}
              x1={`${prev.x}%`} y1={`${prev.y}%`}
              x2={`${star.x}%`} y2={`${star.y}%`}
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="1"
            />
          );
        })}
      </svg>
      {/* Stars */}
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute w-3 h-3 bg-white rounded-full animate-pulse"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            transform: 'translate(-50%, -50%)',
            animationDelay: `${i * 0.2}s`
          }}
        />
      ))}
      <span className="absolute bottom-4 left-4 text-indigo-300 font-mono text-xs">URSA MAJOR</span>
    </div>
  );
};

// --- BLACK HOLE ---
export const BlackHole = () => {
  const [rotation, setRotation] = useState(0);

  useGameLoop((dt) => {
    setRotation(r => r + dt * 0.1);
  }, true);

  return (
    <div className="h-full bg-black flex items-center justify-center overflow-hidden">
      <div className="relative w-40 h-40">
        {/* Accretion disk */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'conic-gradient(from 0deg, transparent, #ff6600, #ff0066, transparent)',
            transform: `rotate(${rotation}deg)`,
            filter: 'blur(4px)'
          }}
        />
        {/* Event horizon */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-black rounded-full shadow-[0_0_40px_20px_rgba(0,0,0,0.8)]" />
        {/* Light bending effect */}
        <div className="absolute inset-0 rounded-full border-4 border-orange-500/30" />
      </div>
    </div>
  );
};

// --- METEOR SHOWER ---
export const MeteorShower = () => {
  const [meteors, setMeteors] = useState<{ id: number; x: number; delay: number }[]>([]);

  useEffect(() => {
    const newMeteors = [...Array(5)].map((_, i) => ({
      id: i,
      x: Math.random() * 80,
      delay: Math.random() * 3
    }));
    setMeteors(newMeteors);
  }, []);

  return (
    <div className="h-full bg-zinc-900 relative overflow-hidden">
      {/* Background stars */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, opacity: Math.random() }}
        />
      ))}
      {/* Meteors */}
      {meteors.map(meteor => (
        <div
          key={meteor.id}
          className="absolute w-20 h-0.5 bg-gradient-to-r from-transparent via-white to-yellow-200 animate-meteor"
          style={{
            left: `${meteor.x}%`,
            top: '-10%',
            transform: 'rotate(45deg)',
            animationDelay: `${meteor.delay}s`
          }}
        />
      ))}
      <style>{`
        @keyframes meteor {
          0% { transform: translateX(0) translateY(0) rotate(45deg); opacity: 1; }
          100% { transform: translateX(200px) translateY(200px) rotate(45deg); opacity: 0; }
        }
        .animate-meteor { animation: meteor 2s linear infinite; }
      `}</style>
    </div>
  );
};

// --- WORMHOLE PORTAL ---
export const WormholePortal = () => {
  const [scale, setScale] = useState(1);

  useGameLoop((dt) => {
    setScale(1 + Math.sin(Date.now() * 0.003) * 0.1);
  }, true);

  return (
    <div className="h-full bg-black flex items-center justify-center">
      <div
        className="relative w-32 h-32"
        style={{ transform: `scale(${scale})` }}
      >
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute inset-0 rounded-full border-2 animate-spin"
            style={{
              borderColor: `hsl(${280 + i * 20}, 70%, 50%)`,
              transform: `scale(${1 - i * 0.15})`,
              animationDuration: `${3 + i}s`,
              animationDirection: i % 2 === 0 ? 'normal' : 'reverse'
            }}
          />
        ))}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-purple-500 rounded-full shadow-[0_0_20px_10px_rgba(168,85,247,0.5)]" />
      </div>
    </div>
  );
};

// ============ NARRATIVE DEMOS ============

import { ZoomIn } from '../shared/icons';

// --- INFINITE ZOOM MICROSCOPE ---
export const InfiniteZoom = () => {
  const [zoomLevel, setZoomLevel] = useState(0); // 0: Start, 1: Topic 1, 2: Topic 2

  const handleZoom = (level: number) => {
    setZoomLevel(level);
  };

  const getTransform = (level: number) => {
    if (level === 0) return 'scale(1) translate(0, 0)';
    if (level === 1) return 'scale(5) translate(-10%, 10%)'; // Zoom into "Molecules"
    if (level === 2) return 'scale(20) translate(-5%, -20%)'; // Zoom into a letter of Topic 1
    return 'scale(1) translate(0, 0)';
  };

  return (
    <div className="h-full bg-black relative flex items-center justify-center p-12 overflow-hidden">
      <div
        className="relative w-full h-full text-white font-black transition-transform duration-1000 ease-in-out origin-center"
        style={{ transform: getTransform(zoomLevel) }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl">
          CHEMISTRY
        </div>

        {/* Level 1 Content (Zoomed out) */}
        <div
          onClick={() => handleZoom(2)}
          className={`absolute top-[40%] left-[20%] text-4xl text-blue-400 p-2 cursor-pointer transition-opacity duration-500 ${zoomLevel === 0 ? 'opacity-100' : 'opacity-0'}`}
        >
          MOLECULES
        </div>

        {/* Level 2 Content (Zoomed in) */}
        <div
          onClick={() => handleZoom(0)}
          className={`absolute top-[60%] left-[45%] text-xl text-yellow-300 p-2 transition-opacity duration-500 ${zoomLevel === 1 ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="text-sm font-mono text-center">
             <ZoomIn size={24} className="mx-auto" />
             <p>Electron Shells</p>
          </div>
        </div>
      </div>

      {/* Reset Button (Fixed Position relative to viewport) */}
      {zoomLevel !== 0 && (
          <button
            onClick={() => handleZoom(0)}
            className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full z-50 text-sm font-bold shadow-lg"
          >
            RESET ZOOM
          </button>
      )}

      <div className="absolute bottom-4 left-4 text-zinc-400 font-mono text-xs">
        Click items to zoom infinitely (Current: {zoomLevel})
      </div>
    </div>
  );
};

export const cosmicComponents = {
  'star-field': StarField,
  'planet-orbit': PlanetOrbit,
  'nebula-gradient': NebulaGradient,
  'constellation-map': ConstellationMap,
  'black-hole': BlackHole,
  'meteor-shower': MeteorShower,
  'wormhole-portal': WormholePortal,
  // NarrativeDemos components
  'infinite-zoom': InfiniteZoom,
};
