import React, { useState, useEffect, useRef } from 'react';

// === GLITCH MATRIX ZONE ===
// Theme: Digital corruption and glitch art - RGB splits, scan lines, data corruption, VHS tracking errors, broken pixels
// Colors: cyan (#00ffff), magenta (#ff00ff), black (#0a0a0a), red (#ff0000), green (#00ff00)

// --- 1. GLITCH CORRUPT BUTTON ---
export const GlitchCorruptButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [glitchFrame, setGlitchFrame] = useState(0);
  const [rgbOffset, setRgbOffset] = useState({ r: 0, g: 0, b: 0 });

  useEffect(() => {
    if (!isHovered) {
      setRgbOffset({ r: 0, g: 0, b: 0 });
      return;
    }
    const interval = setInterval(() => {
      setGlitchFrame(f => f + 1);
      setRgbOffset({
        r: (Math.random() - 0.5) * 8,
        g: (Math.random() - 0.5) * 8,
        b: (Math.random() - 0.5) * 8,
      });
    }, 50);
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div className="h-full flex items-center justify-center p-8" style={{ background: '#0a0a0a' }}>
      <button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative px-10 py-4 font-mono font-bold text-xl tracking-wider overflow-hidden border-2"
        style={{
          background: isHovered ? 'rgba(255, 0, 255, 0.1)' : 'transparent',
          borderColor: isHovered ? '#ff00ff' : '#00ffff',
          color: '#fff',
        }}
      >
        {/* RGB Split Layers */}
        <span
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            color: '#ff0000',
            transform: `translate(${rgbOffset.r}px, ${rgbOffset.r * 0.5}px)`,
            mixBlendMode: 'screen',
            opacity: isHovered ? 0.8 : 0,
          }}
        >
          CORRUPT
        </span>
        <span
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            color: '#00ff00',
            transform: `translate(${rgbOffset.g}px, ${rgbOffset.g * 0.5}px)`,
            mixBlendMode: 'screen',
            opacity: isHovered ? 0.8 : 0,
          }}
        >
          CORRUPT
        </span>
        <span
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            color: '#0000ff',
            transform: `translate(${rgbOffset.b}px, ${rgbOffset.b * 0.5}px)`,
            mixBlendMode: 'screen',
            opacity: isHovered ? 0.8 : 0,
          }}
        >
          CORRUPT
        </span>

        {/* Scan lines overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
            opacity: isHovered ? 1 : 0.5,
          }}
        />

        {/* Glitch slice */}
        {isHovered && glitchFrame % 3 === 0 && (
          <div
            className="absolute left-0 right-0 h-2 bg-[#00ffff] mix-blend-difference"
            style={{ top: `${Math.random() * 100}%` }}
          />
        )}

        {/* Main text */}
        <span className="relative z-10">CORRUPT</span>
      </button>

      <style>{`
        @keyframes glitchShift {
          0%, 100% { clip-path: inset(0 0 0 0); }
          20% { clip-path: inset(20% 0 60% 0); }
          40% { clip-path: inset(40% 0 20% 0); }
          60% { clip-path: inset(60% 0 30% 0); }
          80% { clip-path: inset(10% 0 80% 0); }
        }
      `}</style>
    </div>
  );
};

// --- 2. GLITCH STATIC CARD ---
export const GlitchStaticCard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const drawStatic = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255;
        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
        data[i + 3] = isHovered ? 80 : 40;
      }
      ctx.putImageData(imageData, 0, 0);
      animationId = requestAnimationFrame(drawStatic);
    };
    drawStatic();
    return () => cancelAnimationFrame(animationId);
  }, [isHovered]);

  return (
    <div className="h-full flex items-center justify-center p-8" style={{ background: '#0a0a0a' }}>
      <div
        className="relative w-72 h-80 overflow-hidden cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          background: 'linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)',
          border: '2px solid #00ffff',
          boxShadow: isHovered ? '0 0 30px rgba(0, 255, 255, 0.3)' : 'none',
        }}
      >
        {/* Static noise overlay */}
        <canvas
          ref={canvasRef}
          width={288}
          height={320}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ mixBlendMode: 'overlay' }}
        />

        {/* Content */}
        <div className="relative z-10 h-full p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-[#ff00ff] flex items-center justify-center" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}>
              <span className="text-black font-bold">!</span>
            </div>
            <div>
              <h3 className="font-mono text-[#00ffff] font-bold">STATIC_NODE</h3>
              <p className="text-xs text-[#ff00ff]">ERROR: 0xDEAD</p>
            </div>
          </div>

          <div className="flex-1 space-y-3">
            <div className="h-2 bg-[#00ffff20] rounded overflow-hidden">
              <div className="h-full w-3/4 bg-[#00ffff]" style={{ animation: 'glitchWidth 2s infinite' }} />
            </div>
            <div className="h-2 bg-[#ff00ff20] rounded overflow-hidden">
              <div className="h-full w-1/2 bg-[#ff00ff]" />
            </div>
            <div className="h-2 bg-[#00ff0020] rounded overflow-hidden">
              <div className="h-full w-2/3 bg-[#00ff00]" />
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-[#00ffff30] font-mono text-xs text-[#00ffff]">
            <div className="flex justify-between">
              <span>SIGNAL</span>
              <span className="text-[#ff0000] animate-pulse">CORRUPTED</span>
            </div>
          </div>
        </div>

        {/* Scan lines */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0, 255, 255, 0.03) 1px, rgba(0, 255, 255, 0.03) 2px)',
          }}
        />
      </div>

      <style>{`
        @keyframes glitchWidth {
          0%, 100% { width: 75%; }
          25% { width: 60%; }
          50% { width: 90%; }
          75% { width: 45%; }
        }
      `}</style>
    </div>
  );
};

// --- 3. GLITCH SCAN INPUT ---
export const GlitchScanInput = () => {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [scanPosition, setScanPosition] = useState(0);

  useEffect(() => {
    if (!isFocused) return;
    const interval = setInterval(() => {
      setScanPosition(p => (p + 2) % 100);
    }, 30);
    return () => clearInterval(interval);
  }, [isFocused]);

  return (
    <div className="h-full flex items-center justify-center p-8" style={{ background: '#0a0a0a' }}>
      <div className="relative w-80">
        <label className="block font-mono text-xs text-[#00ffff] mb-2">
          {'>'} ENTER_DATA
        </label>
        <div className="relative overflow-hidden">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full px-4 py-3 font-mono text-lg bg-transparent border-2 outline-none"
            style={{
              borderColor: isFocused ? '#ff00ff' : '#00ffff',
              color: '#fff',
              textShadow: isFocused ? '0 0 10px #00ffff' : 'none',
            }}
            placeholder="input_data..."
          />

          {/* Scan line */}
          <div
            className="absolute left-0 right-0 h-0.5 pointer-events-none transition-opacity"
            style={{
              top: `${scanPosition}%`,
              background: 'linear-gradient(90deg, transparent, #00ffff, transparent)',
              opacity: isFocused ? 1 : 0,
              boxShadow: '0 0 10px #00ffff',
            }}
          />

          {/* Static scan lines */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0, 255, 255, 0.05) 3px, rgba(0, 255, 255, 0.05) 4px)',
            }}
          />
        </div>

        {/* Glitch effect on text */}
        {isFocused && value && (
          <div
            className="absolute top-8 left-4 font-mono text-lg pointer-events-none"
            style={{
              color: '#ff00ff',
              transform: `translate(${Math.sin(scanPosition * 0.1) * 2}px, 0)`,
              opacity: 0.3,
              mixBlendMode: 'screen',
            }}
          >
            {value}
          </div>
        )}
      </div>
    </div>
  );
};

// --- 4. GLITCH ERROR BADGE ---
export const GlitchErrorBadge = () => {
  const [glitchActive, setGlitchActive] = useState(false);
  const [errorCode, setErrorCode] = useState('0xDEADBEEF');

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      const codes = ['0xDEADBEEF', '0xCAFEBABE', '0xBAADF00D', '0xFEEDFACE', '0xC0DEDBAD'];
      setErrorCode(codes[Math.floor(Math.random() * codes.length)]);
      setTimeout(() => setGlitchActive(false), 150);
    }, 2000);
    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <div className="h-full flex items-center justify-center p-8" style={{ background: '#0a0a0a' }}>
      <div className="flex flex-col items-center gap-4">
        {/* Main badge */}
        <div
          className="relative px-6 py-3 font-mono font-bold"
          style={{
            background: '#ff0000',
            color: '#fff',
            clipPath: glitchActive
              ? 'polygon(0 0, 95% 5%, 100% 100%, 5% 95%)'
              : 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          }}
        >
          {/* RGB split layers */}
          {glitchActive && (
            <>
              <span
                className="absolute inset-0 flex items-center justify-center"
                style={{ color: '#00ffff', transform: 'translate(-3px, -1px)', mixBlendMode: 'difference' }}
              >
                ERROR
              </span>
              <span
                className="absolute inset-0 flex items-center justify-center"
                style={{ color: '#ff00ff', transform: 'translate(3px, 1px)', mixBlendMode: 'difference' }}
              >
                ERROR
              </span>
            </>
          )}
          <span className="relative z-10">ERROR</span>
        </div>

        {/* Error code */}
        <div
          className="font-mono text-sm px-4 py-2"
          style={{
            background: 'rgba(255, 0, 0, 0.2)',
            border: '1px solid #ff0000',
            color: '#ff0000',
            fontFamily: 'monospace',
          }}
        >
          <span className="opacity-60">CODE: </span>
          <span style={{ textShadow: glitchActive ? '2px 0 #00ffff, -2px 0 #ff00ff' : 'none' }}>
            {errorCode}
          </span>
        </div>

        {/* Status badges */}
        <div className="flex gap-2">
          {['FATAL', 'CORRUPT', 'DEAD'].map((status, i) => (
            <span
              key={status}
              className="px-3 py-1 font-mono text-xs"
              style={{
                background: i === 0 ? '#ff000020' : i === 1 ? '#ff00ff20' : '#00ffff20',
                border: `1px solid ${i === 0 ? '#ff0000' : i === 1 ? '#ff00ff' : '#00ffff'}`,
                color: i === 0 ? '#ff0000' : i === 1 ? '#ff00ff' : '#00ffff',
              }}
            >
              {status}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- 5. GLITCH BINARY TOGGLE ---
export const GlitchBinaryToggle = () => {
  const [isOn, setIsOn] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [flipChars, setFlipChars] = useState(['0', '0', '0', '0']);

  const toggle = () => {
    setIsAnimating(true);
    const targetValue = isOn ? '0' : '1';
    let step = 0;

    const flipInterval = setInterval(() => {
      setFlipChars(prev => {
        const newChars = [...prev];
        if (step < 4) {
          // Random characters during flip
          newChars[step] = Math.random() > 0.5 ? '1' : '0';
        }
        return newChars;
      });

      if (step >= 8) {
        clearInterval(flipInterval);
        setFlipChars([targetValue, targetValue, targetValue, targetValue]);
        setIsOn(!isOn);
        setIsAnimating(false);
      }
      step++;
    }, 50);
  };

  return (
    <div className="h-full flex items-center justify-center p-8" style={{ background: '#0a0a0a' }}>
      <div className="flex flex-col items-center gap-6">
        {/* Binary display */}
        <div className="flex gap-1">
          {flipChars.map((char, i) => (
            <div
              key={i}
              className="w-12 h-16 flex items-center justify-center font-mono text-3xl font-bold"
              style={{
                background: char === '1' ? '#00ffff20' : '#1a1a1a',
                border: `2px solid ${char === '1' ? '#00ffff' : '#333'}`,
                color: char === '1' ? '#00ffff' : '#666',
                textShadow: char === '1' ? '0 0 20px #00ffff' : 'none',
                transform: isAnimating ? `rotateX(${Math.random() * 360}deg)` : 'none',
                transition: 'all 0.1s',
              }}
            >
              {char}
            </div>
          ))}
        </div>

        {/* Toggle button */}
        <button
          onClick={toggle}
          disabled={isAnimating}
          className="px-8 py-3 font-mono font-bold border-2 transition-all"
          style={{
            borderColor: isOn ? '#00ff00' : '#ff00ff',
            background: isOn ? '#00ff0010' : '#ff00ff10',
            color: isOn ? '#00ff00' : '#ff00ff',
            opacity: isAnimating ? 0.5 : 1,
          }}
        >
          {isAnimating ? 'FLIPPING...' : isOn ? 'STATE: ON' : 'STATE: OFF'}
        </button>

        {/* Status indicator */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <div
            className="w-3 h-3 rounded-full"
            style={{
              background: isOn ? '#00ff00' : '#ff0000',
              boxShadow: `0 0 10px ${isOn ? '#00ff00' : '#ff0000'}`,
            }}
          />
          <span style={{ color: isOn ? '#00ff00' : '#ff0000' }}>
            {isOn ? 'SYSTEM ACTIVE' : 'SYSTEM IDLE'}
          </span>
        </div>
      </div>
    </div>
  );
};

// --- 6. GLITCH CORRUPT PROGRESS ---
export const GlitchCorruptProgress = () => {
  const [progress, setProgress] = useState(0);
  const [corruptSegments, setCorruptSegments] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => (p >= 100 ? 0 : p + 2));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const corruptInterval = setInterval(() => {
      const numCorrupt = Math.floor(Math.random() * 5) + 2;
      const segments = [...Array(numCorrupt)].map(() => Math.floor(Math.random() * 100));
      setCorruptSegments(segments);
    }, 300);
    return () => clearInterval(corruptInterval);
  }, []);

  return (
    <div className="h-full flex items-center justify-center p-8" style={{ background: '#0a0a0a' }}>
      <div className="w-80">
        <div className="flex justify-between font-mono text-xs text-[#00ffff] mb-2">
          <span>DOWNLOADING...</span>
          <span>{progress}%</span>
        </div>

        {/* Progress bar container */}
        <div className="relative h-8 border-2 border-[#00ffff] overflow-hidden" style={{ background: '#0a0a0a' }}>
          {/* Main progress */}
          <div
            className="absolute top-0 left-0 h-full transition-all"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #00ffff, #ff00ff)',
            }}
          />

          {/* Corrupt segments */}
          {corruptSegments.map((pos, i) => (
            <div
              key={i}
              className="absolute top-0 h-full"
              style={{
                left: `${pos}%`,
                width: '8px',
                background: i % 2 === 0 ? '#ff0000' : '#00ff00',
                mixBlendMode: 'difference',
                opacity: 0.8,
              }}
            />
          ))}

          {/* Glitch overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(0,0,0,0.2) 4px, rgba(0,0,0,0.2) 8px)',
            }}
          />

          {/* Random data blocks */}
          <div className="absolute inset-0 flex items-center justify-center font-mono text-xs text-black font-bold mix-blend-difference">
            {progress > 50 && 'DATA_CORRUPT'}
          </div>
        </div>

        {/* Error messages */}
        <div className="mt-2 font-mono text-[10px] text-[#ff0000] space-y-1">
          <div className="animate-pulse">WARNING: Packet loss detected</div>
          <div style={{ opacity: progress > 70 ? 1 : 0.3 }}>ERROR: CRC mismatch at block 0x{Math.floor(progress * 2.55).toString(16).toUpperCase()}</div>
        </div>
      </div>
    </div>
  );
};

// --- 7. GLITCH MATRIX LOADER ---
export const GlitchMatrixLoader = () => {
  const [columns, setColumns] = useState<{ chars: string[]; y: number; speed: number }[]>([]);

  useEffect(() => {
    const chars = '01アイウエオカキクケコサシスセソタチツテト@#$%^&*<>[]{}';
    const cols = [...Array(20)].map(() => ({
      chars: [...Array(15)].map(() => chars[Math.floor(Math.random() * chars.length)]),
      y: Math.random() * -100,
      speed: 1 + Math.random() * 3,
    }));
    setColumns(cols);

    const interval = setInterval(() => {
      setColumns(prev =>
        prev.map(col => ({
          ...col,
          y: col.y > 120 ? -20 : col.y + col.speed,
          chars: col.chars.map((_, i) =>
            i === 0 || Math.random() > 0.95 ? chars[Math.floor(Math.random() * chars.length)] : col.chars[i]
          ),
        }))
      );
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full relative overflow-hidden" style={{ background: '#0a0a0a' }}>
      {/* Matrix rain */}
      {columns.map((col, i) => (
        <div
          key={i}
          className="absolute font-mono text-sm leading-tight"
          style={{
            left: `${i * 5}%`,
            top: `${col.y}%`,
          }}
        >
          {col.chars.map((char, j) => (
            <div
              key={j}
              style={{
                color: j === 0 ? '#fff' : `rgba(0, 255, 0, ${1 - j * 0.07})`,
                textShadow: j === 0 ? '0 0 10px #00ff00, 0 0 20px #00ff00' : 'none',
              }}
            >
              {char}
            </div>
          ))}
        </div>
      ))}

      {/* Center loader */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <div
            className="w-24 h-24 border-4 border-[#00ff00] rounded-full animate-spin"
            style={{
              borderTopColor: 'transparent',
              boxShadow: '0 0 30px rgba(0, 255, 0, 0.3)',
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center font-mono text-[#00ff00] text-xs">
            LOAD
          </div>
        </div>
      </div>

      {/* Scan line */}
      <div
        className="absolute left-0 right-0 h-1 bg-[#00ff00] opacity-20"
        style={{ animation: 'scanDown 2s linear infinite' }}
      />

      <style>{`
        @keyframes scanDown {
          0% { top: 0; }
          100% { top: 100%; }
        }
      `}</style>
    </div>
  );
};

// --- 8. GLITCH PIXEL AVATAR ---
export const GlitchPixelAvatar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [pixelOffset, setPixelOffset] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    if (!isHovered) {
      setPixelOffset([]);
      return;
    }
    const interval = setInterval(() => {
      const offsets = [...Array(20)].map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
      }));
      setPixelOffset(offsets);
    }, 100);
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div className="h-full flex items-center justify-center p-8" style={{ background: '#0a0a0a' }}>
      <div
        className="relative cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Avatar container */}
        <div
          className="relative w-32 h-32 overflow-hidden"
          style={{
            border: '3px solid #00ffff',
            boxShadow: isHovered ? '0 0 30px rgba(0, 255, 255, 0.5)' : 'none',
          }}
        >
          {/* Base avatar grid */}
          <div className="absolute inset-0 grid grid-cols-8 grid-rows-8">
            {[...Array(64)].map((_, i) => {
              const row = Math.floor(i / 8);
              const col = i % 8;
              const isHead = row >= 1 && row <= 5 && col >= 2 && col <= 5;
              const isEyes = row === 3 && (col === 3 || col === 4);
              const isMouth = row === 5 && col >= 3 && col <= 4;

              return (
                <div
                  key={i}
                  className="transition-all"
                  style={{
                    background: isEyes ? '#00ffff' : isMouth ? '#ff00ff' : isHead ? '#fff' : '#0a0a0a',
                    transform: isHovered && Math.random() > 0.7
                      ? `translate(${(Math.random() - 0.5) * 10}px, ${(Math.random() - 0.5) * 10}px)`
                      : 'none',
                  }}
                />
              );
            })}
          </div>

          {/* Glitch pixels overlay */}
          {isHovered && pixelOffset.map((offset, i) => (
            <div
              key={i}
              className="absolute w-4 h-4"
              style={{
                left: `${offset.x}%`,
                top: `${offset.y}%`,
                background: i % 3 === 0 ? '#ff0000' : i % 3 === 1 ? '#00ff00' : '#0000ff',
                mixBlendMode: 'screen',
              }}
            />
          ))}

          {/* RGB split effect */}
          {isHovered && (
            <>
              <div
                className="absolute inset-0 opacity-50"
                style={{
                  background: 'linear-gradient(90deg, #ff000020 0%, transparent 33%)',
                  transform: 'translateX(-5px)',
                }}
              />
              <div
                className="absolute inset-0 opacity-50"
                style={{
                  background: 'linear-gradient(90deg, transparent 66%, #0000ff20 100%)',
                  transform: 'translateX(5px)',
                }}
              />
            </>
          )}
        </div>

        {/* Username */}
        <div className="mt-3 text-center font-mono text-sm">
          <span style={{ color: isHovered ? '#ff00ff' : '#00ffff' }}>
            USER_4N0NYM0US
          </span>
        </div>
      </div>
    </div>
  );
};

// --- 9. GLITCH BSOD MODAL ---
export const GlitchBsodModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [blinkState, setBlinkState] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlinkState(b => !b);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex items-center justify-center p-4" style={{ background: '#0a0a0a' }}>
      {isOpen && (
        <div
          className="relative w-full max-w-md p-8 font-mono overflow-hidden"
          style={{ background: '#0000aa' }}
        >
          {/* Scan lines */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)',
            }}
          />

          {/* Title bar */}
          <div className="text-center mb-6">
            <span className="bg-[#aaaaaa] text-[#0000aa] px-4 py-1 text-sm font-bold">
              SYSTEM ERROR
            </span>
          </div>

          {/* Error content */}
          <div className="text-white text-sm space-y-4">
            <p>A fatal exception has occurred at 0x0000:C0000034</p>
            <p>The current application will be terminated.</p>
            <div className="mt-4 space-y-2">
              <p>* Press any key to terminate the current application.</p>
              <p>* Press CTRL+ALT+DEL to restart your computer.</p>
              <p className="text-[#ff0000]">You will lose any unsaved information.</p>
            </div>
          </div>

          {/* Blinking prompt */}
          <div className="mt-8 text-white text-center">
            Press any key to continue{blinkState ? '_' : ' '}
          </div>

          {/* Close button (acts as "any key") */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center text-white hover:bg-[#ff0000] transition-colors"
          >
            X
          </button>

          {/* Glitch flicker */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              animation: 'flicker 0.1s infinite',
            }}
          />
        </div>
      )}

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="px-6 py-3 font-mono text-[#00ffff] border-2 border-[#00ffff] hover:bg-[#00ffff20]"
        >
          TRIGGER CRASH
        </button>
      )}

      <style>{`
        @keyframes flicker {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

// --- 10. GLITCH TERMINAL NAV ---
export const GlitchTerminalNav = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);

  const navItems = [
    { cmd: 'cd /home', label: 'HOME' },
    { cmd: 'ls -la /docs', label: 'DOCUMENTS' },
    { cmd: 'cat /sys', label: 'SYSTEM' },
    { cmd: './settings', label: 'SETTINGS' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(v => !v);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex items-center justify-center p-8" style={{ background: '#0a0a0a' }}>
      <div
        className="w-80 font-mono text-sm overflow-hidden"
        style={{
          background: '#000',
          border: '2px solid #00ff00',
          boxShadow: '0 0 20px rgba(0, 255, 0, 0.2)',
        }}
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 px-3 py-2 border-b border-[#00ff0040]" style={{ background: '#001100' }}>
          <div className="w-3 h-3 rounded-full bg-[#ff0000]" />
          <div className="w-3 h-3 rounded-full bg-[#ffff00]" />
          <div className="w-3 h-3 rounded-full bg-[#00ff00]" />
          <span className="ml-2 text-[#00ff00] text-xs">terminal@glitch</span>
        </div>

        {/* Nav items */}
        <div className="p-2">
          {navItems.map((item, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className="w-full text-left px-3 py-2 transition-all"
              style={{
                background: activeIndex === i ? '#00ff0020' : 'transparent',
                color: activeIndex === i ? '#00ff00' : '#00ff0080',
              }}
            >
              <span className="text-[#00ff0060]">$</span> {item.cmd}
              {activeIndex === i && cursorVisible && (
                <span className="ml-1 bg-[#00ff00] text-black px-1">_</span>
              )}
            </button>
          ))}
        </div>

        {/* Output area */}
        <div className="px-3 py-2 border-t border-[#00ff0040] text-[#00ff00]">
          <div className="text-xs opacity-60">
            {'>'} Executing: {navItems[activeIndex].cmd}
          </div>
          <div className="text-xs mt-1">
            {'>'} Navigating to {navItems[activeIndex].label}...
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 11. GLITCH NOISE DIVIDER ---
export const GlitchNoiseDivider = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const drawNoise = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255;
        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
        data[i + 3] = 255;
      }
      ctx.putImageData(imageData, 0, 0);
      animationId = requestAnimationFrame(drawNoise);
    };
    drawNoise();
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="h-full flex flex-col items-center justify-center p-8" style={{ background: '#0a0a0a' }}>
      <div className="w-full max-w-md">
        {/* Content above */}
        <div className="text-center mb-4">
          <span className="font-mono text-[#00ffff] text-sm">SECTION_01</span>
        </div>

        {/* Noise divider */}
        <div className="relative h-8 overflow-hidden">
          <canvas
            ref={canvasRef}
            width={400}
            height={32}
            className="w-full h-full"
          />
          {/* Color overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(90deg, #00ffff40, #ff00ff40, #00ffff40)',
              mixBlendMode: 'overlay',
            }}
          />
          {/* Scan line */}
          <div
            className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#00ffff]"
            style={{ boxShadow: '0 0 10px #00ffff' }}
          />
        </div>

        {/* Content below */}
        <div className="text-center mt-4">
          <span className="font-mono text-[#ff00ff] text-sm">SECTION_02</span>
        </div>
      </div>
    </div>
  );
};

// --- 12. GLITCH WARNING ALERT ---
export const GlitchWarningAlert = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [glitchFrame, setGlitchFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchFrame(f => f + 1);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  if (!isVisible) {
    return (
      <div className="h-full flex items-center justify-center p-8" style={{ background: '#0a0a0a' }}>
        <button
          onClick={() => setIsVisible(true)}
          className="px-6 py-3 font-mono text-[#ffff00] border-2 border-[#ffff00] hover:bg-[#ffff0020]"
        >
          SHOW WARNING
        </button>
      </div>
    );
  }

  return (
    <div className="h-full flex items-center justify-center p-4" style={{ background: '#0a0a0a' }}>
      <div
        className="relative w-full max-w-sm p-4 font-mono overflow-hidden"
        style={{
          background: '#1a1a00',
          border: '2px solid #ffff00',
          boxShadow: '0 0 30px rgba(255, 255, 0, 0.2)',
        }}
      >
        {/* Glitch slices */}
        {glitchFrame % 5 === 0 && (
          <div
            className="absolute left-0 right-0 h-4 bg-[#ff0000]"
            style={{
              top: `${Math.random() * 100}%`,
              mixBlendMode: 'difference',
              opacity: 0.5,
            }}
          />
        )}

        {/* Warning icon */}
        <div className="flex items-start gap-3">
          <div
            className="flex-shrink-0 w-10 h-10 flex items-center justify-center font-bold text-xl"
            style={{
              background: '#ffff00',
              color: '#000',
              clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
            }}
          >
            !
          </div>
          <div>
            <h3 className="text-[#ffff00] font-bold mb-1">SYSTEM WARNING</h3>
            <p className="text-[#ffff00aa] text-sm">
              Memory corruption detected in sector 0x7F. Immediate action required.
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => setIsVisible(false)}
            className="flex-1 py-2 text-sm border"
            style={{
              borderColor: '#ffff00',
              color: '#ffff00',
              background: '#ffff0010',
            }}
          >
            DISMISS
          </button>
          <button
            className="flex-1 py-2 text-sm"
            style={{
              background: '#ffff00',
              color: '#000',
            }}
          >
            FIX NOW
          </button>
        </div>

        {/* Scan lines */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 255, 0, 0.03) 2px, rgba(255, 255, 0, 0.03) 4px)',
          }}
        />
      </div>
    </div>
  );
};

// --- 13. GLITCH CURSOR ICON ---
export const GlitchCursorIcon = () => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isGlitching, setIsGlitching] = useState(false);
  const [trails, setTrails] = useState<{ x: number; y: number; color: string }[]>([]);

  useEffect(() => {
    const moveInterval = setInterval(() => {
      setPosition(prev => ({
        x: prev.x + (Math.random() - 0.5) * 20,
        y: prev.y + (Math.random() - 0.5) * 20,
      }));
    }, 100);

    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      const colors = ['#ff0000', '#00ff00', '#0000ff', '#00ffff', '#ff00ff'];
      setTrails(
        [...Array(5)].map(() => ({
          x: position.x + (Math.random() - 0.5) * 30,
          y: position.y + (Math.random() - 0.5) * 30,
          color: colors[Math.floor(Math.random() * colors.length)],
        }))
      );
      setTimeout(() => {
        setIsGlitching(false);
        setTrails([]);
      }, 150);
    }, 1000);

    return () => {
      clearInterval(moveInterval);
      clearInterval(glitchInterval);
    };
  }, [position.x, position.y]);

  return (
    <div className="h-full relative overflow-hidden" style={{ background: '#0a0a0a' }}>
      {/* Trails */}
      {trails.map((trail, i) => (
        <svg
          key={i}
          className="absolute pointer-events-none"
          style={{
            left: `${trail.x}%`,
            top: `${trail.y}%`,
            width: '24px',
            height: '24px',
            transform: 'translate(-50%, -50%)',
            opacity: 0.6,
          }}
          viewBox="0 0 24 24"
        >
          <path
            d="M5 3l14 9-14 9V3z"
            fill={trail.color}
          />
        </svg>
      ))}

      {/* Main cursor */}
      <svg
        className="absolute pointer-events-none transition-all"
        style={{
          left: `${Math.max(10, Math.min(90, position.x))}%`,
          top: `${Math.max(10, Math.min(90, position.y))}%`,
          width: '32px',
          height: '32px',
          transform: `translate(-50%, -50%) ${isGlitching ? 'scale(1.5)' : 'scale(1)'}`,
          filter: isGlitching ? 'drop-shadow(0 0 10px #00ffff)' : 'none',
        }}
        viewBox="0 0 24 24"
      >
        <path
          d="M5 3l14 9-14 9V3z"
          fill={isGlitching ? '#ff00ff' : '#00ffff'}
          stroke="#fff"
          strokeWidth="1"
        />
      </svg>

      {/* Status text */}
      <div className="absolute bottom-4 left-4 font-mono text-xs text-[#00ffff]">
        CURSOR: {Math.round(position.x)}, {Math.round(position.y)}
        {isGlitching && <span className="text-[#ff00ff] ml-2">GLITCH!</span>}
      </div>
    </div>
  );
};

// --- 14. GLITCH BROKEN HEADING ---
export const GlitchBrokenHeading = () => {
  const [glitchState, setGlitchState] = useState(0);
  const text = 'SYSTEM_FAILURE';

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchState(s => (s + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex items-center justify-center p-8" style={{ background: '#0a0a0a' }}>
      <div className="relative">
        {/* Shadow layers */}
        <h1
          className="absolute font-mono text-4xl font-black tracking-wider"
          style={{
            color: '#ff0000',
            transform: `translate(${Math.sin(glitchState * 0.2) * 5}px, ${Math.cos(glitchState * 0.3) * 2}px)`,
            clipPath: glitchState % 10 < 3 ? 'inset(0 0 50% 0)' : 'none',
            opacity: 0.7,
          }}
        >
          {text}
        </h1>
        <h1
          className="absolute font-mono text-4xl font-black tracking-wider"
          style={{
            color: '#00ffff',
            transform: `translate(${Math.sin(glitchState * 0.3) * -5}px, ${Math.cos(glitchState * 0.2) * -2}px)`,
            clipPath: glitchState % 10 < 3 ? 'inset(50% 0 0 0)' : 'none',
            opacity: 0.7,
          }}
        >
          {text}
        </h1>

        {/* Main text */}
        <h1
          className="relative font-mono text-4xl font-black tracking-wider"
          style={{
            color: '#fff',
            textShadow: '0 0 10px #ff00ff',
          }}
        >
          {text.split('').map((char, i) => (
            <span
              key={i}
              style={{
                display: 'inline-block',
                transform: glitchState % 20 < 2 && Math.random() > 0.7
                  ? `translateY(${(Math.random() - 0.5) * 10}px)`
                  : 'none',
              }}
            >
              {char}
            </span>
          ))}
        </h1>

        {/* Underline glitch */}
        <div className="flex mt-2 gap-1">
          {[...Array(14)].map((_, i) => (
            <div
              key={i}
              className="h-1 flex-1"
              style={{
                background: i % 3 === 0 ? '#ff00ff' : i % 3 === 1 ? '#00ffff' : '#fff',
                transform: glitchState % 15 < 2
                  ? `translateX(${(Math.random() - 0.5) * 10}px)`
                  : 'none',
                opacity: Math.random() > 0.2 ? 1 : 0.3,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// --- 15. GLITCH SIGNAL SLIDER ---
export const GlitchSignalSlider = () => {
  const [value, setValue] = useState(50);
  const [interference, setInterference] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const points = [...Array(20)].map(() => Math.random() * 100);
      setInterference(points);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex items-center justify-center p-8" style={{ background: '#0a0a0a' }}>
      <div className="w-80">
        <label className="block font-mono text-xs text-[#00ffff] mb-4">
          SIGNAL STRENGTH: {value}%
        </label>

        {/* Signal visualization */}
        <div className="relative h-16 mb-4 border border-[#00ffff30] overflow-hidden" style={{ background: '#0a0a0a' }}>
          <svg className="w-full h-full">
            {/* Interference lines */}
            {interference.map((y, i) => (
              <line
                key={i}
                x1={`${i * 5}%`}
                y1={`${y}%`}
                x2={`${(i + 1) * 5}%`}
                y2={`${interference[(i + 1) % interference.length]}%`}
                stroke={value > 70 ? '#00ff00' : value > 30 ? '#ffff00' : '#ff0000'}
                strokeWidth="2"
                opacity={0.5}
              />
            ))}
            {/* Main signal line */}
            <line
              x1="0"
              y1="50%"
              x2={`${value}%`}
              y2="50%"
              stroke="#00ffff"
              strokeWidth="3"
              style={{ filter: 'drop-shadow(0 0 5px #00ffff)' }}
            />
          </svg>
        </div>

        {/* Slider */}
        <div className="relative">
          <input
            type="range"
            min="0"
            max="100"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="w-full h-3 appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(90deg, #00ffff ${value}%, #333 ${value}%)`,
              borderRadius: 0,
            }}
          />
          {/* Glitch markers */}
          <div className="absolute top-0 left-0 right-0 h-3 pointer-events-none flex">
            {interference.slice(0, 10).map((_, i) => (
              <div
                key={i}
                className="h-full"
                style={{
                  width: '2px',
                  marginLeft: `${i * 10}%`,
                  background: '#ff00ff',
                  opacity: Math.random() > 0.7 ? 0.5 : 0,
                }}
              />
            ))}
          </div>
        </div>

        {/* Status */}
        <div className="mt-4 flex justify-between font-mono text-xs">
          <span className="text-[#ff0000]">WEAK</span>
          <span className="text-[#ffff00]">MEDIUM</span>
          <span className="text-[#00ff00]">STRONG</span>
        </div>

        <style>{`
          input[type="range"]::-webkit-slider-thumb {
            appearance: none;
            width: 16px;
            height: 24px;
            background: #ff00ff;
            cursor: pointer;
            border: 2px solid #fff;
          }
        `}</style>
      </div>
    </div>
  );
};

// --- 16. GLITCH CHANNEL TABS ---
export const GlitchChannelTabs = () => {
  const [activeChannel, setActiveChannel] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const [staticLevel, setStaticLevel] = useState(0);

  const channels = [
    { id: 'CH01', label: 'NEWS', color: '#00ffff' },
    { id: 'CH02', label: 'DATA', color: '#ff00ff' },
    { id: 'CH03', label: 'VOID', color: '#00ff00' },
    { id: 'CH04', label: 'DEAD', color: '#ff0000' },
  ];

  const changeChannel = (index: number) => {
    if (index === activeChannel) return;
    setIsChanging(true);
    setStaticLevel(100);

    const fadeInterval = setInterval(() => {
      setStaticLevel(l => {
        if (l <= 0) {
          clearInterval(fadeInterval);
          return 0;
        }
        return l - 10;
      });
    }, 50);

    setTimeout(() => {
      setActiveChannel(index);
      setIsChanging(false);
    }, 300);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-8" style={{ background: '#0a0a0a' }}>
      {/* Channel display */}
      <div
        className="relative w-64 h-48 mb-6 overflow-hidden"
        style={{
          border: '4px solid #333',
          borderRadius: '8px',
          background: '#000',
        }}
      >
        {/* Static overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
            opacity: staticLevel / 100,
          }}
        />

        {/* Channel content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center">
          <span className="font-mono text-6xl font-bold" style={{ color: channels[activeChannel].color }}>
            {channels[activeChannel].id}
          </span>
          <span className="font-mono text-sm mt-2" style={{ color: channels[activeChannel].color + '80' }}>
            {channels[activeChannel].label}
          </span>
        </div>

        {/* VHS tracking lines */}
        {isChanging && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute left-0 right-0 h-4"
                style={{
                  top: `${i * 20 + Math.random() * 10}%`,
                  background: 'linear-gradient(90deg, transparent, #fff, transparent)',
                  opacity: 0.3,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Channel tabs */}
      <div className="flex gap-2">
        {channels.map((channel, i) => (
          <button
            key={channel.id}
            onClick={() => changeChannel(i)}
            className="px-4 py-2 font-mono text-sm transition-all"
            style={{
              background: activeChannel === i ? channel.color + '30' : '#1a1a1a',
              border: `2px solid ${activeChannel === i ? channel.color : '#333'}`,
              color: activeChannel === i ? channel.color : '#666',
              boxShadow: activeChannel === i ? `0 0 15px ${channel.color}40` : 'none',
            }}
          >
            {channel.id}
          </button>
        ))}
      </div>
    </div>
  );
};

// --- 17. GLITCH VHS BACKGROUND ---
export const GlitchVhsBackground = () => {
  const [trackingOffset, setTrackingOffset] = useState(0);
  const [glitchBands, setGlitchBands] = useState<{ y: number; height: number; offset: number }[]>([]);

  useEffect(() => {
    // Tracking errors
    const trackingInterval = setInterval(() => {
      if (Math.random() > 0.8) {
        setTrackingOffset((Math.random() - 0.5) * 20);
        setTimeout(() => setTrackingOffset(0), 100);
      }
    }, 200);

    // Glitch bands
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        const bands = [...Array(Math.floor(Math.random() * 5) + 1)].map(() => ({
          y: Math.random() * 100,
          height: Math.random() * 10 + 2,
          offset: (Math.random() - 0.5) * 30,
        }));
        setGlitchBands(bands);
        setTimeout(() => setGlitchBands([]), 100);
      }
    }, 300);

    return () => {
      clearInterval(trackingInterval);
      clearInterval(glitchInterval);
    };
  }, []);

  return (
    <div className="h-full relative overflow-hidden" style={{ background: '#0a0a0a' }}>
      {/* Base VHS noise pattern */}
      <div
        className="absolute inset-0"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.03) 4px)',
          transform: `translateX(${trackingOffset}px)`,
        }}
      />

      {/* Color bands */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-[#ff0000] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#0000ff] to-transparent" />
      </div>

      {/* Glitch bands */}
      {glitchBands.map((band, i) => (
        <div
          key={i}
          className="absolute left-0 right-0"
          style={{
            top: `${band.y}%`,
            height: `${band.height}%`,
            background: 'linear-gradient(90deg, #00ffff20, #ff00ff20)',
            transform: `translateX(${band.offset}px)`,
          }}
        />
      ))}

      {/* VHS timestamp */}
      <div
        className="absolute bottom-4 right-4 font-mono text-sm"
        style={{
          color: '#fff',
          textShadow: '2px 0 #ff0000, -2px 0 #00ffff',
          fontFamily: 'monospace',
        }}
      >
        PLAY {'\u25B6'} 00:00:00
      </div>

      {/* REC indicator */}
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <div
          className="w-3 h-3 rounded-full bg-[#ff0000] animate-pulse"
          style={{ boxShadow: '0 0 10px #ff0000' }}
        />
        <span className="font-mono text-sm text-[#ff0000]">REC</span>
      </div>

      {/* Scan lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 2px)',
        }}
      />

      {/* Moving tracking line */}
      <div
        className="absolute left-0 right-0 h-8 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.1), transparent)',
          animation: 'vhsScan 3s linear infinite',
        }}
      />

      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="px-8 py-4 font-mono text-2xl font-bold"
          style={{
            color: '#fff',
            background: 'rgba(0, 0, 0, 0.5)',
            border: '2px solid #00ffff',
            textShadow: '3px 0 #ff00ff, -3px 0 #00ffff',
            transform: `translateX(${trackingOffset}px)`,
          }}
        >
          VHS_ARCHIVE
        </div>
      </div>

      <style>{`
        @keyframes vhsScan {
          0% { top: -10%; }
          100% { top: 110%; }
        }
      `}</style>
    </div>
  );
};

// Export all components with exact IDs
export const glitchMatrixComponents: Record<string, React.FC> = {
  'glitch-corrupt-button': GlitchCorruptButton,
  'glitch-static-card': GlitchStaticCard,
  'glitch-scan-input': GlitchScanInput,
  'glitch-error-badge': GlitchErrorBadge,
  'glitch-binary-toggle': GlitchBinaryToggle,
  'glitch-corrupt-progress': GlitchCorruptProgress,
  'glitch-matrix-loader': GlitchMatrixLoader,
  'glitch-pixel-avatar': GlitchPixelAvatar,
  'glitch-bsod-modal': GlitchBsodModal,
  'glitch-terminal-nav': GlitchTerminalNav,
  'glitch-noise-divider': GlitchNoiseDivider,
  'glitch-warning-alert': GlitchWarningAlert,
  'glitch-cursor-icon': GlitchCursorIcon,
  'glitch-broken-heading': GlitchBrokenHeading,
  'glitch-signal-slider': GlitchSignalSlider,
  'glitch-channel-tabs': GlitchChannelTabs,
  'glitch-vhs-background': GlitchVhsBackground,
};
