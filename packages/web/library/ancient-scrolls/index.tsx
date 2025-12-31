import React, { useState, useEffect, useRef } from 'react';

// Color palette
// papyrus: #e8d4a8
// terracotta: #c45a3b
// gold: #c9a227
// stone gray: #8b8680
// deep brown: #3d2914

// --- ANCIENT CARTOUCHE BUTTON ---
export const AncientCartoucheButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-8" style={{ background: 'linear-gradient(180deg, #3d2914 0%, #2a1a0a 100%)' }}>
      <button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { setIsHovered(false); setIsPressed(false); }}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        className="relative group"
        style={{ transform: isPressed ? 'scale(0.98)' : 'scale(1)', transition: 'transform 0.1s' }}
      >
        {/* Cartouche SVG frame */}
        <svg viewBox="0 0 200 70" className="w-56 h-20">
          <defs>
            <linearGradient id="cartoucheGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c9a227" />
              <stop offset="50%" stopColor="#f0d060" />
              <stop offset="100%" stopColor="#c9a227" />
            </linearGradient>
            <filter id="cartoucheShadow">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Cartouche outer shape - rounded rectangle with rope border */}
          <rect
            x="10"
            y="10"
            width="180"
            height="50"
            rx="25"
            ry="25"
            fill={isHovered ? '#e8d4a8' : '#d4c49a'}
            stroke="url(#cartoucheGold)"
            strokeWidth="4"
            filter="url(#cartoucheShadow)"
            className="transition-all duration-300"
          />

          {/* Rope binding details at ends */}
          <ellipse cx="25" cy="35" rx="8" ry="18" fill="none" stroke="#c9a227" strokeWidth="2" />
          <ellipse cx="175" cy="35" rx="8" ry="18" fill="none" stroke="#c9a227" strokeWidth="2" />

          {/* Hieroglyphic decorations */}
          <text x="45" y="40" fill="#3d2914" fontSize="16" fontFamily="serif" opacity={isHovered ? 1 : 0.7}>
            &#x1330E;
          </text>

          {/* Button text */}
          <text
            x="100"
            y="42"
            textAnchor="middle"
            fill={isHovered ? '#c45a3b' : '#3d2914'}
            fontSize="14"
            fontFamily="serif"
            fontWeight="bold"
            letterSpacing="3"
            className="transition-all duration-300"
          >
            INVOKE
          </text>

          <text x="155" y="40" fill="#3d2914" fontSize="16" fontFamily="serif" opacity={isHovered ? 1 : 0.7}>
            &#x1330F;
          </text>
        </svg>

        {/* Glow effect on hover */}
        {isHovered && (
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(201, 162, 39, 0.3) 0%, transparent 70%)',
              animation: 'cartoucheGlow 1.5s ease-in-out infinite',
            }}
          />
        )}
      </button>

      <style>{`
        @keyframes cartoucheGlow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

// --- ANCIENT PAPYRUS CARD ---
export const AncientPapyrusCard = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-8" style={{ background: '#3d2914' }}>
      <div
        className="relative w-72 transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        }}
      >
        {/* Torn papyrus edges SVG */}
        <svg viewBox="0 0 300 200" className="w-full h-auto">
          <defs>
            <filter id="papyrusTexture">
              <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="noise" />
              <feDiffuseLighting in="noise" lightingColor="#e8d4a8" surfaceScale="2" result="lit">
                <feDistantLight azimuth="45" elevation="60" />
              </feDiffuseLighting>
              <feBlend in="SourceGraphic" in2="lit" mode="multiply" />
            </filter>
            <linearGradient id="papyrusGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e8d4a8" />
              <stop offset="50%" stopColor="#d8c498" />
              <stop offset="100%" stopColor="#e8d4a8" />
            </linearGradient>
          </defs>

          {/* Torn paper shape */}
          <path
            d="M15 8 Q20 5 25 10 L30 6 Q35 12 40 8 L50 5 Q60 10 70 7 L100 10 Q130 5 160 8 L200 6 Q240 10 270 7 L280 10 Q285 8 290 12
               L292 30 Q288 50 293 80 L290 120 Q293 150 288 170 L292 185
               Q287 190 280 187 L260 192 Q230 188 200 193 L160 190 Q120 195 80 188 L40 193 Q25 188 15 192 L10 188
               Q8 160 12 130 L8 90 Q12 50 8 25 L15 8 Z"
            fill="url(#papyrusGrad)"
            stroke="#c9a227"
            strokeWidth="0.5"
            style={{
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
            }}
          />

          {/* Aging spots */}
          <circle cx="50" cy="40" r="8" fill="#c9a227" opacity="0.1" />
          <circle cx="240" cy="150" r="12" fill="#8b8680" opacity="0.1" />
          <circle cx="180" cy="60" r="6" fill="#c45a3b" opacity="0.08" />

          {/* Content area */}
          <g transform="translate(30, 30)">
            {/* Eye of Horus icon */}
            <text x="105" y="25" textAnchor="middle" fill="#c9a227" fontSize="28">
              &#x13080;
            </text>

            {/* Title */}
            <text x="105" y="60" textAnchor="middle" fill="#3d2914" fontSize="14" fontFamily="serif" fontWeight="bold" letterSpacing="2">
              SACRED TEXT
            </text>

            {/* Divider with hieroglyphs */}
            <line x1="30" y1="75" x2="180" y2="75" stroke="#c9a227" strokeWidth="1" />
            <text x="105" y="80" textAnchor="middle" fill="#c9a227" fontSize="10">
              &#x131BC; &#x13171; &#x131BC;
            </text>

            {/* Content text lines */}
            <rect x="20" y="95" width="170" height="8" rx="2" fill="#3d2914" opacity="0.3" />
            <rect x="20" y="110" width="140" height="8" rx="2" fill="#3d2914" opacity="0.25" />
            <rect x="20" y="125" width="160" height="8" rx="2" fill="#3d2914" opacity="0.2" />
          </g>
        </svg>

        {/* Hover glow */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(201, 162, 39, 0.15) 0%, transparent 60%)',
            }}
          />
        )}
      </div>
    </div>
  );
};

// --- ANCIENT HIEROGLYPH INPUT ---
export const AncientHieroglyphInput = () => {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const hieroglyphs = ['&#x13000;', '&#x13001;', '&#x13002;', '&#x13003;', '&#x13004;'];

  return (
    <div className="h-full flex flex-col items-center justify-center p-8" style={{ background: 'linear-gradient(180deg, #3d2914 0%, #2a1a0a 100%)' }}>
      <div className="relative w-80">
        {/* Top hieroglyph decoration */}
        <div className="flex justify-center gap-4 mb-2">
          {hieroglyphs.map((_, i) => (
            <span
              key={i}
              className="text-lg transition-all duration-300"
              style={{
                color: isFocused ? '#c9a227' : '#8b8680',
                transform: isFocused ? 'translateY(-2px)' : 'translateY(0)',
                transitionDelay: `${i * 50}ms`,
              }}
            >
              {String.fromCodePoint(0x13000 + i)}
            </span>
          ))}
        </div>

        {/* Input container styled as stone tablet */}
        <div
          className="relative p-1 rounded-lg transition-all duration-300"
          style={{
            background: isFocused
              ? 'linear-gradient(135deg, #c9a227, #8b8680, #c9a227)'
              : 'linear-gradient(135deg, #8b8680, #6b6660, #8b8680)',
          }}
        >
          <div
            className="relative rounded-md overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, #8b8680 0%, #6b6660 50%, #5b5650 100%)',
            }}
          >
            {/* Carved effect */}
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Inscribe thy message..."
              className="w-full px-4 py-3 bg-transparent outline-none font-serif text-base"
              style={{
                color: '#e8d4a8',
                textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                letterSpacing: '1px',
              }}
            />

            {/* Chisel marks texture overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-30"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  90deg,
                  transparent 0px,
                  transparent 3px,
                  rgba(0,0,0,0.1) 3px,
                  rgba(0,0,0,0.1) 4px
                )`,
              }}
            />
          </div>
        </div>

        {/* Bottom hieroglyph decoration */}
        <div className="flex justify-center gap-4 mt-2">
          {hieroglyphs.map((_, i) => (
            <span
              key={i}
              className="text-lg transition-all duration-300"
              style={{
                color: isFocused ? '#c9a227' : '#8b8680',
                transform: isFocused ? 'translateY(2px)' : 'translateY(0)',
                transitionDelay: `${i * 50}ms`,
              }}
            >
              {String.fromCodePoint(0x13005 + i)}
            </span>
          ))}
        </div>

        {/* Character count */}
        <div className="text-center mt-3">
          <span className="font-serif text-xs" style={{ color: '#8b8680' }}>
            {value.length} symbols inscribed
          </span>
        </div>
      </div>
    </div>
  );
};

// --- ANCIENT SCARAB BADGE ---
export const AncientScarabBadge = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-8" style={{ background: '#3d2914' }}>
      <div className="flex gap-6">
        {/* Active scarab badge */}
        <div
          className="relative cursor-pointer transition-transform duration-300"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ transform: isHovered ? 'scale(1.1) rotate(-5deg)' : 'scale(1)' }}
        >
          <svg viewBox="0 0 80 100" className="w-20 h-24">
            <defs>
              <radialGradient id="scarabShine" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#f0d060" />
                <stop offset="50%" stopColor="#c9a227" />
                <stop offset="100%" stopColor="#8b6914" />
              </radialGradient>
              <filter id="scarabGlow">
                <feGaussianBlur stdDeviation="2" result="glow" />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Scarab body */}
            <ellipse
              cx="40"
              cy="55"
              rx="28"
              ry="35"
              fill="url(#scarabShine)"
              filter={isHovered ? 'url(#scarabGlow)' : 'none'}
            />

            {/* Wing cases */}
            <path
              d="M15 50 Q25 30 40 25 Q55 30 65 50 Q55 55 40 50 Q25 55 15 50"
              fill="#3d2914"
              opacity="0.4"
            />

            {/* Head */}
            <circle cx="40" cy="20" r="12" fill="url(#scarabShine)" />

            {/* Antennae */}
            <path d="M32 12 Q28 5 25 8" stroke="#8b6914" strokeWidth="2" fill="none" />
            <path d="M48 12 Q52 5 55 8" stroke="#8b6914" strokeWidth="2" fill="none" />

            {/* Legs */}
            <path d="M15 45 Q5 40 8 50" stroke="#8b6914" strokeWidth="3" fill="none" />
            <path d="M65 45 Q75 40 72 50" stroke="#8b6914" strokeWidth="3" fill="none" />
            <path d="M12 60 Q2 65 8 72" stroke="#8b6914" strokeWidth="3" fill="none" />
            <path d="M68 60 Q78 65 72 72" stroke="#8b6914" strokeWidth="3" fill="none" />

            {/* Sun disc being pushed */}
            <circle
              cx="40"
              cy="95"
              r="8"
              fill="#c45a3b"
              style={{
                animation: isHovered ? 'sunGlow 1s ease-in-out infinite' : 'none',
              }}
            />
          </svg>

          {/* Badge label */}
          <div
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-serif whitespace-nowrap"
            style={{
              background: '#c45a3b',
              color: '#e8d4a8',
              boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            Sacred
          </div>
        </div>

        {/* Info text */}
        <div className="flex flex-col justify-center">
          <span className="font-serif text-sm" style={{ color: '#c9a227' }}>
            Symbol of Rebirth
          </span>
          <span className="font-serif text-xs mt-1" style={{ color: '#8b8680' }}>
            Khepri's blessing
          </span>
        </div>
      </div>

      <style>{`
        @keyframes sunGlow {
          0%, 100% { filter: drop-shadow(0 0 4px #c45a3b); }
          50% { filter: drop-shadow(0 0 12px #ff6b4a); }
        }
      `}</style>
    </div>
  );
};

// --- ANCIENT SUNDIAL TOGGLE ---
export const AncientSundialToggle = () => {
  const [isOn, setIsOn] = useState(false);
  const [shadowAngle, setShadowAngle] = useState(isOn ? 180 : 0);

  useEffect(() => {
    if (isOn) {
      const animate = () => {
        setShadowAngle(prev => {
          if (prev < 180) return prev + 10;
          return 180;
        });
      };
      const interval = setInterval(animate, 30);
      return () => clearInterval(interval);
    } else {
      const animate = () => {
        setShadowAngle(prev => {
          if (prev > 0) return prev - 10;
          return 0;
        });
      };
      const interval = setInterval(animate, 30);
      return () => clearInterval(interval);
    }
  }, [isOn]);

  return (
    <div className="h-full flex flex-col items-center justify-center p-8" style={{ background: '#3d2914' }}>
      <div
        className="relative cursor-pointer"
        onClick={() => setIsOn(!isOn)}
      >
        <svg viewBox="0 0 150 150" className="w-40 h-40">
          <defs>
            <linearGradient id="stoneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a09890" />
              <stop offset="50%" stopColor="#8b8680" />
              <stop offset="100%" stopColor="#6b6660" />
            </linearGradient>
            <radialGradient id="sunGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f0d060" />
              <stop offset="100%" stopColor="#c9a227" />
            </radialGradient>
          </defs>

          {/* Stone base */}
          <circle cx="75" cy="75" r="70" fill="url(#stoneGrad)" />
          <circle cx="75" cy="75" r="65" fill="none" stroke="#c9a227" strokeWidth="2" />

          {/* Hour markers */}
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30 - 90) * (Math.PI / 180);
            const x1 = 75 + 50 * Math.cos(angle);
            const y1 = 75 + 50 * Math.sin(angle);
            const x2 = 75 + 60 * Math.cos(angle);
            const y2 = 75 + 60 * Math.sin(angle);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#3d2914"
                strokeWidth={i % 3 === 0 ? 3 : 1}
              />
            );
          })}

          {/* Roman numerals */}
          {['XII', 'III', 'VI', 'IX'].map((num, i) => {
            const positions = [
              { x: 75, y: 28 },
              { x: 122, y: 80 },
              { x: 75, y: 132 },
              { x: 28, y: 80 },
            ];
            return (
              <text
                key={i}
                x={positions[i].x}
                y={positions[i].y}
                textAnchor="middle"
                fill="#3d2914"
                fontSize="12"
                fontFamily="serif"
              >
                {num}
              </text>
            );
          })}

          {/* Gnomon (shadow caster) */}
          <polygon
            points="75,75 73,35 77,35"
            fill="#3d2914"
          />

          {/* Shadow */}
          <line
            x1="75"
            y1="75"
            x2={75 + 45 * Math.cos((shadowAngle - 90) * Math.PI / 180)}
            y2={75 + 45 * Math.sin((shadowAngle - 90) * Math.PI / 180)}
            stroke="rgba(0,0,0,0.4)"
            strokeWidth="6"
            strokeLinecap="round"
            className="transition-all duration-300"
          />

          {/* Center sun disc */}
          <circle
            cx="75"
            cy="75"
            r="10"
            fill={isOn ? 'url(#sunGrad)' : '#8b8680'}
            className="transition-all duration-500"
          />
        </svg>
      </div>

      {/* Status */}
      <div className="mt-4 text-center">
        <span className="font-serif text-sm" style={{ color: isOn ? '#c9a227' : '#8b8680' }}>
          {isOn ? 'Sol Invictus' : 'Nox Aeterna'}
        </span>
        <div className="text-xs mt-1" style={{ color: '#8b8680' }}>
          {isOn ? 'Day mode active' : 'Night mode active'}
        </div>
      </div>
    </div>
  );
};

// --- ANCIENT HOURGLASS PROGRESS ---
export const AncientHourglassProgress = () => {
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          setIsRunning(false);
          return 100;
        }
        return p + 1;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [isRunning]);

  const sandTop = 100 - progress;
  const sandBottom = progress;

  return (
    <div className="h-full flex flex-col items-center justify-center p-8" style={{ background: '#3d2914' }}>
      <div
        className="relative cursor-pointer"
        onClick={() => {
          if (progress >= 100) {
            setProgress(0);
          } else {
            setIsRunning(!isRunning);
          }
        }}
      >
        <svg viewBox="0 0 100 180" className="w-28 h-48">
          <defs>
            <linearGradient id="hourglassFrame" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#c9a227" />
              <stop offset="50%" stopColor="#f0d060" />
              <stop offset="100%" stopColor="#c9a227" />
            </linearGradient>
            <clipPath id="topBulb">
              <path d="M20 30 Q20 55 50 85 Q80 55 80 30 Q80 20 50 20 Q20 20 20 30" />
            </clipPath>
            <clipPath id="bottomBulb">
              <path d="M20 150 Q20 125 50 95 Q80 125 80 150 Q80 160 50 160 Q20 160 20 150" />
            </clipPath>
          </defs>

          {/* Top ornamental cap */}
          <rect x="15" y="5" width="70" height="12" rx="3" fill="url(#hourglassFrame)" />
          <path d="M25 5 L30 0 L70 0 L75 5" fill="#c9a227" />

          {/* Glass frame */}
          <path
            d="M20 20 Q15 20 15 30 Q15 60 50 90 Q85 60 85 30 Q85 20 80 20"
            fill="none"
            stroke="#c9a227"
            strokeWidth="3"
          />
          <path
            d="M20 160 Q15 160 15 150 Q15 120 50 90 Q85 120 85 150 Q85 160 80 160"
            fill="none"
            stroke="#c9a227"
            strokeWidth="3"
          />

          {/* Vertical supports */}
          <rect x="12" y="17" width="4" height="146" rx="2" fill="url(#hourglassFrame)" />
          <rect x="84" y="17" width="4" height="146" rx="2" fill="url(#hourglassFrame)" />

          {/* Sand in top bulb */}
          <g clipPath="url(#topBulb)">
            <rect
              x="15"
              y={20 + (70 * (1 - sandTop / 100))}
              width="70"
              height={70 * (sandTop / 100)}
              fill="#e8d4a8"
            />
          </g>

          {/* Falling sand stream */}
          {isRunning && sandTop > 0 && (
            <>
              <line
                x1="50"
                y1="85"
                x2="50"
                y2="95"
                stroke="#e8d4a8"
                strokeWidth="3"
                style={{ animation: 'sandFall 0.15s linear infinite' }}
              />
              {/* Sand particles */}
              {[...Array(3)].map((_, i) => (
                <circle
                  key={i}
                  cx={48 + Math.random() * 4}
                  cy={88 + i * 3}
                  r="1"
                  fill="#e8d4a8"
                  style={{ animation: `sandParticle 0.3s linear ${i * 0.1}s infinite` }}
                />
              ))}
            </>
          )}

          {/* Sand in bottom bulb */}
          <g clipPath="url(#bottomBulb)">
            <rect
              x="15"
              y={160 - (70 * (sandBottom / 100))}
              width="70"
              height={70 * (sandBottom / 100)}
              fill="#e8d4a8"
            />
            {/* Sand pile peak */}
            {sandBottom > 10 && (
              <path
                d={`M35 ${160 - (70 * (sandBottom / 100))} Q50 ${155 - (70 * (sandBottom / 100))} 65 ${160 - (70 * (sandBottom / 100))}`}
                fill="#d8c498"
              />
            )}
          </g>

          {/* Bottom ornamental cap */}
          <rect x="15" y="163" width="70" height="12" rx="3" fill="url(#hourglassFrame)" />
          <path d="M25 175 L30 180 L70 180 L75 175" fill="#c9a227" />

          {/* Hieroglyph decorations on frame */}
          <text x="10" y="95" fill="#c9a227" fontSize="8">&#x13080;</text>
          <text x="85" y="95" fill="#c9a227" fontSize="8">&#x13080;</text>
        </svg>
      </div>

      {/* Progress indicator */}
      <div className="mt-4 text-center">
        <span className="font-serif text-lg" style={{ color: '#c9a227' }}>
          {progress}%
        </span>
        <div className="text-xs mt-1" style={{ color: '#8b8680' }}>
          {progress >= 100 ? 'Time elapsed - click to reset' : isRunning ? 'Sands flowing...' : 'Click to start'}
        </div>
      </div>

      <style>{`
        @keyframes sandFall {
          0% { opacity: 1; }
          50% { opacity: 0.6; }
          100% { opacity: 1; }
        }
        @keyframes sandParticle {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(10px); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

// --- ANCIENT TORCH LOADER ---
export const AncientTorchLoader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="h-full flex flex-col items-center justify-center p-8" style={{ background: 'linear-gradient(180deg, #1a0f08 0%, #3d2914 100%)' }}>
      <div className="flex gap-8">
        {[0, 1].map((torch) => (
          <div key={torch} className="relative">
            <svg viewBox="0 0 60 140" className="w-16 h-36">
              <defs>
                <linearGradient id={`torchWood${torch}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#5a3d20" />
                  <stop offset="50%" stopColor="#8b5a30" />
                  <stop offset="100%" stopColor="#5a3d20" />
                </linearGradient>
                <radialGradient id={`flameGlow${torch}`} cx="50%" cy="80%" r="60%">
                  <stop offset="0%" stopColor="#ff6b35" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#ff6b35" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Torch handle */}
              <rect x="22" y="60" width="16" height="80" rx="3" fill={`url(#torchWood${torch})`} />
              <rect x="18" y="55" width="24" height="10" rx="2" fill="#c9a227" />

              {/* Flame container */}
              <ellipse cx="30" cy="50" rx="18" ry="10" fill="#3d2914" />

              {/* Animated flame */}
              {isLoading && (
                <g style={{ animation: `flicker${torch} 0.15s ease-in-out infinite alternate` }}>
                  {/* Outer flame */}
                  <path
                    d="M30 55 Q15 35 20 20 Q25 5 30 0 Q35 5 40 20 Q45 35 30 55"
                    fill="#c45a3b"
                    style={{
                      animation: `flame${torch}Outer 0.3s ease-in-out infinite alternate`,
                      animationDelay: `${torch * 0.1}s`,
                    }}
                  />
                  {/* Middle flame */}
                  <path
                    d="M30 50 Q20 35 24 22 Q27 10 30 5 Q33 10 36 22 Q40 35 30 50"
                    fill="#ff6b35"
                    style={{
                      animation: `flame${torch}Middle 0.2s ease-in-out infinite alternate`,
                      animationDelay: `${torch * 0.15}s`,
                    }}
                  />
                  {/* Inner flame */}
                  <path
                    d="M30 45 Q24 35 26 25 Q28 15 30 12 Q32 15 34 25 Q36 35 30 45"
                    fill="#ffd93d"
                    style={{
                      animation: `flame${torch}Inner 0.15s ease-in-out infinite alternate`,
                      animationDelay: `${torch * 0.2}s`,
                    }}
                  />

                  {/* Sparks */}
                  {[...Array(3)].map((_, i) => (
                    <circle
                      key={i}
                      cx={25 + i * 5}
                      cy={10 - i * 3}
                      r="1.5"
                      fill="#ffd93d"
                      style={{
                        animation: `spark 0.8s ease-out ${i * 0.2}s infinite`,
                      }}
                    />
                  ))}
                </g>
              )}

              {/* Glow effect */}
              <ellipse cx="30" cy="30" rx="25" ry="30" fill={`url(#flameGlow${torch})`} opacity="0.5" />
            </svg>
          </div>
        ))}
      </div>

      {/* Loading text */}
      <div className="mt-6 text-center">
        <span
          className="font-serif text-lg tracking-widest"
          style={{
            color: '#c9a227',
            animation: 'textGlow 1s ease-in-out infinite alternate',
          }}
        >
          ILLUMINATING
        </span>
        <div className="flex justify-center gap-1 mt-2">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-2 h-2 rounded-full"
              style={{
                background: '#c45a3b',
                animation: `dotPulse 1s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes flicker0 {
          0% { transform: scaleX(0.95) scaleY(0.98); }
          100% { transform: scaleX(1.05) scaleY(1.02); }
        }
        @keyframes flicker1 {
          0% { transform: scaleX(1.02) scaleY(0.96); }
          100% { transform: scaleX(0.98) scaleY(1.04); }
        }
        @keyframes flame0Outer {
          0% { d: path("M30 55 Q15 35 20 20 Q25 5 30 0 Q35 5 40 20 Q45 35 30 55"); }
          100% { d: path("M30 55 Q12 38 18 18 Q24 3 30 -2 Q36 3 42 18 Q48 38 30 55"); }
        }
        @keyframes flame1Outer {
          0% { d: path("M30 55 Q15 35 20 20 Q25 5 30 0 Q35 5 40 20 Q45 35 30 55"); }
          100% { d: path("M30 55 Q18 32 22 22 Q26 7 30 2 Q34 7 38 22 Q42 32 30 55"); }
        }
        @keyframes flame0Middle {
          0% { transform: translateX(-1px); }
          100% { transform: translateX(1px); }
        }
        @keyframes flame1Middle {
          0% { transform: translateX(1px); }
          100% { transform: translateX(-1px); }
        }
        @keyframes flame0Inner {
          0% { transform: scale(0.9); }
          100% { transform: scale(1.1); }
        }
        @keyframes flame1Inner {
          0% { transform: scale(1.1); }
          100% { transform: scale(0.9); }
        }
        @keyframes spark {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-20px) scale(0); opacity: 0; }
        }
        @keyframes textGlow {
          0% { text-shadow: 0 0 5px #c9a227; }
          100% { text-shadow: 0 0 20px #c9a227, 0 0 30px #c45a3b; }
        }
        @keyframes dotPulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
};

// --- ANCIENT COIN AVATAR ---
export const AncientCoinAvatar = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="h-full flex flex-col items-center justify-center p-8" style={{ background: '#3d2914' }}>
      <div
        className="relative cursor-pointer perspective-1000"
        onClick={() => setIsFlipped(!isFlipped)}
        style={{ perspective: '1000px' }}
      >
        <div
          className="relative w-28 h-28 transition-transform duration-700"
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* Front of coin */}
          <div
            className="absolute inset-0 rounded-full flex items-center justify-center"
            style={{
              backfaceVisibility: 'hidden',
              background: 'radial-gradient(circle at 30% 30%, #f0d060, #c9a227, #8b6914)',
              boxShadow: '0 4px 15px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.3)',
            }}
          >
            {/* Coin rim */}
            <div
              className="absolute inset-1 rounded-full"
              style={{
                border: '3px solid #8b6914',
              }}
            />

            {/* Profile silhouette */}
            <svg viewBox="0 0 60 60" className="w-16 h-16">
              <path
                d="M30 8 Q42 12 40 25 Q42 32 38 38 Q35 42 30 45 Q25 42 22 38 Q18 32 20 25 Q18 12 30 8"
                fill="#8b6914"
                opacity="0.8"
              />
              {/* Crown/headdress */}
              <path
                d="M22 18 L30 10 L38 18 L35 20 L30 15 L25 20 Z"
                fill="#8b6914"
                opacity="0.6"
              />
            </svg>

            {/* Text around rim */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ transform: 'rotate(-30deg)' }}
            >
              <span className="absolute top-1 text-xs font-serif" style={{ color: '#5a4020' }}>
                PHARAOH
              </span>
            </div>
          </div>

          {/* Back of coin */}
          <div
            className="absolute inset-0 rounded-full flex items-center justify-center"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              background: 'radial-gradient(circle at 70% 70%, #f0d060, #c9a227, #8b6914)',
              boxShadow: '0 4px 15px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.3)',
            }}
          >
            {/* Coin rim */}
            <div
              className="absolute inset-1 rounded-full"
              style={{
                border: '3px solid #8b6914',
              }}
            />

            {/* Pyramid design */}
            <svg viewBox="0 0 60 60" className="w-14 h-14">
              <polygon
                points="30,10 50,45 10,45"
                fill="none"
                stroke="#8b6914"
                strokeWidth="2"
              />
              <line x1="30" y1="10" x2="30" y2="45" stroke="#8b6914" strokeWidth="1" opacity="0.5" />
              {/* Sun disc */}
              <circle cx="30" cy="6" r="4" fill="#c45a3b" />
            </svg>
          </div>
        </div>
      </div>

      {/* Label */}
      <div className="mt-6 text-center">
        <span className="font-serif text-sm" style={{ color: '#c9a227' }}>
          {isFlipped ? 'Royal Treasury' : 'Ramesses II'}
        </span>
        <div className="text-xs mt-1" style={{ color: '#8b8680' }}>
          Click to flip
        </div>
      </div>
    </div>
  );
};

// --- ANCIENT SCROLL MODAL ---
export const AncientScrollModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [unrollProgress, setUnrollProgress] = useState(0);

  useEffect(() => {
    if (isOpen) {
      const animate = () => {
        setUnrollProgress(prev => {
          if (prev < 100) return prev + 5;
          return 100;
        });
      };
      const interval = setInterval(animate, 20);
      return () => clearInterval(interval);
    } else {
      const animate = () => {
        setUnrollProgress(prev => {
          if (prev > 0) return prev - 8;
          return 0;
        });
      };
      const interval = setInterval(animate, 20);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  return (
    <div className="h-full flex flex-col items-center justify-center p-8" style={{ background: '#3d2914' }}>
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 rounded font-serif text-sm tracking-wider transition-all duration-300 hover:scale-105"
        style={{
          background: 'linear-gradient(180deg, #c9a227 0%, #8b6914 100%)',
          color: '#3d2914',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        }}
      >
        UNROLL SCROLL
      </button>

      {/* Modal overlay */}
      {(isOpen || unrollProgress > 0) && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{
            background: `rgba(0,0,0,${0.7 * (unrollProgress / 100)})`,
            pointerEvents: unrollProgress > 50 ? 'auto' : 'none',
          }}
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative"
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '320px',
              transform: `scaleY(${unrollProgress / 100})`,
              transformOrigin: 'top center',
            }}
          >
            {/* Top scroll roll */}
            <div
              className="relative h-8 rounded-full z-10"
              style={{
                background: 'linear-gradient(180deg, #8b6914 0%, #5a4a20 50%, #8b6914 100%)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
              }}
            >
              {/* Roll end caps */}
              <div
                className="absolute -left-2 top-0 w-4 h-8 rounded-full"
                style={{ background: 'linear-gradient(90deg, #5a4a20, #8b6914)' }}
              />
              <div
                className="absolute -right-2 top-0 w-4 h-8 rounded-full"
                style={{ background: 'linear-gradient(90deg, #8b6914, #5a4a20)' }}
              />
            </div>

            {/* Papyrus content */}
            <div
              className="relative -mt-2 px-6 py-8"
              style={{
                background: 'linear-gradient(180deg, #d8c498 0%, #e8d4a8 10%, #e8d4a8 90%, #d8c498 100%)',
                borderLeft: '4px solid #8b6914',
                borderRight: '4px solid #8b6914',
                minHeight: '200px',
                opacity: unrollProgress / 100,
              }}
            >
              {/* Header decoration */}
              <div className="flex justify-center gap-2 mb-4">
                <span style={{ color: '#c9a227' }}>&#x13080;</span>
                <span className="font-serif text-lg tracking-widest" style={{ color: '#3d2914' }}>
                  DECREE
                </span>
                <span style={{ color: '#c9a227' }}>&#x13080;</span>
              </div>

              {/* Content */}
              <p className="font-serif text-sm leading-relaxed text-center" style={{ color: '#3d2914' }}>
                By order of the Pharaoh, let it be known throughout the kingdom that these sacred texts contain the wisdom of the ancients.
              </p>

              {/* Hieroglyph footer */}
              <div className="flex justify-center gap-1 mt-6">
                {[0x13000, 0x13001, 0x13002, 0x13003, 0x13004].map((code) => (
                  <span key={code} style={{ color: '#8b8680', fontSize: '14px' }}>
                    {String.fromCodePoint(code)}
                  </span>
                ))}
              </div>

              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center font-serif text-sm"
                style={{
                  background: '#c45a3b',
                  color: '#e8d4a8',
                }}
              >
                x
              </button>
            </div>

            {/* Bottom scroll roll */}
            <div
              className="relative h-6 rounded-full -mt-1 z-10"
              style={{
                background: 'linear-gradient(180deg, #5a4a20 0%, #8b6914 50%, #5a4a20 100%)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

// --- ANCIENT COLUMN NAV ---
export const AncientColumnNav = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navItems = [
    { label: 'Temple', icon: '&#x1F3DB;' },
    { label: 'Library', icon: '&#x1F4DC;' },
    { label: 'Treasury', icon: '&#x1FA99;' },
    { label: 'Gardens', icon: '&#x1F33F;' },
  ];

  return (
    <div className="h-full flex items-center justify-center p-8" style={{ background: 'linear-gradient(180deg, #2a1a0a 0%, #3d2914 100%)' }}>
      <div className="flex gap-2">
        {navItems.map((item, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className="relative group"
          >
            {/* Greek column */}
            <svg viewBox="0 0 50 120" className="w-14 h-32">
              <defs>
                <linearGradient id={`columnGrad${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={activeIndex === index ? '#c9a227' : '#8b8680'} />
                  <stop offset="30%" stopColor={activeIndex === index ? '#f0d060' : '#a09890'} />
                  <stop offset="70%" stopColor={activeIndex === index ? '#f0d060' : '#a09890'} />
                  <stop offset="100%" stopColor={activeIndex === index ? '#c9a227' : '#8b8680'} />
                </linearGradient>
              </defs>

              {/* Capital (top) */}
              <rect x="2" y="8" width="46" height="8" rx="1" fill={`url(#columnGrad${index})`} />
              <rect x="5" y="16" width="40" height="4" fill={`url(#columnGrad${index})`} />

              {/* Volutes */}
              <ellipse cx="8" cy="12" rx="4" ry="3" fill="none" stroke={activeIndex === index ? '#c9a227' : '#8b8680'} strokeWidth="1.5" />
              <ellipse cx="42" cy="12" rx="4" ry="3" fill="none" stroke={activeIndex === index ? '#c9a227' : '#8b8680'} strokeWidth="1.5" />

              {/* Shaft with fluting */}
              <rect x="8" y="20" width="34" height="80" fill={`url(#columnGrad${index})`} />
              {[...Array(5)].map((_, i) => (
                <line
                  key={i}
                  x1={14 + i * 6}
                  y1="22"
                  x2={14 + i * 6}
                  y2="98"
                  stroke={activeIndex === index ? '#8b6914' : '#6b6660'}
                  strokeWidth="1"
                  opacity="0.5"
                />
              ))}

              {/* Base */}
              <rect x="5" y="100" width="40" height="5" rx="1" fill={`url(#columnGrad${index})`} />
              <rect x="3" y="105" width="44" height="6" rx="1" fill={`url(#columnGrad${index})`} />
              <rect x="0" y="111" width="50" height="8" rx="2" fill={`url(#columnGrad${index})`} />
            </svg>

            {/* Icon on capital */}
            <span
              className="absolute top-0 left-1/2 -translate-x-1/2 text-lg"
              dangerouslySetInnerHTML={{ __html: item.icon }}
              style={{
                filter: activeIndex === index ? 'drop-shadow(0 0 4px #c9a227)' : 'none',
              }}
            />

            {/* Label */}
            <span
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-serif text-xs whitespace-nowrap transition-all duration-300"
              style={{
                color: activeIndex === index ? '#c9a227' : '#8b8680',
              }}
            >
              {item.label}
            </span>

            {/* Active indicator */}
            {activeIndex === index && (
              <div
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                style={{ background: '#c9a227', boxShadow: '0 0 8px #c9a227' }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

// --- ANCIENT MOSAIC DIVIDER ---
export const AncientMosaicDivider = () => {
  const colors = ['#c45a3b', '#c9a227', '#e8d4a8', '#8b8680', '#3d2914'];
  const [hoveredTile, setHoveredTile] = useState<number | null>(null);

  return (
    <div className="h-full flex flex-col items-center justify-center p-8" style={{ background: '#3d2914' }}>
      <div className="w-full max-w-md">
        {/* Top mosaic pattern */}
        <div className="flex justify-center mb-4">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="w-4 h-4 transition-all duration-300 cursor-pointer"
              style={{
                background: colors[(i + Math.floor(i / 5)) % colors.length],
                transform: hoveredTile === i ? 'scale(1.3) rotate(45deg)' : 'rotate(45deg)',
                margin: '0 2px',
                boxShadow: hoveredTile === i ? '0 0 10px rgba(201, 162, 39, 0.6)' : 'none',
              }}
              onMouseEnter={() => setHoveredTile(i)}
              onMouseLeave={() => setHoveredTile(null)}
            />
          ))}
        </div>

        {/* Main divider line with Greek key pattern */}
        <svg viewBox="0 0 400 30" className="w-full h-8">
          <defs>
            <pattern id="greekKey" patternUnits="userSpaceOnUse" width="20" height="20">
              <path
                d="M0 10 L5 10 L5 5 L15 5 L15 15 L10 15 L10 10 L0 10"
                fill="none"
                stroke="#c9a227"
                strokeWidth="2"
              />
            </pattern>
          </defs>

          {/* Left ornament */}
          <circle cx="20" cy="15" r="8" fill="#c9a227" />
          <circle cx="20" cy="15" r="4" fill="#3d2914" />

          {/* Greek key border */}
          <rect x="35" y="5" width="330" height="20" fill="url(#greekKey)" />

          {/* Right ornament */}
          <circle cx="380" cy="15" r="8" fill="#c9a227" />
          <circle cx="380" cy="15" r="4" fill="#3d2914" />
        </svg>

        {/* Bottom mosaic pattern */}
        <div className="flex justify-center mt-4">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="w-4 h-4 transition-all duration-300 cursor-pointer"
              style={{
                background: colors[(i + 2 + Math.floor(i / 5)) % colors.length],
                transform: hoveredTile === i + 15 ? 'scale(1.3) rotate(45deg)' : 'rotate(45deg)',
                margin: '0 2px',
                boxShadow: hoveredTile === i + 15 ? '0 0 10px rgba(201, 162, 39, 0.6)' : 'none',
              }}
              onMouseEnter={() => setHoveredTile(i + 15)}
              onMouseLeave={() => setHoveredTile(null)}
            />
          ))}
        </div>
      </div>

      {/* Label */}
      <div className="mt-6 text-center">
        <span className="font-serif text-xs tracking-widest" style={{ color: '#8b8680' }}>
          OPUS TESSELLATUM
        </span>
      </div>
    </div>
  );
};

// --- ANCIENT ORACLE ALERT ---
export const AncientOracleAlert = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [smokeOpacity, setSmokeOpacity] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setSmokeOpacity(prev => (prev + 0.1) % 1);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  if (!isVisible) {
    return (
      <div className="h-full flex items-center justify-center p-8" style={{ background: '#3d2914' }}>
        <button
          onClick={() => setIsVisible(true)}
          className="px-4 py-2 rounded font-serif text-sm"
          style={{
            background: '#c9a227',
            color: '#3d2914',
          }}
        >
          Consult Oracle
        </button>
      </div>
    );
  }

  return (
    <div className="h-full flex items-center justify-center p-8" style={{ background: '#3d2914' }}>
      <div className="relative w-80">
        {/* Smoke effect */}
        <div
          className="absolute -top-10 left-1/2 -translate-x-1/2 w-full h-20 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, rgba(139, 134, 128, ${0.3 + smokeOpacity * 0.2}) 0%, transparent 70%)`,
            animation: 'smokeRise 3s ease-in-out infinite',
          }}
        />

        {/* Tripod frame */}
        <svg viewBox="0 0 300 60" className="w-full h-16 absolute -top-8 left-0">
          <defs>
            <linearGradient id="bronzeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#cd7f32" />
              <stop offset="50%" stopColor="#b8860b" />
              <stop offset="100%" stopColor="#cd7f32" />
            </linearGradient>
          </defs>

          {/* Tripod legs */}
          <line x1="50" y1="10" x2="20" y2="55" stroke="url(#bronzeGrad)" strokeWidth="4" />
          <line x1="150" y1="10" x2="150" y2="55" stroke="url(#bronzeGrad)" strokeWidth="4" />
          <line x1="250" y1="10" x2="280" y2="55" stroke="url(#bronzeGrad)" strokeWidth="4" />

          {/* Bowl */}
          <ellipse cx="150" cy="15" rx="110" ry="12" fill="url(#bronzeGrad)" />
          <ellipse cx="150" cy="15" rx="100" ry="8" fill="#3d2914" />

          {/* Flame in bowl */}
          <ellipse cx="150" cy="12" rx="30" ry="5" fill="#c45a3b" opacity="0.7" />
        </svg>

        {/* Alert content */}
        <div
          className="relative rounded-lg overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, rgba(61, 41, 20, 0.95) 0%, rgba(42, 26, 10, 0.98) 100%)',
            border: '2px solid #c9a227',
            boxShadow: '0 0 30px rgba(201, 162, 39, 0.3), inset 0 0 20px rgba(0, 0, 0, 0.5)',
          }}
        >
          {/* Header */}
          <div
            className="px-4 py-3 border-b flex items-center justify-center gap-2"
            style={{ borderColor: '#c9a22750' }}
          >
            <span style={{ color: '#c9a227' }}>&#x2609;</span>
            <span className="font-serif text-sm tracking-widest" style={{ color: '#c9a227' }}>
              THE ORACLE SPEAKS
            </span>
            <span style={{ color: '#c9a227' }}>&#x2609;</span>
          </div>

          {/* Message */}
          <div className="p-4">
            <p
              className="font-serif text-sm text-center italic leading-relaxed"
              style={{ color: '#e8d4a8' }}
            >
              "Beware the Ides of March. Great fortune awaits those who heed the wisdom of the ancients."
            </p>

            {/* Mystical symbols */}
            <div className="flex justify-center gap-4 mt-4">
              {['&#x2648;', '&#x2649;', '&#x264A;', '&#x264B;'].map((symbol, i) => (
                <span
                  key={i}
                  className="text-lg"
                  style={{
                    color: '#c9a227',
                    animation: `symbolGlow 2s ease-in-out ${i * 0.3}s infinite`,
                  }}
                  dangerouslySetInnerHTML={{ __html: symbol }}
                />
              ))}
            </div>
          </div>

          {/* Footer actions */}
          <div className="px-4 py-3 flex justify-end gap-2 border-t" style={{ borderColor: '#c9a22750' }}>
            <button
              onClick={() => setIsVisible(false)}
              className="px-3 py-1 rounded font-serif text-xs"
              style={{
                background: '#c45a3b',
                color: '#e8d4a8',
              }}
            >
              Dismiss
            </button>
            <button
              className="px-3 py-1 rounded font-serif text-xs"
              style={{
                background: '#c9a227',
                color: '#3d2914',
              }}
            >
              Seek More
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes smokeRise {
          0%, 100% { transform: translateX(-50%) translateY(0) scale(1); opacity: 0.5; }
          50% { transform: translateX(-50%) translateY(-10px) scale(1.2); opacity: 0.3; }
        }
        @keyframes symbolGlow {
          0%, 100% { opacity: 0.5; filter: drop-shadow(0 0 2px #c9a227); }
          50% { opacity: 1; filter: drop-shadow(0 0 8px #c9a227); }
        }
      `}</style>
    </div>
  );
};

// --- ANCIENT AMPHORA ICON ---
export const AncientAmphoraIcon = () => {
  const [fillLevel, setFillLevel] = useState(70);

  return (
    <div className="h-full flex flex-col items-center justify-center p-8" style={{ background: '#3d2914' }}>
      <div className="flex gap-8 items-end">
        {/* Main amphora */}
        <div className="relative">
          <svg viewBox="0 0 80 140" className="w-24 h-36">
            <defs>
              <linearGradient id="amphoraBody" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8b4a2a" />
                <stop offset="30%" stopColor="#c45a3b" />
                <stop offset="70%" stopColor="#c45a3b" />
                <stop offset="100%" stopColor="#8b4a2a" />
              </linearGradient>
              <linearGradient id="amphoraShine" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="40%" stopColor="rgba(255,255,255,0.1)" />
                <stop offset="60%" stopColor="rgba(255,255,255,0.1)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
              <clipPath id="amphoraClip">
                <path d="M35 20 Q25 20 25 30 L25 35 Q15 45 12 70 Q10 100 20 120 Q25 130 40 135 Q55 130 60 120 Q70 100 68 70 Q65 45 55 35 L55 30 Q55 20 45 20 Z" />
              </clipPath>
            </defs>

            {/* Main body */}
            <path
              d="M35 20 Q25 20 25 30 L25 35 Q15 45 12 70 Q10 100 20 120 Q25 130 40 135 Q55 130 60 120 Q70 100 68 70 Q65 45 55 35 L55 30 Q55 20 45 20 Z"
              fill="url(#amphoraBody)"
            />

            {/* Fill level (wine/oil) */}
            <g clipPath="url(#amphoraClip)">
              <rect
                x="10"
                y={135 - (115 * fillLevel / 100)}
                width="60"
                height={115 * fillLevel / 100}
                fill="#5a1a1a"
                opacity="0.8"
              />
            </g>

            {/* Shine overlay */}
            <path
              d="M35 20 Q25 20 25 30 L25 35 Q15 45 12 70 Q10 100 20 120 Q25 130 40 135 Q55 130 60 120 Q70 100 68 70 Q65 45 55 35 L55 30 Q55 20 45 20 Z"
              fill="url(#amphoraShine)"
            />

            {/* Neck */}
            <rect x="33" y="10" width="14" height="12" fill="url(#amphoraBody)" />

            {/* Rim */}
            <ellipse cx="40" cy="10" rx="10" ry="4" fill="url(#amphoraBody)" />
            <ellipse cx="40" cy="10" rx="7" ry="2" fill="#3d2914" />

            {/* Handles */}
            <path
              d="M25 35 Q10 35 8 55 Q8 70 18 75"
              fill="none"
              stroke="url(#amphoraBody)"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M55 35 Q70 35 72 55 Q72 70 62 75"
              fill="none"
              stroke="url(#amphoraBody)"
              strokeWidth="6"
              strokeLinecap="round"
            />

            {/* Decorative bands */}
            <ellipse cx="40" cy="50" rx="22" ry="4" fill="none" stroke="#c9a227" strokeWidth="1" />
            <ellipse cx="40" cy="90" rx="25" ry="5" fill="none" stroke="#c9a227" strokeWidth="1" />

            {/* Greek pattern on body */}
            <text x="28" y="72" fill="#c9a227" fontSize="10" fontFamily="serif">
              &#x03A9;
            </text>
          </svg>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-2">
          <button
            onClick={() => setFillLevel(Math.min(100, fillLevel + 10))}
            className="w-8 h-8 rounded-full flex items-center justify-center font-serif"
            style={{
              background: '#c9a227',
              color: '#3d2914',
            }}
          >
            +
          </button>
          <span className="font-serif text-sm text-center" style={{ color: '#e8d4a8' }}>
            {fillLevel}%
          </span>
          <button
            onClick={() => setFillLevel(Math.max(0, fillLevel - 10))}
            className="w-8 h-8 rounded-full flex items-center justify-center font-serif"
            style={{
              background: '#c45a3b',
              color: '#e8d4a8',
            }}
          >
            -
          </button>
        </div>
      </div>

      {/* Label */}
      <div className="mt-4 text-center">
        <span className="font-serif text-sm" style={{ color: '#c9a227' }}>
          Amphora of Dionysus
        </span>
        <div className="text-xs mt-1" style={{ color: '#8b8680' }}>
          Click to adjust contents
        </div>
      </div>
    </div>
  );
};

// --- ANCIENT CHISELED HEADING ---
export const AncientChiseledHeading = () => {
  const [text] = useState('SPQR');

  return (
    <div className="h-full flex flex-col items-center justify-center p-8" style={{ background: 'linear-gradient(180deg, #6b6660 0%, #8b8680 50%, #6b6660 100%)' }}>
      {/* Stone tablet */}
      <div
        className="relative px-12 py-8 rounded-lg"
        style={{
          background: 'linear-gradient(180deg, #a09890 0%, #8b8680 30%, #7b7670 70%, #6b6660 100%)',
          boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.2), inset 0 -2px 4px rgba(0,0,0,0.3), 0 8px 20px rgba(0,0,0,0.4)',
        }}
      >
        {/* Weathering texture */}
        <div
          className="absolute inset-0 rounded-lg opacity-30 pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(0,0,0,0.1) 0%, transparent 30%),
              radial-gradient(circle at 80% 70%, rgba(0,0,0,0.15) 0%, transparent 25%),
              radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 40%)
            `,
          }}
        />

        {/* Chiseled letters */}
        <div className="relative flex gap-4">
          {text.split('').map((char, i) => (
            <span
              key={i}
              className="text-5xl font-serif font-bold tracking-wider relative"
              style={{
                color: 'transparent',
                textShadow: `
                  1px 1px 0 #5b5650,
                  2px 2px 1px #4b4640,
                  -1px -1px 0 #a09890,
                  0 0 1px #3d2914
                `,
                WebkitTextStroke: '1px #5b5650',
                animation: `chiselReveal 0.5s ease-out ${i * 0.15}s both`,
              }}
            >
              {char}
              {/* Inner shadow for depth */}
              <span
                className="absolute inset-0 text-5xl font-serif font-bold"
                style={{
                  color: '#7b7670',
                  textShadow: 'inset 1px 1px 2px rgba(0,0,0,0.5)',
                  clipPath: 'inset(2px)',
                }}
              >
                {char}
              </span>
            </span>
          ))}
        </div>

        {/* Decorative laurel wreath */}
        <div className="absolute -left-4 top-1/2 -translate-y-1/2">
          <span className="text-2xl" style={{ color: '#c9a227' }}>&#x1F33F;</span>
        </div>
        <div className="absolute -right-4 top-1/2 -translate-y-1/2 transform scale-x-[-1]">
          <span className="text-2xl" style={{ color: '#c9a227' }}>&#x1F33F;</span>
        </div>

        {/* Crack effect */}
        <svg className="absolute top-0 right-4 w-12 h-16 opacity-30" viewBox="0 0 40 60">
          <path
            d="M5 0 L8 15 L3 20 L10 35 L5 45 L12 60"
            fill="none"
            stroke="#4b4640"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* Subtitle */}
      <div className="mt-6 text-center">
        <span className="font-serif text-sm tracking-widest" style={{ color: '#e8d4a8' }}>
          SENATUS POPULUSQUE ROMANUS
        </span>
        <div className="text-xs mt-2" style={{ color: '#8b8680' }}>
          "The Senate and People of Rome"
        </div>
      </div>

      <style>{`
        @keyframes chiselReveal {
          0% { opacity: 0; transform: scale(0.8); }
          50% { opacity: 0.5; }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

// --- ANCIENT WATER CLOCK SLIDER ---
export const AncientWaterClockSlider = () => {
  const [value, setValue] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!sliderRef.current || !isDragging) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setValue(Math.round(percentage));
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-8" style={{ background: '#3d2914' }}>
      <div className="w-80">
        {/* Clepsydra (water clock) visualization */}
        <div className="flex justify-center gap-8 mb-6">
          {/* Upper vessel (source) */}
          <div className="relative">
            <svg viewBox="0 0 60 80" className="w-16 h-20">
              <defs>
                <linearGradient id="vesselGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8b4a2a" />
                  <stop offset="50%" stopColor="#c45a3b" />
                  <stop offset="100%" stopColor="#8b4a2a" />
                </linearGradient>
                <clipPath id="upperVessel">
                  <path d="M10 10 Q5 10 5 20 L8 65 Q10 75 30 75 Q50 75 52 65 L55 20 Q55 10 50 10 Z" />
                </clipPath>
              </defs>

              {/* Vessel body */}
              <path
                d="M10 10 Q5 10 5 20 L8 65 Q10 75 30 75 Q50 75 52 65 L55 20 Q55 10 50 10 Z"
                fill="url(#vesselGrad)"
              />

              {/* Water level */}
              <g clipPath="url(#upperVessel)">
                <rect
                  x="5"
                  y={10 + (65 * value / 100)}
                  width="50"
                  height={65 - (65 * value / 100)}
                  fill="#4a8fa8"
                  opacity="0.8"
                />
              </g>

              {/* Rim */}
              <ellipse cx="30" cy="10" rx="22" ry="5" fill="url(#vesselGrad)" />
            </svg>
          </div>

          {/* Flow indicator */}
          <div className="flex items-center">
            <div
              className="w-8 h-1 rounded"
              style={{
                background: isDragging ? '#4a8fa8' : '#8b8680',
                boxShadow: isDragging ? '0 0 8px #4a8fa8' : 'none',
              }}
            />
          </div>

          {/* Lower vessel (receiver) */}
          <div className="relative">
            <svg viewBox="0 0 60 80" className="w-16 h-20">
              <defs>
                <clipPath id="lowerVessel">
                  <path d="M10 10 Q5 10 5 20 L8 65 Q10 75 30 75 Q50 75 52 65 L55 20 Q55 10 50 10 Z" />
                </clipPath>
              </defs>

              {/* Vessel body */}
              <path
                d="M10 10 Q5 10 5 20 L8 65 Q10 75 30 75 Q50 75 52 65 L55 20 Q55 10 50 10 Z"
                fill="url(#vesselGrad)"
              />

              {/* Water level (inverse) */}
              <g clipPath="url(#lowerVessel)">
                <rect
                  x="5"
                  y={75 - (65 * (100 - value) / 100)}
                  width="50"
                  height={65 * (100 - value) / 100}
                  fill="#4a8fa8"
                  opacity="0.8"
                />
              </g>

              {/* Rim */}
              <ellipse cx="30" cy="10" rx="22" ry="5" fill="url(#vesselGrad)" />

              {/* Time markings */}
              {[1, 2, 3, 4].map((mark) => (
                <line
                  key={mark}
                  x1="52"
                  y1={15 + mark * 12}
                  x2="56"
                  y2={15 + mark * 12}
                  stroke="#c9a227"
                  strokeWidth="1"
                />
              ))}
            </svg>
          </div>
        </div>

        {/* Slider track */}
        <div
          ref={sliderRef}
          className="relative h-8 rounded-lg cursor-pointer"
          style={{
            background: 'linear-gradient(180deg, #5b5650 0%, #8b8680 50%, #5b5650 100%)',
            border: '2px solid #c9a227',
          }}
          onMouseDown={(e) => {
            setIsDragging(true);
            handleMove(e.clientX);
          }}
          onMouseMove={(e) => handleMove(e.clientX)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
        >
          {/* Water fill */}
          <div
            className="absolute inset-1 rounded transition-all duration-100"
            style={{
              width: `${value}%`,
              background: 'linear-gradient(180deg, #6ba8c2 0%, #4a8fa8 50%, #3a7f98 100%)',
            }}
          />

          {/* Float marker (thumb) */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full transition-all duration-100"
            style={{
              left: `calc(${value}% - 12px)`,
              background: 'radial-gradient(circle at 30% 30%, #f0d060, #c9a227)',
              boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
              border: '2px solid #8b6914',
            }}
          />

          {/* Hour markings */}
          {[0, 25, 50, 75, 100].map((mark) => (
            <div
              key={mark}
              className="absolute top-full mt-1 text-xs font-serif"
              style={{
                left: `${mark}%`,
                transform: 'translateX(-50%)',
                color: '#c9a227',
              }}
            >
              {mark === 0 ? 'I' : mark === 25 ? 'III' : mark === 50 ? 'VI' : mark === 75 ? 'IX' : 'XII'}
            </div>
          ))}
        </div>

        {/* Current value */}
        <div className="mt-8 text-center">
          <span className="font-serif text-lg" style={{ color: '#c9a227' }}>
            Hour {Math.round(value / 8.33) || 1}
          </span>
          <div className="text-xs mt-1" style={{ color: '#8b8680' }}>
            Clepsydra - Water Clock
          </div>
        </div>
      </div>
    </div>
  );
};

// --- ANCIENT TABLET TABS ---
export const AncientTabletTabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { title: 'LAW I', content: 'Thou shalt honor the gods of Olympus and make offerings at their temples.' },
    { title: 'LAW II', content: 'Citizens shall gather in the agora to discuss matters of the polis.' },
    { title: 'LAW III', content: 'Trade vessels must pay tribute at the port before unloading cargo.' },
  ];

  return (
    <div className="h-full flex flex-col items-center justify-center p-8" style={{ background: '#3d2914' }}>
      <div className="w-full max-w-sm">
        {/* Tab headers (stone tablets) */}
        <div className="flex gap-1 relative">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className="relative flex-1 pt-2 pb-4 font-serif text-sm tracking-wider transition-all duration-300"
              style={{
                background: activeTab === index
                  ? 'linear-gradient(180deg, #a09890 0%, #8b8680 100%)'
                  : 'linear-gradient(180deg, #7b7670 0%, #6b6660 100%)',
                borderRadius: '8px 8px 0 0',
                color: activeTab === index ? '#3d2914' : '#e8d4a8',
                transform: activeTab === index ? 'translateY(-4px)' : 'translateY(0)',
                zIndex: activeTab === index ? 10 : 1,
                boxShadow: activeTab === index
                  ? '0 -4px 10px rgba(0,0,0,0.3)'
                  : '0 -2px 4px rgba(0,0,0,0.2)',
              }}
            >
              {/* Chipped corner effect */}
              <div
                className="absolute top-0 right-0 w-3 h-3"
                style={{
                  background: '#3d2914',
                  clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
                  opacity: index === 1 ? 0.5 : 0,
                }}
              />
              {tab.title}
            </button>
          ))}
        </div>

        {/* Content tablet */}
        <div
          className="relative p-6 rounded-b-lg"
          style={{
            background: 'linear-gradient(180deg, #8b8680 0%, #7b7670 50%, #6b6660 100%)',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2), 0 8px 20px rgba(0,0,0,0.4)',
          }}
        >
          {/* Inscribed text */}
          <p
            className="font-serif text-sm leading-relaxed text-center"
            style={{
              color: '#3d2914',
              textShadow: '0 1px 0 rgba(255,255,255,0.3)',
            }}
          >
            {tabs[activeTab].content}
          </p>

          {/* Decorative border */}
          <div className="absolute inset-4 border rounded pointer-events-none" style={{ borderColor: '#c9a22730' }} />

          {/* Weathering cracks */}
          <svg className="absolute bottom-2 left-2 w-8 h-12 opacity-20" viewBox="0 0 30 50">
            <path d="M5 0 L8 15 L3 25 L10 40 L5 50" fill="none" stroke="#4b4640" strokeWidth="1" />
          </svg>

          {/* Greek meander pattern footer */}
          <div className="mt-6 flex justify-center">
            <svg viewBox="0 0 120 15" className="w-32 h-4">
              <pattern id="meander" patternUnits="userSpaceOnUse" width="15" height="15">
                <path
                  d="M0 7.5 L3 7.5 L3 3 L12 3 L12 12 L7.5 12 L7.5 7.5 L0 7.5"
                  fill="none"
                  stroke="#c9a227"
                  strokeWidth="1.5"
                />
              </pattern>
              <rect x="0" y="0" width="120" height="15" fill="url(#meander)" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- ANCIENT SAND BACKGROUND ---
export const AncientSandBackground = () => {
  const [windIntensity, setWindIntensity] = useState(1);

  return (
    <div
      className="h-full relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #c9a227 0%, #e8d4a8 30%, #d8c498 70%, #c9a227 100%)',
      }}
    >
      {/* Sand dune layers */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 300">
        <defs>
          <linearGradient id="dune1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#d8c498" />
            <stop offset="100%" stopColor="#c9a227" />
          </linearGradient>
          <linearGradient id="dune2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#c9a227" />
            <stop offset="100%" stopColor="#8b6914" />
          </linearGradient>
        </defs>

        {/* Background dunes */}
        <path
          d="M0 200 Q50 180 100 190 Q150 150 200 170 Q250 140 300 160 Q350 130 400 150 L400 300 L0 300 Z"
          fill="url(#dune1)"
          style={{
            animation: `duneShift ${6 / windIntensity}s ease-in-out infinite alternate`,
          }}
        />

        {/* Foreground dunes */}
        <path
          d="M0 250 Q80 220 150 240 Q220 200 280 230 Q340 210 400 220 L400 300 L0 300 Z"
          fill="url(#dune2)"
          style={{
            animation: `duneShift ${4 / windIntensity}s ease-in-out infinite alternate-reverse`,
          }}
        />
      </svg>

      {/* Floating sand particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: '#8b6914',
              opacity: 0.4,
              animation: `sandFloat ${(3 + Math.random() * 2) / windIntensity}s ease-in-out ${Math.random() * 2}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Sun */}
      <div
        className="absolute top-8 right-12 w-16 h-16 rounded-full"
        style={{
          background: 'radial-gradient(circle at 30% 30%, #ffd93d, #c45a3b)',
          boxShadow: '0 0 60px #c45a3b50, 0 0 100px #c9a22730',
        }}
      />

      {/* Pyramid silhouettes */}
      <svg className="absolute bottom-20 left-1/4 w-32 h-24 opacity-60" viewBox="0 0 100 80">
        <polygon points="50,0 100,80 0,80" fill="#8b6914" />
      </svg>
      <svg className="absolute bottom-16 left-1/3 w-20 h-16 opacity-40" viewBox="0 0 100 80">
        <polygon points="50,0 100,80 0,80" fill="#8b6914" />
      </svg>

      {/* Control */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 px-4 py-2 rounded-lg" style={{ background: 'rgba(61, 41, 20, 0.8)' }}>
        <span className="font-serif text-xs" style={{ color: '#e8d4a8' }}>Wind:</span>
        <button
          onClick={() => setWindIntensity(Math.max(0.5, windIntensity - 0.5))}
          className="w-6 h-6 rounded flex items-center justify-center"
          style={{ background: '#c9a227', color: '#3d2914' }}
        >
          -
        </button>
        <span className="font-serif text-sm w-8 text-center" style={{ color: '#c9a227' }}>
          {windIntensity}x
        </span>
        <button
          onClick={() => setWindIntensity(Math.min(3, windIntensity + 0.5))}
          className="w-6 h-6 rounded flex items-center justify-center"
          style={{ background: '#c9a227', color: '#3d2914' }}
        >
          +
        </button>
      </div>

      <style>{`
        @keyframes duneShift {
          0% { transform: translateX(-5px); }
          100% { transform: translateX(5px); }
        }
        @keyframes sandFloat {
          0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.2; }
          25% { transform: translate(10px, -5px) rotate(90deg); opacity: 0.5; }
          50% { transform: translate(20px, 0) rotate(180deg); opacity: 0.3; }
          75% { transform: translate(10px, 5px) rotate(270deg); opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

// Export all components with exact IDs
export const ancientScrollsComponents: Record<string, React.FC> = {
  'ancient-cartouche-button': AncientCartoucheButton,
  'ancient-papyrus-card': AncientPapyrusCard,
  'ancient-hieroglyph-input': AncientHieroglyphInput,
  'ancient-scarab-badge': AncientScarabBadge,
  'ancient-sundial-toggle': AncientSundialToggle,
  'ancient-hourglass-progress': AncientHourglassProgress,
  'ancient-torch-loader': AncientTorchLoader,
  'ancient-coin-avatar': AncientCoinAvatar,
  'ancient-scroll-modal': AncientScrollModal,
  'ancient-column-nav': AncientColumnNav,
  'ancient-mosaic-divider': AncientMosaicDivider,
  'ancient-oracle-alert': AncientOracleAlert,
  'ancient-amphora-icon': AncientAmphoraIcon,
  'ancient-chiseled-heading': AncientChiseledHeading,
  'ancient-water-clock-slider': AncientWaterClockSlider,
  'ancient-tablet-tabs': AncientTabletTabs,
  'ancient-sand-background': AncientSandBackground,
};
