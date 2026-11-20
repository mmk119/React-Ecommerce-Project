import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { categories } from '../../data/products'

export default function CategoryCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 1 | -1) => {
    trackRef.current?.scrollBy({ left: direction * 300, behavior: 'smooth' })
  }

  return (
    <section className="section categories">
      <div className="container">
        <div className="categories__head">
          <h2 className="categories__title">Shop by Category</h2>
          <div className="categories__arrows">
            <button className="round-btn" onClick={() => scroll(-1)} aria-label="Scroll categories left">
              <ChevronLeft size={18} />
            </button>
            <button className="round-btn" onClick={() => scroll(1)} aria-label="Scroll categories right">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="categories__track" ref={trackRef}>
          {categories.map((category) => (
            <Link key={category.id} to={`/products?category=${category.id}`} className="category-card">
              <span className="category-card__image">
                <img src={category.image} alt="" loading="lazy" />
              </span>
              <span className="category-card__text">
                <span className="category-card__name">{category.label}</span>
                <span className="category-card__link">
                  See products <ChevronRight size={14} />
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
