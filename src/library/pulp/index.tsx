import React, { useState, useRef } from 'react';
import { Skull, Star, Heart, Zap, Trash2, RotateCcw, Scissors, EyeOff } from '../shared/icons';
import { useGameLoop } from '../shared/hooks';

// --- THUNDERSTORM FLIP ---
export const ThunderstormFlip = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [flash, setFlash] = useState(false);

  const handleFlip = () => {
    if (!isFlipped) {
      setFlash(true);
      setTimeout(() => setFlash(false), 100);
    }
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={`h-full flex items-center justify-center transition-colors duration-500 ${isFlipped ? 'bg-slate-900' : 'bg-slate-200'} relative overflow-hidden`}>
      <div className={`absolute inset-0 bg-white pointer-events-none transition-opacity duration-75 ${flash ? 'opacity-100' : 'opacity-0'}`} />
      <div
        onClick={handleFlip}
        className={`w-48 h-64 relative cursor-pointer transition-transform duration-500 ${isFlipped ? 'rotate-y-180' : ''}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div className="absolute inset-0 bg-white border-4 border-black p-4 flex flex-col items-center justify-center backface-hidden">
          <h2 className="text-2xl font-black mb-2" style={{ fontFamily: 'Impact' }}>LEVEL 1</h2>
          <p className="text-center text-xs text-gray-500">Tap to reveal</p>
        </div>
        {/* Back */}
        <div
          className="absolute inset-0 bg-red-600 border-4 border-black p-4 flex flex-col items-center justify-center text-white backface-hidden"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <Skull size={48} className="mb-2 animate-bounce" />
          <h2 className="text-3xl font-black" style={{ fontFamily: 'Impact' }}>BOSS!</h2>
        </div>
      </div>
    </div>
  );
};

// --- STICKER BOOK ---
export const StickerBook = () => {
  const [stickers, setStickers] = useState([
    { id: 1, x: 50, y: 50, icon: Star, color: 'text-yellow-400', rotate: 12 },
    { id: 2, x: 150, y: 100, icon: Heart, color: 'text-pink-500', rotate: -5 },
    { id: 3, x: 100, y: 150, icon: Zap, color: 'text-blue-500', rotate: 20 },
  ]);
  const [dragId, setDragId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragId === null || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setStickers(prev => prev.map(s =>
      s.id === dragId ? { ...s, x: e.clientX - rect.left, y: e.clientY - rect.top } : s
    ));
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={() => setDragId(null)}
      onMouseLeave={() => setDragId(null)}
      className="h-full bg-slate-100 p-4 relative overflow-hidden select-none"
    >
      <div className="grid grid-cols-2 gap-2 pointer-events-none opacity-50">
        <div className="h-12 bg-white border-b-2 border-slate-300 col-span-2" />
        <div className="h-16 bg-white rounded shadow-sm" />
        <div className="h-16 bg-white rounded shadow-sm" />
      </div>
      {stickers.map(s => (
        <div
          key={s.id}
          onMouseDown={() => setDragId(s.id)}
          className={`absolute cursor-grab active:cursor-grabbing hover:scale-110 transition-transform ${s.color}`}
          style={{ left: s.x - 20, top: s.y - 20, transform: `rotate(${s.rotate}deg)`, zIndex: 50 }}
        >
          <s.icon size={40} fill="currentColor" stroke="black" strokeWidth={2} />
        </div>
      ))}
    </div>
  );
};

// --- PIXEL DUST DELETE ---
interface Particle { id: number; x: number; y: number; vx: number; vy: number; }

export const PixelDustDelete = () => {
  const [items, setItems] = useState([
    { id: 1, text: "Task A" },
    { id: 2, text: "Task B" },
    { id: 3, text: "Task C" },
  ]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleId = useRef(0);

  useGameLoop(() => {
    if (particles.length === 0) return;
    setParticles(prev => prev.map(p => ({
      ...p, x: p.x + p.vx, y: p.y + p.vy, vy: p.vy + 0.5
    })).filter(p => p.y < 300));
  }, particles.length > 0);

  const handleDelete = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
    const newParticles: Particle[] = [];
    for (let i = 0; i < 20; i++) {
      newParticles.push({
        id: particleId.current++,
        x: 100 + Math.random() * 100,
        y: 50 + id * 40,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 1) * 4
      });
    }
    setParticles(prev => [...prev, ...newParticles]);
  };

  return (
    <div className="h-full bg-slate-50 p-4 relative overflow-hidden">
      <h2 className="text-lg font-bold mb-3 font-mono">TODO</h2>
      <ul className="space-y-2">
        {items.map(item => (
          <li key={item.id} className="bg-white border-2 border-slate-200 p-2 rounded flex justify-between items-center">
            <span className="font-mono text-sm">{item.text}</span>
            <button onClick={() => handleDelete(item.id)} className="text-slate-400 hover:text-red-500">
              <Trash2 size={16} />
            </button>
          </li>
        ))}
      </ul>
      {particles.map(p => (
        <div key={p.id} className="absolute w-1 h-1 bg-blue-500 pointer-events-none" style={{ left: p.x, top: p.y }} />
      ))}
    </div>
  );
};

// --- PAPER DOLL ---
export const PaperDoll = () => {
  const [clothes, setClothes] = useState([
    { id: 'hat', x: 150, y: 40, type: 'hat' },
    { id: 'shirt', x: 160, y: 120, type: 'shirt' },
  ]);
  const [dragId, setDragId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragId || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setClothes(prev => prev.map(c =>
      c.id === dragId ? { ...c, x: e.clientX - rect.left, y: e.clientY - rect.top } : c
    ));
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={() => setDragId(null)}
      onMouseLeave={() => setDragId(null)}
      className="h-full bg-[#f0e6d2] p-4 relative select-none"
    >
      <div className="absolute left-8 bottom-4 w-20 h-40 bg-white border-2 border-black rounded-full flex flex-col items-center">
        <div className="w-12 h-12 border-2 border-black rounded-full mt-2 bg-[#ffe0bd]" />
        <div className="w-16 h-20 bg-[#ffe0bd] border-2 border-black mt-1 rounded-t-xl" />
      </div>
      {clothes.map(item => (
        <div
          key={item.id}
          onMouseDown={() => setDragId(item.id)}
          className="absolute cursor-grab active:cursor-grabbing"
          style={{ left: item.x - 30, top: item.y - 30 }}
        >
          {item.type === 'hat' && (
            <div className="w-16 h-10 bg-blue-600 border-2 border-black rounded-t-lg" />
          )}
          {item.type === 'shirt' && (
            <div className="w-20 h-24 bg-red-500 border-2 border-black rounded-t-xl" />
          )}
        </div>
      ))}
    </div>
  );
};

// --- TV CHANNELS ---
export const TVChannels = () => {
  const [channel, setChannel] = useState(0);
  const [isStatic, setIsStatic] = useState(false);
  const channels = [
    { label: "MATH", bg: "bg-blue-800", content: "y = mx + b" },
    { label: "HIST", bg: "bg-amber-900", content: "1776" },
    { label: "BIO", bg: "bg-green-800", content: "MITOSIS" },
  ];

  const switchChannel = () => {
    setIsStatic(true);
    setTimeout(() => {
      setChannel(prev => (prev + 1) % channels.length);
      setIsStatic(false);
    }, 200);
  };

  return (
    <div className="h-full bg-neutral-900 flex items-center justify-center p-4">
      <div className="bg-neutral-800 border-4 border-neutral-700 rounded-2xl p-4 flex gap-4">
        <div className="w-40 h-28 bg-black rounded-lg overflow-hidden relative">
          <div className={`w-full h-full flex items-center justify-center text-white font-black text-xl ${channels[channel].bg}`}>
            {channels[channel].content}
          </div>
          {isStatic && (
            <div className="absolute inset-0 bg-zinc-500 opacity-80 animate-pulse" />
          )}
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="text-xs font-mono text-white">{channels[channel].label}</div>
          <div onClick={switchChannel} className="w-10 h-10 bg-neutral-600 rounded-full border-4 border-neutral-500 cursor-pointer active:scale-95" />
        </div>
      </div>
    </div>
  );
};

// --- NOIR CARD ---
export const NoirCard = () => {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <div className="h-full bg-zinc-900 flex items-center justify-center p-4">
      <div
        onClick={() => setIsRevealed(!isRevealed)}
        className={`w-48 h-32 rounded shadow-2xl cursor-pointer transition-all duration-500 relative overflow-hidden ${
          isRevealed ? 'bg-amber-100' : 'bg-zinc-800'
        }`}
      >
        <div className={`absolute inset-0 p-4 transition-opacity duration-500 ${isRevealed ? 'opacity-100' : 'opacity-0'}`}>
          <h3 className="font-serif text-amber-900 font-bold">Case #427</h3>
          <p className="text-amber-800/70 text-xs mt-2 font-serif italic">
            The dame walked in at midnight...
          </p>
        </div>
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${isRevealed ? 'opacity-0' : 'opacity-100'}`}>
          <span className="text-zinc-600 font-mono text-xs">CLICK TO REVEAL</span>
        </div>
      </div>
    </div>
  );
};

// ============ COMIC DEMOS ============

// --- SPLASH PAGE EXPANSION ---
export const SplashExpansion = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const cards = [
    { id: 1, title: "QUANTUM", color: "bg-orange-500", rotate: "-rotate-2" },
    { id: 2, title: "ALGEBRA", color: "bg-yellow-400", rotate: "rotate-1" },
    { id: 3, title: "BIOLOGY", color: "bg-pink-500", rotate: "-rotate-1" },
    { id: 4, title: "HISTORY", color: "bg-cyan-400", rotate: "rotate-2" },
  ];

  return (
    <div className="relative w-full h-full overflow-hidden p-6 bg-[#142850]">
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '8px 8px' }}></div>

      {!selectedId && <h2 className="text-white text-2xl text-center mb-4 font-black tracking-wide">SELECT YOUR MISSION</h2>}

      <div className="grid grid-cols-2 gap-4 relative z-10 max-w-md mx-auto h-[80%]">
        {cards.map((card) => {
          const isSelected = selectedId === card.id;
          const isHidden = selectedId && !isSelected;

          return (
            <div
              key={card.id}
              onClick={() => setSelectedId(isSelected ? null : card.id)}
              className={`
                border-4 border-black p-4 shadow-[6px_6px_0_0_#000] cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)]
                ${card.color} flex flex-col justify-center items-center
                ${isSelected ? 'fixed inset-4 z-50 flex flex-col items-center justify-center rotate-0 scale-100' : ''}
                ${isHidden ? 'scale-0 opacity-0 translate-y-[500px] rotate-[90deg]' : `${card.rotate} hover:scale-105`}
              `}
            >
              {isSelected && (
                <div className="absolute inset-0 -z-10 flex items-center justify-center animate-pulse">
                  <svg viewBox="0 0 100 100" className="w-[150%] h-[150%] opacity-50 fill-white">
                    <path d="M50 0 L63 35 L100 38 L73 60 L82 100 L50 80 L18 100 L27 60 L0 38 L37 35 Z" />
                  </svg>
                </div>
              )}

              <h1 className={`${isSelected ? 'text-5xl' : 'text-xl'} uppercase font-black`}>
                {card.title}
              </h1>

              {isSelected && (
                <div className="mt-6 text-center">
                  <p className="font-mono font-bold text-sm mb-4 text-black bg-white/50 p-2 inline-block">MISSION BRIEFING DECLASSIFIED...</p>
                  <div className='mt-4'>
                    <button onClick={(e) => { e.stopPropagation(); setSelectedId(null); }} className="bg-black text-white px-4 py-2 font-bold hover:bg-gray-800 border-2 border-white text-sm">
                        ABORT MISSION (CLOSE)
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// --- INFINITE Z-SCROLL ---
export const ZScrollNoir = () => {
  const [scrollZ, setScrollZ] = useState(0);

  const posters = Array.from({ length: 6 }).map((_, i) => ({
    id: i,
    z: i * -400,
    title: `CHAPTER 0${i + 1}`,
    topic: ["The Atom", "Forces", "Light", "Energy", "Sound", "Space"][i]
  }));

  const getTransform = (itemZ: number) => {
    const relativeZ = itemZ + scrollZ;
    const isClose = relativeZ > -150 && relativeZ < 200;
    const opacity = relativeZ > 200 ? 0 : (relativeZ < -1000 ? 0 : 1);
    const rotateY = isClose ? 180 : 0;

    return {
      transform: `translate3d(0, 0, ${relativeZ}px) rotateY(${rotateY}deg)`,
      opacity,
      zIndex: Math.floor(relativeZ + 1000)
    };
  };

  return (
    <div className="w-full h-full bg-black relative overflow-hidden flex flex-col">
      <div className="absolute top-2 left-2 z-50 bg-white border-2 border-black p-2 font-mono text-xs">
        <p>DEPTH: {scrollZ}px</p>
      </div>

      <div
        className="flex-1 w-full relative"
        style={{ perspective: '800px', perspectiveOrigin: '50% 50%' }}
      >
        <div className="absolute inset-0 flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
          {posters.map((poster) => {
             const style = getTransform(poster.z);
             return (
               <div
                 key={poster.id}
                 className="absolute w-48 h-72 transition-transform duration-500 ease-out bg-white border-4 border-white shadow-[0_0_20px_rgba(255,0,255,0.5)] flex items-center justify-center"
                 style={{ ...style, transformStyle: 'preserve-3d' }}
               >
                 <div className="absolute inset-0 bg-[#142850] flex flex-col items-center justify-center p-4 border-4 border-black" style={{ backfaceVisibility: 'hidden' }}>
                   <div className="w-16 h-16 bg-orange-500 rounded-full mb-4 animate-pulse"></div>
                   <h2 className="text-2xl text-white text-center font-black">{poster.title}</h2>
                 </div>

                 <div className="absolute inset-0 bg-yellow-400 flex flex-col items-center justify-center border-4 border-black p-4" style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}>
                   <h3 className="font-bold text-xl mb-4 text-black uppercase">{poster.topic}</h3>
                   <ul className="list-disc pl-4 font-mono text-xs font-bold space-y-2 text-black">
                     <li>Section A: Basics</li>
                     <li>Section B: Advanced</li>
                   </ul>
                   <button className="mt-4 bg-black text-white px-3 py-1 font-mono text-xs">START</button>
                 </div>
               </div>
             );
          })}
        </div>

        <div
           className="absolute bottom-[-100px] left-[-50%] w-[200%] h-[500px]"
           style={{
             backgroundImage: `
               linear-gradient(0deg,transparent 24%,rgba(51,255,0,.3) 25%,rgba(51,255,0,.3) 26%,transparent 27%,transparent 74%,rgba(51,255,0,.3) 75%,rgba(51,255,0,.3) 76%,transparent 77%,transparent),
               linear-gradient(90deg,transparent 24%,rgba(51,255,0,.3) 25%,rgba(51,255,0,.3) 26%,transparent 27%,transparent 74%,rgba(51,255,0,.3) 75%,rgba(51,255,0,.3) 76%,transparent 77%,transparent)
             `,
             backgroundSize: '50px 50px',
             transform: `rotateX(60deg) translateY(${scrollZ % 50}px)`
           }}
        ></div>
      </div>

      <div className="bg-gray-900 p-3 border-t-4 border-[#33ff00] z-50">
        <label className="text-[#33ff00] font-mono text-xs block mb-2 text-center animate-pulse">◄ WALK DOWN THE ALLEY ►</label>
        <input
          type="range"
          min="0"
          max="2400"
          value={scrollZ}
          onChange={(e) => setScrollZ(parseInt(e.target.value))}
          className="w-full accent-[#33ff00]"
        />
      </div>
    </div>
  );
};

// --- RIP-AWAY TRANSITION ---
export const RipAway = () => {
  const [ripProgress, setRipProgress] = useState(0);

  const generateClipPath = (progress: number) => {
    const x = progress;
    let path = `polygon(${x}% 0, 100% 0, 100% 100%, ${x}% 100%`;

    const steps = 10;
    for (let i = steps; i >= 0; i--) {
      const y = (i / steps) * 100;
      const jitter = (i % 2 === 0 ? 3 : -3) * (progress > 0 && progress < 100 ? 1 : 0);
      path += `, ${x + jitter}% ${y}%`;
    }
    path += ')';
    return path;
  };

  return (
    <div className="w-full h-full relative overflow-hidden select-none bg-black">
      {/* BOTTOM LAYER */}
      <div className="absolute inset-0 bg-pink-500 flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl text-white drop-shadow-[4px_4px_0_#000] font-black">NEXT LEVEL!</h1>
        <p className="font-mono text-white text-sm mt-4">You revealed the secret content.</p>
        <button onClick={() => setRipProgress(0)} className="mt-6 bg-white border-4 border-black p-2 shadow-[4px_4px_0_0_#000] hover:scale-110 active:scale-95 transition-transform text-black">
          <RotateCcw size={20} />
        </button>
      </div>

      {/* TOP LAYER */}
      <div
        className="absolute inset-0 bg-[#142850] flex flex-col p-6 items-center justify-center"
        style={{ clipPath: generateClipPath(ripProgress), transition: 'clip-path 0.1s linear' }}
      >
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '8px 8px' }}></div>

        <div className="border-4 border-white p-3 mb-4 bg-[#142850] z-10">
          <h1 className="text-2xl text-white font-black">CHAPTER COMPLETE</h1>
        </div>

        <div className="bg-white border-4 border-black p-4 shadow-[6px_6px_0_0_#000] rotate-1 max-w-xs w-full z-10">
          <h2 className="text-xl font-bold mb-3 text-black">SUMMARY REPORT</h2>
          <div className="space-y-2 font-mono">
            <div className="h-3 bg-gray-200 w-3/4"></div>
            <div className="h-3 bg-gray-200 w-full"></div>
            <div className="h-3 bg-gray-200 w-5/6"></div>
          </div>
          <div className="mt-4 flex justify-center">
            <div className="border-4 border-red-600 text-red-600 font-black text-lg px-3 py-1 transform -rotate-12 inline-block opacity-80">
              PASSED
            </div>
          </div>
        </div>
      </div>

      {/* CONTROLLER */}
      <div className="absolute bottom-6 left-6 right-6 z-50">
        <div className="relative h-10 bg-black rounded-full border-4 border-white flex items-center px-2 shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
           <span className="absolute left-4 text-white font-mono font-bold text-xs pointer-events-none">SLIDE TO TEAR PAGE ►►►</span>
           <input
             type="range"
             min="0"
             max="100"
             value={ripProgress}
             onChange={(e) => setRipProgress(Number(e.target.value))}
             className="w-full opacity-0 cursor-pointer z-20 h-full absolute inset-0"
           />
           <div
             className="h-6 w-10 bg-orange-500 border-2 border-white rounded-full absolute pointer-events-none transition-all duration-100 flex items-center justify-center z-10"
             style={{ left: `calc(${ripProgress}% - 20px + 10px)` }}
           >
             <Scissors size={14} className="text-white transform -scale-x-100" />
           </div>
        </div>
      </div>
    </div>
  );
};

// --- ORIGAMI SUBMIT ---
export const OrigamiSubmit = () => {
  const [status, setStatus] = useState<'idle' | 'folding' | 'done'>('idle');

  return (
    <div className="w-full h-full bg-yellow-100 flex items-center justify-center overflow-hidden" style={{ perspective: '1000px' }}>
      <div
        className={`
          bg-white border-4 border-black p-6 w-72 shadow-[6px_6px_0_0_rgba(0,0,0,0.2)] relative transition-all duration-1000 ease-in-out
          ${status === 'folding' ? 'scale-0 translate-x-[500px] -translate-y-[500px] rotate-[720deg]' : ''}
        `}
        style={{ transformOrigin: 'bottom right' }}
      >
        {status === 'idle' ? (
          <>
            <h2 className="text-2xl mb-4 text-center text-black font-black">FINAL EXAM</h2>
            <div className="space-y-3 mb-4">
              <input type="text" placeholder="NAME" className="w-full border-2 border-black p-2 font-mono bg-gray-100 text-black text-sm" disabled />
              <div className="h-24 border-2 border-black p-2 font-mono bg-gray-100 text-gray-400 text-xs">
                Write your answer here...
              </div>
            </div>
            <button
              onClick={() => {
                setStatus('folding');
                setTimeout(() => setStatus('done'), 1000);
              }}
              className="w-full bg-orange-500 border-4 border-black text-white font-bold py-2 shadow-[4px_4px_0_0_#000] active:translate-y-1 active:shadow-none hover:bg-orange-600 transition-all text-sm"
            >
              SUBMIT PAPER
            </button>
          </>
        ) : (
          <div className="w-full h-full bg-white flex items-center justify-center">
            <div className="border-t-4 border-l-4 border-black w-full h-full absolute inset-0 opacity-10"></div>
          </div>
        )}
      </div>

      {status === 'done' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="bg-green-500 text-white border-4 border-black p-4 rotate-3 shadow-[6px_6px_0_0_#000]">
            <h1 className="text-3xl font-black">DELIVERED!</h1>
          </div>
          <button onClick={() => setStatus('idle')} className="mt-6 underline font-mono font-bold text-black hover:text-orange-500 text-sm">Write Another</button>
        </div>
      )}
    </div>
  );
};

// --- TATTERED MAP SYLLABUS ---
export const TatteredMap = () => {
  const [level, setLevel] = useState(1);

  const islands = [
    { id: 1, x: 20, y: 80, label: "START" },
    { id: 2, x: 50, y: 60, label: "MECHANICS" },
    { id: 3, x: 30, y: 30, label: "OPTICS" },
    { id: 4, x: 80, y: 20, label: "QUANTUM" },
  ];

  return (
    <div className="w-full h-full bg-[#d4c5a0] relative overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect width=\'100\' height=\'100\' fill=\'%23c9b896\'/%3E%3C/svg%3E")' }}></div>

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path
          d="M20 80 Q 35 70 50 60 T 30 30 T 80 20"
          fill="none"
          stroke="#8b4513"
          strokeWidth="0.5"
          strokeDasharray="2 1"
          className="opacity-50"
        />

        {islands.map((island) => (
          <g key={island.id} onClick={() => setLevel(island.id)} style={{ cursor: 'pointer' }}>
            <circle cx={island.x} cy={island.y} r="6" fill={level >= island.id ? "#8b4513" : "#d4c5a0"} stroke="#5c2e08" strokeWidth="0.5" className="hover:fill-orange-500 transition-colors" />
            <text x={island.x} y={island.y + 10} fontSize="3" textAnchor="middle" fontWeight="bold" fill="#5c2e08">
              {island.label}
            </text>
            {level === island.id && (
               <circle cx={island.x} cy={island.y} r="8" fill="none" stroke="red" strokeWidth="0.5" className="animate-ping" />
            )}
          </g>
        ))}
      </svg>

      {/* FOG OF WAR */}
      <div className="absolute inset-0 pointer-events-none transition-all duration-1000">
         <svg className="w-full h-full">
           <defs>
             <mask id="fog-mask">
               <rect x="0" y="0" width="100%" height="100%" fill="white" />
               {islands.map((island) => (
                 level >= island.id && (
                   <circle
                     key={island.id}
                     cx={`${island.x}%`}
                     cy={`${island.y}%`}
                     r={level > island.id ? "30%" : "15%"}
                     fill="black"
                     className="transition-all duration-1000 ease-in-out"
                   />
                 )
               ))}
             </mask>
           </defs>
           <rect x="0" y="0" width="100%" height="100%" fill="#142850" mask="url(#fog-mask)" opacity="0.95" />
         </svg>
      </div>

      {/* UI Controls */}
      <div className="absolute bottom-3 left-3 z-50">
        <div className="bg-white border-4 border-black p-3 shadow-lg">
          <h3 className="font-bold mb-2 font-mono text-black text-xs">LOCATION: {islands.find(i => i.id === level)?.label}</h3>
          <button
            onClick={() => setLevel(prev => Math.min(prev + 1, 4))}
            className="bg-orange-500 text-white font-bold px-3 py-1 border-2 border-black hover:bg-orange-600 shadow-[2px_2px_0_0_#000] text-xs"
          >
            COMPLETE LEVEL
          </button>
        </div>
      </div>
    </div>
  );
};

// ============ NARRATIVE DEMOS ============

// --- REDACTED REVEAL (HOVER ERASE) ---
export const RedactedReveal = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="h-full bg-zinc-100 flex items-center justify-center p-8">
      <div className="w-full max-w-xl bg-white border-2 border-black p-10 shadow-2xl font-serif text-lg relative overflow-hidden">
        <h2 className="font-black mb-4">Teacher's Confidential Notes:</h2>

        <p className="text-gray-800 leading-loose">
          The concept of <span className="font-bold text-red-700">Thermodynamics</span> is simpler than taught, but the <span className="font-bold text-red-700">Second Law</span> is often misunderstood.

          <span
            className="relative inline-block ml-1 cursor-crosshair align-bottom"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* The Text */}
            <span className="font-bold text-green-700 px-1">
              The secret is to focus only on <span className="text-yellow-600">Entropy</span>, which always increases in a closed system.
            </span>

            {/* The Redaction Overlay */}
            <span
                className={`absolute inset-0 bg-black transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
            ></span>
          </span>
        </p>

        <p className="mt-6 text-sm text-gray-500 font-mono flex items-center gap-2">
          {isHovered ? <EyeOff size={16} /> : 'HOVER TO REVEAL REDACTION'}
        </p>
      </div>
    </div>
  );
};

// ============ FINAL DEMOS - MONOCLE ZOOM ============

import { Aperture } from '../shared/icons';

// --- MONOCLE DETAIL ZOOM ---
export const MonocleZoom = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  return (
    <div className="h-full bg-zinc-100 flex items-center justify-center p-4">
      <div
        ref={imageRef}
        onMouseMove={handleMouseMove}
        className="relative w-full max-w-xs h-48 overflow-hidden border-4 border-gray-700 shadow-xl cursor-none"
      >
        {/* Base image */}
        <div
          className="w-full h-full"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          }}
        >
          <div className="w-full h-full flex items-center justify-center text-white/50 font-serif">
            <div className="text-center">
              <p className="text-xl font-bold">SECRET DOCUMENT</p>
              <p className="text-xs mt-2">Hover to examine details</p>
            </div>
          </div>
        </div>

        {/* The Monocle Lens */}
        <div
          className="absolute w-24 h-24 rounded-full border-4 border-amber-900 shadow-2xl pointer-events-none overflow-hidden"
          style={{
            left: mousePos.x,
            top: mousePos.y,
            transform: 'translate(-50%, -50%)',
            background: 'linear-gradient(135deg, #fef3c7 0%, #fffbeb 100%)',
          }}
        >
          <div className="w-full h-full flex items-center justify-center text-amber-900">
            <div className="text-center text-xs font-mono">
              <p className="font-bold">MAGNIFIED</p>
              <p>X: {Math.round(mousePos.x)}</p>
              <p>Y: {Math.round(mousePos.y)}</p>
            </div>
          </div>
          <Aperture size={12} className="absolute bottom-1 right-1 text-amber-700" />
        </div>
      </div>
    </div>
  );
};

// --- X-RAY SPECS ---
export const XRaySpecs = () => {
  const [mousePos, setMousePos] = useState({ x: 150, y: 150 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="h-full bg-slate-100 relative overflow-hidden cursor-none"
    >
      {/* Regular View */}
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div className="bg-white border-4 border-black p-6 shadow-lg max-w-xs w-full">
          <h2 className="text-xl font-black mb-3 text-black">STUDENT PROFILE</h2>
          <div className="space-y-2 text-gray-700 text-sm">
            <p><strong>Name:</strong> Jane Doe</p>
            <p><strong>ID:</strong> #12345</p>
            <p><strong>Status:</strong> Active</p>
          </div>
          <div className="mt-4 h-8 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>

      {/* X-Ray View */}
      <div
        className="absolute inset-0 flex items-center justify-center p-6 pointer-events-none"
        style={{
          clipPath: `circle(80px at ${mousePos.x}px ${mousePos.y}px)`,
        }}
      >
        <div className="bg-green-900 border-4 border-green-400 p-6 shadow-lg max-w-xs w-full">
          <h2 className="text-xl font-black mb-3 text-green-400 drop-shadow-[0_0_10px_#4ade80]">
            CLASSIFIED DATA
          </h2>
          <div className="space-y-2 text-green-300 font-mono text-xs">
            <p><strong>Real Name:</strong> Agent X-42</p>
            <p><strong>Clearance:</strong> LEVEL 5</p>
            <p><strong>Mission:</strong> ACTIVE</p>
            <p className="text-red-400 animate-pulse"><strong>WARNING:</strong> ENCRYPTED</p>
          </div>
          <div className="mt-4 h-8 bg-green-800 rounded flex items-center justify-center text-green-400 font-mono text-[10px]">
            ████ REDACTED ████
          </div>
        </div>
      </div>

      {/* X-Ray Lens Effect */}
      <div
        className="absolute w-40 h-40 rounded-full border-4 border-green-400 pointer-events-none"
        style={{
          left: mousePos.x - 80,
          top: mousePos.y - 80,
          boxShadow: '0 0 30px rgba(74, 222, 128, 0.5), inset 0 0 20px rgba(74, 222, 128, 0.3)',
        }}
      />

      <p className="absolute bottom-4 left-4 text-gray-400 font-mono text-xs">
        MOVE CURSOR TO SCAN
      </p>
    </div>
  );
};

export const pulpComponents = {
  'thunderstorm-flip': ThunderstormFlip,
  'sticker-book': StickerBook,
  'pixel-dust-delete': PixelDustDelete,
  'paper-doll': PaperDoll,
  'tv-channels': TVChannels,
  'noir-card': NoirCard,
  // ComicDemos components
  'splash-expansion': SplashExpansion,
  'z-scroll-noir': ZScrollNoir,
  'rip-away': RipAway,
  'origami-submit': OrigamiSubmit,
  'tattered-map': TatteredMap,
  // NarrativeDemos components
  'redacted-reveal': RedactedReveal,
  // FinalDemos components
  'monocle-zoom': MonocleZoom,
  // DataToolsDemos components
  'x-ray-specs': XRaySpecs,
};
