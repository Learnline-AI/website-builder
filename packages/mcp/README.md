# UI Museum MCP Server

Model Context Protocol (MCP) server for UI Museum, enabling Claude Code to interact with the element library and recipe system.

## Installation

1. Build the package:
```bash
pnpm build
```

2. The `.claude/config.json` in the project root contains the MCP configuration. Claude Code should automatically detect this when working in the project directory.

## Available Tools

### Project Management

| Tool | Description |
|------|-------------|
| `list_projects` | List all projects |
| `get_project` | Get project by ID with recipes |
| `create_project` | Create a new project |

### Recipe Management

| Tool | Description |
|------|-------------|
| `list_recipes` | List recipes in a project |
| `get_recipe` | Get recipe with content |
| `create_recipe` | Create a new recipe |
| `update_recipe` | Update recipe content |
| `delete_recipe` | Delete a recipe |

### Element Library

| Tool | Description |
|------|-------------|
| `search_elements` | Search elements by query, layer, category, or tags |
| `get_element` | Get detailed element metadata by ID |
| `list_categories` | List all categories with counts |
| `get_elements_by_layer` | Get elements by atomic design layer |

### Themes

| Tool | Description |
|------|-------------|
| `list_themes` | List all available themes |
| `get_theme` | Get theme details with colors |

## Example Usage

In Claude Code, you can use natural language to interact with UI Museum:

```
"Create a landing page for a SaaS product with a hero section, feature grid, and pricing table"
```

Claude will:
1. Use `search_elements` to find appropriate components
2. Use `create_recipe` to build the page structure
3. Compose elements into a complete recipe

## Element Layers

Elements follow atomic design principles:

- **atom**: Basic building blocks (typography, shadows, icons)
- **molecule**: Simple composed elements (buttons, inputs, cards)
- **organism**: Complex UI sections (heroes, navbars, features)
- **template**: Full page layouts (landing page, dashboard)

## Available Themes

- `default` - Clean, modern light theme
- `dark` - Dark mode with subtle contrast
- `brutal` - Neo-brutalist with hard shadows
- `neon` - Cyberpunk with neon glows
- `cosmic` - Deep space with aurora accents
- `glass` - Glassmorphism with blur effects

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | Required |

## Development

```bash
# Build
pnpm build

# Type check
pnpm tsc --noEmit
```
