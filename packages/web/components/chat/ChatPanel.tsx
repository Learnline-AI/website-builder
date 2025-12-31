/**
 * ChatPanel
 *
 * Main chat interface panel.
 * Displays message history, suggestions, and input.
 */

import React, { useRef, useEffect } from 'react';
import { useChat } from './ChatProvider';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';

export const ChatPanel: React.FC = () => {
  const { state, sendMessage } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.messages]);

  if (!state.isOpen) return null;

  return (
    <aside
      className={`
        fixed bottom-24 right-6 z-50
        w-[420px] h-[600px] max-h-[80vh]
        bg-neutral-900/95 backdrop-blur-xl
        rounded-2xl border border-white/10
        shadow-2xl shadow-black/50
        flex flex-col overflow-hidden
        animate-in slide-in-from-bottom-4 fade-in duration-300
      `}
      role="complementary"
      aria-label="AI Chat Assistant"
    >
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center" aria-hidden="true">
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <h2 id="chat-panel-title" className="text-sm font-semibold text-white">Museum Guide</h2>
            <p className="text-xs text-white/50" aria-live="polite">
              {state.isConnected ? 'Connected' : 'Powered by Claude'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            aria-label="Chat settings"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
            </svg>
          </button>
        </div>
      </header>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto p-4 space-y-4"
        role="log"
        aria-label="Chat messages"
        aria-live="polite"
      >
        {state.messages.length === 0 ? (
          <ChatWelcome />
        ) : (
          state.messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))
        )}

        {state.isLoading && <ChatTypingIndicator />}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {state.messages.length === 0 && state.suggestions.length > 0 && (
        <nav className="px-4 pb-2" aria-label="Suggested questions">
          <p id="suggestions-label" className="text-xs text-white/40 mb-2">Try asking:</p>
          <div className="flex flex-wrap gap-2" role="list" aria-labelledby="suggestions-label">
            {state.suggestions.slice(0, 3).map((suggestion, i) => (
              <button
                key={i}
                onClick={() => sendMessage(suggestion)}
                role="listitem"
                className="px-3 py-1.5 text-xs bg-white/5 hover:bg-white/10 text-white/70 rounded-full border border-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                aria-label={`Ask: ${suggestion}`}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </nav>
      )}

      {/* Input */}
      <ChatInput onSend={sendMessage} disabled={state.isLoading} />
    </aside>
  );
};

// ============================================================================
// HELPER COMPONENTS
// ============================================================================

const ChatWelcome: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full text-center p-4">
    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center mb-4">
      <svg className="w-8 h-8 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    </div>
    <h3 className="text-lg font-semibold text-white mb-2">
      Welcome to Museum Guide
    </h3>
    <p className="text-white/50 text-sm max-w-xs">
      Ask me about components, get code snippets, or explore the UI Museum collection.
    </p>
  </div>
);

const ChatTypingIndicator: React.FC = () => (
  <div className="flex items-center gap-2 px-4 py-3 bg-white/5 rounded-xl w-fit">
    <div className="flex gap-1">
      <span className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '0ms' }} />
      <span className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '150ms' }} />
      <span className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '300ms' }} />
    </div>
  </div>
);
