import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react';

// ============================================================================
// SHARED UTILITIES & HOOKS
// ============================================================================

/**
 * Throttled mouse position hook with RAF optimization
 */
const useMousePosition = (containerRef: React.RefObject<HTMLElement | null>) => {
  const [position, setPosition] = useState({ x: 0, y: 0, isInside: false });
  const rafRef = useRef<number | null>(null);
  const lastPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updatePosition = (clientX: number, clientY: number, inside: boolean) => {
      if (rafRef.current) return;

      rafRef.current = requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        if (x !== lastPosition.current.x || y !== lastPosition.current.y) {
          lastPosition.current = { x, y };
          setPosition({ x, y, isInside: inside });
        }
        rafRef.current = null;
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      updatePosition(e.clientX, e.clientY, true);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      updatePosition(e.clientX, e.clientY, true);
    };

    const handleMouseLeave = () => {
      setPosition(prev => ({ ...prev, isInside: false }));
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [containerRef]);

  return position;
};

/**
 * Smooth interpolation hook for fluid cursor following
 */
const useSmoothPosition = (
  target: { x: number; y: number },
  smoothing: number = 0.15
) => {
  const [smooth, setSmooth] = useState(target);
  const animationRef = useRef<number | null>(null);
  const currentRef = useRef(target);

  useEffect(() => {
    const animate = () => {
      const dx = target.x - currentRef.current.x;
      const dy = target.y - currentRef.current.y;

      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        currentRef.current = {
          x: currentRef.current.x + dx * smoothing,
          y: currentRef.current.y + dy * smoothing,
        };
        setSmooth({ ...currentRef.current });
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [target.x, target.y, smoothing]);

  return smooth;
};

// ============================================================================
// 1. CURSOR SPOTLIGHT
// ============================================================================

const CursorSpotlight: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useMousePosition(containerRef);
  const smooth = useSmoothPosition(mouse, 0.2);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #0f0f1a 100%)',
      }}
    >
      {/* Spotlight gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: mouse.isInside
            ? `radial-gradient(600px circle at ${smooth.x}px ${smooth.y}px,
                rgba(255, 214, 0, 0.15) 0%,
                rgba(255, 140, 0, 0.08) 25%,
                rgba(255, 69, 0, 0.03) 50%,
                transparent 70%)`
            : 'transparent',
        }}
      />

      {/* Secondary glow ring */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: mouse.isInside
            ? `radial-gradient(300px circle at ${smooth.x}px ${smooth.y}px,
                rgba(255, 255, 255, 0.05) 0%,
                transparent 60%)`
            : 'transparent',
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        {children || (
          <div className="text-center space-y-4 p-8">
            <h2
              className="text-4xl font-light tracking-widest"
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                color: '#e8d5b7',
                textShadow: mouse.isInside
                  ? '0 0 40px rgba(255, 200, 100, 0.4)'
                  : 'none',
                transition: 'text-shadow 0.3s ease'
              }}
            >
              SPOTLIGHT
            </h2>
            <p
              className="text-sm tracking-[0.3em] uppercase"
              style={{ color: 'rgba(255, 255, 255, 0.4)' }}
            >
              Move your cursor to illuminate
            </p>
          </div>
        )}
      </div>

      {/* Ambient particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full animate-pulse"
            style={{
              left: `${10 + (i * 4.5) % 80}%`,
              top: `${15 + (i * 7.3) % 70}%`,
              background: 'rgba(255, 200, 150, 0.3)',
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${2 + (i % 3)}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// 2. CURSOR TRAIL
// ============================================================================

interface TrailParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  hue: number;
}

const CursorTrail: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useMousePosition(containerRef);
  const [particles, setParticles] = useState<TrailParticle[]>([]);
  const particleIdRef = useRef(0);
  const lastSpawnRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!mouse.isInside) return;

    const dx = mouse.x - lastSpawnRef.current.x;
    const dy = mouse.y - lastSpawnRef.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 8) {
      lastSpawnRef.current = { x: mouse.x, y: mouse.y };
      const newParticle: TrailParticle = {
        id: particleIdRef.current++,
        x: mouse.x,
        y: mouse.y,
        size: 8 + Math.random() * 12,
        opacity: 0.8,
        hue: (Date.now() / 20) % 360,
      };
      setParticles(prev => [...prev.slice(-30), newParticle]);
    }
  }, [mouse.x, mouse.y, mouse.isInside]);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev =>
        prev
          .map(p => ({ ...p, opacity: p.opacity - 0.03, size: p.size * 0.96 }))
          .filter(p => p.opacity > 0)
      );
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0d0d0d 0%, #1a0a1a 100%)',
      }}
    >
      {/* Trail particles */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <filter id="glow-trail">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {particles.map((p) => (
          <circle
            key={p.id}
            cx={p.x}
            cy={p.y}
            r={p.size / 2}
            fill={`hsla(${p.hue}, 80%, 60%, ${p.opacity})`}
            filter="url(#glow-trail)"
          />
        ))}
      </svg>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        {children || (
          <div className="text-center space-y-4 p-8">
            <h2
              className="text-4xl font-bold tracking-tight"
              style={{
                fontFamily: '"Space Grotesk", sans-serif',
                background: 'linear-gradient(90deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '300% 100%',
                animation: 'gradientShift 3s ease infinite',
              }}
            >
              PARTICLE TRAIL
            </h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
              Draw patterns with your cursor
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
};

// ============================================================================
// 3. CURSOR MAGNETIC
// ============================================================================

const CursorMagnetic: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useMousePosition(containerRef);
  const [elements, setElements] = useState<Array<{ id: number; x: number; y: number; targetX: number; targetY: number }>>([]);

  useEffect(() => {
    const grid = [];
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 6; j++) {
        grid.push({
          id: i * 6 + j,
          x: 50 + i * 45,
          y: 40 + j * 40,
          targetX: 50 + i * 45,
          targetY: 40 + j * 40,
        });
      }
    }
    setElements(grid);
  }, []);

  useEffect(() => {
    if (!mouse.isInside) {
      setElements(prev => prev.map(el => ({
        ...el,
        x: el.x + (el.targetX - el.x) * 0.1,
        y: el.y + (el.targetY - el.y) * 0.1,
      })));
      return;
    }

    const magnetRadius = 120;
    const magnetStrength = 25;

    setElements(prev => prev.map(el => {
      const dx = mouse.x - el.targetX;
      const dy = mouse.y - el.targetY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < magnetRadius) {
        const force = (1 - distance / magnetRadius) * magnetStrength;
        const angle = Math.atan2(dy, dx);
        return {
          ...el,
          x: el.x + (el.targetX + Math.cos(angle) * force - el.x) * 0.15,
          y: el.y + (el.targetY + Math.sin(angle) * force - el.y) * 0.15,
        };
      }
      return {
        ...el,
        x: el.x + (el.targetX - el.x) * 0.1,
        y: el.y + (el.targetY - el.y) * 0.1,
      };
    }));
  }, [mouse.x, mouse.y, mouse.isInside]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, #1a2a3a 0%, #0a1520 100%)',
      }}
    >
      {/* Magnetic dots */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <radialGradient id="dot-gradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00d4ff" />
            <stop offset="100%" stopColor="#0088ff" />
          </radialGradient>
        </defs>
        {elements.map((el) => (
          <circle
            key={el.id}
            cx={el.x}
            cy={el.y}
            r={4}
            fill="url(#dot-gradient)"
            style={{
              filter: 'drop-shadow(0 0 4px rgba(0, 180, 255, 0.6))',
              transition: 'r 0.2s ease',
            }}
          />
        ))}
      </svg>

      {/* Cursor indicator */}
      {mouse.isInside && (
        <div
          className="absolute w-24 h-24 rounded-full pointer-events-none"
          style={{
            left: mouse.x - 48,
            top: mouse.y - 48,
            border: '1px solid rgba(0, 200, 255, 0.3)',
            background: 'radial-gradient(circle, rgba(0, 200, 255, 0.1) 0%, transparent 70%)',
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        {children || (
          <div
            className="text-center p-8 rounded-xl"
            style={{
              background: 'rgba(0, 20, 40, 0.7)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(0, 180, 255, 0.2)',
            }}
          >
            <h2
              className="text-3xl font-medium tracking-wide"
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                color: '#00d4ff',
              }}
            >
              MAGNETIC FIELD
            </h2>
            <p className="mt-2 text-sm" style={{ color: 'rgba(150, 200, 255, 0.6)' }}>
              Particles are drawn to cursor
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// 4. CURSOR REPEL
// ============================================================================

const CursorRepel: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useMousePosition(containerRef);
  const [elements, setElements] = useState<Array<{ id: number; x: number; y: number; baseX: number; baseY: number }>>([]);

  useEffect(() => {
    const items = [];
    for (let i = 0; i < 60; i++) {
      const x = 30 + Math.random() * 340;
      const y = 30 + Math.random() * 200;
      items.push({ id: i, x, y, baseX: x, baseY: y });
    }
    setElements(items);
  }, []);

  useEffect(() => {
    const repelRadius = 100;
    const repelStrength = 60;

    setElements(prev => prev.map(el => {
      const dx = el.baseX - mouse.x;
      const dy = el.baseY - mouse.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (mouse.isInside && distance < repelRadius && distance > 0) {
        const force = ((repelRadius - distance) / repelRadius) * repelStrength;
        const angle = Math.atan2(dy, dx);
        const targetX = el.baseX + Math.cos(angle) * force;
        const targetY = el.baseY + Math.sin(angle) * force;
        return {
          ...el,
          x: el.x + (targetX - el.x) * 0.2,
          y: el.y + (targetY - el.y) * 0.2,
        };
      }
      return {
        ...el,
        x: el.x + (el.baseX - el.x) * 0.08,
        y: el.y + (el.baseY - el.y) * 0.08,
      };
    }));
  }, [mouse.x, mouse.y, mouse.isInside]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1a0a0a 0%, #2a1515 50%, #1a0505 100%)',
      }}
    >
      {/* Repelling elements */}
      {elements.map((el) => (
        <div
          key={el.id}
          className="absolute w-3 h-3 rounded-sm"
          style={{
            left: el.x,
            top: el.y,
            transform: 'translate(-50%, -50%)',
            background: `hsl(${350 + (el.id % 20)}, 70%, ${50 + (el.id % 20)}%)`,
            boxShadow: '0 0 8px rgba(255, 100, 100, 0.4)',
          }}
        />
      ))}

      {/* Repel zone indicator */}
      {mouse.isInside && (
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            left: mouse.x - 50,
            top: mouse.y - 50,
            width: 100,
            height: 100,
            border: '2px dashed rgba(255, 100, 100, 0.4)',
            animation: 'spin 4s linear infinite',
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        {children || (
          <div className="text-center p-6">
            <h2
              className="text-3xl font-black uppercase tracking-wider"
              style={{
                fontFamily: '"Bebas Neue", Impact, sans-serif',
                color: '#ff4444',
                textShadow: '0 0 20px rgba(255, 68, 68, 0.5)',
                letterSpacing: '0.15em',
              }}
            >
              FORCE FIELD
            </h2>
            <p className="mt-3 text-xs tracking-widest uppercase" style={{ color: 'rgba(255, 150, 150, 0.6)' }}>
              Elements flee from cursor
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

// ============================================================================
// 5. CURSOR GLOW
// ============================================================================

const CursorGlow: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useMousePosition(containerRef);
  const smooth = useSmoothPosition(mouse, 0.12);
  const [pulsePhase, setPulsePhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulsePhase(p => (p + 0.1) % (Math.PI * 2));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const pulseScale = 1 + Math.sin(pulsePhase) * 0.15;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden cursor-none"
      style={{
        background: 'linear-gradient(180deg, #050510 0%, #0a0a20 100%)',
      }}
    >
      {/* Outer glow rings */}
      {mouse.isInside && (
        <>
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              left: smooth.x - 80 * pulseScale,
              top: smooth.y - 80 * pulseScale,
              width: 160 * pulseScale,
              height: 160 * pulseScale,
              background: 'radial-gradient(circle, rgba(138, 43, 226, 0.2) 0%, transparent 70%)',
              transition: 'opacity 0.3s ease',
            }}
          />
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              left: smooth.x - 50 * pulseScale,
              top: smooth.y - 50 * pulseScale,
              width: 100 * pulseScale,
              height: 100 * pulseScale,
              background: 'radial-gradient(circle, rgba(0, 255, 200, 0.3) 0%, transparent 60%)',
            }}
          />
          {/* Core orb */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              left: smooth.x - 15,
              top: smooth.y - 15,
              width: 30,
              height: 30,
              background: 'radial-gradient(circle at 35% 35%, #fff 0%, #00ffc8 30%, #8a2be2 80%)',
              boxShadow: `
                0 0 20px rgba(0, 255, 200, 0.8),
                0 0 40px rgba(138, 43, 226, 0.6),
                0 0 60px rgba(0, 255, 200, 0.4)
              `,
            }}
          />
        </>
      )}

      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(100, 100, 200, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(100, 100, 200, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        {children || (
          <div className="text-center space-y-3">
            <h2
              className="text-4xl font-extralight tracking-[0.4em]"
              style={{
                fontFamily: '"Syncopate", sans-serif',
                color: '#d0d0ff',
              }}
            >
              GLOW
            </h2>
            <p className="text-xs" style={{ color: 'rgba(180, 180, 255, 0.5)' }}>
              Ethereal orb follows cursor
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// 6. CURSOR RIPPLE
// ============================================================================

interface Ripple {
  id: number;
  x: number;
  y: number;
  startTime: number;
}

const CursorRipple: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const rippleIdRef = useRef(0);

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple: Ripple = {
      id: rippleIdRef.current++,
      x,
      y,
      startTime: Date.now(),
    };

    setRipples(prev => [...prev, newRipple]);

    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 1500);
  }, []);

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      className="relative w-full h-full overflow-hidden cursor-pointer"
      style={{
        background: 'linear-gradient(135deg, #001a2c 0%, #003344 50%, #001a2c 100%)',
      }}
    >
      {/* Ripple animations */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="ripple-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00ffff" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#0088ff" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#00ffff" stopOpacity="0" />
          </linearGradient>
        </defs>
        {ripples.map((ripple) => {
          const elapsed = Date.now() - ripple.startTime;
          const progress = Math.min(elapsed / 1500, 1);
          const radius = progress * 200;
          const opacity = 1 - progress;

          return (
            <g key={ripple.id}>
              <circle
                cx={ripple.x}
                cy={ripple.y}
                r={radius}
                fill="none"
                stroke="url(#ripple-gradient)"
                strokeWidth={3 * (1 - progress * 0.7)}
                opacity={opacity}
              />
              <circle
                cx={ripple.x}
                cy={ripple.y}
                r={radius * 0.6}
                fill="none"
                stroke="#00ccff"
                strokeWidth={2 * (1 - progress * 0.5)}
                opacity={opacity * 0.6}
              />
              <circle
                cx={ripple.x}
                cy={ripple.y}
                r={radius * 0.3}
                fill="none"
                stroke="#ffffff"
                strokeWidth={1}
                opacity={opacity * 0.4}
              />
            </g>
          );
        })}
      </svg>

      {/* Water texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 30% 20%, rgba(0, 100, 150, 0.2) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, rgba(0, 80, 120, 0.15) 0%, transparent 40%)
          `,
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        {children || (
          <div className="text-center space-y-4">
            <h2
              className="text-3xl font-light"
              style={{
                fontFamily: '"Raleway", sans-serif',
                color: '#7fdbff',
                letterSpacing: '0.2em',
              }}
            >
              RIPPLE
            </h2>
            <p className="text-sm" style={{ color: 'rgba(127, 219, 255, 0.5)' }}>
              Click anywhere to create ripples
            </p>
          </div>
        )}
      </div>

      {/* Ambient motion */}
      <style>{`
        @keyframes rippleExpand {
          from { transform: scale(0); opacity: 1; }
          to { transform: scale(1); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

// ============================================================================
// 7. CURSOR TILT CARD (3D Effect)
// ============================================================================

const CursorTiltCard: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const mouse = useMousePosition(containerRef);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  useEffect(() => {
    if (!cardRef.current || !mouse.isInside) {
      setTilt({ rotateX: 0, rotateY: 0 });
      setGlare(prev => ({ ...prev, opacity: 0 }));
      return;
    }

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();

    if (!containerRect) return;

    const cardCenterX = rect.left - containerRect.left + rect.width / 2;
    const cardCenterY = rect.top - containerRect.top + rect.height / 2;

    const relX = (mouse.x - cardCenterX) / (rect.width / 2);
    const relY = (mouse.y - cardCenterY) / (rect.height / 2);

    const maxTilt = 20;
    setTilt({
      rotateX: -relY * maxTilt,
      rotateY: relX * maxTilt,
    });

    setGlare({
      x: ((mouse.x - (rect.left - containerRect.left)) / rect.width) * 100,
      y: ((mouse.y - (rect.top - containerRect.top)) / rect.height) * 100,
      opacity: 0.4,
    });
  }, [mouse.x, mouse.y, mouse.isInside]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden flex items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        perspective: '1000px',
      }}
    >
      {/* 3D Tilt Card */}
      <div
        ref={cardRef}
        className="relative w-72 h-44 rounded-2xl overflow-hidden"
        style={{
          transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          transformStyle: 'preserve-3d',
          transition: mouse.isInside ? 'none' : 'transform 0.5s ease-out',
          background: 'linear-gradient(135deg, #2a2a4a 0%, #3a3a6a 100%)',
          boxShadow: `
            0 20px 40px rgba(0, 0, 0, 0.4),
            0 0 60px rgba(100, 100, 200, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.1)
          `,
        }}
      >
        {/* Glare effect */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}) 0%, transparent 60%)`,
            transition: mouse.isInside ? 'none' : 'opacity 0.5s ease-out',
          }}
        />

        {/* Card content */}
        <div className="relative z-10 h-full p-6 flex flex-col justify-between">
          {children || (
            <>
              <div>
                <div className="w-12 h-8 rounded bg-gradient-to-br from-yellow-400 to-yellow-600 mb-4" />
                <p
                  className="text-lg tracking-[0.3em] font-light"
                  style={{ color: 'rgba(255, 255, 255, 0.8)' }}
                >
                  3D TILT
                </p>
              </div>
              <div className="flex justify-between items-end">
                <span
                  className="text-xs tracking-wider"
                  style={{ color: 'rgba(200, 200, 255, 0.6)' }}
                >
                  MOVE CURSOR OVER CARD
                </span>
                <div className="flex gap-1">
                  <div className="w-6 h-6 rounded-full bg-red-500 opacity-80" />
                  <div className="w-6 h-6 rounded-full bg-yellow-500 opacity-80 -ml-3" />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Edge highlights */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        />
      </div>

      {/* Shadow that moves with tilt */}
      <div
        className="absolute w-72 h-44 rounded-2xl"
        style={{
          transform: `translateX(${tilt.rotateY * 0.5}px) translateY(${40 - tilt.rotateX * 0.5}px) scale(0.95)`,
          background: 'rgba(0, 0, 0, 0.4)',
          filter: 'blur(20px)',
          transition: mouse.isInside ? 'none' : 'transform 0.5s ease-out',
          zIndex: -1,
        }}
      />
    </div>
  );
};

// ============================================================================
// 8. CURSOR HOVER SCALE
// ============================================================================

const CursorHoverScale: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const items = useMemo(() => [
    { id: 1, color: '#ff6b6b', label: 'Fire' },
    { id: 2, color: '#4ecdc4', label: 'Water' },
    { id: 3, color: '#45b7d1', label: 'Air' },
    { id: 4, color: '#96ceb4', label: 'Earth' },
    { id: 5, color: '#ffeaa7', label: 'Light' },
    { id: 6, color: '#a29bfe', label: 'Spirit' },
  ], []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden flex items-center justify-center"
      style={{
        background: 'radial-gradient(ellipse at center, #1a1a2e 0%, #0f0f1a 100%)',
      }}
    >
      {/* Scalable items grid */}
      <div className="grid grid-cols-3 gap-4 p-8">
        {items.map((item) => (
          <div
            key={item.id}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
            className="relative w-20 h-20 rounded-xl cursor-pointer flex items-center justify-center"
            style={{
              background: item.color,
              transform: hoveredItem === item.id ? 'scale(1.25)' : 'scale(1)',
              transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
              boxShadow: hoveredItem === item.id
                ? `0 15px 40px ${item.color}66, 0 0 60px ${item.color}33`
                : `0 5px 15px ${item.color}33`,
              zIndex: hoveredItem === item.id ? 10 : 1,
            }}
          >
            <span
              className="text-xs font-bold uppercase tracking-wider"
              style={{
                color: 'rgba(0, 0, 0, 0.6)',
                textShadow: '0 1px 0 rgba(255, 255, 255, 0.3)',
              }}
            >
              {item.label}
            </span>

            {/* Hover ring */}
            <div
              className="absolute inset-0 rounded-xl pointer-events-none"
              style={{
                border: hoveredItem === item.id ? '2px solid rgba(255, 255, 255, 0.5)' : 'none',
                transform: hoveredItem === item.id ? 'scale(1.1)' : 'scale(1)',
                opacity: hoveredItem === item.id ? 1 : 0,
                transition: 'all 0.3s ease',
              }}
            />
          </div>
        ))}
      </div>

      {/* Title */}
      <div className="absolute bottom-6 text-center">
        {children || (
          <p className="text-sm tracking-widest uppercase" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
            Hover to scale elements
          </p>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// 9. CURSOR HOVER GLOW
// ============================================================================

const CursorHoverGlow: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const buttons = useMemo(() => [
    { label: 'EXPLORE', gradient: 'linear-gradient(135deg, #667eea, #764ba2)' },
    { label: 'CREATE', gradient: 'linear-gradient(135deg, #f093fb, #f5576c)' },
    { label: 'DISCOVER', gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
  ], []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden flex flex-col items-center justify-center gap-6"
      style={{
        background: '#0a0a0f',
      }}
    >
      {buttons.map((btn, index) => (
        <div
          key={index}
          className="relative"
          onMouseEnter={() => setActiveIndex(index)}
          onMouseLeave={() => setActiveIndex(null)}
        >
          {/* Glow background */}
          <div
            className="absolute inset-0 rounded-full blur-xl"
            style={{
              background: btn.gradient,
              opacity: activeIndex === index ? 0.6 : 0,
              transform: activeIndex === index ? 'scale(1.5)' : 'scale(1)',
              transition: 'all 0.4s ease',
            }}
          />

          {/* Button */}
          <button
            className="relative px-12 py-4 rounded-full font-medium tracking-widest text-sm"
            style={{
              background: activeIndex === index ? btn.gradient : 'transparent',
              border: `2px solid ${activeIndex === index ? 'transparent' : 'rgba(255, 255, 255, 0.2)'}`,
              color: activeIndex === index ? '#fff' : 'rgba(255, 255, 255, 0.6)',
              transition: 'all 0.3s ease',
              boxShadow: activeIndex === index
                ? '0 10px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                : 'none',
            }}
          >
            {btn.label}
          </button>
        </div>
      ))}

      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 rounded-full"
            style={{
              left: `${5 + (i * 3.1) % 90}%`,
              top: `${10 + (i * 5.7) % 80}%`,
              background: 'rgba(255, 255, 255, 0.2)',
            }}
          />
        ))}
      </div>

      {children}
    </div>
  );
};

// ============================================================================
// 10. CURSOR CUSTOM POINTER
// ============================================================================

const CursorCustomPointer: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useMousePosition(containerRef);
  const smooth = useSmoothPosition(mouse, 0.25);
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      ref={containerRef}
      onMouseDown={() => setIsClicking(true)}
      onMouseUp={() => setIsClicking(false)}
      className="relative w-full h-full overflow-hidden cursor-none"
      style={{
        background: 'linear-gradient(180deg, #fef6e4 0%, #f8f0e3 100%)',
      }}
    >
      {/* Custom cursor - outer ring */}
      {mouse.isInside && (
        <>
          <div
            className="absolute pointer-events-none"
            style={{
              left: smooth.x,
              top: smooth.y,
              width: isHovering ? 60 : 40,
              height: isHovering ? 60 : 40,
              transform: 'translate(-50%, -50%)',
              border: `2px solid ${isClicking ? '#ff6b6b' : '#1a1a2e'}`,
              borderRadius: '50%',
              transition: 'width 0.2s, height 0.2s, border-color 0.1s',
              opacity: 0.5,
            }}
          />
          {/* Inner dot */}
          <div
            className="absolute pointer-events-none"
            style={{
              left: mouse.x,
              top: mouse.y,
              width: isClicking ? 12 : 8,
              height: isClicking ? 12 : 8,
              transform: 'translate(-50%, -50%)',
              background: isClicking ? '#ff6b6b' : '#1a1a2e',
              borderRadius: '50%',
              transition: 'width 0.1s, height 0.1s, background 0.1s',
            }}
          />
        </>
      )}

      {/* Interactive content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center gap-8 p-8">
        {children || (
          <>
            <h2
              className="text-4xl font-serif"
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                color: '#1a1a2e',
              }}
            >
              Custom Cursor
            </h2>

            <div className="flex gap-6">
              <button
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="px-8 py-3 rounded-full transition-all duration-300"
                style={{
                  background: isHovering ? '#1a1a2e' : 'transparent',
                  border: '2px solid #1a1a2e',
                  color: isHovering ? '#fef6e4' : '#1a1a2e',
                }}
              >
                Hover Me
              </button>
              <button
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="px-8 py-3 rounded-full transition-all duration-300"
                style={{
                  background: '#1a1a2e',
                  color: '#fef6e4',
                }}
              >
                Click Me
              </button>
            </div>

            <p className="text-sm" style={{ color: 'rgba(26, 26, 46, 0.5)' }}>
              Cursor transforms on interaction
            </p>
          </>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// 11. CURSOR DISTORT
// ============================================================================

const CursorDistort: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useMousePosition(containerRef);
  const smooth = useSmoothPosition(mouse, 0.1);
  const [distortAmount, setDistortAmount] = useState(0);

  useEffect(() => {
    if (mouse.isInside) {
      setDistortAmount(1);
    } else {
      setDistortAmount(0);
    }
  }, [mouse.isInside]);

  // Calculate distortion for grid lines
  const getDistortion = useCallback((x: number, y: number) => {
    const dx = x - smooth.x;
    const dy = y - smooth.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxDistance = 120;

    if (distance < maxDistance) {
      const strength = (1 - distance / maxDistance) * 30 * distortAmount;
      return {
        x: (dx / distance) * strength || 0,
        y: (dy / distance) * strength || 0,
      };
    }
    return { x: 0, y: 0 };
  }, [smooth.x, smooth.y, distortAmount]);

  const gridLines = useMemo(() => {
    const lines = [];
    const spacing = 30;

    // Vertical lines
    for (let x = 0; x <= 400; x += spacing) {
      const points = [];
      for (let y = 0; y <= 280; y += 10) {
        const dist = getDistortion(x, y);
        points.push(`${x + dist.x},${y + dist.y}`);
      }
      lines.push({ type: 'vertical', points: points.join(' '), key: `v${x}` });
    }

    // Horizontal lines
    for (let y = 0; y <= 280; y += spacing) {
      const points = [];
      for (let x = 0; x <= 400; x += 10) {
        const dist = getDistortion(x, y);
        points.push(`${x + dist.x},${y + dist.y}`);
      }
      lines.push({ type: 'horizontal', points: points.join(' '), key: `h${y}` });
    }

    return lines;
  }, [getDistortion]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 100%)',
      }}
    >
      {/* Distorted grid */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 280" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="grid-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00ff88" />
            <stop offset="100%" stopColor="#00aaff" />
          </linearGradient>
        </defs>
        {gridLines.map((line) => (
          <polyline
            key={line.key}
            points={line.points}
            fill="none"
            stroke="url(#grid-gradient)"
            strokeWidth="1"
            opacity="0.4"
          />
        ))}
      </svg>

      {/* Cursor highlight */}
      {mouse.isInside && (
        <div
          className="absolute w-32 h-32 rounded-full pointer-events-none"
          style={{
            left: smooth.x - 64,
            top: smooth.y - 64,
            background: 'radial-gradient(circle, rgba(0, 255, 136, 0.15) 0%, transparent 70%)',
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        {children || (
          <div
            className="text-center p-8 rounded-lg"
            style={{
              background: 'rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(0, 255, 136, 0.2)',
            }}
          >
            <h2
              className="text-3xl font-mono tracking-wider"
              style={{ color: '#00ff88' }}
            >
              SPACE WARP
            </h2>
            <p className="mt-2 text-xs tracking-widest" style={{ color: 'rgba(0, 200, 255, 0.6)' }}>
              CURSOR BENDS REALITY
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// 12. CURSOR BLUR REVEAL
// ============================================================================

const CursorBlurReveal: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useMousePosition(containerRef);
  const smooth = useSmoothPosition(mouse, 0.15);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden cursor-crosshair"
    >
      {/* Hidden content (sharp) */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #2d1b4e 0%, #1a0a2e 50%, #0d0620 100%)',
        }}
      >
        <div className="text-center space-y-4 p-8">
          <h2
            className="text-5xl font-black uppercase"
            style={{
              fontFamily: '"Archivo Black", Impact, sans-serif',
              background: 'linear-gradient(135deg, #ff6b6b, #feca57, #ff6b6b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundSize: '200% 200%',
              animation: 'shimmer 3s ease infinite',
            }}
          >
            SECRET
          </h2>
          <p
            className="text-xl tracking-widest uppercase"
            style={{ color: 'rgba(255, 200, 150, 0.8)' }}
          >
            Hidden Message Revealed
          </p>
          <div className="flex justify-center gap-3 pt-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full"
                style={{
                  background: `hsl(${i * 30 + 340}, 80%, 60%)`,
                  animation: `bounce 1s ease infinite`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Blurred overlay with mask */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
        style={{
          background: 'linear-gradient(135deg, #2d1b4e 0%, #1a0a2e 50%, #0d0620 100%)',
          filter: 'blur(20px) saturate(0.3)',
          WebkitMaskImage: mouse.isInside
            ? `radial-gradient(circle 80px at ${smooth.x}px ${smooth.y}px, transparent 0%, transparent 40%, black 60%)`
            : 'none',
          maskImage: mouse.isInside
            ? `radial-gradient(circle 80px at ${smooth.x}px ${smooth.y}px, transparent 0%, transparent 40%, black 60%)`
            : 'none',
        }}
      >
        <div className="text-center space-y-4 p-8">
          <h2
            className="text-5xl font-black uppercase"
            style={{
              fontFamily: '"Archivo Black", Impact, sans-serif',
              background: 'linear-gradient(135deg, #ff6b6b, #feca57, #ff6b6b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            SECRET
          </h2>
          <p
            className="text-xl tracking-widest uppercase"
            style={{ color: 'rgba(255, 200, 150, 0.8)' }}
          >
            Hidden Message Revealed
          </p>
        </div>
      </div>

      {/* Reveal circle indicator */}
      {mouse.isInside && (
        <div
          className="absolute pointer-events-none"
          style={{
            left: smooth.x - 80,
            top: smooth.y - 80,
            width: 160,
            height: 160,
            border: '1px solid rgba(255, 200, 150, 0.3)',
            borderRadius: '50%',
          }}
        />
      )}

      {/* Instructions */}
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <p className="text-xs tracking-widest uppercase" style={{ color: 'rgba(255, 255, 255, 0.3)' }}>
          Move cursor to reveal hidden content
        </p>
      </div>

      {children}

      <style>{`
        @keyframes shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
};

// ============================================================================
// EXPORTS
// ============================================================================

export const cursorEffects: Record<string, React.FC<{ children?: React.ReactNode }>> = {
  'cursor-spotlight': CursorSpotlight,
  'cursor-trail': CursorTrail,
  'cursor-magnetic': CursorMagnetic,
  'cursor-repel': CursorRepel,
  'cursor-glow': CursorGlow,
  'cursor-ripple': CursorRipple,
  'cursor-tilt-card': CursorTiltCard,
  'cursor-hover-scale': CursorHoverScale,
  'cursor-hover-glow': CursorHoverGlow,
  'cursor-custom-pointer': CursorCustomPointer,
  'cursor-distort': CursorDistort,
  'cursor-blur-reveal': CursorBlurReveal,
};

// Also export individual components for direct imports
export {
  CursorSpotlight,
  CursorTrail,
  CursorMagnetic,
  CursorRepel,
  CursorGlow,
  CursorRipple,
  CursorTiltCard,
  CursorHoverScale,
  CursorHoverGlow,
  CursorCustomPointer,
  CursorDistort,
  CursorBlurReveal,
};
