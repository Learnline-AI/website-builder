import React, { useState, useEffect } from 'react';

// ============ BEN-DAY DOTS ZONE ============
// Pop art aesthetic with halftone patterns, bold primaries, and comic book styling

// Halftone dot pattern CSS
const halftonePattern = (color: string, size: number = 4, spacing: number = 8) => ({
  backgroundImage: `radial-gradient(${color} ${size}px, transparent ${size}px)`,
  backgroundSize: `${spacing}px ${spacing}px`,
});

// 1. Pop Button
const PopButton: React.FC = () => {
  const [clicked, setClicked] = useState(false);

  return (
    <div className="h-full flex items-center justify-center" style={{ background: '#fff740' }}>
      <button
        onClick={() => setClicked(!clicked)}
        className="relative px-8 py-4 font-black text-xl uppercase tracking-wider transition-all duration-150"
        style={{
          background: clicked ? '#ff3b3b' : '#fff',
          color: '#000',
          border: '4px solid #000',
          boxShadow: clicked ? '2px 2px 0 #000' : '6px 6px 0 #000',
          transform: clicked ? 'translate(4px, 4px)' : 'translate(0, 0)',
          fontFamily: 'Impact, sans-serif',
        }}
      >
        <span className="relative z-10">POW!</span>
        <div
          className="absolute inset-0 opacity-30"
          style={halftonePattern('#ff3b3b', 3, 6)}
        />
      </button>
    </div>
  );
};

// 2. Speech Bubble Card
const SpeechBubbleCard: React.FC = () => {
  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#00bfff' }}>
      <div className="relative">
        <div
          className="relative px-8 py-6 rounded-3xl"
          style={{
            background: '#fff',
            border: '4px solid #000',
            maxWidth: '280px',
          }}
        >
          <p
            className="text-lg font-bold text-center"
            style={{ fontFamily: 'Comic Sans MS, cursive', color: '#000' }}
          >
            WOW! This card looks just like a comic book!
          </p>
          <div
            className="absolute -bottom-6 left-8 w-0 h-0"
            style={{
              borderLeft: '20px solid transparent',
              borderRight: '20px solid transparent',
              borderTop: '24px solid #000',
            }}
          />
          <div
            className="absolute -bottom-4 left-9 w-0 h-0"
            style={{
              borderLeft: '18px solid transparent',
              borderRight: '18px solid transparent',
              borderTop: '20px solid #fff',
            }}
          />
        </div>
      </div>
    </div>
  );
};

// 3. Halftone Input
const HalftoneInput: React.FC = () => {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#ff69b4' }}>
      <div className="relative w-full max-w-xs">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="TYPE HERE..."
          className="w-full px-4 py-3 text-lg font-bold uppercase outline-none"
          style={{
            background: '#fff',
            border: '4px solid #000',
            boxShadow: focused ? '4px 4px 0 #000' : '6px 6px 0 #000',
            transform: focused ? 'translate(2px, 2px)' : 'translate(0, 0)',
            fontFamily: 'Impact, sans-serif',
            transition: 'all 0.1s ease',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={halftonePattern('#ff3b3b', 2, 5)}
        />
      </div>
    </div>
  );
};

// 4. Action Toggle
const ActionToggle: React.FC = () => {
  const [isOn, setIsOn] = useState(false);

  return (
    <div className="h-full flex items-center justify-center" style={{ background: '#fff' }}>
      <button
        onClick={() => setIsOn(!isOn)}
        className="relative w-24 h-12 transition-all duration-200"
        style={{
          background: isOn ? '#ff3b3b' : '#ddd',
          border: '4px solid #000',
          borderRadius: '4px',
        }}
      >
        <div
          className="absolute top-1 w-8 h-8 transition-all duration-200"
          style={{
            left: isOn ? '52px' : '4px',
            background: '#fff740',
            border: '3px solid #000',
            borderRadius: '2px',
          }}
        />
        <span
          className="absolute -top-8 left-1/2 -translate-x-1/2 font-black text-sm uppercase"
          style={{ fontFamily: 'Impact, sans-serif' }}
        >
          {isOn ? 'ZAP!' : 'OFF'}
        </span>
      </button>
    </div>
  );
};

// 5. Comic Progress Bar
const ComicProgress: React.FC = () => {
  const [progress, setProgress] = useState(65);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + 5));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex flex-col items-center justify-center gap-4 p-6" style={{ background: '#fff' }}>
      <div
        className="relative w-full max-w-xs h-8 overflow-hidden"
        style={{
          background: '#fff',
          border: '4px solid #000',
        }}
      >
        <div
          className="h-full transition-all duration-300 relative"
          style={{
            width: `${progress}%`,
            background: '#ff3b3b',
          }}
        >
          <div
            className="absolute inset-0"
            style={halftonePattern('#000', 2, 6)}
          />
        </div>
      </div>
      <span
        className="font-black text-2xl"
        style={{ fontFamily: 'Impact, sans-serif', color: '#000' }}
      >
        {progress}% KAPOW!
      </span>
    </div>
  );
};

// 6. Starburst Badge
const StarburstBadge: React.FC = () => {
  return (
    <div className="h-full flex items-center justify-center gap-4 p-4" style={{ background: '#00bfff' }}>
      {['NEW!', 'WOW!', 'HOT!'].map((text, i) => (
        <div
          key={i}
          className="relative flex items-center justify-center"
          style={{
            width: '80px',
            height: '80px',
          }}
        >
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
            <polygon
              points="50,0 61,35 97,35 68,57 79,91 50,70 21,91 32,57 3,35 39,35"
              fill={['#ff3b3b', '#fff740', '#ff69b4'][i]}
              stroke="#000"
              strokeWidth="3"
            />
          </svg>
          <span
            className="relative z-10 font-black text-sm"
            style={{ fontFamily: 'Impact, sans-serif', color: '#000' }}
          >
            {text}
          </span>
        </div>
      ))}
    </div>
  );
};

// 7. Thought Bubble Loader
const ThoughtBubbleLoader: React.FC = () => {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((d) => (d + 1) % 4);
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex items-center justify-center" style={{ background: '#fff740' }}>
      <div className="relative">
        {/* Main bubble */}
        <div
          className="px-6 py-4 rounded-full relative"
          style={{
            background: '#fff',
            border: '4px solid #000',
          }}
        >
          <span className="font-black text-lg" style={{ fontFamily: 'Impact, sans-serif' }}>
            THINKING{'.'.repeat(dots)}
          </span>
        </div>
        {/* Trailing circles */}
        <div
          className="absolute -bottom-4 left-4 w-5 h-5 rounded-full"
          style={{ background: '#fff', border: '3px solid #000' }}
        />
        <div
          className="absolute -bottom-7 left-1 w-3 h-3 rounded-full"
          style={{ background: '#fff', border: '2px solid #000' }}
        />
      </div>
    </div>
  );
};

// 8. Comic Panel Divider
const ComicPanelDivider: React.FC = () => {
  return (
    <div className="h-full flex items-center justify-center p-4" style={{ background: '#fff' }}>
      <div className="flex items-center gap-2 w-full max-w-md">
        <div className="h-2 flex-1" style={{ background: '#000' }} />
        <div className="relative">
          <div
            className="px-4 py-2 -rotate-3"
            style={{
              background: '#fff740',
              border: '3px solid #000',
            }}
          >
            <span className="font-black text-sm" style={{ fontFamily: 'Impact, sans-serif' }}>
              MEANWHILE...
            </span>
          </div>
        </div>
        <div className="h-2 flex-1" style={{ background: '#000' }} />
      </div>
    </div>
  );
};

// 9. Onomatopoeia Header
const OnomatopoeiaHeader: React.FC = () => {
  return (
    <div className="h-full flex items-center justify-center p-4" style={{ background: '#ff3b3b' }}>
      <div className="relative">
        <h1
          className="text-5xl font-black uppercase tracking-wider"
          style={{
            fontFamily: 'Impact, sans-serif',
            color: '#fff740',
            WebkitTextStroke: '3px #000',
            textShadow: '6px 6px 0 #000',
            transform: 'rotate(-5deg) skewX(-5deg)',
          }}
        >
          WHAM!
        </h1>
        <div
          className="absolute -inset-4 -z-10 opacity-40"
          style={halftonePattern('#000', 4, 10)}
        />
      </div>
    </div>
  );
};

// 10. Action Lines Notification
const ActionLinesNotification: React.FC = () => {
  const [visible, setVisible] = useState(true);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#fff' }}>
      {visible ? (
        <div className="relative">
          {/* Action lines */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-16 h-1 origin-right"
              style={{
                background: '#ff3b3b',
                right: '100%',
                top: '50%',
                transform: `translateY(-50%) rotate(${(i - 3.5) * 12}deg)`,
                marginRight: '8px',
              }}
            />
          ))}
          <div
            className="relative px-6 py-4"
            style={{
              background: '#fff740',
              border: '4px solid #000',
              boxShadow: '4px 4px 0 #000',
            }}
          >
            <p className="font-black uppercase" style={{ fontFamily: 'Impact, sans-serif' }}>
              ALERT! Something happened!
            </p>
            <button
              onClick={() => setVisible(false)}
              className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center font-bold text-sm"
              style={{
                background: '#ff3b3b',
                border: '2px solid #000',
                color: '#fff',
              }}
            >
              X
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setVisible(true)}
          className="px-4 py-2 font-black uppercase"
          style={{
            background: '#00bfff',
            border: '3px solid #000',
            fontFamily: 'Impact, sans-serif',
          }}
        >
          SHOW ALERT
        </button>
      )}
    </div>
  );
};

// 11. Halftone Avatar
const HalftoneAvatar: React.FC = () => {
  return (
    <div className="h-full flex items-center justify-center gap-4" style={{ background: '#ff69b4' }}>
      {['#ff3b3b', '#fff740', '#00bfff'].map((color, i) => (
        <div
          key={i}
          className="relative w-16 h-16 rounded-full overflow-hidden"
          style={{
            border: '4px solid #000',
            background: '#fff',
          }}
        >
          <div className="absolute inset-0" style={halftonePattern(color, 3, 7)} />
          <div
            className="absolute inset-0 flex items-center justify-center font-black text-2xl"
            style={{ fontFamily: 'Impact, sans-serif', color: '#000' }}
          >
            {['A', 'B', 'C'][i]}
          </div>
        </div>
      ))}
    </div>
  );
};

// 12. Panel Grid Nav
const PanelGridNav: React.FC = () => {
  const [active, setActive] = useState(0);
  const items = ['HOME', 'ABOUT', 'WORK', 'CONTACT'];

  return (
    <div className="h-full flex items-center justify-center p-4" style={{ background: '#fff' }}>
      <div className="grid grid-cols-2 gap-1" style={{ border: '4px solid #000' }}>
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="relative px-6 py-4 font-black uppercase transition-colors"
            style={{
              background: active === i ? '#ff3b3b' : '#fff',
              color: active === i ? '#fff' : '#000',
              fontFamily: 'Impact, sans-serif',
              borderRight: i % 2 === 0 ? '2px solid #000' : 'none',
              borderBottom: i < 2 ? '2px solid #000' : 'none',
            }}
          >
            {item}
            {active === i && (
              <div className="absolute inset-0 opacity-30" style={halftonePattern('#000', 2, 5)} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

// 13. Explosion Modal
const ExplosionModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-full flex items-center justify-center" style={{ background: '#00bfff' }}>
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 font-black uppercase"
        style={{
          background: '#fff740',
          border: '4px solid #000',
          boxShadow: '4px 4px 0 #000',
          fontFamily: 'Impact, sans-serif',
        }}
      >
        OPEN MODAL
      </button>

      {isOpen && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="relative animate-pulse">
            {/* Explosion shape */}
            <svg viewBox="0 0 200 200" className="w-64 h-64">
              <polygon
                points="100,10 120,70 180,70 130,100 150,160 100,125 50,160 70,100 20,70 80,70"
                fill="#fff740"
                stroke="#000"
                strokeWidth="4"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-black text-xl" style={{ fontFamily: 'Impact, sans-serif' }}>
                BOOM!
              </span>
              <p className="text-sm font-bold mt-1" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                Modal content here
              </p>
              <button
                onClick={() => setIsOpen(false)}
                className="mt-2 px-3 py-1 font-bold text-sm"
                style={{
                  background: '#ff3b3b',
                  border: '2px solid #000',
                  color: '#fff',
                }}
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// 14. Dot Pattern Slider
const DotPatternSlider: React.FC = () => {
  const [value, setValue] = useState(50);

  return (
    <div className="h-full flex flex-col items-center justify-center gap-4 p-6" style={{ background: '#fff' }}>
      <div className="relative w-full max-w-xs">
        <div
          className="w-full h-6 relative"
          style={{
            background: '#ddd',
            border: '3px solid #000',
          }}
        >
          <div
            className="absolute top-0 left-0 h-full"
            style={{
              width: `${value}%`,
              background: '#ff3b3b',
            }}
          >
            <div className="absolute inset-0" style={halftonePattern('#000', 2, 5)} />
          </div>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer"
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-8 h-10 -translate-x-1/2 pointer-events-none"
          style={{
            left: `${value}%`,
            background: '#fff740',
            border: '3px solid #000',
          }}
        />
      </div>
      <span className="font-black text-xl" style={{ fontFamily: 'Impact, sans-serif' }}>
        {value}%
      </span>
    </div>
  );
};

// 15. Comic Strip Tabs
const ComicStripTabs: React.FC = () => {
  const [active, setActive] = useState(0);
  const tabs = ['PANEL 1', 'PANEL 2', 'PANEL 3'];

  return (
    <div className="h-full flex flex-col items-center justify-center p-4" style={{ background: '#fff740' }}>
      <div className="flex gap-0">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="px-5 py-3 font-black uppercase transition-all"
            style={{
              background: active === i ? '#ff3b3b' : '#fff',
              color: active === i ? '#fff' : '#000',
              border: '3px solid #000',
              borderRight: i < tabs.length - 1 ? 'none' : '3px solid #000',
              fontFamily: 'Impact, sans-serif',
              transform: active === i ? 'translateY(-4px)' : 'translateY(0)',
              zIndex: active === i ? 10 : 1,
            }}
          >
            {tab}
          </button>
        ))}
      </div>
      <div
        className="w-full max-w-sm h-32 mt-0 flex items-center justify-center"
        style={{
          background: '#fff',
          border: '3px solid #000',
          borderTop: 'none',
        }}
      >
        <span className="font-bold" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
          Content for {tabs[active]}
        </span>
      </div>
    </div>
  );
};

// 16. Pop Art Color Picker
const PopArtColorPicker: React.FC = () => {
  const [selected, setSelected] = useState('#ff3b3b');
  const colors = ['#ff3b3b', '#fff740', '#00bfff', '#ff69b4', '#000'];

  return (
    <div className="h-full flex flex-col items-center justify-center gap-4 p-4" style={{ background: '#fff' }}>
      <div className="flex gap-2">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => setSelected(color)}
            className="relative w-12 h-12 transition-transform"
            style={{
              background: color,
              border: '4px solid #000',
              transform: selected === color ? 'scale(1.2) rotate(-5deg)' : 'scale(1)',
              boxShadow: selected === color ? '4px 4px 0 #000' : 'none',
            }}
          >
            {selected === color && (
              <span className="absolute inset-0 flex items-center justify-center text-white font-black text-xl" style={{ WebkitTextStroke: '1px #000' }}>
                ✓
              </span>
            )}
          </button>
        ))}
      </div>
      <div
        className="w-32 h-16 flex items-center justify-center"
        style={{
          background: selected,
          border: '4px solid #000',
        }}
      >
        <span className="font-black text-sm uppercase" style={{ fontFamily: 'Impact, sans-serif', color: selected === '#000' ? '#fff' : '#000' }}>
          {selected}
        </span>
      </div>
    </div>
  );
};

// 17. Retro Counter Form
const RetroCounterForm: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="h-full flex flex-col items-center justify-center gap-4 p-6" style={{ background: '#00bfff' }}>
      <div
        className="flex items-center gap-0"
        style={{ border: '4px solid #000' }}
      >
        <button
          onClick={() => setCount((c) => Math.max(0, c - 1))}
          className="w-12 h-16 font-black text-3xl"
          style={{
            background: '#ff3b3b',
            color: '#fff',
            fontFamily: 'Impact, sans-serif',
            borderRight: '3px solid #000',
          }}
        >
          -
        </button>
        <div
          className="w-20 h-16 flex items-center justify-center font-black text-3xl relative"
          style={{
            background: '#fff',
            fontFamily: 'Impact, sans-serif',
          }}
        >
          {count}
          <div className="absolute inset-0 opacity-20" style={halftonePattern('#000', 2, 6)} />
        </div>
        <button
          onClick={() => setCount((c) => c + 1)}
          className="w-12 h-16 font-black text-3xl"
          style={{
            background: '#fff740',
            color: '#000',
            fontFamily: 'Impact, sans-serif',
            borderLeft: '3px solid #000',
          }}
        >
          +
        </button>
      </div>
      <span className="font-black uppercase text-lg" style={{ fontFamily: 'Impact, sans-serif', color: '#000' }}>
        {count === 0 ? 'ZERO!' : count > 10 ? 'WOW!' : 'COUNT'}
      </span>
    </div>
  );
};

// Export all components
export const bendayDotsComponents: Record<string, React.FC> = {
  'benday-pop-button': PopButton,
  'benday-speech-bubble-card': SpeechBubbleCard,
  'benday-halftone-input': HalftoneInput,
  'benday-action-toggle': ActionToggle,
  'benday-comic-progress': ComicProgress,
  'benday-starburst-badge': StarburstBadge,
  'benday-thought-bubble-loader': ThoughtBubbleLoader,
  'benday-comic-panel-divider': ComicPanelDivider,
  'benday-onomatopoeia-header': OnomatopoeiaHeader,
  'benday-action-lines-notification': ActionLinesNotification,
  'benday-halftone-avatar': HalftoneAvatar,
  'benday-panel-grid-nav': PanelGridNav,
  'benday-explosion-modal': ExplosionModal,
  'benday-dot-pattern-slider': DotPatternSlider,
  'benday-comic-strip-tabs': ComicStripTabs,
  'benday-pop-art-color-picker': PopArtColorPicker,
  'benday-retro-counter-form': RetroCounterForm,
};
