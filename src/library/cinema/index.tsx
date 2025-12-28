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
};
