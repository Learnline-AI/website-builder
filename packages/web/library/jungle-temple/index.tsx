import React, { useState, useEffect } from 'react';

// Jungle Temple Theme Colors
// jungle green: #2d5a27
// moss: #8fbc8f
// stone gray: #708090
// gold: #ffd700
// earth brown: #8b4513

// --- JUNGLE STONE BUTTON ---
export const JungleStoneButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [glyphGlow, setGlyphGlow] = useState(0);

  useEffect(() => {
    if (!isHovered) {
      setGlyphGlow(0);
      return;
    }
    const interval = setInterval(() => {
      setGlyphGlow(g => (g + 1) % 4);
    }, 300);
    return () => clearInterval(interval);
  }, [isHovered]);

  const glyphs = ['\u25C6', '\u25C7', '\u25CA', '\u25C6'];

  return (
    <div
      className="h-full flex items-center justify-center p-8"
      style={{ background: 'linear-gradient(180deg, #1a3d18 0%, #0d1f0c 100%)' }}
    >
      <button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { setIsHovered(false); setIsPressed(false); }}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        className="relative group"
      >
        {/* Stone block button */}
        <div
          className="relative px-10 py-5 overflow-hidden transition-all duration-200"
          style={{
            background: isPressed
              ? 'linear-gradient(180deg, #505860 0%, #708090 100%)'
              : 'linear-gradient(180deg, #708090 0%, #505860 100%)',
            border: '3px solid #505860',
            borderRadius: '4px',
            boxShadow: isPressed
              ? 'inset 0 4px 8px rgba(0,0,0,0.5)'
              : '0 6px 0 #3d4550, 0 8px 15px rgba(0,0,0,0.5)',
            transform: isPressed ? 'translateY(4px)' : 'translateY(0)',
          }}
        >
          {/* Carved texture lines */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `repeating-linear-gradient(
                0deg,
                transparent 0px,
                transparent 8px,
                rgba(0,0,0,0.3) 8px,
                rgba(0,0,0,0.3) 9px
              )`,
            }}
          />

          {/* Corner glyphs */}
          <span
            className="absolute top-1 left-2 text-sm transition-all duration-300"
            style={{
              color: glyphGlow === 0 ? '#ffd700' : '#8b4513',
              textShadow: glyphGlow === 0 ? '0 0 8px #ffd700' : 'none',
            }}
          >
            {glyphs[0]}
          </span>
          <span
            className="absolute top-1 right-2 text-sm transition-all duration-300"
            style={{
              color: glyphGlow === 1 ? '#ffd700' : '#8b4513',
              textShadow: glyphGlow === 1 ? '0 0 8px #ffd700' : 'none',
            }}
          >
            {glyphs[1]}
          </span>
          <span
            className="absolute bottom-1 left-2 text-sm transition-all duration-300"
            style={{
              color: glyphGlow === 2 ? '#ffd700' : '#8b4513',
              textShadow: glyphGlow === 2 ? '0 0 8px #ffd700' : 'none',
            }}
          >
            {glyphs[2]}
          </span>
          <span
            className="absolute bottom-1 right-2 text-sm transition-all duration-300"
            style={{
              color: glyphGlow === 3 ? '#ffd700' : '#8b4513',
              textShadow: glyphGlow === 3 ? '0 0 8px #ffd700' : 'none',
            }}
          >
            {glyphs[3]}
          </span>

          {/* Main text with carved effect */}
          <span
            className="relative font-bold tracking-widest text-lg"
            style={{
              color: '#f0e6d2',
              textShadow: isHovered
                ? '0 0 10px #ffd700, 2px 2px 0 #3d4550'
                : '2px 2px 0 #3d4550',
            }}
          >
            EXPLORE
          </span>

          {/* Moss creeping on edges */}
          <div
            className="absolute bottom-0 left-0 right-0 h-2 opacity-60"
            style={{
              background: 'linear-gradient(0deg, #8fbc8f 0%, transparent 100%)',
              borderRadius: '0 0 2px 2px',
            }}
          />
        </div>
      </button>
    </div>
  );
};

// --- JUNGLE RUIN CARD ---
export const JungleRuinCard = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [vineGrowth, setVineGrowth] = useState(0);

  useEffect(() => {
    if (!isHovered) {
      setVineGrowth(0);
      return;
    }
    const interval = setInterval(() => {
      setVineGrowth(v => Math.min(v + 10, 100));
    }, 50);
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div
      className="h-full flex items-center justify-center p-8"
      style={{ background: '#0d1f0c' }}
    >
      <div
        className="relative w-64 h-80 rounded overflow-hidden cursor-pointer transition-transform duration-300"
        style={{
          transform: isHovered ? 'scale(1.02)' : 'scale(1)',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Stone background */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, #708090 0%, #505860 50%, #3d4550 100%)',
          }}
        />

        {/* Crack pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-30">
          <path d="M50 0 L55 40 L45 80 L60 120" stroke="#2d2d2d" strokeWidth="2" fill="none" />
          <path d="M180 30 L160 60 L170 100" stroke="#2d2d2d" strokeWidth="1.5" fill="none" />
          <path d="M0 200 L40 190 L60 210" stroke="#2d2d2d" strokeWidth="2" fill="none" />
        </svg>

        {/* Crumbling corner pieces */}
        <div
          className="absolute top-0 right-0 w-12 h-12"
          style={{
            background: 'linear-gradient(135deg, transparent 50%, #505860 50%)',
            clipPath: 'polygon(100% 0, 100% 100%, 30% 100%, 0 70%, 0 0)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-16 h-10"
          style={{
            background: '#3d4550',
            clipPath: 'polygon(0 40%, 60% 100%, 0 100%)',
          }}
        />

        {/* Vine growth animation */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <path
            d="M0 50 Q30 60 40 100 Q45 140 30 180 Q20 220 40 260"
            stroke="#2d5a27"
            strokeWidth="4"
            fill="none"
            strokeDasharray="200"
            strokeDashoffset={200 - (vineGrowth * 2)}
            style={{ transition: 'stroke-dashoffset 0.1s linear' }}
          />
          {vineGrowth > 30 && (
            <circle cx="35" cy="120" r="4" fill="#8fbc8f" opacity={vineGrowth / 100} />
          )}
          {vineGrowth > 50 && (
            <circle cx="28" cy="180" r="5" fill="#8fbc8f" opacity={vineGrowth / 100} />
          )}
          {vineGrowth > 70 && (
            <circle cx="42" cy="230" r="3" fill="#8fbc8f" opacity={vineGrowth / 100} />
          )}
        </svg>

        {/* Content */}
        <div className="relative z-10 h-full p-6 flex flex-col">
          {/* Temple icon */}
          <div
            className="w-16 h-16 rounded flex items-center justify-center mb-4"
            style={{
              background: 'linear-gradient(135deg, #8b4513 0%, #5a2d0a 100%)',
              border: '2px solid #ffd700',
              boxShadow: isHovered ? '0 0 15px #ffd70060' : 'none',
            }}
          >
            <span className="text-3xl">&#9650;</span>
          </div>

          <h3
            className="font-bold text-xl mb-2"
            style={{ color: '#f0e6d2', textShadow: '1px 1px 2px #000' }}
          >
            Temple Ruins
          </h3>
          <p className="text-sm flex-1" style={{ color: '#a0a8b0' }}>
            Ancient stones whisper secrets of a forgotten civilization buried deep within the jungle.
          </p>

          {/* Discovery indicator */}
          <div className="mt-4 pt-4 border-t border-[#50586060]">
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{
                  background: '#ffd700',
                  boxShadow: '0 0 6px #ffd700',
                }}
              />
              <span className="text-xs" style={{ color: '#ffd700' }}>
                Undiscovered Artifact
              </span>
            </div>
          </div>
        </div>

        {/* Moss on bottom edge */}
        <div
          className="absolute bottom-0 left-0 right-0 h-4"
          style={{
            background: 'linear-gradient(0deg, #2d5a27 0%, transparent 100%)',
            opacity: 0.7,
          }}
        />
      </div>
    </div>
  );
};

// --- JUNGLE VINE INPUT ---
export const JungleVineInput = () => {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [vineProgress, setVineProgress] = useState(0);

  useEffect(() => {
    if (isFocused) {
      const interval = setInterval(() => {
        setVineProgress(v => Math.min(v + 5, 100));
      }, 50);
      return () => clearInterval(interval);
    } else {
      setVineProgress(0);
    }
  }, [isFocused]);

  return (
    <div
      className="h-full flex items-center justify-center p-8"
      style={{ background: '#1a3d18' }}
    >
      <div className="relative w-72">
        {/* Stone input container */}
        <div
          className="relative rounded overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, #708090 0%, #505860 100%)',
            border: `2px solid ${isFocused ? '#ffd700' : '#3d4550'}`,
            boxShadow: isFocused
              ? '0 0 15px #ffd70040, inset 0 2px 4px rgba(0,0,0,0.3)'
              : 'inset 0 2px 4px rgba(0,0,0,0.3)',
          }}
        >
          {/* Vine border growing on focus */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 300 60"
            preserveAspectRatio="none"
          >
            {/* Left vine */}
            <path
              d="M0 30 Q10 20 15 30 Q20 40 30 35 Q40 30 50 35"
              stroke="#2d5a27"
              strokeWidth="3"
              fill="none"
              strokeDasharray="60"
              strokeDashoffset={60 - (vineProgress * 0.6)}
              style={{ transition: 'stroke-dashoffset 0.1s' }}
            />
            {/* Right vine */}
            <path
              d="M300 30 Q290 40 285 30 Q280 20 270 25 Q260 30 250 25"
              stroke="#2d5a27"
              strokeWidth="3"
              fill="none"
              strokeDasharray="60"
              strokeDashoffset={60 - (vineProgress * 0.6)}
              style={{ transition: 'stroke-dashoffset 0.1s' }}
            />
            {/* Leaves */}
            {vineProgress > 50 && (
              <>
                <ellipse cx="25" cy="28" rx="6" ry="10" fill="#8fbc8f" opacity={vineProgress / 100} transform="rotate(-30 25 28)" />
                <ellipse cx="275" cy="28" rx="6" ry="10" fill="#8fbc8f" opacity={vineProgress / 100} transform="rotate(30 275 28)" />
              </>
            )}
          </svg>

          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Enter ancient text..."
            className="w-full px-4 py-3 bg-transparent outline-none text-[#f0e6d2] placeholder-[#70808080]"
            style={{
              fontFamily: 'serif',
              letterSpacing: '0.05em',
            }}
          />
        </div>

        {/* Carved label */}
        <div
          className="absolute -top-3 left-4 px-2"
          style={{
            background: '#1a3d18',
            color: isFocused ? '#ffd700' : '#8fbc8f',
            fontSize: '12px',
            fontFamily: 'serif',
            transition: 'color 0.3s',
          }}
        >
          Sacred Inscription
        </div>

        {/* Character count as exploration progress */}
        <div className="mt-2 flex items-center gap-2">
          <div
            className="flex-1 h-1 rounded-full overflow-hidden"
            style={{ background: '#3d4550' }}
          >
            <div
              className="h-full transition-all duration-300"
              style={{
                width: `${Math.min(value.length * 5, 100)}%`,
                background: 'linear-gradient(90deg, #2d5a27, #8fbc8f)',
              }}
            />
          </div>
          <span className="text-xs" style={{ color: '#8fbc8f' }}>
            {value.length}/20
          </span>
        </div>
      </div>
    </div>
  );
};

// --- JUNGLE GLYPH BADGE ---
export const JungleGlyphBadge = () => {
  const [activeGlyph, setActiveGlyph] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const glyphs = [
    { symbol: '\u2660', name: 'Jaguar', meaning: 'Power' },
    { symbol: '\u2665', name: 'Sun', meaning: 'Life' },
    { symbol: '\u2666', name: 'Serpent', meaning: 'Wisdom' },
    { symbol: '\u2663', name: 'Eagle', meaning: 'Vision' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveGlyph(g => (g + 1) % glyphs.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="h-full flex flex-col items-center justify-center p-8 gap-6"
      style={{ background: '#0d1f0c' }}
    >
      {/* Main rotating badge */}
      <div
        className="relative cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500"
          style={{
            background: 'radial-gradient(circle, #8b4513 0%, #5a2d0a 70%)',
            border: '3px solid #ffd700',
            boxShadow: isHovered
              ? '0 0 30px #ffd70080, inset 0 0 20px #ffd70040'
              : '0 0 15px #ffd70040, inset 0 0 10px #ffd70020',
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          }}
        >
          <span
            className="text-4xl transition-all duration-500"
            style={{
              color: '#ffd700',
              textShadow: '0 0 10px #ffd700',
              transform: `rotate(${activeGlyph * 90}deg)`,
            }}
          >
            {glyphs[activeGlyph].symbol}
          </span>
        </div>

        {/* Orbiting dots */}
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: i === activeGlyph ? '#ffd700' : '#8fbc8f',
              boxShadow: i === activeGlyph ? '0 0 8px #ffd700' : 'none',
              top: '50%',
              left: '50%',
              transform: `rotate(${i * 90 + (isHovered ? 45 : 0)}deg) translateX(50px) translateY(-50%)`,
              transition: 'all 0.5s',
            }}
          />
        ))}
      </div>

      {/* Glyph info */}
      <div className="text-center">
        <div className="text-lg font-bold" style={{ color: '#ffd700' }}>
          {glyphs[activeGlyph].name}
        </div>
        <div className="text-sm" style={{ color: '#8fbc8f' }}>
          "{glyphs[activeGlyph].meaning}"
        </div>
      </div>

      {/* Badge row */}
      <div className="flex gap-3">
        {glyphs.map((glyph, i) => (
          <button
            key={i}
            onClick={() => setActiveGlyph(i)}
            className="w-10 h-10 rounded flex items-center justify-center transition-all"
            style={{
              background: i === activeGlyph ? '#8b4513' : '#3d4550',
              border: `2px solid ${i === activeGlyph ? '#ffd700' : '#505860'}`,
              color: i === activeGlyph ? '#ffd700' : '#708090',
            }}
          >
            {glyph.symbol}
          </button>
        ))}
      </div>
    </div>
  );
};

// --- JUNGLE TORCH TOGGLE ---
export const JungleTorchToggle = () => {
  const [isOn, setIsOn] = useState(false);
  const [flameHeight, setFlameHeight] = useState(0);

  useEffect(() => {
    if (!isOn) {
      setFlameHeight(0);
      return;
    }
    const interval = setInterval(() => {
      setFlameHeight(0.8 + Math.random() * 0.4);
    }, 100);
    return () => clearInterval(interval);
  }, [isOn]);

  return (
    <div
      className="h-full flex flex-col items-center justify-center p-8"
      style={{ background: isOn ? '#1a3d18' : '#0d1f0c' }}
    >
      {/* Torch */}
      <div
        className="relative cursor-pointer"
        onClick={() => setIsOn(!isOn)}
      >
        {/* Flame */}
        <div
          className="absolute -top-12 left-1/2 -translate-x-1/2 transition-all duration-200"
          style={{
            width: '30px',
            height: isOn ? `${40 * flameHeight}px` : '0px',
            background: isOn
              ? 'radial-gradient(ellipse at bottom, #ffd700 0%, #ff8c00 40%, #ff4500 70%, transparent 100%)'
              : 'transparent',
            borderRadius: '50% 50% 20% 20%',
            filter: 'blur(2px)',
            boxShadow: isOn ? '0 0 30px #ff8c00, 0 0 60px #ffd700' : 'none',
          }}
        />

        {/* Inner flame */}
        {isOn && (
          <div
            className="absolute -top-10 left-1/2 -translate-x-1/2"
            style={{
              width: '15px',
              height: `${25 * flameHeight}px`,
              background: 'radial-gradient(ellipse at bottom, #fff 0%, #ffd700 60%, transparent 100%)',
              borderRadius: '50% 50% 20% 20%',
            }}
          />
        )}

        {/* Torch handle */}
        <div
          className="w-8 h-24 rounded-b-lg"
          style={{
            background: 'linear-gradient(90deg, #5a2d0a 0%, #8b4513 50%, #5a2d0a 100%)',
            border: '2px solid #3d1f08',
          }}
        >
          {/* Metal band */}
          <div
            className="w-full h-4 mt-2"
            style={{
              background: 'linear-gradient(180deg, #8b8b8b 0%, #505050 50%, #8b8b8b 100%)',
            }}
          />
          {/* Decorative rings */}
          <div className="absolute bottom-4 left-0 right-0 h-1" style={{ background: '#ffd70060' }} />
          <div className="absolute bottom-8 left-0 right-0 h-1" style={{ background: '#ffd70060' }} />
        </div>

        {/* Torch head */}
        <div
          className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-6 rounded-t"
          style={{
            background: isOn
              ? 'linear-gradient(180deg, #ff4500 0%, #8b4513 100%)'
              : 'linear-gradient(180deg, #3d3d3d 0%, #8b4513 100%)',
          }}
        />
      </div>

      {/* Status */}
      <div className="mt-8 text-center">
        <div
          className="text-lg font-bold transition-colors duration-300"
          style={{ color: isOn ? '#ffd700' : '#505860' }}
        >
          {isOn ? 'ILLUMINATED' : 'DORMANT'}
        </div>
        <div className="text-xs mt-1" style={{ color: '#8fbc8f' }}>
          Click torch to toggle
        </div>
      </div>

      {/* Ambient glow effect */}
      {isOn && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 30%, #ffd70020 0%, transparent 50%)',
          }}
        />
      )}
    </div>
  );
};

// --- JUNGLE TREASURE PROGRESS ---
export const JungleTreasureProgress = () => {
  const [progress, setProgress] = useState(0);
  const [isDigging, setIsDigging] = useState(false);

  useEffect(() => {
    if (!isDigging) return;
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          setIsDigging(false);
          return 100;
        }
        return p + 2;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [isDigging]);

  const treasureRevealed = progress >= 100;

  return (
    <div
      className="h-full flex flex-col items-center justify-center p-8"
      style={{ background: '#0d1f0c' }}
    >
      {/* Excavation site */}
      <div className="relative w-64 h-48">
        {/* Dirt layers */}
        <div
          className="absolute inset-0 rounded-lg overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, #8b4513 0%, #654321 50%, #3d2817 100%)',
            border: '3px solid #2d1810',
          }}
        >
          {/* Revealed treasure area */}
          <div
            className="absolute bottom-0 left-0 right-0 flex items-center justify-center transition-all duration-500"
            style={{
              height: `${progress}%`,
              background: treasureRevealed
                ? 'radial-gradient(ellipse at center, #ffd700 0%, #c9a227 50%, #8b6914 100%)'
                : 'linear-gradient(180deg, #5a3d20 0%, #3d2817 100%)',
            }}
          >
            {/* Treasure chest appearing */}
            {progress > 60 && (
              <div
                className="text-center transition-all duration-500"
                style={{
                  opacity: (progress - 60) / 40,
                  transform: `scale(${0.5 + (progress - 60) / 80})`,
                }}
              >
                <div
                  className="text-5xl"
                  style={{
                    filter: treasureRevealed ? 'none' : 'blur(2px)',
                  }}
                >
                  {treasureRevealed ? '\u2B50' : '\u2B50'}
                </div>
                {treasureRevealed && (
                  <div className="text-sm font-bold mt-2" style={{ color: '#3d2817' }}>
                    TREASURE FOUND!
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Digging effect overlay */}
          {isDigging && (
            <div
              className="absolute inset-0"
              style={{
                background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #8b451320 10px, #8b451320 20px)',
                animation: 'dig 0.5s infinite',
              }}
            />
          )}
        </div>

        {/* Rocks and debris */}
        <div
          className="absolute -top-2 -left-2 w-8 h-6 rounded"
          style={{ background: '#708090', opacity: 0.7 }}
        />
        <div
          className="absolute -top-1 right-4 w-6 h-5 rounded"
          style={{ background: '#505860', opacity: 0.6 }}
        />
      </div>

      {/* Progress bar */}
      <div className="w-64 mt-6">
        <div className="flex justify-between text-xs mb-2" style={{ color: '#8fbc8f' }}>
          <span>Excavation Progress</span>
          <span>{progress}%</span>
        </div>
        <div
          className="h-3 rounded-full overflow-hidden"
          style={{ background: '#3d2817', border: '1px solid #5a3d20' }}
        >
          <div
            className="h-full rounded-full transition-all duration-200"
            style={{
              width: `${progress}%`,
              background: progress < 100
                ? 'linear-gradient(90deg, #8b4513, #a0522d)'
                : 'linear-gradient(90deg, #ffd700, #ffed4a, #ffd700)',
              boxShadow: progress >= 100 ? '0 0 10px #ffd700' : 'none',
            }}
          />
        </div>
      </div>

      {/* Control button */}
      <button
        onClick={() => {
          if (progress >= 100) {
            setProgress(0);
          } else {
            setIsDigging(!isDigging);
          }
        }}
        className="mt-4 px-6 py-2 rounded font-bold transition-all"
        style={{
          background: progress >= 100 ? '#ffd700' : '#8b4513',
          color: progress >= 100 ? '#3d2817' : '#f0e6d2',
          border: '2px solid #ffd700',
        }}
      >
        {progress >= 100 ? 'CLAIM TREASURE' : isDigging ? 'PAUSE DIG' : 'START DIGGING'}
      </button>

      <style>{`
        @keyframes dig {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
};

// --- JUNGLE IDOL LOADER ---
export const JungleIdolLoader = () => {
  const [rotation, setRotation] = useState(0);
  const [glowIntensity, setGlowIntensity] = useState(0);

  useEffect(() => {
    const rotInterval = setInterval(() => {
      setRotation(r => (r + 3) % 360);
    }, 50);
    const glowInterval = setInterval(() => {
      setGlowIntensity(g => (g + 0.1) % 1);
    }, 100);
    return () => {
      clearInterval(rotInterval);
      clearInterval(glowInterval);
    };
  }, []);

  return (
    <div
      className="h-full flex flex-col items-center justify-center p-8"
      style={{ background: '#0d1f0c' }}
    >
      {/* Pedestal */}
      <div className="relative">
        {/* Floating idol */}
        <div
          className="relative w-24 h-24 flex items-center justify-center"
          style={{
            animation: 'float 2s ease-in-out infinite',
          }}
        >
          {/* Glow rings */}
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${100 + i * 30}%`,
                height: `${100 + i * 30}%`,
                border: `2px solid rgba(255, 215, 0, ${0.3 - i * 0.1})`,
                transform: `rotate(${rotation + i * 30}deg)`,
                boxShadow: `0 0 ${10 + glowIntensity * 10}px rgba(255, 215, 0, ${0.2 + glowIntensity * 0.2})`,
              }}
            />
          ))}

          {/* Golden idol */}
          <div
            className="relative z-10 w-16 h-20 rounded-t-full flex items-center justify-center"
            style={{
              background: `linear-gradient(180deg, #ffd700 0%, #c9a227 40%, #8b6914 100%)`,
              boxShadow: `0 0 ${20 + glowIntensity * 20}px #ffd70080`,
              transform: `rotate(${Math.sin(rotation * 0.02) * 5}deg)`,
            }}
          >
            {/* Idol face */}
            <div className="text-center">
              <div className="flex gap-2 justify-center">
                <div className="w-3 h-3 rounded-full bg-[#3d2817]" />
                <div className="w-3 h-3 rounded-full bg-[#3d2817]" />
              </div>
              <div
                className="w-6 h-2 mt-2 mx-auto rounded"
                style={{ background: '#5a3d20' }}
              />
            </div>
          </div>
        </div>

        {/* Shadow */}
        <div
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-4 rounded-full"
          style={{
            background: 'radial-gradient(ellipse, #000 0%, transparent 70%)',
            opacity: 0.5,
          }}
        />
      </div>

      {/* Stone pedestal */}
      <div
        className="w-20 h-8 mt-4 rounded"
        style={{
          background: 'linear-gradient(180deg, #708090 0%, #505860 100%)',
          borderBottom: '3px solid #3d4550',
        }}
      />

      {/* Loading text */}
      <div className="mt-6 text-center">
        <div className="text-lg font-bold" style={{ color: '#ffd700' }}>
          AWAKENING
        </div>
        <div className="flex gap-1 justify-center mt-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{
                background: '#ffd700',
                opacity: (rotation / 120 + i / 3) % 1,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

// --- JUNGLE MASK AVATAR ---
export const JungleMaskAvatar = () => {
  const [selectedMask, setSelectedMask] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const masks = [
    { color: '#ffd700', pattern: 'jaguar', symbol: '\u25B2' },
    { color: '#2d5a27', pattern: 'serpent', symbol: '\u223F' },
    { color: '#ff4500', pattern: 'sun', symbol: '\u2299' },
    { color: '#708090', pattern: 'moon', symbol: '\u263D' },
  ];

  return (
    <div
      className="h-full flex flex-col items-center justify-center p-8"
      style={{ background: '#0d1f0c' }}
    >
      {/* Main mask display */}
      <div
        className="relative cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setSelectedMask((selectedMask + 1) % masks.length)}
      >
        {/* Mask frame */}
        <div
          className="w-28 h-36 relative rounded-t-full overflow-hidden transition-all duration-500"
          style={{
            background: `linear-gradient(180deg, ${masks[selectedMask].color} 0%, ${masks[selectedMask].color}aa 50%, #3d2817 100%)`,
            border: '4px solid #8b4513',
            boxShadow: isHovered
              ? `0 0 30px ${masks[selectedMask].color}80, inset 0 0 20px rgba(0,0,0,0.5)`
              : 'inset 0 0 20px rgba(0,0,0,0.5)',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
        >
          {/* Eye holes */}
          <div className="absolute top-12 left-4 w-6 h-4 rounded-full bg-[#0d1f0c] border-2 border-[#3d2817]" />
          <div className="absolute top-12 right-4 w-6 h-4 rounded-full bg-[#0d1f0c] border-2 border-[#3d2817]" />

          {/* Nose */}
          <div
            className="absolute top-20 left-1/2 -translate-x-1/2 w-4 h-6"
            style={{
              background: '#3d2817',
              clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
            }}
          />

          {/* Mouth design */}
          <div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 w-12 h-4 rounded"
            style={{ background: '#3d2817' }}
          />

          {/* Forehead symbol */}
          <div
            className="absolute top-4 left-1/2 -translate-x-1/2 text-2xl"
            style={{ color: '#3d2817' }}
          >
            {masks[selectedMask].symbol}
          </div>

          {/* Decorative feathers */}
          <div
            className="absolute -top-6 left-1/2 -translate-x-1/2 flex gap-1"
          >
            {[-30, -15, 0, 15, 30].map((angle, i) => (
              <div
                key={i}
                className="w-2 h-10 rounded-full"
                style={{
                  background: i === 2 ? '#ffd700' : '#8fbc8f',
                  transform: `rotate(${angle}deg)`,
                  transformOrigin: 'bottom',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mask name */}
      <div className="mt-8 text-center">
        <div className="text-lg font-bold capitalize" style={{ color: masks[selectedMask].color }}>
          {masks[selectedMask].pattern} Mask
        </div>
        <div className="text-xs mt-1" style={{ color: '#8fbc8f' }}>
          Click to change
        </div>
      </div>

      {/* Mask selector */}
      <div className="flex gap-3 mt-4">
        {masks.map((mask, i) => (
          <button
            key={i}
            onClick={() => setSelectedMask(i)}
            className="w-8 h-10 rounded-t-full transition-all"
            style={{
              background: mask.color,
              border: `2px solid ${i === selectedMask ? '#ffd700' : '#3d2817'}`,
              transform: i === selectedMask ? 'scale(1.2)' : 'scale(1)',
            }}
          />
        ))}
      </div>
    </div>
  );
};

// --- JUNGLE GATE MODAL ---
export const JungleGateModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [gateProgress, setGateProgress] = useState(0);

  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => {
        setGateProgress(p => Math.min(p + 5, 100));
      }, 30);
      return () => clearInterval(interval);
    } else {
      setGateProgress(0);
    }
  }, [isOpen]);

  return (
    <div
      className="h-full flex items-center justify-center p-8 relative"
      style={{ background: '#0d1f0c' }}
    >
      {/* Open gate button */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-8 py-4 rounded font-bold text-lg transition-all"
        style={{
          background: 'linear-gradient(180deg, #8b4513 0%, #5a2d0a 100%)',
          border: '3px solid #ffd700',
          color: '#ffd700',
          boxShadow: '0 4px 15px rgba(139, 69, 19, 0.5)',
        }}
      >
        ENTER TEMPLE
      </button>

      {/* Modal overlay */}
      {isOpen && (
        <div
          className="absolute inset-0 flex items-center justify-center z-50"
          style={{ background: 'rgba(0, 0, 0, 0.8)' }}
        >
          {/* Temple gate */}
          <div className="relative w-72 h-80">
            {/* Stone frame */}
            <div
              className="absolute inset-0 rounded-t-full"
              style={{
                background: 'linear-gradient(180deg, #708090 0%, #505860 100%)',
                border: '8px solid #3d4550',
              }}
            />

            {/* Left gate door */}
            <div
              className="absolute top-4 bottom-4 left-4 w-[calc(50%-12px)] origin-left transition-transform duration-700"
              style={{
                background: 'linear-gradient(90deg, #5a2d0a 0%, #8b4513 100%)',
                borderRight: '2px solid #3d1f08',
                transform: `perspective(200px) rotateY(${-gateProgress * 0.9}deg)`,
              }}
            >
              {/* Door carvings */}
              <div className="absolute inset-4 border-2 border-[#ffd70040] rounded">
                <div className="absolute top-1/2 right-2 -translate-y-1/2 w-4 h-8 rounded bg-[#ffd700]" />
              </div>
            </div>

            {/* Right gate door */}
            <div
              className="absolute top-4 bottom-4 right-4 w-[calc(50%-12px)] origin-right transition-transform duration-700"
              style={{
                background: 'linear-gradient(90deg, #8b4513 0%, #5a2d0a 100%)',
                borderLeft: '2px solid #3d1f08',
                transform: `perspective(200px) rotateY(${gateProgress * 0.9}deg)`,
              }}
            >
              {/* Door carvings */}
              <div className="absolute inset-4 border-2 border-[#ffd70040] rounded">
                <div className="absolute top-1/2 left-2 -translate-y-1/2 w-4 h-8 rounded bg-[#ffd700]" />
              </div>
            </div>

            {/* Interior content (revealed as gates open) */}
            <div
              className="absolute inset-8 flex flex-col items-center justify-center text-center transition-opacity duration-500"
              style={{
                opacity: gateProgress / 100,
                background: 'radial-gradient(circle, #ffd70020 0%, transparent 70%)',
              }}
            >
              <div className="text-5xl mb-4">{'\u2B50'}</div>
              <h3 className="text-xl font-bold" style={{ color: '#ffd700' }}>
                Sacred Chamber
              </h3>
              <p className="text-sm mt-2" style={{ color: '#8fbc8f' }}>
                Ancient secrets await within these walls
              </p>
              <button
                onClick={() => setIsOpen(false)}
                className="mt-6 px-6 py-2 rounded transition-all"
                style={{
                  background: '#ffd700',
                  color: '#3d2817',
                  fontWeight: 'bold',
                }}
              >
                CLOSE GATE
              </button>
            </div>

            {/* Top glyph decoration */}
            <div
              className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-8 rounded-t-lg flex items-center justify-center"
              style={{
                background: '#ffd700',
                boxShadow: '0 0 15px #ffd70060',
              }}
            >
              <span className="text-[#3d2817] text-xl">{'\u25B2'}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- JUNGLE TRAIL NAV ---
export const JungleTrailNav = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { name: 'Entrance', icon: '\u25B6' },
    { name: 'Bridge', icon: '\u2248' },
    { name: 'Temple', icon: '\u25B2' },
    { name: 'Chamber', icon: '\u25C6' },
    { name: 'Treasure', icon: '\u2B50' },
  ];

  return (
    <div
      className="h-full flex flex-col items-center justify-center p-8"
      style={{ background: '#1a3d18' }}
    >
      {/* Trail path */}
      <div className="relative w-full max-w-md">
        {/* Path line */}
        <svg className="absolute top-6 left-0 right-0 h-4 w-full" preserveAspectRatio="none">
          <path
            d="M20 10 Q80 0 160 10 T300 10 T420 10"
            stroke="#3d2817"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M20 10 Q80 0 160 10 T300 10 T420 10"
            stroke="#8fbc8f"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="400"
            strokeDashoffset={400 - (activeStep / (steps.length - 1)) * 400}
            style={{ transition: 'stroke-dashoffset 0.5s' }}
          />
        </svg>

        {/* Step markers */}
        <div className="relative flex justify-between">
          {steps.map((step, i) => (
            <button
              key={i}
              onClick={() => setActiveStep(i)}
              className="flex flex-col items-center group"
            >
              {/* Marker stone */}
              <div
                className="w-12 h-14 rounded-t flex items-center justify-center transition-all duration-300"
                style={{
                  background: i <= activeStep
                    ? 'linear-gradient(180deg, #ffd700 0%, #c9a227 100%)'
                    : 'linear-gradient(180deg, #708090 0%, #505860 100%)',
                  border: `3px solid ${i <= activeStep ? '#ffd700' : '#3d4550'}`,
                  boxShadow: i === activeStep ? '0 0 15px #ffd70060' : 'none',
                  transform: i === activeStep ? 'translateY(-4px)' : 'translateY(0)',
                }}
              >
                <span
                  className="text-xl"
                  style={{ color: i <= activeStep ? '#3d2817' : '#a0a8b0' }}
                >
                  {step.icon}
                </span>
              </div>

              {/* Marker base */}
              <div
                className="w-8 h-2 rounded-b"
                style={{
                  background: i <= activeStep ? '#8b4513' : '#3d4550',
                }}
              />

              {/* Step name */}
              <span
                className="text-xs mt-2 font-medium transition-colors"
                style={{ color: i <= activeStep ? '#ffd700' : '#708090' }}
              >
                {step.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Current location info */}
      <div
        className="mt-8 px-6 py-4 rounded text-center"
        style={{
          background: 'linear-gradient(180deg, #3d2817 0%, #2d1810 100%)',
          border: '2px solid #8b4513',
        }}
      >
        <div className="text-lg font-bold" style={{ color: '#ffd700' }}>
          Current Location: {steps[activeStep].name}
        </div>
        <div className="text-sm mt-1" style={{ color: '#8fbc8f' }}>
          Step {activeStep + 1} of {steps.length}
        </div>
      </div>
    </div>
  );
};

// --- JUNGLE ROOT DIVIDER ---
export const JungleRootDivider = () => {
  const [isAnimating, setIsAnimating] = useState(true);

  return (
    <div
      className="h-full flex flex-col items-center justify-center p-8"
      style={{ background: '#0d1f0c' }}
    >
      {/* Content above */}
      <div
        className="w-full max-w-sm p-4 rounded text-center"
        style={{ background: '#1a3d18', color: '#8fbc8f' }}
      >
        Ancient Archives
      </div>

      {/* Root divider */}
      <div className="relative w-full max-w-sm h-16 my-4">
        <svg className="w-full h-full" viewBox="0 0 400 60" preserveAspectRatio="none">
          {/* Main root */}
          <path
            d="M0 30 Q50 10 100 30 T200 30 T300 30 T400 30"
            stroke="#8b4513"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            className={isAnimating ? 'animate-pulse' : ''}
          />

          {/* Secondary roots */}
          <path
            d="M80 30 Q90 50 120 55"
            stroke="#5a2d0a"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M180 30 Q170 10 140 5"
            stroke="#5a2d0a"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M280 30 Q290 55 320 58"
            stroke="#5a2d0a"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />

          {/* Small roots */}
          <path
            d="M50 30 Q45 40 35 45"
            stroke="#3d1f08"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M350 30 Q355 20 365 15"
            stroke="#3d1f08"
            strokeWidth="2"
            fill="none"
          />

          {/* Moss patches */}
          <ellipse cx="100" cy="28" rx="15" ry="8" fill="#8fbc8f" opacity="0.5" />
          <ellipse cx="250" cy="32" rx="20" ry="10" fill="#2d5a27" opacity="0.6" />
          <ellipse cx="380" cy="30" rx="12" ry="6" fill="#8fbc8f" opacity="0.4" />
        </svg>
      </div>

      {/* Content below */}
      <div
        className="w-full max-w-sm p-4 rounded text-center"
        style={{ background: '#1a3d18', color: '#8fbc8f' }}
      >
        Sacred Texts
      </div>

      {/* Toggle animation */}
      <button
        onClick={() => setIsAnimating(!isAnimating)}
        className="mt-4 text-xs px-4 py-2 rounded"
        style={{
          background: '#3d2817',
          color: '#8fbc8f',
          border: '1px solid #8b4513',
        }}
      >
        {isAnimating ? 'Stop Growth' : 'Animate Roots'}
      </button>
    </div>
  );
};

// --- JUNGLE DANGER ALERT ---
export const JungleDangerAlert = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [pulseIntensity, setPulseIntensity] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setPulseIntensity(p => (p + 0.1) % 1);
    }, 100);
    return () => clearInterval(interval);
  }, [isVisible]);

  const alerts = [
    { type: 'danger', icon: '\u26A0', title: 'QUICKSAND AHEAD', message: 'Proceed with extreme caution through this area.' },
    { type: 'warning', icon: '\u2620', title: 'VENOMOUS SNAKES', message: 'Watch your step. Deadly creatures lurk nearby.' },
    { type: 'info', icon: '\u2139', title: 'HIDDEN PASSAGE', message: 'A secret entrance has been discovered.' },
  ];

  const [alertIndex, setAlertIndex] = useState(0);
  const alert = alerts[alertIndex];

  const colors = {
    danger: { bg: '#8b0000', border: '#ff4500', text: '#ff6b6b' },
    warning: { bg: '#8b4513', border: '#ffd700', text: '#ffd700' },
    info: { bg: '#2d5a27', border: '#8fbc8f', text: '#8fbc8f' },
  };

  const color = colors[alert.type as keyof typeof colors];

  return (
    <div
      className="h-full flex flex-col items-center justify-center p-8"
      style={{ background: '#0d1f0c' }}
    >
      {isVisible && (
        <div
          className="relative w-full max-w-sm rounded-lg overflow-hidden transition-all duration-300"
          style={{
            background: color.bg,
            border: `3px solid ${color.border}`,
            boxShadow: `0 0 ${20 + pulseIntensity * 20}px ${color.border}40`,
          }}
        >
          {/* Warning stripes */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 10px,
                #000 10px,
                #000 20px
              )`,
            }}
          />

          {/* Content */}
          <div className="relative p-4 flex gap-4">
            {/* Icon */}
            <div
              className="w-12 h-12 rounded flex items-center justify-center flex-shrink-0"
              style={{
                background: '#00000040',
                border: `2px solid ${color.border}`,
              }}
            >
              <span className="text-2xl" style={{ color: color.text }}>
                {alert.icon}
              </span>
            </div>

            {/* Text */}
            <div className="flex-1">
              <h4 className="font-bold text-lg" style={{ color: color.text }}>
                {alert.title}
              </h4>
              <p className="text-sm mt-1" style={{ color: '#f0e6d2' }}>
                {alert.message}
              </p>
            </div>

            {/* Close button */}
            <button
              onClick={() => setIsVisible(false)}
              className="w-6 h-6 rounded flex items-center justify-center"
              style={{ background: '#00000040', color: color.text }}
            >
              X
            </button>
          </div>

          {/* Vine decoration */}
          <div
            className="absolute bottom-0 left-0 right-0 h-2"
            style={{
              background: 'linear-gradient(90deg, #2d5a27, #8fbc8f, #2d5a27)',
              opacity: 0.6,
            }}
          />
        </div>
      )}

      {/* Controls */}
      <div className="mt-6 flex gap-2">
        {!isVisible && (
          <button
            onClick={() => setIsVisible(true)}
            className="px-4 py-2 rounded font-bold"
            style={{ background: '#8b4513', color: '#ffd700', border: '2px solid #ffd700' }}
          >
            Show Alert
          </button>
        )}
        <button
          onClick={() => setAlertIndex((alertIndex + 1) % alerts.length)}
          className="px-4 py-2 rounded"
          style={{ background: '#3d2817', color: '#8fbc8f', border: '1px solid #8b4513' }}
        >
          Change Type
        </button>
      </div>
    </div>
  );
};

// --- JUNGLE PARROT ICON ---
export const JungleParrotIcon = () => {
  const [isFlapping, setIsFlapping] = useState(false);
  const [wingAngle, setWingAngle] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);

  const colors = [
    { body: '#ff4500', wing: '#ffd700', beak: '#ff8c00' },
    { body: '#2d5a27', wing: '#8fbc8f', beak: '#ffd700' },
    { body: '#4169e1', wing: '#00bfff', beak: '#ffd700' },
    { body: '#8b008b', wing: '#ff69b4', beak: '#ffa500' },
  ];

  useEffect(() => {
    if (!isFlapping) {
      setWingAngle(0);
      return;
    }
    const interval = setInterval(() => {
      setWingAngle(a => (a === 0 ? 30 : 0));
    }, 150);
    return () => clearInterval(interval);
  }, [isFlapping]);

  const color = colors[selectedColor];

  return (
    <div
      className="h-full flex flex-col items-center justify-center p-8"
      style={{ background: '#0d1f0c' }}
    >
      {/* Parrot */}
      <div
        className="relative cursor-pointer"
        onClick={() => setIsFlapping(!isFlapping)}
        style={{
          animation: isFlapping ? 'parrotBounce 0.3s ease-in-out infinite' : 'none',
        }}
      >
        <svg width="120" height="140" viewBox="0 0 120 140">
          {/* Body */}
          <ellipse cx="60" cy="80" rx="30" ry="40" fill={color.body} />

          {/* Wing */}
          <ellipse
            cx="40"
            cy="75"
            rx="20"
            ry="30"
            fill={color.wing}
            transform={`rotate(${-wingAngle} 40 75)`}
            style={{ transition: 'transform 0.15s' }}
          />

          {/* Head */}
          <circle cx="60" cy="35" r="25" fill={color.body} />

          {/* Eye */}
          <circle cx="70" cy="30" r="8" fill="#fff" />
          <circle cx="72" cy="30" r="4" fill="#000" />
          <circle cx="73" cy="29" r="1.5" fill="#fff" />

          {/* Beak */}
          <path
            d="M85 35 L105 40 L85 50 Q90 42 85 35"
            fill={color.beak}
          />
          <path
            d="M85 42 L100 45"
            stroke="#000"
            strokeWidth="1"
            opacity="0.3"
          />

          {/* Crest feathers */}
          <path
            d="M50 15 Q45 0 55 5 Q60 0 65 10"
            stroke={color.wing}
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />

          {/* Tail feathers */}
          <path
            d="M50 120 Q40 150 45 160"
            stroke={color.body}
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M60 118 Q60 155 55 165"
            stroke={color.wing}
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M70 120 Q80 150 75 158"
            stroke={color.body}
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />

          {/* Feet */}
          <path
            d="M45 115 L40 130 M45 115 L50 130"
            stroke="#ffd700"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M75 115 L70 130 M75 115 L80 130"
            stroke="#ffd700"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Status */}
      <div className="mt-4 text-center">
        <div className="text-lg font-bold" style={{ color: color.body }}>
          {isFlapping ? 'Flying!' : 'Perched'}
        </div>
        <div className="text-xs" style={{ color: '#8fbc8f' }}>
          Click to {isFlapping ? 'land' : 'fly'}
        </div>
      </div>

      {/* Color selector */}
      <div className="flex gap-3 mt-4">
        {colors.map((c, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); setSelectedColor(i); }}
            className="w-8 h-8 rounded-full transition-transform"
            style={{
              background: c.body,
              border: `2px solid ${i === selectedColor ? '#ffd700' : '#3d2817'}`,
              transform: i === selectedColor ? 'scale(1.2)' : 'scale(1)',
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes parrotBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
};

// --- JUNGLE ANCIENT HEADING ---
export const JungleAncientHeading = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [glowPos, setGlowPos] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlowPos(p => (p + 2) % 200);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="h-full flex flex-col items-center justify-center p-8"
      style={{ background: '#0d1f0c' }}
    >
      {/* Main heading */}
      <div
        className="relative cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Stone tablet background */}
        <div
          className="relative px-12 py-8 rounded overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, #708090 0%, #505860 50%, #3d4550 100%)',
            boxShadow: isHovered
              ? '0 0 30px #ffd70040, inset 0 2px 4px rgba(255,255,255,0.1)'
              : 'inset 0 2px 4px rgba(255,255,255,0.1), inset 0 -2px 4px rgba(0,0,0,0.3)',
          }}
        >
          {/* Crack texture */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0 L25 30 L15 60 L30 100' stroke='%23000' fill='none' stroke-width='1'/%3E%3Cpath d='M70 0 L65 40 L75 70 L60 100' stroke='%23000' fill='none' stroke-width='1'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Carved text */}
          <h1
            className="relative text-4xl font-bold tracking-widest"
            style={{
              color: '#f0e6d2',
              textShadow: isHovered
                ? `3px 3px 0 #3d4550, 0 0 20px #ffd700`
                : '3px 3px 0 #3d4550, -1px -1px 0 #a0a8b0',
              fontFamily: 'serif',
            }}
          >
            ANCIENT TEMPLE
          </h1>

          {/* Glowing line effect */}
          <div
            className="absolute top-0 bottom-0 w-8 pointer-events-none"
            style={{
              left: `${glowPos - 50}%`,
              background: 'linear-gradient(90deg, transparent, #ffd70040, transparent)',
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.3s',
            }}
          />

          {/* Corner glyphs */}
          <span
            className="absolute top-2 left-2 text-xl"
            style={{ color: '#ffd700', opacity: isHovered ? 1 : 0.5 }}
          >
            {'\u25C4'}
          </span>
          <span
            className="absolute top-2 right-2 text-xl"
            style={{ color: '#ffd700', opacity: isHovered ? 1 : 0.5 }}
          >
            {'\u25BA'}
          </span>
          <span
            className="absolute bottom-2 left-2 text-xl"
            style={{ color: '#ffd700', opacity: isHovered ? 1 : 0.5 }}
          >
            {'\u25C4'}
          </span>
          <span
            className="absolute bottom-2 right-2 text-xl"
            style={{ color: '#ffd700', opacity: isHovered ? 1 : 0.5 }}
          >
            {'\u25BA'}
          </span>

          {/* Moss on edges */}
          <div
            className="absolute bottom-0 left-0 right-0 h-2"
            style={{
              background: 'linear-gradient(90deg, #2d5a27, #8fbc8f60, #2d5a27)',
              opacity: 0.6,
            }}
          />
        </div>

        {/* Subtitle */}
        <div className="text-center mt-4">
          <span
            className="text-sm tracking-[0.3em]"
            style={{
              color: isHovered ? '#ffd700' : '#8fbc8f',
              transition: 'color 0.3s',
            }}
          >
            EST. 2000 BCE
          </span>
        </div>
      </div>
    </div>
  );
};

// --- JUNGLE DEPTH SLIDER ---
export const JungleDepthSlider = () => {
  const [depth, setDepth] = useState(30);
  const [isDragging, setIsDragging] = useState(false);

  const depthLevels = [
    { range: [0, 25], name: 'Canopy', color: '#8fbc8f', desc: 'Sunlight filters through leaves' },
    { range: [25, 50], name: 'Understory', color: '#2d5a27', desc: 'Dense vegetation surrounds you' },
    { range: [50, 75], name: 'Temple Entrance', color: '#708090', desc: 'Ancient stones emerge from vines' },
    { range: [75, 100], name: 'Inner Sanctum', color: '#ffd700', desc: 'Golden treasures gleam in darkness' },
  ];

  const currentLevel = depthLevels.find(
    l => depth >= l.range[0] && depth < l.range[1]
  ) || depthLevels[3];

  return (
    <div
      className="h-full flex flex-col items-center justify-center p-8"
      style={{ background: '#0d1f0c' }}
    >
      {/* Depth visualization */}
      <div
        className="relative w-16 h-64 rounded-lg overflow-hidden mb-6"
        style={{
          background: 'linear-gradient(180deg, #8fbc8f 0%, #2d5a27 25%, #708090 50%, #505860 75%, #3d2817 100%)',
          border: '3px solid #8b4513',
        }}
      >
        {/* Depth indicator */}
        <div
          className="absolute left-0 right-0 h-4 flex items-center justify-center transition-all duration-200"
          style={{
            top: `${depth}%`,
            transform: 'translateY(-50%)',
          }}
        >
          <div
            className="w-full h-1 rounded"
            style={{
              background: '#ffd700',
              boxShadow: '0 0 10px #ffd700',
            }}
          />
          <div
            className="absolute -right-8 text-xs font-bold"
            style={{ color: '#ffd700' }}
          >
            {depth}m
          </div>
        </div>

        {/* Level markers */}
        {depthLevels.map((level, i) => (
          <div
            key={i}
            className="absolute left-0 right-0 border-t border-[#ffffff30] text-[8px] text-right pr-1"
            style={{ top: `${level.range[0]}%`, color: '#f0e6d2' }}
          >
            {level.name}
          </div>
        ))}
      </div>

      {/* Slider control */}
      <div className="w-64">
        <input
          type="range"
          min="0"
          max="100"
          value={depth}
          onChange={(e) => setDepth(Number(e.target.value))}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          className="w-full cursor-pointer"
          style={{
            accentColor: currentLevel.color,
          }}
        />
      </div>

      {/* Current level info */}
      <div
        className="mt-6 p-4 rounded text-center w-64 transition-all duration-300"
        style={{
          background: '#1a3d18',
          border: `2px solid ${currentLevel.color}`,
          boxShadow: isDragging ? `0 0 15px ${currentLevel.color}40` : 'none',
        }}
      >
        <div className="font-bold text-lg" style={{ color: currentLevel.color }}>
          {currentLevel.name}
        </div>
        <div className="text-sm mt-1" style={{ color: '#8fbc8f' }}>
          {currentLevel.desc}
        </div>
      </div>
    </div>
  );
};

// --- JUNGLE CHAMBER TABS ---
export const JungleChamberTabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const chambers = [
    { name: 'Hall of Kings', icon: '\u265A', content: 'Ancient rulers once held court in this grand chamber. Their stone thrones still stand.' },
    { name: 'Treasury', icon: '\u2B50', content: 'Gold and jewels glitter in the torchlight. Untold riches accumulated over centuries.' },
    { name: 'Observatory', icon: '\u263C', content: 'Carved star maps cover the ceiling. The ancients tracked celestial movements here.' },
    { name: 'Sanctum', icon: '\u2625', content: 'The most sacred space. Only high priests were permitted to enter these halls.' },
  ];

  return (
    <div
      className="h-full flex flex-col items-center justify-center p-6"
      style={{ background: '#0d1f0c' }}
    >
      <div className="w-full max-w-md">
        {/* Tab headers - styled as temple entrances */}
        <div className="flex gap-1">
          {chambers.map((chamber, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className="flex-1 relative transition-all duration-300"
              style={{
                transform: activeTab === i ? 'translateY(-4px)' : 'translateY(0)',
              }}
            >
              {/* Door frame */}
              <div
                className="pt-6 pb-4 rounded-t-lg flex flex-col items-center transition-all"
                style={{
                  background: activeTab === i
                    ? 'linear-gradient(180deg, #8b4513 0%, #5a2d0a 100%)'
                    : 'linear-gradient(180deg, #505860 0%, #3d4550 100%)',
                  border: `2px solid ${activeTab === i ? '#ffd700' : '#3d4550'}`,
                  borderBottom: activeTab === i ? '2px solid #5a2d0a' : '2px solid #3d4550',
                  boxShadow: activeTab === i
                    ? 'inset 0 0 20px #ffd70020, 0 -4px 10px #00000040'
                    : 'none',
                }}
              >
                {/* Entrance arch */}
                <div
                  className="w-8 h-10 rounded-t-full flex items-center justify-center"
                  style={{
                    background: activeTab === i ? '#0d1f0c' : '#2d2d2d',
                    border: `2px solid ${activeTab === i ? '#ffd700' : '#505860'}`,
                  }}
                >
                  <span
                    className="text-lg"
                    style={{
                      color: activeTab === i ? '#ffd700' : '#708090',
                    }}
                  >
                    {chamber.icon}
                  </span>
                </div>

                {/* Chamber name */}
                <span
                  className="text-[10px] mt-2 text-center leading-tight"
                  style={{
                    color: activeTab === i ? '#ffd700' : '#a0a8b0',
                  }}
                >
                  {chamber.name}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Content panel - styled as chamber interior */}
        <div
          className="p-6 rounded-b-lg relative"
          style={{
            background: 'linear-gradient(180deg, #3d2817 0%, #2d1810 100%)',
            border: '3px solid #8b4513',
            borderTop: 'none',
            boxShadow: 'inset 0 0 30px rgba(0,0,0,0.5)',
          }}
        >
          {/* Torch glow effect */}
          <div
            className="absolute top-0 left-4 w-8 h-8 rounded-full"
            style={{
              background: 'radial-gradient(circle, #ffd70040 0%, transparent 70%)',
            }}
          />
          <div
            className="absolute top-0 right-4 w-8 h-8 rounded-full"
            style={{
              background: 'radial-gradient(circle, #ffd70040 0%, transparent 70%)',
            }}
          />

          {/* Content */}
          <div className="relative">
            <h3 className="text-xl font-bold mb-3" style={{ color: '#ffd700' }}>
              {chambers[activeTab].name}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: '#c0b8a0' }}>
              {chambers[activeTab].content}
            </p>
          </div>

          {/* Stone floor pattern */}
          <div
            className="absolute bottom-0 left-0 right-0 h-4 opacity-30"
            style={{
              background: 'repeating-linear-gradient(90deg, #708090, #708090 20px, #505860 20px, #505860 40px)',
            }}
          />
        </div>
      </div>
    </div>
  );
};

// --- JUNGLE FOLIAGE BACKGROUND ---
export const JungleFoliageBackground = () => {
  const [layerOffset, setLayerOffset] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (!isAnimating) return;
    const interval = setInterval(() => {
      setLayerOffset(o => (o + 0.5) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, [isAnimating]);

  return (
    <div className="h-full relative overflow-hidden" style={{ background: '#0a1a08' }}>
      {/* Background layer - distant trees */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(180deg, #0d1f0c 0%, #1a3d18 100%),
            radial-gradient(ellipse at 20% 50%, #2d5a2740 0%, transparent 50%),
            radial-gradient(ellipse at 80% 60%, #2d5a2740 0%, transparent 50%)
          `,
        }}
      />

      {/* Mid layer - palm fronds */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{
          transform: `translateX(${Math.sin(layerOffset * 0.05) * 5}px)`,
        }}
      >
        {/* Left frond cluster */}
        <g transform="translate(-50, 0)">
          {[0, 1, 2].map((i) => (
            <path
              key={`left-${i}`}
              d={`M0 ${100 + i * 30} Q100 ${80 + i * 20} 180 ${120 + i * 25}`}
              stroke="#2d5a27"
              strokeWidth={8 - i * 2}
              fill="none"
              opacity={0.8 - i * 0.2}
            />
          ))}
        </g>

        {/* Right frond cluster */}
        <g transform="translate(100%, 0) scale(-1, 1)">
          {[0, 1, 2].map((i) => (
            <path
              key={`right-${i}`}
              d={`M0 ${80 + i * 40} Q80 ${60 + i * 30} 150 ${100 + i * 35}`}
              stroke="#2d5a27"
              strokeWidth={8 - i * 2}
              fill="none"
              opacity={0.8 - i * 0.2}
            />
          ))}
        </g>

        {/* Bottom ferns */}
        {[0, 1, 2, 3, 4].map((i) => (
          <ellipse
            key={`fern-${i}`}
            cx={60 + i * 100}
            cy="100%"
            rx="60"
            ry="40"
            fill="#1a3d18"
            transform={`translate(0, -20) rotate(${-15 + i * 8})`}
          />
        ))}
      </svg>

      {/* Foreground layer - large leaves */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translateX(${Math.sin(layerOffset * 0.08) * 10}px)`,
        }}
      >
        {/* Top left large leaf */}
        <div
          className="absolute -top-10 -left-20 w-64 h-64"
          style={{
            background: 'radial-gradient(ellipse at 100% 100%, #8fbc8f 0%, #2d5a27 40%, transparent 70%)',
            transform: 'rotate(-30deg)',
          }}
        />

        {/* Top right leaf */}
        <div
          className="absolute -top-5 -right-16 w-56 h-48"
          style={{
            background: 'radial-gradient(ellipse at 0% 100%, #8fbc8f 0%, #2d5a27 40%, transparent 70%)',
            transform: 'rotate(25deg)',
          }}
        />

        {/* Bottom decorative leaves */}
        <div
          className="absolute -bottom-10 left-10 w-48 h-32"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, #8fbc8f90 0%, transparent 60%)',
          }}
        />
      </div>

      {/* Vines hanging */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {[20, 45, 70, 90].map((x, i) => (
          <path
            key={`vine-${i}`}
            d={`M${x}% 0 Q${x + 5}% 30% ${x - 3}% 60% T${x + 2}% 100%`}
            stroke="#2d5a27"
            strokeWidth="3"
            fill="none"
            opacity={0.6}
            style={{
              transform: `translateX(${Math.sin((layerOffset + i * 20) * 0.1) * 3}px)`,
            }}
          />
        ))}
      </svg>

      {/* Content area */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="px-8 py-6 rounded-lg text-center"
          style={{
            background: 'rgba(13, 31, 12, 0.9)',
            border: '2px solid #8fbc8f40',
            boxShadow: '0 0 30px rgba(45, 90, 39, 0.3)',
          }}
        >
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#8fbc8f' }}>
            JUNGLE DEPTHS
          </h2>
          <p className="text-sm" style={{ color: '#6b8b6b' }}>
            Dense foliage conceals ancient secrets
          </p>
          <button
            onClick={() => setIsAnimating(!isAnimating)}
            className="mt-4 px-4 py-2 rounded text-sm"
            style={{
              background: '#2d5a27',
              color: '#8fbc8f',
              border: '1px solid #8fbc8f',
            }}
          >
            {isAnimating ? 'Pause Breeze' : 'Resume Breeze'}
          </button>
        </div>
      </div>

      {/* Light rays */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: `
            linear-gradient(180deg,
              rgba(255, 215, 0, 0.1) 0%,
              transparent 30%
            ),
            repeating-linear-gradient(
              150deg,
              transparent 0px,
              transparent 100px,
              rgba(255, 215, 0, 0.05) 100px,
              rgba(255, 215, 0, 0.05) 102px
            )
          `,
        }}
      />
    </div>
  );
};

// Export all components
export const jungleTempleComponents: Record<string, React.FC> = {
  'jungle-stone-button': JungleStoneButton,
  'jungle-ruin-card': JungleRuinCard,
  'jungle-vine-input': JungleVineInput,
  'jungle-glyph-badge': JungleGlyphBadge,
  'jungle-torch-toggle': JungleTorchToggle,
  'jungle-treasure-progress': JungleTreasureProgress,
  'jungle-idol-loader': JungleIdolLoader,
  'jungle-mask-avatar': JungleMaskAvatar,
  'jungle-gate-modal': JungleGateModal,
  'jungle-trail-nav': JungleTrailNav,
  'jungle-root-divider': JungleRootDivider,
  'jungle-danger-alert': JungleDangerAlert,
  'jungle-parrot-icon': JungleParrotIcon,
  'jungle-ancient-heading': JungleAncientHeading,
  'jungle-depth-slider': JungleDepthSlider,
  'jungle-chamber-tabs': JungleChamberTabs,
  'jungle-foliage-background': JungleFoliageBackground,
};
