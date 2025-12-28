import React, { useState, useEffect } from 'react';
import { useGameLoop } from '../shared/hooks';
import { Activity, Infinity, Settings, Box } from '../shared/icons';

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
    <div className="h-full bg-black flex items-center justify-center p-4 overflow-hidden">
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
        <Infinity size={16} className="mr-1" />
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
              <div className="absolute bottom-4 right-4 text-[10px] text-cyan-300 font-mono animate-pulse">MODEL_V.04</div>
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
};
