/**
 * Marketing Templates
 * Full page layouts for marketing sites: landing pages, pricing, features
 */

import React from 'react';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface TemplateEntry {
  id: string;
  name: string;
  layer: 'template';
  category: 'marketing' | 'application' | 'content' | 'auth';
  description: string;
  sections: string[];
  composedOf: string[];
  themeAgnostic: boolean;
  sourceComponents: string[];
  extractedFrom: string;
  previewType: 'fullwidth';
  hasInteraction: boolean;
  implementation: 'component';
  component: React.FC<any>;
  codeSnippet: string;
  tags: string[];
}

type TemplateVariant = 'default' | 'dark' | 'brutal' | 'neon' | 'glass' | 'cosmic';

// ============================================================================
// SHARED STYLES
// ============================================================================

const pageStyles = {
  default: 'min-h-screen bg-white text-gray-900',
  dark: 'min-h-screen bg-gray-950 text-white',
  brutal: 'min-h-screen bg-yellow-100 text-black',
  neon: 'min-h-screen bg-black text-cyan-400',
  glass: 'min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white',
  cosmic: 'min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-black text-white',
};

// ============================================================================
// LANDING PAGE TEMPLATE
// ============================================================================

interface LandingPageProps {
  variant?: TemplateVariant;
}

export const LandingPageTemplate: React.FC<LandingPageProps> = ({ variant = 'default' }) => {
  const navStyles = {
    default: 'bg-white border-b border-gray-200',
    dark: 'bg-gray-900 border-b border-gray-800',
    brutal: 'bg-yellow-400 border-b-4 border-black',
    neon: 'bg-black border-b border-cyan-500/50',
    glass: 'bg-white/10 backdrop-blur-xl border-b border-white/10',
    cosmic: 'bg-indigo-950/80 backdrop-blur border-b border-purple-500/30',
  };

  const heroStyles = {
    default: 'bg-gradient-to-br from-blue-50 to-indigo-100',
    dark: 'bg-gradient-to-br from-gray-900 to-gray-800',
    brutal: 'bg-yellow-100',
    neon: 'bg-black',
    glass: 'bg-transparent',
    cosmic: 'bg-transparent',
  };

  const buttonStyles = {
    default: 'bg-blue-600 text-white hover:bg-blue-700 rounded-lg',
    dark: 'bg-blue-500 text-white hover:bg-blue-400 rounded-lg',
    brutal: 'bg-black text-white border-4 border-black hover:bg-yellow-400 hover:text-black shadow-[4px_4px_0_0_#000]',
    neon: 'bg-transparent border border-cyan-400 text-cyan-400 hover:bg-cyan-400/20 shadow-[0_0_20px_rgba(0,255,255,0.3)]',
    glass: 'bg-white/20 text-white hover:bg-white/30 backdrop-blur rounded-xl border border-white/20',
    cosmic: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500 rounded-lg shadow-lg shadow-purple-500/25',
  };

  const cardStyles = {
    default: 'bg-white rounded-xl shadow-lg border border-gray-100',
    dark: 'bg-gray-800 rounded-xl border border-gray-700',
    brutal: 'bg-white border-4 border-black shadow-[8px_8px_0_0_#000]',
    neon: 'bg-gray-900/80 rounded-lg border border-cyan-500/50',
    glass: 'bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20',
    cosmic: 'bg-indigo-900/50 rounded-xl border border-purple-500/30 backdrop-blur',
  };

  const footerStyles = {
    default: 'bg-gray-100 border-t border-gray-200',
    dark: 'bg-gray-950 border-t border-gray-800',
    brutal: 'bg-black text-yellow-400 border-t-8 border-yellow-400',
    neon: 'bg-black border-t border-cyan-500/50',
    glass: 'bg-black/30 backdrop-blur border-t border-white/10',
    cosmic: 'bg-black border-t border-purple-500/30',
  };

  return (
    <div className={pageStyles[variant]}>
      {/* Navigation */}
      <nav className={`${navStyles[variant]} px-6 py-4`}>
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className={`text-xl font-bold ${variant === 'brutal' ? 'text-black' : ''}`}>
            Brand
          </div>
          <div className="flex gap-6">
            {['Features', 'Pricing', 'About'].map((item) => (
              <a key={item} href="#" className="hover:opacity-70 transition-opacity">
                {item}
              </a>
            ))}
            <button className={`px-4 py-2 ${buttonStyles[variant]}`}>
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={`${heroStyles[variant]} py-24 px-6`}>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className={`text-5xl md:text-6xl font-bold mb-6 ${variant === 'brutal' ? 'uppercase' : ''}`}>
            Build Something Amazing
          </h1>
          <p className={`text-xl mb-8 opacity-80 max-w-2xl mx-auto`}>
            Create beautiful, responsive websites with our powerful platform.
            Start building your next project today.
          </p>
          <div className="flex gap-4 justify-center">
            <button className={`px-8 py-4 text-lg font-semibold ${buttonStyles[variant]}`}>
              Start Free Trial
            </button>
            <button className={`px-8 py-4 text-lg font-semibold border ${
              variant === 'brutal' ? 'border-4 border-black' : 'border-current'
            } rounded-lg hover:opacity-70`}>
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-3xl font-bold text-center mb-12 ${variant === 'brutal' ? 'uppercase' : ''}`}>
            Powerful Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '⚡', title: 'Lightning Fast', desc: 'Optimized for speed and performance' },
              { icon: '🎨', title: 'Customizable', desc: 'Easily customize every component' },
              { icon: '🔒', title: 'Secure', desc: 'Built with security best practices' },
            ].map((feature) => (
              <div key={feature.title} className={`${cardStyles[variant]} p-8`}>
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="opacity-70">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 px-6 ${
        variant === 'default' ? 'bg-blue-600 text-white' :
        variant === 'dark' ? 'bg-blue-900' :
        variant === 'brutal' ? 'bg-black text-yellow-400' :
        variant === 'neon' ? 'bg-gradient-to-r from-cyan-900 to-purple-900' :
        variant === 'glass' ? 'bg-purple-600/30' :
        'bg-gradient-to-r from-purple-800 to-pink-700'
      }`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-3xl font-bold mb-4 ${variant === 'brutal' ? 'uppercase' : ''}`}>
            Ready to Get Started?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of developers building with our platform.
          </p>
          <button className={`px-8 py-4 text-lg font-bold ${
            variant === 'brutal' ? 'bg-yellow-400 text-black border-4 border-yellow-400' :
            'bg-white text-gray-900 hover:bg-gray-100'
          } rounded-lg`}>
            Start Free Trial
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className={`${footerStyles[variant]} py-12 px-6`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-xl font-bold mb-4">Brand</div>
              <p className="opacity-70">Building the future of web development.</p>
            </div>
            {['Product', 'Company', 'Legal'].map((section) => (
              <div key={section}>
                <div className="font-semibold mb-4">{section}</div>
                <ul className="space-y-2 opacity-70">
                  {['Link 1', 'Link 2', 'Link 3'].map((link, i) => (
                    <li key={i}><a href="#" className="hover:opacity-100">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className={`pt-8 border-t ${
            variant === 'dark' || variant === 'neon' || variant === 'cosmic' ? 'border-gray-800' :
            variant === 'brutal' ? 'border-yellow-400' : 'border-gray-200'
          } text-center opacity-70`}>
            © 2024 Brand. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

// ============================================================================
// PRICING PAGE TEMPLATE
// ============================================================================

interface PricingPageProps {
  variant?: TemplateVariant;
}

export const PricingPageTemplate: React.FC<PricingPageProps> = ({ variant = 'default' }) => {
  const plans = [
    { name: 'Starter', price: '$9', desc: 'For side projects', features: ['5 projects', '10GB storage', 'Community support'] },
    { name: 'Pro', price: '$29', desc: 'For growing teams', features: ['Unlimited projects', '100GB storage', 'Priority support', 'Analytics'], popular: true },
    { name: 'Enterprise', price: '$99', desc: 'For organizations', features: ['Everything in Pro', 'Unlimited storage', 'Dedicated support', 'Custom integrations', 'SLA'] },
  ];

  const cardStyles = {
    default: 'bg-white rounded-2xl shadow-lg border border-gray-100',
    dark: 'bg-gray-800 rounded-2xl border border-gray-700',
    brutal: 'bg-white border-4 border-black shadow-[8px_8px_0_0_#000]',
    neon: 'bg-gray-900/80 rounded-lg border border-cyan-500/50',
    glass: 'bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20',
    cosmic: 'bg-indigo-900/50 rounded-xl border border-purple-500/30',
  };

  const popularStyles = {
    default: 'border-blue-500 scale-105 shadow-xl',
    dark: 'border-blue-400 scale-105',
    brutal: 'border-yellow-400 bg-yellow-50 scale-105',
    neon: 'border-cyan-400 shadow-[0_0_30px_rgba(0,255,255,0.3)]',
    glass: 'border-white/40 scale-105',
    cosmic: 'border-purple-400 shadow-lg shadow-purple-500/25',
  };

  const buttonStyles = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    dark: 'bg-blue-500 text-white hover:bg-blue-400',
    brutal: 'bg-black text-white hover:bg-yellow-400 hover:text-black border-4 border-black',
    neon: 'border border-cyan-400 text-cyan-400 hover:bg-cyan-400/20',
    glass: 'bg-white/20 text-white hover:bg-white/30 border border-white/20',
    cosmic: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white',
  };

  return (
    <div className={pageStyles[variant]}>
      {/* Header */}
      <section className="py-20 px-6 text-center">
        <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${variant === 'brutal' ? 'uppercase' : ''}`}>
          Simple, Transparent Pricing
        </h1>
        <p className="text-xl opacity-70 max-w-2xl mx-auto">
          Choose the plan that works for you. No hidden fees.
        </p>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`${cardStyles[variant]} ${plan.popular ? popularStyles[variant] : ''} p-8`}
            >
              {plan.popular && (
                <div className={`text-xs font-bold uppercase tracking-wide mb-2 ${
                  variant === 'neon' ? 'text-cyan-400' : variant === 'cosmic' ? 'text-purple-400' : 'text-blue-500'
                }`}>
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="text-4xl font-bold mb-2">
                {plan.price}<span className="text-lg font-normal opacity-70">/mo</span>
              </div>
              <p className="opacity-70 mb-6">{plan.desc}</p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <span className={variant === 'neon' ? 'text-cyan-400' : 'text-green-500'}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-lg font-semibold ${buttonStyles[variant]}`}>
                Get Started
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className={`py-20 px-6 ${variant === 'default' ? 'bg-gray-50' : ''}`}>
        <div className="max-w-3xl mx-auto">
          <h2 className={`text-3xl font-bold text-center mb-12 ${variant === 'brutal' ? 'uppercase' : ''}`}>
            Frequently Asked Questions
          </h2>
          {[
            { q: 'Can I change plans later?', a: 'Yes, you can upgrade or downgrade at any time.' },
            { q: 'Is there a free trial?', a: 'Yes! All plans come with a 14-day free trial.' },
            { q: 'What payment methods do you accept?', a: 'We accept all major credit cards and PayPal.' },
          ].map((faq, i) => (
            <div key={i} className={`${cardStyles[variant]} p-6 mb-4`}>
              <h3 className="font-bold mb-2">{faq.q}</h3>
              <p className="opacity-70">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// ============================================================================
// FEATURES PAGE TEMPLATE
// ============================================================================

interface FeaturesPageProps {
  variant?: TemplateVariant;
}

export const FeaturesPageTemplate: React.FC<FeaturesPageProps> = ({ variant = 'default' }) => {
  const features = [
    { icon: '🚀', title: 'Blazing Fast', desc: 'Built for performance from the ground up', details: ['Optimized builds', 'CDN delivery', 'Lazy loading'] },
    { icon: '🎯', title: 'Developer First', desc: 'Tools that developers love to use', details: ['TypeScript support', 'Hot reload', 'Great docs'] },
    { icon: '🔌', title: 'Extensible', desc: 'Plugins for everything you need', details: ['Plugin ecosystem', 'Custom hooks', 'API access'] },
    { icon: '🛡️', title: 'Secure', desc: 'Security built into every layer', details: ['Auth included', 'HTTPS default', 'Data encryption'] },
  ];

  const cardStyles = {
    default: 'bg-white rounded-xl shadow-lg border border-gray-100',
    dark: 'bg-gray-800 rounded-xl border border-gray-700',
    brutal: 'bg-white border-4 border-black shadow-[8px_8px_0_0_#000]',
    neon: 'bg-gray-900/80 rounded-lg border border-cyan-500/50',
    glass: 'bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20',
    cosmic: 'bg-indigo-900/50 rounded-xl border border-purple-500/30',
  };

  return (
    <div className={pageStyles[variant]}>
      {/* Hero */}
      <section className="py-20 px-6 text-center">
        <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${variant === 'brutal' ? 'uppercase' : ''}`}>
          Powerful Features
        </h1>
        <p className="text-xl opacity-70 max-w-2xl mx-auto">
          Everything you need to build modern web applications
        </p>
      </section>

      {/* Features List */}
      <section className="pb-20 px-6">
        <div className="max-w-5xl mx-auto space-y-16">
          {features.map((feature, i) => (
            <div key={feature.title} className={`grid md:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
              <div className={i % 2 === 1 ? 'md:order-2' : ''}>
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h2 className={`text-3xl font-bold mb-4 ${variant === 'brutal' ? 'uppercase' : ''}`}>
                  {feature.title}
                </h2>
                <p className="text-lg opacity-70 mb-6">{feature.desc}</p>
                <ul className="space-y-2">
                  {feature.details.map((detail) => (
                    <li key={detail} className="flex items-center gap-2">
                      <span className={variant === 'neon' ? 'text-cyan-400' : 'text-green-500'}>✓</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`${cardStyles[variant]} aspect-video flex items-center justify-center ${i % 2 === 1 ? 'md:order-1' : ''}`}>
                <span className="text-6xl opacity-30">{feature.icon}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// ============================================================================
// ABOUT PAGE TEMPLATE
// ============================================================================

interface AboutPageProps {
  variant?: TemplateVariant;
}

export const AboutPageTemplate: React.FC<AboutPageProps> = ({ variant = 'default' }) => {
  const team = [
    { name: 'Jane Doe', role: 'CEO', initial: 'JD' },
    { name: 'John Smith', role: 'CTO', initial: 'JS' },
    { name: 'Sarah Chen', role: 'Design Lead', initial: 'SC' },
    { name: 'Mike Johnson', role: 'Engineering', initial: 'MJ' },
  ];

  const cardStyles = {
    default: 'bg-white rounded-xl shadow-lg border border-gray-100',
    dark: 'bg-gray-800 rounded-xl border border-gray-700',
    brutal: 'bg-white border-4 border-black shadow-[8px_8px_0_0_#000]',
    neon: 'bg-gray-900/80 rounded-lg border border-cyan-500/50',
    glass: 'bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20',
    cosmic: 'bg-indigo-900/50 rounded-xl border border-purple-500/30',
  };

  const avatarStyles = {
    default: 'bg-blue-500 text-white',
    dark: 'bg-blue-600 text-white',
    brutal: 'bg-black text-yellow-400 border-4 border-black',
    neon: 'bg-cyan-900 text-cyan-400 border border-cyan-400',
    glass: 'bg-white/20 text-white border border-white/20',
    cosmic: 'bg-purple-700 text-white',
  };

  return (
    <div className={pageStyles[variant]}>
      {/* Hero */}
      <section className="py-20 px-6 text-center">
        <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${variant === 'brutal' ? 'uppercase' : ''}`}>
          About Us
        </h1>
        <p className="text-xl opacity-70 max-w-2xl mx-auto">
          We're on a mission to make web development accessible to everyone.
        </p>
      </section>

      {/* Story */}
      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className={`${cardStyles[variant]} p-8 md:p-12`}>
            <h2 className={`text-2xl font-bold mb-6 ${variant === 'brutal' ? 'uppercase' : ''}`}>Our Story</h2>
            <div className="space-y-4 opacity-80">
              <p>
                Founded in 2020, we set out to solve a simple problem: building websites shouldn't be complicated.
              </p>
              <p>
                Today, thousands of developers and teams use our platform to build and deploy modern web applications.
              </p>
              <p>
                We're backed by leading investors and are growing fast. Join us on this journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className={`py-20 px-6 ${variant === 'default' ? 'bg-gray-50' : ''}`}>
        <div className="max-w-5xl mx-auto">
          <h2 className={`text-3xl font-bold text-center mb-12 ${variant === 'brutal' ? 'uppercase' : ''}`}>
            Meet the Team
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name} className={`${cardStyles[variant]} p-6 text-center`}>
                <div className={`w-20 h-20 rounded-full ${avatarStyles[variant]} flex items-center justify-center text-2xl font-bold mx-auto mb-4`}>
                  {member.initial}
                </div>
                <h3 className="font-bold">{member.name}</h3>
                <p className="opacity-70">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className={`text-3xl font-bold text-center mb-12 ${variant === 'brutal' ? 'uppercase' : ''}`}>
            Our Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '💡', title: 'Innovation', desc: 'Always pushing boundaries' },
              { icon: '🤝', title: 'Collaboration', desc: 'Better together' },
              { icon: '✨', title: 'Quality', desc: 'Excellence in everything' },
            ].map((value) => (
              <div key={value.title} className={`${cardStyles[variant]} p-8 text-center`}>
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="opacity-70">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// ============================================================================
// REGISTRY ENTRIES
// ============================================================================

const createMarketingEntry = (
  id: string,
  name: string,
  description: string,
  sections: string[],
  tags: string[],
  component: React.FC<any>,
  composedOf: string[] = []
): TemplateEntry => ({
  id: `tpl-mkt-${id}`,
  name,
  layer: 'template',
  category: 'marketing',
  description,
  sections,
  composedOf,
  themeAgnostic: false,
  sourceComponents: ['custom'],
  extractedFrom: 'src/elements/templates/marketing/index.tsx',
  previewType: 'fullwidth',
  hasInteraction: true,
  implementation: 'component',
  component,
  codeSnippet: `<${name.replace(/\s/g, '')} />`,
  tags: ['template', 'marketing', 'page', ...tags],
});

export const marketingTemplateRegistry: TemplateEntry[] = [
  // Landing Page variants
  createMarketingEntry('landing', 'Landing Page', 'Complete marketing landing page with hero, features, CTA, and footer', ['nav', 'hero', 'features', 'cta', 'footer'], ['landing', 'homepage', 'conversion'], LandingPageTemplate, ['org-nav-navbar', 'org-layout-hero', 'org-layout-feature-grid', 'org-layout-cta', 'org-layout-footer']),
  createMarketingEntry('landing-dark', 'Landing Page Dark', 'Dark theme landing page', ['nav', 'hero', 'features', 'cta', 'footer'], ['landing', 'dark'], (props) => <LandingPageTemplate {...props} variant="dark" />, ['org-nav-navbar', 'org-layout-hero', 'org-layout-feature-grid', 'org-layout-cta', 'org-layout-footer']),
  createMarketingEntry('landing-brutal', 'Landing Page Brutal', 'Neo-brutal landing page', ['nav', 'hero', 'features', 'cta', 'footer'], ['landing', 'brutal'], (props) => <LandingPageTemplate {...props} variant="brutal" />, ['org-nav-navbar', 'org-layout-hero', 'org-layout-feature-grid', 'org-layout-cta', 'org-layout-footer']),
  createMarketingEntry('landing-neon', 'Landing Page Neon', 'Neon cyberpunk landing page', ['nav', 'hero', 'features', 'cta', 'footer'], ['landing', 'neon', 'cyberpunk'], (props) => <LandingPageTemplate {...props} variant="neon" />, ['org-nav-navbar', 'org-layout-hero', 'org-layout-feature-grid', 'org-layout-cta', 'org-layout-footer']),
  createMarketingEntry('landing-cosmic', 'Landing Page Cosmic', 'Cosmic gradient landing page', ['nav', 'hero', 'features', 'cta', 'footer'], ['landing', 'cosmic', 'gradient'], (props) => <LandingPageTemplate {...props} variant="cosmic" />, ['org-nav-navbar', 'org-layout-hero', 'org-layout-feature-grid', 'org-layout-cta', 'org-layout-footer']),

  // Pricing Page variants
  createMarketingEntry('pricing', 'Pricing Page', 'Pricing comparison page with plans and FAQ', ['header', 'pricing-cards', 'faq'], ['pricing', 'plans', 'saas'], PricingPageTemplate, ['org-layout-pricing', 'org-layout-faq']),
  createMarketingEntry('pricing-dark', 'Pricing Page Dark', 'Dark theme pricing page', ['header', 'pricing-cards', 'faq'], ['pricing', 'dark'], (props) => <PricingPageTemplate {...props} variant="dark" />, ['org-layout-pricing', 'org-layout-faq']),
  createMarketingEntry('pricing-neon', 'Pricing Page Neon', 'Neon pricing page', ['header', 'pricing-cards', 'faq'], ['pricing', 'neon'], (props) => <PricingPageTemplate {...props} variant="neon" />, ['org-layout-pricing', 'org-layout-faq']),

  // Features Page variants
  createMarketingEntry('features', 'Features Page', 'Product features showcase page', ['header', 'feature-sections'], ['features', 'product'], FeaturesPageTemplate, ['org-layout-split', 'org-layout-feature-grid']),
  createMarketingEntry('features-dark', 'Features Page Dark', 'Dark theme features page', ['header', 'feature-sections'], ['features', 'dark'], (props) => <FeaturesPageTemplate {...props} variant="dark" />, ['org-layout-split', 'org-layout-feature-grid']),
  createMarketingEntry('features-glass', 'Features Page Glass', 'Glassmorphism features page', ['header', 'feature-sections'], ['features', 'glass'], (props) => <FeaturesPageTemplate {...props} variant="glass" />, ['org-layout-split', 'org-layout-feature-grid']),

  // About Page variants
  createMarketingEntry('about', 'About Page', 'Company about page with story, team, and values', ['header', 'story', 'team', 'values'], ['about', 'company', 'team'], AboutPageTemplate, ['org-layout-stats', 'mol-avatar']),
  createMarketingEntry('about-dark', 'About Page Dark', 'Dark theme about page', ['header', 'story', 'team', 'values'], ['about', 'dark'], (props) => <AboutPageTemplate {...props} variant="dark" />, ['org-layout-stats', 'mol-avatar']),
  createMarketingEntry('about-cosmic', 'About Page Cosmic', 'Cosmic about page', ['header', 'story', 'team', 'values'], ['about', 'cosmic'], (props) => <AboutPageTemplate {...props} variant="cosmic" />, ['org-layout-stats', 'mol-avatar']),
];

export default marketingTemplateRegistry;
