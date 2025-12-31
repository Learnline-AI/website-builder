import { useState, useEffect, useRef, useCallback } from 'react';
import { Activity, Infinity as InfinityIcon, Settings, Box } from '../shared/icons';

// --- ESCHER STAIRCASE ---
export const EscherStaircase = () => {
  const [level, setLevel] = useState(0);
  const steps = [
    { name: "Root", color: "bg-indigo-600" },
    { name: "Child", color: "bg-blue-600" },
    { name: "Nested", color: "bg-teal-600" }
  ];

  return (
    <div className="h-full bg-zinc-900 flex items-center justify-center p-4">
      <div className="relative w-40 h-40" style={{ perspective: '600px', transformStyle: 'preserve-3d' }}>
        <div
          className="w-full h-full relative transition-transform duration-1000"
          style={{ transform: `rotateY(${level * 90}deg)`, transformStyle: 'preserve-3d' }}
        >
          {steps.map((step, i) => (
            <div
              key={i}
              onClick={() => setLevel(i)}
              className={`absolute w-32 h-10 flex items-center justify-center font-bold text-white shadow-xl cursor-pointer ${step.color}`}
              style={{
                transform: `rotateY(${i * 90}deg) translateZ(60px) translateY(${i * -30}px)`,
                transformStyle: 'preserve-3d'
              }}
            >
              {step.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- VECTOR FIELD LINK ---
export const VectorFieldLink = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="h-full bg-zinc-100 flex items-center justify-center p-4">
      <p className="text-gray-800 text-sm">
        Access the{' '}
        <span
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative text-blue-600 cursor-pointer font-bold inline-block overflow-visible px-1"
        >
          Documentation
          {isHovered && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1.5 h-1.5 bg-blue-400 rounded-full animate-vector"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random()}s`
                  }}
                />
              ))}
            </div>
          )}
        </span>
        {' '}portal.
      </p>
      <style>{`
        @keyframes vector {
          0% { transform: translate(0, 0); opacity: 1; }
          100% { transform: translate(15px, 15px); opacity: 0; }
        }
        .animate-vector { animation: vector 0.8s linear infinite; }
      `}</style>
    </div>
  );
};

// --- TETRIS LAYOUT ---
export const TetrisLayout = () => {
  const blocks = [
    { text: "A", x: 0, y: 0, w: 2, h: 2, color: "bg-red-500" },
    { text: "B", x: 2, y: 0, w: 2, h: 1, color: "bg-blue-500" },
    { text: "C", x: 0, y: 2, w: 1, h: 1, color: "bg-green-500" },
    { text: "D", x: 1, y: 2, w: 3, h: 1, color: "bg-yellow-500" },
  ];
  const cellSize = 40;

  return (
    <div className="h-full bg-zinc-800 flex items-center justify-center p-4">
      <div
        className="relative border-4 border-zinc-600 bg-zinc-700"
        style={{ width: 4 * cellSize, height: 3 * cellSize }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{ backgroundImage: `linear-gradient(to right, #666 1px, transparent 1px), linear-gradient(to bottom, #666 1px, transparent 1px)`, backgroundSize: `${cellSize}px ${cellSize}px` }}
        />
        {blocks.map((block, i) => (
          <div
            key={i}
            className={`absolute font-black text-white flex items-center justify-center border-2 border-black/50 ${block.color}`}
            style={{
              width: block.w * cellSize,
              height: block.h * cellSize,
              left: block.x * cellSize,
              top: block.y * cellSize,
            }}
          >
            {block.text}
          </div>
        ))}
      </div>
    </div>
  );
};

// --- FRACTAL ZOOM ---
export const FractalZoom = () => {
  const [zoom, setZoom] = useState(0);

  const getTransform = () => {
    if (zoom === 0) return 'scale(1)';
    if (zoom === 1) return 'scale(3) translate(-10%, -10%)';
    return 'scale(8) translate(-15%, 5%)';
  };

  return (
    <div className="h-full bg-zinc-950 flex items-center justify-center p-4 overflow-hidden">
      <div
        className="relative font-mono text-white transition-transform duration-1000 origin-center"
        style={{ transform: getTransform() }}
      >
        <div
          onClick={() => setZoom(z => (z + 1) % 3)}
          className="text-4xl cursor-zoom-in"
        >
          THEORY
        </div>
        <div className={`absolute top-0 left-1/2 text-sm text-green-400 transition-opacity ${zoom >= 1 ? 'opacity-100' : 'opacity-0'}`}>
          Hypothesis δ
        </div>
        <div className={`absolute -top-4 left-1/4 text-xs text-yellow-400 transition-opacity ${zoom >= 2 ? 'opacity-100' : 'opacity-0'}`}>
          <Activity size={12} /> Data Point α
        </div>
      </div>
      <button
        onClick={() => setZoom(0)}
        className="absolute bottom-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs"
      >
        Reset
      </button>
    </div>
  );
};

// --- VORONOI FILTER ---
export const VoronoiFilter = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const data = [
    { type: 'A', x: 20, y: 30 }, { type: 'B', x: 70, y: 10 },
    { type: 'A', x: 45, y: 70 }, { type: 'C', x: 90, y: 50 },
    { type: 'B', x: 10, y: 90 },
  ];

  return (
    <div className="h-full bg-zinc-900 flex flex-col items-center justify-center p-4">
      <div className="flex gap-2 mb-4">
        {['all', 'A', 'B', 'C'].map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-2 py-1 text-xs rounded ${
              activeFilter === filter ? 'bg-white text-black' : 'bg-zinc-700 text-white'
            }`}
          >
            {filter.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="relative w-48 h-32 border-2 border-white">
        {data.map((item, i) => (
          <div
            key={i}
            className={`absolute w-4 h-4 rounded-full border-2 border-white flex items-center justify-center text-[8px] transition-all ${
              item.type === 'A' ? 'bg-red-400' : item.type === 'B' ? 'bg-blue-400' : 'bg-green-400'
            }`}
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              transform: 'translate(-50%, -50%)',
              opacity: activeFilter === 'all' || activeFilter === item.type ? 1 : 0.2,
              scale: activeFilter === 'all' || activeFilter === item.type ? '1' : '0.7'
            }}
          >
            {item.type}
          </div>
        ))}
      </div>
    </div>
  );
};

// --- MÖBIUS STRIP ---
export const MobiusStrip = () => {
  const [isTwisting, setIsTwisting] = useState(false);

  return (
    <div className="h-full bg-zinc-100 flex items-center justify-center p-4">
      <button
        onClick={() => {
          setIsTwisting(true);
          setTimeout(() => setIsTwisting(false), 1500);
        }}
        className="px-4 py-2 bg-purple-600 text-white font-bold rounded shadow-lg"
      >
        Begin Loop
      </button>
      <div
        className={`absolute w-32 h-8 border-2 border-purple-500 bg-purple-300/50 flex items-center justify-center text-purple-900 font-mono text-xs transition-transform duration-1000 ${isTwisting ? 'animate-spin' : ''}`}
      >
        <InfinityIcon size={16} className="mr-1" />
        Processing
      </div>
    </div>
  );
};

// --- HEXAGON GRID ---
export const HexagonGrid = () => {
  const [activeHex, setActiveHex] = useState<number | null>(null);

  return (
    <div className="h-full bg-zinc-800 flex items-center justify-center p-4">
      <div className="flex flex-wrap justify-center" style={{ width: '160px' }}>
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            onClick={() => setActiveHex(i)}
            className={`w-12 h-10 flex items-center justify-center cursor-pointer transition-all text-white font-mono text-xs ${
              activeHex === i ? 'bg-cyan-500 scale-110' : 'bg-zinc-600 hover:bg-zinc-500'
            }`}
            style={{
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              margin: '-5px'
            }}
          >
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

// ============ TEXTURE DEMOS ============

// --- TOPOGRAPHY LINK ---
export const TopographyLink = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="h-full bg-[#f4f1ea] flex items-center justify-center overflow-hidden relative">
      {/* Contours Background */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-[#d4c5a0] stroke-[1] fill-none transition-all duration-1000" style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}>
         {/* Simple concentric blobs */}
         <path d="M 100 100 Q 400 50 700 100 T 900 300 T 500 500 T 100 300 Z" opacity="0.5" />
         <path d="M 150 150 Q 400 100 650 150 T 850 300 T 500 450 T 150 300 Z" opacity="0.6" />
         <path d="M 200 200 Q 400 150 600 200 T 800 300 T 500 400 T 200 300 Z" opacity="0.7" />
         <path d="M 250 250 Q 400 200 550 250 T 750 300 T 500 350 T 250 300 Z" opacity="0.8" />
      </svg>

      <a
        href="#"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative z-10 font-serif font-bold text-4xl text-[#5c4b37] tracking-widest px-8 py-4 mix-blend-multiply transition-all duration-500"
      >
        <span className={`relative inline-block transition-transform duration-500 ${isHovered ? '-translate-y-2' : ''}`}>
          ELEVATION
        </span>

        {/* Rising Peak Effect */}
        <div
          className={`absolute bottom-0 left-0 w-full h-1 bg-[#5c4b37] transition-all duration-500 ${isHovered ? 'w-full opacity-100 scale-x-100' : 'w-0 opacity-0 scale-x-0'}`}
        />

        {/* Active Contour Lines around text */}
        {isHovered && (
          <svg className="absolute inset-[-50px] w-[calc(100%+100px)] h-[calc(100%+100px)] pointer-events-none animate-[spin_10s_linear_infinite]">
             <path d="M 50 50 Q 150 20 250 50 T 350 100 T 250 150 T 50 100 Z" fill="none" stroke="#5c4b37" strokeWidth="1" strokeDasharray="5,5" />
          </svg>
        )}
      </a>
    </div>
  );
};

// --- LOUVERED LESSON FEED ---
export const LouveredFeed = () => {
  const lessons = [
    { id: 1, front: "CHAPTER 01", back: "Thermodynamics: The study of heat and energy transfer." },
    { id: 2, front: "CHAPTER 02", back: "Kinetics: Analyzing the rates of chemical reactions." },
    { id: 3, front: "CHAPTER 03", back: "Electromagnetism: The interaction of electric currents." },
    { id: 4, front: "CHAPTER 04", back: "Quantum Mechanics: Physics at the subatomic scale." },
  ];

  return (
    <div className="h-full bg-zinc-900 flex items-center justify-center p-12 overflow-hidden">
      <div className="flex gap-2 h-96 perspective-[1000px]">
        {lessons.map((lesson, i) => (
          <div
            key={lesson.id}
            className="group relative w-24 h-full transition-all duration-500 preserve-3d hover:w-64"
            style={{ transitionDelay: `${i * 50}ms` }}
          >
            {/* The Slat */}
            <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:rotate-y-[-90deg] preserve-3d">
              {/* Front Side (The Blind) */}
              <div className="absolute inset-0 bg-zinc-800 border-x border-zinc-700 flex items-center justify-center backface-hidden">
                 <span className="rotate-90 whitespace-nowrap text-zinc-500 font-black tracking-widest text-xl font-mono">
                   {lesson.front}
                 </span>
              </div>
              {/* Back Side (The Content) */}
              <div className="absolute inset-0 bg-orange-500 p-6 flex items-center justify-center rotate-y-90 backface-hidden border-2 border-black shadow-2xl">
                <p className="text-black font-bold text-lg leading-tight">{lesson.back}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- BLUEPRINT "DE-RENDER" ---
export const BlueprintUI = () => {
  const [isDraft, setIsDraft] = useState(false);

  return (
    <div className={`h-full transition-colors duration-1000 p-12 flex flex-col items-center justify-center ${isDraft ? 'bg-[#0033cc]' : 'bg-gray-100'}`}>
      <div className="relative w-full max-w-2xl">
        {/* Main Content Card */}
        <div className={`
          relative transition-all duration-700 p-10
          ${isDraft ? 'bg-transparent border-2 border-dashed border-white/50 shadow-none' : 'bg-white border-none shadow-2xl rounded-2xl'}
        `}>
          <h1 className={`text-4xl font-bold mb-4 ${isDraft ? 'text-white font-mono' : 'text-gray-900'}`}>
            Project Architecture
          </h1>
          <p className={`${isDraft ? 'text-white/70 font-mono italic' : 'text-gray-600'}`}>
            Base infrastructure for the spatial rendering engine. All components utilize hardware acceleration.
          </p>

          {/* Annotations (Visible only in Blueprint mode) */}
          {isDraft && (
            <>
              <div className="absolute -top-6 left-0 text-[10px] text-white/50 font-mono">W: 672px</div>
              <div className="absolute top-0 -left-6 text-[10px] text-white/50 font-mono [writing-mode:vertical-lr]">H: 320px</div>
              <div className="absolute bottom-4 right-4 text-[10px] text-cyan-300 font-mono pulse-subtle">MODEL_V.04</div>
            </>
          )}

          <div className="mt-8 flex gap-4">
             <div className={`h-12 w-32 flex items-center justify-center border-2 ${isDraft ? 'border-white text-white font-mono' : 'bg-black text-white rounded-lg'}`}>
               {isDraft ? '<BUTTON/>' : 'Deploy'}
             </div>
             <div className={`h-12 w-32 flex items-center justify-center border-2 ${isDraft ? 'border-white/30 text-white/30 font-mono' : 'bg-gray-200 text-gray-500 rounded-lg'}`}>
               {isDraft ? '<CANCEL/>' : 'Dismiss'}
             </div>
          </div>
        </div>

        {/* Blueprint Grid Background */}
        {isDraft && (
          <div className="absolute inset-[-100px] opacity-20 pointer-events-none"
               style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        )}
      </div>

      <button
        onClick={() => setIsDraft(!isDraft)}
        className="mt-12 flex items-center gap-2 bg-white border-2 border-black px-6 py-3 font-bold hover:bg-black hover:text-white transition-all shadow-[4px_4px_0_0_#000]"
      >
        <Settings size={20} className={isDraft ? 'animate-spin' : ''} />
        {isDraft ? 'RESTORE RENDERING' : 'DE-RENDER (BLUEPRINT)'}
      </button>
    </div>
  );
};

// --- 3D PRISM MULTI-VIEW ---
export const PrismView = () => {
  const [rotation, setRotation] = useState(0);
  const perspectives = [
    { title: "SOCIAL", content: "Impact on common citizens and community structures.", color: "bg-blue-500/80" },
    { title: "POLITICAL", content: "Shifts in power dynamics and governmental policy.", color: "bg-red-500/80" },
    { title: "ECONOMIC", content: "Resource allocation, trade, and financial consequences.", color: "bg-green-500/80" },
  ];

  return (
    <div className="h-full bg-black flex flex-col items-center justify-center p-10 overflow-hidden">
      <div className="relative w-80 h-80 perspective-[1000px]">
        <div
          className="w-full h-full relative preserve-3d transition-transform duration-1000 ease-in-out"
          style={{ transform: `rotateY(${rotation}deg)` }}
        >
          {perspectives.map((p, i) => (
            <div
              key={i}
              className={`absolute inset-0 ${p.color} border-4 border-white/30 p-8 flex flex-col items-center justify-center text-center backface-hidden`}
              style={{ transform: `rotateY(${i * 120}deg) translateZ(140px)` }}
            >
              <Box className="text-white mb-4" size={48} />
              <h2 className="text-white text-3xl font-black mb-2">{p.title}</h2>
              <p className="text-white/80 font-mono text-sm">{p.content}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 flex gap-4">
        {perspectives.map((p, i) => (
          <button
            key={i}
            onClick={() => setRotation(i * -120)}
            className="px-4 py-2 border-2 border-white text-white font-bold hover:bg-white hover:text-black transition-colors"
          >
            {p.title}
          </button>
        ))}
      </div>
    </div>
  );
};

// ============ NEW GEOMETRY COMPONENTS ============

// --- FRACTAL TREE ---
export const FractalTree = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [depth, setDepth] = useState(8);
  const [angle, setAngle] = useState(25);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<number>(0);

  const drawBranch = useCallback((
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    length: number,
    angleRad: number,
    currentDepth: number,
    maxDepth: number
  ) => {
    if (currentDepth > maxDepth) return;

    const endX = x + length * Math.cos(angleRad);
    const endY = y + length * Math.sin(angleRad);

    const hue = 120 + (currentDepth / maxDepth) * 60;
    const lightness = 30 + (currentDepth / maxDepth) * 30;
    ctx.strokeStyle = `hsl(${hue}, 70%, ${lightness}%)`;
    ctx.lineWidth = Math.max(1, (maxDepth - currentDepth) * 0.8);

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(endX, endY);
    ctx.stroke();

    const newLength = length * 0.72;
    const angleOffset = (angle * Math.PI) / 180;

    drawBranch(ctx, endX, endY, newLength, angleRad - angleOffset, currentDepth + 1, maxDepth);
    drawBranch(ctx, endX, endY, newLength, angleRad + angleOffset, currentDepth + 1, maxDepth);
  }, [angle]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawBranch(ctx, canvas.width / 2, canvas.height - 20, 60, -Math.PI / 2, 0, depth);
  }, [depth, angle, drawBranch]);

  useEffect(() => {
    if (isAnimating) {
      let currentAngle = angle;
      let direction = 1;
      const animate = () => {
        currentAngle += direction * 0.5;
        if (currentAngle > 45 || currentAngle < 15) direction *= -1;
        setAngle(currentAngle);
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(animationRef.current);
  }, [isAnimating]);

  return (
    <div className="h-full bg-zinc-950 flex flex-col items-center justify-center p-4">
      <canvas ref={canvasRef} width={300} height={220} className="border border-zinc-700 rounded" />
      <div className="mt-4 flex gap-4">
        <div className="flex items-center gap-2">
          <span className="text-zinc-400 text-xs">Depth:</span>
          <input
            type="range"
            min="3"
            max="12"
            value={depth}
            onChange={(e) => setDepth(Number(e.target.value))}
            className="w-20 accent-green-500"
          />
          <span className="text-green-400 text-xs w-4">{depth}</span>
        </div>
        <button
          onClick={() => setIsAnimating(!isAnimating)}
          className={`px-3 py-1 text-xs font-mono rounded ${isAnimating ? 'bg-red-600 text-white' : 'bg-green-600 text-white'}`}
        >
          {isAnimating ? 'STOP' : 'ANIMATE'}
        </button>
      </div>
    </div>
  );
};

// --- TESSELATION GRID ---
export const TesselationGrid = () => {
  const [pattern, setPattern] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  const patterns = [
    { name: 'Triangles', shape: 'polygon(50% 0%, 100% 100%, 0% 100%)' },
    { name: 'Hexagons', shape: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' },
    { name: 'Diamonds', shape: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' },
  ];

  const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#8b5cf6'];

  return (
    <div className="h-full bg-zinc-900 flex flex-col items-center justify-center p-4">
      <div className="grid grid-cols-6 gap-1 mb-4">
        {[...Array(36)].map((_, i) => (
          <div
            key={i}
            className="w-8 h-8 transition-all duration-500"
            style={{
              clipPath: patterns[pattern].shape,
              backgroundColor: colors[i % colors.length],
              transform: isAnimating ? `rotate(${(i * 15) + (Date.now() / 50 % 360)}deg)` : 'rotate(0deg)',
              animation: isAnimating ? `tessellate-${i % 3} 3s ease-in-out infinite` : 'none',
              animationDelay: `${i * 50}ms`,
            }}
          />
        ))}
      </div>
      <div className="flex gap-2">
        {patterns.map((p, i) => (
          <button
            key={i}
            onClick={() => setPattern(i)}
            className={`px-3 py-1 text-xs font-mono rounded transition-all ${
              pattern === i ? 'bg-white text-black' : 'bg-zinc-700 text-white hover:bg-zinc-600'
            }`}
          >
            {p.name}
          </button>
        ))}
        <button
          onClick={() => setIsAnimating(!isAnimating)}
          className={`px-3 py-1 text-xs font-mono rounded ${isAnimating ? 'bg-cyan-500 text-black' : 'bg-zinc-600 text-white'}`}
        >
          {isAnimating ? 'ON' : 'OFF'}
        </button>
      </div>
      <style>{`
        @keyframes tessellate-0 { 0%, 100% { transform: rotate(0deg) scale(1); } 50% { transform: rotate(180deg) scale(1.1); } }
        @keyframes tessellate-1 { 0%, 100% { transform: rotate(0deg) scale(1); } 50% { transform: rotate(-180deg) scale(0.9); } }
        @keyframes tessellate-2 { 0%, 100% { transform: rotate(0deg) scale(1); } 50% { transform: rotate(90deg) scale(1.05); } }
      `}</style>
    </div>
  );
};

// --- GOLDEN SPIRAL ---
export const GoldenSpiral = () => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(true);
  const animationRef = useRef<number>(0);

  const phi = 1.618033988749;
  const squares = 8;

  useEffect(() => {
    if (isSpinning) {
      const animate = () => {
        setRotation((r) => (r + 0.5) % 360);
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(animationRef.current);
  }, [isSpinning]);

  const generateSpiral = () => {
    const elements = [];
    let size = 100;
    let x = 0;
    let y = 0;

    for (let i = 0; i < squares; i++) {
      const nextSize = size / phi;
      const hue = (i * 40 + rotation) % 360;

      elements.push(
        <div
          key={i}
          className="absolute border-2 border-amber-500/50 transition-all duration-300"
          style={{
            width: size,
            height: size,
            left: `calc(50% + ${x}px)`,
            top: `calc(50% + ${y}px)`,
            backgroundColor: `hsla(${hue}, 70%, 50%, 0.2)`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      );

      const direction = i % 4;
      if (direction === 0) x += size / 2 - nextSize / 2;
      else if (direction === 1) y += size / 2 - nextSize / 2;
      else if (direction === 2) x -= size / 2 - nextSize / 2;
      else y -= size / 2 - nextSize / 2;

      size = nextSize;
    }
    return elements;
  };

  return (
    <div className="h-full bg-zinc-950 flex flex-col items-center justify-center p-4 overflow-hidden">
      <div
        className="relative w-64 h-64 transition-transform duration-100"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {generateSpiral()}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
          <path
            d="M 100 100 Q 100 50 150 50 Q 200 50 200 100 Q 200 175 125 175 Q 50 175 50 100 Q 50 25 125 25"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="2"
            strokeDasharray="5,5"
          />
        </svg>
      </div>
      <div className="mt-4 flex gap-4 items-center">
        <span className="text-amber-400 font-mono text-sm">PHI = {phi.toFixed(6)}</span>
        <button
          onClick={() => setIsSpinning(!isSpinning)}
          className={`px-3 py-1 text-xs font-mono rounded ${isSpinning ? 'bg-amber-500 text-black' : 'bg-zinc-700 text-amber-400'}`}
        >
          {isSpinning ? 'SPINNING' : 'PAUSED'}
        </button>
      </div>
    </div>
  );
};

// --- PLATONIC SOLIDS ---
export const PlatonicSolids = () => {
  const [solid, setSolid] = useState(0);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const animationRef = useRef<number>(0);

  const solids = [
    { name: 'Tetrahedron', faces: 4, vertices: 4, edges: 6, color: '#ef4444' },
    { name: 'Cube', faces: 6, vertices: 8, edges: 12, color: '#22c55e' },
    { name: 'Octahedron', faces: 8, vertices: 6, edges: 12, color: '#3b82f6' },
    { name: 'Dodecahedron', faces: 12, vertices: 20, edges: 30, color: '#a855f7' },
    { name: 'Icosahedron', faces: 20, vertices: 12, edges: 30, color: '#f97316' },
  ];

  useEffect(() => {
    const animate = () => {
      setRotation((r) => ({ x: (r.x + 0.8) % 360, y: (r.y + 1.2) % 360 }));
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  const currentSolid = solids[solid];

  const renderSolid = () => {
    const faceCount = currentSolid.faces;
    const faces = [];

    for (let i = 0; i < Math.min(faceCount, 8); i++) {
      const angleY = (360 / Math.min(faceCount, 8)) * i;
      const angleX = i % 2 === 0 ? 20 : -20;

      faces.push(
        <div
          key={i}
          className="absolute w-16 h-16 border-2 transition-all duration-300"
          style={{
            backgroundColor: `${currentSolid.color}40`,
            borderColor: currentSolid.color,
            transform: `rotateY(${angleY}deg) rotateX(${angleX}deg) translateZ(40px)`,
            clipPath: solid === 0 ? 'polygon(50% 0%, 100% 100%, 0% 100%)' :
                      solid === 2 ? 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' :
                      'none',
          }}
        />
      );
    }
    return faces;
  };

  return (
    <div className="h-full bg-zinc-900 flex flex-col items-center justify-center p-4">
      <div
        className="relative w-40 h-40 preserve-3d"
        style={{
          perspective: '600px',
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {renderSolid()}
      </div>

      <div className="mt-6 text-center">
        <h3 className="text-white font-bold text-lg" style={{ color: currentSolid.color }}>
          {currentSolid.name}
        </h3>
        <p className="text-zinc-400 text-xs font-mono mt-1">
          F:{currentSolid.faces} V:{currentSolid.vertices} E:{currentSolid.edges}
        </p>
      </div>

      <div className="mt-4 flex gap-2 flex-wrap justify-center">
        {solids.map((s, i) => (
          <button
            key={i}
            onClick={() => setSolid(i)}
            className="w-8 h-8 rounded-full border-2 transition-all"
            style={{
              backgroundColor: solid === i ? s.color : 'transparent',
              borderColor: s.color,
            }}
          />
        ))}
      </div>
    </div>
  );
};

// --- VORONOI DIAGRAM ---
export const VoronoiDiagram = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [points, setPoints] = useState<{ x: number; y: number; color: string }[]>([]);

  const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#8b5cf6', '#ec4899'];

  useEffect(() => {
    const initialPoints = Array.from({ length: 8 }, () => ({
      x: Math.random() * 280 + 10,
      y: Math.random() * 180 + 10,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setPoints(initialPoints);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || points.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.createImageData(canvas.width, canvas.height);

    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        let minDist = Infinity;
        let closestPoint = points[0];

        for (const point of points) {
          const dist = Math.sqrt((x - point.x) ** 2 + (y - point.y) ** 2);
          if (dist < minDist) {
            minDist = dist;
            closestPoint = point;
          }
        }

        const color = closestPoint.color;
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);

        const idx = (y * canvas.width + x) * 4;
        imageData.data[idx] = r;
        imageData.data[idx + 1] = g;
        imageData.data[idx + 2] = b;
        imageData.data[idx + 3] = minDist < 3 ? 0 : 180;
      }
    }

    ctx.putImageData(imageData, 0, 0);

    points.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  }, [points]);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPoints([...points, { x, y, color: colors[Math.floor(Math.random() * colors.length)] }]);
  };

  return (
    <div className="h-full bg-zinc-950 flex flex-col items-center justify-center p-4">
      <canvas
        ref={canvasRef}
        width={300}
        height={200}
        onClick={handleClick}
        className="border border-zinc-600 rounded cursor-crosshair"
      />
      <div className="mt-3 flex gap-3">
        <span className="text-zinc-400 text-xs">Click to add points</span>
        <button
          onClick={() => setPoints([])}
          className="px-3 py-1 text-xs font-mono bg-red-600 text-white rounded hover:bg-red-500"
        >
          RESET
        </button>
        <span className="text-cyan-400 text-xs font-mono">N={points.length}</span>
      </div>
    </div>
  );
};

// --- PENROSE TILING ---
export const PenroseTiling = () => {
  const [generation, setGeneration] = useState(3);
  const [colorScheme, setColorScheme] = useState(0);

  const schemes = [
    { thin: '#3b82f6', thick: '#8b5cf6' },
    { thin: '#ef4444', thick: '#f97316' },
    { thin: '#22c55e', thick: '#06b6d4' },
  ];

  const generateTiles = () => {
    const tiles = [];
    const baseSize = 40 / generation;

    for (let row = 0; row < generation * 4; row++) {
      for (let col = 0; col < generation * 5; col++) {
        const isThick = (row + col) % 2 === 0;
        const offset = row % 2 === 0 ? 0 : baseSize / 2;

        tiles.push(
          <div
            key={`${row}-${col}`}
            className="absolute transition-all duration-500"
            style={{
              width: baseSize,
              height: baseSize * 1.618,
              left: col * baseSize + offset,
              top: row * baseSize * 0.8,
              backgroundColor: isThick ? schemes[colorScheme].thick : schemes[colorScheme].thin,
              clipPath: isThick
                ? 'polygon(50% 0%, 100% 38%, 100% 100%, 0% 100%, 0% 38%)'
                : 'polygon(50% 0%, 100% 62%, 50% 100%, 0% 62%)',
              opacity: 0.8,
              transform: `rotate(${(row + col) * 36}deg)`,
            }}
          />
        );
      }
    }
    return tiles;
  };

  return (
    <div className="h-full bg-zinc-950 flex flex-col items-center justify-center p-4 overflow-hidden">
      <div className="relative w-72 h-48 overflow-hidden border border-zinc-700 rounded">
        {generateTiles()}
      </div>
      <div className="mt-4 flex gap-4">
        <div className="flex items-center gap-2">
          <span className="text-zinc-400 text-xs">Gen:</span>
          <input
            type="range"
            min="2"
            max="5"
            value={generation}
            onChange={(e) => setGeneration(Number(e.target.value))}
            className="w-16 accent-purple-500"
          />
        </div>
        <div className="flex gap-1">
          {schemes.map((s, i) => (
            <button
              key={i}
              onClick={() => setColorScheme(i)}
              className="w-6 h-6 rounded border-2 transition-all"
              style={{
                background: `linear-gradient(135deg, ${s.thin} 50%, ${s.thick} 50%)`,
                borderColor: colorScheme === i ? '#fff' : 'transparent',
              }}
            />
          ))}
        </div>
      </div>
      <p className="text-zinc-500 text-xs mt-2 font-mono">Aperiodic Tiling Pattern</p>
    </div>
  );
};

// --- MANDELBROT ZOOM ---
export const MandelbrotZoom = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState({ x: -0.5, y: 0 });
  const [maxIter, setMaxIter] = useState(50);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const imageData = ctx.createImageData(width, height);

    const scale = 3 / zoom;

    for (let py = 0; py < height; py++) {
      for (let px = 0; px < width; px++) {
        const x0 = center.x + (px - width / 2) * scale / width;
        const y0 = center.y + (py - height / 2) * scale / height;

        let x = 0;
        let y = 0;
        let iteration = 0;

        while (x * x + y * y <= 4 && iteration < maxIter) {
          const xTemp = x * x - y * y + x0;
          y = 2 * x * y + y0;
          x = xTemp;
          iteration++;
        }

        const idx = (py * width + px) * 4;

        if (iteration === maxIter) {
          imageData.data[idx] = 0;
          imageData.data[idx + 1] = 0;
          imageData.data[idx + 2] = 0;
        } else {
          const hue = (iteration / maxIter) * 360;
          const [r, g, b] = hslToRgb(hue / 360, 1, 0.5);
          imageData.data[idx] = r;
          imageData.data[idx + 1] = g;
          imageData.data[idx + 2] = b;
        }
        imageData.data[idx + 3] = 255;
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }, [zoom, center, maxIter]);

  const hslToRgb = (h: number, s: number, l: number): [number, number, number] => {
    let r, g, b;
    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    const scale = 3 / zoom;
    setCenter({ x: center.x + x * scale, y: center.y + y * scale });
    setZoom(zoom * 2);
  };

  return (
    <div className="h-full bg-black flex flex-col items-center justify-center p-4">
      <canvas
        ref={canvasRef}
        width={280}
        height={180}
        onClick={handleCanvasClick}
        className="border border-zinc-600 rounded cursor-zoom-in"
      />
      <div className="mt-3 flex gap-3 items-center">
        <span className="text-cyan-400 text-xs font-mono">ZOOM: {zoom}x</span>
        <button
          onClick={() => { setZoom(1); setCenter({ x: -0.5, y: 0 }); }}
          className="px-3 py-1 text-xs font-mono bg-cyan-600 text-white rounded hover:bg-cyan-500"
        >
          RESET
        </button>
        <div className="flex items-center gap-1">
          <span className="text-zinc-400 text-xs">Iter:</span>
          <input
            type="range"
            min="20"
            max="150"
            value={maxIter}
            onChange={(e) => setMaxIter(Number(e.target.value))}
            className="w-16 accent-cyan-500"
          />
        </div>
      </div>
      <p className="text-zinc-500 text-xs mt-1">Click to zoom in</p>
    </div>
  );
};

// --- MOBIUS STRIP (3D) ---
export const MobiusStrip3D = () => {
  const [rotation, setRotation] = useState(0);
  const [isRotating, setIsRotating] = useState(true);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    if (isRotating) {
      const animate = () => {
        setRotation((r) => (r + 1) % 360);
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(animationRef.current);
  }, [isRotating]);

  const segments = 24;
  const stripElements = [];

  for (let i = 0; i < segments; i++) {
    const angle = (i / segments) * 360;
    const twist = (i / segments) * 180;
    const hue = (angle + rotation) % 360;

    stripElements.push(
      <div
        key={i}
        className="absolute w-8 h-3 rounded-sm transition-colors duration-200"
        style={{
          backgroundColor: `hsl(${hue}, 70%, 50%)`,
          transform: `
            rotateY(${angle + rotation}deg)
            translateZ(60px)
            rotateX(${twist}deg)
          `,
          transformOrigin: 'center center',
          boxShadow: '0 0 10px rgba(255,255,255,0.2)',
        }}
      />
    );
  }

  return (
    <div className="h-full bg-zinc-950 flex flex-col items-center justify-center p-4">
      <div
        className="relative w-48 h-48 preserve-3d"
        style={{
          perspective: '800px',
          transformStyle: 'preserve-3d',
        }}
      >
        <div
          className="w-full h-full flex items-center justify-center preserve-3d"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {stripElements}
        </div>
      </div>
      <div className="mt-4 flex gap-4 items-center">
        <span className="text-purple-400 font-mono text-sm flex items-center gap-1">
          <InfinityIcon size={16} /> One-Sided Surface
        </span>
        <button
          onClick={() => setIsRotating(!isRotating)}
          className={`px-3 py-1 text-xs font-mono rounded ${isRotating ? 'bg-purple-500 text-white' : 'bg-zinc-700 text-purple-400'}`}
        >
          {isRotating ? 'ROTATING' : 'PAUSED'}
        </button>
      </div>
    </div>
  );
};

// --- HYPERBOLIC PLANE ---
export const HyperbolicPlane = () => {
  const [depth, setDepth] = useState(4);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animRotation, setAnimRotation] = useState(0);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    if (isAnimating) {
      const animate = () => {
        setAnimRotation((r) => (r + 0.5) % 360);
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(animationRef.current);
  }, [isAnimating]);

  const generateHyperbolicTiles = () => {
    const tiles = [];
    const centerX = 120;
    const centerY = 100;
    const maxRadius = 90;

    for (let ring = 0; ring < depth; ring++) {
      const count = ring === 0 ? 1 : ring * 6;
      const radius = (ring / depth) * maxRadius;
      const size = maxRadius / (ring + 1) * 0.5;

      for (let i = 0; i < count; i++) {
        const angle = (i / count) * 360 + animRotation;
        const x = centerX + radius * Math.cos((angle * Math.PI) / 180);
        const y = centerY + radius * Math.sin((angle * Math.PI) / 180);
        const hue = (ring * 60 + i * 30) % 360;

        tiles.push(
          <div
            key={`${ring}-${i}`}
            className="absolute transition-all duration-300"
            style={{
              width: size,
              height: size,
              left: x - size / 2,
              top: y - size / 2,
              backgroundColor: `hsla(${hue}, 70%, 50%, ${1 - ring / depth * 0.5})`,
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.3)',
            }}
          />
        );
      }
    }
    return tiles;
  };

  return (
    <div className="h-full bg-zinc-900 flex flex-col items-center justify-center p-4">
      <div className="relative w-60 h-52 rounded-full border-2 border-zinc-600 overflow-hidden bg-zinc-950">
        {generateHyperbolicTiles()}
        <div className="absolute inset-0 rounded-full border-4 border-zinc-700 pointer-events-none" />
      </div>
      <p className="text-zinc-400 text-xs mt-3 font-mono">Poincare Disk Model</p>
      <div className="mt-2 flex gap-4">
        <div className="flex items-center gap-2">
          <span className="text-zinc-400 text-xs">Depth:</span>
          <input
            type="range"
            min="2"
            max="7"
            value={depth}
            onChange={(e) => setDepth(Number(e.target.value))}
            className="w-16 accent-indigo-500"
          />
        </div>
        <button
          onClick={() => setIsAnimating(!isAnimating)}
          className={`px-3 py-1 text-xs font-mono rounded ${isAnimating ? 'bg-indigo-500 text-white' : 'bg-zinc-700 text-indigo-400'}`}
        >
          {isAnimating ? 'STOP' : 'SPIN'}
        </button>
      </div>
    </div>
  );
};

// --- GEOMETRIC MORPH ---
export const GeometricMorph = () => {
  const [morphProgress, setMorphProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const animationRef = useRef<number>(0);

  const shapes = [
    { name: 'Circle', path: '50% 0%, 85% 15%, 100% 50%, 85% 85%, 50% 100%, 15% 85%, 0% 50%, 15% 15%' },
    { name: 'Square', path: '0% 0%, 100% 0%, 100% 100%, 0% 100%' },
    { name: 'Triangle', path: '50% 0%, 100% 100%, 0% 100%' },
    { name: 'Star', path: '50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%' },
    { name: 'Pentagon', path: '50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%' },
    { name: 'Hexagon', path: '50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%' },
  ];

  useEffect(() => {
    if (isAnimating) {
      const animate = () => {
        setMorphProgress((p) => (p + 0.5) % (shapes.length * 100));
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(animationRef.current);
  }, [isAnimating, shapes.length]);

  const currentShapeIndex = Math.floor(morphProgress / 100) % shapes.length;
  const currentShape = shapes[currentShapeIndex];
  const hue = (morphProgress * 2) % 360;

  return (
    <div className="h-full bg-zinc-950 flex flex-col items-center justify-center p-4">
      <div
        className="w-32 h-32 transition-all duration-500 flex items-center justify-center"
        style={{
          clipPath: `polygon(${currentShape.path})`,
          backgroundColor: `hsl(${hue}, 70%, 50%)`,
          boxShadow: `0 0 40px hsla(${hue}, 70%, 50%, 0.5)`,
        }}
      >
        <span className="text-white font-bold text-xs opacity-80">{currentShape.name}</span>
      </div>

      <div className="mt-6 flex gap-2 flex-wrap justify-center">
        {shapes.map((s, i) => (
          <button
            key={i}
            onClick={() => setMorphProgress(i * 100)}
            className={`px-2 py-1 text-xs font-mono rounded transition-all ${
              currentShapeIndex === i ? 'bg-white text-black' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      <div className="mt-4 flex gap-4 items-center">
        <button
          onClick={() => setIsAnimating(!isAnimating)}
          className={`px-4 py-1 text-xs font-mono rounded ${isAnimating ? 'bg-pink-500 text-white' : 'bg-zinc-700 text-pink-400'}`}
        >
          {isAnimating ? 'MORPHING' : 'PAUSED'}
        </button>
        <div className="w-32 h-1 bg-zinc-800 rounded overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-100"
            style={{ width: `${(morphProgress % 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export const geometryComponents = {
  'escher-staircase': EscherStaircase,
  'vector-field-link': VectorFieldLink,
  'tetris-layout': TetrisLayout,
  'fractal-zoom': FractalZoom,
  'voronoi-filter': VoronoiFilter,
  'mobius-strip': MobiusStrip,
  'hexagon-grid': HexagonGrid,
  // TextureDemos components
  'topography-link': TopographyLink,
  // ArchitecturalDemos components
  'louvered-feed': LouveredFeed,
  'blueprint-ui': BlueprintUI,
  'prism-view': PrismView,
  // New Geometry Components
  'fractal-tree': FractalTree,
  'tesselation-grid': TesselationGrid,
  'golden-spiral': GoldenSpiral,
  'platonic-solids': PlatonicSolids,
  'voronoi-diagram': VoronoiDiagram,
  'penrose-tiling': PenroseTiling,
  'mandelbrot-zoom': MandelbrotZoom,
  'mobius-strip-3d': MobiusStrip3D,
  'hyperbolic-plane': HyperbolicPlane,
  'geometric-morph': GeometricMorph,
};
