// ============================================================================
// TEMPLATES INDEX
// Exports all template registries and components
// ============================================================================

// Marketing Templates
export {
  LandingPageTemplate,
  PricingPageTemplate,
  FeaturesPageTemplate,
  AboutPageTemplate,
  marketingTemplateRegistry,
} from './marketing';

// Application Templates
export {
  DashboardTemplate,
  SettingsTemplate,
  ProfileTemplate,
  AnalyticsTemplate,
  applicationTemplateRegistry,
} from './application';

// Content Templates
export {
  BlogListTemplate,
  ArticleTemplate,
  GalleryTemplate,
  DocumentationTemplate,
  contentTemplateRegistry,
} from './content';

// Auth Templates
export {
  LoginTemplate,
  SignupTemplate,
  CheckoutTemplate,
  PasswordResetTemplate,
  authTemplateRegistry,
} from './auth';

// Combined registry
import { marketingTemplateRegistry } from './marketing';
import { applicationTemplateRegistry } from './application';
import { contentTemplateRegistry } from './content';
import { authTemplateRegistry } from './auth';

export const templateRegistry = [
  ...marketingTemplateRegistry,
  ...applicationTemplateRegistry,
  ...contentTemplateRegistry,
  ...authTemplateRegistry,
];

// Template counts for documentation
export const templateCounts = {
  marketing: marketingTemplateRegistry.length,
  application: applicationTemplateRegistry.length,
  content: contentTemplateRegistry.length,
  auth: authTemplateRegistry.length,
  total: marketingTemplateRegistry.length +
         applicationTemplateRegistry.length +
         contentTemplateRegistry.length +
         authTemplateRegistry.length,
};
