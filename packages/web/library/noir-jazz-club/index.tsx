import React, { useState, useEffect } from 'react';

// --- VELVET BUTTON ---
export const VelvetButton = () => {
  const [hover, setHover] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#1a1215' }}>
      <button
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="relative px-8 py-3 font-serif transition-all duration-300"
        style={{
          background: hover
            ? 'linear-gradient(180deg, #7f1d1d 0%, #450a0a 100%)'
            : 'linear-gradient(180deg, #991b1b 0%, #7f1d1d 100%)',
          border: '2px solid #d4af37',
          color: '#d4af37',
          boxShadow: hover
            ? '0 0 30px rgba(212,175,55,0.3), inset 0 0 20px rgba(212,175,55,0.1)'
            : '0 4px 12px rgba(0,0,0,0.4)',
        }}
      >
        <span className="tracking-widest uppercase text-sm">Reserve Table</span>
      </button>
    </div>
  );
};

// --- SMOKY CARD ---
export const SmokyCard = () => {
  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#1a1215' }}>
      <div
        className="relative w-56 h-36 p-4 overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #2d2025 0%, #1a1215 100%)',
          border: '1px solid #3d3035',
          borderRadius: '4px',
        }}
      >
        {/* Smoke effect */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-32 h-32 rounded-full animate-pulse"
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
                left: `${-20 + i * 30}%`,
                top: `${60 + i * 10}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: '4s',
              }}
            />
          ))}
        </div>

        <div className="relative z-10">
          <h3 className="text-amber-200 font-serif text-lg">Tonight's Set</h3>
          <p className="text-amber-100/60 text-sm mt-2 italic">Miles Davis Tribute</p>
          <p className="text-amber-400 text-xs mt-4">9 PM - 2 AM</p>
        </div>
      </div>
    </div>
  );
};

// --- SAXOPHONE INPUT ---
export const SaxophoneInput = () => {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#1a1215' }}>
      <div className="relative w-64">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Your name..."
          className="w-full px-4 py-3 font-serif text-amber-200 placeholder-amber-700 outline-none transition-all duration-500"
          style={{
            background: '#2d2025',
            border: `1px solid ${focused ? '#d4af37' : '#3d3035'}`,
            borderRadius: '2px',
          }}
        />

        {/* Musical note decoration */}
        {focused && (
          <div className="absolute -right-6 top-1/2 -translate-y-1/2 text-amber-400 animate-bounce">
            ♪
          </div>
        )}

        {/* Underline glow */}
        <div
          className="absolute bottom-0 left-0 h-0.5 transition-all duration-500"
          style={{
            width: focused ? '100%' : '0%',
            background: 'linear-gradient(90deg, transparent, #d4af37, transparent)',
          }}
        />
      </div>
    </div>
  );
};

// --- VINYL BADGE ---
export const VinylBadge = () => {
  const [spin, setSpin] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#1a1215' }}>
      <button
        onClick={() => setSpin(!spin)}
        className="relative"
      >
        <div
          className={`w-16 h-16 rounded-full transition-transform duration-1000 ${spin ? 'animate-spin' : ''}`}
          style={{
            background: 'conic-gradient(from 0deg, #1a1a1a, #333, #1a1a1a, #333, #1a1a1a)',
            animationDuration: '2s',
          }}
        >
          {/* Grooves */}
          <div
            className="absolute inset-1 rounded-full"
            style={{
              background: 'repeating-radial-gradient(circle at center, #1a1a1a 0px, #1a1a1a 1px, #2a2a2a 1px, #2a2a2a 2px)',
            }}
          />

          {/* Label */}
          <div
            className="absolute inset-5 rounded-full flex items-center justify-center"
            style={{ background: '#d4af37' }}
          >
            <span className="text-[6px] text-black font-bold">JAZZ</span>
          </div>
        </div>
      </button>
    </div>
  );
};

// --- DIMMER SWITCH TOGGLE ---
export const DimmerSwitchToggle = () => {
  const [level, setLevel] = useState(3);
  const maxLevel = 5;

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#1a1215' }}>
      <div className="flex flex-col items-center gap-2">
        <div
          className="relative w-8 h-24 rounded-full"
          style={{
            background: '#2d2025',
            border: '2px solid #3d3035',
          }}
        >
          {/* Level indicators */}
          {[...Array(maxLevel)].map((_, i) => (
            <div
              key={i}
              className="absolute left-1/2 -translate-x-1/2 w-4 h-0.5 rounded transition-all duration-300"
              style={{
                bottom: `${10 + i * 18}%`,
                background: i < level ? '#d4af37' : '#3d3035',
                boxShadow: i < level ? '0 0 8px #d4af37' : 'none',
              }}
            />
          ))}

          {/* Slider knob */}
          <div
            className="absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full cursor-pointer transition-all duration-300"
            style={{
              bottom: `${5 + (level - 1) * 18}%`,
              background: 'linear-gradient(180deg, #d4af37 0%, #b8962e 100%)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
            }}
            onClick={() => setLevel(l => l < maxLevel ? l + 1 : 1)}
          />
        </div>
        <span className="text-amber-400 text-xs font-serif">Mood</span>
      </div>
    </div>
  );
};

// --- PIANO KEYS PROGRESS ---
export const PianoKeysProgress = () => {
  const [progress] = useState(60);
  const totalKeys = 12;
  const filledKeys = Math.floor((progress / 100) * totalKeys);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#1a1215' }}>
      <div className="flex">
        {[...Array(totalKeys)].map((_, i) => {
          const isBlack = [1, 3, 6, 8, 10].includes(i);
          const isFilled = i < filledKeys;

          return (
            <div
              key={i}
              className="relative transition-all duration-300"
              style={{
                width: isBlack ? '12px' : '16px',
                height: isBlack ? '40px' : '60px',
                marginLeft: isBlack ? '-6px' : '0',
                marginRight: isBlack ? '-6px' : '0',
                zIndex: isBlack ? 10 : 1,
                background: isBlack
                  ? (isFilled ? '#d4af37' : '#1a1a1a')
                  : (isFilled ? '#d4af37' : '#f5f5f5'),
                border: '1px solid #333',
                borderRadius: '0 0 2px 2px',
                boxShadow: isFilled ? '0 0 10px #d4af37' : 'none',
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

// --- SPOTLIGHT LOADER ---
export const SpotlightLoader = () => {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAngle(a => (a + 5) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#1a1215' }}>
      <div className="relative w-24 h-24">
        {/* Spotlight beam */}
        <div
          className="absolute inset-0"
          style={{
            background: `conic-gradient(from ${angle}deg, transparent 0deg, rgba(212,175,55,0.3) 30deg, transparent 60deg)`,
          }}
        />

        {/* Center circle */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full"
          style={{
            background: 'radial-gradient(circle, #d4af37 0%, #8b7355 100%)',
            boxShadow: '0 0 20px #d4af37',
          }}
        />
      </div>
    </div>
  );
};

// --- MARTINI GLASS ICON ---
export const MartiniGlassIcon = () => {
  const [tilt, setTilt] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#1a1215' }}>
      <button
        onMouseEnter={() => setTilt(true)}
        onMouseLeave={() => setTilt(false)}
        className="transition-transform duration-300"
        style={{ transform: tilt ? 'rotate(-10deg)' : 'rotate(0)' }}
      >
        <svg width="48" height="56" viewBox="0 0 48 56">
          {/* Glass */}
          <path
            d="M8,8 L40,8 L24,32 Z"
            fill="none"
            stroke="#d4af37"
            strokeWidth="2"
          />
          {/* Liquid */}
          <path
            d="M12,12 L36,12 L24,28 Z"
            fill="#7f1d1d"
            opacity="0.8"
          />
          {/* Stem */}
          <line x1="24" y1="32" x2="24" y2="48" stroke="#d4af37" strokeWidth="2" />
          {/* Base */}
          <ellipse cx="24" cy="50" rx="10" ry="3" fill="none" stroke="#d4af37" strokeWidth="2" />
          {/* Olive */}
          <circle cx="20" cy="16" r="3" fill="#84cc16" />
          <line x1="20" y1="12" x2="20" y2="20" stroke="#8b7355" strokeWidth="1" />
        </svg>
      </button>
    </div>
  );
};

// --- CURTAIN REVEAL MODAL ---
export const CurtainRevealModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#1a1215' }}>
      <button
        onClick={() => setOpen(true)}
        className="px-6 py-2 font-serif text-amber-200 border border-amber-400 hover:bg-amber-400/10 transition-colors"
      >
        View Show
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-black/80" onClick={() => setOpen(false)} />

          {/* Curtains */}
          <div className="absolute inset-y-0 left-0 w-1/2 origin-left animate-in slide-out-to-left duration-1000"
            style={{
              background: 'linear-gradient(90deg, #7f1d1d 0%, #991b1b 100%)',
              boxShadow: 'inset -20px 0 40px rgba(0,0,0,0.5)',
            }}
          />
          <div className="absolute inset-y-0 right-0 w-1/2 origin-right animate-in slide-out-to-right duration-1000"
            style={{
              background: 'linear-gradient(270deg, #7f1d1d 0%, #991b1b 100%)',
              boxShadow: 'inset 20px 0 40px rgba(0,0,0,0.5)',
            }}
          />

          {/* Content */}
          <div
            className="relative z-10 w-80 p-8 text-center animate-in fade-in duration-1000"
            style={{
              background: '#1a1215',
              border: '2px solid #d4af37',
            }}
          >
            <h2 className="text-amber-400 font-serif text-2xl mb-4">Tonight's Feature</h2>
            <p className="text-amber-200/80 italic">"Autumn Leaves"</p>
            <p className="text-amber-400/60 text-sm mt-4">The Quartet • 10 PM</p>

            <button
              onClick={() => setOpen(false)}
              className="mt-6 px-4 py-2 text-sm text-amber-400 border border-amber-400 hover:bg-amber-400/10"
            >
              Close Curtain
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// --- MICROPHONE STAND NAV ---
export const MicrophoneStandNav = () => {
  const [active, setActive] = useState(0);
  const items = ['Shows', 'Artists', 'Menu', 'About'];

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#1a1215' }}>
      <nav className="flex gap-1">
        {items.map((item, i) => (
          <button
            key={item}
            onClick={() => setActive(i)}
            className="relative px-4 py-2 font-serif text-sm transition-all duration-300"
            style={{
              color: active === i ? '#d4af37' : '#6b5a50',
            }}
          >
            {item}
            {active === i && (
              <>
                {/* Spotlight effect */}
                <div
                  className="absolute inset-0 -z-10"
                  style={{
                    background: 'radial-gradient(ellipse at center top, rgba(212,175,55,0.2) 0%, transparent 70%)',
                  }}
                />
                {/* Underline */}
                <div className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-amber-400" />
              </>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};

// --- JAZZ NOTES ANIMATION ---
export const JazzNotesAnimation = () => {
  const notes = ['♪', '♫', '♬', '♩'];
  const [positions, setPositions] = useState<{ x: number; y: number; note: string; id: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newNote = {
        x: 20 + Math.random() * 60,
        y: 100,
        note: notes[Math.floor(Math.random() * notes.length)],
        id: Date.now(),
      };
      setPositions(prev => [...prev, newNote].slice(-5));
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#1a1215' }}>
      <div className="relative w-32 h-32 overflow-hidden">
        {positions.map((pos, i) => (
          <div
            key={pos.id}
            className="absolute text-amber-400 text-xl transition-all duration-1000"
            style={{
              left: `${pos.x}%`,
              bottom: `${20 + i * 20}%`,
              opacity: 1 - i * 0.2,
              transform: `rotate(${-15 + Math.random() * 30}deg)`,
            }}
          >
            {pos.note}
          </div>
        ))}
      </div>
    </div>
  );
};

// --- CIGAR ASHTRAY DIVIDER ---
export const CigarAshtrayDivider = () => {
  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#1a1215' }}>
      <div className="w-full max-w-xs flex items-center gap-4">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-amber-600/50" />

        {/* Ashtray icon */}
        <div className="relative">
          <div
            className="w-8 h-3 rounded-b-full"
            style={{
              background: 'linear-gradient(180deg, #4a4a4a 0%, #2d2d2d 100%)',
              border: '1px solid #5a5a5a',
            }}
          />
          {/* Cigar */}
          <div
            className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-2 rounded-full"
            style={{
              background: 'linear-gradient(90deg, #8b7355 0%, #a08060 50%, #ff6b35 100%)',
              transform: 'rotate(-15deg)',
            }}
          />
        </div>

        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-amber-600/50" />
      </div>
    </div>
  );
};

// --- TICKET STUB BADGE ---
export const TicketStubBadge = () => {
  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#1a1215' }}>
      <div className="relative flex">
        {/* Main ticket */}
        <div
          className="px-4 py-2"
          style={{
            background: '#d4af37',
            borderRadius: '4px 0 0 4px',
          }}
        >
          <p className="text-black font-serif text-xs font-bold">ADMIT ONE</p>
          <p className="text-black/60 text-[10px]">Blue Note</p>
        </div>

        {/* Perforation line */}
        <div className="w-px h-full" style={{
          backgroundImage: 'repeating-linear-gradient(180deg, #d4af37 0px, #d4af37 4px, #1a1215 4px, #1a1215 8px)',
        }} />

        {/* Stub */}
        <div
          className="px-2 py-2 flex items-center justify-center"
          style={{
            background: '#d4af37',
            borderRadius: '0 4px 4px 0',
          }}
        >
          <span className="text-black font-mono text-xs font-bold">001</span>
        </div>
      </div>
    </div>
  );
};

// --- BASS CLEF HEADING ---
export const BassClefHeading = () => {
  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#1a1215' }}>
      <div className="flex items-center gap-4">
        <span className="text-4xl text-amber-400">𝄢</span>
        <h2 className="font-serif text-2xl text-amber-200 tracking-wide">Blue Note</h2>
        <span className="text-4xl text-amber-400">𝄢</span>
      </div>
    </div>
  );
};

// --- BOURBON GLASS METER ---
export const BourbonGlassMeter = () => {
  const [level] = useState(40);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#1a1215' }}>
      <div className="flex flex-col items-center">
        {/* Glass */}
        <div className="relative">
          <div
            className="w-12 h-20 overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '2px 2px 8px 8px',
              border: '2px solid rgba(255,255,255,0.2)',
            }}
          >
            {/* Liquid */}
            <div
              className="absolute bottom-0 left-0 right-0 transition-all duration-500"
              style={{
                height: `${level}%`,
                background: 'linear-gradient(180deg, #d4a574 0%, #8b6914 100%)',
              }}
            />

            {/* Ice cube */}
            <div
              className="absolute w-4 h-4 rounded"
              style={{
                bottom: `${level - 10}%`,
                left: '25%',
                background: 'rgba(255,255,255,0.3)',
                border: '1px solid rgba(255,255,255,0.4)',
              }}
            />
          </div>

          {/* Glass base */}
          <div
            className="w-8 h-2 mx-auto"
            style={{
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '0 0 4px 4px',
            }}
          />
        </div>

        <span className="text-amber-400 text-xs mt-2 font-serif">{level}%</span>
      </div>
    </div>
  );
};

// --- SHEET MUSIC BACKGROUND ---
export const SheetMusicBackground = () => {
  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#1a1215' }}>
      <div
        className="w-48 h-32 relative overflow-hidden rounded"
        style={{
          background: '#f5f0e6',
          boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
        }}
      >
        {/* Staff lines */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute left-0 right-0 h-px bg-gray-400"
            style={{ top: `${25 + i * 12}%` }}
          />
        ))}

        {/* Notes */}
        <div className="absolute" style={{ left: '15%', top: '25%' }}>
          <span className="text-2xl text-gray-800">♩</span>
        </div>
        <div className="absolute" style={{ left: '35%', top: '35%' }}>
          <span className="text-2xl text-gray-800">♪</span>
        </div>
        <div className="absolute" style={{ left: '55%', top: '20%' }}>
          <span className="text-2xl text-gray-800">♫</span>
        </div>
        <div className="absolute" style={{ left: '75%', top: '40%' }}>
          <span className="text-2xl text-gray-800">♬</span>
        </div>

        {/* Title */}
        <div className="absolute bottom-2 left-2 right-2 text-center">
          <p className="text-gray-600 text-xs italic font-serif">Take Five</p>
        </div>
      </div>
    </div>
  );
};

// Export all components
export const noirJazzClubComponents: Record<string, React.FC> = {
  'noir-velvet-button': VelvetButton,
  'noir-smoky-card': SmokyCard,
  'noir-saxophone-input': SaxophoneInput,
  'noir-vinyl-badge': VinylBadge,
  'noir-dimmer-switch-toggle': DimmerSwitchToggle,
  'noir-piano-keys-progress': PianoKeysProgress,
  'noir-spotlight-loader': SpotlightLoader,
  'noir-martini-glass-icon': MartiniGlassIcon,
  'noir-curtain-reveal-modal': CurtainRevealModal,
  'noir-microphone-stand-nav': MicrophoneStandNav,
  'noir-jazz-notes-animation': JazzNotesAnimation,
  'noir-cigar-ashtray-divider': CigarAshtrayDivider,
  'noir-ticket-stub-badge': TicketStubBadge,
  'noir-bass-clef-heading': BassClefHeading,
  'noir-bourbon-glass-meter': BourbonGlassMeter,
  'noir-sheet-music-background': SheetMusicBackground,
  'noir-smoke-effect': SmokyCard,
};
