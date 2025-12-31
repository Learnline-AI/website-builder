/**
 * Chat API Route
 * Handles Claude AI chat with MCP tool integration
 */

import { Router, type IRouter } from 'express';
import Anthropic from '@anthropic-ai/sdk';
import { asyncHandler } from '../middleware/async-handler.js';
import {
  searchElements,
  getElementById,
  getCategories,
  getElementsByLayer,
  getAllZones,
  getZoneById,
  type ElementMetadata,
} from '@ui-museum/mcp/elements';

const router: IRouter = Router();

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// System prompt for Museum Guide
const SYSTEM_PROMPT = `You are Museum Guide, an AI assistant for the UI Museum - a creative component library featuring 11 themed zones with unique UI components.

Your capabilities:
1. Search and find components by name, description, tags, or zone using the search_elements tool
2. Get detailed information about specific components using get_element tool
3. Browse components by zone using get_zone tool
4. List all zones using list_zones tool
5. Explain how components work and suggest use cases

Available zones:
- arcade-basement: CRT glow, pixel dust, 8-bit nostalgia
- pulp-detective: Sepia, torn paper, typewriter clatter
- hacker-terminal: Green phosphor, matrix rain, command prompts
- mad-science: Bubbling flasks, Tesla coils, experimental chaos
- physics-playground: Clean, satisfying, mechanical precision
- organic-garden: Growth, texture, natural materials
- cosmic-observatory: Deep space, neon accents, glassmorphism
- retro-office: Beige plastic, mechanical keyboards, analog tech
- cinema-stage: Velvet curtains, spotlights, theatrical drama
- geometry-lab: Mathematical precision, impossible structures
- artist-studio: Hand-drawn, sketchy, craft aesthetic

When responding:
- Be concise but helpful
- Use tools to find specific components when asked
- Reference specific component IDs so users can navigate to them
- Offer to show more details or related components`;

// Tool definitions for Claude
const tools: Anthropic.Tool[] = [
  {
    name: 'search_elements',
    description: 'Search for UI components by query string. Searches names, descriptions, and tags.',
    input_schema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Search query (e.g., "neon button", "hover effect", "arcade")',
        },
        limit: {
          type: 'number',
          description: 'Maximum results to return (default: 5)',
        },
      },
      required: [],
    },
  },
  {
    name: 'get_element',
    description: 'Get detailed information about a specific component by ID',
    input_schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'The component ID (e.g., "neon-button", "arcade-progress")',
        },
      },
      required: ['id'],
    },
  },
  {
    name: 'list_zones',
    description: 'List all available themed zones in the UI Museum',
    input_schema: {
      type: 'object',
      properties: {},
      required: [],
    },
  },
  {
    name: 'get_zone',
    description: 'Get information about a specific zone and its components',
    input_schema: {
      type: 'object',
      properties: {
        zoneId: {
          type: 'string',
          description: 'The zone ID (e.g., "arcade-basement", "cosmic-observatory")',
        },
      },
      required: ['zoneId'],
    },
  },
  {
    name: 'get_categories',
    description: 'List all component categories (buttons, cards, inputs, etc.)',
    input_schema: {
      type: 'object',
      properties: {},
      required: [],
    },
  },
];

// Execute tool calls
function executeTool(name: string, input: Record<string, unknown>): unknown {
  switch (name) {
    case 'search_elements': {
      const results = searchElements({
        query: input.query as string | undefined,
        limit: (input.limit as number) || 5,
      });
      return results;
    }
    case 'get_element': {
      return getElementById(input.id as string);
    }
    case 'list_zones': {
      return getAllZones();
    }
    case 'get_zone': {
      return getZoneById(input.zoneId as string);
    }
    case 'get_categories': {
      return getCategories();
    }
    default:
      return { error: `Unknown tool: ${name}` };
  }
}

// Message type for conversation history
interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

/**
 * POST /api/chat
 * Send a message to Claude and get a response
 */
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { message, history = [] } = req.body as {
      message: string;
      history?: ChatMessage[];
    };

    if (!message) {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    // Check for API key
    if (!process.env.ANTHROPIC_API_KEY) {
      // Fallback to local response if no API key
      const localResponse = generateLocalResponse(message);
      res.json(localResponse);
      return;
    }

    try {
      // Build messages array for Claude
      const messages: Anthropic.MessageParam[] = [
        ...history.map((msg) => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.content,
        })),
        { role: 'user', content: message },
      ];

      // Initial Claude request
      let response = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        tools,
        messages,
      });

      // Handle tool use loop
      const toolResults: Array<{ id: string; name: string; result: unknown }> = [];

      while (response.stop_reason === 'tool_use') {
        const toolUseBlocks = response.content.filter(
          (block): block is Anthropic.ToolUseBlock => block.type === 'tool_use'
        );

        // Execute all tool calls
        const toolResultContents: Anthropic.ToolResultBlockParam[] = [];

        for (const toolUse of toolUseBlocks) {
          const result = executeTool(toolUse.name, toolUse.input as Record<string, unknown>);
          toolResults.push({ id: toolUse.id, name: toolUse.name, result });
          toolResultContents.push({
            type: 'tool_result',
            tool_use_id: toolUse.id,
            content: JSON.stringify(result),
          });
        }

        // Continue conversation with tool results
        response = await anthropic.messages.create({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1024,
          system: SYSTEM_PROMPT,
          tools,
          messages: [
            ...messages,
            { role: 'assistant', content: response.content },
            { role: 'user', content: toolResultContents },
          ],
        });
      }

      // Extract text response
      const textContent = response.content.find(
        (block): block is Anthropic.TextBlock => block.type === 'text'
      );

      // Extract components from tool results
      const components: Array<{
        id: string;
        name: string;
        layer: string;
        category: string;
      }> = [];

      for (const { name, result } of toolResults) {
        if (name === 'search_elements' && Array.isArray(result)) {
          for (const elem of result) {
            components.push({
              id: elem.id,
              name: elem.name,
              layer: elem.zone || elem.layer || 'general',
              category: elem.category || 'general',
            });
          }
        } else if (name === 'get_element' && result && typeof result === 'object' && 'id' in result) {
          const elem = result as { id: string; name: string; zone?: string; category?: string };
          components.push({
            id: elem.id,
            name: elem.name,
            layer: elem.zone || 'general',
            category: elem.category || 'general',
          });
        }
      }

      res.json({
        content: textContent?.text || 'I could not generate a response.',
        components: components.length > 0 ? components : undefined,
        toolsUsed: toolResults.map((t) => t.name),
      });
    } catch (error) {
      console.error('[Chat] Claude API error:', error);

      // Fallback to local response on error
      const localResponse = generateLocalResponse(message);
      res.json({
        ...localResponse,
        fallback: true,
      });
    }
  })
);

/**
 * Local response generator (fallback when no API key)
 */
function generateLocalResponse(query: string): {
  content: string;
  components?: Array<{ id: string; name: string; layer: string; category: string }>;
} {
  const lowerQuery = query.toLowerCase();

  // Zone keywords
  const zoneKeywords: Record<string, string[]> = {
    'arcade-basement': ['arcade', 'retro', 'game', '8-bit', 'pixel', 'crt', 'neon'],
    'pulp-detective': ['pulp', 'detective', 'noir', 'sepia', 'typewriter', 'vintage'],
    'hacker-terminal': ['hacker', 'terminal', 'matrix', 'code', 'command', 'green'],
    'mad-science': ['science', 'lab', 'experiment', 'tesla', 'chemical', 'bubbling'],
    'physics-playground': ['physics', 'motion', 'spring', 'bounce', 'gravity', 'pendulum'],
    'organic-garden': ['organic', 'natural', 'growth', 'plant', 'texture', 'leaf'],
    'cosmic-observatory': ['cosmic', 'space', 'stars', 'galaxy', 'glass', 'aurora'],
    'retro-office': ['retro', 'office', '90s', 'beige', 'mechanical', 'keyboard'],
    'cinema-stage': ['cinema', 'theater', 'spotlight', 'curtain', 'dramatic', 'film'],
    'geometry-lab': ['geometry', 'math', 'shape', 'pattern', 'blueprint', 'grid'],
    'artist-studio': ['artist', 'sketch', 'hand-drawn', 'craft', 'creative', 'pencil'],
  };

  // Check for zone match
  for (const [zoneId, keywords] of Object.entries(zoneKeywords)) {
    if (keywords.some((kw) => lowerQuery.includes(kw))) {
      const zone = getZoneById(zoneId);
      if (zone) {
        const elements = searchElements({ query: zoneId.split('-')[0], limit: 3 });
        return {
          content: `The **${zone.name}** zone features ${zone.description}. Here are some components from this zone:`,
          components: elements.map((e) => ({
            id: e.id,
            name: e.name,
            layer: e.layer,
            category: e.category || 'general',
          })),
        };
      }
    }
  }

  // Category search
  const categories = ['button', 'card', 'input', 'progress', 'navigation', 'widget', 'form'];
  for (const category of categories) {
    if (lowerQuery.includes(category)) {
      const elements = searchElements({ query: category, limit: 5 });
      if (elements.length > 0) {
        return {
          content: `Here are some ${category} components I found:`,
          components: elements.map((e) => ({
            id: e.id,
            name: e.name,
            layer: e.layer,
            category: e.category || category,
          })),
        };
      }
    }
  }

  // General search
  const elements = searchElements({ query, limit: 5 });
  if (elements.length > 0) {
    return {
      content: `I found ${elements.length} component${elements.length > 1 ? 's' : ''} matching your query:`,
      components: elements.map((e) => ({
        id: e.id,
        name: e.name,
        layer: e.layer,
        category: e.category || 'general',
      })),
    };
  }

  // Default response
  return {
    content: `I'm here to help you explore the UI Museum! Try asking about:

• **Components**: "Show me neon buttons" or "Find cards with hover effects"
• **Zones**: "What's in the Arcade zone?" or "Show me cosmic components"
• **Categories**: "List all progress indicators" or "Show me input fields"

What would you like to discover?`,
  };
}

export { router as chatRoutes };
