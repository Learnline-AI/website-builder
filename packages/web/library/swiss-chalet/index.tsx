import React, { useState, useEffect } from 'react';

// Color palette
const COLORS = {
  warmWood: '#8b6914',
  cream: '#f5f0e6',
  swissRed: '#ff0000',
  forestGreen: '#228b22',
  skyBlue: '#87ceeb',
};

// --- SWISS COWBELL BUTTON ---
export const SwissCowbellButton = () => {
  const [ringing, setRinging] = useState(false);

  const handleClick = () => {
    setRinging(true);
    setTimeout(() => setRinging(false), 600);
  };

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: COLORS.cream }}>
      <button
        onClick={handleClick}
        className="relative px-8 py-4 transition-all duration-200"
        style={{
          background: `linear-gradient(180deg, ${COLORS.warmWood} 0%, #6b5010 100%)`,
          borderRadius: '8px',
          boxShadow: '0 4px 0 #4a3a0a, 0 6px 12px rgba(0,0,0,0.2)',
          transform: ringing ? 'translateY(2px)' : 'translateY(0)',
        }}
      >
        {/* Cowbell icon */}
        <div className="flex items-center gap-3">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            className={`transition-transform ${ringing ? 'animate-[ring_0.15s_ease-in-out_4]' : ''}`}
            style={{ transformOrigin: 'top center' }}
          >
            {/* Bell body */}
            <path
              d="M8,8 L24,8 L26,28 L6,28 Z"
              fill="#c9a227"
              stroke="#8b6914"
              strokeWidth="2"
            />
            {/* Strap */}
            <rect x="12" y="2" width="8" height="8" rx="2" fill={COLORS.swissRed} />
            {/* Clapper */}
            <circle cx="16" cy="24" r="3" fill="#4a3a0a" />
          </svg>
          <span className="text-white font-bold tracking-wide">Ring Bell</span>
        </div>

        {/* Ring effect */}
        {ringing && (
          <>
            <div className="absolute -right-2 -top-2 text-yellow-300 text-sm animate-ping">*</div>
            <div className="absolute -left-2 -top-2 text-yellow-300 text-sm animate-ping" style={{ animationDelay: '0.1s' }}>*</div>
          </>
        )}
      </button>

      <style>{`
        @keyframes ring {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(15deg); }
          75% { transform: rotate(-15deg); }
        }
      `}</style>
    </div>
  );
};

// --- SWISS CHALET CARD ---
export const SwissChaletCard = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: COLORS.skyBlue }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative w-72 transition-all duration-300"
        style={{
          transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        }}
      >
        {/* Roof */}
        <div
          className="absolute -top-8 left-1/2 -translate-x-1/2 w-80"
          style={{
            height: '40px',
            background: `linear-gradient(180deg, #5d4037 0%, #3e2723 100%)`,
            clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
          }}
        />
        {/* Roof overhang pattern */}
        <div
          className="absolute -top-1 left-0 right-0 h-3"
          style={{
            background: COLORS.warmWood,
            borderRadius: '0 0 4px 4px',
          }}
        >
          <div className="flex justify-around h-full items-end px-2">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2"
                style={{
                  background: '#5d4037',
                  clipPath: 'polygon(50% 100%, 0% 0%, 100% 0%)',
                }}
              />
            ))}
          </div>
        </div>

        {/* Main card body */}
        <div
          className="relative p-6 pt-8"
          style={{
            background: `linear-gradient(180deg, #deb887 0%, #d2a679 100%)`,
            border: `4px solid ${COLORS.warmWood}`,
            borderRadius: '0 0 8px 8px',
          }}
        >
          {/* Wood grain texture */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(0,0,0,0.1) 20px, rgba(0,0,0,0.1) 21px)',
          }} />

          {/* Window */}
          <div className="flex justify-center mb-4">
            <div
              className="w-16 h-16 grid grid-cols-2 gap-0.5 p-1"
              style={{
                background: COLORS.warmWood,
                borderRadius: '4px',
              }}
            >
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-sky-200 rounded-sm" />
              ))}
            </div>
          </div>

          <h3 className="text-center font-bold text-lg mb-2" style={{ color: '#3e2723' }}>
            Alpine Retreat
          </h3>
          <p className="text-center text-sm" style={{ color: '#5d4037' }}>
            A cozy mountain getaway nestled in the Swiss Alps
          </p>

          {/* Flower box */}
          <div className="mt-4 flex justify-center">
            <div className="flex gap-1 px-3 py-1" style={{ background: '#5d4037', borderRadius: '4px' }}>
              {['red', 'pink', 'red', 'pink', 'red'].map((color, i) => (
                <div
                  key={i}
                  className="w-3 h-3 rounded-full"
                  style={{ background: color === 'red' ? COLORS.swissRed : '#ff69b4' }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- SWISS CARVED INPUT ---
export const SwissCarvedInput = () => {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: COLORS.cream }}>
      <div className="relative w-64">
        {/* Carved border frame */}
        <div
          className="absolute -inset-2 rounded-lg transition-all duration-300"
          style={{
            background: COLORS.warmWood,
            boxShadow: focused
              ? `inset 2px 2px 4px rgba(0,0,0,0.3), 0 0 0 2px ${COLORS.forestGreen}`
              : 'inset 2px 2px 4px rgba(0,0,0,0.3)',
          }}
        >
          {/* Carved pattern on top/bottom */}
          <div className="absolute top-0 left-4 right-4 h-2 flex justify-around items-center">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full"
                style={{ background: '#6b5010', boxShadow: 'inset 1px 1px 2px rgba(0,0,0,0.3)' }}
              />
            ))}
          </div>
          <div className="absolute bottom-0 left-4 right-4 h-2 flex justify-around items-center">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full"
                style={{ background: '#6b5010', boxShadow: 'inset 1px 1px 2px rgba(0,0,0,0.3)' }}
              />
            ))}
          </div>
          {/* Corner flowers */}
          {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos, i) => (
            <div
              key={i}
              className={`absolute ${pos} w-3 h-3`}
              style={{
                background: '#c9a227',
                borderRadius: '50%',
                boxShadow: 'inset 1px 1px 2px rgba(255,255,255,0.3)',
              }}
            />
          ))}
        </div>

        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Enter your name"
          className="relative w-full px-4 py-3 text-gray-800 placeholder-gray-400 outline-none"
          style={{
            background: COLORS.cream,
            borderRadius: '4px',
            fontFamily: 'serif',
          }}
        />
      </div>
    </div>
  );
};

// --- SWISS EDELWEISS BADGE ---
export const SwissEdelweissBadge = () => {
  const [sparkle, setSparkle] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSparkle(true);
      setTimeout(() => setSparkle(false), 500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: COLORS.forestGreen }}>
      <div className="relative">
        {/* Badge background */}
        <div
          className="px-6 py-3 rounded-full flex items-center gap-3"
          style={{
            background: COLORS.cream,
            border: `3px solid ${COLORS.warmWood}`,
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          }}
        >
          {/* Edelweiss flower */}
          <svg width="28" height="28" viewBox="0 0 28 28" className={sparkle ? 'animate-pulse' : ''}>
            {/* Petals */}
            {[...Array(8)].map((_, i) => (
              <ellipse
                key={i}
                cx="14"
                cy="6"
                rx="3"
                ry="6"
                fill="#f5f5dc"
                stroke="#d4c896"
                strokeWidth="0.5"
                transform={`rotate(${i * 45} 14 14)`}
              />
            ))}
            {/* Center */}
            <circle cx="14" cy="14" r="4" fill="#f0e68c" />
            <circle cx="14" cy="14" r="2" fill="#daa520" />
          </svg>

          <span className="font-bold" style={{ color: COLORS.warmWood }}>
            Alpine Star
          </span>
        </div>

        {/* Sparkle effects */}
        {sparkle && (
          <>
            <div className="absolute -top-1 -right-1 text-yellow-300 text-xs animate-ping">*</div>
            <div className="absolute -bottom-1 -left-1 text-yellow-300 text-xs animate-ping" style={{ animationDelay: '0.2s' }}>*</div>
          </>
        )}
      </div>
    </div>
  );
};

// --- SWISS CUCKOO TOGGLE ---
export const SwissCuckooToggle = () => {
  const [on, setOn] = useState(false);
  const [cuckooing, setCuckooing] = useState(false);

  const handleToggle = () => {
    const newState = !on;
    setOn(newState);
    if (newState) {
      setCuckooing(true);
      setTimeout(() => setCuckooing(false), 800);
    }
  };

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: COLORS.cream }}>
      <div className="relative">
        {/* Cuckoo bird popup */}
        <div
          className="absolute -top-12 left-1/2 -translate-x-1/2 transition-all duration-300"
          style={{
            opacity: cuckooing ? 1 : 0,
            transform: cuckooing ? 'translateY(0) translateX(-50%)' : 'translateY(20px) translateX(-50%)',
          }}
        >
          <div className="relative">
            {/* Bird house door */}
            <div
              className="w-10 h-12 rounded-t-full"
              style={{ background: COLORS.warmWood }}
            />
            {/* Bird */}
            <div
              className="absolute bottom-2 left-1/2 -translate-x-1/2"
              style={{
                animation: cuckooing ? 'cuckoo 0.4s ease-in-out 2' : 'none',
              }}
            >
              <svg width="24" height="20" viewBox="0 0 24 20">
                <ellipse cx="12" cy="12" rx="8" ry="6" fill="#5d4037" />
                <circle cx="8" cy="10" r="6" fill="#8d6e63" />
                <circle cx="6" cy="9" r="1.5" fill="black" />
                <path d="M2,10 L-2,10 L2,12 Z" fill="#ff9800" />
              </svg>
            </div>
            <div className="text-center text-xs font-bold mt-1" style={{ color: COLORS.warmWood }}>
              Cuckoo!
            </div>
          </div>
        </div>

        {/* Toggle base */}
        <button
          onClick={handleToggle}
          className="relative w-20 h-10 rounded-lg transition-all duration-300"
          style={{
            background: on ? COLORS.forestGreen : '#d4c4a8',
            border: `3px solid ${COLORS.warmWood}`,
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)',
          }}
        >
          {/* Wood grain */}
          <div className="absolute inset-0 opacity-20 rounded" style={{
            backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(0,0,0,0.1) 4px, rgba(0,0,0,0.1) 5px)',
          }} />

          {/* Toggle knob */}
          <div
            className="absolute top-1 w-7 h-7 rounded transition-all duration-300"
            style={{
              left: on ? 'calc(100% - 32px)' : '4px',
              background: `linear-gradient(180deg, #deb887 0%, #c9a227 100%)`,
              border: `2px solid ${COLORS.warmWood}`,
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            }}
          />
        </button>

        <style>{`
          @keyframes cuckoo {
            0%, 100% { transform: translateX(-50%) translateY(0); }
            50% { transform: translateX(-50%) translateY(-8px); }
          }
        `}</style>
      </div>
    </div>
  );
};

// --- SWISS FONDUE PROGRESS ---
export const SwissFondueProgress = () => {
  const [progress, setProgress] = useState(65);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + (Math.random() * 4 - 2);
        return Math.max(30, Math.min(90, next));
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: COLORS.cream }}>
      <div className="w-64">
        <div className="text-center mb-2 font-bold" style={{ color: COLORS.warmWood }}>
          Fondue Ready: {Math.round(progress)}%
        </div>

        {/* Fondue pot */}
        <div className="relative">
          {/* Pot body */}
          <div
            className="relative h-24 rounded-b-full overflow-hidden"
            style={{
              background: `linear-gradient(180deg, #2d2d2d 0%, #1a1a1a 100%)`,
              border: '4px solid #4a4a4a',
            }}
          >
            {/* Cheese fill */}
            <div
              className="absolute bottom-0 left-0 right-0 transition-all duration-500"
              style={{
                height: `${progress}%`,
                background: `linear-gradient(180deg, #ffd54f 0%, #ffb300 100%)`,
              }}
            >
              {/* Cheese bubbles */}
              <div className="absolute inset-0">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full animate-bounce"
                    style={{
                      width: 8 + Math.random() * 8,
                      height: 8 + Math.random() * 8,
                      left: `${15 + i * 18}%`,
                      top: `${20 + Math.random() * 30}%`,
                      background: 'rgba(255,255,255,0.4)',
                      animationDelay: `${i * 0.2}s`,
                      animationDuration: '1.5s',
                    }}
                  />
                ))}
              </div>

              {/* Melting cheese drips */}
              <svg className="absolute -top-4 left-0 right-0" viewBox="0 0 200 20" preserveAspectRatio="none">
                <path
                  d="M0,20 Q25,0 50,15 T100,10 T150,18 T200,12 L200,20 Z"
                  fill="#ffd54f"
                />
              </svg>
            </div>
          </div>

          {/* Pot handles */}
          <div className="absolute top-4 -left-3 w-4 h-8 rounded-l-full" style={{ background: '#4a4a4a' }} />
          <div className="absolute top-4 -right-3 w-4 h-8 rounded-r-full" style={{ background: '#4a4a4a' }} />

          {/* Stand */}
          <div className="flex justify-center">
            <div className="w-32 h-4 rounded-b-lg" style={{ background: COLORS.warmWood }} />
          </div>

          {/* Flame */}
          <div className="flex justify-center gap-1 mt-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse"
                style={{
                  width: 8,
                  height: 12,
                  background: `linear-gradient(180deg, #ff6b35 0%, #f7931e 50%, #ffcc02 100%)`,
                  borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- SWISS CLOCK LOADER ---
export const SwissClockLoader = () => {
  const [pendulumAngle, setPendulumAngle] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => (prev + 1) % 60);
    }, 1000);

    const pendulumInterval = setInterval(() => {
      setPendulumAngle(Math.sin(Date.now() / 500) * 30);
    }, 50);

    return () => {
      clearInterval(interval);
      clearInterval(pendulumInterval);
    };
  }, []);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: COLORS.cream }}>
      <div className="relative">
        {/* Clock house */}
        <div
          className="relative w-32 h-40"
          style={{
            background: `linear-gradient(180deg, ${COLORS.warmWood} 0%, #6b5010 100%)`,
            borderRadius: '8px 8px 0 0',
          }}
        >
          {/* Roof */}
          <div
            className="absolute -top-8 left-1/2 -translate-x-1/2 w-40"
            style={{
              height: '32px',
              background: `linear-gradient(180deg, #5d4037 0%, #3e2723 100%)`,
              clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
            }}
          />

          {/* Clock face */}
          <div
            className="absolute top-6 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full flex items-center justify-center"
            style={{
              background: COLORS.cream,
              border: `4px solid ${COLORS.warmWood}`,
              boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.2)',
            }}
          >
            {/* Hour markers */}
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-2"
                style={{
                  background: COLORS.warmWood,
                  top: '8px',
                  left: '50%',
                  transformOrigin: '50% 32px',
                  transform: `translateX(-50%) rotate(${i * 30}deg)`,
                }}
              />
            ))}

            {/* Clock hands */}
            <div
              className="absolute w-1 h-6 rounded-full"
              style={{
                background: '#333',
                bottom: '50%',
                left: '50%',
                transformOrigin: 'bottom center',
                transform: `translateX(-50%) rotate(${(seconds / 60) * 360}deg)`,
              }}
            />
            <div className="absolute w-2 h-2 rounded-full bg-red-600" />
          </div>

          {/* Decorative carving */}
          <div className="absolute bottom-4 left-4 right-4 h-8 rounded" style={{ background: '#5d4037' }}>
            <div className="flex justify-around items-center h-full px-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-2 h-4 rounded" style={{ background: COLORS.warmWood }} />
              ))}
            </div>
          </div>
        </div>

        {/* Pendulum housing */}
        <div
          className="w-24 h-32 mx-auto"
          style={{
            background: `linear-gradient(180deg, #6b5010 0%, ${COLORS.warmWood} 100%)`,
            borderRadius: '0 0 8px 8px',
          }}
        >
          {/* Glass window */}
          <div
            className="w-20 h-28 mx-auto mt-1 rounded-b overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.1)' }}
          >
            {/* Pendulum */}
            <div
              className="relative w-full h-full"
              style={{
                transformOrigin: 'top center',
                transform: `rotate(${pendulumAngle}deg)`,
                transition: 'transform 0.05s linear',
              }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-20 bg-amber-900" />
              <div
                className="absolute top-20 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full"
                style={{
                  background: `linear-gradient(135deg, #c9a227 0%, #8b6914 100%)`,
                  boxShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                }}
              />
            </div>
          </div>
        </div>

        <p className="text-center mt-2 text-sm font-medium" style={{ color: COLORS.warmWood }}>
          Loading...
        </p>
      </div>
    </div>
  );
};

// --- SWISS WINDOW AVATAR ---
export const SwissWindowAvatar = () => {
  const [waving, setWaving] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: COLORS.skyBlue }}>
      <div className="relative">
        {/* Window frame */}
        <div
          className="relative w-28 h-32 p-2"
          style={{
            background: COLORS.warmWood,
            borderRadius: '4px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
          }}
        >
          {/* Shutters */}
          <div className="absolute -left-6 top-2 bottom-2 w-6 rounded-l" style={{ background: COLORS.swissRed }}>
            <div className="h-full flex flex-col justify-around py-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="mx-1 h-2 rounded" style={{ background: '#cc0000' }} />
              ))}
            </div>
          </div>
          <div className="absolute -right-6 top-2 bottom-2 w-6 rounded-r" style={{ background: COLORS.swissRed }}>
            <div className="h-full flex flex-col justify-around py-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="mx-1 h-2 rounded" style={{ background: '#cc0000' }} />
              ))}
            </div>
          </div>

          {/* Window panes */}
          <div className="grid grid-cols-2 grid-rows-2 gap-1 h-full">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="rounded-sm"
                style={{ background: 'linear-gradient(135deg, #87ceeb 0%, #5fb3d4 100%)' }}
              />
            ))}
          </div>

          {/* Person silhouette */}
          <div
            className="absolute bottom-1 left-1/2 -translate-x-1/2 cursor-pointer"
            onClick={() => {
              setWaving(true);
              setTimeout(() => setWaving(false), 1000);
            }}
          >
            <div className="relative">
              {/* Head */}
              <div className="w-8 h-8 rounded-full mx-auto" style={{ background: '#ffcc99' }} />
              {/* Body */}
              <div className="w-12 h-6 rounded-t-lg -mt-1 mx-auto" style={{ background: COLORS.forestGreen }} />
              {/* Waving arm */}
              <div
                className="absolute -right-2 top-4 w-3 h-8 rounded-full origin-bottom transition-transform duration-200"
                style={{
                  background: '#ffcc99',
                  transform: waving ? 'rotate(-45deg)' : 'rotate(0deg)',
                  animation: waving ? 'wave 0.25s ease-in-out 4' : 'none',
                }}
              />
            </div>
          </div>
        </div>

        {/* Flower box */}
        <div
          className="w-32 h-6 mx-auto -mt-1 flex items-center justify-center gap-1 rounded-b"
          style={{ background: '#5d4037' }}
        >
          {[COLORS.swissRed, '#ff69b4', COLORS.swissRed, '#ff69b4', COLORS.swissRed].map((color, i) => (
            <div key={i} className="w-3 h-3 rounded-full" style={{ background: color }} />
          ))}
        </div>

        <style>{`
          @keyframes wave {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(-60deg); }
          }
        `}</style>
      </div>
    </div>
  );
};

// --- SWISS SHUTTER MODAL ---
export const SwissShutterModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: COLORS.cream }}>
      <button
        onClick={() => setOpen(true)}
        className="px-6 py-3 font-bold transition-all hover:scale-105"
        style={{
          background: COLORS.swissRed,
          color: 'white',
          border: `3px solid #cc0000`,
          borderRadius: '8px',
          boxShadow: '0 4px 0 #990000',
        }}
      >
        Open Window
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />

          <div className="relative">
            {/* Left shutter */}
            <div
              className="absolute top-0 bottom-0 w-40 origin-right transition-transform duration-700 z-10"
              style={{
                right: '50%',
                background: COLORS.swissRed,
                transform: 'perspective(800px) rotateY(-120deg)',
                boxShadow: '4px 0 8px rgba(0,0,0,0.3)',
              }}
            >
              <div className="h-full flex flex-col justify-around py-4 px-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-4 rounded mx-2" style={{ background: '#cc0000' }} />
                ))}
              </div>
            </div>

            {/* Right shutter */}
            <div
              className="absolute top-0 bottom-0 w-40 origin-left transition-transform duration-700 z-10"
              style={{
                left: '50%',
                background: COLORS.swissRed,
                transform: 'perspective(800px) rotateY(120deg)',
                boxShadow: '-4px 0 8px rgba(0,0,0,0.3)',
              }}
            >
              <div className="h-full flex flex-col justify-around py-4 px-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-4 rounded mx-2" style={{ background: '#cc0000' }} />
                ))}
              </div>
            </div>

            {/* Window content */}
            <div
              className="relative w-80 h-64 p-6"
              style={{
                background: COLORS.cream,
                border: `8px solid ${COLORS.warmWood}`,
                borderRadius: '4px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              }}
            >
              {/* Window grid */}
              <div className="absolute inset-6 grid grid-cols-2 grid-rows-2 gap-2 pointer-events-none opacity-20">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="border-2 rounded" style={{ borderColor: COLORS.warmWood }} />
                ))}
              </div>

              <div className="relative z-10 text-center h-full flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-4" style={{ color: COLORS.warmWood }}>
                  Willkommen!
                </h3>
                <p className="text-gray-600 mb-6">
                  Welcome to our Swiss chalet. Enjoy your stay in the Alps!
                </p>
                <button
                  onClick={() => setOpen(false)}
                  className="mx-auto px-6 py-2 rounded font-medium transition-colors"
                  style={{
                    background: COLORS.forestGreen,
                    color: 'white',
                  }}
                >
                  Close Shutters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- SWISS TRAIL NAV ---
export const SwissTrailNav = () => {
  const [active, setActive] = useState(0);
  const items = [
    { name: 'Base', elevation: '1200m' },
    { name: 'Hut', elevation: '1800m' },
    { name: 'Summit', elevation: '2400m' },
    { name: 'Peak', elevation: '3000m' },
  ];

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: COLORS.forestGreen }}>
      <nav className="relative">
        {/* Trail line */}
        <div className="absolute top-1/2 left-8 right-8 h-1" style={{ background: '#5d4037' }} />

        <div className="flex gap-6">
          {items.map((item, i) => (
            <button
              key={item.name}
              onClick={() => setActive(i)}
              className="relative flex flex-col items-center transition-all duration-300"
              style={{
                transform: active === i ? 'translateY(-4px)' : 'translateY(0)',
              }}
            >
              {/* Trail marker post */}
              <div
                className="w-4 h-8 mb-1"
                style={{
                  background: i <= active ? COLORS.warmWood : '#8b7355',
                }}
              />

              {/* Trail marker sign */}
              <div
                className="relative px-4 py-2 rounded transition-all duration-300"
                style={{
                  background: i <= active ? COLORS.warmWood : '#a08060',
                  boxShadow: active === i ? '0 4px 8px rgba(0,0,0,0.3)' : '0 2px 4px rgba(0,0,0,0.2)',
                }}
              >
                {/* Direction arrow */}
                <div
                  className="absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0"
                  style={{
                    borderTop: '8px solid transparent',
                    borderBottom: '8px solid transparent',
                    borderLeft: `8px solid ${i <= active ? COLORS.warmWood : '#a08060'}`,
                  }}
                />

                <span className="text-white text-sm font-bold block">{item.name}</span>
                <span className="text-white/70 text-xs">{item.elevation}</span>
              </div>

              {/* Active indicator */}
              {active === i && (
                <div className="absolute -bottom-6 text-yellow-300 text-lg animate-bounce">
                  ^
                </div>
              )}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

// --- SWISS CARVED DIVIDER ---
export const SwissCarvedDivider = () => {
  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: COLORS.cream }}>
      <div className="w-full max-w-md">
        <div className="flex items-center gap-4">
          {/* Left carved section */}
          <div className="flex-1 h-4 relative" style={{ background: COLORS.warmWood, borderRadius: '2px' }}>
            {/* Carved pattern */}
            <div className="absolute inset-0 flex items-center justify-around px-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex gap-0.5">
                  <div className="w-1 h-3 rounded-full" style={{ background: '#6b5010' }} />
                  <div className="w-1 h-2 rounded-full mt-0.5" style={{ background: '#c9a227' }} />
                </div>
              ))}
            </div>
          </div>

          {/* Center edelweiss */}
          <div className="relative">
            <svg width="40" height="40" viewBox="0 0 40 40">
              {/* Petals */}
              {[...Array(8)].map((_, i) => (
                <ellipse
                  key={i}
                  cx="20"
                  cy="8"
                  rx="4"
                  ry="8"
                  fill="#f5f5dc"
                  stroke="#d4c896"
                  strokeWidth="0.5"
                  transform={`rotate(${i * 45} 20 20)`}
                />
              ))}
              {/* Center */}
              <circle cx="20" cy="20" r="5" fill="#f0e68c" />
              <circle cx="20" cy="20" r="2.5" fill="#daa520" />
            </svg>
          </div>

          {/* Right carved section */}
          <div className="flex-1 h-4 relative" style={{ background: COLORS.warmWood, borderRadius: '2px' }}>
            {/* Carved pattern */}
            <div className="absolute inset-0 flex items-center justify-around px-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex gap-0.5">
                  <div className="w-1 h-2 rounded-full mt-0.5" style={{ background: '#c9a227' }} />
                  <div className="w-1 h-3 rounded-full" style={{ background: '#6b5010' }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- SWISS YODEL ALERT ---
export const SwissYodelAlert = () => {
  const [visible, setVisible] = useState(true);
  const [echoes, setEchoes] = useState<number[]>([]);

  useEffect(() => {
    if (visible) {
      setEchoes([]);
      const delays = [500, 1000, 1500];
      delays.forEach((delay, i) => {
        setTimeout(() => {
          setEchoes(prev => [...prev, i]);
        }, delay);
      });
    }
  }, [visible]);

  if (!visible) {
    return (
      <div className="h-full flex items-center justify-center p-6" style={{ background: COLORS.skyBlue }}>
        <button
          onClick={() => setVisible(true)}
          className="text-white hover:underline"
        >
          Show Alert
        </button>
      </div>
    );
  }

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: COLORS.skyBlue }}>
      <div className="relative">
        {/* Main alert */}
        <div
          className="relative w-72 p-4 rounded-lg"
          style={{
            background: COLORS.cream,
            border: `3px solid ${COLORS.warmWood}`,
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          }}
        >
          {/* Mountain silhouette header */}
          <div className="absolute -top-6 left-4 right-4">
            <svg viewBox="0 0 200 30" className="w-full">
              <path
                d="M0,30 L30,10 L50,20 L80,5 L100,15 L130,8 L160,18 L180,12 L200,30 Z"
                fill={COLORS.warmWood}
              />
            </svg>
          </div>

          <div className="pt-2">
            <div className="flex items-start gap-3">
              {/* Alphorn icon */}
              <div className="text-2xl">
                <svg width="32" height="32" viewBox="0 0 32 32">
                  <path
                    d="M4,16 L20,12 L20,20 L4,16 Z"
                    fill={COLORS.warmWood}
                  />
                  <path
                    d="M20,10 Q28,8 30,16 Q28,24 20,22 Z"
                    fill="#c9a227"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="font-bold" style={{ color: COLORS.warmWood }}>
                  Yodel-ay-ee-oo!
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  Important message from the mountains
                </p>
              </div>
              <button
                onClick={() => setVisible(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                x
              </button>
            </div>
          </div>
        </div>

        {/* Echo effects */}
        {echoes.map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              right: -40 - i * 30,
              opacity: 0.6 - i * 0.2,
              transform: `translateY(-50%) scale(${0.8 - i * 0.15})`,
            }}
          >
            <div
              className="px-3 py-1 rounded text-sm font-bold"
              style={{
                background: COLORS.warmWood,
                color: 'white',
              }}
            >
              echo{i > 0 ? '...' : ''}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- SWISS HORN ICON ---
export const SwissHornIcon = () => {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: COLORS.forestGreen }}>
      <div
        className="relative cursor-pointer"
        onClick={() => {
          setPlaying(true);
          setTimeout(() => setPlaying(false), 2000);
        }}
      >
        {/* Alphorn */}
        <svg width="120" height="80" viewBox="0 0 120 80" className={playing ? 'animate-pulse' : ''}>
          {/* Main horn body */}
          <path
            d="M10,40 L70,35 L70,45 L10,40 Z"
            fill={COLORS.warmWood}
            stroke="#6b5010"
            strokeWidth="2"
          />
          {/* Bell */}
          <ellipse cx="85" cy="40" rx="20" ry="25" fill="#c9a227" stroke={COLORS.warmWood} strokeWidth="2" />
          <ellipse cx="85" cy="40" rx="12" ry="16" fill="#8b6914" />

          {/* Decorative rings */}
          <circle cx="25" cy="40" r="3" fill="#c9a227" />
          <circle cx="45" cy="40" r="3" fill="#c9a227" />
        </svg>

        {/* Sound waves */}
        {playing && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full border-2 animate-ping"
                style={{
                  width: 20 + i * 20,
                  height: 20 + i * 20,
                  right: -10 - i * 10,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  borderColor: COLORS.cream,
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '1s',
                }}
              />
            ))}
          </div>
        )}

        <p className="text-center mt-4 text-white text-sm font-medium">
          {playing ? 'Playing...' : 'Click to play'}
        </p>
      </div>
    </div>
  );
};

// --- SWISS WOODEN HEADING ---
export const SwissWoodenHeading = () => {
  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: COLORS.cream }}>
      <div className="relative">
        {/* Wooden plank background */}
        <div
          className="relative px-10 py-4 rounded"
          style={{
            background: `linear-gradient(180deg, #deb887 0%, #c9a227 50%, #8b6914 100%)`,
            boxShadow: '0 4px 0 #5d4037, 0 6px 12px rgba(0,0,0,0.3)',
          }}
        >
          {/* Wood grain texture */}
          <div className="absolute inset-0 opacity-20 rounded" style={{
            backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(0,0,0,0.1) 8px, rgba(0,0,0,0.1) 9px)',
          }} />

          {/* Carved text effect */}
          <h1
            className="relative text-3xl font-bold tracking-wider"
            style={{
              color: '#4a3a0a',
              textShadow: '1px 1px 0 #c9a227, -1px -1px 0 rgba(0,0,0,0.2)',
              fontFamily: 'serif',
            }}
          >
            SCHWEIZ
          </h1>

          {/* Corner decorations */}
          {['top-1 left-1', 'top-1 right-1', 'bottom-1 left-1', 'bottom-1 right-1'].map((pos, i) => (
            <div
              key={i}
              className={`absolute ${pos} w-4 h-4`}
              style={{
                background: '#5d4037',
                borderRadius: '2px',
                boxShadow: 'inset 1px 1px 2px rgba(255,255,255,0.2)',
              }}
            >
              <div className="w-2 h-2 m-1 rounded-full" style={{ background: '#c9a227' }} />
            </div>
          ))}

          {/* Nail holes */}
          <div className="absolute top-1/2 left-2 -translate-y-1/2 w-2 h-2 rounded-full bg-gray-700" />
          <div className="absolute top-1/2 right-2 -translate-y-1/2 w-2 h-2 rounded-full bg-gray-700" />
        </div>
      </div>
    </div>
  );
};

// --- SWISS ALTITUDE SLIDER ---
export const SwissAltitudeSlider = () => {
  const [altitude, setAltitude] = useState(1500);
  const minAlt = 500;
  const maxAlt = 4000;
  const percentage = ((altitude - minAlt) / (maxAlt - minAlt)) * 100;

  const getZone = (alt: number) => {
    if (alt < 1000) return { name: 'Valley', color: COLORS.forestGreen };
    if (alt < 2000) return { name: 'Alpine Meadow', color: '#90EE90' };
    if (alt < 3000) return { name: 'Rocky Terrain', color: '#808080' };
    return { name: 'Snow Peak', color: 'white' };
  };

  const zone = getZone(altitude);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: COLORS.skyBlue }}>
      <div className="w-full max-w-xs">
        <div className="text-center mb-4">
          <div className="text-4xl font-bold" style={{ color: COLORS.warmWood }}>
            {altitude}m
          </div>
          <div
            className="text-sm font-medium px-3 py-1 rounded inline-block mt-1"
            style={{ background: zone.color, color: zone.color === 'white' ? '#333' : 'white' }}
          >
            {zone.name}
          </div>
        </div>

        {/* Altitude meter */}
        <div className="relative h-48 flex justify-center">
          {/* Mountain silhouette background */}
          <div className="absolute inset-0 flex items-end justify-center overflow-hidden">
            <svg viewBox="0 0 100 100" className="w-full h-full opacity-20">
              <path
                d="M0,100 L20,60 L35,80 L50,30 L65,70 L80,50 L100,100 Z"
                fill={COLORS.warmWood}
              />
            </svg>
          </div>

          {/* Vertical slider track */}
          <div
            className="relative w-8 h-full rounded-full overflow-hidden"
            style={{
              background: `linear-gradient(180deg, white 0%, #808080 30%, #90EE90 60%, ${COLORS.forestGreen} 100%)`,
              border: `3px solid ${COLORS.warmWood}`,
            }}
          >
            {/* Fill indicator */}
            <div
              className="absolute bottom-0 left-0 right-0 transition-all duration-200"
              style={{
                height: `${percentage}%`,
                background: 'rgba(139, 105, 20, 0.3)',
              }}
            />

            {/* Altitude markers */}
            {[1000, 2000, 3000].map((mark) => (
              <div
                key={mark}
                className="absolute left-full ml-2 text-xs font-mono"
                style={{
                  bottom: `${((mark - minAlt) / (maxAlt - minAlt)) * 100}%`,
                  color: COLORS.warmWood,
                  transform: 'translateY(50%)',
                }}
              >
                {mark}m
              </div>
            ))}
          </div>

          {/* Slider thumb */}
          <input
            type="range"
            min={minAlt}
            max={maxAlt}
            value={altitude}
            onChange={(e) => setAltitude(Number(e.target.value))}
            className="absolute h-full w-8 opacity-0 cursor-pointer"
            style={{
              writingMode: 'vertical-lr',
              direction: 'rtl',
            }}
          />

          {/* Visual thumb */}
          <div
            className="absolute left-1/2 -translate-x-1/2 w-12 h-6 rounded transition-all duration-200 flex items-center justify-center"
            style={{
              bottom: `calc(${percentage}% - 12px)`,
              background: COLORS.warmWood,
              boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            <div className="w-4 h-1 rounded bg-white/50" />
          </div>
        </div>
      </div>
    </div>
  );
};

// --- SWISS MOUNTAIN TABS ---
export const SwissMountainTabs = () => {
  const [active, setActive] = useState(0);
  const tabs = ['Matterhorn', 'Eiger', 'Jungfrau', 'Mont Blanc'];

  return (
    <div className="h-full flex flex-col items-center justify-center p-6" style={{ background: COLORS.skyBlue }}>
      <div className="w-full max-w-md">
        {/* Tabs */}
        <div className="relative flex">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActive(i)}
              className="relative flex-1 pt-8 pb-3 px-2 transition-all duration-300"
              style={{
                zIndex: active === i ? 10 : 1,
              }}
            >
              {/* Mountain peak shape */}
              <div
                className="absolute inset-0 transition-all duration-300"
                style={{
                  background: active === i ? COLORS.cream : '#d4c4a8',
                  clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
                  boxShadow: active === i ? '0 -4px 8px rgba(0,0,0,0.1)' : 'none',
                }}
              />

              {/* Snow cap for active */}
              {active === i && (
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2"
                  style={{
                    width: '40%',
                    height: '30%',
                    background: 'white',
                    clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
                  }}
                />
              )}

              <span
                className="relative text-xs font-bold"
                style={{ color: active === i ? COLORS.warmWood : '#8b7355' }}
              >
                {tab}
              </span>
            </button>
          ))}
        </div>

        {/* Content area */}
        <div
          className="p-6 rounded-b-lg"
          style={{
            background: COLORS.cream,
            borderTop: `3px solid ${COLORS.warmWood}`,
          }}
        >
          <div className="text-center">
            <h3 className="font-bold text-xl mb-2" style={{ color: COLORS.warmWood }}>
              {tabs[active]}
            </h3>
            <p className="text-gray-600 text-sm">
              {active === 0 && 'The iconic pyramid-shaped peak, 4,478m'}
              {active === 1 && 'The notorious north face, 3,967m'}
              {active === 2 && 'The "Top of Europe", 4,158m'}
              {active === 3 && 'The highest in the Alps, 4,808m'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- SWISS WOOD BACKGROUND ---
export const SwissWoodBackground = () => {
  return (
    <div className="h-full relative overflow-hidden">
      {/* Wood panel base */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(90deg,
            #c9a227 0%, #deb887 10%, #c9a227 20%,
            #deb887 30%, #c9a227 40%, #deb887 50%,
            #c9a227 60%, #deb887 70%, #c9a227 80%,
            #deb887 90%, #c9a227 100%
          )`,
        }}
      />

      {/* Wood grain lines */}
      <div className="absolute inset-0" style={{
        backgroundImage: `
          repeating-linear-gradient(
            90deg,
            transparent,
            transparent 48px,
            rgba(139, 105, 20, 0.3) 48px,
            rgba(139, 105, 20, 0.3) 50px
          )
        `,
      }} />

      {/* Horizontal grain pattern */}
      <div className="absolute inset-0" style={{
        backgroundImage: `
          repeating-linear-gradient(
            0deg,
            transparent,
            transparent 3px,
            rgba(0, 0, 0, 0.03) 3px,
            rgba(0, 0, 0, 0.03) 4px
          )
        `,
      }} />

      {/* Knots */}
      {[
        { top: '20%', left: '15%' },
        { top: '60%', left: '45%' },
        { top: '40%', left: '75%' },
        { top: '80%', left: '25%' },
      ].map((pos, i) => (
        <div
          key={i}
          className="absolute w-6 h-4 rounded-full"
          style={{
            ...pos,
            background: `radial-gradient(ellipse, #6b5010 0%, #8b6914 50%, transparent 70%)`,
          }}
        />
      ))}

      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="px-8 py-4 rounded"
          style={{
            background: 'rgba(245, 240, 230, 0.9)',
            border: `3px solid ${COLORS.warmWood}`,
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          }}
        >
          <p className="text-center font-bold" style={{ color: COLORS.warmWood }}>
            Authentic Wood Texture
          </p>
          <p className="text-center text-sm text-gray-600">
            Swiss craftsmanship
          </p>
        </div>
      </div>
    </div>
  );
};

// Export all components
export const swissChaletComponents: Record<string, React.FC> = {
  'swiss-cowbell-button': SwissCowbellButton,
  'swiss-chalet-card': SwissChaletCard,
  'swiss-carved-input': SwissCarvedInput,
  'swiss-edelweiss-badge': SwissEdelweissBadge,
  'swiss-cuckoo-toggle': SwissCuckooToggle,
  'swiss-fondue-progress': SwissFondueProgress,
  'swiss-clock-loader': SwissClockLoader,
  'swiss-window-avatar': SwissWindowAvatar,
  'swiss-shutter-modal': SwissShutterModal,
  'swiss-trail-nav': SwissTrailNav,
  'swiss-carved-divider': SwissCarvedDivider,
  'swiss-yodel-alert': SwissYodelAlert,
  'swiss-horn-icon': SwissHornIcon,
  'swiss-wooden-heading': SwissWoodenHeading,
  'swiss-altitude-slider': SwissAltitudeSlider,
  'swiss-mountain-tabs': SwissMountainTabs,
  'swiss-wood-background': SwissWoodBackground,
};
