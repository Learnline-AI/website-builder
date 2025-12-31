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

// --- MEDIEVAL QUILL INPUT ---
export const MedievalQuillInput = () => {
  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [quillPos, setQuillPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setQuillPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div className="h-full flex items-center justify-center p-8" style={{ background: '#2d2418' }}>
      <div
        className="relative w-80"
        onMouseMove={handleMouseMove}
        style={{ cursor: 'none' }}
      >
        {/* Custom quill cursor */}
        <div
          className="absolute pointer-events-none z-20 transition-transform duration-75"
          style={{
            left: `${quillPos.x}%`,
            top: `${quillPos.y}%`,
            transform: 'translate(-10%, -90%) rotate(45deg)',
          }}
        >
          <svg width="32" height="32" viewBox="0 0 32 32">
            <path
              d="M4 28 L8 24 L28 4 Q30 2 28 4 L8 24 Z"
              fill="#f4e4bc"
              stroke="#8b7355"
              strokeWidth="1"
            />
            <path d="M4 28 L6 26 L8 28 L6 30 Z" fill="#1a1408" />
            <path d="M28 4 L30 2" stroke="#c9a227" strokeWidth="2" />
          </svg>
        </div>

        {/* Parchment input container */}
        <div
          className="relative rounded-lg overflow-hidden transition-all duration-300"
          style={{
            background: '#f4e4bc',
            border: `2px solid ${isFocused ? '#c9a227' : '#8b7355'}`,
            boxShadow: isFocused
              ? '0 0 20px #c9a22740, inset 0 0 20px rgba(201, 162, 39, 0.1)'
              : '0 4px 15px rgba(0,0,0,0.3)',
          }}
        >
          {/* Decorative header */}
          <div className="px-4 py-2 border-b border-[#c9a22740] flex items-center gap-2">
            <span style={{ color: '#c9a227' }}>&#9998;</span>
            <span className="font-serif text-xs tracking-wider" style={{ color: '#5a4a30' }}>
              QUILL & INK
            </span>
          </div>

          {/* Input field */}
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Inscribe thy message..."
            className="w-full px-4 py-3 bg-transparent outline-none font-serif"
            style={{
              color: '#1a1408',
              cursor: 'none',
            }}
          />

          {/* Ink well indicator */}
          <div className="absolute bottom-2 right-2 flex items-center gap-1">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: text.length > 0 ? '#1a1408' : '#c9a227' }}
            />
            <span className="text-xs font-serif" style={{ color: '#8b7355' }}>
              {text.length > 0 ? 'Ink flows' : 'Ready'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MEDIEVAL WAX BADGE ---
export const MedievalWaxBadge = () => {
  const [variant, setVariant] = useState<'gold' | 'red' | 'green'>('gold');

  const variants = {
    gold: { bg: 'radial-gradient(circle at 30% 30%, #c9a227, #8b6914)', label: 'Approved' },
    red: { bg: 'radial-gradient(circle at 30% 30%, #c41e3a, #8b0000)', label: 'Sealed' },
    green: { bg: 'radial-gradient(circle at 30% 30%, #4a7c4a, #2d5a2d)', label: 'Verified' },
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-8" style={{ background: '#2d2418' }}>
      {/* Wax seal badge */}
      <div className="relative">
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            background: variants[variant].bg,
            boxShadow: '0 4px 15px rgba(0,0,0,0.4), inset 0 -2px 4px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.2)',
          }}
        >
          {/* Embossed design */}
          <div className="absolute inset-3 rounded-full border-2 border-white/20" />
          <div className="absolute inset-5 rounded-full border border-white/10" />

          {/* Center emblem */}
          <span className="text-3xl" style={{ color: 'rgba(255,255,255,0.9)', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
            &#10013;
          </span>
        </div>

        {/* Ribbon tails */}
        <svg className="absolute -bottom-4 left-1/2 -translate-x-1/2" width="80" height="30" viewBox="0 0 80 30">
          <path d="M20 0 L10 15 L20 30 L25 15 Z" fill="#8b0000" />
          <path d="M60 0 L70 15 L60 30 L55 15 Z" fill="#8b0000" />
        </svg>

        {/* Label */}
        <div
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-3 py-1 rounded font-serif text-xs tracking-wider whitespace-nowrap"
          style={{
            background: '#f4e4bc',
            border: '1px solid #c9a227',
            color: '#5a4a30',
          }}
        >
          {variants[variant].label}
        </div>
      </div>

      {/* Variant selector */}
      <div className="flex gap-3 mt-16">
        {(Object.keys(variants) as Array<keyof typeof variants>).map((v) => (
          <button
            key={v}
            onClick={() => setVariant(v)}
            className="w-6 h-6 rounded-full transition-transform"
            style={{
              background: variants[v].bg,
              transform: variant === v ? 'scale(1.2)' : 'scale(1)',
              border: variant === v ? '2px solid #f4e4bc' : '2px solid transparent',
            }}
          />
        ))}
      </div>
    </div>
  );
};

// --- MEDIEVAL SCROLL PROGRESS ---
export const MedievalScrollProgress = () => {
  const [progress, setProgress] = useState(35);

  return (
    <div className="h-full flex flex-col items-center justify-center p-8" style={{ background: '#1a1408' }}>
      {/* Scroll container */}
      <div className="relative w-64">
        {/* Top roll */}
        <div
          className="relative h-6 rounded-full z-10"
          style={{
            background: 'linear-gradient(180deg, #8b6914 0%, #5a4a30 50%, #8b6914 100%)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
          }}
        >
          <div className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#c9a227]" />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#c9a227]" />
        </div>

        {/* Unrolled parchment area */}
        <div
          className="relative -mt-1 overflow-hidden transition-all duration-500"
          style={{
            height: `${Math.max(20, progress * 1.5)}px`,
            background: 'linear-gradient(90deg, #e8d4a8 0%, #f4e4bc 10%, #f4e4bc 90%, #e8d4a8 100%)',
            borderLeft: '2px solid #8b6914',
            borderRight: '2px solid #8b6914',
          }}
        >
          {/* Text lines revealing */}
          <div className="p-3 space-y-1">
            {[...Array(Math.floor(progress / 20))].map((_, i) => (
              <div
                key={i}
                className="h-1 rounded"
                style={{
                  background: '#5a4a3050',
                  width: `${70 + Math.random() * 20}%`,
                }}
              />
            ))}
          </div>

          {/* Progress percentage */}
          <div className="absolute bottom-1 right-2 font-serif text-xs" style={{ color: '#8b7355' }}>
            {progress}%
          </div>
        </div>

        {/* Bottom roll */}
        <div
          className="relative h-6 rounded-full -mt-1"
          style={{
            background: 'linear-gradient(180deg, #5a4a30 0%, #8b6914 50%, #5a4a30 100%)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
          }}
        >
          <div className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#c9a227]" />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#c9a227]" />
        </div>
      </div>

      {/* Slider control */}
      <div className="mt-6 w-64">
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={(e) => setProgress(Number(e.target.value))}
          className="w-full"
          style={{
            accentColor: '#c9a227',
          }}
        />
        <div className="flex justify-between font-serif text-xs mt-1" style={{ color: '#8b7355' }}>
          <span>Rolled</span>
          <span>Unrolled</span>
        </div>
      </div>
    </div>
  );
};

// --- MEDIEVAL MONK AVATAR ---
export const MedievalMonkAvatar = () => {
  const [isBlessed, setIsBlessed] = useState(false);

  return (
    <div className="h-full flex flex-col items-center justify-center p-8" style={{ background: '#2d2418' }}>
      {/* Monk hood frame */}
      <div
        className="relative cursor-pointer"
        onClick={() => setIsBlessed(!isBlessed)}
      >
        {/* Hood shape */}
        <svg viewBox="0 0 120 140" className="w-32 h-40">
          <defs>
            <linearGradient id="hoodGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#5a4a30" />
              <stop offset="50%" stopColor="#3d3020" />
              <stop offset="100%" stopColor="#2d2418" />
            </linearGradient>
            <clipPath id="faceClip">
              <ellipse cx="60" cy="75" rx="35" ry="40" />
            </clipPath>
          </defs>

          {/* Hood outer */}
          <path
            d="M60 5 Q10 30 15 90 Q20 130 60 135 Q100 130 105 90 Q110 30 60 5"
            fill="url(#hoodGrad)"
            stroke="#1a1408"
            strokeWidth="2"
          />

          {/* Face opening */}
          <ellipse cx="60" cy="75" rx="35" ry="40" fill="#f4e4bc" />

          {/* Avatar placeholder face */}
          <g clipPath="url(#faceClip)">
            <circle cx="60" cy="70" r="25" fill="#e8d4a8" />
            <circle cx="50" cy="65" r="3" fill="#3d3020" />
            <circle cx="70" cy="65" r="3" fill="#3d3020" />
            <path d="M55 80 Q60 85 65 80" stroke="#3d3020" strokeWidth="2" fill="none" />
          </g>

          {/* Hood trim */}
          <path
            d="M25 85 Q60 120 95 85"
            fill="none"
            stroke="#c9a227"
            strokeWidth="2"
          />

          {/* Blessing glow */}
          {isBlessed && (
            <circle
              cx="60"
              cy="20"
              r="15"
              fill="#c9a227"
              opacity="0.6"
              style={{ animation: 'pulse 1.5s ease-in-out infinite' }}
            />
          )}
        </svg>

        {/* Halo when blessed */}
        {isBlessed && (
          <div
            className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-4 rounded-full"
            style={{
              background: 'linear-gradient(90deg, transparent, #c9a227, transparent)',
              boxShadow: '0 0 20px #c9a227',
            }}
          />
        )}
      </div>

      {/* Name plate */}
      <div
        className="mt-4 px-4 py-2 rounded font-serif text-sm tracking-wider"
        style={{
          background: '#f4e4bc',
          border: '1px solid #c9a227',
          color: '#3d3020',
        }}
      >
        Brother Aldric
      </div>

      <span className="mt-2 font-serif text-xs" style={{ color: '#8b7355' }}>
        {isBlessed ? '&#10013; Blessed &#10013;' : 'Click to bless'}
      </span>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
};

// --- MEDIEVAL CHAPTER NAV ---
export const MedievalChapterNav = () => {
  const [activeChapter, setActiveChapter] = useState(0);

  const chapters = [
    { numeral: 'I', title: 'Genesis' },
    { numeral: 'II', title: 'The Quest' },
    { numeral: 'III', title: 'Tribulation' },
    { numeral: 'IV', title: 'Victory' },
    { numeral: 'V', title: 'Epilogue' },
  ];

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#1a1408' }}>
      {/* Book spine navigation */}
      <div
        className="relative rounded-lg overflow-hidden"
        style={{
          background: '#3d3020',
          border: '3px solid #8b6914',
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
        }}
      >
        {/* Gold leaf top decoration */}
        <div className="h-2" style={{ background: 'linear-gradient(90deg, #8b6914, #c9a227, #8b6914)' }} />

        {/* Chapter tabs */}
        <div className="py-2">
          {chapters.map((chapter, i) => (
            <button
              key={i}
              onClick={() => setActiveChapter(i)}
              className="w-full px-6 py-3 flex items-center gap-4 transition-all duration-300 relative"
              style={{
                background: activeChapter === i ? '#c9a22720' : 'transparent',
              }}
            >
              {/* Chapter numeral */}
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center font-serif text-sm transition-all"
                style={{
                  background: activeChapter === i ? '#c9a227' : 'transparent',
                  border: `2px solid ${activeChapter === i ? '#c9a227' : '#8b7355'}`,
                  color: activeChapter === i ? '#1a1408' : '#8b7355',
                }}
              >
                {chapter.numeral}
              </span>

              {/* Chapter title */}
              <span
                className="font-serif text-sm tracking-wider transition-colors"
                style={{ color: activeChapter === i ? '#f4e4bc' : '#8b7355' }}
              >
                {chapter.title}
              </span>

              {/* Active indicator - bookmark ribbon */}
              {activeChapter === i && (
                <div
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-8"
                  style={{
                    background: '#8b0000',
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)',
                  }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Gold leaf bottom decoration */}
        <div className="h-2" style={{ background: 'linear-gradient(90deg, #8b6914, #c9a227, #8b6914)' }} />
      </div>
    </div>
  );
};

// --- MEDIEVAL HERALD ALERT ---
export const MedievalHeraldAlert = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [alertType, setAlertType] = useState<'royal' | 'warning' | 'success'>('royal');

  const alertStyles = {
    royal: { bg: '#1e3a5f', border: '#c9a227', icon: '&#128081;' },
    warning: { bg: '#8b0000', border: '#c9a227', icon: '&#9888;' },
    success: { bg: '#2d5a2d', border: '#c9a227', icon: '&#10003;' },
  };

  if (!isVisible) {
    return (
      <div className="h-full flex items-center justify-center p-8" style={{ background: '#2d2418' }}>
        <button
          onClick={() => setIsVisible(true)}
          className="px-4 py-2 font-serif text-sm rounded"
          style={{ background: '#c9a22720', border: '1px solid #c9a227', color: '#c9a227' }}
        >
          Summon Herald
        </button>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col items-center justify-center p-6" style={{ background: '#2d2418' }}>
      {/* Herald alert banner */}
      <div
        className="relative w-full max-w-sm overflow-hidden rounded"
        style={{
          background: alertStyles[alertType].bg,
          border: `3px solid ${alertStyles[alertType].border}`,
          boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
        }}
      >
        {/* Decorative top banner */}
        <div
          className="h-8 flex items-center justify-center gap-2"
          style={{ background: '#c9a227' }}
        >
          <span style={{ color: '#1a1408' }}>&#9733;</span>
          <span className="font-serif text-xs tracking-widest" style={{ color: '#1a1408' }}>
            ROYAL PROCLAMATION
          </span>
          <span style={{ color: '#1a1408' }}>&#9733;</span>
        </div>

        {/* Alert content */}
        <div className="p-4 flex items-start gap-3">
          <span
            className="text-2xl"
            dangerouslySetInnerHTML={{ __html: alertStyles[alertType].icon }}
          />
          <div className="flex-1">
            <h4 className="font-serif text-sm tracking-wider mb-1" style={{ color: '#f4e4bc' }}>
              Hear Ye, Hear Ye!
            </h4>
            <p className="font-serif text-xs leading-relaxed" style={{ color: '#f4e4bc99' }}>
              The King hath decreed that all citizens shall celebrate the harvest festival.
            </p>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="text-lg hover:opacity-70 transition-opacity"
            style={{ color: '#f4e4bc' }}
          >
            &#10005;
          </button>
        </div>

        {/* Trumpet decorations */}
        <div className="absolute -left-2 top-12 transform -rotate-45">
          <span style={{ color: '#c9a227', fontSize: '1.5rem' }}>&#127930;</span>
        </div>
        <div className="absolute -right-2 top-12 transform rotate-45 scale-x-[-1]">
          <span style={{ color: '#c9a227', fontSize: '1.5rem' }}>&#127930;</span>
        </div>
      </div>

      {/* Alert type selector */}
      <div className="flex gap-2 mt-4">
        {(Object.keys(alertStyles) as Array<keyof typeof alertStyles>).map((type) => (
          <button
            key={type}
            onClick={() => setAlertType(type)}
            className="px-3 py-1 font-serif text-xs rounded capitalize"
            style={{
              background: alertType === type ? alertStyles[type].bg : 'transparent',
              border: `1px solid ${alertStyles[type].border}`,
              color: '#c9a227',
            }}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};

// --- MEDIEVAL BORDER DIVIDER ---
export const MedievalBorderDivider = () => {
  const [style, setStyle] = useState<'simple' | 'ornate' | 'celtic'>('ornate');

  return (
    <div className="h-full flex flex-col items-center justify-center p-8" style={{ background: '#f4e4bc' }}>
      {/* Divider display */}
      <div className="w-full max-w-md">
        {style === 'simple' && (
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, #c9a227, transparent)' }} />
            <span style={{ color: '#c9a227' }}>&#10022;</span>
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, #c9a227, transparent)' }} />
          </div>
        )}

        {style === 'ornate' && (
          <svg viewBox="0 0 400 40" className="w-full h-10">
            <defs>
              <linearGradient id="dividerGold" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="20%" stopColor="#c9a227" />
                <stop offset="50%" stopColor="#ffd700" />
                <stop offset="80%" stopColor="#c9a227" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <line x1="0" y1="20" x2="400" y2="20" stroke="url(#dividerGold)" strokeWidth="2" />
            <circle cx="200" cy="20" r="8" fill="#c9a227" />
            <circle cx="200" cy="20" r="5" fill="#f4e4bc" />
            <circle cx="200" cy="20" r="3" fill="#c9a227" />
            {/* Flourishes */}
            <path d="M170 20 Q160 10 150 20 Q160 30 170 20" fill="none" stroke="#c9a227" strokeWidth="1.5" />
            <path d="M230 20 Q240 10 250 20 Q240 30 230 20" fill="none" stroke="#c9a227" strokeWidth="1.5" />
            <path d="M130 20 Q125 15 120 20" fill="none" stroke="#c9a227" strokeWidth="1" />
            <path d="M270 20 Q275 15 280 20" fill="none" stroke="#c9a227" strokeWidth="1" />
          </svg>
        )}

        {style === 'celtic' && (
          <svg viewBox="0 0 400 50" className="w-full h-12">
            <defs>
              <linearGradient id="celticGold" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="15%" stopColor="#c9a227" />
                <stop offset="85%" stopColor="#c9a227" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
            {/* Interlaced pattern */}
            <path
              d="M50 25 Q75 10 100 25 Q125 40 150 25 Q175 10 200 25 Q225 40 250 25 Q275 10 300 25 Q325 40 350 25"
              fill="none"
              stroke="url(#celticGold)"
              strokeWidth="3"
            />
            <path
              d="M50 25 Q75 40 100 25 Q125 10 150 25 Q175 40 200 25 Q225 10 250 25 Q275 40 300 25 Q325 10 350 25"
              fill="none"
              stroke="#8b6914"
              strokeWidth="2"
            />
            {/* Center knot */}
            <circle cx="200" cy="25" r="10" fill="none" stroke="#c9a227" strokeWidth="2" />
            <circle cx="200" cy="25" r="5" fill="#c9a227" />
          </svg>
        )}
      </div>

      {/* Sample text */}
      <div className="mt-4 text-center">
        <p className="font-serif text-sm" style={{ color: '#5a4a30' }}>
          Thus ends the first chapter
        </p>
      </div>

      {/* Style selector */}
      <div className="flex gap-2 mt-6">
        {(['simple', 'ornate', 'celtic'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setStyle(s)}
            className="px-3 py-1 font-serif text-xs rounded capitalize"
            style={{
              background: style === s ? '#c9a227' : 'transparent',
              border: '1px solid #c9a227',
              color: style === s ? '#1a1408' : '#c9a227',
            }}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
};

// --- MEDIEVAL CANDLE SLIDER ---
export const MedievalCandleSlider = () => {
  const [value, setValue] = useState(75);
  const candleHeight = (value / 100) * 80;

  return (
    <div className="h-full flex flex-col items-center justify-center p-8" style={{ background: '#1a1408' }}>
      {/* Candle visualization */}
      <div className="relative w-16 h-40 flex flex-col items-center justify-end">
        {/* Flame */}
        {value > 0 && (
          <div
            className="absolute z-10"
            style={{
              bottom: `${candleHeight + 30}px`,
              animation: 'flicker 0.3s ease-in-out infinite alternate',
            }}
          >
            <div
              className="w-4 h-8 rounded-full"
              style={{
                background: 'radial-gradient(ellipse at center bottom, #ffd700 0%, #ff8c00 40%, #ff4500 70%, transparent 100%)',
                filter: 'blur(1px)',
              }}
            />
            {/* Glow */}
            <div
              className="absolute inset-0 -m-4 rounded-full"
              style={{
                background: 'radial-gradient(circle, #ffd70040 0%, transparent 70%)',
              }}
            />
          </div>
        )}

        {/* Wick */}
        <div
          className="absolute w-0.5 bg-[#1a1408] z-10"
          style={{
            height: '8px',
            bottom: `${candleHeight + 22}px`,
          }}
        />

        {/* Candle body */}
        <div
          className="w-10 rounded-t transition-all duration-300"
          style={{
            height: `${candleHeight}px`,
            background: 'linear-gradient(90deg, #e8d4a8 0%, #f4e4bc 30%, #f4e4bc 70%, #e8d4a8 100%)',
            boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1)',
          }}
        >
          {/* Wax drips */}
          <div
            className="absolute -left-1 top-4 w-3 h-6 rounded-b-full"
            style={{ background: '#f4e4bc' }}
          />
          <div
            className="absolute -right-1 top-8 w-2 h-4 rounded-b-full"
            style={{ background: '#f4e4bc' }}
          />
        </div>

        {/* Candle holder */}
        <div
          className="w-14 h-4 rounded-t"
          style={{ background: 'linear-gradient(180deg, #c9a227, #8b6914)' }}
        />
        <div
          className="w-20 h-3 rounded"
          style={{
            background: 'linear-gradient(180deg, #8b6914, #5a4a30)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
          }}
        />
      </div>

      {/* Slider */}
      <div className="mt-6 w-48">
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="w-full"
          style={{ accentColor: '#c9a227' }}
        />
        <div className="flex justify-between font-serif text-xs mt-2" style={{ color: '#8b7355' }}>
          <span>Spent</span>
          <span>{value}%</span>
          <span>Full</span>
        </div>
      </div>

      <style>{`
        @keyframes flicker {
          0% { transform: scale(1) translateY(0); opacity: 1; }
          100% { transform: scale(1.05) translateY(-2px); opacity: 0.9; }
        }
      `}</style>
    </div>
  );
};

// --- MEDIEVAL TOME CARD ---
export const MedievalTomeCard = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-8" style={{ background: '#2d2418' }}>
      <div
        className="relative cursor-pointer perspective-1000"
        onClick={() => setIsOpen(!isOpen)}
        style={{ perspective: '1000px' }}
      >
        {/* Book cover */}
        <div
          className="relative w-48 h-64 transition-transform duration-500"
          style={{
            transformStyle: 'preserve-3d',
            transform: isOpen ? 'rotateY(-30deg)' : 'rotateY(0deg)',
          }}
        >
          {/* Front cover */}
          <div
            className="absolute inset-0 rounded-r-lg rounded-l overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #5a3825 0%, #3d2518 50%, #2d1a10 100%)',
              border: '3px solid #8b6914',
              boxShadow: '0 4px 20px rgba(0,0,0,0.5), inset 0 0 20px rgba(0,0,0,0.3)',
              backfaceVisibility: 'hidden',
            }}
          >
            {/* Leather texture overlay */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Gold corner decorations */}
            {[{ top: 8, left: 8 }, { top: 8, right: 8 }, { bottom: 8, left: 8 }, { bottom: 8, right: 8 }].map((pos, i) => (
              <div
                key={i}
                className="absolute w-8 h-8"
                style={{
                  ...pos,
                  borderTop: pos.top !== undefined ? '3px solid #c9a227' : undefined,
                  borderBottom: pos.bottom !== undefined ? '3px solid #c9a227' : undefined,
                  borderLeft: pos.left !== undefined ? '3px solid #c9a227' : undefined,
                  borderRight: pos.right !== undefined ? '3px solid #c9a227' : undefined,
                }}
              />
            ))}

            {/* Center emblem */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  background: 'radial-gradient(circle, #c9a227 0%, #8b6914 100%)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
                }}
              >
                <span className="text-2xl" style={{ color: '#2d1a10' }}>&#10013;</span>
              </div>
              <h3 className="mt-4 font-serif text-sm tracking-widest" style={{ color: '#c9a227' }}>
                CODEX
              </h3>
              <p className="font-serif text-xs" style={{ color: '#8b7355' }}>
                Arcanum
              </p>
            </div>

            {/* Spine */}
            <div
              className="absolute left-0 top-0 bottom-0 w-4"
              style={{
                background: 'linear-gradient(90deg, #1a1408 0%, #3d2518 100%)',
                borderRight: '1px solid #8b6914',
              }}
            />
          </div>

          {/* Pages edge */}
          <div
            className="absolute right-1 top-2 bottom-2 w-2"
            style={{
              background: 'linear-gradient(90deg, #e8d4a8, #f4e4bc)',
              borderRadius: '0 2px 2px 0',
            }}
          />
        </div>

        {/* Status */}
        <div className="mt-4 text-center">
          <span className="font-serif text-xs" style={{ color: '#8b7355' }}>
            {isOpen ? 'Click to close' : 'Click to open'}
          </span>
        </div>
      </div>
    </div>
  );
};

// --- MEDIEVAL CROSS ICON ---
export const MedievalCrossIcon = () => {
  const [variant, setVariant] = useState<'latin' | 'celtic' | 'maltese'>('celtic');

  return (
    <div className="h-full flex flex-col items-center justify-center p-8" style={{ background: '#2d2418' }}>
      {/* Cross display */}
      <div className="w-24 h-32 flex items-center justify-center">
        {variant === 'latin' && (
          <svg viewBox="0 0 60 80" className="w-full h-full">
            <defs>
              <linearGradient id="crossGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#c9a227" />
                <stop offset="50%" stopColor="#ffd700" />
                <stop offset="100%" stopColor="#c9a227" />
              </linearGradient>
            </defs>
            <rect x="25" y="5" width="10" height="70" fill="url(#crossGold)" />
            <rect x="10" y="20" width="40" height="10" fill="url(#crossGold)" />
            <circle cx="30" cy="25" r="8" fill="#8b0000" stroke="#c9a227" strokeWidth="2" />
          </svg>
        )}

        {variant === 'celtic' && (
          <svg viewBox="0 0 60 80" className="w-full h-full">
            <defs>
              <linearGradient id="celticCross" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#c9a227" />
                <stop offset="50%" stopColor="#ffd700" />
                <stop offset="100%" stopColor="#c9a227" />
              </linearGradient>
            </defs>
            {/* Cross body */}
            <rect x="25" y="5" width="10" height="70" rx="2" fill="url(#celticCross)" />
            <rect x="10" y="20" width="40" height="10" rx="2" fill="url(#celticCross)" />
            {/* Circle ring */}
            <circle cx="30" cy="25" r="18" fill="none" stroke="url(#celticCross)" strokeWidth="4" />
            {/* Center jewel */}
            <circle cx="30" cy="25" r="6" fill="#8b0000" />
            <circle cx="30" cy="25" r="3" fill="#c41e3a" />
            {/* Knot decorations */}
            <circle cx="30" cy="10" r="3" fill="url(#celticCross)" />
            <circle cx="30" cy="40" r="3" fill="url(#celticCross)" />
            <circle cx="15" cy="25" r="3" fill="url(#celticCross)" />
            <circle cx="45" cy="25" r="3" fill="url(#celticCross)" />
          </svg>
        )}

        {variant === 'maltese' && (
          <svg viewBox="0 0 60 60" className="w-full h-full">
            <defs>
              <linearGradient id="malteseGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#c9a227" />
                <stop offset="50%" stopColor="#ffd700" />
                <stop offset="100%" stopColor="#c9a227" />
              </linearGradient>
            </defs>
            <path
              d="M30 5 L35 15 L45 15 L55 5 L45 15 L45 25 L55 30 L45 35 L45 45 L55 55 L45 45 L35 45 L30 55 L25 45 L15 45 L5 55 L15 45 L15 35 L5 30 L15 25 L15 15 L5 5 L15 15 L25 15 Z"
              fill="url(#malteseGold)"
              stroke="#8b6914"
              strokeWidth="1"
            />
            <circle cx="30" cy="30" r="8" fill="#8b0000" />
            <circle cx="30" cy="30" r="5" fill="#c41e3a" />
          </svg>
        )}
      </div>

      {/* Variant selector */}
      <div className="flex gap-2 mt-6">
        {(['latin', 'celtic', 'maltese'] as const).map((v) => (
          <button
            key={v}
            onClick={() => setVariant(v)}
            className="px-3 py-1 font-serif text-xs rounded capitalize"
            style={{
              background: variant === v ? '#c9a227' : 'transparent',
              border: '1px solid #c9a227',
              color: variant === v ? '#1a1408' : '#c9a227',
            }}
          >
            {v}
          </button>
        ))}
      </div>
    </div>
  );
};

// --- MEDIEVAL GOTHIC HEADING ---
export const MedievalGothicHeading = () => {
  const [text, setText] = useState('Kingdom');

  return (
    <div className="h-full flex flex-col items-center justify-center p-8" style={{ background: '#f4e4bc' }}>
      {/* Gothic heading display */}
      <div className="text-center mb-8">
        {/* Decorative top flourish */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <span style={{ color: '#c9a227' }}>&#10048;</span>
          <div className="w-20 h-px" style={{ background: 'linear-gradient(90deg, transparent, #c9a227)' }} />
          <span style={{ color: '#8b0000', fontSize: '1.5rem' }}>&#9830;</span>
          <div className="w-20 h-px" style={{ background: 'linear-gradient(90deg, #c9a227, transparent)' }} />
          <span style={{ color: '#c9a227' }}>&#10048;</span>
        </div>

        {/* Main heading - Gothic blackletter style */}
        <h1
          className="text-5xl tracking-wider"
          style={{
            color: '#2d2418',
            fontFamily: 'serif',
            textShadow: '2px 2px 0 #c9a22760, -1px -1px 0 #f4e4bc',
            fontWeight: 900,
            letterSpacing: '0.1em',
          }}
        >
          {text.split('').map((char, i) => (
            <span
              key={i}
              className="inline-block"
              style={{
                color: i === 0 ? '#8b0000' : '#2d2418',
                fontSize: i === 0 ? '4rem' : undefined,
                verticalAlign: i === 0 ? 'middle' : undefined,
              }}
            >
              {char}
            </span>
          ))}
        </h1>

        {/* Decorative bottom flourish */}
        <div className="flex items-center justify-center gap-2 mt-4">
          <div className="w-16 h-0.5" style={{ background: 'linear-gradient(90deg, transparent, #8b6914)' }} />
          <span style={{ color: '#c9a227' }}>&#10022;</span>
          <div className="w-16 h-0.5" style={{ background: 'linear-gradient(90deg, #8b6914, transparent)' }} />
        </div>
      </div>

      {/* Text input */}
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text..."
        className="px-4 py-2 rounded outline-none font-serif text-center"
        style={{
          background: '#fff',
          border: '2px solid #c9a227',
          color: '#2d2418',
          width: '200px',
        }}
      />
    </div>
  );
};

// --- MEDIEVAL PARCHMENT BACKGROUND ---
export const MedievalParchmentBackground = () => {
  const [variant, setVariant] = useState<'aged' | 'burnt' | 'pristine'>('aged');

  const variants = {
    aged: {
      bg: 'linear-gradient(180deg, #e8d4a8 0%, #f4e4bc 30%, #e8d4a8 70%, #d4c498 100%)',
      overlay: 'rgba(139, 115, 85, 0.1)',
    },
    burnt: {
      bg: 'linear-gradient(180deg, #8b7355 0%, #a08060 20%, #f4e4bc 50%, #a08060 80%, #5a4a30 100%)',
      overlay: 'rgba(45, 36, 24, 0.2)',
    },
    pristine: {
      bg: 'linear-gradient(180deg, #f8f0e0 0%, #fffef8 50%, #f8f0e0 100%)',
      overlay: 'rgba(201, 162, 39, 0.05)',
    },
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-4" style={{ background: '#2d2418' }}>
      {/* Parchment display */}
      <div
        className="relative w-64 h-48 rounded overflow-hidden"
        style={{
          background: variants[variant].bg,
          boxShadow: '0 4px 20px rgba(0,0,0,0.4), inset 0 0 30px rgba(0,0,0,0.1)',
        }}
      >
        {/* Texture overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)' opacity='0.15'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Color overlay */}
        <div className="absolute inset-0" style={{ background: variants[variant].overlay }} />

        {/* Burnt edges for burnt variant */}
        {variant === 'burnt' && (
          <>
            <div className="absolute top-0 left-0 w-8 h-8" style={{ background: 'radial-gradient(circle at 0 0, #2d2418 0%, transparent 70%)' }} />
            <div className="absolute top-0 right-0 w-12 h-10" style={{ background: 'radial-gradient(circle at 100% 0, #2d2418 0%, transparent 70%)' }} />
            <div className="absolute bottom-0 right-0 w-6 h-6" style={{ background: 'radial-gradient(circle at 100% 100%, #2d2418 0%, transparent 70%)' }} />
          </>
        )}

        {/* Sample content */}
        <div className="relative p-6 h-full flex flex-col justify-center">
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-1.5 rounded"
                style={{
                  background: '#5a4a3040',
                  width: `${85 - i * 10}%`,
                }}
              />
            ))}
          </div>
          <div className="absolute bottom-4 right-4">
            <span className="font-serif text-xs" style={{ color: '#8b7355' }}>&#9998;</span>
          </div>
        </div>
      </div>

      {/* Variant selector */}
      <div className="flex gap-2 mt-4">
        {(Object.keys(variants) as Array<keyof typeof variants>).map((v) => (
          <button
            key={v}
            onClick={() => setVariant(v)}
            className="px-3 py-1 font-serif text-xs rounded capitalize"
            style={{
              background: variant === v ? '#c9a227' : 'transparent',
              border: '1px solid #c9a227',
              color: variant === v ? '#1a1408' : '#c9a227',
            }}
          >
            {v}
          </button>
        ))}
      </div>
    </div>
  );
};

// Export all components
export const medievalComponents: Record<string, React.FC> = {
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
  'medieval-quill-input': MedievalQuillInput,
  'medieval-wax-badge': MedievalWaxBadge,
  'medieval-scroll-progress': MedievalScrollProgress,
  'medieval-monk-avatar': MedievalMonkAvatar,
  'medieval-chapter-nav': MedievalChapterNav,
  'medieval-herald-alert': MedievalHeraldAlert,
  'medieval-border-divider': MedievalBorderDivider,
  'medieval-candle-slider': MedievalCandleSlider,
  'medieval-tome-card': MedievalTomeCard,
  'medieval-cross-icon': MedievalCrossIcon,
  'medieval-gothic-heading': MedievalGothicHeading,
  'medieval-parchment-background': MedievalParchmentBackground,
};
