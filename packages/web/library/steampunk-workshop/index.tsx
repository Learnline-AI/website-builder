import React, { useState, useEffect, useRef } from 'react';

// --- BRASS GEAR BUTTON ---
export const BrassGearButton = () => {
  const [isPressed, setIsPressed] = useState(false);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(r => r + (isPressed ? 3 : 0.5));
    }, 30);
    return () => clearInterval(interval);
  }, [isPressed]);

  return (
    <div className="h-full flex items-center justify-center p-8" style={{ background: 'linear-gradient(135deg, #1a1208 0%, #2d1f0d 50%, #0f0a04 100%)' }}>
      <button
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        className="relative group"
      >
        {/* Outer gear ring */}
        <div
          className="absolute -inset-4 transition-transform duration-300"
          style={{
            transform: `rotate(${rotation}deg)`,
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path
              d="M50 5 L55 15 L65 10 L65 22 L77 18 L72 30 L85 30 L77 40 L90 45 L80 52 L90 60 L77 62 L85 72 L72 70 L77 82 L65 78 L65 90 L55 85 L50 95 L45 85 L35 90 L35 78 L23 82 L28 70 L15 72 L23 62 L10 60 L20 52 L10 45 L23 40 L15 30 L28 30 L23 18 L35 22 L35 10 L45 15 Z"
              fill="none"
              stroke="url(#brassGradient)"
              strokeWidth="3"
            />
            <defs>
              <linearGradient id="brassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#cd7f32" />
                <stop offset="50%" stopColor="#daa520" />
                <stop offset="100%" stopColor="#8b6914" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Inner gear (counter-rotating) */}
        <div
          className="absolute -inset-2 transition-transform duration-300"
          style={{
            transform: `rotate(${-rotation * 0.7}deg)`,
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path
              d="M50 15 L54 25 L62 20 L60 30 L70 28 L65 38 L75 40 L68 48 L78 52 L68 56 L75 64 L65 66 L70 76 L60 72 L62 82 L54 77 L50 87 L46 77 L38 82 L40 72 L30 76 L35 66 L25 64 L32 56 L22 52 L32 48 L25 40 L35 38 L30 28 L40 30 L38 20 L46 25 Z"
              fill="none"
              stroke="#8b6914"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* Button face */}
        <div
          className="relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-150"
          style={{
            background: isPressed
              ? 'radial-gradient(circle at 60% 60%, #8b6914, #5a4510)'
              : 'radial-gradient(circle at 40% 40%, #daa520, #8b6914)',
            boxShadow: isPressed
              ? 'inset 0 4px 8px rgba(0,0,0,0.5), 0 0 20px #cd7f3240'
              : '0 4px 8px rgba(0,0,0,0.5), inset 0 -2px 4px rgba(0,0,0,0.3), 0 0 20px #cd7f3220',
            border: '3px solid #8b6914',
            transform: isPressed ? 'scale(0.95)' : 'scale(1)',
          }}
        >
          {/* Embossed symbol */}
          <div
            className="text-3xl"
            style={{
              color: isPressed ? '#5a4510' : '#cd7f32',
              textShadow: isPressed ? 'none' : '0 2px 2px rgba(0,0,0,0.5)',
            }}
          >
            ⚙
          </div>

          {/* Rivets */}
          {[0, 90, 180, 270].map(angle => (
            <div
              key={angle}
              className="absolute w-3 h-3 rounded-full"
              style={{
                background: 'radial-gradient(circle at 30% 30%, #cd7f32, #5a4510)',
                transform: `rotate(${angle}deg) translateY(-34px)`,
                boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.3), 0 1px 2px rgba(0,0,0,0.5)',
              }}
            />
          ))}
        </div>
      </button>

      <style>{`
        @keyframes steamPuff {
          0% { opacity: 0.8; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-30px) scale(2); }
        }
      `}</style>
    </div>
  );
};

// --- STEAM PRESSURE SLIDER ---
export const SteamPressureSlider = () => {
  const [pressure, setPressure] = useState(50);
  const [steamPuffs, setSteamPuffs] = useState<number[]>([]);

  useEffect(() => {
    if (pressure > 70) {
      const interval = setInterval(() => {
        setSteamPuffs(prev => [...prev.slice(-5), Date.now()]);
      }, 300);
      return () => clearInterval(interval);
    }
  }, [pressure]);

  return (
    <div className="h-full flex flex-col items-center justify-center p-8" style={{ background: 'linear-gradient(180deg, #1a1208 0%, #0f0a04 100%)' }}>
      {/* Pipe housing */}
      <div className="relative">
        {/* Main pipe */}
        <div
          className="w-80 h-12 rounded-full relative overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, #3d2a14 0%, #1a1208 50%, #2d1f0d 100%)',
            border: '3px solid #5a4510',
            boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.5), 0 4px 8px rgba(0,0,0,0.3)',
          }}
        >
          {/* Pressure fill */}
          <div
            className="absolute left-0 top-0 bottom-0 transition-all duration-200"
            style={{
              width: `${pressure}%`,
              background: pressure > 80
                ? 'linear-gradient(90deg, #cd7f32, #ff4444)'
                : pressure > 60
                  ? 'linear-gradient(90deg, #cd7f32, #daa520)'
                  : 'linear-gradient(90deg, #5a4510, #cd7f32)',
              boxShadow: `inset 0 0 10px ${pressure > 80 ? '#ff4444' : '#cd7f32'}40`,
            }}
          />

          {/* Rivets along pipe */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full top-1"
              style={{
                left: `${5 + i * 12}%`,
                background: 'radial-gradient(circle at 30% 30%, #8b6914, #3d2a14)',
                boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.2)',
              }}
            />
          ))}
        </div>

        {/* Steam vents */}
        <div className="absolute -top-8 right-4">
          {steamPuffs.map(id => (
            <div
              key={id}
              className="absolute w-4 h-4 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.6), transparent)',
                animation: 'steamPuff 0.8s ease-out forwards',
              }}
            />
          ))}
          <div
            className="w-6 h-6 rounded-full"
            style={{
              background: 'radial-gradient(circle at 30% 30%, #cd7f32, #5a4510)',
              border: '2px solid #8b6914',
            }}
          />
        </div>

        {/* Valve handle */}
        <div className="absolute -right-2 top-1/2 -translate-y-1/2">
          <input
            type="range"
            min="0"
            max="100"
            value={pressure}
            onChange={(e) => setPressure(parseInt(e.target.value))}
            className="w-32 h-3 appearance-none cursor-pointer"
            style={{
              background: 'linear-gradient(180deg, #3d2a14, #1a1208)',
              borderRadius: '4px',
              transform: 'rotate(-90deg) translateX(-40px)',
            }}
          />
        </div>
      </div>

      {/* Pressure gauge */}
      <div className="mt-8 flex items-center gap-4">
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center"
          style={{
            background: 'radial-gradient(circle at 30% 30%, #2d1f0d, #0f0a04)',
            border: '4px solid #5a4510',
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)',
          }}
        >
          <div className="text-center">
            <div
              className="text-2xl font-mono font-bold"
              style={{ color: pressure > 80 ? '#ff4444' : '#daa520' }}
            >
              {pressure}
            </div>
            <div className="text-xs" style={{ color: '#8b6914' }}>PSI</div>
          </div>
        </div>

        <div className="text-right">
          <div className="text-sm font-mono" style={{ color: '#daa520' }}>
            {pressure < 30 ? 'LOW' : pressure < 70 ? 'NOMINAL' : pressure < 90 ? 'HIGH' : 'CRITICAL'}
          </div>
          <div className="text-xs" style={{ color: '#8b6914' }}>PRESSURE STATUS</div>
        </div>
      </div>

      <style>{`
        @keyframes steamPuff {
          0% { opacity: 0.8; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-40px) scale(3); }
        }
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          background: radial-gradient(circle at 30% 30%, #daa520, #8b6914);
          border: 3px solid #5a4510;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.5);
        }
      `}</style>
    </div>
  );
};

// --- CLOCKWORK PROGRESS ---
export const ClockworkProgress = () => {
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setProgress(p => p >= 100 ? 0 : p + 1);
    }, 100);
    return () => clearInterval(interval);
  }, [isRunning]);

  const mainGearRotation = progress * 3.6;
  const smallGearRotation = -progress * 7.2;

  return (
    <div className="h-full flex flex-col items-center justify-center p-8" style={{ background: '#1a1208' }}>
      {/* Clockwork mechanism */}
      <div className="relative w-64 h-64">
        {/* Background plate */}
        <div
          className="absolute inset-0 rounded-lg"
          style={{
            background: 'linear-gradient(135deg, #2d1f0d 0%, #1a1208 100%)',
            border: '4px solid #5a4510',
            boxShadow: 'inset 0 0 30px rgba(0,0,0,0.5)',
          }}
        />

        {/* Main gear */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32"
          style={{ transform: `translate(-50%, -50%) rotate(${mainGearRotation}deg)` }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="35" fill="none" stroke="url(#gearBrass)" strokeWidth="4" />
            {[...Array(12)].map((_, i) => (
              <rect
                key={i}
                x="46"
                y="8"
                width="8"
                height="12"
                rx="2"
                fill="#cd7f32"
                transform={`rotate(${i * 30} 50 50)`}
              />
            ))}
            <circle cx="50" cy="50" r="8" fill="#8b6914" />
            <defs>
              <linearGradient id="gearBrass" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#daa520" />
                <stop offset="100%" stopColor="#8b6914" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Small gear 1 */}
        <div
          className="absolute right-8 top-8 w-16 h-16"
          style={{ transform: `rotate(${smallGearRotation}deg)` }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="30" fill="none" stroke="#8b6914" strokeWidth="3" />
            {[...Array(8)].map((_, i) => (
              <rect
                key={i}
                x="47"
                y="15"
                width="6"
                height="10"
                rx="1"
                fill="#8b6914"
                transform={`rotate(${i * 45} 50 50)`}
              />
            ))}
            <circle cx="50" cy="50" r="6" fill="#5a4510" />
          </svg>
        </div>

        {/* Small gear 2 */}
        <div
          className="absolute left-8 bottom-8 w-12 h-12"
          style={{ transform: `rotate(${smallGearRotation * 1.5}deg)` }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="30" fill="none" stroke="#5a4510" strokeWidth="3" />
            {[...Array(6)].map((_, i) => (
              <rect
                key={i}
                x="47"
                y="15"
                width="6"
                height="10"
                rx="1"
                fill="#5a4510"
                transform={`rotate(${i * 60} 50 50)`}
              />
            ))}
          </svg>
        </div>

        {/* Progress indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
          <div className="font-mono text-3xl font-bold" style={{ color: '#daa520' }}>
            {progress}%
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="px-6 py-2 rounded font-mono text-sm transition-all"
          style={{
            background: isRunning
              ? 'linear-gradient(180deg, #8b6914, #5a4510)'
              : 'linear-gradient(180deg, #cd7f32, #8b6914)',
            border: '2px solid #5a4510',
            color: '#fff',
            boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
          }}
        >
          {isRunning ? 'STOP' : 'START'}
        </button>
        <button
          onClick={() => setProgress(0)}
          className="px-6 py-2 rounded font-mono text-sm"
          style={{
            background: 'linear-gradient(180deg, #3d2a14, #1a1208)',
            border: '2px solid #5a4510',
            color: '#daa520',
          }}
        >
          RESET
        </button>
      </div>
    </div>
  );
};

// --- RIVETED PANEL CARD ---
export const RivetedPanelCard = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-8" style={{ background: '#0f0a04' }}>
      <div
        className="relative w-72 transition-all duration-500"
        style={{
          transform: isOpen ? 'rotateY(0deg)' : 'rotateY(-5deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Main panel */}
        <div
          className="relative p-6 rounded-lg overflow-hidden cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: 'linear-gradient(135deg, #3d2a14 0%, #2d1f0d 50%, #1a1208 100%)',
            border: '4px solid #5a4510',
            boxShadow: `
              inset 0 2px 4px rgba(255,255,255,0.1),
              inset 0 -4px 8px rgba(0,0,0,0.3),
              0 8px 16px rgba(0,0,0,0.5)
            `,
          }}
        >
          {/* Corner rivets */}
          {[
            { top: 8, left: 8 },
            { top: 8, right: 8 },
            { bottom: 8, left: 8 },
            { bottom: 8, right: 8 },
          ].map((pos, i) => (
            <div
              key={i}
              className="absolute w-4 h-4 rounded-full"
              style={{
                ...pos,
                background: 'radial-gradient(circle at 30% 30%, #cd7f32, #5a4510)',
                boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.3), 0 2px 2px rgba(0,0,0,0.5)',
              }}
            />
          ))}

          {/* Nameplate */}
          <div
            className="mb-4 px-4 py-2 rounded"
            style={{
              background: 'linear-gradient(180deg, #daa520, #8b6914)',
              boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.3)',
            }}
          >
            <h3 className="font-serif text-lg font-bold text-center" style={{ color: '#2d1f0d' }}>
              SPECIFICATION
            </h3>
          </div>

          {/* Content with slide animation */}
          <div
            className="overflow-hidden transition-all duration-500"
            style={{ maxHeight: isOpen ? '200px' : '60px' }}
          >
            <div className="space-y-2 text-sm" style={{ color: '#daa520' }}>
              <div className="flex justify-between border-b border-[#5a4510] pb-1">
                <span>Power Output:</span>
                <span className="font-mono">2400 HP</span>
              </div>
              <div className="flex justify-between border-b border-[#5a4510] pb-1">
                <span>Steam Pressure:</span>
                <span className="font-mono">180 PSI</span>
              </div>
              {isOpen && (
                <>
                  <div className="flex justify-between border-b border-[#5a4510] pb-1">
                    <span>Boiler Temp:</span>
                    <span className="font-mono">450°F</span>
                  </div>
                  <div className="flex justify-between border-b border-[#5a4510] pb-1">
                    <span>Coal Capacity:</span>
                    <span className="font-mono">12 tons</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Est. Year:</span>
                    <span className="font-mono">1892</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Expand indicator */}
          <div className="mt-4 text-center">
            <span
              className="text-xs transition-transform duration-300 inline-block"
              style={{
                color: '#8b6914',
                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            >
              ▼ {isOpen ? 'COLLAPSE' : 'EXPAND'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- TELEGRAPH INPUT ---
export const TelegraphInput = () => {
  const [message, setMessage] = useState('');
  const [morseDisplay, setMorseDisplay] = useState('');
  const [isTransmitting, setIsTransmitting] = useState(false);
  const keyRef = useRef<HTMLDivElement>(null);

  const charToMorse: Record<string, string> = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', ' ': '/'
  };

  const convertToMorse = (text: string) => {
    return text.toUpperCase().split('').map(char => charToMorse[char] || '').join(' ');
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMessage(value);
    setMorseDisplay(convertToMorse(value));
  };

  const transmit = async () => {
    setIsTransmitting(true);
    for (const char of morseDisplay) {
      if (char === '.' || char === '-') {
        // Visual feedback
        if (keyRef.current) {
          keyRef.current.style.transform = 'translateY(4px)';
          await new Promise(r => setTimeout(r, char === '.' ? 100 : 300));
          keyRef.current.style.transform = 'translateY(0)';
          await new Promise(r => setTimeout(r, 100));
        }
      } else {
        await new Promise(r => setTimeout(r, 200));
      }
    }
    setIsTransmitting(false);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-8" style={{ background: 'linear-gradient(180deg, #2d1f0d 0%, #1a1208 100%)' }}>
      {/* Telegraph machine */}
      <div
        className="relative p-6 rounded-lg"
        style={{
          background: 'linear-gradient(180deg, #3d2a14 0%, #2d1f0d 100%)',
          border: '4px solid #5a4510',
          boxShadow: 'inset 0 0 20px rgba(0,0,0,0.3), 0 8px 16px rgba(0,0,0,0.5)',
        }}
      >
        {/* Input display (paper tape style) */}
        <div
          className="mb-4 p-3 rounded font-mono text-sm"
          style={{
            background: '#f5f0e0',
            border: '2px solid #8b6914',
            color: '#2d1f0d',
            minHeight: '60px',
          }}
        >
          <div className="text-xs text-[#8b6914] mb-1">MESSAGE:</div>
          <input
            type="text"
            value={message}
            onChange={handleInput}
            placeholder="Type message..."
            className="w-full bg-transparent outline-none font-mono"
            style={{ color: '#2d1f0d' }}
            maxLength={20}
          />
        </div>

        {/* Morse display */}
        <div
          className="mb-4 p-3 rounded font-mono text-lg tracking-widest overflow-x-auto"
          style={{
            background: '#1a1208',
            border: '2px solid #5a4510',
            color: '#daa520',
            minHeight: '50px',
          }}
        >
          {morseDisplay || '...'}
        </div>

        {/* Telegraph key */}
        <div className="flex justify-center">
          <div
            ref={keyRef}
            className="relative cursor-pointer transition-transform duration-100"
            onClick={transmit}
            style={{ pointerEvents: isTransmitting ? 'none' : 'auto' }}
          >
            {/* Key base */}
            <div
              className="w-32 h-8 rounded"
              style={{
                background: 'linear-gradient(180deg, #1a1208 0%, #0f0a04 100%)',
                border: '2px solid #5a4510',
              }}
            />
            {/* Key lever */}
            <div
              className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 rounded"
              style={{
                background: 'linear-gradient(180deg, #cd7f32 0%, #8b6914 100%)',
                border: '2px solid #5a4510',
                boxShadow: '0 2px 4px rgba(0,0,0,0.5)',
              }}
            >
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#5a4510]" />
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="mt-4 text-center">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded font-mono text-xs"
            style={{
              background: isTransmitting ? '#cd7f3240' : '#5a451040',
              color: isTransmitting ? '#daa520' : '#8b6914',
            }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{
                background: isTransmitting ? '#daa520' : '#5a4510',
                animation: isTransmitting ? 'pulse 0.5s infinite' : 'none',
              }}
            />
            {isTransmitting ? 'TRANSMITTING...' : 'READY'}
          </div>
        </div>
      </div>

      <p className="mt-4 text-xs font-mono" style={{ color: '#8b6914' }}>
        CLICK KEY TO TRANSMIT
      </p>
    </div>
  );
};

// --- BOILER GAUGE ---
export const BoilerGauge = () => {
  const [temperature, setTemperature] = useState(350);
  const [isHeating, setIsHeating] = useState(false);
  const [flames, setFlames] = useState<number[]>([]);

  useEffect(() => {
    if (!isHeating) return;
    const interval = setInterval(() => {
      setTemperature(t => Math.min(500, t + 2));
      if (Math.random() > 0.5) {
        setFlames(prev => [...prev.slice(-8), Date.now()]);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [isHeating]);

  useEffect(() => {
    if (isHeating) return;
    const interval = setInterval(() => {
      setTemperature(t => Math.max(200, t - 1));
    }, 100);
    return () => clearInterval(interval);
  }, [isHeating]);

  const tempPercentage = ((temperature - 200) / 300) * 100;
  const isDanger = temperature > 450;

  return (
    <div className="h-full flex flex-col items-center justify-center p-8" style={{ background: '#1a1208' }}>
      {/* Boiler */}
      <div className="relative">
        {/* Boiler body */}
        <div
          className="w-48 h-64 rounded-t-full relative"
          style={{
            background: 'linear-gradient(90deg, #2d1f0d 0%, #5a4510 30%, #8b6914 50%, #5a4510 70%, #2d1f0d 100%)',
            border: '4px solid #3d2a14',
            boxShadow: 'inset 0 0 30px rgba(0,0,0,0.5)',
          }}
        >
          {/* Rivets */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 rounded-full"
              style={{
                background: 'radial-gradient(circle at 30% 30%, #cd7f32, #5a4510)',
                top: 20 + Math.floor(i / 4) * 80,
                left: i % 4 === 0 ? 10 : i % 4 === 3 ? 'auto' : undefined,
                right: i % 4 === 3 ? 10 : undefined,
                ...(i % 4 === 1 ? { left: '30%' } : {}),
                ...(i % 4 === 2 ? { left: '60%' } : {}),
              }}
            />
          ))}

          {/* Temperature gauge window */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-16 w-20 h-32 rounded-lg overflow-hidden"
            style={{
              background: '#0f0a04',
              border: '3px solid #8b6914',
              boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8)',
            }}
          >
            {/* Mercury */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 transition-all duration-200"
              style={{
                height: `${tempPercentage}%`,
                background: isDanger
                  ? 'linear-gradient(180deg, #ff4444 0%, #cc0000 100%)'
                  : 'linear-gradient(180deg, #cd7f32 0%, #8b6914 100%)',
                boxShadow: `0 0 10px ${isDanger ? '#ff4444' : '#cd7f32'}`,
              }}
            />

            {/* Temperature marks */}
            {[200, 300, 400, 500].map((mark) => (
              <div
                key={mark}
                className="absolute right-1 flex items-center gap-1"
                style={{ bottom: `${((mark - 200) / 300) * 100}%` }}
              >
                <span className="text-[8px] font-mono text-[#8b6914]">{mark}</span>
              </div>
            ))}
          </div>

          {/* Digital readout */}
          <div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded"
            style={{
              background: '#0f0a04',
              border: '2px solid #5a4510',
            }}
          >
            <span
              className="font-mono text-xl font-bold"
              style={{
                color: isDanger ? '#ff4444' : '#daa520',
                textShadow: `0 0 5px ${isDanger ? '#ff4444' : '#daa520'}`,
              }}
            >
              {temperature}°F
            </span>
          </div>
        </div>

        {/* Flames at bottom */}
        <div className="relative h-8 flex justify-center">
          {flames.map(id => (
            <div
              key={id}
              className="absolute w-4 h-8"
              style={{
                left: `${30 + Math.random() * 40}%`,
                background: 'linear-gradient(180deg, #ff6600, #ffcc00, transparent)',
                borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                animation: 'flicker 0.3s ease-out forwards',
              }}
            />
          ))}
        </div>
      </div>

      {/* Control */}
      <button
        onMouseDown={() => setIsHeating(true)}
        onMouseUp={() => setIsHeating(false)}
        onMouseLeave={() => setIsHeating(false)}
        className="mt-4 px-6 py-3 rounded font-mono text-sm transition-all"
        style={{
          background: isHeating
            ? 'linear-gradient(180deg, #ff6600, #cc4400)'
            : 'linear-gradient(180deg, #cd7f32, #8b6914)',
          border: '3px solid #5a4510',
          color: '#fff',
          boxShadow: isHeating ? '0 0 20px #ff660060' : 'none',
        }}
      >
        {isHeating ? '🔥 HEATING...' : 'HOLD TO HEAT'}
      </button>

      <style>{`
        @keyframes flicker {
          0% { opacity: 1; transform: scaleY(1) translateY(0); }
          100% { opacity: 0; transform: scaleY(1.5) translateY(-20px); }
        }
      `}</style>
    </div>
  );
};

// --- PIPE VALVE TOGGLE ---
export const PipeValveToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [steamParticles, setSteamParticles] = useState<number[]>([]);

  useEffect(() => {
    if (!isOpen) {
      setSteamParticles([]);
      return;
    }
    const interval = setInterval(() => {
      setSteamParticles(prev => [...prev.slice(-10), Date.now()]);
    }, 200);
    return () => clearInterval(interval);
  }, [isOpen]);

  return (
    <div className="h-full flex items-center justify-center p-8" style={{ background: '#1a1208' }}>
      <div className="relative">
        {/* Pipe */}
        <div
          className="w-80 h-16 flex items-center"
          style={{
            background: 'linear-gradient(180deg, #5a4510 0%, #3d2a14 50%, #5a4510 100%)',
            borderRadius: '8px',
            boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.3), inset 0 -4px 8px rgba(255,255,255,0.1)',
          }}
        >
          {/* Pipe segments */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-full w-1"
              style={{
                marginLeft: i === 0 ? 0 : 'auto',
                background: 'linear-gradient(180deg, #3d2a14, #5a4510)',
              }}
            />
          ))}

          {/* Flow indicator */}
          {isOpen && (
            <div
              className="absolute inset-y-4 left-4 right-4 rounded"
              style={{
                background: 'linear-gradient(90deg, transparent, #daa52040, #daa52060, #daa52040, transparent)',
                animation: 'flowPulse 1s linear infinite',
              }}
            />
          )}
        </div>

        {/* Valve wheel */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <div
            className="w-20 h-20 rounded-full transition-transform duration-500"
            style={{
              background: 'radial-gradient(circle at 30% 30%, #cd7f32, #8b6914)',
              border: '4px solid #5a4510',
              boxShadow: '0 4px 8px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.2)',
              transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
            }}
          >
            {/* Wheel spokes */}
            {[0, 45, 90, 135].map(angle => (
              <div
                key={angle}
                className="absolute left-1/2 top-1/2 w-1 h-14 -translate-x-1/2 -translate-y-1/2 rounded"
                style={{
                  background: 'linear-gradient(180deg, #3d2a14, #8b6914, #3d2a14)',
                  transform: `rotate(${angle}deg)`,
                }}
              />
            ))}
            {/* Center cap */}
            <div
              className="absolute left-1/2 top-1/2 w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background: 'radial-gradient(circle at 30% 30%, #daa520, #8b6914)',
                border: '2px solid #5a4510',
              }}
            />
          </div>
        </button>

        {/* Steam particles when open */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2">
          {steamParticles.map(id => (
            <div
              key={id}
              className="absolute w-6 h-6 rounded-full"
              style={{
                left: `${(Math.random() - 0.5) * 40}px`,
                background: 'radial-gradient(circle, rgba(255,255,255,0.6), transparent)',
                animation: 'steamRise 1s ease-out forwards',
              }}
            />
          ))}
        </div>

        {/* Status indicator */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
          <span
            className="font-mono text-sm font-bold"
            style={{ color: isOpen ? '#4ade80' : '#ff4444' }}
          >
            {isOpen ? 'FLOW: ON' : 'FLOW: OFF'}
          </span>
        </div>
      </div>

      <style>{`
        @keyframes flowPulse {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes steamRise {
          0% { opacity: 0.8; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-60px) scale(2); }
        }
      `}</style>
    </div>
  );
};

// --- AIRSHIP ALTIMETER ---
export const AirshipAltimeter = () => {
  const [altitude, setAltitude] = useState(5000);
  const [isAscending, setIsAscending] = useState(false);
  const [isDescending, setIsDescending] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAltitude(a => {
        if (isAscending) return Math.min(15000, a + 50);
        if (isDescending) return Math.max(0, a - 50);
        return a;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [isAscending, isDescending]);

  const needleAngle = (altitude / 15000) * 270 - 135;

  return (
    <div className="h-full flex flex-col items-center justify-center p-8" style={{ background: '#1a1208' }}>
      {/* Altimeter face */}
      <div
        className="relative w-56 h-56 rounded-full"
        style={{
          background: 'radial-gradient(circle at 30% 30%, #f5e6c8, #d4c4a8)',
          border: '8px solid #8b6914',
          boxShadow: '0 8px 16px rgba(0,0,0,0.5), inset 0 0 30px rgba(0,0,0,0.2)',
        }}
      >
        {/* Brass bezel */}
        <div
          className="absolute inset-1 rounded-full"
          style={{
            border: '4px solid',
            borderColor: '#cd7f32 #8b6914 #5a4510 #cd7f32',
          }}
        />

        {/* Scale markings */}
        {[...Array(16)].map((_, i) => {
          const angle = -135 + i * 18;
          const isMajor = i % 2 === 0;
          return (
            <div
              key={i}
              className="absolute left-1/2 top-1/2"
              style={{
                transform: `rotate(${angle}deg)`,
                transformOrigin: '0 0',
              }}
            >
              <div
                className="absolute rounded"
                style={{
                  width: isMajor ? 3 : 1,
                  height: isMajor ? 16 : 10,
                  background: '#3d2a14',
                  transform: 'translateX(-50%) translateY(-85px)',
                }}
              />
              {isMajor && (
                <span
                  className="absolute font-mono text-xs font-bold"
                  style={{
                    color: '#3d2a14',
                    transform: `translateY(-65px) rotate(${-angle}deg)`,
                    transformOrigin: 'center',
                  }}
                >
                  {(i / 2) * 1875}
                </span>
              )}
            </div>
          );
        })}

        {/* Needle */}
        <div
          className="absolute left-1/2 top-1/2 w-2 h-24 origin-bottom transition-transform duration-200"
          style={{
            transform: `translateX(-50%) translateY(-100%) rotate(${needleAngle}deg)`,
            background: 'linear-gradient(180deg, #1a1208 0%, #cd7f32 30%, #1a1208 100%)',
            clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
          }}
        />

        {/* Center hub */}
        <div
          className="absolute left-1/2 top-1/2 w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 30%, #cd7f32, #5a4510)',
            border: '2px solid #3d2a14',
          }}
        />

        {/* Unit label */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center">
          <span className="font-serif text-xs" style={{ color: '#3d2a14' }}>FEET</span>
        </div>
      </div>

      {/* Digital readout */}
      <div
        className="mt-4 px-6 py-2 rounded"
        style={{
          background: '#0f0a04',
          border: '3px solid #8b6914',
        }}
      >
        <span className="font-mono text-2xl font-bold" style={{ color: '#daa520' }}>
          {altitude.toLocaleString()} ft
        </span>
      </div>

      {/* Controls */}
      <div className="mt-4 flex gap-4">
        <button
          onMouseDown={() => setIsAscending(true)}
          onMouseUp={() => setIsAscending(false)}
          onMouseLeave={() => setIsAscending(false)}
          className="px-4 py-2 rounded font-mono text-sm"
          style={{
            background: isAscending ? '#4ade8030' : '#3d2a14',
            border: '2px solid #8b6914',
            color: '#daa520',
          }}
        >
          ▲ ASCEND
        </button>
        <button
          onMouseDown={() => setIsDescending(true)}
          onMouseUp={() => setIsDescending(false)}
          onMouseLeave={() => setIsDescending(false)}
          className="px-4 py-2 rounded font-mono text-sm"
          style={{
            background: isDescending ? '#ff444430' : '#3d2a14',
            border: '2px solid #8b6914',
            color: '#daa520',
          }}
        >
          ▼ DESCEND
        </button>
      </div>
    </div>
  );
};

// --- POCKET WATCH TIMER ---
export const PocketWatchTimer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  const secondAngle = (seconds % 60) * 6;
  const minuteAngle = Math.floor(seconds / 60) * 6;

  return (
    <div className="h-full flex flex-col items-center justify-center p-8" style={{ background: '#1a1208' }}>
      <div className="relative">
        {/* Chain */}
        <div
          className="absolute -top-20 left-1/2 -translate-x-1/2 w-1 h-20"
          style={{
            background: 'linear-gradient(90deg, #5a4510, #daa520, #5a4510)',
          }}
        />

        {/* Watch case */}
        <div
          className="relative w-48 h-48 rounded-full cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: 'radial-gradient(circle at 30% 30%, #daa520, #8b6914)',
            border: '6px solid #5a4510',
            boxShadow: '0 8px 20px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.3)',
          }}
        >
          {/* Lid (cover) */}
          <div
            className="absolute inset-0 rounded-full transition-transform duration-700 origin-left"
            style={{
              background: 'radial-gradient(circle at 30% 30%, #daa520, #8b6914)',
              transform: isOpen ? 'rotateY(-160deg)' : 'rotateY(0deg)',
              backfaceVisibility: 'hidden',
              zIndex: isOpen ? 0 : 10,
            }}
          >
            {/* Engraved pattern on lid */}
            <div className="absolute inset-4 rounded-full border-4 border-[#8b6914]" />
            <div className="absolute inset-8 rounded-full border-2 border-[#8b6914]" />
          </div>

          {/* Watch face */}
          <div
            className="absolute inset-2 rounded-full"
            style={{
              background: 'radial-gradient(circle, #f5f0e0, #e8dcc8)',
              boxShadow: 'inset 0 0 20px rgba(0,0,0,0.1)',
            }}
          >
            {/* Hour markers */}
            {[...Array(12)].map((_, i) => {
              const angle = i * 30;
              return (
                <div
                  key={i}
                  className="absolute left-1/2 top-1/2"
                  style={{ transform: `rotate(${angle}deg)` }}
                >
                  <div
                    className="absolute w-0.5 h-3 rounded"
                    style={{
                      background: '#3d2a14',
                      transform: 'translateX(-50%) translateY(-70px)',
                    }}
                  />
                </div>
              );
            })}

            {/* Minute hand */}
            <div
              className="absolute left-1/2 top-1/2 w-1.5 h-16 origin-bottom rounded-full"
              style={{
                transform: `translateX(-50%) translateY(-100%) rotate(${minuteAngle}deg)`,
                background: 'linear-gradient(180deg, #3d2a14, #1a1208)',
              }}
            />

            {/* Second hand */}
            <div
              className="absolute left-1/2 top-1/2 w-0.5 h-20 origin-bottom rounded-full"
              style={{
                transform: `translateX(-50%) translateY(-100%) rotate(${secondAngle}deg)`,
                background: '#cd7f32',
              }}
            />

            {/* Center */}
            <div
              className="absolute left-1/2 top-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background: 'radial-gradient(circle at 30% 30%, #cd7f32, #5a4510)',
              }}
            />

            {/* Time display */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
              <span className="font-mono text-sm" style={{ color: '#3d2a14' }}>
                {Math.floor(seconds / 60).toString().padStart(2, '0')}:{(seconds % 60).toString().padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        {/* Crown button */}
        <div
          className="absolute -right-4 top-1/2 -translate-y-1/2 w-6 h-8 rounded-r cursor-pointer"
          onClick={(e) => { e.stopPropagation(); setIsRunning(!isRunning); }}
          style={{
            background: 'linear-gradient(90deg, #8b6914, #daa520, #8b6914)',
            border: '2px solid #5a4510',
          }}
        />
      </div>

      {/* Controls */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="px-4 py-2 rounded font-mono text-sm"
          style={{
            background: isRunning ? '#4ade8030' : '#cd7f3220',
            border: '2px solid',
            borderColor: isRunning ? '#4ade80' : '#cd7f32',
            color: isRunning ? '#4ade80' : '#cd7f32',
          }}
        >
          {isRunning ? 'PAUSE' : 'START'}
        </button>
        <button
          onClick={() => { setIsRunning(false); setSeconds(0); }}
          className="px-4 py-2 rounded font-mono text-sm"
          style={{
            background: '#3d2a14',
            border: '2px solid #8b6914',
            color: '#daa520',
          }}
        >
          RESET
        </button>
      </div>
    </div>
  );
};

// --- LEATHER STRAP TABS ---
export const LeatherStrapTabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { name: 'Journal', icon: '📖' },
    { name: 'Maps', icon: '🗺️' },
    { name: 'Tools', icon: '🔧' },
    { name: 'Notes', icon: '📝' },
  ];

  return (
    <div className="h-full flex flex-col items-center justify-center p-8" style={{ background: '#1a1208' }}>
      {/* Tab strip */}
      <div className="flex gap-2">
        {tabs.map((tab, i) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(i)}
            className="relative transition-all duration-300"
            style={{
              transform: activeTab === i ? 'translateY(-8px)' : 'translateY(0)',
            }}
          >
            {/* Leather strap */}
            <div
              className="px-6 py-4 rounded-t-lg"
              style={{
                background: activeTab === i
                  ? 'linear-gradient(180deg, #8b4513 0%, #654321 100%)'
                  : 'linear-gradient(180deg, #5a3a1a 0%, #3d2a14 100%)',
                border: '2px solid #3d2a14',
                borderBottom: activeTab === i ? '2px solid #2d1f0d' : '2px solid #3d2a14',
                boxShadow: activeTab === i
                  ? 'inset 0 2px 4px rgba(255,255,255,0.1), 0 -2px 8px rgba(0,0,0,0.3)'
                  : 'inset 0 -2px 4px rgba(0,0,0,0.3)',
              }}
            >
              {/* Stitching */}
              <div
                className="absolute top-1 left-2 right-2 h-px"
                style={{
                  backgroundImage: 'repeating-linear-gradient(90deg, #daa520 0px, #daa520 4px, transparent 4px, transparent 8px)',
                }}
              />

              <span className="text-xl mb-1 block">{tab.icon}</span>
              <span
                className="font-serif text-sm"
                style={{ color: activeTab === i ? '#f5e6c8' : '#8b6914' }}
              >
                {tab.name}
              </span>

              {/* Brass rivet */}
              <div
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, #daa520, #8b6914)',
                  border: '1px solid #5a4510',
                }}
              />
            </div>
          </button>
        ))}
      </div>

      {/* Content panel */}
      <div
        className="w-96 h-48 p-6 rounded-lg"
        style={{
          background: 'linear-gradient(180deg, #2d1f0d 0%, #1a1208 100%)',
          border: '4px solid #3d2a14',
          boxShadow: 'inset 0 0 30px rgba(0,0,0,0.3)',
        }}
      >
        <h3 className="font-serif text-xl mb-3" style={{ color: '#daa520' }}>
          {tabs[activeTab].icon} {tabs[activeTab].name}
        </h3>
        <p className="text-sm" style={{ color: '#8b6914' }}>
          Selected section: {tabs[activeTab].name}. This leather-bound collection contains your {tabs[activeTab].name.toLowerCase()}.
        </p>
      </div>
    </div>
  );
};

// Export all components
export const steampunkComponents = {
  'brass-gear-button': BrassGearButton,
  'steam-pressure-slider': SteamPressureSlider,
  'clockwork-progress': ClockworkProgress,
  'riveted-panel': RivetedPanelCard,
  'telegraph-input': TelegraphInput,
  'boiler-gauge': BoilerGauge,
  'pipe-valve-toggle': PipeValveToggle,
  'airship-altimeter': AirshipAltimeter,
  'pocket-watch-timer': PocketWatchTimer,
  'leather-strap-tabs': LeatherStrapTabs,
};
