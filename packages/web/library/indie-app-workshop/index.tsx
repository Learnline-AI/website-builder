import { useState } from 'react';
import { Check, X, Search, AlertTriangle } from '../shared/icons';

// --- SQUIRCLE BUTTON ---
export const SquircleButton = () => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <div className="h-full flex items-center justify-center gap-3 p-6 bg-slate-50">
      <button
        className="px-5 py-2.5 font-medium text-sm text-white transition-all duration-200"
        style={{
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          borderRadius: '12px',
          boxShadow: isPressed
            ? 'inset 0 2px 4px rgba(0,0,0,0.2)'
            : '0 4px 12px rgba(99, 102, 241, 0.3), 0 2px 4px rgba(0,0,0,0.1)',
          transform: isPressed ? 'translateY(1px)' : 'translateY(0)',
        }}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
      >
        Get Started
      </button>
      <button
        className="px-5 py-2.5 font-medium text-sm transition-all duration-200"
        style={{
          background: '#fff',
          color: '#374151',
          borderRadius: '12px',
          border: '1px solid #e5e7eb',
          boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
        }}
      >
        Learn More
      </button>
    </div>
  );
};

// --- FRIENDLY CARD ---
export const FriendlyCard = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-6 bg-slate-50">
      <div
        className="w-56 p-5 transition-all duration-300"
        style={{
          background: '#fff',
          borderRadius: '16px',
          boxShadow: isHovered
            ? '0 20px 40px rgba(0,0,0,0.1), 0 8px 16px rgba(0,0,0,0.06)'
            : '0 4px 12px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.05)',
          transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="w-10 h-10 rounded-xl mb-3 flex items-center justify-center text-lg" style={{ background: '#fef3c7' }}>
          ✨
        </div>
        <h3 className="font-semibold text-gray-900 text-sm">Magic Automation</h3>
        <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
          Automate your workflow with simple triggers
        </p>
      </div>
    </div>
  );
};

// --- PASTEL BADGE ---
export const PastelBadge = () => {
  return (
    <div className="h-full flex items-center justify-center gap-2 flex-wrap p-6 bg-white">
      <span className="px-3 py-1 text-xs font-medium rounded-full" style={{ background: '#dbeafe', color: '#1d4ed8' }}>
        Design
      </span>
      <span className="px-3 py-1 text-xs font-medium rounded-full" style={{ background: '#dcfce7', color: '#15803d' }}>
        Active
      </span>
      <span className="px-3 py-1 text-xs font-medium rounded-full" style={{ background: '#fef3c7', color: '#b45309' }}>
        Pending
      </span>
      <span className="px-3 py-1 text-xs font-medium rounded-full" style={{ background: '#fce7f3', color: '#be185d' }}>
        Priority
      </span>
      <span className="px-3 py-1 text-xs font-medium rounded-full" style={{ background: '#e0e7ff', color: '#4338ca' }}>
        Beta
      </span>
    </div>
  );
};

// --- SOFT INPUT ---
export const SoftInput = () => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-6 bg-slate-50">
      <div className="w-64">
        <label className="block text-xs font-medium text-gray-600 mb-1.5">Email address</label>
        <div className="relative">
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full px-4 py-2.5 text-sm bg-white outline-none transition-all duration-200"
            style={{
              borderRadius: '10px',
              border: focused ? '2px solid #6366f1' : '2px solid #e5e7eb',
              boxShadow: focused ? '0 0 0 3px rgba(99, 102, 241, 0.15)' : 'none',
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        </div>
      </div>
    </div>
  );
};

// --- CANDY PROGRESS ---
export const CandyProgress = () => {
  const [progress] = useState(65);

  return (
    <div className="h-full flex items-center justify-center p-6 bg-white">
      <div className="w-56">
        <div className="flex justify-between text-xs mb-2">
          <span className="font-medium text-gray-700">Progress</span>
          <span className="text-gray-500">{progress}%</span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: '#f3f4f6' }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #d946ef)',
            }}
          />
        </div>
      </div>
    </div>
  );
};

// --- COZY TOGGLE ---
export const CozyToggle = () => {
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="h-full flex items-center justify-center gap-4 p-6 bg-slate-50">
      <span className="text-sm text-gray-600">Dark Mode</span>
      <button
        className="w-12 h-7 rounded-full relative transition-colors duration-200"
        style={{
          background: enabled ? '#6366f1' : '#e5e7eb',
        }}
        onClick={() => setEnabled(!enabled)}
      >
        <div
          className="w-5 h-5 rounded-full bg-white absolute top-1 transition-all duration-200 flex items-center justify-center shadow-sm"
          style={{
            left: enabled ? 'calc(100% - 24px)' : '4px',
          }}
        >
          {enabled && <Check size={10} className="text-indigo-500" />}
        </div>
      </button>
    </div>
  );
};

// --- BUBBLE LOADER ---
export const BubbleLoader = () => {
  return (
    <div className="h-full flex items-center justify-center p-6 bg-white">
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-3 h-3 rounded-full"
            style={{
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              animation: 'bubbleBounce 0.6s ease-in-out infinite',
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>
      <style>{`
        @keyframes bubbleBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
};

// --- NOTION BLOCK ---
export const NotionBlock = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-6 bg-white">
      <div
        className="w-64 p-3 rounded-md transition-colors duration-150 cursor-pointer"
        style={{ background: isHovered ? '#f7f7f5' : 'transparent' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-start gap-2">
          <span className="text-lg mt-0.5 opacity-70">📝</span>
          <div>
            <p className="text-sm text-gray-800 leading-relaxed">
              Type / for commands
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Press Enter to continue...
            </p>
          </div>
        </div>
        {isHovered && (
          <div className="flex gap-1 mt-2 ml-7">
            <button className="px-2 py-0.5 text-[10px] text-gray-400 hover:bg-gray-200 rounded">⋮⋮</button>
            <button className="px-2 py-0.5 text-[10px] text-gray-400 hover:bg-gray-200 rounded">+</button>
          </div>
        )}
      </div>
    </div>
  );
};

// --- PILL SELECT ---
export const PillSelect = () => {
  const [selected, setSelected] = useState(0);
  const options = ['All', 'Active', 'Completed'];

  return (
    <div className="h-full flex items-center justify-center p-6 bg-slate-50">
      <div className="flex gap-1 p-1 rounded-xl" style={{ background: '#f1f5f9' }}>
        {options.map((option, i) => (
          <button
            key={option}
            className="px-4 py-2 text-xs font-medium rounded-lg transition-all duration-200"
            style={{
              background: selected === i ? '#fff' : 'transparent',
              color: selected === i ? '#1f2937' : '#6b7280',
              boxShadow: selected === i ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
            }}
            onClick={() => setSelected(i)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

// --- TOAST NOTIFICATION ---
export const ToastNotification = () => {
  const [visible, setVisible] = useState(true);

  return (
    <div className="h-full flex items-center justify-center p-6 bg-slate-50">
      {visible ? (
        <div
          className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl shadow-lg"
          style={{ boxShadow: '0 10px 40px rgba(0,0,0,0.12)' }}
        >
          <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: '#dcfce7' }}>
            <Check size={14} className="text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Saved!</p>
            <p className="text-xs text-gray-500">Your changes are saved</p>
          </div>
          <button className="ml-2 p-1 hover:bg-gray-100 rounded" onClick={() => setVisible(false)}>
            <X size={14} className="text-gray-400" />
          </button>
        </div>
      ) : (
        <button
          className="px-4 py-2 text-sm bg-gray-800 text-white rounded-lg"
          onClick={() => setVisible(true)}
        >
          Show Toast
        </button>
      )}
    </div>
  );
};

// --- GRADIENT AVATAR ---
export const GradientAvatar = () => {
  return (
    <div className="h-full flex items-center justify-center gap-3 p-6 bg-white">
      {[
        { gradient: 'linear-gradient(135deg, #f97316, #ec4899)', initials: 'JD' },
        { gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)', initials: 'AK' },
        { gradient: 'linear-gradient(135deg, #14b8a6, #06b6d4)', initials: 'SM' },
      ].map((avatar, i) => (
        <div
          key={i}
          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-semibold shadow-lg"
          style={{
            background: avatar.gradient,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          }}
        >
          {avatar.initials}
        </div>
      ))}
    </div>
  );
};

// --- STICKER EMOJI ---
export const StickerEmoji = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const emojis = ['👍', '❤️', '🎉', '🚀', '💡'];

  return (
    <div className="h-full flex items-center justify-center p-6 bg-white">
      <div className="flex gap-2">
        {emojis.map((emoji, i) => (
          <button
            key={i}
            className="w-10 h-10 text-lg rounded-xl transition-all duration-200 flex items-center justify-center"
            style={{
              background: selected === i ? '#eef2ff' : '#f9fafb',
              transform: selected === i ? 'scale(1.15)' : 'scale(1)',
              boxShadow: selected === i ? '0 4px 12px rgba(99, 102, 241, 0.2)' : 'none',
            }}
            onClick={() => setSelected(selected === i ? null : i)}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
};

// --- TOOLBAR ICONS ---
export const ToolbarIcons = () => {
  const [active, setActive] = useState(0);
  const tools = ['✏️', '🖼️', '📎', '🔗'];

  return (
    <div className="h-full flex items-center justify-center p-6 bg-slate-50">
      <div className="flex gap-1 p-1.5 bg-white rounded-xl shadow-sm border border-gray-100">
        {tools.map((tool, i) => (
          <button
            key={i}
            className="w-9 h-9 text-sm rounded-lg flex items-center justify-center transition-colors duration-150"
            style={{
              background: active === i ? '#f1f5f9' : 'transparent',
            }}
            onClick={() => setActive(i)}
          >
            {tool}
          </button>
        ))}
        <div className="w-px h-6 bg-gray-200 self-center mx-1" />
        <button className="w-9 h-9 text-sm rounded-lg flex items-center justify-center text-gray-400">
          ⋯
        </button>
      </div>
    </div>
  );
};

// --- RAYCAST COMMAND ---
export const RaycastCommand = () => {
  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: 'rgba(0,0,0,0.6)' }}>
      <div
        className="w-72 rounded-xl overflow-hidden"
        style={{
          background: 'rgba(30, 30, 32, 0.95)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 25px 50px rgba(0,0,0,0.4)',
        }}
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
          <Search size={16} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search commands..."
            className="flex-1 bg-transparent text-sm text-white outline-none placeholder-gray-500"
          />
          <kbd className="px-1.5 py-0.5 text-[10px] bg-white/10 text-gray-400 rounded">⌘K</kbd>
        </div>
        <div className="p-2">
          {['Open Project', 'New File', 'Search Docs'].map((cmd, i) => (
            <div
              key={cmd}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors"
              style={{
                background: i === 0 ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
                color: i === 0 ? '#a5b4fc' : '#9ca3af',
              }}
            >
              <span className="text-base">{['📁', '📄', '🔍'][i]}</span>
              <span>{cmd}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- DOTTED DIVIDER ---
export const DottedDivider = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-4 p-6 bg-white">
      <div className="w-48 flex items-center gap-2">
        <div className="flex-1 h-px border-b-2 border-dotted border-gray-200" />
        <span className="text-xs text-gray-400 px-2">OR</span>
        <div className="flex-1 h-px border-b-2 border-dotted border-gray-200" />
      </div>
      <div className="flex items-center gap-2 w-48">
        <div className="w-2 h-2 rounded-full bg-indigo-400" />
        <div className="flex-1 h-0.5 bg-gradient-to-r from-indigo-400 to-transparent" />
      </div>
    </div>
  );
};

// --- LINEAR ISSUE ---
export const LinearIssue = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-6 bg-slate-50">
      <div
        className="w-72 p-4 bg-white rounded-lg transition-all duration-200 cursor-pointer"
        style={{
          border: '1px solid #e5e7eb',
          boxShadow: isHovered ? '0 4px 12px rgba(0,0,0,0.08)' : 'none',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-start gap-3">
          <div className="w-4 h-4 mt-0.5 rounded-full border-2 border-indigo-400" />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 font-mono">ENG-142</span>
              <span className="px-1.5 py-0.5 text-[10px] font-medium rounded" style={{ background: '#dbeafe', color: '#1d4ed8' }}>
                Feature
              </span>
            </div>
            <p className="text-sm text-gray-800 mt-1">Implement dark mode toggle</p>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-5 h-5 rounded-full text-[10px] flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white' }}>
                JD
              </div>
              <span className="text-xs text-gray-400">2 days ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MODERN MODAL ---
export const ModernModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return (
      <div className="h-full flex items-center justify-center p-6 bg-slate-50">
        <button
          className="px-4 py-2 text-sm font-medium text-white rounded-lg"
          style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
          onClick={() => setIsOpen(true)}
        >
          Open Modal
        </button>
      </div>
    );
  }

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: 'rgba(0,0,0,0.3)' }}>
      <div
        className="w-72 bg-white rounded-2xl overflow-hidden"
        style={{ boxShadow: '0 25px 50px rgba(0,0,0,0.2)' }}
      >
        <div className="p-5">
          <div className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-4" style={{ background: '#fef3c7' }}>
            <AlertTriangle size={24} className="text-amber-500" />
          </div>
          <h3 className="text-center font-semibold text-gray-900">Delete Item?</h3>
          <p className="text-center text-sm text-gray-500 mt-2">
            This action cannot be undone.
          </p>
        </div>
        <div className="flex border-t border-gray-100">
          <button
            className="flex-1 py-3 text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
          <div className="w-px bg-gray-100" />
          <button
            className="flex-1 py-3 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

// Export all components
export const indieAppWorkshopComponents = {
  'indie-squircle-button': SquircleButton,
  'indie-friendly-card': FriendlyCard,
  'indie-pastel-badge': PastelBadge,
  'indie-soft-input': SoftInput,
  'indie-candy-progress': CandyProgress,
  'indie-cozy-toggle': CozyToggle,
  'indie-bubble-loader': BubbleLoader,
  'indie-notion-block': NotionBlock,
  'indie-pill-select': PillSelect,
  'indie-toast-notification': ToastNotification,
  'indie-gradient-avatar': GradientAvatar,
  'indie-sticker-emoji': StickerEmoji,
  'indie-toolbar-icons': ToolbarIcons,
  'indie-raycast-command': RaycastCommand,
  'indie-dotted-divider': DottedDivider,
  'indie-linear-issue': LinearIssue,
  'indie-modern-modal': ModernModal,
};
