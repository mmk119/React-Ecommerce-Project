import type { FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import ProductGrid from '../components/product/ProductGrid'
import { categories, products } from '../data/products'
import { filterProducts } from '../utils/filterProducts'
import './ProductsPage.css'

function readPrice(value: string | null) {
  if (!value?.trim()) return undefined
  const price = Number(value)
  return Number.isFinite(price) && price >= 0 ? price : undefined
}

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedCategory = categories.find(({ id }) => id === searchParams.get('category'))
  const search = (searchParams.get('search') ?? '').trim()
  const minPrice = readPrice(searchParams.get('minPrice'))
  const maxPrice = readPrice(searchParams.get('maxPrice'))
  const saleOnly = searchParams.get('sale') === 'true'
  const sortParam = searchParams.get('sort')
  const sort = sortParam === 'price-asc' || sortParam === 'price-desc' ? sortParam : ''

  // The URL keeps the catalog filters in sync with header navigation and browser history.
  const visibleProducts = filterProducts(products, {
    category: selectedCategory?.id, search, minPrice, maxPrice, saleOnly, sort,
  })

  function applyFilters(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const params = new URLSearchParams()
    for (const [name, value] of new FormData(event.currentTarget)) {
      if (typeof value === 'string' && value.trim()) params.set(name, value.trim())
    }
    setSearchParams(params)
  }

  return (
    <section className="section section--soft" aria-labelledby="products-title">
      <div className="container">
        <h1 className="section-title" id="products-title">{selectedCategory?.label ?? 'Products'}</h1>
        <form
          key={searchParams.toString()}
          className="catalog-filters"
          aria-label="Product filters"
          onSubmit={applyFilters}
        >
          <label className="catalog-filters__search">
            Search catalog
            <input type="search" name="search" defaultValue={search} placeholder="e.g. coffee table" />
          </label>
          <label>
            Category
            <select name="category" defaultValue={selectedCategory?.id ?? ''}>
              <option value="">All categories</option>
              {categories.map(({ id, label }) => <option key={id} value={id}>{label}</option>)}
            </select>
          </label>
          <label>
            Min price ($)
            <input type="number" name="minPrice" min="0" step="0.01" defaultValue={minPrice} />
          </label>
          <label>
            Max price ($)
            <input type="number" name="maxPrice" min="0" step="0.01" defaultValue={maxPrice} />
          </label>
          <label>
            Sort by
            <select name="sort" defaultValue={sort}>
              <option value="">Featured order</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
          </label>
          <div className="catalog-filters__actions">
            <label><input type="checkbox" name="sale" value="true" defaultChecked={saleOnly} /> On sale only</label>
            <button className="btn btn--dark" type="submit">Apply filters</button>
            {searchParams.size > 0 && <Link to="/products">Reset filters</Link>}
          </div>
        </form>
        <p className="section-subtitle" role="status">
          {visibleProducts.length} {visibleProducts.length === 1 ? 'product' : 'products'}
          {search && <> matching &ldquo;{search}&rdquo;</>}
        </p>

        {visibleProducts.length > 0 ? (
          <ProductGrid products={visibleProducts} />
        ) : (
          <p className="section-subtitle">No products match your filters.</p>
        )}
      </div>
    </section>
  )
}
