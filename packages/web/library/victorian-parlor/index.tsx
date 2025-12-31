import React, { useState, useEffect } from 'react';

// Victorian color palette
const colors = {
  burgundy: '#722F37',
  gold: '#c9a227',
  cream: '#f4e4bc',
  darkWood: '#3d2914',
};

// --- VICTORIAN CAMEO BUTTON ---
export const VictorianCameoButton = () => {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="h-full flex items-center justify-center p-8"
      style={{
        background: `linear-gradient(135deg, ${colors.darkWood} 0%, #1a0f08 50%, ${colors.darkWood} 100%)`,
      }}
    >
      <button
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => { setIsPressed(false); setIsHovered(false); }}
        onMouseEnter={() => setIsHovered(true)}
        className="relative group"
      >
        {/* Ornate outer frame */}
        <div
          className="absolute -inset-3 rounded-full"
          style={{
            background: `linear-gradient(135deg, ${colors.gold} 0%, #8b7019 50%, ${colors.gold} 100%)`,
            boxShadow: `0 4px 12px rgba(0,0,0,0.5), inset 0 1px 2px rgba(255,255,255,0.3)`,
          }}
        />

        {/* Filigree pattern ring */}
        <div
          className="absolute -inset-2 rounded-full"
          style={{
            border: `2px solid ${colors.darkWood}`,
            background: 'transparent',
          }}
        />

        {/* Cameo base - oval shape */}
        <div
          className="relative w-28 h-36 flex items-center justify-center transition-all duration-200"
          style={{
            background: isPressed
              ? `linear-gradient(180deg, ${colors.burgundy} 0%, #4a1c22 100%)`
              : `linear-gradient(180deg, #8a3a42 0%, ${colors.burgundy} 50%, #4a1c22 100%)`,
            borderRadius: '50%',
            boxShadow: isPressed
              ? `inset 0 4px 12px rgba(0,0,0,0.6)`
              : `0 6px 16px rgba(0,0,0,0.4), inset 0 -2px 6px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.1)`,
            transform: isPressed ? 'scale(0.96)' : 'scale(1)',
          }}
        >
          {/* Silhouette profile */}
          <svg viewBox="0 0 60 80" className="w-16 h-20" style={{ filter: 'drop-shadow(1px 1px 1px rgba(0,0,0,0.3))' }}>
            <defs>
              <linearGradient id="cameoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={colors.cream} />
                <stop offset="100%" stopColor="#d4c4a0" />
              </linearGradient>
            </defs>
            {/* Victorian lady profile silhouette */}
            <path
              d="M35 15 C42 15 48 22 48 32 C48 38 45 43 42 46 L44 48 C46 50 47 54 46 58 L45 62 C44 66 40 70 35 72 L28 74 C24 75 20 73 18 70 L16 66 C14 62 15 58 17 55 L20 50 C16 47 12 42 12 35 C12 28 14 22 18 18 C22 14 28 12 35 15 Z"
              fill="url(#cameoGradient)"
            />
            {/* Hair bun detail */}
            <ellipse cx="38" cy="20" rx="8" ry="10" fill="url(#cameoGradient)" />
          </svg>

          {/* Decorative pearls */}
          {[...Array(8)].map((_, i) => {
            const angle = (i * 45) * (Math.PI / 180);
            const x = Math.cos(angle) * 48;
            const y = Math.sin(angle) * 62;
            return (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  left: `calc(50% + ${x}px - 4px)`,
                  top: `calc(50% + ${y}px - 4px)`,
                  background: `radial-gradient(circle at 30% 30%, #fff, ${colors.cream})`,
                  boxShadow: '0 1px 2px rgba(0,0,0,0.3)',
                }}
              />
            );
          })}
        </div>

        {/* Hover glow effect */}
        {isHovered && (
          <div
            className="absolute -inset-4 rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${colors.gold}20 0%, transparent 70%)`,
            }}
          />
        )}
      </button>

      <style>{`
        @keyframes cameoShimmer {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
};

// --- VICTORIAN PORTRAIT CARD ---
export const VictorianPortraitCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="h-full flex items-center justify-center p-8"
      style={{
        background: `linear-gradient(180deg, ${colors.darkWood} 0%, #1a0f08 100%)`,
      }}
    >
      <div
        className="relative w-64 h-80 cursor-pointer"
        style={{ perspective: '1000px' }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div
          className="relative w-full h-full transition-transform duration-700"
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* Front - Portrait */}
          <div
            className="absolute inset-0 rounded-lg overflow-hidden"
            style={{
              backfaceVisibility: 'hidden',
              background: colors.cream,
            }}
          >
            {/* Ornate gilt frame */}
            <div
              className="absolute inset-0"
              style={{
                border: `12px solid transparent`,
                borderImage: `linear-gradient(135deg, ${colors.gold}, #8b7019, ${colors.gold}, #a88a1f, ${colors.gold}) 1`,
                boxShadow: `inset 0 0 20px rgba(0,0,0,0.3), 0 8px 24px rgba(0,0,0,0.5)`,
              }}
            />

            {/* Inner decorative border */}
            <div
              className="absolute inset-3 rounded"
              style={{
                border: `3px solid ${colors.burgundy}`,
                boxShadow: `inset 0 0 10px rgba(0,0,0,0.2)`,
              }}
            />

            {/* Corner ornaments */}
            {[
              { top: 4, left: 4 },
              { top: 4, right: 4 },
              { bottom: 4, left: 4 },
              { bottom: 4, right: 4 },
            ].map((pos, i) => (
              <div
                key={i}
                className="absolute w-8 h-8"
                style={pos}
              >
                <svg viewBox="0 0 32 32" className="w-full h-full">
                  <path
                    d={i < 2
                      ? (i === 0 ? "M2 30 Q2 2 30 2" : "M30 30 Q30 2 2 2")
                      : (i === 2 ? "M2 2 Q2 30 30 30" : "M30 2 Q30 30 2 30")}
                    fill="none"
                    stroke={colors.gold}
                    strokeWidth="2"
                  />
                  <circle
                    cx={i % 2 === 0 ? 6 : 26}
                    cy={i < 2 ? 6 : 26}
                    r="3"
                    fill={colors.gold}
                  />
                </svg>
              </div>
            ))}

            {/* Portrait area */}
            <div
              className="absolute inset-6 flex flex-col items-center justify-center"
              style={{ background: `linear-gradient(180deg, #e8d8b8, ${colors.cream})` }}
            >
              {/* Silhouette portrait */}
              <div
                className="w-24 h-32 rounded-t-full mb-4"
                style={{
                  background: colors.darkWood,
                  boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)',
                }}
              />
              <div className="text-center">
                <p className="font-serif text-lg" style={{ color: colors.darkWood }}>
                  Lady Victoria
                </p>
                <p className="font-serif text-xs italic" style={{ color: colors.burgundy }}>
                  Circa 1887
                </p>
              </div>
            </div>

            {/* Nameplate */}
            <div
              className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-1 rounded"
              style={{
                background: `linear-gradient(180deg, ${colors.gold}, #8b7019)`,
                boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              <span className="font-serif text-xs" style={{ color: colors.darkWood }}>
                PORTRAIT
              </span>
            </div>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 rounded-lg p-6 flex flex-col items-center justify-center"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              background: `linear-gradient(135deg, ${colors.burgundy} 0%, #4a1c22 100%)`,
              border: `4px solid ${colors.gold}`,
            }}
          >
            {/* Damask pattern overlay */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `repeating-linear-gradient(45deg, ${colors.gold} 0px, ${colors.gold} 1px, transparent 1px, transparent 10px)`,
              }}
            />
            <p className="font-serif text-lg text-center" style={{ color: colors.cream }}>
              "A portrait captures not just a likeness, but the very essence of the soul."
            </p>
            <p className="mt-4 font-serif text-sm italic" style={{ color: colors.gold }}>
              - Anonymous, 1892
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- VICTORIAN QUILL INPUT ---
export const VictorianQuillInput = () => {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [inkDrips, setInkDrips] = useState<number[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (Math.random() > 0.7) {
      setInkDrips(prev => [...prev.slice(-3), Date.now()]);
    }
  };

  return (
    <div
      className="h-full flex flex-col items-center justify-center p-8"
      style={{
        background: `linear-gradient(180deg, ${colors.darkWood} 0%, #1a0f08 100%)`,
      }}
    >
      <div className="relative">
        {/* Parchment scroll background */}
        <div
          className="relative px-8 py-6 rounded"
          style={{
            background: `linear-gradient(180deg, ${colors.cream} 0%, #e8d8b8 50%, ${colors.cream} 100%)`,
            boxShadow: `0 8px 24px rgba(0,0,0,0.4), inset 0 0 20px rgba(0,0,0,0.1)`,
            border: `2px solid ${colors.gold}`,
          }}
        >
          {/* Aged paper texture lines */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute left-4 right-4 h-px"
              style={{
                top: `${20 + i * 15}%`,
                background: `linear-gradient(90deg, transparent, ${colors.burgundy}30, transparent)`,
              }}
            />
          ))}

          {/* Quill feather decoration */}
          <div className="absolute -right-8 -top-6 w-16 h-24">
            <svg viewBox="0 0 60 100" className="w-full h-full">
              <defs>
                <linearGradient id="quillGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f5f5f5" />
                  <stop offset="50%" stopColor="#d4d4d4" />
                  <stop offset="100%" stopColor="#a3a3a3" />
                </linearGradient>
              </defs>
              {/* Feather vane */}
              <path
                d="M30 5 Q50 25 45 50 Q40 70 30 95 Q20 70 15 50 Q10 25 30 5"
                fill="url(#quillGradient)"
                stroke={colors.darkWood}
                strokeWidth="0.5"
              />
              {/* Feather barbs */}
              {[...Array(8)].map((_, i) => (
                <line
                  key={i}
                  x1="30"
                  y1={15 + i * 10}
                  x2={i % 2 === 0 ? 45 : 15}
                  y2={20 + i * 10}
                  stroke={colors.darkWood}
                  strokeWidth="0.3"
                  opacity="0.5"
                />
              ))}
              {/* Quill tip */}
              <path
                d="M28 95 L30 100 L32 95"
                fill={colors.darkWood}
              />
            </svg>
          </div>

          {/* Ink well */}
          <div className="absolute -left-6 bottom-2 w-10 h-12">
            <div
              className="w-full h-full rounded-b-lg"
              style={{
                background: `linear-gradient(180deg, ${colors.darkWood} 0%, #1a0f08 100%)`,
                boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
              }}
            />
            {/* Ink drips */}
            {inkDrips.map(id => (
              <div
                key={id}
                className="absolute top-0 left-1/2 w-2 h-4 rounded-full"
                style={{
                  background: colors.darkWood,
                  animation: 'inkDrip 0.5s ease-in forwards',
                }}
              />
            ))}
          </div>

          {/* Input field */}
          <div className="relative">
            <label
              className="block font-serif text-sm mb-2"
              style={{ color: colors.burgundy }}
            >
              Correspondence
            </label>
            <input
              type="text"
              value={value}
              onChange={handleChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Inscribe your message..."
              className="w-64 px-4 py-3 font-serif text-lg outline-none transition-all"
              style={{
                background: 'transparent',
                borderBottom: `2px solid ${isFocused ? colors.burgundy : colors.gold}`,
                color: colors.darkWood,
              }}
            />

            {/* Writing cursor animation */}
            {isFocused && (
              <div
                className="absolute right-4 bottom-4 w-0.5 h-5"
                style={{
                  background: colors.burgundy,
                  animation: 'quillBlink 1s infinite',
                }}
              />
            )}
          </div>

          {/* Wax seal decoration */}
          <div
            className="absolute -bottom-4 right-4 w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${colors.burgundy}, #4a1c22)`,
              boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
            }}
          >
            <span className="font-serif text-xs" style={{ color: colors.gold }}>V</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes quillBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes inkDrip {
          0% { transform: translateY(0) translateX(-50%); opacity: 1; }
          100% { transform: translateY(20px) translateX(-50%); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

// --- VICTORIAN WAX SEAL BADGE ---
export const VictorianWaxSealBadge = () => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <div
      className="h-full flex items-center justify-center p-8"
      style={{
        background: `linear-gradient(135deg, ${colors.darkWood} 0%, #1a0f08 100%)`,
      }}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Main wax seal */}
        <div
          className="relative cursor-pointer"
          onMouseDown={() => setIsPressed(true)}
          onMouseUp={() => setIsPressed(false)}
          onMouseLeave={() => setIsPressed(false)}
        >
          {/* Wax drip edges */}
          <svg
            viewBox="0 0 120 120"
            className="absolute -inset-3 w-32 h-32"
            style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))' }}
          >
            <path
              d={`M60 5
                  Q75 8 80 5 Q85 12 90 10 Q95 18 100 15
                  Q105 25 110 22 Q112 35 115 30
                  Q115 45 118 40 Q115 55 118 50
                  Q112 65 115 60 Q108 75 112 70
                  Q100 85 105 80 Q92 92 98 88
                  Q80 98 88 95 Q68 102 78 100
                  Q55 105 65 102 Q42 102 52 105
                  Q30 100 40 102 Q20 95 28 98
                  Q12 88 18 92 Q8 80 12 85
                  Q5 70 8 75 Q2 60 5 65
                  Q2 50 5 55 Q5 40 2 45
                  Q8 30 5 35 Q12 20 8 25
                  Q18 12 12 18 Q25 5 20 10
                  Q35 2 30 5 Q45 2 40 5
                  Q55 2 50 5 Z`}
              fill={colors.burgundy}
            />
          </svg>

          {/* Main seal body */}
          <div
            className="relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-150"
            style={{
              background: isPressed
                ? `radial-gradient(circle at 60% 60%, #4a1c22, ${colors.burgundy})`
                : `radial-gradient(circle at 30% 30%, #8a3a42, ${colors.burgundy}, #4a1c22)`,
              boxShadow: isPressed
                ? 'inset 0 4px 12px rgba(0,0,0,0.5)'
                : `0 6px 16px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.1)`,
              transform: isPressed ? 'scale(0.95)' : 'scale(1)',
            }}
          >
            {/* Embossed monogram */}
            <div
              className="text-3xl font-serif font-bold"
              style={{
                color: isPressed ? '#5a2028' : '#6a2830',
                textShadow: isPressed
                  ? 'none'
                  : '1px 1px 0 #9a4a52, -1px -1px 0 #3a1018',
              }}
            >
              VP
            </div>

            {/* Decorative ring */}
            <div
              className="absolute inset-2 rounded-full"
              style={{
                border: `2px solid ${isPressed ? '#4a1c22' : '#5a2028'}`,
              }}
            />
          </div>

          {/* Ribbon */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex">
            <div
              className="w-6 h-12 -rotate-12"
              style={{
                background: `linear-gradient(180deg, ${colors.gold} 0%, #8b7019 100%)`,
                clipPath: 'polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%)',
              }}
            />
            <div
              className="w-6 h-12 rotate-12 -ml-2"
              style={{
                background: `linear-gradient(180deg, ${colors.gold} 0%, #8b7019 100%)`,
                clipPath: 'polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%)',
              }}
            />
          </div>
        </div>

        {/* Badge text */}
        <div className="mt-6 text-center">
          <p className="font-serif text-lg" style={{ color: colors.gold }}>
            Certified Authentic
          </p>
          <p className="font-serif text-xs" style={{ color: colors.cream }}>
            Victorian Seal of Approval
          </p>
        </div>
      </div>
    </div>
  );
};

// --- VICTORIAN GASLAMP TOGGLE ---
export const VictorianGaslampToggle = () => {
  const [isOn, setIsOn] = useState(false);
  const [flameIntensity, setFlameIntensity] = useState(0);

  useEffect(() => {
    if (!isOn) {
      setFlameIntensity(0);
      return;
    }
    const interval = setInterval(() => {
      setFlameIntensity(Math.random() * 0.3 + 0.7);
    }, 100);
    return () => clearInterval(interval);
  }, [isOn]);

  return (
    <div
      className="h-full flex items-center justify-center p-8"
      style={{
        background: isOn
          ? `radial-gradient(circle at 50% 30%, ${colors.gold}30 0%, ${colors.darkWood} 50%, #1a0f08 100%)`
          : `linear-gradient(180deg, ${colors.darkWood} 0%, #1a0f08 100%)`,
        transition: 'background 0.5s ease',
      }}
    >
      <div className="flex flex-col items-center">
        {/* Gas lamp */}
        <div className="relative">
          {/* Lamp bracket */}
          <div
            className="absolute -top-8 left-1/2 -translate-x-1/2 w-2 h-8"
            style={{
              background: `linear-gradient(90deg, ${colors.darkWood}, #5a3a1a, ${colors.darkWood})`,
            }}
          />

          {/* Decorative mount */}
          <div
            className="absolute -top-10 left-1/2 -translate-x-1/2 w-8 h-4"
            style={{
              background: `linear-gradient(180deg, ${colors.gold}, #8b7019)`,
              borderRadius: '50% 50% 0 0',
            }}
          />

          {/* Glass globe */}
          <div
            className="relative w-24 h-32 rounded-t-full overflow-hidden"
            style={{
              background: isOn
                ? `radial-gradient(circle at 50% 40%, rgba(255,220,150,0.3), transparent 60%)`
                : 'transparent',
              border: `3px solid ${colors.gold}`,
              boxShadow: isOn
                ? `0 0 40px ${colors.gold}40, inset 0 0 30px rgba(255,200,100,0.2)`
                : 'none',
            }}
          >
            {/* Flame */}
            {isOn && (
              <div
                className="absolute bottom-4 left-1/2 -translate-x-1/2"
                style={{
                  opacity: flameIntensity,
                  transition: 'opacity 0.1s ease',
                }}
              >
                <div
                  className="w-6 h-12 rounded-t-full"
                  style={{
                    background: `linear-gradient(180deg, #ffcc00 0%, #ff8800 50%, #ff4400 100%)`,
                    filter: 'blur(2px)',
                    animation: 'flicker 0.15s infinite alternate',
                  }}
                />
                {/* Inner flame */}
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-8 rounded-t-full"
                  style={{
                    background: 'linear-gradient(180deg, #fff 0%, #ffdd00 100%)',
                    filter: 'blur(1px)',
                  }}
                />
              </div>
            )}

            {/* Wick */}
            <div
              className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-4"
              style={{ background: colors.darkWood }}
            />
          </div>

          {/* Lamp base */}
          <div
            className="w-28 h-6 -mt-1 rounded-b-lg"
            style={{
              background: `linear-gradient(180deg, ${colors.gold} 0%, #8b7019 50%, ${colors.gold} 100%)`,
              boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
            }}
          />

          {/* Glow effect */}
          {isOn && (
            <div
              className="absolute -inset-8 rounded-full pointer-events-none"
              style={{
                background: `radial-gradient(circle, ${colors.gold}30 0%, transparent 70%)`,
                animation: 'pulse 2s infinite',
              }}
            />
          )}
        </div>

        {/* Toggle switch */}
        <button
          onClick={() => setIsOn(!isOn)}
          className="mt-8 relative w-20 h-10 rounded-full transition-all duration-300"
          style={{
            background: isOn
              ? `linear-gradient(180deg, ${colors.gold} 0%, #8b7019 100%)`
              : `linear-gradient(180deg, ${colors.darkWood} 0%, #1a0f08 100%)`,
            border: `3px solid ${colors.gold}`,
            boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
          }}
        >
          {/* Toggle knob */}
          <div
            className="absolute top-1 w-6 h-6 rounded-full transition-all duration-300"
            style={{
              left: isOn ? 'calc(100% - 28px)' : '4px',
              background: `radial-gradient(circle at 30% 30%, ${colors.cream}, #d4c4a0)`,
              boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
            }}
          />
        </button>

        {/* Label */}
        <p className="mt-4 font-serif" style={{ color: isOn ? colors.gold : colors.cream }}>
          {isOn ? 'Illuminated' : 'Extinguished'}
        </p>
      </div>

      <style>{`
        @keyframes flicker {
          0% { transform: translateX(-50%) scaleY(1) scaleX(1); }
          100% { transform: translateX(-50%) scaleY(1.05) scaleX(0.95); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
};

// --- VICTORIAN HOURGLASS PROGRESS ---
export const VictorianHourglassProgress = () => {
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [sandParticles, setSandParticles] = useState<number[]>([]);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) return 0;
        return p + 1;
      });
      if (Math.random() > 0.5) {
        setSandParticles(prev => [...prev.slice(-8), Date.now()]);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [isRunning]);

  const topSand = 100 - progress;
  const bottomSand = progress;

  return (
    <div
      className="h-full flex flex-col items-center justify-center p-8"
      style={{
        background: `linear-gradient(180deg, ${colors.darkWood} 0%, #1a0f08 100%)`,
      }}
    >
      {/* Hourglass frame */}
      <div className="relative">
        {/* Top ornamental cap */}
        <div
          className="w-32 h-6 rounded-t-lg mb-1"
          style={{
            background: `linear-gradient(180deg, ${colors.gold} 0%, #8b7019 100%)`,
            boxShadow: '0 -2px 8px rgba(0,0,0,0.3)',
          }}
        >
          {/* Decorative finial */}
          <div
            className="absolute -top-4 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${colors.gold}, #8b7019)`,
            }}
          />
        </div>

        {/* Glass container */}
        <div className="relative w-32 h-48">
          {/* Top bulb */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-20 rounded-t-full overflow-hidden"
            style={{
              background: 'rgba(244,228,188,0.1)',
              border: `2px solid ${colors.gold}40`,
            }}
          >
            {/* Top sand */}
            <div
              className="absolute bottom-0 left-0 right-0 transition-all duration-100"
              style={{
                height: `${topSand}%`,
                background: `linear-gradient(180deg, ${colors.gold}80, #8b7019)`,
              }}
            />
          </div>

          {/* Neck */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-8"
            style={{
              background: 'rgba(244,228,188,0.1)',
              borderLeft: `2px solid ${colors.gold}40`,
              borderRight: `2px solid ${colors.gold}40`,
            }}
          >
            {/* Falling sand particles */}
            {isRunning && progress < 100 && sandParticles.map(id => (
              <div
                key={id}
                className="absolute w-1 h-1 rounded-full left-1/2 -translate-x-1/2"
                style={{
                  background: colors.gold,
                  animation: 'sandFall 0.5s linear forwards',
                }}
              />
            ))}
          </div>

          {/* Bottom bulb */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-28 h-20 rounded-b-full overflow-hidden"
            style={{
              background: 'rgba(244,228,188,0.1)',
              border: `2px solid ${colors.gold}40`,
            }}
          >
            {/* Bottom sand */}
            <div
              className="absolute bottom-0 left-0 right-0 transition-all duration-100"
              style={{
                height: `${bottomSand}%`,
                background: `linear-gradient(180deg, #8b7019, ${colors.gold}80)`,
                borderRadius: '0 0 100% 100%',
              }}
            />
          </div>

          {/* Side supports */}
          <div
            className="absolute top-4 left-0 w-2 h-40"
            style={{
              background: `linear-gradient(90deg, ${colors.gold}, #8b7019)`,
              borderRadius: '4px',
            }}
          />
          <div
            className="absolute top-4 right-0 w-2 h-40"
            style={{
              background: `linear-gradient(90deg, #8b7019, ${colors.gold})`,
              borderRadius: '4px',
            }}
          />
        </div>

        {/* Bottom ornamental cap */}
        <div
          className="w-32 h-6 rounded-b-lg mt-1"
          style={{
            background: `linear-gradient(180deg, #8b7019, ${colors.gold})`,
            boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
          }}
        />
      </div>

      {/* Progress display */}
      <div className="mt-6 text-center">
        <p className="font-serif text-2xl" style={{ color: colors.gold }}>
          {progress}%
        </p>
        <p className="font-serif text-sm" style={{ color: colors.cream }}>
          Time Elapsed
        </p>
      </div>

      {/* Controls */}
      <button
        onClick={() => setIsRunning(!isRunning)}
        className="mt-4 px-6 py-2 font-serif transition-all"
        style={{
          background: isRunning
            ? `linear-gradient(180deg, ${colors.burgundy}, #4a1c22)`
            : `linear-gradient(180deg, ${colors.gold}, #8b7019)`,
          border: `2px solid ${colors.gold}`,
          color: isRunning ? colors.cream : colors.darkWood,
          borderRadius: '4px',
        }}
      >
        {isRunning ? 'Pause' : 'Resume'}
      </button>

      <style>{`
        @keyframes sandFall {
          0% { top: 0; opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

// --- VICTORIAN PENDULUM LOADER ---
export const VictorianPendulumLoader = () => {
  const [angle, setAngle] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setAngle(a => {
        const newAngle = a + direction * 2;
        if (newAngle >= 30) setDirection(-1);
        if (newAngle <= -30) setDirection(1);
        return newAngle;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [direction]);

  return (
    <div
      className="h-full flex flex-col items-center justify-center p-8"
      style={{
        background: `linear-gradient(180deg, ${colors.darkWood} 0%, #1a0f08 100%)`,
      }}
    >
      {/* Clock housing */}
      <div className="relative">
        {/* Ornate arch */}
        <div
          className="w-48 h-24 rounded-t-full"
          style={{
            background: `linear-gradient(180deg, ${colors.gold} 0%, #8b7019 100%)`,
            boxShadow: '0 -4px 12px rgba(0,0,0,0.3)',
          }}
        >
          {/* Decorative scrollwork */}
          <svg viewBox="0 0 200 100" className="w-full h-full">
            <path
              d="M20 80 Q50 20 100 20 Q150 20 180 80"
              fill="none"
              stroke={colors.darkWood}
              strokeWidth="3"
            />
            <circle cx="100" cy="25" r="8" fill={colors.burgundy} />
            <circle cx="60" cy="50" r="5" fill={colors.burgundy} />
            <circle cx="140" cy="50" r="5" fill={colors.burgundy} />
          </svg>
        </div>

        {/* Pendulum housing */}
        <div
          className="w-48 h-64 relative overflow-hidden"
          style={{
            background: `linear-gradient(180deg, ${colors.darkWood} 0%, #1a0f08 100%)`,
            border: `4px solid ${colors.gold}`,
            borderTop: 'none',
          }}
        >
          {/* Pivot point */}
          <div
            className="absolute top-2 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${colors.gold}, #8b7019)`,
              boxShadow: '0 2px 4px rgba(0,0,0,0.4)',
            }}
          />

          {/* Pendulum arm and bob */}
          <div
            className="absolute top-4 left-1/2 origin-top transition-transform"
            style={{
              transform: `translateX(-50%) rotate(${angle}deg)`,
            }}
          >
            {/* Arm */}
            <div
              className="w-1 h-40 mx-auto"
              style={{
                background: `linear-gradient(180deg, ${colors.gold}, #8b7019)`,
              }}
            />

            {/* Bob */}
            <div
              className="w-16 h-16 rounded-full -mt-2 mx-auto"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${colors.gold}, #8b7019, #5a4510)`,
                boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
              }}
            >
              {/* Decorative etching */}
              <div
                className="absolute inset-2 rounded-full"
                style={{
                  border: `2px solid ${colors.darkWood}40`,
                }}
              />
            </div>
          </div>

          {/* Shadow effect */}
          <div
            className="absolute bottom-0 left-0 right-0 h-16"
            style={{
              background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.5))',
            }}
          />
        </div>

        {/* Base */}
        <div
          className="w-56 h-8 -mx-4 rounded-b"
          style={{
            background: `linear-gradient(180deg, #8b7019, ${colors.gold})`,
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
          }}
        />
      </div>

      {/* Loading text */}
      <div className="mt-6 text-center">
        <p
          className="font-serif text-lg tracking-widest"
          style={{ color: colors.gold }}
        >
          LOADING
          <span className="inline-block animate-pulse">...</span>
        </p>
      </div>
    </div>
  );
};

// --- VICTORIAN LOCKET AVATAR ---
export const VictorianLocketAvatar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="h-full flex items-center justify-center p-8"
      style={{
        background: `linear-gradient(180deg, ${colors.darkWood} 0%, #1a0f08 100%)`,
      }}
    >
      <div className="relative">
        {/* Chain */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2">
          <svg viewBox="0 0 80 60" className="w-20 h-16">
            <path
              d="M10 60 Q40 0 70 60"
              fill="none"
              stroke={colors.gold}
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Chain links */}
            {[...Array(8)].map((_, i) => (
              <circle
                key={i}
                cx={15 + i * 7}
                cy={58 - Math.sin((i / 7) * Math.PI) * 55}
                r="3"
                fill="none"
                stroke={colors.gold}
                strokeWidth="1"
              />
            ))}
          </svg>
        </div>

        {/* Locket */}
        <div
          className="relative cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
          style={{ perspective: '500px' }}
        >
          {/* Heart shape base */}
          <div
            className="relative w-32 h-36"
            style={{
              transform: 'rotate(-5deg)',
            }}
          >
            <svg viewBox="0 0 100 110" className="w-full h-full">
              <defs>
                <linearGradient id="locketGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={colors.gold} />
                  <stop offset="50%" stopColor="#8b7019" />
                  <stop offset="100%" stopColor={colors.gold} />
                </linearGradient>
              </defs>
              {/* Heart path */}
              <path
                d="M50 100 C20 70 0 50 0 30 C0 10 15 0 35 0 C45 0 50 10 50 10 C50 10 55 0 65 0 C85 0 100 10 100 30 C100 50 80 70 50 100"
                fill="url(#locketGold)"
                stroke={colors.darkWood}
                strokeWidth="2"
              />
              {/* Inner border */}
              <path
                d="M50 90 C25 65 10 50 10 32 C10 18 22 10 35 10 C42 10 48 15 50 20 C52 15 58 10 65 10 C78 10 90 18 90 32 C90 50 75 65 50 90"
                fill="none"
                stroke={colors.darkWood}
                strokeWidth="1"
                opacity="0.5"
              />
            </svg>

            {/* Locket cover (opens) */}
            <div
              className="absolute inset-0 transition-transform duration-700 origin-left"
              style={{
                transform: isOpen ? 'rotateY(-160deg)' : 'rotateY(0deg)',
                transformStyle: 'preserve-3d',
              }}
            >
              <svg viewBox="0 0 100 110" className="w-full h-full">
                <defs>
                  <linearGradient id="locketCover" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={colors.gold} />
                    <stop offset="50%" stopColor="#a88a1f" />
                    <stop offset="100%" stopColor={colors.gold} />
                  </linearGradient>
                </defs>
                <path
                  d="M50 100 C20 70 0 50 0 30 C0 10 15 0 35 0 C45 0 50 10 50 10 C50 10 55 0 65 0 C85 0 100 10 100 30 C100 50 80 70 50 100"
                  fill="url(#locketCover)"
                  stroke={colors.darkWood}
                  strokeWidth="2"
                />
                {/* Engraved pattern */}
                <circle cx="50" cy="45" r="25" fill="none" stroke={colors.darkWood} strokeWidth="1" opacity="0.3" />
                <circle cx="50" cy="45" r="18" fill="none" stroke={colors.darkWood} strokeWidth="1" opacity="0.3" />
                {/* Clasp */}
                <circle cx="50" cy="95" r="5" fill={colors.darkWood} />
              </svg>
            </div>

            {/* Portrait inside */}
            <div
              className="absolute inset-4 flex items-center justify-center"
              style={{
                opacity: isOpen ? 1 : 0,
                transition: 'opacity 0.3s ease 0.3s',
              }}
            >
              <div
                className="w-20 h-24 rounded-full"
                style={{
                  background: `linear-gradient(180deg, ${colors.cream}, #d4c4a0)`,
                  boxShadow: 'inset 0 0 10px rgba(0,0,0,0.2)',
                }}
              >
                {/* Silhouette */}
                <div
                  className="w-12 h-16 mx-auto mt-2 rounded-t-full"
                  style={{
                    background: colors.burgundy,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Bail (loop at top) */}
          <div
            className="absolute -top-4 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full"
            style={{
              border: `4px solid ${colors.gold}`,
              background: 'transparent',
            }}
          />
        </div>

        {/* Instruction */}
        <p className="mt-6 text-center font-serif text-sm" style={{ color: colors.cream }}>
          Click to {isOpen ? 'close' : 'open'} locket
        </p>
      </div>
    </div>
  );
};

// --- VICTORIAN CURTAIN MODAL ---
export const VictorianCurtainModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="h-full flex items-center justify-center p-8 relative overflow-hidden"
      style={{
        background: `linear-gradient(180deg, ${colors.darkWood} 0%, #1a0f08 100%)`,
      }}
    >
      {/* Stage/Modal Content */}
      <div
        className="absolute inset-8 rounded-lg overflow-hidden"
        style={{
          background: `linear-gradient(180deg, ${colors.cream} 0%, #e8d8b8 100%)`,
          border: `4px solid ${colors.gold}`,
          boxShadow: 'inset 0 0 30px rgba(0,0,0,0.2)',
        }}
      >
        {/* Content */}
        <div className="h-full flex flex-col items-center justify-center p-8">
          <h2 className="font-serif text-2xl mb-4" style={{ color: colors.burgundy }}>
            Grand Announcement
          </h2>
          <p className="font-serif text-center max-w-xs" style={{ color: colors.darkWood }}>
            Welcome to the Victorian Exhibition. Please enjoy our finest collection of antiquities and curiosities.
          </p>
          <button
            onClick={() => setIsOpen(false)}
            className="mt-6 px-8 py-3 font-serif transition-all"
            style={{
              background: `linear-gradient(180deg, ${colors.burgundy}, #4a1c22)`,
              border: `2px solid ${colors.gold}`,
              color: colors.cream,
              borderRadius: '4px',
            }}
          >
            Close Curtains
          </button>
        </div>
      </div>

      {/* Curtain rod */}
      <div
        className="absolute top-4 left-4 right-4 h-4 rounded"
        style={{
          background: `linear-gradient(180deg, ${colors.gold} 0%, #8b7019 100%)`,
          boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
          zIndex: 30,
        }}
      >
        {/* Rod finials */}
        <div
          className="absolute -left-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${colors.gold}, #8b7019)`,
          }}
        />
        <div
          className="absolute -right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${colors.gold}, #8b7019)`,
          }}
        />
      </div>

      {/* Left curtain */}
      <div
        className="absolute top-8 bottom-4 left-4 transition-all duration-1000 ease-in-out"
        style={{
          width: isOpen ? '8%' : '48%',
          background: `linear-gradient(90deg, ${colors.burgundy} 0%, #8a3a42 20%, ${colors.burgundy} 40%, #4a1c22 100%)`,
          boxShadow: '4px 0 12px rgba(0,0,0,0.4)',
          zIndex: 20,
        }}
      >
        {/* Velvet folds */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-2"
            style={{
              left: `${20 + i * 15}%`,
              background: `linear-gradient(90deg, transparent, ${colors.burgundy}40, transparent)`,
            }}
          />
        ))}

        {/* Tassel */}
        <div
          className="absolute right-2 top-20"
          style={{
            opacity: isOpen ? 1 : 0,
            transition: 'opacity 0.5s ease',
          }}
        >
          <div
            className="w-3 h-8 rounded-full"
            style={{
              background: `linear-gradient(180deg, ${colors.gold}, #8b7019)`,
            }}
          />
          <div
            className="w-6 h-12 -mt-1 mx-auto"
            style={{
              background: `linear-gradient(180deg, ${colors.gold}, transparent)`,
              clipPath: 'polygon(20% 0, 80% 0, 100% 100%, 0 100%)',
            }}
          />
        </div>
      </div>

      {/* Right curtain */}
      <div
        className="absolute top-8 bottom-4 right-4 transition-all duration-1000 ease-in-out"
        style={{
          width: isOpen ? '8%' : '48%',
          background: `linear-gradient(270deg, ${colors.burgundy} 0%, #8a3a42 20%, ${colors.burgundy} 40%, #4a1c22 100%)`,
          boxShadow: '-4px 0 12px rgba(0,0,0,0.4)',
          zIndex: 20,
        }}
      >
        {/* Velvet folds */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-2"
            style={{
              right: `${20 + i * 15}%`,
              background: `linear-gradient(90deg, transparent, ${colors.burgundy}40, transparent)`,
            }}
          />
        ))}

        {/* Tassel */}
        <div
          className="absolute left-2 top-20"
          style={{
            opacity: isOpen ? 1 : 0,
            transition: 'opacity 0.5s ease',
          }}
        >
          <div
            className="w-3 h-8 rounded-full mx-auto"
            style={{
              background: `linear-gradient(180deg, ${colors.gold}, #8b7019)`,
            }}
          />
          <div
            className="w-6 h-12 -mt-1 mx-auto"
            style={{
              background: `linear-gradient(180deg, ${colors.gold}, transparent)`,
              clipPath: 'polygon(20% 0, 80% 0, 100% 100%, 0 100%)',
            }}
          />
        </div>
      </div>

      {/* Open button (visible when closed) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative z-30 px-8 py-3 font-serif transition-all"
          style={{
            background: `linear-gradient(180deg, ${colors.gold}, #8b7019)`,
            border: `2px solid ${colors.darkWood}`,
            color: colors.darkWood,
            borderRadius: '4px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
          }}
        >
          Draw Curtains
        </button>
      )}
    </div>
  );
};

// --- VICTORIAN BOOKSHELF NAV ---
export const VictorianBookshelfNav = () => {
  const [activeBook, setActiveBook] = useState(0);

  const books = [
    { title: 'Home', color: colors.burgundy, width: 28 },
    { title: 'Gallery', color: '#1e4d2b', width: 32 },
    { title: 'Archives', color: '#2c3e50', width: 36 },
    { title: 'Contact', color: '#5d4e37', width: 26 },
  ];

  return (
    <div
      className="h-full flex items-center justify-center p-8"
      style={{
        background: `linear-gradient(180deg, ${colors.darkWood} 0%, #1a0f08 100%)`,
      }}
    >
      {/* Bookshelf */}
      <div className="relative">
        {/* Shelf back */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: `linear-gradient(180deg, #2a1a0a 0%, #1a0f08 100%)`,
            boxShadow: 'inset 0 0 30px rgba(0,0,0,0.5)',
          }}
        />

        {/* Books */}
        <div className="flex items-end gap-1 p-4">
          {books.map((book, i) => (
            <button
              key={book.title}
              onClick={() => setActiveBook(i)}
              className="relative transition-all duration-300"
              style={{
                transform: activeBook === i ? 'translateY(-8px)' : 'translateY(0)',
              }}
            >
              {/* Book spine */}
              <div
                className="relative h-40 flex flex-col items-center justify-between py-3 rounded-sm"
                style={{
                  width: `${book.width}px`,
                  background: `linear-gradient(90deg, ${book.color}dd 0%, ${book.color} 50%, ${book.color}aa 100%)`,
                  boxShadow: activeBook === i
                    ? `0 8px 20px rgba(0,0,0,0.5), inset 0 0 10px rgba(255,255,255,0.1)`
                    : `2px 2px 8px rgba(0,0,0,0.3), inset 0 0 5px rgba(0,0,0,0.2)`,
                  border: `1px solid ${colors.gold}40`,
                }}
              >
                {/* Gold decoration at top */}
                <div
                  className="w-full h-2"
                  style={{
                    background: `linear-gradient(90deg, ${colors.gold}60, ${colors.gold}, ${colors.gold}60)`,
                  }}
                />

                {/* Title (vertical) */}
                <div
                  className="font-serif text-xs tracking-wider"
                  style={{
                    writingMode: 'vertical-rl',
                    textOrientation: 'mixed',
                    color: colors.gold,
                    textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                  }}
                >
                  {book.title}
                </div>

                {/* Gold decoration at bottom */}
                <div
                  className="w-full h-2"
                  style={{
                    background: `linear-gradient(90deg, ${colors.gold}60, ${colors.gold}, ${colors.gold}60)`,
                  }}
                />

                {/* Page edges */}
                <div
                  className="absolute right-0 top-2 bottom-2 w-1"
                  style={{
                    background: `linear-gradient(180deg, ${colors.cream}40, ${colors.cream}60, ${colors.cream}40)`,
                  }}
                />
              </div>
            </button>
          ))}
        </div>

        {/* Shelf */}
        <div
          className="h-4 -mx-2"
          style={{
            background: `linear-gradient(180deg, ${colors.gold}40 0%, #5a3a1a 20%, ${colors.darkWood} 100%)`,
            boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
          }}
        />

        {/* Decorative brackets */}
        <div
          className="absolute -left-4 bottom-0 w-4 h-8"
          style={{
            background: `linear-gradient(90deg, ${colors.gold}, #8b7019)`,
            borderRadius: '0 0 50% 50%',
          }}
        />
        <div
          className="absolute -right-4 bottom-0 w-4 h-8"
          style={{
            background: `linear-gradient(90deg, #8b7019, ${colors.gold})`,
            borderRadius: '0 0 50% 50%',
          }}
        />
      </div>
    </div>
  );
};

// --- VICTORIAN LACE DIVIDER ---
export const VictorianLaceDivider = () => {
  return (
    <div
      className="h-full flex items-center justify-center p-8"
      style={{
        background: `linear-gradient(180deg, ${colors.darkWood} 0%, #1a0f08 100%)`,
      }}
    >
      <div className="w-full max-w-md">
        {/* Lace pattern divider */}
        <div className="relative">
          {/* Main lace strip */}
          <div
            className="h-16 relative overflow-hidden"
            style={{
              background: colors.cream,
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            }}
          >
            {/* Doily pattern - top edge */}
            <svg className="absolute top-0 left-0 w-full h-4" viewBox="0 0 400 20" preserveAspectRatio="none">
              <path
                d={`M0 20 ${[...Array(20)].map((_, i) => `Q${i * 20 + 10} 0 ${i * 20 + 20} 20`).join(' ')}`}
                fill={colors.cream}
                stroke={colors.burgundy}
                strokeWidth="0.5"
              />
            </svg>

            {/* Center medallion */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{
                  background: 'transparent',
                  border: `2px solid ${colors.burgundy}40`,
                }}
              >
                <div
                  className="w-8 h-8 rounded-full"
                  style={{
                    background: 'transparent',
                    border: `1px solid ${colors.burgundy}30`,
                  }}
                />
              </div>
            </div>

            {/* Floral motifs */}
            {[-100, 100].map(x => (
              <div
                key={x}
                className="absolute top-1/2 -translate-y-1/2"
                style={{ left: `calc(50% + ${x}px)` }}
              >
                <svg viewBox="0 0 30 30" className="w-8 h-8">
                  {[0, 72, 144, 216, 288].map(angle => (
                    <ellipse
                      key={angle}
                      cx="15"
                      cy="8"
                      rx="4"
                      ry="7"
                      fill="none"
                      stroke={colors.burgundy}
                      strokeWidth="0.5"
                      opacity="0.4"
                      transform={`rotate(${angle} 15 15)`}
                    />
                  ))}
                  <circle cx="15" cy="15" r="3" fill={colors.burgundy} opacity="0.3" />
                </svg>
              </div>
            ))}

            {/* Intricate border pattern */}
            <div
              className="absolute left-4 right-4 top-5 bottom-5"
              style={{
                border: `1px solid ${colors.burgundy}20`,
                borderRadius: '2px',
              }}
            />

            {/* Doily pattern - bottom edge */}
            <svg className="absolute bottom-0 left-0 w-full h-4" viewBox="0 0 400 20" preserveAspectRatio="none">
              <path
                d={`M0 0 ${[...Array(20)].map((_, i) => `Q${i * 20 + 10} 20 ${i * 20 + 20} 0`).join(' ')}`}
                fill={colors.cream}
                stroke={colors.burgundy}
                strokeWidth="0.5"
              />
            </svg>
          </div>

          {/* Hanging lace fringe */}
          <div className="flex justify-center gap-2 -mt-1">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="w-1 rounded-full"
                style={{
                  height: `${12 + Math.sin(i * 0.8) * 6}px`,
                  background: colors.cream,
                  opacity: 0.8,
                }}
              />
            ))}
          </div>
        </div>

        {/* Label */}
        <p className="text-center mt-8 font-serif italic text-sm" style={{ color: colors.cream }}>
          Hand-crafted Lace Divider
        </p>
      </div>
    </div>
  );
};

// --- VICTORIAN TELEGRAM ALERT ---
export const VictorianTelegramAlert = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div
      className="h-full flex items-center justify-center p-8"
      style={{
        background: `linear-gradient(180deg, ${colors.darkWood} 0%, #1a0f08 100%)`,
      }}
    >
      {isVisible ? (
        <div className="relative max-w-sm">
          {/* Telegram paper */}
          <div
            className="relative p-6"
            style={{
              background: `linear-gradient(180deg, #f5ecd5 0%, ${colors.cream} 50%, #e8dcc0 100%)`,
              boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
              transform: 'rotate(-1deg)',
            }}
          >
            {/* Perforated edge top */}
            <div className="absolute top-0 left-0 right-0 h-3 flex">
              {[...Array(30)].map((_, i) => (
                <div
                  key={i}
                  className="flex-1 border-b-2 border-dashed"
                  style={{ borderColor: `${colors.darkWood}40` }}
                />
              ))}
            </div>

            {/* Header */}
            <div className="border-b-2 pb-2 mb-4" style={{ borderColor: colors.burgundy }}>
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs" style={{ color: colors.darkWood }}>
                  TELEGRAM
                </span>
                <span className="font-mono text-xs" style={{ color: colors.burgundy }}>
                  URGENT
                </span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="font-mono text-[10px]" style={{ color: `${colors.darkWood}80` }}>
                  DATE: DEC 25, 1889
                </span>
                <span className="font-mono text-[10px]" style={{ color: `${colors.darkWood}80` }}>
                  TIME: 14:32
                </span>
              </div>
            </div>

            {/* Message content */}
            <div className="mb-4">
              <p
                className="font-mono text-sm leading-relaxed"
                style={{ color: colors.darkWood }}
              >
                ATTENTION STOP YOUR PRESENCE REQUIRED AT THE MANOR STOP BRING DOCUMENTATION STOP REPLY POSTHASTE STOP
              </p>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-end">
              <div>
                <p className="font-mono text-[10px]" style={{ color: `${colors.darkWood}60` }}>
                  VIA WESTERN UNION
                </p>
              </div>

              {/* Close/Dismiss button */}
              <button
                onClick={() => setIsVisible(false)}
                className="px-4 py-1 font-mono text-xs transition-all"
                style={{
                  background: colors.burgundy,
                  color: colors.cream,
                  border: `1px solid ${colors.darkWood}`,
                }}
              >
                ACKNOWLEDGE
              </button>
            </div>

            {/* Perforated edge bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-3 flex">
              {[...Array(30)].map((_, i) => (
                <div
                  key={i}
                  className="flex-1 border-t-2 border-dashed"
                  style={{ borderColor: `${colors.darkWood}40` }}
                />
              ))}
            </div>

            {/* Corner fold */}
            <div
              className="absolute bottom-0 right-0 w-8 h-8"
              style={{
                background: `linear-gradient(135deg, transparent 50%, ${colors.cream}90 50%)`,
                boxShadow: '-1px -1px 2px rgba(0,0,0,0.1)',
              }}
            />
          </div>

          {/* Shadow paper underneath */}
          <div
            className="absolute inset-0 -z-10"
            style={{
              background: `${colors.cream}80`,
              transform: 'rotate(2deg) translate(4px, 4px)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            }}
          />
        </div>
      ) : (
        <button
          onClick={() => setIsVisible(true)}
          className="px-6 py-3 font-serif transition-all"
          style={{
            background: `linear-gradient(180deg, ${colors.gold}, #8b7019)`,
            border: `2px solid ${colors.darkWood}`,
            color: colors.darkWood,
            borderRadius: '4px',
          }}
        >
          Receive New Telegram
        </button>
      )}
    </div>
  );
};

// --- VICTORIAN KEY ICON ---
export const VictorianKeyIcon = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (!isHovered) return;
    const interval = setInterval(() => {
      setRotation(r => r + 5);
    }, 50);
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div
      className="h-full flex items-center justify-center p-8"
      style={{
        background: `linear-gradient(180deg, ${colors.darkWood} 0%, #1a0f08 100%)`,
      }}
    >
      <div
        className="relative cursor-pointer transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { setIsHovered(false); setRotation(0); }}
        style={{
          transform: `rotate(${isHovered ? rotation : 0}deg)`,
          filter: isHovered ? `drop-shadow(0 0 20px ${colors.gold}60)` : 'none',
        }}
      >
        <svg viewBox="0 0 100 200" className="w-24 h-48">
          <defs>
            <linearGradient id="keyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={colors.gold} />
              <stop offset="50%" stopColor="#ddb84d" />
              <stop offset="100%" stopColor="#8b7019" />
            </linearGradient>
            <linearGradient id="keyDark" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b7019" />
              <stop offset="100%" stopColor="#5a4510" />
            </linearGradient>
          </defs>

          {/* Bow (handle) - ornate circular design */}
          <circle cx="50" cy="35" r="30" fill="none" stroke="url(#keyGradient)" strokeWidth="8" />
          <circle cx="50" cy="35" r="20" fill="none" stroke="url(#keyDark)" strokeWidth="2" />

          {/* Decorative flourishes on bow */}
          <path
            d="M30 20 Q50 5 70 20"
            fill="none"
            stroke="url(#keyGradient)"
            strokeWidth="4"
          />
          <path
            d="M30 50 Q50 65 70 50"
            fill="none"
            stroke="url(#keyGradient)"
            strokeWidth="4"
          />

          {/* Center jewel */}
          <circle cx="50" cy="35" r="8" fill={colors.burgundy} />
          <circle cx="48" cy="33" r="2" fill="#aa4a52" />

          {/* Shaft */}
          <rect x="45" y="60" width="10" height="100" fill="url(#keyGradient)" />

          {/* Collar decorations */}
          <rect x="40" y="65" width="20" height="8" rx="2" fill="url(#keyDark)" />
          <rect x="42" y="85" width="16" height="4" rx="1" fill="url(#keyDark)" />

          {/* Bit (teeth) - ornate Victorian style */}
          <path
            d="M45 160 L30 160 L30 170 L40 170 L40 180 L30 180 L30 195 L55 195 L55 180 L65 180 L65 175 L55 175 L55 165 L70 165 L70 160 L55 160"
            fill="url(#keyGradient)"
            stroke="url(#keyDark)"
            strokeWidth="1"
          />

          {/* Additional decorative ward cuts */}
          <rect x="32" y="168" width="6" height="3" fill={colors.darkWood} />
          <rect x="57" y="163" width="6" height="3" fill={colors.darkWood} />
        </svg>

        {/* Glow effect on hover */}
        {isHovered && (
          <div
            className="absolute inset-0 rounded-full animate-pulse"
            style={{
              background: `radial-gradient(circle at 50% 20%, ${colors.gold}40 0%, transparent 50%)`,
            }}
          />
        )}
      </div>

      <p className="absolute bottom-8 font-serif text-sm" style={{ color: colors.cream }}>
        Hover to unlock secrets
      </p>
    </div>
  );
};

// --- VICTORIAN GOTHIC HEADING ---
export const VictorianGothicHeading = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="h-full flex items-center justify-center p-8"
      style={{
        background: `linear-gradient(180deg, ${colors.darkWood} 0%, #1a0f08 100%)`,
      }}
    >
      <div
        className="relative text-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Decorative flourish above */}
        <svg viewBox="0 0 200 30" className="w-64 h-8 mb-4 mx-auto">
          <path
            d="M0 15 Q25 5 50 15 Q75 25 100 15 Q125 5 150 15 Q175 25 200 15"
            fill="none"
            stroke={colors.gold}
            strokeWidth="2"
          />
          <circle cx="100" cy="15" r="5" fill={colors.burgundy} />
          <circle cx="50" cy="15" r="3" fill={colors.gold} />
          <circle cx="150" cy="15" r="3" fill={colors.gold} />
        </svg>

        {/* Main heading */}
        <h1
          className="font-serif text-5xl tracking-wider transition-all duration-500"
          style={{
            color: isHovered ? colors.gold : colors.cream,
            textShadow: isHovered
              ? `0 0 20px ${colors.gold}60, 2px 2px 4px rgba(0,0,0,0.5)`
              : '2px 2px 4px rgba(0,0,0,0.5)',
            fontFamily: '"Times New Roman", serif',
            fontWeight: 'bold',
          }}
        >
          Victorian
        </h1>

        {/* Subtitle with different styling */}
        <p
          className="font-serif text-2xl italic mt-2 tracking-widest"
          style={{
            color: colors.burgundy,
          }}
        >
          Excellence
        </p>

        {/* Decorative flourish below */}
        <svg viewBox="0 0 200 40" className="w-64 h-10 mt-4 mx-auto">
          <path
            d="M20 20 Q50 10 80 20 L85 20 L90 10 L95 20 L100 5 L105 20 L110 10 L115 20 L120 20 Q150 10 180 20"
            fill="none"
            stroke={colors.gold}
            strokeWidth="2"
          />
          {/* Corner ornaments */}
          <path d="M10 30 Q0 20 10 10" fill="none" stroke={colors.gold} strokeWidth="2" />
          <path d="M190 30 Q200 20 190 10" fill="none" stroke={colors.gold} strokeWidth="2" />
        </svg>

        {/* Drop cap style initial letter accent */}
        <div
          className="absolute -left-8 top-8 w-16 h-16 flex items-center justify-center opacity-20"
          style={{
            fontFamily: '"Times New Roman", serif',
            fontSize: '4rem',
            color: colors.gold,
          }}
        >
          V
        </div>
      </div>
    </div>
  );
};

// --- VICTORIAN MUSIC BOX SLIDER ---
export const VictorianMusicBoxSlider = () => {
  const [value, setValue] = useState(50);
  const [isPlaying, setIsPlaying] = useState(false);
  const [cylinderRotation, setCylinderRotation] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCylinderRotation(r => r + 2);
    }, 50);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div
      className="h-full flex flex-col items-center justify-center p-8"
      style={{
        background: `linear-gradient(180deg, ${colors.darkWood} 0%, #1a0f08 100%)`,
      }}
    >
      {/* Music box case */}
      <div
        className="relative p-6 rounded-lg"
        style={{
          background: `linear-gradient(180deg, #5a3a1a 0%, ${colors.darkWood} 50%, #2a1a0a 100%)`,
          border: `4px solid ${colors.gold}`,
          boxShadow: '0 8px 24px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.1)',
        }}
      >
        {/* Decorative inlay */}
        <div
          className="absolute inset-4 rounded"
          style={{
            border: `2px solid ${colors.gold}40`,
          }}
        />

        {/* Music cylinder visualization */}
        <div className="relative w-64 h-20 mb-6 overflow-hidden rounded">
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(90deg, #8b7019 0%, ${colors.gold} 20%, #8b7019 40%, ${colors.gold} 60%, #8b7019 80%, ${colors.gold} 100%)`,
              backgroundSize: '40px 100%',
              transform: `translateX(${-cylinderRotation % 40}px)`,
            }}
          />

          {/* Pins on cylinder */}
          {[...Array(16)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-3 rounded-full"
              style={{
                background: colors.darkWood,
                left: `${(i * 16 + cylinderRotation) % 256}px`,
                top: `${10 + (i % 4) * 15}px`,
              }}
            />
          ))}

          {/* Comb */}
          <div
            className="absolute bottom-0 left-0 right-0 h-4"
            style={{
              background: `linear-gradient(180deg, ${colors.gold}, #8b7019)`,
            }}
          >
            {[...Array(32)].map((_, i) => (
              <div
                key={i}
                className="absolute w-0.5 h-3 bottom-0"
                style={{
                  left: `${i * 8}px`,
                  background: colors.darkWood,
                }}
              />
            ))}
          </div>
        </div>

        {/* Volume/Speed slider */}
        <div className="relative">
          <label className="block font-serif text-sm mb-2" style={{ color: colors.gold }}>
            Tempo
          </label>

          <div className="relative">
            {/* Track */}
            <div
              className="w-full h-4 rounded-full"
              style={{
                background: `linear-gradient(90deg, ${colors.darkWood}, #5a3a1a)`,
                border: `2px solid ${colors.gold}60`,
              }}
            />

            {/* Fill */}
            <div
              className="absolute top-0 left-0 h-4 rounded-l-full transition-all"
              style={{
                width: `${value}%`,
                background: `linear-gradient(90deg, ${colors.burgundy}, #8a3a42)`,
                border: `2px solid ${colors.gold}60`,
                borderRight: 'none',
              }}
            />

            {/* Thumb - ornate knob */}
            <input
              type="range"
              min="0"
              max="100"
              value={value}
              onChange={(e) => setValue(parseInt(e.target.value))}
              className="absolute inset-0 w-full opacity-0 cursor-pointer"
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full pointer-events-none transition-all"
              style={{
                left: `calc(${value}% - 16px)`,
                background: `radial-gradient(circle at 30% 30%, ${colors.gold}, #8b7019)`,
                border: `2px solid ${colors.darkWood}`,
                boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
              }}
            >
              {/* Decorative center */}
              <div
                className="absolute inset-2 rounded-full"
                style={{
                  border: `1px solid ${colors.darkWood}40`,
                }}
              />
            </div>
          </div>

          {/* Value display */}
          <div className="flex justify-between mt-2">
            <span className="font-serif text-xs" style={{ color: colors.cream }}>Adagio</span>
            <span className="font-mono text-sm" style={{ color: colors.gold }}>{value}</span>
            <span className="font-serif text-xs" style={{ color: colors.cream }}>Presto</span>
          </div>
        </div>

        {/* Play button */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="mt-4 w-full py-2 font-serif transition-all"
          style={{
            background: isPlaying
              ? `linear-gradient(180deg, ${colors.burgundy}, #4a1c22)`
              : `linear-gradient(180deg, ${colors.gold}, #8b7019)`,
            border: `2px solid ${colors.gold}`,
            color: isPlaying ? colors.cream : colors.darkWood,
            borderRadius: '4px',
          }}
        >
          {isPlaying ? 'Stop Music' : 'Play Music'}
        </button>
      </div>
    </div>
  );
};

// --- VICTORIAN CABINET TABS ---
export const VictorianCabinetTabs = () => {
  const [activeDrawer, setActiveDrawer] = useState(0);

  const drawers = [
    { label: 'Specimens', icon: 'A' },
    { label: 'Curiosities', icon: 'B' },
    { label: 'Documents', icon: 'C' },
    { label: 'Artifacts', icon: 'D' },
  ];

  return (
    <div
      className="h-full flex items-center justify-center p-8"
      style={{
        background: `linear-gradient(180deg, ${colors.darkWood} 0%, #1a0f08 100%)`,
      }}
    >
      {/* Cabinet */}
      <div
        className="relative"
        style={{
          background: `linear-gradient(180deg, #5a3a1a 0%, ${colors.darkWood} 100%)`,
          border: `4px solid ${colors.gold}`,
          borderRadius: '8px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        }}
      >
        {/* Cabinet top ornament */}
        <div
          className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-4"
          style={{
            background: `linear-gradient(180deg, ${colors.gold}, #8b7019)`,
            borderRadius: '8px 8px 0 0',
          }}
        />

        {/* Drawers */}
        <div className="p-2">
          {drawers.map((drawer, i) => (
            <button
              key={drawer.label}
              onClick={() => setActiveDrawer(i)}
              className="relative w-56 mb-1 last:mb-0 transition-all duration-300"
              style={{
                transform: activeDrawer === i ? 'translateZ(20px)' : 'translateZ(0)',
              }}
            >
              {/* Drawer face */}
              <div
                className="relative h-16 rounded transition-all duration-300"
                style={{
                  background: activeDrawer === i
                    ? `linear-gradient(180deg, #6a4a2a 0%, #5a3a1a 100%)`
                    : `linear-gradient(180deg, #5a3a1a 0%, ${colors.darkWood} 100%)`,
                  border: `2px solid ${activeDrawer === i ? colors.gold : colors.gold + '60'}`,
                  boxShadow: activeDrawer === i
                    ? `0 4px 12px rgba(0,0,0,0.4), inset 0 1px 2px rgba(255,255,255,0.1)`
                    : 'inset 0 -2px 4px rgba(0,0,0,0.3)',
                  transform: activeDrawer === i ? 'translateY(-4px)' : 'translateY(0)',
                }}
              >
                {/* Brass label plate */}
                <div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-1 rounded"
                  style={{
                    background: `linear-gradient(180deg, ${colors.gold}, #8b7019)`,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                  }}
                >
                  <span className="font-serif text-sm" style={{ color: colors.darkWood }}>
                    {drawer.label}
                  </span>
                </div>

                {/* Drawer pull */}
                <div
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 w-12 h-3 rounded-full"
                  style={{
                    background: `linear-gradient(180deg, ${colors.gold}80, #8b701960)`,
                    border: `1px solid ${colors.gold}`,
                  }}
                />

                {/* Index letter */}
                <div
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center"
                  style={{
                    background: colors.burgundy,
                    border: `1px solid ${colors.gold}`,
                  }}
                >
                  <span className="font-serif text-xs" style={{ color: colors.cream }}>
                    {drawer.icon}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Cabinet feet */}
        <div className="flex justify-between px-4 -mb-4">
          <div
            className="w-8 h-6 rounded-b"
            style={{
              background: `linear-gradient(180deg, ${colors.darkWood}, #1a0f08)`,
            }}
          />
          <div
            className="w-8 h-6 rounded-b"
            style={{
              background: `linear-gradient(180deg, ${colors.darkWood}, #1a0f08)`,
            }}
          />
        </div>
      </div>

      {/* Content panel */}
      <div
        className="ml-4 w-48 h-72 p-4 rounded"
        style={{
          background: `linear-gradient(180deg, ${colors.cream}, #e8d8b8)`,
          border: `2px solid ${colors.gold}`,
          boxShadow: 'inset 0 0 20px rgba(0,0,0,0.1)',
        }}
      >
        <h3 className="font-serif text-lg mb-2" style={{ color: colors.burgundy }}>
          {drawers[activeDrawer].label}
        </h3>
        <p className="font-serif text-sm" style={{ color: colors.darkWood }}>
          Contents of drawer {drawers[activeDrawer].icon}. A collection of fine {drawers[activeDrawer].label.toLowerCase()} from the Victorian era.
        </p>
      </div>
    </div>
  );
};

// --- VICTORIAN DAMASK BACKGROUND ---
export const VictorianDamaskBackground = () => {
  const [pattern, setPattern] = useState<'damask' | 'floral' | 'stripe'>('damask');

  return (
    <div className="h-full relative overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 transition-all duration-500"
        style={{
          background: pattern === 'damask'
            ? colors.burgundy
            : pattern === 'floral'
              ? colors.darkWood
              : '#2a1a0a',
        }}
      >
        {/* Damask pattern overlay */}
        {pattern === 'damask' && (
          <svg className="absolute inset-0 w-full h-full opacity-20">
            <defs>
              <pattern id="damaskPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                {/* Central medallion */}
                <ellipse cx="50" cy="50" rx="30" ry="40" fill="none" stroke={colors.gold} strokeWidth="1" />
                <ellipse cx="50" cy="50" rx="20" ry="28" fill="none" stroke={colors.gold} strokeWidth="0.5" />

                {/* Fleur-de-lis inspired elements */}
                <path d="M50 10 Q55 20 50 30 Q45 20 50 10" fill={colors.gold} />
                <path d="M50 70 Q55 80 50 90 Q45 80 50 70" fill={colors.gold} />
                <path d="M10 50 Q20 55 30 50 Q20 45 10 50" fill={colors.gold} />
                <path d="M70 50 Q80 55 90 50 Q80 45 70 50" fill={colors.gold} />

                {/* Corner scrollwork */}
                <path d="M0 0 Q15 15 0 30" fill="none" stroke={colors.gold} strokeWidth="0.5" />
                <path d="M100 0 Q85 15 100 30" fill="none" stroke={colors.gold} strokeWidth="0.5" />
                <path d="M0 100 Q15 85 0 70" fill="none" stroke={colors.gold} strokeWidth="0.5" />
                <path d="M100 100 Q85 85 100 70" fill="none" stroke={colors.gold} strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#damaskPattern)" />
          </svg>
        )}

        {/* Floral pattern overlay */}
        {pattern === 'floral' && (
          <svg className="absolute inset-0 w-full h-full opacity-15">
            <defs>
              <pattern id="floralPattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                {/* Rose-like flower */}
                {[0, 72, 144, 216, 288].map(angle => (
                  <ellipse
                    key={angle}
                    cx="40"
                    cy="25"
                    rx="8"
                    ry="15"
                    fill={colors.cream}
                    transform={`rotate(${angle} 40 40)`}
                  />
                ))}
                <circle cx="40" cy="40" r="8" fill={colors.gold} />

                {/* Leaves */}
                <path d="M20 60 Q30 50 40 60 Q30 70 20 60" fill={colors.cream} opacity="0.5" />
                <path d="M60 60 Q50 50 40 60 Q50 70 60 60" fill={colors.cream} opacity="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#floralPattern)" />
          </svg>
        )}

        {/* Stripe pattern overlay */}
        {pattern === 'stripe' && (
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `repeating-linear-gradient(
                90deg,
                ${colors.gold} 0px,
                ${colors.gold} 2px,
                transparent 2px,
                transparent 30px,
                ${colors.cream} 30px,
                ${colors.cream} 32px,
                transparent 32px,
                transparent 60px
              )`,
            }}
          />
        )}

        {/* Vignette effect */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.4) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center p-8">
        <h2 className="font-serif text-3xl mb-8" style={{ color: colors.cream }}>
          Wallpaper Patterns
        </h2>

        {/* Pattern selector */}
        <div className="flex gap-4">
          {(['damask', 'floral', 'stripe'] as const).map(p => (
            <button
              key={p}
              onClick={() => setPattern(p)}
              className="px-6 py-3 font-serif capitalize transition-all"
              style={{
                background: pattern === p
                  ? `linear-gradient(180deg, ${colors.gold}, #8b7019)`
                  : 'transparent',
                border: `2px solid ${colors.gold}`,
                color: pattern === p ? colors.darkWood : colors.cream,
                borderRadius: '4px',
              }}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Description */}
        <p className="mt-8 font-serif text-center max-w-xs" style={{ color: colors.cream }}>
          {pattern === 'damask' && 'Classic damask wallpaper with symmetrical floral medallions'}
          {pattern === 'floral' && 'Romantic floral pattern with Victorian rose motifs'}
          {pattern === 'stripe' && 'Elegant striped wallpaper for formal parlor settings'}
        </p>
      </div>
    </div>
  );
};

// Export all components with exact IDs as specified
export const victorianParlorComponents: Record<string, React.FC> = {
  'victorian-cameo-button': VictorianCameoButton,
  'victorian-portrait-card': VictorianPortraitCard,
  'victorian-quill-input': VictorianQuillInput,
  'victorian-wax-seal-badge': VictorianWaxSealBadge,
  'victorian-gaslamp-toggle': VictorianGaslampToggle,
  'victorian-hourglass-progress': VictorianHourglassProgress,
  'victorian-pendulum-loader': VictorianPendulumLoader,
  'victorian-locket-avatar': VictorianLocketAvatar,
  'victorian-curtain-modal': VictorianCurtainModal,
  'victorian-bookshelf-nav': VictorianBookshelfNav,
  'victorian-lace-divider': VictorianLaceDivider,
  'victorian-telegram-alert': VictorianTelegramAlert,
  'victorian-key-icon': VictorianKeyIcon,
  'victorian-gothic-heading': VictorianGothicHeading,
  'victorian-music-box-slider': VictorianMusicBoxSlider,
  'victorian-cabinet-tabs': VictorianCabinetTabs,
  'victorian-damask-background': VictorianDamaskBackground,
};
