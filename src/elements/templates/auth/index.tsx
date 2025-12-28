import React, { useState } from 'react';

// ============================================================================
// AUTH TEMPLATES
// Page-level layouts for authentication and commerce flows
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

// ============================================================================
// LOGIN TEMPLATE
// ============================================================================

const loginVariants = {
  default: {
    container: 'min-h-screen bg-gray-100 flex items-center justify-center',
    card: 'bg-white rounded-xl shadow-xl p-8 w-full max-w-md',
    title: 'text-gray-900',
    subtitle: 'text-gray-500',
    input: 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent',
    label: 'text-gray-700',
    button: 'w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors',
    link: 'text-blue-600 hover:text-blue-700',
    divider: 'text-gray-400',
    social: 'flex-1 border border-gray-300 rounded-lg py-3 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors',
  },
  dark: {
    container: 'min-h-screen bg-gray-950 flex items-center justify-center',
    card: 'bg-gray-900 rounded-xl border border-gray-800 p-8 w-full max-w-md',
    title: 'text-white',
    subtitle: 'text-gray-400',
    input: 'w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent',
    label: 'text-gray-300',
    button: 'w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors',
    link: 'text-blue-400 hover:text-blue-300',
    divider: 'text-gray-600',
    social: 'flex-1 border border-gray-700 rounded-lg py-3 flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors text-white',
  },
  brutal: {
    container: 'min-h-screen bg-yellow-300 flex items-center justify-center',
    card: 'bg-white border-4 border-black shadow-[8px_8px_0_0_#000] p-8 w-full max-w-md',
    title: 'text-black font-black',
    subtitle: 'text-gray-600 font-mono',
    input: 'w-full px-4 py-3 border-4 border-black focus:ring-0 focus:bg-yellow-100',
    label: 'text-black font-bold',
    button: 'w-full bg-black text-white py-3 font-black uppercase hover:bg-yellow-400 hover:text-black border-4 border-black transition-colors',
    link: 'text-black underline hover:bg-yellow-400',
    divider: 'text-black font-bold',
    social: 'flex-1 border-4 border-black py-3 flex items-center justify-center gap-2 hover:bg-yellow-200 transition-colors font-bold',
  },
  neon: {
    container: 'min-h-screen bg-gray-950 flex items-center justify-center',
    card: 'bg-gray-900/80 border border-cyan-500/30 rounded-xl p-8 w-full max-w-md backdrop-blur-xl shadow-[0_0_50px_rgba(0,255,255,0.1)]',
    title: 'text-cyan-400 drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]',
    subtitle: 'text-purple-400',
    input: 'w-full px-4 py-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-cyan-100 focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:shadow-[0_0_20px_rgba(0,255,255,0.3)]',
    label: 'text-cyan-300',
    button: 'w-full bg-cyan-500 text-black py-3 rounded-lg font-semibold hover:bg-cyan-400 transition-colors shadow-[0_0_20px_rgba(0,255,255,0.5)]',
    link: 'text-purple-400 hover:text-purple-300',
    divider: 'text-cyan-500/50',
    social: 'flex-1 border border-purple-500/30 rounded-lg py-3 flex items-center justify-center gap-2 hover:bg-purple-900/30 transition-colors text-purple-300',
  },
  glass: {
    container: 'min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center',
    card: 'bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 w-full max-w-md shadow-2xl',
    title: 'text-white',
    subtitle: 'text-white/60',
    input: 'w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur',
    label: 'text-white/80',
    button: 'w-full bg-white text-purple-700 py-3 rounded-xl font-semibold hover:bg-white/90 transition-colors',
    link: 'text-white/80 hover:text-white',
    divider: 'text-white/40',
    social: 'flex-1 bg-white/10 border border-white/20 rounded-xl py-3 flex items-center justify-center gap-2 hover:bg-white/20 transition-colors text-white backdrop-blur',
  },
};

interface LoginTemplateProps {
  variant?: keyof typeof loginVariants;
}

export const LoginTemplate: React.FC<LoginTemplateProps> = ({ variant = 'default' }) => {
  const styles = loginVariants[variant];
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-xl">A</span>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={`${styles.title} text-2xl font-bold mb-2`}>Welcome back</h1>
          <p className={styles.subtitle}>Sign in to your account to continue</p>
        </div>

        {/* Form */}
        <form className="space-y-5">
          <div>
            <label className={`${styles.label} block text-sm font-medium mb-2`}>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className={styles.input}
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className={`${styles.label} text-sm font-medium`}>Password</label>
              <a className={`${styles.link} text-sm cursor-pointer`}>Forgot password?</a>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className={styles.input}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100"
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="remember" className="w-4 h-4" />
            <label htmlFor="remember" className={`${styles.label} text-sm`}>Remember me</label>
          </div>

          <button type="submit" className={styles.button}>Sign in</button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-current opacity-20" />
          <span className={`${styles.divider} text-sm`}>or continue with</span>
          <div className="flex-1 h-px bg-current opacity-20" />
        </div>

        {/* Social Login */}
        <div className="flex gap-3">
          <button className={styles.social}>
            <span>G</span>
            <span className="hidden sm:inline">Google</span>
          </button>
          <button className={styles.social}>
            <span>🍎</span>
            <span className="hidden sm:inline">Apple</span>
          </button>
          <button className={styles.social}>
            <span>📘</span>
            <span className="hidden sm:inline">Meta</span>
          </button>
        </div>

        {/* Footer */}
        <p className={`${styles.subtitle} text-center mt-8 text-sm`}>
          Don't have an account? <a className={`${styles.link} cursor-pointer font-medium`}>Sign up</a>
        </p>
      </div>
    </div>
  );
};

// ============================================================================
// SIGNUP TEMPLATE
// ============================================================================

const signupVariants = {
  default: {
    container: 'min-h-screen bg-gray-50',
    split: 'bg-blue-600',
    splitText: 'text-white',
    card: 'bg-white',
    title: 'text-gray-900',
    subtitle: 'text-gray-500',
    input: 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent',
    label: 'text-gray-700',
    button: 'w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors',
    link: 'text-blue-600 hover:text-blue-700',
    step: 'bg-gray-200 text-gray-600',
    stepActive: 'bg-blue-600 text-white',
  },
  dark: {
    container: 'min-h-screen bg-gray-950',
    split: 'bg-gray-800',
    splitText: 'text-white',
    card: 'bg-gray-900',
    title: 'text-white',
    subtitle: 'text-gray-400',
    input: 'w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500',
    label: 'text-gray-300',
    button: 'w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors',
    link: 'text-blue-400 hover:text-blue-300',
    step: 'bg-gray-700 text-gray-400',
    stepActive: 'bg-blue-600 text-white',
  },
  brutal: {
    container: 'min-h-screen bg-lime-300',
    split: 'bg-black',
    splitText: 'text-white',
    card: 'bg-white border-4 border-black',
    title: 'text-black font-black',
    subtitle: 'text-gray-600 font-mono',
    input: 'w-full px-4 py-3 border-4 border-black focus:bg-lime-100',
    label: 'text-black font-bold',
    button: 'w-full bg-black text-white py-3 font-black uppercase hover:bg-lime-400 hover:text-black border-4 border-black transition-colors',
    link: 'text-black underline',
    step: 'bg-white text-black border-4 border-black',
    stepActive: 'bg-black text-white border-4 border-black',
  },
  neon: {
    container: 'min-h-screen bg-gray-950',
    split: 'bg-gradient-to-b from-purple-900 to-gray-950',
    splitText: 'text-purple-300',
    card: 'bg-gray-900/80 border border-purple-500/30 backdrop-blur',
    title: 'text-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]',
    subtitle: 'text-cyan-400',
    input: 'w-full px-4 py-3 bg-gray-800/50 border border-purple-500/30 rounded-lg text-purple-100 focus:ring-2 focus:ring-purple-500 focus:shadow-[0_0_20px_rgba(168,85,247,0.3)]',
    label: 'text-purple-300',
    button: 'w-full bg-purple-500 text-white py-3 rounded-lg font-semibold hover:bg-purple-400 transition-colors shadow-[0_0_20px_rgba(168,85,247,0.5)]',
    link: 'text-cyan-400 hover:text-cyan-300',
    step: 'bg-gray-800 text-purple-400/50 border border-purple-500/20',
    stepActive: 'bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]',
  },
  glass: {
    container: 'min-h-screen bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-600',
    split: 'bg-white/10 backdrop-blur-xl',
    splitText: 'text-white',
    card: 'bg-white/10 backdrop-blur-xl border border-white/20',
    title: 'text-white',
    subtitle: 'text-white/60',
    input: 'w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:ring-2 focus:ring-white/50 backdrop-blur',
    label: 'text-white/80',
    button: 'w-full bg-white text-cyan-700 py-3 rounded-xl font-semibold hover:bg-white/90 transition-colors',
    link: 'text-white/80 hover:text-white',
    step: 'bg-white/10 text-white/50 border border-white/20',
    stepActive: 'bg-white text-cyan-700',
  },
};

interface SignupTemplateProps {
  variant?: keyof typeof signupVariants;
}

export const SignupTemplate: React.FC<SignupTemplateProps> = ({ variant = 'default' }) => {
  const styles = signupVariants[variant];
  const [step, setStep] = useState(1);

  const steps = ['Account', 'Profile', 'Preferences'];

  return (
    <div className={`${styles.container} flex`}>
      {/* Left Panel */}
      <div className={`${styles.split} hidden lg:flex w-1/2 p-12 flex-col justify-between`}>
        <div>
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-8">
            <span className="text-white font-bold text-xl">A</span>
          </div>
          <h2 className={`${styles.splitText} text-3xl font-bold mb-4`}>Start your journey</h2>
          <p className={`${styles.splitText} opacity-80`}>
            Create an account to access all features and start building amazing things.
          </p>
        </div>

        {/* Features */}
        <div className="space-y-4">
          {['Free 14-day trial', 'No credit card required', 'Cancel anytime'].map((feature) => (
            <div key={feature} className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-white text-sm">✓</span>
              </div>
              <span className={`${styles.splitText} opacity-90`}>{feature}</span>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div className="bg-white/10 rounded-xl p-6">
          <p className={`${styles.splitText} opacity-90 italic mb-4`}>
            "This platform has transformed how our team works. Highly recommended!"
          </p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20" />
            <div>
              <p className={`${styles.splitText} font-medium`}>Sarah Johnson</p>
              <p className={`${styles.splitText} opacity-60 text-sm`}>CEO, TechCorp</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className={`${styles.card} flex-1 p-8 lg:p-12 flex flex-col justify-center`}>
        <div className="max-w-md mx-auto w-full">
          {/* Steps */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {steps.map((s, i) => (
              <React.Fragment key={s}>
                <button
                  onClick={() => setStep(i + 1)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                    step === i + 1 ? styles.stepActive : step > i + 1 ? styles.stepActive : styles.step
                  }`}
                >
                  {step > i + 1 ? '✓' : i + 1}
                </button>
                {i < steps.length - 1 && (
                  <div className={`w-12 h-0.5 ${step > i + 1 ? 'bg-blue-500' : 'bg-gray-300'}`} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className={`${styles.title} text-2xl font-bold mb-2`}>
              {step === 1 ? 'Create your account' : step === 2 ? 'Complete your profile' : 'Set your preferences'}
            </h1>
            <p className={styles.subtitle}>Step {step} of 3</p>
          </div>

          {/* Form */}
          <form className="space-y-5">
            {step === 1 && (
              <>
                <div>
                  <label className={`${styles.label} block text-sm font-medium mb-2`}>Email</label>
                  <input type="email" placeholder="you@example.com" className={styles.input} />
                </div>
                <div>
                  <label className={`${styles.label} block text-sm font-medium mb-2`}>Password</label>
                  <input type="password" placeholder="••••••••" className={styles.input} />
                </div>
                <div>
                  <label className={`${styles.label} block text-sm font-medium mb-2`}>Confirm Password</label>
                  <input type="password" placeholder="••••••••" className={styles.input} />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`${styles.label} block text-sm font-medium mb-2`}>First Name</label>
                    <input type="text" placeholder="John" className={styles.input} />
                  </div>
                  <div>
                    <label className={`${styles.label} block text-sm font-medium mb-2`}>Last Name</label>
                    <input type="text" placeholder="Doe" className={styles.input} />
                  </div>
                </div>
                <div>
                  <label className={`${styles.label} block text-sm font-medium mb-2`}>Company</label>
                  <input type="text" placeholder="Your company name" className={styles.input} />
                </div>
                <div>
                  <label className={`${styles.label} block text-sm font-medium mb-2`}>Role</label>
                  <select className={styles.input}>
                    <option>Select your role</option>
                    <option>Developer</option>
                    <option>Designer</option>
                    <option>Manager</option>
                    <option>Other</option>
                  </select>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div>
                  <label className={`${styles.label} block text-sm font-medium mb-3`}>How will you use this?</label>
                  {['Personal projects', 'Team collaboration', 'Client work', 'Learning'].map((opt) => (
                    <label key={opt} className="flex items-center gap-3 p-3 border rounded-lg mb-2 cursor-pointer hover:bg-gray-50">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className={styles.label}>{opt}</span>
                    </label>
                  ))}
                </div>
                <div className="flex items-start gap-2">
                  <input type="checkbox" id="terms" className="w-4 h-4 mt-1" />
                  <label htmlFor="terms" className={`${styles.subtitle} text-sm`}>
                    I agree to the <a className={`${styles.link} cursor-pointer`}>Terms of Service</a> and{' '}
                    <a className={`${styles.link} cursor-pointer`}>Privacy Policy</a>
                  </label>
                </div>
              </>
            )}

            <div className="flex gap-3">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className={`flex-1 py-3 rounded-lg font-medium border transition-colors ${styles.step}`}
                >
                  Back
                </button>
              )}
              <button
                type="button"
                onClick={() => step < 3 ? setStep(step + 1) : null}
                className={`${step > 1 ? 'flex-1' : 'w-full'} ${styles.button}`}
              >
                {step === 3 ? 'Create Account' : 'Continue'}
              </button>
            </div>
          </form>

          {/* Footer */}
          <p className={`${styles.subtitle} text-center mt-8 text-sm`}>
            Already have an account? <a className={`${styles.link} cursor-pointer font-medium`}>Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// CHECKOUT TEMPLATE
// ============================================================================

const checkoutVariants = {
  default: {
    container: 'min-h-screen bg-gray-50',
    header: 'bg-white border-b border-gray-200',
    nav: 'text-gray-600',
    card: 'bg-white border border-gray-200 rounded-xl',
    title: 'text-gray-900',
    subtitle: 'text-gray-500',
    input: 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent',
    label: 'text-gray-700',
    button: 'w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors',
    summary: 'bg-gray-50',
    badge: 'bg-green-100 text-green-700',
  },
  dark: {
    container: 'min-h-screen bg-gray-950',
    header: 'bg-gray-900 border-b border-gray-800',
    nav: 'text-gray-400',
    card: 'bg-gray-900 border border-gray-800 rounded-xl',
    title: 'text-white',
    subtitle: 'text-gray-400',
    input: 'w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500',
    label: 'text-gray-300',
    button: 'w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors',
    summary: 'bg-gray-800/50',
    badge: 'bg-green-900 text-green-300',
  },
  brutal: {
    container: 'min-h-screen bg-pink-200',
    header: 'bg-white border-b-4 border-black',
    nav: 'text-black font-mono',
    card: 'bg-white border-4 border-black shadow-[8px_8px_0_0_#000]',
    title: 'text-black font-black',
    subtitle: 'text-gray-600 font-mono',
    input: 'w-full px-4 py-3 border-4 border-black focus:bg-pink-100',
    label: 'text-black font-bold',
    button: 'w-full bg-black text-white py-4 font-black uppercase hover:bg-pink-400 hover:text-black border-4 border-black transition-colors',
    summary: 'bg-yellow-200 border-4 border-black',
    badge: 'bg-green-300 text-black border-2 border-black font-bold',
  },
  neon: {
    container: 'min-h-screen bg-gray-950',
    header: 'bg-black border-b border-green-500/30',
    nav: 'text-green-400',
    card: 'bg-gray-900/80 border border-green-500/30 rounded-xl backdrop-blur',
    title: 'text-green-400 drop-shadow-[0_0_10px_rgba(0,255,0,0.5)]',
    subtitle: 'text-cyan-400',
    input: 'w-full px-4 py-3 bg-gray-800/50 border border-green-500/30 rounded-lg text-green-100 focus:ring-2 focus:ring-green-500 focus:shadow-[0_0_20px_rgba(0,255,0,0.3)]',
    label: 'text-green-300',
    button: 'w-full bg-green-500 text-black py-4 rounded-lg font-semibold hover:bg-green-400 transition-colors shadow-[0_0_20px_rgba(0,255,0,0.5)]',
    summary: 'bg-gray-900/50 border border-cyan-500/30',
    badge: 'bg-green-900/50 text-green-300 border border-green-500/50',
  },
  glass: {
    container: 'min-h-screen bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600',
    header: 'bg-white/10 border-b border-white/20 backdrop-blur-xl',
    nav: 'text-white/70',
    card: 'bg-white/10 border border-white/20 rounded-2xl backdrop-blur-xl',
    title: 'text-white',
    subtitle: 'text-white/60',
    input: 'w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:ring-2 focus:ring-white/50 backdrop-blur',
    label: 'text-white/80',
    button: 'w-full bg-white text-purple-700 py-4 rounded-xl font-semibold hover:bg-white/90 transition-colors',
    summary: 'bg-white/5 border border-white/10 rounded-xl',
    badge: 'bg-green-500/20 text-green-200 border border-green-500/30',
  },
};

interface CheckoutTemplateProps {
  variant?: keyof typeof checkoutVariants;
}

export const CheckoutTemplate: React.FC<CheckoutTemplateProps> = ({ variant = 'default' }) => {
  const styles = checkoutVariants[variant];
  const [paymentMethod, setPaymentMethod] = useState('card');

  const orderItems = [
    { name: 'Pro Annual Plan', price: 199, quantity: 1 },
    { name: 'Extra Storage (100GB)', price: 29, quantity: 1 },
  ];

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={`${styles.header} py-4`}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold">A</span>
          </div>
          <nav className={`${styles.nav} flex items-center gap-2 text-sm`}>
            <span>Cart</span>
            <span>→</span>
            <span className="font-medium">Checkout</span>
            <span>→</span>
            <span className="opacity-50">Confirmation</span>
          </nav>
          <div className={`${styles.badge} px-3 py-1 rounded-full text-sm`}>Secure Checkout</div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="lg:col-span-3 space-y-6">
            {/* Contact */}
            <div className={`${styles.card} p-6`}>
              <h2 className={`${styles.title} text-lg font-semibold mb-4`}>Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <label className={`${styles.label} block text-sm font-medium mb-2`}>Email</label>
                  <input type="email" placeholder="you@example.com" className={styles.input} />
                </div>
                <div>
                  <label className={`${styles.label} block text-sm font-medium mb-2`}>Phone</label>
                  <input type="tel" placeholder="+1 (555) 000-0000" className={styles.input} />
                </div>
              </div>
            </div>

            {/* Billing */}
            <div className={`${styles.card} p-6`}>
              <h2 className={`${styles.title} text-lg font-semibold mb-4`}>Billing Address</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`${styles.label} block text-sm font-medium mb-2`}>First Name</label>
                    <input type="text" placeholder="John" className={styles.input} />
                  </div>
                  <div>
                    <label className={`${styles.label} block text-sm font-medium mb-2`}>Last Name</label>
                    <input type="text" placeholder="Doe" className={styles.input} />
                  </div>
                </div>
                <div>
                  <label className={`${styles.label} block text-sm font-medium mb-2`}>Address</label>
                  <input type="text" placeholder="123 Main Street" className={styles.input} />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className={`${styles.label} block text-sm font-medium mb-2`}>City</label>
                    <input type="text" placeholder="City" className={styles.input} />
                  </div>
                  <div>
                    <label className={`${styles.label} block text-sm font-medium mb-2`}>State</label>
                    <input type="text" placeholder="State" className={styles.input} />
                  </div>
                  <div>
                    <label className={`${styles.label} block text-sm font-medium mb-2`}>ZIP</label>
                    <input type="text" placeholder="12345" className={styles.input} />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className={`${styles.card} p-6`}>
              <h2 className={`${styles.title} text-lg font-semibold mb-4`}>Payment Method</h2>

              {/* Payment Method Selector */}
              <div className="flex gap-3 mb-6">
                {[
                  { id: 'card', label: '💳 Card' },
                  { id: 'paypal', label: '🅿️ PayPal' },
                  { id: 'bank', label: '🏦 Bank' },
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`flex-1 py-3 rounded-lg border-2 transition-all ${
                      paymentMethod === method.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {method.label}
                  </button>
                ))}
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <div>
                    <label className={`${styles.label} block text-sm font-medium mb-2`}>Card Number</label>
                    <input type="text" placeholder="1234 5678 9012 3456" className={styles.input} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={`${styles.label} block text-sm font-medium mb-2`}>Expiry</label>
                      <input type="text" placeholder="MM/YY" className={styles.input} />
                    </div>
                    <div>
                      <label className={`${styles.label} block text-sm font-medium mb-2`}>CVC</label>
                      <input type="text" placeholder="123" className={styles.input} />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'paypal' && (
                <div className={`${styles.summary} p-4 rounded-lg text-center`}>
                  <p className={styles.subtitle}>You will be redirected to PayPal to complete your purchase.</p>
                </div>
              )}

              {paymentMethod === 'bank' && (
                <div className={`${styles.summary} p-4 rounded-lg text-center`}>
                  <p className={styles.subtitle}>Bank transfer details will be provided after order confirmation.</p>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className={`${styles.card} p-6 sticky top-6`}>
              <h2 className={`${styles.title} text-lg font-semibold mb-4`}>Order Summary</h2>

              {/* Items */}
              <div className="space-y-4 mb-6">
                {orderItems.map((item, i) => (
                  <div key={i} className="flex justify-between">
                    <div>
                      <p className={`${styles.title} font-medium`}>{item.name}</p>
                      <p className={`${styles.subtitle} text-sm`}>Qty: {item.quantity}</p>
                    </div>
                    <p className={styles.title}>${item.price}</p>
                  </div>
                ))}
              </div>

              {/* Promo Code */}
              <div className="flex gap-2 mb-6">
                <input type="text" placeholder="Promo code" className={`${styles.input} flex-1`} />
                <button className={`px-4 py-2 border rounded-lg ${styles.subtitle}`}>Apply</button>
              </div>

              {/* Totals */}
              <div className={`${styles.summary} rounded-lg p-4 space-y-2`}>
                <div className="flex justify-between">
                  <span className={styles.subtitle}>Subtotal</span>
                  <span className={styles.title}>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className={styles.subtitle}>Tax (10%)</span>
                  <span className={styles.title}>${tax.toFixed(2)}</span>
                </div>
                <div className="h-px bg-current opacity-10 my-2" />
                <div className="flex justify-between text-lg font-semibold">
                  <span className={styles.title}>Total</span>
                  <span className={styles.title}>${total.toFixed(2)}</span>
                </div>
              </div>

              <button className={`${styles.button} mt-6`}>
                Complete Purchase
              </button>

              <p className={`${styles.subtitle} text-center text-sm mt-4`}>
                🔒 Your payment is secured with SSL encryption
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// PASSWORD RESET TEMPLATE
// ============================================================================

const resetVariants = {
  default: {
    container: 'min-h-screen bg-gray-100 flex items-center justify-center',
    card: 'bg-white rounded-xl shadow-xl p-8 w-full max-w-md text-center',
    icon: 'bg-blue-100 text-blue-600',
    title: 'text-gray-900',
    subtitle: 'text-gray-500',
    input: 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center',
    button: 'w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors',
    link: 'text-blue-600 hover:text-blue-700',
  },
  dark: {
    container: 'min-h-screen bg-gray-950 flex items-center justify-center',
    card: 'bg-gray-900 rounded-xl border border-gray-800 p-8 w-full max-w-md text-center',
    icon: 'bg-blue-900 text-blue-400',
    title: 'text-white',
    subtitle: 'text-gray-400',
    input: 'w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 text-center',
    button: 'w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors',
    link: 'text-blue-400 hover:text-blue-300',
  },
  brutal: {
    container: 'min-h-screen bg-orange-300 flex items-center justify-center',
    card: 'bg-white border-4 border-black shadow-[8px_8px_0_0_#000] p-8 w-full max-w-md text-center',
    icon: 'bg-orange-200 text-black border-4 border-black',
    title: 'text-black font-black',
    subtitle: 'text-gray-600 font-mono',
    input: 'w-full px-4 py-3 border-4 border-black focus:bg-orange-100 text-center',
    button: 'w-full bg-black text-white py-3 font-black uppercase hover:bg-orange-400 hover:text-black border-4 border-black transition-colors',
    link: 'text-black underline',
  },
  neon: {
    container: 'min-h-screen bg-gray-950 flex items-center justify-center',
    card: 'bg-gray-900/80 border border-orange-500/30 rounded-xl p-8 w-full max-w-md text-center backdrop-blur-xl shadow-[0_0_50px_rgba(255,165,0,0.1)]',
    icon: 'bg-orange-900/50 text-orange-400 border border-orange-500/50',
    title: 'text-orange-400 drop-shadow-[0_0_10px_rgba(255,165,0,0.5)]',
    subtitle: 'text-cyan-400',
    input: 'w-full px-4 py-3 bg-gray-800/50 border border-orange-500/30 rounded-lg text-orange-100 focus:ring-2 focus:ring-orange-500 text-center',
    button: 'w-full bg-orange-500 text-black py-3 rounded-lg font-semibold hover:bg-orange-400 transition-colors shadow-[0_0_20px_rgba(255,165,0,0.5)]',
    link: 'text-cyan-400 hover:text-cyan-300',
  },
  glass: {
    container: 'min-h-screen bg-gradient-to-br from-amber-600 via-orange-600 to-red-600 flex items-center justify-center',
    card: 'bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 w-full max-w-md text-center shadow-2xl',
    icon: 'bg-white/20 text-white',
    title: 'text-white',
    subtitle: 'text-white/60',
    input: 'w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:ring-2 focus:ring-white/50 text-center backdrop-blur',
    button: 'w-full bg-white text-orange-700 py-3 rounded-xl font-semibold hover:bg-white/90 transition-colors',
    link: 'text-white/80 hover:text-white',
  },
};

interface PasswordResetTemplateProps {
  variant?: keyof typeof resetVariants;
}

export const PasswordResetTemplate: React.FC<PasswordResetTemplateProps> = ({ variant = 'default' }) => {
  const styles = resetVariants[variant];
  const [step, setStep] = useState<'email' | 'code' | 'newPassword' | 'success'>('email');

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Icon */}
        <div className={`${styles.icon} w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center`}>
          {step === 'success' ? (
            <span className="text-2xl">✓</span>
          ) : (
            <span className="text-2xl">🔐</span>
          )}
        </div>

        {step === 'email' && (
          <>
            <h1 className={`${styles.title} text-2xl font-bold mb-2`}>Forgot password?</h1>
            <p className={`${styles.subtitle} mb-8`}>
              Enter your email and we'll send you a reset code
            </p>
            <form className="space-y-4">
              <input type="email" placeholder="you@example.com" className={styles.input} />
              <button type="button" onClick={() => setStep('code')} className={styles.button}>
                Send Reset Code
              </button>
            </form>
          </>
        )}

        {step === 'code' && (
          <>
            <h1 className={`${styles.title} text-2xl font-bold mb-2`}>Check your email</h1>
            <p className={`${styles.subtitle} mb-8`}>
              We sent a 6-digit code to your email
            </p>
            <form className="space-y-4">
              <div className="flex gap-2 justify-center">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    className={`${styles.input} w-12 h-12 text-center text-xl font-bold`}
                  />
                ))}
              </div>
              <button type="button" onClick={() => setStep('newPassword')} className={styles.button}>
                Verify Code
              </button>
            </form>
            <p className={`${styles.subtitle} text-sm mt-4`}>
              Didn't receive it? <a className={`${styles.link} cursor-pointer`}>Resend code</a>
            </p>
          </>
        )}

        {step === 'newPassword' && (
          <>
            <h1 className={`${styles.title} text-2xl font-bold mb-2`}>Set new password</h1>
            <p className={`${styles.subtitle} mb-8`}>
              Create a strong password for your account
            </p>
            <form className="space-y-4">
              <input type="password" placeholder="New password" className={styles.input} />
              <input type="password" placeholder="Confirm password" className={styles.input} />
              <button type="button" onClick={() => setStep('success')} className={styles.button}>
                Reset Password
              </button>
            </form>
          </>
        )}

        {step === 'success' && (
          <>
            <h1 className={`${styles.title} text-2xl font-bold mb-2`}>Password reset!</h1>
            <p className={`${styles.subtitle} mb-8`}>
              Your password has been successfully updated
            </p>
            <button className={styles.button}>
              Back to Login
            </button>
          </>
        )}

        {step !== 'success' && (
          <p className={`${styles.subtitle} text-sm mt-8`}>
            <a className={`${styles.link} cursor-pointer`}>← Back to login</a>
          </p>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// REGISTRY ENTRIES
// ============================================================================

const createAuthEntry = (
  id: string,
  name: string,
  description: string,
  sections: string[],
  tags: string[],
  component: React.FC<any>,
  composedOf: string[] = []
): TemplateEntry => ({
  id: `tpl-auth-${id}`,
  name,
  layer: 'template',
  category: 'auth',
  description,
  sections,
  composedOf,
  themeAgnostic: false,
  sourceComponents: ['custom'],
  extractedFrom: 'src/elements/templates/auth/index.tsx',
  previewType: 'fullwidth',
  hasInteraction: true,
  implementation: 'component',
  component,
  codeSnippet: `<${name.replace(/\s/g, '')} />`,
  tags: ['template', 'auth', 'page', ...tags],
});

export const authTemplateRegistry: TemplateEntry[] = [
  // Login Template
  createAuthEntry(
    'login',
    'Login Template',
    'User login page with social authentication',
    ['logo', 'form', 'social-login', 'footer'],
    ['login', 'signin', 'authentication', 'form'],
    LoginTemplate,
    ['org-form-login', 'mol-btn-social', 'mol-input-email', 'mol-input-password']
  ),
  createAuthEntry(
    'login-dark',
    'Login Template (Dark)',
    'Dark theme login page',
    ['logo', 'form', 'social-login', 'footer'],
    ['login', 'dark'],
    (props) => <LoginTemplate {...props} variant="dark" />,
    ['org-form-login', 'mol-btn-social']
  ),
  createAuthEntry(
    'login-brutal',
    'Login Template (Brutal)',
    'Neo-brutalist login page',
    ['logo', 'form', 'social-login', 'footer'],
    ['login', 'brutal', 'neo-brutalist'],
    (props) => <LoginTemplate {...props} variant="brutal" />,
    ['org-form-login', 'mol-btn-social']
  ),
  createAuthEntry(
    'login-neon',
    'Login Template (Neon)',
    'Cyberpunk neon login page',
    ['logo', 'form', 'social-login', 'footer'],
    ['login', 'neon', 'cyberpunk'],
    (props) => <LoginTemplate {...props} variant="neon" />,
    ['org-form-login', 'mol-btn-social']
  ),
  createAuthEntry(
    'login-glass',
    'Login Template (Glass)',
    'Glassmorphism login page',
    ['logo', 'form', 'social-login', 'footer'],
    ['login', 'glass', 'glassmorphism'],
    (props) => <LoginTemplate {...props} variant="glass" />,
    ['org-form-login', 'mol-btn-social']
  ),

  // Signup Template
  createAuthEntry(
    'signup',
    'Signup Template',
    'Multi-step registration with split layout',
    ['split-panel', 'steps', 'form', 'testimonial'],
    ['signup', 'register', 'onboarding', 'multi-step'],
    SignupTemplate,
    ['org-form-signup', 'mol-indicator-steps', 'mol-card-testimonial']
  ),
  createAuthEntry(
    'signup-dark',
    'Signup Template (Dark)',
    'Dark theme multi-step registration',
    ['split-panel', 'steps', 'form', 'testimonial'],
    ['signup', 'dark'],
    (props) => <SignupTemplate {...props} variant="dark" />,
    ['org-form-signup', 'mol-indicator-steps']
  ),
  createAuthEntry(
    'signup-brutal',
    'Signup Template (Brutal)',
    'Neo-brutalist multi-step registration',
    ['split-panel', 'steps', 'form', 'testimonial'],
    ['signup', 'brutal', 'neo-brutalist'],
    (props) => <SignupTemplate {...props} variant="brutal" />,
    ['org-form-signup', 'mol-indicator-steps']
  ),
  createAuthEntry(
    'signup-neon',
    'Signup Template (Neon)',
    'Cyberpunk neon multi-step registration',
    ['split-panel', 'steps', 'form', 'testimonial'],
    ['signup', 'neon', 'cyberpunk'],
    (props) => <SignupTemplate {...props} variant="neon" />,
    ['org-form-signup', 'mol-indicator-steps']
  ),

  // Checkout Template
  createAuthEntry(
    'checkout',
    'Checkout Template',
    'E-commerce checkout with order summary',
    ['header', 'contact-form', 'billing-form', 'payment', 'order-summary'],
    ['checkout', 'payment', 'ecommerce', 'cart'],
    CheckoutTemplate,
    ['org-form-checkout', 'org-form-billing', 'mol-card-order', 'mol-input-card']
  ),
  createAuthEntry(
    'checkout-dark',
    'Checkout Template (Dark)',
    'Dark theme checkout page',
    ['header', 'contact-form', 'billing-form', 'payment', 'order-summary'],
    ['checkout', 'dark'],
    (props) => <CheckoutTemplate {...props} variant="dark" />,
    ['org-form-checkout', 'org-form-billing']
  ),
  createAuthEntry(
    'checkout-brutal',
    'Checkout Template (Brutal)',
    'Neo-brutalist checkout page',
    ['header', 'contact-form', 'billing-form', 'payment', 'order-summary'],
    ['checkout', 'brutal', 'neo-brutalist'],
    (props) => <CheckoutTemplate {...props} variant="brutal" />,
    ['org-form-checkout', 'org-form-billing']
  ),
  createAuthEntry(
    'checkout-neon',
    'Checkout Template (Neon)',
    'Cyberpunk neon checkout page',
    ['header', 'contact-form', 'billing-form', 'payment', 'order-summary'],
    ['checkout', 'neon', 'cyberpunk'],
    (props) => <CheckoutTemplate {...props} variant="neon" />,
    ['org-form-checkout', 'org-form-billing']
  ),

  // Password Reset Template
  createAuthEntry(
    'password-reset',
    'Password Reset Template',
    'Multi-step password recovery flow',
    ['icon', 'email-step', 'code-step', 'password-step', 'success'],
    ['password', 'reset', 'recovery', 'forgot'],
    PasswordResetTemplate,
    ['mol-input-email', 'mol-input-code', 'mol-input-password', 'mol-indicator-steps']
  ),
  createAuthEntry(
    'password-reset-dark',
    'Password Reset Template (Dark)',
    'Dark theme password reset flow',
    ['icon', 'email-step', 'code-step', 'password-step', 'success'],
    ['password', 'reset', 'dark'],
    (props) => <PasswordResetTemplate {...props} variant="dark" />,
    ['mol-input-email', 'mol-input-code']
  ),
  createAuthEntry(
    'password-reset-brutal',
    'Password Reset Template (Brutal)',
    'Neo-brutalist password reset flow',
    ['icon', 'email-step', 'code-step', 'password-step', 'success'],
    ['password', 'reset', 'brutal', 'neo-brutalist'],
    (props) => <PasswordResetTemplate {...props} variant="brutal" />,
    ['mol-input-email', 'mol-input-code']
  ),
  createAuthEntry(
    'password-reset-neon',
    'Password Reset Template (Neon)',
    'Cyberpunk neon password reset flow',
    ['icon', 'email-step', 'code-step', 'password-step', 'success'],
    ['password', 'reset', 'neon', 'cyberpunk'],
    (props) => <PasswordResetTemplate {...props} variant="neon" />,
    ['mol-input-email', 'mol-input-code']
  ),
];

