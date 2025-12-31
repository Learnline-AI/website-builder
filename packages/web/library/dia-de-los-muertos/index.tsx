import React, { useState, useEffect } from 'react';

// Color palette
const colors = {
  marigold: '#f39c12',
  hotPink: '#e91e63',
  turquoise: '#00bcd4',
  purple: '#9c27b0',
  black: '#1a1a1a',
};

// --- MUERTOS CALAVERA BUTTON ---
export const MuertosCalaveraButton = () => {
  const [hover, setHover] = useState(false);
  const [clicked, setClicked] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: colors.black }}>
      <button
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => {
          setClicked(true);
          setTimeout(() => setClicked(false), 300);
        }}
        className="relative px-8 py-4 font-bold text-white transition-all duration-300"
        style={{
          background: `linear-gradient(135deg, ${colors.hotPink} 0%, ${colors.purple} 100%)`,
          borderRadius: '8px',
          boxShadow: hover
            ? `0 0 30px ${colors.marigold}80, 0 0 60px ${colors.hotPink}40`
            : `0 4px 15px rgba(0,0,0,0.3)`,
          transform: clicked ? 'scale(0.95)' : hover ? 'scale(1.05)' : 'scale(1)',
        }}
      >
        {/* Sugar skull decoration left */}
        <span className="absolute -left-2 top-1/2 -translate-y-1/2 text-2xl" style={{ filter: hover ? 'drop-shadow(0 0 8px #fff)' : 'none' }}>
          <svg width="28" height="32" viewBox="0 0 28 32">
            <ellipse cx="14" cy="14" rx="12" ry="13" fill="white" />
            {/* Eye sockets */}
            <ellipse cx="9" cy="12" rx="4" ry="4.5" fill={colors.black} />
            <ellipse cx="19" cy="12" rx="4" ry="4.5" fill={colors.black} />
            {/* Flower in eyes */}
            <circle cx="9" cy="12" r="2" fill={colors.hotPink} />
            <circle cx="19" cy="12" r="2" fill={colors.turquoise} />
            {/* Nose */}
            <path d="M14 16 L12 19 L16 19 Z" fill={colors.black} />
            {/* Teeth */}
            <rect x="8" y="22" width="3" height="4" fill={colors.black} />
            <rect x="12.5" y="22" width="3" height="4" fill={colors.black} />
            <rect x="17" y="22" width="3" height="4" fill={colors.black} />
            {/* Decorative forehead */}
            <circle cx="14" cy="6" r="2" fill={colors.marigold} />
            <circle cx="10" cy="4" r="1.5" fill={colors.hotPink} />
            <circle cx="18" cy="4" r="1.5" fill={colors.turquoise} />
          </svg>
        </span>

        <span className="relative z-10 mx-6">Celebrar</span>

        {/* Sugar skull decoration right */}
        <span className="absolute -right-2 top-1/2 -translate-y-1/2 text-2xl transform scale-x-[-1]" style={{ filter: hover ? 'drop-shadow(0 0 8px #fff)' : 'none' }}>
          <svg width="28" height="32" viewBox="0 0 28 32">
            <ellipse cx="14" cy="14" rx="12" ry="13" fill="white" />
            <ellipse cx="9" cy="12" rx="4" ry="4.5" fill={colors.black} />
            <ellipse cx="19" cy="12" rx="4" ry="4.5" fill={colors.black} />
            <circle cx="9" cy="12" r="2" fill={colors.purple} />
            <circle cx="19" cy="12" r="2" fill={colors.marigold} />
            <path d="M14 16 L12 19 L16 19 Z" fill={colors.black} />
            <rect x="8" y="22" width="3" height="4" fill={colors.black} />
            <rect x="12.5" y="22" width="3" height="4" fill={colors.black} />
            <rect x="17" y="22" width="3" height="4" fill={colors.black} />
            <circle cx="14" cy="6" r="2" fill={colors.hotPink} />
            <circle cx="10" cy="4" r="1.5" fill={colors.marigold} />
            <circle cx="18" cy="4" r="1.5" fill={colors.purple} />
          </svg>
        </span>
      </button>
    </div>
  );
};

// --- MUERTOS OFRENDA CARD ---
export const MuertosOfrendaCard = () => {
  const [candleFlicker, setCandleFlicker] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCandleFlicker(0.7 + Math.random() * 0.3);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: colors.black }}>
      <div
        className="relative w-64 p-4 overflow-hidden"
        style={{
          background: `linear-gradient(180deg, #2d1f1f 0%, ${colors.black} 100%)`,
          border: `3px solid ${colors.marigold}`,
          borderRadius: '12px',
          boxShadow: `0 0 20px ${colors.marigold}40`,
        }}
      >
        {/* Papel picado top decoration */}
        <div className="absolute top-0 left-0 right-0 h-6 overflow-hidden">
          <svg width="100%" height="24" viewBox="0 0 256 24" preserveAspectRatio="none">
            <path
              d="M0,0 L16,0 L16,16 L14,16 L12,12 L10,16 L8,12 L6,16 L4,12 L2,16 L0,16 Z"
              fill={colors.hotPink}
              style={{ transform: 'translateX(0)' }}
            />
            {[...Array(16)].map((_, i) => (
              <path
                key={i}
                d="M0,0 L16,0 L16,16 L14,16 L12,12 L10,16 L8,12 L6,16 L4,12 L2,16 L0,16 Z"
                fill={[colors.hotPink, colors.turquoise, colors.purple, colors.marigold][i % 4]}
                transform={`translate(${i * 16}, 0)`}
              />
            ))}
          </svg>
        </div>

        {/* Candles */}
        <div className="flex justify-center gap-4 mt-6 mb-4">
          {[colors.hotPink, colors.marigold, colors.purple].map((color, i) => (
            <div key={i} className="relative">
              <div className="w-3 h-10 rounded-t" style={{ background: color }} />
              <div
                className="absolute -top-4 left-1/2 -translate-x-1/2 w-4 h-6"
                style={{
                  background: `radial-gradient(ellipse at bottom, ${colors.marigold} 0%, transparent 70%)`,
                  opacity: candleFlicker,
                  filter: 'blur(2px)',
                }}
              />
              <div
                className="absolute -top-2 left-1/2 -translate-x-1/2 w-2 h-3 rounded-full"
                style={{
                  background: `linear-gradient(180deg, #fff 0%, ${colors.marigold} 50%, #ff6600 100%)`,
                  opacity: candleFlicker,
                }}
              />
            </div>
          ))}
        </div>

        {/* Photo frame */}
        <div
          className="mx-auto w-16 h-20 flex items-center justify-center"
          style={{
            background: '#3d2d2d',
            border: `2px solid ${colors.marigold}`,
            borderRadius: '4px',
          }}
        >
          <span className="text-3xl">
            <svg width="32" height="32" viewBox="0 0 32 32">
              <circle cx="16" cy="12" r="8" fill="#666" />
              <ellipse cx="16" cy="28" rx="10" ry="6" fill="#666" />
            </svg>
          </span>
        </div>

        {/* Marigold flowers */}
        <div className="flex justify-center gap-2 mt-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-4 h-4 rounded-full"
              style={{
                background: `radial-gradient(circle, ${colors.marigold} 30%, #d68910 100%)`,
                boxShadow: `0 0 6px ${colors.marigold}`,
              }}
            />
          ))}
        </div>

        <p className="text-center mt-3 font-serif text-sm" style={{ color: colors.marigold }}>
          En Memoria
        </p>
      </div>
    </div>
  );
};

// --- MUERTOS MARIGOLD INPUT ---
export const MuertosMarigoldInput = () => {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: colors.black }}>
      <div className="relative w-64">
        {/* Marigold petal border */}
        <div
          className="absolute -inset-2 rounded-lg transition-opacity duration-300"
          style={{
            opacity: focused ? 1 : 0.5,
            background: `conic-gradient(from 0deg, ${colors.marigold}, #d68910, ${colors.marigold}, #f5b041, ${colors.marigold})`,
            filter: focused ? 'blur(3px)' : 'blur(1px)',
          }}
        />

        {/* Petal decorations */}
        {focused && [...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 rounded-full animate-pulse"
            style={{
              background: colors.marigold,
              top: `${Math.sin(i * 30 * Math.PI / 180) * 45 + 50}%`,
              left: `${Math.cos(i * 30 * Math.PI / 180) * 55 + 50}%`,
              transform: 'translate(-50%, -50%)',
              animationDelay: `${i * 0.1}s`,
              boxShadow: `0 0 8px ${colors.marigold}`,
            }}
          />
        ))}

        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Escribe aqui..."
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="relative w-full px-4 py-3 font-serif outline-none transition-all duration-300"
          style={{
            background: '#2d1f1f',
            border: `2px solid ${focused ? colors.marigold : '#4a3535'}`,
            borderRadius: '8px',
            color: '#fff',
            boxShadow: focused ? `0 0 20px ${colors.marigold}40` : 'none',
          }}
        />
      </div>
    </div>
  );
};

// --- MUERTOS SKULL BADGE ---
export const MuertosSkullBadge = () => {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 500);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: colors.black }}>
      <div
        className="relative px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-300"
        style={{
          background: `linear-gradient(135deg, ${colors.purple} 0%, ${colors.hotPink} 100%)`,
          boxShadow: pulse ? `0 0 25px ${colors.hotPink}` : `0 0 10px ${colors.purple}60`,
          transform: pulse ? 'scale(1.1)' : 'scale(1)',
        }}
      >
        <svg width="24" height="28" viewBox="0 0 24 28">
          <ellipse cx="12" cy="12" rx="10" ry="11" fill="white" />
          {/* Decorated eye sockets */}
          <ellipse cx="8" cy="10" rx="3" ry="3.5" fill={colors.black} />
          <ellipse cx="16" cy="10" rx="3" ry="3.5" fill={colors.black} />
          {/* Flower centers in eyes */}
          <circle cx="8" cy="10" r="1.5" fill={colors.marigold} />
          <circle cx="16" cy="10" r="1.5" fill={colors.turquoise} />
          {/* Nose heart */}
          <path d="M12 13 Q10 15 12 17 Q14 15 12 13" fill={colors.hotPink} />
          {/* Smile with teeth */}
          <path d="M7 19 Q12 22 17 19" stroke={colors.black} strokeWidth="1.5" fill="none" />
          <line x1="9" y1="19" x2="9" y2="21" stroke={colors.black} strokeWidth="1" />
          <line x1="12" y1="19.5" x2="12" y2="21.5" stroke={colors.black} strokeWidth="1" />
          <line x1="15" y1="19" x2="15" y2="21" stroke={colors.black} strokeWidth="1" />
          {/* Forehead flower */}
          {[0, 72, 144, 216, 288].map((angle, i) => (
            <ellipse
              key={i}
              cx={12 + Math.cos(angle * Math.PI / 180) * 3}
              cy={4 + Math.sin(angle * Math.PI / 180) * 2}
              rx="2"
              ry="1"
              fill={colors.marigold}
              transform={`rotate(${angle}, ${12 + Math.cos(angle * Math.PI / 180) * 3}, ${4 + Math.sin(angle * Math.PI / 180) * 2})`}
            />
          ))}
          <circle cx="12" cy="4" r="1.5" fill={colors.hotPink} />
        </svg>
        <span className="text-white font-bold text-sm">Calavera</span>
      </div>
    </div>
  );
};

// --- MUERTOS CANDLE TOGGLE ---
export const MuertosCandleToggle = () => {
  const [isOn, setIsOn] = useState(true);
  const [flicker, setFlicker] = useState(1);

  useEffect(() => {
    if (!isOn) return;
    const interval = setInterval(() => {
      setFlicker(0.6 + Math.random() * 0.4);
    }, 80);
    return () => clearInterval(interval);
  }, [isOn]);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: colors.black }}>
      <button
        onClick={() => setIsOn(!isOn)}
        className="relative w-20 h-32 transition-all duration-300"
      >
        {/* Candle holder */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-6 rounded-b-lg"
          style={{
            background: `linear-gradient(180deg, ${colors.purple} 0%, #5d1a6e 100%)`,
            border: `2px solid ${colors.hotPink}`,
          }}
        />

        {/* Candle body */}
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 w-8 h-16 rounded-t"
          style={{
            background: `linear-gradient(180deg, ${colors.marigold} 0%, #d68910 100%)`,
            boxShadow: isOn ? `0 0 15px ${colors.marigold}60` : 'none',
          }}
        >
          {/* Wax drips */}
          <div className="absolute -right-1 top-4 w-2 h-4 rounded-b-full" style={{ background: '#d68910' }} />
          <div className="absolute -left-1 top-8 w-2 h-3 rounded-b-full" style={{ background: '#e8a60c' }} />
        </div>

        {/* Wick */}
        <div
          className="absolute bottom-[88px] left-1/2 -translate-x-1/2 w-1 h-3 rounded-t"
          style={{ background: '#333' }}
        />

        {/* Flame */}
        {isOn && (
          <>
            <div
              className="absolute bottom-24 left-1/2 -translate-x-1/2 w-6 h-10 rounded-full"
              style={{
                background: `radial-gradient(ellipse at bottom, ${colors.marigold}80 0%, transparent 70%)`,
                opacity: flicker,
                filter: 'blur(4px)',
              }}
            />
            <div
              className="absolute bottom-[96px] left-1/2 -translate-x-1/2 w-3 h-5"
              style={{
                background: `linear-gradient(180deg, #fff 0%, ${colors.marigold} 40%, #ff6600 100%)`,
                borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                opacity: flicker,
                transform: `scaleX(${0.8 + flicker * 0.2})`,
              }}
            />
          </>
        )}

        {/* Status text */}
        <span
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-serif whitespace-nowrap"
          style={{ color: isOn ? colors.marigold : '#666' }}
        >
          {isOn ? 'Encendida' : 'Apagada'}
        </span>
      </button>
    </div>
  );
};

// --- MUERTOS PETAL PROGRESS ---
export const MuertosPetalProgress = () => {
  const [progress, setProgress] = useState(65);
  const [petals, setPetals] = useState<Array<{ id: number; x: number; delay: number }>>([]);

  useEffect(() => {
    const newPetals = [...Array(8)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    setPetals(newPetals);
  }, []);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: colors.black }}>
      <div className="w-64">
        <div className="relative h-8 rounded-full overflow-hidden" style={{ background: '#2d1f1f', border: `2px solid ${colors.marigold}40` }}>
          {/* Progress fill */}
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${progress}%`,
              background: `linear-gradient(90deg, ${colors.marigold} 0%, ${colors.hotPink} 50%, ${colors.purple} 100%)`,
              boxShadow: `0 0 10px ${colors.marigold}60`,
            }}
          />

          {/* Falling petals */}
          {petals.map((petal) => (
            <div
              key={petal.id}
              className="absolute w-2 h-2 rounded-full animate-bounce"
              style={{
                background: colors.marigold,
                left: `${petal.x}%`,
                top: '-8px',
                animation: `fall 3s ease-in-out infinite`,
                animationDelay: `${petal.delay}s`,
                boxShadow: `0 0 4px ${colors.marigold}`,
              }}
            />
          ))}
        </div>

        <div className="flex justify-between mt-2">
          <span className="text-xs" style={{ color: colors.marigold }}>Flores</span>
          <span className="text-xs font-bold" style={{ color: colors.hotPink }}>{progress}%</span>
        </div>

        <div className="flex justify-center gap-2 mt-3">
          <button
            onClick={() => setProgress(Math.max(0, progress - 10))}
            className="px-3 py-1 rounded text-xs"
            style={{ background: colors.purple, color: '#fff' }}
          >
            -
          </button>
          <button
            onClick={() => setProgress(Math.min(100, progress + 10))}
            className="px-3 py-1 rounded text-xs"
            style={{ background: colors.hotPink, color: '#fff' }}
          >
            +
          </button>
        </div>

        <style>{`
          @keyframes fall {
            0%, 100% { transform: translateY(0) rotate(0deg); opacity: 1; }
            50% { transform: translateY(40px) rotate(180deg); opacity: 0.5; }
          }
        `}</style>
      </div>
    </div>
  );
};

// --- MUERTOS SKELETON LOADER ---
export const MuertosSkeletonLoader = () => {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % 4);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  const poses = [
    { leftArm: -20, rightArm: 20, leftLeg: 10, rightLeg: -10 },
    { leftArm: 20, rightArm: -20, leftLeg: -10, rightLeg: 10 },
    { leftArm: -30, rightArm: 30, leftLeg: 15, rightLeg: -15 },
    { leftArm: 30, rightArm: -30, leftLeg: -15, rightLeg: 15 },
  ];

  const pose = poses[frame];

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: colors.black }}>
      <div className="text-center">
        <svg width="80" height="120" viewBox="0 0 80 120">
          {/* Skull */}
          <ellipse cx="40" cy="18" rx="14" ry="16" fill="white" />
          <ellipse cx="34" cy="16" rx="4" ry="5" fill={colors.black} />
          <ellipse cx="46" cy="16" rx="4" ry="5" fill={colors.black} />
          <circle cx="34" cy="16" r="2" fill={colors.hotPink} />
          <circle cx="46" cy="16" r="2" fill={colors.turquoise} />
          <path d="M40 22 L38 26 L42 26 Z" fill={colors.black} />
          <path d="M33 30 L47 30" stroke={colors.black} strokeWidth="2" />
          <line x1="36" y1="30" x2="36" y2="34" stroke={colors.black} strokeWidth="1.5" />
          <line x1="40" y1="30" x2="40" y2="34" stroke={colors.black} strokeWidth="1.5" />
          <line x1="44" y1="30" x2="44" y2="34" stroke={colors.black} strokeWidth="1.5" />

          {/* Spine */}
          <rect x="38" y="36" width="4" height="30" fill="white" rx="2" />

          {/* Ribs */}
          {[0, 8, 16].map((y, i) => (
            <g key={i}>
              <ellipse cx="40" cy={42 + y} rx="16" ry="3" fill="none" stroke="white" strokeWidth="2" />
            </g>
          ))}

          {/* Pelvis */}
          <ellipse cx="40" cy="70" rx="12" ry="6" fill="white" />

          {/* Left arm */}
          <g style={{ transform: `rotate(${pose.leftArm}deg)`, transformOrigin: '28px 40px' }}>
            <rect x="20" y="38" width="8" height="24" fill="white" rx="4" />
            <rect x="18" y="60" width="6" height="16" fill="white" rx="3" />
          </g>

          {/* Right arm */}
          <g style={{ transform: `rotate(${pose.rightArm}deg)`, transformOrigin: '52px 40px' }}>
            <rect x="52" y="38" width="8" height="24" fill="white" rx="4" />
            <rect x="56" y="60" width="6" height="16" fill="white" rx="3" />
          </g>

          {/* Left leg */}
          <g style={{ transform: `rotate(${pose.leftLeg}deg)`, transformOrigin: '34px 74px' }}>
            <rect x="30" y="74" width="8" height="28" fill="white" rx="4" />
            <ellipse cx="34" cy="106" rx="6" ry="4" fill="white" />
          </g>

          {/* Right leg */}
          <g style={{ transform: `rotate(${pose.rightLeg}deg)`, transformOrigin: '46px 74px' }}>
            <rect x="42" y="74" width="8" height="28" fill="white" rx="4" />
            <ellipse cx="46" cy="106" rx="6" ry="4" fill="white" />
          </g>

          {/* Marigold decorations */}
          <circle cx="40" cy="8" r="3" fill={colors.marigold} />
          <circle cx="32" cy="6" r="2" fill={colors.hotPink} />
          <circle cx="48" cy="6" r="2" fill={colors.purple} />
        </svg>

        <p className="mt-2 text-sm font-serif animate-pulse" style={{ color: colors.marigold }}>
          Bailando...
        </p>
      </div>
    </div>
  );
};

// --- MUERTOS FRAME AVATAR ---
export const MuertosFrameAvatar = () => {
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
        <div
          className="absolute -inset-4 rounded-lg"
          style={{
            background: `linear-gradient(135deg, ${colors.marigold} 0%, #8b6914 50%, ${colors.marigold} 100%)`,
            boxShadow: hover ? `0 0 30px ${colors.marigold}60` : `0 0 10px ${colors.marigold}30`,
          }}
        />

        {/* Inner frame decoration */}
        <div
          className="absolute -inset-2 rounded"
          style={{
            background: colors.black,
            border: `2px solid ${colors.hotPink}`,
          }}
        />

        {/* Corner flowers */}
        {[
          { top: '-16px', left: '-16px' },
          { top: '-16px', right: '-16px' },
          { bottom: '-16px', left: '-16px' },
          { bottom: '-16px', right: '-16px' },
        ].map((pos, i) => (
          <div
            key={i}
            className="absolute w-6 h-6 rounded-full"
            style={{
              ...pos,
              background: `radial-gradient(circle, ${colors.marigold} 30%, #d68910 100%)`,
              boxShadow: hover ? `0 0 10px ${colors.marigold}` : 'none',
            }}
          />
        ))}

        {/* Avatar placeholder */}
        <div
          className="relative w-20 h-24 flex items-center justify-center overflow-hidden"
          style={{
            background: `linear-gradient(180deg, #3d2d2d 0%, #2d1f1f 100%)`,
            borderRadius: '4px',
          }}
        >
          <svg width="48" height="56" viewBox="0 0 48 56">
            <ellipse cx="24" cy="20" rx="14" ry="16" fill="#666" />
            <ellipse cx="24" cy="52" rx="18" ry="12" fill="#666" />
            {/* Calavera face paint on avatar */}
            <ellipse cx="18" cy="18" rx="4" ry="5" fill={colors.black} />
            <ellipse cx="30" cy="18" rx="4" ry="5" fill={colors.black} />
            <circle cx="18" cy="18" r="2" fill={colors.hotPink} />
            <circle cx="30" cy="18" r="2" fill={colors.turquoise} />
          </svg>
        </div>

        {/* Name ribbon */}
        <div
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-4 py-1 whitespace-nowrap"
          style={{
            background: colors.purple,
            color: '#fff',
            fontSize: '10px',
            fontFamily: 'serif',
            clipPath: 'polygon(10% 0, 90% 0, 100% 50%, 90% 100%, 10% 100%, 0% 50%)',
          }}
        >
          Abuelita Maria
        </div>
      </div>
    </div>
  );
};

// --- MUERTOS PAPEL MODAL ---
export const MuertosPapelModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return (
      <div className="h-full flex items-center justify-center p-6" style={{ background: colors.black }}>
        <button
          onClick={() => setIsOpen(true)}
          className="px-6 py-3 rounded-lg font-serif"
          style={{
            background: `linear-gradient(135deg, ${colors.hotPink} 0%, ${colors.purple} 100%)`,
            color: '#fff',
          }}
        >
          Abrir Invitacion
        </button>
      </div>
    );
  }

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: colors.black }}>
      <div className="relative w-72">
        {/* Papel picado banner */}
        <div className="absolute -top-4 left-0 right-0 h-8 overflow-hidden">
          <svg width="100%" height="32" viewBox="0 0 288 32" preserveAspectRatio="none">
            {[...Array(18)].map((_, i) => (
              <g key={i} transform={`translate(${i * 16}, 0)`}>
                <rect width="16" height="24" fill={[colors.hotPink, colors.turquoise, colors.purple, colors.marigold][i % 4]} />
                {/* Cut-out patterns */}
                <circle cx="8" cy="8" r="3" fill={colors.black} />
                <rect x="3" y="14" width="4" height="4" fill={colors.black} transform="rotate(45 5 16)" />
                <rect x="9" y="14" width="4" height="4" fill={colors.black} transform="rotate(45 11 16)" />
                {/* Fringe */}
                <path d="M0,24 L2,32 L4,24 L6,32 L8,24 L10,32 L12,24 L14,32 L16,24" fill={[colors.hotPink, colors.turquoise, colors.purple, colors.marigold][i % 4]} />
              </g>
            ))}
          </svg>
        </div>

        {/* Modal body */}
        <div
          className="pt-8 pb-6 px-6 rounded-b-lg"
          style={{
            background: `linear-gradient(180deg, #2d1f1f 0%, ${colors.black} 100%)`,
            border: `2px solid ${colors.marigold}`,
            borderTop: 'none',
            boxShadow: `0 10px 40px rgba(0,0,0,0.5), 0 0 20px ${colors.marigold}20`,
          }}
        >
          <h3 className="text-xl font-serif text-center mb-3" style={{ color: colors.marigold }}>
            Dia de los Muertos
          </h3>

          <p className="text-sm text-center mb-4" style={{ color: '#ccc' }}>
            Te invitamos a celebrar con nosotros esta hermosa tradicion.
          </p>

          {/* Decorative skulls */}
          <div className="flex justify-center gap-4 mb-4">
            {[colors.hotPink, colors.turquoise, colors.purple].map((color, i) => (
              <div key={i} className="text-2xl">
                <svg width="24" height="28" viewBox="0 0 24 28">
                  <ellipse cx="12" cy="12" rx="10" ry="11" fill="white" />
                  <ellipse cx="8" cy="10" rx="3" ry="3.5" fill={colors.black} />
                  <ellipse cx="16" cy="10" rx="3" ry="3.5" fill={colors.black} />
                  <circle cx="8" cy="10" r="1.5" fill={color} />
                  <circle cx="16" cy="10" r="1.5" fill={color} />
                  <path d="M12 14 L10 17 L14 17 Z" fill={colors.black} />
                  <path d="M8 20 L16 20" stroke={colors.black} strokeWidth="1.5" />
                </svg>
              </div>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="w-full py-2 rounded font-serif transition-all duration-300 hover:opacity-90"
            style={{
              background: `linear-gradient(90deg, ${colors.hotPink} 0%, ${colors.purple} 100%)`,
              color: '#fff',
            }}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

// --- MUERTOS BONE NAV ---
export const MuertosBoneNav = () => {
  const [active, setActive] = useState(0);
  const items = ['Inicio', 'Ofrenda', 'Fotos', 'Musica'];

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: colors.black }}>
      <nav className="flex gap-1">
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="relative px-4 py-2 transition-all duration-300"
            style={{
              color: active === i ? colors.marigold : '#888',
            }}
          >
            {/* Bone shape background */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 80 32"
              preserveAspectRatio="none"
            >
              <path
                d="M8,16 Q8,8 16,8 L64,8 Q72,8 72,16 Q72,24 64,24 L16,24 Q8,24 8,16 M4,8 A6,6 0 1,1 4,24 A6,6 0 1,1 4,8 M76,8 A6,6 0 1,1 76,24 A6,6 0 1,1 76,8"
                fill={active === i ? '#fff' : '#3d3d3d'}
                style={{
                  filter: active === i ? `drop-shadow(0 0 6px ${colors.marigold})` : 'none',
                }}
              />
            </svg>
            <span className="relative z-10 text-sm font-serif" style={{ color: active === i ? colors.black : '#888' }}>
              {item}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
};

// --- MUERTOS FLOWER DIVIDER ---
export const MuertosFlowerDivider = () => {
  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: colors.black }}>
      <div className="w-full max-w-md flex items-center gap-2">
        {/* Left vine */}
        <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, transparent 0%, ${colors.marigold} 100%)` }} />

        {/* Flowers */}
        <div className="flex items-center gap-3">
          {[colors.hotPink, colors.marigold, colors.turquoise, colors.marigold, colors.purple].map((color, i) => (
            <div key={i} className="relative">
              {/* Petals */}
              <svg width={i === 2 ? 28 : 20} height={i === 2 ? 28 : 20} viewBox="0 0 24 24">
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, j) => (
                  <ellipse
                    key={j}
                    cx={12 + Math.cos(angle * Math.PI / 180) * 6}
                    cy={12 + Math.sin(angle * Math.PI / 180) * 6}
                    rx="4"
                    ry="2.5"
                    fill={color}
                    transform={`rotate(${angle}, ${12 + Math.cos(angle * Math.PI / 180) * 6}, ${12 + Math.sin(angle * Math.PI / 180) * 6})`}
                    style={{ filter: `drop-shadow(0 0 2px ${color})` }}
                  />
                ))}
                <circle cx="12" cy="12" r="4" fill={i === 2 ? colors.black : '#2d1f1f'} />
                <circle cx="12" cy="12" r="2" fill={color} opacity="0.8" />
              </svg>
            </div>
          ))}
        </div>

        {/* Right vine */}
        <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${colors.marigold} 0%, transparent 100%)` }} />
      </div>
    </div>
  );
};

// --- MUERTOS SPIRIT ALERT ---
export const MuertosSpiritAlert = () => {
  const [visible, setVisible] = useState(true);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setOpacity(0.5 + Math.random() * 0.5);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  if (!visible) {
    return (
      <div className="h-full flex items-center justify-center p-6" style={{ background: colors.black }}>
        <button
          onClick={() => setVisible(true)}
          className="text-sm font-serif"
          style={{ color: colors.purple }}
        >
          Invocar espiritu
        </button>
      </div>
    );
  }

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: colors.black }}>
      <div
        className="relative w-64 p-4 rounded-lg transition-opacity duration-150"
        style={{
          background: `linear-gradient(180deg, ${colors.purple}40 0%, ${colors.black} 100%)`,
          border: `1px solid ${colors.purple}60`,
          boxShadow: `0 0 30px ${colors.purple}30`,
          opacity,
        }}
      >
        {/* Ghost wisps */}
        <div
          className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full animate-pulse"
          style={{
            background: `radial-gradient(circle, ${colors.purple}60 0%, transparent 70%)`,
          }}
        />

        {/* Spirit icon */}
        <div className="flex items-center gap-3 mb-2">
          <svg width="24" height="32" viewBox="0 0 24 32" style={{ filter: `drop-shadow(0 0 6px ${colors.purple})` }}>
            <path
              d="M12 0 Q20 4 20 12 L20 24 Q20 28 18 28 Q16 32 14 28 Q12 32 10 28 Q8 32 6 28 Q4 28 4 24 L4 12 Q4 4 12 0"
              fill="white"
              opacity="0.8"
            />
            <ellipse cx="9" cy="14" rx="2" ry="3" fill={colors.black} />
            <ellipse cx="15" cy="14" rx="2" ry="3" fill={colors.black} />
            <ellipse cx="12" cy="20" rx="3" ry="2" fill={colors.black} />
          </svg>
          <div>
            <p className="font-serif text-sm" style={{ color: colors.marigold }}>Mensaje del Mas Alla</p>
          </div>
        </div>

        <p className="text-xs" style={{ color: '#ccc' }}>
          Los espiritus de tus ancestros te envian bendiciones.
        </p>

        <button
          onClick={() => setVisible(false)}
          className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center text-xs"
          style={{ background: colors.purple + '40', color: '#fff' }}
        >
          x
        </button>
      </div>
    </div>
  );
};

// --- MUERTOS HEART ICON ---
export const MuertosHeartIcon = () => {
  const [beat, setBeat] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setBeat(true);
      setTimeout(() => setBeat(false), 200);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: colors.black }}>
      <div
        className="transition-transform duration-200"
        style={{ transform: beat ? 'scale(1.15)' : 'scale(1)' }}
      >
        <svg width="80" height="90" viewBox="0 0 80 90">
          {/* Sacred heart shape */}
          <path
            d="M40 20 Q40 10 30 10 Q15 10 15 30 Q15 45 40 65 Q65 45 65 30 Q65 10 50 10 Q40 10 40 20"
            fill={colors.hotPink}
            style={{ filter: `drop-shadow(0 0 10px ${colors.hotPink})` }}
          />

          {/* Flames on top */}
          {[-10, 0, 10].map((x, i) => (
            <path
              key={i}
              d={`M${40 + x} 18 Q${38 + x} 8 ${40 + x} 2 Q${42 + x} 8 ${40 + x} 18`}
              fill={colors.marigold}
              style={{ filter: `drop-shadow(0 0 4px ${colors.marigold})` }}
            />
          ))}

          {/* Decorative elements */}
          <circle cx="30" cy="30" r="4" fill={colors.marigold} />
          <circle cx="50" cy="30" r="4" fill={colors.marigold} />

          {/* Cross/thorns around */}
          <path
            d="M25 50 L15 50 M55 50 L65 50 M40 75 L40 85"
            stroke={colors.marigold}
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Rays emanating */}
          {[...Array(8)].map((_, i) => {
            const angle = (i * 45 - 90) * Math.PI / 180;
            const x1 = 40 + Math.cos(angle) * 35;
            const y1 = 40 + Math.sin(angle) * 30;
            const x2 = 40 + Math.cos(angle) * 45;
            const y2 = 40 + Math.sin(angle) * 40;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={colors.turquoise}
                strokeWidth="2"
                opacity="0.6"
              />
            );
          })}

          {/* Banner */}
          <path
            d="M15 70 Q25 65 40 70 Q55 75 65 70 L65 80 Q55 85 40 80 Q25 75 15 80 Z"
            fill={colors.purple}
          />
          <text x="40" y="77" textAnchor="middle" fill="white" fontSize="8" fontFamily="serif">
            CORAZON
          </text>
        </svg>
      </div>
    </div>
  );
};

// --- MUERTOS DECORATIVE HEADING ---
export const MuertosDecorativeHeading = () => {
  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: colors.black }}>
      <div className="text-center">
        {/* Top flourish */}
        <svg width="200" height="30" viewBox="0 0 200 30" className="mx-auto mb-2">
          <path
            d="M20 15 Q40 5 60 15 T100 15 T140 15 T180 15"
            stroke={colors.marigold}
            strokeWidth="2"
            fill="none"
          />
          {/* Decorative flowers */}
          <circle cx="20" cy="15" r="4" fill={colors.hotPink} />
          <circle cx="100" cy="15" r="6" fill={colors.marigold} />
          <circle cx="180" cy="15" r="4" fill={colors.purple} />
          {/* Leaves */}
          <ellipse cx="50" cy="15" rx="6" ry="3" fill={colors.turquoise} opacity="0.7" />
          <ellipse cx="150" cy="15" rx="6" ry="3" fill={colors.turquoise} opacity="0.7" />
        </svg>

        {/* Main heading */}
        <h2
          className="text-3xl font-serif tracking-wide"
          style={{
            color: colors.marigold,
            textShadow: `0 0 20px ${colors.marigold}60, 2px 2px 0 ${colors.hotPink}`,
          }}
        >
          Recordamos
        </h2>

        {/* Skull accent */}
        <div className="flex justify-center mt-2">
          <svg width="36" height="40" viewBox="0 0 36 40">
            <ellipse cx="18" cy="16" rx="14" ry="15" fill="white" />
            <ellipse cx="12" cy="14" rx="4" ry="5" fill={colors.black} />
            <ellipse cx="24" cy="14" rx="4" ry="5" fill={colors.black} />
            <circle cx="12" cy="14" r="2" fill={colors.hotPink} />
            <circle cx="24" cy="14" r="2" fill={colors.turquoise} />
            <path d="M18 20 L16 24 L20 24 Z" fill={colors.black} />
            <path d="M11 28 Q18 32 25 28" stroke={colors.black} strokeWidth="2" fill="none" />
            {/* Flower crown */}
            {[colors.hotPink, colors.marigold, colors.purple, colors.turquoise, colors.marigold].map((color, i) => (
              <circle key={i} cx={6 + i * 6} cy={4} r="3" fill={color} />
            ))}
          </svg>
        </div>

        {/* Bottom flourish */}
        <svg width="200" height="30" viewBox="0 0 200 30" className="mx-auto mt-2 transform rotate-180">
          <path
            d="M20 15 Q40 5 60 15 T100 15 T140 15 T180 15"
            stroke={colors.marigold}
            strokeWidth="2"
            fill="none"
          />
          <circle cx="20" cy="15" r="4" fill={colors.purple} />
          <circle cx="100" cy="15" r="6" fill={colors.marigold} />
          <circle cx="180" cy="15" r="4" fill={colors.hotPink} />
          <ellipse cx="50" cy="15" rx="6" ry="3" fill={colors.turquoise} opacity="0.7" />
          <ellipse cx="150" cy="15" rx="6" ry="3" fill={colors.turquoise} opacity="0.7" />
        </svg>
      </div>
    </div>
  );
};

// --- MUERTOS GUITAR SLIDER ---
export const MuertosGuitarSlider = () => {
  const [value, setValue] = useState(50);
  const frets = 12;

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: colors.black }}>
      <div className="w-64">
        {/* Guitar neck */}
        <div
          className="relative h-20 rounded-lg overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, #4a3728 0%, #2d1f1a 100%)',
            border: `3px solid ${colors.marigold}40`,
          }}
        >
          {/* Frets */}
          {[...Array(frets)].map((_, i) => (
            <div
              key={i}
              className="absolute top-0 bottom-0 w-0.5"
              style={{
                left: `${(i + 1) * (100 / (frets + 1))}%`,
                background: `linear-gradient(180deg, ${colors.marigold} 0%, #8b6914 100%)`,
              }}
            />
          ))}

          {/* Strings */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute left-0 right-0 h-px"
              style={{
                top: `${15 + i * 12}%`,
                background: i < 3 ? '#ccc' : '#999',
                boxShadow: `0 0 2px ${colors.marigold}40`,
              }}
            />
          ))}

          {/* Slider handle (finger position) */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-4 h-16 rounded-full transition-all duration-100"
            style={{
              left: `${value}%`,
              transform: `translateX(-50%) translateY(-50%)`,
              background: `linear-gradient(180deg, ${colors.hotPink} 0%, ${colors.purple} 100%)`,
              boxShadow: `0 0 15px ${colors.hotPink}80`,
            }}
          />

          {/* Fret markers */}
          {[3, 5, 7, 9].map((fret) => (
            <div
              key={fret}
              className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
              style={{
                left: `${(fret) * (100 / (frets + 1))}%`,
                transform: 'translateX(-50%) translateY(-50%)',
                background: colors.marigold,
                opacity: 0.6,
              }}
            />
          ))}
        </div>

        {/* Slider input (invisible, for interaction) */}
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => setValue(parseInt(e.target.value))}
          className="w-full mt-2 opacity-0 cursor-pointer h-8 -mt-24 relative z-10"
          style={{ marginTop: '-80px', height: '80px' }}
        />

        {/* Value display */}
        <div className="flex justify-between mt-2">
          <span className="text-xs font-serif" style={{ color: colors.turquoise }}>Nota</span>
          <span className="text-xs font-bold" style={{ color: colors.marigold }}>{value}%</span>
        </div>

        {/* Decorative marigolds */}
        <div className="flex justify-center gap-2 mt-3">
          {[colors.marigold, colors.hotPink, colors.marigold].map((color, i) => (
            <div
              key={i}
              className="w-4 h-4 rounded-full"
              style={{
                background: `radial-gradient(circle, ${color} 30%, #d68910 100%)`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// --- MUERTOS BANNER TABS ---
export const MuertosBannerTabs = () => {
  const [active, setActive] = useState(0);
  const tabs = ['Familia', 'Fotos', 'Recetas', 'Musica'];

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: colors.black }}>
      <div className="w-full max-w-sm">
        {/* Papel picado tabs */}
        <div className="flex">
          {tabs.map((tab, i) => {
            const tabColors = [colors.hotPink, colors.turquoise, colors.purple, colors.marigold];
            const isActive = active === i;

            return (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="flex-1 relative transition-all duration-300"
                style={{
                  transform: isActive ? 'translateY(-4px)' : 'translateY(0)',
                }}
              >
                <svg width="100%" height="48" viewBox="0 0 80 48" preserveAspectRatio="none">
                  {/* Banner shape */}
                  <path
                    d="M0,0 L80,0 L80,36 L70,36 L68,44 L64,36 L56,36 L54,44 L50,36 L42,36 L40,44 L36,36 L28,36 L26,44 L22,36 L14,36 L12,44 L8,36 L0,36 Z"
                    fill={isActive ? tabColors[i] : '#3d3d3d'}
                    style={{
                      filter: isActive ? `drop-shadow(0 4px 8px ${tabColors[i]}60)` : 'none',
                    }}
                  />
                  {/* Cut-out decorations */}
                  <circle cx="20" cy="14" r="4" fill={isActive ? colors.black : '#2d2d2d'} />
                  <circle cx="40" cy="14" r="4" fill={isActive ? colors.black : '#2d2d2d'} />
                  <circle cx="60" cy="14" r="4" fill={isActive ? colors.black : '#2d2d2d'} />
                  <rect x="28" y="22" width="6" height="6" fill={isActive ? colors.black : '#2d2d2d'} transform="rotate(45 31 25)" />
                  <rect x="46" y="22" width="6" height="6" fill={isActive ? colors.black : '#2d2d2d'} transform="rotate(45 49 25)" />
                </svg>
                <span
                  className="absolute top-3 left-1/2 -translate-x-1/2 text-xs font-serif whitespace-nowrap"
                  style={{ color: isActive ? '#fff' : '#888' }}
                >
                  {tab}
                </span>
              </button>
            );
          })}
        </div>

        {/* Content area */}
        <div
          className="p-4 rounded-b-lg -mt-1"
          style={{
            background: '#2d1f1f',
            border: `2px solid ${[colors.hotPink, colors.turquoise, colors.purple, colors.marigold][active]}`,
            borderTop: 'none',
          }}
        >
          <p className="text-sm text-center" style={{ color: '#ccc' }}>
            {['Nuestros seres queridos', 'Momentos especiales', 'Sabores de casa', 'Melodias del alma'][active]}
          </p>
        </div>
      </div>
    </div>
  );
};

// --- MUERTOS PATTERN BACKGROUND ---
export const MuertosPatternBackground = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((o) => (o + 0.5) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full w-full overflow-hidden relative" style={{ background: colors.black }}>
      {/* Animated pattern layer */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ transform: `translateY(${offset}px)` }}
      >
        <defs>
          <pattern id="muertos-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            {/* Mini skull */}
            <ellipse cx="30" cy="20" rx="8" ry="9" fill={colors.hotPink} opacity="0.3" />
            <ellipse cx="27" cy="18" rx="2" ry="2.5" fill={colors.black} />
            <ellipse cx="33" cy="18" rx="2" ry="2.5" fill={colors.black} />

            {/* Marigold */}
            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
              <ellipse
                key={i}
                cx={30 + Math.cos(angle * Math.PI / 180) * 4}
                cy={45 + Math.sin(angle * Math.PI / 180) * 4}
                rx="3"
                ry="1.5"
                fill={colors.marigold}
                opacity="0.4"
                transform={`rotate(${angle}, ${30 + Math.cos(angle * Math.PI / 180) * 4}, ${45 + Math.sin(angle * Math.PI / 180) * 4})`}
              />
            ))}
            <circle cx="30" cy="45" r="2" fill={colors.marigold} opacity="0.5" />

            {/* Corner decorations */}
            <circle cx="5" cy="5" r="3" fill={colors.purple} opacity="0.3" />
            <circle cx="55" cy="5" r="3" fill={colors.turquoise} opacity="0.3" />
            <circle cx="5" cy="55" r="3" fill={colors.turquoise} opacity="0.3" />
            <circle cx="55" cy="55" r="3" fill={colors.purple} opacity="0.3" />

            {/* Cross pattern */}
            <path d="M15 30 L20 30 M17.5 27.5 L17.5 32.5" stroke={colors.marigold} strokeWidth="1" opacity="0.3" />
            <path d="M40 30 L45 30 M42.5 27.5 L42.5 32.5" stroke={colors.hotPink} strokeWidth="1" opacity="0.3" />
          </pattern>
        </defs>
        <rect width="200%" height="200%" fill="url(#muertos-pattern)" />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="px-6 py-3 rounded-lg"
          style={{
            background: `${colors.black}e0`,
            border: `2px solid ${colors.marigold}`,
            boxShadow: `0 0 30px ${colors.marigold}40`,
          }}
        >
          <p className="text-lg font-serif" style={{ color: colors.marigold }}>
            Tradicion Eterna
          </p>
        </div>
      </div>

      {/* Corner marigolds */}
      {[
        { top: '10px', left: '10px' },
        { top: '10px', right: '10px' },
        { bottom: '10px', left: '10px' },
        { bottom: '10px', right: '10px' },
      ].map((pos, i) => (
        <div
          key={i}
          className="absolute w-8 h-8"
          style={pos}
        >
          <svg width="32" height="32" viewBox="0 0 32 32">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, j) => (
              <ellipse
                key={j}
                cx={16 + Math.cos(angle * Math.PI / 180) * 8}
                cy={16 + Math.sin(angle * Math.PI / 180) * 8}
                rx="5"
                ry="3"
                fill={colors.marigold}
                transform={`rotate(${angle}, ${16 + Math.cos(angle * Math.PI / 180) * 8}, ${16 + Math.sin(angle * Math.PI / 180) * 8})`}
              />
            ))}
            <circle cx="16" cy="16" r="4" fill={colors.hotPink} />
          </svg>
        </div>
      ))}
    </div>
  );
};

// Export all components
export const diaDeLosmuertosComponents: Record<string, React.FC> = {
  'muertos-calavera-button': MuertosCalaveraButton,
  'muertos-ofrenda-card': MuertosOfrendaCard,
  'muertos-marigold-input': MuertosMarigoldInput,
  'muertos-skull-badge': MuertosSkullBadge,
  'muertos-candle-toggle': MuertosCandleToggle,
  'muertos-petal-progress': MuertosPetalProgress,
  'muertos-skeleton-loader': MuertosSkeletonLoader,
  'muertos-frame-avatar': MuertosFrameAvatar,
  'muertos-papel-modal': MuertosPapelModal,
  'muertos-bone-nav': MuertosBoneNav,
  'muertos-flower-divider': MuertosFlowerDivider,
  'muertos-spirit-alert': MuertosSpiritAlert,
  'muertos-heart-icon': MuertosHeartIcon,
  'muertos-decorative-heading': MuertosDecorativeHeading,
  'muertos-guitar-slider': MuertosGuitarSlider,
  'muertos-banner-tabs': MuertosBannerTabs,
  'muertos-pattern-background': MuertosPatternBackground,
};
