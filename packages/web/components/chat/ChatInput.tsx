/**
 * ChatInput
 *
 * Input component for sending chat messages.
 * Supports keyboard shortcuts and disabled state.
 */

import React, { useState, useRef, useEffect } from 'react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled }) => {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-focus input when panel opens
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (trimmed && !disabled) {
      onSend(trimmed);
      setValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="p-4 border-t border-white/10">
      <div className="relative">
        <label htmlFor="chat-input" className="sr-only">Type your message</label>
        <textarea
          id="chat-input"
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about components..."
          disabled={disabled}
          rows={1}
          aria-label="Chat message input"
          aria-describedby="chat-input-hint"
          className={`
            w-full px-4 py-3 pr-12
            bg-white/5 rounded-xl
            text-white text-sm placeholder-white/40
            border border-white/10
            focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50
            resize-none
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          style={{
            maxHeight: '120px',
            minHeight: '44px',
          }}
        />

        <button
          onClick={handleSubmit}
          disabled={disabled || !value.trim()}
          aria-label="Send message"
          className={`
            absolute right-2 bottom-2
            w-8 h-8 rounded-lg
            flex items-center justify-center
            transition-colors
            focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500
            ${value.trim() && !disabled
              ? 'bg-indigo-500 hover:bg-indigo-600 text-white'
              : 'bg-white/10 text-white/30 cursor-not-allowed'
            }
          `}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
          </svg>
        </button>
      </div>

      <p id="chat-input-hint" className="text-xs text-white/30 mt-2 text-center">
        Press Enter to send, Shift+Enter for new line
      </p>
    </div>
  );
};
