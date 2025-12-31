/**
 * ChatProvider
 *
 * Context provider for chat state management.
 * Handles message history, MCP connection, and UI state.
 */

import { createContext, useContext, useReducer, useCallback, ReactNode, useEffect } from 'react';
import { useMCPClient } from './hooks/useMCPClient';
import { componentRegistry } from '../../data/registry';

// ============================================================================
// TYPES
// ============================================================================

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  components?: ComponentReference[];
  codeBlocks?: CodeBlock[];
}

export interface ComponentReference {
  id: string;
  name: string;
  layer: string;
  category: string;
}

export interface CodeBlock {
  language: string;
  code: string;
  filename?: string;
}

interface ChatState {
  isOpen: boolean;
  messages: ChatMessage[];
  isLoading: boolean;
  isConnected: boolean;
  suggestions: string[];
}

type ChatAction =
  | { type: 'TOGGLE_CHAT' }
  | { type: 'OPEN_CHAT' }
  | { type: 'CLOSE_CHAT' }
  | { type: 'ADD_MESSAGE'; payload: Omit<ChatMessage, 'id' | 'timestamp'> }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_CONNECTED'; payload: boolean }
  | { type: 'SET_SUGGESTIONS'; payload: string[] }
  | { type: 'CLEAR_MESSAGES' };

interface ChatContextType {
  state: ChatState;
  toggle: () => void;
  open: () => void;
  close: () => void;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
}

// ============================================================================
// INITIAL STATE
// ============================================================================

const initialState: ChatState = {
  isOpen: false,
  messages: [],
  isLoading: false,
  isConnected: false,
  suggestions: [
    'Show me neon buttons',
    'Find cards with hover effects',
    'What components are in the Arcade zone?',
    'Show me all navigation components',
  ],
};

// ============================================================================
// REDUCER
// ============================================================================

function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case 'TOGGLE_CHAT':
      return { ...state, isOpen: !state.isOpen };
    case 'OPEN_CHAT':
      return { ...state, isOpen: true };
    case 'CLOSE_CHAT':
      return { ...state, isOpen: false };
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            ...action.payload,
            id: crypto.randomUUID(),
            timestamp: new Date(),
          },
        ],
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_CONNECTED':
      return { ...state, isConnected: action.payload };
    case 'SET_SUGGESTIONS':
      return { ...state, suggestions: action.payload };
    case 'CLEAR_MESSAGES':
      return { ...state, messages: [] };
    default:
      return state;
  }
}

// ============================================================================
// CONTEXT
// ============================================================================

const ChatContext = createContext<ChatContextType | null>(null);

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}

// ============================================================================
// PROVIDER
// ============================================================================

interface ChatProviderProps {
  children: ReactNode;
}

export function ChatProvider({ children }: ChatProviderProps) {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  const mcpClient = useMCPClient();

  // Sync MCP connection state
  useEffect(() => {
    dispatch({ type: 'SET_CONNECTED', payload: mcpClient.isConnected });
  }, [mcpClient.isConnected]);

  const toggle = useCallback(() => {
    dispatch({ type: 'TOGGLE_CHAT' });
  }, []);

  const open = useCallback(() => {
    dispatch({ type: 'OPEN_CHAT' });
  }, []);

  const close = useCallback(() => {
    dispatch({ type: 'CLOSE_CHAT' });
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    // Add user message
    dispatch({
      type: 'ADD_MESSAGE',
      payload: { role: 'user', content },
    });

    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      // Use MCP client to get response
      const response = await mcpClient.sendMessage(content, componentRegistry);

      // Transform component references
      const components = response.components?.map(comp => ({
        id: comp.id,
        name: comp.name,
        layer: (comp as unknown as { layer?: string }).layer || comp.zone,
        category: comp.categories?.[0] || 'general',
      }));

      dispatch({
        type: 'ADD_MESSAGE',
        payload: {
          role: 'assistant',
          content: response.content,
          components,
          codeBlocks: response.codeBlocks,
        },
      });
    } catch (error) {
      dispatch({
        type: 'ADD_MESSAGE',
        payload: {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
        },
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [mcpClient]);

  const clearMessages = useCallback(() => {
    dispatch({ type: 'CLEAR_MESSAGES' });
    mcpClient.clearHistory();
  }, [mcpClient]);

  return (
    <ChatContext.Provider
      value={{
        state,
        toggle,
        open,
        close,
        sendMessage,
        clearMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
