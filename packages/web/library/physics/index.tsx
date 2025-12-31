import React, { useState, useEffect } from 'react';
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

  useGameLoop((_dt) => {
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

  useGameLoop((_dt) => {
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

  useGameLoop((_dt) => {
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

// --- SPRING OSCILLATOR ---
export const SpringOscillator = () => {
  const [position, setPosition] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragY, setDragY] = useState(0);
  const springConstant = 0.08;
  const damping = 0.95;
  const mass = 1;

  useGameLoop(() => {
    if (!isDragging) {
      const acceleration = (-springConstant * position) / mass;
      setVelocity(v => (v + acceleration) * damping);
      setPosition(p => p + velocity);
    }
  }, !isDragging && Math.abs(velocity) > 0.01 || Math.abs(position) > 0.5);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragY(e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const delta = e.clientY - dragY;
      setPosition(Math.max(-60, Math.min(60, delta)));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setVelocity(0);
  };

  const springCoils = 8;
  const coilHeight = 80 + position;
  const coilSpacing = coilHeight / springCoils;

  return (
    <div
      className="h-full bg-zinc-900 flex flex-col items-center justify-center p-4 select-none"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="relative w-32 h-52">
        {/* Fixed mount */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-3 bg-zinc-600 rounded" />

        {/* Spring coils */}
        <svg className="absolute top-3 left-1/2 -translate-x-1/2 w-16" style={{ height: coilHeight }}>
          <path
            d={Array.from({ length: springCoils }, (_, i) => {
              const y1 = i * coilSpacing;
              const y2 = (i + 0.5) * coilSpacing;
              return `M 8 ${y1} Q 56 ${y1} 56 ${y2} Q 8 ${y2} 8 ${(i + 1) * coilSpacing}`;
            }).join(' ')}
            fill="none"
            stroke="#a1a1aa"
            strokeWidth="3"
          />
        </svg>

        {/* Mass */}
        <div
          className="absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg shadow-lg cursor-grab flex items-center justify-center"
          style={{ top: 80 + position }}
          onMouseDown={handleMouseDown}
        >
          <span className="text-white font-bold text-sm">1kg</span>
        </div>
      </div>
      <p className="mt-4 text-zinc-500 font-mono text-xs">DRAG MASS TO OSCILLATE</p>
    </div>
  );
};

// --- COLLISION DEMO ---
export const CollisionDemo = () => {
  const [ball1, setBall1] = useState({ x: 20, vx: 2, mass: 2 });
  const [ball2, setBall2] = useState({ x: 80, vx: -1, mass: 1 });
  const [hasCollided, setHasCollided] = useState(false);

  const ball1Radius = 20;
  const ball2Radius = 14;

  useGameLoop(() => {
    setBall1(b => {
      let newX = b.x + b.vx;
      let newVx = b.vx;
      if (newX <= 10 || newX >= 90) newVx = -newVx;
      return { ...b, x: Math.max(10, Math.min(90, newX)), vx: newVx };
    });
    setBall2(b => {
      let newX = b.x + b.vx;
      let newVx = b.vx;
      if (newX <= 10 || newX >= 90) newVx = -newVx;
      return { ...b, x: Math.max(10, Math.min(90, newX)), vx: newVx };
    });

    // Check collision
    const distance = Math.abs(ball1.x - ball2.x);
    if (distance < 12 && !hasCollided) {
      // Elastic collision formula
      const m1 = ball1.mass;
      const m2 = ball2.mass;
      const v1 = ball1.vx;
      const v2 = ball2.vx;

      const newV1 = ((m1 - m2) * v1 + 2 * m2 * v2) / (m1 + m2);
      const newV2 = ((m2 - m1) * v2 + 2 * m1 * v1) / (m1 + m2);

      setBall1(b => ({ ...b, vx: newV1 }));
      setBall2(b => ({ ...b, vx: newV2 }));
      setHasCollided(true);
      setTimeout(() => setHasCollided(false), 100);
    }
  }, true);

  const reset = () => {
    setBall1({ x: 20, vx: 2, mass: 2 });
    setBall2({ x: 80, vx: -1, mass: 1 });
  };

  return (
    <div className="h-full bg-zinc-800 flex flex-col items-center justify-center p-4">
      <div className="relative w-full h-32 bg-zinc-700 rounded-lg border-2 border-zinc-600">
        {/* Ball 1 */}
        <div
          className="absolute top-1/2 -translate-y-1/2 bg-gradient-to-br from-red-400 to-red-600 rounded-full shadow-lg flex items-center justify-center transition-transform"
          style={{
            left: `${ball1.x}%`,
            transform: `translateX(-50%) translateY(-50%) ${hasCollided ? 'scale(1.1)' : 'scale(1)'}`,
            width: ball1Radius * 2,
            height: ball1Radius * 2,
          }}
        >
          <span className="text-white text-xs font-bold">2kg</span>
        </div>

        {/* Ball 2 */}
        <div
          className="absolute top-1/2 -translate-y-1/2 bg-gradient-to-br from-green-400 to-green-600 rounded-full shadow-lg flex items-center justify-center transition-transform"
          style={{
            left: `${ball2.x}%`,
            transform: `translateX(-50%) translateY(-50%) ${hasCollided ? 'scale(1.1)' : 'scale(1)'}`,
            width: ball2Radius * 2,
            height: ball2Radius * 2,
          }}
        >
          <span className="text-white text-xs font-bold">1kg</span>
        </div>
      </div>

      <div className="mt-4 flex gap-4 items-center">
        <button onClick={reset} className="px-3 py-1 bg-blue-600 text-white rounded text-xs font-mono">
          RESET
        </button>
        <p className="text-zinc-400 font-mono text-xs">ELASTIC COLLISION</p>
      </div>
    </div>
  );
};

// --- WAVE SIMULATOR ---
export const WaveSimulator = () => {
  const [frequency, setFrequency] = useState(2);
  const [amplitude, setAmplitude] = useState(30);
  const [phase, setPhase] = useState(0);

  useGameLoop(() => {
    setPhase(p => (p + 0.05 * frequency) % (Math.PI * 2));
  }, true);

  const points = 50;
  const path = Array.from({ length: points }, (_, i) => {
    const x = (i / (points - 1)) * 100;
    const y = 50 + amplitude * Math.sin((i / points) * Math.PI * 2 * frequency + phase);
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  return (
    <div className="h-full bg-zinc-900 flex flex-col items-center justify-center p-4">
      <div className="w-full h-32 bg-zinc-800 rounded-lg border border-zinc-700 relative overflow-hidden">
        <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
          {/* Grid lines */}
          <line x1="0" y1="50" x2="100" y2="50" stroke="#3f3f46" strokeWidth="0.5" />
          <line x1="50" y1="0" x2="50" y2="100" stroke="#3f3f46" strokeWidth="0.5" />

          {/* Wave */}
          <path d={path} fill="none" stroke="#22d3ee" strokeWidth="2" />
        </svg>
      </div>

      <div className="mt-4 w-full max-w-xs space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-zinc-400 font-mono text-xs w-20">Frequency</span>
          <input
            type="range"
            min="0.5"
            max="5"
            step="0.5"
            value={frequency}
            onChange={e => setFrequency(parseFloat(e.target.value))}
            className="flex-1"
          />
          <span className="text-cyan-400 font-mono text-xs w-8">{frequency}Hz</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-zinc-400 font-mono text-xs w-20">Amplitude</span>
          <input
            type="range"
            min="10"
            max="40"
            step="5"
            value={amplitude}
            onChange={e => setAmplitude(parseFloat(e.target.value))}
            className="flex-1"
          />
          <span className="text-cyan-400 font-mono text-xs w-8">{amplitude}</span>
        </div>
      </div>
    </div>
  );
};

// --- FRICTION SLIDER ---
export const FrictionSlider = () => {
  const [friction, setFriction] = useState(0.3);
  const [position, setPosition] = useState(10);
  const [velocity, setVelocity] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useGameLoop(() => {
    if (isRunning) {
      const frictionForce = friction * 0.5;
      setVelocity(v => {
        const newV = v - frictionForce;
        if (newV <= 0) {
          setIsRunning(false);
          return 0;
        }
        return newV;
      });
      setPosition(p => {
        const newP = p + velocity;
        if (newP >= 90) {
          setIsRunning(false);
          return 90;
        }
        return newP;
      });
    }
  }, isRunning);

  const launch = () => {
    setPosition(10);
    setVelocity(3);
    setIsRunning(true);
  };

  const surfaces = [
    { name: 'Ice', friction: 0.05, color: '#93c5fd' },
    { name: 'Wood', friction: 0.3, color: '#d4a574' },
    { name: 'Rubber', friction: 0.7, color: '#1f1f1f' },
    { name: 'Sand', friction: 0.9, color: '#fcd34d' },
  ];

  return (
    <div className="h-full bg-zinc-800 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-xs space-y-4">
        {/* Surface selector */}
        <div className="flex gap-2 justify-center">
          {surfaces.map(s => (
            <button
              key={s.name}
              onClick={() => setFriction(s.friction)}
              className={`px-2 py-1 rounded text-xs font-mono transition-all ${
                friction === s.friction ? 'ring-2 ring-white' : ''
              }`}
              style={{ backgroundColor: s.color, color: s.friction > 0.5 ? '#fff' : '#000' }}
            >
              {s.name}
            </button>
          ))}
        </div>

        {/* Track */}
        <div
          className="relative h-12 rounded-lg border-2 border-zinc-600"
          style={{
            background: surfaces.find(s => s.friction === friction)?.color || '#666',
          }}
        >
          {/* Block */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-10 h-8 bg-gradient-to-br from-zinc-300 to-zinc-500 rounded shadow-lg transition-all"
            style={{ left: `${position}%`, transform: `translateX(-50%) translateY(-50%)` }}
          />
        </div>

        <div className="flex justify-between items-center">
          <span className="text-zinc-400 font-mono text-xs">
            Friction: {friction.toFixed(2)}
          </span>
          <button onClick={launch} className="px-3 py-1 bg-green-600 text-white rounded text-xs font-mono">
            PUSH
          </button>
        </div>
      </div>
    </div>
  );
};

// --- PULLEY SYSTEM ---
export const PulleySystem = () => {
  const [leftWeight, setLeftWeight] = useState(2);
  const [rightWeight, setRightWeight] = useState(1);
  const [leftY, setLeftY] = useState(30);
  const [isAnimating, setIsAnimating] = useState(false);

  useGameLoop(() => {
    if (isAnimating) {
      const diff = leftWeight - rightWeight;
      const acceleration = diff * 0.1;
      setLeftY(y => {
        const newY = y + acceleration;
        if (newY <= 10 || newY >= 70) {
          setIsAnimating(false);
          return Math.max(10, Math.min(70, newY));
        }
        return newY;
      });
    }
  }, isAnimating);

  const rightY = 100 - leftY;

  return (
    <div className="h-full bg-zinc-900 flex flex-col items-center justify-center p-4">
      <div className="relative w-64 h-44">
        {/* Support beam */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-2 bg-zinc-600 rounded" />

        {/* Pulleys */}
        <div className="absolute top-0 left-8 w-6 h-6 bg-zinc-500 rounded-full border-4 border-zinc-400" />
        <div className="absolute top-0 right-8 w-6 h-6 bg-zinc-500 rounded-full border-4 border-zinc-400" />

        {/* Ropes */}
        <div className="absolute top-3 left-11 w-0.5 bg-amber-600" style={{ height: leftY }} />
        <div className="absolute top-3 right-11 w-0.5 bg-amber-600" style={{ height: rightY }} />

        {/* Left weight */}
        <div
          className="absolute left-6 w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded flex items-center justify-center cursor-pointer shadow-lg"
          style={{ top: leftY + 3 }}
          onClick={() => setLeftWeight(w => (w % 5) + 1)}
        >
          <span className="text-white font-bold text-xs">{leftWeight}kg</span>
        </div>

        {/* Right weight */}
        <div
          className="absolute right-6 w-10 h-10 bg-gradient-to-br from-red-400 to-red-600 rounded flex items-center justify-center cursor-pointer shadow-lg"
          style={{ top: rightY + 3 }}
          onClick={() => setRightWeight(w => (w % 5) + 1)}
        >
          <span className="text-white font-bold text-xs">{rightWeight}kg</span>
        </div>
      </div>

      <div className="mt-4 flex gap-4 items-center">
        <button
          onClick={() => setIsAnimating(true)}
          className="px-3 py-1 bg-green-600 text-white rounded text-xs font-mono"
        >
          RELEASE
        </button>
        <p className="text-zinc-400 font-mono text-xs">CLICK WEIGHTS TO CHANGE</p>
      </div>
    </div>
  );
};

// --- GYROSCOPE DISPLAY ---
export const GyroscopeDisplay = () => {
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  const [rotationZ, setRotationZ] = useState(0);
  const [spinning, setSpinning] = useState(false);

  useGameLoop(() => {
    if (spinning) {
      setRotationZ(r => (r + 5) % 360);
    }
  }, spinning);

  return (
    <div className="h-full bg-zinc-800 flex flex-col items-center justify-center p-4">
      <div
        className="w-32 h-32 relative"
        style={{
          perspective: '300px',
          transformStyle: 'preserve-3d',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Outer ring */}
          <div
            className="absolute inset-0 border-4 border-zinc-400 rounded-full"
            style={{
              transform: `rotateZ(${rotationZ}deg)`,
            }}
          />

          {/* Middle ring */}
          <div
            className="absolute inset-4 border-4 border-blue-400 rounded-full"
            style={{
              transform: `rotateX(90deg) rotateZ(${rotationZ * 0.8}deg)`,
            }}
          />

          {/* Inner ring */}
          <div
            className="absolute inset-8 border-4 border-green-400 rounded-full"
            style={{
              transform: `rotateY(90deg) rotateZ(${rotationZ * 0.6}deg)`,
            }}
          />

          {/* Center sphere */}
          <div className="absolute inset-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg" />
        </div>
      </div>

      <div className="mt-4 space-y-2 w-full max-w-xs">
        <div className="flex items-center gap-2">
          <span className="text-zinc-400 font-mono text-xs w-8">X</span>
          <input
            type="range"
            min="-45"
            max="45"
            value={rotationX}
            onChange={e => setRotationX(parseInt(e.target.value))}
            className="flex-1"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-zinc-400 font-mono text-xs w-8">Y</span>
          <input
            type="range"
            min="-45"
            max="45"
            value={rotationY}
            onChange={e => setRotationY(parseInt(e.target.value))}
            className="flex-1"
          />
        </div>
        <button
          onClick={() => setSpinning(!spinning)}
          className={`w-full px-3 py-1 rounded text-xs font-mono ${
            spinning ? 'bg-red-600' : 'bg-green-600'
          } text-white`}
        >
          {spinning ? 'STOP' : 'SPIN'}
        </button>
      </div>
    </div>
  );
};

// --- FLUID DYNAMICS ---
export const FluidDynamics = () => {
  const [particles, setParticles] = useState<Array<{ x: number; y: number; vx: number; vy: number }>>([]);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const initial = Array.from({ length: 30 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      vx: (Math.random() - 0.5) * 0.5,
      vy: Math.random() * 0.2,
    }));
    setParticles(initial);
  }, []);

  useGameLoop(() => {
    setParticles(ps =>
      ps.map(p => {
        let { x, y, vx, vy } = p;

        // Gravity
        vy += 0.02;

        // Viscosity
        vx *= 0.98;
        vy *= 0.98;

        // Update position
        x += vx;
        y += vy;

        // Boundaries
        if (x < 0) { x = 0; vx = -vx * 0.5; }
        if (x > 100) { x = 100; vx = -vx * 0.5; }
        if (y < 0) { y = 0; vy = -vy * 0.5; }
        if (y > 95) { y = 95; vy = -vy * 0.3; }

        return { x, y, vx, vy };
      })
    );
  }, true);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = ((e.clientX - rect.left) / rect.width) * 100;
    const mouseY = ((e.clientY - rect.top) / rect.height) * 100;

    setParticles(ps =>
      ps.map(p => {
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 20) {
          return {
            ...p,
            vx: p.vx + (dx / dist) * 0.5,
            vy: p.vy + (dy / dist) * 0.5,
          };
        }
        return p;
      })
    );
  };

  const shake = () => {
    setParticles(ps =>
      ps.map(p => ({
        ...p,
        vx: p.vx + (Math.random() - 0.5) * 3,
        vy: p.vy + (Math.random() - 0.5) * 3,
      }))
    );
  };

  return (
    <div className="h-full bg-zinc-800 flex flex-col items-center justify-center p-4">
      <div
        className="w-48 h-36 bg-zinc-900 rounded-lg border-4 border-zinc-600 relative overflow-hidden cursor-pointer"
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
      >
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-80"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </div>
      <div className="mt-4 flex gap-4 items-center">
        <button onClick={shake} className="px-3 py-1 bg-blue-600 text-white rounded text-xs font-mono">
          SHAKE
        </button>
        <p className="text-zinc-400 font-mono text-xs">DRAG TO STIR</p>
      </div>
    </div>
  );
};

// --- ELASTIC BAND ---
export const ElasticBand = () => {
  const [points, setPoints] = useState([
    { x: 20, y: 50 },
    { x: 50, y: 50 },
    { x: 80, y: 50 },
  ]);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [tension, setTension] = useState(0);

  const handleMouseDown = (index: number) => {
    if (index === 1) {
      setDraggingIndex(index);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (draggingIndex === null) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const y = Math.max(20, Math.min(80, ((e.clientY - rect.top) / rect.height) * 100));
    setPoints(ps => ps.map((p, i) => (i === 1 ? { ...p, y } : p)));
    setTension(Math.abs(y - 50));
  };

  const handleMouseUp = () => {
    if (draggingIndex !== null) {
      // Snap back animation
      setDraggingIndex(null);
      const snapBack = () => {
        setPoints(ps => {
          const midY = ps[1].y;
          if (Math.abs(midY - 50) < 1) {
            setTension(0);
            return ps.map((p, i) => (i === 1 ? { ...p, y: 50 } : p));
          }
          return ps.map((p, i) => (i === 1 ? { ...p, y: p.y + (50 - p.y) * 0.3 } : p));
        });
      };
      const interval = setInterval(snapBack, 16);
      setTimeout(() => clearInterval(interval), 500);
    }
  };

  const path = `M ${points[0].x} ${points[0].y} Q ${points[1].x} ${points[1].y} ${points[2].x} ${points[2].y}`;

  return (
    <div
      className="h-full bg-zinc-900 flex flex-col items-center justify-center p-4 select-none"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="w-full h-32 relative">
        <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
          {/* Elastic band */}
          <path
            d={path}
            fill="none"
            stroke={`hsl(${Math.max(0, 60 - tension * 2)}, 80%, 50%)`}
            strokeWidth={4 - tension * 0.05}
            strokeLinecap="round"
          />

          {/* Fixed anchors */}
          <circle cx={points[0].x} cy={points[0].y} r="4" fill="#71717a" />
          <circle cx={points[2].x} cy={points[2].y} r="4" fill="#71717a" />

          {/* Draggable point */}
          <circle
            cx={points[1].x}
            cy={points[1].y}
            r="6"
            fill="#fbbf24"
            className="cursor-grab"
            onMouseDown={() => handleMouseDown(1)}
          />
        </svg>
      </div>
      <p className="mt-4 text-zinc-400 font-mono text-xs">
        TENSION: {tension.toFixed(0)}% | DRAG CENTER TO STRETCH
      </p>
    </div>
  );
};

// --- DOMINO CHAIN ---
export const DominoChain = () => {
  const [fallen, setFallen] = useState<Set<number>>(new Set());
  const [isAnimating, setIsAnimating] = useState(false);
  const dominoCount = 8;

  const trigger = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setFallen(new Set());

    let i = 0;
    const fall = () => {
      if (i < dominoCount) {
        setFallen(prev => new Set([...prev, i]));
        i++;
        setTimeout(fall, 150);
      } else {
        setIsAnimating(false);
      }
    };
    fall();
  };

  const reset = () => {
    setFallen(new Set());
    setIsAnimating(false);
  };

  return (
    <div className="h-full bg-zinc-800 flex flex-col items-center justify-center p-4">
      <div className="relative w-full h-24 flex items-end justify-center gap-2">
        {Array.from({ length: dominoCount }, (_, i) => {
          const isFallen = fallen.has(i);
          return (
            <div
              key={i}
              className="w-4 h-16 bg-gradient-to-b from-zinc-200 to-zinc-400 rounded origin-bottom transition-transform duration-150 shadow-lg"
              style={{
                transform: isFallen ? `rotate(${70}deg) translateX(${i * 2}px)` : 'rotate(0deg)',
                zIndex: dominoCount - i,
              }}
            />
          );
        })}
      </div>

      <div className="mt-8 flex gap-4">
        <button
          onClick={trigger}
          disabled={isAnimating}
          className="px-4 py-2 bg-red-600 text-white rounded text-xs font-mono disabled:opacity-50"
        >
          PUSH
        </button>
        <button
          onClick={reset}
          disabled={isAnimating}
          className="px-4 py-2 bg-zinc-600 text-white rounded text-xs font-mono disabled:opacity-50"
        >
          RESET
        </button>
      </div>
    </div>
  );
};

// --- BALANCE SCALE ---
export const BalanceScale = () => {
  const [leftWeights, setLeftWeights] = useState<number[]>([1]);
  const [rightWeights, setRightWeights] = useState<number[]>([]);

  const leftTotal = leftWeights.reduce((a, b) => a + b, 0);
  const rightTotal = rightWeights.reduce((a, b) => a + b, 0);
  const diff = leftTotal - rightTotal;
  const tilt = Math.max(-15, Math.min(15, diff * 3));

  const addWeight = (side: 'left' | 'right', weight: number) => {
    if (side === 'left') {
      setLeftWeights(ws => [...ws, weight].slice(-4));
    } else {
      setRightWeights(ws => [...ws, weight].slice(-4));
    }
  };

  const removeWeight = (side: 'left' | 'right') => {
    if (side === 'left') {
      setLeftWeights(ws => ws.slice(0, -1));
    } else {
      setRightWeights(ws => ws.slice(0, -1));
    }
  };

  return (
    <div className="h-full bg-zinc-900 flex flex-col items-center justify-center p-4">
      <div className="relative w-64 h-40">
        {/* Fulcrum */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-12 border-l-transparent border-r-transparent border-b-amber-600" style={{ borderBottomWidth: 24 }} />

        {/* Beam */}
        <div
          className="absolute bottom-6 left-1/2 w-56 h-2 bg-amber-700 rounded transition-transform duration-300 origin-center"
          style={{ transform: `translateX(-50%) rotate(${tilt}deg)` }}
        >
          {/* Left pan */}
          <div
            className="absolute -left-2 top-2 w-20 h-4 bg-zinc-600 rounded-b-lg flex items-center justify-center gap-1"
            style={{ transform: `rotate(${-tilt}deg)` }}
          >
            {leftWeights.map((w, i) => (
              <div
                key={i}
                className="w-4 h-4 bg-gradient-to-br from-blue-400 to-blue-600 rounded text-white text-xs flex items-center justify-center font-bold"
              >
                {w}
              </div>
            ))}
          </div>

          {/* Right pan */}
          <div
            className="absolute -right-2 top-2 w-20 h-4 bg-zinc-600 rounded-b-lg flex items-center justify-center gap-1"
            style={{ transform: `rotate(${-tilt}deg)` }}
          >
            {rightWeights.map((w, i) => (
              <div
                key={i}
                className="w-4 h-4 bg-gradient-to-br from-red-400 to-red-600 rounded text-white text-xs flex items-center justify-center font-bold"
              >
                {w}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-4 flex gap-8">
        <div className="flex flex-col items-center gap-2">
          <span className="text-blue-400 font-mono text-xs">LEFT: {leftTotal}kg</span>
          <div className="flex gap-1">
            {[1, 2, 3].map(w => (
              <button
                key={w}
                onClick={() => addWeight('left', w)}
                className="w-6 h-6 bg-blue-600 text-white rounded text-xs font-bold"
              >
                +{w}
              </button>
            ))}
            <button onClick={() => removeWeight('left')} className="w-6 h-6 bg-zinc-600 text-white rounded text-xs">-</button>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <span className="text-red-400 font-mono text-xs">RIGHT: {rightTotal}kg</span>
          <div className="flex gap-1">
            {[1, 2, 3].map(w => (
              <button
                key={w}
                onClick={() => addWeight('right', w)}
                className="w-6 h-6 bg-red-600 text-white rounded text-xs font-bold"
              >
                +{w}
              </button>
            ))}
            <button onClick={() => removeWeight('right')} className="w-6 h-6 bg-zinc-600 text-white rounded text-xs">-</button>
          </div>
        </div>
      </div>

      <p className="mt-2 text-zinc-400 font-mono text-xs">
        {diff === 0 ? 'BALANCED!' : diff > 0 ? 'LEFT HEAVY' : 'RIGHT HEAVY'}
      </p>
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
  // New physics components
  'spring-oscillator': SpringOscillator,
  'collision-demo': CollisionDemo,
  'wave-simulator': WaveSimulator,
  'friction-slider': FrictionSlider,
  'pulley-system': PulleySystem,
  'gyroscope-display': GyroscopeDisplay,
  'fluid-dynamics': FluidDynamics,
  'elastic-band': ElasticBand,
  'domino-chain': DominoChain,
  'balance-scale': BalanceScale,
};
