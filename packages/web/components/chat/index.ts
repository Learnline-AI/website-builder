// Chat System - AI-powered assistant for UI Museum
// Toggleable chat panel with MCP integration

export { ChatProvider, useChat } from './ChatProvider';
export type { ChatMessage, ComponentReference, CodeBlock } from './ChatProvider';
export { ChatToggle } from './ChatToggle';
export { ChatPanel } from './ChatPanel';
export { ChatMessage as ChatMessageComponent } from './ChatMessage';
export { ChatInput } from './ChatInput';
export { useMCPClient } from './hooks/useMCPClient';
