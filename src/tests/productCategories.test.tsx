import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from '../App'
import { renderWithProviders } from './test-utils'

describe('Catalog categories', () => {
  it('shows living room products from the Living Rooms menu and switches categories', async () => {
    const user = userEvent.setup()
    renderWithProviders(<App />, '/')
    const menu = within(screen.getByRole('navigation', { name: 'Main navigation' }))
    await user.click(menu.getByRole('link', { name: 'Living Rooms' }))

    const catalog = within(screen.getByRole('region', { name: 'Living Rooms' }))
    for (const name of ['Oslo 3-Seater Sofa', 'Verde Velvet Sofa', 'Halo Round Coffee Table']) {
      expect(catalog.getByRole('heading', { name })).toBeInTheDocument()
    }
    expect(catalog.queryByRole('heading', { name: 'Sunny Kids Bedroom Set' })).toBeNull()

    await user.click(menu.getByRole('link', { name: 'Kids Rooms' }))
    const kids = within(screen.getByRole('region', { name: 'Kids Rooms' }))
    expect(kids.getByRole('heading', { name: 'Sunny Kids Bedroom Set' })).toBeInTheDocument()
    expect(kids.queryByRole('heading', { name: 'Oslo 3-Seater Sofa' })).toBeNull()
  })

  it('combines a category with a search', () => {
    renderWithProviders(<App />, '/products?category=living-room&search=halo')
    const catalog = within(screen.getByRole('region', { name: 'Living Rooms' }))
    expect(catalog.getByRole('heading', { name: 'Halo Round Coffee Table' })).toBeInTheDocument()
    expect(catalog.queryByRole('heading', { name: 'Oslo 3-Seater Sofa' })).toBeNull()
  })

  it('opens search results from the header and applies catalog filters', async () => {
    const user = userEvent.setup()
    renderWithProviders(<App />, '/')
    const header = within(screen.getByRole('banner'))

    await user.click(header.getByRole('button', { name: 'Search' }))
    const headerSearch = within(header.getByRole('search'))
    await user.type(headerSearch.getByRole('searchbox'), 'BeD{Enter}')

    const catalog = within(screen.getByRole('region', { name: 'Products' }))
    expect(catalog.getByRole('heading', { name: 'Explorer Twin Bed' })).toBeInTheDocument()
    const filters = within(catalog.getByRole('form', { name: 'Product filters' }))
    await user.selectOptions(filters.getByLabelText('Category'), 'bedroom')
    await user.type(filters.getByLabelText('Max price ($)'), '1000')
    await user.click(filters.getByLabelText('On sale only'))
    await user.selectOptions(filters.getByLabelText('Sort by'), 'price-asc')
    await user.click(filters.getByRole('button', { name: 'Apply filters' }))

    // Bedroom products named "bed", on sale, at most $1000, cheapest first
    const results = within(screen.getByRole('region', { name: 'Bedrooms' }))
    const names = results.getAllByRole('article').map((card) => within(card).getByRole('heading').textContent)
    expect(names).toEqual(['Lino Bedside Table', 'Serene Upholstered Bed', 'Nordic King Bed'])
    await user.click(results.getAllByRole('link', { name: 'Reset filters' })[0])
    expect(screen.getByRole('heading', { name: 'Explorer Twin Bed' })).toBeInTheDocument()
  })
})
