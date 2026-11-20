import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { articles } from '../../data/site'

export default function InspirationSection() {
  return (
    <section className="section inspiration">
      <div className="container">
        <h2 className="section-title">Ideas & Inspiration</h2>
        <p className="section-subtitle">Simple tips to help you plan, decorate and enjoy every room of your home.</p>

        <div className="inspiration__grid">
          {articles.map((article) => (
            <article key={article.title} className="article-card">
              <div className="article-card__media">
                <img src={article.image} alt="" loading="lazy" />
                <span className="article-card__date">
                  <strong>{article.date.day}</strong>
                  {article.date.month}
                </span>
              </div>
              <h3>{article.title}</h3>
              <p>{article.excerpt}</p>
              <Link to={`/products?category=${article.category}`} className="article-card__link">
                Shop the look <ArrowRight size={14} />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
