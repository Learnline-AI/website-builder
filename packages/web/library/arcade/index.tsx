import React, { useState, useRef, useEffect } from 'react';
import { Play, Square, FastForward, AlertTriangle, CheckCircle } from '../shared/icons';

// --- TETRIS REVIEW ---
export const TetrisReview = () => {
  const [blocks] = useState([
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
  const [progress] = useState(60);
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
  const [_revealed, _setRevealed] = useState(false);

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

// --- HIGH SCORE TABLE ---
export const HighScoreTable = () => {
  const [scores] = useState([
    { rank: 1, name: 'AAA', score: 999999, isNew: false },
    { rank: 2, name: 'CPU', score: 875420, isNew: false },
    { rank: 3, name: 'YOU', score: 654321, isNew: true },
    { rank: 4, name: 'ASM', score: 543210, isNew: false },
    { rank: 5, name: 'ROM', score: 432100, isNew: false },
  ]);
  const [blinkState, setBlinkState] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlinkState(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full bg-black flex flex-col items-center justify-center p-4 font-mono">
      <div className="relative">
        {/* CRT scanlines overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
          }}
        />

        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent blur-xl" />

        <div className="relative border-4 border-cyan-500 bg-zinc-950/90 p-4 shadow-[0_0_12px_rgba(6,182,212,0.2)]">
          <h2 className={`text-center text-2xl font-bold mb-4 ${blinkState ? 'text-yellow-400' : 'text-yellow-600'}`}
            style={{ textShadow: '0 0 6px rgba(250,204,21,0.5)' }}>
            HIGH SCORES
          </h2>

          <div className="space-y-1">
            <div className="flex justify-between text-cyan-300 text-xs border-b border-cyan-500/50 pb-1 mb-2">
              <span className="w-8">RNK</span>
              <span className="w-12">NAME</span>
              <span className="w-20 text-right">SCORE</span>
            </div>

            {scores.map((entry) => (
              <div
                key={entry.rank}
                className={`flex justify-between text-sm ${
                  entry.isNew
                    ? blinkState ? 'text-yellow-400' : 'text-yellow-600'
                    : entry.rank === 1 ? 'text-red-400' : 'text-green-400'
                }`}
                style={entry.isNew ? { textShadow: '0 0 4px rgba(250,204,21,0.4)' } : undefined}
              >
                <span className="w-8">{entry.rank}.</span>
                <span className="w-12">{entry.name}</span>
                <span className="w-20 text-right">{entry.score.toLocaleString()}</span>
              </div>
            ))}
          </div>

          <p className={`text-center text-xs mt-4 ${blinkState ? 'text-cyan-400' : 'text-cyan-600'}`}>
            PRESS START TO CONTINUE
          </p>
        </div>
      </div>

      <style>{`
        @keyframes crt-flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.98; }
        }
      `}</style>
    </div>
  );
};

// --- PLAYER SELECT ---
export const PlayerSelect = () => {
  const [selectedPlayer, setSelectedPlayer] = useState(0);
  const [joystickPos, setJoystickPos] = useState({ x: 0, y: 0 });
  const players = [
    { name: 'PLAYER 1', color: 'text-red-500', bgColor: 'bg-red-500', avatar: '1P' },
    { name: 'PLAYER 2', color: 'text-blue-500', bgColor: 'bg-blue-500', avatar: '2P' },
    { name: 'CPU', color: 'text-green-500', bgColor: 'bg-green-500', avatar: 'CP' },
  ];

  const moveSelection = (direction: 'left' | 'right') => {
    setJoystickPos({ x: direction === 'left' ? -15 : 15, y: 0 });
    setTimeout(() => setJoystickPos({ x: 0, y: 0 }), 150);

    setSelectedPlayer(prev => {
      if (direction === 'left') return prev > 0 ? prev - 1 : players.length - 1;
      return prev < players.length - 1 ? prev + 1 : 0;
    });
  };

  return (
    <div className="h-full bg-zinc-900 flex flex-col items-center justify-center p-4 font-mono">
      <h2 className="text-yellow-400 text-xl font-bold mb-6 pulse-subtle"
        style={{ textShadow: '0 0 6px rgba(250,204,21,0.4)' }}>
        SELECT PLAYER
      </h2>

      <div className="flex gap-4 mb-8">
        {players.map((player, index) => (
          <div
            key={index}
            onClick={() => setSelectedPlayer(index)}
            className={`cursor-pointer transition-all duration-200 ${
              selectedPlayer === index ? 'scale-110' : 'scale-90 opacity-50'
            }`}
          >
            <div className={`w-16 h-20 border-4 ${
              selectedPlayer === index ? 'border-yellow-400' : 'border-zinc-600'
            } bg-zinc-800 flex flex-col items-center justify-center rounded`}>
              <div className={`w-10 h-10 ${player.bgColor} rounded-full flex items-center justify-center text-white font-bold text-sm mb-1`}>
                {player.avatar}
              </div>
              <span className={`text-[10px] ${player.color}`}>{player.name}</span>
            </div>
            {selectedPlayer === index && (
              <div className="text-yellow-400 text-center text-lg animate-bounce mt-1">^</div>
            )}
          </div>
        ))}
      </div>

      {/* Joystick */}
      <div className="relative">
        <div className="w-20 h-20 bg-zinc-800 rounded-full border-4 border-zinc-600 flex items-center justify-center">
          <div
            className="w-10 h-10 bg-gradient-to-b from-red-500 to-red-700 rounded-full shadow-lg transition-transform duration-150 cursor-grab active:cursor-grabbing"
            style={{ transform: `translate(${joystickPos.x}px, ${joystickPos.y}px)` }}
          />
        </div>
        <div className="flex justify-between mt-2 px-2">
          <button
            onClick={() => moveSelection('left')}
            className="text-zinc-400 hover:text-white text-xl"
          >&lt;</button>
          <button
            onClick={() => moveSelection('right')}
            className="text-zinc-400 hover:text-white text-xl"
          >&gt;</button>
        </div>
      </div>

      <p className="text-cyan-400 text-xs mt-4 animate-pulse">PUSH START BUTTON</p>
    </div>
  );
};

// --- COIN COUNTER ---
export const CoinCounter = () => {
  const [coins, setCoins] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);

  const addCoin = () => {
    setIsAnimating(true);
    setCoins(prev => prev + 1);

    // Add sparkle effects
    const newSparkles = Array.from({ length: 5 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 40 - 20,
      y: Math.random() * 40 - 20,
    }));
    setSparkles(newSparkles);

    setTimeout(() => {
      setIsAnimating(false);
      setSparkles([]);
    }, 300);
  };

  return (
    <div className="h-full bg-zinc-900 flex flex-col items-center justify-center p-4 font-mono">
      <div className="relative">
        {/* Coin display */}
        <div className="flex items-center gap-3 bg-black border-4 border-yellow-600 px-6 py-3 rounded-lg shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]">
          <div className={`relative w-12 h-12 ${isAnimating ? 'animate-spin' : ''}`}>
            <div className="w-full h-full bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full border-4 border-yellow-700 flex items-center justify-center shadow-lg">
              <span className="text-yellow-900 font-black text-lg">$</span>
            </div>
            {/* Sparkles */}
            {sparkles.map(sparkle => (
              <div
                key={sparkle.id}
                className="absolute w-2 h-2 bg-yellow-300 rounded-full animate-ping"
                style={{
                  left: `calc(50% + ${sparkle.x}px)`,
                  top: `calc(50% + ${sparkle.y}px)`,
                }}
              />
            ))}
          </div>

          <div className="text-right">
            <div className="text-yellow-400 text-xs">COINS</div>
            <div className={`text-3xl font-bold text-green-400 ${isAnimating ? 'scale-125' : ''} transition-transform`}
              style={{ textShadow: '0 0 6px rgba(74,222,128,0.4)' }}>
              {coins.toString().padStart(3, '0')}
            </div>
          </div>
        </div>

        {/* Credit indicator */}
        <div className="mt-2 text-center">
          <span className="text-cyan-400 text-xs">CREDIT: </span>
          <span className="text-white text-xs">{Math.floor(coins / 4)}</span>
        </div>
      </div>

      {/* Insert coin button */}
      <button
        onClick={addCoin}
        className="mt-6 px-6 py-2 bg-gradient-to-b from-zinc-600 to-zinc-800 border-2 border-zinc-500 rounded text-yellow-400 font-bold text-sm hover:from-zinc-500 hover:to-zinc-700 active:scale-95 transition-all shadow-lg"
      >
        INSERT COIN
      </button>

      <p className="text-zinc-500 text-[10px] mt-2">4 COINS = 1 CREDIT</p>
    </div>
  );
};

// --- GAME OVER SCREEN ---
export const GameOverScreen = () => {
  const [countdown, setCountdown] = useState(10);
  const [isGameOver, setIsGameOver] = useState(true);
  const [glitchOffset, setGlitchOffset] = useState(0);

  useEffect(() => {
    if (!isGameOver) return;

    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const glitchInterval = setInterval(() => {
      setGlitchOffset(Math.random() * 4 - 2);
      setTimeout(() => setGlitchOffset(0), 50);
    }, 200);

    return () => {
      clearInterval(countdownInterval);
      clearInterval(glitchInterval);
    };
  }, [isGameOver]);

  const handleContinue = () => {
    setIsGameOver(false);
    setTimeout(() => {
      setIsGameOver(true);
      setCountdown(10);
    }, 2000);
  };

  return (
    <div className="h-full bg-black flex flex-col items-center justify-center p-4 font-mono overflow-hidden">
      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
        }}
      />

      {isGameOver ? (
        <div className="relative text-center">
          {/* Glitch layers */}
          <div className="absolute inset-0 text-red-500 opacity-50"
            style={{ transform: `translateX(${glitchOffset}px)` }}>
            <h1 className="text-4xl font-black">GAME OVER</h1>
          </div>
          <div className="absolute inset-0 text-cyan-500 opacity-50"
            style={{ transform: `translateX(${-glitchOffset}px)` }}>
            <h1 className="text-4xl font-black">GAME OVER</h1>
          </div>

          <h1 className="text-4xl font-black text-white relative"
            style={{ textShadow: '0 0 10px rgba(255,0,0,0.5)' }}>
            GAME OVER
          </h1>

          <div className="mt-8">
            <p className="text-yellow-400 text-lg mb-2">CONTINUE?</p>
            <div className="text-6xl font-black text-red-500 pulse-subtle"
              style={{ textShadow: '0 0 12px rgba(239,68,68,0.5)' }}>
              {countdown}
            </div>
          </div>

          <button
            onClick={handleContinue}
            disabled={countdown === 0}
            className={`mt-6 px-8 py-3 border-4 font-bold text-lg transition-all ${
              countdown > 0
                ? 'border-green-500 text-green-400 hover:bg-green-500 hover:text-black animate-pulse'
                : 'border-zinc-600 text-zinc-600 cursor-not-allowed'
            }`}
          >
            {countdown > 0 ? 'INSERT COIN' : 'TIME OUT'}
          </button>

          <p className="text-zinc-500 text-xs mt-4">PRESS START TO CONTINUE</p>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-3xl font-bold text-green-400 pulse-subtle"
            style={{ textShadow: '0 0 10px rgba(74,222,128,0.5)' }}>
            GET READY!
          </h2>
          <p className="text-cyan-400 mt-4">STAGE 2</p>
        </div>
      )}
    </div>
  );
};

// --- POWER UP INDICATOR ---
export const PowerUpIndicator = () => {
  const [powerUps, setPowerUps] = useState([
    { id: 'speed', icon: '>', name: 'SPEED', active: true, timer: 100 },
    { id: 'shield', icon: 'O', name: 'SHIELD', active: false, timer: 0 },
    { id: 'weapon', icon: '*', name: 'LASER', active: true, timer: 75 },
    { id: 'multi', icon: 'x', name: 'MULTI', active: false, timer: 0 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPowerUps(prev => prev.map(p => ({
        ...p,
        timer: p.active && p.timer > 0 ? p.timer - 1 : p.timer,
        active: p.active && p.timer > 1,
      })));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const togglePowerUp = (id: string) => {
    setPowerUps(prev => prev.map(p =>
      p.id === id ? { ...p, active: !p.active, timer: !p.active ? 100 : 0 } : p
    ));
  };

  return (
    <div className="h-full bg-zinc-900 flex flex-col items-center justify-center p-4 font-mono">
      <h3 className="text-cyan-400 text-sm mb-4">POWER-UPS</h3>

      <div className="flex gap-3">
        {powerUps.map((powerUp) => (
          <button
            key={powerUp.id}
            onClick={() => togglePowerUp(powerUp.id)}
            className={`relative w-14 h-16 border-2 rounded transition-all ${
              powerUp.active
                ? 'border-yellow-400 bg-yellow-400/10'
                : 'border-zinc-600 bg-zinc-800'
            }`}
          >
            {/* Icon */}
            <div className={`text-2xl font-black ${
              powerUp.active ? 'text-yellow-400 animate-pulse' : 'text-zinc-600'
            }`}
              style={powerUp.active ? { textShadow: '0 0 6px rgba(250,204,21,0.5)' } : undefined}>
              {powerUp.icon}
            </div>

            {/* Label */}
            <div className={`text-[8px] ${powerUp.active ? 'text-yellow-400' : 'text-zinc-500'}`}>
              {powerUp.name}
            </div>

            {/* Timer bar */}
            {powerUp.active && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-zinc-700">
                <div
                  className="h-full bg-yellow-400 transition-all duration-100"
                  style={{ width: `${powerUp.timer}%` }}
                />
              </div>
            )}

            {/* Glow effect when active */}
            {powerUp.active && (
              <div className="absolute inset-0 rounded animate-ping opacity-20 bg-yellow-400" />
            )}
          </button>
        ))}
      </div>

      <p className="text-zinc-500 text-[10px] mt-4">CLICK TO TOGGLE</p>
    </div>
  );
};

// --- LEVEL PROGRESS ---
export const LevelProgress = () => {
  const [progress, setProgress] = useState(30);
  const [playerPos, setPlayerPos] = useState(30);
  const obstacles = [20, 45, 70, 90];
  const coins = [15, 35, 55, 75, 95];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 0.5;
        if (newProgress > 100) return 0;
        setPlayerPos(newProgress);
        return newProgress;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full bg-zinc-900 flex flex-col items-center justify-center p-4 font-mono">
      <div className="text-cyan-400 text-xs mb-2">WORLD 1-1</div>

      <div className="w-full max-w-xs">
        {/* Level track */}
        <div className="relative h-16 bg-gradient-to-b from-sky-300 to-sky-400 border-4 border-zinc-700 rounded overflow-hidden">
          {/* Ground */}
          <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-b from-green-500 to-green-700" />

          {/* Decorative blocks */}
          <div className="absolute bottom-6 left-[10%] w-4 h-4 bg-amber-600 border border-amber-800" />
          <div className="absolute bottom-6 left-[60%] w-4 h-4 bg-amber-600 border border-amber-800" />

          {/* Obstacles */}
          {obstacles.map((pos, i) => (
            <div
              key={i}
              className="absolute bottom-6 w-3 h-4 bg-green-800"
              style={{ left: `${pos}%` }}
            />
          ))}

          {/* Coins */}
          {coins.map((pos, i) => (
            <div
              key={i}
              className={`absolute bottom-10 w-3 h-3 rounded-full ${
                playerPos > pos ? 'opacity-30' : 'bg-yellow-400 animate-bounce'
              }`}
              style={{ left: `${pos}%`, animationDelay: `${i * 100}ms` }}
            />
          ))}

          {/* Player */}
          <div
            className="absolute bottom-6 w-4 h-5 bg-red-500 rounded-t transition-all duration-50"
            style={{ left: `${playerPos}%` }}
          >
            <div className="absolute -top-2 left-1 w-2 h-2 bg-red-600 rounded-full" />
          </div>

          {/* Flag at end */}
          <div className="absolute bottom-6 right-2 w-1 h-10 bg-zinc-700">
            <div className="w-3 h-2 bg-green-600 absolute top-0" />
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-2 h-2 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-50"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex justify-between text-[10px] mt-1">
          <span className="text-zinc-500">START</span>
          <span className="text-green-400">{Math.floor(progress)}%</span>
          <span className="text-zinc-500">GOAL</span>
        </div>
      </div>
    </div>
  );
};

// --- RETRO HEALTH BAR ---
export const RetroHealthBar = () => {
  const [health, setHealth] = useState(5);
  const [maxHealth] = useState(5);
  const [isHit, setIsHit] = useState(false);

  const takeDamage = () => {
    if (health > 0) {
      setIsHit(true);
      setHealth(prev => prev - 1);
      setTimeout(() => setIsHit(false), 200);
    }
  };

  const heal = () => {
    if (health < maxHealth) {
      setHealth(prev => Math.min(prev + 1, maxHealth));
    }
  };

  const resetHealth = () => {
    setHealth(maxHealth);
  };

  return (
    <div className="h-full bg-zinc-900 flex flex-col items-center justify-center p-4 font-mono">
      <div className={`transition-all duration-200 ${isHit ? 'scale-110 animate-pulse' : ''}`}>
        <div className="text-xs text-red-400 mb-2">HEALTH</div>

        {/* Hearts display */}
        <div className="flex gap-1 mb-4">
          {[...Array(maxHealth)].map((_, i) => (
            <div
              key={i}
              className={`text-2xl transition-all duration-200 ${
                i < health
                  ? 'text-red-500'
                  : 'text-zinc-700'
              } ${i === health - 1 && health <= 2 ? 'animate-pulse' : ''}`}
              style={i < health ? {
                textShadow: '0 0 10px rgba(239,68,68,0.5)',
                filter: `drop-shadow(0 0 3px rgba(239,68,68,0.5))`
              } : undefined}
            >
              {i < health ? (
                // Filled heart (pixel art style using CSS)
                <div className="w-6 h-6 relative">
                  <div className="absolute w-3 h-3 bg-red-500 rounded-tl-full rounded-tr-full left-0 top-0" />
                  <div className="absolute w-3 h-3 bg-red-500 rounded-tl-full rounded-tr-full right-0 top-0" />
                  <div className="absolute w-6 h-4 bg-red-500 bottom-0 left-0 clip-heart"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }} />
                </div>
              ) : (
                // Empty heart
                <div className="w-6 h-6 relative">
                  <div className="absolute w-3 h-3 border-2 border-zinc-600 rounded-tl-full rounded-tr-full left-0 top-0" />
                  <div className="absolute w-3 h-3 border-2 border-zinc-600 rounded-tl-full rounded-tr-full right-0 top-0" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Segmented bar version */}
        <div className="flex gap-0.5 mb-4">
          {[...Array(maxHealth * 4)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-4 ${
                i < health * 4
                  ? health <= 2
                    ? 'bg-red-500 animate-pulse'
                    : health <= 3
                    ? 'bg-yellow-500'
                    : 'bg-green-500'
                  : 'bg-zinc-700'
              }`}
            />
          ))}
        </div>

        {/* HP text */}
        <div className="text-center text-sm">
          <span className="text-white">HP </span>
          <span className={`font-bold ${
            health <= 2 ? 'text-red-500' : health <= 3 ? 'text-yellow-500' : 'text-green-500'
          }`}>
            {health * 20}
          </span>
          <span className="text-zinc-500">/{maxHealth * 20}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={takeDamage}
          disabled={health === 0}
          className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          DAMAGE
        </button>
        <button
          onClick={heal}
          disabled={health === maxHealth}
          className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          HEAL
        </button>
        <button
          onClick={resetHealth}
          className="px-3 py-1 bg-zinc-600 text-white text-xs rounded hover:bg-zinc-500"
        >
          RESET
        </button>
      </div>
    </div>
  );
};

// --- ARCADE JOYSTICK ---
export const ArcadeJoystick = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [direction, setDirection] = useState('NEUTRAL');
  const joystickRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setPosition({ x: 0, y: 0 });
    setDirection('NEUTRAL');
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !joystickRef.current) return;

    const rect = joystickRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const x = e.clientX - rect.left - centerX;
    const y = e.clientY - rect.top - centerY;

    const maxDistance = 30;
    const distance = Math.sqrt(x * x + y * y);
    const clampedDistance = Math.min(distance, maxDistance);
    const angle = Math.atan2(y, x);

    const newX = Math.cos(angle) * clampedDistance;
    const newY = Math.sin(angle) * clampedDistance;

    setPosition({ x: newX, y: newY });

    // Determine direction
    if (distance < 10) {
      setDirection('NEUTRAL');
    } else {
      const deg = (angle * 180 / Math.PI + 360) % 360;
      if (deg >= 315 || deg < 45) setDirection('RIGHT');
      else if (deg >= 45 && deg < 135) setDirection('DOWN');
      else if (deg >= 135 && deg < 225) setDirection('LEFT');
      else setDirection('UP');
    }
  };

  return (
    <div className="h-full bg-zinc-900 flex flex-col items-center justify-center p-4 font-mono">
      {/* Direction display */}
      <div className="grid grid-cols-3 gap-1 mb-4 text-xs">
        <div />
        <div className={`px-2 py-1 text-center ${direction === 'UP' ? 'bg-yellow-500 text-black' : 'bg-zinc-700 text-zinc-400'}`}>UP</div>
        <div />
        <div className={`px-2 py-1 text-center ${direction === 'LEFT' ? 'bg-yellow-500 text-black' : 'bg-zinc-700 text-zinc-400'}`}>LEFT</div>
        <div className={`px-2 py-1 text-center ${direction === 'NEUTRAL' ? 'bg-cyan-500 text-black' : 'bg-zinc-700 text-zinc-400'}`}>O</div>
        <div className={`px-2 py-1 text-center ${direction === 'RIGHT' ? 'bg-yellow-500 text-black' : 'bg-zinc-700 text-zinc-400'}`}>RIGHT</div>
        <div />
        <div className={`px-2 py-1 text-center ${direction === 'DOWN' ? 'bg-yellow-500 text-black' : 'bg-zinc-700 text-zinc-400'}`}>DOWN</div>
        <div />
      </div>

      {/* Joystick base */}
      <div
        ref={joystickRef}
        className="relative w-32 h-32 bg-zinc-800 rounded-full border-4 border-zinc-600 shadow-inner cursor-pointer"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {/* Guide ring */}
        <div className="absolute inset-4 border-2 border-zinc-700 rounded-full" />

        {/* Joystick handle */}
        <div
          className="absolute top-1/2 left-1/2 w-14 h-14 -mt-7 -ml-7 transition-transform duration-75"
          style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
        >
          {/* Stick shaft */}
          <div className="absolute bottom-0 left-1/2 -ml-2 w-4 h-8 bg-gradient-to-b from-zinc-500 to-zinc-600 rounded-b" />
          {/* Ball top */}
          <div className={`w-14 h-14 rounded-full shadow-lg ${
            isDragging
              ? 'bg-gradient-to-b from-red-400 to-red-600'
              : 'bg-gradient-to-b from-red-500 to-red-700'
          }`}>
            <div className="absolute top-2 left-3 w-3 h-3 bg-white/30 rounded-full" />
          </div>
        </div>
      </div>

      <p className="text-zinc-500 text-[10px] mt-4">DRAG TO MOVE</p>
    </div>
  );
};

// --- INSERT COIN BUTTON ---
export const InsertCoinButton = () => {
  const [credits, setCredits] = useState(0);
  const [isInserting, setIsInserting] = useState(false);
  const [coinY, setCoinY] = useState(-20);

  const insertCoin = () => {
    if (isInserting) return;

    setIsInserting(true);
    setCoinY(-20);

    // Animate coin falling
    let y = -20;
    const animInterval = setInterval(() => {
      y += 8;
      setCoinY(y);
      if (y > 40) {
        clearInterval(animInterval);
        setCredits(prev => prev + 1);
        setTimeout(() => {
          setIsInserting(false);
          setCoinY(-20);
        }, 200);
      }
    }, 30);
  };

  return (
    <div className="h-full bg-black flex flex-col items-center justify-center p-4 font-mono">
      {/* Cabinet panel */}
      <div className="relative bg-gradient-to-b from-zinc-800 to-zinc-900 border-4 border-zinc-700 rounded-lg p-6 shadow-2xl">
        {/* Credit display */}
        <div className="bg-black border-2 border-zinc-600 px-4 py-2 mb-4">
          <div className="text-red-500 text-xs">CREDIT</div>
          <div className="text-green-400 text-2xl font-bold text-center"
            style={{ textShadow: '0 0 10px rgba(74,222,128,0.5)' }}>
            {credits.toString().padStart(2, '0')}
          </div>
        </div>

        {/* Coin slot */}
        <div className="relative mx-auto w-20 h-16 bg-zinc-900 border-2 border-zinc-600 rounded overflow-hidden">
          {/* Slot opening */}
          <div className="absolute top-2 left-1/2 -ml-6 w-12 h-2 bg-black border border-zinc-700 rounded-full" />

          {/* Animated coin */}
          {isInserting && (
            <div
              className="absolute left-1/2 -ml-3 w-6 h-6 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full border-2 border-yellow-700"
              style={{ top: coinY }}
            >
              <span className="absolute inset-0 flex items-center justify-center text-yellow-900 font-bold text-xs">$</span>
            </div>
          )}

          {/* Return tray */}
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-zinc-800 border-t border-zinc-600" />
        </div>

        {/* Insert coin button */}
        <button
          onClick={insertCoin}
          disabled={isInserting}
          className={`mt-4 w-full py-3 rounded border-4 font-black text-lg transition-all ${
            isInserting
              ? 'bg-zinc-700 border-zinc-600 text-zinc-500'
              : 'bg-yellow-500 border-yellow-600 text-black hover:bg-yellow-400 animate-pulse'
          }`}
          style={!isInserting ? {
            boxShadow: '0 0 10px rgba(234,179,8,0.3)',
            textShadow: '0 1px 0 rgba(255,255,255,0.2)'
          } : undefined}
        >
          INSERT COIN
        </button>

        {/* 1 PLAYER / 2 PLAYERS buttons */}
        <div className="flex gap-2 mt-4">
          <button
            disabled={credits < 1}
            className={`flex-1 py-2 rounded text-xs font-bold ${
              credits >= 1
                ? 'bg-red-600 text-white hover:bg-red-500'
                : 'bg-zinc-700 text-zinc-500 cursor-not-allowed'
            }`}
          >
            1 PLAYER
          </button>
          <button
            disabled={credits < 2}
            className={`flex-1 py-2 rounded text-xs font-bold ${
              credits >= 2
                ? 'bg-blue-600 text-white hover:bg-blue-500'
                : 'bg-zinc-700 text-zinc-500 cursor-not-allowed'
            }`}
          >
            2 PLAYERS
          </button>
        </div>
      </div>

      <p className="text-cyan-400 text-[10px] mt-4 animate-pulse">PUSH START BUTTON</p>
    </div>
  );
};

// --- PIXEL AVATAR ---
export const PixelAvatar = () => {
  const [skinColor, setSkinColor] = useState('#ffcc99');
  const [hairColor, setHairColor] = useState('#4a3728');
  const [shirtColor, setShirtColor] = useState('#3b82f6');
  const [eyeStyle, setEyeStyle] = useState(0);
  const [hairStyle, setHairStyle] = useState(0);

  const pixelSize = 6;
  const eyeStyles = ['normal', 'closed', 'wink'];
  const hairStyles = ['short', 'long', 'spiky'];

  // 8x8 pixel grid definitions
  const baseHead = [
    [0,0,1,1,1,1,0,0],
    [0,1,1,1,1,1,1,0],
    [1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1],
    [0,1,1,1,1,1,1,0],
    [0,0,1,1,1,1,0,0],
  ];

  const hairPatterns: Record<string, number[][]> = {
    short: [
      [0,0,1,1,1,1,0,0],
      [0,1,1,1,1,1,1,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
    ],
    long: [
      [0,0,1,1,1,1,0,0],
      [0,1,1,1,1,1,1,0],
      [1,1,0,0,0,0,1,1],
      [1,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,1],
      [0,0,0,0,0,0,0,0],
    ],
    spiky: [
      [0,1,0,1,1,0,1,0],
      [1,1,1,1,1,1,1,1],
      [0,1,0,0,0,0,1,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
    ],
  };

  return (
    <div className="h-full bg-zinc-900 flex flex-col items-center justify-center p-4 font-mono">
      <div className="text-cyan-400 text-xs mb-4">PIXEL AVATAR</div>

      {/* Avatar display */}
      <div className="relative bg-zinc-800 p-4 rounded-lg border-2 border-zinc-700 mb-4">
        <div className="relative" style={{ width: pixelSize * 8, height: pixelSize * 10 }}>
          {/* Head base */}
          {baseHead.map((row, y) =>
            row.map((pixel, x) =>
              pixel ? (
                <div
                  key={`head-${x}-${y}`}
                  className="absolute"
                  style={{
                    left: x * pixelSize,
                    top: (y + 2) * pixelSize,
                    width: pixelSize,
                    height: pixelSize,
                    backgroundColor: skinColor,
                  }}
                />
              ) : null
            )
          )}

          {/* Hair */}
          {hairPatterns[hairStyles[hairStyle]].map((row, y) =>
            row.map((pixel, x) =>
              pixel ? (
                <div
                  key={`hair-${x}-${y}`}
                  className="absolute"
                  style={{
                    left: x * pixelSize,
                    top: y * pixelSize,
                    width: pixelSize,
                    height: pixelSize,
                    backgroundColor: hairColor,
                  }}
                />
              ) : null
            )
          )}

          {/* Eyes */}
          <div
            className="absolute bg-black"
            style={{
              left: 2 * pixelSize,
              top: 5 * pixelSize,
              width: pixelSize,
              height: eyeStyles[eyeStyle] === 'closed' ? pixelSize / 2 : pixelSize,
            }}
          />
          <div
            className="absolute bg-black"
            style={{
              left: 5 * pixelSize,
              top: 5 * pixelSize,
              width: pixelSize,
              height: eyeStyles[eyeStyle] === 'wink' ? pixelSize / 2 : pixelSize,
            }}
          />

          {/* Mouth */}
          <div
            className="absolute bg-black"
            style={{
              left: 3 * pixelSize,
              top: 7 * pixelSize,
              width: pixelSize * 2,
              height: pixelSize / 2,
            }}
          />

          {/* Shirt */}
          <div
            className="absolute"
            style={{
              left: pixelSize,
              top: 10 * pixelSize,
              width: pixelSize * 6,
              height: pixelSize * 2,
              backgroundColor: shirtColor,
            }}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-2 w-full max-w-[200px]">
        <div className="flex items-center justify-between text-xs">
          <span className="text-zinc-400">SKIN</span>
          <div className="flex gap-1">
            {['#ffcc99', '#c68642', '#8d5524', '#ffdbac'].map(color => (
              <button
                key={color}
                onClick={() => setSkinColor(color)}
                className={`w-5 h-5 rounded border-2 ${skinColor === color ? 'border-white' : 'border-zinc-600'}`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-zinc-400">HAIR</span>
          <div className="flex gap-1">
            {['#4a3728', '#000000', '#ffcc00', '#ff6b6b'].map(color => (
              <button
                key={color}
                onClick={() => setHairColor(color)}
                className={`w-5 h-5 rounded border-2 ${hairColor === color ? 'border-white' : 'border-zinc-600'}`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-zinc-400">SHIRT</span>
          <div className="flex gap-1">
            {['#3b82f6', '#ef4444', '#22c55e', '#a855f7'].map(color => (
              <button
                key={color}
                onClick={() => setShirtColor(color)}
                className={`w-5 h-5 rounded border-2 ${shirtColor === color ? 'border-white' : 'border-zinc-600'}`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs pt-2">
          <button
            onClick={() => setHairStyle(prev => (prev + 1) % hairStyles.length)}
            className="px-2 py-1 bg-zinc-700 text-white rounded hover:bg-zinc-600"
          >
            HAIR: {hairStyles[hairStyle].toUpperCase()}
          </button>
          <button
            onClick={() => setEyeStyle(prev => (prev + 1) % eyeStyles.length)}
            className="px-2 py-1 bg-zinc-700 text-white rounded hover:bg-zinc-600"
          >
            EYES: {eyeStyles[eyeStyle].toUpperCase()}
          </button>
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
  // New arcade components
  'high-score-table': HighScoreTable,
  'player-select': PlayerSelect,
  'coin-counter': CoinCounter,
  'game-over-screen': GameOverScreen,
  'power-up-indicator': PowerUpIndicator,
  'level-progress': LevelProgress,
  'retro-health-bar': RetroHealthBar,
  'arcade-joystick': ArcadeJoystick,
  'insert-coin-button': InsertCoinButton,
  'pixel-avatar': PixelAvatar,
};
