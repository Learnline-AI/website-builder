import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

interface RecentlyViewedContextType {
  recentlyViewed: string[]
  addToHistory: (componentId: string) => void
  clearHistory: () => void
}

const RecentlyViewedContext = createContext<RecentlyViewedContextType | null>(null)

const STORAGE_KEY = 'ui-museum-recently-viewed'
const MAX_ITEMS = 20

export function RecentlyViewedProvider({ children }: { children: React.ReactNode }) {
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recentlyViewed))
    } catch (e) {
      console.warn('Failed to save recently viewed to localStorage:', e)
    }
  }, [recentlyViewed])

  const addToHistory = useCallback((componentId: string) => {
    setRecentlyViewed(prev => {
      // Remove if already exists (to move to front)
      const filtered = prev.filter(id => id !== componentId)
      // Add to front, limit to MAX_ITEMS
      return [componentId, ...filtered].slice(0, MAX_ITEMS)
    })
  }, [])

  const clearHistory = useCallback(() => {
    setRecentlyViewed([])
  }, [])

  return (
    <RecentlyViewedContext.Provider
      value={{
        recentlyViewed,
        addToHistory,
        clearHistory,
      }}
    >
      {children}
    </RecentlyViewedContext.Provider>
  )
}

export function useRecentlyViewed() {
  const context = useContext(RecentlyViewedContext)
  if (!context) {
    throw new Error('useRecentlyViewed must be used within a RecentlyViewedProvider')
  }
  return context
}
