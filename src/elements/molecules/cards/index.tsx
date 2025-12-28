// Molecule: Cards
// Card container components composed of atoms
// Import ATOMS only - no molecules or organisms

import React from 'react';
import { ElementEntry } from '../../registry';

// ============================================
// CARD STYLE PRESETS
// ============================================

export const cardStyles = {
  base: 'overflow-hidden transition-all duration-200',
  sizes: {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8',
  },
  // Basic cards
  default: 'bg-white border border-gray-200 rounded-lg shadow-sm',
  elevated: 'bg-white rounded-lg shadow-lg',
  flat: 'bg-gray-50 rounded-lg',
  outlined: 'bg-white border-2 border-gray-300 rounded-lg',
  // Dark variants
  dark: 'bg-zinc-900 border border-zinc-800 rounded-lg text-white',
  darkElevated: 'bg-zinc-800 rounded-lg shadow-lg text-white',
  // Neo-brutal
  brutal: 'bg-white border-4 border-black shadow-[8px_8px_0_0_#000] rounded-none',
  brutalPrimary: 'bg-blue-500 text-white border-4 border-black shadow-[8px_8px_0_0_#000] rounded-none',
  brutalYellow: 'bg-yellow-400 border-4 border-black shadow-[8px_8px_0_0_#000] rounded-none',
  brutalPink: 'bg-pink-400 border-4 border-black shadow-[8px_8px_0_0_#000] rounded-none',
  // Neon/Hacker
  neon: 'bg-black border-2 border-[#33ff00] text-[#33ff00] rounded-none shadow-[0_0_20px_rgba(51,255,0,0.3)]',
  neonPink: 'bg-black border-2 border-pink-500 text-pink-500 rounded-none shadow-[0_0_20px_rgba(236,72,153,0.3)]',
  neonCyan: 'bg-black border-2 border-cyan-400 text-cyan-400 rounded-none shadow-[0_0_20px_rgba(34,211,238,0.3)]',
  // Glass/Frosted
  glass: 'bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white',
  glassDark: 'bg-black/20 backdrop-blur-md border border-white/10 rounded-xl text-white',
  // Retro/Themed
  arcade: 'bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg text-white shadow-lg',
  cosmic: 'bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 rounded-xl text-white shadow-[0_0_30px_rgba(139,92,246,0.3)]',
  organic: 'bg-green-50 border-2 border-green-200 rounded-3xl',
  retro: 'bg-amber-100 border-4 border-amber-800 rounded text-amber-900',
  paper: 'bg-amber-50 rounded shadow-md',
  // Interactive states
  interactive: 'hover:shadow-lg hover:-translate-y-1 cursor-pointer',
};

// ============================================
// CARD COMPONENTS
// ============================================

interface CardProps {
  children?: React.ReactNode;
  variant?: string;
  size?: keyof typeof cardStyles.sizes;
  interactive?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  size = 'md',
  interactive = false,
  className = '',
  onClick,
}) => {
  const variantClass = cardStyles[variant as keyof typeof cardStyles] || cardStyles.default;
  const sizeClass = cardStyles.sizes[size];

  return (
    <div
      className={`${cardStyles.base} ${sizeClass} ${variantClass} ${interactive ? cardStyles.interactive : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export const ImageCard: React.FC<CardProps & { image?: string; imageAlt?: string; aspectRatio?: string }> = ({
  children,
  image,
  imageAlt = '',
  aspectRatio = 'aspect-video',
  variant = 'default',
  size = 'md',
  interactive = false,
  className = '',
  onClick,
}) => {
  const variantClass = cardStyles[variant as keyof typeof cardStyles] || cardStyles.default;

  return (
    <div
      className={`${cardStyles.base} ${variantClass} ${interactive ? cardStyles.interactive : ''} ${className}`}
      onClick={onClick}
    >
      {image && (
        <div className={`${aspectRatio} w-full overflow-hidden`}>
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
            {imageAlt || 'Image'}
          </div>
        </div>
      )}
      <div className={cardStyles.sizes[size]}>{children}</div>
    </div>
  );
};

export const ProfileCard: React.FC<CardProps & { avatar?: string; name?: string; title?: string }> = ({
  avatar,
  name = 'User Name',
  title = 'Title',
  children,
  variant = 'default',
  className = '',
}) => {
  const variantClass = cardStyles[variant as keyof typeof cardStyles] || cardStyles.default;

  return (
    <div className={`${cardStyles.base} ${variantClass} ${cardStyles.sizes.md} ${className}`}>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-500">
          {avatar || name[0]}
        </div>
        <div>
          <h4 className="font-semibold">{name}</h4>
          <p className="text-sm opacity-70">{title}</p>
        </div>
      </div>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
};

export const StatCard: React.FC<CardProps & { label?: string; value?: string | number; change?: string; trend?: 'up' | 'down' | 'neutral' }> = ({
  label = 'Metric',
  value = '0',
  change,
  trend = 'neutral',
  variant = 'default',
  className = '',
}) => {
  const variantClass = cardStyles[variant as keyof typeof cardStyles] || cardStyles.default;
  const trendColors = { up: 'text-green-500', down: 'text-red-500', neutral: 'text-gray-500' };

  return (
    <div className={`${cardStyles.base} ${variantClass} ${cardStyles.sizes.md} ${className}`}>
      <p className="text-sm opacity-70">{label}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
      {change && <p className={`text-sm mt-2 ${trendColors[trend]}`}>{change}</p>}
    </div>
  );
};

export const ActionCard: React.FC<CardProps & { title?: string; description?: string; actions?: React.ReactNode }> = ({
  title = 'Card Title',
  description,
  actions,
  variant = 'default',
  className = '',
}) => {
  const variantClass = cardStyles[variant as keyof typeof cardStyles] || cardStyles.default;

  return (
    <div className={`${cardStyles.base} ${variantClass} ${cardStyles.sizes.md} ${className}`}>
      <h3 className="font-semibold text-lg">{title}</h3>
      {description && <p className="text-sm opacity-70 mt-2">{description}</p>}
      {actions && <div className="mt-4 flex gap-2">{actions}</div>}
    </div>
  );
};

export const MediaCard: React.FC<CardProps & { media?: React.ReactNode; title?: string; subtitle?: string }> = ({
  media,
  title,
  subtitle,
  children,
  variant = 'default',
  className = '',
}) => {
  const variantClass = cardStyles[variant as keyof typeof cardStyles] || cardStyles.default;

  return (
    <div className={`${cardStyles.base} ${variantClass} ${className}`}>
      {media && <div className="aspect-video w-full bg-gray-200 flex items-center justify-center">{media}</div>}
      <div className={cardStyles.sizes.md}>
        {title && <h3 className="font-semibold">{title}</h3>}
        {subtitle && <p className="text-sm opacity-70">{subtitle}</p>}
        {children}
      </div>
    </div>
  );
};

export const ListCard: React.FC<CardProps & { items?: { label: string; value?: string }[] }> = ({
  items = [],
  variant = 'default',
  className = '',
}) => {
  const variantClass = cardStyles[variant as keyof typeof cardStyles] || cardStyles.default;

  return (
    <div className={`${cardStyles.base} ${variantClass} ${className}`}>
      {items.map((item, i) => (
        <div key={i} className={`flex justify-between py-3 ${i !== 0 ? 'border-t border-current/10' : ''} px-4`}>
          <span className="opacity-70">{item.label}</span>
          <span className="font-medium">{item.value}</span>
        </div>
      ))}
    </div>
  );
};

export const FeatureCard: React.FC<CardProps & { icon?: React.ReactNode; title?: string; description?: string }> = ({
  icon,
  title = 'Feature',
  description,
  variant = 'default',
  className = '',
}) => {
  const variantClass = cardStyles[variant as keyof typeof cardStyles] || cardStyles.default;

  return (
    <div className={`${cardStyles.base} ${variantClass} ${cardStyles.sizes.md} text-center ${className}`}>
      {icon && <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center text-2xl">{icon}</div>}
      <h3 className="font-semibold">{title}</h3>
      {description && <p className="text-sm opacity-70 mt-2">{description}</p>}
    </div>
  );
};

export const PricingCard: React.FC<CardProps & { plan?: string; price?: string; period?: string; features?: string[]; highlighted?: boolean }> = ({
  plan = 'Basic',
  price = '$0',
  period = '/month',
  features = [],
  highlighted = false,
  variant = 'default',
  className = '',
}) => {
  const variantClass = highlighted
    ? cardStyles.brutalPrimary
    : (cardStyles[variant as keyof typeof cardStyles] || cardStyles.default);

  return (
    <div className={`${cardStyles.base} ${variantClass} ${cardStyles.sizes.lg} ${className}`}>
      <h3 className="text-lg font-bold">{plan}</h3>
      <div className="mt-4">
        <span className="text-3xl font-bold">{price}</span>
        <span className="opacity-70">{period}</span>
      </div>
      <ul className="mt-6 space-y-2">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const TestimonialCard: React.FC<CardProps & { quote?: string; author?: string; role?: string }> = ({
  quote = 'This is a testimonial quote.',
  author = 'Author Name',
  role = 'Role',
  variant = 'default',
  className = '',
}) => {
  const variantClass = cardStyles[variant as keyof typeof cardStyles] || cardStyles.default;

  return (
    <div className={`${cardStyles.base} ${variantClass} ${cardStyles.sizes.md} ${className}`}>
      <svg className="w-8 h-8 opacity-30 mb-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>
      <p className="italic">{quote}</p>
      <div className="mt-4 pt-4 border-t border-current/10">
        <p className="font-semibold">{author}</p>
        <p className="text-sm opacity-70">{role}</p>
      </div>
    </div>
  );
};

// ============================================
// REGISTRY ENTRIES
// ============================================

const createCardEntry = (id: string, name: string, description: string, tags: string[], component: React.FC<CardProps>, composedOf: string[] = []): ElementEntry => ({
  id: `card-${id}`, name, layer: 'molecule', category: 'cards', description, themeAgnostic: false, composedOf,
  sourceComponents: ['multiple-zones'], extractedFrom: 'src/elements/molecules/cards/index.tsx',
  previewType: 'card', hasInteraction: false, implementation: 'component', component,
  codeSnippet: `<Card variant="${id}">{children}</Card>`, tags: ['card', 'container', ...tags],
});

export const cardRegistry: ElementEntry[] = [
  // Basic cards
  createCardEntry('default', 'Default Card', 'Basic card with border and shadow', ['default', 'basic'], Card, ['border-width-thin', 'border-radius-lg', 'shadow-sm']),
  createCardEntry('elevated', 'Elevated Card', 'Card with prominent shadow', ['elevated', 'shadow'], Card, ['border-radius-lg', 'shadow-lg']),
  createCardEntry('flat', 'Flat Card', 'Card with no shadow', ['flat', 'minimal'], Card, ['border-radius-lg']),
  createCardEntry('outlined', 'Outlined Card', 'Card with thick border', ['outlined', 'bordered'], Card, ['border-width-medium', 'border-radius-lg']),
  // Dark variants
  createCardEntry('dark', 'Dark Card', 'Dark themed card', ['dark', 'night'], Card, ['border-radius-lg']),
  createCardEntry('dark-elevated', 'Dark Elevated Card', 'Dark card with shadow', ['dark', 'elevated'], Card, ['border-radius-lg', 'shadow-lg']),
  // Neo-brutal
  createCardEntry('brutal', 'Neo-Brutal Card', 'Hard shadow brutalist card', ['brutal', 'neo-brutal'], Card, ['shadow-hard-8', 'border-brutal']),
  createCardEntry('brutal-primary', 'Neo-Brutal Primary', 'Blue brutalist card', ['brutal', 'primary'], Card, ['shadow-hard-8', 'border-brutal', 'color-info']),
  createCardEntry('brutal-yellow', 'Neo-Brutal Yellow', 'Yellow brutalist card', ['brutal', 'yellow'], Card, ['shadow-hard-8', 'border-brutal']),
  createCardEntry('brutal-pink', 'Neo-Brutal Pink', 'Pink brutalist card', ['brutal', 'pink'], Card, ['shadow-hard-8', 'border-brutal']),
  // Neon
  createCardEntry('neon', 'Neon Card', 'Glowing terminal card', ['neon', 'hacker', 'glow'], Card, ['glow-green']),
  createCardEntry('neon-pink', 'Neon Pink Card', 'Pink glowing card', ['neon', 'pink', 'glow'], Card, ['glow-pink']),
  createCardEntry('neon-cyan', 'Neon Cyan Card', 'Cyan glowing card', ['neon', 'cyan', 'glow'], Card, ['glow-cyan']),
  // Glass
  createCardEntry('glass', 'Glass Card', 'Frosted glass card', ['glass', 'blur', 'transparent'], Card, ['surface-glass', 'backdrop-blur-md']),
  createCardEntry('glass-dark', 'Glass Dark Card', 'Dark frosted glass card', ['glass', 'dark', 'blur'], Card, ['surface-glass-dark', 'backdrop-blur-md']),
  // Themed
  createCardEntry('arcade', 'Arcade Card', 'Retro arcade gradient card', ['arcade', 'retro', 'gradient'], Card, ['gradient-neon-pink']),
  createCardEntry('cosmic', 'Cosmic Card', 'Space-themed card', ['cosmic', 'space', 'glow'], Card, ['gradient-cosmic', 'glow-purple']),
  createCardEntry('organic', 'Organic Card', 'Natural rounded card', ['organic', 'natural'], Card, ['border-radius-3xl']),
  createCardEntry('retro', 'Retro Card', 'Vintage styled card', ['retro', 'vintage'], Card, ['border-width-thick']),
  createCardEntry('paper', 'Paper Card', 'Paper texture card', ['paper', 'minimal'], Card, ['shadow-md']),
  // Specialized cards
  createCardEntry('image', 'Image Card', 'Card with image area', ['image', 'media'], ImageCard as React.FC<CardProps>, []),
  createCardEntry('profile', 'Profile Card', 'Card with avatar and info', ['profile', 'user', 'avatar'], ProfileCard as React.FC<CardProps>, []),
  createCardEntry('stat', 'Stat Card', 'Card for displaying metrics', ['stat', 'metric', 'number'], StatCard as React.FC<CardProps>, []),
  createCardEntry('action', 'Action Card', 'Card with action buttons', ['action', 'interactive'], ActionCard as React.FC<CardProps>, []),
  createCardEntry('media', 'Media Card', 'Card with media content', ['media', 'video'], MediaCard as React.FC<CardProps>, []),
  createCardEntry('list', 'List Card', 'Card with list items', ['list', 'items'], ListCard as React.FC<CardProps>, []),
  createCardEntry('feature', 'Feature Card', 'Card highlighting a feature', ['feature', 'icon'], FeatureCard as React.FC<CardProps>, []),
  createCardEntry('pricing', 'Pricing Card', 'Pricing plan card', ['pricing', 'plan', 'subscription'], PricingCard as React.FC<CardProps>, []),
  createCardEntry('testimonial', 'Testimonial Card', 'Quote testimonial card', ['testimonial', 'quote', 'review'], TestimonialCard as React.FC<CardProps>, []),
];
