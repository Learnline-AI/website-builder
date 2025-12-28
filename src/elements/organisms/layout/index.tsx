/**
 * Layout Organisms
 * Page sections and layout components: heroes, footers, feature sections
 */

import React from 'react';
import { ElementEntry } from '../../registry';

// ============================================================================
// STYLE PRESETS
// ============================================================================

const layoutStyles = {
  section: {
    default: 'bg-white py-16 px-6',
    dark: 'bg-gray-900 py-16 px-6',
    brutal: 'bg-yellow-100 py-16 px-6 border-y-4 border-black',
    neon: 'bg-black py-16 px-6',
    glass: 'bg-gradient-to-br from-purple-900/50 to-blue-900/50 py-16 px-6 backdrop-blur',
    cosmic: 'bg-gradient-to-b from-indigo-950 via-purple-900 to-black py-16 px-6',
  },
  heading: {
    default: 'text-gray-900 font-bold',
    dark: 'text-white font-bold',
    brutal: 'text-black font-black uppercase',
    neon: 'text-cyan-400 font-bold',
    glass: 'text-white font-bold',
    cosmic: 'text-white font-bold',
  },
  subheading: {
    default: 'text-gray-600',
    dark: 'text-gray-400',
    brutal: 'text-black font-medium',
    neon: 'text-cyan-300/70',
    glass: 'text-white/70',
    cosmic: 'text-purple-200/80',
  },
  button: {
    default: 'px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold',
    dark: 'px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors font-semibold',
    brutal: 'px-6 py-3 bg-black text-white border-4 border-black hover:bg-yellow-400 hover:text-black transition-colors font-bold uppercase shadow-[4px_4px_0_0_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1',
    neon: 'px-6 py-3 bg-transparent text-cyan-400 border-2 border-cyan-400 rounded hover:bg-cyan-400/20 transition-all font-semibold shadow-[0_0_15px_rgba(0,255,255,0.3)] hover:shadow-[0_0_25px_rgba(0,255,255,0.5)]',
    glass: 'px-6 py-3 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-colors font-semibold backdrop-blur border border-white/20',
    cosmic: 'px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-500 hover:to-pink-500 transition-all font-semibold shadow-lg shadow-purple-500/25',
  },
  card: {
    default: 'bg-gray-50 rounded-lg border border-gray-200 p-6',
    dark: 'bg-gray-800 rounded-lg border border-gray-700 p-6',
    brutal: 'bg-white border-4 border-black p-6 shadow-[8px_8px_0_0_#000]',
    neon: 'bg-gray-900/80 rounded-lg border border-cyan-500/50 p-6',
    glass: 'bg-white/10 rounded-2xl border border-white/20 p-6 backdrop-blur',
    cosmic: 'bg-indigo-900/50 rounded-xl border border-purple-500/30 p-6 backdrop-blur',
  },
};

type LayoutVariant = 'default' | 'dark' | 'brutal' | 'neon' | 'glass' | 'cosmic';

// ============================================================================
// HERO SECTION
// ============================================================================

interface HeroSectionProps {
  variant?: LayoutVariant;
  title?: string;
  subtitle?: string;
  ctaText?: string;
  secondaryCtaText?: string;
  showImage?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  variant = 'default',
  title = 'Build Something Amazing',
  subtitle = 'Create beautiful, responsive websites with our powerful design system. Start building your next project today.',
  ctaText = 'Get Started',
  secondaryCtaText = 'Learn More',
  showImage = true,
}) => {
  return (
    <section className={`${layoutStyles.section[variant]} min-h-[500px] flex items-center`}>
      <div className="max-w-6xl mx-auto w-full">
        <div className={`grid ${showImage ? 'md:grid-cols-2' : ''} gap-12 items-center`}>
          <div className={showImage ? '' : 'text-center max-w-3xl mx-auto'}>
            <h1 className={`text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight ${layoutStyles.heading[variant]}`}>
              {title}
            </h1>
            <p className={`text-lg md:text-xl mb-8 ${layoutStyles.subheading[variant]}`}>
              {subtitle}
            </p>
            <div className={`flex gap-4 ${showImage ? '' : 'justify-center'}`}>
              <button className={layoutStyles.button[variant]}>
                {ctaText}
              </button>
              <button className={`${layoutStyles.button[variant]} !bg-transparent ${variant === 'brutal' ? '!border-black !text-black' : ''}`}>
                {secondaryCtaText}
              </button>
            </div>
          </div>
          {showImage && (
            <div className={`${layoutStyles.card[variant]} aspect-video flex items-center justify-center`}>
              <div className={`text-6xl ${layoutStyles.subheading[variant]}`}>
                {variant === 'neon' ? '◈' : variant === 'cosmic' ? '✦' : '□'}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// FEATURE GRID
// ============================================================================

interface FeatureGridProps {
  variant?: LayoutVariant;
  columns?: 2 | 3 | 4;
  features?: Array<{ icon: string; title: string; description: string }>;
}

const defaultFeatures = [
  { icon: '⚡', title: 'Lightning Fast', description: 'Optimized for speed and performance' },
  { icon: '🎨', title: 'Customizable', description: 'Easily customize every component' },
  { icon: '📱', title: 'Responsive', description: 'Works on all devices seamlessly' },
  { icon: '🔒', title: 'Secure', description: 'Built with security best practices' },
  { icon: '🌐', title: 'Global Ready', description: 'i18n support out of the box' },
  { icon: '🔧', title: 'Developer First', description: 'Great developer experience' },
];

export const FeatureGrid: React.FC<FeatureGridProps> = ({
  variant = 'default',
  columns = 3,
  features = defaultFeatures,
}) => {
  return (
    <section className={layoutStyles.section[variant]}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl mb-4 ${layoutStyles.heading[variant]}`}>
            Powerful Features
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${layoutStyles.subheading[variant]}`}>
            Everything you need to build modern web applications
          </p>
        </div>
        <div
          className="grid gap-6"
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
          {features.map((feature, index) => (
            <div key={index} className={layoutStyles.card[variant]}>
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className={`text-xl mb-2 ${layoutStyles.heading[variant]}`}>
                {feature.title}
              </h3>
              <p className={layoutStyles.subheading[variant]}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// TESTIMONIALS SECTION
// ============================================================================

interface TestimonialsSectionProps {
  variant?: LayoutVariant;
  testimonials?: Array<{ quote: string; author: string; role: string; avatar?: string }>;
}

const defaultTestimonials = [
  { quote: 'This design system has completely transformed how we build products.', author: 'Sarah Chen', role: 'CTO at TechCorp' },
  { quote: 'The best component library I have ever used. Highly recommended!', author: 'Mike Johnson', role: 'Lead Developer' },
  { quote: 'Saved us months of development time. The components are beautiful.', author: 'Emily Davis', role: 'Product Manager' },
];

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  variant = 'default',
  testimonials = defaultTestimonials,
}) => {
  return (
    <section className={layoutStyles.section[variant]}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl mb-4 ${layoutStyles.heading[variant]}`}>
            What People Say
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className={layoutStyles.card[variant]}>
              <div className={`text-4xl mb-4 opacity-30 ${layoutStyles.heading[variant]}`}>"</div>
              <p className={`text-lg mb-6 ${layoutStyles.subheading[variant]}`}>
                {testimonial.quote}
              </p>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${variant === 'dark' || variant === 'neon' || variant === 'cosmic' ? 'bg-gray-600' : 'bg-gray-300'} flex items-center justify-center text-sm font-bold`}>
                  {testimonial.author[0]}
                </div>
                <div>
                  <div className={`font-semibold ${layoutStyles.heading[variant]}`}>
                    {testimonial.author}
                  </div>
                  <div className={`text-sm ${layoutStyles.subheading[variant]}`}>
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// CTA SECTION
// ============================================================================

interface CtaSectionProps {
  variant?: LayoutVariant;
  title?: string;
  subtitle?: string;
  ctaText?: string;
  centered?: boolean;
}

export const CtaSection: React.FC<CtaSectionProps> = ({
  variant = 'default',
  title = 'Ready to Get Started?',
  subtitle = 'Join thousands of developers building with our design system.',
  ctaText = 'Start Free Trial',
  centered = true,
}) => {
  const bgOverrides = {
    default: 'bg-blue-500',
    dark: 'bg-blue-900',
    brutal: 'bg-black',
    neon: 'bg-gradient-to-r from-cyan-900 to-purple-900 border-y-2 border-cyan-400',
    glass: 'bg-gradient-to-r from-purple-600/50 to-pink-600/50',
    cosmic: 'bg-gradient-to-r from-purple-800 to-pink-700',
  };

  return (
    <section className={`${bgOverrides[variant]} py-16 px-6`}>
      <div className={`max-w-4xl mx-auto ${centered ? 'text-center' : 'flex justify-between items-center'}`}>
        <div className={centered ? '' : 'flex-1'}>
          <h2 className={`text-3xl md:text-4xl mb-4 ${variant === 'brutal' ? 'text-yellow-400 font-black uppercase' : 'text-white font-bold'}`}>
            {title}
          </h2>
          <p className={`text-lg mb-6 ${variant === 'brutal' ? 'text-yellow-200' : 'text-white/80'}`}>
            {subtitle}
          </p>
          {centered && (
            <button className={`px-8 py-4 rounded-lg font-bold transition-all ${
              variant === 'brutal'
                ? 'bg-yellow-400 text-black border-4 border-yellow-400 hover:bg-white shadow-[4px_4px_0_0_#fff]'
                : variant === 'neon'
                ? 'bg-cyan-400 text-black hover:bg-cyan-300'
                : 'bg-white text-gray-900 hover:bg-gray-100'
            }`}>
              {ctaText}
            </button>
          )}
        </div>
        {!centered && (
          <button className="px-8 py-4 bg-white text-gray-900 rounded-lg font-bold hover:bg-gray-100 transition-colors">
            {ctaText}
          </button>
        )}
      </div>
    </section>
  );
};

// ============================================================================
// FOOTER
// ============================================================================

interface FooterProps {
  variant?: LayoutVariant;
  companyName?: string;
  links?: Array<{ title: string; items: string[] }>;
  showSocial?: boolean;
}

const defaultLinks = [
  { title: 'Product', items: ['Features', 'Pricing', 'Documentation', 'Changelog'] },
  { title: 'Company', items: ['About', 'Blog', 'Careers', 'Contact'] },
  { title: 'Legal', items: ['Privacy', 'Terms', 'License'] },
];

export const Footer: React.FC<FooterProps> = ({
  variant = 'default',
  companyName = 'Company',
  links = defaultLinks,
  showSocial = true,
}) => {
  const bgOverrides = {
    default: 'bg-gray-100 border-t border-gray-200',
    dark: 'bg-gray-950 border-t border-gray-800',
    brutal: 'bg-black border-t-8 border-yellow-400',
    neon: 'bg-black border-t border-cyan-500/50',
    glass: 'bg-black/50 border-t border-white/10 backdrop-blur',
    cosmic: 'bg-black border-t border-purple-500/30',
  };

  return (
    <footer className={`${bgOverrides[variant]} py-12 px-6`}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-5 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className={`text-2xl font-bold mb-4 ${layoutStyles.heading[variant]}`}>
              {companyName}
            </div>
            <p className={`mb-4 ${layoutStyles.subheading[variant]}`}>
              Building the future of web development.
            </p>
            {showSocial && (
              <div className="flex gap-4">
                {['𝕏', 'in', 'gh'].map((icon, i) => (
                  <button
                    key={i}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      variant === 'dark' || variant === 'neon' || variant === 'cosmic'
                        ? 'bg-gray-800 hover:bg-gray-700 text-gray-400'
                        : variant === 'brutal'
                        ? 'bg-yellow-400 text-black border-2 border-black hover:bg-white'
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-600'
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            )}
          </div>
          {links.map((group, index) => (
            <div key={index}>
              <div className={`font-semibold mb-4 ${layoutStyles.heading[variant]}`}>
                {group.title}
              </div>
              <ul className="space-y-2">
                {group.items.map((item, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className={`hover:underline ${layoutStyles.subheading[variant]}`}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className={`pt-8 border-t ${
          variant === 'dark' || variant === 'neon' || variant === 'cosmic'
            ? 'border-gray-800'
            : variant === 'brutal'
            ? 'border-yellow-400'
            : 'border-gray-200'
        }`}>
          <div className={`text-sm ${layoutStyles.subheading[variant]}`}>
            © 2024 {companyName}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

// ============================================================================
// SPLIT SECTION
// ============================================================================

interface SplitSectionProps {
  variant?: LayoutVariant;
  title?: string;
  description?: string;
  imageOnRight?: boolean;
  features?: string[];
}

export const SplitSection: React.FC<SplitSectionProps> = ({
  variant = 'default',
  title = 'Designed for Developers',
  description = 'Our design system is built from the ground up with developer experience in mind.',
  imageOnRight = true,
  features = ['Clean, readable code', 'Comprehensive documentation', 'TypeScript support', 'Tree-shakeable exports'],
}) => {
  const content = (
    <div>
      <h2 className={`text-3xl md:text-4xl mb-4 ${layoutStyles.heading[variant]}`}>
        {title}
      </h2>
      <p className={`text-lg mb-6 ${layoutStyles.subheading[variant]}`}>
        {description}
      </p>
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className={`flex items-center gap-3 ${layoutStyles.subheading[variant]}`}>
            <span className={variant === 'neon' ? 'text-cyan-400' : variant === 'cosmic' ? 'text-purple-400' : 'text-green-500'}>
              ✓
            </span>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );

  const image = (
    <div className={`${layoutStyles.card[variant]} aspect-square flex items-center justify-center`}>
      <div className={`text-8xl ${layoutStyles.subheading[variant]}`}>
        {variant === 'neon' ? '⬡' : variant === 'cosmic' ? '◇' : '◻'}
      </div>
    </div>
  );

  return (
    <section className={layoutStyles.section[variant]}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {imageOnRight ? (
            <>
              {content}
              {image}
            </>
          ) : (
            <>
              {image}
              {content}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// PRICING SECTION
// ============================================================================

interface PricingSectionProps {
  variant?: LayoutVariant;
  plans?: Array<{
    name: string;
    price: string;
    description: string;
    features: string[];
    popular?: boolean;
  }>;
}

const defaultPlans = [
  { name: 'Starter', price: '$9', description: 'Perfect for side projects', features: ['5 projects', '10GB storage', 'Community support'] },
  { name: 'Pro', price: '$29', description: 'For growing teams', features: ['Unlimited projects', '100GB storage', 'Priority support', 'Advanced analytics'], popular: true },
  { name: 'Enterprise', price: '$99', description: 'For large organizations', features: ['Everything in Pro', 'Unlimited storage', 'Dedicated support', 'Custom integrations', 'SLA guarantee'] },
];

export const PricingSection: React.FC<PricingSectionProps> = ({
  variant = 'default',
  plans = defaultPlans,
}) => {
  return (
    <section className={layoutStyles.section[variant]}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl mb-4 ${layoutStyles.heading[variant]}`}>
            Simple Pricing
          </h2>
          <p className={`text-lg ${layoutStyles.subheading[variant]}`}>
            Choose the plan that works for you
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`${layoutStyles.card[variant]} ${
                plan.popular
                  ? variant === 'brutal'
                    ? 'border-yellow-400 bg-yellow-50 scale-105'
                    : variant === 'neon'
                    ? 'border-cyan-400 shadow-[0_0_30px_rgba(0,255,255,0.3)]'
                    : variant === 'cosmic'
                    ? 'border-purple-400 shadow-lg shadow-purple-500/25'
                    : 'border-blue-500 scale-105 shadow-lg'
                  : ''
              }`}
            >
              {plan.popular && (
                <div className={`text-xs font-bold uppercase tracking-wide mb-2 ${
                  variant === 'neon' ? 'text-cyan-400' : variant === 'cosmic' ? 'text-purple-400' : 'text-blue-500'
                }`}>
                  Most Popular
                </div>
              )}
              <h3 className={`text-xl font-bold mb-2 ${layoutStyles.heading[variant]}`}>
                {plan.name}
              </h3>
              <div className={`text-4xl font-bold mb-2 ${layoutStyles.heading[variant]}`}>
                {plan.price}
                <span className={`text-lg font-normal ${layoutStyles.subheading[variant]}`}>/mo</span>
              </div>
              <p className={`mb-6 ${layoutStyles.subheading[variant]}`}>
                {plan.description}
              </p>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className={`flex items-center gap-2 text-sm ${layoutStyles.subheading[variant]}`}>
                    <span className={variant === 'neon' ? 'text-cyan-400' : variant === 'cosmic' ? 'text-purple-400' : 'text-green-500'}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className={`w-full ${layoutStyles.button[variant]}`}>
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// STATS SECTION
// ============================================================================

interface StatsSectionProps {
  variant?: LayoutVariant;
  stats?: Array<{ value: string; label: string }>;
}

const defaultStats = [
  { value: '10K+', label: 'Active Users' },
  { value: '50M+', label: 'API Requests' },
  { value: '99.9%', label: 'Uptime' },
  { value: '24/7', label: 'Support' },
];

export const StatsSection: React.FC<StatsSectionProps> = ({
  variant = 'default',
  stats = defaultStats,
}) => {
  return (
    <section className={layoutStyles.section[variant]}>
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`text-4xl md:text-5xl font-bold mb-2 ${
                variant === 'neon'
                  ? 'text-cyan-400'
                  : variant === 'cosmic'
                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400'
                  : layoutStyles.heading[variant]
              }`}>
                {stat.value}
              </div>
              <div className={layoutStyles.subheading[variant]}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// FAQ SECTION
// ============================================================================

interface FaqSectionProps {
  variant?: LayoutVariant;
  faqs?: Array<{ question: string; answer: string }>;
}

const defaultFaqs = [
  { question: 'How do I get started?', answer: 'Simply install our package via npm and import the components you need.' },
  { question: 'Is there a free tier?', answer: 'Yes! Our starter plan is completely free and includes all core features.' },
  { question: 'Can I customize the components?', answer: 'Absolutely. Every component is fully customizable via props and CSS.' },
  { question: 'Do you offer support?', answer: 'We offer community support for free users and priority support for paid plans.' },
];

export const FaqSection: React.FC<FaqSectionProps> = ({
  variant = 'default',
  faqs = defaultFaqs,
}) => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <section className={layoutStyles.section[variant]}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl mb-4 ${layoutStyles.heading[variant]}`}>
            Frequently Asked Questions
          </h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className={layoutStyles.card[variant]}>
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className={`w-full text-left flex justify-between items-center ${layoutStyles.heading[variant]}`}
              >
                <span className="text-lg">{faq.question}</span>
                <span className="text-2xl">{openIndex === index ? '−' : '+'}</span>
              </button>
              {openIndex === index && (
                <p className={`mt-4 ${layoutStyles.subheading[variant]}`}>
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// NEWSLETTER SECTION
// ============================================================================

interface NewsletterSectionProps {
  variant?: LayoutVariant;
  title?: string;
  subtitle?: string;
}

export const NewsletterSection: React.FC<NewsletterSectionProps> = ({
  variant = 'default',
  title = 'Stay Updated',
  subtitle = 'Get the latest news and updates delivered to your inbox.',
}) => {
  const inputStyles = {
    default: 'flex-1 px-4 py-3 rounded-l-lg border border-gray-300 focus:outline-none focus:border-blue-500',
    dark: 'flex-1 px-4 py-3 rounded-l-lg bg-gray-800 border border-gray-600 text-white focus:outline-none focus:border-blue-400',
    brutal: 'flex-1 px-4 py-3 border-4 border-black border-r-0 focus:outline-none',
    neon: 'flex-1 px-4 py-3 rounded-l-lg bg-gray-900 border border-cyan-500 text-cyan-400 focus:outline-none focus:shadow-[0_0_10px_rgba(0,255,255,0.3)]',
    glass: 'flex-1 px-4 py-3 rounded-l-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:bg-white/20 backdrop-blur',
    cosmic: 'flex-1 px-4 py-3 rounded-l-lg bg-indigo-900/50 border border-purple-500/30 text-white focus:outline-none focus:border-purple-400',
  };

  return (
    <section className={layoutStyles.section[variant]}>
      <div className="max-w-xl mx-auto text-center">
        <h2 className={`text-3xl md:text-4xl mb-4 ${layoutStyles.heading[variant]}`}>
          {title}
        </h2>
        <p className={`text-lg mb-6 ${layoutStyles.subheading[variant]}`}>
          {subtitle}
        </p>
        <div className="flex">
          <input
            type="email"
            placeholder="Enter your email"
            className={inputStyles[variant]}
          />
          <button className={`${layoutStyles.button[variant]} !rounded-l-none`}>
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// REGISTRY ENTRIES
// ============================================================================

const createLayoutEntry = (
  id: string,
  name: string,
  description: string,
  tags: string[],
  component: React.FC<any>,
  composedOf: string[] = []
): ElementEntry => ({
  id: `org-layout-${id}`,
  name,
  layer: 'organism',
  category: 'organisms',
  description,
  themeAgnostic: false,
  composedOf,
  sourceComponents: ['multiple-zones'],
  extractedFrom: 'src/elements/organisms/layout/index.tsx',
  previewType: 'fullwidth',
  hasInteraction: true,
  implementation: 'component',
  component,
  codeSnippet: `<${name.replace(/\s/g, '')} />`,
  tags: ['layout', 'organism', 'section', ...tags],
});

export const layoutRegistry: ElementEntry[] = [
  // Hero Section variants
  createLayoutEntry('hero', 'Hero Section', 'Full-width hero with headline and CTA', ['hero', 'landing', 'header'], HeroSection, ['mol-button', 'mol-heading']),
  createLayoutEntry('hero-dark', 'Hero Section Dark', 'Dark theme hero section', ['hero', 'dark', 'landing'], (props) => <HeroSection {...props} variant="dark" />, ['mol-button', 'mol-heading']),
  createLayoutEntry('hero-brutal', 'Hero Section Brutal', 'Neo-brutal hero section', ['hero', 'brutal', 'landing'], (props) => <HeroSection {...props} variant="brutal" />, ['mol-button', 'mol-heading']),
  createLayoutEntry('hero-neon', 'Hero Section Neon', 'Neon-styled hero section', ['hero', 'neon', 'landing'], (props) => <HeroSection {...props} variant="neon" />, ['mol-button', 'mol-heading']),
  createLayoutEntry('hero-cosmic', 'Hero Section Cosmic', 'Cosmic gradient hero', ['hero', 'cosmic', 'landing'], (props) => <HeroSection {...props} variant="cosmic" />, ['mol-button', 'mol-heading']),

  // Feature Grid variants
  createLayoutEntry('feature-grid', 'Feature Grid', 'Grid of feature cards', ['features', 'grid', 'cards'], FeatureGrid, ['mol-card']),
  createLayoutEntry('feature-grid-dark', 'Feature Grid Dark', 'Dark theme feature grid', ['features', 'dark'], (props) => <FeatureGrid {...props} variant="dark" />, ['mol-card']),
  createLayoutEntry('feature-grid-glass', 'Feature Grid Glass', 'Glassmorphism features', ['features', 'glass'], (props) => <FeatureGrid {...props} variant="glass" />, ['mol-card']),

  // Testimonials variants
  createLayoutEntry('testimonials', 'Testimonials Section', 'Customer testimonials grid', ['testimonials', 'social-proof'], TestimonialsSection, ['mol-card', 'mol-avatar']),
  createLayoutEntry('testimonials-dark', 'Testimonials Dark', 'Dark theme testimonials', ['testimonials', 'dark'], (props) => <TestimonialsSection {...props} variant="dark" />, ['mol-card', 'mol-avatar']),
  createLayoutEntry('testimonials-cosmic', 'Testimonials Cosmic', 'Cosmic themed testimonials', ['testimonials', 'cosmic'], (props) => <TestimonialsSection {...props} variant="cosmic" />, ['mol-card', 'mol-avatar']),

  // CTA Section variants
  createLayoutEntry('cta', 'CTA Section', 'Call-to-action banner', ['cta', 'banner', 'conversion'], CtaSection, ['mol-button', 'mol-heading']),
  createLayoutEntry('cta-brutal', 'CTA Section Brutal', 'Brutal-styled CTA', ['cta', 'brutal'], (props) => <CtaSection {...props} variant="brutal" />, ['mol-button', 'mol-heading']),
  createLayoutEntry('cta-neon', 'CTA Section Neon', 'Neon CTA banner', ['cta', 'neon'], (props) => <CtaSection {...props} variant="neon" />, ['mol-button', 'mol-heading']),

  // Footer variants
  createLayoutEntry('footer', 'Footer', 'Site footer with links', ['footer', 'navigation'], Footer, ['mol-link-list']),
  createLayoutEntry('footer-dark', 'Footer Dark', 'Dark theme footer', ['footer', 'dark'], (props) => <Footer {...props} variant="dark" />, ['mol-link-list']),
  createLayoutEntry('footer-brutal', 'Footer Brutal', 'Neo-brutal footer', ['footer', 'brutal'], (props) => <Footer {...props} variant="brutal" />, ['mol-link-list']),

  // Split Section variants
  createLayoutEntry('split', 'Split Section', 'Two-column content section', ['split', 'content', 'features'], SplitSection, ['mol-heading', 'mol-list']),
  createLayoutEntry('split-dark', 'Split Section Dark', 'Dark split section', ['split', 'dark'], (props) => <SplitSection {...props} variant="dark" />, ['mol-heading', 'mol-list']),
  createLayoutEntry('split-cosmic', 'Split Section Cosmic', 'Cosmic split layout', ['split', 'cosmic'], (props) => <SplitSection {...props} variant="cosmic" />, ['mol-heading', 'mol-list']),

  // Pricing Section variants
  createLayoutEntry('pricing', 'Pricing Section', 'Pricing comparison table', ['pricing', 'plans', 'saas'], PricingSection, ['mol-card', 'mol-button']),
  createLayoutEntry('pricing-dark', 'Pricing Section Dark', 'Dark theme pricing', ['pricing', 'dark'], (props) => <PricingSection {...props} variant="dark" />, ['mol-card', 'mol-button']),
  createLayoutEntry('pricing-neon', 'Pricing Section Neon', 'Neon pricing cards', ['pricing', 'neon'], (props) => <PricingSection {...props} variant="neon" />, ['mol-card', 'mol-button']),

  // Stats Section variants
  createLayoutEntry('stats', 'Stats Section', 'Key metrics display', ['stats', 'metrics', 'numbers'], StatsSection, ['mol-stat-card']),
  createLayoutEntry('stats-neon', 'Stats Section Neon', 'Neon stats display', ['stats', 'neon'], (props) => <StatsSection {...props} variant="neon" />, ['mol-stat-card']),
  createLayoutEntry('stats-cosmic', 'Stats Section Cosmic', 'Cosmic stats section', ['stats', 'cosmic'], (props) => <StatsSection {...props} variant="cosmic" />, ['mol-stat-card']),

  // FAQ Section variants
  createLayoutEntry('faq', 'FAQ Section', 'Accordion-style FAQ', ['faq', 'questions', 'accordion'], FaqSection, ['mol-accordion']),
  createLayoutEntry('faq-dark', 'FAQ Section Dark', 'Dark theme FAQ', ['faq', 'dark'], (props) => <FaqSection {...props} variant="dark" />, ['mol-accordion']),

  // Newsletter Section variants
  createLayoutEntry('newsletter', 'Newsletter Section', 'Email signup section', ['newsletter', 'email', 'subscription'], NewsletterSection, ['mol-input', 'mol-button']),
  createLayoutEntry('newsletter-dark', 'Newsletter Dark', 'Dark newsletter signup', ['newsletter', 'dark'], (props) => <NewsletterSection {...props} variant="dark" />, ['mol-input', 'mol-button']),
  createLayoutEntry('newsletter-glass', 'Newsletter Glass', 'Glassmorphism newsletter', ['newsletter', 'glass'], (props) => <NewsletterSection {...props} variant="glass" />, ['mol-input', 'mol-button']),
];

export default layoutRegistry;
