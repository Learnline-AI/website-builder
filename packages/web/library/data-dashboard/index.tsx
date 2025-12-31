import React, { useState } from 'react';
import { AlertTriangle, Check, ChevronDown } from '../shared/icons';

// --- METRIC CARD ---
export const MetricCard = () => {
  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#0f1419' }}>
      <div
        className="w-48 p-4 rounded-lg"
        style={{ background: '#1a2332', border: '1px solid #2d3748' }}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-400 uppercase tracking-wider">Revenue</span>
          <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: '#064e3b', color: '#34d399' }}>
            +12.5%
          </span>
        </div>
        <div className="text-2xl font-bold text-white">$48,352</div>
        <div className="text-xs text-gray-500 mt-1">vs $43,012 last month</div>
      </div>
    </div>
  );
};

// --- SPARKLINE CHART ---
export const SparklineChart = () => {
  const data = [20, 35, 25, 45, 30, 55, 40, 60, 50, 70, 65, 80];
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;

  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * 120;
    const y = 30 - ((val - min) / range) * 25;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#0f1419' }}>
      <div className="w-48 p-4 rounded-lg" style={{ background: '#1a2332', border: '1px solid #2d3748' }}>
        <div className="text-xs text-gray-400 mb-2">Active Users</div>
        <div className="text-xl font-bold text-white mb-3">2,847</div>
        <svg width="120" height="35" className="overflow-visible">
          <defs>
            <linearGradient id="sparkGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon
            points={`0,30 ${points} 120,30`}
            fill="url(#sparkGradient)"
          />
          <polyline
            points={points}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

// --- DONUT GAUGE ---
export const DonutGauge = () => {
  const percentage = 72;
  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#0f1419' }}>
      <div className="relative">
        <svg width="100" height="100" className="-rotate-90">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#2d3748"
            strokeWidth="8"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#8b5cf6"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-bold text-white">{percentage}%</span>
          <span className="text-[10px] text-gray-400">Complete</span>
        </div>
      </div>
    </div>
  );
};

// --- KPI BADGE ---
export const KPIBadge = () => {
  return (
    <div className="h-full flex items-center justify-center gap-3 flex-wrap p-6" style={{ background: '#0f1419' }}>
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: '#1a2332', border: '1px solid #2d3748' }}>
        <div className="w-2 h-2 rounded-full bg-green-400" />
        <span className="text-xs text-gray-300">Uptime</span>
        <span className="text-sm font-bold text-white">99.9%</span>
      </div>
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: '#1a2332', border: '1px solid #2d3748' }}>
        <div className="w-2 h-2 rounded-full bg-blue-400" />
        <span className="text-xs text-gray-300">Latency</span>
        <span className="text-sm font-bold text-white">24ms</span>
      </div>
    </div>
  );
};

// --- BAR CHART MINI ---
export const BarChartMini = () => {
  const data = [40, 65, 55, 80, 70, 90, 75];
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#0f1419' }}>
      <div className="p-4 rounded-lg" style={{ background: '#1a2332', border: '1px solid #2d3748' }}>
        <div className="text-xs text-gray-400 mb-3">Weekly Activity</div>
        <div className="flex items-end gap-1.5 h-16">
          {data.map((val, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div
                className="w-5 rounded-t transition-all duration-300"
                style={{
                  height: `${val * 0.6}px`,
                  background: i === 5 ? '#3b82f6' : '#2d3748',
                }}
              />
              <span className="text-[10px] text-gray-500">{days[i]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- DATA TABLE ---
export const DataTable = () => {
  const rows = [
    { name: 'api.example.com', status: 'healthy', requests: '12.4k' },
    { name: 'cdn.example.com', status: 'healthy', requests: '8.2k' },
    { name: 'db.example.com', status: 'warning', requests: '3.1k' },
  ];

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#0f1419' }}>
      <div className="rounded-lg overflow-hidden" style={{ background: '#1a2332', border: '1px solid #2d3748' }}>
        <table className="text-xs">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="px-4 py-2 text-left text-gray-400 font-medium">Endpoint</th>
              <th className="px-4 py-2 text-left text-gray-400 font-medium">Status</th>
              <th className="px-4 py-2 text-right text-gray-400 font-medium">Requests</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-gray-700/50 last:border-0">
                <td className="px-4 py-2 text-white font-mono">{row.name}</td>
                <td className="px-4 py-2">
                  <span className={`flex items-center gap-1 ${row.status === 'healthy' ? 'text-green-400' : 'text-yellow-400'}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {row.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-right text-gray-300">{row.requests}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- STATUS DOT ---
export const StatusDot = () => {
  return (
    <div className="h-full flex items-center justify-center gap-4 p-6" style={{ background: '#0f1419' }}>
      <div className="flex items-center gap-2">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
        </span>
        <span className="text-sm text-gray-300">Online</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-yellow-500" />
        <span className="text-sm text-gray-300">Warning</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-red-500" />
        <span className="text-sm text-gray-300">Error</span>
      </div>
    </div>
  );
};

// --- LIVE PULSE ---
export const LivePulse = () => {
  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#0f1419' }}>
      <div className="flex items-center gap-3 px-4 py-2 rounded-lg" style={{ background: '#1a2332', border: '1px solid #2d3748' }}>
        <div className="relative">
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          <div className="absolute inset-0 w-3 h-3 bg-red-500 rounded-full animate-ping opacity-75" />
        </div>
        <span className="text-sm text-white font-medium">LIVE</span>
        <span className="text-xs text-gray-400">234 viewers</span>
      </div>
    </div>
  );
};

// --- TREND ARROW ---
export const TrendArrow = () => {
  return (
    <div className="h-full flex items-center justify-center gap-6 p-6" style={{ background: '#0f1419' }}>
      <div className="text-center">
        <div className="flex items-center gap-1 justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
          <span className="text-lg font-bold text-green-400">23%</span>
        </div>
        <span className="text-xs text-gray-400">Growth</span>
      </div>
      <div className="text-center">
        <div className="flex items-center gap-1 justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
          <span className="text-lg font-bold text-red-400">8%</span>
        </div>
        <span className="text-xs text-gray-400">Churn</span>
      </div>
    </div>
  );
};

// --- PROGRESS RING ---
export const ProgressRing = () => {
  const segments = [
    { percent: 45, color: '#3b82f6', label: 'Desktop' },
    { percent: 35, color: '#8b5cf6', label: 'Mobile' },
    { percent: 20, color: '#6366f1', label: 'Tablet' },
  ];

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#0f1419' }}>
      <div className="flex items-center gap-4">
        <div className="relative">
          <svg width="80" height="80" className="-rotate-90">
            {segments.reduce((acc, seg, i) => {
              const prevOffset = acc.offset;
              const circumference = 2 * Math.PI * 35;
              const dashLength = (seg.percent / 100) * circumference;
              acc.offset += dashLength;
              acc.elements.push(
                <circle
                  key={i}
                  cx="40"
                  cy="40"
                  r="35"
                  fill="none"
                  stroke={seg.color}
                  strokeWidth="6"
                  strokeDasharray={`${dashLength} ${circumference - dashLength}`}
                  strokeDashoffset={-prevOffset}
                  strokeLinecap="round"
                />
              );
              return acc;
            }, { offset: 0, elements: [] as React.ReactElement[] }).elements}
          </svg>
        </div>
        <div className="space-y-1.5">
          {segments.map((seg, i) => (
            <div key={i} className="flex items-center gap-2 text-xs">
              <div className="w-2 h-2 rounded-full" style={{ background: seg.color }} />
              <span className="text-gray-400">{seg.label}</span>
              <span className="text-white font-medium">{seg.percent}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- DATA CARD ---
export const DataCard = () => {
  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#0f1419' }}>
      <div className="w-56 p-4 rounded-lg" style={{ background: '#1a2332', border: '1px solid #2d3748' }}>
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs text-gray-400 mb-1">Total Users</div>
            <div className="text-2xl font-bold text-white">124,892</div>
          </div>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#3b82f620' }}>
            <span className="text-lg">👥</span>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-3 text-xs">
          <span className="text-green-400">↑ 12.3%</span>
          <span className="text-gray-500">from last week</span>
        </div>
      </div>
    </div>
  );
};

// --- HEATMAP GRID ---
export const HeatmapGrid = () => {
  const data = [
    [0.2, 0.5, 0.8, 0.3, 0.9, 0.4, 0.7],
    [0.6, 0.3, 0.7, 0.9, 0.4, 0.8, 0.2],
    [0.4, 0.8, 0.2, 0.6, 0.5, 0.3, 0.9],
    [0.9, 0.4, 0.6, 0.2, 0.8, 0.7, 0.5],
  ];

  const getColor = (val: number) => {
    const intensity = Math.round(val * 255);
    return `rgb(59, 130, ${intensity})`;
  };

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#0f1419' }}>
      <div className="p-4 rounded-lg" style={{ background: '#1a2332', border: '1px solid #2d3748' }}>
        <div className="text-xs text-gray-400 mb-3">Activity Heatmap</div>
        <div className="grid gap-1">
          {data.map((row, i) => (
            <div key={i} className="flex gap-1">
              {row.map((val, j) => (
                <div
                  key={j}
                  className="w-5 h-5 rounded-sm transition-colors duration-200"
                  style={{ background: getColor(val) }}
                  title={`${Math.round(val * 100)}%`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- PERCENTAGE BAR ---
export const PercentageBar = () => {
  const segments = [
    { percent: 45, color: '#3b82f6', label: 'Success' },
    { percent: 35, color: '#8b5cf6', label: 'Pending' },
    { percent: 20, color: '#6366f1', label: 'Failed' },
  ];

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#0f1419' }}>
      <div className="w-56 p-4 rounded-lg" style={{ background: '#1a2332', border: '1px solid #2d3748' }}>
        <div className="text-xs text-gray-400 mb-3">Request Status</div>
        <div className="flex h-2 rounded-full overflow-hidden mb-3">
          {segments.map((seg, i) => (
            <div
              key={i}
              style={{ width: `${seg.percent}%`, background: seg.color }}
            />
          ))}
        </div>
        <div className="flex justify-between text-xs">
          {segments.map((seg, i) => (
            <div key={i} className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full" style={{ background: seg.color }} />
              <span className="text-gray-400">{seg.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- METRIC COUNTER ---
export const MetricCounter = () => {
  const [count, setCount] = useState(8472);

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#0f1419' }}>
      <div className="text-center">
        <div className="text-4xl font-bold font-mono text-white mb-2">
          {count.toLocaleString()}
        </div>
        <div className="text-xs text-gray-400 mb-3">Active Connections</div>
        <button
          className="px-3 py-1 text-xs rounded text-blue-400 transition-colors"
          style={{ background: '#3b82f620' }}
          onClick={() => setCount(c => c + Math.floor(Math.random() * 100))}
        >
          + Simulate Event
        </button>
      </div>
    </div>
  );
};

// --- ALERT BANNER ---
export const AlertBanner = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return (
      <div className="h-full flex items-center justify-center p-6" style={{ background: '#0f1419' }}>
        <button
          className="px-4 py-2 text-sm text-white rounded-lg"
          style={{ background: '#1a2332', border: '1px solid #2d3748' }}
          onClick={() => setVisible(true)}
        >
          Show Alert
        </button>
      </div>
    );
  }

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#0f1419' }}>
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-lg"
        style={{ background: '#451a03', border: '1px solid #92400e' }}
      >
        <AlertTriangle size={16} className="text-yellow-500 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm text-yellow-200 font-medium">High CPU Usage</p>
          <p className="text-xs text-yellow-300/60">Server load at 92%</p>
        </div>
        <button
          className="p-1 hover:bg-yellow-900/30 rounded"
          onClick={() => setVisible(false)}
        >
          <span className="text-yellow-500 text-lg leading-none">&times;</span>
        </button>
      </div>
    </div>
  );
};

// --- TIME SERIES LINE ---
export const TimeSeriesLine = () => {
  const data = [30, 45, 35, 50, 40, 55, 45, 60, 50, 65, 55, 70];

  const points = data.map((val, i) => {
    const x = 20 + (i / (data.length - 1)) * 160;
    const y = 60 - ((val - 30) / 40) * 40;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="h-full flex items-center justify-center p-6" style={{ background: '#0f1419' }}>
      <div className="p-4 rounded-lg" style={{ background: '#1a2332', border: '1px solid #2d3748' }}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-gray-400">Response Time</span>
          <span className="text-xs text-white font-medium">Avg: 45ms</span>
        </div>
        <svg width="200" height="80" className="overflow-visible">
          {/* Grid lines */}
          {[0, 1, 2, 3].map((i) => (
            <line key={i} x1="20" y1={20 + i * 15} x2="180" y2={20 + i * 15} stroke="#2d3748" strokeWidth="1" />
          ))}
          {/* Y axis labels */}
          <text x="10" y="25" fill="#6b7280" fontSize="8">70</text>
          <text x="10" y="55" fill="#6b7280" fontSize="8">50</text>
          {/* Line */}
          <polyline
            points={points}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Dots */}
          {data.map((val, i) => {
            const x = 20 + (i / (data.length - 1)) * 160;
            const y = 60 - ((val - 30) / 40) * 40;
            return <circle key={i} cx={x} cy={y} r="3" fill="#3b82f6" />;
          })}
        </svg>
      </div>
    </div>
  );
};

// --- DASHBOARD HEADER ---
export const DashboardHeader = () => {
  const [timeRange, setTimeRange] = useState('7d');

  return (
    <div className="h-full flex items-start p-6" style={{ background: '#0f1419' }}>
      <div className="w-full p-4 rounded-lg" style={{ background: '#1a2332', border: '1px solid #2d3748' }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-white">Analytics</h1>
            <p className="text-xs text-gray-400 mt-0.5">Last updated: 2 min ago</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-1 p-1 rounded-lg" style={{ background: '#0f1419' }}>
              {['24h', '7d', '30d'].map((range) => (
                <button
                  key={range}
                  className="px-3 py-1 text-xs rounded transition-colors"
                  style={{
                    background: timeRange === range ? '#3b82f6' : 'transparent',
                    color: timeRange === range ? 'white' : '#9ca3af',
                  }}
                  onClick={() => setTimeRange(range)}
                >
                  {range}
                </button>
              ))}
            </div>
            <button
              className="flex items-center gap-1 px-3 py-1.5 text-xs text-gray-300 rounded-lg"
              style={{ background: '#0f1419', border: '1px solid #2d3748' }}
            >
              Export
              <ChevronDown size={12} />
            </button>
            <div className="flex items-center gap-1">
              <Check size={14} className="text-green-400" />
              <span className="text-xs text-gray-400">All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export all components
export const dataDashboardComponents = {
  'data-metric-card': MetricCard,
  'data-sparkline-chart': SparklineChart,
  'data-donut-gauge': DonutGauge,
  'data-kpi-badge': KPIBadge,
  'data-bar-chart-mini': BarChartMini,
  'data-table': DataTable,
  'data-status-dot': StatusDot,
  'data-live-pulse': LivePulse,
  'data-trend-arrow': TrendArrow,
  'data-progress-ring': ProgressRing,
  'data-card': DataCard,
  'data-heatmap-grid': HeatmapGrid,
  'data-percentage-bar': PercentageBar,
  'data-metric-counter': MetricCounter,
  'data-alert-banner': AlertBanner,
  'data-time-series-line': TimeSeriesLine,
  'data-dashboard-header': DashboardHeader,
};
