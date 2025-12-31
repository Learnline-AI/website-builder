import { useState } from 'react';
import { X, AlertTriangle, Check } from '../shared/icons';

// --- CONCRETE BUTTON ---
export const ConcreteButton = () => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <div className="h-full bg-neutral-200 flex items-center justify-center p-6">
      <button
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        className="relative px-8 py-4 text-black font-bold uppercase tracking-widest text-sm transition-transform"
        style={{
          background: '#e5e5e5',
          border: '3px solid #000',
          boxShadow: isPressed
            ? 'inset 4px 4px 0 #000'
            : '4px 4px 0 #000',
          transform: isPressed ? 'translate(4px, 4px)' : 'translate(0, 0)',
        }}
      >
        Execute
      </button>
    </div>
  );
};

// --- RAW CARD ---
export const RawCard = () => {
  return (
    <div className="h-full bg-neutral-200 flex items-center justify-center p-6">
      <div
        className="w-72 p-0 overflow-hidden"
        style={{
          border: '4px solid #000',
          background: '#fff',
        }}
      >
        {/* Header */}
        <div className="p-4 border-b-4 border-black bg-black text-white">
          <span className="font-bold uppercase tracking-widest text-sm">Information Block</span>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-black text-sm leading-relaxed mb-4">
            Raw. Unfiltered. Unapologetic. This is design stripped to its bare essentials.
          </p>
          <div className="text-xs text-neutral-500 uppercase tracking-wider">
            ID: BRU-001 | STATUS: ACTIVE
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t-4 border-black flex justify-between items-center">
          <span className="text-xs font-mono">2024.12.31</span>
          <span className="font-bold text-black">&rarr;</span>
        </div>
      </div>
    </div>
  );
};

// --- MONO BADGE ---
export const MonoBadge = () => {
  return (
    <div className="h-full bg-neutral-200 flex items-center justify-center gap-4 p-4 flex-wrap">
      <span
        className="px-4 py-2 font-bold uppercase tracking-widest text-xs"
        style={{
          background: '#000',
          color: '#fff',
        }}
      >
        Primary
      </span>

      <span
        className="px-4 py-2 font-bold uppercase tracking-widest text-xs"
        style={{
          background: '#fff',
          color: '#000',
          border: '2px solid #000',
        }}
      >
        Secondary
      </span>

      <span
        className="px-4 py-2 font-bold uppercase tracking-widest text-xs"
        style={{
          background: '#737373',
          color: '#fff',
        }}
      >
        Neutral
      </span>
    </div>
  );
};

// --- BRUTALIST INPUT ---
export const BrutalistInput = () => {
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);

  return (
    <div className="h-full bg-neutral-200 flex items-center justify-center p-6">
      <div className="w-72">
        <label className="block text-xs uppercase tracking-widest font-bold mb-2 text-black">
          Input Field
        </label>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="TYPE HERE"
          className="w-full px-4 py-3 bg-white text-black placeholder-neutral-400 outline-none font-mono text-sm uppercase"
          style={{
            border: `4px solid ${focused ? '#000' : '#a3a3a3'}`,
          }}
        />
        <div className="mt-2 text-xs text-neutral-500 font-mono">
          {value.length}/100 characters
        </div>
      </div>
    </div>
  );
};

// --- BLOCK PROGRESS ---
export const BlockProgress = () => {
  const [progress, setProgress] = useState(65);
  const blocks = 10;
  const filledBlocks = Math.round((progress / 100) * blocks);

  return (
    <div className="h-full bg-neutral-200 flex flex-col items-center justify-center p-6 gap-4">
      <div className="flex gap-1">
        {[...Array(blocks)].map((_, i) => (
          <div
            key={i}
            className="w-6 h-8 transition-colors duration-150"
            style={{
              background: i < filledBlocks ? '#000' : '#d4d4d4',
              border: '2px solid #000',
            }}
          />
        ))}
      </div>
      <div className="text-center">
        <span className="font-mono text-2xl font-bold text-black">{progress}%</span>
        <div className="text-xs uppercase tracking-widest text-neutral-500 mt-1">Complete</div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setProgress(Math.max(0, progress - 10))}
          className="px-3 py-1 bg-black text-white text-xs font-bold"
        >
          -10
        </button>
        <button
          onClick={() => setProgress(Math.min(100, progress + 10))}
          className="px-3 py-1 bg-black text-white text-xs font-bold"
        >
          +10
        </button>
      </div>
    </div>
  );
};

// --- STARK ALERT ---
export const StarkAlert = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return (
      <div className="h-full bg-neutral-200 flex items-center justify-center p-6">
        <button
          onClick={() => setIsVisible(true)}
          className="px-4 py-2 bg-black text-white text-xs font-bold uppercase"
        >
          Show Alert
        </button>
      </div>
    );
  }

  return (
    <div className="h-full bg-neutral-200 flex items-center justify-center p-6">
      <div
        className="w-80 relative"
        style={{
          border: '4px solid #000',
          background: '#fff',
        }}
      >
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center hover:bg-neutral-100"
        >
          <X size={16} className="text-black" />
        </button>

        <div className="p-4 border-b-4 border-black bg-black text-white flex items-center gap-2">
          <AlertTriangle size={16} />
          <span className="font-bold uppercase tracking-widest text-xs">Warning</span>
        </div>

        <div className="p-4">
          <p className="text-black text-sm mb-4">
            System integrity compromised. Immediate action required.
          </p>
          <div className="flex gap-2">
            <button className="flex-1 py-2 bg-black text-white text-xs font-bold uppercase">
              Acknowledge
            </button>
            <button className="flex-1 py-2 border-2 border-black text-black text-xs font-bold uppercase">
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- GRID LAYOUT ---
export const GridLayout = () => {
  return (
    <div className="h-full bg-neutral-200 flex items-center justify-center p-4">
      <div className="grid grid-cols-3 gap-1 w-full max-w-sm">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <div
            key={num}
            className="aspect-square flex items-center justify-center font-mono font-bold text-2xl cursor-pointer transition-colors hover:bg-black hover:text-white"
            style={{
              background: '#fff',
              border: '2px solid #000',
            }}
          >
            {num.toString().padStart(2, '0')}
          </div>
        ))}
      </div>
    </div>
  );
};

// --- MONOLITH HEADER ---
export const MonolithHeader = () => {
  return (
    <div className="h-full bg-neutral-200 flex items-start justify-center p-4">
      <header className="w-full max-w-lg bg-black text-white">
        <div className="p-4 border-b border-neutral-700 flex justify-between items-center">
          <span className="font-bold uppercase tracking-widest text-sm">Bunker.sys</span>
          <div className="flex gap-4">
            {['Home', 'About', 'Work'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs uppercase tracking-wider text-neutral-400 hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
        <div className="p-8">
          <h1 className="text-4xl font-bold uppercase tracking-tight leading-none">
            Brutalist<br />Design<br />System
          </h1>
        </div>
      </header>
    </div>
  );
};

// --- TERMINAL TOGGLE ---
export const TerminalToggle = () => {
  const [isOn, setIsOn] = useState(false);

  return (
    <div className="h-full bg-neutral-200 flex items-center justify-center p-6 gap-6">
      <button
        onClick={() => setIsOn(!isOn)}
        className="relative w-20 h-10 transition-colors"
        style={{
          background: isOn ? '#000' : '#d4d4d4',
          border: '3px solid #000',
        }}
      >
        <div
          className="absolute top-0.5 w-8 h-7 transition-all duration-200"
          style={{
            background: isOn ? '#fff' : '#737373',
            left: isOn ? 'calc(100% - 34px)' : '2px',
          }}
        />
      </button>

      <div className="text-center">
        <div className="font-mono text-2xl font-bold text-black">
          {isOn ? 'ON' : 'OFF'}
        </div>
        <div className="text-xs uppercase tracking-widest text-neutral-500">Status</div>
      </div>
    </div>
  );
};

// --- FRAMEWORK LIST ---
export const FrameworkList = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const items = ['React', 'Vue', 'Angular', 'Svelte', 'Solid'];

  return (
    <div className="h-full bg-neutral-200 flex items-center justify-center p-6">
      <div className="w-64" style={{ border: '3px solid #000' }}>
        {items.map((item, index) => (
          <button
            key={item}
            onClick={() => setSelectedIndex(index)}
            className="w-full px-4 py-3 flex items-center justify-between transition-colors"
            style={{
              background: selectedIndex === index ? '#000' : '#fff',
              color: selectedIndex === index ? '#fff' : '#000',
              borderBottom: index < items.length - 1 ? '2px solid #000' : 'none',
            }}
          >
            <span className="font-bold uppercase tracking-wider text-sm">{item}</span>
            {selectedIndex === index && <Check size={16} />}
          </button>
        ))}
      </div>
    </div>
  );
};

// --- BLOCK COUNTER ---
export const BlockCounter = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="h-full bg-neutral-200 flex flex-col items-center justify-center p-6 gap-4">
      <div
        className="w-32 h-32 flex items-center justify-center"
        style={{
          background: '#fff',
          border: '4px solid #000',
        }}
      >
        <span className="font-mono text-5xl font-bold text-black">
          {count.toString().padStart(2, '0')}
        </span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setCount(Math.max(0, count - 1))}
          className="w-12 h-12 bg-black text-white text-2xl font-bold hover:bg-neutral-700"
        >
          -
        </button>
        <button
          onClick={() => setCount(count + 1)}
          className="w-12 h-12 bg-black text-white text-2xl font-bold hover:bg-neutral-700"
        >
          +
        </button>
      </div>

      <button
        onClick={() => setCount(0)}
        className="text-xs uppercase tracking-widest text-neutral-500 hover:text-black"
      >
        Reset
      </button>
    </div>
  );
};

// --- SLAB TABS ---
export const SlabTabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ['Overview', 'Details', 'Settings'];

  return (
    <div className="h-full bg-neutral-200 flex items-center justify-center p-6">
      <div className="w-80">
        {/* Tab buttons */}
        <div className="flex">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              onClick={() => setActiveTab(index)}
              className="flex-1 px-4 py-3 font-bold uppercase tracking-wider text-xs transition-colors"
              style={{
                background: activeTab === index ? '#000' : '#fff',
                color: activeTab === index ? '#fff' : '#000',
                borderTop: '3px solid #000',
                borderLeft: index === 0 ? '3px solid #000' : 'none',
                borderRight: '3px solid #000',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div
          className="p-6"
          style={{
            background: '#fff',
            border: '3px solid #000',
            borderTop: 'none',
          }}
        >
          <h3 className="font-bold uppercase tracking-wider text-sm mb-2">
            {tabs[activeTab]}
          </h3>
          <p className="text-sm text-neutral-600">
            Content panel for {tabs[activeTab].toLowerCase()} section. Raw structure, no decoration.
          </p>
        </div>
      </div>
    </div>
  );
};

// --- BLUEPRINT BACKGROUND ---
export const BlueprintBackground = () => {
  return (
    <div
      className="h-full relative overflow-hidden"
      style={{
        background: '#e5e5e5',
      }}
    >
      {/* Grid pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(#a3a3a3 1px, transparent 1px),
            linear-gradient(90deg, #a3a3a3 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }}
      />

      {/* Content */}
      <div className="relative h-full flex items-center justify-center">
        <div className="text-center">
          <div className="font-mono text-6xl font-bold text-black mb-4">GRID</div>
          <div className="text-xs uppercase tracking-[0.5em] text-neutral-500">
            Structural Foundation
          </div>
        </div>
      </div>
    </div>
  );
};

// --- RAW FORM ---
export const RawForm = () => {
  return (
    <div className="h-full bg-neutral-200 flex items-center justify-center p-6">
      <form className="w-72 space-y-4">
        <div>
          <label className="block text-xs uppercase tracking-widest font-bold mb-1 text-black">
            Name
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 bg-white text-black font-mono text-sm border-3 border-black outline-none focus:bg-neutral-50"
            style={{ border: '3px solid #000' }}
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest font-bold mb-1 text-black">
            Email
          </label>
          <input
            type="email"
            className="w-full px-3 py-2 bg-white text-black font-mono text-sm outline-none focus:bg-neutral-50"
            style={{ border: '3px solid #000' }}
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest font-bold mb-1 text-black">
            Message
          </label>
          <textarea
            rows={3}
            className="w-full px-3 py-2 bg-white text-black font-mono text-sm outline-none focus:bg-neutral-50 resize-none"
            style={{ border: '3px solid #000' }}
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-black text-white font-bold uppercase tracking-widest text-sm hover:bg-neutral-800"
        >
          Submit &rarr;
        </button>
      </form>
    </div>
  );
};

// --- STARK MODAL ---
export const StarkModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-full bg-neutral-200 flex items-center justify-center p-6">
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 bg-black text-white font-bold uppercase tracking-widest text-sm"
      >
        Open Modal
      </button>

      {isOpen && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4">
          <div
            className="w-full max-w-sm relative"
            style={{
              background: '#fff',
              border: '4px solid #000',
            }}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center hover:bg-neutral-100"
            >
              <X size={18} className="text-black" />
            </button>

            <div className="p-4 border-b-4 border-black">
              <h2 className="font-bold uppercase tracking-widest text-sm">Confirmation</h2>
            </div>

            <div className="p-6">
              <p className="text-sm text-neutral-600 mb-6">
                This action cannot be undone. Proceed with caution.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex-1 py-2 border-3 border-black text-black font-bold uppercase text-xs"
                  style={{ border: '3px solid #000' }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex-1 py-2 bg-black text-white font-bold uppercase text-xs"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- SIGNAL INDICATOR ---
export const SignalIndicator = () => {
  const [signal, setSignal] = useState(3);

  return (
    <div className="h-full bg-neutral-200 flex flex-col items-center justify-center p-6 gap-4">
      <div className="flex items-end gap-1 h-16">
        {[1, 2, 3, 4, 5].map((level) => (
          <div
            key={level}
            className="w-4 transition-colors"
            style={{
              height: `${level * 12}px`,
              background: level <= signal ? '#000' : '#d4d4d4',
              border: '2px solid #000',
            }}
          />
        ))}
      </div>

      <div className="text-center">
        <div className="font-mono text-lg font-bold text-black">
          {signal === 0 ? 'NO SIGNAL' : `LEVEL ${signal}`}
        </div>
        <div className="text-xs uppercase tracking-widest text-neutral-500 mt-1">
          Signal Strength
        </div>
      </div>

      <input
        type="range"
        min={0}
        max={5}
        value={signal}
        onChange={(e) => setSignal(parseInt(e.target.value))}
        className="w-32"
      />
    </div>
  );
};

// --- BLOCK QUOTE ---
export const BlockQuote = () => {
  return (
    <div className="h-full bg-neutral-200 flex items-center justify-center p-6">
      <blockquote
        className="relative w-80 p-6"
        style={{
          background: '#fff',
          borderLeft: '8px solid #000',
        }}
      >
        <p className="text-lg font-bold text-black leading-snug mb-4">
          "Less is more. Except when it comes to brutalism. Then less is just less."
        </p>
        <footer className="text-xs uppercase tracking-widest text-neutral-500">
          — Anonymous Architect
        </footer>
      </blockquote>
    </div>
  );
};

// Export all components
export const brutalistBunkerComponents = {
  'concrete-button': ConcreteButton,
  'raw-card': RawCard,
  'mono-badge': MonoBadge,
  'brutalist-input': BrutalistInput,
  'block-progress': BlockProgress,
  'stark-alert': StarkAlert,
  'grid-layout': GridLayout,
  'monolith-header': MonolithHeader,
  'terminal-toggle': TerminalToggle,
  'framework-list': FrameworkList,
  'block-counter': BlockCounter,
  'slab-tabs': SlabTabs,
  'blueprint-background': BlueprintBackground,
  'raw-form': RawForm,
  'stark-modal': StarkModal,
  'signal-indicator': SignalIndicator,
  'block-quote': BlockQuote,
};
