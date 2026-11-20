import { createContext, useContext, type ReactNode } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import type { CartContextValue, CartItem, Product } from '../types'

const CartContext = createContext<CartContextValue | null>(null)

type CartAction =
  | { type: 'ADD'; product: Product }
  | { type: 'REMOVE' | 'INCREASE' | 'DECREASE'; productId: string }
  | { type: 'CLEAR' }

// The reducer applies each action to the current items and keeps quantities at one or higher.
function cartReducer(items: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case 'ADD':
      if (items.some(({ product }) => product.id === action.product.id)) {
        return cartReducer(items, { type: 'INCREASE', productId: action.product.id })
      }
      return [...items, { product: action.product, quantity: 1 }]
    case 'REMOVE':
      return items.filter(({ product }) => product.id !== action.productId)
    case 'INCREASE':
    case 'DECREASE':
      return items.map((item) => {
        if (item.product.id !== action.productId) return item
        const change = action.type === 'INCREASE' ? 1 : -1
        return { ...item, quantity: Math.max(1, item.quantity + change) }
      })
    case 'CLEAR':
      return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useLocalStorage<CartItem[]>('darliving-cart', [])

  function dispatch(action: CartAction) {
    setItems((currentItems) => cartReducer(currentItems, action))
  }

  const value: CartContextValue = {
    items,
    cartCount: items.reduce((count, item) => count + item.quantity, 0),
    subtotal: items.reduce((total, { product, quantity }) => total + product.price * quantity, 0),
    addToCart: (product) => dispatch({ type: 'ADD', product }),
    removeFromCart: (productId) => dispatch({ type: 'REMOVE', productId }),
    increaseQuantity: (productId) => dispatch({ type: 'INCREASE', productId }),
    decreaseQuantity: (productId) => dispatch({ type: 'DECREASE', productId }),
    clearCart: () => dispatch({ type: 'CLEAR' }),
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart(): CartContextValue {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside <CartProvider>')
  return context
}
