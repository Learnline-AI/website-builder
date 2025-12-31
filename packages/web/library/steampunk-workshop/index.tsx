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

// --- STEAMPUNK PRESSURE DIAL ---
export const SteampunkPressureDial = () => {
  const [pressure, setPressure] = useState(45);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Simulate slight pressure fluctuation
    const interval = setInterval(() => {
      setPressure(p => {
        const fluctuation = (Math.random() - 0.5) * 2;
        return Math.max(0, Math.min(100, p + fluctuation));
      });
    }, 200);
    return () => clearInterval(interval);
  }, []);

  const needleAngle = (pressure / 100) * 240 - 120;
  const isDanger = pressure > 80;
  const isWarning = pressure > 60 && pressure <= 80;

  return (
    <div className="h-full flex flex-col items-center justify-center p-8" style={{ background: '#1a1208' }}>
      {/* Dial housing */}
      <div
        className="relative w-64 h-64 rounded-full cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          background: 'radial-gradient(circle at 30% 30%, #3d2a14, #1a1208)',
          border: '8px solid',
          borderColor: '#cd7f32 #8b6914 #5a4510 #cd7f32',
          boxShadow: `
            0 8px 20px rgba(0,0,0,0.6),
            inset 0 0 40px rgba(0,0,0,0.4),
            ${isHovered ? '0 0 30px #cd7f3240' : ''}
          `,
        }}
      >
        {/* Inner brass bezel */}
        <div
          className="absolute inset-3 rounded-full"
          style={{
            border: '4px solid',
            borderColor: '#daa520 #8b6914 #5a4510 #daa520',
          }}
        />

        {/* Dial face */}
        <div
          className="absolute inset-6 rounded-full"
          style={{
            background: 'radial-gradient(circle, #f5e6c8 0%, #d4c4a8 100%)',
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.2)',
          }}
        >
          {/* Pressure zones */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="dialGreenZone" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#22c55e" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="dialYellowZone" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#eab308" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#eab308" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="dialRedZone" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <path d="M20 70 A35 35 0 0 1 35 35" fill="none" stroke="url(#dialGreenZone)" strokeWidth="8" />
            <path d="M35 35 A35 35 0 0 1 65 35" fill="none" stroke="url(#dialYellowZone)" strokeWidth="8" />
            <path d="M65 35 A35 35 0 0 1 80 70" fill="none" stroke="url(#dialRedZone)" strokeWidth="8" />
          </svg>

          {/* Scale markings */}
          {[...Array(11)].map((_, i) => {
            const angle = -120 + i * 24;
            const isMajor = i % 2 === 0;
            return (
              <div
                key={i}
                className="absolute left-1/2 top-1/2"
                style={{ transform: `rotate(${angle}deg)`, transformOrigin: '0 0' }}
              >
                <div
                  className="absolute rounded"
                  style={{
                    width: isMajor ? 3 : 1.5,
                    height: isMajor ? 12 : 8,
                    background: '#3d2a14',
                    transform: 'translateX(-50%) translateY(-72px)',
                  }}
                />
                {isMajor && (
                  <span
                    className="absolute font-mono text-xs font-bold"
                    style={{
                      color: '#3d2a14',
                      transform: `translateY(-55px) rotate(${-angle}deg)`,
                    }}
                  >
                    {i * 10}
                  </span>
                )}
              </div>
            );
          })}

          {/* Needle */}
          <div
            className="absolute left-1/2 top-1/2 transition-transform duration-100"
            style={{
              transform: `translate(-50%, -50%) rotate(${needleAngle}deg)`,
              transformOrigin: 'center center',
            }}
          >
            <div
              className="w-1 h-20 rounded-t-full"
              style={{
                background: 'linear-gradient(180deg, #1a1208 0%, #cd7f32 50%, #1a1208 100%)',
                transformOrigin: 'bottom center',
                transform: 'translateY(-50%)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
              }}
            />
          </div>

          {/* Center cap */}
          <div
            className="absolute left-1/2 top-1/2 w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background: 'radial-gradient(circle at 30% 30%, #daa520, #8b6914)',
              border: '2px solid #5a4510',
              boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
            }}
          />

          {/* Label */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
            <span className="font-serif text-xs font-bold" style={{ color: '#3d2a14' }}>PSI</span>
          </div>
        </div>

        {/* Corner screws */}
        {[45, 135, 225, 315].map(angle => (
          <div
            key={angle}
            className="absolute w-4 h-4 rounded-full"
            style={{
              background: 'radial-gradient(circle at 30% 30%, #cd7f32, #5a4510)',
              boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.3), 0 2px 2px rgba(0,0,0,0.5)',
              left: '50%',
              top: '50%',
              transform: `rotate(${angle}deg) translateY(-110px) translateX(-50%)`,
            }}
          >
            <div
              className="absolute inset-1 rounded-full"
              style={{ background: 'linear-gradient(135deg, transparent 40%, #8b6914 50%, transparent 60%)' }}
            />
          </div>
        ))}
      </div>

      {/* Digital readout */}
      <div
        className="mt-6 px-6 py-3 rounded"
        style={{
          background: '#0f0a04',
          border: '3px solid #8b6914',
          boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)',
        }}
      >
        <span
          className="font-mono text-2xl font-bold"
          style={{
            color: isDanger ? '#ef4444' : isWarning ? '#eab308' : '#daa520',
            textShadow: `0 0 10px ${isDanger ? '#ef4444' : isWarning ? '#eab308' : '#daa520'}40`,
          }}
        >
          {pressure.toFixed(1)} PSI
        </span>
      </div>

      {/* Status label */}
      <div className="mt-2 font-mono text-xs" style={{ color: '#8b6914' }}>
        {isDanger ? 'CRITICAL PRESSURE' : isWarning ? 'HIGH PRESSURE' : 'NOMINAL'}
      </div>
    </div>
  );
};

// --- STEAMPUNK TELEGRAPH INPUT ---
export const SteampunkTelegraphInput = () => {
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [tickerTape, setTickerTape] = useState<string[]>([]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && message.trim()) {
      setTickerTape(prev => [...prev.slice(-3), message]);
      setMessage('');
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-8" style={{ background: 'linear-gradient(180deg, #1a1208 0%, #0f0a04 100%)' }}>
      {/* Telegraph machine housing */}
      <div
        className="relative p-8 rounded-lg"
        style={{
          background: 'linear-gradient(135deg, #3d2a14 0%, #2d1f0d 50%, #1a1208 100%)',
          border: '4px solid #5a4510',
          boxShadow: `
            inset 0 2px 4px rgba(255,255,255,0.1),
            inset 0 -4px 8px rgba(0,0,0,0.3),
            0 8px 24px rgba(0,0,0,0.5)
          `,
        }}
      >
        {/* Corner rivets */}
        {[
          { top: 12, left: 12 },
          { top: 12, right: 12 },
          { bottom: 12, left: 12 },
          { bottom: 12, right: 12 },
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

        {/* Ticker tape output */}
        <div
          className="mb-4 p-3 rounded overflow-hidden"
          style={{
            background: '#f5e6c8',
            border: '2px solid #8b6914',
            minHeight: '60px',
            maxHeight: '100px',
          }}
        >
          <div className="text-xs font-mono" style={{ color: '#8b6914' }}>RECEIVED MESSAGES:</div>
          {tickerTape.map((msg, i) => (
            <div key={i} className="font-mono text-sm truncate" style={{ color: '#3d2a14' }}>
              &gt; {msg}
            </div>
          ))}
          {tickerTape.length === 0 && (
            <div className="font-mono text-sm italic" style={{ color: '#8b6914' }}>No messages yet...</div>
          )}
        </div>

        {/* Input mechanism */}
        <div className="relative">
          {/* Paper roll housing */}
          <div
            className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-12 rounded"
            style={{
              background: 'linear-gradient(90deg, #8b6914, #cd7f32, #8b6914)',
              border: '2px solid #5a4510',
            }}
          />
          <div
            className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-12 rounded"
            style={{
              background: 'linear-gradient(90deg, #8b6914, #cd7f32, #8b6914)',
              border: '2px solid #5a4510',
            }}
          />

          {/* Input field styled as paper tape */}
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Type message and press Enter..."
            className="w-72 px-4 py-3 font-mono text-sm outline-none"
            style={{
              background: '#f5f0e0',
              border: `3px solid ${isFocused ? '#daa520' : '#8b6914'}`,
              borderRadius: '4px',
              color: '#2d1f0d',
              boxShadow: isFocused ? '0 0 10px #daa52040' : 'inset 0 2px 4px rgba(0,0,0,0.1)',
            }}
          />

          {/* Perforations on paper */}
          <div className="absolute top-0 left-4 right-4 flex justify-between">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: '#d4c4a8', marginTop: '-2px' }}
              />
            ))}
          </div>
          <div className="absolute bottom-0 left-4 right-4 flex justify-between">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: '#d4c4a8', marginBottom: '-2px' }}
              />
            ))}
          </div>
        </div>

        {/* Telegraph key indicator */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{
              background: isFocused ? '#daa520' : '#5a4510',
              boxShadow: isFocused ? '0 0 10px #daa520' : 'none',
            }}
          />
          <span className="font-mono text-xs" style={{ color: '#8b6914' }}>
            {isFocused ? 'TRANSMITTING' : 'STANDBY'}
          </span>
        </div>
      </div>

      <p className="mt-4 text-xs font-mono text-center" style={{ color: '#8b6914' }}>
        WESTERN UNION TELEGRAPH CO. - EST. 1851
      </p>
    </div>
  );
};

// --- STEAMPUNK RIVET BADGE ---
export const SteampunkRivetBadge = () => {
  const [isHovered, setIsHovered] = useState(false);

  const badges = [
    { label: 'ENGINEER', level: 'MASTER', color: '#daa520' },
    { label: 'MECHANIC', level: 'SENIOR', color: '#cd7f32' },
    { label: 'INVENTOR', level: 'ELITE', color: '#b87333' },
  ];

  return (
    <div className="h-full flex items-center justify-center gap-6 p-8" style={{ background: '#1a1208' }}>
      {badges.map((badge) => (
        <div
          key={badge.label}
          className="relative cursor-pointer transition-transform duration-300"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
        >
          {/* Badge body */}
          <div
            className="relative px-6 py-4 rounded-lg"
            style={{
              background: `linear-gradient(135deg, ${badge.color} 0%, #8b6914 50%, #5a4510 100%)`,
              border: '3px solid #3d2a14',
              boxShadow: `
                inset 0 2px 4px rgba(255,255,255,0.2),
                inset 0 -2px 4px rgba(0,0,0,0.3),
                0 4px 8px rgba(0,0,0,0.4)
              `,
            }}
          >
            {/* Corner rivets */}
            {[
              { top: -4, left: -4 },
              { top: -4, right: -4 },
              { bottom: -4, left: -4 },
              { bottom: -4, right: -4 },
            ].map((pos, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  ...pos,
                  background: 'radial-gradient(circle at 30% 30%, #f5e6c8, #8b6914)',
                  boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 1px 2px rgba(0,0,0,0.5)',
                }}
              />
            ))}

            {/* Side rivets */}
            <div
              className="absolute w-2 h-2 rounded-full top-1/2 -translate-y-1/2"
              style={{
                left: -3,
                background: 'radial-gradient(circle at 30% 30%, #f5e6c8, #8b6914)',
              }}
            />
            <div
              className="absolute w-2 h-2 rounded-full top-1/2 -translate-y-1/2"
              style={{
                right: -3,
                background: 'radial-gradient(circle at 30% 30%, #f5e6c8, #8b6914)',
              }}
            />

            {/* Embossed text */}
            <div className="text-center">
              <div
                className="font-serif text-lg font-bold tracking-wider"
                style={{
                  color: '#1a1208',
                  textShadow: '0 1px 0 rgba(255,255,255,0.3)',
                }}
              >
                {badge.label}
              </div>
              <div
                className="font-mono text-xs mt-1 px-2 py-0.5 rounded"
                style={{
                  background: '#1a1208',
                  color: badge.color,
                }}
              >
                {badge.level}
              </div>
            </div>
          </div>

          {/* Hanging loop */}
          <div
            className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-4 rounded-t-full"
            style={{
              background: 'linear-gradient(180deg, #8b6914, #5a4510)',
              border: '2px solid #3d2a14',
              borderBottom: 'none',
            }}
          />
        </div>
      ))}
    </div>
  );
};

// --- STEAMPUNK PISTON PROGRESS ---
export const SteampunkPistonProgress = () => {
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setProgress(p => (p >= 100 ? 0 : p + 1));
    }, 80);
    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div className="h-full flex flex-col items-center justify-center p-8" style={{ background: '#1a1208' }}>
      {/* Piston housing */}
      <div className="relative">
        {/* Cylinder */}
        <div
          className="relative w-80 h-24 rounded-lg overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, #2d1f0d 0%, #1a1208 50%, #2d1f0d 100%)',
            border: '4px solid #5a4510',
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)',
          }}
        >
          {/* Progress track */}
          <div
            className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-8 rounded"
            style={{
              background: 'linear-gradient(180deg, #0f0a04 0%, #1a1208 100%)',
              border: '2px solid #3d2a14',
            }}
          >
            {/* Filled progress */}
            <div
              className="absolute left-0 top-0 bottom-0 rounded transition-all duration-75"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(180deg, #cd7f32, #8b6914)',
                boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.2)',
              }}
            />
          </div>

          {/* Piston head */}
          <div
            className="absolute top-2 bottom-2 w-16 rounded transition-all duration-75"
            style={{
              left: `${8 + (progress / 100) * 65}%`,
              background: 'linear-gradient(90deg, #5a4510, #cd7f32, #daa520, #cd7f32, #5a4510)',
              border: '3px solid #8b6914',
              boxShadow: '0 0 15px #cd7f3240, inset 0 0 10px rgba(0,0,0,0.3)',
            }}
          >
            {/* Piston rings */}
            <div className="absolute left-1 top-2 bottom-2 w-1 rounded" style={{ background: '#3d2a14' }} />
            <div className="absolute right-1 top-2 bottom-2 w-1 rounded" style={{ background: '#3d2a14' }} />
            <div className="absolute left-1/2 -translate-x-1/2 top-2 bottom-2 w-0.5" style={{ background: '#8b6914' }} />
          </div>

          {/* Steam vents */}
          {progress > 80 && (
            <>
              <div
                className="absolute right-2 top-1 w-4 h-4 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(255,255,255,0.5), transparent)',
                  animation: 'steamPuff 0.5s ease-out infinite',
                }}
              />
              <div
                className="absolute right-2 bottom-1 w-4 h-4 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(255,255,255,0.5), transparent)',
                  animation: 'steamPuff 0.5s ease-out infinite 0.25s',
                }}
              />
            </>
          )}
        </div>

        {/* Connecting rod visual */}
        <div
          className="absolute -right-8 top-1/2 -translate-y-1/2 w-8 h-4 rounded-r"
          style={{
            background: 'linear-gradient(180deg, #8b6914, #5a4510)',
            border: '2px solid #3d2a14',
            borderLeft: 'none',
          }}
        />

        {/* Flywheel */}
        <div
          className="absolute -right-20 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 30%, #cd7f32, #5a4510)',
            border: '4px solid #8b6914',
            transform: `translateY(-50%) rotate(${progress * 3.6}deg)`,
            boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
          }}
        >
          {/* Spokes */}
          {[0, 60, 120].map(angle => (
            <div
              key={angle}
              className="absolute left-1/2 top-1/2 w-1 h-12 -translate-x-1/2 -translate-y-1/2 rounded"
              style={{
                background: '#3d2a14',
                transform: `rotate(${angle}deg)`,
              }}
            />
          ))}
          <div
            className="absolute left-1/2 top-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: '#1a1208' }}
          />
        </div>
      </div>

      {/* Progress display */}
      <div className="mt-8 flex items-center gap-6">
        <div
          className="px-4 py-2 rounded"
          style={{
            background: '#0f0a04',
            border: '2px solid #8b6914',
          }}
        >
          <span className="font-mono text-xl font-bold" style={{ color: '#daa520' }}>
            {progress}%
          </span>
        </div>

        <button
          onClick={() => setIsRunning(!isRunning)}
          className="px-4 py-2 rounded font-mono text-sm transition-all"
          style={{
            background: isRunning
              ? 'linear-gradient(180deg, #8b6914, #5a4510)'
              : 'linear-gradient(180deg, #cd7f32, #8b6914)',
            border: '2px solid #5a4510',
            color: '#fff',
          }}
        >
          {isRunning ? 'STOP' : 'START'}
        </button>

        <button
          onClick={() => setProgress(0)}
          className="px-4 py-2 rounded font-mono text-sm"
          style={{
            background: '#3d2a14',
            border: '2px solid #5a4510',
            color: '#daa520',
          }}
        >
          RESET
        </button>
      </div>

      <style>{`
        @keyframes steamPuff {
          0% { opacity: 0.6; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-20px) scale(2); }
        }
      `}</style>
    </div>
  );
};

// --- STEAMPUNK CLOCKWORK AVATAR ---
export const SteampunkClockworkAvatar = () => {
  const [rotation, setRotation] = useState(0);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setRotation(r => r + 1);
    }, 50);
    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className="h-full flex items-center justify-center gap-8 p-8" style={{ background: '#1a1208' }}>
      {/* Avatar with clockwork frame */}
      <div
        className="relative cursor-pointer"
        onClick={() => setIsActive(!isActive)}
      >
        {/* Outer gear ring */}
        <div
          className="absolute -inset-6 rounded-full"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="42" fill="none" stroke="#5a4510" strokeWidth="2" />
            {[...Array(16)].map((_, i) => (
              <rect
                key={i}
                x="47"
                y="4"
                width="6"
                height="8"
                rx="1"
                fill="#8b6914"
                transform={`rotate(${i * 22.5} 50 50)`}
              />
            ))}
          </svg>
        </div>

        {/* Middle gear ring (counter-rotating) */}
        <div
          className="absolute -inset-3 rounded-full"
          style={{ transform: `rotate(${-rotation * 1.5}deg)` }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="40" fill="none" stroke="#cd7f32" strokeWidth="3" />
            {[...Array(12)].map((_, i) => (
              <rect
                key={i}
                x="46"
                y="6"
                width="8"
                height="10"
                rx="2"
                fill="#cd7f32"
                transform={`rotate(${i * 30} 50 50)`}
              />
            ))}
          </svg>
        </div>

        {/* Avatar container */}
        <div
          className="relative w-32 h-32 rounded-full overflow-hidden"
          style={{
            border: '4px solid #daa520',
            boxShadow: '0 0 20px #cd7f3240, inset 0 0 20px rgba(0,0,0,0.3)',
          }}
        >
          {/* Avatar placeholder */}
          <div
            className="w-full h-full flex items-center justify-center"
            style={{
              background: 'radial-gradient(circle at 30% 30%, #3d2a14, #1a1208)',
            }}
          >
            {/* Silhouette icon */}
            <svg viewBox="0 0 24 24" className="w-16 h-16" fill="#8b6914">
              <circle cx="12" cy="8" r="4" />
              <path d="M12 14c-4 0-8 2-8 4v2h16v-2c0-2-4-4-8-4z" />
            </svg>
          </div>

          {/* Monocle */}
          <div
            className="absolute top-4 right-4 w-8 h-8 rounded-full"
            style={{
              border: '2px solid #daa520',
              background: 'rgba(135, 206, 235, 0.2)',
            }}
          />
        </div>

        {/* Decorative screws */}
        {[0, 90, 180, 270].map(angle => (
          <div
            key={angle}
            className="absolute w-3 h-3 rounded-full"
            style={{
              background: 'radial-gradient(circle at 30% 30%, #daa520, #8b6914)',
              left: '50%',
              top: '50%',
              transform: `rotate(${angle}deg) translateY(-58px) translateX(-50%)`,
              boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.3)',
            }}
          >
            <div
              className="absolute inset-0.5"
              style={{
                background: 'linear-gradient(135deg, transparent 45%, #5a4510 50%, transparent 55%)',
              }}
            />
          </div>
        ))}
      </div>

      {/* Status panel */}
      <div
        className="p-4 rounded-lg"
        style={{
          background: 'linear-gradient(180deg, #2d1f0d, #1a1208)',
          border: '3px solid #5a4510',
        }}
      >
        <div className="font-serif text-lg mb-2" style={{ color: '#daa520' }}>
          CHIEF ENGINEER
        </div>
        <div className="font-mono text-xs space-y-1" style={{ color: '#8b6914' }}>
          <div>STATUS: {isActive ? 'ACTIVE' : 'STANDBY'}</div>
          <div>RANK: MASTER</div>
          <div>ID: #1892-B</div>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{
              background: isActive ? '#4ade80' : '#5a4510',
              boxShadow: isActive ? '0 0 8px #4ade80' : 'none',
            }}
          />
          <span className="font-mono text-xs" style={{ color: isActive ? '#4ade80' : '#5a4510' }}>
            {isActive ? 'ONLINE' : 'OFFLINE'}
          </span>
        </div>
      </div>
    </div>
  );
};

// --- STEAMPUNK LEVER NAV ---
export const SteampunkLeverNav = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const navItems = [
    { label: 'BRIDGE', icon: '⚓' },
    { label: 'ENGINE', icon: '⚙' },
    { label: 'CARGO', icon: '📦' },
    { label: 'CREW', icon: '👤' },
  ];

  return (
    <div className="h-full flex flex-col items-center justify-center p-8" style={{ background: '#1a1208' }}>
      {/* Control panel */}
      <div
        className="relative p-8 rounded-lg"
        style={{
          background: 'linear-gradient(180deg, #3d2a14 0%, #2d1f0d 50%, #1a1208 100%)',
          border: '4px solid #5a4510',
          boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.1), 0 8px 24px rgba(0,0,0,0.5)',
        }}
      >
        {/* Panel label */}
        <div
          className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded"
          style={{
            background: 'linear-gradient(180deg, #daa520, #8b6914)',
            border: '2px solid #5a4510',
          }}
        >
          <span className="font-serif text-sm font-bold" style={{ color: '#1a1208' }}>
            NAVIGATION CONTROL
          </span>
        </div>

        {/* Lever switches */}
        <div className="flex gap-8 mt-4">
          {navItems.map((item, i) => (
            <div key={item.label} className="flex flex-col items-center">
              {/* Label plate */}
              <div
                className="mb-2 px-3 py-1 rounded text-center"
                style={{
                  background: activeIndex === i ? '#daa520' : '#3d2a14',
                  border: '2px solid #5a4510',
                }}
              >
                <span className="text-lg">{item.icon}</span>
                <div
                  className="font-mono text-xs"
                  style={{ color: activeIndex === i ? '#1a1208' : '#8b6914' }}
                >
                  {item.label}
                </div>
              </div>

              {/* Lever track */}
              <div
                className="relative w-6 h-24 rounded-full cursor-pointer"
                onClick={() => setActiveIndex(i)}
                style={{
                  background: 'linear-gradient(90deg, #1a1208 0%, #2d1f0d 50%, #1a1208 100%)',
                  border: '3px solid #5a4510',
                  boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.5)',
                }}
              >
                {/* Track markers */}
                <div
                  className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-1 rounded"
                  style={{ background: '#4ade80' }}
                />
                <div
                  className="absolute bottom-2 left-1/2 -translate-x-1/2 w-3 h-1 rounded"
                  style={{ background: '#ef4444' }}
                />

                {/* Lever handle */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 w-10 h-8 rounded transition-all duration-300"
                  style={{
                    top: activeIndex === i ? '4px' : 'calc(100% - 36px)',
                    background: 'linear-gradient(180deg, #cd7f32 0%, #8b6914 50%, #5a4510 100%)',
                    border: '2px solid #3d2a14',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.5), inset 0 1px 2px rgba(255,255,255,0.2)',
                  }}
                >
                  {/* Grip lines */}
                  <div className="absolute top-2 left-2 right-2 space-y-1">
                    <div className="h-0.5 rounded" style={{ background: '#3d2a14' }} />
                    <div className="h-0.5 rounded" style={{ background: '#3d2a14' }} />
                    <div className="h-0.5 rounded" style={{ background: '#3d2a14' }} />
                  </div>
                </div>
              </div>

              {/* Status indicator */}
              <div
                className="mt-2 w-3 h-3 rounded-full"
                style={{
                  background: activeIndex === i ? '#4ade80' : '#5a4510',
                  boxShadow: activeIndex === i ? '0 0 10px #4ade80' : 'none',
                }}
              />
            </div>
          ))}
        </div>

        {/* Current selection display */}
        <div
          className="mt-6 px-6 py-3 rounded text-center"
          style={{
            background: '#0f0a04',
            border: '2px solid #8b6914',
          }}
        >
          <span className="font-mono text-sm" style={{ color: '#8b6914' }}>
            CURRENT SECTION:
          </span>
          <div className="font-serif text-xl" style={{ color: '#daa520' }}>
            {navItems[activeIndex].icon} {navItems[activeIndex].label}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- STEAMPUNK WHISTLE ALERT ---
export const SteampunkWhistleAlert = () => {
  const [alerts, setAlerts] = useState<Array<{ id: number; type: string; message: string }>>([]);
  const [steamPuffs, setSteamPuffs] = useState<number[]>([]);

  const addAlert = (type: string) => {
    const messages: Record<string, string> = {
      info: 'System check complete',
      warning: 'Pressure approaching limits',
      danger: 'Critical temperature detected!',
    };
    const id = Date.now();
    setAlerts(prev => [...prev, { id, type, message: messages[type] }]);

    // Steam effect
    setSteamPuffs(prev => [...prev, id]);
    setTimeout(() => setSteamPuffs(prev => prev.filter(p => p !== id)), 1000);

    // Auto remove after delay
    setTimeout(() => {
      setAlerts(prev => prev.filter(a => a.id !== id));
    }, 4000);
  };

  const getAlertStyles = (type: string) => {
    switch (type) {
      case 'danger':
        return { border: '#ef4444', glow: '#ef444440', text: '#ef4444' };
      case 'warning':
        return { border: '#eab308', glow: '#eab30840', text: '#eab308' };
      default:
        return { border: '#4ade80', glow: '#4ade8040', text: '#4ade80' };
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-8" style={{ background: '#1a1208' }}>
      {/* Steam whistle */}
      <div className="relative mb-8">
        {/* Whistle body */}
        <div
          className="w-16 h-32 rounded-t-full relative"
          style={{
            background: 'linear-gradient(90deg, #5a4510 0%, #cd7f32 30%, #daa520 50%, #cd7f32 70%, #5a4510 100%)',
            border: '3px solid #3d2a14',
            boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
          }}
        >
          {/* Steam vents */}
          {steamPuffs.map(id => (
            <div
              key={id}
              className="absolute -top-4 left-1/2 -translate-x-1/2"
            >
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-4 h-4 rounded-full"
                  style={{
                    left: `${(i - 2) * 10}px`,
                    background: 'radial-gradient(circle, rgba(255,255,255,0.7), transparent)',
                    animation: `whistleSteam 1s ease-out forwards ${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
          ))}

          {/* Bands */}
          <div className="absolute top-4 left-0 right-0 h-2" style={{ background: '#8b6914' }} />
          <div className="absolute top-1/2 left-0 right-0 h-2" style={{ background: '#8b6914' }} />
        </div>

        {/* Base */}
        <div
          className="w-20 h-8 -ml-2 rounded-b"
          style={{
            background: 'linear-gradient(180deg, #8b6914, #5a4510)',
            border: '3px solid #3d2a14',
            borderTop: 'none',
          }}
        />
      </div>

      {/* Alert buttons */}
      <div className="flex gap-4 mb-6">
        {['info', 'warning', 'danger'].map(type => {
          const styles = getAlertStyles(type);
          return (
            <button
              key={type}
              onClick={() => addAlert(type)}
              className="px-4 py-2 rounded font-mono text-sm uppercase transition-all"
              style={{
                background: '#2d1f0d',
                border: `2px solid ${styles.border}`,
                color: styles.text,
              }}
            >
              {type}
            </button>
          );
        })}
      </div>

      {/* Alert display area */}
      <div className="w-80 space-y-2">
        {alerts.map(alert => {
          const styles = getAlertStyles(alert.type);
          return (
            <div
              key={alert.id}
              className="relative p-4 rounded-lg"
              style={{
                background: 'linear-gradient(135deg, #3d2a14 0%, #2d1f0d 100%)',
                border: `3px solid ${styles.border}`,
                boxShadow: `0 0 20px ${styles.glow}, inset 0 0 10px rgba(0,0,0,0.3)`,
                animation: 'alertSlideIn 0.3s ease-out',
              }}
            >
              {/* Rivets */}
              <div
                className="absolute top-2 left-2 w-2 h-2 rounded-full"
                style={{ background: 'radial-gradient(circle at 30% 30%, #cd7f32, #5a4510)' }}
              />
              <div
                className="absolute top-2 right-2 w-2 h-2 rounded-full"
                style={{ background: 'radial-gradient(circle at 30% 30%, #cd7f32, #5a4510)' }}
              />

              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    background: styles.text,
                    boxShadow: `0 0 8px ${styles.text}`,
                    animation: 'alertPulse 0.5s ease-in-out infinite',
                  }}
                />
                <div>
                  <div className="font-mono text-xs uppercase" style={{ color: styles.text }}>
                    {alert.type} ALERT
                  </div>
                  <div className="font-serif text-sm" style={{ color: '#daa520' }}>
                    {alert.message}
                  </div>
                </div>
              </div>

              {/* Dismiss button */}
              <button
                onClick={() => setAlerts(prev => prev.filter(a => a.id !== alert.id))}
                className="absolute top-2 right-8 text-xs"
                style={{ color: '#8b6914' }}
              >
                x
              </button>
            </div>
          );
        })}

        {alerts.length === 0 && (
          <div
            className="p-4 rounded-lg text-center"
            style={{
              background: '#2d1f0d',
              border: '2px dashed #5a4510',
            }}
          >
            <span className="font-mono text-sm" style={{ color: '#8b6914' }}>
              NO ACTIVE ALERTS
            </span>
          </div>
        )}
      </div>

      <style>{`
        @keyframes whistleSteam {
          0% { opacity: 0.8; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-60px) scale(3); }
        }
        @keyframes alertSlideIn {
          0% { opacity: 0; transform: translateX(-20px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes alertPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

// --- STEAMPUNK COG DIVIDER ---
export const SteampunkCogDivider = () => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(r => r + 0.5);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex flex-col items-center justify-center p-8" style={{ background: '#1a1208' }}>
      {/* Content above */}
      <div
        className="w-80 p-4 rounded-lg mb-0"
        style={{
          background: 'linear-gradient(180deg, #2d1f0d, #1a1208)',
          border: '2px solid #5a4510',
        }}
      >
        <p className="font-serif" style={{ color: '#daa520' }}>
          Section Alpha: Engine specifications and technical drawings for the main propulsion system.
        </p>
      </div>

      {/* Cog divider */}
      <div className="relative w-full h-20 flex items-center justify-center overflow-hidden">
        {/* Left line */}
        <div
          className="absolute left-0 w-1/3 h-1"
          style={{
            background: 'linear-gradient(90deg, transparent, #cd7f32)',
          }}
        />

        {/* Cogs */}
        <div className="relative flex items-center gap-0">
          {/* Small cog left */}
          <div
            className="w-10 h-10"
            style={{ transform: `rotate(${-rotation * 1.5}deg)` }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="30" fill="none" stroke="#8b6914" strokeWidth="4" />
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
              <circle cx="50" cy="50" r="8" fill="#5a4510" />
            </svg>
          </div>

          {/* Large center cog */}
          <div
            className="w-16 h-16 -mx-2 z-10"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="35" fill="none" stroke="#cd7f32" strokeWidth="4" />
              {[...Array(12)].map((_, i) => (
                <rect
                  key={i}
                  x="46"
                  y="10"
                  width="8"
                  height="12"
                  rx="2"
                  fill="#cd7f32"
                  transform={`rotate(${i * 30} 50 50)`}
                />
              ))}
              <circle cx="50" cy="50" r="10" fill="#daa520" />
              <circle cx="50" cy="50" r="4" fill="#5a4510" />
            </svg>
          </div>

          {/* Small cog right */}
          <div
            className="w-10 h-10"
            style={{ transform: `rotate(${-rotation * 1.5}deg)` }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="30" fill="none" stroke="#8b6914" strokeWidth="4" />
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
              <circle cx="50" cy="50" r="8" fill="#5a4510" />
            </svg>
          </div>
        </div>

        {/* Right line */}
        <div
          className="absolute right-0 w-1/3 h-1"
          style={{
            background: 'linear-gradient(90deg, #cd7f32, transparent)',
          }}
        />
      </div>

      {/* Content below */}
      <div
        className="w-80 p-4 rounded-lg mt-0"
        style={{
          background: 'linear-gradient(180deg, #2d1f0d, #1a1208)',
          border: '2px solid #5a4510',
        }}
      >
        <p className="font-serif" style={{ color: '#daa520' }}>
          Section Beta: Maintenance schedules and operational guidelines for continued performance.
        </p>
      </div>
    </div>
  );
};

// --- STEAMPUNK COMPASS SLIDER ---
export const SteampunkCompassSlider = () => {
  const [heading, setHeading] = useState(0);
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

  const getDirection = (deg: number) => {
    const index = Math.round(deg / 45) % 8;
    return directions[index];
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-8" style={{ background: '#1a1208' }}>
      {/* Compass housing */}
      <div
        className="relative w-64 h-64 rounded-full"
        style={{
          background: 'radial-gradient(circle at 30% 30%, #3d2a14, #1a1208)',
          border: '6px solid',
          borderColor: '#cd7f32 #8b6914 #5a4510 #cd7f32',
          boxShadow: '0 8px 24px rgba(0,0,0,0.5), inset 0 0 40px rgba(0,0,0,0.3)',
        }}
      >
        {/* Brass inner ring */}
        <div
          className="absolute inset-3 rounded-full"
          style={{
            border: '4px solid',
            borderColor: '#daa520 #8b6914 #5a4510 #daa520',
          }}
        />

        {/* Compass face */}
        <div
          className="absolute inset-6 rounded-full"
          style={{
            background: 'radial-gradient(circle, #f5e6c8 0%, #d4c4a8 100%)',
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.1)',
          }}
        >
          {/* Direction markers */}
          {directions.map((dir, i) => {
            const angle = i * 45;
            const isCardinal = i % 2 === 0;
            return (
              <div
                key={dir}
                className="absolute left-1/2 top-1/2"
                style={{ transform: `rotate(${angle}deg)`, transformOrigin: '0 0' }}
              >
                <span
                  className={`absolute font-serif font-bold ${isCardinal ? 'text-lg' : 'text-xs'}`}
                  style={{
                    color: dir === 'N' ? '#ef4444' : '#3d2a14',
                    transform: `translateY(-70px) rotate(${-angle}deg)`,
                  }}
                >
                  {dir}
                </span>
                <div
                  className="absolute rounded"
                  style={{
                    width: isCardinal ? 3 : 1,
                    height: isCardinal ? 15 : 10,
                    background: dir === 'N' ? '#ef4444' : '#3d2a14',
                    transform: 'translateX(-50%) translateY(-82px)',
                  }}
                />
              </div>
            );
          })}

          {/* Minor tick marks */}
          {[...Array(36)].map((_, i) => {
            if (i % 4.5 === 0) return null;
            const angle = i * 10;
            return (
              <div
                key={i}
                className="absolute left-1/2 top-1/2"
                style={{ transform: `rotate(${angle}deg)`, transformOrigin: '0 0' }}
              >
                <div
                  className="absolute rounded"
                  style={{
                    width: 1,
                    height: 5,
                    background: '#8b6914',
                    transform: 'translateX(-50%) translateY(-78px)',
                  }}
                />
              </div>
            );
          })}

          {/* Compass needle */}
          <div
            className="absolute left-1/2 top-1/2 w-4 transition-transform duration-300"
            style={{
              transform: `translate(-50%, -50%) rotate(${heading}deg)`,
              transformOrigin: 'center center',
            }}
          >
            {/* North pointer */}
            <div
              className="w-4 h-20 -mt-10"
              style={{
                background: 'linear-gradient(180deg, #ef4444 0%, #ef4444 50%, #1a1208 50%, #1a1208 100%)',
                clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
              }}
            />
          </div>

          {/* Center jewel */}
          <div
            className="absolute left-1/2 top-1/2 w-6 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background: 'radial-gradient(circle at 30% 30%, #daa520, #8b6914)',
              border: '2px solid #5a4510',
            }}
          />
        </div>

        {/* Decorative screws */}
        {[0, 90, 180, 270].map(angle => (
          <div
            key={angle}
            className="absolute w-4 h-4 rounded-full"
            style={{
              background: 'radial-gradient(circle at 30% 30%, #daa520, #8b6914)',
              left: '50%',
              top: '50%',
              transform: `rotate(${angle}deg) translateY(-118px) translateX(-50%)`,
            }}
          >
            <div
              className="absolute inset-1"
              style={{ background: 'linear-gradient(45deg, transparent 40%, #5a4510 50%, transparent 60%)' }}
            />
          </div>
        ))}
      </div>

      {/* Slider control */}
      <div className="mt-8 w-72">
        <input
          type="range"
          min="0"
          max="360"
          value={heading}
          onChange={(e) => setHeading(parseInt(e.target.value))}
          className="w-full h-4 rounded-full cursor-pointer appearance-none"
          style={{
            background: 'linear-gradient(180deg, #3d2a14, #1a1208)',
            border: '2px solid #5a4510',
          }}
        />
        <div className="flex justify-between mt-2 font-mono text-xs" style={{ color: '#8b6914' }}>
          <span>0</span>
          <span>90</span>
          <span>180</span>
          <span>270</span>
          <span>360</span>
        </div>
      </div>

      {/* Heading display */}
      <div
        className="mt-4 px-6 py-3 rounded flex items-center gap-4"
        style={{
          background: '#0f0a04',
          border: '3px solid #8b6914',
        }}
      >
        <div className="text-center">
          <div className="font-mono text-xs" style={{ color: '#8b6914' }}>HEADING</div>
          <div className="font-mono text-2xl font-bold" style={{ color: '#daa520' }}>
            {heading}°
          </div>
        </div>
        <div
          className="w-px h-10"
          style={{ background: '#5a4510' }}
        />
        <div className="text-center">
          <div className="font-mono text-xs" style={{ color: '#8b6914' }}>DIRECTION</div>
          <div className="font-serif text-2xl font-bold" style={{ color: '#daa520' }}>
            {getDirection(heading)}
          </div>
        </div>
      </div>

      <style>{`
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

// --- STEAMPUNK BLUEPRINT CARD ---
export const SteampunkBlueprintCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-8" style={{ background: '#1a1208' }}>
      <div
        className="relative w-80 h-96 cursor-pointer perspective-1000"
        onClick={() => setIsFlipped(!isFlipped)}
        style={{ perspective: '1000px' }}
      >
        <div
          className="relative w-full h-full transition-transform duration-700"
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* Front - Blueprint */}
          <div
            className="absolute inset-0 rounded-lg p-6 overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #1e3a5f 0%, #0f2744 100%)',
              border: '4px solid #5a4510',
              boxShadow: 'inset 0 0 30px rgba(0,0,0,0.3), 0 8px 24px rgba(0,0,0,0.5)',
              backfaceVisibility: 'hidden',
            }}
          >
            {/* Grid pattern */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px',
              }}
            />

            {/* Technical drawing */}
            <svg className="absolute inset-8" viewBox="0 0 200 250">
              {/* Main gear outline */}
              <circle cx="100" cy="100" r="60" fill="none" stroke="#87CEEB" strokeWidth="1" strokeDasharray="5,3" />
              <circle cx="100" cy="100" r="40" fill="none" stroke="#87CEEB" strokeWidth="1" />
              <circle cx="100" cy="100" r="15" fill="none" stroke="#87CEEB" strokeWidth="1" />

              {/* Gear teeth */}
              {[...Array(12)].map((_, i) => (
                <line
                  key={i}
                  x1="100"
                  y1="40"
                  x2="100"
                  y2="25"
                  stroke="#87CEEB"
                  strokeWidth="1"
                  transform={`rotate(${i * 30} 100 100)`}
                />
              ))}

              {/* Dimension lines */}
              <line x1="30" y1="100" x2="170" y2="100" stroke="#87CEEB" strokeWidth="0.5" strokeDasharray="2,2" />
              <line x1="100" y1="30" x2="100" y2="170" stroke="#87CEEB" strokeWidth="0.5" strokeDasharray="2,2" />

              {/* Measurement annotations */}
              <text x="170" y="95" fill="#87CEEB" fontSize="8" fontFamily="monospace">120mm</text>
              <text x="105" y="25" fill="#87CEEB" fontSize="8" fontFamily="monospace">120mm</text>

              {/* Bottom label */}
              <text x="100" y="230" fill="#87CEEB" fontSize="10" fontFamily="serif" textAnchor="middle">
                DRIVE GEAR ASSEMBLY
              </text>
              <text x="100" y="245" fill="#87CEEB" fontSize="8" fontFamily="monospace" textAnchor="middle">
                DWG NO: SG-1892-A
              </text>
            </svg>

            {/* Corner rivets */}
            {[
              { top: 8, left: 8 },
              { top: 8, right: 8 },
              { bottom: 8, left: 8 },
              { bottom: 8, right: 8 },
            ].map((pos, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  ...pos,
                  background: 'radial-gradient(circle at 30% 30%, #cd7f32, #5a4510)',
                }}
              />
            ))}

            {/* Label */}
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <span className="font-mono text-xs" style={{ color: '#87CEEB' }}>
                CLICK TO VIEW SPECIFICATIONS
              </span>
            </div>
          </div>

          {/* Back - Specifications */}
          <div
            className="absolute inset-0 rounded-lg p-6"
            style={{
              background: 'linear-gradient(135deg, #3d2a14 0%, #2d1f0d 50%, #1a1208 100%)',
              border: '4px solid #5a4510',
              boxShadow: 'inset 0 0 30px rgba(0,0,0,0.3), 0 8px 24px rgba(0,0,0,0.5)',
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
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
                className="absolute w-3 h-3 rounded-full"
                style={{
                  ...pos,
                  background: 'radial-gradient(circle at 30% 30%, #cd7f32, #5a4510)',
                }}
              />
            ))}

            {/* Title plate */}
            <div
              className="px-4 py-2 rounded mb-4"
              style={{
                background: 'linear-gradient(180deg, #daa520, #8b6914)',
              }}
            >
              <h3 className="font-serif text-lg font-bold text-center" style={{ color: '#1a1208' }}>
                SPECIFICATIONS
              </h3>
            </div>

            {/* Specs list */}
            <div className="space-y-3 text-sm" style={{ color: '#daa520' }}>
              {[
                { label: 'Part Number', value: 'SG-1892-A' },
                { label: 'Material', value: 'Brass Alloy' },
                { label: 'Teeth Count', value: '24' },
                { label: 'Module', value: '2.5mm' },
                { label: 'Bore Diameter', value: '30mm' },
                { label: 'Face Width', value: '15mm' },
                { label: 'Pressure Angle', value: '20°' },
                { label: 'Heat Treatment', value: 'Case Hardened' },
              ].map(spec => (
                <div key={spec.label} className="flex justify-between border-b border-[#5a4510] pb-1">
                  <span className="font-serif">{spec.label}:</span>
                  <span className="font-mono">{spec.value}</span>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <span className="font-mono text-xs" style={{ color: '#8b6914' }}>
                CLICK TO VIEW BLUEPRINT
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- STEAMPUNK BOLT ICON ---
export const SteampunkBoltIcon = () => {
  const [selectedBolt, setSelectedBolt] = useState(0);

  const boltVariants = [
    { name: 'Hex Bolt', heads: 6 },
    { name: 'Square Bolt', heads: 4 },
    { name: 'Slotted', heads: 1 },
    { name: 'Phillips', heads: 4 },
  ];

  return (
    <div className="h-full flex flex-col items-center justify-center p-8" style={{ background: '#1a1208' }}>
      {/* Bolt display */}
      <div className="flex gap-8 mb-8">
        {boltVariants.map((bolt, i) => (
          <div
            key={bolt.name}
            className="flex flex-col items-center cursor-pointer transition-transform duration-300"
            onClick={() => setSelectedBolt(i)}
            style={{
              transform: selectedBolt === i ? 'scale(1.2)' : 'scale(1)',
            }}
          >
            {/* Bolt head */}
            <div
              className="relative w-16 h-16 rounded-full"
              style={{
                background: selectedBolt === i
                  ? 'radial-gradient(circle at 30% 30%, #daa520, #8b6914)'
                  : 'radial-gradient(circle at 30% 30%, #cd7f32, #5a4510)',
                border: `3px solid ${selectedBolt === i ? '#daa520' : '#5a4510'}`,
                boxShadow: selectedBolt === i
                  ? '0 0 20px #daa52040, inset 0 2px 4px rgba(255,255,255,0.2)'
                  : 'inset 0 2px 4px rgba(255,255,255,0.1), 0 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              {/* Bolt pattern */}
              {bolt.heads === 6 && (
                // Hex bolt
                <svg className="absolute inset-2" viewBox="0 0 100 100">
                  <polygon
                    points="50,10 90,30 90,70 50,90 10,70 10,30"
                    fill="none"
                    stroke="#3d2a14"
                    strokeWidth="4"
                  />
                </svg>
              )}
              {bolt.heads === 4 && bolt.name === 'Square Bolt' && (
                // Square bolt
                <div
                  className="absolute inset-4 rounded-sm"
                  style={{ border: '3px solid #3d2a14' }}
                />
              )}
              {bolt.heads === 1 && (
                // Slotted
                <div
                  className="absolute top-1/2 left-3 right-3 h-1 -translate-y-1/2 rounded"
                  style={{ background: '#3d2a14' }}
                />
              )}
              {bolt.heads === 4 && bolt.name === 'Phillips' && (
                // Phillips
                <>
                  <div
                    className="absolute top-1/2 left-4 right-4 h-1 -translate-y-1/2 rounded"
                    style={{ background: '#3d2a14' }}
                  />
                  <div
                    className="absolute left-1/2 top-4 bottom-4 w-1 -translate-x-1/2 rounded"
                    style={{ background: '#3d2a14' }}
                  />
                </>
              )}
            </div>

            {/* Label */}
            <span
              className="mt-2 font-mono text-xs"
              style={{ color: selectedBolt === i ? '#daa520' : '#8b6914' }}
            >
              {bolt.name}
            </span>
          </div>
        ))}
      </div>

      {/* Info panel */}
      <div
        className="p-6 rounded-lg w-72"
        style={{
          background: 'linear-gradient(180deg, #2d1f0d, #1a1208)',
          border: '3px solid #5a4510',
        }}
      >
        <div className="flex items-center gap-4 mb-4">
          {/* Large bolt display */}
          <div
            className="w-20 h-20 rounded-full"
            style={{
              background: 'radial-gradient(circle at 30% 30%, #daa520, #8b6914)',
              border: '4px solid #5a4510',
              boxShadow: '0 4px 8px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.2)',
            }}
          >
            {/* Recreate selected bolt pattern */}
            {boltVariants[selectedBolt].heads === 6 && (
              <svg className="w-full h-full p-2" viewBox="0 0 100 100">
                <polygon
                  points="50,10 90,30 90,70 50,90 10,70 10,30"
                  fill="none"
                  stroke="#3d2a14"
                  strokeWidth="4"
                />
              </svg>
            )}
            {boltVariants[selectedBolt].heads === 4 && boltVariants[selectedBolt].name === 'Square Bolt' && (
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-10 h-10 rounded-sm" style={{ border: '3px solid #3d2a14' }} />
              </div>
            )}
            {boltVariants[selectedBolt].heads === 1 && (
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-12 h-1 rounded" style={{ background: '#3d2a14' }} />
              </div>
            )}
            {boltVariants[selectedBolt].heads === 4 && boltVariants[selectedBolt].name === 'Phillips' && (
              <div className="relative w-full h-full">
                <div
                  className="absolute top-1/2 left-4 right-4 h-1.5 -translate-y-1/2 rounded"
                  style={{ background: '#3d2a14' }}
                />
                <div
                  className="absolute left-1/2 top-4 bottom-4 w-1.5 -translate-x-1/2 rounded"
                  style={{ background: '#3d2a14' }}
                />
              </div>
            )}
          </div>

          <div>
            <div className="font-serif text-lg" style={{ color: '#daa520' }}>
              {boltVariants[selectedBolt].name}
            </div>
            <div className="font-mono text-xs" style={{ color: '#8b6914' }}>
              HEAD TYPE: {boltVariants[selectedBolt].heads === 1 ? 'SLOT' : boltVariants[selectedBolt].heads + '-POINT'}
            </div>
          </div>
        </div>

        <div className="space-y-1 text-xs font-mono" style={{ color: '#8b6914' }}>
          <div>MATERIAL: BRASS</div>
          <div>THREAD: M8 x 1.25</div>
          <div>GRADE: 8.8</div>
        </div>
      </div>
    </div>
  );
};

// --- STEAMPUNK PIPES BACKGROUND ---
export const SteampunkPipesBackground = () => {
  const [steamActive, setSteamActive] = useState(true);
  const [steamParticles, setSteamParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    if (!steamActive) {
      setSteamParticles([]);
      return;
    }
    const interval = setInterval(() => {
      setSteamParticles(prev => [
        ...prev.slice(-15),
        { id: Date.now(), x: 20 + Math.random() * 60, y: 30 + Math.random() * 40 },
      ]);
    }, 300);
    return () => clearInterval(interval);
  }, [steamActive]);

  return (
    <div className="h-full relative overflow-hidden" style={{ background: '#0f0a04' }}>
      {/* Pipes layer */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <defs>
          {/* Copper pipe gradient */}
          <linearGradient id="copperPipe" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#b87333" />
            <stop offset="30%" stopColor="#cd7f32" />
            <stop offset="50%" stopColor="#daa520" />
            <stop offset="70%" stopColor="#cd7f32" />
            <stop offset="100%" stopColor="#8b6914" />
          </linearGradient>

          {/* Brass fitting gradient */}
          <linearGradient id="brassFitting" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#daa520" />
            <stop offset="50%" stopColor="#cd7f32" />
            <stop offset="100%" stopColor="#8b6914" />
          </linearGradient>
        </defs>

        {/* Horizontal pipes */}
        <rect x="0" y="15%" width="100%" height="20" fill="url(#copperPipe)" />
        <rect x="0" y="50%" width="100%" height="30" fill="url(#copperPipe)" />
        <rect x="0" y="80%" width="100%" height="25" fill="url(#copperPipe)" />

        {/* Vertical pipes */}
        <rect x="10%" y="0" width="15" height="100%" fill="url(#copperPipe)" />
        <rect x="40%" y="15%" width="20" height="65%" fill="url(#copperPipe)" />
        <rect x="70%" y="0" width="18" height="100%" fill="url(#copperPipe)" />
        <rect x="90%" y="30%" width="12" height="50%" fill="url(#copperPipe)" />

        {/* Pipe joints/fittings */}
        <circle cx="10%" cy="15%" r="18" fill="url(#brassFitting)" />
        <circle cx="10%" cy="50%" r="22" fill="url(#brassFitting)" />
        <circle cx="40%" cy="50%" r="25" fill="url(#brassFitting)" />
        <circle cx="70%" cy="15%" r="18" fill="url(#brassFitting)" />
        <circle cx="70%" cy="50%" r="22" fill="url(#brassFitting)" />
        <circle cx="70%" cy="80%" r="20" fill="url(#brassFitting)" />

        {/* Rivets on fittings */}
        {[
          { cx: '10%', cy: '15%' },
          { cx: '10%', cy: '50%' },
          { cx: '40%', cy: '50%' },
          { cx: '70%', cy: '15%' },
          { cx: '70%', cy: '50%' },
          { cx: '70%', cy: '80%' },
        ].map((pos, i) => (
          <g key={i}>
            <circle cx={pos.cx} cy={pos.cy} r="4" fill="#5a4510" />
          </g>
        ))}
      </svg>

      {/* Valve wheels */}
      <div
        className="absolute w-12 h-12 rounded-full"
        style={{
          left: '38%',
          top: '48%',
          background: 'radial-gradient(circle at 30% 30%, #cd7f32, #5a4510)',
          border: '3px solid #8b6914',
        }}
      >
        {[0, 45, 90, 135].map(angle => (
          <div
            key={angle}
            className="absolute left-1/2 top-1/2 w-0.5 h-10 -translate-x-1/2 -translate-y-1/2 rounded"
            style={{
              background: '#3d2a14',
              transform: `rotate(${angle}deg)`,
            }}
          />
        ))}
        <div
          className="absolute left-1/2 top-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: '#1a1208' }}
        />
      </div>

      {/* Steam particles */}
      {steamParticles.map(particle => (
        <div
          key={particle.id}
          className="absolute w-6 h-6 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            background: 'radial-gradient(circle, rgba(255,255,255,0.5), transparent)',
            animation: 'pipeSteam 2s ease-out forwards',
          }}
        />
      ))}

      {/* Control panel overlay */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-3 rounded-lg"
        style={{
          background: 'rgba(26, 18, 8, 0.9)',
          border: '3px solid #5a4510',
        }}
      >
        <span className="font-mono text-sm" style={{ color: '#daa520' }}>
          STEAM SYSTEM
        </span>
        <button
          onClick={() => setSteamActive(!steamActive)}
          className="px-4 py-1 rounded font-mono text-xs transition-all"
          style={{
            background: steamActive
              ? 'linear-gradient(180deg, #4ade80, #22c55e)'
              : 'linear-gradient(180deg, #ef4444, #dc2626)',
            border: '2px solid #5a4510',
            color: '#fff',
          }}
        >
          {steamActive ? 'ACTIVE' : 'OFFLINE'}
        </button>
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{
              background: steamActive ? '#4ade80' : '#ef4444',
              boxShadow: `0 0 8px ${steamActive ? '#4ade80' : '#ef4444'}`,
            }}
          />
          <span className="font-mono text-xs" style={{ color: '#8b6914' }}>
            {steamActive ? 'FLOW: ON' : 'FLOW: OFF'}
          </span>
        </div>
      </div>

      <style>{`
        @keyframes pipeSteam {
          0% { opacity: 0.6; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-80px) scale(3); }
        }
      `}</style>
    </div>
  );
}

// Export all components
export const steampunkComponents: Record<string, React.FC> = {
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
  // New components
  'steampunk-pressure-dial': SteampunkPressureDial,
  'steampunk-telegraph-input': SteampunkTelegraphInput,
  'steampunk-rivet-badge': SteampunkRivetBadge,
  'steampunk-piston-progress': SteampunkPistonProgress,
  'steampunk-clockwork-avatar': SteampunkClockworkAvatar,
  'steampunk-lever-nav': SteampunkLeverNav,
  'steampunk-whistle-alert': SteampunkWhistleAlert,
  'steampunk-cog-divider': SteampunkCogDivider,
  'steampunk-compass-slider': SteampunkCompassSlider,
  'steampunk-blueprint-card': SteampunkBlueprintCard,
  'steampunk-bolt-icon': SteampunkBoltIcon,
  'steampunk-pipes-background': SteampunkPipesBackground,
};
