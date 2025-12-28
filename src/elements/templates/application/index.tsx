/**
 * Application Templates
 * Full page layouts for web apps: dashboards, settings, profiles
 */

import React, { useState } from 'react';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface TemplateEntry {
  id: string;
  name: string;
  layer: 'template';
  category: 'marketing' | 'application' | 'content' | 'auth';
  description: string;
  sections: string[];
  composedOf: string[];
  themeAgnostic: boolean;
  sourceComponents: string[];
  extractedFrom: string;
  previewType: 'fullwidth';
  hasInteraction: boolean;
  implementation: 'component';
  component: React.FC<any>;
  codeSnippet: string;
  tags: string[];
}

type TemplateVariant = 'default' | 'dark' | 'brutal' | 'neon' | 'glass';

// ============================================================================
// SHARED STYLES
// ============================================================================

const appStyles = {
  default: 'min-h-screen bg-gray-100 text-gray-900',
  dark: 'min-h-screen bg-gray-950 text-white',
  brutal: 'min-h-screen bg-yellow-100 text-black',
  neon: 'min-h-screen bg-gray-950 text-cyan-400',
  glass: 'min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white',
};

// ============================================================================
// DASHBOARD TEMPLATE
// ============================================================================

interface DashboardProps {
  variant?: TemplateVariant;
}

export const DashboardTemplate: React.FC<DashboardProps> = ({ variant = 'default' }) => {
  const [sidebarOpen] = useState(true);

  const sidebarStyles = {
    default: 'bg-white border-r border-gray-200',
    dark: 'bg-gray-900 border-r border-gray-800',
    brutal: 'bg-yellow-400 border-r-4 border-black',
    neon: 'bg-gray-900 border-r border-cyan-500/30',
    glass: 'bg-white/5 backdrop-blur-xl border-r border-white/10',
  };

  const cardStyles = {
    default: 'bg-white rounded-xl shadow-sm border border-gray-200',
    dark: 'bg-gray-800 rounded-xl border border-gray-700',
    brutal: 'bg-white border-4 border-black shadow-[4px_4px_0_0_#000]',
    neon: 'bg-gray-900/80 rounded-lg border border-cyan-500/30',
    glass: 'bg-white/10 backdrop-blur rounded-xl border border-white/10',
  };

  const statStyles = {
    default: 'text-blue-600',
    dark: 'text-blue-400',
    brutal: 'text-black',
    neon: 'text-cyan-400',
    glass: 'text-purple-300',
  };

  const stats = [
    { label: 'Total Users', value: '12,345', change: '+12%' },
    { label: 'Revenue', value: '$45,678', change: '+8%' },
    { label: 'Active Now', value: '892', change: '+23%' },
    { label: 'Conversion', value: '3.2%', change: '+2%' },
  ];

  const menuItems = ['Dashboard', 'Analytics', 'Projects', 'Team', 'Settings'];

  return (
    <div className={`${appStyles[variant]} flex`}>
      {/* Sidebar */}
      {sidebarOpen && (
        <aside className={`w-64 ${sidebarStyles[variant]} p-4 flex flex-col`}>
          <div className={`text-xl font-bold mb-8 p-2 ${variant === 'brutal' ? 'text-black' : ''}`}>
            Dashboard
          </div>
          <nav className="flex-1 space-y-1">
            {menuItems.map((item, i) => (
              <a
                key={item}
                href="#"
                className={`block px-4 py-2 rounded-lg transition-colors ${
                  i === 0
                    ? variant === 'neon' ? 'bg-cyan-500/20 text-cyan-400' :
                      variant === 'brutal' ? 'bg-black text-white' :
                      variant === 'glass' ? 'bg-white/20' :
                      'bg-blue-50 text-blue-600'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {item}
              </a>
            ))}
          </nav>
          <div className={`p-4 rounded-lg ${cardStyles[variant]}`}>
            <p className="text-sm opacity-70">Storage Used</p>
            <div className={`h-2 rounded-full mt-2 ${variant === 'dark' || variant === 'neon' ? 'bg-gray-700' : 'bg-gray-200'}`}>
              <div className={`h-full w-3/4 rounded-full ${
                variant === 'neon' ? 'bg-cyan-400' : variant === 'brutal' ? 'bg-black' : 'bg-blue-500'
              }`} />
            </div>
            <p className="text-sm mt-2">75% of 100GB</p>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className={`text-2xl font-bold ${variant === 'brutal' ? 'uppercase' : ''}`}>
              Welcome back, User
            </h1>
            <p className="opacity-70">Here's what's happening today</p>
          </div>
          <button className={`px-4 py-2 rounded-lg ${
            variant === 'neon' ? 'border border-cyan-400 text-cyan-400' :
            variant === 'brutal' ? 'bg-black text-white border-4 border-black' :
            variant === 'glass' ? 'bg-white/20 border border-white/20' :
            'bg-blue-600 text-white'
          }`}>
            + New Project
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className={`${cardStyles[variant]} p-6`}>
              <p className="text-sm opacity-70">{stat.label}</p>
              <p className={`text-3xl font-bold ${statStyles[variant]}`}>{stat.value}</p>
              <p className="text-sm text-green-500">{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className={`${cardStyles[variant]} p-6`}>
            <h3 className="font-semibold mb-4">Revenue Overview</h3>
            <div className="h-48 flex items-end justify-around gap-2">
              {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                <div
                  key={i}
                  className={`w-8 rounded-t ${
                    variant === 'neon' ? 'bg-cyan-400' : variant === 'brutal' ? 'bg-black' : 'bg-blue-500'
                  }`}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
          <div className={`${cardStyles[variant]} p-6`}>
            <h3 className="font-semibold mb-4">Traffic Sources</h3>
            <div className="space-y-4">
              {[
                { label: 'Direct', value: 45, color: 'blue' },
                { label: 'Search', value: 30, color: 'green' },
                { label: 'Social', value: 15, color: 'purple' },
                { label: 'Referral', value: 10, color: 'orange' },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{item.label}</span>
                    <span>{item.value}%</span>
                  </div>
                  <div className={`h-2 rounded-full ${variant === 'dark' || variant === 'neon' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div
                      className={`h-full rounded-full bg-${item.color}-500`}
                      style={{ width: `${item.value}%`, backgroundColor: item.color === 'blue' ? '#3b82f6' : item.color === 'green' ? '#22c55e' : item.color === 'purple' ? '#a855f7' : '#f97316' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className={`${cardStyles[variant]} p-6`}>
          <h3 className="font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { action: 'New user registered', time: '2 min ago' },
              { action: 'Payment received', time: '15 min ago' },
              { action: 'Project deployed', time: '1 hour ago' },
              { action: 'Comment added', time: '2 hours ago' },
            ].map((activity, i) => (
              <div key={i} className={`flex justify-between py-2 ${i !== 3 ? 'border-b' : ''} ${
                variant === 'dark' || variant === 'neon' ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <span>{activity.action}</span>
                <span className="opacity-50">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

// ============================================================================
// SETTINGS TEMPLATE
// ============================================================================

interface SettingsProps {
  variant?: TemplateVariant;
}

export const SettingsTemplate: React.FC<SettingsProps> = ({ variant = 'default' }) => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = ['Profile', 'Account', 'Notifications', 'Security', 'Billing'];

  const cardStyles = {
    default: 'bg-white rounded-xl shadow-sm border border-gray-200',
    dark: 'bg-gray-800 rounded-xl border border-gray-700',
    brutal: 'bg-white border-4 border-black shadow-[4px_4px_0_0_#000]',
    neon: 'bg-gray-900/80 rounded-lg border border-cyan-500/30',
    glass: 'bg-white/10 backdrop-blur rounded-xl border border-white/10',
  };

  const inputStyles = {
    default: 'w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none',
    dark: 'w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-400 focus:outline-none text-white',
    brutal: 'w-full px-4 py-2 border-4 border-black focus:outline-none',
    neon: 'w-full px-4 py-2 rounded-lg bg-gray-800 border border-cyan-500/50 focus:border-cyan-400 focus:outline-none text-cyan-400',
    glass: 'w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:border-white/40 focus:outline-none text-white',
  };

  const buttonStyles = {
    default: 'px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700',
    dark: 'px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400',
    brutal: 'px-6 py-2 bg-black text-white border-4 border-black hover:bg-yellow-400 hover:text-black',
    neon: 'px-6 py-2 border border-cyan-400 text-cyan-400 rounded hover:bg-cyan-400/20',
    glass: 'px-6 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 border border-white/20',
  };

  return (
    <div className={appStyles[variant]}>
      {/* Header */}
      <header className={`${
        variant === 'default' ? 'bg-white border-b border-gray-200' :
        variant === 'dark' ? 'bg-gray-900 border-b border-gray-800' :
        variant === 'brutal' ? 'bg-yellow-400 border-b-4 border-black' :
        variant === 'neon' ? 'bg-gray-900 border-b border-cyan-500/30' :
        'bg-white/5 border-b border-white/10'
      } px-6 py-4`}>
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h1 className={`text-xl font-bold ${variant === 'brutal' ? 'uppercase' : ''}`}>Settings</h1>
          <button className={buttonStyles[variant]}>Save Changes</button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto py-8 px-6">
        <div className="flex gap-8">
          {/* Sidebar Tabs */}
          <nav className="w-48 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab.toLowerCase()
                    ? variant === 'neon' ? 'bg-cyan-500/20 text-cyan-400' :
                      variant === 'brutal' ? 'bg-black text-white' :
                      variant === 'glass' ? 'bg-white/20' :
                      'bg-blue-50 text-blue-600'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>

          {/* Content */}
          <div className="flex-1">
            <div className={`${cardStyles[variant]} p-8`}>
              <h2 className={`text-xl font-bold mb-6 ${variant === 'brutal' ? 'uppercase' : ''}`}>
                Profile Settings
              </h2>

              {/* Avatar */}
              <div className="flex items-center gap-6 mb-8">
                <div className={`w-20 h-20 rounded-full ${
                  variant === 'neon' ? 'bg-cyan-900 border border-cyan-400' :
                  variant === 'brutal' ? 'bg-black' :
                  variant === 'glass' ? 'bg-white/20' :
                  'bg-gray-200'
                } flex items-center justify-center text-2xl font-bold`}>
                  U
                </div>
                <div>
                  <button className={buttonStyles[variant]}>Upload Photo</button>
                  <p className="text-sm opacity-50 mt-2">JPG, PNG or GIF. Max 2MB.</p>
                </div>
              </div>

              {/* Form */}
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name</label>
                    <input type="text" defaultValue="John" className={inputStyles[variant]} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name</label>
                    <input type="text" defaultValue="Doe" className={inputStyles[variant]} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input type="email" defaultValue="john@example.com" className={inputStyles[variant]} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Bio</label>
                  <textarea rows={4} className={inputStyles[variant]} placeholder="Tell us about yourself..." />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// PROFILE TEMPLATE
// ============================================================================

interface ProfileProps {
  variant?: TemplateVariant;
}

export const ProfileTemplate: React.FC<ProfileProps> = ({ variant = 'default' }) => {
  const cardStyles = {
    default: 'bg-white rounded-xl shadow-sm border border-gray-200',
    dark: 'bg-gray-800 rounded-xl border border-gray-700',
    brutal: 'bg-white border-4 border-black shadow-[4px_4px_0_0_#000]',
    neon: 'bg-gray-900/80 rounded-lg border border-cyan-500/30',
    glass: 'bg-white/10 backdrop-blur rounded-xl border border-white/10',
  };

  const projects = [
    { name: 'Project Alpha', status: 'Active', progress: 75 },
    { name: 'Project Beta', status: 'Completed', progress: 100 },
    { name: 'Project Gamma', status: 'In Progress', progress: 45 },
  ];

  return (
    <div className={appStyles[variant]}>
      {/* Cover & Avatar */}
      <div className={`h-48 ${
        variant === 'neon' ? 'bg-gradient-to-r from-cyan-900 to-purple-900' :
        variant === 'brutal' ? 'bg-black' :
        variant === 'glass' ? 'bg-gradient-to-r from-purple-600/50 to-pink-600/50' :
        'bg-gradient-to-r from-blue-500 to-purple-600'
      }`} />

      <div className="max-w-4xl mx-auto px-6 -mt-16">
        {/* Profile Header */}
        <div className={`${cardStyles[variant]} p-6 mb-6`}>
          <div className="flex items-end gap-6">
            <div className={`w-32 h-32 rounded-full border-4 ${
              variant === 'dark' || variant === 'neon' ? 'border-gray-800 bg-gray-700' :
              variant === 'brutal' ? 'border-black bg-yellow-400' :
              variant === 'glass' ? 'border-white/20 bg-white/20' :
              'border-white bg-gray-200'
            } flex items-center justify-center text-4xl font-bold -mt-16`}>
              JD
            </div>
            <div className="flex-1 pb-2">
              <h1 className={`text-2xl font-bold ${variant === 'brutal' ? 'uppercase' : ''}`}>John Doe</h1>
              <p className="opacity-70">Senior Developer at TechCorp</p>
            </div>
            <button className={`px-6 py-2 rounded-lg ${
              variant === 'neon' ? 'border border-cyan-400 text-cyan-400' :
              variant === 'brutal' ? 'bg-black text-white border-4 border-black' :
              variant === 'glass' ? 'bg-white/20 border border-white/20' :
              'bg-blue-600 text-white'
            }`}>
              Edit Profile
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            {[
              { label: 'Projects', value: '24' },
              { label: 'Followers', value: '1.2K' },
              { label: 'Following', value: '348' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className={`text-2xl font-bold ${variant === 'neon' ? 'text-cyan-400' : ''}`}>{stat.value}</p>
                <p className="opacity-70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* About */}
          <div className={`${cardStyles[variant]} p-6 col-span-1`}>
            <h3 className="font-bold mb-4">About</h3>
            <p className="opacity-70 mb-4">
              Passionate developer with 10+ years of experience building web applications.
            </p>
            <div className="space-y-2 text-sm">
              <p><span className="opacity-50">Location:</span> San Francisco, CA</p>
              <p><span className="opacity-50">Joined:</span> March 2020</p>
              <p><span className="opacity-50">Website:</span> johndoe.dev</p>
            </div>
          </div>

          {/* Projects */}
          <div className={`${cardStyles[variant]} p-6 col-span-2`}>
            <h3 className="font-bold mb-4">Recent Projects</h3>
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.name} className={`p-4 rounded-lg ${
                  variant === 'dark' || variant === 'neon' ? 'bg-gray-700/50' :
                  variant === 'brutal' ? 'border-2 border-black' :
                  variant === 'glass' ? 'bg-white/5' :
                  'bg-gray-50'
                }`}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{project.name}</span>
                    <span className={`text-sm px-2 py-1 rounded ${
                      project.status === 'Completed' ? 'bg-green-100 text-green-700' :
                      project.status === 'Active' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <div className={`h-2 rounded-full ${variant === 'dark' || variant === 'neon' ? 'bg-gray-600' : 'bg-gray-200'}`}>
                    <div
                      className={`h-full rounded-full ${
                        variant === 'neon' ? 'bg-cyan-400' : variant === 'brutal' ? 'bg-black' : 'bg-blue-500'
                      }`}
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// ANALYTICS TEMPLATE
// ============================================================================

interface AnalyticsProps {
  variant?: TemplateVariant;
}

export const AnalyticsTemplate: React.FC<AnalyticsProps> = ({ variant = 'default' }) => {
  const cardStyles = {
    default: 'bg-white rounded-xl shadow-sm border border-gray-200',
    dark: 'bg-gray-800 rounded-xl border border-gray-700',
    brutal: 'bg-white border-4 border-black shadow-[4px_4px_0_0_#000]',
    neon: 'bg-gray-900/80 rounded-lg border border-cyan-500/30',
    glass: 'bg-white/10 backdrop-blur rounded-xl border border-white/10',
  };

  return (
    <div className={appStyles[variant]}>
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className={`text-2xl font-bold ${variant === 'brutal' ? 'uppercase' : ''}`}>Analytics</h1>
              <p className="opacity-70">Track your performance metrics</p>
            </div>
            <div className="flex gap-2">
              {['7D', '30D', '90D', '1Y'].map((period) => (
                <button
                  key={period}
                  className={`px-4 py-2 rounded-lg ${
                    period === '30D'
                      ? variant === 'neon' ? 'bg-cyan-500/20 text-cyan-400' :
                        variant === 'brutal' ? 'bg-black text-white' :
                        'bg-blue-100 text-blue-600'
                      : variant === 'dark' || variant === 'neon' ? 'bg-gray-800' :
                        variant === 'glass' ? 'bg-white/10' :
                        'bg-gray-100'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          {/* Main Chart */}
          <div className={`${cardStyles[variant]} p-6 mb-6`}>
            <h3 className="font-semibold mb-4">Performance Overview</h3>
            <div className="h-64 flex items-end justify-around gap-1">
              {Array.from({ length: 30 }, (_, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-t ${
                    variant === 'neon' ? 'bg-cyan-400' : variant === 'brutal' ? 'bg-black' : 'bg-blue-500'
                  }`}
                  style={{ height: `${20 + Math.random() * 80}%`, opacity: 0.6 + Math.random() * 0.4 }}
                />
              ))}
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-4 gap-6 mb-6">
            {[
              { label: 'Page Views', value: '245,678', change: '+15%', up: true },
              { label: 'Unique Visitors', value: '45,234', change: '+8%', up: true },
              { label: 'Bounce Rate', value: '32.5%', change: '-3%', up: false },
              { label: 'Avg. Duration', value: '4m 23s', change: '+12%', up: true },
            ].map((metric) => (
              <div key={metric.label} className={`${cardStyles[variant]} p-6`}>
                <p className="text-sm opacity-70">{metric.label}</p>
                <p className={`text-3xl font-bold ${variant === 'neon' ? 'text-cyan-400' : ''}`}>{metric.value}</p>
                <p className={metric.up ? 'text-green-500' : 'text-red-500'}>{metric.change}</p>
              </div>
            ))}
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-2 gap-6">
            <div className={`${cardStyles[variant]} p-6`}>
              <h3 className="font-semibold mb-4">Top Pages</h3>
              <div className="space-y-3">
                {[
                  { page: '/home', views: '45,234' },
                  { page: '/products', views: '23,456' },
                  { page: '/about', views: '12,345' },
                  { page: '/blog', views: '9,876' },
                ].map((item) => (
                  <div key={item.page} className="flex justify-between">
                    <span className="font-mono">{item.page}</span>
                    <span className="opacity-70">{item.views}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={`${cardStyles[variant]} p-6`}>
              <h3 className="font-semibold mb-4">Traffic Sources</h3>
              <div className="space-y-3">
                {[
                  { source: 'Google', pct: 45 },
                  { source: 'Direct', pct: 28 },
                  { source: 'Twitter', pct: 15 },
                  { source: 'Other', pct: 12 },
                ].map((item) => (
                  <div key={item.source}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{item.source}</span>
                      <span>{item.pct}%</span>
                    </div>
                    <div className={`h-2 rounded-full ${variant === 'dark' || variant === 'neon' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <div
                        className={`h-full rounded-full ${variant === 'neon' ? 'bg-cyan-400' : 'bg-blue-500'}`}
                        style={{ width: `${item.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// REGISTRY ENTRIES
// ============================================================================

const createAppEntry = (
  id: string,
  name: string,
  description: string,
  sections: string[],
  tags: string[],
  component: React.FC<any>,
  composedOf: string[] = []
): TemplateEntry => ({
  id: `tpl-app-${id}`,
  name,
  layer: 'template',
  category: 'application',
  description,
  sections,
  composedOf,
  themeAgnostic: false,
  sourceComponents: ['custom'],
  extractedFrom: 'src/elements/templates/application/index.tsx',
  previewType: 'fullwidth',
  hasInteraction: true,
  implementation: 'component',
  component,
  codeSnippet: `<${name.replace(/\s/g, '')} />`,
  tags: ['template', 'application', 'app', ...tags],
});

export const applicationTemplateRegistry: TemplateEntry[] = [
  // Dashboard variants
  createAppEntry('dashboard', 'Dashboard', 'Admin dashboard with sidebar, stats, charts, and activity feed', ['sidebar', 'header', 'stats', 'charts', 'activity'], ['dashboard', 'admin', 'analytics'], DashboardTemplate, ['org-nav-sidebar', 'org-data-stats-dashboard']),
  createAppEntry('dashboard-dark', 'Dashboard Dark', 'Dark theme admin dashboard', ['sidebar', 'header', 'stats', 'charts', 'activity'], ['dashboard', 'dark'], (props) => <DashboardTemplate {...props} variant="dark" />, ['org-nav-sidebar', 'org-data-stats-dashboard']),
  createAppEntry('dashboard-neon', 'Dashboard Neon', 'Neon cyberpunk dashboard', ['sidebar', 'header', 'stats', 'charts', 'activity'], ['dashboard', 'neon', 'cyberpunk'], (props) => <DashboardTemplate {...props} variant="neon" />, ['org-nav-sidebar', 'org-data-stats-dashboard']),
  createAppEntry('dashboard-glass', 'Dashboard Glass', 'Glassmorphism dashboard', ['sidebar', 'header', 'stats', 'charts', 'activity'], ['dashboard', 'glass'], (props) => <DashboardTemplate {...props} variant="glass" />, ['org-nav-sidebar', 'org-data-stats-dashboard']),

  // Settings variants
  createAppEntry('settings', 'Settings Page', 'Application settings with tabbed navigation and form', ['header', 'tabs', 'form'], ['settings', 'preferences', 'account'], SettingsTemplate, ['org-nav-tab-group', 'org-form-settings-panel']),
  createAppEntry('settings-dark', 'Settings Page Dark', 'Dark theme settings page', ['header', 'tabs', 'form'], ['settings', 'dark'], (props) => <SettingsTemplate {...props} variant="dark" />, ['org-nav-tab-group', 'org-form-settings-panel']),
  createAppEntry('settings-neon', 'Settings Page Neon', 'Neon settings page', ['header', 'tabs', 'form'], ['settings', 'neon'], (props) => <SettingsTemplate {...props} variant="neon" />, ['org-nav-tab-group', 'org-form-settings-panel']),

  // Profile variants
  createAppEntry('profile', 'Profile Page', 'User profile with cover, avatar, stats, and projects', ['cover', 'avatar', 'stats', 'projects'], ['profile', 'user', 'account'], ProfileTemplate, ['mol-avatar', 'org-data-stats-dashboard']),
  createAppEntry('profile-dark', 'Profile Page Dark', 'Dark theme profile page', ['cover', 'avatar', 'stats', 'projects'], ['profile', 'dark'], (props) => <ProfileTemplate {...props} variant="dark" />, ['mol-avatar', 'org-data-stats-dashboard']),
  createAppEntry('profile-glass', 'Profile Page Glass', 'Glassmorphism profile page', ['cover', 'avatar', 'stats', 'projects'], ['profile', 'glass'], (props) => <ProfileTemplate {...props} variant="glass" />, ['mol-avatar', 'org-data-stats-dashboard']),

  // Analytics variants
  createAppEntry('analytics', 'Analytics Page', 'Analytics dashboard with charts and metrics', ['header', 'chart', 'metrics', 'tables'], ['analytics', 'metrics', 'data'], AnalyticsTemplate, ['org-data-stats-dashboard']),
  createAppEntry('analytics-dark', 'Analytics Page Dark', 'Dark theme analytics', ['header', 'chart', 'metrics', 'tables'], ['analytics', 'dark'], (props) => <AnalyticsTemplate {...props} variant="dark" />, ['org-data-stats-dashboard']),
  createAppEntry('analytics-neon', 'Analytics Page Neon', 'Neon analytics dashboard', ['header', 'chart', 'metrics', 'tables'], ['analytics', 'neon'], (props) => <AnalyticsTemplate {...props} variant="neon" />, ['org-data-stats-dashboard']),
];

export default applicationTemplateRegistry;
