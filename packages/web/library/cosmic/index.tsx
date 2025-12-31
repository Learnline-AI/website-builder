import { useState, useEffect } from 'react';
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

  useGameLoop((_dt) => {
    setStars(prev => prev.map(star => ({
      ...star,
      opacity: 0.3 + Math.sin(Date.now() * 0.005 + star.x) * 0.4
    })));
  }, true);

  return (
    <div className="h-full bg-zinc-950 relative overflow-hidden">
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

  useGameLoop((_dt) => {
    setAngle(a => (a + _dt * 0.05) % 360);
  }, true);

  return (
    <div className="h-full bg-zinc-900 flex items-center justify-center">
      <div className="relative w-48 h-48">
        {/* Sun */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-br from-yellow-300 to-orange-500 rounded-full shadow-[0_0_12px_rgba(255,200,0,0.3)]" />
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

  useGameLoop((_dt) => {
    setHue(h => (h + _dt * 0.02) % 360);
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

  useGameLoop((_dt) => {
    setRotation(r => r + _dt * 0.1);
  }, true);

  return (
    <div className="h-full bg-zinc-950 flex items-center justify-center overflow-hidden">
      <div className="relative w-40 h-40">
        {/* Accretion disk */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'conic-gradient(from 0deg, transparent, #ff6600, #ff0066, transparent)',
            transform: `rotate(${rotation}deg)`,
            filter: 'blur(3px)'
          }}
        />
        {/* Event horizon */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-zinc-950 rounded-full shadow-[0_0_20px_10px_rgba(0,0,0,0.8)]" />
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

  useGameLoop((_dt) => {
    setScale(1 + Math.sin(Date.now() * 0.003) * 0.1);
  }, true);

  return (
    <div className="h-full bg-zinc-950 flex items-center justify-center">
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-purple-500 rounded-full shadow-[0_0_10px_5px_rgba(168,85,247,0.4)]" />
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
    <div className="h-full bg-zinc-950 relative flex items-center justify-center p-12 overflow-hidden">
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

// --- GALAXY SPINNER ---
export const GalaxySpinner = () => {
  const [rotation, setRotation] = useState(0);

  useGameLoop((_dt) => {
    setRotation(r => (r + _dt * 0.03) % 360);
  }, true);

  return (
    <div className="h-full bg-zinc-950 flex items-center justify-center overflow-hidden">
      <div className="relative w-40 h-40">
        {/* Spiral arms */}
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              transform: `rotate(${rotation + i * 90}deg)`,
            }}
          >
            <div
              className="absolute top-1/2 left-1/2 w-32 h-1 origin-left"
              style={{
                background: `linear-gradient(to right, rgba(147, 51, 234, 0.9), rgba(236, 72, 153, 0.6), transparent)`,
                transform: `translateY(-50%) rotate(${20 * Math.sin(rotation * 0.02 + i)}deg)`,
                filter: 'blur(2px)',
              }}
            />
            <div
              className="absolute top-1/2 left-1/2 w-24 h-0.5 origin-left"
              style={{
                background: `linear-gradient(to right, rgba(59, 130, 246, 0.8), rgba(147, 51, 234, 0.5), transparent)`,
                transform: `translateY(-50%) rotate(${-15 + 10 * Math.cos(rotation * 0.02 + i)}deg)`,
                filter: 'blur(1px)',
              }}
            />
          </div>
        ))}
        {/* Core glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-[0_0_12px_6px_rgba(255,255,255,0.2),0_0_24px_12px_rgba(147,51,234,0.2)]" />
        {/* Scattered stars */}
        {[...Array(20)].map((_, i) => {
          const angle = (i / 20) * Math.PI * 2;
          const distance = 15 + Math.random() * 50;
          return (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `calc(50% + ${Math.cos(angle + rotation * 0.01) * distance}px)`,
                top: `calc(50% + ${Math.sin(angle + rotation * 0.01) * distance}px)`,
                opacity: 0.3 + Math.sin(rotation * 0.05 + i) * 0.4,
              }}
            />
          );
        })}
      </div>
      <span className="absolute bottom-4 left-4 text-purple-300/60 font-mono text-xs">LOADING...</span>
    </div>
  );
};

// --- ASTEROID FIELD ---
export const AsteroidField = () => {
  const [asteroids, setAsteroids] = useState<{ id: number; x: number; y: number; size: number; speed: number; rotation: number; rotationSpeed: number }[]>([]);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const newAsteroids = [...Array(15)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 8 + Math.random() * 20,
      speed: 0.2 + Math.random() * 0.3,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 2,
    }));
    setAsteroids(newAsteroids);
  }, []);

  useGameLoop((_dt) => {
    setAsteroids(prev => prev.map(asteroid => {
      const dx = mousePos.x - asteroid.x;
      const dy = mousePos.y - asteroid.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const repelForce = dist < 20 ? (20 - dist) * 0.05 : 0;
      const repelX = dist > 0 ? (-dx / dist) * repelForce : 0;
      const repelY = dist > 0 ? (-dy / dist) * repelForce : 0;

      return {
        ...asteroid,
        x: ((asteroid.x + asteroid.speed * 0.1 + repelX + 100) % 100),
        y: ((asteroid.y + asteroid.speed * 0.05 + repelY + 100) % 100),
        rotation: asteroid.rotation + asteroid.rotationSpeed,
      };
    }));
  }, true);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div
      className="h-full bg-zinc-950 relative overflow-hidden cursor-crosshair"
      onMouseMove={handleMouseMove}
    >
      {/* Background stars */}
      {[...Array(30)].map((_, i) => (
        <div
          key={`star-${i}`}
          className="absolute w-0.5 h-0.5 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0.2 + Math.random() * 0.5,
          }}
        />
      ))}
      {/* Asteroids */}
      {asteroids.map(asteroid => (
        <div
          key={asteroid.id}
          className="absolute"
          style={{
            left: `${asteroid.x}%`,
            top: `${asteroid.y}%`,
            width: asteroid.size,
            height: asteroid.size,
            transform: `translate(-50%, -50%) rotate(${asteroid.rotation}deg)`,
          }}
        >
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <polygon
              points="12,2 18,8 20,16 14,22 6,20 2,12 4,6"
              fill="url(#asteroidGradient)"
              stroke="#6b7280"
              strokeWidth="0.5"
            />
            <defs>
              <linearGradient id="asteroidGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#78716c" />
                <stop offset="50%" stopColor="#57534e" />
                <stop offset="100%" stopColor="#44403c" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      ))}
      <span className="absolute bottom-4 left-4 text-zinc-500 font-mono text-xs">ASTEROID BELT</span>
    </div>
  );
};

// --- PLANET CARD ---
export const PlanetCard = () => {
  const [moonAngle, setMoonAngle] = useState(0);
  const [ringRotation, setRingRotation] = useState(0);
  const [hovered, setHovered] = useState(false);

  useGameLoop((_dt) => {
    setMoonAngle(a => (a + _dt * 0.04) % 360);
    setRingRotation(r => (r + _dt * 0.01) % 360);
  }, true);

  return (
    <div className="h-full bg-gradient-to-br from-zinc-950 via-indigo-950 to-zinc-950 flex items-center justify-center p-4">
      <div
        className={`relative w-64 bg-zinc-900/80 backdrop-blur-sm rounded-2xl border border-purple-500/30 p-6 transition-all duration-200 ${hovered ? 'scale-[1.03] shadow-[0_0_16px_rgba(147,51,234,0.2)]' : ''}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Planet visualization */}
        <div className="relative w-32 h-32 mx-auto mb-4">
          {/* Planet ring */}
          <div
            className="absolute top-1/2 left-1/2 w-40 h-8 -translate-x-1/2 -translate-y-1/2 border-2 border-purple-400/40 rounded-full"
            style={{
              transform: `translate(-50%, -50%) rotateX(70deg) rotateZ(${ringRotation}deg)`,
            }}
          />
          {/* Planet */}
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-purple-600 via-indigo-700 to-purple-900 shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.5),inset_5px_5px_20px_rgba(255,255,255,0.1)]">
            {/* Planet surface detail */}
            <div className="absolute top-6 left-4 w-8 h-4 bg-indigo-500/30 rounded-full blur-sm" />
            <div className="absolute top-10 left-8 w-6 h-3 bg-purple-400/20 rounded-full blur-sm" />
          </div>
          {/* Moon */}
          <div
            className="absolute w-4 h-4"
            style={{
              left: `calc(50% + ${Math.cos(moonAngle * Math.PI / 180) * 55}px - 8px)`,
              top: `calc(50% + ${Math.sin(moonAngle * Math.PI / 180) * 30}px - 8px)`,
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-500 rounded-full shadow-lg" />
          </div>
        </div>
        {/* Planet info */}
        <div className="text-center">
          <h3 className="text-white font-bold text-lg mb-1">KEPLER-442b</h3>
          <p className="text-purple-300 text-sm mb-3">Super-Earth Exoplanet</p>
          <div className="flex justify-between text-xs text-zinc-400">
            <span>Mass: 2.3 M⊕</span>
            <span>Distance: 112 ly</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- SPACE MISSION TIMELINE ---
export const SpaceMissionTimeline = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [pulseOpacity, setPulseOpacity] = useState(1);

  const missions = [
    { year: '1969', event: 'Moon Landing', status: 'completed' },
    { year: '1990', event: 'Hubble Launch', status: 'completed' },
    { year: '2012', event: 'Mars Curiosity', status: 'completed' },
    { year: '2024', event: 'Artemis II', status: 'active' },
    { year: '2030', event: 'Mars Colony', status: 'pending' },
  ];

  useGameLoop((_dt) => {
    setPulseOpacity(0.5 + Math.sin(Date.now() * 0.005) * 0.5);
  }, true);

  return (
    <div className="h-full bg-zinc-950 p-6 overflow-auto">
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-purple-500 to-zinc-700" />

        {missions.map((mission, i) => (
          <div
            key={i}
            className={`relative pl-12 pb-8 cursor-pointer transition-all ${activeIndex === i ? 'scale-105' : 'opacity-70 hover:opacity-100'}`}
            onClick={() => setActiveIndex(i)}
          >
            {/* Node */}
            <div
              className={`absolute left-2 w-5 h-5 rounded-full border-2 transition-all ${
                mission.status === 'completed'
                  ? 'bg-cyan-500 border-cyan-400'
                  : mission.status === 'active'
                  ? 'bg-purple-500 border-purple-400'
                  : 'bg-zinc-700 border-zinc-600'
              }`}
              style={{
                boxShadow: mission.status === 'active' ? `0 0 10px rgba(147, 51, 234, ${pulseOpacity * 0.6})` : 'none',
              }}
            />
            {/* Content */}
            <div className={`bg-zinc-900/50 backdrop-blur-sm rounded-lg p-4 border transition-all ${
              activeIndex === i
                ? 'border-purple-500/50 shadow-[0_0_10px_rgba(147,51,234,0.15)]'
                : 'border-zinc-800'
            }`}>
              <span className="text-cyan-400 font-mono text-sm">{mission.year}</span>
              <h4 className="text-white font-semibold mt-1">{mission.event}</h4>
              <span className={`text-xs uppercase tracking-wider ${
                mission.status === 'completed' ? 'text-green-400' :
                mission.status === 'active' ? 'text-purple-400' : 'text-zinc-500'
              }`}>
                {mission.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- STAR RATING ---
export const StarRating = () => {
  const [rating, setRating] = useState(3);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);

  const displayRating = hoverRating ?? rating;

  const handleClick = (index: number) => {
    setRating(index + 1);
    // Add sparkle effect
    const newSparkles = [...Array(5)].map((_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 40 - 20,
      y: Math.random() * 40 - 20,
    }));
    setSparkles(prev => [...prev, ...newSparkles]);
    setTimeout(() => {
      setSparkles(prev => prev.filter(s => !newSparkles.find(ns => ns.id === s.id)));
    }, 600);
  };

  return (
    <div className="h-full bg-indigo-950 flex flex-col items-center justify-center">
      <div className="relative flex gap-2">
        {[...Array(5)].map((_, i) => {
          const isActive = i < displayRating;
          return (
            <button
              key={i}
              className="relative w-10 h-10 transition-transform hover:scale-110 focus:outline-none"
              onMouseEnter={() => setHoverRating(i + 1)}
              onMouseLeave={() => setHoverRating(null)}
              onClick={() => handleClick(i)}
            >
              <svg viewBox="0 0 24 24" className="w-full h-full">
                <polygon
                  points="12,2 15,9 22,9 17,14 19,22 12,17 5,22 7,14 2,9 9,9"
                  fill={isActive ? 'url(#starGradient)' : 'transparent'}
                  stroke={isActive ? '#fbbf24' : '#6b7280'}
                  strokeWidth="1.5"
                  className="transition-all"
                />
                <defs>
                  <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fde047" />
                    <stop offset="100%" stopColor="#f59e0b" />
                  </linearGradient>
                </defs>
              </svg>
              {isActive && (
                <div className="absolute inset-0 animate-pulse">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-yellow-300 rounded-full blur-md" />
                </div>
              )}
            </button>
          );
        })}
        {/* Sparkles */}
        {sparkles.map(sparkle => (
          <div
            key={sparkle.id}
            className="absolute w-1 h-1 bg-yellow-300 rounded-full animate-ping pointer-events-none"
            style={{
              left: `calc(50% + ${sparkle.x}px)`,
              top: `calc(50% + ${sparkle.y}px)`,
            }}
          />
        ))}
      </div>
      {/* Constellation lines connecting stars */}
      <svg className="absolute w-64 h-16 pointer-events-none" style={{ top: 'calc(50% - 8px)' }}>
        {[...Array(4)].map((_, i) => (
          <line
            key={i}
            x1={32 + i * 48}
            y1={20}
            x2={80 + i * 48}
            y2={20}
            stroke={i < displayRating - 1 ? 'rgba(251, 191, 36, 0.3)' : 'rgba(107, 114, 128, 0.2)'}
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        ))}
      </svg>
      <p className="mt-8 text-indigo-300 font-mono text-sm">{rating} / 5 STARS</p>
    </div>
  );
};

// --- NEBULA BADGE ---
export const NebulaBadge = () => {
  const [hue, setHue] = useState(0);
  const [glowIntensity, setGlowIntensity] = useState(0.5);

  useGameLoop((_dt) => {
    setHue(h => (h + _dt * 0.02) % 360);
    setGlowIntensity(0.3 + Math.sin(Date.now() * 0.003) * 0.3);
  }, true);

  const badges = [
    { label: 'EXPLORER', color: 280 },
    { label: 'PIONEER', color: 200 },
    { label: 'VOYAGER', color: 320 },
  ];

  return (
    <div className="h-full bg-zinc-950 flex items-center justify-center gap-4 p-4 flex-wrap">
      {badges.map((badge) => (
        <div
          key={badge.label}
          className="relative px-4 py-2 rounded-full cursor-pointer transition-transform hover:scale-110"
          style={{
            background: `linear-gradient(135deg,
              hsla(${(badge.color + hue) % 360}, 70%, 30%, 0.8),
              hsla(${(badge.color + hue + 40) % 360}, 60%, 20%, 0.8))`,
            boxShadow: `
              0 0 ${20 + glowIntensity * 20}px hsla(${(badge.color + hue) % 360}, 70%, 50%, ${glowIntensity}),
              inset 0 0 20px hsla(${(badge.color + hue) % 360}, 70%, 50%, 0.2)
            `,
            border: `1px solid hsla(${(badge.color + hue) % 360}, 60%, 60%, 0.5)`,
          }}
        >
          {/* Inner glow effect */}
          <div
            className="absolute inset-0 rounded-full opacity-50"
            style={{
              background: `radial-gradient(circle at 30% 30%,
                hsla(${(badge.color + hue) % 360}, 80%, 70%, 0.3),
                transparent 60%)`,
            }}
          />
          {/* Star particles */}
          {[...Array(3)].map((_, j) => (
            <div
              key={j}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${20 + j * 30}%`,
                top: `${20 + (j * 20) % 60}%`,
                opacity: 0.3 + Math.sin(Date.now() * 0.01 + j) * 0.4,
              }}
            />
          ))}
          <span className="relative text-white font-bold text-sm tracking-widest">
            {badge.label}
          </span>
        </div>
      ))}
    </div>
  );
};

// --- ROCKET LAUNCH BUTTON ---
export const RocketLaunchButton = () => {
  const [launching, setLaunching] = useState(false);
  const [rocketY, setRocketY] = useState(0);
  const [flames, setFlames] = useState<{ id: number; x: number; y: number; opacity: number }[]>([]);

  useGameLoop((_dt) => {
    if (launching) {
      setRocketY(y => Math.min(y + _dt * 0.3, 150));
      // Add flame particles
      if (Math.random() > 0.5) {
        setFlames(prev => [...prev, {
          id: Date.now() + Math.random(),
          x: (Math.random() - 0.5) * 20,
          y: 0,
          opacity: 1,
        }].slice(-20));
      }
      // Update flames
      setFlames(prev => prev.map(f => ({
        ...f,
        y: f.y + _dt * 0.2,
        opacity: f.opacity - _dt * 0.003,
      })).filter(f => f.opacity > 0));

      if (rocketY >= 150) {
        setLaunching(false);
        setRocketY(0);
        setFlames([]);
      }
    }
  }, launching);

  return (
    <div className="h-full bg-zinc-950 flex items-center justify-center overflow-hidden">
      <div className="relative">
        {/* Launch pad */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-4 bg-zinc-700 rounded-t-sm" />
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-2 bg-zinc-600" />

        {/* Rocket */}
        <div
          className="relative transition-transform"
          style={{ transform: `translateY(-${rocketY}px)` }}
        >
          <svg viewBox="0 0 40 80" className="w-16 h-32">
            {/* Rocket body */}
            <ellipse cx="20" cy="50" rx="10" ry="25" fill="url(#rocketBody)" />
            {/* Nose cone */}
            <polygon points="20,5 10,30 30,30" fill="#ef4444" />
            {/* Window */}
            <circle cx="20" cy="40" r="5" fill="#60a5fa" stroke="#1e40af" strokeWidth="1" />
            {/* Fins */}
            <polygon points="10,65 0,80 10,75" fill="#ef4444" />
            <polygon points="30,65 40,80 30,75" fill="#ef4444" />
            <defs>
              <linearGradient id="rocketBody" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#d1d5db" />
                <stop offset="50%" stopColor="#f3f4f6" />
                <stop offset="100%" stopColor="#9ca3af" />
              </linearGradient>
            </defs>
          </svg>

          {/* Flames */}
          {launching && (
            <div className="absolute top-28 left-1/2 -translate-x-1/2">
              {flames.map(flame => (
                <div
                  key={flame.id}
                  className="absolute w-3 h-6 rounded-full"
                  style={{
                    left: flame.x,
                    top: flame.y,
                    opacity: flame.opacity,
                    background: 'linear-gradient(to bottom, #fbbf24, #f97316, #ef4444)',
                    filter: 'blur(2px)',
                  }}
                />
              ))}
              <div className="w-8 h-12 bg-gradient-to-b from-yellow-400 via-orange-500 to-red-600 rounded-b-full blur-sm animate-pulse" />
            </div>
          )}
        </div>

        {/* Launch button */}
        <button
          className={`mt-8 px-6 py-3 rounded-lg font-bold text-white transition-all ${
            launching
              ? 'bg-orange-600 cursor-not-allowed'
              : 'bg-red-600 hover:bg-red-500 hover:shadow-[0_0_20px_rgba(239,68,68,0.5)] active:scale-95'
          }`}
          onClick={() => !launching && setLaunching(true)}
          disabled={launching}
        >
          {launching ? 'LAUNCHING...' : 'LAUNCH'}
        </button>
      </div>
    </div>
  );
};

// --- COSMIC SLIDER ---
export const CosmicSlider = () => {
  const [value, setValue] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [orbitAngle, setOrbitAngle] = useState(0);

  useGameLoop((_dt) => {
    setOrbitAngle(a => (a + _dt * 0.1) % 360);
  }, true);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseInt(e.target.value));
  };

  return (
    <div className="h-full bg-zinc-950 flex flex-col items-center justify-center p-8">
      <div className="relative w-full max-w-xs">
        {/* Track */}
        <div className="relative h-2 bg-zinc-800 rounded-full overflow-hidden">
          {/* Filled track */}
          <div
            className="absolute h-full rounded-full"
            style={{
              width: `${value}%`,
              background: 'linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899)',
              boxShadow: '0 0 10px rgba(139, 92, 246, 0.5)',
            }}
          />
          {/* Star particles on track */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${i * 25}%`,
                top: '50%',
                transform: 'translateY(-50%)',
                opacity: i * 25 < value ? 0.8 : 0.2,
              }}
            />
          ))}
        </div>

        {/* Planet thumb */}
        <div
          className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ left: `calc(${value}% - 16px)` }}
        >
          <div className={`relative w-8 h-8 transition-transform ${isDragging ? 'scale-125' : ''}`}>
            {/* Planet */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400 via-purple-600 to-purple-900 shadow-[0_0_8px_rgba(147,51,234,0.3)]">
              <div className="absolute top-1 left-2 w-2 h-1 bg-purple-300/30 rounded-full" />
            </div>
            {/* Orbiting moon */}
            <div
              className="absolute w-2 h-2 bg-gray-300 rounded-full"
              style={{
                left: `calc(50% + ${Math.cos(orbitAngle * Math.PI / 180) * 18}px - 4px)`,
                top: `calc(50% + ${Math.sin(orbitAngle * Math.PI / 180) * 10}px - 4px)`,
              }}
            />
          </div>
        </div>

        {/* Hidden input */}
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={handleSliderChange}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>

      {/* Value display */}
      <div className="mt-8 text-center">
        <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
          {value}%
        </span>
        <p className="text-zinc-500 text-sm mt-1">WARP FACTOR</p>
      </div>
    </div>
  );
};

// --- SPACESHIP NAV ---
export const SpaceshipNav = () => {
  const [activeSection, setActiveSection] = useState('bridge');
  const [alertLevel, setAlertLevel] = useState(0);

  const sections = [
    { id: 'bridge', label: 'BRIDGE', icon: '◇' },
    { id: 'engineering', label: 'ENGINEERING', icon: '⚙' },
    { id: 'cargo', label: 'CARGO BAY', icon: '▢' },
    { id: 'medical', label: 'MEDICAL', icon: '+' },
  ];

  useGameLoop((_dt) => {
    setAlertLevel(0.5 + Math.sin(Date.now() * 0.005) * 0.3);
  }, true);

  return (
    <div className="h-full bg-zinc-950 p-4">
      {/* Dashboard frame */}
      <div className="relative bg-zinc-900 rounded-xl border-2 border-cyan-900/50 p-4 overflow-hidden">
        {/* Scan line effect */}
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,0.03) 2px, rgba(0,255,255,0.03) 4px)',
          }}
        />

        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-cyan-900/30">
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full bg-green-500"
              style={{ boxShadow: `0 0 10px rgba(34, 197, 94, ${alertLevel})` }}
            />
            <span className="text-cyan-400 font-mono text-xs">SYSTEMS ONLINE</span>
          </div>
          <span className="text-zinc-500 font-mono text-xs">DECK 7</span>
        </div>

        {/* Navigation buttons */}
        <div className="grid grid-cols-2 gap-3">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`relative p-3 rounded-lg border-2 transition-all ${
                activeSection === section.id
                  ? 'bg-cyan-900/30 border-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.2),inset_0_0_8px_rgba(6,182,212,0.1)]'
                  : 'bg-zinc-800/50 border-zinc-700 hover:border-cyan-700'
              }`}
            >
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyan-500/50" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-cyan-500/50" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-cyan-500/50" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyan-500/50" />

              <span className="text-2xl mb-1 block">{section.icon}</span>
              <span className={`font-mono text-xs ${activeSection === section.id ? 'text-cyan-300' : 'text-zinc-400'}`}>
                {section.label}
              </span>

              {/* Active indicator */}
              {activeSection === section.id && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-cyan-500 rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Status bar */}
        <div className="mt-4 pt-2 border-t border-cyan-900/30 flex justify-between text-xs font-mono">
          <span className="text-orange-400">PWR: 87%</span>
          <span className="text-green-400">O2: 98%</span>
          <span className="text-blue-400">FUEL: 62%</span>
        </div>
      </div>
    </div>
  );
};

// --- WARP SPEED LOADER ---
export const WarpSpeedLoader = () => {
  const [stars, setStars] = useState<{ id: number; x: number; y: number; z: number; length: number }[]>([]);
  const [progress, setProgress] = useState(0);
  const [isWarping, setIsWarping] = useState(true);

  useEffect(() => {
    const initialStars = [...Array(100)].map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 200,
      y: (Math.random() - 0.5) * 200,
      z: Math.random() * 100,
      length: 1,
    }));
    setStars(initialStars);
  }, []);

  useGameLoop((_dt) => {
    if (!isWarping) return;

    setProgress(p => {
      const newProgress = p + _dt * 0.03;
      if (newProgress >= 100) {
        setIsWarping(false);
        return 100;
      }
      return newProgress;
    });

    setStars(prev => prev.map(star => {
      const speed = 0.5 + progress * 0.02;
      const newZ = star.z - _dt * speed * 0.1;
      const newLength = Math.min(1 + progress * 0.3, 30);

      if (newZ <= 0) {
        return {
          ...star,
          x: (Math.random() - 0.5) * 200,
          y: (Math.random() - 0.5) * 200,
          z: 100,
          length: newLength,
        };
      }
      return { ...star, z: newZ, length: newLength };
    }));
  }, isWarping);

  const handleRestart = () => {
    setProgress(0);
    setIsWarping(true);
  };

  return (
    <div className="h-full bg-zinc-950 flex items-center justify-center overflow-hidden">
      <div className="relative w-full h-full">
        {/* Stars */}
        <svg className="absolute inset-0 w-full h-full">
          {stars.map(star => {
            const scale = 100 / (star.z + 1);
            const screenX = 50 + star.x * scale * 0.5;
            const screenY = 50 + star.y * scale * 0.5;
            const opacity = Math.min(1, scale * 0.3);
            const lineLength = star.length * scale * 0.5;

            return (
              <line
                key={star.id}
                x1={`${screenX}%`}
                y1={`${screenY}%`}
                x2={`${screenX}%`}
                y2={`${screenY - lineLength}%`}
                stroke={`rgba(255, 255, 255, ${opacity})`}
                strokeWidth={Math.max(0.5, scale * 0.3)}
                strokeLinecap="round"
              />
            );
          })}
        </svg>

        {/* Center glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-radial from-white/20 via-blue-500/10 to-transparent blur-xl" />

        {/* Progress indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
          <div className="w-48 h-1 bg-zinc-800 rounded-full overflow-hidden mb-2">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(to right, #3b82f6, #8b5cf6, #ffffff)',
                boxShadow: '0 0 10px rgba(139, 92, 246, 0.5)',
              }}
            />
          </div>
          <span className="text-blue-300 font-mono text-sm">
            {isWarping ? `WARP ${Math.floor(progress)}%` : 'DESTINATION REACHED'}
          </span>
          {!isWarping && (
            <button
              onClick={handleRestart}
              className="block mx-auto mt-2 px-4 py-1 text-xs text-white bg-blue-600 rounded hover:bg-blue-500 transition-colors"
            >
              ENGAGE AGAIN
            </button>
          )}
        </div>
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
  // New cosmic components
  'galaxy-spinner': GalaxySpinner,
  'asteroid-field': AsteroidField,
  'planet-card': PlanetCard,
  'space-mission-timeline': SpaceMissionTimeline,
  'star-rating': StarRating,
  'nebula-badge': NebulaBadge,
  'rocket-launch-button': RocketLaunchButton,
  'cosmic-slider': CosmicSlider,
  'spaceship-nav': SpaceshipNav,
  'warp-speed-loader': WarpSpeedLoader,
};
