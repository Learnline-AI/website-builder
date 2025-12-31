import { useState, useEffect } from 'react';
import { Star, ChevronDown, Check, Diamond, Crown, Award } from '../shared/icons';

// --- GOLD BUTTON ---
export const GoldButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="h-full bg-zinc-950 flex items-center justify-center p-4">
      <button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative px-8 py-3 font-semibold text-zinc-950 overflow-hidden transition-all duration-300"
        style={{
          background: 'linear-gradient(135deg, #d4af37 0%, #f5d76e 50%, #d4af37 100%)',
          boxShadow: isHovered
            ? '0 8px 32px rgba(212, 175, 55, 0.4), inset 0 1px 0 rgba(255,255,255,0.3)'
            : '0 4px 16px rgba(212, 175, 55, 0.2), inset 0 1px 0 rgba(255,255,255,0.2)',
          transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        }}
      >
        <span className="relative z-10 tracking-wider uppercase text-sm">Shop Now</span>
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-300"
          style={{
            background: 'linear-gradient(135deg, #f5d76e 0%, #d4af37 50%, #f5d76e 100%)',
            opacity: isHovered ? 1 : 0,
          }}
        />
      </button>
    </div>
  );
};

// --- GOLD BUTTON OUTLINE ---
export const GoldButtonOutline = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="h-full bg-zinc-950 flex items-center justify-center p-4">
      <button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative px-8 py-3 font-semibold overflow-hidden transition-all duration-300"
        style={{
          border: '2px solid #d4af37',
          color: isHovered ? '#0a0a0a' : '#d4af37',
          background: isHovered ? 'linear-gradient(135deg, #d4af37 0%, #f5d76e 100%)' : 'transparent',
        }}
      >
        <span className="relative z-10 tracking-wider uppercase text-sm">Explore</span>
      </button>
    </div>
  );
};

// --- MARBLE CARD ---
export const MarbleCard = () => {
  return (
    <div className="h-full bg-zinc-950 flex items-center justify-center p-6">
      <div
        className="relative w-72 p-6 overflow-hidden"
        style={{
          background: `
            linear-gradient(135deg, rgba(245,240,230,0.95) 0%, rgba(220,215,205,0.95) 100%),
            url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20 Q40 10, 60 30 T100 20' stroke='%23c0b8a8' stroke-width='0.5' fill='none' opacity='0.4'/%3E%3Cpath d='M0 50 Q30 40, 50 60 T80 50' stroke='%23b8b0a0' stroke-width='0.3' fill='none' opacity='0.3'/%3E%3Cpath d='M30 80 Q50 70, 70 90 T100 80' stroke='%23c8c0b0' stroke-width='0.4' fill='none' opacity='0.35'/%3E%3C/svg%3E")
          `,
          borderTop: '4px solid #d4af37',
          boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(212,175,55,0.2)',
        }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Diamond size={16} className="text-amber-700" />
          <span className="text-amber-800 text-xs uppercase tracking-widest font-medium">Premium</span>
        </div>
        <h3 className="text-xl font-light text-zinc-800 mb-2" style={{ fontFamily: 'serif' }}>
          Exclusive Collection
        </h3>
        <p className="text-zinc-600 text-sm leading-relaxed">
          Curated pieces that define elegance and timeless sophistication.
        </p>
        <div className="mt-6 pt-4 border-t border-amber-200">
          <span className="text-amber-700 text-xs uppercase tracking-wider cursor-pointer hover:text-amber-800 transition-colors">
            View Details &rarr;
          </span>
        </div>
      </div>
    </div>
  );
};

// --- DIAMOND BADGE ---
export const DiamondBadge = () => {
  return (
    <div className="h-full bg-zinc-950 flex items-center justify-center gap-4 p-4">
      <div
        className="inline-flex items-center gap-2 px-4 py-2"
        style={{
          background: 'linear-gradient(135deg, #d4af37 0%, #f5d76e 50%, #d4af37 100%)',
          boxShadow: '0 2px 8px rgba(212,175,55,0.3)',
        }}
      >
        <Diamond size={14} className="text-zinc-900" />
        <span className="text-zinc-900 text-xs font-semibold uppercase tracking-wider">Diamond</span>
      </div>

      <div
        className="inline-flex items-center gap-2 px-4 py-2 border"
        style={{
          borderColor: '#d4af37',
          background: 'rgba(212,175,55,0.1)',
        }}
      >
        <Crown size={14} className="text-amber-500" />
        <span className="text-amber-500 text-xs font-semibold uppercase tracking-wider">VIP</span>
      </div>
    </div>
  );
};

// --- PLATINUM BADGE ---
export const PlatinumBadge = () => {
  return (
    <div className="h-full bg-zinc-950 flex items-center justify-center gap-4 p-4">
      <div
        className="inline-flex items-center gap-2 px-4 py-2"
        style={{
          background: 'linear-gradient(135deg, #e5e4e2 0%, #c0c0c0 50%, #e5e4e2 100%)',
          boxShadow: '0 2px 8px rgba(192,192,192,0.4)',
        }}
      >
        <Award size={14} className="text-zinc-700" />
        <span className="text-zinc-700 text-xs font-semibold uppercase tracking-wider">Platinum</span>
      </div>

      <div
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
          border: '1px solid #d4af37',
        }}
      >
        <Star size={14} className="text-amber-500 fill-amber-500" />
        <span className="text-amber-500 text-xs font-semibold uppercase tracking-wider">Elite</span>
      </div>
    </div>
  );
};

// --- GOLD DIVIDER ---
export const GoldDivider = () => {
  return (
    <div className="h-full bg-zinc-950 flex flex-col items-center justify-center gap-8 p-8">
      {/* Simple line */}
      <div className="w-full max-w-xs">
        <div
          className="h-px w-full"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, #d4af37 50%, transparent 100%)',
          }}
        />
      </div>

      {/* With diamond */}
      <div className="w-full max-w-xs flex items-center gap-4">
        <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent 0%, #d4af37 100%)' }} />
        <Diamond size={12} className="text-amber-500" />
        <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, #d4af37 0%, transparent 100%)' }} />
      </div>

      {/* Double line */}
      <div className="w-full max-w-xs space-y-1">
        <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent 0%, #d4af37 50%, transparent 100%)' }} />
        <div className="h-px w-3/4 mx-auto" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.5) 50%, transparent 100%)' }} />
      </div>
    </div>
  );
};

// --- ELEGANT INPUT ---
export const ElegantInput = () => {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');

  return (
    <div className="h-full bg-zinc-950 flex items-center justify-center p-6">
      <div className="relative w-72">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Enter your name"
          className="w-full px-4 py-3 bg-transparent text-amber-100 placeholder-zinc-600 outline-none transition-all duration-300"
          style={{
            borderBottom: `2px solid ${focused ? '#d4af37' : '#3f3f46'}`,
            fontFamily: 'inherit',
          }}
        />
        <label
          className="absolute left-0 -top-5 text-xs uppercase tracking-widest transition-colors duration-300"
          style={{ color: focused ? '#d4af37' : '#71717a' }}
        >
          Full Name
        </label>
        <div
          className="absolute bottom-0 left-0 h-0.5 transition-all duration-300"
          style={{
            width: focused ? '100%' : '0%',
            background: 'linear-gradient(90deg, #d4af37 0%, #f5d76e 100%)',
          }}
        />
      </div>
    </div>
  );
};

// --- GOLD PROGRESS ---
export const GoldProgress = () => {
  const [progress, setProgress] = useState(65);

  return (
    <div className="h-full bg-zinc-950 flex flex-col items-center justify-center p-6 gap-6">
      {/* Linear progress */}
      <div className="w-64">
        <div className="flex justify-between mb-2">
          <span className="text-amber-100 text-xs uppercase tracking-wider">Completion</span>
          <span className="text-amber-500 text-xs font-medium">{progress}%</span>
        </div>
        <div className="h-1 bg-zinc-800 overflow-hidden">
          <div
            className="h-full transition-all duration-500"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #d4af37 0%, #f5d76e 100%)',
              boxShadow: '0 0 8px rgba(212,175,55,0.5)',
            }}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-2">
        <button
          onClick={() => setProgress(Math.max(0, progress - 10))}
          className="px-3 py-1 text-xs text-amber-500 border border-amber-500/30 hover:bg-amber-500/10 transition-colors"
        >
          -10%
        </button>
        <button
          onClick={() => setProgress(Math.min(100, progress + 10))}
          className="px-3 py-1 text-xs text-amber-500 border border-amber-500/30 hover:bg-amber-500/10 transition-colors"
        >
          +10%
        </button>
      </div>
    </div>
  );
};

// --- GOLD SPINNER ---
export const GoldSpinner = () => {
  return (
    <div className="h-full bg-zinc-950 flex items-center justify-center gap-8 p-6">
      {/* Ring spinner */}
      <div className="relative w-12 h-12">
        <div
          className="absolute inset-0 rounded-full animate-spin"
          style={{
            border: '2px solid rgba(212,175,55,0.2)',
            borderTopColor: '#d4af37',
          }}
        />
      </div>

      {/* Dots spinner */}
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full animate-bounce"
            style={{
              background: '#d4af37',
              animationDelay: `${i * 0.15}s`,
              animationDuration: '0.6s',
            }}
          />
        ))}
      </div>

      {/* Pulse spinner */}
      <div className="relative w-8 h-8">
        <div
          className="absolute inset-0 rounded-full animate-ping"
          style={{ background: 'rgba(212,175,55,0.3)' }}
        />
        <div
          className="absolute inset-2 rounded-full"
          style={{ background: '#d4af37' }}
        />
      </div>
    </div>
  );
};

// --- SWISS WATCH ---
export const SwissWatch = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours() % 12;

  return (
    <div className="h-full bg-zinc-950 flex items-center justify-center p-6">
      <div
        className="relative w-40 h-40 rounded-full"
        style={{
          background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
          border: '4px solid #d4af37',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.1)',
        }}
      >
        {/* Hour markers */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute left-1/2 top-0 w-px origin-bottom"
            style={{
              height: '16px',
              marginLeft: '-0.5px',
              marginTop: '8px',
              background: i % 3 === 0 ? '#d4af37' : '#4a4a4a',
              transform: `rotate(${i * 30}deg)`,
              transformOrigin: '0 62px',
            }}
          />
        ))}

        {/* Hour hand */}
        <div
          className="absolute left-1/2 top-1/2 w-1 rounded-full origin-bottom"
          style={{
            height: '36px',
            marginLeft: '-2px',
            marginTop: '-36px',
            background: '#d4af37',
            transform: `rotate(${hours * 30 + minutes * 0.5}deg)`,
          }}
        />

        {/* Minute hand */}
        <div
          className="absolute left-1/2 top-1/2 w-0.5 rounded-full origin-bottom"
          style={{
            height: '48px',
            marginLeft: '-1px',
            marginTop: '-48px',
            background: '#f5f0e6',
            transform: `rotate(${minutes * 6}deg)`,
          }}
        />

        {/* Second hand */}
        <div
          className="absolute left-1/2 top-1/2 origin-bottom"
          style={{
            width: '1px',
            height: '52px',
            marginLeft: '-0.5px',
            marginTop: '-52px',
            background: '#ef4444',
            transform: `rotate(${seconds * 6}deg)`,
            transition: 'transform 0.1s cubic-bezier(0.4, 2.08, 0.55, 0.44)',
          }}
        />

        {/* Center dot */}
        <div
          className="absolute left-1/2 top-1/2 w-3 h-3 -ml-1.5 -mt-1.5 rounded-full"
          style={{ background: '#d4af37' }}
        />

        {/* Brand text */}
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 text-center">
          <span className="text-amber-500 text-[8px] tracking-[0.3em] uppercase">Luxe</span>
        </div>
      </div>
    </div>
  );
};

// --- PREMIUM PRICING CARD ---
export const PremiumPricingCard = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="h-full bg-zinc-950 flex items-center justify-center p-6">
      <div
        className="relative w-72 overflow-hidden transition-all duration-300"
        style={{
          background: 'linear-gradient(180deg, #1a1510 0%, #0a0805 100%)',
          border: '1px solid rgba(212,175,55,0.3)',
          transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
          boxShadow: isHovered
            ? '0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(212,175,55,0.2)'
            : '0 16px 48px rgba(0,0,0,0.4)',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Gold accent top */}
        <div className="h-1" style={{ background: 'linear-gradient(90deg, #d4af37 0%, #f5d76e 50%, #d4af37 100%)' }} />

        <div className="p-6">
          {/* Badge */}
          <div className="flex items-center gap-2 mb-4">
            <Crown size={16} className="text-amber-500" />
            <span className="text-amber-500 text-xs uppercase tracking-widest">Premium</span>
          </div>

          {/* Price */}
          <div className="mb-6">
            <span className="text-amber-500 text-sm">$</span>
            <span className="text-amber-100 text-5xl font-light" style={{ fontFamily: 'serif' }}>299</span>
            <span className="text-zinc-500 text-sm">/month</span>
          </div>

          {/* Features */}
          <ul className="space-y-3 mb-6">
            {['Unlimited access', 'Priority support', 'Custom branding', 'Analytics dashboard'].map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-zinc-400 text-sm">
                <Check size={14} className="text-amber-500" />
                {feature}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <button
            className="w-full py-3 text-zinc-950 font-semibold text-sm uppercase tracking-wider transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #d4af37 0%, #f5d76e 100%)',
              boxShadow: '0 4px 16px rgba(212,175,55,0.3)',
            }}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

// --- LUXURY TESTIMONIAL ---
export const LuxuryTestimonial = () => {
  return (
    <div className="h-full bg-zinc-950 flex items-center justify-center p-6">
      <div
        className="relative w-80 p-6"
        style={{
          background: 'linear-gradient(180deg, rgba(26,21,16,0.8) 0%, rgba(10,8,5,0.9) 100%)',
          borderLeft: '4px solid #d4af37',
        }}
      >
        {/* Quote mark */}
        <div className="text-6xl text-amber-500/20 font-serif absolute top-2 left-4">&ldquo;</div>

        {/* Content */}
        <blockquote className="relative z-10 text-amber-100/80 text-sm leading-relaxed mb-6 italic" style={{ fontFamily: 'serif' }}>
          An exceptional experience from start to finish. The attention to detail and quality of service exceeded all expectations.
        </blockquote>

        {/* Author */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center">
            <span className="text-zinc-900 font-semibold">AK</span>
          </div>
          <div>
            <div className="text-amber-100 font-medium text-sm">Alexandra Knight</div>
            <div className="text-zinc-500 text-xs">CEO, Luxury Brands Inc.</div>
          </div>
        </div>

        {/* Stars */}
        <div className="flex gap-1 mt-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} className="text-amber-500 fill-amber-500" />
          ))}
        </div>
      </div>
    </div>
  );
};

// --- VELVET SELECT ---
export const VelvetSelect = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('Select option');
  const options = ['Diamond', 'Platinum', 'Gold', 'Silver'];

  return (
    <div className="h-full bg-zinc-950 flex items-center justify-center p-6">
      <div className="relative w-64">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 flex items-center justify-between transition-all duration-200"
          style={{
            background: 'rgba(26,21,16,0.8)',
            border: `1px solid ${isOpen ? '#d4af37' : '#3f3f46'}`,
          }}
        >
          <span className={selected === 'Select option' ? 'text-zinc-500' : 'text-amber-100'}>
            {selected}
          </span>
          <ChevronDown
            size={16}
            className="text-amber-500 transition-transform duration-200"
            style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
          />
        </button>

        {isOpen && (
          <div
            className="absolute top-full left-0 w-full mt-1 z-10 overflow-hidden"
            style={{
              background: 'rgba(26,21,16,0.95)',
              border: '1px solid #d4af37',
              boxShadow: '0 16px 48px rgba(0,0,0,0.4)',
            }}
          >
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  setSelected(option);
                  setIsOpen(false);
                }}
                className="w-full px-4 py-3 text-left text-amber-100/80 hover:bg-amber-500/10 hover:text-amber-100 transition-colors text-sm"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// --- GOLD BORDER FRAME ---
export const GoldBorderFrame = () => {
  return (
    <div className="h-full bg-zinc-950 flex items-center justify-center p-8">
      <div className="relative w-48 h-48">
        {/* Outer decorative frame */}
        <div
          className="absolute inset-0"
          style={{
            border: '2px solid #d4af37',
            background: 'rgba(10,8,5,0.8)',
          }}
        />

        {/* Corner accents */}
        {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((pos) => (
          <div
            key={pos}
            className="absolute w-6 h-6"
            style={{
              [pos.split('-')[0]]: '-3px',
              [pos.split('-')[1]]: '-3px',
              borderTop: pos.includes('top') ? '3px solid #d4af37' : 'none',
              borderBottom: pos.includes('bottom') ? '3px solid #d4af37' : 'none',
              borderLeft: pos.includes('left') ? '3px solid #d4af37' : 'none',
              borderRight: pos.includes('right') ? '3px solid #d4af37' : 'none',
            }}
          />
        ))}

        {/* Inner content */}
        <div className="absolute inset-4 flex items-center justify-center">
          <div className="text-center">
            <Diamond size={24} className="text-amber-500 mx-auto mb-2" />
            <span className="text-amber-100 text-xs uppercase tracking-widest">Premium</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- CAVIAR BACKGROUND ---
export const CaviarBackground = () => {
  return (
    <div className="h-full relative overflow-hidden">
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1510 50%, #0a0805 100%)',
        }}
      />

      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, #d4af37 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        }}
      />

      {/* Content */}
      <div className="relative h-full flex items-center justify-center">
        <div className="text-center">
          <Crown size={32} className="text-amber-500 mx-auto mb-4" />
          <h2 className="text-amber-100 text-xl font-light tracking-widest uppercase" style={{ fontFamily: 'serif' }}>
            Luxury Collection
          </h2>
          <p className="text-zinc-500 text-sm mt-2">Exquisite designs for discerning tastes</p>
        </div>
      </div>
    </div>
  );
};

// --- LUXURY FEATURE GRID ---
export const LuxuryFeatureGrid = () => {
  const features = [
    { icon: Diamond, label: 'Premium Materials', desc: 'Finest quality' },
    { icon: Crown, label: 'Exclusive Access', desc: 'VIP benefits' },
    { icon: Award, label: 'Award Winning', desc: 'Industry leading' },
    { icon: Star, label: '5-Star Service', desc: 'White glove' },
  ];

  return (
    <div className="h-full bg-zinc-950 flex items-center justify-center p-4">
      <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
        {features.map((feature, i) => (
          <div
            key={i}
            className="p-4 text-center transition-all duration-300 hover:bg-amber-500/5"
            style={{
              border: '1px solid rgba(212,175,55,0.2)',
            }}
          >
            <feature.icon size={24} className="text-amber-500 mx-auto mb-2" />
            <div className="text-amber-100 text-xs font-medium mb-1">{feature.label}</div>
            <div className="text-zinc-500 text-[10px]">{feature.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- LUXURY NAVBAR ---
export const LuxuryNavbar = () => {
  return (
    <div className="h-full bg-zinc-950 flex items-start justify-center p-4">
      <nav
        className="w-full max-w-lg"
        style={{
          background: 'linear-gradient(180deg, rgba(26,21,16,0.9) 0%, rgba(10,8,5,0.95) 100%)',
          borderBottom: '1px solid rgba(212,175,55,0.3)',
        }}
      >
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Diamond size={20} className="text-amber-500" />
            <span className="text-amber-100 text-lg font-light tracking-widest uppercase" style={{ fontFamily: 'serif' }}>
              Luxe
            </span>
          </div>

          {/* Nav links */}
          <div className="flex items-center gap-6">
            {['Collection', 'About', 'Contact'].map((link) => (
              <a
                key={link}
                href="#"
                className="text-zinc-400 text-xs uppercase tracking-widest hover:text-amber-500 transition-colors"
              >
                {link}
              </a>
            ))}
          </div>

          {/* CTA */}
          <button
            className="px-4 py-2 text-xs uppercase tracking-wider text-zinc-950 font-medium"
            style={{
              background: 'linear-gradient(135deg, #d4af37 0%, #f5d76e 100%)',
            }}
          >
            Shop
          </button>
        </div>
      </nav>
    </div>
  );
};

// Export all components
export const luxuryShowroomComponents = {
  'gold-button': GoldButton,
  'gold-button-outline': GoldButtonOutline,
  'marble-card': MarbleCard,
  'diamond-badge': DiamondBadge,
  'platinum-badge': PlatinumBadge,
  'gold-divider': GoldDivider,
  'elegant-input': ElegantInput,
  'gold-progress': GoldProgress,
  'gold-spinner': GoldSpinner,
  'swiss-watch': SwissWatch,
  'premium-pricing-card': PremiumPricingCard,
  'luxury-testimonial': LuxuryTestimonial,
  'velvet-select': VelvetSelect,
  'gold-border-frame': GoldBorderFrame,
  'caviar-background': CaviarBackground,
  'luxury-feature-grid': LuxuryFeatureGrid,
  'luxury-navbar': LuxuryNavbar,
};
