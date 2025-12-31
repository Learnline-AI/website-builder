import React, { useState, useRef, useEffect, useCallback } from 'react';
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
    <div className={`h-full transition-all duration-300 p-6 ${uvActive ? 'bg-zinc-950' : 'bg-white'}`}>
      <button
        onClick={() => setUvActive(!uvActive)}
        className={`p-3 rounded-full transition-all ${uvActive ? 'bg-purple-600 shadow-[0_0_12px_rgba(128,0,128,0.4)] scale-110' : 'bg-gray-200'}`}
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
        <h1 className={`text-2xl font-mono ${credits > 0 ? 'text-red-600 pulse-subtle' : 'text-zinc-800'}`}>
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

// --- DNA HELIX ---
export const DNAHelix = () => {
  const [rotation, setRotation] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (!isAnimating) return;
    const interval = setInterval(() => {
      setRotation(r => (r + 2) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, [isAnimating]);

  const basePairs = 12;
  const colors = ['#00ff88', '#ff0088', '#0088ff', '#ffff00'];

  return (
    <div className="h-full bg-slate-900 flex flex-col items-center justify-center p-4 overflow-hidden">
      <div className="relative w-32 h-64 perspective-1000">
        {[...Array(basePairs)].map((_, i) => {
          const angle = (rotation + i * 30) * (Math.PI / 180);
          const xOffset = Math.sin(angle) * 40;
          const zIndex = Math.cos(angle) > 0 ? 10 : 1;
          const opacity = (Math.cos(angle) + 1) / 2 * 0.7 + 0.3;

          return (
            <div
              key={i}
              className="absolute left-1/2 flex items-center justify-center"
              style={{
                top: `${(i / basePairs) * 100}%`,
                transform: `translateX(${xOffset - 16}px)`,
                zIndex,
                opacity,
              }}
            >
              <div
                className="w-4 h-4 rounded-full shadow-lg"
                style={{
                  backgroundColor: colors[i % 4],
                  boxShadow: `0 0 10px ${colors[i % 4]}`,
                }}
              />
              <div
                className="w-16 h-1 mx-1"
                style={{
                  background: `linear-gradient(90deg, ${colors[i % 4]}, ${colors[(i + 1) % 4]})`,
                  opacity: 0.6,
                }}
              />
              <div
                className="w-4 h-4 rounded-full shadow-lg"
                style={{
                  backgroundColor: colors[(i + 2) % 4],
                  boxShadow: `0 0 10px ${colors[(i + 2) % 4]}`,
                }}
              />
            </div>
          );
        })}
      </div>
      <button
        onClick={() => setIsAnimating(!isAnimating)}
        className={`mt-4 px-4 py-2 font-mono text-xs rounded transition-all ${
          isAnimating
            ? 'bg-green-500 text-black shadow-[0_0_10px_rgba(0,255,136,0.4)]'
            : 'bg-slate-700 text-slate-300'
        }`}
      >
        {isAnimating ? 'REPLICATING...' : 'START HELIX'}
      </button>
      <p className="text-green-400 font-mono text-[10px] mt-2">DOUBLE HELIX VISUALIZER</p>
    </div>
  );
};

// --- CHEMICAL REACTION ---
export const ChemicalReaction = () => {
  const [isReacting, setIsReacting] = useState(false);
  const [bubbles, setBubbles] = useState<Array<{ id: number; x: number; y: number; size: number; speed: number }>>([]);
  const [color, setColor] = useState('#00ff00');

  useEffect(() => {
    if (!isReacting) {
      setBubbles([]);
      return;
    }
    const interval = setInterval(() => {
      setBubbles(prev => {
        const newBubbles = prev
          .map(b => ({ ...b, y: (b.y || 100) - b.speed }))
          .filter(b => (b.y || 100) > -10);
        if (Math.random() > 0.3) {
          newBubbles.push({
            id: Date.now() + Math.random(),
            x: 20 + Math.random() * 60,
            size: 4 + Math.random() * 8,
            speed: 1 + Math.random() * 2,
            y: 100,
          } as typeof newBubbles[0] & { y: number });
        }
        return newBubbles;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [isReacting]);

  const mixColors = () => {
    const colors = ['#00ff00', '#ff00ff', '#00ffff', '#ff6600', '#ff0000'];
    setColor(colors[Math.floor(Math.random() * colors.length)]);
    setIsReacting(true);
    setTimeout(() => setIsReacting(false), 5000);
  };

  return (
    <div className="h-full bg-slate-900 flex flex-col items-center justify-center p-4">
      <div className="flex gap-4 items-end">
        {/* Beaker 1 */}
        <div className="relative w-16 h-24 border-b-4 border-x-4 border-blue-300 rounded-b-lg bg-blue-500/30 overflow-hidden">
          <div className="absolute bottom-0 w-full h-1/2 bg-blue-400/60" />
          <p className="absolute -top-5 left-1/2 -translate-x-1/2 text-blue-300 font-mono text-[8px]">NaOH</p>
        </div>
        <span className="text-white text-2xl mb-8">+</span>
        {/* Beaker 2 */}
        <div className="relative w-16 h-24 border-b-4 border-x-4 border-red-300 rounded-b-lg bg-red-500/30 overflow-hidden">
          <div className="absolute bottom-0 w-full h-1/2 bg-red-400/60" />
          <p className="absolute -top-5 left-1/2 -translate-x-1/2 text-red-300 font-mono text-[8px]">HCl</p>
        </div>
      </div>
      <div className="my-4 text-white text-2xl">=</div>
      {/* Result Flask */}
      <div className="relative w-24 h-32 border-b-8 border-x-4 border-slate-400 rounded-b-2xl overflow-hidden bg-slate-800/50">
        <div
          className="absolute bottom-0 w-full h-3/4 transition-colors duration-500"
          style={{ backgroundColor: `${color}80` }}
        >
          {bubbles.map((bubble) => (
            <div
              key={bubble.id}
              className="absolute rounded-full opacity-60"
              style={{
                left: `${bubble.x}%`,
                bottom: `${(bubble as typeof bubble & { y: number }).y}%`,
                width: bubble.size,
                height: bubble.size,
                backgroundColor: color,
                boxShadow: `0 0 ${bubble.size}px ${color}`,
              }}
            />
          ))}
        </div>
        {isReacting && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-4 bg-white/30 rounded-full animate-ping"
                style={{
                  left: `${(i - 2) * 10}px`,
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>
      <button
        onClick={mixColors}
        disabled={isReacting}
        className={`mt-4 px-4 py-2 font-mono text-xs rounded transition-all ${
          isReacting
            ? 'bg-orange-500 text-black pulse-subtle'
            : 'bg-green-600 text-white hover:bg-green-500'
        }`}
      >
        {isReacting ? 'REACTING...' : 'MIX CHEMICALS'}
      </button>
      <p className="text-slate-400 font-mono text-[10px] mt-2">EXOTHERMIC REACTION</p>
    </div>
  );
};

// --- TESLA COIL ---
export const TeslaCoil = () => {
  const [isActive, setIsActive] = useState(false);
  const [arcs, setArcs] = useState<Array<{ id: number; angle: number; length: number }>>([]);

  useEffect(() => {
    if (!isActive) {
      setArcs([]);
      return;
    }
    const interval = setInterval(() => {
      setArcs([...Array(5)].map((_, i) => ({
        id: i,
        angle: -60 + Math.random() * 120,
        length: 40 + Math.random() * 40,
      })));
    }, 100);
    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className="h-full bg-slate-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow */}
      {isActive && (
        <div className="absolute inset-0 bg-purple-500/10 pulse-subtle" />
      )}

      {/* Tesla Coil Structure */}
      <div className="relative">
        {/* Toroid */}
        <div
          className={`relative w-20 h-8 rounded-full border-4 transition-all duration-200 ${
            isActive
              ? 'border-cyan-400 bg-cyan-500/30 shadow-[0_0_12px_rgba(0,255,255,0.4)]'
              : 'border-slate-600 bg-slate-800'
          }`}
        >
          {/* Electric Arcs */}
          {arcs.map((arc) => (
            <div
              key={arc.id}
              className="absolute left-1/2 top-1/2 origin-bottom"
              style={{
                transform: `rotate(${arc.angle}deg)`,
                width: 2,
                height: arc.length,
                background: 'linear-gradient(to top, cyan, transparent)',
                boxShadow: '0 0 10px cyan, 0 0 20px cyan',
                filter: 'blur(1px)',
              }}
            />
          ))}
        </div>
        {/* Coil Body */}
        <div className="w-8 h-24 mx-auto bg-gradient-to-b from-amber-700 to-amber-900 rounded-sm relative overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={`w-full h-1 ${
                isActive ? 'bg-amber-400' : 'bg-amber-600'
              } opacity-50`}
              style={{ marginTop: i * 2 }}
            />
          ))}
        </div>
        {/* Base */}
        <div className="w-16 h-4 mx-auto bg-slate-700 rounded-t-sm" />
        <div className="w-20 h-3 mx-auto bg-slate-800 rounded-b-lg" />
      </div>

      {/* Control Panel */}
      <div className="mt-6 bg-slate-800 p-3 rounded-lg border border-slate-600">
        <div className="flex items-center gap-3">
          <div
            className={`w-3 h-3 rounded-full ${
              isActive ? 'bg-green-400 pulse-subtle shadow-[0_0_8px_rgba(74,222,128,0.4)]' : 'bg-red-500'
            }`}
          />
          <button
            onClick={() => setIsActive(!isActive)}
            className={`px-4 py-2 font-mono text-xs rounded transition-all ${
              isActive
                ? 'bg-red-600 text-white hover:bg-red-500'
                : 'bg-cyan-600 text-white hover:bg-cyan-500'
            }`}
          >
            {isActive ? 'DISCHARGE' : 'ACTIVATE'}
          </button>
        </div>
        <p className={`font-mono text-[10px] mt-2 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`}>
          {isActive ? '1.21 GIGAWATTS' : 'STANDBY MODE'}
        </p>
      </div>
    </div>
  );
};

// --- LAB TIMER ---
export const LabTimer = () => {
  const [seconds, setSeconds] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [initialTime, setInitialTime] = useState(60);

  useEffect(() => {
    if (!isRunning || seconds <= 0) {
      if (seconds <= 0) setIsRunning(false);
      return;
    }
    const interval = setInterval(() => {
      setSeconds(s => s - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, seconds]);

  const fillPercent = (seconds / initialTime) * 100;
  const isLow = seconds <= 10 && seconds > 0;
  const isDone = seconds <= 0;

  const reset = () => {
    setSeconds(initialTime);
    setIsRunning(false);
  };

  return (
    <div className="h-full bg-slate-900 flex flex-col items-center justify-center p-4">
      <div className="flex items-end gap-4">
        {/* Beaker Timer */}
        <div className="relative w-24 h-40 border-b-8 border-x-4 border-slate-400 rounded-b-xl overflow-hidden bg-slate-800/50">
          {/* Measurement Lines */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute left-0 w-3 h-0.5 bg-slate-500"
              style={{ bottom: `${(i + 1) * 20}%` }}
            />
          ))}
          {/* Liquid Fill */}
          <div
            className={`absolute bottom-0 w-full transition-all duration-1000 ${
              isDone
                ? 'bg-green-500'
                : isLow
                ? 'bg-red-500 pulse-subtle'
                : 'bg-cyan-500'
            }`}
            style={{ height: `${fillPercent}%` }}
          >
            {/* Bubbles */}
            {isRunning && !isDone && [...Array(4)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white/40 rounded-full animate-bounce"
                style={{
                  left: `${20 + i * 20}%`,
                  bottom: '10%',
                  animationDelay: `${i * 0.3}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Digital Display */}
        <div className="bg-black p-3 rounded border-2 border-slate-600">
          <div
            className={`font-mono text-3xl ${
              isDone
                ? 'text-green-400'
                : isLow
                ? 'text-red-500 pulse-subtle'
                : 'text-cyan-400'
            }`}
          >
            {Math.floor(seconds / 60)}:{(seconds % 60).toString().padStart(2, '0')}
          </div>
          <p className="text-slate-500 font-mono text-[8px] text-center mt-1">
            {isDone ? 'COMPLETE' : isRunning ? 'PROCESSING' : 'READY'}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-4 flex gap-2">
        <button
          onClick={() => setIsRunning(!isRunning)}
          disabled={isDone}
          className={`px-4 py-2 font-mono text-xs rounded transition-all ${
            isRunning
              ? 'bg-orange-500 text-black'
              : 'bg-green-600 text-white hover:bg-green-500'
          }`}
        >
          {isRunning ? 'PAUSE' : 'START'}
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 bg-slate-700 text-white font-mono text-xs rounded hover:bg-slate-600"
        >
          RESET
        </button>
      </div>
      <input
        type="range"
        min="10"
        max="120"
        value={initialTime}
        onChange={(e) => {
          const val = parseInt(e.target.value);
          setInitialTime(val);
          if (!isRunning) setSeconds(val);
        }}
        className="mt-3 w-40 accent-cyan-400"
        disabled={isRunning}
      />
      <p className="text-slate-500 font-mono text-[10px] mt-1">SET DURATION: {initialTime}s</p>
    </div>
  );
};

// --- MUTATION SLIDER ---
export const MutationSlider = () => {
  const [mutation, setMutation] = useState(50);
  const originalDNA = 'ATCGATCGATCG';

  const getMutatedDNA = useCallback(() => {
    const bases = ['A', 'T', 'C', 'G'];
    return originalDNA.split('').map((base) => {
      if (Math.random() * 100 < mutation) {
        return bases[Math.floor(Math.random() * 4)];
      }
      return base;
    }).join('');
  }, [mutation]);

  const [displayDNA, setDisplayDNA] = useState(originalDNA);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayDNA(getMutatedDNA());
    }, 200);
    return () => clearInterval(interval);
  }, [getMutatedDNA]);

  const getBaseColor = (base: string) => {
    switch (base) {
      case 'A': return 'text-green-400';
      case 'T': return 'text-red-400';
      case 'C': return 'text-blue-400';
      case 'G': return 'text-yellow-400';
      default: return 'text-white';
    }
  };

  return (
    <div className="h-full bg-slate-900 flex flex-col items-center justify-center p-4">
      {/* DNA Strand Display */}
      <div className="bg-black/50 p-4 rounded-lg border border-slate-700 mb-4">
        <p className="text-slate-500 font-mono text-[10px] mb-2">ORIGINAL SEQUENCE</p>
        <div className="flex gap-1 mb-3">
          {originalDNA.split('').map((base, i) => (
            <span key={i} className={`font-mono text-lg ${getBaseColor(base)}`}>
              {base}
            </span>
          ))}
        </div>
        <p className="text-slate-500 font-mono text-[10px] mb-2">MUTATED SEQUENCE</p>
        <div className="flex gap-1">
          {displayDNA.split('').map((base, i) => (
            <span
              key={i}
              className={`font-mono text-lg transition-all ${getBaseColor(base)} ${
                base !== originalDNA[i] ? 'pulse-subtle scale-110' : ''
              }`}
            >
              {base}
            </span>
          ))}
        </div>
      </div>

      {/* Mutation Slider */}
      <div className="w-full max-w-xs">
        <div className="flex justify-between mb-2">
          <span className="text-green-400 font-mono text-xs">STABLE</span>
          <span className="text-red-400 font-mono text-xs">UNSTABLE</span>
        </div>
        <div className="relative">
          <input
            type="range"
            min="0"
            max="100"
            value={mutation}
            onChange={(e) => setMutation(parseInt(e.target.value))}
            className="w-full h-3 appearance-none bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-lg cursor-pointer"
          />
        </div>
        <div className="text-center mt-3">
          <span className={`font-mono text-2xl ${
            mutation < 30 ? 'text-green-400' : mutation < 70 ? 'text-yellow-400' : 'text-red-400'
          }`}>
            {mutation}%
          </span>
          <p className="text-slate-500 font-mono text-[10px]">MUTATION RATE</p>
        </div>
      </div>

      {/* Warning */}
      {mutation > 70 && (
        <div className="mt-4 px-3 py-1 bg-red-500/20 border border-red-500 rounded pulse-subtle">
          <p className="text-red-400 font-mono text-xs">WARNING: HIGH MUTATION RISK</p>
        </div>
      )}
    </div>
  );
};

// --- BRAIN WAVES ---
export const BrainWaves = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [waveType, setWaveType] = useState<'alpha' | 'beta' | 'theta' | 'delta'>('alpha');
  const [isRecording, setIsRecording] = useState(true);

  const waveConfigs = {
    alpha: { frequency: 10, amplitude: 30, color: '#00ff88', label: 'ALPHA (8-13 Hz)' },
    beta: { frequency: 20, amplitude: 20, color: '#ff8800', label: 'BETA (14-30 Hz)' },
    theta: { frequency: 5, amplitude: 40, color: '#8800ff', label: 'THETA (4-7 Hz)' },
    delta: { frequency: 2, amplitude: 50, color: '#0088ff', label: 'DELTA (1-3 Hz)' },
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let offset = 0;

    const draw = () => {
      if (!isRecording) return;

      ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const config = waveConfigs[waveType];
      ctx.strokeStyle = config.color;
      ctx.lineWidth = 2;
      ctx.shadowColor = config.color;
      ctx.shadowBlur = 10;

      ctx.beginPath();
      for (let x = 0; x < canvas.width; x++) {
        const noise = Math.random() * 5 - 2.5;
        const y =
          canvas.height / 2 +
          Math.sin((x + offset) * config.frequency * 0.01) * config.amplitude +
          noise;
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      offset += 3;
      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationId);
  }, [waveType, isRecording]);

  return (
    <div className="h-full bg-slate-900 flex flex-col items-center justify-center p-4">
      {/* EEG Display */}
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={280}
          height={120}
          className="bg-slate-950 border-2 border-slate-700 rounded"
        />
        <div className="absolute top-2 left-2 flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-slate-600'}`} />
          <span className="text-slate-400 font-mono text-[10px]">
            {isRecording ? 'RECORDING' : 'PAUSED'}
          </span>
        </div>
        <div
          className="absolute top-2 right-2 font-mono text-[10px]"
          style={{ color: waveConfigs[waveType].color }}
        >
          {waveConfigs[waveType].label}
        </div>
      </div>

      {/* Wave Type Selector */}
      <div className="mt-4 flex gap-2">
        {(Object.keys(waveConfigs) as Array<keyof typeof waveConfigs>).map((type) => (
          <button
            key={type}
            onClick={() => setWaveType(type)}
            className={`px-3 py-1 font-mono text-[10px] rounded transition-all ${
              waveType === type
                ? 'text-black'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
            style={{
              backgroundColor: waveType === type ? waveConfigs[type].color : undefined,
            }}
          >
            {type.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Controls */}
      <button
        onClick={() => setIsRecording(!isRecording)}
        className={`mt-4 px-4 py-2 font-mono text-xs rounded transition-all ${
          isRecording
            ? 'bg-red-600 text-white'
            : 'bg-green-600 text-white'
        }`}
      >
        {isRecording ? 'STOP EEG' : 'START EEG'}
      </button>
    </div>
  );
};

// --- ATOM MODEL ---
export const AtomModel = () => {
  const [isSpinning, setIsSpinning] = useState(true);
  const [electronCount, setElectronCount] = useState(3);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (!isSpinning) return;
    const interval = setInterval(() => {
      setRotation(r => (r + 3) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, [isSpinning]);

  const orbits = [
    { radius: 35, electrons: Math.min(2, electronCount), speed: 1, color: '#ff6b6b' },
    { radius: 55, electrons: Math.min(8, Math.max(0, electronCount - 2)), speed: 0.7, color: '#4ecdc4' },
    { radius: 75, electrons: Math.max(0, electronCount - 10), speed: 0.5, color: '#ffe66d' },
  ];

  return (
    <div className="h-full bg-slate-900 flex flex-col items-center justify-center p-4">
      {/* Atom */}
      <div className="relative w-48 h-48">
        {/* Nucleus */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-orange-600 shadow-[0_0_20px_#ff6b6b] flex items-center justify-center">
          <span className="text-white font-mono text-[8px] font-bold">{electronCount}+</span>
        </div>

        {/* Orbits and Electrons */}
        {orbits.map((orbit, orbitIndex) => (
          <div key={orbitIndex}>
            {/* Orbit Path */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-600/50"
              style={{
                width: orbit.radius * 2,
                height: orbit.radius * 2,
              }}
            />
            {/* Electrons */}
            {[...Array(orbit.electrons)].map((_, electronIndex) => {
              const angle = (rotation * orbit.speed + electronIndex * (360 / orbit.electrons)) * (Math.PI / 180);
              const x = Math.cos(angle) * orbit.radius;
              const y = Math.sin(angle) * orbit.radius;
              return (
                <div
                  key={electronIndex}
                  className="absolute w-3 h-3 rounded-full"
                  style={{
                    left: `calc(50% + ${x}px - 6px)`,
                    top: `calc(50% + ${y}px - 6px)`,
                    backgroundColor: orbit.color,
                    boxShadow: `0 0 10px ${orbit.color}`,
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="mt-4 bg-slate-800 p-3 rounded-lg border border-slate-700">
        <div className="flex items-center gap-4 mb-2">
          <span className="text-slate-400 font-mono text-xs">ELECTRONS:</span>
          <input
            type="range"
            min="1"
            max="18"
            value={electronCount}
            onChange={(e) => setElectronCount(parseInt(e.target.value))}
            className="w-24 accent-cyan-400"
          />
          <span className="text-cyan-400 font-mono text-lg w-6">{electronCount}</span>
        </div>
        <button
          onClick={() => setIsSpinning(!isSpinning)}
          className={`w-full px-4 py-2 font-mono text-xs rounded transition-all ${
            isSpinning
              ? 'bg-orange-500 text-black'
              : 'bg-cyan-600 text-white'
          }`}
        >
          {isSpinning ? 'FREEZE ORBIT' : 'ACTIVATE ORBIT'}
        </button>
      </div>
      <p className="text-slate-500 font-mono text-[10px] mt-2">BOHR MODEL SIMULATOR</p>
    </div>
  );
};

// --- PETRI DISH ---
export const PetriDish = () => {
  const [cells, setCells] = useState<Array<{ id: number; x: number; y: number; size: number; color: string }>>([
    { id: 1, x: 50, y: 50, size: 10, color: '#4ade80' },
  ]);
  const [isGrowing, setIsGrowing] = useState(true);
  const maxCells = 30;

  useEffect(() => {
    if (!isGrowing || cells.length >= maxCells) return;

    const interval = setInterval(() => {
      setCells(prev => {
        if (prev.length >= maxCells) return prev;

        // Grow existing cells
        const grown = prev.map(cell => ({
          ...cell,
          size: Math.min(cell.size + 0.5, 20),
        }));

        // Sometimes divide cells
        if (Math.random() > 0.7 && prev.length < maxCells) {
          const parent = prev[Math.floor(Math.random() * prev.length)];
          const angle = Math.random() * Math.PI * 2;
          const distance = 10 + Math.random() * 10;
          const colors = ['#4ade80', '#22d3ee', '#a78bfa', '#fb923c'];
          grown.push({
            id: Date.now(),
            x: Math.max(10, Math.min(90, parent.x + Math.cos(angle) * distance)),
            y: Math.max(10, Math.min(90, parent.y + Math.sin(angle) * distance)),
            size: 5,
            color: colors[Math.floor(Math.random() * colors.length)],
          });
        }

        return grown;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [isGrowing, cells.length]);

  const resetDish = () => {
    setCells([{ id: 1, x: 50, y: 50, size: 10, color: '#4ade80' }]);
  };

  return (
    <div className="h-full bg-slate-900 flex flex-col items-center justify-center p-4">
      {/* Petri Dish */}
      <div className="relative w-48 h-48 rounded-full border-4 border-slate-400 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden shadow-[inset_0_0_30px_rgba(0,0,0,0.5)]">
        {/* Agar Medium */}
        <div className="absolute inset-2 rounded-full bg-amber-900/20" />

        {/* Cells */}
        {cells.map(cell => (
          <div
            key={cell.id}
            className="absolute rounded-full transition-all duration-300"
            style={{
              left: `${cell.x}%`,
              top: `${cell.y}%`,
              width: cell.size,
              height: cell.size,
              backgroundColor: cell.color,
              boxShadow: `0 0 ${cell.size / 2}px ${cell.color}`,
              transform: 'translate(-50%, -50%)',
              opacity: 0.8,
            }}
          />
        ))}

        {/* Glass Reflection */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-full pointer-events-none" />
      </div>

      {/* Stats */}
      <div className="mt-4 bg-slate-800 px-4 py-2 rounded border border-slate-700">
        <div className="flex items-center gap-4">
          <div className="text-center">
            <p className="text-green-400 font-mono text-2xl">{cells.length}</p>
            <p className="text-slate-500 font-mono text-[8px]">COLONY COUNT</p>
          </div>
          <div className="text-center">
            <p className="text-cyan-400 font-mono text-2xl">{maxCells}</p>
            <p className="text-slate-500 font-mono text-[8px]">MAX CAPACITY</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-3 flex gap-2">
        <button
          onClick={() => setIsGrowing(!isGrowing)}
          className={`px-4 py-2 font-mono text-xs rounded transition-all ${
            isGrowing
              ? 'bg-orange-500 text-black'
              : 'bg-green-600 text-white'
          }`}
        >
          {isGrowing ? 'INHIBIT' : 'CULTIVATE'}
        </button>
        <button
          onClick={resetDish}
          className="px-4 py-2 bg-slate-700 text-white font-mono text-xs rounded hover:bg-slate-600"
        >
          STERILIZE
        </button>
      </div>
    </div>
  );
};

// --- VOLTMETER GAUGE ---
export const VoltmeterGauge = () => {
  const [voltage, setVoltage] = useState(0);
  const [isFluctuating, setIsFluctuating] = useState(false);

  useEffect(() => {
    if (!isFluctuating) return;
    const interval = setInterval(() => {
      setVoltage(v => {
        const delta = (Math.random() - 0.5) * 20;
        return Math.max(0, Math.min(100, v + delta));
      });
    }, 100);
    return () => clearInterval(interval);
  }, [isFluctuating]);

  const needleAngle = -90 + (voltage / 100) * 180;
  const getVoltageColor = () => {
    if (voltage < 30) return '#4ade80';
    if (voltage < 70) return '#facc15';
    return '#ef4444';
  };

  return (
    <div className="h-full bg-slate-900 flex flex-col items-center justify-center p-4">
      {/* Voltmeter */}
      <div className="relative w-48 h-32 bg-gradient-to-b from-amber-100 to-amber-200 rounded-t-full border-4 border-amber-900 overflow-hidden shadow-xl">
        {/* Scale Markings */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 60">
          {/* Scale Arc */}
          <path
            d="M 10 55 A 40 40 0 0 1 90 55"
            fill="none"
            stroke="#78350f"
            strokeWidth="2"
          />
          {/* Tick Marks */}
          {[...Array(11)].map((_, i) => {
            const angle = -180 + i * 18;
            const rad = (angle * Math.PI) / 180;
            const x1 = 50 + Math.cos(rad) * 35;
            const y1 = 55 + Math.sin(rad) * 35;
            const x2 = 50 + Math.cos(rad) * 40;
            const y2 = 55 + Math.sin(rad) * 40;
            return (
              <g key={i}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#78350f" strokeWidth="1" />
                <text
                  x={50 + Math.cos(rad) * 28}
                  y={55 + Math.sin(rad) * 28}
                  fontSize="4"
                  fill="#78350f"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {i * 10}
                </text>
              </g>
            );
          })}
          {/* Danger Zone */}
          <path
            d="M 70 55 A 40 40 0 0 1 90 55"
            fill="none"
            stroke="#ef4444"
            strokeWidth="3"
            opacity="0.5"
          />
        </svg>

        {/* Needle */}
        <div
          className="absolute bottom-0 left-1/2 origin-bottom transition-transform duration-100"
          style={{
            transform: `translateX(-50%) rotate(${needleAngle}deg)`,
          }}
        >
          <div
            className="w-1 h-24 rounded-t-full"
            style={{
              background: `linear-gradient(to top, #1e293b, ${getVoltageColor()})`,
              boxShadow: `0 0 5px ${getVoltageColor()}`,
            }}
          />
        </div>

        {/* Center Pivot */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-amber-900 border-2 border-amber-700" />

        {/* Label */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-amber-900 font-mono text-[8px] font-bold">
          VOLTS DC
        </div>
      </div>

      {/* Digital Display */}
      <div className="mt-4 bg-black px-4 py-2 rounded border-2 border-slate-600">
        <span
          className="font-mono text-2xl"
          style={{ color: getVoltageColor() }}
        >
          {voltage.toFixed(1)}V
        </span>
      </div>

      {/* Controls */}
      <div className="mt-4 flex flex-col items-center gap-3">
        <input
          type="range"
          min="0"
          max="100"
          value={voltage}
          onChange={(e) => {
            setVoltage(parseInt(e.target.value));
            setIsFluctuating(false);
          }}
          className="w-40 accent-amber-500"
        />
        <button
          onClick={() => setIsFluctuating(!isFluctuating)}
          className={`px-4 py-2 font-mono text-xs rounded transition-all ${
            isFluctuating
              ? 'bg-red-500 text-white pulse-subtle'
              : 'bg-amber-600 text-white hover:bg-amber-500'
          }`}
        >
          {isFluctuating ? 'STABILIZE' : 'FLUCTUATE'}
        </button>
      </div>
    </div>
  );
};

// --- EXPERIMENT LOG ---
export const ExperimentLog = () => {
  const [logs, setLogs] = useState<Array<{ id: number; time: string; type: string; message: string }>>([
    { id: 1, time: '00:00:00', type: 'INFO', message: 'Experiment initialized' },
    { id: 2, time: '00:00:05', type: 'DATA', message: 'Baseline readings captured' },
  ]);
  const [isRunning, setIsRunning] = useState(false);
  const logContainerRef = useRef<HTMLDivElement>(null);

  const logTemplates = [
    { type: 'INFO', messages: ['Calibrating sensors...', 'System check complete', 'Parameters updated'] },
    { type: 'DATA', messages: ['Temperature: 23.4°C', 'Pressure: 1013 hPa', 'pH Level: 7.2'] },
    { type: 'WARN', messages: ['Threshold approaching', 'Anomaly detected', 'Recalibration needed'] },
    { type: 'SUCCESS', messages: ['Reaction complete', 'Sample extracted', 'Data recorded'] },
    { type: 'ERROR', messages: ['Sensor malfunction', 'Connection lost', 'Buffer overflow'] },
  ];

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      const template = logTemplates[Math.floor(Math.random() * logTemplates.length)];
      const message = template.messages[Math.floor(Math.random() * template.messages.length)];
      const now = new Date();
      const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

      setLogs(prev => [...prev.slice(-20), { id: Date.now(), time, type: template.type, message }]);
    }, 1500);
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'INFO': return 'text-cyan-400';
      case 'DATA': return 'text-green-400';
      case 'WARN': return 'text-yellow-400';
      case 'SUCCESS': return 'text-emerald-400';
      case 'ERROR': return 'text-red-400';
      default: return 'text-slate-400';
    }
  };

  const clearLogs = () => {
    setLogs([{ id: Date.now(), time: '00:00:00', type: 'INFO', message: 'Log cleared - Ready for new experiment' }]);
  };

  return (
    <div className="h-full bg-slate-900 flex flex-col items-center justify-center p-4">
      {/* Log Terminal */}
      <div className="w-full max-w-sm bg-black rounded-lg border border-slate-700 overflow-hidden">
        {/* Header */}
        <div className="bg-slate-800 px-3 py-2 flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-green-400 animate-pulse' : 'bg-slate-600'}`} />
            <span className="text-slate-300 font-mono text-xs">EXPERIMENT LOG</span>
          </div>
          <span className="text-slate-500 font-mono text-[10px]">{logs.length} entries</span>
        </div>

        {/* Log Content */}
        <div
          ref={logContainerRef}
          className="h-40 overflow-y-auto p-2 font-mono text-xs space-y-1 scrollbar-thin scrollbar-thumb-slate-700"
        >
          {logs.map(log => (
            <div key={log.id} className="flex gap-2">
              <span className="text-slate-600">[{log.time}]</span>
              <span className={`${getTypeColor(log.type)} w-16`}>[{log.type}]</span>
              <span className="text-slate-300">{log.message}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-4 flex gap-2">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`px-4 py-2 font-mono text-xs rounded transition-all ${
            isRunning
              ? 'bg-red-600 text-white'
              : 'bg-green-600 text-white hover:bg-green-500'
          }`}
        >
          {isRunning ? 'STOP LOGGING' : 'START EXPERIMENT'}
        </button>
        <button
          onClick={clearLogs}
          className="px-4 py-2 bg-slate-700 text-white font-mono text-xs rounded hover:bg-slate-600"
        >
          CLEAR LOG
        </button>
      </div>
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
  // New mad science components
  'dna-helix': DNAHelix,
  'chemical-reaction': ChemicalReaction,
  'tesla-coil': TeslaCoil,
  'lab-timer': LabTimer,
  'mutation-slider': MutationSlider,
  'brain-waves': BrainWaves,
  'atom-model': AtomModel,
  'petri-dish': PetriDish,
  'voltmeter-gauge': VoltmeterGauge,
  'experiment-log': ExperimentLog,
};
