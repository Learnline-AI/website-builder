// Organism: Feedback
// Complex feedback and modal components
// Can import molecules and atoms

import React from 'react';
import { ElementEntry } from '../../registry';

// ============================================
// FEEDBACK COMPONENTS
// ============================================

interface ModalProps {
  open?: boolean;
  onClose?: () => void;
  title?: string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  variant?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  open = false,
  onClose,
  title,
  children,
  actions,
  variant = 'default',
  size = 'md',
  className = '',
}) => {
  const sizes = { sm: 'max-w-sm', md: 'max-w-md', lg: 'max-w-lg', xl: 'max-w-xl' };

  const variants: Record<string, { overlay: string; panel: string; header: string }> = {
    default: {
      overlay: 'bg-black/50',
      panel: 'bg-white rounded-xl shadow-2xl',
      header: 'border-b border-gray-200',
    },
    brutal: {
      overlay: 'bg-black/50',
      panel: 'bg-white border-4 border-black shadow-[8px_8px_0_0_#000]',
      header: 'border-b-4 border-black',
    },
    neon: {
      overlay: 'bg-black/80',
      panel: 'bg-black border border-[#33ff00] shadow-[0_0_30px_rgba(51,255,0,0.3)] text-[#33ff00]',
      header: 'border-b border-[#33ff00]/30',
    },
    glass: {
      overlay: 'bg-black/30 backdrop-blur-sm',
      panel: 'bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white',
      header: 'border-b border-white/10',
    },
  };
  const style = variants[variant] || variants.default;

  if (!open) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${style.overlay}`} onClick={onClose}>
      <div className={`w-full ${sizes[size]} ${style.panel} ${className}`} onClick={(e) => e.stopPropagation()}>
        {title && (
          <div className={`flex items-center justify-between p-4 ${style.header}`}>
            <h2 className="text-lg font-semibold">{title}</h2>
            <button onClick={onClose} className="p-1 hover:opacity-70">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        <div className="p-4">{children}</div>
        {actions && <div className="flex justify-end gap-2 p-4 border-t border-current/10">{actions}</div>}
      </div>
    </div>
  );
};

export const ConfirmDialog: React.FC<{ open?: boolean; onConfirm?: () => void; onCancel?: () => void; title?: string; message?: string; confirmText?: string; variant?: string }> = ({
  open = false,
  onConfirm,
  onCancel,
  title = 'Confirm Action',
  message = 'Are you sure you want to continue?',
  confirmText = 'Confirm',
  variant = 'default',
}) => {
  const variants: Record<string, { panel: string; confirm: string; cancel: string }> = {
    default: {
      panel: 'bg-white rounded-xl shadow-2xl',
      confirm: 'px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600',
      cancel: 'px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300',
    },
    brutal: {
      panel: 'bg-white border-4 border-black shadow-[8px_8px_0_0_#000]',
      confirm: 'px-4 py-2 bg-red-500 text-white border-4 border-black font-bold',
      cancel: 'px-4 py-2 bg-white border-4 border-black font-bold',
    },
    neon: {
      panel: 'bg-black border border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)] text-red-500',
      confirm: 'px-4 py-2 bg-red-500 text-black font-mono font-bold',
      cancel: 'px-4 py-2 border border-red-500 text-red-500 font-mono',
    },
  };
  const style = variants[variant] || variants.default;

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onCancel}>
      <div className={`w-full max-w-sm p-6 ${style.panel}`} onClick={(e) => e.stopPropagation()}>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="mt-2 opacity-70">{message}</p>
        <div className="flex justify-end gap-2 mt-6">
          <button onClick={onCancel} className={style.cancel}>Cancel</button>
          <button onClick={onConfirm} className={style.confirm}>{confirmText}</button>
        </div>
      </div>
    </div>
  );
};

interface DrawerProps {
  open?: boolean;
  onClose?: () => void;
  position?: 'left' | 'right' | 'top' | 'bottom';
  title?: string;
  children?: React.ReactNode;
  variant?: string;
  className?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  open = false,
  onClose,
  position = 'right',
  title,
  children,
  variant = 'default',
  className = '',
}) => {
  const positions: Record<string, { container: string; panel: string; openClass: string }> = {
    left: { container: 'items-stretch justify-start', panel: 'h-full w-80', openClass: 'translate-x-0' },
    right: { container: 'items-stretch justify-end', panel: 'h-full w-80', openClass: 'translate-x-0' },
    top: { container: 'items-start justify-stretch', panel: 'w-full h-80', openClass: 'translate-y-0' },
    bottom: { container: 'items-end justify-stretch', panel: 'w-full h-80', openClass: 'translate-y-0' },
  };

  const variants: Record<string, string> = {
    default: 'bg-white shadow-2xl',
    dark: 'bg-gray-900 text-white shadow-2xl',
    brutal: 'bg-white border-4 border-black shadow-[8px_8px_0_0_#000]',
    neon: 'bg-black border border-[#33ff00] text-[#33ff00] shadow-[0_0_30px_rgba(51,255,0,0.3)]',
  };

  const pos = positions[position];

  if (!open) return null;

  return (
    <div className={`fixed inset-0 z-50 flex bg-black/50 ${pos.container}`} onClick={onClose}>
      <div className={`${pos.panel} ${variants[variant] || variants.default} ${className}`} onClick={(e) => e.stopPropagation()}>
        {title && (
          <div className="flex items-center justify-between p-4 border-b border-current/10">
            <h2 className="font-semibold">{title}</h2>
            <button onClick={onClose} className="p-1 hover:opacity-70">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        <div className="p-4 overflow-auto flex-1">{children}</div>
      </div>
    </div>
  );
};

interface NotificationItem {
  id: string;
  title: string;
  message?: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  timestamp?: string;
  read?: boolean;
}

export const NotificationCenter: React.FC<{ notifications: NotificationItem[]; onDismiss?: (id: string) => void; onClear?: () => void; variant?: string; className?: string }> = ({
  notifications,
  onDismiss,
  onClear,
  variant = 'default',
  className = '',
}) => {
  const typeColors: Record<string, string> = {
    info: 'bg-blue-500',
    success: 'bg-green-500',
    warning: 'bg-amber-500',
    error: 'bg-red-500',
  };

  const variants: Record<string, { container: string; item: string; unread: string }> = {
    default: {
      container: 'bg-white rounded-lg shadow-xl border border-gray-200 w-80',
      item: 'p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50',
      unread: 'bg-blue-50',
    },
    brutal: {
      container: 'bg-white border-4 border-black shadow-[8px_8px_0_0_#000] w-80',
      item: 'p-4 border-b-2 border-black last:border-b-0 hover:bg-yellow-50',
      unread: 'bg-yellow-100',
    },
    neon: {
      container: 'bg-black border border-[#33ff00] shadow-[0_0_20px_rgba(51,255,0,0.2)] w-80 text-[#33ff00]',
      item: 'p-4 border-b border-[#33ff00]/20 last:border-b-0 hover:bg-[#33ff00]/10',
      unread: 'bg-[#33ff00]/10',
    },
  };
  const style = variants[variant] || variants.default;

  return (
    <div className={`${style.container} ${className}`}>
      <div className="flex items-center justify-between p-4 border-b border-current/10">
        <h3 className="font-semibold">Notifications</h3>
        {notifications.length > 0 && (
          <button onClick={onClear} className="text-sm opacity-70 hover:opacity-100">Clear all</button>
        )}
      </div>
      <div className="max-h-96 overflow-auto">
        {notifications.length === 0 ? (
          <div className="p-8 text-center opacity-50">No notifications</div>
        ) : (
          notifications.map((n) => (
            <div key={n.id} className={`${style.item} ${!n.read ? style.unread : ''}`}>
              <div className="flex gap-3">
                <div className={`w-2 h-2 mt-2 rounded-full ${typeColors[n.type || 'info']}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-medium text-sm">{n.title}</p>
                    <button onClick={() => onDismiss?.(n.id)} className="opacity-50 hover:opacity-100">×</button>
                  </div>
                  {n.message && <p className="text-sm opacity-70 mt-1">{n.message}</p>}
                  {n.timestamp && <p className="text-xs opacity-50 mt-1">{n.timestamp}</p>}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export const ToastContainer: React.FC<{ toasts: { id: string; message: string; type?: string }[]; onDismiss?: (id: string) => void; position?: string; variant?: string }> = ({
  toasts,
  onDismiss,
  position = 'bottom-right',
  variant = 'default',
}) => {
  const positions: Record<string, string> = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
  };

  const typeStyles: Record<string, string> = {
    default: 'bg-gray-900 text-white',
    success: 'bg-green-600 text-white',
    error: 'bg-red-600 text-white',
    warning: 'bg-amber-500 text-white',
  };

  const variants: Record<string, string> = {
    default: 'rounded-lg shadow-lg',
    brutal: 'border-4 border-black shadow-[4px_4px_0_0_#000]',
    neon: 'border border-[#33ff00] shadow-[0_0_20px_rgba(51,255,0,0.3)] text-[#33ff00] bg-black',
  };

  return (
    <div className={`fixed ${positions[position]} z-50 flex flex-col gap-2`}>
      {toasts.map((toast) => (
        <div key={toast.id} className={`flex items-center gap-3 px-4 py-3 ${typeStyles[toast.type || 'default']} ${variants[variant]}`}>
          <span>{toast.message}</span>
          <button onClick={() => onDismiss?.(toast.id)} className="opacity-70 hover:opacity-100">×</button>
        </div>
      ))}
    </div>
  );
};

export const Popover: React.FC<{ trigger: React.ReactNode; content: React.ReactNode; position?: 'top' | 'bottom' | 'left' | 'right'; variant?: string; className?: string }> = ({
  trigger,
  content,
  position = 'bottom',
  variant = 'default',
  className = '',
}) => {
  const [open, setOpen] = React.useState(false);

  const positions: Record<string, string> = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  const variants: Record<string, string> = {
    default: 'bg-white rounded-lg shadow-xl border border-gray-200',
    brutal: 'bg-white border-4 border-black shadow-[4px_4px_0_0_#000]',
    neon: 'bg-black border border-[#33ff00] text-[#33ff00] shadow-[0_0_20px_rgba(51,255,0,0.2)]',
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <div onClick={() => setOpen(!open)}>{trigger}</div>
      {open && (
        <>
          <div className="fixed inset-0" onClick={() => setOpen(false)} />
          <div className={`absolute ${positions[position]} z-50 p-4 min-w-[200px] ${variants[variant]}`}>
            {content}
          </div>
        </>
      )}
    </div>
  );
};

export const DropdownMenu: React.FC<{ trigger: React.ReactNode; items: { label: string; icon?: React.ReactNode; onClick?: () => void; divider?: boolean }[]; variant?: string; className?: string }> = ({
  trigger,
  items,
  variant = 'default',
  className = '',
}) => {
  const [open, setOpen] = React.useState(false);

  const variants: Record<string, { menu: string; item: string; divider: string }> = {
    default: {
      menu: 'bg-white rounded-lg shadow-xl border border-gray-200 py-1 min-w-[180px]',
      item: 'flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-100',
      divider: 'border-t border-gray-200 my-1',
    },
    brutal: {
      menu: 'bg-white border-4 border-black shadow-[4px_4px_0_0_#000] py-1 min-w-[180px]',
      item: 'flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-yellow-100 font-medium',
      divider: 'border-t-2 border-black my-1',
    },
    neon: {
      menu: 'bg-black border border-[#33ff00] shadow-[0_0_20px_rgba(51,255,0,0.2)] py-1 min-w-[180px] text-[#33ff00]',
      item: 'flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-[#33ff00]/10 font-mono',
      divider: 'border-t border-[#33ff00]/30 my-1',
    },
  };
  const style = variants[variant] || variants.default;

  return (
    <div className={`relative inline-block ${className}`}>
      <div onClick={() => setOpen(!open)}>{trigger}</div>
      {open && (
        <>
          <div className="fixed inset-0" onClick={() => setOpen(false)} />
          <div className={`absolute top-full right-0 mt-2 z-50 ${style.menu}`}>
            {items.map((item, i) =>
              item.divider ? (
                <div key={i} className={style.divider} />
              ) : (
                <button key={i} onClick={() => { item.onClick?.(); setOpen(false); }} className={style.item}>
                  {item.icon}
                  {item.label}
                </button>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
};

// ============================================
// REGISTRY ENTRIES
// ============================================

const createFeedbackEntry = (id: string, name: string, description: string, tags: string[], component: React.FC<any>, composedOf: string[] = []): ElementEntry => ({
  id: `org-feedback-${id}`, name, layer: 'organism', category: 'organisms', description, themeAgnostic: false, composedOf,
  sourceComponents: ['multiple-zones'], extractedFrom: 'src/elements/organisms/feedback/index.tsx',
  previewType: 'card', hasInteraction: true, implementation: 'component', component,
  codeSnippet: `<${name.replace(/\s/g, '')} />`, tags: ['feedback', 'overlay', 'organism', ...tags],
});

export const feedbackOrganismRegistry: ElementEntry[] = [
  // Modal
  createFeedbackEntry('modal-default', 'Modal', 'Dialog modal overlay', ['modal', 'dialog', 'overlay'], Modal, ['card-elevated', 'btn-ghost']),
  createFeedbackEntry('modal-brutal', 'Brutal Modal', 'Neo-brutal modal', ['modal', 'brutal'], Modal, ['card-brutal']),
  createFeedbackEntry('modal-neon', 'Neon Modal', 'Terminal-style modal', ['modal', 'neon'], Modal, ['glow-green']),
  createFeedbackEntry('modal-glass', 'Glass Modal', 'Frosted glass modal', ['modal', 'glass'], Modal, ['surface-glass']),
  // Confirm
  createFeedbackEntry('confirm-default', 'Confirm Dialog', 'Confirmation dialog', ['confirm', 'dialog'], ConfirmDialog, ['btn-danger', 'btn-secondary']),
  createFeedbackEntry('confirm-brutal', 'Brutal Confirm', 'Neo-brutal confirm', ['confirm', 'brutal'], ConfirmDialog, ['btn-brutal']),
  createFeedbackEntry('confirm-neon', 'Neon Confirm', 'Terminal confirm', ['confirm', 'neon'], ConfirmDialog, ['btn-neon']),
  // Drawer
  createFeedbackEntry('drawer-default', 'Drawer', 'Slide-out panel', ['drawer', 'panel', 'slide'], Drawer, ['card-elevated']),
  createFeedbackEntry('drawer-dark', 'Dark Drawer', 'Dark themed drawer', ['drawer', 'dark'], Drawer, []),
  createFeedbackEntry('drawer-brutal', 'Brutal Drawer', 'Neo-brutal drawer', ['drawer', 'brutal'], Drawer, ['border-brutal']),
  createFeedbackEntry('drawer-neon', 'Neon Drawer', 'Terminal drawer', ['drawer', 'neon'], Drawer, ['glow-green']),
  // Notifications
  createFeedbackEntry('notification-center', 'Notification Center', 'Notification list panel', ['notifications', 'list'], NotificationCenter, ['badge-dot', 'card-default']),
  createFeedbackEntry('notification-brutal', 'Brutal Notifications', 'Neo-brutal notifications', ['notifications', 'brutal'], NotificationCenter, ['card-brutal']),
  createFeedbackEntry('toast-container', 'Toast Container', 'Toast notification stack', ['toast', 'stack', 'snackbar'], ToastContainer, ['feedback-toast']),
  // Popover & Dropdown
  createFeedbackEntry('popover-default', 'Popover', 'Click-triggered popover', ['popover', 'popup'], Popover, ['card-elevated']),
  createFeedbackEntry('popover-brutal', 'Brutal Popover', 'Neo-brutal popover', ['popover', 'brutal'], Popover, ['card-brutal']),
  createFeedbackEntry('dropdown-default', 'Dropdown Menu', 'Action dropdown menu', ['dropdown', 'menu', 'actions'], DropdownMenu, ['card-elevated']),
  createFeedbackEntry('dropdown-brutal', 'Brutal Dropdown', 'Neo-brutal dropdown', ['dropdown', 'brutal'], DropdownMenu, ['card-brutal']),
  createFeedbackEntry('dropdown-neon', 'Neon Dropdown', 'Terminal dropdown', ['dropdown', 'neon'], DropdownMenu, ['glow-green']),
];
