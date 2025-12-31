// Organism: Data Display
// Complex data visualization components
// Can import molecules and atoms

import React from 'react';
import { ElementEntry } from '../../registry';

// ============================================
// DATA DISPLAY COMPONENTS
// ============================================

interface Column {
  key: string;
  label: string;
  width?: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: Record<string, any>[];
  variant?: string;
  striped?: boolean;
  hoverable?: boolean;
  className?: string;
}

export const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  variant = 'default',
  striped = true,
  hoverable = true,
  className = '',
}) => {
  const variants: Record<string, { table: string; header: string; row: string; cell: string }> = {
    default: {
      table: 'w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm',
      header: 'bg-gray-50 text-gray-600 text-left text-sm font-semibold',
      row: striped ? 'even:bg-gray-50' : '',
      cell: 'px-4 py-3 border-b border-gray-200',
    },
    dark: {
      table: 'w-full border-collapse bg-gray-900 text-white rounded-lg overflow-hidden',
      header: 'bg-gray-800 text-gray-300 text-left text-sm font-semibold',
      row: striped ? 'even:bg-gray-800/50' : '',
      cell: 'px-4 py-3 border-b border-gray-700',
    },
    brutal: {
      table: 'w-full border-collapse bg-white border-4 border-black',
      header: 'bg-yellow-400 text-black text-left text-sm font-bold',
      row: striped ? 'even:bg-gray-100' : '',
      cell: 'px-4 py-3 border-b-2 border-black',
    },
    neon: {
      table: 'w-full border-collapse bg-black text-[#33ff00] border border-[#33ff00]',
      header: 'bg-[#33ff00]/10 text-[#33ff00] text-left text-sm font-mono',
      row: striped ? 'even:bg-[#33ff00]/5' : '',
      cell: 'px-4 py-3 border-b border-[#33ff00]/30',
    },
  };
  const style = variants[variant] || variants.default;

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className={style.table}>
        <thead>
          <tr className={style.header}>
            {columns.map((col) => (
              <th key={col.key} className={style.cell} style={{ width: col.width }}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className={`${style.row} ${hoverable ? 'hover:bg-blue-50/50' : ''}`}>
              {columns.map((col) => (
                <td key={col.key} className={style.cell}>
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

interface StatItem {
  label: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
}

export const StatsDashboard: React.FC<{ stats: StatItem[]; variant?: string; columns?: number; className?: string }> = ({
  stats,
  variant = 'default',
  columns = 4,
  className = '',
}) => {
  const cardStyles: Record<string, string> = {
    default: 'bg-white rounded-lg shadow-sm border border-gray-200 p-6',
    dark: 'bg-gray-800 rounded-lg text-white p-6',
    brutal: 'bg-white border-4 border-black shadow-[4px_4px_0_0_#000] p-6',
    neon: 'bg-black border border-[#33ff00] text-[#33ff00] p-6 shadow-[0_0_10px_rgba(51,255,0,0.2)]',
  };
  const trendColors = { up: 'text-green-500', down: 'text-red-500', neutral: 'text-gray-500' };

  return (
    <div className={`grid gap-4 ${className}`} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {stats.map((stat, i) => (
        <div key={i} className={cardStyles[variant] || cardStyles.default}>
          <div className="flex items-center justify-between">
            <span className="text-sm opacity-70">{stat.label}</span>
            {stat.icon && <span className="opacity-50">{stat.icon}</span>}
          </div>
          <p className="text-3xl font-bold mt-2">{stat.value}</p>
          {stat.change && (
            <p className={`text-sm mt-2 ${trendColors[stat.trend || 'neutral']}`}>{stat.change}</p>
          )}
        </div>
      ))}
    </div>
  );
};

interface TimelineItem {
  title: string;
  description?: string;
  date?: string;
  icon?: React.ReactNode;
  status?: 'completed' | 'current' | 'upcoming';
}

export const Timeline: React.FC<{ items: TimelineItem[]; variant?: string; className?: string }> = ({
  items,
  variant = 'default',
  className = '',
}) => {
  const variants: Record<string, { line: string; dot: string; dotActive: string; content: string }> = {
    default: {
      line: 'bg-gray-200',
      dot: 'bg-gray-300 border-2 border-white',
      dotActive: 'bg-blue-500 border-2 border-white',
      content: 'bg-white',
    },
    brutal: {
      line: 'bg-black',
      dot: 'bg-white border-4 border-black',
      dotActive: 'bg-yellow-400 border-4 border-black',
      content: 'bg-white border-2 border-black shadow-[4px_4px_0_0_#000]',
    },
    neon: {
      line: 'bg-[#33ff00]/30',
      dot: 'bg-gray-800 border-2 border-[#33ff00]/30',
      dotActive: 'bg-[#33ff00] border-2 border-[#33ff00] shadow-[0_0_10px_rgba(51,255,0,0.5)]',
      content: 'bg-black border border-[#33ff00]/30 text-[#33ff00]',
    },
  };
  const style = variants[variant] || variants.default;

  return (
    <div className={`relative ${className}`}>
      <div className={`absolute left-4 top-0 bottom-0 w-0.5 ${style.line}`} />
      <div className="space-y-6">
        {items.map((item, i) => (
          <div key={i} className="relative flex gap-4 pl-10">
            <div className={`absolute left-2 w-4 h-4 rounded-full ${item.status === 'completed' || item.status === 'current' ? style.dotActive : style.dot}`} />
            <div className={`flex-1 p-4 rounded-lg ${style.content}`}>
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">{item.title}</h4>
                {item.date && <span className="text-sm opacity-50">{item.date}</span>}
              </div>
              {item.description && <p className="mt-1 text-sm opacity-70">{item.description}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
  icon?: React.ReactNode;
}

export const TreeView: React.FC<{ nodes: TreeNode[]; variant?: string; className?: string }> = ({
  nodes,
  variant = 'default',
  className = '',
}) => {
  const [expanded, setExpanded] = React.useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const variants: Record<string, string> = {
    default: 'text-gray-700',
    neon: 'text-[#33ff00] font-mono',
    brutal: 'text-black font-bold',
  };

  const renderNode = (node: TreeNode, level: number = 0) => (
    <div key={node.id} style={{ marginLeft: level * 16 }}>
      <button
        onClick={() => toggle(node.id)}
        className={`flex items-center gap-2 py-1 hover:opacity-70 ${variants[variant] || variants.default}`}
      >
        {node.children && (
          <span className={`transition-transform ${expanded.has(node.id) ? 'rotate-90' : ''}`}>▶</span>
        )}
        {node.icon}
        {node.label}
      </button>
      {node.children && expanded.has(node.id) && node.children.map((child) => renderNode(child, level + 1))}
    </div>
  );

  return <div className={className}>{nodes.map((node) => renderNode(node))}</div>;
};

interface KanbanColumn {
  id: string;
  title: string;
  items: { id: string; title: string; description?: string }[];
}

export const KanbanBoard: React.FC<{ columns: KanbanColumn[]; variant?: string; className?: string }> = ({
  columns,
  variant = 'default',
  className = '',
}) => {
  const variants: Record<string, { column: string; header: string; card: string }> = {
    default: {
      column: 'bg-gray-100 rounded-lg p-4 min-w-[280px]',
      header: 'font-semibold text-gray-700 mb-4',
      card: 'bg-white rounded-lg p-4 shadow-sm border border-gray-200 mb-3',
    },
    dark: {
      column: 'bg-gray-800 rounded-lg p-4 min-w-[280px]',
      header: 'font-semibold text-white mb-4',
      card: 'bg-gray-700 rounded-lg p-4 text-white mb-3',
    },
    brutal: {
      column: 'bg-gray-100 border-4 border-black p-4 min-w-[280px]',
      header: 'font-bold text-black mb-4 border-b-4 border-black pb-2',
      card: 'bg-white border-2 border-black shadow-[4px_4px_0_0_#000] p-4 mb-3',
    },
    neon: {
      column: 'bg-black border border-[#33ff00]/30 p-4 min-w-[280px]',
      header: 'font-mono text-[#33ff00] mb-4 border-b border-[#33ff00]/30 pb-2',
      card: 'bg-gray-900 border border-[#33ff00]/30 text-[#33ff00] p-4 mb-3',
    },
  };
  const style = variants[variant] || variants.default;

  return (
    <div className={`flex gap-4 overflow-x-auto pb-4 ${className}`}>
      {columns.map((col) => (
        <div key={col.id} className={style.column}>
          <h3 className={style.header}>
            {col.title} <span className="opacity-50">({col.items.length})</span>
          </h3>
          {col.items.map((item) => (
            <div key={item.id} className={style.card}>
              <h4 className="font-medium">{item.title}</h4>
              {item.description && <p className="text-sm opacity-70 mt-1">{item.description}</p>}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

interface ListItem {
  id: string;
  title: string;
  subtitle?: string;
  avatar?: React.ReactNode;
  actions?: React.ReactNode;
}

export const ListView: React.FC<{ items: ListItem[]; variant?: string; className?: string }> = ({
  items,
  variant = 'default',
  className = '',
}) => {
  const variants: Record<string, { container: string; item: string }> = {
    default: {
      container: 'bg-white rounded-lg shadow-sm border border-gray-200 divide-y divide-gray-200',
      item: 'flex items-center gap-4 p-4 hover:bg-gray-50',
    },
    brutal: {
      container: 'bg-white border-4 border-black divide-y-2 divide-black',
      item: 'flex items-center gap-4 p-4 hover:bg-yellow-50',
    },
    neon: {
      container: 'bg-black border border-[#33ff00] divide-y divide-[#33ff00]/30',
      item: 'flex items-center gap-4 p-4 hover:bg-[#33ff00]/5 text-[#33ff00]',
    },
  };
  const style = variants[variant] || variants.default;

  return (
    <div className={`${style.container} ${className}`}>
      {items.map((item) => (
        <div key={item.id} className={style.item}>
          {item.avatar && <div className="flex-shrink-0">{item.avatar}</div>}
          <div className="flex-1 min-w-0">
            <h4 className="font-medium truncate">{item.title}</h4>
            {item.subtitle && <p className="text-sm opacity-70 truncate">{item.subtitle}</p>}
          </div>
          {item.actions && <div className="flex-shrink-0">{item.actions}</div>}
        </div>
      ))}
    </div>
  );
};

export const Calendar: React.FC<{ month?: number; year?: number; events?: { date: number; label: string }[]; variant?: string; className?: string }> = ({
  month = new Date().getMonth(),
  year = new Date().getFullYear(),
  events = [],
  variant = 'default',
  className = '',
}) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const variants: Record<string, { container: string; header: string; day: string; today: string; hasEvent: string }> = {
    default: {
      container: 'bg-white rounded-lg shadow-sm border border-gray-200 p-4',
      header: 'text-center font-semibold text-gray-500 text-sm py-2',
      day: 'text-center py-2 rounded hover:bg-gray-100 cursor-pointer',
      today: 'bg-blue-500 text-white rounded-full',
      hasEvent: 'bg-blue-100 text-blue-700 rounded',
    },
    brutal: {
      container: 'bg-white border-4 border-black p-4',
      header: 'text-center font-bold text-black text-sm py-2 border-b-2 border-black',
      day: 'text-center py-2 hover:bg-yellow-100 cursor-pointer',
      today: 'bg-yellow-400 border-2 border-black',
      hasEvent: 'bg-blue-200 border-2 border-black',
    },
    neon: {
      container: 'bg-black border border-[#33ff00] p-4 text-[#33ff00]',
      header: 'text-center font-mono text-[#33ff00]/70 text-sm py-2',
      day: 'text-center py-2 hover:bg-[#33ff00]/10 cursor-pointer',
      today: 'bg-[#33ff00] text-black rounded',
      hasEvent: 'border border-[#33ff00] rounded',
    },
  };
  const style = variants[variant] || variants.default;
  const today = new Date().getDate();

  return (
    <div className={`${style.container} ${className}`}>
      <div className="grid grid-cols-7 gap-1">
        {weekDays.map((day) => (
          <div key={day} className={style.header}>{day}</div>
        ))}
        {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
        {days.map((day) => {
          const hasEvent = events.some((e) => e.date === day);
          const isToday = day === today && month === new Date().getMonth() && year === new Date().getFullYear();
          return (
            <div key={day} className={`${style.day} ${isToday ? style.today : ''} ${hasEvent && !isToday ? style.hasEvent : ''}`}>
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ============================================
// REGISTRY ENTRIES
// ============================================

const createDataEntry = (id: string, name: string, description: string, tags: string[], component: React.FC<any>, composedOf: string[] = []): ElementEntry => ({
  id: `org-data-${id}`, name, layer: 'organism', category: 'organisms', description, themeAgnostic: false, composedOf,
  sourceComponents: ['multiple-zones'], extractedFrom: 'src/elements/organisms/data-display/index.tsx',
  previewType: 'card', hasInteraction: true, implementation: 'component', component,
  codeSnippet: `<${name.replace(/\s/g, '')} />`, tags: ['data', 'display', 'organism', ...tags],
});

export const dataDisplayRegistry: ElementEntry[] = [
  // Tables
  createDataEntry('table-default', 'Data Table', 'Sortable data table', ['table', 'grid', 'default'], DataTable, ['card-default']),
  createDataEntry('table-dark', 'Dark Table', 'Dark themed table', ['table', 'dark'], DataTable, []),
  createDataEntry('table-brutal', 'Brutal Table', 'Neo-brutal table', ['table', 'brutal'], DataTable, ['border-brutal']),
  createDataEntry('table-neon', 'Neon Table', 'Terminal-style table', ['table', 'neon'], DataTable, ['glow-green']),
  // Stats
  createDataEntry('stats-dashboard', 'Stats Dashboard', 'Metrics dashboard grid', ['stats', 'metrics', 'kpi'], StatsDashboard, ['card-stat']),
  createDataEntry('stats-brutal', 'Brutal Stats', 'Neo-brutal stats', ['stats', 'brutal'], StatsDashboard, ['card-brutal']),
  createDataEntry('stats-neon', 'Neon Stats', 'Glowing stats', ['stats', 'neon'], StatsDashboard, ['glow-green']),
  // Timeline
  createDataEntry('timeline-default', 'Timeline', 'Vertical timeline', ['timeline', 'history'], Timeline, ['badge-default']),
  createDataEntry('timeline-brutal', 'Brutal Timeline', 'Neo-brutal timeline', ['timeline', 'brutal'], Timeline, ['border-brutal']),
  createDataEntry('timeline-neon', 'Neon Timeline', 'Glowing timeline', ['timeline', 'neon'], Timeline, ['glow-green']),
  // Tree
  createDataEntry('tree-view', 'Tree View', 'Expandable tree', ['tree', 'hierarchy', 'folder'], TreeView, []),
  // Kanban
  createDataEntry('kanban-default', 'Kanban Board', 'Task board columns', ['kanban', 'board', 'tasks'], KanbanBoard, ['card-default']),
  createDataEntry('kanban-brutal', 'Brutal Kanban', 'Neo-brutal kanban', ['kanban', 'brutal'], KanbanBoard, ['card-brutal']),
  createDataEntry('kanban-neon', 'Neon Kanban', 'Glowing kanban', ['kanban', 'neon'], KanbanBoard, ['glow-green']),
  // List
  createDataEntry('list-view', 'List View', 'Item list with actions', ['list', 'items'], ListView, []),
  createDataEntry('list-brutal', 'Brutal List', 'Neo-brutal list', ['list', 'brutal'], ListView, ['border-brutal']),
  // Calendar
  createDataEntry('calendar-default', 'Calendar', 'Month calendar view', ['calendar', 'date', 'schedule'], Calendar, ['card-default']),
  createDataEntry('calendar-brutal', 'Brutal Calendar', 'Neo-brutal calendar', ['calendar', 'brutal'], Calendar, ['border-brutal']),
  createDataEntry('calendar-neon', 'Neon Calendar', 'Glowing calendar', ['calendar', 'neon'], Calendar, ['glow-green']),
];
