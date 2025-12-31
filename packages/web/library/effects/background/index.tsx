import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

// ============================================================================
// BACKGROUND EFFECTS MODULE
// A collection of subtle, performant background effects for UI backgrounds
// ============================================================================

// --- HELPER HOOKS ---

const useAnimationFrame = (callback: (deltaTime: number) => void, active: boolean = true) => {
  const requestRef = useRef<number | undefined>(undefined);
  const previousTimeRef = useRef<number | undefined>(undefined);
  const callbackRef = useRef<(deltaTime: number) => void>(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!active) return;

    const animate = (time: number) => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = time - previousTimeRef.current;
        callbackRef.current(deltaTime);
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [active]);
};

// ============================================================================
// 1. BG-PARTICLES - Floating particle system
// ============================================================================

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  hue: number;
}

export const BgParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateDimensions = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    // Initialize particles
    const particles: Particle[] = [];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3 - 0.1,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.4 + 0.1,
        hue: Math.random() * 60 + 200, // Blue to purple range
      });
    }
    particlesRef.current = particles;

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useAnimationFrame(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesRef.current.forEach((particle) => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Wrap around edges
      if (particle.x < 0) particle.x = canvas.width;
      if (particle.x > canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = canvas.height;
      if (particle.y > canvas.height) particle.y = 0;

      // Subtle opacity pulsing
      particle.opacity = 0.15 + Math.sin(Date.now() * 0.001 + particle.x) * 0.1;

      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${particle.hue}, 70%, 70%, ${particle.opacity})`;
      ctx.fill();
    });

    // Draw subtle connection lines between nearby particles
    particlesRef.current.forEach((p1, i) => {
      particlesRef.current.slice(i + 1).forEach((p2) => {
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 80) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `hsla(220, 60%, 60%, ${0.05 * (1 - distance / 80)})`;
          ctx.stroke();
        }
      });
    });
  });

  return (
    <div className="absolute inset-0 overflow-hidden bg-slate-900">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ willChange: 'transform' }}
      />
    </div>
  );
};

// ============================================================================
// 2. BG-GRADIENT-ANIMATE - Smoothly animating gradient
// ============================================================================

export const BgGradientAnimate: React.FC = () => {
  const [hue, setHue] = useState(0);

  useAnimationFrame((dt) => {
    setHue((h) => (h + dt * 0.01) % 360);
  });

  return (
    <div
      className="absolute inset-0"
      style={{
        background: `linear-gradient(
          ${45 + hue * 0.5}deg,
          hsl(${hue}, 60%, 15%) 0%,
          hsl(${(hue + 60) % 360}, 50%, 20%) 33%,
          hsl(${(hue + 120) % 360}, 55%, 18%) 66%,
          hsl(${(hue + 180) % 360}, 45%, 12%) 100%
        )`,
        transition: 'background 0.1s ease-out',
      }}
    />
  );
};

// ============================================================================
// 3. BG-NOISE-TEXTURE - Animated noise/grain texture overlay
// ============================================================================

export const BgNoiseTexture: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useAnimationFrame(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const noise = Math.random() * 25;
      data[i] = noise;     // R
      data[i + 1] = noise; // G
      data[i + 2] = noise; // B
      data[i + 3] = 20;    // A - very subtle
    }

    ctx.putImageData(imageData, 0, 0);
  });

  return (
    <div className="absolute inset-0 overflow-hidden bg-zinc-900">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full mix-blend-overlay pointer-events-none"
        style={{ willChange: 'contents' }}
      />
      {/* Subtle gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 100%)',
        }}
      />
    </div>
  );
};

// ============================================================================
// 4. BG-GRID-PATTERN - Animated grid pattern (like graph paper)
// ============================================================================

export const BgGridPattern: React.FC = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [pulse, setPulse] = useState(0);

  useAnimationFrame((dt) => {
    setOffset((o) => ({
      x: (o.x + dt * 0.005) % 40,
      y: (o.y + dt * 0.003) % 40,
    }));
    setPulse((p) => p + dt * 0.002);
  });

  const gridOpacity = 0.15 + Math.sin(pulse) * 0.05;

  return (
    <div className="absolute inset-0 overflow-hidden bg-slate-950">
      {/* Main grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, ${gridOpacity}) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, ${gridOpacity}) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          backgroundPosition: `${offset.x}px ${offset.y}px`,
        }}
      />
      {/* Smaller sub-grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, ${gridOpacity * 0.4}) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, ${gridOpacity * 0.4}) 1px, transparent 1px)
          `,
          backgroundSize: '10px 10px',
          backgroundPosition: `${offset.x}px ${offset.y}px`,
        }}
      />
      {/* Glow points at intersections */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at center, rgba(59, 130, 246, 0.3) 0%, transparent 2px)`,
          backgroundSize: '40px 40px',
          backgroundPosition: `${offset.x}px ${offset.y}px`,
        }}
      />
    </div>
  );
};

// ============================================================================
// 5. BG-WAVES - Animated wave pattern (like water)
// ============================================================================

export const BgWaves: React.FC = () => {
  const [time, setTime] = useState(0);

  useAnimationFrame((dt) => {
    setTime((t) => t + dt * 0.001);
  });

  const waves = useMemo(() => {
    return [
      { amplitude: 20, frequency: 0.02, speed: 1, opacity: 0.3, color: '59, 130, 246' },
      { amplitude: 15, frequency: 0.03, speed: 0.8, opacity: 0.25, color: '99, 102, 241' },
      { amplitude: 25, frequency: 0.015, speed: 1.2, opacity: 0.2, color: '139, 92, 246' },
      { amplitude: 10, frequency: 0.04, speed: 0.6, opacity: 0.15, color: '34, 211, 238' },
    ];
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-slate-900">
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <defs>
          {waves.map((_, i) => (
            <linearGradient key={i} id={`waveGrad${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={`rgba(${waves[i].color}, ${waves[i].opacity})`} />
              <stop offset="100%" stopColor={`rgba(${waves[i].color}, 0)`} />
            </linearGradient>
          ))}
        </defs>
        {waves.map((wave, i) => {
          const points: string[] = [];
          for (let x = 0; x <= 100; x += 2) {
            const y =
              50 +
              wave.amplitude *
                Math.sin(x * wave.frequency * Math.PI * 2 + time * wave.speed) +
              wave.amplitude *
                0.5 *
                Math.sin(x * wave.frequency * 1.5 * Math.PI * 2 + time * wave.speed * 1.3);
            points.push(`${x},${y + i * 8}`);
          }
          return (
            <path
              key={i}
              d={`M0,100 L0,${points[0].split(',')[1]} ${points.map((p) => `L${p}`).join(' ')} L100,100 Z`}
              fill={`url(#waveGrad${i})`}
              style={{ transform: 'scaleX(1.02)' }}
            />
          );
        })}
      </svg>
    </div>
  );
};

// ============================================================================
// 6. BG-STARFIELD - Moving starfield effect
// ============================================================================

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
}

export const BgStarfield: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    // Initialize stars
    const stars: Star[] = [];
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: (Math.random() - 0.5) * 2000,
        y: (Math.random() - 0.5) * 2000,
        z: Math.random() * 1000,
        size: Math.random() * 2 + 0.5,
      });
    }
    starsRef.current = stars;

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useAnimationFrame((dt) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    starsRef.current.forEach((star) => {
      // Move star towards viewer
      star.z -= dt * 0.1;

      // Reset star if it passes the viewer
      if (star.z <= 0) {
        star.z = 1000;
        star.x = (Math.random() - 0.5) * 2000;
        star.y = (Math.random() - 0.5) * 2000;
      }

      // Project 3D position to 2D
      const scale = 500 / star.z;
      const screenX = centerX + star.x * scale;
      const screenY = centerY + star.y * scale;

      // Only draw if on screen
      if (screenX >= 0 && screenX <= canvas.width && screenY >= 0 && screenY <= canvas.height) {
        const size = star.size * scale;
        const opacity = Math.min(1, (1000 - star.z) / 500);

        // Draw star with trail
        const trailLength = Math.min(size * 3, 10);
        const gradient = ctx.createLinearGradient(
          screenX,
          screenY,
          screenX - (star.x * scale * trailLength) / 100,
          screenY - (star.y * scale * trailLength) / 100
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.beginPath();
        ctx.arc(screenX, screenY, Math.max(0.5, size), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
      }
    });
  });

  return (
    <div className="absolute inset-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ willChange: 'transform' }}
      />
    </div>
  );
};

// ============================================================================
// 7. BG-MATRIX-RAIN - Falling code/matrix effect
// ============================================================================

interface MatrixColumn {
  x: number;
  chars: string[];
  y: number;
  speed: number;
  opacity: number;
}

export const BgMatrixRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const columnsRef = useRef<MatrixColumn[]>([]);

  const chars = useMemo(
    () => 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*(){}[]|;:,.<>?'.split(''),
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      // Initialize columns
      const columns: MatrixColumn[] = [];
      const columnWidth = 20;
      const numColumns = Math.ceil(canvas.width / columnWidth);

      for (let i = 0; i < numColumns; i++) {
        const charCount = Math.floor(Math.random() * 15) + 5;
        columns.push({
          x: i * columnWidth,
          chars: Array.from({ length: charCount }, () => chars[Math.floor(Math.random() * chars.length)]),
          y: Math.random() * canvas.height - canvas.height,
          speed: Math.random() * 0.1 + 0.05,
          opacity: Math.random() * 0.5 + 0.3,
        });
      }
      columnsRef.current = columns;
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [chars]);

  useAnimationFrame((dt) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    // Semi-transparent background for trail effect
    ctx.fillStyle = 'rgba(0, 10, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = '14px monospace';

    columnsRef.current.forEach((column) => {
      column.y += dt * column.speed;

      // Reset column when it goes off screen
      if (column.y > canvas.height + column.chars.length * 16) {
        column.y = -column.chars.length * 16;
        column.chars = column.chars.map(() => chars[Math.floor(Math.random() * chars.length)]);
      }

      // Randomly change characters
      if (Math.random() < 0.02) {
        const idx = Math.floor(Math.random() * column.chars.length);
        column.chars[idx] = chars[Math.floor(Math.random() * chars.length)];
      }

      column.chars.forEach((char, i) => {
        const charY = column.y + i * 16;
        if (charY >= 0 && charY <= canvas.height) {
          // Head of the stream is brighter
          const isHead = i === column.chars.length - 1;
          const fadeRatio = i / column.chars.length;

          if (isHead) {
            ctx.fillStyle = '#ffffff';
          } else {
            const green = Math.floor(150 + fadeRatio * 105);
            ctx.fillStyle = `rgba(0, ${green}, 0, ${column.opacity * fadeRatio})`;
          }

          ctx.fillText(char, column.x, charY);
        }
      });
    });
  });

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ willChange: 'contents' }}
      />
    </div>
  );
};

// ============================================================================
// 8. BG-BOKEH - Floating bokeh/blur circles
// ============================================================================

interface BokehCircle {
  x: number;
  y: number;
  size: number;
  hue: number;
  opacity: number;
  vx: number;
  vy: number;
  pulseOffset: number;
}

export const BgBokeh: React.FC = () => {
  const [circles, setCircles] = useState<BokehCircle[]>([]);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const newCircles: BokehCircle[] = [];
    for (let i = 0; i < 15; i++) {
      newCircles.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 150 + 50,
        hue: Math.random() * 60 + 200, // Blue to purple
        opacity: Math.random() * 0.2 + 0.05,
        vx: (Math.random() - 0.5) * 0.01,
        vy: (Math.random() - 0.5) * 0.01,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }
    setCircles(newCircles);
  }, []);

  useAnimationFrame((dt) => {
    setTime((t) => t + dt * 0.001);
    setCircles((prev) =>
      prev.map((circle) => ({
        ...circle,
        x: ((circle.x + circle.vx * dt + 100) % 100),
        y: ((circle.y + circle.vy * dt + 100) % 100),
      }))
    );
  });

  return (
    <div className="absolute inset-0 overflow-hidden bg-slate-950">
      {circles.map((circle, i) => {
        const pulsingOpacity = circle.opacity + Math.sin(time + circle.pulseOffset) * 0.03;
        return (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${circle.x}%`,
              top: `${circle.y}%`,
              width: circle.size,
              height: circle.size,
              background: `radial-gradient(circle at 30% 30%,
                hsla(${circle.hue}, 70%, 60%, ${pulsingOpacity}),
                hsla(${circle.hue}, 60%, 40%, ${pulsingOpacity * 0.5}),
                transparent 70%)`,
              filter: 'blur(30px)',
              transform: 'translate(-50%, -50%)',
              willChange: 'left, top',
            }}
          />
        );
      })}
    </div>
  );
};

// ============================================================================
// 9. BG-AURORA - Aurora borealis flowing colors
// ============================================================================

export const BgAurora: React.FC = () => {
  const [time, setTime] = useState(0);

  useAnimationFrame((dt) => {
    setTime((t) => t + dt * 0.0005);
  });

  const auroraLayers = useMemo(
    () => [
      { hueBase: 120, opacity: 0.3, speed: 1, yOffset: 20 },
      { hueBase: 180, opacity: 0.25, speed: 1.3, yOffset: 30 },
      { hueBase: 280, opacity: 0.2, speed: 0.8, yOffset: 40 },
    ],
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden bg-slate-950">
      {/* Dark sky gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #0a0a1a 0%, #1a1a3a 50%, #0a0a1a 100%)',
        }}
      />

      {/* Aurora layers */}
      {auroraLayers.map((layer, i) => {
        const hue = layer.hueBase + Math.sin(time * layer.speed) * 30;
        return (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg,
                transparent 0%,
                transparent ${20 + layer.yOffset}%,
                hsla(${hue}, 70%, 50%, ${layer.opacity}) ${40 + layer.yOffset}%,
                hsla(${(hue + 40) % 360}, 60%, 40%, ${layer.opacity * 0.7}) ${55 + layer.yOffset}%,
                transparent ${70 + layer.yOffset}%,
                transparent 100%
              )`,
              filter: 'blur(40px)',
              transform: `translateY(${Math.sin(time * layer.speed + i) * 20}px) scaleY(${1 + Math.sin(time * 0.5 + i) * 0.1})`,
              opacity: 0.8 + Math.sin(time * 0.3 + i * 2) * 0.2,
            }}
          />
        );
      })}

      {/* Subtle stars */}
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 40}%`,
            opacity: 0.3 + Math.sin(time * 2 + i) * 0.2,
          }}
        />
      ))}
    </div>
  );
};

// ============================================================================
// 10. BG-MESH-GRADIENT - Animated mesh gradient blobs
// ============================================================================

interface MeshBlob {
  x: number;
  y: number;
  size: number;
  hue: number;
  vx: number;
  vy: number;
}

export const BgMeshGradient: React.FC = () => {
  const [blobs, setBlobs] = useState<MeshBlob[]>([]);

  useEffect(() => {
    const initialBlobs: MeshBlob[] = [
      { x: 20, y: 30, size: 400, hue: 280, vx: 0.003, vy: 0.002 },
      { x: 70, y: 60, size: 500, hue: 200, vx: -0.002, vy: 0.003 },
      { x: 40, y: 80, size: 350, hue: 340, vx: 0.002, vy: -0.002 },
      { x: 80, y: 20, size: 450, hue: 160, vx: -0.003, vy: 0.001 },
    ];
    setBlobs(initialBlobs);
  }, []);

  useAnimationFrame((dt) => {
    setBlobs((prev) =>
      prev.map((blob) => {
        let newX = blob.x + blob.vx * dt;
        let newY = blob.y + blob.vy * dt;
        let newVx = blob.vx;
        let newVy = blob.vy;

        // Bounce off edges with some padding
        if (newX < 10 || newX > 90) newVx = -newVx;
        if (newY < 10 || newY > 90) newVy = -newVy;

        return {
          ...blob,
          x: Math.max(10, Math.min(90, newX)),
          y: Math.max(10, Math.min(90, newY)),
          vx: newVx,
          vy: newVy,
          hue: (blob.hue + dt * 0.005) % 360,
        };
      })
    );
  });

  return (
    <div className="absolute inset-0 overflow-hidden bg-slate-950">
      <div className="absolute inset-0" style={{ filter: 'blur(80px) saturate(150%)' }}>
        {blobs.map((blob, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${blob.x}%`,
              top: `${blob.y}%`,
              width: blob.size,
              height: blob.size,
              background: `radial-gradient(circle,
                hsla(${blob.hue}, 80%, 60%, 0.4) 0%,
                hsla(${(blob.hue + 60) % 360}, 70%, 50%, 0.2) 50%,
                transparent 70%)`,
              transform: 'translate(-50%, -50%)',
              willChange: 'left, top',
            }}
          />
        ))}
      </div>
      {/* Subtle noise overlay for texture */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay',
        }}
      />
    </div>
  );
};

// ============================================================================
// 11. BG-GEOMETRIC - Animated geometric shapes
// ============================================================================

interface GeometricShape {
  x: number;
  y: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  sides: number;
  hue: number;
  opacity: number;
}

export const BgGeometric: React.FC = () => {
  const [shapes, setShapes] = useState<GeometricShape[]>([]);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const initialShapes: GeometricShape[] = [];
    for (let i = 0; i < 12; i++) {
      initialShapes.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 80 + 40,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        sides: Math.floor(Math.random() * 4) + 3, // 3-6 sides
        hue: Math.random() * 60 + 180, // Cyan to purple
        opacity: Math.random() * 0.15 + 0.05,
      });
    }
    setShapes(initialShapes);
  }, []);

  useAnimationFrame((dt) => {
    setTime((t) => t + dt * 0.001);
    setShapes((prev) =>
      prev.map((shape) => ({
        ...shape,
        rotation: shape.rotation + shape.rotationSpeed * dt,
        y: shape.y + Math.sin(time + shape.x * 0.1) * 0.005 * dt,
        x: shape.x + Math.cos(time + shape.y * 0.1) * 0.003 * dt,
      }))
    );
  });

  const createPolygonPath = useCallback((sides: number, size: number) => {
    const points: string[] = [];
    for (let i = 0; i < sides; i++) {
      const angle = (i / sides) * Math.PI * 2 - Math.PI / 2;
      const x = Math.cos(angle) * size;
      const y = Math.sin(angle) * size;
      points.push(`${x},${y}`);
    }
    return points.join(' ');
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-slate-950">
      <svg className="absolute inset-0 w-full h-full">
        {shapes.map((shape, i) => (
          <g
            key={i}
            transform={`translate(${(shape.x / 100) * window.innerWidth}, ${(shape.y / 100) * window.innerHeight})`}
          >
            <polygon
              points={createPolygonPath(shape.sides, shape.size)}
              fill="none"
              stroke={`hsla(${shape.hue}, 60%, 60%, ${shape.opacity})`}
              strokeWidth="1.5"
              transform={`rotate(${shape.rotation})`}
            />
            <polygon
              points={createPolygonPath(shape.sides, shape.size * 0.7)}
              fill={`hsla(${shape.hue}, 50%, 50%, ${shape.opacity * 0.3})`}
              stroke="none"
              transform={`rotate(${-shape.rotation * 0.5})`}
            />
          </g>
        ))}
      </svg>
    </div>
  );
};

// ============================================================================
// 12. BG-SMOKE - Drifting smoke/fog effect
// ============================================================================

interface SmokeParticle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

export const BgSmoke: React.FC = () => {
  const [particles, setParticles] = useState<SmokeParticle[]>([]);

  useEffect(() => {
    // Initialize with some particles
    const initial: SmokeParticle[] = [];
    for (let i = 0; i < 20; i++) {
      initial.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 200 + 100,
        opacity: Math.random() * 0.1 + 0.02,
        vx: (Math.random() - 0.5) * 0.01,
        vy: -Math.random() * 0.01 - 0.005,
        life: Math.random() * 1000,
        maxLife: 1000 + Math.random() * 500,
      });
    }
    setParticles(initial);
  }, []);

  useAnimationFrame((dt) => {
    setParticles((prev) => {
      const updated = prev.map((p) => {
        const newLife = p.life + dt * 0.5;
        const lifeRatio = newLife / p.maxLife;

        return {
          ...p,
          x: p.x + p.vx * dt + Math.sin(newLife * 0.01) * 0.02,
          y: p.y + p.vy * dt,
          size: p.size + dt * 0.02,
          opacity: p.opacity * (1 - lifeRatio * 0.3),
          life: newLife,
        };
      });

      // Remove dead particles and add new ones
      const alive = updated.filter((p) => p.life < p.maxLife && p.y > -20);

      while (alive.length < 20) {
        alive.push({
          x: Math.random() * 100,
          y: 100 + Math.random() * 20,
          size: Math.random() * 150 + 80,
          opacity: Math.random() * 0.08 + 0.02,
          vx: (Math.random() - 0.5) * 0.01,
          vy: -Math.random() * 0.015 - 0.005,
          life: 0,
          maxLife: 800 + Math.random() * 400,
        });
      }

      return alive;
    });
  });

  return (
    <div className="absolute inset-0 overflow-hidden bg-zinc-900">
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)',
        }}
      />

      {/* Smoke particles */}
      {particles.map((particle, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: `radial-gradient(circle,
              rgba(200, 200, 220, ${particle.opacity}) 0%,
              rgba(150, 150, 180, ${particle.opacity * 0.5}) 40%,
              transparent 70%)`,
            filter: 'blur(40px)',
            transform: 'translate(-50%, -50%)',
            willChange: 'left, top, opacity',
          }}
        />
      ))}

      {/* Top fade for depth */}
      <div
        className="absolute inset-x-0 top-0 h-1/3"
        style={{
          background: 'linear-gradient(180deg, rgba(15, 15, 35, 0.8) 0%, transparent 100%)',
        }}
      />
    </div>
  );
};

// ============================================================================
// EXPORT ALL BACKGROUND EFFECTS
// ============================================================================

export const backgroundEffects: Record<string, React.FC> = {
  'bg-particles': BgParticles,
  'bg-gradient-animate': BgGradientAnimate,
  'bg-noise-texture': BgNoiseTexture,
  'bg-grid-pattern': BgGridPattern,
  'bg-waves': BgWaves,
  'bg-starfield': BgStarfield,
  'bg-matrix-rain': BgMatrixRain,
  'bg-bokeh': BgBokeh,
  'bg-aurora': BgAurora,
  'bg-mesh-gradient': BgMeshGradient,
  'bg-geometric': BgGeometric,
  'bg-smoke': BgSmoke,
};

export default backgroundEffects;
