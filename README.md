# UI Museum

**Cabinet of Interface Curiosities** - A comprehensive component library browser showcasing 650+ UI elements organized by atomic design principles and themed zones.

## Tech Stack

- **React 19** - Latest React with concurrent features
- **Vite 6** - Lightning-fast build tooling
- **TypeScript 5.6** - Full type safety
- **Tailwind CSS** - Utility-first styling (via inline classes)

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app runs at `http://localhost:5173` by default.

## Atomic Design Structure

The element library follows atomic design methodology with three layers:

```
src/elements/
├── atoms/          # ~350 primitive elements
│   ├── icons/      # 68 SVG icon components
│   ├── animations/ # 56 keyframes & motion utilities
│   ├── colors/     # 24 color tokens & palettes
│   ├── backgrounds/# 32 patterns, gradients, textures
│   ├── shadows/    # 18 box shadows & glows
│   ├── borders/    # 26 border styles & radii
│   ├── typography/ # 34 text styles & effects
│   ├── filters/    # 42 CSS & SVG filters
│   ├── shapes/     # 22 SVG geometric forms
│   └── surfaces/   # 28 material textures
│
├── molecules/      # ~144 composed components
│   ├── buttons/    # 24 button variants
│   ├── inputs/     # 32 form input components
│   ├── badges/     # 16 badge & tag styles
│   ├── cards/      # 24 card containers
│   ├── indicators/ # 28 progress & status
│   └── feedback/   # 20 tooltips, toasts, alerts
│
└── organisms/      # ~156 complex components
    ├── navigation/ # Navbar, Sidebar, TabGroup, etc.
    ├── data-display/ # DataTable, Timeline, KanbanBoard
    ├── forms/      # LoginForm, CheckoutForm, SearchPanel
    ├── feedback/   # Modal, Drawer, NotificationCenter
    ├── media/      # ImageGallery, VideoPlayer, Carousel
    ├── interactive/# MemoryGame, DrawingCanvas, ParticleSystem
    └── layout/     # HeroSection, Footer, PricingSection
```

### Layer Hierarchy

| Layer | Purpose | Example |
|-------|---------|---------|
| **Atoms** | Primitive design tokens | Shadow, color, icon |
| **Molecules** | Simple composed components | Button, Input, Badge |
| **Organisms** | Complex UI sections | Navbar, Modal, DataTable |

## Zone-Based Organization

The library includes 11 themed zones, each with a unique aesthetic:

| Zone | Theme | Description |
|------|-------|-------------|
| `arcade-basement` | Retro Gaming | Pixel art, neon glows, 8-bit aesthetics |
| `hacker-terminal` | Cyberpunk | Matrix green, terminal fonts, glitch effects |
| `cosmic-observatory` | Space | Starfields, gradients, cosmic animations |
| `pulp-detective` | Noir | Paper textures, halftone, vintage typography |
| `mad-science` | Laboratory | Bubbling effects, voltage, experiment UI |
| `physics-playground` | Physics | Gravity, momentum, particle simulations |
| `organic-garden` | Nature | Botanical, organic shapes, natural colors |
| `retro-office` | Vintage Tech | CRT screens, floppy disks, typewriter |
| `cinema-stage` | Film | Cinematic, spotlight, dramatic effects |
| `geometry-lab` | Mathematical | Grids, vectors, geometric patterns |
| `artist-studio` | Creative | Brushstrokes, sketchy, hand-drawn |

Zone files are located in `src/library/{zone-name}/index.tsx`.

## Project Structure

```
ui-museum/
├── src/
│   ├── App.tsx              # Main application entry
│   ├── components/
│   │   ├── ElementsMode.tsx # Atomic design browser
│   │   ├── CatalogMode.tsx  # Category-based browser
│   │   ├── JourneyMode.tsx  # Zone exploration view
│   │   └── shared/          # Reusable UI components
│   ├── elements/
│   │   ├── registry.ts      # Element metadata & registry
│   │   ├── atoms/           # Primitive elements
│   │   ├── molecules/       # Composed elements
│   │   └── organisms/       # Complex components
│   ├── library/
│   │   ├── shared/          # Icons, hooks, utilities
│   │   └── {zone}/          # Zone-specific components
│   ├── data/
│   │   └── registry.ts      # Component registry (zones)
│   └── hooks/               # Custom React hooks
├── package.json
├── tsconfig.json
├── vite.config.ts
└── index.html
```

## Element Registry

Every element is registered with metadata for discovery and composition tracking:

```typescript
interface ElementEntry {
  id: string;                    // Unique ID: 'btn-primary'
  name: string;                  // Display name
  layer: 'atom' | 'molecule' | 'organism';
  category: string;              // Category within layer
  description: string;           // Brief description
  composedOf?: string[];         // IDs of constituent elements
  themeAgnostic: boolean;        // Works across all themes
  implementation: 'css-class' | 'component' | 'hook' | 'token';
  component?: React.FC<any>;     // React component (if applicable)
  tags: string[];                // Searchable tags
}
```

### Registry Functions

```typescript
import {
  elementRegistry,
  getElement,
  getElementsByLayer,
  getElementsByCategory,
  getElementComposition,
  searchElements
} from './elements/registry';

// Get all atoms
const atoms = getElementsByLayer('atom');

// Search by name/tag
const buttons = searchElements('button');

// Get composition tree
const composition = getElementComposition('org-nav-navbar');
```

## Exploration Modes

The UI Museum offers three ways to explore components:

1. **Journey Mode** - Browse by themed zones
2. **Catalog Mode** - Browse by component category
3. **Elements Mode** - Browse by atomic design layer

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | TypeScript check + production build |
| `npm run preview` | Preview production build locally |

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on adding new elements.

## License

MIT
