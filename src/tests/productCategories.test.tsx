import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from '../App'
import { renderWithProviders } from './test-utils'

describe('Catalog categories', () => {
  it('shows the AIHOM tables from the Living Rooms menu and switches categories', async () => {
    const user = userEvent.setup()
    renderWithProviders(<App />, '/')
    const menu = within(screen.getByRole('navigation', { name: 'Main navigation' }))
    await user.click(menu.getByRole('link', { name: 'Living Rooms' }))

    const catalog = within(screen.getByRole('region', { name: 'Living Rooms' }))
    for (const name of ['Roxy Coffee Table', 'Talia Coffee Table', 'Vista Coffee Table']) {
      expect(catalog.getByRole('heading', { name })).toBeInTheDocument()
    }
    expect(catalog.queryByRole('heading', { name: 'Sunny Kids Bedroom Set' })).toBeNull()

    await user.click(menu.getByRole('link', { name: 'Kids Rooms' }))
    const kids = within(screen.getByRole('region', { name: 'Kids Rooms' }))
    expect(kids.getByRole('heading', { name: 'Sunny Kids Bedroom Set' })).toBeInTheDocument()
    expect(kids.queryByRole('heading', { name: 'Roxy Coffee Table' })).toBeNull()
  })

  it('combines a category with a search', () => {
    renderWithProviders(<App />, '/products?category=living-room&search=roxy')
    const catalog = within(screen.getByRole('region', { name: 'Living Rooms' }))
    expect(catalog.getByRole('heading', { name: 'Roxy Coffee Table' })).toBeInTheDocument()
    expect(catalog.queryByRole('heading', { name: 'Talia Coffee Table' })).toBeNull()
  })

  it('opens search results from the header and applies catalog filters', async () => {
    const user = userEvent.setup()
    renderWithProviders(<App />, '/')
    const header = within(screen.getByRole('banner'))

    await user.click(header.getByRole('button', { name: 'Search' }))
    const headerSearch = within(header.getByRole('search'))
    await user.type(headerSearch.getByRole('searchbox'), 'CoFfEe TaBlE{Enter}')

    const catalog = within(screen.getByRole('region', { name: 'Products' }))
    expect(catalog.getByRole('heading', { name: 'Talia Coffee Table' })).toBeInTheDocument()
    const filters = within(catalog.getByRole('form', { name: 'Product filters' }))
    await user.selectOptions(filters.getByLabelText('Category'), 'living-room')
    await user.type(filters.getByLabelText('Max price ($)'), '200')
    await user.click(filters.getByLabelText('On sale only'))
    await user.selectOptions(filters.getByLabelText('Sort by'), 'price-asc')
    await user.click(filters.getByRole('button', { name: 'Apply filters' }))

    const results = within(screen.getByRole('region', { name: 'Living Rooms' }))
    const names = results.getAllByRole('article').map((card) => within(card).getByRole('heading').textContent)
    expect(names).toEqual(['Vista Coffee Table', 'Roxy Coffee Table'])
    await user.click(results.getByRole('link', { name: 'Reset filters' }))
    expect(screen.getByRole('heading', { name: 'Talia Coffee Table' })).toBeInTheDocument()
  })
})
