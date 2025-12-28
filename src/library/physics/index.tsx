import React, { useState, useRef, useEffect } from 'react';
import { useGameLoop } from '../shared/hooks';
import { X } from '../shared/icons';

// --- NEWTON'S CRADLE ---
export const NewtonsCradle = () => {
  const [swinging, setSwinging] = useState<number | null>(0);
  const balls = 5;

  useEffect(() => {
    if (swinging !== null) {
      const timeout = setTimeout(() => {
        setSwinging(prev => prev === 0 ? balls - 1 : prev === balls - 1 ? 0 : null);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [swinging]);

  return (
    <div className="h-full bg-zinc-900 flex flex-col items-center justify-center p-4">
      <div className="relative w-48 h-32">
        <div className="absolute top-0 left-0 right-0 h-2 bg-zinc-600 rounded" />
        {[...Array(balls)].map((_, i) => {
          const isSwinging = swinging === i;
          const rotation = isSwinging ? (i === 0 ? -30 : 30) : 0;
          return (
            <div
              key={i}
              className="absolute top-0 origin-top transition-transform duration-500"
              style={{
                left: `${20 + i * 20}%`,
                transform: `rotate(${rotation}deg)`,
                transitionTimingFunction: 'ease-in-out'
              }}
            >
              <div className="w-0.5 h-20 bg-zinc-400 mx-auto" />
              <div className="w-6 h-6 bg-gradient-to-br from-zinc-300 to-zinc-500 rounded-full shadow-lg -mt-1 mx-auto" />
            </div>
          );
        })}
      </div>
      <button
        onClick={() => setSwinging(0)}
        className="mt-4 px-3 py-1 bg-blue-600 text-white rounded text-xs font-mono"
      >
        START
      </button>
    </div>
  );
};

// --- MAGNETIC DRAG ---
export const MagneticDrag = () => {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const magnetPos = { x: 80, y: 80 };

  useGameLoop((dt) => {
    if (!isDragging) {
      const dx = magnetPos.x - pos.x;
      const dy = magnetPos.y - pos.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > 5) {
        setPos(p => ({
          x: p.x + (dx / dist) * 0.5,
          y: p.y + (dy / dist) * 0.5
        }));
      }
    }
  }, !isDragging);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100
    });
  };

  return (
    <div
      className="h-full bg-zinc-800 relative cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
    >
      {/* Magnet */}
      <div
        className="absolute w-8 h-8 flex items-center justify-center"
        style={{ left: `${magnetPos.x}%`, top: `${magnetPos.y}%`, transform: 'translate(-50%, -50%)' }}
      >
        <div className="w-6 h-8 bg-gradient-to-b from-red-500 to-blue-500 rounded-t-lg" />
      </div>
      {/* Draggable ball */}
      <div
        className="absolute w-6 h-6 bg-zinc-400 rounded-full shadow-lg cursor-grab"
        style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%, -50%)' }}
        onMouseDown={() => setIsDragging(true)}
      />
      <p className="absolute bottom-2 left-2 text-zinc-500 font-mono text-xs">
        DRAG & RELEASE
      </p>
    </div>
  );
};

// --- BUBBLE WRAP ---
export const BubbleWrap = () => {
  const [popped, setPopped] = useState<Set<number>>(new Set());
  const bubbleCount = 25;

  const pop = (i: number) => {
    if (!popped.has(i)) {
      setPopped(new Set([...popped, i]));
    }
  };

  return (
    <div className="h-full bg-zinc-100 flex flex-col items-center justify-center p-4">
      <div className="grid grid-cols-5 gap-1">
        {[...Array(bubbleCount)].map((_, i) => (
          <button
            key={i}
            onClick={() => pop(i)}
            className={`w-8 h-8 rounded-full transition-all duration-150 ${
              popped.has(i)
                ? 'bg-zinc-300 scale-90 shadow-inner'
                : 'bg-gradient-to-br from-blue-100 to-blue-200 shadow-lg hover:scale-95 active:scale-85'
            }`}
          />
        ))}
      </div>
      <p className="mt-3 text-zinc-500 font-mono text-xs">
        POPPED: {popped.size}/{bubbleCount}
      </p>
    </div>
  );
};

// --- SLINKY SCROLL ---
export const SlinkyScroll = () => {
  const [stretch, setStretch] = useState(0);
  const rings = 10;

  return (
    <div
      className="h-full bg-zinc-900 flex items-center justify-center overflow-hidden"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const y = (e.clientY - rect.top) / rect.height;
        setStretch(y);
      }}
    >
      <div className="relative w-24 h-full flex flex-col items-center justify-center">
        {[...Array(rings)].map((_, i) => {
          const baseSpacing = 4;
          const maxSpacing = 20;
          const spacing = baseSpacing + (maxSpacing - baseSpacing) * stretch;
          return (
            <div
              key={i}
              className="w-16 h-3 border-2 border-zinc-400 rounded-full bg-gradient-to-b from-zinc-300 to-zinc-500"
              style={{
                marginTop: i === 0 ? 0 : spacing,
                transform: `rotateX(${30 + stretch * 30}deg)`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

// --- PENDULUM TIMER ---
export const PendulumTimer = () => {
  const [angle, setAngle] = useState(0);
  const [direction, setDirection] = useState(1);
  const [ticks, setTicks] = useState(0);

  useGameLoop((dt) => {
    setAngle(a => {
      const newAngle = a + direction * 2;
      if (Math.abs(newAngle) > 30) {
        setDirection(d => -d);
        setTicks(t => t + 1);
      }
      return newAngle;
    });
  }, true);

  return (
    <div className="h-full bg-amber-50 flex flex-col items-center justify-center p-4">
      <div className="relative w-32 h-40">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-amber-800 rounded-full" />
        <div
          className="absolute top-2 left-1/2 origin-top transition-transform"
          style={{ transform: `translateX(-50%) rotate(${angle}deg)` }}
        >
          <div className="w-0.5 h-28 bg-amber-600 mx-auto" />
          <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow-lg -mt-2 mx-auto" />
        </div>
      </div>
      <p className="mt-4 font-mono text-amber-800 text-sm">
        TICKS: {ticks}
      </p>
    </div>
  );
};

// --- GRAVITY BALL ---
export const GravityBall = () => {
  const [pos, setPos] = useState({ y: 20 });
  const [velocity, setVelocity] = useState(0);
  const gravity = 0.5;
  const bounce = 0.7;

  useGameLoop((dt) => {
    setVelocity(v => v + gravity);
    setPos(p => {
      let newY = p.y + velocity;
      if (newY > 85) {
        newY = 85;
        setVelocity(-velocity * bounce);
      }
      return { y: newY };
    });
  }, true);

  return (
    <div className="h-full bg-zinc-800 relative">
      <div
        className="absolute left-1/2 w-10 h-10 bg-gradient-to-br from-red-400 to-red-600 rounded-full shadow-lg"
        style={{ top: `${pos.y}%`, transform: 'translate(-50%, -50%)' }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-zinc-600" />
      <p className="absolute top-2 left-2 text-zinc-400 font-mono text-xs">
        GRAVITY SIM
      </p>
    </div>
  );
};

// ============ FINAL DEMOS ============

// --- RUBBER BAND SNAP CLOSE BUTTON ---
export const SnapCloseButton = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isPulling, setIsPulling] = useState(false);

  const handleMouseDown = () => {
    setIsPulling(true);
  };

  const handleMouseUp = () => {
    if (isPulling) {
      setIsOpen(false);
      setTimeout(() => setIsOpen(true), 2000);
    }
    setIsPulling(false);
  };

  return (
    <div className="h-full bg-blue-100 flex items-center justify-center p-8">
      <div
        className={`relative w-80 h-40 bg-white border-4 border-blue-500 rounded-lg shadow-xl transition-transform duration-500 ${isOpen ? 'scale-100' : 'scale-0'}`}
      >
        <h2 className="p-4 text-xl font-bold">Modal Pop-up</h2>
        <div
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => setIsPulling(false)}
          className={`absolute top-[-15px] right-[-15px] w-8 h-8 bg-red-500 text-white rounded-full cursor-pointer flex items-center justify-center transition-all duration-100 ease-out z-20
            ${isPulling ? 'translate-x-[-10px] translate-y-[-10px] scale-90 shadow-none' : 'shadow-lg'}
          `}
        >
          <X size={16} />
        </div>

        {/* Rubber Band Visual */}
        {isPulling && (
          <div className="absolute top-0 right-0 w-4 h-4 z-10">
            <div className="absolute top-[-10px] right-[-10px] w-1 h-1 bg-red-700 rounded-full" />
            <div className="absolute top-[-10px] right-[-10px] w-[20px] h-[20px] border-2 border-dashed border-red-700 rounded-full animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
};

export const physicsComponents = {
  'newtons-cradle': NewtonsCradle,
  'magnetic-drag': MagneticDrag,
  'bubble-wrap': BubbleWrap,
  'slinky-scroll': SlinkyScroll,
  'pendulum-timer': PendulumTimer,
  'gravity-ball': GravityBall,
  // FinalDemos components
  'snap-close-button': SnapCloseButton,
};
