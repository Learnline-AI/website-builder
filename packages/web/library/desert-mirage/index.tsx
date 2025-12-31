import React, { useState, useEffect } from 'react';

// Colors: sand (#e9c46a), terracotta (#d4a373), deep orange (#e76f51), night blue (#264653), oasis teal (#2a9d8f)

// --- DESERT DUNE BUTTON ---
export const DesertDuneButton = () => {
  const [pressed, setPressed] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: 'linear-gradient(180deg, #f4e4bc 0%, #e9c46a 100%)' }}>
      <button
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        onMouseLeave={() => { setPressed(false); setHovered(false); }}
        onMouseEnter={() => setHovered(true)}
        className="relative px-10 py-4 overflow-hidden transition-all duration-300"
        style={{
          background: 'transparent',
          border: 'none',
          transform: pressed ? 'scale(0.98)' : 'scale(1)',
        }}
      >
        {/* Sand dune wave SVG shape */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 180 60"
          preserveAspectRatio="none"
        >
          {/* Back dune shadow */}
          <path
            d="M0,35 Q30,15 60,30 T120,25 T180,35 L180,60 L0,60 Z"
            fill="#d4a373"
            style={{
              transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
              transition: 'transform 0.3s ease',
            }}
          />
          {/* Front dune */}
          <path
            d="M0,40 Q45,20 90,35 T180,40 L180,60 L0,60 Z"
            fill={pressed ? '#c4956a' : '#e9c46a'}
            style={{
              filter: pressed ? 'none' : 'drop-shadow(0 4px 6px rgba(0,0,0,0.15))',
            }}
          />
          {/* Sand texture dots */}
          {[...Array(20)].map((_, i) => (
            <circle
              key={i}
              cx={10 + (i % 10) * 18}
              cy={45 + Math.sin(i) * 5}
              r="1"
              fill="#d4a373"
              opacity="0.4"
            />
          ))}
        </svg>
        <span className="relative z-10 font-semibold tracking-wide" style={{ color: '#264653' }}>
          Journey
        </span>
      </button>
    </div>
  );
};

// --- DESERT OASIS CARD ---
export const DesertOasisCard = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: 'linear-gradient(180deg, #264653 0%, #1a3a47 100%)' }}>
      <div
        className="relative w-64 h-44 rounded-xl overflow-hidden cursor-pointer transition-all duration-500"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          background: 'linear-gradient(180deg, #87ceeb 0%, #e9c46a 50%, #d4a373 100%)',
          boxShadow: isHovered
            ? '0 20px 40px rgba(0,0,0,0.4), 0 0 30px rgba(42,157,143,0.3)'
            : '0 10px 30px rgba(0,0,0,0.3)',
          transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        }}
      >
        {/* Sun */}
        <div
          className="absolute w-12 h-12 rounded-full transition-all duration-500"
          style={{
            top: isHovered ? '8px' : '12px',
            right: '20px',
            background: 'radial-gradient(circle, #fff 0%, #e76f51 60%, #d4a373 100%)',
            boxShadow: '0 0 30px rgba(231,111,81,0.6)',
          }}
        />

        {/* Distant dunes */}
        <svg className="absolute bottom-12 left-0 right-0" viewBox="0 0 256 40" preserveAspectRatio="none">
          <path d="M0,40 Q40,20 80,30 T160,25 T256,35 L256,40 Z" fill="#d4a373" opacity="0.6" />
        </svg>

        {/* Oasis water */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 w-20 h-6 rounded-full transition-all duration-500"
          style={{
            background: 'linear-gradient(180deg, #2a9d8f 0%, #1a7d6f 100%)',
            boxShadow: '0 2px 10px rgba(42,157,143,0.5)',
            transform: isHovered ? 'translateX(-50%) scale(1.1)' : 'translateX(-50%) scale(1)',
          }}
        >
          {/* Water ripples */}
          <div className="absolute inset-0 rounded-full opacity-50" style={{
            background: 'repeating-radial-gradient(circle at center, transparent 0px, transparent 4px, rgba(255,255,255,0.3) 4px, rgba(255,255,255,0.3) 5px)',
          }} />
        </div>

        {/* Palm trees */}
        <svg className="absolute bottom-4 left-1/2 -translate-x-1/2" width="60" height="50" viewBox="0 0 60 50">
          {/* Palm trunk */}
          <path d="M30,50 Q28,35 30,20" stroke="#8b5a2b" strokeWidth="3" fill="none" />
          {/* Palm fronds */}
          <path d="M30,22 Q20,15 8,18" stroke="#2a9d8f" strokeWidth="2" fill="none" />
          <path d="M30,22 Q25,10 15,5" stroke="#2a9d8f" strokeWidth="2" fill="none" />
          <path d="M30,22 Q35,10 45,5" stroke="#2a9d8f" strokeWidth="2" fill="none" />
          <path d="M30,22 Q40,15 52,18" stroke="#2a9d8f" strokeWidth="2" fill="none" />
          <path d="M30,22 Q30,8 30,0" stroke="#2a9d8f" strokeWidth="2" fill="none" />
        </svg>

        {/* Card content */}
        <div className="absolute bottom-0 left-0 right-0 p-3" style={{ background: 'linear-gradient(0deg, rgba(38,70,83,0.9) 0%, transparent 100%)' }}>
          <p className="text-white text-sm font-medium">Desert Oasis</p>
          <p className="text-white/60 text-xs">A haven in the sand</p>
        </div>
      </div>
    </div>
  );
};

// --- DESERT SAND INPUT ---
export const DesertSandInput = () => {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: 'linear-gradient(180deg, #e9c46a 0%, #d4a373 100%)' }}>
      <div className="relative w-64">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Enter destination..."
          className="w-full px-4 py-3 rounded-lg outline-none transition-all duration-300"
          style={{
            background: 'linear-gradient(145deg, #f5e6c8 0%, #e9d4a8 100%)',
            border: focused ? '2px solid #2a9d8f' : '2px solid #d4a373',
            boxShadow: focused
              ? '0 4px 20px rgba(42,157,143,0.3), inset 0 2px 4px rgba(0,0,0,0.05)'
              : 'inset 0 2px 4px rgba(0,0,0,0.1)',
            color: '#264653',
          }}
        />
        {/* Sand grain texture overlay */}
        <div
          className="absolute inset-0 rounded-lg pointer-events-none opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 30%, #d4a373 1px, transparent 1px),
                              radial-gradient(circle at 60% 70%, #d4a373 1px, transparent 1px),
                              radial-gradient(circle at 80% 20%, #d4a373 1px, transparent 1px),
                              radial-gradient(circle at 40% 80%, #d4a373 1px, transparent 1px)`,
            backgroundSize: '20px 20px, 25px 25px, 15px 15px, 30px 30px',
          }}
        />
        {/* Wind effect on focus */}
        {focused && (
          <div className="absolute -right-2 top-1/2 -translate-y-1/2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-4 h-0.5 rounded-full mb-1 animate-pulse"
                style={{
                  background: '#e9c46a',
                  animationDelay: `${i * 0.2}s`,
                  opacity: 0.6 - i * 0.15,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// --- DESERT SUN BADGE ---
export const DesertSunBadge = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#264653' }}>
      <div
        className="relative cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Sun rays */}
        <svg
          className="absolute -inset-6"
          viewBox="0 0 100 100"
          style={{
            transform: isHovered ? 'rotate(15deg) scale(1.1)' : 'rotate(0deg) scale(1)',
            transition: 'transform 0.5s ease',
          }}
        >
          {[...Array(12)].map((_, i) => (
            <line
              key={i}
              x1="50"
              y1="10"
              x2="50"
              y2="20"
              stroke="#e76f51"
              strokeWidth="3"
              strokeLinecap="round"
              transform={`rotate(${i * 30} 50 50)`}
              style={{
                opacity: isHovered ? 1 : 0.7,
                transition: 'opacity 0.3s',
              }}
            />
          ))}
        </svg>

        {/* Sun circle badge */}
        <div
          className="relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            background: isHovered
              ? 'radial-gradient(circle, #fff 0%, #e76f51 40%, #d4a373 100%)'
              : 'radial-gradient(circle, #e76f51 0%, #d4a373 100%)',
            boxShadow: isHovered
              ? '0 0 40px rgba(231,111,81,0.8), 0 0 60px rgba(231,111,81,0.4)'
              : '0 0 20px rgba(231,111,81,0.5)',
          }}
        >
          <span className="text-white font-bold text-lg" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
            HOT
          </span>
        </div>
      </div>
    </div>
  );
};

// --- DESERT DAY NIGHT TOGGLE ---
export const DesertDayNightToggle = () => {
  const [isNight, setIsNight] = useState(false);

  return (
    <div
      className="h-full flex items-center justify-center p-6 transition-all duration-700"
      style={{
        background: isNight
          ? 'linear-gradient(180deg, #0a1628 0%, #264653 100%)'
          : 'linear-gradient(180deg, #87ceeb 0%, #e9c46a 100%)',
      }}
    >
      <button
        onClick={() => setIsNight(!isNight)}
        className="relative w-24 h-12 rounded-full overflow-hidden transition-all duration-500"
        style={{
          background: isNight
            ? 'linear-gradient(180deg, #1a3a47 0%, #264653 100%)'
            : 'linear-gradient(180deg, #e9c46a 0%, #d4a373 100%)',
          boxShadow: isNight
            ? '0 4px 20px rgba(0,0,0,0.4), inset 0 2px 10px rgba(0,0,0,0.3)'
            : '0 4px 20px rgba(231,111,81,0.3), inset 0 2px 10px rgba(255,255,255,0.2)',
        }}
      >
        {/* Desert silhouette */}
        <svg className="absolute bottom-0 left-0 right-0 h-4" viewBox="0 0 96 16" preserveAspectRatio="none">
          <path
            d="M0,16 Q15,8 30,12 T60,10 T96,14 L96,16 Z"
            fill={isNight ? '#0a1628' : '#d4a373'}
          />
        </svg>

        {/* Stars (night only) */}
        {isNight && (
          <>
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-white animate-pulse"
                style={{
                  top: 4 + Math.random() * 20,
                  left: 5 + i * 10,
                  animationDelay: `${i * 0.3}s`,
                  opacity: 0.6 + Math.random() * 0.4,
                }}
              />
            ))}
          </>
        )}

        {/* Sun/Moon toggle knob */}
        <div
          className="absolute top-1 w-10 h-10 rounded-full transition-all duration-500 flex items-center justify-center"
          style={{
            left: isNight ? 'calc(100% - 44px)' : '4px',
            background: isNight
              ? 'linear-gradient(135deg, #f5f5dc 0%, #c0c0c0 100%)'
              : 'linear-gradient(135deg, #fff 0%, #e76f51 100%)',
            boxShadow: isNight
              ? '0 0 20px rgba(245,245,220,0.4)'
              : '0 0 20px rgba(231,111,81,0.6)',
          }}
        >
          {/* Moon craters (night) / Sun rays (day) */}
          {isNight ? (
            <>
              <div className="absolute w-2 h-2 rounded-full bg-gray-300/50" style={{ top: '25%', left: '30%' }} />
              <div className="absolute w-1.5 h-1.5 rounded-full bg-gray-300/40" style={{ top: '50%', left: '55%' }} />
            </>
          ) : (
            <div className="text-lg">&#9728;</div>
          )}
        </div>
      </button>
    </div>
  );
};

// --- DESERT CARAVAN PROGRESS ---
export const DesertCaravanProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => (p >= 100 ? 0 : p + 1));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex flex-col items-center justify-center p-6" style={{ background: 'linear-gradient(180deg, #e9c46a 0%, #d4a373 100%)' }}>
      <div className="relative w-64 h-20">
        {/* Desert ground */}
        <div className="absolute bottom-0 left-0 right-0 h-8 rounded-lg overflow-hidden">
          {/* Dune pattern */}
          <svg className="w-full h-full" viewBox="0 0 256 32" preserveAspectRatio="none">
            <path d="M0,32 Q30,20 60,28 T120,24 T180,28 T256,32 L256,32 L0,32 Z" fill="#c4956a" />
            <path d="M0,32 Q40,24 80,30 T160,26 T256,32 L256,32 L0,32 Z" fill="#d4a373" />
          </svg>
        </div>

        {/* Progress track */}
        <div className="absolute bottom-8 left-4 right-4 h-0.5 bg-[#264653]/30 rounded" />

        {/* Camel caravan */}
        <svg
          className="absolute bottom-6 transition-all duration-100"
          style={{ left: `${progress}%`, transform: 'translateX(-50%)' }}
          width="40"
          height="32"
          viewBox="0 0 40 32"
        >
          {/* Camel body */}
          <ellipse cx="20" cy="20" rx="12" ry="6" fill="#8b5a2b" />
          {/* Hump */}
          <ellipse cx="18" cy="14" rx="5" ry="6" fill="#8b5a2b" />
          {/* Neck */}
          <path d="M28,18 Q32,12 30,6" stroke="#8b5a2b" strokeWidth="4" fill="none" />
          {/* Head */}
          <ellipse cx="30" cy="5" rx="4" ry="3" fill="#8b5a2b" />
          {/* Legs */}
          <line x1="12" y1="24" x2="10" y2="30" stroke="#6b4423" strokeWidth="2" />
          <line x1="16" y1="24" x2="15" y2="30" stroke="#6b4423" strokeWidth="2" />
          <line x1="24" y1="24" x2="25" y2="30" stroke="#6b4423" strokeWidth="2" />
          <line x1="28" y1="24" x2="30" y2="30" stroke="#6b4423" strokeWidth="2" />
          {/* Cargo */}
          <rect x="14" y="8" width="8" height="6" rx="1" fill="#d4a373" />
        </svg>

        {/* Oasis destination marker */}
        <div className="absolute right-0 bottom-4">
          <div className="w-3 h-3 rounded-full bg-[#2a9d8f]" style={{ boxShadow: '0 0 8px rgba(42,157,143,0.6)' }} />
        </div>
      </div>

      {/* Progress text */}
      <div className="mt-4 text-center">
        <span className="font-mono text-sm" style={{ color: '#264653' }}>{progress}% to oasis</span>
      </div>
    </div>
  );
};

// --- DESERT SHIMMER LOADER ---
export const DesertShimmerLoader = () => {
  const [shimmerOffset, setShimmerOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setShimmerOffset(o => (o + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: 'linear-gradient(180deg, #87ceeb 0%, #e9c46a 60%, #d4a373 100%)' }}>
      <div className="relative w-48 h-24">
        {/* Horizon line */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-[#d4a373]" />

        {/* Heat shimmer effect */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute h-full w-4"
              style={{
                left: `${i * 12.5}%`,
                background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                transform: `translateY(${Math.sin((shimmerOffset + i * 20) * 0.1) * 8}px) scaleY(${1 + Math.sin((shimmerOffset + i * 10) * 0.05) * 0.3})`,
                opacity: 0.4 + Math.sin((shimmerOffset + i * 15) * 0.08) * 0.3,
              }}
            />
          ))}
        </div>

        {/* Mirage palm trees (distorted) */}
        <svg
          className="absolute bottom-0 left-1/2 -translate-x-1/2 opacity-40"
          width="60"
          height="40"
          viewBox="0 0 60 40"
          style={{
            transform: `translateX(-50%) scaleY(${1 + Math.sin(shimmerOffset * 0.1) * 0.1})`,
            filter: 'blur(1px)',
          }}
        >
          <path d="M30,40 Q28,30 30,20" stroke="#2a9d8f" strokeWidth="2" fill="none" />
          <path d="M30,22 Q20,18 10,20" stroke="#2a9d8f" strokeWidth="1.5" fill="none" />
          <path d="M30,22 Q40,18 50,20" stroke="#2a9d8f" strokeWidth="1.5" fill="none" />
        </svg>

        {/* Loading text */}
        <div className="absolute bottom-0 left-0 right-0 text-center">
          <span className="text-sm font-mono" style={{ color: '#264653' }}>Loading mirage...</span>
        </div>
      </div>
    </div>
  );
};

// --- DESERT NOMAD AVATAR ---
export const DesertNomadAvatar = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#264653' }}>
      <div
        className="relative cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Keffiyeh/turban frame */}
        <svg
          className="absolute -inset-3 w-24 h-24"
          viewBox="0 0 96 96"
          style={{
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.3s ease',
          }}
        >
          {/* Outer keffiyeh drape */}
          <path
            d="M48,8 Q75,8 82,35 Q85,55 80,75 Q70,90 48,92 Q26,90 16,75 Q11,55 14,35 Q21,8 48,8"
            fill="none"
            stroke="#e9c46a"
            strokeWidth="4"
          />
          {/* Pattern detail */}
          <path
            d="M20,45 Q30,40 48,42 Q66,40 76,45"
            fill="none"
            stroke="#d4a373"
            strokeWidth="2"
            strokeDasharray="4 2"
          />
          {/* Agal (head rope) */}
          <ellipse cx="48" cy="18" rx="20" ry="4" fill="none" stroke="#264653" strokeWidth="3" />
        </svg>

        {/* Avatar circle */}
        <div
          className="relative w-16 h-16 rounded-full overflow-hidden transition-all duration-300"
          style={{
            background: 'linear-gradient(180deg, #d4a373 0%, #c4956a 100%)',
            boxShadow: isHovered
              ? '0 0 20px rgba(233,196,106,0.5)'
              : '0 4px 12px rgba(0,0,0,0.3)',
          }}
        >
          {/* Face placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl">&#128759;</span>
          </div>
        </div>

        {/* Status indicator */}
        <div
          className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#264653]"
          style={{ background: '#2a9d8f' }}
        />
      </div>
    </div>
  );
};

// --- DESERT TENT MODAL ---
export const DesertTentModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: 'linear-gradient(180deg, #264653 0%, #1a3a47 100%)' }}>
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 rounded-lg font-medium transition-all duration-300"
        style={{
          background: 'linear-gradient(180deg, #e9c46a 0%, #d4a373 100%)',
          color: '#264653',
          boxShadow: '0 4px 15px rgba(233,196,106,0.3)',
        }}
      >
        Enter Tent
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop - starry night sky */}
          <div
            className="absolute inset-0"
            onClick={() => setIsOpen(false)}
            style={{ background: 'rgba(10,22,40,0.95)' }}
          >
            {/* Stars */}
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-white animate-pulse"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  opacity: 0.3 + Math.random() * 0.7,
                }}
              />
            ))}
          </div>

          {/* Tent modal */}
          <div className="relative w-80 animate-in zoom-in duration-300">
            {/* Tent shape */}
            <svg className="absolute -top-12 left-0 right-0 h-16" viewBox="0 0 320 64" preserveAspectRatio="none">
              {/* Tent roof */}
              <path d="M0,64 L160,8 L320,64 Z" fill="#8b5a2b" />
              <path d="M0,64 L160,8 L320,64 Z" fill="url(#tentPattern)" />
              {/* Tent pole */}
              <line x1="160" y1="8" x2="160" y2="0" stroke="#5d3a1a" strokeWidth="4" />
              {/* Decorative tassels */}
              <circle cx="60" cy="48" r="3" fill="#e76f51" />
              <circle cx="260" cy="48" r="3" fill="#e76f51" />
              <defs>
                <pattern id="tentPattern" patternUnits="userSpaceOnUse" width="20" height="20">
                  <path d="M0,10 L10,0 L20,10 L10,20 Z" fill="none" stroke="#6b4423" strokeWidth="1" opacity="0.3" />
                </pattern>
              </defs>
            </svg>

            {/* Tent interior */}
            <div
              className="relative rounded-b-xl p-6 pt-8"
              style={{
                background: 'linear-gradient(180deg, #8b5a2b 0%, #5d3a1a 100%)',
                boxShadow: 'inset 0 10px 30px rgba(0,0,0,0.3)',
              }}
            >
              {/* Fabric drape pattern */}
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: 'repeating-linear-gradient(90deg, #d4a373 0px, #d4a373 2px, transparent 2px, transparent 20px)',
              }} />

              {/* Lantern glow */}
              <div
                className="absolute top-4 right-4 w-8 h-8 rounded-full"
                style={{
                  background: 'radial-gradient(circle, #e76f51 0%, transparent 70%)',
                  boxShadow: '0 0 20px rgba(231,111,81,0.5)',
                }}
              />

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2" style={{ color: '#e9c46a' }}>Welcome, Traveler</h3>
                <p className="text-sm mb-4" style={{ color: '#d4a373' }}>
                  Rest here from the desert sun. The caravan leaves at dawn.
                </p>

                {/* Decorative divider */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex-1 h-px bg-[#d4a373]/30" />
                  <span style={{ color: '#e76f51' }}>&#9670;</span>
                  <div className="flex-1 h-px bg-[#d4a373]/30" />
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2 rounded-lg font-medium transition-all"
                  style={{
                    background: 'linear-gradient(180deg, #2a9d8f 0%, #1a7d6f 100%)',
                    color: '#fff',
                  }}
                >
                  Continue Journey
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- DESERT COMPASS NAV ---
export const DesertCompassNav = () => {
  const [activeDirection, setActiveDirection] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);

  const directions = [
    { label: 'N', angle: 0, name: 'North' },
    { label: 'E', angle: 90, name: 'East' },
    { label: 'S', angle: 180, name: 'South' },
    { label: 'W', angle: 270, name: 'West' },
  ];

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#264653' }}>
      <div className="relative">
        {/* Compass body */}
        <div
          className="relative w-32 h-32 rounded-full"
          style={{
            background: 'linear-gradient(145deg, #d4a373 0%, #c4956a 100%)',
            boxShadow: '0 8px 30px rgba(0,0,0,0.4), inset 0 2px 10px rgba(255,255,255,0.2)',
            border: '4px solid #8b5a2b',
          }}
        >
          {/* Compass rose */}
          <svg
            className="absolute inset-2"
            viewBox="0 0 100 100"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: 'transform 0.5s ease-out',
            }}
          >
            {/* Main compass star */}
            <polygon
              points="50,10 55,45 90,50 55,55 50,90 45,55 10,50 45,45"
              fill="#264653"
            />
            {/* Inner detail */}
            <polygon
              points="50,25 53,45 75,50 53,55 50,75 47,55 25,50 47,45"
              fill="#e76f51"
            />
            {/* Center */}
            <circle cx="50" cy="50" r="6" fill="#e9c46a" />
          </svg>

          {/* Direction buttons */}
          {directions.map((dir) => (
            <button
              key={dir.label}
              onClick={() => {
                setActiveDirection(dir.label);
                setRotation(-dir.angle);
              }}
              className="absolute w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300"
              style={{
                top: dir.angle === 0 ? '2px' : dir.angle === 180 ? 'auto' : '50%',
                bottom: dir.angle === 180 ? '2px' : 'auto',
                left: dir.angle === 270 ? '2px' : dir.angle === 90 ? 'auto' : '50%',
                right: dir.angle === 90 ? '2px' : 'auto',
                transform: (dir.angle === 0 || dir.angle === 180) ? 'translateX(-50%)' : 'translateY(-50%)',
                background: activeDirection === dir.label ? '#e76f51' : 'transparent',
                color: activeDirection === dir.label ? '#fff' : '#264653',
              }}
            >
              {dir.label}
            </button>
          ))}
        </div>

        {/* Direction label */}
        {activeDirection && (
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-center">
            <span className="text-sm font-mono" style={{ color: '#e9c46a' }}>
              Heading: {directions.find(d => d.label === activeDirection)?.name}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

// --- DESERT HORIZON DIVIDER ---
export const DesertHorizonDivider = () => {
  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: 'linear-gradient(180deg, #87ceeb 0%, #e9c46a 100%)' }}>
      <div className="w-full max-w-md relative h-16">
        {/* Sun */}
        <div
          className="absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full"
          style={{
            top: '-5px',
            background: 'radial-gradient(circle, #fff 0%, #e76f51 50%, transparent 70%)',
            boxShadow: '0 0 30px rgba(231,111,81,0.6)',
          }}
        />

        {/* Dune silhouette layers */}
        <svg className="w-full h-full" viewBox="0 0 400 64" preserveAspectRatio="none">
          {/* Back dunes */}
          <path
            d="M0,40 Q50,25 100,35 T200,30 T300,35 T400,32 L400,40 L0,40 Z"
            fill="#d4a373"
            opacity="0.6"
          />
          {/* Mid dunes */}
          <path
            d="M0,45 Q60,30 120,40 T240,35 T360,42 T400,38 L400,50 L0,50 Z"
            fill="#d4a373"
            opacity="0.8"
          />
          {/* Front dunes */}
          <path
            d="M0,55 Q80,42 160,52 T320,48 T400,55 L400,64 L0,64 Z"
            fill="#c4956a"
          />
          {/* Ground line */}
          <line x1="0" y1="55" x2="400" y2="55" stroke="#8b5a2b" strokeWidth="1" opacity="0.5" />
        </svg>

        {/* Decorative elements */}
        <div className="absolute left-8 bottom-2 w-1 h-3" style={{ background: '#264653' }} />
        <div className="absolute right-12 bottom-2 w-1 h-2" style={{ background: '#264653' }} />
      </div>
    </div>
  );
};

// --- DESERT SANDSTORM ALERT ---
export const DesertSandstormAlert = () => {
  const [visible, setVisible] = useState(true);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number }[]>([]);

  useEffect(() => {
    const createParticles = () => {
      const newParticles = [...Array(20)].map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2 + Math.random() * 4,
      }));
      setParticles(newParticles);
    };
    createParticles();
    const interval = setInterval(createParticles, 2000);
    return () => clearInterval(interval);
  }, []);

  if (!visible) {
    return (
      <div className="h-full flex items-center justify-center p-6" style={{ background: '#264653' }}>
        <button onClick={() => setVisible(true)} className="text-[#e9c46a] hover:underline">
          Show alert
        </button>
      </div>
    );
  }

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#264653' }}>
      <div
        className="relative w-72 p-4 rounded-lg overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #e76f51 0%, #d4a373 100%)',
          boxShadow: '0 8px 30px rgba(231,111,81,0.4)',
        }}
      >
        {/* Swirling sand particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full animate-ping"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              background: '#e9c46a',
              opacity: 0.6,
              animationDuration: '1.5s',
            }}
          />
        ))}

        {/* Content */}
        <div className="relative z-10 flex items-start gap-3">
          {/* Warning icon */}
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(38,70,83,0.9)' }}
          >
            <span className="text-xl">&#9888;</span>
          </div>

          <div className="flex-1">
            <h4 className="font-bold text-white mb-1">Sandstorm Warning</h4>
            <p className="text-sm text-white/80">
              Seek shelter immediately. Visibility near zero.
            </p>
          </div>

          <button
            onClick={() => setVisible(false)}
            className="w-6 h-6 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10"
          >
            &times;
          </button>
        </div>

        {/* Animated sand line at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden">
          <div
            className="h-full w-[200%] animate-pulse"
            style={{
              background: 'linear-gradient(90deg, transparent, #e9c46a, #d4a373, #e9c46a, transparent)',
              animation: 'sandScroll 2s linear infinite',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes sandScroll {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
      `}</style>
    </div>
  );
};

// --- DESERT CACTUS ICON ---
export const DesertCactusIcon = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: 'linear-gradient(180deg, #e9c46a 0%, #d4a373 100%)' }}>
      <div
        className="relative cursor-pointer transition-transform duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}
      >
        <svg width="60" height="80" viewBox="0 0 60 80">
          {/* Shadow */}
          <ellipse cx="30" cy="78" rx="20" ry="3" fill="#8b5a2b" opacity="0.3" />

          {/* Main cactus body */}
          <rect x="22" y="20" width="16" height="58" rx="8" fill="#2a9d8f" />

          {/* Left arm */}
          <path
            d="M22,40 L10,40 Q4,40 4,46 L4,55 Q4,60 10,60 L14,60 L14,45 Q14,40 22,40"
            fill="#2a9d8f"
          />

          {/* Right arm */}
          <path
            d="M38,50 L50,50 Q56,50 56,56 L56,62 Q56,67 50,67 L46,67 L46,55 Q46,50 38,50"
            fill="#2a9d8f"
          />

          {/* Highlight lines */}
          <line x1="30" y1="25" x2="30" y2="72" stroke="#3ab89e" strokeWidth="2" opacity="0.5" />
          <line x1="8" y1="45" x2="8" y2="55" stroke="#3ab89e" strokeWidth="1.5" opacity="0.5" />
          <line x1="52" y1="55" x2="52" y2="63" stroke="#3ab89e" strokeWidth="1.5" opacity="0.5" />

          {/* Flower on top */}
          {isHovered && (
            <g className="animate-bounce">
              <circle cx="30" cy="15" r="6" fill="#e76f51" />
              <circle cx="30" cy="15" r="3" fill="#e9c46a" />
            </g>
          )}

          {/* Spines */}
          {[...Array(6)].map((_, i) => (
            <g key={i}>
              <line
                x1="22"
                y1={28 + i * 8}
                x2="18"
                y2={26 + i * 8}
                stroke="#1a7d6f"
                strokeWidth="1"
              />
              <line
                x1="38"
                y1={28 + i * 8}
                x2="42"
                y2={26 + i * 8}
                stroke="#1a7d6f"
                strokeWidth="1"
              />
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
};

// --- DESERT CARVED HEADING ---
export const DesertCarvedHeading = () => {
  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#264653' }}>
      <div className="relative">
        {/* Stone tablet */}
        <div
          className="px-8 py-4 rounded-lg relative"
          style={{
            background: 'linear-gradient(145deg, #c4956a 0%, #a67c52 50%, #8b5a2b 100%)',
            boxShadow: '0 8px 30px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.1)',
          }}
        >
          {/* Erosion/crack effects */}
          <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 200 60">
            <path d="M10,30 Q30,25 50,32 T100,28 T150,35 T190,30" stroke="#5d3a1a" strokeWidth="1" fill="none" />
            <path d="M20,15 L25,25 L22,40" stroke="#5d3a1a" strokeWidth="0.5" fill="none" />
            <path d="M170,10 L175,30 L172,50" stroke="#5d3a1a" strokeWidth="0.5" fill="none" />
          </svg>

          {/* Carved text */}
          <h2
            className="relative text-3xl font-bold tracking-wider"
            style={{
              color: '#3a2510',
              textShadow: '1px 1px 0 #d4a373, -1px -1px 0 #5d3a1a, 2px 2px 4px rgba(0,0,0,0.3)',
              fontFamily: 'serif',
            }}
          >
            SAHARA
          </h2>

          {/* Sand dust at bottom */}
          <div className="absolute -bottom-2 left-4 right-4 h-2 flex justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-1 h-1 rounded-full"
                style={{
                  background: '#d4a373',
                  opacity: 0.4 + i * 0.1,
                }}
              />
            ))}
          </div>
        </div>

        {/* Decorative hieroglyph-like symbols */}
        <div className="flex justify-center gap-4 mt-3">
          {['&#9788;', '&#9789;', '&#9790;'].map((symbol, i) => (
            <span
              key={i}
              className="text-lg"
              style={{ color: '#e9c46a', opacity: 0.6 }}
              dangerouslySetInnerHTML={{ __html: symbol }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// --- DESERT WATER SLIDER ---
export const DesertWaterSlider = () => {
  const [value, setValue] = useState(30);

  const getWaterStatus = () => {
    if (value < 20) return { text: 'Critical', color: '#e76f51' };
    if (value < 50) return { text: 'Low', color: '#d4a373' };
    if (value < 80) return { text: 'Adequate', color: '#e9c46a' };
    return { text: 'Full', color: '#2a9d8f' };
  };

  const status = getWaterStatus();

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#264653' }}>
      <div className="w-64">
        {/* Water flask visualization */}
        <div className="relative h-24 mb-4 mx-auto w-16">
          {/* Flask shape */}
          <svg className="w-full h-full" viewBox="0 0 64 96">
            {/* Flask outline */}
            <path
              d="M20,10 L20,20 Q8,25 8,45 L8,85 Q8,92 16,92 L48,92 Q56,92 56,85 L56,45 Q56,25 44,20 L44,10 Z"
              fill="#3a5a6a"
              stroke="#4a7a8a"
              strokeWidth="2"
            />
            {/* Flask cap */}
            <rect x="18" y="4" width="28" height="8" rx="2" fill="#8b5a2b" />

            {/* Water level */}
            <clipPath id="flaskClip">
              <path d="M10,45 L10,85 Q10,90 16,90 L48,90 Q54,90 54,85 L54,45 Q54,27 44,22 L44,12 L20,12 L20,22 Q10,27 10,45 Z" />
            </clipPath>
            <rect
              x="8"
              y={92 - (value * 0.8)}
              width="48"
              height={value * 0.8}
              fill="#2a9d8f"
              clipPath="url(#flaskClip)"
              opacity="0.8"
            />

            {/* Water shine */}
            <ellipse cx="32" cy={88 - (value * 0.4)} rx="15" ry="3" fill="#3ab89e" opacity="0.5" />
          </svg>
        </div>

        {/* Slider track */}
        <div className="relative h-4 rounded-full overflow-hidden" style={{ background: '#1a3a47' }}>
          {/* Sand texture */}
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #d4a373 1px, transparent 1px)',
            backgroundSize: '8px 8px',
          }} />

          {/* Water fill */}
          <div
            className="absolute top-0 left-0 h-full rounded-full transition-all duration-200"
            style={{
              width: `${value}%`,
              background: `linear-gradient(90deg, #e76f51 0%, #d4a373 30%, #e9c46a 60%, #2a9d8f 100%)`,
            }}
          />

          {/* Slider input */}
          <input
            type="range"
            min="0"
            max="100"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />

          {/* Thumb indicator */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full pointer-events-none transition-all duration-200"
            style={{
              left: `calc(${value}% - 12px)`,
              background: 'linear-gradient(145deg, #e9c46a 0%, #d4a373 100%)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              border: '2px solid #fff',
            }}
          />
        </div>

        {/* Status label */}
        <div className="flex justify-between items-center mt-3">
          <span className="text-sm" style={{ color: '#d4a373' }}>Water Supply</span>
          <span className="font-bold" style={{ color: status.color }}>{status.text} ({value}%)</span>
        </div>
      </div>
    </div>
  );
};

// --- DESERT STAR TABS ---
export const DesertStarTabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { name: 'Polaris', constellation: '&#9733;' },
    { name: 'Orion', constellation: '&#10038;' },
    { name: 'Sirius', constellation: '&#10039;' },
    { name: 'Vega', constellation: '&#10040;' },
  ];

  // Constellation line patterns for each tab
  const constellationPaths = [
    'M20,20 L30,10 L40,20 L35,35 L25,35 Z', // Polaris pattern
    'M15,15 L25,5 L35,15 L45,5 M25,15 L25,40 L15,50 M25,40 L35,50', // Orion pattern
    'M20,25 L40,25 M30,15 L30,35 L25,45 L35,45', // Sirius pattern
    'M25,10 L35,20 L45,10 M30,20 L30,40 L20,50 L40,50', // Vega pattern
  ];

  return (
    <div className="h-full flex flex-col items-center justify-center p-6" style={{ background: 'linear-gradient(180deg, #0a1628 0%, #264653 100%)' }}>
      {/* Star field background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              width: Math.random() > 0.8 ? '2px' : '1px',
              height: Math.random() > 0.8 ? '2px' : '1px',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
              opacity: 0.3 + Math.random() * 0.7,
            }}
          />
        ))}
      </div>

      {/* Constellation display */}
      <div className="relative w-24 h-24 mb-6">
        <svg className="w-full h-full" viewBox="0 0 60 60">
          {/* Constellation lines */}
          <path
            d={constellationPaths[activeTab]}
            fill="none"
            stroke="#e9c46a"
            strokeWidth="1"
            opacity="0.6"
          />
          {/* Star points */}
          {[...Array(5)].map((_, i) => (
            <circle
              key={i}
              cx={15 + i * 8 + Math.sin(i) * 5}
              cy={15 + (i % 2) * 20 + Math.cos(i) * 10}
              r="3"
              fill="#e9c46a"
              style={{
                filter: 'drop-shadow(0 0 4px #e9c46a)',
              }}
            />
          ))}
        </svg>
      </div>

      {/* Tab navigation */}
      <div className="flex gap-2 p-1 rounded-lg" style={{ background: 'rgba(38,70,83,0.5)' }}>
        {tabs.map((tab, i) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(i)}
            className="px-4 py-2 rounded-md transition-all duration-300 flex items-center gap-2"
            style={{
              background: activeTab === i
                ? 'linear-gradient(180deg, #e9c46a 0%, #d4a373 100%)'
                : 'transparent',
              color: activeTab === i ? '#264653' : '#e9c46a',
              boxShadow: activeTab === i ? '0 0 15px rgba(233,196,106,0.4)' : 'none',
            }}
          >
            <span dangerouslySetInnerHTML={{ __html: tab.constellation }} />
            <span className="text-sm font-medium">{tab.name}</span>
          </button>
        ))}
      </div>

      {/* Active constellation name */}
      <div className="mt-4 text-center">
        <span className="text-xs tracking-widest" style={{ color: '#d4a373' }}>
          NAVIGATING BY {tabs[activeTab].name.toUpperCase()}
        </span>
      </div>
    </div>
  );
};

// --- DESERT DUNES BACKGROUND ---
export const DesertDunesBackground = () => {
  const [timeOfDay, setTimeOfDay] = useState<'dawn' | 'day' | 'dusk' | 'night'>('day');

  const skyGradients = {
    dawn: 'linear-gradient(180deg, #ff9a8b 0%, #ffc3a0 30%, #e9c46a 100%)',
    day: 'linear-gradient(180deg, #87ceeb 0%, #b0d4e8 40%, #e9c46a 100%)',
    dusk: 'linear-gradient(180deg, #e76f51 0%, #d4a373 40%, #264653 100%)',
    night: 'linear-gradient(180deg, #0a1628 0%, #1a3a47 50%, #264653 100%)',
  };

  const sunMoonPosition = {
    dawn: { top: '60%', opacity: 0.8 },
    day: { top: '15%', opacity: 1 },
    dusk: { top: '70%', opacity: 0.6 },
    night: { top: '20%', opacity: 0.9 },
  };

  return (
    <div
      className="h-full relative overflow-hidden transition-all duration-1000"
      style={{ background: skyGradients[timeOfDay] }}
    >
      {/* Stars (night only) */}
      {timeOfDay === 'night' && (
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white animate-pulse"
              style={{
                width: Math.random() > 0.9 ? '2px' : '1px',
                height: Math.random() > 0.9 ? '2px' : '1px',
                top: `${Math.random() * 60}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                opacity: 0.5 + Math.random() * 0.5,
              }}
            />
          ))}
        </div>
      )}

      {/* Sun/Moon */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-16 h-16 rounded-full transition-all duration-1000"
        style={{
          top: sunMoonPosition[timeOfDay].top,
          opacity: sunMoonPosition[timeOfDay].opacity,
          background: timeOfDay === 'night'
            ? 'radial-gradient(circle, #f5f5dc 0%, #c0c0c0 100%)'
            : 'radial-gradient(circle, #fff 0%, #e76f51 60%, transparent 100%)',
          boxShadow: timeOfDay === 'night'
            ? '0 0 30px rgba(245,245,220,0.4)'
            : '0 0 60px rgba(231,111,81,0.6)',
        }}
      >
        {/* Moon craters */}
        {timeOfDay === 'night' && (
          <>
            <div className="absolute w-3 h-3 rounded-full bg-gray-300/40" style={{ top: '25%', left: '30%' }} />
            <div className="absolute w-2 h-2 rounded-full bg-gray-300/30" style={{ top: '55%', left: '60%' }} />
          </>
        )}
      </div>

      {/* Dune layers */}
      <svg className="absolute bottom-0 left-0 right-0 h-1/2" viewBox="0 0 400 200" preserveAspectRatio="none">
        {/* Back dunes */}
        <path
          d="M0,100 Q50,60 100,80 T200,70 T300,85 T400,75 L400,200 L0,200 Z"
          fill={timeOfDay === 'night' ? '#1a3a47' : '#d4a373'}
          opacity="0.5"
        />
        {/* Mid dunes */}
        <path
          d="M0,120 Q80,80 160,100 T320,90 T400,110 L400,200 L0,200 Z"
          fill={timeOfDay === 'night' ? '#264653' : '#c4956a'}
          opacity="0.7"
        />
        {/* Front dunes */}
        <path
          d="M0,150 Q100,110 200,140 T400,130 L400,200 L0,200 Z"
          fill={timeOfDay === 'night' ? '#2d5a6a' : '#e9c46a'}
        />
        {/* Closest dune */}
        <path
          d="M0,180 Q150,150 300,170 T400,175 L400,200 L0,200 Z"
          fill={timeOfDay === 'night' ? '#3a6a7a' : '#d4a373'}
        />
      </svg>

      {/* Time controls */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 p-1 rounded-full" style={{ background: 'rgba(38,70,83,0.7)' }}>
        {(['dawn', 'day', 'dusk', 'night'] as const).map((time) => (
          <button
            key={time}
            onClick={() => setTimeOfDay(time)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all"
            style={{
              background: timeOfDay === time ? '#e9c46a' : 'transparent',
              color: timeOfDay === time ? '#264653' : '#e9c46a',
            }}
          >
            {time === 'dawn' && '&#127749;'}
            {time === 'day' && '&#9728;'}
            {time === 'dusk' && '&#127751;'}
            {time === 'night' && '&#127769;'}
          </button>
        ))}
      </div>
    </div>
  );
};

// Export all components
export const desertMirageComponents: Record<string, React.FC> = {
  'desert-dune-button': DesertDuneButton,
  'desert-oasis-card': DesertOasisCard,
  'desert-sand-input': DesertSandInput,
  'desert-sun-badge': DesertSunBadge,
  'desert-day-night-toggle': DesertDayNightToggle,
  'desert-caravan-progress': DesertCaravanProgress,
  'desert-shimmer-loader': DesertShimmerLoader,
  'desert-nomad-avatar': DesertNomadAvatar,
  'desert-tent-modal': DesertTentModal,
  'desert-compass-nav': DesertCompassNav,
  'desert-horizon-divider': DesertHorizonDivider,
  'desert-sandstorm-alert': DesertSandstormAlert,
  'desert-cactus-icon': DesertCactusIcon,
  'desert-carved-heading': DesertCarvedHeading,
  'desert-water-slider': DesertWaterSlider,
  'desert-star-tabs': DesertStarTabs,
  'desert-dunes-background': DesertDunesBackground,
};
