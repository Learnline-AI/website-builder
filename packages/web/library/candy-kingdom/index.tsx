import React, { useState } from 'react';

// --- GUMDROP BUTTON ---
export const GumdropButton = () => {
  const [pressed, setPressed] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#fff5f8' }}>
      <button
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        onMouseLeave={() => setPressed(false)}
        className="relative px-8 py-3 transition-all duration-200"
        style={{
          background: pressed
            ? 'linear-gradient(180deg, #ec4899 0%, #db2777 100%)'
            : 'linear-gradient(180deg, #f472b6 0%, #ec4899 100%)',
          borderRadius: '9999px',
          boxShadow: pressed
            ? 'inset 0 2px 4px rgba(0,0,0,0.2)'
            : '0 4px 0 #be185d, 0 6px 12px rgba(236,72,153,0.3)',
          transform: pressed ? 'translateY(2px)' : 'translateY(0)',
        }}
      >
        {/* Sugar sparkles */}
        <div className="absolute inset-0 overflow-hidden rounded-full">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white"
              style={{
                left: `${20 + i * 15}%`,
                top: `${20 + (i % 2) * 10}%`,
                opacity: 0.6,
              }}
            />
          ))}
        </div>
        <span className="relative text-white font-bold">Yummy!</span>
      </button>
    </div>
  );
};

// --- LOLLIPOP CARD ---
export const LollipopCard = () => {
  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#fff5f8' }}>
      <div
        className="relative w-56 h-36 p-4 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)',
          borderRadius: '24px',
          border: '3px solid #f9a8d4',
        }}
      >
        {/* Swirl pattern */}
        <div className="absolute -right-8 -top-8 w-32 h-32 opacity-30">
          <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#ec4899" strokeWidth="8" />
            <circle cx="50" cy="50" r="35" fill="none" stroke="#f472b6" strokeWidth="8" />
            <circle cx="50" cy="50" r="25" fill="none" stroke="#f9a8d4" strokeWidth="8" />
          </svg>
        </div>

        <h3 className="text-pink-600 font-bold text-lg">Sweet Deal!</h3>
        <p className="text-pink-400 text-sm mt-2">50% off all candies</p>

        {/* Sprinkles decoration */}
        <div className="absolute bottom-3 left-3 flex gap-1">
          {['#ec4899', '#8b5cf6', '#06b6d4', '#84cc16', '#f59e0b'].map((color, i) => (
            <div
              key={i}
              className="w-1.5 h-4 rounded-full"
              style={{
                background: color,
                transform: `rotate(${-20 + i * 10}deg)`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// --- COTTON CANDY INPUT ---
export const CottonCandyInput = () => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#fff5f8' }}>
      <div className="relative w-64">
        <input
          type="text"
          placeholder="Type something sweet..."
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full px-5 py-3 rounded-full text-pink-600 placeholder-pink-300 outline-none transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, #fce7f3 0%, #ddd6fe 100%)',
            border: focused ? '3px solid #c084fc' : '3px solid #f9a8d4',
            boxShadow: focused ? '0 0 20px #c084fc40' : 'none',
          }}
        />

        {/* Fluffy cloud effect */}
        {focused && (
          <div className="absolute -inset-2 -z-10 opacity-50">
            <div className="absolute top-0 left-4 w-8 h-8 rounded-full bg-pink-200 animate-pulse" />
            <div className="absolute top-1 right-8 w-6 h-6 rounded-full bg-purple-200 animate-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="absolute bottom-0 left-8 w-5 h-5 rounded-full bg-blue-200 animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
        )}
      </div>
    </div>
  );
};

// --- SPRINKLE BADGE ---
export const SprinkleBadge = () => {
  const colors = ['#ec4899', '#8b5cf6', '#06b6d4', '#84cc16', '#f59e0b', '#ef4444'];

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#fff5f8' }}>
      <div
        className="relative px-4 py-1.5 rounded-full"
        style={{
          background: '#fdf2f8',
          border: '2px solid #f9a8d4',
        }}
      >
        {/* Sprinkles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-2 rounded-full"
            style={{
              background: colors[i % colors.length],
              left: `${10 + i * 12}%`,
              top: i % 2 === 0 ? '-4px' : 'auto',
              bottom: i % 2 === 1 ? '-4px' : 'auto',
              transform: `rotate(${-30 + Math.random() * 60}deg)`,
            }}
          />
        ))}
        <span className="text-pink-500 font-bold text-sm">NEW</span>
      </div>
    </div>
  );
};

// --- CANDY CANE TOGGLE ---
export const CandyCaneToggle = () => {
  const [on, setOn] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#fff5f8' }}>
      <button
        onClick={() => setOn(!on)}
        className="relative w-16 h-8 rounded-full transition-all duration-300"
        style={{
          background: on
            ? 'repeating-linear-gradient(45deg, #ef4444, #ef4444 4px, #fff 4px, #fff 8px)'
            : '#e5e7eb',
        }}
      >
        {/* Toggle knob */}
        <div
          className="absolute top-1 w-6 h-6 rounded-full transition-all duration-300"
          style={{
            left: on ? 'calc(100% - 28px)' : '4px',
            background: '#fff',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }}
        >
          {/* Candy swirl on knob */}
          {on && (
            <div
              className="absolute inset-1 rounded-full"
              style={{
                background: 'conic-gradient(from 0deg, #ec4899, #8b5cf6, #ec4899)',
              }}
            />
          )}
        </div>
      </button>
    </div>
  );
};

// --- BUBBLEGUM PROGRESS ---
export const BubblegumProgress = () => {
  const [progress] = useState(70);
  const [bubble, setBubble] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#fff5f8' }}>
      <div className="w-48">
        <div
          className="relative h-6 rounded-full overflow-hidden cursor-pointer"
          style={{
            background: '#fce7f3',
            border: '2px solid #f9a8d4',
          }}
          onClick={() => setBubble(!bubble)}
        >
          {/* Progress fill */}
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #f472b6 0%, #ec4899 100%)',
            }}
          />

          {/* Bubble pop effect */}
          {bubble && (
            <div
              className="absolute rounded-full animate-ping"
              style={{
                width: '30px',
                height: '30px',
                left: `${progress}%`,
                top: '-5px',
                background: '#f9a8d4',
                marginLeft: '-15px',
              }}
            />
          )}
        </div>
        <p className="text-center text-pink-400 text-xs mt-2">Click to pop! {progress}%</p>
      </div>
    </div>
  );
};

// --- JAWBREAKER LOADER ---
export const JawbreakerLoader = () => {
  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#fff5f8' }}>
      <div className="relative w-16 h-16 animate-spin" style={{ animationDuration: '3s' }}>
        {/* Layered circles */}
        <div className="absolute inset-0 rounded-full" style={{ background: '#ef4444' }} />
        <div className="absolute inset-1.5 rounded-full" style={{ background: '#f59e0b' }} />
        <div className="absolute inset-3 rounded-full" style={{ background: '#84cc16' }} />
        <div className="absolute inset-[18px] rounded-full" style={{ background: '#06b6d4' }} />
        <div className="absolute inset-6 rounded-full" style={{ background: '#8b5cf6' }} />
        <div className="absolute inset-[26px] rounded-full" style={{ background: '#ec4899' }} />
      </div>
    </div>
  );
};

// --- ICE CREAM CONE ICON ---
export const IceCreamConeIcon = () => {
  const [licked, setLicked] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#fff5f8' }}>
      <button
        onClick={() => setLicked(!licked)}
        className="relative transition-transform duration-200 hover:scale-110"
      >
        <svg width="48" height="64" viewBox="0 0 48 64">
          {/* Cone */}
          <path
            d="M14,28 L24,60 L34,28 Z"
            fill="#d4a574"
            stroke="#b8956e"
            strokeWidth="1"
          />
          {/* Cone pattern */}
          <path d="M16,30 L24,55 M20,30 L24,50 M28,30 L24,50 M32,30 L24,55" stroke="#b8956e" strokeWidth="0.5" fill="none" />

          {/* Ice cream scoops */}
          <ellipse cx="24" cy="20" rx={licked ? "10" : "12"} ry={licked ? "8" : "10"} fill="#f9a8d4" />
          <ellipse cx="18" cy="14" rx="8" ry="7" fill="#c4b5fd" />
          <ellipse cx="30" cy="14" rx="8" ry="7" fill="#a5f3fc" />

          {/* Cherry */}
          <circle cx="24" cy="6" r="4" fill="#ef4444" />
          <path d="M24,2 Q28,0 26,6" stroke="#84cc16" strokeWidth="1" fill="none" />
        </svg>

        {/* Drip effect when licked */}
        {licked && (
          <div
            className="absolute bottom-4 left-1/2 w-2 h-4 rounded-b-full animate-bounce"
            style={{ background: '#f9a8d4', marginLeft: '-4px' }}
          />
        )}
      </button>
    </div>
  );
};

// --- CANDY WRAPPER MODAL ---
export const CandyWrapperModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#fff5f8' }}>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 rounded-full bg-pink-500 text-white font-bold hover:bg-pink-600 transition-colors"
      >
        Unwrap 🍬
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-pink-900/30" onClick={() => setOpen(false)} />

          {/* Wrapper shape */}
          <div
            className="relative w-72 py-8 px-6"
            style={{
              background: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)',
              clipPath: 'polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%)',
              boxShadow: '0 10px 40px rgba(236,72,153,0.3)',
            }}
          >
            {/* Twist ends */}
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-16"
              style={{
                background: 'repeating-linear-gradient(0deg, #ec4899 0px, #ec4899 4px, #f472b6 4px, #f472b6 8px)',
                borderRadius: '4px',
              }}
            />
            <div
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-8 h-16"
              style={{
                background: 'repeating-linear-gradient(0deg, #ec4899 0px, #ec4899 4px, #f472b6 4px, #f472b6 8px)',
                borderRadius: '4px',
              }}
            />

            <div className="text-center">
              <p className="text-pink-600 font-bold text-lg">Sweet Surprise!</p>
              <p className="text-pink-400 text-sm mt-2">You found a golden ticket! 🎫</p>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-8 text-pink-400 hover:text-pink-600 text-xl"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// --- DONUT AVATAR ---
export const DonutAvatar = () => {
  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#fff5f8' }}>
      <div className="relative">
        {/* Donut shape */}
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{
            background: 'linear-gradient(180deg, #f472b6 0%, #ec4899 100%)',
            boxShadow: '0 4px 12px rgba(236,72,153,0.4)',
          }}
        >
          {/* Donut hole */}
          <div
            className="w-6 h-6 rounded-full"
            style={{ background: '#fff5f8' }}
          />
        </div>

        {/* Sprinkles on top */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-2 rounded-full"
              style={{
                background: ['#84cc16', '#06b6d4', '#f59e0b', '#8b5cf6', '#ef4444', '#3b82f6'][i],
                left: `${20 + i * 10}%`,
                top: `${15 + (i % 2) * 10}%`,
                transform: `rotate(${-45 + i * 15}deg)`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// --- RAINBOW DIVIDER ---
export const RainbowDivider = () => {
  const colors = ['#ef4444', '#f59e0b', '#eab308', '#84cc16', '#06b6d4', '#8b5cf6'];

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#fff5f8' }}>
      <div className="w-full max-w-xs flex h-2 rounded-full overflow-hidden">
        {colors.map((color, i) => (
          <div
            key={i}
            className="flex-1 transition-transform duration-300 hover:scale-y-150"
            style={{ background: color }}
          />
        ))}
      </div>
    </div>
  );
};

// --- GUMMY BEAR NAV ---
export const GummyBearNav = () => {
  const [active, setActive] = useState(0);
  const colors = ['#ef4444', '#f59e0b', '#84cc16', '#3b82f6'];
  const items = ['Home', 'Shop', 'Cart', 'Profile'];

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#fff5f8' }}>
      <nav className="flex gap-2">
        {items.map((item, i) => (
          <button
            key={item}
            onClick={() => setActive(i)}
            className="relative px-4 py-2 rounded-2xl transition-all duration-300"
            style={{
              background: active === i ? colors[i] : `${colors[i]}30`,
              color: active === i ? '#fff' : colors[i],
              transform: active === i ? 'scale(1.1)' : 'scale(1)',
            }}
          >
            {/* Gummy shine */}
            <div
              className="absolute top-1 left-2 w-3 h-1.5 rounded-full bg-white opacity-40"
            />
            <span className="relative font-bold text-sm">{item}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

// --- SUGAR CUBE CHECKBOX ---
export const SugarCubeCheckbox = () => {
  const [checked, setChecked] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#fff5f8' }}>
      <button
        onClick={() => setChecked(!checked)}
        className="flex items-center gap-3"
      >
        <div
          className="relative w-6 h-6 rounded transition-all duration-300"
          style={{
            background: checked ? '#ec4899' : '#fff',
            border: '2px solid #f9a8d4',
            boxShadow: checked ? '0 0 10px #ec4899' : 'inset 1px 1px 2px rgba(0,0,0,0.1)',
          }}
        >
          {/* Sugar texture dots */}
          {!checked && (
            <div className="absolute inset-0 grid grid-cols-3 gap-0.5 p-0.5 opacity-30">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-full h-full rounded-sm bg-gray-400" />
              ))}
            </div>
          )}

          {/* Checkmark */}
          {checked && (
            <svg className="absolute inset-0 w-full h-full p-1 text-white" viewBox="0 0 24 24">
              <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" fill="none" />
            </svg>
          )}
        </div>
        <span className="text-pink-600 font-medium">Add extra sweetness</span>
      </button>
    </div>
  );
};

// --- CAKE SLICE TOOLTIP ---
export const CakeSliceTooltip = () => {
  const [show, setShow] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#fff5f8' }}>
      <div
        className="relative"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        <span className="text-4xl cursor-pointer">🍰</span>

        {/* Tooltip */}
        {show && (
          <div
            className="absolute -top-16 left-1/2 -translate-x-1/2 px-4 py-2 rounded-xl whitespace-nowrap"
            style={{
              background: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)',
              border: '2px solid #f9a8d4',
              boxShadow: '0 4px 12px rgba(236,72,153,0.2)',
            }}
          >
            <p className="text-pink-600 font-bold text-sm">Strawberry Delight</p>
            <p className="text-pink-400 text-xs">250 calories of joy!</p>

            {/* Arrow */}
            <div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45"
              style={{
                background: '#fbcfe8',
                border: '2px solid #f9a8d4',
                borderTop: 'none',
                borderLeft: 'none',
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

// --- POPSICLE SLIDER ---
export const PopsicleSlider = () => {
  const [value, setValue] = useState(50);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#fff5f8' }}>
      <div className="w-48">
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="w-full h-4 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(90deg, #ec4899 0%, #ec4899 ${value}%, #fce7f3 ${value}%, #fce7f3 100%)`,
          }}
        />
        <div className="flex justify-between mt-2 text-xs text-pink-400">
          <span>Less</span>
          <span>{value}%</span>
          <span>More</span>
        </div>
      </div>
    </div>
  );
};

// --- CUPCAKE ALERT ---
export const CupcakeAlert = () => {
  const [show, setShow] = useState(true);

  if (!show) {
    return (
      <div className="h-full flex items-center justify-center p-6" style={{ background: '#fff5f8' }}>
        <button
          onClick={() => setShow(true)}
          className="text-pink-500 hover:text-pink-600"
        >
          Show cupcake 🧁
        </button>
      </div>
    );
  }

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#fff5f8' }}>
      <div
        className="relative w-56 p-4 rounded-2xl"
        style={{
          background: 'linear-gradient(180deg, #fce7f3 0%, #fbcfe8 100%)',
          border: '3px solid #f9a8d4',
        }}
      >
        <div className="flex items-start gap-3">
          <span className="text-3xl">🧁</span>
          <div>
            <p className="text-pink-600 font-bold">Sweet Success!</p>
            <p className="text-pink-400 text-sm">Your order is ready for pickup.</p>
          </div>
        </div>

        <button
          onClick={() => setShow(false)}
          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-pink-200 text-pink-500 hover:bg-pink-300 flex items-center justify-center"
        >
          ×
        </button>
      </div>
    </div>
  );
};

// Export all components
export const candyKingdomComponents: Record<string, React.FC> = {
  'candy-gumdrop-button': GumdropButton,
  'candy-lollipop-card': LollipopCard,
  'candy-cotton-candy-input': CottonCandyInput,
  'candy-sprinkle-badge': SprinkleBadge,
  'candy-cane-toggle': CandyCaneToggle,
  'candy-bubblegum-progress': BubblegumProgress,
  'candy-jawbreaker-loader': JawbreakerLoader,
  'candy-ice-cream-cone-icon': IceCreamConeIcon,
  'candy-wrapper-modal': CandyWrapperModal,
  'candy-donut-avatar': DonutAvatar,
  'candy-rainbow-divider': RainbowDivider,
  'candy-gummy-bear-nav': GummyBearNav,
  'candy-sugar-cube-checkbox': SugarCubeCheckbox,
  'candy-cake-slice-tooltip': CakeSliceTooltip,
  'candy-popsicle-slider': PopsicleSlider,
  'candy-cupcake-alert': CupcakeAlert,
  'candy-sprinkles-background': SprinkleBadge,
};
