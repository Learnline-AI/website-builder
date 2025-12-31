/**
 * ChatMessage
 *
 * Individual chat message component.
 * Renders user and assistant messages with proper styling.
 */

import React from 'react';
import type { ChatMessage as ChatMessageType } from './ChatProvider';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div
      className={`
        flex
        ${isUser ? 'justify-end' : 'justify-start'}
      `}
    >
      <div
        className={`
          max-w-[85%] px-4 py-3 rounded-2xl
          ${isUser
            ? 'bg-indigo-500 text-white rounded-br-md'
            : 'bg-white/5 text-white/90 rounded-bl-md border border-white/10'
          }
        `}
      >
        {/* Message content */}
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>

        {/* Component references */}
        {message.components && message.components.length > 0 && (
          <div className="mt-3 pt-3 border-t border-white/10 space-y-2">
            {message.components.map((comp) => (
              <ComponentCard key={comp.id} component={comp} />
            ))}
          </div>
        )}

        {/* Code blocks */}
        {message.codeBlocks && message.codeBlocks.length > 0 && (
          <div className="mt-3 space-y-2">
            {message.codeBlocks.map((block, i) => (
              <CodeBlockCard key={i} block={block} />
            ))}
          </div>
        )}

        {/* Timestamp */}
        <p className={`text-xs mt-2 ${isUser ? 'text-white/60' : 'text-white/40'}`}>
          {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  );
};

// ============================================================================
// HELPER COMPONENTS
// ============================================================================

interface ComponentCardProps {
  component: {
    id: string;
    name: string;
    layer: string;
    category: string;
  };
}

const ComponentCard: React.FC<ComponentCardProps> = ({ component }) => (
  <button
    className="w-full p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors text-left"
  >
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
        <svg className="w-4 h-4 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" />
        </svg>
      </div>
      <div>
        <p className="text-sm font-medium text-white">{component.name}</p>
        <p className="text-xs text-white/50">
          {component.layer} / {component.category}
        </p>
      </div>
    </div>
  </button>
);

interface CodeBlockCardProps {
  block: {
    language: string;
    code: string;
    filename?: string;
  };
}

const CodeBlockCard: React.FC<CodeBlockCardProps> = ({ block }) => (
  <div className="bg-black/30 rounded-lg overflow-hidden border border-white/10">
    <div className="flex items-center justify-between px-3 py-2 bg-white/5 border-b border-white/10">
      <span className="text-xs text-white/50 font-mono">
        {block.filename || block.language}
      </span>
      <button
        onClick={() => navigator.clipboard.writeText(block.code)}
        className="text-xs text-white/50 hover:text-white transition-colors"
      >
        Copy
      </button>
    </div>
    <pre className="p-3 text-xs font-mono text-white/80 overflow-x-auto">
      {block.code}
    </pre>
  </div>
);

// ============================================================================
// UTILS
// ============================================================================

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
