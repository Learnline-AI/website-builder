import React, { useState } from 'react';

// Colors: white (#ffffff), cream (#faf8f0), soft gray (#e5e5e5), accent red (#e74c3c), soft blue (#a8d8ea)

// --- ORIGAMI CRANE BUTTON ---
export const OrigamiCraneButton = () => {
  const [unfolded, setUnfolded] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#faf8f0' }}>
      <button
        onClick={() => setUnfolded(!unfolded)}
        onMouseEnter={() => setUnfolded(true)}
        onMouseLeave={() => setUnfolded(false)}
        className="relative px-8 py-4 transition-all duration-500"
        style={{
          background: '#ffffff',
          boxShadow: unfolded
            ? '0 8px 24px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.08)'
            : '0 2px 8px rgba(0,0,0,0.08)',
          transform: unfolded ? 'translateY(-2px)' : 'translateY(0)',
        }}
      >
        {/* Folded corners that unfold */}
        <div
          className="absolute top-0 right-0 transition-all duration-500"
          style={{
            width: unfolded ? '0' : '20px',
            height: unfolded ? '0' : '20px',
            background: 'linear-gradient(135deg, transparent 50%, #e5e5e5 50%)',
            boxShadow: unfolded ? 'none' : '-1px 1px 2px rgba(0,0,0,0.1)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 transition-all duration-500"
          style={{
            width: unfolded ? '0' : '16px',
            height: unfolded ? '0' : '16px',
            background: 'linear-gradient(315deg, transparent 50%, #e5e5e5 50%)',
            boxShadow: unfolded ? 'none' : '1px -1px 2px rgba(0,0,0,0.1)',
          }}
        />

        {/* Crane silhouette that appears */}
        <svg
          className="absolute top-1 right-1 transition-all duration-500"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          style={{
            opacity: unfolded ? 1 : 0,
            transform: unfolded ? 'scale(1) rotate(0deg)' : 'scale(0.5) rotate(-45deg)',
          }}
        >
          <path
            d="M12 2 L16 8 L24 8 L18 12 L20 20 L12 16 L4 20 L6 12 L0 8 L8 8 Z"
            fill="#e74c3c"
            opacity="0.8"
          />
        </svg>

        <span className="relative text-gray-700 font-medium tracking-wide">
          {unfolded ? 'Unfolded' : 'Click Me'}
        </span>
      </button>
    </div>
  );
};

// --- ORIGAMI ENVELOPE CARD ---
export const OrigamiEnvelopeCard = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#faf8f0' }}>
      <div
        className="relative w-64 h-44 cursor-pointer perspective-1000"
        onClick={() => setOpen(!open)}
      >
        {/* Card body */}
        <div
          className="absolute inset-0 transition-all duration-500"
          style={{
            background: '#ffffff',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          }}
        >
          {/* Content inside */}
          <div className="absolute inset-4 flex items-center justify-center">
            <p className="text-gray-600 text-sm text-center">
              {open ? 'Secret message revealed!' : 'Click to open'}
            </p>
          </div>
        </div>

        {/* Top flap */}
        <div
          className="absolute top-0 left-0 right-0 transition-all duration-500 origin-top"
          style={{
            height: '50%',
            background: 'linear-gradient(180deg, #e5e5e5 0%, #ffffff 100%)',
            clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            transform: open ? 'rotateX(-180deg)' : 'rotateX(0deg)',
            transformStyle: 'preserve-3d',
            boxShadow: open ? 'none' : '0 2px 4px rgba(0,0,0,0.1)',
          }}
        />

        {/* Side triangles */}
        <div
          className="absolute bottom-0 left-0 transition-all duration-300"
          style={{
            width: '50%',
            height: '50%',
            background: '#f5f5f5',
            clipPath: 'polygon(0 100%, 100% 100%, 0 0)',
            opacity: open ? 0.5 : 1,
          }}
        />
        <div
          className="absolute bottom-0 right-0 transition-all duration-300"
          style={{
            width: '50%',
            height: '50%',
            background: '#f5f5f5',
            clipPath: 'polygon(100% 100%, 0 100%, 100% 0)',
            opacity: open ? 0.5 : 1,
          }}
        />

        {/* Red seal */}
        <div
          className="absolute left-1/2 -translate-x-1/2 transition-all duration-500 z-10"
          style={{
            top: open ? '-10px' : 'calc(50% - 12px)',
            width: '24px',
            height: '24px',
            background: '#e74c3c',
            borderRadius: '50%',
            boxShadow: '0 2px 4px rgba(231,76,60,0.3)',
            opacity: open ? 0 : 1,
          }}
        />
      </div>
    </div>
  );
};

// --- ORIGAMI FOLD INPUT ---
export const OrigamiFoldInput = () => {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#faf8f0' }}>
      <div className="relative w-64">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Type here..."
          className="w-full px-4 py-3 pr-8 text-gray-700 placeholder-gray-400 outline-none transition-all duration-300"
          style={{
            background: '#ffffff',
            border: '1px solid #e5e5e5',
            boxShadow: focused
              ? '0 4px 12px rgba(0,0,0,0.08)'
              : '0 1px 3px rgba(0,0,0,0.04)',
          }}
        />

        {/* Corner fold */}
        <div
          className="absolute top-0 right-0 transition-all duration-300"
          style={{
            width: focused ? '32px' : '24px',
            height: focused ? '32px' : '24px',
          }}
        >
          {/* Fold shadow */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.05) 50%)',
            }}
          />
          {/* Folded corner */}
          <div
            className="absolute inset-0 transition-all duration-300"
            style={{
              background: `linear-gradient(135deg, transparent 50%, ${focused ? '#a8d8ea' : '#e5e5e5'} 50%)`,
            }}
          />
          {/* Under-fold reveal */}
          <div
            className="absolute transition-all duration-300"
            style={{
              top: 0,
              right: 0,
              width: focused ? '32px' : '24px',
              height: focused ? '32px' : '24px',
              background: focused ? '#a8d8ea' : '#e5e5e5',
              clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
              opacity: 0.5,
            }}
          />
        </div>
      </div>
    </div>
  );
};

// --- ORIGAMI FORTUNE BADGE ---
export const OrigamiFortuneBadge = () => {
  const [flipped, setFlipped] = useState(0);
  const colors = ['#e74c3c', '#a8d8ea', '#e5e5e5', '#ffffff'];
  const fortunes = ['Lucky!', 'Try Again', 'Winner!', 'Soon...'];

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#faf8f0' }}>
      <div
        className="relative w-20 h-20 cursor-pointer"
        onClick={() => setFlipped((flipped + 1) % 4)}
      >
        {/* Cootie catcher shape */}
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Four triangular sections */}
          <path
            d="M50 50 L50 0 L100 50 Z"
            fill={colors[(flipped + 0) % 4]}
            className="transition-all duration-300"
            style={{
              transform: `rotate(${flipped * 90}deg)`,
              transformOrigin: '50% 50%',
            }}
          />
          <path
            d="M50 50 L100 50 L50 100 Z"
            fill={colors[(flipped + 1) % 4]}
            className="transition-all duration-300"
          />
          <path
            d="M50 50 L50 100 L0 50 Z"
            fill={colors[(flipped + 2) % 4]}
            className="transition-all duration-300"
          />
          <path
            d="M50 50 L0 50 L50 0 Z"
            fill={colors[(flipped + 3) % 4]}
            className="transition-all duration-300"
          />

          {/* Fold lines */}
          <line x1="0" y1="0" x2="100" y2="100" stroke="#00000020" strokeWidth="1" />
          <line x1="100" y1="0" x2="0" y2="100" stroke="#00000020" strokeWidth="1" />
          <line x1="50" y1="0" x2="50" y2="100" stroke="#00000015" strokeWidth="1" />
          <line x1="0" y1="50" x2="100" y2="50" stroke="#00000015" strokeWidth="1" />
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-xs font-bold transition-all duration-300"
            style={{
              color: flipped % 2 === 0 ? '#ffffff' : '#333333',
              textShadow: flipped % 2 === 0 ? '0 1px 2px rgba(0,0,0,0.3)' : 'none',
            }}
          >
            {fortunes[flipped]}
          </span>
        </div>
      </div>
    </div>
  );
};

// --- ORIGAMI FAN TOGGLE ---
export const OrigamiFanToggle = () => {
  const [on, setOn] = useState(false);
  const segments = 7;

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#faf8f0' }}>
      <button
        onClick={() => setOn(!on)}
        className="relative w-32 h-20"
      >
        {/* Fan segments */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
          {[...Array(segments)].map((_, i) => {
            const angle = on
              ? -60 + (i * 120) / (segments - 1)
              : -10 + (i * 20) / (segments - 1);
            return (
              <div
                key={i}
                className="absolute bottom-0 left-0 origin-bottom transition-all duration-500"
                style={{
                  width: '8px',
                  height: '60px',
                  background: i % 2 === 0 ? '#e74c3c' : '#ffffff',
                  border: '1px solid #e5e5e5',
                  borderRadius: '2px 2px 0 0',
                  transform: `rotate(${angle}deg)`,
                  transitionDelay: `${i * 30}ms`,
                  boxShadow: '0 0 4px rgba(0,0,0,0.1)',
                }}
              />
            );
          })}
        </div>

        {/* Fan handle */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-6 rounded-b-full"
          style={{
            background: 'linear-gradient(180deg, #8b7355 0%, #6b5a42 100%)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }}
        />

        {/* Label */}
        <span
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-500"
        >
          {on ? 'ON' : 'OFF'}
        </span>
      </button>
    </div>
  );
};

// --- ORIGAMI UNFOLD PROGRESS ---
export const OrigamiUnfoldProgress = () => {
  const [progress] = useState(65);
  const segments = 10;
  const filledSegments = Math.floor((progress / 100) * segments);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#faf8f0' }}>
      <div className="w-full max-w-xs">
        <div className="flex gap-0.5">
          {[...Array(segments)].map((_, i) => {
            const isFilled = i < filledSegments;
            return (
              <div
                key={i}
                className="relative flex-1 h-8 transition-all duration-500"
                style={{
                  transitionDelay: `${i * 50}ms`,
                }}
              >
                {/* Base segment */}
                <div
                  className="absolute inset-0 transition-all duration-300"
                  style={{
                    background: isFilled ? '#a8d8ea' : '#e5e5e5',
                    transform: isFilled ? 'rotateY(0deg)' : 'rotateY(90deg)',
                    boxShadow: isFilled ? '0 2px 4px rgba(168,216,234,0.3)' : 'none',
                  }}
                />

                {/* Fold crease line */}
                <div
                  className="absolute top-0 bottom-0 right-0 w-px"
                  style={{
                    background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.1), transparent)',
                  }}
                />

                {/* Paper texture */}
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: isFilled
                      ? 'linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.5) 50%, transparent 60%)'
                      : 'none',
                  }}
                />
              </div>
            );
          })}
        </div>

        <p className="text-center text-sm text-gray-500 mt-2">{progress}% unfolded</p>
      </div>
    </div>
  );
};

// --- ORIGAMI SPINNER LOADER ---
export const OrigamiSpinnerLoader = () => {
  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#faf8f0' }}>
      <div className="relative w-16 h-16">
        {/* Pinwheel */}
        <div
          className="absolute inset-0 animate-spin"
          style={{ animationDuration: '3s' }}
        >
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 origin-bottom-left"
              style={{
                width: '28px',
                height: '28px',
                transform: `rotate(${i * 90}deg)`,
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: i % 2 === 0 ? '#e74c3c' : '#a8d8ea',
                  clipPath: 'polygon(0 100%, 100% 100%, 100% 0)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                }}
              />
            </div>
          ))}
        </div>

        {/* Center pin */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full z-10"
          style={{
            background: 'linear-gradient(145deg, #e5e5e5 0%, #cccccc 100%)',
            boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
          }}
        />
      </div>
    </div>
  );
};

// --- ORIGAMI BOAT AVATAR ---
export const OrigamiBoatAvatar = () => {
  const [bobbing, setBobbing] = useState(true);

  return (
    <div
      className="h-full flex items-center justify-center p-6"
      style={{ background: '#faf8f0' }}
      onClick={() => setBobbing(!bobbing)}
    >
      <div className="relative">
        {/* Water line */}
        <div
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-3 rounded-full opacity-50"
          style={{
            background: 'linear-gradient(180deg, #a8d8ea 0%, transparent 100%)',
          }}
        />

        {/* Paper boat frame */}
        <div
          className={`relative ${bobbing ? 'animate-bounce' : ''}`}
          style={{
            animationDuration: '2s',
          }}
        >
          <svg width="80" height="60" viewBox="0 0 80 60">
            {/* Boat hull */}
            <path
              d="M10 35 L40 55 L70 35 L60 35 L40 25 L20 35 Z"
              fill="#ffffff"
              stroke="#e5e5e5"
              strokeWidth="1"
            />
            {/* Boat fold lines */}
            <line x1="40" y1="25" x2="40" y2="55" stroke="#e5e5e5" strokeWidth="0.5" />
            <line x1="20" y1="35" x2="40" y2="55" stroke="#e5e5e5" strokeWidth="0.5" />
            <line x1="60" y1="35" x2="40" y2="55" stroke="#e5e5e5" strokeWidth="0.5" />

            {/* Sail/flag */}
            <path
              d="M40 5 L40 25 L55 20 Z"
              fill="#e74c3c"
            />
          </svg>

          {/* Avatar circle inside boat */}
          <div
            className="absolute top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
            style={{
              background: 'linear-gradient(135deg, #a8d8ea 0%, #7cc4df 100%)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            JD
          </div>
        </div>
      </div>
    </div>
  );
};

// --- ORIGAMI POPUP MODAL ---
export const OrigamiPopupModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#faf8f0' }}>
      <button
        onClick={() => setOpen(true)}
        className="px-6 py-2 text-gray-700 hover:text-gray-900 transition-colors"
        style={{
          background: '#ffffff',
          border: '1px solid #e5e5e5',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        }}
      >
        Open Popup Book
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setOpen(false)}
          />

          {/* Pop-up book style modal */}
          <div
            className="relative w-80 bg-white overflow-hidden"
            style={{
              boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
              animation: 'popupUnfold 0.5s ease-out',
            }}
          >
            {/* Book spine shadow */}
            <div
              className="absolute top-0 bottom-0 left-1/2 w-4 -translate-x-1/2"
              style={{
                background: 'linear-gradient(90deg, rgba(0,0,0,0.1), transparent, rgba(0,0,0,0.1))',
              }}
            />

            {/* Pop-up element */}
            <div
              className="relative mx-auto mt-6 transition-all duration-500"
              style={{
                width: '120px',
                height: '80px',
                transformStyle: 'preserve-3d',
                animation: 'popupRise 0.6s ease-out 0.2s both',
              }}
            >
              {/* Main popup shape */}
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  background: '#e74c3c',
                  clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
                  boxShadow: '0 4px 12px rgba(231,76,60,0.3)',
                }}
              >
                <span className="text-white font-bold text-lg mt-4">Hello!</span>
              </div>

              {/* Supporting folds */}
              <div
                className="absolute -left-2 bottom-0 w-4 h-12"
                style={{
                  background: '#e5e5e5',
                  transform: 'skewY(-15deg)',
                }}
              />
              <div
                className="absolute -right-2 bottom-0 w-4 h-12"
                style={{
                  background: '#e5e5e5',
                  transform: 'skewY(15deg)',
                }}
              />
            </div>

            {/* Content */}
            <div className="p-6 pt-4 text-center">
              <p className="text-gray-600 text-sm mb-4">
                This modal pops up like a page from a popup book!
              </p>
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 text-sm text-white rounded"
                style={{ background: '#e74c3c' }}
              >
                Close Book
              </button>
            </div>

            {/* Page edge effect */}
            <div
              className="absolute bottom-0 left-0 right-0 h-2"
              style={{
                background: 'repeating-linear-gradient(90deg, #faf8f0, #faf8f0 2px, #e5e5e5 2px, #e5e5e5 4px)',
              }}
            />
          </div>
        </div>
      )}

      <style>{`
        @keyframes popupUnfold {
          0% { transform: scaleY(0); opacity: 0; }
          100% { transform: scaleY(1); opacity: 1; }
        }
        @keyframes popupRise {
          0% { transform: translateY(40px) scale(0.8); opacity: 0; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

// --- ORIGAMI STEP NAV ---
export const OrigamiStepNav = () => {
  const [step, setStep] = useState(1);
  const steps = ['Valley Fold', 'Mountain Fold', 'Reverse Fold', 'Complete'];

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#faf8f0' }}>
      <div className="w-full max-w-sm">
        <div className="flex items-center">
          {steps.map((label, i) => (
            <React.Fragment key={i}>
              <button
                onClick={() => setStep(i + 1)}
                className="relative flex flex-col items-center transition-all duration-300"
              >
                {/* Folded paper step indicator */}
                <div
                  className="w-10 h-10 flex items-center justify-center transition-all duration-300"
                  style={{
                    background: i + 1 <= step ? '#e74c3c' : '#ffffff',
                    color: i + 1 <= step ? '#ffffff' : '#666666',
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                    boxShadow: i + 1 <= step
                      ? '0 4px 8px rgba(231,76,60,0.3)'
                      : '0 2px 4px rgba(0,0,0,0.1)',
                    transform: i + 1 === step ? 'scale(1.1)' : 'scale(1)',
                  }}
                >
                  <span className="text-sm font-bold">{i + 1}</span>
                </div>

                {/* Fold diagram icon */}
                <div
                  className="mt-2 w-6 h-4 transition-all duration-300"
                  style={{
                    borderBottom: `2px ${i + 1 <= step ? 'solid' : 'dashed'} ${i + 1 <= step ? '#e74c3c' : '#cccccc'}`,
                    borderLeft: i % 2 === 0 ? '1px dashed #cccccc' : 'none',
                    borderRight: i % 2 === 1 ? '1px dashed #cccccc' : 'none',
                  }}
                />

                <span
                  className="mt-1 text-[10px] transition-all duration-300"
                  style={{
                    color: i + 1 <= step ? '#e74c3c' : '#999999',
                  }}
                >
                  {label}
                </span>
              </button>

              {/* Connector line */}
              {i < steps.length - 1 && (
                <div
                  className="flex-1 h-0.5 mx-1 transition-all duration-500"
                  style={{
                    background: i + 1 < step
                      ? '#e74c3c'
                      : 'repeating-linear-gradient(90deg, #e5e5e5, #e5e5e5 4px, transparent 4px, transparent 8px)',
                    transitionDelay: `${i * 100}ms`,
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- ORIGAMI CREASE DIVIDER ---
export const OrigamiCreaseDivider = () => {
  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#faf8f0' }}>
      <div className="w-full max-w-xs relative">
        {/* Main crease line */}
        <div
          className="relative h-4 overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, #ffffff 0%, #faf8f0 50%, #ffffff 100%)',
          }}
        >
          {/* Shadow above crease */}
          <div
            className="absolute top-0 left-0 right-0 h-1/2"
            style={{
              background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.04) 100%)',
            }}
          />

          {/* Central fold line */}
          <div
            className="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, #d0d0d0 20%, #d0d0d0 80%, transparent 100%)',
            }}
          />

          {/* Highlight below crease */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1/2"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.8) 0%, transparent 100%)',
            }}
          />
        </div>

        {/* Decorative fold marks */}
        <div className="flex justify-between px-4 -mt-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2"
              style={{
                background: '#faf8f0',
                clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// --- ORIGAMI NOTE ALERT ---
export const OrigamiNoteAlert = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return (
      <div className="h-full flex items-center justify-center p-6" style={{ background: '#faf8f0' }}>
        <button
          onClick={() => setVisible(true)}
          className="text-gray-600 hover:text-gray-800"
        >
          Show note
        </button>
      </div>
    );
  }

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#faf8f0' }}>
      <div className="relative">
        {/* Folded note shape */}
        <div
          className="relative w-56 p-4 pb-6"
          style={{
            background: '#ffffff',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          }}
        >
          {/* Top left folded corner */}
          <div
            className="absolute top-0 left-0 w-8 h-8"
            style={{
              background: 'linear-gradient(135deg, #faf8f0 50%, #e5e5e5 50%)',
            }}
          />
          <div
            className="absolute top-0 left-0 w-8 h-8"
            style={{
              background: 'linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.05) 50%)',
            }}
          />

          {/* Alert icon */}
          <div
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
            style={{
              background: '#e74c3c',
              boxShadow: '0 2px 4px rgba(231,76,60,0.3)',
            }}
          >
            !
          </div>

          {/* Content */}
          <div className="ml-4">
            <p className="text-gray-700 text-sm font-medium">Important Note</p>
            <p className="text-gray-500 text-xs mt-1">
              Remember to fold along the dotted lines carefully.
            </p>
          </div>

          {/* Bottom fold effect */}
          <div
            className="absolute bottom-0 left-0 right-0 h-6"
            style={{
              background: 'linear-gradient(0deg, rgba(0,0,0,0.02) 0%, transparent 100%)',
            }}
          />

          {/* Close button */}
          <button
            onClick={() => setVisible(false)}
            className="absolute bottom-2 right-2 text-gray-400 hover:text-gray-600 text-xs"
          >
            Dismiss
          </button>
        </div>

        {/* Paper shadow/lift effect */}
        <div
          className="absolute -bottom-2 left-2 right-2 h-4 -z-10"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.1) 0%, transparent 70%)',
          }}
        />
      </div>
    </div>
  );
};

// --- ORIGAMI BUTTERFLY ICON ---
export const OrigamiButterflyIcon = () => {
  const [flap, setFlap] = useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => setFlap(f => !f), 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#faf8f0' }}>
      <div className="relative w-20 h-16">
        {/* Left wing */}
        <div
          className="absolute right-1/2 top-0 w-10 h-16 origin-right transition-transform duration-300"
          style={{
            transform: flap ? 'rotateY(-30deg)' : 'rotateY(0deg)',
          }}
        >
          <svg viewBox="0 0 40 64" className="w-full h-full">
            <path
              d="M40 32 L40 8 L8 0 L0 16 L12 32 L0 48 L8 64 L40 56 Z"
              fill="#e74c3c"
            />
            {/* Wing fold patterns */}
            <path
              d="M40 32 L20 16 M40 32 L20 48"
              stroke="#ffffff"
              strokeWidth="1"
              fill="none"
              opacity="0.5"
            />
            <circle cx="15" cy="24" r="4" fill="#ffffff" opacity="0.6" />
            <circle cx="15" cy="40" r="4" fill="#ffffff" opacity="0.6" />
          </svg>
        </div>

        {/* Right wing */}
        <div
          className="absolute left-1/2 top-0 w-10 h-16 origin-left transition-transform duration-300"
          style={{
            transform: flap ? 'rotateY(30deg)' : 'rotateY(0deg)',
          }}
        >
          <svg viewBox="0 0 40 64" className="w-full h-full">
            <path
              d="M0 32 L0 8 L32 0 L40 16 L28 32 L40 48 L32 64 L0 56 Z"
              fill="#a8d8ea"
            />
            {/* Wing fold patterns */}
            <path
              d="M0 32 L20 16 M0 32 L20 48"
              stroke="#ffffff"
              strokeWidth="1"
              fill="none"
              opacity="0.5"
            />
            <circle cx="25" cy="24" r="4" fill="#ffffff" opacity="0.6" />
            <circle cx="25" cy="40" r="4" fill="#ffffff" opacity="0.6" />
          </svg>
        </div>

        {/* Body */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-10"
          style={{
            background: 'linear-gradient(180deg, #333333 0%, #555555 100%)',
            borderRadius: '50%',
          }}
        />

        {/* Antennae */}
        <div
          className="absolute left-1/2 top-2 -translate-x-1/2"
          style={{
            width: '16px',
            height: '8px',
            borderTop: '1px solid #333333',
            borderLeft: '1px solid #333333',
            borderRight: '1px solid #333333',
            borderRadius: '50% 50% 0 0',
          }}
        />
      </div>
    </div>
  );
};

// --- ORIGAMI FOLD HEADING ---
export const OrigamiFoldHeading = () => {
  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#faf8f0' }}>
      <div className="relative">
        <h2
          className="text-3xl font-bold tracking-wide"
          style={{
            color: '#333333',
          }}
        >
          Paper Art
        </h2>

        {/* Paper fold shadow effect */}
        <div
          className="absolute -bottom-1 left-0 right-0 h-4 overflow-hidden"
        >
          <div
            className="w-full h-full"
            style={{
              background: 'linear-gradient(180deg, rgba(0,0,0,0.08) 0%, transparent 100%)',
              clipPath: 'polygon(0 0, 10% 100%, 20% 0, 30% 100%, 40% 0, 50% 100%, 60% 0, 70% 100%, 80% 0, 90% 100%, 100% 0)',
            }}
          />
        </div>

        {/* Decorative fold accent */}
        <div
          className="absolute -right-4 top-0 w-3 h-3"
          style={{
            background: 'linear-gradient(135deg, transparent 50%, #e74c3c 50%)',
          }}
        />

        {/* Underline crease */}
        <div
          className="mt-2 h-0.5"
          style={{
            background: 'linear-gradient(90deg, #e74c3c 0%, #e74c3c 30%, #e5e5e5 30%, #e5e5e5 100%)',
          }}
        />
      </div>
    </div>
  );
};

// --- ORIGAMI ACCORDION SLIDER ---
export const OrigamiAccordionSlider = () => {
  const [value, setValue] = useState(50);
  const folds = 8;

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#faf8f0' }}>
      <div className="w-full max-w-xs">
        {/* Accordion fold display */}
        <div className="relative h-12 mb-4 flex">
          {[...Array(folds)].map((_, i) => {
            const foldPosition = (i / folds) * 100;
            const isExpanded = foldPosition < value;
            return (
              <div
                key={i}
                className="flex-1 transition-all duration-300 origin-left"
                style={{
                  background: i % 2 === 0 ? '#ffffff' : '#f5f5f5',
                  transform: isExpanded
                    ? `scaleX(1) perspective(100px) rotateY(${i % 2 === 0 ? '5' : '-5'}deg)`
                    : 'scaleX(0.3) perspective(100px) rotateY(0deg)',
                  boxShadow: isExpanded
                    ? `${i % 2 === 0 ? '2' : '-2'}px 0 4px rgba(0,0,0,0.1)`
                    : 'none',
                  borderLeft: '1px solid #e5e5e5',
                  borderRight: '1px solid #e5e5e5',
                }}
              />
            );
          })}

          {/* Indicator */}
          <div
            className="absolute top-0 bottom-0 w-1 transition-all duration-300"
            style={{
              left: `${value}%`,
              background: '#e74c3c',
              boxShadow: '0 0 8px rgba(231,76,60,0.4)',
            }}
          />
        </div>

        {/* Slider input */}
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => setValue(parseInt(e.target.value))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(90deg, #e74c3c 0%, #e74c3c ${value}%, #e5e5e5 ${value}%, #e5e5e5 100%)`,
          }}
        />

        <p className="text-center text-sm text-gray-500 mt-2">{value}%</p>
      </div>
    </div>
  );
};

// --- ORIGAMI TAB TABS ---
export const OrigamiTabTabs = () => {
  const [active, setActive] = useState(0);
  const tabs = ['Fold', 'Crease', 'Unfold'];

  return (
    <div className="h-full flex flex-col items-center justify-center p-6" style={{ background: '#faf8f0' }}>
      <div className="flex gap-1">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActive(i)}
            className="relative px-6 py-3 transition-all duration-300"
            style={{
              background: active === i ? '#ffffff' : '#f0f0f0',
              marginBottom: active === i ? '-2px' : '0',
              zIndex: active === i ? 10 : 1,
            }}
          >
            {/* Tab fold effect at top */}
            <div
              className="absolute -top-2 left-0 right-0 h-2 transition-all duration-300"
              style={{
                background: active === i ? '#e74c3c' : '#e5e5e5',
                clipPath: 'polygon(8px 100%, 0 0, 100% 0, calc(100% - 8px) 100%)',
              }}
            />

            {/* Tab corner folds */}
            <div
              className="absolute top-0 left-0 w-2 h-2 transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, ${active === i ? '#faf8f0' : '#e8e8e8'} 50%, transparent 50%)`,
              }}
            />
            <div
              className="absolute top-0 right-0 w-2 h-2 transition-all duration-300"
              style={{
                background: `linear-gradient(225deg, ${active === i ? '#faf8f0' : '#e8e8e8'} 50%, transparent 50%)`,
              }}
            />

            <span
              className="relative text-sm font-medium transition-colors duration-300"
              style={{ color: active === i ? '#e74c3c' : '#666666' }}
            >
              {tab}
            </span>
          </button>
        ))}
      </div>

      {/* Content area */}
      <div
        className="w-64 h-24 p-4 flex items-center justify-center"
        style={{
          background: '#ffffff',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          marginTop: '-1px',
        }}
      >
        <p className="text-gray-600 text-sm">
          Content for "{tabs[active]}" tab
        </p>
      </div>
    </div>
  );
};

// --- ORIGAMI PAPER BACKGROUND ---
export const OrigamiPaperBackground = () => {
  return (
    <div
      className="h-full flex items-center justify-center p-6 relative overflow-hidden"
      style={{ background: '#faf8f0' }}
    >
      {/* Paper texture overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(0,0,0,0.02) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(0,0,0,0.02) 0%, transparent 50%),
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 30px,
              rgba(0,0,0,0.01) 30px,
              rgba(0,0,0,0.01) 31px
            ),
            repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 30px,
              rgba(0,0,0,0.01) 30px,
              rgba(0,0,0,0.01) 31px
            )
          `,
        }}
      />

      {/* Subtle fold pattern */}
      <div className="absolute inset-0">
        {/* Diagonal crease */}
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: 'linear-gradient(135deg, transparent 49.5%, rgba(0,0,0,0.03) 49.5%, rgba(0,0,0,0.03) 50.5%, transparent 50.5%)',
          }}
        />

        {/* Corner fold hint */}
        <div
          className="absolute top-0 right-0 w-16 h-16"
          style={{
            background: 'linear-gradient(225deg, rgba(255,255,255,0.8) 0%, transparent 60%)',
          }}
        />
        <div
          className="absolute top-0 right-0 w-12 h-12"
          style={{
            background: 'linear-gradient(225deg, #e5e5e5 50%, transparent 50%)',
            opacity: 0.3,
          }}
        />
      </div>

      {/* Content placeholder */}
      <div className="relative z-10 text-center">
        <div
          className="w-24 h-24 mx-auto mb-4 flex items-center justify-center"
          style={{
            background: '#ffffff',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          }}
        >
          <svg width="48" height="48" viewBox="0 0 48 48">
            {/* Simple origami crane silhouette */}
            <path
              d="M24 4 L44 24 L24 44 L4 24 Z"
              fill="none"
              stroke="#e74c3c"
              strokeWidth="2"
            />
            <path
              d="M24 4 L24 44 M4 24 L44 24"
              stroke="#e5e5e5"
              strokeWidth="1"
              strokeDasharray="4 2"
            />
          </svg>
        </div>
        <p className="text-gray-500 text-sm">Paper texture background</p>
      </div>
    </div>
  );
};

// Export all components
export const origamiFoldComponents: Record<string, React.FC> = {
  'origami-crane-button': OrigamiCraneButton,
  'origami-envelope-card': OrigamiEnvelopeCard,
  'origami-fold-input': OrigamiFoldInput,
  'origami-fortune-badge': OrigamiFortuneBadge,
  'origami-fan-toggle': OrigamiFanToggle,
  'origami-unfold-progress': OrigamiUnfoldProgress,
  'origami-spinner-loader': OrigamiSpinnerLoader,
  'origami-boat-avatar': OrigamiBoatAvatar,
  'origami-popup-modal': OrigamiPopupModal,
  'origami-step-nav': OrigamiStepNav,
  'origami-crease-divider': OrigamiCreaseDivider,
  'origami-note-alert': OrigamiNoteAlert,
  'origami-butterfly-icon': OrigamiButterflyIcon,
  'origami-fold-heading': OrigamiFoldHeading,
  'origami-accordion-slider': OrigamiAccordionSlider,
  'origami-tab-tabs': OrigamiTabTabs,
  'origami-paper-background': OrigamiPaperBackground,
};
