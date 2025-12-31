/**
 * RecipeRenderer
 *
 * Renders a PageRecipe by resolving component types from the registry
 * and passing props/slots to each component.
 */

import React from 'react';
import { ThemeProvider } from '../contexts';
import { getElement } from '../elements';
import type {
  BlockNode,
  RecipeRendererProps,
  BlockRendererProps,
  RecipeSlotContent,
} from './types';

// ============================================================================
// UNKNOWN BLOCK FALLBACK
// ============================================================================

interface UnknownBlockProps {
  type: string;
  blockId?: string;
}

const UnknownBlock: React.FC<UnknownBlockProps> = ({ type, blockId }) => (
  <div className="p-4 border-2 border-dashed border-red-300 bg-red-50 rounded-lg my-2">
    <div className="text-red-600 font-medium">Unknown Component</div>
    <div className="text-red-500 text-sm">Type: {type}</div>
    {blockId && <div className="text-red-400 text-xs">ID: {blockId}</div>}
  </div>
);

// ============================================================================
// EDITABLE BLOCK WRAPPER
// ============================================================================

interface EditableBlockProps {
  blockId: string;
  onClick?: (blockId: string) => void;
  children: React.ReactNode;
}

const EditableBlock: React.FC<EditableBlockProps> = ({ blockId, onClick, children }) => (
  <div
    className="relative group cursor-pointer"
    onClick={() => onClick?.(blockId)}
  >
    {/* Edit overlay on hover */}
    <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500 pointer-events-none transition-colors z-10">
      <div className="absolute -top-6 left-0 bg-blue-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
        Click to edit
      </div>
    </div>
    {children}
  </div>
);

// ============================================================================
// SLOT RESOLVER
// ============================================================================

/**
 * Resolve slot content to React nodes
 */
function resolveSlots(
  slotContent: Record<string, RecipeSlotContent> | undefined,
  slotDefinitions: Array<{ id: string; name: string; type: string; defaultValue?: unknown }> | undefined,
  onBlockClick?: (blockId: string) => void,
  editMode?: boolean
): Record<string, unknown> {
  const resolved: Record<string, unknown> = {};

  // If no slot definitions, return empty
  if (!slotDefinitions) return resolved;

  for (const def of slotDefinitions) {
    const content = slotContent?.[def.id];

    // Use default value if no content provided
    if (!content) {
      if (def.defaultValue !== undefined) {
        resolved[def.id] = def.defaultValue;
      }
      continue;
    }

    // Resolve based on content type
    switch (content.type) {
      case 'text':
        resolved[def.id] = content.value as string;
        break;

      case 'richtext':
        // For now, render as simple text. Could add markdown rendering.
        resolved[def.id] = (
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: content.value as string }}
          />
        );
        break;

      case 'image': {
        const img = content.value as { src: string; alt: string; width?: number; height?: number };
        resolved[def.id] = (
          <img
            src={img.src}
            alt={img.alt}
            width={img.width}
            height={img.height}
            className="max-w-full h-auto"
          />
        );
        break;
      }

      case 'component':
        resolved[def.id] = (
          <BlockRenderer
            block={content.value as BlockNode}
            onBlockClick={onBlockClick}
            editMode={editMode}
          />
        );
        break;

      case 'list':
        resolved[def.id] = (content.value as RecipeSlotContent[]).map((item, index) => {
          if (item.type === 'component') {
            return (
              <BlockRenderer
                key={index}
                block={item.value as BlockNode}
                onBlockClick={onBlockClick}
                editMode={editMode}
              />
            );
          }
          if (item.type === 'text') {
            return <span key={index}>{item.value as string}</span>;
          }
          return null;
        });
        break;

      default:
        resolved[def.id] = content.value;
    }
  }

  return resolved;
}

// ============================================================================
// BLOCK RENDERER
// ============================================================================

export const BlockRenderer: React.FC<BlockRendererProps> = ({
  block,
  onBlockClick,
  editMode,
}) => {
  // Look up component in registry
  const entry = getElement(block.type);

  // Handle unknown component
  if (!entry?.component) {
    return <UnknownBlock type={block.type} blockId={block._uiMuseum?.id} />;
  }

  const Component = entry.component;

  // Resolve slots
  const resolvedSlots = resolveSlots(
    block._uiMuseum?.slots,
    entry.slots,
    onBlockClick,
    editMode
  );

  // Build final props
  const props = {
    ...block.props,
    slots: resolvedSlots,
  };

  // Render component
  const rendered = <Component {...props} />;

  // Wrap in editable container if in edit mode
  if (editMode && block._uiMuseum?.id) {
    return (
      <EditableBlock blockId={block._uiMuseum.id} onClick={onBlockClick}>
        {rendered}
      </EditableBlock>
    );
  }

  return rendered;
};

// ============================================================================
// RECIPE RENDERER
// ============================================================================

export const RecipeRenderer: React.FC<RecipeRendererProps> = ({
  recipe,
  theme,
  customTokens: _customTokens, // Reserved for future CSS variable overrides
  onBlockClick,
  editMode,
  className,
}) => {
  // Determine theme (prop override > recipe root > default)
  const activeTheme = theme || recipe.root.theme || 'default';

  // Build root class names
  const rootClassName = [
    'recipe-root',
    recipe.root.className,
    className,
  ].filter(Boolean).join(' ');

  return (
    <ThemeProvider defaultTheme={activeTheme as 'default' | 'dark' | 'brutal' | 'neon' | 'cosmic' | 'glass'}>
      <div className={rootClassName}>
        {recipe.content.map((block, index) => (
          <BlockRenderer
            key={block._uiMuseum?.id || `block-${index}`}
            block={block}
            onBlockClick={onBlockClick}
            editMode={editMode}
          />
        ))}
      </div>
    </ThemeProvider>
  );
};

// ============================================================================
// LAYOUT COMPONENTS
// ============================================================================

interface StackLayoutProps {
  children: React.ReactNode;
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const StackLayout: React.FC<StackLayoutProps> = ({
  children,
  gap = 'none',
  className,
}) => {
  const gapClasses = {
    none: '',
    sm: 'space-y-2',
    md: 'space-y-4',
    lg: 'space-y-8',
    xl: 'space-y-16',
  };

  return (
    <div className={`flex flex-col ${gapClasses[gap]} ${className || ''}`}>
      {children}
    </div>
  );
};

interface GridLayoutProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const GridLayout: React.FC<GridLayoutProps> = ({
  children,
  columns = 3,
  gap = 'md',
  className,
}) => {
  const colClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-8',
  };

  return (
    <div className={`grid ${colClasses[columns]} ${gapClasses[gap]} ${className || ''}`}>
      {children}
    </div>
  );
};

interface SplitLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
  ratio?: '1:1' | '1:2' | '2:1' | '1:3' | '3:1';
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const SplitLayout: React.FC<SplitLayoutProps> = ({
  left,
  right,
  ratio = '1:1',
  gap = 'md',
  className,
}) => {
  const ratioClasses = {
    '1:1': 'md:grid-cols-2',
    '1:2': 'md:grid-cols-3 [&>:first-child]:col-span-1 [&>:last-child]:col-span-2',
    '2:1': 'md:grid-cols-3 [&>:first-child]:col-span-2 [&>:last-child]:col-span-1',
    '1:3': 'md:grid-cols-4 [&>:first-child]:col-span-1 [&>:last-child]:col-span-3',
    '3:1': 'md:grid-cols-4 [&>:first-child]:col-span-3 [&>:last-child]:col-span-1',
  };

  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-8',
  };

  return (
    <div className={`grid grid-cols-1 ${ratioClasses[ratio]} ${gapClasses[gap]} ${className || ''}`}>
      <div>{left}</div>
      <div>{right}</div>
    </div>
  );
};

interface SidebarLayoutProps {
  sidebar: React.ReactNode;
  content: React.ReactNode;
  sidebarPosition?: 'left' | 'right';
  sidebarWidth?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const SidebarLayout: React.FC<SidebarLayoutProps> = ({
  sidebar,
  content,
  sidebarPosition = 'left',
  sidebarWidth = 'md',
  className,
}) => {
  const widthClasses = {
    sm: 'w-48',
    md: 'w-64',
    lg: 'w-80',
  };

  const sidebarElement = (
    <aside className={`${widthClasses[sidebarWidth]} flex-shrink-0`}>
      {sidebar}
    </aside>
  );

  return (
    <div className={`flex ${className || ''}`}>
      {sidebarPosition === 'left' && sidebarElement}
      <main className="flex-1 min-w-0">{content}</main>
      {sidebarPosition === 'right' && sidebarElement}
    </div>
  );
};

export default RecipeRenderer;
