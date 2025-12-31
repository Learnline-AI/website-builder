/**
 * useMCPClient
 *
 * Hook for managing MCP (Model Context Protocol) connection to Claude.
 * Handles connection lifecycle, message sending, and tool calls.
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import type { ComponentEntry } from '../../../data/registry';

// ============================================================================
// TYPES
// ============================================================================

export interface MCPConfig {
  endpoint?: string;
  apiKey?: string;
  model?: string;
}

export interface MCPMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface MCPToolCall {
  name: string;
  input: Record<string, unknown>;
}

export interface MCPResponse {
  content: string;
  toolCalls?: MCPToolCall[];
  components?: ComponentEntry[];
  codeBlocks?: Array<{
    language: string;
    code: string;
    filename?: string;
  }>;
}

interface MCPState {
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
}

// ============================================================================
// SYSTEM PROMPT (reserved for future MCP API integration)
// ============================================================================

export const MCP_SYSTEM_PROMPT = `You are Museum Guide, an AI assistant for the UI Museum - a creative component library featuring 11 themed zones with unique UI components.

Your capabilities:
1. Search and find components by name, description, tags, or zone
2. Explain how components work and their use cases
3. Provide code snippets for implementing components
4. Navigate users to specific components or zones

Available zones:
- Arcade Basement: CRT glow, pixel dust, 8-bit nostalgia
- Pulp Detective: Sepia, torn paper, typewriter clatter
- Hacker Terminal: Green phosphor, matrix rain, command prompts
- Mad Science Lab: Bubbling flasks, Tesla coils, experimental chaos
- Physics Playground: Clean, satisfying, mechanical precision
- Organic Garden: Growth, texture, natural materials
- Cosmic Observatory: Deep space, neon accents, glassmorphism
- Retro Office: Beige plastic, mechanical keyboards, analog tech
- Cinema Stage: Velvet curtains, spotlights, theatrical drama
- Geometry Lab: Mathematical precision, impossible structures
- Artist's Studio: Hand-drawn, sketchy, craft aesthetic

When responding:
- Be concise but helpful
- Reference specific components when relevant
- Offer to show code examples when appropriate
- Guide users to explore related components`;

// ============================================================================
// HOOK
// ============================================================================

export function useMCPClient(config: MCPConfig = {}) {
  const [state, setState] = useState<MCPState>({
    isConnected: false,
    isConnecting: false,
    error: null,
  });

  const conversationHistory = useRef<MCPMessage[]>([]);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Connect to MCP server
  const connect = useCallback(async () => {
    setState(prev => ({ ...prev, isConnecting: true, error: null }));

    try {
      // For now, we'll use a mock connection
      // In production, this would establish a WebSocket or SSE connection
      await new Promise(resolve => setTimeout(resolve, 500));

      setState({
        isConnected: true,
        isConnecting: false,
        error: null,
      });
    } catch (error) {
      setState({
        isConnected: false,
        isConnecting: false,
        error: error instanceof Error ? error.message : 'Connection failed',
      });
    }
  }, []);

  // Disconnect from MCP server
  const disconnect = useCallback(() => {
    abortControllerRef.current?.abort();
    conversationHistory.current = [];
    setState({
      isConnected: false,
      isConnecting: false,
      error: null,
    });
  }, []);

  // Send message and get response
  const sendMessage = useCallback(async (
    content: string,
    components: ComponentEntry[]
  ): Promise<MCPResponse> => {
    // Add user message to history
    conversationHistory.current.push({ role: 'user', content });

    // Create abort controller for this request
    abortControllerRef.current = new AbortController();

    try {
      // For MVP, we'll implement a smart local response
      // In production, this would call the Claude API via MCP
      const response = await generateLocalResponse(content, components);

      // Add assistant response to history
      conversationHistory.current.push({ role: 'assistant', content: response.content });

      return response;
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Request cancelled');
      }
      throw error;
    }
  }, []);

  // Clear conversation history
  const clearHistory = useCallback(() => {
    conversationHistory.current = [];
  }, []);

  // Auto-connect on mount (optional)
  useEffect(() => {
    if (config.endpoint) {
      connect();
    }
    return () => {
      disconnect();
    };
  }, [config.endpoint, connect, disconnect]);

  return {
    ...state,
    connect,
    disconnect,
    sendMessage,
    clearHistory,
    conversationHistory: conversationHistory.current,
  };
}

// ============================================================================
// LOCAL RESPONSE GENERATOR (MVP)
// ============================================================================

async function generateLocalResponse(
  query: string,
  components: ComponentEntry[]
): Promise<MCPResponse> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));

  const lowerQuery = query.toLowerCase();

  // Search for components
  const matchingComponents = components.filter(comp => {
    const searchText = `${comp.name} ${comp.description} ${comp.tags.join(' ')} ${comp.zone}`.toLowerCase();
    return lowerQuery.split(' ').some(word =>
      word.length > 2 && searchText.includes(word)
    );
  });

  // Generate contextual response
  if (matchingComponents.length > 0) {
    const topMatches = matchingComponents.slice(0, 3);
    const zoneNames = [...new Set(topMatches.map(c => c.zone))];

    return {
      content: `I found ${matchingComponents.length} component${matchingComponents.length > 1 ? 's' : ''} matching your query! Here are the top results from ${zoneNames.join(', ')}:`,
      components: topMatches.map(c => ({
        id: c.id,
        name: c.name,
        layer: c.zone,
        category: c.categories[0] || 'general',
      })) as unknown as ComponentEntry[],
    };
  }

  // Zone-specific responses
  const zones = [
    { id: 'arcade-basement', keywords: ['arcade', 'retro', 'game', '8-bit', 'pixel', 'crt'] },
    { id: 'pulp-detective', keywords: ['pulp', 'detective', 'noir', 'sepia', 'typewriter'] },
    { id: 'hacker-terminal', keywords: ['hacker', 'terminal', 'matrix', 'code', 'command'] },
    { id: 'mad-science', keywords: ['science', 'lab', 'experiment', 'tesla', 'chemical'] },
    { id: 'physics-playground', keywords: ['physics', 'motion', 'spring', 'bounce', 'gravity'] },
    { id: 'organic-garden', keywords: ['organic', 'natural', 'growth', 'plant', 'texture'] },
    { id: 'cosmic-observatory', keywords: ['cosmic', 'space', 'stars', 'galaxy', 'neon'] },
    { id: 'retro-office', keywords: ['retro', 'office', '90s', 'vintage', 'mechanical'] },
    { id: 'cinema-stage', keywords: ['cinema', 'theater', 'spotlight', 'curtain', 'dramatic'] },
    { id: 'geometry-lab', keywords: ['geometry', 'math', 'shape', 'pattern', 'blueprint'] },
    { id: 'artist-studio', keywords: ['artist', 'sketch', 'hand-drawn', 'craft', 'creative'] },
  ];

  for (const zone of zones) {
    if (zone.keywords.some(kw => lowerQuery.includes(kw))) {
      const zoneComponents = components.filter(c => c.zone === zone.id).slice(0, 3);
      if (zoneComponents.length > 0) {
        return {
          content: `The ${zone.id.replace('-', ' ')} zone has some great components! Here are a few:`,
          components: zoneComponents.map(c => ({
            id: c.id,
            name: c.name,
            layer: c.zone,
            category: c.categories[0] || 'general',
          })) as unknown as ComponentEntry[],
        };
      }
    }
  }

  // Category-specific responses
  const categories = ['buttons', 'cards', 'inputs', 'progress', 'navigation', 'widgets', 'toys'];
  for (const category of categories) {
    if (lowerQuery.includes(category.replace(/s$/, ''))) {
      const categoryComponents = components
        .filter(c => c.categories.includes(category))
        .slice(0, 3);
      if (categoryComponents.length > 0) {
        return {
          content: `Here are some ${category} I found across different zones:`,
          components: categoryComponents.map(c => ({
            id: c.id,
            name: c.name,
            layer: c.zone,
            category: c.categories[0] || 'general',
          })) as unknown as ComponentEntry[],
        };
      }
    }
  }

  // Default response
  return {
    content: `I'm here to help you explore the UI Museum! You can ask me about:

• Specific components (e.g., "Show me neon buttons")
• Zones (e.g., "What's in the Arcade Basement?")
• Categories (e.g., "Find all progress indicators")
• Effects (e.g., "Components with hover effects")

What would you like to discover?`,
  };
}

export default useMCPClient;
