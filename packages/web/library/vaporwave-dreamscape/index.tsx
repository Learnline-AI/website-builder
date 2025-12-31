import { useState } from 'react';
import { Check, AlertTriangle } from '../shared/icons';

// --- NEON BUTTON ---
export const NeonButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: 'linear-gradient(180deg, #1a0a2e 0%, #16213e 100%)' }}>
      <button
        className="relative px-8 py-3 font-bold text-lg tracking-wider transition-all duration-300"
        style={{
          background: isHovered
            ? 'linear-gradient(90deg, #ff71ce, #01cdfe, #05ffa1)'
            : 'linear-gradient(90deg, #ff71ce, #b967ff)',
          color: '#1a0a2e',
          borderRadius: '0',
          boxShadow: isHovered
            ? '0 0 30px rgba(255, 113, 206, 0.8), 0 0 60px rgba(1, 205, 254, 0.4)'
            : '0 0 20px rgba(255, 113, 206, 0.5)',
          textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        AESTHETIC
      </button>
    </div>
  );
};

// --- RETRO WINDOW ---
export const RetroWindow = () => {
  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#008080' }}>
      <div className="w-64 shadow-lg" style={{ border: '2px solid #000' }}>
        {/* Title Bar */}
        <div
          className="flex items-center justify-between px-2 py-1"
          style={{ background: 'linear-gradient(90deg, #000080, #1084d0)' }}
        >
          <span className="text-white text-xs font-bold">Vaporwave.exe</span>
          <div className="flex gap-1">
            <button className="w-4 h-4 text-xs bg-gray-300 border border-gray-400 leading-none">−</button>
            <button className="w-4 h-4 text-xs bg-gray-300 border border-gray-400 leading-none">□</button>
            <button className="w-4 h-4 text-xs bg-gray-300 border border-gray-400 leading-none">×</button>
          </div>
        </div>
        {/* Content */}
        <div className="bg-gray-200 p-4 text-center" style={{ background: '#c0c0c0' }}>
          <div className="text-3xl mb-2">🌴</div>
          <p className="text-xs text-gray-700">リラックス</p>
          <p className="text-[10px] text-gray-500 mt-1">Relax and enjoy</p>
        </div>
      </div>
    </div>
  );
};

// --- SUNSET CARD ---
export const SunsetCard = () => {
  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#1a0a2e' }}>
      <div
        className="w-56 p-6 rounded-none"
        style={{
          background: 'linear-gradient(180deg, #ff71ce 0%, #b967ff 30%, #01cdfe 70%, #05ffa1 100%)',
          boxShadow: '0 0 40px rgba(185, 103, 255, 0.5)',
        }}
      >
        <div className="text-center">
          <div className="text-5xl mb-3">🌅</div>
          <h3 className="text-white font-bold text-lg tracking-widest" style={{ textShadow: '2px 2px 0 rgba(0,0,0,0.3)' }}>
            SUNSET
          </h3>
          <p className="text-white/80 text-xs mt-2 tracking-wider">永遠の夏</p>
        </div>
      </div>
    </div>
  );
};

// --- GLITCH TEXT ---
export const GlitchText = () => {
  const [glitch, setGlitch] = useState(false);

  return (
    <div
      className="h-full flex items-center justify-center p-6 cursor-pointer"
      style={{ background: 'linear-gradient(180deg, #0f0f23 0%, #1a0a2e 100%)' }}
      onMouseEnter={() => setGlitch(true)}
      onMouseLeave={() => setGlitch(false)}
    >
      <div className="relative">
        <h1
          className="text-4xl font-bold tracking-widest"
          style={{
            color: '#ff71ce',
            textShadow: glitch
              ? '-3px 0 #01cdfe, 3px 0 #ff71ce, 0 0 20px #b967ff'
              : '0 0 20px rgba(255, 113, 206, 0.5)',
            transform: glitch ? 'skewX(-2deg)' : 'none',
            transition: 'all 0.1s',
          }}
        >
          VAPOR
        </h1>
        {glitch && (
          <>
            <h1
              className="text-4xl font-bold tracking-widest absolute top-0 left-0"
              style={{
                color: '#01cdfe',
                clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
                transform: 'translateX(-4px)',
                opacity: 0.8,
              }}
            >
              VAPOR
            </h1>
            <h1
              className="text-4xl font-bold tracking-widest absolute top-0 left-0"
              style={{
                color: '#05ffa1',
                clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
                transform: 'translateX(4px)',
                opacity: 0.8,
              }}
            >
              VAPOR
            </h1>
          </>
        )}
      </div>
    </div>
  );
};

// --- PALM BADGE ---
export const PalmBadge = () => {
  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: 'linear-gradient(180deg, #ff6b6b 0%, #c44569 100%)' }}>
      <div className="flex gap-3">
        <span
          className="px-4 py-2 text-sm font-bold tracking-wider flex items-center gap-2"
          style={{
            background: 'linear-gradient(135deg, #01cdfe, #b967ff)',
            color: 'white',
            boxShadow: '4px 4px 0 rgba(0,0,0,0.3)',
          }}
        >
          🌴 TROPICAL
        </span>
        <span
          className="px-4 py-2 text-sm font-bold tracking-wider"
          style={{
            background: 'linear-gradient(135deg, #ff71ce, #01cdfe)',
            color: 'white',
            boxShadow: '4px 4px 0 rgba(0,0,0,0.3)',
          }}
        >
          🐬 OCEAN
        </span>
      </div>
    </div>
  );
};

// --- GRID FLOOR ---
export const GridFloor = () => {
  return (
    <div
      className="h-full flex items-end justify-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #1a0a2e 0%, #ff71ce 100%)' }}
    >
      {/* Sun */}
      <div
        className="absolute top-8 w-24 h-24 rounded-full"
        style={{
          background: 'linear-gradient(180deg, #ff71ce 0%, #ffb86c 100%)',
          boxShadow: '0 0 60px rgba(255, 113, 206, 0.8)',
        }}
      />
      {/* Grid */}
      <div
        className="w-full h-1/2"
        style={{
          background: `
            linear-gradient(90deg, rgba(1, 205, 254, 0.3) 1px, transparent 1px),
            linear-gradient(0deg, rgba(1, 205, 254, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 20px',
          transform: 'perspective(200px) rotateX(60deg)',
          transformOrigin: 'center top',
        }}
      />
    </div>
  );
};

// --- VHS EFFECT ---
export const VHSEffect = () => {
  return (
    <div className="h-full flex items-center justify-center p-6 relative overflow-hidden" style={{ background: '#0f0f23' }}>
      {/* Content */}
      <div className="text-center z-10">
        <div className="text-4xl mb-2">📼</div>
        <p className="text-white font-bold tracking-widest" style={{ textShadow: '2px 0 #ff0000, -2px 0 #00ffff' }}>
          PLAY ▶
        </p>
        <p className="text-xs text-gray-400 mt-1">1989.08.15</p>
      </div>
      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
        }}
      />
      {/* Tracking lines */}
      <div
        className="absolute left-0 right-0 h-1 opacity-50"
        style={{
          top: '30%',
          background: 'linear-gradient(90deg, transparent, #ff71ce, #01cdfe, transparent)',
          animation: 'vhsLine 3s infinite',
        }}
      />
      <style>{`
        @keyframes vhsLine {
          0%, 100% { top: 30%; opacity: 0; }
          10% { opacity: 0.5; }
          50% { top: 70%; opacity: 0.3; }
          90% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

// --- STATUE BADGE ---
export const StatueBadge = () => {
  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div
        className="px-6 py-3 flex items-center gap-3"
        style={{
          background: 'rgba(255,255,255,0.1)',
          border: '2px solid rgba(255,255,255,0.3)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <span className="text-2xl">🏛️</span>
        <div>
          <p className="text-white font-bold tracking-wider">CLASSICAL</p>
          <p className="text-white/60 text-xs">αισθητική</p>
        </div>
      </div>
    </div>
  );
};

// --- DOLPHIN LOADER ---
export const DolphinLoader = () => {
  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: 'linear-gradient(180deg, #0f0f23 0%, #1a1a3e 100%)' }}>
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto">
          <div
            className="w-full h-full rounded-full"
            style={{
              border: '3px solid transparent',
              borderTop: '3px solid #ff71ce',
              borderRight: '3px solid #01cdfe',
              animation: 'spinDolphin 1s linear infinite',
            }}
          />
          <span className="absolute inset-0 flex items-center justify-center text-2xl" style={{ animation: 'bobDolphin 1s ease-in-out infinite' }}>
            🐬
          </span>
        </div>
        <p className="text-xs text-gray-400 mt-3 tracking-widest">LOADING...</p>
      </div>
      <style>{`
        @keyframes spinDolphin { to { transform: rotate(360deg); } }
        @keyframes bobDolphin { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
      `}</style>
    </div>
  );
};

// --- NEON PROGRESS ---
export const NeonProgress = () => {
  const [progress] = useState(72);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#0f0f23' }}>
      <div className="w-48">
        <div className="flex justify-between text-xs mb-2">
          <span style={{ color: '#ff71ce' }}>PROGRESS</span>
          <span style={{ color: '#01cdfe' }}>{progress}%</span>
        </div>
        <div className="h-3 bg-black/50 relative overflow-hidden">
          <div
            className="h-full transition-all duration-500"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #ff71ce, #b967ff, #01cdfe)',
              boxShadow: '0 0 20px rgba(185, 103, 255, 0.8)',
            }}
          />
          {/* Scanline effect */}
          <div className="absolute inset-0" style={{
            background: 'repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(0,0,0,0.2) 4px, rgba(0,0,0,0.2) 8px)'
          }} />
        </div>
      </div>
    </div>
  );
};

// --- SYNTH INPUT ---
export const SynthInput = () => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: 'linear-gradient(180deg, #1a0a2e 0%, #0f0f23 100%)' }}>
      <div className="w-56">
        <label className="block text-xs mb-2 tracking-widest" style={{ color: '#ff71ce' }}>
          ユーザー名
        </label>
        <input
          type="text"
          placeholder="Enter username..."
          className="w-full px-4 py-3 bg-transparent outline-none text-white"
          style={{
            border: focused ? '2px solid #01cdfe' : '2px solid #b967ff',
            boxShadow: focused ? '0 0 20px rgba(1, 205, 254, 0.5), inset 0 0 20px rgba(1, 205, 254, 0.1)' : 'none',
            transition: 'all 0.3s',
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </div>
    </div>
  );
};

// --- TROPICAL ALERT ---
export const TropicalAlert = () => {
  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#1a0a2e' }}>
      <div
        className="w-64 p-4"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 113, 206, 0.2), rgba(1, 205, 254, 0.2))',
          border: '2px solid #ff71ce',
          boxShadow: '0 0 20px rgba(255, 113, 206, 0.3)',
        }}
      >
        <div className="flex items-start gap-3">
          <AlertTriangle size={20} className="text-yellow-300 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-sm tracking-wider" style={{ color: '#ff71ce' }}>ATTENTION</p>
            <p className="text-xs mt-1" style={{ color: '#01cdfe' }}>
              Maximum aesthetic levels detected 🌴
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- GRID TOGGLE ---
export const GridToggle = () => {
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#0f0f23' }}>
      <div className="flex items-center gap-4">
        <span className="text-xs tracking-widest" style={{ color: enabled ? '#ff71ce' : '#666' }}>
          AESTHETIC MODE
        </span>
        <button
          className="w-14 h-7 relative transition-all duration-300"
          style={{
            background: enabled
              ? 'linear-gradient(90deg, #ff71ce, #01cdfe)'
              : '#333',
            boxShadow: enabled ? '0 0 20px rgba(255, 113, 206, 0.5)' : 'none',
          }}
          onClick={() => setEnabled(!enabled)}
        >
          <div
            className="w-5 h-5 absolute top-1 transition-all duration-300 flex items-center justify-center"
            style={{
              left: enabled ? 'calc(100% - 24px)' : '4px',
              background: enabled ? '#fff' : '#666',
              boxShadow: enabled ? '0 0 10px rgba(255,255,255,0.5)' : 'none',
            }}
          >
            {enabled && <Check size={12} style={{ color: '#ff71ce' }} />}
          </div>
        </button>
      </div>
    </div>
  );
};

// --- RETRO MODAL ---
export const RetroModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return (
      <div className="h-full flex items-center justify-center p-6" style={{ background: '#008080' }}>
        <button
          className="px-4 py-2 bg-gray-300 text-xs border-2"
          style={{ borderColor: '#fff #808080 #808080 #fff' }}
          onClick={() => setIsOpen(true)}
        >
          Open Dialog
        </button>
      </div>
    );
  }

  return (
    <div className="h-full flex items-center justify-center p-6 relative" style={{ background: '#008080' }}>
      <div className="w-56 shadow-xl" style={{ border: '2px solid #000' }}>
        <div
          className="flex items-center justify-between px-2 py-1"
          style={{ background: 'linear-gradient(90deg, #000080, #1084d0)' }}
        >
          <span className="text-white text-xs font-bold">Message</span>
          <button
            className="w-4 h-4 text-xs bg-gray-300 border leading-none"
            style={{ borderColor: '#fff #808080 #808080 #fff' }}
            onClick={() => setIsOpen(false)}
          >
            ×
          </button>
        </div>
        <div className="bg-gray-200 p-4 text-center" style={{ background: '#c0c0c0' }}>
          <div className="text-2xl mb-2">✨</div>
          <p className="text-xs text-gray-700 mb-3">Welcome to the aesthetic zone!</p>
          <button
            className="px-6 py-1 text-xs border-2"
            style={{ background: '#c0c0c0', borderColor: '#fff #808080 #808080 #fff' }}
            onClick={() => setIsOpen(false)}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

// --- WAVE BACKGROUND ---
export const WaveBackground = () => {
  return (
    <div className="h-full relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #1a0a2e 0%, #0f0f23 100%)' }}>
      {/* Stars */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 60}%`,
              opacity: Math.random() * 0.5 + 0.2,
            }}
          />
        ))}
      </div>
      {/* Waves */}
      <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 200" preserveAspectRatio="none">
        <path
          d="M0,100 C320,200 420,0 640,100 C860,200 960,0 1180,100 C1300,150 1400,100 1440,100 L1440,200 L0,200 Z"
          fill="url(#waveGradient1)"
          opacity="0.6"
        />
        <path
          d="M0,150 C320,50 420,150 640,100 C860,50 960,150 1180,100 C1300,75 1400,125 1440,100 L1440,200 L0,200 Z"
          fill="url(#waveGradient2)"
          opacity="0.4"
        />
        <defs>
          <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff71ce" />
            <stop offset="50%" stopColor="#b967ff" />
            <stop offset="100%" stopColor="#01cdfe" />
          </linearGradient>
          <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#01cdfe" />
            <stop offset="100%" stopColor="#05ffa1" />
          </linearGradient>
        </defs>
      </svg>
      {/* Center text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-xs tracking-[0.3em]" style={{ color: 'rgba(255, 113, 206, 0.6)' }}>ＷＡＶＥ</p>
      </div>
    </div>
  );
};

// --- SUNSET NAVBAR ---
export const SunsetNavbar = () => {
  const [active, setActive] = useState(0);
  const items = ['ホーム', 'GALLERY', 'MUSIC', 'ABOUT'];

  return (
    <div className="h-full flex items-start p-6" style={{ background: '#0f0f23' }}>
      <nav className="w-full">
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{
            background: 'linear-gradient(90deg, rgba(255, 113, 206, 0.2), rgba(1, 205, 254, 0.2))',
            borderBottom: '2px solid',
            borderImage: 'linear-gradient(90deg, #ff71ce, #01cdfe) 1',
          }}
        >
          <span className="font-bold tracking-widest" style={{ color: '#ff71ce' }}>VAPOR</span>
          <div className="flex gap-4">
            {items.map((item, i) => (
              <button
                key={item}
                className="text-xs tracking-wider transition-all duration-300"
                style={{
                  color: active === i ? '#01cdfe' : 'rgba(255,255,255,0.5)',
                  textShadow: active === i ? '0 0 10px rgba(1, 205, 254, 0.8)' : 'none',
                }}
                onClick={() => setActive(i)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

// --- RETRO TABS ---
export const RetroTabs = () => {
  const [active, setActive] = useState(0);
  const tabs = ['FILE', 'EDIT', 'VIEW'];

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#c0c0c0' }}>
      <div className="w-56">
        <div className="flex">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              className="px-4 py-1 text-xs border-2 -mb-px relative"
              style={{
                background: active === i ? '#c0c0c0' : '#a0a0a0',
                borderColor: active === i ? '#fff #808080 #c0c0c0 #fff' : '#808080 #fff #808080 #808080',
                zIndex: active === i ? 1 : 0,
              }}
              onClick={() => setActive(i)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div
          className="p-4 border-2"
          style={{
            background: '#c0c0c0',
            borderColor: '#fff #808080 #808080 #fff',
          }}
        >
          <p className="text-xs text-gray-600">
            {active === 0 && 'Open, Save, Exit...'}
            {active === 1 && 'Cut, Copy, Paste...'}
            {active === 2 && 'Zoom, Grid, Status...'}
          </p>
        </div>
      </div>
    </div>
  );
};

// Export all components
export const vaporwaveDreamscapeComponents = {
  'vaporwave-neon-button': NeonButton,
  'vaporwave-retro-window': RetroWindow,
  'vaporwave-sunset-card': SunsetCard,
  'vaporwave-glitch-text': GlitchText,
  'vaporwave-palm-badge': PalmBadge,
  'vaporwave-grid-floor': GridFloor,
  'vaporwave-vhs-effect': VHSEffect,
  'vaporwave-statue-badge': StatueBadge,
  'vaporwave-dolphin-loader': DolphinLoader,
  'vaporwave-neon-progress': NeonProgress,
  'vaporwave-synth-input': SynthInput,
  'vaporwave-tropical-alert': TropicalAlert,
  'vaporwave-grid-toggle': GridToggle,
  'vaporwave-retro-modal': RetroModal,
  'vaporwave-wave-background': WaveBackground,
  'vaporwave-sunset-navbar': SunsetNavbar,
  'vaporwave-retro-tabs': RetroTabs,
};
