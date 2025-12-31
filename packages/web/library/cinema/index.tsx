import React, { useState, useEffect, useRef } from 'react';
import { Aperture, Mic } from '../shared/icons';

// --- STAGE PLAY NAV ---
export const StagePlayNav = () => {
  const [activeScene, setActiveScene] = useState(0);
  const scenes = [
    { title: "ACT I: Setup", content: "The stage is set. Characters introduced." },
    { title: "ACT II: Conflict", content: "Rising action! Drama unfolds." },
    { title: "ACT III: Resolution", content: "The finale. All is resolved." },
  ];

  return (
    <div className="h-full bg-zinc-900 flex flex-col items-center p-4 overflow-hidden">
      <div className="flex gap-2 mb-4 p-2 bg-zinc-800 rounded-lg">
        {scenes.map((scene, i) => (
          <button
            key={i}
            onClick={() => setActiveScene(i)}
            className={`px-3 py-1 font-serif text-xs border-b-2 transition-all ${
              activeScene === i ? 'text-yellow-400 border-yellow-400 font-bold' : 'text-zinc-500 border-transparent'
            }`}
          >
            {scene.title}
          </button>
        ))}
      </div>
      <div className="relative w-full h-32 overflow-hidden">
        {scenes.map((scene, i) => (
          <div
            key={i}
            className="absolute inset-0 bg-zinc-800 text-white p-4 border-2 border-zinc-700 transition-all duration-500"
            style={{
              transform: i === activeScene
                ? 'translateX(0)'
                : i < activeScene
                  ? 'translateX(-100%)'
                  : 'translateX(100%)'
            }}
          >
            <h1 className="text-lg font-serif font-bold text-yellow-300">{scene.title}</h1>
            <p className="font-mono text-xs mt-2">{scene.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- SPOTLIGHT FOCUS ---
export const SpotlightFocus = () => {
  const [lightPos, setLightPos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setLightPos({ x, y });
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="h-full bg-zinc-900 relative p-4 overflow-hidden"
    >
      <div className="text-zinc-700 font-serif text-sm leading-loose">
        <p>Move your cursor to illuminate the stage. Only what the spotlight reveals gains attention.</p>
        <button className="mt-4 px-4 py-2 bg-zinc-800 border border-zinc-700 text-zinc-600 rounded text-xs">
          Hidden Button
        </button>
      </div>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${lightPos.x}px ${lightPos.y}px, rgba(255, 255, 255, 1) 60px, rgba(255, 255, 255, 0.0) 150px)`,
          mixBlendMode: 'lighten',
          opacity: 0.95
        }}
      >
        <div className="text-white font-serif text-sm leading-loose p-4">
          <p>Move your cursor to illuminate the stage. Only what the spotlight reveals gains attention.</p>
          <button className="mt-4 px-4 py-2 bg-yellow-600 border border-yellow-300 text-white font-bold rounded text-xs">
            Revealed Button
          </button>
        </div>
      </div>
    </div>
  );
};

// --- CURTAIN PULL LOADER ---
export const CurtainPullLoader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-full bg-zinc-900 relative flex items-center justify-center overflow-hidden">
      <div className={`text-white text-center transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Aperture size={32} className="mx-auto text-yellow-500 mb-2" />
        <h2 className="text-xl font-bold">REVEALED!</h2>
      </div>
      {/* Curtains */}
      <div className={`absolute inset-0 flex transition-transform duration-1000 ${isLoading ? '' : '-translate-x-full'}`}>
        <div className="w-1/2 h-full bg-red-900 border-r-4 border-black" />
        <div className={`w-1/2 h-full bg-red-900 border-l-4 border-black transition-transform duration-1000 ${isLoading ? '' : 'translate-x-full'}`} />
      </div>
      {isLoading && (
        <div className="absolute w-8 h-8 border-4 border-t-yellow-400 border-gray-600 rounded-full animate-spin" />
      )}
      <button
        onClick={() => setIsLoading(true)}
        className="absolute bottom-2 right-2 px-2 py-1 bg-red-500 text-white text-xs rounded"
      >
        RESET
      </button>
    </div>
  );
};

// --- FILMSTRIP GALLERY ---
export const FilmstripGallery = () => {
  const [activeFrame, setActiveFrame] = useState(0);
  const frames = [1, 2, 3, 4, 5];

  return (
    <div className="h-full bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="w-full h-24 bg-black border-4 border-gray-700 shadow-xl mb-4 flex items-center justify-center">
        <div className="text-white font-mono text-2xl">FRAME {activeFrame + 1}</div>
      </div>
      <div className="flex overflow-x-auto p-2 border-y-4 border-gray-700 bg-gray-800 gap-1">
        {frames.map((_, i) => (
          <div
            key={i}
            onClick={() => setActiveFrame(i)}
            className={`flex-shrink-0 w-16 h-12 bg-black border-2 cursor-pointer transition-all ${
              activeFrame === i ? 'border-yellow-400 scale-110' : 'border-gray-600'
            }`}
          >
            <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-400 text-xs">
              {i + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- BOOM MIC TOOLTIP ---
export const BoomMicTooltip = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="h-full bg-zinc-100 flex items-center justify-center p-4">
      <div className="relative p-4 bg-white border border-gray-300 rounded shadow-lg max-w-xs">
        <p className="text-gray-700 text-sm">
          The main character delivers{' '}
          <span
            className="font-bold underline cursor-help"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            exposition
          </span>
          {' '}here.
        </p>
        {showTooltip && (
          <div className="absolute -top-16 left-1/2 -translate-x-1/2">
            <div className="w-0.5 h-8 bg-gray-500 mx-auto origin-bottom -rotate-12">
              <Mic size={12} className="absolute -bottom-3 -left-1.5 text-gray-700" />
            </div>
            <div className="mt-2 p-2 bg-zinc-800 text-white rounded text-xs">
              <span className="text-yellow-400">NOTE:</span> Key plot info
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- CLAPPERBOARD TRANSITION ---
export const ClapperboardTransition = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="h-full bg-zinc-800 flex items-center justify-center p-4">
      <div className="relative w-48 h-32">
        {/* Board base */}
        <div className="absolute bottom-0 w-full h-24 bg-white rounded shadow-lg p-2">
          <div className="border-b border-gray-300 text-xs font-mono mb-1">SCENE: 42</div>
          <div className="border-b border-gray-300 text-xs font-mono mb-1">TAKE: 7</div>
          <div className="text-xs font-mono">DIR: CLAUDE</div>
        </div>
        {/* Clapper top */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="absolute top-4 w-full h-12 cursor-pointer origin-bottom transition-transform duration-300"
          style={{ transform: isOpen ? 'rotateX(-30deg)' : 'rotateX(0deg)' }}
        >
          <div className="w-full h-full bg-gradient-to-b from-zinc-900 to-zinc-700 rounded-t flex">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`flex-1 ${i % 2 === 0 ? 'bg-zinc-900' : 'bg-white'}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MOVIE CREDITS SCROLL ---
export const MovieCredits = () => {
  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPos(p => (p + 1) % 200);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const credits = [
    'DIRECTED BY', 'Claude AI',
    'PRODUCED BY', 'Anthropic',
    'STARRING', 'UI Components',
    'MUSIC BY', '8-bit Orchestra'
  ];

  return (
    <div className="h-full bg-black flex items-center justify-center overflow-hidden">
      <div
        className="text-center"
        style={{ transform: `translateY(${100 - scrollPos}px)` }}
      >
        {credits.map((line, i) => (
          <p
            key={i}
            className={`${i % 2 === 0 ? 'text-gray-500 text-xs mt-4' : 'text-white text-lg font-bold'}`}
          >
            {line}
          </p>
        ))}
      </div>
    </div>
  );
};

// ============ CINEMATIC DEMOS - PARALLAX SCROLL ============

// --- PARALLAX SCROLL SET DESIGN ---
export const ParallaxScroll = () => {
  const [scroll, setScroll] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScroll(e.currentTarget.scrollTop);
  };

  return (
    <div
        ref={containerRef}
        onScroll={handleScroll}
        className="h-full bg-zinc-900 relative overflow-y-auto overflow-x-hidden"
    >
      <div className="min-h-[300%] relative">
        {/* Background (Slowest movement) */}
        <div
            className="fixed inset-0 bg-cover opacity-20 pointer-events-none"
            style={{
                backgroundImage: 'linear-gradient(45deg, #1a1a2e 25%, transparent 25%), linear-gradient(-45deg, #1a1a2e 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #16213e 75%), linear-gradient(-45deg, transparent 75%, #16213e 75%)',
                backgroundSize: '40px 40px',
                transform: `translateY(${scroll * 0.1}px)`
            }}
        />

        {/* Middle Layer (Medium movement) */}
        <div
            className="fixed inset-0 flex items-center justify-center pointer-events-none"
            style={{ transform: `translateY(${scroll * 0.3}px)` }}
        >
            <div className="text-9xl text-white/5 opacity-50 font-black">PROPS</div>
        </div>

        {/* Foreground Content (Fastest/Normal movement) */}
        <div className="relative pt-40 pb-40 w-full max-w-xs mx-auto z-10">
            {[...Array(5)].map((_, i) => (
            <div key={i} className="my-20 p-6 bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white rounded-lg shadow-2xl">
                <h2 className="text-2xl font-bold mb-2">SCENE {i + 1}</h2>
                <p className="font-serif text-sm">
                As you scroll, the background shifts at different speeds, creating depth and making content feel separated in 3D space.
                </p>
            </div>
            ))}
        </div>
      </div>
    </div>
  );
};

// ============ NEW CINEMA COMPONENTS ============

// --- FILM COUNTDOWN ---
export const FilmCountdown = () => {
  const [count, setCount] = useState(5);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return;
    if (count === 0) {
      const resetTimer = setTimeout(() => {
        setCount(5);
      }, 1500);
      return () => clearTimeout(resetTimer);
    }
    const timer = setTimeout(() => setCount(c => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [count, isRunning]);

  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const progress = ((5 - count) / 5) * circumference;

  return (
    <div className="h-full bg-zinc-900 flex flex-col items-center justify-center p-4">
      <div className="relative w-32 h-32">
        {/* Film grain overlay */}
        <div
          className="absolute inset-0 rounded-full opacity-20 pointer-events-none"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
          }}
        />

        {/* Circle countdown */}
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#333"
            strokeWidth="4"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#f59e0b"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            className="transition-all duration-1000 ease-linear"
          />
        </svg>

        {/* Center number */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className={`text-5xl font-bold font-mono transition-all duration-300 ${
              count === 0 ? 'text-yellow-400 scale-125' : 'text-white'
            }`}
          >
            {count === 0 ? 'GO!' : count}
          </span>
        </div>

        {/* Cross hairs */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-full h-0.5 bg-white/20" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="h-full w-0.5 bg-white/20" />
        </div>
      </div>

      <button
        onClick={() => { setCount(5); setIsRunning(true); }}
        className="mt-4 px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-white text-xs font-bold rounded transition-colors"
      >
        RESTART
      </button>
    </div>
  );
};

// --- CURTAIN REVEAL ---
export const CurtainReveal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-full bg-zinc-900 relative flex items-center justify-center overflow-hidden">
      {/* Stage content behind curtains */}
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-zinc-800 to-zinc-900">
        <div className="text-center">
          <div className="text-6xl mb-2">🎭</div>
          <h2 className="text-2xl font-serif font-bold text-yellow-400">THE SHOW</h2>
          <p className="text-zinc-400 text-sm mt-2">Welcome to the theater!</p>
        </div>
      </div>

      {/* Gold curtain rod */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-yellow-600 to-yellow-800 z-20 shadow-lg" />

      {/* Left curtain */}
      <div
        className="absolute top-4 left-0 w-1/2 h-full z-10 transition-transform duration-1000 ease-in-out origin-left"
        style={{
          transform: isOpen ? 'scaleX(0.15)' : 'scaleX(1)',
          background: 'linear-gradient(90deg, #7f1d1d 0%, #991b1b 20%, #b91c1c 50%, #991b1b 80%, #7f1d1d 100%)',
        }}
      >
        {/* Curtain folds */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-2"
            style={{
              left: `${i * 18}%`,
              background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.3), transparent)',
            }}
          />
        ))}
        {/* Curtain drape effect */}
        <div className="absolute top-0 left-0 right-0 h-8" style={{
          background: 'radial-gradient(ellipse at top, rgba(0,0,0,0.4), transparent)',
        }} />
      </div>

      {/* Right curtain */}
      <div
        className="absolute top-4 right-0 w-1/2 h-full z-10 transition-transform duration-1000 ease-in-out origin-right"
        style={{
          transform: isOpen ? 'scaleX(0.15)' : 'scaleX(1)',
          background: 'linear-gradient(90deg, #7f1d1d 0%, #991b1b 20%, #b91c1c 50%, #991b1b 80%, #7f1d1d 100%)',
        }}
      >
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-2"
            style={{
              left: `${i * 18}%`,
              background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.3), transparent)',
            }}
          />
        ))}
        <div className="absolute top-0 left-0 right-0 h-8" style={{
          background: 'radial-gradient(ellipse at top, rgba(0,0,0,0.4), transparent)',
        }} />
      </div>

      {/* Control button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute bottom-4 z-30 px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-white text-xs font-bold rounded transition-colors"
      >
        {isOpen ? 'CLOSE CURTAINS' : 'OPEN CURTAINS'}
      </button>
    </div>
  );
};

// --- SPOTLIGHT FOLLOW ---
export const SpotlightFollow = () => {
  const [spotPos, setSpotPos] = useState({ x: 50, y: 50 });
  const [isActive, setIsActive] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isActive || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpotPos({ x, y });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="h-full bg-zinc-950 relative cursor-none overflow-hidden"
    >
      {/* Stage elements */}
      <div className="absolute inset-0 flex items-center justify-center gap-8">
        <div className="w-16 h-24 bg-zinc-800 rounded-t-full flex items-end justify-center pb-2">
          <span className="text-2xl">🎤</span>
        </div>
        <div className="w-20 h-16 bg-zinc-800 rounded flex items-center justify-center">
          <span className="text-3xl">🎹</span>
        </div>
        <div className="w-12 h-28 bg-zinc-800 rounded flex items-end justify-center pb-2">
          <span className="text-2xl">🎸</span>
        </div>
      </div>

      {/* Spotlight effect */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-100"
        style={{
          background: `radial-gradient(circle at ${spotPos.x}% ${spotPos.y}%,
            transparent 0%,
            transparent 60px,
            rgba(0,0,0,0.85) 120px,
            rgba(0,0,0,0.95) 200px)`,
        }}
      />

      {/* Spotlight beam from top */}
      <div
        className="absolute top-0 w-32 h-40 pointer-events-none opacity-30 transition-all duration-100"
        style={{
          left: `calc(${spotPos.x}% - 64px)`,
          background: 'linear-gradient(180deg, rgba(255,255,200,0.5) 0%, transparent 100%)',
          clipPath: 'polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)',
        }}
      />

      {/* Toggle button */}
      <button
        onClick={() => setIsActive(!isActive)}
        className="absolute bottom-4 right-4 px-3 py-1 bg-zinc-700 hover:bg-zinc-600 text-white text-xs rounded z-10"
      >
        {isActive ? 'FREEZE' : 'FOLLOW'}
      </button>
    </div>
  );
};

// --- MOVIE CLAPBOARD ---
export const MovieClapboard = () => {
  const [isClapping, setIsClapping] = useState(false);
  const [scene, setScene] = useState(1);
  const [take, setTake] = useState(1);

  const handleClap = () => {
    setIsClapping(true);
    setTimeout(() => {
      setIsClapping(false);
      setTake(t => t + 1);
    }, 300);
  };

  return (
    <div className="h-full bg-zinc-800 flex items-center justify-center p-4">
      <div
        className="relative w-56 cursor-pointer select-none"
        onClick={handleClap}
      >
        {/* Clapboard top (stripes) */}
        <div
          className="relative h-10 rounded-t-lg overflow-hidden origin-bottom transition-transform duration-150"
          style={{
            transform: isClapping ? 'rotateX(-45deg)' : 'rotateX(0deg)',
            transformStyle: 'preserve-3d',
            perspective: '500px',
          }}
        >
          <div className="absolute inset-0 flex">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className={`flex-1 ${i % 2 === 0 ? 'bg-zinc-900' : 'bg-white'}`}
                style={{ transform: 'skewX(-15deg)' }}
              />
            ))}
          </div>
        </div>

        {/* Clapboard body */}
        <div className="bg-zinc-900 p-3 rounded-b-lg border-t-4 border-zinc-700">
          <div className="grid grid-cols-2 gap-2 text-white font-mono text-xs">
            <div className="border-b border-zinc-700 pb-1">
              <span className="text-zinc-500">PRODUCTION</span>
              <div className="font-bold">UI MUSEUM</div>
            </div>
            <div className="border-b border-zinc-700 pb-1">
              <span className="text-zinc-500">DIRECTOR</span>
              <div className="font-bold">CLAUDE</div>
            </div>
            <div>
              <span className="text-zinc-500">SCENE</span>
              <div className="font-bold text-lg text-yellow-400">{scene}</div>
            </div>
            <div>
              <span className="text-zinc-500">TAKE</span>
              <div className="font-bold text-lg text-yellow-400">{take}</div>
            </div>
          </div>
        </div>

        {/* Click instruction */}
        <p className="text-center text-zinc-500 text-xs mt-2">Click to clap!</p>
      </div>

      {/* Scene controls */}
      <div className="absolute bottom-4 flex gap-2">
        <button
          onClick={(e) => { e.stopPropagation(); setScene(s => s + 1); setTake(1); }}
          className="px-3 py-1 bg-zinc-700 hover:bg-zinc-600 text-white text-xs rounded"
        >
          NEXT SCENE
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); setScene(1); setTake(1); }}
          className="px-3 py-1 bg-red-700 hover:bg-red-600 text-white text-xs rounded"
        >
          RESET
        </button>
      </div>
    </div>
  );
};

// --- FILM REEL ---
export const FilmReel = () => {
  const [isSpinning, setIsSpinning] = useState(true);
  const [rotation, setRotation] = useState(0);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!isSpinning) {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      return;
    }

    const animate = () => {
      setRotation(r => (r + 2) % 360);
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isSpinning]);

  const frames = [1, 2, 3, 4, 5, 6];

  return (
    <div className="h-full bg-zinc-900 flex items-center justify-center p-4">
      <div className="relative">
        {/* Main reel */}
        <div
          className="w-36 h-36 rounded-full bg-zinc-800 border-4 border-zinc-700 relative"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {/* Center hub */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-zinc-600 border-2 border-zinc-500" />

          {/* Film holes around the reel */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-6 h-6 bg-zinc-950 rounded"
              style={{
                top: '50%',
                left: '50%',
                transform: `rotate(${i * 45}deg) translateY(-48px) translateX(-50%)`,
              }}
            />
          ))}

          {/* Spokes */}
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 w-0.5 h-full bg-zinc-600 origin-center"
              style={{ transform: `translateX(-50%) translateY(-50%) rotate(${i * 45}deg)` }}
            />
          ))}
        </div>

        {/* Film strip coming out */}
        <div className="absolute -right-4 top-1/2 -translate-y-1/2 flex">
          {frames.map((frame, i) => (
            <div
              key={i}
              className="w-8 h-10 bg-zinc-950 border border-zinc-700 flex flex-col justify-between p-0.5"
            >
              <div className="flex justify-between">
                <div className="w-1 h-1 rounded-full bg-white" />
                <div className="w-1 h-1 rounded-full bg-white" />
              </div>
              <div className="flex-1 mx-0.5 my-0.5 bg-amber-900/50 flex items-center justify-center">
                <span className="text-[6px] text-amber-200">{frame}</span>
              </div>
              <div className="flex justify-between">
                <div className="w-1 h-1 rounded-full bg-white" />
                <div className="w-1 h-1 rounded-full bg-white" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => setIsSpinning(!isSpinning)}
        className="absolute bottom-4 px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-white text-xs font-bold rounded"
      >
        {isSpinning ? 'PAUSE' : 'PLAY'}
      </button>
    </div>
  );
};

// --- THEATER SEATS ---
export const TheaterSeats = () => {
  const [selectedSeats, setSelectedSeats] = useState<Set<string>>(new Set());
  const rows = ['A', 'B', 'C', 'D'];
  const seatsPerRow = 8;

  const toggleSeat = (seatId: string) => {
    setSelectedSeats(prev => {
      const next = new Set(prev);
      if (next.has(seatId)) {
        next.delete(seatId);
      } else {
        next.add(seatId);
      }
      return next;
    });
  };

  const getSeatStatus = (seatId: string) => {
    if (selectedSeats.has(seatId)) return 'selected';
    if (['A3', 'A4', 'B5', 'C2', 'D6', 'D7'].includes(seatId)) return 'occupied';
    return 'available';
  };

  return (
    <div className="h-full bg-zinc-900 flex flex-col items-center justify-center p-4">
      {/* Screen */}
      <div className="w-48 h-4 bg-gradient-to-b from-white to-zinc-400 rounded-sm mb-6 shadow-lg shadow-white/20">
        <div className="text-center text-[8px] text-zinc-600 font-bold">SCREEN</div>
      </div>

      {/* Seats */}
      <div className="space-y-2">
        {rows.map((row, rowIndex) => (
          <div key={row} className="flex items-center gap-1">
            <span className="text-zinc-500 text-xs w-4">{row}</span>
            <div
              className="flex gap-1"
              style={{
                paddingLeft: `${rowIndex * 4}px`,
                paddingRight: `${rowIndex * 4}px`,
              }}
            >
              {[...Array(seatsPerRow)].map((_, seatIndex) => {
                const seatId = `${row}${seatIndex + 1}`;
                const status = getSeatStatus(seatId);
                return (
                  <button
                    key={seatIndex}
                    onClick={() => status !== 'occupied' && toggleSeat(seatId)}
                    disabled={status === 'occupied'}
                    className={`w-5 h-4 rounded-t-lg transition-all duration-200 ${
                      status === 'selected'
                        ? 'bg-yellow-500 shadow-lg shadow-yellow-500/50 scale-110'
                        : status === 'occupied'
                          ? 'bg-zinc-700 cursor-not-allowed'
                          : 'bg-red-800 hover:bg-red-700 hover:scale-105'
                    }`}
                    title={seatId}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-4 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-2 rounded-t bg-red-800" />
          <span className="text-zinc-400">Available</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-2 rounded-t bg-yellow-500" />
          <span className="text-zinc-400">Selected</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-2 rounded-t bg-zinc-700" />
          <span className="text-zinc-400">Occupied</span>
        </div>
      </div>

      {selectedSeats.size > 0 && (
        <div className="mt-2 text-yellow-400 text-xs">
          Selected: {Array.from(selectedSeats).sort().join(', ')}
        </div>
      )}
    </div>
  );
};

// --- MARQUEE SIGN ---
export const MarqueeSign = () => {
  const [lightPhase, setLightPhase] = useState(0);
  const [text] = useState('NOW SHOWING');

  useEffect(() => {
    const interval = setInterval(() => {
      setLightPhase(p => (p + 1) % 3);
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full bg-zinc-900 flex items-center justify-center p-4">
      <div className="relative">
        {/* Main marquee box */}
        <div className="relative bg-zinc-950 border-4 border-yellow-600 px-8 py-4">
          {/* Top lights */}
          <div className="absolute -top-3 left-0 right-0 flex justify-around">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  (i + lightPhase) % 3 === 0
                    ? 'bg-yellow-400 shadow-lg shadow-yellow-400/80'
                    : 'bg-yellow-900'
                }`}
              />
            ))}
          </div>

          {/* Bottom lights */}
          <div className="absolute -bottom-3 left-0 right-0 flex justify-around">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  (i + lightPhase + 1) % 3 === 0
                    ? 'bg-yellow-400 shadow-lg shadow-yellow-400/80'
                    : 'bg-yellow-900'
                }`}
              />
            ))}
          </div>

          {/* Left lights */}
          <div className="absolute top-0 bottom-0 -left-3 flex flex-col justify-around py-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  (i + lightPhase + 2) % 3 === 0
                    ? 'bg-yellow-400 shadow-lg shadow-yellow-400/80'
                    : 'bg-yellow-900'
                }`}
              />
            ))}
          </div>

          {/* Right lights */}
          <div className="absolute top-0 bottom-0 -right-3 flex flex-col justify-around py-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  (i + lightPhase) % 3 === 0
                    ? 'bg-yellow-400 shadow-lg shadow-yellow-400/80'
                    : 'bg-yellow-900'
                }`}
              />
            ))}
          </div>

          {/* Text */}
          <h1 className="text-2xl font-bold text-yellow-400 tracking-widest text-center font-serif">
            {text}
          </h1>
          <p className="text-red-500 text-center text-sm mt-1 font-bold">UI MUSEUM</p>
        </div>

        {/* Arrow decorations */}
        <div className="absolute -left-8 top-1/2 -translate-y-1/2 text-yellow-500 text-2xl pulse-subtle">{'>'}</div>
        <div className="absolute -right-8 top-1/2 -translate-y-1/2 text-yellow-500 text-2xl pulse-subtle">{'<'}</div>
      </div>
    </div>
  );
};

// --- POPCORN BUCKET ---
export const PopcornBucket = () => {
  const [popcorns, setPopcorns] = useState<Array<{ id: number; x: number; delay: number }>>([]);
  const [isPopping, setIsPopping] = useState(true);
  const nextId = useRef(0);

  useEffect(() => {
    if (!isPopping) return;

    const interval = setInterval(() => {
      const newPopcorn = {
        id: nextId.current++,
        x: 30 + Math.random() * 40,
        delay: Math.random() * 0.3,
      };
      setPopcorns(prev => [...prev.slice(-15), newPopcorn]);
    }, 300);

    return () => clearInterval(interval);
  }, [isPopping]);

  return (
    <div className="h-full bg-zinc-900 flex items-center justify-center p-4 overflow-hidden">
      <div className="relative">
        {/* Popping popcorns */}
        {popcorns.map(corn => (
          <div
            key={corn.id}
            className="absolute bottom-20 w-4 h-4"
            style={{
              left: `${corn.x}%`,
              animation: `pop-up 1s ease-out ${corn.delay}s forwards`,
            }}
          >
            <div className="w-full h-full bg-yellow-100 rounded-full shadow-sm transform rotate-45"
              style={{
                borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
              }}
            />
          </div>
        ))}

        {/* Bucket */}
        <div className="relative w-32 h-28">
          {/* Bucket body */}
          <div
            className="absolute bottom-0 w-full h-24 bg-gradient-to-b from-red-600 to-red-800 rounded-b-lg"
            style={{
              clipPath: 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)',
            }}
          >
            {/* Stripes */}
            <div className="absolute inset-0 flex overflow-hidden rounded-b-lg"
              style={{ clipPath: 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)' }}
            >
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 ${i % 2 === 0 ? 'bg-red-600' : 'bg-white/90'}`}
                />
              ))}
            </div>

            {/* Label */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-yellow-400 font-bold text-lg drop-shadow-lg"
                style={{ textShadow: '2px 2px 0 #7f1d1d' }}>
                POP
              </span>
            </div>
          </div>

          {/* Popcorn pile in bucket */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 flex flex-wrap justify-center w-20 gap-0.5">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 bg-yellow-100 rounded-full"
                style={{
                  borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                  transform: `rotate(${i * 30}deg)`,
                }}
              />
            ))}
          </div>
        </div>

        {/* CSS Animation */}
        <style>{`
          @keyframes pop-up {
            0% { transform: translateY(0) scale(0.5); opacity: 1; }
            50% { transform: translateY(-60px) scale(1); opacity: 1; }
            100% { transform: translateY(-40px) translateX(${Math.random() > 0.5 ? '' : '-'}20px) scale(0.8); opacity: 0; }
          }
        `}</style>
      </div>

      <button
        onClick={() => setIsPopping(!isPopping)}
        className="absolute bottom-4 px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded"
      >
        {isPopping ? 'STOP' : 'POP!'}
      </button>
    </div>
  );
};

// --- PROJECTOR BEAM ---
export const ProjectorBeam = () => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; speed: number }>>([]);
  const [isOn, setIsOn] = useState(true);
  const animationRef = useRef<number | undefined>(undefined);
  const nextId = useRef(0);

  useEffect(() => {
    if (!isOn) {
      setParticles([]);
      return;
    }

    const animate = () => {
      setParticles(prev => {
        // Add new particles
        const newParticles = [...prev];
        if (Math.random() > 0.7) {
          newParticles.push({
            id: nextId.current++,
            x: 10 + Math.random() * 80,
            y: Math.random() * 100,
            size: 1 + Math.random() * 2,
            speed: 0.2 + Math.random() * 0.5,
          });
        }

        // Update positions and remove old particles
        return newParticles
          .map(p => ({ ...p, y: p.y + p.speed, x: p.x + (Math.random() - 0.5) * 0.5 }))
          .filter(p => p.y < 110)
          .slice(-50);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isOn]);

  return (
    <div className="h-full bg-zinc-950 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Projector */}
      <div className="absolute top-4 left-4 w-16 h-10 bg-zinc-800 rounded flex items-center justify-end pr-2">
        <div className={`w-4 h-4 rounded-full ${isOn ? 'bg-yellow-400 shadow-lg shadow-yellow-400/50' : 'bg-zinc-600'}`} />
      </div>

      {/* Light beam */}
      {isOn && (
        <div
          className="absolute top-12 left-16 w-48 h-48 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,200,0.15) 0%, rgba(255,255,200,0.02) 70%, transparent 100%)',
            clipPath: 'polygon(0% 0%, 100% 100%, 0% 100%)',
            transform: 'rotate(-45deg) translateX(-20%)',
          }}
        />
      )}

      {/* Main beam area with particles */}
      {isOn && (
        <div
          className="absolute top-14 left-14 w-56 h-44 overflow-hidden pointer-events-none"
          style={{
            clipPath: 'polygon(0% 0%, 100% 70%, 100% 100%, 0% 100%)',
          }}
        >
          {/* Beam gradient */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,200,0.1) 0%, rgba(255,255,200,0.03) 100%)',
            }}
          />

          {/* Dust particles */}
          {particles.map(p => (
            <div
              key={p.id}
              className="absolute rounded-full bg-white/60"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
              }}
            />
          ))}
        </div>
      )}

      {/* Screen */}
      <div className="absolute bottom-8 right-8 w-32 h-24 bg-zinc-800 border-4 border-zinc-700 flex items-center justify-center">
        {isOn ? (
          <div className="text-white/80 text-xs text-center font-mono">
            <div className="text-yellow-400 text-lg mb-1">FILM</div>
            <div>Playing...</div>
          </div>
        ) : (
          <div className="text-zinc-600 text-xs">NO SIGNAL</div>
        )}
      </div>

      <button
        onClick={() => setIsOn(!isOn)}
        className="absolute bottom-4 left-4 px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white text-xs font-bold rounded"
      >
        {isOn ? 'TURN OFF' : 'TURN ON'}
      </button>
    </div>
  );
};

// --- END CREDITS ---
export const EndCredits = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const animationRef = useRef<number | undefined>(undefined);

  const credits = [
    { role: 'DIRECTED BY', name: 'Claude AI' },
    { role: 'PRODUCED BY', name: 'Anthropic' },
    { role: 'WRITTEN BY', name: 'The User' },
    { role: 'STARRING', name: '' },
    { role: '', name: 'React Components' },
    { role: '', name: 'Tailwind CSS' },
    { role: '', name: 'TypeScript' },
    { role: 'MUSIC BY', name: 'Silence' },
    { role: 'SPECIAL THANKS', name: '' },
    { role: '', name: 'Open Source Community' },
    { role: '', name: 'Coffee' },
    { role: '', name: 'Late Nights' },
    { role: '', name: '' },
    { role: 'THE END', name: '' },
  ];

  useEffect(() => {
    if (!isPlaying) {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      return;
    }

    const animate = () => {
      setScrollY(prev => {
        const next = prev + 0.5;
        if (next > 400) return 0;
        return next;
      });
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying]);

  return (
    <div className="h-full bg-black flex flex-col items-center justify-end overflow-hidden relative">
      {/* Starfield background */}
      <div className="absolute inset-0">
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
      </div>

      {/* Credits container */}
      <div
        className="text-center"
        style={{
          transform: `translateY(${200 - scrollY}px)`,
        }}
      >
        {credits.map((credit, i) => (
          <div key={i} className="mb-4">
            {credit.role && (
              <div className="text-zinc-500 text-xs tracking-widest mb-1">
                {credit.role}
              </div>
            )}
            {credit.name && (
              <div className="text-white text-lg font-serif">
                {credit.name}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Fade overlay at top */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black to-transparent pointer-events-none" />

      {/* Controls */}
      <div className="absolute bottom-4 flex gap-2 z-10">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs rounded"
        >
          {isPlaying ? 'PAUSE' : 'PLAY'}
        </button>
        <button
          onClick={() => setScrollY(0)}
          className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs rounded"
        >
          RESTART
        </button>
      </div>
    </div>
  );
};

export const cinemaComponents = {
  'stage-play-nav': StagePlayNav,
  'spotlight-focus': SpotlightFocus,
  'curtain-pull-loader': CurtainPullLoader,
  'filmstrip-gallery': FilmstripGallery,
  'boom-mic-tooltip': BoomMicTooltip,
  'clapperboard-transition': ClapperboardTransition,
  'movie-credits': MovieCredits,
  // CinematicDemos components
  'parallax-scroll': ParallaxScroll,
  // New cinema components
  'film-countdown': FilmCountdown,
  'curtain-reveal': CurtainReveal,
  'spotlight-follow': SpotlightFollow,
  'movie-clapboard': MovieClapboard,
  'film-reel': FilmReel,
  'theater-seats': TheaterSeats,
  'marquee-sign': MarqueeSign,
  'popcorn-bucket': PopcornBucket,
  'projector-beam': ProjectorBeam,
  'end-credits': EndCredits,
};
