import React, { useState, useEffect, useRef } from 'react';
import { useGameLoop } from '../shared/hooks';

// --- BIOS BOOT SEQUENCE ---
export const BiosBoot = () => {
  const [lines, setLines] = useState<string[]>([]);
  const bootMessages = [
    'BIOS v2.04 STARTING...',
    'MEMORY TEST: 640K OK',
    'DETECTING DRIVES...',
    'C: FOUND - 20MB HDD',
    'LOADING SYSTEM...',
    'READY.'
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < bootMessages.length) {
        setLines(prev => [...prev, bootMessages[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full bg-black font-mono text-green-400 p-4 text-xs overflow-hidden">
      {lines.map((line, i) => (
        <div key={i} className="animate-pulse">{line}</div>
      ))}
      <span className="animate-blink">_</span>
      <style>{`
        @keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }
        .animate-blink { animation: blink 1s infinite; }
      `}</style>
    </div>
  );
};

// --- MATRIX COMPILER ---
export const MatrixCompiler = () => {
  const [chars, setChars] = useState<{char: string, x: number, y: number, speed: number}[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const matrixChars = '01アイウエオカキクケコ';
    const newChars = [];
    for (let i = 0; i < 30; i++) {
      newChars.push({
        char: matrixChars[Math.floor(Math.random() * matrixChars.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        speed: 0.5 + Math.random() * 2
      });
    }
    setChars(newChars);
  }, []);

  useGameLoop((dt) => {
    setChars(prev => prev.map(c => ({
      ...c,
      y: (c.y + c.speed * 0.1) % 100
    })));
  }, true);

  return (
    <div ref={containerRef} className="h-full bg-black relative overflow-hidden">
      {chars.map((c, i) => (
        <span
          key={i}
          className="absolute text-green-400 font-mono text-sm opacity-80"
          style={{ left: `${c.x}%`, top: `${c.y}%` }}
        >
          {c.char}
        </span>
      ))}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-green-300 font-mono text-lg bg-black/80 px-4 py-2 border border-green-500">
          COMPILING...
        </span>
      </div>
    </div>
  );
};

// --- ENCRYPTION HOVER ---
export const EncryptionHover = () => {
  const [isHovered, setIsHovered] = useState(false);
  const originalText = "SECRET DATA";
  const [displayText, setDisplayText] = useState(originalText);

  useEffect(() => {
    if (isHovered) {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%';
      const interval = setInterval(() => {
        setDisplayText(
          originalText.split('').map(() => chars[Math.floor(Math.random() * chars.length)]).join('')
        );
      }, 50);
      return () => clearInterval(interval);
    } else {
      setDisplayText(originalText);
    }
  }, [isHovered]);

  return (
    <div className="h-full bg-zinc-900 flex items-center justify-center p-4">
      <div
        className={`px-6 py-4 border-2 font-mono text-lg cursor-pointer transition-all ${
          isHovered ? 'border-red-500 text-red-400 bg-red-950/30' : 'border-green-500 text-green-400'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {displayText}
      </div>
    </div>
  );
};

// --- OSCILLOSCOPE ---
export const Oscilloscope = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState(0);

  useGameLoop((dt) => {
    setPhase(p => p + dt * 0.005);
  }, true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 2;
    ctx.beginPath();

    for (let x = 0; x < canvas.width; x++) {
      const y = canvas.height / 2 + Math.sin((x + phase) * 0.05) * 30;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Grid
    ctx.strokeStyle = '#0f0';
    ctx.lineWidth = 0.3;
    for (let x = 0; x < canvas.width; x += 20) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 20) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  }, [phase]);

  return (
    <div className="h-full bg-zinc-900 flex items-center justify-center p-4">
      <div className="border-4 border-zinc-700 rounded-lg overflow-hidden shadow-2xl">
        <canvas ref={canvasRef} width={200} height={100} />
      </div>
    </div>
  );
};

// --- JOYSTICK NAV ---
export const JoystickNav = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const x = Math.max(-1, Math.min(1, (e.clientX - rect.left - centerX) / 40));
    const y = Math.max(-1, Math.min(1, (e.clientY - rect.top - centerY) / 40));
    setPosition({ x, y });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div className="h-full bg-zinc-800 flex flex-col items-center justify-center p-4">
      <div
        className="w-24 h-24 bg-zinc-900 rounded-full border-4 border-zinc-600 relative cursor-pointer"
        onMouseDown={() => setIsDragging(true)}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          className="absolute w-10 h-10 bg-gradient-to-br from-red-500 to-red-700 rounded-full shadow-lg transition-all"
          style={{
            left: `calc(50% + ${position.x * 20}px - 20px)`,
            top: `calc(50% + ${position.y * 20}px - 20px)`,
            transitionDuration: isDragging ? '0s' : '0.2s'
          }}
        />
      </div>
      <div className="mt-4 font-mono text-green-400 text-xs">
        X: {position.x.toFixed(2)} Y: {position.y.toFixed(2)}
      </div>
    </div>
  );
};

// --- TERMINAL COMMAND ---
export const TerminalCommand = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string[]>(['> SYSTEM READY']);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && input.trim()) {
      const response = input.toLowerCase() === 'help'
        ? 'Available: help, clear, status'
        : input.toLowerCase() === 'status'
        ? 'All systems operational'
        : input.toLowerCase() === 'clear'
        ? ''
        : `Unknown command: ${input}`;

      if (input.toLowerCase() === 'clear') {
        setOutput([]);
      } else {
        setOutput(prev => [...prev, `> ${input}`, response]);
      }
      setInput('');
    }
  };

  return (
    <div className="h-full bg-black font-mono text-green-400 p-3 text-xs flex flex-col">
      <div className="flex-1 overflow-auto space-y-1">
        {output.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
      <div className="flex items-center border-t border-green-800 pt-2 mt-2">
        <span>$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none ml-2 text-green-300"
          placeholder="type help..."
        />
      </div>
    </div>
  );
};

// ============ TEXTURE DEMOS ============

import { Server, Wifi } from '../shared/icons';

// --- CIRCUIT BOARD STATUS ---
export const CircuitBoardStatus = () => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setActive(a => !a), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full bg-[#002200] flex items-center justify-center overflow-hidden">
      <div className="relative w-80 h-80">
        {/* PCB Board Texture */}
        <div className="absolute inset-0 bg-[#003300] border-4 border-[#004400] rounded-lg shadow-2xl opacity-80"
             style={{ backgroundImage: 'radial-gradient(#004400 1px, transparent 1px)', backgroundSize: '10px 10px' }}
        />

        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Traces */}
          <path
            d="M 40 40 H 100 V 150 H 200 V 240 H 260"
            fill="none"
            stroke="#005500"
            strokeWidth="4"
          />
          <path
            d="M 40 240 H 120 V 100 H 260"
            fill="none"
            stroke="#005500"
            strokeWidth="4"
          />

          {/* Active Data Flow */}
          <path
            d="M 40 40 H 100 V 150 H 200 V 240 H 260"
            fill="none"
            stroke="#00ff00"
            strokeWidth="2"
            strokeDasharray="10 20"
            className="animate-[dash_2s_linear_infinite]"
            filter="url(#glow)"
            opacity="0.8"
          />
          <path
            d="M 40 240 H 120 V 100 H 260"
            fill="none"
            stroke="#00ff00"
            strokeWidth="2"
            strokeDasharray="10 20"
            strokeDashoffset="100"
            className="animate-[dash_3s_linear_infinite]"
            filter="url(#glow)"
            opacity="0.8"
          />

          {/* Nodes */}
          <circle cx="40" cy="40" r="6" fill="#003300" stroke="#00ff00" strokeWidth="2" />
          <circle cx="260" cy="240" r="6" fill="#003300" stroke="#00ff00" strokeWidth="2" />
          <circle cx="40" cy="240" r="6" fill="#003300" stroke="#00ff00" strokeWidth="2" />
          <circle cx="260" cy="100" r="6" fill="#003300" stroke="#00ff00" strokeWidth="2" />
        </svg>

        {/* Components */}
        <div className="absolute top-[20px] left-[20px] w-12 h-12 bg-black border border-gray-600 flex items-center justify-center">
          <Server className="text-green-500 animate-pulse" size={24} />
        </div>
        <div className="absolute bottom-[20px] right-[20px] w-12 h-12 bg-black border border-gray-600 flex items-center justify-center">
          <Wifi className="text-green-500 animate-pulse" size={24} />
        </div>

        {/* Chip */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-[#111] border border-gray-700 flex flex-col items-center justify-center shadow-lg z-10">
           <span className="text-[8px] text-gray-400 mb-1">CPU_85</span>
           <div className="grid grid-cols-4 gap-1">
             {[...Array(16)].map((_, i) => <div key={i} className={`w-1 h-1 rounded-full ${Math.random() > 0.5 ? 'bg-green-500' : 'bg-gray-800'}`}></div>)}
           </div>
        </div>
      </div>

      <style>{`
        @keyframes dash {
          to { stroke-dashoffset: -100; }
        }
      `}</style>
    </div>
  );
};

// ============ TACTILE DEMOS ============

// --- INFINITE CHECKERED FLOOR ---
export const InfiniteFloor = () => {
  const [scroll, setScroll] = useState(0);

  return (
    <div
      className="relative h-full w-full bg-black overflow-y-auto"
      style={{ perspective: '800px' }}
      onScroll={(e) => setScroll(e.currentTarget.scrollTop)}
    >
      {/* The Floor */}
      <div
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[200vw] h-[100vh] origin-bottom transition-transform duration-100 pointer-events-none"
        style={{
          transform: `rotateX(60deg) translateY(${scroll % 100}px)`,
          backgroundImage: `
            linear-gradient(90deg, #33ff00 2px, transparent 2px),
            linear-gradient(#33ff00 2px, transparent 2px)
          `,
          backgroundSize: '100px 100px',
          opacity: 0.3
        }}
      />

      {/* Content Cards */}
      <div className="relative pt-[20vh] flex flex-col items-center gap-40 pb-40 min-h-[200vh]">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="w-80 h-96 bg-zinc-900 border-4 border-[#33ff00] text-[#33ff00] p-8 flex flex-col items-center justify-center text-center"
            style={{
              transform: `translateZ(${Math.max(0, 100 - (scroll / 10))}px)`,
              boxShadow: `0 0 50px rgba(51, 255, 0, ${0.1 + (i * 0.1)})`
            }}
          >
            <h2 className="text-4xl font-black mb-4 uppercase">MODULE 0{i}</h2>
            <p className="font-mono text-xs">CYBERSPACE PROTOCOL LOADED. PROCEED TO AUTHENTICATION.</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const hackerComponents = {
  'bios-boot': BiosBoot,
  'matrix-compiler': MatrixCompiler,
  'encryption-hover': EncryptionHover,
  'oscilloscope': Oscilloscope,
  'joystick-nav': JoystickNav,
  'terminal-command': TerminalCommand,
  // TextureDemos components
  'circuit-board-status': CircuitBoardStatus,
  // TactileDemos components
  'infinite-floor': InfiniteFloor,
};
