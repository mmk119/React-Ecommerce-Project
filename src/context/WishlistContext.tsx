import { createContext, useContext, type ReactNode } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import type { Product, WishlistContextValue } from '../types'

const WishlistContext = createContext<WishlistContextValue | null>(null)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useLocalStorage<Product[]>('darliving-wishlist', [])

  const value: WishlistContextValue = {
    items,
    wishlistCount: items.length,
    isInWishlist: (productId) => items.some((item) => item.id === productId),
    toggleWishlist: (product) => {
      setItems((currentItems) => {
        if (currentItems.some((item) => item.id === product.id)) {
          return currentItems.filter((item) => item.id !== product.id)
        }
        return [...currentItems, product]
      })
    },
    removeFromWishlist: (productId) => {
      setItems((currentItems) => currentItems.filter((item) => item.id !== productId))
    },
  }

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useWishlist(): WishlistContextValue {
  const context = useContext(WishlistContext)
  if (!context) throw new Error('useWishlist must be used inside <WishlistProvider>')
  return context
}
