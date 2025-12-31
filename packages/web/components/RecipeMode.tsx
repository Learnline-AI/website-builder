import React, { useState } from 'react'
import { exampleRecipes, getRecipesByCategory } from '../recipes'
import { RecipeRenderer } from '../recipes/RecipeRenderer'
import type { PageRecipe, RecipeCategory } from '../recipes/types'

// Category configuration
const recipeCategories: Array<{
  id: RecipeCategory
  name: string
  description: string
  icon: React.ReactNode
}> = [
  {
    id: 'landing',
    name: 'Landing Pages',
    description: 'SaaS, product, and marketing pages',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    ),
  },
  {
    id: 'portfolio',
    name: 'Portfolio',
    description: 'Showcase and personal sites',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 3H8a2 2 0 00-2 2v2h12V5a2 2 0 00-2-2z" />
      </svg>
    ),
  },
  {
    id: 'pricing',
    name: 'Pricing',
    description: 'Pricing tables and comparison pages',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
  },
  {
    id: 'blog',
    name: 'Blog',
    description: 'Articles and content pages',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
      </svg>
    ),
  },
  {
    id: 'dashboard',
    name: 'Dashboard',
    description: 'Application dashboards and admin panels',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="9" rx="1" />
        <rect x="14" y="3" width="7" height="5" rx="1" />
        <rect x="14" y="12" width="7" height="9" rx="1" />
        <rect x="3" y="16" width="7" height="5" rx="1" />
      </svg>
    ),
  },
  {
    id: 'auth',
    name: 'Authentication',
    description: 'Login, signup, and auth flows',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    ),
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    description: 'Product and shopping pages',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
      </svg>
    ),
  },
]

export function RecipeMode() {
  const [activeCategory, setActiveCategory] = useState<RecipeCategory | 'all'>('all')
  const [selectedRecipe, setSelectedRecipe] = useState<PageRecipe | null>(null)
  const [previewTheme, setPreviewTheme] = useState<string | undefined>(undefined)

  // Filter recipes by category
  const filteredRecipes = activeCategory === 'all'
    ? exampleRecipes
    : getRecipesByCategory(activeCategory)

  return (
    <div className="min-h-screen pt-24 flex">
      {/* Sidebar */}
      <aside className="fixed left-0 top-24 bottom-0 w-72 bg-neutral-900/50 backdrop-blur-xl border-r border-white/10 overflow-y-auto">
        <div className="p-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-4 px-3">
            Recipe Categories
          </h2>
          <nav className="space-y-1">
            {/* All recipes */}
            <button
              onClick={() => {
                setActiveCategory('all')
                setSelectedRecipe(null)
              }}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                transition-all duration-200 text-left group
                ${activeCategory === 'all'
                  ? 'bg-white/10 text-white'
                  : 'text-white/60 hover:bg-white/5 hover:text-white'
                }
              `}
            >
              <div
                className={`
                  w-9 h-9 rounded-lg flex items-center justify-center
                  transition-colors duration-200
                  ${activeCategory === 'all'
                    ? 'bg-indigo-500 text-white'
                    : 'bg-white/5 text-white/60 group-hover:bg-white/10 group-hover:text-white'
                  }
                `}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-sm font-medium truncate block">All Recipes</span>
                <span className="text-xs text-white/40">{exampleRecipes.length} recipes</span>
              </div>
              {activeCategory === 'all' && (
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              )}
            </button>

            {/* Categories */}
            {recipeCategories.map(category => {
              const count = getRecipesByCategory(category.id).length
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveCategory(category.id)
                    setSelectedRecipe(null)
                  }}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                    transition-all duration-200 text-left group
                    ${activeCategory === category.id
                      ? 'bg-white/10 text-white'
                      : 'text-white/60 hover:bg-white/5 hover:text-white'
                    }
                  `}
                >
                  <div
                    className={`
                      w-9 h-9 rounded-lg flex items-center justify-center
                      transition-colors duration-200
                      ${activeCategory === category.id
                        ? 'bg-indigo-500 text-white'
                        : 'bg-white/5 text-white/60 group-hover:bg-white/10 group-hover:text-white'
                      }
                    `}
                  >
                    {category.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium truncate block">{category.name}</span>
                    <span className="text-xs text-white/40">{count} recipes</span>
                  </div>
                  {activeCategory === category.id && (
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  )}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Theme switcher for preview */}
        {selectedRecipe && (
          <div className="p-4 border-t border-white/10">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-3 px-3">
              Preview Theme
            </h3>
            <div className="flex flex-wrap gap-1.5 px-2">
              {['default', 'dark', 'brutal', 'neon', 'cosmic', 'glass'].map(theme => (
                <button
                  key={theme}
                  onClick={() => setPreviewTheme(theme === previewTheme ? undefined : theme)}
                  className={`
                    px-2 py-1 rounded-full text-[10px] font-medium transition-all
                    ${previewTheme === theme
                      ? 'bg-indigo-500 text-white'
                      : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white'
                    }
                  `}
                >
                  {theme}
                </button>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-72">
        {selectedRecipe ? (
          // Recipe preview
          <div className="relative">
            {/* Preview header */}
            <div className="sticky top-24 z-20 bg-neutral-900/90 backdrop-blur-xl border-b border-white/10 px-6 py-4">
              <div className="flex items-center justify-between max-w-[1400px] mx-auto">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setSelectedRecipe(null)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Back
                  </button>
                  <div>
                    <h2 className="text-lg font-semibold text-white">
                      {selectedRecipe._uiMuseum.name}
                    </h2>
                    <p className="text-sm text-white/50">
                      {selectedRecipe._uiMuseum.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-2 py-1 rounded-full text-xs bg-white/10 text-white/60">
                    {selectedRecipe.content.length} blocks
                  </span>
                  <span className="px-2 py-1 rounded-full text-xs bg-indigo-500/20 text-indigo-300">
                    {selectedRecipe._uiMuseum.category}
                  </span>
                </div>
              </div>
            </div>

            {/* Recipe render */}
            <div className="p-8">
              <div className="max-w-[1200px] mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
                <RecipeRenderer
                  recipe={selectedRecipe}
                  theme={previewTheme}
                />
              </div>
            </div>
          </div>
        ) : (
          // Recipe grid
          <div className="p-8">
            {/* Header */}
            <div className="max-w-[1400px] mx-auto mb-8">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                  <svg className="w-7 h-7 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                    <path d="M8 7h8M8 11h8M8 15h4" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white mb-1">
                    {activeCategory === 'all' ? 'All Recipes' : recipeCategories.find(c => c.id === activeCategory)?.name}
                  </h1>
                  <p className="text-white/60 max-w-xl">
                    {activeCategory === 'all'
                      ? 'Pre-built page compositions using UI Museum components'
                      : recipeCategories.find(c => c.id === activeCategory)?.description
                    }
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-6 flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-mono font-bold text-indigo-400">
                    {filteredRecipes.length}
                  </span>
                  <span className="text-white/50 text-sm">recipes</span>
                </div>
                <div className="h-6 w-px bg-white/10" />
                <div className="flex items-center gap-2">
                  <span className="text-sm text-white/50">using</span>
                  <span className="text-sm font-medium text-white">
                    {filteredRecipes.reduce((acc, r) => acc + r.content.length, 0)} blocks
                  </span>
                </div>
              </div>
            </div>

            {/* Recipe grid */}
            <div className="max-w-[1400px] mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRecipes.map((recipe, i) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    index={i}
                    onClick={() => setSelectedRecipe(recipe)}
                  />
                ))}
              </div>

              {/* Empty state */}
              {filteredRecipes.length === 0 && (
                <div className="text-center py-20">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                    </svg>
                  </div>
                  <h3 className="text-white/70 font-medium mb-2">No recipes found</h3>
                  <p className="text-white/40 text-sm">Try selecting a different category</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

interface RecipeCardProps {
  recipe: PageRecipe
  index: number
  onClick: () => void
}

function RecipeCard({ recipe, index, onClick }: RecipeCardProps) {
  const categoryColors: Record<RecipeCategory, string> = {
    landing: '#6366f1',
    portfolio: '#8b5cf6',
    pricing: '#10b981',
    blog: '#f59e0b',
    dashboard: '#3b82f6',
    auth: '#ec4899',
    ecommerce: '#14b8a6',
    custom: '#6b7280',
  }

  const color = categoryColors[recipe._uiMuseum.category]

  return (
    <button
      onClick={onClick}
      className="group relative bg-neutral-900/50 rounded-2xl border border-white/10 overflow-hidden text-left transition-all duration-300 hover:border-white/20 hover:bg-neutral-800/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
      style={{ animationDelay: `${index * 30}ms` }}
    >
      {/* Preview area */}
      <div className="aspect-[16/10] relative flex items-center justify-center p-6 bg-gradient-to-br from-neutral-800/50 to-neutral-900/50">
        {/* Category accent glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{
            background: `radial-gradient(circle at center, ${color}15 0%, transparent 70%)`
          }}
        />

        {/* Preview blocks representation */}
        <div className="w-full max-w-[200px] space-y-2">
          {recipe.content.slice(0, 4).map((block, i) => (
            <div
              key={block._uiMuseum?.id || i}
              className="rounded transition-all duration-300"
              style={{
                height: i === 0 ? '40px' : '24px',
                backgroundColor: `${color}${30 - i * 5}`,
                width: i === 0 ? '100%' : `${90 - i * 10}%`,
              }}
            />
          ))}
          {recipe.content.length > 4 && (
            <div className="text-center text-white/30 text-xs">
              +{recipe.content.length - 4} more
            </div>
          )}
        </div>

        {/* Theme badge */}
        {recipe.root.theme && (
          <div
            className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full border"
            style={{
              backgroundColor: `${color}20`,
              borderColor: `${color}30`,
            }}
          >
            <span className="text-[10px] font-medium uppercase tracking-wider" style={{ color }}>
              {recipe.root.theme}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-white text-sm mb-1 group-hover:text-indigo-300 transition-colors">
          {recipe._uiMuseum.name}
        </h3>
        <p className="text-white/50 text-xs line-clamp-2 mb-3">
          {recipe._uiMuseum.description}
        </p>

        <div className="flex items-center justify-between">
          {/* Category badge */}
          <div
            className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-medium"
            style={{
              backgroundColor: `${color}15`,
              color,
            }}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
            {recipe._uiMuseum.category}
          </div>

          {/* Block count */}
          <span className="text-white/40 text-xs">
            {recipe.content.length} blocks
          </span>
        </div>

        {/* Tags */}
        {recipe._uiMuseum.tags && recipe._uiMuseum.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {recipe._uiMuseum.tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="px-1.5 py-0.5 rounded text-[9px] bg-white/5 text-white/40"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Hover border glow */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{
          boxShadow: `inset 0 0 0 1px ${color}50, 0 0 20px ${color}20`
        }}
      />
    </button>
  )
}
