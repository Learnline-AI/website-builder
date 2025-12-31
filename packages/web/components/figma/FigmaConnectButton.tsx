/**
 * FigmaConnectButton
 *
 * Button component for initiating Figma OAuth connection.
 * Shows "Connect to Figma" when not connected.
 * Shows user avatar and name when connected with a dropdown menu.
 */

import { useState, useRef, useEffect } from 'react';
import { useFigma } from './FigmaProvider';

// ============================================================================
// ICONS
// ============================================================================

const FigmaIcon = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 24C10.2091 24 12 22.2091 12 20V16H8C5.79086 16 4 17.7909 4 20C4 22.2091 5.79086 24 8 24Z"
      fill="#0ACF83"
    />
    <path
      d="M4 12C4 9.79086 5.79086 8 8 8H12V16H8C5.79086 16 4 14.2091 4 12Z"
      fill="#A259FF"
    />
    <path
      d="M4 4C4 1.79086 5.79086 0 8 0H12V8H8C5.79086 8 4 6.20914 4 4Z"
      fill="#F24E1E"
    />
    <path
      d="M12 0H16C18.2091 0 20 1.79086 20 4C20 6.20914 18.2091 8 16 8H12V0Z"
      fill="#FF7262"
    />
    <path
      d="M20 12C20 14.2091 18.2091 16 16 16C13.7909 16 12 14.2091 12 12C12 9.79086 13.7909 8 16 8C18.2091 8 20 9.79086 20 12Z"
      fill="#1ABCFE"
    />
  </svg>
);

const LoadingSpinner = () => (
  <svg
    className="w-5 h-5 animate-spin"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="3"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

const ChevronDownIcon = () => (
  <svg
    className="w-3.5 h-3.5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const DisconnectIcon = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const RefreshIcon = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
  </svg>
);

// ============================================================================
// COMPONENT
// ============================================================================

interface FigmaConnectButtonProps {
  className?: string;
  compact?: boolean;
}

export function FigmaConnectButton({
  className = '',
  compact = false,
}: FigmaConnectButtonProps) {
  const { isConnected, isLoading, user, error, connect, disconnect } = useFigma();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Not connected state
  if (!isConnected) {
    return (
      <button
        onClick={connect}
        disabled={isLoading}
        className={`
          group relative flex items-center gap-2.5 px-4 py-2.5
          bg-gradient-to-r from-gray-800 to-gray-900
          hover:from-gray-700 hover:to-gray-800
          border border-white/10 hover:border-white/20
          rounded-xl
          text-white/90 font-medium text-sm
          transition-all duration-300
          disabled:opacity-50 disabled:cursor-not-allowed
          shadow-lg shadow-black/20
          ${className}
        `}
      >
        {/* Figma gradient accent line */}
        <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[#F24E1E] via-[#A259FF] to-[#1ABCFE] opacity-60 group-hover:opacity-100 transition-opacity rounded-t-xl" />

        {isLoading ? (
          <>
            <LoadingSpinner />
            <span className={compact ? 'sr-only' : ''}>Connecting...</span>
          </>
        ) : (
          <>
            <FigmaIcon />
            <span className={compact ? 'sr-only' : ''}>Connect to Figma</span>
          </>
        )}
      </button>
    );
  }

  // Connected state with dropdown
  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className={`
          group flex items-center gap-2.5 px-3 py-2
          bg-gradient-to-r from-gray-800 to-gray-900
          hover:from-gray-700 hover:to-gray-800
          border border-white/10 hover:border-white/20
          rounded-xl
          text-white/90 text-sm
          transition-all duration-300
          shadow-lg shadow-black/20
        `}
        aria-expanded={isDropdownOpen}
        aria-haspopup="menu"
      >
        {/* Connected indicator */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900" />

        {/* User avatar */}
        {user?.imgUrl ? (
          <img
            src={user.imgUrl}
            alt={user.handle}
            className="w-6 h-6 rounded-full ring-2 ring-white/20"
          />
        ) : (
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold">
            {user?.handle?.charAt(0).toUpperCase() || 'F'}
          </div>
        )}

        {!compact && (
          <>
            <span className="font-medium max-w-[120px] truncate">
              {user?.handle || 'Connected'}
            </span>
            <ChevronDownIcon />
          </>
        )}
      </button>

      {/* Dropdown menu */}
      {isDropdownOpen && (
        <div
          className="
            absolute right-0 mt-2 w-64 py-2
            bg-gray-900/95 backdrop-blur-xl
            border border-white/10
            rounded-xl shadow-2xl shadow-black/40
            z-50
            animate-in fade-in slide-in-from-top-2 duration-200
          "
          role="menu"
        >
          {/* User info header */}
          <div className="px-4 py-3 border-b border-white/5">
            <div className="flex items-center gap-3">
              {user?.imgUrl ? (
                <img
                  src={user.imgUrl}
                  alt={user.handle}
                  className="w-10 h-10 rounded-full ring-2 ring-white/10"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm font-bold">
                  {user?.handle?.charAt(0).toUpperCase() || 'F'}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-white truncate">
                  {user?.handle || 'Figma User'}
                </p>
                <p className="text-xs text-white/50 truncate">
                  {user?.email || 'Connected'}
                </p>
              </div>
              <FigmaIcon />
            </div>
          </div>

          {/* Status */}
          <div className="px-4 py-2 flex items-center gap-2 text-xs">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-green-400">Connected to Figma</span>
          </div>

          {/* Error message if any */}
          {error && (
            <div className="px-4 py-2 text-xs text-red-400 bg-red-500/10 mx-2 rounded-lg">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="px-2 py-2 border-t border-white/5 mt-2">
            <button
              onClick={() => {
                // In production, would refresh the OAuth token
                setIsDropdownOpen(false);
              }}
              className="
                w-full flex items-center gap-3 px-3 py-2
                text-white/70 hover:text-white hover:bg-white/5
                rounded-lg transition-colors text-sm
              "
              role="menuitem"
            >
              <RefreshIcon />
              <span>Refresh Connection</span>
            </button>

            <button
              onClick={() => {
                disconnect();
                setIsDropdownOpen(false);
              }}
              className="
                w-full flex items-center gap-3 px-3 py-2
                text-red-400 hover:text-red-300 hover:bg-red-500/10
                rounded-lg transition-colors text-sm
              "
              role="menuitem"
            >
              <DisconnectIcon />
              <span>Disconnect</span>
            </button>
          </div>

          {/* Footer note */}
          <div className="px-4 py-2 text-[10px] text-white/30 border-t border-white/5 mt-2">
            OAuth integration - Demo mode
          </div>
        </div>
      )}
    </div>
  );
}
