import React, { useState, useEffect } from 'react';

// Wireframe Proto Zone - Lo-fi prototype mockups
// Colors: light gray (#f5f5f5), medium gray (#9e9e9e), dark gray (#424242), blue accent (#2196f3), sketch black (#333333)

// --- WIREFRAME PLACEHOLDER BUTTON ---
export const WireframePlaceholderButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-4" style={{ backgroundColor: '#f5f5f5' }}>
      <button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { setIsHovered(false); setIsPressed(false); }}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        className="relative transition-all duration-150"
        style={{
          backgroundColor: isPressed ? '#e0e0e0' : isHovered ? '#fafafa' : '#ffffff',
          border: '2px dashed #9e9e9e',
          borderRadius: '4px',
          padding: '12px 32px',
          fontFamily: '"Comic Sans MS", "Marker Felt", cursive',
          fontSize: '14px',
          color: '#424242',
          transform: isPressed ? 'scale(0.98)' : 'scale(1)',
          boxShadow: isHovered ? '2px 2px 0 #9e9e9e' : 'none',
        }}
      >
        <span style={{ letterSpacing: '1px' }}>Button</span>
        {/* Sketch annotation */}
        <div
          className="absolute -top-6 -right-2 text-xs rotate-[-5deg]"
          style={{
            fontFamily: '"Comic Sans MS", cursive',
            color: '#2196f3',
            fontSize: '10px'
          }}
        >
          click me!
        </div>
      </button>
    </div>
  );
};

// --- WIREFRAME BOX CARD ---
export const WireframeBoxCard = () => {
  return (
    <div className="h-full flex items-center justify-center p-4" style={{ backgroundColor: '#f5f5f5' }}>
      <div
        className="relative"
        style={{
          width: '160px',
          height: '120px',
          backgroundColor: '#ffffff',
          border: '2px dashed #9e9e9e',
          borderRadius: '4px',
          padding: '8px',
        }}
      >
        {/* X-cross placeholder box */}
        <div
          className="relative w-full h-full"
          style={{
            backgroundColor: '#e8e8e8',
            border: '1px solid #9e9e9e',
          }}
        >
          {/* X cross lines */}
          <svg className="absolute inset-0 w-full h-full" style={{ stroke: '#9e9e9e', strokeWidth: '1' }}>
            <line x1="0" y1="0" x2="100%" y2="100%" />
            <line x1="100%" y1="0" x2="0" y2="100%" />
          </svg>
          {/* Image placeholder text */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              fontFamily: '"Comic Sans MS", cursive',
              fontSize: '11px',
              color: '#9e9e9e',
            }}
          >
            Image
          </div>
        </div>
        {/* Card label annotation */}
        <div
          className="absolute -bottom-5 left-2 text-xs"
          style={{
            fontFamily: '"Comic Sans MS", cursive',
            color: '#424242',
            fontSize: '10px',
          }}
        >
          ^ card content
        </div>
      </div>
    </div>
  );
};

// --- WIREFRAME FIELD INPUT ---
export const WireframeFieldInput = () => {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-4" style={{ backgroundColor: '#f5f5f5' }}>
      <div className="relative">
        {/* Label */}
        <label
          className="block mb-1"
          style={{
            fontFamily: '"Comic Sans MS", cursive',
            fontSize: '12px',
            color: '#424242',
          }}
        >
          Text Input
          <span style={{ color: '#2196f3', marginLeft: '4px' }}>*</span>
        </label>
        {/* Input field */}
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Type here..."
          className="outline-none"
          style={{
            width: '180px',
            padding: '8px 12px',
            backgroundColor: '#ffffff',
            border: `2px ${isFocused ? 'solid' : 'dashed'} ${isFocused ? '#2196f3' : '#9e9e9e'}`,
            borderRadius: '4px',
            fontFamily: '"Comic Sans MS", cursive',
            fontSize: '13px',
            color: '#333333',
          }}
        />
        {/* Sketch arrow annotation */}
        <div
          className="absolute -right-16 top-7 text-xs"
          style={{
            fontFamily: '"Comic Sans MS", cursive',
            color: '#9e9e9e',
            fontSize: '10px',
          }}
        >
          {'<-- input'}
        </div>
      </div>
    </div>
  );
};

// --- WIREFRAME LABEL BADGE ---
export const WireframeLabelBadge = () => {
  const badges = ['New', 'Draft', 'TODO'];

  return (
    <div className="h-full flex items-center justify-center gap-3 p-4" style={{ backgroundColor: '#f5f5f5' }}>
      {badges.map((label, index) => (
        <span
          key={label}
          className="relative"
          style={{
            display: 'inline-block',
            padding: '4px 12px',
            backgroundColor: index === 0 ? '#e3f2fd' : '#ffffff',
            border: '1px dashed #9e9e9e',
            borderRadius: '12px',
            fontFamily: '"Comic Sans MS", cursive',
            fontSize: '11px',
            color: '#424242',
            transform: `rotate(${(index - 1) * 2}deg)`,
          }}
        >
          {label}
          {index === 0 && (
            <div
              className="absolute -top-3 -right-1 text-xs"
              style={{
                fontFamily: '"Comic Sans MS", cursive',
                color: '#2196f3',
                fontSize: '9px',
              }}
            >
              label
            </div>
          )}
        </span>
      ))}
    </div>
  );
};

// --- WIREFRAME CHECKBOX TOGGLE ---
export const WireframeCheckboxToggle = () => {
  const [checked, setChecked] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-4" style={{ backgroundColor: '#f5f5f5' }}>
      <label className="flex items-center gap-3 cursor-pointer">
        <div
          onClick={() => setChecked(!checked)}
          className="relative transition-all duration-200"
          style={{
            width: '24px',
            height: '24px',
            backgroundColor: checked ? '#e3f2fd' : '#ffffff',
            border: '2px dashed #9e9e9e',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {checked && (
            <svg width="14" height="14" viewBox="0 0 14 14" style={{ stroke: '#2196f3', strokeWidth: '2', fill: 'none' }}>
              <polyline points="2,7 5,10 12,3" style={{ strokeLinecap: 'round', strokeLinejoin: 'round' }} />
            </svg>
          )}
        </div>
        <span
          style={{
            fontFamily: '"Comic Sans MS", cursive',
            fontSize: '13px',
            color: '#424242',
            textDecoration: checked ? 'line-through' : 'none',
          }}
        >
          Check option
        </span>
        {/* Annotation */}
        <span
          style={{
            fontFamily: '"Comic Sans MS", cursive',
            fontSize: '10px',
            color: '#9e9e9e',
          }}
        >
          ({checked ? 'on' : 'off'})
        </span>
      </label>
    </div>
  );
};

// --- WIREFRAME LOADING PROGRESS ---
export const WireframeLoadingProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + 5));
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex flex-col items-center justify-center p-4" style={{ backgroundColor: '#f5f5f5' }}>
      <div className="w-48 relative">
        {/* Label */}
        <div
          className="mb-2 flex justify-between"
          style={{
            fontFamily: '"Comic Sans MS", cursive',
            fontSize: '11px',
            color: '#424242',
          }}
        >
          <span>Loading...</span>
          <span>{progress}%</span>
        </div>
        {/* Progress bar container */}
        <div
          style={{
            height: '20px',
            backgroundColor: '#ffffff',
            border: '2px dashed #9e9e9e',
            borderRadius: '4px',
            padding: '3px',
          }}
        >
          {/* Progress fill with diagonal stripes */}
          <div
            className="h-full transition-all duration-100"
            style={{
              width: `${progress}%`,
              backgroundColor: '#e0e0e0',
              borderRadius: '2px',
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 4px, #9e9e9e 4px, #9e9e9e 5px)',
            }}
          />
        </div>
        {/* Annotation */}
        <div
          className="mt-2 text-center"
          style={{
            fontFamily: '"Comic Sans MS", cursive',
            fontSize: '10px',
            color: '#9e9e9e',
          }}
        >
          ^ progress bar
        </div>
      </div>
    </div>
  );
};

// --- WIREFRAME SPINNER LOADER ---
export const WireframeSpinnerLoader = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center p-4" style={{ backgroundColor: '#f5f5f5' }}>
      <div className="relative">
        {/* Sketchy spinner */}
        <div
          className="animate-spin"
          style={{
            width: '48px',
            height: '48px',
            border: '3px dashed #9e9e9e',
            borderTopColor: '#2196f3',
            borderRadius: '50%',
            animationDuration: '1.5s',
          }}
        />
        {/* Center dot */}
        <div
          className="absolute inset-0 flex items-center justify-center"
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              backgroundColor: '#424242',
              borderRadius: '50%',
            }}
          />
        </div>
      </div>
      {/* Label */}
      <div
        className="mt-3"
        style={{
          fontFamily: '"Comic Sans MS", cursive',
          fontSize: '11px',
          color: '#424242',
        }}
      >
        loading...
      </div>
    </div>
  );
};

// --- WIREFRAME IMAGE AVATAR ---
export const WireframeImageAvatar = () => {
  return (
    <div className="h-full flex items-center justify-center gap-4 p-4" style={{ backgroundColor: '#f5f5f5' }}>
      {/* Small avatar */}
      <div className="relative">
        <div
          style={{
            width: '32px',
            height: '32px',
            backgroundColor: '#e8e8e8',
            border: '2px dashed #9e9e9e',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9e9e9e" strokeWidth="2">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
          </svg>
        </div>
      </div>
      {/* Medium avatar */}
      <div className="relative">
        <div
          style={{
            width: '48px',
            height: '48px',
            backgroundColor: '#e8e8e8',
            border: '2px dashed #9e9e9e',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9e9e9e" strokeWidth="2">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
          </svg>
        </div>
        {/* Annotation */}
        <div
          className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap"
          style={{
            fontFamily: '"Comic Sans MS", cursive',
            fontSize: '10px',
            color: '#424242',
          }}
        >
          avatar
        </div>
      </div>
      {/* Large avatar */}
      <div className="relative">
        <div
          style={{
            width: '64px',
            height: '64px',
            backgroundColor: '#e8e8e8',
            border: '2px dashed #9e9e9e',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9e9e9e" strokeWidth="2">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
          </svg>
        </div>
      </div>
    </div>
  );
};

// --- WIREFRAME POPUP MODAL ---
export const WireframePopupModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="h-full flex items-center justify-center p-4" style={{ backgroundColor: '#f5f5f5' }}>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#ffffff',
            border: '2px dashed #9e9e9e',
            borderRadius: '4px',
            fontFamily: '"Comic Sans MS", cursive',
            fontSize: '12px',
            color: '#424242',
            cursor: 'pointer',
          }}
        >
          Open Modal
        </button>
      )}
      {isOpen && (
        <div className="relative">
          {/* Modal container */}
          <div
            style={{
              width: '200px',
              backgroundColor: '#ffffff',
              border: '2px dashed #424242',
              borderRadius: '8px',
              boxShadow: '4px 4px 0 #9e9e9e',
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '8px 12px',
                borderBottom: '1px dashed #9e9e9e',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: '"Comic Sans MS", cursive',
                  fontSize: '12px',
                  color: '#424242',
                  fontWeight: 'bold',
                }}
              >
                Modal Title
              </span>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  width: '20px',
                  height: '20px',
                  border: '1px dashed #9e9e9e',
                  borderRadius: '4px',
                  backgroundColor: '#f5f5f5',
                  fontFamily: '"Comic Sans MS", cursive',
                  fontSize: '12px',
                  color: '#9e9e9e',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                x
              </button>
            </div>
            {/* Content */}
            <div
              style={{
                padding: '12px',
                fontFamily: '"Comic Sans MS", cursive',
                fontSize: '11px',
                color: '#9e9e9e',
              }}
            >
              Modal content goes here...
            </div>
            {/* Footer */}
            <div
              style={{
                padding: '8px 12px',
                borderTop: '1px dashed #9e9e9e',
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '8px',
              }}
            >
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  padding: '4px 12px',
                  backgroundColor: '#f5f5f5',
                  border: '1px dashed #9e9e9e',
                  borderRadius: '4px',
                  fontFamily: '"Comic Sans MS", cursive',
                  fontSize: '10px',
                  color: '#424242',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                style={{
                  padding: '4px 12px',
                  backgroundColor: '#e3f2fd',
                  border: '1px dashed #2196f3',
                  borderRadius: '4px',
                  fontFamily: '"Comic Sans MS", cursive',
                  fontSize: '10px',
                  color: '#2196f3',
                  cursor: 'pointer',
                }}
              >
                OK
              </button>
            </div>
          </div>
          {/* Annotation arrow */}
          <div
            className="absolute -right-20 top-0"
            style={{
              fontFamily: '"Comic Sans MS", cursive',
              fontSize: '10px',
              color: '#2196f3',
            }}
          >
            {'<-- popup!'}
          </div>
        </div>
      )}
    </div>
  );
};

// --- WIREFRAME MENU NAV ---
export const WireframeMenuNav = () => {
  const [activeItem, setActiveItem] = useState(0);
  const menuItems = ['Home', 'About', 'Products', 'Contact'];

  return (
    <div className="h-full flex items-center justify-center p-4" style={{ backgroundColor: '#f5f5f5' }}>
      <div className="relative">
        <nav
          style={{
            backgroundColor: '#ffffff',
            border: '2px dashed #9e9e9e',
            borderRadius: '4px',
            padding: '4px',
          }}
        >
          <ul className="flex gap-1">
            {menuItems.map((item, index) => (
              <li key={item}>
                <button
                  onClick={() => setActiveItem(index)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: activeItem === index ? '#e3f2fd' : 'transparent',
                    border: activeItem === index ? '1px dashed #2196f3' : '1px dashed transparent',
                    borderRadius: '4px',
                    fontFamily: '"Comic Sans MS", cursive',
                    fontSize: '12px',
                    color: activeItem === index ? '#2196f3' : '#424242',
                    cursor: 'pointer',
                  }}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        {/* Annotation */}
        <div
          className="absolute -bottom-5 left-0"
          style={{
            fontFamily: '"Comic Sans MS", cursive',
            fontSize: '10px',
            color: '#9e9e9e',
          }}
        >
          navigation menu
        </div>
      </div>
    </div>
  );
};

// --- WIREFRAME LINE DIVIDER ---
export const WireframeLineDivider = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-6 p-4" style={{ backgroundColor: '#f5f5f5' }}>
      {/* Simple dashed line */}
      <div className="w-48 relative">
        <div
          style={{
            height: '0',
            borderTop: '2px dashed #9e9e9e',
          }}
        />
        <span
          className="absolute -top-3 left-0"
          style={{
            fontFamily: '"Comic Sans MS", cursive',
            fontSize: '10px',
            color: '#9e9e9e',
            backgroundColor: '#f5f5f5',
            padding: '0 4px',
          }}
        >
          divider
        </span>
      </div>
      {/* Line with text */}
      <div className="w-48 flex items-center gap-2">
        <div className="flex-1" style={{ borderTop: '2px dashed #9e9e9e' }} />
        <span
          style={{
            fontFamily: '"Comic Sans MS", cursive',
            fontSize: '11px',
            color: '#424242',
          }}
        >
          or
        </span>
        <div className="flex-1" style={{ borderTop: '2px dashed #9e9e9e' }} />
      </div>
      {/* Sketchy wavy line */}
      <div className="w-48">
        <svg height="8" width="100%" style={{ overflow: 'visible' }}>
          <path
            d="M0,4 Q12,0 24,4 T48,4 T72,4 T96,4 T120,4 T144,4 T168,4 T192,4"
            fill="none"
            stroke="#9e9e9e"
            strokeWidth="2"
            strokeDasharray="4,2"
          />
        </svg>
      </div>
    </div>
  );
};

// --- WIREFRAME STICKY ALERT ---
export const WireframeStickyAlert = () => {
  const [visible, setVisible] = useState(true);

  return (
    <div className="h-full flex items-center justify-center p-4" style={{ backgroundColor: '#f5f5f5' }}>
      {visible ? (
        <div
          className="relative"
          style={{
            width: '180px',
            padding: '12px',
            backgroundColor: '#fffde7',
            border: '1px solid #9e9e9e',
            boxShadow: '3px 3px 0 #9e9e9e',
            transform: 'rotate(-1deg)',
          }}
        >
          {/* Tape effect */}
          <div
            className="absolute -top-3 left-1/2 -translate-x-1/2"
            style={{
              width: '40px',
              height: '12px',
              backgroundColor: 'rgba(158, 158, 158, 0.3)',
              border: '1px dashed #9e9e9e',
            }}
          />
          {/* Alert icon */}
          <div
            className="flex items-center gap-2 mb-2"
            style={{
              fontFamily: '"Comic Sans MS", cursive',
              fontSize: '12px',
              color: '#424242',
              fontWeight: 'bold',
            }}
          >
            <span style={{ color: '#2196f3' }}>(!)</span>
            Note:
          </div>
          {/* Alert content */}
          <p
            style={{
              fontFamily: '"Comic Sans MS", cursive',
              fontSize: '11px',
              color: '#424242',
              lineHeight: '1.4',
            }}
          >
            This is a sticky note alert message.
          </p>
          {/* Close button */}
          <button
            onClick={() => setVisible(false)}
            className="absolute top-1 right-1"
            style={{
              fontFamily: '"Comic Sans MS", cursive',
              fontSize: '10px',
              color: '#9e9e9e',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            x
          </button>
        </div>
      ) : (
        <button
          onClick={() => setVisible(true)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#ffffff',
            border: '2px dashed #9e9e9e',
            borderRadius: '4px',
            fontFamily: '"Comic Sans MS", cursive',
            fontSize: '12px',
            color: '#424242',
            cursor: 'pointer',
          }}
        >
          Show Alert
        </button>
      )}
    </div>
  );
};

// --- WIREFRAME ICON ICON ---
export const WireframeIconIcon = () => {
  const icons = [
    { name: 'user', path: 'M12 4a4 4 0 100 8 4 4 0 000-8zM4 20c0-4 4-6 8-6s8 2 8 6' },
    { name: 'star', path: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' },
    { name: 'heart', path: 'M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z' },
    { name: 'gear', path: 'M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z' },
  ];

  return (
    <div className="h-full flex items-center justify-center gap-4 p-4" style={{ backgroundColor: '#f5f5f5' }}>
      {icons.map((icon) => (
        <div
          key={icon.name}
          className="relative flex flex-col items-center"
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              backgroundColor: '#ffffff',
              border: '2px dashed #9e9e9e',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#424242" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d={icon.path} />
            </svg>
          </div>
          <span
            style={{
              marginTop: '4px',
              fontFamily: '"Comic Sans MS", cursive',
              fontSize: '9px',
              color: '#9e9e9e',
            }}
          >
            {icon.name}
          </span>
        </div>
      ))}
    </div>
  );
};

// --- WIREFRAME HEADING HEADING ---
export const WireframeHeadingHeading = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-4 p-4" style={{ backgroundColor: '#f5f5f5' }}>
      <div className="relative">
        <h1
          style={{
            fontFamily: '"Comic Sans MS", cursive',
            fontSize: '24px',
            color: '#333333',
            borderBottom: '3px dashed #9e9e9e',
            paddingBottom: '4px',
          }}
        >
          Heading H1
        </h1>
        <span
          className="absolute -right-8 top-0"
          style={{
            fontFamily: '"Comic Sans MS", cursive',
            fontSize: '10px',
            color: '#2196f3',
          }}
        >
          h1
        </span>
      </div>
      <div className="relative">
        <h2
          style={{
            fontFamily: '"Comic Sans MS", cursive',
            fontSize: '18px',
            color: '#424242',
            borderBottom: '2px dashed #9e9e9e',
            paddingBottom: '4px',
          }}
        >
          Heading H2
        </h2>
        <span
          className="absolute -right-8 top-0"
          style={{
            fontFamily: '"Comic Sans MS", cursive',
            fontSize: '10px',
            color: '#2196f3',
          }}
        >
          h2
        </span>
      </div>
      <div className="relative">
        <h3
          style={{
            fontFamily: '"Comic Sans MS", cursive',
            fontSize: '14px',
            color: '#424242',
            borderBottom: '1px dashed #9e9e9e',
            paddingBottom: '4px',
          }}
        >
          Heading H3
        </h3>
        <span
          className="absolute -right-8 top-0"
          style={{
            fontFamily: '"Comic Sans MS", cursive',
            fontSize: '10px',
            color: '#2196f3',
          }}
        >
          h3
        </span>
      </div>
    </div>
  );
};

// --- WIREFRAME RANGE SLIDER ---
export const WireframeRangeSlider = () => {
  const [value, setValue] = useState(50);

  return (
    <div className="h-full flex flex-col items-center justify-center p-4" style={{ backgroundColor: '#f5f5f5' }}>
      <div className="w-48 relative">
        {/* Label */}
        <div
          className="mb-2 flex justify-between"
          style={{
            fontFamily: '"Comic Sans MS", cursive',
            fontSize: '11px',
            color: '#424242',
          }}
        >
          <span>Range</span>
          <span style={{ color: '#2196f3' }}>{value}</span>
        </div>
        {/* Custom slider track */}
        <div className="relative h-6">
          {/* Track background */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-full"
            style={{
              height: '8px',
              backgroundColor: '#ffffff',
              border: '2px dashed #9e9e9e',
              borderRadius: '4px',
            }}
          >
            {/* Filled portion */}
            <div
              className="h-full"
              style={{
                width: `${value}%`,
                backgroundColor: '#e3f2fd',
                borderRadius: '2px',
              }}
            />
          </div>
          {/* Slider thumb */}
          <input
            type="range"
            min="0"
            max="100"
            value={value}
            onChange={(e) => setValue(parseInt(e.target.value))}
            className="absolute inset-0 w-full opacity-0 cursor-pointer"
          />
          {/* Custom thumb visualization */}
          <div
            className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              left: `calc(${value}% - 10px)`,
              width: '20px',
              height: '20px',
              backgroundColor: '#ffffff',
              border: '2px dashed #424242',
              borderRadius: '50%',
              boxShadow: '2px 2px 0 #9e9e9e',
            }}
          />
        </div>
        {/* Scale markers */}
        <div
          className="mt-2 flex justify-between"
          style={{
            fontFamily: '"Comic Sans MS", cursive',
            fontSize: '9px',
            color: '#9e9e9e',
          }}
        >
          <span>0</span>
          <span>50</span>
          <span>100</span>
        </div>
      </div>
    </div>
  );
};

// --- WIREFRAME TAB TABS ---
export const WireframeTabTabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ['Tab 1', 'Tab 2', 'Tab 3'];

  return (
    <div className="h-full flex items-center justify-center p-4" style={{ backgroundColor: '#f5f5f5' }}>
      <div className="relative">
        {/* Tab headers */}
        <div className="flex">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              onClick={() => setActiveTab(index)}
              style={{
                padding: '8px 20px',
                backgroundColor: activeTab === index ? '#ffffff' : '#e8e8e8',
                border: '2px dashed #9e9e9e',
                borderBottom: activeTab === index ? '2px solid #ffffff' : '2px dashed #9e9e9e',
                borderRadius: '8px 8px 0 0',
                marginRight: '-2px',
                fontFamily: '"Comic Sans MS", cursive',
                fontSize: '12px',
                color: activeTab === index ? '#2196f3' : '#9e9e9e',
                cursor: 'pointer',
                position: 'relative',
                zIndex: activeTab === index ? 1 : 0,
              }}
            >
              {tab}
            </button>
          ))}
        </div>
        {/* Tab content */}
        <div
          style={{
            width: '200px',
            padding: '16px',
            backgroundColor: '#ffffff',
            border: '2px dashed #9e9e9e',
            borderTop: 'none',
            borderRadius: '0 8px 8px 8px',
          }}
        >
          <p
            style={{
              fontFamily: '"Comic Sans MS", cursive',
              fontSize: '11px',
              color: '#424242',
            }}
          >
            Content for {tabs[activeTab]}
          </p>
          <p
            style={{
              marginTop: '8px',
              fontFamily: '"Comic Sans MS", cursive',
              fontSize: '10px',
              color: '#9e9e9e',
            }}
          >
            Tab panel content goes here...
          </p>
        </div>
        {/* Annotation */}
        <div
          className="absolute -right-12 top-4"
          style={{
            fontFamily: '"Comic Sans MS", cursive',
            fontSize: '10px',
            color: '#2196f3',
            transform: 'rotate(5deg)',
          }}
        >
          tabs!
        </div>
      </div>
    </div>
  );
};

// --- WIREFRAME DOTS BACKGROUND ---
export const WireframeDotsBackground = () => {
  return (
    <div
      className="h-full w-full relative overflow-hidden"
      style={{
        backgroundColor: '#f5f5f5',
        backgroundImage: `radial-gradient(#9e9e9e 1px, transparent 1px)`,
        backgroundSize: '16px 16px',
      }}
    >
      {/* Sample content on dot grid */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="relative"
          style={{
            padding: '24px 32px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: '2px dashed #424242',
            borderRadius: '8px',
          }}
        >
          <span
            style={{
              fontFamily: '"Comic Sans MS", cursive',
              fontSize: '14px',
              color: '#333333',
            }}
          >
            Dot Grid Background
          </span>
          {/* Corner annotations */}
          <div
            className="absolute -top-4 -left-4"
            style={{
              fontFamily: '"Comic Sans MS", cursive',
              fontSize: '10px',
              color: '#2196f3',
            }}
          >
            +
          </div>
          <div
            className="absolute -top-4 -right-4"
            style={{
              fontFamily: '"Comic Sans MS", cursive',
              fontSize: '10px',
              color: '#2196f3',
            }}
          >
            +
          </div>
          <div
            className="absolute -bottom-4 -left-4"
            style={{
              fontFamily: '"Comic Sans MS", cursive',
              fontSize: '10px',
              color: '#2196f3',
            }}
          >
            +
          </div>
          <div
            className="absolute -bottom-4 -right-4"
            style={{
              fontFamily: '"Comic Sans MS", cursive',
              fontSize: '10px',
              color: '#2196f3',
            }}
          >
            +
          </div>
        </div>
      </div>
      {/* Grid coordinate annotations */}
      <div
        className="absolute top-2 left-2"
        style={{
          fontFamily: '"Comic Sans MS", cursive',
          fontSize: '10px',
          color: '#9e9e9e',
        }}
      >
        (0,0)
      </div>
      <div
        className="absolute bottom-2 right-2"
        style={{
          fontFamily: '"Comic Sans MS", cursive',
          fontSize: '10px',
          color: '#9e9e9e',
        }}
      >
        wireframe grid
      </div>
    </div>
  );
};

// Export all components with exact IDs
export const wireframeProtoComponents: Record<string, React.FC> = {
  'wireframe-placeholder-button': WireframePlaceholderButton,
  'wireframe-box-card': WireframeBoxCard,
  'wireframe-field-input': WireframeFieldInput,
  'wireframe-label-badge': WireframeLabelBadge,
  'wireframe-checkbox-toggle': WireframeCheckboxToggle,
  'wireframe-loading-progress': WireframeLoadingProgress,
  'wireframe-spinner-loader': WireframeSpinnerLoader,
  'wireframe-image-avatar': WireframeImageAvatar,
  'wireframe-popup-modal': WireframePopupModal,
  'wireframe-menu-nav': WireframeMenuNav,
  'wireframe-line-divider': WireframeLineDivider,
  'wireframe-sticky-alert': WireframeStickyAlert,
  'wireframe-icon-icon': WireframeIconIcon,
  'wireframe-heading-heading': WireframeHeadingHeading,
  'wireframe-range-slider': WireframeRangeSlider,
  'wireframe-tab-tabs': WireframeTabTabs,
  'wireframe-dots-background': WireframeDotsBackground,
};
