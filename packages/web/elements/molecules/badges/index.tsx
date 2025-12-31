// Molecule: Badges
// Badge and tag components composed of atoms
// Import ATOMS only - no molecules or organisms

import React from 'react';
import { ElementEntry } from '../../registry';

// ============================================
// BADGE STYLE PRESETS
// ============================================

export const badgeStyles = {
  base: 'inline-flex items-center justify-center font-medium',
  sizes: {
    xs: 'px-1.5 py-0.5 text-xs',
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  },
  // Solid variants
  default: 'bg-gray-100 text-gray-800 rounded-full',
  primary: 'bg-blue-100 text-blue-800 rounded-full',
  success: 'bg-green-100 text-green-800 rounded-full',
  warning: 'bg-amber-100 text-amber-800 rounded-full',
  danger: 'bg-red-100 text-red-800 rounded-full',
  info: 'bg-cyan-100 text-cyan-800 rounded-full',
  // Solid dark
  primarySolid: 'bg-blue-500 text-white rounded-full',
  successSolid: 'bg-green-500 text-white rounded-full',
  warningSolid: 'bg-amber-500 text-white rounded-full',
  dangerSolid: 'bg-red-500 text-white rounded-full',
  // Outline variants
  outline: 'border border-gray-300 text-gray-700 bg-transparent rounded-full',
  outlinePrimary: 'border border-blue-500 text-blue-500 bg-transparent rounded-full',
  // Neo-brutal
  brutal: 'bg-white border-2 border-black shadow-[2px_2px_0_0_#000] rounded-none',
  brutalPrimary: 'bg-blue-500 text-white border-2 border-black shadow-[2px_2px_0_0_#000] rounded-none',
  // Neon
  neon: 'bg-black text-[#33ff00] border border-[#33ff00] shadow-[0_0_5px_rgba(51,255,0,0.5)] rounded-none font-mono',
  neonPink: 'bg-black text-pink-500 border border-pink-500 shadow-[0_0_5px_rgba(236,72,153,0.5)] rounded-none',
  // Glass
  glass: 'bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-full',
  // Dot indicator
  dot: 'w-2 h-2 rounded-full',
};

// ============================================
// BADGE COMPONENTS
// ============================================

interface BadgeProps {
  children?: React.ReactNode;
  variant?: string;
  size?: keyof typeof badgeStyles.sizes;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', size = 'md', className = '' }) => {
  const variantClass = badgeStyles[variant as keyof typeof badgeStyles] || badgeStyles.default;
  const sizeClass = badgeStyles.sizes[size];
  return <span className={`${badgeStyles.base} ${sizeClass} ${variantClass} ${className}`}>{children}</span>;
};

export const StatusBadge: React.FC<BadgeProps & { status: 'online' | 'offline' | 'busy' | 'away' }> = ({ status, size = 'sm', className = '' }) => {
  const colors = { online: 'bg-green-500', offline: 'bg-gray-400', busy: 'bg-red-500', away: 'bg-amber-500' };
  const labels = { online: 'Online', offline: 'Offline', busy: 'Busy', away: 'Away' };
  return (
    <span className={`${badgeStyles.base} ${badgeStyles.sizes[size]} bg-gray-100 rounded-full ${className}`}>
      <span className={`w-2 h-2 rounded-full mr-1.5 ${colors[status]}`} />
      {labels[status]}
    </span>
  );
};

export const CountBadge: React.FC<{ count: number; max?: number; variant?: string; className?: string }> = ({ count, max = 99, variant = 'dangerSolid', className = '' }) => {
  const display = count > max ? `${max}+` : count;
  const variantClass = badgeStyles[variant as keyof typeof badgeStyles] || badgeStyles.dangerSolid;
  return <span className={`${badgeStyles.base} ${badgeStyles.sizes.xs} ${variantClass} min-w-[1.25rem] ${className}`}>{display}</span>;
};

export const DotBadge: React.FC<{ color?: string; pulse?: boolean; className?: string }> = ({ color = 'bg-blue-500', pulse = false, className = '' }) => (
  <span className={`${badgeStyles.dot} ${color} ${pulse ? 'animate-pulse' : ''} ${className}`} />
);

export const IconBadge: React.FC<BadgeProps & { icon: React.ReactNode }> = ({ icon, children, variant = 'default', size = 'md', className = '' }) => {
  const variantClass = badgeStyles[variant as keyof typeof badgeStyles] || badgeStyles.default;
  const sizeClass = badgeStyles.sizes[size];
  return (
    <span className={`${badgeStyles.base} ${sizeClass} ${variantClass} gap-1 ${className}`}>
      <span className="w-3 h-3">{icon}</span>
      {children}
    </span>
  );
};

export const TagBadge: React.FC<BadgeProps & { onRemove?: () => void }> = ({ children, variant = 'default', size = 'sm', onRemove, className = '' }) => {
  const variantClass = badgeStyles[variant as keyof typeof badgeStyles] || badgeStyles.default;
  const sizeClass = badgeStyles.sizes[size];
  return (
    <span className={`${badgeStyles.base} ${sizeClass} ${variantClass} gap-1 ${className}`}>
      {children}
      {onRemove && (
        <button onClick={onRemove} className="ml-1 hover:opacity-70">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </span>
  );
};

export const VersionBadge: React.FC<{ version: string; variant?: string; className?: string }> = ({ version, variant = 'outline', className = '' }) => {
  const variantClass = badgeStyles[variant as keyof typeof badgeStyles] || badgeStyles.outline;
  return <span className={`${badgeStyles.base} ${badgeStyles.sizes.xs} ${variantClass} font-mono ${className}`}>v{version}</span>;
};

export const KeyboardBadge: React.FC<{ keys: string; className?: string }> = ({ keys, className = '' }) => (
  <kbd className={`${badgeStyles.base} ${badgeStyles.sizes.xs} bg-gray-100 border border-gray-300 rounded text-gray-700 font-mono shadow-sm ${className}`}>{keys}</kbd>
);

export const NumberBadge: React.FC<{ number: number; variant?: string; className?: string }> = ({ number, variant = 'primarySolid', className = '' }) => {
  const variantClass = badgeStyles[variant as keyof typeof badgeStyles] || badgeStyles.primarySolid;
  return <span className={`${badgeStyles.base} w-6 h-6 text-xs ${variantClass} ${className}`}>{number}</span>;
};

// ============================================
// REGISTRY ENTRIES
// ============================================

const createBadgeEntry = (id: string, name: string, description: string, tags: string[], component: React.FC<BadgeProps>, composedOf: string[] = []): ElementEntry => ({
  id: `badge-${id}`, name, layer: 'molecule', category: 'badges', description, themeAgnostic: false, composedOf,
  sourceComponents: ['multiple-zones'], extractedFrom: 'src/elements/molecules/badges/index.tsx',
  previewType: 'inline', hasInteraction: false, implementation: 'component', component,
  codeSnippet: `<Badge variant="${id}">{text}</Badge>`, tags: ['badge', 'label', ...tags],
});

export const badgeRegistry: ElementEntry[] = [
  createBadgeEntry('default', 'Default Badge', 'Gray badge for general use', ['default', 'gray'], Badge, ['border-radius-full']),
  createBadgeEntry('primary', 'Primary Badge', 'Blue primary badge', ['primary', 'blue'], Badge, ['color-info', 'border-radius-full']),
  createBadgeEntry('success', 'Success Badge', 'Green success badge', ['success', 'green'], Badge, ['color-success', 'border-radius-full']),
  createBadgeEntry('warning', 'Warning Badge', 'Amber warning badge', ['warning', 'amber'], Badge, ['color-warning', 'border-radius-full']),
  createBadgeEntry('danger', 'Danger Badge', 'Red danger badge', ['danger', 'red'], Badge, ['color-error', 'border-radius-full']),
  createBadgeEntry('info', 'Info Badge', 'Cyan info badge', ['info', 'cyan'], Badge, ['color-info', 'border-radius-full']),
  createBadgeEntry('primary-solid', 'Primary Solid', 'Solid blue badge', ['primary', 'solid', 'filled'], Badge, ['color-info', 'border-radius-full']),
  createBadgeEntry('success-solid', 'Success Solid', 'Solid green badge', ['success', 'solid', 'filled'], Badge, ['color-success', 'border-radius-full']),
  createBadgeEntry('outline', 'Outline Badge', 'Bordered transparent badge', ['outline', 'bordered'], Badge, ['border-width-thin', 'border-radius-full']),
  createBadgeEntry('brutal', 'Neo-Brutal Badge', 'Hard shadow brutalist badge', ['brutal', 'neo-brutal'], Badge, ['shadow-hard-4', 'border-brutal']),
  createBadgeEntry('brutal-primary', 'Neo-Brutal Primary', 'Blue brutalist badge', ['brutal', 'neo-brutal', 'primary'], Badge, ['shadow-hard-4', 'border-brutal']),
  createBadgeEntry('neon', 'Neon Badge', 'Glowing terminal badge', ['neon', 'hacker', 'glow'], Badge, ['glow-green']),
  createBadgeEntry('neon-pink', 'Neon Pink Badge', 'Pink glowing badge', ['neon', 'arcade', 'pink'], Badge, ['glow-pink']),
  createBadgeEntry('glass', 'Glass Badge', 'Frosted glass badge', ['glass', 'blur', 'transparent'], Badge, ['surface-glass']),
  createBadgeEntry('status', 'Status Badge', 'Badge with status indicator', ['status', 'indicator'], StatusBadge as React.FC<BadgeProps>, []),
  createBadgeEntry('count', 'Count Badge', 'Notification count badge', ['count', 'notification', 'number'], CountBadge as React.FC<BadgeProps>, []),
  createBadgeEntry('dot', 'Dot Badge', 'Simple dot indicator', ['dot', 'indicator', 'minimal'], DotBadge as React.FC<BadgeProps>, []),
  createBadgeEntry('icon', 'Icon Badge', 'Badge with icon', ['icon', 'decorated'], IconBadge as React.FC<BadgeProps>, []),
  createBadgeEntry('tag', 'Tag Badge', 'Removable tag badge', ['tag', 'removable', 'chip'], TagBadge as React.FC<BadgeProps>, []),
  createBadgeEntry('version', 'Version Badge', 'Version number badge', ['version', 'semver', 'mono'], VersionBadge as React.FC<BadgeProps>, []),
  createBadgeEntry('keyboard', 'Keyboard Badge', 'Keyboard shortcut badge', ['keyboard', 'shortcut', 'kbd'], KeyboardBadge as React.FC<BadgeProps>, []),
  createBadgeEntry('number', 'Number Badge', 'Circular number badge', ['number', 'step', 'order'], NumberBadge as React.FC<BadgeProps>, []),
];
