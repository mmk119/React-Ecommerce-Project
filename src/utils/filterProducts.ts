import type { Product } from '../types'

export interface ProductFilters {
  category?: Product['category']
  search: string
  minPrice?: number
  maxPrice?: number
  saleOnly: boolean
  sort: '' | 'price-asc' | 'price-desc'
}

export function filterProducts(products: Product[], filters: ProductFilters): Product[] {
  const terms = filters.search.toLowerCase().split(/\s+/).filter(Boolean)

  const matches = products.filter((product) => {
    const searchableText = `${product.name} ${product.description}`.toLowerCase()

    return (
      (!filters.category || product.category === filters.category) &&
      terms.every((term) => searchableText.includes(term)) &&
      product.price >= (filters.minPrice ?? 0) &&
      product.price <= (filters.maxPrice ?? Infinity) &&
      (!filters.saleOnly || (product.oldPrice ?? 0) > product.price)
    )
  })

  if (filters.sort === 'price-asc') matches.sort((a, b) => a.price - b.price)
  if (filters.sort === 'price-desc') matches.sort((a, b) => b.price - a.price)
  return matches
}
