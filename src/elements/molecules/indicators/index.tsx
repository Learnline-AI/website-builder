// Molecule: Indicators
// Progress, loading, and status indicators composed of atoms
// Import ATOMS only - no molecules or organisms

import React from 'react';
import { ElementEntry } from '../../registry';

// ============================================
// INDICATOR STYLE PRESETS
// ============================================

export const indicatorStyles = {
  // Progress bar variants
  progressDefault: 'bg-gray-200 rounded-full overflow-hidden',
  progressNeon: 'bg-gray-900 rounded-none border border-[#33ff00]',
  progressBrutal: 'bg-white border-4 border-black rounded-none',
  progressGlass: 'bg-white/10 backdrop-blur-sm rounded-full border border-white/20',
  // Fill variants
  fillDefault: 'bg-blue-500',
  fillSuccess: 'bg-green-500',
  fillWarning: 'bg-amber-500',
  fillDanger: 'bg-red-500',
  fillNeon: 'bg-[#33ff00] shadow-[0_0_10px_rgba(51,255,0,0.5)]',
  fillArcade: 'bg-gradient-to-r from-pink-500 to-purple-500',
  fillCosmic: 'bg-gradient-to-r from-purple-500 to-indigo-500',
  // Spinner variants
  spinnerDefault: 'border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin',
  spinnerNeon: 'border-2 border-gray-800 border-t-[#33ff00] rounded-full animate-spin shadow-[0_0_10px_rgba(51,255,0,0.3)]',
  spinnerBrutal: 'border-4 border-black border-t-transparent rounded-full animate-spin',
};

// ============================================
// INDICATOR COMPONENTS
// ============================================

interface ProgressProps {
  value?: number;
  max?: number;
  variant?: string;
  fillVariant?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  animated?: boolean;
  className?: string;
}

export const ProgressBar: React.FC<ProgressProps> = ({
  value = 50,
  max = 100,
  variant = 'default',
  fillVariant = 'default',
  size = 'md',
  showLabel = false,
  animated = false,
  className = '',
}) => {
  const percent = Math.min(100, (value / max) * 100);
  const heights = { sm: 'h-1', md: 'h-2', lg: 'h-4' };
  const variants: Record<string, string> = {
    default: indicatorStyles.progressDefault,
    neon: indicatorStyles.progressNeon,
    brutal: indicatorStyles.progressBrutal,
    glass: indicatorStyles.progressGlass,
  };
  const fills: Record<string, string> = {
    default: indicatorStyles.fillDefault,
    success: indicatorStyles.fillSuccess,
    warning: indicatorStyles.fillWarning,
    danger: indicatorStyles.fillDanger,
    neon: indicatorStyles.fillNeon,
    arcade: indicatorStyles.fillArcade,
    cosmic: indicatorStyles.fillCosmic,
  };

  return (
    <div className={className}>
      <div className={`${variants[variant] || variants.default} ${heights[size]}`}>
        <div
          className={`h-full ${fills[fillVariant] || fills.default} ${animated ? 'transition-all duration-500' : ''}`}
          style={{ width: `${percent}%` }}
        />
      </div>
      {showLabel && <span className="text-sm mt-1 block">{Math.round(percent)}%</span>}
    </div>
  );
};

export const CircularProgress: React.FC<ProgressProps & { strokeWidth?: number }> = ({
  value = 50,
  max = 100,
  fillVariant = 'default',
  size = 'md',
  strokeWidth = 4,
  showLabel = true,
  className = '',
}) => {
  const percent = Math.min(100, (value / max) * 100);
  const sizes = { sm: 40, md: 64, lg: 96 };
  const dim = sizes[size];
  const radius = (dim - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percent / 100) * circumference;
  const colors: Record<string, string> = {
    default: '#3b82f6',
    success: '#22c55e',
    warning: '#f59e0b',
    danger: '#ef4444',
    neon: '#33ff00',
    arcade: '#ec4899',
    cosmic: '#8b5cf6',
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg width={dim} height={dim} className="transform -rotate-90">
        <circle cx={dim / 2} cy={dim / 2} r={radius} fill="none" stroke="currentColor" strokeWidth={strokeWidth} className="text-gray-200" />
        <circle
          cx={dim / 2} cy={dim / 2} r={radius} fill="none"
          stroke={colors[fillVariant] || colors.default}
          strokeWidth={strokeWidth} strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset}
          className="transition-all duration-500"
        />
      </svg>
      {showLabel && <span className="absolute text-sm font-medium">{Math.round(percent)}%</span>}
    </div>
  );
};

export const Spinner: React.FC<{ variant?: string; size?: 'sm' | 'md' | 'lg'; className?: string }> = ({
  variant = 'default',
  size = 'md',
  className = '',
}) => {
  const sizes = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12' };
  const variants: Record<string, string> = {
    default: indicatorStyles.spinnerDefault,
    neon: indicatorStyles.spinnerNeon,
    brutal: indicatorStyles.spinnerBrutal,
  };

  return <div className={`${sizes[size]} ${variants[variant] || variants.default} ${className}`} />;
};

export const DotsLoader: React.FC<{ variant?: string; size?: 'sm' | 'md' | 'lg'; className?: string }> = ({
  variant = 'default',
  size = 'md',
  className = '',
}) => {
  const sizes = { sm: 'w-1.5 h-1.5', md: 'w-2 h-2', lg: 'w-3 h-3' };
  const gaps = { sm: 'gap-1', md: 'gap-1.5', lg: 'gap-2' };
  const colors: Record<string, string> = {
    default: 'bg-blue-500',
    neon: 'bg-[#33ff00]',
    arcade: 'bg-pink-500',
    cosmic: 'bg-purple-500',
  };

  return (
    <div className={`flex items-center ${gaps[size]} ${className}`}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`${sizes[size]} ${colors[variant] || colors.default} rounded-full animate-bounce`}
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
};

export const PulseLoader: React.FC<{ variant?: string; size?: 'sm' | 'md' | 'lg'; className?: string }> = ({
  variant = 'default',
  size = 'md',
  className = '',
}) => {
  const sizes = { sm: 'w-6 h-6', md: 'w-10 h-10', lg: 'w-14 h-14' };
  const colors: Record<string, string> = {
    default: 'bg-blue-500',
    neon: 'bg-[#33ff00]',
    arcade: 'bg-pink-500',
    danger: 'bg-red-500',
  };

  return (
    <div className={`relative ${sizes[size]} ${className}`}>
      <div className={`absolute inset-0 ${colors[variant] || colors.default} rounded-full animate-ping opacity-75`} />
      <div className={`relative ${sizes[size]} ${colors[variant] || colors.default} rounded-full`} />
    </div>
  );
};

export const BarLoader: React.FC<{ variant?: string; className?: string }> = ({ variant = 'default', className = '' }) => {
  const colors: Record<string, string> = {
    default: 'bg-blue-500',
    neon: 'bg-[#33ff00]',
    arcade: 'bg-gradient-to-r from-pink-500 to-purple-500',
  };

  return (
    <div className={`w-full h-1 bg-gray-200 overflow-hidden ${className}`}>
      <div className={`h-full w-1/3 ${colors[variant] || colors.default} animate-[slide_1s_ease-in-out_infinite]`} />
    </div>
  );
};

export const Skeleton: React.FC<{ variant?: 'text' | 'circular' | 'rectangular'; width?: string; height?: string; className?: string }> = ({
  variant = 'text',
  width = '100%',
  height,
  className = '',
}) => {
  const shapes: Record<string, string> = {
    text: 'rounded h-4',
    circular: 'rounded-full',
    rectangular: 'rounded-md',
  };
  const defaultHeights: Record<string, string> = { text: '1rem', circular: '3rem', rectangular: '6rem' };

  return (
    <div
      className={`bg-gray-200 animate-pulse ${shapes[variant]} ${className}`}
      style={{ width, height: height || defaultHeights[variant] }}
    />
  );
};

export const StepIndicator: React.FC<{ steps?: number; current?: number; variant?: string; className?: string }> = ({
  steps = 4,
  current = 1,
  variant = 'default',
  className = '',
}) => {
  const colors: Record<string, { active: string; inactive: string; line: string }> = {
    default: { active: 'bg-blue-500 text-white', inactive: 'bg-gray-200 text-gray-500', line: 'bg-gray-200' },
    neon: { active: 'bg-[#33ff00] text-black', inactive: 'bg-gray-800 text-gray-500', line: 'bg-gray-700' },
    brutal: { active: 'bg-black text-white border-2 border-black', inactive: 'bg-white text-black border-2 border-black', line: 'bg-black' },
  };
  const c = colors[variant] || colors.default;

  return (
    <div className={`flex items-center ${className}`}>
      {Array.from({ length: steps }, (_, i) => (
        <React.Fragment key={i}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${i + 1 <= current ? c.active : c.inactive}`}>
            {i + 1}
          </div>
          {i < steps - 1 && <div className={`flex-1 h-0.5 mx-2 ${i + 1 < current ? c.active.split(' ')[0] : c.line}`} />}
        </React.Fragment>
      ))}
    </div>
  );
};

export const StatusDot: React.FC<{ status?: 'online' | 'offline' | 'busy' | 'away'; pulse?: boolean; size?: 'sm' | 'md' | 'lg'; className?: string }> = ({
  status = 'online',
  pulse = true,
  size = 'md',
  className = '',
}) => {
  const sizes = { sm: 'w-2 h-2', md: 'w-3 h-3', lg: 'w-4 h-4' };
  const colors: Record<string, string> = { online: 'bg-green-500', offline: 'bg-gray-400', busy: 'bg-red-500', away: 'bg-amber-500' };

  return (
    <span className={`relative inline-flex ${className}`}>
      <span className={`${sizes[size]} ${colors[status]} rounded-full`} />
      {pulse && status === 'online' && (
        <span className={`absolute inset-0 ${sizes[size]} ${colors[status]} rounded-full animate-ping opacity-75`} />
      )}
    </span>
  );
};

export const RatingIndicator: React.FC<{ value?: number; max?: number; size?: 'sm' | 'md' | 'lg'; className?: string }> = ({
  value = 3,
  max = 5,
  size = 'md',
  className = '',
}) => {
  const sizes = { sm: 'w-4 h-4', md: 'w-5 h-5', lg: 'w-6 h-6' };

  return (
    <div className={`flex gap-0.5 ${className}`}>
      {Array.from({ length: max }, (_, i) => (
        <svg key={i} className={`${sizes[size]} ${i < value ? 'text-amber-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

export const HealthBar: React.FC<{ value?: number; max?: number; variant?: string; showLabel?: boolean; className?: string }> = ({
  value = 75,
  max = 100,
  variant = 'default',
  showLabel = false,
  className = '',
}) => {
  const percent = Math.min(100, (value / max) * 100);
  const getColor = () => {
    if (percent > 60) return 'bg-green-500';
    if (percent > 30) return 'bg-amber-500';
    return 'bg-red-500';
  };
  const variants: Record<string, string> = {
    default: 'bg-gray-200 rounded-full',
    brutal: 'bg-white border-2 border-black rounded-none',
    neon: 'bg-gray-900 border border-[#33ff00] rounded-none',
  };

  return (
    <div className={className}>
      {showLabel && <span className="text-xs mb-1 block">{value}/{max}</span>}
      <div className={`h-3 overflow-hidden ${variants[variant] || variants.default}`}>
        <div className={`h-full ${getColor()} transition-all duration-300`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
};

export const LevelIndicator: React.FC<{ level?: number; maxLevel?: number; variant?: string; className?: string }> = ({
  level = 5,
  maxLevel = 10,
  variant = 'default',
  className = '',
}) => {
  const colors: Record<string, { filled: string; empty: string }> = {
    default: { filled: 'bg-blue-500', empty: 'bg-gray-200' },
    neon: { filled: 'bg-[#33ff00]', empty: 'bg-gray-800' },
    arcade: { filled: 'bg-pink-500', empty: 'bg-gray-300' },
  };
  const c = colors[variant] || colors.default;

  return (
    <div className={`flex gap-1 ${className}`}>
      {Array.from({ length: maxLevel }, (_, i) => (
        <div key={i} className={`w-2 h-4 rounded-sm ${i < level ? c.filled : c.empty}`} />
      ))}
    </div>
  );
};

// ============================================
// REGISTRY ENTRIES
// ============================================

const createIndicatorEntry = (id: string, name: string, description: string, tags: string[], component: React.FC<any>, composedOf: string[] = []): ElementEntry => ({
  id: `indicator-${id}`, name, layer: 'molecule', category: 'indicators', description, themeAgnostic: false, composedOf,
  sourceComponents: ['multiple-zones'], extractedFrom: 'src/elements/molecules/indicators/index.tsx',
  previewType: 'inline', hasInteraction: false, implementation: 'component', component,
  codeSnippet: `<${name.replace(/\\s/g, '')} />`, tags: ['indicator', 'progress', 'status', ...tags],
});

export const indicatorRegistry: ElementEntry[] = [
  // Progress bars
  createIndicatorEntry('progress-default', 'Progress Bar', 'Standard progress bar', ['progress', 'bar', 'default'], ProgressBar, ['border-radius-full']),
  createIndicatorEntry('progress-neon', 'Neon Progress', 'Glowing progress bar', ['progress', 'neon', 'glow'], ProgressBar, ['glow-green']),
  createIndicatorEntry('progress-brutal', 'Brutal Progress', 'Neo-brutal progress bar', ['progress', 'brutal'], ProgressBar, ['border-brutal']),
  createIndicatorEntry('progress-glass', 'Glass Progress', 'Frosted glass progress', ['progress', 'glass'], ProgressBar, ['surface-glass']),
  // Circular progress
  createIndicatorEntry('circular-default', 'Circular Progress', 'Circular progress indicator', ['circular', 'radial', 'default'], CircularProgress, []),
  createIndicatorEntry('circular-neon', 'Neon Circular', 'Glowing circular progress', ['circular', 'neon'], CircularProgress, ['glow-green']),
  // Spinners
  createIndicatorEntry('spinner-default', 'Spinner', 'Loading spinner', ['spinner', 'loading', 'default'], Spinner, ['anim-spin']),
  createIndicatorEntry('spinner-neon', 'Neon Spinner', 'Glowing spinner', ['spinner', 'neon', 'glow'], Spinner, ['anim-spin', 'glow-green']),
  createIndicatorEntry('spinner-brutal', 'Brutal Spinner', 'Neo-brutal spinner', ['spinner', 'brutal'], Spinner, ['anim-spin', 'border-brutal']),
  // Loaders
  createIndicatorEntry('dots-loader', 'Dots Loader', 'Bouncing dots loader', ['dots', 'loading', 'bounce'], DotsLoader, ['anim-bounce']),
  createIndicatorEntry('pulse-loader', 'Pulse Loader', 'Pulsing circle loader', ['pulse', 'loading', 'ping'], PulseLoader, ['anim-ping']),
  createIndicatorEntry('bar-loader', 'Bar Loader', 'Sliding bar loader', ['bar', 'loading', 'slide'], BarLoader, []),
  // Skeleton
  createIndicatorEntry('skeleton-text', 'Text Skeleton', 'Text placeholder skeleton', ['skeleton', 'placeholder', 'text'], Skeleton, ['anim-pulse']),
  createIndicatorEntry('skeleton-circular', 'Circular Skeleton', 'Avatar placeholder', ['skeleton', 'avatar', 'circular'], Skeleton, ['anim-pulse', 'border-radius-full']),
  createIndicatorEntry('skeleton-rect', 'Rectangular Skeleton', 'Image placeholder', ['skeleton', 'image', 'rectangular'], Skeleton, ['anim-pulse', 'border-radius-md']),
  // Steps
  createIndicatorEntry('step-default', 'Step Indicator', 'Multi-step progress', ['step', 'wizard', 'default'], StepIndicator, []),
  createIndicatorEntry('step-neon', 'Neon Steps', 'Glowing step indicator', ['step', 'neon'], StepIndicator, ['glow-green']),
  createIndicatorEntry('step-brutal', 'Brutal Steps', 'Neo-brutal steps', ['step', 'brutal'], StepIndicator, ['border-brutal']),
  // Status
  createIndicatorEntry('status-dot', 'Status Dot', 'Online/offline indicator', ['status', 'dot', 'online'], StatusDot, []),
  createIndicatorEntry('rating', 'Rating Stars', 'Star rating display', ['rating', 'stars', 'review'], RatingIndicator, []),
  // Game-style
  createIndicatorEntry('health-bar', 'Health Bar', 'Game-style health bar', ['health', 'game', 'hp'], HealthBar, []),
  createIndicatorEntry('health-brutal', 'Brutal Health Bar', 'Neo-brutal health bar', ['health', 'brutal', 'game'], HealthBar, ['border-brutal']),
  createIndicatorEntry('health-neon', 'Neon Health Bar', 'Glowing health bar', ['health', 'neon', 'game'], HealthBar, ['glow-green']),
  createIndicatorEntry('level', 'Level Indicator', 'Segmented level display', ['level', 'segments', 'game'], LevelIndicator, []),
  createIndicatorEntry('level-neon', 'Neon Level', 'Glowing level indicator', ['level', 'neon', 'game'], LevelIndicator, ['glow-green']),
  createIndicatorEntry('level-arcade', 'Arcade Level', 'Arcade style level', ['level', 'arcade', 'game'], LevelIndicator, []),
];
