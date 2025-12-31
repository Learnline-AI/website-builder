import React, { useState, useEffect } from 'react';

// Arctic Station Theme Colors
// Ice Blue: #a8dadc
// Deep Blue: #1d3557
// White: #ffffff
// Aurora Green: #06ffa5
// Aurora Purple: #b388ff

// --- ARCTIC ICE BUTTON ---
export const ArcticIceButton: React.FC = () => {
  const [isCracking, setIsCracking] = useState(false);
  const [cracks, setCracks] = useState<{ id: number; x: number; y: number; angle: number }[]>([]);

  const handleClick = () => {
    if (isCracking) return;
    setIsCracking(true);

    // Generate random cracks
    const newCracks = [...Array(8)].map((_, i) => ({
      id: i,
      x: 50 + (Math.random() - 0.5) * 60,
      y: 50 + (Math.random() - 0.5) * 40,
      angle: Math.random() * 360,
    }));
    setCracks(newCracks);

    setTimeout(() => {
      setIsCracking(false);
      setCracks([]);
    }, 800);
  };

  return (
    <div className="h-full flex items-center justify-center p-8" style={{ background: 'linear-gradient(180deg, #1d3557 0%, #0a1628 100%)' }}>
      <button
        onClick={handleClick}
        className="relative px-8 py-4 font-mono font-bold text-sm tracking-widest transition-all duration-200 overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #a8dadc 0%, #7ec8cc 50%, #5bb8bd 100%)',
          border: '3px solid #ffffff',
          borderRadius: '4px',
          color: '#1d3557',
          boxShadow: `
            0 0 20px rgba(168, 218, 220, 0.4),
            inset 0 2px 10px rgba(255, 255, 255, 0.5),
            inset 0 -2px 10px rgba(29, 53, 87, 0.2)
          `,
          transform: isCracking ? 'scale(0.98)' : 'scale(1)',
        }}
      >
        {/* Ice texture overlay */}
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse at 20% 30%, rgba(255,255,255,0.8) 0%, transparent 30%),
              radial-gradient(ellipse at 80% 70%, rgba(255,255,255,0.6) 0%, transparent 25%)
            `,
          }}
        />

        {/* Crack lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
          {cracks.map(crack => (
            <g key={crack.id}>
              <line
                x1={crack.x}
                y1={crack.y}
                x2={crack.x + Math.cos(crack.angle * Math.PI / 180) * 30}
                y2={crack.y + Math.sin(crack.angle * Math.PI / 180) * 20}
                stroke="#1d3557"
                strokeWidth="0.8"
                strokeLinecap="round"
                className="transition-all"
                style={{
                  opacity: isCracking ? 1 : 0,
                  strokeDasharray: '100',
                  strokeDashoffset: isCracking ? '0' : '100',
                  transition: 'stroke-dashoffset 0.3s ease-out',
                }}
              />
              <line
                x1={crack.x}
                y1={crack.y}
                x2={crack.x + Math.cos((crack.angle + 45) * Math.PI / 180) * 15}
                y2={crack.y + Math.sin((crack.angle + 45) * Math.PI / 180) * 10}
                stroke="#1d3557"
                strokeWidth="0.5"
                strokeLinecap="round"
                style={{ opacity: isCracking ? 0.7 : 0 }}
              />
            </g>
          ))}
        </svg>

        {/* Frost particles */}
        {isCracking && [...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-ping"
            style={{
              left: `${30 + Math.random() * 40}%`,
              top: `${30 + Math.random() * 40}%`,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}

        <span className="relative z-10">INITIATE PROTOCOL</span>
      </button>
    </div>
  );
};

// --- ARCTIC RESEARCH CARD ---
export const ArcticResearchCard: React.FC = () => {
  const [frostLevel, setFrostLevel] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrostLevel(f => (f + 0.5) % 100);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#0a1628' }}>
      <div
        className="relative w-72 p-6 rounded-lg overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #1d3557 0%, #14253d 100%)',
          border: '2px solid rgba(168, 218, 220, 0.3)',
          boxShadow: '0 0 30px rgba(168, 218, 220, 0.1)',
        }}
      >
        {/* Frost overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse at 0% 0%, rgba(168, 218, 220, 0.3) 0%, transparent 40%),
              radial-gradient(ellipse at 100% 0%, rgba(168, 218, 220, 0.2) 0%, transparent 35%),
              radial-gradient(ellipse at 100% 100%, rgba(168, 218, 220, 0.25) 0%, transparent 45%)
            `,
            opacity: 0.5 + Math.sin(frostLevel * 0.05) * 0.3,
          }}
        />

        {/* Ice crystal decorations */}
        <div className="absolute top-2 right-2 text-xl opacity-40">*</div>
        <div className="absolute top-4 right-6 text-sm opacity-30">*</div>
        <div className="absolute bottom-3 left-3 text-lg opacity-35">*</div>

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: '#06ffa5', boxShadow: '0 0 10px #06ffa5' }}
            />
            <span className="font-mono text-xs text-[#a8dadc] tracking-widest">RESEARCH LOG #847</span>
          </div>

          <h3 className="font-bold text-lg text-white mb-2">Permafrost Analysis</h3>

          <p className="text-sm text-[#a8dadc] opacity-80 mb-4 leading-relaxed">
            Core samples indicate unprecedented crystalline structures at depth
            -127m. Aurora activity correlates with ice formation patterns.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#a8dadc]/20">
            <div>
              <div className="font-mono text-xs text-[#a8dadc]/60">TEMP</div>
              <div className="font-mono text-lg text-[#06ffa5]">-47.3C</div>
            </div>
            <div>
              <div className="font-mono text-xs text-[#a8dadc]/60">DEPTH</div>
              <div className="font-mono text-lg text-[#b388ff]">127m</div>
            </div>
          </div>
        </div>

        {/* Frozen edge effect */}
        <div
          className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none"
          style={{
            background: 'linear-gradient(0deg, rgba(168, 218, 220, 0.15) 0%, transparent 100%)',
          }}
        />
      </div>
    </div>
  );
};

// --- ARCTIC FROZEN INPUT ---
export const ArcticFrozenInput: React.FC = () => {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [crystals, setCrystals] = useState<{ id: number; x: number; size: number }[]>([]);

  useEffect(() => {
    const newCrystals = [...Array(12)].map((_, i) => ({
      id: i,
      x: i * 8 + Math.random() * 4,
      size: 4 + Math.random() * 4,
    }));
    setCrystals(newCrystals);
  }, []);

  return (
    <div className="h-full flex items-center justify-center p-8" style={{ background: '#0a1628' }}>
      <div className="relative w-72">
        {/* Ice crystal border */}
        <div className="absolute -inset-1 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
            {crystals.map(crystal => (
              <polygon
                key={crystal.id}
                points={`${crystal.x},0 ${crystal.x + crystal.size/2},${crystal.size} ${crystal.x - crystal.size/2},${crystal.size}`}
                fill="#a8dadc"
                opacity={isFocused ? 0.8 : 0.4}
                className="transition-opacity duration-300"
              />
            ))}
            {crystals.map(crystal => (
              <polygon
                key={`b-${crystal.id}`}
                points={`${crystal.x},40 ${crystal.x + crystal.size/2},${40 - crystal.size} ${crystal.x - crystal.size/2},${40 - crystal.size}`}
                fill="#a8dadc"
                opacity={isFocused ? 0.8 : 0.4}
                className="transition-opacity duration-300"
              />
            ))}
          </svg>
        </div>

        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Enter coordinates..."
          className="w-full px-4 py-3 font-mono text-sm outline-none transition-all"
          style={{
            background: 'linear-gradient(180deg, #1d3557 0%, #14253d 100%)',
            border: `2px solid ${isFocused ? '#a8dadc' : 'rgba(168, 218, 220, 0.3)'}`,
            borderRadius: '4px',
            color: '#ffffff',
            boxShadow: isFocused
              ? '0 0 20px rgba(168, 218, 220, 0.3), inset 0 0 10px rgba(168, 218, 220, 0.1)'
              : 'none',
          }}
        />

        {/* Frost breath effect when focused */}
        {isFocused && (
          <div
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-4 animate-pulse"
            style={{
              background: 'radial-gradient(ellipse, rgba(168, 218, 220, 0.3) 0%, transparent 70%)',
              filter: 'blur(4px)',
            }}
          />
        )}
      </div>
    </div>
  );
};

// --- ARCTIC SNOWFLAKE BADGE ---
export const ArcticSnowflakeBadge: React.FC = () => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(r => (r + 0.5) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const badges = [
    { label: 'ALPHA', color: '#06ffa5' },
    { label: 'BETA', color: '#b388ff' },
    { label: 'OMEGA', color: '#a8dadc' },
  ];

  return (
    <div className="h-full flex items-center justify-center gap-4 p-6" style={{ background: '#0a1628' }}>
      {badges.map((badge, index) => (
        <div
          key={badge.label}
          className="relative px-4 py-2 font-mono text-xs font-bold tracking-widest"
          style={{
            background: `${badge.color}20`,
            border: `2px solid ${badge.color}`,
            borderRadius: '20px',
            color: badge.color,
          }}
        >
          {/* Snowflake icon */}
          <svg
            className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6"
            viewBox="0 0 24 24"
            style={{ transform: `translateY(-50%) rotate(${rotation + index * 30}deg)` }}
          >
            {/* 6-point snowflake */}
            {[0, 60, 120, 180, 240, 300].map(angle => (
              <g key={angle} transform={`rotate(${angle} 12 12)`}>
                <line x1="12" y1="12" x2="12" y2="3" stroke={badge.color} strokeWidth="1.5" strokeLinecap="round" />
                <line x1="12" y1="5" x2="9" y2="7" stroke={badge.color} strokeWidth="1" strokeLinecap="round" />
                <line x1="12" y1="5" x2="15" y2="7" stroke={badge.color} strokeWidth="1" strokeLinecap="round" />
              </g>
            ))}
            <circle cx="12" cy="12" r="2" fill={badge.color} />
          </svg>

          <span className="ml-2">{badge.label}</span>
        </div>
      ))}
    </div>
  );
};

// --- ARCTIC POWER TOGGLE ---
export const ArcticPowerToggle: React.FC = () => {
  const [isOn, setIsOn] = useState(false);
  const [powerLevel, setPowerLevel] = useState(0);

  useEffect(() => {
    if (isOn) {
      const interval = setInterval(() => {
        setPowerLevel(p => Math.min(100, p + 5));
      }, 50);
      return () => clearInterval(interval);
    } else {
      setPowerLevel(0);
    }
  }, [isOn]);

  return (
    <div className="h-full flex flex-col items-center justify-center gap-4 p-8" style={{ background: '#0a1628' }}>
      {/* Power station housing */}
      <div
        className="relative p-6 rounded-lg"
        style={{
          background: 'linear-gradient(180deg, #1d3557 0%, #14253d 100%)',
          border: `3px solid ${isOn ? '#06ffa5' : '#a8dadc40'}`,
          boxShadow: isOn ? '0 0 30px rgba(6, 255, 165, 0.3)' : 'none',
          transition: 'all 0.3s',
        }}
      >
        {/* Warning stripes */}
        <div
          className="absolute top-0 left-0 right-0 h-3"
          style={{
            background: 'repeating-linear-gradient(45deg, #fbbf24, #fbbf24 8px, #1d3557 8px, #1d3557 16px)',
            borderRadius: '4px 4px 0 0',
          }}
        />

        {/* Main toggle */}
        <button
          onClick={() => setIsOn(!isOn)}
          className="relative w-20 h-32 mt-4 rounded cursor-pointer"
          style={{
            background: 'linear-gradient(180deg, #0a1628 0%, #1d3557 100%)',
            border: '3px solid #a8dadc40',
          }}
        >
          {/* Toggle handle */}
          <div
            className="absolute left-1/2 -translate-x-1/2 w-14 h-14 rounded transition-all duration-300"
            style={{
              top: isOn ? '10%' : '50%',
              background: isOn
                ? 'linear-gradient(180deg, #06ffa5 0%, #04cc84 100%)'
                : 'linear-gradient(180deg, #ef4444 0%, #dc2626 100%)',
              boxShadow: isOn
                ? '0 5px 20px rgba(6, 255, 165, 0.5)'
                : '0 5px 20px rgba(239, 68, 68, 0.3)',
            }}
          >
            <div className="absolute inset-2 rounded bg-white/20" />
          </div>

          {/* ON/OFF labels */}
          <span className="absolute top-3 left-1/2 -translate-x-1/2 font-mono text-xs text-[#06ffa5]">ON</span>
          <span className="absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-xs text-[#ef4444]">OFF</span>
        </button>

        {/* Power level indicator */}
        <div className="mt-4 font-mono text-center">
          <div className="text-xs text-[#a8dadc]/60">POWER OUTPUT</div>
          <div
            className="text-2xl font-bold"
            style={{ color: isOn ? '#06ffa5' : '#a8dadc40' }}
          >
            {powerLevel}%
          </div>
        </div>
      </div>
    </div>
  );
};

// --- ARCTIC AURORA PROGRESS ---
export const ArcticAuroraProgress: React.FC = () => {
  const [progress, setProgress] = useState(65);
  const [hueOffset, setHueOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHueOffset(h => (h + 2) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex flex-col items-center justify-center gap-6 p-8" style={{ background: '#0a1628' }}>
      {/* Progress bar container */}
      <div className="relative w-72 h-6 rounded-full overflow-hidden" style={{ background: '#1d3557' }}>
        {/* Aurora gradient fill */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            width: `${progress}%`,
            background: `linear-gradient(90deg,
              hsl(${160 + hueOffset}, 100%, 50%),
              hsl(${200 + hueOffset}, 100%, 60%),
              hsl(${280 + hueOffset}, 70%, 70%),
              hsl(${160 + hueOffset}, 100%, 50%)
            )`,
            backgroundSize: '200% 100%',
            animation: 'auroraFlow 3s linear infinite',
            boxShadow: '0 0 20px rgba(6, 255, 165, 0.5), 0 0 40px rgba(179, 136, 255, 0.3)',
          }}
        />

        {/* Shimmer overlay */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
            backgroundSize: '50% 100%',
            animation: 'shimmer 2s infinite',
          }}
        />

        {/* Percentage text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-sm font-bold text-white drop-shadow-lg">{progress}%</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-3">
        {[0, 25, 50, 75, 100].map(val => (
          <button
            key={val}
            onClick={() => setProgress(val)}
            className="px-3 py-1 font-mono text-xs rounded transition-all"
            style={{
              background: progress === val ? '#06ffa520' : 'transparent',
              border: `1px solid ${progress === val ? '#06ffa5' : '#a8dadc40'}`,
              color: progress === val ? '#06ffa5' : '#a8dadc',
            }}
          >
            {val}%
          </button>
        ))}
      </div>

      <style>{`
        @keyframes auroraFlow {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes shimmer {
          0% { background-position: -100% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
};

// --- ARCTIC RADAR LOADER ---
export const ArcticRadarLoader: React.FC = () => {
  const [angle, setAngle] = useState(0);
  const [blips, setBlips] = useState<{ id: number; x: number; y: number; age: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAngle(a => (a + 3) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Add new blips occasionally
    if (Math.random() > 0.95) {
      const r = 20 + Math.random() * 60;
      const theta = Math.random() * Math.PI * 2;
      setBlips(prev => [...prev, {
        id: Date.now(),
        x: 50 + r * Math.cos(theta),
        y: 50 + r * Math.sin(theta),
        age: 0,
      }].slice(-5));
    }
    // Age existing blips
    setBlips(prev => prev.map(b => ({ ...b, age: b.age + 1 })).filter(b => b.age < 100));
  }, [angle]);

  return (
    <div className="h-full flex items-center justify-center p-8" style={{ background: '#0a1628' }}>
      <div
        className="relative w-48 h-48 rounded-full"
        style={{
          background: 'radial-gradient(circle, #1d3557 0%, #0a1628 100%)',
          border: '3px solid #a8dadc40',
          boxShadow: '0 0 30px rgba(168, 218, 220, 0.2), inset 0 0 30px rgba(6, 255, 165, 0.1)',
        }}
      >
        {/* Grid lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
          {/* Concentric circles */}
          {[20, 40, 60, 80].map(r => (
            <circle key={r} cx="50" cy="50" r={r/2} fill="none" stroke="#a8dadc20" strokeWidth="0.5" />
          ))}
          {/* Cross lines */}
          <line x1="50" y1="5" x2="50" y2="95" stroke="#a8dadc20" strokeWidth="0.5" />
          <line x1="5" y1="50" x2="95" y2="50" stroke="#a8dadc20" strokeWidth="0.5" />
        </svg>

        {/* Sweep beam */}
        <div
          className="absolute top-1/2 left-1/2 w-1/2 h-1 origin-left"
          style={{
            transform: `rotate(${angle}deg)`,
            background: 'linear-gradient(90deg, #06ffa5 0%, transparent 100%)',
            boxShadow: '0 0 10px #06ffa5',
          }}
        />

        {/* Sweep trail */}
        <div
          className="absolute top-1/2 left-1/2 w-1/2 origin-left pointer-events-none"
          style={{
            height: '50%',
            transform: `rotate(${angle - 45}deg) translateY(-100%)`,
            background: `conic-gradient(from 0deg, transparent, rgba(6, 255, 165, 0.3) 45deg, transparent 45deg)`,
            transformOrigin: '0% 100%',
          }}
        />

        {/* Blips */}
        {blips.map(blip => (
          <div
            key={blip.id}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${blip.x}%`,
              top: `${blip.y}%`,
              transform: 'translate(-50%, -50%)',
              background: '#06ffa5',
              opacity: 1 - blip.age / 100,
              boxShadow: '0 0 10px #06ffa5',
            }}
          />
        ))}

        {/* Center point */}
        <div
          className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full -translate-x-1/2 -translate-y-1/2"
          style={{ background: '#06ffa5', boxShadow: '0 0 10px #06ffa5' }}
        />

        {/* Label */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-xs text-[#a8dadc]">
          SCANNING...
        </div>
      </div>
    </div>
  );
};

// --- ARCTIC PARKA AVATAR ---
export const ArcticParkaAvatar: React.FC = () => {
  const [_isHovered, setIsHovered] = useState(false);

  const avatars = [
    { name: 'Dr. Frost', status: 'online' },
    { name: 'Prof. Ice', status: 'away' },
    { name: 'Cap. Snow', status: 'offline' },
  ];

  return (
    <div className="h-full flex items-center justify-center gap-6 p-6" style={{ background: '#0a1628' }}>
      {avatars.map((avatar, i) => (
        <div
          key={avatar.name}
          className="relative cursor-pointer transition-transform hover:scale-110"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Fur-lined hood frame */}
          <div
            className="relative w-16 h-16 rounded-full overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, #3d5a80 0%, #1d3557 100%)',
              border: '3px solid #a8dadc',
              boxShadow: '0 0 15px rgba(168, 218, 220, 0.3)',
            }}
          >
            {/* Fur texture (top arc) */}
            <div
              className="absolute -top-2 -left-2 -right-2 h-8"
              style={{
                background: `
                  radial-gradient(ellipse at 10% 100%, #d4d4d4 0%, transparent 50%),
                  radial-gradient(ellipse at 30% 100%, #e5e5e5 0%, transparent 45%),
                  radial-gradient(ellipse at 50% 100%, #d4d4d4 0%, transparent 50%),
                  radial-gradient(ellipse at 70% 100%, #e5e5e5 0%, transparent 45%),
                  radial-gradient(ellipse at 90% 100%, #d4d4d4 0%, transparent 50%)
                `,
                borderRadius: '50% 50% 0 0',
              }}
            />

            {/* Avatar face placeholder */}
            <div className="absolute inset-3 rounded-full bg-[#2a4a6b] flex items-center justify-center">
              <span className="text-2xl">{['👨‍🔬', '👩‍🔬', '🧑‍✈️'][i]}</span>
            </div>
          </div>

          {/* Status indicator */}
          <div
            className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#0a1628]"
            style={{
              background: avatar.status === 'online' ? '#06ffa5' : avatar.status === 'away' ? '#fbbf24' : '#6b7280',
              boxShadow: avatar.status === 'online' ? '0 0 8px #06ffa5' : 'none',
            }}
          />

          {/* Name label */}
          <div className="mt-2 text-center font-mono text-xs text-[#a8dadc]">
            {avatar.name}
          </div>
        </div>
      ))}
    </div>
  );
};

// --- ARCTIC BLAST MODAL ---
export const ArcticBlastModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; vx: number; vy: number }[]>([]);

  useEffect(() => {
    if (isOpen) {
      // Generate blast particles
      const newParticles = [...Array(30)].map((_, i) => ({
        id: i,
        x: 50,
        y: 50,
        vx: (Math.random() - 0.5) * 20,
        vy: (Math.random() - 0.5) * 20,
      }));
      setParticles(newParticles);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || particles.length === 0) return;
    const interval = setInterval(() => {
      setParticles(prev => prev.map(p => ({
        ...p,
        x: p.x + p.vx,
        y: p.y + p.vy,
        vx: p.vx * 0.95,
        vy: p.vy * 0.95,
      })).filter(p => Math.abs(p.x - 50) < 60 && Math.abs(p.y - 50) < 60));
    }, 30);
    return () => clearInterval(interval);
  }, [isOpen, particles.length]);

  return (
    <div className="h-full flex items-center justify-center p-8" style={{ background: '#0a1628' }}>
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 font-mono font-bold text-sm tracking-wider rounded transition-all hover:scale-105"
        style={{
          background: 'linear-gradient(180deg, #a8dadc 0%, #7ec8cc 100%)',
          border: '2px solid #ffffff',
          color: '#1d3557',
        }}
      >
        OPEN HATCH
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(10, 22, 40, 0.9)' }}
            onClick={() => setIsOpen(false)}
          />

          {/* Cold air blast particles */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            {particles.map(p => (
              <circle
                key={p.id}
                cx={p.x}
                cy={p.y}
                r={1 + Math.random()}
                fill="#a8dadc"
                opacity={0.6}
              />
            ))}
          </svg>

          {/* Modal content */}
          <div
            className="relative w-80 p-6 rounded-lg z-10"
            style={{
              background: 'linear-gradient(180deg, #1d3557 0%, #14253d 100%)',
              border: '3px solid #a8dadc',
              boxShadow: '0 0 50px rgba(168, 218, 220, 0.4), inset 0 0 30px rgba(168, 218, 220, 0.1)',
              animation: 'modalEntry 0.3s ease-out',
            }}
          >
            {/* Frost corners */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#06ffa5] rounded-tl" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#06ffa5] rounded-tr" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#06ffa5] rounded-bl" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#06ffa5] rounded-br" />

            <div className="text-center">
              <div className="text-4xl mb-4">🥶</div>
              <h3 className="font-bold text-xl text-white mb-2">COLD WARNING</h3>
              <p className="text-[#a8dadc] text-sm mb-6">
                External temperature: -52C. Ensure thermal protection before proceeding.
              </p>
              <button
                onClick={() => setIsOpen(false)}
                className="px-6 py-2 font-mono text-sm rounded transition-all hover:bg-[#06ffa530]"
                style={{
                  background: 'transparent',
                  border: '2px solid #06ffa5',
                  color: '#06ffa5',
                }}
              >
                ACKNOWLEDGED
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes modalEntry {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

// --- ARCTIC EXPEDITION NAV ---
export const ArcticExpeditionNav: React.FC = () => {
  const [activeWaypoint, setActiveWaypoint] = useState(2);

  const waypoints = [
    { id: 0, name: 'BASE CAMP', icon: '🏠', x: 10, y: 60 },
    { id: 1, name: 'CHECKPOINT A', icon: '🚩', x: 30, y: 40 },
    { id: 2, name: 'ICE CORE SITE', icon: '🔬', x: 55, y: 55 },
    { id: 3, name: 'AURORA STATION', icon: '📡', x: 75, y: 30 },
    { id: 4, name: 'SUMMIT', icon: '⛰️', x: 90, y: 15 },
  ];

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#0a1628' }}>
      <div
        className="relative w-full max-w-md p-6 rounded-lg"
        style={{
          background: 'linear-gradient(180deg, #1d3557 0%, #14253d 100%)',
          border: '2px solid #a8dadc40',
        }}
      >
        <div className="font-mono text-xs text-[#a8dadc] mb-4 tracking-widest">EXPEDITION ROUTE</div>

        {/* Map area */}
        <div
          className="relative h-32 rounded overflow-hidden"
          style={{ background: '#0a1628' }}
        >
          {/* Route lines */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {waypoints.slice(0, -1).map((wp, i) => (
              <line
                key={wp.id}
                x1={wp.x}
                y1={wp.y}
                x2={waypoints[i + 1].x}
                y2={waypoints[i + 1].y}
                stroke={i < activeWaypoint ? '#06ffa5' : '#a8dadc40'}
                strokeWidth="2"
                strokeDasharray={i >= activeWaypoint ? '4 4' : 'none'}
              />
            ))}
          </svg>

          {/* Waypoint markers */}
          {waypoints.map((wp) => (
            <button
              key={wp.id}
              onClick={() => setActiveWaypoint(wp.id)}
              className="absolute transition-all duration-200"
              style={{
                left: `${wp.x}%`,
                top: `${wp.y}%`,
                transform: `translate(-50%, -50%) scale(${activeWaypoint === wp.id ? 1.3 : 1})`,
              }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                style={{
                  background: wp.id <= activeWaypoint ? '#06ffa520' : '#1d3557',
                  border: `2px solid ${wp.id <= activeWaypoint ? '#06ffa5' : '#a8dadc40'}`,
                  boxShadow: activeWaypoint === wp.id ? '0 0 15px #06ffa5' : 'none',
                }}
              >
                {wp.icon}
              </div>
            </button>
          ))}
        </div>

        {/* Active waypoint info */}
        <div className="mt-4 p-3 rounded" style={{ background: '#0a162840', border: '1px solid #a8dadc20' }}>
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-[#06ffa5]">{waypoints[activeWaypoint].icon} {waypoints[activeWaypoint].name}</span>
            <span className="font-mono text-xs text-[#a8dadc60]">{activeWaypoint + 1}/{waypoints.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- ARCTIC CRACK DIVIDER ---
export const ArcticCrackDivider: React.FC = () => {
  const [cracks, setCracks] = useState<{ x: number; y: number; angle: number }[]>([]);

  useEffect(() => {
    const generateCracks = () => {
      const newCracks = [];
      let x = 0;
      while (x < 100) {
        newCracks.push({
          x,
          y: 50 + (Math.random() - 0.5) * 20,
          angle: (Math.random() - 0.5) * 60,
        });
        x += 5 + Math.random() * 10;
      }
      setCracks(newCracks);
    };
    generateCracks();
  }, []);

  return (
    <div className="h-full flex flex-col items-center justify-center gap-8 p-8" style={{ background: '#0a1628' }}>
      <div className="text-[#a8dadc] font-mono text-sm">SECTOR ALPHA</div>

      {/* Ice crack divider */}
      <div className="relative w-64 h-8">
        <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
          {/* Main crack line */}
          <path
            d={`M 0 15 ${cracks.map(c => `L ${c.x} ${c.y / 100 * 30}`).join(' ')} L 100 15`}
            fill="none"
            stroke="#a8dadc"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Branch cracks */}
          {cracks.filter((_, i) => i % 2 === 0).map((c, i) => (
            <line
              key={i}
              x1={c.x}
              y1={c.y / 100 * 30}
              x2={c.x + Math.cos(c.angle * Math.PI / 180) * 8}
              y2={c.y / 100 * 30 + Math.sin(c.angle * Math.PI / 180) * 8}
              stroke="#a8dadc"
              strokeWidth="1"
              opacity="0.6"
            />
          ))}
          {/* Frost particles */}
          {cracks.map((c, i) => (
            <circle
              key={`p-${i}`}
              cx={c.x}
              cy={c.y / 100 * 30}
              r="1"
              fill="#ffffff"
              opacity={0.3 + Math.random() * 0.4}
            />
          ))}
        </svg>
      </div>

      <div className="text-[#a8dadc] font-mono text-sm">SECTOR BETA</div>
    </div>
  );
};

// --- ARCTIC WARNING ALERT ---
export const ArcticWarningAlert: React.FC = () => {
  const [pulseOpacity, setPulseOpacity] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseOpacity(_o => 0.5 + Math.sin(Date.now() * 0.01) * 0.5);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const alerts = [
    { type: 'critical', message: 'BLIZZARD WARNING: Visibility <10m', icon: '🌨️' },
    { type: 'warning', message: 'Temperature dropping rapidly', icon: '🌡️' },
    { type: 'info', message: 'Aurora activity detected', icon: '✨' },
  ];

  return (
    <div className="h-full flex flex-col items-center justify-center gap-4 p-6" style={{ background: '#0a1628' }}>
      {alerts.map((alert, i) => (
        <div
          key={i}
          className="relative w-72 p-4 rounded-lg overflow-hidden"
          style={{
            background: alert.type === 'critical'
              ? 'linear-gradient(180deg, #7f1d1d 0%, #450a0a 100%)'
              : alert.type === 'warning'
              ? 'linear-gradient(180deg, #78350f 0%, #451a03 100%)'
              : 'linear-gradient(180deg, #1d3557 0%, #14253d 100%)',
            border: `2px solid ${
              alert.type === 'critical' ? '#ef4444' : alert.type === 'warning' ? '#fbbf24' : '#06ffa5'
            }`,
            boxShadow: alert.type === 'critical'
              ? `0 0 20px rgba(239, 68, 68, ${pulseOpacity * 0.5})`
              : 'none',
          }}
        >
          {/* Frost overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 100% 0%, rgba(255,255,255,0.1) 0%, transparent 50%)',
            }}
          />

          <div className="relative flex items-start gap-3">
            <span className="text-2xl">{alert.icon}</span>
            <div>
              <div
                className="font-mono text-xs font-bold mb-1"
                style={{
                  color: alert.type === 'critical' ? '#ef4444' : alert.type === 'warning' ? '#fbbf24' : '#06ffa5',
                }}
              >
                {alert.type.toUpperCase()}
              </div>
              <p className="text-sm text-white">{alert.message}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// --- ARCTIC PENGUIN ICON ---
export const ArcticPenguinIcon: React.FC = () => {
  const [waddle, setWaddle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWaddle(_w => Math.sin(Date.now() * 0.005) * 10);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex items-center justify-center p-8" style={{ background: '#0a1628' }}>
      <div className="flex gap-8">
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className="relative cursor-pointer transition-transform hover:scale-110"
            style={{ transform: `rotate(${waddle * (i % 2 === 0 ? 1 : -1)}deg)` }}
          >
            <svg viewBox="0 0 64 80" className="w-16 h-20">
              {/* Body */}
              <ellipse cx="32" cy="50" rx="20" ry="28" fill="#1d3557" />

              {/* White belly */}
              <ellipse cx="32" cy="55" rx="12" ry="20" fill="#ffffff" />

              {/* Head */}
              <circle cx="32" cy="22" r="16" fill="#1d3557" />

              {/* Eyes */}
              <circle cx="26" cy="20" r="4" fill="#ffffff" />
              <circle cx="38" cy="20" r="4" fill="#ffffff" />
              <circle cx="27" cy="21" r="2" fill="#0a1628" />
              <circle cx="39" cy="21" r="2" fill="#0a1628" />

              {/* Beak */}
              <polygon points="32,25 28,32 36,32" fill="#f59e0b" />

              {/* Wings */}
              <ellipse cx="12" cy="50" rx="6" ry="16" fill="#1d3557" transform="rotate(-15 12 50)" />
              <ellipse cx="52" cy="50" rx="6" ry="16" fill="#1d3557" transform="rotate(15 52 50)" />

              {/* Feet */}
              <ellipse cx="24" cy="78" rx="6" ry="3" fill="#f59e0b" />
              <ellipse cx="40" cy="78" rx="6" ry="3" fill="#f59e0b" />

              {/* Cheeks (cold/rosy) */}
              <circle cx="22" cy="26" r="3" fill="#b388ff" opacity="0.5" />
              <circle cx="42" cy="26" r="3" fill="#b388ff" opacity="0.5" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- ARCTIC FROZEN HEADING ---
export const ArcticFrozenHeading: React.FC = () => {
  const [iceOffset, setIceOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIceOffset(o => (o + 0.5) % 100);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex flex-col items-center justify-center gap-6 p-8" style={{ background: '#0a1628' }}>
      <h1
        className="relative font-bold text-4xl tracking-widest"
        style={{
          color: 'transparent',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          backgroundImage: `linear-gradient(180deg,
            #ffffff 0%,
            #a8dadc 30%,
            #7ec8cc 60%,
            #5bb8bd 100%
          )`,
          textShadow: '0 0 30px rgba(168, 218, 220, 0.5)',
        }}
      >
        ARCTIC STATION

        {/* Ice drips */}
        <svg className="absolute -bottom-4 left-0 w-full h-6" viewBox="0 0 200 20" preserveAspectRatio="none">
          {[...Array(15)].map((_, i) => (
            <polygon
              key={i}
              points={`${i * 14 + 5},0 ${i * 14 + 8},${6 + Math.sin((iceOffset + i * 10) * 0.1) * 4} ${i * 14 + 2},0`}
              fill="#a8dadc"
              opacity={0.6 + Math.sin((iceOffset + i * 10) * 0.1) * 0.3}
            />
          ))}
        </svg>
      </h1>

      <h2
        className="font-mono text-lg tracking-[0.3em]"
        style={{
          color: '#a8dadc',
          textShadow: '0 0 10px rgba(168, 218, 220, 0.3)',
        }}
      >
        RESEARCH FACILITY
      </h2>

      {/* Frost particles around text */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
          style={{
            left: `${30 + Math.random() * 40}%`,
            top: `${40 + Math.random() * 20}%`,
            animationDelay: `${i * 0.2}s`,
            opacity: 0.4,
          }}
        />
      ))}
    </div>
  );
};

// --- ARCTIC TEMP SLIDER ---
export const ArcticTempSlider: React.FC = () => {
  const [temp, setTemp] = useState(-30);
  const [_isAnimating, _setIsAnimating] = useState(false);

  const minTemp = -60;
  const maxTemp = 0;
  const percentage = ((temp - minTemp) / (maxTemp - minTemp)) * 100;

  const getTempColor = (t: number) => {
    if (t < -45) return '#b388ff'; // Aurora purple - extreme cold
    if (t < -30) return '#06ffa5'; // Aurora green - very cold
    if (t < -15) return '#a8dadc'; // Ice blue - cold
    return '#fbbf24'; // Warning - approaching 0
  };

  return (
    <div className="h-full flex flex-col items-center justify-center gap-6 p-8" style={{ background: '#0a1628' }}>
      {/* Temperature display */}
      <div
        className="relative p-6 rounded-lg"
        style={{
          background: 'linear-gradient(180deg, #1d3557 0%, #14253d 100%)',
          border: '2px solid #a8dadc40',
        }}
      >
        {/* Thermometer visual */}
        <div className="flex items-center gap-6">
          {/* Thermometer bulb and tube */}
          <div className="relative">
            <div
              className="w-8 h-40 rounded-full relative overflow-hidden"
              style={{
                background: '#0a1628',
                border: '3px solid #a8dadc',
              }}
            >
              {/* Mercury/fluid level */}
              <div
                className="absolute bottom-0 left-0 right-0 transition-all duration-300"
                style={{
                  height: `${percentage}%`,
                  background: `linear-gradient(180deg, ${getTempColor(temp)}, ${getTempColor(temp)}aa)`,
                  boxShadow: `0 0 10px ${getTempColor(temp)}60`,
                }}
              />

              {/* Scale marks */}
              {[-60, -45, -30, -15, 0].map(t => (
                <div
                  key={t}
                  className="absolute left-0 w-2 h-px"
                  style={{
                    bottom: `${((t - minTemp) / (maxTemp - minTemp)) * 100}%`,
                    background: '#a8dadc',
                  }}
                />
              ))}
            </div>

            {/* Bulb */}
            <div
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full"
              style={{
                background: getTempColor(temp),
                boxShadow: `0 0 20px ${getTempColor(temp)}60`,
              }}
            />
          </div>

          {/* Digital readout */}
          <div className="text-right">
            <div
              className="font-mono text-5xl font-bold transition-colors"
              style={{ color: getTempColor(temp) }}
            >
              {temp}
            </div>
            <div className="font-mono text-xl text-[#a8dadc]">C</div>
            <div className="font-mono text-xs text-[#a8dadc60] mt-2">
              {temp < -45 ? 'EXTREME' : temp < -30 ? 'SEVERE' : temp < -15 ? 'COLD' : 'CAUTION'}
            </div>
          </div>
        </div>
      </div>

      {/* Slider control */}
      <div className="w-64">
        <input
          type="range"
          min={minTemp}
          max={maxTemp}
          value={temp}
          onChange={(e) => setTemp(Number(e.target.value))}
          className="w-full h-3 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(90deg, #b388ff 0%, #06ffa5 33%, #a8dadc 66%, #fbbf24 100%)`,
          }}
        />
        <div className="flex justify-between mt-2 font-mono text-xs text-[#a8dadc60]">
          <span>{minTemp}C</span>
          <span>{maxTemp}C</span>
        </div>
      </div>
    </div>
  );
};

// --- ARCTIC STATION TABS ---
export const ArcticStationTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('lab');

  const tabs = [
    { id: 'lab', label: 'LABORATORY', icon: '🔬' },
    { id: 'comms', label: 'COMMS', icon: '📡' },
    { id: 'quarters', label: 'QUARTERS', icon: '🛏️' },
    { id: 'storage', label: 'STORAGE', icon: '📦' },
  ];

  return (
    <div className="h-full flex flex-col items-center justify-center p-6" style={{ background: '#0a1628' }}>
      <div
        className="w-full max-w-md rounded-lg overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #1d3557 0%, #14253d 100%)',
          border: '2px solid #a8dadc40',
        }}
      >
        {/* Tab headers */}
        <div className="flex border-b border-[#a8dadc30]">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex-1 px-4 py-3 font-mono text-xs transition-all relative"
              style={{
                background: activeTab === tab.id ? '#0a162860' : 'transparent',
                color: activeTab === tab.id ? '#06ffa5' : '#a8dadc60',
              }}
            >
              <span className="mr-1">{tab.icon}</span>
              {tab.label}

              {/* Active indicator */}
              {activeTab === tab.id && (
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{
                    background: 'linear-gradient(90deg, transparent, #06ffa5, transparent)',
                    boxShadow: '0 0 10px #06ffa5',
                  }}
                />
              )}

              {/* Frost effect on active */}
              {activeTab === tab.id && (
                <div
                  className="absolute top-0 left-0 right-0 h-2"
                  style={{
                    background: 'linear-gradient(180deg, rgba(168, 218, 220, 0.1) 0%, transparent 100%)',
                  }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{tabs.find(t => t.id === activeTab)?.icon}</span>
            <div>
              <h3 className="font-bold text-white">{tabs.find(t => t.id === activeTab)?.label}</h3>
              <p className="font-mono text-xs text-[#a8dadc60]">SECTOR {activeTab.toUpperCase()}-7</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded" style={{ background: '#0a162860', border: '1px solid #a8dadc20' }}>
              <div className="font-mono text-xs text-[#a8dadc60]">STATUS</div>
              <div className="font-mono text-sm text-[#06ffa5]">OPERATIONAL</div>
            </div>
            <div className="p-3 rounded" style={{ background: '#0a162860', border: '1px solid #a8dadc20' }}>
              <div className="font-mono text-xs text-[#a8dadc60]">TEMP</div>
              <div className="font-mono text-sm text-[#a8dadc]">-12C</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- ARCTIC SNOW BACKGROUND ---
export const ArcticSnowBackground: React.FC = () => {
  const [snowflakes, setSnowflakes] = useState<{ id: number; x: number; y: number; size: number; speed: number; wobble: number }[]>([]);
  const [windOffset, setWindOffset] = useState(0);

  useEffect(() => {
    const flakes = [...Array(50)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 4,
      speed: 0.5 + Math.random() * 1,
      wobble: Math.random() * Math.PI * 2,
    }));
    setSnowflakes(flakes);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWindOffset(_w => Math.sin(Date.now() * 0.001) * 2);
      setSnowflakes(prev => prev.map(flake => ({
        ...flake,
        x: (flake.x + Math.sin(flake.wobble + Date.now() * 0.002) * 0.3 + windOffset * 0.1 + 100) % 100,
        y: (flake.y + flake.speed * 0.3) % 100,
        wobble: flake.wobble + 0.02,
      })));
    }, 50);
    return () => clearInterval(interval);
  }, [windOffset]);

  return (
    <div
      className="h-full relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #1d3557 0%, #14253d 50%, #0a1628 100%)',
      }}
    >
      {/* Aurora in sky */}
      <div
        className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 20% 20%, rgba(6, 255, 165, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 30%, rgba(179, 136, 255, 0.1) 0%, transparent 40%),
            radial-gradient(ellipse at 50% 10%, rgba(6, 255, 165, 0.1) 0%, transparent 60%)
          `,
        }}
      />

      {/* Mountain silhouettes */}
      <svg className="absolute bottom-0 left-0 right-0 h-1/3" viewBox="0 0 100 30" preserveAspectRatio="none">
        <polygon points="0,30 15,10 30,25 45,5 60,20 75,8 90,22 100,15 100,30" fill="#0a1628" />
        <polygon points="0,30 10,15 25,28 40,12 55,25 70,10 85,23 100,18 100,30" fill="#14253d" opacity="0.7" />
      </svg>

      {/* Snowflakes */}
      {snowflakes.map(flake => (
        <div
          key={flake.id}
          className="absolute rounded-full"
          style={{
            left: `${flake.x}%`,
            top: `${flake.y}%`,
            width: flake.size,
            height: flake.size,
            background: '#ffffff',
            opacity: 0.4 + (flake.size / 6) * 0.4,
            boxShadow: '0 0 4px rgba(255, 255, 255, 0.5)',
          }}
        />
      ))}

      {/* Blowing snow at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
        style={{
          background: 'linear-gradient(0deg, rgba(168, 218, 220, 0.2) 0%, transparent 100%)',
          animation: 'blowingSnow 3s ease-in-out infinite',
        }}
      />

      {/* Content overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="font-mono text-xs text-[#a8dadc60] tracking-widest">POLAR RESEARCH STATION</div>
          <div className="font-bold text-2xl text-white mt-2">OUTPOST AURORA</div>
        </div>
      </div>

      <style>{`
        @keyframes blowingSnow {
          0%, 100% { transform: translateX(-2%); opacity: 0.3; }
          50% { transform: translateX(2%); opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

// Export all components
export const arcticStationComponents: Record<string, React.FC> = {
  'arctic-ice-button': ArcticIceButton,
  'arctic-research-card': ArcticResearchCard,
  'arctic-frozen-input': ArcticFrozenInput,
  'arctic-snowflake-badge': ArcticSnowflakeBadge,
  'arctic-power-toggle': ArcticPowerToggle,
  'arctic-aurora-progress': ArcticAuroraProgress,
  'arctic-radar-loader': ArcticRadarLoader,
  'arctic-parka-avatar': ArcticParkaAvatar,
  'arctic-blast-modal': ArcticBlastModal,
  'arctic-expedition-nav': ArcticExpeditionNav,
  'arctic-crack-divider': ArcticCrackDivider,
  'arctic-warning-alert': ArcticWarningAlert,
  'arctic-penguin-icon': ArcticPenguinIcon,
  'arctic-frozen-heading': ArcticFrozenHeading,
  'arctic-temp-slider': ArcticTempSlider,
  'arctic-station-tabs': ArcticStationTabs,
  'arctic-snow-background': ArcticSnowBackground,
};
