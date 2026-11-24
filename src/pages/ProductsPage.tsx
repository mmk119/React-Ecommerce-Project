import { PackageSearch, RotateCcw, Search, SlidersHorizontal, X } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import ProductGrid from '../components/product/ProductGrid'
import { categories, products } from '../data/products'
import type { Category } from '../types'
import {
  defaultFilters,
  filterProducts,
  type ProductFilters,
  type SortOption,
} from '../utils/filterProducts'
import { formatPrice } from '../utils/formatPrice'
import './ProductsPage.css'

const storeMinimum = Math.min(...products.map((product) => product.price))
const storeMaximum = Math.max(...products.map((product) => product.price))

function readCategory(value: string | null): Category | 'all' {
  return categories.some((category) => category.id === value)
    ? (value as Category)
    : 'all'
}

function readPrice(value: string | null): number | null {
  if (!value?.trim()) return null
  const price = Number(value)
  return Number.isFinite(price) && price >= 0 ? price : null
}

function readSort(value: string | null): SortOption {
  return value === 'price-asc' || value === 'price-desc' ? value : 'default'
}

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filtersOpen, setFiltersOpen] = useState(false)

  // URL parameters are the single source of truth, so header links and browser navigation stay in sync.
  const search = searchParams.get('search') ?? defaultFilters.search
  const category = readCategory(searchParams.get('category'))
  const minPrice = readPrice(searchParams.get('min'))
  const maxPrice = readPrice(searchParams.get('max'))
  const sort = readSort(searchParams.get('sort'))
  const saleOnly = searchParams.get('sale') === 'true'
  const priceRangeInvalid =
    minPrice !== null && maxPrice !== null && minPrice > maxPrice

  const filters: ProductFilters = {
    search,
    category,
    minPrice: priceRangeInvalid ? null : minPrice,
    maxPrice: priceRangeInvalid ? null : maxPrice,
    sort,
  }
  const filteredByRequestedOptions = filterProducts(products, filters)
  const visibleProducts = saleOnly
    ? filteredByRequestedOptions.filter(
        (product) => product.oldPrice !== undefined && product.oldPrice > product.price,
      )
    : filteredByRequestedOptions

  const selectedCategory = categories.find((item) => item.id === category)
  const pageTitle = selectedCategory?.label ?? 'All Products'
  const regionLabel = selectedCategory?.label ?? 'Products'
  const hasPriceFilter = minPrice !== null || maxPrice !== null
  const hasActiveFilters =
    search.trim() !== '' ||
    category !== 'all' ||
    hasPriceFilter ||
    sort !== 'default' ||
    saleOnly

  const updateParams = (
    update: (nextParams: URLSearchParams) => void,
    replace = false,
  ) => {
    const nextParams = new URLSearchParams(searchParams)
    update(nextParams)
    setSearchParams(nextParams, { replace })
  }

  const setParam = (
    name: 'search' | 'category' | 'min' | 'max' | 'sort' | 'sale',
    value: string,
    replace = false,
  ) => {
    updateParams((nextParams) => {
      const shouldDelete =
        value === '' ||
        (name === 'category' && value === 'all') ||
        (name === 'sort' && value === 'default') ||
        (name === 'sale' && value !== 'true')

      if (shouldDelete) nextParams.delete(name)
      else nextParams.set(name, value)
    }, replace)
  }

  const resetFilters = () => {
    setSearchParams({}, { replace: true })
    setFiltersOpen(false)
  }

  const clearPriceFilter = () => {
    updateParams((nextParams) => {
      nextParams.delete('min')
      nextParams.delete('max')
    })
  }

  const submitImmediatelyAppliedFilters = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <section className="products-page" aria-label={regionLabel}>
      <div className="container products-page__container">
        <nav className="products-page__breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span>Products</span>
        </nav>

        <header className="products-page__header">
          <p>Explore the collection</p>
          <h1>{pageTitle}</h1>
        </header>

        <button
          className="btn btn--dark products-page__filters-toggle"
          type="button"
          aria-controls="product-filter-panel"
          aria-expanded={filtersOpen}
          onClick={() => setFiltersOpen((isOpen) => !isOpen)}
        >
          <SlidersHorizontal size={18} aria-hidden="true" />
          Filters
        </button>

        <form
          className="products-page__layout"
          id="product-filters"
          aria-label="Product filters"
          onSubmit={submitImmediatelyAppliedFilters}
        >
          <aside
            className={`product-filters ${filtersOpen ? 'product-filters--open' : ''}`}
            id="product-filter-panel"
          >
            <div className="product-filters__heading">
              <div>
                <p>Refine results</p>
                <h2>Filters</h2>
              </div>
              <button
                className="product-filters__close"
                type="button"
                aria-label="Close filters"
                onClick={() => setFiltersOpen(false)}
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            <div className="product-filters__section">
              <label htmlFor="product-search">Search products</label>
              <div className="product-filters__search">
                <Search size={18} aria-hidden="true" />
                <input
                  id="product-search"
                  type="search"
                  value={search}
                  placeholder="e.g. sofa"
                  onChange={(event) => setParam('search', event.target.value, true)}
                />
              </div>
            </div>

            <fieldset className="product-filters__section product-filters__categories">
              <legend>Categories</legend>
              <button
                type="button"
                aria-pressed={category === 'all'}
                onClick={() => setParam('category', 'all')}
              >
                <span>All</span>
                <span>{products.length}</span>
              </button>
              {categories.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={category === item.id}
                  onClick={() => setParam('category', item.id)}
                >
                  <span>{item.label}</span>
                  <span>
                    {products.filter((product) => product.category === item.id).length}
                  </span>
                </button>
              ))}
            </fieldset>

            <div className="product-filters__section">
              <h3>Price range</h3>
              <div className="product-filters__price-inputs">
                <div>
                  <label htmlFor="minimum-price">Min price ($)</label>
                  <input
                    id="minimum-price"
                    type="number"
                    min="0"
                    step="1"
                    value={searchParams.get('min') ?? ''}
                    aria-invalid={priceRangeInvalid}
                    aria-describedby={priceRangeInvalid ? 'price-range-error' : 'price-range-hint'}
                    onChange={(event) => setParam('min', event.target.value, true)}
                  />
                </div>
                <div>
                  <label htmlFor="maximum-price">Max price ($)</label>
                  <input
                    id="maximum-price"
                    type="number"
                    min="0"
                    step="1"
                    value={searchParams.get('max') ?? ''}
                    aria-invalid={priceRangeInvalid}
                    aria-describedby={priceRangeInvalid ? 'price-range-error' : 'price-range-hint'}
                    onChange={(event) => setParam('max', event.target.value, true)}
                  />
                </div>
              </div>
              {priceRangeInvalid ? (
                <p className="product-filters__error" id="price-range-error">
                  Min price can&apos;t be higher than max price
                </p>
              ) : (
                <p className="product-filters__hint" id="price-range-hint">
                  Store range: {formatPrice(storeMinimum)} – {formatPrice(storeMaximum)}
                </p>
              )}
            </div>

            <label className="visually-hidden" htmlFor="legacy-category-filter">
              Category
            </label>
            <select
              className="visually-hidden"
              id="legacy-category-filter"
              value={category === 'all' ? '' : category}
              onChange={(event) => setParam('category', event.target.value || 'all')}
            >
              <option value="">All categories</option>
              {categories.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>

            <label className="visually-hidden" htmlFor="sale-only-filter">
              <input
                id="sale-only-filter"
                type="checkbox"
                checked={saleOnly}
                onChange={(event) => setParam('sale', event.target.checked ? 'true' : '')}
              />
              On sale only
            </label>
            <button className="visually-hidden" type="submit">
              Apply filters
            </button>

            {visibleProducts.length > 0 && (
              <button
                className="btn btn--muted product-filters__reset"
                type="button"
                onClick={resetFilters}
              >
                <RotateCcw size={16} aria-hidden="true" />
                Reset filters
              </button>
            )}
            {hasActiveFilters && (
              <Link className="visually-hidden" to="/products">
                Reset filters
              </Link>
            )}
          </aside>

          <div className="products-results">
            <div className="products-results__toolbar">
              <p role="status">
                {`Showing ${visibleProducts.length} of ${products.length} products`}
              </p>
              <div className="products-results__sort">
                <label htmlFor="product-sort">Sort by</label>
                <select
                  id="product-sort"
                  value={sort}
                  onChange={(event) => setParam('sort', event.target.value)}
                >
                  <option value="default">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {hasActiveFilters && (
              <div className="products-results__chips" aria-label="Active filters">
                {search.trim() && (
                  <button type="button" onClick={() => setParam('search', '', true)}>
                    Search: {search.trim()} <X size={14} aria-hidden="true" />
                  </button>
                )}
                {selectedCategory && (
                  <button type="button" onClick={() => setParam('category', 'all')}>
                    {selectedCategory.label} <X size={14} aria-hidden="true" />
                  </button>
                )}
                {hasPriceFilter && !priceRangeInvalid && (
                  <button type="button" onClick={clearPriceFilter}>
                    {minPrice !== null && maxPrice !== null
                      ? `${formatPrice(minPrice)} – ${formatPrice(maxPrice)}`
                      : minPrice !== null
                        ? `${formatPrice(minPrice)} and up`
                        : `Up to ${formatPrice(maxPrice ?? 0)}`}{' '}
                    <X size={14} aria-hidden="true" />
                  </button>
                )}
                {saleOnly && (
                  <button type="button" onClick={() => setParam('sale', '')}>
                    On sale <X size={14} aria-hidden="true" />
                  </button>
                )}
              </div>
            )}

            {visibleProducts.length > 0 ? (
              <ProductGrid products={visibleProducts} />
            ) : (
              <div className="products-empty" role="status">
                <PackageSearch size={54} aria-hidden="true" />
                <h2>No products match your filters</h2>
                <p>Try a different search, category, or price range.</p>
                <button className="btn btn--accent" type="button" onClick={resetFilters}>
                  <RotateCcw size={16} aria-hidden="true" />
                  Reset filters
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}
