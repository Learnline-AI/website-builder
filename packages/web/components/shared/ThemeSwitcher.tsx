import React, { useState, useRef, useEffect } from 'react';
import { useTheme, type ThemeId } from '../../contexts';

// Theme icons for visual identification
const themeIcons: Record<ThemeId, React.ReactElement> = {
  default: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  ),
  dark: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ),
  brutal: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <rect x="3" y="3" width="18" height="18" />
      <line x1="9" y1="3" x2="9" y2="21" />
      <line x1="15" y1="3" x2="15" y2="21" />
    </svg>
  ),
  neon: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  cosmic: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" y1="8" x2="12" y2="8" />
      <line x1="3.95" y1="6.06" x2="8.54" y2="14" />
      <line x1="10.88" y1="21.94" x2="15.46" y2="14" />
    </svg>
  ),
  glass: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="4" opacity="0.5" />
      <rect x="6" y="6" width="12" height="12" rx="2" />
    </svg>
  ),
};

export function ThemeSwitcher() {
  const { theme, setTheme, availableThemes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const currentTheme = availableThemes.find(t => t.id === theme);

  return (
    <div ref={dropdownRef} className="relative">
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={`Theme: ${currentTheme?.name}. Click to change theme.`}
      >
        <span className="text-white/80">
          {themeIcons[theme]}
        </span>
        <span className="hidden sm:inline text-sm text-white/70">
          {currentTheme?.name}
        </span>
        <svg
          className={`w-3 h-3 text-white/50 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-56 py-2 rounded-xl bg-gray-900/95 backdrop-blur-xl border border-white/10 shadow-xl z-50"
          role="listbox"
          aria-label="Select theme"
        >
          <div className="px-3 py-2 text-xs font-semibold text-white/40 uppercase tracking-wider">
            Choose Theme
          </div>
          {availableThemes.map((themeOption) => (
            <button
              key={themeOption.id}
              onClick={() => {
                setTheme(themeOption.id);
                setIsOpen(false);
              }}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors
                focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500
                ${theme === themeOption.id
                  ? 'bg-white/10 text-white'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
                }
              `}
              role="option"
              aria-selected={theme === themeOption.id}
            >
              <span className={`
                flex items-center justify-center w-8 h-8 rounded-lg
                ${theme === themeOption.id ? 'bg-white/20' : 'bg-white/5'}
              `}>
                {themeIcons[themeOption.id]}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{themeOption.name}</span>
                  {themeOption.isDark && (
                    <span className="px-1.5 py-0.5 text-[10px] rounded bg-white/10 text-white/50">
                      Dark
                    </span>
                  )}
                </div>
                <span className="text-xs text-white/40 truncate">
                  {themeOption.description}
                </span>
              </div>
              {theme === themeOption.id && (
                <svg className="w-4 h-4 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
