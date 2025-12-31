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

// --- UNDERWATER PRESSURE GAUGE ---
export const UnderwaterPressureGauge = () => {
  const [pressure, setPressure] = useState(1);
  const [depth, setDepth] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDepth(d => {
        const newDepth = d + (Math.random() - 0.3) * 50;
        const clampedDepth = Math.max(0, Math.min(1000, newDepth));
        setPressure(1 + clampedDepth / 10); // 1 ATM per 10m
        return clampedDepth;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const pressurePercent = Math.min((pressure / 100) * 100, 100);
  const isWarning = pressure > 50;
  const isCritical = pressure > 80;

  return (
    <div className="h-full flex flex-col items-center justify-center p-8" style={{ background: 'linear-gradient(180deg, #021a2d 0%, #011627 100%)' }}>
      {/* Main gauge */}
      <div
        className="relative w-64 h-64 rounded-full"
        style={{
          background: 'radial-gradient(circle, #0a2a3d 0%, #021a2d 70%, #011627 100%)',
          border: '6px solid #033d5e',
          boxShadow: `
            inset 0 0 40px rgba(0,0,0,0.5),
            0 0 30px ${isCritical ? '#ff4444' : isWarning ? '#ffaa00' : '#00e5ff'}40,
            inset 0 0 60px ${isCritical ? '#ff4444' : isWarning ? '#ffaa00' : '#00e5ff'}10
          `,
        }}
      >
        {/* Pressure wave rings */}
        {[1, 2, 3].map(i => (
          <div
            key={i}
            className="absolute inset-0 rounded-full"
            style={{
              border: `1px solid ${isCritical ? '#ff4444' : '#00e5ff'}${20 - i * 5}`,
              animation: `pressureWave ${2 + i * 0.5}s ease-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}

        {/* Scale markings */}
        {[...Array(10)].map((_, i) => {
          const angle = -225 + i * 27;
          return (
            <div
              key={i}
              className="absolute left-1/2 top-1/2"
              style={{
                transform: `rotate(${angle}deg) translateY(-100px)`,
                transformOrigin: '0 0',
              }}
            >
              <div
                className="w-1 h-4 rounded"
                style={{
                  background: i > 7 ? '#ff4444' : i > 5 ? '#ffaa00' : '#00e5ff',
                  marginLeft: '-2px',
                  boxShadow: `0 0 5px ${i > 7 ? '#ff4444' : i > 5 ? '#ffaa00' : '#00e5ff'}`,
                }}
              />
            </div>
          );
        })}

        {/* Pressure arc */}
        <svg className="absolute inset-4" viewBox="0 0 200 200">
          <defs>
            <linearGradient id="pressureGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00e5ff" />
              <stop offset="60%" stopColor="#ffaa00" />
              <stop offset="100%" stopColor="#ff4444" />
            </linearGradient>
          </defs>
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="#033d5e"
            strokeWidth="12"
            strokeDasharray="377 503"
            strokeDashoffset="-63"
            strokeLinecap="round"
          />
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="url(#pressureGrad)"
            strokeWidth="12"
            strokeDasharray={`${pressurePercent * 3.77} 503`}
            strokeDashoffset="-63"
            strokeLinecap="round"
            style={{ filter: 'drop-shadow(0 0 5px currentColor)' }}
          />
        </svg>

        {/* Center display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div
            className="font-mono text-4xl font-bold transition-colors duration-300"
            style={{
              color: isCritical ? '#ff4444' : isWarning ? '#ffaa00' : '#00e5ff',
              textShadow: `0 0 20px ${isCritical ? '#ff4444' : isWarning ? '#ffaa00' : '#00e5ff'}`,
            }}
          >
            {pressure.toFixed(1)}
          </div>
          <div className="text-cyan-600 text-sm font-mono mt-1">ATM</div>
          <div className="text-cyan-500 text-xs mt-2">{Math.round(depth)}m DEPTH</div>
        </div>

        {/* Warning indicator */}
        {isCritical && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded bg-red-900/50 border border-red-500 animate-pulse">
            <span className="text-red-400 text-xs font-mono">CRITICAL</span>
          </div>
        )}
      </div>

      <style>{`
        @keyframes pressureWave {
          0% { transform: scale(0.95); opacity: 0.5; }
          100% { transform: scale(1.1); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

// --- UNDERWATER SONAR PING ---
export const UnderwaterSonarPing = () => {
  const [pingActive, setPingActive] = useState(false);
  const [pingWaves, setPingWaves] = useState<number[]>([]);
  const [detections, setDetections] = useState<{ id: number; x: number; y: number; type: string }[]>([]);

  const triggerPing = () => {
    if (pingActive) return;
    setPingActive(true);
    const pingId = Date.now();
    setPingWaves(prev => [...prev, pingId]);

    // Simulate detection after ping
    setTimeout(() => {
      const newDetections = [...Array(Math.floor(Math.random() * 3) + 1)].map((_, i) => ({
        id: Date.now() + i,
        x: 20 + Math.random() * 60,
        y: 20 + Math.random() * 60,
        type: ['fish', 'whale', 'submarine', 'wreck'][Math.floor(Math.random() * 4)],
      }));
      setDetections(newDetections);
    }, 800);

    setTimeout(() => {
      setPingWaves(prev => prev.filter(id => id !== pingId));
      setPingActive(false);
    }, 2000);
  };

  useEffect(() => {
    // Auto-clear old detections
    const interval = setInterval(() => {
      setDetections(prev => prev.filter(d => Date.now() - d.id < 5000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex flex-col items-center justify-center p-8" style={{ background: '#011627' }}>
      {/* Sonar display */}
      <div
        className="relative w-72 h-72 rounded-full overflow-hidden cursor-pointer"
        onClick={triggerPing}
        style={{
          background: 'radial-gradient(circle, #001a1a 0%, #000a0a 100%)',
          border: '4px solid #00e5ff30',
          boxShadow: 'inset 0 0 50px #00e5ff10',
        }}
      >
        {/* Grid */}
        <div className="absolute inset-0">
          {[20, 40, 60, 80, 100].map(r => (
            <div
              key={r}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ width: `${r}%`, height: `${r}%`, border: '1px solid #00e5ff15' }}
            />
          ))}
          <div className="absolute left-1/2 top-0 bottom-0 w-px" style={{ background: '#00e5ff15' }} />
          <div className="absolute top-1/2 left-0 right-0 h-px" style={{ background: '#00e5ff15' }} />
        </div>

        {/* Ping waves */}
        {pingWaves.map(id => (
          <div
            key={id}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: 0,
              height: 0,
              border: '3px solid #00e5ff',
              boxShadow: '0 0 20px #00e5ff, inset 0 0 20px #00e5ff',
              animation: 'sonarPingExpand 2s ease-out forwards',
            }}
          />
        ))}

        {/* Detection blips */}
        {detections.map(det => (
          <div
            key={det.id}
            className="absolute"
            style={{
              left: `${det.x}%`,
              top: `${det.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div
              className="w-3 h-3 rounded-full animate-pulse"
              style={{
                background: det.type === 'submarine' ? '#ff4444' : det.type === 'whale' ? '#ffd700' : '#00e5ff',
                boxShadow: `0 0 15px ${det.type === 'submarine' ? '#ff4444' : det.type === 'whale' ? '#ffd700' : '#00e5ff'}`,
              }}
            />
            <div
              className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-mono whitespace-nowrap"
              style={{ color: det.type === 'submarine' ? '#ff4444' : det.type === 'whale' ? '#ffd700' : '#00e5ff' }}
            >
              {det.type.toUpperCase()}
            </div>
          </div>
        ))}

        {/* Center emitter */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full transition-all duration-300"
          style={{
            background: pingActive ? '#00e5ff' : '#00e5ff60',
            boxShadow: pingActive ? '0 0 30px #00e5ff, 0 0 60px #00e5ff60' : '0 0 10px #00e5ff40',
          }}
        />

        {/* Click instruction */}
        {!pingActive && detections.length === 0 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cyan-600 text-xs font-mono animate-pulse">
            CLICK TO PING
          </div>
        )}
      </div>

      {/* Status */}
      <div className="mt-6 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${pingActive ? 'bg-cyan-400 animate-ping' : 'bg-cyan-700'}`} />
          <span className="text-cyan-400 font-mono text-sm">{pingActive ? 'PINGING...' : 'READY'}</span>
        </div>
        <div className="text-cyan-600 font-mono text-sm">
          CONTACTS: {detections.length}
        </div>
      </div>

      <style>{`
        @keyframes sonarPingExpand {
          0% { width: 0; height: 0; opacity: 1; }
          100% { width: 100%; height: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

// --- UNDERWATER KELP DIVIDER ---
export const UnderwaterKelpDivider = () => {
  const kelpStrands = [...Array(12)].map((_, i) => ({
    id: i,
    height: 60 + Math.random() * 40,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 2,
    x: i * 8.5,
  }));

  return (
    <div className="h-full flex items-center justify-center p-8" style={{ background: 'linear-gradient(180deg, #021a2d 0%, #011627 100%)' }}>
      <div className="w-full max-w-md relative h-32">
        {/* Kelp strands */}
        <svg className="w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
          <defs>
            <linearGradient id="kelpGradient" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#033d5e" />
              <stop offset="50%" stopColor="#0a5a3a" />
              <stop offset="100%" stopColor="#0d7a4a" />
            </linearGradient>
            <filter id="kelpGlow">
              <feGaussianBlur stdDeviation="0.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {kelpStrands.map(strand => (
            <g key={strand.id}>
              <path
                d={`M${strand.x} 50 Q${strand.x + 2} ${50 - strand.height * 0.5} ${strand.x} ${50 - strand.height * 0.8} T${strand.x} ${50 - strand.height}`}
                fill="none"
                stroke="url(#kelpGradient)"
                strokeWidth="1.5"
                strokeLinecap="round"
                filter="url(#kelpGlow)"
                style={{
                  animation: `kelpSway ${strand.duration}s ease-in-out infinite`,
                  animationDelay: `${strand.delay}s`,
                  transformOrigin: `${strand.x}px 50px`,
                }}
              />
              {/* Kelp leaves */}
              {[0.3, 0.5, 0.7].map((pos, leafI) => (
                <ellipse
                  key={leafI}
                  cx={strand.x + (leafI % 2 === 0 ? 2 : -2)}
                  cy={50 - strand.height * pos}
                  rx="2"
                  ry="4"
                  fill="#0a6a3a"
                  style={{
                    animation: `kelpSway ${strand.duration}s ease-in-out infinite`,
                    animationDelay: `${strand.delay + leafI * 0.2}s`,
                    transformOrigin: `${strand.x}px ${50 - strand.height * pos}px`,
                  }}
                />
              ))}
            </g>
          ))}
        </svg>

        {/* Bioluminescent particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: '#00e5ff',
              boxShadow: '0 0 6px #00e5ff',
              left: `${10 + i * 12}%`,
              top: `${30 + (i % 3) * 20}%`,
              animation: `biolumFloat ${3 + i * 0.3}s ease-in-out infinite`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}

        {/* Decorative line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-0.5"
          style={{
            background: 'linear-gradient(90deg, transparent, #00e5ff40, #00e5ff, #00e5ff40, transparent)',
          }}
        />
      </div>

      <style>{`
        @keyframes kelpSway {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }
        @keyframes biolumFloat {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.6; }
          50% { transform: translateY(-10px) scale(1.2); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

// --- UNDERWATER PORTHOLE AVATAR ---
export const UnderwaterPortholeAvatar = () => {
  const [bubbles, setBubbles] = useState<{ id: number; x: number; size: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        const newBubble = {
          id: Date.now(),
          x: 30 + Math.random() * 40,
          size: 4 + Math.random() * 8,
        };
        setBubbles(prev => [...prev.slice(-5), newBubble]);
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex items-center justify-center p-8" style={{ background: 'linear-gradient(180deg, #021a2d 0%, #011627 100%)' }}>
      {/* Porthole frame */}
      <div className="relative">
        {/* Outer ring with rivets */}
        <div
          className="w-48 h-48 rounded-full relative"
          style={{
            background: 'linear-gradient(135deg, #5a4a3a 0%, #3a2a1a 50%, #5a4a3a 100%)',
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5), 0 0 30px rgba(0,0,0,0.5)',
          }}
        >
          {/* Rivets */}
          {[...Array(8)].map((_, i) => {
            const angle = (i * 45) * (Math.PI / 180);
            const x = 50 + 45 * Math.cos(angle);
            const y = 50 + 45 * Math.sin(angle);
            return (
              <div
                key={i}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: 'translate(-50%, -50%)',
                  background: 'radial-gradient(circle at 30% 30%, #8b7b6b, #3a2a1a)',
                  boxShadow: 'inset 0 -2px 4px rgba(0,0,0,0.5)',
                }}
              />
            );
          })}

          {/* Inner brass ring */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full"
            style={{
              background: 'linear-gradient(135deg, #cd9b1d 0%, #8b6914 50%, #cd9b1d 100%)',
              boxShadow: 'inset 0 0 10px rgba(0,0,0,0.3)',
            }}
          />

          {/* Glass porthole */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, #033d5e 0%, #021a2d 50%, #011627 100%)',
              boxShadow: 'inset 0 0 30px rgba(0,229,255,0.2), inset 0 0 60px rgba(0,0,0,0.5)',
            }}
          >
            {/* Water caustics effect */}
            <div
              className="absolute inset-0"
              style={{
                background: `
                  radial-gradient(ellipse at 30% 20%, rgba(0,229,255,0.1) 0%, transparent 50%),
                  radial-gradient(ellipse at 70% 60%, rgba(0,229,255,0.08) 0%, transparent 40%)
                `,
                animation: 'caustics 4s ease-in-out infinite',
              }}
            />

            {/* Avatar silhouette (diver) */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-24 h-24">
                {/* Diver helmet */}
                <circle cx="50" cy="40" r="20" fill="#daa520" stroke="#8b6914" strokeWidth="3" />
                <rect x="42" y="32" width="16" height="12" rx="2" fill="#00e5ff40" stroke="#00e5ff" strokeWidth="1" />
                {/* Body */}
                <ellipse cx="50" cy="70" rx="15" ry="20" fill="#2a2a2a" />
                {/* Bubbles from helmet */}
                <circle cx="60" cy="25" r="3" fill="#00e5ff40" className="animate-pulse" />
                <circle cx="65" cy="20" r="2" fill="#00e5ff30" style={{ animationDelay: '0.3s' }} className="animate-pulse" />
              </svg>
            </div>

            {/* Rising bubbles */}
            {bubbles.map(bubble => (
              <div
                key={bubble.id}
                className="absolute rounded-full"
                style={{
                  width: bubble.size,
                  height: bubble.size,
                  left: `${bubble.x}%`,
                  bottom: 0,
                  background: 'radial-gradient(circle at 30% 30%, #ffffff40, #00e5ff20)',
                  border: '1px solid #00e5ff30',
                  animation: 'bubbleRisePorthole 2s ease-out forwards',
                }}
              />
            ))}

            {/* Glass reflection */}
            <div
              className="absolute top-2 left-4 w-8 h-16 rounded-full rotate-[-30deg]"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.15), transparent)',
              }}
            />
          </div>
        </div>

        {/* Name plate */}
        <div
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-4 py-1 rounded"
          style={{
            background: 'linear-gradient(180deg, #cd9b1d, #8b6914)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
          }}
        >
          <span className="text-xs font-mono text-[#021a2d] font-bold">CPT. NEMO</span>
        </div>
      </div>

      <style>{`
        @keyframes caustics {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.1) rotate(5deg); }
        }
        @keyframes bubbleRisePorthole {
          0% { transform: translateY(0); opacity: 0.8; }
          100% { transform: translateY(-150px); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

// --- UNDERWATER DEPTH SLIDER ---
export const UnderwaterDepthSlider = () => {
  const [depth, setDepth] = useState(250);
  const maxDepth = 1000;

  const depthZones = [
    { name: 'Sunlight Zone', maxDepth: 200, color: '#b3e5fc' },
    { name: 'Twilight Zone', maxDepth: 500, color: '#00e5ff' },
    { name: 'Midnight Zone', maxDepth: 800, color: '#033d5e' },
    { name: 'Abyssal Zone', maxDepth: 1000, color: '#021a2d' },
  ];

  const currentZone = depthZones.find(z => depth <= z.maxDepth) || depthZones[depthZones.length - 1];

  return (
    <div className="h-full flex items-center justify-center gap-8 p-8" style={{ background: 'linear-gradient(180deg, #021a2d 0%, #011627 100%)' }}>
      {/* Vertical slider track */}
      <div className="relative h-80 w-20">
        {/* Track background with depth zones */}
        <div
          className="absolute inset-0 rounded-lg overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, #b3e5fc 0%, #00e5ff 20%, #033d5e 50%, #021a2d 80%, #010d15 100%)',
            border: '3px solid #00e5ff40',
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)',
          }}
        >
          {/* Depth markers */}
          {[0, 200, 500, 800, 1000].map(d => (
            <div
              key={d}
              className="absolute left-0 right-0 flex items-center"
              style={{ top: `${(d / maxDepth) * 100}%` }}
            >
              <div className="w-3 h-0.5 bg-white/30" />
              <span className="text-[8px] text-white/50 ml-1">{d}m</span>
            </div>
          ))}

          {/* Submarine indicator */}
          <div
            className="absolute left-1/2 -translate-x-1/2 transition-all duration-300"
            style={{ top: `${(depth / maxDepth) * 100}%`, transform: 'translate(-50%, -50%)' }}
          >
            <div
              className="w-12 h-6 rounded-full relative"
              style={{
                background: 'linear-gradient(180deg, #ffd700, #b8860b)',
                boxShadow: '0 0 15px #00e5ff60',
              }}
            >
              {/* Periscope */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-1 h-3 bg-gray-600" />
              {/* Propeller effect */}
              <div
                className="absolute -right-2 top-1/2 -translate-y-1/2 w-2 h-4"
                style={{ animation: 'propSpin 0.2s linear infinite' }}
              >
                <div className="w-full h-0.5 bg-gray-500 rounded" />
                <div className="w-full h-0.5 bg-gray-500 rounded mt-1" />
              </div>
              {/* Window */}
              <div className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-300" />
            </div>
          </div>

          {/* Pressure particles */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white/20"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${(depth / maxDepth) * 100 + i * 5}%`,
                animation: `pressureParticle ${1 + Math.random()}s ease-out infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>

        {/* Slider input */}
        <input
          type="range"
          min="0"
          max={maxDepth}
          value={depth}
          onChange={(e) => setDepth(parseInt(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          style={{ writingMode: 'vertical-lr', direction: 'rtl' }}
        />
      </div>

      {/* Info panel */}
      <div className="space-y-4">
        <div
          className="p-4 rounded-lg"
          style={{
            background: `${currentZone.color}20`,
            border: `2px solid ${currentZone.color}`,
            boxShadow: `0 0 20px ${currentZone.color}30`,
          }}
        >
          <div className="text-cyan-300 font-mono text-3xl font-bold">{depth}m</div>
          <div className="text-cyan-500 text-sm mt-1">{currentZone.name}</div>
        </div>

        {/* Zone indicators */}
        <div className="space-y-2">
          {depthZones.map(zone => (
            <div
              key={zone.name}
              className="flex items-center gap-2 text-xs transition-all duration-300"
              style={{ opacity: currentZone.name === zone.name ? 1 : 0.4 }}
            >
              <div
                className="w-3 h-3 rounded"
                style={{ background: zone.color }}
              />
              <span className="text-cyan-400 font-mono">{zone.name}</span>
            </div>
          ))}
        </div>

        {/* Pressure indicator */}
        <div className="text-cyan-600 text-xs font-mono">
          PRESSURE: {(1 + depth / 10).toFixed(1)} ATM
        </div>
      </div>

      <style>{`
        @keyframes propSpin {
          0% { transform: translateY(-50%) rotate(0deg); }
          100% { transform: translateY(-50%) rotate(360deg); }
        }
        @keyframes pressureParticle {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(0) translateY(-20px); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

// --- UNDERWATER SUBMARINE NAV ---
export const UnderwaterSubmarineNav = () => {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [isPowered, setIsPowered] = useState(true);

  const navItems = [
    { id: 'dashboard', label: 'DASH', icon: 'M4 6h16M4 12h16M4 18h16' },
    { id: 'sonar', label: 'SONAR', icon: 'M12 2a10 10 0 100 20 10 10 0 000-20zm0 4a6 6 0 110 12 6 6 0 010-12z' },
    { id: 'torpedo', label: 'ARMS', icon: 'M12 2L2 12h3v8h6v-6h2v6h6v-8h3L12 2z' },
    { id: 'comms', label: 'COMMS', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z' },
    { id: 'engine', label: 'ENG', icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z' },
  ];

  return (
    <div className="h-full flex flex-col items-center justify-center p-8" style={{ background: 'radial-gradient(ellipse at center, #0a2a3d 0%, #011627 100%)' }}>
      {/* Control panel frame */}
      <div
        className="relative p-6 rounded-xl"
        style={{
          background: 'linear-gradient(180deg, #1a3a4a 0%, #0a2030 100%)',
          border: '4px solid #2a4a5a',
          boxShadow: `
            inset 0 0 30px rgba(0,0,0,0.5),
            0 0 ${isPowered ? '30px' : '0px'} #00e5ff20
          `,
        }}
      >
        {/* Power indicator strip */}
        <div
          className="absolute top-0 left-4 right-4 h-1 rounded-b transition-all duration-500"
          style={{
            background: isPowered ? '#00e5ff' : '#333',
            boxShadow: isPowered ? '0 0 10px #00e5ff' : 'none',
          }}
        />

        {/* Navigation buttons */}
        <div className="flex gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => isPowered && setActiveNav(item.id)}
              disabled={!isPowered}
              className="relative group"
            >
              {/* Button housing */}
              <div
                className="w-16 h-20 rounded-lg flex flex-col items-center justify-center gap-2 transition-all duration-300"
                style={{
                  background: activeNav === item.id && isPowered
                    ? 'linear-gradient(180deg, #00e5ff30 0%, #00e5ff10 100%)'
                    : 'linear-gradient(180deg, #1a2a3a 0%, #0a1a2a 100%)',
                  border: `2px solid ${activeNav === item.id && isPowered ? '#00e5ff' : '#2a3a4a'}`,
                  boxShadow: activeNav === item.id && isPowered
                    ? 'inset 0 0 15px #00e5ff30, 0 0 10px #00e5ff30'
                    : 'inset 0 2px 5px rgba(0,0,0,0.3)',
                  transform: activeNav === item.id ? 'translateY(2px)' : 'translateY(0)',
                }}
              >
                {/* Icon */}
                <div
                  className="w-6 h-6 rounded transition-all duration-300"
                  style={{
                    background: activeNav === item.id && isPowered ? '#00e5ff' : '#3a4a5a',
                    boxShadow: activeNav === item.id && isPowered ? '0 0 10px #00e5ff' : 'none',
                  }}
                />

                {/* Label */}
                <span
                  className="text-[10px] font-mono font-bold transition-colors duration-300"
                  style={{ color: activeNav === item.id && isPowered ? '#00e5ff' : '#5a6a7a' }}
                >
                  {item.label}
                </span>

                {/* Active indicator LED */}
                <div
                  className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full transition-all duration-300"
                  style={{
                    background: activeNav === item.id && isPowered ? '#00e5ff' : '#1a2a3a',
                    boxShadow: activeNav === item.id && isPowered ? '0 0 8px #00e5ff' : 'none',
                  }}
                />
              </div>
            </button>
          ))}
        </div>

        {/* Status bar */}
        <div className="mt-4 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${isPowered ? 'bg-green-400 animate-pulse' : 'bg-red-500'}`}
              style={{ boxShadow: isPowered ? '0 0 8px #4ade80' : '0 0 8px #ef4444' }}
            />
            <span style={{ color: isPowered ? '#4ade80' : '#ef4444' }}>
              {isPowered ? 'SYSTEMS ONLINE' : 'POWER OFF'}
            </span>
          </div>
          <span className="text-cyan-600">NAV: {activeNav.toUpperCase()}</span>
        </div>

        {/* Power toggle */}
        <button
          onClick={() => setIsPowered(!isPowered)}
          className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-12 rounded-r-lg transition-all duration-300"
          style={{
            background: isPowered ? '#00e5ff' : '#ff4444',
            boxShadow: `0 0 15px ${isPowered ? '#00e5ff' : '#ff4444'}60`,
          }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-1 h-6 rounded bg-white/50" />
          </div>
        </button>
      </div>

      {/* Label */}
      <div className="mt-4 text-cyan-600 text-xs font-mono">SUBMARINE NAVIGATION CONSOLE</div>
    </div>
  );
};

// --- UNDERWATER OXYGEN PROGRESS ---
export const UnderwaterOxygenProgress = () => {
  const [oxygen, setOxygen] = useState(85);
  const [isConsuming, setIsConsuming] = useState(true);

  useEffect(() => {
    if (!isConsuming) return;
    const interval = setInterval(() => {
      setOxygen(o => Math.max(0, o - 0.2));
    }, 100);
    return () => clearInterval(interval);
  }, [isConsuming]);

  const isLow = oxygen < 30;
  const isCritical = oxygen < 15;

  return (
    <div className="h-full flex flex-col items-center justify-center p-8" style={{ background: 'linear-gradient(180deg, #021a2d 0%, #011627 100%)' }}>
      {/* Oxygen tank */}
      <div className="relative">
        {/* Tank body */}
        <div
          className="relative w-24 h-56 rounded-t-full rounded-b-lg overflow-hidden"
          style={{
            background: 'linear-gradient(90deg, #2a3a4a 0%, #3a4a5a 30%, #4a5a6a 50%, #3a4a5a 70%, #2a3a4a 100%)',
            border: '3px solid #4a5a6a',
            boxShadow: 'inset -10px 0 20px rgba(0,0,0,0.3), inset 10px 0 20px rgba(255,255,255,0.05)',
          }}
        >
          {/* Tank fill */}
          <div
            className="absolute bottom-0 left-0 right-0 transition-all duration-300"
            style={{
              height: `${oxygen}%`,
              background: isCritical
                ? 'linear-gradient(180deg, #ff4444 0%, #aa2222 100%)'
                : isLow
                ? 'linear-gradient(180deg, #ffaa00 0%, #cc8800 100%)'
                : 'linear-gradient(180deg, #00e5ff 0%, #0088aa 100%)',
              boxShadow: `inset 0 10px 30px ${isCritical ? '#ff6666' : isLow ? '#ffcc00' : '#00ffff'}40`,
            }}
          >
            {/* Bubbles inside tank */}
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: 4 + Math.random() * 6,
                  height: 4 + Math.random() * 6,
                  left: `${20 + Math.random() * 60}%`,
                  bottom: `${Math.random() * 80}%`,
                  background: 'rgba(255,255,255,0.3)',
                  animation: `tankBubble ${1 + Math.random()}s ease-in-out infinite`,
                  animationDelay: `${i * 0.3}s`,
                }}
              />
            ))}
          </div>

          {/* Tank markings */}
          {[25, 50, 75, 100].map(mark => (
            <div
              key={mark}
              className="absolute left-0 right-0 flex items-center"
              style={{ bottom: `${mark}%` }}
            >
              <div className="w-full h-px bg-white/20" />
              <span className="absolute right-2 text-[8px] text-white/40 font-mono">{mark}</span>
            </div>
          ))}

          {/* Pressure gauge on tank */}
          <div
            className="absolute top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full"
            style={{
              background: 'radial-gradient(circle, #1a2a3a, #0a1a2a)',
              border: '2px solid #3a4a5a',
            }}
          >
            <div
              className="absolute left-1/2 top-1/2 w-0.5 h-4 origin-bottom transition-transform duration-300"
              style={{
                transform: `translate(-50%, -100%) rotate(${-90 + oxygen * 1.8}deg)`,
                background: isCritical ? '#ff4444' : '#00e5ff',
              }}
            />
          </div>
        </div>

        {/* Valve at top */}
        <div
          className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full"
          style={{
            background: 'linear-gradient(135deg, #cd9b1d, #8b6914)',
            border: '2px solid #5a4a3a',
          }}
        >
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-yellow-600 to-yellow-800" />
        </div>

        {/* Warning light */}
        {(isLow || isCritical) && (
          <div
            className="absolute -top-2 -right-2 w-4 h-4 rounded-full animate-pulse"
            style={{
              background: isCritical ? '#ff4444' : '#ffaa00',
              boxShadow: `0 0 15px ${isCritical ? '#ff4444' : '#ffaa00'}`,
            }}
          />
        )}
      </div>

      {/* Display panel */}
      <div
        className="mt-6 p-4 rounded-lg text-center"
        style={{
          background: '#0a1a2a',
          border: `2px solid ${isCritical ? '#ff4444' : isLow ? '#ffaa00' : '#00e5ff'}40`,
        }}
      >
        <div
          className="font-mono text-3xl font-bold transition-colors duration-300"
          style={{
            color: isCritical ? '#ff4444' : isLow ? '#ffaa00' : '#00e5ff',
            textShadow: `0 0 10px ${isCritical ? '#ff4444' : isLow ? '#ffaa00' : '#00e5ff'}`,
          }}
        >
          {oxygen.toFixed(1)}%
        </div>
        <div className="text-cyan-600 text-xs mt-1">O2 REMAINING</div>
        {isCritical && (
          <div className="text-red-400 text-xs mt-2 animate-pulse">!! CRITICAL - SURFACE NOW !!</div>
        )}
      </div>

      {/* Controls */}
      <div className="mt-4 flex gap-3">
        <button
          onClick={() => setOxygen(100)}
          className="px-4 py-2 rounded font-mono text-xs"
          style={{
            background: '#00e5ff20',
            border: '1px solid #00e5ff',
            color: '#00e5ff',
          }}
        >
          REFILL
        </button>
        <button
          onClick={() => setIsConsuming(!isConsuming)}
          className="px-4 py-2 rounded font-mono text-xs"
          style={{
            background: isConsuming ? '#ff444420' : '#4ade8020',
            border: `1px solid ${isConsuming ? '#ff4444' : '#4ade80'}`,
            color: isConsuming ? '#ff4444' : '#4ade80',
          }}
        >
          {isConsuming ? 'STOP' : 'START'}
        </button>
      </div>

      <style>{`
        @keyframes tankBubble {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-10px) scale(1.2); }
        }
      `}</style>
    </div>
  );
};

// --- UNDERWATER DISTRESS ALERT ---
export const UnderwaterDistressAlert = () => {
  const [isActive, setIsActive] = useState(false);
  const [pulseCount, setPulseCount] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setPulseCount(0);
      return;
    }
    const interval = setInterval(() => {
      setPulseCount(c => c + 1);
    }, 500);
    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className="h-full flex flex-col items-center justify-center p-8" style={{ background: isActive ? '#1a0a0a' : '#011627' }}>
      {/* SOS Signal visual */}
      <div className="relative">
        {/* Radiating waves when active */}
        {isActive && [...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: 200 + i * 60,
              height: 200 + i * 60,
              border: '3px solid #ff4444',
              opacity: 0,
              animation: 'distressWave 1.5s ease-out infinite',
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}

        {/* Main button housing */}
        <div
          className="relative w-48 h-48 rounded-full flex items-center justify-center"
          style={{
            background: isActive
              ? 'radial-gradient(circle, #3a0a0a 0%, #1a0505 100%)'
              : 'radial-gradient(circle, #1a2a3a 0%, #0a1520 100%)',
            border: `6px solid ${isActive ? '#ff4444' : '#2a3a4a'}`,
            boxShadow: isActive
              ? '0 0 50px #ff444460, inset 0 0 30px #ff444430'
              : 'inset 0 0 30px rgba(0,0,0,0.5)',
          }}
        >
          {/* Emergency button */}
          <button
            onClick={() => setIsActive(!isActive)}
            className="w-32 h-32 rounded-full transition-all duration-300 flex flex-col items-center justify-center"
            style={{
              background: isActive
                ? 'radial-gradient(circle at 30% 30%, #ff6666, #ff4444, #cc0000)'
                : 'radial-gradient(circle at 30% 30%, #4a5a6a, #3a4a5a, #2a3a4a)',
              boxShadow: isActive
                ? '0 0 30px #ff4444, inset 0 -5px 20px rgba(0,0,0,0.3)'
                : 'inset 0 -5px 20px rgba(0,0,0,0.3), 0 5px 15px rgba(0,0,0,0.3)',
              transform: isActive ? 'scale(0.95)' : 'scale(1)',
            }}
          >
            {/* SOS text */}
            <span
              className="font-mono text-3xl font-black"
              style={{
                color: isActive ? '#ffffff' : '#5a6a7a',
                textShadow: isActive ? '0 0 20px #ffffff' : 'none',
                animation: isActive ? 'sosFlash 0.5s ease-in-out infinite' : 'none',
              }}
            >
              SOS
            </span>
            <span
              className="text-xs mt-1 font-mono"
              style={{ color: isActive ? '#ffaaaa' : '#4a5a6a' }}
            >
              {isActive ? 'TRANSMITTING' : 'PRESS'}
            </span>
          </button>

          {/* Corner LEDs */}
          {[0, 90, 180, 270].map(angle => (
            <div
              key={angle}
              className="absolute w-3 h-3 rounded-full"
              style={{
                transform: `rotate(${angle}deg) translateY(-85px)`,
                background: isActive ? '#ff4444' : '#2a3a4a',
                boxShadow: isActive ? '0 0 10px #ff4444' : 'none',
                animation: isActive ? `ledBlink 0.25s ease-in-out infinite ${angle / 360}s` : 'none',
              }}
            />
          ))}
        </div>
      </div>

      {/* Status display */}
      <div
        className="mt-8 p-4 rounded-lg text-center min-w-[200px]"
        style={{
          background: isActive ? '#2a0a0a' : '#0a1a2a',
          border: `2px solid ${isActive ? '#ff4444' : '#2a3a4a'}`,
        }}
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <div
            className={`w-2 h-2 rounded-full ${isActive ? 'animate-ping' : ''}`}
            style={{ background: isActive ? '#ff4444' : '#3a4a5a' }}
          />
          <span
            className="font-mono text-sm font-bold"
            style={{ color: isActive ? '#ff4444' : '#5a6a7a' }}
          >
            {isActive ? 'DISTRESS ACTIVE' : 'STANDBY'}
          </span>
        </div>
        {isActive && (
          <>
            <div className="text-red-300 text-xs font-mono">
              SIGNAL PULSES: {pulseCount}
            </div>
            <div className="text-red-400 text-xs font-mono mt-1 animate-pulse">
              FREQ: 406 MHz | PWR: MAX
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes distressWave {
          0% { transform: translate(-50%, -50%) scale(0.5); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
        }
        @keyframes sosFlash {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes ledBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
};

// --- UNDERWATER TREASURE BADGE ---
export const UnderwaterTreasureBadge = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    if (!isOpen) {
      setSparkles([]);
      return;
    }
    const interval = setInterval(() => {
      const newSparkle = {
        id: Date.now(),
        x: 20 + Math.random() * 60,
        y: 20 + Math.random() * 60,
      };
      setSparkles(prev => [...prev.slice(-10), newSparkle]);
    }, 200);
    return () => clearInterval(interval);
  }, [isOpen]);

  return (
    <div className="h-full flex items-center justify-center p-8" style={{ background: 'linear-gradient(180deg, #021a2d 0%, #011627 100%)' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group"
      >
        {/* Treasure chest */}
        <div className="relative w-40 h-32">
          {/* Chest body */}
          <div
            className="absolute bottom-0 w-full h-20 rounded-b-lg"
            style={{
              background: 'linear-gradient(180deg, #8b6914 0%, #5a4510 50%, #3d2a14 100%)',
              border: '3px solid #3d2a14',
              boxShadow: 'inset 0 -10px 20px rgba(0,0,0,0.4)',
            }}
          >
            {/* Lock plate */}
            <div
              className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-8 rounded"
              style={{
                background: 'linear-gradient(180deg, #daa520, #8b6914)',
                border: '2px solid #5a4510',
              }}
            >
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-3 h-4 rounded-b bg-[#3d2a14]" />
            </div>

            {/* Metal bands */}
            {[20, 80].map(pos => (
              <div
                key={pos}
                className="absolute top-0 bottom-0 w-2"
                style={{
                  left: `${pos}%`,
                  transform: 'translateX(-50%)',
                  background: 'linear-gradient(90deg, #8b7b6b, #5a4a3a, #8b7b6b)',
                }}
              />
            ))}
          </div>

          {/* Chest lid */}
          <div
            className="absolute top-0 w-full h-16 rounded-t-lg origin-bottom transition-transform duration-500"
            style={{
              background: 'linear-gradient(0deg, #8b6914 0%, #cd9b1d 50%, #daa520 100%)',
              border: '3px solid #5a4510',
              borderBottom: 'none',
              transform: isOpen ? 'rotateX(-110deg)' : 'rotateX(0deg)',
              boxShadow: 'inset 0 5px 15px rgba(255,255,255,0.2)',
            }}
          >
            {/* Metal bands on lid */}
            {[20, 80].map(pos => (
              <div
                key={pos}
                className="absolute top-0 bottom-0 w-2"
                style={{
                  left: `${pos}%`,
                  transform: 'translateX(-50%)',
                  background: 'linear-gradient(90deg, #8b7b6b, #5a4a3a, #8b7b6b)',
                }}
              />
            ))}
          </div>

          {/* Treasure glow when open */}
          {isOpen && (
            <div
              className="absolute top-8 left-4 right-4 h-12"
              style={{
                background: 'radial-gradient(ellipse at center bottom, #ffd700 0%, #ffd70060 30%, transparent 70%)',
                animation: 'treasureGlow 1s ease-in-out infinite',
              }}
            />
          )}

          {/* Gold coins visible when open */}
          {isOpen && (
            <div className="absolute top-10 left-1/2 -translate-x-1/2 flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-4 h-4 rounded-full"
                  style={{
                    background: 'radial-gradient(circle at 30% 30%, #ffd700, #daa520, #b8860b)',
                    boxShadow: '0 0 10px #ffd70060',
                    animation: `coinBounce 0.5s ease-out ${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Sparkles */}
          {sparkles.map(sparkle => (
            <div
              key={sparkle.id}
              className="absolute w-2 h-2"
              style={{
                left: `${sparkle.x}%`,
                top: `${sparkle.y}%`,
                animation: 'sparkle 0.5s ease-out forwards',
              }}
            >
              <div className="w-full h-0.5 bg-yellow-300 absolute top-1/2 -translate-y-1/2" />
              <div className="w-0.5 h-full bg-yellow-300 absolute left-1/2 -translate-x-1/2" />
            </div>
          ))}
        </div>

        {/* Badge label */}
        <div
          className="mt-4 px-4 py-2 rounded-full text-center transition-all duration-300"
          style={{
            background: isOpen
              ? 'linear-gradient(90deg, #ffd700, #daa520)'
              : 'linear-gradient(90deg, #3a4a5a, #2a3a4a)',
            boxShadow: isOpen ? '0 0 20px #ffd70060' : 'none',
          }}
        >
          <span
            className="font-mono text-sm font-bold"
            style={{ color: isOpen ? '#3d2a14' : '#6a7a8a' }}
          >
            {isOpen ? 'TREASURE FOUND!' : 'TAP TO OPEN'}
          </span>
        </div>
      </button>

      <style>{`
        @keyframes treasureGlow {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
        @keyframes coinBounce {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes sparkle {
          0% { transform: scale(0) rotate(0deg); opacity: 1; }
          100% { transform: scale(1.5) rotate(45deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

// --- UNDERWATER ANCHOR ICON ---
export const UnderwaterAnchorIcon = () => {
  const [isDropping, setIsDropping] = useState(false);
  const [chainLength, setChainLength] = useState(0);
  const [bubbles, setBubbles] = useState<{ id: number; x: number }[]>([]);

  useEffect(() => {
    if (isDropping && chainLength < 8) {
      const timeout = setTimeout(() => {
        setChainLength(c => c + 1);
        // Add bubbles
        setBubbles(prev => [...prev.slice(-5), { id: Date.now(), x: 45 + Math.random() * 10 }]);
      }, 200);
      return () => clearTimeout(timeout);
    } else if (!isDropping && chainLength > 0) {
      const timeout = setTimeout(() => {
        setChainLength(c => c - 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [isDropping, chainLength]);

  useEffect(() => {
    // Clear old bubbles
    const interval = setInterval(() => {
      setBubbles(prev => prev.filter(b => Date.now() - b.id < 2000));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex flex-col items-center justify-center p-8" style={{ background: 'linear-gradient(180deg, #033d5e 0%, #021a2d 50%, #011627 100%)' }}>
      <div className="relative h-72 w-40">
        {/* Boat silhouette at top */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-6"
          style={{
            background: '#2a3a4a',
            borderRadius: '0 0 50% 50%',
            boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
          }}
        />

        {/* Chain */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="w-4 h-5 rounded-full border-3 -mt-1 transition-all duration-200"
              style={{
                borderColor: i < chainLength ? '#7a7a7a' : 'transparent',
                borderWidth: '3px',
                transform: `scale(${i < chainLength ? 1 : 0})`,
                boxShadow: i < chainLength ? 'inset 0 2px 4px rgba(0,0,0,0.3)' : 'none',
              }}
            />
          ))}
        </div>

        {/* Anchor */}
        <div
          className="absolute left-1/2 -translate-x-1/2 transition-all duration-500"
          style={{
            top: chainLength > 0 ? `${30 + chainLength * 18}px` : '40px',
          }}
        >
          <svg viewBox="0 0 80 100" className="w-20 h-24">
            <defs>
              <linearGradient id="anchorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={isDropping ? '#00e5ff' : '#6a7a8a'} />
                <stop offset="50%" stopColor={isDropping ? '#0088aa' : '#4a5a6a'} />
                <stop offset="100%" stopColor={isDropping ? '#005577' : '#3a4a5a'} />
              </linearGradient>
              <filter id="anchorGlow">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Ring at top */}
            <circle
              cx="40"
              cy="12"
              r="8"
              fill="none"
              stroke="url(#anchorGrad)"
              strokeWidth="5"
              filter={isDropping ? 'url(#anchorGlow)' : ''}
            />

            {/* Vertical shaft */}
            <line
              x1="40"
              y1="20"
              x2="40"
              y2="80"
              stroke="url(#anchorGrad)"
              strokeWidth="6"
              strokeLinecap="round"
              filter={isDropping ? 'url(#anchorGlow)' : ''}
            />

            {/* Horizontal bar */}
            <line
              x1="20"
              y1="35"
              x2="60"
              y2="35"
              stroke="url(#anchorGrad)"
              strokeWidth="5"
              strokeLinecap="round"
              filter={isDropping ? 'url(#anchorGlow)' : ''}
            />

            {/* Left fluke */}
            <path
              d="M40 80 Q25 75 15 90 Q20 80 40 75"
              fill="url(#anchorGrad)"
              filter={isDropping ? 'url(#anchorGlow)' : ''}
            />

            {/* Right fluke */}
            <path
              d="M40 80 Q55 75 65 90 Q60 80 40 75"
              fill="url(#anchorGrad)"
              filter={isDropping ? 'url(#anchorGlow)' : ''}
            />
          </svg>
        </div>

        {/* Bubbles */}
        {bubbles.map(bubble => (
          <div
            key={bubble.id}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${bubble.x}%`,
              top: `${30 + chainLength * 18}px`,
              background: 'radial-gradient(circle at 30% 30%, #ffffff40, #00e5ff20)',
              border: '1px solid #00e5ff30',
              animation: 'anchorBubble 2s ease-out forwards',
            }}
          />
        ))}

        {/* Seabed */}
        <div
          className="absolute bottom-0 left-0 right-0 h-8"
          style={{
            background: 'linear-gradient(0deg, #1a3020 0%, #0a2010 50%, transparent 100%)',
          }}
        />
      </div>

      {/* Control */}
      <button
        onClick={() => setIsDropping(!isDropping)}
        className="mt-4 px-6 py-2 rounded-lg font-mono text-sm transition-all duration-300"
        style={{
          background: isDropping ? '#00e5ff30' : '#2a3a4a',
          border: `2px solid ${isDropping ? '#00e5ff' : '#4a5a6a'}`,
          color: isDropping ? '#00e5ff' : '#8a9aaa',
          boxShadow: isDropping ? '0 0 20px #00e5ff40' : 'none',
        }}
      >
        {isDropping ? 'DROP ANCHOR' : 'RAISE ANCHOR'}
      </button>

      <style>{`
        @keyframes anchorBubble {
          0% { transform: translateY(0) scale(1); opacity: 0.8; }
          100% { transform: translateY(-60px) scale(0.5); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

// --- UNDERWATER WAVE HEADING ---
export const UnderwaterWaveHeading = () => {
  const [waveOffset, setWaveOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWaveOffset(o => (o + 2) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex flex-col items-center justify-center p-8" style={{ background: 'linear-gradient(180deg, #021a2d 0%, #011627 100%)' }}>
      <div className="relative">
        {/* Wave distortion layers */}
        <svg className="absolute -inset-4 w-[calc(100%+2rem)] h-[calc(100%+2rem)]" viewBox="0 0 400 100" preserveAspectRatio="none">
          <defs>
            <filter id="waveDistort">
              <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" />
            </filter>
            <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00e5ff" stopOpacity="0" />
              <stop offset="50%" stopColor="#00e5ff" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#00e5ff" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Animated wave paths */}
          {[0, 1, 2].map(i => (
            <path
              key={i}
              d={`M0 ${50 + i * 10} Q ${100 + waveOffset} ${30 + i * 5}, 200 ${50 + i * 10} T 400 ${50 + i * 10}`}
              fill="none"
              stroke="url(#waveGrad)"
              strokeWidth="2"
              opacity={0.5 - i * 0.15}
            />
          ))}
        </svg>

        {/* Main heading text */}
        <h1
          className="relative text-5xl font-bold tracking-wider"
          style={{
            color: '#00e5ff',
            textShadow: `
              0 0 20px #00e5ff60,
              0 0 40px #00e5ff40,
              0 0 60px #00e5ff20,
              2px 2px 4px rgba(0,0,0,0.5)
            `,
            animation: 'textWave 3s ease-in-out infinite',
          }}
        >
          {'DEEP SEA'.split('').map((char, i) => (
            <span
              key={i}
              className="inline-block"
              style={{
                animation: `letterWave 2s ease-in-out infinite`,
                animationDelay: `${i * 0.1}s`,
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>

        {/* Subtitle with bubble effect */}
        <div className="relative mt-4 text-center">
          <p
            className="text-lg font-mono tracking-widest"
            style={{
              color: '#b3e5fc',
              textShadow: '0 0 10px #00e5ff40',
            }}
          >
            EXPLORATION
          </p>

          {/* Decorative bubbles */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{
                background: 'radial-gradient(circle at 30% 30%, #ffffff60, #00e5ff40)',
                left: `${10 + i * 20}%`,
                bottom: -10,
                animation: `headingBubble ${2 + i * 0.3}s ease-in-out infinite`,
                animationDelay: `${i * 0.4}s`,
              }}
            />
          ))}
        </div>

        {/* Decorative lines */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <div
            className="w-20 h-0.5"
            style={{
              background: 'linear-gradient(90deg, transparent, #00e5ff)',
              boxShadow: '0 0 10px #00e5ff',
            }}
          />
          <div
            className="w-3 h-3 rounded-full"
            style={{
              background: '#00e5ff',
              boxShadow: '0 0 15px #00e5ff',
            }}
          />
          <div
            className="w-20 h-0.5"
            style={{
              background: 'linear-gradient(90deg, #00e5ff, transparent)',
              boxShadow: '0 0 10px #00e5ff',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes textWave {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes letterWave {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes headingBubble {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.6; }
          50% { transform: translateY(-15px) scale(1.3); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

// --- UNDERWATER CORAL BACKGROUND ---
export const UnderwaterCoralBackground = () => {
  const [fishPositions, setFishPositions] = useState<{ id: number; x: number; y: number; direction: number }[]>([]);

  useEffect(() => {
    // Initialize fish
    const initialFish = [...Array(5)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: 20 + Math.random() * 60,
      direction: Math.random() > 0.5 ? 1 : -1,
    }));
    setFishPositions(initialFish);

    // Animate fish
    const interval = setInterval(() => {
      setFishPositions(prev => prev.map(fish => ({
        ...fish,
        x: (fish.x + fish.direction * 0.5 + 100) % 100,
        y: fish.y + (Math.random() - 0.5) * 2,
      })));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const coralColors = ['#ff6b6b', '#ffd93d', '#ff8c42', '#e84393', '#a29bfe'];

  return (
    <div
      className="h-full relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #033d5e 0%, #021a2d 40%, #011627 70%, #010d15 100%)',
      }}
    >
      {/* Light rays from surface */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0"
            style={{
              left: `${10 + i * 20}%`,
              width: '100px',
              height: '100%',
              background: `linear-gradient(180deg, rgba(179,229,252,0.1) 0%, transparent 60%)`,
              transform: `skewX(${-20 + i * 10}deg)`,
              animation: `lightRay ${3 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Coral reef at bottom */}
      <svg className="absolute bottom-0 left-0 right-0 h-48" viewBox="0 0 400 100" preserveAspectRatio="none">
        <defs>
          {coralColors.map((color, i) => (
            <linearGradient key={i} id={`coralGrad${i}`} x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor={color} stopOpacity="0.8" />
              <stop offset="100%" stopColor={color} stopOpacity="0.4" />
            </linearGradient>
          ))}
          <filter id="coralGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Sandy bottom */}
        <rect x="0" y="85" width="400" height="15" fill="#2a3520" />

        {/* Coral formations */}
        {[
          { x: 20, type: 'branch', color: 0 },
          { x: 60, type: 'brain', color: 1 },
          { x: 100, type: 'fan', color: 2 },
          { x: 150, type: 'branch', color: 3 },
          { x: 200, type: 'tube', color: 4 },
          { x: 250, type: 'branch', color: 0 },
          { x: 300, type: 'fan', color: 1 },
          { x: 340, type: 'brain', color: 2 },
          { x: 380, type: 'branch', color: 3 },
        ].map((coral, i) => (
          <g key={i} filter="url(#coralGlow)">
            {coral.type === 'branch' && (
              <g style={{ animation: `coralSway ${3 + i * 0.2}s ease-in-out infinite`, transformOrigin: `${coral.x}px 85px` }}>
                <path
                  d={`M${coral.x} 85 Q${coral.x + 5} 60 ${coral.x - 10} 40 M${coral.x} 85 Q${coral.x - 5} 55 ${coral.x + 15} 35 M${coral.x} 85 L${coral.x} 50`}
                  fill="none"
                  stroke={`url(#coralGrad${coral.color})`}
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <circle cx={coral.x - 10} cy={40} r={4} fill={coralColors[coral.color]} />
                <circle cx={coral.x + 15} cy={35} r={4} fill={coralColors[coral.color]} />
                <circle cx={coral.x} cy={50} r={3} fill={coralColors[coral.color]} />
              </g>
            )}
            {coral.type === 'brain' && (
              <ellipse
                cx={coral.x}
                cy={75}
                rx={20}
                ry={15}
                fill={`url(#coralGrad${coral.color})`}
                style={{ animation: `coralPulse ${2 + i * 0.3}s ease-in-out infinite` }}
              />
            )}
            {coral.type === 'fan' && (
              <g style={{ animation: `coralSway ${4 + i * 0.2}s ease-in-out infinite`, transformOrigin: `${coral.x}px 85px` }}>
                <path
                  d={`M${coral.x} 85 Q${coral.x} 50 ${coral.x - 25} 30 Q${coral.x} 45 ${coral.x + 25} 30 Q${coral.x} 50 ${coral.x} 85`}
                  fill={`url(#coralGrad${coral.color})`}
                  opacity="0.7"
                />
              </g>
            )}
            {coral.type === 'tube' && (
              <g>
                {[-10, 0, 10].map((offset, j) => (
                  <rect
                    key={j}
                    x={coral.x + offset - 3}
                    y={55 - j * 5}
                    width={6}
                    height={30 + j * 5}
                    rx={3}
                    fill={`url(#coralGrad${coral.color})`}
                    style={{ animation: `coralSway ${3 + j * 0.5}s ease-in-out infinite`, transformOrigin: `${coral.x + offset}px 85px` }}
                  />
                ))}
              </g>
            )}
          </g>
        ))}

        {/* Sea anemones */}
        {[40, 130, 270, 360].map((x, i) => (
          <g key={`anemone-${i}`}>
            <ellipse cx={x} cy={82} rx={8} ry={4} fill="#1a3520" />
            {[...Array(7)].map((_, j) => (
              <line
                key={j}
                x1={x}
                y1={82}
                x2={x + Math.cos((j * Math.PI) / 3.5) * 12}
                y2={70 + Math.sin((j * Math.PI) / 7) * 5}
                stroke="#ff69b4"
                strokeWidth="2"
                strokeLinecap="round"
                style={{ animation: `tentacleWave ${1.5 + j * 0.1}s ease-in-out infinite`, transformOrigin: `${x}px 82px` }}
              />
            ))}
          </g>
        ))}
      </svg>

      {/* Swimming fish */}
      {fishPositions.map(fish => (
        <div
          key={fish.id}
          className="absolute transition-all duration-100"
          style={{
            left: `${fish.x}%`,
            top: `${fish.y}%`,
            transform: `scaleX(${fish.direction})`,
          }}
        >
          <svg viewBox="0 0 30 15" className="w-8 h-4">
            <ellipse cx="12" cy="7.5" rx="10" ry="5" fill="#00e5ff" opacity="0.8" />
            <polygon points="22,7.5 28,3 28,12" fill="#00e5ff" opacity="0.8" />
            <circle cx="6" cy="6" r="1.5" fill="#011627" />
          </svg>
        </div>
      ))}

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <div
          key={`particle-${i}`}
          className="absolute w-1 h-1 rounded-full bg-white/20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `floatParticle ${5 + Math.random() * 5}s ease-in-out infinite`,
            animationDelay: `${i * 0.3}s`,
          }}
        />
      ))}

      {/* Content placeholder */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="p-8 rounded-xl backdrop-blur-sm text-center"
          style={{
            background: 'rgba(2, 26, 45, 0.7)',
            border: '2px solid #00e5ff40',
            boxShadow: '0 0 30px rgba(0, 229, 255, 0.1)',
          }}
        >
          <h2 className="text-2xl font-bold text-cyan-300 mb-2">Coral Reef Background</h2>
          <p className="text-cyan-500 text-sm">Interactive underwater scene with animated coral and fish</p>
        </div>
      </div>

      <style>{`
        @keyframes lightRay {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        @keyframes coralSway {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        @keyframes coralPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes tentacleWave {
          0%, 100% { transform: rotate(-10deg); }
          50% { transform: rotate(10deg); }
        }
        @keyframes floatParticle {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-5px); }
          75% { transform: translateY(-30px) translateX(5px); }
        }
      `}</style>
    </div>
  );
};

// Export all components
export const underwaterComponents: Record<string, React.FC> = {
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
  // New components
  'underwater-pressure-gauge': UnderwaterPressureGauge,
  'underwater-sonar-ping': UnderwaterSonarPing,
  'underwater-kelp-divider': UnderwaterKelpDivider,
  'underwater-porthole-avatar': UnderwaterPortholeAvatar,
  'underwater-depth-slider': UnderwaterDepthSlider,
  'underwater-submarine-nav': UnderwaterSubmarineNav,
  'underwater-oxygen-progress': UnderwaterOxygenProgress,
  'underwater-distress-alert': UnderwaterDistressAlert,
  'underwater-treasure-badge': UnderwaterTreasureBadge,
  'underwater-anchor-icon': UnderwaterAnchorIcon,
  'underwater-wave-heading': UnderwaterWaveHeading,
  'underwater-coral-background': UnderwaterCoralBackground,
};
