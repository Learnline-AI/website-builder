import React, { useState, useEffect, useRef } from 'react';

// Blueprint color palette
const colors = {
  blueprintBlue: '#1e3a5f',
  cyanLines: '#00d4ff',
  white: '#ffffff',
  annotationYellow: '#fff740',
};

// --- BLUEPRINT STAMP BUTTON ---
export const BlueprintStampButton = () => {
  const [isStamped, setIsStamped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    setIsStamped(true);
    setTimeout(() => setIsStamped(false), 2000);
  };

  return (
    <div
      className="h-full flex items-center justify-center p-8"
      style={{
        background: `linear-gradient(135deg, ${colors.blueprintBlue} 0%, #0f1f33 100%)`,
      }}
    >
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative px-10 py-5 font-mono text-sm tracking-[0.2em] uppercase transition-all duration-200"
        style={{
          background: 'transparent',
          border: `2px dashed ${colors.cyanLines}`,
          color: colors.cyanLines,
          transform: isHovered && !isStamped ? 'scale(1.02)' : 'scale(1)',
        }}
      >
        {/* Corner marks */}
        <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2" style={{ borderColor: colors.cyanLines }} />
        <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2" style={{ borderColor: colors.cyanLines }} />
        <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2" style={{ borderColor: colors.cyanLines }} />
        <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2" style={{ borderColor: colors.cyanLines }} />

        <span className="relative z-10">APPROVE</span>

        {/* Stamp overlay */}
        {isStamped && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              animation: 'stampSlam 0.2s ease-out',
            }}
          >
            <div
              className="px-6 py-2 rounded border-4 transform rotate-[-15deg]"
              style={{
                borderColor: '#22c55e',
                color: '#22c55e',
                background: 'rgba(34, 197, 94, 0.1)',
              }}
            >
              <span className="font-mono text-xl font-bold tracking-widest">APPROVED</span>
            </div>
          </div>
        )}
      </button>

      <style>{`
        @keyframes stampSlam {
          0% { transform: scale(2); opacity: 0; }
          50% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

// --- BLUEPRINT PLAN CARD ---
export const BlueprintPlanCard = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="h-full flex items-center justify-center p-8"
      style={{
        background: `linear-gradient(180deg, ${colors.blueprintBlue} 0%, #0f1f33 100%)`,
      }}
    >
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-72 p-6 transition-all duration-300"
        style={{
          background: 'rgba(0, 212, 255, 0.03)',
          border: `1px solid ${colors.cyanLines}`,
          boxShadow: isHovered ? `0 0 30px ${colors.cyanLines}30` : 'none',
        }}
      >
        {/* Technical border pattern */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <pattern id="gridPattern" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke={colors.cyanLines} strokeWidth="0.5" opacity="0.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gridPattern)" />
        </svg>

        {/* Corner registration marks */}
        {[
          { top: 4, left: 4 },
          { top: 4, right: 4 },
          { bottom: 4, left: 4 },
          { bottom: 4, right: 4 },
        ].map((pos, i) => (
          <div
            key={i}
            className="absolute w-6 h-6"
            style={{ ...pos }}
          >
            <div className="absolute w-full h-px top-1/2" style={{ background: colors.cyanLines }} />
            <div className="absolute h-full w-px left-1/2" style={{ background: colors.cyanLines }} />
            <div className="absolute w-2 h-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border" style={{ borderColor: colors.cyanLines }} />
          </div>
        ))}

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-sm flex items-center justify-center"
              style={{ border: `1px solid ${colors.cyanLines}` }}
            >
              <span style={{ color: colors.cyanLines }}>DWG</span>
            </div>
            <div>
              <h3 className="font-mono text-sm font-bold" style={{ color: colors.white }}>FLOOR PLAN A-101</h3>
              <p className="font-mono text-xs" style={{ color: colors.cyanLines }}>REV. 3.2</p>
            </div>
          </div>

          <div className="space-y-2 font-mono text-xs" style={{ color: colors.cyanLines }}>
            <div className="flex justify-between border-b border-dashed pb-1" style={{ borderColor: `${colors.cyanLines}30` }}>
              <span>Scale:</span>
              <span>1:100</span>
            </div>
            <div className="flex justify-between border-b border-dashed pb-1" style={{ borderColor: `${colors.cyanLines}30` }}>
              <span>Drawn by:</span>
              <span>J.SMITH</span>
            </div>
            <div className="flex justify-between">
              <span>Date:</span>
              <span>2024.12.15</span>
            </div>
          </div>
        </div>

        {/* Title block stripe */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1"
          style={{ background: colors.cyanLines }}
        />
      </div>
    </div>
  );
};

// --- BLUEPRINT FIELD INPUT ---
export const BlueprintFieldInput = () => {
  const [value, setValue] = useState('2400');
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className="h-full flex items-center justify-center p-8"
      style={{
        background: colors.blueprintBlue,
      }}
    >
      <div className="relative">
        {/* Dimension line left */}
        <div className="absolute -left-8 top-1/2 -translate-y-1/2 flex items-center">
          <div className="w-4 h-px" style={{ background: colors.cyanLines }} />
          <div className="w-px h-3" style={{ background: colors.cyanLines }} />
        </div>

        {/* Dimension line right */}
        <div className="absolute -right-8 top-1/2 -translate-y-1/2 flex items-center">
          <div className="w-px h-3" style={{ background: colors.cyanLines }} />
          <div className="w-4 h-px" style={{ background: colors.cyanLines }} />
        </div>

        {/* Input field */}
        <div className="relative">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-32 px-4 py-3 font-mono text-center text-lg outline-none"
            style={{
              background: 'transparent',
              border: `2px solid ${isFocused ? colors.annotationYellow : colors.cyanLines}`,
              color: colors.white,
              boxShadow: isFocused ? `0 0 15px ${colors.annotationYellow}40` : 'none',
            }}
          />

          {/* Unit label */}
          <span
            className="absolute -top-6 left-1/2 -translate-x-1/2 font-mono text-xs px-2"
            style={{
              color: colors.cyanLines,
              background: colors.blueprintBlue,
            }}
          >
            WIDTH (mm)
          </span>

          {/* Annotation arrow */}
          <div
            className="absolute -bottom-8 left-1/2 -translate-x-1/2"
            style={{ color: colors.annotationYellow }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20">
              <path d="M10 0 L10 15 M5 10 L10 15 L15 10" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- BLUEPRINT REVISION BADGE ---
export const BlueprintRevisionBadge = () => {
  const [revision, setRevision] = useState(3);

  return (
    <div
      className="h-full flex items-center justify-center p-8"
      style={{
        background: `linear-gradient(135deg, ${colors.blueprintBlue} 0%, #0f1f33 100%)`,
      }}
    >
      <div className="flex items-center gap-6">
        {/* Revision circle */}
        <div className="relative">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{
              border: `3px solid ${colors.cyanLines}`,
              background: `${colors.cyanLines}10`,
            }}
          >
            <div className="text-center">
              <span className="font-mono text-2xl font-bold" style={{ color: colors.white }}>
                {revision}
              </span>
              <div className="font-mono text-[10px]" style={{ color: colors.cyanLines }}>REV</div>
            </div>
          </div>

          {/* Triangle marker */}
          <div
            className="absolute -bottom-2 left-1/2 -translate-x-1/2"
            style={{ color: colors.cyanLines }}
          >
            <svg width="12" height="8" viewBox="0 0 12 8">
              <polygon points="6,8 0,0 12,0" fill="currentColor" />
            </svg>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-2">
          <button
            onClick={() => setRevision(r => r + 1)}
            className="w-8 h-8 font-mono flex items-center justify-center transition-colors"
            style={{
              border: `1px solid ${colors.cyanLines}`,
              color: colors.cyanLines,
              background: 'transparent',
            }}
          >
            +
          </button>
          <button
            onClick={() => setRevision(r => Math.max(1, r - 1))}
            className="w-8 h-8 font-mono flex items-center justify-center transition-colors"
            style={{
              border: `1px solid ${colors.cyanLines}`,
              color: colors.cyanLines,
              background: 'transparent',
            }}
          >
            -
          </button>
        </div>
      </div>
    </div>
  );
};

// --- BLUEPRINT SWITCH TOGGLE ---
export const BlueprintSwitchToggle = () => {
  const [isOn, setIsOn] = useState(false);

  return (
    <div
      className="h-full flex items-center justify-center p-8"
      style={{
        background: colors.blueprintBlue,
      }}
    >
      <div className="flex items-center gap-6">
        {/* Switch symbol */}
        <button
          onClick={() => setIsOn(!isOn)}
          className="relative w-20 h-20 cursor-pointer"
        >
          <svg viewBox="0 0 80 80" className="w-full h-full">
            {/* Base circle */}
            <circle cx="40" cy="60" r="8" fill="none" stroke={colors.cyanLines} strokeWidth="2" />
            <circle cx="40" cy="60" r="3" fill={colors.cyanLines} />

            {/* Connection point */}
            <circle cx="40" cy="20" r="8" fill="none" stroke={colors.cyanLines} strokeWidth="2" />

            {/* Switch arm */}
            <line
              x1="40"
              y1="52"
              x2={isOn ? '40' : '25'}
              y2={isOn ? '28' : '35'}
              stroke={isOn ? '#22c55e' : colors.cyanLines}
              strokeWidth="3"
              strokeLinecap="round"
              style={{ transition: 'all 0.3s ease' }}
            />

            {/* Contact point when closed */}
            {isOn && (
              <circle cx="40" cy="28" r="4" fill="#22c55e" />
            )}
          </svg>
        </button>

        {/* State label */}
        <div className="font-mono text-sm" style={{ color: colors.cyanLines }}>
          <div className="text-xs opacity-60">CIRCUIT</div>
          <div
            className="text-lg font-bold"
            style={{ color: isOn ? '#22c55e' : colors.cyanLines }}
          >
            {isOn ? 'CLOSED' : 'OPEN'}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- BLUEPRINT SCALE PROGRESS ---
export const BlueprintScaleProgress = () => {
  const [progress, setProgress] = useState(65);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => p >= 100 ? 0 : p + 1);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const majorMarks = [0, 25, 50, 75, 100];

  return (
    <div
      className="h-full flex flex-col items-center justify-center p-8"
      style={{
        background: colors.blueprintBlue,
      }}
    >
      {/* Scale bar */}
      <div className="relative w-72">
        {/* Major marks with labels */}
        <div className="absolute -top-6 left-0 right-0 flex justify-between">
          {majorMarks.map(mark => (
            <span
              key={mark}
              className="font-mono text-xs"
              style={{ color: colors.cyanLines }}
            >
              {mark}
            </span>
          ))}
        </div>

        {/* Track */}
        <div
          className="relative h-4 overflow-hidden"
          style={{
            border: `1px solid ${colors.cyanLines}`,
            background: `${colors.cyanLines}10`,
          }}
        >
          {/* Minor tick marks */}
          <div className="absolute inset-0 flex">
            {[...Array(21)].map((_, i) => (
              <div
                key={i}
                className="flex-1 border-r"
                style={{
                  borderColor: `${colors.cyanLines}40`,
                  height: i % 5 === 0 ? '100%' : '50%',
                }}
              />
            ))}
          </div>

          {/* Fill */}
          <div
            className="absolute left-0 top-0 bottom-0 transition-all duration-100"
            style={{
              width: `${progress}%`,
              background: `linear-gradient(90deg, ${colors.cyanLines}60, ${colors.cyanLines})`,
              boxShadow: `0 0 10px ${colors.cyanLines}60`,
            }}
          />
        </div>

        {/* Scale label */}
        <div
          className="mt-2 text-center font-mono text-xs"
          style={{ color: colors.cyanLines }}
        >
          SCALE 1:100 | PROGRESS: {progress}%
        </div>
      </div>
    </div>
  );
};

// --- BLUEPRINT COMPASS LOADER ---
export const BlueprintCompassLoader = () => {
  const [rotation, setRotation] = useState(0);
  const [arcAngle, setArcAngle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(r => r + 3);
      setArcAngle(a => (a + 5) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="h-full flex flex-col items-center justify-center p-8"
      style={{
        background: `linear-gradient(135deg, ${colors.blueprintBlue} 0%, #0f1f33 100%)`,
      }}
    >
      <div className="relative w-32 h-32">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Guide circle being drawn */}
          <circle
            cx="50"
            cy="50"
            r="35"
            fill="none"
            stroke={colors.cyanLines}
            strokeWidth="1"
            strokeDasharray={`${arcAngle} ${360 - arcAngle}`}
            strokeDashoffset="90"
            opacity="0.5"
          />

          {/* Compass group */}
          <g transform={`rotate(${rotation} 50 50)`}>
            {/* Compass pivot */}
            <circle cx="50" cy="50" r="4" fill={colors.cyanLines} />

            {/* Compass legs */}
            {/* Stationary leg (needle) */}
            <line
              x1="50"
              y1="50"
              x2="50"
              y2="15"
              stroke={colors.cyanLines}
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="50" cy="15" r="3" fill={colors.cyanLines} />

            {/* Drawing leg */}
            <line
              x1="50"
              y1="50"
              x2="50"
              y2="85"
              stroke={colors.cyanLines}
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Pencil tip */}
            <polygon
              points="50,85 47,92 53,92"
              fill={colors.annotationYellow}
            />
          </g>

          {/* Center cross */}
          <line x1="45" y1="50" x2="55" y2="50" stroke={colors.cyanLines} strokeWidth="0.5" />
          <line x1="50" y1="45" x2="50" y2="55" stroke={colors.cyanLines} strokeWidth="0.5" />
        </svg>
      </div>

      <div
        className="mt-4 font-mono text-xs"
        style={{ color: colors.cyanLines }}
      >
        DRAFTING...
      </div>
    </div>
  );
};

// --- BLUEPRINT PROFILE AVATAR ---
export const BlueprintProfileAvatar = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="h-full flex items-center justify-center p-8"
      style={{
        background: colors.blueprintBlue,
      }}
    >
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-28 h-28"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Grid background */}
          <defs>
            <pattern id="avatarGrid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke={colors.cyanLines} strokeWidth="0.3" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#avatarGrid)" />

          {/* Technical profile drawing */}
          {/* Head outline */}
          <ellipse
            cx="50"
            cy="35"
            rx="22"
            ry="26"
            fill="none"
            stroke={colors.cyanLines}
            strokeWidth="2"
            style={{
              transition: 'all 0.3s',
              filter: isHovered ? `drop-shadow(0 0 5px ${colors.cyanLines})` : 'none',
            }}
          />

          {/* Construction lines */}
          <line x1="50" y1="9" x2="50" y2="61" stroke={colors.cyanLines} strokeWidth="0.5" strokeDasharray="2 2" opacity="0.5" />
          <line x1="28" y1="35" x2="72" y2="35" stroke={colors.cyanLines} strokeWidth="0.5" strokeDasharray="2 2" opacity="0.5" />

          {/* Eyes */}
          <circle cx="40" cy="32" r="3" fill="none" stroke={colors.cyanLines} strokeWidth="1.5" />
          <circle cx="60" cy="32" r="3" fill="none" stroke={colors.cyanLines} strokeWidth="1.5" />

          {/* Shoulders */}
          <path
            d="M28 61 Q50 70 72 61 L80 85 L20 85 Z"
            fill="none"
            stroke={colors.cyanLines}
            strokeWidth="2"
          />

          {/* Dimension annotations */}
          <line x1="15" y1="9" x2="15" y2="61" stroke={colors.annotationYellow} strokeWidth="0.5" />
          <line x1="13" y1="9" x2="17" y2="9" stroke={colors.annotationYellow} strokeWidth="0.5" />
          <line x1="13" y1="61" x2="17" y2="61" stroke={colors.annotationYellow} strokeWidth="0.5" />
          <text x="8" y="38" fill={colors.annotationYellow} fontSize="6" fontFamily="monospace">52</text>
        </svg>

        {/* ID label */}
        <div
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-mono text-xs whitespace-nowrap"
          style={{ color: colors.cyanLines }}
        >
          USER-001
        </div>
      </div>
    </div>
  );
};

// --- BLUEPRINT LAYER MODAL ---
export const BlueprintLayerModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="h-full flex items-center justify-center p-8"
      style={{
        background: colors.blueprintBlue,
      }}
    >
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 font-mono text-sm"
        style={{
          border: `1px solid ${colors.cyanLines}`,
          color: colors.cyanLines,
          background: 'transparent',
        }}
      >
        OPEN LAYERS
      </button>

      {/* Modal overlay with layers */}
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          onClick={() => setIsOpen(false)}
        >
          {/* Background layers (offset for depth effect) */}
          {[2, 1].map(layer => (
            <div
              key={layer}
              className="absolute w-64 h-48"
              style={{
                background: `${colors.blueprintBlue}cc`,
                border: `1px solid ${colors.cyanLines}40`,
                transform: `translate(${layer * 8}px, ${layer * 8}px)`,
              }}
            />
          ))}

          {/* Main modal */}
          <div
            className="relative w-64 p-6"
            onClick={e => e.stopPropagation()}
            style={{
              background: colors.blueprintBlue,
              border: `2px solid ${colors.cyanLines}`,
              boxShadow: `0 0 40px ${colors.cyanLines}30`,
            }}
          >
            {/* Grid overlay */}
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: `linear-gradient(${colors.cyanLines} 1px, transparent 1px), linear-gradient(90deg, ${colors.cyanLines} 1px, transparent 1px)`,
                backgroundSize: '20px 20px',
              }}
            />

            {/* Content */}
            <div className="relative z-10">
              <h3 className="font-mono text-lg mb-4" style={{ color: colors.white }}>
                LAYER CONTROL
              </h3>

              <div className="space-y-2">
                {['Structural', 'Electrical', 'Plumbing'].map((layer, i) => (
                  <div
                    key={layer}
                    className="flex items-center gap-3 py-2 border-b"
                    style={{ borderColor: `${colors.cyanLines}30` }}
                  >
                    <div
                      className="w-4 h-4"
                      style={{
                        border: `1px solid ${colors.cyanLines}`,
                        background: i === 0 ? colors.cyanLines : 'transparent',
                      }}
                    />
                    <span className="font-mono text-sm" style={{ color: colors.cyanLines }}>
                      {layer}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="mt-4 w-full py-2 font-mono text-sm"
                style={{
                  border: `1px solid ${colors.cyanLines}`,
                  color: colors.cyanLines,
                  background: `${colors.cyanLines}20`,
                }}
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- BLUEPRINT LEGEND NAV ---
export const BlueprintLegendNav = () => {
  const [activeItem, setActiveItem] = useState(0);

  const navItems = [
    { symbol: 'A', label: 'ARCHITECTURAL' },
    { symbol: 'S', label: 'STRUCTURAL' },
    { symbol: 'E', label: 'ELECTRICAL' },
    { symbol: 'M', label: 'MECHANICAL' },
  ];

  return (
    <div
      className="h-full flex items-center justify-center p-8"
      style={{
        background: `linear-gradient(180deg, ${colors.blueprintBlue} 0%, #0f1f33 100%)`,
      }}
    >
      <div
        className="p-4"
        style={{
          border: `1px solid ${colors.cyanLines}`,
          background: `${colors.cyanLines}05`,
        }}
      >
        {/* Legend title */}
        <div
          className="mb-4 pb-2 border-b font-mono text-xs tracking-wider"
          style={{
            borderColor: colors.cyanLines,
            color: colors.cyanLines,
          }}
        >
          DRAWING LEGEND
        </div>

        {/* Nav items */}
        <div className="space-y-1">
          {navItems.map((item, i) => (
            <button
              key={item.label}
              onClick={() => setActiveItem(i)}
              className="w-full flex items-center gap-3 px-3 py-2 transition-all"
              style={{
                background: activeItem === i ? `${colors.cyanLines}20` : 'transparent',
                borderLeft: activeItem === i ? `3px solid ${colors.cyanLines}` : '3px solid transparent',
              }}
            >
              {/* Symbol circle */}
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center font-mono text-sm font-bold"
                style={{
                  border: `2px solid ${activeItem === i ? colors.annotationYellow : colors.cyanLines}`,
                  color: activeItem === i ? colors.annotationYellow : colors.cyanLines,
                }}
              >
                {item.symbol}
              </div>

              <span
                className="font-mono text-xs tracking-wide"
                style={{
                  color: activeItem === i ? colors.white : colors.cyanLines,
                }}
              >
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- BLUEPRINT LINE DIVIDER ---
export const BlueprintLineDivider = () => {
  return (
    <div
      className="h-full flex items-center justify-center p-8"
      style={{
        background: colors.blueprintBlue,
      }}
    >
      <div className="w-72 relative py-4">
        {/* Main dimension line */}
        <div className="relative">
          {/* Left arrow */}
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2"
            style={{ color: colors.cyanLines }}
          >
            <svg width="16" height="12" viewBox="0 0 16 12">
              <polygon points="0,6 16,0 16,12" fill="currentColor" />
            </svg>
          </div>

          {/* Line */}
          <div
            className="mx-4 h-px"
            style={{ background: colors.cyanLines }}
          />

          {/* Right arrow */}
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2"
            style={{ color: colors.cyanLines }}
          >
            <svg width="16" height="12" viewBox="0 0 16 12">
              <polygon points="16,6 0,0 0,12" fill="currentColor" />
            </svg>
          </div>
        </div>

        {/* Dimension text */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 font-mono text-xs"
          style={{
            background: colors.blueprintBlue,
            color: colors.annotationYellow,
          }}
        >
          2400 mm
        </div>

        {/* Extension lines */}
        <div
          className="absolute -top-2 left-0 w-px h-6"
          style={{ background: colors.cyanLines }}
        />
        <div
          className="absolute -top-2 right-0 w-px h-6"
          style={{ background: colors.cyanLines }}
        />
      </div>
    </div>
  );
};

// --- BLUEPRINT NOTE ALERT ---
export const BlueprintNoteAlert = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div
      className="h-full flex items-center justify-center p-8"
      style={{
        background: colors.blueprintBlue,
      }}
    >
      {isVisible && (
        <div className="relative">
          {/* Sticky note */}
          <div
            className="w-56 p-4 transform rotate-1"
            style={{
              background: colors.annotationYellow,
              boxShadow: '4px 4px 12px rgba(0,0,0,0.3)',
            }}
          >
            {/* Pin */}
            <div
              className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full"
              style={{
                background: 'radial-gradient(circle at 30% 30%, #ff6b6b, #cc5555)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
              }}
            />

            {/* Content */}
            <div className="font-mono text-xs" style={{ color: colors.blueprintBlue }}>
              <div className="font-bold mb-2">NOTE:</div>
              <p>Verify all dimensions on site before fabrication. See detail A-12 for connection specs.</p>
            </div>

            {/* Close button */}
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center font-mono text-xs"
              style={{ color: colors.blueprintBlue }}
            >
              x
            </button>

            {/* Leader line */}
            <svg
              className="absolute -right-12 top-1/2 w-12 h-8 overflow-visible"
              viewBox="0 0 50 30"
            >
              <path
                d="M0 15 L30 15 L40 0"
                fill="none"
                stroke={colors.blueprintBlue}
                strokeWidth="1.5"
                strokeDasharray="4 2"
              />
              <circle cx="40" cy="0" r="3" fill={colors.blueprintBlue} />
            </svg>
          </div>
        </div>
      )}

      {!isVisible && (
        <button
          onClick={() => setIsVisible(true)}
          className="px-4 py-2 font-mono text-xs"
          style={{
            border: `1px solid ${colors.cyanLines}`,
            color: colors.cyanLines,
            background: 'transparent',
          }}
        >
          SHOW NOTE
        </button>
      )}
    </div>
  );
};

// --- BLUEPRINT TOOL ICON ---
export const BlueprintToolIcon = () => {
  const [selectedTool, setSelectedTool] = useState(0);

  const tools = [
    {
      name: 'T-Square',
      icon: (
        <svg viewBox="0 0 40 40" className="w-full h-full">
          <rect x="5" y="18" width="30" height="4" fill={colors.cyanLines} />
          <rect x="5" y="10" width="8" height="20" fill={colors.cyanLines} />
        </svg>
      ),
    },
    {
      name: 'Compass',
      icon: (
        <svg viewBox="0 0 40 40" className="w-full h-full">
          <circle cx="20" cy="12" r="4" fill={colors.cyanLines} />
          <line x1="20" y1="12" x2="10" y2="35" stroke={colors.cyanLines} strokeWidth="2" />
          <line x1="20" y1="12" x2="30" y2="35" stroke={colors.cyanLines} strokeWidth="2" />
          <circle cx="10" cy="35" r="2" fill={colors.cyanLines} />
          <polygon points="30,35 28,32 32,32" fill={colors.annotationYellow} />
        </svg>
      ),
    },
    {
      name: 'Triangle',
      icon: (
        <svg viewBox="0 0 40 40" className="w-full h-full">
          <polygon
            points="20,5 5,35 35,35"
            fill="none"
            stroke={colors.cyanLines}
            strokeWidth="2"
          />
        </svg>
      ),
    },
  ];

  return (
    <div
      className="h-full flex items-center justify-center p-8"
      style={{
        background: `linear-gradient(135deg, ${colors.blueprintBlue} 0%, #0f1f33 100%)`,
      }}
    >
      <div className="flex flex-col items-center gap-4">
        {/* Tool icons */}
        <div className="flex gap-4">
          {tools.map((tool, i) => (
            <button
              key={tool.name}
              onClick={() => setSelectedTool(i)}
              className="w-16 h-16 p-2 transition-all"
              style={{
                border: `2px solid ${selectedTool === i ? colors.annotationYellow : colors.cyanLines}`,
                background: selectedTool === i ? `${colors.cyanLines}20` : 'transparent',
                boxShadow: selectedTool === i ? `0 0 15px ${colors.cyanLines}40` : 'none',
              }}
            >
              {tool.icon}
            </button>
          ))}
        </div>

        {/* Selected tool name */}
        <div
          className="font-mono text-xs tracking-wider"
          style={{ color: colors.cyanLines }}
        >
          TOOL: {tools[selectedTool].name.toUpperCase()}
        </div>
      </div>
    </div>
  );
};

// --- BLUEPRINT TITLE HEADING ---
export const BlueprintTitleHeading = () => {
  return (
    <div
      className="h-full flex items-center justify-center p-8"
      style={{
        background: colors.blueprintBlue,
      }}
    >
      <div className="relative">
        {/* Title block */}
        <div
          className="px-8 py-4"
          style={{
            border: `2px solid ${colors.cyanLines}`,
            background: `${colors.cyanLines}05`,
          }}
        >
          {/* Double line top */}
          <div
            className="absolute -top-1 left-4 right-4 h-px"
            style={{ background: colors.cyanLines }}
          />

          <div className="text-center">
            {/* Project number */}
            <div
              className="font-mono text-xs mb-1 tracking-[0.3em]"
              style={{ color: colors.cyanLines }}
            >
              PROJECT NO. 2024-0156
            </div>

            {/* Main title */}
            <h1
              className="font-mono text-2xl font-bold tracking-wider"
              style={{ color: colors.white }}
            >
              MAIN FLOOR PLAN
            </h1>

            {/* Subtitle */}
            <div
              className="font-mono text-sm mt-1"
              style={{ color: colors.cyanLines }}
            >
              ARCHITECTURAL DRAWING SET
            </div>
          </div>

          {/* Double line bottom */}
          <div
            className="absolute -bottom-1 left-4 right-4 h-px"
            style={{ background: colors.cyanLines }}
          />
        </div>

        {/* Corner decorations */}
        <div className="absolute -top-3 -left-3 w-6 h-6">
          <div className="absolute w-full h-px top-1/2" style={{ background: colors.cyanLines }} />
          <div className="absolute h-full w-px left-1/2" style={{ background: colors.cyanLines }} />
        </div>
        <div className="absolute -top-3 -right-3 w-6 h-6">
          <div className="absolute w-full h-px top-1/2" style={{ background: colors.cyanLines }} />
          <div className="absolute h-full w-px left-1/2" style={{ background: colors.cyanLines }} />
        </div>
      </div>
    </div>
  );
};

// --- BLUEPRINT MEASURE SLIDER ---
export const BlueprintMeasureSlider = () => {
  const [value, setValue] = useState(50);
  const trackRef = useRef<HTMLDivElement>(null);

  const handleTrackClick = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const percent = ((e.clientX - rect.left) / rect.width) * 100;
    setValue(Math.max(0, Math.min(100, percent)));
  };

  return (
    <div
      className="h-full flex flex-col items-center justify-center p-8"
      style={{
        background: colors.blueprintBlue,
      }}
    >
      <div className="w-72">
        {/* Ruler track */}
        <div
          ref={trackRef}
          onClick={handleTrackClick}
          className="relative h-12 cursor-pointer"
          style={{
            border: `1px solid ${colors.cyanLines}`,
            background: `${colors.cyanLines}05`,
          }}
        >
          {/* Measurement marks */}
          <div className="absolute inset-0 flex">
            {[...Array(11)].map((_, i) => (
              <div key={i} className="flex-1 relative">
                {/* Major mark */}
                <div
                  className="absolute left-0 top-0 w-px"
                  style={{
                    height: '60%',
                    background: colors.cyanLines,
                  }}
                />
                {/* Minor marks */}
                {i < 10 && [...Array(4)].map((_, j) => (
                  <div
                    key={j}
                    className="absolute top-0 w-px"
                    style={{
                      left: `${(j + 1) * 20}%`,
                      height: j === 1 ? '40%' : '25%',
                      background: `${colors.cyanLines}60`,
                    }}
                  />
                ))}
                {/* Number label */}
                <span
                  className="absolute bottom-1 left-0 font-mono text-[10px] -translate-x-1/2"
                  style={{ color: colors.cyanLines }}
                >
                  {i * 10}
                </span>
              </div>
            ))}
          </div>

          {/* Slider thumb */}
          <div
            className="absolute top-0 h-full w-1 -translate-x-1/2"
            style={{
              left: `${value}%`,
              background: colors.annotationYellow,
              boxShadow: `0 0 10px ${colors.annotationYellow}80`,
            }}
          >
            {/* Value indicator */}
            <div
              className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 font-mono text-xs whitespace-nowrap"
              style={{
                background: colors.annotationYellow,
                color: colors.blueprintBlue,
              }}
            >
              {Math.round(value)}
            </div>
          </div>
        </div>

        {/* Unit label */}
        <div
          className="mt-2 text-center font-mono text-xs"
          style={{ color: colors.cyanLines }}
        >
          MEASUREMENT (cm)
        </div>
      </div>
    </div>
  );
};

// --- BLUEPRINT SHEET TABS ---
export const BlueprintSheetTabs = () => {
  const [activeSheet, setActiveSheet] = useState(0);

  const sheets = [
    { id: 'A-101', name: 'FLOOR PLAN' },
    { id: 'A-102', name: 'ELEVATIONS' },
    { id: 'A-103', name: 'SECTIONS' },
    { id: 'A-104', name: 'DETAILS' },
  ];

  return (
    <div
      className="h-full flex items-center justify-center p-8"
      style={{
        background: `linear-gradient(180deg, ${colors.blueprintBlue} 0%, #0f1f33 100%)`,
      }}
    >
      <div>
        {/* Tab strip */}
        <div className="flex">
          {sheets.map((sheet, i) => (
            <button
              key={sheet.id}
              onClick={() => setActiveSheet(i)}
              className="relative px-4 py-3 font-mono text-xs transition-all"
              style={{
                background: activeSheet === i ? colors.blueprintBlue : 'transparent',
                borderTop: `2px solid ${activeSheet === i ? colors.cyanLines : 'transparent'}`,
                borderLeft: `1px solid ${colors.cyanLines}40`,
                borderRight: `1px solid ${colors.cyanLines}40`,
                borderBottom: activeSheet === i ? 'none' : `1px solid ${colors.cyanLines}`,
                color: activeSheet === i ? colors.white : colors.cyanLines,
                marginBottom: activeSheet === i ? '-1px' : '0',
                zIndex: activeSheet === i ? 10 : 1,
              }}
            >
              <div className="font-bold">{sheet.id}</div>
              <div className="text-[10px] opacity-70">{sheet.name}</div>

              {/* Active indicator triangle */}
              {activeSheet === i && (
                <div
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2"
                  style={{ color: colors.cyanLines }}
                >
                  <svg width="10" height="6" viewBox="0 0 10 6">
                    <polygon points="5,6 0,0 10,0" fill="currentColor" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Content area */}
        <div
          className="w-72 h-32 p-4"
          style={{
            border: `1px solid ${colors.cyanLines}`,
            borderTop: 'none',
            background: colors.blueprintBlue,
          }}
        >
          <div className="font-mono text-sm" style={{ color: colors.cyanLines }}>
            <div className="text-xs opacity-60 mb-2">CURRENT SHEET:</div>
            <div className="text-lg" style={{ color: colors.white }}>
              {sheets[activeSheet].id}
            </div>
            <div className="text-xs mt-1">
              {sheets[activeSheet].name}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- BLUEPRINT GRID BACKGROUND ---
export const BlueprintGridBackground = () => {
  const [zoom, setZoom] = useState(1);

  return (
    <div
      className="h-full relative overflow-hidden"
      style={{
        background: colors.blueprintBlue,
      }}
    >
      {/* Grid layers */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          {/* Fine grid */}
          <pattern
            id="fineGrid"
            width={10 * zoom}
            height={10 * zoom}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${10 * zoom} 0 L 0 0 0 ${10 * zoom}`}
              fill="none"
              stroke={colors.cyanLines}
              strokeWidth="0.3"
              opacity="0.2"
            />
          </pattern>

          {/* Major grid */}
          <pattern
            id="majorGrid"
            width={50 * zoom}
            height={50 * zoom}
            patternUnits="userSpaceOnUse"
          >
            <rect width={50 * zoom} height={50 * zoom} fill="url(#fineGrid)" />
            <path
              d={`M ${50 * zoom} 0 L 0 0 0 ${50 * zoom}`}
              fill="none"
              stroke={colors.cyanLines}
              strokeWidth="0.8"
              opacity="0.4"
            />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#majorGrid)" />

        {/* Center crosshairs */}
        <line x1="50%" y1="0" x2="50%" y2="100%" stroke={colors.cyanLines} strokeWidth="1" opacity="0.3" />
        <line x1="0" y1="50%" x2="100%" y2="50%" stroke={colors.cyanLines} strokeWidth="1" opacity="0.3" />

        {/* Origin circle */}
        <circle cx="50%" cy="50%" r="8" fill="none" stroke={colors.cyanLines} strokeWidth="1" opacity="0.5" />
        <circle cx="50%" cy="50%" r="3" fill={colors.cyanLines} opacity="0.5" />
      </svg>

      {/* Zoom controls */}
      <div
        className="absolute bottom-4 right-4 flex gap-2"
      >
        <button
          onClick={() => setZoom(z => Math.max(0.5, z - 0.25))}
          className="w-8 h-8 flex items-center justify-center font-mono"
          style={{
            border: `1px solid ${colors.cyanLines}`,
            color: colors.cyanLines,
            background: `${colors.blueprintBlue}cc`,
          }}
        >
          -
        </button>
        <div
          className="px-3 h-8 flex items-center font-mono text-xs"
          style={{
            border: `1px solid ${colors.cyanLines}`,
            color: colors.cyanLines,
            background: `${colors.blueprintBlue}cc`,
          }}
        >
          {(zoom * 100).toFixed(0)}%
        </div>
        <button
          onClick={() => setZoom(z => Math.min(2, z + 0.25))}
          className="w-8 h-8 flex items-center justify-center font-mono"
          style={{
            border: `1px solid ${colors.cyanLines}`,
            color: colors.cyanLines,
            background: `${colors.blueprintBlue}cc`,
          }}
        >
          +
        </button>
      </div>

      {/* Grid info */}
      <div
        className="absolute top-4 left-4 font-mono text-xs"
        style={{ color: colors.cyanLines }}
      >
        <div>GRID: 10mm / 50mm</div>
        <div>SCALE: {zoom.toFixed(2)}x</div>
      </div>
    </div>
  );
};

// Export all components with exact IDs
export const blueprintDraftComponents: Record<string, React.FC> = {
  'blueprint-stamp-button': BlueprintStampButton,
  'blueprint-plan-card': BlueprintPlanCard,
  'blueprint-field-input': BlueprintFieldInput,
  'blueprint-revision-badge': BlueprintRevisionBadge,
  'blueprint-switch-toggle': BlueprintSwitchToggle,
  'blueprint-scale-progress': BlueprintScaleProgress,
  'blueprint-compass-loader': BlueprintCompassLoader,
  'blueprint-profile-avatar': BlueprintProfileAvatar,
  'blueprint-layer-modal': BlueprintLayerModal,
  'blueprint-legend-nav': BlueprintLegendNav,
  'blueprint-line-divider': BlueprintLineDivider,
  'blueprint-note-alert': BlueprintNoteAlert,
  'blueprint-tool-icon': BlueprintToolIcon,
  'blueprint-title-heading': BlueprintTitleHeading,
  'blueprint-measure-slider': BlueprintMeasureSlider,
  'blueprint-sheet-tabs': BlueprintSheetTabs,
  'blueprint-grid-background': BlueprintGridBackground,
};
