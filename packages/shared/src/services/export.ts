/**
 * Export Service
 *
 * Generates exportable React + Tailwind code from recipes.
 * Used by both the server (API endpoint) and MCP (export_recipe tool).
 */

import JSZip from 'jszip';
import type { RecipeContent, BlockNode } from '../types/index.js';

// ============================================
// TYPES
// ============================================

export type ExportFormat = 'react-tailwind' | 'html-css' | 'next-app';

export interface ExportOptions {
  format: ExportFormat;
  theme: string;
  includeTheme: boolean;
  projectName: string;
  recipeName: string;
}

export interface ExportFile {
  path: string;
  content: string;
}

export interface ExportResult {
  files: ExportFile[];
  zipBuffer?: Buffer;
}

// ============================================
// THEME CSS TEMPLATES
// ============================================

const THEME_CSS: Record<string, string> = {
  default: `/* Default Theme (Light) */
:root {
  --color-primary: #3b82f6;
  --color-primary-hover: #2563eb;
  --color-primary-active: #1d4ed8;
  --color-primary-subtle: #eff6ff;

  --color-secondary: #4b5563;
  --color-secondary-hover: #374151;

  --color-accent: #8b5cf6;
  --color-accent-hover: #7c3aed;

  --color-background: #ffffff;
  --color-background-subtle: #f9fafb;
  --color-background-muted: #f3f4f6;

  --color-surface: #ffffff;
  --color-surface-hover: #f9fafb;
  --color-surface-elevated: #ffffff;

  --color-text: #111827;
  --color-text-secondary: #4b5563;
  --color-text-muted: #6b7280;
  --color-text-inverse: #ffffff;
  --color-text-on-primary: #ffffff;

  --color-border: #e5e7eb;
  --color-border-muted: #f3f4f6;
  --color-border-strong: #d1d5db;

  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);

  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-2xl: 1rem;
  --radius-full: 9999px;

  --font-family-sans: ui-sans-serif, system-ui, sans-serif;
  --font-family-mono: ui-monospace, monospace;
}`,

  dark: `/* Dark Theme */
:root {
  --color-primary: #818cf8;
  --color-primary-hover: #6366f1;
  --color-primary-active: #4f46e5;
  --color-primary-subtle: #1e1b4b;

  --color-secondary: #9ca3af;
  --color-secondary-hover: #d1d5db;

  --color-accent: #a78bfa;
  --color-accent-hover: #8b5cf6;

  --color-background: #0f172a;
  --color-background-subtle: #1e293b;
  --color-background-muted: #334155;

  --color-surface: #1e293b;
  --color-surface-hover: #334155;
  --color-surface-elevated: #334155;

  --color-text: #f1f5f9;
  --color-text-secondary: #cbd5e1;
  --color-text-muted: #94a3b8;
  --color-text-inverse: #0f172a;
  --color-text-on-primary: #0f172a;

  --color-border: #334155;
  --color-border-muted: #1e293b;
  --color-border-strong: #475569;

  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.3);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.4);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.5);

  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-2xl: 1rem;
  --radius-full: 9999px;

  --font-family-sans: ui-sans-serif, system-ui, sans-serif;
  --font-family-mono: ui-monospace, monospace;
}`,

  brutal: `/* Neo-Brutalist Theme */
:root {
  --color-primary: #000000;
  --color-primary-hover: #1f2937;
  --color-primary-active: #374151;
  --color-primary-subtle: #fef08a;

  --color-secondary: #000000;
  --color-secondary-hover: #1f2937;

  --color-accent: #ef4444;
  --color-accent-hover: #dc2626;

  --color-background: #ffffff;
  --color-background-subtle: #fef9c3;
  --color-background-muted: #fef08a;

  --color-surface: #ffffff;
  --color-surface-hover: #fef9c3;
  --color-surface-elevated: #fef08a;

  --color-text: #000000;
  --color-text-secondary: #1f2937;
  --color-text-muted: #374151;
  --color-text-inverse: #ffffff;
  --color-text-on-primary: #ffffff;

  --color-border: #000000;
  --color-border-muted: #374151;
  --color-border-strong: #000000;

  --shadow-sm: 4px 4px 0 0 #000;
  --shadow-md: 6px 6px 0 0 #000;
  --shadow-lg: 8px 8px 0 0 #000;

  --radius-sm: 0;
  --radius-md: 0;
  --radius-lg: 0;
  --radius-xl: 0;
  --radius-2xl: 0;
  --radius-full: 0;

  --font-family-sans: ui-sans-serif, system-ui, sans-serif;
  --font-family-mono: ui-monospace, monospace;
}`,

  neon: `/* Neon/Cyberpunk Theme */
:root {
  --color-primary: #00ff88;
  --color-primary-hover: #00cc6a;
  --color-primary-active: #00994f;
  --color-primary-subtle: #001a0d;

  --color-secondary: #ff00ff;
  --color-secondary-hover: #cc00cc;

  --color-accent: #ff00ff;
  --color-accent-hover: #cc00cc;

  --color-background: #0a0a0f;
  --color-background-subtle: #12121a;
  --color-background-muted: #1a1a2e;

  --color-surface: #1a1a2e;
  --color-surface-hover: #252540;
  --color-surface-elevated: #252540;

  --color-text: #e0e0e0;
  --color-text-secondary: #a0a0a0;
  --color-text-muted: #707070;
  --color-text-inverse: #0a0a0f;
  --color-text-on-primary: #0a0a0f;

  --color-border: #00ff88;
  --color-border-muted: #004422;
  --color-border-strong: #00ff88;

  --shadow-sm: 0 0 10px #00ff8840;
  --shadow-md: 0 0 20px #00ff8860;
  --shadow-lg: 0 0 30px #00ff8880;

  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-2xl: 1rem;
  --radius-full: 9999px;

  --font-family-sans: ui-sans-serif, system-ui, sans-serif;
  --font-family-mono: ui-monospace, monospace;
}`,

  cosmic: `/* Cosmic/Space Theme */
:root {
  --color-primary: #60a5fa;
  --color-primary-hover: #3b82f6;
  --color-primary-active: #2563eb;
  --color-primary-subtle: #1e1b4b;

  --color-secondary: #c084fc;
  --color-secondary-hover: #a855f7;

  --color-accent: #c084fc;
  --color-accent-hover: #a855f7;

  --color-background: #030712;
  --color-background-subtle: #0f172a;
  --color-background-muted: #1e293b;

  --color-surface: #111827;
  --color-surface-hover: #1f2937;
  --color-surface-elevated: #1f2937;

  --color-text: #f3f4f6;
  --color-text-secondary: #d1d5db;
  --color-text-muted: #9ca3af;
  --color-text-inverse: #030712;
  --color-text-on-primary: #030712;

  --color-border: #374151;
  --color-border-muted: #1f2937;
  --color-border-strong: #4b5563;

  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.3);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.4);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.5);

  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-2xl: 1rem;
  --radius-full: 9999px;

  --font-family-sans: ui-sans-serif, system-ui, sans-serif;
  --font-family-mono: ui-monospace, monospace;
}`,

  glass: `/* Glassmorphism Theme */
:root {
  --color-primary: #3b82f6;
  --color-primary-hover: #2563eb;
  --color-primary-active: #1d4ed8;
  --color-primary-subtle: rgba(59, 130, 246, 0.1);

  --color-secondary: #64748b;
  --color-secondary-hover: #475569;

  --color-accent: #0ea5e9;
  --color-accent-hover: #0284c7;

  --color-background: #f0f9ff;
  --color-background-subtle: rgba(255, 255, 255, 0.5);
  --color-background-muted: rgba(255, 255, 255, 0.3);

  --color-surface: rgba(255, 255, 255, 0.7);
  --color-surface-hover: rgba(255, 255, 255, 0.8);
  --color-surface-elevated: rgba(255, 255, 255, 0.9);

  --color-text: #1e3a5f;
  --color-text-secondary: #475569;
  --color-text-muted: #64748b;
  --color-text-inverse: #ffffff;
  --color-text-on-primary: #ffffff;

  --color-border: rgba(255, 255, 255, 0.3);
  --color-border-muted: rgba(255, 255, 255, 0.1);
  --color-border-strong: rgba(255, 255, 255, 0.5);

  --shadow-sm: 0 4px 6px -1px rgb(0 0 0 / 0.05);
  --shadow-md: 0 10px 15px -3px rgb(0 0 0 / 0.08);
  --shadow-lg: 0 20px 25px -5px rgb(0 0 0 / 0.1);

  --radius-sm: 0.5rem;
  --radius-md: 0.75rem;
  --radius-lg: 1rem;
  --radius-xl: 1.25rem;
  --radius-2xl: 1.5rem;
  --radius-full: 9999px;

  --font-family-sans: ui-sans-serif, system-ui, sans-serif;
  --font-family-mono: ui-monospace, monospace;
}`,
};

// ============================================
// COMPONENT CODE TEMPLATES
// ============================================

/**
 * Maps element IDs to their React component code
 * These are simplified implementations for export
 */
function getComponentCode(type: string, props: Record<string, unknown>): string {
  const componentName = typeToComponentName(type);

  switch (type) {
    case 'hero-centered':
      return generateHeroCentered(props);
    case 'hero-split':
      return generateHeroSplit(props);
    case 'feature-grid':
      return generateFeatureGrid(props);
    case 'pricing-table':
      return generatePricingTable(props);
    case 'testimonials-carousel':
      return generateTestimonialsCarousel(props);
    case 'cta-banner':
      return generateCtaBanner(props);
    case 'navbar':
      return generateNavbar(props);
    case 'footer':
      return generateFooter(props);
    case 'stats-row':
      return generateStatsRow(props);
    case 'faq-accordion':
      return generateFaqAccordion(props);
    case 'team-grid':
      return generateTeamGrid(props);
    default:
      return generateGenericSection(type, props);
  }
}

function typeToComponentName(type: string): string {
  return type
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

// ============================================
// COMPONENT GENERATORS
// ============================================

function generateHeroCentered(props: Record<string, unknown>): string {
  const title = String(props.title || 'Welcome to Our Platform');
  const subtitle = String(props.subtitle || 'Build something amazing today');
  const ctaText = String(props.ctaText || 'Get Started');
  const ctaLink = String(props.ctaLink || '#');

  return `export function HeroCentered() {
  return (
    <section className="py-20 px-4 bg-[var(--color-background)]">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-[var(--color-text)] mb-6">
          ${escapeJsx(title)}
        </h1>
        <p className="text-xl text-[var(--color-text-secondary)] mb-8 max-w-2xl mx-auto">
          ${escapeJsx(subtitle)}
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="${escapeJsx(ctaLink)}"
            className="px-8 py-3 bg-[var(--color-primary)] text-[var(--color-text-on-primary)] rounded-[var(--radius-lg)] font-medium hover:bg-[var(--color-primary-hover)] transition-colors shadow-[var(--shadow-md)]"
          >
            ${escapeJsx(ctaText)}
          </a>
        </div>
      </div>
    </section>
  );
}`;
}

function generateHeroSplit(props: Record<string, unknown>): string {
  const title = String(props.title || 'Transform Your Business');
  const subtitle = String(props.subtitle || 'Take your company to the next level');
  const ctaText = String(props.ctaText || 'Learn More');
  const imageUrl = String(props.imageUrl || 'https://placehold.co/600x400');

  return `export function HeroSplit() {
  return (
    <section className="py-20 px-4 bg-[var(--color-background)]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text)] mb-6">
            ${escapeJsx(title)}
          </h1>
          <p className="text-xl text-[var(--color-text-secondary)] mb-8">
            ${escapeJsx(subtitle)}
          </p>
          <a
            href="#"
            className="inline-block px-8 py-3 bg-[var(--color-primary)] text-[var(--color-text-on-primary)] rounded-[var(--radius-lg)] font-medium hover:bg-[var(--color-primary-hover)] transition-colors"
          >
            ${escapeJsx(ctaText)}
          </a>
        </div>
        <div>
          <img
            src="${escapeJsx(imageUrl)}"
            alt="Hero"
            className="w-full rounded-[var(--radius-xl)] shadow-[var(--shadow-lg)]"
          />
        </div>
      </div>
    </section>
  );
}`;
}

function generateFeatureGrid(props: Record<string, unknown>): string {
  const heading = String(props.heading || 'Features');
  const subheading = String(props.subheading || 'Everything you need to succeed');

  return `export function FeatureGrid() {
  const features = [
    { title: 'Fast Performance', description: 'Lightning-fast load times', icon: '\\u26A1' },
    { title: 'Secure', description: 'Enterprise-grade security', icon: '\\uD83D\\uDD12' },
    { title: 'Scalable', description: 'Grows with your business', icon: '\\uD83D\\uDCC8' },
    { title: 'Support', description: '24/7 customer support', icon: '\\uD83D\\uDCAC' },
  ];

  return (
    <section className="py-20 px-4 bg-[var(--color-background-subtle)]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[var(--color-text)] mb-4">${escapeJsx(heading)}</h2>
          <p className="text-[var(--color-text-secondary)]">${escapeJsx(subheading)}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className="p-6 bg-[var(--color-surface)] rounded-[var(--radius-xl)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-shadow"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">{feature.title}</h3>
              <p className="text-[var(--color-text-muted)]">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`;
}

function generatePricingTable(props: Record<string, unknown>): string {
  const heading = String(props.heading || 'Pricing Plans');

  return `export function PricingTable() {
  const plans = [
    { name: 'Starter', price: '$9', period: '/month', features: ['5 Projects', '10GB Storage', 'Email Support'] },
    { name: 'Pro', price: '$29', period: '/month', features: ['Unlimited Projects', '100GB Storage', 'Priority Support', 'Analytics'], popular: true },
    { name: 'Enterprise', price: '$99', period: '/month', features: ['Everything in Pro', 'Custom Integrations', 'Dedicated Manager', 'SLA'] },
  ];

  return (
    <section className="py-20 px-4 bg-[var(--color-background)]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-[var(--color-text)] mb-12">${escapeJsx(heading)}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={\`p-8 rounded-[var(--radius-xl)] border \${
                plan.popular
                  ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-[var(--color-text-on-primary)]'
                  : 'bg-[var(--color-surface)] border-[var(--color-border)]'
              }\`}
            >
              {plan.popular && (
                <span className="text-xs font-semibold uppercase tracking-wide opacity-80">Most Popular</span>
              )}
              <h3 className="text-2xl font-bold mt-2">{plan.name}</h3>
              <div className="mt-4 mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="opacity-70">{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-2">
                    <span>\\u2713</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className={\`w-full py-3 rounded-[var(--radius-lg)] font-medium transition-colors \${
                  plan.popular
                    ? 'bg-[var(--color-surface)] text-[var(--color-text)]'
                    : 'bg-[var(--color-primary)] text-[var(--color-text-on-primary)]'
                }\`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`;
}

function generateTestimonialsCarousel(props: Record<string, unknown>): string {
  const heading = String(props.heading || 'What Our Customers Say');

  return `export function TestimonialsCarousel() {
  const testimonials = [
    { quote: 'This product transformed our workflow completely.', author: 'Jane Doe', role: 'CEO, TechCorp' },
    { quote: 'Best decision we made this year.', author: 'John Smith', role: 'CTO, StartupXYZ' },
    { quote: 'Incredible support and amazing features.', author: 'Sarah Johnson', role: 'Product Manager' },
  ];

  return (
    <section className="py-20 px-4 bg-[var(--color-background-subtle)]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-[var(--color-text)] mb-12">${escapeJsx(heading)}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <div key={i} className="p-6 bg-[var(--color-surface)] rounded-[var(--radius-xl)] shadow-[var(--shadow-sm)]">
              <p className="text-[var(--color-text)] mb-4 italic">"{testimonial.quote}"</p>
              <div>
                <p className="font-semibold text-[var(--color-text)]">{testimonial.author}</p>
                <p className="text-sm text-[var(--color-text-muted)]">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`;
}

function generateCtaBanner(props: Record<string, unknown>): string {
  const title = String(props.title || 'Ready to Get Started?');
  const subtitle = String(props.subtitle || 'Join thousands of satisfied customers today.');
  const ctaText = String(props.ctaText || 'Start Free Trial');

  return `export function CtaBanner() {
  return (
    <section className="py-20 px-4 bg-[var(--color-primary)]">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-[var(--color-text-on-primary)] mb-4">
          ${escapeJsx(title)}
        </h2>
        <p className="text-xl text-[var(--color-text-on-primary)] opacity-90 mb-8">
          ${escapeJsx(subtitle)}
        </p>
        <a
          href="#"
          className="inline-block px-8 py-3 bg-[var(--color-surface)] text-[var(--color-text)] rounded-[var(--radius-lg)] font-medium hover:opacity-90 transition-opacity shadow-[var(--shadow-md)]"
        >
          ${escapeJsx(ctaText)}
        </a>
      </div>
    </section>
  );
}`;
}

function generateNavbar(props: Record<string, unknown>): string {
  const brandName = String(props.brandName || 'Brand');

  return `export function Navbar() {
  const links = ['Features', 'Pricing', 'About', 'Contact'];

  return (
    <nav className="py-4 px-6 bg-[var(--color-surface)] border-b border-[var(--color-border)]">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <a href="/" className="text-xl font-bold text-[var(--color-text)]">${escapeJsx(brandName)}</a>
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a key={link} href="#" className="text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors">
              {link}
            </a>
          ))}
        </div>
        <a
          href="#"
          className="px-4 py-2 bg-[var(--color-primary)] text-[var(--color-text-on-primary)] rounded-[var(--radius-lg)] text-sm font-medium hover:bg-[var(--color-primary-hover)] transition-colors"
        >
          Sign Up
        </a>
      </div>
    </nav>
  );
}`;
}

function generateFooter(props: Record<string, unknown>): string {
  const companyName = String(props.companyName || 'Company');
  const year = new Date().getFullYear();

  return `export function Footer() {
  const columns = [
    { title: 'Product', links: ['Features', 'Pricing', 'Security'] },
    { title: 'Company', links: ['About', 'Blog', 'Careers'] },
    { title: 'Support', links: ['Help Center', 'Contact', 'Status'] },
  ];

  return (
    <footer className="py-12 px-6 bg-[var(--color-background-muted)] border-t border-[var(--color-border)]">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold text-[var(--color-text)] mb-4">${escapeJsx(companyName)}</h3>
            <p className="text-[var(--color-text-muted)] text-sm">Building the future, one pixel at a time.</p>
          </div>
          {columns.map((column) => (
            <div key={column.title}>
              <h4 className="font-semibold text-[var(--color-text)] mb-4">{column.title}</h4>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] text-sm transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t border-[var(--color-border)] text-center text-sm text-[var(--color-text-muted)]">
          &copy; ${year} ${escapeJsx(companyName)}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}`;
}

function generateStatsRow(props: Record<string, unknown>): string {
  return `export function StatsRow() {
  const stats = [
    { value: '10K+', label: 'Customers' },
    { value: '99.9%', label: 'Uptime' },
    { value: '24/7', label: 'Support' },
    { value: '50+', label: 'Countries' },
  ];

  return (
    <section className="py-16 px-4 bg-[var(--color-background)]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl font-bold text-[var(--color-primary)]">{stat.value}</div>
              <div className="text-[var(--color-text-muted)] mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`;
}

function generateFaqAccordion(props: Record<string, unknown>): string {
  const heading = String(props.heading || 'Frequently Asked Questions');

  return `export function FaqAccordion() {
  const faqs = [
    { question: 'How do I get started?', answer: 'Sign up for a free account and follow our quick start guide.' },
    { question: 'What payment methods do you accept?', answer: 'We accept all major credit cards and PayPal.' },
    { question: 'Can I cancel anytime?', answer: 'Yes, you can cancel your subscription at any time with no penalties.' },
    { question: 'Is there a free trial?', answer: 'Yes, we offer a 14-day free trial with full access to all features.' },
  ];

  return (
    <section className="py-20 px-4 bg-[var(--color-background)]">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-[var(--color-text)] mb-12">${escapeJsx(heading)}</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="group bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border)]">
              <summary className="p-4 cursor-pointer font-medium text-[var(--color-text)] list-none flex justify-between items-center">
                {faq.question}
                <span className="text-[var(--color-text-muted)] group-open:rotate-180 transition-transform">\\u25BC</span>
              </summary>
              <div className="px-4 pb-4 text-[var(--color-text-secondary)]">{faq.answer}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}`;
}

function generateTeamGrid(props: Record<string, unknown>): string {
  const heading = String(props.heading || 'Meet Our Team');

  return `export function TeamGrid() {
  const team = [
    { name: 'Alex Johnson', role: 'CEO', image: 'https://placehold.co/200x200' },
    { name: 'Sam Williams', role: 'CTO', image: 'https://placehold.co/200x200' },
    { name: 'Jordan Lee', role: 'Design Lead', image: 'https://placehold.co/200x200' },
    { name: 'Casey Brown', role: 'Engineering', image: 'https://placehold.co/200x200' },
  ];

  return (
    <section className="py-20 px-4 bg-[var(--color-background-subtle)]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-[var(--color-text)] mb-12">${escapeJsx(heading)}</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {team.map((member, i) => (
            <div key={i} className="text-center">
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
              />
              <h3 className="font-semibold text-[var(--color-text)]">{member.name}</h3>
              <p className="text-sm text-[var(--color-text-muted)]">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`;
}

function generateGenericSection(type: string, props: Record<string, unknown>): string {
  const componentName = typeToComponentName(type);
  const title = String(props.title || props.heading || 'Section');

  return `export function ${componentName}() {
  return (
    <section className="py-16 px-4 bg-[var(--color-background)]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-[var(--color-text)] mb-4">${escapeJsx(title)}</h2>
        <p className="text-[var(--color-text-secondary)]">
          This is a placeholder for the ${type} component.
        </p>
      </div>
    </section>
  );
}`;
}

function escapeJsx(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .replace(/\n/g, '\\n');
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ============================================
// HTML COMPONENT GENERATORS
// ============================================

function getHtmlComponentCode(type: string, props: Record<string, unknown>): string {
  switch (type) {
    case 'hero-centered':
      return generateHtmlHeroCentered(props);
    case 'hero-split':
      return generateHtmlHeroSplit(props);
    case 'feature-grid':
      return generateHtmlFeatureGrid(props);
    case 'pricing-table':
      return generateHtmlPricingTable(props);
    case 'testimonials-carousel':
      return generateHtmlTestimonialsCarousel(props);
    case 'cta-banner':
      return generateHtmlCtaBanner(props);
    case 'navbar':
      return generateHtmlNavbar(props);
    case 'footer':
      return generateHtmlFooter(props);
    case 'stats-row':
      return generateHtmlStatsRow(props);
    case 'faq-accordion':
      return generateHtmlFaqAccordion(props);
    case 'team-grid':
      return generateHtmlTeamGrid(props);
    default:
      return generateHtmlGenericSection(type, props);
  }
}

function generateHtmlHeroCentered(props: Record<string, unknown>): string {
  const title = String(props.title || 'Welcome to Our Platform');
  const subtitle = String(props.subtitle || 'Build something amazing today');
  const ctaText = String(props.ctaText || 'Get Started');
  const ctaLink = String(props.ctaLink || '#');

  return `  <section class="hero-centered">
    <div class="container">
      <h1>${escapeHtml(title)}</h1>
      <p class="subtitle">${escapeHtml(subtitle)}</p>
      <div class="cta-buttons">
        <a href="${escapeHtml(ctaLink)}" class="btn btn-primary">${escapeHtml(ctaText)}</a>
      </div>
    </div>
  </section>`;
}

function generateHtmlHeroSplit(props: Record<string, unknown>): string {
  const title = String(props.title || 'Transform Your Business');
  const subtitle = String(props.subtitle || 'Take your company to the next level');
  const ctaText = String(props.ctaText || 'Learn More');
  const imageUrl = String(props.imageUrl || 'https://placehold.co/600x400');

  return `  <section class="hero-split">
    <div class="container">
      <div class="hero-split-content">
        <h1>${escapeHtml(title)}</h1>
        <p class="subtitle">${escapeHtml(subtitle)}</p>
        <a href="#" class="btn btn-primary">${escapeHtml(ctaText)}</a>
      </div>
      <div class="hero-split-image">
        <img src="${escapeHtml(imageUrl)}" alt="Hero image">
      </div>
    </div>
  </section>`;
}

function generateHtmlFeatureGrid(props: Record<string, unknown>): string {
  const heading = String(props.heading || 'Features');
  const subheading = String(props.subheading || 'Everything you need to succeed');

  return `  <section class="feature-grid">
    <div class="container">
      <div class="section-header">
        <h2>${escapeHtml(heading)}</h2>
        <p>${escapeHtml(subheading)}</p>
      </div>
      <div class="features">
        <div class="feature-card">
          <div class="feature-icon">⚡</div>
          <h3>Fast Performance</h3>
          <p>Lightning-fast load times</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🔒</div>
          <h3>Secure</h3>
          <p>Enterprise-grade security</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">📈</div>
          <h3>Scalable</h3>
          <p>Grows with your business</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">💬</div>
          <h3>Support</h3>
          <p>24/7 customer support</p>
        </div>
      </div>
    </div>
  </section>`;
}

function generateHtmlPricingTable(props: Record<string, unknown>): string {
  const heading = String(props.heading || 'Pricing Plans');

  return `  <section class="pricing-table">
    <div class="container">
      <h2>${escapeHtml(heading)}</h2>
      <div class="pricing-cards">
        <div class="pricing-card">
          <h3>Starter</h3>
          <div class="price"><span class="amount">$9</span><span class="period">/month</span></div>
          <ul class="features-list">
            <li>✓ 5 Projects</li>
            <li>✓ 10GB Storage</li>
            <li>✓ Email Support</li>
          </ul>
          <a href="#" class="btn btn-secondary">Get Started</a>
        </div>
        <div class="pricing-card popular">
          <span class="badge">Most Popular</span>
          <h3>Pro</h3>
          <div class="price"><span class="amount">$29</span><span class="period">/month</span></div>
          <ul class="features-list">
            <li>✓ Unlimited Projects</li>
            <li>✓ 100GB Storage</li>
            <li>✓ Priority Support</li>
            <li>✓ Analytics</li>
          </ul>
          <a href="#" class="btn btn-primary">Get Started</a>
        </div>
        <div class="pricing-card">
          <h3>Enterprise</h3>
          <div class="price"><span class="amount">$99</span><span class="period">/month</span></div>
          <ul class="features-list">
            <li>✓ Everything in Pro</li>
            <li>✓ Custom Integrations</li>
            <li>✓ Dedicated Manager</li>
            <li>✓ SLA</li>
          </ul>
          <a href="#" class="btn btn-secondary">Get Started</a>
        </div>
      </div>
    </div>
  </section>`;
}

function generateHtmlTestimonialsCarousel(props: Record<string, unknown>): string {
  const heading = String(props.heading || 'What Our Customers Say');

  return `  <section class="testimonials">
    <div class="container">
      <h2>${escapeHtml(heading)}</h2>
      <div class="testimonial-cards">
        <div class="testimonial-card">
          <p class="quote">"This product transformed our workflow completely."</p>
          <div class="author">
            <strong>Jane Doe</strong>
            <span>CEO, TechCorp</span>
          </div>
        </div>
        <div class="testimonial-card">
          <p class="quote">"Best decision we made this year."</p>
          <div class="author">
            <strong>John Smith</strong>
            <span>CTO, StartupXYZ</span>
          </div>
        </div>
        <div class="testimonial-card">
          <p class="quote">"Incredible support and amazing features."</p>
          <div class="author">
            <strong>Sarah Johnson</strong>
            <span>Product Manager</span>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

function generateHtmlCtaBanner(props: Record<string, unknown>): string {
  const title = String(props.title || 'Ready to Get Started?');
  const subtitle = String(props.subtitle || 'Join thousands of satisfied customers today.');
  const ctaText = String(props.ctaText || 'Start Free Trial');

  return `  <section class="cta-banner">
    <div class="container">
      <h2>${escapeHtml(title)}</h2>
      <p>${escapeHtml(subtitle)}</p>
      <a href="#" class="btn btn-secondary">${escapeHtml(ctaText)}</a>
    </div>
  </section>`;
}

function generateHtmlNavbar(props: Record<string, unknown>): string {
  const brandName = String(props.brandName || 'Brand');

  return `  <nav class="navbar">
    <div class="container">
      <a href="/" class="brand">${escapeHtml(brandName)}</a>
      <div class="nav-links">
        <a href="#">Features</a>
        <a href="#">Pricing</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </div>
      <a href="#" class="btn btn-primary btn-sm">Sign Up</a>
    </div>
  </nav>`;
}

function generateHtmlFooter(props: Record<string, unknown>): string {
  const companyName = String(props.companyName || 'Company');
  const year = new Date().getFullYear();

  return `  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <h3>${escapeHtml(companyName)}</h3>
          <p>Building the future, one pixel at a time.</p>
        </div>
        <div class="footer-column">
          <h4>Product</h4>
          <ul>
            <li><a href="#">Features</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">Security</a></li>
          </ul>
        </div>
        <div class="footer-column">
          <h4>Company</h4>
          <ul>
            <li><a href="#">About</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Careers</a></li>
          </ul>
        </div>
        <div class="footer-column">
          <h4>Support</h4>
          <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Status</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; ${year} ${escapeHtml(companyName)}. All rights reserved.</p>
      </div>
    </div>
  </footer>`;
}

function generateHtmlStatsRow(props: Record<string, unknown>): string {
  return `  <section class="stats-row">
    <div class="container">
      <div class="stats">
        <div class="stat">
          <div class="stat-value">10K+</div>
          <div class="stat-label">Customers</div>
        </div>
        <div class="stat">
          <div class="stat-value">99.9%</div>
          <div class="stat-label">Uptime</div>
        </div>
        <div class="stat">
          <div class="stat-value">24/7</div>
          <div class="stat-label">Support</div>
        </div>
        <div class="stat">
          <div class="stat-value">50+</div>
          <div class="stat-label">Countries</div>
        </div>
      </div>
    </div>
  </section>`;
}

function generateHtmlFaqAccordion(props: Record<string, unknown>): string {
  const heading = String(props.heading || 'Frequently Asked Questions');

  return `  <section class="faq">
    <div class="container">
      <h2>${escapeHtml(heading)}</h2>
      <div class="faq-list">
        <details class="faq-item">
          <summary>How do I get started?</summary>
          <p>Sign up for a free account and follow our quick start guide.</p>
        </details>
        <details class="faq-item">
          <summary>What payment methods do you accept?</summary>
          <p>We accept all major credit cards and PayPal.</p>
        </details>
        <details class="faq-item">
          <summary>Can I cancel anytime?</summary>
          <p>Yes, you can cancel your subscription at any time with no penalties.</p>
        </details>
        <details class="faq-item">
          <summary>Is there a free trial?</summary>
          <p>Yes, we offer a 14-day free trial with full access to all features.</p>
        </details>
      </div>
    </div>
  </section>`;
}

function generateHtmlTeamGrid(props: Record<string, unknown>): string {
  const heading = String(props.heading || 'Meet Our Team');

  return `  <section class="team-grid">
    <div class="container">
      <h2>${escapeHtml(heading)}</h2>
      <div class="team-members">
        <div class="team-member">
          <img src="https://placehold.co/200x200" alt="Alex Johnson">
          <h3>Alex Johnson</h3>
          <p>CEO</p>
        </div>
        <div class="team-member">
          <img src="https://placehold.co/200x200" alt="Sam Williams">
          <h3>Sam Williams</h3>
          <p>CTO</p>
        </div>
        <div class="team-member">
          <img src="https://placehold.co/200x200" alt="Jordan Lee">
          <h3>Jordan Lee</h3>
          <p>Design Lead</p>
        </div>
        <div class="team-member">
          <img src="https://placehold.co/200x200" alt="Casey Brown">
          <h3>Casey Brown</h3>
          <p>Engineering</p>
        </div>
      </div>
    </div>
  </section>`;
}

function generateHtmlGenericSection(type: string, props: Record<string, unknown>): string {
  const title = String(props.title || props.heading || 'Section');

  return `  <section class="${type}">
    <div class="container">
      <h2>${escapeHtml(title)}</h2>
      <p>This is a placeholder for the ${type} component.</p>
    </div>
  </section>`;
}

// ============================================
// HTML/CSS EXPORT FILE GENERATORS
// ============================================

/**
 * Generate the main HTML page file
 */
function generateHtmlPageFile(recipe: RecipeContent, options: ExportOptions): ExportFile {
  const sections = recipe.content
    .map(block => getHtmlComponentCode(block.type, block.props || {}))
    .join('\n\n');

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(options.recipeName)} - ${escapeHtml(options.projectName)}</title>
  <link rel="stylesheet" href="css/theme.css">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
${sections}
</body>
</html>
`;

  return {
    path: 'index.html',
    content: htmlContent,
  };
}

/**
 * Generate the component CSS file
 */
function generateComponentCss(): ExportFile {
  const css = `/* ============================================
   Base Styles & Reset
   ============================================ */

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-family-sans);
  background-color: var(--color-background);
  color: var(--color-text);
  line-height: 1.6;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

/* ============================================
   Layout
   ============================================ */

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* ============================================
   Buttons
   ============================================ */

.btn {
  display: inline-block;
  padding: 0.75rem 2rem;
  border-radius: var(--radius-lg);
  font-weight: 500;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.btn-primary {
  background-color: var(--color-primary);
  color: var(--color-text-on-primary);
}

.btn-primary:hover {
  background-color: var(--color-primary-hover);
}

.btn-secondary {
  background-color: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.btn-secondary:hover {
  background-color: var(--color-surface-hover);
}

.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

/* ============================================
   Navbar
   ============================================ */

.navbar {
  padding: 1rem 0;
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
}

.navbar .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar .brand {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text);
}

.navbar .nav-links {
  display: none;
  gap: 2rem;
}

@media (min-width: 768px) {
  .navbar .nav-links {
    display: flex;
  }
}

.navbar .nav-links a {
  color: var(--color-text-secondary);
  transition: color 0.2s ease;
}

.navbar .nav-links a:hover {
  color: var(--color-text);
}

/* ============================================
   Hero Centered
   ============================================ */

.hero-centered {
  padding: 5rem 0;
  background-color: var(--color-background);
}

.hero-centered .container {
  text-align: center;
}

.hero-centered h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

@media (min-width: 768px) {
  .hero-centered h1 {
    font-size: 3.5rem;
  }
}

.hero-centered .subtitle {
  font-size: 1.25rem;
  color: var(--color-text-secondary);
  margin-bottom: 2rem;
  max-width: 42rem;
  margin-left: auto;
  margin-right: auto;
}

.hero-centered .cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

/* ============================================
   Hero Split
   ============================================ */

.hero-split {
  padding: 5rem 0;
  background-color: var(--color-background);
}

.hero-split .container {
  display: grid;
  gap: 3rem;
  align-items: center;
}

@media (min-width: 768px) {
  .hero-split .container {
    grid-template-columns: 1fr 1fr;
  }
}

.hero-split h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

@media (min-width: 768px) {
  .hero-split h1 {
    font-size: 3rem;
  }
}

.hero-split .subtitle {
  font-size: 1.25rem;
  color: var(--color-text-secondary);
  margin-bottom: 2rem;
}

.hero-split-image img {
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
}

/* ============================================
   Feature Grid
   ============================================ */

.feature-grid {
  padding: 5rem 0;
  background-color: var(--color-background-subtle);
}

.feature-grid .section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.feature-grid .section-header h2 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 1rem;
}

.feature-grid .section-header p {
  color: var(--color-text-secondary);
}

.feature-grid .features {
  display: grid;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .feature-grid .features {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .feature-grid .features {
    grid-template-columns: repeat(4, 1fr);
  }
}

.feature-card {
  padding: 1.5rem;
  background-color: var(--color-surface);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
  transition: box-shadow 0.2s ease;
}

.feature-card:hover {
  box-shadow: var(--shadow-md);
}

.feature-card .feature-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.feature-card p {
  color: var(--color-text-muted);
  font-size: 0.875rem;
}

/* ============================================
   Pricing Table
   ============================================ */

.pricing-table {
  padding: 5rem 0;
  background-color: var(--color-background);
}

.pricing-table h2 {
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  color: var(--color-text);
  margin-bottom: 3rem;
}

.pricing-cards {
  display: grid;
  gap: 2rem;
}

@media (min-width: 768px) {
  .pricing-cards {
    grid-template-columns: repeat(3, 1fr);
  }
}

.pricing-card {
  padding: 2rem;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  text-align: center;
}

.pricing-card.popular {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-text-on-primary);
  transform: scale(1.05);
}

.pricing-card .badge {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  opacity: 0.8;
}

.pricing-card h3 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 0.5rem;
}

.pricing-card .price {
  margin: 1rem 0 1.5rem;
}

.pricing-card .price .amount {
  font-size: 2.5rem;
  font-weight: 700;
}

.pricing-card .price .period {
  opacity: 0.7;
}

.pricing-card .features-list {
  text-align: left;
  margin-bottom: 2rem;
}

.pricing-card .features-list li {
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.pricing-card .btn {
  width: 100%;
}

.pricing-card.popular .btn {
  background-color: var(--color-surface);
  color: var(--color-text);
}

/* ============================================
   Testimonials
   ============================================ */

.testimonials {
  padding: 5rem 0;
  background-color: var(--color-background-subtle);
}

.testimonials h2 {
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  color: var(--color-text);
  margin-bottom: 3rem;
}

.testimonial-cards {
  display: grid;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .testimonial-cards {
    grid-template-columns: repeat(3, 1fr);
  }
}

.testimonial-card {
  padding: 1.5rem;
  background-color: var(--color-surface);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
}

.testimonial-card .quote {
  font-style: italic;
  color: var(--color-text);
  margin-bottom: 1rem;
}

.testimonial-card .author strong {
  display: block;
  font-weight: 600;
  color: var(--color-text);
}

.testimonial-card .author span {
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

/* ============================================
   CTA Banner
   ============================================ */

.cta-banner {
  padding: 5rem 0;
  background-color: var(--color-primary);
  text-align: center;
}

.cta-banner h2 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-text-on-primary);
  margin-bottom: 1rem;
}

.cta-banner p {
  font-size: 1.25rem;
  color: var(--color-text-on-primary);
  opacity: 0.9;
  margin-bottom: 2rem;
}

.cta-banner .btn {
  background-color: var(--color-surface);
  color: var(--color-text);
}

.cta-banner .btn:hover {
  opacity: 0.9;
}

/* ============================================
   Stats Row
   ============================================ */

.stats-row {
  padding: 4rem 0;
  background-color: var(--color-background);
}

.stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

@media (min-width: 768px) {
  .stats {
    grid-template-columns: repeat(4, 1fr);
  }
}

.stat {
  text-align: center;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-primary);
}

.stat-label {
  color: var(--color-text-muted);
  margin-top: 0.25rem;
}

/* ============================================
   FAQ
   ============================================ */

.faq {
  padding: 5rem 0;
  background-color: var(--color-background);
}

.faq h2 {
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  color: var(--color-text);
  margin-bottom: 3rem;
}

.faq-list {
  max-width: 48rem;
  margin: 0 auto;
}

.faq-item {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  margin-bottom: 1rem;
}

.faq-item summary {
  padding: 1rem;
  font-weight: 500;
  color: var(--color-text);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
}

.faq-item summary::-webkit-details-marker {
  display: none;
}

.faq-item summary::after {
  content: '▼';
  font-size: 0.75rem;
  color: var(--color-text-muted);
  transition: transform 0.2s ease;
}

.faq-item[open] summary::after {
  transform: rotate(180deg);
}

.faq-item p {
  padding: 0 1rem 1rem;
  color: var(--color-text-secondary);
}

/* ============================================
   Team Grid
   ============================================ */

.team-grid {
  padding: 5rem 0;
  background-color: var(--color-background-subtle);
}

.team-grid h2 {
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  color: var(--color-text);
  margin-bottom: 3rem;
}

.team-members {
  display: grid;
  gap: 2rem;
}

@media (min-width: 768px) {
  .team-members {
    grid-template-columns: repeat(4, 1fr);
  }
}

.team-member {
  text-align: center;
}

.team-member img {
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto 1rem;
}

.team-member h3 {
  font-weight: 600;
  color: var(--color-text);
}

.team-member p {
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

/* ============================================
   Footer
   ============================================ */

.footer {
  padding: 3rem 0;
  background-color: var(--color-background-muted);
  border-top: 1px solid var(--color-border);
}

.footer-grid {
  display: grid;
  gap: 2rem;
  margin-bottom: 2rem;
}

@media (min-width: 768px) {
  .footer-grid {
    grid-template-columns: 2fr 1fr 1fr 1fr;
  }
}

.footer-brand h3 {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 1rem;
}

.footer-brand p {
  color: var(--color-text-muted);
  font-size: 0.875rem;
}

.footer-column h4 {
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 1rem;
}

.footer-column ul li {
  margin-bottom: 0.5rem;
}

.footer-column a {
  color: var(--color-text-muted);
  font-size: 0.875rem;
  transition: color 0.2s ease;
}

.footer-column a:hover {
  color: var(--color-text);
}

.footer-bottom {
  padding-top: 2rem;
  border-top: 1px solid var(--color-border);
  text-align: center;
}

.footer-bottom p {
  font-size: 0.875rem;
  color: var(--color-text-muted);
}
`;

  return {
    path: 'css/styles.css',
    content: css,
  };
}

/**
 * Generate the theme CSS file for HTML export
 */
function generateHtmlThemeFile(theme: string): ExportFile {
  const css = THEME_CSS[theme] || THEME_CSS.default;

  return {
    path: 'css/theme.css',
    content: css,
  };
}

/**
 * Generate README for HTML/CSS export
 */
function generateHtmlReadme(options: ExportOptions): ExportFile {
  return {
    path: 'README.md',
    content: `# ${options.recipeName}

Generated from UI Museum as static HTML + CSS.

## Getting Started

Simply open \`index.html\` in your browser, or serve the files using any static server:

\`\`\`bash
# Using Python
python -m http.server 8000

# Using Node.js (npx)
npx serve

# Using PHP
php -S localhost:8000
\`\`\`

## Files

- \`index.html\` - Main HTML page
- \`css/theme.css\` - Theme variables (colors, spacing, etc.)
- \`css/styles.css\` - Component styles

## Theme: ${options.theme}

Theme variables are defined in \`css/theme.css\`. To customize:

1. Modify CSS variables in \`:root\` selector
2. Colors, shadows, border radius, and fonts are all customizable

## Browser Support

This export uses modern CSS features:
- CSS Custom Properties (variables)
- CSS Grid
- Flexbox
- \`details\`/\`summary\` elements for accordions

Supported in all modern browsers (Chrome, Firefox, Safari, Edge).
`,
  };
}

// ============================================
// NEXT.JS APP ROUTER EXPORT FILE GENERATORS
// ============================================

/**
 * Generate Next.js package.json
 */
function generateNextPackageJson(options: ExportOptions): ExportFile {
  const packageJson = {
    name: options.projectName.toLowerCase().replace(/\s+/g, '-'),
    version: '1.0.0',
    private: true,
    scripts: {
      dev: 'next dev',
      build: 'next build',
      start: 'next start',
      lint: 'next lint',
    },
    dependencies: {
      next: '^14.0.0',
      react: '^18.2.0',
      'react-dom': '^18.2.0',
    },
    devDependencies: {
      '@types/node': '^20.0.0',
      '@types/react': '^18.2.0',
      '@types/react-dom': '^18.2.0',
      autoprefixer: '^10.4.16',
      postcss: '^8.4.32',
      tailwindcss: '^3.4.0',
      typescript: '^5.3.0',
    },
  };

  return {
    path: 'package.json',
    content: JSON.stringify(packageJson, null, 2),
  };
}

/**
 * Generate Next.js config
 */
function generateNextConfig(): ExportFile {
  return {
    path: 'next.config.js',
    content: `/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,
};

module.exports = nextConfig;
`,
  };
}

/**
 * Generate Next.js TypeScript config
 */
function generateNextTsConfig(): ExportFile {
  return {
    path: 'tsconfig.json',
    content: JSON.stringify({
      compilerOptions: {
        lib: ['dom', 'dom.iterable', 'esnext'],
        allowJs: true,
        skipLibCheck: true,
        strict: true,
        noEmit: true,
        esModuleInterop: true,
        module: 'esnext',
        moduleResolution: 'bundler',
        resolveJsonModule: true,
        isolatedModules: true,
        jsx: 'preserve',
        incremental: true,
        plugins: [{ name: 'next' }],
        paths: {
          '@/*': ['./*'],
        },
      },
      include: ['next-env.d.ts', '**/*.ts', '**/*.tsx', '.next/types/**/*.ts'],
      exclude: ['node_modules'],
    }, null, 2),
  };
}

/**
 * Generate Next.js Tailwind config
 */
function generateNextTailwindConfig(): ExportFile {
  return {
    path: 'tailwind.config.ts',
    content: `import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
`,
  };
}

/**
 * Generate Next.js PostCSS config
 */
function generateNextPostCssConfig(): ExportFile {
  return {
    path: 'postcss.config.js',
    content: `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
`,
  };
}

/**
 * Generate Next.js root layout
 */
function generateNextLayout(options: ExportOptions): ExportFile {
  return {
    path: 'app/layout.tsx',
    content: `import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '${escapeJsx(options.recipeName)} - ${escapeJsx(options.projectName)}',
  description: 'Generated from UI Museum',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
`,
  };
}

/**
 * Generate Next.js page file (App Router)
 */
function generateNextPageFile(recipe: RecipeContent, options: ExportOptions): ExportFile {
  const components = Array.from(collectComponents(recipe).keys());
  const imports = components.map(type => typeToComponentName(type)).join(', ');

  const componentTags = recipe.content
    .map(block => {
      const name = typeToComponentName(block.type);
      return `      <${name} />`;
    })
    .join('\n');

  const pageContent = `import { ${imports} } from '@/components';

export default function Home() {
  return (
    <main className="min-h-screen">
${componentTags}
    </main>
  );
}
`;

  return {
    path: 'app/page.tsx',
    content: pageContent,
  };
}

/**
 * Generate Next.js global styles
 */
function generateNextGlobalStyles(theme: string, includeTheme: boolean): ExportFile {
  const themeImport = includeTheme ? `\n/* Theme Variables */\n${THEME_CSS[theme] || THEME_CSS.default}\n` : '';

  return {
    path: 'app/globals.css',
    content: `@tailwind base;
@tailwind components;
@tailwind utilities;
${themeImport}
body {
  font-family: var(--font-family-sans);
  background-color: var(--color-background);
  color: var(--color-text);
}
`,
  };
}

/**
 * Generate Next.js component files (with 'use client' where needed)
 */
function generateNextComponentFiles(components: Map<string, Record<string, unknown>>): ExportFile[] {
  const files: ExportFile[] = [];

  // Components that need 'use client' due to interactivity
  const clientComponents = new Set(['faq-accordion', 'navbar']);

  for (const [type, props] of components) {
    const componentName = typeToComponentName(type);
    let code = getComponentCode(type, props);

    // Add 'use client' directive for interactive components
    if (clientComponents.has(type)) {
      code = `'use client';\n\n${code}`;
    }

    files.push({
      path: `components/${componentName}.tsx`,
      content: code,
    });
  }

  // Generate components index
  const indexExports = Array.from(components.keys())
    .map(type => {
      const name = typeToComponentName(type);
      return `export { ${name} } from './${name}';`;
    })
    .join('\n');

  files.push({
    path: 'components/index.ts',
    content: indexExports,
  });

  return files;
}

/**
 * Generate Next.js .gitignore
 */
function generateNextGitignore(): ExportFile {
  return {
    path: '.gitignore',
    content: `# Dependencies
node_modules
.pnp
.pnp.js

# Testing
coverage

# Next.js
.next/
out/
build

# Misc
.DS_Store
*.pem

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Local env files
.env*.local

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts
`,
  };
}

/**
 * Generate Next.js env types
 */
function generateNextEnvTypes(): ExportFile {
  return {
    path: 'next-env.d.ts',
    content: `/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.
`,
  };
}

/**
 * Generate Next.js README
 */
function generateNextReadme(options: ExportOptions): ExportFile {
  return {
    path: 'README.md',
    content: `# ${options.recipeName}

Generated from UI Museum as a Next.js App Router project.

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Deploy

This project can be deployed to:
- [Vercel](https://vercel.com) (recommended)
- Any Node.js hosting platform
- Static export with \`next export\`

## Project Structure

\`\`\`
├── app/
│   ├── globals.css    # Global styles + theme
│   ├── layout.tsx     # Root layout
│   └── page.tsx       # Home page
├── components/        # UI components
├── public/            # Static assets
└── ...config files
\`\`\`

## Theme: ${options.theme}

Theme CSS variables are defined in \`app/globals.css\`. Customize colors, shadows, and more by modifying the CSS variables.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
`,
  };
}

// ============================================
// MAIN EXPORT FUNCTIONS
// ============================================

/**
 * Collect all unique component types from a recipe
 */
function collectComponents(recipe: RecipeContent): Map<string, Record<string, unknown>> {
  const components = new Map<string, Record<string, unknown>>();

  function traverse(blocks: BlockNode[]) {
    for (const block of blocks) {
      const type = block.type;
      if (!components.has(type)) {
        components.set(type, block.props || {});
      }
      // Traverse slots if present
      if (block.slots) {
        for (const slotBlocks of Object.values(block.slots)) {
          traverse(slotBlocks);
        }
      }
    }
  }

  traverse(recipe.content);
  return components;
}

/**
 * Generate component files
 */
function generateComponentFiles(components: Map<string, Record<string, unknown>>): ExportFile[] {
  const files: ExportFile[] = [];

  for (const [type, props] of components) {
    const componentName = typeToComponentName(type);
    const code = getComponentCode(type, props);

    files.push({
      path: `components/${componentName}.tsx`,
      content: code,
    });
  }

  // Generate components index
  const indexExports = Array.from(components.keys())
    .map(type => {
      const name = typeToComponentName(type);
      return `export { ${name} } from './${name}';`;
    })
    .join('\n');

  files.push({
    path: 'components/index.ts',
    content: indexExports,
  });

  return files;
}

/**
 * Generate the main page file
 */
function generatePageFile(recipe: RecipeContent, options: ExportOptions): ExportFile {
  const components = Array.from(collectComponents(recipe).keys());
  const imports = components.map(type => typeToComponentName(type)).join(', ');

  const componentTags = recipe.content
    .map(block => {
      const name = typeToComponentName(block.type);
      return `      <${name} />`;
    })
    .join('\n');

  const pageContent = `import { ${imports} } from '../components';

export default function Page() {
  return (
    <main className="min-h-screen">
${componentTags}
    </main>
  );
}
`;

  return {
    path: 'pages/index.tsx',
    content: pageContent,
  };
}

/**
 * Generate theme CSS file
 */
function generateThemeFile(theme: string): ExportFile {
  const css = THEME_CSS[theme] || THEME_CSS.default;

  return {
    path: 'styles/theme.css',
    content: css,
  };
}

/**
 * Generate global styles file
 */
function generateGlobalStyles(): ExportFile {
  return {
    path: 'styles/globals.css',
    content: `@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

@import './theme.css';

body {
  font-family: var(--font-family-sans);
  background-color: var(--color-background);
  color: var(--color-text);
}
`,
  };
}

/**
 * Generate package.json
 */
function generatePackageJson(options: ExportOptions): ExportFile {
  const packageJson = {
    name: options.projectName.toLowerCase().replace(/\s+/g, '-'),
    version: '1.0.0',
    private: true,
    scripts: {
      dev: 'vite',
      build: 'tsc && vite build',
      preview: 'vite preview',
    },
    dependencies: {
      react: '^18.2.0',
      'react-dom': '^18.2.0',
    },
    devDependencies: {
      '@types/react': '^18.2.0',
      '@types/react-dom': '^18.2.0',
      '@vitejs/plugin-react': '^4.2.0',
      autoprefixer: '^10.4.16',
      postcss: '^8.4.32',
      tailwindcss: '^3.4.0',
      typescript: '^5.3.0',
      vite: '^5.0.0',
    },
  };

  return {
    path: 'package.json',
    content: JSON.stringify(packageJson, null, 2),
  };
}

/**
 * Generate Vite config
 */
function generateViteConfig(): ExportFile {
  return {
    path: 'vite.config.ts',
    content: `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
`,
  };
}

/**
 * Generate TypeScript config
 */
function generateTsConfig(): ExportFile {
  return {
    path: 'tsconfig.json',
    content: JSON.stringify({
      compilerOptions: {
        target: 'ES2020',
        useDefineForClassFields: true,
        lib: ['ES2020', 'DOM', 'DOM.Iterable'],
        module: 'ESNext',
        skipLibCheck: true,
        moduleResolution: 'bundler',
        allowImportingTsExtensions: true,
        resolveJsonModule: true,
        isolatedModules: true,
        noEmit: true,
        jsx: 'react-jsx',
        strict: true,
        noUnusedLocals: true,
        noUnusedParameters: true,
        noFallthroughCasesInSwitch: true,
      },
      include: ['**/*.ts', '**/*.tsx'],
    }, null, 2),
  };
}

/**
 * Generate Tailwind config
 */
function generateTailwindConfig(): ExportFile {
  return {
    path: 'tailwind.config.js',
    content: `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
`,
  };
}

/**
 * Generate PostCSS config
 */
function generatePostCssConfig(): ExportFile {
  return {
    path: 'postcss.config.js',
    content: `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
`,
  };
}

/**
 * Generate index.html
 */
function generateIndexHtml(options: ExportOptions): ExportFile {
  return {
    path: 'index.html',
    content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${options.recipeName} - ${options.projectName}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/main.tsx"></script>
  </body>
</html>
`,
  };
}

/**
 * Generate main.tsx entry point
 */
function generateMainTsx(): ExportFile {
  return {
    path: 'main.tsx',
    content: `import React from 'react';
import ReactDOM from 'react-dom/client';
import Page from './pages/index';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>
);
`,
  };
}

/**
 * Generate README
 */
function generateReadme(options: ExportOptions): ExportFile {
  return {
    path: 'README.md',
    content: `# ${options.recipeName}

Generated from UI Museum.

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

## Build

\`\`\`bash
npm run build
\`\`\`

## Theme

This project uses the **${options.theme}** theme. Theme variables are defined in \`styles/theme.css\`.

To customize colors, modify the CSS variables in that file.
`,
  };
}

// ============================================
// EXPORT SERVICE
// ============================================

export const ExportService = {
  /**
   * Export a recipe to files
   */
  async exportRecipe(
    recipe: RecipeContent,
    options: ExportOptions
  ): Promise<ExportResult> {
    // Route to appropriate export handler based on format
    switch (options.format) {
      case 'html-css':
        return this.exportAsHtmlCss(recipe, options);
      case 'next-app':
        return this.exportAsNextApp(recipe, options);
      case 'react-tailwind':
      default:
        return this.exportAsReactTailwind(recipe, options);
    }
  },

  /**
   * Export as React + Tailwind (Vite project)
   */
  async exportAsReactTailwind(
    recipe: RecipeContent,
    options: ExportOptions
  ): Promise<ExportResult> {
    const files: ExportFile[] = [];

    // Collect components
    const components = collectComponents(recipe);

    // Generate component files
    files.push(...generateComponentFiles(components));

    // Generate page
    files.push(generatePageFile(recipe, options));

    // Generate styles
    if (options.includeTheme) {
      files.push(generateThemeFile(options.theme));
    }
    files.push(generateGlobalStyles());

    // Generate config files
    files.push(generatePackageJson(options));
    files.push(generateViteConfig());
    files.push(generateTsConfig());
    files.push(generateTailwindConfig());
    files.push(generatePostCssConfig());
    files.push(generateIndexHtml(options));
    files.push(generateMainTsx());
    files.push(generateReadme(options));

    return { files };
  },

  /**
   * Export as static HTML + CSS
   */
  async exportAsHtmlCss(
    recipe: RecipeContent,
    options: ExportOptions
  ): Promise<ExportResult> {
    const files: ExportFile[] = [];

    // Generate main HTML page
    files.push(generateHtmlPageFile(recipe, options));

    // Generate CSS files
    if (options.includeTheme) {
      files.push(generateHtmlThemeFile(options.theme));
    }
    files.push(generateComponentCss());

    // Generate README
    files.push(generateHtmlReadme(options));

    return { files };
  },

  /**
   * Export as Next.js App Router project
   */
  async exportAsNextApp(
    recipe: RecipeContent,
    options: ExportOptions
  ): Promise<ExportResult> {
    const files: ExportFile[] = [];

    // Collect components
    const components = collectComponents(recipe);

    // Generate component files (with 'use client' directives where needed)
    files.push(...generateNextComponentFiles(components));

    // Generate app directory files
    files.push(generateNextLayout(options));
    files.push(generateNextPageFile(recipe, options));
    files.push(generateNextGlobalStyles(options.theme, options.includeTheme));

    // Generate config files
    files.push(generateNextPackageJson(options));
    files.push(generateNextConfig());
    files.push(generateNextTsConfig());
    files.push(generateNextTailwindConfig());
    files.push(generateNextPostCssConfig());
    files.push(generateNextGitignore());
    files.push(generateNextEnvTypes());
    files.push(generateNextReadme(options));

    return { files };
  },

  /**
   * Export and bundle as zip
   */
  async exportAsZip(
    recipe: RecipeContent,
    options: ExportOptions
  ): Promise<Buffer> {
    const result = await this.exportRecipe(recipe, options);

    const zip = new JSZip();

    for (const file of result.files) {
      zip.file(file.path, file.content);
    }

    const buffer = await zip.generateAsync({
      type: 'nodebuffer',
      compression: 'DEFLATE',
      compressionOptions: { level: 9 },
    });

    return buffer;
  },

  /**
   * Get available themes
   */
  getAvailableThemes(): string[] {
    return Object.keys(THEME_CSS);
  },

  /**
   * Get theme CSS
   */
  getThemeCSS(theme: string): string {
    return THEME_CSS[theme] || THEME_CSS.default;
  },
};
