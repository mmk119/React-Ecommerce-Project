import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import ProductCard from '../components/product/ProductCard'
import { products } from '../data/products'
import CartPage from '../pages/CartPage'
import { formatPrice } from '../utils/formatPrice'
import { renderWithProviders } from './test-utils'

const product = products[0]

function renderCart() {
  const view = renderWithProviders(<><ProductCard product={product} /><CartPage /></>, '/cart')
  const user = userEvent.setup()
  const addButton = screen.getByRole('button', { name: 'Add to Cart' })
  return { ...view, user, addButton }
}

function expectQuantity(quantity: number) {
  expect(screen.getByLabelText(`Quantity of ${product.name}`)).toHaveTextContent(String(quantity))
}

function expectSummary(quantity: number) {
  const summary = within(screen.getByRole('complementary', { name: 'Order Summary' }))
  const price = formatPrice(product.price * quantity)
  expect(summary.getByText('Subtotal').nextElementSibling).toHaveTextContent(price)
  expect(summary.getByText('Total').nextElementSibling).toHaveTextContent(price)
}

describe('Shopping cart', () => {
  // Clear persisted state so each test starts with an empty store.
  beforeEach(() => localStorage.clear())

  it('shows an added product with quantity one and its subtotal', async () => {
    const { user, addButton } = renderCart()
    await user.click(addButton)

    const items = within(screen.getByRole('list', { name: 'Cart items' }))
    expect(items.getByRole('heading', { name: product.name })).toBeInTheDocument()
    expectQuantity(1)
    expectSummary(1)
  })

  it('adds the same product twice in one row', async () => {
    const { user, addButton } = renderCart()
    await user.click(addButton)
    await user.click(addButton)

    const items = within(screen.getByRole('list', { name: 'Cart items' }))
    expect(items.getAllByRole('listitem')).toHaveLength(1)
    expectQuantity(2)
    expectSummary(2)
  })

  it('updates totals as quantity changes and stops at one', async () => {
    const { user, addButton } = renderCart()
    await user.click(addButton)
    const increase = screen.getByRole('button', { name: `Increase quantity of ${product.name}` })
    const decrease = screen.getByRole('button', { name: `Decrease quantity of ${product.name}` })

    expect(decrease).toBeDisabled()
    await user.click(increase)
    expectQuantity(2)
    expectSummary(2)
    await user.click(decrease)
    expectQuantity(1)
    expectSummary(1)
    expect(decrease).toBeDisabled()
  })

  it('restores the cart when its providers remount', async () => {
    const { user, addButton, unmount } = renderCart()
    await user.click(addButton)
    await user.click(addButton)
    // Remounting the providers simulates restoring state after a refresh.
    unmount()

    renderCart()
    expectQuantity(2)
    expectSummary(2)
  })
})
