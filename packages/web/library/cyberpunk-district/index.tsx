import React, { useState, useEffect, useRef } from 'react';

// --- GLITCH BUTTON ---
export const GlitchButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [glitchOffset, setGlitchOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!isHovered) {
      setGlitchOffset({ x: 0, y: 0 });
      return;
    }
    const interval = setInterval(() => {
      setGlitchOffset({
        x: (Math.random() - 0.5) * 4,
        y: (Math.random() - 0.5) * 2,
      });
    }, 50);
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div className="h-full flex items-center justify-center p-8" style={{ background: 'linear-gradient(180deg, #0d0d1a 0%, #1a0a2e 50%, #0a0a14 100%)' }}>
      <button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { setIsHovered(false); setIsPressed(false); }}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        className="relative px-8 py-4 font-mono font-bold text-lg tracking-wider overflow-hidden"
        style={{
          background: isPressed ? '#ff00ff20' : 'transparent',
          border: '2px solid #ff00ff',
          color: '#ff00ff',
          clipPath: 'polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)',
          boxShadow: isHovered
            ? '0 0 30px #ff00ff60, inset 0 0 20px #ff00ff20'
            : '0 0 10px #ff00ff30',
          transform: isPressed ? 'scale(0.98)' : 'scale(1)',
        }}
      >
        {/* Chromatic aberration layers */}
        <span
          className="absolute inset-0 flex items-center justify-center opacity-70 mix-blend-screen"
          style={{
            color: '#00ffff',
            transform: `translate(${glitchOffset.x}px, ${glitchOffset.y}px)`,
            clipPath: isHovered ? 'inset(30% 0 40% 0)' : 'none',
          }}
        >
          EXECUTE
        </span>
        <span
          className="absolute inset-0 flex items-center justify-center opacity-70 mix-blend-screen"
          style={{
            color: '#ff0066',
            transform: `translate(${-glitchOffset.x}px, ${-glitchOffset.y}px)`,
            clipPath: isHovered ? 'inset(60% 0 10% 0)' : 'none',
          }}
        >
          EXECUTE
        </span>

        {/* Main text */}
        <span className="relative z-10">EXECUTE</span>

        {/* Scanline effect */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
            }}
          />
        )}

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-[#00ffff]" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-[#00ffff]" />
      </button>
    </div>
  );
};

// --- HOLOGRAPHIC CARD ---
export const HolographicCard = () => {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  const rotateX = (mousePos.y - 0.5) * 20;
  const rotateY = (mousePos.x - 0.5) * -20;
  const gradientPos = `${mousePos.x * 100}% ${mousePos.y * 100}%`;

  return (
    <div
      className="h-full flex items-center justify-center p-8"
      style={{ background: '#0d0d1a', perspective: '1000px' }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMousePos({ x: 0.5, y: 0.5 })}
        className="relative w-64 h-80 rounded-xl overflow-hidden cursor-pointer transition-transform duration-200"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Base layer */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #1a0a2e 0%, #0d0d1a 100%)',
            border: '1px solid #ff00ff40',
          }}
        />

        {/* Holographic shimmer */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background: `
              radial-gradient(circle at ${gradientPos}, #ff00ff40 0%, transparent 50%),
              linear-gradient(135deg,
                #ff00ff20 0%,
                #00ffff20 25%,
                #ff006620 50%,
                #00ff0020 75%,
                #ff00ff20 100%
              )
            `,
            backgroundSize: '100% 100%, 200% 200%',
            animation: 'holoShimmer 3s linear infinite',
          }}
        />

        {/* Scanlines */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.2) 2px, rgba(0,0,0,0.2) 4px)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 h-full p-6 flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: '#ff00ff20', border: '1px solid #ff00ff40' }}>
              <span className="text-2xl">🔮</span>
            </div>
            <div>
              <h3 className="font-bold text-white">NEURAL_LINK</h3>
              <p className="text-xs text-[#ff00ff]">v2.077</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex-1 space-y-3">
            {[
              { label: 'SYNC', value: 98, color: '#00ffff' },
              { label: 'POWER', value: 75, color: '#ff00ff' },
              { label: 'SIGNAL', value: 100, color: '#00ff00' },
            ].map(stat => (
              <div key={stat.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span style={{ color: stat.color }}>{stat.label}</span>
                  <span className="text-white font-mono">{stat.value}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-black/50 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${stat.value}%`,
                      background: stat.color,
                      boxShadow: `0 0 10px ${stat.color}`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-4 pt-4 border-t border-[#ff00ff30]">
            <div className="flex justify-between text-xs">
              <span className="text-[#e0b0ff]">STATUS</span>
              <span className="text-[#00ff00] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00ff00] animate-pulse" />
                ONLINE
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes holoShimmer {
          0% { background-position: 0% 0%, 0% 0%; }
          100% { background-position: 0% 0%, 200% 200%; }
        }
      `}</style>
    </div>
  );
};

// --- NEURAL LOADER ---
export const NeuralLoader = () => {
  const [progress, setProgress] = useState(0);
  const [activeNodes, setActiveNodes] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => p >= 100 ? 0 : p + 2);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const newActive = [...Array(3)].map(() => Math.floor(Math.random() * 12));
      setActiveNodes(newActive);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  const nodes = [...Array(12)].map((_, i) => ({
    x: 50 + 35 * Math.cos((i * Math.PI * 2) / 12),
    y: 50 + 35 * Math.sin((i * Math.PI * 2) / 12),
  }));

  return (
    <div className="h-full flex flex-col items-center justify-center p-8" style={{ background: '#0d0d1a' }}>
      {/* Neural network visualization */}
      <div className="relative w-64 h-64">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Connections */}
          {nodes.map((node, i) =>
            nodes.slice(i + 1).map((target, j) => {
              const isActive = activeNodes.includes(i) || activeNodes.includes(i + j + 1);
              return (
                <line
                  key={`${i}-${j}`}
                  x1={node.x}
                  y1={node.y}
                  x2={target.x}
                  y2={target.y}
                  stroke={isActive ? '#ff00ff' : '#ff00ff20'}
                  strokeWidth={isActive ? 1.5 : 0.5}
                  style={{
                    filter: isActive ? 'drop-shadow(0 0 3px #ff00ff)' : 'none',
                    transition: 'all 0.2s',
                  }}
                />
              );
            })
          )}

          {/* Center node */}
          <circle
            cx="50"
            cy="50"
            r="8"
            fill="#1a0a2e"
            stroke="#ff00ff"
            strokeWidth="2"
            style={{ filter: 'drop-shadow(0 0 10px #ff00ff)' }}
          />

          {/* Outer nodes */}
          {nodes.map((node, i) => (
            <circle
              key={i}
              cx={node.x}
              cy={node.y}
              r={activeNodes.includes(i) ? 5 : 3}
              fill={activeNodes.includes(i) ? '#ff00ff' : '#ff00ff40'}
              style={{
                filter: activeNodes.includes(i) ? 'drop-shadow(0 0 5px #ff00ff)' : 'none',
                transition: 'all 0.2s',
              }}
            />
          ))}

          {/* Progress ring */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#ff00ff20"
            strokeWidth="2"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#ff00ff"
            strokeWidth="2"
            strokeDasharray={`${progress * 2.83} 283`}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
            style={{ filter: 'drop-shadow(0 0 5px #ff00ff)' }}
          />
        </svg>

        {/* Center percentage */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-2xl font-bold text-[#ff00ff]" style={{ textShadow: '0 0 10px #ff00ff' }}>
            {progress}%
          </span>
        </div>
      </div>

      {/* Status text */}
      <div className="mt-6 text-center">
        <div className="font-mono text-sm text-[#ff00ff]">NEURAL SYNC IN PROGRESS</div>
        <div className="font-mono text-xs text-[#ff00ff60] mt-1">NODES ACTIVE: {activeNodes.length}/12</div>
      </div>
    </div>
  );
};

// --- DATA RAIN ---
export const DataRain = () => {
  const [columns, setColumns] = useState<{ chars: string[]; speed: number; x: number }[]>([]);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789'.split('');
    const newColumns = [...Array(20)].map((_, i) => ({
      chars: [...Array(15)].map(() => chars[Math.floor(Math.random() * chars.length)]),
      speed: 0.5 + Math.random() * 1.5,
      x: i * 5,
    }));
    setColumns(newColumns);

    const interval = setInterval(() => {
      setColumns(cols =>
        cols.map(col => ({
          ...col,
          chars: col.chars.map((_, j) =>
            j === 0 || Math.random() > 0.9
              ? chars[Math.floor(Math.random() * chars.length)]
              : col.chars[j]
          ),
        }))
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full relative overflow-hidden" style={{ background: '#0a0a14' }}>
      {/* Data rain columns */}
      <div ref={canvasRef} className="absolute inset-0">
        {columns.map((col, i) => (
          <div
            key={i}
            className="absolute font-mono text-sm leading-tight"
            style={{
              left: `${col.x}%`,
              animation: `dataFall ${8 / col.speed}s linear infinite`,
              animationDelay: `${-Math.random() * 8}s`,
            }}
          >
            {col.chars.map((char, j) => (
              <div
                key={j}
                style={{
                  color: j === 0 ? '#ffffff' : `rgba(255, 0, 255, ${1 - j * 0.07})`,
                  textShadow: j === 0 ? '0 0 10px #ff00ff, 0 0 20px #ff00ff' : `0 0 ${10 - j}px #ff00ff`,
                }}
              >
                {char}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Overlay content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="px-8 py-6 rounded-lg backdrop-blur-sm"
          style={{
            background: 'rgba(13, 13, 26, 0.8)',
            border: '1px solid #ff00ff40',
            boxShadow: '0 0 30px rgba(255, 0, 255, 0.2)',
          }}
        >
          <h2 className="font-mono text-xl font-bold text-[#ff00ff] mb-2">SYSTEM BREACH</h2>
          <p className="font-mono text-sm text-[#e0b0ff]">Downloading neural patterns...</p>
          <div className="mt-4 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#00ff00] animate-pulse" />
            <span className="font-mono text-xs text-[#00ff00]">CONNECTED</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes dataFall {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
      `}</style>
    </div>
  );
};

// --- CYBER HUD NAV ---
export const CyberHudNav = () => {
  const [activeItem, setActiveItem] = useState(0);
  const [scanLine, setScanLine] = useState(0);

  const navItems = [
    { icon: '◈', label: 'DASHBOARD' },
    { icon: '◇', label: 'NETWORK' },
    { icon: '◆', label: 'SECURITY' },
    { icon: '○', label: 'SETTINGS' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setScanLine(s => (s + 1) % 100);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex items-center justify-center p-8" style={{ background: '#0d0d1a' }}>
      <div
        className="relative p-6 rounded-lg overflow-hidden"
        style={{
          background: 'rgba(26, 10, 46, 0.5)',
          border: '1px solid #ff00ff40',
          boxShadow: '0 0 30px rgba(255, 0, 255, 0.1), inset 0 0 30px rgba(255, 0, 255, 0.05)',
        }}
      >
        {/* Scanning line effect */}
        <div
          className="absolute left-0 right-0 h-0.5 pointer-events-none"
          style={{
            top: `${scanLine}%`,
            background: 'linear-gradient(90deg, transparent, #00ffff80, transparent)',
            boxShadow: '0 0 10px #00ffff',
          }}
        />

        {/* Corner brackets */}
        <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-[#00ffff]" />
        <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-[#00ffff]" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-[#00ffff]" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-[#00ffff]" />

        {/* Header */}
        <div className="mb-4 pb-2 border-b border-[#ff00ff30]">
          <div className="flex items-center gap-2">
            <span className="text-[#00ffff] animate-pulse">●</span>
            <span className="font-mono text-xs text-[#00ffff]">NAV_SYSTEM v3.2</span>
          </div>
        </div>

        {/* Nav items */}
        <div className="space-y-2">
          {navItems.map((item, i) => (
            <button
              key={i}
              onClick={() => setActiveItem(i)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded transition-all duration-200"
              style={{
                background: activeItem === i ? 'rgba(255, 0, 255, 0.2)' : 'transparent',
                border: `1px solid ${activeItem === i ? '#ff00ff' : 'transparent'}`,
                boxShadow: activeItem === i ? '0 0 15px rgba(255, 0, 255, 0.3)' : 'none',
              }}
            >
              <span
                className="text-xl"
                style={{
                  color: activeItem === i ? '#ff00ff' : '#ff00ff60',
                  textShadow: activeItem === i ? '0 0 10px #ff00ff' : 'none',
                }}
              >
                {item.icon}
              </span>
              <span
                className="font-mono text-sm tracking-wider"
                style={{
                  color: activeItem === i ? '#ffffff' : '#e0b0ff',
                }}
              >
                {item.label}
              </span>
              {activeItem === i && (
                <span className="ml-auto text-[#00ffff] text-xs">◂</span>
              )}
            </button>
          ))}
        </div>

        {/* Footer status */}
        <div className="mt-4 pt-2 border-t border-[#ff00ff30]">
          <div className="flex justify-between font-mono text-xs">
            <span className="text-[#ff00ff60]">SYS_LOAD</span>
            <span className="text-[#00ffff]">47%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- NEON SIGN TEXT ---
export const NeonSignText = () => {
  const [flickerState, setFlickerState] = useState<boolean[]>([true, true, true, true, true, true]);

  useEffect(() => {
    const flickerIntervals = flickerState.map((_, i) => {
      return setInterval(() => {
        if (Math.random() > 0.92) {
          setFlickerState(prev => {
            const newState = [...prev];
            newState[i] = false;
            setTimeout(() => {
              setFlickerState(p => {
                const s = [...p];
                s[i] = true;
                return s;
              });
            }, 50 + Math.random() * 100);
            return newState;
          });
        }
      }, 100 + i * 50);
    });

    return () => flickerIntervals.forEach(clearInterval);
  }, []);

  const letters = ['N', 'E', 'O', 'N', '夜', 'S'];
  const colors = ['#ff00ff', '#00ffff', '#ff00ff', '#00ffff', '#ff0066', '#00ff00'];

  return (
    <div className="h-full flex items-center justify-center p-8" style={{ background: '#0a0a14' }}>
      <div className="relative">
        {/* Glow backdrop */}
        <div
          className="absolute inset-0 blur-3xl opacity-30"
          style={{ background: 'linear-gradient(90deg, #ff00ff, #00ffff, #ff00ff)' }}
        />

        {/* Neon letters */}
        <div className="relative flex gap-1">
          {letters.map((letter, i) => (
            <span
              key={i}
              className="text-6xl font-bold font-mono transition-opacity"
              style={{
                color: flickerState[i] ? colors[i] : colors[i] + '40',
                textShadow: flickerState[i]
                  ? `0 0 10px ${colors[i]}, 0 0 20px ${colors[i]}, 0 0 40px ${colors[i]}, 0 0 80px ${colors[i]}`
                  : 'none',
                opacity: flickerState[i] ? 1 : 0.3,
              }}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Subtitle */}
        <div className="text-center mt-4">
          <span
            className="font-mono text-xs tracking-[0.3em] text-[#ff00ff80]"
            style={{ textShadow: '0 0 5px #ff00ff' }}
          >
            DISTRICT_07
          </span>
        </div>

        {/* Wire decorations */}
        <svg className="absolute -bottom-4 left-0 right-0 h-8" viewBox="0 0 200 30">
          <path d="M20 5 Q50 25 100 15 T180 20" fill="none" stroke="#333" strokeWidth="2" />
          <circle cx="20" cy="5" r="3" fill="#ff00ff40" />
          <circle cx="180" cy="20" r="3" fill="#00ffff40" />
        </svg>
      </div>
    </div>
  );
};

// --- CYBER EYE SCANNER ---
export const CyberEyeScanner = () => {
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<'idle' | 'scanning' | 'success' | 'denied'>('idle');

  const startScan = () => {
    if (isScanning) return;
    setIsScanning(true);
    setResult('scanning');
    setScanProgress(0);
  };

  useEffect(() => {
    if (!isScanning) return;
    const interval = setInterval(() => {
      setScanProgress(p => {
        if (p >= 100) {
          setIsScanning(false);
          setResult(Math.random() > 0.3 ? 'success' : 'denied');
          setTimeout(() => setResult('idle'), 2000);
          return 0;
        }
        return p + 4;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [isScanning]);

  return (
    <div className="h-full flex flex-col items-center justify-center p-8" style={{ background: '#0d0d1a' }}>
      {/* Eye scanner */}
      <div
        className="relative w-48 h-48 rounded-full cursor-pointer"
        onClick={startScan}
        style={{
          background: 'radial-gradient(circle, #1a0a2e 0%, #0d0d1a 70%)',
          border: `3px solid ${result === 'success' ? '#00ff00' : result === 'denied' ? '#ff0000' : '#ff00ff40'}`,
          boxShadow: `0 0 30px ${result === 'success' ? '#00ff0040' : result === 'denied' ? '#ff000040' : '#ff00ff20'}`,
        }}
      >
        {/* Iris rings */}
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border"
            style={{
              inset: `${15 + i * 10}%`,
              borderColor: '#ff00ff30',
              transform: isScanning ? `rotate(${i * 90 + scanProgress * 3}deg)` : `rotate(${i * 90}deg)`,
              transition: 'transform 0.1s linear',
            }}
          />
        ))}

        {/* Pupil */}
        <div
          className="absolute rounded-full"
          style={{
            inset: '35%',
            background: 'radial-gradient(circle, #ff00ff 0%, #1a0a2e 70%)',
            boxShadow: '0 0 20px #ff00ff60',
          }}
        >
          {/* Highlight */}
          <div
            className="absolute w-3 h-3 rounded-full bg-white/60"
            style={{ top: '20%', left: '20%' }}
          />
        </div>

        {/* Scan line */}
        {isScanning && (
          <div
            className="absolute left-0 right-0 h-1"
            style={{
              top: `${scanProgress}%`,
              background: 'linear-gradient(90deg, transparent, #00ffff, transparent)',
              boxShadow: '0 0 10px #00ffff',
            }}
          />
        )}

        {/* Corner markers */}
        <div className="absolute -top-2 -left-2 w-6 h-6 border-l-2 border-t-2 border-[#00ffff]" />
        <div className="absolute -top-2 -right-2 w-6 h-6 border-r-2 border-t-2 border-[#00ffff]" />
        <div className="absolute -bottom-2 -left-2 w-6 h-6 border-l-2 border-b-2 border-[#00ffff]" />
        <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r-2 border-b-2 border-[#00ffff]" />
      </div>

      {/* Status text */}
      <div className="mt-6 text-center font-mono">
        <div
          className="text-sm tracking-wider"
          style={{
            color: result === 'success' ? '#00ff00' : result === 'denied' ? '#ff0000' : '#ff00ff',
            textShadow: `0 0 10px ${result === 'success' ? '#00ff00' : result === 'denied' ? '#ff0000' : '#ff00ff'}`,
          }}
        >
          {result === 'idle' && 'CLICK TO SCAN'}
          {result === 'scanning' && `SCANNING... ${scanProgress}%`}
          {result === 'success' && '✓ ACCESS GRANTED'}
          {result === 'denied' && '✗ ACCESS DENIED'}
        </div>
        <div className="text-xs text-[#ff00ff60] mt-2">RETINAL VERIFICATION</div>
      </div>
    </div>
  );
};

// --- CREDIT CHIP CARD ---
export const CreditChipCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.95) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 100);
      }
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="h-full flex items-center justify-center p-8"
      style={{ background: '#0d0d1a', perspective: '1000px' }}
    >
      <div
        className="relative w-80 h-48 cursor-pointer"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transition: 'transform 0.6s',
        }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-xl p-6 overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            background: 'linear-gradient(135deg, #1a0a2e 0%, #2d1b4e 50%, #1a0a2e 100%)',
            border: '1px solid #ff00ff40',
            boxShadow: '0 10px 40px rgba(255, 0, 255, 0.2)',
          }}
        >
          {/* Circuit pattern background */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0v10M30 20v20M30 50v10M0 30h10M20 30h20M50 30h10' stroke='%23ff00ff' fill='none'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Holographic stripe */}
          <div
            className="absolute top-0 left-0 right-0 h-12"
            style={{
              background: glitchActive
                ? 'linear-gradient(90deg, #ff0000, #00ff00, #0000ff)'
                : 'linear-gradient(90deg, #ff00ff40, #00ffff40, #ff00ff40)',
              transform: glitchActive ? 'translateX(2px)' : 'none',
            }}
          />

          {/* Chip */}
          <div
            className="absolute top-16 left-6 w-12 h-10 rounded"
            style={{
              background: 'linear-gradient(135deg, #c0a040 0%, #ffd700 50%, #c0a040 100%)',
              boxShadow: 'inset 0 0 5px rgba(0,0,0,0.5)',
            }}
          >
            {/* Chip contacts */}
            <div className="grid grid-cols-2 gap-1 p-1 h-full">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-[#b8960a] rounded-sm" />
              ))}
            </div>
          </div>

          {/* Card number */}
          <div className="absolute bottom-16 left-6 right-6">
            <div className="font-mono text-xl tracking-[0.2em] text-[#e0b0ff]">
              •••• •••• •••• 2077
            </div>
          </div>

          {/* Card holder & expiry */}
          <div className="absolute bottom-6 left-6 right-6 flex justify-between">
            <div>
              <div className="text-[10px] text-[#ff00ff60]">NEURAL ID</div>
              <div className="font-mono text-sm text-white">V. SILVERHAND</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-[#ff00ff60]">VALID THRU</div>
              <div className="font-mono text-sm text-white">12/77</div>
            </div>
          </div>

          {/* Logo */}
          <div className="absolute top-6 right-6 flex items-center gap-1">
            <div className="w-8 h-8 rounded-full" style={{ background: '#ff00ff', opacity: 0.8 }} />
            <div className="w-8 h-8 rounded-full -ml-4" style={{ background: '#00ffff', opacity: 0.6 }} />
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-xl overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'linear-gradient(135deg, #1a0a2e 0%, #0d0d1a 100%)',
            border: '1px solid #ff00ff40',
          }}
        >
          {/* Magnetic stripe */}
          <div className="absolute top-8 left-0 right-0 h-10 bg-black" />

          {/* Signature & CVV */}
          <div className="absolute top-24 left-6 right-6 flex gap-4">
            <div className="flex-1 h-10 bg-white/80 rounded px-3 flex items-center">
              <span className="font-script text-gray-700 text-sm italic">V. Silverhand</span>
            </div>
            <div className="w-16 h-10 bg-white/80 rounded flex items-center justify-center">
              <span className="font-mono text-gray-800">***</span>
            </div>
          </div>

          {/* Barcode */}
          <div className="absolute bottom-8 left-6 right-6 h-12 flex gap-0.5">
            {[...Array(40)].map((_, i) => (
              <div
                key={i}
                className="flex-1 bg-[#ff00ff]"
                style={{
                  height: `${50 + Math.random() * 50}%`,
                  opacity: 0.3 + Math.random() * 0.7,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- AUGMENTATION SELECTOR ---
export const AugmentationSelector = () => {
  const [selectedAug, setSelectedAug] = useState<number | null>(null);
  const [installProgress, setInstallProgress] = useState(0);
  const [isInstalling, setIsInstalling] = useState(false);

  const augmentations = [
    { name: 'Kiroshi Optics', slot: 'EYES', level: 'MK.III', status: 'INSTALLED', color: '#00ffff' },
    { name: 'Gorilla Arms', slot: 'ARMS', level: 'MK.II', status: 'AVAILABLE', color: '#ff00ff' },
    { name: 'Mantis Blades', slot: 'ARMS', level: 'MK.IV', status: 'LOCKED', color: '#ff0066' },
    { name: 'Kerenzikov', slot: 'NERVOUS', level: 'MK.I', status: 'AVAILABLE', color: '#00ff00' },
  ];

  useEffect(() => {
    if (!isInstalling) return;
    const interval = setInterval(() => {
      setInstallProgress(p => {
        if (p >= 100) {
          setIsInstalling(false);
          return 0;
        }
        return p + 5;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [isInstalling]);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#0d0d1a' }}>
      <div
        className="w-full max-w-sm p-4 rounded-lg"
        style={{
          background: 'rgba(26, 10, 46, 0.6)',
          border: '1px solid #ff00ff30',
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#ff00ff30]">
          <span className="text-[#00ffff]">⚙</span>
          <span className="font-mono text-sm text-[#00ffff]">RIPPERDOC_TERMINAL</span>
        </div>

        {/* Augmentation list */}
        <div className="space-y-2">
          {augmentations.map((aug, i) => (
            <button
              key={i}
              onClick={() => setSelectedAug(selectedAug === i ? null : i)}
              className="w-full text-left p-3 rounded transition-all"
              style={{
                background: selectedAug === i ? `${aug.color}20` : 'transparent',
                border: `1px solid ${selectedAug === i ? aug.color : 'transparent'}`,
              }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-mono text-sm text-white">{aug.name}</div>
                  <div className="flex gap-2 mt-1">
                    <span className="font-mono text-[10px] px-1 py-0.5 rounded" style={{ background: '#ff00ff20', color: '#ff00ff' }}>
                      {aug.slot}
                    </span>
                    <span className="font-mono text-[10px] text-[#e0b0ff]">{aug.level}</span>
                  </div>
                </div>
                <span
                  className="font-mono text-[10px] px-2 py-1 rounded"
                  style={{
                    background: aug.status === 'INSTALLED' ? '#00ff0020' : aug.status === 'LOCKED' ? '#ff000020' : '#ffff0020',
                    color: aug.status === 'INSTALLED' ? '#00ff00' : aug.status === 'LOCKED' ? '#ff0000' : '#ffff00',
                  }}
                >
                  {aug.status}
                </span>
              </div>

              {/* Install progress */}
              {selectedAug === i && isInstalling && (
                <div className="mt-3">
                  <div className="h-1 rounded-full bg-black/50 overflow-hidden">
                    <div
                      className="h-full transition-all"
                      style={{
                        width: `${installProgress}%`,
                        background: aug.color,
                        boxShadow: `0 0 10px ${aug.color}`,
                      }}
                    />
                  </div>
                  <div className="font-mono text-[10px] text-center mt-1" style={{ color: aug.color }}>
                    INSTALLING... {installProgress}%
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Action button */}
        {selectedAug !== null && augmentations[selectedAug].status === 'AVAILABLE' && !isInstalling && (
          <button
            onClick={() => setIsInstalling(true)}
            className="w-full mt-4 py-2 font-mono text-sm rounded"
            style={{
              background: '#ff00ff20',
              border: '1px solid #ff00ff',
              color: '#ff00ff',
              boxShadow: '0 0 15px #ff00ff40',
            }}
          >
            INSTALL AUGMENTATION
          </button>
        )}
      </div>
    </div>
  );
};

// --- HACKER TERMINAL ---
export const HackerTerminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<{ type: 'input' | 'output' | 'error'; text: string }[]>([
    { type: 'output', text: 'NIGHTCITY_NET v2.077' },
    { type: 'output', text: 'Connection established...' },
    { type: 'output', text: 'Type "help" for commands' },
  ]);
  const [cursorVisible, setCursorVisible] = useState(true);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => setCursorVisible(v => !v), 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const processCommand = (cmd: string) => {
    const commands: Record<string, string> = {
      help: 'Commands: help, status, scan, breach, clear',
      status: '> System: ONLINE\n> Firewall: ACTIVE\n> ICE: DETECTED',
      scan: '> Scanning local network...\n> Found 3 vulnerable nodes\n> WARNING: Black ICE detected',
      breach: '> Initiating breach protocol...\n> Bypassing firewall...\n> ACCESS GRANTED',
      clear: 'CLEAR',
    };

    const response = commands[cmd.toLowerCase()];
    if (response === 'CLEAR') {
      setHistory([{ type: 'output', text: 'Terminal cleared.' }]);
    } else if (response) {
      setHistory(prev => [...prev, { type: 'output', text: response }]);
    } else {
      setHistory(prev => [...prev, { type: 'error', text: `Unknown command: ${cmd}` }]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && input.trim()) {
      setHistory(prev => [...prev, { type: 'input', text: `> ${input}` }]);
      processCommand(input.trim());
      setInput('');
    }
  };

  return (
    <div className="h-full flex flex-col p-4" style={{ background: '#0a0a14' }}>
      {/* Terminal window */}
      <div
        className="flex-1 rounded-lg overflow-hidden flex flex-col"
        style={{
          background: 'rgba(0, 0, 0, 0.8)',
          border: '1px solid #00ffff40',
          boxShadow: '0 0 20px rgba(0, 255, 255, 0.1)',
        }}
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 px-3 py-2 border-b border-[#00ffff30]">
          <div className="w-3 h-3 rounded-full bg-[#ff0066]" />
          <div className="w-3 h-3 rounded-full bg-[#ffff00]" />
          <div className="w-3 h-3 rounded-full bg-[#00ff00]" />
          <span className="ml-2 font-mono text-xs text-[#00ffff]">terminal@netrunner</span>
        </div>

        {/* Output */}
        <div
          ref={terminalRef}
          className="flex-1 p-3 overflow-auto font-mono text-sm"
          style={{ maxHeight: '200px' }}
        >
          {history.map((line, i) => (
            <div
              key={i}
              className="whitespace-pre-wrap"
              style={{
                color: line.type === 'error' ? '#ff0066' : line.type === 'input' ? '#00ffff' : '#00ff00',
              }}
            >
              {line.text}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 px-3 py-2 border-t border-[#00ffff30]">
          <span className="text-[#ff00ff]">{'>'}</span>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none font-mono text-sm text-[#00ffff]"
            placeholder="enter command..."
            style={{ caretColor: 'transparent' }}
          />
          <span
            className="w-2 h-4"
            style={{
              background: cursorVisible ? '#00ffff' : 'transparent',
              boxShadow: cursorVisible ? '0 0 5px #00ffff' : 'none',
            }}
          />
        </div>
      </div>
    </div>
  );
};

// --- NEURAL INPUT ---
export const CyberpunkNeuralInput = () => {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [neuralPulse, setNeuralPulse] = useState(0);

  useEffect(() => {
    if (!isFocused) return;
    const interval = setInterval(() => {
      setNeuralPulse(p => (p + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, [isFocused]);

  return (
    <div className="h-full flex items-center justify-center p-8" style={{ background: '#0d0d1a' }}>
      <div className="relative w-full max-w-sm">
        {/* Neural network background */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 300 60">
          {[...Array(8)].map((_, i) => (
            <circle
              key={i}
              cx={20 + i * 38}
              cy={30}
              r={isFocused ? 4 : 2}
              fill={isFocused ? '#ff00ff' : '#ff00ff40'}
              style={{
                filter: isFocused ? 'drop-shadow(0 0 5px #ff00ff)' : 'none',
                transition: 'all 0.3s',
              }}
            />
          ))}
          {[...Array(7)].map((_, i) => (
            <line
              key={i}
              x1={24 + i * 38}
              y1={30}
              x2={54 + i * 38}
              y2={30}
              stroke={isFocused ? '#00ffff' : '#00ffff30'}
              strokeWidth={isFocused ? 2 : 1}
              strokeDasharray={isFocused ? '4 2' : 'none'}
              style={{
                filter: isFocused ? 'drop-shadow(0 0 3px #00ffff)' : 'none',
              }}
            />
          ))}
        </svg>

        {/* Input field */}
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="NEURAL_INPUT://"
          className="relative w-full px-4 py-3 font-mono text-sm outline-none"
          style={{
            background: 'rgba(26, 10, 46, 0.8)',
            border: `2px solid ${isFocused ? '#ff00ff' : '#ff00ff40'}`,
            color: '#e0b0ff',
            clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
            boxShadow: isFocused ? '0 0 20px #ff00ff40, inset 0 0 15px #ff00ff20' : 'none',
          }}
        />

        {/* Neural sync indicator */}
        {isFocused && (
          <div className="absolute -right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <div
              className="w-2 h-2 rounded-full bg-[#00ffff]"
              style={{
                boxShadow: '0 0 10px #00ffff',
                opacity: 0.5 + Math.sin(neuralPulse * 0.1) * 0.5,
              }}
            />
          </div>
        )}

        {/* Label */}
        <div className="absolute -top-6 left-0 font-mono text-xs text-[#00ffff]">
          NEURAL_LINK_INTERFACE
        </div>
      </div>
    </div>
  );
};

// --- CHROME BADGE ---
export const CyberpunkChromeBadge = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [shimmerPos, setShimmerPos] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setShimmerPos(p => (p + 2) % 200);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex items-center justify-center p-8" style={{ background: '#0d0d1a' }}>
      <div
        className="relative px-6 py-2 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          background: 'linear-gradient(135deg, #2a2a3a 0%, #1a1a2a 50%, #3a3a4a 100%)',
          border: '1px solid #00ffff60',
          borderRadius: '4px',
          boxShadow: isHovered
            ? '0 0 20px #00ffff40, inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.3)'
            : 'inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(0,0,0,0.3)',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          transition: 'all 0.2s',
        }}
      >
        {/* Chrome shimmer effect */}
        <div
          className="absolute inset-0 overflow-hidden rounded"
          style={{ opacity: 0.5 }}
        >
          <div
            className="absolute inset-y-0 w-20"
            style={{
              left: `${shimmerPos - 100}%`,
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
            }}
          />
        </div>

        {/* Badge content */}
        <div className="relative flex items-center gap-2">
          <span
            className="text-sm"
            style={{
              background: 'linear-gradient(180deg, #00ffff 0%, #ff00ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 2px #00ffff)',
            }}
          >
            ◆
          </span>
          <span
            className="font-mono text-sm font-bold tracking-wider"
            style={{
              background: 'linear-gradient(180deg, #ffffff 0%, #c0c0c0 50%, #808080 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            CHROME
          </span>
          <span className="font-mono text-xs text-[#ff00ff]">v3.0</span>
        </div>

        {/* Reflection line */}
        <div
          className="absolute top-0 left-4 right-4 h-px"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
          }}
        />
      </div>
    </div>
  );
};

// --- DOWNLOAD PROGRESS ---
export const CyberpunkDownloadProgress = () => {
  const [progress, setProgress] = useState(0);
  const [dataBlocks, setDataBlocks] = useState<boolean[]>(Array(20).fill(false));

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        const next = p >= 100 ? 0 : p + 2;
        const blockIndex = Math.floor((next / 100) * 20);
        setDataBlocks(blocks => blocks.map((_, i) => i < blockIndex));
        return next;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex flex-col items-center justify-center p-8" style={{ background: '#0d0d1a' }}>
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="flex justify-between items-center mb-2 font-mono text-xs">
          <span className="text-[#00ffff]">DATA_DOWNLOAD://</span>
          <span className="text-[#ff00ff]">{progress.toFixed(0)}%</span>
        </div>

        {/* Progress bar container */}
        <div
          className="relative h-8 rounded overflow-hidden"
          style={{
            background: 'rgba(26, 10, 46, 0.8)',
            border: '1px solid #ff00ff40',
          }}
        >
          {/* Data blocks */}
          <div className="absolute inset-1 flex gap-0.5">
            {dataBlocks.map((active, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm transition-all duration-100"
                style={{
                  background: active
                    ? i % 3 === 0 ? '#ff00ff' : i % 3 === 1 ? '#00ffff' : '#e0b0ff'
                    : '#1a0a2e',
                  boxShadow: active ? `0 0 8px ${i % 2 === 0 ? '#ff00ff' : '#00ffff'}` : 'none',
                }}
              />
            ))}
          </div>

          {/* Scanline */}
          <div
            className="absolute inset-y-0 w-1"
            style={{
              left: `${progress}%`,
              background: 'linear-gradient(180deg, transparent, #ffffff, transparent)',
              boxShadow: '0 0 10px #ffffff',
            }}
          />
        </div>

        {/* Stats */}
        <div className="flex justify-between mt-2 font-mono text-xs text-[#e0b0ff]">
          <span>SPEED: 847.3 MB/s</span>
          <span>ETA: {Math.ceil((100 - progress) * 0.1)}s</span>
        </div>

        {/* Binary decoration */}
        <div className="mt-4 font-mono text-[10px] text-[#ff00ff40] overflow-hidden whitespace-nowrap">
          {Array(50).fill(0).map(() => Math.random() > 0.5 ? '1' : '0').join('')}
        </div>
      </div>
    </div>
  );
};

// --- AVATAR FRAME ---
export const CyberpunkAvatarFrame = () => {
  const [glitchFrame, setGlitchFrame] = useState(false);
  const [scanLine, setScanLine] = useState(0);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.9) {
        setGlitchFrame(true);
        setTimeout(() => setGlitchFrame(false), 100);
      }
    }, 200);

    const scanInterval = setInterval(() => {
      setScanLine(s => (s + 2) % 100);
    }, 30);

    return () => {
      clearInterval(glitchInterval);
      clearInterval(scanInterval);
    };
  }, []);

  return (
    <div className="h-full flex items-center justify-center p-8" style={{ background: '#0d0d1a' }}>
      <div className="relative">
        {/* Outer implant frame */}
        <div
          className="absolute -inset-4 rounded-full"
          style={{
            background: 'conic-gradient(from 0deg, #ff00ff, #00ffff, #ff00ff)',
            opacity: 0.3,
            filter: 'blur(8px)',
          }}
        />

        {/* Cyber frame */}
        <div
          className="relative w-32 h-32 rounded-full overflow-hidden"
          style={{
            border: '3px solid #ff00ff',
            boxShadow: '0 0 20px #ff00ff60, inset 0 0 20px #ff00ff40',
            transform: glitchFrame ? 'translateX(2px)' : 'none',
          }}
        >
          {/* Avatar placeholder */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #1a0a2e 0%, #2d1b4e 100%)',
            }}
          >
            <span className="text-4xl" style={{ filter: 'drop-shadow(0 0 10px #ff00ff)' }}>
              ⬡
            </span>
          </div>

          {/* Scan line */}
          <div
            className="absolute left-0 right-0 h-1 pointer-events-none"
            style={{
              top: `${scanLine}%`,
              background: 'linear-gradient(180deg, transparent, #00ffff80, transparent)',
            }}
          />

          {/* Implant overlays */}
          <div className="absolute top-0 right-0 w-8 h-8">
            <svg viewBox="0 0 32 32" className="w-full h-full">
              <path
                d="M32 0 L32 12 L28 12 L28 8 L24 8 L24 4 L20 4 L20 0 Z"
                fill="#00ffff"
                style={{ filter: 'drop-shadow(0 0 3px #00ffff)' }}
              />
            </svg>
          </div>
          <div className="absolute bottom-0 left-0 w-8 h-8">
            <svg viewBox="0 0 32 32" className="w-full h-full">
              <path
                d="M0 32 L0 20 L4 20 L4 24 L8 24 L8 28 L12 28 L12 32 Z"
                fill="#ff00ff"
                style={{ filter: 'drop-shadow(0 0 3px #ff00ff)' }}
              />
            </svg>
          </div>
        </div>

        {/* Status indicators */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{
                background: i < 4 ? '#00ff00' : '#ff0000',
                boxShadow: `0 0 5px ${i < 4 ? '#00ff00' : '#ff0000'}`,
              }}
            />
          ))}
        </div>

        {/* ID label */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-mono text-xs text-[#e0b0ff]">
          ID://NETRUNNER_077
        </div>
      </div>
    </div>
  );
};

// --- HACK NAV ---
export const CyberpunkHackNav = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [typingText, setTypingText] = useState('');
  const [cursorBlink, setCursorBlink] = useState(true);

  const navItems = [
    { cmd: 'breach', label: '> BREACH_PROTOCOL' },
    { cmd: 'scan', label: '> NETWORK_SCAN' },
    { cmd: 'decrypt', label: '> DECRYPT_DATA' },
    { cmd: 'upload', label: '> UPLOAD_DAEMON' },
  ];

  useEffect(() => {
    const interval = setInterval(() => setCursorBlink(b => !b), 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const text = navItems[activeIndex].cmd;
    let i = 0;
    setTypingText('');
    const interval = setInterval(() => {
      if (i < text.length) {
        setTypingText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <div className="h-full flex items-center justify-center p-4" style={{ background: '#0a0a14' }}>
      <div
        className="w-full max-w-xs rounded overflow-hidden"
        style={{
          background: 'rgba(0, 0, 0, 0.9)',
          border: '1px solid #00ff00',
          boxShadow: '0 0 20px rgba(0, 255, 0, 0.2)',
        }}
      >
        {/* Terminal header */}
        <div className="px-3 py-2 border-b border-[#00ff0040] flex items-center gap-2">
          <span className="text-[#00ff00] animate-pulse">$</span>
          <span className="font-mono text-xs text-[#00ff00]">HACK_TERMINAL</span>
        </div>

        {/* Nav items */}
        <div className="p-2 space-y-1">
          {navItems.map((item, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className="w-full text-left px-3 py-2 font-mono text-sm transition-all"
              style={{
                background: activeIndex === i ? 'rgba(0, 255, 0, 0.1)' : 'transparent',
                color: activeIndex === i ? '#00ff00' : '#00ff0080',
                textShadow: activeIndex === i ? '0 0 10px #00ff00' : 'none',
              }}
            >
              {item.label}
              {activeIndex === i && (
                <span className="ml-2 text-[#ff00ff]">[SELECTED]</span>
              )}
            </button>
          ))}
        </div>

        {/* Command line */}
        <div className="px-3 py-2 border-t border-[#00ff0040] flex items-center gap-2">
          <span className="text-[#ff00ff]">root@system:~$</span>
          <span className="font-mono text-sm text-[#00ffff]">{typingText}</span>
          <span
            className="w-2 h-4"
            style={{
              background: cursorBlink ? '#00ff00' : 'transparent',
            }}
          />
        </div>
      </div>
    </div>
  );
};

// --- VIRUS ALERT ---
export const CyberpunkVirusAlert = () => {
  const [pulseIntensity, setPulseIntensity] = useState(0);
  const [glitchOffset, setGlitchOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setPulseIntensity(p => (p + 0.1) % (Math.PI * 2));
    }, 50);

    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.8) {
        setGlitchOffset({
          x: (Math.random() - 0.5) * 4,
          y: (Math.random() - 0.5) * 2,
        });
        setTimeout(() => setGlitchOffset({ x: 0, y: 0 }), 50);
      }
    }, 100);

    return () => {
      clearInterval(pulseInterval);
      clearInterval(glitchInterval);
    };
  }, []);

  const glowIntensity = 0.5 + Math.sin(pulseIntensity) * 0.5;

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#0d0d1a' }}>
      <div
        className="relative w-full max-w-sm p-4 rounded"
        style={{
          background: 'rgba(255, 0, 0, 0.1)',
          border: '2px solid #ff0000',
          boxShadow: `0 0 ${20 + glowIntensity * 30}px rgba(255, 0, 0, ${0.3 + glowIntensity * 0.4})`,
          transform: `translate(${glitchOffset.x}px, ${glitchOffset.y}px)`,
        }}
      >
        {/* Warning icon */}
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-12 h-12 flex items-center justify-center rounded"
            style={{
              background: 'rgba(255, 0, 0, 0.2)',
              border: '1px solid #ff0000',
            }}
          >
            <span className="text-2xl" style={{ filter: 'drop-shadow(0 0 5px #ff0000)' }}>
              ⚠
            </span>
          </div>
          <div>
            <div className="font-mono text-lg font-bold text-[#ff0000]" style={{ textShadow: '0 0 10px #ff0000' }}>
              MALWARE DETECTED
            </div>
            <div className="font-mono text-xs text-[#ff6666]">THREAT_LEVEL: CRITICAL</div>
          </div>
        </div>

        {/* Alert details */}
        <div className="space-y-2 font-mono text-xs">
          <div className="flex justify-between text-[#e0b0ff]">
            <span>TYPE:</span>
            <span className="text-[#ff00ff]">NEURAL_WORM.EXE</span>
          </div>
          <div className="flex justify-between text-[#e0b0ff]">
            <span>ORIGIN:</span>
            <span className="text-[#00ffff]">UNKNOWN_NODE</span>
          </div>
          <div className="flex justify-between text-[#e0b0ff]">
            <span>STATUS:</span>
            <span className="text-[#ff0000] animate-pulse">ACTIVE</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 mt-4">
          <button
            className="flex-1 py-2 font-mono text-xs rounded"
            style={{
              background: 'rgba(255, 0, 0, 0.2)',
              border: '1px solid #ff0000',
              color: '#ff0000',
            }}
          >
            QUARANTINE
          </button>
          <button
            className="flex-1 py-2 font-mono text-xs rounded"
            style={{
              background: 'rgba(0, 255, 0, 0.2)',
              border: '1px solid #00ff00',
              color: '#00ff00',
            }}
          >
            PURGE
          </button>
        </div>

        {/* Scanlines */}
        <div
          className="absolute inset-0 pointer-events-none rounded"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,0,0,0.03) 2px, rgba(255,0,0,0.03) 4px)',
          }}
        />
      </div>
    </div>
  );
};

// --- WIRE DIVIDER ---
export const CyberpunkWireDivider = () => {
  const [sparkPosition, setSparkPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSparkPosition(p => (p + 3) % 100);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex items-center justify-center p-8" style={{ background: '#0d0d1a' }}>
      <div className="relative w-full max-w-md h-16">
        <svg viewBox="0 0 400 60" className="w-full h-full">
          {/* Wire paths */}
          <path
            d="M0 30 Q50 10 100 30 T200 30 T300 30 T400 30"
            fill="none"
            stroke="#ff00ff"
            strokeWidth="3"
            style={{ filter: 'drop-shadow(0 0 3px #ff00ff)' }}
          />
          <path
            d="M0 25 Q75 45 150 25 T300 25 T400 25"
            fill="none"
            stroke="#00ffff"
            strokeWidth="2"
            style={{ filter: 'drop-shadow(0 0 2px #00ffff)' }}
          />
          <path
            d="M0 35 Q60 55 120 35 T240 35 T360 35 L400 35"
            fill="none"
            stroke="#e0b0ff"
            strokeWidth="2"
            opacity="0.6"
          />

          {/* Connectors */}
          {[0, 100, 200, 300, 400].map((x, i) => (
            <g key={i}>
              <circle
                cx={x}
                cy={30}
                r={i % 2 === 0 ? 6 : 4}
                fill="#1a0a2e"
                stroke="#ff00ff"
                strokeWidth="2"
                style={{ filter: 'drop-shadow(0 0 5px #ff00ff)' }}
              />
              <circle
                cx={x}
                cy={30}
                r={2}
                fill="#00ffff"
                style={{ filter: 'drop-shadow(0 0 3px #00ffff)' }}
              />
            </g>
          ))}

          {/* Traveling spark */}
          <circle
            cx={sparkPosition * 4}
            cy={30 + Math.sin(sparkPosition * 0.1) * 5}
            r="3"
            fill="#ffffff"
            style={{ filter: 'drop-shadow(0 0 8px #ffffff)' }}
          />
        </svg>

        {/* Junction box decoration */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #2a2a3a 0%, #1a1a2a 100%)',
            border: '2px solid #ff00ff',
            boxShadow: '0 0 10px #ff00ff60',
          }}
        >
          <span className="text-[#00ffff] text-xs">⚡</span>
        </div>
      </div>
    </div>
  );
};

// --- VOLTAGE SLIDER ---
export const CyberpunkVoltageSlider = () => {
  const [voltage, setVoltage] = useState(50);
  const [isOverload, setIsOverload] = useState(false);

  useEffect(() => {
    setIsOverload(voltage > 80);
  }, [voltage]);

  const getVoltageColor = () => {
    if (voltage < 30) return '#00ff00';
    if (voltage < 60) return '#00ffff';
    if (voltage < 80) return '#ff00ff';
    return '#ff0000';
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-8" style={{ background: '#0d0d1a' }}>
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <span className="font-mono text-xs text-[#00ffff]">VOLTAGE_CONTROL</span>
          <span
            className="font-mono text-lg font-bold"
            style={{
              color: getVoltageColor(),
              textShadow: `0 0 10px ${getVoltageColor()}`,
              animation: isOverload ? 'pulse 0.5s infinite' : 'none',
            }}
          >
            {voltage}V
          </span>
        </div>

        {/* Slider track */}
        <div
          className="relative h-10 rounded overflow-hidden"
          style={{
            background: 'rgba(26, 10, 46, 0.8)',
            border: `2px solid ${isOverload ? '#ff0000' : '#ff00ff40'}`,
            boxShadow: isOverload ? '0 0 20px rgba(255, 0, 0, 0.5)' : 'none',
          }}
        >
          {/* Voltage level segments */}
          <div className="absolute inset-1 flex gap-0.5">
            {[...Array(20)].map((_, i) => {
              const segmentActive = i < voltage / 5;
              const segmentColor = i < 6 ? '#00ff00' : i < 12 ? '#00ffff' : i < 16 ? '#ff00ff' : '#ff0000';
              return (
                <div
                  key={i}
                  className="flex-1 rounded-sm transition-all"
                  style={{
                    background: segmentActive ? segmentColor : '#1a0a2e',
                    boxShadow: segmentActive ? `0 0 8px ${segmentColor}` : 'none',
                  }}
                />
              );
            })}
          </div>

          {/* Slider input */}
          <input
            type="range"
            min="0"
            max="100"
            value={voltage}
            onChange={e => setVoltage(Number(e.target.value))}
            className="absolute inset-0 w-full opacity-0 cursor-pointer"
          />
        </div>

        {/* Scale markers */}
        <div className="flex justify-between mt-2 font-mono text-[10px] text-[#e0b0ff]">
          <span>0V</span>
          <span>25V</span>
          <span>50V</span>
          <span>75V</span>
          <span>100V</span>
        </div>

        {/* Warning */}
        {isOverload && (
          <div className="mt-4 p-2 rounded text-center font-mono text-xs" style={{ background: 'rgba(255, 0, 0, 0.2)', border: '1px solid #ff0000' }}>
            <span className="text-[#ff0000] animate-pulse">⚠ OVERLOAD WARNING ⚠</span>
          </div>
        )}
      </div>
    </div>
  );
};

// --- DRONE CARD ---
export const CyberpunkDroneCard = () => {
  const [isActive, setIsActive] = useState(false);
  const [scanAngle, setScanAngle] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setScanAngle(a => (a + 5) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#0d0d1a' }}>
      <div
        className="relative w-full max-w-xs p-4 rounded-lg cursor-pointer"
        onClick={() => setIsActive(!isActive)}
        style={{
          background: 'linear-gradient(180deg, rgba(26, 10, 46, 0.9) 0%, rgba(13, 13, 26, 0.9) 100%)',
          border: `1px solid ${isActive ? '#00ffff' : '#ff00ff40'}`,
          boxShadow: isActive ? '0 0 30px rgba(0, 255, 255, 0.3)' : 'none',
        }}
      >
        {/* Drone visualization */}
        <div className="relative w-full h-32 mb-4">
          <svg viewBox="0 0 120 80" className="w-full h-full">
            {/* Drone body */}
            <ellipse cx="60" cy="40" rx="25" ry="10" fill="#2a2a3a" stroke="#00ffff" strokeWidth="1" />
            <rect x="35" y="35" width="50" height="10" rx="2" fill="#1a1a2a" stroke="#ff00ff" strokeWidth="1" />

            {/* Propeller arms */}
            {[0, 90, 180, 270].map((angle, i) => (
              <g key={i} transform={`rotate(${angle} 60 40)`}>
                <line x1="60" y1="40" x2="60" y2="15" stroke="#00ffff" strokeWidth="2" />
                <circle
                  cx="60"
                  cy="12"
                  r="8"
                  fill="none"
                  stroke="#ff00ff"
                  strokeWidth="1"
                  style={{
                    transformOrigin: '60px 12px',
                    animation: isActive ? 'spin 0.1s linear infinite' : 'none',
                  }}
                />
              </g>
            ))}

            {/* Scan cone */}
            {isActive && (
              <path
                d={`M60 50 L${60 + Math.cos((scanAngle * Math.PI) / 180) * 40} ${50 + Math.sin((scanAngle * Math.PI) / 180) * 20} L${60 + Math.cos(((scanAngle + 30) * Math.PI) / 180) * 40} ${50 + Math.sin(((scanAngle + 30) * Math.PI) / 180) * 20} Z`}
                fill="rgba(0, 255, 255, 0.2)"
                stroke="#00ffff"
                strokeWidth="0.5"
              />
            )}

            {/* Camera eye */}
            <circle cx="60" cy="45" r="4" fill={isActive ? '#ff0000' : '#ff000080'} style={{ filter: isActive ? 'drop-shadow(0 0 5px #ff0000)' : 'none' }} />
          </svg>
        </div>

        {/* Info */}
        <div className="space-y-2 font-mono text-xs">
          <div className="flex justify-between">
            <span className="text-[#e0b0ff]">UNIT_ID:</span>
            <span className="text-[#00ffff]">DRONE-X7</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#e0b0ff]">STATUS:</span>
            <span style={{ color: isActive ? '#00ff00' : '#ff0000' }}>
              {isActive ? 'SCANNING' : 'STANDBY'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#e0b0ff]">BATTERY:</span>
            <span className="text-[#ff00ff]">87%</span>
          </div>
        </div>

        {/* Activation button */}
        <div
          className="mt-4 py-2 text-center font-mono text-xs rounded"
          style={{
            background: isActive ? 'rgba(0, 255, 0, 0.2)' : 'rgba(255, 0, 255, 0.2)',
            border: `1px solid ${isActive ? '#00ff00' : '#ff00ff'}`,
            color: isActive ? '#00ff00' : '#ff00ff',
          }}
        >
          {isActive ? 'DEACTIVATE' : 'ACTIVATE'}
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

// --- CHIP ICON ---
export const CyberpunkChipIcon = () => {
  const [activePins, setActivePins] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newActive = [...Array(3)].map(() => Math.floor(Math.random() * 16));
      setActivePins(newActive);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex items-center justify-center p-8" style={{ background: '#0d0d1a' }}>
      <div className="relative">
        <svg viewBox="0 0 100 100" className="w-32 h-32">
          {/* Chip body */}
          <rect
            x="25"
            y="25"
            width="50"
            height="50"
            rx="4"
            fill="linear-gradient(135deg, #1a1a2a 0%, #2a2a3a 100%)"
            stroke="#ff00ff"
            strokeWidth="2"
            style={{ filter: 'drop-shadow(0 0 10px #ff00ff60)' }}
          />

          {/* Inner die */}
          <rect
            x="35"
            y="35"
            width="30"
            height="30"
            rx="2"
            fill="#0d0d1a"
            stroke="#00ffff"
            strokeWidth="1"
          />

          {/* Circuit pattern */}
          <path
            d="M40 50 H55 M50 40 V55 M42 42 L48 48 M52 42 L58 48 M42 52 L48 58 M52 52 L58 58"
            stroke="#00ffff"
            strokeWidth="0.5"
            fill="none"
            opacity="0.6"
          />

          {/* Center core */}
          <circle cx="50" cy="50" r="5" fill="#ff00ff" style={{ filter: 'drop-shadow(0 0 5px #ff00ff)' }} />

          {/* Pins - top */}
          {[0, 1, 2, 3].map(i => (
            <rect
              key={`top-${i}`}
              x={30 + i * 10}
              y="15"
              width="4"
              height="10"
              fill={activePins.includes(i) ? '#00ffff' : '#00ffff40'}
              style={{ filter: activePins.includes(i) ? 'drop-shadow(0 0 3px #00ffff)' : 'none' }}
            />
          ))}

          {/* Pins - bottom */}
          {[0, 1, 2, 3].map(i => (
            <rect
              key={`bottom-${i}`}
              x={30 + i * 10}
              y="75"
              width="4"
              height="10"
              fill={activePins.includes(i + 4) ? '#ff00ff' : '#ff00ff40'}
              style={{ filter: activePins.includes(i + 4) ? 'drop-shadow(0 0 3px #ff00ff)' : 'none' }}
            />
          ))}

          {/* Pins - left */}
          {[0, 1, 2, 3].map(i => (
            <rect
              key={`left-${i}`}
              x="15"
              y={30 + i * 10}
              width="10"
              height="4"
              fill={activePins.includes(i + 8) ? '#e0b0ff' : '#e0b0ff40'}
              style={{ filter: activePins.includes(i + 8) ? 'drop-shadow(0 0 3px #e0b0ff)' : 'none' }}
            />
          ))}

          {/* Pins - right */}
          {[0, 1, 2, 3].map(i => (
            <rect
              key={`right-${i}`}
              x="75"
              y={30 + i * 10}
              width="10"
              height="4"
              fill={activePins.includes(i + 12) ? '#00ff00' : '#00ff0040'}
              style={{ filter: activePins.includes(i + 12) ? 'drop-shadow(0 0 3px #00ff00)' : 'none' }}
            />
          ))}
        </svg>

        {/* Label */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-mono text-xs text-[#e0b0ff]">
          NEURAL_CHIP_v4.2
        </div>
      </div>
    </div>
  );
};

// --- NEON HEADING ---
export const CyberpunkNeonHeading = () => {
  const [flickerStates, setFlickerStates] = useState([true, true, true, true, true, true, true, true]);

  useEffect(() => {
    const intervals = flickerStates.map((_, i) => {
      return setInterval(() => {
        if (Math.random() > 0.95) {
          setFlickerStates(prev => {
            const newState = [...prev];
            newState[i] = false;
            setTimeout(() => {
              setFlickerStates(p => {
                const s = [...p];
                s[i] = true;
                return s;
              });
            }, 50 + Math.random() * 100);
            return newState;
          });
        }
      }, 100 + i * 30);
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  const text = 'CYBERPUNK';
  const colors = ['#ff00ff', '#00ffff', '#ff00ff', '#e0b0ff', '#00ffff', '#ff00ff', '#00ffff', '#ff00ff', '#e0b0ff'];

  return (
    <div className="h-full flex flex-col items-center justify-center p-8" style={{ background: '#0a0a14' }}>
      {/* Glow backdrop */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ filter: 'blur(40px)', opacity: 0.4 }}
      >
        <span className="text-6xl font-bold text-[#ff00ff]">{text}</span>
      </div>

      {/* Main heading */}
      <h1 className="relative flex">
        {text.split('').map((char, i) => (
          <span
            key={i}
            className="text-5xl font-bold font-mono transition-opacity"
            style={{
              color: flickerStates[i] ? colors[i] : `${colors[i]}40`,
              textShadow: flickerStates[i]
                ? `0 0 10px ${colors[i]}, 0 0 20px ${colors[i]}, 0 0 40px ${colors[i]}, 0 0 80px ${colors[i]}`
                : 'none',
              opacity: flickerStates[i] ? 1 : 0.3,
            }}
          >
            {char}
          </span>
        ))}
      </h1>

      {/* Subtitle */}
      <div className="relative mt-4">
        <span
          className="font-mono text-sm tracking-[0.5em] text-[#00ffff]"
          style={{ textShadow: '0 0 10px #00ffff' }}
        >
          DISTRICT
        </span>
      </div>

      {/* Decorative lines */}
      <div className="relative w-64 mt-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[#ff00ff] to-transparent" style={{ boxShadow: '0 0 10px #ff00ff' }} />
        <div className="flex justify-center -mt-1">
          <div className="w-3 h-3 rotate-45 border border-[#ff00ff]" style={{ background: '#0a0a14' }} />
        </div>
      </div>
    </div>
  );
};

// --- RAIN BACKGROUND ---
export const CyberpunkRainBackground = () => {
  const [raindrops, setRaindrops] = useState<{ x: number; delay: number; duration: number; char: string }[]>([]);

  useEffect(() => {
    const chars = '01アイウエオカキクケコ'.split('');
    const drops = [...Array(40)].map(() => ({
      x: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 1 + Math.random() * 2,
      char: chars[Math.floor(Math.random() * chars.length)],
    }));
    setRaindrops(drops);
  }, []);

  return (
    <div className="h-full relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0a0a14 0%, #1a0a2e 50%, #0d0d1a 100%)' }}>
      {/* Digital rain */}
      {raindrops.map((drop, i) => (
        <div
          key={i}
          className="absolute font-mono text-sm"
          style={{
            left: `${drop.x}%`,
            animation: `digitalRain ${drop.duration}s linear infinite`,
            animationDelay: `${drop.delay}s`,
            color: i % 3 === 0 ? '#ff00ff' : i % 3 === 1 ? '#00ffff' : '#e0b0ff',
            textShadow: `0 0 10px ${i % 2 === 0 ? '#ff00ff' : '#00ffff'}`,
            opacity: 0.3 + Math.random() * 0.5,
          }}
        >
          {drop.char}
        </div>
      ))}

      {/* Fog layers */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/3"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(255, 0, 255, 0.1) 100%)',
        }}
      />

      {/* Central content area */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="p-8 rounded-lg"
          style={{
            background: 'rgba(13, 13, 26, 0.7)',
            backdropFilter: 'blur(10px)',
            border: '1px solid #ff00ff40',
          }}
        >
          <div className="font-mono text-center">
            <div className="text-2xl text-[#ff00ff] mb-2" style={{ textShadow: '0 0 20px #ff00ff' }}>
              NIGHT CITY
            </div>
            <div className="text-sm text-[#00ffff]">2077.12.31</div>
          </div>
        </div>
      </div>

      {/* Holographic grid floor */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/4"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(0, 255, 255, 0.05) 100%)',
          backgroundImage: `
            linear-gradient(90deg, #00ffff10 1px, transparent 1px),
            linear-gradient(0deg, #00ffff10 1px, transparent 1px)
          `,
          backgroundSize: '40px 20px',
          transform: 'perspective(500px) rotateX(60deg)',
          transformOrigin: 'bottom',
        }}
      />

      <style>{`
        @keyframes digitalRain {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

// Export all components
export const cyberpunkComponents: Record<string, React.FC> = {
  'glitch-button': GlitchButton,
  'holographic-card': HolographicCard,
  'neural-link-loader': NeuralLoader,
  'data-rain-background': DataRain,
  'hud-navigation': CyberHudNav,
  'neon-sign-text': NeonSignText,
  'cyber-eye-scanner': CyberEyeScanner,
  'credit-chip-card': CreditChipCard,
  'augmentation-selector': AugmentationSelector,
  'hacker-terminal': HackerTerminal,
  'cyberpunk-neural-input': CyberpunkNeuralInput,
  'cyberpunk-chrome-badge': CyberpunkChromeBadge,
  'cyberpunk-download-progress': CyberpunkDownloadProgress,
  'cyberpunk-avatar-frame': CyberpunkAvatarFrame,
  'cyberpunk-hack-nav': CyberpunkHackNav,
  'cyberpunk-virus-alert': CyberpunkVirusAlert,
  'cyberpunk-wire-divider': CyberpunkWireDivider,
  'cyberpunk-voltage-slider': CyberpunkVoltageSlider,
  'cyberpunk-drone-card': CyberpunkDroneCard,
  'cyberpunk-chip-icon': CyberpunkChipIcon,
  'cyberpunk-neon-heading': CyberpunkNeonHeading,
  'cyberpunk-rain-background': CyberpunkRainBackground,
};
