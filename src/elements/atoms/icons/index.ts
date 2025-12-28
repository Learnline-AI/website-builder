// Atom: Icons
// SVG icon components from the shared library
// Re-exported with registry entries for the element browser

import { ElementEntry } from '../../registry';

// Re-export all icons from shared library
export {
  Zap,
  Settings,
  Activity,
  Infinity,
  Volume2,
  Keyboard,
  Heart,
  Trash2,
  Search,
  BookOpen,
  Aperture,
  Mic,
  RefreshCw,
  Lightbulb,
  Puzzle,
  Skull,
  Star,
  RotateCcw,
  Scissors,
  Sun,
  Moon,
  HardDrive,
  EyeOff,
  ZoomIn,
  Plus,
  Server,
  Wifi,
  User,
  X,
  Box,
  Coffee,
  Calculator,
  Sparkles,
  ArrowRight,
  Check,
  AlertCircle,
  LayoutDashboard,
  Library,
  FileText,
  PieChart,
  PlayCircle,
  Trophy,
  Menu,
  ChevronRight,
  BarChart3,
  Calendar,
  Clock,
  Bell,
  LogOut,
  Copy,
  Info,
  Maximize2,
  ExternalLink,
  Target,
  Play,
  Square,
  FastForward,
  AlertTriangle,
  CheckCircle,
} from '../../../library/shared/icons';

import * as Icons from '../../../library/shared/icons';

// Helper to create icon registry entry
const createIconEntry = (
  id: string,
  name: string,
  description: string,
  tags: string[],
  component: React.FC<any>
): ElementEntry => ({
  id: `icon-${id}`,
  name,
  layer: 'atom',
  category: 'icons',
  description,
  themeAgnostic: true,
  sourceComponents: ['shared-icons'],
  extractedFrom: 'src/library/shared/icons.tsx',
  previewType: 'inline',
  hasInteraction: false,
  implementation: 'component',
  component,
  tags: ['icon', 'svg', ...tags],
});

// Registry entries for all icons
export const iconRegistry: ElementEntry[] = [
  // Action icons
  createIconEntry('zap', 'Zap', 'Lightning bolt icon for energy/power actions', ['action', 'energy', 'power', 'lightning'], Icons.Zap),
  createIconEntry('settings', 'Settings', 'Gear icon for settings/configuration', ['action', 'config', 'gear', 'preferences'], Icons.Settings),
  createIconEntry('activity', 'Activity', 'Heartbeat/activity line icon', ['status', 'health', 'monitoring', 'pulse'], Icons.Activity),
  createIconEntry('refresh-cw', 'Refresh', 'Circular arrows for refresh/reload', ['action', 'reload', 'sync', 'update'], Icons.RefreshCw),
  createIconEntry('rotate-ccw', 'Rotate CCW', 'Counter-clockwise rotation arrows', ['action', 'undo', 'rotate', 'back'], Icons.RotateCcw),
  createIconEntry('scissors', 'Scissors', 'Cutting scissors icon', ['action', 'cut', 'edit', 'trim'], Icons.Scissors),
  createIconEntry('zoom-in', 'Zoom In', 'Magnifying glass with plus', ['action', 'zoom', 'magnify', 'enlarge'], Icons.ZoomIn),
  createIconEntry('plus', 'Plus', 'Plus/add icon', ['action', 'add', 'create', 'new'], Icons.Plus),
  createIconEntry('x', 'Close', 'X icon for close/dismiss', ['action', 'close', 'dismiss', 'cancel'], Icons.X),
  createIconEntry('copy', 'Copy', 'Copy/duplicate icon', ['action', 'duplicate', 'clipboard'], Icons.Copy),
  createIconEntry('maximize2', 'Maximize', 'Expand/maximize arrows', ['action', 'expand', 'fullscreen'], Icons.Maximize2),
  createIconEntry('external-link', 'External Link', 'Arrow pointing out of box', ['action', 'link', 'open', 'navigate'], Icons.ExternalLink),
  createIconEntry('logout', 'Log Out', 'Exit/logout arrow icon', ['action', 'exit', 'signout'], Icons.LogOut),

  // UI element icons
  createIconEntry('infinity', 'Infinity', 'Infinity symbol for unlimited', ['symbol', 'unlimited', 'loop', 'endless'], Icons.Infinity),
  createIconEntry('volume2', 'Volume', 'Speaker with sound waves', ['media', 'audio', 'sound', 'speaker'], Icons.Volume2),
  createIconEntry('keyboard', 'Keyboard', 'Keyboard input icon', ['input', 'type', 'hardware'], Icons.Keyboard),
  createIconEntry('heart', 'Heart', 'Heart shape for favorites/likes', ['favorite', 'like', 'love', 'health'], Icons.Heart),
  createIconEntry('trash2', 'Trash', 'Trash can for delete', ['action', 'delete', 'remove', 'bin'], Icons.Trash2),
  createIconEntry('search', 'Search', 'Magnifying glass for search', ['action', 'find', 'lookup', 'query'], Icons.Search),
  createIconEntry('book-open', 'Book Open', 'Open book for reading/docs', ['content', 'documentation', 'read', 'learn'], Icons.BookOpen),
  createIconEntry('aperture', 'Aperture', 'Camera aperture/iris icon', ['media', 'camera', 'photo', 'lens'], Icons.Aperture),
  createIconEntry('mic', 'Microphone', 'Microphone for audio input', ['media', 'audio', 'record', 'voice'], Icons.Mic),
  createIconEntry('lightbulb', 'Lightbulb', 'Light bulb for ideas/tips', ['idea', 'tip', 'hint', 'suggestion'], Icons.Lightbulb),
  createIconEntry('puzzle', 'Puzzle', 'Puzzle piece for plugins/extensions', ['module', 'plugin', 'extension', 'component'], Icons.Puzzle),
  createIconEntry('skull', 'Skull', 'Skull icon for danger/death', ['warning', 'danger', 'death', 'scary'], Icons.Skull),
  createIconEntry('star', 'Star', 'Five-pointed star for ratings', ['rating', 'favorite', 'featured', 'important'], Icons.Star),

  // Theme icons
  createIconEntry('sun', 'Sun', 'Sun icon for light mode/day', ['theme', 'light', 'day', 'bright'], Icons.Sun),
  createIconEntry('moon', 'Moon', 'Moon icon for dark mode/night', ['theme', 'dark', 'night'], Icons.Moon),

  // System/tech icons
  createIconEntry('hard-drive', 'Hard Drive', 'Storage/disk icon', ['storage', 'disk', 'data', 'hardware'], Icons.HardDrive),
  createIconEntry('eye-off', 'Eye Off', 'Hidden/invisible eye icon', ['visibility', 'hide', 'private', 'password'], Icons.EyeOff),
  createIconEntry('server', 'Server', 'Server/database icon', ['infrastructure', 'backend', 'database', 'hosting'], Icons.Server),
  createIconEntry('wifi', 'Wifi', 'Wireless signal icon', ['network', 'internet', 'connection', 'wireless'], Icons.Wifi),
  createIconEntry('box', 'Box', '3D box/package icon', ['package', 'container', 'product', 'shipping'], Icons.Box),

  // User icons
  createIconEntry('user', 'User', 'Person/user avatar icon', ['profile', 'account', 'person', 'avatar'], Icons.User),

  // Lifestyle icons
  createIconEntry('coffee', 'Coffee', 'Coffee cup icon', ['break', 'beverage', 'cafe', 'morning'], Icons.Coffee),
  createIconEntry('calculator', 'Calculator', 'Calculator for math/finance', ['math', 'finance', 'calculate', 'numbers'], Icons.Calculator),

  // Decorative/effect icons
  createIconEntry('sparkles', 'Sparkles', 'Sparkle/magic effect icon', ['magic', 'effect', 'special', 'new', 'ai'], Icons.Sparkles),

  // Navigation icons
  createIconEntry('arrow-right', 'Arrow Right', 'Right-pointing arrow', ['navigation', 'next', 'forward', 'direction'], Icons.ArrowRight),
  createIconEntry('chevron-right', 'Chevron Right', 'Right chevron for navigation', ['navigation', 'next', 'expand', 'menu'], Icons.ChevronRight),
  createIconEntry('menu', 'Menu', 'Hamburger menu icon', ['navigation', 'hamburger', 'sidebar', 'mobile'], Icons.Menu),

  // Status icons
  createIconEntry('check', 'Check', 'Checkmark for success/done', ['status', 'success', 'done', 'complete'], Icons.Check),
  createIconEntry('check-circle', 'Check Circle', 'Circled checkmark', ['status', 'success', 'verified', 'approved'], Icons.CheckCircle),
  createIconEntry('alert-circle', 'Alert Circle', 'Circled exclamation mark', ['status', 'warning', 'info', 'attention'], Icons.AlertCircle),
  createIconEntry('alert-triangle', 'Alert Triangle', 'Warning triangle icon', ['status', 'warning', 'caution', 'danger'], Icons.AlertTriangle),
  createIconEntry('info', 'Info', 'Information circle icon', ['status', 'help', 'details', 'about'], Icons.Info),
  createIconEntry('bell', 'Bell', 'Notification bell icon', ['notification', 'alert', 'reminder'], Icons.Bell),

  // Layout icons
  createIconEntry('layout-dashboard', 'Dashboard', 'Dashboard layout grid', ['layout', 'grid', 'overview', 'admin'], Icons.LayoutDashboard),
  createIconEntry('library', 'Library', 'Library/collection icon', ['collection', 'archive', 'books', 'media'], Icons.Library),
  createIconEntry('target', 'Target', 'Bullseye target icon', ['goal', 'focus', 'aim', 'objective'], Icons.Target),

  // Document icons
  createIconEntry('file-text', 'File Text', 'Document with text lines', ['document', 'file', 'text', 'content'], Icons.FileText),

  // Chart icons
  createIconEntry('pie-chart', 'Pie Chart', 'Circular pie chart', ['analytics', 'data', 'statistics', 'chart'], Icons.PieChart),
  createIconEntry('bar-chart3', 'Bar Chart', 'Vertical bar chart', ['analytics', 'data', 'statistics', 'graph'], Icons.BarChart3),

  // Media control icons
  createIconEntry('play-circle', 'Play Circle', 'Circled play button', ['media', 'video', 'start', 'begin'], Icons.PlayCircle),
  createIconEntry('play', 'Play', 'Play triangle', ['media', 'video', 'start', 'audio'], Icons.Play),
  createIconEntry('square', 'Stop', 'Square stop button', ['media', 'stop', 'end', 'pause'], Icons.Square),
  createIconEntry('fast-forward', 'Fast Forward', 'Double arrow fast forward', ['media', 'skip', 'speed', 'next'], Icons.FastForward),

  // Achievement icons
  createIconEntry('trophy', 'Trophy', 'Trophy cup for achievements', ['achievement', 'award', 'winner', 'success'], Icons.Trophy),

  // Time icons
  createIconEntry('calendar', 'Calendar', 'Calendar for dates', ['date', 'schedule', 'time', 'event'], Icons.Calendar),
  createIconEntry('clock', 'Clock', 'Clock for time', ['time', 'schedule', 'duration', 'hours'], Icons.Clock),
];
