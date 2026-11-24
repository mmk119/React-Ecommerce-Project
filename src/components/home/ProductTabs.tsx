import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { Product } from '../../types'
import { products } from '../../data/products'
import ProductGrid from '../product/ProductGrid'

type TabId = 'offers' | 'best' | 'new'

const tabs: { id: TabId; label: string; items: Product[] }[] = [
  { id: 'offers', label: 'Offers', items: products.filter((p) => p.oldPrice).slice(0, 8) },
  { id: 'best', label: 'Best Sellers', items: products.filter((p) => p.featured).slice(0, 8) },
  { id: 'new', label: 'New Arrivals', items: [...products].reverse().slice(0, 8) },
]

export default function ProductTabs() {
  const [active, setActive] = useState<TabId>('offers')
  const current = tabs.find((tab) => tab.id === active) ?? tabs[0]

  return (
    <section className="section section--soft product-tabs" aria-labelledby="featured-title">
      <div className="container">
        <h2 className="section-title" id="featured-title">
          Featured Products
        </h2>
        <p className="section-subtitle">Our best offers, customer favourites and newest pieces.</p>
        <div className="tabs" role="tablist" aria-label="Featured products">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={tab.id === active}
              className={`tabs__btn ${tab.id === active ? 'tabs__btn--active' : ''}`}
              onClick={() => setActive(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div role="tabpanel" aria-label={current.label}>
          <ProductGrid products={current.items} />
        </div>

        <div className="product-tabs__more">
          <Link to="/products" className="btn btn--muted">
            See all products <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
