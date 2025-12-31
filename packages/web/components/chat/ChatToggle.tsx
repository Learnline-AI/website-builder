/**
 * ChatToggle
 *
 * Floating action button to toggle the chat panel.
 * Fixed position in bottom-right corner.
 */

import React from 'react';
import { useChat } from './ChatProvider';

export const ChatToggle: React.FC = () => {
  const { state, toggle } = useChat();

  return (
    <button
      onClick={toggle}
      className={`
        fixed bottom-6 right-6 z-50
        w-14 h-14 rounded-full
        bg-gradient-to-br from-indigo-500 to-purple-600
        shadow-lg shadow-indigo-500/30
        flex items-center justify-center
        transition-all duration-300 hover:scale-110
        ${state.isOpen ? 'rotate-45' : ''}
      `}
      aria-label={state.isOpen ? 'Close chat' : 'Open chat'}
    >
      {state.isOpen ? (
        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      ) : (
        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
      )}

      {/* Pulse animation when not open */}
      {!state.isOpen && (
        <span className="absolute inset-0 rounded-full bg-indigo-500 animate-ping opacity-20" />
      )}
    </button>
  );
};
