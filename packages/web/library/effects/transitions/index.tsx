import React, { useState, useEffect, useRef } from 'react';

// ============================================================================
// TRANSITION EFFECTS MODULE
// 12 smooth, accessible, reusable transition and loading components
// ============================================================================

// Shared interface for all transition/loading components
interface TransitionProps {
  show?: boolean;
  children?: React.ReactNode;
}

// CSS keyframes for animations (injected once)
const injectStyles = (() => {
  let injected = false;
  return () => {
    if (injected || typeof document === 'undefined') return;
    injected = true;

    const style = document.createElement('style');
    style.textContent = `
      @keyframes transition-dissolve-pixels {
        0% { clip-path: inset(0 0 0 0); }
        100% { clip-path: inset(100% 0 0 0); }
      }

      @keyframes loading-shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }

      @keyframes loading-pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(0.85); opacity: 0.5; }
      }

      @keyframes loading-dot-bounce {
        0%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-10px); }
      }

      @keyframes loading-spinner-rotate {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }

      @keyframes loading-progress-indeterminate {
        0% { transform: translateX(-100%); }
        50% { transform: translateX(0%); }
        100% { transform: translateX(100%); }
      }

      @keyframes loading-progress-width {
        0% { width: 20%; }
        50% { width: 60%; }
        100% { width: 20%; }
      }
    `;
    document.head.appendChild(style);
  };
})();

// Hook to check for reduced motion preference
const useReducedMotion = (): boolean => {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return reducedMotion;
};

// ============================================================================
// 1. TRANSITION FADE - Simple fade in/out transition
// ============================================================================
export const TransitionFade: React.FC<TransitionProps> = ({ show = true, children }) => {
  const reducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(show);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setMounted(true);
      // Small delay to trigger CSS transition
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
    } else {
      setVisible(false);
      const timer = setTimeout(() => setMounted(false), reducedMotion ? 0 : 300);
      return () => clearTimeout(timer);
    }
  }, [show, reducedMotion]);

  if (!mounted) return null;

  return (
    <div
      role="presentation"
      aria-hidden={!visible}
      style={{
        opacity: visible ? 1 : 0,
        transition: reducedMotion ? 'none' : 'opacity 300ms ease-in-out',
        willChange: 'opacity',
      }}
    >
      {children}
    </div>
  );
};

// ============================================================================
// 2. TRANSITION SLIDE COVER - New content slides over old
// ============================================================================
export const TransitionSlideCover: React.FC<TransitionProps> = ({ show = true, children }) => {
  const reducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(show);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (show) {
      setMounted(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setEntered(true));
      });
    } else {
      setEntered(false);
      const timer = setTimeout(() => setMounted(false), reducedMotion ? 0 : 400);
      return () => clearTimeout(timer);
    }
  }, [show, reducedMotion]);

  if (!mounted) return null;

  return (
    <div
      role="presentation"
      aria-hidden={!entered}
      style={{
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          transform: entered ? 'translateY(0)' : 'translateY(100%)',
          transition: reducedMotion ? 'none' : 'transform 400ms cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </div>
  );
};

// ============================================================================
// 3. TRANSITION FLIP CARD - 3D card flip transition
// ============================================================================
export const TransitionFlipCard: React.FC<TransitionProps> = ({ show = true, children }) => {
  const reducedMotion = useReducedMotion();
  const [flipped, setFlipped] = useState(!show);

  useEffect(() => {
    setFlipped(!show);
  }, [show]);

  return (
    <div
      role="presentation"
      aria-hidden={!show}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
      <div
        style={{
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transition: reducedMotion ? 'none' : 'transform 600ms cubic-bezier(0.4, 0, 0.2, 1)',
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          backfaceVisibility: 'hidden',
        }}
      >
        {children}
      </div>
    </div>
  );
};

// ============================================================================
// 4. TRANSITION MORPH - Shape morphing transition
// ============================================================================
export const TransitionMorph: React.FC<TransitionProps> = ({ show = true, children }) => {
  const reducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(show);
  const [morphed, setMorphed] = useState(false);

  useEffect(() => {
    if (show) {
      setMounted(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setMorphed(true));
      });
    } else {
      setMorphed(false);
      const timer = setTimeout(() => setMounted(false), reducedMotion ? 0 : 500);
      return () => clearTimeout(timer);
    }
  }, [show, reducedMotion]);

  if (!mounted) return null;

  // Morph from circle to rectangle
  const enterClipPath = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
  const exitClipPath = 'polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)';

  return (
    <div
      role="presentation"
      aria-hidden={!morphed}
      style={{
        clipPath: morphed ? enterClipPath : exitClipPath,
        transform: morphed ? 'scale(1)' : 'scale(0.8)',
        opacity: morphed ? 1 : 0,
        transition: reducedMotion
          ? 'none'
          : 'clip-path 500ms cubic-bezier(0.4, 0, 0.2, 1), transform 500ms cubic-bezier(0.4, 0, 0.2, 1), opacity 300ms ease',
        willChange: 'clip-path, transform, opacity',
      }}
    >
      {children}
    </div>
  );
};

// ============================================================================
// 5. TRANSITION DISSOLVE - Pixelated dissolve effect
// ============================================================================
export const TransitionDissolve: React.FC<TransitionProps> = ({ show = true, children }) => {
  const reducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(show);
  const [dissolved, setDissolved] = useState(!show);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    injectStyles();
  }, []);

  useEffect(() => {
    if (show) {
      setMounted(true);
      setDissolved(false);
    } else {
      setDissolved(true);
      const timer = setTimeout(() => setMounted(false), reducedMotion ? 0 : 600);
      return () => clearTimeout(timer);
    }
  }, [show, reducedMotion]);

  if (!mounted) return null;

  // For reduced motion, use simple fade
  if (reducedMotion) {
    return (
      <div
        role="presentation"
        aria-hidden={dissolved}
        style={{ opacity: dissolved ? 0 : 1 }}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      role="presentation"
      aria-hidden={dissolved}
      style={{
        position: 'relative',
      }}
    >
      <div
        style={{
          filter: dissolved ? 'blur(4px) saturate(0.5)' : 'blur(0px) saturate(1)',
          opacity: dissolved ? 0 : 1,
          transform: dissolved ? 'scale(1.05)' : 'scale(1)',
          transition: 'filter 600ms ease, opacity 600ms ease, transform 600ms ease',
          willChange: 'filter, opacity, transform',
        }}
      >
        {children}
      </div>
      {/* Pixel overlay effect */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: dissolved
            ? 'repeating-linear-gradient(0deg, transparent 0px, transparent 4px, rgba(0,0,0,0.1) 4px, rgba(0,0,0,0.1) 8px)'
            : 'none',
          pointerEvents: 'none',
          opacity: dissolved ? 1 : 0,
          transition: 'opacity 300ms ease',
        }}
      />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

// ============================================================================
// 6. TRANSITION WIPE - Directional wipe transition
// ============================================================================
export const TransitionWipe: React.FC<TransitionProps & { direction?: 'left' | 'right' | 'up' | 'down' }> = ({
  show = true,
  children,
  direction = 'right'
}) => {
  const reducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(show);
  const [wiped, setWiped] = useState(!show);

  useEffect(() => {
    if (show) {
      setMounted(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setWiped(false));
      });
    } else {
      setWiped(true);
      const timer = setTimeout(() => setMounted(false), reducedMotion ? 0 : 500);
      return () => clearTimeout(timer);
    }
  }, [show, reducedMotion]);

  if (!mounted) return null;

  const getClipPath = (hidden: boolean) => {
    if (!hidden) return 'inset(0 0 0 0)';
    switch (direction) {
      case 'left': return 'inset(0 100% 0 0)';
      case 'right': return 'inset(0 0 0 100%)';
      case 'up': return 'inset(100% 0 0 0)';
      case 'down': return 'inset(0 0 100% 0)';
      default: return 'inset(0 0 0 100%)';
    }
  };

  return (
    <div
      role="presentation"
      aria-hidden={wiped}
      style={{
        clipPath: getClipPath(wiped),
        transition: reducedMotion ? 'none' : 'clip-path 500ms cubic-bezier(0.4, 0, 0.2, 1)',
        willChange: 'clip-path',
      }}
    >
      {children}
    </div>
  );
};

// ============================================================================
// 7. LOADING SKELETON - Skeleton loading placeholder
// ============================================================================
export const LoadingSkeleton: React.FC<TransitionProps & {
  lines?: number;
  avatar?: boolean;
}> = ({ show = true, lines = 3, avatar = false }) => {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    injectStyles();
  }, []);

  if (!show) return null;

  return (
    <div
      role="status"
      aria-label="Loading content"
      aria-busy="true"
      style={{ padding: '16px' }}
    >
      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
        {avatar && (
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'linear-gradient(90deg, #e5e5e5 25%, #f0f0f0 50%, #e5e5e5 75%)',
              backgroundSize: '200% 100%',
              animation: reducedMotion ? 'none' : 'loading-shimmer 1.5s infinite',
              flexShrink: 0,
            }}
          />
        )}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {Array.from({ length: lines }).map((_, i) => (
            <div
              key={i}
              style={{
                height: '16px',
                borderRadius: '4px',
                background: 'linear-gradient(90deg, #e5e5e5 25%, #f0f0f0 50%, #e5e5e5 75%)',
                backgroundSize: '200% 100%',
                animation: reducedMotion ? 'none' : 'loading-shimmer 1.5s infinite',
                animationDelay: `${i * 100}ms`,
                width: i === lines - 1 ? '60%' : '100%',
              }}
            />
          ))}
        </div>
      </div>
      <span className="sr-only" style={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: 0,
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        border: 0
      }}>
        Loading...
      </span>
    </div>
  );
};

// ============================================================================
// 8. LOADING SHIMMER - Shimmer effect on placeholder
// ============================================================================
export const LoadingShimmer: React.FC<TransitionProps & {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
}> = ({ show = true, width = '100%', height = '100px', borderRadius = '8px' }) => {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    injectStyles();
  }, []);

  if (!show) return null;

  return (
    <div
      role="status"
      aria-label="Loading"
      aria-busy="true"
      style={{
        width,
        height,
        borderRadius,
        background: '#e5e5e5',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
          animation: reducedMotion ? 'none' : 'loading-shimmer 1.5s infinite',
          willChange: 'transform',
        }}
      />
      <span style={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: 0,
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        border: 0
      }}>
        Loading...
      </span>
    </div>
  );
};

// ============================================================================
// 9. LOADING PULSE - Pulsing loading indicator
// ============================================================================
export const LoadingPulse: React.FC<TransitionProps & {
  size?: number;
  color?: string;
}> = ({ show = true, size = 48, color = '#3b82f6' }) => {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    injectStyles();
  }, []);

  if (!show) return null;

  return (
    <div
      role="status"
      aria-label="Loading"
      aria-busy="true"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          background: color,
          animation: reducedMotion ? 'none' : 'loading-pulse 1.2s ease-in-out infinite',
          willChange: 'transform, opacity',
        }}
      />
      <span style={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: 0,
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        border: 0
      }}>
        Loading...
      </span>
    </div>
  );
};

// ============================================================================
// 10. LOADING DOTS - Bouncing dots loader
// ============================================================================
export const LoadingDots: React.FC<TransitionProps & {
  dotSize?: number;
  color?: string;
  gap?: number;
}> = ({ show = true, dotSize = 12, color = '#3b82f6', gap = 8 }) => {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    injectStyles();
  }, []);

  if (!show) return null;

  return (
    <div
      role="status"
      aria-label="Loading"
      aria-busy="true"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap,
        padding: '16px',
      }}
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: dotSize,
            height: dotSize,
            borderRadius: '50%',
            background: color,
            animation: reducedMotion ? 'none' : 'loading-dot-bounce 1.4s ease-in-out infinite',
            animationDelay: `${i * 0.16}s`,
            willChange: 'transform',
          }}
        />
      ))}
      <span style={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: 0,
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        border: 0
      }}>
        Loading...
      </span>
    </div>
  );
};

// ============================================================================
// 11. LOADING SPINNER CUSTOM - Custom styled spinner
// ============================================================================
export const LoadingSpinnerCustom: React.FC<TransitionProps & {
  size?: number;
  thickness?: number;
  color?: string;
  trackColor?: string;
  speed?: number;
}> = ({
  show = true,
  size = 48,
  thickness = 4,
  color = '#3b82f6',
  trackColor = '#e5e5e5',
  speed = 1
}) => {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    injectStyles();
  }, []);

  if (!show) return null;

  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * 0.75;

  return (
    <div
      role="status"
      aria-label="Loading"
      aria-busy="true"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{
          animation: reducedMotion ? 'none' : `loading-spinner-rotate ${1 / speed}s linear infinite`,
          willChange: 'transform',
        }}
      >
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={thickness}
        />
        {/* Spinner arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{
            transformOrigin: 'center',
          }}
        />
      </svg>
      <span style={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: 0,
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        border: 0
      }}>
        Loading...
      </span>
    </div>
  );
};

// ============================================================================
// 12. LOADING PROGRESS BAR - Indeterminate progress bar
// ============================================================================
export const LoadingProgressBar: React.FC<TransitionProps & {
  height?: number;
  color?: string;
  trackColor?: string;
}> = ({ show = true, height = 4, color = '#3b82f6', trackColor = '#e5e5e5' }) => {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    injectStyles();
  }, []);

  if (!show) return null;

  return (
    <div
      role="progressbar"
      aria-label="Loading"
      aria-busy="true"
      aria-valuemin={0}
      aria-valuemax={100}
      style={{
        width: '100%',
        height,
        background: trackColor,
        borderRadius: height / 2,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '40%',
          background: color,
          borderRadius: height / 2,
          animation: reducedMotion
            ? 'none'
            : 'loading-progress-indeterminate 1.5s ease-in-out infinite, loading-progress-width 1.5s ease-in-out infinite',
          willChange: 'transform, width',
        }}
      />
      <span style={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: 0,
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        border: 0
      }}>
        Loading...
      </span>
    </div>
  );
};

// ============================================================================
// DEMO COMPONENTS - Interactive showcases for each effect
// ============================================================================

// Demo wrapper for transitions
const TransitionDemo: React.FC<{
  title: string;
  children: (show: boolean) => React.ReactNode;
}> = ({ title, children }) => {
  const [show, setShow] = useState(true);

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: '#18181b',
      padding: '16px',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px',
      }}>
        <span style={{
          color: '#a1a1aa',
          fontFamily: 'monospace',
          fontSize: '12px',
          textTransform: 'uppercase',
        }}>
          {title}
        </span>
        <button
          onClick={() => setShow(!show)}
          style={{
            padding: '6px 12px',
            background: show ? '#ef4444' : '#22c55e',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontFamily: 'monospace',
            fontSize: '11px',
            fontWeight: 'bold',
          }}
        >
          {show ? 'HIDE' : 'SHOW'}
        </button>
      </div>
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#27272a',
        borderRadius: '8px',
        overflow: 'hidden',
      }}>
        {children(show)}
      </div>
    </div>
  );
};

// Sample content for demos
const SampleCard: React.FC = () => (
  <div style={{
    width: '200px',
    padding: '20px',
    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    borderRadius: '12px',
    color: 'white',
    textAlign: 'center',
  }}>
    <div style={{
      width: '48px',
      height: '48px',
      background: 'rgba(255,255,255,0.2)',
      borderRadius: '50%',
      margin: '0 auto 12px',
    }} />
    <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Content Card</div>
    <div style={{ fontSize: '12px', opacity: 0.8 }}>Animated transition demo</div>
  </div>
);

// Individual demo components
export const TransitionFadeDemo: React.FC = () => (
  <TransitionDemo title="Fade Transition">
    {(show) => (
      <TransitionFade show={show}>
        <SampleCard />
      </TransitionFade>
    )}
  </TransitionDemo>
);

export const TransitionSlideCoverDemo: React.FC = () => (
  <TransitionDemo title="Slide Cover Transition">
    {(show) => (
      <TransitionSlideCover show={show}>
        <SampleCard />
      </TransitionSlideCover>
    )}
  </TransitionDemo>
);

export const TransitionFlipCardDemo: React.FC = () => (
  <TransitionDemo title="3D Flip Card Transition">
    {(show) => (
      <TransitionFlipCard show={show}>
        <SampleCard />
      </TransitionFlipCard>
    )}
  </TransitionDemo>
);

export const TransitionMorphDemo: React.FC = () => (
  <TransitionDemo title="Morph Transition">
    {(show) => (
      <TransitionMorph show={show}>
        <SampleCard />
      </TransitionMorph>
    )}
  </TransitionDemo>
);

export const TransitionDissolveDemo: React.FC = () => (
  <TransitionDemo title="Dissolve Transition">
    {(show) => (
      <TransitionDissolve show={show}>
        <SampleCard />
      </TransitionDissolve>
    )}
  </TransitionDemo>
);

export const TransitionWipeDemo: React.FC = () => {
  const [direction, setDirection] = useState<'left' | 'right' | 'up' | 'down'>('right');
  const [show, setShow] = useState(true);

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: '#18181b',
      padding: '16px',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px',
        gap: '8px',
      }}>
        <span style={{
          color: '#a1a1aa',
          fontFamily: 'monospace',
          fontSize: '12px',
          textTransform: 'uppercase',
        }}>
          Wipe Transition
        </span>
        <div style={{ display: 'flex', gap: '4px' }}>
          {(['left', 'right', 'up', 'down'] as const).map((dir) => (
            <button
              key={dir}
              onClick={() => setDirection(dir)}
              style={{
                padding: '4px 8px',
                background: direction === dir ? '#3b82f6' : '#3f3f46',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontFamily: 'monospace',
                fontSize: '10px',
              }}
            >
              {dir.toUpperCase()}
            </button>
          ))}
        </div>
        <button
          onClick={() => setShow(!show)}
          style={{
            padding: '6px 12px',
            background: show ? '#ef4444' : '#22c55e',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontFamily: 'monospace',
            fontSize: '11px',
            fontWeight: 'bold',
          }}
        >
          {show ? 'HIDE' : 'SHOW'}
        </button>
      </div>
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#27272a',
        borderRadius: '8px',
        overflow: 'hidden',
      }}>
        <TransitionWipe show={show} direction={direction}>
          <SampleCard />
        </TransitionWipe>
      </div>
    </div>
  );
};

export const LoadingSkeletonDemo: React.FC = () => (
  <div style={{
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: '#18181b',
    padding: '16px',
  }}>
    <span style={{
      color: '#a1a1aa',
      fontFamily: 'monospace',
      fontSize: '12px',
      textTransform: 'uppercase',
      marginBottom: '16px',
    }}>
      Skeleton Loading
    </span>
    <div style={{
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#ffffff',
      borderRadius: '8px',
      overflow: 'hidden',
    }}>
      <LoadingSkeleton show={true} lines={4} avatar={true} />
    </div>
  </div>
);

export const LoadingShimmerDemo: React.FC = () => (
  <div style={{
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: '#18181b',
    padding: '16px',
  }}>
    <span style={{
      color: '#a1a1aa',
      fontFamily: 'monospace',
      fontSize: '12px',
      textTransform: 'uppercase',
      marginBottom: '16px',
    }}>
      Shimmer Effect
    </span>
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      background: '#27272a',
      borderRadius: '8px',
      overflow: 'hidden',
      padding: '24px',
    }}>
      <LoadingShimmer show={true} width="200px" height="120px" borderRadius="12px" />
      <LoadingShimmer show={true} width="200px" height="16px" borderRadius="4px" />
      <LoadingShimmer show={true} width="160px" height="16px" borderRadius="4px" />
    </div>
  </div>
);

export const LoadingPulseDemo: React.FC = () => (
  <div style={{
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: '#18181b',
    padding: '16px',
  }}>
    <span style={{
      color: '#a1a1aa',
      fontFamily: 'monospace',
      fontSize: '12px',
      textTransform: 'uppercase',
      marginBottom: '16px',
    }}>
      Pulse Loading
    </span>
    <div style={{
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#27272a',
      borderRadius: '8px',
      overflow: 'hidden',
    }}>
      <LoadingPulse show={true} size={64} color="#8b5cf6" />
    </div>
  </div>
);

export const LoadingDotsDemo: React.FC = () => (
  <div style={{
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: '#18181b',
    padding: '16px',
  }}>
    <span style={{
      color: '#a1a1aa',
      fontFamily: 'monospace',
      fontSize: '12px',
      textTransform: 'uppercase',
      marginBottom: '16px',
    }}>
      Bouncing Dots
    </span>
    <div style={{
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#27272a',
      borderRadius: '8px',
      overflow: 'hidden',
    }}>
      <LoadingDots show={true} dotSize={16} color="#22c55e" gap={12} />
    </div>
  </div>
);

export const LoadingSpinnerCustomDemo: React.FC = () => (
  <div style={{
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: '#18181b',
    padding: '16px',
  }}>
    <span style={{
      color: '#a1a1aa',
      fontFamily: 'monospace',
      fontSize: '12px',
      textTransform: 'uppercase',
      marginBottom: '16px',
    }}>
      Custom Spinner
    </span>
    <div style={{
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '32px',
      background: '#27272a',
      borderRadius: '8px',
      overflow: 'hidden',
    }}>
      <LoadingSpinnerCustom show={true} size={32} thickness={3} color="#ef4444" speed={0.8} />
      <LoadingSpinnerCustom show={true} size={48} thickness={4} color="#3b82f6" speed={1} />
      <LoadingSpinnerCustom show={true} size={64} thickness={6} color="#22c55e" speed={1.5} />
    </div>
  </div>
);

export const LoadingProgressBarDemo: React.FC = () => (
  <div style={{
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: '#18181b',
    padding: '16px',
  }}>
    <span style={{
      color: '#a1a1aa',
      fontFamily: 'monospace',
      fontSize: '12px',
      textTransform: 'uppercase',
      marginBottom: '16px',
    }}>
      Progress Bar
    </span>
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '24px',
      background: '#27272a',
      borderRadius: '8px',
      overflow: 'hidden',
      padding: '24px',
    }}>
      <div style={{ width: '200px' }}>
        <LoadingProgressBar show={true} height={4} color="#3b82f6" />
      </div>
      <div style={{ width: '200px' }}>
        <LoadingProgressBar show={true} height={8} color="#22c55e" trackColor="#1f2937" />
      </div>
      <div style={{ width: '200px' }}>
        <LoadingProgressBar show={true} height={12} color="#f59e0b" trackColor="#27272a" />
      </div>
    </div>
  </div>
);

// ============================================================================
// EXPORTS
// ============================================================================

// Export all transition effects as a record
export const transitionEffects: Record<string, React.FC<TransitionProps>> = {
  'transition-fade': TransitionFade,
  'transition-slide-cover': TransitionSlideCover,
  'transition-flip-card': TransitionFlipCard,
  'transition-morph': TransitionMorph,
  'transition-dissolve': TransitionDissolve,
  'transition-wipe': TransitionWipe,
  'loading-skeleton': LoadingSkeleton,
  'loading-shimmer': LoadingShimmer,
  'loading-pulse': LoadingPulse,
  'loading-dots': LoadingDots,
  'loading-spinner-custom': LoadingSpinnerCustom,
  'loading-progress-bar': LoadingProgressBar,
};

// Export demo components for the UI Museum showcase
export const transitionDemoComponents: Record<string, React.FC> = {
  'transition-fade': TransitionFadeDemo,
  'transition-slide-cover': TransitionSlideCoverDemo,
  'transition-flip-card': TransitionFlipCardDemo,
  'transition-morph': TransitionMorphDemo,
  'transition-dissolve': TransitionDissolveDemo,
  'transition-wipe': TransitionWipeDemo,
  'loading-skeleton': LoadingSkeletonDemo,
  'loading-shimmer': LoadingShimmerDemo,
  'loading-pulse': LoadingPulseDemo,
  'loading-dots': LoadingDotsDemo,
  'loading-spinner-custom': LoadingSpinnerCustomDemo,
  'loading-progress-bar': LoadingProgressBarDemo,
};

// Default export for convenience
export default transitionEffects;
