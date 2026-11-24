import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { collectionBanners } from '../../data/site'

export default function CollectionBanners() {
  return (
    <section className="banners">
      {collectionBanners.map((banner) => (
        <div key={banner.title} className="banner" style={{ backgroundImage: `url(${banner.image})` }}>
          <div className="banner__content">
            <h2>{banner.title}</h2>
            <Link to={`/products?category=${banner.category}`} className="btn btn--accent">
              Start Shopping <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      ))}
    </section>
  )
}
