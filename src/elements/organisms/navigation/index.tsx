// Organism: Navigation
// Complex navigation components composed of molecules
// Can import molecules and atoms

import React from 'react';
import { ElementEntry } from '../../registry';

// ============================================
// NAVIGATION STYLE PRESETS
// ============================================

export const navStyles = {
  // Navbar variants
  navbarDefault: 'flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200',
  navbarDark: 'flex items-center justify-between px-6 py-4 bg-gray-900 text-white',
  navbarGlass: 'flex items-center justify-between px-6 py-4 bg-white/10 backdrop-blur-md border-b border-white/20 text-white',
  navbarBrutal: 'flex items-center justify-between px-6 py-4 bg-white border-b-4 border-black',
  navbarNeon: 'flex items-center justify-between px-6 py-4 bg-black text-[#33ff00] border-b border-[#33ff00]',
  // Sidebar variants
  sidebarDefault: 'w-64 h-full bg-white border-r border-gray-200 flex flex-col',
  sidebarDark: 'w-64 h-full bg-gray-900 text-white flex flex-col',
  sidebarBrutal: 'w-64 h-full bg-white border-r-4 border-black flex flex-col',
  sidebarNeon: 'w-64 h-full bg-black text-[#33ff00] border-r border-[#33ff00] flex flex-col',
};

// ============================================
// NAVIGATION COMPONENTS
// ============================================

interface NavItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  active?: boolean;
  children?: NavItem[];
}

interface NavbarProps {
  logo?: React.ReactNode;
  items?: NavItem[];
  actions?: React.ReactNode;
  variant?: string;
  sticky?: boolean;
  className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  logo,
  items = [],
  actions,
  variant = 'default',
  sticky = false,
  className = '',
}) => {
  const variants: Record<string, string> = {
    default: navStyles.navbarDefault,
    dark: navStyles.navbarDark,
    glass: navStyles.navbarGlass,
    brutal: navStyles.navbarBrutal,
    neon: navStyles.navbarNeon,
  };

  return (
    <nav className={`${variants[variant] || variants.default} ${sticky ? 'sticky top-0 z-50' : ''} ${className}`}>
      <div className="flex items-center gap-8">
        {logo && <div className="font-bold text-xl">{logo}</div>}
        <ul className="hidden md:flex items-center gap-6">
          {items.map((item, i) => (
            <li key={i}>
              <a href={item.href || '#'} className={`transition-colors hover:opacity-70 ${item.active ? 'font-semibold' : ''}`}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      {actions && <div className="flex items-center gap-4">{actions}</div>}
    </nav>
  );
};

interface SidebarProps {
  items?: NavItem[];
  header?: React.ReactNode;
  footer?: React.ReactNode;
  variant?: string;
  collapsed?: boolean;
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  items = [],
  header,
  footer,
  variant = 'default',
  collapsed = false,
  className = '',
}) => {
  const variants: Record<string, string> = {
    default: navStyles.sidebarDefault,
    dark: navStyles.sidebarDark,
    brutal: navStyles.sidebarBrutal,
    neon: navStyles.sidebarNeon,
  };

  return (
    <aside className={`${variants[variant] || variants.default} ${collapsed ? 'w-16' : ''} ${className}`}>
      {header && <div className="p-4 border-b border-current/10">{header}</div>}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {items.map((item, i) => (
            <li key={i}>
              <a
                href={item.href || '#'}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-current/10 ${item.active ? 'bg-current/10 font-medium' : ''}`}
              >
                {item.icon && <span className="w-5 h-5">{item.icon}</span>}
                {!collapsed && <span>{item.label}</span>}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {footer && <div className="p-4 border-t border-current/10">{footer}</div>}
    </aside>
  );
};

interface TabGroupProps {
  tabs: { id: string; label: string; content?: React.ReactNode; icon?: React.ReactNode }[];
  activeTab?: string;
  onTabChange?: (id: string) => void;
  variant?: string;
  className?: string;
}

export const TabGroup: React.FC<TabGroupProps> = ({
  tabs,
  activeTab,
  onTabChange,
  variant = 'default',
  className = '',
}) => {
  const [active, setActive] = React.useState(activeTab || tabs[0]?.id);

  const handleTabClick = (id: string) => {
    setActive(id);
    onTabChange?.(id);
  };

  const tabStyles: Record<string, { list: string; tab: string; active: string }> = {
    default: {
      list: 'flex border-b border-gray-200',
      tab: 'px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors',
      active: 'text-blue-600 border-b-2 border-blue-600',
    },
    pills: {
      list: 'flex gap-2 p-1 bg-gray-100 rounded-lg',
      tab: 'px-4 py-2 rounded-md text-gray-600 hover:text-gray-900 transition-all',
      active: 'bg-white text-gray-900 shadow-sm',
    },
    brutal: {
      list: 'flex border-b-4 border-black',
      tab: 'px-4 py-2 border-2 border-transparent hover:bg-gray-100',
      active: 'bg-yellow-400 border-2 border-black -mb-1',
    },
    neon: {
      list: 'flex border-b border-[#33ff00] bg-black',
      tab: 'px-4 py-2 text-gray-500 hover:text-[#33ff00] transition-colors',
      active: 'text-[#33ff00] border-b-2 border-[#33ff00] shadow-[0_2px_10px_rgba(51,255,0,0.3)]',
    },
  };

  const style = tabStyles[variant] || tabStyles.default;

  return (
    <div className={className}>
      <div className={style.list} role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={active === tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`${style.tab} ${active === tab.id ? style.active : ''}`}
          >
            <span className="flex items-center gap-2">
              {tab.icon}
              {tab.label}
            </span>
          </button>
        ))}
      </div>
      <div className="p-4">
        {tabs.find((t) => t.id === active)?.content}
      </div>
    </div>
  );
};

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export const Breadcrumbs: React.FC<{ items: BreadcrumbItem[]; variant?: string; className?: string }> = ({
  items,
  variant = 'default',
  className = '',
}) => {
  const variants: Record<string, { text: string; separator: string; active: string }> = {
    default: { text: 'text-gray-500 hover:text-gray-700', separator: 'text-gray-400', active: 'text-gray-900 font-medium' },
    neon: { text: 'text-gray-500 hover:text-[#33ff00]', separator: 'text-[#33ff00]', active: 'text-[#33ff00]' },
    brutal: { text: 'text-black hover:underline', separator: 'text-black', active: 'font-bold' },
  };
  const style = variants[variant] || variants.default;

  return (
    <nav className={`flex items-center gap-2 text-sm ${className}`}>
      {items.map((item, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span className={style.separator}>/</span>}
          {i === items.length - 1 ? (
            <span className={style.active}>{item.label}</span>
          ) : (
            <a href={item.href || '#'} className={style.text}>{item.label}</a>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  variant?: string;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage = 1,
  totalPages = 10,
  onPageChange,
  variant = 'default',
  className = '',
}) => {
  const pageStyles: Record<string, { base: string; active: string; nav: string }> = {
    default: {
      base: 'px-3 py-1 rounded border border-gray-300 hover:bg-gray-100',
      active: 'bg-blue-500 text-white border-blue-500',
      nav: 'px-3 py-1 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50',
    },
    brutal: {
      base: 'px-3 py-1 border-2 border-black hover:bg-gray-100',
      active: 'bg-yellow-400 border-2 border-black shadow-[2px_2px_0_0_#000]',
      nav: 'px-3 py-1 border-2 border-black hover:bg-gray-100 disabled:opacity-50',
    },
    neon: {
      base: 'px-3 py-1 border border-gray-700 text-gray-500 hover:text-[#33ff00] hover:border-[#33ff00]',
      active: 'bg-[#33ff00] text-black border-[#33ff00]',
      nav: 'px-3 py-1 border border-[#33ff00] text-[#33ff00] hover:bg-[#33ff00]/10 disabled:opacity-50',
    },
  };
  const style = pageStyles[variant] || pageStyles.default;

  const pages = Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
    if (totalPages <= 5) return i + 1;
    if (currentPage <= 3) return i + 1;
    if (currentPage >= totalPages - 2) return totalPages - 4 + i;
    return currentPage - 2 + i;
  });

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button className={style.nav} disabled={currentPage === 1} onClick={() => onPageChange?.(currentPage - 1)}>Prev</button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange?.(page)}
          className={`${style.base} ${page === currentPage ? style.active : ''}`}
        >
          {page}
        </button>
      ))}
      <button className={style.nav} disabled={currentPage === totalPages} onClick={() => onPageChange?.(currentPage + 1)}>Next</button>
    </div>
  );
};

export const MegaMenu: React.FC<{ trigger: React.ReactNode; sections: { title: string; items: NavItem[] }[]; variant?: string; className?: string }> = ({
  trigger,
  sections,
  variant = 'default',
  className = '',
}) => {
  const [open, setOpen] = React.useState(false);
  const variants: Record<string, string> = {
    default: 'bg-white border border-gray-200 shadow-xl',
    dark: 'bg-gray-900 text-white border border-gray-700',
    brutal: 'bg-white border-4 border-black shadow-[8px_8px_0_0_#000]',
    neon: 'bg-black text-[#33ff00] border border-[#33ff00] shadow-[0_0_20px_rgba(51,255,0,0.2)]',
  };

  return (
    <div className={`relative ${className}`} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      {trigger}
      {open && (
        <div className={`absolute top-full left-0 mt-2 p-6 rounded-lg min-w-[600px] grid grid-cols-3 gap-8 z-50 ${variants[variant] || variants.default}`}>
          {sections.map((section, i) => (
            <div key={i}>
              <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide opacity-70">{section.title}</h3>
              <ul className="space-y-2">
                {section.items.map((item, j) => (
                  <li key={j}>
                    <a href={item.href || '#'} className="flex items-center gap-2 hover:opacity-70 transition-opacity">
                      {item.icon}
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const BottomNav: React.FC<{ items: NavItem[]; variant?: string; className?: string }> = ({
  items,
  variant = 'default',
  className = '',
}) => {
  const [active, setActive] = React.useState(0);
  const variants: Record<string, { bg: string; item: string; active: string }> = {
    default: { bg: 'bg-white border-t border-gray-200', item: 'text-gray-500', active: 'text-blue-500' },
    dark: { bg: 'bg-gray-900 border-t border-gray-800', item: 'text-gray-400', active: 'text-white' },
    brutal: { bg: 'bg-white border-t-4 border-black', item: 'text-black', active: 'text-blue-600 font-bold' },
    neon: { bg: 'bg-black border-t border-[#33ff00]', item: 'text-gray-600', active: 'text-[#33ff00]' },
  };
  const style = variants[variant] || variants.default;

  return (
    <nav className={`fixed bottom-0 left-0 right-0 ${style.bg} px-4 py-2 ${className}`}>
      <ul className="flex justify-around">
        {items.map((item, i) => (
          <li key={i}>
            <button
              onClick={() => setActive(i)}
              className={`flex flex-col items-center gap-1 p-2 transition-colors ${i === active ? style.active : style.item}`}
            >
              {item.icon && <span className="w-6 h-6">{item.icon}</span>}
              <span className="text-xs">{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export const CommandMenu: React.FC<{ open?: boolean; onClose?: () => void; items?: NavItem[]; variant?: string }> = ({
  open = false,
  onClose,
  items = [],
  variant = 'default',
}) => {
  const [search, setSearch] = React.useState('');
  const filteredItems = items.filter(item => item.label.toLowerCase().includes(search.toLowerCase()));

  const variants: Record<string, { overlay: string; panel: string; input: string; item: string }> = {
    default: {
      overlay: 'bg-black/50',
      panel: 'bg-white rounded-xl shadow-2xl border border-gray-200',
      input: 'bg-transparent border-b border-gray-200 focus:border-blue-500',
      item: 'hover:bg-gray-100',
    },
    brutal: {
      overlay: 'bg-black/50',
      panel: 'bg-white border-4 border-black shadow-[8px_8px_0_0_#000]',
      input: 'bg-transparent border-b-4 border-black',
      item: 'hover:bg-yellow-400',
    },
    neon: {
      overlay: 'bg-black/80',
      panel: 'bg-black border border-[#33ff00] shadow-[0_0_30px_rgba(51,255,0,0.3)]',
      input: 'bg-transparent border-b border-[#33ff00] text-[#33ff00]',
      item: 'hover:bg-[#33ff00]/10 text-[#33ff00]',
    },
  };
  const style = variants[variant] || variants.default;

  if (!open) return null;

  return (
    <div className={`fixed inset-0 ${style.overlay} flex items-start justify-center pt-[20vh] z-50`} onClick={onClose}>
      <div className={`w-full max-w-lg ${style.panel}`} onClick={(e) => e.stopPropagation()}>
        <input
          type="text"
          placeholder="Search commands..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`w-full px-4 py-3 text-lg outline-none ${style.input}`}
          autoFocus
        />
        <ul className="max-h-80 overflow-auto">
          {filteredItems.map((item, i) => (
            <li key={i}>
              <button className={`w-full flex items-center gap-3 px-4 py-3 text-left ${style.item}`}>
                {item.icon && <span className="w-5 h-5">{item.icon}</span>}
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// ============================================
// REGISTRY ENTRIES
// ============================================

const createNavEntry = (id: string, name: string, description: string, tags: string[], component: React.FC<any>, composedOf: string[] = []): ElementEntry => ({
  id: `org-nav-${id}`, name, layer: 'organism', category: 'organisms', description, themeAgnostic: false, composedOf,
  sourceComponents: ['multiple-zones'], extractedFrom: 'src/elements/organisms/navigation/index.tsx',
  previewType: 'fullwidth', hasInteraction: true, implementation: 'component', component,
  codeSnippet: `<${name.replace(/\s/g, '')} />`, tags: ['navigation', 'organism', ...tags],
});

export const navigationRegistry: ElementEntry[] = [
  // Navbar variants
  createNavEntry('navbar-default', 'Navbar', 'Default navigation bar', ['navbar', 'header', 'default'], Navbar, ['btn-ghost', 'badge-default']),
  createNavEntry('navbar-dark', 'Dark Navbar', 'Dark themed navbar', ['navbar', 'header', 'dark'], Navbar, ['btn-ghost']),
  createNavEntry('navbar-glass', 'Glass Navbar', 'Frosted glass navbar', ['navbar', 'glass', 'blur'], Navbar, ['surface-glass']),
  createNavEntry('navbar-brutal', 'Brutal Navbar', 'Neo-brutal navbar', ['navbar', 'brutal'], Navbar, ['border-brutal']),
  createNavEntry('navbar-neon', 'Neon Navbar', 'Glowing terminal navbar', ['navbar', 'neon', 'hacker'], Navbar, ['glow-green']),
  // Sidebar variants
  createNavEntry('sidebar-default', 'Sidebar', 'Default sidebar navigation', ['sidebar', 'menu', 'default'], Sidebar, ['btn-ghost']),
  createNavEntry('sidebar-dark', 'Dark Sidebar', 'Dark themed sidebar', ['sidebar', 'dark'], Sidebar, []),
  createNavEntry('sidebar-brutal', 'Brutal Sidebar', 'Neo-brutal sidebar', ['sidebar', 'brutal'], Sidebar, ['border-brutal']),
  createNavEntry('sidebar-neon', 'Neon Sidebar', 'Glowing sidebar', ['sidebar', 'neon'], Sidebar, ['glow-green']),
  // Tabs
  createNavEntry('tabs-default', 'Tab Group', 'Tabbed navigation', ['tabs', 'default'], TabGroup, []),
  createNavEntry('tabs-pills', 'Pill Tabs', 'Pill-style tabs', ['tabs', 'pills'], TabGroup, ['border-radius-full']),
  createNavEntry('tabs-brutal', 'Brutal Tabs', 'Neo-brutal tabs', ['tabs', 'brutal'], TabGroup, ['border-brutal']),
  createNavEntry('tabs-neon', 'Neon Tabs', 'Glowing tabs', ['tabs', 'neon'], TabGroup, ['glow-green']),
  // Other navigation
  createNavEntry('breadcrumbs', 'Breadcrumbs', 'Navigation breadcrumbs', ['breadcrumbs', 'path'], Breadcrumbs, []),
  createNavEntry('pagination-default', 'Pagination', 'Page navigation', ['pagination', 'pages'], Pagination, ['btn-outline']),
  createNavEntry('pagination-brutal', 'Brutal Pagination', 'Neo-brutal pagination', ['pagination', 'brutal'], Pagination, ['border-brutal']),
  createNavEntry('mega-menu', 'Mega Menu', 'Dropdown mega menu', ['menu', 'dropdown', 'mega'], MegaMenu, ['card-elevated']),
  createNavEntry('bottom-nav', 'Bottom Navigation', 'Mobile bottom nav', ['mobile', 'bottom', 'tabs'], BottomNav, []),
  createNavEntry('command-menu', 'Command Menu', 'Keyboard command palette', ['command', 'palette', 'search'], CommandMenu, ['input-text']),
];
