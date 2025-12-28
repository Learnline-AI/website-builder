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
      'bg-black'
    }`}>
      {/* Dynamic Backgrounds */}
      {weather === 'sunny' && (
        <div className="absolute top-10 left-10 w-24 h-24 bg-yellow-300 rounded-full shadow-[0_0_50px_yellow] animate-pulse"></div>
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
};
