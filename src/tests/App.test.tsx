import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from '../App'
import { renderWithProviders } from './test-utils'

// Smoke test: proves the test setup works. The 3 required tests go next to this file:
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
})
