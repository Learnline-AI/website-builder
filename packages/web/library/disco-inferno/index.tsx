import React, { useState, useEffect } from 'react';

// Disco Colors
const DISCO_COLORS = {
  hotPink: '#ff1493',
  electricBlue: '#00d4ff',
  gold: '#ffd700',
  purple: '#9400d3',
  orange: '#ff6b00',
};

// --- DISCO MIRRORBALL BUTTON ---
export const DiscoMirrorballButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [sparkles, setSparkles] = useState<{ x: number; y: number; delay: number }[]>([]);

  useEffect(() => {
    const newSparkles = [...Array(20)].map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    setSparkles(newSparkles);
  }, []);

  return (
    <div className="h-full flex items-center justify-center p-8" style={{ background: 'linear-gradient(180deg, #1a0a2e 0%, #0d0d1a 100%)' }}>
      <button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { setIsHovered(false); setIsPressed(false); }}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        className="relative px-10 py-5 font-bold text-xl tracking-widest overflow-hidden rounded-full"
        style={{
          background: isPressed
            ? 'linear-gradient(135deg, #ff1493 0%, #9400d3 50%, #00d4ff 100%)'
            : 'linear-gradient(135deg, #9400d3 0%, #ff1493 50%, #ffd700 100%)',
          color: '#fff',
          boxShadow: isHovered
            ? '0 0 40px #ff1493, 0 0 80px #9400d3, inset 0 0 30px rgba(255,255,255,0.3)'
            : '0 0 20px #ff149380, 0 0 40px #9400d380',
          transform: isPressed ? 'scale(0.95)' : isHovered ? 'scale(1.05)' : 'scale(1)',
          transition: 'all 0.2s ease',
          textShadow: '0 0 10px #fff, 0 0 20px #ff1493',
          fontFamily: '"Brush Script MT", cursive',
        }}
      >
        {/* Mirror ball sparkles */}
        {sparkles.map((sparkle, i) => (
          <span
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-white pointer-events-none"
            style={{
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
              opacity: isHovered ? 1 : 0.3,
              animation: `mirrorSparkle 1.5s ease-in-out infinite`,
              animationDelay: `${sparkle.delay}s`,
              boxShadow: '0 0 6px #fff, 0 0 12px #ffd700',
            }}
          />
        ))}

        {/* Reflective shine */}
        <span
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.4) 50%, transparent 60%)',
            transform: isHovered ? 'translateX(100%)' : 'translateX(-100%)',
            transition: 'transform 0.5s ease',
          }}
        />

        <span className="relative z-10">Boogie Down</span>
      </button>

      <style>{`
        @keyframes mirrorSparkle {
          0%, 100% { transform: scale(0.5); opacity: 0.3; }
          50% { transform: scale(1.5); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

// --- DISCO DANCEFLOOR CARD ---
export const DiscoDancefloorCard = () => {
  const [activeTiles, setActiveTiles] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newActive = [...Array(6)].map(() => Math.floor(Math.random() * 16));
      setActiveTiles(newActive);
    }, 300);
    return () => clearInterval(interval);
  }, []);

  const tileColors = [DISCO_COLORS.hotPink, DISCO_COLORS.electricBlue, DISCO_COLORS.gold, DISCO_COLORS.purple, DISCO_COLORS.orange];

  return (
    <div className="h-full flex items-center justify-center p-8" style={{ background: '#1a0a2e' }}>
      <div
        className="relative w-72 rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #2d1b4e 0%, #1a0a2e 100%)',
          border: '3px solid #ffd700',
          boxShadow: '0 0 30px #ff149380, 0 0 60px #9400d340',
        }}
      >
        {/* Dance floor tiles header */}
        <div className="grid grid-cols-4 gap-0.5 p-2 bg-black/50">
          {[...Array(16)].map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-sm transition-all duration-200"
              style={{
                background: activeTiles.includes(i)
                  ? tileColors[i % tileColors.length]
                  : '#1a0a2e',
                boxShadow: activeTiles.includes(i)
                  ? `0 0 15px ${tileColors[i % tileColors.length]}, inset 0 0 10px rgba(255,255,255,0.3)`
                  : 'none',
              }}
            />
          ))}
        </div>

        {/* Card content */}
        <div className="p-5">
          <h3
            className="text-2xl font-bold mb-2"
            style={{
              fontFamily: '"Brush Script MT", cursive',
              color: DISCO_COLORS.gold,
              textShadow: `0 0 10px ${DISCO_COLORS.gold}`,
            }}
          >
            Saturday Night
          </h3>
          <p className="text-sm text-purple-300 mb-4">Get down on it! The groove never stops at Studio 54.</p>

          {/* Stats */}
          <div className="flex justify-between text-xs">
            <div className="text-center">
              <div className="text-2xl" style={{ color: DISCO_COLORS.hotPink }}>127</div>
              <div className="text-purple-400">BPM</div>
            </div>
            <div className="text-center">
              <div className="text-2xl" style={{ color: DISCO_COLORS.electricBlue }}>1977</div>
              <div className="text-purple-400">Year</div>
            </div>
            <div className="text-center">
              <div className="text-2xl" style={{ color: DISCO_COLORS.gold }}>4:32</div>
              <div className="text-purple-400">Length</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- DISCO GROOVY INPUT ---
export const DiscoGroovyInput = () => {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-8" style={{ background: '#1a0a2e' }}>
      <div className="relative w-72">
        {/* Label */}
        <label
          className="block text-sm mb-2 tracking-wider"
          style={{
            fontFamily: '"Brush Script MT", cursive',
            fontSize: '1.2rem',
            color: DISCO_COLORS.gold,
            textShadow: `0 0 10px ${DISCO_COLORS.gold}`,
          }}
        >
          Groove Name
        </label>

        {/* Input wrapper with wavy border */}
        <div
          className="relative overflow-hidden rounded-full"
          style={{
            padding: '3px',
            background: isFocused
              ? `linear-gradient(90deg, ${DISCO_COLORS.hotPink}, ${DISCO_COLORS.gold}, ${DISCO_COLORS.electricBlue}, ${DISCO_COLORS.purple}, ${DISCO_COLORS.hotPink})`
              : 'linear-gradient(90deg, #9400d380, #ff149380)',
            backgroundSize: '200% 100%',
            animation: isFocused ? 'rainbowBorder 2s linear infinite' : 'none',
          }}
        >
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Enter your disco name..."
            className="w-full px-5 py-3 rounded-full outline-none text-white placeholder-purple-400"
            style={{
              background: '#1a0a2e',
              fontFamily: 'Arial, sans-serif',
            }}
          />
        </div>

        {/* Wavy underline decoration */}
        <svg className="absolute -bottom-4 left-0 w-full h-4" viewBox="0 0 200 20">
          <path
            d="M0 10 Q25 0 50 10 T100 10 T150 10 T200 10"
            fill="none"
            stroke={isFocused ? DISCO_COLORS.gold : DISCO_COLORS.purple}
            strokeWidth="2"
            style={{
              filter: isFocused ? `drop-shadow(0 0 5px ${DISCO_COLORS.gold})` : 'none',
            }}
          />
        </svg>
      </div>

      <style>{`
        @keyframes rainbowBorder {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>
    </div>
  );
};

// --- DISCO VINYL BADGE ---
export const DiscoVinylBadge = () => {
  const [isSpinning, setIsSpinning] = useState(true);

  return (
    <div className="h-full flex items-center justify-center p-8" style={{ background: '#1a0a2e' }}>
      <div
        className="relative w-32 h-32 cursor-pointer"
        onClick={() => setIsSpinning(!isSpinning)}
      >
        {/* Vinyl record */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `
              radial-gradient(circle at center,
                #1a1a1a 0%,
                #1a1a1a 15%,
                ${DISCO_COLORS.hotPink} 15.5%,
                ${DISCO_COLORS.hotPink} 16%,
                #1a1a1a 16.5%,
                #1a1a1a 30%,
                ${DISCO_COLORS.purple} 30.5%,
                ${DISCO_COLORS.purple} 31%,
                #1a1a1a 31.5%,
                #1a1a1a 45%,
                ${DISCO_COLORS.electricBlue} 45.5%,
                ${DISCO_COLORS.electricBlue} 46%,
                #1a1a1a 46.5%,
                #1a1a1a 100%
              )
            `,
            animation: isSpinning ? 'vinylSpin 2s linear infinite' : 'none',
            boxShadow: '0 0 20px rgba(0,0,0,0.5), 0 0 40px #ff149340',
          }}
        >
          {/* Center label */}
          <div
            className="absolute rounded-full flex items-center justify-center"
            style={{
              top: '30%',
              left: '30%',
              width: '40%',
              height: '40%',
              background: `linear-gradient(135deg, ${DISCO_COLORS.gold} 0%, ${DISCO_COLORS.orange} 100%)`,
              boxShadow: `0 0 15px ${DISCO_COLORS.gold}`,
            }}
          >
            <span className="text-[10px] font-bold text-black text-center leading-tight">
              DISCO
              <br />
              FEVER
            </span>
          </div>

          {/* Center hole */}
          <div
            className="absolute rounded-full bg-[#1a0a2e]"
            style={{
              top: '46%',
              left: '46%',
              width: '8%',
              height: '8%',
            }}
          />
        </div>

        {/* Reflection shine */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)',
          }}
        />
      </div>

      <style>{`
        @keyframes vinylSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

// --- DISCO LAVA LAMP TOGGLE ---
export const DiscoLavaLampToggle = () => {
  const [isOn, setIsOn] = useState(false);
  const [blobs, setBlobs] = useState<{ y: number; size: number; delay: number }[]>([]);

  useEffect(() => {
    const newBlobs = [...Array(5)].map(() => ({
      y: Math.random() * 100,
      size: 15 + Math.random() * 20,
      delay: Math.random() * 3,
    }));
    setBlobs(newBlobs);
  }, []);

  return (
    <div className="h-full flex items-center justify-center p-8" style={{ background: '#1a0a2e' }}>
      <div className="flex items-center gap-6">
        <span
          className="text-lg"
          style={{
            fontFamily: '"Brush Script MT", cursive',
            color: isOn ? DISCO_COLORS.gold : '#666',
            textShadow: isOn ? `0 0 10px ${DISCO_COLORS.gold}` : 'none',
          }}
        >
          Groovy Mode
        </span>

        <button
          onClick={() => setIsOn(!isOn)}
          className="relative w-20 h-36 rounded-full overflow-hidden transition-all duration-500"
          style={{
            background: isOn
              ? `linear-gradient(180deg, ${DISCO_COLORS.purple}40 0%, ${DISCO_COLORS.hotPink}60 100%)`
              : '#2a1a3e',
            border: `3px solid ${isOn ? DISCO_COLORS.gold : '#444'}`,
            boxShadow: isOn ? `0 0 30px ${DISCO_COLORS.hotPink}60` : 'none',
          }}
        >
          {/* Lava blobs */}
          {blobs.map((blob, i) => (
            <div
              key={i}
              className="absolute rounded-full transition-all duration-1000"
              style={{
                left: '50%',
                transform: 'translateX(-50%)',
                width: `${blob.size}px`,
                height: `${blob.size * 1.3}px`,
                background: isOn
                  ? `radial-gradient(circle, ${DISCO_COLORS.orange} 0%, ${DISCO_COLORS.hotPink} 100%)`
                  : '#3a2a4e',
                bottom: isOn ? `${blob.y}%` : '5%',
                opacity: isOn ? 0.9 : 0.3,
                animation: isOn ? `lavaFloat 3s ease-in-out infinite` : 'none',
                animationDelay: `${blob.delay}s`,
                filter: isOn ? `blur(2px) drop-shadow(0 0 10px ${DISCO_COLORS.hotPink})` : 'none',
                borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
              }}
            />
          ))}

          {/* Toggle indicator */}
          <div
            className="absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full transition-all duration-500"
            style={{
              bottom: isOn ? '70%' : '10%',
              background: isOn ? DISCO_COLORS.gold : '#555',
              boxShadow: isOn ? `0 0 15px ${DISCO_COLORS.gold}` : 'none',
            }}
          />
        </button>
      </div>

      <style>{`
        @keyframes lavaFloat {
          0%, 100% { transform: translateX(-50%) translateY(0) scale(1); }
          50% { transform: translateX(-50%) translateY(-20px) scale(1.1); }
        }
      `}</style>
    </div>
  );
};

// --- DISCO EQUALIZER PROGRESS ---
export const DiscoEqualizerProgress = () => {
  const [progress, setProgress] = useState(65);
  const [bars, setBars] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBars([...Array(12)].map(() => 30 + Math.random() * 70));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const barColors = [DISCO_COLORS.hotPink, DISCO_COLORS.purple, DISCO_COLORS.electricBlue, DISCO_COLORS.gold, DISCO_COLORS.orange];

  return (
    <div className="h-full flex flex-col items-center justify-center p-8" style={{ background: '#1a0a2e' }}>
      <div className="w-72">
        {/* Label */}
        <div className="flex justify-between mb-3">
          <span
            style={{
              fontFamily: '"Brush Script MT", cursive',
              fontSize: '1.3rem',
              color: DISCO_COLORS.gold,
              textShadow: `0 0 10px ${DISCO_COLORS.gold}`,
            }}
          >
            Funky Level
          </span>
          <span className="text-white font-bold">{progress}%</span>
        </div>

        {/* Equalizer bars */}
        <div className="flex items-end gap-1 h-16 mb-2 p-2 rounded-lg" style={{ background: '#0d0d1a' }}>
          {bars.map((height, i) => {
            const isActive = (i / bars.length) * 100 <= progress;
            return (
              <div
                key={i}
                className="flex-1 rounded-t transition-all duration-100"
                style={{
                  height: `${isActive ? height : 20}%`,
                  background: isActive
                    ? `linear-gradient(180deg, ${barColors[i % barColors.length]} 0%, ${barColors[(i + 1) % barColors.length]} 100%)`
                    : '#2a1a3e',
                  boxShadow: isActive ? `0 0 10px ${barColors[i % barColors.length]}` : 'none',
                }}
              />
            );
          })}
        </div>

        {/* Slider */}
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={(e) => setProgress(Number(e.target.value))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(90deg, ${DISCO_COLORS.hotPink} 0%, ${DISCO_COLORS.gold} ${progress}%, #2a1a3e ${progress}%)`,
          }}
        />
      </div>
    </div>
  );
};

// --- DISCO STROBE LOADER ---
export const DiscoStrobeLoader = () => {
  const [strobeIndex, setStrobeIndex] = useState(0);
  const strobeColors = [DISCO_COLORS.hotPink, DISCO_COLORS.electricBlue, DISCO_COLORS.gold, DISCO_COLORS.purple, DISCO_COLORS.orange, '#fff'];

  useEffect(() => {
    const interval = setInterval(() => {
      setStrobeIndex((prev) => (prev + 1) % strobeColors.length);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="h-full flex flex-col items-center justify-center p-8 transition-colors duration-75"
      style={{ background: `${strobeColors[strobeIndex]}15` }}
    >
      <div className="relative">
        {/* Outer ring */}
        <div
          className="w-24 h-24 rounded-full border-4 animate-spin"
          style={{
            borderColor: `${strobeColors[strobeIndex]} transparent ${strobeColors[(strobeIndex + 2) % strobeColors.length]} transparent`,
            boxShadow: `0 0 30px ${strobeColors[strobeIndex]}80`,
            animationDuration: '1s',
          }}
        />

        {/* Middle ring */}
        <div
          className="absolute inset-2 rounded-full border-4 animate-spin"
          style={{
            borderColor: `transparent ${strobeColors[(strobeIndex + 1) % strobeColors.length]} transparent ${strobeColors[(strobeIndex + 3) % strobeColors.length]}`,
            animationDuration: '0.75s',
            animationDirection: 'reverse',
          }}
        />

        {/* Inner ring */}
        <div
          className="absolute inset-4 rounded-full border-4 animate-spin"
          style={{
            borderColor: `${strobeColors[(strobeIndex + 2) % strobeColors.length]} transparent ${strobeColors[(strobeIndex + 4) % strobeColors.length]} transparent`,
            animationDuration: '0.5s',
          }}
        />

        {/* Center dot */}
        <div
          className="absolute inset-0 m-auto w-4 h-4 rounded-full"
          style={{
            background: strobeColors[strobeIndex],
            boxShadow: `0 0 20px ${strobeColors[strobeIndex]}`,
          }}
        />
      </div>

      <p
        className="mt-6 text-lg tracking-wider animate-pulse"
        style={{
          fontFamily: '"Brush Script MT", cursive',
          color: strobeColors[strobeIndex],
          textShadow: `0 0 10px ${strobeColors[strobeIndex]}`,
        }}
      >
        Getting Funky...
      </p>
    </div>
  );
};

// --- DISCO AFRO AVATAR ---
export const DiscoAfroAvatar = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-8" style={{ background: '#1a0a2e' }}>
      <div
        className="relative cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Afro silhouette */}
        <div
          className="relative w-32 h-36 transition-transform duration-300"
          style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}
        >
          {/* Afro hair */}
          <svg viewBox="0 0 100 110" className="absolute inset-0 w-full h-full">
            <defs>
              <radialGradient id="afroGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={DISCO_COLORS.purple} />
                <stop offset="100%" stopColor="#1a0a2e" />
              </radialGradient>
              <filter id="afroGlow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Afro shape */}
            <ellipse
              cx="50"
              cy="40"
              rx="45"
              ry="38"
              fill="url(#afroGradient)"
              stroke={isHovered ? DISCO_COLORS.gold : DISCO_COLORS.hotPink}
              strokeWidth="3"
              filter="url(#afroGlow)"
            />

            {/* Face area */}
            <ellipse
              cx="50"
              cy="55"
              rx="22"
              ry="28"
              fill="#8b6914"
            />

            {/* Sunglasses */}
            <rect x="30" y="45" width="16" height="10" rx="2" fill={DISCO_COLORS.hotPink} />
            <rect x="54" y="45" width="16" height="10" rx="2" fill={DISCO_COLORS.hotPink} />
            <line x1="46" y1="50" x2="54" y2="50" stroke={DISCO_COLORS.gold} strokeWidth="2" />

            {/* Smile */}
            <path
              d="M40 65 Q50 72 60 65"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>

          {/* Sparkles around afro */}
          {isHovered && [...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${50 + 45 * Math.cos((i * Math.PI * 2) / 8)}%`,
                top: `${40 + 35 * Math.sin((i * Math.PI * 2) / 8)}%`,
                background: [DISCO_COLORS.hotPink, DISCO_COLORS.gold, DISCO_COLORS.electricBlue][i % 3],
                animation: 'sparkleFloat 1s ease-in-out infinite',
                animationDelay: `${i * 0.1}s`,
                boxShadow: `0 0 10px ${[DISCO_COLORS.hotPink, DISCO_COLORS.gold, DISCO_COLORS.electricBlue][i % 3]}`,
              }}
            />
          ))}
        </div>

        {/* Name badge */}
        <div
          className="mt-4 text-center px-4 py-1 rounded-full"
          style={{
            background: `linear-gradient(90deg, ${DISCO_COLORS.hotPink}, ${DISCO_COLORS.purple})`,
            boxShadow: `0 0 15px ${DISCO_COLORS.hotPink}60`,
          }}
        >
          <span className="text-white text-sm font-bold">Funky Fred</span>
        </div>
      </div>

      <style>{`
        @keyframes sparkleFloat {
          0%, 100% { transform: scale(1) translateY(0); opacity: 1; }
          50% { transform: scale(1.5) translateY(-5px); opacity: 0.7; }
        }
      `}</style>
    </div>
  );
};

// --- DISCO CURTAIN MODAL ---
export const DiscoCurtainModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-8" style={{ background: '#1a0a2e' }}>
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 rounded-full font-bold tracking-wider transition-all duration-300"
        style={{
          background: `linear-gradient(135deg, ${DISCO_COLORS.gold} 0%, ${DISCO_COLORS.orange} 100%)`,
          color: '#000',
          boxShadow: `0 0 20px ${DISCO_COLORS.gold}60`,
        }}
      >
        Open the Curtains!
      </button>

      {/* Modal overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={() => setIsOpen(false)}
        >
          {/* Left curtain */}
          <div
            className="absolute top-0 bottom-0 left-0 w-1/2"
            style={{
              background: `linear-gradient(90deg, ${DISCO_COLORS.purple} 0%, ${DISCO_COLORS.hotPink} 100%)`,
              animation: 'curtainLeft 0.8s ease-out forwards',
              transformOrigin: 'left',
            }}
          >
            {/* Sparkle pattern */}
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-white"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: 'twinkle 1s ease-in-out infinite',
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>

          {/* Right curtain */}
          <div
            className="absolute top-0 bottom-0 right-0 w-1/2"
            style={{
              background: `linear-gradient(270deg, ${DISCO_COLORS.purple} 0%, ${DISCO_COLORS.hotPink} 100%)`,
              animation: 'curtainRight 0.8s ease-out forwards',
              transformOrigin: 'right',
            }}
          >
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-white"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: 'twinkle 1s ease-in-out infinite',
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>

          {/* Modal content */}
          <div
            className="relative z-10 bg-[#2d1b4e] rounded-2xl p-8 max-w-sm mx-4"
            style={{
              border: `3px solid ${DISCO_COLORS.gold}`,
              boxShadow: `0 0 50px ${DISCO_COLORS.gold}40, 0 0 100px ${DISCO_COLORS.hotPink}30`,
              animation: 'modalPop 0.5s ease-out 0.3s both',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              className="text-3xl text-center mb-4"
              style={{
                fontFamily: '"Brush Script MT", cursive',
                color: DISCO_COLORS.gold,
                textShadow: `0 0 20px ${DISCO_COLORS.gold}`,
              }}
            >
              Welcome to the Party!
            </h2>
            <p className="text-purple-200 text-center mb-6">
              The disco is now open. Get ready to boogie all night long!
            </p>
            <button
              onClick={() => setIsOpen(false)}
              className="w-full py-3 rounded-full font-bold"
              style={{
                background: `linear-gradient(90deg, ${DISCO_COLORS.hotPink}, ${DISCO_COLORS.purple})`,
                color: '#fff',
              }}
            >
              Let's Dance!
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes curtainLeft {
          from { transform: scaleX(1); }
          to { transform: scaleX(0); }
        }
        @keyframes curtainRight {
          from { transform: scaleX(1); }
          to { transform: scaleX(0); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        @keyframes modalPop {
          from { transform: scale(0.5); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

// --- DISCO JUKEBOX NAV ---
export const DiscoJukeboxNav = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navItems = [
    { label: 'A1', title: 'Stayin Alive' },
    { label: 'B2', title: 'Night Fever' },
    { label: 'C3', title: 'Boogie Nights' },
    { label: 'D4', title: 'Le Freak' },
  ];

  return (
    <div className="h-full flex items-center justify-center p-8" style={{ background: '#1a0a2e' }}>
      <div
        className="relative p-6 rounded-3xl"
        style={{
          background: 'linear-gradient(180deg, #3d2b5e 0%, #1a0a2e 100%)',
          border: `4px solid ${DISCO_COLORS.gold}`,
          boxShadow: `0 0 30px ${DISCO_COLORS.gold}40, inset 0 0 30px rgba(0,0,0,0.5)`,
        }}
      >
        {/* Jukebox header */}
        <div
          className="text-center mb-4 pb-3"
          style={{ borderBottom: `2px solid ${DISCO_COLORS.hotPink}40` }}
        >
          <span
            className="text-2xl"
            style={{
              fontFamily: '"Brush Script MT", cursive',
              color: DISCO_COLORS.gold,
              textShadow: `0 0 10px ${DISCO_COLORS.gold}`,
            }}
          >
            Select Your Groove
          </span>
        </div>

        {/* Navigation buttons */}
        <div className="space-y-2">
          {navItems.map((item, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className="w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200"
              style={{
                background: activeIndex === i
                  ? `linear-gradient(90deg, ${DISCO_COLORS.hotPink}40, ${DISCO_COLORS.purple}40)`
                  : 'transparent',
                border: `2px solid ${activeIndex === i ? DISCO_COLORS.gold : '#444'}`,
                boxShadow: activeIndex === i ? `0 0 15px ${DISCO_COLORS.hotPink}40` : 'none',
              }}
            >
              {/* Selection code */}
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold"
                style={{
                  background: activeIndex === i
                    ? `linear-gradient(135deg, ${DISCO_COLORS.gold}, ${DISCO_COLORS.orange})`
                    : '#2a1a3e',
                  color: activeIndex === i ? '#000' : '#888',
                  boxShadow: activeIndex === i ? `0 0 10px ${DISCO_COLORS.gold}` : 'none',
                }}
              >
                {item.label}
              </div>

              {/* Track title */}
              <span
                className="text-left flex-1"
                style={{
                  color: activeIndex === i ? '#fff' : '#888',
                  textShadow: activeIndex === i ? `0 0 5px ${DISCO_COLORS.hotPink}` : 'none',
                }}
              >
                {item.title}
              </span>

              {/* Playing indicator */}
              {activeIndex === i && (
                <div className="flex items-end gap-0.5 h-4">
                  {[...Array(4)].map((_, j) => (
                    <div
                      key={j}
                      className="w-1 rounded-full"
                      style={{
                        background: DISCO_COLORS.gold,
                        animation: 'barBounce 0.5s ease-in-out infinite',
                        animationDelay: `${j * 0.1}s`,
                        height: '100%',
                      }}
                    />
                  ))}
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Coin slot decoration */}
        <div className="mt-4 flex justify-center">
          <div
            className="w-16 h-3 rounded-full"
            style={{
              background: '#0d0d1a',
              border: `2px solid ${DISCO_COLORS.gold}`,
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes barBounce {
          0%, 100% { transform: scaleY(0.3); }
          50% { transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
};

// --- DISCO RAINBOW DIVIDER ---
export const DiscoRainbowDivider = () => {
  return (
    <div className="h-full flex items-center justify-center p-8" style={{ background: '#1a0a2e' }}>
      <div className="w-full max-w-md">
        {/* Text above */}
        <p className="text-center text-purple-300 mb-4">Above the groove</p>

        {/* Rainbow wave divider */}
        <div className="relative h-12">
          <svg viewBox="0 0 400 50" className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="rainbowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={DISCO_COLORS.hotPink}>
                  <animate attributeName="stop-color" values={`${DISCO_COLORS.hotPink};${DISCO_COLORS.gold};${DISCO_COLORS.electricBlue};${DISCO_COLORS.purple};${DISCO_COLORS.orange};${DISCO_COLORS.hotPink}`} dur="3s" repeatCount="indefinite" />
                </stop>
                <stop offset="25%" stopColor={DISCO_COLORS.gold}>
                  <animate attributeName="stop-color" values={`${DISCO_COLORS.gold};${DISCO_COLORS.electricBlue};${DISCO_COLORS.purple};${DISCO_COLORS.orange};${DISCO_COLORS.hotPink};${DISCO_COLORS.gold}`} dur="3s" repeatCount="indefinite" />
                </stop>
                <stop offset="50%" stopColor={DISCO_COLORS.electricBlue}>
                  <animate attributeName="stop-color" values={`${DISCO_COLORS.electricBlue};${DISCO_COLORS.purple};${DISCO_COLORS.orange};${DISCO_COLORS.hotPink};${DISCO_COLORS.gold};${DISCO_COLORS.electricBlue}`} dur="3s" repeatCount="indefinite" />
                </stop>
                <stop offset="75%" stopColor={DISCO_COLORS.purple}>
                  <animate attributeName="stop-color" values={`${DISCO_COLORS.purple};${DISCO_COLORS.orange};${DISCO_COLORS.hotPink};${DISCO_COLORS.gold};${DISCO_COLORS.electricBlue};${DISCO_COLORS.purple}`} dur="3s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stopColor={DISCO_COLORS.orange}>
                  <animate attributeName="stop-color" values={`${DISCO_COLORS.orange};${DISCO_COLORS.hotPink};${DISCO_COLORS.gold};${DISCO_COLORS.electricBlue};${DISCO_COLORS.purple};${DISCO_COLORS.orange}`} dur="3s" repeatCount="indefinite" />
                </stop>
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Main wave */}
            <path
              d="M0 25 Q50 5 100 25 T200 25 T300 25 T400 25"
              fill="none"
              stroke="url(#rainbowGradient)"
              strokeWidth="4"
              filter="url(#glow)"
            >
              <animate
                attributeName="d"
                values="M0 25 Q50 5 100 25 T200 25 T300 25 T400 25;M0 25 Q50 45 100 25 T200 25 T300 25 T400 25;M0 25 Q50 5 100 25 T200 25 T300 25 T400 25"
                dur="2s"
                repeatCount="indefinite"
              />
            </path>

            {/* Secondary wave */}
            <path
              d="M0 25 Q50 45 100 25 T200 25 T300 25 T400 25"
              fill="none"
              stroke="url(#rainbowGradient)"
              strokeWidth="2"
              opacity="0.5"
              filter="url(#glow)"
            >
              <animate
                attributeName="d"
                values="M0 25 Q50 45 100 25 T200 25 T300 25 T400 25;M0 25 Q50 5 100 25 T200 25 T300 25 T400 25;M0 25 Q50 45 100 25 T200 25 T300 25 T400 25"
                dur="2s"
                repeatCount="indefinite"
              />
            </path>
          </svg>

          {/* Sparkle dots */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: '50%',
                transform: 'translateY(-50%)',
                background: [DISCO_COLORS.hotPink, DISCO_COLORS.gold, DISCO_COLORS.electricBlue, DISCO_COLORS.purple, DISCO_COLORS.orange][i],
                boxShadow: `0 0 10px ${[DISCO_COLORS.hotPink, DISCO_COLORS.gold, DISCO_COLORS.electricBlue, DISCO_COLORS.purple, DISCO_COLORS.orange][i]}`,
                animation: 'sparkle 1s ease-in-out infinite',
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>

        {/* Text below */}
        <p className="text-center text-purple-300 mt-4">Below the groove</p>
      </div>

      <style>{`
        @keyframes sparkle {
          0%, 100% { transform: translateY(-50%) scale(1); opacity: 1; }
          50% { transform: translateY(-50%) scale(1.5); opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

// --- DISCO PARTY ALERT ---
export const DiscoPartyAlert = () => {
  const [confetti, setConfetti] = useState<{ x: number; delay: number; color: string; rotation: number }[]>([]);

  useEffect(() => {
    const colors = [DISCO_COLORS.hotPink, DISCO_COLORS.gold, DISCO_COLORS.electricBlue, DISCO_COLORS.purple, DISCO_COLORS.orange];
    const newConfetti = [...Array(30)].map(() => ({
      x: Math.random() * 100,
      delay: Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
    }));
    setConfetti(newConfetti);
  }, []);

  return (
    <div className="h-full flex items-center justify-center p-8" style={{ background: '#1a0a2e' }}>
      <div
        className="relative w-80 p-6 rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #3d2b5e 0%, #2d1b4e 100%)',
          border: `3px solid ${DISCO_COLORS.gold}`,
          boxShadow: `0 0 30px ${DISCO_COLORS.hotPink}40`,
        }}
      >
        {/* Confetti */}
        {confetti.map((piece, i) => (
          <div
            key={i}
            className="absolute w-2 h-3 pointer-events-none"
            style={{
              left: `${piece.x}%`,
              top: '-10%',
              background: piece.color,
              transform: `rotate(${piece.rotation}deg)`,
              animation: 'confettiFall 3s ease-in-out infinite',
              animationDelay: `${piece.delay}s`,
              borderRadius: '1px',
            }}
          />
        ))}

        {/* Alert icon */}
        <div className="flex justify-center mb-4">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
            style={{
              background: `linear-gradient(135deg, ${DISCO_COLORS.gold}, ${DISCO_COLORS.orange})`,
              boxShadow: `0 0 20px ${DISCO_COLORS.gold}`,
              animation: 'pulse 1s ease-in-out infinite',
            }}
          >
            🎉
          </div>
        </div>

        {/* Alert title */}
        <h3
          className="text-2xl text-center mb-2"
          style={{
            fontFamily: '"Brush Script MT", cursive',
            color: DISCO_COLORS.gold,
            textShadow: `0 0 10px ${DISCO_COLORS.gold}`,
          }}
        >
          Party Time!
        </h3>

        {/* Alert message */}
        <p className="text-center text-purple-200 mb-4">
          The dance floor is now open! Put on your platform shoes and get ready to boogie!
        </p>

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            className="flex-1 py-2 rounded-full font-bold text-sm"
            style={{
              background: 'transparent',
              border: `2px solid ${DISCO_COLORS.purple}`,
              color: DISCO_COLORS.purple,
            }}
          >
            Maybe Later
          </button>
          <button
            className="flex-1 py-2 rounded-full font-bold text-sm"
            style={{
              background: `linear-gradient(90deg, ${DISCO_COLORS.hotPink}, ${DISCO_COLORS.purple})`,
              color: '#fff',
              boxShadow: `0 0 15px ${DISCO_COLORS.hotPink}60`,
            }}
          >
            Let's Go!
          </button>
        </div>
      </div>

      <style>{`
        @keyframes confettiFall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(400px) rotate(720deg); opacity: 0; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
};

// --- DISCO PLATFORM ICON ---
export const DiscoPlatformIcon = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-8" style={{ background: '#1a0a2e' }}>
      <div
        className="relative cursor-pointer transition-transform duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ transform: isHovered ? 'scale(1.1) rotate(-5deg)' : 'scale(1)' }}
      >
        <svg viewBox="0 0 100 120" className="w-32 h-40">
          <defs>
            <linearGradient id="shoeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={DISCO_COLORS.hotPink} />
              <stop offset="50%" stopColor={DISCO_COLORS.purple} />
              <stop offset="100%" stopColor={DISCO_COLORS.electricBlue} />
            </linearGradient>
            <linearGradient id="platformGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={DISCO_COLORS.gold} />
              <stop offset="100%" stopColor={DISCO_COLORS.orange} />
            </linearGradient>
            <filter id="shoeGlow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Platform sole - bottom */}
          <rect x="10" y="100" width="70" height="15" rx="3" fill="url(#platformGradient)" />
          <rect x="10" y="85" width="70" height="15" rx="3" fill={DISCO_COLORS.gold} opacity="0.8" />
          <rect x="10" y="70" width="70" height="15" rx="3" fill="url(#platformGradient)" />

          {/* Shoe upper */}
          <path
            d="M15 70 L15 40 Q15 20 35 20 L70 20 Q85 20 85 35 L85 55 Q85 70 70 70 Z"
            fill="url(#shoeGradient)"
            filter="url(#shoeGlow)"
          />

          {/* Heel */}
          <rect x="70" y="55" width="15" height="60" rx="2" fill="url(#platformGradient)" />

          {/* Shoe opening */}
          <ellipse cx="45" cy="25" rx="20" ry="8" fill="#1a0a2e" />

          {/* Decorative star */}
          <polygon
            points="45,35 47,41 53,41 48,45 50,51 45,47 40,51 42,45 37,41 43,41"
            fill={DISCO_COLORS.gold}
            style={{
              filter: `drop-shadow(0 0 5px ${DISCO_COLORS.gold})`,
              animation: isHovered ? 'starSparkle 0.5s ease-in-out infinite' : 'none',
            }}
          />

          {/* Glitter dots */}
          {isHovered && [...Array(10)].map((_, i) => (
            <circle
              key={i}
              cx={20 + Math.random() * 50}
              cy={25 + Math.random() * 40}
              r="1.5"
              fill="#fff"
              opacity={0.5 + Math.random() * 0.5}
            >
              <animate
                attributeName="opacity"
                values="0.3;1;0.3"
                dur="0.5s"
                begin={`${Math.random() * 0.5}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </svg>

        {/* Label */}
        <div
          className="text-center mt-2"
          style={{
            fontFamily: '"Brush Script MT", cursive',
            fontSize: '1.2rem',
            color: DISCO_COLORS.gold,
            textShadow: `0 0 10px ${DISCO_COLORS.gold}`,
          }}
        >
          Platform Power
        </div>
      </div>

      <style>{`
        @keyframes starSparkle {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.3); }
        }
      `}</style>
    </div>
  );
};

// --- DISCO FUNKY HEADING ---
export const DiscoFunkyHeading = () => {
  const [hoveredLetter, setHoveredLetter] = useState<number | null>(null);
  const text = 'FUNKY';
  const colors = [DISCO_COLORS.hotPink, DISCO_COLORS.gold, DISCO_COLORS.electricBlue, DISCO_COLORS.purple, DISCO_COLORS.orange];

  return (
    <div className="h-full flex items-center justify-center p-8" style={{ background: '#1a0a2e' }}>
      <div className="relative">
        {/* Shadow layer */}
        <div className="absolute inset-0 blur-lg opacity-50">
          <div className="flex">
            {text.split('').map((letter, i) => (
              <span
                key={i}
                className="text-7xl font-black"
                style={{ color: colors[i % colors.length] }}
              >
                {letter}
              </span>
            ))}
          </div>
        </div>

        {/* Main text */}
        <div className="relative flex">
          {text.split('').map((letter, i) => (
            <span
              key={i}
              className="text-7xl font-black cursor-pointer transition-all duration-200"
              onMouseEnter={() => setHoveredLetter(i)}
              onMouseLeave={() => setHoveredLetter(null)}
              style={{
                color: colors[i % colors.length],
                textShadow: `
                  3px 3px 0 #000,
                  -1px -1px 0 #000,
                  1px -1px 0 #000,
                  -1px 1px 0 #000,
                  0 0 20px ${colors[i % colors.length]},
                  0 0 40px ${colors[i % colors.length]}
                `,
                transform: hoveredLetter === i
                  ? 'scale(1.3) rotate(-10deg) translateY(-10px)'
                  : 'scale(1)',
                WebkitTextStroke: '2px #000',
                fontFamily: 'Impact, sans-serif',
                animation: `letterBounce 0.8s ease-in-out infinite`,
                animationDelay: `${i * 0.1}s`,
              }}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Subtitle */}
        <div
          className="text-center mt-4"
          style={{
            fontFamily: '"Brush Script MT", cursive',
            fontSize: '1.5rem',
            color: '#fff',
            textShadow: `0 0 10px ${DISCO_COLORS.hotPink}`,
          }}
        >
          Get Down Tonight
        </div>
      </div>

      <style>{`
        @keyframes letterBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
};

// --- DISCO TURNTABLE SLIDER ---
export const DiscoTurntableSlider = () => {
  const [value, setValue] = useState(50);
  const [isScratching, setIsScratching] = useState(false);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isScratching) {
        setRotation((prev) => prev + 3);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [isScratching]);

  return (
    <div className="h-full flex flex-col items-center justify-center p-8" style={{ background: '#1a0a2e' }}>
      {/* Turntable */}
      <div
        className="relative w-48 h-48 rounded-full mb-6"
        style={{
          background: `radial-gradient(circle, #2d1b4e 0%, #1a0a2e 100%)`,
          border: `4px solid ${DISCO_COLORS.gold}`,
          boxShadow: `0 0 30px ${DISCO_COLORS.purple}40, inset 0 0 30px rgba(0,0,0,0.5)`,
        }}
      >
        {/* Vinyl */}
        <div
          className="absolute rounded-full"
          style={{
            inset: '10%',
            background: `
              radial-gradient(circle at center,
                #1a1a1a 0%,
                #1a1a1a 20%,
                ${DISCO_COLORS.hotPink}40 20.5%,
                ${DISCO_COLORS.hotPink}40 21%,
                #1a1a1a 21.5%,
                #1a1a1a 40%,
                ${DISCO_COLORS.electricBlue}40 40.5%,
                ${DISCO_COLORS.electricBlue}40 41%,
                #1a1a1a 41.5%,
                #1a1a1a 60%,
                ${DISCO_COLORS.gold}40 60.5%,
                ${DISCO_COLORS.gold}40 61%,
                #1a1a1a 61.5%,
                #1a1a1a 100%
              )
            `,
            transform: `rotate(${rotation + value * 3.6}deg)`,
            transition: isScratching ? 'none' : 'transform 0.05s linear',
          }}
        >
          {/* Label */}
          <div
            className="absolute rounded-full flex items-center justify-center"
            style={{
              inset: '30%',
              background: `linear-gradient(135deg, ${DISCO_COLORS.gold}, ${DISCO_COLORS.orange})`,
            }}
          >
            <span className="text-xs font-bold text-black">DISCO</span>
          </div>
        </div>

        {/* Tonearm */}
        <div
          className="absolute w-2 h-24 origin-top"
          style={{
            top: '5%',
            right: '15%',
            background: `linear-gradient(180deg, #888 0%, #444 100%)`,
            transform: `rotate(${20 + value * 0.3}deg)`,
            borderRadius: '4px',
          }}
        >
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-3"
            style={{
              background: DISCO_COLORS.hotPink,
              clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
            }}
          />
        </div>
      </div>

      {/* Slider control */}
      <div className="w-64">
        <div className="flex justify-between mb-2">
          <span
            style={{
              fontFamily: '"Brush Script MT", cursive',
              color: DISCO_COLORS.gold,
            }}
          >
            Scratch Level
          </span>
          <span className="text-white font-mono">{value}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          onMouseDown={() => setIsScratching(true)}
          onMouseUp={() => setIsScratching(false)}
          onTouchStart={() => setIsScratching(true)}
          onTouchEnd={() => setIsScratching(false)}
          className="w-full h-3 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(90deg, ${DISCO_COLORS.hotPink} 0%, ${DISCO_COLORS.gold} ${value}%, #2a1a3e ${value}%)`,
          }}
        />
      </div>
    </div>
  );
};

// --- DISCO BOOGIE TABS ---
export const DiscoBookieTabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [tileAnimations, setTileAnimations] = useState<boolean[][]>([]);
  const tabs = ['Groove', 'Funk', 'Soul', 'Disco'];

  useEffect(() => {
    const interval = setInterval(() => {
      setTileAnimations(tabs.map(() =>
        [...Array(8)].map(() => Math.random() > 0.6)
      ));
    }, 200);
    return () => clearInterval(interval);
  }, []);

  const tabColors = [DISCO_COLORS.hotPink, DISCO_COLORS.gold, DISCO_COLORS.electricBlue, DISCO_COLORS.purple];

  return (
    <div className="h-full flex items-center justify-center p-8" style={{ background: '#1a0a2e' }}>
      <div className="w-80">
        {/* Tab headers */}
        <div className="flex gap-1 mb-4">
          {tabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className="flex-1 py-3 rounded-t-xl font-bold transition-all duration-300 relative overflow-hidden"
              style={{
                background: activeTab === i
                  ? `linear-gradient(180deg, ${tabColors[i]} 0%, ${tabColors[i]}80 100%)`
                  : '#2a1a3e',
                color: activeTab === i ? '#000' : '#888',
                boxShadow: activeTab === i ? `0 0 20px ${tabColors[i]}60` : 'none',
              }}
            >
              {/* Dance floor tiles */}
              {activeTab === i && (
                <div className="absolute inset-0 grid grid-cols-4 grid-rows-2 gap-0.5 p-1">
                  {tileAnimations[i]?.map((isLit, j) => (
                    <div
                      key={j}
                      className="rounded-sm transition-all duration-100"
                      style={{
                        background: isLit ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.2)',
                      }}
                    />
                  ))}
                </div>
              )}
              <span className="relative z-10">{tab}</span>
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div
          className="p-6 rounded-b-xl rounded-tr-xl"
          style={{
            background: `linear-gradient(180deg, ${tabColors[activeTab]}20 0%, #2d1b4e 100%)`,
            border: `2px solid ${tabColors[activeTab]}60`,
          }}
        >
          <h3
            className="text-xl mb-3"
            style={{
              fontFamily: '"Brush Script MT", cursive',
              color: tabColors[activeTab],
              textShadow: `0 0 10px ${tabColors[activeTab]}`,
            }}
          >
            {tabs[activeTab]} Zone
          </h3>
          <p className="text-purple-200 text-sm">
            {activeTab === 0 && 'Feel the rhythm and let your body move to the beat!'}
            {activeTab === 1 && 'Get down with the funkiest tunes of the decade!'}
            {activeTab === 2 && 'Soul music that touches your heart and moves your feet!'}
            {activeTab === 3 && 'The ultimate disco experience awaits you!'}
          </p>
        </div>
      </div>
    </div>
  );
};

// --- DISCO SPARKLE BACKGROUND ---
export const DiscoSparkleBackground = () => {
  const [sparkles, setSparkles] = useState<{ x: number; y: number; size: number; delay: number; color: string }[]>([]);
  const colors = [DISCO_COLORS.hotPink, DISCO_COLORS.gold, DISCO_COLORS.electricBlue, DISCO_COLORS.purple, DISCO_COLORS.orange, '#fff'];

  useEffect(() => {
    const newSparkles = [...Array(50)].map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 4,
      delay: Math.random() * 3,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setSparkles(newSparkles);
  }, []);

  return (
    <div
      className="h-full relative overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse at 20% 20%, ${DISCO_COLORS.hotPink}30 0%, transparent 50%),
          radial-gradient(ellipse at 80% 30%, ${DISCO_COLORS.electricBlue}30 0%, transparent 50%),
          radial-gradient(ellipse at 50% 80%, ${DISCO_COLORS.purple}30 0%, transparent 50%),
          linear-gradient(180deg, #0d0d1a 0%, #1a0a2e 50%, #0d0d1a 100%)
        `,
      }}
    >
      {/* Mirror ball in center */}
      <div
        className="absolute left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full"
        style={{
          background: `
            radial-gradient(circle at 30% 30%, #fff 0%, #888 20%, #444 50%, #222 100%)
          `,
          boxShadow: `
            0 0 60px ${DISCO_COLORS.gold}60,
            0 0 120px ${DISCO_COLORS.hotPink}40
          `,
          animation: 'mirrorBallSpin 10s linear infinite',
        }}
      >
        {/* Mirror tiles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 rounded-sm"
            style={{
              left: `${15 + (i % 5) * 17}%`,
              top: `${15 + Math.floor(i / 5) * 20}%`,
              background: 'linear-gradient(135deg, #fff 0%, #aaa 50%, #666 100%)',
              transform: `rotate(${i * 18}deg)`,
              opacity: 0.8,
            }}
          />
        ))}
      </div>

      {/* Light beams from mirror ball */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute left-1/2 top-1/4 w-1 origin-top"
          style={{
            height: '150%',
            background: `linear-gradient(180deg, ${colors[i % colors.length]}80 0%, transparent 100%)`,
            transform: `rotate(${i * 45}deg)`,
            animation: 'beamRotate 8s linear infinite',
            animationDelay: `${i * 0.5}s`,
            filter: 'blur(3px)',
          }}
        />
      ))}

      {/* Sparkles */}
      {sparkles.map((sparkle, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            background: sparkle.color,
            boxShadow: `0 0 ${sparkle.size * 2}px ${sparkle.color}`,
            animation: 'sparkleGlow 2s ease-in-out infinite',
            animationDelay: `${sparkle.delay}s`,
          }}
        />
      ))}

      {/* Center text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <h1
            className="text-5xl mb-2"
            style={{
              fontFamily: '"Brush Script MT", cursive',
              color: DISCO_COLORS.gold,
              textShadow: `
                0 0 20px ${DISCO_COLORS.gold},
                0 0 40px ${DISCO_COLORS.hotPink},
                0 0 60px ${DISCO_COLORS.purple}
              `,
            }}
          >
            Disco Fever
          </h1>
          <p
            className="text-lg tracking-widest"
            style={{
              color: '#fff',
              textShadow: `0 0 10px ${DISCO_COLORS.electricBlue}`,
            }}
          >
            1977 NEVER DIES
          </p>
        </div>
      </div>

      <style>{`
        @keyframes mirrorBallSpin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes beamRotate {
          0% { opacity: 0.3; }
          50% { opacity: 0.8; }
          100% { opacity: 0.3; }
        }
        @keyframes sparkleGlow {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.5); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

// Export all components with exact IDs
export const discoInfernoComponents: Record<string, React.FC> = {
  'disco-mirrorball-button': DiscoMirrorballButton,
  'disco-dancefloor-card': DiscoDancefloorCard,
  'disco-groovy-input': DiscoGroovyInput,
  'disco-vinyl-badge': DiscoVinylBadge,
  'disco-lava-lamp-toggle': DiscoLavaLampToggle,
  'disco-equalizer-progress': DiscoEqualizerProgress,
  'disco-strobe-loader': DiscoStrobeLoader,
  'disco-afro-avatar': DiscoAfroAvatar,
  'disco-curtain-modal': DiscoCurtainModal,
  'disco-jukebox-nav': DiscoJukeboxNav,
  'disco-rainbow-divider': DiscoRainbowDivider,
  'disco-party-alert': DiscoPartyAlert,
  'disco-platform-icon': DiscoPlatformIcon,
  'disco-funky-heading': DiscoFunkyHeading,
  'disco-turntable-slider': DiscoTurntableSlider,
  'disco-boogie-tabs': DiscoBookieTabs,
  'disco-sparkle-background': DiscoSparkleBackground,
};
