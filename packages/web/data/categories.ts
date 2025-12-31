export interface Category {
  id: string
  name: string
  description: string
  icon: string
  componentCount: number
}

export const categories: Category[] = [
  {
    id: 'typography',
    name: 'Typography & Text',
    description: 'Headings, body text, display fonts, and text effects across all design systems',
    icon: 'Type',
    componentCount: 12,
  },
  {
    id: 'buttons',
    name: 'Buttons & Actions',
    description: 'Primary, secondary, special effects, and interactive button variations',
    icon: 'MousePointerClick',
    componentCount: 10,
  },
  {
    id: 'cards',
    name: 'Cards & Containers',
    description: 'Standard cards, textured surfaces, and themed container components',
    icon: 'Square',
    componentCount: 10,
  },
  {
    id: 'inputs',
    name: 'Inputs & Forms',
    description: 'Text fields, selects, checkboxes, and specialized input controls',
    icon: 'TextCursor',
    componentCount: 10,
  },
  {
    id: 'progress',
    name: 'Progress & Status',
    description: 'Progress bars, loaders, status indicators, and countdown elements',
    icon: 'Loader',
    componentCount: 8,
  },
  {
    id: 'navigation',
    name: 'Navigation',
    description: 'Tabs, menus, breadcrumbs, and creative navigation patterns',
    icon: 'Navigation',
    componentCount: 8,
  },
  {
    id: 'data-display',
    name: 'Data Display',
    description: 'Galleries, lists, catalogs, and data visualization components',
    icon: 'LayoutGrid',
    componentCount: 10,
  },
  {
    id: 'feedback',
    name: 'Feedback & Alerts',
    description: 'Notifications, tooltips, celebrations, and user feedback elements',
    icon: 'Bell',
    componentCount: 8,
  },
  {
    id: 'toys',
    name: 'Interactive Toys',
    description: 'Games, physics simulations, and delightful interactive experiences',
    icon: 'Gamepad2',
    componentCount: 10,
  },
  {
    id: 'transitions',
    name: 'Transitions & Effects',
    description: 'Page transitions, reveals, morphs, and animated effects',
    icon: 'Sparkles',
    componentCount: 10,
  },
  {
    id: 'backgrounds',
    name: 'Backgrounds & Ambience',
    description: 'Textures, patterns, gradients, and atmospheric background treatments',
    icon: 'Layers',
    componentCount: 12,
  },
  {
    id: 'widgets',
    name: 'Specialized Widgets',
    description: 'Cassette players, floppy disks, projectors, and retro tech widgets',
    icon: 'Cog',
    componentCount: 12,
  },
]
