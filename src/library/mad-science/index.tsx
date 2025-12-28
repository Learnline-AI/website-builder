import React, { useState, useRef, useEffect } from 'react';
import { Zap, Settings } from '../shared/icons';

// --- LIQUID FLASK CHART ---
export const LiquidFlask = () => {
  const [level, setLevel] = useState(65);

  return (
    <div className="flex flex-col items-center justify-center h-full bg-slate-900 p-4">
      <div className="relative w-32 h-48">
        <div className="absolute inset-0 border-b-8 border-x-4 border-slate-300 rounded-b-3xl overflow-hidden bg-slate-800/50">
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-green-300 rounded-full animate-bounce opacity-40"
                style={{
                  left: `${20 + i * 15}%`,
                  bottom: `${Math.random() * level}%`,
                  animationDelay: `${i * 0.5}s`
                }}
              />
            ))}
          </div>
          <div
            className="absolute bottom-0 w-full transition-all duration-1000 ease-in-out bg-green-500/80 shadow-[inset_0_10px_20px_rgba(255,255,255,0.3)]"
            style={{ height: `${level}%` }}
          >
            <svg className="absolute -top-4 w-[200%] h-8 fill-green-500/80 animate-wave" viewBox="0 0 100 20">
              <path d="M0 10 Q 25 20 50 10 T 100 10 T 150 10 T 200 10 V 20 H 0 Z" />
            </svg>
          </div>
        </div>
      </div>
      <input
        type="range" value={level} onChange={(e) => setLevel(parseInt(e.target.value))}
        className="w-32 mt-4 accent-green-400"
      />
      <p className="text-green-400 font-mono text-center mt-2 text-xs">LEVEL: {level}%</p>
      <style>{`@keyframes wave { from { transform: translateX(0); } to { transform: translateX(-50%); } } .animate-wave { animation: wave 3s linear infinite; }`}</style>
    </div>
  );
};

// --- DECODER RING ---
export const DecoderRing = () => {
  const [rotation, setRotation] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleRotate = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
    setRotation(angle);
    if (Math.abs(angle - 45) < 10) setIsUnlocked(true);
    else setIsUnlocked(false);
  };

  return (
    <div className="h-full bg-orange-50 flex flex-col items-center justify-center overflow-hidden p-4">
      <div
        className="relative w-48 h-48 rounded-full border-8 border-amber-900 bg-amber-100 flex items-center justify-center cursor-pointer select-none"
        onMouseMove={(e) => e.buttons === 1 && handleRotate(e)}
      >
        <div className="absolute inset-4 rounded-full border-2 border-dashed border-amber-800 opacity-20" />
        <div
          className="w-28 h-28 rounded-full bg-amber-800 flex items-center justify-center transition-transform duration-100 shadow-xl"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <div className="absolute top-2 w-3 h-3 bg-red-500 rounded-full" />
        </div>
      </div>
      <div className={`mt-4 p-2 border-2 border-black font-bold text-sm ${isUnlocked ? 'bg-green-400' : 'bg-red-400'}`}>
        {isUnlocked ? "UNLOCKED" : "ROTATE TO UNLOCK"}
      </div>
    </div>
  );
};

// --- GHOST MODE UV ---
export const GhostMode = () => {
  const [uvActive, setUvActive] = useState(false);

  return (
    <div className={`h-full transition-all duration-500 p-6 ${uvActive ? 'bg-black' : 'bg-white'}`}>
      <button
        onClick={() => setUvActive(!uvActive)}
        className={`p-3 rounded-full transition-all ${uvActive ? 'bg-purple-600 shadow-[0_0_30px_purple] scale-110' : 'bg-gray-200'}`}
      >
        <Zap className={uvActive ? 'text-white' : 'text-gray-600'} size={20} />
      </button>
      <div className="mt-6 text-center">
        <h2 className={`text-lg font-bold mb-4 ${uvActive ? 'text-white' : 'text-black'}`}>Question: What is π?</h2>
        <div className={`p-4 border-2 border-dashed ${uvActive ? 'border-purple-500' : 'border-gray-300'}`}>
          <p className="text-gray-400 text-sm">Hidden answer...</p>
          <div className={`mt-2 font-black text-2xl transition-opacity duration-300 ${uvActive ? 'opacity-100 text-green-400 drop-shadow-[0_0_10px_#4ade80]' : 'opacity-0'}`}>
            3.14159...
          </div>
        </div>
      </div>
    </div>
  );
};

// --- COIN OP CREDITS ---
export const CoinOp = () => {
  const [credits, setCredits] = useState(0);

  return (
    <div className="h-full bg-zinc-900 flex flex-col items-center justify-center p-4">
      <div className="mb-6 bg-black border-4 border-zinc-700 p-3 w-48 text-center">
        <h1 className={`text-2xl font-mono ${credits > 0 ? 'text-red-600 animate-pulse' : 'text-zinc-800'}`}>
          CREDIT {credits < 10 ? `0${credits}` : credits}
        </h1>
        <p className="text-zinc-500 text-[8px] mt-1 font-mono">INSERT TOKEN</p>
      </div>
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => setCredits(c => c + 1)}
        className="w-12 h-24 bg-zinc-800 border-x-4 border-black relative rounded-t-lg shadow-2xl"
      >
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-2 h-12 bg-black rounded-full" />
      </div>
      <div
        draggable
        className="mt-6 w-12 h-12 rounded-full bg-gradient-to-tr from-zinc-400 to-zinc-200 border-2 border-zinc-500 flex items-center justify-center cursor-grab shadow-lg text-xs font-bold"
      >
        25¢
      </div>
    </div>
  );
};

// --- SYNTH SETTINGS ---
export const SynthSettings = () => {
  const [values, setValues] = useState([80, 40, 60, 20]);
  const labels = ["VOL", "BRT", "SZ", "SPD"];

  return (
    <div className="h-full bg-zinc-800 p-4 flex items-center justify-center">
      <div className="bg-zinc-900 p-4 border-t-4 border-zinc-700 rounded-lg shadow-2xl flex gap-4">
        {values.map((v, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div className="flex flex-col gap-0.5 h-20 justify-end">
              {[...Array(8)].map((_, led) => (
                <div
                  key={led}
                  className={`w-2 h-1.5 rounded-sm transition-all duration-200 ${v > (7-led) * 12 ? 'bg-orange-500 shadow-[0_0_5px_orange]' : 'bg-zinc-800'}`}
                />
              ))}
            </div>
            <input
              type="range"
              className="w-6 h-24 accent-orange-500"
              style={{ writingMode: 'vertical-lr', direction: 'rtl' }}
              min="0" max="100" value={v}
              onChange={(e) => {
                const newVals = [...values];
                newVals[i] = parseInt(e.target.value);
                setValues(newVals);
              }}
            />
            <label className="text-zinc-500 font-mono text-[8px] font-bold">{labels[i]}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- GEARS MENU ---
export const GearsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-full bg-gray-900 flex flex-col items-center justify-center p-4">
      <button onClick={() => setIsOpen(!isOpen)} className="px-4 py-2 bg-gray-700 text-white font-bold rounded shadow-lg z-10">
        <Settings size={16} className="inline-block mr-2 animate-spin" style={{ animationDuration: '10s' }} />
        SETTINGS
      </button>
      <div className={`relative mt-4 w-32 h-32 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute top-1/4 left-1/4 w-10 h-10 bg-gray-500 rounded-full border-4 border-gray-600 animate-spin" />
        <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-gray-500 rounded-full border-4 border-gray-600 animate-spin" style={{ animationDirection: 'reverse' }} />
        {isOpen && (
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm p-4 rounded text-white text-xs font-mono flex items-center justify-center">
            ACCESS GRANTED
          </div>
        )}
      </div>
    </div>
  );
};

// --- GRAFFITI NOTES (SPRAY PAINT TOOL) ---
export const GraffitiNotes = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSpraying, setIsSpraying] = useState(false);
  const [color, setColor] = useState('#ff00ff');

  const spray = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isSpraying) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.fillStyle = color;
    for (let i = 0; i < 20; i++) {
      const offsetX = (Math.random() - 0.5) * 30;
      const offsetY = (Math.random() - 0.5) * 30;
      ctx.globalAlpha = Math.random() * 0.5;
      ctx.beginPath();
      ctx.arc(x + offsetX, y + offsetY, Math.random() * 2, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="h-full bg-gray-800 flex flex-col items-center justify-center p-4">
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={280}
          height={180}
          className="bg-gray-900 border-4 border-gray-600 rounded cursor-crosshair"
          onMouseDown={() => setIsSpraying(true)}
          onMouseUp={() => setIsSpraying(false)}
          onMouseLeave={() => setIsSpraying(false)}
          onMouseMove={spray}
        />
        <div className="absolute top-2 left-2 text-gray-500 font-mono text-[10px] pointer-events-none">
          SPRAY ZONE
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <div className="flex gap-1">
          {['#ff00ff', '#00ffff', '#ffff00', '#ff0000', '#00ff00'].map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={`w-6 h-6 rounded-full border-2 ${color === c ? 'border-white scale-110' : 'border-gray-600'}`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
        <button
          onClick={clearCanvas}
          className="px-3 py-1 bg-red-600 text-white font-mono text-xs rounded hover:bg-red-500"
        >
          CLEAR
        </button>
      </div>

      <p className="mt-2 text-gray-500 font-mono text-[10px]">
        CLICK & DRAG TO SPRAY
      </p>
    </div>
  );
};

export const madScienceComponents = {
  'liquid-flask': LiquidFlask,
  'decoder-ring': DecoderRing,
  'ghost-mode': GhostMode,
  'coin-op': CoinOp,
  'synth-settings': SynthSettings,
  'gears-menu': GearsMenu,
  // MadScienceDemos components
  'graffiti-notes': GraffitiNotes,
};
