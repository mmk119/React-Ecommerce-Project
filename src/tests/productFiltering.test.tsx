import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import ProductsPage from '../pages/ProductsPage'
import { products } from '../data/products'
import {
  defaultFilters,
  filterProducts,
  type ProductFilters,
} from '../utils/filterProducts'
import { renderWithProviders } from './test-utils'

const withFilters = (overrides: Partial<ProductFilters>): ProductFilters => ({
  ...defaultFilters,
  ...overrides,
})

describe('filterProducts', () => {
  it('searches product names case-insensitively', () => {
    const lowercaseResults = filterProducts(products, withFilters({ search: 'sofa' }))
    const uppercaseResults = filterProducts(products, withFilters({ search: 'SOFA' }))

    expect(lowercaseResults.length).toBeGreaterThan(0)
    expect(lowercaseResults.every((product) => product.name.toLowerCase().includes('sofa'))).toBe(true)
    expect(uppercaseResults.map((product) => product.id)).toEqual(
      lowercaseResults.map((product) => product.id),
    )
  })

  it('returns exactly the five carpet products', () => {
    const results = filterProducts(products, withFilters({ category: 'carpets' }))

    expect(results).toHaveLength(5)
    expect(results.every((product) => product.category === 'carpets')).toBe(true)
  })

  it('keeps products inside an inclusive price range', () => {
    const results = filterProducts(
      products,
      withFilters({ minPrice: 100, maxPrice: 300 }),
    )

    expect(results.length).toBeGreaterThan(0)
    expect(results.every((product) => product.price >= 100 && product.price <= 300)).toBe(true)
  })

  it('sorts both price directions without mutating the input catalogue', () => {
    const originalOrder = products.map((product) => product.id)
    const ascending = filterProducts(products, withFilters({ sort: 'price-asc' }))
    const descending = filterProducts(products, withFilters({ sort: 'price-desc' }))

    expect(ascending.map((product) => product.price)).toEqual(
      [...ascending].map((product) => product.price).sort((first, second) => first - second),
    )
    expect(descending.map((product) => product.price)).toEqual(
      [...descending].map((product) => product.price).sort((first, second) => second - first),
    )
    expect(products.map((product) => product.id)).toEqual(originalOrder)
  })

  it('combines category, search, and maximum price filters', () => {
    const results = filterProducts(
      products,
      withFilters({ category: 'carpets', search: 'rug', maxPrice: 200 }),
    )

    expect(results.length).toBeGreaterThan(0)
    expect(
      results.every(
        (product) =>
          product.category === 'carpets' &&
          product.name.toLowerCase().includes('rug') &&
          product.price <= 200,
      ),
    ).toBe(true)
  })
})

describe('ProductsPage filtering', () => {
  it('filters product cards while typing a search term', async () => {
    const user = userEvent.setup()
    renderWithProviders(<ProductsPage />, '/products')

    await user.type(screen.getByLabelText('Search products'), 'sofa')

    const expectedProducts = products.filter((product) =>
      product.name.toLowerCase().includes('sofa'),
    )
    expect(
      screen.getByText(`Showing ${expectedProducts.length} of ${products.length} products`),
    ).toBeInTheDocument()
    expect(screen.getAllByRole('article')).toHaveLength(expectedProducts.length)
    expectedProducts.forEach((product) => {
      expect(screen.getByRole('heading', { name: product.name })).toBeInTheDocument()
    })
  })

  it('reads the selected category from the URL', () => {
    renderWithProviders(<ProductsPage />, '/products?category=carpets')

    const catalog = within(screen.getByRole('region', { name: 'Carpets' }))
    expect(catalog.getByText(`Showing 5 of ${products.length} products`)).toBeInTheDocument()
    expect(catalog.getAllByRole('article')).toHaveLength(5)
    products
      .filter((product) => product.category === 'carpets')
      .forEach((product) => {
        expect(catalog.getByRole('heading', { name: product.name })).toBeInTheDocument()
      })
  })

  it('resets an empty search result back to the full catalogue', async () => {
    const user = userEvent.setup()
    renderWithProviders(<ProductsPage />, '/products')

    await user.type(screen.getByLabelText('Search products'), 'zzzz')
    expect(screen.getByText('No products match your filters')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Reset filters' }))
    expect(
      screen.getByText(`Showing ${products.length} of ${products.length} products`),
    ).toBeInTheDocument()
    expect(screen.getAllByRole('article')).toHaveLength(products.length)
  })
})
