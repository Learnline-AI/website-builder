import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

interface FavoritesContextType {
  favorites: Set<string>
  toggleFavorite: (componentId: string) => void
  isFavorite: (componentId: string) => boolean
  favoritesCount: number
}

const FavoritesContext = createContext<FavoritesContextType | null>(null)

const STORAGE_KEY = 'ui-museum-favorites'

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? new Set(JSON.parse(stored)) : new Set()
    } catch {
      return new Set()
    }
  })

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...favorites]))
    } catch (e) {
      console.warn('Failed to save favorites to localStorage:', e)
    }
  }, [favorites])

  const toggleFavorite = useCallback((componentId: string) => {
    setFavorites(prev => {
      const next = new Set(prev)
      if (next.has(componentId)) {
        next.delete(componentId)
      } else {
        next.add(componentId)
      }
      return next
    })
  }, [])

  const isFavorite = useCallback((componentId: string) => {
    return favorites.has(componentId)
  }, [favorites])

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        favoritesCount: favorites.size,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}
