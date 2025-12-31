import React, { useState, useEffect } from 'react';

// Colors: sunset orange (#ff6b35), ocean blue (#0077b6), sand (#f4d58d), palm green (#2d6a4f), coral pink (#ff8fab)

// --- TROPICAL COCONUT BUTTON ---
export const TropicalCoconutButton = () => {
  const [pressed, setPressed] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: 'linear-gradient(180deg, #ff6b35 0%, #ff8fab 100%)' }}>
      <button
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        onMouseLeave={() => setPressed(false)}
        className="relative px-8 py-4 transition-all duration-200"
        style={{
          background: pressed
            ? 'linear-gradient(180deg, #5c4033 0%, #3d2817 100%)'
            : 'linear-gradient(180deg, #8B5A2B 0%, #5c4033 100%)',
          borderRadius: '50%',
          width: '100px',
          height: '80px',
          boxShadow: pressed
            ? 'inset 0 4px 8px rgba(0,0,0,0.4)'
            : '0 6px 0 #3d2817, 0 8px 16px rgba(0,0,0,0.3)',
          transform: pressed ? 'translateY(3px)' : 'translateY(0)',
          border: '3px solid #3d2817',
        }}
      >
        {/* Coconut fiber texture */}
        <div className="absolute inset-2 opacity-30">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-amber-900"
              style={{
                width: '2px',
                height: '12px',
                left: `${15 + i * 10}%`,
                top: `${20 + (i % 3) * 15}%`,
                transform: `rotate(${-30 + i * 10}deg)`,
              }}
            />
          ))}
        </div>
        {/* Three coconut eyes */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 flex gap-1">
          <div className="w-2 h-2 rounded-full bg-amber-950" />
          <div className="w-2 h-2 rounded-full bg-amber-950" />
        </div>
        <div className="absolute top-6 left-1/2 -translate-x-1/2">
          <div className="w-2 h-2 rounded-full bg-amber-950" />
        </div>
        <span className="relative text-amber-100 font-bold text-sm mt-4 block">Click</span>
      </button>
    </div>
  );
};

// --- TROPICAL POSTCARD CARD ---
export const TropicalPostcardCard = () => {
  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: 'linear-gradient(180deg, #0077b6 0%, #00b4d8 100%)' }}>
      <div
        className="relative w-64 h-40 p-4 overflow-hidden"
        style={{
          background: '#f4d58d',
          borderRadius: '4px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          border: '8px solid #fff',
        }}
      >
        {/* Postcard divider line */}
        <div className="absolute top-0 bottom-0 left-1/2 border-l-2 border-dashed border-gray-300" />

        {/* Left side - image area */}
        <div className="absolute left-2 top-2 bottom-2 w-[45%] overflow-hidden rounded">
          <div
            className="w-full h-full"
            style={{
              background: 'linear-gradient(180deg, #ff6b35 0%, #ff8fab 30%, #0077b6 70%, #00b4d8 100%)',
            }}
          >
            {/* Palm tree silhouette */}
            <svg className="absolute bottom-0 left-2" width="40" height="60" viewBox="0 0 40 60">
              <path d="M20,60 L20,25" stroke="#2d6a4f" strokeWidth="3" fill="none" />
              <ellipse cx="20" cy="20" rx="18" ry="8" fill="#2d6a4f" transform="rotate(-30, 20, 20)" />
              <ellipse cx="20" cy="20" rx="18" ry="8" fill="#2d6a4f" transform="rotate(30, 20, 20)" />
              <ellipse cx="20" cy="18" rx="16" ry="6" fill="#3d8b5f" transform="rotate(-10, 20, 18)" />
            </svg>
          </div>
        </div>

        {/* Right side - message area */}
        <div className="absolute right-2 top-2 w-[45%]">
          <div className="text-gray-600 text-xs font-serif italic">Greetings from</div>
          <div className="text-amber-800 font-bold text-sm mt-1">Paradise Island</div>
          <div className="mt-2 space-y-1">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-1 bg-gray-300 rounded" style={{ width: `${80 - i * 15}%` }} />
            ))}
          </div>
        </div>

        {/* Stamp */}
        <div
          className="absolute top-2 right-2 w-10 h-12 flex items-center justify-center"
          style={{
            background: '#ff6b35',
            border: '2px solid #fff',
            borderRadius: '2px',
          }}
        >
          <div className="text-white text-[8px] text-center font-bold">
            <div>ALOHA</div>
            <div className="text-[6px] mt-1">0.50</div>
          </div>
        </div>

        {/* Postmark */}
        <div className="absolute bottom-2 right-4 opacity-40">
          <div className="w-8 h-8 border-2 border-gray-500 rounded-full flex items-center justify-center">
            <span className="text-[6px] text-gray-500 font-bold">2024</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- TROPICAL BAMBOO INPUT ---
export const TropicalBambooInput = () => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: 'linear-gradient(180deg, #2d6a4f 0%, #1b4332 100%)' }}>
      <div className="relative w-64">
        {/* Bamboo frame */}
        <div
          className="absolute -inset-2 rounded-lg"
          style={{
            background: 'linear-gradient(90deg, #c4a574 0%, #ddc9a3 20%, #c4a574 40%, #ddc9a3 60%, #c4a574 80%, #ddc9a3 100%)',
            boxShadow: focused ? '0 0 20px rgba(244, 213, 141, 0.5)' : 'none',
          }}
        >
          {/* Bamboo segments */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute top-0 bottom-0 w-0.5 bg-amber-700"
              style={{ left: `${i * 20}%` }}
            />
          ))}
          {/* Horizontal ties */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1 bg-amber-800/30" />
        </div>

        <input
          type="text"
          placeholder="Enter island name..."
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="relative w-full px-4 py-3 rounded outline-none transition-all duration-300"
          style={{
            background: '#f4d58d',
            border: '2px solid #c4a574',
            color: '#5c4033',
          }}
        />

        {/* Decorative leaves */}
        {focused && (
          <>
            <div className="absolute -top-4 -left-2 text-2xl animate-bounce" style={{ animationDuration: '2s' }}>
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path d="M12,2 Q20,8 12,22 Q4,8 12,2" fill="#2d6a4f" />
              </svg>
            </div>
            <div className="absolute -top-3 -right-2 text-2xl animate-bounce" style={{ animationDuration: '2.5s' }}>
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path d="M12,2 Q20,8 12,22 Q4,8 12,2" fill="#3d8b5f" />
              </svg>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// --- TROPICAL HIBISCUS BADGE ---
export const TropicalHibiscusBadge = () => {
  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: 'linear-gradient(135deg, #2d6a4f 0%, #1b4332 100%)' }}>
      <div className="relative">
        {/* Hibiscus flower */}
        <svg width="80" height="80" viewBox="0 0 80 80" className="absolute -top-6 -left-6">
          {/* Petals */}
          {[0, 72, 144, 216, 288].map((angle, i) => (
            <ellipse
              key={i}
              cx="40"
              cy="40"
              rx="18"
              ry="30"
              fill="#ff8fab"
              transform={`rotate(${angle}, 40, 40)`}
              style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}
            />
          ))}
          {/* Center */}
          <circle cx="40" cy="40" r="10" fill="#ff6b35" />
          {/* Stamen */}
          <line x1="40" y1="40" x2="40" y2="20" stroke="#f4d58d" strokeWidth="2" />
          <circle cx="40" cy="18" r="3" fill="#f4d58d" />
        </svg>

        <div
          className="relative px-6 py-2 rounded-full"
          style={{
            background: 'linear-gradient(135deg, #ff8fab 0%, #ff6b35 100%)',
            boxShadow: '0 4px 12px rgba(255, 107, 53, 0.4)',
          }}
        >
          <span className="text-white font-bold text-sm tracking-wide">TROPICAL</span>
        </div>
      </div>
    </div>
  );
};

// --- TROPICAL SUNSET TOGGLE ---
export const TropicalSunsetToggle = () => {
  const [isDay, setIsDay] = useState(true);

  return (
    <div
      className="h-full flex items-center justify-center p-6 transition-all duration-700"
      style={{
        background: isDay
          ? 'linear-gradient(180deg, #00b4d8 0%, #0077b6 100%)'
          : 'linear-gradient(180deg, #ff6b35 0%, #ff8fab 50%, #4a1942 100%)',
      }}
    >
      <button
        onClick={() => setIsDay(!isDay)}
        className="relative w-20 h-10 rounded-full transition-all duration-500"
        style={{
          background: isDay
            ? 'linear-gradient(180deg, #87CEEB 0%, #0077b6 100%)'
            : 'linear-gradient(180deg, #ff6b35 0%, #ff8fab 100%)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        }}
      >
        {/* Sun/Moon toggle knob */}
        <div
          className="absolute top-1 w-8 h-8 rounded-full transition-all duration-500 flex items-center justify-center"
          style={{
            left: isDay ? '4px' : 'calc(100% - 36px)',
            background: isDay
              ? 'linear-gradient(135deg, #f4d58d 0%, #ff6b35 100%)'
              : 'linear-gradient(135deg, #f4d58d 0%, #fff 100%)',
            boxShadow: isDay
              ? '0 0 20px #ff6b35'
              : '0 0 10px #f4d58d',
          }}
        >
          {/* Sun rays or moon craters */}
          {isDay ? (
            <div className="absolute inset-0">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-2 bg-amber-300"
                  style={{
                    left: '50%',
                    top: '-6px',
                    transform: `rotate(${i * 45}deg) translateX(-50%)`,
                    transformOrigin: '50% 20px',
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="absolute inset-0">
              <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-gray-300/50" />
              <div className="absolute top-4 right-2 w-1 h-1 rounded-full bg-gray-300/50" />
            </div>
          )}
        </div>

        {/* Water reflection line */}
        <div
          className="absolute bottom-1 left-2 right-2 h-0.5 rounded"
          style={{ background: 'rgba(255,255,255,0.3)' }}
        />
      </button>
    </div>
  );
};

// --- TROPICAL WAVE PROGRESS ---
export const TropicalWaveProgress = () => {
  const [progress] = useState(65);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: 'linear-gradient(180deg, #ff6b35 0%, #ff8fab 100%)' }}>
      <div className="w-56">
        <div
          className="relative h-8 rounded-full overflow-hidden"
          style={{
            background: '#f4d58d',
            boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.2)',
          }}
        >
          {/* Ocean fill with wave animation */}
          <div
            className="absolute bottom-0 left-0 h-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          >
            {/* Wave layer 1 */}
            <svg
              className="absolute top-0 left-0 w-[200%] h-full animate-pulse"
              style={{ animationDuration: '3s' }}
              viewBox="0 0 200 32"
              preserveAspectRatio="none"
            >
              <path
                d="M0,16 Q25,8 50,16 T100,16 T150,16 T200,16 L200,32 L0,32 Z"
                fill="#0077b6"
              />
            </svg>
            {/* Wave layer 2 */}
            <svg
              className="absolute top-1 left-0 w-[200%] h-full animate-pulse"
              style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}
              viewBox="0 0 200 32"
              preserveAspectRatio="none"
            >
              <path
                d="M0,18 Q25,10 50,18 T100,18 T150,18 T200,18 L200,32 L0,32 Z"
                fill="#00b4d8"
                opacity="0.7"
              />
            </svg>
            {/* Foam */}
            <div className="absolute top-0 right-0 w-4 h-full">
              <div className="w-2 h-2 bg-white rounded-full absolute top-1 right-1 opacity-80" />
              <div className="w-1.5 h-1.5 bg-white rounded-full absolute top-3 right-2 opacity-60" />
              <div className="w-1 h-1 bg-white rounded-full absolute top-2 right-0 opacity-70" />
            </div>
          </div>
        </div>
        <p className="text-center text-white text-sm mt-2 font-medium">{progress}% to Paradise</p>
      </div>
    </div>
  );
};

// --- TROPICAL PALM LOADER ---
export const TropicalPalmLoader = () => {
  const [sway, setSway] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSway(prev => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const swayAngle = Math.sin(sway * (Math.PI / 180)) * 10;

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: 'linear-gradient(180deg, #00b4d8 0%, #0077b6 100%)' }}>
      <div className="relative w-20 h-24">
        {/* Palm trunk */}
        <svg
          width="80"
          height="96"
          viewBox="0 0 80 96"
          style={{ transform: `rotate(${swayAngle * 0.3}deg)`, transformOrigin: 'bottom center' }}
        >
          {/* Trunk */}
          <path
            d="M38,96 Q36,70 40,50 Q44,70 42,96"
            fill="#8B5A2B"
            stroke="#5c4033"
            strokeWidth="1"
          />
          {/* Trunk segments */}
          {[50, 58, 66, 74, 82, 90].map((y, i) => (
            <ellipse key={i} cx="40" cy={y} rx="3" ry="1" fill="#5c4033" opacity="0.5" />
          ))}

          {/* Palm fronds with sway */}
          <g style={{ transform: `rotate(${swayAngle}deg)`, transformOrigin: '40px 50px' }}>
            {/* Center frond */}
            <path d="M40,50 Q40,20 50,5" stroke="#2d6a4f" strokeWidth="2" fill="none" />
            <path d="M40,50 Q45,25 55,10 L40,30 Z" fill="#2d6a4f" />

            {/* Left fronds */}
            <path d="M40,50 Q25,30 10,25" stroke="#2d6a4f" strokeWidth="2" fill="none" />
            <path d="M40,50 Q20,35 5,35 L30,45 Z" fill="#3d8b5f" />
            <path d="M40,50 Q15,45 0,55 L25,50 Z" fill="#2d6a4f" />

            {/* Right fronds */}
            <path d="M40,50 Q55,30 70,25" stroke="#2d6a4f" strokeWidth="2" fill="none" />
            <path d="M40,50 Q60,35 75,35 L50,45 Z" fill="#3d8b5f" />
            <path d="M40,50 Q65,45 80,55 L55,50 Z" fill="#2d6a4f" />
          </g>

          {/* Coconuts */}
          <circle cx="36" cy="52" r="4" fill="#5c4033" />
          <circle cx="44" cy="53" r="4" fill="#5c4033" />
          <circle cx="40" cy="56" r="3" fill="#8B5A2B" />
        </svg>

        {/* Loading dots */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-white animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// --- TROPICAL LEI AVATAR ---
export const TropicalLeiAvatar = () => {
  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: 'linear-gradient(180deg, #0077b6 0%, #00b4d8 100%)' }}>
      <div className="relative">
        {/* Avatar circle */}
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-2xl"
          style={{
            background: 'linear-gradient(135deg, #f4d58d 0%, #ffb347 100%)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          }}
        >
          <span role="img" aria-label="surfer">&#127940;</span>
        </div>

        {/* Lei frame */}
        <div className="absolute -inset-2">
          <svg width="80" height="80" viewBox="0 0 80 80">
            {/* Lei flowers around the circle */}
            {[...Array(12)].map((_, i) => {
              const angle = (i * 30) * (Math.PI / 180);
              const x = 40 + 35 * Math.cos(angle);
              const y = 40 + 35 * Math.sin(angle);
              const colors = ['#ff8fab', '#ff6b35', '#f4d58d', '#fff'];
              return (
                <g key={i}>
                  <circle
                    cx={x}
                    cy={y}
                    r="6"
                    fill={colors[i % colors.length]}
                    style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }}
                  />
                  <circle cx={x} cy={y} r="2" fill="#f4d58d" />
                </g>
              );
            })}
            {/* Lei string */}
            <circle
              cx="40"
              cy="40"
              r="35"
              fill="none"
              stroke="#2d6a4f"
              strokeWidth="2"
              strokeDasharray="4 8"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

// --- TROPICAL TIKI MODAL ---
export const TropicalTikiModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: 'linear-gradient(180deg, #2d6a4f 0%, #1b4332 100%)' }}>
      <button
        onClick={() => setOpen(true)}
        className="px-6 py-3 rounded-lg font-bold transition-all duration-200 hover:scale-105"
        style={{
          background: 'linear-gradient(180deg, #8B5A2B 0%, #5c4033 100%)',
          color: '#f4d58d',
          boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
          border: '2px solid #5c4033',
        }}
      >
        Enter Tiki Bar
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />

          {/* Tiki bar modal */}
          <div
            className="relative w-80 p-6 rounded-lg"
            style={{
              background: 'linear-gradient(180deg, #8B5A2B 0%, #5c4033 100%)',
              border: '4px solid #3d2817',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            }}
          >
            {/* Bamboo top edge */}
            <div className="absolute -top-3 left-4 right-4 h-6 flex">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-full"
                  style={{
                    background: 'linear-gradient(180deg, #c4a574 0%, #a08050 100%)',
                    marginRight: i < 7 ? '2px' : '0',
                  }}
                />
              ))}
            </div>

            {/* Tiki face decoration */}
            <div className="absolute -left-6 top-1/2 -translate-y-1/2">
              <svg width="40" height="60" viewBox="0 0 40 60">
                <rect x="5" y="0" width="30" height="60" fill="#5c4033" rx="4" />
                {/* Eyes */}
                <ellipse cx="15" cy="20" rx="6" ry="8" fill="#f4d58d" />
                <ellipse cx="25" cy="20" rx="6" ry="8" fill="#f4d58d" />
                <circle cx="15" cy="22" r="3" fill="#3d2817" />
                <circle cx="25" cy="22" r="3" fill="#3d2817" />
                {/* Nose */}
                <rect x="17" y="28" width="6" height="8" fill="#3d2817" rx="1" />
                {/* Mouth */}
                <path d="M12,42 Q20,50 28,42" stroke="#3d2817" strokeWidth="3" fill="none" />
                {/* Teeth */}
                <rect x="14" y="44" width="4" height="4" fill="#f4d58d" />
                <rect x="22" y="44" width="4" height="4" fill="#f4d58d" />
              </svg>
            </div>

            <div className="text-center mt-4">
              <h3 className="text-xl font-bold" style={{ color: '#f4d58d' }}>Welcome to Paradise!</h3>
              <p className="text-amber-200/80 text-sm mt-2">
                Grab a coconut drink and relax
              </p>

              {/* Decorative torches */}
              <div className="flex justify-center gap-8 mt-4">
                <div className="relative">
                  <div className="w-2 h-8 bg-amber-800 rounded" />
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-4 h-6 animate-pulse" style={{ background: 'linear-gradient(180deg, #ff6b35 0%, #ff8fab 100%)', borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%' }} />
                </div>
                <div className="relative">
                  <div className="w-2 h-8 bg-amber-800 rounded" />
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-4 h-6 animate-pulse" style={{ background: 'linear-gradient(180deg, #ff6b35 0%, #ff8fab 100%)', borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', animationDelay: '0.3s' }} />
                </div>
              </div>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              style={{ background: '#3d2817', color: '#f4d58d' }}
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// --- TROPICAL ISLAND NAV ---
export const TropicalIslandNav = () => {
  const [active, setActive] = useState(0);
  const islands = ['Home', 'Beach', 'Reef', 'Volcano'];

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: 'linear-gradient(180deg, #0077b6 0%, #00b4d8 100%)' }}>
      <nav className="relative flex items-end gap-4">
        {/* Ocean base */}
        <div className="absolute bottom-0 left-0 right-0 h-4" style={{ background: '#0077b6', borderRadius: '100px' }} />

        {islands.map((island, i) => (
          <button
            key={island}
            onClick={() => setActive(i)}
            className="relative transition-all duration-300"
            style={{
              transform: active === i ? 'translateY(-8px)' : 'translateY(0)',
            }}
          >
            {/* Island shape */}
            <div
              className="relative w-16 h-10 flex items-center justify-center"
              style={{
                background: active === i
                  ? 'linear-gradient(180deg, #f4d58d 0%, #ddc9a3 100%)'
                  : '#f4d58d',
                borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                boxShadow: active === i ? '0 4px 12px rgba(0,0,0,0.3)' : '0 2px 4px rgba(0,0,0,0.2)',
              }}
            >
              {/* Palm tree on active island */}
              {active === i && (
                <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                  <svg width="24" height="32" viewBox="0 0 24 32">
                    <path d="M12,32 L12,12" stroke="#5c4033" strokeWidth="2" />
                    <path d="M12,12 Q6,8 2,10 L12,12 Q6,4 4,2 L12,12 Q18,4 20,2 L12,12 Q18,8 22,10 Z" fill="#2d6a4f" />
                  </svg>
                </div>
              )}
              <span
                className="text-xs font-bold relative z-10"
                style={{ color: active === i ? '#5c4033' : '#8B5A2B' }}
              >
                {island}
              </span>
            </div>

            {/* Dotted path to next island */}
            {i < islands.length - 1 && (
              <div className="absolute -right-4 top-1/2 w-4 border-t-2 border-dashed border-white/50" />
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};

// --- TROPICAL WAVE DIVIDER ---
export const TropicalWaveDivider = () => {
  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#f4d58d' }}>
      <div className="w-full max-w-xs">
        <svg width="100%" height="40" viewBox="0 0 320 40" preserveAspectRatio="none">
          {/* Wave layers */}
          <path
            d="M0,20 Q40,10 80,20 T160,20 T240,20 T320,20"
            fill="none"
            stroke="#0077b6"
            strokeWidth="4"
          />
          <path
            d="M0,25 Q40,15 80,25 T160,25 T240,25 T320,25"
            fill="none"
            stroke="#00b4d8"
            strokeWidth="3"
          />
          <path
            d="M0,30 Q40,22 80,30 T160,30 T240,30 T320,30"
            fill="none"
            stroke="#0077b6"
            strokeWidth="2"
            opacity="0.5"
          />

          {/* Foam dots */}
          {[20, 60, 100, 140, 180, 220, 260, 300].map((x, i) => (
            <circle
              key={i}
              cx={x}
              cy={15 + (i % 2) * 5}
              r="3"
              fill="white"
              opacity="0.8"
            />
          ))}
        </svg>
      </div>
    </div>
  );
};

// --- TROPICAL PARROT ALERT ---
export const TropicalParrotAlert = () => {
  const [show, setShow] = useState(true);

  if (!show) {
    return (
      <div className="h-full flex items-center justify-center p-6" style={{ background: 'linear-gradient(180deg, #2d6a4f 0%, #1b4332 100%)' }}>
        <button
          onClick={() => setShow(true)}
          className="px-4 py-2 rounded-lg font-medium"
          style={{ background: '#ff6b35', color: 'white' }}
        >
          Show Alert
        </button>
      </div>
    );
  }

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: 'linear-gradient(180deg, #2d6a4f 0%, #1b4332 100%)' }}>
      <div
        className="relative w-64 p-4 pl-16 rounded-xl"
        style={{
          background: 'linear-gradient(135deg, #ff8fab 0%, #ff6b35 100%)',
          boxShadow: '0 8px 24px rgba(255, 107, 53, 0.4)',
        }}
      >
        {/* Parrot icon */}
        <div className="absolute -left-4 top-1/2 -translate-y-1/2">
          <svg width="56" height="64" viewBox="0 0 56 64">
            {/* Body */}
            <ellipse cx="28" cy="36" rx="18" ry="24" fill="#ff6b35" />
            {/* Wing */}
            <ellipse cx="36" cy="40" rx="12" ry="16" fill="#0077b6" />
            <ellipse cx="38" cy="44" rx="8" ry="12" fill="#2d6a4f" />
            {/* Head */}
            <circle cx="28" cy="16" r="14" fill="#ff6b35" />
            {/* Beak */}
            <path d="M20,18 Q14,20 16,24 Q20,22 22,18 Z" fill="#f4d58d" />
            <path d="M20,20 L14,22" stroke="#5c4033" strokeWidth="1" />
            {/* Eye */}
            <circle cx="26" cy="14" r="4" fill="white" />
            <circle cx="27" cy="14" r="2" fill="#1b4332" />
            {/* Head feathers */}
            <path d="M32,6 Q36,2 34,8" stroke="#ff8fab" strokeWidth="2" fill="none" />
            <path d="M30,4 Q32,0 32,6" stroke="#0077b6" strokeWidth="2" fill="none" />
            <path d="M28,3 Q28,-1 30,5" stroke="#2d6a4f" strokeWidth="2" fill="none" />
            {/* Tail feathers */}
            <path d="M28,58 L24,70" stroke="#ff6b35" strokeWidth="3" />
            <path d="M28,58 L28,72" stroke="#0077b6" strokeWidth="3" />
            <path d="M28,58 L32,70" stroke="#2d6a4f" strokeWidth="3" />
            <path d="M28,58 L20,68" stroke="#ff8fab" strokeWidth="3" />
            <path d="M28,58 L36,68" stroke="#f4d58d" strokeWidth="3" />
          </svg>
        </div>

        <div>
          <p className="text-white font-bold">Squawk!</p>
          <p className="text-white/90 text-sm mt-1">
            New message from the tropics!
          </p>
        </div>

        <button
          onClick={() => setShow(false)}
          className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-colors"
        >
          X
        </button>
      </div>
    </div>
  );
};

// --- TROPICAL PINEAPPLE ICON ---
export const TropicalPineappleIcon = () => {
  const [bouncing, setBouncing] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: 'linear-gradient(180deg, #0077b6 0%, #00b4d8 100%)' }}>
      <button
        onClick={() => {
          setBouncing(true);
          setTimeout(() => setBouncing(false), 500);
        }}
        className={`transition-transform ${bouncing ? 'animate-bounce' : ''}`}
      >
        <svg width="48" height="72" viewBox="0 0 48 72">
          {/* Crown (leaves) */}
          <path d="M24,24 L24,4 Q28,8 26,16" fill="#2d6a4f" />
          <path d="M24,24 L20,6 Q16,10 20,18" fill="#3d8b5f" />
          <path d="M24,24 L28,6 Q32,10 28,18" fill="#3d8b5f" />
          <path d="M24,24 L14,10 Q10,16 18,20" fill="#2d6a4f" />
          <path d="M24,24 L34,10 Q38,16 30,20" fill="#2d6a4f" />
          <path d="M24,24 L10,16 Q8,22 16,22" fill="#3d8b5f" />
          <path d="M24,24 L38,16 Q40,22 32,22" fill="#3d8b5f" />

          {/* Body */}
          <ellipse cx="24" cy="48" rx="18" ry="22" fill="#f4d58d" />

          {/* Diamond pattern */}
          {[0, 1, 2, 3].map((row) =>
            [0, 1, 2, 3, 4].map((col) => {
              const x = 10 + col * 8 - (row % 2) * 4;
              const y = 32 + row * 10;
              if (x < 8 || x > 40 || y > 64) return null;
              return (
                <path
                  key={`${row}-${col}`}
                  d={`M${x},${y} L${x + 4},${y + 5} L${x},${y + 10} L${x - 4},${y + 5} Z`}
                  fill="none"
                  stroke="#ff6b35"
                  strokeWidth="1.5"
                />
              );
            })
          )}

          {/* Highlights */}
          <ellipse cx="18" cy="42" rx="4" ry="6" fill="white" opacity="0.3" />
        </svg>
      </button>
    </div>
  );
};

// --- TROPICAL SURF HEADING ---
export const TropicalSurfHeading = () => {
  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: 'linear-gradient(180deg, #ff6b35 0%, #ff8fab 100%)' }}>
      <div className="relative">
        {/* Surfboard background */}
        <div
          className="absolute -inset-x-4 -inset-y-2 rounded-full"
          style={{
            background: 'linear-gradient(180deg, #f4d58d 0%, #ddc9a3 100%)',
            transform: 'rotate(-5deg)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          }}
        />

        {/* Surfboard stripe */}
        <div
          className="absolute top-1/2 left-0 right-0 h-2 -translate-y-1/2"
          style={{
            background: '#0077b6',
            transform: 'rotate(-5deg)',
          }}
        />

        <h1
          className="relative px-8 py-3 font-bold text-2xl tracking-wide"
          style={{
            color: '#5c4033',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          Surf&apos;s Up!
        </h1>

        {/* Fin decoration */}
        <div
          className="absolute -bottom-4 right-4"
          style={{ transform: 'rotate(-5deg)' }}
        >
          <svg width="16" height="20" viewBox="0 0 16 20">
            <path d="M8,0 Q16,10 8,20 Q0,10 8,0" fill="#0077b6" />
          </svg>
        </div>
      </div>
    </div>
  );
};

// --- TROPICAL TIDE SLIDER ---
export const TropicalTideSlider = () => {
  const [value, setValue] = useState(50);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: 'linear-gradient(180deg, #f4d58d 0%, #ddc9a3 100%)' }}>
      <div className="w-48">
        {/* Tide level indicator */}
        <div className="relative h-32 w-12 mx-auto mb-4 rounded-lg overflow-hidden" style={{ background: '#f4d58d', border: '2px solid #c4a574' }}>
          {/* Water fill */}
          <div
            className="absolute bottom-0 left-0 right-0 transition-all duration-300"
            style={{
              height: `${value}%`,
              background: 'linear-gradient(180deg, #00b4d8 0%, #0077b6 100%)',
            }}
          >
            {/* Wave top */}
            <svg className="absolute -top-2 left-0 right-0 w-full h-4" viewBox="0 0 48 16" preserveAspectRatio="none">
              <path d="M0,8 Q12,0 24,8 T48,8 L48,16 L0,16 Z" fill="#00b4d8" />
            </svg>
          </div>

          {/* Tide markers */}
          <div className="absolute right-1 top-2 bottom-2 flex flex-col justify-between">
            <span className="text-[8px] text-amber-700">HIGH</span>
            <span className="text-[8px] text-amber-700">MID</span>
            <span className="text-[8px] text-amber-700">LOW</span>
          </div>
        </div>

        {/* Slider control */}
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(90deg, #0077b6 0%, #0077b6 ${value}%, #c4a574 ${value}%, #c4a574 100%)`,
          }}
        />
        <p className="text-center text-amber-800 text-xs mt-2">Tide: {value}%</p>
      </div>
    </div>
  );
};

// --- TROPICAL BEACH TABS ---
export const TropicalBeachTabs = () => {
  const [active, setActive] = useState(0);
  const tabs = ['Sunrise', 'Midday', 'Sunset'];
  const umbrellaColors = ['#ff8fab', '#ff6b35', '#0077b6'];

  return (
    <div
      className="h-full flex items-center justify-center p-6 transition-all duration-500"
      style={{
        background: active === 0
          ? 'linear-gradient(180deg, #ff8fab 0%, #ff6b35 100%)'
          : active === 1
          ? 'linear-gradient(180deg, #00b4d8 0%, #0077b6 100%)'
          : 'linear-gradient(180deg, #ff6b35 0%, #4a1942 100%)',
      }}
    >
      <div className="flex gap-4">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActive(i)}
            className="relative flex flex-col items-center transition-all duration-300"
            style={{
              transform: active === i ? 'translateY(-8px)' : 'translateY(0)',
            }}
          >
            {/* Beach umbrella */}
            <svg width="40" height="48" viewBox="0 0 40 48">
              {/* Umbrella top */}
              <path
                d="M4,20 Q20,0 36,20 Z"
                fill={active === i ? umbrellaColors[i] : '#c4a574'}
                style={{ transition: 'fill 0.3s' }}
              />
              {/* Stripes */}
              <path d="M12,18 Q20,4 20,20" stroke="white" strokeWidth="2" fill="none" opacity={active === i ? 0.5 : 0.2} />
              <path d="M28,18 Q20,4 20,20" stroke="white" strokeWidth="2" fill="none" opacity={active === i ? 0.5 : 0.2} />
              {/* Pole */}
              <line x1="20" y1="20" x2="20" y2="44" stroke="#5c4033" strokeWidth="2" />
              {/* Base */}
              <ellipse cx="20" cy="46" rx="8" ry="2" fill="#f4d58d" />
            </svg>

            <span
              className="text-sm font-medium mt-1"
              style={{
                color: active === i ? 'white' : 'rgba(255,255,255,0.6)',
              }}
            >
              {tab}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

// --- TROPICAL SUNSET BACKGROUND ---
export const TropicalSunsetBackground = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => (prev + 1) % 100);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const sunY = 30 + Math.sin(time * 0.05) * 20;

  return (
    <div className="h-full w-full relative overflow-hidden">
      {/* Sky gradient */}
      <div
        className="absolute inset-0 transition-all duration-1000"
        style={{
          background: `linear-gradient(180deg,
            #ff6b35 0%,
            #ff8fab ${30 + sunY}%,
            #0077b6 ${60 + sunY}%,
            #00b4d8 100%)`,
        }}
      />

      {/* Sun */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-16 h-16 rounded-full transition-all duration-500"
        style={{
          top: `${sunY}%`,
          background: 'linear-gradient(180deg, #f4d58d 0%, #ff6b35 100%)',
          boxShadow: '0 0 60px #ff6b35, 0 0 120px #ff8fab',
        }}
      />

      {/* Sun reflection on water */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8"
        style={{ height: '30%' }}
      >
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="mx-auto rounded-full animate-pulse"
            style={{
              width: `${100 - i * 15}%`,
              height: '8px',
              marginTop: '4px',
              background: '#f4d58d',
              opacity: 0.6 - i * 0.08,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>

      {/* Ocean */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[35%]"
        style={{
          background: 'linear-gradient(180deg, #0077b6 0%, #005f99 100%)',
        }}
      >
        {/* Waves */}
        <svg className="absolute top-0 left-0 w-full h-8" viewBox="0 0 400 32" preserveAspectRatio="none">
          <path
            d="M0,16 Q50,8 100,16 T200,16 T300,16 T400,16 L400,32 L0,32 Z"
            fill="#0077b6"
          />
        </svg>
      </div>

      {/* Palm silhouettes */}
      <svg className="absolute bottom-[30%] left-4 w-16 h-24" viewBox="0 0 64 96">
        <path d="M32,96 L32,40" stroke="#1b4332" strokeWidth="4" />
        <path d="M32,40 Q10,30 0,35 L32,40 Q15,20 5,10 L32,40 Q50,20 60,10 L32,40 Q55,30 64,35 Z" fill="#1b4332" />
      </svg>
      <svg className="absolute bottom-[30%] right-8 w-12 h-20" viewBox="0 0 48 80">
        <path d="M24,80 L24,35" stroke="#1b4332" strokeWidth="3" />
        <path d="M24,35 Q8,28 0,32 L24,35 Q12,18 6,10 L24,35 Q38,18 44,10 L24,35 Q42,28 48,32 Z" fill="#1b4332" />
      </svg>

      {/* Flying birds */}
      <div className="absolute top-[20%] left-[20%]">
        <svg width="24" height="12" viewBox="0 0 24 12">
          <path d="M0,6 Q6,0 12,6 Q18,0 24,6" stroke="#1b4332" strokeWidth="2" fill="none" />
        </svg>
      </div>
      <div className="absolute top-[15%] left-[35%]">
        <svg width="16" height="8" viewBox="0 0 16 8">
          <path d="M0,4 Q4,0 8,4 Q12,0 16,4" stroke="#1b4332" strokeWidth="1.5" fill="none" />
        </svg>
      </div>
    </div>
  );
};

// Export all components
export const tropicalParadiseComponents: Record<string, React.FC> = {
  'tropical-coconut-button': TropicalCoconutButton,
  'tropical-postcard-card': TropicalPostcardCard,
  'tropical-bamboo-input': TropicalBambooInput,
  'tropical-hibiscus-badge': TropicalHibiscusBadge,
  'tropical-sunset-toggle': TropicalSunsetToggle,
  'tropical-wave-progress': TropicalWaveProgress,
  'tropical-palm-loader': TropicalPalmLoader,
  'tropical-lei-avatar': TropicalLeiAvatar,
  'tropical-tiki-modal': TropicalTikiModal,
  'tropical-island-nav': TropicalIslandNav,
  'tropical-wave-divider': TropicalWaveDivider,
  'tropical-parrot-alert': TropicalParrotAlert,
  'tropical-pineapple-icon': TropicalPineappleIcon,
  'tropical-surf-heading': TropicalSurfHeading,
  'tropical-tide-slider': TropicalTideSlider,
  'tropical-beach-tabs': TropicalBeachTabs,
  'tropical-sunset-background': TropicalSunsetBackground,
};
