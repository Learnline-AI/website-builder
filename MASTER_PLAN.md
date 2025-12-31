# UI Museum: Website Builder Platform
## Master Plan Document v1.4

> **Single Source of Truth** for transforming UI Museum from a component showcase into a full website builder platform with AI-assisted design capabilities.

### Key Decisions (v1.4)
| Decision | Choice | Rationale | Validated |
|----------|--------|-----------|-----------|
| Storage Backend | PostgreSQL + IndexedDB (cache only) | Full DB management, online-only for v1 | ✅ |
| Backend Architecture | Unified server + separate MCP | Single `npm run dev`, simpler DX | ✅ |
| Multi-User Support | Single user (v1) | Simplicity first | ✅ |
| Tailwind Version | v3 (stable, build-time) | Compatibility, stability, tree-shaking | ✅ |
| Visual Editor | **Custom build** (@dnd-kit + react-rnd) | Framer-like canvas; Puck cannot deliver | ✅ |
| Recipe Format | Puck-inspired JSON | Our extensions, not fully Puck-compatible | ✅ |
| Asset Handling | Local upload with export bundling | Self-contained exports | ✅ |
| Hybrid Flow | Shared PostgreSQL + WebSocket sync | Real-time sync required for hybrid | ✅ |
| Token System | CSS variables | DTCG rejected as overkill for web-only v1 | ✅ |
| Analytics | Event hooks only | Full analytics not needed for single-user | ✅ |
| Element Registry | Static TypeScript | Version controlled, shared package | ✅ |
| Offline Support | Online-only (v1) | Eliminates sync complexity | ✅ |
| Per-block Responsive | Deferred to v1.1 | Components self-responsive | ✅ |

---

## Table of Contents

1. [Vision & Goals](#1-vision--goals)
2. [User Personas & Jobs-to-be-Done](#2-user-personas--jobs-to-be-done)
3. [User Flows](#3-user-flows)
4. [System Architecture](#4-system-architecture)
5. [Data Models](#5-data-models)
6. [Component Library System](#6-component-library-system)
7. [Theme & Token System](#7-theme--token-system)
8. [Recipe & Composition System](#8-recipe--composition-system)
9. [MCP Integration](#9-mcp-integration)
10. [Visual Editor](#10-visual-editor)
11. [Search & Discovery](#11-search--discovery)
12. [Export & Deployment](#12-export--deployment)
13. [Library Expansion Pipeline](#13-library-expansion-pipeline)
14. [Technical Implementation Phases](#14-technical-implementation-phases)
15. [Open Questions & Decisions](#15-open-questions--decisions)
16. [Success Metrics](#16-success-metrics)
17. [Appendices](#17-appendices)
18. [Research Review & Decision Rationale](#18-research-review--decision-rationale)

---

## 1. Vision & Goals

### 1.1 Vision Statement

Transform UI Museum from a static component showcase into a **dual-mode website builder** where users can:

1. **Chat with an AI agent** (via MCP) to generate pages by describing what they want
2. **Browse a massive library** and manually compose pages by selecting and arranging components
3. **Keep expanding the library** by extracting patterns from existing websites

### 1.2 Core Value Propositions

| For | Value |
|-----|-------|
| **Designers** | Skip Figma-to-code handoff; build real sites from proven components |
| **Developers** | Get production-ready React/Tailwind code, not just mockups |
| **Agencies** | Rapidly prototype client sites using a curated design inventory |
| **AI/Claude Users** | Natural language interface to a massive component library |

### 1.3 Goals

**Primary Goals:**
- [ ] Enable page creation via natural language (MCP chat)
- [ ] Enable page creation via visual composition (browse + drag/click)
- [ ] Export production-ready React/Tailwind code
- [ ] Support theming/styling customization
- [ ] Provide a growing, versioned component library

**Secondary Goals:**
- [ ] Extract design patterns from external websites (Collector)
- [ ] Support team collaboration on projects
- [ ] Integrate with deployment platforms (Vercel, Netlify)
- [ ] Enable custom component contribution

### 1.4 Non-Goals (v1)

- CMS functionality (content database, dynamic content)
- E-commerce features (cart, checkout, payments)
- Backend/API generation
- Multi-framework output (Vue, Svelte) - React/Tailwind only
- Multi-user accounts and collaboration (single user for v1)

---

## 2. User Personas & Jobs-to-be-Done

### 2.1 Primary Personas

#### Persona A: "The Rapid Prototyper" (Designer/Developer)
- **Context:** Building landing pages, portfolios, marketing sites
- **Frustration:** Spending days building what should take hours
- **Job:** "Help me create a professional-looking page in under an hour"
- **Success:** Exports clean React code they can customize further

#### Persona B: "The AI-First Builder" (Claude Code User)
- **Context:** Using Claude Code daily for development tasks
- **Frustration:** AI generates generic UI, doesn't know their design system
- **Job:** "Let me describe what I want and get it built from my library"
- **Success:** Natural language creates pages using their curated components

#### Persona C: "The Design Collector" (Agency/Freelancer)
- **Context:** Finds inspiration from many sites, wants to reuse patterns
- **Frustration:** Can't easily extract and reuse design patterns
- **Job:** "Let me build an inventory of patterns I can remix"
- **Success:** Extracts components from sites, adds to library, uses in projects

### 2.2 Jobs-to-be-Done Matrix

| Job | Persona A | Persona B | Persona C |
|-----|-----------|-----------|-----------|
| Browse components | ★★★ | ★ | ★★★ |
| Search components | ★★★ | ★★ | ★★★ |
| Chat to create page | ★★ | ★★★ | ★★ |
| Compose page visually | ★★★ | ★ | ★★ |
| Customize theme | ★★★ | ★★ | ★★★ |
| Export code | ★★★ | ★★★ | ★★ |
| Extract from URLs | ★ | ★ | ★★★ |
| Add custom components | ★★ | ★ | ★★★ |

---

## 3. User Flows

### 3.1 Flow A: Chat-Based Page Creation (MCP)

```
┌─────────────────────────────────────────────────────────────────┐
│                     CHAT-BASED FLOW                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  User (in Claude Code)         System                          │
│  ────────────────────         ──────                           │
│                                                                 │
│  1. "Create a landing page     MCP: search_elements            │
│      for my SaaS product       → Returns relevant components   │
│      with pricing section"                                      │
│           │                                                     │
│           ▼                                                     │
│  2. Claude selects components  MCP: get_element (×N)           │
│     from search results        → Returns component details     │
│           │                                                     │
│           ▼                                                     │
│  3. Claude composes recipe     MCP: create_recipe              │
│     with selected components   → Validates & saves recipe      │
│           │                                                     │
│           ▼                                                     │
│  4. Preview URL returned       MCP: preview_recipe             │
│     User sees live preview     → Returns preview URL           │
│           │                                                     │
│           ▼                                                     │
│  5. "Make the hero more        MCP: update_recipe              │
│      minimal, change theme     → Updates recipe                │
│      to dark"                  → Returns new preview           │
│           │                                                     │
│           ▼                                                     │
│  6. "Export the code"          MCP: export_recipe              │
│                                → Returns React/Tailwind files  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 3.2 Flow B: Browse-Based Page Creation (Visual)

```
┌─────────────────────────────────────────────────────────────────┐
│                    BROWSE-BASED FLOW                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ STEP 1: Create Project                                    │  │
│  │ ┌─────────────────────────────────────────────────────┐  │  │
│  │ │  + New Project                                       │  │  │
│  │ │  ─────────────────                                   │  │  │
│  │ │  Name: [My SaaS Site          ]                     │  │  │
│  │ │  Theme: [● Default ○ Dark ○ Brutal ○ Neon]          │  │  │
│  │ │                                                      │  │  │
│  │ │  [Create Project]                                    │  │  │
│  │ └─────────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              │                                  │
│                              ▼                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ STEP 2: Add Sections                                      │  │
│  │ ┌────────────┬───────────────────────────────────────┐   │  │
│  │ │  Library   │   Canvas (Recipe Preview)              │   │  │
│  │ │            │                                        │   │  │
│  │ │ ┌────────┐ │   ┌────────────────────────────────┐  │   │  │
│  │ │ │ Hero   │ │   │  + Add Section                  │  │   │  │
│  │ │ │ ────── │ │   │                                 │  │   │  │
│  │ │ │ [img]  │─┼──▶│  ┌─────────────────────────┐   │  │   │  │
│  │ │ │ [img]  │ │   │  │      Hero Section       │   │  │   │  │
│  │ │ │ [img]  │ │   │  │  "Welcome to Our SaaS"  │   │  │   │  │
│  │ │ └────────┘ │   │  └─────────────────────────┘   │  │   │  │
│  │ │            │   │                                 │  │   │  │
│  │ │ ┌────────┐ │   │  ┌─────────────────────────┐   │  │   │  │
│  │ │ │Features│ │   │  │    Features Section     │   │  │   │  │
│  │ │ └────────┘ │   │  └─────────────────────────┘   │  │   │  │
│  │ │            │   │                                 │  │   │  │
│  │ │ ┌────────┐ │   │  + Add Section                  │  │   │  │
│  │ │ │Pricing │ │   │                                 │  │   │  │
│  │ │ └────────┘ │   └────────────────────────────────┘  │   │  │
│  │ └────────────┴───────────────────────────────────────┘   │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              │                                  │
│                              ▼                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ STEP 3: Edit Content                                      │  │
│  │                                                           │  │
│  │  Click section → Side panel opens                         │  │
│  │  ┌─────────────────────────────────────────────────────┐ │  │
│  │  │ Edit: Hero Section                                   │ │  │
│  │  │ ───────────────────                                  │ │  │
│  │  │ Title: [Welcome to Our SaaS    ]                    │ │  │
│  │  │ Subtitle: [Build faster with AI]                    │ │  │
│  │  │ CTA Text: [Get Started         ]                    │ │  │
│  │  │ CTA Link: [/signup             ]                    │ │  │
│  │  │ Image: [Upload] or [URL]                            │ │  │
│  │  │                                                      │ │  │
│  │  │ [Save] [Cancel]                                      │ │  │
│  │  └─────────────────────────────────────────────────────┘ │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              │                                  │
│                              ▼                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ STEP 4: Preview & Export                                  │  │
│  │                                                           │  │
│  │  [Desktop] [Tablet] [Mobile]    [Export ▼] [Deploy ▼]    │  │
│  │                                                           │  │
│  │  ┌─────────────────────────────────────────────────────┐ │  │
│  │  │              Full Page Preview                       │ │  │
│  │  │                                                      │ │  │
│  │  │         (Live rendered page)                         │ │  │
│  │  │                                                      │ │  │
│  │  └─────────────────────────────────────────────────────┘ │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 3.3 Flow C: Hybrid Flow (Chat + Visual)

```
┌─────────────────────────────────────────────────────────────────┐
│                       HYBRID FLOW                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. Start with Chat                                             │
│     User: "Create a portfolio site"                             │
│     Claude: Creates initial recipe via MCP                      │
│           │                                                     │
│           ▼                                                     │
│  2. Open in Visual Editor                                       │
│     User clicks "Edit in Browser"                               │
│     Recipe loads in visual editor                               │
│           │                                                     │
│           ▼                                                     │
│  3. Visual Tweaks                                               │
│     User reorders sections                                      │
│     User changes hero variant                                   │
│     User edits content                                          │
│           │                                                     │
│           ▼                                                     │
│  4. Back to Chat                                                │
│     User: "Make the colors more vibrant"                        │
│     Claude: Updates theme tokens via MCP                        │
│     Visual editor refreshes automatically                       │
│           │                                                     │
│           ▼                                                     │
│  5. Export                                                      │
│     User exports from either chat or visual editor              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 3.4 Flow D: Library Expansion (Collector)

```
┌─────────────────────────────────────────────────────────────────┐
│                    LIBRARY EXPANSION FLOW                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Option A: URL Extraction                                 │   │
│  │                                                          │   │
│  │ 1. User enters URL: [https://stripe.com/pricing    ]    │   │
│  │                                                          │   │
│  │ 2. System extracts:                                      │   │
│  │    ├── Colors (clustered to palette)                     │   │
│  │    ├── Typography (font families, scale)                 │   │
│  │    ├── Spacing (grid system)                             │   │
│  │    ├── Shadows (soft, hard, glow)                        │   │
│  │    └── Component patterns (nav, cards, pricing)          │   │
│  │                                                          │   │
│  │ 3. User reviews extracted tokens                         │   │
│  │    [✓ Colors] [✓ Typography] [✗ Spacing] [✓ Shadows]    │   │
│  │                                                          │   │
│  │ 4. Save as theme: [stripe-inspired]                      │   │
│  │                                                          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Option B: Component Contribution                         │   │
│  │                                                          │   │
│  │ 1. User clicks "Add Component"                           │   │
│  │                                                          │   │
│  │ 2. Provides:                                             │   │
│  │    ├── Component code (React/Tailwind)                   │   │
│  │    ├── Name and description                              │   │
│  │    ├── Category (buttons, cards, heroes, etc.)           │   │
│  │    ├── Variants (if any)                                 │   │
│  │    └── Props/slots definition                            │   │
│  │                                                          │   │
│  │ 3. System validates:                                     │   │
│  │    ├── Code compiles                                     │   │
│  │    ├── Uses CSS variables (themeable)                    │   │
│  │    ├── Accessibility checks pass                         │   │
│  │    └── No external dependencies                          │   │
│  │                                                          │   │
│  │ 4. Component added to personal library                   │   │
│  │    (optional: submit to public library)                  │   │
│  │                                                          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. System Architecture

### 4.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           UI MUSEUM PLATFORM                            │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────┐ │
│  │   Claude Code   │  │   Web Browser   │  │    Extraction Agent     │ │
│  │   (MCP Client)  │  │  (Visual Editor)│  │   (Headless Browser)    │ │
│  └────────┬────────┘  └────────┬────────┘  └────────────┬────────────┘ │
│           │                    │                        │               │
│           │ JSON-RPC           │ REST/WS                │ Internal      │
│           │                    │                        │               │
│  ┌────────▼────────────────────▼────────────────────────▼────────────┐ │
│  │                         API LAYER                                  │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌───────────┐│ │
│  │  │ MCP Server  │  │  REST API   │  │  WebSocket  │  │ Extractor ││ │
│  │  │  (Tools)    │  │  (CRUD)     │  │  (Preview)  │  │   API     ││ │
│  │  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └─────┬─────┘│ │
│  └─────────┼────────────────┼────────────────┼───────────────┼──────┘ │
│            │                │                │               │         │
│  ┌─────────▼────────────────▼────────────────▼───────────────▼──────┐ │
│  │                       CORE SERVICES                               │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌──────────┐│ │
│  │  │   Recipe    │  │   Theme     │  │   Search    │  │  Export  ││ │
│  │  │   Engine    │  │   Engine    │  │   Engine    │  │  Engine  ││ │
│  │  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └────┬─────┘│ │
│  └─────────┼────────────────┼────────────────┼──────────────┼──────┘ │
│            │                │                │              │         │
│  ┌─────────▼────────────────▼────────────────▼──────────────▼──────┐ │
│  │                    DATA ACCESS LAYER                              │ │
│  │                                                                    │ │
│  │    ┌──────────────────────────────────────────────────────────┐   │ │
│  │    │                   Repository Pattern                      │   │ │
│  │    │  ProjectRepo | RecipeRepo | ThemeRepo | AssetRepo         │   │ │
│  │    └──────────────────────────┬───────────────────────────────┘   │ │
│  │                               │                                    │ │
│  │    ┌──────────────────────────▼───────────────────────────────┐   │ │
│  │    │              PostgreSQL (Primary Storage)                 │   │ │
│  │    │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐ │   │ │
│  │    │  │ projects │ │ recipes  │ │  themes  │ │    assets    │ │   │ │
│  │    │  └──────────┘ └──────────┘ └──────────┘ └──────────────┘ │   │ │
│  │    └──────────────────────────────────────────────────────────┘   │ │
│  │                               ↕                                    │ │
│  │    ┌──────────────────────────────────────────────────────────┐   │ │
│  │    │              IndexedDB (Offline Cache)                    │   │ │
│  │    │  Syncs with PostgreSQL, enables offline editing          │   │ │
│  │    └──────────────────────────────────────────────────────────┘   │ │
│  │                                                                    │ │
│  │    ┌──────────────────────────────────────────────────────────┐   │ │
│  │    │              File System (Asset Storage)                  │   │ │
│  │    │  Local uploads stored on disk, paths in PostgreSQL       │   │ │
│  │    └──────────────────────────────────────────────────────────┘   │ │
│  │                                                                    │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Storage Architecture (PostgreSQL + IndexedDB Cache)

> **v1 Simplification:** Online-only mode. IndexedDB is read-cache only, not offline storage.
> This eliminates sync conflicts. Offline support can be added in v1.1 if needed.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         STORAGE ARCHITECTURE                            │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌────────────────────────────────────────────────────────────────────┐│
│  │                 POSTGRESQL (Primary & Only Write Target)           ││
│  │                                                                    ││
│  │  ▪ Source of truth for ALL data                                   ││
│  │  ▪ Full ACID compliance                                           ││
│  │  ▪ Complex queries (search, filtering, joins)                     ││
│  │  ▪ Schema migrations via Prisma                                   ││
│  │  ▪ Accessed by unified server (REST API) and MCP server           ││
│  │                                                                    ││
│  │  Tables:                                                          ││
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ││
│  │  │  projects   │ │   pages     │ │   recipes   │ │   themes    │ ││
│  │  │  ─────────  │ │  ─────────  │ │  ─────────  │ │  ─────────  │ ││
│  │  │  id (PK)    │ │  id (PK)    │ │  id (PK)    │ │  id (PK)    │ ││
│  │  │  name       │ │  project_id │ │  page_id    │ │  name       │ ││
│  │  │  theme_id   │ │  path       │ │  content    │ │  tokens     │ ││
│  │  │  settings   │ │  meta       │ │  meta       │ │  is_builtin │ ││
│  │  │  created_at │ │  created_at │ │  version    │ │  source_url │ ││
│  │  │  updated_at │ │  updated_at │ │  updated_at │ │  created_at │ ││
│  │  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ ││
│  │                                                                    ││
│  │  ┌─────────────┐ ┌─────────────┐                                  ││
│  │  │   assets    │ │ extractions │  Note: Element registry is       ││
│  │  │  ─────────  │ │  ─────────  │  STATIC TypeScript, not in DB.   ││
│  │  │  id (PK)    │ │  id (PK)    │  Imported by both server and     ││
│  │  │  project_id │ │  url        │  MCP from shared package.        ││
│  │  │  type       │ │  tokens     │                                  ││
│  │  │  filename   │ │  patterns   │                                  ││
│  │  │  local_path │ │  status     │                                  ││
│  │  │  uploaded_at│ │  created_at │                                  ││
│  │  └─────────────┘ └─────────────┘                                  ││
│  └────────────────────────────────────────────────────────────────────┘│
│                                    │                                    │
│                            Read + Invalidate                            │
│                                    ↓                                    │
│  ┌────────────────────────────────────────────────────────────────────┐│
│  │                    INDEXEDDB (Read Cache Only - v1)                ││
│  │                                                                    ││
│  │  ▪ Caches frequently accessed data for performance                ││
│  │  ▪ READ-ONLY in v1 (all writes go to PostgreSQL)                  ││
│  │  ▪ Invalidated via WebSocket events                               ││
│  │  ▪ No offline writes = no sync conflicts                          ││
│  │                                                                    ││
│  │  Object Stores:                                                   ││
│  │  - projects, pages, recipes, themes (read cache)                  ││
│  │  - NO sync_queue (online-only)                                    ││
│  │                                                                    ││
│  │  Cache Invalidation:                                              ││
│  │  - WebSocket event received → clear relevant cache                ││
│  │  - Next read fetches fresh from PostgreSQL                        ││
│  └────────────────────────────────────────────────────────────────────┘│
│                                                                         │
│  WHY ONLINE-ONLY FOR v1:                                               │
│  ▪ Single-user local tool - rarely "offline" from localhost           │
│  ▪ MCP requires Claude Code which requires internet anyway            │
│  ▪ Eliminates entire class of sync/conflict bugs                      │
│  ▪ Can add offline support in v1.1 when actual need demonstrated      │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 4.3 Hybrid Flow Architecture (Shared Storage)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    HYBRID FLOW: MCP + VISUAL EDITOR                     │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Both interfaces access the SAME PostgreSQL database!                   │
│                                                                         │
│  ┌─────────────────────┐          ┌─────────────────────┐              │
│  │   Claude Code       │          │   Visual Editor     │              │
│  │   (MCP Client)      │          │   (Web Browser)     │              │
│  └──────────┬──────────┘          └──────────┬──────────┘              │
│             │                                │                          │
│             │ MCP Protocol                   │ REST/WebSocket           │
│             │                                │                          │
│  ┌──────────▼──────────┐          ┌──────────▼──────────┐              │
│  │   MCP Server        │          │   Web Server        │              │
│  │   (Node.js)         │          │   (API routes)      │              │
│  └──────────┬──────────┘          └──────────┬──────────┘              │
│             │                                │                          │
│             └────────────┬───────────────────┘                          │
│                          │                                              │
│                          ▼                                              │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │                      SHARED SERVICES LAYER                         │ │
│  │                                                                    │ │
│  │   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐            │ │
│  │   │ RecipeService│  │ ThemeService │  │ AssetService │            │ │
│  │   │              │  │              │  │              │            │ │
│  │   │ - create     │  │ - list       │  │ - upload     │            │ │
│  │   │ - update     │  │ - apply      │  │ - serve      │            │ │
│  │   │ - delete     │  │ - customize  │  │ - bundle     │            │ │
│  │   │ - render     │  │              │  │              │            │ │
│  │   └──────────────┘  └──────────────┘  └──────────────┘            │ │
│  │                                                                    │ │
│  └───────────────────────────────────────────────────────────────────┘ │
│                          │                                              │
│                          ▼                                              │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │                        POSTGRESQL                                  │ │
│  │                                                                    │ │
│  │   ▪ MCP creates recipe → saved to recipes table                   │ │
│  │   ▪ Visual editor opens same recipe → reads from recipes table    │ │
│  │   ▪ Visual editor edits → updates recipes table                   │ │
│  │   ▪ MCP queries for recipes → sees visual editor's changes        │ │
│  │                                                                    │ │
│  │   Real-time sync via WebSocket (REQUIRED for hybrid flow)         │ │
│  │                                                                    │ │
│  └───────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│  WORKFLOW EXAMPLE:                                                      │
│  ─────────────────                                                      │
│  1. User in Claude: "Create a landing page for my SaaS"                │
│  2. MCP Server: create_recipe() → INSERT INTO recipes                  │
│  3. MCP returns: "Created! Open http://localhost:5173/edit/abc123"     │
│  4. User clicks link → Visual Editor loads recipe from PostgreSQL      │
│  5. User drags new section in Visual Editor → UPDATE recipes           │
│  6. WebSocket broadcasts recipe:updated event                          │
│  7. User back to Claude: "Add a testimonials section"                  │
│  8. MCP Server: update_recipe() → reads CURRENT state, adds section    │
│  9. Visual Editor auto-refreshes (receives WebSocket event)            │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

**WebSocket Synchronization (REQUIRED):**

The hybrid flow requires real-time sync to prevent data loss:

| Event | Trigger | Subscribers |
|-------|---------|-------------|
| `recipe:created` | MCP or Editor creates recipe | All connected editors |
| `recipe:updated` | Any recipe change | Editors viewing that recipe |
| `recipe:deleted` | Recipe deletion | Editors viewing that recipe |
| `project:updated` | Project settings change | Editors in that project |

**Connection Handling:**
- WebSocket auto-reconnects on disconnect
- Visual Editor shows "Reconnecting..." banner when disconnected
- Writes blocked during disconnection (online-only mode)
- On reconnect, editor fetches fresh state from PostgreSQL

**Edit Conflict Prevention (v1):**

Since v1 is online-only, conflicts are **prevented** rather than resolved:

1. **Auto-Save on Blur:**
   - Visual Editor saves when user leaves tab/window
   - 2-second debounce on changes (not instant, batched)
   - Ensures state persists before user switches to Claude

2. **Soft Edit Lock:**
   - When Visual Editor opens a recipe, server records `last_edited_at` timestamp
   - MCP checks if recipe was edited < 30 seconds ago
   - If recent, MCP warns: "Recipe may be open in editor. Continue anyway? (y/n)"
   - User decides—no hard blocking (single user can override)

3. **Read-Before-Write:**
   - Both MCP and Editor always read latest from DB before writing
   - After write, broadcast update event
   - Other clients refresh to latest state

**Why No Full Locking:**
- Single user may have multiple Claude windows open
- Hard locks create abandoned lock problems
- Simple warning + auto-save is sufficient for single-user v1

**Future (v1.1):** Consider operational transforms if collaborative multi-user editing added.

### 4.4 Component Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        COMPONENT ARCHITECTURE                           │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│                    ┌─────────────────────────┐                         │
│                    │     MCP SERVER          │                         │
│                    │  (Claude Interface)     │                         │
│                    └───────────┬─────────────┘                         │
│                                │                                        │
│         ┌──────────────────────┼──────────────────────┐                │
│         │                      │                      │                │
│         ▼                      ▼                      ▼                │
│  ┌─────────────┐       ┌─────────────┐       ┌─────────────┐          │
│  │  COLLECTOR  │       │   UNIFIER   │       │   CREATOR   │          │
│  │  (Extract)  │       │   (Theme)   │       │  (Recipe)   │          │
│  ├─────────────┤       ├─────────────┤       ├─────────────┤          │
│  │ URL Parser  │       │ Token Store │       │ Recipe Store│          │
│  │ Style       │       │ Theme       │       │ Recipe      │          │
│  │ Extractor   │       │ Resolver    │       │ Renderer    │          │
│  │ Pattern     │       │ CSS Var     │       │ Slot        │          │
│  │ Detector    │       │ Generator   │       │ Resolver    │          │
│  │ Inventory   │       │ Theme       │       │ Validator   │          │
│  │ Manager     │       │ Switcher    │       │             │          │
│  └──────┬──────┘       └──────┬──────┘       └──────┬──────┘          │
│         │                     │                     │                  │
│         └─────────────────────┼─────────────────────┘                  │
│                               │                                        │
│                               ▼                                        │
│                    ┌─────────────────────────┐                         │
│                    │    ELEMENT REGISTRY     │                         │
│                    │   (650+ Components)     │                         │
│                    ├─────────────────────────┤                         │
│                    │ Atoms (350+)            │                         │
│                    │ Molecules (144+)        │                         │
│                    │ Organisms (156+)        │                         │
│                    │ Templates (61+)         │                         │
│                    └─────────────────────────┘                         │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 4.5 Backend Architecture

> **Key Decision:** Unified web server + separate MCP process. Single `npm run dev` command.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        BACKEND ARCHITECTURE                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  DEVELOPMENT MODE:                                                           │
│  ─────────────────                                                           │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                    UNIFIED WEB SERVER (Express)                          ││
│  │                         Port 5173                                        ││
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐ ││
│  │  │    Vite     │  │   REST API  │  │  WebSocket  │  │  Static Files   │ ││
│  │  │ Middleware  │  │   Routes    │  │   Server    │  │   /uploads/*    │ ││
│  │  │  (dev HMR)  │  │  /api/*     │  │   /ws       │  │                 │ ││
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────────┘ ││
│  │                          │                │                              ││
│  │                          └────────┬───────┘                              ││
│  │                                   ▼                                      ││
│  │                     ┌─────────────────────────┐                          ││
│  │                     │   @ui-museum/shared     │                          ││
│  │                     │   - Prisma Client       │                          ││
│  │                     │   - Services            │                          ││
│  │                     │   - Types               │                          ││
│  │                     └───────────┬─────────────┘                          ││
│  │                                 ▼                                        ││
│  │                          ┌─────────────┐                                 ││
│  │                          │ PostgreSQL  │                                 ││
│  │                          │   :5432     │                                 ││
│  │                          └─────────────┘                                 ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
│                    +  (Separate Process, spawned by Claude Code)             │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                      MCP SERVER (stdio transport)                        ││
│  │                                                                          ││
│  │  Spawned by Claude Code when user connects                               ││
│  │                                                                          ││
│  │  ┌─────────────────┐      ┌─────────────────────────┐                   ││
│  │  │   MCP Tools     │ ───▶ │   @ui-museum/shared     │                   ││
│  │  │   (8 tools)     │      │   (same services!)      │                   ││
│  │  └─────────────────┘      └───────────┬─────────────┘                   ││
│  │                                       ▼                                  ││
│  │                                ┌─────────────┐                           ││
│  │                                │ PostgreSQL  │  (same database!)         ││
│  │                                │   :5432     │                           ││
│  │                                └─────────────┘                           ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
│  WHY UNIFIED SERVER:                                                         │
│  ▪ Single `npm run dev` command                                             │
│  ▪ No CORS issues (same origin)                                             │
│  ▪ Vite dev middleware is well-established pattern                          │
│  ▪ Production: same server serves static build + API                        │
│                                                                              │
│  WHY SEPARATE MCP:                                                           │
│  ▪ MCP requires stdio transport (spawned by Claude Code)                    │
│  ▪ Cannot be embedded in web server                                         │
│  ▪ Shares services via @ui-museum/shared package                            │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Monorepo Package Structure:**

```
ui-museum/
├── packages/
│   ├── shared/                 # Shared code between server and MCP
│   │   ├── src/
│   │   │   ├── db/             # Prisma client, repositories
│   │   │   │   ├── prisma/
│   │   │   │   │   └── schema.prisma
│   │   │   │   ├── client.ts
│   │   │   │   └── repositories/
│   │   │   ├── services/       # Business logic
│   │   │   │   ├── recipe-service.ts
│   │   │   │   ├── theme-service.ts
│   │   │   │   ├── asset-service.ts
│   │   │   │   └── export-service.ts
│   │   │   ├── registry/       # Static element registry
│   │   │   │   ├── atoms/
│   │   │   │   ├── molecules/
│   │   │   │   ├── organisms/
│   │   │   │   ├── templates/
│   │   │   │   └── index.ts
│   │   │   └── types/          # Shared TypeScript types
│   │   │       ├── recipe.ts
│   │   │       ├── element.ts
│   │   │       └── theme.ts
│   │   └── package.json
│   │
│   ├── server/                 # Unified web server
│   │   ├── src/
│   │   │   ├── api/            # REST routes
│   │   │   │   ├── recipes.ts
│   │   │   │   ├── projects.ts
│   │   │   │   ├── themes.ts
│   │   │   │   └── assets.ts
│   │   │   ├── ws/             # WebSocket handlers
│   │   │   │   └── sync.ts
│   │   │   └── index.ts        # Express + Vite middleware
│   │   └── package.json
│   │
│   ├── mcp/                    # MCP server (separate process)
│   │   ├── src/
│   │   │   ├── tools/          # MCP tool implementations
│   │   │   │   ├── search-elements.ts
│   │   │   │   ├── get-element.ts
│   │   │   │   ├── create-recipe.ts
│   │   │   │   └── ...
│   │   │   └── index.ts        # MCP server entry
│   │   └── package.json
│   │
│   └── web/                    # React frontend (Vite)
│       ├── src/
│       │   ├── app/
│       │   ├── components/
│       │   │   └── editor/     # Visual editor
│       │   ├── hooks/
│       │   ├── stores/         # Zustand stores
│       │   └── styles/
│       ├── index.html
│       └── package.json
│
├── data/                       # Runtime data (gitignored)
│   └── uploads/                # Uploaded assets
│
├── docker-compose.yml          # PostgreSQL
├── package.json                # Workspace root
├── pnpm-workspace.yaml         # pnpm workspaces
└── turbo.json                  # Turborepo config
```

**Development Commands:**

| Command | Description |
|---------|-------------|
| `pnpm install` | Install all dependencies |
| `pnpm dev` | Start PostgreSQL + server + frontend |
| `pnpm db:migrate` | Run Prisma migrations |
| `pnpm db:studio` | Open Prisma Studio |
| `pnpm build` | Build all packages |
| `pnpm mcp:install` | Configure MCP server in Claude Code |

**MCP Configuration (claude_desktop_config.json):**

```json
{
  "mcpServers": {
    "ui-museum": {
      "command": "node",
      "args": ["/path/to/ui-museum/packages/mcp/dist/index.js"],
      "env": {
        "DATABASE_URL": "postgresql://ui_museum:development@localhost:5432/ui_museum"
      }
    }
  }
}
```

### 4.6 Frontend Package Structure (packages/web)

> **Note:** This shows the internal structure of `packages/web/`.
> See Section 4.5 for the full monorepo structure.

```
packages/web/
├── src/
│   ├── app/                    # App shell and routing
│   │   ├── App.tsx
│   │   ├── routes/
│   │   └── layouts/
│   │
│   ├── components/             # App UI components
│   │   ├── navigation/
│   │   ├── editor/             # Visual editor components
│   │   │   ├── Canvas.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── PropertyPanel.tsx
│   │   │   └── PreviewFrame.tsx
│   │   ├── library/            # Library browsing UI
│   │   └── shared/
│   │
│   ├── library/                # EXISTING: Zone implementations
│   │   ├── arcade/             # (showcase only, not for builder)
│   │   ├── hacker/
│   │   └── ...
│   │
│   ├── tokens/                 # Design token CSS
│   │   ├── core/               # Primitive values
│   │   ├── semantic/           # Intent-based tokens
│   │   ├── themes/             # Theme overrides
│   │   └── index.css           # Token entry point
│   │
│   ├── recipes/                # Recipe rendering (frontend)
│   │   ├── renderer.tsx        # Recipe → React
│   │   └── validator.ts        # Client-side validation
│   │
│   ├── stores/                 # Zustand state management
│   │   ├── editor-store.ts     # Canvas/selection state
│   │   ├── recipe-store.ts     # Current recipe
│   │   └── ui-store.ts         # UI preferences
│   │
│   ├── hooks/                  # Custom React hooks
│   │   ├── useWebSocket.ts     # Real-time sync
│   │   ├── useUndo.ts          # Undo/redo
│   │   └── useKeyboard.ts      # Keyboard shortcuts
│   │
│   └── api/                    # API client
│       └── client.ts           # REST + WebSocket client
│
├── index.html
├── vite.config.ts
└── package.json
```

> **Note:** Services, types, and element registry live in `packages/shared/`.
> The frontend imports from `@ui-museum/shared`.

---

## 5. Data Models

### 5.1 Project Model

```typescript
interface Project {
  // Identity
  id: string;                    // UUID
  name: string;                  // "My SaaS Landing Page"
  slug: string;                  // "my-saas-landing-page"

  // Configuration
  theme: string;                 // Theme ID: "brutal", "neon", etc.
  customTokens?: TokenOverrides; // Per-project token overrides

  // Content
  pages: Page[];                 // Array of pages

  // Assets
  assets: Asset[];               // Uploaded images, fonts

  // Metadata
  createdAt: string;             // ISO timestamp
  updatedAt: string;             // ISO timestamp
  version: number;               // Incrementing version

  // Settings
  settings: {
    defaultFont?: string;
    favicon?: string;
    ogImage?: string;
    analytics?: string;
  };
}
```

### 5.2 Page Model

```typescript
interface Page {
  // Identity
  id: string;                    // UUID
  projectId: string;             // Parent project
  name: string;                  // "Home", "Pricing", "About"
  path: string;                  // "/", "/pricing", "/about"

  // Content
  recipe: PageRecipe;            // The composition recipe

  // SEO
  meta: {
    title: string;
    description: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
  };

  // Metadata
  createdAt: string;
  updatedAt: string;
}
```

### 5.3 Recipe Model (Puck-Compatible)

> **Format**: Puck-compatible JSON structure enables future integration with Puck Editor
> while maintaining our custom extensions for AI metadata and slot system.

```typescript
// Puck-compatible recipe format
// Reference: https://puckeditor.com/docs/api-reference/data

interface PageRecipe {
  // Identity
  id: string;                    // UUID
  version: string;               // Schema version: "1.0.0"

  // Puck-compatible root configuration
  root: {
    props?: Record<string, any>; // Root-level props (Puck pattern)
    theme?: string;              // Theme override (our extension)
  };

  // Puck-compatible content array (using 'content' for Puck compatibility)
  content: BlockNode[];          // Puck uses 'content' array

  // Puck zones for drag-drop regions
  zones?: Record<string, BlockNode[]>;

  // Our extensions (namespaced to avoid conflicts)
  _uiMuseum: {
    name: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
    createdBy: 'user' | 'ai';
    aiPrompt?: string;           // If created by AI
  };
}

interface BlockNode {
  // Puck-compatible identity
  type: string;                  // Component type (Puck uses 'type', not '_type')
  props: Record<string, any>;    // Component props (Puck pattern)

  // Puck readOnly zones for nested content
  readOnly?: Record<string, boolean>;

  // Our extensions (namespaced)
  _uiMuseum?: {
    id: string;                  // Unique instance ID
    addedAt: string;
    addedBy: 'user' | 'ai';
    aiPrompt?: string;
    slots?: Record<string, SlotContent>;  // Our slot system
    hidden?: boolean;
  };
}

interface SlotContent {
  type: 'text' | 'richtext' | 'image' | 'component' | 'list';
  value: any;
  // For type='text': string
  // For type='richtext': PortableText[]
  // For type='image': { src: string, alt: string, width?: number, height?: number }
  // For type='component': BlockNode
  // For type='list': SlotContent[]
}

// Example Puck-compatible recipe:
const exampleRecipe: PageRecipe = {
  id: "recipe-123",
  version: "1.0.0",
  root: {
    props: { title: "My Landing Page" },
    theme: "brutal"
  },
  content: [
    {
      type: "HeroSection",
      props: {
        title: "Welcome to Our Platform",
        subtitle: "Build faster with AI",
        ctaText: "Get Started",
        ctaLink: "/signup"
      },
      _uiMuseum: {
        id: "block-abc",
        addedAt: "2025-12-28T10:00:00Z",
        addedBy: "ai",
        aiPrompt: "Create a hero section for a SaaS landing page"
      }
    },
    {
      type: "FeatureGrid",
      props: {
        columns: 3,
        features: [
          { icon: "zap", title: "Fast", description: "Lightning quick" },
          { icon: "shield", title: "Secure", description: "Enterprise grade" },
          { icon: "heart", title: "Easy", description: "Intuitive UX" }
        ]
      },
      _uiMuseum: {
        id: "block-def",
        addedAt: "2025-12-28T10:01:00Z",
        addedBy: "user"
      }
    }
  ],
  _uiMuseum: {
    name: "SaaS Landing Page",
    description: "A modern landing page for SaaS products",
    createdAt: "2025-12-28T10:00:00Z",
    updatedAt: "2025-12-28T10:01:00Z",
    createdBy: "ai",
    aiPrompt: "Create a landing page for my SaaS product with pricing"
  }
};
```

**Puck Compatibility Benefits:**
- Can swap in Puck Editor as visual editor in future
- Puck's `content` array maps directly to our block system
- Puck's `zones` enable complex layouts with multiple drop regions
- Our `_uiMuseum` namespace keeps AI metadata without breaking Puck

### 5.4 Element Entry Model (Extended)

```typescript
interface ElementEntry {
  // EXISTING fields...
  id: string;
  name: string;
  layer: 'atom' | 'molecule' | 'organism' | 'template';
  category: ElementCategory;
  description: string;
  themeAgnostic: boolean;
  sourceComponents: string[];
  extractedFrom: string;
  previewType: PreviewType;
  hasInteraction: boolean;
  implementation: ImplementationType;
  component?: React.FC<any>;
  cssClass?: string;
  codeSnippet?: string;
  tags: string[];
  composedOf?: string[];
  usedIn?: string[];

  // NEW fields for builder
  slots?: SlotDefinition[];      // Content slots this component accepts
  props?: PropDefinition[];      // Configurable props with UI hints
  variants?: VariantDefinition[];// Available variants

  // NEW: Versioning
  version: string;               // Semantic version
  status: 'stable' | 'beta' | 'deprecated' | 'experimental';
  deprecatedMessage?: string;    // If deprecated, why and what to use instead

  // NEW: AI hints
  aiDescription?: string;        // Longer description for AI context
  aiUseCases?: string[];         // When to use this component
  aiAvoid?: string[];            // When NOT to use this component
}

interface SlotDefinition {
  name: string;                  // "title", "subtitle", "cta", "image"
  required: boolean;
  accepts: ('text' | 'richtext' | 'image' | 'component' | 'list')[];
  allowedComponents?: string[];  // If accepts 'component', which ones
  defaultValue?: any;
  description?: string;          // For UI/AI hints
  maxItems?: number;             // For lists
}

interface PropDefinition {
  name: string;                  // "variant", "size", "disabled"
  type: 'string' | 'number' | 'boolean' | 'select' | 'color';
  required: boolean;
  defaultValue?: any;
  options?: { label: string; value: any }[];  // For select type
  description?: string;
}

interface VariantDefinition {
  name: string;                  // "primary", "secondary", "outline"
  description?: string;
  preview?: string;              // Preview image URL
}
```

### 5.5 Theme/Token Model

```typescript
interface ThemeDefinition {
  id: string;                    // "brutal", "neon", "cosmic"
  name: string;                  // "Neo-Brutal"
  description: string;

  // CSS class to apply
  className: string;             // "theme-brutal"

  // Token values
  tokens: {
    colors: Record<string, string>;
    spacing?: Record<string, string>;
    typography?: Record<string, string>;
    shadows?: Record<string, string>;
    radii?: Record<string, string>;
  };

  // Preview
  preview: {
    background: string;
    foreground: string;
    accent: string;
  };

  // Metadata
  source?: string;               // If extracted, source URL
  createdAt: string;
  isBuiltIn: boolean;
}

interface TokenOverrides {
  // Allow per-project overrides of any token
  colors?: Record<string, string>;
  spacing?: Record<string, string>;
  typography?: Record<string, string>;
  shadows?: Record<string, string>;
  radii?: Record<string, string>;
}
```

### 5.6 Asset Model (Local Upload + Export Bundling)

> **Storage Strategy**: Assets are uploaded locally to the server filesystem,
> referenced by path in PostgreSQL, and bundled into exports.

**Storage Location:**

```
Default:  {PROJECT_ROOT}/data/uploads/
Override: UI_MUSEUM_UPLOADS_DIR environment variable

Structure:
data/
└── uploads/
    └── {project-id}/
        ├── images/
        │   ├── {uuid}-{original-name}.jpg
        │   ├── {uuid}-{original-name}-thumb.jpg     (150px)
        │   ├── {uuid}-{original-name}-medium.jpg    (800px)
        │   └── {uuid}-{original-name}.webp          (optimized)
        └── fonts/
            └── {uuid}-{original-name}.woff2
```

**Path Resolution:**
- Server resolves absolute path at startup from `UI_MUSEUM_UPLOADS_DIR` or `./data/uploads`
- Creates directory structure if not exists
- Validates writability on startup
- Serves via `/uploads/*` route (Express static middleware)

**MCP Access:**
- MCP Server reads same `UI_MUSEUM_UPLOADS_DIR` from environment
- Can reference assets in recipes by URL
- Cannot upload directly (web-only upload for v1)

**Size Limits:**
- Images: 10MB max per file
- Fonts: 5MB max per file
- Total per project: 500MB (configurable)
- Export bundle: Warning if >50MB, fail if >200MB

```typescript
interface Asset {
  id: string;                    // UUID
  projectId: string;             // Foreign key to projects table

  type: 'image' | 'font' | 'video' | 'document';

  // File info
  filename: string;              // Stored filename: "{uuid}-{original}.jpg"
  originalName: string;          // User-provided name: "hero-bg.jpg"
  mimeType: string;              // "image/jpeg"
  size: number;                  // Bytes

  // Local Storage (PRIMARY)
  localPath: string;             // Absolute: "/path/to/data/uploads/proj123/images/{uuid}-hero-bg.jpg"
  relativePath: string;          // Relative to uploads dir: "proj123/images/{uuid}-hero-bg.jpg"

  // URL for serving (generated, not stored)
  url: string;                   // "http://localhost:5173/uploads/proj123/images/{uuid}-hero-bg.jpg"

  // Image-specific
  dimensions?: {
    width: number;
    height: number;
  };

  // Optimization (generated on upload)
  optimized?: {
    thumbnail: string;           // Path to 150px thumbnail
    medium: string;              // Path to 800px version
    large: string;               // Path to 1600px version
    webp?: string;               // WebP version if available
  };

  // Metadata
  alt?: string;                  // Alt text for images
  caption?: string;
  uploadedAt: string;
  usedIn?: string[];             // Recipe IDs that reference this asset
}

// Asset storage structure on disk:
// /uploads/
//   └── [project-id]/
//       ├── images/
//       │   ├── hero-bg.jpg
//       │   ├── hero-bg-thumb.jpg
//       │   ├── hero-bg-medium.jpg
//       │   └── hero-bg.webp
//       ├── fonts/
//       │   └── custom-font.woff2
//       └── documents/
//           └── terms.pdf
```

**Asset Upload Flow:**
```
┌──────────────────────────────────────────────────────────────────────────┐
│                        ASSET UPLOAD FLOW                                 │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  1. User drags image into editor                                         │
│                    │                                                     │
│                    ▼                                                     │
│  2. Client uploads to POST /api/assets                                   │
│     - multipart/form-data                                               │
│     - includes projectId                                                │
│                    │                                                     │
│                    ▼                                                     │
│  3. Server receives file                                                 │
│     - Validates type (image, font, etc.)                                │
│     - Checks file size (max 10MB images, 50MB fonts)                    │
│     - Generates UUID                                                    │
│                    │                                                     │
│                    ▼                                                     │
│  4. Server saves to disk                                                 │
│     - /uploads/{projectId}/images/{uuid}-{filename}                     │
│     - Generates thumbnails (150px, 800px, 1600px)                       │
│     - Converts to WebP if image                                         │
│                    │                                                     │
│                    ▼                                                     │
│  5. Server inserts into PostgreSQL                                       │
│     - Stores paths, metadata, dimensions                                │
│     - Returns asset object to client                                    │
│                    │                                                     │
│                    ▼                                                     │
│  6. Client updates recipe to reference asset                             │
│     - Uses URL or asset ID in component props                           │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

**Export Bundling:**
```typescript
// When exporting a recipe, all referenced assets are bundled

interface ExportBundle {
  // Generated React/Tailwind code
  code: {
    'pages/index.tsx': string;
    'components/HeroSection.tsx': string;
    // ... other components
  };

  // Theme and styles
  styles: {
    'styles/tokens.css': string;
    'styles/theme.css': string;
  };

  // Bundled assets (copied from local storage)
  assets: {
    'public/images/hero-bg.jpg': Buffer;
    'public/images/logo.png': Buffer;
    'public/fonts/custom-font.woff2': Buffer;
  };

  // Asset map for path rewriting
  assetMap: {
    // Original URL → exported path
    'http://localhost:3000/uploads/abc/hero-bg.jpg': '/images/hero-bg.jpg',
    'http://localhost:3000/uploads/abc/logo.png': '/images/logo.png',
  };

  // Package files
  config: {
    'package.json': string;
    'tailwind.config.js': string;
    'README.md': string;
  };
}

// Export creates a self-contained project:
// exported-site/
//   ├── package.json
//   ├── tailwind.config.js
//   ├── src/
//   │   ├── pages/
//   │   │   └── index.tsx
//   │   ├── components/
//   │   │   ├── HeroSection.tsx
//   │   │   └── ...
//   │   └── styles/
//   │       ├── tokens.css
//   │       └── theme.css
//   ├── public/
//   │   ├── images/
//   │   │   ├── hero-bg.jpg
//   │   │   └── logo.png
//   │   └── fonts/
//   │       └── custom-font.woff2
//   └── README.md
```

### 5.7 Extraction Result Model

```typescript
interface ExtractionResult {
  id: string;
  sourceUrl: string;
  extractedAt: string;

  // Extracted tokens
  tokens: {
    colors: ExtractedColor[];
    typography: ExtractedTypography[];
    spacing: ExtractedSpacing[];
    shadows: ExtractedShadow[];
  };

  // Extracted patterns
  patterns: ExtractedPattern[];

  // Screenshots
  screenshots: {
    full: string;                // Full page screenshot
    sections: { selector: string; url: string }[];
  };

  // Status
  status: 'pending' | 'processing' | 'complete' | 'failed';
  error?: string;
}

interface ExtractedColor {
  value: string;                 // Hex or RGB
  occurrences: number;           // How many times found
  contexts: ('background' | 'text' | 'border' | 'shadow')[];
  suggestedRole?: 'primary' | 'secondary' | 'accent' | 'background' | 'text';
}

interface ExtractedPattern {
  type: 'nav' | 'hero' | 'card' | 'footer' | 'form' | 'unknown';
  selector: string;              // CSS selector where found
  screenshot: string;            // Screenshot URL
  html: string;                  // Extracted HTML
  styles: Record<string, string>;// Computed styles
  confidence: number;            // 0-1 confidence score
}
```

---

## 6. Component Library System

### 6.1 Current State

The UI Museum currently has:
- **650+ elements** across atomic design layers
- **11 themed zones** (Arcade, Hacker, Cosmic, etc.)
- **Registry system** with metadata per component
- **No versioning** - components are static
- **No contribution workflow** - manual addition only

### 6.2 Library Organization (Proposed)

```
Library Structure:
├── By Layer (Atomic Design)
│   ├── Atoms (350+)
│   │   ├── Icons (68)
│   │   ├── Animations (56)
│   │   ├── Colors (24)
│   │   ├── Backgrounds (32)
│   │   ├── Shadows (18)
│   │   ├── Borders (26)
│   │   ├── Typography (34)
│   │   ├── Filters (42)
│   │   ├── Shapes (22)
│   │   └── Surfaces (28)
│   ├── Molecules (144+)
│   │   ├── Buttons (24)
│   │   ├── Inputs (32)
│   │   ├── Badges (16)
│   │   ├── Cards (24)
│   │   ├── Indicators (28)
│   │   └── Feedback (20)
│   ├── Organisms (156+)
│   │   ├── Navigation (24)
│   │   ├── Layout (28)
│   │   ├── Forms (20)
│   │   ├── Data Display (32)
│   │   ├── Media (20)
│   │   ├── Commerce (16)
│   │   └── Social (16)
│   └── Templates (61+)
│       ├── Marketing (15)
│       ├── Application (13)
│       ├── Content (16)
│       └── Auth (17)
│
├── By Theme/Zone
│   ├── Default (neutral)
│   ├── Dark
│   ├── Brutal (neo-brutalist)
│   ├── Neon (hacker/terminal)
│   ├── Cosmic (space/gradient)
│   ├── Glass (glassmorphism)
│   ├── Retro (vintage)
│   └── Organic (nature)
│
└── By Use Case
    ├── Landing Pages
    ├── Dashboards
    ├── E-commerce
    ├── Portfolios
    ├── Blogs
    └── Authentication
```

### 6.3 Component Metadata Requirements

Every component in the library must have:

**Required:**
- [ ] Unique ID
- [ ] Name and description
- [ ] Layer and category
- [ ] At least one tag
- [ ] Preview type
- [ ] Implementation type

**For Builder:**
- [ ] Slot definitions (what content it accepts)
- [ ] Prop definitions (what can be configured)
- [ ] Default values for all slots/props
- [ ] AI description and use cases

**For Quality:**
- [ ] Version number
- [ ] Status (stable/beta/deprecated)
- [ ] Theme compatibility list

### 6.4 Component Versioning Strategy

**Version Format:** Semantic versioning `MAJOR.MINOR.PATCH`

| Change Type | Version Bump | Example |
|-------------|--------------|---------|
| Breaking prop change | MAJOR | Removing a required prop |
| New optional prop | MINOR | Adding `size` prop |
| Bug fix, style tweak | PATCH | Fixing hover state |

**Deprecation Process:**
1. Mark as `status: 'deprecated'` with message
2. Keep working for 6 months
3. Show warning in UI when selected
4. Remove in next major version

### 6.5 Component Contribution Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                   CONTRIBUTION WORKFLOW                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐         │
│  │   Submit    │───▶│   Review    │───▶│   Publish   │         │
│  └─────────────┘    └─────────────┘    └─────────────┘         │
│                                                                 │
│  Submit Phase:                                                  │
│  - Provide component code (React + Tailwind)                    │
│  - Fill metadata form (name, description, category)             │
│  - Define slots and props                                       │
│  - Add preview screenshot                                       │
│                                                                 │
│  Review Phase (Automated):                                      │
│  - [ ] TypeScript compiles                                      │
│  - [ ] Uses CSS variables (themeable)                          │
│  - [ ] No external dependencies                                 │
│  - [ ] Accessibility: proper ARIA, keyboard nav                 │
│  - [ ] Responsive: works at mobile/tablet/desktop               │
│  - [ ] Performance: bundle size < 50KB                          │
│                                                                 │
│  Review Phase (Manual - for public library):                    │
│  - Design quality review                                        │
│  - Code quality review                                          │
│  - Documentation completeness                                   │
│                                                                 │
│  Publish:                                                       │
│  - Add to registry                                              │
│  - Generate preview                                             │
│  - Index for search                                             │
│  - Notify subscribers                                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 7. Theme & Token System

### 7.1 Current State Issues

The current codebase has:
- **1,739 hardcoded Tailwind color classes**
- **782 variant prop usages**
- **0 CSS variables**
- **Per-component variant dictionaries** (layoutStyles pattern)

### 7.2 Token Architecture (Proposed)

```
┌─────────────────────────────────────────────────────────────────┐
│                      TOKEN ARCHITECTURE                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    CORE TOKENS                           │   │
│  │           (Primitive values, never used directly)        │   │
│  │                                                          │   │
│  │  --color-gray-50: #f9fafb                               │   │
│  │  --color-gray-900: #111827                              │   │
│  │  --color-blue-500: #3b82f6                              │   │
│  │  --spacing-4: 1rem                                       │   │
│  │  --radius-md: 0.5rem                                     │   │
│  │  ...                                                     │   │
│  └───────────────────────────┬─────────────────────────────┘   │
│                              │                                  │
│                              ▼                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                   SEMANTIC TOKENS                        │   │
│  │           (Intent-based, used by components)             │   │
│  │                                                          │   │
│  │  --color-primary: var(--color-blue-500)                  │   │
│  │  --color-background: var(--color-gray-50)                │   │
│  │  --color-text: var(--color-gray-900)                     │   │
│  │  --color-surface: white                                  │   │
│  │  --color-border: var(--color-gray-200)                   │   │
│  │  --radius-button: var(--radius-md)                       │   │
│  │  --shadow-card: 0 1px 3px rgba(0,0,0,0.1)               │   │
│  │  ...                                                     │   │
│  └───────────────────────────┬─────────────────────────────┘   │
│                              │                                  │
│                              ▼                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                   THEME OVERRIDES                        │   │
│  │        (Override semantic tokens per theme)              │   │
│  │                                                          │   │
│  │  .theme-brutal {                                         │   │
│  │    --color-primary: #000000;                             │   │
│  │    --color-background: #fef3c7;                          │   │
│  │    --color-surface: white;                               │   │
│  │    --radius-button: 0;                                   │   │
│  │    --shadow-card: 8px 8px 0 0 #000;                     │   │
│  │  }                                                       │   │
│  │                                                          │   │
│  │  .theme-neon {                                           │   │
│  │    --color-primary: #33ff00;                             │   │
│  │    --color-background: #000000;                          │   │
│  │    --color-text: #33ff00;                                │   │
│  │    --shadow-card: 0 0 20px rgba(51,255,0,0.3);          │   │
│  │  }                                                       │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 7.3 CSS Variable Naming Convention

```css
/* Pattern: --{category}-{semantic-name} */

/* Colors */
--color-primary
--color-primary-hover
--color-secondary
--color-accent
--color-background
--color-surface
--color-surface-hover
--color-text
--color-text-muted
--color-text-inverse
--color-border
--color-border-muted
--color-success
--color-warning
--color-error

/* Spacing */
--spacing-xs      /* 0.25rem */
--spacing-sm      /* 0.5rem */
--spacing-md      /* 1rem */
--spacing-lg      /* 1.5rem */
--spacing-xl      /* 2rem */
--spacing-2xl     /* 3rem */

/* Typography */
--font-family-sans
--font-family-mono
--font-size-xs
--font-size-sm
--font-size-base
--font-size-lg
--font-size-xl
--font-size-2xl
--font-weight-normal
--font-weight-medium
--font-weight-bold
--line-height-tight
--line-height-normal
--line-height-relaxed

/* Shadows */
--shadow-sm
--shadow-md
--shadow-lg
--shadow-xl
--shadow-glow

/* Radii */
--radius-none
--radius-sm
--radius-md
--radius-lg
--radius-xl
--radius-full

/* Component-specific */
--button-radius
--card-radius
--input-radius
--card-shadow
--input-shadow-focus
```

### 7.4 Theme Switching Mechanism

```typescript
// ThemeProvider.tsx
interface ThemeContextValue {
  theme: string;                 // Current theme ID
  setTheme: (theme: string) => void;
  availableThemes: ThemeDefinition[];
  customTokens?: TokenOverrides;
  setCustomTokens: (tokens: TokenOverrides) => void;
}

// Implementation:
// 1. ThemeProvider wraps app
// 2. Sets .theme-{name} class on document.documentElement
// 3. CSS variables cascade from theme class
// 4. Components use var(--color-primary), etc.
// 5. Custom tokens applied via inline style on root
```

### 7.5 Migration Strategy

**Phase 1: Foundation (No Breaking Changes)**
1. Create token CSS files alongside existing code
2. Import tokens in app entry
3. Existing components continue to work

**Phase 2: Gradual Migration**
1. Migrate one component category at a time (e.g., buttons first)
2. Replace hardcoded values with `var(--token-name)`
3. Keep variant prop working (reads from context, applies CSS class)
4. Test theme switching works

**Phase 3: Full Migration**
1. All components use CSS variables
2. Remove hardcoded color values
3. Variant prop becomes optional (theme context is primary)

---

## 8. Recipe & Composition System

### 8.1 Recipe Rendering Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    RECIPE RENDERING FLOW                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐                                               │
│  │   Recipe    │  JSON definition of page                      │
│  │   (JSON)    │                                               │
│  └──────┬──────┘                                               │
│         │                                                       │
│         ▼                                                       │
│  ┌─────────────┐                                               │
│  │  Validator  │  Check: components exist, props valid,        │
│  │             │         slots compatible                       │
│  └──────┬──────┘                                               │
│         │                                                       │
│         ▼                                                       │
│  ┌─────────────┐                                               │
│  │   Theme     │  Resolve theme, apply CSS class,              │
│  │  Resolver   │  merge custom tokens                          │
│  └──────┬──────┘                                               │
│         │                                                       │
│         ▼                                                       │
│  ┌─────────────┐                                               │
│  │   Block     │  For each block:                              │
│  │  Renderer   │  1. Look up component in registry             │
│  │             │  2. Resolve slot content                       │
│  │             │  3. Apply props                                │
│  │             │  4. Render children recursively                │
│  └──────┬──────┘                                               │
│         │                                                       │
│         ▼                                                       │
│  ┌─────────────┐                                               │
│  │   React     │  Full React component tree                    │
│  │   Output    │                                               │
│  └─────────────┘                                               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 8.2 Recipe Renderer Implementation

```typescript
// recipes/renderer.tsx (pseudocode)

interface RecipeRendererProps {
  recipe: PageRecipe;
  theme?: string;
  customTokens?: TokenOverrides;
  onBlockClick?: (blockId: string) => void;  // For editor
  editMode?: boolean;
}

function RecipeRenderer({ recipe, theme, customTokens, onBlockClick, editMode }: RecipeRendererProps) {
  return (
    <ThemeProvider theme={theme || recipe.root.theme} customTokens={customTokens}>
      <div className={`recipe-root ${recipe.root.className || ''}`}>
        {recipe.blocks.map(block => (
          <BlockRenderer
            key={block._id}
            block={block}
            onBlockClick={onBlockClick}
            editMode={editMode}
          />
        ))}
      </div>
    </ThemeProvider>
  );
}

function BlockRenderer({ block, onBlockClick, editMode }: BlockRendererProps) {
  // 1. Look up component
  const entry = getElement(block._type);
  if (!entry?.component) {
    return <UnknownBlock type={block._type} />;
  }

  const Component = entry.component;

  // 2. Resolve slots
  const resolvedSlots = resolveSlots(block.slots, entry.slots);

  // 3. Build props
  const props = {
    ...block.props,
    ...resolvedSlots,
  };

  // 4. Render with children
  const rendered = (
    <Component {...props}>
      {block.children?.map(child => (
        <BlockRenderer key={child._id} block={child} />
      ))}
    </Component>
  );

  // 5. Wrap for edit mode
  if (editMode) {
    return (
      <EditableBlock blockId={block._id} onClick={onBlockClick}>
        {rendered}
      </EditableBlock>
    );
  }

  return rendered;
}
```

### 8.3 Slot Resolution

```typescript
function resolveSlots(
  slotContent: Record<string, SlotContent> | undefined,
  slotDefinitions: SlotDefinition[] | undefined
): Record<string, any> {
  const resolved: Record<string, any> = {};

  for (const def of slotDefinitions || []) {
    const content = slotContent?.[def.name];

    if (!content) {
      // Use default value
      resolved[def.name] = def.defaultValue;
      continue;
    }

    switch (content.type) {
      case 'text':
        resolved[def.name] = content.value;
        break;

      case 'richtext':
        resolved[def.name] = <RichTextRenderer content={content.value} />;
        break;

      case 'image':
        resolved[def.name] = (
          <img
            src={content.value.src}
            alt={content.value.alt}
            width={content.value.width}
            height={content.value.height}
          />
        );
        break;

      case 'component':
        resolved[def.name] = <BlockRenderer block={content.value} />;
        break;

      case 'list':
        resolved[def.name] = content.value.map((item, i) =>
          resolveSlotItem(item, `${def.name}-${i}`)
        );
        break;
    }
  }

  return resolved;
}
```

### 8.4 Recipe Validation

```typescript
interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

interface ValidationError {
  blockId: string;
  field: string;
  message: string;
  code: 'UNKNOWN_COMPONENT' | 'MISSING_REQUIRED_SLOT' | 'INVALID_PROP' | 'CIRCULAR_REFERENCE';
}

function validateRecipe(recipe: PageRecipe): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];
  const visitedIds = new Set<string>();

  function validateBlock(block: BlockNode, path: string) {
    // Check for circular references
    if (visitedIds.has(block._id)) {
      errors.push({
        blockId: block._id,
        field: '_id',
        message: 'Circular reference detected',
        code: 'CIRCULAR_REFERENCE'
      });
      return;
    }
    visitedIds.add(block._id);

    // Check component exists
    const entry = getElement(block._type);
    if (!entry) {
      errors.push({
        blockId: block._id,
        field: '_type',
        message: `Unknown component type: ${block._type}`,
        code: 'UNKNOWN_COMPONENT'
      });
      return;
    }

    // Check required slots
    for (const slot of entry.slots || []) {
      if (slot.required && !block.slots?.[slot.name]) {
        errors.push({
          blockId: block._id,
          field: `slots.${slot.name}`,
          message: `Missing required slot: ${slot.name}`,
          code: 'MISSING_REQUIRED_SLOT'
        });
      }
    }

    // Validate children recursively
    for (const child of block.children || []) {
      validateBlock(child, `${path}.children`);
    }
  }

  for (const block of recipe.blocks) {
    validateBlock(block, 'blocks');
  }

  return { valid: errors.length === 0, errors, warnings };
}
```

---

## 9. MCP Integration

### 9.1 MCP Server Overview

The MCP server exposes UI Museum's capabilities to Claude Code, enabling natural language page creation.

### 9.2 MCP Tools Specification

```typescript
// Tool 1: Search Elements
{
  name: "search_elements",
  description: "Search the UI Museum component library by query, category, layer, or tags",
  inputSchema: {
    type: "object",
    properties: {
      query: {
        type: "string",
        description: "Search query (matches name, description, tags)"
      },
      layer: {
        type: "string",
        enum: ["atom", "molecule", "organism", "template"],
        description: "Filter by atomic design layer"
      },
      category: {
        type: "string",
        description: "Filter by category (buttons, cards, navigation, etc.)"
      },
      tags: {
        type: "array",
        items: { type: "string" },
        description: "Filter by tags"
      },
      limit: {
        type: "number",
        default: 10,
        description: "Maximum results to return"
      }
    }
  }
}

// Tool 2: Get Element Details
{
  name: "get_element",
  description: "Get full details of a specific element including props, slots, and code",
  inputSchema: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "Element ID from registry"
      }
    },
    required: ["id"]
  }
}

// Tool 3: List Themes
{
  name: "list_themes",
  description: "List all available themes with their token values",
  inputSchema: {
    type: "object",
    properties: {}
  }
}

// Tool 4: Create Recipe
{
  name: "create_recipe",
  description: "Create a new page recipe from blocks",
  inputSchema: {
    type: "object",
    properties: {
      name: { type: "string", description: "Recipe name" },
      theme: { type: "string", description: "Theme ID to apply" },
      blocks: {
        type: "array",
        items: {
          type: "object",
          properties: {
            _type: { type: "string", description: "Component ID from registry" },
            props: { type: "object", description: "Component props" },
            slots: { type: "object", description: "Slot content" }
          },
          required: ["_type"]
        },
        description: "Array of blocks to compose"
      }
    },
    required: ["name", "blocks"]
  }
}

// Tool 5: Update Recipe
{
  name: "update_recipe",
  description: "Update an existing recipe",
  inputSchema: {
    type: "object",
    properties: {
      recipeId: { type: "string", description: "Recipe ID to update" },
      operations: {
        type: "array",
        items: {
          type: "object",
          properties: {
            op: {
              type: "string",
              enum: ["add", "remove", "update", "move"],
              description: "Operation type"
            },
            blockId: { type: "string", description: "Target block ID" },
            data: { type: "object", description: "Operation data" }
          }
        }
      }
    },
    required: ["recipeId", "operations"]
  }
}

// Tool 6: Preview Recipe
{
  name: "preview_recipe",
  description: "Get a preview URL for a recipe",
  inputSchema: {
    type: "object",
    properties: {
      recipeId: { type: "string", description: "Recipe ID" },
      viewport: {
        type: "string",
        enum: ["desktop", "tablet", "mobile"],
        default: "desktop"
      }
    },
    required: ["recipeId"]
  }
}

// Tool 7: Export Recipe
{
  name: "export_recipe",
  description: "Export a recipe as React/Tailwind code",
  inputSchema: {
    type: "object",
    properties: {
      recipeId: { type: "string", description: "Recipe ID" },
      format: {
        type: "string",
        enum: ["react-tailwind", "html-css", "next-app"],
        default: "react-tailwind"
      },
      includeTheme: {
        type: "boolean",
        default: true,
        description: "Include theme CSS"
      }
    },
    required: ["recipeId"]
  }
}

// Tool 8: Extract Design (Collector)
{
  name: "extract_design",
  description: "Extract design tokens and patterns from a URL",
  inputSchema: {
    type: "object",
    properties: {
      url: { type: "string", description: "URL to extract from" },
      extractTypes: {
        type: "array",
        items: {
          type: "string",
          enum: ["colors", "typography", "spacing", "shadows", "components"]
        },
        default: ["colors", "typography"]
      }
    },
    required: ["url"]
  }
}
```

### 9.3 MCP Context Management

Claude needs context about:
1. **Current project** (if any)
2. **Available components** (summary, not full list)
3. **Current recipe state** (if editing)
4. **Theme in use**

**Context Strategy:**

```typescript
// When Claude starts a session, provide system context:
const systemContext = {
  library: {
    totalElements: elementRegistry.length,
    layers: {
      atoms: getElementsByLayer('atom').length,
      molecules: getElementsByLayer('molecule').length,
      organisms: getElementsByLayer('organism').length,
      templates: getElementsByLayer('template').length,
    },
    categories: categoryMeta.map(c => c.id),
    themes: availableThemes.map(t => t.id),
  },
  currentProject: projectId ? {
    id: project.id,
    name: project.name,
    theme: project.theme,
    pageCount: project.pages.length,
  } : null,
  currentRecipe: recipeId ? {
    id: recipe.id,
    blockCount: recipe.blocks.length,
    blocks: recipe.blocks.map(b => ({ _id: b._id, _type: b._type })),
  } : null,
};
```

### 9.4 MCP Server Architecture

```
mcp-server/
├── src/
│   ├── index.ts              # Entry point, server setup
│   ├── tools/
│   │   ├── search.ts         # search_elements
│   │   ├── get-element.ts    # get_element
│   │   ├── list-themes.ts    # list_themes
│   │   ├── create-recipe.ts  # create_recipe
│   │   ├── update-recipe.ts  # update_recipe
│   │   ├── preview-recipe.ts # preview_recipe
│   │   ├── export-recipe.ts  # export_recipe
│   │   └── extract-design.ts # extract_design
│   ├── context/
│   │   ├── session.ts        # Session management
│   │   └── project.ts        # Project context
│   ├── services/
│   │   ├── registry.ts       # Access element registry
│   │   ├── recipe.ts         # Recipe CRUD
│   │   ├── theme.ts          # Theme resolution
│   │   └── export.ts         # Code generation
│   └── utils/
│       ├── validation.ts
│       └── serialization.ts
├── package.json
└── tsconfig.json
```

---

## 10. Visual Editor (Advanced Drag-Anywhere Canvas)

> **Design Philosophy**: Framer-like experience with infinite canvas, absolute positioning,
> smart guides, and pixel-perfect control. Not just section stacking—true visual design.

### 10.1 Editor Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      ADVANCED VISUAL EDITOR                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │  [≡] UI Museum    │ File  Edit  View  Insert │     [Preview]  [Export]  ││
│  │                   │ Arrange  Help             │     [Share]    [▼ More]  ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
│  ┌──────┐ ┌────────────────────────────────────────────────────┐ ┌────────┐│
│  │      │ │                                                    │ │        ││
│  │  L   │ │                     CANVAS                         │ │   R    ││
│  │  E   │ │                                                    │ │   I    ││
│  │  F   │ │   ┌─────────────────────────────────────────────┐  │ │   G    ││
│  │  T   │ │   │                                             │  │ │   H    ││
│  │      │ │   │              PAGE FRAME                     │  │ │   T    ││
│  │  P   │ │   │           (1440 x auto)                     │  │ │        ││
│  │  A   │ │   │                                             │  │ │   P    ││
│  │  N   │ │   │   ┌───────────────────────────────────────┐ │  │ │   A    ││
│  │  E   │ │   │   │            HERO                       │ │  │ │   N    ││
│  │  L   │ │   │   │   ┌──────────┐                        │ │  │ │   E    ││
│  │      │ │   │   │   │  Logo    │    ┌────────────────┐  │ │  │ │   L    ││
│  │      │ │   │   │   └──────────┘    │   Navigation   │  │ │  │ │        ││
│  │ [+]  │ │   │   │                   └────────────────┘  │ │  │ │ Props  ││
│  │      │ │   │   │   ┌─────────────────────────────────┐ │ │  │ │ Style  ││
│  │ Lay- │ │   │   │   │        HEADLINE                 │ │ │  │ │ Layout ││
│  │ ers  │ │   │   │   │    "Build Something"            │ │ │  │ │ Fill   ││
│  │      │ │   │   │   └─────────────────────────────────┘ │ │  │ │        ││
│  │ Com- │ │   │   │   ┌─────────┐                         │ │  │ │ [x,y]  ││
│  │ pon- │ │   │   │   │  CTA    │                         │ │  │ │ [w,h]  ││
│  │ ents │ │   │   │   │ Button  │                         │ │  │ │ [r°]   ││
│  │      │ │   │   │   └─────────┘                         │ │  │ │        ││
│  │ Assets│ │  │   └───────────────────────────────────────┘ │  │ │        ││
│  │      │ │   │                                             │  │ │ ────── ││
│  │ Pages│ │   │   ┌───────────────────────────────────────┐ │  │ │ Effects││
│  │      │ │   │   │           FEATURES GRID               │ │  │ │ Shadow ││
│  │      │ │   │   │    [Card] [Card] [Card]               │ │  │ │ Blur   ││
│  │      │ │   │   └───────────────────────────────────────┘ │  │ │        ││
│  │      │ │   │                                             │  │ │        ││
│  │      │ │   └─────────────────────────────────────────────┘  │ │        ││
│  │      │ │                                                    │ │        ││
│  └──────┘ └────────────────────────────────────────────────────┘ └────────┘│
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │  [Desktop ▼]  │  Zoom: [100%] [-][+]  │  [Grid] [Guides]  │  [⌘ ⇧ ?]   ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 10.2 Canvas System

**Infinite Canvas with Page Frames:**
```typescript
interface CanvasState {
  // Viewport state
  viewport: {
    x: number;              // Pan X offset
    y: number;              // Pan Y offset
    zoom: number;           // 0.25 to 4.0 (25% to 400%)
  };

  // Page frame (the actual page being designed)
  frame: {
    width: number;          // 1440 (desktop), 768 (tablet), 375 (mobile)
    height: 'auto' | number;// Auto-expand or fixed height
    background: string;     // Background color/gradient
  };

  // Selection state
  selection: {
    blockIds: string[];     // Currently selected blocks
    isMultiSelect: boolean; // Shift+click multi-select
  };

  // Transform state (for selected elements)
  transform: {
    dragging: boolean;
    resizing: 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw' | null;
    rotating: boolean;
  };

  // Guide system
  guides: {
    showRulers: boolean;
    showGrid: boolean;
    gridSize: number;       // 8px default
    snapToGrid: boolean;
    snapToObjects: boolean;
    customGuides: { axis: 'x' | 'y'; position: number }[];
  };
}
```

**Smart Guides (Like Figma/Framer):**
```
┌─────────────────────────────────────────────────────────────────┐
│                    SMART GUIDE SYSTEM                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  When dragging an element, guides appear showing:               │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │                                                           │ │
│  │   ┌──────────┐                                           │ │
│  │   │  Elem A  │                                           │ │
│  │   └──────────┘                                           │ │
│  │        │                                                  │ │
│  │        │ 24px (distance guide)                           │ │
│  │        │                                                  │ │
│  │   ┌────┼─────────────────────────────────────────────┐   │ │
│  │   │    │                                              │   │ │
│  │   │    ▼ ─── ─── alignment guide ─── ─── ─── ─── ─── │   │ │
│  │   │   ┌──────────┐                                    │   │ │
│  │   │   │ Dragging │                                    │   │ │
│  │   │   │  Element │                                    │   │ │
│  │   │   └──────────┘                                    │   │ │
│  │   │                                                    │   │ │
│  │   └────────────────────────────────────────────────────┘   │ │
│  │                                                           │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  Guide Types:                                                   │
│  • Edge alignment (left, right, top, bottom edges align)       │
│  • Center alignment (horizontal/vertical centers align)         │
│  • Distance guides (show spacing in pixels)                    │
│  • Parent bounds (snap to container edges)                     │
│  • Grid snap (8px increments)                                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 10.3 Element Positioning System

**Three Positioning Modes:**

| Mode | Use Case | Behavior |
|------|----------|----------|
| **Flow** | Normal document flow | Elements stack vertically, auto-height |
| **Absolute** | Precise positioning | x,y coordinates relative to parent |
| **Fixed** | Sticky elements | Position relative to viewport |

```typescript
interface BlockPositioning {
  mode: 'flow' | 'absolute' | 'fixed';

  // For flow mode
  flow?: {
    marginTop: number;
    marginBottom: number;
    alignment: 'left' | 'center' | 'right' | 'stretch';
  };

  // For absolute/fixed mode
  position?: {
    x: number;            // Left position (px or %)
    y: number;            // Top position (px or %)
    width: number | 'auto';
    height: number | 'auto';
    rotation: number;     // Degrees (0-360)

    // Constraints (like Figma)
    constraints: {
      horizontal: 'left' | 'right' | 'center' | 'scale' | 'left-right';
      vertical: 'top' | 'bottom' | 'center' | 'scale' | 'top-bottom';
    };
  };

  // Z-index
  zIndex: number;
}
```

### 10.4 Drag-and-Drop System

**Drag Operations:**

```
┌─────────────────────────────────────────────────────────────────┐
│                    DRAG OPERATIONS                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. DRAG FROM LIBRARY                                           │
│     ┌──────────┐                                               │
│     │ Library  │──────drag─────▶  Canvas                       │
│     │ [Button] │                  Drop creates new block       │
│     └──────────┘                  at cursor position           │
│                                                                 │
│  2. DRAG TO REPOSITION                                          │
│     Click + drag on canvas element                              │
│     → Smart guides appear                                       │
│     → Snaps to grid/objects                                    │
│     → Updates block position in recipe                         │
│                                                                 │
│  3. DRAG TO REORDER (Flow mode)                                │
│     Drag element up/down within parent                         │
│     → Drop indicator shows insertion point                     │
│     → Reorders blocks array in recipe                          │
│                                                                 │
│  4. DRAG TO NEST                                                │
│     Drag element over a container component                     │
│     → Container highlights when hoverable                      │
│     → Drop nests element inside container                      │
│                                                                 │
│  5. RESIZE HANDLES                                              │
│     Drag corner/edge handles                                   │
│     → Hold Shift for proportional                              │
│     → Hold Alt for center-anchored                             │
│     → Updates width/height in recipe                           │
│                                                                 │
│  6. ROTATION                                                    │
│     Drag rotation handle (appears on hover)                    │
│     → Hold Shift for 15° increments                           │
│     → Updates rotation in recipe                               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 10.5 Selection & Multi-Select

**Selection Behaviors:**
- **Single click**: Select element, show bounding box + handles
- **Shift+click**: Add/remove from multi-selection
- **Click+drag (canvas)**: Marquee selection
- **⌘+A**: Select all in current parent
- **Escape**: Deselect all

**Multi-Select Operations:**
```
When multiple elements selected:
• Move all together
• Align (left, center, right, top, middle, bottom)
• Distribute (horizontal, vertical spacing)
• Group into a new Frame/Container
• Delete all
• Copy/paste all
```

### 10.6 Layers Panel

```
┌────────────────────────────────────────┐
│  LAYERS                            [+] │
├────────────────────────────────────────┤
│                                        │
│  ▼ Page: Home                          │
│    ├── ▼ Hero Section                  │
│    │     ├── Logo                   👁 │
│    │     ├── Navigation             👁 │
│    │     ├── Headline               👁 │
│    │     └── CTA Button             👁 │
│    │                                   │
│    ├── ▶ Features Grid            👁 │
│    │                                   │
│    ├── ▶ Testimonials             👁 │
│    │                                   │
│    └── ▼ Footer                        │
│          ├── Footer Links           👁 │
│          └── Copyright              👁 │
│                                        │
├────────────────────────────────────────┤
│  [🔍 Search layers...]                 │
└────────────────────────────────────────┘

Interactions:
• Click: Select layer (updates canvas selection)
• Double-click: Rename layer
• Drag: Reorder layers
• 👁 icon: Toggle visibility
• 🔒 icon: Lock layer (prevent editing)
• Right-click: Context menu (duplicate, delete, group)
```

### 10.7 Properties Panel (Right Side)

```
┌────────────────────────────────────────┐
│  PROPERTIES                            │
├────────────────────────────────────────┤
│                                        │
│  ┌────────────────────────────────────┐│
│  │ Hero Section                       ││
│  │ Type: organism/hero                ││
│  └────────────────────────────────────┘│
│                                        │
│  ─── LAYOUT ───────────────────────── │
│                                        │
│  Position: [Flow ▼]                    │
│                                        │
│  X: [0    ] px    Y: [0    ] px       │
│  W: [1440 ] px    H: [auto  ]         │
│                                        │
│  Rotation: [0°   ]                     │
│                                        │
│  ─── PROPS ────────────────────────── │
│                                        │
│  Variant: [● Default ○ Dark ○ Minimal]│
│                                        │
│  ─── CONTENT SLOTS ───────────────── │
│                                        │
│  Title:                                │
│  ┌────────────────────────────────────┐│
│  │ Build Something Amazing            ││
│  └────────────────────────────────────┘│
│                                        │
│  Subtitle:                             │
│  ┌────────────────────────────────────┐│
│  │ The fastest way to create...       ││
│  └────────────────────────────────────┘│
│                                        │
│  CTA Text: [Get Started      ]        │
│  CTA Link: [/signup          ]        │
│                                        │
│  Background Image:                     │
│  ┌────────────────────────────────────┐│
│  │ [📷 hero-bg.jpg    ] [Change]     ││
│  └────────────────────────────────────┘│
│                                        │
│  ─── STYLE ────────────────────────── │
│                                        │
│  Background:                           │
│  [■ #ffffff     ] [Solid ▼]           │
│                                        │
│  Border Radius: [8  ] px              │
│                                        │
│  Shadow: [● None ○ Small ○ Large]     │
│                                        │
│  Custom Classes:                       │
│  ┌────────────────────────────────────┐│
│  │ px-8 py-16 relative                ││
│  └────────────────────────────────────┘│
│                                        │
│  ─── EFFECTS ──────────────────────── │
│                                        │
│  Opacity: [100%] ─────────────●       │
│                                        │
│  Blend Mode: [Normal ▼]               │
│                                        │
│  Backdrop Blur: [0px]                 │
│                                        │
└────────────────────────────────────────┘
```

### 10.8 Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| **V** | Select tool |
| **T** | Text tool |
| **F** | Frame/container tool |
| **R** | Rectangle |
| **Space + drag** | Pan canvas |
| **⌘ + scroll** | Zoom in/out |
| **⌘ + 0** | Zoom to fit |
| **⌘ + 1** | Zoom to 100% |
| **⌘ + C/V** | Copy/paste |
| **⌘ + D** | Duplicate |
| **⌘ + G** | Group selection |
| **⌘ + ⇧ + G** | Ungroup |
| **⌘ + Z** | Undo |
| **⌘ + ⇧ + Z** | Redo |
| **Delete/Backspace** | Delete selection |
| **⌘ + ]** | Bring forward |
| **⌘ + [** | Send backward |
| **Arrow keys** | Nudge 1px |
| **⇧ + Arrow** | Nudge 10px |

### 10.9 Responsive Design

**v1 Approach: Component-Level Responsiveness**

For v1, responsiveness is handled at the **component level**, not per-block:
- Components use standard Tailwind responsive utilities internally
- No per-block breakpoint overrides in recipes
- Canvas preview shows how components adapt naturally

```
┌─────────────────────────────────────────────────────────────────┐
│                    VIEWPORT PREVIEW (v1)                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │   [Desktop 1440]    [Tablet 768]    [Mobile 375]          │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  Preview-only viewport switching:                               │
│  • See how components naturally respond to viewport size        │
│  • No configuration needed - components self-adapt              │
│  • Components use internal Tailwind breakpoints (md:, lg:)      │
│                                                                 │
│  Example component internal responsive code:                    │
│  <div className="flex flex-col md:flex-row gap-4 md:gap-8">    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Deferred to v1.1: Per-Block Responsive Overrides**

Future enhancement allowing per-block breakpoint customization:
```json
{
  "type": "HeroSection",
  "props": { /* default */ },
  "_uiMuseum": {
    "responsive": {
      "768": { "props": { "layout": "stack" } },
      "375": { "props": { "hideImage": true } }
    }
  }
}
```

**Why Component-Level for v1:**
| Benefit | Description |
|---------|-------------|
| Simpler mental model | Components "just work" at any size |
| Faster development | No responsive editor UI needed |
| Better defaults | Atomic design = inherently responsive |
| Less data complexity | No breakpoint overrides in recipe JSON |

### 10.10 Real-Time Preview

**Preview Modes:**
- **Edit Mode**: Shows selection boxes, guides, panels
- **Preview Mode**: Hides all editor UI, shows page as-is
- **Device Preview**: Shows in device frame (iPhone, iPad, etc.)
- **Full Screen**: Opens in new tab

**Live Sync:**
- Changes in editor update preview instantly
- No page refresh needed
- WebSocket connection for real-time updates

### 10.11 Implementation Libraries (Recommended)

| Library | Purpose |
|---------|---------|
| **@dnd-kit/core** | Drag and drop system |
| **react-rnd** | Resizable and draggable |
| **@use-gesture/react** | Pan, zoom, pinch gestures |
| **zustand** | Canvas state management |
| **immer** | Immutable state updates |
| **react-hotkeys-hook** | Keyboard shortcuts |
| **@floating-ui/react** | Tooltips, context menus |
| **tiptap** | Rich text editing (for text slots) |

---

## 11. Search & Discovery

### 11.1 Current Search

Current implementation:
- Simple string matching on name, description, tags
- No ranking or relevance scoring
- No fuzzy matching
- Searches client-side over full registry

### 11.2 Enhanced Search (Proposed)

**Search Features:**

| Feature | Description |
|---------|-------------|
| **Fuzzy matching** | "buton" matches "button" |
| **Synonyms** | "nav" matches "navigation" |
| **Category filtering** | Search within category |
| **Tag filtering** | Filter by multiple tags |
| **Relevance ranking** | Best matches first |
| **AI search** | Natural language queries |

**Search Index:**
```typescript
interface SearchIndex {
  // Pre-built for fast search
  elements: IndexedElement[];

  // Inverted indices
  byTag: Map<string, string[]>;      // tag → element IDs
  byCategory: Map<string, string[]>; // category → element IDs
  byLayer: Map<string, string[]>;    // layer → element IDs

  // Full-text index (using lunr.js or similar)
  textIndex: lunr.Index;
}

interface IndexedElement {
  id: string;
  name: string;
  nameLower: string;
  description: string;
  descriptionLower: string;
  tags: string[];
  category: string;
  layer: string;

  // AI-enhanced
  aiDescription?: string;
  useCases?: string[];
  keywords?: string[];  // Generated from AI analysis
}
```

**Search API:**
```typescript
interface SearchQuery {
  text?: string;           // Free text query
  layer?: ElementLayer;
  category?: ElementCategory;
  tags?: string[];
  limit?: number;
  offset?: number;
}

interface SearchResult {
  elements: ElementEntry[];
  total: number;
  facets: {
    layers: { layer: string; count: number }[];
    categories: { category: string; count: number }[];
    tags: { tag: string; count: number }[];
  };
}
```

### 11.3 AI-Enhanced Discovery

For MCP/chat interface, support natural language queries:

```
User: "I need something to show user testimonials"
→ AI analyzes intent
→ Searches for: testimonials, reviews, quotes, social proof
→ Returns: TestimonialsSection, QuoteCard, ReviewGrid
```

**AI Search Flow:**
1. Parse natural language intent
2. Extract keywords and concepts
3. Map to registry tags/categories
4. Rank by relevance to intent
5. Return with explanations

### 11.4 Error Handling

**Error Categories:**

| Category | Examples | User Experience |
|----------|----------|-----------------|
| **Network Errors** | API timeout, offline | Toast + retry button |
| **Validation Errors** | Invalid recipe JSON, missing required field | Inline field errors |
| **Conflict Errors** | Stale data, concurrent edit | Modal with options |
| **System Errors** | Database down, WebSocket disconnect | Full-page error state |

**Error Response Format:**
```typescript
interface ErrorResponse {
  error: {
    code: string;           // 'VALIDATION_ERROR', 'CONFLICT', 'NOT_FOUND'
    message: string;        // Human-readable message
    field?: string;         // For validation errors
    details?: unknown;      // Additional context
  };
  timestamp: string;
  requestId: string;        // For debugging/support
}
```

**Error Boundaries:**
```
┌─────────────────────────────────────────────────────────────────┐
│                    ERROR BOUNDARY HIERARCHY                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  App-Level Boundary (catches everything)                        │
│  └── Route-Level Boundary (per page)                           │
│      └── Feature-Level Boundary (per feature)                  │
│          └── Component-Level Boundary (isolated components)    │
│                                                                 │
│  Each level shows progressively smaller error UI:               │
│  • App: Full-page error with refresh button                     │
│  • Route: Page error with "Go Home" option                      │
│  • Feature: Panel error with retry option                       │
│  • Component: Inline placeholder with retry                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**WebSocket Reconnection:**
- Auto-reconnect with exponential backoff (1s, 2s, 4s, 8s, max 30s)
- Show "Reconnecting..." status in header
- Queue changes during disconnect, replay on reconnect
- After 5 failed attempts, show manual reconnect button

### 11.5 Loading States

**Loading State Patterns:**

| Pattern | Use Case | Implementation |
|---------|----------|----------------|
| **Skeleton** | List/grid loading | Gray pulsing placeholders |
| **Spinner** | Action in progress | Overlay with spinner |
| **Progress** | Multi-step operations | Progress bar with steps |
| **Optimistic** | Quick mutations | Update UI before server confirms |

**Loading State Hierarchy:**
```
┌─────────────────────────────────────────────────────────────────┐
│                    LOADING STATES                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Initial Load:                                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ [▓▓▓░░░░░░░] Loading project...                            ││
│  │                                                             ││
│  │  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐││
│  │  │ ████████████   │  │ ████████████   │  │ ████████████   │││
│  │  │ ████           │  │ ████           │  │ ████           │││
│  │  │ ████████       │  │ ████████       │  │ ████████       │││
│  │  └────────────────┘  └────────────────┘  └────────────────┘││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                 │
│  Action Loading (non-blocking):                                 │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ [Save] → [⟳ Saving...] → [✓ Saved]                         ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Optimistic Updates:**
```typescript
// Recipe update with optimistic UI
async function updateRecipe(recipeId: string, changes: Partial<Recipe>) {
  // 1. Immediately update local state (optimistic)
  setLocalRecipe(prev => ({ ...prev, ...changes }));

  // 2. Send to server
  try {
    await api.updateRecipe(recipeId, changes);
    // 3a. Success - state already correct
  } catch (error) {
    // 3b. Failure - revert to previous state
    setLocalRecipe(previousRecipe);
    showErrorToast('Failed to save changes');
  }
}
```

**Loading Timeouts:**
- Show spinner after 100ms (avoid flash for fast operations)
- Show "Still loading..." after 5s
- Show "This is taking longer than usual" after 15s with retry option
- Hard timeout at 30s with error state

---

## 12. Export & Deployment

### 12.1 Export Formats

| Format | Output | Use Case |
|--------|--------|----------|
| **React + Tailwind** | .tsx files + CSS | Most common |
| **HTML + CSS** | Static HTML | Simple sites |
| **Next.js App** | Full Next.js project | Production apps |

### 12.2 Export Structure (React + Tailwind)

```
export/
├── components/          # Used components
│   ├── HeroSection.tsx
│   ├── FeatureGrid.tsx
│   └── Footer.tsx
├── styles/
│   ├── tokens.css       # Design tokens
│   └── theme.css        # Theme overrides
├── pages/
│   └── index.tsx        # Page component
├── package.json         # Dependencies
└── README.md            # Setup instructions
```

### 12.3 Export Process

```typescript
async function exportRecipe(
  recipe: PageRecipe,
  options: ExportOptions
): Promise<ExportResult> {
  // 1. Collect all used components
  const usedComponents = collectUsedComponents(recipe);

  // 2. Generate component code (or copy from registry)
  const componentCode = await generateComponentCode(usedComponents);

  // 3. Generate page code
  const pageCode = generatePageCode(recipe);

  // 4. Generate theme CSS
  const themeCSS = generateThemeCSS(recipe.root.theme);

  // 5. Generate package.json
  const packageJson = generatePackageJson(usedComponents);

  // 6. Bundle into zip or write to directory
  return bundle({
    components: componentCode,
    pages: { 'index.tsx': pageCode },
    styles: { 'tokens.css': tokensCSS, 'theme.css': themeCSS },
    'package.json': packageJson,
  });
}
```

### 12.4 Deployment Options

**Option A: Download & Self-Host**
- Export zip file
- User deploys to their own hosting

**Option B: Deploy to Vercel**
- One-click deploy
- Creates Vercel project
- Returns live URL

**Option C: Deploy to Netlify**
- Similar to Vercel
- Creates Netlify site

**Option D: GitHub Export**
- Push to new GitHub repo
- User controls from there

---

## 13. Library Expansion Pipeline

### 13.1 Extraction Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    EXTRACTION PIPELINE                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐                                               │
│  │    URL      │                                               │
│  └──────┬──────┘                                               │
│         │                                                       │
│         ▼                                                       │
│  ┌─────────────┐                                               │
│  │  Headless   │  Puppeteer/Playwright                         │
│  │  Browser    │  - Load page fully                            │
│  │             │  - Wait for JS execution                       │
│  │             │  - Take screenshots                            │
│  └──────┬──────┘                                               │
│         │                                                       │
│         ▼                                                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    EXTRACTORS                            │   │
│  │                                                          │   │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐    │   │
│  │  │ Colors  │  │Typography│  │ Spacing │  │ Shadows │    │   │
│  │  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘    │   │
│  │       │            │            │            │          │   │
│  │       ▼            ▼            ▼            ▼          │   │
│  │  getComputed  getComputed  getComputed  getComputed     │   │
│  │  Styles()     Styles()     Styles()     Styles()        │   │
│  │       │            │            │            │          │   │
│  │       ▼            ▼            ▼            ▼          │   │
│  │   Cluster      Detect       Find Grid    Extract        │   │
│  │  (Delta E)    Families      System      Values          │   │
│  │                                                          │   │
│  └──────────────────────────┬───────────────────────────────┘   │
│                             │                                   │
│                             ▼                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    PATTERN DETECTOR                      │   │
│  │                                                          │   │
│  │  - Identify semantic regions (nav, hero, footer)         │   │
│  │  - Extract component boundaries                          │   │
│  │  - Classify component types                              │   │
│  │  - Score confidence                                      │   │
│  │                                                          │   │
│  └──────────────────────────┬───────────────────────────────┘   │
│                             │                                   │
│                             ▼                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    TOKEN CONVERTER                       │   │
│  │                                                          │   │
│  │  - Map extracted values to semantic tokens               │   │
│  │  - Suggest primary/secondary/accent roles                │   │
│  │  - Generate CSS variable file                            │   │
│  │                                                          │   │
│  └──────────────────────────┬───────────────────────────────┘   │
│                             │                                   │
│                             ▼                                   │
│  ┌─────────────┐                                               │
│  │  Inventory  │  Store for future use                         │
│  │   Store     │                                               │
│  └─────────────┘                                               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 13.2 Color Extraction Algorithm

```typescript
interface ExtractedColor {
  value: string;         // Hex
  occurrences: number;
  contexts: ('bg' | 'text' | 'border')[];
}

async function extractColors(page: Page): Promise<ExtractedColor[]> {
  // 1. Get all computed colors from DOM
  const rawColors = await page.evaluate(() => {
    const colors: Map<string, { count: number; contexts: Set<string> }> = new Map();

    document.querySelectorAll('*').forEach(el => {
      const style = getComputedStyle(el);

      // Background color
      const bg = style.backgroundColor;
      if (bg && bg !== 'rgba(0, 0, 0, 0)') {
        addColor(bg, 'bg');
      }

      // Text color
      const text = style.color;
      if (text) {
        addColor(text, 'text');
      }

      // Border color
      const border = style.borderColor;
      if (border && border !== 'rgba(0, 0, 0, 0)') {
        addColor(border, 'border');
      }
    });

    return Array.from(colors.entries());
  });

  // 2. Cluster similar colors using Delta E (CIE 2000)
  const clustered = clusterColors(rawColors, { threshold: 5 });

  // 3. Sort by frequency
  return clustered.sort((a, b) => b.occurrences - a.occurrences);
}

function clusterColors(colors: ExtractedColor[], options: { threshold: number }): ExtractedColor[] {
  // Use Delta E CIE 2000 for perceptual color distance
  // Merge colors within threshold
  // Return representative color for each cluster
}
```

### 13.3 Component Detection Heuristics

| Pattern | Detection Rule |
|---------|----------------|
| **Navigation** | `<nav>` or role="navigation" or header with links |
| **Hero** | Large first section with h1 and CTA |
| **Feature Grid** | Grid/flex with 3+ similar children |
| **Pricing** | Section with price-like text ($, /mo) |
| **Footer** | `<footer>` or last section with links |
| **Card** | Bordered/shadowed container with image + text |
| **Testimonial** | Quote with attribution |

### 13.4 Inventory Storage

```
inventory/
├── sites/
│   └── [domain]/
│       ├── extraction.json    # Full extraction result
│       ├── tokens.json        # Extracted tokens
│       ├── screenshots/
│       │   ├── full.png
│       │   ├── nav.png
│       │   ├── hero.png
│       │   └── ...
│       └── patterns/
│           ├── nav.json
│           ├── hero.json
│           └── ...
│
└── themes/
    └── [theme-id]/
        ├── tokens.css
        └── meta.json
```

---

## 14. Technical Implementation Phases

### Phase 0: Foundation (Current State)
**Status: COMPLETE**

- [x] 650+ elements in atomic hierarchy
- [x] Element registry with metadata
- [x] Three browse modes (Journey, Catalog, Elements)
- [x] Search functionality
- [x] Favorites and recently viewed
- [x] Component preview system

### Phase 0.5: Development Environment Setup
**Status: COMPLETED** ✅ (2025-12-28)

**Monorepo Structure:**
- [x] Initialize pnpm workspaces (`pnpm-workspace.yaml` created)
- [x] Create `packages/shared/` with Prisma schema
- [x] Create `packages/server/` with Express + Socket.io skeleton
- [x] Create `packages/mcp/` with MCP SDK skeleton
- [x] Move existing code to `packages/web/`
- [x] Configure Turborepo for build orchestration (`turbo.json`)
- [x] Set up TypeScript project references (composite builds)

**Database Setup:**
- [x] Create `docker-compose.yml` with PostgreSQL 15
- [x] Install and configure Prisma in `packages/shared`
- [x] Create initial Prisma schema (Project, Recipe, Asset)
- [x] Generate Prisma client
- [ ] Create seed script for development data (deferred to Phase 1)
- [ ] Test database connection from all packages (requires Docker start)

**Development Tooling:**
- [x] Configure unified `npm run dev` command (starts web + server + mcp via Turborepo)
- [x] Configure `npm run dev:mcp` command (starts MCP server)
- [x] Set up environment variables (.env, .env.example)
- [ ] Configure ESLint for monorepo (deferred - not blocking)
- [x] Configure TypeScript paths for cross-package imports
- [ ] Add Husky pre-commit hooks (deferred - not blocking)

**Verification Checklist:**
- [x] All packages type-check without errors
- [x] TypeScript finds types across packages
- [ ] `npm run dev` starts web server on localhost:5180 (requires Docker for DB)
- [ ] PostgreSQL accessible in Docker (Docker not started)
- [ ] Prisma Studio works (`npx prisma studio`)
- [ ] MCP server responds to test command

**Files Created:**
- `pnpm-workspace.yaml` - Monorepo workspace definition
- `turbo.json` - Turborepo build configuration
- `docker-compose.yml` - PostgreSQL 15 container
- `.env`, `.env.example` - Environment variables
- `packages/shared/` - Prisma schema, services, types
- `packages/server/` - Express API with WebSocket
- `packages/mcp/` - MCP server with CRUD tools
- `packages/web/` - Frontend (moved from src/)

**Success Criteria:**
- ✅ TypeScript compiles across all packages
- ✅ Package dependencies resolve correctly
- ⏳ Single `npm run dev` starts entire development environment (pending Docker)
- ⏳ Database migrations run on startup (pending Docker)
- ⏳ Hot reload works for all packages (pending Docker)
- ⏳ MCP server can import shared Prisma client (pending Docker)

### Phase 1: Token System
**Status: COMPLETED** ✅ (2025-12-28)

- [x] Create `/packages/web/tokens/` directory structure
- [x] Create core token CSS files (colors, spacing, typography, shadows, radii)
- [x] Create semantic token CSS file
- [x] Create theme CSS files (default, dark, brutal, neon, cosmic, glass)
- [x] Create ThemeProvider component
- [x] Create useTheme hook
- [x] Add theme switcher to UI (in Navigation)
- [x] Migrate ONE component category (buttons) to CSS variables (`ThemedButton`)
- [x] Test theme switching works (TypeScript compiles, no breaking changes)

**Files Created:**
- `tokens/core/colors.css` - Full color palette (gray, blue, green, red, yellow, purple, pink, orange, cyan, neon, cosmic)
- `tokens/core/spacing.css` - 4px grid spacing scale (0-96)
- `tokens/core/typography.css` - Font families, sizes, weights, line heights
- `tokens/core/shadows.css` - Standard, hard, glow, and ring shadows
- `tokens/core/radii.css` - Border radius scale
- `tokens/semantic/semantic.css` - Intent-based tokens (primary, surface, text, etc.)
- `tokens/themes/default.css` - Clean, modern light theme
- `tokens/themes/dark.css` - Dark mode with subtle contrast
- `tokens/themes/brutal.css` - Neo-brutalist with hard shadows
- `tokens/themes/neon.css` - Cyberpunk with neon glows
- `tokens/themes/cosmic.css` - Deep space with aurora accents
- `tokens/themes/glass.css` - Glassmorphism with blur effects
- `tokens/components/buttons.css` - Button hover/focus/active states
- `tokens/index.css` - Entry point importing all tokens
- `contexts/ThemeContext.tsx` - ThemeProvider + useTheme hook
- `components/shared/ThemeSwitcher.tsx` - Theme dropdown in navigation
- `elements/molecules/buttons/index.tsx` - Added `ThemedButton` component

**Success Criteria:**
- ✅ Theme switcher changes button appearance
- ✅ No breaking changes to existing code (legacy buttons still work)

### Phase 2: Slot System ✅ COMPLETED
**Duration: 1-2 weeks**

- [x] Install `@radix-ui/react-slot`
- [x] Add `slots` field to ElementEntry interface
- [x] Create SlotDefinition types
- [x] Create SlotRenderer component
- [x] Update 5 key organisms with slot definitions:
  - [x] HeroSection
  - [x] FeatureGrid
  - [x] Footer
  - [x] TestimonialsSection
  - [x] CtaSection
- [x] Test slots render correctly
- [x] Slots work with defaults when no content provided

**Files Created:**
- `elements/slots/index.ts` - Slot system exports
- `elements/slots/SlotRenderer.tsx` - SlotRenderer and SlotContainer components
- `elements/slots/SlotProvider.tsx` - SlotProvider context and useSlot hook

**Files Modified:**
- `elements/registry.ts` - Added SlotDefinition, SlotContent, SlotType, SlottableProps types and slots field
- `elements/index.ts` - Added slot system exports
- `elements/organisms/layout/index.tsx` - Added slot support to 5 key organisms

**Success Criteria:**
- ✅ Components work standalone with defaults
- ✅ Components accept custom content via slots

### Phase 3: Recipe System
**Duration: 2-3 weeks**

- [ ] Create `/src/recipes/` directory
- [ ] Define PageRecipe TypeScript schema
- [ ] Define BlockNode schema
- [ ] Create recipe validator
- [ ] Create RecipeRenderer component
- [ ] Create recipe layouts (stack, grid)
- [ ] Create 5 example recipes:
  - [ ] SaaS landing page
  - [ ] Portfolio
  - [ ] Pricing page
  - [ ] Blog post
  - [ ] Dashboard shell
- [ ] Add Recipe mode to UI
- [ ] Recipe preview renders correctly

**Success Criteria:**
- Can load recipe JSON and render full page
- All 5 example recipes render without errors

### Phase 4: Visual Editor & Backend API

**Part A: Backend Infrastructure**

**API Layer:**
- [ ] Create Express routes in `packages/server/src/routes/`
- [ ] Implement project CRUD endpoints (`/api/projects/*`)
- [ ] Implement recipe CRUD endpoints (`/api/recipes/*`)
- [ ] Implement asset upload endpoint (`/api/assets/upload`)
- [ ] Add request validation middleware (zod)
- [ ] Add error handling middleware
- [ ] Add request logging middleware

**WebSocket Layer:**
- [ ] Set up Socket.io in `packages/server`
- [ ] Implement recipe sync events (`recipe:created`, `recipe:updated`, `recipe:deleted`)
- [ ] Implement project sync events
- [ ] Add authentication to WebSocket connections
- [ ] Implement reconnection with event replay

**Service Layer (packages/shared):**
- [ ] Create ProjectService with Prisma operations
- [ ] Create RecipeService with Prisma operations
- [ ] Create AssetService with file operations
- [ ] Add service-level validation
- [ ] Add transaction support for multi-step operations

**Part B: Visual Editor UI**

**Editor Shell:**
- [ ] Create `/packages/web/src/components/editor/` directory
- [ ] Create Editor layout (sidebar, canvas, property panel)
- [ ] Create component browser in sidebar
- [ ] Create canvas container with zoom/pan (@use-gesture/react)
- [ ] Create property panel with JSON Forms or custom controls

**Canvas System:**
- [ ] Implement block rendering on canvas
- [ ] Implement block selection (click to select)
- [ ] Implement multi-select (shift+click)
- [ ] Implement drag and drop reordering (@dnd-kit)
- [ ] Implement block resize handles (react-rnd)
- [ ] Implement keyboard navigation (arrow keys nudge)

**Editing Features:**
- [ ] Implement "Add Section" flow (search + insert)
- [ ] Implement block deletion (backspace, context menu)
- [ ] Implement block duplication (⌘+D)
- [ ] Implement undo/redo (zustand middleware)
- [ ] Implement content editing in property panel
- [ ] Implement slot content editing

**Preview & Sync:**
- [ ] Implement responsive preview (desktop/tablet/mobile viewports)
- [ ] Connect to WebSocket for real-time sync
- [ ] Implement auto-save on blur (2s debounce)
- [ ] Implement optimistic updates
- [ ] Show sync status indicator in header

**Success Criteria:**
- Can create a page from scratch using visual editor
- Changes persist to PostgreSQL
- Multiple tabs see real-time updates
- Can edit content in blocks
- Can reorder blocks via drag and drop
- Can preview at different viewport sizes
- Undo/redo works correctly

### Phase 5: MCP Server
**Duration: 2-3 weeks**

**MCP Server Setup:**
- [ ] Configure `packages/mcp/` with MCP SDK
- [ ] Set up stdio transport for Claude Code
- [ ] Import shared services from `packages/shared`
- [ ] Configure environment for database connection

**Element Tools:**
- [ ] Implement `search_elements` tool (query, filters)
- [ ] Implement `get_element` tool (by ID, with composition tree)
- [ ] Implement `list_categories` tool (with counts)
- [ ] Implement `get_element_code` tool (returns code snippet)

**Recipe Tools:**
- [ ] Implement `create_recipe` tool (uses RecipeService)
- [ ] Implement `update_recipe` tool (uses RecipeService)
- [ ] Implement `delete_recipe` tool (uses RecipeService)
- [ ] Implement `get_recipe` tool (by ID)
- [ ] Implement `list_recipes` tool (by project)

**Project Tools:**
- [ ] Implement `create_project` tool
- [ ] Implement `list_projects` tool
- [ ] Implement `get_project` tool

**Theme Tools:**
- [ ] Implement `list_themes` tool
- [ ] Implement `get_theme_tokens` tool

**Integration:**
- [ ] Test all tools with Claude Code
- [ ] Create example prompts for common tasks
- [ ] Document MCP configuration in README
- [ ] Add to project `.claude/config.json`

**Success Criteria:**
- Can use Claude Code to create a page via chat
- Claude can search library and compose recipes
- Changes made via MCP appear in Visual Editor (via WebSocket)
- All CRUD operations work correctly

### Phase 6: Export System
**Duration: 1-2 weeks**

- [ ] Create export service
- [ ] Implement React + Tailwind export
- [ ] Generate component files
- [ ] Generate page file
- [ ] Generate theme CSS
- [ ] Generate package.json
- [ ] Create zip download
- [ ] Add export UI to editor

**Success Criteria:**
- Can export recipe to working React project
- Exported project runs with `npm install && npm run dev`

### Phase 7: Theme Migration

**Strategy: Replace hardcoded Tailwind colors with CSS variable references**

**Phase 7a: Token Audit**
- [ ] Audit all molecules for hardcoded colors
- [ ] Create mapping: hardcoded value → token name
- [ ] Identify zone-specific overrides needed
- [ ] Document edge cases (gradients, shadows with color)

**Phase 7b: Molecule Migration**
- [ ] Migrate buttons (24 variants):
  - [ ] Replace `bg-blue-500` → `bg-[var(--color-primary)]`
  - [ ] Replace `text-white` → `text-[var(--color-on-primary)]`
  - [ ] Update hover, active, disabled states
- [ ] Migrate inputs (32 variants):
  - [ ] Replace border colors
  - [ ] Replace focus ring colors
  - [ ] Replace placeholder colors
- [ ] Migrate cards (24 variants):
  - [ ] Replace background colors
  - [ ] Replace border colors
  - [ ] Replace shadow colors (where applicable)
- [ ] Migrate badges, indicators, feedback (64 variants total)

**Phase 7c: Organism Migration**
- [ ] Navigation components (headers, sidebars, footers)
- [ ] Layout components (sections, containers)
- [ ] Form organisms (login, signup, contact)
- [ ] Data display (tables, lists, grids)
- [ ] Media components (galleries, carousels)

**Phase 7d: Zone Library Migration**
- [ ] Create zone-specific token overrides:
  - [ ] artist-studio (warm, craft-inspired)
  - [ ] command-center (dark, tactical)
  - [ ] holographic-display (neon, futuristic)
  - [ ] living-blueprint (organic, blueprint)
  - [ ] neon-terminal (cyberpunk, high-contrast)
  - [ ] pulp-fiction (bold, retro)
  - [ ] etc.
- [ ] Migrate each zone to use tokens
- [ ] Test zone switching

**Phase 7e: Validation**
- [ ] Run visual regression tests
- [ ] Verify no hardcoded hex values remain (`grep -r "#[0-9a-fA-F]{6}"`)
- [ ] Test all 6 themes across all components
- [ ] Document any intentional hardcoded colors (brand logos, etc.)

**Success Criteria:**
- All components respond to theme changes
- No unintentional hardcoded color values remain
- Zone libraries use theme tokens with overrides
- Visual regression tests pass

### Phase 8: Extraction Pipeline (Future)
**Duration: 4-6 weeks**

- [ ] Create `/src/extraction/` directory
- [ ] Set up headless browser (Puppeteer/Playwright)
- [ ] Implement color extractor with clustering
- [ ] Implement typography extractor
- [ ] Implement spacing extractor
- [ ] Implement shadow extractor
- [ ] Implement pattern detector
- [ ] Create inventory storage
- [ ] Create extraction UI
- [ ] Add `extract_design` MCP tool

**Success Criteria:**
- Can extract tokens from any URL
- Can save extracted theme
- Can use extracted theme in projects

### Phase 9: Polish & Production (Future)
**Duration: 4-6 weeks**

- [ ] Performance optimization
- [ ] Error handling and recovery
- [ ] Accessibility audit
- [ ] Documentation
- [ ] Testing (unit, integration, e2e)
- [ ] Production deployment

---

## 15. Open Questions & Decisions

### 15.1 Critical Decisions (RESOLVED)

| # | Question | Decision | Rationale | Status |
|---|----------|----------|-----------|--------|
| 1 | **Tailwind version** | **v3** | Stability, compatibility, mature ecosystem | ✅ DECIDED |
| 2 | **Storage backend** | **PostgreSQL + IndexedDB (cache)** | PostgreSQL primary, IndexedDB read-cache only | ✅ DECIDED |
| 3 | **Multi-user support** | **Single user (v1)** | Simplicity first, auth can be added later | ✅ DECIDED |
| 4 | **Recipe format** | **Puck-inspired JSON** | Our extensions, not fully Puck-compatible | ✅ DECIDED |
| 5 | **Variant prop fate** | Keep for structural variants | Variants != themes (size, layout, etc.) | ✅ DECIDED |
| 6 | **Visual editor scope** | **Custom build** (@dnd-kit + react-rnd) | Full Framer-like canvas; Puck cannot deliver | ✅ DECIDED |
| 7 | **Export target** | React + Tailwind only | React ecosystem focus for v1 | ✅ DECIDED |
| 8 | **Asset handling** | **Local upload + export bundling** | Self-contained exports | ✅ DECIDED |
| 9 | **Hybrid flow** | **Shared PostgreSQL + WebSocket** | WebSocket REQUIRED for real-time sync | ✅ DECIDED |
| 10 | **Backend architecture** | **Unified server + separate MCP** | Single `npm run dev`, simpler DX | ✅ DECIDED |
| 11 | **Offline support** | **Online-only (v1)** | Eliminates sync complexity | ✅ DECIDED |
| 12 | **Per-block responsive** | **Deferred to v1.1** | Components self-responsive for v1 | ✅ DECIDED |
| 13 | **Element registry** | **Static TypeScript** | Version controlled, shared package | ✅ DECIDED |
| 14 | **Token system** | **CSS variables** | DTCG overkill for web-only v1 | ✅ DECIDED |
| 15 | **Analytics** | **Event hooks only** | Full analytics not needed for single-user | ✅ DECIDED |

### 15.2 Open Technical Questions

1. **How to handle component updates?**
   - When a component in the registry is updated, what happens to recipes using it?
   - Option A: Recipes always use latest version
   - Option B: Recipes pin to specific version
   - Option C: Show warning on breaking changes
   - **Leaning toward**: Option A with Option C for breaking changes

2. **How to handle responsive design?**
   - **DECIDED**: Component-level responsiveness for v1
   - Per-block breakpoint overrides deferred to v1.1
   - See Section 10.9 for viewport preview details

3. **How to handle forms and interactivity?**
   - Recipe system is static; how to handle form submissions?
   - Option A: Export handles form setup
   - Option B: Provide form integration guidance
   - Option C: Out of scope for v1
   - **Leaning toward**: Option A - Export generates form handlers with TODO comments

4. **How to handle images/assets?**
   - **DECIDED**: Local file storage with export bundling
   - Storage: `{PROJECT_ROOT}/data/uploads/`
   - See Section 5.6 for detailed asset model

5. **How to handle custom CSS?**
   - **DECIDED**: Allow custom Tailwind classes with validation
   - Properties panel includes "Custom Classes" field
   - Validates against Tailwind class patterns

### 15.3 UX Questions

1. **How do users discover related components?**
   - Show "Similar components" in detail view?
   - Show "Used together with" based on co-occurrence?

2. **How do users learn the system?**
   - Interactive tutorial?
   - Example projects to remix?
   - Video walkthroughs?

3. **How do users report issues with components?**
   - Built-in feedback mechanism?
   - GitHub issues?

---

## 16. Success Metrics

### 16.1 Phase Completion Metrics

| Phase | Key Metric | Target |
|-------|------------|--------|
| **Phase 1** | Theme switching works | 100% of buttons |
| **Phase 2** | Slots render correctly | 5 organisms |
| **Phase 3** | Recipes render | 5 complete pages |
| **Phase 4** | Editor is usable | Can create page in <10 min |
| **Phase 5** | MCP works | Can chat-create page |
| **Phase 6** | Export works | Exported code runs |
| **Phase 7** | Full theme support | All components themed |

### 16.2 User Success Metrics

| Metric | Target |
|--------|--------|
| Time to first page | < 15 minutes |
| Components used per page | 5-10 average |
| Export success rate | > 95% |
| MCP command success rate | > 90% |
| Theme switching satisfaction | > 4/5 rating |

### 16.3 Technical Health Metrics

| Metric | Target |
|--------|--------|
| TypeScript compilation | 0 errors |
| Recipe validation pass rate | > 99% |
| Preview render time | < 2 seconds |
| Export generation time | < 10 seconds |
| Bundle size | < 500KB (editor) |

---

## 17. Appendices

### 17.1 Glossary

**IMPORTANT: Use these terms consistently throughout the codebase and documentation.**

| Term | Definition | Incorrect Usage |
|------|------------|-----------------|
| **Element** | A component in the registry (atom, molecule, organism, or template) | "component", "widget", "piece" |
| **Recipe** | JSON definition of a page's structure and content | "template", "config", "schema" |
| **Block** | A single instance of an element in a recipe | "node", "item", "entry" |
| **Slot** | A named placeholder in an element that accepts content | "placeholder", "hole", "container" |
| **Token** | A design value (color, spacing, etc.) stored as CSS variable | "variable", "constant", "value" |
| **Theme** | A collection of token overrides that change appearance | "skin", "style", "variant" |
| **Zone** | A themed collection in the existing library (Arcade, Hacker, etc.) | "category", "group", "section" |
| **MCP** | Model Context Protocol - interface for Claude to use tools | "API", "CLI" |
| **Project** | Top-level container for recipes and assets | "site", "app", "workspace" |
| **Asset** | An uploaded file (image, font, etc.) associated with a project | "media", "file", "resource" |
| **Canvas** | The visual editing surface where blocks are arranged | "editor", "stage", "workspace" |
| **Properties Panel** | The right sidebar for editing selected block properties | "inspector", "options", "settings" |

**Architectural Terms:**

| Term | Definition |
|------|------------|
| **packages/shared** | Shared code: Prisma, services, types, element registry |
| **packages/server** | Express + Vite middleware + WebSocket server |
| **packages/mcp** | MCP server for Claude Code integration |
| **packages/web** | React frontend SPA |

### 17.2 Technology Stack

| Layer | Technology | Notes |
|-------|------------|-------|
| **Frontend** | React 18, TypeScript | SPA with Vite |
| **Styling** | Tailwind CSS v3, CSS Variables | v3 for stability |
| **State** | Zustand | Canvas state, selection, undo/redo |
| **Database** | **PostgreSQL 15** | Primary storage, shared by MCP + web |
| **Read Cache** | IndexedDB (v1: read-only) | No offline writes in v1 |
| **Real-time Sync** | Socket.io | WebSocket for MCP ↔ Editor sync |
| **MCP Server** | Node.js, @modelcontextprotocol/sdk | stdio transport |
| **API Server** | Express | REST + WebSocket, Vite middleware |
| **ORM** | **Prisma** | Type-safe PostgreSQL access |
| **Build Orchestration** | Turborepo | Monorepo builds |
| **Package Manager** | pnpm | Workspace support |
| **Extraction** | Puppeteer or Playwright | Design token extraction (future) |
| **Build** | Vite | Fast dev, optimized prod |
| **Visual Editor** | @dnd-kit, react-rnd, @use-gesture | Drag, resize, zoom |
| **Rich Text** | Tiptap | Slot content editing |
| **Image Processing** | Sharp | Thumbnail generation |
| **Testing** | Vitest, React Testing Library | Unit + integration |
| **Validation** | Zod | Request/response validation |

### 17.3 Reference Links

**Design Systems:**
- [Atomic Design by Brad Frost](https://atomicdesign.bradfrost.com/)
- [Radix UI](https://www.radix-ui.com/)
- [shadcn/ui](https://ui.shadcn.com/)

**Page Builders:**
- [Puck Editor](https://puckeditor.com/)
- [Builder.io](https://www.builder.io/)
- [Plasmic](https://www.plasmic.app/)

**MCP:**
- [MCP Documentation](https://modelcontextprotocol.io/)
- [Claude Code MCP Guide](https://docs.anthropic.com/claude-code/mcp)

**Tailwind:**
- [Tailwind CSS v3](https://tailwindcss.com/)
- [Tailwind CSS v4 Beta](https://tailwindcss.com/blog/tailwindcss-v4)

---

## 18. Research Review & Decision Rationale

> **Date:** 2025-12-28
> **Context:** External research report reviewed against primary sources and codebase analysis.
> **Conclusion:** Original plan decisions validated. Most external recommendations rejected as scope creep or context-inappropriate.

### 18.1 Research Methodology

The following areas were independently verified through primary source research:

1. **W3C DTCG Specification** - Verified status, adoption, and actual requirements
2. **Puck Editor** - Verified actual capabilities vs. marketing claims
3. **MCP Security** - Verified vulnerabilities and applicability to local tools
4. **Analytics Priority** - Verified industry norms for MVP builders
5. **Current Codebase** - Assessed migration costs and existing architecture

### 18.2 DTCG Design Tokens: REJECTED as Critical

**External Claim:** "Critical Gap - Plan should adopt DTCG format"

**Research Findings:**
| Claim | Reality |
|-------|---------|
| "Stable version 2025.10" | W3C Community Group Draft, NOT a W3C Standard. Spec says "Do not attempt to implement" |
| "10+ tools implementing" | Includes partial/in-progress work. Figma export incomplete (missing description field) |
| "Required for Figma/Sketch" | **False** - DTCG is optional. Tokens Studio supports both formats |

**Why DTCG is NOT critical for UI Museum:**
- We're building a **web-only** tool (no iOS/Android targets)
- Primary input is **website extraction**, not Figma files
- **CSS variables** work perfectly for runtime theme switching
- Current codebase is only 30% DTCG-ready; adoption would cost 2-3 weeks

**Decision:** Use CSS variables for v1. Reconsider DTCG for v2 if Figma integration is added.

### 18.3 Puck Editor Integration: REJECTED

**External Claim:** "Prototype with Puck before building custom editor"

**Research Findings:**

| Feature | Puck Capability | Our Requirement |
|---------|-----------------|-----------------|
| Absolute positioning (x,y) | ❌ No | ✅ Required |
| Rotation/transforms | ❌ No | ✅ Required |
| Smart guides/snapping | ❌ No | ✅ Required |
| Infinite canvas zoom/pan | ❌ No | ✅ Required |
| Pixel-precise placement | ❌ No | ✅ Required |
| CSS Grid/Flexbox layouts | ✅ Yes | ✅ Needed |

**Critical Finding:**
> "Puck is a page builder, not a design tool. 'Drag any component, anywhere' is marketing language for improved CSS Grid/Flexbox support—NOT absolute positioning."

**Puck GitHub Issues (165 open):**
- Theming incomplete (pinned issue #139)
- Memory leaks in caching
- Rich text field bugs
- Browser context issues (breaks in iframes)
- Performance problems with nested components

**Decision:** Build custom with @dnd-kit + react-rnd as originally planned. Puck cannot deliver Framer-like requirements. Prototyping would waste time confirming what research already shows.

**Note:** If scope were reduced to simple vertical stacking (no absolute positioning), Puck would become viable. But that's a different product.

### 18.4 MCP Security: DOWNGRADED from Critical

**External Claim:** "Missing security considerations" (marked High priority)

**Research Findings:**

| Vulnerability | Requirement | UI Museum Status |
|---------------|-------------|------------------|
| Tool Shadowing | Multiple MCP servers | ❌ Single server - N/A |
| Session Hijacking | Network exposure | ❌ Local stdio - N/A |
| OAuth vulnerabilities | Auth layer | ❌ No auth needed - N/A |
| Cross-origin attacks | Network exposure | ❌ No network - N/A |
| Prompt Injection | Untrusted external data | ❌ Local files only - N/A |

**Key Insight:**
> "For a local single-user tool, the practical attack surface is essentially the same as any Node.js development tool you run locally."

**Anthropic's Official Guidance for Local Servers:**
1. Use stdio transport ✅ (we do)
2. Human-in-the-loop for dangerous operations ✅ (you ARE the human)
3. Sandbox if running untrusted code ❌ (not applicable - we wrote the code)

**Decision:** Standard input validation practices. No OAuth, audit logging, or rate limiting needed for v1. Reconsider if ever multi-user or network-exposed.

### 18.5 Analytics & Telemetry: REJECTED as Critical

**External Claim:** "Critical Gap - No usage tracking" (marked High priority)

**Research Findings:**

| Open-Source Builder | Analytics at v1 Launch? |
|---------------------|-------------------------|
| Puck | No |
| GrapesJS | No |
| Penpot | No (optional telemetry added later) |
| Excalidraw | No (added ~3 years later in v0.15.0) |
| Silex | No (explicitly privacy-focused) |

**MVP Prioritization Frameworks:**
> "Analytics dashboards are categorized as 'Could-have' — nice-to-have features that can be postponed."

**Key Insight for Single-User Local Tool:**
- "Which components do I use?" → You know, you're the user
- "How long do I spend building?" → You know
- Analytics becomes valuable only with **multiple users needing aggregate insights**

**Decision:** Design with basic event hooks (emit when blocks added/removed) for future extensibility. Do NOT build analytics dashboard for v1.

### 18.6 Recommendations ACCEPTED (Modified)

| Recommendation | Integration Point | Implementation |
|----------------|-------------------|----------------|
| **Accessibility validation** | Phase 6 (Export) | Add axe-core to export pipeline for WCAG checking |
| **Performance budgets** | Phase 6 (Export) | Include Lighthouse scores and bundle size limits |
| **Component versioning** | Phase 3 (Recipe) | Simple changelog approach, no complex infrastructure |
| **Event hooks** | Phase 4 (Editor) | Design for future analytics without building analytics |

### 18.7 Codebase Assessment Summary

**Current State (from exploration):**
- Colors scattered across 46 files, no central token system
- Tailwind runs via CDN (runtime, not build-time)
- Zone system is hardcoded, not tokenized
- 30% DTCG-ready
- No analytics code exists

**DTCG Migration Cost (if pursued):**
| Task | Estimate |
|------|----------|
| Token mapping | 3-5 days |
| Component refactoring | 5-8 days |
| Zone integration | 2-3 days |
| Testing | 2-3 days |
| **Total** | **2-3 weeks** |

**Decision:** This cost does not justify DTCG adoption for v1. CSS variables provide sufficient theming capability.

### 18.8 Final Decision Matrix

| External Recommendation | Decision | Rationale |
|------------------------|----------|-----------|
| DTCG as "Critical" | ❌ **REJECT** | Overkill for web-only v1; 2-3 week cost |
| Puck prototype | ❌ **REJECT** | Cannot deliver Framer-like requirements |
| Analytics Phase 8.5 | ❌ **REJECT** | Not critical for single-user local tool |
| MCP security hardening | ❌ **REJECT** | Local stdio tool has minimal attack surface |
| Phase 9.5 AI Enhancements | ❌ **REJECT** | Scope creep - can add post-v1 |
| Accessibility in export | ✅ **ACCEPT** | Add axe-core to Phase 6 |
| Performance budgets | ✅ **ACCEPT** | Add to Phase 6 |
| Event hooks for future | ✅ **ACCEPT** | Extensibility without scope creep |

### 18.9 Validated Original Decisions

The following MASTER_PLAN.md decisions were **validated** by research:

| Decision | Validation |
|----------|------------|
| PostgreSQL + IndexedDB | ✅ Sound architecture for hybrid flow |
| Puck-compatible JSON format | ✅ Good interoperability (format, not editor) |
| Advanced Framer-like canvas | ✅ Key differentiator (must build custom) |
| @dnd-kit + react-rnd | ✅ Correct tools for absolute positioning |
| CSS variables for theming | ✅ Sufficient for web-only runtime theming |
| Single-user v1 | ✅ Appropriately scoped |
| 9 Phase plan | ✅ Realistic scope |

### 18.10 Research Sources

**Primary Sources Verified:**
- [W3C DTCG Specification](https://www.designtokens.org/TR/drafts/format/) - "Do not attempt to implement"
- [Puck GitHub](https://github.com/puckeditor/puck) - 165 open issues, no absolute positioning
- [Anthropic MCP Security](https://modelcontextprotocol.io/specification/draft/basic/security_best_practices)
- [Simon Willison MCP Analysis](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [Invariant Labs Tool Poisoning](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [Style Dictionary DTCG Docs](https://styledictionary.com/info/dtcg/)
- [arXiv:2504.08623](https://arxiv.org/abs/2504.08623) - Enterprise MCP Security paper

**Key Finding:**
> External research reports often recommend "kitchen sink" approaches. Context-specific judgment is essential. The original MASTER_PLAN.md decisions are sound and should be preserved.

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-12-28 | Claude + User | Initial comprehensive plan |
| 1.1 | 2025-12-28 | Claude + User | Added v1.1 header with decisions summary |
| 1.2 | 2025-12-28 | Claude + User | **Major update**: Incorporated 7 critical decisions: PostgreSQL + IndexedDB storage, Puck-compatible recipes, advanced Framer-like visual editor, local asset upload with bundling, shared storage for hybrid flow. Added detailed storage architecture (Section 4.2-4.3), PostgreSQL schema, expanded asset model with upload flow and export bundling, comprehensive drag-anywhere canvas specifications (10.1-10.11). Marked all critical decisions as DECIDED in Section 15. |
| 1.3 | 2025-12-28 | Claude + User | **Research Review**: Added Section 18 documenting external research validation. Rejected DTCG (scope creep), Puck integration (wrong tool), analytics (not critical), MCP hardening (local tool). Accepted axe-core accessibility and performance budgets for export pipeline. Validated all original architectural decisions. |
| 1.4 | 2025-12-28 | Claude + User | **Vulnerability Analysis & Fixes**: Comprehensive plan review identifying 30 vulnerabilities across 6 categories. Key changes: (1) **Backend Architecture** - Added Section 4.5 with monorepo structure (packages/shared, server, mcp, web), unified dev server with Vite middleware; (2) **Online-Only Storage** - Simplified IndexedDB to read-cache only, eliminated offline sync complexity; (3) **WebSocket Required** - Changed from "optional" to required for hybrid MCP + Editor flow; (4) **Conflict Prevention** - Added auto-save on blur, soft edit locks, read-before-write pattern; (5) **Asset Paths** - Specified `{PROJECT_ROOT}/data/uploads/` with env override; (6) **Responsive v1** - Simplified to component-level only, per-block responsive deferred to v1.1; (7) **Error Handling** - Added Section 11.4-11.5 for error boundaries, loading states, WebSocket reconnection; (8) **Phase 0.5** - Added development environment setup phase before Phase 1; (9) **Phase 4 Expansion** - Split into Backend Infrastructure (API, WebSocket, Services) and Visual Editor UI; (10) **Phase 7 Expansion** - Detailed token migration strategy with sub-phases; (11) **15 Resolved Decisions** - Updated decisions table with all v1.4 choices; (12) **Glossary** - Added enforced terminology with incorrect usage examples. |
| 1.5 | 2025-12-28 | Claude + User | **Phase 0.5 Implementation**: Monorepo development environment setup complete. Created: (1) `pnpm-workspace.yaml` with packages/\* glob; (2) `turbo.json` for build orchestration; (3) `packages/shared/` with Prisma schema (Project, Recipe, Asset models), TypeScript services (ProjectService, RecipeService, AssetService), Zod validation schemas; (4) `packages/server/` with Express + Socket.io, CRUD routes for projects/recipes/assets, WebSocket events for real-time updates; (5) `packages/mcp/` with @modelcontextprotocol/sdk, 8 MCP tools for CRUD operations; (6) `packages/web/` moved from src/ with updated Vite config; (7) `docker-compose.yml` for PostgreSQL 15; (8) `.env` / `.env.example` for configuration. All packages type-check successfully. |
| 1.6 | 2025-12-28 | Claude + User | **Phase 1 Implementation**: Token system complete. Created: (1) `tokens/core/` with colors.css (full palette including neon/cosmic), spacing.css (4px grid), typography.css (fonts, sizes, weights), shadows.css (soft, hard, glow), radii.css; (2) `tokens/semantic/semantic.css` with intent-based tokens (primary, surface, text, border, status); (3) `tokens/themes/` with 6 themes: default (clean modern), dark (subtle contrast), brutal (hard shadows, no radii), neon (green glows, monospace), cosmic (aurora accents, ethereal), glass (backdrop-blur, translucent); (4) `contexts/ThemeContext.tsx` with ThemeProvider, useTheme, theme persistence; (5) `components/shared/ThemeSwitcher.tsx` dropdown in Navigation; (6) `elements/molecules/buttons/ThemedButton` component using CSS variables for theme-responsive styling. All TypeScript compiles, no breaking changes. |

---

## Next Steps

1. ~~**Review this document** and resolve open questions in Section 15~~ ✅ Critical decisions resolved
2. ~~**Vulnerability analysis** and fix plan document~~ ✅ All 30 vulnerabilities addressed in v1.4
3. ~~**Phase 0.5** (Development Environment Setup)~~ ✅ Completed 2025-12-28
   - ✅ pnpm monorepo with Turborepo
   - ✅ PostgreSQL docker-compose.yml
   - ✅ Prisma schema in packages/shared
   - ✅ Express + Socket.io server in packages/server
   - ✅ MCP server in packages/mcp
   - ✅ Unified `npm run dev` command
4. ~~**Phase 1** (Token System)~~ ✅ Completed 2025-12-28
   - ✅ Core tokens (colors, spacing, typography, shadows, radii)
   - ✅ Semantic tokens (intent-based)
   - ✅ 6 themes (default, dark, brutal, neon, cosmic, glass)
   - ✅ ThemeProvider + useTheme hook
   - ✅ ThemeSwitcher in Navigation
   - ✅ ThemedButton component using CSS variables
5. **Start Phase 2** (Slot System) - Component composition with slots
6. **Set up project tracking** - GitHub issues, milestones for each phase
7. **Prototype visual editor** - Test @dnd-kit + react-rnd for canvas interactions

---

*This document is the single source of truth for the UI Museum website builder platform. Update it as decisions are made and phases are completed.*

**Last Updated:** 2025-12-28
**Version:** 1.6
**Status:** Phase 1 COMPLETE - Token system implemented with 6 themes, ready for Phase 2 (Slot System)
