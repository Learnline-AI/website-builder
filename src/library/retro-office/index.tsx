import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Keyboard, Heart, Trash2, Search, BookOpen, User, Coffee, Calculator } from '../shared/icons';

// --- RADIO DIAL SLIDER ---
export const RadioDialSlider = () => {
  const [value, setValue] = useState(50);

  return (
    <div className="h-full bg-zinc-800 flex items-center justify-center p-4">
      <div className="w-full max-w-xs p-4 bg-gray-700 rounded-xl shadow-xl border-4 border-gray-600">
        <div className="flex justify-between items-center mb-3">
          <Volume2 size={20} className="text-white" />
          <span className="font-mono text-sm text-yellow-400">{value} MHz</span>
        </div>
        <input
          type="range" min="1" max="100" value={value}
          onChange={(e) => setValue(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-yellow-400"
        />
        <div className="relative w-full h-6 mt-2 overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full w-[200%] bg-gray-500 opacity-30"
            style={{
              backgroundImage: 'linear-gradient(to right, transparent 50%, #fff 50%)',
              backgroundSize: '2px 100%',
              transform: `translateX(-${value * 2}px)`
            }}
          />
        </div>
      </div>
    </div>
  );
};

// --- KEYBOARD CHATTER INPUT ---
export const KeyboardChatterInput = () => {
  const [keyPress, setKeyPress] = useState(false);
  const [text, setText] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    setKeyPress(true);
    setTimeout(() => setKeyPress(false), 50);
  };

  return (
    <div className="h-full bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-xs p-4 bg-green-900 border-2 border-green-400" style={{ boxShadow: '0 0 10px rgba(0,255,0,0.7)' }}>
        <label className="font-mono text-green-400 mb-2 block text-xs">TERMINAL</label>
        <textarea
          value={text}
          onChange={handleChange}
          rows={4}
          className={`w-full p-2 font-mono text-sm bg-black text-green-300 resize-none focus:outline-none transition-opacity ${
            keyPress ? 'opacity-100 shadow-[0_0_10px_rgba(0,255,0,0.5)]' : 'opacity-80'
          }`}
          placeholder="Start typing..."
        />
        <Keyboard size={16} className={`mt-2 text-green-500 transition-transform ${keyPress ? 'scale-110' : 'scale-100'}`} />
      </div>
    </div>
  );
};

// --- TREMOR DELETE BUTTON ---
export const TremorDeleteButton = () => {
  return (
    <div className="h-full bg-zinc-100 flex items-center justify-center p-4">
      <button className="px-4 py-2 bg-red-600 text-white font-bold rounded-full shadow-lg animate-tremor hover:bg-red-700 flex items-center gap-2">
        <Trash2 size={16} />
        <span className="font-mono text-sm">DELETE</span>
      </button>
      <style>{`
        @keyframes tremor {
          0%, 100% { transform: translate(1px, 1px) rotate(0deg); }
          25% { transform: translate(-1px, -1px) rotate(-0.5deg); }
          50% { transform: translate(1px, -1px) rotate(0.5deg); }
          75% { transform: translate(-1px, 1px) rotate(-0.5deg); }
        }
        .animate-tremor { animation: tremor 0.2s infinite; }
      `}</style>
    </div>
  );
};

// --- HEARTBEAT COUNTDOWN ---
export const HeartbeatCountdown = () => {
  const [seconds, setSeconds] = useState(10);
  const [isBeat, setIsBeat] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(s => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (seconds > 0 && seconds <= 10) {
      setIsBeat(true);
      setTimeout(() => setIsBeat(false), 200);
    }
  }, [seconds]);

  return (
    <div className="h-full bg-zinc-900 flex flex-col items-center justify-center p-4">
      <p className="text-white font-mono mb-2 text-xs">DEADLINE:</p>
      <div className={`w-24 h-24 rounded-full border-4 flex items-center justify-center font-black text-3xl transition-all duration-200 ${
        seconds <= 0 ? 'bg-red-800 border-red-500 text-white' : 'bg-red-600 border-red-300 text-white'
      } ${isBeat ? 'scale-110' : 'scale-100'}`}>
        {seconds > 0 ? seconds : 'END'}
      </div>
      <Heart size={20} className={`mt-2 transition-opacity ${isBeat ? 'opacity-100 text-red-400' : 'opacity-30 text-gray-600'}`} />
    </div>
  );
};

// --- CARD CATALOG ---
export const CardCatalog = () => {
  const [openDrawer, setOpenDrawer] = useState<string | null>(null);
  const drawers = [
    { name: "A-C", results: ["Article A1", "Case B2"], color: "bg-red-400" },
    { name: "D-F", results: ["Document D1"], color: "bg-blue-400" },
    { name: "G-I", results: ["Graph G5", "Index I3"], color: "bg-green-400" },
  ];

  return (
    <div className="h-full bg-stone-700 flex items-center justify-center p-4">
      <div className="w-full max-w-xs h-full bg-stone-800 border-4 border-stone-900 shadow-xl p-3 space-y-2">
        <Search size={16} className="text-white mb-2" />
        {drawers.map(drawer => (
          <div key={drawer.name} className="relative">
            <button
              onClick={() => setOpenDrawer(openDrawer === drawer.name ? null : drawer.name)}
              className="w-full h-10 bg-stone-600 border-b-2 border-stone-900 text-white font-bold flex items-center justify-between px-2 text-xs transition-transform duration-300"
              style={{ transform: openDrawer === drawer.name ? 'translateY(30px)' : 'translateY(0)' }}
            >
              {drawer.name}
              <div className="w-6 h-1.5 bg-stone-900 rounded-full" />
            </button>
            <div className={`absolute top-0 left-0 w-full transition-all duration-300 ${openDrawer === drawer.name ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
              {drawer.results.map((result, i) => (
                <div key={i} className={`h-8 border border-gray-400 ${drawer.color}/70 p-1 mb-1 shadow-inner flex items-center text-xs`}>
                  <BookOpen size={12} className="mr-1" /> {result}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- TYPEWRITER TEXT ---
export const TypewriterText = () => {
  const [text, setText] = useState('');
  const fullText = 'The quick brown fox jumps over the lazy dog.';
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      const timer = setTimeout(() => {
        setText(prev => prev + fullText[index]);
        setIndex(i => i + 1);
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [index]);

  return (
    <div className="h-full bg-amber-50 flex items-center justify-center p-4">
      <div className="w-full max-w-xs p-4 bg-white border-2 border-amber-900 shadow-lg font-mono">
        <p className="text-amber-900 text-sm min-h-[60px]">
          {text}
          <span className="animate-blink">|</span>
        </p>
      </div>
      <style>{`
        @keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }
        .animate-blink { animation: blink 0.7s infinite; }
      `}</style>
    </div>
  );
};

// --- FILING CABINET ---
export const FilingCabinet = () => {
  const [openDrawer, setOpenDrawer] = useState<number | null>(null);

  return (
    <div className="h-full bg-zinc-700 flex items-center justify-center p-4">
      <div className="w-32 bg-zinc-600 border-4 border-zinc-800 rounded shadow-2xl">
        {[1, 2, 3].map(drawer => (
          <div
            key={drawer}
            onClick={() => setOpenDrawer(openDrawer === drawer ? null : drawer)}
            className={`h-16 border-b-2 border-zinc-800 bg-zinc-500 cursor-pointer transition-transform duration-300 flex items-center justify-center ${
              openDrawer === drawer ? 'translate-x-8 bg-zinc-400' : ''
            }`}
          >
            <div className="w-8 h-2 bg-zinc-700 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
};

// ============ NARRATIVE DEMOS ============

import { HardDrive } from '../shared/icons';

// --- DESK LAMP FOCUS (NIGHT MODE) ---
export const DeskLampFocus = () => {
  const [isNightMode, setIsNightMode] = useState(false);

  const toggleMode = () => {
    setIsNightMode(!isNightMode);
  };

  return (
    <div className={`h-full relative flex items-center justify-center transition-colors duration-1000 ${isNightMode ? 'bg-zinc-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Desk Lamp (Simulated) */}
      <div className="absolute top-0 right-1/4 h-2 w-20 bg-gray-500 rounded-b-full shadow-lg"></div>

      {/* Pull Chain */}
      <div className="absolute top-0 right-1/4 flex flex-col items-center">
        <div className="w-0.5 h-16 bg-gray-500 shadow-md"></div>
        <button
          onClick={toggleMode}
          className={`w-6 h-6 rounded-full border-2 transition-all duration-300 z-10 flex items-center justify-center text-[10px]
            ${isNightMode ? 'bg-yellow-300 border-yellow-100 shadow-[0_0_10px_yellow]' : 'bg-gray-400 border-gray-600'}
          `}
        >
        </button>
      </div>

      {/* Focused Content */}
      <div className={`p-10 w-96 rounded-lg shadow-2xl relative transition-all duration-1000 ${isNightMode ? 'bg-black/50 border-4 border-yellow-500/50' : 'bg-gray-100 border-none'}`}>
        {/* Spotlight Effect (Only visible in Night Mode) */}
        {isNightMode && (
          <div
            className="absolute inset-0 rounded-lg pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(255,255,0,0.1) 0%, rgba(0,0,0,0.9) 80%)'
            }}
          />
        )}
        <h2 className="text-3xl font-black mb-4 z-10 relative">Focus Mode Active</h2>
        <p className="font-serif z-10 relative">
          The user interface adjusts to reduce eye strain, placing the visual focus directly on the learning material.
        </p>
      </div>
    </div>
  );
};

// --- FLOPPY DISK SAVE ---
export const FloppyDiskSave = () => {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1500);
  };

  return (
    <div className="h-full bg-blue-500 flex flex-col items-center justify-center p-8">
      <div className="w-80 h-40 bg-gray-100 border-8 border-gray-300 rounded-lg shadow-inner flex items-center justify-center relative">
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white/50 font-mono text-2xl uppercase">
          {isSaving ? 'TRANSFERRING...' : 'READY'}
        </div>
      </div>

      <div className="mt-8 relative perspective-1000">
        {/* 3.5" Floppy Disk */}
        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`relative w-32 h-32 bg-zinc-800 border-4 border-black rounded-lg p-2 flex flex-col items-center justify-center transition-all duration-300 shadow-xl hover:scale-105 ${isSaving ? 'animate-pulse' : ''}`}
          style={{ transform: 'rotateX(15deg)' }}
        >
          {/* Metal Shutter */}
          <div
            className={`absolute top-2 w-24 h-8 bg-gray-400 rounded-t-sm transition-transform duration-300 z-10 overflow-hidden ${isSaving ? 'translate-x-[10px]' : 'translate-x-0'}`}
          >
             <div className="w-4 h-full bg-black/20 ml-2"></div>
          </div>
          <HardDrive size={40} className="text-gray-500 mt-8" />
          <span className="text-white font-mono text-[10px] mt-2 bg-white/10 px-2">SAVE.EXE</span>
        </button>
      </div>

      {isSaving && (
        <p className="mt-6 text-white font-mono text-sm animate-bounce">
          💾 Data Secure on Disk!
        </p>
      )}
    </div>
  );
};

// ============ TEXTURE DEMOS ============

// --- LIBRARY CARD CATALOG ---
export const LibraryCardCatalog = () => {
  const [activeDrawer, setActiveDrawer] = useState<number | null>(null);

  const drawers = [
    { id: 0, label: "A-F" },
    { id: 1, label: "G-M" },
    { id: 2, label: "N-Z" },
  ];

  return (
    <div className="h-full bg-[#3e2723] flex items-center justify-center p-8 perspective-[1200px]">
      <div className="bg-[#5d4037] p-4 rounded shadow-2xl border-t border-[#8d6e63]">
        <div className="flex flex-col gap-4">
          {drawers.map((d) => (
            <div
              key={d.id}
              className="relative w-64 h-24 preserve-3d transition-transform duration-500 cursor-pointer group"
              onClick={() => setActiveDrawer(activeDrawer === d.id ? null : d.id)}
              style={{
                transform: activeDrawer === d.id ? 'translateZ(100px) translateX(50px)' : 'translateZ(0)'
              }}
            >
              {/* Drawer Front */}
              <div className="absolute inset-0 bg-[#795548] border-4 border-[#4e342e] shadow-lg flex items-center justify-center z-20 backface-hidden">
                {/* Brass Handle */}
                <div className="w-24 h-8 bg-gradient-to-b from-yellow-600 to-yellow-800 rounded-sm shadow-md flex items-center justify-center border border-yellow-900">
                  <div className="w-16 h-4 bg-[#3e2723] shadow-inner inset-shadow"></div>
                </div>
                {/* Label Slot */}
                <div className="absolute bottom-2 bg-[#d7ccc8] border border-gray-400 px-2 py-0.5 text-xs font-serif font-bold text-black shadow-sm">
                  {d.label}
                </div>
              </div>

              {/* Drawer Interior/Side (Revealed on pull) */}
              <div className="absolute top-0 right-0 h-full w-[300px] bg-[#d7ccc8] origin-left rotate-y-90 bg-[url('https://www.transparenttextures.com/patterns/lined-paper.png')] flex items-center p-4 transform translate-x-full -rotate-y-90 z-10 transition-opacity duration-500"
                   style={{
                     opacity: activeDrawer === d.id ? 1 : 0,
                     transform: 'translateZ(-1px)'
                   }}>
              </div>

              {/* The Card (Pops up) */}
              <div
                className={`absolute -top-16 left-4 w-56 h-32 bg-white shadow-md p-4 font-mono text-xs border border-gray-300 transition-all duration-500 delay-100 ${activeDrawer === d.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                style={{ zIndex: 10 }}
              >
                <div className="border-b border-black mb-2 pb-1 font-bold">SEARCH RESULTS: {d.label}</div>
                <ul className="list-disc pl-4 space-y-1 text-black">
                  <li>Item #8492</li>
                  <li>Item #1029</li>
                  <li>Item #3392</li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============ TACTILE DEMOS ============

// --- THE 3D ROLODEX ---
export const Rolodex = () => {
  const [rotation, setRotation] = useState(0);
  const contacts = [
    { name: "Prof. Falken", role: "AI Ethics", color: "bg-blue-100" },
    { name: "Dr. Arcadio", role: "Physics", color: "bg-red-100" },
    { name: "Sarah Connor", role: "History", color: "bg-green-100" },
    { name: "Marty McFly", role: "Music", color: "bg-yellow-100" },
    { name: "Ellen Ripley", role: "Biology", color: "bg-purple-100" },
  ];

  const handleWheel = (e: React.WheelEvent) => {
    setRotation(prev => prev + (e.deltaY > 0 ? -20 : 20));
  };

  return (
    <div className="h-full bg-stone-300 flex items-center justify-center overflow-hidden" onWheel={handleWheel}>
      <div className="relative w-80 h-96 flex items-center justify-center" style={{ perspective: '1200px' }}>
        {/* Rolodex Hub */}
        <div className="absolute w-4 h-full bg-zinc-800 rounded-full left-1/2 -translate-x-1/2 shadow-2xl z-0" />

        {/* Cards */}
        <div
          className="relative w-64 h-44 transition-transform duration-500 ease-out"
          style={{ transform: `rotateX(${rotation}deg)`, transformStyle: 'preserve-3d' }}
        >
          {contacts.map((c, i) => (
            <div
              key={i}
              className={`absolute inset-0 ${c.color} border-2 border-stone-400 p-6 flex flex-col shadow-lg rounded-sm`}
              style={{
                transform: `rotateX(${i * (360 / contacts.length)}deg) translateZ(180px)`,
                borderTop: '15px solid #d6d3d1',
                backfaceVisibility: 'hidden'
              }}
            >
              <div className="w-10 h-10 rounded-full bg-white mb-4 border border-stone-300 flex items-center justify-center">
                <User size={20} className="text-stone-400" />
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-800">{c.name}</h3>
              <p className="font-mono text-xs text-stone-500 uppercase tracking-widest">{c.role}</p>
              <div className="absolute bottom-4 right-4 text-[10px] font-mono text-stone-400 italic">ID_00{i+1}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-4 text-stone-600 font-mono text-xs">SCROLL OR DRAG TO SPIN DIAL</div>
    </div>
  );
};

// --- DYMO LABEL MAKER ---
export const DymoLabeler = () => {
  const [text, setText] = useState("");
  const [tape, setTape] = useState<string[]>([]);

  const punch = () => {
    if (text.length === 0) return;
    const char = text.charAt(0).toUpperCase();
    setTape(prev => [...prev, char]);
    setText(prev => prev.slice(1));
  };

  return (
    <div className="h-full bg-zinc-100 flex flex-col items-center justify-center p-10">
      <div className="w-64 bg-red-700 rounded-t-full p-8 shadow-2xl border-b-[20px] border-red-900 flex flex-col items-center gap-6">
        <div className="w-40 h-40 rounded-full bg-zinc-800 border-8 border-red-800 flex items-center justify-center relative shadow-inner">
          <span className="text-white font-black text-2xl font-mono">{(text[0] || 'A').toUpperCase()}</span>
          <div className="absolute top-0 w-2 h-4 bg-red-600"></div>
        </div>

        <input
          maxLength={10}
          className="w-full bg-black/20 border-none text-white text-center font-mono p-2 rounded"
          placeholder="TYPE HERE"
          value={text}
          onChange={(e) => setText(e.target.value.toUpperCase())}
        />

        <button
          onClick={punch}
          className="w-full bg-zinc-200 hover:bg-white p-4 font-black rounded shadow-[0_4px_0_#999] active:translate-y-1 active:shadow-none transition-all"
        >
          PUNCH
        </button>
      </div>

      {/* The Tape Output */}
      <div className="mt-12 flex items-center h-12 bg-black/5 w-full max-w-2xl overflow-x-auto p-4 border-y border-black/5">
        <div className="flex gap-1 animate-[slideIn_0.5s_ease-out]">
          {tape.map((char, i) => (
            <div key={i} className="w-8 h-10 bg-blue-900 flex items-center justify-center text-white font-black rounded-sm shadow-[inset_1px_1px_2px_rgba(255,255,255,0.4)] border-r border-black/20 italic" style={{ textShadow: '1px 1px 0px black' }}>
              {char}
            </div>
          ))}
          <div className="w-12 h-10 bg-blue-900/40 rounded-r-lg"></div>
        </div>
      </div>
      <style>{`@keyframes slideIn { from { transform: translateX(-20px); } to { transform: translateX(0); } }`}</style>
    </div>
  );
};

// --- OVERHEAD PROJECTOR ---
export const OverheadProjector = () => {
  const [focus, setFocus] = useState(0);

  return (
    <div className="h-full bg-stone-200 flex flex-col items-center justify-center p-8">
      <div className="relative w-full max-w-2xl aspect-video bg-white shadow-[0_0_100px_rgba(255,255,200,0.5)] overflow-hidden flex items-center justify-center">
        {/* Dust/Grain Effect */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.65\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')" }} />

        {/* Content */}
        <div
          className="text-center transition-all duration-300 p-12"
          style={{
            filter: `blur(${Math.abs(80 - focus) / 5}px)`,
            opacity: 0.8,
            transform: `scale(${1 + (focus / 1000)}) rotate(${(50 - focus) / 50}deg)`
          }}
        >
          <h1 className="text-5xl font-serif font-black text-blue-900 underline mb-6">SUMMARY: THE ATOM</h1>
          <p className="text-xl font-mono text-zinc-800 max-w-md">
            1. Protons and Neutrons reside in the nucleus. <br/>
            2. Electrons orbit in shells. <br/>
            3. Most of an atom is empty space.
          </p>
          <div className="mt-8 border-4 border-dashed border-zinc-300 p-4 font-mono text-xs italic">
            [FIG A.1] - CROSS SECTION
          </div>
        </div>

        {/* Light Source Glow */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-yellow-200/20 to-transparent pointer-events-none" />
      </div>

      {/* Focus Knob */}
      <div className="mt-12 flex flex-col items-center">
        <label className="font-mono text-xs font-bold mb-4 tracking-widest">LENS FOCUS</label>
        <div className="relative w-24 h-24 flex items-center justify-center">
          <input
            type="range" value={focus} onChange={(e) => setFocus(parseInt(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div
            className="w-full h-full rounded-full bg-zinc-800 border-4 border-zinc-600 flex items-center justify-center transition-transform"
            style={{ transform: `rotate(${focus * 3.6}deg)` }}
          >
            <div className="w-1 h-8 bg-white/20 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

// --- PNEUMATIC TUBE MESSENGER ---
export const PneumaticTube = () => {
  const [status, setStatus] = useState('ready');

  const handleSend = () => {
    setStatus('sending');
    setTimeout(() => setStatus('sent'), 1200);
    setTimeout(() => setStatus('ready'), 4000);
  };

  return (
    <div className="h-full bg-zinc-900 flex overflow-hidden">
      <div className="flex-1 p-12 flex flex-col justify-center">
        <div className="max-w-md bg-white p-8 border-l-8 border-orange-500 shadow-2xl">
          <h2 className="font-mono font-bold mb-4">MESSAGE_TO_ADMIN:</h2>
          <textarea
            className="w-full h-32 bg-stone-100 p-4 font-mono text-sm border-none focus:ring-0"
            placeholder="Enter request details..."
          />
        </div>
      </div>

      {/* The Tube */}
      <div className="w-48 bg-zinc-800 border-l-4 border-zinc-700 relative flex flex-col items-center">
        <div className="absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-white/5 to-transparent border-x border-white/10" />

        {/* The Capsule */}
        <div
          className={`absolute bottom-20 w-12 h-24 bg-zinc-200 rounded-full border-x-4 border-zinc-400 flex flex-col items-center justify-between p-2 transition-all duration-1000
            ${status === 'sending' ? 'bottom-[120%] blur-md scale-y-150' : ''}
            ${status === 'sent' ? 'opacity-0' : 'opacity-100'}
          `}
        >
          <div className="w-full h-2 bg-red-500 rounded-full" />
          <div className="font-black text-[10px] text-zinc-600 font-mono">CONFID</div>
          <div className="w-full h-2 bg-red-500 rounded-full" />
        </div>

        <button
          disabled={status !== 'ready'}
          onClick={handleSend}
          className="absolute bottom-4 bg-zinc-100 px-4 py-2 font-mono text-xs font-bold hover:bg-orange-500 hover:text-white transition-colors border-2 border-black shadow-[4px_4px_0_0_#000]"
        >
          {status === 'ready' ? 'ENGAGE VACUUM' : status === 'sending' ? 'WHOOSH!' : 'DELIVERED'}
        </button>
      </div>
    </div>
  );
};

// --- ELEVATOR FLOOR NAV ---
export const ElevatorNav = () => {
  const [floor, setFloor] = useState(1);
  const [isMoving, setIsMoving] = useState(false);
  const [doorsOpen, setDoorsOpen] = useState(true);

  const goToFloor = (f: number) => {
    if (f === floor) return;
    setDoorsOpen(false);
    setTimeout(() => {
      setIsMoving(true);
      setTimeout(() => {
        setFloor(f);
        setIsMoving(false);
        setTimeout(() => setDoorsOpen(true), 500);
      }, 1500);
    }, 600);
  };

  return (
    <div className="h-full flex bg-zinc-300 overflow-hidden">
      {/* Brass Sidebar Panel */}
      <div className="w-24 bg-gradient-to-b from-amber-600 to-amber-800 border-r-4 border-amber-900 flex flex-col items-center py-10 gap-4 shadow-2xl z-20">
        <div className="bg-black text-red-600 font-mono font-bold text-2xl px-2 py-1 mb-6 border-2 border-amber-900 shadow-inner">
          {floor}
        </div>
        {[3, 2, 1].map((f) => (
          <button
            key={f}
            onClick={() => goToFloor(f)}
            className={`w-12 h-12 rounded-full border-4 flex items-center justify-center font-black transition-all
              ${floor === f ? 'bg-amber-300 border-white shadow-[0_0_15px_white]' : 'bg-amber-700 border-amber-950 text-amber-950'}
            `}
          >
            {f}
          </button>
        ))}
      </div>

      {/* The Elevator Shaft / Content */}
      <div className="flex-1 relative bg-zinc-800">
        {/* Background Depth */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
           <div className={`transition-transform duration-[1500ms] ease-in-out ${isMoving ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}>
              <div className="text-white text-center p-20">
                 <h1 className="text-6xl font-black mb-4 uppercase">Floor {floor}</h1>
                 <p className="text-zinc-400 font-mono">Welcome to the {floor === 1 ? 'Lobby' : floor === 2 ? 'Laboratory' : 'Penthouse'}</p>
              </div>
           </div>
        </div>

        {/* Metal Doors */}
        <div className={`absolute inset-0 pointer-events-none flex transition-transform duration-500`}>
           <div className={`w-1/2 h-full bg-zinc-500 border-r border-zinc-600 shadow-2xl transition-transform duration-700 ease-in-out ${doorsOpen ? '-translate-x-full' : 'translate-x-0'}`}>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 w-1 h-20 bg-zinc-700 rounded-full"></div>
           </div>
           <div className={`w-1/2 h-full bg-zinc-500 border-l border-zinc-600 shadow-2xl transition-transform duration-700 ease-in-out ${doorsOpen ? 'translate-x-full' : 'translate-x-0'}`}>
              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-1 h-20 bg-zinc-700 rounded-full"></div>
           </div>
        </div>
      </div>
    </div>
  );
};

// --- INFINITE CANVAS DESK ---
export const InfiniteDesk = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPos({ x: pos.x + e.movementX, y: pos.y + e.movementY });
  };

  return (
    <div
      className="h-full bg-[#3d2b1f] cursor-grab active:cursor-grabbing overflow-hidden relative"
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onMouseMove={handleDrag}
    >
      <div
        className="absolute transition-transform duration-75 ease-out"
        style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
      >
        {/* Wood Texture Base */}
        <div className="w-[2000px] h-[2000px] opacity-10" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/wood-pattern.png")' }}></div>

        {/* Scattered Items */}
        <div className="absolute top-[400px] left-[600px] rotate-12">
           <div className="w-64 h-80 bg-white shadow-xl p-6 border border-gray-200">
              <h3 className="font-serif text-2xl font-bold mb-4">Lecture Notes</h3>
              <div className="space-y-2">
                 <div className="h-2 bg-gray-100 w-full"></div>
                 <div className="h-2 bg-gray-100 w-5/6"></div>
                 <div className="h-2 bg-gray-100 w-full"></div>
              </div>
           </div>
        </div>

        <div className="absolute top-[300px] left-[1000px] flex flex-col items-center">
           <div className="w-16 h-16 rounded-full border-8 border-white/20 shadow-inner"></div>
           <Coffee className="text-white/20 mt-[-40px]" size={32} />
           <p className="text-white/10 font-mono text-[10px] mt-2">COFFEE_STAIN_01</p>
        </div>

        <div className="absolute top-[700px] left-[500px]">
           <div className="p-4 bg-gray-800 rounded-xl shadow-2xl border-4 border-black">
              <div className="bg-green-900 p-2 rounded mb-2 text-[#33ff00] font-mono text-right text-xl">1985.00</div>
              <div className="grid grid-cols-4 gap-2">
                 {[...Array(12)].map((_, i) => <div key={i} className="w-6 h-6 bg-gray-700 rounded"></div>)}
              </div>
           </div>
           <Calculator className="absolute -top-10 left-0 text-white/20" />
        </div>

        <div className="absolute top-[800px] left-[1200px] hover:scale-110 transition-transform cursor-pointer">
           <div className="w-20 h-20 bg-white shadow-lg rounded-full flex items-center justify-center border-4 border-dashed border-gray-300">
              <Trash2 className="text-gray-300" />
           </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 bg-black/50 p-2 text-white font-mono text-xs rounded">
        DRAG TO PAN ACROSS THE DESK
      </div>
    </div>
  );
};

export const retroOfficeComponents = {
  'radio-dial-slider': RadioDialSlider,
  'keyboard-chatter-input': KeyboardChatterInput,
  'tremor-delete-button': TremorDeleteButton,
  'heartbeat-countdown': HeartbeatCountdown,
  'card-catalog': CardCatalog,
  'typewriter-text': TypewriterText,
  'filing-cabinet': FilingCabinet,
  // NarrativeDemos components
  'desk-lamp-focus': DeskLampFocus,
  'floppy-disk-save': FloppyDiskSave,
  // TextureDemos components
  'library-card-catalog': LibraryCardCatalog,
  // TactileDemos components
  'rolodex': Rolodex,
  'dymo-labeler': DymoLabeler,
  'overhead-projector': OverheadProjector,
  'pneumatic-tube': PneumaticTube,
  // ArchitecturalDemos components
  'elevator-nav': ElevatorNav,
  'infinite-desk': InfiniteDesk,
};
