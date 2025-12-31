import React, { useState, useEffect } from 'react';

// Colors
const terracotta = '#c45a3b';
const teal = '#008080';
const gold = '#c9a227';
const saffron = '#f4c430';
const deepBlue = '#1e3a5f';

// --- MOROCCAN ZELLIGE BUTTON ---
export const MoroccanZelligeButton = () => {
  const [pressed, setPressed] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#f5e6d3' }}>
      <button
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        onMouseLeave={() => setPressed(false)}
        className="relative px-8 py-4 transition-all duration-200 overflow-hidden"
        style={{
          background: pressed ? teal : deepBlue,
          borderRadius: '4px',
          boxShadow: pressed
            ? 'inset 0 4px 8px rgba(0,0,0,0.3)'
            : `0 6px 0 ${terracotta}, 0 8px 16px rgba(0,0,0,0.2)`,
          transform: pressed ? 'translateY(3px)' : 'translateY(0)',
        }}
      >
        {/* Zellige mosaic pattern overlay */}
        <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 50" preserveAspectRatio="none">
          <defs>
            <pattern id="zellige" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect width="20" height="20" fill="transparent" />
              <polygon points="10,0 20,10 10,20 0,10" fill={gold} fillOpacity="0.5" />
              <polygon points="0,0 10,0 0,10" fill={saffron} fillOpacity="0.3" />
              <polygon points="20,0 20,10 10,0" fill={saffron} fillOpacity="0.3" />
              <polygon points="0,20 0,10 10,20" fill={saffron} fillOpacity="0.3" />
              <polygon points="20,20 10,20 20,10" fill={saffron} fillOpacity="0.3" />
            </pattern>
          </defs>
          <rect width="100" height="50" fill="url(#zellige)" />
        </svg>
        <span className="relative text-white font-semibold tracking-wide" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
          Enter Bazaar
        </span>
      </button>
    </div>
  );
};

// --- MOROCCAN LANTERN CARD ---
export const MoroccanLanternCard = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: deepBlue }}>
      <div
        className="relative w-64 transition-all duration-500"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Hanging chain */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-1 h-6" style={{ background: gold }} />

        {/* Lantern top */}
        <div
          className="relative mx-auto w-32 h-4"
          style={{
            background: `linear-gradient(180deg, ${gold} 0%, #a68419 100%)`,
            borderRadius: '4px 4px 0 0',
          }}
        />

        {/* Main card body */}
        <div
          className="relative p-6 transition-all duration-500"
          style={{
            background: `linear-gradient(180deg, ${terracotta} 0%, #a04830 100%)`,
            borderRadius: '0 0 12px 12px',
            boxShadow: hovered
              ? `0 0 60px ${saffron}60, 0 20px 40px rgba(0,0,0,0.4)`
              : '0 10px 30px rgba(0,0,0,0.3)',
          }}
        >
          {/* Cutout pattern */}
          <div className="absolute inset-4 opacity-20" style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, transparent 8px, ${deepBlue} 8px, ${deepBlue} 10px, transparent 10px),
              radial-gradient(circle at 75% 25%, transparent 8px, ${deepBlue} 8px, ${deepBlue} 10px, transparent 10px),
              radial-gradient(circle at 50% 75%, transparent 8px, ${deepBlue} 8px, ${deepBlue} 10px, transparent 10px)
            `,
            backgroundSize: '40px 40px',
          }} />

          {/* Inner glow effect */}
          <div
            className="absolute inset-2 rounded-lg transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at center, ${saffron}40 0%, transparent 70%)`,
              opacity: hovered ? 1 : 0.3,
            }}
          />

          <h3 className="relative text-white font-bold text-lg mb-2">Bazaar Treasures</h3>
          <p className="relative text-white/80 text-sm">Discover handcrafted wonders from the souks of Marrakech.</p>
        </div>

        {/* Lantern bottom tassel */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="w-3 h-3 rounded-full" style={{ background: gold }} />
          <div className="w-0.5 h-4" style={{ background: terracotta }} />
          <div className="w-4 h-2 rounded-b" style={{ background: terracotta }} />
        </div>
      </div>
    </div>
  );
};

// --- MOROCCAN ARCH INPUT ---
export const MoroccanArchInput = () => {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#f5e6d3' }}>
      <div className="relative">
        {/* Moorish arch frame */}
        <svg className="absolute -inset-4 w-[calc(100%+32px)] h-[calc(100%+32px)]" viewBox="0 0 240 80" preserveAspectRatio="none">
          <defs>
            <linearGradient id="archGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={gold} />
              <stop offset="100%" stopColor="#a68419" />
            </linearGradient>
          </defs>
          {/* Outer arch */}
          <path
            d="M4,80 L4,35 Q4,4 40,4 L200,4 Q236,4 236,35 L236,80"
            fill="none"
            stroke="url(#archGradient)"
            strokeWidth="4"
          />
          {/* Inner pointed arch (Moorish style) */}
          <path
            d="M20,76 L20,40 Q20,20 60,20 L180,20 Q220,20 220,40 L220,76"
            fill="none"
            stroke={focused ? teal : terracotta}
            strokeWidth="2"
            className="transition-all duration-300"
          />
          {/* Decorative dots */}
          <circle cx="120" cy="10" r="4" fill={gold} />
          <circle cx="100" cy="12" r="2" fill={gold} />
          <circle cx="140" cy="12" r="2" fill={gold} />
        </svg>

        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Search the souk..."
          className="relative w-56 px-4 py-3 text-gray-800 placeholder-gray-400 outline-none transition-all duration-300"
          style={{
            background: focused ? '#fff' : '#faf6f0',
            border: 'none',
            borderRadius: '8px',
            boxShadow: focused
              ? `0 4px 20px rgba(0,128,128,0.2), inset 0 0 0 2px ${teal}`
              : 'inset 0 2px 4px rgba(0,0,0,0.1)',
          }}
        />
      </div>
    </div>
  );
};

// --- MOROCCAN TAGINE BADGE ---
export const MoroccanTagineBadge = () => {
  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#f5e6d3' }}>
      <div className="relative">
        {/* Tagine pot lid (conical top) */}
        <svg width="80" height="60" viewBox="0 0 80 60" className="absolute -top-8 left-1/2 -translate-x-1/2">
          <defs>
            <linearGradient id="tagineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={terracotta} />
              <stop offset="100%" stopColor="#a04830" />
            </linearGradient>
          </defs>
          {/* Conical lid */}
          <path d="M40,5 L65,55 Q40,60 15,55 Z" fill="url(#tagineGrad)" />
          {/* Lid knob */}
          <circle cx="40" cy="8" r="6" fill={gold} />
          {/* Decorative bands */}
          <path d="M25,40 Q40,42 55,40" stroke={gold} strokeWidth="2" fill="none" />
          <path d="M20,50 Q40,53 60,50" stroke={gold} strokeWidth="2" fill="none" />
        </svg>

        {/* Badge body (base of tagine) */}
        <div
          className="relative px-6 py-2 rounded-full"
          style={{
            background: `linear-gradient(180deg, ${terracotta} 0%, #8a3c2a 100%)`,
            boxShadow: `0 4px 12px rgba(196,90,59,0.4), inset 0 1px 0 rgba(255,255,255,0.2)`,
          }}
        >
          <span className="text-white font-semibold text-sm tracking-wide">Featured</span>
        </div>
      </div>
    </div>
  );
};

// --- MOROCCAN LAMP TOGGLE ---
export const MoroccanLampToggle = () => {
  const [on, setOn] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: deepBlue }}>
      <button
        onClick={() => setOn(!on)}
        className="relative w-20 h-10 transition-all duration-500"
        style={{
          background: on
            ? `linear-gradient(180deg, ${saffron}40 0%, ${gold}20 100%)`
            : 'rgba(0,0,0,0.3)',
          borderRadius: '25px',
          border: `2px solid ${gold}`,
          boxShadow: on ? `0 0 30px ${saffron}60` : 'inset 0 2px 4px rgba(0,0,0,0.3)',
        }}
      >
        {/* Genie lamp knob */}
        <div
          className="absolute top-1/2 -translate-y-1/2 transition-all duration-300"
          style={{
            left: on ? 'calc(100% - 36px)' : '4px',
          }}
        >
          {/* Lamp body */}
          <svg width="32" height="24" viewBox="0 0 32 24">
            <defs>
              <linearGradient id="lampGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={gold} />
                <stop offset="100%" stopColor="#8a6d1a" />
              </linearGradient>
            </defs>
            {/* Lamp base */}
            <ellipse cx="16" cy="20" rx="10" ry="3" fill="url(#lampGrad)" />
            {/* Lamp body */}
            <path d="M8,18 Q4,14 8,10 L12,8 Q16,6 20,8 L24,10 Q28,14 24,18 Z" fill="url(#lampGrad)" />
            {/* Spout */}
            <path d="M24,12 Q30,10 32,6" stroke="url(#lampGrad)" strokeWidth="3" strokeLinecap="round" fill="none" />
            {/* Flame/smoke */}
            {on && (
              <g className="animate-pulse">
                <ellipse cx="32" cy="4" rx="3" ry="4" fill={saffron} opacity="0.8" />
                <ellipse cx="32" cy="2" rx="2" ry="2" fill="#fff" opacity="0.6" />
              </g>
            )}
          </svg>
        </div>
      </button>
    </div>
  );
};

// --- MOROCCAN SAND PROGRESS ---
export const MoroccanSandProgress = () => {
  const [progress, setProgress] = useState(35);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => (prev >= 100 ? 0 : prev + 1));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#f5e6d3' }}>
      <div className="relative w-48">
        {/* Container frame */}
        <div
          className="relative h-6 overflow-hidden"
          style={{
            background: deepBlue,
            borderRadius: '12px',
            border: `2px solid ${gold}`,
            boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.4)',
          }}
        >
          {/* Sand fill */}
          <div
            className="absolute inset-y-0 left-0 transition-all duration-100"
            style={{
              width: `${progress}%`,
              background: `linear-gradient(180deg, ${saffron} 0%, ${gold} 50%, #c9a227 100%)`,
            }}
          >
            {/* Sand grain texture */}
            <div className="absolute inset-0 opacity-40" style={{
              backgroundImage: `
                radial-gradient(circle at 20% 50%, ${terracotta} 1px, transparent 1px),
                radial-gradient(circle at 60% 30%, ${terracotta} 1px, transparent 1px),
                radial-gradient(circle at 80% 70%, ${terracotta} 1px, transparent 1px),
                radial-gradient(circle at 40% 80%, ${terracotta} 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px',
              animation: 'flow 2s linear infinite',
            }} />
          </div>

          {/* Falling sand particles at edge */}
          {progress > 0 && progress < 100 && (
            <div
              className="absolute top-0 h-full w-2"
              style={{ left: `${progress}%` }}
            >
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 rounded-full animate-bounce"
                  style={{
                    background: saffron,
                    top: `${20 + i * 25}%`,
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: '0.5s',
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Percentage */}
        <p className="text-center mt-2 font-semibold" style={{ color: deepBlue }}>
          {progress}%
        </p>
      </div>
    </div>
  );
};

// --- MOROCCAN STAR LOADER ---
export const MoroccanStarLoader = () => {
  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: deepBlue }}>
      <div className="relative w-20 h-20">
        {/* Rotating Islamic star pattern */}
        <svg
          className="w-full h-full animate-spin"
          style={{ animationDuration: '4s' }}
          viewBox="0 0 100 100"
        >
          <defs>
            <linearGradient id="starGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={gold} />
              <stop offset="100%" stopColor={saffron} />
            </linearGradient>
            <linearGradient id="starGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={teal} />
              <stop offset="100%" stopColor="#006666" />
            </linearGradient>
          </defs>

          {/* 8-pointed Islamic star */}
          <polygon
            points="50,5 58,35 90,35 64,55 74,88 50,68 26,88 36,55 10,35 42,35"
            fill="url(#starGrad1)"
          />

          {/* Inner star rotates opposite */}
          <g style={{ transformOrigin: '50px 50px', animation: 'spin 2s linear infinite reverse' }}>
            <polygon
              points="50,20 56,42 78,42 60,55 66,78 50,64 34,78 40,55 22,42 44,42"
              fill="url(#starGrad2)"
            />
          </g>

          {/* Center circle */}
          <circle cx="50" cy="50" r="8" fill={terracotta} />
          <circle cx="50" cy="50" r="4" fill={gold} />
        </svg>

        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
};

// --- MOROCCAN MIRROR AVATAR ---
export const MoroccanMirrorAvatar = () => {
  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#f5e6d3' }}>
      <div className="relative">
        {/* Ornate mirror frame */}
        <svg width="100" height="120" viewBox="0 0 100 120" className="absolute -inset-2">
          <defs>
            <linearGradient id="frameGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={gold} />
              <stop offset="50%" stopColor="#e6c547" />
              <stop offset="100%" stopColor={gold} />
            </linearGradient>
          </defs>

          {/* Main frame shape - pointed arch top */}
          <path
            d="M50,5 Q85,5 90,50 L90,100 Q90,115 75,115 L25,115 Q10,115 10,100 L10,50 Q15,5 50,5"
            fill="none"
            stroke="url(#frameGrad)"
            strokeWidth="6"
          />

          {/* Decorative filigree */}
          <circle cx="50" cy="10" r="4" fill={gold} />
          <circle cx="30" cy="20" r="2" fill={gold} />
          <circle cx="70" cy="20" r="2" fill={gold} />

          {/* Corner ornaments */}
          <path d="M15,90 Q5,90 5,100 Q5,110 15,110" stroke={gold} strokeWidth="2" fill="none" />
          <path d="M85,90 Q95,90 95,100 Q95,110 85,110" stroke={gold} strokeWidth="2" fill="none" />
        </svg>

        {/* Avatar image area */}
        <div
          className="relative w-16 h-20 overflow-hidden flex items-center justify-center"
          style={{
            background: `linear-gradient(180deg, ${teal} 0%, ${deepBlue} 100%)`,
            borderRadius: '50% 50% 45% 45% / 40% 40% 60% 60%',
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.3)',
          }}
        >
          <span className="text-3xl">&#128103;</span>
        </div>
      </div>
    </div>
  );
};

// --- MOROCCAN CURTAIN MODAL ---
export const MoroccanCurtainModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#f5e6d3' }}>
      <button
        onClick={() => setOpen(true)}
        className="px-6 py-3 font-semibold transition-all duration-300 hover:scale-105"
        style={{
          background: terracotta,
          color: '#fff',
          borderRadius: '8px',
          border: `2px solid ${gold}`,
          boxShadow: `0 4px 12px rgba(196,90,59,0.4)`,
        }}
      >
        Open Curtains
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />

          {/* Curtain animation container */}
          <div className="relative w-80 h-64 overflow-hidden">
            {/* Left curtain */}
            <div
              className="absolute top-0 left-0 w-1/2 h-full transition-transform duration-700 origin-left"
              style={{
                background: `linear-gradient(90deg, ${terracotta} 0%, #d46a4b 30%, ${terracotta} 100%)`,
                transform: 'translateX(-100%)',
                animation: 'curtainLeft 0.7s ease-out forwards',
              }}
            >
              {/* Fabric folds */}
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute top-0 bottom-0 w-4"
                  style={{
                    left: `${i * 20}%`,
                    background: `linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent)`,
                  }}
                />
              ))}
              {/* Gold trim */}
              <div className="absolute top-0 right-0 bottom-0 w-2" style={{ background: gold }} />
              {/* Tassel */}
              <div className="absolute bottom-4 right-2 w-6 h-8" style={{ background: gold, borderRadius: '0 0 50% 50%' }} />
            </div>

            {/* Right curtain */}
            <div
              className="absolute top-0 right-0 w-1/2 h-full transition-transform duration-700 origin-right"
              style={{
                background: `linear-gradient(270deg, ${terracotta} 0%, #d46a4b 30%, ${terracotta} 100%)`,
                transform: 'translateX(100%)',
                animation: 'curtainRight 0.7s ease-out forwards',
              }}
            >
              {/* Fabric folds */}
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute top-0 bottom-0 w-4"
                  style={{
                    right: `${i * 20}%`,
                    background: `linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent)`,
                  }}
                />
              ))}
              {/* Gold trim */}
              <div className="absolute top-0 left-0 bottom-0 w-2" style={{ background: gold }} />
              {/* Tassel */}
              <div className="absolute bottom-4 left-2 w-6 h-8" style={{ background: gold, borderRadius: '0 0 50% 50%' }} />
            </div>

            {/* Modal content revealed */}
            <div
              className="absolute inset-0 flex items-center justify-center p-8"
              style={{
                background: '#faf6f0',
                border: `4px solid ${gold}`,
                borderRadius: '12px',
              }}
            >
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2" style={{ color: deepBlue }}>Welcome to the Souk</h3>
                <p className="text-gray-600 text-sm mb-4">Discover rare treasures and handcrafted wonders.</p>
                <button
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 text-white text-sm rounded"
                  style={{ background: teal }}
                >
                  Begin Journey
                </button>
              </div>
            </div>
          </div>

          <style>{`
            @keyframes curtainLeft {
              from { transform: translateX(0); }
              to { transform: translateX(-100%); }
            }
            @keyframes curtainRight {
              from { transform: translateX(0); }
              to { transform: translateX(100%); }
            }
          `}</style>
        </div>
      )}
    </div>
  );
};

// --- MOROCCAN SOUK NAV ---
export const MoroccanSoukNav = () => {
  const [active, setActive] = useState(0);
  const items = ['Spices', 'Textiles', 'Ceramics', 'Jewelry'];

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: deepBlue }}>
      <nav className="flex gap-2">
        {items.map((item, i) => (
          <button
            key={item}
            onClick={() => setActive(i)}
            className="relative px-4 py-3 transition-all duration-300"
            style={{
              transform: active === i ? 'translateY(-4px)' : 'translateY(0)',
            }}
          >
            {/* Wooden sign background */}
            <div
              className="absolute inset-0 transition-all duration-300"
              style={{
                background: active === i
                  ? `linear-gradient(180deg, ${terracotta} 0%, #a04830 100%)`
                  : 'linear-gradient(180deg, #8b6914 0%, #6b5210 100%)',
                borderRadius: '4px',
                border: `2px solid ${active === i ? gold : '#5a4510'}`,
                boxShadow: active === i
                  ? `0 8px 16px rgba(0,0,0,0.4), 0 0 20px ${saffron}30`
                  : '0 4px 8px rgba(0,0,0,0.3)',
              }}
            />

            {/* Hanging rope effect */}
            <div
              className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-3"
              style={{
                borderLeft: '2px solid #8b7355',
                borderRight: '2px solid #8b7355',
                borderTop: 'none',
                borderBottom: 'none',
              }}
            />
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-6 h-2 rounded-t" style={{ background: '#5a4a3a' }} />

            <span className={`relative font-semibold text-sm ${active === i ? 'text-white' : 'text-amber-100'}`}>
              {item}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
};

// --- MOROCCAN TILE DIVIDER ---
export const MoroccanTileDivider = () => {
  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#f5e6d3' }}>
      <div className="w-full max-w-xs">
        <svg width="100%" height="32" viewBox="0 0 300 32" preserveAspectRatio="xMidYMid meet">
          <defs>
            <pattern id="tileDivider" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
              {/* Central star */}
              <polygon points="16,4 19,12 28,12 21,18 24,28 16,22 8,28 11,18 4,12 13,12" fill={teal} />
              {/* Corner triangles */}
              <polygon points="0,0 8,0 0,8" fill={terracotta} />
              <polygon points="32,0 32,8 24,0" fill={terracotta} />
              <polygon points="0,32 0,24 8,32" fill={terracotta} />
              <polygon points="32,32 24,32 32,24" fill={terracotta} />
              {/* Diamond accent */}
              <polygon points="16,0 20,4 16,8 12,4" fill={gold} />
              <polygon points="16,24 20,28 16,32 12,28" fill={gold} />
            </pattern>
          </defs>
          <rect width="300" height="32" fill="url(#tileDivider)" />
          {/* End caps */}
          <circle cx="8" cy="16" r="6" fill={gold} stroke={deepBlue} strokeWidth="2" />
          <circle cx="292" cy="16" r="6" fill={gold} stroke={deepBlue} strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
};

// --- MOROCCAN MINT TEA ALERT ---
export const MoroccanMintTeaAlert = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return (
      <div className="h-full flex items-center justify-center p-6" style={{ background: '#f5e6d3' }}>
        <button
          onClick={() => setVisible(true)}
          className="text-gray-600 hover:text-gray-800 underline"
        >
          Show alert
        </button>
      </div>
    );
  }

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#f5e6d3' }}>
      <div className="relative">
        {/* Tea glass shape */}
        <div
          className="relative w-56 px-6 py-4"
          style={{
            background: `linear-gradient(180deg, rgba(0,128,128,0.2) 0%, rgba(0,128,128,0.1) 100%)`,
            borderRadius: '4px 4px 8px 8px',
            border: `2px solid ${gold}`,
            borderTop: `4px solid ${gold}`,
            boxShadow: `0 8px 24px rgba(0,128,128,0.2), inset 0 0 20px rgba(255,255,255,0.1)`,
          }}
        >
          {/* Steam animation */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex gap-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-1 h-6 rounded-full opacity-60"
                style={{
                  background: `linear-gradient(180deg, transparent, ${teal}40)`,
                  animation: `steam 2s ease-in-out infinite`,
                  animationDelay: `${i * 0.3}s`,
                }}
              />
            ))}
          </div>

          {/* Mint leaf decoration */}
          <div className="absolute -top-2 right-4">
            <svg width="20" height="16" viewBox="0 0 20 16">
              <ellipse cx="10" cy="8" rx="8" ry="6" fill="#2d8a2d" />
              <path d="M10,2 L10,14" stroke="#1a5a1a" strokeWidth="1" />
              <path d="M6,5 Q10,8 6,11" stroke="#1a5a1a" strokeWidth="0.5" fill="none" />
              <path d="M14,5 Q10,8 14,11" stroke="#1a5a1a" strokeWidth="0.5" fill="none" />
            </svg>
          </div>

          {/* Alert content */}
          <div className="flex items-start gap-3">
            <span className="text-2xl">&#9749;</span>
            <div>
              <p className="font-semibold text-sm" style={{ color: deepBlue }}>Tea Time!</p>
              <p className="text-xs text-gray-600">Your order is ready for pickup.</p>
            </div>
          </div>

          <button
            onClick={() => setVisible(false)}
            className="absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-white/50"
          >
            x
          </button>
        </div>

        <style>{`
          @keyframes steam {
            0%, 100% { transform: translateY(0) scaleY(1); opacity: 0; }
            50% { transform: translateY(-10px) scaleY(1.5); opacity: 0.6; }
          }
        `}</style>
      </div>
    </div>
  );
};

// --- MOROCCAN HAND ICON (Hamsa) ---
export const MoroccanHandIcon = () => {
  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#f5e6d3' }}>
      <svg width="64" height="80" viewBox="0 0 64 80">
        <defs>
          <linearGradient id="hamsaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={gold} />
            <stop offset="100%" stopColor="#a68419" />
          </linearGradient>
        </defs>

        {/* Hand outline */}
        <path
          d="M32,75
             Q10,70 8,45
             L8,25 Q8,20 12,20 Q16,20 16,25 L16,35
             L16,15 Q16,10 20,10 Q24,10 24,15 L24,32
             L24,8 Q24,3 28,3 L32,3 Q36,3 36,8 L40,8 Q40,3 44,3 Q48,3 48,8 L48,32
             L48,15 Q48,10 52,10 Q56,10 56,25
             L56,45 Q54,70 32,75 Z"
          fill="url(#hamsaGrad)"
          stroke={terracotta}
          strokeWidth="2"
        />

        {/* Central eye */}
        <ellipse cx="32" cy="42" rx="10" ry="12" fill={deepBlue} />
        <ellipse cx="32" cy="42" rx="6" ry="8" fill={teal} />
        <circle cx="32" cy="42" r="4" fill="#fff" />
        <circle cx="33" cy="41" r="2" fill={deepBlue} />

        {/* Decorative patterns */}
        <circle cx="20" cy="28" r="2" fill={terracotta} />
        <circle cx="44" cy="28" r="2" fill={terracotta} />
        <path d="M26,55 Q32,60 38,55" stroke={terracotta} strokeWidth="2" fill="none" />
        <circle cx="32" cy="62" r="3" fill={teal} />

        {/* Finger tips */}
        <circle cx="12" cy="20" r="3" fill={saffron} />
        <circle cx="20" cy="10" r="3" fill={saffron} />
        <circle cx="32" cy="5" r="3" fill={saffron} />
        <circle cx="44" cy="5" r="3" fill={saffron} />
        <circle cx="52" cy="10" r="3" fill={saffron} />
      </svg>
    </div>
  );
};

// --- MOROCCAN CALLIGRAPHY HEADING ---
export const MoroccanCalligraphyHeading = () => {
  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#f5e6d3' }}>
      <div className="text-center relative">
        {/* Decorative flourish top */}
        <svg className="absolute -top-4 left-1/2 -translate-x-1/2 w-48 h-8" viewBox="0 0 200 32">
          <path
            d="M20,28 Q50,8 100,16 Q150,24 180,4"
            stroke={gold}
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="100" cy="16" r="4" fill={terracotta} />
          <circle cx="20" cy="28" r="3" fill={gold} />
          <circle cx="180" cy="4" r="3" fill={gold} />
        </svg>

        {/* Main heading with Arabic-inspired styling */}
        <h1
          className="text-4xl font-bold tracking-wider"
          style={{
            color: deepBlue,
            fontFamily: 'Georgia, serif',
            textShadow: `2px 2px 0 ${gold}40`,
            letterSpacing: '0.15em',
          }}
        >
          <span style={{ color: terracotta }}>M</span>arrakech
        </h1>

        {/* Decorative flourish bottom */}
        <svg className="mx-auto mt-2 w-32 h-6" viewBox="0 0 128 24">
          <path
            d="M10,12 Q30,4 64,12 Q98,20 118,12"
            stroke={terracotta}
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M20,12 Q40,18 64,12 Q88,6 108,12"
            stroke={gold}
            strokeWidth="1"
            fill="none"
          />
          {/* Center diamond */}
          <polygon points="64,4 72,12 64,20 56,12" fill={teal} />
        </svg>

        <p className="mt-3 text-sm tracking-widest uppercase" style={{ color: terracotta }}>
          City of Wonder
        </p>
      </div>
    </div>
  );
};

// --- MOROCCAN SPICE SLIDER ---
export const MoroccanSpiceSlider = () => {
  const [value, setValue] = useState(50);

  const getSpiceColor = (val: number) => {
    if (val < 33) return saffron;
    if (val < 66) return terracotta;
    return '#8b2500';
  };

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#f5e6d3' }}>
      <div className="w-48">
        {/* Spice jar label */}
        <div className="flex justify-between mb-2 text-xs font-semibold" style={{ color: deepBlue }}>
          <span>Mild</span>
          <span>Hot</span>
        </div>

        {/* Slider track */}
        <div className="relative h-8">
          <div
            className="absolute inset-0 rounded-full overflow-hidden"
            style={{
              background: deepBlue,
              border: `2px solid ${gold}`,
            }}
          >
            {/* Spice gradient fill */}
            <div
              className="absolute inset-y-0 left-0 transition-all duration-200"
              style={{
                width: `${value}%`,
                background: `linear-gradient(90deg, ${saffron} 0%, ${terracotta} 50%, #8b2500 100%)`,
              }}
            >
              {/* Spice particle texture */}
              <div className="absolute inset-0 opacity-30" style={{
                backgroundImage: `
                  radial-gradient(circle at 20% 30%, #000 1px, transparent 1px),
                  radial-gradient(circle at 60% 70%, #000 1px, transparent 1px),
                  radial-gradient(circle at 80% 40%, #000 1px, transparent 1px)
                `,
                backgroundSize: '10px 10px',
              }} />
            </div>
          </div>

          {/* Slider thumb - spice jar cap */}
          <input
            type="range"
            min="0"
            max="100"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="absolute inset-0 w-full opacity-0 cursor-pointer"
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-6 h-10 pointer-events-none transition-all duration-200"
            style={{
              left: `calc(${value}% - 12px)`,
              background: `linear-gradient(180deg, ${gold} 0%, #a68419 100%)`,
              borderRadius: '4px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              border: '2px solid #8a6d1a',
            }}
          >
            {/* Cap ridges */}
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute left-0 right-0 h-0.5"
                style={{
                  top: `${25 + i * 25}%`,
                  background: 'rgba(0,0,0,0.1)',
                }}
              />
            ))}
          </div>
        </div>

        {/* Heat indicator */}
        <div className="flex justify-center mt-3 gap-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-4 transition-all duration-200"
              style={{
                background: i < Math.ceil(value / 20) ? getSpiceColor(value) : '#ddd',
                clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// --- MOROCCAN CARPET TABS ---
export const MoroccanCarpetTabs = () => {
  const [active, setActive] = useState(0);
  const tabs = ['Berber', 'Kilim', 'Boucherouite'];

  const patterns = [
    // Berber diamond pattern
    `repeating-linear-gradient(45deg, ${terracotta} 0px, ${terracotta} 10px, ${saffron} 10px, ${saffron} 20px)`,
    // Kilim zigzag
    `repeating-linear-gradient(90deg, ${teal} 0px, ${teal} 5px, ${gold} 5px, ${gold} 10px, ${deepBlue} 10px, ${deepBlue} 15px)`,
    // Boucherouite colorful
    `repeating-linear-gradient(135deg, ${terracotta} 0px, ${saffron} 8px, ${teal} 16px, ${gold} 24px, ${deepBlue} 32px)`,
  ];

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: deepBlue }}>
      <div className="w-64">
        {/* Tab headers */}
        <div className="flex">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActive(i)}
              className="flex-1 py-3 px-2 transition-all duration-300 relative"
              style={{
                background: active === i ? patterns[i] : '#4a3f35',
                borderRadius: '8px 8px 0 0',
                border: `2px solid ${gold}`,
                borderBottom: active === i ? 'none' : `2px solid ${gold}`,
                transform: active === i ? 'translateY(-4px)' : 'translateY(0)',
                zIndex: active === i ? 10 : 1,
              }}
            >
              {/* Fringe at top */}
              <div className="absolute -top-2 left-2 right-2 flex justify-around">
                {[...Array(5)].map((_, j) => (
                  <div
                    key={j}
                    className="w-1 h-2"
                    style={{ background: active === i ? gold : '#6b5a4a' }}
                  />
                ))}
              </div>
              <span
                className="relative font-semibold text-xs"
                style={{
                  color: active === i ? '#fff' : '#a09080',
                  textShadow: active === i ? '0 1px 2px rgba(0,0,0,0.5)' : 'none',
                }}
              >
                {tab}
              </span>
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div
          className="p-4 relative overflow-hidden"
          style={{
            background: '#faf6f0',
            border: `2px solid ${gold}`,
            borderTop: 'none',
            borderRadius: '0 0 8px 8px',
            minHeight: '80px',
          }}
        >
          {/* Carpet pattern preview */}
          <div
            className="absolute inset-2 opacity-20 transition-all duration-500"
            style={{ background: patterns[active] }}
          />
          <p className="relative text-sm" style={{ color: deepBlue }}>
            {active === 0 && 'Traditional hand-knotted wool carpets with geometric motifs.'}
            {active === 1 && 'Flat-woven rugs featuring bold tribal patterns.'}
            {active === 2 && 'Recycled textile rugs with vibrant, eclectic designs.'}
          </p>
        </div>
      </div>
    </div>
  );
};

// --- MOROCCAN PATTERN BACKGROUND ---
export const MoroccanPatternBackground = () => {
  return (
    <div className="h-full flex items-center justify-center p-6 relative overflow-hidden" style={{ background: deepBlue }}>
      {/* Islamic geometric pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-30" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="islamicPattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            {/* 8-pointed star */}
            <polygon
              points="30,5 35,20 50,15 40,30 50,45 35,40 30,55 25,40 10,45 20,30 10,15 25,20"
              fill="none"
              stroke={gold}
              strokeWidth="1"
            />
            {/* Inner star */}
            <polygon
              points="30,15 33,25 43,23 37,30 43,37 33,35 30,45 27,35 17,37 23,30 17,23 27,25"
              fill={teal}
              fillOpacity="0.3"
            />
            {/* Connecting lines */}
            <line x1="0" y1="0" x2="10" y2="15" stroke={gold} strokeWidth="0.5" />
            <line x1="60" y1="0" x2="50" y2="15" stroke={gold} strokeWidth="0.5" />
            <line x1="0" y1="60" x2="10" y2="45" stroke={gold} strokeWidth="0.5" />
            <line x1="60" y1="60" x2="50" y2="45" stroke={gold} strokeWidth="0.5" />
            {/* Corner squares */}
            <rect x="0" y="0" width="8" height="8" fill={terracotta} fillOpacity="0.5" />
            <rect x="52" y="0" width="8" height="8" fill={terracotta} fillOpacity="0.5" />
            <rect x="0" y="52" width="8" height="8" fill={terracotta} fillOpacity="0.5" />
            <rect x="52" y="52" width="8" height="8" fill={terracotta} fillOpacity="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#islamicPattern)" />
      </svg>

      {/* Central content area */}
      <div
        className="relative px-8 py-6 text-center"
        style={{
          background: 'rgba(245,230,211,0.95)',
          borderRadius: '12px',
          border: `3px solid ${gold}`,
          boxShadow: `0 0 40px rgba(201,162,39,0.3), inset 0 0 20px rgba(255,255,255,0.5)`,
        }}
      >
        <h2 className="text-2xl font-bold mb-2" style={{ color: deepBlue }}>
          Moroccan Patterns
        </h2>
        <p className="text-sm" style={{ color: terracotta }}>
          Ancient geometric artistry
        </p>

        {/* Decorative corner elements */}
        <div className="absolute top-2 left-2 w-4 h-4" style={{ borderTop: `2px solid ${teal}`, borderLeft: `2px solid ${teal}` }} />
        <div className="absolute top-2 right-2 w-4 h-4" style={{ borderTop: `2px solid ${teal}`, borderRight: `2px solid ${teal}` }} />
        <div className="absolute bottom-2 left-2 w-4 h-4" style={{ borderBottom: `2px solid ${teal}`, borderLeft: `2px solid ${teal}` }} />
        <div className="absolute bottom-2 right-2 w-4 h-4" style={{ borderBottom: `2px solid ${teal}`, borderRight: `2px solid ${teal}` }} />
      </div>
    </div>
  );
};

// Export all components
export const moroccanBazaarComponents: Record<string, React.FC> = {
  'moroccan-zellige-button': MoroccanZelligeButton,
  'moroccan-lantern-card': MoroccanLanternCard,
  'moroccan-arch-input': MoroccanArchInput,
  'moroccan-tagine-badge': MoroccanTagineBadge,
  'moroccan-lamp-toggle': MoroccanLampToggle,
  'moroccan-sand-progress': MoroccanSandProgress,
  'moroccan-star-loader': MoroccanStarLoader,
  'moroccan-mirror-avatar': MoroccanMirrorAvatar,
  'moroccan-curtain-modal': MoroccanCurtainModal,
  'moroccan-souk-nav': MoroccanSoukNav,
  'moroccan-tile-divider': MoroccanTileDivider,
  'moroccan-mint-tea-alert': MoroccanMintTeaAlert,
  'moroccan-hand-icon': MoroccanHandIcon,
  'moroccan-calligraphy-heading': MoroccanCalligraphyHeading,
  'moroccan-spice-slider': MoroccanSpiceSlider,
  'moroccan-carpet-tabs': MoroccanCarpetTabs,
  'moroccan-pattern-background': MoroccanPatternBackground,
};
