// Molecule: Buttons
// Button components composed of atoms
// Import ATOMS only - no molecules or organisms

import React from 'react';
import { ElementEntry } from '../../registry';

// ============================================
// BUTTON STYLE PRESETS (Atom Compositions)
// ============================================

export const buttonStyles = {
  // Base button classes
  base: 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',

  // Size variants
  sizes: {
    xs: 'px-2 py-1 text-xs rounded',
    sm: 'px-3 py-1.5 text-sm rounded-md',
    md: 'px-4 py-2 text-base rounded-md',
    lg: 'px-6 py-3 text-lg rounded-lg',
    xl: 'px-8 py-4 text-xl rounded-xl',
  },

  // Primary variants
  primary: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500',
  secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
  ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
  outline: 'border-2 border-current bg-transparent hover:bg-gray-50 focus:ring-gray-500',

  // Semantic variants
  success: 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500',
  warning: 'bg-amber-500 text-white hover:bg-amber-600 focus:ring-amber-500',
  danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
  info: 'bg-cyan-500 text-white hover:bg-cyan-600 focus:ring-cyan-500',

  // Neo-brutal style
  brutal: 'bg-white border-4 border-black shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]',
  brutalPrimary: 'bg-blue-500 text-white border-4 border-black shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px]',
  brutalDanger: 'bg-red-500 text-white border-4 border-black shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px]',

  // Neon/Hacker style
  neon: 'bg-black text-[#33ff00] border-2 border-[#33ff00] shadow-[0_0_10px_rgba(51,255,0,0.5)] hover:shadow-[0_0_20px_rgba(51,255,0,0.7)] hover:bg-[#33ff00]/10',
  neonPink: 'bg-black text-pink-500 border-2 border-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.5)] hover:shadow-[0_0_20px_rgba(236,72,153,0.7)]',
  neonCyan: 'bg-black text-cyan-400 border-2 border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)] hover:shadow-[0_0_20px_rgba(34,211,238,0.7)]',

  // Glass/Frosted style
  glass: 'bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20',
  glassDark: 'bg-black/20 backdrop-blur-md text-white border border-white/10 hover:bg-black/30',

  // Retro/Arcade style
  arcade: 'bg-gradient-to-b from-pink-500 to-purple-600 text-white border-2 border-white/30 shadow-lg hover:from-pink-400 hover:to-purple-500',
  retro: 'bg-amber-600 text-amber-100 border-2 border-amber-800 shadow-inner hover:bg-amber-500',

  // Cosmic style
  cosmic: 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.5)] hover:shadow-[0_0_25px_rgba(139,92,246,0.7)]',

  // Organic style
  organic: 'bg-green-600 text-white rounded-full hover:bg-green-500 shadow-md',
};

// ============================================
// BUTTON COMPONENTS
// ============================================

interface ButtonProps {
  children: React.ReactNode;
  variant?: keyof typeof buttonStyles | string;
  size?: keyof typeof buttonStyles.sizes;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  onClick,
}) => {
  const variantClass = buttonStyles[variant as keyof typeof buttonStyles] || variant;
  const sizeClass = buttonStyles.sizes[size];

  return (
    <button
      className={`${buttonStyles.base} ${sizeClass} ${variantClass} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const IconButton: React.FC<ButtonProps & { icon: React.ReactNode }> = ({
  icon,
  variant = 'ghost',
  size = 'md',
  className = '',
  disabled = false,
  onClick,
}) => {
  const sizeClasses = {
    xs: 'p-1',
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-3',
    xl: 'p-4',
  };

  const variantClass = buttonStyles[variant as keyof typeof buttonStyles] || variant;

  return (
    <button
      className={`inline-flex items-center justify-center rounded-full transition-all duration-200 focus:outline-none focus:ring-2 ${sizeClasses[size]} ${variantClass} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {icon}
    </button>
  );
};

export const RippleButton: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
}) => {
  const [ripples, setRipples] = React.useState<{ x: number; y: number; id: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600);

    onClick?.();
  };

  const variantClass = buttonStyles[variant as keyof typeof buttonStyles] || variant;
  const sizeClass = buttonStyles.sizes[size];

  return (
    <button
      className={`${buttonStyles.base} ${sizeClass} ${variantClass} relative overflow-hidden ${className}`}
      onClick={handleClick}
    >
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full animate-[ripple_0.6s_ease-out]"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
          }}
        />
      ))}
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export const LoadingButton: React.FC<ButtonProps & { loading?: boolean }> = ({
  children,
  loading = false,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  onClick,
}) => {
  const variantClass = buttonStyles[variant as keyof typeof buttonStyles] || variant;
  const sizeClass = buttonStyles.sizes[size];

  return (
    <button
      className={`${buttonStyles.base} ${sizeClass} ${variantClass} ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  );
};

export const ToggleButton: React.FC<{
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  children: React.ReactNode;
  className?: string;
}> = ({ pressed = false, onPressedChange, children, className = '' }) => {
  return (
    <button
      className={`${buttonStyles.base} ${buttonStyles.sizes.md} ${
        pressed ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      } ${className}`}
      onClick={() => onPressedChange?.(!pressed)}
      aria-pressed={pressed}
    >
      {children}
    </button>
  );
};

export const ButtonGroup: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`inline-flex rounded-md shadow-sm ${className}`} role="group">
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;
        const isFirst = index === 0;
        const isLast = index === React.Children.count(children) - 1;
        const childProps = child.props as { className?: string };
        return React.cloneElement(child as React.ReactElement<{ className?: string }>, {
          className: `${childProps.className || ''} ${isFirst ? 'rounded-r-none' : ''} ${isLast ? 'rounded-l-none' : ''} ${!isFirst && !isLast ? 'rounded-none' : ''} ${!isFirst ? '-ml-px' : ''}`,
        });
      })}
    </div>
  );
};

// ============================================
// REGISTRY ENTRIES
// ============================================

const createButtonEntry = (
  id: string,
  name: string,
  description: string,
  tags: string[],
  component: React.FC<ButtonProps>,
  composedOf: string[] = []
): ElementEntry => ({
  id: `btn-${id}`,
  name,
  layer: 'molecule',
  category: 'buttons',
  description,
  themeAgnostic: false,
  composedOf,
  sourceComponents: ['multiple-zones'],
  extractedFrom: 'src/elements/molecules/buttons/index.tsx',
  previewType: 'inline',
  hasInteraction: true,
  implementation: 'component',
  component,
  codeSnippet: `<Button variant="${id}">{children}</Button>`,
  tags: ['button', 'interactive', ...tags],
});

export const buttonRegistry: ElementEntry[] = [
  // Primary variants
  createButtonEntry('primary', 'Primary Button', 'Main action button', ['primary', 'action'], Button, ['color-info', 'border-radius-md']),
  createButtonEntry('secondary', 'Secondary Button', 'Secondary action button', ['secondary', 'action'], Button, ['color-neutral', 'border-radius-md']),
  createButtonEntry('ghost', 'Ghost Button', 'Transparent hover button', ['ghost', 'minimal'], Button, ['border-radius-md']),
  createButtonEntry('outline', 'Outline Button', 'Bordered transparent button', ['outline', 'bordered'], Button, ['border-width-medium', 'border-radius-md']),

  // Semantic variants
  createButtonEntry('success', 'Success Button', 'Positive action button', ['success', 'positive', 'green'], Button, ['color-success', 'border-radius-md']),
  createButtonEntry('warning', 'Warning Button', 'Warning action button', ['warning', 'caution', 'amber'], Button, ['color-warning', 'border-radius-md']),
  createButtonEntry('danger', 'Danger Button', 'Destructive action button', ['danger', 'destructive', 'red'], Button, ['color-error', 'border-radius-md']),
  createButtonEntry('info', 'Info Button', 'Informational button', ['info', 'cyan'], Button, ['color-info', 'border-radius-md']),

  // Neo-brutal style
  createButtonEntry('brutal', 'Neo-Brutal Button', 'Hard shadow brutalist button', ['brutal', 'neo-brutal', 'hard-shadow'], Button, ['shadow-hard-4', 'border-brutal']),
  createButtonEntry('brutal-primary', 'Neo-Brutal Primary', 'Blue brutalist button', ['brutal', 'neo-brutal', 'primary'], Button, ['shadow-hard-4', 'border-brutal', 'color-info']),
  createButtonEntry('brutal-danger', 'Neo-Brutal Danger', 'Red brutalist button', ['brutal', 'neo-brutal', 'danger'], Button, ['shadow-hard-4', 'border-brutal', 'color-error']),

  // Neon/Hacker style
  createButtonEntry('neon', 'Neon Green Button', 'Glowing terminal-style button', ['neon', 'hacker', 'glow', 'green'], Button, ['glow-green', 'border-neon-green']),
  createButtonEntry('neon-pink', 'Neon Pink Button', 'Pink glowing button', ['neon', 'arcade', 'glow', 'pink'], Button, ['glow-pink']),
  createButtonEntry('neon-cyan', 'Neon Cyan Button', 'Cyan glowing button', ['neon', 'glow', 'cyan'], Button, ['glow-cyan']),

  // Glass style
  createButtonEntry('glass', 'Glass Button', 'Frosted glass button', ['glass', 'blur', 'transparent'], Button, ['surface-glass', 'backdrop-blur-md']),
  createButtonEntry('glass-dark', 'Glass Dark Button', 'Dark frosted glass button', ['glass', 'blur', 'dark'], Button, ['surface-glass-dark', 'backdrop-blur-md']),

  // Themed styles
  createButtonEntry('arcade', 'Arcade Button', 'Retro arcade gradient button', ['arcade', 'retro', 'gradient'], Button, ['gradient-neon-pink']),
  createButtonEntry('cosmic', 'Cosmic Button', 'Space-themed glowing button', ['cosmic', 'space', 'glow'], Button, ['gradient-cosmic', 'glow-purple']),
  createButtonEntry('organic', 'Organic Button', 'Natural rounded button', ['organic', 'natural', 'rounded'], Button, ['color-organic-primary', 'border-radius-full']),

  // Special components
  createButtonEntry('icon', 'Icon Button', 'Circular icon-only button', ['icon', 'circular'], IconButton as React.FC<ButtonProps>, ['border-radius-full']),
  createButtonEntry('ripple', 'Ripple Button', 'Button with click ripple effect', ['ripple', 'animation', 'material'], RippleButton, ['anim-ripple']),
  createButtonEntry('loading', 'Loading Button', 'Button with loading spinner', ['loading', 'async', 'spinner'], LoadingButton as React.FC<ButtonProps>, ['anim-spin']),
  createButtonEntry('toggle', 'Toggle Button', 'Pressable toggle button', ['toggle', 'pressed', 'switch'], ToggleButton as React.FC<ButtonProps>, []),
  createButtonEntry('group', 'Button Group', 'Grouped button container', ['group', 'segmented'], ButtonGroup as React.FC<ButtonProps>, []),
];
