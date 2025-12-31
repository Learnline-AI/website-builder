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

// Export all components
export const cyberpunkComponents = {
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
};
