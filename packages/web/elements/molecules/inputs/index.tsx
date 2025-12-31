// Molecule: Inputs
// Input components composed of atoms
// Import ATOMS only - no molecules or organisms

import React from 'react';
import { ElementEntry } from '../../registry';

// ============================================
// INPUT STYLE PRESETS
// ============================================

export const inputStyles = {
  base: 'w-full transition-all duration-200 focus:outline-none',
  sizes: {
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-2 text-base',
    lg: 'px-4 py-3 text-lg',
  },
  default: 'bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
  defaultDark: 'bg-zinc-800 border border-zinc-700 rounded-md text-white focus:ring-2 focus:ring-blue-500',
  filled: 'bg-gray-100 border-0 rounded-md focus:ring-2 focus:ring-blue-500',
  underline: 'bg-transparent border-0 border-b-2 border-gray-300 rounded-none focus:border-blue-500',
  brutal: 'bg-white border-4 border-black rounded-none shadow-[4px_4px_0_0_#000] focus:shadow-[2px_2px_0_0_#000]',
  neon: 'bg-black border-2 border-[#33ff00] text-[#33ff00] font-mono rounded-none shadow-[0_0_10px_rgba(51,255,0,0.3)]',
  glass: 'bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder:text-white/50',
  retro: 'bg-amber-50 border-2 border-amber-800 rounded text-amber-900 font-mono',
  error: 'border-red-500 focus:ring-red-500',
};

// ============================================
// INPUT COMPONENTS
// ============================================

interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  variant?: string;
  size?: keyof typeof inputStyles.sizes;
  disabled?: boolean;
  error?: boolean;
  className?: string;
}

export const TextInput: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  variant = 'default',
  size = 'md',
  disabled = false,
  error = false,
  className = '',
}) => {
  const variantClass = inputStyles[variant as keyof typeof inputStyles] || inputStyles.default;
  const sizeClass = inputStyles.sizes[size];

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      disabled={disabled}
      className={`${inputStyles.base} ${sizeClass} ${variantClass} ${error ? inputStyles.error : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    />
  );
};

export const TextArea: React.FC<InputProps & { rows?: number }> = ({
  placeholder,
  value,
  onChange,
  variant = 'default',
  size = 'md',
  rows = 4,
  disabled = false,
  error = false,
  className = '',
}) => {
  const variantClass = inputStyles[variant as keyof typeof inputStyles] || inputStyles.default;
  const sizeClass = inputStyles.sizes[size];

  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      rows={rows}
      disabled={disabled}
      className={`${inputStyles.base} ${sizeClass} ${variantClass} ${error ? inputStyles.error : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} resize-none ${className}`}
    />
  );
};

export const SearchInput: React.FC<InputProps> = ({
  placeholder = 'Search...',
  value,
  onChange,
  variant = 'default',
  size = 'md',
  className = '',
}) => {
  const variantClass = inputStyles[variant as keyof typeof inputStyles] || inputStyles.default;
  const sizeClass = inputStyles.sizes[size];

  return (
    <div className="relative">
      <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className={`${inputStyles.base} ${sizeClass} ${variantClass} pl-10 ${className}`}
      />
    </div>
  );
};

export const PasswordInput: React.FC<InputProps> = ({ placeholder = 'Password', value, onChange, variant = 'default', size = 'md', className = '' }) => {
  const [show, setShow] = React.useState(false);
  const variantClass = inputStyles[variant as keyof typeof inputStyles] || inputStyles.default;
  const sizeClass = inputStyles.sizes[size];

  return (
    <div className="relative">
      <input
        type={show ? 'text' : 'password'}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className={`${inputStyles.base} ${sizeClass} ${variantClass} pr-10 ${className}`}
      />
      <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={show ? "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" : "M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"} />
        </svg>
      </button>
    </div>
  );
};

export const Slider: React.FC<{ value?: number; min?: number; max?: number; step?: number; onChange?: (v: number) => void; variant?: string; className?: string }> = ({
  value = 50, min = 0, max = 100, step = 1, onChange, variant = 'default', className = '',
}) => {
  const variants: Record<string, string> = { default: 'accent-blue-500', neon: 'accent-[#33ff00]', arcade: 'accent-pink-500', cosmic: 'accent-purple-500' };
  return (
    <input type="range" value={value} min={min} max={max} step={step} onChange={(e) => onChange?.(Number(e.target.value))}
      className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer ${variants[variant] || variants.default} ${className}`} />
  );
};

export const Toggle: React.FC<{ checked?: boolean; onChange?: (c: boolean) => void; variant?: string; size?: 'sm' | 'md' | 'lg'; className?: string }> = ({
  checked = false, onChange, variant = 'default', size = 'md', className = '',
}) => {
  const sizes = { sm: { track: 'w-8 h-4', thumb: 'w-3 h-3', translate: 'translate-x-4' }, md: { track: 'w-11 h-6', thumb: 'w-5 h-5', translate: 'translate-x-5' }, lg: { track: 'w-14 h-7', thumb: 'w-6 h-6', translate: 'translate-x-7' } };
  const variants: Record<string, { on: string; off: string }> = {
    default: { on: 'bg-blue-500', off: 'bg-gray-300' },
    neon: { on: 'bg-[#33ff00] shadow-[0_0_10px_rgba(51,255,0,0.5)]', off: 'bg-gray-700' },
    brutal: { on: 'bg-black', off: 'bg-white border-2 border-black' },
  };
  const s = sizes[size], v = variants[variant] || variants.default;
  return (
    <button type="button" role="switch" aria-checked={checked} onClick={() => onChange?.(!checked)}
      className={`relative inline-flex items-center rounded-full transition-colors duration-200 ${s.track} ${checked ? v.on : v.off} ${className}`}>
      <span className={`inline-block rounded-full bg-white shadow transform transition-transform duration-200 ${s.thumb} ${checked ? s.translate : 'translate-x-0.5'}`} />
    </button>
  );
};

export const Select: React.FC<{ options: { value: string; label: string }[]; value?: string; onChange?: (v: string) => void; placeholder?: string; variant?: string; size?: keyof typeof inputStyles.sizes; className?: string }> = ({
  options, value, onChange, placeholder = 'Select...', variant = 'default', size = 'md', className = '',
}) => {
  const variantClass = inputStyles[variant as keyof typeof inputStyles] || inputStyles.default;
  const sizeClass = inputStyles.sizes[size];
  return (
    <select value={value} onChange={(e) => onChange?.(e.target.value)}
      className={`${inputStyles.base} ${sizeClass} ${variantClass} appearance-none bg-no-repeat bg-right pr-8 ${className}`}
      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundSize: '1.5rem', backgroundPosition: 'right 0.5rem center' }}>
      <option value="" disabled>{placeholder}</option>
      {options.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
    </select>
  );
};

export const Checkbox: React.FC<{ checked?: boolean; onChange?: (c: boolean) => void; label?: string; variant?: string; className?: string }> = ({
  checked = false, onChange, label, variant = 'default', className = '',
}) => {
  const variants: Record<string, string> = { default: 'accent-blue-500', neon: 'accent-[#33ff00]', brutal: 'accent-black' };
  return (
    <label className={`inline-flex items-center gap-2 cursor-pointer ${className}`}>
      <input type="checkbox" checked={checked} onChange={(e) => onChange?.(e.target.checked)} className={`w-4 h-4 rounded border-gray-300 ${variants[variant] || variants.default}`} />
      {label && <span className="text-sm">{label}</span>}
    </label>
  );
};

export const RadioGroup: React.FC<{ options: { value: string; label: string }[]; value?: string; onChange?: (v: string) => void; name: string; variant?: string; className?: string }> = ({
  options, value, onChange, name, variant = 'default', className = '',
}) => {
  const variants: Record<string, string> = { default: 'accent-blue-500', neon: 'accent-[#33ff00]', brutal: 'accent-black' };
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {options.map((opt) => (
        <label key={opt.value} className="inline-flex items-center gap-2 cursor-pointer">
          <input type="radio" name={name} value={opt.value} checked={value === opt.value} onChange={(e) => onChange?.(e.target.value)} className={`w-4 h-4 ${variants[variant] || variants.default}`} />
          <span className="text-sm">{opt.label}</span>
        </label>
      ))}
    </div>
  );
};

// ============================================
// REGISTRY ENTRIES
// ============================================

const createInputEntry = (id: string, name: string, description: string, tags: string[], component: React.FC<InputProps>, composedOf: string[] = []): ElementEntry => ({
  id: `input-${id}`, name, layer: 'molecule', category: 'inputs', description, themeAgnostic: false, composedOf,
  sourceComponents: ['multiple-zones'], extractedFrom: 'src/elements/molecules/inputs/index.tsx',
  previewType: 'inline', hasInteraction: true, implementation: 'component', component,
  codeSnippet: `<${name.replace(/\s/g, '')} />`, tags: ['input', 'form', 'interactive', ...tags],
});

export const inputRegistry: ElementEntry[] = [
  createInputEntry('text', 'Text Input', 'Standard text input field', ['text', 'default'], TextInput, ['border-width-thin', 'border-radius-md']),
  createInputEntry('text-dark', 'Text Input Dark', 'Dark theme text input', ['text', 'dark'], TextInput, ['border-width-thin', 'border-radius-md']),
  createInputEntry('text-filled', 'Filled Input', 'Filled background input', ['text', 'filled'], TextInput, ['border-radius-md']),
  createInputEntry('text-underline', 'Underline Input', 'Underline-only input', ['text', 'underline', 'minimal'], TextInput, ['border-width-medium']),
  createInputEntry('text-brutal', 'Neo-Brutal Input', 'Hard shadow brutalist input', ['text', 'brutal', 'neo-brutal'], TextInput, ['shadow-hard-4', 'border-brutal']),
  createInputEntry('text-neon', 'Neon Input', 'Glowing terminal-style input', ['text', 'neon', 'hacker', 'terminal'], TextInput, ['glow-green']),
  createInputEntry('text-glass', 'Glass Input', 'Frosted glass input', ['text', 'glass', 'blur'], TextInput, ['surface-glass', 'backdrop-blur-md']),
  createInputEntry('text-retro', 'Retro Input', 'Vintage typewriter input', ['text', 'retro', 'vintage'], TextInput, ['border-width-medium']),
  createInputEntry('textarea', 'Text Area', 'Multi-line text input', ['textarea', 'multiline'], TextArea as React.FC<InputProps>, ['border-width-thin', 'border-radius-md']),
  createInputEntry('search', 'Search Input', 'Input with search icon', ['search', 'icon'], SearchInput, ['border-radius-md']),
  createInputEntry('password', 'Password Input', 'Input with show/hide toggle', ['password', 'secure'], PasswordInput, ['border-radius-md']),
  createInputEntry('slider', 'Slider', 'Range slider input', ['slider', 'range'], Slider as unknown as React.FC<InputProps>, []),
  createInputEntry('toggle', 'Toggle Switch', 'On/off toggle switch', ['toggle', 'switch', 'boolean'], Toggle as unknown as React.FC<InputProps>, ['border-radius-full']),
  createInputEntry('select', 'Select Dropdown', 'Dropdown select input', ['select', 'dropdown'], Select as unknown as React.FC<InputProps>, ['border-width-thin', 'border-radius-md']),
  createInputEntry('checkbox', 'Checkbox', 'Checkbox input', ['checkbox', 'boolean'], Checkbox as unknown as React.FC<InputProps>, []),
  createInputEntry('radio-group', 'Radio Group', 'Radio button group', ['radio', 'group', 'options'], RadioGroup as unknown as React.FC<InputProps>, []),
];
