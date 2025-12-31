import React, { useState, useEffect } from 'react';

// --- NEON KANJI BUTTON ---
export const NeonKanjiButton = () => {
  const [hover, setHover] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#0a0a12' }}>
      <button
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="relative px-8 py-3 transition-all duration-300"
        style={{
          background: 'transparent',
          border: `2px solid ${hover ? '#ff00ff' : '#ff00ff80'}`,
          boxShadow: hover
            ? '0 0 20px #ff00ff, 0 0 40px #ff00ff40, inset 0 0 20px #ff00ff20'
            : '0 0 10px #ff00ff40',
        }}
      >
        <span
          className="text-lg font-bold tracking-wider transition-all duration-300"
          style={{
            color: hover ? '#fff' : '#ff00ff',
            textShadow: hover ? '0 0 10px #ff00ff' : 'none',
          }}
        >
          東京 ENTER
        </span>
      </button>
    </div>
  );
};

// --- RAIN OVERLAY CARD ---
export const RainOverlayCard = () => {
  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#0a0a12' }}>
      <div
        className="relative w-64 h-40 overflow-hidden rounded-lg"
        style={{
          background: 'linear-gradient(180deg, #1a0a2e 0%, #0d0d1a 100%)',
          border: '1px solid #ff00ff30',
        }}
      >
        {/* Rain effect */}
        <div className="absolute inset-0 opacity-40">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 bg-gradient-to-b from-transparent via-cyan-400 to-transparent animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                height: `${20 + Math.random() * 30}px`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${0.5 + Math.random() * 0.5}s`,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 p-4 h-full flex flex-col justify-end">
          <p className="text-cyan-400 text-xs uppercase tracking-widest">District</p>
          <p className="text-white text-lg font-bold">Shibuya 渋谷</p>
        </div>
      </div>
    </div>
  );
};

// --- HOLOGRAM INPUT ---
export const HologramInput = () => {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#0a0a12' }}>
      <div className="relative w-64">
        {/* Hologram scanlines */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #00ffff10 2px, #00ffff10 4px)',
          }}
        />

        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="ENTER DATA..."
          className="w-full px-4 py-3 font-mono text-cyan-400 placeholder-cyan-700 outline-none transition-all duration-300"
          style={{
            background: '#0a0a1280',
            border: `1px solid ${focused ? '#00ffff' : '#00ffff40'}`,
            boxShadow: focused ? '0 0 20px #00ffff40, inset 0 0 10px #00ffff10' : 'none',
          }}
        />

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />
      </div>
    </div>
  );
};

// --- GLITCH TEXT BADGE ---
export const GlitchTextBadge = () => {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#0a0a12' }}>
      <div className="relative">
        <span
          className="px-4 py-1 font-mono text-sm font-bold"
          style={{
            background: '#ff00ff',
            color: '#fff',
            clipPath: glitch ? 'inset(0 0 0 0)' : 'none',
          }}
        >
          ONLINE
        </span>

        {/* Glitch layers */}
        {glitch && (
          <>
            <span
              className="absolute inset-0 px-4 py-1 font-mono text-sm font-bold"
              style={{
                background: '#00ffff',
                color: '#fff',
                clipPath: 'inset(20% 0 60% 0)',
                transform: 'translateX(-2px)',
              }}
            >
              ONLINE
            </span>
            <span
              className="absolute inset-0 px-4 py-1 font-mono text-sm font-bold"
              style={{
                background: '#ff0000',
                color: '#fff',
                clipPath: 'inset(60% 0 20% 0)',
                transform: 'translateX(2px)',
              }}
            >
              ONLINE
            </span>
          </>
        )}
      </div>
    </div>
  );
};

// --- NEON SIGN TOGGLE ---
export const NeonSignToggle = () => {
  const [on, setOn] = useState(true);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#0a0a12' }}>
      <button
        onClick={() => setOn(!on)}
        className="relative px-6 py-2 font-bold text-lg transition-all duration-300"
        style={{
          color: on ? '#ff00ff' : '#ff00ff40',
          textShadow: on ? '0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 40px #ff00ff' : 'none',
          fontFamily: 'cursive',
        }}
      >
        Open
        {/* Flicker effect when on */}
        {on && (
          <div
            className="absolute inset-0 animate-pulse"
            style={{
              background: 'radial-gradient(ellipse at center, #ff00ff20 0%, transparent 70%)',
            }}
          />
        )}
      </button>
    </div>
  );
};

// --- CYBER PROGRESS BAR ---
export const CyberProgressBar = () => {
  const [progress] = useState(72);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#0a0a12' }}>
      <div className="w-48">
        <div className="flex justify-between text-xs font-mono text-cyan-400 mb-1">
          <span>LOADING</span>
          <span>{progress}%</span>
        </div>
        <div
          className="relative h-2 overflow-hidden"
          style={{
            background: '#0a0a12',
            border: '1px solid #00ffff40',
          }}
        >
          {/* Progress fill with segments */}
          <div
            className="h-full transition-all duration-500"
            style={{
              width: `${progress}%`,
              background: 'repeating-linear-gradient(90deg, #00ffff 0px, #00ffff 8px, transparent 8px, transparent 10px)',
              boxShadow: '0 0 10px #00ffff',
            }}
          />

          {/* Scanning line */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white animate-pulse"
            style={{
              left: `${progress}%`,
              boxShadow: '0 0 10px #fff',
            }}
          />
        </div>
      </div>
    </div>
  );
};

// --- KATAKANA LOADER ---
export const KatakanaLoader = () => {
  const chars = 'アイウエオカキクケコサシスセソタチツテト'.split('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(i => (i + 1) % chars.length);
    }, 150);
    return () => clearInterval(interval);
  }, [chars.length]);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#0a0a12' }}>
      <div className="text-center">
        <div
          className="text-4xl font-bold mb-2"
          style={{
            color: '#ff00ff',
            textShadow: '0 0 20px #ff00ff',
          }}
        >
          {chars[index]}
        </div>
        <p className="text-xs font-mono text-cyan-400 animate-pulse">PROCESSING...</p>
      </div>
    </div>
  );
};

// --- BILLBOARD CARD ---
export const BillboardCard = () => {
  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#0a0a12' }}>
      <div
        className="relative w-48 h-32 overflow-hidden"
        style={{
          background: '#1a0a2e',
          border: '4px solid #333',
          boxShadow: '0 0 30px #ff00ff30, inset 0 0 30px #00000080',
        }}
      >
        {/* Animated gradient background */}
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            background: 'linear-gradient(45deg, #ff00ff20, #00ffff20, #ff00ff20)',
            backgroundSize: '200% 200%',
          }}
        />

        {/* Content */}
        <div className="relative z-10 p-3 h-full flex flex-col justify-between">
          <div className="text-xs font-mono text-cyan-400">AD-2077</div>
          <div>
            <p className="text-white font-bold">CYBER COLA</p>
            <p className="text-xs text-pink-400">サイバーコーラ</p>
          </div>
        </div>

        {/* Scan line effect */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #00000040 2px, #00000040 4px)',
          }}
        />
      </div>
    </div>
  );
};

// --- HACKER TERMINAL ---
export const HackerTerminal = () => {
  const [text, setText] = useState('');
  const fullText = '> ACCESSING MAINFRAME...\n> BREACH SUCCESSFUL\n> DOWNLOADING DATA...';

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#0a0a12' }}>
      <div
        className="w-56 h-32 p-3 font-mono text-xs overflow-hidden"
        style={{
          background: '#000',
          border: '1px solid #00ff00',
          boxShadow: '0 0 10px #00ff0040',
        }}
      >
        <pre className="text-green-400 whitespace-pre-wrap">{text}</pre>
        <span className="inline-block w-2 h-3 bg-green-400 animate-pulse" />
      </div>
    </div>
  );
};

// --- NEON FRAME AVATAR ---
export const NeonFrameAvatar = () => {
  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#0a0a12' }}>
      <div className="relative">
        {/* Rotating neon frame */}
        <div
          className="absolute -inset-2 rounded-full animate-spin"
          style={{
            animationDuration: '4s',
            background: 'conic-gradient(from 0deg, #ff00ff, #00ffff, #ff00ff)',
            padding: '2px',
          }}
        >
          <div className="w-full h-full rounded-full" style={{ background: '#0a0a12' }} />
        </div>

        {/* Avatar */}
        <div
          className="relative w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold"
          style={{
            background: 'linear-gradient(135deg, #1a0a2e 0%, #0d0d1a 100%)',
            border: '2px solid #ff00ff',
            color: '#ff00ff',
            textShadow: '0 0 10px #ff00ff',
          }}
        >
          零
        </div>
      </div>
    </div>
  );
};

// --- STREET SIGN NAV ---
export const StreetSignNav = () => {
  const [active, setActive] = useState(0);
  const items = ['新宿', '渋谷', '秋葉原', '池袋'];

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#0a0a12' }}>
      <nav className="flex flex-col gap-2">
        {items.map((item, i) => (
          <button
            key={item}
            onClick={() => setActive(i)}
            className="relative px-4 py-1 text-left transition-all duration-300"
            style={{
              background: active === i ? '#ff00ff' : 'transparent',
              color: active === i ? '#fff' : '#ff00ff',
              border: '1px solid #ff00ff',
              clipPath: 'polygon(0 0, 95% 0, 100% 50%, 95% 100%, 0 100%)',
              boxShadow: active === i ? '0 0 20px #ff00ff' : 'none',
            }}
          >
            <span className="font-bold">{item}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

// --- DIGITAL CLOCK ---
export const DigitalClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#0a0a12' }}>
      <div
        className="px-4 py-2 font-mono text-2xl font-bold"
        style={{
          background: '#000',
          border: '2px solid #00ffff',
          color: '#00ffff',
          textShadow: '0 0 10px #00ffff',
          boxShadow: '0 0 20px #00ffff40',
        }}
      >
        {time.toLocaleTimeString('en-US', { hour12: false })}
      </div>
    </div>
  );
};

// --- ALERT POPUP ---
export const CyberAlert = () => {
  const [show, setShow] = useState(true);

  if (!show) {
    return (
      <div className="h-full flex items-center justify-center p-6" style={{ background: '#0a0a12' }}>
        <button
          onClick={() => setShow(true)}
          className="text-cyan-400 hover:text-cyan-300 font-mono text-sm"
        >
          [SHOW ALERT]
        </button>
      </div>
    );
  }

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#0a0a12' }}>
      <div
        className="relative w-56 p-4"
        style={{
          background: '#0a0a12',
          border: '2px solid #ff0000',
          boxShadow: '0 0 20px #ff000060',
        }}
      >
        {/* Warning stripes */}
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{
            background: 'repeating-linear-gradient(90deg, #ff0000, #ff0000 10px, #000 10px, #000 20px)',
          }}
        />

        <div className="flex items-start gap-3">
          <span className="text-2xl">⚠</span>
          <div>
            <p className="text-red-400 font-mono text-sm font-bold">SYSTEM BREACH</p>
            <p className="text-red-300 text-xs mt-1">Unauthorized access detected</p>
          </div>
        </div>

        <button
          onClick={() => setShow(false)}
          className="absolute top-2 right-2 text-red-400 hover:text-red-300 text-sm"
        >
          ×
        </button>
      </div>
    </div>
  );
};

// --- POWER METER ---
export const PowerMeter = () => {
  const [level] = useState(7);
  const maxLevel = 10;

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#0a0a12' }}>
      <div className="flex flex-col items-center gap-2">
        <div className="flex gap-1">
          {[...Array(maxLevel)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-8 transition-all duration-300"
              style={{
                background: i < level
                  ? i < 3 ? '#00ff00' : i < 7 ? '#ffff00' : '#ff0000'
                  : '#222',
                boxShadow: i < level
                  ? `0 0 10px ${i < 3 ? '#00ff00' : i < 7 ? '#ffff00' : '#ff0000'}`
                  : 'none',
              }}
            />
          ))}
        </div>
        <span className="text-xs font-mono text-cyan-400">PWR: {level * 10}%</span>
      </div>
    </div>
  );
};

// --- CIRCUIT BOARD PATTERN ---
export const CircuitBoardPattern = () => {
  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#0a0a12' }}>
      <div
        className="w-40 h-40 relative overflow-hidden rounded"
        style={{
          background: '#0d1a0d',
          border: '1px solid #00ff0040',
        }}
      >
        {/* Circuit traces */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
          <path
            d="M10,50 H30 V30 H50 V50 H70 V70 H90"
            stroke="#00ff00"
            strokeWidth="1"
            fill="none"
            opacity="0.6"
          />
          <path
            d="M10,30 H20 V70 H40 V40 H60 V80 H80"
            stroke="#00ff00"
            strokeWidth="1"
            fill="none"
            opacity="0.4"
          />
          <circle cx="30" cy="30" r="3" fill="#00ff00" />
          <circle cx="50" cy="50" r="3" fill="#00ff00" />
          <circle cx="70" cy="70" r="3" fill="#00ff00" />
          <circle cx="40" cy="70" r="2" fill="#ff00ff" />
          <circle cx="60" cy="40" r="2" fill="#00ffff" />
        </svg>

        {/* Pulse animation */}
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            background: 'radial-gradient(circle at 50% 50%, #00ff0010 0%, transparent 70%)',
          }}
        />
      </div>
    </div>
  );
};

// --- DATA STREAM ---
export const DataStream = () => {
  const [chars, setChars] = useState<string[]>([]);

  useEffect(() => {
    const charSet = '01アイウエオカキクケコ';
    const interval = setInterval(() => {
      setChars(prev => {
        const newChars = [...prev, charSet[Math.floor(Math.random() * charSet.length)]];
        return newChars.slice(-20);
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#0a0a12' }}>
      <div
        className="w-32 h-32 overflow-hidden font-mono text-xs"
        style={{ color: '#00ff00' }}
      >
        <div className="flex flex-wrap">
          {chars.map((char, i) => (
            <span
              key={i}
              className="w-4 text-center"
              style={{
                opacity: 0.3 + (i / chars.length) * 0.7,
                textShadow: i === chars.length - 1 ? '0 0 10px #00ff00' : 'none',
              }}
            >
              {char}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- VENDING MACHINE BUTTON ---
export const VendingMachineButton = () => {
  const [pressed, setPressed] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#0a0a12' }}>
      <button
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        onMouseLeave={() => setPressed(false)}
        className="relative w-20 h-20 rounded-lg transition-all duration-150"
        style={{
          background: pressed
            ? 'linear-gradient(180deg, #1a0a2e 0%, #2a1a3e 100%)'
            : 'linear-gradient(180deg, #2a1a3e 0%, #1a0a2e 100%)',
          border: '3px solid #444',
          boxShadow: pressed
            ? 'inset 0 4px 8px rgba(0,0,0,0.5)'
            : '0 4px 8px rgba(0,0,0,0.5), inset 0 -2px 4px rgba(0,0,0,0.3)',
          transform: pressed ? 'translateY(2px)' : 'translateY(0)',
        }}
      >
        <span
          className="text-2xl"
          style={{
            filter: pressed ? 'brightness(1.5)' : 'brightness(1)',
          }}
        >
          🥤
        </span>
        <div
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 h-1 rounded"
          style={{
            background: pressed ? '#00ffff' : '#00ffff60',
            boxShadow: pressed ? '0 0 10px #00ffff' : 'none',
          }}
        />
      </button>
    </div>
  );
};

// Export all components
export const neonTokyoComponents: Record<string, React.FC> = {
  'tokyo-neon-kanji-button': NeonKanjiButton,
  'tokyo-rain-overlay-card': RainOverlayCard,
  'tokyo-hologram-input': HologramInput,
  'tokyo-glitch-text-badge': GlitchTextBadge,
  'tokyo-neon-sign-toggle': NeonSignToggle,
  'tokyo-cyber-progress-bar': CyberProgressBar,
  'tokyo-katakana-loader': KatakanaLoader,
  'tokyo-billboard-card': BillboardCard,
  'tokyo-hacker-terminal': HackerTerminal,
  'tokyo-neon-frame-avatar': NeonFrameAvatar,
  'tokyo-street-sign-nav': StreetSignNav,
  'tokyo-digital-clock': DigitalClock,
  'tokyo-cyber-alert': CyberAlert,
  'tokyo-power-meter': PowerMeter,
  'tokyo-circuit-board-pattern': CircuitBoardPattern,
  'tokyo-data-stream': DataStream,
  'tokyo-vending-machine-button': VendingMachineButton,
};
