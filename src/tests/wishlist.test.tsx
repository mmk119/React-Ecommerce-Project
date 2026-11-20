import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import ProductCard from '../components/product/ProductCard'
import { products } from '../data/products'
import CartPage from '../pages/CartPage'
import WishlistPage from '../pages/WishlistPage'
import { renderWithProviders } from './test-utils'

const product = products[0]

function renderWishlist() {
  return renderWithProviders(
    <><ProductCard product={product} /><WishlistPage /><CartPage /></>,
    '/wishlist',
  )
}

describe('Wishlist', () => {
  // Clear persisted state so each test starts with an empty store.
  beforeEach(() => localStorage.clear())

  it('toggles one saved copy and removes it on the second toggle', async () => {
    const user = userEvent.setup()
    renderWishlist()
    await user.click(screen.getByRole('button', { name: `Add ${product.name} to wishlist` }))
    expect(screen.getAllByRole('button', { name: 'Move to Cart' })).toHaveLength(1)

    await user.click(screen.getByRole('button', { name: `Remove ${product.name} from wishlist`, pressed: true }))
    expect(screen.getByRole('heading', { name: 'Your wishlist is empty' })).toBeInTheDocument()
  })

  it('restores saved products and moves them into the cart', async () => {
    const user = userEvent.setup()
    const { unmount } = renderWishlist()
    await user.click(screen.getByRole('button', { name: `Add ${product.name} to wishlist` }))
    // Remounting the providers simulates restoring state after a refresh.
    unmount()

    renderWishlist()
    await user.click(screen.getByRole('button', { name: 'Move to Cart' }))
    expect(screen.getByRole('heading', { name: 'Your wishlist is empty' })).toBeInTheDocument()
    expect(screen.getByLabelText(`Quantity of ${product.name}`)).toHaveTextContent('1')
  })
})
