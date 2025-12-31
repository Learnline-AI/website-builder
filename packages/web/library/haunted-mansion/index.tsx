import React, { useState, useEffect } from 'react';

// --- COBWEB BUTTON ---
export const CobwebButton = () => {
  const [hover, setHover] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#1a1520' }}>
      <button
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="relative px-8 py-3 transition-all duration-300"
        style={{
          background: 'linear-gradient(180deg, #2d2535 0%, #1a1520 100%)',
          border: '2px solid #4a3f55',
          borderRadius: '4px',
          boxShadow: hover ? '0 0 20px #8b5cf640' : 'none',
        }}
      >
        {/* Cobweb corners */}
        <svg className="absolute top-0 left-0 w-6 h-6 opacity-40" viewBox="0 0 24 24">
          <path d="M0,0 Q12,4 24,0 M0,0 Q4,12 0,24 M0,0 L24,24" stroke="#999" strokeWidth="0.5" fill="none" />
        </svg>
        <svg className="absolute top-0 right-0 w-6 h-6 opacity-40 scale-x-[-1]" viewBox="0 0 24 24">
          <path d="M0,0 Q12,4 24,0 M0,0 Q4,12 0,24 M0,0 L24,24" stroke="#999" strokeWidth="0.5" fill="none" />
        </svg>

        <span className="relative text-purple-200 font-serif">Enter If You Dare</span>
      </button>
    </div>
  );
};

// --- FLICKERING CANDLE CARD ---
export const FlickeringCandleCard = () => {
  const [flicker, setFlicker] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlicker(0.7 + Math.random() * 0.3);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#1a1520' }}>
      <div
        className="relative w-56 h-36 p-4"
        style={{
          background: 'linear-gradient(180deg, #2d2535 0%, #1a1520 100%)',
          border: '1px solid #4a3f55',
          borderRadius: '8px',
        }}
      >
        {/* Candle glow */}
        <div
          className="absolute top-2 right-2 w-16 h-16 rounded-full transition-opacity"
          style={{
            background: 'radial-gradient(circle, #ffa50060 0%, transparent 70%)',
            opacity: flicker,
          }}
        />

        {/* Candle icon */}
        <div className="absolute top-4 right-4">
          <div className="w-2 h-8 bg-amber-100 rounded-sm" />
          <div
            className="w-3 h-4 -mt-1 -ml-0.5"
            style={{
              background: 'linear-gradient(180deg, #ffa500 0%, #ff6600 100%)',
              borderRadius: '50% 50% 20% 20%',
              opacity: flicker,
              filter: 'blur(1px)',
            }}
          />
        </div>

        <h3 className="text-purple-200 font-serif text-lg">Chamber 13</h3>
        <p className="text-purple-400 text-sm mt-2 opacity-70">The shadows watch...</p>
      </div>
    </div>
  );
};

// --- DUSTY INPUT ---
export const DustyInput = () => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#1a1520' }}>
      <div className="relative w-64">
        <input
          type="text"
          placeholder="Speak your name..."
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full px-4 py-3 font-serif text-purple-200 placeholder-purple-600 outline-none transition-all duration-500"
          style={{
            background: '#2d253580',
            border: `1px solid ${focused ? '#8b5cf6' : '#4a3f55'}`,
            borderRadius: '4px',
            boxShadow: focused ? '0 0 20px #8b5cf620' : 'none',
          }}
        />

        {/* Dust particles */}
        {focused && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-purple-300 animate-ping"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: '2s',
                  opacity: 0.3,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// --- GHOST BADGE ---
export const GhostBadge = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(v => !v);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#1a1520' }}>
      <div
        className="px-4 py-1 font-serif text-sm transition-all duration-1000"
        style={{
          background: '#8b5cf620',
          border: '1px solid #8b5cf640',
          borderRadius: '9999px',
          color: '#c4b5fd',
          opacity: visible ? 1 : 0.3,
          transform: visible ? 'translateY(0)' : 'translateY(-5px)',
        }}
      >
        👻 Spectral
      </div>
    </div>
  );
};

// --- CREAKING DOOR TOGGLE ---
export const CreakingDoorToggle = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#1a1520' }}>
      <button
        onClick={() => setOpen(!open)}
        className="relative w-16 h-24 perspective-500"
      >
        {/* Door frame */}
        <div
          className="absolute inset-0"
          style={{
            background: '#4a3f55',
            border: '2px solid #2d2535',
            borderRadius: '2px 2px 0 0',
          }}
        />

        {/* Door */}
        <div
          className="absolute inset-1 origin-left transition-transform duration-700"
          style={{
            background: 'linear-gradient(90deg, #3d3245 0%, #2d2535 100%)',
            transform: open ? 'rotateY(-70deg)' : 'rotateY(0)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Door handle */}
          <div
            className="absolute right-2 top-1/2 w-2 h-2 rounded-full"
            style={{ background: '#8b7355' }}
          />
        </div>

        {/* Eerie glow when open */}
        {open && (
          <div
            className="absolute inset-2 rounded"
            style={{
              background: 'radial-gradient(circle, #8b5cf620 0%, transparent 70%)',
            }}
          />
        )}
      </button>
    </div>
  );
};

// --- GRANDFATHER CLOCK LOADER ---
export const GrandfatherClockLoader = () => {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAngle(a => (a + 30) % 360);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#1a1520' }}>
      <div className="relative">
        {/* Clock face */}
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{
            background: '#f5f0e6',
            border: '4px solid #8b7355',
            boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.2)',
          }}
        >
          {/* Hour markers */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-2 bg-gray-800"
              style={{
                transform: `rotate(${i * 30}deg) translateY(-32px)`,
              }}
            />
          ))}

          {/* Clock hands */}
          <div
            className="absolute w-1 h-6 bg-gray-800 origin-bottom"
            style={{
              transform: `rotate(${angle}deg)`,
              bottom: '50%',
            }}
          />
          <div
            className="absolute w-0.5 h-8 bg-gray-600 origin-bottom"
            style={{
              transform: `rotate(${angle * 12}deg)`,
              bottom: '50%',
            }}
          />

          {/* Center dot */}
          <div className="absolute w-2 h-2 rounded-full bg-gray-800" />
        </div>

        {/* Pendulum */}
        <div
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 origin-top"
          style={{
            transform: `rotate(${Math.sin(angle * Math.PI / 180) * 20}deg)`,
            transition: 'transform 1s ease-in-out',
          }}
        >
          <div className="w-0.5 h-6 bg-gray-600" />
          <div className="w-4 h-4 -ml-[7px] rounded-full bg-amber-600" />
        </div>
      </div>
    </div>
  );
};

// --- PORTRAIT FRAME ---
export const PortraitFrame = () => {
  const [watching, setWatching] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#1a1520' }}>
      <div
        className="relative p-2 cursor-pointer"
        style={{
          background: 'linear-gradient(135deg, #8b7355 0%, #5d4a3a 100%)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
        }}
        onMouseEnter={() => setWatching(true)}
        onMouseLeave={() => setWatching(false)}
      >
        {/* Ornate corners */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-amber-300" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-amber-300" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-amber-300" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-amber-300" />

        {/* Portrait */}
        <div
          className="w-20 h-28 flex flex-col items-center justify-center"
          style={{
            background: '#2d2535',
            border: '2px solid #4a3f55',
          }}
        >
          {/* Face silhouette with moving eyes */}
          <div className="relative">
            <div className="w-8 h-10 rounded-full bg-gray-700" />
            {/* Eyes */}
            <div
              className="absolute top-3 left-1 w-2 h-2 rounded-full bg-white flex items-center justify-center transition-all duration-300"
              style={{ transform: watching ? 'translateX(1px)' : 'translateX(0)' }}
            >
              <div className="w-1 h-1 rounded-full bg-black" />
            </div>
            <div
              className="absolute top-3 right-1 w-2 h-2 rounded-full bg-white flex items-center justify-center transition-all duration-300"
              style={{ transform: watching ? 'translateX(1px)' : 'translateX(0)' }}
            >
              <div className="w-1 h-1 rounded-full bg-black" />
            </div>
          </div>
          <p className="text-purple-400 text-[8px] mt-2 font-serif">Lord Umber</p>
        </div>
      </div>
    </div>
  );
};

// --- TOMBSTONE CARD ---
export const TombstoneCard = () => {
  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#1a1520' }}>
      <div
        className="relative w-32 h-44 flex flex-col items-center justify-center text-center"
        style={{
          background: 'linear-gradient(180deg, #4a4a4a 0%, #2d2d2d 100%)',
          borderRadius: '40% 40% 0 0',
          boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
        }}
      >
        {/* Cross */}
        <div className="text-2xl mb-2">✝</div>
        <p className="text-gray-300 font-serif text-sm">R.I.P.</p>
        <p className="text-gray-400 text-xs mt-1">John Doe</p>
        <p className="text-gray-500 text-[10px] mt-1">1823 - 1887</p>

        {/* Moss/age effect */}
        <div
          className="absolute bottom-0 left-0 right-0 h-8 opacity-40"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, #2d4a2d 100%)',
          }}
        />
      </div>
    </div>
  );
};

// --- SPIDER CRAWL DIVIDER ---
export const SpiderCrawlDivider = () => {
  const [pos, setPos] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPos(p => (p + 5) % 100);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#1a1520' }}>
      <div className="w-full max-w-xs relative">
        {/* Cobweb line */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-30" />

        {/* Spider */}
        <div
          className="absolute -top-2 transition-all duration-100"
          style={{ left: `${pos}%` }}
        >
          🕷️
        </div>
      </div>
    </div>
  );
};

// --- OUIJA BOARD SELECT ---
export const OuijaBoardSelect = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const letters = 'YES,NO,GOODBYE'.split(',');

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#1a1520' }}>
      <div
        className="p-4 rounded-lg"
        style={{
          background: 'linear-gradient(180deg, #3d3020 0%, #2d2418 100%)',
          border: '2px solid #5d4a3a',
        }}
      >
        <div className="flex gap-4">
          {letters.map((letter) => (
            <button
              key={letter}
              onClick={() => setSelected(letter)}
              className="relative px-4 py-2 font-serif text-sm transition-all duration-300"
              style={{
                color: selected === letter ? '#f5f0e6' : '#a0906a',
                textShadow: selected === letter ? '0 0 10px #ffa500' : 'none',
              }}
            >
              {letter}
              {selected === letter && (
                <div
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, #8b5cf620 0%, transparent 70%)',
                  }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- BAT SWARM NOTIFICATION ---
export const BatSwarmNotification = () => {
  const [show, setShow] = useState(true);

  if (!show) {
    return (
      <div className="h-full flex items-center justify-center p-6" style={{ background: '#1a1520' }}>
        <button
          onClick={() => setShow(true)}
          className="text-purple-400 hover:text-purple-300 font-serif"
        >
          Summon the bats
        </button>
      </div>
    );
  }

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#1a1520' }}>
      <div
        className="relative w-52 p-4"
        style={{
          background: '#2d2535',
          border: '1px solid #4a3f55',
          borderRadius: '8px',
        }}
      >
        {/* Flying bats */}
        {[...Array(3)].map((_, i) => (
          <span
            key={i}
            className="absolute text-lg animate-bounce"
            style={{
              top: `${-10 + i * 5}px`,
              left: `${10 + i * 30}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: '1s',
            }}
          >
            🦇
          </span>
        ))}

        <p className="text-purple-200 font-serif text-sm">A message from beyond...</p>
        <p className="text-purple-400 text-xs mt-1">The spirits are restless tonight.</p>

        <button
          onClick={() => setShow(false)}
          className="absolute top-2 right-2 text-purple-400 hover:text-purple-300"
        >
          ×
        </button>
      </div>
    </div>
  );
};

// --- POTION BOTTLE PROGRESS ---
export const PotionBottleProgress = () => {
  const [level] = useState(65);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#1a1520' }}>
      <div className="flex flex-col items-center">
        {/* Bottle */}
        <div className="relative">
          {/* Bottle neck */}
          <div
            className="w-4 h-4 mx-auto"
            style={{
              background: '#4a4a4a',
              borderRadius: '2px 2px 0 0',
            }}
          />
          {/* Bottle body */}
          <div
            className="relative w-12 h-20 overflow-hidden"
            style={{
              background: 'rgba(139, 92, 246, 0.1)',
              border: '2px solid #4a4a4a',
              borderRadius: '4px 4px 8px 8px',
            }}
          >
            {/* Liquid */}
            <div
              className="absolute bottom-0 left-0 right-0 transition-all duration-500"
              style={{
                height: `${level}%`,
                background: 'linear-gradient(180deg, #a78bfa 0%, #7c3aed 100%)',
                boxShadow: 'inset 0 0 10px #8b5cf6',
              }}
            >
              {/* Bubbles */}
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-purple-300 animate-ping"
                  style={{
                    left: `${20 + i * 25}%`,
                    bottom: `${10 + i * 20}%`,
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: '2s',
                    opacity: 0.5,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        <span className="text-purple-400 text-xs mt-2 font-serif">{level}% Full</span>
      </div>
    </div>
  );
};

// --- EERIE WINDOW ---
export const EerieWindow = () => {
  const [lightning, setLightning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setLightning(true);
      setTimeout(() => setLightning(false), 200);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#1a1520' }}>
      <div
        className="relative w-28 h-36 p-1"
        style={{
          background: '#4a3f55',
          border: '4px solid #2d2535',
        }}
      >
        {/* Window panes */}
        <div className="grid grid-cols-2 gap-1 h-full">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="transition-all duration-100"
              style={{
                background: lightning
                  ? 'linear-gradient(180deg, #e0e0ff 0%, #9090ff 100%)'
                  : 'linear-gradient(180deg, #1a1a2e 0%, #0a0a14 100%)',
              }}
            />
          ))}
        </div>

        {/* Curtains */}
        <div className="absolute top-0 left-0 w-4 h-full bg-gradient-to-r from-purple-900 to-transparent opacity-60" />
        <div className="absolute top-0 right-0 w-4 h-full bg-gradient-to-l from-purple-900 to-transparent opacity-60" />
      </div>
    </div>
  );
};

// --- SKELETON KEY ICON ---
export const SkeletonKeyIcon = () => {
  const [turn, setTurn] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#1a1520' }}>
      <button
        onClick={() => setTurn(!turn)}
        className="transition-transform duration-500"
        style={{ transform: turn ? 'rotate(90deg)' : 'rotate(0)' }}
      >
        <svg width="48" height="48" viewBox="0 0 48 48">
          {/* Key head */}
          <circle cx="12" cy="24" r="8" fill="none" stroke="#8b7355" strokeWidth="3" />
          <circle cx="12" cy="24" r="4" fill="none" stroke="#8b7355" strokeWidth="2" />
          {/* Key shaft */}
          <rect x="18" y="22" width="24" height="4" fill="#8b7355" />
          {/* Key teeth */}
          <rect x="34" y="26" width="3" height="4" fill="#8b7355" />
          <rect x="38" y="26" width="3" height="6" fill="#8b7355" />
        </svg>
      </button>
    </div>
  );
};

// --- HAUNTED HEADING ---
export const HauntedHeading = () => {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setOpacity(0.3 + Math.random() * 0.7);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#1a1520' }}>
      <h2
        className="text-3xl font-serif text-purple-200 transition-opacity duration-100"
        style={{
          opacity,
          textShadow: '0 0 20px #8b5cf6',
        }}
      >
        Nevermore
      </h2>
    </div>
  );
};

// --- CHAIN LINK BORDER ---
export const ChainLinkBorder = () => {
  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#1a1520' }}>
      <div className="relative w-40 h-24 flex items-center justify-center">
        {/* Chain links */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 160 96">
          {/* Top chain */}
          {[...Array(8)].map((_, i) => (
            <ellipse
              key={`top-${i}`}
              cx={10 + i * 20}
              cy="8"
              rx="8"
              ry="6"
              fill="none"
              stroke="#5d4a3a"
              strokeWidth="2"
            />
          ))}
          {/* Bottom chain */}
          {[...Array(8)].map((_, i) => (
            <ellipse
              key={`bottom-${i}`}
              cx={10 + i * 20}
              cy="88"
              rx="8"
              ry="6"
              fill="none"
              stroke="#5d4a3a"
              strokeWidth="2"
            />
          ))}
        </svg>

        <span className="text-purple-300 font-serif text-sm">Imprisoned</span>
      </div>
    </div>
  );
};

// Export all components
export const hauntedMansionComponents: Record<string, React.FC> = {
  'haunted-cobweb-button': CobwebButton,
  'haunted-flickering-candle-card': FlickeringCandleCard,
  'haunted-dusty-input': DustyInput,
  'haunted-ghost-badge': GhostBadge,
  'haunted-creaking-door-toggle': CreakingDoorToggle,
  'haunted-grandfather-clock-loader': GrandfatherClockLoader,
  'haunted-portrait-frame': PortraitFrame,
  'haunted-tombstone-card': TombstoneCard,
  'haunted-spider-crawl-divider': SpiderCrawlDivider,
  'haunted-ouija-board-select': OuijaBoardSelect,
  'haunted-bat-swarm-notification': BatSwarmNotification,
  'haunted-potion-bottle-progress': PotionBottleProgress,
  'haunted-eerie-window': EerieWindow,
  'haunted-skeleton-key-icon': SkeletonKeyIcon,
  'haunted-haunted-heading': HauntedHeading,
  'haunted-chain-link-border': ChainLinkBorder,
  'haunted-grandfather-clock': GrandfatherClockLoader,
};
