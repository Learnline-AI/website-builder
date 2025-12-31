import React, { useState, useRef, useEffect } from 'react';

// ============================================
// HOVER EFFECTS MODULE
// A collection of reusable hover effect wrapper components
// ============================================

interface HoverEffectProps {
  children: React.ReactNode;
  className?: string;
}

// --- 1. HOVER LIFT ---
// Element lifts up with shadow on hover
export const HoverLift: React.FC<HoverEffectProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl ${className}`}
      style={{
        transitionProperty: 'transform, box-shadow',
      }}
    >
      {children}
    </div>
  );
};

// --- 2. HOVER GLOW ---
// Element gains glowing border on hover
export const HoverGlow: React.FC<HoverEffectProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`relative transition-all duration-300 ${className}`}
      style={{
        boxShadow: '0 0 0 rgba(59, 130, 246, 0)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(59, 130, 246, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 0 0 rgba(59, 130, 246, 0)';
      }}
    >
      {children}
    </div>
  );
};

// --- 3. HOVER SHINE ---
// Shine/gleam sweeps across element
export const HoverShine: React.FC<HoverEffectProps> = ({ children, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(120deg, transparent 30%, rgba(255, 255, 255, 0.4) 50%, transparent 70%)',
          transform: isHovered ? 'translateX(100%)' : 'translateX(-100%)',
          transition: 'transform 0.6s ease-in-out',
        }}
      />
    </div>
  );
};

// --- 4. HOVER BORDER DRAW ---
// Border draws around element on hover
export const HoverBorderDraw: React.FC<HoverEffectProps> = ({ children, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ padding: '2px' }}
    >
      {/* Top border */}
      <div
        className="absolute top-0 left-0 h-[2px] bg-blue-500 transition-all duration-300 ease-out"
        style={{ width: isHovered ? '100%' : '0%' }}
      />
      {/* Right border */}
      <div
        className="absolute top-0 right-0 w-[2px] bg-blue-500 transition-all duration-300 ease-out"
        style={{
          height: isHovered ? '100%' : '0%',
          transitionDelay: isHovered ? '0.15s' : '0s'
        }}
      />
      {/* Bottom border */}
      <div
        className="absolute bottom-0 right-0 h-[2px] bg-blue-500 transition-all duration-300 ease-out"
        style={{
          width: isHovered ? '100%' : '0%',
          transitionDelay: isHovered ? '0.3s' : '0s'
        }}
      />
      {/* Left border */}
      <div
        className="absolute bottom-0 left-0 w-[2px] bg-blue-500 transition-all duration-300 ease-out"
        style={{
          height: isHovered ? '100%' : '0%',
          transitionDelay: isHovered ? '0.45s' : '0s'
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
};

// --- 5. HOVER FILL UP ---
// Background fills from bottom to top
export const HoverFillUp: React.FC<HoverEffectProps & { fillColor?: string }> = ({
  children,
  className = '',
  fillColor = 'rgba(59, 130, 246, 0.2)'
}) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className="absolute inset-x-0 bottom-0 transition-all duration-400 ease-out hover-parent-fill"
        style={{
          height: '0%',
          backgroundColor: fillColor,
        }}
      />
      <div className="relative z-10">{children}</div>
      <style>{`
        .${CSS.escape(className.split(' ')[0] || 'hover-fill-wrapper')}:hover .hover-parent-fill,
        div:hover > .hover-parent-fill {
          height: 100% !important;
        }
      `}</style>
    </div>
  );
};

// Simpler version using state
export const HoverFillUpSimple: React.FC<HoverEffectProps & { fillColor?: string }> = ({
  children,
  className = '',
  fillColor = 'rgba(59, 130, 246, 0.2)'
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="absolute inset-x-0 bottom-0 transition-all duration-400 ease-out"
        style={{
          height: isHovered ? '100%' : '0%',
          backgroundColor: fillColor,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

// --- 6. HOVER FILL LEFT ---
// Background fills from left to right
export const HoverFillLeft: React.FC<HoverEffectProps & { fillColor?: string }> = ({
  children,
  className = '',
  fillColor = 'rgba(59, 130, 246, 0.2)'
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="absolute inset-y-0 left-0 transition-all duration-400 ease-out"
        style={{
          width: isHovered ? '100%' : '0%',
          backgroundColor: fillColor,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

// --- 7. HOVER SKEW ---
// Element skews slightly on hover
export const HoverSkew: React.FC<HoverEffectProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`transition-transform duration-300 ease-out hover:skew-x-[-3deg] hover:skew-y-[1deg] ${className}`}
    >
      {children}
    </div>
  );
};

// --- 8. HOVER BOUNCE ---
// Element bounces on hover
export const HoverBounce: React.FC<HoverEffectProps> = ({ children, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [bouncePhase, setBouncePhase] = useState(0);

  useEffect(() => {
    if (isHovered) {
      const sequence = [
        { delay: 0, phase: 1 },
        { delay: 100, phase: 2 },
        { delay: 200, phase: 3 },
        { delay: 300, phase: 4 },
        { delay: 400, phase: 0 },
      ];

      const timeouts = sequence.map(({ delay, phase }) =>
        setTimeout(() => setBouncePhase(phase), delay)
      );

      return () => timeouts.forEach(clearTimeout);
    } else {
      setBouncePhase(0);
    }
  }, [isHovered]);

  const getTransform = () => {
    switch (bouncePhase) {
      case 1: return 'translateY(-12px)';
      case 2: return 'translateY(0px)';
      case 3: return 'translateY(-6px)';
      case 4: return 'translateY(0px)';
      default: return 'translateY(0px)';
    }
  };

  return (
    <div
      className={`transition-transform duration-100 ease-out ${className}`}
      style={{ transform: getTransform() }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </div>
  );
};

// --- 9. HOVER SHAKE ---
// Element shakes on hover
export const HoverShake: React.FC<HoverEffectProps> = ({ children, className = '' }) => {
  const [isShaking, setIsShaking] = useState(false);
  const [shakeOffset, setShakeOffset] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isShaking) {
      let count = 0;
      intervalRef.current = setInterval(() => {
        count++;
        const offsets = [-3, 3, -2, 2, -1, 1, 0];
        setShakeOffset(offsets[count % offsets.length]);
        if (count >= 14) {
          setShakeOffset(0);
          if (intervalRef.current) clearInterval(intervalRef.current);
        }
      }, 40);
    } else {
      setShakeOffset(0);
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isShaking]);

  return (
    <div
      className={className}
      style={{
        transform: `translateX(${shakeOffset}px)`,
        transition: 'transform 0.04s ease-in-out'
      }}
      onMouseEnter={() => setIsShaking(true)}
      onMouseLeave={() => setIsShaking(false)}
    >
      {children}
    </div>
  );
};

// --- 10. HOVER PULSE ---
// Element pulses/throbs on hover
export const HoverPulse: React.FC<HoverEffectProps> = ({ children, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={className}
      style={{
        animation: isHovered ? 'hover-pulse 0.8s ease-in-out infinite' : 'none',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      <style>{`
        @keyframes hover-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
};

// --- 11. HOVER UNDERLINE GROW ---
// Underline grows from center
export const HoverUnderlineGrow: React.FC<HoverEffectProps & { lineColor?: string }> = ({
  children,
  className = '',
  lineColor = '#3b82f6'
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      <div
        className="absolute bottom-0 left-1/2 h-[2px] transition-all duration-300 ease-out"
        style={{
          width: isHovered ? '100%' : '0%',
          transform: 'translateX(-50%)',
          backgroundColor: lineColor,
        }}
      />
    </div>
  );
};

// --- 12. HOVER ICON SLIDE ---
// Icon slides in on hover
export const HoverIconSlide: React.FC<HoverEffectProps & {
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}> = ({
  children,
  className = '',
  icon = <span>-&gt;</span>,
  iconPosition = 'right'
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative overflow-hidden inline-flex items-center gap-2 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {iconPosition === 'left' && (
        <span
          className="transition-all duration-300 ease-out"
          style={{
            transform: isHovered ? 'translateX(0)' : 'translateX(-20px)',
            opacity: isHovered ? 1 : 0,
          }}
        >
          {icon}
        </span>
      )}
      <span
        className="transition-all duration-300 ease-out"
        style={{
          transform: isHovered
            ? iconPosition === 'right' ? 'translateX(-8px)' : 'translateX(8px)'
            : 'translateX(0)',
        }}
      >
        {children}
      </span>
      {iconPosition === 'right' && (
        <span
          className="transition-all duration-300 ease-out"
          style={{
            transform: isHovered ? 'translateX(0)' : 'translateX(20px)',
            opacity: isHovered ? 1 : 0,
          }}
        >
          {icon}
        </span>
      )}
    </div>
  );
};

// ============================================
// DEMO COMPONENTS
// ============================================

// Demo wrapper for displaying hover effects with examples
const DemoCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="flex flex-col items-center gap-3">
    <span className="text-zinc-400 font-mono text-xs uppercase tracking-wide">{title}</span>
    {children}
  </div>
);

const SampleButton: React.FC<{ children: React.ReactNode; variant?: 'primary' | 'secondary' }> = ({
  children,
  variant = 'primary'
}) => (
  <button className={`px-6 py-3 rounded-lg font-medium transition-colors ${
    variant === 'primary'
      ? 'bg-blue-600 text-white'
      : 'bg-zinc-700 text-zinc-200'
  }`}>
    {children}
  </button>
);

const SampleCard: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-zinc-800 rounded-xl p-4 shadow-lg border border-zinc-700 w-32 text-center">
    <div className="text-2xl mb-2">&#9733;</div>
    <div className="text-white text-sm">{children}</div>
  </div>
);

// --- HOVER LIFT DEMO ---
export const HoverLiftDemo: React.FC = () => (
  <div className="h-full bg-zinc-900 flex flex-col items-center justify-center p-6">
    <h3 className="text-white font-bold text-lg mb-6">Hover Lift Effect</h3>
    <div className="flex gap-8">
      <DemoCard title="Button">
        <HoverLift>
          <SampleButton>Lift Me</SampleButton>
        </HoverLift>
      </DemoCard>
      <DemoCard title="Card">
        <HoverLift>
          <SampleCard>Card</SampleCard>
        </HoverLift>
      </DemoCard>
    </div>
    <p className="text-zinc-500 text-xs mt-6 font-mono">Hover to see the lift effect</p>
  </div>
);

// --- HOVER GLOW DEMO ---
export const HoverGlowDemo: React.FC = () => (
  <div className="h-full bg-zinc-900 flex flex-col items-center justify-center p-6">
    <h3 className="text-white font-bold text-lg mb-6">Hover Glow Effect</h3>
    <div className="flex gap-8">
      <DemoCard title="Button">
        <HoverGlow className="rounded-lg">
          <SampleButton>Glow</SampleButton>
        </HoverGlow>
      </DemoCard>
      <DemoCard title="Card">
        <HoverGlow className="rounded-xl">
          <SampleCard>Card</SampleCard>
        </HoverGlow>
      </DemoCard>
    </div>
    <p className="text-zinc-500 text-xs mt-6 font-mono">Hover to see the glow effect</p>
  </div>
);

// --- HOVER SHINE DEMO ---
export const HoverShineDemo: React.FC = () => (
  <div className="h-full bg-zinc-900 flex flex-col items-center justify-center p-6">
    <h3 className="text-white font-bold text-lg mb-6">Hover Shine Effect</h3>
    <div className="flex gap-8">
      <DemoCard title="Button">
        <HoverShine className="rounded-lg">
          <SampleButton>Shine</SampleButton>
        </HoverShine>
      </DemoCard>
      <DemoCard title="Card">
        <HoverShine className="rounded-xl">
          <SampleCard>Card</SampleCard>
        </HoverShine>
      </DemoCard>
    </div>
    <p className="text-zinc-500 text-xs mt-6 font-mono">Hover to see the shine sweep</p>
  </div>
);

// --- HOVER BORDER DRAW DEMO ---
export const HoverBorderDrawDemo: React.FC = () => (
  <div className="h-full bg-zinc-900 flex flex-col items-center justify-center p-6">
    <h3 className="text-white font-bold text-lg mb-6">Hover Border Draw Effect</h3>
    <div className="flex gap-8">
      <DemoCard title="Button">
        <HoverBorderDraw>
          <SampleButton variant="secondary">Border</SampleButton>
        </HoverBorderDraw>
      </DemoCard>
      <DemoCard title="Card">
        <HoverBorderDraw>
          <SampleCard>Card</SampleCard>
        </HoverBorderDraw>
      </DemoCard>
    </div>
    <p className="text-zinc-500 text-xs mt-6 font-mono">Hover to see the border draw around</p>
  </div>
);

// --- HOVER FILL UP DEMO ---
export const HoverFillUpDemo: React.FC = () => (
  <div className="h-full bg-zinc-900 flex flex-col items-center justify-center p-6">
    <h3 className="text-white font-bold text-lg mb-6">Hover Fill Up Effect</h3>
    <div className="flex gap-8">
      <DemoCard title="Button">
        <HoverFillUpSimple className="rounded-lg" fillColor="rgba(34, 197, 94, 0.3)">
          <SampleButton variant="secondary">Fill Up</SampleButton>
        </HoverFillUpSimple>
      </DemoCard>
      <DemoCard title="Card">
        <HoverFillUpSimple className="rounded-xl" fillColor="rgba(59, 130, 246, 0.2)">
          <SampleCard>Card</SampleCard>
        </HoverFillUpSimple>
      </DemoCard>
    </div>
    <p className="text-zinc-500 text-xs mt-6 font-mono">Hover to see background fill from bottom</p>
  </div>
);

// --- HOVER FILL LEFT DEMO ---
export const HoverFillLeftDemo: React.FC = () => (
  <div className="h-full bg-zinc-900 flex flex-col items-center justify-center p-6">
    <h3 className="text-white font-bold text-lg mb-6">Hover Fill Left Effect</h3>
    <div className="flex gap-8">
      <DemoCard title="Button">
        <HoverFillLeft className="rounded-lg" fillColor="rgba(168, 85, 247, 0.3)">
          <SampleButton variant="secondary">Fill Left</SampleButton>
        </HoverFillLeft>
      </DemoCard>
      <DemoCard title="Card">
        <HoverFillLeft className="rounded-xl" fillColor="rgba(236, 72, 153, 0.2)">
          <SampleCard>Card</SampleCard>
        </HoverFillLeft>
      </DemoCard>
    </div>
    <p className="text-zinc-500 text-xs mt-6 font-mono">Hover to see background fill from left</p>
  </div>
);

// --- HOVER SKEW DEMO ---
export const HoverSkewDemo: React.FC = () => (
  <div className="h-full bg-zinc-900 flex flex-col items-center justify-center p-6">
    <h3 className="text-white font-bold text-lg mb-6">Hover Skew Effect</h3>
    <div className="flex gap-8">
      <DemoCard title="Button">
        <HoverSkew>
          <SampleButton>Skew</SampleButton>
        </HoverSkew>
      </DemoCard>
      <DemoCard title="Card">
        <HoverSkew>
          <SampleCard>Card</SampleCard>
        </HoverSkew>
      </DemoCard>
    </div>
    <p className="text-zinc-500 text-xs mt-6 font-mono">Hover to see the skew transformation</p>
  </div>
);

// --- HOVER BOUNCE DEMO ---
export const HoverBounceDemo: React.FC = () => (
  <div className="h-full bg-zinc-900 flex flex-col items-center justify-center p-6">
    <h3 className="text-white font-bold text-lg mb-6">Hover Bounce Effect</h3>
    <div className="flex gap-8">
      <DemoCard title="Button">
        <HoverBounce>
          <SampleButton>Bounce</SampleButton>
        </HoverBounce>
      </DemoCard>
      <DemoCard title="Card">
        <HoverBounce>
          <SampleCard>Card</SampleCard>
        </HoverBounce>
      </DemoCard>
    </div>
    <p className="text-zinc-500 text-xs mt-6 font-mono">Hover to see the bounce animation</p>
  </div>
);

// --- HOVER SHAKE DEMO ---
export const HoverShakeDemo: React.FC = () => (
  <div className="h-full bg-zinc-900 flex flex-col items-center justify-center p-6">
    <h3 className="text-white font-bold text-lg mb-6">Hover Shake Effect</h3>
    <div className="flex gap-8">
      <DemoCard title="Button">
        <HoverShake>
          <SampleButton>Shake</SampleButton>
        </HoverShake>
      </DemoCard>
      <DemoCard title="Card">
        <HoverShake>
          <SampleCard>Card</SampleCard>
        </HoverShake>
      </DemoCard>
    </div>
    <p className="text-zinc-500 text-xs mt-6 font-mono">Hover to see the shake animation</p>
  </div>
);

// --- HOVER PULSE DEMO ---
export const HoverPulseDemo: React.FC = () => (
  <div className="h-full bg-zinc-900 flex flex-col items-center justify-center p-6">
    <h3 className="text-white font-bold text-lg mb-6">Hover Pulse Effect</h3>
    <div className="flex gap-8">
      <DemoCard title="Button">
        <HoverPulse>
          <SampleButton>Pulse</SampleButton>
        </HoverPulse>
      </DemoCard>
      <DemoCard title="Card">
        <HoverPulse>
          <SampleCard>Card</SampleCard>
        </HoverPulse>
      </DemoCard>
    </div>
    <p className="text-zinc-500 text-xs mt-6 font-mono">Hover to see the pulse/throb animation</p>
  </div>
);

// --- HOVER UNDERLINE GROW DEMO ---
export const HoverUnderlineGrowDemo: React.FC = () => (
  <div className="h-full bg-zinc-900 flex flex-col items-center justify-center p-6">
    <h3 className="text-white font-bold text-lg mb-6">Hover Underline Grow Effect</h3>
    <div className="flex gap-12">
      <DemoCard title="Link Style">
        <HoverUnderlineGrow lineColor="#3b82f6">
          <span className="text-white text-lg cursor-pointer">Hover Me</span>
        </HoverUnderlineGrow>
      </DemoCard>
      <DemoCard title="Nav Item">
        <HoverUnderlineGrow lineColor="#22c55e">
          <span className="text-zinc-300 text-lg cursor-pointer">Navigation</span>
        </HoverUnderlineGrow>
      </DemoCard>
      <DemoCard title="Custom Color">
        <HoverUnderlineGrow lineColor="#f59e0b">
          <span className="text-zinc-300 text-lg cursor-pointer">Custom</span>
        </HoverUnderlineGrow>
      </DemoCard>
    </div>
    <p className="text-zinc-500 text-xs mt-6 font-mono">Hover to see underline grow from center</p>
  </div>
);

// --- HOVER ICON SLIDE DEMO ---
export const HoverIconSlideDemo: React.FC = () => (
  <div className="h-full bg-zinc-900 flex flex-col items-center justify-center p-6">
    <h3 className="text-white font-bold text-lg mb-6">Hover Icon Slide Effect</h3>
    <div className="flex gap-8">
      <DemoCard title="Right Icon">
        <HoverIconSlide icon={<span className="text-white">&#8594;</span>} iconPosition="right">
          <SampleButton>Learn More</SampleButton>
        </HoverIconSlide>
      </DemoCard>
      <DemoCard title="Left Icon">
        <HoverIconSlide icon={<span className="text-white">&#8592;</span>} iconPosition="left">
          <SampleButton variant="secondary">Go Back</SampleButton>
        </HoverIconSlide>
      </DemoCard>
    </div>
    <p className="text-zinc-500 text-xs mt-6 font-mono">Hover to see icon slide in</p>
  </div>
);

// --- COMBINED SHOWCASE ---
export const HoverEffectsShowcase: React.FC = () => {
  const effects = [
    { name: 'Lift', component: HoverLift },
    { name: 'Glow', component: HoverGlow },
    { name: 'Shine', component: HoverShine },
    { name: 'Border', component: HoverBorderDraw },
    { name: 'Fill Up', component: HoverFillUpSimple },
    { name: 'Fill Left', component: HoverFillLeft },
    { name: 'Skew', component: HoverSkew },
    { name: 'Bounce', component: HoverBounce },
    { name: 'Shake', component: HoverShake },
    { name: 'Pulse', component: HoverPulse },
  ];

  return (
    <div className="h-full bg-zinc-900 flex flex-col items-center justify-center p-6 overflow-auto">
      <h3 className="text-white font-bold text-xl mb-6">Hover Effects Showcase</h3>
      <div className="grid grid-cols-5 gap-4">
        {effects.map(({ name, component: Effect }) => (
          <Effect key={name} className="rounded-lg">
            <button className="px-4 py-2 bg-zinc-800 text-white rounded-lg border border-zinc-700 font-mono text-sm w-24">
              {name}
            </button>
          </Effect>
        ))}
      </div>
      <p className="text-zinc-500 text-xs mt-6 font-mono">Hover over each button to see the effect</p>
    </div>
  );
};

// ============================================
// EXPORTS
// ============================================

// Export individual effect components
export const hoverEffects: Record<string, React.FC<{ children: React.ReactNode }>> = {
  'hover-lift': HoverLift,
  'hover-glow': HoverGlow,
  'hover-shine': HoverShine,
  'hover-border-draw': HoverBorderDraw,
  'hover-fill-up': HoverFillUpSimple,
  'hover-fill-left': HoverFillLeft,
  'hover-skew': HoverSkew,
  'hover-bounce': HoverBounce,
  'hover-shake': HoverShake,
  'hover-pulse': HoverPulse,
  'hover-underline-grow': HoverUnderlineGrow as React.FC<{ children: React.ReactNode }>,
  'hover-icon-slide': HoverIconSlide as React.FC<{ children: React.ReactNode }>,
};

// Export demo components for the museum
export const hoverEffectDemos: Record<string, React.FC> = {
  'hover-lift-demo': HoverLiftDemo,
  'hover-glow-demo': HoverGlowDemo,
  'hover-shine-demo': HoverShineDemo,
  'hover-border-draw-demo': HoverBorderDrawDemo,
  'hover-fill-up-demo': HoverFillUpDemo,
  'hover-fill-left-demo': HoverFillLeftDemo,
  'hover-skew-demo': HoverSkewDemo,
  'hover-bounce-demo': HoverBounceDemo,
  'hover-shake-demo': HoverShakeDemo,
  'hover-pulse-demo': HoverPulseDemo,
  'hover-underline-grow-demo': HoverUnderlineGrowDemo,
  'hover-icon-slide-demo': HoverIconSlideDemo,
  'hover-effects-showcase': HoverEffectsShowcase,
};

export default hoverEffects;
