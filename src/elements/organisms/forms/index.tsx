// Organism: Forms
// Complex form components composed of molecules
// Can import molecules and atoms

import React from 'react';
import { ElementEntry } from '../../registry';

// ============================================
// FORM COMPONENTS
// ============================================

interface LoginFormProps {
  onSubmit?: (data: { email: string; password: string }) => void;
  variant?: string;
  className?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  variant = 'default',
  className = '',
}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const variants: Record<string, { container: string; input: string; button: string; label: string }> = {
    default: {
      container: 'bg-white rounded-lg shadow-lg p-8 max-w-md w-full',
      input: 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent',
      button: 'w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors',
      label: 'block text-sm font-medium text-gray-700 mb-1',
    },
    brutal: {
      container: 'bg-white border-4 border-black shadow-[8px_8px_0_0_#000] p-8 max-w-md w-full',
      input: 'w-full px-4 py-2 border-4 border-black focus:shadow-[4px_4px_0_0_#000]',
      button: 'w-full py-2 bg-yellow-400 text-black border-4 border-black shadow-[4px_4px_0_0_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_#000] transition-all font-bold',
      label: 'block text-sm font-bold text-black mb-1',
    },
    neon: {
      container: 'bg-black border border-[#33ff00] shadow-[0_0_30px_rgba(51,255,0,0.2)] p-8 max-w-md w-full',
      input: 'w-full px-4 py-2 bg-black border border-[#33ff00] text-[#33ff00] font-mono focus:shadow-[0_0_10px_rgba(51,255,0,0.5)]',
      button: 'w-full py-2 bg-[#33ff00] text-black font-mono font-bold hover:shadow-[0_0_20px_rgba(51,255,0,0.5)] transition-shadow',
      label: 'block text-sm font-mono text-[#33ff00] mb-1',
    },
    glass: {
      container: 'bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 max-w-md w-full text-white',
      input: 'w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/50',
      button: 'w-full py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors backdrop-blur-sm',
      label: 'block text-sm text-white/70 mb-1',
    },
  };
  const style = variants[variant] || variants.default;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className={`${style.container} ${className}`}>
      <h2 className="text-2xl font-bold mb-6">Sign In</h2>
      <div className="space-y-4">
        <div>
          <label className={style.label}>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className={style.input} />
        </div>
        <div>
          <label className={style.label}>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className={style.input} />
        </div>
        <button type="submit" className={style.button}>Sign In</button>
      </div>
      <p className="mt-4 text-sm text-center opacity-70">Don't have an account? <a href="#" className="underline">Sign up</a></p>
    </form>
  );
};

export const SignupForm: React.FC<{ onSubmit?: (data: any) => void; variant?: string; className?: string }> = ({
  onSubmit,
  variant = 'default',
  className = '',
}) => {
  const [formData, setFormData] = React.useState({ name: '', email: '', password: '', confirmPassword: '' });

  const variants: Record<string, { container: string; input: string; button: string }> = {
    default: {
      container: 'bg-white rounded-lg shadow-lg p-8 max-w-md w-full',
      input: 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500',
      button: 'w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600',
    },
    brutal: {
      container: 'bg-white border-4 border-black shadow-[8px_8px_0_0_#000] p-8 max-w-md w-full',
      input: 'w-full px-4 py-2 border-4 border-black',
      button: 'w-full py-2 bg-blue-500 text-white border-4 border-black shadow-[4px_4px_0_0_#000] font-bold',
    },
    neon: {
      container: 'bg-black border border-[#33ff00] p-8 max-w-md w-full',
      input: 'w-full px-4 py-2 bg-black border border-[#33ff00] text-[#33ff00] font-mono',
      button: 'w-full py-2 bg-[#33ff00] text-black font-mono font-bold',
    },
  };
  const style = variants[variant] || variants.default;

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit?.(formData); }} className={`${style.container} ${className}`}>
      <h2 className="text-2xl font-bold mb-6">Create Account</h2>
      <div className="space-y-4">
        <input placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={style.input} />
        <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={style.input} />
        <input type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className={style.input} />
        <input type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} className={style.input} />
        <button type="submit" className={style.button}>Create Account</button>
      </div>
    </form>
  );
};

export const SearchPanel: React.FC<{ onSearch?: (query: string, filters: Record<string, any>) => void; filters?: { id: string; label: string; options: string[] }[]; variant?: string; className?: string }> = ({
  onSearch,
  filters = [],
  variant = 'default',
  className = '',
}) => {
  const [query, setQuery] = React.useState('');
  const [activeFilters, setActiveFilters] = React.useState<Record<string, string>>({});

  const variants: Record<string, { container: string; input: string; filter: string; button: string }> = {
    default: {
      container: 'bg-white rounded-lg shadow-sm border border-gray-200 p-4',
      input: 'flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500',
      filter: 'px-3 py-1 border border-gray-300 rounded-full text-sm cursor-pointer hover:bg-gray-100',
      button: 'px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600',
    },
    brutal: {
      container: 'bg-white border-4 border-black shadow-[4px_4px_0_0_#000] p-4',
      input: 'flex-1 px-4 py-2 border-4 border-black',
      filter: 'px-3 py-1 border-2 border-black text-sm cursor-pointer hover:bg-yellow-100',
      button: 'px-6 py-2 bg-black text-white border-4 border-black font-bold',
    },
    neon: {
      container: 'bg-black border border-[#33ff00] p-4',
      input: 'flex-1 px-4 py-2 bg-black border border-[#33ff00] text-[#33ff00] font-mono',
      filter: 'px-3 py-1 border border-[#33ff00]/50 text-[#33ff00] text-sm cursor-pointer hover:bg-[#33ff00]/10',
      button: 'px-6 py-2 bg-[#33ff00] text-black font-mono font-bold',
    },
  };
  const style = variants[variant] || variants.default;

  return (
    <div className={`${style.container} ${className}`}>
      <div className="flex gap-2 mb-4">
        <input type="search" placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} className={style.input} />
        <button onClick={() => onSearch?.(query, activeFilters)} className={style.button}>Search</button>
      </div>
      {filters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <select
              key={filter.id}
              value={activeFilters[filter.id] || ''}
              onChange={(e) => setActiveFilters({ ...activeFilters, [filter.id]: e.target.value })}
              className={style.filter}
            >
              <option value="">{filter.label}</option>
              {filter.options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          ))}
        </div>
      )}
    </div>
  );
};

interface SettingItem {
  id: string;
  label: string;
  description?: string;
  type: 'toggle' | 'select' | 'input';
  value?: any;
  options?: string[];
}

export const SettingsPanel: React.FC<{ sections: { title: string; items: SettingItem[] }[]; onChange?: (id: string, value: any) => void; variant?: string; className?: string }> = ({
  sections,
  onChange,
  variant = 'default',
  className = '',
}) => {
  const variants: Record<string, { container: string; section: string; item: string; toggle: string; toggleActive: string }> = {
    default: {
      container: 'bg-white rounded-lg shadow-sm border border-gray-200',
      section: 'p-6 border-b border-gray-200 last:border-b-0',
      item: 'flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0',
      toggle: 'w-11 h-6 bg-gray-200 rounded-full',
      toggleActive: 'bg-blue-500',
    },
    brutal: {
      container: 'bg-white border-4 border-black shadow-[8px_8px_0_0_#000]',
      section: 'p-6 border-b-4 border-black last:border-b-0',
      item: 'flex items-center justify-between py-4 border-b-2 border-black last:border-b-0',
      toggle: 'w-11 h-6 bg-gray-200 border-2 border-black',
      toggleActive: 'bg-yellow-400',
    },
    neon: {
      container: 'bg-black border border-[#33ff00] text-[#33ff00]',
      section: 'p-6 border-b border-[#33ff00]/30 last:border-b-0',
      item: 'flex items-center justify-between py-4 border-b border-[#33ff00]/20 last:border-b-0',
      toggle: 'w-11 h-6 bg-gray-800 border border-[#33ff00]/50',
      toggleActive: 'bg-[#33ff00]',
    },
  };
  const style = variants[variant] || variants.default;

  return (
    <div className={`${style.container} ${className}`}>
      {sections.map((section, i) => (
        <div key={i} className={style.section}>
          <h3 className="font-semibold mb-4">{section.title}</h3>
          {section.items.map((item) => (
            <div key={item.id} className={style.item}>
              <div>
                <p className="font-medium">{item.label}</p>
                {item.description && <p className="text-sm opacity-60">{item.description}</p>}
              </div>
              {item.type === 'toggle' && (
                <button
                  className={`${style.toggle} ${item.value ? style.toggleActive : ''} relative rounded-full transition-colors`}
                  onClick={() => onChange?.(item.id, !item.value)}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${item.value ? 'translate-x-5' : ''}`} />
                </button>
              )}
              {item.type === 'select' && (
                <select
                  value={item.value}
                  onChange={(e) => onChange?.(item.id, e.target.value)}
                  className="px-3 py-1 border border-current/30 rounded bg-transparent"
                >
                  {item.options?.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export const ContactForm: React.FC<{ onSubmit?: (data: any) => void; variant?: string; className?: string }> = ({
  onSubmit,
  variant = 'default',
  className = '',
}) => {
  const [formData, setFormData] = React.useState({ name: '', email: '', subject: '', message: '' });

  const variants: Record<string, { container: string; input: string; textarea: string; button: string }> = {
    default: {
      container: 'bg-white rounded-lg shadow-lg p-8',
      input: 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500',
      textarea: 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none h-32',
      button: 'px-8 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600',
    },
    brutal: {
      container: 'bg-white border-4 border-black shadow-[8px_8px_0_0_#000] p-8',
      input: 'w-full px-4 py-2 border-4 border-black',
      textarea: 'w-full px-4 py-2 border-4 border-black resize-none h-32',
      button: 'px-8 py-2 bg-yellow-400 text-black border-4 border-black shadow-[4px_4px_0_0_#000] font-bold',
    },
    neon: {
      container: 'bg-black border border-[#33ff00] p-8',
      input: 'w-full px-4 py-2 bg-black border border-[#33ff00] text-[#33ff00] font-mono',
      textarea: 'w-full px-4 py-2 bg-black border border-[#33ff00] text-[#33ff00] font-mono resize-none h-32',
      button: 'px-8 py-2 bg-[#33ff00] text-black font-mono font-bold',
    },
  };
  const style = variants[variant] || variants.default;

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit?.(formData); }} className={`${style.container} ${className}`}>
      <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={style.input} />
          <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={style.input} />
        </div>
        <input placeholder="Subject" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className={style.input} />
        <textarea placeholder="Message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className={style.textarea} />
        <button type="submit" className={style.button}>Send Message</button>
      </div>
    </form>
  );
};

export const CheckoutForm: React.FC<{ onSubmit?: (data: any) => void; variant?: string; className?: string }> = ({
  onSubmit: _onSubmit,
  variant = 'default',
  className = '',
}) => {
  const [step, setStep] = React.useState(1);

  const variants: Record<string, { container: string; input: string; button: string; step: string; stepActive: string }> = {
    default: {
      container: 'bg-white rounded-lg shadow-lg p-8',
      input: 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500',
      button: 'px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600',
      step: 'w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm',
      stepActive: 'bg-blue-500 text-white',
    },
    brutal: {
      container: 'bg-white border-4 border-black shadow-[8px_8px_0_0_#000] p-8',
      input: 'w-full px-4 py-2 border-4 border-black',
      button: 'px-6 py-2 bg-yellow-400 text-black border-4 border-black font-bold',
      step: 'w-8 h-8 bg-white border-4 border-black flex items-center justify-center text-sm font-bold',
      stepActive: 'bg-yellow-400',
    },
    neon: {
      container: 'bg-black border border-[#33ff00] p-8 text-[#33ff00]',
      input: 'w-full px-4 py-2 bg-black border border-[#33ff00] text-[#33ff00] font-mono',
      button: 'px-6 py-2 bg-[#33ff00] text-black font-mono font-bold',
      step: 'w-8 h-8 border border-[#33ff00]/50 flex items-center justify-center text-sm font-mono',
      stepActive: 'bg-[#33ff00] text-black',
    },
  };
  const style = variants[variant] || variants.default;

  return (
    <div className={`${style.container} ${className}`}>
      <div className="flex items-center justify-center gap-4 mb-8">
        {[1, 2, 3].map((s) => (
          <React.Fragment key={s}>
            <div className={`${style.step} ${step >= s ? style.stepActive : ''}`}>{s}</div>
            {s < 3 && <div className={`flex-1 h-1 ${step > s ? 'bg-blue-500' : 'bg-gray-200'}`} />}
          </React.Fragment>
        ))}
      </div>
      {step === 1 && (
        <div className="space-y-4">
          <h3 className="font-semibold">Shipping Address</h3>
          <input placeholder="Full Name" className={style.input} />
          <input placeholder="Address" className={style.input} />
          <div className="grid grid-cols-2 gap-4">
            <input placeholder="City" className={style.input} />
            <input placeholder="Zip Code" className={style.input} />
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="space-y-4">
          <h3 className="font-semibold">Payment Details</h3>
          <input placeholder="Card Number" className={style.input} />
          <div className="grid grid-cols-2 gap-4">
            <input placeholder="MM/YY" className={style.input} />
            <input placeholder="CVC" className={style.input} />
          </div>
        </div>
      )}
      {step === 3 && (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">✓</div>
          <h3 className="font-semibold text-xl">Order Complete!</h3>
          <p className="opacity-70 mt-2">Thank you for your purchase.</p>
        </div>
      )}
      <div className="flex justify-between mt-8">
        {step > 1 && step < 3 && <button onClick={() => setStep(step - 1)} className={style.button}>Back</button>}
        {step < 3 && <button onClick={() => setStep(step + 1)} className={`${style.button} ml-auto`}>{step === 2 ? 'Complete Order' : 'Continue'}</button>}
      </div>
    </div>
  );
};

// ============================================
// REGISTRY ENTRIES
// ============================================

const createFormEntry = (id: string, name: string, description: string, tags: string[], component: React.FC<any>, composedOf: string[] = []): ElementEntry => ({
  id: `org-form-${id}`, name, layer: 'organism', category: 'organisms', description, themeAgnostic: false, composedOf,
  sourceComponents: ['multiple-zones'], extractedFrom: 'src/elements/organisms/forms/index.tsx',
  previewType: 'card', hasInteraction: true, implementation: 'component', component,
  codeSnippet: `<${name.replace(/\s/g, '')} />`, tags: ['form', 'input', 'organism', ...tags],
});

export const formsRegistry: ElementEntry[] = [
  // Login forms
  createFormEntry('login-default', 'Login Form', 'Email/password login form', ['login', 'auth', 'default'], LoginForm, ['input-text', 'btn-primary']),
  createFormEntry('login-brutal', 'Brutal Login', 'Neo-brutal login form', ['login', 'brutal'], LoginForm, ['input-brutal', 'btn-brutal']),
  createFormEntry('login-neon', 'Neon Login', 'Terminal-style login', ['login', 'neon'], LoginForm, ['input-neon', 'btn-neon']),
  createFormEntry('login-glass', 'Glass Login', 'Frosted glass login', ['login', 'glass'], LoginForm, ['input-glass', 'surface-glass']),
  // Signup
  createFormEntry('signup-default', 'Signup Form', 'User registration form', ['signup', 'register', 'auth'], SignupForm, ['input-text', 'btn-primary']),
  createFormEntry('signup-brutal', 'Brutal Signup', 'Neo-brutal signup', ['signup', 'brutal'], SignupForm, ['input-brutal']),
  // Search
  createFormEntry('search-panel', 'Search Panel', 'Search with filters', ['search', 'filter'], SearchPanel, ['input-search', 'badge-default']),
  createFormEntry('search-brutal', 'Brutal Search', 'Neo-brutal search panel', ['search', 'brutal'], SearchPanel, ['input-brutal']),
  // Settings
  createFormEntry('settings-default', 'Settings Panel', 'App settings form', ['settings', 'preferences'], SettingsPanel, ['toggle', 'input-select']),
  createFormEntry('settings-brutal', 'Brutal Settings', 'Neo-brutal settings', ['settings', 'brutal'], SettingsPanel, ['toggle']),
  createFormEntry('settings-neon', 'Neon Settings', 'Terminal settings', ['settings', 'neon'], SettingsPanel, ['toggle']),
  // Contact
  createFormEntry('contact-default', 'Contact Form', 'Contact message form', ['contact', 'message'], ContactForm, ['input-text', 'input-textarea', 'btn-primary']),
  createFormEntry('contact-brutal', 'Brutal Contact', 'Neo-brutal contact form', ['contact', 'brutal'], ContactForm, ['input-brutal']),
  // Checkout
  createFormEntry('checkout-default', 'Checkout Form', 'Multi-step checkout', ['checkout', 'payment', 'steps'], CheckoutForm, ['input-text', 'indicator-step']),
  createFormEntry('checkout-brutal', 'Brutal Checkout', 'Neo-brutal checkout', ['checkout', 'brutal'], CheckoutForm, ['input-brutal']),
  createFormEntry('checkout-neon', 'Neon Checkout', 'Terminal checkout', ['checkout', 'neon'], CheckoutForm, ['input-neon']),
];
