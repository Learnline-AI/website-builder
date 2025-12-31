import React, { useState, useEffect } from 'react';

// --- AIRLOCK BUTTON ---
export const AirlockButton = () => {
  const [status, setStatus] = useState<'sealed' | 'cycling' | 'open'>('sealed');
  const [progress, setProgress] = useState(0);

  const handleClick = () => {
    if (status === 'cycling') return;

    if (status === 'sealed') {
      setStatus('cycling');
      setProgress(0);
      const interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            clearInterval(interval);
            setStatus('open');
            return 100;
          }
          return p + 2;
        });
      }, 50);
    } else {
      setStatus('cycling');
      setProgress(100);
      const interval = setInterval(() => {
        setProgress(p => {
          if (p <= 0) {
            clearInterval(interval);
            setStatus('sealed');
            return 0;
          }
          return p - 2;
        });
      }, 50);
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-8" style={{ background: 'radial-gradient(ellipse at 50% 100%, #1a1a3e 0%, #0a0a14 50%, #050510 100%)' }}>
      {/* Airlock frame */}
      <div
        className="relative w-40 h-56 rounded-lg overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #1a1a2e 0%, #0f0f1e 100%)',
          border: '4px solid #2a2a4e',
          boxShadow: 'inset 0 0 30px rgba(0,0,0,0.5), 0 0 20px rgba(74, 222, 128, 0.1)',
        }}
      >
        {/* Door segments */}
        <div
          className="absolute top-0 left-0 right-0 bg-gradient-to-b from-[#2a2a4e] to-[#1a1a3e] transition-all duration-500"
          style={{
            height: `${50 - progress * 0.4}%`,
            borderBottom: '2px solid #4ade80',
          }}
        >
          {/* Hazard stripes */}
          <div
            className="absolute bottom-0 left-0 right-0 h-4"
            style={{
              background: 'repeating-linear-gradient(45deg, #fbbf24, #fbbf24 10px, #1a1a2e 10px, #1a1a2e 20px)',
            }}
          />
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#2a2a4e] to-[#1a1a3e] transition-all duration-500"
          style={{
            height: `${50 - progress * 0.4}%`,
            borderTop: '2px solid #4ade80',
          }}
        >
          {/* Hazard stripes */}
          <div
            className="absolute top-0 left-0 right-0 h-4"
            style={{
              background: 'repeating-linear-gradient(-45deg, #fbbf24, #fbbf24 10px, #1a1a2e 10px, #1a1a2e 20px)',
            }}
          />
        </div>

        {/* Window */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full overflow-hidden"
          style={{
            background: 'radial-gradient(circle, #0a0a14 0%, #000 100%)',
            border: '3px solid #4ade80',
            boxShadow: '0 0 15px #4ade8040, inset 0 0 20px rgba(74, 222, 128, 0.1)',
          }}
        >
          {/* Stars visible through window */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-0.5 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>

        {/* Status lights */}
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          <div
            className="w-2 h-2 rounded-full transition-all duration-300"
            style={{
              background: status === 'sealed' ? '#4ade80' : '#1a1a2e',
              boxShadow: status === 'sealed' ? '0 0 10px #4ade80' : 'none',
            }}
          />
          <div
            className="w-2 h-2 rounded-full transition-all duration-300"
            style={{
              background: status === 'cycling' ? '#fbbf24' : '#1a1a2e',
              boxShadow: status === 'cycling' ? '0 0 10px #fbbf24' : 'none',
              animation: status === 'cycling' ? 'pulse 0.5s infinite' : 'none',
            }}
          />
          <div
            className="w-2 h-2 rounded-full transition-all duration-300"
            style={{
              background: status === 'open' ? '#ef4444' : '#1a1a2e',
              boxShadow: status === 'open' ? '0 0 10px #ef4444' : 'none',
            }}
          />
        </div>
      </div>

      {/* Control button */}
      <button
        onClick={handleClick}
        disabled={status === 'cycling'}
        className="mt-6 px-6 py-3 rounded font-mono text-sm tracking-wider transition-all duration-300"
        style={{
          background: status === 'cycling'
            ? 'linear-gradient(180deg, #4a4a5e, #2a2a3e)'
            : status === 'sealed'
              ? 'linear-gradient(180deg, #4ade80, #22c55e)'
              : 'linear-gradient(180deg, #ef4444, #dc2626)',
          border: '2px solid',
          borderColor: status === 'cycling' ? '#6a6a7e' : status === 'sealed' ? '#4ade80' : '#ef4444',
          color: '#fff',
          boxShadow: status !== 'cycling' ? `0 0 20px ${status === 'sealed' ? '#4ade80' : '#ef4444'}40` : 'none',
          cursor: status === 'cycling' ? 'not-allowed' : 'pointer',
        }}
      >
        {status === 'cycling' ? 'CYCLING...' : status === 'sealed' ? 'OPEN AIRLOCK' : 'SEAL AIRLOCK'}
      </button>

      {/* Progress bar during cycling */}
      {status === 'cycling' && (
        <div className="mt-4 w-40 h-2 rounded-full overflow-hidden bg-[#1a1a2e]">
          <div
            className="h-full transition-all duration-100"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #4ade80, #fbbf24)',
            }}
          />
        </div>
      )}
    </div>
  );
};

// --- ORBITAL PROGRESS ---
export const OrbitalProgress = () => {
  const [progress, setProgress] = useState(65);
  const [orbitAngle, setOrbitAngle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOrbitAngle(a => (a + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex flex-col items-center justify-center p-8" style={{ background: '#0a0a14' }}>
      {/* Orbital display */}
      <div className="relative w-64 h-64">
        {/* Planet (center) */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 30%, #4ade80, #166534)',
            boxShadow: '0 0 30px #4ade8040, inset -10px -10px 20px rgba(0,0,0,0.3)',
          }}
        >
          {/* Atmosphere glow */}
          <div
            className="absolute -inset-2 rounded-full"
            style={{
              background: 'radial-gradient(circle, #4ade8020 0%, transparent 70%)',
            }}
          />
        </div>

        {/* Orbit path */}
        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
          {/* Orbit ring */}
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="#4ade8030"
            strokeWidth="2"
            strokeDasharray="4 4"
          />

          {/* Progress arc */}
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="#4ade80"
            strokeWidth="3"
            strokeDasharray={`${progress * 5.03} 503`}
            strokeLinecap="round"
            transform="rotate(-90 100 100)"
            style={{ filter: 'drop-shadow(0 0 5px #4ade80)' }}
          />
        </svg>

        {/* Orbiting satellite */}
        <div
          className="absolute left-1/2 top-1/2"
          style={{
            transform: `rotate(${orbitAngle}deg) translateX(80px) rotate(-${orbitAngle}deg)`,
          }}
        >
          <div
            className="w-4 h-4 -translate-x-1/2 -translate-y-1/2"
            style={{
              background: '#d1fae5',
              clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
              boxShadow: '0 0 10px #4ade80',
            }}
          />
          {/* Solar panels */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-8 h-1"
            style={{
              left: '100%',
              background: 'linear-gradient(90deg, #4ade80, #22c55e)',
            }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-8 h-1"
            style={{
              right: '100%',
              background: 'linear-gradient(90deg, #22c55e, #4ade80)',
            }}
          />
        </div>

        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="font-mono text-3xl font-bold text-[#4ade80]">{progress}%</div>
            <div className="font-mono text-xs text-[#4ade8080]">ORBIT</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-6 flex gap-4">
        {[25, 50, 75, 100].map(value => (
          <button
            key={value}
            onClick={() => setProgress(value)}
            className="px-3 py-1.5 rounded font-mono text-xs transition-all"
            style={{
              background: progress === value ? '#4ade8030' : '#1a1a2e',
              border: '1px solid',
              borderColor: progress === value ? '#4ade80' : '#4ade8040',
              color: '#4ade80',
            }}
          >
            {value}%
          </button>
        ))}
      </div>
    </div>
  );
};

// --- MODULE GRID NAV ---
export const ModuleGridNav = () => {
  const [activeModule, setActiveModule] = useState('hab');

  const modules = [
    { id: 'cmd', label: 'CMD', row: 1, col: 2, status: 'active' },
    { id: 'hab', label: 'HAB', row: 2, col: 1, status: 'active' },
    { id: 'core', label: 'CORE', row: 2, col: 2, status: 'active' },
    { id: 'lab', label: 'LAB', row: 2, col: 3, status: 'active' },
    { id: 'dock1', label: 'DOCK', row: 3, col: 1, status: 'warning' },
    { id: 'cargo', label: 'CRGO', row: 3, col: 2, status: 'active' },
    { id: 'dock2', label: 'DOCK', row: 3, col: 3, status: 'offline' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#4ade80';
      case 'warning': return '#fbbf24';
      case 'offline': return '#6b7280';
      default: return '#4ade80';
    }
  };

  return (
    <div className="h-full flex items-center justify-center p-8" style={{ background: '#0a0a14' }}>
      <div
        className="relative p-6 rounded-lg"
        style={{
          background: 'linear-gradient(180deg, #1a1a2e 0%, #0f0f1e 100%)',
          border: '2px solid #4ade8040',
          boxShadow: '0 0 30px rgba(74, 222, 128, 0.1)',
        }}
      >
        {/* Header */}
        <div className="mb-4 pb-2 border-b border-[#4ade8030]">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse" />
            <span className="font-mono text-sm text-[#4ade80]">STATION SCHEMATIC</span>
          </div>
        </div>

        {/* Module grid */}
        <div className="grid grid-cols-3 gap-2 w-64">
          {[1, 2, 3].map(row => (
            <React.Fragment key={row}>
              {[1, 2, 3].map(col => {
                const module = modules.find(m => m.row === row && m.col === col);
                if (!module) {
                  return <div key={`${row}-${col}`} className="w-20 h-16" />;
                }
                return (
                  <button
                    key={module.id}
                    onClick={() => setActiveModule(module.id)}
                    className="w-20 h-16 rounded transition-all duration-200"
                    style={{
                      background: activeModule === module.id
                        ? `${getStatusColor(module.status)}20`
                        : '#0a0a14',
                      border: `2px solid ${activeModule === module.id ? getStatusColor(module.status) : `${getStatusColor(module.status)}40`}`,
                      boxShadow: activeModule === module.id
                        ? `0 0 15px ${getStatusColor(module.status)}40`
                        : 'none',
                    }}
                  >
                    <div className="flex flex-col items-center justify-center h-full">
                      <span
                        className="font-mono text-xs font-bold"
                        style={{ color: getStatusColor(module.status) }}
                      >
                        {module.label}
                      </span>
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-1"
                        style={{
                          background: getStatusColor(module.status),
                          animation: module.status === 'active' ? 'pulse 2s infinite' : 'none',
                        }}
                      />
                    </div>
                  </button>
                );
              })}
            </React.Fragment>
          ))}
        </div>

        {/* Connection lines */}
        <svg className="absolute inset-0 pointer-events-none" viewBox="0 0 300 250">
          <line x1="150" y1="80" x2="150" y2="110" stroke="#4ade8040" strokeWidth="2" />
          <line x1="70" y1="140" x2="100" y2="140" stroke="#4ade8040" strokeWidth="2" />
          <line x1="200" y1="140" x2="230" y2="140" stroke="#4ade8040" strokeWidth="2" />
          <line x1="70" y1="140" x2="70" y2="170" stroke="#4ade8040" strokeWidth="2" />
          <line x1="150" y1="140" x2="150" y2="170" stroke="#4ade8040" strokeWidth="2" />
          <line x1="230" y1="140" x2="230" y2="170" stroke="#4ade8040" strokeWidth="2" />
        </svg>

        {/* Selected module info */}
        <div className="mt-4 pt-2 border-t border-[#4ade8030]">
          <div className="flex justify-between font-mono text-xs">
            <span className="text-[#4ade8080]">SELECTED:</span>
            <span className="text-[#4ade80]">{activeModule.toUpperCase()} MODULE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- LIFE SUPPORT GAUGE ---
export const LifeSupportGauge = () => {
  const [values, setValues] = useState({
    o2: 95,
    co2: 2,
    temp: 21,
    pressure: 101,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setValues(v => ({
        o2: Math.max(80, Math.min(100, v.o2 + (Math.random() - 0.5) * 2)),
        co2: Math.max(0, Math.min(5, v.co2 + (Math.random() - 0.5) * 0.5)),
        temp: Math.max(18, Math.min(25, v.temp + (Math.random() - 0.5) * 0.5)),
        pressure: Math.max(95, Math.min(105, v.pressure + (Math.random() - 0.5) * 1)),
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const gauges = [
    { key: 'o2', label: 'O₂', value: values.o2, unit: '%', min: 80, max: 100, color: '#4ade80' },
    { key: 'co2', label: 'CO₂', value: values.co2, unit: '%', min: 0, max: 5, color: '#fbbf24', invert: true },
    { key: 'temp', label: 'TEMP', value: values.temp, unit: '°C', min: 18, max: 25, color: '#60a5fa' },
    { key: 'pressure', label: 'kPa', value: values.pressure, unit: '', min: 95, max: 105, color: '#a78bfa' },
  ];

  return (
    <div className="h-full flex items-center justify-center p-8" style={{ background: '#0a0a14' }}>
      <div
        className="p-6 rounded-lg"
        style={{
          background: 'linear-gradient(180deg, #1a1a2e 0%, #0f0f1e 100%)',
          border: '2px solid #4ade8040',
        }}
      >
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <span className="font-mono text-sm text-[#4ade80]">LIFE SUPPORT</span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse" />
            <span className="font-mono text-xs text-[#4ade8080]">NOMINAL</span>
          </span>
        </div>

        {/* Gauges */}
        <div className="grid grid-cols-2 gap-4">
          {gauges.map(gauge => {
            const percentage = ((gauge.value - gauge.min) / (gauge.max - gauge.min)) * 100;
            const isWarning = gauge.invert ? percentage > 70 : percentage < 30;

            return (
              <div
                key={gauge.key}
                className="p-3 rounded"
                style={{
                  background: '#0a0a14',
                  border: `1px solid ${gauge.color}40`,
                }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-mono text-xs" style={{ color: gauge.color }}>
                    {gauge.label}
                  </span>
                  <span
                    className="font-mono text-lg font-bold"
                    style={{
                      color: isWarning ? '#ef4444' : gauge.color,
                      animation: isWarning ? 'pulse 1s infinite' : 'none',
                    }}
                  >
                    {gauge.value.toFixed(gauge.key === 'co2' ? 1 : 0)}{gauge.unit}
                  </span>
                </div>

                {/* Bar gauge */}
                <div
                  className="h-2 rounded-full overflow-hidden"
                  style={{ background: `${gauge.color}20` }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${percentage}%`,
                      background: isWarning ? '#ef4444' : gauge.color,
                      boxShadow: `0 0 10px ${isWarning ? '#ef4444' : gauge.color}60`,
                    }}
                  />
                </div>

                {/* Range labels */}
                <div className="flex justify-between mt-1">
                  <span className="font-mono text-[10px]" style={{ color: `${gauge.color}60` }}>
                    {gauge.min}
                  </span>
                  <span className="font-mono text-[10px]" style={{ color: `${gauge.color}60` }}>
                    {gauge.max}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// --- ZERO-G CARDS ---
export const ZeroGCards = () => {
  const [cards, setCards] = useState([
    { id: 1, label: 'EVA SUIT', x: 0, y: 0, rotation: 0, vx: 0.5, vy: 0.3, vr: 0.2 },
    { id: 2, label: 'TOOL KIT', x: 100, y: 50, rotation: 15, vx: -0.3, vy: 0.4, vr: -0.3 },
    { id: 3, label: 'DATA PAD', x: 50, y: 100, rotation: -10, vx: 0.2, vy: -0.2, vr: 0.1 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards(prevCards =>
        prevCards.map(card => {
          let newX = card.x + card.vx;
          let newY = card.y + card.vy;
          let newVx = card.vx;
          let newVy = card.vy;

          // Bounce off walls
          if (newX < -20 || newX > 180) newVx = -newVx;
          if (newY < -20 || newY > 140) newVy = -newVy;

          return {
            ...card,
            x: Math.max(-20, Math.min(180, newX)),
            y: Math.max(-20, Math.min(140, newY)),
            rotation: card.rotation + card.vr,
            vx: newVx,
            vy: newVy,
          };
        })
      );
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const handleCardClick = (id: number) => {
    setCards(prevCards =>
      prevCards.map(card =>
        card.id === id
          ? {
              ...card,
              vx: (Math.random() - 0.5) * 2,
              vy: (Math.random() - 0.5) * 2,
              vr: (Math.random() - 0.5) * 0.5,
            }
          : card
      )
    );
  };

  return (
    <div
      className="h-full relative overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 50% 50%, #1a1a3e 0%, #0a0a14 50%, #050510 100%)' }}
    >
      {/* Stars background */}
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute w-0.5 h-0.5 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0.3 + Math.random() * 0.7,
          }}
        />
      ))}

      {/* Floating cards */}
      {cards.map(card => (
        <button
          key={card.id}
          onClick={() => handleCardClick(card.id)}
          className="absolute w-24 h-32 rounded-lg cursor-pointer transition-shadow duration-200 hover:shadow-lg"
          style={{
            left: card.x,
            top: card.y,
            transform: `rotate(${card.rotation}deg)`,
            background: 'linear-gradient(180deg, #2a2a4e 0%, #1a1a3e 100%)',
            border: '2px solid #4ade8060',
            boxShadow: '0 0 20px rgba(74, 222, 128, 0.2)',
          }}
        >
          <div className="h-full flex flex-col items-center justify-center p-2">
            <div
              className="w-10 h-10 rounded-lg mb-2 flex items-center justify-center"
              style={{
                background: '#4ade8020',
                border: '1px solid #4ade8040',
              }}
            >
              <span className="text-xl">📦</span>
            </div>
            <span className="font-mono text-[10px] text-[#4ade80] text-center">
              {card.label}
            </span>
          </div>
        </button>
      ))}

      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <span className="font-mono text-xs text-[#4ade8060]">
          Click cards to push them
        </span>
      </div>
    </div>
  );
};

// --- COMM LINK STATUS ---
export const CommLinkStatus = () => {
  const [activeChannel, setActiveChannel] = useState<number>(0);
  const [signalStrength, setSignalStrength] = useState<number[]>([85, 42, 100, 15]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSignalStrength(prev =>
        prev.map(s => Math.max(0, Math.min(100, s + (Math.random() - 0.5) * 20)))
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const channels = [
    { name: 'HOUSTON', freq: '259.7 MHz', icon: '🌍' },
    { name: 'ISS-RELAY', freq: '145.8 MHz', icon: '📡' },
    { name: 'DRAGON', freq: '130.2 MHz', icon: '🚀' },
    { name: 'EMERGENCY', freq: '121.5 MHz', icon: '⚠️' },
  ];

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#0a0a14' }}>
      <div
        className="w-full max-w-sm p-4 rounded-lg"
        style={{
          background: 'linear-gradient(180deg, #1a1a2e 0%, #0f0f1e 100%)',
          border: '2px solid #4ade8040',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#4ade8030]">
          <div className="flex items-center gap-2">
            <span className="text-xl">📻</span>
            <span className="font-mono text-sm text-[#4ade80]">COMM ARRAY</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse" />
            <span className="font-mono text-xs text-[#4ade8080]">ONLINE</span>
          </div>
        </div>

        {/* Channel list */}
        <div className="space-y-2">
          {channels.map((channel, i) => (
            <button
              key={i}
              onClick={() => setActiveChannel(i)}
              className="w-full p-3 rounded transition-all flex items-center gap-3"
              style={{
                background: activeChannel === i ? '#4ade8020' : 'transparent',
                border: `1px solid ${activeChannel === i ? '#4ade80' : 'transparent'}`,
              }}
            >
              <span className="text-lg">{channel.icon}</span>
              <div className="flex-1 text-left">
                <div className="font-mono text-sm text-white">{channel.name}</div>
                <div className="font-mono text-xs text-[#4ade8060]">{channel.freq}</div>
              </div>

              {/* Signal bars */}
              <div className="flex items-end gap-0.5 h-4">
                {[...Array(5)].map((_, j) => (
                  <div
                    key={j}
                    className="w-1 rounded-sm transition-all"
                    style={{
                      height: `${(j + 1) * 20}%`,
                      background: signalStrength[i] > j * 20
                        ? signalStrength[i] > 50 ? '#4ade80' : '#fbbf24'
                        : '#1a1a2e',
                      boxShadow: signalStrength[i] > j * 20
                        ? `0 0 5px ${signalStrength[i] > 50 ? '#4ade80' : '#fbbf24'}`
                        : 'none',
                    }}
                  />
                ))}
              </div>
            </button>
          ))}
        </div>

        {/* Active channel info */}
        <div className="mt-4 p-3 rounded" style={{ background: '#0a0a14', border: '1px solid #4ade8030' }}>
          <div className="flex justify-between items-center">
            <span className="font-mono text-xs text-[#4ade8080]">SIGNAL</span>
            <span
              className="font-mono text-sm font-bold"
              style={{
                color: signalStrength[activeChannel] > 50 ? '#4ade80' : '#fbbf24',
              }}
            >
              {Math.round(signalStrength[activeChannel])}%
            </span>
          </div>
          <div className="mt-2 h-1 rounded-full bg-[#1a1a2e] overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${signalStrength[activeChannel]}%`,
                background: signalStrength[activeChannel] > 50
                  ? 'linear-gradient(90deg, #4ade80, #22c55e)'
                  : 'linear-gradient(90deg, #fbbf24, #f59e0b)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// --- NAVIGATION CONSOLE ---
export const NavigationConsole = () => {
  const [heading, setHeading] = useState(45);
  const [pitch, setPitch] = useState(0);
  const [isThrusting, setIsThrusting] = useState(false);

  useEffect(() => {
    if (!isThrusting) return;
    const interval = setInterval(() => {
      setHeading(h => (h + 1) % 360);
    }, 100);
    return () => clearInterval(interval);
  }, [isThrusting]);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#0a0a14' }}>
      <div
        className="p-4 rounded-lg"
        style={{
          background: 'linear-gradient(180deg, #1a1a2e 0%, #0f0f1e 100%)',
          border: '2px solid #4ade8040',
        }}
      >
        {/* Header */}
        <div className="mb-4 pb-2 border-b border-[#4ade8030]">
          <span className="font-mono text-sm text-[#4ade80]">NAV CONTROL</span>
        </div>

        {/* Compass display */}
        <div className="relative w-48 h-48 mx-auto mb-4">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Outer ring */}
            <circle cx="50" cy="50" r="45" fill="none" stroke="#4ade8030" strokeWidth="2" />

            {/* Compass markers */}
            {['N', 'E', 'S', 'W'].map((dir, i) => (
              <text
                key={dir}
                x={50 + 38 * Math.sin((i * 90 * Math.PI) / 180)}
                y={52 - 38 * Math.cos((i * 90 * Math.PI) / 180)}
                textAnchor="middle"
                fill="#4ade80"
                fontSize="8"
                fontFamily="monospace"
              >
                {dir}
              </text>
            ))}

            {/* Degree ticks */}
            {[...Array(36)].map((_, i) => (
              <line
                key={i}
                x1={50 + 42 * Math.sin((i * 10 * Math.PI) / 180)}
                y1={50 - 42 * Math.cos((i * 10 * Math.PI) / 180)}
                x2={50 + 45 * Math.sin((i * 10 * Math.PI) / 180)}
                y2={50 - 45 * Math.cos((i * 10 * Math.PI) / 180)}
                stroke="#4ade8040"
                strokeWidth="1"
              />
            ))}

            {/* Heading indicator */}
            <g transform={`rotate(${heading} 50 50)`}>
              <polygon
                points="50,15 45,25 55,25"
                fill="#4ade80"
                style={{ filter: 'drop-shadow(0 0 5px #4ade80)' }}
              />
              <line x1="50" y1="25" x2="50" y2="50" stroke="#4ade80" strokeWidth="2" />
            </g>

            {/* Center point */}
            <circle cx="50" cy="50" r="4" fill="#4ade80" />
          </svg>

          {/* Center display */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-20 h-20 rounded-full flex flex-col items-center justify-center"
              style={{ background: '#0a0a14' }}
            >
              <span className="font-mono text-2xl font-bold text-[#4ade80]">{heading}°</span>
              <span className="font-mono text-[10px] text-[#4ade8060]">HEADING</span>
            </div>
          </div>
        </div>

        {/* Pitch indicator */}
        <div className="mb-4">
          <div className="flex justify-between text-xs font-mono mb-1">
            <span className="text-[#4ade8080]">PITCH</span>
            <span className="text-[#4ade80]">{pitch}°</span>
          </div>
          <input
            type="range"
            min="-90"
            max="90"
            value={pitch}
            onChange={e => setPitch(Number(e.target.value))}
            className="w-full h-2 rounded-full appearance-none cursor-pointer"
            style={{ background: '#1a1a2e' }}
          />
        </div>

        {/* Thrust button */}
        <button
          onMouseDown={() => setIsThrusting(true)}
          onMouseUp={() => setIsThrusting(false)}
          onMouseLeave={() => setIsThrusting(false)}
          className="w-full py-3 rounded font-mono text-sm transition-all"
          style={{
            background: isThrusting ? '#4ade80' : '#4ade8020',
            border: '2px solid #4ade80',
            color: isThrusting ? '#0a0a14' : '#4ade80',
            boxShadow: isThrusting ? '0 0 20px #4ade8060' : 'none',
          }}
        >
          {isThrusting ? 'THRUSTING...' : 'HOLD TO THRUST'}
        </button>
      </div>
    </div>
  );
};

// --- CREW ROSTER ---
export const CrewRoster = () => {
  const [selectedCrew, setSelectedCrew] = useState<number | null>(null);

  const crew = [
    { name: 'CDR. Chen', role: 'Commander', status: 'active', location: 'CMD', avatar: '👩‍🚀' },
    { name: 'Dr. Okonkwo', role: 'Science', status: 'active', location: 'LAB', avatar: '👨‍🔬' },
    { name: 'Eng. Petrov', role: 'Engineer', status: 'eva', location: 'EXTERIOR', avatar: '🧑‍🔧' },
    { name: 'Plt. Yamamoto', role: 'Pilot', status: 'rest', location: 'HAB', avatar: '👨‍✈️' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#4ade80';
      case 'eva': return '#fbbf24';
      case 'rest': return '#60a5fa';
      default: return '#4ade80';
    }
  };

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#0a0a14' }}>
      <div
        className="w-full max-w-sm p-4 rounded-lg"
        style={{
          background: 'linear-gradient(180deg, #1a1a2e 0%, #0f0f1e 100%)',
          border: '2px solid #4ade8040',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#4ade8030]">
          <span className="font-mono text-sm text-[#4ade80]">CREW MANIFEST</span>
          <span className="font-mono text-xs text-[#4ade8060]">{crew.length} ABOARD</span>
        </div>

        {/* Crew list */}
        <div className="space-y-2">
          {crew.map((member, i) => (
            <button
              key={i}
              onClick={() => setSelectedCrew(selectedCrew === i ? null : i)}
              className="w-full p-3 rounded transition-all"
              style={{
                background: selectedCrew === i ? '#4ade8015' : 'transparent',
                border: `1px solid ${selectedCrew === i ? '#4ade80' : '#4ade8020'}`,
              }}
            >
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                  style={{
                    background: '#0a0a14',
                    border: `2px solid ${getStatusColor(member.status)}`,
                  }}
                >
                  {member.avatar}
                </div>

                {/* Info */}
                <div className="flex-1 text-left">
                  <div className="font-mono text-sm text-white">{member.name}</div>
                  <div className="font-mono text-xs text-[#4ade8060]">{member.role}</div>
                </div>

                {/* Status */}
                <div className="text-right">
                  <div
                    className="font-mono text-xs px-2 py-0.5 rounded"
                    style={{
                      background: `${getStatusColor(member.status)}20`,
                      color: getStatusColor(member.status),
                    }}
                  >
                    {member.status.toUpperCase()}
                  </div>
                  <div className="font-mono text-[10px] text-[#4ade8040] mt-1">
                    {member.location}
                  </div>
                </div>
              </div>

              {/* Expanded details */}
              {selectedCrew === i && (
                <div className="mt-3 pt-3 border-t border-[#4ade8020] grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="font-mono text-lg text-[#4ade80]">142</div>
                    <div className="font-mono text-[10px] text-[#4ade8060]">DAYS</div>
                  </div>
                  <div>
                    <div className="font-mono text-lg text-[#4ade80]">12</div>
                    <div className="font-mono text-[10px] text-[#4ade8060]">EVAs</div>
                  </div>
                  <div>
                    <div className="font-mono text-lg text-[#4ade80]">98%</div>
                    <div className="font-mono text-[10px] text-[#4ade8060]">HEALTH</div>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- POWER GRID ---
export const PowerGrid = () => {
  const [power, setPower] = useState({
    solar: 85,
    battery: 72,
    consumption: 68,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setPower(p => ({
        solar: Math.max(0, Math.min(100, p.solar + (Math.random() - 0.5) * 5)),
        battery: Math.max(0, Math.min(100, p.battery + (p.solar > p.consumption ? 0.5 : -0.5))),
        consumption: Math.max(50, Math.min(90, p.consumption + (Math.random() - 0.5) * 3)),
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const surplus = power.solar - power.consumption;

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#0a0a14' }}>
      <div
        className="p-4 rounded-lg"
        style={{
          background: 'linear-gradient(180deg, #1a1a2e 0%, #0f0f1e 100%)',
          border: '2px solid #4ade8040',
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#4ade8030]">
          <span className="text-xl">⚡</span>
          <span className="font-mono text-sm text-[#4ade80]">POWER DISTRIBUTION</span>
        </div>

        {/* Power flow visualization */}
        <div className="flex items-center justify-between mb-4 p-3 rounded" style={{ background: '#0a0a14' }}>
          {/* Solar input */}
          <div className="text-center">
            <span className="text-2xl">☀️</span>
            <div className="font-mono text-lg text-[#fbbf24]">{Math.round(power.solar)}%</div>
            <div className="font-mono text-[10px] text-[#4ade8060]">SOLAR</div>
          </div>

          {/* Flow indicator */}
          <div className="flex-1 mx-4">
            <div className="h-2 rounded-full bg-[#1a1a2e] overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: '100%',
                  background: `linear-gradient(90deg, #fbbf24, ${surplus >= 0 ? '#4ade80' : '#ef4444'})`,
                  animation: 'powerFlow 1s linear infinite',
                }}
              />
            </div>
            <div className="text-center mt-1">
              <span
                className="font-mono text-xs"
                style={{ color: surplus >= 0 ? '#4ade80' : '#ef4444' }}
              >
                {surplus >= 0 ? '+' : ''}{Math.round(surplus)}% NET
              </span>
            </div>
          </div>

          {/* Consumption */}
          <div className="text-center">
            <span className="text-2xl">🔌</span>
            <div className="font-mono text-lg text-[#60a5fa]">{Math.round(power.consumption)}%</div>
            <div className="font-mono text-[10px] text-[#4ade8060]">LOAD</div>
          </div>
        </div>

        {/* Battery status */}
        <div
          className="p-3 rounded"
          style={{
            background: '#0a0a14',
            border: '1px solid #4ade8030',
          }}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="font-mono text-xs text-[#4ade8080]">BATTERY RESERVE</span>
            <span
              className="font-mono text-sm font-bold"
              style={{ color: power.battery > 30 ? '#4ade80' : '#ef4444' }}
            >
              {Math.round(power.battery)}%
            </span>
          </div>

          {/* Battery bar */}
          <div className="flex gap-0.5">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="flex-1 h-6 rounded-sm transition-all"
                style={{
                  background: i < Math.floor(power.battery / 10)
                    ? power.battery > 30 ? '#4ade80' : '#ef4444'
                    : '#1a1a2e',
                  boxShadow: i < Math.floor(power.battery / 10)
                    ? `0 0 5px ${power.battery > 30 ? '#4ade80' : '#ef4444'}40`
                    : 'none',
                }}
              />
            ))}
          </div>

          {/* Estimate */}
          <div className="mt-2 text-center">
            <span className="font-mono text-[10px] text-[#4ade8060]">
              EST. {Math.round((power.battery / (power.consumption - power.solar + 0.1)) * 60)} MIN RESERVE
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes powerFlow {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
};

// --- DOCKING DISPLAY ---
export const DockingDisplay = () => {
  const [distance, setDistance] = useState(500);
  const [speed, setSpeed] = useState(2);
  const [aligned, setAligned] = useState(false);
  const [isDocking, setIsDocking] = useState(false);

  useEffect(() => {
    if (!isDocking) return;
    const interval = setInterval(() => {
      setDistance(d => {
        if (d <= 0) {
          setIsDocking(false);
          return 0;
        }
        return Math.max(0, d - speed);
      });
    }, 100);
    return () => clearInterval(interval);
  }, [isDocking, speed]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAligned(Math.random() > 0.3);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const isNearDock = distance < 50;

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#0a0a14' }}>
      <div
        className="p-4 rounded-lg"
        style={{
          background: 'linear-gradient(180deg, #1a1a2e 0%, #0f0f1e 100%)',
          border: `2px solid ${distance === 0 ? '#4ade80' : '#4ade8040'}`,
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#4ade8030]">
          <span className="font-mono text-sm text-[#4ade80]">DOCKING INTERFACE</span>
          <span
            className="font-mono text-xs px-2 py-0.5 rounded"
            style={{
              background: distance === 0 ? '#4ade8020' : isNearDock ? '#fbbf2420' : '#ef444420',
              color: distance === 0 ? '#4ade80' : isNearDock ? '#fbbf24' : '#ef4444',
            }}
          >
            {distance === 0 ? 'DOCKED' : isNearDock ? 'FINAL APPROACH' : 'APPROACH'}
          </span>
        </div>

        {/* Docking view */}
        <div
          className="relative w-48 h-48 mx-auto mb-4 rounded-lg overflow-hidden"
          style={{
            background: '#0a0a14',
            border: '2px solid #4ade8030',
          }}
        >
          {/* Crosshairs */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute w-full h-0.5 bg-[#4ade8030]" />
            <div className="absolute h-full w-0.5 bg-[#4ade8030]" />
            <div
              className="absolute w-8 h-8 rounded-full border-2"
              style={{
                borderColor: aligned ? '#4ade80' : '#ef4444',
                animation: aligned ? 'none' : 'shake 0.1s infinite',
              }}
            />
          </div>

          {/* Target port */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-100"
            style={{
              width: `${Math.max(10, 60 - distance / 10)}px`,
              height: `${Math.max(10, 60 - distance / 10)}px`,
            }}
          >
            <div
              className="w-full h-full rounded-full"
              style={{
                border: '3px solid #4ade80',
                background: '#4ade8020',
                boxShadow: '0 0 20px #4ade8040',
              }}
            />
          </div>

          {/* Distance markers */}
          {[100, 200, 300, 400].map(d => (
            <div
              key={d}
              className="absolute left-1/2 -translate-x-1/2 font-mono text-[8px] text-[#4ade8040]"
              style={{
                top: `${15 + (d / 500) * 70}%`,
                opacity: distance > d ? 1 : 0.3,
              }}
            >
              {d}m
            </div>
          ))}
        </div>

        {/* Distance readout */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="p-2 rounded text-center" style={{ background: '#0a0a14' }}>
            <div className="font-mono text-2xl text-[#4ade80]">{distance.toFixed(1)}</div>
            <div className="font-mono text-[10px] text-[#4ade8060]">DISTANCE (m)</div>
          </div>
          <div className="p-2 rounded text-center" style={{ background: '#0a0a14' }}>
            <div className="font-mono text-2xl text-[#60a5fa]">{speed.toFixed(1)}</div>
            <div className="font-mono text-[10px] text-[#4ade8060]">SPEED (m/s)</div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-2">
          <button
            onClick={() => setSpeed(s => Math.max(0.5, s - 0.5))}
            className="flex-1 py-2 rounded font-mono text-xs"
            style={{
              background: '#0a0a14',
              border: '1px solid #60a5fa',
              color: '#60a5fa',
            }}
          >
            SLOWER
          </button>
          <button
            onClick={() => {
              if (distance === 0) {
                setDistance(500);
              } else {
                setIsDocking(!isDocking);
              }
            }}
            className="flex-1 py-2 rounded font-mono text-xs"
            style={{
              background: isDocking ? '#ef444420' : '#4ade8020',
              border: `1px solid ${isDocking ? '#ef4444' : '#4ade80'}`,
              color: isDocking ? '#ef4444' : '#4ade80',
            }}
          >
            {distance === 0 ? 'RESET' : isDocking ? 'ABORT' : 'DOCK'}
          </button>
          <button
            onClick={() => setSpeed(s => Math.min(5, s + 0.5))}
            className="flex-1 py-2 rounded font-mono text-xs"
            style={{
              background: '#0a0a14',
              border: '1px solid #60a5fa',
              color: '#60a5fa',
            }}
          >
            FASTER
          </button>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translate(-50%, -50%) translateX(0); }
          25% { transform: translate(-50%, -50%) translateX(-2px); }
          75% { transform: translate(-50%, -50%) translateX(2px); }
        }
      `}</style>
    </div>
  );
};

// --- SPACE COMM INPUT ---
export const SpaceCommInput = () => {
  const [message, setMessage] = useState('');
  const [transmitting, setTransmitting] = useState(false);
  const [logs, setLogs] = useState([
    { from: 'HOUSTON', text: 'Station, status check.', time: '14:32:01' },
    { from: 'STATION', text: 'All systems nominal.', time: '14:32:15' },
  ]);

  const handleTransmit = () => {
    if (!message.trim() || transmitting) return;
    setTransmitting(true);
    setTimeout(() => {
      setLogs(prev => [...prev, { from: 'STATION', text: message, time: new Date().toLocaleTimeString('en-US', { hour12: false }) }]);
      setMessage('');
      setTransmitting(false);
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col p-6" style={{ background: '#0a0a14' }}>
      <div
        className="flex-1 flex flex-col rounded-lg overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #1a1a2e 0%, #0f0f1e 100%)',
          border: '2px solid #4ade8040',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-[#4ade8030]">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse" />
            <span className="font-mono text-sm text-[#4ade80]">COMM TERMINAL</span>
          </div>
          <span className="font-mono text-xs text-[#4ade8060]">FREQ: 259.7 MHz</span>
        </div>

        {/* Message log */}
        <div className="flex-1 p-3 overflow-y-auto space-y-2" style={{ background: '#0a0a14' }}>
          {logs.map((log, i) => (
            <div key={i} className={`flex ${log.from === 'STATION' ? 'justify-end' : 'justify-start'}`}>
              <div
                className="max-w-[80%] p-2 rounded"
                style={{
                  background: log.from === 'STATION' ? '#4ade8020' : '#1a1a3e',
                  border: `1px solid ${log.from === 'STATION' ? '#4ade80' : '#4ade8040'}`,
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-[10px] text-[#4ade80]">{log.from}</span>
                  <span className="font-mono text-[10px] text-[#4ade8040]">{log.time}</span>
                </div>
                <p className="font-mono text-xs text-[#d1fae5]">{log.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input area */}
        <div className="p-3 border-t border-[#4ade8030]">
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={e => setMessage(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleTransmit()}
              placeholder="Enter message..."
              className="flex-1 px-3 py-2 rounded font-mono text-sm text-[#d1fae5] placeholder-[#4ade8040] outline-none"
              style={{
                background: '#0a0a14',
                border: '1px solid #4ade8040',
              }}
            />
            <button
              onClick={handleTransmit}
              disabled={transmitting || !message.trim()}
              className="px-4 py-2 rounded font-mono text-xs transition-all"
              style={{
                background: transmitting ? '#4ade8040' : '#4ade80',
                color: transmitting ? '#4ade80' : '#0a0a14',
                cursor: transmitting ? 'not-allowed' : 'pointer',
              }}
            >
              {transmitting ? 'TX...' : 'TRANSMIT'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- SPACE MISSION BADGE ---
export const SpaceMissionBadge = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-8" style={{ background: '#0a0a14' }}>
      <div
        className="relative cursor-pointer transition-transform duration-300"
        style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Outer ring */}
        <div
          className="relative w-40 h-40 rounded-full flex items-center justify-center"
          style={{
            background: 'linear-gradient(180deg, #1a1a3e 0%, #0f0f1e 100%)',
            border: '4px solid #4ade80',
            boxShadow: isHovered ? '0 0 40px #4ade8060, inset 0 0 30px #4ade8020' : '0 0 20px #4ade8040',
          }}
        >
          {/* Mission emblem */}
          <div className="absolute inset-4 rounded-full overflow-hidden" style={{ background: '#0a0a14' }}>
            {/* Stars */}
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                  opacity: 0.5 + Math.random() * 0.5,
                }}
              />
            ))}

            {/* Rocket silhouette */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 40 60" className="w-12 h-16" fill="#4ade80">
                <path d="M20 0 L25 20 L30 50 L25 55 L20 52 L15 55 L10 50 L15 20 Z" />
                <circle cx="20" cy="25" r="5" fill="#0a0a14" />
              </svg>
            </div>

            {/* Orbit ring */}
            <div
              className="absolute left-1/2 top-1/2 w-24 h-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#4ade8040]"
              style={{ transform: 'translate(-50%, -50%) rotate(30deg)' }}
            />
          </div>

          {/* Mission text ring */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 160 160">
            <defs>
              <path id="circlePath" d="M 80 80 m -55 0 a 55 55 0 1 1 110 0 a 55 55 0 1 1 -110 0" />
            </defs>
            <text fill="#4ade80" fontSize="8" fontFamily="monospace" letterSpacing="2">
              <textPath href="#circlePath">ARTEMIS IX * LUNAR GATEWAY * 2024 *</textPath>
            </text>
          </svg>
        </div>

        {/* Badge label */}
        <div className="mt-4 text-center">
          <div className="font-mono text-sm text-[#4ade80]">MISSION PATCH</div>
          <div className="font-mono text-xs text-[#4ade8060]">ARTEMIS IX</div>
        </div>
      </div>
    </div>
  );
};

// --- SPACE FUEL PROGRESS ---
export const SpaceFuelProgress = () => {
  const [fuel, setFuel] = useState({ lox: 78, rp1: 82, hydrazine: 45 });

  useEffect(() => {
    const interval = setInterval(() => {
      setFuel(f => ({
        lox: Math.max(0, f.lox - Math.random() * 0.5),
        rp1: Math.max(0, f.rp1 - Math.random() * 0.4),
        hydrazine: Math.max(0, f.hydrazine - Math.random() * 0.2),
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const tanks = [
    { label: 'LOX', value: fuel.lox, color: '#60a5fa', icon: 'O2' },
    { label: 'RP-1', value: fuel.rp1, color: '#4ade80', icon: 'C' },
    { label: 'N2H4', value: fuel.hydrazine, color: '#a78bfa', icon: 'N' },
  ];

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#0a0a14' }}>
      <div
        className="p-4 rounded-lg"
        style={{
          background: 'linear-gradient(180deg, #1a1a2e 0%, #0f0f1e 100%)',
          border: '2px solid #4ade8040',
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#4ade8030]">
          <span className="text-xl">⛽</span>
          <span className="font-mono text-sm text-[#4ade80]">PROPELLANT STATUS</span>
        </div>

        {/* Fuel tanks */}
        <div className="flex gap-6">
          {tanks.map(tank => (
            <div key={tank.label} className="flex flex-col items-center">
              {/* Tank visualization */}
              <div
                className="relative w-16 h-32 rounded-lg overflow-hidden"
                style={{
                  background: '#0a0a14',
                  border: `2px solid ${tank.color}40`,
                }}
              >
                {/* Fuel level */}
                <div
                  className="absolute bottom-0 left-0 right-0 transition-all duration-1000"
                  style={{
                    height: `${tank.value}%`,
                    background: `linear-gradient(180deg, ${tank.color}60 0%, ${tank.color} 100%)`,
                    boxShadow: `0 0 20px ${tank.color}40`,
                  }}
                >
                  {/* Bubbles */}
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 rounded-full opacity-50"
                      style={{
                        background: tank.color,
                        left: `${20 + i * 25}%`,
                        bottom: `${10 + i * 20}%`,
                        animation: `bubble ${2 + i * 0.5}s ease-in-out infinite`,
                      }}
                    />
                  ))}
                </div>

                {/* Level markers */}
                {[25, 50, 75].map(level => (
                  <div
                    key={level}
                    className="absolute left-0 right-0 border-t border-dashed"
                    style={{
                      bottom: `${level}%`,
                      borderColor: `${tank.color}30`,
                    }}
                  />
                ))}

                {/* Chemical symbol */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 font-mono text-xs" style={{ color: tank.color }}>
                  {tank.icon}
                </div>
              </div>

              {/* Labels */}
              <div className="mt-2 text-center">
                <div className="font-mono text-lg font-bold" style={{ color: tank.value < 30 ? '#ef4444' : tank.color }}>
                  {tank.value.toFixed(0)}%
                </div>
                <div className="font-mono text-[10px] text-[#4ade8060]">{tank.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes bubble {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.5; }
          50% { transform: translateY(-10px) scale(1.2); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
};

// --- SPACE HELMET AVATAR ---
export const SpaceHelmetAvatar = () => {
  const [isVisorUp, setIsVisorUp] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBreathingPhase(p => (p + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex items-center justify-center p-8" style={{ background: '#0a0a14' }}>
      <div className="flex flex-col items-center">
        {/* Helmet */}
        <div
          className="relative w-32 h-36 cursor-pointer"
          onClick={() => setIsVisorUp(!isVisorUp)}
        >
          {/* Helmet shell */}
          <div
            className="absolute inset-0 rounded-t-full rounded-b-3xl"
            style={{
              background: 'linear-gradient(180deg, #d1fae5 0%, #9ca3af 50%, #6b7280 100%)',
              boxShadow: '0 0 30px rgba(74, 222, 128, 0.2)',
            }}
          />

          {/* Visor area */}
          <div
            className="absolute left-3 right-3 top-4 bottom-12 rounded-t-full rounded-b-2xl overflow-hidden transition-all duration-500"
            style={{
              background: isVisorUp
                ? 'linear-gradient(180deg, #1a1a3e 0%, #0a0a14 100%)'
                : 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)',
              opacity: isVisorUp ? 1 : 0.9,
            }}
          >
            {/* Face when visor is up */}
            {isVisorUp && (
              <div className="absolute inset-2 flex flex-col items-center justify-center">
                {/* Eyes */}
                <div className="flex gap-4 mb-2">
                  <div className="w-3 h-3 rounded-full bg-[#4ade80]" />
                  <div className="w-3 h-3 rounded-full bg-[#4ade80]" />
                </div>
                {/* Smile */}
                <div className="w-6 h-3 border-b-2 border-[#4ade80] rounded-b-full" />
              </div>
            )}

            {/* Visor reflection */}
            {!isVisorUp && (
              <div
                className="absolute top-2 right-2 w-8 h-12 rounded-full opacity-30"
                style={{
                  background: 'linear-gradient(135deg, white 0%, transparent 50%)',
                }}
              />
            )}
          </div>

          {/* Neck ring */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-4 rounded-b-lg"
            style={{
              background: 'linear-gradient(180deg, #4ade80 0%, #22c55e 100%)',
              border: '2px solid #166534',
            }}
          />

          {/* Breathing indicator */}
          <div className="absolute -right-4 top-1/2 -translate-y-1/2">
            <div
              className="w-3 h-3 rounded-full transition-all"
              style={{
                background: breathingPhase < 50 ? '#4ade80' : '#4ade8040',
                boxShadow: breathingPhase < 50 ? '0 0 10px #4ade80' : 'none',
              }}
            />
          </div>

          {/* Comm light */}
          <div className="absolute -left-2 top-6">
            <div className="w-2 h-2 rounded-full bg-[#ef4444] animate-pulse" />
          </div>
        </div>

        {/* Name tag */}
        <div className="mt-4 px-4 py-2 rounded" style={{ background: '#1a1a3e', border: '1px solid #4ade8040' }}>
          <div className="font-mono text-sm text-[#4ade80]">CDR. CHEN</div>
          <div className="font-mono text-[10px] text-[#4ade8060]">MISSION SPECIALIST</div>
        </div>

        <div className="mt-2 font-mono text-[10px] text-[#4ade8040]">Click helmet to toggle visor</div>
      </div>
    </div>
  );
};

// --- SPACE MODULE NAV ---
export const SpaceModuleNav = () => {
  const [activeModule, setActiveModule] = useState('core');
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);

  const modules = [
    { id: 'solar-l', label: 'SOLAR-L', x: 5, y: 45, w: 15, h: 10, type: 'solar' },
    { id: 'hab', label: 'HAB', x: 22, y: 35, w: 18, h: 30, type: 'module' },
    { id: 'core', label: 'CORE', x: 42, y: 40, w: 16, h: 20, type: 'module' },
    { id: 'lab', label: 'LAB', x: 60, y: 35, w: 18, h: 30, type: 'module' },
    { id: 'solar-r', label: 'SOLAR-R', x: 80, y: 45, w: 15, h: 10, type: 'solar' },
    { id: 'dock', label: 'DOCK', x: 45, y: 65, w: 10, h: 15, type: 'dock' },
  ];

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#0a0a14' }}>
      <div
        className="p-4 rounded-lg"
        style={{
          background: 'linear-gradient(180deg, #1a1a2e 0%, #0f0f1e 100%)',
          border: '2px solid #4ade8040',
        }}
      >
        {/* Header */}
        <div className="mb-3 pb-2 border-b border-[#4ade8030]">
          <span className="font-mono text-sm text-[#4ade80]">STATION MODULES</span>
        </div>

        {/* Station schematic */}
        <div className="relative w-72 h-40" style={{ background: '#0a0a14' }}>
          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full">
            <line x1="20%" y1="50%" x2="30%" y2="50%" stroke="#4ade8040" strokeWidth="2" />
            <line x1="40%" y1="50%" x2="50%" y2="50%" stroke="#4ade8040" strokeWidth="2" />
            <line x1="58%" y1="50%" x2="68%" y2="50%" stroke="#4ade8040" strokeWidth="2" />
            <line x1="78%" y1="50%" x2="88%" y2="50%" stroke="#4ade8040" strokeWidth="2" />
            <line x1="50%" y1="60%" x2="50%" y2="72%" stroke="#4ade8040" strokeWidth="2" />
          </svg>

          {/* Modules */}
          {modules.map(module => {
            const isActive = activeModule === module.id;
            const isHovered = hoveredModule === module.id;

            return (
              <button
                key={module.id}
                onClick={() => setActiveModule(module.id)}
                onMouseEnter={() => setHoveredModule(module.id)}
                onMouseLeave={() => setHoveredModule(null)}
                className="absolute transition-all duration-200"
                style={{
                  left: `${module.x}%`,
                  top: `${module.y}%`,
                  width: `${module.w}%`,
                  height: `${module.h}%`,
                  background: isActive
                    ? '#4ade8030'
                    : module.type === 'solar'
                      ? '#1a1a3e'
                      : '#1a1a2e',
                  border: `2px solid ${isActive ? '#4ade80' : isHovered ? '#4ade8080' : '#4ade8040'}`,
                  borderRadius: module.type === 'dock' ? '0 0 8px 8px' : '4px',
                  boxShadow: isActive ? '0 0 15px #4ade8040' : 'none',
                }}
              >
                <span
                  className="font-mono text-center block"
                  style={{
                    fontSize: module.type === 'solar' ? '8px' : '10px',
                    color: isActive ? '#4ade80' : '#4ade8080',
                    writingMode: module.type === 'solar' ? 'vertical-rl' : 'horizontal-tb',
                  }}
                >
                  {module.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected module info */}
        <div className="mt-3 pt-2 border-t border-[#4ade8030] flex justify-between">
          <span className="font-mono text-xs text-[#4ade8060]">ACTIVE:</span>
          <span className="font-mono text-xs text-[#4ade80]">{activeModule.toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
};

// --- SPACE BREACH ALERT ---
export const SpaceBreachAlert = () => {
  const [alertActive, setAlertActive] = useState(true);
  const [pulsePhase, setPulsePhase] = useState(0);

  useEffect(() => {
    if (!alertActive) return;
    const interval = setInterval(() => {
      setPulsePhase(p => (p + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, [alertActive]);

  return (
    <div
      className="h-full flex items-center justify-center p-6"
      style={{
        background: alertActive
          ? `radial-gradient(ellipse at 50% 50%, rgba(239, 68, 68, ${0.1 + (pulsePhase % 50) * 0.004}) 0%, #0a0a14 70%)`
          : '#0a0a14',
      }}
    >
      <div
        className="p-4 rounded-lg transition-all duration-200"
        style={{
          background: 'linear-gradient(180deg, #1a1a2e 0%, #0f0f1e 100%)',
          border: `2px solid ${alertActive ? '#ef4444' : '#4ade8040'}`,
          boxShadow: alertActive ? '0 0 30px rgba(239, 68, 68, 0.3)' : 'none',
        }}
      >
        {/* Alert header */}
        <div
          className="flex items-center gap-3 p-3 rounded mb-3"
          style={{
            background: alertActive ? '#ef444420' : '#4ade8020',
            border: `1px solid ${alertActive ? '#ef4444' : '#4ade80'}`,
          }}
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
            style={{
              background: alertActive ? '#ef444430' : '#4ade8030',
              animation: alertActive ? 'alertPulse 0.5s ease-in-out infinite' : 'none',
            }}
          >
            {alertActive ? '⚠️' : '✓'}
          </div>
          <div>
            <div className="font-mono text-sm" style={{ color: alertActive ? '#ef4444' : '#4ade80' }}>
              {alertActive ? 'HULL BREACH DETECTED' : 'HULL INTEGRITY OK'}
            </div>
            <div className="font-mono text-[10px] text-[#4ade8060]">
              {alertActive ? 'SECTION C-7 • DECK 3' : 'ALL SECTIONS NOMINAL'}
            </div>
          </div>
        </div>

        {/* Alert details */}
        {alertActive && (
          <div className="space-y-2 mb-3">
            <div className="flex justify-between p-2 rounded" style={{ background: '#0a0a14' }}>
              <span className="font-mono text-xs text-[#ef444480]">PRESSURE DROP</span>
              <span className="font-mono text-xs text-[#ef4444]">-2.3 kPa/min</span>
            </div>
            <div className="flex justify-between p-2 rounded" style={{ background: '#0a0a14' }}>
              <span className="font-mono text-xs text-[#ef444480]">TIME TO CRITICAL</span>
              <span className="font-mono text-xs text-[#ef4444]">04:32</span>
            </div>
            <div className="flex justify-between p-2 rounded" style={{ background: '#0a0a14' }}>
              <span className="font-mono text-xs text-[#ef444480]">AUTO-SEAL</span>
              <span className="font-mono text-xs text-[#fbbf24]">DEPLOYING...</span>
            </div>
          </div>
        )}

        {/* Action button */}
        <button
          onClick={() => setAlertActive(!alertActive)}
          className="w-full py-3 rounded font-mono text-sm transition-all"
          style={{
            background: alertActive ? '#ef4444' : '#4ade8020',
            color: alertActive ? 'white' : '#4ade80',
            border: `2px solid ${alertActive ? '#ef4444' : '#4ade80'}`,
          }}
        >
          {alertActive ? 'ACKNOWLEDGE ALERT' : 'SIMULATE BREACH'}
        </button>
      </div>

      <style>{`
        @keyframes alertPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
};

// --- SPACE SOLAR DIVIDER ---
export const SpaceSolarDivider = () => {
  const [powerFlow, setPowerFlow] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPowerFlow(p => (p + 2) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex items-center justify-center p-8" style={{ background: '#0a0a14' }}>
      <div className="w-full max-w-md">
        {/* Label */}
        <div className="flex items-center justify-between mb-6">
          <span className="font-mono text-xs text-[#4ade8060]">SOLAR ARRAY A</span>
          <span className="font-mono text-xs text-[#4ade8060]">SOLAR ARRAY B</span>
        </div>

        {/* Divider */}
        <div className="relative h-8 flex items-center">
          {/* Left solar panels */}
          <div className="flex gap-1">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-6 h-8 rounded-sm"
                style={{
                  background: `linear-gradient(180deg, #1a1a3e 0%, #4ade8040 50%, #1a1a3e 100%)`,
                  border: '1px solid #4ade8060',
                  boxShadow: `0 0 ${5 + i * 2}px #4ade8020`,
                }}
              />
            ))}
          </div>

          {/* Center connector with power flow */}
          <div className="flex-1 h-2 mx-2 relative rounded-full overflow-hidden" style={{ background: '#1a1a2e' }}>
            {/* Power flow animation */}
            <div
              className="absolute top-0 bottom-0 w-8 rounded-full"
              style={{
                left: `${powerFlow}%`,
                background: 'linear-gradient(90deg, transparent, #4ade80, transparent)',
                boxShadow: '0 0 10px #4ade80',
              }}
            />
            {/* Center hub */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full"
              style={{
                background: '#4ade80',
                boxShadow: '0 0 15px #4ade80',
              }}
            />
          </div>

          {/* Right solar panels */}
          <div className="flex gap-1">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-6 h-8 rounded-sm"
                style={{
                  background: `linear-gradient(180deg, #1a1a3e 0%, #4ade8040 50%, #1a1a3e 100%)`,
                  border: '1px solid #4ade8060',
                  boxShadow: `0 0 ${5 + (3 - i) * 2}px #4ade8020`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Power output */}
        <div className="flex items-center justify-center mt-6">
          <div className="flex items-center gap-2 px-4 py-2 rounded" style={{ background: '#1a1a3e', border: '1px solid #4ade8040' }}>
            <span className="text-lg">⚡</span>
            <span className="font-mono text-sm text-[#4ade80]">24.7 kW</span>
            <span className="font-mono text-xs text-[#4ade8060]">OUTPUT</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- SPACE THRUST SLIDER ---
export const SpaceThrustSlider = () => {
  const [thrust, setThrust] = useState(0);
  const [isLocked, setIsLocked] = useState(true);

  const thrustLevels = [
    { value: 0, label: 'OFF' },
    { value: 25, label: 'LOW' },
    { value: 50, label: 'MED' },
    { value: 75, label: 'HIGH' },
    { value: 100, label: 'MAX' },
  ];

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#0a0a14' }}>
      <div
        className="p-4 rounded-lg"
        style={{
          background: 'linear-gradient(180deg, #1a1a2e 0%, #0f0f1e 100%)',
          border: '2px solid #4ade8040',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-sm text-[#4ade80]">THRUSTER CONTROL</span>
          <button
            onClick={() => setIsLocked(!isLocked)}
            className="flex items-center gap-1 px-2 py-1 rounded text-xs font-mono"
            style={{
              background: isLocked ? '#ef444420' : '#4ade8020',
              border: `1px solid ${isLocked ? '#ef4444' : '#4ade80'}`,
              color: isLocked ? '#ef4444' : '#4ade80',
            }}
          >
            {isLocked ? '🔒 LOCKED' : '🔓 UNLOCKED'}
          </button>
        </div>

        {/* Thrust display */}
        <div className="flex items-center gap-6">
          {/* Vertical slider */}
          <div className="relative h-48 w-16 flex flex-col items-center">
            {/* Track */}
            <div
              className="absolute inset-x-0 top-0 bottom-0 rounded-lg overflow-hidden mx-auto w-8"
              style={{ background: '#0a0a14', border: '2px solid #4ade8040' }}
            >
              {/* Fill */}
              <div
                className="absolute bottom-0 left-0 right-0 transition-all duration-200"
                style={{
                  height: `${thrust}%`,
                  background: thrust > 75
                    ? 'linear-gradient(180deg, #ef4444, #fbbf24)'
                    : thrust > 50
                      ? 'linear-gradient(180deg, #fbbf24, #4ade80)'
                      : 'linear-gradient(180deg, #4ade80, #22c55e)',
                  boxShadow: `0 0 20px ${thrust > 75 ? '#ef4444' : '#4ade80'}40`,
                }}
              />

              {/* Level markers */}
              {thrustLevels.map(level => (
                <div
                  key={level.value}
                  className="absolute left-full ml-2 font-mono text-[10px]"
                  style={{
                    bottom: `${level.value}%`,
                    transform: 'translateY(50%)',
                    color: thrust >= level.value ? '#4ade80' : '#4ade8040',
                  }}
                >
                  {level.label}
                </div>
              ))}
            </div>

            {/* Slider handle */}
            <input
              type="range"
              min="0"
              max="100"
              value={thrust}
              onChange={e => !isLocked && setThrust(Number(e.target.value))}
              disabled={isLocked}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              style={{
                writingMode: 'vertical-lr',
                direction: 'rtl',
                cursor: isLocked ? 'not-allowed' : 'pointer',
              }}
            />
          </div>

          {/* Thrust readout */}
          <div className="flex flex-col items-center">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center"
              style={{
                background: '#0a0a14',
                border: `4px solid ${thrust > 75 ? '#ef4444' : thrust > 50 ? '#fbbf24' : '#4ade80'}`,
                boxShadow: `0 0 30px ${thrust > 75 ? '#ef4444' : '#4ade80'}40`,
              }}
            >
              <div className="text-center">
                <div
                  className="font-mono text-3xl font-bold"
                  style={{ color: thrust > 75 ? '#ef4444' : thrust > 50 ? '#fbbf24' : '#4ade80' }}
                >
                  {thrust}
                </div>
                <div className="font-mono text-[10px] text-[#4ade8060]">% THRUST</div>
              </div>
            </div>

            {/* Flame effect */}
            <div
              className="mt-4 w-8 transition-all duration-200"
              style={{
                height: `${thrust * 0.5}px`,
                background: thrust > 0
                  ? `linear-gradient(180deg, #fbbf24, #ef4444, transparent)`
                  : 'transparent',
                clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
                filter: thrust > 0 ? 'blur(2px)' : 'none',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// --- SPACE DATA CARD ---
export const SpaceDataCard = () => {
  const [telemetry, setTelemetry] = useState({
    altitude: 408.2,
    velocity: 7.66,
    inclination: 51.6,
    period: 92.68,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry(t => ({
        altitude: t.altitude + (Math.random() - 0.5) * 0.1,
        velocity: t.velocity + (Math.random() - 0.5) * 0.01,
        inclination: 51.6,
        period: 92.68 + (Math.random() - 0.5) * 0.01,
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const dataPoints = [
    { label: 'ALTITUDE', value: telemetry.altitude.toFixed(1), unit: 'km', icon: '📍' },
    { label: 'VELOCITY', value: telemetry.velocity.toFixed(2), unit: 'km/s', icon: '🚀' },
    { label: 'INCLINATION', value: telemetry.inclination.toFixed(1), unit: '°', icon: '📐' },
    { label: 'ORBIT PERIOD', value: telemetry.period.toFixed(2), unit: 'min', icon: '⏱️' },
  ];

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#0a0a14' }}>
      <div
        className="w-full max-w-sm rounded-lg overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #1a1a2e 0%, #0f0f1e 100%)',
          border: '2px solid #4ade8040',
        }}
      >
        {/* Header */}
        <div className="p-4 border-b border-[#4ade8030]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">🛰️</span>
              <span className="font-mono text-sm text-[#4ade80]">ORBITAL TELEMETRY</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse" />
              <span className="font-mono text-[10px] text-[#4ade8060]">LIVE</span>
            </div>
          </div>
        </div>

        {/* Data grid */}
        <div className="p-4 grid grid-cols-2 gap-3">
          {dataPoints.map(point => (
            <div
              key={point.label}
              className="p-3 rounded"
              style={{ background: '#0a0a14', border: '1px solid #4ade8030' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm">{point.icon}</span>
                <span className="font-mono text-[10px] text-[#4ade8060]">{point.label}</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-mono text-xl font-bold text-[#4ade80]">{point.value}</span>
                <span className="font-mono text-xs text-[#4ade8060]">{point.unit}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-4 pb-4">
          <div className="p-2 rounded flex items-center justify-between" style={{ background: '#4ade8010' }}>
            <span className="font-mono text-[10px] text-[#4ade8060]">LAST UPDATE</span>
            <span className="font-mono text-[10px] text-[#4ade80]">{new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- SPACE ROCKET ICON ---
export const SpaceRocketIcon = () => {
  const [isLaunching, setIsLaunching] = useState(false);
  const [flameIntensity, setFlameIntensity] = useState(0);

  useEffect(() => {
    if (!isLaunching) {
      setFlameIntensity(0);
      return;
    }
    const interval = setInterval(() => {
      setFlameIntensity(i => (i + 5) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, [isLaunching]);

  return (
    <div className="h-full flex items-center justify-center p-8" style={{ background: '#0a0a14' }}>
      <div className="flex flex-col items-center">
        {/* Rocket */}
        <div
          className="relative cursor-pointer transition-transform duration-300"
          style={{
            transform: isLaunching ? `translateY(-${flameIntensity * 0.5}px)` : 'translateY(0)',
          }}
          onClick={() => setIsLaunching(!isLaunching)}
        >
          <svg viewBox="0 0 60 100" className="w-24 h-40">
            {/* Rocket body */}
            <defs>
              <linearGradient id="rocketBody" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#d1fae5" />
                <stop offset="50%" stopColor="#f8fafc" />
                <stop offset="100%" stopColor="#9ca3af" />
              </linearGradient>
              <linearGradient id="rocketNose" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#dc2626" />
              </linearGradient>
            </defs>

            {/* Nose cone */}
            <path d="M30 5 L40 25 L20 25 Z" fill="url(#rocketNose)" />

            {/* Body */}
            <rect x="20" y="25" width="20" height="45" fill="url(#rocketBody)" rx="2" />

            {/* Window */}
            <circle cx="30" cy="40" r="6" fill="#0a0a14" stroke="#4ade80" strokeWidth="2" />
            <circle cx="30" cy="40" r="3" fill="#4ade8040" />

            {/* Fins */}
            <path d="M20 60 L10 80 L20 70 Z" fill="#4ade80" />
            <path d="M40 60 L50 80 L40 70 Z" fill="#4ade80" />

            {/* Engine */}
            <rect x="22" y="70" width="16" height="8" fill="#1a1a3e" rx="2" />
            <rect x="25" y="78" width="10" height="5" fill="#4ade80" />
          </svg>

          {/* Flame */}
          {isLaunching && (
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0">
              <svg viewBox="0 0 40 60" className="w-16 h-24">
                <defs>
                  <linearGradient id="flameGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#fbbf24" />
                    <stop offset="50%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d={`M20 0 Q${15 + Math.sin(flameIntensity * 0.2) * 5} 20 ${10 + Math.sin(flameIntensity * 0.3) * 3} ${40 + flameIntensity * 0.2} Q20 ${35 + flameIntensity * 0.1} ${30 - Math.sin(flameIntensity * 0.3) * 3} ${40 + flameIntensity * 0.2} Q${25 - Math.sin(flameIntensity * 0.2) * 5} 20 20 0`}
                  fill="url(#flameGrad)"
                  style={{ filter: 'blur(2px)' }}
                />
              </svg>
            </div>
          )}
        </div>

        {/* Launch pad */}
        <div
          className="w-32 h-2 rounded mt-2"
          style={{
            background: 'linear-gradient(90deg, #4ade8040, #4ade80, #4ade8040)',
          }}
        />

        {/* Status */}
        <div className="mt-4 flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{
              background: isLaunching ? '#4ade80' : '#ef4444',
              boxShadow: `0 0 10px ${isLaunching ? '#4ade80' : '#ef4444'}`,
            }}
          />
          <span className="font-mono text-sm" style={{ color: isLaunching ? '#4ade80' : '#ef4444' }}>
            {isLaunching ? 'ENGINES FIRING' : 'STANDBY'}
          </span>
        </div>

        <div className="mt-2 font-mono text-[10px] text-[#4ade8040]">Click rocket to launch</div>
      </div>
    </div>
  );
};

// --- SPACE HOLOGRAM HEADING ---
export const SpaceHologramHeading = () => {
  const [glitchPhase, setGlitchPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchPhase(p => (p + 1) % 200);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const isGlitching = glitchPhase > 180 && glitchPhase < 190;

  return (
    <div className="h-full flex items-center justify-center p-8" style={{ background: '#0a0a14' }}>
      <div className="relative">
        {/* Hologram base */}
        <div
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-48 h-4 rounded-full"
          style={{
            background: 'radial-gradient(ellipse, #4ade8040 0%, transparent 70%)',
          }}
        />

        {/* Scan lines overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(74, 222, 128, 0.03) 2px, rgba(74, 222, 128, 0.03) 4px)',
          }}
        />

        {/* Main heading */}
        <div className="relative">
          {/* Glitch layers */}
          <div
            className="absolute inset-0 font-mono text-4xl font-bold"
            style={{
              color: '#ef4444',
              opacity: isGlitching ? 0.8 : 0,
              transform: isGlitching ? 'translateX(-3px)' : 'translateX(0)',
              clipPath: isGlitching ? 'polygon(0 0, 100% 0, 100% 45%, 0 45%)' : 'none',
            }}
          >
            STATION ALPHA
          </div>
          <div
            className="absolute inset-0 font-mono text-4xl font-bold"
            style={{
              color: '#60a5fa',
              opacity: isGlitching ? 0.8 : 0,
              transform: isGlitching ? 'translateX(3px)' : 'translateX(0)',
              clipPath: isGlitching ? 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)' : 'none',
            }}
          >
            STATION ALPHA
          </div>

          {/* Main text */}
          <h1
            className="font-mono text-4xl font-bold tracking-wider"
            style={{
              color: '#4ade80',
              textShadow: '0 0 20px #4ade8080, 0 0 40px #4ade8040, 0 0 60px #4ade8020',
              opacity: isGlitching ? 0.6 : 1,
            }}
          >
            STATION ALPHA
          </h1>
        </div>

        {/* Subtitle */}
        <div className="text-center mt-2">
          <span
            className="font-mono text-sm tracking-widest"
            style={{
              color: '#4ade8080',
              textShadow: '0 0 10px #4ade8040',
            }}
          >
            ORBITAL RESEARCH PLATFORM
          </span>
        </div>

        {/* Decorative elements */}
        <div className="flex justify-center gap-4 mt-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{
                background: '#4ade80',
                boxShadow: '0 0 10px #4ade80',
                opacity: 0.3 + (i % 3) * 0.3,
                animation: `hologramDot ${1 + i * 0.2}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes hologramDot {
          0%, 100% { transform: translateY(0); opacity: 0.3; }
          50% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

// --- SPACE STARS BACKGROUND ---
export const SpaceStarsBackground = () => {
  const [stars] = useState(() =>
    [...Array(100)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 0.5 + Math.random() * 2,
      speed: 0.02 + Math.random() * 0.08,
      opacity: 0.3 + Math.random() * 0.7,
      twinkleOffset: Math.random() * Math.PI * 2,
    }))
  );

  const [offset, setOffset] = useState(0);
  const [twinklePhase, setTwinklePhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset(o => (o + 0.1) % 100);
      setTwinklePhase(p => p + 0.1);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="h-full relative overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 50%, #1a1a3e 0%, #0a0a14 50%, #050510 100%)',
      }}
    >
      {/* Distant nebula */}
      <div
        className="absolute w-96 h-96 rounded-full opacity-20"
        style={{
          left: '60%',
          top: '20%',
          background: 'radial-gradient(ellipse, #a78bfa 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        className="absolute w-64 h-64 rounded-full opacity-15"
        style={{
          left: '10%',
          top: '60%',
          background: 'radial-gradient(ellipse, #4ade80 0%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />

      {/* Stars */}
      {stars.map(star => {
        const twinkle = Math.sin(twinklePhase + star.twinkleOffset);
        const adjustedY = (star.y + offset * star.speed * 10) % 100;

        return (
          <div
            key={star.id}
            className="absolute rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${adjustedY}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              background: '#fff',
              opacity: star.opacity * (0.5 + twinkle * 0.5),
              boxShadow: star.size > 1.5 ? `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.5)` : 'none',
            }}
          />
        );
      })}

      {/* Shooting star (occasional) */}
      {offset > 50 && offset < 52 && (
        <div
          className="absolute w-20 h-0.5"
          style={{
            left: '70%',
            top: '30%',
            background: 'linear-gradient(90deg, transparent, white, transparent)',
            transform: 'rotate(-45deg)',
            animation: 'shootingStar 0.5s linear',
          }}
        />
      )}

      {/* Content overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="font-mono text-2xl text-[#d1fae5] mb-2" style={{ textShadow: '0 0 20px rgba(209, 250, 229, 0.5)' }}>
            DEEP SPACE VIEW
          </div>
          <div className="font-mono text-xs text-[#4ade8060]">
            100 STARS RENDERED
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shootingStar {
          0% { opacity: 0; transform: rotate(-45deg) translateX(-50px); }
          50% { opacity: 1; }
          100% { opacity: 0; transform: rotate(-45deg) translateX(100px); }
        }
      `}</style>
    </div>
  );
};

// Export all components
export const spaceStationComponents: Record<string, React.ComponentType> = {
  'airlock-button': AirlockButton,
  'orbital-progress': OrbitalProgress,
  'module-grid': ModuleGridNav,
  'life-support-gauge': LifeSupportGauge,
  'zero-g-cards': ZeroGCards,
  'comm-link-status': CommLinkStatus,
  'navigation-console': NavigationConsole,
  'crew-roster': CrewRoster,
  'power-grid': PowerGrid,
  'docking-display': DockingDisplay,
  'space-comm-input': SpaceCommInput,
  'space-mission-badge': SpaceMissionBadge,
  'space-fuel-progress': SpaceFuelProgress,
  'space-helmet-avatar': SpaceHelmetAvatar,
  'space-module-nav': SpaceModuleNav,
  'space-breach-alert': SpaceBreachAlert,
  'space-solar-divider': SpaceSolarDivider,
  'space-thrust-slider': SpaceThrustSlider,
  'space-data-card': SpaceDataCard,
  'space-rocket-icon': SpaceRocketIcon,
  'space-hologram-heading': SpaceHologramHeading,
  'space-stars-background': SpaceStarsBackground,
};
