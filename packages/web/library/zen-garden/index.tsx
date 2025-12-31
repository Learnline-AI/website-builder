import React, { useState } from 'react';

// --- BAMBOO BUTTON ---
export const BambooButton = () => {
  const [pressed, setPressed] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#f5f1e8' }}>
      <button
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        onMouseLeave={() => setPressed(false)}
        className="relative px-8 py-3 transition-all duration-300"
        style={{
          background: pressed
            ? 'linear-gradient(180deg, #6b7a3d 0%, #8fa055 100%)'
            : 'linear-gradient(180deg, #8fa055 0%, #6b7a3d 100%)',
          borderRadius: '4px',
          boxShadow: pressed
            ? 'inset 0 2px 4px rgba(0,0,0,0.2)'
            : '0 4px 0 #4a5528, 0 6px 8px rgba(0,0,0,0.15)',
          transform: pressed ? 'translateY(2px)' : 'translateY(0)',
        }}
      >
        {/* Bamboo texture lines */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(255,255,255,0.3) 8px, rgba(255,255,255,0.3) 9px)',
        }} />
        <span className="relative text-white font-medium tracking-wide">Continue</span>
      </button>
    </div>
  );
};

// --- STONE INPUT ---
export const StoneInput = () => {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#f5f1e8' }}>
      <div className="relative w-64">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Enter your name"
          className="w-full px-4 py-3 text-gray-700 placeholder-gray-400 transition-all duration-500 outline-none"
          style={{
            background: 'linear-gradient(145deg, #e8e4dc 0%, #d4cfc6 100%)',
            borderRadius: '8px',
            border: 'none',
            boxShadow: focused
              ? 'inset 2px 2px 6px rgba(0,0,0,0.1), 0 0 0 2px #8fa055'
              : 'inset 2px 2px 6px rgba(0,0,0,0.1)',
          }}
        />
        {/* Zen ripple on focus */}
        <div
          className="absolute -inset-4 rounded-full pointer-events-none transition-all duration-700"
          style={{
            border: '1px solid #8fa05540',
            opacity: focused ? 1 : 0,
            transform: focused ? 'scale(1)' : 'scale(0.8)',
          }}
        />
      </div>
    </div>
  );
};

// --- WATER RIPPLE CARD ---
export const WaterRippleCard = () => {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const addRipple = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples(prev => [...prev, { x, y, id }]);
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 1000);
  };

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#f5f1e8' }}>
      <div
        onClick={addRipple}
        className="relative w-64 h-40 overflow-hidden cursor-pointer"
        style={{
          background: 'linear-gradient(180deg, #4a9b9b 0%, #2d7a7a 100%)',
          borderRadius: '12px',
        }}
      >
        {/* Water surface pattern */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `
            radial-gradient(ellipse 100% 20% at 50% 0%, rgba(255,255,255,0.4) 0%, transparent 60%),
            repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(255,255,255,0.1) 4px, rgba(255,255,255,0.1) 5px)
          `,
        }} />

        {/* Ripples */}
        {ripples.map(ripple => (
          <div
            key={ripple.id}
            className="absolute rounded-full animate-ping"
            style={{
              left: ripple.x - 20,
              top: ripple.y - 20,
              width: 40,
              height: 40,
              border: '2px solid rgba(255,255,255,0.6)',
            }}
          />
        ))}

        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-white/90 text-sm font-medium">Koi Pond</p>
          <p className="text-white/60 text-xs">Click to create ripples</p>
        </div>
      </div>
    </div>
  );
};

// --- SAND RAKE TOGGLE ---
export const SandRakeToggle = () => {
  const [on, setOn] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#f5f1e8' }}>
      <button
        onClick={() => setOn(!on)}
        className="relative w-16 h-8 transition-all duration-500"
        style={{
          background: '#d4cfc6',
          borderRadius: '4px',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        {/* Sand rake lines */}
        <div className="absolute inset-1 overflow-hidden rounded">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute h-0.5 transition-all duration-500"
              style={{
                top: 3 + i * 4,
                left: 2,
                right: 2,
                background: on ? '#8fa055' : '#a39e94',
                transform: on ? `translateX(${i % 2 === 0 ? 2 : -2}px)` : 'translateX(0)',
              }}
            />
          ))}
        </div>

        {/* Rake handle (toggle knob) */}
        <div
          className="absolute top-1 w-6 h-6 transition-all duration-300"
          style={{
            left: on ? 'calc(100% - 28px)' : '4px',
            background: 'linear-gradient(145deg, #8b7355 0%, #6b5a42 100%)',
            borderRadius: '4px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }}
        />
      </button>
    </div>
  );
};

// --- BAMBOO PROGRESS ---
export const BambooProgress = () => {
  const [progress] = useState(65);
  const segments = 8;
  const filledSegments = Math.floor((progress / 100) * segments);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#f5f1e8' }}>
      <div className="flex gap-1">
        {[...Array(segments)].map((_, i) => (
          <div
            key={i}
            className="relative w-6 h-20 transition-all duration-300"
            style={{
              background: i < filledSegments
                ? 'linear-gradient(90deg, #6b7a3d 0%, #8fa055 50%, #6b7a3d 100%)'
                : '#d4cfc6',
              borderRadius: '3px',
              transitionDelay: `${i * 50}ms`,
            }}
          >
            {/* Bamboo node */}
            <div
              className="absolute left-0 right-0 h-1"
              style={{
                top: '30%',
                background: i < filledSegments ? '#4a5528' : '#bbb5aa',
              }}
            />
            <div
              className="absolute left-0 right-0 h-1"
              style={{
                top: '70%',
                background: i < filledSegments ? '#4a5528' : '#bbb5aa',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// --- INK BRUSH BADGE ---
export const InkBrushBadge = () => {
  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#f5f1e8' }}>
      <div className="relative px-6 py-2">
        {/* Brush stroke background */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 120 40" preserveAspectRatio="none">
          <path
            d="M5,20 Q10,5 30,8 T60,10 T90,8 T115,15 Q118,25 110,32 T60,35 T10,30 Q2,25 5,20"
            fill="#2d2d2d"
          />
        </svg>
        <span className="relative text-white text-sm font-medium tracking-wider">禅 ZEN</span>
      </div>
    </div>
  );
};

// --- ROCK GARDEN LOADER ---
export const RockGardenLoader = () => {
  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#f5f1e8' }}>
      <div className="relative w-24 h-24">
        {/* Sand base */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: '#d4cfc6',
            boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.1)',
          }}
        />

        {/* Rotating rake lines */}
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '8s' }}>
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 h-0.5 origin-left"
              style={{
                width: '45%',
                background: `linear-gradient(90deg, transparent 0%, #a39e94 30%, #a39e94 70%, transparent 100%)`,
                transform: `rotate(${i * 45}deg)`,
              }}
            />
          ))}
        </div>

        {/* Center stone */}
        <div
          className="absolute top-1/2 left-1/2 w-6 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: 'linear-gradient(145deg, #6b6b6b 0%, #4a4a4a 100%)',
            boxShadow: '2px 2px 4px rgba(0,0,0,0.2)',
          }}
        />
      </div>
    </div>
  );
};

// --- BONSAI TREE ICON ---
export const BonsaiTreeIcon = () => {
  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#f5f1e8' }}>
      <svg width="80" height="80" viewBox="0 0 80 80">
        {/* Pot */}
        <path
          d="M28,65 L32,75 L48,75 L52,65 Z"
          fill="#8b5a2b"
        />
        <ellipse cx="40" cy="65" rx="14" ry="4" fill="#a0522d" />

        {/* Trunk */}
        <path
          d="M38,65 Q36,55 35,50 Q34,45 40,40"
          stroke="#5d4037"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />

        {/* Foliage clouds */}
        <ellipse cx="30" cy="35" rx="12" ry="8" fill="#4a5528" />
        <ellipse cx="45" cy="30" rx="14" ry="10" fill="#6b7a3d" />
        <ellipse cx="38" cy="22" rx="10" ry="7" fill="#8fa055" />
        <ellipse cx="50" cy="38" rx="8" ry="6" fill="#4a5528" />
      </svg>
    </div>
  );
};

// --- SHOJI SCREEN MODAL ---
export const ShojiScreenModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#f5f1e8' }}>
      <button
        onClick={() => setOpen(true)}
        className="px-6 py-2 text-gray-700 hover:text-gray-900 transition-colors"
        style={{
          background: '#fff',
          border: '2px solid #2d2d2d',
        }}
      >
        Open Shoji
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />

          {/* Shoji screen sliding effect */}
          <div
            className="relative w-80 h-48 animate-in slide-in-from-right duration-500"
            style={{
              background: '#f5f0e6',
              border: '8px solid #8b7355',
            }}
          >
            {/* Shoji grid pattern */}
            <div className="absolute inset-2 grid grid-cols-4 grid-rows-3 gap-0.5">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white/80"
                  style={{ border: '1px solid #8b7355' }}
                />
              ))}
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-gray-700 text-lg font-medium bg-white/90 px-4 py-2">
                Welcome
              </p>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center text-gray-600 hover:text-gray-900"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// --- LANTERN NOTIFICATION ---
export const LanternNotification = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return (
      <div className="h-full flex items-center justify-center p-6" style={{ background: '#f5f1e8' }}>
        <button
          onClick={() => setVisible(true)}
          className="text-gray-600 hover:text-gray-800"
        >
          Show notification
        </button>
      </div>
    );
  }

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#f5f1e8' }}>
      <div className="relative">
        {/* Lantern shape */}
        <div
          className="relative w-48 px-4 py-3"
          style={{
            background: 'linear-gradient(180deg, #e8a87c 0%, #d4845c 100%)',
            borderRadius: '8px 8px 16px 16px',
            boxShadow: '0 8px 24px rgba(212,132,92,0.4)',
          }}
        >
          {/* Top hook */}
          <div
            className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-3"
            style={{
              background: '#2d2d2d',
              borderRadius: '4px 4px 0 0',
            }}
          />

          {/* Inner glow */}
          <div className="absolute inset-2 rounded-lg opacity-50" style={{
            background: 'radial-gradient(ellipse at center, #fff 0%, transparent 70%)',
          }} />

          <p className="relative text-white text-sm font-medium text-center">
            New message received
          </p>

          <button
            onClick={() => setVisible(false)}
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gray-800 text-white text-xs flex items-center justify-center hover:bg-gray-700"
          >
            ×
          </button>
        </div>

        {/* Tassel */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-red-700" />
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3 h-2 bg-red-700 rounded-b" />
      </div>
    </div>
  );
};

// --- TATAMI DIVIDER ---
export const TatamiDivider = () => {
  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#f5f1e8' }}>
      <div className="w-full max-w-xs">
        <div className="flex items-center gap-2">
          <div className="flex-1 h-4" style={{
            background: 'linear-gradient(90deg, #c4b896 0%, #d4c8a6 50%, #c4b896 100%)',
            backgroundImage: `
              linear-gradient(90deg, #c4b896 0%, #d4c8a6 50%, #c4b896 100%),
              repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.05) 3px, rgba(0,0,0,0.05) 4px)
            `,
            border: '1px solid #a09878',
          }} />

          {/* Center ornament */}
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{
              background: '#2d2d2d',
              border: '2px solid #d4af37',
            }}
          >
            <span className="text-amber-400 text-xs">和</span>
          </div>

          <div className="flex-1 h-4" style={{
            background: 'linear-gradient(90deg, #c4b896 0%, #d4c8a6 50%, #c4b896 100%)',
            backgroundImage: `
              linear-gradient(90deg, #c4b896 0%, #d4c8a6 50%, #c4b896 100%),
              repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.05) 3px, rgba(0,0,0,0.05) 4px)
            `,
            border: '1px solid #a09878',
          }} />
        </div>
      </div>
    </div>
  );
};

// --- CHERRY BLOSSOM AVATAR ---
export const CherryBlossomAvatar = () => {
  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#f5f1e8' }}>
      <div className="relative">
        {/* Avatar circle */}
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold"
          style={{
            background: 'linear-gradient(135deg, #ffb7c5 0%, #ff8fa3 100%)',
            boxShadow: '0 4px 12px rgba(255,143,163,0.4)',
          }}
        >
          桜
        </div>

        {/* Floating petals */}
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-bounce"
            style={{
              top: ['-8px', '50%', '100%', '30%'][i],
              left: ['50%', '-8px', '50%', '100%'][i],
              width: '8px',
              height: '10px',
              background: '#ffb7c5',
              borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
              transform: `rotate(${i * 90}deg)`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: '2s',
            }}
          />
        ))}
      </div>
    </div>
  );
};

// --- MEDITATION TIMER ---
export const MeditationTimer = () => {
  const [seconds, setSeconds] = useState(180);
  const [running, setRunning] = useState(false);

  React.useEffect(() => {
    if (!running || seconds <= 0) return;
    const timer = setInterval(() => setSeconds(s => s - 1), 1000);
    return () => clearInterval(timer);
  }, [running, seconds]);

  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const progress = (180 - seconds) / 180;

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#f5f1e8' }}>
      <div className="text-center">
        {/* Enso circle timer */}
        <div className="relative w-24 h-24 mx-auto mb-4">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50" cy="50" r="45"
              fill="none"
              stroke="#d4cfc6"
              strokeWidth="4"
            />
            {/* Progress arc (brush stroke style) */}
            <circle
              cx="50" cy="50" r="45"
              fill="none"
              stroke="#2d2d2d"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`${progress * 283} 283`}
              style={{ transition: 'stroke-dasharray 1s ease-out' }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-mono text-gray-700">
              {minutes}:{secs.toString().padStart(2, '0')}
            </span>
          </div>
        </div>

        <button
          onClick={() => setRunning(!running)}
          className="px-6 py-2 text-gray-700 transition-colors hover:bg-gray-100"
          style={{
            background: '#fff',
            border: '1px solid #d4cfc6',
            borderRadius: '4px',
          }}
        >
          {running ? 'Pause' : 'Begin'}
        </button>
      </div>
    </div>
  );
};

// --- WAVE PATTERN BACKGROUND ---
export const WavePatternBackground = () => {
  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#f5f1e8' }}>
      <div
        className="w-48 h-32 rounded-lg overflow-hidden relative"
        style={{ background: '#1a365d' }}
      >
        {/* Seigaiha wave pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 200 100">
          <defs>
            <pattern id="seigaiha" x="0" y="0" width="40" height="20" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="18" fill="none" stroke="#fff" strokeWidth="1" />
              <circle cx="20" cy="20" r="14" fill="none" stroke="#fff" strokeWidth="1" />
              <circle cx="20" cy="20" r="10" fill="none" stroke="#fff" strokeWidth="1" />
              <circle cx="0" cy="20" r="18" fill="none" stroke="#fff" strokeWidth="1" />
              <circle cx="40" cy="20" r="18" fill="none" stroke="#fff" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="200" height="100" fill="url(#seigaiha)" />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white text-lg font-medium">青海波</span>
        </div>
      </div>
    </div>
  );
};

// --- STEPPING STONE NAV ---
export const SteppingStoneNav = () => {
  const [active, setActive] = useState(0);
  const items = ['Home', 'Garden', 'Tea', 'Art'];

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#f5f1e8' }}>
      <nav className="flex gap-4">
        {items.map((item, i) => (
          <button
            key={item}
            onClick={() => setActive(i)}
            className="relative transition-all duration-300"
            style={{
              transform: active === i ? 'translateY(-4px)' : 'translateY(0)',
            }}
          >
            {/* Stone shape */}
            <div
              className="w-16 h-12 flex items-center justify-center transition-all duration-300"
              style={{
                background: active === i
                  ? 'linear-gradient(145deg, #6b6b6b 0%, #4a4a4a 100%)'
                  : 'linear-gradient(145deg, #a0a0a0 0%, #808080 100%)',
                borderRadius: '40% 50% 45% 55%',
                boxShadow: active === i
                  ? '0 6px 12px rgba(0,0,0,0.3)'
                  : '0 2px 4px rgba(0,0,0,0.2)',
              }}
            >
              <span className={`text-xs font-medium ${active === i ? 'text-white' : 'text-gray-200'}`}>
                {item}
              </span>
            </div>
          </button>
        ))}
      </nav>
    </div>
  );
};

// --- CALLIGRAPHY HEADING ---
export const CalligraphyHeading = () => {
  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#f5f1e8' }}>
      <div className="text-center">
        {/* Vertical calligraphy style */}
        <h2
          className="text-4xl font-bold mb-2"
          style={{
            color: '#2d2d2d',
            fontFamily: 'serif',
            letterSpacing: '0.2em',
            textShadow: '2px 2px 0 rgba(0,0,0,0.1)',
          }}
        >
          平和
        </h2>
        <p className="text-sm text-gray-500 tracking-widest uppercase">Peace</p>

        {/* Red seal stamp */}
        <div
          className="inline-block mt-4 px-2 py-1 rotate-6"
          style={{
            background: '#c53030',
            border: '1px solid #9c2020',
          }}
        >
          <span className="text-white text-xs">印</span>
        </div>
      </div>
    </div>
  );
};

// --- KINTSUGI BUTTON ---
export const KintsugiButton = () => {
  const [clicked, setClicked] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#f5f1e8' }}>
      <button
        onClick={() => setClicked(!clicked)}
        className="relative px-8 py-3 overflow-hidden transition-all duration-300"
        style={{
          background: '#2d2d2d',
          borderRadius: '8px',
          boxShadow: clicked
            ? '0 0 20px rgba(212,175,55,0.5)'
            : '0 4px 12px rgba(0,0,0,0.2)',
        }}
      >
        {/* Gold crack lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 120 48">
          <path
            d="M0,24 L20,20 L35,28 L50,22 L65,26 L80,18 L100,25 L120,22"
            stroke={clicked ? '#d4af37' : 'transparent'}
            strokeWidth="2"
            fill="none"
            className="transition-all duration-500"
          />
          <path
            d="M30,0 L35,15 L32,30 L38,48"
            stroke={clicked ? '#d4af37' : 'transparent'}
            strokeWidth="2"
            fill="none"
            className="transition-all duration-500"
            style={{ transitionDelay: '100ms' }}
          />
          <path
            d="M85,0 L82,18 L88,35 L84,48"
            stroke={clicked ? '#d4af37' : 'transparent'}
            strokeWidth="2"
            fill="none"
            className="transition-all duration-500"
            style={{ transitionDelay: '200ms' }}
          />
        </svg>

        <span className="relative text-white font-medium">
          {clicked ? 'Restored' : 'Embrace Flaws'}
        </span>
      </button>
    </div>
  );
};

// Export all components
export const zenGardenComponents: Record<string, React.FC> = {
  'zen-bamboo-button': BambooButton,
  'zen-stone-input': StoneInput,
  'zen-water-ripple-card': WaterRippleCard,
  'zen-sand-rake-toggle': SandRakeToggle,
  'zen-bamboo-progress': BambooProgress,
  'zen-ink-brush-badge': InkBrushBadge,
  'zen-rock-garden-loader': RockGardenLoader,
  'zen-bonsai-tree-icon': BonsaiTreeIcon,
  'zen-shoji-screen-modal': ShojiScreenModal,
  'zen-lantern-notification': LanternNotification,
  'zen-tatami-divider': TatamiDivider,
  'zen-cherry-blossom-avatar': CherryBlossomAvatar,
  'zen-meditation-timer': MeditationTimer,
  'zen-wave-pattern-background': WavePatternBackground,
  'zen-stepping-stone-nav': SteppingStoneNav,
  'zen-calligraphy-heading': CalligraphyHeading,
  'zen-kintsugi-button': KintsugiButton,
};
