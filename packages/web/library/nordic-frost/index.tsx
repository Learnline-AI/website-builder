import React, { useState } from 'react';

// Nordic Frost Color Palette
// Ice White: #f0f4f8
// Pale Blue: #b8d4e3
// Warm Wood: #c4a77d
// Charcoal: #2d3436
// Soft Coral: #e17055

// --- NORDIC PINE BUTTON ---
export const NordicPineButton = () => {
  const [pressed, setPressed] = useState(false);
  const [hover, setHover] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#f0f4f8' }}>
      <button
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        onMouseLeave={() => { setPressed(false); setHover(false); }}
        onMouseEnter={() => setHover(true)}
        className="relative px-8 py-3 transition-all duration-300 overflow-hidden"
        style={{
          background: pressed
            ? 'linear-gradient(180deg, #a08968 0%, #c4a77d 100%)'
            : 'linear-gradient(180deg, #c4a77d 0%, #a08968 100%)',
          borderRadius: '6px',
          boxShadow: pressed
            ? 'inset 0 2px 4px rgba(0,0,0,0.2)'
            : '0 4px 0 #8b7355, 0 6px 12px rgba(0,0,0,0.15)',
          transform: pressed ? 'translateY(2px)' : 'translateY(0)',
          border: '1px solid #8b7355',
        }}
      >
        {/* Wood grain texture */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `
            repeating-linear-gradient(
              85deg,
              transparent,
              transparent 3px,
              rgba(139,115,85,0.3) 3px,
              rgba(139,115,85,0.3) 4px,
              transparent 4px,
              transparent 8px,
              rgba(139,115,85,0.2) 8px,
              rgba(139,115,85,0.2) 9px
            )
          `,
        }} />
        {/* Subtle frost shimmer on hover */}
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: 'linear-gradient(135deg, transparent 40%, rgba(184,212,227,0.3) 50%, transparent 60%)',
            opacity: hover ? 1 : 0,
          }}
        />
        <span className="relative text-white font-medium tracking-wide" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
          Continue
        </span>
      </button>
    </div>
  );
};

// --- NORDIC CABIN CARD ---
export const NordicCabinCard = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#f0f4f8' }}>
      <div
        className="relative w-64 h-44 transition-all duration-500"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: '#fff',
          borderRadius: '4px',
          boxShadow: hovered
            ? '0 12px 32px rgba(45,52,54,0.15)'
            : '0 4px 16px rgba(45,52,54,0.1)',
        }}
      >
        {/* Wooden window frame */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top frame */}
          <div className="absolute top-0 left-0 right-0 h-4" style={{ background: '#c4a77d', borderRadius: '4px 4px 0 0' }} />
          {/* Bottom frame */}
          <div className="absolute bottom-0 left-0 right-0 h-4" style={{ background: '#c4a77d', borderRadius: '0 0 4px 4px' }} />
          {/* Left frame */}
          <div className="absolute top-0 bottom-0 left-0 w-4" style={{ background: '#c4a77d' }} />
          {/* Right frame */}
          <div className="absolute top-0 bottom-0 right-0 w-4" style={{ background: '#c4a77d' }} />
          {/* Center cross */}
          <div className="absolute top-4 bottom-4 left-1/2 w-2 -translate-x-1/2" style={{ background: '#c4a77d' }} />
          <div className="absolute left-4 right-4 top-1/2 h-2 -translate-y-1/2" style={{ background: '#c4a77d' }} />
        </div>

        {/* Frost on glass effect */}
        <div
          className="absolute inset-4 transition-opacity duration-700"
          style={{
            background: 'radial-gradient(ellipse at 30% 30%, rgba(184,212,227,0.4) 0%, transparent 50%)',
            opacity: hovered ? 0.3 : 0.6,
          }}
        />

        {/* Content */}
        <div className="absolute inset-6 flex flex-col justify-end">
          <h3 className="text-sm font-semibold" style={{ color: '#2d3436' }}>Cabin View</h3>
          <p className="text-xs mt-1" style={{ color: '#636e72' }}>Cozy winter retreat</p>
        </div>

        {/* Warm glow from inside (hover effect) */}
        <div
          className="absolute inset-4 pointer-events-none transition-opacity duration-500"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(225,112,85,0.15) 0%, transparent 70%)',
            opacity: hovered ? 1 : 0,
          }}
        />
      </div>
    </div>
  );
};

// --- NORDIC BIRCH INPUT ---
export const NordicBirchInput = () => {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#f0f4f8' }}>
      <div className="relative w-64">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Enter your name"
          className="w-full px-4 py-3 transition-all duration-300 outline-none"
          style={{
            background: '#fafafa',
            borderRadius: '6px',
            border: focused ? '2px solid #b8d4e3' : '2px solid #e8e4dc',
            color: '#2d3436',
            boxShadow: focused ? '0 0 0 3px rgba(184,212,227,0.3)' : 'none',
          }}
        />
        {/* Birch bark texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none rounded-md overflow-hidden"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 6px,
                rgba(45,52,54,0.03) 6px,
                rgba(45,52,54,0.03) 7px
              ),
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent 20px,
                rgba(45,52,54,0.02) 20px,
                rgba(45,52,54,0.02) 21px
              )
            `,
          }}
        />
        {/* Label */}
        <span
          className="absolute -top-2 left-3 px-1 text-xs transition-all duration-300"
          style={{
            background: '#f0f4f8',
            color: focused ? '#b8d4e3' : '#9ca3af',
            transform: focused || value ? 'scale(0.9)' : 'scale(1)',
          }}
        >
          Name
        </span>
      </div>
    </div>
  );
};

// --- NORDIC SNOWFLAKE BADGE ---
export const NordicSnowflakeBadge = () => {
  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#f0f4f8' }}>
      <div
        className="relative px-4 py-2 flex items-center gap-2"
        style={{
          background: 'linear-gradient(135deg, #b8d4e3 0%, #9dc3d6 100%)',
          borderRadius: '20px',
          boxShadow: '0 2px 8px rgba(184,212,227,0.4)',
        }}
      >
        {/* Snowflake SVG */}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
          <line x1="12" y1="2" x2="12" y2="22" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
          <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
          {/* Snowflake branches */}
          <line x1="12" y1="2" x2="9" y2="5" />
          <line x1="12" y1="2" x2="15" y2="5" />
          <line x1="12" y1="22" x2="9" y2="19" />
          <line x1="12" y1="22" x2="15" y2="19" />
          <line x1="2" y1="12" x2="5" y2="9" />
          <line x1="2" y1="12" x2="5" y2="15" />
          <line x1="22" y1="12" x2="19" y2="9" />
          <line x1="22" y1="12" x2="19" y2="15" />
        </svg>
        <span className="text-white text-sm font-medium">Winter Collection</span>
        {/* Crystalline shimmer */}
        <div
          className="absolute inset-0 rounded-full overflow-hidden pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
          }}
        />
      </div>
    </div>
  );
};

// --- NORDIC FIREPLACE TOGGLE ---
export const NordicFireplaceToggle = () => {
  const [on, setOn] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#f0f4f8' }}>
      <button
        onClick={() => setOn(!on)}
        className="relative w-16 h-8 transition-all duration-500"
        style={{
          background: on
            ? 'linear-gradient(180deg, #e17055 0%, #d35400 100%)'
            : '#2d3436',
          borderRadius: '20px',
          boxShadow: on
            ? '0 0 20px rgba(225,112,85,0.5), inset 0 -2px 4px rgba(0,0,0,0.2)'
            : 'inset 0 2px 4px rgba(0,0,0,0.3)',
        }}
      >
        {/* Ember glow effect when on */}
        {on && (
          <>
            <div
              className="absolute inset-0 rounded-full animate-pulse"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(255,200,100,0.3) 0%, transparent 70%)',
              }}
            />
            {/* Flickering ember particles */}
            <div className="absolute inset-0 overflow-hidden rounded-full">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 rounded-full animate-bounce"
                  style={{
                    background: '#ffcc00',
                    left: `${20 + i * 20}%`,
                    top: '40%',
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: '0.8s',
                    boxShadow: '0 0 4px #ff6600',
                  }}
                />
              ))}
            </div>
          </>
        )}

        {/* Toggle knob */}
        <div
          className="absolute top-1 w-6 h-6 rounded-full transition-all duration-300"
          style={{
            left: on ? 'calc(100% - 28px)' : '4px',
            background: on
              ? 'linear-gradient(145deg, #fff 0%, #f0e6dc 100%)'
              : 'linear-gradient(145deg, #6b7280 0%, #4b5563 100%)',
            boxShadow: on
              ? '0 2px 8px rgba(225,112,85,0.4)'
              : '0 2px 4px rgba(0,0,0,0.2)',
          }}
        />
      </button>
      <span className="ml-3 text-sm" style={{ color: '#2d3436' }}>
        {on ? 'Warm' : 'Cold'}
      </span>
    </div>
  );
};

// --- NORDIC AURORA PROGRESS ---
export const NordicAuroraProgress = () => {
  const [progress] = useState(72);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#2d3436' }}>
      <div className="w-48">
        {/* Progress bar container */}
        <div
          className="relative h-3 rounded-full overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.1)' }}
        >
          {/* Aurora gradient fill */}
          <div
            className="absolute inset-y-0 left-0 rounded-full transition-all duration-700"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #00d4aa 0%, #00bcd4 25%, #4dd0e1 50%, #80deea 75%, #e17055 100%)',
              boxShadow: '0 0 12px rgba(0,212,170,0.5)',
            }}
          />
          {/* Animated shimmer */}
          <div
            className="absolute inset-0 animate-pulse"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
              animationDuration: '2s',
            }}
          />
        </div>
        {/* Label */}
        <div className="flex justify-between mt-2">
          <span className="text-xs" style={{ color: '#b8d4e3' }}>Progress</span>
          <span className="text-xs font-mono" style={{ color: '#00d4aa' }}>{progress}%</span>
        </div>
      </div>
    </div>
  );
};

// --- NORDIC SNOWFALL LOADER ---
export const NordicSnowfallLoader = () => {
  const snowflakes = [...Array(12)].map((_, i) => ({
    left: `${8 + (i % 6) * 15}%`,
    delay: `${i * 0.3}s`,
    duration: `${1.5 + Math.random()}s`,
    size: 4 + Math.random() * 4,
  }));

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#2d3436' }}>
      <div className="relative w-20 h-20 overflow-hidden">
        {/* Snowflakes */}
        {snowflakes.map((flake, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-bounce"
            style={{
              width: flake.size,
              height: flake.size,
              left: flake.left,
              top: '-10%',
              background: 'rgba(255,255,255,0.9)',
              boxShadow: '0 0 4px rgba(255,255,255,0.5)',
              animation: `snowfall ${flake.duration} linear infinite`,
              animationDelay: flake.delay,
            }}
          />
        ))}
        {/* Loading text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-medium" style={{ color: '#b8d4e3' }}>Loading...</span>
        </div>
        {/* Inline keyframes */}
        <style>{`
          @keyframes snowfall {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100px) rotate(360deg); opacity: 0; }
          }
        `}</style>
      </div>
    </div>
  );
};

// --- NORDIC KNIT AVATAR ---
export const NordicKnitAvatar = () => {
  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#f0f4f8' }}>
      <div className="relative">
        {/* Knit pattern border */}
        <div
          className="absolute -inset-2 rounded-full"
          style={{
            background: '#e17055',
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 3px,
                rgba(255,255,255,0.3) 3px,
                rgba(255,255,255,0.3) 4px,
                transparent 4px,
                transparent 7px,
                rgba(196,167,125,0.5) 7px,
                rgba(196,167,125,0.5) 8px
              ),
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent 3px,
                rgba(255,255,255,0.2) 3px,
                rgba(255,255,255,0.2) 4px
              )
            `,
          }}
        />
        {/* Avatar circle */}
        <div
          className="relative w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #b8d4e3 0%, #9dc3d6 100%)',
            color: '#2d3436',
            boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.3)',
          }}
        >
          NF
        </div>
        {/* Yarn ball accent */}
        <div
          className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full"
          style={{
            background: '#c4a77d',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }}
        />
      </div>
    </div>
  );
};

// --- NORDIC FROST MODAL ---
export const NordicFrostModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#f0f4f8' }}>
      <button
        onClick={() => setOpen(true)}
        className="px-6 py-2 transition-colors"
        style={{
          background: '#2d3436',
          color: '#f0f4f8',
          borderRadius: '6px',
        }}
      >
        Open Modal
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(45,52,54,0.6)', backdropFilter: 'blur(4px)' }}
            onClick={() => setOpen(false)}
          />

          {/* Modal with frosted glass edges */}
          <div
            className="relative w-80 rounded-lg overflow-hidden"
            style={{
              background: '#fff',
              boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
            }}
          >
            {/* Frosted glass border effect */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Top frost */}
              <div
                className="absolute top-0 left-0 right-0 h-6"
                style={{
                  background: 'linear-gradient(180deg, rgba(184,212,227,0.6) 0%, transparent 100%)',
                }}
              />
              {/* Bottom frost */}
              <div
                className="absolute bottom-0 left-0 right-0 h-6"
                style={{
                  background: 'linear-gradient(0deg, rgba(184,212,227,0.6) 0%, transparent 100%)',
                }}
              />
              {/* Left frost */}
              <div
                className="absolute top-0 bottom-0 left-0 w-6"
                style={{
                  background: 'linear-gradient(90deg, rgba(184,212,227,0.6) 0%, transparent 100%)',
                }}
              />
              {/* Right frost */}
              <div
                className="absolute top-0 bottom-0 right-0 w-6"
                style={{
                  background: 'linear-gradient(270deg, rgba(184,212,227,0.6) 0%, transparent 100%)',
                }}
              />
              {/* Ice crystal texture */}
              <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100">
                <pattern id="frostPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <line x1="10" y1="0" x2="10" y2="20" stroke="#b8d4e3" strokeWidth="0.5" />
                  <line x1="0" y1="10" x2="20" y2="10" stroke="#b8d4e3" strokeWidth="0.5" />
                  <line x1="0" y1="0" x2="20" y2="20" stroke="#b8d4e3" strokeWidth="0.3" />
                  <line x1="20" y1="0" x2="0" y2="20" stroke="#b8d4e3" strokeWidth="0.3" />
                </pattern>
                <rect width="100" height="100" fill="url(#frostPattern)" />
              </svg>
            </div>

            {/* Content */}
            <div className="relative p-6">
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#2d3436' }}>Winter Notice</h3>
              <p className="text-sm mb-4" style={{ color: '#636e72' }}>
                The cabin is ready for your arrival. Warm blankets await.
              </p>
              <button
                onClick={() => setOpen(false)}
                className="w-full py-2 rounded transition-colors"
                style={{ background: '#b8d4e3', color: '#2d3436' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- NORDIC RUNE NAV ---
export const NordicRuneNav = () => {
  const [active, setActive] = useState(0);
  const runes = [
    { symbol: '\u16A0', label: 'Home' },    // Fehu
    { symbol: '\u16A2', label: 'Search' },  // Thurisaz
    { symbol: '\u16B1', label: 'Profile' }, // Jera
    { symbol: '\u16B7', label: 'Settings' }, // Tiwaz
  ];

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#2d3436' }}>
      <nav className="flex gap-2">
        {runes.map((rune, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="relative w-14 h-14 flex flex-col items-center justify-center transition-all duration-300"
            style={{
              background: active === i ? 'rgba(184,212,227,0.2)' : 'transparent',
              borderRadius: '8px',
              border: active === i ? '1px solid rgba(184,212,227,0.5)' : '1px solid transparent',
            }}
          >
            {/* Rune symbol */}
            <span
              className="text-xl transition-all duration-300"
              style={{
                color: active === i ? '#b8d4e3' : '#6b7280',
                textShadow: active === i ? '0 0 8px rgba(184,212,227,0.5)' : 'none',
              }}
            >
              {rune.symbol}
            </span>
            <span
              className="text-[10px] mt-1"
              style={{ color: active === i ? '#b8d4e3' : '#6b7280' }}
            >
              {rune.label}
            </span>
            {/* Active indicator - glowing dot */}
            {active === i && (
              <div
                className="absolute -bottom-1 w-1.5 h-1.5 rounded-full"
                style={{
                  background: '#e17055',
                  boxShadow: '0 0 6px #e17055',
                }}
              />
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};

// --- NORDIC ICICLE DIVIDER ---
export const NordicIcicleDivider = () => {
  const icicles = [12, 20, 8, 16, 24, 10, 18, 14, 22, 6, 15, 20];

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#f0f4f8' }}>
      <div className="w-full max-w-xs">
        {/* Top bar */}
        <div
          className="h-2 rounded-t"
          style={{
            background: 'linear-gradient(180deg, #b8d4e3 0%, #9dc3d6 100%)',
            boxShadow: '0 2px 4px rgba(184,212,227,0.3)',
          }}
        />
        {/* Icicles */}
        <div className="flex justify-between px-1">
          {icicles.map((height, i) => (
            <div
              key={i}
              className="relative"
              style={{
                width: '6px',
                height: `${height}px`,
                background: 'linear-gradient(180deg, #b8d4e3 0%, rgba(184,212,227,0.3) 100%)',
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              }}
            >
              {/* Drip effect */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                style={{ background: 'rgba(184,212,227,0.5)' }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- NORDIC COCOA ALERT ---
export const NordicCocoaAlert = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return (
      <div className="h-full flex items-center justify-center p-6" style={{ background: '#f0f4f8' }}>
        <button
          onClick={() => setVisible(true)}
          className="text-sm"
          style={{ color: '#2d3436' }}
        >
          Show Alert
        </button>
      </div>
    );
  }

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#f0f4f8' }}>
      <div
        className="relative w-64 p-4 rounded-lg"
        style={{
          background: 'linear-gradient(145deg, #c4a77d 0%, #a08968 100%)',
          boxShadow: '0 8px 24px rgba(196,167,125,0.3)',
        }}
      >
        {/* Steam animation */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex gap-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 opacity-60"
              style={{
                height: '20px',
                background: 'linear-gradient(0deg, rgba(255,255,255,0.6) 0%, transparent 100%)',
                borderRadius: '50%',
                animation: `steam ${1.5 + i * 0.3}s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="flex items-start gap-3">
          {/* Mug icon */}
          <div
            className="w-8 h-8 rounded flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.2)' }}
          >
            <span className="text-white text-lg">&#9749;</span>
          </div>
          <div className="flex-1">
            <p className="text-white text-sm font-medium">Time for a break</p>
            <p className="text-white/70 text-xs mt-1">Hot cocoa is ready</p>
          </div>
          <button
            onClick={() => setVisible(false)}
            className="text-white/70 hover:text-white text-lg leading-none"
          >
            &times;
          </button>
        </div>

        {/* Inline keyframes */}
        <style>{`
          @keyframes steam {
            0%, 100% { transform: translateY(0) scaleY(1); opacity: 0.6; }
            50% { transform: translateY(-10px) scaleY(1.2); opacity: 0.3; }
          }
        `}</style>
      </div>
    </div>
  );
};

// --- NORDIC ELK ICON ---
export const NordicElkIcon = () => {
  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#f0f4f8' }}>
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
        {/* Antlers */}
        <path
          d="M25 35 L20 20 L15 15 M20 20 L25 18 M20 20 L18 25"
          stroke="#c4a77d"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M55 35 L60 20 L65 15 M60 20 L55 18 M60 20 L62 25"
          stroke="#c4a77d"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Head */}
        <ellipse cx="40" cy="45" rx="18" ry="15" fill="#2d3436" />

        {/* Ears */}
        <ellipse cx="23" cy="38" rx="4" ry="6" fill="#2d3436" />
        <ellipse cx="57" cy="38" rx="4" ry="6" fill="#2d3436" />

        {/* Snout */}
        <ellipse cx="40" cy="55" rx="8" ry="5" fill="#636e72" />

        {/* Nose */}
        <ellipse cx="40" cy="54" rx="3" ry="2" fill="#2d3436" />

        {/* Eyes */}
        <circle cx="32" cy="42" r="2" fill="#b8d4e3" />
        <circle cx="48" cy="42" r="2" fill="#b8d4e3" />

        {/* Eye shine */}
        <circle cx="33" cy="41" r="0.5" fill="#fff" />
        <circle cx="49" cy="41" r="0.5" fill="#fff" />
      </svg>
    </div>
  );
};

// --- NORDIC MODERN HEADING ---
export const NordicModernHeading = () => {
  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#f0f4f8' }}>
      <div className="text-center">
        <h1
          className="text-3xl font-light tracking-widest mb-2"
          style={{
            color: '#2d3436',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            letterSpacing: '0.3em',
          }}
        >
          NORDIC
        </h1>
        <div className="flex items-center gap-4 justify-center">
          <div className="h-px w-12" style={{ background: '#b8d4e3' }} />
          <span
            className="text-sm uppercase tracking-widest"
            style={{ color: '#b8d4e3' }}
          >
            Design
          </span>
          <div className="h-px w-12" style={{ background: '#b8d4e3' }} />
        </div>
        <p
          className="mt-3 text-xs tracking-wide"
          style={{ color: '#636e72' }}
        >
          Scandinavian Minimalism
        </p>
      </div>
    </div>
  );
};

// --- NORDIC THERMOMETER SLIDER ---
export const NordicThermometerSlider = () => {
  const [temp, setTemp] = useState(18);
  const minTemp = -10;
  const maxTemp = 30;
  const percentage = ((temp - minTemp) / (maxTemp - minTemp)) * 100;

  // Temperature color - cold to warm
  const getTempColor = () => {
    if (temp < 5) return '#b8d4e3';
    if (temp < 15) return '#9dc3d6';
    if (temp < 22) return '#c4a77d';
    return '#e17055';
  };

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#f0f4f8' }}>
      <div className="flex items-center gap-4">
        {/* Thermometer visual */}
        <div className="relative w-6 h-32">
          {/* Tube */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-24 rounded-t-full"
            style={{ background: '#e8e4dc', border: '2px solid #d1d5db' }}
          />
          {/* Mercury */}
          <div
            className="absolute left-1/2 -translate-x-1/2 w-2 rounded-t-full transition-all duration-300"
            style={{
              background: getTempColor(),
              height: `${Math.max(4, percentage * 0.24 * 100 / 100)}px`,
              bottom: '16px',
              boxShadow: `0 0 8px ${getTempColor()}40`,
            }}
          />
          {/* Bulb */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full transition-colors duration-300"
            style={{
              background: getTempColor(),
              border: '2px solid #d1d5db',
              boxShadow: `0 0 12px ${getTempColor()}40`,
            }}
          />
        </div>

        {/* Slider */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-2xl font-light" style={{ color: '#2d3436' }}>
            {temp}°C
          </span>
          <input
            type="range"
            min={minTemp}
            max={maxTemp}
            value={temp}
            onChange={(e) => setTemp(Number(e.target.value))}
            className="w-24 h-2 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(90deg, #b8d4e3 0%, #c4a77d 50%, #e17055 100%)`,
            }}
          />
          <div className="flex justify-between w-24 text-xs" style={{ color: '#636e72' }}>
            <span>{minTemp}°</span>
            <span>{maxTemp}°</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- NORDIC HYGGE TABS ---
export const NordicHyggeTabs = () => {
  const [active, setActive] = useState(0);
  const tabs = ['Warm', 'Cool', 'Cozy'];

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#f0f4f8' }}>
      <div className="w-64">
        {/* Tab buttons */}
        <div
          className="flex rounded-lg p-1"
          style={{ background: '#e8e4dc' }}
        >
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActive(i)}
              className="flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300"
              style={{
                background: active === i
                  ? (i === 0 ? '#e17055' : i === 1 ? '#b8d4e3' : '#c4a77d')
                  : 'transparent',
                color: active === i ? '#fff' : '#636e72',
                boxShadow: active === i ? '0 2px 8px rgba(0,0,0,0.15)' : 'none',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div
          className="mt-4 p-4 rounded-lg transition-all duration-300"
          style={{
            background: active === 0
              ? 'linear-gradient(145deg, rgba(225,112,85,0.1) 0%, rgba(225,112,85,0.05) 100%)'
              : active === 1
              ? 'linear-gradient(145deg, rgba(184,212,227,0.2) 0%, rgba(184,212,227,0.1) 100%)'
              : 'linear-gradient(145deg, rgba(196,167,125,0.2) 0%, rgba(196,167,125,0.1) 100%)',
            border: `1px solid ${active === 0 ? '#e17055' : active === 1 ? '#b8d4e3' : '#c4a77d'}40`,
          }}
        >
          <p className="text-sm" style={{ color: '#2d3436' }}>
            {active === 0 && 'Fireplace crackling, warm blankets'}
            {active === 1 && 'Fresh snow, crisp morning air'}
            {active === 2 && 'Candlelight, hot cocoa, good company'}
          </p>
        </div>
      </div>
    </div>
  );
};

// --- NORDIC SNOW BACKGROUND ---
export const NordicSnowBackground = () => {
  const snowflakes = [...Array(30)].map(() => ({
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 5}s`,
    duration: `${3 + Math.random() * 4}s`,
    size: 2 + Math.random() * 4,
    opacity: 0.4 + Math.random() * 0.4,
  }));

  return (
    <div
      className="h-full w-full relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #2d3436 0%, #4a5568 100%)',
      }}
    >
      {/* Aurora subtle effect at top */}
      <div
        className="absolute top-0 left-0 right-0 h-1/3 opacity-30"
        style={{
          background: 'linear-gradient(180deg, rgba(0,212,170,0.3) 0%, rgba(184,212,227,0.2) 50%, transparent 100%)',
        }}
      />

      {/* Snowflakes */}
      {snowflakes.map((flake, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: flake.size,
            height: flake.size,
            left: flake.left,
            top: '-5%',
            background: '#fff',
            opacity: flake.opacity,
            animation: `gentleSnow ${flake.duration} linear infinite`,
            animationDelay: flake.delay,
          }}
        />
      ))}

      {/* Ground snow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-8"
        style={{
          background: 'linear-gradient(0deg, rgba(240,244,248,0.8) 0%, transparent 100%)',
        }}
      />

      {/* Pine tree silhouettes */}
      <svg className="absolute bottom-0 left-0 right-0 h-20 opacity-50" viewBox="0 0 400 80" preserveAspectRatio="none">
        <path d="M0,80 L20,40 L10,45 L25,20 L15,25 L30,0 L45,25 L35,20 L50,45 L40,40 L60,80 Z" fill="#1a1a2e" />
        <path d="M50,80 L65,50 L58,53 L72,30 L65,33 L80,10 L95,33 L88,30 L102,53 L95,50 L110,80 Z" fill="#1a1a2e" />
        <path d="M100,80 L115,55 L108,58 L122,35 L115,38 L130,15 L145,38 L138,35 L152,58 L145,55 L160,80 Z" fill="#1a1a2e" />
        <path d="M280,80 L295,50 L288,53 L302,30 L295,33 L310,10 L325,33 L318,30 L332,53 L325,50 L340,80 Z" fill="#1a1a2e" />
        <path d="M340,80 L355,55 L348,58 L362,35 L355,38 L370,15 L385,38 L378,35 L392,58 L385,55 L400,80 Z" fill="#1a1a2e" />
      </svg>

      {/* Inline keyframes */}
      <style>{`
        @keyframes gentleSnow {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(calc(100vh + 20px)) translateX(20px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

// Export all components
export const nordicFrostComponents: Record<string, React.FC> = {
  'nordic-pine-button': NordicPineButton,
  'nordic-cabin-card': NordicCabinCard,
  'nordic-birch-input': NordicBirchInput,
  'nordic-snowflake-badge': NordicSnowflakeBadge,
  'nordic-fireplace-toggle': NordicFireplaceToggle,
  'nordic-aurora-progress': NordicAuroraProgress,
  'nordic-snowfall-loader': NordicSnowfallLoader,
  'nordic-knit-avatar': NordicKnitAvatar,
  'nordic-frost-modal': NordicFrostModal,
  'nordic-rune-nav': NordicRuneNav,
  'nordic-icicle-divider': NordicIcicleDivider,
  'nordic-cocoa-alert': NordicCocoaAlert,
  'nordic-elk-icon': NordicElkIcon,
  'nordic-modern-heading': NordicModernHeading,
  'nordic-thermometer-slider': NordicThermometerSlider,
  'nordic-hygge-tabs': NordicHyggeTabs,
  'nordic-snow-background': NordicSnowBackground,
};
