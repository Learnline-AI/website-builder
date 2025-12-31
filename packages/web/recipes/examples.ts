/**
 * Example Recipes
 *
 * Pre-built page recipes demonstrating the composition system.
 */

import type { PageRecipe, RecipeCategory } from './types';

// ============================================================================
// SAAS LANDING PAGE
// ============================================================================

export const saasLandingRecipe: PageRecipe = {
  id: 'recipe-saas-landing',
  version: '1.0.0',
  root: {
    props: { title: 'SaaS Landing Page' },
    theme: 'default',
  },
  content: [
    {
      type: 'org-layout-hero',
      props: {
        variant: 'default',
        showImage: true,
      },
      _uiMuseum: {
        id: 'saas-hero',
        addedAt: '2024-12-29T00:00:00Z',
        addedBy: 'user',
        slots: {
          title: { type: 'text', value: 'Ship Products Faster with AI' },
          subtitle: { type: 'text', value: 'Build, test, and deploy your applications 10x faster with our AI-powered development platform.' },
          primaryCta: { type: 'text', value: 'Start Free Trial' },
          secondaryCta: { type: 'text', value: 'Watch Demo' },
        },
      },
    },
    {
      type: 'org-layout-feature-grid',
      props: {
        variant: 'default',
        columns: 3,
      },
      _uiMuseum: {
        id: 'saas-features',
        addedAt: '2024-12-29T00:00:00Z',
        addedBy: 'user',
        slots: {
          heading: { type: 'text', value: 'Everything You Need' },
          subheading: { type: 'text', value: 'A complete toolkit for modern development teams' },
        },
      },
    },
    {
      type: 'org-layout-stats',
      props: {
        variant: 'default',
      },
      _uiMuseum: {
        id: 'saas-stats',
        addedAt: '2024-12-29T00:00:00Z',
        addedBy: 'user',
      },
    },
    {
      type: 'org-layout-testimonials',
      props: {
        variant: 'default',
      },
      _uiMuseum: {
        id: 'saas-testimonials',
        addedAt: '2024-12-29T00:00:00Z',
        addedBy: 'user',
        slots: {
          heading: { type: 'text', value: 'Loved by Developers' },
        },
      },
    },
    {
      type: 'org-layout-pricing',
      props: {
        variant: 'default',
      },
      _uiMuseum: {
        id: 'saas-pricing',
        addedAt: '2024-12-29T00:00:00Z',
        addedBy: 'user',
      },
    },
    {
      type: 'org-layout-faq',
      props: {
        variant: 'default',
      },
      _uiMuseum: {
        id: 'saas-faq',
        addedAt: '2024-12-29T00:00:00Z',
        addedBy: 'user',
      },
    },
    {
      type: 'org-layout-cta',
      props: {
        variant: 'default',
        centered: true,
      },
      _uiMuseum: {
        id: 'saas-cta',
        addedAt: '2024-12-29T00:00:00Z',
        addedBy: 'user',
        slots: {
          title: { type: 'text', value: 'Ready to Accelerate Your Development?' },
          subtitle: { type: 'text', value: 'Join 10,000+ developers shipping faster with our platform.' },
          cta: { type: 'text', value: 'Start Free Trial' },
        },
      },
    },
    {
      type: 'org-layout-footer',
      props: {
        variant: 'default',
        showSocial: true,
      },
      _uiMuseum: {
        id: 'saas-footer',
        addedAt: '2024-12-29T00:00:00Z',
        addedBy: 'user',
        slots: {
          companyName: { type: 'text', value: 'DevPlatform' },
          tagline: { type: 'text', value: 'Accelerating development workflows worldwide.' },
        },
      },
    },
  ],
  _uiMuseum: {
    name: 'SaaS Landing Page',
    description: 'A complete SaaS product landing page with hero, features, pricing, and more.',
    category: 'landing',
    tags: ['saas', 'landing', 'marketing', 'product'],
    createdAt: '2024-12-29T00:00:00Z',
    updatedAt: '2024-12-29T00:00:00Z',
    createdBy: 'user',
  },
};

// ============================================================================
// PORTFOLIO PAGE
// ============================================================================

export const portfolioRecipe: PageRecipe = {
  id: 'recipe-portfolio',
  version: '1.0.0',
  root: {
    props: { title: 'Portfolio' },
    theme: 'dark',
  },
  content: [
    {
      type: 'org-layout-hero-dark',
      props: {
        variant: 'dark',
        showImage: false,
      },
      _uiMuseum: {
        id: 'portfolio-hero',
        addedAt: '2024-12-29T00:00:00Z',
        addedBy: 'user',
        slots: {
          title: { type: 'text', value: 'Creative Developer & Designer' },
          subtitle: { type: 'text', value: 'I craft beautiful digital experiences that delight users and drive business results.' },
          primaryCta: { type: 'text', value: 'View My Work' },
          secondaryCta: { type: 'text', value: 'Get in Touch' },
        },
      },
    },
    {
      type: 'org-layout-feature-grid-dark',
      props: {
        variant: 'dark',
        columns: 3,
      },
      _uiMuseum: {
        id: 'portfolio-skills',
        addedAt: '2024-12-29T00:00:00Z',
        addedBy: 'user',
        slots: {
          heading: { type: 'text', value: 'What I Do' },
          subheading: { type: 'text', value: 'Expertise across the full stack of product development' },
          features: {
            type: 'list',
            value: [
              { type: 'text', value: { icon: '🎨', title: 'UI/UX Design', description: 'Creating intuitive and beautiful interfaces' } },
              { type: 'text', value: { icon: '💻', title: 'Frontend Development', description: 'Building responsive, performant web apps' } },
              { type: 'text', value: { icon: '🔧', title: 'Backend Development', description: 'Scalable APIs and microservices' } },
            ],
          },
        },
      },
    },
    {
      type: 'org-layout-split-dark',
      props: {
        variant: 'dark',
        imageOnRight: false,
      },
      _uiMuseum: {
        id: 'portfolio-about',
        addedAt: '2024-12-29T00:00:00Z',
        addedBy: 'user',
      },
    },
    {
      type: 'org-layout-testimonials-dark',
      props: {
        variant: 'dark',
      },
      _uiMuseum: {
        id: 'portfolio-testimonials',
        addedAt: '2024-12-29T00:00:00Z',
        addedBy: 'user',
        slots: {
          heading: { type: 'text', value: 'Client Reviews' },
        },
      },
    },
    {
      type: 'org-layout-newsletter-dark',
      props: {
        variant: 'dark',
      },
      _uiMuseum: {
        id: 'portfolio-contact',
        addedAt: '2024-12-29T00:00:00Z',
        addedBy: 'user',
      },
    },
    {
      type: 'org-layout-footer-dark',
      props: {
        variant: 'dark',
        showSocial: true,
      },
      _uiMuseum: {
        id: 'portfolio-footer',
        addedAt: '2024-12-29T00:00:00Z',
        addedBy: 'user',
        slots: {
          companyName: { type: 'text', value: 'John Designer' },
          tagline: { type: 'text', value: 'Available for freelance projects.' },
        },
      },
    },
  ],
  _uiMuseum: {
    name: 'Portfolio',
    description: 'A dark-themed portfolio page for designers and developers.',
    category: 'portfolio',
    tags: ['portfolio', 'personal', 'dark', 'creative'],
    createdAt: '2024-12-29T00:00:00Z',
    updatedAt: '2024-12-29T00:00:00Z',
    createdBy: 'user',
  },
};

// ============================================================================
// PRICING PAGE
// ============================================================================

export const pricingRecipe: PageRecipe = {
  id: 'recipe-pricing',
  version: '1.0.0',
  root: {
    props: { title: 'Pricing' },
    theme: 'default',
  },
  content: [
    {
      type: 'org-layout-hero',
      props: {
        variant: 'default',
        showImage: false,
      },
      _uiMuseum: {
        id: 'pricing-hero',
        addedAt: '2024-12-29T00:00:00Z',
        addedBy: 'user',
        slots: {
          title: { type: 'text', value: 'Simple, Transparent Pricing' },
          subtitle: { type: 'text', value: 'Choose the plan that fits your needs. All plans include a 14-day free trial.' },
          primaryCta: { type: 'text', value: 'Compare Plans' },
          secondaryCta: { type: 'text', value: 'Contact Sales' },
        },
      },
    },
    {
      type: 'org-layout-pricing',
      props: {
        variant: 'default',
      },
      _uiMuseum: {
        id: 'pricing-table',
        addedAt: '2024-12-29T00:00:00Z',
        addedBy: 'user',
      },
    },
    {
      type: 'org-layout-feature-grid',
      props: {
        variant: 'default',
        columns: 2,
      },
      _uiMuseum: {
        id: 'pricing-features',
        addedAt: '2024-12-29T00:00:00Z',
        addedBy: 'user',
        slots: {
          heading: { type: 'text', value: 'All Plans Include' },
          subheading: { type: 'text', value: 'Core features available on every plan' },
          features: {
            type: 'list',
            value: [
              { type: 'text', value: { icon: '✓', title: 'Unlimited Projects', description: 'Create as many projects as you need' } },
              { type: 'text', value: { icon: '✓', title: 'Team Collaboration', description: 'Work together in real-time' } },
              { type: 'text', value: { icon: '✓', title: 'API Access', description: 'Full REST API with webhooks' } },
              { type: 'text', value: { icon: '✓', title: '24/7 Support', description: 'Get help whenever you need it' } },
            ],
          },
        },
      },
    },
    {
      type: 'org-layout-faq',
      props: {
        variant: 'default',
      },
      _uiMuseum: {
        id: 'pricing-faq',
        addedAt: '2024-12-29T00:00:00Z',
        addedBy: 'user',
      },
    },
    {
      type: 'org-layout-cta',
      props: {
        variant: 'default',
        centered: true,
      },
      _uiMuseum: {
        id: 'pricing-cta',
        addedAt: '2024-12-29T00:00:00Z',
        addedBy: 'user',
        slots: {
          title: { type: 'text', value: 'Need a Custom Plan?' },
          subtitle: { type: 'text', value: 'Contact our sales team for enterprise pricing and custom solutions.' },
          cta: { type: 'text', value: 'Contact Sales' },
        },
      },
    },
    {
      type: 'org-layout-footer',
      props: {
        variant: 'default',
      },
      _uiMuseum: {
        id: 'pricing-footer',
        addedAt: '2024-12-29T00:00:00Z',
        addedBy: 'user',
      },
    },
  ],
  _uiMuseum: {
    name: 'Pricing Page',
    description: 'A pricing page with plan comparison, features, and FAQ.',
    category: 'pricing',
    tags: ['pricing', 'plans', 'saas', 'comparison'],
    createdAt: '2024-12-29T00:00:00Z',
    updatedAt: '2024-12-29T00:00:00Z',
    createdBy: 'user',
  },
};

// ============================================================================
// BLOG POST
// ============================================================================

export const blogPostRecipe: PageRecipe = {
  id: 'recipe-blog-post',
  version: '1.0.0',
  root: {
    props: { title: 'Blog Post' },
    theme: 'default',
  },
  content: [
    {
      type: 'org-layout-hero',
      props: {
        variant: 'default',
        showImage: true,
      },
      _uiMuseum: {
        id: 'blog-hero',
        addedAt: '2024-12-29T00:00:00Z',
        addedBy: 'user',
        slots: {
          title: { type: 'text', value: 'How We Built Our Design System in 30 Days' },
          subtitle: { type: 'text', value: 'A deep dive into our process, challenges, and lessons learned building a comprehensive component library.' },
          primaryCta: { type: 'text', value: 'Read Article' },
          secondaryCta: { type: 'text', value: 'Share' },
        },
      },
    },
    {
      type: 'org-layout-split',
      props: {
        variant: 'default',
        imageOnRight: true,
      },
      _uiMuseum: {
        id: 'blog-content-1',
        addedAt: '2024-12-29T00:00:00Z',
        addedBy: 'user',
      },
    },
    {
      type: 'org-layout-feature-grid',
      props: {
        variant: 'default',
        columns: 3,
      },
      _uiMuseum: {
        id: 'blog-key-points',
        addedAt: '2024-12-29T00:00:00Z',
        addedBy: 'user',
        slots: {
          heading: { type: 'text', value: 'Key Takeaways' },
          subheading: { type: 'text', value: 'The most important lessons from our journey' },
        },
      },
    },
    {
      type: 'org-layout-cta',
      props: {
        variant: 'default',
        centered: true,
      },
      _uiMuseum: {
        id: 'blog-cta',
        addedAt: '2024-12-29T00:00:00Z',
        addedBy: 'user',
        slots: {
          title: { type: 'text', value: 'Want to Learn More?' },
          subtitle: { type: 'text', value: 'Subscribe to our newsletter for more design system insights.' },
          cta: { type: 'text', value: 'Subscribe' },
        },
      },
    },
    {
      type: 'org-layout-newsletter',
      props: {
        variant: 'default',
      },
      _uiMuseum: {
        id: 'blog-newsletter',
        addedAt: '2024-12-29T00:00:00Z',
        addedBy: 'user',
      },
    },
    {
      type: 'org-layout-footer',
      props: {
        variant: 'default',
      },
      _uiMuseum: {
        id: 'blog-footer',
        addedAt: '2024-12-29T00:00:00Z',
        addedBy: 'user',
      },
    },
  ],
  _uiMuseum: {
    name: 'Blog Post',
    description: 'A blog post template with hero, content sections, and newsletter signup.',
    category: 'blog',
    tags: ['blog', 'article', 'content', 'reading'],
    createdAt: '2024-12-29T00:00:00Z',
    updatedAt: '2024-12-29T00:00:00Z',
    createdBy: 'user',
  },
};

// ============================================================================
// DASHBOARD SHELL
// ============================================================================

export const dashboardShellRecipe: PageRecipe = {
  id: 'recipe-dashboard-shell',
  version: '1.0.0',
  root: {
    props: { title: 'Dashboard' },
    theme: 'dark',
    className: 'min-h-screen bg-gray-950',
  },
  content: [
    {
      type: 'org-layout-stats-neon',
      props: {
        variant: 'neon',
      },
      _uiMuseum: {
        id: 'dashboard-stats',
        addedAt: '2024-12-29T00:00:00Z',
        addedBy: 'user',
      },
    },
    {
      type: 'org-layout-feature-grid-dark',
      props: {
        variant: 'dark',
        columns: 4,
      },
      _uiMuseum: {
        id: 'dashboard-widgets',
        addedAt: '2024-12-29T00:00:00Z',
        addedBy: 'user',
        slots: {
          heading: { type: 'text', value: 'Quick Actions' },
          subheading: { type: 'text', value: 'Frequently used features' },
          features: {
            type: 'list',
            value: [
              { type: 'text', value: { icon: '📊', title: 'Analytics', description: 'View performance metrics' } },
              { type: 'text', value: { icon: '👥', title: 'Users', description: 'Manage team members' } },
              { type: 'text', value: { icon: '⚙️', title: 'Settings', description: 'Configure preferences' } },
              { type: 'text', value: { icon: '📝', title: 'Reports', description: 'Generate reports' } },
            ],
          },
        },
      },
    },
    {
      type: 'org-layout-split-dark',
      props: {
        variant: 'dark',
        imageOnRight: false,
      },
      _uiMuseum: {
        id: 'dashboard-activity',
        addedAt: '2024-12-29T00:00:00Z',
        addedBy: 'user',
      },
    },
  ],
  zones: {
    sidebar: [
      {
        type: 'org-layout-footer-dark',
        props: {
          variant: 'dark',
          showSocial: false,
        },
        _uiMuseum: {
          id: 'dashboard-nav',
          addedAt: '2024-12-29T00:00:00Z',
          addedBy: 'user',
        },
      },
    ],
  },
  _uiMuseum: {
    name: 'Dashboard Shell',
    description: 'A dark-themed dashboard layout with stats, widgets, and activity feed.',
    category: 'dashboard',
    tags: ['dashboard', 'admin', 'application', 'dark'],
    createdAt: '2024-12-29T00:00:00Z',
    updatedAt: '2024-12-29T00:00:00Z',
    createdBy: 'user',
  },
};

// ============================================================================
// NEON LANDING PAGE (Bonus)
// ============================================================================

export const neonLandingRecipe: PageRecipe = {
  id: 'recipe-neon-landing',
  version: '1.0.0',
  root: {
    props: { title: 'Neon Landing Page' },
    theme: 'neon',
  },
  content: [
    {
      type: 'org-layout-hero-neon',
      props: {
        variant: 'neon',
        showImage: true,
      },
      _uiMuseum: {
        id: 'neon-hero',
        addedAt: '2024-12-29T00:00:00Z',
        addedBy: 'user',
        slots: {
          title: { type: 'text', value: 'Enter the Future' },
          subtitle: { type: 'text', value: 'Experience next-generation technology that pushes boundaries.' },
          primaryCta: { type: 'text', value: 'Get Access' },
          secondaryCta: { type: 'text', value: 'Learn More' },
        },
      },
    },
    {
      type: 'org-layout-stats-neon',
      props: {
        variant: 'neon',
      },
      _uiMuseum: {
        id: 'neon-stats',
        addedAt: '2024-12-29T00:00:00Z',
        addedBy: 'user',
      },
    },
    {
      type: 'org-layout-pricing-neon',
      props: {
        variant: 'neon',
      },
      _uiMuseum: {
        id: 'neon-pricing',
        addedAt: '2024-12-29T00:00:00Z',
        addedBy: 'user',
      },
    },
    {
      type: 'org-layout-cta-neon',
      props: {
        variant: 'neon',
        centered: true,
      },
      _uiMuseum: {
        id: 'neon-cta',
        addedAt: '2024-12-29T00:00:00Z',
        addedBy: 'user',
        slots: {
          title: { type: 'text', value: 'Ready to Go Neon?' },
          subtitle: { type: 'text', value: 'Join the cyberpunk revolution today.' },
          cta: { type: 'text', value: 'Get Started' },
        },
      },
    },
  ],
  _uiMuseum: {
    name: 'Neon Landing Page',
    description: 'A cyberpunk-styled landing page with neon glow effects.',
    category: 'landing',
    tags: ['neon', 'cyberpunk', 'dark', 'futuristic'],
    createdAt: '2024-12-29T00:00:00Z',
    updatedAt: '2024-12-29T00:00:00Z',
    createdBy: 'user',
  },
};

// ============================================================================
// EXPORTS
// ============================================================================

export const exampleRecipes: PageRecipe[] = [
  saasLandingRecipe,
  portfolioRecipe,
  pricingRecipe,
  blogPostRecipe,
  dashboardShellRecipe,
  neonLandingRecipe,
];

/**
 * Get a recipe by ID
 */
export function getRecipeById(id: string): PageRecipe | undefined {
  return exampleRecipes.find(r => r.id === id);
}

/**
 * Get recipes by category
 */
export function getRecipesByCategory(category: RecipeCategory): PageRecipe[] {
  return exampleRecipes.filter(r => r._uiMuseum.category === category);
}

/**
 * Get all recipe categories with counts
 */
export function getRecipeCategoryCounts(): Record<RecipeCategory, number> {
  const counts: Partial<Record<RecipeCategory, number>> = {};
  for (const recipe of exampleRecipes) {
    const cat = recipe._uiMuseum.category;
    counts[cat] = (counts[cat] || 0) + 1;
  }
  return counts as Record<RecipeCategory, number>;
}
