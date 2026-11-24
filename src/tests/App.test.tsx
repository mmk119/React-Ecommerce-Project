import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import App from '../App'
import { renderWithProviders } from './test-utils'

// Routing smoke tests. The 3 required tests are in:
//   productFiltering.test.tsx, cart.test.tsx, checkoutValidation.test.tsx
describe('App routing', () => {
  it('renders the home page', () => {
    renderWithProviders(<App />, '/')
    expect(screen.getByRole('heading', { name: 'Shop by Category' })).toBeInTheDocument()
  })

  it('renders the not-found page for unknown routes', () => {
    renderWithProviders(<App />, '/does-not-exist')
    expect(screen.getByRole('heading', { name: 'Page not found' })).toBeInTheDocument()
  })

  it('footer category links switch category and scroll back to the top', async () => {
    const user = userEvent.setup()
    renderWithProviders(<App />, '/products?category=carpets')
    vi.mocked(window.scrollTo).mockClear()

    const footer = within(screen.getByRole('contentinfo'))
    await user.click(footer.getByRole('link', { name: 'Bedrooms' }))

    expect(screen.getByRole('heading', { level: 1, name: 'Bedrooms' })).toBeInTheDocument()
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0 })
  })
})
