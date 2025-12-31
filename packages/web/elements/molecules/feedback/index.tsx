// Molecule: Feedback
// Tooltips, toasts, and alerts composed of atoms
// Import ATOMS only - no molecules or organisms

import React from 'react';
import { ElementEntry } from '../../registry';

// ============================================
// FEEDBACK STYLE PRESETS
// ============================================

export const feedbackStyles = {
  // Alert base
  alertBase: 'flex items-start gap-3 p-4 rounded-lg',
  // Alert variants
  alertInfo: 'bg-blue-50 text-blue-800 border border-blue-200',
  alertSuccess: 'bg-green-50 text-green-800 border border-green-200',
  alertWarning: 'bg-amber-50 text-amber-800 border border-amber-200',
  alertDanger: 'bg-red-50 text-red-800 border border-red-200',
  alertNeon: 'bg-black text-[#33ff00] border border-[#33ff00] rounded-none',
  alertBrutal: 'bg-white text-black border-4 border-black shadow-[4px_4px_0_0_#000] rounded-none',
  alertGlass: 'bg-white/10 backdrop-blur-md text-white border border-white/20',
  // Toast variants
  toastBase: 'flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg',
  toastDefault: 'bg-gray-900 text-white',
  toastSuccess: 'bg-green-600 text-white',
  toastError: 'bg-red-600 text-white',
  toastNeon: 'bg-black text-[#33ff00] border border-[#33ff00] shadow-[0_0_20px_rgba(51,255,0,0.3)]',
  toastBrutal: 'bg-white text-black border-4 border-black shadow-[4px_4px_0_0_#000] rounded-none',
  // Tooltip variants
  tooltipBase: 'px-2 py-1 text-sm rounded shadow-lg',
  tooltipDefault: 'bg-gray-900 text-white',
  tooltipLight: 'bg-white text-gray-900 border border-gray-200',
  tooltipNeon: 'bg-black text-[#33ff00] border border-[#33ff00]',
  tooltipBrutal: 'bg-white text-black border-2 border-black shadow-[2px_2px_0_0_#000] rounded-none',
};

// ============================================
// FEEDBACK COMPONENTS
// ============================================

interface AlertProps {
  children?: React.ReactNode;
  variant?: string;
  title?: string;
  icon?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  children,
  variant = 'info',
  title,
  icon,
  dismissible = false,
  onDismiss,
  className = '',
}) => {
  const variants: Record<string, string> = {
    info: feedbackStyles.alertInfo,
    success: feedbackStyles.alertSuccess,
    warning: feedbackStyles.alertWarning,
    danger: feedbackStyles.alertDanger,
    neon: feedbackStyles.alertNeon,
    brutal: feedbackStyles.alertBrutal,
    glass: feedbackStyles.alertGlass,
  };

  const icons: Record<string, React.ReactNode> = {
    info: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    success: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    warning: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
    danger: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  };

  return (
    <div className={`${feedbackStyles.alertBase} ${variants[variant] || variants.info} ${className}`}>
      {(icon || icons[variant]) && <span className="flex-shrink-0">{icon || icons[variant]}</span>}
      <div className="flex-1">
        {title && <p className="font-semibold">{title}</p>}
        <div className={title ? 'mt-1 text-sm opacity-90' : ''}>{children}</div>
      </div>
      {dismissible && (
        <button onClick={onDismiss} className="flex-shrink-0 hover:opacity-70">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

export const Toast: React.FC<AlertProps & { position?: string }> = ({
  children,
  variant = 'default',
  icon,
  dismissible = true,
  onDismiss,
  className = '',
}) => {
  const variants: Record<string, string> = {
    default: feedbackStyles.toastDefault,
    success: feedbackStyles.toastSuccess,
    error: feedbackStyles.toastError,
    neon: feedbackStyles.toastNeon,
    brutal: feedbackStyles.toastBrutal,
  };

  return (
    <div className={`${feedbackStyles.toastBase} ${variants[variant] || variants.default} ${className}`}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span className="flex-1">{children}</span>
      {dismissible && (
        <button onClick={onDismiss} className="flex-shrink-0 hover:opacity-70">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

export const Tooltip: React.FC<{ content?: string; variant?: string; position?: 'top' | 'bottom' | 'left' | 'right'; children?: React.ReactNode; className?: string }> = ({
  content = 'Tooltip',
  variant = 'default',
  position = 'top',
  children,
  className = '',
}) => {
  const variants: Record<string, string> = {
    default: feedbackStyles.tooltipDefault,
    light: feedbackStyles.tooltipLight,
    neon: feedbackStyles.tooltipNeon,
    brutal: feedbackStyles.tooltipBrutal,
  };

  const positions: Record<string, string> = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div className={`relative inline-block group ${className}`}>
      {children}
      <div className={`absolute ${positions[position]} ${feedbackStyles.tooltipBase} ${variants[variant] || variants.default} opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50`}>
        {content}
      </div>
    </div>
  );
};

export const Banner: React.FC<AlertProps & { fullWidth?: boolean }> = ({
  children,
  variant = 'info',
  icon,
  dismissible = false,
  onDismiss,
  fullWidth = true,
  className = '',
}) => {
  const variants: Record<string, string> = {
    info: 'bg-blue-600 text-white',
    success: 'bg-green-600 text-white',
    warning: 'bg-amber-500 text-white',
    danger: 'bg-red-600 text-white',
    neon: 'bg-black text-[#33ff00] border-y border-[#33ff00]',
    brutal: 'bg-yellow-400 text-black border-y-4 border-black',
  };

  return (
    <div className={`flex items-center justify-center gap-3 px-4 py-3 ${fullWidth ? 'w-full' : ''} ${variants[variant] || variants.info} ${className}`}>
      {icon && <span>{icon}</span>}
      <span className="text-sm font-medium">{children}</span>
      {dismissible && (
        <button onClick={onDismiss} className="hover:opacity-70">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

export const Callout: React.FC<AlertProps & { accent?: boolean }> = ({
  children,
  variant = 'info',
  title,
  icon,
  accent = true,
  className = '',
}) => {
  const accents: Record<string, string> = {
    info: 'border-l-4 border-l-blue-500',
    success: 'border-l-4 border-l-green-500',
    warning: 'border-l-4 border-l-amber-500',
    danger: 'border-l-4 border-l-red-500',
  };
  const bgs: Record<string, string> = {
    info: 'bg-blue-50',
    success: 'bg-green-50',
    warning: 'bg-amber-50',
    danger: 'bg-red-50',
  };

  return (
    <div className={`p-4 rounded-r-lg ${accent ? accents[variant] : ''} ${bgs[variant] || bgs.info} ${className}`}>
      <div className="flex items-start gap-3">
        {icon && <span className="flex-shrink-0">{icon}</span>}
        <div>
          {title && <p className="font-semibold">{title}</p>}
          <div className={title ? 'mt-1 text-sm' : ''}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export const InlineMessage: React.FC<{ variant?: string; children?: React.ReactNode; className?: string }> = ({
  variant = 'info',
  children,
  className = '',
}) => {
  const variants: Record<string, string> = {
    info: 'text-blue-600',
    success: 'text-green-600',
    warning: 'text-amber-600',
    danger: 'text-red-600',
  };
  const icons: Record<string, React.ReactNode> = {
    info: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    success: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>,
    warning: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01" /></svg>,
    danger: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>,
  };

  return (
    <span className={`inline-flex items-center gap-1.5 text-sm ${variants[variant] || variants.info} ${className}`}>
      {icons[variant]}
      {children}
    </span>
  );
};

export const Notification: React.FC<AlertProps & { avatar?: React.ReactNode; timestamp?: string }> = ({
  children,
  variant = 'default',
  title,
  avatar,
  timestamp,
  dismissible = true,
  onDismiss,
  className = '',
}) => {
  const variants: Record<string, string> = {
    default: 'bg-white border border-gray-200 shadow-lg',
    neon: 'bg-black border border-[#33ff00] text-[#33ff00]',
    brutal: 'bg-white border-4 border-black shadow-[4px_4px_0_0_#000]',
  };

  return (
    <div className={`p-4 rounded-lg max-w-sm ${variants[variant] || variants.default} ${className}`}>
      <div className="flex gap-3">
        {avatar && <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">{avatar}</div>}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              {title && <p className="font-semibold text-sm">{title}</p>}
              <p className="text-sm opacity-70">{children}</p>
            </div>
            {dismissible && (
              <button onClick={onDismiss} className="flex-shrink-0 hover:opacity-70">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          {timestamp && <p className="text-xs opacity-50 mt-1">{timestamp}</p>}
        </div>
      </div>
    </div>
  );
};

export const EmptyState: React.FC<{ icon?: React.ReactNode; title?: string; description?: string; action?: React.ReactNode; variant?: string; className?: string }> = ({
  icon,
  title = 'No data',
  description,
  action,
  variant = 'default',
  className = '',
}) => {
  const variants: Record<string, string> = {
    default: 'text-gray-500',
    neon: 'text-[#33ff00]',
    brutal: 'text-black',
  };

  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 text-center ${variants[variant] || variants.default} ${className}`}>
      {icon && <div className="w-16 h-16 mb-4 opacity-50">{icon}</div>}
      <h3 className="text-lg font-semibold">{title}</h3>
      {description && <p className="mt-2 text-sm opacity-70 max-w-sm">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
};

export const ErrorBoundary: React.FC<{ error?: string; onRetry?: () => void; variant?: string; className?: string }> = ({
  error = 'Something went wrong',
  onRetry,
  variant = 'default',
  className = '',
}) => {
  const variants: Record<string, { bg: string; btn: string }> = {
    default: { bg: 'bg-red-50 text-red-800', btn: 'bg-red-600 text-white hover:bg-red-700' },
    neon: { bg: 'bg-black text-red-500 border border-red-500', btn: 'bg-red-500 text-black hover:bg-red-400' },
    brutal: { bg: 'bg-red-100 border-4 border-black', btn: 'bg-black text-white border-2 border-black' },
  };
  const v = variants[variant] || variants.default;

  return (
    <div className={`p-6 rounded-lg text-center ${v.bg} ${className}`}>
      <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <p className="font-semibold">{error}</p>
      {onRetry && (
        <button onClick={onRetry} className={`mt-4 px-4 py-2 rounded ${v.btn}`}>
          Try Again
        </button>
      )}
    </div>
  );
};

// ============================================
// REGISTRY ENTRIES
// ============================================

const createFeedbackEntry = (id: string, name: string, description: string, tags: string[], component: React.FC<any>, composedOf: string[] = []): ElementEntry => ({
  id: `feedback-${id}`, name, layer: 'molecule', category: 'feedback', description, themeAgnostic: false, composedOf,
  sourceComponents: ['multiple-zones'], extractedFrom: 'src/elements/molecules/feedback/index.tsx',
  previewType: 'inline', hasInteraction: true, implementation: 'component', component,
  codeSnippet: `<${name.replace(/\\s/g, '')} />`, tags: ['feedback', 'message', ...tags],
});

export const feedbackRegistry: ElementEntry[] = [
  // Alerts
  createFeedbackEntry('alert-info', 'Info Alert', 'Informational alert message', ['alert', 'info', 'default'], Alert, ['color-info', 'border-radius-lg']),
  createFeedbackEntry('alert-success', 'Success Alert', 'Success confirmation alert', ['alert', 'success', 'positive'], Alert, ['color-success', 'border-radius-lg']),
  createFeedbackEntry('alert-warning', 'Warning Alert', 'Warning alert message', ['alert', 'warning', 'caution'], Alert, ['color-warning', 'border-radius-lg']),
  createFeedbackEntry('alert-danger', 'Danger Alert', 'Error/danger alert', ['alert', 'danger', 'error'], Alert, ['color-error', 'border-radius-lg']),
  createFeedbackEntry('alert-neon', 'Neon Alert', 'Glowing terminal alert', ['alert', 'neon', 'hacker'], Alert, ['glow-green']),
  createFeedbackEntry('alert-brutal', 'Brutal Alert', 'Neo-brutal alert', ['alert', 'brutal'], Alert, ['shadow-hard-4', 'border-brutal']),
  createFeedbackEntry('alert-glass', 'Glass Alert', 'Frosted glass alert', ['alert', 'glass'], Alert, ['surface-glass']),
  // Toasts
  createFeedbackEntry('toast-default', 'Toast', 'Default toast notification', ['toast', 'notification', 'default'], Toast, ['shadow-lg', 'border-radius-lg']),
  createFeedbackEntry('toast-success', 'Success Toast', 'Success toast notification', ['toast', 'success'], Toast, ['color-success']),
  createFeedbackEntry('toast-error', 'Error Toast', 'Error toast notification', ['toast', 'error'], Toast, ['color-error']),
  createFeedbackEntry('toast-neon', 'Neon Toast', 'Glowing toast', ['toast', 'neon'], Toast, ['glow-green']),
  createFeedbackEntry('toast-brutal', 'Brutal Toast', 'Neo-brutal toast', ['toast', 'brutal'], Toast, ['shadow-hard-4', 'border-brutal']),
  // Tooltips
  createFeedbackEntry('tooltip-default', 'Tooltip', 'Default tooltip', ['tooltip', 'hover', 'default'], Tooltip, ['shadow-lg']),
  createFeedbackEntry('tooltip-light', 'Light Tooltip', 'Light themed tooltip', ['tooltip', 'light'], Tooltip, ['shadow-lg']),
  createFeedbackEntry('tooltip-neon', 'Neon Tooltip', 'Glowing tooltip', ['tooltip', 'neon'], Tooltip, ['glow-green']),
  createFeedbackEntry('tooltip-brutal', 'Brutal Tooltip', 'Neo-brutal tooltip', ['tooltip', 'brutal'], Tooltip, ['shadow-hard-2', 'border-brutal']),
  // Banners
  createFeedbackEntry('banner-info', 'Info Banner', 'Full-width info banner', ['banner', 'info'], Banner, []),
  createFeedbackEntry('banner-neon', 'Neon Banner', 'Glowing banner', ['banner', 'neon'], Banner, ['glow-green']),
  createFeedbackEntry('banner-brutal', 'Brutal Banner', 'Neo-brutal banner', ['banner', 'brutal'], Banner, ['border-brutal']),
  // Callouts
  createFeedbackEntry('callout-info', 'Info Callout', 'Accented callout box', ['callout', 'info'], Callout, ['border-width-thick']),
  createFeedbackEntry('callout-warning', 'Warning Callout', 'Warning callout', ['callout', 'warning'], Callout, ['border-width-thick', 'color-warning']),
  // Messages
  createFeedbackEntry('inline-message', 'Inline Message', 'Inline feedback text', ['inline', 'message', 'text'], InlineMessage, []),
  // Notifications
  createFeedbackEntry('notification-default', 'Notification', 'Rich notification card', ['notification', 'card'], Notification, ['shadow-lg', 'border-radius-lg']),
  createFeedbackEntry('notification-neon', 'Neon Notification', 'Glowing notification', ['notification', 'neon'], Notification, ['glow-green']),
  createFeedbackEntry('notification-brutal', 'Brutal Notification', 'Neo-brutal notification', ['notification', 'brutal'], Notification, ['shadow-hard-4', 'border-brutal']),
  // States
  createFeedbackEntry('empty-state', 'Empty State', 'No data placeholder', ['empty', 'placeholder'], EmptyState, []),
  createFeedbackEntry('error-boundary', 'Error Boundary', 'Error fallback UI', ['error', 'fallback', 'boundary'], ErrorBoundary, ['color-error']),
];
