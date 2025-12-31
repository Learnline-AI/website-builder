import React, { useState, useEffect } from 'react';

// --- ILLUMINATED BUTTON ---
export const IlluminatedButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-8" style={{ background: 'linear-gradient(180deg, #2d2418 0%, #1a1408 100%)' }}>
      <button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { setIsHovered(false); setIsPressed(false); }}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        className="relative group"
      >
        {/* Outer ornate border */}
        <div className="absolute -inset-4 pointer-events-none">
          <svg viewBox="0 0 200 80" className="w-full h-full">
            {/* Corner flourishes */}
            <path
              d="M10 10 Q20 0 30 10 L30 15 Q20 10 15 15 L10 10"
              fill={isHovered ? '#c9a227' : '#8b7355'}
              className="transition-all duration-300"
            />
            <path
              d="M190 10 Q180 0 170 10 L170 15 Q180 10 185 15 L190 10"
              fill={isHovered ? '#c9a227' : '#8b7355'}
              className="transition-all duration-300"
            />
            <path
              d="M10 70 Q20 80 30 70 L30 65 Q20 70 15 65 L10 70"
              fill={isHovered ? '#c9a227' : '#8b7355'}
              className="transition-all duration-300"
            />
            <path
              d="M190 70 Q180 80 170 70 L170 65 Q180 70 185 65 L190 70"
              fill={isHovered ? '#c9a227' : '#8b7355'}
              className="transition-all duration-300"
            />
            {/* Border lines */}
            <rect
              x="25"
              y="5"
              width="150"
              height="70"
              rx="5"
              fill="none"
              stroke={isHovered ? '#c9a227' : '#8b7355'}
              strokeWidth="2"
              className="transition-all duration-300"
            />
          </svg>
        </div>

        {/* Main button */}
        <div
          className="relative px-12 py-4 overflow-hidden transition-all duration-300"
          style={{
            background: isPressed
              ? 'linear-gradient(180deg, #1a1408 0%, #2d2418 100%)'
              : 'linear-gradient(180deg, #3d3020 0%, #2d2418 100%)',
            border: `2px solid ${isHovered ? '#c9a227' : '#8b7355'}`,
            borderRadius: '4px',
            boxShadow: isHovered
              ? '0 0 20px #c9a22740, inset 0 0 20px #c9a22710'
              : 'none',
            transform: isPressed ? 'scale(0.98)' : 'scale(1)',
          }}
        >
          {/* Gold leaf shimmer on hover */}
          {isHovered && (
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, transparent 40%, #c9a22730 50%, transparent 60%)',
                animation: 'shimmer 1.5s infinite',
              }}
            />
          )}

          {/* Illuminated initial */}
          <span className="relative flex items-center gap-3">
            <span
              className="text-3xl font-serif transition-all duration-300"
              style={{
                color: isHovered ? '#c9a227' : '#8b7355',
                textShadow: isHovered ? '0 0 10px #c9a22780' : 'none',
              }}
            >
              ✠
            </span>
            <span
              className="text-lg font-serif tracking-widest transition-colors duration-300"
              style={{ color: '#f4e4bc' }}
            >
              PROCEED
            </span>
          </span>
        </div>
      </button>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

// --- QUILL INPUT ---
export const QuillInput = () => {
  const [text, setText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const [inkSplatter, setInkSplatter] = useState<{ x: number; y: number; id: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(v => !v);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    // Random ink splatter
    if (Math.random() > 0.9) {
      const splatter = {
        x: Math.random() * 100,
        y: Math.random() * 100,
        id: Date.now(),
      };
      setInkSplatter(prev => [...prev.slice(-5), splatter]);
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-8" style={{ background: '#2d2418' }}>
      {/* Parchment paper */}
      <div
        className="relative w-80 rounded-lg overflow-hidden"
        style={{
          background: `
            linear-gradient(180deg, #f4e4bc 0%, #e8d4a8 50%, #f4e4bc 100%),
            url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)' opacity='0.1'/%3E%3C/svg%3E")
          `,
          boxShadow: '0 4px 20px rgba(0,0,0,0.3), inset 0 0 30px rgba(139, 115, 85, 0.2)',
          border: '1px solid #8b7355',
        }}
      >
        {/* Ink splatters */}
        {inkSplatter.map(s => (
          <div
            key={s.id}
            className="absolute w-1 h-1 rounded-full animate-fade-out"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              background: '#1a1408',
              boxShadow: '0 0 3px #1a1408',
            }}
          />
        ))}

        {/* Header decoration */}
        <div className="p-4 border-b border-[#c9a22740]">
          <div className="flex items-center justify-center gap-2">
            <span className="text-[#c9a227] text-lg">❧</span>
            <span className="font-serif text-sm tracking-widest" style={{ color: '#5a4a30' }}>
              MANUSCRIPT
            </span>
            <span className="text-[#c9a227] text-lg">❧</span>
          </div>
        </div>

        {/* Writing area */}
        <div className="p-6 relative">
          {/* Ruled lines */}
          <div
            className="absolute inset-6 pointer-events-none"
            style={{
              backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, #c9a22730 28px)',
            }}
          />

          <textarea
            value={text}
            onChange={handleChange}
            placeholder="Begin thy inscription..."
            className="w-full h-48 bg-transparent resize-none outline-none font-serif text-lg leading-7 relative z-10"
            style={{
              color: '#1a1408',
              caretColor: 'transparent',
            }}
          />

          {/* Custom cursor (quill effect) */}
          <span
            className="absolute pointer-events-none transition-opacity duration-100"
            style={{
              opacity: cursorVisible && document.activeElement?.tagName === 'TEXTAREA' ? 1 : 0,
              color: '#1a1408',
            }}
          >
            |
          </span>
        </div>

        {/* Footer */}
        <div className="px-6 pb-4 flex justify-between items-center">
          <span className="text-xs font-serif" style={{ color: '#8b7355' }}>
            {text.length} characters
          </span>
          <span className="text-xs font-serif" style={{ color: '#c9a227' }}>
            ✒️ Quill Ready
          </span>
        </div>
      </div>
    </div>
  );
};

// --- WAX SEAL BUTTON ---
export const WaxSealButton = () => {
  const [isSealed, setIsSealed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSeal = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setIsSealed(true);
      setIsAnimating(false);
    }, 600);
  };

  const handleUnseal = () => {
    setIsSealed(false);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-8" style={{ background: '#2d2418' }}>
      {/* Document */}
      <div
        className="relative w-64 p-6 rounded"
        style={{
          background: '#f4e4bc',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        }}
      >
        {/* Document content */}
        <div className="space-y-2 mb-8">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-2 rounded"
              style={{
                background: '#c9a22740',
                width: `${80 - i * 15}%`,
              }}
            />
          ))}
        </div>

        <div className="text-right font-serif text-xs" style={{ color: '#5a4a30' }}>
          Anno Domini MMXXV
        </div>

        {/* Wax seal */}
        <button
          onClick={isSealed ? handleUnseal : handleSeal}
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full transition-all duration-300"
          style={{
            background: isSealed
              ? 'radial-gradient(circle at 30% 30%, #c41e3a, #8b0000)'
              : 'radial-gradient(circle at 30% 30%, #c9a227, #8b6914)',
            boxShadow: isSealed
              ? '0 4px 15px rgba(139, 0, 0, 0.5), inset 0 -2px 4px rgba(0,0,0,0.3)'
              : '0 4px 15px rgba(139, 105, 20, 0.5), inset 0 -2px 4px rgba(0,0,0,0.2)',
            transform: isAnimating ? 'scale(1.1)' : 'scale(1)',
          }}
        >
          {/* Seal emblem */}
          <div className="absolute inset-2 rounded-full flex items-center justify-center">
            <span
              className="text-2xl transition-all duration-300"
              style={{
                color: isSealed ? '#f4e4bc' : '#5a4a30',
                transform: isAnimating ? 'rotate(360deg)' : 'rotate(0deg)',
              }}
            >
              {isSealed ? '✠' : '◎'}
            </span>
          </div>

          {/* Wax drips */}
          {isSealed && (
            <>
              <div
                className="absolute -top-2 left-3 w-3 h-6 rounded-full"
                style={{ background: 'linear-gradient(180deg, #c41e3a, #8b0000)' }}
              />
              <div
                className="absolute -top-1 right-4 w-2 h-4 rounded-full"
                style={{ background: 'linear-gradient(180deg, #c41e3a, #8b0000)' }}
              />
            </>
          )}
        </button>
      </div>

      {/* Status */}
      <div className="mt-16 text-center">
        <span className="font-serif text-sm" style={{ color: '#c9a227' }}>
          {isSealed ? '✓ Document Sealed' : 'Click seal to confirm'}
        </span>
      </div>
    </div>
  );
};

// --- SCROLL ACCORDION ---
export const ScrollAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const scrolls = [
    { title: 'Chapter I', content: 'In the beginning of the realm, when darkness covered the land...' },
    { title: 'Chapter II', content: 'The great council assembled beneath the ancient oak...' },
    { title: 'Chapter III', content: 'Through fire and shadow, the heroes journeyed forth...' },
  ];

  return (
    <div className="h-full flex flex-col items-center justify-center p-8" style={{ background: '#1a1408' }}>
      <div className="w-80 space-y-4">
        {scrolls.map((scroll, index) => (
          <div
            key={index}
            className="relative cursor-pointer"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            {/* Scroll roll top */}
            <div
              className="relative h-8 rounded-full flex items-center justify-center z-10"
              style={{
                background: 'linear-gradient(180deg, #8b6914 0%, #5a4a30 50%, #8b6914 100%)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              }}
            >
              <span className="font-serif text-sm tracking-wider" style={{ color: '#f4e4bc' }}>
                {scroll.title}
              </span>
              <span
                className="absolute right-4 transition-transform duration-500"
                style={{
                  color: '#c9a227',
                  transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              >
                ▼
              </span>
            </div>

            {/* Scroll content (parchment) */}
            <div
              className="overflow-hidden transition-all duration-500 -mt-2 relative"
              style={{
                maxHeight: openIndex === index ? '200px' : '0px',
              }}
            >
              <div
                className="pt-6 pb-4 px-4"
                style={{
                  background: 'linear-gradient(180deg, #e8d4a8 0%, #f4e4bc 20%, #f4e4bc 80%, #e8d4a8 100%)',
                  borderLeft: '2px solid #8b6914',
                  borderRight: '2px solid #8b6914',
                }}
              >
                <p className="font-serif text-sm leading-relaxed" style={{ color: '#3d3020' }}>
                  {scroll.content}
                </p>

                {/* Decorative initial */}
                <span
                  className="absolute top-4 left-2 text-4xl font-serif opacity-20"
                  style={{ color: '#c9a227' }}
                >
                  {scroll.content[0]}
                </span>
              </div>

              {/* Scroll roll bottom */}
              <div
                className="h-6 rounded-full -mt-1"
                style={{
                  background: 'linear-gradient(180deg, #5a4a30 0%, #8b6914 50%, #5a4a30 100%)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- CELTIC BORDER ---
export const CelticBorder = () => {
  const [isAnimating, setIsAnimating] = useState(true);

  return (
    <div className="h-full flex items-center justify-center p-8" style={{ background: '#2d2418' }}>
      <div className="relative w-72 h-72">
        {/* Celtic knot border */}
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c9a227" />
              <stop offset="50%" stopColor="#f4e4bc" />
              <stop offset="100%" stopColor="#c9a227" />
            </linearGradient>
          </defs>

          {/* Outer frame */}
          <rect
            x="10"
            y="10"
            width="180"
            height="180"
            rx="8"
            fill="none"
            stroke="url(#goldGrad)"
            strokeWidth="3"
          />

          {/* Celtic knot corners */}
          {[
            { x: 10, y: 10, rotate: 0 },
            { x: 190, y: 10, rotate: 90 },
            { x: 190, y: 190, rotate: 180 },
            { x: 10, y: 190, rotate: 270 },
          ].map((corner, i) => (
            <g
              key={i}
              transform={`translate(${corner.x}, ${corner.y}) rotate(${corner.rotate})`}
              className={isAnimating ? 'animate-pulse' : ''}
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              <path
                d="M0 0 Q15 5 20 20 Q5 15 0 0"
                fill="none"
                stroke="#c9a227"
                strokeWidth="2"
              />
              <circle cx="10" cy="10" r="3" fill="#c9a227" />
            </g>
          ))}

          {/* Interlacing pattern along edges */}
          {[...Array(4)].map((_, i) => (
            <g key={i}>
              <path
                d={`M${40 + i * 35} 15 Q${50 + i * 35} 25 ${60 + i * 35} 15`}
                fill="none"
                stroke="#c9a227"
                strokeWidth="2"
                style={{
                  animation: isAnimating ? `knotPulse 2s ease-in-out ${i * 0.3}s infinite` : 'none',
                }}
              />
            </g>
          ))}
        </svg>

        {/* Inner content */}
        <div className="absolute inset-8 flex flex-col items-center justify-center text-center">
          <span className="text-4xl mb-2" style={{ color: '#c9a227' }}>✠</span>
          <h3 className="font-serif text-lg tracking-widest mb-2" style={{ color: '#f4e4bc' }}>
            ILLUMINATED
          </h3>
          <p className="font-serif text-xs" style={{ color: '#8b7355' }}>
            Manuscript Border
          </p>

          {/* Toggle animation */}
          <button
            onClick={() => setIsAnimating(!isAnimating)}
            className="mt-4 px-4 py-1 rounded font-serif text-xs transition-all"
            style={{
              background: isAnimating ? '#c9a22730' : 'transparent',
              border: '1px solid #c9a227',
              color: '#c9a227',
            }}
          >
            {isAnimating ? 'Pause' : 'Animate'}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes knotPulse {
          0%, 100% { stroke-opacity: 0.5; }
          50% { stroke-opacity: 1; stroke-width: 3; }
        }
      `}</style>
    </div>
  );
};

// --- HERALDRY SHIELD ---
export const HeraldryShield = () => {
  const [selectedQuarter, setSelectedQuarter] = useState<number | null>(null);

  const quarters = [
    { bg: '#8b0000', symbol: '🦁', name: 'Leo' },
    { bg: '#1e3a5f', symbol: '🦅', name: 'Aquila' },
    { bg: '#1e5f1e', symbol: '🐉', name: 'Draco' },
    { bg: '#5f1e5f', symbol: '🦄', name: 'Unicornis' },
  ];

  return (
    <div className="h-full flex flex-col items-center justify-center p-8" style={{ background: '#2d2418' }}>
      {/* Shield */}
      <div className="relative">
        <svg viewBox="0 0 120 150" className="w-48 h-60">
          <defs>
            <clipPath id="shieldClip">
              <path d="M60 0 L120 20 L120 90 Q120 130 60 150 Q0 130 0 90 L0 20 Z" />
            </clipPath>
            <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c9a227" />
              <stop offset="50%" stopColor="#ffd700" />
              <stop offset="100%" stopColor="#c9a227" />
            </linearGradient>
          </defs>

          {/* Shield background */}
          <path
            d="M60 0 L120 20 L120 90 Q120 130 60 150 Q0 130 0 90 L0 20 Z"
            fill="#1a1408"
            stroke="url(#metalGrad)"
            strokeWidth="4"
          />

          {/* Quarters */}
          <g clipPath="url(#shieldClip)">
            {quarters.map((q, i) => (
              <rect
                key={i}
                x={i % 2 === 0 ? 0 : 60}
                y={i < 2 ? 0 : 75}
                width="60"
                height="75"
                fill={q.bg}
                opacity={selectedQuarter === i ? 1 : 0.8}
                className="cursor-pointer transition-opacity"
                onClick={() => setSelectedQuarter(selectedQuarter === i ? null : i)}
              />
            ))}

            {/* Division lines */}
            <line x1="60" y1="0" x2="60" y2="150" stroke="#c9a227" strokeWidth="3" />
            <line x1="0" y1="75" x2="120" y2="75" stroke="#c9a227" strokeWidth="3" />
          </g>

          {/* Center boss */}
          <circle cx="60" cy="75" r="15" fill="url(#metalGrad)" />
          <circle cx="60" cy="75" r="10" fill="#1a1408" />
          <circle cx="60" cy="75" r="6" fill="url(#metalGrad)" />
        </svg>

        {/* Quarter symbols */}
        {quarters.map((q, i) => (
          <span
            key={i}
            className="absolute text-2xl pointer-events-none transition-transform"
            style={{
              left: i % 2 === 0 ? '25%' : '65%',
              top: i < 2 ? '20%' : '55%',
              transform: selectedQuarter === i ? 'scale(1.3)' : 'scale(1)',
            }}
          >
            {q.symbol}
          </span>
        ))}
      </div>

      {/* Selected quarter info */}
      <div className="mt-6 text-center">
        <span className="font-serif text-sm" style={{ color: '#c9a227' }}>
          {selectedQuarter !== null ? `House of ${quarters[selectedQuarter].name}` : 'Select a Quarter'}
        </span>
      </div>
    </div>
  );
};

// --- TAPESTRY TABS ---
export const TapestryTabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { name: 'Knights', icon: '⚔️', content: 'The noble knights rode forth at dawn, their armor gleaming in the morning light.' },
    { name: 'Clergy', icon: '✝️', content: 'In the monastery, monks toiled over sacred manuscripts by candlelight.' },
    { name: 'Peasants', icon: '🌾', content: 'The fields yielded a bountiful harvest, blessing the village with plenty.' },
  ];

  return (
    <div className="h-full flex flex-col items-center justify-center p-6" style={{ background: '#2d2418' }}>
      <div
        className="w-full max-w-sm overflow-hidden rounded-lg"
        style={{
          background: '#f4e4bc',
          border: '4px solid #8b6914',
          boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
        }}
      >
        {/* Woven pattern header */}
        <div
          className="h-3"
          style={{
            background: `repeating-linear-gradient(
              90deg,
              #8b0000 0px,
              #8b0000 8px,
              #1e3a5f 8px,
              #1e3a5f 16px,
              #c9a227 16px,
              #c9a227 24px
            )`,
          }}
        />

        {/* Tab headers */}
        <div className="flex border-b-2 border-[#8b6914]">
          {tabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className="flex-1 py-3 px-2 font-serif text-sm transition-all relative"
              style={{
                background: activeTab === i ? '#f4e4bc' : '#e8d4a8',
                color: activeTab === i ? '#3d3020' : '#8b7355',
                borderBottom: activeTab === i ? '3px solid #c9a227' : '3px solid transparent',
              }}
            >
              <span className="block text-lg mb-1">{tab.icon}</span>
              <span className="tracking-wider">{tab.name}</span>
              {activeTab === i && (
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 w-0 h-0"
                  style={{
                    borderLeft: '8px solid transparent',
                    borderRight: '8px solid transparent',
                    borderTop: '8px solid #c9a227',
                  }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 min-h-[120px]">
          {/* Decorative initial */}
          <span
            className="float-left text-5xl font-serif mr-2 mt-1"
            style={{
              color: '#c9a227',
              textShadow: '1px 1px 0 #8b6914',
            }}
          >
            {tabs[activeTab].content[0]}
          </span>
          <p className="font-serif text-sm leading-relaxed" style={{ color: '#3d3020' }}>
            {tabs[activeTab].content.slice(1)}
          </p>
        </div>

        {/* Woven pattern footer */}
        <div
          className="h-3"
          style={{
            background: `repeating-linear-gradient(
              90deg,
              #c9a227 0px,
              #c9a227 8px,
              #1e3a5f 8px,
              #1e3a5f 16px,
              #8b0000 16px,
              #8b0000 24px
            )`,
          }}
        />
      </div>
    </div>
  );
};

// --- RUNE PROGRESS ---
export const RuneProgress = () => {
  const [progress, setProgress] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const runes = ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ', 'ᚺ', 'ᚾ'];

  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          setIsActive(false);
          return 100;
        }
        return p + 2;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [isActive]);

  const activeRunes = Math.floor((progress / 100) * runes.length);

  return (
    <div className="h-full flex flex-col items-center justify-center p-8" style={{ background: '#1a1408' }}>
      {/* Stone tablet */}
      <div
        className="p-6 rounded-lg"
        style={{
          background: 'linear-gradient(180deg, #4a4a4a 0%, #2d2d2d 50%, #4a4a4a 100%)',
          boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.1), inset 0 -2px 4px rgba(0,0,0,0.3), 0 4px 20px rgba(0,0,0,0.5)',
        }}
      >
        {/* Rune row */}
        <div className="flex gap-2 mb-4">
          {runes.map((rune, i) => (
            <div
              key={i}
              className="w-8 h-10 flex items-center justify-center rounded transition-all duration-300"
              style={{
                background: i < activeRunes ? '#c9a22720' : 'transparent',
                border: `2px solid ${i < activeRunes ? '#c9a227' : '#5a5a5a'}`,
                boxShadow: i < activeRunes ? '0 0 10px #c9a22760' : 'none',
              }}
            >
              <span
                className="text-xl font-bold transition-all duration-300"
                style={{
                  color: i < activeRunes ? '#c9a227' : '#5a5a5a',
                  textShadow: i < activeRunes ? '0 0 5px #c9a227' : 'none',
                }}
              >
                {rune}
              </span>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div
          className="h-3 rounded-full overflow-hidden mb-4"
          style={{ background: '#1a1a1a', border: '1px solid #5a5a5a' }}
        >
          <div
            className="h-full rounded-full transition-all duration-200"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #8b6914, #c9a227, #ffd700)',
              boxShadow: '0 0 10px #c9a227',
            }}
          />
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center">
          <span className="font-serif text-sm" style={{ color: '#c9a227' }}>
            {progress}% Complete
          </span>
          <button
            onClick={() => {
              if (progress >= 100) setProgress(0);
              setIsActive(!isActive);
            }}
            className="px-4 py-1 rounded font-serif text-sm"
            style={{
              background: '#c9a22720',
              border: '1px solid #c9a227',
              color: '#c9a227',
            }}
          >
            {progress >= 100 ? 'Reset' : isActive ? 'Pause' : 'Start'}
          </button>
        </div>
      </div>

      {/* Incantation */}
      <p className="mt-4 font-serif text-xs italic text-center" style={{ color: '#8b7355' }}>
        "Ancient runes reveal the path forward..."
      </p>
    </div>
  );
};

// --- HOURGLASS TIMER ---
export const HourglassTimer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);

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
    }, 50);
    return () => clearInterval(interval);
  }, [isRunning]);

  const sandTop = 100 - progress;
  const sandBottom = progress;

  return (
    <div className="h-full flex flex-col items-center justify-center p-8" style={{ background: '#2d2418' }}>
      {/* Hourglass frame */}
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
        <svg viewBox="0 0 100 160" className="w-32 h-52">
          <defs>
            <linearGradient id="woodGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#5a4a30" />
              <stop offset="50%" stopColor="#8b7355" />
              <stop offset="100%" stopColor="#5a4a30" />
            </linearGradient>
            <clipPath id="glassTop">
              <path d="M20 25 L50 75 L80 25 Z" />
            </clipPath>
            <clipPath id="glassBottom">
              <path d="M20 135 L50 85 L80 135 Z" />
            </clipPath>
          </defs>

          {/* Top frame */}
          <rect x="10" y="10" width="80" height="15" rx="3" fill="url(#woodGrad)" />
          <rect x="15" y="5" width="70" height="8" rx="2" fill="#c9a227" />

          {/* Bottom frame */}
          <rect x="10" y="135" width="80" height="15" rx="3" fill="url(#woodGrad)" />
          <rect x="15" y="147" width="70" height="8" rx="2" fill="#c9a227" />

          {/* Glass outline */}
          <path
            d="M20 25 Q20 50 50 80 Q80 50 80 25"
            fill="none"
            stroke="#8b7355"
            strokeWidth="3"
          />
          <path
            d="M20 135 Q20 110 50 80 Q80 110 80 135"
            fill="none"
            stroke="#8b7355"
            strokeWidth="3"
          />

          {/* Sand in top bulb */}
          <g clipPath="url(#glassTop)">
            <rect
              x="20"
              y={25 + (50 * (1 - sandTop / 100))}
              width="60"
              height={50 * (sandTop / 100)}
              fill="#c9a227"
              opacity="0.9"
            />
          </g>

          {/* Falling sand stream */}
          {isRunning && sandTop > 0 && (
            <line
              x1="50"
              y1="75"
              x2="50"
              y2="85"
              stroke="#c9a227"
              strokeWidth="2"
              style={{ animation: 'sandFall 0.2s linear infinite' }}
            />
          )}

          {/* Sand in bottom bulb */}
          <g clipPath="url(#glassBottom)">
            <rect
              x="20"
              y={135 - (50 * (sandBottom / 100))}
              width="60"
              height={50 * (sandBottom / 100)}
              fill="#c9a227"
              opacity="0.9"
            />
          </g>

          {/* Decorative side supports */}
          <path d="M18 25 L18 135" stroke="url(#woodGrad)" strokeWidth="4" />
          <path d="M82 25 L82 135" stroke="url(#woodGrad)" strokeWidth="4" />
        </svg>
      </div>

      {/* Status */}
      <div className="mt-4 text-center">
        <span className="font-serif text-sm" style={{ color: '#c9a227' }}>
          {progress >= 100 ? 'Time Elapsed - Click to Reset' : isRunning ? 'Sands of Time Flow...' : 'Click to Start'}
        </span>
        <div className="font-mono text-xs mt-2" style={{ color: '#8b7355' }}>
          {Math.floor(progress)}%
        </div>
      </div>

      <style>{`
        @keyframes sandFall {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

// --- MEDIEVAL CALENDAR ---
export const MedievalCalendar = () => {
  const [selectedDay, setSelectedDay] = useState(15);

  const days = [...Array(28)].map((_, i) => i + 1);
  const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#1a1408' }}>
      <div
        className="w-full max-w-xs rounded-lg overflow-hidden"
        style={{
          background: '#f4e4bc',
          border: '3px solid #8b6914',
          boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
        }}
      >
        {/* Header */}
        <div
          className="p-3 text-center"
          style={{
            background: 'linear-gradient(180deg, #8b0000 0%, #5a0000 100%)',
            borderBottom: '2px solid #c9a227',
          }}
        >
          <span className="font-serif text-lg tracking-widest text-[#f4e4bc]">
            DECEMBER
          </span>
          <div className="font-serif text-xs text-[#c9a227] mt-1">
            Anno Domini MMXXV
          </div>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 border-b border-[#c9a22740]">
          {romanNumerals.map((num, i) => (
            <div
              key={i}
              className="py-2 text-center font-serif text-xs"
              style={{ color: '#8b6914' }}
            >
              {num}
            </div>
          ))}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 p-2 gap-1">
          {days.map(day => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className="aspect-square flex items-center justify-center rounded transition-all font-serif text-sm"
              style={{
                background: selectedDay === day ? '#c9a227' : 'transparent',
                color: selectedDay === day ? '#1a1408' : '#5a4a30',
                border: selectedDay === day ? 'none' : '1px solid transparent',
              }}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Footer - Selected date */}
        <div
          className="p-3 text-center border-t"
          style={{
            borderColor: '#c9a22740',
            background: '#e8d4a8',
          }}
        >
          <span className="font-serif text-sm" style={{ color: '#5a4a30' }}>
            Day {selectedDay} of December
          </span>
          <div className="text-xs mt-1" style={{ color: '#c9a227' }}>
            ✠ Feast Day of Saint Nicholas ✠
          </div>
        </div>
      </div>
    </div>
  );
};

// Export all components
export const medievalComponents = {
  'illuminated-button': IlluminatedButton,
  'quill-input': QuillInput,
  'wax-seal-confirm': WaxSealButton,
  'scroll-accordion': ScrollAccordion,
  'celtic-border': CelticBorder,
  'heraldry-shield': HeraldryShield,
  'tapestry-tabs': TapestryTabs,
  'rune-progress': RuneProgress,
  'hourglass-timer': HourglassTimer,
  'medieval-calendar': MedievalCalendar,
};
