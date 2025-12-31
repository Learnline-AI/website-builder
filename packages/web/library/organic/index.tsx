import React, { useState, useEffect, useRef } from 'react';

// --- WORN LEATHER CARD ---
export const WornLeatherCard = () => {
  return (
    <div className="h-full bg-stone-200 flex items-center justify-center p-4">
      <div
        className="w-48 h-32 rounded-lg shadow-2xl p-4 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #8B4513 0%, #654321 50%, #8B4513 100%)',
          boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.3), 0 8px 20px rgba(0,0,0,0.4)'
        }}
      >
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/leather.png")' }} />
        <h3 className="text-amber-100 font-serif font-bold text-lg relative z-10">Journal Entry</h3>
        <p className="text-amber-200/70 text-xs mt-2 font-serif relative z-10">December 22, 1985</p>
        <div className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-amber-900/50 border border-amber-700" />
      </div>
    </div>
  );
};

// --- MOSS GROWTH BAR ---
export const MossGrowthBar = () => {
  const [growth, setGrowth] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setGrowth(g => Math.min(100, g + Math.random() * 5));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full bg-stone-800 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-xs">
        <div className="relative h-8 bg-stone-700 rounded-full overflow-hidden border-2 border-stone-600">
          <div
            className="absolute inset-y-0 left-0 transition-all duration-1000"
            style={{
              width: `${growth}%`,
              background: 'linear-gradient(90deg, #2d5016 0%, #4ade80 50%, #22c55e 100%)'
            }}
          >
            {/* Moss texture */}
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-3 bg-green-600 rounded-full opacity-80"
                style={{
                  left: `${i * 5}%`,
                  top: Math.random() * 50 + '%',
                  transform: `rotate(${Math.random() * 30 - 15}deg)`
                }}
              />
            ))}
          </div>
        </div>
        <p className="text-green-400 font-mono text-center mt-2 text-xs">
          GROWTH: {Math.floor(growth)}%
        </p>
      </div>
    </div>
  );
};

// --- WATER RIPPLE BUTTON ---
export const WaterRippleButton = () => {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const createRipple = (e: React.MouseEvent) => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples(r => [...r, { x, y, id }]);
    setTimeout(() => {
      setRipples(r => r.filter(ripple => ripple.id !== id));
    }, 600);
  };

  return (
    <div className="h-full bg-cyan-900 flex items-center justify-center p-4">
      <button
        ref={buttonRef}
        onClick={createRipple}
        className="relative px-8 py-4 bg-cyan-600 text-white font-bold rounded-lg overflow-hidden shadow-lg"
      >
        <span className="relative z-10">DIVE IN</span>
        {ripples.map(ripple => (
          <span
            key={ripple.id}
            className="absolute bg-white/30 rounded-full animate-ripple"
            style={{
              left: ripple.x,
              top: ripple.y,
              transform: 'translate(-50%, -50%)'
            }}
          />
        ))}
      </button>
      <style>{`
        @keyframes ripple {
          0% { width: 0; height: 0; opacity: 0.5; }
          100% { width: 200px; height: 200px; opacity: 0; }
        }
        .animate-ripple { animation: ripple 0.6s ease-out; }
      `}</style>
    </div>
  );
};

// --- WOVEN CLOTH LAYOUT ---
export const WovenClothLayout = () => {
  return (
    <div className="h-full bg-amber-100 flex items-center justify-center p-4">
      <div className="grid grid-cols-4 gap-0.5 w-48 h-48">
        {[...Array(16)].map((_, i) => {
          const row = Math.floor(i / 4);
          const col = i % 4;
          const isWarp = (row + col) % 2 === 0;
          return (
            <div
              key={i}
              className={`h-12 transition-all hover:scale-105 ${isWarp ? 'bg-amber-600' : 'bg-amber-800'}`}
              style={{
                boxShadow: isWarp ? 'inset 0 2px 4px rgba(0,0,0,0.3)' : 'inset 0 -2px 4px rgba(0,0,0,0.3)'
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

// --- ORIGAMI MENU ---
export const OrigamiMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const items = ['HOME', 'ABOUT', 'WORK'];

  return (
    <div className="h-full bg-stone-100 flex flex-col items-center justify-center p-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-6 py-2 bg-stone-800 text-white font-bold mb-4"
      >
        {isOpen ? 'FOLD' : 'UNFOLD'}
      </button>
      <div className="space-y-1">
        {items.map((item, i) => (
          <div
            key={item}
            className={`px-8 py-3 bg-white shadow-md border-l-4 border-stone-800 transition-all duration-500 origin-top`}
            style={{
              transform: isOpen ? 'rotateX(0deg)' : 'rotateX(-90deg)',
              transitionDelay: `${i * 100}ms`,
              opacity: isOpen ? 1 : 0
            }}
          >
            <span className="font-mono text-stone-800 text-sm">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- BURNT EDGE NOTE ---
export const BurntEdgeNote = () => {
  return (
    <div className="h-full bg-zinc-900 flex items-center justify-center p-4">
      <div
        className="w-48 h-32 bg-amber-100 p-4 relative shadow-xl"
        style={{
          clipPath: 'polygon(0 5%, 5% 0, 95% 0, 100% 5%, 100% 90%, 95% 95%, 90% 100%, 10% 100%, 5% 95%, 0 90%)'
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 100% 0%, rgba(139,69,19,0.3) 0%, transparent 50%), radial-gradient(ellipse at 0% 100%, rgba(139,69,19,0.3) 0%, transparent 50%)'
          }}
        />
        <h3 className="font-serif text-amber-900 font-bold">Secret Note</h3>
        <p className="text-amber-800/70 text-xs mt-2 font-serif italic">
          The treasure lies beneath the old oak...
        </p>
      </div>
    </div>
  );
};

// --- VINE BORDER ---
export const VineBorder = () => {
  return (
    <div className="h-full bg-green-900 flex items-center justify-center p-4">
      <div className="relative w-48 h-32 bg-green-800 rounded-lg overflow-hidden">
        {/* Top vine */}
        <svg className="absolute top-0 left-0 w-full h-4" viewBox="0 0 200 20">
          <path
            d="M0,10 Q25,0 50,10 T100,10 T150,10 T200,10"
            fill="none"
            stroke="#22c55e"
            strokeWidth="3"
          />
          {[20, 60, 100, 140, 180].map((x, i) => (
            <circle key={i} cx={x} cy={10} r={4} fill="#4ade80" />
          ))}
        </svg>
        {/* Content */}
        <div className="absolute inset-4 flex items-center justify-center">
          <span className="text-green-300 font-serif text-sm">Nature's Frame</span>
        </div>
        {/* Bottom vine */}
        <svg className="absolute bottom-0 left-0 w-full h-4" viewBox="0 0 200 20">
          <path
            d="M0,10 Q25,20 50,10 T100,10 T150,10 T200,10"
            fill="none"
            stroke="#22c55e"
            strokeWidth="3"
          />
        </svg>
      </div>
    </div>
  );
};

// ============ NARRATIVE DEMOS ============

// --- WEATHER SYNC UI ---
import { Sun, Moon } from '../shared/icons';

const Raindrop: React.FC<{ style: React.CSSProperties }> = ({ style }) => (
  <div
    className="absolute w-0.5 h-4 bg-blue-300 opacity-70 animate-[fall_1s_linear_infinite]"
    style={style}
  />
);

export const WeatherSync = () => {
  const [weather, setWeather] = useState('sunny'); // 'sunny', 'rainy', 'night'

  const handleWeatherChange = (newWeather: string) => {
    setWeather(newWeather);
  };

  return (
    <div className={`h-full relative overflow-hidden transition-all duration-1000 ${
      weather === 'sunny' ? 'bg-blue-300' :
      weather === 'rainy' ? 'bg-gray-700' :
      'bg-zinc-950'
    }`}>
      {/* Dynamic Backgrounds */}
      {weather === 'sunny' && (
        <div className="absolute top-10 left-10 w-24 h-24 bg-yellow-300 rounded-full shadow-[0_0_20px_rgba(253,224,71,0.5)] pulse-subtle"></div>
      )}
      {weather === 'rainy' && (
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <Raindrop key={i} style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random()}s` }} />
          ))}
          <style>{`@keyframes fall { from { transform: translateY(-100px); } to { transform: translateY(100vh); } }`}</style>
        </div>
      )}

      {/* Main Content Card */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 p-8 rounded-lg shadow-2xl transition-all duration-1000
        ${weather === 'sunny' ? 'bg-white text-gray-900 border-2 border-yellow-500' :
          weather === 'rainy' ? 'bg-zinc-800 text-white border-2 border-blue-400/50' :
          'bg-zinc-900 text-[#33ff00] border-2 border-[#33ff00]/50'
        }
      `}>
        <h2 className="text-2xl font-black mb-4">
          Current Topic: <span className="uppercase">{weather}</span>
        </h2>
        <p className="font-mono text-sm">
          The environment affects mood and focus. UI parameters adjusted.
        </p>
      </div>

      <div className="absolute top-4 right-4 flex gap-2 z-50">
        <button className="p-2 bg-white rounded-full hover:scale-110 transition-transform text-black" onClick={() => handleWeatherChange('sunny')}><Sun size={20} /></button>
        <button className="p-2 bg-white rounded-full hover:scale-110 transition-transform text-black" onClick={() => handleWeatherChange('rainy')}>🌧️</button>
        <button className="p-2 bg-white rounded-full hover:scale-110 transition-transform text-black" onClick={() => handleWeatherChange('night')}><Moon size={20} /></button>
      </div>
    </div>
  );
};

// ============ TEXTURE DEMOS ============

// --- TAPESTRY DATA MAP ---
export const TapestryMap = () => {
  const [lightPos, setLightPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setLightPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100
    });
  };

  return (
    <div
      className="h-full bg-stone-900 flex items-center justify-center p-8 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <div className="relative w-full max-w-2xl aspect-video bg-[#2c241b] shadow-2xl border-8 border-[#1a1510] overflow-hidden">
        {/* Fabric Texture Base */}
        <div
          className="absolute inset-0 opacity-30"
          style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/black-linen.png")' }}
        />

        {/* Data Points (Woven into the tapestry) */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-amber-500 rounded-full"
            style={{
              left: `${Math.random() * 90 + 5}%`,
              top: `${Math.random() * 90 + 5}%`,
              opacity: 0.3
            }}
          />
        ))}

        {/* Lighting Layer */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-200"
          style={{
            background: `radial-gradient(circle 150px at ${lightPos.x}% ${lightPos.y}%, rgba(255, 190, 100, 0.4), transparent 100%)`,
            mixBlendMode: 'overlay'
          }}
        />

        {/* Highlighted Data Points (Only visible near light) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            maskImage: `radial-gradient(circle 120px at ${lightPos.x}% ${lightPos.y}%, black, transparent)`,
            WebkitMaskImage: `radial-gradient(circle 120px at ${lightPos.x}% ${lightPos.y}%, black, transparent)`,
          }}
        >
           <div className="absolute inset-0" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/shattered-island.png")', opacity: 0.5 }}></div>
           {/* Connecting Lines */}
           <svg className="absolute inset-0 w-full h-full stroke-amber-300 stroke-[0.5] opacity-80">
              <path d="M 50 50 Q 100 100 200 50 T 400 300" fill="none" />
              <path d="M 300 50 Q 100 200 50 300" fill="none" />
           </svg>
        </div>
      </div>
    </div>
  );
};

// --- WEATHER VANE SORT ---
export const WeatherVaneSort = () => {
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [isSpinning, setIsSpinning] = useState(false);

  const handleSort = () => {
    setIsSpinning(true);
    setTimeout(() => {
      setSortDir(prev => prev === 'asc' ? 'desc' : 'asc');
      setIsSpinning(false);
    }, 600);
  };

  return (
    <div className="h-full bg-sky-100 flex flex-col items-center justify-center p-8">
      <div className="relative w-64">
        {/* The Weather Vane */}
        <div className="flex justify-center mb-8">
          <div className="relative w-32 h-32">
             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-16 bg-gray-800"></div>
             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-gray-800 font-mono text-xs flex justify-between px-1"><span>W</span><span>E</span></div>

             {/* Rotating Part */}
             <div
               className={`absolute top-4 left-1/2 w-24 h-24 transition-transform duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)]`}
               style={{
                 transform: `translateX(-50%) rotate(${sortDir === 'asc' ? 0 : 180}deg) ${isSpinning ? 'rotate(360deg)' : ''}`
               }}
             >
                {/* Rooster/Arrow Shape */}
                <svg viewBox="0 0 100 100" className="w-full h-full fill-red-600 drop-shadow-md">
                  <path d="M 50 0 L 70 30 H 55 V 80 H 45 V 30 H 30 Z" />
                  <circle cx="50" cy="50" r="5" fill="black" />
                </svg>
             </div>
          </div>
        </div>

        <table className="w-full bg-white shadow-xl rounded-lg overflow-hidden font-mono">
          <thead className="bg-gray-800 text-white cursor-pointer" onClick={handleSort}>
            <tr>
              <th className="p-4 text-left flex items-center justify-between group">
                TEMPERATURE
                <span className="text-xs opacity-50 group-hover:opacity-100 transition-opacity">
                  {sortDir === 'asc' ? '▲ N' : '▼ S'}
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {[72, 68, 65, 62].sort((a,b) => sortDir === 'asc' ? a-b : b-a).map((temp, i) => (
              <tr key={i} className="border-b">
                <td className="p-4">{temp}°F</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ============ GARDEN ZONE COMPONENTS ============

// --- GROWING VINE ---
export const GrowingVine = () => {
  const [growth, setGrowth] = useState(0);
  const [isGrowing, setIsGrowing] = useState(true);

  useEffect(() => {
    if (!isGrowing) return;
    const interval = setInterval(() => {
      setGrowth(g => {
        if (g >= 100) {
          setIsGrowing(false);
          return 100;
        }
        return g + 2;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [isGrowing]);

  const handleReset = () => {
    setGrowth(0);
    setIsGrowing(true);
  };

  // Generate vine path with curls
  const generateVinePath = (progress: number) => {
    const segments = Math.floor(progress / 10);
    let path = 'M 20 180';
    for (let i = 0; i < segments; i++) {
      const x = 20 + i * 15;
      const y = 180 - i * 18;
      const cx1 = x + (i % 2 === 0 ? 20 : -10);
      const cy1 = y - 10;
      path += ` Q ${cx1} ${cy1} ${x + 15} ${y - 18}`;
    }
    return path;
  };

  // Generate leaves along the vine
  const generateLeaves = (progress: number) => {
    const leaves = [];
    const segments = Math.floor(progress / 15);
    for (let i = 1; i <= segments; i++) {
      const x = 20 + i * 15;
      const y = 180 - i * 18;
      const side = i % 2 === 0 ? 1 : -1;
      leaves.push(
        <g key={i} transform={`translate(${x}, ${y}) rotate(${side * 45})`}>
          <ellipse cx="0" cy="-8" rx="4" ry="10" fill="#22c55e" opacity="0.9" />
          <line x1="0" y1="0" x2="0" y2="-8" stroke="#15803d" strokeWidth="1" />
        </g>
      );
    }
    return leaves;
  };

  return (
    <div className="h-full bg-gradient-to-b from-sky-200 to-green-200 flex flex-col items-center justify-center p-4">
      <svg viewBox="0 0 200 200" className="w-48 h-48">
        {/* Ground */}
        <ellipse cx="100" cy="190" rx="80" ry="10" fill="#8B4513" />

        {/* Main vine stem */}
        <path
          d={generateVinePath(growth)}
          fill="none"
          stroke="#15803d"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Curling tendrils */}
        {growth > 30 && (
          <path
            d="M 50 140 Q 70 130 65 150"
            fill="none"
            stroke="#22c55e"
            strokeWidth="1.5"
            opacity={Math.min(1, (growth - 30) / 20)}
          />
        )}
        {growth > 60 && (
          <path
            d="M 80 100 Q 60 90 65 110"
            fill="none"
            stroke="#22c55e"
            strokeWidth="1.5"
            opacity={Math.min(1, (growth - 60) / 20)}
          />
        )}

        {/* Leaves */}
        {generateLeaves(growth)}

        {/* Flower bud at top */}
        {growth >= 100 && (
          <g transform="translate(140, 20)">
            <circle cx="0" cy="0" r="8" fill="#ec4899" className="pulse-subtle" />
            <circle cx="0" cy="0" r="4" fill="#fbbf24" />
          </g>
        )}
      </svg>

      <button
        onClick={handleReset}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded-full text-sm font-medium hover:bg-green-700 transition-colors"
      >
        {growth >= 100 ? 'Regrow' : `Growing... ${growth}%`}
      </button>
    </div>
  );
};

// --- BLOOMING FLOWER ---
export const BloomingFlower = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoverPetal, setHoverPetal] = useState<number | null>(null);

  const petalColors = ['#ec4899', '#f472b6', '#f9a8d4', '#fce7f3', '#be185d'];
  const petalCount = 8;

  return (
    <div className="h-full bg-gradient-to-b from-green-800 to-green-950 flex flex-col items-center justify-center p-4">
      <div
        className="relative w-40 h-40 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Petals */}
        {[...Array(petalCount)].map((_, i) => {
          const angle = (i * 360) / petalCount;
          const isHovered = hoverPetal === i;
          return (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 w-8 h-16 origin-bottom transition-all duration-700 ease-out"
              style={{
                transform: `translate(-50%, -100%) rotate(${angle}deg) ${isOpen ? 'translateY(-10px)' : 'translateY(20px) scaleY(0.3)'}`,
                opacity: isOpen ? 1 : 0.5,
              }}
              onMouseEnter={() => setHoverPetal(i)}
              onMouseLeave={() => setHoverPetal(null)}
            >
              <div
                className="w-full h-full rounded-full transition-all duration-300"
                style={{
                  background: `linear-gradient(to top, ${petalColors[i % petalColors.length]}, ${petalColors[(i + 1) % petalColors.length]})`,
                  transform: isHovered && isOpen ? 'scale(1.2)' : 'scale(1)',
                  boxShadow: isHovered && isOpen ? '0 0 20px rgba(236, 72, 153, 0.5)' : 'none'
                }}
              />
            </div>
          );
        })}

        {/* Center */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full transition-all duration-500"
          style={{
            background: 'radial-gradient(circle, #fbbf24 30%, #f59e0b 100%)',
            transform: `translate(-50%, -50%) scale(${isOpen ? 1 : 0.6})`,
            boxShadow: isOpen ? '0 0 30px rgba(251, 191, 36, 0.6)' : 'none'
          }}
        >
          {/* Pollen dots */}
          {isOpen && [...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 bg-orange-600 rounded-full"
              style={{
                left: `${30 + Math.random() * 40}%`,
                top: `${30 + Math.random() * 40}%`,
              }}
            />
          ))}
        </div>
      </div>

      <p className="mt-4 text-green-300 text-sm font-medium">
        {isOpen ? 'Click to close' : 'Click to bloom'}
      </p>

      <style>{`
        @keyframes sway {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }
      `}</style>
    </div>
  );
};

// --- POLLEN DRIFT ---
export const PollenDrift = () => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    speed: number;
    wobble: number;
  }>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    // Initialize particles
    const initialParticles = [...Array(30)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      speed: Math.random() * 0.3 + 0.1,
      wobble: Math.random() * Math.PI * 2,
    }));
    setParticles(initialParticles);

    // Animation loop
    let lastTime = 0;
    const animate = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      setParticles(prev => prev.map(p => ({
        ...p,
        x: p.x + Math.sin(p.wobble + time * 0.001) * 0.1,
        y: (p.y - p.speed * (delta * 0.01) + 100) % 100,
        wobble: p.wobble + 0.02,
      })));

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-full bg-gradient-to-b from-amber-100 via-amber-50 to-green-100 relative overflow-hidden"
    >
      {/* Sunbeams */}
      <div
        className="absolute top-0 right-0 w-full h-full opacity-30"
        style={{
          background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.4) 0%, transparent 50%)'
        }}
      />

      {/* Pollen particles */}
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, #fbbf24 0%, #f59e0b 100%)`,
            boxShadow: '0 0 4px rgba(251, 191, 36, 0.6)',
            filter: 'blur(0.5px)',
          }}
        />
      ))}

      {/* Flower source */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <svg viewBox="0 0 60 80" className="w-16 h-20">
          {/* Stem */}
          <path d="M 30 80 Q 25 60 30 40" fill="none" stroke="#22c55e" strokeWidth="3" />
          {/* Petals */}
          {[0, 72, 144, 216, 288].map((angle, i) => (
            <ellipse
              key={i}
              cx="30"
              cy="25"
              rx="8"
              ry="15"
              fill="#fde047"
              transform={`rotate(${angle} 30 30)`}
            />
          ))}
          {/* Center */}
          <circle cx="30" cy="30" r="8" fill="#f59e0b" />
        </svg>
      </div>

      <p className="absolute top-4 left-4 text-amber-700 text-sm font-medium">
        Floating Pollen
      </p>
    </div>
  );
};

// --- BUTTERFLY PATH ---
export const ButterflyPath = () => {
  const [position, setPosition] = useState(0);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const animate = () => {
      setPosition(p => (p + 0.5) % 100);
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  // Figure-8 path calculation
  const t = (position / 100) * Math.PI * 2;
  const x = 50 + 35 * Math.sin(t);
  const y = 50 + 20 * Math.sin(t * 2);
  const rotation = Math.atan2(
    20 * Math.cos(t * 2) * 2,
    35 * Math.cos(t)
  ) * (180 / Math.PI);

  return (
    <div className="h-full bg-gradient-to-b from-sky-300 to-green-300 relative overflow-hidden">
      {/* Path visualization */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path
          d="M 50 50 C 85 30, 85 70, 50 50 C 15 30, 15 70, 50 50"
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="0.5"
          strokeDasharray="2 2"
        />
      </svg>

      {/* Flowers in background */}
      {[
        { x: 20, y: 80, color: '#ec4899' },
        { x: 75, y: 85, color: '#8b5cf6' },
        { x: 50, y: 75, color: '#f59e0b' },
      ].map((flower, i) => (
        <div
          key={i}
          className="absolute"
          style={{ left: `${flower.x}%`, top: `${flower.y}%` }}
        >
          <div
            className="w-6 h-6 rounded-full"
            style={{ background: flower.color }}
          />
        </div>
      ))}

      {/* Butterfly */}
      <div
        className="absolute transition-transform duration-75"
        style={{
          left: `${x}%`,
          top: `${y}%`,
          transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
        }}
      >
        <svg viewBox="0 0 40 30" className="w-12 h-9">
          {/* Left wing */}
          <ellipse
            cx="12"
            cy="15"
            rx="10"
            ry="12"
            fill="url(#wingGradient)"
            className="origin-right"
            style={{
              transform: `scaleX(${0.6 + Math.sin(position * 0.5) * 0.4})`,
              transformOrigin: '20px 15px',
            }}
          />
          {/* Right wing */}
          <ellipse
            cx="28"
            cy="15"
            rx="10"
            ry="12"
            fill="url(#wingGradient)"
            style={{
              transform: `scaleX(${0.6 + Math.sin(position * 0.5) * 0.4})`,
              transformOrigin: '20px 15px',
            }}
          />
          {/* Body */}
          <ellipse cx="20" cy="15" rx="2" ry="8" fill="#1e293b" />
          {/* Antennae */}
          <path d="M 19 7 Q 16 3 14 2" fill="none" stroke="#1e293b" strokeWidth="0.5" />
          <path d="M 21 7 Q 24 3 26 2" fill="none" stroke="#1e293b" strokeWidth="0.5" />

          <defs>
            <linearGradient id="wingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="50%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <p className="absolute bottom-4 left-4 text-green-800 text-sm font-medium">
        Following the garden path
      </p>
    </div>
  );
};

// --- LEAF FALL ---
export const LeafFall = () => {
  const [leaves, setLeaves] = useState<Array<{
    id: number;
    x: number;
    y: number;
    rotation: number;
    rotationSpeed: number;
    fallSpeed: number;
    swayOffset: number;
    color: string;
    size: number;
  }>>([]);
  const animationRef = useRef<number | undefined>(undefined);

  const leafColors = ['#dc2626', '#ea580c', '#f59e0b', '#84cc16', '#65a30d'];

  useEffect(() => {
    // Initialize leaves
    const initialLeaves = [...Array(15)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * -50 - 10,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 4,
      fallSpeed: Math.random() * 0.3 + 0.2,
      swayOffset: Math.random() * Math.PI * 2,
      color: leafColors[Math.floor(Math.random() * leafColors.length)],
      size: Math.random() * 10 + 15,
    }));
    setLeaves(initialLeaves);

    let time = 0;
    const animate = () => {
      time += 0.016;
      setLeaves(prev => prev.map(leaf => {
        let newY = leaf.y + leaf.fallSpeed;
        if (newY > 110) {
          newY = -10;
        }
        return {
          ...leaf,
          x: leaf.x + Math.sin(time + leaf.swayOffset) * 0.3,
          y: newY,
          rotation: leaf.rotation + leaf.rotationSpeed,
        };
      }));
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div className="h-full bg-gradient-to-b from-orange-200 via-amber-100 to-amber-200 relative overflow-hidden">
      {/* Tree silhouette */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2">
        <svg viewBox="0 0 200 100" className="w-64 h-32">
          <path
            d="M 100 100 L 95 60 Q 60 50 50 30 Q 80 40 100 20 Q 120 40 150 30 Q 140 50 105 60 Z"
            fill="#78350f"
            opacity="0.3"
          />
        </svg>
      </div>

      {/* Falling leaves */}
      {leaves.map(leaf => (
        <div
          key={leaf.id}
          className="absolute"
          style={{
            left: `${leaf.x}%`,
            top: `${leaf.y}%`,
            transform: `rotate(${leaf.rotation}deg)`,
          }}
        >
          <svg
            viewBox="0 0 30 40"
            style={{ width: leaf.size, height: leaf.size * 1.3 }}
          >
            <path
              d="M 15 0 Q 30 15 15 40 Q 0 15 15 0"
              fill={leaf.color}
            />
            <path
              d="M 15 5 L 15 35"
              fill="none"
              stroke="rgba(0,0,0,0.2)"
              strokeWidth="1"
            />
            <path
              d="M 15 15 Q 20 20 25 18 M 15 25 Q 10 30 5 28"
              fill="none"
              stroke="rgba(0,0,0,0.1)"
              strokeWidth="0.5"
            />
          </svg>
        </div>
      ))}

      {/* Ground with fallen leaves */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-amber-600 to-transparent" />

      <p className="absolute top-4 right-4 text-amber-800 text-sm font-medium">
        Autumn Breeze
      </p>
    </div>
  );
};

// --- MORNING DEW ---
export const MorningDew = () => {
  const [droplets, setDroplets] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    opacity: number;
    growing: boolean;
  }>>([]);

  useEffect(() => {
    // Initialize droplets
    const initialDroplets = [...Array(20)].map((_, i) => ({
      id: i,
      x: Math.random() * 90 + 5,
      y: Math.random() * 90 + 5,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.3 + 0.3,
      growing: Math.random() > 0.5,
    }));
    setDroplets(initialDroplets);

    // Slowly grow/shrink droplets
    const interval = setInterval(() => {
      setDroplets(prev => prev.map(d => {
        let newSize = d.size + (d.growing ? 0.1 : -0.05);
        let newGrowing = d.growing;

        if (newSize > 8) {
          newGrowing = false;
        } else if (newSize < 1) {
          newGrowing = true;
          newSize = 1;
        }

        return {
          ...d,
          size: newSize,
          opacity: Math.min(0.8, 0.3 + newSize * 0.05),
          growing: newGrowing,
        };
      }));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full bg-gradient-to-br from-green-700 to-green-900 relative overflow-hidden">
      {/* Leaf surface texture */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      />

      {/* Central leaf vein */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path
          d="M 50 10 L 50 90"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="0.5"
        />
        {[20, 35, 50, 65, 80].map((y, i) => (
          <g key={i}>
            <path
              d={`M 50 ${y} Q ${30 - i * 2} ${y + 5} ${10 + i * 3} ${y + 10}`}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="0.3"
            />
            <path
              d={`M 50 ${y} Q ${70 + i * 2} ${y + 5} ${90 - i * 3} ${y + 10}`}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="0.3"
            />
          </g>
        ))}
      </svg>

      {/* Dew droplets */}
      {droplets.map(d => (
        <div
          key={d.id}
          className="absolute rounded-full transition-all duration-300"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.size * 4,
            height: d.size * 4,
            background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,${d.opacity + 0.3}), rgba(200,255,255,${d.opacity}) 50%, rgba(100,200,150,${d.opacity * 0.5}))`,
            boxShadow: `
              0 ${d.size}px ${d.size * 2}px rgba(0,0,0,0.2),
              inset 0 -${d.size}px ${d.size}px rgba(0,0,0,0.1),
              0 0 ${d.size * 2}px rgba(255,255,255,0.1)
            `,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {/* Highlight */}
          <div
            className="absolute rounded-full bg-white"
            style={{
              width: d.size * 1.2,
              height: d.size * 0.8,
              top: '15%',
              left: '20%',
              opacity: 0.6,
            }}
          />
        </div>
      ))}

      <p className="absolute bottom-4 left-4 text-green-200 text-sm font-medium">
        Fresh Morning Dew
      </p>
    </div>
  );
};

// --- SUNFLOWER TRACK ---
export const SunflowerTrack = () => {
  const [sunPosition, setSunPosition] = useState({ x: 50, y: 30 });
  const [flowerRotation, setFlowerRotation] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSunPosition({ x, y });

    // Calculate rotation towards sun
    const flowerX = 50;
    const flowerY = 75;
    const angle = Math.atan2(y - flowerY, x - flowerX) * (180 / Math.PI) + 90;
    setFlowerRotation(Math.max(-45, Math.min(45, angle)));
  };

  return (
    <div
      ref={containerRef}
      className="h-full bg-gradient-to-b from-sky-400 to-sky-200 relative overflow-hidden cursor-none"
      onMouseMove={handleMouseMove}
    >
      {/* Sun (follows cursor) */}
      <div
        className="absolute w-16 h-16 transition-all duration-100 pointer-events-none"
        style={{
          left: `${sunPosition.x}%`,
          top: `${sunPosition.y}%`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="w-full h-full rounded-full bg-yellow-300 shadow-[0_0_30px_10px_rgba(253,224,71,0.4)]" />
        {/* Sun rays */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 w-1 h-6 bg-yellow-300 origin-bottom"
            style={{
              transform: `translate(-50%, -100%) rotate(${i * 45}deg) translateY(-30px)`,
            }}
          />
        ))}
      </div>

      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-green-600 to-green-500" />

      {/* Sunflower */}
      <div
        className="absolute bottom-16 left-1/2 transition-transform duration-300 ease-out"
        style={{
          transform: `translateX(-50%) rotate(${flowerRotation}deg)`,
          transformOrigin: 'bottom center',
        }}
      >
        {/* Stem */}
        <div className="absolute bottom-0 left-1/2 w-3 h-32 bg-green-600 -translate-x-1/2 rounded-full" />

        {/* Leaves on stem */}
        <svg className="absolute bottom-8 left-1/2 -translate-x-1/2" viewBox="0 0 60 40" width="60" height="40">
          <ellipse cx="10" cy="20" rx="15" ry="8" fill="#22c55e" transform="rotate(-30 10 20)" />
          <ellipse cx="50" cy="20" rx="15" ry="8" fill="#22c55e" transform="rotate(30 50 20)" />
        </svg>

        {/* Flower head */}
        <div className="relative -top-32 left-1/2 -translate-x-1/2">
          {/* Petals */}
          {[...Array(16)].map((_, i) => (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 w-4 h-10 bg-yellow-400 rounded-full origin-bottom"
              style={{
                transform: `translate(-50%, -100%) rotate(${i * 22.5}deg)`,
              }}
            />
          ))}
          {/* Center */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-amber-800">
            {/* Seeds pattern */}
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1.5 h-1.5 bg-amber-950 rounded-full"
                style={{
                  left: `${25 + Math.random() * 50}%`,
                  top: `${25 + Math.random() * 50}%`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <p className="absolute top-4 left-4 text-sky-800 text-sm font-medium">
        Move cursor to guide the sun
      </p>
    </div>
  );
};

// --- ROOT SYSTEM ---
export const RootSystem = () => {
  const [growthLevel, setGrowthLevel] = useState(0);
  const [nutrients, setNutrients] = useState<Array<{ id: number; x: number; y: number; collected: boolean }>>([]);

  useEffect(() => {
    // Initialize nutrient dots
    const initialNutrients = [...Array(12)].map((_, i) => ({
      id: i,
      x: 20 + Math.random() * 60,
      y: 60 + Math.random() * 35,
      collected: false,
    }));
    setNutrients(initialNutrients);

    // Grow roots over time
    const interval = setInterval(() => {
      setGrowthLevel(g => Math.min(100, g + 1));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Collect nutrients when roots reach them
  useEffect(() => {
    setNutrients(prev => prev.map(n => ({
      ...n,
      collected: growthLevel > (n.y - 50) * 2,
    })));
  }, [growthLevel]);

  const collectedCount = nutrients.filter(n => n.collected).length;

  return (
    <div className="h-full relative overflow-hidden">
      {/* Above ground - grass */}
      <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-sky-300 to-green-400" />

      {/* Ground line */}
      <div className="absolute top-1/3 left-0 right-0 h-2 bg-green-700" />

      {/* Underground - soil */}
      <div
        className="absolute top-1/3 left-0 right-0 bottom-0"
        style={{
          background: 'linear-gradient(to bottom, #78350f, #451a03, #1c0a00)'
        }}
      >
        {/* Soil texture */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-amber-900/30"
            style={{
              width: Math.random() * 8 + 2,
              height: Math.random() * 8 + 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Plant above ground */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-full">
        <svg viewBox="0 0 60 80" width="60" height="80">
          <path d="M 30 80 L 30 40" stroke="#22c55e" strokeWidth="4" />
          <ellipse cx="15" cy="30" rx="12" ry="20" fill="#22c55e" transform="rotate(-20 15 30)" />
          <ellipse cx="45" cy="30" rx="12" ry="20" fill="#22c55e" transform="rotate(20 45 30)" />
          <ellipse cx="30" cy="15" rx="10" ry="18" fill="#16a34a" />
        </svg>
      </div>

      {/* Root system */}
      <svg
        className="absolute top-1/3 left-0 w-full h-2/3"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {/* Main tap root */}
        <path
          d={`M 50 0 L 50 ${growthLevel * 0.8}`}
          fill="none"
          stroke="#f5d0a9"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Secondary roots */}
        {growthLevel > 20 && (
          <>
            <path
              d={`M 50 20 Q 30 30 ${50 - growthLevel * 0.3} ${30 + growthLevel * 0.2}`}
              fill="none"
              stroke="#f5d0a9"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <path
              d={`M 50 20 Q 70 30 ${50 + growthLevel * 0.3} ${30 + growthLevel * 0.2}`}
              fill="none"
              stroke="#f5d0a9"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </>
        )}

        {/* Tertiary roots */}
        {growthLevel > 40 && (
          <>
            <path
              d={`M 50 40 Q 25 50 ${50 - growthLevel * 0.4} ${50 + growthLevel * 0.15}`}
              fill="none"
              stroke="#f5d0a9"
              strokeWidth="0.8"
              strokeLinecap="round"
            />
            <path
              d={`M 50 40 Q 75 50 ${50 + growthLevel * 0.4} ${50 + growthLevel * 0.15}`}
              fill="none"
              stroke="#f5d0a9"
              strokeWidth="0.8"
              strokeLinecap="round"
            />
          </>
        )}

        {/* Fine root hairs */}
        {growthLevel > 60 && [...Array(8)].map((_, i) => (
          <path
            key={i}
            d={`M ${30 + i * 5} ${60 + (i % 3) * 10} q ${(i % 2 ? 5 : -5)} 5 ${(i % 2 ? 8 : -8)} 10`}
            fill="none"
            stroke="#f5d0a9"
            strokeWidth="0.5"
            strokeLinecap="round"
            opacity={Math.min(1, (growthLevel - 60) / 20)}
          />
        ))}
      </svg>

      {/* Nutrients */}
      {nutrients.map(n => (
        <div
          key={n.id}
          className={`absolute w-3 h-3 rounded-full transition-all duration-500 ${
            n.collected ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
          }`}
          style={{
            left: `${n.x}%`,
            top: `${n.y}%`,
            background: 'radial-gradient(circle, #22c55e, #15803d)',
            boxShadow: '0 0 8px rgba(34, 197, 94, 0.6)',
          }}
        />
      ))}

      {/* Stats */}
      <div className="absolute bottom-4 left-4 text-amber-200 text-sm font-mono">
        <p>Depth: {Math.floor(growthLevel * 0.8)}cm</p>
        <p>Nutrients: {collectedCount}/{nutrients.length}</p>
      </div>
    </div>
  );
};

// --- GARDEN BEETLE ---
export const GardenBeetle = () => {
  const [position, setPosition] = useState({ x: 20, y: 50 });
  const [rotation, setRotation] = useState(0);
  const [legPhase, setLegPhase] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef<number | undefined>(undefined);
  const targetRef = useRef({ x: 80, y: 50 });

  useEffect(() => {
    let time = 0;
    const animate = () => {
      time += 0.016;

      if (!isPaused) {
        // Move towards target
        const dx = targetRef.current.x - position.x;
        const dy = targetRef.current.y - position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 2) {
          const speed = 0.3;
          setPosition(p => ({
            x: p.x + (dx / distance) * speed,
            y: p.y + (dy / distance) * speed,
          }));
          setRotation(Math.atan2(dy, dx) * (180 / Math.PI));
          setLegPhase(p => (p + 0.3) % (Math.PI * 2));
        } else {
          // Pick new random target
          targetRef.current = {
            x: 10 + Math.random() * 80,
            y: 20 + Math.random() * 60,
          };
          // Random pause
          if (Math.random() > 0.7) {
            setIsPaused(true);
            setTimeout(() => setIsPaused(false), 500 + Math.random() * 1000);
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPaused, position.x, position.y]);

  return (
    <div className="h-full bg-gradient-to-b from-green-600 to-green-800 relative overflow-hidden">
      {/* Leaf texture background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 0%, transparent 20%),
            radial-gradient(circle at 80% 70%, rgba(255,255,255,0.1) 0%, transparent 20%),
            radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 30%)
          `
        }}
      />

      {/* Leaf veins */}
      <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100">
        <path d="M 0 50 L 100 50" stroke="white" strokeWidth="0.5" />
        <path d="M 50 0 L 50 100" stroke="white" strokeWidth="0.3" />
        {[20, 40, 60, 80].map(x => (
          <path key={x} d={`M ${x} 50 L ${x < 50 ? x - 20 : x + 20} ${x < 50 ? 30 : 70}`} stroke="white" strokeWidth="0.2" />
        ))}
      </svg>

      {/* Beetle */}
      <div
        className="absolute transition-transform duration-75"
        style={{
          left: `${position.x}%`,
          top: `${position.y}%`,
          transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
        }}
      >
        <svg viewBox="0 0 40 50" className="w-10 h-12">
          {/* Legs */}
          {[0, 1, 2].map(i => {
            const offset = Math.sin(legPhase + i * 1.5) * 3;
            return (
              <g key={i}>
                {/* Left leg */}
                <path
                  d={`M 10 ${18 + i * 8} Q 0 ${18 + i * 8 + offset} -5 ${20 + i * 8 + offset}`}
                  fill="none"
                  stroke="#1e1e1e"
                  strokeWidth="1.5"
                />
                {/* Right leg */}
                <path
                  d={`M 30 ${18 + i * 8} Q 40 ${18 + i * 8 - offset} 45 ${20 + i * 8 - offset}`}
                  fill="none"
                  stroke="#1e1e1e"
                  strokeWidth="1.5"
                />
              </g>
            );
          })}

          {/* Body */}
          <ellipse cx="20" cy="30" rx="12" ry="18" fill="#2d5016" />

          {/* Shell pattern */}
          <path d="M 20 12 L 20 48" stroke="#1a3009" strokeWidth="1" />
          <ellipse cx="15" cy="25" rx="3" ry="4" fill="#fbbf24" opacity="0.8" />
          <ellipse cx="25" cy="25" rx="3" ry="4" fill="#fbbf24" opacity="0.8" />
          <ellipse cx="15" cy="35" rx="2" ry="3" fill="#fbbf24" opacity="0.6" />
          <ellipse cx="25" cy="35" rx="2" ry="3" fill="#fbbf24" opacity="0.6" />

          {/* Head */}
          <ellipse cx="20" cy="10" rx="6" ry="5" fill="#1e1e1e" />

          {/* Antennae */}
          <path d="M 16 7 Q 12 2 10 0" fill="none" stroke="#1e1e1e" strokeWidth="1" />
          <path d="M 24 7 Q 28 2 30 0" fill="none" stroke="#1e1e1e" strokeWidth="1" />
        </svg>
      </div>

      <p className="absolute bottom-4 right-4 text-green-200 text-sm font-medium">
        {isPaused ? 'Resting...' : 'Exploring'}
      </p>
    </div>
  );
};

// --- SEED GERMINATION ---
export const SeedGermination = () => {
  const [stage, setStage] = useState(0); // 0-100
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setStage(s => {
        if (s >= 100) {
          setIsPlaying(false);
          return 100;
        }
        return s + 0.5;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleReset = () => {
    setStage(0);
    setIsPlaying(true);
  };

  // Growth stages
  const seedCrack = Math.min(1, stage / 15);
  const rootGrowth = Math.max(0, Math.min(1, (stage - 15) / 25));
  const stemGrowth = Math.max(0, Math.min(1, (stage - 40) / 30));
  const leafGrowth = Math.max(0, Math.min(1, (stage - 70) / 30));

  return (
    <div className="h-full relative overflow-hidden">
      {/* Sky */}
      <div
        className="absolute top-0 left-0 right-0 h-1/3 transition-colors duration-1000"
        style={{
          background: stage > 70
            ? 'linear-gradient(to bottom, #38bdf8, #7dd3fc)'
            : 'linear-gradient(to bottom, #1e293b, #334155)'
        }}
      >
        {/* Sun appearing */}
        {stage > 70 && (
          <div
            className="absolute top-4 right-8 w-12 h-12 rounded-full bg-yellow-300 transition-all duration-1000"
            style={{
              opacity: leafGrowth,
              boxShadow: '0 0 40px 10px rgba(253, 224, 71, 0.5)',
            }}
          />
        )}
      </div>

      {/* Ground level */}
      <div className="absolute top-1/3 left-0 right-0 h-2 bg-green-800" />

      {/* Soil */}
      <div
        className="absolute top-1/3 left-0 right-0 bottom-0"
        style={{
          background: 'linear-gradient(to bottom, #78350f, #451a03)'
        }}
      />

      {/* The seed/plant */}
      <svg
        className="absolute left-1/2 -translate-x-1/2"
        style={{ top: '33%', transform: 'translateX(-50%) translateY(-50%)' }}
        viewBox="0 0 100 150"
        width="150"
        height="225"
      >
        {/* Underground root */}
        {rootGrowth > 0 && (
          <g opacity={rootGrowth}>
            <path
              d={`M 50 60 L 50 ${60 + rootGrowth * 50}`}
              fill="none"
              stroke="#f5d0a9"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {rootGrowth > 0.5 && (
              <>
                <path
                  d={`M 50 80 Q 35 90 ${30 + (1 - rootGrowth) * 20} ${90 + rootGrowth * 20}`}
                  fill="none"
                  stroke="#f5d0a9"
                  strokeWidth="1"
                />
                <path
                  d={`M 50 80 Q 65 90 ${70 - (1 - rootGrowth) * 20} ${90 + rootGrowth * 20}`}
                  fill="none"
                  stroke="#f5d0a9"
                  strokeWidth="1"
                />
              </>
            )}
          </g>
        )}

        {/* Seed */}
        <g transform="translate(50, 55)">
          {/* Seed shell - splits open */}
          <ellipse
            cx={-seedCrack * 5}
            cy="0"
            rx="10"
            ry="6"
            fill="#8B4513"
            transform={`rotate(${-seedCrack * 20})`}
          />
          <ellipse
            cx={seedCrack * 5}
            cy="0"
            rx="10"
            ry="6"
            fill="#8B4513"
            transform={`rotate(${seedCrack * 20})`}
          />
        </g>

        {/* Stem growing upward */}
        {stemGrowth > 0 && (
          <path
            d={`M 50 55 Q 48 ${55 - stemGrowth * 30} 50 ${55 - stemGrowth * 55}`}
            fill="none"
            stroke="#22c55e"
            strokeWidth="3"
            strokeLinecap="round"
          />
        )}

        {/* Cotyledons (seed leaves) */}
        {leafGrowth > 0 && (
          <g transform={`translate(50, ${55 - stemGrowth * 55})`} opacity={leafGrowth}>
            {/* Left cotyledon */}
            <ellipse
              cx={-8 * leafGrowth}
              cy={-5 * leafGrowth}
              rx={12 * leafGrowth}
              ry={6 * leafGrowth}
              fill="#4ade80"
              transform={`rotate(-30)`}
            />
            {/* Right cotyledon */}
            <ellipse
              cx={8 * leafGrowth}
              cy={-5 * leafGrowth}
              rx={12 * leafGrowth}
              ry={6 * leafGrowth}
              fill="#4ade80"
              transform={`rotate(30)`}
            />
            {/* True leaves emerging */}
            {leafGrowth > 0.7 && (
              <ellipse
                cx="0"
                cy={-15 * (leafGrowth - 0.7) / 0.3}
                rx={5 * (leafGrowth - 0.7) / 0.3}
                ry={10 * (leafGrowth - 0.7) / 0.3}
                fill="#16a34a"
              />
            )}
          </g>
        )}
      </svg>

      {/* Timeline indicator */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-amber-200 text-xs font-mono">Day {Math.floor(stage / 10)}</span>
          <div className="flex-1 h-2 bg-amber-900 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-100"
              style={{ width: `${stage}%` }}
            />
          </div>
        </div>
        <div className="flex justify-between text-amber-300 text-xs font-mono">
          <span className={stage >= 0 ? 'opacity-100' : 'opacity-30'}>Seed</span>
          <span className={stage >= 15 ? 'opacity-100' : 'opacity-30'}>Root</span>
          <span className={stage >= 40 ? 'opacity-100' : 'opacity-30'}>Stem</span>
          <span className={stage >= 70 ? 'opacity-100' : 'opacity-30'}>Leaves</span>
          <span className={stage >= 100 ? 'opacity-100' : 'opacity-30'}>Sprout</span>
        </div>
      </div>

      {/* Reset button */}
      {stage >= 100 && (
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 px-3 py-1 bg-green-600 text-white text-sm rounded-full hover:bg-green-700 transition-colors"
        >
          Replay
        </button>
      )}
    </div>
  );
};

export const organicComponents = {
  'worn-leather-card': WornLeatherCard,
  'moss-growth-bar': MossGrowthBar,
  'water-ripple-button': WaterRippleButton,
  'woven-cloth-layout': WovenClothLayout,
  'origami-menu': OrigamiMenu,
  'burnt-edge-note': BurntEdgeNote,
  'vine-border': VineBorder,
  // NarrativeDemos components
  'weather-sync': WeatherSync,
  // TextureDemos components
  'tapestry-map': TapestryMap,
  'weather-vane-sort': WeatherVaneSort,
  // Garden Zone components
  'growing-vine': GrowingVine,
  'blooming-flower': BloomingFlower,
  'pollen-drift': PollenDrift,
  'butterfly-path': ButterflyPath,
  'leaf-fall': LeafFall,
  'morning-dew': MorningDew,
  'sunflower-track': SunflowerTrack,
  'root-system': RootSystem,
  'garden-beetle': GardenBeetle,
  'seed-germination': SeedGermination,
};
