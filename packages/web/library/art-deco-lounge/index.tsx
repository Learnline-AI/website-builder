import React, { useState, useEffect } from 'react';

// Art Deco color palette
const colors = {
  gold: '#d4af37',
  black: '#0a0a0a',
  cream: '#f5f0e6',
  bronze: '#cd7f32',
};

// --- SUNBURST BUTTON ---
export const SunburstButton = () => {
  const [hover, setHover] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: colors.black }}>
      <button
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="relative px-10 py-4 font-serif transition-all duration-300 overflow-hidden"
        style={{
          background: colors.black,
          border: `2px solid ${colors.gold}`,
          color: colors.gold,
        }}
      >
        {/* Sunburst rays */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            opacity: hover ? 1 : 0,
            background: `repeating-conic-gradient(from 0deg, ${colors.gold}20 0deg 10deg, transparent 10deg 20deg)`,
          }}
        />

        {/* Inner glow */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: hover ? 1 : 0,
            background: `radial-gradient(circle at center, ${colors.gold}30 0%, transparent 70%)`,
          }}
        />

        <span className="relative z-10 tracking-[0.3em] uppercase text-sm font-bold">
          Enter
        </span>

        {/* Corner accents */}
        <svg className="absolute top-0 left-0 w-4 h-4" viewBox="0 0 16 16">
          <path d="M0,0 L16,0 L0,16 Z" fill={colors.gold} />
        </svg>
        <svg className="absolute top-0 right-0 w-4 h-4" viewBox="0 0 16 16">
          <path d="M16,0 L0,0 L16,16 Z" fill={colors.gold} />
        </svg>
        <svg className="absolute bottom-0 left-0 w-4 h-4" viewBox="0 0 16 16">
          <path d="M0,16 L0,0 L16,16 Z" fill={colors.gold} />
        </svg>
        <svg className="absolute bottom-0 right-0 w-4 h-4" viewBox="0 0 16 16">
          <path d="M16,16 L16,0 L0,16 Z" fill={colors.gold} />
        </svg>
      </button>
    </div>
  );
};

// --- GATSBY CARD ---
export const GatsbyCard = () => {
  const [hover, setHover] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: colors.black }}>
      <div
        className="relative w-64 h-40 p-6 transition-all duration-300"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          background: `linear-gradient(180deg, #1a1a1a 0%, ${colors.black} 100%)`,
          boxShadow: hover
            ? `0 0 30px ${colors.gold}40, inset 0 0 20px ${colors.gold}10`
            : `0 4px 20px rgba(0,0,0,0.5)`,
        }}
      >
        {/* Geometric border pattern */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          {/* Top zigzag */}
          <path
            d="M0,0 L8,8 L16,0 L24,8 L32,0 L40,8 L48,0 L56,8 L64,0 L72,8 L80,0 L88,8 L96,0 L104,8 L112,0 L120,8 L128,0 L136,8 L144,0 L152,8 L160,0 L168,8 L176,0 L184,8 L192,0 L200,8 L208,0 L216,8 L224,0 L232,8 L240,0 L248,8 L256,0"
            fill="none"
            stroke={colors.gold}
            strokeWidth="2"
            transform="scale(1, 1)"
          />
          {/* Bottom zigzag */}
          <path
            d="M0,160 L8,152 L16,160 L24,152 L32,160 L40,152 L48,160 L56,152 L64,160 L72,152 L80,160 L88,152 L96,160 L104,152 L112,160 L120,152 L128,160 L136,152 L144,160 L152,152 L160,160 L168,152 L176,160 L184,152 L192,160 L200,152 L208,160 L216,152 L224,160 L232,152 L240,160 L248,152 L256,160"
            fill="none"
            stroke={colors.gold}
            strokeWidth="2"
          />
          {/* Side lines */}
          <line x1="0" y1="8" x2="0" y2="152" stroke={colors.gold} strokeWidth="2" />
          <line x1="256" y1="8" x2="256" y2="152" stroke={colors.gold} strokeWidth="2" />
        </svg>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center">
          <h3 className="font-serif text-xl tracking-widest" style={{ color: colors.gold }}>
            THE GATSBY
          </h3>
          <div className="w-16 h-px my-3" style={{ background: colors.bronze }} />
          <p className="text-xs tracking-wider" style={{ color: colors.cream }}>
            EST. 1922
          </p>
        </div>

        {/* Corner diamonds */}
        {[
          { top: '8px', left: '8px' },
          { top: '8px', right: '8px' },
          { bottom: '8px', left: '8px' },
          { bottom: '8px', right: '8px' },
        ].map((pos, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 transform rotate-45"
            style={{ ...pos, background: colors.gold }}
          />
        ))}
      </div>
    </div>
  );
};

// --- GEOMETRIC INPUT ---
export const GeometricInput = () => {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: colors.black }}>
      <div className="relative w-64">
        {/* Zigzag top border */}
        <svg className="absolute -top-2 left-0 w-full h-4" viewBox="0 0 256 16" preserveAspectRatio="none">
          <path
            d="M0,16 L8,8 L16,16 L24,8 L32,16 L40,8 L48,16 L56,8 L64,16 L72,8 L80,16 L88,8 L96,16 L104,8 L112,16 L120,8 L128,16 L136,8 L144,16 L152,8 L160,16 L168,8 L176,16 L184,8 L192,16 L200,8 L208,16 L216,8 L224,16 L232,8 L240,16 L248,8 L256,16"
            fill="none"
            stroke={focused ? colors.gold : colors.bronze}
            strokeWidth="2"
            className="transition-all duration-300"
          />
        </svg>

        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Enter your name..."
          className="w-full px-4 py-3 font-serif tracking-wider outline-none transition-all duration-300"
          style={{
            background: '#1a1a1a',
            border: `1px solid ${focused ? colors.gold : colors.bronze}`,
            borderTop: 'none',
            borderBottom: 'none',
            color: colors.cream,
          }}
        />

        {/* Zigzag bottom border */}
        <svg className="absolute -bottom-2 left-0 w-full h-4" viewBox="0 0 256 16" preserveAspectRatio="none">
          <path
            d="M0,0 L8,8 L16,0 L24,8 L32,0 L40,8 L48,0 L56,8 L64,0 L72,8 L80,0 L88,8 L96,0 L104,8 L112,0 L120,8 L128,0 L136,8 L144,0 L152,8 L160,0 L168,8 L176,0 L184,8 L192,0 L200,8 L208,0 L216,8 L224,0 L232,8 L240,0 L248,8 L256,0"
            fill="none"
            stroke={focused ? colors.gold : colors.bronze}
            strokeWidth="2"
            className="transition-all duration-300"
          />
        </svg>
      </div>
    </div>
  );
};

// --- CHEVRON BADGE ---
export const ChevronBadge = () => {
  const [hover, setHover] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: colors.black }}>
      <div
        className="relative px-6 py-2 cursor-pointer transition-all duration-300"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          background: hover ? colors.gold : 'transparent',
        }}
      >
        {/* Left chevrons */}
        <svg className="absolute left-0 top-0 h-full w-4" viewBox="0 0 16 32">
          <path d="M16,0 L0,16 L16,32" fill="none" stroke={hover ? colors.black : colors.gold} strokeWidth="2" />
          <path d="M12,4 L0,16 L12,28" fill="none" stroke={hover ? colors.black : colors.gold} strokeWidth="1" opacity="0.5" />
        </svg>

        {/* Right chevrons */}
        <svg className="absolute right-0 top-0 h-full w-4" viewBox="0 0 16 32">
          <path d="M0,0 L16,16 L0,32" fill="none" stroke={hover ? colors.black : colors.gold} strokeWidth="2" />
          <path d="M4,4 L16,16 L4,28" fill="none" stroke={hover ? colors.black : colors.gold} strokeWidth="1" opacity="0.5" />
        </svg>

        <span
          className="font-serif text-sm tracking-[0.2em] uppercase transition-colors duration-300"
          style={{ color: hover ? colors.black : colors.gold }}
        >
          Premium
        </span>
      </div>
    </div>
  );
};

// --- FAN TOGGLE ---
export const FanToggle = () => {
  const [isOn, setIsOn] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: colors.black }}>
      <button
        onClick={() => setIsOn(!isOn)}
        className="relative w-24 h-16 overflow-hidden transition-all duration-500"
        style={{
          background: '#1a1a1a',
          border: `2px solid ${colors.gold}`,
        }}
      >
        {/* Fan blades */}
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className="absolute bottom-0 left-1/2 origin-bottom transition-all duration-500"
            style={{
              width: '2px',
              height: isOn ? '50px' : '30px',
              background: `linear-gradient(to top, ${colors.gold}, ${isOn ? colors.gold : colors.bronze}40)`,
              transform: `translateX(-50%) rotate(${-45 + i * 15}deg)`,
              opacity: isOn ? 1 : 0.5,
            }}
          />
        ))}

        {/* Center pivot */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full"
          style={{
            background: colors.gold,
            boxShadow: isOn ? `0 0 15px ${colors.gold}` : 'none',
          }}
        />

        {/* Label */}
        <span
          className="absolute top-1 left-1/2 -translate-x-1/2 text-[8px] tracking-wider"
          style={{ color: colors.cream }}
        >
          {isOn ? 'ON' : 'OFF'}
        </span>
      </button>
    </div>
  );
};

// --- SKYSCRAPER PROGRESS ---
export const SkyscraperProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + 2));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const floors = 10;
  const filledFloors = Math.floor((progress / 100) * floors);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: colors.black }}>
      <div className="flex flex-col items-center">
        {/* Building */}
        <div className="relative">
          {/* Spire */}
          <div
            className="w-2 h-8 mx-auto"
            style={{
              background: `linear-gradient(to top, ${colors.gold}, ${colors.bronze})`,
              clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
            }}
          />

          {/* Main building */}
          <div
            className="w-20 relative overflow-hidden"
            style={{
              background: '#1a1a1a',
              border: `2px solid ${colors.gold}`,
            }}
          >
            {/* Floors */}
            {[...Array(floors)].map((_, i) => (
              <div
                key={i}
                className="h-6 border-b transition-all duration-300 flex items-center justify-center"
                style={{
                  borderColor: colors.bronze,
                  background: i >= floors - filledFloors
                    ? `linear-gradient(90deg, ${colors.gold}40, ${colors.gold}80, ${colors.gold}40)`
                    : 'transparent',
                }}
              >
                {/* Windows */}
                <div className="flex gap-1">
                  {[...Array(3)].map((_, j) => (
                    <div
                      key={j}
                      className="w-2 h-3"
                      style={{
                        background: i >= floors - filledFloors ? colors.gold : colors.bronze,
                        opacity: i >= floors - filledFloors ? 1 : 0.3,
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Base */}
          <div
            className="w-24 h-4 mx-auto -mt-px"
            style={{
              background: colors.gold,
            }}
          />
        </div>

        <span className="mt-2 font-mono text-xs" style={{ color: colors.gold }}>
          {progress}%
        </span>
      </div>
    </div>
  );
};

// --- CHANDELIER LOADER ---
export const ChandelierLoader = () => {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % 12);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: colors.black }}>
      <div className="relative">
        {/* Chain */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-6"
          style={{ background: colors.gold }}
        />

        {/* Main body */}
        <svg width="80" height="80" viewBox="0 0 80 80" className="mt-6">
          {/* Center hub */}
          <circle cx="40" cy="20" r="8" fill={colors.gold} />

          {/* Arms and crystals */}
          {[...Array(6)].map((_, i) => {
            const angle = (i * 60 - 90) * (Math.PI / 180);
            const x1 = 40 + Math.cos(angle) * 8;
            const y1 = 20 + Math.sin(angle) * 8;
            const x2 = 40 + Math.cos(angle) * 25;
            const y2 = 20 + Math.sin(angle) * 25;
            const isGlowing = frame % 6 === i;

            return (
              <g key={i}>
                {/* Arm */}
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={colors.gold}
                  strokeWidth="2"
                />
                {/* Crystal */}
                <polygon
                  points={`${x2},${y2 + 5} ${x2 - 4},${y2 + 15} ${x2},${y2 + 25} ${x2 + 4},${y2 + 15}`}
                  fill={isGlowing ? colors.cream : colors.gold}
                  style={{
                    filter: isGlowing ? `drop-shadow(0 0 10px ${colors.gold})` : 'none',
                    transition: 'all 0.15s',
                  }}
                />
              </g>
            );
          })}

          {/* Center drop */}
          <polygon
            points="40,28 35,45 40,70 45,45"
            fill={colors.gold}
            style={{
              filter: `drop-shadow(0 0 8px ${colors.gold}50)`,
            }}
          />
        </svg>
      </div>
    </div>
  );
};

// --- MIRROR AVATAR ---
export const MirrorAvatar = () => {
  const [hover, setHover] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: colors.black }}>
      <div
        className="relative cursor-pointer transition-transform duration-300"
        style={{ transform: hover ? 'scale(1.05)' : 'scale(1)' }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {/* Ornate frame */}
        <svg width="100" height="120" viewBox="0 0 100 120">
          {/* Outer decorative border */}
          <ellipse
            cx="50"
            cy="55"
            rx="45"
            ry="52"
            fill="none"
            stroke={colors.gold}
            strokeWidth="3"
          />

          {/* Art deco patterns */}
          {[...Array(8)].map((_, i) => {
            const angle = (i * 45) * (Math.PI / 180);
            const x1 = 50 + Math.cos(angle) * 35;
            const y1 = 55 + Math.sin(angle) * 42;
            const x2 = 50 + Math.cos(angle) * 45;
            const y2 = 55 + Math.sin(angle) * 52;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={colors.gold}
                strokeWidth="2"
              />
            );
          })}

          {/* Inner frame */}
          <ellipse
            cx="50"
            cy="55"
            rx="32"
            ry="38"
            fill="#1a1a1a"
            stroke={colors.bronze}
            strokeWidth="2"
          />

          {/* Avatar silhouette */}
          <circle cx="50" cy="45" r="12" fill={colors.cream} />
          <ellipse cx="50" cy="75" rx="18" ry="14" fill={colors.cream} />

          {/* Crown decoration at top */}
          <path
            d="M35,8 L40,0 L45,8 L50,0 L55,8 L60,0 L65,8"
            fill="none"
            stroke={colors.gold}
            strokeWidth="2"
          />

          {/* Reflection shine */}
          {hover && (
            <ellipse
              cx="40"
              cy="45"
              rx="8"
              ry="12"
              fill={`${colors.cream}20`}
            />
          )}
        </svg>
      </div>
    </div>
  );
};

// --- MARQUEE MODAL ---
export const MarqueeModal = () => {
  const [open, setOpen] = useState(false);
  const [bulbFrame, setBulbFrame] = useState(0);

  useEffect(() => {
    if (open) {
      const interval = setInterval(() => {
        setBulbFrame((f) => (f + 1) % 2);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [open]);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: colors.black }}>
      <button
        onClick={() => setOpen(true)}
        className="px-6 py-3 font-serif tracking-widest uppercase transition-all duration-300"
        style={{
          background: colors.gold,
          color: colors.black,
          border: `2px solid ${colors.bronze}`,
        }}
      >
        Now Showing
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(0,0,0,0.9)' }}
            onClick={() => setOpen(false)}
          />

          <div className="relative z-10">
            {/* Marquee frame with bulbs */}
            <div
              className="relative p-8"
              style={{
                background: colors.black,
                border: `4px solid ${colors.gold}`,
              }}
            >
              {/* Top bulbs */}
              <div className="absolute -top-3 left-0 right-0 flex justify-around">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className="w-4 h-4 rounded-full transition-all duration-200"
                    style={{
                      background: (i + bulbFrame) % 2 === 0 ? colors.gold : colors.bronze,
                      boxShadow: (i + bulbFrame) % 2 === 0 ? `0 0 10px ${colors.gold}` : 'none',
                    }}
                  />
                ))}
              </div>

              {/* Bottom bulbs */}
              <div className="absolute -bottom-3 left-0 right-0 flex justify-around">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className="w-4 h-4 rounded-full transition-all duration-200"
                    style={{
                      background: (i + bulbFrame + 1) % 2 === 0 ? colors.gold : colors.bronze,
                      boxShadow: (i + bulbFrame + 1) % 2 === 0 ? `0 0 10px ${colors.gold}` : 'none',
                    }}
                  />
                ))}
              </div>

              {/* Content */}
              <div className="text-center w-72">
                <h2
                  className="font-serif text-3xl tracking-widest"
                  style={{ color: colors.gold }}
                >
                  GRAND OPENING
                </h2>
                <div
                  className="w-full h-px my-4"
                  style={{ background: `linear-gradient(90deg, transparent, ${colors.gold}, transparent)` }}
                />
                <p style={{ color: colors.cream }} className="italic">
                  The most glamorous event of the season
                </p>
                <p className="mt-2 text-sm" style={{ color: colors.bronze }}>
                  December 31, 1925
                </p>

                <button
                  onClick={() => setOpen(false)}
                  className="mt-6 px-6 py-2 font-serif tracking-wider uppercase text-sm transition-all duration-300"
                  style={{
                    border: `1px solid ${colors.gold}`,
                    color: colors.gold,
                    background: 'transparent',
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- PEACOCK NAV ---
export const PeacockNav = () => {
  const [active, setActive] = useState(0);
  const items = ['Home', 'Gallery', 'Events', 'Contact'];

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: colors.black }}>
      <nav className="flex gap-2">
        {items.map((item, i) => (
          <button
            key={item}
            onClick={() => setActive(i)}
            className="relative px-4 py-3 font-serif text-sm tracking-wider transition-all duration-300"
            style={{ color: active === i ? colors.gold : colors.bronze }}
          >
            {item}

            {/* Peacock feather effect */}
            {active === i && (
              <div className="absolute inset-0 -z-10 overflow-hidden">
                {/* Feather eye */}
                <div
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${colors.gold} 20%, #1e3a5f 40%, ${colors.gold} 60%, transparent 70%)`,
                    boxShadow: `0 0 15px ${colors.gold}50`,
                  }}
                />
                {/* Feather strands */}
                {[...Array(7)].map((_, j) => (
                  <div
                    key={j}
                    className="absolute bottom-1 left-1/2 h-10 w-px origin-bottom"
                    style={{
                      background: `linear-gradient(to top, ${colors.gold}, transparent)`,
                      transform: `translateX(-50%) rotate(${-30 + j * 10}deg)`,
                    }}
                  />
                ))}
              </div>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};

// --- JAZZ DIVIDER ---
export const JazzDivider = () => {
  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: colors.black }}>
      <div className="w-full max-w-md flex items-center gap-4">
        {/* Left zigzag line */}
        <svg className="flex-1 h-8" viewBox="0 0 100 32" preserveAspectRatio="none">
          <path
            d="M0,16 L10,8 L20,16 L30,8 L40,16 L50,8 L60,16 L70,8 L80,16 L90,8 L100,16"
            fill="none"
            stroke={colors.gold}
            strokeWidth="2"
          />
        </svg>

        {/* Center musical motif */}
        <div className="flex items-center gap-2">
          <span style={{ color: colors.gold }} className="text-xl">&#9833;</span>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{
              background: colors.gold,
              boxShadow: `0 0 15px ${colors.gold}50`,
            }}
          >
            <span style={{ color: colors.black }} className="text-lg font-bold">&#9834;</span>
          </div>
          <span style={{ color: colors.gold }} className="text-xl">&#9833;</span>
        </div>

        {/* Right zigzag line */}
        <svg className="flex-1 h-8" viewBox="0 0 100 32" preserveAspectRatio="none">
          <path
            d="M0,16 L10,8 L20,16 L30,8 L40,16 L50,8 L60,16 L70,8 L80,16 L90,8 L100,16"
            fill="none"
            stroke={colors.gold}
            strokeWidth="2"
          />
        </svg>
      </div>
    </div>
  );
};

// --- CHAMPAGNE TOAST ---
export const ChampagneToast = () => {
  const [show, setShow] = useState(true);
  const [bubbles, setBubbles] = useState<{ id: number; x: number; delay: number }[]>([]);

  useEffect(() => {
    const newBubbles = [...Array(15)].map((_, i) => ({
      id: i,
      x: 10 + Math.random() * 80,
      delay: Math.random() * 2,
    }));
    setBubbles(newBubbles);
  }, []);

  if (!show) return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: colors.black }}>
      <button
        onClick={() => setShow(true)}
        className="px-4 py-2 font-serif"
        style={{ color: colors.gold, border: `1px solid ${colors.gold}` }}
      >
        Toast Again
      </button>
    </div>
  );

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: colors.black }}>
      <div
        className="relative w-64 p-4 overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #2a1f10 0%, #1a1408 100%)',
          border: `2px solid ${colors.gold}`,
        }}
      >
        {/* Bubbles animation */}
        {bubbles.map((bubble) => (
          <div
            key={bubble.id}
            className="absolute w-2 h-2 rounded-full animate-bounce"
            style={{
              left: `${bubble.x}%`,
              bottom: '-10%',
              background: `radial-gradient(circle, ${colors.cream}80, ${colors.gold}40)`,
              animation: `float-up 3s ease-in-out ${bubble.delay}s infinite`,
            }}
          />
        ))}

        {/* Content */}
        <div className="relative z-10 text-center">
          <div className="text-2xl mb-2">&#127870;</div>
          <p className="font-serif tracking-wider" style={{ color: colors.gold }}>
            Cheers!
          </p>
          <p className="text-xs mt-1" style={{ color: colors.cream }}>
            Your reservation is confirmed
          </p>
          <button
            onClick={() => setShow(false)}
            className="mt-3 text-xs underline"
            style={{ color: colors.bronze }}
          >
            Dismiss
          </button>
        </div>

        <style>{`
          @keyframes float-up {
            0% { transform: translateY(0) scale(1); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-150px) scale(0.5); opacity: 0; }
          }
        `}</style>
      </div>
    </div>
  );
};

// --- FOUNTAIN ICON ---
export const FountainIcon = () => {
  const [hover, setHover] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: colors.black }}>
      <div
        className="relative cursor-pointer transition-transform duration-300"
        style={{ transform: hover ? 'scale(1.1)' : 'scale(1)' }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <svg width="64" height="72" viewBox="0 0 64 72">
          {/* Base tiers */}
          <ellipse cx="32" cy="68" rx="30" ry="4" fill={colors.gold} />
          <rect x="8" y="60" width="48" height="8" fill={colors.gold} />
          <ellipse cx="32" cy="56" rx="20" ry="3" fill={colors.gold} />
          <rect x="16" y="48" width="32" height="8" fill={colors.bronze} />
          <ellipse cx="32" cy="44" rx="12" ry="2" fill={colors.bronze} />

          {/* Center column */}
          <rect x="28" y="20" width="8" height="24" fill={colors.gold} />

          {/* Water spray */}
          {hover && (
            <>
              {[...Array(5)].map((_, i) => (
                <path
                  key={i}
                  d={`M32,20 Q${20 + i * 6},${5 - i * 2} ${16 + i * 8},15`}
                  fill="none"
                  stroke={`${colors.cream}60`}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ))}
            </>
          )}

          {/* Top ornament */}
          <circle cx="32" cy="16" r="6" fill={colors.gold} />
          <polygon points="32,4 28,12 36,12" fill={colors.gold} />

          {/* Side decorations */}
          <path d="M16,48 L10,42 L16,44" fill={colors.bronze} />
          <path d="M48,48 L54,42 L48,44" fill={colors.bronze} />
        </svg>
      </div>
    </div>
  );
};

// --- GILDED HEADING ---
export const GildedHeading = () => {
  const [hover, setHover] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: colors.black }}>
      <div
        className="relative text-center"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {/* Decorative top element */}
        <svg className="w-40 h-8 mx-auto mb-2" viewBox="0 0 160 32">
          <path
            d="M0,24 L20,24 L40,8 L60,24 L80,16 L100,24 L120,8 L140,24 L160,24"
            fill="none"
            stroke={colors.gold}
            strokeWidth="2"
          />
          <circle cx="80" cy="16" r="4" fill={colors.gold} />
        </svg>

        {/* Main heading */}
        <h1
          className="font-serif text-4xl tracking-[0.3em] uppercase transition-all duration-500"
          style={{
            color: colors.gold,
            textShadow: hover
              ? `0 0 20px ${colors.gold}, 0 0 40px ${colors.gold}50`
              : `2px 2px 0 ${colors.bronze}`,
            background: hover
              ? `linear-gradient(180deg, ${colors.gold} 0%, ${colors.cream} 50%, ${colors.gold} 100%)`
              : 'none',
            WebkitBackgroundClip: hover ? 'text' : 'unset',
            WebkitTextFillColor: hover ? 'transparent' : colors.gold,
          }}
        >
          Elegance
        </h1>

        {/* Decorative bottom element */}
        <svg className="w-40 h-8 mx-auto mt-2" viewBox="0 0 160 32">
          <path
            d="M0,8 L20,8 L40,24 L60,8 L80,16 L100,8 L120,24 L140,8 L160,8"
            fill="none"
            stroke={colors.gold}
            strokeWidth="2"
          />
          <circle cx="80" cy="16" r="4" fill={colors.gold} />
        </svg>
      </div>
    </div>
  );
};

// --- RADIO DIAL SLIDER ---
export const RadioDialSlider = () => {
  const [value, setValue] = useState(50);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: colors.black }}>
      <div className="flex flex-col items-center">
        {/* Dial display */}
        <div
          className="relative w-32 h-16 overflow-hidden mb-4"
          style={{
            background: '#1a1a1a',
            border: `2px solid ${colors.gold}`,
            borderRadius: '8px 8px 0 0',
          }}
        >
          {/* Frequency numbers */}
          <div className="absolute inset-x-2 top-2 flex justify-between">
            {['55', '70', '85', '100', '108'].map((num) => (
              <span
                key={num}
                className="text-[8px] font-mono"
                style={{ color: colors.cream }}
              >
                {num}
              </span>
            ))}
          </div>

          {/* Dial lines */}
          <div className="absolute inset-x-0 bottom-4 flex justify-around">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="w-px"
                style={{
                  height: i % 5 === 0 ? '12px' : '6px',
                  background: colors.gold,
                }}
              />
            ))}
          </div>

          {/* Indicator needle */}
          <div
            className="absolute bottom-0 w-0.5 h-6 transition-all duration-200"
            style={{
              left: `${8 + (value / 100) * 84}%`,
              background: colors.cream,
              boxShadow: `0 0 8px ${colors.cream}`,
            }}
          />
        </div>

        {/* Vintage tuning knob */}
        <div
          className="relative w-16 h-16 rounded-full cursor-pointer"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${colors.gold}, ${colors.bronze})`,
            boxShadow: `0 4px 8px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.2)`,
          }}
        >
          {/* Knob ridges */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 w-full h-1"
              style={{
                background: `linear-gradient(90deg, transparent 0%, ${colors.black}40 50%, transparent 100%)`,
                transform: `translate(-50%, -50%) rotate(${i * 30}deg)`,
              }}
            />
          ))}

          {/* Indicator dot */}
          <div
            className="absolute w-2 h-2 rounded-full transition-transform duration-200"
            style={{
              background: colors.black,
              top: '8px',
              left: '50%',
              transform: `translateX(-50%) rotate(${(value / 100) * 270 - 135}deg)`,
              transformOrigin: '50% 24px',
            }}
          />
        </div>

        {/* Slider input (hidden but functional) */}
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => setValue(parseInt(e.target.value))}
          className="w-32 mt-4 opacity-50"
        />
      </div>
    </div>
  );
};

// --- SPEAKEASY TABS ---
export const SpeakeasyTabs = () => {
  const [active, setActive] = useState(0);
  const tabs = ['Cocktails', 'Jazz', 'Dancing', 'Private'];

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: colors.black }}>
      <div className="w-full max-w-sm">
        {/* Tab headers */}
        <div className="flex">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActive(i)}
              className="flex-1 py-3 font-serif text-xs tracking-wider uppercase transition-all duration-300 relative overflow-hidden"
              style={{
                background: active === i ? colors.gold : '#1a1a1a',
                color: active === i ? colors.black : colors.bronze,
                borderTop: `2px solid ${colors.gold}`,
                borderLeft: i === 0 ? `2px solid ${colors.gold}` : 'none',
                borderRight: `2px solid ${colors.gold}`,
              }}
            >
              {/* Secret door crack effect */}
              {active === i && (
                <div
                  className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2"
                  style={{
                    background: `linear-gradient(180deg, transparent, ${colors.black}30, transparent)`,
                  }}
                />
              )}
              {tab}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div
          className="p-6 relative overflow-hidden"
          style={{
            background: '#1a1a1a',
            border: `2px solid ${colors.gold}`,
            borderTop: 'none',
          }}
        >
          {/* Wood grain texture lines */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute left-0 right-0 h-px opacity-10"
              style={{
                top: `${20 + i * 20}%`,
                background: colors.bronze,
              }}
            />
          ))}

          <p className="relative z-10 font-serif italic" style={{ color: colors.cream }}>
            {active === 0 && 'The finest prohibition-era spirits...'}
            {active === 1 && 'Live jazz every evening...'}
            {active === 2 && 'The hottest Charleston in town...'}
            {active === 3 && 'Exclusive backroom access...'}
          </p>

          {/* Keyhole decoration */}
          <div className="absolute bottom-4 right-4 opacity-30">
            <svg width="24" height="32" viewBox="0 0 24 32">
              <circle cx="12" cy="10" r="8" fill="none" stroke={colors.gold} strokeWidth="2" />
              <path d="M8,14 L8,28 L16,28 L16,14" fill="none" stroke={colors.gold} strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- GEOMETRIC BACKGROUND ---
export const GeometricBackground = () => {
  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: colors.black }}>
      <div
        className="relative w-full h-32 overflow-hidden rounded"
        style={{ background: '#0a0a0a' }}
      >
        {/* Repeating art deco pattern */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <defs>
            <pattern id="artDecoPattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              {/* Fan/sunburst */}
              <path
                d="M30,60 L30,30 M30,60 L15,35 M30,60 L45,35 M30,60 L5,45 M30,60 L55,45"
                stroke={colors.gold}
                strokeWidth="1"
                fill="none"
              />
              {/* Chevron top */}
              <path
                d="M0,15 L30,0 L60,15"
                stroke={colors.bronze}
                strokeWidth="1"
                fill="none"
              />
              {/* Diamond */}
              <polygon
                points="30,20 40,30 30,40 20,30"
                fill="none"
                stroke={colors.gold}
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#artDecoPattern)" opacity="0.6" />
        </svg>

        {/* Overlay gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(90deg, ${colors.black} 0%, transparent 20%, transparent 80%, ${colors.black} 100%)`,
          }}
        />

        {/* Center content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <span
            className="font-serif text-lg tracking-[0.5em] uppercase"
            style={{ color: colors.gold }}
          >
            1920
          </span>
        </div>
      </div>
    </div>
  );
};

// Export all components
export const artDecoLoungeComponents: Record<string, React.FC> = {
  'artdeco-sunburst-button': SunburstButton,
  'artdeco-gatsby-card': GatsbyCard,
  'artdeco-geometric-input': GeometricInput,
  'artdeco-chevron-badge': ChevronBadge,
  'artdeco-fan-toggle': FanToggle,
  'artdeco-skyscraper-progress': SkyscraperProgress,
  'artdeco-chandelier-loader': ChandelierLoader,
  'artdeco-mirror-avatar': MirrorAvatar,
  'artdeco-marquee-modal': MarqueeModal,
  'artdeco-peacock-nav': PeacockNav,
  'artdeco-jazz-divider': JazzDivider,
  'artdeco-champagne-toast': ChampagneToast,
  'artdeco-fountain-icon': FountainIcon,
  'artdeco-gilded-heading': GildedHeading,
  'artdeco-radio-dial-slider': RadioDialSlider,
  'artdeco-speakeasy-tabs': SpeakeasyTabs,
  'artdeco-geometric-background': GeometricBackground,
};
