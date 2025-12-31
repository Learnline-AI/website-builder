import React, { useState, useRef } from 'react';
import { RefreshCw, Lightbulb, Puzzle, Sparkles, Zap, Check, LayoutDashboard, Library, FileText, PieChart, Settings, PlayCircle, Trophy, User, Search, Menu, X, Calendar, Clock, LogOut, Scissors, Copy, Info, Maximize2, ExternalLink, Target, AlertCircle, BarChart3 } from '../shared/icons';

// --- MIRROR MODE ---
export const MirrorMode = () => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="h-full bg-gradient-to-br from-white to-gray-200 flex flex-col items-center justify-center p-4">
      <div className="relative w-full max-w-xs h-40" style={{ perspective: '1000px' }}>
        <div className="absolute inset-0 border-4 border-gray-700 rounded-lg z-10 pointer-events-none" />
        <div className={`relative w-full h-full transition-transform duration-1000 ${flipped ? 'rotate-y-180' : ''}`} style={{ transformStyle: 'preserve-3d' }}>
          <div className="absolute inset-0 bg-white flex items-center justify-center p-4 backface-hidden">
            <div>
              <h2 className="text-lg font-black text-blue-800">ORIGINAL</h2>
              <p className="text-xs text-gray-600 mt-1">Current state</p>
            </div>
          </div>
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center p-4 backface-hidden" style={{ transform: 'rotateY(180deg)' }}>
            <div>
              <h2 className="text-lg font-black text-orange-800">REFLECTION</h2>
              <p className="text-xs text-gray-600 mt-1">Mirror view</p>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => setFlipped(!flipped)}
        className="mt-4 px-4 py-2 bg-purple-600 text-white font-bold rounded text-xs flex items-center gap-2"
      >
        <RefreshCw size={14} />
        {flipped ? 'VIEW ORIGINAL' : 'VIEW REFLECTION'}
      </button>
    </div>
  );
};

// --- SHADOW DEPTH ---
export const ShadowDepth = () => {
  const [lightPos, setLightPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setLightPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const getShadow = () => {
    const dx = lightPos.x - 50;
    const dy = lightPos.y - 50;
    return `${-dx * 0.5}px ${-dy * 0.5}px 20px rgba(0,0,0,0.4)`;
  };

  return (
    <div
      className="h-full bg-gradient-to-br from-indigo-900 to-black relative flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <div className="w-32 h-32 bg-gray-800 rounded-lg flex items-center justify-center shadow-xl transition-all duration-100" style={{ boxShadow: getShadow() }}>
        <span className="text-white font-bold text-sm">3D BOX</span>
      </div>
      <Lightbulb
        className="absolute text-yellow-300 pulse-subtle pointer-events-none"
        size={24}
        style={{ left: `calc(${lightPos.x}% - 12px)`, top: `calc(${lightPos.y}% - 12px)` }}
      />
    </div>
  );
};

// --- LIQUID CRYSTAL ---
export const LiquidCrystal = () => {
  const [pressed, setPressed] = useState<{ [key: string]: boolean }>({});
  const buttons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'];

  const handlePress = (key: string) => {
    setPressed(prev => ({ ...prev, [key]: true }));
    setTimeout(() => setPressed(prev => ({ ...prev, [key]: false })), 200);
  };

  return (
    <div className="h-full bg-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-[180px] bg-gray-900 border-4 border-gray-700 rounded-xl p-3 grid grid-cols-3 gap-2">
        {buttons.map((key) => (
          <div
            key={key}
            onMouseDown={() => handlePress(key)}
            className="relative w-12 h-12 bg-gray-700 border-2 border-gray-600 rounded-lg flex items-center justify-center text-white text-lg font-black cursor-pointer select-none active:translate-y-0.5"
          >
            {key}
            {pressed[key] && (
              <div className="absolute inset-0 rounded-lg bg-purple-500/50 animate-ping" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// --- THERMAL PAPER ---
export const ThermalPaper = () => {
  const [revealed, setRevealed] = useState(false);
  const lines = ['RECEIPT', '--------', 'ITEM: ART', 'TOTAL: FREE', '--------', 'THANK YOU'];

  return (
    <div className="h-full bg-zinc-950 flex flex-col items-center justify-center p-4">
      <div className="relative w-full max-w-xs h-48 bg-white border-4 border-gray-300 shadow-2xl overflow-hidden">
        <div className={`absolute top-0 left-0 w-full h-4 bg-black/50 z-10 transition-transform duration-1000 ${revealed ? 'translate-y-44' : ''}`} />
        <div className="p-4 text-black font-mono text-center">
          {lines.map((line, i) => (
            <p
              key={i}
              className={`text-sm transition-opacity duration-100 ${revealed ? 'opacity-100' : 'opacity-0'}`}
              style={{ transitionDelay: revealed ? `${i * 100}ms` : '0ms' }}
            >
              {line}
            </p>
          ))}
        </div>
      </div>
      <button onClick={() => setRevealed(true)} className="mt-4 px-4 py-2 bg-green-600 text-white rounded text-xs font-bold">
        PRINT
      </button>
    </div>
  );
};

// --- PUZZLE MODULES ---
export const PuzzleModules = () => {
  const [pieces, setPieces] = useState([
    { id: 1, pos: { x: 20, y: 30 }, slot: { x: 60, y: 50 }, locked: false, color: 'bg-red-400' },
    { id: 2, pos: { x: 70, y: 20 }, slot: { x: 120, y: 50 }, locked: false, color: 'bg-blue-400' },
  ]);
  const [dragId, setDragId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragId === null || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPieces(prev => prev.map(p => p.id === dragId && !p.locked ? { ...p, pos: { x, y } } : p));
  };

  const handleMouseUp = () => {
    if (dragId !== null) {
      setPieces(prev => prev.map(p => {
        if (p.id === dragId && !p.locked) {
          const dx = p.pos.x - p.slot.x;
          const dy = p.pos.y - p.slot.y;
          if (Math.abs(dx) < 20 && Math.abs(dy) < 20) {
            return { ...p, pos: p.slot, locked: true };
          }
        }
        return p;
      }));
    }
    setDragId(null);
  };

  return (
    <div
      ref={containerRef}
      className="relative h-full bg-zinc-800 p-4 overflow-hidden select-none"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Slots */}
      {pieces.map(p => (
        <div key={`slot-${p.id}`} className="absolute w-12 h-12 bg-zinc-600/50 border-2 border-dashed border-zinc-500 rounded" style={{ left: p.slot.x - 24, top: p.slot.y - 24 }} />
      ))}
      {/* Pieces */}
      {pieces.map(p => (
        <div
          key={p.id}
          onMouseDown={() => !p.locked && setDragId(p.id)}
          className={`absolute w-12 h-12 ${p.color} rounded shadow-lg flex items-center justify-center font-bold text-white cursor-grab ${p.locked ? 'ring-2 ring-green-400' : ''}`}
          style={{ left: p.pos.x - 24, top: p.pos.y - 24, transition: p.locked ? 'all 0.2s' : 'none' }}
        >
          {p.id}
          {p.locked && <Puzzle size={12} className="absolute -bottom-1 -right-1 text-green-500" />}
        </div>
      ))}
      <p className="absolute bottom-2 left-2 text-zinc-400 font-mono text-xs">DRAG TO SLOTS</p>
    </div>
  );
};

// --- COLOR PALETTE ---
export const ColorPalette = () => {
  const [selected, setSelected] = useState('#ef4444');
  const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899'];

  return (
    <div className="h-full bg-zinc-100 flex flex-col items-center justify-center p-4">
      <div className="flex gap-2 mb-4">
        {colors.map(color => (
          <div
            key={color}
            onClick={() => setSelected(color)}
            className={`w-8 h-8 rounded-full cursor-pointer transition-transform ${selected === color ? 'scale-125 ring-2 ring-black' : 'hover:scale-110'}`}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
      <div className="w-24 h-24 rounded-lg shadow-lg" style={{ backgroundColor: selected }} />
      <p className="mt-2 font-mono text-xs text-zinc-500">{selected}</p>
    </div>
  );
};

// --- CANVAS BRUSH ---
export const CanvasBrush = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.fillStyle = '#3b82f6';
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
  };

  return (
    <div className="h-full bg-white flex items-center justify-center p-4">
      <canvas
        ref={canvasRef}
        width={200}
        height={150}
        className="border-2 border-gray-300 rounded cursor-crosshair bg-gray-50"
        onMouseDown={() => setIsDrawing(true)}
        onMouseUp={() => setIsDrawing(false)}
        onMouseLeave={() => setIsDrawing(false)}
        onMouseMove={draw}
      />
    </div>
  );
};

// ============ DATA TOOLS DEMOS - POLAROID DEVELOPER ============

// --- POLAROID DEVELOPER ---
export const PolaroidDeveloper = () => {
  const [developed, setDeveloped] = useState(false);

  return (
    <div className="h-full bg-neutral-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-3 pb-10 shadow-2xl border border-neutral-300 transform rotate-2">
        <div className="relative w-48 h-48 bg-black overflow-hidden border-2 border-neutral-200">
          {/* The Image */}
          <div
            className={`w-full h-full transition-all duration-[4000ms] ease-out
              ${developed ? 'opacity-100' : 'opacity-0 brightness-0 blur-xl'}
            `}
            style={{
              background: 'linear-gradient(135deg, #fbbf24 0%, #ef4444 50%, #8b5cf6 100%)',
            }}
          >
            <div className="w-full h-full flex items-center justify-center text-white font-black text-2xl">
              MEMORY
            </div>
          </div>
          {/* Chemical Sheen Overlay */}
          {!developed && <div className="absolute inset-0 bg-black/40"></div>}
        </div>
        <div className="mt-3 text-center">
           <p className="font-mono text-xs text-neutral-400">08/11/85</p>
        </div>
      </div>

      <button
        onClick={() => setDeveloped(true)}
        disabled={developed}
        className="mt-6 bg-blue-600 text-white font-bold px-4 py-2 shadow-[3px_3px_0_0_#000] active:translate-y-1 active:shadow-none transition-all border-2 border-black hover:bg-blue-700 text-sm disabled:opacity-50"
      >
        {developed ? 'DEVELOPING...' : 'TAKE PHOTO'}
      </button>

      {developed && (
        <button
          onClick={() => setDeveloped(false)}
          className="mt-2 text-xs text-gray-500 underline"
        >
          Reset
        </button>
      )}
    </div>
  );
};

// ============ HAND DRAWN LAB ============

import { Plus } from '../shared/icons';

const ScribbleUnderline = () => (
  <svg className="absolute -bottom-1 left-0 w-full h-2 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 10">
    <path
      d="M0,5 Q20,2 40,8 T80,3 T100,6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="animate-[draw_1s_ease-out]"
    />
    <style>{`
      @keyframes draw {
        from { stroke-dasharray: 0 100; stroke-dashoffset: 100; }
        to { stroke-dasharray: 100 100; stroke-dashoffset: 0; }
      }
    `}</style>
  </svg>
);

const MarkerProgressBar = ({ progress, label }: { progress: number, label: string }) => (
  <div className="space-y-1">
    <div className="flex justify-between text-sm font-bold">
      <span>{label}</span>
      <span>{progress}%</span>
    </div>
    <div className="relative h-4 flex items-center">
      <svg className="absolute w-full h-full opacity-10" preserveAspectRatio="none" viewBox="0 0 200 20">
        <path d="M5,10 Q50,8 100,12 T195,10" fill="none" stroke="black" strokeWidth="8" strokeLinecap="round" />
      </svg>
      <svg className="absolute h-full" style={{ width: `${progress}%` }} preserveAspectRatio="none" viewBox="0 0 100 20">
        <path
          d="M5,10 Q30,12 60,8 T95,11"
          fill="none"
          stroke="#2563eb"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="200"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
    </div>
  </div>
);

export const HandDrawnLab = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');

  const courses = [
    { name: "Algebra II", instructor: "Dr. Smith", progress: 75 },
    { name: "World History", instructor: "Prof. Jones", progress: 60 },
    { name: "Creative Writing", instructor: "Ms. Miller", progress: 90 },
  ];

  return (
    <div className="h-full w-full bg-[#1e1b18] flex items-center justify-center p-2 relative overflow-hidden">
      {/* Smartphone Body */}
      <div className="relative w-full max-w-[280px] h-full max-h-[480px] bg-zinc-900 rounded-[36px] border-[6px] border-zinc-800 shadow-2xl flex flex-col p-2 overflow-hidden">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-4 bg-zinc-900 rounded-b-xl z-50"></div>

        {/* Screen Content */}
        <div className="flex-1 bg-[#fffdf5] rounded-[28px] overflow-hidden relative border-2 border-black/5">
          {/* Ruled Paper Background */}
          <div className="absolute inset-0 pointer-events-none"
               style={{
                 backgroundImage: `linear-gradient(#91c9ff 1px, transparent 1px)`,
                 backgroundSize: '100% 20px',
                 backgroundPosition: '0 32px'
               }}
          >
            <div className="absolute top-0 left-8 bottom-0 w-[2px] bg-red-400 opacity-60"></div>
          </div>

          {/* App Layout */}
          <div className="relative z-10 p-4 pt-8 flex flex-col h-full text-black" style={{ fontFamily: 'Georgia, serif' }}>
            {/* Header */}
            <header className="text-center mb-4">
              <h1 className="text-2xl font-bold tracking-tight">EduFlow</h1>
            </header>

            {/* Navigation */}
            <nav className="flex justify-around mb-4">
              {['Dashboard', 'Courses', 'Progress'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative text-xs font-bold ${activeTab === tab ? 'text-black' : 'text-gray-400'}`}
                >
                  {tab}
                  {activeTab === tab && <ScribbleUnderline />}
                </button>
              ))}
            </nav>

            {/* Main Content */}
            <div className="flex-1 space-y-4 overflow-auto">
              <h2 className="text-lg font-bold border-b-2 border-dashed border-black/10 pb-1">Current Courses</h2>

              <div className="space-y-4">
                {courses.map((course, idx) => (
                  <div key={idx}>
                    <h3 className="text-sm font-bold">{course.name}</h3>
                    <p className="text-xs opacity-60 mb-1">Instructor: {course.instructor}</p>
                    <MarkerProgressBar progress={course.progress} label="" />
                  </div>
                ))}
              </div>
            </div>

            {/* Floating Action Button */}
            <div className="absolute bottom-4 right-4">
              <button className="w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center shadow-lg border-2 border-black hover:scale-110 transition-transform">
                <Plus size={20} strokeWidth={3} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============ DESIGN SYSTEM APP ============

export type DesignVariant = 'high-energy' | 'focused' | 'balanced';

interface DSButtonProps {
  variant?: DesignVariant;
  children?: React.ReactNode;
  onClick?: () => void;
  icon?: React.FC<{ size?: number; className?: string }>;
  className?: string;
}

const DSButton = ({
  variant = 'balanced',
  children,
  onClick,
  icon: Icon,
  className = ""
}: DSButtonProps) => {
  const styles = {
    'high-energy': "font-[Bangers] tracking-wider text-lg bg-yellow-400 text-black border-4 border-black shadow-[4px_4px_0_0_#000] hover:translate-y-1 hover:shadow-none active:bg-yellow-500 uppercase px-6 py-2 transition-all rounded-none",
    'focused': "font-mono text-xs bg-black text-[#33ff00] border border-[#33ff00] hover:bg-[#33ff00]/10 px-4 py-2 uppercase tracking-widest transition-colors shadow-[0_0_10px_rgba(51,255,0,0.2)] rounded-none",
    'balanced': "font-sans font-medium bg-stone-800 text-white rounded-lg shadow-sm hover:bg-stone-700 px-5 py-2.5 transition-all flex items-center gap-2 active:scale-95 border-none"
  };

  return (
    <button onClick={onClick} className={`${styles[variant]} flex items-center justify-center gap-2 ${className}`}>
      {Icon && <Icon size={variant === 'high-energy' ? 20 : 16} />}
      {children}
    </button>
  );
};

interface DSCardProps {
  variant?: DesignVariant;
  title?: string;
  children?: React.ReactNode;
  className?: string;
  footer?: React.ReactNode;
}

const DSCard = ({
  variant = 'balanced',
  title,
  children,
  className = "",
  footer
}: DSCardProps) => {
  const containerStyles = {
    'high-energy': "bg-white border-4 border-black shadow-[8px_8px_0_0_#000] p-6 relative overflow-hidden rounded-none",
    'focused': "bg-black/80 border-l-2 border-[#33ff00] p-6 font-mono text-zinc-300 backdrop-blur-sm rounded-none",
    'balanced': "bg-white rounded-xl border border-stone-200 shadow-xl shadow-stone-200/50 p-6"
  };

  const titleStyles = {
    'high-energy': "font-[Bangers] text-3xl mb-4 text-black uppercase transform -rotate-1 decoration-wavy underline decoration-orange-500 leading-none",
    'focused': "font-mono text-xs mb-4 text-[#33ff00] uppercase tracking-widest border-b border-[#33ff00]/30 pb-2",
    'balanced': "font-sans text-lg font-bold mb-4 text-stone-800"
  };

  return (
    <div className={`${containerStyles[variant]} ${className} flex flex-col`}>
      {variant === 'high-energy' && (
        <div className="absolute top-2 right-2 w-3 h-3 rounded-full border-2 border-black bg-orange-500" />
      )}
      {title && <h3 className={titleStyles[variant]}>{title}</h3>}
      <div className="flex-1">
        {children}
      </div>
      {footer && (
        <div className={`mt-6 pt-4 ${variant === 'balanced' ? 'border-t border-stone-100' : ''}`}>
          {footer}
        </div>
      )}
    </div>
  );
};

interface DSBadgeProps {
  variant?: DesignVariant;
  label: string;
  status?: 'success' | 'warning' | 'neutral';
}

const DSBadge = ({ variant = 'balanced', label, status = 'neutral' }: DSBadgeProps) => {
  const styles = {
    'high-energy': {
      success: "bg-green-400 border-2 border-black text-black font-[Bangers] rotate-2 px-2 py-1",
      warning: "bg-yellow-400 border-2 border-black text-black font-[Bangers] -rotate-2 px-2 py-1",
      neutral: "bg-white border-2 border-black text-black font-[Bangers] px-2 py-1"
    },
    'focused': {
      success: "text-green-400 border border-green-400 bg-green-400/10 font-mono text-[10px] px-1",
      warning: "text-yellow-400 border border-yellow-400 bg-yellow-400/10 font-mono text-[10px] px-1",
      neutral: "text-zinc-400 border border-zinc-600 font-mono text-[10px] px-1"
    },
    'balanced': {
      success: "bg-green-100 text-green-800 rounded-full font-sans text-xs font-medium px-3 py-1",
      warning: "bg-amber-100 text-amber-800 rounded-full font-sans text-xs font-medium px-3 py-1",
      neutral: "bg-stone-100 text-stone-600 rounded-full font-sans text-xs font-medium px-3 py-1"
    }
  };

  return (
    <span className={`inline-block ${styles[variant][status]}`}>
      {label}
    </span>
  );
};

interface DSInputProps {
  variant?: DesignVariant;
  placeholder?: string;
  icon?: React.FC<{ size?: number; className?: string }>;
}

const DSInput = ({ variant = 'balanced', placeholder, icon: Icon }: DSInputProps) => {
  const wrapperStyles = {
    'high-energy': "relative border-4 border-black shadow-[4px_4px_0_0_#ccc] bg-white",
    'focused': "relative border-b border-zinc-700 bg-transparent",
    'balanced': "relative"
  };

  const inputStyles = {
    'high-energy': "w-full bg-transparent p-3 pl-10 font-bold font-sans text-xl focus:outline-none placeholder:text-gray-300",
    'focused': "w-full bg-transparent p-2 pl-8 font-mono text-sm text-white focus:border-[#33ff00] focus:outline-none placeholder:text-zinc-700",
    'balanced': "w-full bg-stone-50 border border-stone-300 rounded-md p-2 pl-9 font-sans text-stone-800 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none"
  };

  const iconStyles = {
    'high-energy': "absolute left-3 top-1/2 -translate-y-1/2 text-black",
    'focused': "absolute left-2 top-1/2 -translate-y-1/2 text-[#33ff00]",
    'balanced': "absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
  };

  return (
    <div className={wrapperStyles[variant]}>
      {Icon && <Icon size={18} className={iconStyles[variant]} />}
      <input type="text" placeholder={placeholder} className={inputStyles[variant]} />
    </div>
  );
};

// --- WIREFRAME SCREENS ---

const ScreenDashboard = ({ variant }: { variant: DesignVariant }) => (
  <div className="space-y-6 animate-in fade-in">
    <div className={`flex justify-between items-end ${variant === 'focused' ? 'border-b border-[#33ff00] pb-4' : ''}`}>
      <div>
        <h1 className={`${variant === 'high-energy' ? 'font-[Bangers] text-5xl' : variant === 'focused' ? 'font-mono text-2xl text-[#33ff00]' : 'font-sans text-3xl font-bold text-stone-900'}`}>
          WELCOME BACK, CADET
        </h1>
        <p className={`${variant === 'focused' ? 'font-mono text-xs text-zinc-500' : 'text-gray-500'}`}>
          System status: Optimal. Ready for training.
        </p>
      </div>
      <DSButton variant={variant} icon={PlayCircle}>Resume</DSButton>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <DSCard variant={variant} title="Current Streak">
        <div className="flex items-center gap-4">
          <div className={`p-4 rounded-full ${variant === 'high-energy' ? 'bg-yellow-400 border-2 border-black' : variant === 'focused' ? 'border border-[#33ff00] text-[#33ff00]' : 'bg-orange-100 text-orange-600'}`}>
            <Zap size={24} />
          </div>
          <div>
            <div className={`text-3xl font-bold ${variant === 'focused' ? 'font-mono' : ''}`}>12 DAYS</div>
            <div className="text-xs opacity-60">Personal Best: 15</div>
          </div>
        </div>
      </DSCard>
      <DSCard variant={variant} title="XP Earned">
        <div className="flex items-center gap-4">
          <div className={`p-4 rounded-full ${variant === 'high-energy' ? 'bg-blue-400 border-2 border-black' : variant === 'focused' ? 'border border-blue-500 text-blue-500' : 'bg-blue-100 text-blue-600'}`}>
            <Trophy size={24} />
          </div>
          <div>
            <div className={`text-3xl font-bold ${variant === 'focused' ? 'font-mono' : ''}`}>4,250</div>
            <div className="text-xs opacity-60">Level 5 Scholar</div>
          </div>
        </div>
      </DSCard>
      <DSCard variant={variant} title="Time Active">
        <div className="flex items-center gap-4">
          <div className={`p-4 rounded-full ${variant === 'high-energy' ? 'bg-green-400 border-2 border-black' : variant === 'focused' ? 'border border-green-500 text-green-500' : 'bg-green-100 text-green-600'}`}>
            <Clock size={24} />
          </div>
          <div>
            <div className={`text-3xl font-bold ${variant === 'focused' ? 'font-mono' : ''}`}>18h 30m</div>
            <div className="text-xs opacity-60">This week</div>
          </div>
        </div>
      </DSCard>
    </div>

    <DSCard variant={variant} title="Active Modules">
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className={`flex items-center justify-between p-3 ${
            variant === 'high-energy' ? 'bg-gray-100 border-2 border-black' :
            variant === 'focused' ? 'border-b border-zinc-800 hover:bg-white/5' :
            'bg-stone-50 rounded-lg'
          }`}>
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 flex items-center justify-center font-bold ${
                variant === 'high-energy' ? 'bg-black text-white' :
                variant === 'focused' ? 'bg-zinc-800 text-[#33ff00] font-mono' :
                'bg-white rounded-full shadow-sm text-stone-600'
              }`}>
                {i}
              </div>
              <div>
                <h4 className={`font-bold ${variant === 'focused' ? 'font-mono text-sm' : ''}`}>Quantum Mechanics {i}01</h4>
                <div className="w-24 h-1 bg-gray-200 mt-1 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: `${i * 30}%` }}></div>
                </div>
              </div>
            </div>
            <DSButton variant={variant} className="px-3 py-1 text-xs">Continue</DSButton>
          </div>
        ))}
      </div>
    </DSCard>
  </div>
);

const ScreenBrowse = ({ variant }: { variant: DesignVariant }) => (
  <div className="space-y-6 animate-in slide-in-from-bottom-10 fade-in duration-500">
    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
      <h2 className={`${variant === 'high-energy' ? 'font-[Bangers] text-4xl' : variant === 'focused' ? 'font-mono text-xl text-[#33ff00]' : 'font-sans text-2xl font-bold'}`}>
        COURSE CATALOG
      </h2>
      <div className="w-full md:w-64">
        <DSInput variant={variant} placeholder="Search modules..." icon={Search} />
      </div>
    </div>

    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {['All', 'Physics', 'Chemistry', 'Biology', 'History', 'Math'].map((tag, i) => (
        <button
          key={tag}
          className={`whitespace-nowrap px-4 py-1 transition-all ${
            variant === 'high-energy' ? `border-2 border-black font-bold uppercase ${i===0 ? 'bg-black text-white' : 'bg-white hover:bg-yellow-200'}` :
            variant === 'focused' ? `border border-zinc-700 font-mono text-xs ${i===0 ? 'bg-[#33ff00] text-black' : 'text-zinc-400 hover:border-zinc-500'}` :
            `rounded-full text-sm font-medium ${i===0 ? 'bg-stone-800 text-white' : 'bg-stone-200 text-stone-600 hover:bg-stone-300'}`
          }`}
        >
          {tag}
        </button>
      ))}
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div key={item} className="h-full">
          <DSCard variant={variant} className="h-full">
            <div className={`h-32 mb-4 w-full ${
              variant === 'high-energy' ? 'bg-black pattern-dots text-white flex items-center justify-center font-[Bangers] text-4xl' :
              variant === 'focused' ? 'bg-zinc-900 border border-zinc-700 flex items-center justify-center font-mono text-xs text-zinc-500' :
              'bg-stone-200 rounded-lg flex items-center justify-center text-stone-400'
            }`}>
              IMG_PLACEHOLDER_{item}
            </div>
            <div className="flex justify-between items-start mb-2">
              <h3 className={`font-bold ${variant === 'focused' ? 'text-white font-mono' : 'text-lg'}`}>Introduction to Thermodynamics</h3>
              <DSBadge variant={variant} label="Physics" status="neutral" />
            </div>
            <p className={`text-sm mb-4 ${variant === 'focused' ? 'text-zinc-500 font-mono' : 'text-gray-600'}`}>
              Understanding heat, energy, and entropy in closed systems.
            </p>
            <div className="mt-auto">
              <DSButton variant={variant} className="w-full">Enroll Now</DSButton>
            </div>
          </DSCard>
        </div>
      ))}
    </div>
  </div>
);

const ScreenAnalytics = ({ variant }: { variant: DesignVariant }) => (
  <div className="space-y-6 animate-in zoom-in duration-300">
    <div className="flex justify-between items-center">
      <h2 className={`${variant === 'high-energy' ? 'font-[Bangers] text-4xl' : variant === 'focused' ? 'font-mono text-xl text-[#33ff00]' : 'font-sans text-2xl font-bold'}`}>
        PERFORMANCE DATA
      </h2>
      <DSButton variant={variant} icon={BarChart3} className="opacity-80">Export Report</DSButton>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <DSCard variant={variant} title="Weekly Activity">
        <div className="h-64 flex items-end justify-between gap-2 px-2">
          {[40, 70, 35, 90, 60, 20, 85].map((h, i) => (
            <div key={i} className="w-full flex flex-col justify-end group">
              <div
                className={`w-full transition-all duration-500 ${
                  variant === 'high-energy' ? 'bg-black hover:bg-orange-500 border-2 border-black' :
                  variant === 'focused' ? 'bg-zinc-800 border-t-2 border-[#33ff00] hover:bg-[#33ff00]/20' :
                  'bg-blue-200 hover:bg-blue-300 rounded-t-sm'
                }`}
                style={{ height: `${h}%` }}
              ></div>
              <div className={`text-center mt-2 text-xs ${variant === 'focused' ? 'font-mono text-zinc-600' : 'font-bold text-gray-400'}`}>
                {['M','T','W','T','F','S','S'][i]}
              </div>
            </div>
          ))}
        </div>
      </DSCard>

      <DSCard variant={variant} title="Topic Mastery">
        <div className="space-y-4">
          {[
            { label: 'Mechanics', val: 92, color: 'bg-green-500' },
            { label: 'Optics', val: 78, color: 'bg-blue-500' },
            { label: 'Calculus', val: 45, color: 'bg-red-500' },
            { label: 'History', val: 88, color: 'bg-yellow-500' },
          ].map((stat, i) => (
            <div key={i}>
              <div className="flex justify-between mb-1">
                <span className={`text-sm font-bold ${variant === 'focused' ? 'font-mono text-zinc-400' : ''}`}>{stat.label}</span>
                <span className={`text-sm font-bold ${variant === 'focused' ? 'font-mono text-white' : ''}`}>{stat.val}%</span>
              </div>
              <div className={`h-4 w-full ${
                variant === 'high-energy' ? 'bg-white border-2 border-black' :
                variant === 'focused' ? 'bg-zinc-900 border border-zinc-700' :
                'bg-gray-100 rounded-full'
              }`}>
                <div
                  className={`h-full ${
                    variant === 'high-energy' ? 'bg-black pattern-diagonal-lines' :
                    variant === 'focused' ? 'bg-[#33ff00]' :
                    stat.color
                  } ${variant === 'balanced' ? 'rounded-full' : ''}`}
                  style={{ width: `${stat.val}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </DSCard>
    </div>

    <DSCard variant={variant} title="Recent Achievements">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={`p-4 flex items-center gap-4 ${variant === 'high-energy' ? 'bg-yellow-100 border-2 border-black' : variant === 'focused' ? 'bg-zinc-900 border border-dashed border-zinc-700' : 'bg-stone-50 rounded-lg'}`}>
          <div className={`p-2 rounded-full ${variant === 'high-energy' ? 'bg-white border-2 border-black' : 'bg-white shadow-sm'}`}>
            <Sparkles size={20} className="text-yellow-600" />
          </div>
          <div>
            <h4 className={`font-bold ${variant === 'focused' ? 'font-mono text-white text-sm' : ''}`}>Speed Reader</h4>
            <p className="text-xs text-gray-500">Completed 3 articles in 10 mins</p>
          </div>
        </div>
        <div className={`p-4 flex items-center gap-4 ${variant === 'high-energy' ? 'bg-blue-100 border-2 border-black' : variant === 'focused' ? 'bg-zinc-900 border border-dashed border-zinc-700' : 'bg-stone-50 rounded-lg'}`}>
          <div className={`p-2 rounded-full ${variant === 'high-energy' ? 'bg-white border-2 border-black' : 'bg-white shadow-sm'}`}>
            <Trophy size={20} className="text-blue-600" />
          </div>
          <div>
            <h4 className={`font-bold ${variant === 'focused' ? 'font-mono text-white text-sm' : ''}`}>Quiz Master</h4>
            <p className="text-xs text-gray-500">Scored 100% on Physics Final</p>
          </div>
        </div>
      </div>
    </DSCard>
  </div>
);

const ScreenSchedule = ({ variant }: { variant: DesignVariant }) => (
  <div className="space-y-6 animate-in fade-in">
    <div className="flex justify-between items-center">
      <h2 className={`${variant === 'high-energy' ? 'font-[Bangers] text-4xl' : variant === 'focused' ? 'font-mono text-xl text-[#33ff00]' : 'font-sans text-2xl font-bold'}`}>
        WEEKLY ORBIT
      </h2>
      <DSButton variant={variant} icon={Calendar}>Sync Calendar</DSButton>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <DSCard variant={variant} title="Timeline" className="lg:col-span-2">
        <div className="space-y-4">
          {['09:00 AM - Quantum Mechanics', '11:30 AM - Lunch Break', '01:00 PM - Holodeck Sim', '03:30 PM - History of Cyberspace'].map((evt, i) => (
            <div key={i} className={`flex items-center gap-4 p-4 border-l-4 ${
              variant === 'high-energy' ? 'border-black bg-white shadow-sm' :
              variant === 'focused' ? 'border-[#33ff00] bg-[#33ff00]/5 text-zinc-300' :
              'border-blue-500 bg-blue-50'
            }`}>
              <Clock size={16} className={variant === 'focused' ? 'text-[#33ff00]' : 'text-gray-500'} />
              <span className={variant === 'high-energy' ? 'font-bold font-sans' : variant === 'focused' ? 'font-mono text-sm' : 'font-medium'}>{evt}</span>
            </div>
          ))}
        </div>
      </DSCard>

      <DSCard variant={variant} title="Upcoming Exams">
        <div className="space-y-4">
          <div className={`p-4 text-center ${variant === 'high-energy' ? 'bg-red-100' : variant === 'focused' ? 'bg-red-900/20' : 'bg-red-50 rounded'}`}>
            <div className="text-2xl font-bold text-red-600 mb-1">12</div>
            <div className="text-xs uppercase font-bold text-red-400">Days Left</div>
            <div className="mt-2 text-sm font-bold">Finals Week</div>
          </div>
          <div className="flex justify-between items-center text-sm p-2 border-b border-gray-200/20">
            <span className={variant === 'focused' ? 'text-zinc-400 font-mono' : 'text-gray-600'}>Calculus II</span>
            <DSBadge variant={variant} label="Hard" status="warning" />
          </div>
          <div className="flex justify-between items-center text-sm p-2">
            <span className={variant === 'focused' ? 'text-zinc-400 font-mono' : 'text-gray-600'}>Ethics in AI</span>
            <DSBadge variant={variant} label="Easy" status="success" />
          </div>
        </div>
      </DSCard>
    </div>
  </div>
);

const ScreenSettings = ({ variant }: { variant: DesignVariant }) => (
  <div className="space-y-6 animate-in slide-in-from-bottom-10">
    <h2 className={`${variant === 'high-energy' ? 'font-[Bangers] text-4xl' : variant === 'focused' ? 'font-mono text-xl text-[#33ff00]' : 'font-sans text-2xl font-bold'}`}>
      SYSTEM CONFIG
    </h2>

    <DSCard variant={variant} title="User Profile">
      <div className="flex items-center gap-6 mb-6">
        <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
          variant === 'high-energy' ? 'bg-black text-white border-4 border-yellow-400' :
          variant === 'focused' ? 'bg-zinc-900 border border-[#33ff00] text-[#33ff00]' :
          'bg-stone-200 text-stone-500'
        }`}>
          <User size={40} />
        </div>
        <div className="flex-1 space-y-2">
          <DSInput variant={variant} placeholder="Display Name" icon={User} />
          <DSInput variant={variant} placeholder="Email Address" icon={Check} />
        </div>
      </div>
    </DSCard>

    <DSCard variant={variant} title="Preferences">
      <div className="space-y-4">
        {['Enable Haptic Feedback', 'High Contrast Mode', 'Reduce Motion'].map((pref, i) => (
          <div key={i} className="flex justify-between items-center p-2">
            <span className={variant === 'focused' ? 'font-mono text-sm text-zinc-400' : 'font-medium'}>{pref}</span>
            <div className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${
              variant === 'high-energy' ? 'bg-black border-2 border-black' :
              variant === 'focused' ? 'bg-zinc-800 border border-zinc-600' :
              'bg-stone-300'
            }`}>
              <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${i === 0 ? 'translate-x-6' : ''}`} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <DSButton variant={variant} icon={LogOut} className="bg-red-600 text-white hover:bg-red-700">Log Out</DSButton>
        <DSButton variant={variant}>Save Changes</DSButton>
      </div>
    </DSCard>
  </div>
);

// --- MAIN DESIGN SYSTEM APP CONTAINER ---

export const DesignSystemApp = () => {
  const [variant, setVariant] = useState<DesignVariant>('high-energy');
  const [screen, setScreen] = useState<'dashboard' | 'browse' | 'analytics' | 'schedule' | 'settings' | 'style-guide'>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const mainBg = {
    'high-energy': 'bg-yellow-50 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]',
    'focused': 'bg-black',
    'balanced': 'bg-stone-100'
  };

  const sidebarBg = {
    'high-energy': 'bg-black text-white border-r-4 border-yellow-400',
    'focused': 'bg-zinc-900 text-zinc-400 border-r border-zinc-800',
    'balanced': 'bg-white text-stone-600 border-r border-stone-200 shadow-sm'
  };

  return (
    <div className={`flex h-full w-full overflow-hidden transition-colors duration-500 ${mainBg[variant]}`}>

      {/* Sidebar Navigation */}
      <div className={`flex-shrink-0 transition-all duration-300 flex flex-col ${isSidebarOpen ? 'w-64' : 'w-16'} ${sidebarBg[variant]}`}>
        <div className={`p-4 flex items-center justify-between ${variant === 'focused' ? 'border-b border-zinc-800' : ''}`}>
          {isSidebarOpen && <h2 className={`font-bold whitespace-nowrap ${variant === 'high-energy' ? 'font-[Bangers] tracking-widest text-2xl text-yellow-400' : 'font-mono'}`}>ED-TECH OS</h2>}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1 hover:bg-white/10 rounded">
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 p-2 space-y-2 mt-4 overflow-y-auto scrollbar-hide">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'browse', label: 'Browse', icon: Library },
            { id: 'analytics', label: 'Analytics', icon: PieChart },
            { id: 'schedule', label: 'Schedule', icon: Calendar },
            { id: 'settings', label: 'Settings', icon: Settings },
            { id: 'style-guide', label: 'Style Guide', icon: FileText },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setScreen(item.id as typeof screen)}
              className={`w-full flex items-center gap-3 p-3 transition-all ${
                screen === item.id
                  ? variant === 'high-energy' ? 'bg-yellow-400 text-black font-black uppercase skew-x-[-10deg]'
                  : variant === 'focused' ? 'bg-[#33ff00]/10 text-[#33ff00] border-r-2 border-[#33ff00]'
                  : 'bg-stone-100 text-stone-900 rounded-lg font-medium'
                  : 'hover:opacity-70'
              } ${!isSidebarOpen ? 'justify-center' : ''}`}
            >
              <item.icon size={20} />
              {isSidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4">
          {isSidebarOpen && <div className={`text-xs mb-2 opacity-50 ${variant === 'high-energy' ? 'font-mono' : ''}`}>THEME SELECTOR</div>}
          <div className={`flex ${isSidebarOpen ? 'flex-row' : 'flex-col'} gap-2`}>
            {(['high-energy', 'focused', 'balanced'] as DesignVariant[]).map((v) => (
              <button
                key={v}
                onClick={() => setVariant(v)}
                title={v}
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-transform hover:scale-110 ${variant === v ? 'ring-2 ring-offset-2 ring-blue-500' : ''}
                  ${v === 'high-energy' ? 'bg-yellow-400 border-black' : v === 'focused' ? 'bg-black border-[#33ff00]' : 'bg-stone-200 border-stone-400'}
                `}
              >
                {variant === v && <Check size={12} className={v === 'focused' ? 'text-[#33ff00]' : 'text-black'} />}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
        {screen === 'dashboard' && <ScreenDashboard variant={variant} />}
        {screen === 'browse' && <ScreenBrowse variant={variant} />}
        {screen === 'analytics' && <ScreenAnalytics variant={variant} />}
        {screen === 'schedule' && <ScreenSchedule variant={variant} />}
        {screen === 'settings' && <ScreenSettings variant={variant} />}

        {/* Style Guide */}
        {screen === 'style-guide' && (
          <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in">
            <div className="mb-8">
              <h1 className={`text-4xl font-bold mb-2 ${variant === 'high-energy' ? 'font-[Bangers]' : variant === 'focused' ? 'font-mono text-[#33ff00]' : 'text-stone-800'}`}>Component Inventory</h1>
              <p className="opacity-60">Atomic elements reacting to the global theme state.</p>
            </div>

            <section>
              <h3 className="mb-4 font-bold opacity-50 uppercase tracking-widest text-sm">Buttons & Inputs</h3>
              <div className="flex flex-wrap gap-4 items-end mb-8">
                <DSButton variant={variant} icon={Sparkles}>Primary Action</DSButton>
                <DSButton variant={variant} icon={Zap}>Secondary</DSButton>
                <div className="w-64">
                  <DSInput variant={variant} placeholder="Type here..." icon={Search} />
                </div>
              </div>
            </section>

            <section>
              <h3 className="mb-4 font-bold opacity-50 uppercase tracking-widest text-sm">Cards & Containers</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DSCard variant={variant} title="Content Container">
                  <p className={variant === 'focused' ? 'text-zinc-500 font-mono text-sm' : 'text-gray-600'}>
                    This container adapts its border radius, shadow depth, and typography based on the selected variant.
                  </p>
                </DSCard>
                <DSCard variant={variant} title="Interactive Card" footer={
                  <div className="flex justify-end"><DSButton variant={variant} className="text-xs py-1">Action</DSButton></div>
                }>
                  <div className="flex items-center gap-2 mb-2">
                    <DSBadge variant={variant} label="New" status="success" />
                    <DSBadge variant={variant} label="Beta" status="warning" />
                  </div>
                  <p className={variant === 'focused' ? 'text-zinc-500 font-mono text-sm' : 'text-gray-600'}>
                    Cards can contain badges and footers.
                  </p>
                </DSCard>
              </div>
            </section>
          </div>
        )}
      </main>

    </div>
  );
};

// ============ ASSET LAB ============

const RansomLetter = ({ char, color, font, rotate }: { char: string, color: string, font: string, rotate: string }) => (
  <div
    className={`inline-flex items-center justify-center w-12 h-14 m-1 shadow-lg border-2 border-black/10 transition-all hover:scale-110 hover:-translate-y-1 cursor-default ${color} ${rotate}`}
    style={{ fontFamily: font }}
  >
    <span className="text-3xl font-black text-black/80">{char}</span>
  </div>
);

export const AssetLab = () => {
  const [copied, setCopied] = useState(false);
  const promptText = "A high-resolution, top-down flat lay of individual alphabet letters (A-Z) and numbers (0-9) styled as mismatched newspaper and magazine cutouts. Each letter should be on its own distinct scrap of paper with visible torn edges, fibrous textures, and slight creases. Use a variety of typography: bold sans-serif, elegant serifs, colorful headlines, and grainy newsprint ink. Include subtle drop shadows under each paper scrap to create a realistic 3D 'pasted' effect. The background should be a solid, neutral studio grey to make the cutouts easy to isolate. Cinematic lighting, macro photography style, showing extreme detail of the paper grain and ink bleed.";

  const handleCopy = () => {
    navigator.clipboard.writeText(promptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-full bg-stone-300 overflow-y-auto p-4 md:p-12 font-sans selection:bg-orange-200">
      <div className="max-w-5xl mx-auto space-y-12 pb-24">

        {/* Visual Header */}
        <header className="text-center space-y-4">
          <div className="flex flex-wrap justify-center mb-2">
            <RansomLetter char="A" color="bg-white" font="Bangers" rotate="-rotate-3" />
            <RansomLetter char="S" color="bg-yellow-400" font="serif" rotate="rotate-2" />
            <RansomLetter char="S" color="bg-orange-500" font="sans-serif" rotate="-rotate-1" />
            <RansomLetter char="E" color="bg-white" font="Bangers" rotate="rotate-6" />
            <RansomLetter char="T" color="bg-cyan-400" font="serif" rotate="-rotate-2" />
            <span className="w-4" />
            <RansomLetter char="L" color="bg-pink-500" font="Bangers" rotate="rotate-1" />
            <RansomLetter char="A" color="bg-white" font="sans-serif" rotate="-rotate-6" />
            <RansomLetter char="B" color="bg-yellow-300" font="serif" rotate="rotate-3" />
          </div>
          <p className="text-stone-600 font-mono text-xs uppercase tracking-[0.3em] font-bold">Generation Protocol Alpha-01</p>
        </header>

        {/* Intro Text */}
        <div className="bg-white/40 border-2 border-dashed border-stone-400 p-6 rounded-lg text-stone-800 text-center max-w-2xl mx-auto italic">
          "To get high-quality, usable assets from AI Studio, your prompt needs to emphasize texture, lighting, and separation. For a UI, you want these to look like physical objects that have been scanned, not just flat digital drawings."
        </div>

        {/* The Prompt Section */}
        <section className="relative">
          <div className="absolute -top-4 -left-4 bg-black text-white px-4 py-1 font-bold rounded z-10 shadow-lg transform -rotate-2 flex items-center gap-2 font-mono text-sm">
            <Target size={14} /> THE MASTER PROMPT
          </div>
          <div className="bg-white border-4 border-black p-8 pt-12 shadow-[12px_12px_0_0_rgba(0,0,0,1)] relative overflow-hidden group">
            <p className="text-2xl font-serif italic text-stone-800 leading-relaxed relative z-10 selection:bg-yellow-300">
              "{promptText}"
            </p>

            <div className="mt-8 flex justify-end gap-4 items-center">
              <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest hidden md:block">Ready for AI Studio</span>
              <DSButton
                variant="high-energy"
                onClick={handleCopy}
                className={`!px-8 !py-3 ${copied ? '!bg-green-500 !text-white' : ''}`}
              >
                {copied ? (
                  <><Check size={20} className="mr-2" /> COPIED!</>
                ) : (
                  <><Copy size={20} className="mr-2" /> COPY PROMPT</>
                )}
              </DSButton>
            </div>
          </div>
        </section>

        {/* Why it works grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="font-[Bangers] text-3xl text-stone-800 border-b-4 border-orange-500 inline-block pb-1">WHY THIS WORKS</h3>

            <div className="space-y-4">
              {[
                { title: "Mismatched Cutouts", desc: "Ensures the 'ransom note' aesthetic where no two letters look the same.", icon: Scissors },
                { title: "Fibrous Textures", desc: "Adds the tactile feel that matches the 'Ed-Tech/Craft' style.", icon: Info },
                { title: "Subtle Drop Shadows", desc: "Crucial for UI. Makes letters 'pop' off the screen so they don't look printed on.", icon: Maximize2 },
                { title: "Neutral Studio Grey", desc: "Solid background makes the cutouts easy to isolate for transparent layers.", icon: Target },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 bg-white/60 border border-stone-400/50 rounded hover:bg-white transition-all transform hover:-translate-x-1">
                  <div className="p-3 bg-stone-800 text-white rounded">
                    <item.icon size={18} />
                  </div>
                  <div>
                    <h4 className="font-black text-stone-900 text-sm uppercase tracking-tight">{item.title}</h4>
                    <p className="text-xs text-stone-600 leading-tight mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="font-[Bangers] text-3xl text-stone-800 border-b-4 border-cyan-500 inline-block pb-1">PRO-TIPS</h3>

            <div className="grid grid-cols-1 gap-4">
              <div className="bg-yellow-100 p-6 shadow-md border-t-4 border-yellow-400 rotate-1 relative">
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-black/10 rounded-full flex items-center justify-center font-bold text-black/20">01</div>
                <div className="flex items-center gap-2 mb-2 font-black text-yellow-800 text-sm">
                  <Maximize2 size={16} /> ASPECT RATIO (16:9)
                </div>
                <p className="text-xs text-yellow-900/80 leading-relaxed font-medium">
                  If you need a lot of letters at once, set your aspect ratio to 16:9 so they aren't cramped on the digital canvas.
                </p>
              </div>

              <div className="bg-cyan-100 p-6 shadow-md border-t-4 border-cyan-400 -rotate-1 relative">
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-black/10 rounded-full flex items-center justify-center font-bold text-black/20">02</div>
                <div className="flex items-center gap-2 mb-2 font-black text-cyan-800 text-sm">
                  <ExternalLink size={16} /> ITERATE FOR SPECIFICS
                </div>
                <p className="text-xs text-cyan-900/80 leading-relaxed font-medium">
                  AI models are much better at rendering specific words (like "MATH") than the entire alphabet. Replace "alphabet letters A-Z" with your target word.
                </p>
              </div>

              <div className="bg-pink-100 p-6 shadow-md border-t-4 border-pink-400 rotate-1 relative">
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-black/10 rounded-full flex items-center justify-center font-bold text-black/20">03</div>
                <div className="flex items-center gap-2 mb-2 font-black text-pink-800 text-sm">
                  <AlertCircle size={16} /> NEGATIVE PROMPTS
                </div>
                <p className="text-xs text-pink-900/80 leading-relaxed font-medium">
                  Add: "blurry, low-res, digital font, clean edges, drawing, illustration" to keep the assets looking like authentic, physical paper.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer / Call to Action */}
        <footer className="bg-zinc-900 text-white p-10 rounded-2xl text-center space-y-6 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-48 h-48 bg-orange-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-600/20 rounded-full blur-3xl" />

          <div className="relative z-10 space-y-4">
            <Sparkles size={40} className="mx-auto text-yellow-400 mb-2" />
            <h2 className="text-3xl font-[Bangers] tracking-widest">Ready to generate?</h2>
            <p className="text-stone-400 max-w-lg mx-auto italic text-sm font-serif">
              "Would you like me to try generating a specific set of subject labels (like 'Math,' 'Science,' or 'Art') in this style for you right now?"
            </p>
            <div className="pt-4">
              <DSButton variant="focused" className="!bg-white !text-black !border-white hover:!scale-105 active:!scale-95">
                OPEN AI STUDIO ↗
              </DSButton>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
};

// ============ NEW ART STUDIO COMPONENTS ============

// --- PAINT SPLATTER ---
export const PaintSplatter = () => {
  const [splatters, setSplatters] = useState<Array<{
    id: number;
    x: number;
    y: number;
    color: string;
    size: number;
    rotation: number;
  }>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899'];

  const createSplatter = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = 40 + Math.random() * 60;
    const rotation = Math.random() * 360;

    const newSplatter = { id: Date.now(), x, y, color, size, rotation };
    setSplatters(prev => [...prev, newSplatter]);
  };

  const clearCanvas = () => setSplatters([]);

  return (
    <div className="h-full bg-gradient-to-br from-stone-100 to-stone-200 flex flex-col items-center justify-center p-4">
      <style>{`
        @keyframes splat {
          0% { transform: scale(0) rotate(var(--rotation)); opacity: 1; }
          50% { transform: scale(1.2) rotate(var(--rotation)); }
          100% { transform: scale(1) rotate(var(--rotation)); opacity: 0.9; }
        }
        .splatter {
          animation: splat 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}</style>
      <div
        ref={containerRef}
        onClick={createSplatter}
        className="relative w-full max-w-xs h-48 bg-white border-4 border-stone-300 rounded-lg shadow-inner cursor-crosshair overflow-hidden"
      >
        {splatters.map((s) => (
          <svg
            key={s.id}
            className="splatter absolute pointer-events-none"
            style={{
              left: s.x - s.size / 2,
              top: s.y - s.size / 2,
              width: s.size,
              height: s.size,
              '--rotation': `${s.rotation}deg`,
            } as React.CSSProperties}
            viewBox="0 0 100 100"
          >
            <path
              d="M50,10 Q70,25 85,20 Q75,40 90,50 Q75,60 85,80 Q65,75 50,90 Q35,75 15,80 Q25,60 10,50 Q25,40 15,20 Q30,25 50,10"
              fill={s.color}
            />
            {/* Small droplets */}
            <circle cx="20" cy="15" r="5" fill={s.color} />
            <circle cx="80" cy="25" r="4" fill={s.color} />
            <circle cx="85" cy="70" r="6" fill={s.color} />
            <circle cx="15" cy="75" r="5" fill={s.color} />
          </svg>
        ))}
        {splatters.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-stone-400 text-sm font-medium">
            Click to splatter paint!
          </div>
        )}
      </div>
      <button
        onClick={clearCanvas}
        className="mt-4 px-4 py-2 bg-stone-800 text-white font-bold rounded text-xs hover:bg-stone-700 transition-colors"
      >
        CLEAR CANVAS
      </button>
    </div>
  );
};

// --- BRUSH STROKE ---
export const BrushStroke = () => {
  const [strokes, setStrokes] = useState<Array<{
    id: number;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    color: string;
    width: number;
  }>>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentStroke, setCurrentStroke] = useState<{
    startX: number;
    startY: number;
    endX: number;
    endY: number;
  } | null>(null);
  const [brushColor, setBrushColor] = useState('#3b82f6');
  const containerRef = useRef<HTMLDivElement>(null);
  const colors = ['#ef4444', '#3b82f6', '#22c55e', '#f97316', '#8b5cf6'];

  const getCoords = (e: React.MouseEvent) => {
    if (!containerRef.current) return { x: 0, y: 0 };
    const rect = containerRef.current.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const { x, y } = getCoords(e);
    setIsDrawing(true);
    setCurrentStroke({ startX: x, startY: y, endX: x, endY: y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing || !currentStroke) return;
    const { x, y } = getCoords(e);
    setCurrentStroke(prev => prev ? { ...prev, endX: x, endY: y } : null);
  };

  const handleMouseUp = () => {
    if (currentStroke) {
      setStrokes(prev => [...prev, {
        id: Date.now(),
        ...currentStroke,
        color: brushColor,
        width: 12 + Math.random() * 8,
      }]);
    }
    setIsDrawing(false);
    setCurrentStroke(null);
  };

  return (
    <div className="h-full bg-amber-50 flex flex-col items-center justify-center p-4">
      <style>{`
        @keyframes brushDraw {
          from { stroke-dashoffset: 1000; }
          to { stroke-dashoffset: 0; }
        }
        .brush-stroke {
          stroke-dasharray: 1000;
          animation: brushDraw 0.5s ease-out forwards;
        }
      `}</style>
      <div className="flex gap-2 mb-3">
        {colors.map(c => (
          <button
            key={c}
            onClick={() => setBrushColor(c)}
            className={`w-6 h-6 rounded-full border-2 transition-transform ${brushColor === c ? 'scale-125 border-black' : 'border-transparent hover:scale-110'}`}
            style={{ backgroundColor: c }}
          />
        ))}
      </div>
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="relative w-full max-w-xs h-48 bg-white border-4 border-amber-200 rounded-lg shadow-lg cursor-crosshair overflow-hidden"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h20v20H0z\' fill=\'%23fef3c7\' fill-opacity=\'0.3\'/%3E%3C/svg%3E")' }}
      >
        <svg className="absolute inset-0 w-full h-full">
          {strokes.map(s => (
            <path
              key={s.id}
              className="brush-stroke"
              d={`M${s.startX},${s.startY} Q${(s.startX + s.endX) / 2 + (Math.random() - 0.5) * 20},${(s.startY + s.endY) / 2 + (Math.random() - 0.5) * 20} ${s.endX},${s.endY}`}
              stroke={s.color}
              strokeWidth={s.width}
              strokeLinecap="round"
              fill="none"
              opacity="0.8"
            />
          ))}
          {currentStroke && (
            <path
              d={`M${currentStroke.startX},${currentStroke.startY} L${currentStroke.endX},${currentStroke.endY}`}
              stroke={brushColor}
              strokeWidth="12"
              strokeLinecap="round"
              fill="none"
              opacity="0.5"
            />
          )}
        </svg>
      </div>
      <p className="mt-2 text-xs text-amber-700 font-medium">Drag to paint brush strokes</p>
    </div>
  );
};

// --- SKETCH PAD ---
export const SketchPad = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [pencilSize, setPencilSize] = useState(2);
  const lastPosRef = useRef({ x: 0, y: 0 });

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Pencil texture effect
    ctx.strokeStyle = `rgba(30, 30, 30, ${0.6 + Math.random() * 0.4})`;
    ctx.lineWidth = pencilSize + Math.random();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
    ctx.lineTo(x, y);
    ctx.stroke();

    // Add pencil grain
    for (let i = 0; i < 3; i++) {
      ctx.fillStyle = `rgba(30, 30, 30, ${Math.random() * 0.3})`;
      ctx.fillRect(
        x + (Math.random() - 0.5) * pencilSize * 2,
        y + (Math.random() - 0.5) * pencilSize * 2,
        1,
        1
      );
    }

    lastPosRef.current = { x, y };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    lastPosRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    setIsDrawing(true);
  };

  const clearSketch = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="h-full bg-stone-300 flex flex-col items-center justify-center p-4">
      <div className="flex gap-2 mb-3 items-center">
        <span className="text-xs font-bold text-stone-600">SIZE:</span>
        {[1, 2, 4].map(size => (
          <button
            key={size}
            onClick={() => setPencilSize(size)}
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${pencilSize === size ? 'bg-stone-800 border-stone-800' : 'bg-white border-stone-400 hover:border-stone-600'}`}
          >
            <div className="rounded-full bg-stone-800" style={{ width: size * 2, height: size * 2 }} />
          </button>
        ))}
      </div>
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={200}
          height={150}
          className="bg-amber-50 border-2 border-stone-400 rounded cursor-crosshair shadow-inner"
          style={{
            backgroundImage: `
              linear-gradient(to bottom, transparent 23px, #d4c4a8 24px),
              linear-gradient(to right, #f5f0e6 1px, transparent 1px)
            `,
            backgroundSize: '100% 24px, 24px 100%',
          }}
          onMouseDown={handleMouseDown}
          onMouseUp={() => setIsDrawing(false)}
          onMouseLeave={() => setIsDrawing(false)}
          onMouseMove={draw}
        />
        <div className="absolute -right-2 -top-2 w-6 h-16 bg-gradient-to-b from-yellow-600 to-yellow-400 rounded-t-full shadow-md transform rotate-12" />
        <div className="absolute -right-1 -top-1 w-2 h-3 bg-pink-300 rounded-t-sm transform rotate-12" />
      </div>
      <button
        onClick={clearSketch}
        className="mt-3 px-4 py-1.5 bg-stone-700 text-white font-bold rounded text-xs hover:bg-stone-600 transition-colors"
      >
        ERASE ALL
      </button>
    </div>
  );
};

// --- COLOR MIXER ---
export const ColorMixer = () => {
  const [color1, setColor1] = useState({ r: 255, g: 0, b: 0 });
  const [color2, setColor2] = useState({ r: 0, g: 0, b: 255 });
  const [mixRatio, setMixRatio] = useState(0.5);
  const [isMixing, setIsMixing] = useState(false);

  const mixColors = () => {
    return {
      r: Math.round(color1.r * (1 - mixRatio) + color2.r * mixRatio),
      g: Math.round(color1.g * (1 - mixRatio) + color2.g * mixRatio),
      b: Math.round(color1.b * (1 - mixRatio) + color2.b * mixRatio),
    };
  };

  const mixed = mixColors();
  const toRgb = (c: { r: number; g: number; b: number }) => `rgb(${c.r}, ${c.g}, ${c.b})`;

  const presets = [
    { r: 255, g: 0, b: 0 },
    { r: 255, g: 165, b: 0 },
    { r: 255, g: 255, b: 0 },
    { r: 0, g: 128, b: 0 },
    { r: 0, g: 0, b: 255 },
    { r: 128, g: 0, b: 128 },
  ];

  const handleMix = () => {
    setIsMixing(true);
    setTimeout(() => setIsMixing(false), 600);
  };

  return (
    <div className="h-full bg-stone-800 flex flex-col items-center justify-center p-4">
      <style>{`
        @keyframes swirl {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .mixing {
          animation: swirl 0.6s ease-in-out;
        }
      `}</style>
      <div className="flex gap-4 mb-4">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full border-4 border-white shadow-lg mb-2" style={{ backgroundColor: toRgb(color1) }} />
          <div className="flex gap-1 justify-center">
            {presets.slice(0, 3).map((p, i) => (
              <button key={i} onClick={() => setColor1(p)} className="w-4 h-4 rounded-full border border-white/30" style={{ backgroundColor: toRgb(p) }} />
            ))}
          </div>
        </div>
        <div className="flex items-center text-white font-black text-xl">+</div>
        <div className="text-center">
          <div className="w-16 h-16 rounded-full border-4 border-white shadow-lg mb-2" style={{ backgroundColor: toRgb(color2) }} />
          <div className="flex gap-1 justify-center">
            {presets.slice(3).map((p, i) => (
              <button key={i} onClick={() => setColor2(p)} className="w-4 h-4 rounded-full border border-white/30" style={{ backgroundColor: toRgb(p) }} />
            ))}
          </div>
        </div>
      </div>
      <div className="w-full max-w-xs mb-4">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={mixRatio}
          onChange={(e) => setMixRatio(parseFloat(e.target.value))}
          className="w-full accent-white"
        />
        <div className="flex justify-between text-xs text-stone-400 mt-1">
          <span>Color 1</span>
          <span>Color 2</span>
        </div>
      </div>
      <div className={`w-20 h-20 rounded-full border-4 border-white shadow-2xl ${isMixing ? 'mixing' : ''}`} style={{ backgroundColor: toRgb(mixed) }} />
      <button onClick={handleMix} className="mt-4 px-4 py-2 bg-white text-stone-800 font-bold rounded text-xs hover:bg-stone-100 transition-colors">
        MIX COLORS
      </button>
      <p className="mt-2 text-xs text-stone-400 font-mono">{toRgb(mixed)}</p>
    </div>
  );
};

// --- EASEL CANVAS ---
export const EaselCanvas = () => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [painting, setPainting] = useState(0);
  const paintings = [
    { bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', title: 'Twilight Dreams' },
    { bg: 'linear-gradient(to right, #f12711, #f5af19)', title: 'Sunset Blaze' },
    { bg: 'linear-gradient(to bottom, #00c6ff, #0072ff)', title: 'Ocean Deep' },
    { bg: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', title: 'Forest Whisper' },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setTilt({ x: -y, y: x });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <div
      className="h-full bg-gradient-to-br from-amber-100 to-orange-100 flex flex-col items-center justify-center p-4"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative" style={{ perspective: '800px' }}>
        {/* Easel legs */}
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-2 h-16 bg-amber-800 rounded transform -rotate-6 origin-top" />
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-2 h-16 bg-amber-800 rounded transform rotate-6 origin-top" />
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-2 h-12 bg-amber-700 rounded" />

        {/* Canvas frame */}
        <div
          className="relative bg-amber-700 p-3 shadow-2xl transition-transform duration-200 ease-out"
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Canvas */}
          <div
            className="w-40 h-32 flex items-center justify-center text-white font-black text-lg shadow-inner"
            style={{ background: paintings[painting].bg }}
          >
            <span className="drop-shadow-lg text-center px-2">{paintings[painting].title}</span>
          </div>
          {/* Frame depth */}
          <div className="absolute inset-0 border-4 border-amber-600 pointer-events-none" />
        </div>

        {/* Easel tray */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-44 h-3 bg-amber-800 rounded shadow-lg" />
      </div>

      <div className="flex gap-2 mt-16">
        {paintings.map((_, i) => (
          <button
            key={i}
            onClick={() => setPainting(i)}
            className={`w-3 h-3 rounded-full transition-all ${painting === i ? 'bg-amber-800 scale-125' : 'bg-amber-400 hover:bg-amber-500'}`}
          />
        ))}
      </div>
      <p className="mt-2 text-xs text-amber-700 font-medium">Move mouse to tilt easel</p>
    </div>
  );
};

// --- INK DRIP ---
export const InkDrip = () => {
  const [drips, setDrips] = useState<Array<{
    id: number;
    x: number;
    delay: number;
    duration: number;
    poolSize: number;
  }>>([]);
  const [inkColor, setInkColor] = useState('#1a1a2e');

  const addDrip = () => {
    const newDrip = {
      id: Date.now(),
      x: 20 + Math.random() * 60,
      delay: Math.random() * 0.5,
      duration: 1.5 + Math.random() * 1,
      poolSize: 15 + Math.random() * 20,
    };
    setDrips(prev => [...prev, newDrip]);
  };

  const clearDrips = () => setDrips([]);

  const colors = ['#1a1a2e', '#16213e', '#0f3460', '#533483', '#e94560'];

  return (
    <div className="h-full bg-stone-100 flex flex-col items-center justify-center p-4 overflow-hidden">
      <style>{`
        @keyframes drip {
          0% { transform: translateY(-100%) scaleY(0.5); opacity: 0; }
          10% { opacity: 1; }
          60% { transform: translateY(100px) scaleY(1.5); }
          100% { transform: translateY(140px) scaleY(1); opacity: 1; }
        }
        @keyframes pool {
          0% { transform: scale(0); opacity: 0; }
          60% { opacity: 0; }
          80% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); }
        }
        @keyframes ripple {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(2); opacity: 0; }
        }
      `}</style>

      <div className="flex gap-2 mb-3">
        {colors.map(c => (
          <button
            key={c}
            onClick={() => setInkColor(c)}
            className={`w-6 h-6 rounded-full border-2 transition-transform ${inkColor === c ? 'scale-125 border-white ring-2 ring-black' : 'border-transparent hover:scale-110'}`}
            style={{ backgroundColor: c }}
          />
        ))}
      </div>

      <div className="relative w-full max-w-xs h-48 bg-white border-2 border-stone-300 rounded-lg shadow-inner overflow-hidden">
        {/* Ink well at top */}
        <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-stone-800 to-stone-600" style={{ backgroundColor: inkColor }} />

        {drips.map(drip => (
          <div key={drip.id}>
            {/* Drip drop */}
            <div
              className="absolute w-3 rounded-full"
              style={{
                left: `${drip.x}%`,
                top: 0,
                height: '20px',
                backgroundColor: inkColor,
                animation: `drip ${drip.duration}s ease-in ${drip.delay}s forwards`,
              }}
            />
            {/* Pool */}
            <div
              className="absolute rounded-full"
              style={{
                left: `calc(${drip.x}% - ${drip.poolSize / 2}px)`,
                bottom: '10px',
                width: drip.poolSize,
                height: drip.poolSize * 0.3,
                backgroundColor: inkColor,
                animation: `pool ${drip.duration}s ease-out ${drip.delay}s forwards`,
              }}
            />
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-4">
        <button onClick={addDrip} className="px-4 py-2 bg-stone-800 text-white font-bold rounded text-xs hover:bg-stone-700 transition-colors">
          ADD DRIP
        </button>
        <button onClick={clearDrips} className="px-4 py-2 bg-stone-300 text-stone-800 font-bold rounded text-xs hover:bg-stone-400 transition-colors">
          CLEAR
        </button>
      </div>
    </div>
  );
};

// --- CHARCOAL SMUDGE ---
export const CharcoalSmudge = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSmudging, setIsSmudging] = useState(false);
  const lastPosRef = useRef({ x: 0, y: 0 });

  // Initialize with charcoal marks
  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#f5f5f0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add initial charcoal marks
    for (let i = 0; i < 5; i++) {
      const x = 30 + Math.random() * 140;
      const y = 30 + Math.random() * 90;

      ctx.fillStyle = `rgba(30, 30, 30, ${0.7 + Math.random() * 0.3})`;
      ctx.beginPath();
      ctx.ellipse(x, y, 15 + Math.random() * 10, 8 + Math.random() * 5, Math.random() * Math.PI, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const smudge = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isSmudging) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const dx = x - lastPosRef.current.x;
    const dy = y - lastPosRef.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 2) {
      // Get image data from current position
      const smudgeSize = 20;
      const imageData = ctx.getImageData(
        lastPosRef.current.x - smudgeSize / 2,
        lastPosRef.current.y - smudgeSize / 2,
        smudgeSize,
        smudgeSize
      );

      // Draw smudged version
      ctx.globalAlpha = 0.3;
      ctx.putImageData(imageData, x - smudgeSize / 2, y - smudgeSize / 2);
      ctx.globalAlpha = 1;

      // Add charcoal dust
      for (let i = 0; i < 3; i++) {
        ctx.fillStyle = `rgba(50, 50, 50, ${Math.random() * 0.2})`;
        ctx.fillRect(x + (Math.random() - 0.5) * 30, y + (Math.random() - 0.5) * 30, 2, 2);
      }
    }

    lastPosRef.current = { x, y };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    lastPosRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    setIsSmudging(true);
  };

  return (
    <div className="h-full bg-stone-400 flex flex-col items-center justify-center p-4">
      <canvas
        ref={canvasRef}
        width={200}
        height={150}
        className="border-4 border-stone-600 rounded shadow-lg cursor-pointer"
        style={{ cursor: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\'%3E%3Ccircle cx=\'12\' cy=\'12\' r=\'8\' fill=\'%23666\' opacity=\'0.5\'/%3E%3C/svg%3E") 12 12, auto' }}
        onMouseDown={handleMouseDown}
        onMouseUp={() => setIsSmudging(false)}
        onMouseLeave={() => setIsSmudging(false)}
        onMouseMove={smudge}
      />
      <div className="flex gap-2 mt-4">
        <button onClick={initCanvas} className="px-4 py-2 bg-stone-700 text-white font-bold rounded text-xs hover:bg-stone-600 transition-colors">
          NEW MARKS
        </button>
      </div>
      <p className="mt-2 text-xs text-stone-700 font-medium">Drag to smudge the charcoal</p>
    </div>
  );
};

// --- WATERCOLOR BLEED ---
export const WatercolorBleed = () => {
  const [drops, setDrops] = useState<Array<{
    id: number;
    x: number;
    y: number;
    color: string;
    size: number;
  }>>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const colors = [
    'rgba(239, 68, 68, 0.4)',
    'rgba(59, 130, 246, 0.4)',
    'rgba(34, 197, 94, 0.4)',
    'rgba(249, 115, 22, 0.4)',
    'rgba(139, 92, 246, 0.4)',
    'rgba(236, 72, 153, 0.4)',
  ];

  const addDrop = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = 40 + Math.random() * 60;

    setDrops(prev => [...prev, { id: Date.now(), x, y, color, size }]);
  };

  const clearDrops = () => setDrops([]);

  return (
    <div className="h-full bg-stone-100 flex flex-col items-center justify-center p-4">
      <style>{`
        @keyframes watercolorBleed {
          0% {
            transform: scale(0);
            opacity: 0.8;
            filter: blur(0px);
          }
          50% {
            transform: scale(1.2);
            opacity: 0.6;
            filter: blur(5px);
          }
          100% {
            transform: scale(1);
            opacity: 0.4;
            filter: blur(10px);
          }
        }
        @keyframes watercolorEdge {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1.3); opacity: 0.3; }
        }
        .watercolor-drop {
          animation: watercolorBleed 2s ease-out forwards;
        }
        .watercolor-edge {
          animation: watercolorEdge 2.5s ease-out forwards;
        }
      `}</style>

      <div
        ref={containerRef}
        onClick={addDrop}
        className="relative w-full max-w-xs h-48 bg-white rounded-lg shadow-inner cursor-crosshair overflow-hidden"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(200, 200, 200, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(200, 200, 200, 0.1) 0%, transparent 50%)
          `,
          border: '3px solid #d4d4d4',
        }}
      >
        {/* Paper texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {drops.map(drop => (
          <div key={drop.id}>
            {/* Main bleed */}
            <div
              className="watercolor-drop absolute rounded-full"
              style={{
                left: drop.x - drop.size / 2,
                top: drop.y - drop.size / 2,
                width: drop.size,
                height: drop.size,
                backgroundColor: drop.color,
              }}
            />
            {/* Edge bloom */}
            <div
              className="watercolor-edge absolute rounded-full"
              style={{
                left: drop.x - drop.size * 0.6,
                top: drop.y - drop.size * 0.6,
                width: drop.size * 1.2,
                height: drop.size * 1.2,
                backgroundColor: drop.color.replace('0.4', '0.2'),
              }}
            />
          </div>
        ))}

        {drops.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-stone-400 text-sm font-medium">
            Click to add watercolor drops
          </div>
        )}
      </div>

      <button
        onClick={clearDrops}
        className="mt-4 px-4 py-2 bg-blue-500 text-white font-bold rounded text-xs hover:bg-blue-600 transition-colors"
      >
        NEW PAPER
      </button>
    </div>
  );
};

// --- SCULPTORS CLAY ---
export const SculptorsClay = () => {
  const [shapes, setShapes] = useState<Array<{
    id: number;
    x: number;
    y: number;
    width: number;
    height: number;
    rotation: number;
  }>>([
    { id: 1, x: 80, y: 60, width: 60, height: 40, rotation: 0 },
  ]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [clayColor, setClayColor] = useState('#c2956a');
  const containerRef = useRef<HTMLDivElement>(null);

  const colors = ['#c2956a', '#8b7355', '#d4a574', '#a0522d', '#6b4423'];

  const handleMouseDown = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedId(id);
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || selectedId === null || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setShapes(prev => prev.map(s =>
      s.id === selectedId ? { ...s, x, y } : s
    ));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const addClay = () => {
    setShapes(prev => [...prev, {
      id: Date.now(),
      x: 50 + Math.random() * 100,
      y: 50 + Math.random() * 50,
      width: 40 + Math.random() * 30,
      height: 30 + Math.random() * 20,
      rotation: Math.random() * 30 - 15,
    }]);
  };

  const smashShape = (id: number) => {
    setShapes(prev => prev.map(s => {
      if (s.id === id) {
        return { ...s, width: s.width * 1.3, height: s.height * 0.7 };
      }
      return s;
    }));
  };

  const clearAll = () => setShapes([{ id: Date.now(), x: 80, y: 60, width: 60, height: 40, rotation: 0 }]);

  return (
    <div className="h-full bg-stone-600 flex flex-col items-center justify-center p-4">
      <div className="flex gap-2 mb-3">
        {colors.map(c => (
          <button
            key={c}
            onClick={() => setClayColor(c)}
            className={`w-6 h-6 rounded-full border-2 transition-transform ${clayColor === c ? 'scale-125 border-white' : 'border-transparent hover:scale-110'}`}
            style={{ backgroundColor: c }}
          />
        ))}
      </div>

      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="relative w-full max-w-xs h-48 rounded-lg shadow-inner overflow-hidden"
        style={{ backgroundColor: '#4a4a4a', border: '4px solid #333' }}
      >
        {/* Work surface texture */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)`,
        }} />

        {shapes.map(shape => (
          <div
            key={shape.id}
            onMouseDown={(e) => handleMouseDown(shape.id, e)}
            onDoubleClick={() => smashShape(shape.id)}
            className={`absolute cursor-grab active:cursor-grabbing transition-all duration-150 ${selectedId === shape.id ? 'ring-2 ring-white ring-opacity-50' : ''}`}
            style={{
              left: shape.x - shape.width / 2,
              top: shape.y - shape.height / 2,
              width: shape.width,
              height: shape.height,
              backgroundColor: clayColor,
              borderRadius: '40% 60% 50% 50% / 50% 50% 60% 40%',
              transform: `rotate(${shape.rotation}deg)`,
              boxShadow: `
                inset -5px -5px 10px rgba(0,0,0,0.3),
                inset 5px 5px 10px rgba(255,255,255,0.1),
                3px 3px 8px rgba(0,0,0,0.4)
              `,
            }}
          />
        ))}
      </div>

      <div className="flex gap-2 mt-4">
        <button onClick={addClay} className="px-4 py-2 bg-amber-700 text-white font-bold rounded text-xs hover:bg-amber-600 transition-colors">
          ADD CLAY
        </button>
        <button onClick={clearAll} className="px-4 py-2 bg-stone-400 text-stone-800 font-bold rounded text-xs hover:bg-stone-300 transition-colors">
          RESET
        </button>
      </div>
      <p className="mt-2 text-xs text-stone-300 font-medium">Drag to move, double-click to smash</p>
    </div>
  );
};

// --- ARTIST PALETTE ---
export const ArtistPalette = () => {
  const [wells, setWells] = useState([
    { id: 1, color: '#ef4444', amount: 100 },
    { id: 2, color: '#f97316', amount: 100 },
    { id: 3, color: '#eab308', amount: 100 },
    { id: 4, color: '#22c55e', amount: 100 },
    { id: 5, color: '#3b82f6', amount: 100 },
    { id: 6, color: '#8b5cf6', amount: 100 },
    { id: 7, color: '#ffffff', amount: 100 },
    { id: 8, color: '#1a1a1a', amount: 100 },
  ]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [mixingArea, setMixingArea] = useState<string[]>([]);

  const selectWell = (color: string, id: number) => {
    setSelectedColor(color);
    setWells(prev => prev.map(w =>
      w.id === id ? { ...w, amount: Math.max(0, w.amount - 10) } : w
    ));
    if (mixingArea.length < 3) {
      setMixingArea(prev => [...prev, color]);
    }
  };

  const getMixedColor = () => {
    if (mixingArea.length === 0) return '#d4c4a8';

    let r = 0, g = 0, b = 0;
    mixingArea.forEach(hex => {
      r += parseInt(hex.slice(1, 3), 16);
      g += parseInt(hex.slice(3, 5), 16);
      b += parseInt(hex.slice(5, 7), 16);
    });
    r = Math.round(r / mixingArea.length);
    g = Math.round(g / mixingArea.length);
    b = Math.round(b / mixingArea.length);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const clearMixing = () => setMixingArea([]);

  const refillAll = () => setWells(prev => prev.map(w => ({ ...w, amount: 100 })));

  return (
    <div className="h-full bg-stone-200 flex items-center justify-center p-4">
      <div className="relative">
        {/* Palette shape */}
        <svg viewBox="0 0 200 160" className="w-64 h-52">
          <defs>
            <linearGradient id="paletteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c2956a" />
              <stop offset="50%" stopColor="#a67c52" />
              <stop offset="100%" stopColor="#8b6914" />
            </linearGradient>
            <filter id="woodGrain">
              <feTurbulence type="fractalNoise" baseFrequency="0.02 0.15" numOctaves="2" />
              <feColorMatrix type="saturate" values="0" />
              <feBlend in="SourceGraphic" mode="multiply" />
            </filter>
          </defs>

          {/* Palette body */}
          <path
            d="M30,80 Q10,40 50,20 Q100,5 150,20 Q190,35 180,80 Q175,120 140,145 Q100,160 60,145 Q20,130 30,80 Z"
            fill="url(#paletteGrad)"
            filter="url(#woodGrain)"
            stroke="#5c4033"
            strokeWidth="2"
          />

          {/* Thumb hole */}
          <ellipse cx="50" cy="80" rx="15" ry="20" fill="#d4c4a8" stroke="#5c4033" strokeWidth="2" />

          {/* Color wells */}
          {wells.map((well, i) => {
            const angle = (i / wells.length) * Math.PI * 1.2 - 0.3;
            const x = 115 + Math.cos(angle) * 50;
            const y = 75 + Math.sin(angle) * 40;
            return (
              <g key={well.id}>
                {/* Well depression */}
                <circle
                  cx={x}
                  cy={y}
                  r="14"
                  fill="#8b6914"
                  opacity="0.5"
                />
                {/* Paint */}
                <circle
                  cx={x}
                  cy={y}
                  r={12 * (well.amount / 100)}
                  fill={well.color}
                  className="cursor-pointer transition-all hover:brightness-110"
                  onClick={() => selectWell(well.color, well.id)}
                  style={{
                    filter: well.amount > 0 ? 'drop-shadow(0 2px 2px rgba(0,0,0,0.3))' : 'none',
                  }}
                />
              </g>
            );
          })}

          {/* Mixing area */}
          <ellipse
            cx="115"
            cy="75"
            rx="25"
            ry="20"
            fill={getMixedColor()}
            stroke="#5c4033"
            strokeWidth="1"
            className="cursor-pointer"
            onClick={clearMixing}
          />
        </svg>

        {/* Selected color indicator */}
        {selectedColor && (
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
            <div className="w-6 h-6 rounded-full border-2 border-stone-600" style={{ backgroundColor: selectedColor }} />
            <span className="text-xs font-bold text-stone-600">Selected</span>
          </div>
        )}
      </div>

      <div className="absolute bottom-4 flex gap-2">
        <button onClick={clearMixing} className="px-3 py-1.5 bg-stone-500 text-white font-bold rounded text-xs hover:bg-stone-400 transition-colors">
          CLEAR MIX
        </button>
        <button onClick={refillAll} className="px-3 py-1.5 bg-amber-700 text-white font-bold rounded text-xs hover:bg-amber-600 transition-colors">
          REFILL
        </button>
      </div>
    </div>
  );
};

export const artistStudioComponents = {
  'mirror-mode': MirrorMode,
  'shadow-depth': ShadowDepth,
  'liquid-crystal': LiquidCrystal,
  'thermal-paper': ThermalPaper,
  'puzzle-modules': PuzzleModules,
  'color-palette': ColorPalette,
  'canvas-brush': CanvasBrush,
  // DataToolsDemos components
  'polaroid-developer': PolaroidDeveloper,
  // HandDrawnLab
  'hand-drawn-lab': HandDrawnLab,
  // DesignSystemApp
  'design-system-app': DesignSystemApp,
  // AssetLab
  'asset-lab': AssetLab,
  // New Art Studio Components
  'paint-splatter': PaintSplatter,
  'brush-stroke': BrushStroke,
  'sketch-pad': SketchPad,
  'color-mixer': ColorMixer,
  'easel-canvas': EaselCanvas,
  'ink-drip': InkDrip,
  'charcoal-smudge': CharcoalSmudge,
  'watercolor-bleed': WatercolorBleed,
  'sculptors-clay': SculptorsClay,
  'artist-palette': ArtistPalette,
};
