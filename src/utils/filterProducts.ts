import type { Category, Product } from '../types'

export type SortOption = 'default' | 'price-asc' | 'price-desc'

export interface ProductFilters {
  search: string
  category: Category | 'all'
  minPrice: number | null
  maxPrice: number | null
  sort: SortOption
}

export const defaultFilters: ProductFilters = {
  search: '',
  category: 'all',
  minPrice: null,
  maxPrice: null,
  sort: 'default',
}

export function filterProducts(list: Product[], filters: ProductFilters): Product[] {
  const searchTerm = filters.search.trim().toLowerCase()

  // Each condition is optional, so one pass can combine every active filter.
  const matches = list.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm)
    const matchesCategory =
      filters.category === 'all' || product.category === filters.category
    const matchesMinimum =
      filters.minPrice === null || product.price >= filters.minPrice
    const matchesMaximum =
      filters.maxPrice === null || product.price <= filters.maxPrice

    return matchesSearch && matchesCategory && matchesMinimum && matchesMaximum
  })

  // Sort a copy so the shared product catalogue always keeps its original order.
  const sortedProducts = [...matches]
  if (filters.sort === 'price-asc') {
    sortedProducts.sort((first, second) => first.price - second.price)
  }
  if (filters.sort === 'price-desc') {
    sortedProducts.sort((first, second) => second.price - first.price)
  }

  return sortedProducts
}
