/**
 * Element Metadata Service for MCP
 *
 * Provides element search and lookup without React component references.
 * This is a metadata-only view of the element registry for use by Claude.
 */

// ============================================
// TYPES
// ============================================

export type ElementLayer = 'atom' | 'molecule' | 'organism' | 'template';

export type ElementCategory =
  | 'backgrounds' | 'borders' | 'shadows' | 'typography' | 'shapes'
  | 'icons' | 'animations' | 'colors' | 'filters' | 'surfaces'
  | 'buttons' | 'inputs' | 'badges' | 'cards' | 'indicators' | 'feedback'
  | 'organisms' | 'layout' | 'navigation' | 'forms' | 'data-display'
  | 'marketing' | 'application' | 'content' | 'auth';

export interface ElementMetadata {
  id: string;
  name: string;
  layer: ElementLayer;
  category: ElementCategory;
  description: string;
  tags: string[];
  composedOf?: string[];
  variants?: string[];
  slots?: SlotMetadata[];
  themeAgnostic?: boolean;
}

export interface SlotMetadata {
  id: string;
  name: string;
  type: 'text' | 'richText' | 'node' | 'component' | 'list' | 'image' | 'link' | 'action';
  required: boolean;
  description: string;
}

// ============================================
// ELEMENT CATALOG
// ============================================

/**
 * Complete element catalog with metadata for MCP tools.
 * This is a curated subset focusing on the most useful elements for page composition.
 */
export const elementCatalog: ElementMetadata[] = [
  // ============================================
  // ATOMS - Basic building blocks
  // ============================================

  // Backgrounds
  { id: 'bg-grid', name: 'Grid Background', layer: 'atom', category: 'backgrounds', description: 'Subtle grid pattern background', tags: ['background', 'grid', 'pattern'] },
  { id: 'bg-dots', name: 'Dot Pattern', layer: 'atom', category: 'backgrounds', description: 'Polka dot pattern background', tags: ['background', 'dots', 'pattern'] },
  { id: 'bg-gradient-radial', name: 'Radial Gradient', layer: 'atom', category: 'backgrounds', description: 'Radial gradient background', tags: ['background', 'gradient', 'radial'] },
  { id: 'bg-noise', name: 'Noise Texture', layer: 'atom', category: 'backgrounds', description: 'Film grain noise overlay', tags: ['background', 'noise', 'texture'] },

  // Shadows
  { id: 'shadow-sm', name: 'Small Shadow', layer: 'atom', category: 'shadows', description: 'Subtle elevation shadow', tags: ['shadow', 'elevation', 'small'] },
  { id: 'shadow-md', name: 'Medium Shadow', layer: 'atom', category: 'shadows', description: 'Standard card shadow', tags: ['shadow', 'elevation', 'medium'] },
  { id: 'shadow-lg', name: 'Large Shadow', layer: 'atom', category: 'shadows', description: 'Prominent shadow for modals', tags: ['shadow', 'elevation', 'large'] },
  { id: 'shadow-hard', name: 'Hard Shadow', layer: 'atom', category: 'shadows', description: 'Neo-brutalist offset shadow', tags: ['shadow', 'brutal', 'hard'] },
  { id: 'shadow-glow', name: 'Glow Shadow', layer: 'atom', category: 'shadows', description: 'Neon glow effect', tags: ['shadow', 'glow', 'neon'] },

  // Typography
  { id: 'text-display', name: 'Display Text', layer: 'atom', category: 'typography', description: 'Large display heading', tags: ['typography', 'heading', 'display'] },
  { id: 'text-heading', name: 'Heading', layer: 'atom', category: 'typography', description: 'Section heading', tags: ['typography', 'heading'] },
  { id: 'text-body', name: 'Body Text', layer: 'atom', category: 'typography', description: 'Standard body text', tags: ['typography', 'body', 'paragraph'] },
  { id: 'text-caption', name: 'Caption', layer: 'atom', category: 'typography', description: 'Small caption text', tags: ['typography', 'caption', 'small'] },

  // Icons (subset)
  { id: 'icon-arrow-right', name: 'Arrow Right', layer: 'atom', category: 'icons', description: 'Right arrow icon', tags: ['icon', 'arrow', 'navigation'] },
  { id: 'icon-check', name: 'Check', layer: 'atom', category: 'icons', description: 'Checkmark icon', tags: ['icon', 'check', 'success'] },
  { id: 'icon-x', name: 'Close', layer: 'atom', category: 'icons', description: 'X/close icon', tags: ['icon', 'close', 'x'] },
  { id: 'icon-menu', name: 'Menu', layer: 'atom', category: 'icons', description: 'Hamburger menu icon', tags: ['icon', 'menu', 'navigation'] },
  { id: 'icon-search', name: 'Search', layer: 'atom', category: 'icons', description: 'Search/magnifier icon', tags: ['icon', 'search'] },
  { id: 'icon-user', name: 'User', layer: 'atom', category: 'icons', description: 'User/profile icon', tags: ['icon', 'user', 'profile'] },
  { id: 'icon-settings', name: 'Settings', layer: 'atom', category: 'icons', description: 'Settings gear icon', tags: ['icon', 'settings', 'cog'] },
  { id: 'icon-star', name: 'Star', layer: 'atom', category: 'icons', description: 'Star/favorite icon', tags: ['icon', 'star', 'favorite'] },

  // Animations
  { id: 'anim-fade-in', name: 'Fade In', layer: 'atom', category: 'animations', description: 'Fade in animation', tags: ['animation', 'fade', 'entrance'] },
  { id: 'anim-slide-up', name: 'Slide Up', layer: 'atom', category: 'animations', description: 'Slide up animation', tags: ['animation', 'slide', 'entrance'] },
  { id: 'anim-pulse', name: 'Pulse', layer: 'atom', category: 'animations', description: 'Pulsing animation', tags: ['animation', 'pulse', 'attention'] },
  { id: 'anim-spin', name: 'Spin', layer: 'atom', category: 'animations', description: 'Spinning animation', tags: ['animation', 'spin', 'loading'] },

  // ============================================
  // MOLECULES - Composed UI elements
  // ============================================

  // Buttons
  { id: 'btn-primary', name: 'Primary Button', layer: 'molecule', category: 'buttons', description: 'Main call-to-action button', tags: ['button', 'primary', 'cta'], composedOf: ['text-body', 'shadow-sm'] },
  { id: 'btn-secondary', name: 'Secondary Button', layer: 'molecule', category: 'buttons', description: 'Secondary action button', tags: ['button', 'secondary'], composedOf: ['text-body'] },
  { id: 'btn-ghost', name: 'Ghost Button', layer: 'molecule', category: 'buttons', description: 'Transparent button with border', tags: ['button', 'ghost', 'outline'] },
  { id: 'btn-icon', name: 'Icon Button', layer: 'molecule', category: 'buttons', description: 'Button with icon only', tags: ['button', 'icon'] },
  { id: 'btn-brutal', name: 'Brutal Button', layer: 'molecule', category: 'buttons', description: 'Neo-brutalist style button', tags: ['button', 'brutal', 'bold'], composedOf: ['shadow-hard'] },

  // Inputs
  { id: 'input-text', name: 'Text Input', layer: 'molecule', category: 'inputs', description: 'Standard text input field', tags: ['input', 'text', 'form'] },
  { id: 'input-email', name: 'Email Input', layer: 'molecule', category: 'inputs', description: 'Email input with validation', tags: ['input', 'email', 'form'] },
  { id: 'input-password', name: 'Password Input', layer: 'molecule', category: 'inputs', description: 'Password input with toggle', tags: ['input', 'password', 'form'] },
  { id: 'input-textarea', name: 'Textarea', layer: 'molecule', category: 'inputs', description: 'Multi-line text area', tags: ['input', 'textarea', 'form'] },
  { id: 'input-select', name: 'Select Dropdown', layer: 'molecule', category: 'inputs', description: 'Dropdown select input', tags: ['input', 'select', 'form'] },
  { id: 'input-checkbox', name: 'Checkbox', layer: 'molecule', category: 'inputs', description: 'Checkbox input', tags: ['input', 'checkbox', 'form'] },
  { id: 'input-radio', name: 'Radio Button', layer: 'molecule', category: 'inputs', description: 'Radio button input', tags: ['input', 'radio', 'form'] },
  { id: 'input-search', name: 'Search Input', layer: 'molecule', category: 'inputs', description: 'Search input with icon', tags: ['input', 'search', 'form'] },

  // Cards
  { id: 'card-basic', name: 'Basic Card', layer: 'molecule', category: 'cards', description: 'Simple card container', tags: ['card', 'container'], composedOf: ['shadow-md'] },
  { id: 'card-image', name: 'Image Card', layer: 'molecule', category: 'cards', description: 'Card with image header', tags: ['card', 'image', 'media'] },
  { id: 'card-pricing', name: 'Pricing Card', layer: 'molecule', category: 'cards', description: 'Pricing plan card', tags: ['card', 'pricing', 'plan'] },
  { id: 'card-testimonial', name: 'Testimonial Card', layer: 'molecule', category: 'cards', description: 'Customer testimonial card', tags: ['card', 'testimonial', 'quote'] },
  { id: 'card-feature', name: 'Feature Card', layer: 'molecule', category: 'cards', description: 'Feature highlight card', tags: ['card', 'feature', 'benefit'] },
  { id: 'card-team', name: 'Team Member Card', layer: 'molecule', category: 'cards', description: 'Team member profile card', tags: ['card', 'team', 'profile'] },
  { id: 'card-stat', name: 'Stat Card', layer: 'molecule', category: 'cards', description: 'Statistic/metric card', tags: ['card', 'stat', 'metric', 'number'] },

  // Badges & Indicators
  { id: 'badge-solid', name: 'Solid Badge', layer: 'molecule', category: 'badges', description: 'Solid background badge', tags: ['badge', 'label', 'tag'] },
  { id: 'badge-outline', name: 'Outline Badge', layer: 'molecule', category: 'badges', description: 'Outlined badge', tags: ['badge', 'outline', 'tag'] },
  { id: 'badge-status', name: 'Status Badge', layer: 'molecule', category: 'badges', description: 'Status indicator badge', tags: ['badge', 'status', 'indicator'] },
  { id: 'avatar', name: 'Avatar', layer: 'molecule', category: 'indicators', description: 'User avatar image', tags: ['avatar', 'user', 'profile'] },
  { id: 'progress-bar', name: 'Progress Bar', layer: 'molecule', category: 'indicators', description: 'Progress indicator bar', tags: ['progress', 'loading', 'indicator'] },
  { id: 'spinner', name: 'Loading Spinner', layer: 'molecule', category: 'indicators', description: 'Loading spinner animation', tags: ['spinner', 'loading', 'indicator'], composedOf: ['anim-spin'] },

  // Feedback
  { id: 'alert-info', name: 'Info Alert', layer: 'molecule', category: 'feedback', description: 'Informational alert message', tags: ['alert', 'info', 'message'] },
  { id: 'alert-success', name: 'Success Alert', layer: 'molecule', category: 'feedback', description: 'Success alert message', tags: ['alert', 'success', 'message'] },
  { id: 'alert-warning', name: 'Warning Alert', layer: 'molecule', category: 'feedback', description: 'Warning alert message', tags: ['alert', 'warning', 'message'] },
  { id: 'alert-error', name: 'Error Alert', layer: 'molecule', category: 'feedback', description: 'Error alert message', tags: ['alert', 'error', 'message'] },
  { id: 'toast', name: 'Toast Notification', layer: 'molecule', category: 'feedback', description: 'Toast notification popup', tags: ['toast', 'notification', 'popup'] },

  // ============================================
  // ORGANISMS - Complex UI sections
  // ============================================

  // Heroes
  {
    id: 'hero-centered',
    name: 'Centered Hero',
    layer: 'organism',
    category: 'layout',
    description: 'Hero section with centered content',
    tags: ['hero', 'header', 'landing', 'centered'],
    composedOf: ['text-display', 'text-body', 'btn-primary', 'btn-secondary'],
    variants: ['default', 'dark', 'gradient'],
    slots: [
      { id: 'title', name: 'Title', type: 'text', required: true, description: 'Main headline' },
      { id: 'subtitle', name: 'Subtitle', type: 'text', required: false, description: 'Supporting text' },
      { id: 'primaryCta', name: 'Primary CTA', type: 'action', required: false, description: 'Primary button' },
      { id: 'secondaryCta', name: 'Secondary CTA', type: 'action', required: false, description: 'Secondary button' },
    ],
  },
  {
    id: 'hero-split',
    name: 'Split Hero',
    layer: 'organism',
    category: 'layout',
    description: 'Hero with text on one side, image on other',
    tags: ['hero', 'header', 'landing', 'split', 'image'],
    composedOf: ['text-display', 'text-body', 'btn-primary'],
    variants: ['default', 'reversed', 'dark'],
    slots: [
      { id: 'title', name: 'Title', type: 'text', required: true, description: 'Main headline' },
      { id: 'subtitle', name: 'Subtitle', type: 'text', required: false, description: 'Supporting text' },
      { id: 'media', name: 'Media', type: 'image', required: false, description: 'Hero image or video' },
      { id: 'cta', name: 'CTA', type: 'action', required: false, description: 'Call to action button' },
    ],
  },

  // Feature Sections
  {
    id: 'feature-grid',
    name: 'Feature Grid',
    layer: 'organism',
    category: 'layout',
    description: 'Grid of feature cards',
    tags: ['features', 'grid', 'benefits', 'cards'],
    composedOf: ['card-feature', 'text-heading'],
    variants: ['2-col', '3-col', '4-col'],
    slots: [
      { id: 'heading', name: 'Section Heading', type: 'text', required: false, description: 'Section title' },
      { id: 'subheading', name: 'Subheading', type: 'text', required: false, description: 'Section description' },
      { id: 'features', name: 'Features', type: 'list', required: true, description: 'List of feature items' },
    ],
  },
  {
    id: 'feature-alternating',
    name: 'Alternating Features',
    layer: 'organism',
    category: 'layout',
    description: 'Features with alternating image/text layout',
    tags: ['features', 'alternating', 'zigzag'],
    composedOf: ['text-heading', 'text-body'],
    slots: [
      { id: 'features', name: 'Features', type: 'list', required: true, description: 'List of feature sections' },
    ],
  },

  // Pricing
  {
    id: 'pricing-table',
    name: 'Pricing Table',
    layer: 'organism',
    category: 'layout',
    description: 'Pricing plans comparison table',
    tags: ['pricing', 'plans', 'comparison', 'table'],
    composedOf: ['card-pricing', 'btn-primary', 'badge-solid'],
    variants: ['2-tier', '3-tier', '4-tier'],
    slots: [
      { id: 'heading', name: 'Section Heading', type: 'text', required: false, description: 'Pricing section title' },
      { id: 'plans', name: 'Pricing Plans', type: 'list', required: true, description: 'List of pricing plans' },
    ],
  },

  // Testimonials
  {
    id: 'testimonials-carousel',
    name: 'Testimonials Carousel',
    layer: 'organism',
    category: 'layout',
    description: 'Carousel of customer testimonials',
    tags: ['testimonials', 'carousel', 'reviews', 'social-proof'],
    composedOf: ['card-testimonial', 'avatar'],
    slots: [
      { id: 'heading', name: 'Section Heading', type: 'text', required: false, description: 'Section title' },
      { id: 'testimonials', name: 'Testimonials', type: 'list', required: true, description: 'List of testimonials' },
    ],
  },
  {
    id: 'testimonials-grid',
    name: 'Testimonials Grid',
    layer: 'organism',
    category: 'layout',
    description: 'Grid layout of testimonials',
    tags: ['testimonials', 'grid', 'reviews'],
    composedOf: ['card-testimonial'],
  },

  // CTA Sections
  {
    id: 'cta-banner',
    name: 'CTA Banner',
    layer: 'organism',
    category: 'layout',
    description: 'Call-to-action banner section',
    tags: ['cta', 'banner', 'conversion'],
    composedOf: ['text-heading', 'btn-primary'],
    variants: ['default', 'dark', 'gradient', 'brutal'],
    slots: [
      { id: 'title', name: 'Title', type: 'text', required: true, description: 'CTA headline' },
      { id: 'subtitle', name: 'Subtitle', type: 'text', required: false, description: 'Supporting text' },
      { id: 'cta', name: 'CTA Button', type: 'action', required: true, description: 'Action button' },
    ],
  },
  {
    id: 'cta-newsletter',
    name: 'Newsletter CTA',
    layer: 'organism',
    category: 'layout',
    description: 'Newsletter signup section',
    tags: ['cta', 'newsletter', 'signup', 'email'],
    composedOf: ['input-email', 'btn-primary'],
    slots: [
      { id: 'title', name: 'Title', type: 'text', required: true, description: 'Section headline' },
      { id: 'description', name: 'Description', type: 'text', required: false, description: 'Value proposition' },
    ],
  },

  // Navigation
  {
    id: 'navbar',
    name: 'Navigation Bar',
    layer: 'organism',
    category: 'navigation',
    description: 'Top navigation bar with logo and links',
    tags: ['navigation', 'navbar', 'header', 'menu'],
    composedOf: ['btn-ghost', 'btn-primary'],
    variants: ['default', 'transparent', 'dark'],
    slots: [
      { id: 'logo', name: 'Logo', type: 'image', required: true, description: 'Brand logo' },
      { id: 'links', name: 'Nav Links', type: 'list', required: true, description: 'Navigation links' },
      { id: 'cta', name: 'CTA', type: 'action', required: false, description: 'Header CTA button' },
    ],
  },
  {
    id: 'footer',
    name: 'Footer',
    layer: 'organism',
    category: 'navigation',
    description: 'Page footer with links and copyright',
    tags: ['footer', 'navigation', 'links'],
    variants: ['simple', 'multi-column', 'dark'],
    slots: [
      { id: 'companyName', name: 'Company Name', type: 'text', required: true, description: 'Brand name' },
      { id: 'links', name: 'Footer Links', type: 'list', required: false, description: 'Link columns' },
      { id: 'social', name: 'Social Links', type: 'list', required: false, description: 'Social media links' },
      { id: 'copyright', name: 'Copyright', type: 'text', required: false, description: 'Copyright text' },
    ],
  },

  // Stats
  {
    id: 'stats-row',
    name: 'Stats Row',
    layer: 'organism',
    category: 'layout',
    description: 'Row of statistic/metric cards',
    tags: ['stats', 'metrics', 'numbers', 'data'],
    composedOf: ['card-stat'],
    slots: [
      { id: 'stats', name: 'Statistics', type: 'list', required: true, description: 'List of stat items' },
    ],
  },

  // FAQ
  {
    id: 'faq-accordion',
    name: 'FAQ Accordion',
    layer: 'organism',
    category: 'layout',
    description: 'Expandable FAQ section',
    tags: ['faq', 'accordion', 'questions', 'support'],
    slots: [
      { id: 'heading', name: 'Section Heading', type: 'text', required: false, description: 'FAQ section title' },
      { id: 'questions', name: 'Questions', type: 'list', required: true, description: 'List of FAQ items' },
    ],
  },

  // Team
  {
    id: 'team-grid',
    name: 'Team Grid',
    layer: 'organism',
    category: 'layout',
    description: 'Grid of team member cards',
    tags: ['team', 'grid', 'people', 'about'],
    composedOf: ['card-team', 'avatar'],
    slots: [
      { id: 'heading', name: 'Section Heading', type: 'text', required: false, description: 'Section title' },
      { id: 'members', name: 'Team Members', type: 'list', required: true, description: 'List of team members' },
    ],
  },

  // ============================================
  // TEMPLATES - Full page layouts
  // ============================================

  {
    id: 'template-landing',
    name: 'Landing Page',
    layer: 'template',
    category: 'marketing',
    description: 'Complete landing page template',
    tags: ['template', 'landing', 'marketing', 'saas'],
    composedOf: ['navbar', 'hero-centered', 'feature-grid', 'testimonials-carousel', 'pricing-table', 'cta-banner', 'footer'],
  },
  {
    id: 'template-pricing',
    name: 'Pricing Page',
    layer: 'template',
    category: 'marketing',
    description: 'Dedicated pricing page template',
    tags: ['template', 'pricing', 'plans'],
    composedOf: ['navbar', 'hero-centered', 'pricing-table', 'faq-accordion', 'cta-banner', 'footer'],
  },
  {
    id: 'template-about',
    name: 'About Page',
    layer: 'template',
    category: 'content',
    description: 'Company about page template',
    tags: ['template', 'about', 'company', 'team'],
    composedOf: ['navbar', 'hero-split', 'stats-row', 'team-grid', 'cta-banner', 'footer'],
  },
  {
    id: 'template-blog-post',
    name: 'Blog Post',
    layer: 'template',
    category: 'content',
    description: 'Blog article page template',
    tags: ['template', 'blog', 'article', 'content'],
    composedOf: ['navbar', 'footer'],
  },
  {
    id: 'template-dashboard',
    name: 'Dashboard Shell',
    layer: 'template',
    category: 'application',
    description: 'App dashboard layout template',
    tags: ['template', 'dashboard', 'app', 'admin'],
    composedOf: ['navbar', 'stats-row'],
  },
];

// ============================================
// THEME DATA
// ============================================

export interface ThemeInfo {
  id: string;
  name: string;
  description: string;
  colors: {
    primary: string;
    background: string;
    surface: string;
    text: string;
    accent: string;
  };
}

export const themes: ThemeInfo[] = [
  {
    id: 'default',
    name: 'Default',
    description: 'Clean, modern light theme with indigo accents',
    colors: {
      primary: '#6366f1',
      background: '#ffffff',
      surface: '#f8fafc',
      text: '#1e293b',
      accent: '#8b5cf6',
    },
  },
  {
    id: 'dark',
    name: 'Dark',
    description: 'Dark mode with subtle contrast and purple accents',
    colors: {
      primary: '#818cf8',
      background: '#0f172a',
      surface: '#1e293b',
      text: '#f1f5f9',
      accent: '#a78bfa',
    },
  },
  {
    id: 'brutal',
    name: 'Brutal',
    description: 'Neo-brutalist with hard shadows and bold colors',
    colors: {
      primary: '#000000',
      background: '#ffffff',
      surface: '#fef08a',
      text: '#000000',
      accent: '#ef4444',
    },
  },
  {
    id: 'neon',
    name: 'Neon',
    description: 'Cyberpunk with neon glows and dark backgrounds',
    colors: {
      primary: '#00ff88',
      background: '#0a0a0f',
      surface: '#1a1a2e',
      text: '#e0e0e0',
      accent: '#ff00ff',
    },
  },
  {
    id: 'cosmic',
    name: 'Cosmic',
    description: 'Deep space theme with aurora accents',
    colors: {
      primary: '#60a5fa',
      background: '#030712',
      surface: '#111827',
      text: '#f3f4f6',
      accent: '#c084fc',
    },
  },
  {
    id: 'glass',
    name: 'Glass',
    description: 'Glassmorphism with blur effects and transparency',
    colors: {
      primary: '#3b82f6',
      background: '#f0f9ff',
      surface: 'rgba(255,255,255,0.7)',
      text: '#1e3a5f',
      accent: '#0ea5e9',
    },
  },
];

// ============================================
// SEARCH & UTILITY FUNCTIONS
// ============================================

export interface SearchOptions {
  query?: string;
  layer?: ElementLayer;
  category?: ElementCategory;
  tags?: string[];
  limit?: number;
}

/**
 * Search elements by query, layer, category, or tags
 */
export function searchElements(options: SearchOptions = {}): ElementMetadata[] {
  let results = [...elementCatalog];

  // Filter by layer
  if (options.layer) {
    results = results.filter(el => el.layer === options.layer);
  }

  // Filter by category
  if (options.category) {
    results = results.filter(el => el.category === options.category);
  }

  // Filter by tags
  if (options.tags && options.tags.length > 0) {
    const searchTags = options.tags.map(t => t.toLowerCase());
    results = results.filter(el =>
      el.tags.some(tag => searchTags.includes(tag.toLowerCase()))
    );
  }

  // Filter by query (searches name, description, and tags)
  if (options.query) {
    const q = options.query.toLowerCase();
    results = results.filter(el =>
      el.name.toLowerCase().includes(q) ||
      el.description.toLowerCase().includes(q) ||
      el.tags.some(tag => tag.toLowerCase().includes(q))
    );
  }

  // Apply limit
  if (options.limit && options.limit > 0) {
    results = results.slice(0, options.limit);
  }

  return results;
}

/**
 * Get element by ID
 */
export function getElementById(id: string): ElementMetadata | undefined {
  return elementCatalog.find(el => el.id === id);
}

/**
 * Get all categories with element counts
 */
export function getCategories(): Record<string, { count: number; layer: ElementLayer }> {
  const categories: Record<string, { count: number; layer: ElementLayer }> = {};

  for (const el of elementCatalog) {
    if (!categories[el.category]) {
      categories[el.category] = { count: 0, layer: el.layer };
    }
    categories[el.category].count++;
  }

  return categories;
}

/**
 * Get elements by layer
 */
export function getElementsByLayer(layer: ElementLayer): ElementMetadata[] {
  return elementCatalog.filter(el => el.layer === layer);
}

/**
 * Get theme by ID
 */
export function getThemeById(id: string): ThemeInfo | undefined {
  return themes.find(t => t.id === id);
}

// ============================================
// ZONE DATA
// ============================================

export interface ZoneInfo {
  id: string;
  name: string;
  description: string;
  aesthetic: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
  componentCount: number;
  tags: string[];
}

export const zones: ZoneInfo[] = [
  {
    id: 'arcade',
    name: 'Arcade Basement',
    description: 'Retro gaming aesthetics with neon lights, pixel art, and cabinet-style interfaces',
    aesthetic: 'Retro gaming, neon lights, pixel art, CRT effects',
    colors: { primary: '#ff00ff', secondary: '#00ffff', accent: '#ffff00', background: '#1a0a2e' },
    componentCount: 20,
    tags: ['gaming', 'retro', 'neon', 'pixel', '8-bit', 'arcade'],
  },
  {
    id: 'cosmic',
    name: 'Cosmic Observatory',
    description: 'Space and astronomy themed with star fields, nebulae, and celestial animations',
    aesthetic: 'Deep space, nebulae, star clusters, astronomical data',
    colors: { primary: '#60a5fa', secondary: '#c084fc', accent: '#f472b6', background: '#030712' },
    componentCount: 20,
    tags: ['space', 'astronomy', 'stars', 'nebula', 'celestial', 'sci-fi'],
  },
  {
    id: 'hacker',
    name: 'Hacker Terminal',
    description: 'Cyberpunk terminal aesthetics with matrix-style animations and green-on-black themes',
    aesthetic: 'Terminal, matrix, code rain, cyber security',
    colors: { primary: '#00ff00', secondary: '#00ffff', accent: '#ff00ff', background: '#0a0a0f' },
    componentCount: 20,
    tags: ['hacker', 'terminal', 'matrix', 'cyber', 'code', 'security'],
  },
  {
    id: 'physics',
    name: 'Physics Playground',
    description: 'Interactive physics simulations with particles, gravity, and scientific visualizations',
    aesthetic: 'Scientific, particle systems, physics simulations',
    colors: { primary: '#3b82f6', secondary: '#8b5cf6', accent: '#f59e0b', background: '#0f172a' },
    componentCount: 20,
    tags: ['physics', 'science', 'particles', 'simulation', 'gravity', 'waves'],
  },
  {
    id: 'mad-science',
    name: 'Mad Science Lab',
    description: 'Laboratory aesthetics with bubbling experiments, Tesla coils, and chemical reactions',
    aesthetic: 'Laboratory, experiments, Tesla coils, chemistry',
    colors: { primary: '#22c55e', secondary: '#a855f7', accent: '#f97316', background: '#052e16' },
    componentCount: 20,
    tags: ['science', 'lab', 'chemistry', 'experiments', 'tesla', 'biology'],
  },
  {
    id: 'pulp',
    name: 'Pulp Detective',
    description: 'Film noir aesthetics with rain, neon signs, and mystery-themed interfaces',
    aesthetic: 'Noir, detective, rainy nights, typewriters, mystery',
    colors: { primary: '#d4a373', secondary: '#e63946', accent: '#f1faee', background: '#1d3557' },
    componentCount: 20,
    tags: ['noir', 'detective', 'mystery', 'vintage', 'crime', 'rain'],
  },
  {
    id: 'organic',
    name: 'Organic Garden',
    description: 'Nature-inspired with growing plants, flowing water, and organic animations',
    aesthetic: 'Natural, botanical, organic growth, garden',
    colors: { primary: '#22c55e', secondary: '#84cc16', accent: '#f59e0b', background: '#14532d' },
    componentCount: 20,
    tags: ['nature', 'plants', 'garden', 'organic', 'botanical', 'growth'],
  },
  {
    id: 'retro-office',
    name: 'Retro Office',
    description: '70s-80s office aesthetics with CRT monitors, filing cabinets, and vintage tech',
    aesthetic: 'Vintage office, 70s-80s, CRT, analog tech',
    colors: { primary: '#d4a373', secondary: '#6b705c', accent: '#cb997e', background: '#ffe8d6' },
    componentCount: 20,
    tags: ['retro', 'office', 'vintage', 'analog', '70s', '80s'],
  },
  {
    id: 'cinema',
    name: 'Cinema Stage',
    description: 'Movie theater and stage aesthetics with curtains, spotlights, and film elements',
    aesthetic: 'Theater, cinema, stage, film, Hollywood',
    colors: { primary: '#dc2626', secondary: '#fbbf24', accent: '#f8fafc', background: '#1f1f1f' },
    componentCount: 20,
    tags: ['cinema', 'movie', 'theater', 'stage', 'film', 'spotlight'],
  },
  {
    id: 'geometry',
    name: 'Geometry Lab',
    description: 'Mathematical visualizations with fractals, tessellations, and geometric animations',
    aesthetic: 'Mathematical, fractals, tessellation, sacred geometry',
    colors: { primary: '#6366f1', secondary: '#ec4899', accent: '#14b8a6', background: '#18181b' },
    componentCount: 20,
    tags: ['geometry', 'math', 'fractal', 'tessellation', 'pattern', 'visualization'],
  },
  {
    id: 'artist-studio',
    name: 'Artist Studio',
    description: 'Creative art studio with paint, brushes, canvas, and artistic effects',
    aesthetic: 'Art studio, painting, canvas, creative tools',
    colors: { primary: '#f97316', secondary: '#8b5cf6', accent: '#06b6d4', background: '#fef3c7' },
    componentCount: 20,
    tags: ['art', 'painting', 'canvas', 'creative', 'studio', 'brush'],
  },
  {
    id: 'underwater',
    name: 'Underwater Depths',
    description: 'Ocean and aquatic themes with bubbles, waves, and bioluminescent effects',
    aesthetic: 'Ocean, deep sea, bioluminescence, aquatic',
    colors: { primary: '#0891b2', secondary: '#06b6d4', accent: '#22d3d1', background: '#0c4a6e' },
    componentCount: 10,
    tags: ['underwater', 'ocean', 'sea', 'aquatic', 'bubbles', 'waves'],
  },
  {
    id: 'steampunk',
    name: 'Steampunk Workshop',
    description: 'Victorian-era machinery with gears, brass, steam, and clockwork mechanisms',
    aesthetic: 'Victorian, brass, gears, steam, clockwork',
    colors: { primary: '#b45309', secondary: '#78350f', accent: '#fbbf24', background: '#292524' },
    componentCount: 10,
    tags: ['steampunk', 'gears', 'brass', 'victorian', 'clockwork', 'machinery'],
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk District',
    description: 'Dystopian future with holographic displays, neon advertisements, and glitch effects',
    aesthetic: 'Dystopian, holographic, neon ads, glitch',
    colors: { primary: '#f43f5e', secondary: '#8b5cf6', accent: '#00ffff', background: '#18181b' },
    componentCount: 10,
    tags: ['cyberpunk', 'dystopia', 'hologram', 'neon', 'glitch', 'future'],
  },
  {
    id: 'medieval',
    name: 'Medieval Scriptorium',
    description: 'Medieval manuscript aesthetics with illuminated letters, parchment, and Gothic elements',
    aesthetic: 'Medieval, manuscripts, Gothic, parchment',
    colors: { primary: '#b91c1c', secondary: '#1e3a8a', accent: '#ca8a04', background: '#fef3c7' },
    componentCount: 10,
    tags: ['medieval', 'gothic', 'manuscript', 'parchment', 'illuminated', 'ancient'],
  },
  {
    id: 'space-station',
    name: 'Space Station',
    description: 'Futuristic space station with control panels, airlocks, and sci-fi interfaces',
    aesthetic: 'Sci-fi, space station, control panels, futuristic',
    colors: { primary: '#94a3b8', secondary: '#3b82f6', accent: '#ef4444', background: '#1e293b' },
    componentCount: 10,
    tags: ['space', 'station', 'sci-fi', 'futuristic', 'control', 'panels'],
  },
];

/**
 * Get zone by ID
 */
export function getZoneById(id: string): ZoneInfo | undefined {
  return zones.find(z => z.id === id);
}

/**
 * Get all zones
 */
export function getAllZones(): ZoneInfo[] {
  return zones;
}

/**
 * Search zones by query
 */
export function searchZones(query?: string): ZoneInfo[] {
  if (!query) return zones;

  const q = query.toLowerCase();
  return zones.filter(z =>
    z.name.toLowerCase().includes(q) ||
    z.description.toLowerCase().includes(q) ||
    z.aesthetic.toLowerCase().includes(q) ||
    z.tags.some(tag => tag.toLowerCase().includes(q))
  );
}
