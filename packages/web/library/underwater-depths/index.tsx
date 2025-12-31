import React, { useState, useEffect, useRef } from 'react';

// --- BIOLUMINESCENT BUTTON ---
export const BioluminescentButton = () => {
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = { id: Date.now(), x, y };
    setRipples(prev => [...prev, newRipple]);

    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 1000);
  };

  return (
    <div className="h-full flex items-center justify-center p-8" style={{ background: 'linear-gradient(180deg, #021a2d 0%, #033d5e 50%, #011627 100%)' }}>
      <button
        ref={buttonRef}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        onClick={handleClick}
        className="relative px-8 py-4 rounded-full overflow-hidden transition-all duration-300"
        style={{
          background: isPressed
            ? 'radial-gradient(ellipse at center, #00e5ff40 0%, #00e5ff10 50%, transparent 70%)'
            : 'radial-gradient(ellipse at center, #00e5ff20 0%, #00e5ff05 50%, transparent 70%)',
          border: '2px solid',
          borderColor: isPressed ? '#00e5ff' : '#00e5ff60',
          boxShadow: isPressed
            ? '0 0 40px #00e5ff60, inset 0 0 20px #00e5ff30'
            : '0 0 20px #00e5ff30, inset 0 0 10px #00e5ff10',
          transform: isPressed ? 'scale(0.98)' : 'scale(1)',
        }}
      >
        {/* Bioluminescent particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full animate-pulse"
              style={{
                background: '#00e5ff',
                boxShadow: '0 0 6px #00e5ff',
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 3) * 25}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${1.5 + i * 0.2}s`,
              }}
            />
          ))}
        </div>

        {/* Ripple effects */}
        {ripples.map(ripple => (
          <div
            key={ripple.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 0,
              height: 0,
              background: 'radial-gradient(circle, #00e5ff60 0%, transparent 70%)',
              transform: 'translate(-50%, -50%)',
              animation: 'biolumRipple 1s ease-out forwards',
            }}
          />
        ))}

        <span className="relative z-10 text-cyan-300 font-medium tracking-wide">
          ACTIVATE
        </span>
      </button>

      <style>{`
        @keyframes biolumRipple {
          0% { width: 0; height: 0; opacity: 1; }
          100% { width: 200px; height: 200px; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

// --- BUBBLE STREAM LOADER ---
export const BubbleStreamLoader = () => {
  const [progress, setProgress] = useState(0);
  const [bubbles, setBubbles] = useState<{ id: number; x: number; size: number; delay: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => p >= 100 ? 0 : p + 1);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Generate bubbles
    const newBubbles = [...Array(20)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 4 + Math.random() * 12,
      delay: Math.random() * 3,
    }));
    setBubbles(newBubbles);
  }, []);

  return (
    <div className="h-full flex flex-col items-center justify-center p-8 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #011627 0%, #033d5e 100%)' }}>
      {/* Rising bubbles */}
      {bubbles.map(bubble => (
        <div
          key={bubble.id}
          className="absolute rounded-full opacity-60"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.x}%`,
            bottom: '-20px',
            background: 'radial-gradient(circle at 30% 30%, #ffffff40, #00e5ff20)',
            border: '1px solid #00e5ff30',
            animation: `bubbleRise ${3 + Math.random() * 2}s linear infinite`,
            animationDelay: `${bubble.delay}s`,
          }}
        />
      ))}

      {/* Loader container */}
      <div className="relative w-48 h-48">
        {/* Glass container */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'linear-gradient(180deg, #00e5ff10 0%, #00e5ff05 100%)',
            border: '3px solid #00e5ff30',
            boxShadow: 'inset 0 0 30px #00e5ff10, 0 0 20px #00e5ff10',
          }}
        />

        {/* Water fill */}
        <div
          className="absolute bottom-0 left-0 right-0 rounded-b-full overflow-hidden transition-all duration-100"
          style={{ height: `${progress}%` }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, #00e5ff40 0%, #00e5ff20 100%)',
              animation: 'waterWave 2s ease-in-out infinite',
            }}
          />
        </div>

        {/* Center percentage */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-mono font-bold text-cyan-300" style={{ textShadow: '0 0 10px #00e5ff' }}>
            {progress}%
          </span>
        </div>
      </div>

      <p className="mt-6 text-cyan-400 font-mono text-sm tracking-wider">FILLING TANK...</p>

      <style>{`
        @keyframes bubbleRise {
          0% { transform: translateY(0) scale(1); opacity: 0.6; }
          50% { opacity: 0.8; }
          100% { transform: translateY(-400px) scale(0.5); opacity: 0; }
        }
        @keyframes waterWave {
          0%, 100% { transform: translateX(-5px); }
          50% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
};

// --- PRESSURE GAUGE ---
export const PressureGauge = () => {
  const [pressure, setPressure] = useState(0);
  const [targetPressure, setTargetPressure] = useState(75);

  useEffect(() => {
    const interval = setInterval(() => {
      setPressure(p => {
        const diff = targetPressure - p;
        return p + diff * 0.05;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [targetPressure]);

  const needleRotation = -135 + (pressure / 100) * 270;
  const isWarning = pressure > 80;
  const isCritical = pressure > 90;

  return (
    <div className="h-full flex flex-col items-center justify-center p-8" style={{ background: 'linear-gradient(180deg, #021a2d 0%, #011627 100%)' }}>
      {/* Gauge */}
      <div
        className="relative w-56 h-56 rounded-full"
        style={{
          background: 'linear-gradient(135deg, #0a2a3d 0%, #051520 100%)',
          border: '4px solid #00e5ff30',
          boxShadow: `
            inset 0 0 30px rgba(0,0,0,0.5),
            0 0 20px ${isCritical ? '#ff4444' : isWarning ? '#ffaa00' : '#00e5ff'}30
          `,
        }}
      >
        {/* Scale marks */}
        {[...Array(11)].map((_, i) => {
          const rotation = -135 + i * 27;
          const isMainMark = i % 2 === 0;
          return (
            <div
              key={i}
              className="absolute left-1/2 top-1/2"
              style={{
                transform: `rotate(${rotation}deg) translateY(-90px)`,
                transformOrigin: '0 0',
              }}
            >
              <div
                className="w-0.5 rounded"
                style={{
                  height: isMainMark ? 12 : 6,
                  background: i > 8 ? '#ff4444' : i > 7 ? '#ffaa00' : '#00e5ff',
                  marginLeft: '-1px',
                }}
              />
            </div>
          );
        })}

        {/* Needle */}
        <div
          className="absolute left-1/2 top-1/2 w-1 h-20 rounded origin-bottom transition-transform duration-100"
          style={{
            transform: `translateX(-50%) rotate(${needleRotation}deg)`,
            background: `linear-gradient(to top, ${isCritical ? '#ff4444' : isWarning ? '#ffaa00' : '#00e5ff'}, transparent)`,
            boxShadow: `0 0 10px ${isCritical ? '#ff4444' : isWarning ? '#ffaa00' : '#00e5ff'}60`,
          }}
        />

        {/* Center cap */}
        <div
          className="absolute left-1/2 top-1/2 w-6 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 30%, #00e5ff, #005577)',
            boxShadow: '0 0 10px #00e5ff60',
          }}
        />

        {/* Digital readout */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center">
          <div
            className="font-mono text-2xl font-bold"
            style={{ color: isCritical ? '#ff4444' : isWarning ? '#ffaa00' : '#00e5ff' }}
          >
            {Math.round(pressure)}
          </div>
          <div className="text-xs text-cyan-600">ATM</div>
        </div>
      </div>

      {/* Control buttons */}
      <div className="mt-6 flex gap-4">
        {[25, 50, 75, 95].map(value => (
          <button
            key={value}
            onClick={() => setTargetPressure(value)}
            className="px-3 py-1.5 rounded font-mono text-xs transition-all"
            style={{
              background: targetPressure === value ? '#00e5ff30' : '#00e5ff10',
              border: '1px solid',
              borderColor: targetPressure === value ? '#00e5ff' : '#00e5ff40',
              color: value > 90 ? '#ff4444' : value > 80 ? '#ffaa00' : '#00e5ff',
            }}
          >
            {value} ATM
          </button>
        ))}
      </div>
    </div>
  );
};

// --- SONAR PING ---
export const SonarPing = () => {
  const [pings, setPings] = useState<{ id: number; angle: number; distance: number }[]>([]);
  const [sweepAngle, setSweepAngle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSweepAngle(a => (a + 2) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Generate random pings
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newPing = {
          id: Date.now(),
          angle: Math.random() * 360,
          distance: 20 + Math.random() * 70,
        };
        setPings(prev => [...prev.slice(-10), newPing]);
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex flex-col items-center justify-center p-8" style={{ background: '#011627' }}>
      {/* Sonar display */}
      <div
        className="relative w-64 h-64 rounded-full overflow-hidden"
        style={{
          background: 'radial-gradient(circle, #001a1a 0%, #000a0a 100%)',
          border: '3px solid #00e5ff40',
          boxShadow: 'inset 0 0 50px #00e5ff10, 0 0 30px #00e5ff10',
        }}
      >
        {/* Grid circles */}
        {[25, 50, 75, 100].map(r => (
          <div
            key={r}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: `${r}%`,
              height: `${r}%`,
              border: '1px solid #00e5ff20',
            }}
          />
        ))}

        {/* Cross lines */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#00e5ff20]" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-[#00e5ff20]" />

        {/* Sweep arm */}
        <div
          className="absolute left-1/2 top-1/2 w-1/2 h-0.5 origin-left"
          style={{
            transform: `rotate(${sweepAngle}deg)`,
            background: 'linear-gradient(to right, #00e5ff80, transparent)',
          }}
        />

        {/* Sweep trail */}
        <div
          className="absolute left-1/2 top-1/2 w-1/2 h-1/2 origin-bottom-left"
          style={{
            transform: `rotate(${sweepAngle - 30}deg)`,
            background: 'conic-gradient(from 0deg, transparent, #00e5ff30, transparent)',
          }}
        />

        {/* Ping blips */}
        {pings.map(ping => {
          const x = 50 + (ping.distance / 2) * Math.cos((ping.angle * Math.PI) / 180);
          const y = 50 + (ping.distance / 2) * Math.sin((ping.angle * Math.PI) / 180);
          return (
            <div
              key={ping.id}
              className="absolute w-2 h-2 rounded-full animate-pulse"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -50%)',
                background: '#00e5ff',
                boxShadow: '0 0 10px #00e5ff, 0 0 20px #00e5ff60',
              }}
            />
          );
        })}

        {/* Center dot */}
        <div
          className="absolute left-1/2 top-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: '#00e5ff',
            boxShadow: '0 0 10px #00e5ff',
          }}
        />
      </div>

      {/* Status */}
      <div className="mt-6 text-center">
        <div className="text-cyan-300 font-mono text-sm">ACTIVE CONTACTS: {pings.length}</div>
        <div className="text-cyan-600 font-mono text-xs mt-1">SWEEP: {Math.round(sweepAngle)}°</div>
      </div>
    </div>
  );
};

// --- JELLYFISH CARDS ---
export const JellyfishCards = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const cards = [
    { id: 1, name: 'Moon Jelly', depth: '0-200m', color: '#e0f7ff' },
    { id: 2, name: 'Lion\'s Mane', depth: '200-500m', color: '#ffaa00' },
    { id: 3, name: 'Atolla', depth: '500m+', color: '#ff4477' },
  ];

  return (
    <div className="h-full flex items-center justify-center gap-6 p-8" style={{ background: 'linear-gradient(180deg, #021a2d 0%, #001020 100%)' }}>
      {cards.map((card, index) => (
        <div
          key={card.id}
          className="relative w-40 transition-all duration-700 cursor-pointer"
          style={{
            transform: hoveredCard === card.id
              ? 'translateY(-20px) scale(1.05)'
              : `translateY(${Math.sin(Date.now() / 1000 + index) * 5}px)`,
            animation: hoveredCard !== card.id ? `jellyfloat 3s ease-in-out ${index * 0.5}s infinite` : 'none',
          }}
          onMouseEnter={() => setHoveredCard(card.id)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          {/* Card body */}
          <div
            className="rounded-2xl p-4 backdrop-blur-sm transition-all duration-300"
            style={{
              background: `linear-gradient(180deg, ${card.color}20 0%, ${card.color}05 100%)`,
              border: `2px solid ${card.color}40`,
              boxShadow: hoveredCard === card.id
                ? `0 20px 40px ${card.color}30, 0 0 60px ${card.color}20, inset 0 0 30px ${card.color}10`
                : `0 10px 20px rgba(0,0,0,0.3), inset 0 0 20px ${card.color}05`,
            }}
          >
            {/* Jellyfish icon */}
            <div
              className="w-20 h-20 mx-auto mb-3 rounded-full flex items-center justify-center"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${card.color}60, ${card.color}20)`,
                boxShadow: `0 0 30px ${card.color}40`,
              }}
            >
              {/* Tentacles */}
              <div className="relative">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-0.5 rounded-full"
                    style={{
                      height: 30 + Math.random() * 20,
                      background: `linear-gradient(to bottom, ${card.color}, transparent)`,
                      left: i * 8 - 16,
                      top: 20,
                      animation: `tentacle 2s ease-in-out ${i * 0.2}s infinite`,
                    }}
                  />
                ))}
                {/* Body */}
                <div
                  className="w-12 h-8 rounded-t-full"
                  style={{ background: card.color }}
                />
              </div>
            </div>

            {/* Info */}
            <h3 className="text-center font-medium mb-1" style={{ color: card.color }}>
              {card.name}
            </h3>
            <p className="text-center text-xs text-cyan-500">
              Depth: {card.depth}
            </p>
          </div>

          {/* Glow effect on hover */}
          {hoveredCard === card.id && (
            <div
              className="absolute -inset-4 rounded-3xl -z-10 animate-pulse"
              style={{
                background: `radial-gradient(circle, ${card.color}20 0%, transparent 70%)`,
              }}
            />
          )}
        </div>
      ))}

      <style>{`
        @keyframes jellyfloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes tentacle {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          25% { transform: translateX(3px) rotate(5deg); }
          75% { transform: translateX(-3px) rotate(-5deg); }
        }
      `}</style>
    </div>
  );
};

// --- DEPTH METER ---
export const DepthMeter = () => {
  const [depth, setDepth] = useState(250);
  const [isDescending, setIsDescending] = useState(false);

  useEffect(() => {
    if (!isDescending) return;
    const interval = setInterval(() => {
      setDepth(d => {
        if (d >= 1000) {
          setIsDescending(false);
          return 1000;
        }
        return d + 5;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [isDescending]);

  const depthPercentage = (depth / 1000) * 100;

  return (
    <div className="h-full flex items-center justify-center gap-8 p-8" style={{ background: 'linear-gradient(180deg, #033d5e 0%, #011627 50%, #000810 100%)' }}>
      {/* Depth gauge */}
      <div className="relative h-80 w-16">
        {/* Glass tube */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'linear-gradient(90deg, #00e5ff10 0%, #00e5ff05 50%, #00e5ff10 100%)',
            border: '3px solid #00e5ff40',
            boxShadow: 'inset 0 0 20px #00e5ff10',
          }}
        />

        {/* Water fill */}
        <div
          className="absolute bottom-0 left-1 right-1 rounded-full transition-all duration-100"
          style={{
            height: `${depthPercentage}%`,
            background: 'linear-gradient(180deg, #00e5ff60 0%, #005577 100%)',
            boxShadow: '0 0 20px #00e5ff40',
          }}
        />

        {/* Depth markers */}
        {[0, 250, 500, 750, 1000].map((mark) => (
          <div
            key={mark}
            className="absolute left-full ml-2 flex items-center gap-1"
            style={{ bottom: `${(mark / 1000) * 100}%`, transform: 'translateY(50%)' }}
          >
            <div className="w-2 h-0.5 bg-cyan-500" />
            <span className="text-xs font-mono text-cyan-400">{mark}m</span>
          </div>
        ))}

        {/* Diving bell indicator */}
        <div
          className="absolute left-1/2 -translate-x-1/2 w-8 h-10 transition-all duration-100"
          style={{ bottom: `${depthPercentage}%`, transform: 'translateX(-50%) translateY(50%)' }}
        >
          <div
            className="w-full h-full rounded-t-full"
            style={{
              background: 'radial-gradient(circle at 30% 30%, #daa520, #8b6914)',
              border: '2px solid #5a4510',
              boxShadow: '0 0 10px #00e5ff40',
            }}
          >
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-3 rounded-b bg-[#00e5ff40]" />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-4">
        <div
          className="p-4 rounded-lg"
          style={{
            background: '#00e5ff10',
            border: '2px solid #00e5ff30',
          }}
        >
          <div className="text-cyan-300 font-mono text-3xl font-bold">{depth}m</div>
          <div className="text-cyan-600 text-xs mt-1">CURRENT DEPTH</div>
        </div>

        <button
          onClick={() => {
            if (depth >= 1000) setDepth(0);
            setIsDescending(true);
          }}
          className="w-full px-4 py-2 rounded font-mono text-sm transition-all"
          style={{
            background: isDescending ? '#00e5ff30' : '#00e5ff20',
            border: '2px solid #00e5ff',
            color: '#00e5ff',
            boxShadow: isDescending ? '0 0 20px #00e5ff40' : 'none',
          }}
        >
          {isDescending ? 'DESCENDING...' : 'DIVE'}
        </button>

        <button
          onClick={() => { setIsDescending(false); setDepth(0); }}
          className="w-full px-4 py-2 rounded font-mono text-sm"
          style={{
            background: '#ff444420',
            border: '2px solid #ff4444',
            color: '#ff4444',
          }}
        >
          SURFACE
        </button>
      </div>
    </div>
  );
};

// --- CORAL REEF TABS ---
export const CoralReefTabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { name: 'Overview', color: '#ff6b6b' },
    { name: 'Species', color: '#ffd93d' },
    { name: 'Habitat', color: '#6bcb77' },
    { name: 'Threats', color: '#4d96ff' },
  ];

  return (
    <div className="h-full flex flex-col items-center justify-center p-8" style={{ background: 'linear-gradient(180deg, #021a2d 0%, #011627 100%)' }}>
      {/* Tab bar */}
      <div className="flex gap-1 p-2 rounded-lg" style={{ background: '#00e5ff10' }}>
        {tabs.map((tab, i) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(i)}
            className="relative px-6 py-3 rounded transition-all duration-300"
            style={{
              background: activeTab === i ? `${tab.color}30` : 'transparent',
            }}
          >
            {/* Coral branch decoration */}
            <svg
              className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-6 transition-all duration-300"
              viewBox="0 0 40 30"
              style={{
                opacity: activeTab === i ? 1 : 0.3,
                transform: `translateX(-50%) scale(${activeTab === i ? 1.2 : 1})`,
              }}
            >
              <path
                d="M20 30 Q20 20 15 15 Q10 10 5 12 M20 30 Q20 18 20 10 Q20 5 20 2 M20 30 Q20 20 25 15 Q30 10 35 12"
                fill="none"
                stroke={tab.color}
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx="5" cy="12" r="3" fill={tab.color} />
              <circle cx="20" cy="2" r="3" fill={tab.color} />
              <circle cx="35" cy="12" r="3" fill={tab.color} />
            </svg>

            <span
              className="font-medium transition-colors duration-300"
              style={{ color: activeTab === i ? tab.color : '#00e5ff80' }}
            >
              {tab.name}
            </span>

            {/* Active indicator */}
            {activeTab === i && (
              <div
                className="absolute bottom-0 left-2 right-2 h-1 rounded-full"
                style={{ background: tab.color, boxShadow: `0 0 10px ${tab.color}` }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Content area */}
      <div
        className="mt-8 w-80 p-6 rounded-lg transition-all duration-300"
        style={{
          background: `${tabs[activeTab].color}10`,
          border: `2px solid ${tabs[activeTab].color}40`,
        }}
      >
        <h3 className="text-lg font-bold mb-2" style={{ color: tabs[activeTab].color }}>
          {tabs[activeTab].name}
        </h3>
        <p className="text-cyan-400 text-sm">
          Content for the {tabs[activeTab].name.toLowerCase()} section would appear here.
        </p>
      </div>
    </div>
  );
};

// --- ANCHOR TOGGLE ---
export const AnchorToggle = () => {
  const [isAnchored, setIsAnchored] = useState(false);
  const [chainLinks, setChainLinks] = useState(0);

  useEffect(() => {
    if (isAnchored && chainLinks < 5) {
      const timeout = setTimeout(() => setChainLinks(c => c + 1), 150);
      return () => clearTimeout(timeout);
    } else if (!isAnchored && chainLinks > 0) {
      const timeout = setTimeout(() => setChainLinks(c => c - 1), 100);
      return () => clearTimeout(timeout);
    }
  }, [isAnchored, chainLinks]);

  return (
    <div className="h-full flex flex-col items-center justify-center p-8" style={{ background: 'linear-gradient(180deg, #021a2d 0%, #011627 100%)' }}>
      <button
        onClick={() => setIsAnchored(!isAnchored)}
        className="relative"
      >
        {/* Chain links */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-full flex flex-col items-center">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-4 h-6 rounded-full border-4 -mb-2 transition-all duration-200"
              style={{
                borderColor: i < chainLinks ? '#8b8b8b' : 'transparent',
                transform: `scale(${i < chainLinks ? 1 : 0})`,
              }}
            />
          ))}
        </div>

        {/* Anchor */}
        <div
          className="relative w-24 h-32 transition-all duration-500"
          style={{
            transform: isAnchored ? 'translateY(20px)' : 'translateY(0)',
          }}
        >
          <svg viewBox="0 0 100 130" className="w-full h-full">
            {/* Ring at top */}
            <circle
              cx="50"
              cy="15"
              r="10"
              fill="none"
              stroke={isAnchored ? '#00e5ff' : '#8b8b8b'}
              strokeWidth="6"
              className="transition-colors duration-300"
            />
            {/* Vertical shaft */}
            <line
              x1="50"
              y1="25"
              x2="50"
              y2="100"
              stroke={isAnchored ? '#00e5ff' : '#8b8b8b'}
              strokeWidth="8"
              strokeLinecap="round"
              className="transition-colors duration-300"
            />
            {/* Horizontal bar */}
            <line
              x1="25"
              y1="45"
              x2="75"
              y2="45"
              stroke={isAnchored ? '#00e5ff' : '#8b8b8b'}
              strokeWidth="6"
              strokeLinecap="round"
              className="transition-colors duration-300"
            />
            {/* Left fluke */}
            <path
              d="M50 100 Q30 100 20 115 Q25 105 50 95"
              fill={isAnchored ? '#00e5ff' : '#8b8b8b'}
              className="transition-colors duration-300"
            />
            {/* Right fluke */}
            <path
              d="M50 100 Q70 100 80 115 Q75 105 50 95"
              fill={isAnchored ? '#00e5ff' : '#8b8b8b'}
              className="transition-colors duration-300"
            />
          </svg>

          {/* Glow effect when anchored */}
          {isAnchored && (
            <div
              className="absolute inset-0 rounded-full animate-pulse"
              style={{
                background: 'radial-gradient(circle, #00e5ff20 0%, transparent 70%)',
              }}
            />
          )}
        </div>
      </button>

      {/* Status */}
      <div className="mt-8 text-center">
        <div
          className="font-mono text-lg font-bold transition-colors duration-300"
          style={{ color: isAnchored ? '#00e5ff' : '#8b8b8b' }}
        >
          {isAnchored ? 'ANCHORED' : 'ADRIFT'}
        </div>
        <div className="text-cyan-600 text-xs mt-1">
          Click anchor to toggle
        </div>
      </div>
    </div>
  );
};

// --- SUBMARINE DASHBOARD ---
export const SubmarineDashboard = () => {
  const [power, setPower] = useState(75);
  const [oxygen, setOxygen] = useState(92);
  const [heading, setHeading] = useState(127);

  useEffect(() => {
    const interval = setInterval(() => {
      setOxygen(o => Math.max(0, Math.min(100, o + (Math.random() - 0.52) * 2)));
      setHeading(h => (h + (Math.random() - 0.5) * 3 + 360) % 360);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const GaugeRing = ({ value, max, color, label }: { value: number; max: number; color: string; label: string }) => (
    <div className="relative w-24 h-24">
      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
        <circle cx="50" cy="50" r="40" fill="none" stroke="#00e5ff10" strokeWidth="8" />
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeDasharray={`${(value / max) * 251} 251`}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 5px ${color})` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-lg font-bold" style={{ color }}>{Math.round(value)}</span>
        <span className="text-[10px] text-cyan-600">{label}</span>
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col items-center justify-center p-8" style={{ background: 'radial-gradient(ellipse at center, #0a2a3d 0%, #011627 100%)' }}>
      {/* Dashboard panel */}
      <div
        className="p-6 rounded-xl"
        style={{
          background: 'linear-gradient(180deg, #0f3040 0%, #051520 100%)',
          border: '4px solid #00e5ff30',
          boxShadow: 'inset 0 0 30px #00e5ff10, 0 0 20px #00000080',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-cyan-800">
          <span className="font-mono text-sm text-cyan-400">NAUTILUS-7</span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-green-400">ONLINE</span>
          </div>
        </div>

        {/* Gauges row */}
        <div className="flex gap-6 mb-6">
          <GaugeRing value={power} max={100} color="#00e5ff" label="POWER" />
          <GaugeRing value={oxygen} max={100} color="#4ade80" label="O₂" />
          <GaugeRing value={heading} max={360} color="#fbbf24" label="HDG" />
        </div>

        {/* Power slider */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-cyan-600">THROTTLE</span>
            <span className="text-cyan-400 font-mono">{power}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={power}
            onChange={(e) => setPower(parseInt(e.target.value))}
            className="w-full h-3 rounded-full appearance-none cursor-pointer"
            style={{ background: `linear-gradient(90deg, #00e5ff ${power}%, #0a2a3d ${power}%)` }}
          />
        </div>
      </div>

      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: radial-gradient(circle at 30% 30%, #00e5ff, #005577);
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 10px #00e5ff;
        }
      `}</style>
    </div>
  );
};

// --- PEARL NOTIFICATION ---
export const PearlNotification = () => {
  const [notifications, setNotifications] = useState(3);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-8" style={{ background: 'linear-gradient(180deg, #021a2d 0%, #011627 100%)' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        {/* Clam shell */}
        <div className="relative w-40 h-32">
          {/* Bottom shell */}
          <div
            className="absolute bottom-0 w-full h-16 rounded-b-full"
            style={{
              background: 'linear-gradient(180deg, #8b6914 0%, #5a4510 100%)',
              boxShadow: 'inset 0 -5px 15px rgba(0,0,0,0.3)',
            }}
          >
            {/* Shell ridges */}
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className="absolute bottom-0 h-full"
                style={{
                  left: `${10 + i * 13}%`,
                  width: '2px',
                  background: 'linear-gradient(180deg, transparent, #3d2a14)',
                }}
              />
            ))}
          </div>

          {/* Top shell */}
          <div
            className="absolute top-0 w-full h-20 rounded-t-full origin-bottom transition-transform duration-500"
            style={{
              background: 'linear-gradient(0deg, #8b6914 0%, #cd9b1d 100%)',
              boxShadow: 'inset 0 5px 15px rgba(255,255,255,0.2)',
              transform: isOpen ? 'rotateX(-60deg)' : 'rotateX(0deg)',
            }}
          >
            {/* Shell ridges */}
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className="absolute top-0 h-full"
                style={{
                  left: `${10 + i * 13}%`,
                  width: '2px',
                  background: 'linear-gradient(0deg, transparent, #daa520)',
                }}
              />
            ))}
          </div>

          {/* Pearl with notification count */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500"
            style={{
              background: 'radial-gradient(circle at 30% 30%, #ffffff, #e0e0e0, #b0b0b0)',
              boxShadow: isOpen
                ? '0 0 30px #ffffff80, 0 0 60px #00e5ff40'
                : '0 0 10px #ffffff40',
              transform: isOpen ? 'scale(1.2)' : 'scale(1)',
            }}
          >
            {notifications > 0 && (
              <span
                className="font-bold text-lg"
                style={{ color: '#5a4510' }}
              >
                {notifications}
              </span>
            )}
          </div>
        </div>
      </button>

      {/* Notification controls */}
      <div className="ml-8 space-y-2">
        <button
          onClick={() => setNotifications(n => n + 1)}
          className="block px-4 py-2 rounded font-mono text-sm w-full"
          style={{
            background: '#00e5ff20',
            border: '1px solid #00e5ff',
            color: '#00e5ff',
          }}
        >
          Add +
        </button>
        <button
          onClick={() => setNotifications(n => Math.max(0, n - 1))}
          className="block px-4 py-2 rounded font-mono text-sm w-full"
          style={{
            background: '#ff444420',
            border: '1px solid #ff4444',
            color: '#ff4444',
          }}
        >
          Clear 1
        </button>
      </div>
    </div>
  );
};

// Export all components
export const underwaterComponents = {
  'bioluminescent-button': BioluminescentButton,
  'bubble-stream-loader': BubbleStreamLoader,
  'pressure-gauge': PressureGauge,
  'sonar-ping': SonarPing,
  'jellyfish-cards': JellyfishCards,
  'depth-meter': DepthMeter,
  'coral-reef-tabs': CoralReefTabs,
  'anchor-toggle': AnchorToggle,
  'submarine-dashboard': SubmarineDashboard,
  'pearl-notification': PearlNotification,
};
