import React, { useState, useRef, useEffect } from 'react';
import { useGameLoop } from '../shared/hooks';
import { Play, Square, FastForward, AlertTriangle, CheckCircle } from '../shared/icons';

// --- TETRIS REVIEW ---
export const TetrisReview = () => {
  const [blocks, setBlocks] = useState([
    { id: 1, text: "★", x: 0, y: 0, w: 2, h: 2, color: "bg-red-500" },
    { id: 2, text: "★★", x: 2, y: 0, w: 2, h: 1, color: "bg-blue-500" },
    { id: 3, text: "★★★", x: 0, y: 2, w: 3, h: 1, color: "bg-green-500" },
  ]);
  const gridSize = 4;
  const cellSize = 40;

  return (
    <div className="h-full bg-zinc-900 flex flex-col items-center justify-center p-4">
      <div
        className="relative border-4 border-zinc-600 bg-zinc-800 shadow-2xl"
        style={{ width: gridSize * cellSize, height: gridSize * cellSize }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{ backgroundImage: `linear-gradient(to right, #666 1px, transparent 1px), linear-gradient(to bottom, #666 1px, transparent 1px)`, backgroundSize: `${cellSize}px ${cellSize}px` }}
        />
        {blocks.map(block => (
          <div
            key={block.id}
            className={`absolute font-black text-white flex items-center justify-center border-2 border-black/50 ${block.color}`}
            style={{
              width: block.w * cellSize,
              height: block.h * cellSize,
              left: block.x * cellSize,
              top: block.y * cellSize,
              fontSize: '14px'
            }}
          >
            {block.text}
          </div>
        ))}
      </div>
      <p className="mt-2 text-green-400 font-mono text-xs">REVIEW: 3/5 STARS</p>
    </div>
  );
};

// --- SPACE INVADERS PROGRESS ---
export const SpaceInvadersProgress = () => {
  const [progress, setProgress] = useState(60);
  const invaderCount = 10;

  return (
    <div className="h-full bg-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-xs">
        <div className="flex justify-between mb-2">
          {[...Array(invaderCount)].map((_, i) => {
            const destroyed = i < Math.floor(progress / 10);
            return (
              <div
                key={i}
                className={`text-lg transition-all duration-300 ${destroyed ? 'opacity-20 scale-75' : 'text-green-400 animate-pulse'}`}
              >
                👾
              </div>
            );
          })}
        </div>
        <div className="w-full h-2 bg-zinc-800 rounded overflow-hidden">
          <div
            className="h-full bg-green-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-green-400 font-mono text-center mt-2 text-xs">{progress}% COMPLETE</p>
      </div>
    </div>
  );
};

// --- SCRATCH CARD ---
export const ScratchCard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#4a5568';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = 'bold 12px monospace';
    ctx.fillStyle = '#718096';
    ctx.fillText('SCRATCH HERE', 40, 50);
  }, []);

  const scratch = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isScratching) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, Math.PI * 2);
    ctx.fill();
  };

  return (
    <div className="h-full bg-zinc-800 flex flex-col items-center justify-center p-4">
      <div className="relative w-48 h-24 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg overflow-hidden shadow-xl">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-black text-yellow-900">🏆 WIN!</span>
        </div>
        <canvas
          ref={canvasRef}
          width={192}
          height={96}
          className="absolute inset-0 cursor-pointer"
          onMouseDown={() => setIsScratching(true)}
          onMouseUp={() => setIsScratching(false)}
          onMouseLeave={() => setIsScratching(false)}
          onMouseMove={scratch}
        />
      </div>
      <p className="text-zinc-400 font-mono text-xs mt-2">SCRATCH TO REVEAL</p>
    </div>
  );
};

// --- DIAL UP LOADER ---
export const DialUpLoader = () => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);
  const phases = ['DIALING...', 'CONNECTING...', 'HANDSHAKING...', 'CONNECTED!'];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        const newP = p + Math.random() * 8;
        setPhase(Math.min(3, Math.floor(newP / 25)));
        return Math.min(100, newP);
      });
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full bg-blue-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-xs bg-blue-950 border-2 border-blue-700 p-4 rounded">
        <div className="flex items-center gap-2 mb-3">
          <div className={`w-3 h-3 rounded-full ${progress < 100 ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'}`} />
          <span className="text-blue-300 font-mono text-xs">{phases[phase]}</span>
        </div>
        <div className="w-full h-4 bg-blue-950 border border-blue-600 rounded overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-blue-400 font-mono text-xs text-center mt-2">{Math.floor(progress)}%</p>
      </div>
    </div>
  );
};

// --- PINBALL LAUNCHER ---
export const PinballLauncher = () => {
  const [pullBack, setPullBack] = useState(0);
  const [launched, setLaunched] = useState(false);
  const [ballPos, setBallPos] = useState(100);

  const handleMouseDown = () => {
    setPullBack(0);
    setLaunched(false);
    setBallPos(100);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1 && !launched) {
      setPullBack(Math.min(100, pullBack + 2));
    }
  };

  const handleMouseUp = () => {
    if (pullBack > 10) {
      setLaunched(true);
      setBallPos(100 - pullBack);
      setTimeout(() => {
        setBallPos(100);
        setPullBack(0);
        setLaunched(false);
      }, 1000);
    }
  };

  return (
    <div
      className="h-full bg-zinc-900 flex items-end justify-center p-4 cursor-pointer select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="relative w-16 h-48 bg-zinc-800 border-2 border-zinc-600 rounded-t-full overflow-hidden">
        <div
          className="absolute left-1/2 -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-zinc-300 to-zinc-500 rounded-full shadow-lg transition-all"
          style={{
            bottom: `${ballPos}%`,
            transitionDuration: launched ? '0.3s' : '0s'
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 bg-red-600 transition-all"
          style={{ height: `${pullBack * 0.4}%` }}
        />
      </div>
      <p className="absolute bottom-2 text-zinc-400 font-mono text-xs">HOLD & RELEASE</p>
    </div>
  );
};

// --- COMBO LOCK ---
export const ComboLock = () => {
  const [digits, setDigits] = useState([0, 0, 0]);
  const correctCombo = [4, 2, 7];
  const isUnlocked = digits.every((d, i) => d === correctCombo[i]);

  const rotateDigit = (index: number, direction: number) => {
    setDigits(prev => {
      const newDigits = [...prev];
      newDigits[index] = (newDigits[index] + direction + 10) % 10;
      return newDigits;
    });
  };

  return (
    <div className="h-full bg-zinc-800 flex flex-col items-center justify-center p-4">
      <div className={`p-4 rounded-xl border-4 ${isUnlocked ? 'border-green-500 bg-green-900/20' : 'border-zinc-600 bg-zinc-900'}`}>
        <div className="flex gap-2">
          {digits.map((digit, i) => (
            <div key={i} className="flex flex-col items-center">
              <button
                onClick={() => rotateDigit(i, 1)}
                className="text-zinc-400 hover:text-white text-lg"
              >▲</button>
              <div className="w-10 h-12 bg-black border-2 border-zinc-600 flex items-center justify-center text-2xl font-mono text-green-400">
                {digit}
              </div>
              <button
                onClick={() => rotateDigit(i, -1)}
                className="text-zinc-400 hover:text-white text-lg"
              >▼</button>
            </div>
          ))}
        </div>
      </div>
      <p className={`mt-2 font-mono text-xs ${isUnlocked ? 'text-green-400' : 'text-zinc-400'}`}>
        {isUnlocked ? '🔓 UNLOCKED!' : '🔒 TRY: 4-2-7'}
      </p>
    </div>
  );
};

// --- ACCORDION ACCORDION (BELLOWS SYLLABUS) ---
export const AccordionAccordion = () => {
  const [isOpen, setIsOpen] = useState(false);
  const items = ["Module 1: Thermodynamics", "Module 2: Electromagnetism", "Module 3: Optics"];

  return (
    <div className="h-full bg-amber-100 flex flex-col items-center justify-center p-4 overflow-hidden">
      <div className="w-full max-w-sm">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-4 bg-red-700 text-amber-100 font-black text-lg border-4 border-black shadow-[4px_4px_0_0_#000] hover:bg-red-600 transition-colors"
        >
          COURSE SYLLABUS {isOpen ? '▲' : '▼'}
        </button>

        <div
          className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] ${isOpen ? 'max-h-96' : 'max-h-0'}`}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="relative border-x-4 border-black bg-amber-50"
              style={{
                clipPath: `polygon(${isOpen ? 0 : 10}% 0, ${isOpen ? 100 : 90}% 0, 100% 50%, ${isOpen ? 100 : 90}% 100%, ${isOpen ? 0 : 10}% 100%, 0% 50%)`,
                marginTop: isOpen ? 0 : -20,
                transition: 'clip-path 0.5s, margin 0.5s',
              }}
            >
              <div className="p-4 flex items-center gap-3 text-red-900 font-mono text-sm">
                <div className="w-6 h-6 bg-red-700 text-white rounded-full flex items-center justify-center font-bold text-xs">
                  {index + 1}
                </div>
                {item}
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-300 via-amber-100 to-amber-300"></div>
            </div>
          ))}

          <div className="border-4 border-t-0 border-black bg-red-700 text-amber-100 text-center p-3 text-xs font-mono">
            END OF SYLLABUS
          </div>
        </div>
      </div>
    </div>
  );
};

// --- VCR TRACKING ---
export const VCRTracking = () => {
  const [tracking, setTracking] = useState(0);

  const distortionFilter = `blur(${Math.abs(tracking) * 0.1}px) hue-rotate(${tracking * 2}deg)`;
  const skewAmount = tracking * 0.2;
  const verticalShift = tracking * 0.5;

  return (
    <div className="h-full bg-black flex flex-col items-center justify-center p-4 overflow-hidden">
      <div className="relative w-full max-w-xs h-40 bg-gray-900 border-4 border-gray-700 rounded overflow-hidden">
        <div
          className="absolute inset-0 flex items-center justify-center transition-all duration-100"
          style={{
            filter: distortionFilter,
            transform: `skewX(${skewAmount}deg) translateY(${verticalShift}px)`,
          }}
        >
          <div className="text-center">
            <h2 className="text-blue-400 font-mono text-2xl font-bold">PLAY ▶</h2>
            <p className="text-gray-400 font-mono text-xs mt-1">00:15:42</p>
          </div>
        </div>

        {Math.abs(tracking) > 20 && (
          <>
            <div className="absolute top-1/4 left-0 right-0 h-1 bg-white/20 animate-[vcr_0.1s_linear_infinite]"></div>
            <div className="absolute top-2/3 left-0 right-0 h-0.5 bg-white/30 animate-[vcr_0.15s_linear_infinite]"></div>
          </>
        )}

        <div className="absolute top-2 right-2 font-mono text-[10px] text-red-500">REC ●</div>
      </div>

      <div className="mt-4 w-full max-w-xs">
        <label className="text-gray-400 font-mono text-xs block text-center mb-2">TRACKING ADJUST</label>
        <input
          type="range"
          min="-100"
          max="100"
          value={tracking}
          onChange={(e) => setTracking(parseInt(e.target.value))}
          className="w-full accent-gray-500"
        />
        <div className="flex justify-between text-gray-600 font-mono text-[10px] mt-1">
          <span>◀ WORSE</span>
          <span>BETTER ▶</span>
        </div>
      </div>

      <style>{`
        @keyframes vcr {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

// --- CASSETTE PLAYER ---
export const CassettePlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setRotation((r) => r + 5);
    }, 50);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="h-full bg-amber-100 flex flex-col items-center justify-center p-4">
      <div className="w-64 h-40 bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg border-4 border-gray-700 shadow-2xl p-4 relative">
        <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-amber-200 px-2 py-0.5 text-[8px] font-mono text-gray-800">
          C-90
        </div>

        <div className="flex justify-center gap-8 mt-6">
          <div
            className="w-12 h-12 rounded-full bg-gray-700 border-4 border-gray-600 flex items-center justify-center"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <div className="w-4 h-4 bg-white rounded-sm"></div>
          </div>
          <div
            className="w-12 h-12 rounded-full bg-gray-700 border-4 border-gray-600 flex items-center justify-center"
            style={{ transform: `rotate(${-rotation}deg)` }}
          >
            <div className="w-4 h-4 bg-white rounded-sm"></div>
          </div>
        </div>

        <div className="mt-4 h-2 bg-amber-900/50 rounded mx-4"></div>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => setIsPlaying(true)}
          className="p-2 bg-gray-800 text-green-400 rounded hover:bg-gray-700 border-2 border-gray-600"
        >
          <Play size={16} />
        </button>
        <button
          onClick={() => setIsPlaying(false)}
          className="p-2 bg-gray-800 text-red-400 rounded hover:bg-gray-700 border-2 border-gray-600"
        >
          <Square size={16} />
        </button>
        <button
          onClick={() => setRotation((r) => r + 50)}
          className="p-2 bg-gray-800 text-blue-400 rounded hover:bg-gray-700 border-2 border-gray-600"
        >
          <FastForward size={16} />
        </button>
      </div>

      <p className="mt-2 text-gray-600 font-mono text-xs">
        {isPlaying ? 'PLAYING...' : 'STOPPED'}
      </p>
    </div>
  );
};

// --- PUNCH CARD PROGRESS ---
export const PunchCardProgress = () => {
  const [completed, setCompleted] = useState([0, 1, 2]);
  const totalItems = 10;

  const toggleItem = (index: number) => {
    setCompleted((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="h-full bg-gray-800 flex flex-col items-center justify-center p-4">
      <div className="bg-amber-100 border-4 border-amber-900 p-4 shadow-xl" style={{ fontFamily: 'monospace' }}>
        <div className="flex justify-between items-center mb-3">
          <span className="text-[10px] text-amber-900 font-bold">IBM 80-COL CARD</span>
          <span className="text-[10px] text-amber-700">{completed.length}/{totalItems}</span>
        </div>

        <div className="grid grid-cols-10 gap-1">
          {[...Array(totalItems)].map((_, i) => (
            <button
              key={i}
              onClick={() => toggleItem(i)}
              className={`w-5 h-8 rounded-sm border transition-all ${
                completed.includes(i)
                  ? 'bg-amber-900/80 border-amber-800 shadow-inner'
                  : 'bg-amber-50 border-amber-300 hover:bg-amber-200'
              }`}
            >
              {completed.includes(i) && (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-2 h-4 bg-amber-100 rounded-sm"></div>
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="mt-3 flex justify-center gap-2">
          <div className="flex items-center gap-1 text-[10px] text-amber-800">
            <CheckCircle size={12} className="text-green-600" />
            <span>COMPLETED</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-amber-800">
            <AlertTriangle size={12} className="text-amber-600" />
            <span>PENDING</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export all components
export const arcadeComponents = {
  'tetris-review': TetrisReview,
  'space-invaders-progress': SpaceInvadersProgress,
  'scratch-card': ScratchCard,
  'dial-up-loader': DialUpLoader,
  'pinball-launcher': PinballLauncher,
  'combo-lock': ComboLock,
  // DataToolsDemos components
  'accordion-accordion': AccordionAccordion,
  'vcr-tracking': VCRTracking,
  'cassette-player': CassettePlayer,
  'punch-card-progress': PunchCardProgress,
};
