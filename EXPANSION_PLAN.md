# UI Museum Expansion Master Plan
## Version 2.0 | December 2024

---

# Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Current State Analysis](#2-current-state-analysis)
3. [**NEW: Phase 0: Modernization & Style Overhaul**](#3-phase-0-modernization--style-overhaul)
4. [Phase 1: In-App AI Chatbot with MCP Integration](#4-phase-1-in-app-ai-chatbot-with-mcp-integration)
5. [Phase 2: Massive Library Expansion](#5-phase-2-massive-library-expansion)
6. [Phase 3: Figma Integration](#6-phase-3-figma-integration)
7. [Phase 4: Full Code Implementation](#7-phase-4-full-code-implementation)
8. [Technical Architecture](#8-technical-architecture)
9. [File Structure Changes](#9-file-structure-changes)
10. [Implementation Timeline](#10-implementation-timeline)
11. [Risk Assessment](#11-risk-assessment)
12. [Quality Assurance Plan](#12-quality-assurance-plan)
13. [Success Metrics](#13-success-metrics)

---

# 1. Executive Summary

This document outlines a comprehensive plan to transform UI Museum from a 111-component library into a 500+ component powerhouse with AI-powered assistance. The expansion includes:

- **AI Chatbot**: Toggleable in-app Claude assistant via MCP integration
- **Library Expansion**: 5 new zones + expansion of all 11 existing zones
- **Full Code**: Every component includes complete, copy-paste-ready code
- **Figma Integration**: Export/import components with Figma

**Current State**: 111 components across 11 zones
**Target State**: 500+ components across 16 zones + AI chatbot + Figma sync

---

# 2. Current State Analysis

## 2.1 Existing Zones (11)

| Zone ID | Zone Name | Components | Theme |
|---------|-----------|------------|-------|
| arcade-basement | The Arcade Basement | 11 | CRT, neon, 8-bit |
| pulp-detective | Pulp Detective's Office | 9 | Sepia, typewriter |
| hacker-terminal | The Hacker Terminal | 10 | Matrix, green phosphor |
| mad-science | Mad Science Lab | 10 | Tesla, bubbling |
| physics-playground | Physics Playground | 9 | Clean, mechanical |
| organic-garden | Organic Garden | 10 | Growth, nature |
| cosmic-observatory | Cosmic Observatory | 8 | Space, glassmorphism |
| retro-office | Retro Office | 10 | 90s tech, beige |
| cinema-stage | Cinema Stage | 8 | Theater, velvet |
| geometry-lab | Geometry Lab | 9 | Math, impossible |
| artist-studio | Artist's Studio | 9 | Hand-drawn, sketchy |

**Total: 103 zone components**

## 2.2 Atomic Elements Layer

| Layer | Categories | Elements |
|-------|------------|----------|
| Atoms | backgrounds, borders, shadows, typography, shapes, icons, animations, colors, filters, surfaces | ~350 |
| Molecules | buttons, inputs, badges, cards, indicators, feedback | ~144 |
| Organisms | navigation, forms, data-display, interactive, media, layout, feedback | ~156 |
| Templates | marketing, application, content, auth | ~61 |

**Total Registry Elements: ~711**

## 2.3 Architecture Components

```
packages/web/
├── App.tsx                    # Main app with mode switching
├── components/
│   ├── JourneyMode.tsx       # Scrolling zone showcase
│   ├── CatalogMode.tsx       # Grid catalog view
│   ├── ElementsMode.tsx      # Atomic elements browser
│   ├── RecipeMode.tsx        # Recipe compositions
│   ├── EditorMode.tsx        # Visual editor
│   └── editor/
│       ├── EditorLayout.tsx
│       ├── EditorCanvas.tsx
│       ├── SortableBlock.tsx
│       ├── ComponentBrowser.tsx
│       ├── PropertyPanel.tsx
│       └── store.ts
├── elements/
│   ├── registry.ts           # Master element registry
│   ├── atoms/                # Atomic elements
│   ├── molecules/            # Molecular elements
│   ├── organisms/            # Organism elements
│   └── templates/            # Full templates
├── library/                   # Zone components
│   ├── arcade/
│   ├── cosmic/
│   ├── hacker/
│   └── ... (11 zones)
├── recipes/                   # Composition system
│   ├── types.ts
│   ├── RecipeRenderer.tsx
│   └── validator.ts
└── contexts/                  # Global state
    ├── ThemeContext.tsx
    ├── FavoritesContext.tsx
    └── RecentlyViewedContext.tsx
```

---

# 3. Phase 0: Modernization & Style Overhaul

> **STATUS: 🟢 MOSTLY COMPLETE** (Updated December 2024)
> Foundation work done - remaining zones can be fixed incrementally.

## 3.0 Completed Work (December 2024)

| Task | Status | Details |
|------|--------|---------|
| Create timing tokens | ✅ Done | `tokens/core/timing.css` with duration, easing, scale, glow tokens |
| Update global CSS | ✅ Done | `main.css` with animation utilities, reduced-motion support |
| Fix Arcade zone | ✅ Done | Reduced glow 30px→12px, softer text shadows, bg-zinc-950 |
| Fix Cosmic zone | ✅ Done | Reduced glow, updated backgrounds, softer transitions |
| Fix Hacker zone | ✅ Done | bg-black→bg-zinc-950, softer green, reduced intensity |
| Reduced-motion support | ✅ Done | `@media (prefers-reduced-motion)` rules in main.css |
| Animation utilities | ✅ Done | hover-lift, fade-in, pulse-subtle, text-glow-*, etc. |
| Fix remaining zones | ✅ Done | pulp, science, physics, garden, retro, cinema, geometry, artist |

### Files Created/Modified:
- `packages/web/tokens/core/timing.css` (NEW)
- `packages/web/tokens/index.css` (added timing import)
- `packages/web/styles/main.css` (animation utilities, reduced-motion)
- `packages/web/library/arcade/index.tsx` (modernized)
- `packages/web/library/cosmic/index.tsx` (modernized)
- `packages/web/library/hacker/index.tsx` (modernized)
- `packages/web/library/pulp/index.tsx` (modernized)
- `packages/web/library/mad-science/index.tsx` (modernized)
- `packages/web/library/organic/index.tsx` (modernized)
- `packages/web/library/retro-office/index.tsx` (modernized)
- `packages/web/library/cinema/index.tsx` (modernized)
- `packages/web/library/geometry/index.tsx` (modernized)
- `packages/web/library/artist-studio/index.tsx` (modernized)

---

> **ORIGINAL RESEARCH (for reference)** - This phase must be completed BEFORE expanding the library.
> Current components look "old and gimmicky" - we need to fix the foundation first.

## 3.1 Research Summary

Based on comprehensive research from 8 parallel agents analyzing:
- Shopify Winter Edition 2024/2025 (burning transitions, CRT effects)
- Aceternity UI (70+ modern components)
- Premium Design Systems (Linear, Vercel, Stripe, Apple)
- WebGL/Shader Effects (dissolve, particles, gradient mesh)
- Modern UI Transitions (View Transitions API, FLIP, Spring physics)
- Altcarbon.com (glass morphism, subtle animations)
- Micro.so (premium SaaS design patterns)

### Key Finding: Why Current Components Look Dated

| Problem Area | Current (Dated 2010-2015) | Modern Standard (2024-2025) |
|--------------|---------------------------|----------------------------|
| **Animation Timing** | 500-1000ms | 150-300ms (micro), 300-500ms (larger) |
| **Easing** | Bouncy cubic-bezier | Subtle ease-out or spring physics |
| **Background Colors** | Pure black (#000000) | Rich dark (#0a0a0a, #121212) |
| **Accent Colors** | Pure saturated (#FF0000) | Muted, palette-derived |
| **Neon Glows** | `0 0 30px` everywhere | `0 0 8-12px` on key elements only |
| **Border Width** | 4px thick | 1px subtle |
| **Border Style** | Solid color | `border-white/10` transparency |
| **Hover Scale** | 1.1x or higher | 1.02-1.05x subtle |
| **Animation Quantity** | Everything animates | Purposeful, meaningful motion |
| **Shadows** | Template drop shadows | Layered, palette-derived shadows |

## 3.2 Detailed Problems by Zone

### Arcade Basement
- ❌ Pure color blocks (#FF0000, #00FF00)
- ❌ Heavy neon glow on EVERY element
- ❌ CRT effect too aggressive
- ✅ Fix: Muted neon palette, glow only on interactive elements

### Cosmic Observatory
- ❌ Too many particle effects
- ❌ Overwhelming star animations
- ❌ Everything pulses/glows
- ✅ Fix: Reduce particles 70%, add depth blur, subtle twinkle

### Cyberpunk District
- ❌ Neon overdose (cyan/magenta everywhere)
- ❌ Glitch effects on static elements
- ❌ Harsh color transitions
- ✅ Fix: Reserve glitch for hover, muted colors, cleaner grid

### Hacker Terminal
- ❌ Matrix rain too dense
- ❌ Green phosphor too bright (#00FF00)
- ❌ Slow terminal typing animation
- ✅ Fix: Reduce density, softer green (#00D084), faster typing

### All Zones General Issues
- ❌ Over-decoration (every element has effects)
- ❌ No breathing room (tight spacing)
- ❌ Inconsistent animation timing
- ❌ Missing reduced-motion support

## 3.3 Step-by-Step Implementation Plan

### Step 0.1: Create Design Tokens (Day 1)
```
File: packages/web/styles/tokens.ts

Tasks:
1. Define timing tokens
   - --duration-instant: 100ms
   - --duration-fast: 200ms
   - --duration-normal: 300ms
   - --duration-slow: 500ms

2. Define easing tokens
   - --ease-out: cubic-bezier(0.16, 1, 0.3, 1)
   - --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1)

3. Define color tokens per zone (muted versions)
   - arcade: { primary: '#00D084', glow: 'rgba(0, 208, 132, 0.3)' }
   - cosmic: { primary: '#818CF8', glow: 'rgba(129, 140, 248, 0.2)' }

4. Define spacing tokens
   - --space-generous: 2rem (for premium feel)

5. Define glow intensity levels
   - --glow-subtle: 0 0 8px
   - --glow-medium: 0 0 12px
   - --glow-strong: 0 0 20px (use sparingly)
```

### Step 0.2: Update Global Animation Defaults (Day 1)
```
File: packages/web/styles/globals.css

Tasks:
1. Set default transition duration to 200ms
2. Add prefers-reduced-motion support globally
3. Update default easing curves
4. Remove bounce animations from defaults
```

### Step 0.3: Create Reusable Animation Utilities (Day 2)
```
File: packages/web/library/shared/animations.ts

Create utilities:
1. springTransition({ stiffness, damping, mass })
2. fadeIn(duration, delay)
3. slideUp(distance, duration)
4. scaleIn(from, to, duration)
5. glowPulse(color, intensity) - SUBTLE version
6. revealOnScroll(threshold)
```

### Step 0.4: Fix Arcade Zone (Day 2-3)
```
File: packages/web/library/arcade/index.tsx

Changes per component:
1. ArcadeButton
   - Old: shadow: 0 0 30px #00FF00
   - New: shadow: 0 0 10px rgba(0, 208, 132, 0.4)
   - Old: transition: 500ms
   - New: transition: 200ms ease-out
   - Old: scale(1.1) on hover
   - New: scale(1.03) on hover

2. RetroScoreDisplay
   - Reduce glow intensity 60%
   - Add subtle CRT scanlines (opacity 0.03)
   - Remove constant pulse animation

3. PixelProgressBar
   - Smooth animation (was stepped)
   - Reduce glow trail

4. All components:
   - Update colors to muted palette
   - Add aria-labels
   - Add prefers-reduced-motion
```

### Step 0.5: Fix Cosmic Zone (Day 3-4)
```
File: packages/web/library/cosmic/index.tsx

Changes:
1. StarField background
   - Reduce particle count: 1000 → 300
   - Add depth layers (blur distant stars)
   - Slow down movement 50%

2. GlassmorphicCard
   - Old: backdrop-blur-md bg-white/20
   - New: backdrop-blur-xl bg-white/5 border-white/10

3. OrbitingPlanets
   - Reduce orbit speed
   - Add subtle shadow for depth
   - Remove constant glow pulse

4. CosmicButton
   - Reduce gradient animation speed
   - Subtle border glow on hover only
```

### Step 0.6: Fix Cyberpunk Zone (Day 4-5)
```
File: packages/web/library/cyberpunk/index.tsx

Changes:
1. NeonText
   - Reserve glitch effect for hover state only
   - Reduce neon intensity 50%
   - Add text-shadow layers for depth

2. CyberCard
   - Remove constant border animation
   - Add border animation on hover only
   - Soften corner clips

3. HologramDisplay
   - Reduce scan line opacity
   - Slower, subtler flicker
   - Add depth with layered shadows

4. Color updates:
   - Old cyan: #00FFFF → New: #06B6D4
   - Old magenta: #FF00FF → New: #D946EF
   - Old background: #000 → New: #0a0a0f
```

### Step 0.7: Fix Hacker Zone (Day 5-6)
```
File: packages/web/library/hacker/index.tsx

Changes:
1. MatrixRain
   - Reduce character density 60%
   - Add depth fade (distant chars more transparent)
   - Vary fall speed per column

2. TerminalWindow
   - Softer green: #00FF00 → #00D084
   - Faster typing: 100ms → 40ms per char
   - Add subtle scanline overlay

3. CommandPrompt
   - Reduce cursor blink speed
   - Softer glow on active

4. HackerButton
   - Remove glitch on idle
   - Add glitch on hover only (200ms)
```

### Step 0.8: Fix Remaining Zones (Day 6-8)
```
Apply same principles to:
- pulp-detective: Reduce sepia intensity, softer shadows
- mad-science: Calmer bubbling, subtler electricity
- physics-playground: Smoother physics, less bounce
- organic-garden: Gentler growth animations
- retro-office: Less aggressive skeuomorphism
- cinema-stage: Subtler spotlight, smoother curtains
- geometry-lab: Slower morphing, less jarring
- artist-studio: Softer brush strokes, calmer sketchy effect
```

### Step 0.9: Add Modern Transition Effects (Day 8-10)
```
File: packages/web/library/shared/transitions/

Create:
1. dissolve-transition.tsx
   - Noise-based dissolve shader
   - Configurable edge glow color
   - Progress controlled by prop

2. mask-reveal.tsx
   - CSS @property based reveal
   - Direction configurable (left, right, up, down)
   - Timing function options

3. spring-transition.tsx
   - Motion library integration
   - Stiffness/damping/mass props
   - Physics-based page transitions

4. scroll-reveal.tsx
   - Intersection Observer based
   - Stagger children option
   - Threshold configuration
```

### Step 0.10: Add Premium Hover Effects (Day 10-11)
```
File: packages/web/library/shared/effects/

Create:
1. tilt-card.tsx
   - 3D perspective on mouse move
   - Configurable tilt intensity
   - Smooth spring return

2. magnetic-button.tsx
   - Cursor attraction effect
   - Subtle scale on approach
   - Spring physics movement

3. glow-border.tsx
   - Animated gradient border
   - Cursor-following glow option
   - Configurable colors

4. glass-card.tsx
   - Modern glassmorphism
   - Subtle border
   - Proper backdrop-filter
```

### Step 0.11: Performance Optimization (Day 11-12)
```
Tasks:
1. Add will-change hints for animated elements
2. Use transform/opacity only (GPU accelerated)
3. Implement RAF throttling for scroll handlers
4. Add lazy loading for heavy effects
5. Create "lite" versions of particle effects
6. Add performance monitoring hooks
```

### Step 0.12: Accessibility Audit (Day 12-13)
```
Tasks:
1. Add prefers-reduced-motion to ALL animations
2. Add aria-labels to interactive elements
3. Ensure focus states are visible
4. Test with screen readers
5. Add skip-animation button
6. Verify color contrast ratios
```

## 3.4 New Transition Effects Library

### Dissolve/Burning Transition (Shopify-style)
```glsl
// Fragment shader concept
uniform float uProgress;
uniform float uEdgeWidth;
uniform vec3 uBurnColor;
uniform sampler2D uNoiseMap;

void main() {
    float noise = texture2D(uNoiseMap, vUv).r;

    // Discard "burned" pixels
    if (noise < uProgress) discard;

    // Create glowing edge
    float edge = smoothstep(uProgress, uProgress + uEdgeWidth, noise);
    vec3 finalColor = mix(uBurnColor * 2.0, baseColor, edge);

    gl_FragColor = vec4(finalColor, 1.0);
}
```

### CSS Mask Reveal
```css
@property --reveal-progress {
    syntax: '<percentage>';
    initial-value: 0%;
    inherits: false;
}

.reveal-section {
    mask-image: linear-gradient(
        to right,
        black var(--reveal-progress),
        transparent var(--reveal-progress)
    );
    transition: --reveal-progress 0.6s ease-out;
}

.reveal-section.visible {
    --reveal-progress: 100%;
}
```

### View Transitions API
```css
@view-transition {
    navigation: auto;
}

::view-transition-old(root) {
    animation: fade-and-scale-out 0.3s ease-out;
}

::view-transition-new(root) {
    animation: fade-and-scale-in 0.3s ease-out;
}
```

### Spring Animation Config
```typescript
// Recommended spring parameters
const springConfig = {
    // For micro-interactions (buttons, toggles)
    snappy: { stiffness: 400, damping: 30, mass: 0.8 },

    // For page transitions
    smooth: { stiffness: 200, damping: 25, mass: 1 },

    // For reveals/entrances
    gentle: { stiffness: 120, damping: 20, mass: 1.2 },

    // For Aceternity-style effects
    aceternity: { stiffness: 150, damping: 12, mass: 0.1 }
};
```

## 3.5 Color Palette Modernization

### Before (Dated)
```css
:root {
    --arcade-primary: #00FF00;      /* Too bright */
    --cosmic-primary: #FF00FF;      /* Too saturated */
    --cyber-primary: #00FFFF;       /* Harsh */
    --background-dark: #000000;     /* Too stark */
}
```

### After (Modern)
```css
:root {
    /* Muted, sophisticated colors */
    --arcade-primary: #00D084;
    --arcade-glow: rgba(0, 208, 132, 0.3);

    --cosmic-primary: #818CF8;
    --cosmic-glow: rgba(129, 140, 248, 0.2);

    --cyber-primary: #06B6D4;
    --cyber-accent: #D946EF;
    --cyber-glow: rgba(6, 182, 212, 0.25);

    /* Rich dark backgrounds */
    --bg-void: #0a0a0a;
    --bg-elevated: #121212;
    --bg-surface: #1a1a1a;

    /* Subtle borders */
    --border-subtle: rgba(255, 255, 255, 0.1);
    --border-medium: rgba(255, 255, 255, 0.15);
}
```

## 3.6 Animation Timing Standards

| Animation Type | Duration | Easing |
|----------------|----------|--------|
| Button hover | 150ms | ease-out |
| Card hover | 200ms | ease-out |
| Modal open | 250ms | spring (snappy) |
| Page transition | 300ms | spring (smooth) |
| Background loop | 20-60s | linear |
| Skeleton shimmer | 1.5s | linear |
| Toast enter | 200ms | spring |
| Toast exit | 150ms | ease-in |
| Scroll reveal | 400ms | spring (gentle) |
| Hover scale | 200ms | ease-out |

## 3.7 Glow & Shadow Standards

### Glow Levels
```css
/* Level 1: Subtle (most common) */
box-shadow: 0 0 8px var(--glow-color);

/* Level 2: Medium (hover states) */
box-shadow: 0 0 12px var(--glow-color);

/* Level 3: Strong (focused/active, use sparingly) */
box-shadow: 0 0 20px var(--glow-color);
```

### Layered Shadows (Premium feel)
```css
.premium-card {
    box-shadow:
        0 1px 2px rgba(0, 0, 0, 0.05),
        0 4px 8px rgba(0, 0, 0, 0.1),
        0 8px 16px rgba(0, 0, 0, 0.1);
}
```

## 3.8 Required Dependencies

```json
{
    "dependencies": {
        "framer-motion": "^11.0.0",
        "@react-spring/web": "^9.7.0",
        "lenis": "^1.0.0"
    },
    "devDependencies": {
        "three": "^0.160.0",
        "@react-three/fiber": "^8.15.0"
    }
}
```

## 3.9 Success Criteria for Phase 0

- [ ] All animations under 300ms for interactions
- [ ] No pure black (#000000) backgrounds
- [ ] Glow effects reduced by 50-70%
- [ ] Hover scales max 1.05x
- [ ] All zones pass accessibility audit
- [ ] prefers-reduced-motion supported everywhere
- [ ] Performance: 60fps on mid-range devices
- [ ] No animation on page load (reveal on scroll)
- [ ] Consistent timing tokens used
- [ ] Modern spring physics for transitions

---

# 4. Phase 1: In-App AI Chatbot with MCP Integration

## 3.1 Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         UI MUSEUM APP                            │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                      CHAT INTERFACE                          │ │
│  │  ┌──────────────────────────────────────────────────────┐   │ │
│  │  │ [Toggle Button] ←→ [Floating Chat Panel]             │   │ │
│  │  │                                                       │   │ │
│  │  │  Message History                                      │   │ │
│  │  │  ├─ User: "Show me neon buttons"                     │   │ │
│  │  │  └─ Claude: [Renders component cards + code]         │   │ │
│  │  │                                                       │   │ │
│  │  │  [Input Field] [Send] [Attach] [Voice]               │   │ │
│  │  └──────────────────────────────────────────────────────┘   │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                              │                                    │
│                              ▼                                    │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                     MCP CLIENT LAYER                         │ │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐            │ │
│  │  │ Message     │ │ Component   │ │ Code        │            │ │
│  │  │ Handler     │ │ Searcher    │ │ Generator   │            │ │
│  │  └─────────────┘ └─────────────┘ └─────────────┘            │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                              │                                    │
└──────────────────────────────┼────────────────────────────────────┘
                               │
                               ▼ HTTP/WebSocket
┌─────────────────────────────────────────────────────────────────┐
│                       MCP SERVER                                 │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                    TOOL DEFINITIONS                          │ │
│  │                                                              │ │
│  │  search_components(query, zone?, layer?)                    │ │
│  │  get_component_code(componentId)                            │ │
│  │  get_zone_info(zoneId)                                      │ │
│  │  generate_variation(componentId, style)                     │ │
│  │  create_recipe(components[], layout)                        │ │
│  │  export_to_figma(componentIds[])                            │ │
│  │  analyze_design(imageUrl)                                   │ │
│  │                                                              │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                              │                                    │
│                              ▼                                    │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │              COMPONENT REGISTRY ACCESS                       │ │
│  │  - Element Registry (711 elements)                          │ │
│  │  - Zone Registry (16 zones)                                 │ │
│  │  - Code Snippets Database                                   │ │
│  │  - Figma Token Storage                                      │ │
│  └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

## 3.2 New Files to Create

### 3.2.1 Chat Component Structure

```
packages/web/components/chat/
├── index.ts                      # Exports
├── ChatProvider.tsx              # Context for chat state
├── ChatToggle.tsx                # Floating toggle button
├── ChatPanel.tsx                 # Main chat panel
├── ChatMessage.tsx               # Individual message
├── ChatInput.tsx                 # Input with send/voice
├── ChatComponentCard.tsx         # Rendered component in chat
├── ChatCodeBlock.tsx             # Syntax-highlighted code
├── ChatSuggestions.tsx           # Quick action chips
└── hooks/
    ├── useMCPClient.ts          # MCP connection hook
    ├── useChatHistory.ts        # Persistent history
    └── useVoiceInput.ts         # Voice recognition
```

### 3.2.2 MCP Server Structure

```
packages/mcp-server/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts                 # Server entry point
│   ├── server.ts                # MCP server setup
│   ├── tools/
│   │   ├── searchComponents.ts
│   │   ├── getComponentCode.ts
│   │   ├── getZoneInfo.ts
│   │   ├── generateVariation.ts
│   │   ├── createRecipe.ts
│   │   ├── exportToFigma.ts
│   │   └── analyzeDesign.ts
│   ├── registry/
│   │   ├── componentLoader.ts
│   │   └── codeExtractor.ts
│   └── utils/
│       ├── searchIndex.ts
│       └── codeFormatter.ts
└── README.md
```

## 3.3 ChatProvider Implementation

```typescript
// packages/web/components/chat/ChatProvider.tsx

interface ChatState {
  isOpen: boolean;
  messages: ChatMessage[];
  isLoading: boolean;
  suggestions: string[];
  selectedComponent: string | null;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  components?: ComponentReference[];
  codeBlocks?: CodeBlock[];
  timestamp: Date;
}

interface ComponentReference {
  id: string;
  name: string;
  preview: string;
  code: string;
}

interface CodeBlock {
  language: string;
  code: string;
  filename?: string;
}

const ChatContext = createContext<ChatContextType | null>(null);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  const mcpClient = useMCPClient();

  const sendMessage = async (content: string) => {
    dispatch({ type: 'ADD_MESSAGE', payload: { role: 'user', content } });
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      const response = await mcpClient.chat(content, {
        context: {
          currentZone: state.currentZone,
          recentComponents: state.recentComponents,
        }
      });

      dispatch({
        type: 'ADD_MESSAGE',
        payload: {
          role: 'assistant',
          content: response.text,
          components: response.components,
          codeBlocks: response.codeBlocks,
        }
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  return (
    <ChatContext.Provider value={{ state, sendMessage, toggle, clear }}>
      {children}
    </ChatContext.Provider>
  );
}
```

## 3.4 MCP Server Tools

### Tool 1: search_components

```typescript
// packages/mcp-server/src/tools/searchComponents.ts

export const searchComponentsTool = {
  name: 'search_components',
  description: 'Search for UI components by name, description, tags, or style',
  inputSchema: {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        description: 'Search query (e.g., "neon button", "card with hover")'
      },
      zone: {
        type: 'string',
        description: 'Filter by zone ID (optional)'
      },
      layer: {
        type: 'string',
        enum: ['atom', 'molecule', 'organism', 'template'],
        description: 'Filter by atomic design layer (optional)'
      },
      category: {
        type: 'string',
        description: 'Filter by category (optional)'
      },
      limit: {
        type: 'number',
        default: 10,
        description: 'Max results to return'
      }
    },
    required: ['query']
  },
  handler: async (params) => {
    const { query, zone, layer, category, limit = 10 } = params;

    // Search using Fuse.js or similar
    const results = searchIndex.search(query, {
      filters: { zone, layer, category },
      limit
    });

    return results.map(r => ({
      id: r.id,
      name: r.name,
      description: r.description,
      layer: r.layer,
      zone: r.zone,
      preview: r.previewUrl,
      score: r.score
    }));
  }
};
```

### Tool 2: get_component_code

```typescript
// packages/mcp-server/src/tools/getComponentCode.ts

export const getComponentCodeTool = {
  name: 'get_component_code',
  description: 'Get the full implementation code for a component',
  inputSchema: {
    type: 'object',
    properties: {
      componentId: {
        type: 'string',
        description: 'The component ID'
      },
      format: {
        type: 'string',
        enum: ['jsx', 'tsx', 'html', 'css'],
        default: 'tsx',
        description: 'Code format to return'
      },
      includeStyles: {
        type: 'boolean',
        default: true,
        description: 'Include Tailwind/CSS styles inline'
      },
      includeImports: {
        type: 'boolean',
        default: true,
        description: 'Include import statements'
      }
    },
    required: ['componentId']
  },
  handler: async (params) => {
    const { componentId, format, includeStyles, includeImports } = params;

    const component = registry.getElement(componentId);
    if (!component) throw new Error(`Component ${componentId} not found`);

    const code = codeExtractor.extract(component, {
      format,
      includeStyles,
      includeImports
    });

    return {
      componentId,
      name: component.name,
      code,
      dependencies: component.composedOf || [],
      usage: component.usage
    };
  }
};
```

### Tool 3: generate_variation

```typescript
// packages/mcp-server/src/tools/generateVariation.ts

export const generateVariationTool = {
  name: 'generate_variation',
  description: 'Generate a variation of a component with different styling',
  inputSchema: {
    type: 'object',
    properties: {
      componentId: {
        type: 'string',
        description: 'Base component ID'
      },
      targetZone: {
        type: 'string',
        description: 'Target zone for styling'
      },
      modifications: {
        type: 'object',
        properties: {
          colors: { type: 'object' },
          sizing: { type: 'string', enum: ['sm', 'md', 'lg', 'xl'] },
          animation: { type: 'string' },
          variant: { type: 'string' }
        }
      }
    },
    required: ['componentId']
  },
  handler: async (params) => {
    const { componentId, targetZone, modifications } = params;

    const baseComponent = registry.getElement(componentId);
    const zone = registry.getZone(targetZone);

    // Apply zone theming and modifications
    const variantCode = themeApplicator.apply(baseComponent, {
      zone,
      ...modifications
    });

    return {
      originalId: componentId,
      variantCode,
      previewHtml: renderToString(variantCode),
      appliedChanges: modifications
    };
  }
};
```

## 3.5 Chat UI Components

### ChatToggle.tsx

```typescript
export const ChatToggle: React.FC = () => {
  const { state, toggle } = useChat();

  return (
    <button
      onClick={toggle}
      className={`
        fixed bottom-6 right-6 z-50
        w-14 h-14 rounded-full
        bg-gradient-to-br from-indigo-500 to-purple-600
        shadow-lg shadow-indigo-500/30
        flex items-center justify-center
        transition-all duration-300 hover:scale-110
        ${state.isOpen ? 'rotate-45' : ''}
      `}
    >
      {state.isOpen ? (
        <XIcon className="w-6 h-6 text-white" />
      ) : (
        <ChatIcon className="w-6 h-6 text-white" />
      )}

      {/* Notification badge */}
      {state.unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
          {state.unreadCount}
        </span>
      )}
    </button>
  );
};
```

### ChatPanel.tsx

```typescript
export const ChatPanel: React.FC = () => {
  const { state, sendMessage } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.messages]);

  if (!state.isOpen) return null;

  return (
    <div className={`
      fixed bottom-24 right-6 z-50
      w-[420px] h-[600px] max-h-[80vh]
      bg-neutral-900/95 backdrop-blur-xl
      rounded-2xl border border-white/10
      shadow-2xl shadow-black/50
      flex flex-col overflow-hidden
      animate-slide-up
    `}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <SparklesIcon className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Museum Guide</h3>
            <p className="text-xs text-white/50">Powered by Claude</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-white">
            <MinimizeIcon className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-white">
            <SettingsIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {state.messages.length === 0 && (
          <ChatWelcome />
        )}
        {state.messages.map(msg => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        {state.isLoading && (
          <ChatTypingIndicator />
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {state.suggestions.length > 0 && (
        <ChatSuggestions suggestions={state.suggestions} onSelect={sendMessage} />
      )}

      {/* Input */}
      <ChatInput onSend={sendMessage} disabled={state.isLoading} />
    </div>
  );
};
```

## 3.6 Integration Points

### App.tsx Integration

```typescript
// packages/web/App.tsx

import { ChatProvider, ChatToggle, ChatPanel } from './components/chat';

export default function App() {
  // ... existing code

  return (
    <FavoritesProvider>
      <RecentlyViewedProvider>
        <ChatProvider>
          <AppContext.Provider value={...}>
            {/* Existing content */}

            {/* Chat components - global, toggleable */}
            <ChatToggle />
            <ChatPanel />
          </AppContext.Provider>
        </ChatProvider>
      </RecentlyViewedProvider>
    </FavoritesProvider>
  );
}
```

---

# 4. Phase 2: Massive Library Expansion

## 4.1 New Zones (5)

### Zone 12: The Luxury Showroom
```typescript
{
  id: 'luxury-showroom',
  name: 'The Luxury Showroom',
  subtitle: 'Gold accents, marble textures, premium feel',
  description: 'Step into a world of opulence where every pixel exudes luxury. Gold gradients catch the light, marble textures add depth, and animations flow with understated elegance.',
  bgColor: '#0a0a0a',
  gradient: 'linear-gradient(135deg, #0a0a0a 0%, #1a1510 50%, #0a0805 100%)',
  accentColor: '#d4af37',
  textColor: '#f5f0e6',
  fontFamily: 'display',
  componentCount: 25
}
```

**Components to Create:**
- LuxuryNavbar (organism)
- GoldButton, GoldButtonOutline (molecules)
- MarbleCard, MarbleHero (organisms)
- PremiumPricing (organism)
- DiamondBadge, PlatinumBadge (molecules)
- LuxuryTestimonial (organism)
- GoldDivider, GoldBorder (atoms)
- ElegantInput, ElegantSelect (molecules)
- VelvetDropdown (molecule)
- CrystalModal (organism)
- LuxuryFooter (organism)
- PremiumFeatureGrid (organism)
- GoldProgress, GoldSpinner (atoms)
- SwissWatch (animation atom)
- CaviarBackground (atom)
- ... (25 total)

### Zone 13: The Brutalist Bunker
```typescript
{
  id: 'brutalist-bunker',
  name: 'The Brutalist Bunker',
  subtitle: 'Raw concrete, bold typography, anti-design',
  description: 'Architecture meets interface in this homage to brutalism. Raw, honest, unapologetically bold. No decoration—only pure function and powerful presence.',
  bgColor: '#1a1a1a',
  gradient: 'linear-gradient(180deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
  accentColor: '#ff3e3e',
  textColor: '#ffffff',
  fontFamily: 'mono',
  componentCount: 20
}
```

**Components to Create:**
- BrutalistNav (organism)
- ConcreteButton, RawButton (molecules)
- MonolithCard (organism)
- BrutalHero (organism)
- BlockQuote (molecule)
- StarkInput, StarkTextarea (molecules)
- GridContainer (organism)
- BrutalistFooter (organism)
- RawDivider (atom)
- AntiModal (organism)
- BoldHeading, MonoText (atoms)
- ConcreteTexture (atom)
- SharpBorder (atom)
- ... (20 total)

### Zone 14: The Vaporwave Dreamscape
```typescript
{
  id: 'vaporwave-dream',
  name: 'The Vaporwave Dreamscape',
  subtitle: 'Pink sunsets, Greek busts, 80s nostalgia',
  description: 'A E S T H E T I C S. Swim through pastel gradients, past marble statues and pixelated palm trees. The future that never was, rendered in glorious retrowave.',
  bgColor: '#1a0a2e',
  gradient: 'linear-gradient(180deg, #ff6b9d 0%, #c44cff 25%, #6b5ce7 50%, #1a0a2e 100%)',
  accentColor: '#ff6b9d',
  textColor: '#e0d4ff',
  fontFamily: 'display',
  componentCount: 22
}
```

**Components to Create:**
- VaporNav (organism)
- NeonPinkButton, ChromeButton (molecules)
- SunsetHero (organism)
- FloatingCard, HolographicCard (organisms)
- RetroGrid (atom)
- SynthwaveInput (molecule)
- PalmTreeDivider (atom)
- VaporModal (organism)
- GlitchText (atom)
- PixelBorder (atom)
- StatueDecoration (atom)
- SunsetGradient (atom)
- VHSNoise (atom)
- ... (22 total)

### Zone 15: The Indie App Workshop
```typescript
{
  id: 'indie-workshop',
  name: 'The Indie App Workshop',
  subtitle: 'Friendly, playful, startup vibes',
  description: 'Where indie makers build dreams. Friendly rounded corners, playful animations, and that perfect startup energy. Think Notion meets Linear meets your favorite indie app.',
  bgColor: '#fafafa',
  gradient: 'linear-gradient(135deg, #fafafa 0%, #f0f0f0 100%)',
  accentColor: '#7c3aed',
  textColor: '#1f2937',
  fontFamily: 'body',
  componentCount: 30
}
```

**Components to Create:**
- IndieNavbar (organism)
- FriendlyButton, GhostButton, PillButton (molecules)
- FeatureCard, TestimonialCard, PricingCard (organisms)
- CommandPalette (organism)
- IndieInput, IndieSelect, IndieCheckbox (molecules)
- NotificationToast (molecule)
- IndieModal, BottomSheet (organisms)
- AvatarStack (molecule)
- StatusBadge, TagBadge (molecules)
- IndieTable, IndieList (organisms)
- EmptyState (organism)
- OnboardingFlow (template)
- IndieFooter (organism)
- SoftShadow (atom)
- RoundedBorder (atom)
- BounceAnimation (atom)
- ... (30 total)

### Zone 16: The Data Dashboard
```typescript
{
  id: 'data-dashboard',
  name: 'The Data Dashboard',
  subtitle: 'Analytics, charts, enterprise power',
  description: 'Where data tells stories. Dense information hierarchies, real-time visualizations, and the kind of complex interfaces that make analysts smile.',
  bgColor: '#0f1419',
  gradient: 'linear-gradient(180deg, #0f1419 0%, #1a2332 100%)',
  accentColor: '#3b82f6',
  textColor: '#e5e7eb',
  fontFamily: 'mono',
  componentCount: 35
}
```

**Components to Create:**
- DashboardNav, DashboardSidebar (organisms)
- MetricCard, StatCard, KPICard (organisms)
- LineChart, BarChart, PieChart, AreaChart (organisms)
- DataTable, SortableTable, PaginatedTable (organisms)
- DateRangePicker, FilterDropdown (molecules)
- DashboardInput, SearchInput (molecules)
- NotificationPanel (organism)
- ActivityFeed (organism)
- UserMenu (molecule)
- Breadcrumbs (molecule)
- TabNavigation (molecule)
- DashboardModal (organism)
- ExportButton, FilterButton (molecules)
- LoadingSkeleton (atom)
- Sparkline (atom)
- ProgressRing (atom)
- DataBadge (molecule)
- ... (35 total)

## 4.2 Existing Zone Expansions

### Each existing zone gets +15-20 new components:

| Zone | Current | New | Target | Focus Areas |
|------|---------|-----|--------|-------------|
| arcade-basement | 11 | +20 | 31 | Game UI, score displays, power-ups, level selectors |
| pulp-detective | 9 | +18 | 27 | Case files, evidence cards, timeline, typewriter inputs |
| hacker-terminal | 10 | +22 | 32 | Terminal components, command palette, logs, network viz |
| mad-science | 10 | +18 | 28 | Lab instruments, data displays, experiment cards |
| physics-playground | 9 | +16 | 25 | Interactive physics, sliders, gauges, meters |
| organic-garden | 10 | +15 | 25 | Growth animations, natural textures, eco-elements |
| cosmic-observatory | 8 | +20 | 28 | Space UI, planet cards, star maps, galaxy effects |
| retro-office | 10 | +17 | 27 | Skeuomorphic elements, floppy disk, vintage UI |
| cinema-stage | 8 | +18 | 26 | Movie credits, ticket stubs, popcorn animations |
| geometry-lab | 9 | +16 | 25 | Impossible shapes, morphing, tessellations |
| artist-studio | 9 | +15 | 24 | Sketch effects, paint splashes, brush strokes |

**Total Expansion: 11 zones × ~17 average = +187 components**

## 4.3 Category Expansion Details

### Atoms Expansion (+100 new)

| Category | Current | Add | Focus |
|----------|---------|-----|-------|
| backgrounds | 32 | +15 | Mesh gradients, animated patterns, noise textures |
| borders | 26 | +10 | Animated borders, gradient borders, dashed variants |
| shadows | 18 | +12 | Colorful shadows, layered shadows, neon glows |
| typography | 34 | +15 | Variable fonts, animated text, gradient text |
| shapes | 22 | +10 | Morphing shapes, blob shapes, geometric patterns |
| icons | 68 | +20 | Animated icons, dual-tone icons, micro-icons |
| animations | 56 | +10 | Micro-interactions, loading states, transitions |
| colors | 24 | +5 | Semantic palettes, accessibility palettes |
| filters | 42 | +3 | New blend modes, grain effects |

### Molecules Expansion (+80 new)

| Category | Current | Add | Focus |
|----------|---------|-----|-------|
| buttons | 24 | +20 | Icon buttons, split buttons, button groups, FABs |
| inputs | 32 | +15 | OTP inputs, password fields, autocomplete, tags |
| badges | 16 | +10 | Animated badges, status dots, verification badges |
| cards | 24 | +15 | Horizontal cards, compact cards, skeleton cards |
| indicators | 28 | +10 | Step indicators, ring progress, loading bars |
| feedback | 20 | +10 | Inline alerts, banners, notification badges |

### Organisms Expansion (+120 new)

| Category | Current | Add | Focus |
|----------|---------|-----|-------|
| navigation | ~25 | +25 | Mega menus, mobile navs, breadcrumbs, tabs |
| forms | ~20 | +20 | Multi-step forms, wizards, survey forms |
| data-display | ~30 | +25 | Tables, timelines, activity feeds, stats |
| interactive | ~25 | +20 | Modals, popovers, command palettes, drawers |
| media | ~20 | +15 | Galleries, video players, image editors |
| layout | ~20 | +15 | Grids, masonry, split views, resizable panels |

### Templates Expansion (+50 new)

| Category | Current | Add | Focus |
|----------|---------|-----|-------|
| marketing | 15 | +15 | SaaS landing, agency, portfolio, product launch |
| application | 13 | +15 | Dashboards, settings, profiles, onboarding |
| content | 16 | +10 | Blogs, documentation, changelogs |
| auth | 17 | +10 | Magic link, SSO, 2FA, password reset |

## 4.4 Total Component Count Summary

| Source | Count |
|--------|-------|
| Existing Zone Components | 103 |
| New Zone Components (5 zones) | 132 |
| Existing Zone Expansions | 187 |
| New Atoms | 100 |
| New Molecules | 80 |
| New Organisms | 120 |
| New Templates | 50 |
| **GRAND TOTAL** | **772 components** |

---

# 5. Phase 3: Figma Integration

## 5.1 Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      UI MUSEUM                                   │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                 FIGMA SYNC PANEL                             │ │
│  │  [Connect to Figma] [Sync Library] [Export Selection]       │ │
│  │                                                              │ │
│  │  Connected Files:                                            │ │
│  │  ├─ UI Museum Components.fig                                │ │
│  │  └─ My Project.fig                                          │ │
│  └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                     FIGMA REST API                               │
│  - GET /files/:file_key/components                              │
│  - GET /files/:file_key/nodes                                   │
│  - GET /images/:file_key                                        │
│  - POST /files/:file_key/variables                              │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                FIGMA PLUGIN (Optional)                           │
│  - Insert component from UI Museum                              │
│  - Export selection as code                                     │
│  - Sync design tokens                                           │
└─────────────────────────────────────────────────────────────────┘
```

## 5.2 New Files for Figma Integration

```
packages/web/components/figma/
├── index.ts
├── FigmaProvider.tsx         # Auth + connection state
├── FigmaConnectModal.tsx     # OAuth flow
├── FigmaSyncPanel.tsx        # Sync UI
├── FigmaExportButton.tsx     # Export components
├── hooks/
│   ├── useFigmaAuth.ts
│   ├── useFigmaSync.ts
│   └── useFigmaExport.ts
└── utils/
    ├── figmaApi.ts
    ├── codeToFigma.ts        # Convert code → Figma nodes
    └── figmaToCode.ts        # Convert Figma → code

packages/figma-plugin/
├── manifest.json
├── code.ts                   # Plugin logic
└── ui.html                   # Plugin UI
```

## 5.3 Figma OAuth Flow

```typescript
// packages/web/components/figma/hooks/useFigmaAuth.ts

export function useFigmaAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<FigmaUser | null>(null);

  const connect = async () => {
    const authUrl = `https://www.figma.com/oauth?client_id=${FIGMA_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=files:read&state=${generateState()}`;

    // Open OAuth popup
    const popup = window.open(authUrl, 'figma-auth', 'width=500,height=700');

    // Listen for callback
    window.addEventListener('message', async (event) => {
      if (event.data.type === 'figma-auth-callback') {
        const { code } = event.data;
        const tokenData = await exchangeCodeForToken(code);
        setToken(tokenData.access_token);

        const userData = await fetchFigmaUser(tokenData.access_token);
        setUser(userData);
      }
    });
  };

  return { token, user, connect, disconnect, isConnected: !!token };
}
```

## 5.4 Component Export to Figma

```typescript
// packages/web/components/figma/utils/codeToFigma.ts

export async function exportComponentToFigma(
  componentId: string,
  fileKey: string,
  token: string
) {
  const component = registry.getElement(componentId);
  if (!component) throw new Error('Component not found');

  // Parse component into Figma-compatible structure
  const figmaNodes = convertToFigmaNodes(component);

  // Upload to Figma file
  const response = await fetch(`https://api.figma.com/v1/files/${fileKey}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: component.name,
      nodes: figmaNodes
    })
  });

  return response.json();
}

function convertToFigmaNodes(component: ElementEntry): FigmaNode[] {
  // Convert React component structure to Figma node tree
  // This handles:
  // - Layout (flex, grid) → Auto Layout
  // - Styles → Figma fills, strokes, effects
  // - Text → Figma text nodes
  // - Images → Figma image fills

  return parsedNodes;
}
```

---

# 6. Phase 4: Full Code Implementation

## 6.1 Code Storage Structure

Every component will have full code stored in the registry:

```typescript
// Enhanced ElementEntry with full code

export interface ElementEntry {
  // ... existing fields ...

  // NEW: Full code implementation
  code: {
    // React/TypeScript implementation
    tsx: string;

    // Extracted CSS (if using CSS modules)
    css?: string;

    // Tailwind config additions (if any)
    tailwindConfig?: object;

    // Required dependencies
    dependencies: {
      name: string;
      version: string;
      dev?: boolean;
    }[];

    // Example usage
    example: string;

    // Props interface
    propsInterface: string;

    // Variants (different versions)
    variants?: {
      id: string;
      name: string;
      code: string;
      description: string;
    }[];
  };
}
```

## 6.2 Code Snippet Structure

```typescript
// Example: NeonButton with full code

{
  id: 'btn-neon',
  name: 'Neon Button',
  layer: 'molecule',
  category: 'buttons',
  // ... other fields ...

  code: {
    tsx: `
import React from 'react';

interface NeonButtonProps {
  children: React.ReactNode;
  color?: 'green' | 'pink' | 'blue' | 'purple';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export const NeonButton: React.FC<NeonButtonProps> = ({
  children,
  color = 'green',
  size = 'md',
  onClick,
  disabled = false,
  className = '',
}) => {
  const colors = {
    green: 'from-green-400 to-green-600 shadow-green-500/50 hover:shadow-green-400/60',
    pink: 'from-pink-400 to-pink-600 shadow-pink-500/50 hover:shadow-pink-400/60',
    blue: 'from-blue-400 to-blue-600 shadow-blue-500/50 hover:shadow-blue-400/60',
    purple: 'from-purple-400 to-purple-600 shadow-purple-500/50 hover:shadow-purple-400/60',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={\`
        relative font-bold rounded-lg
        bg-gradient-to-r \${colors[color]}
        shadow-lg transition-all duration-300
        hover:scale-105 hover:shadow-xl
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        \${sizes[size]}
        \${className}
      \`}
    >
      {/* Glow effect */}
      <span className="absolute inset-0 rounded-lg bg-gradient-to-r \${colors[color]} blur-xl opacity-50" />

      {/* Content */}
      <span className="relative z-10 text-white">
        {children}
      </span>
    </button>
  );
};

export default NeonButton;
`,

    dependencies: [
      { name: 'react', version: '^18.0.0' }
    ],

    example: `
import { NeonButton } from './NeonButton';

function App() {
  return (
    <div className="space-x-4">
      <NeonButton color="green">Click Me</NeonButton>
      <NeonButton color="pink" size="lg">Large Pink</NeonButton>
      <NeonButton color="blue" disabled>Disabled</NeonButton>
    </div>
  );
}
`,

    propsInterface: `
interface NeonButtonProps {
  children: React.ReactNode;
  color?: 'green' | 'pink' | 'blue' | 'purple';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}
`,

    variants: [
      {
        id: 'btn-neon-outline',
        name: 'Neon Button Outline',
        description: 'Outlined variant with neon border glow',
        code: `/* Outline variant code */`
      },
      {
        id: 'btn-neon-pulse',
        name: 'Neon Button Pulse',
        description: 'With pulsing animation',
        code: `/* Pulse variant code */`
      }
    ]
  }
}
```

## 6.3 Code Display Component

```typescript
// packages/web/components/shared/CodeDisplay.tsx

interface CodeDisplayProps {
  componentId: string;
  defaultTab?: 'code' | 'example' | 'props';
}

export const CodeDisplay: React.FC<CodeDisplayProps> = ({
  componentId,
  defaultTab = 'code'
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [copied, setCopied] = useState(false);

  const element = getElement(componentId);
  if (!element?.code) return null;

  const copyCode = () => {
    navigator.clipboard.writeText(element.code.tsx);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl bg-neutral-900 border border-white/10 overflow-hidden">
      {/* Tabs */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
        <div className="flex gap-1">
          {['code', 'example', 'props'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as typeof activeTab)}
              className={`
                px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
                ${activeTab === tab
                  ? 'bg-white/10 text-white'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
                }
              `}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <button
          onClick={copyCode}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/10 transition-colors"
        >
          {copied ? <CheckIcon className="w-4 h-4" /> : <CopyIcon className="w-4 h-4" />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* Code content */}
      <div className="p-4 overflow-x-auto">
        <SyntaxHighlighter
          language="tsx"
          style={customTheme}
          customStyle={{ background: 'transparent' }}
        >
          {activeTab === 'code' && element.code.tsx}
          {activeTab === 'example' && element.code.example}
          {activeTab === 'props' && element.code.propsInterface}
        </SyntaxHighlighter>
      </div>

      {/* Dependencies */}
      {element.code.dependencies.length > 0 && (
        <div className="px-4 py-3 border-t border-white/10">
          <p className="text-xs text-white/40 mb-2">Dependencies:</p>
          <div className="flex flex-wrap gap-2">
            {element.code.dependencies.map(dep => (
              <span key={dep.name} className="px-2 py-1 rounded bg-white/5 text-xs text-white/70">
                {dep.name}@{dep.version}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
```

---

# 7. Technical Architecture

## 7.1 Updated File Structure

```
ui-museum/
├── packages/
│   ├── web/                           # Main web app
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── chat/              # NEW: AI Chat
│   │   │   │   │   ├── ChatProvider.tsx
│   │   │   │   │   ├── ChatPanel.tsx
│   │   │   │   │   ├── ChatToggle.tsx
│   │   │   │   │   └── ...
│   │   │   │   ├── figma/             # NEW: Figma integration
│   │   │   │   │   ├── FigmaProvider.tsx
│   │   │   │   │   ├── FigmaSyncPanel.tsx
│   │   │   │   │   └── ...
│   │   │   │   └── ...
│   │   │   ├── elements/
│   │   │   │   ├── atoms/
│   │   │   │   │   ├── backgrounds/   # Expanded
│   │   │   │   │   ├── icons/         # Expanded
│   │   │   │   │   └── ...
│   │   │   │   ├── molecules/
│   │   │   │   │   ├── buttons/       # Expanded
│   │   │   │   │   └── ...
│   │   │   │   ├── organisms/         # Expanded
│   │   │   │   └── templates/         # Expanded
│   │   │   ├── library/
│   │   │   │   ├── arcade/            # Expanded (11→31)
│   │   │   │   ├── luxury/            # NEW zone
│   │   │   │   ├── brutalist/         # NEW zone
│   │   │   │   ├── vaporwave/         # NEW zone
│   │   │   │   ├── indie/             # NEW zone
│   │   │   │   ├── dashboard/         # NEW zone
│   │   │   │   └── ...
│   │   │   └── ...
│   │   └── package.json
│   │
│   ├── mcp-server/                    # NEW: MCP server
│   │   ├── src/
│   │   │   ├── index.ts
│   │   │   ├── server.ts
│   │   │   ├── tools/
│   │   │   └── ...
│   │   └── package.json
│   │
│   └── figma-plugin/                  # NEW: Figma plugin
│       ├── manifest.json
│       ├── code.ts
│       └── ui.html
│
├── scripts/
│   ├── generate-code-registry.ts      # Extract code from components
│   └── sync-figma.ts                  # Figma sync automation
│
├── EXPANSION_PLAN.md                  # This document
└── package.json
```

## 7.2 State Management Updates

```typescript
// packages/web/store/index.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GlobalStore {
  // Existing
  favorites: string[];
  recentlyViewed: string[];

  // NEW: Chat state
  chat: {
    isOpen: boolean;
    history: ChatMessage[];
    settings: ChatSettings;
  };

  // NEW: Figma state
  figma: {
    connected: boolean;
    token: string | null;
    connectedFiles: FigmaFile[];
  };

  // Actions
  toggleChat: () => void;
  connectFigma: (token: string) => void;
  // ... more actions
}

export const useStore = create<GlobalStore>()(
  persist(
    (set, get) => ({
      // ... implementation
    }),
    {
      name: 'ui-museum-store',
      partialize: (state) => ({
        favorites: state.favorites,
        recentlyViewed: state.recentlyViewed,
        chat: { settings: state.chat.settings },
        figma: { token: state.figma.token }
      })
    }
  )
);
```

## 7.3 API Routes (if using Next.js or similar)

```typescript
// pages/api/mcp/chat.ts
export default async function handler(req, res) {
  const { message, context } = req.body;

  // Forward to MCP server
  const response = await fetch('http://localhost:3001/chat', {
    method: 'POST',
    body: JSON.stringify({ message, context })
  });

  return res.json(await response.json());
}

// pages/api/figma/callback.ts
export default async function handler(req, res) {
  const { code } = req.query;

  // Exchange code for token
  const tokenResponse = await fetch('https://www.figma.com/api/oauth/token', {
    method: 'POST',
    body: new URLSearchParams({
      client_id: process.env.FIGMA_CLIENT_ID,
      client_secret: process.env.FIGMA_CLIENT_SECRET,
      code,
      grant_type: 'authorization_code',
      redirect_uri: process.env.FIGMA_REDIRECT_URI
    })
  });

  return res.redirect(`/?figma_token=${tokenResponse.access_token}`);
}
```

---

# 8. File Structure Changes

## 8.1 New Files Summary

| Phase | New Files | Description |
|-------|-----------|-------------|
| Chat | 15 files | Chat UI, MCP client, hooks |
| MCP Server | 12 files | Server, tools, utilities |
| Figma | 10 files | Figma integration |
| New Zones | 6 files | 5 zone index files + types |
| Zone Expansions | 55 files | ~5 new component files per zone |
| Atoms | 50 files | New atomic elements |
| Molecules | 40 files | New molecular elements |
| Organisms | 30 files | New organism elements |
| Templates | 15 files | New templates |
| **TOTAL** | **~233 new files** | |

## 8.2 Modified Files

| File | Changes |
|------|---------|
| App.tsx | Add ChatProvider, FigmaProvider wrappers |
| elements/registry.ts | Add new element categories, code field |
| data/zones.ts | Add 5 new zones |
| components/shared/ComponentDetail.tsx | Add code display tab |
| contexts/index.tsx | Export new contexts |
| package.json | Add new dependencies |

---

# 9. Implementation Timeline

## 9.1 Parallel Execution Tracks

```
Track A: AI Chatbot (can run parallel with B, C)
├── A1: MCP Server foundation
├── A2: Chat UI components
├── A3: Tool implementations
└── A4: Integration testing

Track B: Library Expansion (can run parallel with A, C)
├── B1: New zones creation
├── B2: Existing zone expansions
├── B3: New atoms/molecules
├── B4: New organisms/templates
└── B5: Code extraction

Track C: Figma Integration (can run parallel with A, B)
├── C1: OAuth setup
├── C2: Sync panel UI
├── C3: Export functionality
└── C4: Plugin development

Track D: Quality Assurance (sequential, after A/B/C)
├── D1: Component testing
├── D2: Integration testing
├── D3: Performance optimization
└── D4: Documentation
```

## 9.2 Sub-Phase Dependencies

```
Phase 1 (Foundation):
  A1, B1, C1 can run in parallel

Phase 2 (Core Development):
  A2 requires A1
  B2, B3 can run in parallel
  C2 requires C1

Phase 3 (Integration):
  A3 requires A1, A2
  B4 requires B2, B3
  C3 requires C1, C2

Phase 4 (Polish):
  A4 requires A3
  B5 requires B4
  C4 requires C3

Phase 5 (QA):
  D1-D4 require all Phase 4 completion
```

---

# 10. Risk Assessment

## 10.1 Technical Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| MCP API changes | High | Low | Pin MCP SDK version, abstract API layer |
| Figma API rate limits | Medium | Medium | Implement caching, batch requests |
| Component rendering performance | High | Medium | Virtual scrolling, lazy loading |
| Code storage bloat | Medium | High | Lazy load code, compress storage |
| Browser memory with 500+ components | High | Medium | Pagination, code splitting |

## 10.2 Development Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Scope creep in component creation | Medium | High | Strict component templates, review gates |
| Inconsistent code quality | High | Medium | ESLint, Prettier, code review |
| Design inconsistency across zones | Medium | Medium | Design token system, style guide |
| Breaking changes during expansion | High | Medium | Feature flags, incremental rollout |

## 10.3 Contingency Plans

1. **If MCP integration delayed**: Ship chat UI with placeholder, add MCP later
2. **If Figma API blocked**: Focus on export-only (no live sync)
3. **If component count overwhelming**: Prioritize top 300, defer rest to v2
4. **If performance issues**: Implement server-side rendering for catalog

---

# 11. Quality Assurance Plan

## 11.1 Component Testing

```typescript
// Each component must have:
// 1. Visual snapshot test
// 2. Accessibility test
// 3. Responsive test
// 4. Theme variant test

describe('NeonButton', () => {
  it('renders correctly', () => {
    const { container } = render(<NeonButton>Click</NeonButton>);
    expect(container).toMatchSnapshot();
  });

  it('is accessible', async () => {
    const { container } = render(<NeonButton>Click</NeonButton>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('works in all color variants', () => {
    ['green', 'pink', 'blue', 'purple'].forEach(color => {
      const { getByRole } = render(<NeonButton color={color}>Click</NeonButton>);
      expect(getByRole('button')).toHaveClass(`from-${color}-400`);
    });
  });
});
```

## 11.2 Integration Testing

```typescript
// Chat integration test
describe('Chat Integration', () => {
  it('searches components via MCP', async () => {
    render(<ChatPanel />);

    await userEvent.type(screen.getByRole('textbox'), 'neon button');
    await userEvent.click(screen.getByText('Send'));

    await waitFor(() => {
      expect(screen.getByText('NeonButton')).toBeInTheDocument();
    });
  });
});

// Figma integration test
describe('Figma Export', () => {
  it('exports component to Figma', async () => {
    mockFigmaApi();

    const { getByText } = render(<FigmaExportButton componentId="btn-neon" />);
    await userEvent.click(getByText('Export to Figma'));

    expect(mockFigmaPost).toHaveBeenCalledWith(
      expect.stringContaining('files'),
      expect.objectContaining({ name: 'NeonButton' })
    );
  });
});
```

## 11.3 Performance Benchmarks

| Metric | Target | Measurement |
|--------|--------|-------------|
| Initial load | < 2s | Lighthouse |
| Catalog render (500 items) | < 500ms | React profiler |
| Chat response | < 3s | Custom timing |
| Component preview | < 100ms | Custom timing |
| Code copy | < 50ms | Custom timing |

---

# 12. Success Metrics

## 12.1 Quantitative Metrics

| Metric | Current | Target |
|--------|---------|--------|
| Total components | 111 | 500+ |
| Zones | 11 | 16 |
| Components with code | 0 | 100% |
| Chat accuracy | N/A | > 90% |
| Figma exports | N/A | Working |

## 12.2 Qualitative Metrics

- [ ] Chat provides relevant component suggestions
- [ ] Code snippets are copy-paste ready
- [ ] All zones have consistent quality
- [ ] Figma export maintains design fidelity
- [ ] Performance remains smooth at scale

## 12.3 User Experience Goals

- [ ] Find any component in < 3 interactions
- [ ] Get working code in < 30 seconds
- [ ] Understand component usage from examples
- [ ] Export to Figma without manual adjustment
- [ ] Chat understands natural language queries

---

# Appendix A: Component Templates

## A.1 Zone Component Template

```typescript
// Template for new zone components

import React from 'react';

interface [ComponentName]Props {
  // Props definition
}

export const [ComponentName]: React.FC<[ComponentName]Props> = ({
  // Destructured props
}) => {
  return (
    <div className="[zone-specific-styles]">
      {/* Component content */}
    </div>
  );
};

// Registry entry
export const [componentName]Registry = {
  id: '[zone]-[component]',
  name: '[Component Name]',
  layer: '[atom|molecule|organism]',
  category: '[category]',
  description: '[Brief description]',
  themeAgnostic: false,
  zoneVariants: ['[zone-id]'],
  previewType: '[inline|card|fullwidth]',
  hasInteraction: [true|false],
  implementation: 'component',
  component: [ComponentName],
  tags: ['[tag1]', '[tag2]'],
  code: {
    tsx: `[Full code here]`,
    dependencies: [],
    example: `[Example usage]`,
    propsInterface: `[Props interface]`
  }
};
```

## A.2 Atomic Element Template

```typescript
// Template for atomic elements

export const [elementName]Registry: ElementEntry = {
  id: '[category]-[name]',
  name: '[Element Name]',
  layer: 'atom',
  category: '[backgrounds|borders|shadows|etc]',
  description: '[Description]',
  usage: '[How to use]',
  themeAgnostic: true,
  previewType: 'inline',
  hasInteraction: false,
  implementation: '[css-class|component|token]',
  cssClass: '[tailwind-classes]',
  codeSnippet: '[Example code]',
  tags: ['[tag1]', '[tag2]'],
  code: {
    tsx: `[Implementation]`,
    dependencies: [],
    example: `[Usage example]`,
    propsInterface: ``
  }
};
```

---

# Appendix B: MCP Tool Schemas

## B.1 Complete Tool Definitions

```json
{
  "tools": [
    {
      "name": "search_components",
      "description": "Search for UI components by name, description, tags, or style",
      "inputSchema": {
        "type": "object",
        "properties": {
          "query": { "type": "string" },
          "zone": { "type": "string" },
          "layer": { "type": "string", "enum": ["atom", "molecule", "organism", "template"] },
          "category": { "type": "string" },
          "limit": { "type": "number", "default": 10 }
        },
        "required": ["query"]
      }
    },
    {
      "name": "get_component_code",
      "description": "Get the full implementation code for a component",
      "inputSchema": {
        "type": "object",
        "properties": {
          "componentId": { "type": "string" },
          "format": { "type": "string", "enum": ["jsx", "tsx", "html", "css"], "default": "tsx" },
          "includeStyles": { "type": "boolean", "default": true },
          "includeImports": { "type": "boolean", "default": true }
        },
        "required": ["componentId"]
      }
    },
    {
      "name": "get_zone_info",
      "description": "Get information about a specific zone",
      "inputSchema": {
        "type": "object",
        "properties": {
          "zoneId": { "type": "string" }
        },
        "required": ["zoneId"]
      }
    },
    {
      "name": "generate_variation",
      "description": "Generate a variation of a component with different styling",
      "inputSchema": {
        "type": "object",
        "properties": {
          "componentId": { "type": "string" },
          "targetZone": { "type": "string" },
          "modifications": {
            "type": "object",
            "properties": {
              "colors": { "type": "object" },
              "sizing": { "type": "string", "enum": ["sm", "md", "lg", "xl"] },
              "animation": { "type": "string" },
              "variant": { "type": "string" }
            }
          }
        },
        "required": ["componentId"]
      }
    },
    {
      "name": "create_recipe",
      "description": "Create a recipe composition from multiple components",
      "inputSchema": {
        "type": "object",
        "properties": {
          "name": { "type": "string" },
          "components": {
            "type": "array",
            "items": { "type": "string" }
          },
          "layout": { "type": "string", "enum": ["stack", "grid", "flex", "custom"] },
          "spacing": { "type": "string" }
        },
        "required": ["name", "components"]
      }
    },
    {
      "name": "export_to_figma",
      "description": "Export components to a Figma file",
      "inputSchema": {
        "type": "object",
        "properties": {
          "componentIds": {
            "type": "array",
            "items": { "type": "string" }
          },
          "fileKey": { "type": "string" },
          "pageId": { "type": "string" }
        },
        "required": ["componentIds", "fileKey"]
      }
    },
    {
      "name": "analyze_design",
      "description": "Analyze a design image and suggest similar components",
      "inputSchema": {
        "type": "object",
        "properties": {
          "imageUrl": { "type": "string" },
          "analysisType": { "type": "string", "enum": ["components", "colors", "layout", "full"] }
        },
        "required": ["imageUrl"]
      }
    }
  ]
}
```

---

# Appendix C: Environment Variables

```env
# .env.example

# MCP Server
MCP_SERVER_PORT=3001
MCP_SERVER_HOST=localhost

# Figma Integration
FIGMA_CLIENT_ID=your_client_id
FIGMA_CLIENT_SECRET=your_client_secret
FIGMA_REDIRECT_URI=http://localhost:3000/api/figma/callback

# Claude API (for MCP)
ANTHROPIC_API_KEY=your_api_key

# Analytics (optional)
POSTHOG_KEY=your_posthog_key
SENTRY_DSN=your_sentry_dsn
```

---

# Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2024-12-30 | Claude | Initial comprehensive plan |
| 1.1 | 2024-12-30 | Claude | Updated with implementation status |

---

# Implementation Status Tracker

## Overall Progress (Updated December 30, 2024)

| Phase | Status | Progress | Priority |
|-------|--------|----------|----------|
| **Phase 0: Modernization** | 🔴 Not Started | 0% | **CRITICAL - DO FIRST** |
| Phase 1: AI Chatbot | 🟡 In Progress | 60% | High |
| Phase 2: Library Expansion | 🟡 In Progress | 40% | Medium (after Phase 0) |
| Phase 3: Figma Integration | 🔴 Not Started | 0% | Low |
| Phase 4: Full Code Implementation | 🔴 Not Started | 0% | Low |

## Phase 0: Modernization & Style Overhaul (NEW - CRITICAL)

> ⚠️ **BLOCKING**: This phase must be completed before adding new components.
> Current components look dated and gimmicky. Fix the foundation first.

### Research Phase ✅ COMPLETED
- [x] Shopify Winter Edition analysis (burning transitions, CRT effects)
- [x] Aceternity UI patterns (70+ modern components)
- [x] Premium design systems (Linear, Vercel, Stripe, Apple)
- [x] WebGL/Shader effects (dissolve, particles, gradient mesh)
- [x] Modern transitions (View Transitions API, FLIP, springs)
- [x] Altcarbon.com (glass morphism, subtle animations)
- [x] Micro.so (premium SaaS patterns)
- [x] Current library issues identified

### Implementation Phase ❌ NOT STARTED
- [ ] Step 0.1: Create design tokens (timing, easing, colors, spacing)
- [ ] Step 0.2: Update global animation defaults
- [ ] Step 0.3: Create reusable animation utilities
- [ ] Step 0.4: Fix Arcade zone (reduce glow, faster animations)
- [ ] Step 0.5: Fix Cosmic zone (reduce particles, softer glass)
- [ ] Step 0.6: Fix Cyberpunk zone (glitch on hover only, muted neon)
- [ ] Step 0.7: Fix Hacker zone (reduce matrix density, softer green)
- [ ] Step 0.8: Fix remaining 7 zones
- [ ] Step 0.9: Add modern transition effects library
- [ ] Step 0.10: Add premium hover effects (tilt, magnetic, glow)
- [ ] Step 0.11: Performance optimization
- [ ] Step 0.12: Accessibility audit

### Quick Wins (Can Do Immediately)
- [ ] Change `#000000` → `#0a0a0a` globally
- [ ] Change animation durations `500ms` → `200ms`
- [ ] Reduce glow from `0 0 30px` → `0 0 10px`
- [ ] Reduce hover scale from `1.1` → `1.03`
- [ ] Add `prefers-reduced-motion` media query

## Phase 1: AI Chatbot

### Completed ✅
- [x] Chat UI Components (ChatProvider, ChatPanel, ChatToggle, ChatInput, ChatMessage)
- [x] Chat hooks directory structure
- [x] MCP Server package structure
- [x] Basic element search in MCP

### Remaining
- [ ] Full MCP tools implementation
- [ ] useMCPClient hook (actual API integration)
- [ ] Voice input support
- [ ] Chat history persistence

## Phase 2: Library Expansion

### New Zones Created (5/5) ✅
- [x] Underwater Depths (10 components)
- [x] Steampunk Workshop (10 components)
- [x] Cyberpunk District (10 components)
- [x] Medieval Scriptorium (10 components)
- [x] Space Station (10 components)

### Original Planned Zones (0/5) ❌
> These should be created AFTER Phase 0 modernization
- [ ] Luxury Showroom (gold, marble, premium)
- [ ] Brutalist Bunker (raw, mono, anti-design)
- [ ] Vaporwave Dreamscape (pink sunsets, retro)
- [ ] Indie App Workshop (friendly, startup vibes)
- [ ] Data Dashboard (analytics, enterprise)

### Zone Expansions ❌ NOT STARTED
> Existing zones need modernization (Phase 0) BEFORE expansion

| Zone | Current | Planned | Status |
|------|---------|---------|--------|
| arcade-basement | 11 | +20 → 31 | ⏸️ Waiting for Phase 0 |
| pulp-detective | 9 | +18 → 27 | ⏸️ Waiting for Phase 0 |
| hacker-terminal | 10 | +22 → 32 | ⏸️ Waiting for Phase 0 |
| mad-science | 10 | +18 → 28 | ⏸️ Waiting for Phase 0 |
| physics-playground | 9 | +16 → 25 | ⏸️ Waiting for Phase 0 |
| organic-garden | 10 | +15 → 25 | ⏸️ Waiting for Phase 0 |
| cosmic-observatory | 8 | +20 → 28 | ⏸️ Waiting for Phase 0 |
| retro-office | 10 | +17 → 27 | ⏸️ Waiting for Phase 0 |
| cinema-stage | 8 | +18 → 26 | ⏸️ Waiting for Phase 0 |
| geometry-lab | 9 | +16 → 25 | ⏸️ Waiting for Phase 0 |
| artist-studio | 9 | +15 → 24 | ⏸️ Waiting for Phase 0 |

## Phase 3: Figma Integration ❌ NOT STARTED
- [ ] FigmaProvider component
- [ ] FigmaConnectModal (OAuth flow)
- [ ] FigmaSyncPanel
- [ ] FigmaExportButton
- [ ] Figma API utilities
- [ ] Figma plugin (optional)

## Phase 4: Full Code Implementation ❌ NOT STARTED
- [ ] Code storage structure in registry
- [ ] CodeDisplay component with syntax highlighting
- [ ] Copy-to-clipboard functionality
- [ ] Props interface display
- [ ] Example usage display
- [ ] Dependencies listing

## Bug Fixes Completed
- [x] MapPin icon missing export (fixed December 30, 2024)

## Test Coverage
- [x] ExportService tests (20 tests)
- [x] Element search/themes/zones tests (49 tests)
- [x] MCP tools tests (34 tests)
- **Total: 103 tests passing**

---

# Recommended Implementation Order

## Immediate Priority (This Week)
1. **Phase 0 Quick Wins** - Global CSS updates (backgrounds, timing, glow reduction)
2. **Phase 0 Steps 0.1-0.3** - Design tokens and animation utilities
3. **Phase 0 Steps 0.4-0.7** - Fix critical zones (Arcade, Cosmic, Cyber, Hacker)

## Short Term (Next 2 Weeks)
4. **Phase 0 Step 0.8** - Fix remaining zones
5. **Phase 0 Steps 0.9-0.10** - Modern transitions and hover effects
6. **Phase 0 Steps 0.11-0.12** - Performance and accessibility

## Medium Term (Following Month)
7. **Phase 2** - Add 5 originally planned zones (with modern styling)
8. **Phase 2** - Expand existing zones (+15-22 components each)
9. **Phase 1** - Complete MCP integration

## Long Term
10. **Phase 3** - Figma integration
11. **Phase 4** - Full code implementation

---

# Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2024-12-30 | Claude | Initial comprehensive plan |
| 1.1 | 2024-12-30 | Claude | Updated with implementation status |
| **2.0** | **2024-12-30** | **Claude** | **Added Phase 0 Modernization based on 8-agent research. Detailed step-by-step plan. Research findings integrated.** |

---

**END OF DOCUMENT**
