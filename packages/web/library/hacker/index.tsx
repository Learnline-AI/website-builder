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
    <div className="h-full bg-zinc-950 font-mono text-green-400 p-4 text-xs overflow-hidden">
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

  useGameLoop((_dt) => {
    setChars(prev => prev.map(c => ({
      ...c,
      y: (c.y + c.speed * 0.1) % 100
    })));
  }, true);

  return (
    <div ref={containerRef} className="h-full bg-zinc-950 relative overflow-hidden">
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
        <span className="text-green-300 font-mono text-lg bg-zinc-950/80 px-4 py-2 border border-green-500/70">
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

  useGameLoop((_dt) => {
    setPhase(p => p + _dt * 0.005);
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
    <div className="h-full bg-zinc-950 font-mono text-green-400 p-3 text-xs flex flex-col">
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
  const [_active, setActive] = useState(false);

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
        <div className="absolute top-[20px] left-[20px] w-12 h-12 bg-zinc-950 border border-gray-600 flex items-center justify-center">
          <Server className="text-green-500 pulse-subtle" size={24} />
        </div>
        <div className="absolute bottom-[20px] right-[20px] w-12 h-12 bg-zinc-950 border border-gray-600 flex items-center justify-center">
          <Wifi className="text-green-500 pulse-subtle" size={24} />
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
      className="relative h-full w-full bg-zinc-950 overflow-y-auto"
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

// --- COMMAND HISTORY ---
export const CommandHistory = () => {
  const [commands, setCommands] = useState<{cmd: string, time: string, status: 'success' | 'error' | 'warning'}[]>([
    { cmd: 'ssh root@192.168.1.1', time: '23:45:01', status: 'success' },
    { cmd: 'cat /etc/passwd', time: '23:45:12', status: 'success' },
    { cmd: 'rm -rf /var/log/*', time: '23:45:23', status: 'warning' },
    { cmd: 'nmap -sS 10.0.0.0/24', time: '23:45:34', status: 'success' },
    { cmd: 'sudo access denied', time: '23:45:45', status: 'error' },
  ]);
  const [newCmd, setNewCmd] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const addCommand = () => {
    if (!newCmd.trim()) return;
    const statuses: ('success' | 'error' | 'warning')[] = ['success', 'error', 'warning'];
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    setCommands(prev => [...prev, { cmd: newCmd, time, status: statuses[Math.floor(Math.random() * 3)] }]);
    setNewCmd('');
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [commands]);

  return (
    <div className="h-full bg-zinc-950 font-mono text-xs flex flex-col p-2">
      <div className="text-green-500 border-b border-green-900 pb-1 mb-2 flex items-center gap-2">
        <span className="text-green-300">[HISTORY]</span>
        <span className="text-green-700">SESSION_ID: 0x7F3A</span>
      </div>
      <div ref={scrollRef} className="flex-1 overflow-auto space-y-1 scrollbar-thin scrollbar-thumb-green-900">
        {commands.map((c, i) => (
          <div key={i} className="flex items-start gap-2 hover:bg-green-950/30 px-1 py-0.5 rounded">
            <span className="text-green-700 shrink-0">{c.time}</span>
            <span className={`shrink-0 w-2 h-2 rounded-full mt-1 ${
              c.status === 'success' ? 'bg-green-500' : c.status === 'error' ? 'bg-red-500' : 'bg-yellow-500'
            }`} />
            <span className={`${c.status === 'error' ? 'text-red-400' : c.status === 'warning' ? 'text-yellow-400' : 'text-green-400'}`}>
              {c.cmd}
            </span>
          </div>
        ))}
      </div>
      <div className="border-t border-green-900 pt-2 mt-2 flex gap-2">
        <span className="text-green-500">$</span>
        <input
          type="text"
          value={newCmd}
          onChange={e => setNewCmd(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addCommand()}
          className="flex-1 bg-transparent outline-none text-green-300"
          placeholder="enter command..."
        />
      </div>
      <style>{`
        .scrollbar-thin::-webkit-scrollbar { width: 4px; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background: #14532d; border-radius: 2px; }
        .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
      `}</style>
    </div>
  );
};

// --- NETWORK GRAPH ---
export const NetworkGraph = () => {
  const [nodes] = useState([
    { id: 'server', x: 50, y: 30, label: 'MAIN', type: 'server' },
    { id: 'node1', x: 20, y: 60, label: 'N01', type: 'node' },
    { id: 'node2', x: 50, y: 70, label: 'N02', type: 'node' },
    { id: 'node3', x: 80, y: 60, label: 'N03', type: 'node' },
    { id: 'client1', x: 10, y: 85, label: 'C01', type: 'client' },
    { id: 'client2', x: 35, y: 90, label: 'C02', type: 'client' },
    { id: 'client3', x: 65, y: 90, label: 'C03', type: 'client' },
    { id: 'client4', x: 90, y: 85, label: 'C04', type: 'client' },
  ]);
  const [activeConnection, setActiveConnection] = useState(0);
  const connections = [
    ['server', 'node1'], ['server', 'node2'], ['server', 'node3'],
    ['node1', 'client1'], ['node1', 'client2'], ['node2', 'client2'], ['node2', 'client3'],
    ['node3', 'client3'], ['node3', 'client4']
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveConnection(prev => (prev + 1) % connections.length);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const getNode = (id: string) => nodes.find(n => n.id === id)!;

  return (
    <div className="h-full bg-zinc-950 relative overflow-hidden">
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <filter id="netglow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        {connections.map(([from, to], i) => {
          const n1 = getNode(from);
          const n2 = getNode(to);
          const isActive = i === activeConnection;
          return (
            <g key={i}>
              <line
                x1={`${n1.x}%`} y1={`${n1.y}%`}
                x2={`${n2.x}%`} y2={`${n2.y}%`}
                stroke={isActive ? '#00ff00' : '#003300'}
                strokeWidth={isActive ? 2 : 1}
                filter={isActive ? 'url(#netglow)' : undefined}
              />
              {isActive && (
                <circle r="4" fill="#00ff00" filter="url(#netglow)">
                  <animate attributeName="cx" from={`${n1.x}%`} to={`${n2.x}%`} dur="0.5s" fill="freeze" />
                  <animate attributeName="cy" from={`${n1.y}%`} to={`${n2.y}%`} dur="0.5s" fill="freeze" />
                </circle>
              )}
            </g>
          );
        })}
        {nodes.map(node => (
          <g key={node.id}>
            <circle
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r={node.type === 'server' ? 16 : node.type === 'node' ? 12 : 8}
              fill="#001100"
              stroke="#00ff00"
              strokeWidth={2}
              className="animate-pulse"
            />
            <text
              x={`${node.x}%`}
              y={`${node.y}%`}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#00ff00"
              fontSize={node.type === 'server' ? 10 : 8}
              fontFamily="monospace"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
      <div className="absolute top-2 left-2 text-green-500 font-mono text-xs">
        <div>NETWORK TOPOLOGY</div>
        <div className="text-green-700">NODES: {nodes.length} | ACTIVE</div>
      </div>
    </div>
  );
};

// --- PASSWORD CRACKER ---
export const PasswordCracker = () => {
  const [password, setPassword] = useState('**********');
  const [cracked, setCracked] = useState<boolean[]>(Array(10).fill(false));
  const [isCracking, setIsCracking] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const targetPassword = 'H4CK3D_P4SS';

  const startCracking = () => {
    if (isCracking) return;
    setIsCracking(true);
    setCracked(Array(10).fill(false));
    setPassword('**********');
    setAttempts(0);
  };

  useEffect(() => {
    if (!isCracking) return;
    const interval = setInterval(() => {
      setAttempts(prev => prev + Math.floor(Math.random() * 1000));
      setPassword(prev => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*_';
        return prev.split('').map((_, i) => cracked[i] ? targetPassword[i] : chars[Math.floor(Math.random() * chars.length)]).join('');
      });
    }, 50);

    const crackInterval = setInterval(() => {
      setCracked(prev => {
        const nextIndex = prev.findIndex(c => !c);
        if (nextIndex === -1) {
          setIsCracking(false);
          clearInterval(interval);
          clearInterval(crackInterval);
          setPassword(targetPassword);
          return prev;
        }
        const newCracked = [...prev];
        newCracked[nextIndex] = true;
        return newCracked;
      });
    }, 800);

    return () => {
      clearInterval(interval);
      clearInterval(crackInterval);
    };
  }, [isCracking, cracked]);

  return (
    <div className="h-full bg-zinc-950 font-mono p-4 flex flex-col items-center justify-center">
      <div className="text-green-500 text-xs mb-4">PASSWORD CRACKER v2.1</div>
      <div className="flex gap-1 mb-4">
        {password.split('').map((char, i) => (
          <div
            key={i}
            className={`w-6 h-8 flex items-center justify-center border text-lg ${
              cracked[i]
                ? 'border-green-500 text-green-400 bg-green-950/50'
                : 'border-green-900 text-green-600 bg-zinc-950'
            }`}
          >
            {char}
          </div>
        ))}
      </div>
      <div className="text-green-700 text-xs mb-4">
        ATTEMPTS: {attempts.toLocaleString()}
      </div>
      <button
        onClick={startCracking}
        disabled={isCracking}
        className={`px-4 py-2 border text-xs transition-all ${
          isCracking
            ? 'border-yellow-500 text-yellow-500 animate-pulse'
            : 'border-green-500 text-green-500 hover:bg-green-950'
        }`}
      >
        {isCracking ? 'CRACKING...' : 'INITIATE CRACK'}
      </button>
      <style>{`
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
};

// --- SYSTEM MONITOR ---
export const SystemMonitor = () => {
  const [stats, setStats] = useState({
    cpu: 45,
    ram: 62,
    network: 23,
    disk: 78
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        cpu: Math.max(10, Math.min(95, prev.cpu + (Math.random() - 0.5) * 20)),
        ram: Math.max(30, Math.min(90, prev.ram + (Math.random() - 0.5) * 10)),
        network: Math.max(5, Math.min(100, prev.network + (Math.random() - 0.5) * 30)),
        disk: Math.max(60, Math.min(95, prev.disk + (Math.random() - 0.5) * 5)),
      }));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const StatBar = ({ label, value, color }: { label: string; value: number; color: string }) => (
    <div className="mb-3">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-green-500">{label}</span>
        <span className={color}>{Math.round(value)}%</span>
      </div>
      <div className="h-3 bg-green-950 border border-green-900 overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${color.replace('text-', 'bg-')}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className="h-full bg-zinc-950 font-mono p-3 text-xs">
      <div className="text-green-400 border-b border-green-900 pb-2 mb-3 flex items-center gap-2">
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        SYSTEM MONITOR
      </div>
      <StatBar label="CPU" value={stats.cpu} color={stats.cpu > 80 ? 'text-red-500' : stats.cpu > 60 ? 'text-yellow-500' : 'text-green-500'} />
      <StatBar label="RAM" value={stats.ram} color={stats.ram > 80 ? 'text-red-500' : stats.ram > 60 ? 'text-yellow-500' : 'text-green-500'} />
      <StatBar label="NET" value={stats.network} color="text-cyan-500" />
      <StatBar label="DISK" value={stats.disk} color={stats.disk > 90 ? 'text-red-500' : 'text-green-500'} />
      <div className="mt-4 pt-2 border-t border-green-900 grid grid-cols-2 gap-2 text-green-700">
        <div>UPTIME: 72:34:12</div>
        <div>TEMP: 47C</div>
        <div>PID: 31337</div>
        <div>THREADS: 128</div>
      </div>
    </div>
  );
};

// --- FILE TREE ---
export const FileTree = () => {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(['/', '/home', '/home/hacker']));
  const [selected, setSelected] = useState('/home/hacker/secrets.txt');

  const tree = {
    '/': {
      type: 'folder',
      children: {
        'home': {
          type: 'folder',
          children: {
            'hacker': {
              type: 'folder',
              children: {
                'secrets.txt': { type: 'file', size: '2.4K' },
                'payload.sh': { type: 'file', size: '512B' },
                'config': {
                  type: 'folder',
                  children: {
                    '.bashrc': { type: 'file', size: '1.2K' },
                    '.ssh': { type: 'folder', children: { 'id_rsa': { type: 'file', size: '3.2K' } } }
                  }
                }
              }
            }
          }
        },
        'etc': {
          type: 'folder',
          children: {
            'passwd': { type: 'file', size: '4.8K' },
            'shadow': { type: 'file', size: '1.1K', locked: true }
          }
        },
        'var': {
          type: 'folder',
          children: {
            'log': {
              type: 'folder',
              children: {
                'syslog': { type: 'file', size: '128K' },
                'auth.log': { type: 'file', size: '64K' }
              }
            }
          }
        }
      }
    }
  };

  const toggleFolder = (path: string) => {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  };

  const renderNode = (name: string, node: any, path: string, depth: number = 0) => {
    const fullPath = path === '/' ? `/${name}` : `${path}/${name}`;
    const isExpanded = expanded.has(fullPath);
    const isSelected = selected === fullPath;

    if (node.type === 'folder') {
      return (
        <div key={fullPath}>
          <div
            className={`flex items-center gap-1 py-0.5 px-1 cursor-pointer hover:bg-green-950/50 ${isSelected ? 'bg-green-900/50' : ''}`}
            style={{ paddingLeft: `${depth * 12 + 4}px` }}
            onClick={() => { toggleFolder(fullPath); setSelected(fullPath); }}
          >
            <span className="text-yellow-500">{isExpanded ? '[-]' : '[+]'}</span>
            <span className="text-green-400">{name === '' ? '/' : name}/</span>
          </div>
          {isExpanded && node.children && Object.entries(node.children).map(([childName, childNode]) =>
            renderNode(childName, childNode, fullPath, depth + 1)
          )}
        </div>
      );
    }

    return (
      <div
        key={fullPath}
        className={`flex items-center justify-between py-0.5 px-1 cursor-pointer hover:bg-green-950/50 ${isSelected ? 'bg-green-900/50' : ''}`}
        style={{ paddingLeft: `${depth * 12 + 16}px` }}
        onClick={() => setSelected(fullPath)}
      >
        <span className={node.locked ? 'text-red-500' : 'text-green-300'}>
          {node.locked && '🔒 '}{name}
        </span>
        <span className="text-green-700 text-[10px]">{node.size}</span>
      </div>
    );
  };

  return (
    <div className="h-full bg-zinc-950 font-mono text-xs overflow-auto">
      <div className="text-green-500 border-b border-green-900 p-2 sticky top-0 bg-zinc-950">
        FILE SYSTEM BROWSER
      </div>
      <div className="p-1">
        {renderNode('', tree['/'], '')}
      </div>
      {selected && (
        <div className="sticky bottom-0 bg-green-950/80 border-t border-green-900 p-2 text-green-400">
          {selected}
        </div>
      )}
    </div>
  );
};

// --- IP TRACER ---
export const IPTracer = () => {
  const [tracing, setTracing] = useState(false);
  const [currentHop, setCurrentHop] = useState(0);
  const hops = [
    { ip: '192.168.1.1', loc: 'LOCAL GATEWAY', x: 10, y: 50 },
    { ip: '72.14.192.1', loc: 'ISP NODE', x: 25, y: 30 },
    { ip: '142.250.80.14', loc: 'GOOGLE DNS', x: 40, y: 60 },
    { ip: '52.84.125.204', loc: 'AWS EDGE', x: 55, y: 25 },
    { ip: '104.244.42.193', loc: 'TWITTER CDN', x: 70, y: 55 },
    { ip: '31.13.72.36', loc: 'TARGET FOUND', x: 90, y: 40 },
  ];

  const startTrace = () => {
    if (tracing) return;
    setTracing(true);
    setCurrentHop(0);
  };

  useEffect(() => {
    if (!tracing) return;
    if (currentHop >= hops.length) {
      setTracing(false);
      return;
    }
    const timeout = setTimeout(() => {
      setCurrentHop(prev => prev + 1);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [tracing, currentHop]);

  return (
    <div className="h-full bg-zinc-950 font-mono p-3 flex flex-col">
      <div className="text-green-500 text-xs mb-2 flex justify-between items-center">
        <span>IP TRACER v1.0</span>
        <button
          onClick={startTrace}
          className={`px-2 py-1 border text-[10px] ${tracing ? 'border-yellow-500 text-yellow-500 animate-pulse' : 'border-green-500 text-green-500 hover:bg-green-950'}`}
        >
          {tracing ? 'TRACING...' : 'TRACE'}
        </button>
      </div>
      <div className="flex-1 relative border border-green-900 bg-green-950/20 rounded overflow-hidden">
        <svg className="absolute inset-0 w-full h-full">
          {hops.slice(0, currentHop).map((hop, i) => {
            if (i === 0) return null;
            const prev = hops[i - 1];
            return (
              <line
                key={i}
                x1={`${prev.x}%`} y1={`${prev.y}%`}
                x2={`${hop.x}%`} y2={`${hop.y}%`}
                stroke="#00ff00"
                strokeWidth="2"
                strokeDasharray="5,5"
                className="animate-[dash_1s_linear_infinite]"
              />
            );
          })}
          {hops.map((hop, i) => (
            <g key={i}>
              <circle
                cx={`${hop.x}%`}
                cy={`${hop.y}%`}
                r={i < currentHop ? 8 : 6}
                fill={i < currentHop ? '#00ff00' : '#003300'}
                stroke={i < currentHop ? '#00ff00' : '#005500'}
                strokeWidth="2"
                className={i === currentHop - 1 ? 'animate-ping' : ''}
              />
              {i < currentHop && (
                <text
                  x={`${hop.x}%`}
                  y={`${hop.y + 12}%`}
                  textAnchor="middle"
                  fill="#00ff00"
                  fontSize="8"
                  fontFamily="monospace"
                >
                  {hop.ip}
                </text>
              )}
            </g>
          ))}
        </svg>
      </div>
      <div className="mt-2 text-[10px] space-y-1 max-h-20 overflow-auto">
        {hops.slice(0, currentHop).map((hop, i) => (
          <div key={i} className="flex gap-2 text-green-400">
            <span className="text-green-700">{i + 1}.</span>
            <span className="text-green-500">{hop.ip}</span>
            <span className="text-green-700">{hop.loc}</span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes dash { to { stroke-dashoffset: -10; } }
      `}</style>
    </div>
  );
};

// --- CODE INJECTOR ---
export const CodeInjector = () => {
  const [injecting, setInjecting] = useState(false);
  const [lines, setLines] = useState<string[]>([]);
  const codeSnippets = [
    '<span class="text-purple-400">function</span> <span class="text-yellow-400">exploit</span>() {',
    '  <span class="text-purple-400">const</span> payload = <span class="text-green-400">"\\x90\\x90\\x90"</span>;',
    '  <span class="text-purple-400">const</span> buffer = <span class="text-cyan-400">Buffer</span>.<span class="text-yellow-400">alloc</span>(<span class="text-orange-400">1024</span>);',
    '  buffer.<span class="text-yellow-400">write</span>(payload, <span class="text-orange-400">0</span>);',
    '  <span class="text-purple-400">return</span> <span class="text-yellow-400">inject</span>(buffer);',
    '}',
    '',
    '<span class="text-gray-500">// Shellcode injection</span>',
    '<span class="text-purple-400">async</span> <span class="text-purple-400">function</span> <span class="text-yellow-400">main</span>() {',
    '  <span class="text-purple-400">await</span> <span class="text-yellow-400">exploit</span>();',
    '  <span class="text-cyan-400">console</span>.<span class="text-yellow-400">log</span>(<span class="text-green-400">"[+] Injected!"</span>);',
    '}',
  ];

  const startInjection = () => {
    if (injecting) return;
    setInjecting(true);
    setLines([]);
  };

  useEffect(() => {
    if (!injecting) return;
    if (lines.length >= codeSnippets.length) {
      setInjecting(false);
      return;
    }
    const timeout = setTimeout(() => {
      setLines(prev => [...prev, codeSnippets[prev.length]]);
    }, 200);
    return () => clearTimeout(timeout);
  }, [injecting, lines]);

  return (
    <div className="h-full bg-zinc-950 font-mono text-xs flex flex-col">
      <div className="flex items-center justify-between px-3 py-2 bg-zinc-900 border-b border-green-900">
        <span className="text-green-500">CODE INJECTOR</span>
        <button
          onClick={startInjection}
          className={`px-2 py-1 border text-[10px] rounded ${injecting ? 'border-red-500 text-red-500 animate-pulse' : 'border-green-500 text-green-500 hover:bg-green-950'}`}
        >
          {injecting ? 'INJECTING...' : 'INJECT'}
        </button>
      </div>
      <div className="flex-1 overflow-auto p-2 bg-zinc-950">
        <div className="relative">
          {lines.map((line, i) => (
            <div key={i} className="flex">
              <span className="text-green-700 w-6 text-right mr-3 select-none">{i + 1}</span>
              <span dangerouslySetInnerHTML={{ __html: line || '&nbsp;' }} />
            </div>
          ))}
          {injecting && (
            <span className="inline-block w-2 h-4 bg-green-500 animate-blink ml-6" />
          )}
        </div>
      </div>
      <div className={`px-3 py-1 text-[10px] ${lines.length === codeSnippets.length ? 'bg-green-900/50 text-green-400' : 'bg-zinc-900 text-green-700'}`}>
        {lines.length === codeSnippets.length ? '[+] INJECTION COMPLETE' : `PROGRESS: ${Math.round((lines.length / codeSnippets.length) * 100)}%`}
      </div>
      <style>{`
        @keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }
        .animate-blink { animation: blink 0.5s infinite; }
      `}</style>
    </div>
  );
};

// --- FIREWALL STATUS ---
export const FirewallStatus = () => {
  const [ports, setPorts] = useState([
    { port: 22, name: 'SSH', status: 'secure' },
    { port: 80, name: 'HTTP', status: 'secure' },
    { port: 443, name: 'HTTPS', status: 'secure' },
    { port: 3306, name: 'MySQL', status: 'secure' },
    { port: 8080, name: 'Proxy', status: 'secure' },
    { port: 6379, name: 'Redis', status: 'secure' },
  ]);
  const [alerts, setAlerts] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPorts(prev => prev.map(p => ({
        ...p,
        status: Math.random() > 0.92 ? 'breach' : Math.random() > 0.85 ? 'warning' : 'secure'
      })));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const breached = ports.filter(p => p.status === 'breach');
    if (breached.length > 0) {
      const time = new Date().toLocaleTimeString();
      setAlerts(prev => [...prev.slice(-4), `[${time}] BREACH DETECTED: Port ${breached[0].port}`]);
    }
  }, [ports]);

  return (
    <div className="h-full bg-zinc-950 font-mono text-xs flex flex-col p-2">
      <div className="flex items-center justify-between border-b border-green-900 pb-2 mb-2">
        <span className="text-green-500">FIREWALL STATUS</span>
        <span className={`px-2 py-0.5 rounded text-[10px] ${ports.some(p => p.status === 'breach') ? 'bg-red-900 text-red-400 animate-pulse' : 'bg-green-900 text-green-400'}`}>
          {ports.some(p => p.status === 'breach') ? 'COMPROMISED' : 'SECURE'}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-2">
        {ports.map(p => (
          <div
            key={p.port}
            className={`p-2 border rounded ${
              p.status === 'breach' ? 'border-red-500 bg-red-950/30' :
              p.status === 'warning' ? 'border-yellow-500 bg-yellow-950/30' :
              'border-green-900 bg-green-950/20'
            }`}
          >
            <div className="flex justify-between items-center">
              <span className={p.status === 'breach' ? 'text-red-400' : p.status === 'warning' ? 'text-yellow-400' : 'text-green-400'}>
                :{p.port}
              </span>
              <span className={`w-2 h-2 rounded-full ${
                p.status === 'breach' ? 'bg-red-500 animate-ping' :
                p.status === 'warning' ? 'bg-yellow-500 animate-pulse' :
                'bg-green-500'
              }`} />
            </div>
            <div className="text-green-700 text-[10px]">{p.name}</div>
          </div>
        ))}
      </div>
      <div className="flex-1 border border-green-900 bg-green-950/20 p-2 overflow-auto">
        <div className="text-green-700 mb-1">ALERTS:</div>
        {alerts.length === 0 ? (
          <div className="text-green-800">No alerts</div>
        ) : (
          alerts.map((alert, i) => (
            <div key={i} className="text-red-400 text-[10px]">{alert}</div>
          ))
        )}
      </div>
    </div>
  );
};

// --- DATA PACKETS ---
export const DataPackets = () => {
  const [packets, setPackets] = useState<{id: number, x: number, y: number, targetNode: number, speed: number, color: string}[]>([]);
  const nodes = [
    { x: 10, y: 50, label: 'SRC' },
    { x: 30, y: 20, label: 'R1' },
    { x: 30, y: 80, label: 'R2' },
    { x: 50, y: 50, label: 'SW' },
    { x: 70, y: 30, label: 'R3' },
    { x: 70, y: 70, label: 'R4' },
    { x: 90, y: 50, label: 'DST' },
  ];
  const routes = [
    [0, 1, 3, 4, 6],
    [0, 2, 3, 5, 6],
    [0, 1, 3, 5, 6],
  ];
  const packetIdRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const colors = ['#00ff00', '#00ffff', '#ff00ff', '#ffff00'];
      setPackets(prev => [...prev, {
        id: packetIdRef.current++,
        x: nodes[0].x,
        y: nodes[0].y,
        targetNode: 1,
        speed: 0.5 + Math.random() * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)]
      }].slice(-15));
    }, 800);
    return () => clearInterval(interval);
  }, []);

  useGameLoop(() => {
    setPackets(prev => prev.map(p => {
      const route = routes.find(r => r.includes(p.targetNode - 1)) || routes[0];
      const targetIdx = route.indexOf(p.targetNode);
      if (targetIdx === -1 || p.targetNode >= nodes.length) return null;

      const target = nodes[route[targetIdx]];
      const dx = target.x - p.x;
      const dy = target.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 2) {
        const nextTarget = route[targetIdx + 1];
        if (nextTarget === undefined) return null;
        return { ...p, targetNode: nextTarget };
      }

      return {
        ...p,
        x: p.x + (dx / dist) * p.speed,
        y: p.y + (dy / dist) * p.speed
      };
    }).filter(Boolean) as typeof prev);
  }, true);

  return (
    <div className="h-full bg-zinc-950 relative overflow-hidden">
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <filter id="packetglow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        {/* Connections */}
        {[[0,1],[0,2],[1,3],[2,3],[3,4],[3,5],[4,6],[5,6]].map(([a, b], i) => (
          <line
            key={i}
            x1={`${nodes[a].x}%`} y1={`${nodes[a].y}%`}
            x2={`${nodes[b].x}%`} y2={`${nodes[b].y}%`}
            stroke="#003300"
            strokeWidth="2"
          />
        ))}
        {/* Nodes */}
        {nodes.map((node, i) => (
          <g key={i}>
            <rect
              x={`${node.x - 4}%`}
              y={`${node.y - 4}%`}
              width="8%"
              height="8%"
              fill="#001100"
              stroke="#00ff00"
              strokeWidth="1"
            />
            <text
              x={`${node.x}%`}
              y={`${node.y}%`}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#00ff00"
              fontSize="8"
              fontFamily="monospace"
            >
              {node.label}
            </text>
          </g>
        ))}
        {/* Packets */}
        {packets.map(p => (
          <circle
            key={p.id}
            cx={`${p.x}%`}
            cy={`${p.y}%`}
            r="4"
            fill={p.color}
            filter="url(#packetglow)"
          />
        ))}
      </svg>
      <div className="absolute top-2 left-2 text-green-500 font-mono text-xs">
        DATA FLOW: {packets.length} PACKETS
      </div>
    </div>
  );
};

// --- ACCESS DENIED ---
export const AccessDenied = () => {
  const [glitch, setGlitch] = useState(false);
  const [showSkull, setShowSkull] = useState(false);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 3000);

    const skullTimeout = setTimeout(() => setShowSkull(true), 500);

    return () => {
      clearInterval(glitchInterval);
      clearTimeout(skullTimeout);
    };
  }, []);

  return (
    <div className="h-full bg-zinc-950 relative overflow-hidden flex items-center justify-center">
      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 0, 0.1) 2px, rgba(0, 255, 0, 0.1) 4px)'
        }}
      />

      {/* Glitch overlay */}
      {glitch && (
        <div className="absolute inset-0 flex">
          <div className="w-1/3 h-full bg-red-500/20 translate-x-2" />
          <div className="w-1/3 h-full bg-cyan-500/20 -translate-x-2" />
        </div>
      )}

      <div className={`text-center ${glitch ? 'translate-x-1' : ''}`}>
        {/* ASCII Skull */}
        {showSkull && (
          <pre className="text-red-500 text-[8px] md:text-xs mb-4 animate-pulse font-mono leading-tight">
{`    ___
   /   \\
  | o o |
  |  ^  |
   \\___/
`}
          </pre>
        )}

        {/* Main text */}
        <div className={`relative ${glitch ? 'animate-glitch' : ''}`}>
          <h1 className="text-red-500 text-2xl md:text-4xl font-mono font-bold tracking-widest">
            ACCESS DENIED
          </h1>
          {glitch && (
            <>
              <h1 className="absolute top-0 left-0 text-cyan-500 text-2xl md:text-4xl font-mono font-bold tracking-widest opacity-70 -translate-x-1">
                ACCESS DENIED
              </h1>
              <h1 className="absolute top-0 left-0 text-red-500 text-2xl md:text-4xl font-mono font-bold tracking-widest opacity-70 translate-x-1">
                ACCESS DENIED
              </h1>
            </>
          )}
        </div>

        <div className="mt-4 text-green-500 font-mono text-xs md:text-sm animate-pulse">
          UNAUTHORIZED ACCESS ATTEMPT LOGGED
        </div>

        <div className="mt-2 text-green-700 font-mono text-[10px] md:text-xs">
          ERROR CODE: 0x0000DEAD
        </div>

        {/* Flashing warning */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <span className="w-3 h-3 bg-red-500 rounded-full animate-ping" />
          <span className="text-red-400 font-mono text-xs animate-pulse">SECURITY ALERT</span>
          <span className="w-3 h-3 bg-red-500 rounded-full animate-ping" />
        </div>
      </div>

      <style>{`
        @keyframes glitch {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
        }
        .animate-glitch { animation: glitch 0.15s infinite; }
      `}</style>
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
  // New hacker components
  'command-history': CommandHistory,
  'network-graph': NetworkGraph,
  'password-cracker': PasswordCracker,
  'system-monitor': SystemMonitor,
  'file-tree': FileTree,
  'ip-tracer': IPTracer,
  'code-injector': CodeInjector,
  'firewall-status': FirewallStatus,
  'data-packets': DataPackets,
  'access-denied': AccessDenied,
};
