# Contributing to UI Museum

This guide explains how to add new elements to the UI Museum component library.

## Element Layers

Elements are organized into three atomic design layers:

| Layer | Purpose | Location |
|-------|---------|----------|
| **Atoms** | Primitive design tokens | `src/elements/atoms/{category}/` |
| **Molecules** | Simple composed components | `src/elements/molecules/{category}/` |
| **Organisms** | Complex UI sections | `src/elements/organisms/{category}/` |

## Adding a New Element

### 1. Choose the Correct Layer

- **Atom**: Single design token (color, shadow, icon, animation)
- **Molecule**: Simple component composed of atoms (button, input, badge)
- **Organism**: Complex component composed of molecules (navbar, modal, form)

### 2. Choose or Create a Category

**Atom Categories:**
- `icons`, `animations`, `colors`, `backgrounds`, `shadows`, `borders`, `typography`, `filters`, `shapes`, `surfaces`

**Molecule Categories:**
- `buttons`, `inputs`, `badges`, `cards`, `indicators`, `feedback`

**Organism Categories:**
- `navigation`, `data-display`, `forms`, `feedback`, `media`, `interactive`, `layout`

### 3. File Structure

Each category has an `index.tsx` file containing:
1. Style presets (for themed variants)
2. React components
3. Registry entries array

```
src/elements/molecules/buttons/
└── index.tsx    # All button components + registry
```

### 4. ID Naming Convention

Element IDs follow this pattern:

```
{layer-prefix}-{category-prefix}-{name}
```

| Layer | Prefix | Example |
|-------|--------|---------|
| Atom | none | `icon-arrow`, `shadow-lg`, `bg-grid` |
| Molecule | `mol-` | `mol-btn-primary`, `mol-input-text` |
| Organism | `org-{cat}-` | `org-nav-navbar`, `org-form-login` |

### 5. Create the Component

```tsx
// Example: Adding a new button molecule

interface GlowButtonProps {
  children: React.ReactNode;
  variant?: 'default' | 'neon' | 'brutal';
  onClick?: () => void;
}

export const GlowButton: React.FC<GlowButtonProps> = ({
  children,
  variant = 'default',
  onClick
}) => {
  const styles = {
    default: 'bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600',
    neon: 'bg-transparent border border-cyan-400 text-cyan-400 rounded px-4 py-2 shadow-[0_0_15px_rgba(0,255,255,0.5)]',
    brutal: 'bg-yellow-400 text-black border-4 border-black px-4 py-2 shadow-[4px_4px_0_0_#000]',
  };

  return (
    <button onClick={onClick} className={styles[variant]}>
      {children}
    </button>
  );
};
```

### 6. Create the Registry Entry

```tsx
import { ElementEntry } from '../../registry';

const createButtonEntry = (
  id: string,
  name: string,
  description: string,
  tags: string[],
  component: React.FC<any>,
  composedOf: string[] = []
): ElementEntry => ({
  id: `mol-btn-${id}`,
  name,
  layer: 'molecule',
  category: 'buttons',
  description,
  themeAgnostic: false,
  composedOf,
  sourceComponents: ['custom'],
  extractedFrom: 'src/elements/molecules/buttons/index.tsx',
  previewType: 'inline',
  hasInteraction: true,
  implementation: 'component',
  component,
  codeSnippet: `<${name.replace(/\s/g, '')} />`,
  tags: ['button', 'molecule', ...tags],
});

// Add to the registry array
export const buttonRegistry: ElementEntry[] = [
  // ... existing entries
  createButtonEntry(
    'glow',
    'Glow Button',
    'Button with glow effect on hover',
    ['glow', 'hover', 'effect'],
    GlowButton,
    ['shadow-glow', 'bg-blue'] // atoms this uses
  ),
];
```

### 7. Export from Category Index

The category `index.tsx` should export:
- All components
- The registry array

```tsx
// At the end of the file
export { GlowButton };
export { buttonRegistry };
```

### 8. Verify Registration

The category registry is automatically included via the layer index:
- `src/elements/atoms/index.ts` exports all atom registries
- `src/elements/molecules/index.ts` exports all molecule registries
- `src/elements/organisms/index.tsx` exports all organism registries
- `src/elements/registry.ts` combines all into `elementRegistry`

## Theme Variants

Most components should support multiple theme variants:

| Variant | Style |
|---------|-------|
| `default` | Clean, minimal |
| `dark` | Dark mode |
| `brutal` | Neo-brutalist (bold borders, hard shadows) |
| `neon` | Cyberpunk (glows, cyan/magenta) |
| `glass` | Glassmorphism (blur, transparency) |
| `arcade` | Retro gaming (pixels, purple) |
| `cosmic` | Space theme (gradients, stars) |

```tsx
const styles = {
  default: 'bg-white border border-gray-200',
  dark: 'bg-gray-900 border border-gray-700',
  brutal: 'bg-white border-4 border-black shadow-[4px_4px_0_0_#000]',
  neon: 'bg-black border border-cyan-400 shadow-[0_0_20px_rgba(0,255,255,0.3)]',
  glass: 'bg-white/10 backdrop-blur-xl border border-white/20',
};
```

## Zone Components

For zone-specific components (not atomic elements), add them to the appropriate zone file:

```
src/library/{zone-name}/index.tsx
```

**Available Zones:**
- `arcade-basement` - Retro gaming
- `hacker-terminal` - Cyberpunk terminal
- `cosmic-observatory` - Space theme
- `pulp-detective` - Noir/vintage
- `mad-science` - Laboratory
- `physics-playground` - Physics simulations
- `organic-garden` - Nature/botanical
- `retro-office` - Vintage office tech
- `cinema-stage` - Film/cinematic
- `geometry-lab` - Mathematical
- `artist-studio` - Hand-drawn/creative

## Registry Entry Requirements

Every element must have these fields:

| Field | Required | Description |
|-------|----------|-------------|
| `id` | Yes | Unique identifier |
| `name` | Yes | Display name |
| `layer` | Yes | 'atom', 'molecule', or 'organism' |
| `category` | Yes | Category within layer |
| `description` | Yes | Brief description |
| `themeAgnostic` | Yes | Works across all themes? |
| `sourceComponents` | Yes | Original source component IDs |
| `extractedFrom` | Yes | File path |
| `previewType` | Yes | 'inline', 'card', or 'fullwidth' |
| `hasInteraction` | Yes | Requires user interaction? |
| `implementation` | Yes | 'css-class', 'component', 'hook', 'token' |
| `tags` | Yes | Searchable tags array |
| `component` | If applicable | React component |
| `composedOf` | If applicable | IDs of constituent elements |

## Testing Components

1. **TypeScript Check:**
   ```bash
   npx tsc --noEmit
   ```

2. **Visual Check:**
   ```bash
   npm run dev
   ```
   Navigate to Elements Mode and find your component.

3. **Search Check:**
   Use the search feature to verify your tags work.

4. **Build Check:**
   ```bash
   npm run build
   ```

## Code Style

- Use TypeScript with explicit types
- Use Tailwind CSS utility classes
- Support theme variants via props
- Include descriptive JSDoc comments for complex components
- Keep components self-contained (no external state management)

## Pull Request Checklist

- [ ] Component renders correctly
- [ ] Registry entry is complete
- [ ] TypeScript compiles without errors
- [ ] All theme variants work
- [ ] Tags are descriptive and searchable
- [ ] `composedOf` references valid element IDs
