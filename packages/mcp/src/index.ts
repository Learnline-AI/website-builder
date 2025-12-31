#!/usr/bin/env node
// UI Museum MCP Server
// Provides tools for Claude to interact with the UI Museum

import 'dotenv/config';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { ProjectService, RecipeService, ExportService } from '@ui-museum/shared';
import type { RecipeContent } from '@ui-museum/shared/types';
import { z } from 'zod';
import {
  searchElements,
  getElementById,
  getCategories,
  getElementsByLayer,
  getThemeById,
  themes,
  zones,
  getZoneById,
  getAllZones,
  searchZones,
  type ElementLayer,
  type ElementCategory,
} from './elements.js';

// Create MCP server
const server = new Server(
  {
    name: 'ui-museum',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Tool definitions
const tools = [
  {
    name: 'list_projects',
    description: 'List all projects in UI Museum',
    inputSchema: {
      type: 'object' as const,
      properties: {},
      required: [],
    },
  },
  {
    name: 'get_project',
    description: 'Get a project by ID with its recipes',
    inputSchema: {
      type: 'object' as const,
      properties: {
        id: { type: 'string', description: 'The project ID' },
      },
      required: ['id'],
    },
  },
  {
    name: 'create_project',
    description: 'Create a new project',
    inputSchema: {
      type: 'object' as const,
      properties: {
        name: { type: 'string', description: 'Project name' },
        description: { type: 'string', description: 'Project description' },
        slug: { type: 'string', description: 'URL-friendly slug (lowercase, hyphens only)' },
      },
      required: ['name', 'slug'],
    },
  },
  {
    name: 'list_recipes',
    description: 'List all recipes in a project',
    inputSchema: {
      type: 'object' as const,
      properties: {
        projectId: { type: 'string', description: 'The project ID' },
      },
      required: ['projectId'],
    },
  },
  {
    name: 'get_recipe',
    description: 'Get a recipe by ID with its content',
    inputSchema: {
      type: 'object' as const,
      properties: {
        id: { type: 'string', description: 'The recipe ID' },
      },
      required: ['id'],
    },
  },
  {
    name: 'create_recipe',
    description: 'Create a new recipe (page) in a project',
    inputSchema: {
      type: 'object' as const,
      properties: {
        projectId: { type: 'string', description: 'The project ID' },
        name: { type: 'string', description: 'Recipe name' },
        description: { type: 'string', description: 'Recipe description' },
        slug: { type: 'string', description: 'URL-friendly slug' },
        content: {
          type: 'object',
          description: 'Recipe content JSON with root and content array',
          properties: {
            root: { type: 'object' },
            content: { type: 'array' },
          },
        },
      },
      required: ['projectId', 'name', 'slug'],
    },
  },
  {
    name: 'update_recipe',
    description: 'Update an existing recipe',
    inputSchema: {
      type: 'object' as const,
      properties: {
        id: { type: 'string', description: 'The recipe ID' },
        name: { type: 'string', description: 'New name' },
        description: { type: 'string', description: 'New description' },
        content: { type: 'object', description: 'New content JSON' },
      },
      required: ['id'],
    },
  },
  {
    name: 'delete_recipe',
    description: 'Delete a recipe',
    inputSchema: {
      type: 'object' as const,
      properties: {
        id: { type: 'string', description: 'The recipe ID' },
      },
      required: ['id'],
    },
  },
  // ============================================
  // ELEMENT TOOLS
  // ============================================
  {
    name: 'search_elements',
    description: 'Search UI elements by query, layer, category, or tags. Returns element metadata for use in recipes.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        query: { type: 'string', description: 'Search query (matches name, description, tags)' },
        layer: {
          type: 'string',
          description: 'Filter by atomic design layer',
          enum: ['atom', 'molecule', 'organism', 'template'],
        },
        category: {
          type: 'string',
          description: 'Filter by category (e.g., buttons, cards, layout)',
        },
        tags: {
          type: 'array',
          items: { type: 'string' },
          description: 'Filter by tags (e.g., ["hero", "landing"])',
        },
        limit: { type: 'number', description: 'Maximum number of results (default: 20)' },
      },
      required: [],
    },
  },
  {
    name: 'get_element',
    description: 'Get detailed information about a specific UI element by ID',
    inputSchema: {
      type: 'object' as const,
      properties: {
        id: { type: 'string', description: 'The element ID (e.g., "hero-centered", "btn-primary")' },
      },
      required: ['id'],
    },
  },
  {
    name: 'list_categories',
    description: 'List all available element categories with counts and their atomic design layer',
    inputSchema: {
      type: 'object' as const,
      properties: {},
      required: [],
    },
  },
  {
    name: 'get_elements_by_layer',
    description: 'Get all elements in a specific atomic design layer',
    inputSchema: {
      type: 'object' as const,
      properties: {
        layer: {
          type: 'string',
          description: 'The atomic design layer',
          enum: ['atom', 'molecule', 'organism', 'template'],
        },
      },
      required: ['layer'],
    },
  },
  // ============================================
  // THEME TOOLS
  // ============================================
  {
    name: 'list_themes',
    description: 'List all available themes with their color schemes',
    inputSchema: {
      type: 'object' as const,
      properties: {},
      required: [],
    },
  },
  {
    name: 'get_theme',
    description: 'Get detailed information about a specific theme',
    inputSchema: {
      type: 'object' as const,
      properties: {
        id: { type: 'string', description: 'The theme ID (e.g., "default", "dark", "brutal", "neon")' },
      },
      required: ['id'],
    },
  },
  // ============================================
  // ZONE TOOLS
  // ============================================
  {
    name: 'list_zones',
    description: 'List all available themed zones with their aesthetics and color schemes',
    inputSchema: {
      type: 'object' as const,
      properties: {
        query: { type: 'string', description: 'Optional search query to filter zones' },
      },
      required: [],
    },
  },
  {
    name: 'get_zone',
    description: 'Get detailed information about a specific zone including aesthetics, colors, and component count',
    inputSchema: {
      type: 'object' as const,
      properties: {
        id: { type: 'string', description: 'The zone ID (e.g., "arcade", "cosmic", "hacker", "physics")' },
      },
      required: ['id'],
    },
  },
  {
    name: 'get_zone_components',
    description: 'Get all components that belong to a specific zone aesthetic',
    inputSchema: {
      type: 'object' as const,
      properties: {
        zoneId: { type: 'string', description: 'The zone ID to get components for' },
        layer: {
          type: 'string',
          description: 'Optional filter by atomic design layer',
          enum: ['atom', 'molecule', 'organism', 'template'],
        },
        limit: { type: 'number', description: 'Maximum number of results (default: 20)' },
      },
      required: ['zoneId'],
    },
  },
  {
    name: 'suggest_components',
    description: 'Get component suggestions based on a description of what you want to build',
    inputSchema: {
      type: 'object' as const,
      properties: {
        description: { type: 'string', description: 'Description of what you want to build (e.g., "landing page with pricing")' },
        aesthetic: { type: 'string', description: 'Optional aesthetic preference (e.g., "dark", "neon", "minimal")' },
        limit: { type: 'number', description: 'Maximum suggestions (default: 10)' },
      },
      required: ['description'],
    },
  },
  // ============================================
  // EXPORT TOOLS
  // ============================================
  {
    name: 'export_recipe',
    description: 'Export a recipe as code. Supports React + Tailwind (Vite), HTML + CSS (static), or Next.js App Router. Returns a list of files that make up a complete runnable project.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        recipeId: { type: 'string', description: 'The recipe ID to export' },
        format: {
          type: 'string',
          description: 'Export format',
          enum: ['react-tailwind', 'html-css', 'next-app'],
          default: 'react-tailwind',
        },
        theme: {
          type: 'string',
          description: 'Theme to use (default, dark, brutal, neon, cosmic, glass)',
          default: 'default',
        },
        includeTheme: {
          type: 'boolean',
          description: 'Whether to include theme CSS in export',
          default: true,
        },
      },
      required: ['recipeId'],
    },
  },
  {
    name: 'list_export_formats',
    description: 'List available export formats and themes',
    inputSchema: {
      type: 'object' as const,
      properties: {},
      required: [],
    },
  },
];

// Handle tool listing
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'list_projects': {
        const projects = await ProjectService.findAll();
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(projects, null, 2),
            },
          ],
        };
      }

      case 'get_project': {
        const { id } = z.object({ id: z.string() }).parse(args);
        const project = await ProjectService.findById(id);
        if (!project) {
          return {
            content: [{ type: 'text', text: 'Project not found' }],
            isError: true,
          };
        }
        return {
          content: [{ type: 'text', text: JSON.stringify(project, null, 2) }],
        };
      }

      case 'create_project': {
        const input = z.object({
          name: z.string(),
          description: z.string().optional(),
          slug: z.string(),
        }).parse(args);
        const project = await ProjectService.create(input);
        return {
          content: [
            {
              type: 'text',
              text: `Created project: ${project.name} (ID: ${project.id})`,
            },
          ],
        };
      }

      case 'list_recipes': {
        const { projectId } = z.object({ projectId: z.string() }).parse(args);
        const recipes = await RecipeService.findByProject(projectId);
        return {
          content: [{ type: 'text', text: JSON.stringify(recipes, null, 2) }],
        };
      }

      case 'get_recipe': {
        const { id } = z.object({ id: z.string() }).parse(args);
        const recipe = await RecipeService.findById(id);
        if (!recipe) {
          return {
            content: [{ type: 'text', text: 'Recipe not found' }],
            isError: true,
          };
        }
        return {
          content: [{ type: 'text', text: JSON.stringify(recipe, null, 2) }],
        };
      }

      case 'create_recipe': {
        const input = z.object({
          projectId: z.string(),
          name: z.string(),
          description: z.string().optional(),
          slug: z.string(),
          content: z.any().optional(),
        }).parse(args);
        const { projectId, ...data } = input;
        const recipe = await RecipeService.create(projectId, data);
        return {
          content: [
            {
              type: 'text',
              text: `Created recipe: ${recipe.name} (ID: ${recipe.id})`,
            },
          ],
        };
      }

      case 'update_recipe': {
        const input = z.object({
          id: z.string(),
          name: z.string().optional(),
          description: z.string().optional(),
          content: z.any().optional(),
        }).parse(args);
        const { id, ...data } = input;
        const recipe = await RecipeService.update(id, data);
        return {
          content: [
            {
              type: 'text',
              text: `Updated recipe: ${recipe.name} (version: ${recipe.version})`,
            },
          ],
        };
      }

      case 'delete_recipe': {
        const { id } = z.object({ id: z.string() }).parse(args);
        await RecipeService.delete(id);
        return {
          content: [{ type: 'text', text: `Deleted recipe ${id}` }],
        };
      }

      // ============================================
      // ELEMENT TOOLS
      // ============================================

      case 'search_elements': {
        const input = z.object({
          query: z.string().optional(),
          layer: z.enum(['atom', 'molecule', 'organism', 'template']).optional(),
          category: z.string().optional(),
          tags: z.array(z.string()).optional(),
          limit: z.number().optional(),
        }).parse(args);

        const results = searchElements({
          query: input.query,
          layer: input.layer as ElementLayer | undefined,
          category: input.category as ElementCategory | undefined,
          tags: input.tags,
          limit: input.limit || 20,
        });

        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              count: results.length,
              elements: results,
            }, null, 2),
          }],
        };
      }

      case 'get_element': {
        const { id } = z.object({ id: z.string() }).parse(args);
        const element = getElementById(id);

        if (!element) {
          return {
            content: [{ type: 'text', text: `Element not found: ${id}` }],
            isError: true,
          };
        }

        return {
          content: [{ type: 'text', text: JSON.stringify(element, null, 2) }],
        };
      }

      case 'list_categories': {
        const categories = getCategories();
        return {
          content: [{ type: 'text', text: JSON.stringify(categories, null, 2) }],
        };
      }

      case 'get_elements_by_layer': {
        const { layer } = z.object({
          layer: z.enum(['atom', 'molecule', 'organism', 'template']),
        }).parse(args);

        const elements = getElementsByLayer(layer);
        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              layer,
              count: elements.length,
              elements,
            }, null, 2),
          }],
        };
      }

      // ============================================
      // THEME TOOLS
      // ============================================

      case 'list_themes': {
        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              count: themes.length,
              themes: themes.map(t => ({
                id: t.id,
                name: t.name,
                description: t.description,
                primaryColor: t.colors.primary,
              })),
            }, null, 2),
          }],
        };
      }

      case 'get_theme': {
        const { id } = z.object({ id: z.string() }).parse(args);
        const theme = getThemeById(id);

        if (!theme) {
          return {
            content: [{ type: 'text', text: `Theme not found: ${id}` }],
            isError: true,
          };
        }

        return {
          content: [{ type: 'text', text: JSON.stringify(theme, null, 2) }],
        };
      }

      // ============================================
      // ZONE TOOLS
      // ============================================

      case 'list_zones': {
        const input = z.object({
          query: z.string().optional(),
        }).parse(args);

        const results = searchZones(input.query);
        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              count: results.length,
              zones: results.map(z => ({
                id: z.id,
                name: z.name,
                description: z.description,
                aesthetic: z.aesthetic,
                componentCount: z.componentCount,
                tags: z.tags,
              })),
            }, null, 2),
          }],
        };
      }

      case 'get_zone': {
        const { id } = z.object({ id: z.string() }).parse(args);
        const zone = getZoneById(id);

        if (!zone) {
          return {
            content: [{ type: 'text', text: `Zone not found: ${id}. Available zones: ${zones.map(z => z.id).join(', ')}` }],
            isError: true,
          };
        }

        return {
          content: [{ type: 'text', text: JSON.stringify(zone, null, 2) }],
        };
      }

      case 'get_zone_components': {
        const input = z.object({
          zoneId: z.string(),
          layer: z.enum(['atom', 'molecule', 'organism', 'template']).optional(),
          limit: z.number().optional(),
        }).parse(args);

        const zone = getZoneById(input.zoneId);
        if (!zone) {
          return {
            content: [{ type: 'text', text: `Zone not found: ${input.zoneId}` }],
            isError: true,
          };
        }

        // Search elements by zone tags
        const results = searchElements({
          tags: zone.tags.slice(0, 2), // Use first 2 zone tags for matching
          layer: input.layer as ElementLayer | undefined,
          limit: input.limit || 20,
        });

        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              zone: zone.name,
              zoneId: input.zoneId,
              count: results.length,
              elements: results,
            }, null, 2),
          }],
        };
      }

      case 'suggest_components': {
        const input = z.object({
          description: z.string(),
          aesthetic: z.string().optional(),
          limit: z.number().optional(),
        }).parse(args);

        // Parse the description for common component needs
        const desc = input.description.toLowerCase();
        const suggestions: Array<{ element: unknown; reason: string }> = [];
        const limit = input.limit || 10;

        // Landing page detection
        if (desc.includes('landing') || desc.includes('homepage') || desc.includes('marketing')) {
          const heroes = searchElements({ tags: ['hero'], limit: 2 });
          heroes.forEach(el => suggestions.push({ element: el, reason: 'Hero section for landing pages' }));

          const features = searchElements({ tags: ['features'], limit: 2 });
          features.forEach(el => suggestions.push({ element: el, reason: 'Feature showcase section' }));

          const ctas = searchElements({ tags: ['cta'], limit: 2 });
          ctas.forEach(el => suggestions.push({ element: el, reason: 'Call-to-action for conversions' }));
        }

        // Pricing detection
        if (desc.includes('pricing') || desc.includes('plans') || desc.includes('subscription')) {
          const pricing = searchElements({ tags: ['pricing'], limit: 3 });
          pricing.forEach(el => suggestions.push({ element: el, reason: 'Pricing table/cards' }));
        }

        // Form/auth detection
        if (desc.includes('form') || desc.includes('login') || desc.includes('signup') || desc.includes('auth')) {
          const inputs = searchElements({ category: 'inputs' as ElementCategory, limit: 4 });
          inputs.forEach(el => suggestions.push({ element: el, reason: 'Form input component' }));

          const buttons = searchElements({ tags: ['button'], limit: 2 });
          buttons.forEach(el => suggestions.push({ element: el, reason: 'Action button' }));
        }

        // Navigation detection
        if (desc.includes('navigation') || desc.includes('nav') || desc.includes('header') || desc.includes('footer')) {
          const nav = searchElements({ category: 'navigation' as ElementCategory, limit: 3 });
          nav.forEach(el => suggestions.push({ element: el, reason: 'Navigation component' }));
        }

        // Cards detection
        if (desc.includes('card') || desc.includes('grid') || desc.includes('list')) {
          const cards = searchElements({ category: 'cards' as ElementCategory, limit: 3 });
          cards.forEach(el => suggestions.push({ element: el, reason: 'Card component for content display' }));
        }

        // Testimonials/reviews
        if (desc.includes('testimonial') || desc.includes('review') || desc.includes('social proof')) {
          const testimonials = searchElements({ tags: ['testimonial'], limit: 2 });
          testimonials.forEach(el => suggestions.push({ element: el, reason: 'Customer testimonials' }));
        }

        // General search if no specific matches
        if (suggestions.length === 0) {
          const general = searchElements({ query: input.description, limit });
          general.forEach(el => suggestions.push({ element: el, reason: 'Matches your description' }));
        }

        // Apply aesthetic filter if provided
        let finalSuggestions = suggestions.slice(0, limit);
        if (input.aesthetic) {
          const matchingZone = zones.find(z =>
            z.name.toLowerCase().includes(input.aesthetic!.toLowerCase()) ||
            z.aesthetic.toLowerCase().includes(input.aesthetic!.toLowerCase()) ||
            z.tags.some(t => t.toLowerCase().includes(input.aesthetic!.toLowerCase()))
          );
          if (matchingZone) {
            finalSuggestions = suggestions
              .slice(0, limit)
              .map(s => ({ ...s, suggestedZone: matchingZone.name }));
          }
        }

        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              query: input.description,
              aesthetic: input.aesthetic,
              count: finalSuggestions.length,
              suggestions: finalSuggestions,
            }, null, 2),
          }],
        };
      }

      // ============================================
      // EXPORT TOOLS
      // ============================================

      case 'export_recipe': {
        const input = z.object({
          recipeId: z.string(),
          format: z.enum(['react-tailwind', 'html-css', 'next-app']).optional().default('react-tailwind'),
          theme: z.string().optional().default('default'),
          includeTheme: z.boolean().optional().default(true),
        }).parse(args);

        // Get the recipe
        const recipe = await RecipeService.findById(input.recipeId);
        if (!recipe) {
          return {
            content: [{ type: 'text', text: `Recipe not found: ${input.recipeId}` }],
            isError: true,
          };
        }

        // Get project for naming
        const project = await ProjectService.findById(recipe.projectId);

        // Export the recipe
        const result = await ExportService.exportRecipe(
          recipe.content as RecipeContent,
          {
            format: input.format,
            theme: input.theme,
            includeTheme: input.includeTheme,
            projectName: project?.name || 'UI Museum Export',
            recipeName: recipe.name,
          }
        );

        // Return file listing (not full content to avoid overwhelming response)
        let instructions: string[];
        switch (input.format) {
          case 'html-css':
            instructions = [
              '1. Download files or use the web export UI',
              '2. Open index.html in your browser',
              '   Or serve with: npx serve / python -m http.server 8000',
            ];
            break;
          case 'next-app':
            instructions = [
              '1. Download files or use the web export UI',
              '2. Run: npm install',
              '3. Run: npm run dev',
              '4. Open http://localhost:3000',
              '5. Deploy to Vercel with: npx vercel',
            ];
            break;
          default: // react-tailwind
            instructions = [
              '1. Download files or use the web export UI',
              '2. Run: npm install',
              '3. Run: npm run dev',
              '4. Open http://localhost:5173',
            ];
        }

        const summary = {
          recipeId: input.recipeId,
          recipeName: recipe.name,
          format: input.format,
          theme: input.theme,
          fileCount: result.files.length,
          files: result.files.map(f => ({
            path: f.path,
            size: f.content.length,
          })),
          instructions,
        };

        return {
          content: [{
            type: 'text',
            text: JSON.stringify(summary, null, 2),
          }],
        };
      }

      case 'list_export_formats': {
        const formats = [
          { id: 'react-tailwind', name: 'React + Tailwind', description: 'Vite-based React project with Tailwind CSS' },
          { id: 'html-css', name: 'HTML + CSS', description: 'Static HTML + CSS files, no build step required' },
          { id: 'next-app', name: 'Next.js App', description: 'Next.js App Router project with Tailwind CSS' },
        ];

        const availableThemes = ExportService.getAvailableThemes();

        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              formats,
              themes: availableThemes,
              defaultFormat: 'react-tailwind',
              defaultTheme: 'default',
            }, null, 2),
          }],
        };
      }

      default:
        return {
          content: [{ type: 'text', text: `Unknown tool: ${name}` }],
          isError: true,
        };
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return {
      content: [{ type: 'text', text: `Error: ${message}` }],
      isError: true,
    };
  }
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('UI Museum MCP server started');
}

main().catch(console.error);
